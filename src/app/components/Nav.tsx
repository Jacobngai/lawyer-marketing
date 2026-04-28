import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronDown, Search, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { services } from "../data/services";
import { pillars } from "../data/pillars";
import { tutorials } from "../data/tutorials";
import { cn } from "./ui/utils";

const logoFull = "/images/logo-full-360.webp";
const logoSquare = "/images/logo-square.png";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        className="bg-background/95 backdrop-blur-md border-b border-white/10 shadow-2xl relative z-[110]"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-[60px] md:h-[80px] flex items-center justify-between gap-4">
          <Link to="/" onClick={() => { setActiveMenu(null); setIsMobileMenuOpen(false); }}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 md:gap-3 shrink-0"
            >
              {/* Desktop Logo: Full */}
              <img 
                src={logoFull} 
                alt="LawyerMarketing.my" 
                width={360}
                height={100}
                className="h-10 md:h-12 w-auto hidden sm:block shrink-0 object-contain" 
              />
              {/* Mobile Logo: Square */}
              <img 
                src={logoSquare} 
                alt="LawyerMarketing.my" 
                width={100}
                height={100}
                className="h-10 w-auto sm:hidden shrink-0 object-contain" 
              />
            </motion.div>
          </Link>
          
          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-4 md:gap-8">
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

          <div className="flex items-center gap-3 md:gap-4">
            <motion.button
              whileHover={{ scale: 1.1, color: "#C9A961" }}
              whileTap={{ scale: 0.9 }}
              onClick={onSearchClick}
              className="p-2 text-foreground/70 transition-colors flex items-center group relative"
              aria-label="Search"
            >
              <Search className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>

            <Link to="/contact" onClick={() => { setActiveMenu(null); setIsMobileMenuOpen(false); }}>
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

            {/* Mobile Hamburger Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground/70 hover:text-accent transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "circOut" }}
            className="fixed inset-0 top-[60px] z-[105] bg-background lg:hidden overflow-y-auto no-scrollbar"
          >
            <div className="p-8 space-y-12">
              {menuItems.map((item) => (
                <div key={item.id} className="space-y-6">
                  <h3 className="text-accent text-[10px] uppercase tracking-[0.4em] font-black border-b border-accent/20 pb-2">
                    {item.label}
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {(item.id === "what-we-do" ? services : tutorials).map((link: any) => (
                      <Link
                        key={link.id}
                        to={item.id === "seo-guide" ? `/tutorials/${link.id}` : link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-4 group active:bg-white/5 p-2 transition-colors"
                      >
                        <div className="w-12 h-12 shrink-0 bg-white/5 border border-white/10 rounded-sm overflow-hidden">
                          <img src={link.image} alt="" className="w-full h-full object-cover opacity-50" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-black text-white uppercase tracking-widest">{link.title}</p>
                          <p className="text-[10px] text-foreground/40 line-clamp-1">{link.subtitle || link.description}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-accent/40 group-hover:text-accent transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="pt-8">
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                   <button className="w-full py-5 bg-accent text-accent-foreground font-black uppercase tracking-[0.3em] text-[10px]">
                      Secure Your 2026 Strategy
                   </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Mega Menu Panels */}
      <AnimatePresence>
        {activeMenu && !isMobileMenuOpen && (
          <div className="fixed inset-0 top-[80px] z-[105] pointer-events-none hidden lg:block">
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
              className="absolute top-0 left-0 right-0 bg-[#080808] border-b border-accent/20 shadow-[0_40px_80px_rgba(0,0,0,0.8)] pointer-events-auto overflow-y-auto"
              onMouseLeave={() => setActiveMenu(null)}
            >
              <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex items-end justify-between mb-6">
                  <div className="space-y-1">
                    <span className="text-accent text-[9px] uppercase tracking-[0.4em] font-bold">
                      {activeMenu === "seo-guide" ? "Knowledge Hub" : "Solutions"}
                    </span>
                    <h2 className="text-4xl font-serif text-white tracking-tight leading-none">
                      {activeMenu === "what-we-do" ? "Digital Marketing Services" : "Lawyer SEO Masterclass"}
                    </h2>
                  </div>
                </div>
                
                <div className="h-px w-full bg-gradient-to-r from-accent/50 via-accent/10 to-transparent mb-8" />
                
                <ul className="grid grid-cols-3 gap-x-12 gap-y-8">
                  {(activeMenu === "what-we-do" ? services : tutorials).map((item: any, index: number) => (
                    <li key={item.id} className="group">
                        <Link
                          to={activeMenu === "seo-guide" ? `/tutorials/${item.id}` : item.href}
                          onClick={() => setActiveMenu(null)}
                          className="flex gap-8 items-start no-underline outline-none transition-all group"
                        >
                          <div className="shrink-0 w-36 h-24 overflow-hidden bg-[#111] border border-white/5 rounded-sm relative">
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
                           <h3 className="text-sm font-black text-white uppercase tracking-[0.1em] leading-tight group-hover:text-accent transition-colors flex items-center gap-2">
                              <span>{item.title}</span>
                              <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent shrink-0" />
                           </h3>
                           <p className="text-[13px] leading-relaxed text-foreground/40 group-hover:text-foreground/70 line-clamp-3 font-medium tracking-wide transition-colors">
                            {item.subtitle || item.description}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="h-1 w-full bg-accent shadow-[0_0_30px_rgba(201,169,97,0.5)]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
