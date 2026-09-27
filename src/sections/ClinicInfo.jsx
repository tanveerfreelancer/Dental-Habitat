import { clinicInfo } from '@/content/clinicInfo';
import { Card, Grid, Icon, IconTile, Section, SectionHeading } from '@/components/ui';
import Reveal from '@/components/ui/Reveal';

/**
 * Clinic Information & Amenities. A compact, icon-based summary of the clinic's verified Google Business Profile
 * details. Facts: src/config/site.js (businessProfile). Presentation and icons: src/content/clinicInfo.js.
 *
 * Accessibility is the featured group (its own panel, one item per row). The other five groups are ruled rows of
 * icon chips. Phones stack everything; tablets and laptops put the panel beside the rows.
 */
export default function ClinicInfo() {
  const { title, lead, source, featured, groups } = clinicInfo;

  return (
    <Section
      id="clinic-info"
      tone="subtle"
      labelledBy="clinic-info-title"
      className="pb-12 pt-12 md:pb-16 md:pt-16 lg:pb-20 lg:pt-20"
    >
      <SectionHeading id="clinic-info-title" title={title} lead={lead} />

      <Grid className="mt-8 items-start gap-y-6 md:mt-10">
        {/* featured group */}
        <Reveal className="col-span-4 md:col-span-4 lg:col-span-5">
          <Card className="relative overflow-hidden">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 mx-auto h-px w-10 bg-gold-400" />
            <div className="flex items-center gap-4">
              <IconTile icon={featured.icon} tone="brand" />
              <h3 className="text-h3">{featured.title}</h3>
            </div>
            <ul className="mt-5 divide-y divide-slate-200 border-t border-slate-200">
              {featured.items.map(({ label, icon }) => (
                <li key={label} className="flex items-center gap-3 py-3.5">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-aqua-100 text-aqua-800">
                    <Icon as={icon} size="md" />
                  </span>
                  <span className="font-medium text-slate-800">{label}</span>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>

        {/* the other groups */}
        <Reveal className="col-span-4 md:col-span-4 lg:col-span-7" delay={120}>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {groups.map((group) => (
              <div key={group.id} className="grid gap-3 py-5 sm:grid-cols-[8.5rem_1fr] sm:items-center sm:gap-6 md:grid-cols-1 md:gap-3 lg:grid-cols-[8.5rem_1fr] lg:items-center lg:gap-6">
                <h3 className="font-heading text-h4 text-slate-900">{group.title}</h3>
                <ul className="flex flex-wrap gap-2.5">
                  {group.items.map(({ label, icon }) => (
                    <li
                      key={label}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-small font-medium text-slate-800"
                    >
                      <Icon as={icon} size="sm" className="text-brand-600" />
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </Grid>

      <p className="mt-8 text-caption text-slate-600">{source}</p>
    </Section>
  );
}
