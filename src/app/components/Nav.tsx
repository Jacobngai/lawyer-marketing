import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import logo from "../../imports/logo_horizontal.png";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { services } from "../data/services";
import { pillars } from "../data/pillars";
import { cn } from "./ui/utils";

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
              src={logo} 
              alt="LawyerMarketing.my" 
              className="h-8 md:h-12 w-auto block shrink-0" 
            />
            <div className="text-[10px] md:text-sm lg:text-base font-light tracking-[0.1em] text-accent uppercase">
              LawyerMarketing.my
            </div>
          </motion.div>
        </Link>
        
        <div className="hidden lg:flex items-center gap-1">
          <NavigationMenu>
            <NavigationMenuList>
              {/* Services Submenu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-foreground/70 hover:text-accent data-[state=open]:text-accent text-xs uppercase tracking-widest transition-colors font-medium">
                  What We Do
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-background border border-border mt-1">
                    {services.map((service) => (
                      <li key={service.id}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={service.href}
                            className={cn(
                              "block select-none space-y-1 rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10 hover:text-accent focus:bg-accent/10 focus:text-accent group"
                            )}
                          >
                            <div className="text-sm font-medium leading-none mb-1">{service.title}</div>
                            <p className="line-clamp-2 text-xs leading-snug text-foreground/50 group-hover:text-foreground/70">
                              {service.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Practice Areas Submenu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-foreground/70 hover:text-accent data-[state=open]:text-accent text-xs uppercase tracking-widest transition-colors font-medium">
                  Practice Areas
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-background border border-border mt-1">
                    {pillars.map((pillar) => (
                      <li key={pillar.id}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={pillar.href}
                            className={cn(
                              "block select-none space-y-1 rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10 hover:text-accent focus:bg-accent/10 focus:text-accent group"
                            )}
                          >
                            <div className="text-sm font-medium leading-none mb-1">{pillar.title}</div>
                            <p className="line-clamp-2 text-xs leading-snug text-foreground/50 group-hover:text-foreground/70">
                              {pillar.subtitle}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                    {pillars.length === 0 && (
                      <div className="text-xs text-foreground/30 p-3 italic">
                        Researching additional practice areas...
                      </div>
                    )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link to="/blog" className="px-4 py-2 text-xs uppercase tracking-widest text-foreground/70 hover:text-accent transition-colors font-medium">
            Insights
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(201, 169, 97, 0.9)" }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-1.5 md:px-6 md:py-2.5 bg-accent text-accent-foreground rounded-sm flex items-center gap-2 group text-xs md:text-base font-medium"
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
