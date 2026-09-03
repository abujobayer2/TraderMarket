import type { CountryPageCopy, CountryTranslation } from "@/components/content/CountryPageContent";
import type { Locale } from "@/lib/i18n/locales";
import { en } from "./en";
import { ja } from "./ja";
import { de } from "./de";
import { fr } from "./fr";
import { es } from "./es";
import { ar } from "./ar";
import { it } from "./it";
import { nl } from "./nl";
import { pl } from "./pl";
import { id } from "./id";
import { vi } from "./vi";
import { ja as jaCountries } from "./translations/ja";
import { de as deCountries } from "./translations/de";
import { fr as frCountries } from "./translations/fr";
import { es as esCountries } from "./translations/es";
import { ar as arCountries } from "./translations/ar";
import { it as itCountries } from "./translations/it";
import { nl as nlCountries } from "./translations/nl";
import { pl as plCountries } from "./translations/pl";
import { id as idCountries } from "./translations/id";
import { vi as viCountries } from "./translations/vi";

export const COUNTRY_PAGE_COPY: Record<"en", CountryPageCopy> & Partial<Record<Locale, CountryPageCopy>> = {
  en,
  ja,
  de,
  fr,
  es,
  ar,
  it,
  nl,
  pl,
  id,
  vi,
};

// Per-locale translations of each matching country's free-text fields
// (sessionNote, regulatoryNote, paymentNote, faq), keyed by country slug.
// Populated as each language's translation lands — see
// src/lib/i18n/copy/countryPage/translations/<lang>.ts. Arabic is the one
// locale with multiple entries (UAE, Saudi Arabia, Egypt all share Arabic).
export const COUNTRY_TRANSLATIONS: Partial<Record<Locale, Record<string, CountryTranslation>>> = {
  ja: jaCountries,
  de: deCountries,
  fr: frCountries,
  es: esCountries,
  ar: arCountries,
  it: itCountries,
  nl: nlCountries,
  pl: plCountries,
  id: idCountries,
  vi: viCountries,
};
