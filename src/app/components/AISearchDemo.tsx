import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Search, Sparkles, Check, Star } from "lucide-react";

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

export function AISearchDemo() {
  const [currentQueryIndex, setCurrentQueryIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [highlightFirm, setHighlightFirm] = useState(false);
  const [zoomIn, setZoomIn] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);

  const currentData = practiceAreaQueries[currentQueryIndex];
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
          setCurrentQueryIndex((prev) => (prev + 1) % practiceAreaQueries.length);
        }, 4500);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, [currentQueryIndex, searchQuery]);

  return (
    <div className="relative">
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto mb-12"
      >
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <Search className="w-5 h-5 text-accent" />
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
          </div>
          <input
            type="text"
            value={typedText}
            readOnly
            className="w-full pl-16 pr-6 py-5 bg-card border-2 border-accent/50 rounded-lg text-lg text-foreground focus:outline-none focus:border-accent"
            placeholder="Ask AI anything..."
          />
          <motion.div
            className="absolute right-4 top-1/2 -translate-y-1/2"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <div className="w-0.5 h-6 bg-accent" />
          </motion.div>
        </div>
      </motion.div>

      {/* AI Response */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* AI Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm text-accent">AI Response</span>
              </div>
            </div>

            {/* AI Text Response */}
            <motion.div
              key={`response-${currentQueryIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 p-6 bg-card/50 border border-border rounded-lg"
            >
              <p className="text-lg text-foreground/90 leading-relaxed mb-4">
                Based on your search for {currentData.specialty.toLowerCase()} services in your area, I recommend the following highly-rated law firm:
              </p>
            </motion.div>

            {/* Recommended Firm Card */}
            <motion.div
              initial={{ scale: 1 }}
              animate={{
                scale: zoomIn ? 1.05 : 1,
                boxShadow: highlightFirm
                  ? "0 0 0 4px rgba(201, 169, 97, 0.3), 0 20px 60px rgba(201, 169, 97, 0.4)"
                  : "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ duration: 0.5 }}
              className={`relative p-8 rounded-lg border-2 transition-all ${
                highlightFirm
                  ? "bg-gradient-to-br from-accent/20 to-card border-accent"
                  : "bg-card border-border"
              }`}
            >
              {/* Glowing border animation */}
              {highlightFirm && (
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(201, 169, 97, 0.5)",
                      "0 0 40px rgba(201, 169, 97, 0.8)",
                      "0 0 20px rgba(201, 169, 97, 0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              {/* AI Cited Badge */}
              {highlightFirm && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="absolute -top-4 -right-4 z-10"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-accent rounded-full blur-xl opacity-50 animate-pulse" />
                    <div className="relative bg-accent text-accent-foreground px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                      <Sparkles className="w-4 h-4" />
                      <span className="font-medium">AI Cited</span>
                      {showCheckmark && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          <Check className="w-4 h-4" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="flex items-start gap-6 relative z-10">
                {/* Firm Logo */}
                <div className="w-20 h-20 bg-accent/10 rounded-lg flex items-center justify-center border-2 border-accent">
                  <span className="text-2xl text-accent">⚖️</span>
                </div>

                {/* Firm Details */}
                <div className="flex-1">
                  <motion.h3
                    key={`firm-${currentQueryIndex}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-2xl text-accent mb-2"
                  >
                    {currentData.firm}
                  </motion.h3>
                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                    ))}
                    <span className="text-sm text-foreground/70 ml-2">(4.9 • 120+ reviews)</span>
                  </div>

                  <motion.p
                    key={`desc-${currentQueryIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="text-foreground/80 mb-4 leading-relaxed"
                  >
                    Specializing in {currentData.specialty.toLowerCase()} with over {currentData.years} years of experience.
                    Known for professional representation and favorable outcomes for clients in Kuala Lumpur.
                  </motion.p>

                  <div className="flex flex-wrap gap-2">
                    <motion.span
                      key={`badge1-${currentQueryIndex}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full border border-accent/30"
                    >
                      {currentData.area} Expert
                    </motion.span>
                    <motion.span
                      key={`badge2-${currentQueryIndex}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full border border-accent/30"
                    >
                      {currentData.years} Years
                    </motion.span>
                    <motion.span
                      key={`badge3-${currentQueryIndex}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                      className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full border border-accent/30"
                    >
                      Kuala Lumpur
                    </motion.span>
                  </div>
                </div>
              </div>

              {/* Highlight pulse effect */}
              {highlightFirm && (
                <>
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 bg-accent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-accent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                </>
              )}
            </motion.div>

            {/* Why This Works - Info Box */}
            {showCheckmark && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-8 p-6 bg-gradient-to-r from-accent/10 to-transparent border-l-4 border-accent rounded-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-accent rounded-full">
                    <Check className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="text-xl text-accent mb-2">Get Ranked on Page 1</h4>
                    <p className="text-foreground/80 leading-relaxed">
                      When AI search engines cite your firm, you appear as the trusted recommendation
                      before potential clients even scroll. We optimize your digital presence to be the
                      first choice AI recommends.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {practiceAreaQueries.map((_, index) => (
          <motion.div
            key={index}
            className={`h-1.5 rounded-full transition-all ${
              index === currentQueryIndex
                ? "w-8 bg-accent"
                : "w-1.5 bg-accent/30"
            }`}
            animate={{
              opacity: index === currentQueryIndex ? 1 : 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
}
