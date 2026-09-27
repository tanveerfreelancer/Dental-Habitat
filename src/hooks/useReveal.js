import { useEffect, useRef, useState } from 'react';

/**
 * Scroll reveal that fails safe.
 * Returns [ref, state]: 'idle' (normal, visible), 'hidden' (waiting below the fold) or 'shown'.
 * Content is only hidden if JavaScript runs, IntersectionObserver exists, the visitor has not asked for
 * reduced motion, AND the element is currently below the fold. Anything already on screen, or any
 * failure, simply stays visible. Nothing is ever hidden from crawlers or assistive tech (opacity only).
 */
export function useReveal({ rootMargin = '0px 0px -10% 0px' } = {}) {
  const ref = useRef(null);
  const [state, setState] = useState('idle');

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return undefined;

    setState('hidden');
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setState('shown');
        io.disconnect();
      }
    }, { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return [ref, state];
}
