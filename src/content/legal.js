/**
 * Privacy Policy and Terms of Use. Node-safe (no aliases, no JSX) because the SEO plugin reads the titles.
 *
 * WHAT THIS IS: short, plain statements that describe only what this website actually does and the business
 * facts already supplied (name, address, phone). Nothing here is invented: no data-retention periods, legal
 * entity names, registration numbers, governing law, or rights the clinic has not confirmed.
 *
 * WHAT IT IS NOT: legal advice. The clinic should read both pages, and ideally have a legal professional review
 * them, before launch. If the site later adds analytics, advertising, cookies, a live map embed, or chat, the
 * Privacy Policy MUST be updated to say so (see the "cookies" line below), and `updated` changed.
 */
import { site } from '../config/site.js';

const phone = site.phone.display;
const address = `${site.address.line1}, ${site.address.area}, ${site.address.city} ${site.address.postalCode}, ${site.address.country}`;

export const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy/' },
  { label: 'Terms of Use', href: '/terms/' },
];

export const legal = {
  privacy: {
    title: 'Privacy Policy',
    description: `How the ${site.name} website handles the information you give it, including the appointment request form.`,
    updated: '26 September 2026',
    sections: [
      {
        heading: 'Who we are',
        paragraphs: [`This website is for ${site.name}, a dental clinic at ${address}. You can reach the clinic on ${phone}.`],
      },
      {
        heading: 'What this website collects',
        paragraphs: ['The only information this website receives from you is what you type into the appointment request form, and only if you choose to submit it:'],
        list: [
          'Your name and phone number',
          'Your email address, the service you are interested in, your preferred date and your message, if you choose to provide them',
        ],
        after: [
          'This website does not use advertising cookies or analytics, and does not track you across other websites.',
          'Like most websites, the server that delivers this site may keep standard technical logs, such as the pages requested and your IP address.',
        ],
      },
      {
        heading: 'Contacting us on WhatsApp',
        paragraphs: [
          `This website also has a "Chat on WhatsApp" button. If you use it, you leave this website and open a chat in WhatsApp, a messaging service provided by Meta. Anything you send there — your phone number, your name as saved in WhatsApp, and your message — is handled by WhatsApp under its own privacy policy, not this one. ${site.name} sees that chat like any other WhatsApp conversation.`,
        ],
      },
      {
        heading: 'How we use it',
        paragraphs: [
          'We use the details you send, whether through the appointment request form or on WhatsApp, to respond to your question or request. When you submit the form, your details are transmitted to the clinic through an online form-handling service.',
        ],
      },
      {
        heading: 'Links to other websites and services',
        paragraphs: ['This website links to Google Maps, to Google reviews, and to WhatsApp. Those services are run by Google and by Meta and have their own privacy policies.'],
      },
      {
        heading: 'Your choices',
        paragraphs: [`You do not have to use the form. You can call the clinic on ${phone} instead. To ask about details you have already sent, call the same number.`],
      },
      {
        heading: 'Changes to this policy',
        paragraphs: ['If this policy changes, the date at the top of this page will change too.'],
      },
    ],
  },

  terms: {
    title: 'Terms of Use',
    description: `The terms for using the ${site.name} website, including how appointment requests and general information work.`,
    updated: '26 September 2026',
    sections: [
      {
        heading: 'About this website',
        paragraphs: [`This website gives general information about ${site.name}, a dental clinic at ${address}.`],
      },
      {
        heading: 'Not dental or medical advice',
        paragraphs: [
          'The information on this website is general. It is not a substitute for professional dental advice, diagnosis or treatment. Always seek advice from a qualified dental professional about your own situation.',
        ],
      },
      {
        heading: 'Appointment requests',
        paragraphs: [
          'Submitting the appointment request form is a request only. An appointment is not confirmed until the clinic confirms it with you.',
        ],
      },
      {
        heading: 'Accuracy',
        paragraphs: [
          `We try to keep the information on this website accurate and up to date, but we cannot promise that it is complete or current. Please call ${phone} to check anything that matters to you.`,
        ],
      },
      {
        heading: 'Google rating and reviews',
        paragraphs: ['The Google rating and review count shown on this website come from Google and change over time.'],
      },
      {
        heading: 'Contacting us on WhatsApp',
        paragraphs: [
          'The "Chat on WhatsApp" button opens WhatsApp, a service run by Meta. Using it is subject to WhatsApp\'s own terms as well as these ones. As with the appointment form, a WhatsApp message is a request, not a confirmed booking.',
        ],
      },
      {
        heading: 'Other websites',
        paragraphs: ['This website links to other websites, including Google Maps and WhatsApp. We are not responsible for their content.'],
      },
      {
        heading: 'Using our content',
        paragraphs: ['Please do not copy or reuse the content of this website without permission.'],
      },
      {
        heading: 'Changes and questions',
        paragraphs: [`We may update these terms, and the date at the top of this page will change when we do. For any question, call ${phone}.`],
      },
    ],
  },
};
