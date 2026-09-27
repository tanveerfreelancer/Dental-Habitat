/** Development-only marker for sections that are structure without content yet. Never renders in production. */
export default function ScaffoldNote({ children }) {
  if (!import.meta.env.DEV) return null;
  return (
    <p className="mt-8 rounded-md border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-small text-slate-600 [.surface-inverse_&]:border-white/20 [.surface-inverse_&]:bg-white/5 [.surface-inverse_&]:text-slate-300">
      {children}
    </p>
  );
}
