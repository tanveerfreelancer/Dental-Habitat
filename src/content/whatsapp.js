import { site } from '@/config/site';

/**
 * Floating WhatsApp button copy. The number is not repeated here: it comes from site.phone (single source of
 * truth). `prefilledMessage` only pre-fills the text box on the visitor's own phone before they send it; it is
 * never sent automatically and the visitor can change or delete it.
 */
export const whatsapp = {
  ariaLabel: `Chat with ${site.name} on WhatsApp`,
  tooltip: 'Chat on WhatsApp',
  prefilledMessage: `Hi ${site.name}, I'd like to ask about booking an appointment.`,
};
