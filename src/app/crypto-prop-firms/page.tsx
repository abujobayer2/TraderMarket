import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CryptoPropFirmsContent } from "@/components/content/CryptoPropFirmsContent";
import { CRYPTO_COPY } from "@/lib/i18n/copy/cryptoPropFirms";
import { getActiveLeaderboard } from "@/lib/ranking";
import { getReviewSummaries } from "@/lib/reviews";
import { jsonLdScript } from "@/lib/jsonLd";
import { languageAlternatesFor } from "@/lib/i18n/hreflang";
import { SUPPORTED_LOCALES } from "@/lib/i18n/locales";

export const revalidate = 60;

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://tradermarket.online";
const copy = CRYPTO_COPY.en;

export const metadata: Metadata = {
  title: copy.h1,
  description:
    "A trader's guide to crypto prop firms: 24/7 markets, perpetual vs. spot evaluations, drawdown and leverage rules, why payout track records are shorter, the regulatory gap, and how to vet a crypto-native funded program.",
  keywords: [
    "crypto prop firms",
    "best crypto prop firms",
    "funded crypto account",
    "crypto funded trading program",
    "crypto prop firm evaluation",
    "bitcoin prop firm",
    "crypto perpetuals prop firm",
  ],
  alternates: { canonical: "/crypto-prop-firms", languages: languageAlternatesFor("/crypto-prop-firms", CRYPTO_COPY) },
  openGraph: { type: "article", title: copy.h1, url: "/crypto-prop-firms" },
  twitter: { title: copy.h1 },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: copy.h1,
  mainEntityOfPage: `${BASE}/crypto-prop-firms`,
  publisher: { "@id": `${BASE}/#organization` },
};
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Leaderboard", item: BASE },
    { "@type": "ListItem", position: 2, name: "Crypto Prop Firms", item: `${BASE}/crypto-prop-firms` },
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

export default async function CryptoPropFirmsPage() {
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
        <CryptoPropFirmsContent copy={copy} prefix="" firms={firms} summaries={summaries} />
      </main>
      <Footer switcher={{ path: "/crypto-prop-firms", availableLocales: SUPPORTED_LOCALES }} />
    </>
  );
}
