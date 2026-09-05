import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FuturesPropFirmsContent } from "@/components/content/FuturesPropFirmsContent";
import { FUTURES_COPY } from "@/lib/i18n/copy/futuresPropFirms";
import { getActiveLeaderboard } from "@/lib/ranking";
import { getReviewSummaries } from "@/lib/reviews";
import { jsonLdScript } from "@/lib/jsonLd";
import { languageAlternatesFor } from "@/lib/i18n/hreflang";
import { socialMetadata } from "@/lib/i18n/metadata";
import { SUPPORTED_LOCALES } from "@/lib/i18n/locales";

export const revalidate = 60;

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://tradermarket.online";
const copy = FUTURES_COPY.en;
const DESCRIPTION =
  "A trader's guide to futures prop firms: trailing drawdown, daily loss limits, no-overnight rules, CME data fees, Rithmic/Tradovate/NinjaTrader platforms, payout consistency rules, and how to vet a firm before you buy.";

export const metadata: Metadata = {
  title: copy.h1,
  description: DESCRIPTION,
  keywords: [
    "futures prop firms",
    "best futures prop firms",
    "funded futures account",
    "futures funded trading program",
    "futures prop firm trailing drawdown",
    "Tradovate prop firm",
    "Rithmic prop firm",
  ],
  alternates: { canonical: "/futures-prop-firms", languages: languageAlternatesFor("/futures-prop-firms", FUTURES_COPY) },
  ...socialMetadata({
    path: "/futures-prop-firms",
    title: `${copy.h1} — TraderMarket`,
    description: DESCRIPTION,
    type: "article",
  }),
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: copy.h1,
  mainEntityOfPage: `${BASE}/futures-prop-firms`,
  publisher: { "@id": `${BASE}/#organization` },
};
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Leaderboard", item: BASE },
    { "@type": "ListItem", position: 2, name: "Futures Prop Firms", item: `${BASE}/futures-prop-firms` },
  ],
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

export default async function FuturesPropFirmsPage() {
  const [leaderboard, summaries] = await Promise.all([
    getActiveLeaderboard(),
    getReviewSummaries(),
  ]);
  const firms = leaderboard.slice(0, 12);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }} />
      <Nav />
      <main className="flex-1 bg-canvas px-6 py-16 sm:py-24">
        <FuturesPropFirmsContent copy={copy} prefix="" firms={firms} summaries={summaries} />
      </main>
      <Footer switcher={{ path: "/futures-prop-firms", availableLocales: SUPPORTED_LOCALES }} />
    </>
  );
}
