const defaultGoogleScriptUrl =
  "https://script.google.com/macros/s/AKfycbygNzxMYfx9eVbalSW69GxLZMPZ-Xbd3FtBDaqC9wW15V6sYtCA9TFHa5VJ_hm6Y8eU/exec";

const goalLabels = {
  "landing-page": "Free Landing Page",
  audit: "Strategic Growth Audit",
  "giveaway-website": "2026 Free Website Portfolio",
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

  const goal = payload.goal === "giveaway-website" ? "giveaway-website" : (payload.goal === "audit" ? "audit" : "landing-page");
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
  const rawPhone = typeof payload.rawPhone === "string" ? payload.rawPhone.trim() : phone;
  const firmName = typeof payload.firmName === "string" ? payload.firmName.trim() : "";
  const website = typeof payload.website === "string" ? payload.website.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const caseVolume = typeof payload.caseVolume === "string" ? payload.caseVolume.trim() : "";

  // For giveaway, name and email are mandatory
  if (goal === "giveaway-website") {
    if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(phone) || !isNonEmptyString(firmName)) {
      throw new Error("All fields are required for the portfolio giveaway.");
    }
  } else {
    // For standard audit
    if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(phone) || !isNonEmptyString(firmName)) {
      throw new Error("Required fields are missing.");
    }
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
    phone: rawPhone,
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

async function relayToGoogleScript(lead) {
  const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL?.trim() || defaultGoogleScriptUrl;
  if (!googleScriptUrl) {
    return { status: "skipped" };
  }

  const response = await fetch(googleScriptUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...lead,
      contactMethod: lead.phoneDigits,
      whatsapp: lead.phoneDigits,
      notes: buildNotes(lead),
    }),
  });

  const body = await response.text();
  if (!response.ok) {
    throw new Error(`Google Apps Script returned ${response.status}: ${body}`);
  }

  return { status: "logged", body };
}

async function triggerDifyWorkflow(lead) {
  const difyBaseUrl = (process.env.DIFY_BASE_URL?.trim() || "").replace(/\/+$/, "");
  const difyAppApiKey = process.env.DIFY_APP_API_KEY?.trim() || "";
  const evolutionBaseUrl = (process.env.EVOLUTION_BASE_URL?.trim() || "").replace(/\/+$/, "");
  const evolutionInstance = process.env.EVOLUTION_INSTANCE?.trim() || "chatwoot-wa";
  const evolutionApiKey = process.env.EVOLUTION_API_KEY?.trim() || "";
  const difyResponseMode = process.env.DIFY_RESPONSE_MODE?.trim() || "blocking";

  if (!difyBaseUrl || !difyAppApiKey || !evolutionBaseUrl || !evolutionApiKey) {
    return { status: "skipped", reason: "missing_dify_or_evolution_env" };
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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method not allowed." });
  }

  try {
    const lead = normalizeLead(req.body);
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

    return res.status(502).json({
      ok: false,
      message: "Your submission was received but could not be processed. Please try again shortly.",
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error instanceof Error ? error.message : "Invalid request.",
    });
  }
}
