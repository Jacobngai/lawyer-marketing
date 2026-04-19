import { motion } from "motion/react";
import { Sparkles, ArrowRight, Calendar, User, Tag, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "The 2026 Malaysian Legal Publicity Rules: A Definitive Guide",
    excerpt: "Everything you need to know about the Bar Council's landmark decision on digital advertising and social media presence.",
    category: "Compliance",
    date: "Jan 15, 2026",
    author: "Jacob Ngai",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Becoming an AI-Cited Authority: The Rise of AIEO & GEO",
    excerpt: "Why the classic SEO playbook is dead, and how to optimize your firm for Perplexity, ChatGPT, and AI Search Engines.",
    category: "AI Marketing",
    date: "Jan 12, 2026",
    author: "Jacob Ngai",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "High-Ticket Personal Branding for Litigation Partners",
    excerpt: "From professional photography to LinkedIn thought leadership—how to build a name that commands premium fees.",
    category: "Branding",
    date: "Jan 10, 2026",
    author: "Jacob Ngai",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
  }
];

export function BlogPage() {
  return (
    <div className="pt-24 min-h-screen bg-background">
      {/* Blog Header */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background" />
        <div className="max-w-7xl mx-auto px-6 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="text-accent tracking-widest uppercase text-sm">Lawyer Growth Insights</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl mb-6 font-light"
          >
            The <span className="text-accent italic">Library</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed"
          >
            Strategic intelligence on legal marketing, compliance, and AI-driven growth for top-tier Malaysian firms.
          </motion.p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="group relative bg-card/50 border border-border rounded-lg overflow-hidden flex flex-col lg:flex-row hover:border-accent transition-all"
        >
          <div className="lg:w-1/2 overflow-hidden h-64 lg:h-auto">
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
              src={blogPosts[0].image}
              alt={blogPosts[0].title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 lg:p-12 lg:w-1/2 flex flex-col justify-center">
            <div className="flex items-center gap-4 text-accent text-sm mb-6 uppercase tracking-widest">
              <span className="px-3 py-1 bg-accent/10 border border-accent rounded-sm">{blogPosts[0].category}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {blogPosts[0].date}</span>
            </div>
            <h2 className="text-3xl md:text-4xl mb-6 leading-tight group-hover:text-accent transition-colors">
              {blogPosts[0].title}
            </h2>
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              {blogPosts[0].excerpt}
            </p>
            <Link to={`/blog/${blogPosts[0].id}`}>
              <motion.button
                whileHover={{ x: 10 }}
                className="flex items-center gap-2 text-accent font-medium uppercase tracking-[0.2em] text-sm"
              >
                Read Featured Article <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card/30 border border-border p-6 rounded-lg hover:border-accent transition-all cursor-pointer"
            >
              <div className="aspect-video overflow-hidden rounded-sm mb-6">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center gap-3 text-accent text-xs mb-4 uppercase tracking-widest">
                <Tag className="w-3 h-3" /> {post.category}
              </div>
              <h3 className="text-xl mb-4 group-hover:text-accent transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="text-foreground/60 text-sm mb-6 line-clamp-2">
                {post.excerpt}
              </p>
              <Link to={`/blog/${post.id}`}>
                <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-4 transition-all">
                  Read Article <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
