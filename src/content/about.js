import { site } from '@/config/site';

/**
 * About section copy. DRAFT: written from the brief only (comfort, personalised care, location).
 * It states no qualifications, experience, awards or equipment. The clinic should read it and confirm it
 * describes how they actually work before launch.
 */
export const about = {
  eyebrow: 'About Dental Habitat',
  title: 'Modern Dental Care in Garden Town',
  lead: `Dental Habitat is a dental clinic in ${site.address.area}, ${site.address.city}, where care is planned around you and every visit is meant to feel calm and unhurried.`,
  body: [
    'We take the time to listen, explain what we see in plain language, and talk through your options, so you can make decisions about your own care with confidence.',
    `You'll find us on ${site.address.line1.split(', ').pop()} in ${site.address.area}, a convenient location for patients across the neighborhood.`,
  ],
};
