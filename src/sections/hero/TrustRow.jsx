import { MapPin, Star } from 'lucide-react';
import { site } from '@/config/site';
import { Icon } from '@/components/ui';

/**
 * Rating, review count and location, from src/config/site.js. Quiet on purpose: small text, hairline dividers.
 * The rating and count are one link to the Google listing.
 */
export default function TrustRow() {
  const { rating, reviewCount, mapsUrl } = site.google;
  return (
    <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-small text-slate-600">
      <li>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex min-h-6 items-center gap-x-4 rounded-sm transition-colors duration-200 hover:text-slate-900 sm:gap-x-6"
        >
          <span className="inline-flex items-center gap-1.5">
            <Star size={16} strokeWidth={1.5} aria-hidden="true" className="fill-star stroke-star" />
            <span className="font-semibold text-slate-900">{rating.toFixed(1)}</span>
            <span>Google Rating</span>
          </span>
          <span className="border-l border-slate-300 pl-4 sm:pl-6">{reviewCount} Reviews</span>
          <span className="sr-only">(opens Google Maps in a new tab)</span>
        </a>
      </li>
      <li className="inline-flex items-center gap-1.5 lg:border-l lg:border-slate-300 lg:pl-6">
        <Icon as={MapPin} size="sm" className="text-brand-600" />
        {site.address.area}, {site.address.city}
      </li>
    </ul>
  );
}
