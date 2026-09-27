import { cn } from '@/lib/cn';
import { faq } from '@/content/faq';
import { useReveal } from '@/hooks/useReveal';
import { Accordion, Grid, Section, SectionHeading, TextLink } from '@/components/ui';

/** One answer: text, then an optional bullet list, closing note and link. Content lives in src/content/faq.js. */
function Answer({ answer, points, note, link }) {
  return (
    <div className="space-y-3">
      <p>{answer}</p>
      {points && (
        <ul className="list-disc space-y-1.5 pl-5 marker:text-aqua-500">
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}
      {note && <p>{note}</p>}
      {link && (
        <p>
          <TextLink href={link.href} external={link.external}>
            {link.label}
          </TextLink>
        </p>
      )}
    </div>
  );
}

/**
 * FAQ. Heading on the left (sticky from 1024px), the design-system Accordion on the right.
 * One answer open at a time; the first starts open so the pattern is obvious.
 * The list eases in as it scrolls into view (disabled under reduced motion, and fails safe).
 */
export default function Faq() {
  const [ref, state] = useReveal();
  const items = faq.items.map(({ id, question, ...rest }) => ({ id, question, answer: <Answer {...rest} /> }));

  return (
    <Section id="faq" labelledBy="faq-title">
      <Grid className="gap-y-10">
        <div className="col-span-4 md:col-span-8 lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:col-span-4 lg:self-start">
          <SectionHeading id="faq-title" eyebrow={faq.eyebrow} title={faq.title} lead={faq.lead} />
        </div>

        <div
          ref={ref}
          data-reveal={state}
          className={cn(
            'col-span-4 md:col-span-8 lg:col-span-8',
            'transition-[opacity,transform] duration-700 ease-out-quart',
            'data-[reveal=hidden]:translate-y-5 data-[reveal=hidden]:opacity-0',
          )}
        >
          <Accordion items={items} defaultOpen={faq.defaultOpen} />
          <p className="mt-8 text-slate-600">
            {faq.fallback.text}{' '}
            <TextLink href={faq.fallback.link.href}>{faq.fallback.link.label}</TextLink>
          </p>
        </div>
      </Grid>
    </Section>
  );
}
