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

import { post as post1 } from "./posts/lawyer-advertising-rules-malaysia-2026";
import { post as post2 } from "./posts/law-firm-ai-authority-search-optimization";
import { post as post3 } from "./posts/litigation-lawyer-personal-branding-strategy";
import { post as post4 } from "./posts/chat-gpt-for-lawyers";
import { post as post5 } from "./posts/ai-seo";
import { post as post6 } from "./posts/aio-for-law-firms";
import { post as post7 } from "./posts/content-marketing-for-law-firms";
import { post as post8 } from "./posts/content-optimization";
import { post as post9 } from "./posts/crawling-indexing-for-law-firms";
import { post as post10 } from "./posts/domain-authority-for-law-firms";
import { post as post11 } from "./posts/google-analytics-for-lawyers";
import { post as post12 } from "./posts/google-my-business-for-lawyers";
import { post as post13 } from "./posts/google-my-business-ranking-study";
import { post as post14 } from "./posts/importance-of-empathy-in-law-firms";
import { post as post15 } from "./posts/keyword-optimization-for-lawyers";
import { post as post16 } from "./posts/keyword-research";
import { post as post17 } from "./posts/law-firm-marketing-conference";
import { post as post18 } from "./posts/law-firm-marketing-strategies";
import { post as post19 } from "./posts/lawyer-blog-topics";
import { post as post20 } from "./posts/lead-generation-lawyers";
import { post as post21 } from "./posts/legal-directories";
import { post as post22 } from "./posts/local-services-ads-for-lawyers";
import { post as post23 } from "./posts/long-tail-keywords-for-lawyers";
import { post as post24 } from "./posts/semantic-seo-for-law-firms";

export const blogPosts: BlogPost[] = [
  post1, post2, post3, post4, post5, post6, post7, post8, post9, post10, 
  post11, post12, post13, post14, post15, post16, post17, post18, post19, post20,
  post21, post22, post23, post24
];
