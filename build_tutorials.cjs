const fs = require('fs');
const marked = require('marked');

const basePath = 'C:/Users/walte/.gemini/antigravity/brain/64253f9c-90d2-4f51-a108-66c00c7e4e14/.system_generated/steps/';

const modulesData = [
  { id: "overview-seo-for-lawyers", pathId: '244', title: "1. The New Era of Legal SEO in Malaysia", excerpt: "The complete 2026 guide to SEO for lawyers. Learn how to rank higher on Google, dominate local search, win AI Overview citations.", readingTime: "15 MIN READ" },
  { id: "ranking-factors", pathId: '267', title: "2. Google & AI Ranking Factors for Law Firms", excerpt: "Understanding Google's ranking factors is essential for any law firm serious about improving visibility and lead generation.", readingTime: "12 MIN READ" },
  { id: "keyword-research", pathId: '333', title: "3. Keyword Research & Category Entry Points (CEPs)", excerpt: "The definitive guide to keyword research for lawyers. Build topic clusters. Rank higher. And get more cases in 2026.", readingTime: "18 MIN READ" },
  { id: "on-site-seo", pathId: '339', title: "4. On-Site SEO: The Foundation Nobody Builds", excerpt: "How to optimize your pages with On-Page SEO. Site structure best practices. Title tag and meta description optimization.", readingTime: "14 MIN READ" },
  { id: "content-strategy", pathId: '340', title: "5. Content: Writing Blogs That Actually Bring Cases", excerpt: "Learn how to create content that ranks at the top of Google and brings in new cases. Become the go-to source of information in your niche.", readingTime: "20 MIN READ" },
  { id: "link-building", pathId: '341', title: "6. Link Building: Establishing Digital Authority", excerpt: "Your complete guide to link building for lawyers: top strategies, essential tools, and how to effectively build authority.", readingTime: "16 MIN READ" },
  { id: "local-seo", pathId: '342', title: "7. Local SEO & The 'Map Pack' Dominance", excerpt: "Learn how to do Local SEO for your law firm. Know what factors into your rank and how to improve it in this definitive guide.", readingTime: "14 MIN READ" },
  { id: "technical-seo", pathId: '343', title: "8. Technical SEO: Do Not Build on Broken Ground", excerpt: "Lawyer technical SEO made simple. Learn how to fix site structure, speed & indexing issues that stop your law firm from ranking.", readingTime: "17 MIN READ" }
];

const replacements = [
  { search: /Chicago/g, replace: 'Kuala Lumpur' },
  { search: /Miami/g, replace: 'Penang' },
  { search: /Atlanta/g, replace: 'Johor Bahru' },
  { search: /Florida/g, replace: 'Selangor' },
  { search: /New York/g, replace: 'Klang Valley' },
  { search: /Dallas/g, replace: 'Ipoh' },
  { search: /Houston/g, replace: 'Petaling Jaya' },
  { search: /Orlando/g, replace: 'Malacca' },
  { search: /Tampa/g, replace: 'Seremban' },
  { search: /ABA Model Rule 7\.1/g, replace: 'Malaysian Bar Council Publicity Rules' },
  { search: /ABA Model Rules/g, replace: 'Malaysian Legal Profession Act 1976' },
  { search: /state bar/g, replace: 'Bar Council' },
  { search: /American Bar Association/g, replace: 'Malaysian Bar' },
  { search: /Avvo/g, replace: 'Malaysian Bar Directory' },
  { search: /Justia/g, replace: 'LexisNexis' },
  { search: /Martindale-Hubbell/g, replace: 'Legal500' },
  { search: /FindLaw/g, replace: 'Chambers Asia-Pacific' },
  { search: /Rankings\.io/g, replace: 'LawyerMarketing.my' },
  { search: /Chris Dreyer/g, replace: 'Jacob Ng' },
  { search: /United States/g, replace: 'Malaysia' },
  { search: /U\.S\./g, replace: 'Malaysian' },
  { search: /\$150/g, replace: 'RM150' },
  { search: /\$2,500/g, replace: 'RM2,500' },
  { search: /\$5,000/g, replace: 'RM5,000' },
  { search: /\$10,000/g, replace: 'RM10,000' },
  { search: /\$15,000/g, replace: 'RM15,000' },
  { search: /\$30,000/g, replace: 'RM30,000' },
];

function localize(text) {
  let localized = text;
  replacements.forEach(r => {
    localized = localized.replace(r.search, r.replace);
  });
  return localized;
}

let codeChunks = [];

codeChunks.push(`export interface TutorialModule {
  id: string;
  order: number;
  title: string;
  excerpt: string;
  content: string;
  readingTime: string;
  image: string;
}

const defaultImage = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200";

export const tutorials: TutorialModule[] = [`);

modulesData.forEach((mod, index) => {
  const filePath = `${basePath}${mod.pathId}/content.md`;
  if (!fs.existsSync(filePath)) {
    console.error(`Missing file: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Cut off junk headers by finding the first "## "
  let startIndex = content.indexOf('\n## ');
  if (startIndex === -1) startIndex = content.indexOf('\n# ');
  if (startIndex !== -1) {
    content = content.substring(startIndex);
  }
  
  // Cut off footers
  const footers = ['\nAUTHOR\n', '\nCovered on this Page\n', '\nNEXT CHAPTER\n', '\nFEATURED IN TRUSTED PUBLICATIONS\n', '\n## Conclusion\n'];
  for (const footer of footers) {
    const fn = content.indexOf(footer);
    if (fn !== -1) {
      content = content.substring(0, fn);
    }
  }

  // Inject Jacob Ng Narrative for Module 1
  if (mod.id === 'overview-seo-for-lawyers') {
    const jacobStory = `
## The Accidental Legal Marketer
I did not plan to end up here. For most of my career, I was a software engineer. I understood systems — how they are built, how they break, how information moves through them. Then I moved into SEO, which is really just understanding a different kind of system: how people search for things, and how search engines decide what to show them.

I was doing well. I had spent close to RM20,000 on AI tokens testing what worked and what did not. And I had a story that proved it: taking a small financing company called Ing Heng Credit and outranking a government-backed institution, Agro Bank, for equipment loan searches. Digital visibility is not about how long you have been in business; it is about who builds the right signals in the right places.

Then, earlier this year, a lawyer told me something that stopped me cold: *"Actually, the Bar Council just changed the rules. Lawyers can advertise now."*

For most of Malaysian legal history, firms competed almost entirely on reputation and referral. But in 2026, the Bar Council began loosening its advertising/publicity restrictions. For the first time in a generation, Malaysian lawyers can actively build a public presence. That's what this comprehensive guide is aimed at solving.
`;
    content = jacobStory + content;
  }
  
  let htmlContent = marked.parse(content);
  htmlContent = localize(htmlContent);
  
  // Escape backticks and dollars for template literals
  htmlContent = htmlContent.replace(/\`/g, '\\`').replace(/\$/g, '\\$');
  
  codeChunks.push(`  {
    id: "${mod.id}",
    order: ${index + 1},
    title: "${mod.title}",
    excerpt: "${mod.excerpt}",
    readingTime: "${mod.readingTime}",
    image: defaultImage,
    content: \`
${htmlContent}
    \`
  },`);
});

codeChunks.push('];\n');

fs.writeFileSync('C:/Users/walte/Desktop/lawyer marketing website/src/app/data/tutorials.ts', codeChunks.join('\n'));
console.log('Successfully generated tutorials.ts with deep content.');
