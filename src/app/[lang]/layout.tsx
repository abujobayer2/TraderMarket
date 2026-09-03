import { notFound } from "next/navigation";
import { isLocale, LOCALE_META, SUPPORTED_LOCALES } from "@/lib/i18n/locales";

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }));
}

// The root app/layout.tsx already renders <html lang="en"><body>...</body></html>
// for the whole app/ tree (English routes included) — Next allows exactly one
// root layout, so it can't be made dynamic per-locale without restructuring
// every existing English route. Instead this nested layout wraps translated
// pages in a `lang`/`dir` element, which is valid, standard practice for a
// mixed-language document (the same pattern browsers/assistive tech already
// handle for embedded foreign-language blocks). The <title>/meta tags, which
// carry the actual SEO weight, are set correctly per locale via each page's
// own generateMetadata regardless.
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <div lang={lang} dir={LOCALE_META[lang].dir}>
      {children}
    </div>
  );
}
