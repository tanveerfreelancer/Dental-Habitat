# Dental Habitat design system, v0.1

The live version is `design-system.html` (run `npm run dev`). This file is the written spec.

## Direction

Calm, precise, trustworthy. Deep petrol navy-teal, one soft aqua accent, white and cool grey.
The signature shape is the **arch**: the dental arch and the doorway of a habitat. It appears in the logo mark, the swatch tabs and hero/about imagery, and nowhere else.
Structure comes from hairlines, split layouts and tinted bands, not from stacks of rounded cards.

## Colour

| Role | Token | Hex |
| --- | --- | --- |
| Primary action | brand-800 (hover 700, pressed 900) | #0E3B51 |
| Deep surface | brand-900, footer brand-950 | #092B3C, #051C29 |
| Links | brand-600 | #1B6180 |
| Accent on dark | aqua-300 | #7CDCC0 |
| Accent text on light | aqua-700 | #1B6C55 |
| Page background | white | #FFFFFF |
| Alternate background | slate-50 | #F5F8FA |
| Hairlines | slate-200 | #DFE7EC |
| Headings / body / muted | slate-900 / 700 / 600 | #131D25 / #35454F / #4C5E6B |
| Stars | star | #F0A81C |
| Errors | danger-600, text danger-700 | #B42318, #912018 |

Full 50 to 950 scales are in `tokens.js`. The default Tailwind palette is disabled. Body-size text must reach 4.5:1; every pairing used is measured in the style guide. `slate-400` and `aqua-600` are decoration only.

## Typography

Headings: **Plus Jakarta Sans** 600/700. Everything else: **Inter** 400/500/600. Both are self-hosted variable fonts (`public/fonts/`), preloaded, each with a metric-matched fallback so text does not shift when the font loads (`src/styles/fonts.css`).

| Step | Size (px, fluid) | Line | Weight | Tracking |
| --- | --- | --- | --- | --- |
| H1 | 36 → 56 | 1.08 | 700 | -0.035em |
| H2 | 28 → 44 | 1.15 | 700 | -0.025em |
| H3 | 20 → 24 | 1.30 | 600 | -0.015em |
| H4 | 18 | 1.40 | 600 | -0.01em |
| Lead | 17 → 20 | 1.60 | 400 | 0 |
| Body | 16 | 1.65 | 400 | 0 |
| Small | 14 | 1.55 | 400 | 0 |
| Caption | 13 | 1.40 | 500 | 0.01em |
| Button | 15 | 1.25 | 600 | 0.005em |

Fluid steps use `clamp()`, so they scale smoothly from 320px to their maximum (H1 reaches 56px at about 1230px). Body is never below 16px, which also stops iOS zooming into inputs. Line length stays under 65 characters.

## Spacing and layout (8px system)

- Scale: 8, 16, 24, 32, 40, 48, 64, 80, 96, 128. Half-steps of 4px for optical fixes only.
- Container: 1200px content, gutters 16 / 24 / 32 / 40px at 320 / 375 / 768 / 1024.
- Section spacing: 64px (phones), 96px (from 768), 128px (from 1280). Set once as `--section-y`.
- Header height: 64px on phones, 72px from 768, condensing to 64px once the page scrolls.
- Grid: 4 columns (phones), 8 (tablets), 12 (from 1024). Gaps 16 / 24 / 32px.
- Card padding: 24px, 32px from 768. Buttons and inputs: 40 / 48 / 56px high.

## Shape, depth, motion

- Radius: sm 6 (tiny), **md 10 (controls)**, **lg 16 (surfaces)**, xl 28 (feature imagery), arch (imagery only).
- Shadows are for floating things only: menus, the mobile action bar. Cards use a hairline border.
- Focus: 2px ring, 3px offset, brand-500 (aqua-300 on dark). Inputs also get a soft 4px halo.
- Motion answers an action (hover, press, open, close). 200ms, ease-out; accordion 300ms. Nothing animates on its own; one hero moment is planned. Everything collapses to instant under `prefers-reduced-motion`.

## Components (`src/components/ui`)

Button (primary, secondary, accent, ghost, outline-inverse; sm/md/lg), TextLink, Badge, Rating and Stars, Card (outline, tint, inverse, floating), Field with Input, Textarea, Select, Accordion, SectionHeading, Section, Container, Grid, Media, IconTile, Icon, Logo. Layout: Header, Footer, MobileActionBar.

Interaction states: hover changes colour or border only (no lift, no scale); pressed goes one step darker; disabled is 50% opacity and non-interactive; focus-visible is always shown for keyboard users.

## Responsive plan

| Width | Columns | Decision |
| --- | --- | --- |
| 320 | 4 | One column. Full-width buttons. Sticky call and book bar. |
| 375 | 4 | Same structure with 24px gutters. Hero media below the actions as a 4:5 arch. |
| 430 | 4 | Two buttons can sit side by side. Rating and review count share a row. |
| 768 | 8 | Split layouts appear. Two-column lists. Header gains the booking button. Bottom bar retires. |
| 1024 | 12 | Inline navigation. Asymmetric 5 / 7 splits. Three-column lists. |
| 1280 | 12 | Content at its 1200px maximum. Section spacing 128px. |
| 1440+ | 12 | Container stops growing. Extra width becomes margin. Tinted bands may run edge to edge. |

Tailwind screens: `xs` 375, `sm` 430, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1440. Unprefixed = 320. These replace Tailwind's defaults.

## Header and hero (built in step 2)

**Header** (`components/layout/Header.jsx`). Sticky, white, hairline border; gains a soft shadow and condenses 72 → 64px on scroll. Active link is tracked with an IntersectionObserver (`aria-current="location"`).

| Width | Layout |
| --- | --- |
| below 768 | Logo, call icon (44px), menu button. Full-screen drawer with staggered links, Book Appointment and Call. |
| 768 to 1023 | As above, plus the Book Appointment button. |
| 1024 to 1279 | Inline navigation (14px links), call icon, Book Appointment. |
| 1280+ | Inline navigation (15px links), phone number, Book Appointment. |

The drawer stays mounted so it can animate; it is `inert` and invisible when closed. Escape closes it, focus moves in on open and back to the button on close, page scroll locks while open, and it closes itself if the screen widens to desktop. The phone-only Call / Book bar slides up only after the hero has scrolled away, so it never duplicates the hero buttons.

**Hero** (`sections/Hero.jsx`, parts in `sections/hero/`). The only H1 on the page. Copy is fixed by the brief; rating, review count, phone and area come from `site.js`. Text column first, image second on every screen. 7 / 5 columns at 1024, 6 / 6 from 1280, 4 / 4 on tablets, stacked on phones. Buttons stack on phones and tablets, sit side by side (and wrap if they must) from 1024.

Motion: text rises in with a 90ms stagger, the arch image eases up, the two floating panels arrive last and then drift 6px. Everything is CSS, and everything collapses to instant under `prefers-reduced-motion`.

**Hero image.** No photography exists yet, so `HeroVisual.jsx` draws an illustration in brand tokens. To use a real photo, set `heroImage: { src, alt }` in `site.js`. The `alt` must describe the actual photo. It is cropped to the arch automatically; use a portrait crop (4:5).

**Booking target.** Every Book Appointment button points to `#appointment`, an anchor at the top of the Contact section (`sections/Contact.jsx`). Keep it there when that section is built.

## About and Why Choose Us (built in step 3)

Copy lives in `src/content/about.js` and `src/content/whyChooseUs.js`, separate from the components, so it can be edited without touching layout. Both files are marked DRAFT: they describe intentions and the supplied facts (location, phone) and claim no qualifications, experience, awards or equipment. The clinic should confirm every line.

**About** (`sections/About.jsx`). Arch image left, text right (5 / 6 columns from 1024, 4 / 4 on tablets). On phones the text comes first, so the page never shows two images back to back. A ruled address and phone block and a Google Maps link carry the location message with real data. Photo slot: `site.aboutImage`.

**Why Choose Us** (`sections/WhyChooseUs.jsx`). Six items as a ruled grid rather than boxes: 1 column on phones (icon beside text), 2 on tablets (icon above), 3 from 1024. Hover or keyboard focus draws an aqua hairline across the top and inverts the icon tile (`IconTile tone="interactive"`, used inside a `group`). Items can carry one quiet `action` link.

## Services (built in step 4)

`sections/Services.jsx`, copy in `src/content/services.js`. Six treatments as one joined grid of cells drawn with hairlines (1px gaps on a slate-200 base), not six floating rounded cards: 1 column on phones (icon beside text), 2 on tablets, 3 from 1024. Hover tints the cell, inverts the icon tile (`IconTile tone="interactive"`) and draws an aqua rule along the bottom edge. Keep the item count a multiple of 6 (or 2 and 3) so no empty grey cell shows.

The six names were supplied by the clinic. The descriptions are drafts that explain what each treatment is and claim nothing about results, comfort, speed, equipment, practitioners or prices. The clinic should confirm them.

"View All Services" sits opposite the heading from 1024px and below the grid on smaller screens. There is no services page yet, so it points to `#appointment`. Change `cta.href` in `services.js` when a page exists.

## Why Choose Us + Trust (built in step 5)

`sections/WhyChooseUsTrust.jsx` replaces the step 3 version in the registry (`sections/index.js`). The earlier `sections/WhyChooseUs.jsx` is kept on disk, unused; swap the import back to restore it. Both share the `#why-us` anchor and nav entry, so they can never appear together.

The first deep-navy band on the page (`Section tone="brand"`). Heading on the left, sticky from 1024px so it stays in view while the six features scroll past. Features are an open ruled list on the right: outlined aqua icon, white title, slate-300 text; one column on phones, two from 768. Then the trust strip: Google rating (4.3/5 with stars), review count with a link to Google, and location. Three columns from 768, label-left / value-right rows on phones. It is a semantic `<dl>`, and every figure comes from `site.js`.

Motion, all disabled under `prefers-reduced-motion`: the features and the trust strip rise in with a 90ms stagger as they scroll into view (`hooks/useReveal.js`), and on hover or keyboard focus a feature draws an aqua hairline and its icon tile fills aqua (`IconTile tone="onDark"`). The reveal fails safe: content is only hidden if JavaScript runs, IntersectionObserver exists, motion is allowed and the element is below the fold; anything on screen, or any failure, stays visible.

Copy is unchanged from step 3 (`content/whyChooseUs.js`); labels are in `content/trust.js`. Re-check the rating and count against the Google listing before launch.

## Google Reviews (built in step 6)

`sections/Reviews.jsx`, gauge in `sections/reviews/RatingArch.jsx`, copy in `src/content/reviews.js`. **No review text and no patient names exist anywhere in the project**, because none have been supplied, so this is a rating-focused layout: the real aggregate rating and count (from `site.js`), and a "View Reviews on Google" button that opens the Google listing in a new tab.

The visual is the brand arch drawn as a gauge that fills to rating / scale (4.3 of 5 = 86%), with the numeral, stars and count inside. It is one SVG stroke using `pathLength="100"`, so the fill percentage is computed, never hard-coded. There is no star-by-star breakdown because none has been supplied. The three trust points describe how Google reviews work (independent platform, read in full, add your own) and make no claim about the clinic.

Layout: phones stack heading, arch, then button and points. Tablets put the arch beside the button and points. From 1024 the text is on the left and the arch on the right.

Motion, all disabled under `prefers-reduced-motion`: as the section scrolls into view the outline draws up and over the arch (about 1.4s, eased), then the numeral, the five stars (one after another) and the count rise into place. Uses `hooks/useReveal.js`, so nothing is hidden if JavaScript fails or the section is already on screen.

Adding real reviews later: only with the clinic's permission, verbatim, attributed as Google shows them, and never edited. Ask before building that variant.

## FAQ and Appointment CTA (built in step 7)

**FAQ** (`sections/Faq.jsx`, copy in `src/content/faq.js`). Heading on the left (sticky from 1024px), the design-system `Accordion` on the right: ruled rows, one answer open at a time, the first open by default, real buttons (Enter and Space work), closed answers hidden from keyboard focus. Answers can carry bullets, a closing note and a link. Draft answers use only supplied facts (phone, address, map link) and hedged general guidance; they state no hours, email, prices or policies. **The last answer (checkup frequency) is medical-adjacent general guidance the clinic must confirm or replace.** No FAQ schema is emitted, by design (see SEO above).

**Appointment CTA** (`sections/Contact.jsx`, copy in `src/content/appointment.js`). One deep-navy panel inside a light band, so it stays distinct from the footer: the question, two buttons, and the address with a Google Maps link. Holds the `#appointment` anchor: every Book Appointment button on the page scrolls to this panel. Only one booking channel has been supplied (the phone), so **both buttons dial `tel:+923091459068`**. If the clinic gets an online booking page, set `bookingUrl` in `src/config/site.js` and the primary button opens it in a new tab instead. There is no form, no email and no WhatsApp link because none exist, and no opening hours are shown.

Layout: phones stack everything with full-width buttons; from 1024 the message and buttons sit left and the address sits right behind a hairline. The panel rises in as it scrolls into view (`useReveal`, disabled under reduced motion).

**Mobile action bar.** The phone-only Call / Book bar now steps aside once the appointment section is reached (and stays away over the footer), because that panel offers the same two actions.

## Contact + Location (built in step 8)

`sections/Visit.jsx` (id `visit`, after the appointment panel), parts in `sections/visit/`, copy in `src/content/visit.js`. Not in the header nav or footer, so nothing else on the page changed. Heading "Visit Dental Habitat"; the address and phone from `site.js`; **Call Now** (`tel:+923091459068`) and **Get Directions** (the supplied Google Maps link, new tab); a map area; and the appointment request form. No email and no opening hours are shown, because none were supplied.

Layout: phones stack details and buttons, map, then form. Tablets put details and map side by side with the form full width below. From 1024 details and map stack on the left and the form sits on the right. The map and form fade up as they scroll into view (`useReveal`, disabled under reduced motion).

**Map.** `map.embedUrl` is null, so a drawn placeholder shows: a quiet flat map with a pulsing pin, no street names, labelled "Illustration only", linking to the real Google listing. To use the live map: Google Maps > the clinic > Share > Embed a map > copy the iframe `src` into `map.embedUrl`. It then renders a lazy iframe instead.

**Form.** Fields: Name and Phone (required), Email, Service, Preferred Date, Message (optional). Validation (`sections/visit/validate.js`, unit tested) runs on submit with plain-language messages, moves focus to the first problem, and clears each error as the field is edited. States: idle, sending (button disabled, no double submits), error (form and values kept, phone number offered), success, and unconnected.

**The form is not connected to anything yet, on purpose.** There is no clinic email and no form service. Until `VITE_CONTACT_ENDPOINT` is set, a valid submission shows "Please call to book", says plainly that nothing was sent, and offers the number. It never claims delivery. To connect it, set `VITE_CONTACT_ENDPOINT` at build time (see `.env.example`) to any service that accepts a JSON POST (Formspree, Getform, a Netlify function, your own API), for example `https://formspree.io/f/<your-form-id>`. It sends `{ name, phone, email, service, preferredDate, message, sentFrom }`. A hidden honeypot field stops simple bots. Test with a real submission before launch, and decide who receives requests and how quickly they are answered. Wording promises no reply time.

## Final production pass (step 9)

**Rendering.** `npm run build` pre-renders `/`, `/privacy/` and `/terms/` to static HTML (`scripts/prerender.mjs`,
`src/entry-server.jsx`) and inlines the stylesheet (about 9 kB gzipped), so first paint no longer waits on a second
request. React then hydrates the existing markup (`src/main.jsx`). Anything that differs between build time and the
browser must be set after mount (the footer year is `suppressHydrationWarning`; the form's minimum date is set in an
effect), otherwise hydration mismatches. In development the page renders client-side as before.

**Fonts.** Self-hosted, preloaded, with fallbacks whose `size-adjust` and metric overrides are computed from the real
font metrics. Zero third-party requests. Fonts are the unmodified Fontsource Latin files.

**Pages.** Privacy Policy and Terms of Use (`src/legal/`, copy in `src/content/legal.js`) and a static `404.html`.
Header and footer take a `homeHref` prop ('' on the homepage, '/' elsewhere) so in-page anchors work from any page.
Footer: brand and rating, quick links, the six services, address, phone, Google Maps link, copyright, legal links.

**Images.** `scripts/optimize-images.mjs` and `images.config.json` turn the clinic's untouched originals into AVIF, WebP
and JPEG sets (orientation applied, focal-point crop, no enlarging, metadata stripped, no sharpening or filtering).
`Media` renders them as `<picture>` with real dimensions, `sizes`, a placeholder colour, eager and high-priority for the
hero, lazy otherwise. No photos were supplied, so the illustrations remain.

**Accessibility fixes made during the pass.** Reduced motion now also zeroes animation delays (staggered entrances
used to wait invisibly). The open mobile menu makes `main`, `footer`, the skip link and the action bar inert, so
focus cannot escape behind it. The date input's calendar button has its own focus ring. Standalone text links have a
24 px minimum height (WCAG 2.2). The mobile Call / Book bar is a labelled `<nav>` and decides its visibility from
scroll position, so jumping straight to the bottom cannot leave it covering the footer. `<main>` is a focusable skip
target. Header and bar no longer use `backdrop-blur` (visually identical at 95% white, costly on low-end phones).

**SEO.** Description rewritten to read naturally while covering "dentist in Garden Town, Lahore", "dental clinic" and
"Lahore". Legal pages are indexable and in the sitemap. `Dentist` schema gained `description`. The phone number uses a
non-breaking space on screen so it never wraps; meta and schema use a plain space and the E.164 form.

## Clinic Information & Amenities (built in step 10)

`sections/ClinicInfo.jsx` (id `clinic-info`), after Contact + Location and before the footer. Not in the nav or footer.
It is a compact, icon-based summary of the clinic's **verified Google Business Profile details, and nothing else**.

- **Facts** live in `site.js` → `businessProfile`, exactly as listed: Accessibility (wheelchair accessible entrance,
  parking lot, restroom, seating), Services (onsite services), Amenities (restroom), Planning (appointments
  recommended), Payments (debit cards, credit cards), Children (nursing room). **Add nothing there that is not on the
  profile.**
- **Presentation** (headings, one icon per item) lives in `src/content/clinicInfo.js`. An item with no icon listed there
  falls back to a plain check mark, so a new fact can never break the layout. Icons were chosen so none implies
  something not on the profile (there is no cash or wallet symbol, because cash is not listed).
- **Layout.** Accessibility is the featured group: its own panel, one item per row with an icon tile. The other five
  groups are ruled rows: a label, then icon chips. Phones stack everything; from 768 the panel sits beside the rows.
  Both blocks fade up as they scroll into view (`components/ui/Reveal.jsx`, built on `useReveal`, disabled under
  reduced motion and fail-safe).
- **Schema.** The `Dentist` JSON-LD gains `amenityFeature` for the six physical features (four accessibility items,
  restroom, nursing room) and `paymentAccepted`. Onsite services and appointments-recommended are shown on the page but
  not put in the schema because they do not map cleanly onto schema.org.
- A small caption states the source: "Details as listed on our Google Business Profile."

## Real photography (step 11)

Three slots use the clinic's own photos: hero (arch), About (arch) and Contact + Location (4:3). Media is unchanged in
look: the arch stays the signature shape for hero and About imagery. No filters, overlays or tints are applied to any
photo, and the pipeline never enlarges or retouches (`scripts/optimize-images.mjs`).

The location photo replaces the drawn map placeholder, keeps the same white label linking to Google Maps, and the
`map.embedUrl` option still takes priority if a live map is added later. On phones (below 430 px) the label is a bar
under the photo, so it never hides the sign; from 430 px it floats over the photo's lower edge.

Performance behaviour: `<picture>` with AVIF, WebP and JPEG; `sizes` matched to the arch and frame widths; real
width/height; the dominant colour shows while a photo loads; the hero is eager and `fetchpriority="high"`; every other
photo is lazy and `fetchpriority="low"`. Layout shift from images is 0.

## Champagne gold accent (step 12)

A single restrained accent added on top of the finished site: **gold-500 `#C6A15B`**, plus a short generated scale in
`design/tokens.js` for consistency with the other palettes. It is not a primary colour: it never fills a background,
a button, or body text. Six places carry it, all decorative:

| Where | Token | What changed |
| --- | --- | --- |
| Review stars, everywhere they appear (hero, footer, the Reviews gauge) | `star` (now `gold-500`) | The star fill, which was amber, is champagne gold. One token, so every star on the site updated together. |
| Hero eyebrow separator dot | `gold-500` | The one small decorative dot on the site (between "Modern dental care" and the area name). |
| The two floating hero cards (rating, review count) | `gold-400` | A 32px, 1px hairline across the top of each card — a small "trust mark," not a border. |
| Clinic Information's featured Accessibility panel | `gold-400` | The same hairline mark, 40px, signalling it's the featured group. |
| Icon tiles on hover or keyboard focus (`IconTile` tones `interactive` and `onDark`, used across Services, Why Choose Us and Clinic Information) | `gold-400` at 60–70% opacity | A 1px ring layered on top of the existing navy/aqua hover transition. Pure `box-shadow`, so it adds no layout size and is invisible at rest. |
| `Badge` component | `gold-400` / `gold-700` | A new hairline-only `gold` variant, for a small premium badge if one is ever needed. Not used on the live page yet, so it introduces no new content. |

Contrast: gold-500 on white is 2.43:1 (an improvement on the previous star colour's 2.03:1); on brand-900 it is
6.08:1. Every gold use above is decorative (stars are `aria-hidden`, paired with a `sr-only` sentence; the hairline
marks and hover ring carry no information on their own), so none of it is a WCAG text-contrast requirement, and the
change was verified to add zero layout shift: every one of the 744 elements on the page keeps its exact pixel
position (only 3 new, near-zero-size decorative marks were added).

## Floating WhatsApp button (step 13)

`components/layout/WhatsAppButton.jsx`, mounted once in `App.jsx` (homepage) and `legal/LegalPage.jsx` (Privacy,
Terms), plus a hand-written equivalent in the static `public/404.html`. Present on every page, fixed bottom-right.

The link is built from the same verified phone number already in `site.js` (`whatsappHref()` in `config/site.js`),
so no second number exists anywhere in the project. It opens `wa.me` in a new tab with a short prefilled message
(`content/whatsapp.js`, easy to edit) that the visitor can change before sending.

This is additive, not a replacement: the existing `tel:` links and the mobile Call button are untouched, so a
visitor can still phone the clinic directly. WhatsApp's own green (`#25D366`) is used only for this one button, as
the platform's recognised colour — it is not part of the site's own navy/white/teal/gold palette and appears
nowhere else.

Positioning notes: on phones it sits above the sticky Call/Book bar (`bottom-24`, vs `bottom-6` on larger screens).
It is wrapped in its own `<nav aria-label="WhatsApp contact">` landmark, like the Call/Book bar, so it is never a
link floating outside every landmark on the page (axe's "region" rule). It carries `data-action-bar`, the same
attribute the Call/Book bar uses, so the header's existing logic makes it inert while the mobile menu is open, and
it sits at a z-index below the open drawer so it is also visually covered, not floating on top of the nav. The
footer's legal-links row (`components/layout/Footer.jsx`) gained a small right-side clearance at the two
breakpoints where the button would otherwise sit over "Terms of Use" once the page is scrolled to its true end
(`md:pr-20 2xl:pr-0`); this is the only change to an existing section, and it is a spacing-only fix made necessary
by adding the new floating button, not a redesign of the footer.

## Layout language

```
Hero, desktop (12 col)                     Hero, phone
+---------------------------------+        +----------------------+
| headline (7)         |  arch (5) |        | headline             |
| lead                 |  photo    |        | lead                 |
| [Book] [Call]        |           |        | [Book an appointment]|
| ★ 4.3  52 Google     |           |        | ★ 4.3  52 Google     |
+---------------------------------+        |   ( arch photo )     |
                                           +----------------------+
Ruled list (services, why us)              [Call] [Book]  sticky bar
----------------------------------
Title (4)      | Description (8)
----------------------------------
Title          | Description
----------------------------------
```

## Site structure

One page, seven sections, in order: Home (hero), About, Services, Why Choose Us, Reviews, FAQ, Contact and appointment. Each is a scaffold in `src/sections`. The header shows the first five plus a booking button; Contact is reached through the button, the mobile menu and the footer. Promoting any section to its own route later is straightforward; do it only if the clinic has enough content to make a page worth indexing.

## SEO

Generated at build time by `tools/vite-plugin-seo.js` from `src/config/site.js`, so it is in the static HTML.

- Title (53 chars) and meta description (135 chars): drafts built only from supplied facts.
- Canonical, og:url, sitemap.xml, schema url: emitted only when `SITE_URL` is set. The build warns until then. Nothing is guessed.
- Open Graph and Twitter tags. og:image is added when `site.ogImage` is set.
- `Dentist` JSON-LD: name, phone, address, map link. Hours, email, logo and sameAs are added automatically when supplied.
- `aggregateRating` is off by default (`schema.includeAggregateRating`). Google does not show rich results for a business marking up its own ratings.
- FAQ schema is intentionally omitted: FAQ rich results are limited to a small set of authoritative sites.
- Semantics: one H1 (hero), one H2 per section, landmarks for header, nav, main, footer, `aria-labelledby` on sections, skip link.
- Name, address and phone are also in a `<noscript>` block and the footer.
- Pre-rendering (added in the final pass): every page is rendered to static HTML at build time, so crawlers and visitors receive the content in the first response. Fonts are self-hosted. See the final-pass section below.

## Accessibility baseline

Skip link, visible focus, 44px touch targets on mobile controls, 16px form text, labelled fields with programmatic hints and errors, real buttons for disclosure, reduced-motion support, AA contrast on every pairing used.

## Not supplied (nothing invented)

Domain, logo, opening hours, email, social accounts, dentists and qualifications, services list, FAQ answers, review text, photography, OG image. The logo currently in use is a placeholder mark.
