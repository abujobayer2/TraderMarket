import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PropFirmsHubContent } from "@/components/content/PropFirmsHubContent";
import { PROP_FIRMS_HUB_COPY } from "@/lib/i18n/copy/propFirmsHub";
import { CHROME_COPY } from "@/lib/i18n/copy/chrome";
import { jsonLdScript } from "@/lib/jsonLd";
import { COUNTRIES } from "@/lib/countries";
import { languageAlternatesFor } from "@/lib/i18n/hreflang";
import { socialMetadata } from "@/lib/i18n/metadata";
import { isLocale, SUPPORTED_LOCALES, type Locale } from "@/lib/i18n/locales";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://tradermarket.online";

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.filter((l) => l in PROP_FIRMS_HUB_COPY).map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang) || !PROP_FIRMS_HUB_COPY[lang]) return { title: "Not Found" };
  const copy = PROP_FIRMS_HUB_COPY[lang];
  return {
    title: copy.h1,
    description: copy.intro,
    alternates: { canonical: `/${lang}/prop-firms`, languages: languageAlternatesFor("/prop-firms", PROP_FIRMS_HUB_COPY) },
    ...socialMetadata({
      path: "/prop-firms",
      locale: lang as Locale,
      title: `${copy.h1} — TraderMarket`,
      description: copy.intro,
    }),
  };
}

export default async function LocalizedPropFirmsHubPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const copy = PROP_FIRMS_HUB_COPY[lang];
  if (!copy) notFound();
  const locale = lang as Locale;
  const chrome = CHROME_COPY[locale] ?? CHROME_COPY.en;
  const prefix = `/${locale}`;

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: copy.h1,
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
      { "@type": "ListItem", position: 2, name: copy.h1, item: `${BASE}${prefix}/prop-firms` },
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }} />
      <Nav locale={locale} copy={chrome.nav} />
      <main className="flex-1 bg-canvas px-6 py-16 sm:py-24">
        <PropFirmsHubContent copy={copy} prefix={prefix} />
      </main>
      <Footer
        locale={locale}
        copy={chrome.footer}
        switcher={{ path: "/prop-firms", availableLocales: SUPPORTED_LOCALES }}
      />
    </>
  );
}
