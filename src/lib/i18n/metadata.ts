import type { Metadata } from "next";
import { LOCALE_META, type Locale } from "./locales";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://tradermarket.online";
const SITE_NAME = "TraderMarket";
const DEFAULT_OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: SITE_NAME };

function ogLocale(locale?: Locale): string {
  if (!locale) return "en_US";
  const { bcp47 } = LOCALE_META[locale];
  return bcp47.includes("-") ? bcp47.replace("-", "_") : `${bcp47}_${bcp47.toUpperCase()}`;
}

// Next replaces (not deep-merges) a segment's openGraph/twitter object as a
// whole, so a page that sets openGraph at all must set every field itself —
// a partial object silently drops the default image, and an *absent* one
// falls through to whatever the parent segment (often the English homepage,
// via the root layout) declared. Every page should build its social block
// through this helper instead of hand-rolling one.
export function socialMetadata({
  path,
  locale,
  title,
  description,
  type = "website",
}: {
  path: string;
  locale?: Locale;
  title: string;
  description: string;
  type?: "website" | "article";
}): Pick<Metadata, "openGraph" | "twitter"> {
  const url = `${BASE}${locale ? `/${locale}` : ""}${path}`;
  return {
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      title,
      description,
      locale: ogLocale(locale),
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}
