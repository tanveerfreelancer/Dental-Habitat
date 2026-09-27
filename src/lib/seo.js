/**
 * SEO builders. Pure functions: they run at build time (tools/vite-plugin-seo.js) so the
 * output is static HTML that crawlers see without executing JavaScript, and in the style
 * guide so the output can be previewed.
 */
import { site, seo, addressLine } from '../config/site.js';
import { legal } from '../content/legal.js';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const abs = (siteUrl, path) => (siteUrl && path ? `${siteUrl}${path.startsWith('/') ? '' : '/'}${path}` : null);

/** schema.org Dentist (a LocalBusiness subtype). Only includes fields that have real values. */
export function buildDentistSchema(siteUrl = null) {
  const a = site.address;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    ...(siteUrl && { '@id': `${siteUrl}/#dentist`, url: siteUrl }),
    name: site.name,
    description: seo.description,
    telephone: site.phone.e164,
    ...(site.email && { email: site.email }),
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${a.line1}, ${a.area}`,
      addressLocality: a.city,
      ...(a.region && { addressRegion: a.region }),
      postalCode: a.postalCode,
      addressCountry: a.countryCode,
    },
    hasMap: site.google.mapsUrl,
    ...(site.businessProfile && {
      // Only attributes that map cleanly onto schema.org: physical features and accepted payment types.
      amenityFeature: [...site.businessProfile.accessibility, ...site.businessProfile.amenities, ...site.businessProfile.children].map((name) => ({
        '@type': 'LocationFeatureSpecification',
        name,
        value: true,
      })),
      paymentAccepted: site.businessProfile.payments.join(', '),
    }),
    ...(abs(siteUrl, site.logo) && { logo: abs(siteUrl, site.logo) }),
    ...(abs(siteUrl, site.ogImage) && { image: abs(siteUrl, site.ogImage) }),
    ...(site.hours && {
      openingHoursSpecification: site.hours.map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      })),
    }),
    ...(Object.values(site.socials).filter(Boolean).length && { sameAs: Object.values(site.socials).filter(Boolean) }),
    ...(site.schema.includeAggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: site.google.rating,
        bestRating: site.google.scale,
        reviewCount: site.google.reviewCount,
      },
    }),
  };
  return schema;
}

/** All <head> tags for the home page, as an HTML string. */
export function buildHeadTags(siteUrl = null) {
  const image = abs(siteUrl, site.ogImage);
  const tags = [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    `<meta name="robots" content="index,follow,max-image-preview:large" />`,
    siteUrl && `<link rel="canonical" href="${esc(siteUrl)}/" />`,
    `<meta name="theme-color" content="#0E3B51" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    siteUrl && `<meta property="og:url" content="${esc(siteUrl)}/" />`,
    image && `<meta property="og:image" content="${esc(image)}" />`,
    image && `<meta property="og:image:alt" content="${esc(site.heroImage?.alt || `${site.name}, ${site.address.area}, ${site.address.city}`)}" />`,
    `<meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}" />`,
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    image && `<meta name="twitter:image" content="${esc(image)}" />`,
    `<script type="application/ld+json">${JSON.stringify(buildDentistSchema(siteUrl)).replace(/</g, '\\u003c')}</script>`,
  ];
  return tags.filter(Boolean).join('\n    ');
}

/** <head> tags for the Privacy Policy and Terms pages. Indexable (there is no benefit to hiding them) but not promoted. */
export function buildLegalHeadTags(page, siteUrl = null) {
  const d = legal[page];
  return [
    `<title>${esc(d.title)} | ${esc(site.name)}</title>`,
    `<meta name="description" content="${esc(d.description)}" />`,
    `<meta name="robots" content="index,follow" />`,
    siteUrl && `<link rel="canonical" href="${esc(siteUrl)}/${page}/" />`,
    `<meta name="theme-color" content="#0E3B51" />`,
  ]
    .filter(Boolean)
    .join('\n    ');
}

/** Plain-HTML name, address and phone for crawlers and no-JS visitors. */
export const buildNoscript = () =>
  `<noscript><p>${esc(site.name)}, ${esc(addressLine())}. Phone: <a href="tel:${esc(site.phone.e164)}">${esc(site.phone.display)}</a></p></noscript>`;

export const buildRobotsTxt = (siteUrl) =>
  `User-agent: *\nAllow: /\n${siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml\n` : ''}`;

export const buildSitemapXml = (siteUrl) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  ['/', '/privacy/', '/terms/'].map((path) => `  <url><loc>${esc(siteUrl)}${path}</loc></url>`).join('\n') +
  `\n</urlset>\n`;
