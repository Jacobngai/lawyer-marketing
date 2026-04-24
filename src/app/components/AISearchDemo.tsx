import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Search, Sparkles, Check, Star, MapPin, Phone, ShieldCheck, MousePointer2 } from "lucide-react";
import { cn } from "../components/ui/utils";

const practiceAreaQueries = [
  { query: "a divorce lawyer near me", firm: "Tan Family Law Chambers", specialty: "Family Law & Divorce", years: "15+", area: "Family Law" },
  { query: "corporate law firm Malaysia", firm: "Rahman Corporate Associates", specialty: "Corporate & Commercial Law", years: "20+", area: "Corporate Law" },
  { query: "banking finance lawyer KL", firm: "Lim Banking Law Partners", specialty: "Banking & Finance Law", years: "18+", area: "Banking & Finance" },
  { query: "civil litigation lawyer", firm: "Wong Litigation Chambers", specialty: "Civil Litigation", years: "12+", area: "Civil Litigation" },
  { query: "criminal defense lawyer Malaysia", firm: "Kumar Criminal Defense", specialty: "Criminal Law", years: "16+", area: "Criminal Law" },
  { query: "property conveyancing lawyer", firm: "Lee Property Law Firm", specialty: "Property & Conveyancing", years: "14+", area: "Property Law" },
  { query: "immigration lawyer Malaysia", firm: "Chen Immigration Law", specialty: "Immigration Law", years: "10+", area: "Immigration" },
  { query: "intellectual property lawyer", firm: "Patel IP Associates", specialty: "Intellectual Property", years: "13+", area: "IP Law" },
  { query: "employment law lawyer KL", firm: "Ahmad Employment Law", specialty: "Employment & Industrial Relations", years: "15+", area: "Employment Law" },
  { query: "syariah lawyer Malaysia", firm: "Hassan Syariah Chambers", specialty: "Islamic Law (Syariah)", years: "17+", area: "Syariah Law" },
  { query: "tax lawyer Malaysia", firm: "Tan Tax & Revenue Law", specialty: "Tax & Revenue", years: "19+", area: "Tax Law" },
  { query: "arbitration lawyer Malaysia", firm: "Singh Dispute Resolution", specialty: "Dispute Resolution & Arbitration", years: "16+", area: "Arbitration" },
  { query: "mergers acquisitions lawyer", firm: "Chong M&A Partners", specialty: "Mergers & Acquisitions", years: "21+", area: "M&A Law" },
  { query: "construction law lawyer", firm: "Yap Construction Law", specialty: "Construction Law", years: "14+", area: "Construction Law" },
  { query: "insolvency lawyer Malaysia", firm: "Rao Insolvency Chambers", specialty: "Insolvency & Bankruptcy", years: "12+", area: "Insolvency Law" },
];

const googleAdsQueries = [
  { 
    query: "can i sue my supplier for late payment?", 
    firm: "Teh & Co. Corporate Solicitors", 
    specialty: "Not sure how corporate law works? Speak with us for free.", 
    years: "20+", 
    area: "Corporate Law",
    detailedResponse: [
      { text: "In Malaysia, <b>Section 74 of the Contracts Act 1950</b> allows for compensation for losses that naturally arise from a breach or were known by both parties to be likely.", source: "Teh & Co. Corporate Solicitors" },
      { text: "Court level depends on amount: small claims up to <b>RM5,000</b>, Magistrates' Court up to <b>RM100,000</b>, and Sessions Court from <b>RM100,001 to RM1,000,000</b>.", source: "Teh & Co. Corporate Solicitors" }
    ]
  },
  { 
    query: "unpaid salary from previous employer malaysia?", 
    firm: "Ahmad Employment Law", 
    specialty: "Unpaid wages? Speak with our HR legal specialists for free.", 
    years: "15+", 
    area: "Employment Law",
    detailedResponse: [
      { text: "Under the <b>Employment Act 1955</b>, wages must be paid no later than the <b>7th day</b> after the last day of any wage period.", source: "Ahmad Employment Law" },
      { text: "Employees earning below <b>RM4,000</b> can file a claim at the <b>Labour Office (Pejabat Tenaga Kerja)</b> for recovery of unpaid salaries.", source: "Ahmad Employment Law" }
    ]
  },
  { 
    query: "how to win child custody in malaysia?", 
    firm: "Tan Family Law Chambers", 
    specialty: "Protecting your family interests. Schedule a free privacy-protected session.", 
    years: "18+", 
    area: "Family Law",
    detailedResponse: [
      { text: "The <b>Law Reform (Marriage and Divorce) Act 1976</b> prioritizes the <b>'welfare of the child'</b> as the paramount consideration in custody disputes.", source: "Tan Family Law Chambers" },
      { text: "There is a rebuttable presumption that it is good for a child below <b>7 years old</b> to be with their mother, though this can be challenged based on fitness.", source: "Tan Family Law Chambers" }
    ]
  },
  { 
    query: "what to do if arrested for drink driving?", 
    firm: "Kumar Criminal Defense", 
    specialty: "Immediate 24/7 defense consultation available. Know your rights.", 
    years: "22+", 
    area: "Criminal Law",
    detailedResponse: [
      { text: "Under <b>Section 44 of the Road Transport Act 1987</b>, drink driving causing injury carries a mandatory jail term of <b>7 to 10 years</b>.", source: "Kumar Criminal Defense" },
      { text: "You have a constitutional right to legal counsel under <b>Article 5(3)</b>. Do not provide a statement without your solicitor present.", source: "Kumar Criminal Defense" }
    ]
  },
];

const seoQueries = [
  { 
    query: "can i sue my supplier for late payment?", 
    firm: "Teh & Co. Corporate Solicitors", 
    specialty: "Legal Guide: Suing for Late Payment & Section 74 Breach of Contract in Malaysia", 
    years: "20+", 
    area: "Corporate Law",
    description: "Understanding your recovery options under Section 74 is critical for business continuity. This guide outlines the definitive legal frameworks for securing compensation when suppliers fail to deliver..."
  },
  { 
    query: "unpaid salary from previous employer malaysia?", 
    firm: "Ahmad Employment Law", 
    specialty: "Understanding Your Rights: Recovery of Unpaid Salary Under Employment Act 1955", 
    years: "15+", 
    area: "Employment Law",
    description: "You are legally protected against wage delays. Explore our comprehensive breakdown of Labour Office procedures and how we assist employees in recovering their full entitlements under the 1955 Act..."
  },
  { 
    query: "how to win child custody in malaysia?", 
    firm: "Tan Family Law Chambers", 
    specialty: "The 'Welfare of the Child' Principle: A Senior Solicitor's Guide to Winning Custody", 
    years: "18+", 
    area: "Family Law",
    description: "The welfare of your child is the court's paramount concern. We provide the strategic clarity you need to navigate custody benchmarks and secure a stable future for your family..."
  },
  { 
    query: "what to do if arrested for drink driving?", 
    firm: "Kumar Criminal Defense", 
    specialty: "Arrested for Drink Driving? Your Legal Protections Under Section 44 Road Transport Act", 
    years: "22+", 
    area: "Criminal Law",
    description: "Immediate legal intervention is your best protection. Our guidance helps you understand your constitutional rights and the specific defensive frameworks available under the Road Transport Act..."
  },
];

export function AISearchDemo({ layout = "vertical", type = "ai" }: { layout?: "vertical" | "horizontal", type?: "ai" | "lsa" | "google-ads" | "seo" }) {
  const [currentQueryIndex, setCurrentQueryIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [highlightFirm, setHighlightFirm] = useState(false);
  const [zoomIn, setZoomIn] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);

  const isHorizontal = layout === "horizontal";
  const isGoogleAds = type === "google-ads";
  const isLSA = type === "lsa";
  const isAIO = type === "ai";
  const isSEO = type === "seo";

  // Use question-based queries for AIO, SEO and Search Ads
  const queries = isSEO ? seoQueries : (isAIO || isGoogleAds) ? googleAdsQueries : practiceAreaQueries;

  const currentData = queries[currentQueryIndex % queries.length];
  const searchQuery = currentData.query;

  useEffect(() => {
    // Reset states
    setTypedText("");
    setShowResults(false);
    setHighlightFirm(false);
    setZoomIn(false);
    setShowCheckmark(false);

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= searchQuery.length) {
        setTypedText(searchQuery.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowResults(true), 500);
        setTimeout(() => setHighlightFirm(true), 1500);
        setTimeout(() => setZoomIn(true), 2000);
        setTimeout(() => setShowCheckmark(true), 2500);

        // Move to next query after animation completes
        setTimeout(() => {
          setCurrentQueryIndex((prev) => (prev + 1) % queries.length);
        }, 4500);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, [currentQueryIndex, searchQuery, queries.length]);

  return (
    <div className={cn("relative", isHorizontal ? "min-h-[400px] md:min-h-[450px]" : "min-h-[600px] md:min-h-[700px]")}>
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={cn("max-w-3xl mx-auto mb-8 md:mb-12", isHorizontal && "mb-6 md:mb-8")}
      >
        <div className="relative">
          <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <Search className="w-4 md:w-5 h-4 md:h-5 text-accent" />
            <Sparkles className="w-3 md:w-4 h-3 md:h-4 text-accent animate-pulse" />
          </div>
          <input
            type="text"
            value={typedText}
            readOnly
            className="w-full pl-12 md:pl-16 pr-4 md:pr-6 py-4 md:py-5 bg-transparent border-b-2 border-accent/30 text-base md:text-lg text-foreground focus:outline-none focus:border-accent"
            placeholder={isAIO ? "Ask AI a legal question..." : "Search for a top-rated law firm..."}
          />
          <motion.div
            className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <div className="w-0.5 h-5 md:h-6 bg-accent" />
          </motion.div>
        </div>
      </motion.div>

      {/* Results Section */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={cn("max-w-4xl mx-auto", isHorizontal && "max-w-6xl")}
          >
            <div className={cn(
              "grid grid-cols-1 gap-8", 
              (isLSA) ? "lg:grid-cols-[1fr_400px] lg:items-start" : 
              (isAIO || isSEO) ? "justify-items-center" :
              (isHorizontal && !isGoogleAds) ? "lg:grid-cols-2 lg:items-start" : ""
            )}>
              
              {/* Core Content Column */}
              <div className={cn("space-y-6", (isAIO || isSEO) && "max-w-2xl mx-auto w-full")}>
                
                {/* AI / Sponsored Header */}
                {!isLSA && (
                  <div className={cn("flex items-center gap-3", (isAIO || isSEO) && "justify-center")}>
                    <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full">
                      {isAIO && (
                        <>
                          <Sparkles className="w-4 h-4 text-accent" />
                          <span className="text-sm text-accent">AI Overview</span>
                        </>
                      )}
                      {isGoogleAds && (
                        <>
                          <MousePointer2 className="w-4 h-4 text-accent" />
                          <span className="text-sm text-accent">Sponsored</span>
                        </>
                      )}
                      {isSEO && (
                        <>
                          <Search className="w-4 h-4 text-accent" />
                          <span className="text-sm text-accent">Organic Leader</span>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* AI Overview Paragraph + Citation */}
                {isAIO && (
                  <motion.div
                    key={`aio-${currentQueryIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-6 md:p-8 bg-white/[0.03] border border-white/5 rounded-xl space-y-6"
                  >
                    <div className="space-y-6">
                      {((currentData as any).detailedResponse || []).map((block: any, idx: number) => (
                        <div key={idx} className="relative">
                          <p 
                            className="text-base md:text-lg text-foreground/90 leading-relaxed font-light"
                            dangerouslySetInnerHTML={{ __html: block.text }}
                          />
                          <motion.span 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 1 + (idx * 0.2) }}
                            className="inline-flex items-center gap-1.5 mt-2 px-2 py-0.5 bg-accent/10 border border-accent/20 rounded text-[9px] text-accent font-bold uppercase tracking-tighter"
                          >
                            <Sparkles className="w-2.5 h-2.5 opacity-60" />
                            {block.source}
                          </motion.span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Firm Card Component */}
                {(isLSA || isGoogleAds || isSEO) && (
                  <div className="relative">
                    {/* LSA / Ads Badge */}
                    {isLSA && (
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                          <ShieldCheck className="w-3 h-3 text-green-400" />
                          <span className="text-[10px] uppercase tracking-wider font-bold text-green-400">Google Screened</span>
                        </div>
                      </div>
                    )}

                    {/* The Card */}
                    <motion.div
                      animate={{
                        scale: zoomIn ? 1.02 : 1,
                        boxShadow: highlightFirm ? "0 20px 40px -10px rgba(201, 169, 97, 0.3)" : "none"
                      }}
                      className={cn(
                        "p-6 md:p-8 rounded-xl border transition-all text-left",
                        isGoogleAds ? "bg-white/[0.02] border-accent/10" : 
                        highlightFirm ? "bg-white/[0.05] border-accent/30" : "bg-white/[0.02] border-white/5"
                      )}
                    >
                      {isGoogleAds ? (
                        /* Google Ads UI (No Stars, Blue Headline) */
                        <div className="space-y-1">
                          <h3 className="text-2xl md:text-3xl text-[#8ab4f8] font-medium mb-1 hover:underline cursor-pointer">
                            {currentData.specialty}
                          </h3>
                          <div className="flex items-center gap-2 mb-3">
                             <span className="text-sm text-foreground/40">www.{currentData.firm.toLowerCase().replace(/\s+/g, '')}.my</span>
                             <span className="text-foreground/40">•</span>
                             <span className="text-sm text-foreground/40 font-medium">{currentData.firm}</span>
                          </div>
                          <p className="text-lg text-foreground/70 leading-relaxed font-light">
                            Securing your legal rights with over {currentData.years} of specialized expertise in {currentData.area}. Results-focused strategy for Malaysia.
                          </p>
                        </div>
                      ) : (
                        /* Standard Card (LSA / SEO) */
                        <div className="flex gap-6 items-start">
                          {!isGoogleAds && !isSEO && (
                            <div className="w-16 h-16 bg-accent/10 border border-accent/20 rounded-lg flex items-center justify-center shrink-0">
                               <span className="text-2xl">⚖️</span>
                            </div>
                          )}
                          <div className="flex-1">
                            {isSEO ? (
                              /* SEO Organic Answer Card */
                              <div className="space-y-1">
                                <h3 className="text-xl md:text-2xl text-[#8ab4f8] font-medium mb-1 hover:underline cursor-pointer leading-tight">
                                  {currentData.specialty}
                                </h3>
                                <div className="flex items-center gap-2 mb-3">
                                   <span className="text-sm text-foreground/40 font-medium lowercase">
                                     www.{currentData.firm.toLowerCase().replace(/\s+/g, '')}.my › {currentData.area.toLowerCase().replace(/\s+/g, '-')}
                                   </span>
                                </div>
                                <p className="text-base text-foreground/60 leading-relaxed font-light">
                                  {(currentData as any).description}
                                </p>
                              </div>
                            ) : (
                              /* Standard LSA Card */
                              <>
                                <h3 className="text-2xl text-accent mb-2">{currentData.firm}</h3>
                                
                                {/* Stars ONLY for LSA */}
                                {isLSA && (
                                  <div className="flex items-center gap-1 mb-3">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-accent fill-accent" />)}
                                    <span className="text-xs text-foreground/50 ml-2">(4.9 • 120+ reviews)</span>
                                  </div>
                                )}

                                <p className="text-lg text-foreground/60 leading-relaxed mb-4">
                                  Verified experts in {currentData.area} with over {currentData.years} of experience.
                                </p>

                                <div className="flex gap-2">
                                    <span className="px-3 py-1 bg-accent/5 border border-accent/10 rounded-full text-[10px] uppercase font-bold text-accent">Expertise: {currentData.area}</span>
                                    {isLSA && <span className="px-3 py-1 bg-green-500/5 border border-green-500/10 rounded-full text-[10px] uppercase font-bold text-green-400">Response: &lt;15 mins</span>}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </div>
                )}
              </div>

              {/* Secondary Column (Map for LSA) */}
              {isLSA && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="hidden lg:block h-[500px] bg-[#1a1a1a] border border-white/5 rounded-xl relative overflow-hidden grayscale contrast-[1.2]"
                >
                  {/* Simulated Google Map Background */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute inset-x-0 top-1/4 h-px bg-white/20" />
                    <div className="absolute inset-x-0 top-1/2 h-px bg-white/20" />
                    <div className="absolute inset-x-0 top-3/4 h-px bg-white/20" />
                    <div className="absolute inset-y-0 left-1/4 w-px bg-white/20" />
                    <div className="absolute inset-y-0 left-1/2 w-px bg-white/20" />
                    <div className="absolute inset-y-0 left-3/4 w-px bg-white/20" />
                  </div>
                  
                  {/* Map Pin for Firm */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                  >
                    <div className="bg-accent text-accent-foreground p-3 rounded-full shadow-[0_0_30px_rgba(201,169,97,0.5)]">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div className="mt-2 bg-black/80 backdrop-blur-md px-3 py-1.5 border border-accent/30 rounded text-[10px] font-bold text-accent whitespace-nowrap uppercase tracking-widest">
                      {currentData.firm}
                    </div>
                  </motion.div>

                  {/* Other pins (simulated) */}
                  <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-white/20 rounded-full" />
                  <div className="absolute top-2/3 left-1/4 w-2 h-2 bg-white/20 rounded-full" />
                  <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-white/20 rounded-full" />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper icons
function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5l7 7-7 7" />
    </svg>
  );
}
