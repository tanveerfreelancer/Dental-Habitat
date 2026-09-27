import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/cn';
import Icon from './Icon';

/**
 * A ruled list that opens and closes. The expanding motion answers the person's click;
 * nothing animates on its own.
 *
 * items: [{ id, question, answer }]  (answer can be a string or JSX)
 * type:  'single' (one open at a time) | 'multiple'
 */
export default function Accordion({ items, type = 'single', defaultOpen = [], className }) {
  const base = useId();
  const [open, setOpen] = useState(() => new Set(defaultOpen));

  const toggle = (id) =>
    setOpen((prev) => {
      const isOpen = prev.has(id);
      if (type === 'single') return new Set(isOpen ? [] : [id]);
      const next = new Set(prev);
      isOpen ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div className={cn('border-b border-slate-200', className)}>
      {items.map(({ id, question, answer }) => {
        const isOpen = open.has(id);
        const buttonId = `${base}-${id}-button`;
        const panelId = `${base}-${id}-panel`;
        return (
          <div key={id} className="border-t border-slate-200">
            <h3 className="text-h4">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(id)}
                className="group flex w-full items-center justify-between gap-6 py-5 text-left font-heading text-h4 text-slate-900 transition-colors duration-200 hover:text-brand-600 md:py-6"
              >
                <span>{question}</span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-300 text-brand-800 transition-colors duration-200 group-hover:border-brand-600">
                  <Icon as={Plus} size="sm" className={cn('transition-transform duration-300 ease-out-quart', isOpen && 'rotate-45')} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn('grid transition-[grid-template-rows] duration-300 ease-out-quart', isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}
            >
              <div className={cn('overflow-hidden transition-[visibility] duration-0', isOpen ? 'visible delay-0' : 'invisible delay-300')}>
                <div className="max-w-[60ch] pb-6 pr-12 text-slate-600">{answer}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
