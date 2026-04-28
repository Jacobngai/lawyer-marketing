import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Trophy, ArrowRight, ShieldCheck, Timer } from "lucide-react";
import { Link } from "react-router-dom";

export const GiveawayPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Show popup after 3 seconds, but only once per session
    const shown = sessionStorage.getItem("giveaway_popup_shown");
    if (!shown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem("giveaway_popup_shown", "true");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-6 pointer-events-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            className="relative w-full max-w-xl bg-black border border-accent/30 shadow-2xl shadow-accent/20 pointer-events-auto overflow-hidden rounded-none flex flex-col md:flex-row"
          >
            {/* Scarcity Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "80%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="h-full bg-accent"
              />
            </div>

            {/* Content Area */}
            <div className="p-8 md:p-10 flex-grow relative">
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-white/30 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-[9px] font-black uppercase tracking-[0.3em]">
                  <Trophy className="w-3 h-3" />
                  2026 Case Study Portfolio
                </div>

                <h2 className="text-3xl md:text-5xl font-light italic leading-tight text-white">
                  I Need a Favor from the Next <span className="text-accent underline underline-offset-8">5 Lawyers</span>
                </h2>

                <div className="space-y-4 text-foreground/70 text-base md:text-lg leading-relaxed font-light">
                  <p>
                    Most law firm websites are just expensive digital brochures. They don't rank. They don't convert. They don't sell.
                  </p>
                  <p>
                    I’m going to build <span className="text-white font-bold">5 firms</span> a custom, high-authority website for <span className="text-white font-bold underline">FREE</span>. 
                  </p>
                  <p>
                    Why? I need 5 massive success stories to launch my 2026 case-study portfolio in Malaysia.
                  </p>
                </div>

                {/* Value Stack */}
                <div className="grid grid-cols-2 gap-4 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-foreground/40">
                    <ShieldCheck className="w-3 h-3 text-accent" />
                    RM 3,500 Build Waived
                  </div>
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-foreground/40">
                    <Sparkles className="w-3 h-3 text-accent" />
                    High-Authority Copy
                  </div>
                </div>

                <div className="flex flex-col gap-4 pt-2">
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-5 bg-accent text-accent-foreground font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 shadow-xl"
                    >
                      Check If You Qualify
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                  <div className="flex items-center justify-center gap-2 text-[9px] text-accent font-black uppercase tracking-widest">
                    <Timer className="w-3 h-3 animate-pulse" />
                    4 of 5 Spots Remaining
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
