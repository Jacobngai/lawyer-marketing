import { LucideIcon } from "lucide-react";
import { pillar as criminalPillar } from "./pillars/criminal-defense";
import { pillar as familyPillar } from "./pillars/family-law";
import { pillar as corporatePillar } from "./pillars/corporate-commercial";
import { pillar as injuryPillar } from "./pillars/personal-injury";
import { pillar as propertyPillar } from "./pillars/property-conveyancing";
import { pillar as immigrationPillar } from "./pillars/immigration";
import { pillar as employmentPillar } from "./pillars/employment-law";
import { pillar as estatePillar } from "./pillars/estate-planning";
import { pillar as ipPillar } from "./pillars/intellectual-property";
import { pillar as medMalPillar } from "./pillars/medical-malpractice";
import { pillar as bankruptcyPillar } from "./pillars/bankruptcy-insolvency";
import { pillar as taxPillar } from "./pillars/tax-law";
import { pillar as realEstatePillar } from "./pillars/real-estate";
import { pillar as litigationPillar } from "./pillars/civil-litigation";
import { pillar as insurancePillar } from "./pillars/insurance-claims";
import { pillar as constructionPillar } from "./pillars/construction-law";
import { pillar as maritimePillar } from "./pillars/maritime-admiralty";
import { pillar as environmentPillar } from "./pillars/environmental-law";
import { pillar as entertainmentPillar } from "./pillars/entertainment-media";
import { pillar as cyberPillar } from "./pillars/cybercrime-tech";

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
  criminalPillar,
  familyPillar,
  corporatePillar,
  injuryPillar,
  propertyPillar,
  immigrationPillar,
  employmentPillar,
  estatePillar,
  ipPillar,
  medMalPillar,
  bankruptcyPillar,
  taxPillar,
  realEstatePillar,
  litigationPillar,
  insurancePillar,
  constructionPillar,
  maritimePillar,
  environmentPillar,
  entertainmentPillar,
  cyberPillar
];
