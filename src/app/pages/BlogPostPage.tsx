import { motion } from "motion/react";
import { ArrowLeft, MessageCircle, Share2, Printer, ChevronRight, CheckCircle2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { blogPosts } from "../data/posts";

import { SEO } from "../components/SEO";

export function BlogPostPage() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl mb-6">Article Not Found</h1>
          <Link to="/blog" className="text-accent hover:underline">Return to Library</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-background">
      <SEO 
        title={`${post.title} | Lawyer Growth Insights`}
        description={post.excerpt}
        canonical={`https://lawyermarketing.my/blog/${post.id}`}
      />
      {/* Article Hero Image */}
      <section className="relative h-[40vh] md:h-[60vh] min-h-[400px] w-full overflow-hidden bg-zinc-900">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 w-full h-full"
        >
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </motion.div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-24 relative -mt-32 z-10">
        <Link to="/blog">
          <motion.button
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-white bg-black/40 backdrop-blur-md px-4 py-2 rounded-full hover:text-accent transition-colors mb-8 uppercase tracking-widest text-[10px]"
          >
            <ArrowLeft className="w-3 h-3" /> Back to library
          </motion.button>
        </Link>

        {/* Post Metadata Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card/80 backdrop-blur-xl border border-border p-8 md:p-12 rounded-lg shadow-2xl mb-12"
        >
          <div className="flex items-center gap-3 text-accent mb-6">
            <span className="px-3 py-1 bg-accent/10 border border-accent rounded-sm text-xs uppercase tracking-widest font-medium">{post.category}</span>
            <span className="text-foreground/30">•</span>
            <span className="text-foreground/50 text-xs uppercase tracking-widest">{post.readingTime}</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl mb-8 leading-tight font-light">
            {post.title}
          </h1>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent flex items-center justify-center font-serif text-accent italic text-sm">
                JN
              </div>
              <div>
                <div className="text-sm font-medium">{post.author}</div>
                <div className="text-[10px] text-foreground/50 uppercase tracking-wider">{post.date}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:text-accent transition-colors text-foreground/50"><Share2 className="w-4 h-4" /></button>
              <button className="p-2 hover:text-accent transition-colors text-foreground/50"><Printer className="w-4 h-4" /></button>
            </div>
          </div>
        </motion.div>

        {/* Post Content */}
        <article 
          className="prose prose-invert prose-accent max-w-none prose-p:text-lg prose-p:leading-relaxed prose-headings:font-light prose-blockquote:border-accent prose-blockquote:bg-accent/5 prose-blockquote:py-1 prose-blockquote:rounded-r-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Dynamic CTA Box */}
        <section className="mt-20 p-8 md:p-12 bg-gradient-to-br from-accent to-accent/80 text-accent-foreground rounded-lg text-center shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy-dark.png')] opacity-20" />
          <h2 className="text-3xl md:text-4xl mb-4 relative z-10 font-light italic">Dominate Your Market</h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto relative z-10">
            Let's discuss how to apply these strategies specifically to your practice area.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <a
              href={`https://wa.me/60175032281?text=${encodeURIComponent(`Hello! I just read your article "${post.title}" and I'd like to discuss how this applies to my firm.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-background text-foreground rounded-sm hover:scale-105 transition-transform flex items-center justify-center gap-2 font-medium shadow-xl"
            >
              <MessageCircle className="w-5 h-5" /> Inquire on WhatsApp
            </a>
          </div>
        </section>

        {/* Read Next Section Placeholder */}
        <div className="mt-20 pt-10 border-t border-border">
          <h3 className="text-sm uppercase tracking-[0.3em] text-accent mb-8">Continue Reading</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.filter(p => p.id !== id).slice(0, 2).map(nextPost => (
              <Link key={nextPost.id} to={`/blog/${nextPost.id}`} className="group block">
                <div className="text-xs text-accent mb-2 uppercase tracking-widest">{nextPost.category}</div>
                <h4 className="text-xl group-hover:text-accent transition-colors leading-snug">{nextPost.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
