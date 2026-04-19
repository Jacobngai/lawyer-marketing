import { motion, useScroll, useTransform, useInView } from "motion/react";
import { Scale, Target, Users, TrendingUp, Award, Briefcase, ArrowRight, Sparkles, Star, MessageCircle } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import heroImage from "../../imports/hero.webp";
import heroMobileImage from "../../imports/hero_mobile.webp";
import strategicPresenceImage from "../../imports/presence.webp";
import { AISearchDemo } from "../components/AISearchDemo";
import { WhatWeDo } from "../components/WhatWeDo";

const practiceAreas = [
  { name: "Corporate & Commercial Law", icon: Briefcase },
  { name: "Banking & Finance", icon: TrendingUp },
  { name: "Civil Litigation", icon: Scale },
  { name: "Criminal Law", icon: Scale },
  { name: "Family & Matrimonial", icon: Users },
  { name: "Property & Conveyancing", icon: Award },
  { name: "Immigration Law", icon: Users },
  { name: "Intellectual Property", icon: Award },
  { name: "Employment & Industrial Relations", icon: Briefcase },
  { name: "Islamic Law (Syariah)", icon: Scale },
  { name: "Tax & Revenue", icon: TrendingUp },
  { name: "Dispute Resolution & Arbitration", icon: Scale },
  { name: "Mergers & Acquisitions", icon: Briefcase },
  { name: "Construction Law", icon: Award },
  { name: "Insolvency & Bankruptcy", icon: TrendingUp },
];

export function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main>
      <section ref={heroRef} className="relative h-auto md:h-screen overflow-hidden bg-black pt-16 md:pt-0">
        <motion.div style={{ y: imageY }} className="relative md:absolute md:inset-0">
          <img
            src={heroImage}
            alt="Professional legal team"
            className="w-full h-full object-cover hidden md:block"
            fetchPriority="high"
            width="1536"
            height="1024"
          />
          <img
            src={heroMobileImage}
            alt="Lawyer at work"
            className="w-full h-auto md:hidden"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/80 hidden md:block" />
        </motion.div>

        {/* Animated decorative elements - hidden on mobile */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 3,
                delay: i * 0.8,
                repeat: Infinity,
                repeatDelay: 2,
              }}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
            >
              <Sparkles className="w-6 h-6 text-accent" />
            </motion.div>
          ))}
        </div>

        <motion.div
          style={{ opacity }}
          className="relative h-full max-w-7xl mx-auto px-6 flex items-center"
        >
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="hidden md:block" />
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4 md:space-y-6 relative hidden md:block"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute -left-12 top-0 w-1 h-full bg-gradient-to-b from-accent via-accent/50 to-transparent origin-top hidden lg:block"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/20 border border-accent rounded-sm"
              >
                <Star className="w-4 h-4 text-accent fill-accent animate-pulse" />
                <span className="text-accent text-sm tracking-wide">Since January 2026</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight"
              >
                Elevate Your
                <br />
                <motion.span
                  className="text-accent inline-block"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(201, 169, 97, 0.3)",
                      "0 0 40px rgba(201, 169, 97, 0.5)",
                      "0 0 20px rgba(201, 169, 97, 0.3)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Legal Practice
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-xl"
              >
                Malaysia's premier social media marketing agency exclusively for law firms. Navigate the new advertising landscape with sophistication and compliance.
              </motion.p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <a
                  href="https://cal.com/zen-pdcnlc/lawyer-marketing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(201, 169, 97, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 md:px-8 py-3 md:py-4 bg-accent text-accent-foreground rounded-sm hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 group"
                  >
                    Book Consultation
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </a>
                <Link to="/blog">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 md:px-8 py-3 md:py-4 border border-accent text-accent rounded-sm hover:bg-accent/10 transition-colors"
                  >
                    View Strategy Library
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* AI Search Demo Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-3 md:mb-4 px-4">
              Get <span className="text-accent">AI-Cited</span> on Page 1
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed px-4">
              When potential clients search for legal help, AI recommends firms with strong digital presence.
              Watch how your firm gets featured as the trusted choice.
            </p>
          </motion.div>
          <AISearchDemo />
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={strategicPresenceImage}
                alt="Strategic legal digital presence"
                className="w-full h-auto md:h-[600px] object-cover rounded-sm shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h2 className="text-5xl mb-6">
                Strategic <span className="text-accent">Digital Presence</span>
              </h2>
              <p className="text-xl text-foreground/70 leading-relaxed mb-8">
                Since the Bar Council's landmark decision in January 2026, law firms can now advertise. We help you seize this opportunity with elegance and authority.
              </p>
              <WhatWeDo />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Practice Areas Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-secondary/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative text-center mb-16">
          <h2 className="text-2xl md:text-4xl lg:text-5xl mb-3 md:mb-4 px-4 font-light">
            Specialized <span className="text-accent italic">Expertise</span>
          </h2>
          <p className="text-sm md:text-lg lg:text-xl text-foreground/70 max-w-2xl mx-auto px-4">
            Tailored marketing strategies for every legal specialization in Malaysia.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-5 gap-4">
          {practiceAreas.map((area, index) => (
            <motion.div
              key={area.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="p-4 bg-card/30 border border-border rounded-sm hover:border-accent transition-colors text-center"
            >
              <area.icon className="w-5 h-5 text-accent mx-auto mb-3" />
              <h3 className="text-[10px] md:text-xs uppercase tracking-widest">{area.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative text-center overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-5xl md:text-6xl mb-6 font-light leading-tight">
            Ready to Lead Your <span className="text-accent italic">Market?</span>
          </h2>
          <p className="text-xl text-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join Malaysia's leading law firms in establishing a commanding digital presence. Schedule your strategic consultation today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://cal.com/zen-pdcnlc/lawyer-marketing" target="_blank" rel="noopener noreferrer">
              <motion.button className="w-full sm:w-auto px-12 py-5 bg-accent text-accent-foreground rounded-sm text-lg font-medium flex items-center justify-center gap-3 group">
                Schedule Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </a>
            <a href="https://wa.me/60175032281" target="_blank" rel="noopener noreferrer">
              <motion.button className="w-full sm:w-auto px-12 py-5 border-2 border-green-500 text-green-500 rounded-sm text-lg flex items-center justify-center gap-3 group">
                <MessageCircle className="w-6 h-6" />
                Whatsup Us
              </motion.button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
