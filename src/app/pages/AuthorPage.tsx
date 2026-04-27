import { motion } from "motion/react";
import { ArrowLeft, Mail, Linkedin, Twitter, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "../data/posts";
import { SEO } from "../components/SEO";

export function AuthorPage() {
  const authorPosts = blogPosts.filter(post => post.author === "Jacob Ng");

  return (
    <div className="pt-24 min-h-screen bg-background text-foreground">
      <SEO 
        title="Jacob Ng | Legal Marketing Strategist"
        description="Read the latest insights and high-conversion legal marketing strategies written by Jacob Ng."
        canonical="https://lawyermarketing.my/author/jacob-ng"
      />

      <div className="max-w-5xl mx-auto px-6 mb-12">
        <Link to="/blog">
          <motion.button
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-foreground/70 hover:text-accent transition-colors uppercase tracking-widest text-[10px]"
          >
            <ArrowLeft className="w-3 h-3" /> Back to library
          </motion.button>
        </Link>
      </div>

      <section className="max-w-5xl mx-auto px-6 pb-24">
        {/* Author Profile Header */}
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-12 items-start mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[3/4] w-full relative overflow-hidden rounded-sm border border-border bg-zinc-900 group">
              <img 
                src="/images/jacob-headshot.jpg" 
                alt="Jacob Ng" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => { 
                  e.currentTarget.style.display = 'none'; 
                  e.currentTarget.parentElement!.innerHTML = '<div class="absolute inset-0 flex items-center justify-center font-serif text-6xl text-accent/30 italic">JN</div>'; 
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent" />
            </div>
            {/* Social Links under photo */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <a href="mailto:jacob@lawyermarketing.my" className="p-3 bg-card border border-border rounded-sm hover:border-accent hover:text-accent transition-colors">
                <Mail className="w-4 h-4" />
              </a>
              <a href="#" className="p-3 bg-card border border-border rounded-sm hover:border-accent hover:text-accent transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-3 bg-card border border-border rounded-sm hover:border-accent hover:text-accent transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="pt-4"
          >
            <div className="text-accent text-xs uppercase tracking-[0.3em] font-medium mb-4">Director of Result Marketing Sdn Bhd</div>
            <h1 className="text-5xl md:text-6xl font-light mb-8">Jacob Ng</h1>
            <div className="prose prose-invert prose-p:text-lg prose-p:text-foreground/80 prose-p:leading-relaxed max-w-none mb-8">
              <p>
                Based in Klang Valley, Jacob Ng is the Director of <strong>Result Marketing Sdn Bhd</strong>, a technology-driven firm dedicated to high-performance client acquisition and the culture of <strong>Preeminence</strong>.
              </p>
              <p>
                Jacob's journey in digital commerce began at age 19, where he successfully scaled a boot-strapped e-commerce venture on Lelong.my to RM30,000 in monthly revenue. This early success laid the foundation for a career defined by high-stakes advertising and measurable ROI. Since then, he has managed over RM100,000 in ad spend during the MCO era and famously transformed a small RM50 experimental budget into a RM36,000 monthly revenue stream—achieving a consistent 10x ROAS for his clients.
              </p>
              <p>
                Previously serving as a **VP International for the Millionaire Mastermind Club (MMC)**—an elite RM30,000 entrepreneur networking and mentoring platform in Malaysia—Jacob leverages his deep connections and high-level strategy to move law firms beyond traditional marketing. He doesn't just build sites; he engineers result-oriented ecosystems for the next generation of legal leaders.
              </p>
            </div>

            <div className="flex items-center gap-3 text-sm text-foreground/50 uppercase tracking-widest border-t border-border pt-8">
              <FileText className="w-4 h-4 text-accent" />
              <span>{authorPosts.length} Published Articles</span>
            </div>
          </motion.div>
        </div>

        {/* Read Author's Articles */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-light">Latest Insights</h2>
            <div className="h-px bg-border flex-grow mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {authorPosts.map((post, index) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group h-full flex flex-col"
              >
                <Link to={`/blog/${post.id}`} className="block h-full border border-border bg-card/30 hover:border-accent/50 transition-all duration-300 rounded-sm overflow-hidden flex flex-col hover:shadow-[0_0_30px_rgba(212,175,55,0.05)]">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-widest text-white rounded-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <p className="text-[10px] text-foreground/50 uppercase tracking-widest mb-3">{post.date}</p>
                    <h3 className="text-xl leading-snug mb-3 group-hover:text-accent transition-colors font-light">
                      {post.title}
                    </h3>
                    <p className="text-sm text-foreground/60 line-clamp-3 mb-6 flex-grow">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-accent text-xs uppercase tracking-widest font-medium mt-auto group-hover:translate-x-2 transition-transform">
                      Read Blueprint <span className="ml-2">→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
