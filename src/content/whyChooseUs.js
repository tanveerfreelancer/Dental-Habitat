import { CalendarCheck, HeartHandshake, MapPin, MessageCircleMore, Sofa, Stethoscope } from 'lucide-react';
import { site } from '@/config/site';
import { bookingTarget } from '@/config/sections';

/**
 * Why Choose Us copy. DRAFT: every line describes an intention or a fact already supplied
 * (location, phone). No qualifications, experience, awards, equipment or outcomes are claimed.
 * The clinic should confirm each line is true of how they work.
 *
 * `action` is optional: { label, href, external? } renders a quiet link under the description.
 */
export const whyChooseUs = {
  title: 'Why Choose Dental Habitat',
  lead: 'The everyday details that make a dental visit feel simple and comfortable.',
  items: [
    {
      id: 'patient-focused',
      icon: HeartHandshake,
      title: 'Patient-Focused Care',
      text: 'Your questions, comfort and goals shape every visit, so your care is planned around you.',
    },
    {
      id: 'comfortable',
      icon: Sofa,
      title: 'Comfortable Environment',
      text: 'A calm, welcoming space that helps you feel at ease from the moment you arrive.',
    },
    {
      id: 'modern',
      icon: Stethoscope,
      title: 'Modern Dental Approach',
      text: 'A contemporary approach to dental care, with each step explained so you know what to expect.',
    },
    {
      id: 'location',
      icon: MapPin,
      title: 'Convenient Garden Town Location',
      text: `Find us at ${site.address.line1}, ${site.address.area}, ${site.address.city}, easy to reach for patients in the area.`,
      action: { label: 'View on Google Maps', href: site.google.mapsUrl, external: true },
    },
    {
      id: 'communication',
      icon: MessageCircleMore,
      title: 'Clear Communication',
      text: 'We explain what we find and what your options are in plain language, and you can ask questions at any point.',
    },
    {
      id: 'booking',
      icon: CalendarCheck,
      title: 'Easy Appointment Booking',
      text: `Call ${site.phone.display} or request an appointment on this page to arrange your visit.`,
      action: { label: 'Book an appointment', href: bookingTarget },
    },
  ],
};
