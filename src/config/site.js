/**
 * Dental Habitat — business data. The single source of truth.
 *
 * Every component, the footer, the meta tags and the LocalBusiness schema read from here.
 * To change a phone number or address, change it in this file and nowhere else.
 *
 * RULE: only facts supplied by the clinic belong here. Anything not supplied is `null` / `[]`,
 * and components render nothing for it instead of inventing a value.
 */
export const site = {
  name: 'Dental Habitat',

  /** Public domain, e.g. 'https://www.example.com'. Not supplied yet. Set SITE_URL at build time (see .env.example). */
  url: null,

  language: 'en-PK',

  phone: {
    display: '0309\u00A01459068', // non-breaking space: the number never splits across two lines
    e164: '+923091459068', // same number in dialling format, for tel: links and schema
  },

  address: {
    line1: '14 New, Tipu Block',
    area: 'Garden Town',
    city: 'Lahore',
    postalCode: '54660',
    country: 'Pakistan',
    countryCode: 'PK',
    region: null, // optional; add if you want it in the schema
  },

  google: {
    rating: 4.3,
    reviewCount: 52,
    scale: 5,
    mapsUrl: 'https://maps.google.com/maps?ftid=0x39190539cf69dcc1:0x99cb05def30085eb',
    // Ratings change. Re-check both numbers against the Google listing before launch.
  },

  /* ---- NOT SUPPLIED YET. Left empty on purpose. ------------------------------------------ */
  email: null,
  /**
   * Opening hours. Format when supplied:
   * [{ days: ['Monday', 'Tuesday'], opens: '09:00', closes: '17:00' }]
   */
  hours: null,
  /** e.g. { facebook: 'https://…', instagram: 'https://…' } */
  socials: {},
  /** Logo file path (svg preferred). Until then the wordmark placeholder is used. */
  logo: null,
  /**
   * Hero photograph: the treatment room. `src` is a key from images.config.json (see the README). If it is
   * null the illustrated placeholder is shown. `alt` is required and must describe what the photo actually shows.
   */
  heroImage: {
    src: 'hero',
    alt: 'Treatment room at Dental Habitat dental clinic in Garden Town, Lahore, with a blue dental chair and overhead light',
  },
  /** Photo for the About section: the patient seating area. Same rules as heroImage. */
  aboutImage: {
    src: 'about',
    alt: 'Patient seating area at Dental Habitat, with cream armchairs, a small shelf, a rug and a wall mirror',
  },
  /** Photo of the clinic entrance, shown in the Contact + Location section. */
  visitImage: {
    src: 'visit',
    alt: 'Front of the Dental Habitat clinic in Garden Town, Lahore, showing the clinic sign, entrance gate and palm trees',
  },
  /**
   * External online-booking link, if the clinic has one. Not supplied. While null, the "Book an Appointment"
   * button in the appointment section dials the clinic (the only booking channel supplied).
   */
  bookingUrl: null,
  /** 1200 × 630 image for link previews. */
  ogImage: '/images/og.jpg',
  /** Clinicians. Names and qualifications must come from the clinic. */
  dentists: [],

  /**
   * Verified Google Business Profile attributes, exactly as listed. Do not add anything here that is not on the
   * profile. Used by the Clinic Information section and, where it applies, by the schema (amenities, payments).
   */
  businessProfile: {
    accessibility: [
      'Wheelchair accessible entrance',
      'Wheelchair accessible parking lot',
      'Wheelchair accessible restroom',
      'Wheelchair accessible seating',
    ],
    services: ['Onsite services'],
    amenities: ['Restroom'],
    planning: ['Appointments recommended'],
    payments: ['Debit cards', 'Credit cards'],
    children: ['Nursing room'],
  },

  schema: {
    /**
     * Off by default. Google does not show star rich results for a business marking up its own
     * ratings, and mirroring third-party ratings into schema is best left out. The rating is
     * still displayed on the page; it is just not marked up.
     */
    includeAggregateRating: false,
  },
};

/* ---------------------------------------------------------------- derived */

export const addressLine = (a = site.address) =>
  `${a.line1}, ${a.area}, ${a.city} ${a.postalCode}, ${a.country}`;

export const telHref = `tel:${site.phone.e164}`;

/**
 * WhatsApp click-to-chat link, built from the same verified phone number (no separate number is introduced).
 * WhatsApp's link format wants digits only, no "+"; site.phone.e164 is already in full international form.
 */
export const whatsappHref = (message = '') =>
  `https://wa.me/${site.phone.e164.replace('+', '')}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

/** Draft meta copy. Built only from supplied facts. Review before launch. */
export const seo = {
  title: `${site.name} | Dental Clinic in ${site.address.area}, ${site.address.city}`,
  description: `Looking for a dentist in ${site.address.area}, ${site.address.city}? ${site.name} is a dental clinic rated ${site.google.rating}/5 from ${site.google.reviewCount} Google reviews. Call ${site.phone.display.replace(/\u00A0/g, ' ')} to book.`,
};
