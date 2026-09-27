import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/cn';
import { reviews } from '@/content/reviews';
import { useReveal } from '@/hooks/useReveal';
import { Button, Grid, Icon, Section, SectionHeading } from '@/components/ui';
import RatingArch from './reviews/RatingArch';

/**
 * Google Reviews. A rating-focused layout: no patient names and no review quotes, because none have been
 * supplied. The section shows the real aggregate rating and sends people to Google to read the reviews.
 * Copy: src/content/reviews.js. Figures: src/config/site.js.
 *
 * Phones: heading, rating arch, then the call to action and points. Tablets: heading on top, arch and
 * actions side by side. Laptops: text on the left, arch on the right.
 */
export default function Reviews() {
  const { eyebrow, title, lead, points, cta } = reviews;
  const [listRef, listState] = useReveal();

  return (
    <Section id="reviews" tone="subtle" labelledBy="reviews-title">
      <Grid className="gap-y-10">
        <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-1 lg:row-start-1">
          <SectionHeading id="reviews-title" eyebrow={eyebrow} title={title} lead={lead} />
        </div>

        <div className="col-span-4 md:col-span-4 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:self-center">
          <RatingArch />
        </div>

        <div className="col-span-4 md:col-span-4 lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:self-start">
          <Button href={cta.href} external iconRight={ExternalLink} fullWidth="mobile">
            {cta.label}
            <span className="sr-only"> (opens in a new tab)</span>
          </Button>

          <ul
            ref={listRef}
            data-reveal={listState}
            className="group/list mt-8 divide-y divide-slate-200 border-y border-slate-200 md:mt-10"
          >
            {points.map(({ id, icon, title: name, text }, i) => (
              <li
                key={id}
                style={{ transitionDelay: listState === 'shown' ? `${i * 100}ms` : '0ms' }}
                className={cn(
                  'flex gap-4 py-5',
                  'transition-[opacity,transform] duration-700 ease-out-quart',
                  'group-data-[reveal=hidden]/list:translate-y-4 group-data-[reveal=hidden]/list:opacity-0',
                )}
              >
                <Icon as={icon} size="lg" className="mt-0.5 text-brand-600" />
                <div>
                  <p className="font-heading text-h4 text-slate-900">{name}</p>
                  <p className="mt-1 max-w-[46ch] text-slate-600">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Grid>
    </Section>
  );
}
