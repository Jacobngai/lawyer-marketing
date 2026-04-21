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
    id: "seo",
    title: "High-Impact SEO for Law Firms",
    description: "We secure your Page 1 rankings for high-value keywords. You capture the local market share your firm deserves.",
    image: seoImg,
    href: "/services/seo"
  },
  {
    id: "aio",
    title: "Authority-Building AI Search Optimization",
    description: "We position your firm as the primary authority. You get cited by ChatGPT and AI search engines as the trusted answer.",
    image: aioImg,
    href: "/services/aio"
  },
  {
    id: "google-ads",
    title: "ROI-Focused Google Ads for Lawyers",
    description: "We manage precision-targeted search campaigns. You start scaling your case volume immediately.",
    image: googleImg,
    href: "/services/google-ads"
  },
  {
    id: "social-media-advertising",
    title: "Conversion-Driven Meta Advertising",
    description: "We build your brand presence on Meta and Instagram. You attract clients actively searching for your expertise.",
    image: metaImg,
    href: "/services/social-media-advertising"
  },
  {
    id: "google-lsa",
    title: "Credentialed Local Services Ads",
    description: "We verify your 'Google Screened' badge. You dominate the top of search results with instant professional trust.",
    image: lsaImg,
    href: "/services/google-lsa"
  },
  {
    id: "social-media",
    title: "Elite Organic Social Media Management",
    description: "We transform your social profile into an authority hub. You nurture and convert your prospects through strategic content.",
    image: socialImg,
    href: "/services/social"
  },
  {
    id: "website-design-for-lawyers",
    title: "High-Performing Web Design for Law Firms",
    description: "We engineer high-speed digital infrastructure. You dominate search results and convert visitors in under 120 days.",
    image: webImg,
    href: "/services/website-design-for-lawyers",
    layoutType: "landing"
  }
];
