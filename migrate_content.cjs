const fs = require('fs');
const path = require('path');

const baseDir = 'c:/Users/walte/Desktop/lawyer marketing website/dry-test-copywriting';
const categories = ['pillars', 'services', 'blog', 'results'];

const siteContent = [];

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/\.md$/, '');
}

categories.forEach(category => {
  const dirPath = path.join(baseDir, category);
  if (!fs.existsSync(dirPath)) return;

  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    if (!file.endsWith('.md')) return;
    
    const content = fs.readFileSync(path.join(dirPath, file), 'utf8');
    const id = slugify(file);
    
    // Extract title from first H1
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : id;
    
    // Simple excerpt (first 100 chars of first paragraph)
    const excerptMatch = content.match(/\n\n([^#\n-]+)/);
    const excerpt = excerptMatch ? excerptMatch[1].trim().substring(0, 160) + "..." : "";

    // Map categories
    let finalCategory = "strategy";
    if (category === "pillars") finalCategory = "pillar";
    if (category === "services") finalCategory = "service";
    if (category === "results") finalCategory = "result";

    siteContent.push({
      id,
      category: finalCategory,
      title,
      excerpt,
      content: content.replace(/^#\s+(.+)$/m, ''), // Remove title from content body
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80",
      date: "April 20, 2026",
      author: "Jacob Ngai",
      readingTime: "8 min read"
    });
  });
});

const output = `
import { 
  Search, 
  Zap
} from "lucide-react";

export interface PageContent {
  id: string;
  category: "pillar" | "service" | "result" | "strategy";
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  readingTime: string;
  icon?: any;
}

export const siteContent: PageContent[] = ${JSON.stringify(siteContent, null, 2)};
`;

fs.writeFileSync('c:/Users/walte/Desktop/lawyer marketing website/src/app/data/content.ts', output);
console.log("Successfully generated siteContent.ts with " + siteContent.length + " pages.");
