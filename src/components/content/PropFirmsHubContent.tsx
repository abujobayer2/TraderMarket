import Link from "next/link";
import { COUNTRIES, type CountryRegion } from "@/lib/countries";
import { localeForCountrySlug } from "@/lib/i18n/locales";

export interface PropFirmsHubCopy {
  kicker: string;
  h1: string;
  intro: string;
  regionLabels: Record<CountryRegion, string>;
  faqHeading: string;
  faqs: { q: string; a: string }[];
  relatedHeading: string;
  relatedForex: string;
  relatedFutures: string;
  relatedCrypto: string;
  relatedReviews: string;
}

const REGION_ORDER: CountryRegion[] = [
  "North America",
  "UK & Europe",
  "Asia-Pacific",
  "Middle East & Africa",
];

// From this hub, a country links to its own localized page when the current
// locale has one (e.g. the Japanese hub links to /ja/prop-firms/japan for
// Japan) — every other country still links to its English page, since no
// other translation exists for it.
export function PropFirmsHubContent({ copy, prefix }: { copy: PropFirmsHubCopy; prefix: string }) {
  const currentLocale = prefix.replace("/", "") || undefined;

  return (
    <div className="mx-auto max-w-[960px]">
      <p className="text-[14px] font-medium uppercase leading-[14px] tracking-[1px] text-primary">
        {copy.kicker}
      </p>
      <h1 className="mt-3 text-[32px] font-medium leading-[36px] tracking-[1px] text-ink sm:text-[46px] sm:leading-[48px] sm:tracking-normal">
        {copy.h1}
      </h1>
      <p className="mt-4 max-w-[720px] text-[18px] leading-[27px] text-body">{copy.intro}</p>

      {REGION_ORDER.map((region) => {
        const countries = COUNTRIES.filter((c) => c.region === region);
        if (countries.length === 0) return null;
        return (
          <section key={region} className="mt-12">
            <h2 className="text-[20px] font-semibold leading-[26px] tracking-[-0.4px] text-ink">
              {copy.regionLabels[region]}
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
              {countries.map((c) => {
                const matchesLocale = currentLocale && localeForCountrySlug(c.slug) === currentLocale;
                const href = matchesLocale ? `${prefix}/prop-firms/${c.slug}` : `/prop-firms/${c.slug}`;
                return (
                  <Link key={c.slug} href={href} className="text-[16px] leading-[24px] text-ink hover:text-primary">
                    {c.name}
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}

      <section className="mt-16 border-t border-ink/10 pt-12">
        <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
          {copy.faqHeading}
        </h2>
        <div className="mt-6 flex flex-col gap-6">
          {copy.faqs.map((item) => (
            <div key={item.q}>
              <h3 className="text-[16px] font-semibold leading-[24px] text-ink">{item.q}</h3>
              <p className="mt-1 text-[16px] leading-[24px] text-body">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <nav aria-label="Related" className="mt-14 border-t border-ink/10 pt-6">
        <p className="text-[13px] font-medium uppercase leading-[13px] tracking-[1px] text-body-mid">
          {copy.relatedHeading}
        </p>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[15px] leading-[22px]">
          <Link href={`${prefix}/forex-prop-firms`} className="text-ink hover:text-primary">
            {copy.relatedForex}
          </Link>
          <Link href={`${prefix}/futures-prop-firms`} className="text-ink hover:text-primary">
            {copy.relatedFutures}
          </Link>
          <Link href={`${prefix}/crypto-prop-firms`} className="text-ink hover:text-primary">
            {copy.relatedCrypto}
          </Link>
          <Link href={`${prefix}/prop-firm-reviews`} className="text-ink hover:text-primary">
            {copy.relatedReviews}
          </Link>
        </div>
      </nav>
    </div>
  );
}
