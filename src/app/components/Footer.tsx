import { motion } from "motion/react";
import logoImage from "../../imports/logo_full_final.png";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12 relative overflow-hidden">
      {/* Subtle animated gradient background from original design */}
      <motion.div
        className="absolute inset-0 opacity-10 pointer-events-none"
        animate={{
          background: [
            "linear-gradient(135deg, rgba(201, 169, 97, 0.1) 0%, transparent 50%)",
            "linear-gradient(135deg, transparent 50%, rgba(201, 169, 97, 0.1) 100%)",
            "linear-gradient(135deg, rgba(201, 169, 97, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <img
                src={logoImage}
                alt="LawyerMarketing.my"
                className="h-10 md:h-16 w-auto block shrink-0"
              />
            </div>
            <p className="text-foreground/70 max-w-xs text-sm leading-relaxed">
              We are Malaysia's premier marketing agency. We specialize in your digital growth within the legal sector. Est. 2026.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-sm font-medium mb-4 uppercase tracking-[0.2em] text-accent">Links</h3>
            <ul className="space-y-2 text-foreground/70 text-sm">
              <li><Link to="/blog" className="hover:text-accent transition-colors underline-offset-4 hover:underline">Knowledge Hub</Link></li>
              <li><a href="https://cal.com/zen-pdcnlc/lawyer-marketing" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors underline-offset-4 hover:underline">Book Consultation</a></li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-sm font-medium mb-4 uppercase tracking-[0.2em] text-accent">Connect</h3>
            <ul className="space-y-2 text-foreground/70 text-sm">
              <li><a href="mailto:jacob@lawyermarketing.my" className="hover:text-accent transition-colors">jacob@lawyermarketing.my</a></li>
              <li>Kuala Lumpur, Malaysia</li>
            </ul>
          </motion.div>
        </div>
        <div className="text-center pt-8 border-t border-border text-foreground/40 text-[10px] md:text-xs mt-12">
          <p>© 2026 LawyerMarketing.my. All rights reserved. Bar Council Compliance Priority.</p>
        </div>
      </div>
    </footer>
  );
}
