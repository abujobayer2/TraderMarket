import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { HomeContent } from "@/components/content/HomeContent";
import { HOME_COPY } from "@/lib/i18n/copy/home";
import { CHROME_COPY } from "@/lib/i18n/copy/chrome";
import { getActiveLeaderboard, getPublicStats, minimumBidForPosition } from "@/lib/ranking";
import { getReviewSummaries } from "@/lib/reviews";
import { jsonLdScript } from "@/lib/jsonLd";
import { languageAlternatesFor } from "@/lib/i18n/hreflang";
import { isLocale, SUPPORTED_LOCALES, type Locale } from "@/lib/i18n/locales";

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.filter((l) => l in HOME_COPY).map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang) || !HOME_COPY[lang]) return { title: "Not Found" };
  const copy = HOME_COPY[lang];
  return {
    title: copy.h1,
    alternates: { canonical: `/${lang}`, languages: languageAlternatesFor("/", HOME_COPY) },
  };
}

export default async function LocalizedHomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const copy = HOME_COPY[lang];
  if (!copy) notFound();
  const locale = lang as Locale;
  const chrome = CHROME_COPY[locale] ?? CHROME_COPY.en;

  const [leaderboard, stats, reviewSummaries] = await Promise.all([
    getActiveLeaderboard(),
    getPublicStats(),
    getReviewSummaries(),
  ]);
  const minimumForFirst = minimumBidForPosition(leaderboard, 1);
  const newSpotMinimum = minimumBidForPosition(leaderboard, leaderboard.length + 1);

  const leaderboardJsonLd =
    leaderboard.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "TraderMarket Prop Firm Leaderboard",
          itemListOrder: "https://schema.org/ItemListOrderDescending",
          numberOfItems: leaderboard.length,
          itemListElement: leaderboard.map((entry) => ({
            "@type": "ListItem",
            position: entry.rank,
            url: `https://tradermarket.online/firm/${entry.slug}`,
            name: entry.name,
          })),
        }
      : null;

  return (
    <>
      {leaderboardJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(leaderboardJsonLd) }}
        />
      )}
      <Nav locale={locale} copy={chrome.nav} />
      <HomeContent
        copy={copy}
        prefix={`/${locale}`}
        leaderboard={leaderboard}
        stats={stats}
        reviewSummaries={reviewSummaries}
        minimumForFirst={minimumForFirst}
        newSpotMinimum={newSpotMinimum}
      />
      <Footer
        locale={locale}
        copy={chrome.footer}
        switcher={{ path: "/", availableLocales: SUPPORTED_LOCALES }}
      />
    </>
  );
}
