import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import logoImage from "../../imports/logo_cropped.webp";
import { Link } from "react-router-dom";

export function Nav() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-4">
        <Link to="/">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 md:gap-3 shrink-0"
          >
            <img 
              src={logoImage} 
              alt="LawyerMarketing.my" 
              className="h-8 md:h-12 w-auto block shrink-0" 
            />
            <div className="text-[10px] md:text-sm lg:text-base font-light tracking-[0.1em] text-accent uppercase">
              LawyerMarketing.my
            </div>
          </motion.div>
        </Link>
        <div className="flex items-center gap-4 md:gap-8 text-xs md:text-sm">
          <Link to="/blog" className="uppercase tracking-widest text-foreground/70 hover:text-accent transition-colors hidden sm:block">
            Insights
          </Link>
          <Link to="/contact" className="shrink-0">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(201, 169, 97, 0.9)" }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-1.5 md:px-6 md:py-2.5 bg-accent text-accent-foreground rounded-sm flex items-center gap-2 group"
            >
              Get Started
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
