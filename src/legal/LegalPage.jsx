import { legal } from '@/content/legal';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { TextLink } from '@/components/ui';

/** Privacy Policy and Terms of Use. Copy lives in src/content/legal.js. Each page has its own single H1. */
export default function LegalPage({ doc }) {
  const page = legal[doc];
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Header homeHref="/" />
      <main id="main" tabIndex={-1} className="outline-none">
        <div className="container-site py-12 md:py-16 lg:py-20">
          <article className="max-w-[44rem]">
            <p className="text-small">
              <TextLink href="/">Back to the homepage</TextLink>
            </p>
            <h1 className="mt-6 text-h2">{page.title}</h1>
            <p className="mt-3 text-small text-slate-600">Last updated: {page.updated}</p>

            {page.sections.map((s) => (
              <section key={s.heading} className="mt-10">
                <h2 className="text-h3">{s.heading}</h2>
                {s.paragraphs.map((t) => (
                  <p key={t} className="mt-3 text-slate-700">
                    {t}
                  </p>
                ))}
                {s.list && (
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-slate-700 marker:text-aqua-500">
                    {s.list.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
                {s.after?.map((t) => (
                  <p key={t} className="mt-3 text-slate-700">
                    {t}
                  </p>
                ))}
              </section>
            ))}
          </article>
        </div>
      </main>
      <Footer homeHref="/" />
      <WhatsAppButton />
    </>
  );
}
