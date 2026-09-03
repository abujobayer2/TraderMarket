import Link from "next/link";
import { Stars } from "@/components/Stars";
import { renderTemplate } from "@/lib/i18n/renderTemplate";
import type { CountryProfile } from "@/lib/countries";
import type { LeaderboardEntry } from "@/lib/ranking";
import type { FirmRatingBrief } from "@/lib/reviews";

// The free-text fields that genuinely differ per country and get translated
// per locale; everything else on CountryProfile (slug, currency, utcOffset,
// regulator name, recommendedAssetClass) stays as-is across languages.
// `localizedName` overrides the display name (e.g. "日本" instead of "Japan")
// — optional since a name in the local script matters far more for some
// languages (Japanese, Arabic, Thai) than others (French, German, Spanish,
// which typically just borrow or lightly adapt the English name).
export type CountryTranslation = Pick<CountryProfile, "sessionNote" | "regulatoryNote" | "paymentNote" | "faq"> & {
  localizedName?: string;
};

export interface CountryPageCopy {
  backLinkText: string;
  kickerTemplate: string; // "{country}"
  h1Template: string; // "{country}"
  metaDescriptionTemplate: string; // "{country}", "{regulator}"
  defaultRegulatorLabel: string; // fallback when a country has no named regulator
  introTemplate: string; // "{country}" (appears twice)
  currencyLabel: string;
  timezoneLabel: string;
  regulatorLabel: string;
  regulationHeading: string;
  sessionHeadingTemplate: string; // "{country}"
  paymentHeading: string;
  assetClassHeading: string;
  assetClassFuturesTemplate: string; // "{country}", "{link}"
  assetClassMultiTemplate: string; // "{country}", "{forex}", "{futures}", "{crypto}"
  assetClassForexLabel: string;
  assetClassFuturesLabel: string;
  assetClassCryptoLabel: string;
  assetClassMultiLabel: string;
  firmsHeading: string;
  firmsIntro: string;
  allReviewsLinkText: string;
  faqHeading: string;
  sharedFaqs: { q: string; a: string }[];
  alsoInTemplate: string; // "{region}"
  allCountriesLinkText: string;
  regionLabels: Record<string, string>;
}

export function CountryPageContent({
  copy,
  prefix,
  country,
  firms,
  summaries,
  related,
}: {
  copy: CountryPageCopy;
  prefix: string;
  country: CountryProfile;
  firms: LeaderboardEntry[];
  summaries: Map<string, FirmRatingBrief>;
  related: CountryProfile[];
}) {
  const faqs = country.faq ? [...copy.sharedFaqs, country.faq] : copy.sharedFaqs;
  const assetClassHref =
    country.recommendedAssetClass === "forex"
      ? `${prefix}/forex-prop-firms`
      : country.recommendedAssetClass === "futures"
        ? `${prefix}/futures-prop-firms`
        : `${prefix}/prop-firm-reviews`;
  const assetClassLabel =
    country.recommendedAssetClass === "forex"
      ? copy.assetClassForexLabel
      : country.recommendedAssetClass === "futures"
        ? copy.assetClassFuturesLabel
        : copy.assetClassMultiLabel;

  return (
    <div className="mx-auto max-w-[820px]">
      <Link href={`${prefix}/prop-firms`} className="text-[14px] leading-[21px] text-body-mid hover:text-ink">
        {copy.backLinkText}
      </Link>
      <p className="mt-4 text-[14px] font-medium uppercase leading-[14px] tracking-[1px] text-primary">
        {copy.kickerTemplate.replace("{country}", country.name)}
      </p>
      <h1 className="mt-3 text-[32px] font-medium leading-[36px] tracking-[1px] text-ink sm:text-[46px] sm:leading-[48px] sm:tracking-normal">
        {copy.h1Template.replace("{country}", country.name)}
      </h1>
      <p className="mt-4 text-[18px] leading-[27px] text-body">
        {copy.introTemplate.replaceAll("{country}", country.name)}
      </p>

      <div className="mt-8 flex flex-wrap gap-3 text-[14px] leading-[20px] text-body-mid">
        <span className="rounded-pill bg-canvas-soft px-3 py-1.5">
          {copy.currencyLabel} {country.currency}
        </span>
        <span className="rounded-pill bg-canvas-soft px-3 py-1.5">
          {copy.timezoneLabel} {country.utcOffset}
        </span>
        {country.regulator && (
          <span className="rounded-pill bg-canvas-soft px-3 py-1.5">
            {copy.regulatorLabel} {country.regulator}
          </span>
        )}
      </div>

      <section className="mt-14">
        <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
          {copy.regulationHeading}
        </h2>
        <p className="mt-3 text-[16px] leading-[24px] text-body">{country.regulatoryNote}</p>
      </section>

      <section className="mt-12">
        <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
          {copy.sessionHeadingTemplate.replace("{country}", country.name)}
        </h2>
        <p className="mt-3 text-[16px] leading-[24px] text-body">{country.sessionNote}</p>
      </section>

      <section className="mt-12">
        <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
          {copy.paymentHeading}
        </h2>
        <p className="mt-3 text-[16px] leading-[24px] text-body">{country.paymentNote}</p>
      </section>

      <section className="mt-12">
        <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
          {copy.assetClassHeading}
        </h2>
        <p className="mt-3 text-[16px] leading-[24px] text-body">
          {country.recommendedAssetClass === "futures"
            ? renderTemplate(copy.assetClassFuturesTemplate, {
                country: country.name,
                link: (
                  <Link href={assetClassHref} className="font-semibold text-ink hover:text-primary">
                    {assetClassLabel}
                  </Link>
                ),
              })
            : renderTemplate(copy.assetClassMultiTemplate, {
                country: country.name,
                forex: (
                  <Link href={`${prefix}/forex-prop-firms`} className="font-semibold text-ink hover:text-primary">
                    {copy.assetClassForexLabel}
                  </Link>
                ),
                futures: (
                  <Link href={`${prefix}/futures-prop-firms`} className="font-semibold text-ink hover:text-primary">
                    {copy.assetClassFuturesLabel}
                  </Link>
                ),
                crypto: (
                  <Link href={`${prefix}/crypto-prop-firms`} className="font-semibold text-ink hover:text-primary">
                    {copy.assetClassCryptoLabel}
                  </Link>
                ),
              })}
        </p>
      </section>

      {firms.length > 0 && (
        <section className="mt-12">
          <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
            {copy.firmsHeading}
          </h2>
          <p className="mt-3 text-[16px] leading-[24px] text-body">{copy.firmsIntro}</p>
          <ul className="mt-4 flex flex-col gap-2">
            {firms.map((firm) => {
              const s = summaries.get(firm.slug);
              return (
                <li key={firm.id} className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <Link
                    href={`/firm/${firm.slug}`}
                    className="text-[16px] font-semibold leading-[24px] text-ink hover:text-primary"
                  >
                    #{firm.rank} {firm.name}
                  </Link>
                  {s && s.count > 0 && (
                    <span className="flex items-center gap-1.5 text-[13px] text-body-mid">
                      <Stars value={s.average} size={12} />
                      {s.average.toFixed(1)}
                      <Link href={`/firm/${firm.slug}/reviews`} className="hover:text-primary">
                        ({s.count})
                      </Link>
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
          <Link
            href={`${prefix}/prop-firm-reviews`}
            className="mt-4 inline-block text-[14px] font-semibold text-body-mid hover:text-primary"
          >
            {copy.allReviewsLinkText}
          </Link>
        </section>
      )}

      <section className="mt-16 border-t border-ink/10 pt-12">
        <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
          {copy.faqHeading}
        </h2>
        <div className="mt-6 flex flex-col gap-6">
          {faqs.map((item) => (
            <div key={item.q}>
              <h3 className="text-[16px] font-semibold leading-[24px] text-ink">{item.q}</h3>
              <p className="mt-1 text-[16px] leading-[24px] text-body">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <nav aria-label="Related countries" className="mt-14 border-t border-ink/10 pt-6">
          <p className="text-[13px] font-medium uppercase leading-[13px] tracking-[1px] text-body-mid">
            {copy.alsoInTemplate.replace("{region}", copy.regionLabels[country.region] ?? country.region)}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[15px] leading-[22px]">
            {related.map((c) => (
              <Link key={c.slug} href={`/prop-firms/${c.slug}`} className="text-ink hover:text-primary">
                {c.name}
              </Link>
            ))}
            <Link href={`${prefix}/prop-firms`} className="text-body-mid hover:text-primary">
              {copy.allCountriesLinkText}
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
}
