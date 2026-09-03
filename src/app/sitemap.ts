import type { MetadataRoute } from "next";
import { connectDB } from "@/lib/db";
import { PropFirm } from "@/lib/models/PropFirm";
import { getReviewSummaries, REVIEWS_PER_PAGE } from "@/lib/reviews";
import { COUNTRIES } from "@/lib/countries";
import { HOME_COPY } from "@/lib/i18n/copy/home";
import { BEST_FIRMS_COPY } from "@/lib/i18n/copy/bestPropTradingFirms";
import { PROP_FIRM_REVIEWS_COPY } from "@/lib/i18n/copy/propFirmReviews";
import { FOREX_COPY } from "@/lib/i18n/copy/forexPropFirms";
import { FUTURES_COPY } from "@/lib/i18n/copy/futuresPropFirms";
import { CRYPTO_COPY } from "@/lib/i18n/copy/cryptoPropFirms";
import { FUNDED_PROGRAMS_COPY } from "@/lib/i18n/copy/fundedTradingPrograms";
import { RULES_COPY } from "@/lib/i18n/copy/rules";
import { PROP_FIRMS_HUB_COPY } from "@/lib/i18n/copy/propFirmsHub";
import { COUNTRY_PAGE_COPY, COUNTRY_TRANSLATIONS } from "@/lib/i18n/copy/countryPage";
import type { Locale } from "@/lib/i18n/locales";

// One entry per (path, changeFrequency, priority) whose translated locales
// come from whichever locales that template's copy object already has —
// avoids sitemap-ing a /{lang}/path that would 404 because that language
// hasn't been translated yet.
function localizedEntries(
  base: string,
  path: string,
  copyRecord: Record<string, unknown>,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number
): MetadataRoute.Sitemap {
  const locales = Object.keys(copyRecord).filter((l) => l !== "en");
  return [
    { url: `${base}${path}`, changeFrequency, priority },
    ...locales.map((locale) => ({
      url: `${base}/${locale}${path}`,
      changeFrequency,
      priority: priority - 0.1,
    })),
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://tradermarket.online";

  await connectDB();
  const [firms, reviewSummaries] = await Promise.all([
    PropFirm.find({ status: "active" }).select("slug updatedAt").lean(),
    getReviewSummaries(),
  ]);

  return [
    ...localizedEntries(base, "/", HOME_COPY, "hourly", 1),
    ...localizedEntries(base, "/best-prop-trading-firms", BEST_FIRMS_COPY, "hourly", 0.9),
    ...localizedEntries(base, "/prop-firm-reviews", PROP_FIRM_REVIEWS_COPY, "daily", 0.9),
    ...localizedEntries(base, "/funded-trading-programs", FUNDED_PROGRAMS_COPY, "weekly", 0.8),
    ...localizedEntries(base, "/forex-prop-firms", FOREX_COPY, "weekly", 0.8),
    ...localizedEntries(base, "/futures-prop-firms", FUTURES_COPY, "weekly", 0.8),
    ...localizedEntries(base, "/crypto-prop-firms", CRYPTO_COPY, "weekly", 0.8),
    ...localizedEntries(base, "/prop-firms", PROP_FIRMS_HUB_COPY, "weekly", 0.7),
    ...COUNTRIES.flatMap((c) => {
      const entries: MetadataRoute.Sitemap = [
        { url: `${base}/prop-firms/${c.slug}`, changeFrequency: "weekly", priority: 0.5 },
      ];
      for (const locale of Object.keys(COUNTRY_PAGE_COPY).filter((l) => l !== "en") as Locale[]) {
        if (COUNTRY_TRANSLATIONS[locale]?.[c.slug]) {
          entries.push({
            url: `${base}/${locale}/prop-firms/${c.slug}`,
            changeFrequency: "weekly",
            priority: 0.4,
          });
        }
      }
      return entries;
    }),
    { url: `${base}/list`, changeFrequency: "weekly", priority: 0.7 },
    ...localizedEntries(base, "/rules", RULES_COPY, "monthly", 0.5),
    { url: `${base}/widget`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/widget/reviews`, changeFrequency: "monthly", priority: 0.5 },
    ...firms.flatMap((firm) => {
      const reviewCount = reviewSummaries.get(firm.slug)?.count ?? 0;
      const reviewPages = Math.ceil(reviewCount / REVIEWS_PER_PAGE);
      return [
        {
          url: `${base}/firm/${firm.slug}`,
          lastModified: firm.updatedAt,
          changeFrequency: "daily" as const,
          priority: 0.6,
        },
        {
          url: `${base}/firm/${firm.slug}/reviews`,
          lastModified: firm.updatedAt,
          changeFrequency: "daily" as const,
          priority: 0.55,
        },
        // Deeper review pages (2..N) so every review has a crawlable URL.
        ...Array.from({ length: Math.max(0, reviewPages - 1) }, (_, i) => ({
          url: `${base}/firm/${firm.slug}/reviews/page/${i + 2}`,
          lastModified: firm.updatedAt,
          changeFrequency: "weekly" as const,
          priority: 0.4,
        })),
      ];
    }),
  ];
}
