import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Building2, 
  Globe, 
  Mail, 
  User, 
  BarChart3,
  MessageSquare,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbygNzxMYfx9eVbalSW69GxLZMPZ-Xbd3FtBDaqC9wW15V6sYtCA9TFHa5VJ_hm6Y8eU/exec";

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    firmName: "",
    website: "",
    message: "",
    caseVolume: "1-10",
    contactMethod: "meeting" as "meeting" | "whatsapp"
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // 1. Sync to Google Sheets CRM (Simulated/POST)
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // 2. Conditional Redirect
      if (formData.contactMethod === "meeting") {
        window.open("https://cal.com/zen-pdcnlc/lawyer-marketing", "_blank");
      } else {
        const waText = encodeURIComponent(
          `Hi LawyerMarketing.my, I'm ${formData.name} from ${formData.firmName}. I'm interested in the 2026 Founder's Beta Program. My website is ${formData.website}.`
        );
        window.open(`https://wa.me/60175032281?text=${waText}`, "_blank");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        firmName: "",
        website: "",
        message: "",
        caseVolume: "1-10",
        contactMethod: "meeting"
      });
    } catch (error) {
      console.error("Submission error:", error);
      if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === "YOUR_GOOGLE_SCRIPT_URL_HERE") {
        // Fallback for demo
        if (formData.contactMethod === "meeting") {
          window.open("https://cal.com/zen-pdcnlc/lawyer-marketing", "_blank");
        } else {
          const waText = encodeURIComponent(`Hi, I'm ${formData.name} from ${formData.firmName}. I'd like to discuss the Founder's Beta Program.`);
          window.open(`https://wa.me/60175032281?text=${waText}`, "_blank");
        }
        setTimeout(() => setStatus("success"), 1000);
      } else {
        setStatus("error");
        setErrorMessage("Connection failed. Please try again or WhatsApp us directly.");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const setMethod = (method: "meeting" | "whatsapp") => {
    setFormData(prev => ({ ...prev, contactMethod: method }));
  };

  return (
    <main className="pt-24 min-h-screen bg-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 py-12 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Value Prop & Trust */}
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
              Secure Your <span className="text-accent italic">2026</span> <br /> Competitive Advantage
            </h1>
            
            <p className="text-xl text-foreground/60 leading-relaxed mb-12 max-w-xl">
              We are selecting 5 expansion-focused law firms in Malaysia to join our <span className="text-foreground">Exclusive Founder's Beta Program</span>. Get a complete technical audit and conversion-focused digital architecture.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
                  <BarChart3 className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Technical Gap Analysis</h3>
                  <p className="text-sm text-foreground/50 leading-relaxed">Discover where your firm is losing high-intent search traffic to competitors. (Valued at $3,500)</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
                  <Globe className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">2026 Regulatory Audit</h3>
                  <p className="text-sm text-foreground/50 leading-relaxed">Ensure your digital assets are fully compliant with the latest Bar Council publicity standards.</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Conversion Blueprints</h3>
                  <p className="text-sm text-foreground/50 leading-relaxed">Receive a custom architectural plan to transform your website into a high-performance intake engine.</p>
                </div>
              </div>
            </div>

            {/* Social Proof Badges */}
            <div className="mt-16 pt-16 border-t border-border flex flex-wrap gap-8 opacity-40">
              <div className="grayscale contrast-125">
                <img src="https://ranking.io/wp-content/themes/rankings/assets/img/inc-5000.svg" alt="Inc 5000" className="h-8" />
              </div>
              <div className="grayscale contrast-125">
                <img src="https://ranking.io/wp-content/themes/rankings/assets/img/google-partner.svg" alt="Google Partner" className="h-8" />
              </div>
              <div className="text-xs font-bold uppercase tracking-widest self-center">Rated 4.9 across 200+ Reviews</div>
            </div>
          </motion.div>

          {/* Right Column: High-End Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card/50 backdrop-blur-xl border border-border p-8 lg:p-12 relative"
          >
            <h2 className="text-2xl font-light mb-8 flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-accent" />
              Request Strategic Audit
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Method Selection */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => setMethod("meeting")}
                  className={`p-4 border transition-all flex flex-col items-center gap-2 ${formData.contactMethod === "meeting" ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"}`}
                >
                  <BarChart3 className={`w-6 h-6 ${formData.contactMethod === "meeting" ? "text-accent" : "text-foreground/40"}`} />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Book Digital Audit</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMethod("whatsapp")}
                  className={`p-4 border transition-all flex flex-col items-center gap-2 ${formData.contactMethod === "whatsapp" ? "border-green-500 bg-green-500/5" : "border-border hover:border-green-500/50"}`}
                >
                  <MessageSquare className={`w-6 h-6 ${formData.contactMethod === "whatsapp" ? "text-green-500" : "text-foreground/40"}`} />
                  <span className="text-[10px] uppercase font-bold tracking-widest">WhatsApp Strategy</span>
                </button>
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
                    placeholder="jacob@firm.my"
                    className="w-full bg-background border border-border px-4 py-4 rounded-none focus:border-accent outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
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
                <div className="space-y-2">
                  <label htmlFor="website" className="text-xs font-bold uppercase tracking-widest text-foreground/40 flex items-center gap-2">
                    <Globe className="w-3 h-3" /> Website URL
                  </label>
                  <input
                    id="website"
                    type="url"
                    required
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://firm.my"
                    className="w-full bg-background border border-border px-4 py-4 rounded-none focus:border-accent outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="caseVolume" className="text-xs font-bold uppercase tracking-widest text-foreground/40 flex items-center gap-2">
                   Monthly Case Volume
                </label>
                <select
                  id="caseVolume"
                  value={formData.caseVolume}
                  onChange={handleChange}
                  className="w-full bg-background border border-border px-4 py-4 rounded-none focus:border-accent outline-none transition-colors appearance-none"
                >
                  <option value="1-10">1-10 New Cases/Month</option>
                  <option value="11-50">11-50 New Cases/Month</option>
                  <option value="51-100">51-100 New Cases/Month</option>
                  <option value="100+">100+ New Cases/Month</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className={`w-full py-5 font-bold uppercase tracking-[0.2em] transition-all disabled:opacity-50 group flex items-center justify-center gap-3 overflow-hidden relative ${formData.contactMethod === "meeting" ? "bg-accent text-accent-foreground" : "bg-green-600 text-white"}`}
              >
                <span className="relative z-10 flex items-center gap-3">
                  {status === "loading" ? "Processing..." : (formData.contactMethod === "meeting" ? "Initiate Audit" : "WhatsApp Strategist")}
                  {status !== "loading" && <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                </span>
                <motion.div 
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.4 }}
                />
              </button>

              <p className="text-[10px] text-foreground/30 text-center uppercase tracking-widest">
                Confidentiality Guaranteed. Data managed in compliance with Legal Profession Publicity Rules.
              </p>
            </form>

            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center p-12 text-center"
                >
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-3xl font-light mb-4">Strategic Request Logged</h3>
                  <p className="text-foreground/60 mb-8 max-w-sm">
                    Your firm's data has been added to our 2026 audit queue. A senior strategist will review your profile and reach out within 12 business hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-8 py-3 border border-border hover:border-accent transition-colors uppercase tracking-widest text-xs"
                  >
                    Close
                  </button>
                </motion.div>
              )}

              {status === "error" && (
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
                  <p className="text-foreground/60 mb-8 max-w-sm">
                    {errorMessage}
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setStatus("idle")}
                      className="px-8 py-3 border border-border hover:border-accent transition-colors uppercase tracking-widest text-xs"
                    >
                      Try Again
                    </button>
                    <a 
                      href="https://wa.me/60175032281" 
                      className="px-8 py-3 bg-green-500 text-white uppercase tracking-widest text-xs flex items-center gap-2"
                    >
                      WhatsApp Us
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </main>
  );
};
