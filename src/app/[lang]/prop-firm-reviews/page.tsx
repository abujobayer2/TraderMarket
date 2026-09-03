import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PropFirmReviewsContent } from "@/components/content/PropFirmReviewsContent";
import { PROP_FIRM_REVIEWS_COPY } from "@/lib/i18n/copy/propFirmReviews";
import { CHROME_COPY } from "@/lib/i18n/copy/chrome";
import { getActiveLeaderboard } from "@/lib/ranking";
import { getReviewSummaries } from "@/lib/reviews";
import { jsonLdScript } from "@/lib/jsonLd";
import { languageAlternatesFor } from "@/lib/i18n/hreflang";
import { isLocale, SUPPORTED_LOCALES, type Locale } from "@/lib/i18n/locales";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://tradermarket.online";

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.filter((l) => l in PROP_FIRM_REVIEWS_COPY).map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang) || !PROP_FIRM_REVIEWS_COPY[lang]) return { title: "Not Found" };
  const copy = PROP_FIRM_REVIEWS_COPY[lang];
  return {
    title: copy.h1,
    alternates: {
      canonical: `/${lang}/prop-firm-reviews`,
      languages: languageAlternatesFor("/prop-firm-reviews", PROP_FIRM_REVIEWS_COPY),
    },
  };
}

export default async function LocalizedPropFirmReviewsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const copy = PROP_FIRM_REVIEWS_COPY[lang];
  if (!copy) notFound();
  const locale = lang as Locale;
  const chrome = CHROME_COPY[locale] ?? CHROME_COPY.en;
  const prefix = `/${locale}`;

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
      { "@type": "ListItem", position: 2, name: copy.h1, item: `${BASE}${prefix}/prop-firm-reviews` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }} />
      <Nav locale={locale} copy={chrome.nav} />
      <main className="flex-1 bg-canvas px-6 py-16 sm:py-24">
        <PropFirmReviewsContent
          copy={copy}
          prefix={prefix}
          rows={rows}
          reviewed={reviewed}
          totalReviews={totalReviews}
        />
      </main>
      <Footer
        locale={locale}
        copy={chrome.footer}
        switcher={{ path: "/prop-firm-reviews", availableLocales: SUPPORTED_LOCALES }}
      />
    </>
  );
}
