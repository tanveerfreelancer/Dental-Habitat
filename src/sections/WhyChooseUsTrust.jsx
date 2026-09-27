import { cn } from '@/lib/cn';
import { whyChooseUs } from '@/content/whyChooseUs';
import { trust } from '@/content/trust';
import { useReveal } from '@/hooks/useReveal';
import { Grid, IconTile, Section, SectionHeading, TextLink } from '@/components/ui';
import TrustStrip from './why/TrustStrip';

/**
 * Why Choose Us + Trust. Replaces the earlier WhyChooseUs.jsx in the registry (that file is kept, unused).
 * Copy: src/content/whyChooseUs.js (unchanged). Trust labels: src/content/trust.js. Figures: src/config/site.js.
 *
 * Deep navy band. Heading on the left (sticky on wide screens) and six features on the right as an open ruled
 * list, then the trust strip. Motion is a staggered reveal as the list scrolls in, plus a hairline and icon
 * fill on hover or keyboard focus. All of it is disabled under prefers-reduced-motion.
 */
export default function WhyChooseUsTrust() {
  const [listRef, listState] = useReveal();

  return (
    <Section
      id="why-us"
      tone="brand"
      labelledBy="why-us-title"
      containerClassName="relative"
      className="relative"
    >
      <Grid className="gap-y-10 lg:gap-y-0">
        <div className="col-span-4 md:col-span-8 lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:col-span-4 lg:self-start">
          <SectionHeading id="why-us-title" eyebrow={trust.eyebrow} title={whyChooseUs.title} lead={whyChooseUs.lead} />
        </div>

        <ul
          ref={listRef}
          data-reveal={listState}
          className="group/list col-span-4 grid border-b border-white/15 md:col-span-8 md:grid-cols-2 md:gap-x-10 lg:col-span-8 lg:gap-x-12"
        >
          {whyChooseUs.items.map(({ id, icon, title, text, action }, i) => (
            <li
              key={id}
              style={{ transitionDelay: listState === 'shown' ? `${(i % 6) * 90}ms` : '0ms' }}
              className={cn(
                'group relative border-t border-white/15 py-7 md:py-9',
                'transition-[opacity,transform] duration-700 ease-out-quart',
                'group-data-[reveal=hidden]/list:translate-y-5 group-data-[reveal=hidden]/list:opacity-0',
              )}
            >
              {/* aqua hairline that draws across the top on hover or focus */}
              <span
                aria-hidden="true"
                className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-aqua-300 transition-transform duration-500 ease-out-quart group-hover:scale-x-100 group-focus-within:scale-x-100"
              />
              <div className="flex gap-5">
                <IconTile icon={icon} tone="onDark" className="shrink-0" />
                <div>
                  <h3 className="text-h4 md:text-h3">{title}</h3>
                  <p className="mt-2 max-w-[38ch] text-slate-300">{text}</p>
                  {action && (
                    <p className="mt-3 text-small">
                      <TextLink href={action.href} external={action.external} tone="inverse">
                        {action.label}
                      </TextLink>
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Grid>

      <TrustStrip />
    </Section>
  );
}
