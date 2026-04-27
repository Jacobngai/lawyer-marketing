import { BlogPost } from "../posts";

export const post: BlogPost = {
  id: "crawling-indexing-for-law-firms",
  title: "Crawling, Indexing & Architecture: The Invisible SEO Foundation",
  excerpt: "If Google can't find your pages, you can't rank. Learn how to master site architecture and ensure your high-value legal pages are discovered and indexed.",
  category: "SEO",
  date: "October 14, 2026",
  author: "Jacob Ng",
  readingTime: "18 MIN READ",
  image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=1200",
  content: `
    <p class="lead">Think of your website like a courtroom strategy. If your arguments are messy, confused, or hidden, you’ll lose before the trial even starts. In the digital world, your "strategy" is your site architecture. If Google can't properly crawl and index your pages, your expertise is essentially invisible.</p>

    <p>Crawling and indexing are the "behind-the-scenes" mechanics of SEO. Most lawyers never think about them, but they are the reason why one firm ranks #1 while another firm—with better content—is stuck on page 10. I’m going to show you how to build a foundation that Google can't ignore.</p>

    <h2>The 3-Step Discovery Process</h2>
    <ol>
      <li><strong>Crawling:</strong> This is when Googlebot "walks through" your site. It follows links from page to page. If your site is a maze, the bot will get stuck and stop looking.</li>
      <li><strong>Indexing:</strong> Once crawled, Google decides if your page is worth storing in its massive library. "Thin" or duplicate content often gets skipped here.</li>
      <li><strong>Ranking:</strong> Only <em>after</em> a page is indexed can it actually rank for keywords like "criminal lawyer KL."</li>
    </ol>

    <h2>Common Architecture Killers</h2>
    <p>I see the same technical mistakes in almost every law firm audit. These are the "silent killers" of your SEO:</p>
    
    <h3>1. The "Misplaced" Noindex Tag</h3>
    <p>A <code>noindex</code> tag tells Google, "Don't show this to anyone." It’s useful for your admin panel, but I’ve seen firms accidentally put it on their main landing pages. One wrong tag can wipe your entire firm off the map.</p>

    <h3>2. Shallow Content Hierarchy</h3>
    <p>Google values accessibility. If a client has to click five times to find your "Motorcycle Accident" page, Googlebot might never reach it. Your most valuable pages should be within <strong>3 clicks</strong> of your homepage.</p>

    <h3>3. Duplicate Practice Area Pages</h3>
    <p>Don't create five versions of "Car Accident Lawyer" for different cities using the exact same text. Google sees this as "bloat" and will lower your overall site quality score. Every page must be unique and localized.</p>

    <h2>Best Practices for a Pro-Level Structure</h2>
    <ul>
      <li><strong>Clean URL Structure:</strong> Use <code>/practice-areas/car-accidents/</code> instead of <code>/services?id=123</code>. It tells the bot (and the human) exactly what the page is about.</li>
      <li><strong>Submit a Clean XML Sitemap:</strong> This is the "map" you give to Google. Ensure it only contains high-quality, indexable pages.</li>
      <li><strong>Breadcrumb Navigation:</strong> Those small links at the top of a page (Home > Practice Areas > Personal Injury) are massive for helping crawlers understand your hierarchy.</li>
      <li><strong>Internal Link Equity:</strong> Link your blog posts back to your main "money" pages. This signals to Google that your Car Accident page is the most important one on the site.</li>
    </ul>

    <h2>The Priority Framework for Technical Fixes</h2>
    <p>If you're overwhelmed, focus on these in order:</p>
    <ol>
      <li><strong>Critical:</strong> Broken redirects, accidentally blocked pages, and robots.txt errors.</li>
      <li><strong>High:</strong> Duplicate content and slow page load speeds (Google hates a slow lawyer).</li>
      <li><strong>Moderate:</strong> Fragmented internal linking and orphaned blog posts.</li>
    </ol>

    <blockquote>
      "Your SEO strategy can't outperform your technical foundation. A clean, crawlable site ensures that the pages that sign clients are seen first."
    </blockquote>

    <p>Ready to see if your site is actually readable by Google? Let's perform a deep technical audit and clear the path for your firm's dominance.</p>
  `
};
