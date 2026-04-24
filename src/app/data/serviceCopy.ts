import pagespeedImg from "../../imports/services/pagespeed_insights.png";
import mockupImg from "../../imports/services/law_firm_mockup.png";
import handshakeImg from "../../imports/services/partnership_handshake.png";
import dashboardImg from "../../imports/services/data_dashboard.png";

export interface Tier {
  id: number;
  headline: string;
  p1: string;
  p2: string;
  image?: string;
  imageIcon?: string; // Optional icon name to show if no custom image
}

export interface ServiceCopy {
  tiers: Tier[];
}

export const serviceTiers: Record<string, ServiceCopy> = {
  "website-design-for-lawyers": {
    tiers: [
      {
        id: 1,
        headline: "Is Your Slow Website Silently Killing Your Reputation (And Your Profits)?",
        p1: "Google’s AI-first indexing doesn't forgive low-effort code. Every millisecond your site takes to load is a 'stop sign' for a high-value client ready to hire now.",
        p2: "We move you onto a high-performance system engineered for a 100/100 PageSpeed score. You stop losing cases to faster competitors the moment we launch.",
        image: pagespeedImg
      },
      {
        id: 2,
        headline: "Look Like the Dominant Firm Long Before the First Consultation",
        p1: "If your website looks 'discount,' you’ll attract discount leads. We design for the high-worth complex litigation and injury cases you actually want to represent.",
        p2: "Every pixel is engineered to establish immediate authority, positioning you as the only logical choice for someone in a high-stakes legal situation.",
        image: mockupImg
      },
      {
        id: 3,
        headline: "A Marketing Partner Who Understands Law—Not Just A Vendor",
        p1: "You focus on winning cases; we focus on the machinery that brings them to you. We handle the Bar Council compliance and technical hurdles so you don't have to.",
        p2: "This is a founding-partner relationship built on documented trust. We treat your firm's growth as our only metric of success.",
        image: handshakeImg
      },
      {
        id: 4,
        headline: "Stop Guessing Where Your Next Case Is Coming From",
        p1: "Don't fall for fluff reports and 'vanity metrics.' We provide a colorful, real-time dashboard showing exactly how many calls and inquiries were generated yesterday and today.",
        p2: "We stay on top of your market position with proactive monthly optimizations, ensuring you are the first firm prospects see while competition is left behind.",
        image: dashboardImg
      }
    ]
  },
  "local-service-ads-for-lawyers": {
    tiers: [
      {
        id: 1,
        headline: "Stop Paying For Clicks—Start Buying Guaranteed Phone Calls",
        p1: "Why gamble your budget on 'impressions' that go nowhere? Google’s LSA system skips the line and only charges you when a qualified prospect picks up the phone to hire you.",
        p2: "We eliminate the 'click-waste' by managing your LSA presence with surgical precision, ensuring your budget only feeds your case intake.",
        imageIcon: "Phone"
      },
      {
        id: 2,
        headline: "Become the Instant Authority With the Most Coveted Badge in Marketing",
        p1: "The 'Google Screened' checkmark tells clients instantly that you are vetted, credible, and ready to win. We handle the entire background check and verification process.",
        p2: "Status is the ultimate conversion tool. When they see that green checkmark next to your name, the second-guessing stops.",
        imageIcon: "ShieldCheck"
      },
      {
        id: 3,
        headline: "Own the Very Top of Page 1—Above the Ads, Above the SEO",
        p1: "LSAs aren't just 'part' of the page—they are the peak. We position your firm in the top 3 results, capturing high-value cases in your metro area before competition is even noticed.",
        p2: "Dominance is about proximity. By being the first name they see, you become the first name they trust.",
        imageIcon: "TrendingUp"
      },
      {
        id: 4,
        headline: "A Self-Funding Marketing Machine That Scales with Your Ambition",
        p1: "Our real-time dashboard shows every call record and recorded inquiry. You decide the volume—we handle the flow of inquiries into your firm.",
        p2: "This isn't an 'expense'; it's an investment with a fixed price per case. We optimize your bid-dominance every single hour.",
        imageIcon: "Layout"
      }
    ]
  },
  "law-firm-seo": {
    tiers: [
      {
        id: 1,
        headline: "Is Your Firm Being Silently Ghosted by the World’s Most Powerful AI?",
        p1: "If your website's architecture is outdated, Google steers your best clients toward competitors. We rebuild your technical foundation to be the first answer search engines cite.",
        p2: "We move you away from legacy environments onto an AI-optimized architecture engineered to sustain search dominance for years, not weeks.",
        imageIcon: "Search"
      },
      {
        id: 2,
        headline: "Stop Posting 'Blogs'—Start Publishing Case-Acquisition Assets",
        p1: "Generic content is a waste of space. We produce high-authority, direct-response articles that answer the specific legal fears of your ideal clients.",
        p2: "Every word we publish is optimized for your firm’s authority and engineered to move visitors into your consultation funnel.",
        imageIcon: "Sparkles"
      },
      {
        id: 3,
        headline: "The Secret Currency of the Internet: High-Value Credibility Links",
        p1: "We acquire the authoritative endorsements your competitors can't touch, creating a wall of credibility around your firm that is impossible to ignore.",
        p2: "Nothing is hidden: we'll show you exactly where we build links and how every backlink adds credible authority to your profile.",
        imageIcon: "Share2"
      },
      {
        id: 4,
        headline: "Real Numbers. Real Growth. No Technical Jargon Fluff",
        p1: "We work in disciplined 90-day sprints focused on one goal: increasing your revenue. No fluff reports. Just the direct path to more cases.",
        p2: "Local SEO makes you unmissable in your metro metropolitican area. We put your firm on the map, then we help you dominate it.",
        imageIcon: "TrendingUp"
      }
    ]
  },
  "google-ads-for-lawyers": {
    tiers: [
      {
        id: 1,
        headline: "Intercept Your Best Clients at the Exact Moment of Crisis",
        p1: "When someone searches for a 'divorce lawyer' at 2 AM, they aren't 'browsing'—they are buying. We put your solution directly in front of them the second they need help.",
        p2: "Capture the highest-intent leads before they even look at Page 2. Precision timing meets aggressive placement.",
        imageIcon: "Target"
      },
      {
        id: 2,
        headline: "Ads That Speak to the Heart (And the Hurtle) of the Matter",
        p1: "Most lawyer ads are invisible. We craft direct-response copy that targets the specific psychological pain points of your prospects, forcing them to stop scrolling.",
        p2: "We turn generic searches into specific realizations: 'Finally, a lawyer who understands my situation.'",
        imageIcon: "Sparkles"
      },
      {
        id: 3,
        headline: "Stop Burning Cash on 'Cheap' and 'Information-Only' Searchers",
        p1: "We filter out the noise. Our proprietary negative keyword lists ensure you never pay for a single click from 'free advice' seekers or low-value cases.",
        p2: "Every dollar you spend is focused on the highest-worth litigation. Efficiency isn't just about saving money; it's about making more of it.",
        imageIcon: "ShieldCheck"
      },
      {
        id: 4,
        headline: "Own the Market share You Deserve with Intelligent, Dynamic Bidding",
        p1: "We monitor the competitive landscape every hour. We adjust your bids in real-time to ensure you dominate prime real estate during peak hours.",
        p2: "Strategic. Calculated. Scalable. We turn your ad spend into a predictable case-acquisition engine.",
        imageIcon: "TrendingUp"
      }
    ]
  }
};
