// Locales this site is translated into, beyond the canonical unprefixed
// English site. Chosen to match the non-English-first countries covered by
// /prop-firms/[country] — see src/lib/countries.ts. UK/Canada/Australia/NZ/
// Ireland/India/Pakistan/Philippines/Singapore/Malaysia/Nigeria/South Africa
// stay English-only since English is already the dominant trading-content
// language there.

export type Locale = "ja" | "de" | "fr" | "es" | "ar" | "it" | "nl" | "pl" | "id" | "vi" | "th";

export const SUPPORTED_LOCALES: Locale[] = ["ja", "de", "fr", "es", "ar", "it", "nl", "pl", "id", "vi", "th"];

export type LocaleMeta = {
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
  // BCP-47 tag for Intl/toLocaleDateString formatting.
  bcp47: string;
  // Which /prop-firms/[country] slug(s) this language has a translated page for.
  countrySlugs: string[];
};

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  ja: { name: "Japanese", nativeName: "日本語", dir: "ltr", bcp47: "ja-JP", countrySlugs: ["japan"] },
  de: { name: "German", nativeName: "Deutsch", dir: "ltr", bcp47: "de-DE", countrySlugs: ["germany"] },
  fr: { name: "French", nativeName: "Français", dir: "ltr", bcp47: "fr-FR", countrySlugs: ["france"] },
  es: { name: "Spanish", nativeName: "Español", dir: "ltr", bcp47: "es-ES", countrySlugs: ["spain"] },
  ar: {
    name: "Arabic",
    nativeName: "العربية",
    dir: "rtl",
    bcp47: "ar",
    countrySlugs: ["united-arab-emirates", "saudi-arabia", "egypt"],
  },
  it: { name: "Italian", nativeName: "Italiano", dir: "ltr", bcp47: "it-IT", countrySlugs: ["italy"] },
  nl: { name: "Dutch", nativeName: "Nederlands", dir: "ltr", bcp47: "nl-NL", countrySlugs: ["netherlands"] },
  pl: { name: "Polish", nativeName: "Polski", dir: "ltr", bcp47: "pl-PL", countrySlugs: ["poland"] },
  id: {
    name: "Indonesian",
    nativeName: "Bahasa Indonesia",
    dir: "ltr",
    bcp47: "id-ID",
    countrySlugs: ["indonesia"],
  },
  vi: { name: "Vietnamese", nativeName: "Tiếng Việt", dir: "ltr", bcp47: "vi-VN", countrySlugs: ["vietnam"] },
  th: { name: "Thai", nativeName: "ไทย", dir: "ltr", bcp47: "th-TH", countrySlugs: ["thailand"] },
};

export function isLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as string[]).includes(value);
}

export function localeForCountrySlug(slug: string): Locale | undefined {
  return SUPPORTED_LOCALES.find((l) => LOCALE_META[l].countrySlugs.includes(slug));
}
