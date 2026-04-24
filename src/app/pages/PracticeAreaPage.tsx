import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { pillars } from "../data/pillars";
import { ArrowLeft, Shield, Scale, Clock, ChevronRight, Star } from "lucide-react";
import { SEO } from "../components/SEO";

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
    <div className="pt-[60px] md:pt-[80px] min-h-screen bg-background text-foreground lowercase-headings selection:bg-accent/30">
      <SEO 
        title={`${pillar.title} Marketing Strategy | Law Firm Growth Malaysia`}
        description={`Professional marketing strategy for ${pillar.title.toLowerCase()} lawyers in Malaysia. Scale your practice area and dominate your territory with our elite growth engine.`}
      />
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="max-w-4xl z-10"
        >
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full">
              <Star className="w-3 h-3 text-accent fill-accent" />
              <span className="text-accent uppercase tracking-[0.4em] text-[8px] font-black">
                We Scale Your Territory
              </span>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-8 leading-[0.9]">
            {pillar.title.split(' ')[0]} <span className="italic font-serif text-accent">{pillar.title.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/50 max-w-2xl mx-auto leading-relaxed italic">
            Get an elite {pillar.title.toLowerCase()} strategy that positions your firm as the undisputed authority. We engineer every step to capture and convert.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-16 pt-12 border-t border-white/5">
            {pillar.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-serif text-accent mb-2">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Background layer */}
        <div className="absolute inset-0 opacity-40 grayscale pointer-events-none">
          <img src={pillar.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black" />
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-32 bg-[#0a0a0a] relative border-y border-white/5 overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
            <div className="lg:col-span-1">
               <span className="text-4xl md:text-6xl font-serif text-white/5 italic">§</span>
            </div>
            <div className="lg:col-span-7">
              <article 
                className="prose prose-invert prose-accent max-w-none 
                prose-p:text-xl prose-p:leading-loose prose-p:text-foreground/70
                prose-h3:text-3xl md:prose-h3:text-5xl prose-h3:italic prose-h3:font-light prose-h3:text-accent prose-h3:mt-24 prose-h3:mb-10"
                dangerouslySetInnerHTML={{ __html: pillar.content }}
              />
            </div>

            <div className="lg:col-span-4 sticky top-32">
              <div className="bg-black/50 backdrop-blur-3xl border border-accent/20 p-10 md:p-12 rounded-sm shadow-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] pointer-events-none" />
                
                <h3 className="text-3xl md:text-4xl font-light mb-8 italic mb-10">We Know If We're a Fit</h3>
                <p className="text-lg text-foreground/60 mb-12 leading-relaxed">
                  We are selecting only 5 Malaysian firms to join our Founder's Program. Scale your {pillar.title.split(' ')[0]} practice area with our elite performance engine.
                </p>

                <Link to="/contact">
                  <button className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] hover:bg-accent hover:text-white transition-all transform hover:scale-105 shadow-[0_0_60px_rgba(201,169,97,0.2)]">
                    Secure Your Territory
                    <ChevronRight className="w-4 h-4 inline-block ml-2" />
                  </button>
                </Link>
                
                <div className="mt-12 flex items-center justify-between text-[10px] uppercase tracking-[0.4em] text-foreground/30 font-black">
                  <span>Priority Access</span>
                  <span className="text-accent animate-pulse">Locked</span>
                </div>
              </div>

              <div className="mt-16 space-y-4">
                {[
                  { icon: Shield, label: 'Bar Council Compliance' },
                  { icon: Scale, label: 'Ethical Case Acquisition' },
                  { icon: Clock, label: 'Market Priority 2026' }
                ].map(item => (
                  <div key={item.label} className="flex gap-4 items-center p-6 border border-white/5 bg-accent/5 rounded-sm grayscale hover:grayscale-0 transition-all">
                    <item.icon className="w-5 h-5 text-accent" />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-black text-foreground/40">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
