import type { CryptoPropFirmsCopy } from "@/components/content/CryptoPropFirmsContent";
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

export const CRYPTO_COPY: Record<"en", CryptoPropFirmsCopy> & Partial<Record<Locale, CryptoPropFirmsCopy>> = {
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
