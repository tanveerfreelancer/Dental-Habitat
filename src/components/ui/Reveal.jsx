import { cn } from '@/lib/cn';
import { useReveal } from '@/hooks/useReveal';

/** Fade-and-rise wrapper for a block as it scrolls into view. Fails safe (see hooks/useReveal.js). */
export default function Reveal({ className, delay = 0, children }) {
  const [ref, state] = useReveal();
  return (
    <div
      ref={ref}
      data-reveal={state}
      style={{ transitionDelay: state === 'shown' ? `${delay}ms` : '0ms' }}
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
