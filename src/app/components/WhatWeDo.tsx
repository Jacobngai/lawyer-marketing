import { motion } from "motion/react";
import { Globe, MapPin, Megaphone, User, ArrowRight, Check, Sparkles, TrendingUp } from "lucide-react";
import { useState } from "react";

const services = [
  {
    icon: Globe,
    title: "SEO & GEO Optimized Website",
    description: "Dominate search results with a cutting-edge website engineered for maximum visibility. Our SEO and geolocation optimization ensures your firm appears exactly when and where potential clients are searching.",
    features: [
      "Advanced technical SEO implementation",
      "Geolocation targeting for local dominance",
      "Mobile-first responsive design",
      "Lightning-fast page load speeds",
      "Schema markup for rich snippets",
    ],
    gradient: "from-accent/20 via-accent/10 to-transparent",
    iconBg: "bg-gradient-to-br from-accent to-accent/60",
  },
  {
    icon: MapPin,
    title: "Google Business Profile Optimization",
    description: "Claim your territory on Google Maps and local search. We transform your Google Business Profile into a client-generating powerhouse with strategic optimization and reputation management.",
    features: [
      "Complete profile setup & verification",
      "Strategic keyword optimization",
      "Review generation & management",
      "Regular posts & updates",
      "Local citation building",
    ],
    gradient: "from-blue-500/20 via-blue-500/10 to-transparent",
    iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
  },
  {
    icon: Megaphone,
    title: "Precision Paid Advertising",
    description: "Reach high-value clients instantly with data-driven campaigns on Google Ads and Meta platforms. Every dollar invested is tracked, optimized, and designed to deliver qualified leads to your practice.",
    features: [
      "Google Ads search & display campaigns",
      "Facebook & Instagram targeting",
      "A/B testing for optimal performance",
      "Conversion tracking & analytics",
      "Bar Council compliant messaging",
    ],
    gradient: "from-purple-500/20 via-purple-500/10 to-transparent",
    iconBg: "bg-gradient-to-br from-purple-500 to-purple-600",
  },
  {
    icon: User,
    title: "Personal Brand Building",
    description: "Establish yourself as the authority in your practice area. We craft compelling personal brands that position you as the go-to expert, building trust before prospects even contact you.",
    features: [
      "Thought leadership content strategy",
      "Professional brand photography",
      "LinkedIn authority building",
      "Video content production",
      "Media & PR opportunities",
    ],
    gradient: "from-emerald-500/20 via-emerald-500/10 to-transparent",
    iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
  },
];

export function WhatWeDo() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {services.map((service, index) => (
        <motion.div
          key={service.title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: index * 0.15 }}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
          className="group relative"
        >
          {/* Main Card */}
          <motion.div
            whileHover={{
              y: -12,
              transition: { duration: 0.4, ease: "easeOut" },
            }}
            className="relative h-full bg-card border border-border rounded-lg p-5 md:p-8 overflow-hidden"
          >
            {/* Animated gradient background */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              animate={
                hoveredIndex === index
                  ? {
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }
                  : {}
              }
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            />

            {/* Floating particles on hover - hidden on mobile for performance */}
            {hoveredIndex === index && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-accent/40 rounded-full"
                    initial={{
                      x: Math.random() * 100 + "%",
                      y: "100%",
                    }}
                    animate={{
                      y: "-10%",
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: Math.random() * 2 + 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Content */}
            <div className="relative z-10">
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="mb-4 md:mb-6 inline-block"
              >
                <div className={`${service.iconBg} w-12 h-12 md:w-16 md:h-16 rounded-lg flex items-center justify-center shadow-lg relative`}>
                  {/* Glow effect - hidden on mobile for performance */}
                  <motion.div
                    className="absolute inset-0 rounded-lg blur-xl opacity-50 hidden md:block"
                    animate={
                      hoveredIndex === index
                        ? {
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0.8, 0.5],
                          }
                        : {}
                    }
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ background: "inherit" }}
                  />
                  <service.icon className="w-6 h-6 md:w-8 md:h-8 text-white relative z-10" />
                </div>
              </motion.div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl mb-2 md:mb-3 group-hover:text-accent transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-foreground/70 leading-relaxed mb-4 md:mb-6">
                {service.description}
              </p>

              {/* Features List */}
              <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                {service.features.map((feature, featureIndex) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.15 + featureIndex * 0.1 }}
                    className="flex items-start gap-2 md:gap-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.4 }}
                      className="mt-0.5 md:mt-1 p-1 bg-accent/20 rounded-full flex-shrink-0"
                    >
                      <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-accent" />
                    </motion.div>
                    <span className="text-xs md:text-sm text-foreground/80">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <a
                href={`https://wa.me/60175032281?text=${encodeURIComponent(`Hello, I'm interested in the ${service.title} for my law firm.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-4 md:px-6 py-2.5 md:py-3 bg-accent/10 hover:bg-accent text-foreground hover:text-accent-foreground border border-accent rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn text-sm md:text-base font-medium"
                >
                  <span>Inquire on WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover/btn:translate-x-1 transition-transform" />
                </motion.button>
              </a>
            </div>

            {/* Corner accent decorations - hidden on mobile for performance */}
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block"
              animate={
                hoveredIndex === index
                  ? {
                      rotate: 360,
                    }
                  : {}
              }
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-accent/30 rounded-tr-lg" />
            </motion.div>

            <motion.div
              className="absolute bottom-0 left-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block"
              animate={
                hoveredIndex === index
                  ? {
                      rotate: -360,
                    }
                  : {}
              }
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-accent/30 rounded-bl-lg" />
            </motion.div>

            {/* Shimmer effect - hidden on mobile for performance */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 hidden md:block"
              initial={false}
              animate={
                hoveredIndex === index
                  ? {
                      background: [
                        "linear-gradient(90deg, transparent 0%, rgba(201, 169, 97, 0.1) 50%, transparent 100%)",
                        "linear-gradient(90deg, transparent 0%, rgba(201, 169, 97, 0.1) 50%, transparent 100%)",
                      ],
                      backgroundPosition: ["-200% 0", "200% 0"],
                    }
                  : {}
              }
              transition={{ duration: 2, repeat: Infinity }}
              style={{ backgroundSize: "200% 100%" }}
            />
          </motion.div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.15 + 0.3, type: "spring" }}
            className="absolute -top-3 -right-3 z-20"
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-accent rounded-full blur-lg opacity-50" />
              <div className="relative bg-accent text-accent-foreground px-4 py-2 rounded-full flex items-center gap-2 shadow-xl">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-medium">Premium</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
