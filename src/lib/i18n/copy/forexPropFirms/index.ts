import type { ForexPropFirmsCopy } from "@/components/content/ForexPropFirmsContent";
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

export const FOREX_COPY: Record<"en", ForexPropFirmsCopy> & Partial<Record<Locale, ForexPropFirmsCopy>> = {
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
