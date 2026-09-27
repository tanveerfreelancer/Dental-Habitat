import { cloneElement, useId } from 'react';
import { ChevronDown, CircleAlert } from 'lucide-react';
import { cn } from '@/lib/cn';
import Icon from './Icon';

const control =
  'block w-full rounded-md border border-slate-300 bg-white px-4 text-body text-slate-900 ' +
  'transition-[border-color,box-shadow] duration-200 hover:border-slate-400 ' +
  'focus:border-brand-600 focus:shadow-focus focus:outline-none ' +
  'disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 ' +
  'aria-[invalid=true]:border-danger-600 aria-[invalid=true]:focus:shadow-focus-danger';

/** 16px text minimum, so iOS never zooms the page when a field is focused. */
export const Input = ({ className, ...rest }) => <input className={cn(control, 'h-12', className)} {...rest} />;

export const Textarea = ({ className, ...rest }) => (
  <textarea className={cn(control, 'min-h-32 resize-y py-3', className)} {...rest} />
);

export const Select = ({ className, children, ...rest }) => (
  <div className="relative">
    <select className={cn(control, 'h-12 appearance-none pr-12', className)} {...rest}>
      {children}
    </select>
    <Icon as={ChevronDown} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" />
  </div>
);

/**
 * Wires label, hint and error to the control for you (id, aria-describedby, aria-invalid).
 * Required fields are the default; optional ones say so.
 */
export function Field({ label, hint, error, required = true, children, className }) {
  const id = useId();
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-small font-semibold text-slate-800">
        {label}
        {!required && <span className="font-normal text-slate-600"> (optional)</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="text-small text-slate-600">
          {hint}
        </p>
      )}
      {cloneElement(children, { id, required, 'aria-describedby': describedBy, 'aria-invalid': error ? true : undefined })}
      {error && (
        <p id={`${id}-error`} className="flex items-start gap-2 text-small font-medium text-danger-700">
          <Icon as={CircleAlert} size="sm" className="mt-0.5" />
          {error}
        </p>
      )}
    </div>
  );
}
