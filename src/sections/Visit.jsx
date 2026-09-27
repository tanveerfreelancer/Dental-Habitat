import { Navigation, Phone } from 'lucide-react';
import { cn } from '@/lib/cn';
import { site, telHref } from '@/config/site';
import { visit } from '@/content/visit';
import { useReveal } from '@/hooks/useReveal';
import { Button, Grid, Icon, Section, SectionHeading, TextLink } from '@/components/ui';
import MapPreview from './visit/MapPreview';
import AppointmentForm from './visit/AppointmentForm';

/** Fade-and-rise wrapper for a block as it scrolls into view. Fails safe (see hooks/useReveal.js). */
function Rise({ className, children }) {
  const [ref, state] = useReveal();
  return (
    <div
      ref={ref}
      data-reveal={state}
      className={cn(
        className,
        'transition-[opacity,transform] duration-700 ease-out-quart',
        'data-[reveal=hidden]:translate-y-5 data-[reveal=hidden]:opacity-0',
      )}
    >
      {children}
    </div>
  );
}

/**
 * Contact + Location. Address, phone, Call Now, Get Directions, a map area and the appointment request form.
 * Copy: src/content/visit.js. Facts: src/config/site.js. No email or opening hours: none supplied.
 *
 * Phones: details and buttons, map, then the form. Tablets: details and map side by side, form full width
 * below. Laptops: details and map stacked on the left, form on the right.
 */
export default function Visit() {
  const { eyebrow, title, lead, details, buttons, map } = visit;

  return (
    <Section id="visit" labelledBy="visit-title">
      <Grid className="gap-y-10">
        {/* details + actions */}
        <div className="col-span-4 md:col-span-4 lg:col-span-5 lg:row-start-1">
          <SectionHeading id="visit-title" eyebrow={eyebrow} title={title} lead={lead} />

          <dl className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
            <div className="grid grid-cols-[5.5rem_1fr] gap-x-4 py-4">
              <dt className="font-semibold text-slate-900">{details.addressLabel}</dt>
              <dd>
                <address className="not-italic text-slate-700">
                  {details.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </dd>
            </div>
            <div className="grid grid-cols-[5.5rem_1fr] gap-x-4 py-4">
              <dt className="font-semibold text-slate-900">{details.phoneLabel}</dt>
              <dd>
                <TextLink href={telHref}>{site.phone.display}</TextLink>
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:flex-col lg:flex-row">
            <Button href={telHref} iconLeft={Phone} fullWidth="mobile" className="md:w-full lg:w-auto">
              {buttons.call}
              <span className="sr-only"> {site.phone.display}</span>
            </Button>
            <Button href={site.google.mapsUrl} external iconLeft={Navigation} variant="secondary" fullWidth="mobile" className="md:w-full lg:w-auto">
              {buttons.directions}
              <span className="sr-only"> (opens Google Maps in a new tab)</span>
            </Button>
          </div>
        </div>

        {/* map */}
        <Rise className="col-span-4 md:col-span-4 lg:col-span-5 lg:row-start-2 md:self-end">
          <MapPreview />
        </Rise>

        {/* form */}
        <Rise className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:self-start">
          <AppointmentForm />
        </Rise>
      </Grid>
    </Section>
  );
}
