/**
 * Page structure. One entry per section of the Home page, in scroll order.
 * Data only: components live in src/sections and are wired up in src/sections/index.js.
 *
 *   inNav    → shown in the header navigation
 *   navLabel → label used in header, mobile menu and footer (null = not listed)
 */
export const sectionsMeta = [
  { id: 'top', name: 'Home', file: 'Hero.jsx', navLabel: 'Home', inNav: true, purpose: 'What the clinic is, where it is, and one clear next step.' },
  { id: 'about', name: 'About', file: 'About.jsx', navLabel: 'About', inNav: true, purpose: 'Who the clinic is and how it cares for patients. Draft copy in src/content/about.js, to be confirmed by the clinic.' },
  { id: 'services', name: 'Services', file: 'Services.jsx', navLabel: 'Services', inNav: true, purpose: 'Six treatments (names supplied by the clinic) with general draft descriptions in src/content/services.js. No prices or claims.' },
  { id: 'why-us', name: 'Why Choose Us', file: 'WhyChooseUsTrust.jsx', navLabel: 'Why Choose Us', inNav: true, purpose: 'Six reasons to choose the clinic, plus a compact trust strip (Google rating, review count, location). Draft copy in src/content/whyChooseUs.js. Only claims the clinic can back up.' },
  { id: 'reviews', name: 'Reviews', file: 'Reviews.jsx', navLabel: 'Reviews', inNav: true, purpose: 'Rating-focused: the real Google rating and count, an arch gauge, and a link to read the reviews on Google. No review quotes or names until the clinic supplies real ones.' },
  { id: 'faq', name: 'FAQ', file: 'Faq.jsx', navLabel: 'FAQ', inNav: true, purpose: 'Five common questions in an accordion. Draft answers in src/content/faq.js use only supplied facts; the clinic should confirm them.' },
  { id: 'contact', name: 'Contact and appointment', file: 'Contact.jsx', navLabel: 'Contact', inNav: true, purpose: 'Appointment call to action: Book an Appointment, call, and the clinic address. Holds the #appointment anchor every Book button points to.' },
  { id: 'visit', name: 'Contact and location', file: 'Visit.jsx', navLabel: null, inNav: false, purpose: 'Address, phone, Call Now, Get Directions, a map area and the appointment request form. Form sending is not connected until VITE_CONTACT_ENDPOINT is set. No email or opening hours: none supplied.' },
  { id: 'clinic-info', name: 'Clinic information and amenities', file: 'ClinicInfo.jsx', navLabel: null, inNav: false, purpose: 'Verified Google Business Profile details: accessibility, services, amenities, planning, payments, children. Facts live in site.js (businessProfile); nothing else is claimed.' },
];

export const navItems = sectionsMeta.filter((s) => s.inNav);
export const footerItems = sectionsMeta.filter((s) => s.navLabel);
/** Every "Book Appointment" button points here. The anchor sits at the top of the Contact section. */
export const bookingTarget = '#appointment';
