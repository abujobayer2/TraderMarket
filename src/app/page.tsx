import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { HomeContent } from "@/components/content/HomeContent";
import { HOME_COPY } from "@/lib/i18n/copy/home";
import { getActiveLeaderboard, getPublicStats, minimumBidForPosition } from "@/lib/ranking";
import { getReviewSummaries } from "@/lib/reviews";
import { jsonLdScript } from "@/lib/jsonLd";
import { languageAlternatesFor } from "@/lib/i18n/hreflang";
import { SUPPORTED_LOCALES } from "@/lib/i18n/locales";

export const revalidate = 15;

const DESCRIPTION =
  "TraderMarket is the public prop firm leaderboard. Want a position? Outbid the firm currently holding it — one payment, no subscription. Live rankings updated in real time.";

export const metadata: Metadata = {
  title: "TraderMarket — The Prop Firm Leaderboard",
  description: DESCRIPTION,
  alternates: { canonical: "/", languages: languageAlternatesFor("/", HOME_COPY) },
  openGraph: {
    title: "TraderMarket — The Prop Firm Leaderboard",
    description: DESCRIPTION,
    url: "/",
  },
  twitter: {
    title: "TraderMarket — The Prop Firm Leaderboard",
    description: DESCRIPTION,
  },
};

export default async function HomePage() {
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
          description: DESCRIPTION,
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
      <Nav />
      <HomeContent
        copy={HOME_COPY.en}
        prefix=""
        leaderboard={leaderboard}
        stats={stats}
        reviewSummaries={reviewSummaries}
        minimumForFirst={minimumForFirst}
        newSpotMinimum={newSpotMinimum}
      />
      <Footer switcher={{ path: "/", availableLocales: SUPPORTED_LOCALES }} />
    </>
  );
}
