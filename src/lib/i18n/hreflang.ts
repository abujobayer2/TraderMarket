import { SUPPORTED_LOCALES, type Locale } from "./locales";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://tradermarket.online";

// Builds the alternates.languages map for a page that exists at `path` in
// English and at /{locale}{path} for each locale in `locales`. Identical
// output is used on the English page and every translated counterpart —
// hreflang requires each version to list every version, including itself.
export function languageAlternates(
  path: string,
  locales: Locale[] = SUPPORTED_LOCALES
): Record<string, string> {
  const languages: Record<string, string> = {
    "x-default": `${BASE}${path}`,
    en: `${BASE}${path}`,
  };
  for (const locale of locales) {
    languages[locale] = `${BASE}/${locale}${path}`;
  }
  return languages;
}

// Same as languageAlternates, but derives the locale list from whichever
// locales a template's copy object actually has translations for — so
// hreflang never advertises a /{locale}{path} that would 404 because that
// language hasn't landed yet.
export function languageAlternatesFor(path: string, copyRecord: Record<string, unknown>): Record<string, string> {
  const locales = Object.keys(copyRecord).filter((l) => l !== "en") as Locale[];
  return languageAlternates(path, locales);
}
