import { Star } from 'lucide-react';
import { cn } from '@/lib/cn';
import { colors as c } from '@/design/tokens';
import { site } from '@/config/site';
import { useReveal } from '@/hooks/useReveal';

/**
 * The rating as the section's visual: the brand arch drawn as a gauge that fills to rating / scale
 * (4.3 of 5 = 86%). Only real figures from src/config/site.js are shown. There is no breakdown by star
 * count, because none has been supplied.
 *
 * Animation (one scroll-triggered moment, disabled under reduced motion): the outline draws up and over
 * the top of the arch, then the numeral, stars and count rise into place in sequence.
 */
const ARCH = 'M14 436V180a166 166 0 0 1 332 0v256';
const STAR_PX = 26;

function BigStars({ value, max, hidden }) {
  return (
    <span className="inline-flex gap-1" aria-hidden="true">
      {Array.from({ length: max }, (_, i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span
            key={i}
            className={cn('relative inline-block transition-[opacity,transform] duration-500 ease-out-quart', hidden && 'scale-75 opacity-0')}
            style={{ width: STAR_PX, height: STAR_PX, transitionDelay: hidden ? '0ms' : `${700 + i * 110}ms` }}
          >
            <Star size={STAR_PX} strokeWidth={1.5} className="absolute inset-0 fill-slate-200 stroke-slate-200" />
            <Star
              size={STAR_PX}
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

export default function RatingArch() {
  const { rating, scale, reviewCount } = site.google;
  const pct = Math.round((rating / scale) * 1000) / 10;
  const [ref, state] = useReveal({ rootMargin: '0px 0px -15% 0px' });
  const hidden = state === 'hidden';
  const rise = (delay) => ({
    className: cn('transition-[opacity,transform] duration-700 ease-out-quart', hidden && 'translate-y-3 opacity-0'),
    style: { transitionDelay: hidden ? '0ms' : `${delay}ms` },
  });

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`Rated ${rating} out of ${scale} from ${reviewCount} Google reviews`}
      className="relative mx-auto aspect-[4/5] w-full max-w-[22rem]"
    >
      <svg viewBox="0 0 360 450" aria-hidden="true" className="absolute inset-0 h-full w-full">
        {/* white arch surface, hairline track, and the progress stroke */}
        <path d={`${ARCH}z`} fill="#fff" />
        <path d={ARCH} pathLength="100" fill="none" stroke={c.slate[200]} strokeWidth="10" strokeLinecap="round" />
        <path
          d={ARCH}
          pathLength="100"
          fill="none"
          stroke={c.aqua[500]}
          strokeWidth="10"
          strokeLinecap="round"
          style={{
            strokeDasharray: hidden ? '0 100' : `${pct} 100`,
            opacity: hidden ? 0 : 1,
            transition: 'stroke-dasharray 1600ms cubic-bezier(0.25, 1, 0.5, 1), opacity 200ms linear',
          }}
        />
      </svg>

      <div aria-hidden="true" className="absolute inset-0 flex flex-col items-center justify-center pt-[16%] text-center">
        <div {...rise(300)}>
          {/* Display numeral: larger than the H1 step on purpose, used only here. */}
          <p className="font-heading text-[clamp(4.25rem,3rem+5vw,6.25rem)] font-bold leading-none tracking-tighter tabular-nums text-brand-900">
            {rating.toFixed(1)}
          </p>
          <p className="mt-2 text-small text-slate-600">out of {scale}</p>
        </div>

        <div className="mt-4">
          <BigStars value={rating} max={scale} hidden={hidden} />
        </div>

        <div className="mt-5 w-24 border-t border-slate-200" />
        <div className="h-4" />
        <div {...rise(1000)}>
          <p className="font-heading text-h4 font-semibold text-slate-900">{reviewCount} Google Reviews</p>
        </div>
      </div>
    </div>
  );
}
