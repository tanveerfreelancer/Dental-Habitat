import { MessageSquareText, PenLine, ShieldCheck } from 'lucide-react';
import { site } from '@/config/site';

/**
 * Reviews section content.
 *
 * NO REVIEW TEXT AND NO PATIENT NAMES appear anywhere in this project, because none have been supplied.
 * The section shows the aggregate rating (from src/config/site.js) and sends people to Google to read the real
 * reviews. The three points below describe how Google reviews work, and make no claim about the clinic.
 * Re-check the rating and count against the Google listing before launch; they change.
 */
export const reviews = {
  eyebrow: 'Google Reviews',
  title: 'See What Patients Say on Google',
  lead: `${site.name} is rated ${site.google.rating} out of ${site.google.scale} from ${site.google.reviewCount} reviews on Google. Read them in full before you decide.`,

  points: [
    {
      id: 'independent',
      icon: ShieldCheck,
      title: 'Posted on Google',
      text: 'Reviews live on Google, an independent platform, not on this website.',
    },
    {
      id: 'read',
      icon: MessageSquareText,
      title: 'Read them in full',
      text: 'Open our Google listing to read every review and check the latest rating.',
    },
    {
      id: 'share',
      icon: PenLine,
      title: 'Add your own',
      text: "Visited us? You're welcome to share your experience with a Google review.",
    },
  ],

  cta: { label: 'View Reviews on Google', href: site.google.mapsUrl },
};
