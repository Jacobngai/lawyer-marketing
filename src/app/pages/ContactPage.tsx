import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronRight,
  Globe,
  Mail,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import { SEO } from "../components/SEO";

const CONTACT_API_URL = import.meta.env.VITE_CONTACT_API_URL || "/api/contact/submit";

// Google Ads Conversion tracking constants
const GOOGLE_ADS_ID = "AW-417408785";
const CONVERSION_LABELS = {
  "landing-page": "Mn09CNaN8KIcEJHOhMcB",
  "audit": "gafgCNmN8KIcEJHOhMcB"
};

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

type Goal = "landing-page" | "audit";

type SubmissionState = {
  followUpQueued: boolean;
  message: string;
};

const defaultSubmissionState: SubmissionState = {
  followUpQueued: false,
  message: "Application received. We will text the WhatsApp number you shared after reviewing your submission.",
};

const normalizeWhatsAppPhone = (value: string) => {
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
};

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    firmName: "",
    website: "",
    message: "",
    caseVolume: "1",
    goal: "landing-page" as Goal,
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submissionState, setSubmissionState] = useState<SubmissionState>(defaultSubmissionState);
  const normalizedPhone = normalizeWhatsAppPhone(formData.phone);
  const showPhonePreview = normalizedPhone.length >= 10 && normalizedPhone !== formData.phone.replace(/\D/g, "");

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      firmName: "",
      website: "",
      message: "",
      caseVolume: "1",
      goal: "landing-page",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      if (normalizedPhone.length < 10 || normalizedPhone.length > 15) {
        throw new Error("Please enter a valid WhatsApp number.");
      }

      const response = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          phone: normalizedPhone,
          rawPhone: formData.phone,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.ok) {
        throw new Error(result?.message || "We could not process your request right now. Please try again shortly.");
      }

      setSubmissionState({
        followUpQueued: Boolean(result.followUpQueued),
        message: result.message || defaultSubmissionState.message,
      });

      setStatus("success");
      
      // Fire Google Ads Conversion Event
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "conversion", {
          send_to: `${GOOGLE_ADS_ID}/${CONVERSION_LABELS[formData.goal]}`,
          value: 1.0,
          currency: "MYR",
        });
      }

      resetForm();
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We could not process your request right now. Please try again shortly.",
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const setGoal = (goal: Goal) => {
    setFormData((prev) => ({
      ...prev,
      goal,
      website: goal === "audit" ? prev.website : "",
    }));
  };

  return (
    <main className="pt-24 min-h-screen bg-background relative overflow-hidden">
      <SEO
        title="Apply for Founding Partner Program | Legal Marketing Consultation"
        description="Connect with Malaysia's leading law firm marketing experts. Apply for our exclusive Founding Partner program and claim your RM 3,500 strategic growth audit."
      />

      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 py-12 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-8">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span className="text-xs font-medium uppercase tracking-widest text-accent">Complies with Bar Council Rules</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-extralight leading-tight mb-8">
              Apply for Your <span className="text-accent italic">Founding Partner</span> <br /> Landing Page
            </h1>

            <p className="text-xl text-foreground/60 leading-relaxed mb-12 max-w-xl">
              We are waiving the <span className="text-foreground">RM 3,500 build fee</span> for Malaysia's next 5 high-authority firms. You receive a custom, engineered landing page at <span className="text-foreground">ZERO BUILD COST</span>. You just pay for the hosting.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
                  <BarChart3 className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Technical Gap Analysis</h3>
                  <p className="text-sm text-foreground/50 leading-relaxed">We identify where your firm is losing high-intent search traffic. You receive the specific data needed to capture it.</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
                  <Globe className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">2026 Regulatory Audit</h3>
                  <p className="text-sm text-foreground/50 leading-relaxed">Ensure your digital assets are fully compliant with the latest Bar Council publicity standards.</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">WhatsApp Follow-Up Queue</h3>
                  <p className="text-sm text-foreground/50 leading-relaxed">Once approved, your application enters a backend follow-up flow so your team can text the lead instead of asking them to message you first.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card/50 backdrop-blur-xl border border-border p-8 lg:p-12 relative"
          >
            <div className="mb-10">
              <h2 className="text-3xl font-light flex items-center gap-4 mb-4">
                <MessageSquare className="w-8 h-8 text-accent" />
                Application for Founding Partner Beta (Strictly for Lawyers Only)
              </h2>
              <div className="ml-12 border-l-2 border-accent/30 pl-6">
                <div className="inline-block bg-accent text-accent-foreground px-4 py-1.5 font-black tracking-[0.2em] text-sm uppercase rounded-sm shadow-xl">
                  Build Fee Waived: RM 3,500
                </div>
                <p className="text-xs text-foreground/40 mt-3 uppercase tracking-widest font-bold">
                  Share your WhatsApp number. We will text you after review.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  onClick={() => setGoal("landing-page")}
                  className={`p-4 border transition-all flex flex-col items-center text-center gap-2 ${formData.goal === "landing-page" ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"}`}
                >
                  <Sparkles className={`w-6 h-6 ${formData.goal === "landing-page" ? "text-accent" : "text-foreground/40"}`} />
                  <span className="text-[9px] uppercase font-bold tracking-widest leading-tight">Free Landing Page<br />(I do not have a website)</span>
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  onClick={() => setGoal("audit")}
                  className={`p-4 border transition-all flex flex-col items-center text-center gap-2 ${formData.goal === "audit" ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"}`}
                >
                  <BarChart3 className={`w-6 h-6 ${formData.goal === "audit" ? "text-accent" : "text-foreground/40"}`} />
                  <span className="text-[9px] uppercase font-bold tracking-widest leading-tight">Request Growth Audit<br />(I already have a website)</span>
                </motion.button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-foreground/40 flex items-center gap-2">
                    <User className="w-3 h-3" /> Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jacob Ng"
                    className="w-full bg-background border border-border px-4 py-4 rounded-none focus:border-accent outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-foreground/40 flex items-center gap-2">
                    <Mail className="w-3 h-3" /> Work Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={formData.goal === "landing-page" ? "legal.expert@gmail.com" : "partner@firm.my"}
                    className="w-full bg-background border border-border px-4 py-4 rounded-none focus:border-accent outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-foreground/40 flex items-center gap-2">
                    <Phone className="w-3 h-3" /> Best WhatsApp Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="WhatsApp Number"
                    className="w-full bg-background border border-border px-4 py-4 rounded-none focus:border-accent outline-none transition-colors"
                  />
                  <p className="text-[11px] text-foreground/40 leading-relaxed">
                    We'll handle the formatting. {showPhonePreview && `Entering as ${normalizedPhone}.`}
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="firmName" className="text-xs font-bold uppercase tracking-widest text-foreground/40 flex items-center gap-2">
                    <Building2 className="w-3 h-3" /> Law Firm Name
                  </label>
                  <input
                    id="firmName"
                    type="text"
                    required
                    value={formData.firmName}
                    onChange={handleChange}
                    placeholder="Advocates & Solicitors"
                    className="w-full bg-background border border-border px-4 py-4 rounded-none focus:border-accent outline-none transition-colors"
                  />
                </div>
              </div>

              <div className={`grid ${formData.goal === "audit" ? "md:grid-cols-2" : "grid-cols-1"} gap-6`}>
                {formData.goal === "audit" ? (
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="website" className="text-xs font-bold uppercase tracking-widest text-foreground/40 flex items-center gap-2">
                      <Globe className="w-3 h-3" /> Website URL
                    </label>
                    <input
                      id="website"
                      type="text"
                      required
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://firm.my"
                      className="w-full bg-background border border-border px-4 py-4 rounded-none focus:border-accent outline-none transition-colors"
                    />
                  </div>
                ) : null}
              </div>

              <div className="space-y-2">
                <label htmlFor="caseVolume" className="text-xs font-bold uppercase tracking-widest text-foreground/40 flex items-center gap-2">
                  Total Firm Headcount
                </label>
                <select
                  id="caseVolume"
                  value={formData.caseVolume}
                  onChange={handleChange}
                  className="w-full bg-background border border-border px-4 py-4 rounded-none focus:border-accent outline-none transition-colors appearance-none text-sm"
                >
                  <option value="1">Solo (1 Employee)</option>
                  <option value="2-5">Small (2-5 Employees)</option>
                  <option value="6-20">Mid-Size (6-20 Employees)</option>
                  <option value="20+">Large (20+ Employees)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-foreground/40 flex items-center gap-2">
                  <Send className="w-3 h-3" /> Notes for Our Team (Optional)
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Practice area, preferred follow-up timing, or anything we should know before we text you."
                  rows={4}
                  className="w-full bg-background border border-border px-4 py-4 rounded-none focus:border-accent outline-none transition-colors resize-y"
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === "loading"}
                animate={{
                  scale: [1, 1.02, 1],
                  boxShadow: [
                    "0 0 0 0px rgba(201, 169, 97, 0)",
                    "0 0 20px 2px rgba(201, 169, 97, 0.3)",
                    "0 0 0 0px rgba(201, 169, 97, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-full py-5 font-bold uppercase tracking-[0.2em] transition-all disabled:opacity-50 group flex items-center justify-center gap-3 overflow-hidden relative bg-accent text-accent-foreground shadow-2xl shadow-accent/20"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {status === "loading" ? "Submitting To Our Follow-Up Queue..." : formData.goal === "landing-page" ? "Claim Free Landing Page" : "Request Growth Audit"}
                  {status !== "loading" ? <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> : null}
                </span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.4 }}
                />
              </motion.button>

              <p className="text-[10px] text-foreground/30 text-center uppercase tracking-widest leading-relaxed">
                Confidentiality guaranteed. Data managed in compliance with Legal Profession Publicity Rules.
              </p>
            </form>

            <AnimatePresence>
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center p-12 text-center"
                >
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-3xl font-light mb-4">
                    {submissionState.followUpQueued ? "Request Queued For WhatsApp Follow-Up" : "Request Logged"}
                  </h3>
                  <p className="text-foreground/60 mb-8 max-w-sm">
                    {submissionState.message}
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-8 py-3 border border-border hover:border-accent transition-colors uppercase tracking-widest text-xs"
                  >
                    Close
                  </button>
                </motion.div>
              ) : null}

              {status === "error" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center p-12 text-center"
                >
                  <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                    <AlertCircle className="w-10 h-10 text-red-500" />
                  </div>
                  <h3 className="text-3xl font-light mb-4">Submission Paused</h3>
                  <p className="text-foreground/60 mb-8 max-w-sm">{errorMessage}</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-8 py-3 border border-border hover:border-accent transition-colors uppercase tracking-widest text-xs"
                  >
                    Try Again
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </main>
  );
};
