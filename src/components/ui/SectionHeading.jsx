import { cn } from '@/lib/cn';

/**
 * Heading block: optional label, title, optional lead.
 * `as` sets the real heading level (h1 only for the hero); the visual size follows the level.
 * Use `eyebrow` only when it tells the reader something, not on every section.
 */
export default function SectionHeading({ id, eyebrow, title, lead, as: Tag = 'h2', align = 'left', className }) {
  const centered = align === 'center';
  return (
    <div className={cn('max-w-[44rem]', centered && 'mx-auto text-center', className)}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <Tag id={id} className={Tag === 'h1' ? 'text-h1' : 'text-h2'}>
        {title}
      </Tag>
      {lead && (
        <p className={cn('mt-4 max-w-[60ch] text-lead text-slate-600 md:mt-6 [.surface-inverse_&]:text-slate-300', centered && 'mx-auto')}>
          {lead}
        </p>
      )}
    </div>
  );
}
