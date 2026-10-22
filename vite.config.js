import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { SITE_URL } from './site.config.js';
import { profile } from './src/data/profile.js';

// Fills %SITE_URL% and %JSON_LD% in index.html, and emits robots.txt + sitemap.xml,
// so the public address only has to be set once in site.config.js.
function siteMeta() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.title,
    email: `mailto:${profile.email}`,
    url: SITE_URL,
    image: `${SITE_URL}${profile.photo}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Dhaka', addressCountry: 'BD' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: profile.university },
    sameAs: [profile.socials.github, profile.socials.linkedin],
  };

  return {
    name: 'site-meta',
    transformIndexHtml(html) {
      return html
        .replaceAll('%SITE_URL%', SITE_URL)
        .replace('%JSON_LD%', JSON.stringify(jsonLd).replaceAll('<', '\\u003c'));
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
      });
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE_URL}/</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url>
</urlset>
`,
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), siteMeta()],
});
