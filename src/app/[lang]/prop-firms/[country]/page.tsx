import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CountryPageContent } from "@/components/content/CountryPageContent";
import { COUNTRY_PAGE_COPY, COUNTRY_TRANSLATIONS } from "@/lib/i18n/copy/countryPage";
import { CHROME_COPY } from "@/lib/i18n/copy/chrome";
import { getActiveLeaderboard } from "@/lib/ranking";
import { getReviewSummaries } from "@/lib/reviews";
import { jsonLdScript } from "@/lib/jsonLd";
import { getCountry, relatedCountries } from "@/lib/countries";
import { languageAlternates } from "@/lib/i18n/hreflang";
import { socialMetadata } from "@/lib/i18n/metadata";
import { isLocale, LOCALE_META, type Locale } from "@/lib/i18n/locales";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://tradermarket.online";

// Only generate the country slug(s) that actually belong to this locale
// (e.g. only "japan" under /ja/prop-firms/[country]) — receives the parent
// [lang] segment's resolved value, per Next's nested generateStaticParams.
export async function generateStaticParams({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) return [];
  return LOCALE_META[params.lang].countrySlugs.map((country) => ({ country }));
}

function resolve(lang: string, country: string) {
  if (!isLocale(lang)) return null;
  if (!LOCALE_META[lang].countrySlugs.includes(country)) return null;
  const copy = COUNTRY_PAGE_COPY[lang];
  const translation = COUNTRY_TRANSLATIONS[lang]?.[country];
  const base = getCountry(country);
  if (!copy || !translation || !base) return null;
  return {
    locale: lang as Locale,
    copy,
    country: { ...base, ...translation, name: translation.localizedName ?? base.name },
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; country: string }>;
}): Promise<Metadata> {
  const { lang, country: slug } = await params;
  const resolved = resolve(lang, slug);
  if (!resolved) return { title: "Not Found" };
  const { copy, country } = resolved;

  const title = copy.h1Template.replace("{country}", country.name);
  const description = copy.metaDescriptionTemplate
    .replace("{country}", country.name)
    .replace("{regulator}", country.regulator ?? copy.defaultRegulatorLabel);

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/prop-firms/${slug}`,
      languages: languageAlternates(`/prop-firms/${slug}`, [resolved.locale]),
    },
    ...socialMetadata({
      path: `/prop-firms/${slug}`,
      locale: resolved.locale,
      title: `${title} — TraderMarket`,
      description,
      type: "article",
    }),
  };
}

export default async function LocalizedCountryPropFirmsPage({
  params,
}: {
  params: Promise<{ lang: string; country: string }>;
}) {
  const { lang, country: slug } = await params;
  const resolved = resolve(lang, slug);
  if (!resolved) notFound();
  const { locale, copy, country } = resolved;
  const chrome = CHROME_COPY[locale] ?? CHROME_COPY.en;
  const prefix = `/${locale}`;

  const [leaderboard, summaries] = await Promise.all([
    getActiveLeaderboard(),
    getReviewSummaries(),
  ]);
  const firms = leaderboard.slice(0, 12);
  const related = relatedCountries(country);

  const title = copy.h1Template.replace("{country}", country.name);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    mainEntityOfPage: `${BASE}${prefix}/prop-firms/${slug}`,
    publisher: { "@id": `${BASE}/#organization` },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Leaderboard", item: BASE },
      { "@type": "ListItem", position: 2, name: "Prop Firms by Country", item: `${BASE}${prefix}/prop-firms` },
      { "@type": "ListItem", position: 3, name: country.name, item: `${BASE}${prefix}/prop-firms/${slug}` },
    ],
  };
  const faqs = country.faq ? [...copy.sharedFaqs, country.faq] : copy.sharedFaqs;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }} />
      <Nav locale={locale} copy={chrome.nav} />
      <main className="flex-1 bg-canvas px-6 py-16 sm:py-24">
        <CountryPageContent
          copy={copy}
          prefix={prefix}
          country={country}
          firms={firms}
          summaries={summaries}
          related={related}
        />
      </main>
      <Footer
        locale={locale}
        copy={chrome.footer}
        switcher={{ path: `/prop-firms/${slug}`, availableLocales: [locale] }}
      />
    </>
  );
}
