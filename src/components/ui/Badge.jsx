import { cn } from '@/lib/cn';

const variants = {
  neutral: 'bg-slate-100 text-slate-700',
  brand: 'bg-brand-50 text-brand-800 border border-brand-100',
  aqua: 'bg-aqua-100 text-aqua-800',
  outline: 'border border-slate-300 text-slate-700',
  inverse: 'border border-white/20 bg-white/10 text-white',
  // Small luxury accent only. A hairline, not a fill, so gold never reads as a block of colour.
  gold: 'border border-gold-400 text-gold-700',
};

export default function Badge({ variant = 'neutral', icon: Glyph, className, children }) {
  return (
    <span className={cn('inline-flex h-7 items-center gap-1.5 rounded-full px-3 text-caption', variants[variant], className)}>
      {Glyph && <Glyph size={14} strokeWidth={2} aria-hidden="true" />}
      {children}
    </span>
  );
}
