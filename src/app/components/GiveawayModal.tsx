import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Building2, Phone, Fingerprint, Globe, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

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
    firmName: "",
    phone: "",
    areaOfPractice: "",
    domainStatus: "" as "have-domain" | "no-domain" | "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.domainStatus) return;
    
    setStatus("loading");
    
    try {
      // Reusing the contact API logic
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
        setFormData({ firmName: "", phone: "", areaOfPractice: "", domainStatus: "" });
      }, 3000);
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4 pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md pointer-events-auto"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-accent/20 rounded-none shadow-2xl shadow-accent/10 pointer-events-auto overflow-hidden"
          >
            {/* Scarcity Header */}
            <div className="bg-accent px-6 py-2 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-foreground">
                Malaysia Portfolio Opportunity
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-foreground/60">
                4 SPOTS LEFT
              </span>
            </div>

            <div className="p-8 md:p-10">
              <button onClick={onClose} className="absolute top-4 right-4 text-white/20 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-light italic text-white mb-4">
                  The <span className="text-accent underline underline-offset-8 italic">Portfolio</span> Giveaway
                </h2>
                <p className="text-sm text-foreground/50 max-w-xs mx-auto leading-relaxed">
                  I'm building 5 massive success stories for 2026. If you're a high-growth firm, I’ll build your site for free.
                </p>
              </div>

              {status === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-light text-white">Application Received</h3>
                  <p className="text-foreground/50 text-sm italic">Reviewing your firm's eligibility. Expect a WhatsApp soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
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
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-accent transition-colors text-sm"
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
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-accent transition-colors text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-foreground/40 flex items-center gap-2">
                      < Fingerprint className="w-3 h-3" /> Area of Practice
                    </label>
                    <select
                      required
                      value={formData.areaOfPractice}
                      onChange={(e) => setFormData({ ...formData, areaOfPractice: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-white outline-none focus:border-accent transition-colors text-sm appearance-none"
                    >
                      <option value="" disabled>Select Practice Area</option>
                      {PRACTICE_AREAS.map((area) => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-foreground/40 mb-3 block">
                      Website/Domain Status
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, domainStatus: "have-domain" })}
                        className={`py-3 px-2 border text-[10px] uppercase tracking-widest font-black transition-all ${
                          formData.domainStatus === "have-domain" 
                          ? "border-accent bg-accent/10 text-accent" 
                          : "border-white/10 text-foreground/40 hover:border-white/30"
                        }`}
                      >
                        I Have a Domain
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, domainStatus: "no-domain" })}
                        className={`py-3 px-2 border text-[10px] uppercase tracking-widest font-black transition-all ${
                          formData.domainStatus === "no-domain" 
                          ? "border-accent bg-accent/10 text-accent" 
                          : "border-white/10 text-foreground/40 hover:border-white/30"
                        }`}
                      >
                        I Need a Domain
                      </button>
                    </div>
                  </div>

                  <button
                    disabled={status === "loading" || !formData.domainStatus}
                    className="w-full mt-4 py-4 bg-accent text-accent-foreground font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all disabled:opacity-50"
                  >
                    {status === "loading" ? "Processing..." : "Submit Portfolio Application"}
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-2 pt-2">
                    <ShieldCheck className="w-3 h-3 text-accent" />
                    <span className="text-[8px] uppercase tracking-widest text-foreground/30 font-bold">
                      RM 3,500 Build Fee Waived for Eligibile Firms
                    </span>
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
