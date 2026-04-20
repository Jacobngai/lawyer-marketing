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
    id: "legal-publicity-rules-2026",
    title: "The 2026 Malaysian Legal Publicity Rules: A Definitive Guide",
    excerpt: "Everything you need to know about the Bar Council's landmark decision on digital advertising and social media presence.",
    category: "Compliance",
    date: "Jan 15, 2026",
    author: "Jacob Ng",
    readingTime: "10 MIN READ",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200",
    content: `
      <h2>The Paradigm Shift in Malaysia's Legal Sector</h2>
      <p>January 2026 marks a historic turning point for the Malaysian legal profession. The Bar Council's updated Publicity Rules have finally aligned with the digital age, allowing firms to engage in strategic digital marketing while maintaining the decorum and integrity of the profession.</p>
      
      <h3>What Has Changed?</h3>
      <p>Under the new rules, firms are no longer restricted to passive presence. Active engagement through search engine marketing, social media educational content, and professional directory listings is now officially sanctioned, provided they don't engage in "ambulance chasing" or disparaging other members of the Bar.</p>
      
      <blockquote>
        "The goal is not to sell, but to inform. Publicity must be performed with the dignity that matches the legal profession."
      </blockquote>

      <h3>Key Compliance Checklist</h3>
      <ul>
        <li><strong>Factual Content:</strong> All advertisements must be based on verifiable facts.</li>
        <li><strong>No Direct Solicitation:</strong> Direct messages to potential clients who haven't expressed interest remain restricted.</li>
        <li><strong>Bar Council Identification:</strong> All digital assets must clearly state the firm's registration details.</li>
      </ul>
    `
  },
  {
    id: "ai-cited-authority-aieo-geo",
    title: "Becoming an AI-Cited Authority: The Rise of AIEO & GEO",
    excerpt: "Why the classic SEO playbook is dead, and how to optimize your firm for Perplexity, ChatGPT, and AI Search Engines.",
    category: "AI Marketing",
    date: "Jan 12, 2026",
    author: "Jacob Ng",
    readingTime: "8 MIN READ",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
    content: `
      <h2>The Post-Search Era: AI Engine Optimization (AIEO)</h2>
      <p>We are transitioning from Search Engine Optimization (SEO) to AI Engine Optimization. When a prospective client asks an AI, "Who is the most qualified lawyer for intellectual property in Malaysia?", the AI doesn't give them 10 links; it gives them a single, authoritative recommendation.</p>
      
      <h3>How AI Models Select Firms</h3>
      <p>AI models like Perplexity and ChatGPT look for 'Citation Velocity' and 'Contextual Authority'. They analyze the entire web to find firms that are consistently mentioned in high-quality legal contexts, news outlets, and professional directories.</p>
      
      <h3>Generative Engine Optimization (GEO) Strategies</h3>
      <p>To be the firm that the AI recommends, you need to focus on:</p>
      <ul>
        <li><strong>Knowledge Graph Building:</strong> Using structured Schema markup that tells AI exactly what your expertise is.</li>
        <li><strong>First-Party Data Publishing:</strong> Detailed case studies and unique legal insights that become the primary source for AI training data.</li>
        <li><strong>Proximity and GEO Signals:</strong> Ensuring your physical office data is synchronized across all map and location services.</li>
      </ul>

      <p>If you aren't in the AI's "citation web," your firm effectively doesn't exist to the next generation of high-net-worth clients.</p>
    `
  },
  {
    id: "personal-branding-for-litigation-partners",
    title: "High-Ticket Personal Branding for Litigation Partners",
    excerpt: "From professional photography to LinkedIn thought leadership—how to build a name that commands premium fees.",
    category: "Branding",
    date: "Jan 10, 2026",
    author: "Jacob Ng",
    readingTime: "12 MIN READ",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200",
    content: `
      <h2>The Power of the Individual in the Legal Market</h2>
      <p>Clients don't hire law firms; they hire lawyers. For senior litigation partners, your personal brand is your most valuable asset. In a market saturated with "experts," a well-crafted personal brand allows you to command premium fees and win multi-million ringgit cases.</p>
      
      <h3>The Pillars of a Premium Identity</h3>
      <p>A high-ticket brand isn't about being famous; it's about being <em>relevant</em>. It requires three core pillars:</p>
      
      <h4>1. Aesthetic Authority</h4>
      <p>Professional branding photography and a polished digital presence are the table stakes. Your online "vibe" must match the boardroom presence you bring to a trial.</p>

      <h4>2. Intellectual Capital</h4>
      <p>Regularly publishing high-level insights on LinkedIn and legal journals creates a "proven track record" that exists before the client even meets you.</p>

      <h4>3. Network Synchronization</h4>
      <p>Your personal brand must be reflected in what others say about you. Strategic PR and collaborative thought leadership ensure that your name is synonymous with victory in your specific niche.</p>

      <blockquote>
        "Your brand is what people say about you when you're not in the courtroom."
      </blockquote>
    `
  }
];
