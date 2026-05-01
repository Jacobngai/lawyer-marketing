import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = path.resolve("C:/Users/walte/Desktop/lawyer marketing website/outputs/content-planning");
const outputPath = path.join(outputDir, "lawyermarketing-content-sitemap-masterplan.xlsx");

const today = "2026-05-01";

const headers = [
  "ID",
  "Status",
  "Proposed URL",
  "Page Type",
  "Cluster",
  "CEP Code",
  "Category Entry Point",
  "Avatar Situation",
  "Trigger Moment",
  "Primary Keyword",
  "Secondary Keywords",
  "Search Intent",
  "Funnel Stage",
  "Business Goal",
  "Priority",
  "Competition",
  "Opportunity",
  "Target Audience",
  "CTA Variant",
  "Compliance Risk",
  "Required Guardrails",
  "Publish Date",
  "Source / Inspiration",
  "Internal Links To",
  "Notes Before Writing",
];

const rows = [];
const add = (row) => rows.push(headers.map((h) => row[h] ?? ""));
const colLetter = (indexZeroBased) => {
  let n = indexZeroBased + 1;
  let s = "";
  while (n > 0) {
    const m = (n - 1) % 26;
    s = String.fromCharCode(65 + m) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
};

const guardrails = {
  standard: "No guarantees; no fake case studies; no unverified client results; no ranking/client/case outcome promise.",
  compliance: "Include not-legal-advice note; cite Malaysian Bar/Publicity Rules carefully; avoid definitive legal interpretation.",
  ads: "Do not imply Bar approval; avoid aggressive claims; explain suitability review and compliance-conscious setup.",
  proof: "No invented case studies; use process/demo/portfolio only until real signed client permission exists.",
};

const defaultAudience = "Malaysian lawyers, partners, boutique firms, small-to-mid law firms";

const cepDefinitions = [
  ["CEP-A", "Need a website now", "New firm, rebrand, outdated site, no credible website", "A lawyer realizes their current website is absent, old, slow, or unprofessional.", "Website", "websiteOffer"],
  ["CEP-B", "Unsure what advertising is allowed", "Compliance-cautious lawyer or partner", "A lawyer hears the publicity rules changed and wants to know what can be published safely.", "Compliance", "complianceOffer"],
  ["CEP-C", "Want to be found on Google", "Firm owner or partner curious about SEO", "The firm is not appearing for important legal searches or wants organic visibility.", "SEO", "auditOffer"],
  ["CEP-D", "Practice-area visibility need", "Lawyer in a specific practice area", "The lawyer wants more visibility for one legal vertical, not generic marketing.", "Practice Area Marketing", "practiceAreaOffer"],
  ["CEP-E", "Considering paid ads", "Lawyer who wants faster visibility but worries about rules", "The firm is considering Google/Meta/LinkedIn ads but wants a safer setup.", "Paid Media", "adsOffer"],
  ["CEP-F", "AI search curiosity or fear", "Forward-looking lawyer or younger partner", "The lawyer hears clients are using ChatGPT/Gemini and wants to understand AI search.", "AI Search", "auditOffer"],
  ["CEP-G", "Leads are not followed up fast enough", "Operationally minded owner or admin", "The firm gets inquiries but response and tracking are inconsistent.", "CRM & Intake", "crmOffer"],
  ["CEP-H", "Local map/search visibility", "Law firm targeting a city or local market", "The lawyer wants visibility in KL, Selangor, PJ, Penang, Johor, or another city.", "Local Market", "auditOffer"],
  ["CEP-I", "Need proof or benchmark data", "Skeptical partner or SEO-aware lawyer", "The buyer wants evidence, benchmarks, or market data before trusting the strategy.", "Research / Digital PR", "auditOffer"],
];

const cepByCluster = Object.fromEntries(cepDefinitions.map(([code, name, avatar, trigger, cluster, cta]) => [cluster, { code, name, avatar, trigger, cta }]));
const withCep = (cluster, row) => {
  const cep = cepByCluster[cluster] || cepByCluster.Website;
  return {
    "CEP Code": cep.code,
    "Category Entry Point": cep.name,
    "Avatar Situation": cep.avatar,
    "Trigger Moment": cep.trigger,
    ...row,
  };
};

const servicePages = [
  ["SVC-001", "Refresh", "/services/website-design-for-lawyers", "Website Design for Lawyers Malaysia", "law firm website design Malaysia", "lawyer website design Malaysia; legal website design Malaysia; Bar Council compliant law firm website", "Transactional", "BOFU", "Generate website offer applications", "P0", "Medium", "High", "websiteOffer", "Medium", guardrails.standard],
  ["SVC-002", "Refresh", "/services/law-firm-seo", "Law Firm SEO Malaysia", "law firm SEO Malaysia", "SEO for lawyers Malaysia; lawyer SEO services Malaysia; legal SEO Malaysia", "Transactional", "BOFU", "Generate SEO audit leads", "P0", "Medium", "High", "auditOffer", "Medium", guardrails.standard],
  ["SVC-003", "Refresh", "/services/google-ads-for-lawyers", "Google Ads for Lawyers Malaysia", "Google Ads for lawyers Malaysia", "law firm PPC Malaysia; lawyer Google Ads Malaysia; can lawyers run Google Ads Malaysia", "Transactional", "BOFU", "Generate paid search consults", "P1", "Medium", "Medium", "adsOffer", "High", guardrails.ads],
  ["SVC-004", "Refresh", "/services/meta-advertising-for-lawyers", "Meta Ads for Lawyers Malaysia", "Meta ads for lawyers Malaysia", "Facebook ads for law firms Malaysia; Instagram ads lawyers Malaysia", "Transactional", "BOFU", "Generate paid social consults", "P2", "Low", "Medium", "adsOffer", "High", guardrails.ads],
  ["SVC-005", "Refresh", "/services/social-media-marketing-for-lawyers", "Social Media Marketing for Lawyers Malaysia", "social media marketing for lawyers Malaysia", "LinkedIn marketing for lawyers Malaysia; law firm content social media", "Commercial", "MOFU", "Generate content marketing consults", "P2", "Low", "Medium", "auditOffer", "Medium", guardrails.standard],
  ["SVC-006", "Refresh", "/services/law-firm-ai-search-optimization", "AI Search Optimization for Law Firms Malaysia", "AI SEO for lawyers Malaysia", "AI search optimization law firms; GEO for lawyers Malaysia; ChatGPT law firm visibility", "Commercial", "MOFU", "Own early AI-search category", "P1", "Low", "High", "auditOffer", "Medium", guardrails.standard],
  ["SVC-007", "New", "/services/google-business-profile-for-lawyers", "Google Business Profile for Lawyers Malaysia", "Google Business Profile for lawyers Malaysia", "Google Maps for law firms Malaysia; local SEO lawyers Malaysia", "Transactional", "BOFU", "Generate local SEO inquiries", "P0", "Medium", "High", "auditOffer", "Medium", guardrails.standard],
  ["SVC-008", "New", "/services/law-firm-content-marketing", "Content Marketing for Law Firms Malaysia", "content marketing for law firms Malaysia", "lawyer blog writing Malaysia; law firm website content Malaysia", "Commercial", "MOFU", "Generate content retainers", "P1", "Low", "High", "auditOffer", "Low", guardrails.standard],
  ["SVC-009", "New", "/services/law-firm-crm-intake-automation", "Law Firm CRM & Intake Automation Malaysia", "law firm CRM Malaysia", "WhatsApp automation for law firms; legal CRM Malaysia; law firm intake process", "Transactional", "BOFU", "Generate automation setup inquiries", "P1", "Low", "High", "crmOffer", "Medium", guardrails.standard],
  ["SVC-010", "New", "/services/bar-council-compliant-lawyer-marketing", "Bar Council Conscious Lawyer Marketing", "Bar Council compliant lawyer marketing", "legal marketing compliance Malaysia; compliant lawyer advertising Malaysia", "Transactional", "BOFU", "Position as safe strategic partner", "P0", "Low", "Very High", "complianceOffer", "High", guardrails.compliance],
];

for (const [id, status, url, title, kw, secondary, intent, funnel, goal, priority, comp, opp, cta, risk, rules] of servicePages) {
  add({
    ...withCep(title.includes("Website") ? "Website" : title.includes("Google Ads") || title.includes("Meta") ? "Paid Media" : title.includes("AI") ? "AI Search" : title.includes("CRM") ? "CRM & Intake" : title.includes("Bar Council") ? "Compliance" : "SEO", {}),
    ID: id,
    Status: status,
    "Proposed URL": url,
    "Page Type": "Service Page",
    Cluster: title,
    "Primary Keyword": kw,
    "Secondary Keywords": secondary,
    "Search Intent": intent,
    "Funnel Stage": funnel,
    "Business Goal": goal,
    Priority: priority,
    Competition: comp,
    Opportunity: opp,
    "Target Audience": defaultAudience,
    "CTA Variant": cta,
    "Compliance Risk": risk,
    "Required Guardrails": rules,
    "Publish Date": "2026-01-15",
    "Source / Inspiration": "Rankings.io service architecture, localized for Malaysia",
    "Internal Links To": "/contact; /blog/can-lawyers-advertise-malaysia-2026",
    "Notes Before Writing": "Commercial page. Use conservative benefit language and avoid result guarantees.",
  });
}

const practiceAreas = [
  ["PRA-001", "/practice-areas/corporate-commercial-law-marketing", "Corporate & Commercial Lawyer Marketing Malaysia", "corporate lawyer marketing Malaysia", "commercial lawyer SEO Malaysia; corporate law firm website Malaysia; M&A lawyer website Malaysia", "P0", "Medium", "Very High"],
  ["PRA-002", "/practice-areas/property-conveyancing-lawyer-marketing", "Property & Conveyancing Lawyer Marketing Malaysia", "conveyancing lawyer marketing Malaysia", "property lawyer SEO Malaysia; conveyancing lawyer website Malaysia; SPA lawyer website Malaysia", "P0", "Medium", "Very High"],
  ["PRA-003", "/practice-areas/civil-litigation-lawyer-marketing", "Civil Litigation Lawyer Marketing Malaysia", "civil litigation lawyer SEO Malaysia", "litigation lawyer marketing Malaysia; dispute resolution lawyer website Malaysia", "P0", "Medium", "High"],
  ["PRA-004", "/practice-areas/employment-lawyer-marketing", "Employment Lawyer Marketing Malaysia", "employment lawyer marketing Malaysia", "industrial relations lawyer SEO Malaysia; employment law firm website Malaysia", "P0", "Low", "High"],
  ["PRA-005", "/practice-areas/family-law-marketing", "Family & Divorce Lawyer Marketing Malaysia", "family lawyer marketing Malaysia", "divorce lawyer SEO Malaysia; family law firm website Malaysia", "P1", "Medium", "High"],
  ["PRA-006", "/practice-areas/immigration-lawyer-marketing", "Immigration Lawyer Marketing Malaysia", "immigration lawyer SEO Malaysia", "immigration law firm marketing Malaysia; visa lawyer website Malaysia", "P1", "Low", "High"],
  ["PRA-007", "/practice-areas/bankruptcy-lawyer-marketing", "Bankruptcy & Insolvency Lawyer Marketing Malaysia", "bankruptcy lawyer SEO Malaysia", "insolvency lawyer marketing Malaysia; winding up lawyer website Malaysia", "P1", "Low", "High"],
  ["PRA-008", "/practice-areas/intellectual-property-lawyer-marketing", "Intellectual Property Lawyer Marketing Malaysia", "IP lawyer marketing Malaysia", "trademark lawyer SEO Malaysia; intellectual property law firm website Malaysia", "P1", "Low", "Medium"],
  ["PRA-009", "/practice-areas/tax-lawyer-marketing", "Tax Lawyer Marketing Malaysia", "tax lawyer marketing Malaysia", "tax law firm SEO Malaysia; revenue lawyer website Malaysia", "P1", "Low", "Medium"],
  ["PRA-010", "/practice-areas/construction-law-lawyer-marketing", "Construction Lawyer Marketing Malaysia", "construction lawyer marketing Malaysia", "construction law firm SEO Malaysia; adjudication lawyer website Malaysia", "P1", "Low", "Medium"],
  ["PRA-011", "/practice-areas/real-estate-lawyer-marketing", "Real Estate Lawyer Marketing Malaysia", "real estate lawyer marketing Malaysia", "real estate law firm website Malaysia; property dispute lawyer SEO", "P2", "Low", "Medium"],
  ["PRA-012", "/practice-areas/estate-planning-lawyer-marketing", "Estate Planning & Probate Lawyer Marketing Malaysia", "probate lawyer marketing Malaysia", "estate planning lawyer SEO Malaysia; will writing lawyer website", "P2", "Low", "Medium"],
  ["PRA-013", "/practice-areas/criminal-defense-lawyer-marketing", "Criminal Defense Lawyer Marketing Malaysia", "criminal lawyer marketing Malaysia", "criminal defense lawyer SEO Malaysia; criminal law firm website Malaysia", "P2", "Medium", "Medium"],
  ["PRA-014", "/practice-areas/insurance-claims-lawyer-marketing", "Insurance Claims Lawyer Marketing Malaysia", "insurance claims lawyer marketing Malaysia", "insurance dispute lawyer SEO Malaysia", "P3", "Low", "Low"],
  ["PRA-015", "/practice-areas/cybercrime-tech-lawyer-marketing", "Cybercrime & Technology Lawyer Marketing Malaysia", "technology lawyer marketing Malaysia", "cybercrime lawyer SEO Malaysia; tech law firm website Malaysia", "P3", "Low", "Medium"],
  ["PRA-016", "/practice-areas/entertainment-media-lawyer-marketing", "Entertainment & Media Lawyer Marketing Malaysia", "media lawyer marketing Malaysia", "entertainment lawyer SEO Malaysia; media law firm website", "P3", "Low", "Low"],
  ["PRA-017", "/practice-areas/environmental-lawyer-marketing", "Environmental Lawyer Marketing Malaysia", "environmental lawyer marketing Malaysia", "environmental law firm SEO Malaysia", "P3", "Low", "Low"],
  ["PRA-018", "/practice-areas/maritime-lawyer-marketing", "Maritime & Admiralty Lawyer Marketing Malaysia", "maritime lawyer marketing Malaysia", "admiralty lawyer SEO Malaysia; shipping lawyer website Malaysia", "P3", "Low", "Low"],
  ["PRA-019", "/practice-areas/personal-injury-lawyer-marketing", "Personal Injury Lawyer Marketing Malaysia", "personal injury lawyer marketing Malaysia", "accident lawyer SEO Malaysia; injury lawyer website Malaysia", "P3", "Medium", "Low"],
  ["PRA-020", "/practice-areas/medical-malpractice-lawyer-marketing", "Medical Malpractice Lawyer Marketing Malaysia", "medical negligence lawyer marketing Malaysia", "medical malpractice lawyer SEO Malaysia", "P3", "Low", "Low"],
];

for (const [id, url, title, kw, secondary, priority, comp, opp] of practiceAreas) {
  add({
    ...withCep("Practice Area Marketing", {}),
    ID: id,
    Status: id === "PRA-001" || id === "PRA-002" || id === "PRA-003" ? "Refresh" : "New/Refresh",
    "Proposed URL": url,
    "Page Type": "Practice Area Page",
    Cluster: "Practice Area Marketing",
    "Primary Keyword": kw,
    "Secondary Keywords": secondary,
    "Search Intent": "Commercial",
    "Funnel Stage": "MOFU",
    "Business Goal": "Capture practice-specific long-tail searches",
    Priority: priority,
    Competition: comp,
    Opportunity: opp,
    "Target Audience": "Lawyers in this specific practice area",
    "CTA Variant": "practiceAreaOffer",
    "Compliance Risk": id.includes("personal-injury") || id.includes("medical") ? "Medium" : "Low",
    "Required Guardrails": guardrails.standard + " Do not imply expertise for a client. Avoid US-style claims.",
    "Publish Date": "2026-02-05",
    "Source / Inspiration": "Rankings.io practice service pages adapted to Malaysian practice mix",
    "Internal Links To": "/services/law-firm-seo; /services/website-design-for-lawyers; /contact",
    "Notes Before Writing": "Explain search journeys, website sections, GBP/local SEO notes, content ideas, and compliance-safe inquiry flow.",
  });
}

const blogGroups = [
  ["Compliance", "P0", "High", "Very High", "complianceOffer", [
    ["BLG-COM-001", "/blog/can-lawyers-advertise-malaysia-2026", "can lawyers advertise in Malaysia", "lawyer advertising rules Malaysia 2026; Malaysian Bar publicity rules", "Can Malaysian lawyers advertise online in 2026?", "Informational"],
    ["BLG-COM-002", "/blog/legal-profession-publicity-rules-2025-explained", "Legal Profession Publicity Rules 2025", "Bar Council publicity rules explained; Malaysian lawyer advertising rules", "Legal Profession Publicity Rules 2025 explained for law firm websites", "Informational"],
    ["BLG-COM-003", "/blog/bar-council-compliant-law-firm-website", "Bar Council compliant law firm website", "lawyer website rules Malaysia; law firm website compliance", "What should a Malaysian law firm website avoid saying?", "Informational"],
    ["BLG-COM-004", "/blog/can-lawyers-use-google-ads-malaysia", "can lawyers use Google Ads Malaysia", "Google Ads for lawyers Malaysia allowed; law firm PPC compliance", "Can Malaysian lawyers run Google Ads?", "Commercial"],
    ["BLG-COM-005", "/blog/can-lawyers-use-social-media-malaysia", "can lawyers use social media Malaysia", "Facebook for lawyers Malaysia; LinkedIn for Malaysian lawyers", "Can Malaysian lawyers use social media for visibility?", "Informational"],
    ["BLG-COM-006", "/blog/what-lawyers-should-not-say-in-marketing", "what lawyers should not say in marketing", "lawyer advertising compliance Malaysia; misleading lawyer ads", "Phrases Malaysian lawyers should avoid in marketing copy", "Informational"],
    ["BLG-COM-007", "/blog/law-firm-marketing-compliance-checklist-malaysia", "law firm marketing compliance checklist Malaysia", "lawyer website checklist Malaysia; compliant legal marketing", "A compliance-conscious marketing checklist for Malaysian law firms", "Informational"],
    ["BLG-COM-008", "/blog/free-consultation-wording-for-lawyers-malaysia", "free consultation wording lawyers Malaysia", "law firm CTA wording Malaysia; lawyer website call to action", "How to write safe website CTAs for Malaysian lawyers", "Commercial"],
  ]],
  ["Website", "P0", "Medium", "Very High", "websiteOffer", [
    ["BLG-WEB-001", "/blog/law-firm-website-checklist-malaysia", "law firm website checklist Malaysia", "lawyer website checklist; legal website design Malaysia", "Law firm website checklist for Malaysian lawyers", "Informational"],
    ["BLG-WEB-002", "/blog/how-much-law-firm-website-cost-malaysia", "law firm website cost Malaysia", "lawyer website package Malaysia; legal website pricing", "How much should a law firm website cost in Malaysia?", "Commercial"],
    ["BLG-WEB-003", "/blog/what-pages-should-law-firm-website-have", "what pages should law firm website have", "law firm website structure; lawyer website pages", "What pages should a Malaysian law firm website have?", "Informational"],
    ["BLG-WEB-004", "/blog/best-law-firm-website-examples-malaysia", "law firm website examples Malaysia", "best law firm websites; lawyer website inspiration Malaysia", "Law firm website examples Malaysian lawyers can learn from", "Informational"],
    ["BLG-WEB-005", "/blog/lawyer-website-speed-checklist", "lawyer website speed checklist", "PageSpeed for law firms; Core Web Vitals lawyers", "Website speed checklist for law firms", "Informational"],
    ["BLG-WEB-006", "/blog/law-firm-website-content-guide", "law firm website content", "practice area page content; lawyer bio content; law firm FAQ", "Law firm website content guide", "Informational"],
    ["BLG-WEB-007", "/blog/lawyer-bio-page-guide-malaysia", "lawyer bio page Malaysia", "lawyer profile website; advocate solicitor bio page", "How Malaysian lawyers should structure bio pages", "Informational"],
    ["BLG-WEB-008", "/blog/landing-page-for-lawyers-malaysia", "landing page for lawyers Malaysia", "lawyer landing page; law firm landing page Malaysia", "When should a law firm use a landing page?", "Commercial"],
  ]],
  ["SEO", "P0", "Medium", "Very High", "auditOffer", [
    ["BLG-SEO-001", "/blog/seo-for-lawyers-malaysia", "SEO for lawyers Malaysia", "law firm SEO Malaysia; legal SEO Malaysia", "SEO for lawyers in Malaysia: complete guide", "Informational"],
    ["BLG-SEO-002", "/blog/local-seo-for-lawyers-malaysia", "local SEO for lawyers Malaysia", "Google Maps lawyers Malaysia; law firm local SEO", "Local SEO for Malaysian law firms", "Informational"],
    ["BLG-SEO-003", "/blog/google-business-profile-for-lawyers-malaysia", "Google Business Profile for lawyers Malaysia", "Google My Business lawyers Malaysia; lawyer Google Maps profile", "Google Business Profile guide for lawyers", "Informational"],
    ["BLG-SEO-004", "/blog/technical-seo-for-law-firm-websites-malaysia", "technical SEO for law firm websites", "lawyer technical SEO; website indexing law firms", "Technical SEO checklist for law firm websites", "Informational"],
    ["BLG-SEO-005", "/blog/keyword-research-for-malaysian-law-firms", "keyword research for law firms Malaysia", "lawyer keywords Malaysia; legal SEO keywords", "Keyword research for Malaysian law firms", "Informational"],
    ["BLG-SEO-006", "/blog/long-tail-keywords-for-lawyers-malaysia", "long-tail keywords for lawyers Malaysia", "legal long-tail SEO; lawyer content keywords", "Long-tail keyword strategy for Malaysian lawyers", "Informational"],
    ["BLG-SEO-007", "/blog/how-long-seo-takes-law-firm-malaysia", "how long does SEO take for law firm", "SEO timeline lawyers; law firm SEO results timeline", "How long does SEO take for a Malaysian law firm?", "Commercial"],
    ["BLG-SEO-008", "/blog/schema-markup-for-law-firms-malaysia", "schema markup for law firms", "LegalService schema Malaysia; lawyer structured data", "Schema markup for Malaysian law firm websites", "Informational"],
    ["BLG-SEO-009", "/blog/internal-linking-for-law-firm-seo", "internal linking law firm SEO", "law firm site architecture; legal content hub", "Internal linking for law firm SEO", "Informational"],
    ["BLG-SEO-010", "/blog/law-firm-content-calendar-malaysia", "law firm content calendar Malaysia", "lawyer blog calendar; legal content planning", "Content calendar for Malaysian law firms", "Informational"],
  ]],
  ["Paid Media", "P1", "Medium", "Medium", "adsOffer", [
    ["BLG-ADS-001", "/blog/google-ads-for-lawyers-malaysia", "Google Ads for lawyers Malaysia", "law firm PPC Malaysia; lawyer paid search Malaysia", "Google Ads for lawyers in Malaysia", "Commercial"],
    ["BLG-ADS-002", "/blog/seo-vs-google-ads-for-law-firms", "SEO vs Google Ads for law firms", "lawyer SEO or PPC; legal marketing channels", "SEO vs Google Ads for Malaysian law firms", "Commercial"],
    ["BLG-ADS-003", "/blog/meta-ads-for-law-firms-malaysia", "Meta ads for law firms Malaysia", "Facebook ads lawyers Malaysia; Instagram ads law firms", "Meta ads for law firms in Malaysia", "Commercial"],
    ["BLG-ADS-004", "/blog/linkedin-marketing-for-corporate-lawyers", "LinkedIn marketing for corporate lawyers", "corporate lawyer LinkedIn strategy; law firm LinkedIn Malaysia", "LinkedIn marketing for corporate lawyers", "Commercial"],
    ["BLG-ADS-005", "/blog/law-firm-ad-copy-compliance-malaysia", "law firm ad copy compliance Malaysia", "lawyer ad copy; legal ad wording Malaysia", "How to write safer law firm ad copy", "Informational"],
    ["BLG-ADS-006", "/blog/how-to-track-law-firm-ad-inquiries", "track law firm ad inquiries", "law firm lead tracking; legal marketing attribution", "How to track law firm ad inquiries", "Informational"],
  ]],
  ["AI Search", "P1", "Low", "High", "auditOffer", [
    ["BLG-AI-001", "/blog/ai-search-for-law-firms-malaysia", "AI search for law firms Malaysia", "AI SEO lawyers Malaysia; GEO law firms", "AI search for Malaysian law firms", "Informational"],
    ["BLG-AI-002", "/blog/chatgpt-for-lawyers-malaysia", "ChatGPT for lawyers Malaysia", "AI tools for lawyers Malaysia; lawyers using ChatGPT", "ChatGPT for lawyers in Malaysia", "Informational"],
    ["BLG-AI-003", "/blog/how-ai-search-reads-law-firm-websites", "how AI search reads websites", "LLM SEO law firms; AI citations lawyers", "How AI search reads law firm websites", "Informational"],
    ["BLG-AI-004", "/blog/aio-vs-seo-for-lawyers", "AIO vs SEO for lawyers", "AI optimization vs SEO; GEO vs SEO lawyers", "AIO vs SEO for lawyers", "Commercial"],
    ["BLG-AI-005", "/blog/should-law-firms-use-ai-content", "should law firms use AI content", "AI written legal content; lawyer AI content risks", "Should law firms use AI-written content?", "Informational"],
  ]],
  ["CRM & Intake", "P1", "Low", "High", "crmOffer", [
    ["BLG-CRM-001", "/blog/law-firm-crm-malaysia", "law firm CRM Malaysia", "legal CRM Malaysia; CRM for small law firms", "Simple CRM setup for Malaysian law firms", "Commercial"],
    ["BLG-CRM-002", "/blog/whatsapp-follow-up-for-law-firm-leads", "WhatsApp follow-up law firm leads", "WhatsApp automation lawyers; legal lead follow-up", "WhatsApp follow-up workflow for law firm inquiries", "Commercial"],
    ["BLG-CRM-003", "/blog/law-firm-client-intake-checklist", "law firm client intake checklist", "lawyer intake process; legal inquiry workflow", "Client intake checklist for law firms", "Informational"],
    ["BLG-CRM-004", "/blog/google-sheets-crm-for-law-firms", "Google Sheets CRM for law firms", "law firm spreadsheet CRM; lawyer lead tracker", "Google Sheets CRM for small law firms", "Informational"],
    ["BLG-CRM-005", "/blog/twenty-crm-for-law-firm-inquiries", "Twenty CRM law firm", "open source CRM law firm; legal CRM workflow", "Twenty CRM for law firm inquiry tracking", "Commercial"],
    ["BLG-CRM-006", "/blog/dify-whatsapp-automation-law-firms", "Dify WhatsApp automation law firms", "Evolution API WhatsApp lawyers; Dify law firm workflow", "Dify + WhatsApp automation for law firm follow-up", "Commercial"],
  ]],
];

const publishDates = ["2026-01-22", "2026-01-29", "2026-02-05", "2026-02-12", "2026-02-19", "2026-02-26", "2026-03-05", "2026-03-12", "2026-03-19", "2026-03-26", "2026-04-02", "2026-04-09", "2026-04-16", "2026-04-23", "2026-04-30"];
let dateIdx = 0;

for (const [cluster, priority, comp, opp, cta, items] of blogGroups) {
  for (const [id, url, kw, secondary, title, intent] of items) {
    add({
      ...withCep(cluster, {}),
      ID: id,
      Status: "New",
      "Proposed URL": url,
      "Page Type": "Blog Post",
      Cluster: cluster,
      "Primary Keyword": kw,
      "Secondary Keywords": secondary,
      "Search Intent": intent,
      "Funnel Stage": intent === "Commercial" ? "MOFU" : "TOFU",
      "Business Goal": "Build long-tail topical authority and internal links",
      Priority: priority,
      Competition: comp,
      Opportunity: opp,
      "Target Audience": defaultAudience,
      "CTA Variant": cta,
      "Compliance Risk": cluster === "Compliance" || cluster === "Paid Media" ? "High" : "Medium",
      "Required Guardrails": cluster === "Compliance" ? guardrails.compliance : cluster === "Paid Media" ? guardrails.ads : guardrails.standard,
      "Publish Date": publishDates[dateIdx++ % publishDates.length],
      "Source / Inspiration": "Rankings.io topic architecture, Malaysia-localized",
      "Internal Links To": "/services/law-firm-seo; /services/website-design-for-lawyers; /contact",
      "Notes Before Writing": `Draft as ${title}. No fake examples or client results.`,
    });
  }
}

const localPages = [
  ["LOC-001", "/locations/kuala-lumpur-law-firm-marketing", "law firm marketing Kuala Lumpur", "KL lawyer SEO; Kuala Lumpur law firm website", "Kuala Lumpur"],
  ["LOC-002", "/locations/selangor-law-firm-marketing", "law firm marketing Selangor", "Selangor lawyer website; lawyer SEO Selangor", "Selangor"],
  ["LOC-003", "/locations/petaling-jaya-law-firm-marketing", "law firm marketing Petaling Jaya", "PJ lawyer website; lawyer SEO PJ", "Petaling Jaya"],
  ["LOC-004", "/locations/penang-law-firm-marketing", "law firm marketing Penang", "Penang lawyer SEO; law firm website Penang", "Penang"],
  ["LOC-005", "/locations/johor-bahru-law-firm-marketing", "law firm marketing Johor Bahru", "JB lawyer SEO; law firm website Johor", "Johor Bahru"],
  ["LOC-006", "/locations/ipoh-law-firm-marketing", "law firm marketing Ipoh", "Ipoh lawyer website; Perak law firm SEO", "Ipoh"],
  ["LOC-007", "/locations/melaka-law-firm-marketing", "law firm marketing Melaka", "Melaka lawyer SEO; law firm website Melaka", "Melaka"],
  ["LOC-008", "/locations/kota-kinabalu-law-firm-marketing", "law firm marketing Kota Kinabalu", "Sabah lawyer SEO; law firm website Sabah", "Kota Kinabalu"],
];

for (const [id, url, kw, secondary, city] of localPages) {
  add({
    ...withCep("Local Market", {}),
    ID: id,
    Status: "New",
    "Proposed URL": url,
    "Page Type": "Location Page",
    Cluster: "Local Market",
    "Primary Keyword": kw,
    "Secondary Keywords": secondary,
    "Search Intent": "Commercial",
    "Funnel Stage": "MOFU",
    "Business Goal": "Capture geographic searches cautiously",
    Priority: city === "Kuala Lumpur" || city === "Selangor" || city === "Petaling Jaya" ? "P1" : "P2",
    Competition: "Low",
    Opportunity: "Medium",
    "Target Audience": `Law firms in ${city}`,
    "CTA Variant": "auditOffer",
    "Compliance Risk": "Medium",
    "Required Guardrails": guardrails.standard + " Do not imply local office unless true.",
    "Publish Date": "2026-04-30",
    "Source / Inspiration": "Competitor location page architecture, localized",
    "Internal Links To": "/services/law-firm-seo; /services/google-business-profile-for-lawyers",
    "Notes Before Writing": "Only publish if we are comfortable targeting this city without claiming a physical branch.",
  });
}

const dataStudies = [
  ["DAT-001", "/data-studies/malaysian-law-firm-website-visibility-study-2026", "Malaysian law firm website visibility study", "law firm website study Malaysia; legal marketing data Malaysia"],
  ["DAT-002", "/data-studies/google-business-profile-law-firm-study-malaysia", "Google Business Profile law firm study Malaysia", "lawyer Google Maps study Malaysia; GBP ranking law firms"],
  ["DAT-003", "/data-studies/law-firm-website-speed-study-malaysia", "law firm website speed study Malaysia", "PageSpeed law firms Malaysia; legal website speed"],
  ["DAT-004", "/data-studies/malaysian-law-firm-content-benchmark", "law firm content benchmark Malaysia", "lawyer website content study; legal content benchmark"],
  ["DAT-005", "/data-studies/legal-ai-search-visibility-malaysia", "legal AI search visibility Malaysia", "AI search law firm study; ChatGPT law firm visibility"],
];

for (const [id, url, kw, secondary] of dataStudies) {
  add({
    ...withCep("Research / Digital PR", {}),
    ID: id,
    Status: "Research Needed",
    "Proposed URL": url,
    "Page Type": "Data Study",
    Cluster: "Research / Digital PR",
    "Primary Keyword": kw,
    "Secondary Keywords": secondary,
    "Search Intent": "Informational",
    "Funnel Stage": "TOFU",
    "Business Goal": "Build authority and linkable assets",
    Priority: id === "DAT-001" ? "P1" : "P2",
    Competition: "Low",
    Opportunity: "High",
    "Target Audience": "Law firm partners, journalists, SEO-aware lawyers",
    "CTA Variant": "auditOffer",
    "Compliance Risk": "Medium",
    "Required Guardrails": guardrails.proof + " Do not shame named firms without careful review.",
    "Publish Date": "2026-04-30",
    "Source / Inspiration": "Rankings.io data-study architecture",
    "Internal Links To": "/services/law-firm-seo; /blog/seo-for-lawyers-malaysia",
    "Notes Before Writing": "Do not publish until real manual dataset exists. Placeholder only in roadmap.",
  });
}

const icpProfiles = [
  { id: "ICP-01", practice: "Corporate & Commercial", noun: "corporate lawyer", plural: "corporate lawyers", revenue: "Advisory, contracts, retainers, transactions", acquisition: "Founder networks, referrals, LinkedIn, search", dependency: "Partner network and referrals", priority: "P0", competition: "Medium", opportunity: "Very High", client: "SME owners, founders, directors, companies" },
  { id: "ICP-02", practice: "Property & Conveyancing", noun: "conveyancing lawyer", plural: "conveyancing lawyers", revenue: "SPA, loan documentation, property transactions", acquisition: "Agents, bankers, referrals, local search", dependency: "Property agents and banker referrals", priority: "P0", competition: "Medium", opportunity: "Very High", client: "Property buyers, sellers, investors, agents" },
  { id: "ICP-03", practice: "Civil Litigation", noun: "civil litigation lawyer", plural: "civil litigation lawyers", revenue: "Dispute files, advisory, trial preparation", acquisition: "Referrals, search, reputation, lawyer networks", dependency: "Referrals and reputation", priority: "P0", competition: "Medium", opportunity: "High", client: "Businesses and individuals with disputes" },
  { id: "ICP-04", practice: "Employment & Industrial Relations", noun: "employment lawyer", plural: "employment lawyers", revenue: "Employer advisory, employee claims, retainers", acquisition: "HR referrals, LinkedIn, search", dependency: "HR/accounting networks", priority: "P0", competition: "Low", opportunity: "High", client: "Employers, HR teams, employees, executives" },
  { id: "ICP-05", practice: "Family & Divorce", noun: "family lawyer", plural: "family lawyers", revenue: "Divorce, custody, maintenance, mediation", acquisition: "Search, referrals, private recommendations", dependency: "Private referrals and local search", priority: "P1", competition: "Medium", opportunity: "High", client: "Individuals and families needing private help" },
  { id: "ICP-06", practice: "Immigration", noun: "immigration lawyer", plural: "immigration lawyers", revenue: "Visa, MM2H, business immigration, appeals", acquisition: "Search, expat networks, agent referrals", dependency: "Agents and expat referrals", priority: "P1", competition: "Low", opportunity: "High", client: "Foreigners, companies, expats, families" },
  { id: "ICP-07", practice: "Bankruptcy & Insolvency", noun: "insolvency lawyer", plural: "insolvency lawyers", revenue: "Bankruptcy, winding up, restructuring", acquisition: "Search, accountant referrals, business referrals", dependency: "Accountants and business networks", priority: "P1", competition: "Low", opportunity: "High", client: "Debtors, creditors, directors, SMEs" },
  { id: "ICP-08", practice: "Intellectual Property", noun: "IP lawyer", plural: "IP lawyers", revenue: "Trademark, IP advisory, enforcement, licensing", acquisition: "Founders, agencies, search, LinkedIn", dependency: "Startup and agency networks", priority: "P1", competition: "Low", opportunity: "Medium", client: "Founders, brands, creators, companies" },
  { id: "ICP-09", practice: "Tax", noun: "tax lawyer", plural: "tax lawyers", revenue: "Tax disputes, advisory, audit support", acquisition: "Accountant referrals, business networks, search", dependency: "Accountants and corporate referrals", priority: "P1", competition: "Low", opportunity: "Medium", client: "Companies, directors, high-income individuals" },
  { id: "ICP-10", practice: "Construction", noun: "construction lawyer", plural: "construction lawyers", revenue: "Adjudication, disputes, contracts, arbitration", acquisition: "Contractor networks, LinkedIn, referrals, search", dependency: "Industry referrals", priority: "P1", competition: "Low", opportunity: "Medium", client: "Contractors, developers, consultants, suppliers" },
  { id: "ICP-11", practice: "Real Estate", noun: "real estate lawyer", plural: "real estate lawyers", revenue: "Property disputes, leases, development advisory", acquisition: "Property networks, search, referrals", dependency: "Property networks", priority: "P2", competition: "Low", opportunity: "Medium", client: "Landowners, developers, tenants, investors" },
  { id: "ICP-12", practice: "Estate Planning & Probate", noun: "probate lawyer", plural: "probate lawyers", revenue: "Probate, wills, estate planning", acquisition: "Family referrals, financial planners, search", dependency: "Private referrals and financial planners", priority: "P2", competition: "Low", opportunity: "Medium", client: "Families, executors, high-net-worth individuals" },
  { id: "ICP-13", practice: "Criminal Defense", noun: "criminal lawyer", plural: "criminal lawyers", revenue: "Defense matters, bail, urgent consultations", acquisition: "Urgent search, referrals, reputation", dependency: "Urgent referrals and search", priority: "P2", competition: "Medium", opportunity: "Medium", client: "Accused persons and families" },
  { id: "ICP-14", practice: "Insurance Claims", noun: "insurance claims lawyer", plural: "insurance claims lawyers", revenue: "Policy disputes, claims advisory, litigation", acquisition: "Search, referrals, claims networks", dependency: "Referrals and insurer/adjuster ecosystem", priority: "P3", competition: "Low", opportunity: "Low", client: "Policyholders, businesses, claimants" },
  { id: "ICP-15", practice: "Cybercrime & Technology", noun: "technology lawyer", plural: "technology lawyers", revenue: "Cybercrime, data, technology contracts", acquisition: "LinkedIn, founder networks, search", dependency: "Tech ecosystem referrals", priority: "P3", competition: "Low", opportunity: "Medium", client: "Tech companies, victims, founders, SMEs" },
  { id: "ICP-16", practice: "Entertainment & Media", noun: "media lawyer", plural: "media lawyers", revenue: "Contracts, IP, defamation, media advisory", acquisition: "Creative networks, referrals, social media", dependency: "Creative industry referrals", priority: "P3", competition: "Low", opportunity: "Low", client: "Creators, agencies, media companies" },
  { id: "ICP-17", practice: "Environmental", noun: "environmental lawyer", plural: "environmental lawyers", revenue: "Compliance, disputes, project advisory", acquisition: "Corporate referrals, ESG networks, search", dependency: "Corporate and ESG referrals", priority: "P3", competition: "Low", opportunity: "Low", client: "Companies, developers, NGOs, landowners" },
  { id: "ICP-18", practice: "Maritime & Admiralty", noun: "maritime lawyer", plural: "maritime lawyers", revenue: "Shipping disputes, cargo claims, maritime advisory", acquisition: "Industry networks, referrals, search", dependency: "Shipping ecosystem referrals", priority: "P3", competition: "Low", opportunity: "Low", client: "Shipping companies, insurers, logistics firms" },
  { id: "ICP-19", practice: "Personal Injury", noun: "accident lawyer", plural: "accident lawyers", revenue: "Accident claims, injury disputes", acquisition: "Search, referrals, local visibility", dependency: "Search and informal referrals", priority: "P3", competition: "Medium", opportunity: "Low", client: "Accident victims and families" },
  { id: "ICP-20", practice: "Medical Negligence", noun: "medical negligence lawyer", plural: "medical negligence lawyers", revenue: "Medical negligence claims, advisory, litigation", acquisition: "Search, referrals, specialist networks", dependency: "Specialist referrals and search", priority: "P3", competition: "Low", opportunity: "Low", client: "Patients and families" },
];

const practiceCepTemplates = [
  { code: "PCEP-01", name: "Referral dependency risk", trigger: "The lawyer realizes referrals are inconsistent or controlled by someone else.", pain: "The firm depends too much on one referral source.", jtbd: "Build a more independent source of qualified inquiries.", intent: "Commercial", awareness: "Problem Aware", createAs: "Blog Post", priorityBoost: 0, modifier: "referral dependency", cta: "auditOffer" },
  { code: "PCEP-02", name: "Invisible on Google", trigger: "A potential client searches online and competitors appear first.", pain: "The firm is hard to find in organic search.", jtbd: "Understand how search visibility works for this practice.", intent: "Informational", awareness: "Problem Aware", createAs: "Blog Post", priorityBoost: 0, modifier: "Google visibility", cta: "auditOffer" },
  { code: "PCEP-03", name: "Weak website credibility", trigger: "The lawyer sends a referral to the website and worries it hurts trust.", pain: "The website does not match the firm's professional standard.", jtbd: "Upgrade digital credibility before prospects compare firms.", intent: "Commercial", awareness: "Solution Aware", createAs: "Practice Page Section", priorityBoost: 0, modifier: "website credibility", cta: "websiteOffer" },
  { code: "PCEP-04", name: "Prospects ask repeated basic questions", trigger: "The firm keeps answering the same preliminary questions manually.", pain: "Consultation time is wasted educating unqualified prospects.", jtbd: "Use content to pre-educate and qualify inquiries.", intent: "Informational", awareness: "Problem Aware", createAs: "FAQ / Blog", priorityBoost: 1, modifier: "client questions", cta: "auditOffer" },
  { code: "PCEP-05", name: "Wants higher-value matters", trigger: "The lawyer wants better-fit matters instead of more random inquiries.", pain: "Marketing attracts broad or low-fit inquiries.", jtbd: "Position the practice for more suitable matters.", intent: "Commercial", awareness: "Solution Aware", createAs: "Blog Post", priorityBoost: 0, modifier: "higher value matters", cta: "practiceAreaOffer" },
  { code: "PCEP-06", name: "Unsure what can be advertised", trigger: "The lawyer wants visibility but is cautious about Malaysian publicity rules.", pain: "Fear of saying the wrong thing blocks marketing action.", jtbd: "Find a compliance-conscious way to explain the practice.", intent: "Informational", awareness: "Problem Aware", createAs: "Blog Post", priorityBoost: 0, modifier: "advertising rules", cta: "complianceOffer" },
  { code: "PCEP-07", name: "Local market visibility gap", trigger: "The firm wants to be found by people in a specific city or area.", pain: "The firm has no clear local search footprint.", jtbd: "Improve local discoverability without claiming anything untrue.", intent: "Commercial", awareness: "Solution Aware", createAs: "Section / Location Support", priorityBoost: 1, modifier: "local SEO", cta: "auditOffer" },
  { code: "PCEP-08", name: "Slow follow-up loses inquiries", trigger: "Website or WhatsApp inquiries are not followed up quickly.", pain: "Potential clients go cold before the firm responds.", jtbd: "Create a simple follow-up and tracking workflow.", intent: "Commercial", awareness: "Solution Aware", createAs: "Blog Post", priorityBoost: 1, modifier: "lead follow up", cta: "crmOffer" },
  { code: "PCEP-09", name: "Needs authority content", trigger: "The lawyer wants to look credible before referrals and search visitors contact them.", pain: "The firm has little educational content demonstrating clarity.", jtbd: "Publish useful content that explains the practice safely.", intent: "Informational", awareness: "Problem Aware", createAs: "Blog Post", priorityBoost: 1, modifier: "authority content", cta: "auditOffer" },
  { code: "PCEP-10", name: "AI search uncertainty", trigger: "The lawyer hears clients may use AI tools to research legal options.", pain: "The firm is not structured for AI/search engines to understand it.", jtbd: "Prepare the website for AI-assisted discovery.", intent: "Informational", awareness: "Unaware / Problem Aware", createAs: "Long-Term Blog", priorityBoost: 2, modifier: "AI search", cta: "auditOffer" },
];

const solutionAngles = [
  { id: "SOL-01", name: "Website", keyword: "website", product: "Website Design", pageType: "Blog Post", competition: "Medium", opportunity: "High", funnel: "MOFU", cta: "websiteOffer" },
  { id: "SOL-02", name: "SEO", keyword: "SEO", product: "Law Firm SEO", pageType: "Blog Post", competition: "Medium", opportunity: "Very High", funnel: "MOFU", cta: "auditOffer" },
  { id: "SOL-03", name: "Google Business Profile", keyword: "Google Business Profile", product: "Local SEO / GBP", pageType: "Blog Post", competition: "Medium", opportunity: "High", funnel: "MOFU", cta: "auditOffer" },
  { id: "SOL-04", name: "Google Ads", keyword: "Google Ads", product: "Paid Search", pageType: "Blog Post", competition: "Medium", opportunity: "Medium", funnel: "MOFU", cta: "adsOffer" },
  { id: "SOL-05", name: "Meta Ads", keyword: "Meta ads", product: "Paid Social", pageType: "Long-Term Blog", competition: "Low", opportunity: "Medium", funnel: "MOFU", cta: "adsOffer" },
  { id: "SOL-06", name: "LinkedIn / Social Content", keyword: "LinkedIn content", product: "Social / Content", pageType: "Blog Post", competition: "Low", opportunity: "High", funnel: "TOFU", cta: "auditOffer" },
  { id: "SOL-07", name: "Content Marketing", keyword: "content marketing", product: "Content Marketing", pageType: "Blog Post", competition: "Low", opportunity: "High", funnel: "TOFU", cta: "auditOffer" },
  { id: "SOL-08", name: "AI Search", keyword: "AI search", product: "AI Search Optimization", pageType: "Long-Term Blog", competition: "Low", opportunity: "High", funnel: "TOFU", cta: "auditOffer" },
  { id: "SOL-09", name: "CRM / WhatsApp Follow-Up", keyword: "WhatsApp follow up", product: "CRM / Intake Automation", pageType: "Blog Post", competition: "Low", opportunity: "High", funnel: "MOFU", cta: "crmOffer" },
  { id: "SOL-10", name: "Compliance-Safe Copy", keyword: "compliant marketing copy", product: "Compliance-Conscious Copy Review", pageType: "Blog Post", competition: "Low", opportunity: "Very High", funnel: "MOFU", cta: "complianceOffer" },
];

const slugify = (value) => value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const matrixRows = [];
let matrixId = 1;
for (const icp of icpProfiles) {
  for (const cep of practiceCepTemplates) {
    for (const solution of solutionAngles) {
      const ideaId = `IDEA-${String(matrixId).padStart(4, "0")}`;
      const phase = icp.priority === "P0" && cep.priorityBoost === 0 && ["SOL-01", "SOL-02", "SOL-03", "SOL-10"].includes(solution.id)
        ? "Phase 1"
        : icp.priority === "P0" || icp.priority === "P1"
          ? "Phase 2"
          : cep.priorityBoost <= 1
            ? "Phase 3"
            : "Backlog";
      const createAs = phase === "Phase 1" ? "Dedicated Blog Post" : phase === "Phase 2" ? cep.createAs : phase === "Phase 3" ? "Section / FAQ / Later Blog" : "Backlog";
      const primaryKeyword = `${icp.noun} ${solution.keyword} ${cep.modifier} Malaysia`;
      const urlSlug = `/blog/${slugify(`${icp.noun}-${solution.keyword}-${cep.modifier}-malaysia`)}`;
      const risk = cep.code === "PCEP-06" || solution.id === "SOL-04" || solution.id === "SOL-05" || solution.id === "SOL-10" ? "High" : icp.practice.includes("Personal Injury") || icp.practice.includes("Medical") || icp.practice.includes("Criminal") ? "Medium" : "Low";
      matrixRows.push([
        ideaId,
        phase,
        createAs,
        urlSlug,
        icp.id,
        icp.practice,
        icp.noun,
        icp.revenue,
        icp.acquisition,
        icp.dependency,
        cep.code,
        cep.name,
        cep.trigger,
        cep.pain,
        cep.jtbd,
        solution.id,
        solution.name,
        solution.product,
        primaryKeyword,
        `${icp.plural} ${solution.keyword}; ${icp.noun} ${cep.modifier}; ${solution.keyword} for ${icp.plural}`,
        cep.intent,
        cep.awareness,
        solution.funnel,
        "Capture practice-specific long-tail intent without creating thin pages",
        icp.client,
        icp.priority,
        solution.competition,
        solution.opportunity,
        solution.cta || cep.cta,
        risk,
        risk === "High" ? guardrails.ads : guardrails.standard,
        "Do not publish all matrix rows. Promote to publishable sitemap only after review.",
      ]);
      matrixId++;
    }
  }
}

const summaryCounts = rows.reduce((acc, r) => {
  const type = r[headers.indexOf("Page Type")];
  acc[type] = (acc[type] || 0) + 1;
  return acc;
}, {});

const priorityCounts = rows.reduce((acc, r) => {
  const priority = r[headers.indexOf("Priority")];
  acc[priority] = (acc[priority] || 0) + 1;
  return acc;
}, {});
const phaseCounts = matrixRows.reduce((acc, r) => {
  const phase = r[1];
  acc[phase] = (acc[phase] || 0) + 1;
  return acc;
}, {});

const workbook = Workbook.create();
const dashboard = workbook.worksheets.add("Dashboard");
const inventory = workbook.worksheets.add("Content Inventory");
const icpMatrix = workbook.worksheets.add("ICP CEP Matrix");
const cepMap = workbook.worksheets.add("CEP Archetypes");
const framework = workbook.worksheets.add("Keyword Framework");
const cta = workbook.worksheets.add("CTA Map");
const guardrailSheet = workbook.worksheets.add("Compliance Guardrails");
const competitor = workbook.worksheets.add("Competitor Reference");
const validation = workbook.worksheets.add("Validation Checklist");

for (const sheet of [dashboard, inventory, icpMatrix, cepMap, framework, cta, guardrailSheet, competitor, validation]) {
  sheet.showGridLines = false;
}

// Inventory
const lastInventoryCol = colLetter(headers.length - 1);
inventory.getRange(`A1:${lastInventoryCol}1`).values = [headers];
inventory.getRangeByIndexes(1, 0, rows.length, headers.length).values = rows;
inventory.tables.add(`A1:${lastInventoryCol}${rows.length + 1}`, true, "ContentInventory");
inventory.freezePanes.freezeRows(1);
inventory.getRange(`A1:${lastInventoryCol}1`).format = { fill: "#111827", font: { bold: true, color: "#FFFFFF" }, wrapText: true };
inventory.getRange(`A2:${lastInventoryCol}${rows.length + 1}`).format = { wrapText: true };
const widths = [90, 110, 290, 145, 150, 95, 210, 280, 390, 260, 360, 120, 105, 230, 80, 105, 110, 220, 140, 120, 430, 110, 240, 310, 430];
widths.forEach((w, i) => inventory.getRangeByIndexes(0, i, rows.length + 1, 1).format.columnWidthPx = w);
inventory.getRange(`${colLetter(headers.indexOf("Publish Date"))}2:${colLetter(headers.indexOf("Publish Date"))}${rows.length + 1}`).setNumberFormat("yyyy-mm-dd");

// ICP x CEP Matrix
const matrixHeaders = [
  "Idea ID",
  "Execution Phase",
  "Create As",
  "Potential URL",
  "ICP ID",
  "ICP / Practice Area",
  "Lawyer Avatar",
  "Practice Revenue Model",
  "How They Usually Get Clients",
  "Main Dependency",
  "Practice CEP Code",
  "Practice CEP",
  "Trigger Event",
  "Pain Point",
  "JTBD",
  "Solution ID",
  "Solution Angle",
  "Product Match",
  "Primary Keyword",
  "Secondary Keyword Variants",
  "Search Intent",
  "Awareness Level",
  "Funnel Stage",
  "Business Goal",
  "Target Client",
  "ICP Priority",
  "Competition",
  "Opportunity",
  "CTA Variant",
  "Compliance Risk",
  "Guardrails",
  "Promotion Rule",
];
const lastMatrixCol = colLetter(matrixHeaders.length - 1);
icpMatrix.getRange(`A1:${lastMatrixCol}1`).values = [matrixHeaders];
icpMatrix.getRangeByIndexes(1, 0, matrixRows.length, matrixHeaders.length).values = matrixRows;
icpMatrix.tables.add(`A1:${lastMatrixCol}${matrixRows.length + 1}`, true, "ICPCEPMatrix");
icpMatrix.freezePanes.freezeRows(1);
icpMatrix.getRange(`A1:${lastMatrixCol}1`).format = { fill: "#111827", font: { bold: true, color: "#FFFFFF" }, wrapText: true };
icpMatrix.getRange(`A2:${lastMatrixCol}${matrixRows.length + 1}`).format = { wrapText: true };
const matrixWidths = [95, 110, 170, 340, 90, 190, 190, 260, 300, 250, 105, 220, 420, 330, 360, 95, 190, 210, 320, 390, 120, 150, 110, 330, 240, 90, 105, 110, 130, 120, 420, 330];
matrixWidths.forEach((w, i) => icpMatrix.getRangeByIndexes(0, i, matrixRows.length + 1, 1).format.columnWidthPx = w);

// CEP Map
cepMap.getRange("A1:F1").values = [["CEP Code", "Category Entry Point", "Avatar Situation", "Trigger Moment", "Default Cluster", "Default CTA"]];
cepMap.getRangeByIndexes(1, 0, cepDefinitions.length, 6).values = cepDefinitions;
cepMap.tables.add(`A1:F${cepDefinitions.length + 1}`, true, "CEPMap");
cepMap.getRange("A1:F1").format = { fill: "#111827", font: { bold: true, color: "#FFFFFF" }, wrapText: true };
cepMap.getRange(`A2:F${cepDefinitions.length + 1}`).format = { wrapText: true };
[95, 230, 300, 470, 190, 150].forEach((w, i) => cepMap.getRangeByIndexes(0, i, cepDefinitions.length + 1, 1).format.columnWidthPx = w);

// Dashboard
dashboard.getRange("A1:H1").merge();
dashboard.getRange("A1").values = [["LawyerMarketing.my Content & Sitemap Masterplan"]];
dashboard.getRange("A1").format = { fill: "#0A0A0A", font: { bold: true, color: "#C9A961", size: 18 } };
dashboard.getRange("A3:B10").values = [
  ["Workbook date", today],
  ["Total planned URLs", rows.length],
  ["ICP x CEP keyword ideas", matrixRows.length],
  ["Service pages", summaryCounts["Service Page"] || 0],
  ["Practice area pages", summaryCounts["Practice Area Page"] || 0],
  ["Blog posts", summaryCounts["Blog Post"] || 0],
  ["Location pages", summaryCounts["Location Page"] || 0],
  ["Data studies", summaryCounts["Data Study"] || 0],
];
dashboard.getRange("D3:E8").values = [
  ["Matrix Phase", "Count"],
  ["Phase 1", phaseCounts["Phase 1"] || 0],
  ["Phase 2", phaseCounts["Phase 2"] || 0],
  ["Phase 3", phaseCounts["Phase 3"] || 0],
  ["Backlog", phaseCounts.Backlog || 0],
  ["Total", matrixRows.length],
];
dashboard.getRange("G3:H6").values = [
  ["Status", "Rule"],
  ["New", "Write from scratch"],
  ["Refresh", "Improve existing page"],
  ["Research Needed", "Do not publish until data exists"],
];
dashboard.getRange("A3:H10").format = { wrapText: true };
dashboard.getRange("A3:A10").format = { fill: "#F3F4F6", font: { bold: true } };
dashboard.getRange("D3:E3").format = { fill: "#111827", font: { bold: true, color: "#FFFFFF" } };
dashboard.getRange("G3:H3").format = { fill: "#111827", font: { bold: true, color: "#FFFFFF" } };
dashboard.getRange("A12:B17").values = [
  ["Page Type", "Count"],
  ["Service Page", summaryCounts["Service Page"] || 0],
  ["Practice Area Page", summaryCounts["Practice Area Page"] || 0],
  ["Blog Post", summaryCounts["Blog Post"] || 0],
  ["Location Page", summaryCounts["Location Page"] || 0],
  ["Data Study", summaryCounts["Data Study"] || 0],
];
dashboard.getRange("A12:B12").format = { fill: "#111827", font: { bold: true, color: "#FFFFFF" } };
try {
  const chart = dashboard.charts.add("bar", dashboard.getRange("A12:B17"));
  chart.title = "Planned URLs by Page Type";
  chart.hasLegend = false;
  chart.setPosition("D10", "H25");
} catch {}
dashboard.getRange("A20:H28").merge();
dashboard.getRange("A20").values = [[
  "Operating rule: this workbook is the content source of truth. If a URL is not listed here, do not write or publish it. Do not invent case studies, client results, rankings, or legal claims. All publish dates are capped at 2026-04-30 for the backdated content plan."
]];
dashboard.getRange("A20").format = { fill: "#FEF3C7", font: { bold: true, color: "#92400E" }, wrapText: true };
dashboard.getRange("A20:H28").format.rowHeightPx = 34;
dashboard.getRange("A:Z").format.columnWidthPx = 120;
dashboard.getRange("A1").format.columnWidthPx = 180;

// Keyword Framework
framework.getRange("A1:F1").values = [["Component", "Examples", "Use In URL?", "Use In H1?", "Notes", "Priority"]];
framework.getRange("A2:F14").values = [
  ["Practice Area", "corporate lawyer; conveyancing lawyer; civil litigation lawyer; employment lawyer; IP lawyer", "Yes", "Yes", "Core category entry point", "P0"],
  ["Channel", "website; SEO; Google Ads; Meta ads; LinkedIn; Google Business Profile; AI search; CRM", "Yes", "Yes", "Maps intent to service", "P0"],
  ["Commercial Modifier", "agency; service; checklist; cost; package; guide; examples; consultant", "Sometimes", "Sometimes", "Separates TOFU/MOFU/BOFU", "P0"],
  ["Malaysia Modifier", "Malaysia; Kuala Lumpur; Selangor; Petaling Jaya; Penang; Johor Bahru", "Sometimes", "Yes", "Only use city pages where truthful", "P1"],
  ["Compliance Modifier", "Bar Council; Publicity Rules; allowed; compliant; ethical; can lawyers advertise", "Sometimes", "Yes", "High trust, high caution", "P0"],
  ["Question Format", "can lawyers advertise in Malaysia; how much does law firm website cost", "No", "Yes", "Good for blog posts", "P0"],
  ["Comparison", "SEO vs Google Ads; AIO vs SEO; Google Sheet vs Twenty CRM", "Yes", "Yes", "Good MOFU topics", "P1"],
  ["Tool / Process", "CRM; intake; WhatsApp follow-up; sitemap; schema; PageSpeed", "Yes", "Yes", "Operational differentiation", "P1"],
  ["Buyer Stage", "new firm; boutique firm; corporate practice; solo lawyer", "No", "Sometimes", "Useful for intros and CTAs", "P1"],
  ["Risk Filter", "no guarantee; no fake case study; no 'best lawyer' claims", "No", "No", "Must pass validation", "P0"],
  ["CTA Trigger", "apply for review; request audit; website offer; compliance review", "No", "No", "Driven by CTA Map sheet", "P0"],
  ["Internal Link Target", "/services/law-firm-seo; /services/website-design-for-lawyers; /contact", "No", "No", "Every content page needs 2-4 internal links", "P0"],
  ["Data Confidence", "Directional; validate later with GSC, Ahrefs, Semrush, Search Console", "No", "No", "Do not pretend volume numbers are exact", "P0"],
];
framework.tables.add("A1:F14", true, "KeywordFramework");
framework.getRange("A1:F1").format = { fill: "#111827", font: { bold: true, color: "#FFFFFF" }, wrapText: true };
framework.getRange("A:F").format.wrapText = true;
framework.getRange("A:F").format.columnWidthPx = 180;
framework.getRange("B:B").format.columnWidthPx = 430;
framework.getRange("E:E").format.columnWidthPx = 320;

// CTA Map
cta.getRange("A1:H1").values = [["CTA Variant", "Use On", "Eyebrow", "Headline", "Button", "Destination", "Follow-Up Message", "Change Notes"]];
cta.getRange("A2:H8").values = [
  ["websiteOffer", "Website pages, website blogs", "2026 Founding Portfolio", "Apply for a compliance-conscious law firm website review.", "Apply for Website Review", "/contact", "We will review your details and text your WhatsApp after checking fit.", "Switch headline when 5 free websites become 80% off / 50% off."],
  ["auditOffer", "SEO, AI, content, location pages", "Complimentary Review", "Request a compliance-conscious digital visibility audit.", "Request Audit", "/contact", "We will review your firm website/search presence and text your WhatsApp.", "Use after free website promotion ends."],
  ["adsOffer", "Google Ads, Meta, paid media", "Paid Media Suitability", "Review whether paid media is suitable for your law firm.", "Request Ads Review", "/contact", "We will check suitability and compliance considerations before recommending ads.", "Never imply ads are automatically allowed or approved."],
  ["practiceAreaOffer", "Practice-area pages", "Practice Visibility Review", "Review whether your practice area is ready for compliant digital visibility.", "Review My Practice Area", "/contact", "We will review your practice area, location, and current visibility first.", "Avoid 'dominate territory' language if concerned."],
  ["complianceOffer", "Rules/compliance articles", "Compliance-Conscious Review", "Ask us to review your website or ad copy before you publish.", "Request Copy Review", "/contact", "We will text you after reviewing the issue and your current assets.", "Do not position as legal advice."],
  ["crmOffer", "CRM, WhatsApp, automation posts", "Inquiry Follow-Up System", "Build a simple follow-up workflow so fewer inquiries go cold.", "Review Follow-Up Flow", "/contact", "We will review your current lead capture and WhatsApp follow-up flow.", "Do not imply automated legal advice."],
  ["global", "Navigation/footer/global CTA", "LawyerMarketing.my", "Build a safer, clearer digital presence for your law firm.", "Get Started", "/contact", "We will contact you on WhatsApp after review.", "Fallback CTA."],
];
cta.tables.add("A1:H8", true, "CTAMap");
cta.getRange("A1:H1").format = { fill: "#111827", font: { bold: true, color: "#FFFFFF" }, wrapText: true };
cta.getRange("A:H").format.wrapText = true;
cta.getRange("A:H").format.columnWidthPx = 180;
cta.getRange("D:D").format.columnWidthPx = 320;
cta.getRange("G:H").format.columnWidthPx = 360;

// Compliance Guardrails
guardrailSheet.getRange("A1:E1").values = [["Rule", "Why It Matters", "Allowed Language", "Avoid Language", "Check Before Publish"]];
guardrailSheet.getRange("A2:E10").values = [
  ["No fake proof", "We do not have case studies yet", "sample workflow; example structure; demo page", "case study; client results; grew traffic by X", "Search draft for client/result claims"],
  ["No guarantees", "Legal marketing outcomes are uncertain", "designed to support visibility", "guaranteed leads; rank #1; dominate Google", "Search draft for guarantee language"],
  ["Compliance caution", "Bar publicity rules are sensitive", "compliance-conscious; review suitability", "Bar approved; fully compliant guaranteed", "Add disclaimer where relevant"],
  ["No legal advice", "We are a marketing site, not legal counsel", "general marketing information", "legal advice; definitive legal interpretation", "Add not-legal-advice note"],
  ["No expertise claims for clients", "Expert/specialist claims can be sensitive", "practice-focused; experienced where substantiated", "expert lawyer; best lawyer; top lawyer", "Remove unsupported descriptors"],
  ["Date discipline", "User requested content dates no later than Apr 30", "Publish date Jan-Apr 2026", "Future dates after 2026-04-30", "Validate publish date column"],
  ["Malaysia localization", "Avoid US legal-market assumptions", "Malaysia, Bar Council, local search, Klang Valley", "DUI, personal injury mass-tort framing", "Check page context"],
  ["CTA consistency", "Offers will change over time", "CTA variant from CTA Map", "Hard-coded 5 free websites everywhere", "Use central CTA config"],
  ["Internal links", "Avoid orphan pages", "2-4 relevant internal links", "No links to services/contact", "Validate links before publishing"],
];
guardrailSheet.tables.add("A1:E10", true, "ComplianceRules");
guardrailSheet.getRange("A1:E1").format = { fill: "#111827", font: { bold: true, color: "#FFFFFF" }, wrapText: true };
guardrailSheet.getRange("A:E").format.wrapText = true;
guardrailSheet.getRange("A:E").format.columnWidthPx = 230;
guardrailSheet.getRange("B:E").format.columnWidthPx = 310;

// Competitor Reference
competitor.getRange("A1:D1").values = [["Source", "Observed Pattern", "What To Copy", "What To Avoid"]];
competitor.getRange("A2:D9").values = [
  ["Rankings.io sitemap", "Large blog library plus service pages", "Architecture and topic clustering", "US personal-injury bias"],
  ["Rankings.io service pages", "Practice-specific SEO/marketing pages", "Service + practice combinations", "Copying claims or US legal terms"],
  ["Rankings.io blogs", "Tools, SEO guides, ads, intake, AI, operations", "Long-tail category entry points", "Non-Malaysia examples without adaptation"],
  ["Rankings.io data studies", "Original research pages", "Create Malaysian law firm visibility studies later", "Publishing without real data"],
  ["Rankings.io case studies", "Proof pages and portfolio", "Create process/demo pages first", "Fake case studies"],
  ["Malaysian Bar publicity context", "New rules create uncertainty", "Compliance-conscious explainers", "Legal advice or approval claims"],
  ["Local business reality", "Corporate/conveyancing stronger than PI", "Prioritize corporate/property/employment/litigation", "US-style accident-law funnel"],
  ["Current LawyerMarketing.my", "Services, practice pages, posts already exist", "Refresh and centralize CTA", "Duplicated hard-coded offers"],
];
competitor.tables.add("A1:D9", true, "CompetitorReference");
competitor.getRange("A1:D1").format = { fill: "#111827", font: { bold: true, color: "#FFFFFF" }, wrapText: true };
competitor.getRange("A:D").format.wrapText = true;
competitor.getRange("A:D").format.columnWidthPx = 280;

// Validation Checklist
validation.getRange("A1:E1").values = [["Check ID", "Validation Check", "Applies To", "Pass Rule", "Owner"]];
validation.getRange("A2:E13").values = [
  ["VAL-001", "Every planned URL exists in Content Inventory", "All pages", "No page gets written unless it is in this workbook", "Content Manager"],
  ["VAL-002", "No publish date after 2026-04-30", "All pages", "Publish Date <= 2026-04-30", "Editor"],
  ["VAL-003", "No fake case studies or client results", "All pages", "No invented client names, numbers, rankings, revenue, cases", "Editor"],
  ["VAL-004", "No guarantee claims", "All pages", "No 'guarantee', 'rank #1', 'get clients', 'case volume' promises", "Compliance Review"],
  ["VAL-005", "CTA variant is valid", "All pages", "CTA Variant must match CTA Map", "Developer"],
  ["VAL-006", "Meta title and description drafted", "All pages", "Each page has SEO title and meta description before build", "SEO"],
  ["VAL-007", "Internal links added", "All pages", "At least 2 relevant internal links", "SEO"],
  ["VAL-008", "Sitemap updated", "Published pages", "URL appears in generated sitemap", "Developer"],
  ["VAL-009", "Build passes", "Published pages", "npm run build passes", "Developer"],
  ["VAL-010", "Data studies have real data", "Data Study", "Do not publish until real dataset exists", "Research"],
  ["VAL-011", "Malaysia localization", "All pages", "Avoid US-only assumptions; use Malaysia legal-market context", "Editor"],
  ["VAL-012", "Manual review complete", "All pages", "Human approves before deploy", "Owner"],
];
validation.tables.add("A1:E13", true, "ValidationChecklist");
validation.getRange("A1:E1").format = { fill: "#111827", font: { bold: true, color: "#FFFFFF" }, wrapText: true };
validation.getRange("A:E").format.wrapText = true;
validation.getRange("A:E").format.columnWidthPx = 220;
validation.getRange("B:D").format.columnWidthPx = 360;

// Light formatting for dashboard widths.
for (let i = 0; i < 8; i++) {
  dashboard.getRangeByIndexes(0, i, 30, 1).format.columnWidthPx = i % 2 === 0 ? 160 : 145;
}

// Render visual previews for key sheets.
await fs.mkdir(outputDir, { recursive: true });
for (const sheetName of ["Dashboard", "Content Inventory", "CEP Archetypes", "CTA Map", "Compliance Guardrails"]) {
  const preview = await workbook.render({ sheetName, autoCrop: "all", scale: 1, format: "png" });
  await fs.writeFile(path.join(outputDir, `${sheetName.replaceAll(" ", "_").toLowerCase()}.png`), new Uint8Array(await preview.arrayBuffer()));
}
const matrixPreview = await workbook.render({ sheetName: "ICP CEP Matrix", range: "A1:L35", scale: 1, format: "png" });
await fs.writeFile(path.join(outputDir, "icp_cep_matrix_top_rows.png"), new Uint8Array(await matrixPreview.arrayBuffer()));

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 300 },
  summary: "final formula error scan",
});
console.log(errors.ndjson);

const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(outputPath);
console.log(outputPath);
