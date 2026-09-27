import { ClipboardCheck, Droplets, Puzzle, ShieldPlus, Smile, Sparkles } from 'lucide-react';
import { bookingTarget } from '@/config/sections';

/**
 * Services section content.
 *
 * The six service NAMES were supplied by the clinic. The descriptions are DRAFT, general explanations of what each
 * treatment is. They make no claims about results, comfort, speed, equipment, or who performs the treatment, and
 * state no prices. The clinic should confirm it offers each treatment and is happy with each line.
 *
 * Layout note: the grid draws its hairlines with a 1px gap, so keep the item count a multiple of 6 (or 2 and 3)
 * to avoid an empty grey cell.
 */
export const services = {
  eyebrow: 'Our Services',
  title: 'Dental Care, From Checkups to Root Canals',
  lead: 'The treatments we offer, explained simply so you know what to expect.',

  items: [
    {
      id: 'general',
      icon: Smile,
      title: 'General Dentistry',
      text: 'Everyday care for your teeth and gums, planned around your needs and explained in plain language.',
    },
    {
      id: 'checkups',
      icon: ClipboardCheck,
      title: 'Dental Checkups',
      text: 'Regular examinations to check the health of your teeth and gums and to catch concerns early.',
    },
    {
      id: 'cleaning',
      icon: Droplets,
      title: 'Teeth Cleaning & Scaling',
      text: 'Professional removal of plaque and tartar build-up, to help keep your teeth and gums healthy.',
    },
    {
      id: 'whitening',
      icon: Sparkles,
      title: 'Teeth Whitening',
      text: 'A cosmetic treatment that helps lighten stains and discoloration for a brighter smile.',
    },
    {
      id: 'root-canal',
      icon: ShieldPlus,
      title: 'Root Canal Treatment',
      text: 'Treatment for an infected or badly damaged tooth, aimed at relieving pain and saving the natural tooth.',
    },
    {
      id: 'fillings',
      icon: Puzzle,
      title: 'Dental Fillings',
      text: 'Repair for teeth affected by decay or minor damage, restoring their shape and function.',
    },
  ],

  /**
   * "View All Services". There is no separate services page yet, so this points to the appointment section,
   * where a visitor can ask about any treatment. When a services page exists, change `href` to it (e.g. '/services').
   */
  cta: { label: 'View All Services', href: bookingTarget },
};
