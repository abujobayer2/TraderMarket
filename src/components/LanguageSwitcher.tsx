import Link from "next/link";
import { LOCALE_META, type Locale } from "@/lib/i18n/locales";

// A page-aware language switcher: links to the SAME page (`path`) in every
// locale that actually has a translation, plus back to English. Only
// rendered on pages that pass `availableLocales` (the 9 in-scope templates
// get every locale; /prop-firms/[country] passes just its own matching
// locale(s)) — pages with no translated counterpart don't render one.
export function LanguageSwitcher({
  path,
  availableLocales,
  currentLocale,
}: {
  path: string;
  availableLocales: Locale[];
  currentLocale?: Locale;
}) {
  if (availableLocales.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] leading-[19px] text-canvas-soft/60">
      <span>Language:</span>
      <Link
        href={path}
        className={!currentLocale ? "font-semibold text-canvas" : "hover:text-canvas"}
      >
        English
      </Link>
      {availableLocales.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}${path}`}
          lang={locale}
          className={currentLocale === locale ? "font-semibold text-canvas" : "hover:text-canvas"}
        >
          {LOCALE_META[locale].nativeName}
        </Link>
      ))}
    </div>
  );
}
