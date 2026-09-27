import { useEffect, useState } from 'react';
import { screens } from '@/design/tokens';

/** One documented item: label on the left, live specimen on the right, hairline above. */
export function Spec({ title, note, children }) {
  return (
    <div className="grid gap-6 border-t border-slate-200 py-8 lg:grid-cols-12 lg:gap-8 lg:py-10">
      <div className="lg:col-span-3">
        <h3 className="text-h4">{title}</h3>
        {note && <p className="mt-2 max-w-[34ch] text-small text-slate-600">{note}</p>}
      </div>
      <div className="min-w-0 lg:col-span-9">{children}</div>
    </div>
  );
}

export function Code({ children }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-brand-950 p-5 font-mono text-small leading-relaxed text-slate-200 md:p-6">
      <code>{children}</code>
    </pre>
  );
}

/** A palette scale shown as a dental shade guide: arch-topped tabs, one per step. */
export function ShadeGuide({ name, scale, marks = {} }) {
  return (
    <div>
      <h4 className="mb-4 text-h4">{name}</h4>
      <ul className="grid grid-cols-4 gap-x-2 gap-y-6 sm:grid-cols-6 lg:grid-cols-11">
        {Object.entries(scale).map(([step, hex]) => (
          <li key={step} className="min-w-0">
            <div className="h-24 rounded-t-full border border-slate-200/70" style={{ background: hex }} />
            <p className="mt-2 text-small font-semibold text-slate-900">{step}</p>
            <p className="text-caption tabular-nums text-slate-600">{hex}</p>
            {marks[step] && <p className="mt-0.5 text-caption font-semibold text-aqua-700">{marks[step]}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Floating readout of the current viewport width and breakpoint, for testing the responsive plan. */
export function ViewportChip() {
  const [w, setW] = useState(() => window.innerWidth);
  useEffect(() => {
    const on = () => setW(window.innerWidth);
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  const name = Object.entries(screens).reduce((cur, [k, v]) => (w >= parseInt(v, 10) ? k : cur), 'base');
  return (
    <div className="fixed bottom-4 left-4 z-50 rounded-full bg-brand-950 px-4 py-2 text-caption tabular-nums text-white shadow-lg" aria-hidden="true">
      {w}px, {name}
    </div>
  );
}
