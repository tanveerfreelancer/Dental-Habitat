/**
 * Appointment request validation. Pure functions, no imports, so they can be unit tested in Node.
 * Messages are plain language and say how to fix the problem.
 *
 * Required: name, phone. Optional: email, preferred date, service, message.
 */
export const FIELD_ORDER = ['name', 'phone', 'email', 'date', 'message'];

export const MESSAGES = {
  name: 'Enter your name.',
  phone: 'Enter a phone number we can call you on, for example 03XX XXXXXXX.',
  email: 'Enter a valid email address, or leave this blank.',
  date: 'Choose today or a later date, or leave this blank.',
  message: 'Please keep your message under 1000 characters.',
};

export const MAX_MESSAGE = 1000;

/** Local calendar date as YYYY-MM-DD (what <input type="date"> uses). */
export function todayISO(now = new Date()) {
  const p = (n) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())}`;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_CHARS = /^[+()\-\s\d.]+$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

export function validateRequest(values, today = todayISO()) {
  const errors = {};
  const name = values.name.trim();
  const phone = values.phone.trim();
  const email = values.email.trim();
  const date = values.date.trim();

  if (name.length < 2) errors.name = MESSAGES.name;

  const digits = phone.replace(/\D/g, '');
  if (!phone || !PHONE_CHARS.test(phone) || digits.length < 10 || digits.length > 15) errors.phone = MESSAGES.phone;

  if (email && !EMAIL.test(email)) errors.email = MESSAGES.email;

  if (date) {
    const real = DATE.test(date) && !Number.isNaN(Date.parse(`${date}T00:00:00`));
    if (!real || date < today) errors.date = MESSAGES.date;
  }

  if (values.message.length > MAX_MESSAGE) errors.message = MESSAGES.message;
  return errors;
}
