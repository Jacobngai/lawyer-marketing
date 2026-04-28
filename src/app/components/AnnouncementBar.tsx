import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, X } from "lucide-react";

interface AnnouncementBarProps {
  onOpenOffer: () => void;
  onDismiss: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onOpenOffer, onDismiss }) => {
  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      exit={{ y: -100 }}
      className="fixed top-0 left-0 w-full z-[120] bg-accent text-accent-foreground px-4 py-2.5 shadow-2xl flex items-center"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 cursor-pointer group flex-grow" onClick={onOpenOffer}>
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-center pr-8 md:pr-0">
            2026 Portfolio Opportunity: I'm Building Free Websites for 5 Malaysian Lawyers
          </span>
        </div>
        <div className="flex items-center gap-2 border-l border-accent-foreground/20 pl-0 md:pl-8">
          <span className="text-[9px] font-black uppercase tracking-widest underline underline-offset-4 group-hover:text-white transition-colors">
            Check If You Qualify
          </span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
      
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onDismiss();
        }}
        className="p-2 hover:bg-black/10 transition-colors rounded-none"
        aria-label="Dismiss announcement"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};
