import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ForexPropFirmsContent } from "@/components/content/ForexPropFirmsContent";
import { FOREX_COPY } from "@/lib/i18n/copy/forexPropFirms";
import { getActiveLeaderboard } from "@/lib/ranking";
import { getReviewSummaries } from "@/lib/reviews";
import { jsonLdScript } from "@/lib/jsonLd";
import { languageAlternatesFor } from "@/lib/i18n/hreflang";
import { socialMetadata } from "@/lib/i18n/metadata";
import { SUPPORTED_LOCALES } from "@/lib/i18n/locales";

export const revalidate = 60;

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://tradermarket.online";
const copy = FOREX_COPY.en;
const DESCRIPTION =
  "A trader's guide to forex prop firms: how funded forex evaluations work, static vs. trailing drawdown, leverage and news-trading rules, MT4/MT5/cTrader platforms, and how to check a firm actually pays out.";

export const metadata: Metadata = {
  title: copy.h1,
  description: DESCRIPTION,
  keywords: [
    "forex prop firms",
    "best forex prop firms",
    "funded forex account",
    "forex funded trading program",
    "forex prop firm evaluation",
    "forex prop firm no news restriction",
    "MT5 prop firm",
  ],
  alternates: { canonical: "/forex-prop-firms", languages: languageAlternatesFor("/forex-prop-firms", FOREX_COPY) },
  ...socialMetadata({
    path: "/forex-prop-firms",
    title: `${copy.h1} — TraderMarket`,
    description: DESCRIPTION,
    type: "article",
  }),
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: copy.h1,
  mainEntityOfPage: `${BASE}/forex-prop-firms`,
  publisher: { "@id": `${BASE}/#organization` },
};
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Leaderboard", item: BASE },
    { "@type": "ListItem", position: 2, name: "Forex Prop Firms", item: `${BASE}/forex-prop-firms` },
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

export default async function ForexPropFirmsPage() {
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
        <ForexPropFirmsContent copy={copy} prefix="" firms={firms} summaries={summaries} />
      </main>
      <Footer switcher={{ path: "/forex-prop-firms", availableLocales: SUPPORTED_LOCALES }} />
    </>
  );
}
