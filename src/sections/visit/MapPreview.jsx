import { ExternalLink, MapPin } from 'lucide-react';
import { colors as c } from '@/design/tokens';
import { site } from '@/config/site';
import { visit } from '@/content/visit';
import { Icon, Media } from '@/components/ui';

/**
 * Map area. Three modes:
 *   1. visit.map.embedUrl is set   → a lazy-loaded Google Maps iframe.
 *   2. site.visitImage is set      → the real photo of the clinic entrance, linking to the Google Maps listing.
 *   3. otherwise                   → a drawn placeholder: a quiet flat map with a pin, linking to the real
 *      Google Maps listing. It has NO street names and is labelled as an illustration, so it never implies
 *      a real cartographic position. The link opens the clinic's actual listing.
 */
const V = [0, 104, 320, 520, 640]; // road centre lines
const H = [0, 96, 240, 360, 480];
const MAIN_V = 2;
const MAIN_H = 2;
const road = (i, main) => (i === main ? 11 : 6); // half road width

/** City blocks: the space between roads. Deterministic tints so it looks lived-in, not random each render. */
const TINT = [0, 1, 0, 0, 1, 0, 2, 0, 0, 2, 0, 1, 0, 0, 1, 0];
const FILL = ['#ffffff', c.slate[100], c.aqua[100]];

function blocks() {
  const out = [];
  for (let j = 0; j < H.length - 1; j++) {
    for (let i = 0; i < V.length - 1; i++) {
      const x0 = i === 0 ? 0 : V[i] + road(i, MAIN_V);
      const x1 = i === V.length - 2 ? 640 : V[i + 1] - road(i + 1, MAIN_V);
      const y0 = j === 0 ? 0 : H[j] + road(j, MAIN_H);
      const y1 = j === H.length - 2 ? 480 : H[j + 1] - road(j + 1, MAIN_H);
      out.push({ key: `${i}-${j}`, x: x0, y: y0, w: x1 - x0, h: y1 - y0, fill: FILL[TINT[j * 4 + i]] });
    }
  }
  return out;
}

export default function MapPreview() {
  const { map } = visit;
  const photo = site.visitImage;

  if (map.embedUrl) {
    return (
      <div className="aspect-[4/3] overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
        <iframe
          src={map.embedUrl}
          title={map.title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
    );
  }

  if (photo?.src) {
    return (
      <figure className="m-0">
        <a
          href={site.google.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block overflow-hidden rounded-lg border border-slate-200"
        >
          <Media
            src={photo.src}
            alt={photo.alt}
            ratio="4/3"
            shape="rect"
            sizes="(min-width: 1024px) 464px, (min-width: 768px) 46vw, 100vw"
          />
          <span className="sr-only">
            {map.linkLabel}: {site.name}, {site.address.area}, {site.address.city} (opens in a new tab)
          </span>
          {/* Phones: a solid bar under the photo. From 430px there is room to float it over the photo. */}
          <span className="flex items-center justify-between gap-3 border-t border-slate-200 bg-white px-4 py-3 transition-colors duration-200 group-hover:border-brand-300 sm:absolute sm:inset-x-4 sm:bottom-4 sm:rounded-md sm:border sm:shadow-md">
            <span className="flex min-w-0 items-center gap-3">
              <Icon as={MapPin} size="lg" className="text-brand-700" />
              <span className="min-w-0">
                <span className="block truncate font-heading text-h4 text-slate-900">{site.name}</span>
                <span className="block text-small leading-snug text-slate-600">
                  {site.address.line1.split(', ').pop()}, {site.address.area}
                </span>
              </span>
            </span>
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-brand-600 transition-colors duration-200 group-hover:border-brand-600 group-hover:bg-brand-50">
              <Icon as={ExternalLink} size="sm" />
            </span>
          </span>
        </a>
        <figcaption className="mt-3 text-caption text-slate-600">{map.photoCaption}</figcaption>
      </figure>
    );
  }

  return (
    <figure className="m-0">
      <a
        href={site.google.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block aspect-[4/3] overflow-hidden rounded-lg border border-slate-200 bg-brand-100"
      >
        <span className="sr-only">
          {map.linkLabel}: {site.name}, {site.address.area}, {site.address.city} (opens in a new tab)
        </span>

        <svg viewBox="0 0 640 480" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="absolute inset-0 h-full w-full">
          <rect width="640" height="480" fill={c.brand[100]} />
          {blocks().map((b) => (
            <rect key={b.key} x={b.x} y={b.y} width={b.w} height={b.h} rx="8" fill={b.fill} opacity={b.fill === '#ffffff' ? 0.9 : 1} />
          ))}
          {/* a few trees in the green block */}
          {[[152, 292, 9], [186, 312, 7], [168, 328, 8], [230, 300, 6], [212, 334, 9]].map(([cx, cy, r]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={c.aqua[200]} />
          ))}
          {/* the pin, standing on the main crossroads */}
          <ellipse cx="320" cy="240" rx="18" ry="6.5" fill={c.brand[800]} opacity="0.18" />
          <ellipse cx="320" cy="240" rx="18" ry="6.5" fill="none" stroke={c.aqua[400]} strokeWidth="2" className="origin-[320px_240px] animate-pulse-ring" />
          <path d="M320 242C320 242 300 222 300 204a20 20 0 1 1 40 0c0 18-20 38-20 38z" fill={c.brand[800]} stroke="#fff" strokeWidth="3" />
          <circle cx="320" cy="204" r="8" fill={c.aqua[300]} />
        </svg>

        {/* label */}
        <span className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-white px-4 py-3 shadow-md transition-colors duration-200 group-hover:border-brand-300 md:inset-x-4 md:bottom-4">
          <span className="flex min-w-0 items-center gap-3">
            <Icon as={MapPin} size="lg" className="text-brand-700" />
            <span className="min-w-0">
              <span className="block truncate font-heading text-h4 text-slate-900">{site.name}</span>
              <span className="block text-small leading-snug text-slate-600">
                {site.address.line1.split(', ').pop()}, {site.address.area}
              </span>
            </span>
          </span>
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-brand-600 transition-colors duration-200 group-hover:border-brand-600 group-hover:bg-brand-50">
            <Icon as={ExternalLink} size="sm" />
          </span>
        </span>
      </a>
      <figcaption className="mt-3 text-caption text-slate-600">{map.caption}</figcaption>
    </figure>
  );
}
