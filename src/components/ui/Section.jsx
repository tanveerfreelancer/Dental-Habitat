import { cn } from '@/lib/cn';
import Container from './Container';

const tones = {
  default: 'bg-white',
  subtle: 'bg-slate-50',
  brand: 'surface-inverse bg-brand-900',
};

/**
 * Page section. Vertical rhythm comes from --section-y (64 / 96 / 128px),
 * so it is set once, in the tokens, and never per section.
 * Point `labelledBy` at the section heading's id for landmark navigation.
 */
export default function Section({ id, tone = 'default', labelledBy, className, containerClassName, children }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('scroll-target py-section', tones[tone], className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
