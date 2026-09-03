import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FundedTradingProgramsContent } from "@/components/content/FundedTradingProgramsContent";
import { FUNDED_PROGRAMS_COPY } from "@/lib/i18n/copy/fundedTradingPrograms";
import { getActiveLeaderboard } from "@/lib/ranking";
import { jsonLdScript } from "@/lib/jsonLd";
import { languageAlternatesFor } from "@/lib/i18n/hreflang";
import { SUPPORTED_LOCALES } from "@/lib/i18n/locales";

export const revalidate = 60;

const copy = FUNDED_PROGRAMS_COPY.en;

export const metadata: Metadata = {
  title: copy.h1,
  description:
    "What a funded trading program actually is, how prop firm evaluations lead to a funded account, and how to tell whether a firm really pays traders after they pass.",
  keywords: [
    "funded trading programs",
    "prop firm pay after pass",
    "prop firm payout",
    "funded trading account",
    "prop firm evaluation",
    "does prop firm pay after passing challenge",
    "best funded trading programs",
  ],
  alternates: {
    canonical: "/funded-trading-programs",
    languages: languageAlternatesFor("/funded-trading-programs", FUNDED_PROGRAMS_COPY),
  },
  openGraph: { title: copy.h1, url: "/funded-trading-programs" },
  twitter: { title: copy.h1 },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: copy.faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};
const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: copy.h1,
  mainEntityOfPage: "https://tradermarket.online/funded-trading-programs",
  publisher: { "@id": "https://tradermarket.online/#organization" },
};
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Leaderboard", item: "https://tradermarket.online" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Funded Trading Programs",
      item: "https://tradermarket.online/funded-trading-programs",
    },
  ],
};

export default async function FundedTradingProgramsPage() {
  const leaderboard = await getActiveLeaderboard();
  const topFirms = leaderboard.slice(0, 5);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(articleJsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }}
      />
      <Nav />
      <main className="flex-1 bg-canvas px-6 py-16 sm:py-24">
        <FundedTradingProgramsContent copy={copy} prefix="" firms={topFirms} />
      </main>
      <Footer switcher={{ path: "/funded-trading-programs", availableLocales: SUPPORTED_LOCALES }} />
    </>
  );
}
