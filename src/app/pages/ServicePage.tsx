import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { services } from "../data/services";
import { ArrowLeft, CheckCircle2, MessageCircle, Zap, Shield, BarChart, Sparkles, Star, ChevronRight, ArrowRight } from "lucide-react";

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-accent/30 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
          }}
          animate={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
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

export function ServicePage() {
  const { id } = useParams();
  const service = services.find(s => s.id === id);

  if (!service) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl mb-6">Service Not Found</h1>
          <Link to="/" className="text-accent hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  // Define Layout Types
  const isLanding = service.layoutType === "landing";

  if (isLanding) {
    return (
      <div className="pt-20 min-h-screen bg-background text-foreground selection:bg-accent/30 lowercase-headings relative overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(201, 169, 97, 0.3) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(201, 169, 97, 0.3) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>
        <div className="hidden md:block">
          <FloatingParticles />
        </div>

        {/* Landing Hero */}
        <section className="container mx-auto px-6 py-24 md:py-40 text-center max-w-5xl relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/20 border border-accent/40 rounded-full"
              >
                <Star className="w-3 h-3 text-accent fill-accent animate-pulse" />
                <span className="text-accent uppercase tracking-[0.3em] text-[8px] font-black">
                  Performance Driven Infrastructure
                </span>
              </motion.div>
            </div>
            
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-light leading-[0.9] tracking-tight mb-12 italic">
              {service.title.split(' ').map((word, i) => (
                <span key={i}>
                  {word.toLowerCase() === 'web' || word.toLowerCase() === 'seo' || word.toLowerCase() === 'ai' || word.toLowerCase() === 'ads' || word.toLowerCase() === 'google' || word.toLowerCase() === 'meta' || word.toLowerCase() === 'social' ? (
                    <motion.span 
                      className="font-serif text-accent"
                      animate={{
                        textShadow: [
                          "0 0 20px rgba(201, 169, 97, 0.1)",
                          "0 0 40px rgba(201, 169, 97, 0.4)",
                          "0 0 20px rgba(201, 169, 97, 0.1)",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {word}{" "}
                    </motion.span>
                  ) : (
                    <span>{word}{" "}</span>
                  )}
                </span>
              ))}
            </h1>
            <p className="text-xl md:text-2xl text-foreground/60 max-w-3xl mx-auto leading-relaxed mb-16">
              {service.description}
            </p>
            <Link to="/contact">
              <button className="px-12 py-5 bg-accent text-accent-foreground uppercase tracking-widest text-xs font-bold hover:scale-105 transition-transform rounded-sm shadow-2xl">
                Request a Blueprint
              </button>
            </Link>
          </motion.div>
        </section>

        {/* Feature Sections - Focused Middle */}
        <section className="py-24 bg-card/30 border-y border-border relative overflow-hidden">
          {/* Floating orbs */}
          <motion.div
            className="absolute top-1/4 -left-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl"
            animate={{
              y: [0, 50, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-light mb-24 italic">Our Partnership Philosophy</h2>
            
            <div className="space-y-32">
              {[
                {
                  index: "01",
                  title: "Your Speed as a Weapon",
                  desc: "We'll ensure your site is optimized for core web vitals, giving you the sub-second load times that keep your prospects engaged instead of bouncing."
                },
                {
                  index: "02",
                  title: "Your Conversion Psychology",
                  desc: "Together, we'll place every pixel to guide your prospects toward authority signals and CTAs, utilizing proven intake patterns to maximize your lead volume."
                },
                {
                  index: "03",
                  title: "Your Compliance Guaranteed",
                  desc: "We'll navigate the complexities of the Legal Profession Rules together, ensuring your presence is powerful without compromising your professional standing."
                }
              ].map((item) => (
                <div key={item.index} className="group">
                  <div className="text-accent font-serif text-6xl md:text-8xl mb-6 opacity-30 group-hover:opacity-100 transition-opacity duration-500 italic">
                    {item.index}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-light mb-6 uppercase tracking-wider">{item.title}</h3>
                  <p className="text-lg md:text-xl text-foreground/60 leading-relaxed max-w-2xl mx-auto">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 text-center container mx-auto px-6 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-10 pointer-events-none"
            animate={{
              backgroundImage: [
                "linear-gradient(45deg, rgba(201, 169, 97, 0.1) 25%, transparent 25%, transparent 75%, rgba(201, 169, 97, 0.1) 75%)",
                "linear-gradient(45deg, transparent 25%, rgba(201, 169, 97, 0.1) 25%, rgba(201, 169, 97, 0.1) 75%, transparent 75%)",
              ],
              backgroundPosition: ["0px 0px", "60px 60px"],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "60px 60px" }}
          />

          <div className="max-w-3xl mx-auto p-12 border border-accent/20 bg-accent/5 rounded-lg backdrop-blur-sm relative z-10">
            <h2 className="text-4xl md:text-5xl font-light mb-8 italic">Secure Your Digital Territory</h2>
            <p className="text-lg text-foreground/70 mb-12">
              Our 2026 Founder's Program is currently reviewing 5 elite Malaysian firms for exclusive market dominance. Together, we'll build your legacy.
            </p>
            <Link to="/contact">
              <button className="px-10 py-4 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] hover:bg-accent hover:text-white transition-colors flex items-center justify-center gap-3 mx-auto group">
                Apply for Beta Program
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  // Standard Sidebar Layout (Default)
  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <img 
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover opacity-40 grayscale-[0.5]" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 text-accent mb-6 uppercase tracking-[0.3em] text-[10px] font-bold">
              <Zap className="w-3 h-3" /> Digital Marketing Solution
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-8">
              {service.title}
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed max-w-2xl">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-3xl font-light mb-8 italic">Your Strategic Advantage</h2>
              <p className="text-lg text-foreground/70 leading-relaxed mb-6">
                In today's legal landscape, your visibility is the foundation of your firm's growth. Our partnership approach to {service.title} is clinical, data-driven, and focused exclusively on your client acquisition.
              </p>
              <p className="text-lg text-foreground/70 leading-relaxed">
                We'll work together to engineer your authority. Every touchpoint we create is optimized to reflect your firm's prestige while maximizing the conversion rate of your qualified prospects.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10">
              <div className="p-8 bg-card/50 border border-border rounded-lg">
                <Shield className="w-10 h-10 text-accent mb-6" />
                <h3 className="text-xl mb-4 font-medium italic">Bar Council Compliance</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  Every asset is reviewed against the Legal Profession (Publicity) Rules 2001 to ensure your firm maintains its professional standing while scaling.
                </p>
              </div>
              <div className="p-8 bg-card/50 border border-border rounded-lg">
                <BarChart className="w-10 h-10 text-accent mb-6" />
                <h3 className="text-xl mb-4 font-medium italic">Performance Mapping</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  Granular tracking of lead quality, ensuring your budget is allocated toward the case types that drive your firm's profitability.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: CTA Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-accent/10 border border-accent/20 p-8 rounded-lg backdrop-blur-md">
              <h3 className="text-2xl font-light mb-6 italic text-accent">Ready to Scale?</h3>
              <ul className="space-y-4 mb-8">
                {[
                  "Market-specific targeting",
                  "Dedicated strategist",
                  "Direct WhatsApp routing",
                  "Full transparency reporting"
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-foreground/80">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              
              <Link to="/contact">
                <button className="w-full py-4 bg-accent text-accent-foreground font-bold uppercase tracking-widest text-xs hover:scale-[1.02] transition-transform rounded-sm shadow-xl">
                  Request Strategic Audit
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
