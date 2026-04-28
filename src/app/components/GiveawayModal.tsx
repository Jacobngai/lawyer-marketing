import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Building2, Phone, Fingerprint, Globe, ArrowRight, ShieldCheck, CheckCircle2, Trophy, Timer } from "lucide-react";

interface GiveawayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRACTICE_AREAS = [
  "Corporate & Commercial Law",
  "Banking & Finance",
  "Civil Litigation",
  "Criminal Law",
  "Family & Matrimonial",
  "Property & Conveyancing",
  "Immigration Law",
  "Intellectual Property",
  "Employment & Industrial Relations",
  "Islamic Law (Syariah)",
  "Tax & Revenue",
  "Dispute Resolution & Arbitration",
  "Mergers & Acquisitions",
  "Construction Law",
  "Insolvency & Bankruptcy",
];

export const GiveawayModal: React.FC<GiveawayModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    firmName: "",
    phone: "",
    areaOfPractice: "",
    caseVolume: "",
    domainStatus: "" as "have-domain" | "no-domain" | "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.domainStatus) return;
    
    setStatus("loading");
    
    try {
      const response = await fetch("/api/contact/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          goal: "giveaway-website",
          message: `Giveaway Application - Domain Status: ${formData.domainStatus}`,
        }),
      });

      if (!response.ok) throw new Error("Submission failed");
      
      setStatus("success");
      setTimeout(() => {
        onClose();
        setStatus("idle");
        setFormData({ name: "", email: "", firmName: "", phone: "", areaOfPractice: "", caseVolume: "", domainStatus: "" });
      }, 3000);
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[130] flex items-start md:items-center justify-center px-4 py-8 md:py-12 pointer-events-none overflow-y-auto custom-scrollbar">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md pointer-events-auto"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-5xl bg-[#0a0a0a] border border-accent/20 rounded-none shadow-2xl shadow-accent/20 pointer-events-auto flex flex-col md:flex-row overflow-hidden"
          >
            {/* Left Panel: The Offer */}
            <div className="w-full md:w-[40%] p-8 md:p-12 bg-gradient-to-br from-accent/10 via-black to-black border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-[9px] font-black uppercase tracking-[0.3em]">
                    <Trophy className="w-3 h-3" />
                    2026 Portfolio Opportunity
                  </div>
                  <h2 className="text-4xl md:text-5xl font-light italic leading-tight text-white">
                    I Need a <span className="text-accent underline underline-offset-8 italic">Favor</span>
                  </h2>
                  <p className="text-base text-foreground/60 leading-relaxed font-light italic">
                    Most lawyer websites are expensive digital brochures that don't rank or convert. I’m going to build 5 firms a custom, high-authority website for FREE to launch my 2026 case-study portfolio.
                  </p>
                </div>

                {/* Value Stack Breakdown */}
                <div className="space-y-4 pt-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">What You Get:</h4>
                  <div className="space-y-3">
                    {[
                      { label: "Google Business Opt.", value: "RM 500" },
                      { label: "Local Service Ads Setup", value: "RM 1,200" },
                      { label: "High-Authority Website", value: "RM 3,500" },
                      { label: "SEO Opt. (20 Pages)", value: "RM 1,500" },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-[10px] uppercase tracking-widest border-b border-white/5 pb-2">
                        <span className="text-white/40 font-bold">{item.label}</span>
                        <span className="text-white font-black">{item.value}</span>
                      </div>
                    ))}
                    <div className="pt-4 flex justify-between items-center text-xl font-black uppercase tracking-tighter">
                      <span className="text-white">Total Value:</span>
                      <span className="text-white/40 line-through">RM 6,700</span>
                    </div>
                    <div className="flex justify-between items-center text-2xl font-black uppercase tracking-widest">
                      <span className="text-accent">Price:</span>
                      <span className="text-accent underline underline-offset-4 decoration-2">FREE</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-3 pt-12 text-[10px] uppercase tracking-widest text-white/20 font-bold">
                 <ShieldCheck className="w-4 h-4 text-accent" />
                 Secure Eligibility Check
              </div>
            </div>

            {/* Right Panel: The Form */}
            <div className="w-full md:w-[60%] p-8 md:p-12 relative bg-black">
              <button 
                onClick={onClose} 
                className="absolute top-6 right-6 p-2 text-white/20 hover:text-white transition-colors z-20"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-6">
                 <div className="space-y-1">
                    <h3 className="text-xl font-light text-white uppercase tracking-tight">Claim Your Spot</h3>
                    <p className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold italic">Verification Required for Free Portfolio Slot</p>
                 </div>
                 <div className="flex flex-col items-end">
                    <span className="text-xs font-black text-accent tracking-[0.2em]">4 SPOTS LEFT</span>
                    <div className="w-24 h-1 bg-white/5 mt-1 rounded-full overflow-hidden">
                       <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: "80%" }}
                        className="h-full bg-accent" 
                       />
                    </div>
                 </div>
              </div>

              {status === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-20 text-center space-y-4"
                >
                  <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="text-3xl font-light text-white">Application Received</h3>
                  <p className="text-foreground/50 text-lg italic">Our growth strategist will review your details and text your WhatsApp shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black uppercase tracking-widest text-foreground/40 flex items-center gap-2">
                        <ArrowRight className="w-3 h-3 text-accent" /> Your Name
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 px-4 py-4 text-white outline-none focus:border-accent font-inter transition-all placeholder:text-white/10 text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black uppercase tracking-widest text-foreground/40 flex items-center gap-2">
                        <Globe className="w-3 h-3" /> Work Email
                      </label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@firm.com"
                        className="w-full bg-white/5 border border-white/10 px-4 py-4 text-white outline-none focus:border-accent font-inter transition-all placeholder:text-white/10 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black uppercase tracking-widest text-foreground/40 flex items-center gap-2">
                        <Building2 className="w-3 h-3" /> Law Firm Name
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.firmName}
                        onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
                        placeholder="Advocates & Solicitors"
                        className="w-full bg-white/5 border border-white/10 px-4 py-4 text-white outline-none focus:border-accent font-inter transition-all placeholder:text-white/10 text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black uppercase tracking-widest text-foreground/40 flex items-center gap-2">
                        <Phone className="w-3 h-3" /> WhatsApp Number
                      </label>
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="601..."
                        className="w-full bg-white/5 border border-white/10 px-4 py-4 text-white outline-none focus:border-accent font-inter transition-all placeholder:text-white/10 text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-foreground/40 flex items-center gap-2">
                      <Fingerprint className="w-3 h-3" /> Practice Focus
                    </label>
                    <select
                      required
                      value={formData.areaOfPractice}
                      onChange={(e) => setFormData({ ...formData, areaOfPractice: e.target.value })}
                      className="w-full bg-black border border-white/10 px-4 py-4 text-white outline-none focus:border-accent font-inter transition-all text-sm appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select Primary Practice Area</option>
                      {PRACTICE_AREAS.map((area) => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-widest text-foreground/40 block">
                        Firm Headcount
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {["1-5", "6-15", "16+"].map((v) => (
                          <button
                            key={v}
                            type="button"
                            onClick={() => setFormData({ ...formData, caseVolume: v })}
                            className={`py-3 px-1 border text-[9px] uppercase tracking-widest font-black transition-all ${
                              formData.caseVolume === v 
                              ? "border-accent bg-accent/20 text-accent shadow-[0_0_15px_rgba(201,169,97,0.2)]" 
                              : "border-white/10 text-foreground/40 hover:border-white/30"
                            }`}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-widest text-foreground/40 block">
                        Domain/Website
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, domainStatus: "have-domain" })}
                          className={`py-3 px-1 border text-[8px] uppercase tracking-widest font-black transition-all ${
                            formData.domainStatus === "have-domain" 
                            ? "border-accent bg-accent/20 text-accent shadow-[0_0_15px_rgba(201,169,97,0.2)]" 
                            : "border-white/10 text-foreground/40 hover:border-white/30"
                          }`}
                        >
                          Have One
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, domainStatus: "no-domain" })}
                          className={`py-3 px-1 border text-[8px] uppercase tracking-widest font-black transition-all ${
                            formData.domainStatus === "no-domain" 
                            ? "border-accent bg-accent/20 text-accent shadow-[0_0_15px_rgba(201,169,97,0.2)]" 
                            : "border-white/10 text-foreground/40 hover:border-white/30"
                          }`}
                        >
                          No Website
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      disabled={status === "loading" || !formData.domainStatus}
                      className="w-full py-6 bg-accent text-accent-foreground font-black uppercase tracking-[0.4em] text-xs flex items-center justify-center gap-4 hover:bg-white hover:text-black transition-all disabled:opacity-50 shadow-[0_0_50px_rgba(201,169,97,0.3)] relative overflow-hidden group"
                    >
                      <span className="relative z-10">{status === "loading" ? "Processing..." : "CHECK IF YOU ARE RIGHT FIT"}</span>
                      <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
                      <motion.div 
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </button>
                    <div className="flex items-center justify-center gap-2 mt-4 opacity-30">
                       <Timer className="w-3 h-3 text-accent animate-pulse" />
                       <span className="text-[8px] uppercase tracking-[0.3em] font-black">Offer expires once selection criteria met</span>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
