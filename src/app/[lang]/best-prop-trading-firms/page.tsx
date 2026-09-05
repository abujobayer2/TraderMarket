import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BestPropTradingFirmsContent } from "@/components/content/BestPropTradingFirmsContent";
import { BEST_FIRMS_COPY } from "@/lib/i18n/copy/bestPropTradingFirms";
import { CHROME_COPY } from "@/lib/i18n/copy/chrome";
import { getActiveLeaderboard, getPublicStats } from "@/lib/ranking";
import { getReviewSummaries } from "@/lib/reviews";
import { jsonLdScript } from "@/lib/jsonLd";
import { languageAlternatesFor } from "@/lib/i18n/hreflang";
import { socialMetadata } from "@/lib/i18n/metadata";
import { isLocale, LOCALE_META, SUPPORTED_LOCALES, type Locale } from "@/lib/i18n/locales";

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.filter((l) => l in BEST_FIRMS_COPY).map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang) || !BEST_FIRMS_COPY[lang]) return { title: "Not Found" };
  const copy = BEST_FIRMS_COPY[lang];
  return {
    title: copy.h1,
    description: copy.intro,
    alternates: {
      canonical: `/${lang}/best-prop-trading-firms`,
      languages: languageAlternatesFor("/best-prop-trading-firms", BEST_FIRMS_COPY),
    },
    ...socialMetadata({
      path: "/best-prop-trading-firms",
      locale: lang as Locale,
      title: `${copy.h1} — TraderMarket`,
      description: copy.intro,
    }),
  };
}

export default async function LocalizedBestPropTradingFirmsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const copy = BEST_FIRMS_COPY[lang];
  if (!copy) notFound();
  const locale = lang as Locale;
  const chrome = CHROME_COPY[locale] ?? CHROME_COPY.en;

  const [leaderboard, stats, reviewSummaries] = await Promise.all([
    getActiveLeaderboard(),
    getPublicStats(),
    getReviewSummaries(),
  ]);
  const updatedAt = new Date().toLocaleDateString(LOCALE_META[locale].bcp47, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      {leaderboard.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdScript({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: copy.h1,
              itemListOrder: "https://schema.org/ItemListOrderDescending",
              numberOfItems: leaderboard.length,
              itemListElement: leaderboard.map((entry) => ({
                "@type": "ListItem",
                position: entry.rank,
                url: `https://tradermarket.online/firm/${entry.slug}`,
                name: entry.name,
              })),
            }),
          }}
        />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }} />
      <Nav locale={locale} copy={chrome.nav} />
      <main className="flex-1 bg-canvas px-6 py-16 sm:py-24">
        <BestPropTradingFirmsContent
          copy={copy}
          prefix={`/${locale}`}
          leaderboard={leaderboard}
          stats={stats}
          reviewSummaries={reviewSummaries}
          updatedAt={updatedAt}
        />
      </main>
      <Footer
        locale={locale}
        copy={chrome.footer}
        switcher={{ path: "/best-prop-trading-firms", availableLocales: SUPPORTED_LOCALES }}
      />
    </>
  );
}
