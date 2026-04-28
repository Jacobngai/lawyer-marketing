import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronDown, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { services } from "../data/services";
import { pillars } from "../data/pillars";
import { tutorials } from "../data/tutorials";
import { cn } from "./ui/utils";

const logo = "/images/logo-full-360.webp";

// Global styles for mega menu images to achieve specific grayscale effect
const megaMenuStyles = `
  .mega-menu-image {
    filter: grayscale(60%);
    transition: filter 0.8s ease, transform 1s ease, opacity 0.5s ease;
  }
  .group:hover .mega-menu-image {
    filter: grayscale(0%) !important;
  }
`;

export function Nav({ onSearchClick, topOffset = "0px" }: { onSearchClick?: () => void; topOffset?: string }) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { id: "what-we-do", label: "What We Do" },
    { id: "seo-guide", label: "SEO Guide" },
  ];

  return (
    <div ref={navRef} className="fixed left-0 right-0 z-[100]" style={{ top: topOffset }}>
      <style dangerouslySetInnerHTML={{ __html: megaMenuStyles }} />
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-background/90 backdrop-blur-md border-b border-white/10 shadow-2xl relative z-[110]"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-[60px] md:h-[80px] flex items-center justify-between gap-4">
          <Link to="/" onClick={() => setActiveMenu(null)}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 md:gap-3 shrink-0"
            >
              <img 
                src={logo} 
                alt="LawyerMarketing.my" 
                width={360}
                height={100}
                decoding="async"
                className="h-8 md:h-12 w-auto block shrink-0" 
              />
            </motion.div>
          </Link>
          
          <div className="flex items-center gap-4 md:gap-8">
            <div className="flex items-center gap-4 md:gap-8">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="relative group py-2"
                  onMouseEnter={() => setActiveMenu(item.id)}
                >
                  <button
                    onClick={() => setActiveMenu(activeMenu === item.id ? null : item.id)}
                    className={cn(
                      "text-[10px] md:text-xs uppercase tracking-[0.2em] transition-colors font-semibold flex items-center gap-1 cursor-pointer",
                      activeMenu === item.id ? "text-accent" : "text-foreground/70 hover:text-accent"
                    )}
                  >
                    {item.label}
                    <ChevronDown className={cn("w-2.5 h-2.5 md:w-3 md:h-3 transition-transform duration-300", activeMenu === item.id && "rotate-180")} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1, color: "#C9A961" }}
              whileTap={{ scale: 0.9 }}
              onClick={onSearchClick}
              className="p-2 text-foreground/70 transition-colors flex items-center group relative"
              aria-label="Search"
            >
              <Search className="w-5 h-5 md:w-6 md:h-6" />
              <motion.div 
                layoutId="search-glow"
                className="absolute inset-0 bg-accent/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </motion.button>

            <Link to="/contact" onClick={() => setActiveMenu(null)}>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(201, 169, 97, 0.9)" }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-1.5 md:px-6 md:py-2.5 bg-accent text-accent-foreground rounded-sm flex items-center gap-2 group text-xs md:text-base font-bold shadow-lg shadow-accent/20"
              >
                <span className="hidden sm:inline">Get Started</span>
                <span className="sm:hidden">Join</span>
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Mega Menu Panels */}
      <AnimatePresence>
        {activeMenu && (
          <div className="fixed inset-0 top-[60px] md:top-[80px] z-[105] pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
              onClick={() => setActiveMenu(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 right-0 bg-[#080808] border-b border-accent/20 shadow-[0_40px_80px_rgba(0,0,0,0.8)] pointer-events-auto overflow-y-auto max-h-[calc(100vh-80px)] md:max-h-none no-scrollbar"
              onMouseLeave={() => setActiveMenu(null)}
            >
              <div className="max-w-7xl mx-auto px-6 py-6 md:py-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
                  <div className="space-y-1">
                    <span className="text-accent text-[9px] uppercase tracking-[0.4em] font-bold">
                      {activeMenu === "seo-guide" ? "Knowledge Hub" : "Solutions"}
                    </span>
                    <h2 className="text-2xl md:text-4xl font-serif text-white tracking-tight leading-none">
                      {activeMenu === "what-we-do" ? "Digital Marketing Services" : activeMenu === "seo-guide" ? "Lawyer SEO Masterclass" : "Specialized Practice Areas"}
                    </h2>
                  </div>
                </div>
                
                <div className="h-px w-full bg-gradient-to-r from-accent/50 via-accent/10 to-transparent mb-8" />
                
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
                  {(activeMenu === "what-we-do" ? services : activeMenu === "seo-guide" ? tutorials : pillars).map((item: any, index: number) => (
                    <li key={item.id} className="group">
                        <Link
                          to={activeMenu === "seo-guide" ? `/tutorials/${item.id}` : item.href}
                          onClick={() => setActiveMenu(null)}
                          className="flex flex-col md:flex-row gap-4 md:gap-8 items-start no-underline outline-none transition-all group"
                        >
                          <div className="shrink-0 w-full md:w-36 h-32 md:h-24 overflow-hidden bg-[#111] border border-white/5 rounded-sm relative">
                             <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 opacity-60 group-hover:opacity-100 mega-menu-image"
                              />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
                            
                            <div className="absolute top-1.5 right-1.5 z-10">
                              <div className="w-5 h-5 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-[10px] font-black shadow-lg shadow-black/80">
                                {index + 1}
                              </div>
                            </div>
                          </div>
                        <div className="space-y-2 py-1 flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="text-xs md:text-sm font-black text-white uppercase tracking-[0.1em] leading-tight group-hover:text-accent transition-colors flex items-center gap-2">
                               <span>{item.title}</span>
                               <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent shrink-0" />
                            </h3>
                          </div>
                          <p className="text-[11px] md:text-[13px] leading-relaxed text-foreground/40 group-hover:text-foreground/70 line-clamp-3 font-medium tracking-wide transition-colors">
                            {item.subtitle || item.description}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Bottom accent glow */}
              <div className="h-1 w-full bg-accent shadow-[0_0_30px_rgba(201,169,97,0.5)]" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
