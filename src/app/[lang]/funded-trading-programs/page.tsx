import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FundedTradingProgramsContent } from "@/components/content/FundedTradingProgramsContent";
import { FUNDED_PROGRAMS_COPY } from "@/lib/i18n/copy/fundedTradingPrograms";
import { CHROME_COPY } from "@/lib/i18n/copy/chrome";
import { getActiveLeaderboard } from "@/lib/ranking";
import { jsonLdScript } from "@/lib/jsonLd";
import { languageAlternatesFor } from "@/lib/i18n/hreflang";
import { isLocale, SUPPORTED_LOCALES, type Locale } from "@/lib/i18n/locales";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://tradermarket.online";

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.filter((l) => l in FUNDED_PROGRAMS_COPY).map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang) || !FUNDED_PROGRAMS_COPY[lang]) return { title: "Not Found" };
  const copy = FUNDED_PROGRAMS_COPY[lang];
  return {
    title: copy.h1,
    alternates: {
      canonical: `/${lang}/funded-trading-programs`,
      languages: languageAlternatesFor("/funded-trading-programs", FUNDED_PROGRAMS_COPY),
    },
  };
}

export default async function LocalizedFundedTradingProgramsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const copy = FUNDED_PROGRAMS_COPY[lang];
  if (!copy) notFound();
  const locale = lang as Locale;
  const chrome = CHROME_COPY[locale] ?? CHROME_COPY.en;
  const prefix = `/${locale}`;

  const leaderboard = await getActiveLeaderboard();
  const topFirms = leaderboard.slice(0, 5);

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
    mainEntityOfPage: `${BASE}${prefix}/funded-trading-programs`,
    publisher: { "@id": `${BASE}/#organization` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(articleJsonLd) }} />
      <Nav locale={locale} copy={chrome.nav} />
      <main className="flex-1 bg-canvas px-6 py-16 sm:py-24">
        <FundedTradingProgramsContent copy={copy} prefix={prefix} firms={topFirms} />
      </main>
      <Footer
        locale={locale}
        copy={chrome.footer}
        switcher={{ path: "/funded-trading-programs", availableLocales: SUPPORTED_LOCALES }}
      />
    </>
  );
}
