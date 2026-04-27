import { motion } from "motion/react";
import { ArrowLeft, MessageCircle, Share2, Printer, BookOpen } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { tutorials } from "../data/tutorials";
import { SEO } from "../components/SEO";

export function TutorialPage() {
  const { id } = useParams();
  const tutorial = tutorials.find(t => t.id === id);

  if (!tutorial) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl mb-6">Tutorial Not Found</h1>
          <Link to="/" className="text-accent hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-background">
      <SEO 
        title={`${tutorial.title} | Lawyer Marketing SEO Guide`}
        description={tutorial.excerpt}
        canonical={`https://lawyermarketing.my/tutorials/${tutorial.id}`}
      />
      
      {/* Hero Section */}
      <section className="relative h-[30vh] md:h-[40vh] min-h-[300px] w-full overflow-hidden bg-zinc-900 border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/20 via-background to-background" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            <span className="text-accent text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold mb-4 drop-shadow-md">
              Complete Legal SEO Guide 2026
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl text-center max-w-4xl leading-tight font-light text-white drop-shadow-lg">
              {tutorial.title}
            </h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24 grid lg:grid-cols-12 gap-12 relative pt-12">
        
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-4 xl:col-span-3 order-last lg:order-first">
          <div className="sticky top-32 bg-card/50 border border-border/50 p-6 rounded-lg">
            <div className="flex items-center gap-3 text-accent mb-6">
                <BookOpen className="w-5 h-5" />
                <h3 className="uppercase tracking-widest text-xs font-bold">SEO Modules</h3>
            </div>
            <nav className="space-y-1">
              {tutorials.map((t) => (
                <Link
                  key={t.id}
                  to={`/tutorials/${t.id}`}
                  className={`block px-4 py-3 rounded-sm text-sm transition-colors border-l-2 ${
                    id === t.id 
                      ? "border-accent bg-accent/10 text-white font-medium" 
                      : "border-transparent text-foreground/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {t.title}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <div className="lg:col-span-8 xl:col-span-9">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-card/30 border border-border/40 p-8 md:p-12 rounded-lg"
          >
            <div className="flex items-center justify-between mb-12 pb-6 border-b border-border/50">
              <Link to="/author/jacob-ng" className="flex items-center gap-3 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent flex items-center justify-center font-serif text-accent italic text-sm shadow-[0_0_15px_rgba(201,169,97,0.3)] group-hover:bg-accent/40 transition-colors overflow-hidden">
                  <img src="/images/jacob-headshot.jpg" alt="Jacob Ng" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = 'JN'; }} />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground/90 group-hover:text-accent transition-colors">Jacob Ng</div>
                  <div className="text-[10px] text-accent uppercase tracking-wider">{tutorial.readingTime}</div>
                </div>
              </Link>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:text-accent transition-colors text-foreground/50"><Share2 className="w-4 h-4" /></button>
                <button className="p-2 hover:text-accent transition-colors text-foreground/50"><Printer className="w-4 h-4" /></button>
              </div>
            </div>

            <article 
              className="prose prose-invert prose-accent max-w-none prose-p:text-[17px] prose-p:leading-relaxed prose-headings:font-light prose-h2:text-3xl prose-h3:text-2xl prose-h2:mt-12 prose-li:text-[17px]"
              dangerouslySetInnerHTML={{ __html: tutorial.content }}
            />

            {/* Bottom CTA */}
            <div className="mt-16 pt-8 border-t border-border/50">
               <div className="bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-accent/20 p-8 rounded-lg text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <h3 className="text-2xl font-light italic text-white mb-3">Is Your Firm Invisible?</h3>
                  <p className="text-foreground/70 mb-6 max-w-lg mx-auto">
                    A beautiful website is useless if no one finds it. Stop losing cases to firms with better SEO.
                  </p>
                  <a
                    href="https://wa.me/60175032281?text=Hi%20Jacob,%20I'm%20reading%20Module%20${tutorial.order}%20of%20the%20SEO%20Guide.%20Let's%20talk%20about%20my%20firm's%20visibility."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-bold text-sm uppercase tracking-wider rounded-sm hover:bg-white transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" /> Discuss Your SEO Strategy
                  </a>
               </div>
            </div>

            {/* Next/Prev Navigation */}
            <div className="mt-12 flex justify-between items-center">
              {tutorial.order > 1 ? (
                <Link 
                  to={`/tutorials/${tutorials.find(t => t.order === tutorial.order - 1)?.id}`}
                  className="flex flex-col items-start gap-1 group"
                >
                  <span className="text-[10px] text-foreground/50 uppercase tracking-widest group-hover:text-accent transition-colors">Previous Module</span>
                  <span className="text-sm font-medium text-foreground/80 group-hover:text-white transition-colors">
                    {tutorials.find(t => t.order === tutorial.order - 1)?.title.substring(3)}
                  </span>
                </Link>
              ) : <div />}

              {tutorial.order < 8 ? (
                <Link 
                  to={`/tutorials/${tutorials.find(t => t.order === tutorial.order + 1)?.id}`}
                  className="flex flex-col items-end gap-1 group text-right"
                >
                  <span className="text-[10px] text-foreground/50 uppercase tracking-widest group-hover:text-accent transition-colors">Next Module</span>
                  <span className="text-sm font-medium text-foreground/80 group-hover:text-white transition-colors">
                    {tutorials.find(t => t.order === tutorial.order + 1)?.title.substring(3)}
                  </span>
                </Link>
              ) : <div />}
            </div>

          </motion.div>
        </div>
      </section>
    </div>
  );
}
