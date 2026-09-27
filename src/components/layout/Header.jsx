import { useEffect, useRef, useState } from 'react';
import { CalendarCheck, Phone } from 'lucide-react';
import { cn } from '@/lib/cn';
import { site, telHref, addressLine } from '@/config/site';
import { navItems, bookingTarget } from '@/config/sections';
import { useScrolled } from '@/hooks/useScrolled';
import { useActiveSection } from '@/hooks/useActiveSection';
import { Button, Icon, Logo } from '@/components/ui';

const desktopLink =
  'relative whitespace-nowrap px-2 py-2 text-small font-medium text-slate-700 transition-colors duration-200 hover:text-brand-800 xl:px-3 xl:text-button ' +
  'after:absolute after:inset-x-2 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-aqua-500 xl:after:inset-x-3 ' +
  'after:transition-transform after:duration-300 after:ease-out-quart hover:after:scale-x-100 ' +
  'aria-[current=location]:text-brand-800 aria-[current=location]:after:scale-x-100';

const iconButton =
  'inline-flex h-11 w-11 items-center justify-center rounded-md text-slate-900 transition-colors duration-200 hover:bg-slate-100';

/** Three bars that morph into a cross. Motion answers the tap. */
function MenuIcon({ open }) {
  const bar = 'absolute left-0 h-0.5 w-6 rounded-full bg-current transition-[top,transform,opacity] duration-300 ease-out-quart';
  return (
    <span className="relative block h-5 w-6" aria-hidden="true">
      <span className={cn(bar, open ? 'top-[9px] rotate-45' : 'top-[3px]')} />
      <span className={cn(bar, 'top-[9px]', open && 'opacity-0')} />
      <span className={cn(bar, open ? 'top-[9px] -rotate-45' : 'top-[15px]')} />
    </span>
  );
}

/**
 * Sticky header.
 *   below 1024px : logo, call icon, menu button (plus Book Appointment from 768px)
 *   1024px+      : logo, inline navigation, call icon (number from 1280px), Book Appointment
 * It condenses and gains a soft shadow once the page scrolls. `embedded` renders it in flow for the style guide.
 * `homeHref` is '' on the homepage (in-page anchors) and '/' on other pages (so anchors point back to the homepage).
 */
export default function Header({ embedded = false, homeHref = '' }) {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(8);
  const active = useActiveSection(navItems.map((n) => n.id));
  const toggleRef = useRef(null);
  const firstLinkRef = useRef(null);
  const condensed = scrolled && !embedded;

  // Menu behaviour: Escape closes, page scroll locks while open, closes if the screen widens to desktop.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => mq.matches && setOpen(false);
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onChange);
    if (!embedded) document.documentElement.style.overflow = 'hidden';
    // Everything behind the open menu becomes inert: unreachable by keyboard and hidden from screen readers.
    const inerted = [];
    if (!embedded) {
      document.querySelectorAll('main, footer, .skip-link, [data-action-bar]').forEach((el) => {
        if (!el.hasAttribute('inert')) {
          el.setAttribute('inert', '');
          inerted.push(el);
        }
      });
    }
    const focusTimer = setTimeout(() => firstLinkRef.current?.focus({ preventScroll: true }), 80);
    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onChange);
      document.documentElement.style.overflow = '';
      inerted.forEach((el) => el.removeAttribute('inert'));
    };
  }, [open, embedded]);

  const stagger = (i) => ({ transitionDelay: open ? `${90 + i * 45}ms` : '0ms' });

  return (
    <header
      className={cn(
        'z-50 border-b bg-white/95 transition-[box-shadow,border-color] duration-300',
        embedded ? 'relative' : 'sticky top-0',
        condensed && !open ? 'border-slate-200 shadow-sm' : open || embedded ? 'border-slate-200' : 'border-slate-200/60',
      )}
    >
      <div
        className={cn(
          'container-site flex items-center justify-between gap-4 transition-[height] duration-300 ease-out-quart',
          condensed ? 'h-16' : 'h-header',
        )}
      >
        <Logo href={`${homeHref}#top`} />

        <nav aria-label="Primary" className="hidden flex-1 justify-center lg:flex">
          <ul className="flex items-center">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`${homeHref}#${item.id}`} aria-current={active === item.id ? 'location' : undefined} className={desktopLink}>
                  {item.navLabel}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-1 md:gap-2 xl:gap-3">
          <a
            href={telHref}
            className="hidden items-center gap-2 whitespace-nowrap rounded-md px-2 py-2 text-button text-slate-800 transition-colors duration-200 hover:text-brand-600 xl:inline-flex"
          >
            <Icon as={Phone} size="sm" className="text-brand-600" />
            {site.phone.display}
          </a>
          <a href={telHref} aria-label={`Call ${site.phone.display}`} className={cn(iconButton, 'xl:hidden')}>
            <Icon as={Phone} size="lg" />
          </a>
          <Button href={`${homeHref}${bookingTarget}`} size="sm" className="hidden md:inline-flex">
            Book Appointment
          </Button>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className={cn(iconButton, '-mr-2 lg:hidden')}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {/* Mobile drawer: always mounted so it can animate; inert and invisible while closed. */}
      <div
        id="mobile-nav"
        inert={!open}
        className={cn(
          'absolute inset-x-0 top-full flex h-[calc(100dvh-var(--header-h))] flex-col overflow-y-auto border-t border-slate-200 bg-white lg:hidden',
          'transition-[opacity,transform,visibility] duration-300 ease-out-quart',
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 opacity-0',
        )}
      >
        <nav aria-label="Mobile" className="container-site flex-1 pt-2">
          <ul>
            {navItems.map((item, i) => {
              const isActive = active === item.id;
              return (
                <li
                  key={item.id}
                  style={stagger(i)}
                  className={cn(
                    'border-b border-slate-200 transition-[opacity,transform] duration-300 ease-out-quart',
                    open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
                  )}
                >
                  <a
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={`${homeHref}#${item.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex min-h-14 items-center gap-3 font-heading text-h3 transition-colors duration-200 hover:text-brand-600',
                      isActive ? 'text-brand-800' : 'text-slate-900',
                    )}
                  >
                    <span aria-hidden="true" className={cn('h-5 w-1 rounded-full transition-colors duration-200', isActive ? 'bg-aqua-400' : 'bg-transparent')} />
                    {item.navLabel}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          style={stagger(navItems.length)}
          className={cn(
            'container-site space-y-3 pb-8 pt-6 transition-[opacity,transform] duration-300 ease-out-quart',
            open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
          )}
        >
          <Button href={`${homeHref}${bookingTarget}`} fullWidth iconLeft={CalendarCheck} onClick={() => setOpen(false)}>
            Book Appointment
          </Button>
          <Button href={telHref} variant="secondary" fullWidth iconLeft={Phone}>
            Call {site.phone.display}
          </Button>
          <p className="pt-2 text-small text-slate-600">{addressLine()}</p>
        </div>
      </div>
    </header>
  );
}
