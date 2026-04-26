const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://lawyermarketing.my';

const extractIds = (filePath, regex) => {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf-8');
  const ids = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    if (match[1]) {
      ids.push(match[1]);
    }
  }
  return ids;
};

// Regex to capture the id field values safely
const idRegex = /id:\s*"([^"]+)"/g;

const services = extractIds(path.join(__dirname, '../src/app/data/services.ts'), idRegex);
const posts = extractIds(path.join(__dirname, '../src/app/data/posts.ts'), idRegex);
const pillars = extractIds(path.join(__dirname, '../src/app/data/pillars.ts'), idRegex);

const routes = [
  '',
  '/contact',
  '/blog',
  ...services.map(id => `/services/${id}`),
  ...posts.map(id => `/blog/${id}`),
  ...pillars.map(id => `/practice-areas/${id}`)
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${DOMAIN}${route}</loc>
    <changefreq>${route === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '' ? '1.0' : (route.startsWith('/services') || route.startsWith('/practice-areas') ? '0.9' : '0.8')}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap.trim());
console.log('✅ Sitemap generated successfully at public/sitemap.xml with ' + routes.length + ' URLs.');
