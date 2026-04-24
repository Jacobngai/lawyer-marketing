import { motion, useScroll, useTransform, useInView } from "motion/react";
import { Scale, Target, Users, TrendingUp, Award, Briefcase, ArrowRight, Sparkles, Star, MessageCircle, Check, Shield } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import heroImage from "../../imports/hero.webp";
import heroMobileImage from "../../imports/hero_mobile.webp";
import strategicPresenceImage from "../../imports/presence.webp";
import jacobHero from "../../imports/jacob_hero.png";
import strategicPartnershipImg from "../../imports/strategic_partnership_new.png";
import courtroomDominanceImg from "../../imports/courtroom_dominance.png";
import { AISearchDemo } from "../components/AISearchDemo";
import { WhatWeDo } from "../components/WhatWeDo";
import { SuccessFramework } from "../components/SuccessFramework";

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

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-accent/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

import { SEO } from "../components/SEO";

export function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main className="relative">
      <SEO 
        title="Law Firm Marketing Malaysia | Professional Case Acquisition"
        description="Leading law firm marketing agency in Malaysia. We deliver direct-response strategies, SEO, and AI search optimization to help lawyers attract high-value cases and dominate their market."
      />
      {/* Floating Particles Background - Desktop Only for Performance */}
      <div className="hidden md:block">
        <FloatingParticles />
      </div>

      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center bg-black pt-[100px] md:pt-[120px] pb-20 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-8 md:px-12 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column: Image (First on Mobile) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative order-1 lg:order-1"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-accent/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <img 
                  src={jacobHero} 
                  alt="Jacob - Law Firm Growth Strategist" 
                  className="relative w-full max-w-lg mx-auto lg:mx-0 object-contain h-[40vh] lg:h-[80vh] drop-shadow-[0_0_50px_rgba(201,169,97,0.3)]"
                />
              </div>
            </motion.div>

            {/* Right Column: Copy (Second on Mobile) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-left order-2 lg:order-2 space-y-8"
            >
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] text-white">
                  Turn Your <span className="text-accent font-serif italic">Firm</span> Into The <span className="text-accent">Obvious Choice</span>
                </h1>
                <span className="inline-block px-4 py-1.5 bg-accent/10 border border-accent/20 text-accent text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] rounded-full">
                  Exclusively for Malaysia's Founding Partner Program
                </span>
                <p className="text-lg md:text-xl text-foreground/70 max-w-xl leading-relaxed italic">
                  Stop blending in with the generic "safe" lawyers who say nothing and mean less. We help you attract better cases, higher-value clients, and absolute authority using direct-response strategies that turn look-ups into high-fee appointments.
                </p>
              </div>

              {/* Pulsating CTA */}
              <div className="pt-4 flex flex-col sm:flex-row items-start lg:items-center gap-6">
                <Link to="/contact">
                  <motion.button
                    animate={{ 
                      scale: [1, 1.03, 1],
                      boxShadow: [
                        "0 0 0px rgba(201,169,97,0)", 
                        "0 0 20px rgba(201,169,97,0.4)", 
                        "0 0 0px rgba(201,169,97,0)"
                      ] 
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="px-12 py-5 bg-accent text-accent-foreground font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-black transition-all flex items-center gap-3 group"
                  >
                    Claim Your Free Landing Page
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </div>

              {/* Value Triple-Threat */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-white/10">
                <div className="space-y-2">
                  <h3 className="text-accent font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-2">
                    <Shield className="w-3 h-3" /> More Trust
                  </h3>
                  <p className="text-[11px] text-foreground/50 leading-relaxed">
                    Sharper authority positioning so prospects feel they are dealing with the best, not the cheapest.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-accent font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-2">
                    <Target className="w-3 h-3" /> Better Leads
                  </h3>
                  <p className="text-[11px] text-foreground/50 leading-relaxed">
                    Messaging designed to attract serious matters and filter out low-intent inquiries.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-accent font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-2">
                    <TrendingUp className="w-3 h-3" /> Higher Fees
                  </h3>
                  <p className="text-[11px] text-foreground/50 leading-relaxed">
                    Premium perception that supports stronger pricing and better consultation close rates.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Background Gradients */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-accent/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full blur-[120px]" />
        </div>
      </section>

      {/* AI Search Demo Section - Section 2 (Contrast: Dark) */}
      <section className="py-16 md:py-24 lg:py-32 bg-[#050505] relative overflow-hidden border-b border-white/5">
        {/* Subtle decorative grain/pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 md:mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-flex items-center gap-2 mb-4 md:mb-6"
            >
              <div className="h-px w-8 md:w-12 bg-accent" />
              <Sparkles className="w-4 md:w-5 h-4 md:h-5 text-accent" />
              <div className="h-px w-8 md:w-12 bg-accent" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl lg:text-6xl mb-3 md:mb-4 px-4 text-foreground lowercase tracking-tighter font-light">
              The <span className="text-accent italic font-serif">New Battleground</span> for Dominance
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-foreground/60 max-w-3xl mx-auto leading-relaxed px-4">
              In 2026, clients don't just "search"—they ask AI. If ChatGPT or Gemini isn't recommending your firm by name as the top choice, you are effectively invisible. We engineer your digital footprint so the AI speaks your name first.
            </p>
          </motion.div>
          <div className="relative">
            <AISearchDemo />
          </div>
        </div>
      </section>

      {/* Strategic Digital Presence Section - Section 3 (Contrast: Dark) */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src={courtroomDominanceImg}
                alt="Strategic legal digital presence"
                className="w-full h-auto md:h-[600px] object-cover rounded-sm shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute -top-10 -left-10 w-64 h-64 border border-white/5 rounded-full hidden md:block" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-5xl mb-6 text-foreground lowercase tracking-tight font-light">
                  The Rules of <span className="text-accent italic font-serif">Engagement</span> Have Changed
                </h2>
                <p className="text-xl text-foreground/60 leading-relaxed">
                  For decades, you were forbidden from aggressive competition. In January 2026, the gates opened. The lawyers who move first with high-authority marketing will own the market for the next 20 years. The rest will be fighting for scraps.
                </p>
              </div>
 
              <div className="space-y-6">
                {[
                  {
                    icon: Target,
                    title: "Compliance-First Approach",
                    desc: "Navigate advertising regulations with confidence",
                  },
                  {
                    icon: TrendingUp,
                    title: "Premium Brand Building",
                    desc: "Establish market authority in your practice area",
                  },
                  {
                    icon: Users,
                    title: "Client Acquisition",
                    desc: "Connect with high-value clients seeking legal expertise",
                  },
                ].map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-4 p-6 bg-white/5 border border-white/10 rounded-sm hover:border-accent transition-colors group shadow-2xl backdrop-blur-sm"
                  >
                    <div className="p-3 bg-accent/5 rounded-sm h-fit group-hover:bg-accent/10 transition-colors">
                      <service.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl mb-2 text-foreground">{service.title}</h3>
                      <p className="text-foreground/50">{service.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Success Framework - Section 5 (Contrast: Black) */}
      <SuccessFramework />

      {/* Practice Areas Section - Section 6 (Contrast: Dark) */}
      <section className="py-12 md:py-24 lg:py-32 bg-background relative overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 mb-4 md:mb-6"
          >
            <div className="h-px w-8 md:w-12 bg-accent" />
            <Sparkles className="w-4 md:w-5 h-4 md:h-5 text-accent" />
            <div className="h-px w-8 md:w-12 bg-accent" />
          </motion.div>
          <h2 className="text-2xl md:text-4xl lg:text-6xl mb-3 md:mb-4 px-4 text-foreground lowercase tracking-tighter font-light">
            Your Specialty. <span className="text-accent italic font-serif">Our Strategy.</span>
          </h2>
          <p className="text-sm md:text-lg lg:text-xl text-foreground/60 max-w-2xl mx-auto px-4">
            Whether you are a top-tier litigator or a specialized practitioner, we position you as the definitive expert in your field. We don't do generic. We do authority placement.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {practiceAreas.map((area, index) => (
            <motion.div
              key={area.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              whileHover={{
                y: -5,
                scale: 1.02,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
              }}
              className="group relative bg-white/5 border border-white/10 rounded-sm p-4 md:p-8 hover:border-accent transition-all cursor-pointer overflow-hidden shadow-2xl backdrop-blur-sm"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start md:gap-4 relative z-10 text-center md:text-left">
                <div className="p-2 md:p-3 bg-accent/5 rounded-sm group-hover:bg-accent/10 transition-colors mb-2 md:mb-0">
                  <area.icon className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[10px] md:text-lg leading-tight md:mb-2 uppercase tracking-tight md:tracking-normal text-foreground">{area.name}</h3>
                  <div className="h-0.5 bg-accent w-0 group-hover:w-12 transition-all hidden md:block" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA - Restoring Original Rich Background and Pattern */}
      <section className="py-32 relative overflow-hidden text-center">
        <div className="absolute inset-0">
          <img
            src={strategicPartnershipImg}
            alt="Strategic Partnership"
            className="w-full h-full object-cover grayscale opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/80" />
          
          {/* Intense accent glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
             <span className="inline-block px-6 py-2 bg-accent text-accent-foreground text-[10px] font-black uppercase tracking-[0.4em] rounded-full shadow-[0_0_20px_rgba(201,169,97,0.4)] mb-8">
               Exclusive Founding Partner Offer — For Lawyers Only
             </span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl mb-8 font-light leading-[1.1] tracking-tighter">
            The Cost of <span className="text-accent italic font-serif">Indecision</span> <br className="hidden md:block" /> is Invisibility
          </h2>
          
          <p className="text-xl md:text-2xl text-foreground/70 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Stop overpaying for generic design. We are waiving the <span className="text-white font-bold">RM 3,500 build fee</span> for Malaysia's next 5 high-authority firms. 
            Claim your free landing page and dominate your market before the gates close.
          </p>

          <div className="flex flex-col items-center gap-8">
            <Link to="/contact">
              <motion.button 
                animate={{ 
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 20px rgba(201,169,97,0.2)", 
                    "0 0 50px rgba(201,169,97,0.5)", 
                    "0 0 20px rgba(201,169,97,0.2)"
                  ] 
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-16 py-6 bg-accent text-accent-foreground rounded-sm flex flex-col items-center gap-1 group overflow-hidden"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg md:text-xl font-black uppercase tracking-[0.2em]">Claim Your Free Landing Page</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 underline underline-offset-4">Value: RM 3,500.00 — Zero Build Cost</span>
              </motion.button>
            </Link>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-foreground/40 text-xs uppercase tracking-[0.2em] font-bold"
            >
              You just pay for the hosting.
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
