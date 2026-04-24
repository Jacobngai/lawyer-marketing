import seoImg from "../../imports/services/person_seo_confident.png";
import aioImg from "../../imports/services/person_aio_serious.png";
import googleImg from "../../imports/services/person_google_smile.png";
import metaImg from "../../imports/services/person_meta_friendly.png";
import lsaImg from "../../imports/services/person_lsa_trust.png";
import socialImg from "../../imports/services/person_social_energetic.png";
import webImg from "../../imports/services/person_web_focused.png";

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  layoutType?: "landing" | "standard";
}

export const services: Service[] = [
  {
    id: "website-design-for-lawyers",
    title: "HIGH-PERFORMING WEB DESIGN FOR LAW FIRMS",
    subtitle: "High-performance architecture. Built to convert.",
    description: "Get the blazing fast, high-conversion website your firm needs to dominate search results and turn visitors into high-value cases.",
    image: webImg,
    href: "/services/website-design-for-lawyers",
    layoutType: "landing"
  },
  {
    id: "local-service-ads-for-lawyers",
    title: "CREDENTIALED LOCAL SERVICES ADS (LSA)",
    subtitle: "Dominate Google's pay-per-lead",
    description: "Dominate Google's pay-per-lead LSAs so your firm appears first when your prospects are ready to hire.",
    image: lsaImg,
    href: "/services/local-service-ads-for-lawyers"
  },
  {
    id: "google-ads-for-lawyers",
    title: "ROI-FOCUSED GOOGLE ADS FOR LAWYERS",
    subtitle: "Capture high-intent searches",
    description: "Capture high-intent searches with tightly targeted Google Ads that drive qualified calls to your firm.",
    image: googleImg,
    href: "/services/google-ads-for-lawyers"
  },
  {
    id: "meta-advertising-for-lawyers",
    title: "CONVERSION-DRIVEN LAWYER META ADVERTISING",
    subtitle: "Deploy targeted Meta campaigns",
    description: "Deploy targeted Meta campaigns to transform your prospects' attention into profitable consultations.",
    image: metaImg,
    href: "/services/meta-advertising-for-lawyers"
  },
  {
    id: "social-media-marketing-for-lawyers",
    title: "ELITE SOCIAL MEDIA MARKETING FOR LAWYERS",
    subtitle: "Publish consistent, on-brand content",
    description: "Publish the consistent, on-brand content you need to stay visible, credible, and top-of-mind.",
    image: socialImg,
    href: "/services/social-media-marketing-for-lawyers"
  },
  {
    id: "law-firm-ai-search-optimization",
    title: "AI SEARCH OPTIMIZATION FOR LAW FIRMS",
    subtitle: "Structure your site for AI search",
    description: "Structure your site so AI search engines like ChatGPT surface your firm as the trusted, recommended answer.",
    image: aioImg,
    href: "/services/law-firm-ai-search-optimization"
  },
  {
    id: "law-firm-seo",
    title: "HIGH-IMPACT LAW FIRM SEO",
    subtitle: "Rank at the top of Google",
    description: "Rank at the top of Google for high-value searches that drive your best injury and complex cases.",
    image: seoImg,
    href: "/services/law-firm-seo"
  }
];
