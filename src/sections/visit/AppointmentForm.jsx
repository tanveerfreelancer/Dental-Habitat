import { useEffect, useRef, useState } from 'react';
import { CalendarCheck, CircleAlert, CircleCheck, Phone } from 'lucide-react';
import { site, telHref } from '@/config/site';
import { visit } from '@/content/visit';
import { Button, Card, Field, Icon, Input, ScaffoldNote, Select, Textarea } from '@/components/ui';
import { FIELD_ORDER, MAX_MESSAGE, todayISO, validateRequest } from './validate';

const EMPTY = { name: '', phone: '', email: '', service: '', date: '', message: '', website: '' };
const TIMEOUT_MS = 15000;

/** Sends the request as JSON to the configured endpoint. Throws on network failure, timeout, or a non-2xx reply. */
async function sendRequest(endpoint, payload) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  } finally {
    clearTimeout(timer);
  }
}

/** Read-only summary of what was entered, shown in the result panels. */
function Summary({ values, labels }) {
  const rows = [
    [labels.name, values.name],
    [labels.phone, values.phone],
    [labels.email, values.email],
    [labels.service, values.service],
    [labels.date, values.date],
    [labels.message, values.message],
  ].filter(([, v]) => v && v.trim());
  return (
    <dl className="mt-6 divide-y divide-slate-200 border-y border-slate-200 text-small">
      {rows.map(([k, v]) => (
        <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-x-4 py-3">
          <dt className="font-semibold text-slate-900">{k}</dt>
          <dd className="break-words text-slate-700">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Appointment request form. Fields: Name, Phone, Email, Service, Preferred Date, Message.
 * Required: Name and Phone. Everything else is optional.
 *
 * States: idle, submitting, error (form stays, values kept), success, unconnected (no endpoint configured).
 * "Unconnected" is the honest default until VITE_CONTACT_ENDPOINT is set: nothing is sent, and the visitor is
 * told so and given the phone number. See src/content/visit.js.
 */
export default function AppointmentForm() {
  const { form: copy } = visit;
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | error | success | unconnected
  const [sent, setSent] = useState(EMPTY); // snapshot shown in the result panels
  // Today's date is only known in the browser, so it is set after mount (keeps pre-rendered HTML identical to the first client render).
  const [minDate, setMinDate] = useState(undefined);
  useEffect(() => setMinDate(todayISO()), []);
  const formRef = useRef(null);
  const panelRef = useRef(null);
  const errorCount = Object.values(errors).filter(Boolean).length;

  // Move focus to the result panel so screen reader and keyboard users land on the outcome.
  useEffect(() => {
    if (status === 'success' || status === 'unconnected') panelRef.current?.focus();
  }, [status]);

  const set = (name) => (e) => {
    const { value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const { [name]: _cleared, ...rest } = prev;
        return rest;
      });
    }
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setStatus('idle');
    requestAnimationFrame(() => formRef.current?.elements.namedItem('name')?.focus());
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;

    const found = validateRequest(values, todayISO());
    if (Object.keys(found).length > 0) {
      setErrors(found);
      const first = FIELD_ORDER.find((f) => found[f]);
      formRef.current?.elements.namedItem(first)?.focus();
      return;
    }
    setErrors({});

    // Honeypot: real people never see or fill this field. Pretend success so bots learn nothing.
    if (values.website) {
      setSent(values);
      setStatus('success');
      return;
    }

    const payload = {
      name: values.name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      service: values.service,
      preferredDate: values.date,
      message: values.message.trim(),
      sentFrom: 'website',
    };
    setSent({ ...values, name: payload.name, phone: payload.phone, email: payload.email, message: payload.message });

    if (!copy.endpoint) {
      setStatus('unconnected');
      return;
    }
    setStatus('submitting');
    try {
      await sendRequest(copy.endpoint, payload);
      setStatus('success');
      setValues(EMPTY);
    } catch {
      setStatus('error');
    }
  };

  /* ------------------------------------------------------------ result panels */
  if (status === 'success' || status === 'unconnected') {
    const ok = status === 'success';
    const panel = ok ? copy.success : copy.unconnected;
    const firstName = sent.name.trim().split(/\s+/)[0] || 'there';
    return (
      <Card variant="tint" className="lg:p-10" role="status" aria-live="polite">
        <div ref={panelRef} tabIndex={-1} className="outline-none">
          <div className="flex items-center gap-3">
            <span className={`inline-flex h-11 w-11 items-center justify-center rounded-md ${ok ? 'bg-aqua-100 text-aqua-800' : 'bg-brand-100 text-brand-700'}`}>
              <Icon as={ok ? CircleCheck : Phone} size="lg" />
            </span>
            <h3 className="text-h3">{panel.title}</h3>
          </div>
          <p className="mt-4 max-w-[52ch] text-slate-700">{ok ? panel.text(firstName) : panel.text}</p>
          <Summary values={sent} labels={copy.labels} />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {!ok && (
              <Button href={telHref} iconLeft={Phone} fullWidth="mobile">
                Call {site.phone.display}
              </Button>
            )}
            <Button variant="secondary" onClick={ok ? reset : () => setStatus('idle')} fullWidth="mobile">
              {ok ? panel.again : panel.back}
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  /* -------------------------------------------------------------------- form */
  const busy = status === 'submitting';
  return (
    <Card variant="tint" className="lg:p-10">
      <h3 className="text-h3">{copy.title}</h3>
      <p className="mt-2 max-w-[52ch] text-slate-600">{copy.intro}</p>

      <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={busy} className="mt-6 md:mt-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={copy.labels.name} error={errors.name}>
            <Input name="name" autoComplete="name" value={values.name} onChange={set('name')} />
          </Field>
          <Field label={copy.labels.phone} error={errors.phone}>
            <Input name="phone" type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={set('phone')} />
          </Field>
          <Field label={copy.labels.email} required={false} error={errors.email}>
            <Input name="email" type="email" inputMode="email" autoComplete="email" value={values.email} onChange={set('email')} />
          </Field>
          <Field label={copy.labels.date} required={false} error={errors.date}>
            <Input name="date" type="date" min={minDate} value={values.date} onChange={set('date')} />
          </Field>
          <Field label={copy.labels.service} required={false} className="sm:col-span-2">
            <Select name="service" value={values.service} onChange={set('service')}>
              <option value="">{copy.servicePlaceholder}</option>
              {copy.serviceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Field>
          <Field
            label={copy.labels.message}
            required={false}
            error={errors.message}
            hint={values.message.length > MAX_MESSAGE * 0.8 ? `${values.message.length} of ${MAX_MESSAGE} characters` : undefined}
            className="sm:col-span-2"
          >
            <Textarea name="message" value={values.message} onChange={set('message')} />
          </Field>
        </div>

        {/* Honeypot. Off-screen, skipped by keyboard and screen readers. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
          </label>
        </div>

        <p role="status" aria-live="polite" className="sr-only">
          {busy ? 'Sending your request' : errorCount ? `There ${errorCount === 1 ? 'is 1 problem' : `are ${errorCount} problems`} with the form` : ''}
        </p>

        {errorCount > 0 && (
          <p role="alert" className="mt-5 flex items-start gap-2 text-small font-medium text-danger-700">
            <Icon as={CircleAlert} size="sm" className="mt-0.5" />
            Please check the {errorCount === 1 ? 'field' : `${errorCount} fields`} marked above.
          </p>
        )}
        {status === 'error' && (
          <p role="alert" className="mt-5 flex items-start gap-2 rounded-md border border-danger-200 bg-danger-50 p-4 text-small font-medium text-danger-700">
            <Icon as={CircleAlert} size="sm" className="mt-0.5" />
            {copy.error}
          </p>
        )}

        <div className="mt-6 md:mt-8">
          <Button type="submit" iconLeft={CalendarCheck} disabled={busy} fullWidth="mobile" className="md:h-14 md:px-8">
            {busy ? copy.submitting : copy.submit}
          </Button>
        </div>
        {!copy.endpoint && (
          <ScaffoldNote>Dev note: no form endpoint is set (VITE_CONTACT_ENDPOINT), so a valid submission shows the "please call" panel and sends nothing. See src/content/visit.js.</ScaffoldNote>
        )}
      </form>
    </Card>
  );
}
