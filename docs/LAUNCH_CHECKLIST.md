# Launch checklist

Everything below needs a decision or a fact from the clinic. The site is built so each item is one setting, not a
rewrite. Nothing here has been guessed.

## Must do before launch

1. **Set the domain.** Put the real address in `.env` as `SITE_URL=https://your-domain` (no trailing slash) and build.
   This switches on the canonical URL, `og:url`, `sitemap.xml` and the schema `url`. The build warns until it is set.
2. **Connect the appointment form.** There is no clinic email and no form service, so today a valid submission
   honestly says "not sent, please call". Set `VITE_CONTACT_ENDPOINT` in `.env` to any service that accepts a JSON
   POST (Formspree, Getform, a Netlify function, your own API), rebuild, and **send a real test request**. Decide who
   receives requests and how quickly they are answered. The form promises no reply time.
3. **Have the Privacy Policy and Terms reviewed.** They describe only what this website actually does and the supplied
   facts, and invent no legal entity, retention period or governing law, but they are not legal advice. If analytics,
   advertising, cookies, a live map embed or chat are ever added, the Privacy Policy must be updated.
4. **Confirm the copy.** Read `src/content/*.js` with the clinic. In particular the checkup-frequency FAQ answer is
   general dental guidance the clinic must confirm or replace.
5. **Re-check the Google rating (4.3) and review count (52)** against the live listing. They change. Edit `site.js`.

## Strongly recommended

- **More photography.** The hero, About and location photos are real. Nothing is stopping you adding more, but see `docs/PHOTO_DECISIONS.md` for what was left out and why, and confirm patient consent before publishing any image of a patient or their X-ray.
- **A live map.** Paste the Google Maps embed URL into `map.embedUrl` in `src/content/visit.js` (Google Maps →
  the clinic → Share → Embed a map). If you do, mention Google in the Privacy Policy.
- **A real logo.** The mark in use is a placeholder arch. Replace `src/components/ui/Logo.jsx` and the favicons.
- **Google Business Profile and Search Console.** Verify the domain, submit `sitemap.xml`, and keep the business name,
  address and phone identical to `site.js` everywhere (consistency matters for local search).

## Photo details to confirm

- The exterior photo shows a partly legible wall plate naming another practitioner beside the gate. The crop used on the site cuts it out and it is not legible at web sizes, but the original file contains it. Do not publish the original file.
- Confirm the clinic is happy with the wires and motorbikes visible in the street photo. It is authentic and helps people recognise the entrance; a photo taken from another angle or time of day would flatter it.

## Add only if the clinic supplies it

Opening hours, an email address, social profiles, clinician names and qualifications, prices. Each has a slot in
`site.js` and appears everywhere it should (footer, schema, contact) once filled in. Until then nothing is shown.

## Deploying

Deploy the `dist/` folder to any static host (Netlify, Cloudflare Pages, Vercel, GitHub Pages, S3 + CDN).
The site expects to live at the domain root. If your host does not serve `dist/404.html` automatically, point its
"not found" setting at that file.
