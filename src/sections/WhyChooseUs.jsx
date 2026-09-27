import { whyChooseUs } from '@/content/whyChooseUs';
import { Grid, IconTile, Section, SectionHeading, TextLink } from '@/components/ui';

/**
 * Why Choose Us. Six reasons as a ruled grid, not boxes. Copy lives in src/content/whyChooseUs.js.
 * Phones: icon beside text, one column. Tablets: two columns, icon above. Laptops: three columns.
 * Hover (or keyboard focus inside): a hairline draws across the top and the icon tile inverts.
 */
export default function WhyChooseUs() {
  return (
    <Section id="why-us" labelledBy="why-us-title">
      <Grid className="items-end gap-y-4">
        <div className="col-span-4 md:col-span-8 lg:col-span-6">
          <SectionHeading id="why-us-title" title={whyChooseUs.title} />
        </div>
        <p className="col-span-4 max-w-[44ch] text-lead text-slate-600 md:col-span-8 lg:col-span-5 lg:col-start-8 lg:pb-1">
          {whyChooseUs.lead}
        </p>
      </Grid>

      <ul className="mt-10 grid gap-x-10 gap-y-2 md:mt-14 md:grid-cols-2 md:gap-y-12 lg:grid-cols-3">
        {whyChooseUs.items.map(({ id, icon, title, text, action }) => (
          <li key={id} className="group relative flex gap-4 border-t border-slate-200 py-6 md:block md:pb-0 md:pt-8">
            {/* the hairline that draws across on hover */}
            <span
              aria-hidden="true"
              className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-aqua-500 transition-transform duration-500 ease-out-quart group-hover:scale-x-100 group-focus-within:scale-x-100"
            />
            <IconTile icon={icon} tone="interactive" className="shrink-0" />
            <div className="md:mt-6">
              <h3 className="text-h4">{title}</h3>
              <p className="mt-2 max-w-[42ch] text-slate-600">{text}</p>
              {action && (
                <p className="mt-3 text-small">
                  <TextLink href={action.href} external={action.external}>
                    {action.label}
                  </TextLink>
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
