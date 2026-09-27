# Dental Habitat website

Static website for Dental Habitat, a dental clinic at 14 New, Tipu Block, Garden Town, Lahore 54660.
React 19, Vite, Tailwind CSS 3, Lucide icons. Pre-rendered to static HTML at build time, then hydrated.

**Before you launch, read `docs/LAUNCH_CHECKLIST.md`.** Three things need your input: the domain, a form
endpoint, and a legal review of the two policy pages.

## Run it

```bash
npm install
npm run dev                # site at /, style guide at /design-system.html
npm run build              # production build → dist/  (deploy this folder)
npm run preview            # serve dist/ locally
npm run images             # process photos (see "Adding real photos")
npm run build:styleguide   # production build + the style guide, for internal sharing
```

Needs Node 20 or newer. `npm run build` does four things: processes any photos, builds the browser bundle, builds
a server bundle, then pre-renders every page to HTML with the stylesheet inlined (`scripts/prerender.mjs`).

## Pages

| URL | What it is |
| --- | --- |
| `/` | Homepage: hero, About, Services, Why Choose Us + trust, Google Reviews, FAQ, appointment panel, Contact + Location, Clinic Information & Amenities |
| `/privacy/`, `/terms/` | Privacy Policy and Terms of Use (short, factual drafts; see the launch checklist) |
| `/404.html` | Not-found page (Netlify, Cloudflare Pages and GitHub Pages use it automatically) |

## Where to edit things

| To change | Edit |
| --- | --- |
| Phone, address, rating, review count, Maps link, hours, email, socials | `src/config/site.js` (nowhere else) |
| Clinic information and amenities (the verified facts) | `src/config/site.js` → `businessProfile`. Icons and headings: `src/content/clinicInfo.js` |
| Meta title and description | `src/config/site.js` → `seo` |
| Section order, nav labels | `src/config/sections.js` |
| WhatsApp button text and link | `src/content/whatsapp.js` (number comes from `site.js`, never edited separately) |
| The gold accent (stars, hairline marks, hover ring) |  `src/design/tokens.js` → `colors.gold` and `colors.star` |
| Colours, type scale, breakpoints, spacing, radius, shadows | `src/design/tokens.js` |
| Copy for each section | `src/content/*.js` (about, services, whyChooseUs, trust, reviews, faq, appointment, visit, clinicInfo, legal) |
| Layout of a section | `src/sections/<Name>.jsx` |
| The domain (canonical URL, sitemap, schema url) | `SITE_URL` in `.env` |
| **Make the appointment form actually send** | `VITE_CONTACT_ENDPOINT` in `.env` |
| Live Google Map instead of the drawn placeholder | `map.embedUrl` in `src/content/visit.js` |
| Photos (replace the two illustrations) | see below |

Copy in `src/content/` is draft text that describes intentions and supplied facts only. The clinic should confirm it.

## Photos

The site uses the clinic's real photographs. Two source files live in `src/assets/originals/`, untouched and
byte-identical to what was supplied:

| Original | Used for | Crop (`images.config.json`) |
| --- | --- | --- |
| `clinic-interior.jpg` (panorama of the treatment room) | **Hero** (left part: dental chair, light, plant), **About** (centre part: seating, mirror, rug), and the **social-share image** | 4:5 arch, 4:5 arch, 1200 × 630 |
| `clinic-exterior.jpg` (street view of the entrance) | **Contact + Location** (sign and gate), linking to Google Maps | 4:3, tightened 1.6x |

`npm run images` (also run automatically before every build) turns them into AVIF, WebP and JPEG sets in
`public/images/`. It applies orientation, crops around a focal point, resizes and re-encodes. It never sharpens,
filters, recolours, retouches or enlarges, and it strips hidden metadata such as GPS location. Visitors download one
small file (a 375 px phone fetches about 31 KB for the hero).

**To change or add a photo:** put the untouched original in `src/assets/originals/`, add or edit its slot in
`images.config.json` (`ratio`, `focal` = where the crop is centred, optional `zoom`), run `npm run images`, then set
`heroImage`, `aboutImage`, `visitImage` or `ogImage` in `src/config/site.js`. Write alt text that describes what the
photo actually shows. The hero loads eagerly at high priority; other photos are lazy and low priority. Dimensions are
set, so nothing shifts. If an image is removed from `site.js`, the original illustration is used as a fallback.

**Photos supplied but deliberately not used:** see `docs/PHOTO_DECISIONS.md`.

## What is in the box

- **Fonts** are self-hosted (`public/fonts/`, licences included), preloaded, with metric-matched fallbacks so text
  does not jump when they load. No third-party font requests.
- **SEO** is generated at build time from `site.js` by `tools/vite-plugin-seo.js`: title, description, canonical,
  Open Graph, Twitter tags, `Dentist` JSON-LD, `robots.txt`, `sitemap.xml`. Domain-dependent tags stay absent until
  `SITE_URL` is set. Nothing is guessed.
- **Accessibility**: skip link, visible focus everywhere, labelled form, mobile menu that traps focus and makes the
  page behind it inert, reduced-motion support, WCAG AA contrast.
- **`public/_headers`** sets security headers and long caching for Netlify and Cloudflare Pages. Copy the equivalents
  into your server config on other hosts.

## Rules this project follows

- Only facts supplied by the clinic live in `site.js`. Unknown values are `null` and render nothing.
- Every image goes through `<Media>`, which requires alt text.
- Cards are the exception. Prefer ruled lists, split layouts and tinted bands.
- No gradients, no invented claims, no invented reviews or people.

More detail: `docs/DESIGN_SYSTEM.md` (design system and every section), `docs/QA_REPORT.md` (what was tested).
