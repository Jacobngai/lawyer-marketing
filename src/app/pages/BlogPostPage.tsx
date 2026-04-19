import { motion } from "motion/react";
import { ArrowLeft, MessageCircle, Share2, Printer, ChevronRight, CheckCircle2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export function BlogPostPage() {
  const { id } = useParams();

  return (
    <div className="pt-24 min-h-screen bg-background">
      <section className="max-w-4xl mx-auto px-6 py-16">
        <Link to="/blog">
          <motion.button
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-foreground/50 hover:text-accent transition-colors mb-12 uppercase tracking-widest text-xs"
          >
            <ArrowLeft className="w-4 h-4" /> Back to library
          </motion.button>
        </Link>

        {/* Post Metadata */}
        <div className="flex items-center gap-3 text-accent mb-6">
          <span className="px-3 py-1 bg-accent/10 border border-accent rounded-sm text-xs uppercase tracking-widest">AOP Strategy</span>
          <span className="text-foreground/30">•</span>
          <span className="text-foreground/50 text-xs">8 MIN READ</span>
        </div>

        <h1 className="text-4xl md:text-6xl mb-8 leading-tight font-light">
          Becoming an <span className="text-accent">AI-Cited Authority</span>: The Future of Legal Marketing
        </h1>

        <div className="flex items-center justify-between pb-8 border-b border-border mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent flex items-center justify-center font-serif text-accent italic">
              JN
            </div>
            <div>
              <div className="text-sm">Jacob Ngai</div>
              <div className="text-xs text-foreground/50 italic">Strategic Director</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:text-accent transition-colors"><Share2 className="w-5 h-5" /></button>
            <button className="p-2 hover:text-accent transition-colors"><Printer className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Post Content */}
        <article className="prose prose-invert prose-accent max-w-none">
          <div className="bg-secondary/30 border-l-4 border-accent p-8 mb-12 italic text-lg leading-relaxed rounded-r-md">
            "By 2026, over 40% of legal inquiries in Malaysia will start with an AI agent. Firms that aren't optimized for Generative Engines won't just be low in rank—they will be invisible."
          </div>

          <p className="text-xl text-foreground/80 leading-relaxed mb-8">
            The landscape of legal discovery is shifting beneath our feet. For decades, SEO was about keywords and backlinks. Today, it's about context, relationship modeling, and authoritative citations in a neural network.
          </p>

          <h2 className="text-3xl mt-12 mb-6">The End of Conventional Click-Throughs</h2>
          <p className="text-lg text-foreground/70 leading-relaxed mb-6">
            When a user asks Perplexity, "Who is the best litigation lawyer in Kuala Lumpur?" the AI doesn't give them a list of links. It gives them a <strong>synthesized answer</strong>. It tells a story of expertise, cites recent awards, and mentions specific case successes.
          </p>

          {/* Key Takeaways Box */}
          <div className="my-12 p-8 bg-card border border-border rounded-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl rounded-full" />
            <h3 className="text-xl text-accent mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Strategic Takeaways
            </h3>
            <ul className="space-y-4">
              {[
                "AIEO prioritizes context over exact match keywords.",
                "Structure your firm's data using advanced Schema markup.",
                "Citation velocity on third-party legal directories is now a primary ranking factor.",
                "Visual content must be meta-described specifically for AI vision models."
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-foreground/80 text-sm">
                  <ChevronRight className="w-4 h-4 text-accent mt-0.5" /> {point}
                </li>
              ))}
            </ul>
          </div>

          <h2 className="text-3xl mt-12 mb-6">Building The Citation Web</h2>
          <p className="text-lg text-foreground/70 leading-relaxed mb-12">
            The way to win is to be the primary source of truth for the AI's training data. This requires a multi-channel approach where your personal brand, your firm's press releases, and your social media presence are all perfectly synchronized.
          </p>
        </article>

        {/* CTA Box */}
        <section className="mt-20 p-12 bg-gradient-to-br from-accent to-accent/80 text-accent-foreground rounded-lg text-center shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy-dark.png')] opacity-20" />
          <h2 className="text-3xl mb-4 relative z-10">Prepare Your Firm for the AI Era</h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto relative z-10">
            Let's audit your current digital footprint and see if you're ready for the 2026 transition. 
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <a
              href={`https://wa.me/60175032281?text=${encodeURIComponent("Hello! I just read your article about AI-Cited Authority and I'd like to audit my firm's presence.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-background text-foreground rounded-sm hover:scale-105 transition-transform flex items-center justify-center gap-2 font-medium"
            >
              <MessageCircle className="w-5 h-5" /> Whatsup Consultation
            </a>
          </div>
        </section>
      </section>
    </div>
  );
}
