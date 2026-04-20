---
description: How to add a new strategic blog post to the website
---

1. **Centralize Data**: All blog posts must be defined in `src/app/data/posts.ts`.
2. **Post Object Structure**:
   ```typescript
   {
     id: string; // URL-safe slug
     category: string; // One of: Compliance, AI Marketing, Branding, SEO, etc.
     title: string;
     excerpt: string;
     date: string;
     author: "Jacob Ng";
     image: string; // Unsplash URL or local import
     content: string; // Full HTML or Markdown string for the article
     readingTime: string;
   }
   ```
3. **Automatic Integration**:
   - The `BlogPage.tsx` automatically maps over this array to create catalog cards.
   - The `BlogPostPage.tsx` automatically resolves the slug via URL params.
4. **Hero Image**: Ensure the `BlogPostPage` displays the `image` as the header background.
5. **WhatsApp CTA**: Every post must include a context-aware WhatsApp link using the author's number.
6. **Dry Run**: Verify the appearance on `localhost:5173` before finalizing.
