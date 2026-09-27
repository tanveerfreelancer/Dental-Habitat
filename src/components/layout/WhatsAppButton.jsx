import { whatsappHref } from '@/config/site';
import { whatsapp } from '@/content/whatsapp';
import { WhatsAppIcon } from '@/components/ui';

/**
 * Floating "chat on WhatsApp" button, present on every page. It is additive: it sits alongside the phone-call
 * options already on the site (tel: links, the mobile Call button), never replacing them, so a visitor can
 * still choose to phone the clinic directly.
 *
 * Position: fixed bottom-right everywhere. On phones it sits above the sticky Call/Book bar's full height
 * (see components/layout/MobileActionBar.jsx) even while that bar is off-screen, since the bar keeps its
 * height reserved in the layout. `data-action-bar` makes it inert (and, via z-index, visually covered by the
 * open drawer) while the mobile menu is open, matching how the Call/Book bar already behaves.
 *
 * Wrapped in its own `<nav>` landmark (like the Call/Book bar) so it is never a link floating outside every
 * landmark region on the page.
 */
export default function WhatsAppButton() {
  const href = whatsappHref(whatsapp.prefilledMessage);

  return (
    <nav aria-label="WhatsApp contact" data-action-bar className="contents">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={whatsapp.ariaLabel}
        title={whatsapp.tooltip}
        className="group fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 ease-out-quart hover:scale-105 focus-visible:scale-105 motion-reduce:transition-none md:bottom-6 md:right-6"
      >
        <WhatsAppIcon size={30} />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </nav>
  );
}
