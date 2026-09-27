import { CalendarCheck, MapPin, Phone } from 'lucide-react';
import { cn } from '@/lib/cn';
import { appointment } from '@/content/appointment';
import { useReveal } from '@/hooks/useReveal';
import { Button, Grid, Icon, Section, SectionHeading, TextLink } from '@/components/ui';

/**
 * Appointment call to action. A single deep-navy panel: the question, the two ways to act, and the address.
 * Holds the #appointment anchor that every "Book Appointment" button on the page scrolls to.
 * Copy: src/content/appointment.js. Facts: src/config/site.js. No form, because no booking backend exists.
 *
 * Phones: everything stacks, buttons full width. Laptops: message and buttons left, address right.
 */
export default function Contact() {
  const { eyebrow, title, lead, primary, secondary, visit } = appointment;
  const [ref, state] = useReveal();

  return (
    <Section id="contact" tone="subtle" labelledBy="contact-title">
      {/* Anchor for every "Book Appointment" button. Keep it above the panel. */}
      <span id="appointment" className="scroll-target block h-0" />

      <div
        ref={ref}
        data-reveal={state}
        className={cn(
          'surface-inverse rounded-xl bg-brand-900 px-6 py-10 md:px-12 md:py-14 lg:px-16 lg:py-16',
          'transition-[opacity,transform] duration-700 ease-out-quart',
          'data-[reveal=hidden]:translate-y-6 data-[reveal=hidden]:opacity-0',
        )}
      >
        <Grid className="items-center gap-y-10">
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <SectionHeading id="contact-title" eyebrow={eyebrow} title={title} lead={lead} />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-10">
              <Button
                href={primary.href}
                external={primary.external}
                variant="accent"
                iconLeft={CalendarCheck}
                fullWidth="mobile"
                className="md:h-14 md:px-8"
              >
                {primary.label}
                <span className="sr-only"> {primary.hint}</span>
              </Button>
              <Button
                href={secondary.href}
                variant="outline-inverse"
                iconLeft={Phone}
                fullWidth="mobile"
                className="md:h-14 md:px-8"
              >
                {secondary.label}
              </Button>
            </div>
          </div>

          <div className="col-span-4 border-t border-white/15 pt-8 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="flex items-center gap-2 text-small font-semibold text-aqua-300">
              <Icon as={MapPin} size="sm" />
              {visit.label}
            </p>
            <address className="mt-3 font-heading text-h4 not-italic text-white">
              {visit.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <p className="mt-4 text-small">
              <TextLink href={visit.mapLink.href} external tone="inverse">
                {visit.mapLink.label}
              </TextLink>
            </p>
          </div>
        </Grid>
      </div>
    </Section>
  );
}
