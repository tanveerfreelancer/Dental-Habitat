import Hero from './Hero';
import About from './About';
import Services from './Services';
// Why Choose Us + Trust. The earlier ./WhyChooseUs file is kept on disk, unused; swap this import back to restore it.
import WhyChooseUs from './WhyChooseUsTrust';
import Reviews from './Reviews';
import Faq from './Faq';
import Contact from './Contact';
import Visit from './Visit';
import ClinicInfo from './ClinicInfo';

/** id → component. Order and metadata live in src/config/sections.js. */
export const sectionComponents = {
  top: Hero,
  about: About,
  services: Services,
  'why-us': WhyChooseUs,
  reviews: Reviews,
  faq: Faq,
  contact: Contact,
  visit: Visit,
  'clinic-info': ClinicInfo,
};
