# QA report (final production pass)

Run on the built site (`npm run build`, served by `vite preview`) in headless Chromium, 20 September 2026.
Every number below came from a script run in this pass. Test scripts are not shipped; the checks are described so
they can be repeated.

## Performance (Lighthouse 13, mobile = slow 4G with 4x CPU slowdown)

| | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Start of pass, mobile | 98 | 100 | 96 | 100 | 1.7 s | 1.8 s | 0 | 0 |
| **Final, mobile** | **98** | **100** | **100** | **100** | 1.5 s | 2.1 s | 0 ms | 0 |
| **Final, desktop** | **98** | **100** | **100** | **100** | 0.4 s | 0.5 s | 0 ms | 0 |
| Privacy Policy, mobile / Terms, desktop | 99 / 100 | 100 | 100 | 100 | | | | |

Notes. The starting numbers did not include fonts, because the test sandbox blocks Google Fonts; the final build
includes 75 kB of real, self-hosted fonts and the page is now fully pre-rendered. Real-browser first paint under the
same throttling improved from 1.5 s to 1.08 s after inlining the stylesheet. Lighthouse LCP is 2.1 s (good is under
2.5 s). The hero headline is counted as the largest paint only once its 700 ms entrance fade finishes; that animation
was kept as designed. Speed Index occasionally fails to compute on the first run after a server starts (score shows
0); a re-run gives 98. Weight: 192 KiB transferred, of which about 92 kB is gzipped JavaScript (React and the app).

## Accessibility

- axe-core (WCAG 2 A/AA, 2.1, 2.2 AA, best practice): **0 violations** across 15 page/state combinations: home at 5
  widths, mobile and tablet menu open, FAQ expanded, form showing errors, form "please call" panel, privacy and terms
  at two widths, and the 404 page.
- Independent contrast audit of every visible text element with true background compositing (about 165 per page at
  4 widths, plus legal and 404 pages): **0 below WCAG AA**. axe cannot sample text over the SVG rating arch; that text
  is on white and passes.
- Keyboard and focus, 18 checks: skip link visible and working, one full tab cycle of 64 stops all visible with a
  focus indicator, no zero-size stops, logical order, mobile menu contains focus and makes the page inert, Escape
  closes and restores focus, reduced motion disables every infinite animation and reveals all content immediately.
- Form labels, error messages linked with `aria-describedby`, `aria-invalid`, `role="alert"`, focus moved to the first
  error and to result panels.

## Functional (25 checks) and form (27 checks + 22 unit tests)

Every header nav link, the logo, all four "Book" entry points (hero, header, Services, Why Choose Us) landing on the
appointment panel, all mobile menu links, the mobile bar, all phone links (`tel:+923091459068`), all Google Maps
links (supplied listing, new tab, `noopener`), footer quick links, footer service links, legal pages both ways, and
"Back to the homepage".
The form was tested in both modes against a stand-in server: field validation, exact payload, double-submit
protection, server error, unreachable server, keyboard submission, honeypot, focus management, and the honest
"not sent" fallback when no endpoint is configured.

## Responsive and rendering

3 pages at 320, 375, 430, 768, 1024, 1280 and 1440 px, scrolled end to end: **no page-level or element-level
horizontal overflow, no undersized tap targets, no truncated text, CLS 0.0000, zero console messages, zero failed
requests** in all 21 combinations. Hydration is clean (no React warnings) and the page is interactive after hydrating.
A fresh clone (`npm ci && npm run build`) builds with no warnings to an 820 kB `dist/`.

## Bugs found and fixed in this pass

1. Reduced-motion users waited up to 1.15 s for staggered elements to appear (animation delays were not zeroed).
2. Tab focus could escape behind the open mobile menu (now inert; skip link included).
3. The date field's calendar button had no focus indicator.
4. Six standalone links were 22 px tall (WCAG 2.2 minimum is 24 px).
5. The mobile Call / Book bar could cover the footer after an instant jump to the bottom (observer never fired).
6. The mobile bar sat outside any landmark (now a labelled `<nav>`).
7. The map label truncated the address at 320 px.
8. Phone numbers could wrap across two lines.
9. Legal pages were `noindex`, which lowered their SEO score for no benefit.
10. Homepage content was absent from the raw HTML (client-rendered): now pre-rendered.
11. Fonts came from a third-party server: now self-hosted with metric-matched fallbacks.

## Not done, and why

- **Real clinic photos**: none were supplied. The image pipeline is built and was tested end to end with synthetic
  images (rotation, focal crop, no enlarging, metadata stripped, AVIF delivered, CLS 0), then those test files were
  removed. Illustrations remain.
- **Canonical URL and Open Graph URL/image**: need the domain and an image. Verified to switch on with `SITE_URL`.
- **A working form backend and real legal review**: need the clinic (see `LAUNCH_CHECKLIST.md`).
- **Lighthouse on real devices and a real network**: the numbers above are lab measurements from a sandbox.

## Addendum: Clinic Information & Amenities section (step 10)

Re-ran the full suite on the finished site with the new section in place: axe 0 violations (15 page/state
combinations); contrast 0 failures (187 text elements at 1440 px, 178 at 320 px); keyboard, focus and reduced motion
18/18; navigation and CTAs 25/25; responsive sweep 21/21 clean (no overflow, CLS 0, no console output); hydration
clean; Lighthouse mobile 98 / 100 / 100 / 100 (FCP 1.5 s, LCP 2.1 s, TBT 0, CLS 0; 196 KiB transferred).
Content check: every word in the section is a verified Google Business Profile detail or a fixed heading, and the
schema `amenityFeature` list equals the six physical features exactly. All 52 existing section, component, content,
hook and legal-page files are byte-identical to before; only the section registry, the section list, `site.js`,
`lib/seo.js` and the docs were edited, and two files added (`Reveal.jsx`, `clinicInfo.js`).

## Addendum: real photography (step 11)

Three real photos added (hero, About, Contact + Location) plus a social-share image. Full suite re-run with the photos
in place: axe 0 violations (15 page/state combinations); contrast 0 failures; keyboard, focus and reduced motion 18/18;
navigation and CTAs 25/25; responsive sweep 21/21 clean (no overflow, CLS 0.0000, no console output); hydration clean;
alt text present on all three photos (112 to 116 characters, no empty alt).
Images: originals verified byte-identical to the supplied files; browsers receive AVIF at a device-matched size (hero
14 KB on a desktop, 31 KB on a 375 px phone at 2x, 83 KB on a 3x phone, from a 2.8 MB source); images cause no layout
shift. Lighthouse mobile 97 / 100 / 100 / 100 (was 98 / 100 / 100 / 100): FCP 1.5 s, **LCP 2.4 s** (was 2.1 s),
TBT 0, CLS 0. The extra 0.3 s is the photos sharing a slow simulated connection, and 2.4 s is still within Google's
"good" threshold (2.5 s), so no design compromise was made to recover it. Desktop 98 / 100 / 100 / 100.

## Addendum: champagne gold accent (step 12)

A single accent colour (`#C6A15B`) added to six decorative spots: review stars, the hero eyebrow dot, a hairline
mark on the two floating hero cards and the Clinic Information featured panel, a 1px hover ring on icon tiles, and a
dormant `Badge` variant. Verified with a full before/after regression:

- **Geometry**: every one of the 744 elements on the page (3 widths × the full page) keeps its exact pixel position;
  only 3 new, sub-2px decorative marks were added, confirmed by diffing `getBoundingClientRect()` for every element.
- **Pixel diff**: 18 of 30 full-page section screenshots (About, Services, Why Choose Us, FAQ, Contact, Visit, at
  1440/768/375px) are byte-for-byte identical. The 12 that changed (hero, Reviews, Clinic Information, footer — every
  width) changed by 0.00% to 0.43% of pixels, consistent with small icon fills and hairlines, not layout.
- Re-ran the full suite: axe 0 violations, independent contrast audit 0 failures, keyboard/focus/reduced-motion
  18/18, navigation and CTAs 25/25, responsive sweep 21/21 clean.

## Addendum: floating WhatsApp button (step 13)

Added a floating "chat on WhatsApp" button, present on every page, built from the site's existing verified phone
number (no second number introduced anywhere). Additive only: existing `tel:` links and the mobile Call button are
unchanged.

A real bug was found and fixed during testing: on desktop widths between 768px and 1280px, the fixed button sat
over the footer's "Terms of Use" link once the page was scrolled to its true end. Fixed with a small right-side
clearance on that one row (`Footer.jsx`), the only change to an existing section, verified at 12 widths from 320 to
1440px with zero overlap remaining. A second issue — the button briefly failed axe's "region" landmark rule
because it rendered outside every landmark — was fixed by wrapping it in its own `<nav>`, matching the pattern
already used by the mobile Call/Book bar.

Full suite re-run: axe 0 violations across all 15 page/state combinations; independent contrast audit 0 failures;
keyboard/focus/reduced-motion 18/18; navigation and CTAs 25/25; responsive sweep 21/21 clean. 10 WhatsApp-specific
checks: correct `wa.me` link built from the real number, new-tab with `noopener`, present on the homepage, both
legal pages and the static 404 page, no overlap with the Call/Book bar on phones, and — verified by attempting an
actual `focus()` call, not just reading the `inert` attribute — genuinely unfocusable and visually covered by the
drawer while the mobile menu is open.
