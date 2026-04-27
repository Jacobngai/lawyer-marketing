import criminalImg from "../../imports/pillars/criminal_defense_lux.png";
// We will reuse or map images properly in next steps, using placeholder logic for now
import familyImg from "../../imports/pillars/criminal_defense_lux.png"; 
import corporateImg from "../../imports/pillars/criminal_defense_lux.png";
import propertyImg from "../../imports/pillars/criminal_defense_lux.png";

export interface Pillar {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  image: string;
  href: string;
  stats: { label: string; value: string }[];
}

export const pillars: Pillar[] = [
  {
    id: "criminal-defense-lawyer-marketing",
    title: "Criminal Defense Lawyer Marketing",
    subtitle: "High-Stakes Response & Rights Protection",
    content: `
      <p>In criminal defense, the marketing cycle is measured in minutes, not months. When a prospect or their family face a legal crisis, they require an immediate, authoritative response from a firm that demonstrates an absolute command of the law.</p>
      
      <h3>1. Urgent Intent Capture</h3>
      <p>Criminal defense leads are born from immediate crisis. We prioritize <strong>Local Service Ads (LSAs)</strong> and <strong>High-Frequency PPC</strong> to ensure your firm is at the top of the search result at 2 AM or during a weekend emergency.</p>
      
      <h3>2. Technical Credibility & E-E-A-T</h3>
      <p>A defense attorney’s digital presence must project absolute power and competence. We harden your firm's authority signals by detailing specific practice-area outcomes and technical insights into Malaysian criminal procedure.</p>
      
      <h3>3. The 24/7 Intake Infrastructure</h3>
      <p>Visibility is irrelevant if the intake path is slow. We help defense firms implement Frictionless Response Systems ensuring that every high-priority lead is captured immediately.</p>
    `,
    image: criminalImg,
    href: "/practice-areas/criminal-defense-lawyer-marketing",
    stats: [
      { label: "Avg. Response Time", value: "< 2 Mins" },
      { label: "Crisis Lead Conv.", value: "42%" },
      { label: "Market Dominance", value: "Top 3" }
    ]
  },
  {
    id: "family-law-marketing",
    title: "Family & Matrimonial Law Marketing",
    subtitle: "Empathy, Discretion & High-Value Retainers",
    content: `
      <p>Family law marketing is a battle for empathy and trust. Clients aren't just looking for an 'expert'—they are looking for a protector who can handle their most personal crises with absolute discretion.</p>
      
      <h3>1. The Empathy-First Conversion Path</h3>
      <p>We move away from 'aggressive' legal copy Toward authoritative empathy. Your website becomes a safe space where prospective clients find clear answers to their emotional and financial fears.</p>
      
      <h3>2. Filtering High-Quality Retainers</h3>
      <p>Don't waste administrative time on information-seekers. We implement intake filters that prioritize high-net-worth matrimonial disputes and complex custody cases, ensuring your team only speaks to clients who appreciate your value.</p>
      
      <h3>3. Reputation & Search Dominance</h3>
      <p>In family law, reviews and local citations are the ultimate currency. We build a 'wall of trust' around your firm that makes you the only logical choice for high-stakes divorce litigation.</p>
    `,
    image: familyImg,
    href: "/practice-areas/family-law-marketing",
    stats: [
      { label: "High-Worth Case Lead", value: "+280%" },
      { label: "Consultation Rate", value: "35%" },
      { label: "Client Trust Score", value: "Elite" }
    ]
  },
  {
    id: "corporate-commercial-law-marketing",
    title: "Corporate & Commercial Law Marketing",
    subtitle: "Institutional Authority & Panel Acquisition",
    content: `
      <p>B2B and Corporate legal marketing requires a shift from 'retail' search to 'institutional' authority. You aren't just looking for clicks; you are looking to be invited onto the panels of Malaysia's largest enterprises.</p>
      
      <h3>1. AI Engine Optimization (AIEO)</h3>
      <p>Multi-national companies use AI-research tools to vet law firms. We ensure your firm is the 'recommended authority' for M&A, cross-border disputes, and commercial advisory when AI models scan the web.</p>
      
      <h3>2. Thought Leadership Infrastructure</h3>
      <p>We transform your partners into industry luminaries through strategic whitepapers and LinkedIn thought leadership that targets C-suite decision makers and General Counsels.</p>
      
      <h3>3. The 'Panel Ready' Digital Profile</h3>
      <p>We engineer your digital presence to meet the highest standards of corporate vetting, showcasing your specialized technical capacity and track record in complex commercial litigation.</p>
    `,
    image: corporateImg,
    href: "/practice-areas/corporate-commercial-law-marketing",
    stats: [
      { label: "Institutional Inquiries", value: "Top 1%" },
      { label: "AIO Citation Velocity", value: "High" },
      { label: "Market Perc. Value", value: "Premium" }
    ]
  }
];
