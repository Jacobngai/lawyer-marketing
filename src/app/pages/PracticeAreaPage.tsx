import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { pillars } from "../data/pillars";
import { ArrowLeft, Shield, Scale, Clock, ChevronRight } from "lucide-react";

export function PracticeAreaPage() {
  const { id } = useParams();
  const pillar = pillars.find(p => p.id === id);

  if (!pillar) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl mb-6">Practice Area Not Found</h1>
          <Link to="/" className="text-accent hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={pillar.image} 
            alt={pillar.title} 
            className="w-full h-full object-cover opacity-50" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background to-background" />
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-block px-4 py-1.5 bg-accent/20 border border-accent/40 rounded-full text-accent text-[10px] uppercase tracking-[0.3em] font-bold mb-8">
              Practice Area Dominance
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight mb-10">
              {pillar.title.split(' ')[0]} <span className="italic font-serif text-accent">{pillar.title.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 font-light leading-relaxed mb-12 max-w-2xl italic">
              "{pillar.subtitle}"
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {pillar.stats.map((stat, index) => (
                <div key={index} className="border-l border-accent/30 pl-6">
                  <div className="text-2xl md:text-3xl font-light text-white mb-1">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-accent font-bold opacity-70">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-32 container mx-auto px-6 border-t border-border/50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-8">
            <article 
              className="prose prose-invert prose-accent max-w-none prose-p:text-xl prose-p:leading-loose prose-h3:text-2xl prose-h3:italic prose-h3:font-light prose-h3:text-accent prose-h3:mt-16"
              dangerouslySetInnerHTML={{ __html: pillar.content }}
            />
          </div>

          <div className="lg:col-span-4 sticky top-32">
            <div className="bg-card border border-border p-10 rounded-lg shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-accent/10 transition-colors" />
              
              <h3 className="text-2xl font-light mb-8 italic">The Founder's Beta</h3>
              <p className="text-foreground/70 mb-10 leading-relaxed italic">
                We are selecting 5 Malaysian firms to join our 2026 Founder's Program. Scale your {pillar.id.replace('-', ' ')} cases with zero upfront management fees.
              </p>

              <Link to="/contact">
                <button className="w-full py-5 bg-accent text-accent-foreground flex items-center justify-center gap-3 group transition-all hover:gap-5">
                  <span className="uppercase tracking-[0.2em] text-[10px] font-black">Secure Your Territory</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </Link>
              
              <div className="mt-8 flex items-center justify-between text-[10px] uppercase tracking-widest text-foreground/40 font-bold">
                <span>Direct Access</span>
                <span className="text-accent">Locked</span>
              </div>
            </div>

            <div className="mt-12 space-y-6">
              <div className="flex gap-4 items-center p-4 border border-border/40 rounded-lg grayscale hover:grayscale-0 transition-all">
                <Shield className="w-6 h-6 text-accent" />
                <span className="text-xs uppercase tracking-widest font-light">Bar Council Safe</span>
              </div>
              <div className="flex gap-4 items-center p-4 border border-border/40 rounded-lg grayscale hover:grayscale-0 transition-all">
                <Scale className="w-6 h-6 text-accent" />
                <span className="text-xs uppercase tracking-widest font-light">Ethical Acquisition</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
