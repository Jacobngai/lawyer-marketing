export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: "Compliance" | "AI Marketing" | "Branding" | "SEO" | "SEM";
  date: string;
  author: string;
  image: string;
  content: string;
  readingTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "lawyer-advertising-rules-malaysia-2026",
    title: "The 2026 Malaysian Lawyer Advertising Rules: A Definitive Guide",
    excerpt: "Everything you need to know about the Bar Council's landmark decision on digital lawyer marketing and social media presence.",
    category: "Compliance",
    date: "Jan 15, 2026",
    author: "Jacob Ng",
    readingTime: "10 MIN READ",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200",
    content: `
      <h2>The Paradigm Shift in Malaysia's Legal Sector</h2>
      <p>January 2026 marks a historic turning point for the Malaysian lawyer profession. The Bar Council's updated Publicity Rules have finally aligned with the digital age, allowing law firms to engage in strategic lawyer marketing while maintaining the decorum and integrity of the profession.</p>
      
      <h3>What Has Changed?</h3>
      <p>Under the new rules, law firms are no longer restricted to passive presence. Active engagement through search engine marketing, social media educational content, and professional directory listings is now officially sanctioned, provided they don't engage in "ambulance chasing" or disparaging other members of the Bar.</p>
      
      <blockquote>
        "The goal is not to sell, but to inform. Lawyer advertising must be performed with the dignity that matches the legal profession."
      </blockquote>
    `
  },
  {
    id: "law-firm-ai-authority-search-optimization",
    title: "Becoming a Law Firm AI-Cited Authority: AIEO & GEO",
    excerpt: "Why the classic lawyer SEO playbook is dead, and how to optimize your law firm for Perplexity, ChatGPT, and AI Search Engines.",
    category: "AI Marketing",
    date: "Jan 12, 2026",
    author: "Jacob Ng",
    readingTime: "8 MIN READ",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
    content: `
      <h2>The Post-Search Era: AI Engine Optimization (AIEO)</h2>
      <p>We are transitioning from lawyer SEO to AI Engine Optimization. When a prospective client asks an AI, "Who is the most qualified lawyer for intellectual property in Malaysia?", the AI doesn't give them 10 links; it gives them a single, authoritative law firm recommendation.</p>
      
      <h3>How AI Models Select Law Firms</h3>
      <p>AI models like Perplexity and ChatGPT look for 'Citation Velocity' and 'Contextual Authority'. They analyze the entire web to find law firms that are consistently mentioned in high-quality legal contexts, news outlets, and professional directories.</p>
    `
  },
  {
    id: "litigation-lawyer-personal-branding-strategy",
    title: "High-Ticket Lawyer Personal Branding for Litigation Partners",
    excerpt: "From professional law firm photography to LinkedIn thought leadership—how to build a name that commands premium fees.",
    category: "Branding",
    date: "Jan 10, 2026",
    author: "Jacob Ng",
    readingTime: "12 MIN READ",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200",
    content: `
      <h2>The Power of the Individual in the Legal Market</h2>
      <p>Clients don't hire law firms; they hire lawyers. For senior litigation partners, your personal branding is your most valuable asset. In a market saturated with "experts," a well-crafted lawyer brand allows you to command premium fees and win multi-million ringgit cases.</p>
    `
  }
];
