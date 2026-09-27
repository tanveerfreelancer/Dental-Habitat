import { site, addressLine, telHref } from '@/config/site';

/**
 * Appointment call-to-action content.
 *
 * Only ONE booking channel has been supplied: the phone number. So "Book an Appointment" dials the clinic.
 * If the clinic gets an online booking page, set `bookingUrl` in src/config/site.js and this button will
 * open it in a new tab instead. There is no booking form and no email or WhatsApp link, because none exist.
 * No opening hours are shown, because none have been supplied.
 */
export const appointment = {
  eyebrow: 'Appointments',
  title: 'Ready to Take Care of Your Smile?',
  lead: `Call ${site.name} to arrange your appointment.`,

  primary: {
    label: 'Book an Appointment',
    href: site.bookingUrl ?? telHref,
    external: Boolean(site.bookingUrl),
    hint: site.bookingUrl ? '(opens in a new tab)' : `(calls ${site.phone.display})`,
  },
  secondary: { label: `Call ${site.phone.display}`, href: telHref },

  visit: {
    label: 'Visit us',
    // one line per row: "14 New, Tipu Block" / "Garden Town, Lahore 54660" / "Pakistan"
    lines: [
      site.address.line1,
      `${site.address.area}, ${site.address.city} ${site.address.postalCode}`,
      site.address.country,
    ],
    full: addressLine(),
    mapLink: { label: 'View on Google Maps', href: site.google.mapsUrl },
  },
};
