import { MapPin } from 'lucide-react';
import { cn } from '@/lib/cn';
import { site } from '@/config/site';
import { trust } from '@/content/trust';
import { useReveal } from '@/hooks/useReveal';
import { Icon, Stars, TextLink } from '@/components/ui';

const cell =
  'flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-5 ' +
  'md:flex-col-reverse md:items-start md:justify-end md:gap-3 md:px-8 md:py-9 md:first:pl-0 md:last:pr-0';
const label = 'text-small text-slate-300';
const value = 'font-heading text-h2 font-bold tabular-nums text-white';

/**
 * Compact trust area: rating, review count, location. One open strip with hairline dividers.
 * Semantic <dl>: the label comes first for assistive tech, and is reordered visually on wide screens.
 * Every figure comes from src/config/site.js.
 */
export default function TrustStrip() {
  const { rating, scale, reviewCount, mapsUrl } = site.google;
  const [ref, state] = useReveal();

  return (
    <div
      ref={ref}
      data-reveal={state}
      className={cn(
        'mt-14 md:mt-20',
        'transition-[opacity,transform] duration-700 ease-out-quart',
        'data-[reveal=hidden]:translate-y-5 data-[reveal=hidden]:opacity-0',
      )}
    >
      <dl className="grid grid-cols-1 divide-y divide-white/15 border-y border-white/15 md:grid-cols-3 md:divide-x md:divide-y-0">
        <div className={cell}>
          <dt className={label}>{trust.ratingLabel}</dt>
          <dd className="flex flex-wrap items-center gap-x-3 gap-y-2 md:flex-col md:items-start">
            <span className="sr-only">
              {rating} out of {scale}
            </span>
            <span aria-hidden="true" className={value}>
              {rating.toFixed(1)}
              <span className="text-h4 font-semibold text-slate-300">/{scale}</span>
            </span>
            <Stars value={rating} max={scale} size="sm" tone="dark" />
          </dd>
        </div>

        <div className={cell}>
          <dt className={label}>{trust.reviewsLabel}</dt>
          <dd className="flex flex-col items-end gap-2 md:items-start">
            <span className={value}>{reviewCount}</span>
            <span className="text-small">
              <TextLink href={mapsUrl} external tone="inverse">
                {trust.reviewsLink}
              </TextLink>
            </span>
          </dd>
        </div>

        <div className={cell}>
          <dt className={label}>{trust.locationLabel}</dt>
          <dd className="flex items-center gap-2.5 font-heading text-h3 font-semibold text-white">
            <Icon as={MapPin} size="lg" className="text-aqua-300" />
            {site.address.area}, {site.address.city}
          </dd>
        </div>
      </dl>
    </div>
  );
}
