import { Star } from 'lucide-react';
import { cn } from '@/lib/cn';
import { site } from '@/config/site';

const STAR_PX = { sm: 14, md: 16, lg: 20 };

/** Five stars with exact fractional fill: 4.3 fills four stars and 30% of the fifth. */
export function Stars({ value, max = 5, size = 'md', tone = 'light' }) {
  const px = STAR_PX[size];
  return (
    <span className="inline-flex gap-0.5" aria-hidden="true">
      {Array.from({ length: max }, (_, i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span key={i} className="relative inline-block" style={{ width: px, height: px }}>
            <Star
              size={px}
              strokeWidth={1.5}
              className={cn('absolute inset-0', tone === 'dark' ? 'fill-white/25 stroke-white/25' : 'fill-slate-200 stroke-slate-200')}
            />
            <Star
              size={px}
              strokeWidth={1.5}
              className="absolute inset-0 fill-star stroke-star"
              style={{ clipPath: `inset(0 ${(1 - fill) * 100}% 0 0)` }}
            />
          </span>
        );
      })}
    </span>
  );
}

/**
 * Defaults to the real Google figures in src/config/site.js.
 * Visual text is hidden from screen readers in favour of one complete sentence.
 */
export default function Rating({
  value = site.google.rating,
  max = site.google.scale,
  count = site.google.reviewCount,
  source = 'Google',
  href,
  size = 'md',
  tone = 'light',
  className,
}) {
  const dark = tone === 'dark';
  const label = `Rated ${value} out of ${max}${count != null ? ` from ${count} ${source} reviews` : ''}`;
  const Wrapper = href ? 'a' : 'div';
  return (
    <Wrapper
      href={href}
      {...(href && { target: '_blank', rel: 'noopener noreferrer' })}
      className={cn('group inline-flex flex-wrap items-center gap-x-2 gap-y-1', className)}
    >
      <span className="sr-only">{label}{href ? ' (opens in a new tab)' : ''}</span>
      <span aria-hidden="true" className={cn('font-heading font-bold tabular-nums', size === 'lg' ? 'text-h3' : 'text-h4', dark ? 'text-white' : 'text-slate-900')}>
        {value.toFixed(1)}
      </span>
      <Stars value={value} max={max} size={size} tone={tone} />
      {count != null && (
        <span
          aria-hidden="true"
          className={cn('text-small', dark ? 'text-slate-300' : 'text-slate-600', href && 'underline decoration-1 underline-offset-4 group-hover:decoration-2')}
        >
          {count} {source} reviews
        </span>
      )}
    </Wrapper>
  );
}
