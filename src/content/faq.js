import { site, addressLine, telHref } from '@/config/site';

/**
 * FAQ content. DRAFT. Every answer uses only facts already supplied (phone, address, map link) or plain,
 * hedged general guidance. No opening hours, email, prices, policies, or clinician details are stated, because
 * none have been supplied. The clinic should read each answer and confirm or replace it.
 *
 * Item fields: id, question, answer (string), points (optional bullet list), note (optional closing line),
 * link (optional { label, href, external }).
 *
 * MEDICAL-ADJACENT: the last answer gives general guidance on checkup frequency. The clinic must confirm
 * that advice matches how their dentists work, or replace it.
 */
export const faq = {
  eyebrow: 'Before your visit',
  title: 'Frequently Asked Questions',
  lead: 'Quick answers about booking, finding us and getting ready for your appointment.',
  defaultOpen: ['book'],

  fallback: {
    text: "Can't find your answer?",
    link: { label: `Call ${site.phone.display}`, href: telHref },
  },

  items: [
    {
      id: 'book',
      question: 'How can I book an appointment?',
      answer: `The simplest way is to call ${site.name} on ${site.phone.display}. The Book an Appointment buttons on this page take you to our contact details, where you can call straight from your phone.`,
      link: { label: `Call ${site.phone.display}`, href: telHref },
    },
    {
      id: 'location',
      question: `Where is ${site.name} located?`,
      answer: `${site.name} is at ${addressLine()}.`,
      link: { label: 'View on Google Maps', href: site.google.mapsUrl, external: true },
    },
    {
      id: 'contact',
      question: 'How can I contact the clinic?',
      answer: `You can reach the clinic by phone on ${site.phone.display}, or visit us at ${site.address.line1}, ${site.address.area}. To arrange a visit or ask a question before you book, please call.`,
      link: { label: `Call ${site.phone.display}`, href: telHref },
    },
    {
      id: 'bring',
      question: 'What should I bring to my dental appointment?',
      answer: 'It usually helps to bring:',
      points: [
        'A list of any medicines you take, and details of any medical conditions or allergies',
        'Any previous dental records or X-rays you have',
        'Any questions or concerns you would like to talk through',
      ],
      note: 'If there is anything specific to bring, the clinic can tell you when you call to book.',
    },
    {
      id: 'checkup',
      question: 'How often should I have a dental checkup?',
      answer:
        'There is no single answer that suits everyone, because it depends on your own oral health. As a general guide, many people are advised to have a checkup roughly every six to twelve months. Your dentist can recommend a schedule that suits you.',
      link: { label: 'Call to book a checkup', href: telHref },
    },
  ],
};
