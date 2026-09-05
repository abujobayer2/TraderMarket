import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { RulesContent } from "@/components/content/RulesContent";
import { RULES_COPY } from "@/lib/i18n/copy/rules";
import { CHROME_COPY } from "@/lib/i18n/copy/chrome";
import { languageAlternatesFor } from "@/lib/i18n/hreflang";
import { socialMetadata } from "@/lib/i18n/metadata";
import { isLocale, SUPPORTED_LOCALES, type Locale } from "@/lib/i18n/locales";

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.filter((l) => l in RULES_COPY).map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang) || !RULES_COPY[lang]) return { title: "Not Found" };
  const copy = RULES_COPY[lang];
  return {
    title: copy.h1,
    description: copy.intro,
    alternates: { canonical: `/${lang}/rules`, languages: languageAlternatesFor("/rules", RULES_COPY) },
    ...socialMetadata({
      path: "/rules",
      locale: lang as Locale,
      title: `${copy.h1} — TraderMarket`,
      description: copy.intro,
    }),
  };
}

export default async function LocalizedRulesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const copy = RULES_COPY[lang];
  if (!copy) notFound();
  const locale = lang as Locale;
  const chrome = CHROME_COPY[locale] ?? CHROME_COPY.en;

  return (
    <>
      <Nav locale={locale} copy={chrome.nav} />
      <main className="flex-1 bg-canvas px-6 py-16 sm:py-24">
        <RulesContent copy={copy} />
      </main>
      <Footer
        locale={locale}
        copy={chrome.footer}
        switcher={{ path: "/rules", availableLocales: SUPPORTED_LOCALES }}
      />
    </>
  );
}
