import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FuturesPropFirmsContent } from "@/components/content/FuturesPropFirmsContent";
import { FUTURES_COPY } from "@/lib/i18n/copy/futuresPropFirms";
import { CHROME_COPY } from "@/lib/i18n/copy/chrome";
import { getActiveLeaderboard } from "@/lib/ranking";
import { getReviewSummaries } from "@/lib/reviews";
import { jsonLdScript } from "@/lib/jsonLd";
import { languageAlternatesFor } from "@/lib/i18n/hreflang";
import { socialMetadata } from "@/lib/i18n/metadata";
import { isLocale, SUPPORTED_LOCALES, type Locale } from "@/lib/i18n/locales";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://tradermarket.online";

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.filter((l) => l in FUTURES_COPY).map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang) || !FUTURES_COPY[lang]) return { title: "Not Found" };
  const copy = FUTURES_COPY[lang];
  return {
    title: copy.h1,
    description: copy.intro,
    alternates: {
      canonical: `/${lang}/futures-prop-firms`,
      languages: languageAlternatesFor("/futures-prop-firms", FUTURES_COPY),
    },
    ...socialMetadata({
      path: "/futures-prop-firms",
      locale: lang as Locale,
      title: `${copy.h1} — TraderMarket`,
      description: copy.intro,
      type: "article",
    }),
  };
}

export default async function LocalizedFuturesPropFirmsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const copy = FUTURES_COPY[lang];
  if (!copy) notFound();
  const locale = lang as Locale;
  const chrome = CHROME_COPY[locale] ?? CHROME_COPY.en;
  const prefix = `/${locale}`;

  const [leaderboard, summaries] = await Promise.all([
    getActiveLeaderboard(),
    getReviewSummaries(),
  ]);
  const firms = leaderboard.slice(0, 12);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: copy.h1,
    mainEntityOfPage: `${BASE}${prefix}/futures-prop-firms`,
    publisher: { "@id": `${BASE}/#organization` },
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }} />
      <Nav locale={locale} copy={chrome.nav} />
      <main className="flex-1 bg-canvas px-6 py-16 sm:py-24">
        <FuturesPropFirmsContent copy={copy} prefix={prefix} firms={firms} summaries={summaries} />
      </main>
      <Footer
        locale={locale}
        copy={chrome.footer}
        switcher={{ path: "/futures-prop-firms", availableLocales: SUPPORTED_LOCALES }}
      />
    </>
  );
}
