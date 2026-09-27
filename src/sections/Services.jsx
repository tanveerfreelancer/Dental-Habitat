import { services } from '@/content/services';
import { Button, Grid, IconTile, Section, SectionHeading } from '@/components/ui';

/**
 * Services. Six treatments as one joined grid of cells (hairlines, not floating cards).
 * Copy lives in src/content/services.js.
 * Phones: one column, icon beside text. Tablets: two columns, icon above. Laptops: three columns.
 * Hover: the cell tints, the icon tile inverts to navy, and an aqua rule draws along the bottom edge.
 */
export default function Services() {
  const { eyebrow, title, lead, items, cta } = services;

  return (
    <Section id="services" tone="subtle" labelledBy="services-title">
      <Grid className="items-end gap-y-6">
        <div className="col-span-4 md:col-span-8 lg:col-span-7">
          <SectionHeading id="services-title" eyebrow={eyebrow} title={title} lead={lead} />
        </div>
        {/* Wide screens: the call to action sits opposite the heading. Below 1024px it follows the grid. */}
        <div className="hidden lg:col-span-5 lg:flex lg:justify-end lg:pb-1">
          <Button href={cta.href} variant="secondary">
            {cta.label}
          </Button>
        </div>
      </Grid>

      <ul className="mt-10 grid gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
        {items.map(({ id, icon, title: name, text }) => (
          <li key={id} className="group relative bg-white transition-colors duration-300 hover:bg-brand-50">
            <div className="flex h-full gap-4 p-6 md:block md:p-8">
              <IconTile icon={icon} tone="interactive" className="shrink-0" />
              <div className="md:mt-6">
                <h3 className="text-h4 md:text-h3">{name}</h3>
                <p className="mt-2 max-w-[40ch] text-slate-600 md:mt-3">{text}</p>
              </div>
            </div>
            {/* aqua rule that draws along the bottom edge on hover */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-aqua-500 transition-transform duration-500 ease-out-quart group-hover:scale-x-100"
            />
          </li>
        ))}
      </ul>

      <div className="mt-8 lg:hidden">
        <Button href={cta.href} variant="secondary" fullWidth="mobile">
          {cta.label}
        </Button>
      </div>
    </Section>
  );
}
