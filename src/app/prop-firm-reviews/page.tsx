import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PropFirmReviewsContent } from "@/components/content/PropFirmReviewsContent";
import { PROP_FIRM_REVIEWS_COPY } from "@/lib/i18n/copy/propFirmReviews";
import { getActiveLeaderboard } from "@/lib/ranking";
import { getReviewSummaries } from "@/lib/reviews";
import { jsonLdScript } from "@/lib/jsonLd";
import { languageAlternatesFor } from "@/lib/i18n/hreflang";
import { SUPPORTED_LOCALES } from "@/lib/i18n/locales";

export const revalidate = 60;

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://tradermarket.online";
const copy = PROP_FIRM_REVIEWS_COPY.en;
const TITLE = "Prop Firm Reviews — Trader Ratings, Payout Feedback & Scores";
const DESCRIPTION =
  "Read trader-submitted reviews of proprietary trading firms. Compare star ratings, payout feedback, and challenge experiences across every prop firm listed on TraderMarket — forex, futures, and crypto.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "prop firm reviews",
    "prop trading firm reviews",
    "funded trading firm reviews",
    "prop firm ratings",
    "prop firm payout reviews",
    "is prop firm legit",
    "best rated prop firms",
  ],
  alternates: { canonical: "/prop-firm-reviews", languages: languageAlternatesFor("/prop-firm-reviews", PROP_FIRM_REVIEWS_COPY) },
  openGraph: { type: "website", title: `${TITLE} — TraderMarket`, description: DESCRIPTION, url: "/prop-firm-reviews" },
  twitter: { title: `${TITLE} — TraderMarket`, description: DESCRIPTION },
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
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Leaderboard", item: BASE },
    { "@type": "ListItem", position: 2, name: "Prop Firm Reviews", item: `${BASE}/prop-firm-reviews` },
  ],
};

export default async function PropFirmReviewsHubPage() {
  const [leaderboard, summaries] = await Promise.all([
    getActiveLeaderboard(),
    getReviewSummaries(),
  ]);

  const rows = leaderboard
    .map((firm) => ({ firm, summary: summaries.get(firm.slug) }))
    .sort((a, b) => {
      const ar = a.summary?.count ? a.summary.average : -1;
      const br = b.summary?.count ? b.summary.average : -1;
      if (br !== ar) return br - ar;
      const ac = a.summary?.count ?? 0;
      const bc = b.summary?.count ?? 0;
      if (bc !== ac) return bc - ac;
      return a.firm.rank - b.firm.rank;
    });

  const reviewed = rows.filter((r) => r.summary && r.summary.count > 0);
  const totalReviews = reviewed.reduce((s, r) => s + (r.summary?.count ?? 0), 0);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: TITLE,
    description: DESCRIPTION,
    numberOfItems: rows.length,
    itemListElement: rows.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE}/firm/${r.firm.slug}/reviews`,
      name: `${r.firm.name} reviews`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }} />
      <Nav />
      <main className="flex-1 bg-canvas px-6 py-16 sm:py-24">
        <PropFirmReviewsContent copy={copy} prefix="" rows={rows} reviewed={reviewed} totalReviews={totalReviews} />
      </main>
      <Footer switcher={{ path: "/prop-firm-reviews", availableLocales: SUPPORTED_LOCALES }} />
    </>
  );
}
