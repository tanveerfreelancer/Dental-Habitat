import {
  BadgeCheck, CalendarCheck, Clock, HeartPulse, Mail, MapPin, MessageCircle, Phone, ShieldCheck, Smile, Sparkles, Stethoscope,
} from 'lucide-react';
import { colors, colorRoles, typeScale, sizeAt, breakpoints, layout, radius, shadows, motion } from '@/design/tokens';
import { contrast, grade } from '@/lib/color';
import { site, addressLine, seo, telHref } from '@/config/site';
import { sectionsMeta } from '@/config/sections';
import { buildHeadTags, buildDentistSchema } from '@/lib/seo';
import {
  Accordion, Badge, Button, Card, Field, Grid, Icon, IconTile, Input, Media, Rating, Section, SectionHeading, Select, Stars, Textarea, TextLink, LogoMark,
} from '@/components/ui';
import Header from '@/components/layout/Header';
import { Spec, Code, ShadeGuide, ViewportChip } from './parts';

const docLinks = [
  ['colour', 'Colour'], ['type', 'Type'], ['space', 'Space'], ['shape', 'Shape'],
  ['components', 'Components'], ['responsive', 'Responsive'], ['structure', 'Structure'], ['seo', 'SEO'],
];

const principles = [
  ['Calm, not clinical', 'Deep petrol and soft aqua on white and cool grey. No gradients, no stock-photo blue.'],
  ['Open, not boxed', 'Ruled lists, split layouts and tinted bands carry the page. A card is the exception.'],
  ['One accent, one shape', 'Aqua marks the moments that matter. The arch, from the dental arch and the doorway of a habitat, is the only signature form.'],
  ['Nothing invented', 'Every fact comes from the clinic. What is unknown stays empty until it is supplied.'],
];

const typeSamples = {
  h1: 'text-h1 font-heading text-slate-900 text-balance',
  h2: 'text-h2 font-heading text-slate-900 text-balance',
  h3: 'text-h3 font-heading text-slate-900',
  h4: 'text-h4 font-heading text-slate-900',
  lead: 'text-lead text-slate-600',
  body: 'text-body text-slate-700',
  small: 'text-small text-slate-600',
  caption: 'text-caption text-slate-600',
  button: 'text-button text-slate-900',
};
const typeText = {
  h1: 'Dental clinic in Garden Town, Lahore',
  h2: 'A section heading, set for scanning',
  h3: 'A sub-section or feature title',
  h4: 'A small title or accordion question',
  lead: 'A lead paragraph introduces a section in a slightly larger, lighter voice.',
  body: 'Body copy is set in Inter at 16px on a 26px line, comfortable for reading on any screen.',
  small: 'Small text for hints, footers and metadata.',
  caption: 'Captions and badge labels.',
  button: 'Book an appointment',
};
const widths = [320, 375, 430, 768, 1024, 1280, 1440];

const pairings = [
  ['Button label', colors.white, colors.brand[800]],
  ['Button label, hover', colors.white, colors.brand[700]],
  ['Body text', colors.slate[700], colors.white],
  ['Muted text', colors.slate[600], colors.white],
  ['Placeholder text', colors.slate[500], colors.white],
  ['Links', colors.brand[600], colors.white],
  ['Accent text on light', colors.aqua[700], colors.white],
  ['Accent on dark', colors.aqua[300], colors.brand[900]],
  ['Accent button', colors.brand[950], colors.aqua[300]],
  ['Footer text', colors.slate[300], colors.brand[950]],
  ['Error text', colors.danger[700], colors.white],
  ['slate-400, decoration only', colors.slate[400], colors.white],
  ['Gold star, decorative (not text)', colors.gold[500], colors.white],
  ['Gold hairline mark, on dark', colors.gold[400], colors.brand[900]],
];

const icons = [
  [Phone, 'Phone'], [MapPin, 'Location'], [CalendarCheck, 'Appointment'], [Clock, 'Hours'], [Mail, 'Email'], [MessageCircle, 'Message'],
  [ShieldCheck, 'Trust'], [Stethoscope, 'Clinical'], [Smile, 'Smile'], [HeartPulse, 'Care'], [Sparkles, 'Cosmetic'], [BadgeCheck, 'Verified'],
];

const accordionDemo = [
  { id: 'a', question: 'Questions are set in Plus Jakarta Sans', answer: 'Answers are set in Inter at 16px, in slate-600, on a comfortable line length. The panel opens when the person asks.' },
  { id: 'b', question: 'Only one panel is open at a time', answer: 'Use type="multiple" when several answers are often read together.' },
  { id: 'c', question: 'Every panel is a real button', answer: 'Keyboard, screen reader and touch behaviour come from the markup, not from scripts.' },
];

const tree = `dental-habitat/
├── index.html                  Home page shell (SEO tags injected at build)
├── design-system.html          This style guide (dev only, noindex)
├── tailwind.config.js          Reads every token from src/design/tokens.js
├── vite.config.js
├── tools/
│   └── vite-plugin-seo.js      Title, meta, OG, schema, robots.txt, sitemap.xml
├── docs/
│   └── DESIGN_SYSTEM.md
└── src/
    ├── design/tokens.js        Colour, type, breakpoints, layout, shape: one source of truth
    ├── config/
    │   ├── site.js             Business facts. Edit here, nowhere else.
    │   └── sections.js         Page order, nav labels, purposes
    ├── styles/index.css        Base styles, focus, container, reduced motion
    ├── components/
    │   ├── ui/                 Button, Card, Field, Rating, Media, Accordion …
    │   └── layout/             Header, Footer, MobileActionBar
    ├── sections/               One file per page section (scaffolds today)
    ├── pages/Home.jsx          Sections in order
    ├── hooks/                  useScrolled, useActiveSection
    ├── lib/                    cn, color (contrast), seo (meta + schema builders)
    └── design-system/          This page`;

const notSupplied = [
  ['Website domain', 'Canonical URL, og:url, sitemap and schema url stay off until it is set.'],
  ['Logo', 'A placeholder mark is in use. Replace when supplied.'],
  ['Opening hours', 'No hours are shown or marked up.'],
  ['Email address and social accounts', 'Footer and schema add them automatically once entered.'],
  ['Dentists and qualifications', 'No names, titles or credentials appear anywhere.'],
  ['Services list, FAQs and reviews text', 'Sections are scaffolds. Content must come from the clinic.'],
  ['Photography', 'Media placeholders hold the space. Alt text is written per image.'],
];

export default function StyleGuide() {
  const head = buildHeadTags(null).split('\n    ');
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>

      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="container-site flex h-16 items-center justify-between gap-6">
          <a href="#top" className="inline-flex items-center gap-3">
            <LogoMark />
            <span className="font-heading text-h4 font-bold text-brand-900">Design system</span>
          </a>
          <nav aria-label="Style guide" className="hidden lg:block">
            <ul className="flex gap-1">
              {docLinks.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="rounded-md px-3 py-2 text-button font-medium text-slate-700 transition-colors duration-200 hover:text-brand-800">{label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <main id="main">
        {/* ------------------------------------------------------------ intro */}
        <Section id="top" tone="brand" labelledBy="intro-title" className="pb-section pt-16 md:pt-20">
          <Grid className="items-center">
            <div className="col-span-4 md:col-span-8 lg:col-span-7">
              <h1 id="intro-title" className="max-w-[16ch]">Dental Habitat design system</h1>
              <p className="mt-6 max-w-[52ch] text-lead">
                The visual and structural foundation for the clinic website: calm colour, precise type, open layouts and one signature shape.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
                <Rating tone="dark" href={site.google.mapsUrl} />
                <a href={telHref} className="inline-flex items-center gap-2 text-button text-white underline decoration-aqua-300 decoration-1 underline-offset-4 hover:decoration-2">
                  <Icon as={Phone} size="sm" />
                  {site.phone.display}
                </a>
              </div>
            </div>
            <div className="col-span-4 md:col-span-8 lg:col-span-5" aria-hidden="true">
              <div className="relative mx-auto aspect-[4/5] w-56 md:w-64 lg:ml-auto lg:mr-0 lg:w-72">
                <div className="absolute inset-x-0 bottom-0 h-full rounded-t-full bg-brand-700" />
                <div className="absolute bottom-0 left-1/2 h-[74%] w-[72%] -translate-x-1/2 rounded-t-full bg-brand-500" />
                <div className="absolute bottom-0 left-1/2 h-[46%] w-[42%] -translate-x-1/2 rounded-t-full bg-aqua-300" />
              </div>
            </div>
          </Grid>

          <ul className="mt-16 grid gap-x-8 gap-y-8 border-t border-white/15 pt-8 md:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {principles.map(([title, text]) => (
              <li key={title}>
                <h2 className="text-h4">{title}</h2>
                <p className="mt-2 text-small">{text}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* ----------------------------------------------------------- colour */}
        <Section id="colour" labelledBy="colour-title">
          <SectionHeading
            id="colour-title"
            title="Colour"
            lead="Petrol navy-teal leads, aqua accents, white and cool grey give room. The default framework palette is switched off, so nothing off-system can slip in."
          />
          <div className="mt-12 space-y-12">
            <ShadeGuide name="Brand" scale={colors.brand} marks={{ 50: 'Tint', 600: 'Links', 800: 'Primary', 900: 'Deep surface', 950: 'Footer' }} />
            <ShadeGuide name="Aqua" scale={colors.aqua} marks={{ 100: 'Icon tile', 300: 'Accent on dark', 700: 'Accent text' }} />
            <ShadeGuide name="Slate" scale={colors.slate} marks={{ 50: 'Alt background', 200: 'Hairline', 600: 'Muted text', 700: 'Body', 900: 'Headings' }} />
            <div>
              <ShadeGuide name="Gold" scale={colors.gold} marks={{ 400: 'Hairline marks', 500: 'Stars (the brief colour)' }} />
              <p className="mt-4 max-w-[60ch] text-small text-slate-600">
                A single restrained accent, added for small luxury details only: review stars, a couple of hairline-thin
                marks, and a whisper of colour on icon-tile hover. It is never a background, a button, or body text —
                see the roles table below for exactly where it appears.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Spec title="Roles" note="What each colour is for.">
              <dl className="divide-y divide-slate-200 border-y border-slate-200">
                {colorRoles.map((r) => (
                  <div key={r.role} className="grid gap-1 py-3 sm:grid-cols-3 sm:gap-6">
                    <dt className="font-semibold text-slate-900">{r.role}</dt>
                    <dd className="text-slate-700 tabular-nums">{r.token}{r.hover ? `, hover ${r.hover}` : ''}</dd>
                    <dd className="text-small text-slate-600 sm:text-body">{r.use}</dd>
                  </div>
                ))}
              </dl>
            </Spec>
            <Spec title="Contrast" note="Measured, not assumed. Body-size text needs 4.5 or more.">
              <ul className="grid gap-x-8 md:grid-cols-2">
                {pairings.map(([label, fg, bg]) => {
                  const ratio = contrast(fg, bg);
                  const g = grade(ratio);
                  return (
                    <li key={label} className="flex items-center gap-4 border-b border-slate-200 py-3">
                      <span className="flex h-11 w-14 shrink-0 items-center justify-center rounded-md border border-slate-200 font-heading text-h4" style={{ color: fg, background: bg }}>Aa</span>
                      <span className="min-w-0 flex-1 text-small font-medium text-slate-900">{label}</span>
                      <span className="text-small tabular-nums text-slate-600">{ratio.toFixed(1)}:1</span>
                      <Badge variant={g === 'Fail' || g === 'AA large only' ? 'outline' : 'aqua'}>{g}</Badge>
                    </li>
                  );
                })}
              </ul>
            </Spec>
          </div>
        </Section>

        {/* ------------------------------------------------------------- type */}
        <Section id="type" tone="subtle" labelledBy="type-title">
          <SectionHeading
            id="type-title"
            title="Typography"
            lead="Plus Jakarta Sans for headings, Inter for everything else. Sizes are fluid, so they glide between phone and desktop instead of jumping at breakpoints."
          />
          <div className="mt-12">
            <Spec title="Families and weights" note="Headings 600 and 700. Body 400, with 500 and 600 for emphasis.">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <p className="font-heading text-h2 font-bold text-slate-900">Plus Jakarta Sans</p>
                  <p className="mt-2 font-heading text-h4 text-slate-600">Headings and numerals in ratings. Weights 600, 700.</p>
                </div>
                <div>
                  <p className="text-h2 font-semibold text-slate-900">Inter</p>
                  <p className="mt-2 text-body text-slate-600">Body, forms, navigation and buttons. Weights 400, 500, 600.</p>
                </div>
              </div>
            </Spec>
            {Object.entries(typeScale).map(([key, t]) => (
              <Spec
                key={key}
                title={t.label}
                note={`${t.minPx === t.maxPx ? `${t.minPx}px` : `${t.minPx} to ${t.maxPx}px`}, line ${t.lh}, weight ${t.weight}, tracking ${t.tracking}`}
              >
                <p className={typeSamples[key]}>{typeText[key]}</p>
                <p className="mt-3 text-small text-slate-600">{t.use}</p>
              </Spec>
            ))}
            <Spec title="Size at each breakpoint" note="Computed from the tokens, in px.">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[32rem] text-left text-small tabular-nums">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-600">
                      <th className="py-2 pr-4 font-semibold">Step</th>
                      {widths.map((w) => <th key={w} className="px-2 py-2 font-semibold">{w}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(typeScale).map(([key, t]) => (
                      <tr key={key} className="border-b border-slate-200">
                        <th className="py-2 pr-4 font-semibold text-slate-900">{t.label}</th>
                        {widths.map((w) => <td key={w} className="px-2 py-2">{sizeAt(t, w)}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Spec>
          </div>
        </Section>

        {/* ------------------------------------------------------------ space */}
        <Section id="space" labelledBy="space-title">
          <SectionHeading
            id="space-title"
            title="Space and layout"
            lead="An 8px system. Half-steps of 4px exist for optical fixes only. Section spacing, gutters and header height are set once, as tokens, and step at the breakpoints."
          />
          <div className="mt-12">
            <Spec title="Spacing scale" note="Tailwind steps 2, 4, 6, 8 and up.">
              <ul className="space-y-3">
                {layout.spaceScale.map((px) => (
                  <li key={px} className="flex items-center gap-4">
                    <span className="w-10 text-small tabular-nums text-slate-600">{px}</span>
                    <span className="h-3 rounded-sm bg-brand-700" style={{ width: px * 3 }} />
                  </li>
                ))}
              </ul>
            </Spec>
            <Spec title="Layout tokens">
              <dl className="divide-y divide-slate-200 border-y border-slate-200">
                {[
                  ['Container', `${layout.contentMax}px of content, centred. Prose blocks stop at ${layout.proseMax}px.`],
                  ['Gutters', `${layout.gutters.base}px at 320, ${layout.gutters.xs}px at 375, ${layout.gutters.md}px at 768, ${layout.gutters.lg}px at 1024 and up`],
                  ['Section spacing', `${layout.sectionY.base}px on phones, ${layout.sectionY.md}px from 768, ${layout.sectionY.xl}px from 1280`],
                  ['Header height', `${layout.headerH.base}px on phones, ${layout.headerH.md}px from 768, condensing to 64px on scroll`],
                  ['Grid', '4 columns on phones, 8 on tablets, 12 from 1024'],
                  ['Grid gaps', `${layout.gridGap.base}px, ${layout.gridGap.md}px from 768, ${layout.gridGap.lg}px from 1024`],
                  ['Card padding', `${layout.cardPadding.base}px on phones, ${layout.cardPadding.md}px from 768`],
                  ['Buttons and inputs', `${layout.control.sm}, ${layout.control.md} and ${layout.control.lg}px high. Never below 44px for touch except small buttons in dense desktop UI.`],
                ].map(([k, v]) => (
                  <div key={k} className="grid gap-1 py-3 sm:grid-cols-3 sm:gap-6">
                    <dt className="font-semibold text-slate-900">{k}</dt>
                    <dd className="text-slate-700 sm:col-span-2">{v}</dd>
                  </div>
                ))}
              </dl>
            </Spec>
          </div>
        </Section>

        {/* ------------------------------------------------------------ shape */}
        <Section id="shape" tone="subtle" labelledBy="shape-title">
          <SectionHeading
            id="shape-title"
            title="Shape, depth and motion"
            lead="Radius follows hierarchy: crisp controls, calm surfaces, generous imagery. Shadows are reserved for things that float."
          />
          <div className="mt-12">
            <Spec title="Radius" note="Controls 10px. Surfaces 16px. Feature imagery 28px.">
              <ul className="flex flex-wrap gap-6">
                {Object.entries(radius).filter(([k]) => k !== 'none' && k !== 'full').map(([k, v]) => (
                  <li key={k} className="text-small text-slate-600">
                    <div className="h-20 w-20 border border-slate-300 bg-white" style={{ borderRadius: v }} />
                    <p className="mt-2 font-semibold text-slate-900">{k}</p>
                    <p className="tabular-nums">{v}</p>
                  </li>
                ))}
                <li className="text-small text-slate-600">
                  <div className="h-20 w-20 rounded-t-full border border-slate-300 bg-brand-800" />
                  <p className="mt-2 font-semibold text-slate-900">arch</p>
                  <p>Imagery only</p>
                </li>
              </ul>
            </Spec>
            <Spec title="Shadow" note="Cool and navy-tinted. Menus, the mobile action bar and floating panels.">
              <ul className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {['xs', 'sm', 'md', 'lg'].map((k) => (
                  <li key={k} className="text-small">
                    <div className="h-20 rounded-lg bg-white" style={{ boxShadow: shadows[k] }} />
                    <p className="mt-3 font-semibold text-slate-900">{k}</p>
                  </li>
                ))}
              </ul>
            </Spec>
            <Spec title="Focus" note="One ring everywhere. It turns aqua on dark surfaces.">
              <div className="flex flex-wrap items-center gap-8">
                <span className="inline-flex h-12 items-center rounded-md bg-brand-800 px-6 text-button text-white outline outline-2 outline-offset-[3px] outline-brand-500">Keyboard focus</span>
                <span className="surface-inverse inline-flex rounded-lg bg-brand-900 p-6">
                  <span className="inline-flex h-12 items-center rounded-md bg-aqua-300 px-6 text-button text-brand-950 outline outline-2 outline-offset-[3px] outline-aqua-300">On dark</span>
                </span>
              </div>
            </Spec>
            <Spec title="Motion" note="Only in answer to an action. Nothing animates on its own.">
              <p className="max-w-[60ch]">
                Hover, press, open and close use {motion.base} on a soft ease-out curve. Expanding panels take {motion.slow}. The whole system
                collapses to instant when the visitor prefers reduced motion. One deliberate moment, in the hero, is planned for later.
              </p>
            </Spec>
          </div>
        </Section>

        {/* ------------------------------------------------------- components */}
        <Section id="components" labelledBy="components-title">
          <SectionHeading id="components-title" title="Components" lead="Live, from the same code the site uses." />
          <div className="mt-12">
            <Spec title="Buttons" note="Icons only when they do something: phone, calendar.">
              <div className="space-y-8">
                <div className="flex flex-wrap items-center gap-4">
                  <Button iconLeft={CalendarCheck}>Book an appointment</Button>
                  <Button variant="secondary" iconLeft={Phone}>Call {site.phone.display}</Button>
                  <Button variant="ghost">Get directions</Button>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">Small, 40px</Button>
                  <Button size="md">Medium, 48px</Button>
                  <Button size="lg">Large, 56px</Button>
                  <Button disabled>Disabled</Button>
                </div>
                <div className="surface-inverse flex flex-wrap items-center gap-4 rounded-lg bg-brand-900 p-6">
                  <Button variant="accent" iconLeft={CalendarCheck}>Book an appointment</Button>
                  <Button variant="outline-inverse" iconLeft={Phone}>Call now</Button>
                </div>
              </div>
            </Spec>
            <Spec title="Links" note="Aqua hairline underline that thickens on hover.">
              <p className="max-w-[60ch]">
                Body text can carry a <TextLink href="#components">plain link</TextLink> and a link that leaves the site, such as{' '}
                <TextLink href={site.google.mapsUrl} external>Google Maps</TextLink>.
              </p>
            </Spec>
            <Spec title="Badges">
              <div className="flex flex-wrap gap-3">
                <Badge>Neutral</Badge>
                <Badge variant="brand">Brand</Badge>
                <Badge variant="aqua" icon={BadgeCheck}>With icon</Badge>
                <Badge variant="outline">Outline</Badge>
                <span className="surface-inverse inline-flex rounded-full bg-brand-900 p-1"><Badge variant="inverse">On dark</Badge></span>
              </div>
            </Spec>
            <Spec title="Rating" note="Fractional stars. Real Google figures come from site.js by default.">
              <div className="flex flex-col gap-6">
                <Rating href={site.google.mapsUrl} />
                <Rating size="lg" />
                <div className="flex flex-wrap items-center gap-8">
                  {[0, 2.5, 4.3, 5].map((v) => (
                    <span key={v} className="inline-flex items-center gap-2 text-small tabular-nums text-slate-600"><Stars value={v} size="sm" />{v}</span>
                  ))}
                </div>
              </div>
            </Spec>
            <Spec title="Icons" note="Lucide, 1.75px stroke, four sizes: 16, 20, 24, 32.">
              <ul className="grid grid-cols-3 gap-y-6 sm:grid-cols-4 lg:grid-cols-6">
                {icons.map(([Glyph, label]) => (
                  <li key={label} className="flex flex-col items-start gap-2 text-small text-slate-600">
                    <Icon as={Glyph} size="xl" className="text-brand-700" />
                    {label}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <IconTile icon={ShieldCheck} />
                <IconTile icon={Stethoscope} tone="brand" />
                <IconTile icon={Clock} tone="outline" />
                <IconTile icon={Smile} size="lg" />
              </div>
            </Spec>
            <Spec title="Forms" note="16px text, 48px controls, labels above, plain-language errors.">
              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Full name" hint="As you would like us to address you."><Input autoComplete="name" /></Field>
                <Field label="Phone number" error="Enter a phone number we can call you on, for example 03XX XXXXXXX."><Input type="tel" defaultValue="0309" /></Field>
                <Field label="Preferred way to reach you"><Select defaultValue="call"><option value="call">Phone call</option><option value="text">Text message</option></Select></Field>
                <Field label="Disabled field" required={false}><Input disabled defaultValue="Not available" /></Field>
                <Field label="Message" required={false} className="md:col-span-2"><Textarea /></Field>
              </div>
            </Spec>
            <Spec title="Surfaces" note="The quietest surface that works. Cards are the exception.">
              <div className="grid gap-6 md:grid-cols-2">
                <Card><p className="font-heading text-h4 text-slate-900">Outline</p><p className="mt-2 text-small text-slate-600">Hairline border, white. The default.</p></Card>
                <Card variant="tint"><p className="font-heading text-h4 text-slate-900">Tint</p><p className="mt-2 text-small text-slate-600">Cool grey, no border. For panels on white.</p></Card>
                <Card variant="inverse"><p className="font-heading text-h4 text-white">Inverse</p><p className="mt-2 text-small">Deep petrol for the one important panel.</p></Card>
                <Card variant="floating"><p className="font-heading text-h4 text-slate-900">Floating</p><p className="mt-2 text-small text-slate-600">Shadowed. Only for things that float.</p></Card>
              </div>
              <p className="mb-2 mt-10 font-semibold text-slate-900">Preferred pattern: the ruled row</p>
              <ul className="divide-y divide-slate-200 border-y border-slate-200">
                {['First item', 'Second item', 'Third item'].map((t) => (
                  <li key={t} className="grid gap-2 py-5 md:grid-cols-12 md:gap-8">
                    <p className="font-heading text-h4 text-slate-900 md:col-span-4">{t}</p>
                    <p className="text-slate-600 md:col-span-8">Content sits on hairlines with no boxes, so lists stay quiet however long they get.</p>
                  </li>
                ))}
              </ul>
            </Spec>
            <Spec title="Accordion" note="For the FAQ. Ruled, with a real button per row.">
              <Accordion items={accordionDemo} defaultOpen={['a']} />
            </Spec>
            <Spec title="Section heading" note="The label above is optional and used only when it informs.">
              <div className="space-y-10">
                <SectionHeading eyebrow="From Google" as="h4" title="A section heading with a short lead" lead="Lead text sits in slate-600 at a comfortable measure." />
                <div className="surface-inverse rounded-lg bg-brand-900 p-8">
                  <SectionHeading as="h4" title="The same heading on a dark surface" lead="Colours flip automatically inside a dark surface." />
                </div>
              </div>
            </Spec>
            <Spec title="Media" note="Alt text is required by the component. The arch is for hero and about imagery.">
              <div className="grid items-end gap-6 sm:grid-cols-3">
                <Media ratio="3/4" shape="arch" caption="Arch, 3:4" />
                <Media ratio="4/3" shape="rect" caption="Rectangle, 4:3" />
                <Media ratio="4/3" shape="soft" caption="Soft, 4:3" />
              </div>
            </Spec>
            <Spec title="Navigation" note="Below 1024px this becomes a menu button and full-screen panel. Resize to see it.">
              <div className="overflow-hidden rounded-lg border border-slate-200"><Header embedded /></div>
            </Spec>
          </div>
        </Section>

        {/* ------------------------------------------------------- responsive */}
        <Section id="responsive" tone="subtle" labelledBy="responsive-title">
          <SectionHeading
            id="responsive-title"
            title="Responsive plan"
            lead="Each breakpoint is a layout decision, not a scaled-down desktop. The chip at the bottom left shows the current width."
          />
          <ul className="mt-12 divide-y divide-slate-200 border-y border-slate-200">
            {breakpoints.map((b) => (
              <li key={b.key} className="grid gap-2 py-5 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-3">
                  <p className="font-heading text-h4 tabular-nums text-slate-900">{b.min}{b.key === '2xl' ? '+' : ''}px</p>
                  <p className="text-small text-slate-600">{b.device}</p>
                </div>
                <p className="text-small tabular-nums text-slate-600 md:col-span-2">{b.cols} columns, {b.gutter}px gutter</p>
                <p className="md:col-span-7">{b.layout}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* -------------------------------------------------------- structure */}
        <Section id="structure" labelledBy="structure-title">
          <SectionHeading
            id="structure-title"
            title="Site structure"
            lead="One page with seven sections in a fixed order, each in its own file. Reordering or removing a section is a one-line change."
          />
          <div className="mt-12">
            <Spec title="Sections" note="Scaffolds today: a heading and a landmark, no content.">
              <ul className="divide-y divide-slate-200 border-y border-slate-200">
                {sectionsMeta.map((s) => (
                  <li key={s.id} className="grid gap-1 py-4 md:grid-cols-12 md:gap-8">
                    <p className="font-semibold text-slate-900 md:col-span-3">{s.name}</p>
                    <p className="text-small tabular-nums text-slate-600 md:col-span-3">#{s.id}, {s.file}</p>
                    <p className="text-slate-700 md:col-span-6">{s.purpose}</p>
                  </li>
                ))}
              </ul>
            </Spec>
            <Spec title="Files"><Code>{tree}</Code></Spec>
          </div>
        </Section>

        {/* -------------------------------------------------------------- seo */}
        <Section id="seo" tone="subtle" labelledBy="seo-title">
          <SectionHeading
            id="seo-title"
            title="SEO foundation"
            lead="Generated at build time from src/config/site.js, so crawlers read finished HTML without running any JavaScript."
          />
          <div className="mt-12">
            <Spec title="Wired up">
              <ul className="list-disc space-y-2 pl-5 marker:text-aqua-500">
                <li>Title, meta description, robots and theme colour</li>
                <li>Open Graph and Twitter tags</li>
                <li>Dentist schema (LocalBusiness) with name, phone, address and map link</li>
                <li>Name, address and phone in plain HTML for no-JavaScript visitors, and in the footer</li>
                <li>One H1 in the hero, one H2 per section, landmarks for header, nav, main and footer</li>
                <li>Media component that requires alt text</li>
                <li>robots.txt now, sitemap.xml once a domain is set</li>
              </ul>
            </Spec>
            <Spec title="Waiting on you">
              <ul className="list-disc space-y-2 pl-5 marker:text-slate-400">
                <li>The domain, for the canonical URL, og:url, sitemap and schema url</li>
                <li>A 1200 by 630 image for link previews</li>
                <li>Opening hours, for schema and the contact section</li>
                <li>Real photography, with alt text written per image</li>
              </ul>
            </Spec>
            <Spec title="Left out on purpose" note="Deliberate calls, easy to reverse.">
              <ul className="list-disc space-y-2 pl-5 marker:text-slate-400">
                <li>aggregateRating in schema. Google does not show rich results for a business marking up its own ratings. The 4.3 rating still shows on the page. Flip <code className="rounded-sm bg-slate-100 px-1.5 py-0.5 font-mono text-small">schema.includeAggregateRating</code> to change this.</li>
                <li>FAQ schema. Google limits FAQ rich results to a small set of authoritative sites, so it would add markup with no benefit.</li>
              </ul>
            </Spec>
            <Spec title="Generated head" note={`${seo.title.length} character title, ${seo.description.length} character description.`}>
              <Code>{head.join('\n')}</Code>
            </Spec>
            <Spec title="Dentist schema" note="Only fields with real values are emitted.">
              <Code>{JSON.stringify(buildDentistSchema(null), null, 2)}</Code>
            </Spec>
          </div>
        </Section>

        {/* ------------------------------------------------------------- data */}
        <Section labelledBy="data-title">
          <SectionHeading
            id="data-title"
            title="Business data"
            lead="What is supplied lives in one file. What is not supplied is empty and shows nowhere."
          />
          <div className="mt-12">
            <Spec title="Supplied">
              <dl className="divide-y divide-slate-200 border-y border-slate-200">
                {[
                  ['Name', site.name],
                  ['Address', addressLine()],
                  ['Phone', site.phone.display],
                  ['Google rating', `${site.google.rating} out of ${site.google.scale}, ${site.google.reviewCount} reviews`],
                  ['Google Maps', site.google.mapsUrl],
                ].map(([k, v]) => (
                  <div key={k} className="grid gap-1 py-3 sm:grid-cols-3 sm:gap-6">
                    <dt className="font-semibold text-slate-900">{k}</dt>
                    <dd className="break-words text-slate-700 sm:col-span-2">{v}</dd>
                  </div>
                ))}
              </dl>
            </Spec>
            <Spec title="Not supplied" note="Nothing has been invented for these.">
              <dl className="divide-y divide-slate-200 border-y border-slate-200">
                {notSupplied.map(([k, v]) => (
                  <div key={k} className="grid gap-1 py-3 sm:grid-cols-3 sm:gap-6">
                    <dt className="font-semibold text-slate-900">{k}</dt>
                    <dd className="text-slate-700 sm:col-span-2">{v}</dd>
                  </div>
                ))}
              </dl>
            </Spec>
          </div>
        </Section>
      </main>

      <ViewportChip />
    </>
  );
}
