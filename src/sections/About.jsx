import { MapPin, Phone } from 'lucide-react';
import { site, addressLine, telHref } from '@/config/site';
import { about } from '@/content/about';
import { Grid, Icon, Media, Section, SectionHeading, TextLink } from '@/components/ui';
import AboutVisual from './about/AboutVisual';

/**
 * About. Copy lives in src/content/about.js; facts (address, phone, map link) come from src/config/site.js.
 * Photo: set site.aboutImage.src and .alt to replace the illustration.
 * Phones: text first, then image. Tablets and up: image left, text right.
 */
export default function About() {
  const photo = site.aboutImage;

  return (
    <Section id="about" labelledBy="about-title" className="pt-4 md:pt-8">
      <Grid className="items-center gap-y-10 md:gap-y-0">
        {/* ---------------------------------------------------- copy */}
        <div className="col-span-4 md:order-2 md:col-span-4 lg:col-span-6 lg:col-start-7">
          <SectionHeading id="about-title" eyebrow={about.eyebrow} title={about.title} />

          <p className="mt-6 text-lead text-slate-700">{about.lead}</p>
          {about.body.map((paragraph) => (
            <p key={paragraph} className="mt-4 max-w-[52ch] text-slate-600">
              {paragraph}
            </p>
          ))}

          <dl className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
            <div className="grid grid-cols-[5.5rem_1fr] gap-x-4 py-4 sm:grid-cols-[7rem_1fr]">
              <dt className="flex items-start gap-2 font-semibold text-slate-900">
                <Icon as={MapPin} size="sm" className="mt-1 text-brand-600" />
                Address
              </dt>
              <dd className="text-slate-700">
                <address className="not-italic">{addressLine()}</address>
              </dd>
            </div>
            <div className="grid grid-cols-[5.5rem_1fr] gap-x-4 py-4 sm:grid-cols-[7rem_1fr]">
              <dt className="flex items-start gap-2 font-semibold text-slate-900">
                <Icon as={Phone} size="sm" className="mt-1 text-brand-600" />
                Phone
              </dt>
              <dd>
                <TextLink href={telHref}>{site.phone.display}</TextLink>
              </dd>
            </div>
          </dl>
          <p className="mt-5">
            <TextLink href={site.google.mapsUrl} external>
              View on Google Maps
            </TextLink>
          </p>
        </div>

        {/* --------------------------------------------------- image */}
        <div className="col-span-4 md:order-1 md:col-span-4 lg:col-span-5">
          <div className="mx-auto w-full max-w-[26rem] md:max-w-none lg:mr-auto lg:max-w-[26rem]">
            <Media src={photo.src} alt={photo.alt} ratio="4/5" shape="arch" fallback={<AboutVisual />} />
          </div>
        </div>
      </Grid>
    </Section>
  );
}
