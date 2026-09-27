import { MapPin, Phone, Mail } from 'lucide-react';
import { site, telHref, addressLine } from '@/config/site';
import { footerItems } from '@/config/sections';
import { services } from '@/content/services';
import { legalLinks } from '@/content/legal';
import { Icon, Logo, Rating, TextLink } from '@/components/ui';

const link = 'inline-block py-2 text-small transition-colors duration-200 hover:text-white';

/**
 * Footer: brand, quick links, services, address and phone, Google Maps link, copyright, legal links.
 * Renders only what exists in src/config/site.js. Email, hours and social links appear automatically when
 * they are added there; until then they are simply absent.
 * `homeHref` is '' on the homepage and '/' elsewhere, so in-page anchors still work from the legal pages.
 */
export default function Footer({ homeHref = '' }) {
  return (
    <footer className="surface-inverse bg-brand-950 pb-10 pt-16 md:pb-12 md:pt-20">
      <div className="container-site grid grid-cols-1 gap-12 md:grid-cols-8 lg:grid-cols-12">
        <div className="md:col-span-8 lg:col-span-4">
          <Logo tone="dark" href={`${homeHref}#top`} />
          <p className="mt-4 max-w-[36ch] text-small">
            Dental clinic in {site.address.area}, {site.address.city}.
          </p>
          <Rating tone="dark" size="sm" href={site.google.mapsUrl} className="mt-6" />
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:col-span-8 lg:col-span-5">
          <nav aria-label="Quick links">
            <h2 className="text-h4 text-white">Quick links</h2>
            <ul className="mt-3">
              {footerItems.map((item) => (
                <li key={item.id}>
                  <a href={`${homeHref}#${item.id}`} className={link}>
                    {item.navLabel}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Services">
            <h2 className="text-h4 text-white">Services</h2>
            <ul className="mt-3">
              {services.items.map((item) => (
                <li key={item.id}>
                  <a href={`${homeHref}#services`} className={link}>
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="md:col-span-8 lg:col-span-3">
          <h2 className="text-h4 text-white">Visit or call</h2>
          <ul className="mt-4 space-y-4 text-small">
            <li className="flex gap-3">
              <Icon as={MapPin} size="sm" className="mt-1 text-aqua-300" />
              <address className="not-italic">{addressLine()}</address>
            </li>
            <li className="flex gap-3">
              <Icon as={Phone} size="sm" className="mt-1 text-aqua-300" />
              <a href={telHref} className="inline-block py-1 transition-colors duration-200 hover:text-white">
                {site.phone.display}
              </a>
            </li>
            {site.email && (
              <li className="flex gap-3">
                <Icon as={Mail} size="sm" className="mt-1 text-aqua-300" />
                <a href={`mailto:${site.email}`} className="transition-colors duration-200 hover:text-white">
                  {site.email}
                </a>
              </li>
            )}
          </ul>
          <p className="mt-6">
            <TextLink href={site.google.mapsUrl} external tone="inverse">
              Open in Google Maps
            </TextLink>
          </p>
        </div>
      </div>

      <div className="container-site mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-small md:mt-16 md:flex-row md:items-center md:justify-between">
        <p>
          © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {site.name}
        </p>
        {/* Extra right clearance from md up to lg/xl, where a fixed floating button (see WhatsAppButton) would
            otherwise sit over these links once the page is scrolled to the very end; not needed once the
            container gains enough side margin on its own (from xl) or on narrow phones where this row stacks. */}
        <ul className="flex flex-wrap gap-x-6 md:pr-20 2xl:pr-0">
          {legalLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={link}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
