import { useEffect, useState } from 'react';
import { CalendarCheck, Phone } from 'lucide-react';
import { cn } from '@/lib/cn';
import { telHref, site } from '@/config/site';
import { bookingTarget } from '@/config/sections';
import { Button } from '@/components/ui';

/**
 * Phones only (hidden from 768px). Slides up once the hero has scrolled away, so it never
 * duplicates the hero's own buttons, and steps aside once the visitor reaches the appointment section,
 * which offers the same two actions.
 */
export default function MobileActionBar() {
  const [pastHero, setPastHero] = useState(false);
  const [atAppointment, setAtAppointment] = useState(false);
  const show = pastHero && !atAppointment;

  // Position-based (not IntersectionObserver): an observer only fires when an element *crosses* the viewport,
  // so jumping straight to the bottom (End key, dragging the scrollbar) would skip the appointment section
  // and leave this bar covering the footer.
  useEffect(() => {
    const hero = document.getElementById('top');
    const contact = document.getElementById('contact');
    let frame = 0;
    const update = () => {
      frame = 0;
      setPastHero(!hero || hero.getBoundingClientRect().bottom < 0);
      setAtAppointment(Boolean(contact) && contact.getBoundingClientRect().top < window.innerHeight);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav
      aria-label="Quick actions"
      inert={!show}
      data-action-bar
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-md',
        'transition-transform duration-300 ease-out-quart md:hidden',
        show ? 'translate-y-0' : 'translate-y-full',
      )}
    >
      <div className="grid grid-cols-2 gap-2 px-4 py-2">
        <Button href={telHref} variant="secondary" iconLeft={Phone} aria-label={`Call ${site.phone.display}`}>
          Call
        </Button>
        <Button href={bookingTarget} iconLeft={CalendarCheck}>
          Book
        </Button>
      </div>
    </nav>
  );
}
