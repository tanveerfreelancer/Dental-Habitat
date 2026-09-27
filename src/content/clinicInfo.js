import { Accessibility, Armchair, Baby, Building2, CalendarCheck, CircleParking, Check, CreditCard, DoorOpen, Toilet } from 'lucide-react';
import { site } from '@/config/site';

/**
 * Clinic Information & Amenities content.
 *
 * The FACTS come only from site.businessProfile (verified Google Business Profile attributes). This file adds
 * presentation: headings and an icon per item. An item with no icon listed below falls back to a plain check mark,
 * so adding a fact to site.js can never break the layout, but it will not gain an icon until you add one here.
 * Icons are chosen so none implies something that is not on the profile (no cash symbol, for example).
 */
const ICONS = {
  'Wheelchair accessible entrance': DoorOpen,
  'Wheelchair accessible parking lot': CircleParking,
  'Wheelchair accessible restroom': Toilet,
  'Wheelchair accessible seating': Armchair,
  'Onsite services': Building2,
  Restroom: Toilet,
  'Appointments recommended': CalendarCheck,
  'Debit cards': CreditCard,
  'Credit cards': CreditCard,
  'Nursing room': Baby,
};

const items = (labels) => labels.map((label) => ({ label, icon: ICONS[label] ?? Check }));
const p = site.businessProfile;

export const clinicInfo = {
  title: 'Clinic Information & Amenities',
  lead: 'Practical details to help you plan your visit.',
  source: 'Details as listed on our Google Business Profile.',

  /** The featured group, shown as a list in its own panel. */
  featured: { id: 'accessibility', title: 'Accessibility', icon: Accessibility, items: items(p.accessibility) },

  /** Everything else, shown as labelled rows of icon chips. */
  groups: [
    { id: 'services', title: 'Services', items: items(p.services) },
    { id: 'amenities', title: 'Amenities', items: items(p.amenities) },
    { id: 'planning', title: 'Planning', items: items(p.planning) },
    { id: 'payments', title: 'Payments', items: items(p.payments) },
    { id: 'children', title: 'Children', items: items(p.children) },
  ],
};
