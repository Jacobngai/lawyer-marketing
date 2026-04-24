import fs from "node:fs";
import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const app = express();
const port = Number(process.env.PORT || 8787);
const defaultGoogleScriptUrl =
  "https://script.google.com/macros/s/AKfycbygNzxMYfx9eVbalSW69GxLZMPZ-Xbd3FtBDaqC9wW15V6sYtCA9TFHa5VJ_hm6Y8eU/exec";
const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL?.trim() || defaultGoogleScriptUrl;
const difyBaseUrl = (process.env.DIFY_BASE_URL?.trim() || "http://localhost").replace(/\/+$/, "");
const difyAppApiKey = process.env.DIFY_APP_API_KEY?.trim() || "";
const difyResponseMode = process.env.DIFY_RESPONSE_MODE?.trim() || "blocking";
const evolutionBaseUrl = (process.env.EVOLUTION_BASE_URL?.trim() || "http://host.docker.internal:8081").replace(
  /\/+$/,
  "",
);
const evolutionInstance = process.env.EVOLUTION_INSTANCE?.trim() || "chatwoot-wa";
const evolutionApiKey = process.env.EVOLUTION_API_KEY?.trim() || "";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");
const leadBackupFile = path.join(projectRoot, "server", "data", "lead-submissions.jsonl");

app.use(express.json({ limit: "1mb" }));

const goalLabels = {
  "landing-page": "Free Landing Page",
  audit: "Strategic Growth Audit",
};

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizePhone(value) {
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith("00")) {
    digits = digits.slice(2);
  }

  if (digits.startsWith("60")) {
    return digits;
  }

  if (digits.startsWith("0")) {
    return `60${digits.slice(1)}`;
  }

  if (digits.startsWith("1") && digits.length >= 9 && digits.length <= 10) {
    return `60${digits}`;
  }

  return digits;
}

function normalizeLead(payload) {
  if (!payload || typeof payload !== "object") {
    throw new Error("Missing submission payload.");
  }

  const goal = payload.goal === "audit" ? "audit" : "landing-page";
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
  const firmName = typeof payload.firmName === "string" ? payload.firmName.trim() : "";
  const website = typeof payload.website === "string" ? payload.website.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const caseVolume = typeof payload.caseVolume === "string" ? payload.caseVolume.trim() : "";

  if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(phone) || !isNonEmptyString(firmName)) {
    throw new Error("Required fields are missing.");
  }

  const phoneDigits = normalizePhone(phone);
  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    throw new Error("Please provide a valid WhatsApp number. Malaysian numbers can be entered as 0175032281 or +60 17-503 2281.");
  }

  if (goal === "audit" && !isNonEmptyString(website)) {
    throw new Error("Website URL is required for audit requests.");
  }

  return {
    name,
    email,
    phone,
    phoneDigits,
    firmName,
    website,
    message,
    caseVolume,
    goal,
    goalLabel: goalLabels[goal],
    submittedAt: new Date().toISOString(),
    source: "lawyer-marketing-website",
  };
}

function renderTemplate(template, values) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const value = values[key];
    return value == null ? "" : String(value);
  });
}

function buildApprovedMessage(lead) {
  const template =
    process.env.WHATSAPP_FOLLOW_UP_TEMPLATE?.trim() ||
    "Hi {{name}}, thank you for applying for our {{goalLabel}} offer for {{firmName}}. We received your details and will review everything before sending the next steps. If you have anything urgent, reply here and our team will get back to you shortly.";

  return renderTemplate(template, {
    name: lead.name,
    firmName: lead.firmName,
    goalLabel: lead.goalLabel,
    website: lead.website || "Not provided",
    email: lead.email,
    phone: lead.phoneDigits,
    caseVolume: lead.caseVolume,
  });
}

function buildNotes(lead) {
  const notes = [
    `Source: ${lead.source}`,
    `Submitted At: ${lead.submittedAt}`,
    `Contact Email: ${lead.email}`,
    `Original Phone Input: ${lead.phone}`,
    `Goal: ${lead.goalLabel}`,
    `Firm Headcount: ${lead.caseVolume || "Not provided"}`,
    `Website: ${lead.website || "Not provided"}`,
  ];

  if (lead.message) {
    notes.push(`Lead Notes: ${lead.message}`);
  }

  return notes.join("\n");
}

function buildLeadId(lead) {
  return `${lead.submittedAt.replace(/[-:.TZ]/g, "")}-${lead.phoneDigits.slice(-6)}`;
}

async function appendBackupLead(lead) {
  await mkdir(path.dirname(leadBackupFile), { recursive: true });
  await appendFile(leadBackupFile, `${JSON.stringify(lead)}\n`, "utf8");
}

async function relayToGoogleScript(lead) {
  if (!googleScriptUrl) {
    return { status: "skipped" };
  }

  const googleLeadPayload = {
    ...lead,
    contactMethod: lead.phoneDigits,
    whatsapp: lead.phoneDigits,
    goalLabel: lead.goalLabel,
    notes: buildNotes(lead),
  };

  const response = await fetch(googleScriptUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(googleLeadPayload),
  });

  const body = await response.text();

  if (!response.ok) {
    throw new Error(`Google Apps Script returned ${response.status}: ${body}`);
  }

  return {
    status: "logged",
    body,
  };
}

async function triggerDifyWorkflow(lead) {
  if (!difyAppApiKey) {
    return {
      status: "skipped",
      reason: "missing_api_key",
    };
  }

  if (!evolutionApiKey) {
    return {
      status: "skipped",
      reason: "missing_evolution_api_key",
    };
  }

  const response = await fetch(`${difyBaseUrl}/v1/workflows/run`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${difyAppApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: {
        lead_id: buildLeadId(lead),
        name: lead.name,
        email: lead.email,
        phone_number: lead.phoneDigits,
        firm_name: lead.firmName,
        website: lead.website || "",
        goal: lead.goal,
        goal_label: lead.goalLabel,
        case_volume: lead.caseVolume || "",
        source: lead.source,
        submitted_at: lead.submittedAt,
        lead_message: lead.message,
        approved_message: buildApprovedMessage(lead),
        notes: buildNotes(lead),
        evolution_base_url: evolutionBaseUrl,
        evolution_instance: evolutionInstance,
        evolution_api_key: evolutionApiKey,
      },
      response_mode: difyResponseMode,
      user: `lead:${lead.phoneDigits}`,
    }),
  });

  const responseText = await response.text();
  let responseJson = null;

  try {
    responseJson = responseText ? JSON.parse(responseText) : null;
  } catch {
    responseJson = null;
  }

  if (!response.ok) {
    const errorMessage = responseJson?.message || responseText || "Unknown Dify error.";
    throw new Error(errorMessage);
  }

  return {
    status: "queued",
    workflowRunId: responseJson?.workflow_run_id || responseJson?.data?.id || null,
    taskId: responseJson?.task_id || null,
    raw: responseJson,
  };
}

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    difyConfigured: Boolean(difyAppApiKey),
    evolutionConfigured: Boolean(evolutionApiKey),
    evolutionBaseUrl,
    evolutionInstance,
    googleScriptConfigured: Boolean(googleScriptUrl),
    leadBackupFile,
  });
});

app.post("/api/contact/submit", async (req, res) => {
  try {
    const lead = normalizeLead(req.body);
    await appendBackupLead(lead);

    const [googleResult, difyResult] = await Promise.allSettled([
      relayToGoogleScript(lead),
      triggerDifyWorkflow(lead),
    ]);

    const googleLogged = googleResult.status === "fulfilled" && googleResult.value.status === "logged";
    const difyQueued = difyResult.status === "fulfilled" && difyResult.value.status === "queued";
    const difySkipped = difyResult.status === "fulfilled" && difyResult.value.status === "skipped";

    if (difyQueued) {
      return res.status(200).json({
        ok: true,
        followUpQueued: true,
        loggedToGoogleSheet: googleLogged,
        message: "Application received. We will text the WhatsApp number you shared after reviewing your submission.",
        workflowRunId: difyResult.value.workflowRunId,
      });
    }

    if (googleLogged || difySkipped) {
      return res.status(202).json({
        ok: true,
        followUpQueued: false,
        loggedToGoogleSheet: googleLogged,
        message: "Application received. Your details were captured, but the automated WhatsApp follow-up is not active yet.",
      });
    }

    const difyError = difyResult.status === "rejected" ? difyResult.reason : null;
    const googleError = googleResult.status === "rejected" ? googleResult.reason : null;

    console.error("Contact submission failed", {
      difyError,
      googleError,
      leadEmail: lead.email,
      leadPhone: lead.phoneDigits,
    });

    return res.status(502).json({
      ok: false,
      message: "We could not process your request right now. Please try again shortly.",
    });
  } catch (error) {
    console.error("Contact submission request rejected", error);
    return res.status(400).json({
      ok: false,
      message: error instanceof Error ? error.message : "Invalid submission.",
    });
  }
});

if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));

  app.get(/.*/, (_req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Lead automation server listening on http://localhost:${port}`);
});
