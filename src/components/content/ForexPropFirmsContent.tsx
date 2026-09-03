import Link from "next/link";
import { Stars } from "@/components/Stars";
import { BulletList } from "./BulletList";
import type { LeaderboardEntry } from "@/lib/ranking";
import type { FirmRatingBrief } from "@/lib/reviews";

export interface ForexPropFirmsCopy {
  kicker: string;
  h1: string;
  intro: string;
  howItWorksHeading: string;
  howItWorksBody: string;
  drawdownHeading: string;
  drawdownBody: string;
  sessionsHeading: string;
  sessionsItems: string[];
  dueDiligenceHeading: string;
  dueDiligenceItems: string[];
  dueDiligencePrefix: string;
  dueDiligenceLinkText: string;
  dueDiligenceSuffix: string;
  firmsHeading: string;
  firmsIntro: string;
  allReviewsLinkText: string;
  faqHeading: string;
  faqs: { q: string; a: string }[];
  relatedHeading: string;
  relatedFutures: string;
  relatedCrypto: string;
  relatedBest: string;
  relatedReviews: string;
  relatedCountry: string;
}

export function ForexPropFirmsContent({
  copy,
  prefix,
  firms,
  summaries,
}: {
  copy: ForexPropFirmsCopy;
  prefix: string;
  firms: LeaderboardEntry[];
  summaries: Map<string, FirmRatingBrief>;
}) {
  return (
    <div className="mx-auto max-w-[820px]">
      <p className="text-[14px] font-medium uppercase leading-[14px] tracking-[1px] text-primary">
        {copy.kicker}
      </p>
      <h1 className="mt-3 text-[32px] font-medium leading-[36px] tracking-[1px] text-ink sm:text-[46px] sm:leading-[48px] sm:tracking-normal">
        {copy.h1}
      </h1>
      <p className="mt-4 text-[18px] leading-[27px] text-body">{copy.intro}</p>

      <section className="mt-14">
        <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
          {copy.howItWorksHeading}
        </h2>
        <p className="mt-3 text-[16px] leading-[24px] text-body">{copy.howItWorksBody}</p>
      </section>

      <section className="mt-12">
        <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
          {copy.drawdownHeading}
        </h2>
        <p className="mt-3 text-[16px] leading-[24px] text-body">{copy.drawdownBody}</p>
      </section>

      <section className="mt-12">
        <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
          {copy.sessionsHeading}
        </h2>
        <BulletList items={copy.sessionsItems} />
      </section>

      <section className="mt-12">
        <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
          {copy.dueDiligenceHeading}
        </h2>
        <BulletList items={copy.dueDiligenceItems} />
        <p className="mt-4 text-[16px] leading-[24px] text-body">
          {copy.dueDiligencePrefix}{" "}
          <Link
            href={`${prefix}/funded-trading-programs`}
            className="font-semibold text-ink hover:text-primary"
          >
            {copy.dueDiligenceLinkText}
          </Link>{" "}
          {copy.dueDiligenceSuffix}
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
          <Link href={`${prefix}/futures-prop-firms`} className="text-ink hover:text-primary">
            {copy.relatedFutures}
          </Link>
          <Link href={`${prefix}/crypto-prop-firms`} className="text-ink hover:text-primary">
            {copy.relatedCrypto}
          </Link>
          <Link href={`${prefix}/best-prop-trading-firms`} className="text-ink hover:text-primary">
            {copy.relatedBest}
          </Link>
          <Link href={`${prefix}/prop-firm-reviews`} className="text-ink hover:text-primary">
            {copy.relatedReviews}
          </Link>
          <Link href={`${prefix}/prop-firms`} className="text-ink hover:text-primary">
            {copy.relatedCountry}
          </Link>
        </div>
      </nav>
    </div>
  );
}
