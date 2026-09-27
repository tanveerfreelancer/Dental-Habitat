import { cn } from '@/lib/cn';

/**
 * A small floating panel over the hero image. Decorative repeat of facts that are also in the
 * trust row, so it is hidden from assistive tech. Enters once, then drifts a few pixels.
 * Wrapper positions and enters; the inner panel floats (two animations, two elements).
 */
export default function FloatingStat({ className, delay = 900, drift = 7, children }) {
  return (
    <div aria-hidden="true" className={cn('absolute animate-rise', className)} style={{ animationDelay: `${delay}ms` }}>
      <div
        className="relative animate-float overflow-hidden rounded-md border border-slate-200 bg-white px-4 py-3 shadow-md"
        style={{ animationDuration: `${drift}s`, animationDelay: `${delay}ms` }}
      >
        {/* a small gold mark: this is a floating trust card, not a decorated banner, so the line stays short */}
        <span className="absolute inset-x-0 top-0 mx-auto h-px w-8 bg-gold-400" />
        {children}
      </div>
    </div>
  );
}
