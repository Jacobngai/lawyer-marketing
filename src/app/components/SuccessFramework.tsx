import { motion } from "motion/react";
import { MessageSquare, Search, FileText, TrendingUp, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Initial call and fit-finding",
    description: "We’ll talk about your needs and make sure we’re a mutual fit for your firm's growth.",
    color: "from-blue-500/20 to-blue-600/20"
  },
  {
    icon: Search,
    title: "SEO discovery consult",
    description: "Together, we’ll build out a strategy that considers your site’s current issues, assets and competitors. We'll set your ROI targets.",
    color: "from-accent/20 to-accent/40"
  },
  {
    icon: FileText,
    title: "Customized proposal",
    description: "We’ll send you a proposal clearly outlining our fees and detailing exactly how we'll capture your market.",
    color: "from-purple-500/20 to-purple-600/20"
  },
  {
    icon: TrendingUp,
    title: "Execution and ROI",
    description: "Every month, we work relentlessly to earn your trust by communicating clearly and driving your measurable returns.",
    color: "from-emerald-500/20 to-emerald-600/20"
  }
];

export function SuccessFramework() {
  return (
    <section className="py-24 md:py-32 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-light italic mb-6">What to expect when<br/><span className="text-accent font-serif tracking-tight">you work with us</span></h2>
          <p className="text-lg text-foreground/40 max-w-2xl mx-auto">
            We never leave your firm's growth to chance. We follow a clinical, performance-driven process to ensure your territory is secured.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group p-8 bg-[#0a0a0a] border border-white/5 rounded-sm hover:border-accent/40 transition-all"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-accent/10 border border-accent/20 rounded-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <step.icon className="w-6 h-6 text-accent" />
                </div>
                
                <div className="text-4xl font-serif text-white/5 absolute top-4 right-4 italic group-hover:text-accent/10">
                  0{index + 1}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">{step.title}</h3>
                <p className="text-sm text-foreground/50 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-4 p-1 px-6 bg-accent/5 border border-accent/20 rounded-full text-[10px] uppercase tracking-[0.3em] font-black text-accent mb-8">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                Live: Founder's Beta Program 2026
            </div>
        </div>
      </div>
    </section>
  );
}
