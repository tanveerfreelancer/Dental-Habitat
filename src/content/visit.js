import { site } from '@/config/site';
import { services } from '@/content/services';

/**
 * Contact + Location section content.
 *
 * NOT SUPPLIED, SO NOT SHOWN: email address, opening hours, social accounts, parking or transport details.
 * The address, phone and map link all come from src/config/site.js.
 *
 * THE FORM HAS NO BACKEND YET. It is fully built (validation, states, accessibility), but there is no clinic
 * email and no form service to send to. Set VITE_CONTACT_ENDPOINT at build time (see .env.example) to any
 * service that accepts a JSON POST (Formspree, Getform, Netlify function, your own API). Until then, submitting a
 * valid form shows an honest "not sent, please call" message. It never pretends a request was delivered.
 *
 * MAP AREA: if `map.embedUrl` is set, a live Google map is shown. Otherwise, if site.visitImage is set, the photo of the
 * clinic entrance is shown (linking to Google Maps). With neither, a drawn placeholder is shown.
 * `map.embedUrl` is null today. To use the live map, open the clinic on Google
 * Maps > Share > Embed a map, copy the src="..." URL of the iframe, and paste it here.
 */
export const visit = {
  eyebrow: 'Contact and location',
  title: 'Visit Dental Habitat',
  lead: 'A dentist in Garden Town, Lahore. Call us, get directions, or send an appointment request.',

  details: {
    addressLabel: 'Address',
    phoneLabel: 'Phone',
    addressLines: [
      site.address.line1,
      `${site.address.area}, ${site.address.city} ${site.address.postalCode}`,
      site.address.country,
    ],
  },
  buttons: { call: 'Call Now', directions: 'Get Directions' },

  map: {
    embedUrl: null,
    title: 'Map showing the location of Dental Habitat',
    linkLabel: 'Open in Google Maps',
    caption: 'Illustration only. Use Get Directions for the exact location.',
    photoCaption: 'The clinic entrance from the street. Use Get Directions for the exact location.',
  },

  form: {
    endpoint: import.meta.env.VITE_CONTACT_ENDPOINT || null,
    title: 'Request an appointment',
    intro: 'Tell us what you need. A preferred date is a request, not a confirmed booking.',
    labels: {
      name: 'Name',
      phone: 'Phone',
      email: 'Email',
      service: 'Service',
      date: 'Preferred Date',
      message: 'Message',
    },
    servicePlaceholder: 'Select a service',
    serviceOptions: [...services.items.map((s) => s.title), 'Not sure yet'],
    submit: 'Request Appointment',
    submitting: 'Sending…',

    success: {
      title: 'Request sent',
      text: (firstName) =>
        `Thank you, ${firstName}. Your request has been sent to the clinic. It is not a confirmed booking until the clinic confirms it with you.`,
      again: 'Send another request',
    },
    unconnected: {
      title: 'Please call to book',
      text: `Online requests aren't switched on yet, so your request has not been sent. To arrange your appointment, please call ${site.phone.display}.`,
      back: 'Back to the form',
    },
    error: `Your request couldn't be sent. Your details are still here. Please try again, or call ${site.phone.display}.`,
  },
};
