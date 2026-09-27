/**
 * Injects SEO tags into index.html at build time from src/config/site.js, and emits
 * robots.txt (+ sitemap.xml once a domain is set). Static output = no JavaScript needed
 * for crawlers to read the title, description, canonical, Open Graph and schema.
 *
 * The style guide page (design-system.html) is always noindex.
 */
import { loadEnv } from 'vite';
import { site } from '../src/config/site.js';
import { buildHeadTags, buildLegalHeadTags, buildNoscript, buildRobotsTxt, buildSitemapXml } from '../src/lib/seo.js';

export function seoPlugin() {
  let siteUrl = null;
  let isSsrBuild = false;

  return {
    name: 'dental-habitat-seo',

    configResolved(config) {
      isSsrBuild = Boolean(config.build.ssr);
      const env = loadEnv(config.mode, config.root, '');
      const raw = env.SITE_URL || site.url || '';
      siteUrl = raw ? raw.replace(/\/+$/, '') : null;
    },

    buildStart() {
      if (!siteUrl && !isSsrBuild) {
        this.warn(
          'SITE_URL is not set, so canonical, og:url, sitemap.xml and the schema url are omitted. ' +
            'Set SITE_URL=https://your-domain (see .env.example) once the domain is confirmed.',
        );
      }
    },

    transformIndexHtml(html, ctx) {
      const where = ctx.path || ctx.filename || '';
      const legalPage = /[\\/](privacy|terms)[\\/]/.exec(where)?.[1];
      const isStyleGuide = /design-system/.test(where);
      let head;
      if (isStyleGuide) head = '<title>Dental Habitat design system</title>\n    <meta name="robots" content="noindex,nofollow" />';
      else if (legalPage) head = buildLegalHeadTags(legalPage, siteUrl);
      else head = buildHeadTags(siteUrl);
      const showNoscript = !isStyleGuide && !legalPage;
      return html
        .replace('<!-- seo:head -->', head)
        .replace('<!-- seo:noscript -->', showNoscript ? buildNoscript() : '');
    },

    generateBundle() {
      if (isSsrBuild) return;
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: buildRobotsTxt(siteUrl) });
      if (siteUrl) this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buildSitemapXml(siteUrl) });
    },
  };
}
