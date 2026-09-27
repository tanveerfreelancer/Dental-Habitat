import { CalendarCheck, Phone } from 'lucide-react';
import { site, telHref } from '@/config/site';
import { bookingTarget } from '@/config/sections';
import { Button, Media, Section, Stars, Grid } from '@/components/ui';
import HeroVisual from './hero/HeroVisual';
import FloatingStat from './hero/FloatingStat';
import TrustRow from './hero/TrustRow';

/** Staggers the entrance of the text column. Each step is 90ms after the last. */
const rise = (step) => ({ animationDelay: `${step * 90}ms` });

/**
 * Hero: the page's only H1.
 * Copy is fixed by the brief. Facts (rating, count, phone, area) come from src/config/site.js.
 * Photo: set site.heroImage.src and .alt to replace the illustration.
 */
export default function Hero() {
  const { rating, reviewCount } = site.google;
  const photo = site.heroImage;

  return (
    <Section
      id="top"
      labelledBy="hero-title"
      containerClassName="relative"
      className="relative overflow-x-clip pb-16 pt-8 md:pb-20 md:pt-12 lg:pb-24 lg:pt-16"
    >
      <Grid className="relative items-center gap-y-12 md:gap-y-0">
        {/* ------------------------------------------------------ copy */}
        <div className="col-span-4 md:col-span-4 lg:col-span-7 xl:col-span-6">
          <div className="eyebrow-wrap animate-rise" style={rise(0)}>
            <p className="eyebrow-caps">
              <span>Modern dental care</span>
              <span aria-hidden="true" className="eyebrow-dot h-1 w-1 rounded-full bg-gold-500" />
              <span>
                {site.address.area}, {site.address.city}
              </span>
            </p>
          </div>

          <h1 id="hero-title" className="mt-5 animate-rise md:mt-6" style={rise(1)}>
            Confident Smiles Start With Better Dental Care
          </h1>

          <p className="mt-5 max-w-[46ch] animate-rise text-lead text-slate-600 md:mt-6" style={rise(2)}>
            Personalized dental care in a comfortable, modern environment, conveniently located in{' '}
            <span className="whitespace-nowrap">
              {site.address.area}, {site.address.city}.
            </span>
          </p>

          <div className="mt-8 flex animate-rise flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-10 md:flex-col lg:flex-row lg:flex-wrap" style={rise(3)}>
            <Button href={bookingTarget} iconLeft={CalendarCheck} fullWidth="mobile" className="md:h-14 md:w-full lg:w-auto lg:px-7 xl:px-8">
              Book an Appointment
            </Button>
            <Button href={telHref} variant="secondary" iconLeft={Phone} fullWidth="mobile" className="md:h-14 md:w-full lg:w-auto lg:px-7 xl:px-8">
              Call {site.phone.display}
            </Button>
          </div>

          <div className="mt-8 animate-rise border-t border-slate-200 pt-6 md:mt-10" style={rise(4)}>
            <TrustRow />
          </div>
        </div>

        {/* ----------------------------------------------------- image */}
        <div className="col-span-4 md:col-span-4 lg:col-span-5 xl:col-span-6">
          <div className="relative mx-auto w-full max-w-[26rem] md:max-w-none lg:ml-auto lg:mr-0 lg:max-w-[27rem]">
            {/* arch moulding: a hairline arch 12px outside the image */}
            <div aria-hidden="true" className="absolute -inset-x-3 -top-3 bottom-0 rounded-t-full border border-brand-200" />

            <div className="relative animate-arch-in" style={{ animationDelay: '250ms' }}>
              <Media
                src={photo.src}
                alt={photo.alt}
                ratio="4/5"
                shape="arch"
                priority
                fallback={<HeroVisual />}
              />
            </div>

            <FloatingStat className="-left-3 bottom-10 md:-left-3 lg:-left-8" delay={950} drift={7}>
              <div className="flex items-center gap-3">
                <span className="font-heading text-h3 font-bold tabular-nums text-slate-900">{rating.toFixed(1)}</span>
                <div>
                  <Stars value={rating} size="sm" />
                  <p className="mt-0.5 text-caption text-slate-600">Google Rating</p>
                </div>
              </div>
            </FloatingStat>

            <FloatingStat className="-right-3 top-24 md:-right-3 lg:-right-5 xl:-right-8" delay={1150} drift={8.5}>
              <p className="font-heading text-h3 font-bold tabular-nums text-slate-900">{reviewCount}</p>
              <p className="text-caption text-slate-600">Google Reviews</p>
            </FloatingStat>
          </div>
        </div>
      </Grid>
    </Section>
  );
}
