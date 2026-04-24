import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { services } from "../data/services";
import { 
  Zap, Shield, BarChart, Sparkles, Star, 
  ArrowRight, Search, MousePointer2, Users, ShieldCheck, Share2, Layout,
  CheckCircle2, Phone, TrendingUp, Target
} from "lucide-react";
import { cn } from "../components/ui/utils";
import { serviceTiers } from "../data/serviceCopy";
import { AISearchDemo } from "../components/AISearchDemo";
import pagespeedImg from "../../imports/services/pagespeed_insights.png";
import mockupImg from "../../imports/services/law_firm_mockup.png";
import handshakeImg from "../../imports/services/partnership_handshake.png";
import dashboardImg from "../../imports/services/data_dashboard.png";

const getServiceIcon = (id: string) => {
  switch (id) {
    case "law-firm-seo": return Search;
    case "law-firm-ai-search-optimization": return Sparkles;
    case "google-ads-for-lawyers": return MousePointer2;
    case "meta-advertising-for-lawyers": return Users;
    case "local-service-ads-for-lawyers": return ShieldCheck;
    case "social-media-marketing-for-lawyers": return Share2;
    case "website-design-for-lawyers": return Layout;
    default: return Zap;
  }
};

function SubNav() {
  const { id } = useParams();
  
  const getShortName = (serviceId: string) => {
    switch (serviceId) {
      case "law-firm-seo": return "seo";
      case "law-firm-ai-search-optimization": return "aio";
      case "google-ads-for-lawyers": return "google ads";
      case "meta-advertising-for-lawyers": return "meta";
      case "local-service-ads-for-lawyers": return "lsa";
      case "social-media-marketing-for-lawyers": return "content";
      case "website-design-for-lawyers": return "website";
      default: return "service";
    }
  };

  return (
    <div className="sticky top-[60px] md:top-[80px] z-40 bg-background/80 backdrop-blur-xl border-b border-white/5 py-2 md:py-3 overflow-x-auto no-scrollbar scroll-smooth scroll-px-6">
      <div className="container mx-auto px-6 md:px-10 whitespace-nowrap flex flex-nowrap items-center justify-start md:justify-center gap-8 md:gap-6 lg:gap-20 pr-32 md:pr-0">
        {services.map((s) => {
          const Icon = getServiceIcon(s.id);
          const isActive = s.id === id;
          return (
            <Link 
              key={s.id} 
              to={s.href}
              className={cn(
                "flex flex-col items-center gap-1 group transition-all relative py-1 shrink-0",
                isActive ? "opacity-100" : "opacity-40 hover:opacity-80"
              )}
            >
              <Icon className={cn("w-4 h-4 md:w-5 md:h-5", isActive ? "text-accent" : "text-foreground")} strokeWidth={1.5} />
              <span className={cn("text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-black", isActive ? "text-accent" : "text-foreground")}>
                {getShortName(s.id)}
              </span>
              {isActive && (
                <motion.div 
                  layoutId="activeSubNav"
                  className="absolute -bottom-2 md:-bottom-3 h-[2px] w-full bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
        {/* Terminal buffer spacer for mobile */}
        <div className="w-1 md:hidden shrink-0" />
      </div>
    </div>
  );
}

import { SEO } from "../components/SEO";

export function ServicePage() {
  const { id } = useParams();
  const service = services.find(s => s.id === id);

  if (!service) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl mb-6 font-serif lowercase-headings">service not found</h1>
          <Link to="/" className="text-accent underline uppercase tracking-widest text-xs">Return Home</Link>
        </div>
      </div>
    );
  }

  // Specialized content for Law Firm SEO
  const isSEOPage = id === "law-firm-seo";
  const isWebDesignPage = id === "website-design-for-lawyers";
  const showAIDemo = [
    "law-firm-seo", 
    "law-firm-ai-search-optimization", 
    "local-service-ads-for-lawyers", 
    "google-ads-for-lawyers"
  ].includes(id || "");

  return (
    <div className="pt-[60px] md:pt-[80px] min-h-screen bg-background text-foreground lowercase-headings selection:bg-accent/30">
      <SEO 
        title={`${service.title} | Specialized Strategy`}
        description={`Expert ${service.title.toLowerCase()} for law firms in Malaysia. We engineer your digital presence to dominate search results and convert high-value leads into cases.`}
      />
      <SubNav />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 flex flex-col items-center justify-center text-center px-8 md:px-12 overflow-hidden bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="max-w-4xl z-10"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6 leading-[1.1] md:leading-[0.95]">
            {isSEOPage ? (
              <>
                Law <span className="italic font-serif text-accent">Firm</span> <br /> SEO
              </>
            ) : (
              service.title.split(' ').map((word, i) => (
                <span key={i} className={i % 2 === 0 ? "text-white" : "font-serif text-accent"}>
                  {word}{" "}
                </span>
              ))
            )}
          </h1>
          <p className="text-lg md:text-xl text-foreground/50 max-w-2xl mx-auto leading-relaxed italic">
            {isSEOPage 
              ? "Rank at the top of Google for the high‑value searches that drive your best injury and complex legal cases."
              : `Get a ${service.title.toLowerCase()} strategy designed to rank on Google and convert your visitors into cases.`}
          </p>
          <div className="mt-8">
            <Link to="/contact">
              <button className="px-12 py-4 bg-accent text-accent-foreground font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-black transition-all">
                Get Your Strategy Call
              </button>
            </Link>
          </div>
        </motion.div>
        
        <div className="absolute inset-0 opacity-40 grayscale pointer-events-none">
          <img src={service.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black" />
        </div>
      </section>

      {/* AI Citation Demo (Side-by-Side) */}
      {showAIDemo && (
        <section className="py-20 md:py-32 bg-black border-y border-white/5 overflow-hidden">
          <div className="container mx-auto px-8 md:px-12 max-w-7xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full mb-6">
                {service.id === 'local-service-ads-for-lawyers' && <ShieldCheck className="w-3 h-3 text-green-500" />}
                {service.id === 'law-firm-seo' && <Search className="w-3 h-3 text-accent" />}
                {service.id === 'google-ads-for-lawyers' && <MousePointer2 className="w-3 h-3 text-accent" />}
                {service.id === 'law-firm-ai-search-optimization' && <Sparkles className="w-3 h-3 text-accent" />}
                
                <span className="text-accent uppercase tracking-[0.4em] text-[8px] font-black">
                  {service.id === 'local-service-ads-for-lawyers' && 'Google Local Dominance'}
                  {service.id === 'law-firm-seo' && 'Organic Dominance'}
                  {service.id === 'google-ads-for-lawyers' && 'Sponsored Priority'}
                  {service.id === 'law-firm-ai-search-optimization' && 'AI Citation Dominance'}
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-light italic text-white lowercase tracking-tighter">
                {service.id === 'local-service-ads-for-lawyers' && <>own the <span className="text-accent font-serif tracking-tight">#1 rank</span> above the fold</>}
                {service.id === 'law-firm-seo' && <>own the <span className="text-accent font-serif tracking-tight">undisputed answer</span> organically</>}
                {service.id === 'google-ads-for-lawyers' && <>dominate the <span className="text-accent font-serif tracking-tight">priority spot</span> instantly</>}
                {service.id === 'law-firm-ai-search-optimization' && <>get <span className="text-accent font-serif tracking-tight">ai-cited</span> on page 1</>}
              </h2>
            </div>
            {/* Logic to choose demo type */}
            <AISearchDemo 
              layout="horizontal" 
              type={
                service.id === 'local-service-ads-for-lawyers' ? 'lsa' :
                service.id === 'law-firm-seo' ? 'seo' :
                service.id === 'google-ads-for-lawyers' ? 'google-ads' : 'ai'
              } 
            />
          </div>
        </section>
      )}

      {/* Educational Block (Only for SEO) */}
      {isSEOPage && (
        <section className="py-32 bg-white border-b border-black/5 relative overflow-hidden">
          <div className="container mx-auto px-8 md:px-12 max-w-4xl text-center relative z-10">
            <h2 className="text-3xl md:text-6xl font-light italic mb-8 text-black lowercase tracking-tighter">Why Law Firm SEO is <span className="text-accent font-serif tracking-tight">Non-Negotiable</span> in 2026</h2>
            <p className="text-xl text-black/70 leading-relaxed mb-10">
              In an era of AI-driven search and hyper-local competition, your firm is either the authority or you are invisible. We don't just "do SEO"—we secure your territory and engineer your site to be the undisputed answer for high-intent legal queries.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center pt-8 border-t border-black/5">
              <div>
                <div className="text-4xl font-serif text-accent mb-2">01</div>
                <div className="text-[10px] uppercase tracking-widest font-black text-black/40">Market Authority</div>
              </div>
              <div>
                <div className="text-4xl font-serif text-accent mb-2">02</div>
                <div className="text-[10px] uppercase tracking-widest font-black text-black/40">Lead Quality</div>
              </div>
              <div>
                <div className="text-4xl font-serif text-accent mb-2">03</div>
                <div className="text-[10px] uppercase tracking-widest font-black text-black/40">Asset Ownership</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Dynamic Tiers (1-4) */}
      {(serviceTiers[service.id]?.tiers || []).map((tier, idx) => {
        const isAlternate = idx % 2 !== 0;
        const isThird = idx === 2;
        const isFourth = idx === 3;
        
        let bgColor = "bg-[#0a0a0a]"; // Tier 1
        let textColor = "text-white";
        let subtextColor = "text-foreground/60";
        let tierColor = "text-white/10";
        let btnColor = "bg-accent text-accent-foreground";
        let borderColor = "border-white/5";

        if (idx === 1) { // Tier 2 (White)
          bgColor = "bg-white";
          textColor = "text-black";
          subtextColor = "text-black/60";
          tierColor = "text-black/10";
          btnColor = "bg-black text-white shadow-black/10";
          borderColor = "border-black/5";
        } else if (idx === 2) { // Tier 3 (Apple Gray)
          bgColor = "bg-[#f5f5f7]";
          textColor = "text-black";
          subtextColor = "text-black/60";
          tierColor = "text-black/10";
          btnColor = "bg-black text-white shadow-black/10";
          borderColor = "border-black/5";
        } else if (idx === 3) { // Tier 4 (Black)
          bgColor = "bg-black";
          textColor = "text-white";
          subtextColor = "text-foreground/60";
          tierColor = "text-white/10";
          btnColor = "bg-accent text-accent-foreground";
          borderColor = "border-white/5";
        }

        const TierIcon = tier.imageIcon === "Phone" ? Phone 
                       : tier.imageIcon === "ShieldCheck" ? ShieldCheck 
                       : tier.imageIcon === "TrendingUp" ? TrendingUp 
                       : tier.imageIcon === "Search" ? Search 
                       : tier.imageIcon === "Sparkles" ? Sparkles 
                       : tier.imageIcon === "Share2" ? Share2
                       : tier.imageIcon === "Target" ? Target
                       : Layout;

        return (
          <section key={tier.id} className={cn("py-32 md:py-40 relative border-y", bgColor, borderColor)}>
            <div className="container mx-auto px-8 md:px-12 max-w-7xl">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                <div className={cn("md:col-span-1", isAlternate && "order-none md:order-none")}>
                  <span className={cn("text-5xl md:text-7xl font-serif italic", tierColor)}>{tier.id}</span>
                </div>
                
                <div className={cn("md:col-span-6 space-y-8", isAlternate && "order-first md:order-last")}>
                  <h2 className={cn("text-3xl md:text-5xl font-light italic leading-tight uppercase tracking-tight", textColor)}>
                    {tier.headline}
                  </h2>
                  <p className={cn("text-lg leading-relaxed", subtextColor)}>
                    {tier.p1}
                  </p>
                  <p className={cn("text-lg leading-relaxed italic border-l-2 border-accent pl-6", subtextColor)}>
                    {tier.p2}
                  </p>
                  <div className="pt-8">
                    <Link to="/contact">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn("px-8 py-4 rounded-sm text-xs uppercase tracking-widest font-black shadow-xl", btnColor)}
                      >
                        Get Started
                      </motion.button>
                    </Link>
                  </div>
                </div>

                <div className="md:col-span-1" />

                <div className={cn("md:col-span-4 relative group", isAlternate && "order-last md:order-first")}>
                  {tier.image ? (
                    <div className={cn("relative aspect-square rounded-sm overflow-hidden border bg-black shadow-2xl", borderColor)}>
                      <img 
                        src={tier.image} 
                        className="w-full h-full object-cover transition-all duration-700 opacity-100 grayscale-0" 
                        alt={tier.headline} 
                      />
                    </div>
                  ) : (
                    <div className={cn("relative p-12 border rounded-sm text-center shadow-sm aspect-square flex flex-col items-center justify-center", bgColor === "bg-[#0a0a0a]" || bgColor === "bg-black" ? "bg-accent/5" : "bg-white", borderColor)}>
                      <TierIcon className="w-16 h-16 text-accent mx-auto mb-6" />
                      <h4 className={cn("font-bold uppercase tracking-[0.2em] mb-2", textColor)}>Expert Insight</h4>
                      <p className={cn("text-sm", subtextColor)}>Strategy. Performance. Scale.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* FAQ Section (Special for SEO Page - Contrast: White) */}
      {isSEOPage && (
        <section className="py-40 bg-white border-t border-black/5">
          <div className="container mx-auto px-8 md:px-12 max-w-4xl">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-7xl font-light italic mb-6 text-black lowercase tracking-tighter">Expert <span className="text-accent font-serif tracking-tight">SEO Insights</span></h2>
              <p className="text-lg text-black/40">Common questions about law firm search engine optimization.</p>
            </div>
            
            <div className="space-y-12">
              {[
                { 
                  q: "How long until we see results from SEO?", 
                  a: "Law firm SEO is a competitive territory acquisition. Most firms see movement within 90 days, but compounding ROI typically accelerates at the 6-12 month mark as technical authority builds." 
                },
                { 
                  q: "Will we own the content you create for us?", 
                  a: "Yes. Every word we publish and every technical optimization we make belongs to your firm outright. We believe in providing freedom, not platform handcuffs." 
                },
                { 
                  q: "How is AI-Search (AIO) different from traditional SEO?", 
                  a: "Traditional SEO ranks you for human queries. AIO ensures LLMs like ChatGPT and Claude cite your firm as the recommended local authority when users ask for advice." 
                }
              ].map((faq, i) => (
                <div key={i} className="pb-10 border-b border-black/5 last:border-0">
                  <h3 className="text-xl font-bold text-accent uppercase tracking-widest mb-4">§ {faq.q}</h3>
                  <p className="text-lg text-black/60 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-40 md:py-60 bg-background relative overflow-hidden flex items-center justify-center border-t border-white/5">
        <div className="container mx-auto px-8 md:px-12 max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-16 md:p-24 bg-gradient-to-br from-accent/5 to-accent/15 border border-accent/20 rounded-sm text-center relative backdrop-blur-3xl overflow-hidden"
          >
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-light italic mb-8">You’ll Know If We’re a Fit<br/>After Your Complimentary Audit</h2>
              <p className="text-lg md:text-xl text-foreground/60 mb-12 max-w-2xl mx-auto leading-relaxed">
                See exactly how your firm stacks up with a complimentary audit <span className="text-accent font-bold">($3,500 value)</span> focused on where your next cases should come from.
              </p>
              <Link to="/contact">
                <button className="px-12 py-5 bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] hover:bg-accent hover:text-white transition-all transform hover:scale-105">
                  Claim Your Free Landing Page
                  <ArrowRight className="inline-block ml-3 w-4 h-4" />
                </button>
              </Link>
              <p className="text-[10px] text-foreground/40 mt-6 uppercase tracking-[0.2em] font-bold">
                You just pay for the hosting.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[100px] pointer-events-none" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
