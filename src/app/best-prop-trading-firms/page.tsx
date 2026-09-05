import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BestPropTradingFirmsContent } from "@/components/content/BestPropTradingFirmsContent";
import { BEST_FIRMS_COPY } from "@/lib/i18n/copy/bestPropTradingFirms";
import { getActiveLeaderboard, getPublicStats } from "@/lib/ranking";
import { getReviewSummaries } from "@/lib/reviews";
import { jsonLdScript } from "@/lib/jsonLd";
import { languageAlternatesFor } from "@/lib/i18n/hreflang";
import { socialMetadata } from "@/lib/i18n/metadata";
import { SUPPORTED_LOCALES } from "@/lib/i18n/locales";

export const revalidate = 15;

const copy = BEST_FIRMS_COPY.en;
const TITLE = "Best Prop Trading Firms — Live Rankings";
const DESCRIPTION =
  "The best prop trading firms, ranked by real money firms have paid to hold their spot — not by editorial opinion or affiliate commission. Live data, updated continuously.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/best-prop-trading-firms",
    languages: languageAlternatesFor("/best-prop-trading-firms", BEST_FIRMS_COPY),
  },
  ...socialMetadata({
    path: "/best-prop-trading-firms",
    title: `${TITLE} — TraderMarket`,
    description: DESCRIPTION,
  }),
};

const itemListJsonLd = (leaderboard: Awaited<ReturnType<typeof getActiveLeaderboard>>) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: TITLE,
  description: DESCRIPTION,
  itemListOrder: "https://schema.org/ItemListOrderDescending",
  numberOfItems: leaderboard.length,
  itemListElement: leaderboard.map((entry) => ({
    "@type": "ListItem",
    position: entry.rank,
    url: `https://tradermarket.online/firm/${entry.slug}`,
    name: entry.name,
  })),
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

export default async function BestPropTradingFirmsPage() {
  const [leaderboard, stats, reviewSummaries] = await Promise.all([
    getActiveLeaderboard(),
    getPublicStats(),
    getReviewSummaries(),
  ]);
  const updatedAt = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {leaderboard.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(itemListJsonLd(leaderboard)) }}
        />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }} />
      <Nav />
      <main className="flex-1 bg-canvas px-6 py-16 sm:py-24">
        <BestPropTradingFirmsContent
          copy={copy}
          prefix=""
          leaderboard={leaderboard}
          stats={stats}
          reviewSummaries={reviewSummaries}
          updatedAt={updatedAt}
        />
      </main>
      <Footer switcher={{ path: "/best-prop-trading-firms", availableLocales: SUPPORTED_LOCALES }} />
    </>
  );
}
