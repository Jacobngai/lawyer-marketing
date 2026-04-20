import { motion, useScroll, useTransform, useInView } from "motion/react";
import { Scale, Target, Users, TrendingUp, Award, Briefcase, ArrowRight, Sparkles, Star, Check, MessageCircle } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import heroImage from "../imports/hero.webp";
import heroMobileImage from "../imports/hero_mobile.webp";
import logoImage from "../imports/logo_cropped.webp";
import strategicPresenceImage from "../imports/presence.webp";
import { AISearchDemo } from "./components/AISearchDemo";
import { WhatWeDo } from "./components/WhatWeDo";

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

const testimonials = [
  {
    name: "Dato' Ahmad bin Hassan",
    firm: "Hassan & Partners",
    text: "LawyerMarketing.my transformed our digital presence completely. We've seen a 300% increase in qualified client inquiries.",
    practice: "Corporate Law"
  },
  {
    name: "Melissa Tan",
    firm: "Tan Legal Associates",
    text: "Their understanding of legal compliance combined with creative marketing is unmatched. Highly professional service.",
    practice: "Family Law"
  },
  {
    name: "Kumar Ramasamy",
    firm: "Ramasamy Chambers",
    text: "Finally, a marketing agency that understands the nuances of legal practice. Outstanding results in just 3 months.",
    practice: "Commercial Litigation"
  },
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

function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return <span ref={ref}>{count}</span>;
}

export default function App() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Floating Particles Background - Desktop Only for Performance */}
      <div className="hidden md:block">
        <FloatingParticles />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-4">
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
          <a
            href="https://cal.com/zen-pdcnlc/lawyer-marketing"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(201, 169, 97, 0.9)" }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-1.5 md:px-6 md:py-2.5 bg-accent text-accent-foreground rounded-sm flex items-center gap-2 group text-xs md:text-base"
            >
              Get Started
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </a>
        </div>
      </motion.nav>
      
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
            {/* Left side - keep empty for the people in image on desktop */}
            <div className="hidden md:block" />

            {/* Right side - hero text - HIDDEN ON MOBILE AS REQUESTED */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4 md:space-y-6 relative hidden md:block"
            >
              {/* Decorative accent line - desktop only */}
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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4"
              >
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
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 md:px-8 py-3 md:py-4 border border-accent text-accent rounded-sm hover:bg-accent/10 transition-colors"
                >
                  View Portfolio
                </motion.button>
              </motion.div>

              </motion.div>
            </div>
          </motion.div>
        </section>

      {/* AI Search Demo Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        {/* Animated background elements - hidden on mobile for performance */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl hidden md:block"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl hidden md:block"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

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
                loading="lazy"
                decoding="async"
                width="1024"
                height="1024"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-5xl mb-6">
                  Strategic <span className="text-accent">Digital Presence</span>
                </h2>
                <p className="text-xl text-foreground/70 leading-relaxed">
                  Since the Bar Council's landmark decision in January 2026, law firms can now advertise. We help you seize this opportunity with elegance and authority.
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
                    className="flex gap-4 p-6 bg-card/50 border border-border rounded-sm hover:border-accent transition-colors group"
                  >
                    <div className="p-3 bg-accent/10 rounded-sm h-fit group-hover:bg-accent/20 transition-colors">
                      <service.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl mb-2">{service.title}</h3>
                      <p className="text-foreground/70">{service.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background via-secondary/30 to-background relative overflow-hidden">
        {/* Animated background grid - hidden on mobile */}
        <div className="absolute inset-0 opacity-10 hidden md:block">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(201, 169, 97, 0.3) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(201, 169, 97, 0.3) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Floating orbs - hidden on mobile for performance */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl hidden md:block"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl hidden md:block"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16 lg:mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-flex items-center gap-2 mb-4 md:mb-6 flex-wrap justify-center"
            >
              <div className="h-px w-8 md:w-12 bg-accent" />
              <Sparkles className="w-4 md:w-5 h-4 md:h-5 text-accent" />
              <span className="text-xs md:text-sm text-accent tracking-widest uppercase">Our Services</span>
              <Sparkles className="w-4 md:w-5 h-4 md:h-5 text-accent" />
              <div className="h-px w-8 md:w-12 bg-accent" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6 px-4"
            >
              What We <span className="text-accent">Deliver</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base md:text-lg lg:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed px-4"
            >
              A complete digital marketing ecosystem engineered to position your law firm as the undisputed
              authority in your practice area. Every service is designed for maximum impact and ROI.
            </motion.p>

            {/* Decorative elements - hidden on mobile */}
            <div className="relative mt-8 hidden md:block">
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute left-1/2 -translate-x-1/2 w-64 h-64 border border-accent/20 rounded-full"
              />
              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute left-1/2 -translate-x-1/2 w-80 h-80 border border-accent/10 rounded-full"
              />
            </div>
          </motion.div>

          {/* Services Grid */}
          <WhatWeDo />

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12 md:mt-16"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px rgba(201, 169, 97, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 md:px-10 py-3 md:py-4 bg-accent text-accent-foreground rounded-lg text-base md:text-lg flex items-center gap-2 md:gap-3 mx-auto group"
            >
              <span>View Full Service Packages</span>
              <ArrowRight className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>



      {/* Practice Areas Section - MOVED TO BOTTOM & OPTIMIZED FOR MOBILE */}
      <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-secondary/30 relative overflow-hidden">
        {/* Animated background gradient - hidden on mobile for performance */}
        <motion.div
          className="absolute inset-0 opacity-30 hidden md:block"
          animate={{
            background: [
              "radial-gradient(circle at 0% 0%, rgba(201, 169, 97, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 100% 100%, rgba(201, 169, 97, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 0% 0%, rgba(201, 169, 97, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
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
            <h2 className="text-2xl md:text-4xl lg:text-5xl mb-3 md:mb-4 px-4">
              Specialized <span className="text-accent">Expertise</span>
            </h2>
            <p className="text-sm md:text-lg lg:text-xl text-foreground/70 max-w-2xl mx-auto px-4">
              Tailored marketing strategies for every legal specialization
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
            {practiceAreas.map((area, index) => (
              <motion.div
                key={area.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                whileHover={{
                  y: -5,
                  scale: 1.02,
                  boxShadow: "0 10px 20px rgba(201, 169, 97, 0.2)",
                  transition: { duration: 0.3 }
                }}
                className="group relative bg-card border border-border rounded-sm p-4 md:p-8 hover:border-accent transition-all cursor-pointer overflow-hidden"
              >
                {/* Animated shimmer effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />

                <div className="flex flex-col md:flex-row items-center md:items-start md:gap-4 relative z-10 text-center md:text-left">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="p-2 md:p-3 bg-accent/10 rounded-sm group-hover:bg-accent/20 transition-colors mb-2 md:mb-0"
                  >
                    <area.icon className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-[10px] md:text-lg leading-tight md:mb-2">{area.name}</h3>
                    <motion.div
                      initial={{ width: 0 }}
                      whileHover={{ width: "3rem" }}
                      className="h-0.5 bg-accent hidden md:block"
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Corner accent - hidden on mobile to save space */}
                <div className="absolute top-0 right-0 w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-accent" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1548950308-69fac3b90a45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBvZmZpY2UlMjBidWlsZGluZyUyMG1vZGVybiUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzYwNjUzNzF8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Modern architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />

          {/* Animated overlay pattern */}
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundImage: [
                "linear-gradient(45deg, rgba(201, 169, 97, 0.1) 25%, transparent 25%, transparent 75%, rgba(201, 169, 97, 0.1) 75%)",
                "linear-gradient(45deg, transparent 25%, rgba(201, 169, 97, 0.1) 25%, rgba(201, 169, 97, 0.1) 75%, transparent 75%)",
              ],
              backgroundPosition: ["0px 0px", "60px 60px"],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto px-6 text-center"
        >
          {/* Floating sparkles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
              }}
            >
              <Sparkles className="w-6 h-6 text-accent" />
            </motion.div>
          ))}

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl mb-6"
          >
            Ready to Lead Your <span className="text-accent">Market?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-foreground/80 mb-10 leading-relaxed"
          >
            Join Malaysia's leading law firms in establishing a commanding digital presence. Schedule your strategic consultation today.
          </motion.p>
            <div className="flex flex-col gap-4">
              <a
                href="https://cal.com/zen-pdcnlc/lawyer-marketing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 60px rgba(201, 169, 97, 0.6)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-12 py-5 bg-accent text-accent-foreground rounded-sm text-lg flex items-center justify-center gap-3 mx-auto group"
                >
                  Schedule Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </a>

              <a
                href={`https://wa.me/60175032281?text=${encodeURIComponent("Hello, I'd like to discuss marketing for my law firm.")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(34, 197, 94, 0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-12 py-5 border-2 border-green-500 text-green-500 rounded-sm text-lg flex items-center justify-center gap-3 mx-auto group transition-colors"
                >
                  <MessageCircle className="w-6 h-6" />
                  Whatsup Us
                </motion.button>
              </a>
            </div>

        </motion.div>
      </section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12 relative overflow-hidden">
        {/* Subtle animated gradient */}
        <motion.div
          className="absolute inset-0 opacity-10"
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
                <motion.img
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  src={logoImage}
                  alt="LawyerMarketing.my"
                  className="h-10 md:h-16 w-auto block shrink-0"
                />
                <div className="text-base md:text-lg font-light tracking-[0.1em] text-accent uppercase">
                  LawyerMarketing.my
                </div>
              </div>
              <p className="text-foreground/70 max-w-xs">
                Malaysia's premier marketing agency specializing in digital growth for the legal sector.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-xl font-medium mb-4">Services</h3>
              <ul className="space-y-2 text-foreground/70">
                {["Social Media Management", "Content Marketing", "Brand Development", "Compliance Consulting"].map((service, i) => (
                  <motion.li
                    key={service}
                    whileHover={{ x: 5, color: "rgba(201, 169, 97, 1)" }}
                    className="cursor-pointer transition-colors"
                  >
                    {service}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-medium mb-4">Contact</h3>
              <ul className="space-y-2 text-foreground/70">
                <motion.li whileHover={{ x: 5, color: "rgba(201, 169, 97, 1)" }} className="cursor-pointer transition-colors">
                  jacob@lawyermarketing.my
                </motion.li>
                <motion.li whileHover={{ x: 5, color: "rgba(201, 169, 97, 1)" }} className="cursor-pointer">
                  Kuala Lumpur, Malaysia
                </motion.li>
              </ul>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center pt-8 border-t border-border text-foreground/60"
          >
            <p>┬⌐ 2026 LawyerMarketing.my. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
