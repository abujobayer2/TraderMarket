import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CountryPageContent } from "@/components/content/CountryPageContent";
import { COUNTRY_PAGE_COPY } from "@/lib/i18n/copy/countryPage";
import { getActiveLeaderboard } from "@/lib/ranking";
import { getReviewSummaries } from "@/lib/reviews";
import { jsonLdScript } from "@/lib/jsonLd";
import { COUNTRIES, getCountry, relatedCountries } from "@/lib/countries";
import { languageAlternates } from "@/lib/i18n/hreflang";
import { socialMetadata } from "@/lib/i18n/metadata";
import { localeForCountrySlug } from "@/lib/i18n/locales";
import { COUNTRY_TRANSLATIONS } from "@/lib/i18n/copy/countryPage";

export const revalidate = 60;

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://tradermarket.online";
const copy = COUNTRY_PAGE_COPY.en;

export async function generateStaticParams() {
  return COUNTRIES.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country: slug } = await params;
  const country = getCountry(slug);
  if (!country) return { title: "Country Not Found" };

  const title = `Prop Trading Firms for Traders in ${country.name} — Rules & Rankings`;
  const description = `A trader's guide to prop firm challenges from ${country.name}: how ${
    country.regulator ?? "local regulators"
  } treat retail forex/CFD trading, session timing, funding and payout considerations, plus the live TraderMarket leaderboard.`;

  const matchingLocale = localeForCountrySlug(slug);

  return {
    title,
    description,
    keywords: [
      `prop firms ${country.name}`,
      `prop trading firms for ${country.name} traders`,
      `funded trading account ${country.name}`,
      `is prop firm trading legal in ${country.name}`,
    ],
    alternates: {
      canonical: `/prop-firms/${slug}`,
      languages: languageAlternates(`/prop-firms/${slug}`, matchingLocale ? [matchingLocale] : []),
    },
    ...socialMetadata({ path: `/prop-firms/${slug}`, title: `${title} — TraderMarket`, description, type: "article" }),
  };
}

export default async function CountryPropFirmsPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country: slug } = await params;
  const country = getCountry(slug);
  if (!country) notFound();

  const [leaderboard, summaries] = await Promise.all([
    getActiveLeaderboard(),
    getReviewSummaries(),
  ]);
  const firms = leaderboard.slice(0, 12);
  const related = relatedCountries(country);
  const matchingLocale = localeForCountrySlug(slug);
  const hasTranslation = matchingLocale && COUNTRY_TRANSLATIONS[matchingLocale]?.[slug];

  const title = `Prop Trading Firms for Traders in ${country.name} — Rules & Rankings`;
  const description = `A trader's guide to prop firm challenges from ${country.name}.`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: `${BASE}/prop-firms/${slug}`,
    publisher: { "@id": `${BASE}/#organization` },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Leaderboard", item: BASE },
      { "@type": "ListItem", position: 2, name: "Prop Firms by Country", item: `${BASE}/prop-firms` },
      { "@type": "ListItem", position: 3, name: country.name, item: `${BASE}/prop-firms/${slug}` },
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
      <Nav />
      <main className="flex-1 bg-canvas px-6 py-16 sm:py-24">
        <CountryPageContent
          copy={copy}
          prefix=""
          country={country}
          firms={firms}
          summaries={summaries}
          related={related}
        />
      </main>
      <Footer
        switcher={
          hasTranslation
            ? { path: `/prop-firms/${slug}`, availableLocales: [matchingLocale] }
            : undefined
        }
      />
    </>
  );
}
