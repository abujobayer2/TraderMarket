import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PropFirmsHubContent } from "@/components/content/PropFirmsHubContent";
import { PROP_FIRMS_HUB_COPY } from "@/lib/i18n/copy/propFirmsHub";
import { jsonLdScript } from "@/lib/jsonLd";
import { COUNTRIES } from "@/lib/countries";
import { languageAlternatesFor } from "@/lib/i18n/hreflang";
import { socialMetadata } from "@/lib/i18n/metadata";
import { SUPPORTED_LOCALES } from "@/lib/i18n/locales";

export const revalidate = 3600;

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://tradermarket.online";
const copy = PROP_FIRMS_HUB_COPY.en;

const TITLE = "Prop Firms by Country — Rules, Timezones & Payout Notes for Every Region";
const DESCRIPTION =
  "Prop trading firms are global, but regulation, session timing, and how you fund an evaluation or receive a payout genuinely differ by country. Find your country's guide.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "prop firms by country",
    "prop trading firms international",
    "is prop firm trading legal",
    "funded trading account country",
  ],
  alternates: { canonical: "/prop-firms", languages: languageAlternatesFor("/prop-firms", PROP_FIRMS_HUB_COPY) },
  ...socialMetadata({ path: "/prop-firms", title: TITLE, description: DESCRIPTION }),
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: TITLE,
  description: DESCRIPTION,
  numberOfItems: COUNTRIES.length,
  itemListElement: COUNTRIES.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${BASE}/prop-firms/${c.slug}`,
    name: c.name,
  })),
};
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Leaderboard", item: BASE },
    { "@type": "ListItem", position: 2, name: "Prop Firms by Country", item: `${BASE}/prop-firms` },
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

export default function PropFirmsByCountryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }} />
      <Nav />
      <main className="flex-1 bg-canvas px-6 py-16 sm:py-24">
        <PropFirmsHubContent copy={copy} prefix="" />
      </main>
      <Footer switcher={{ path: "/prop-firms", availableLocales: SUPPORTED_LOCALES }} />
    </>
  );
}
