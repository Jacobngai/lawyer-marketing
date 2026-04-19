import { motion } from "motion/react";
import logoImage from "../../imports/logo_cropped.webp";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12 relative overflow-hidden">
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
              <div className="text-base md:text-lg font-light tracking-[0.1em] text-accent uppercase">
                LawyerMarketing.my
              </div>
            </div>
            <p className="text-foreground/70 max-w-xs text-sm leading-relaxed">
              Malaysia's premier marketing agency specializing in digital growth for the legal sector. Est. 2026.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-sm font-medium mb-4 uppercase tracking-[0.2em] text-accent">Knowledge Hub</h3>
            <ul className="space-y-2 text-foreground/70 text-sm">
              {[
                { name: "Advertising Rules", link: "/blog" },
                { name: "AI SEO Guide", link: "/blog" },
                { name: "Brand Strategy", link: "/blog" },
                { name: "Compliance Check", link: "/blog" }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.link} className="hover:text-accent transition-colors">{item.name}</Link>
                </li>
              ))}
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
        <div className="text-center pt-8 border-t border-border text-foreground/40 text-xs mt-12">
          <p>© 2026 LawyerMarketing.my. All rights reserved. Bar Council Compliance Priority.</p>
        </div>
      </div>
    </footer>
  );
}
