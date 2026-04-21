import criminalImg from "../../imports/pillars/criminal_defense_lux.png";
import divorceImg from "../../imports/pillars/divorce_family_lux.png";
import piImg from "../../imports/pillars/personal_injury_lux.png";
import estateImg from "../../imports/pillars/estate_probate_lux.png";

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
    id: "criminal-defense",
    title: "Criminal Defense Marketing",
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
    href: "/practice-areas/criminal-defense",
    stats: [
      { label: "Avg. Response Time", value: "< 2 Mins" },
      { label: "Crisis Lead Conv.", value: "42%" },
      { label: "Market Dominance", value: "Top 3" }
    ]
  }
];
