import Link from "next/link";
import Image from "next/image";
import { Stars } from "@/components/Stars";
import type { LeaderboardEntry } from "@/lib/ranking";
import type { FirmRatingBrief } from "@/lib/reviews";

export interface PropFirmReviewsCopy {
  breadcrumbLeaderboard: string;
  breadcrumbCurrent: string;
  h1: string;
  intro: string;
  statFirmsWithReviews: string;
  statTotalReviews: string;
  statHighestRated: string;
  allFirmsHeading: string;
  onLeaderboard: string; // "#{rank} on the leaderboard" -> template with {rank}
  noReviewsYet: string;
  readLink: string;
  reviewLink: string;
  byAssetHeading: string;
  byAssetIntro: string;
  byAssetForex: string;
  byAssetFutures: string;
  byAssetCrypto: string;
  byAssetCountry: string;
  faqHeading: string;
  faqs: { q: string; a: string }[];
}

export function PropFirmReviewsContent({
  copy,
  prefix,
  rows,
  reviewed,
  totalReviews,
}: {
  copy: PropFirmReviewsCopy;
  prefix: string;
  rows: { firm: LeaderboardEntry; summary: FirmRatingBrief | undefined }[];
  reviewed: { firm: LeaderboardEntry; summary: FirmRatingBrief | undefined }[];
  totalReviews: number;
}) {
  return (
    <div className="mx-auto max-w-[900px]">
      <nav aria-label="Breadcrumb" className="text-[14px] leading-[21px] text-body-mid">
        <Link href={prefix || "/"} className="hover:text-ink">
          {copy.breadcrumbLeaderboard}
        </Link>
        <span className="mx-2 text-mute">/</span>
        <span className="text-body">{copy.breadcrumbCurrent}</span>
      </nav>

      <h1 className="mt-4 text-[32px] font-medium leading-[36px] tracking-[1px] text-ink sm:text-[44px] sm:leading-[46px] sm:tracking-normal">
        {copy.h1}
      </h1>
      <p className="mt-4 text-[18px] leading-[27px] text-body">{copy.intro}</p>

      {reviewed.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {[
            [copy.statFirmsWithReviews, reviewed.length],
            [copy.statTotalReviews, totalReviews.toLocaleString()],
            [
              copy.statHighestRated,
              reviewed[0]?.summary
                ? `${reviewed[0].firm.name} · ${reviewed[0].summary.average.toFixed(1)}★`
                : "—",
            ],
          ].map(([label, value]) => (
            <div key={label as string} className="rounded-md bg-canvas-soft p-4">
              <p className="text-[13px] leading-[19px] text-body-mid">{label}</p>
              <p className="mt-1 text-[20px] font-semibold leading-[26px] text-ink">{value}</p>
            </div>
          ))}
        </div>
      )}

      <section className="mt-14" aria-labelledby="all-firms">
        <h2 id="all-firms" className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
          {copy.allFirmsHeading}
        </h2>
        <ul className="mt-6 flex flex-col gap-3">
          {rows.map(({ firm, summary }) => (
            <li
              key={firm.id}
              className="flex flex-col gap-3 rounded-md border border-ink/10 bg-canvas-soft p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                {firm.logoUrl ? (
                  <Image
                    src={firm.logoUrl}
                    alt={`${firm.name} logo`}
                    width={40}
                    height={40}
                    loading="lazy"
                    className="h-10 w-10 shrink-0 rounded-md object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-canvas text-[16px] font-semibold text-ink">
                    {firm.name.slice(0, 1).toUpperCase()}
                  </div>
                )}
                <div>
                  <Link
                    href={`/firm/${firm.slug}/reviews`}
                    className="text-[17px] font-semibold leading-[23px] text-ink hover:text-primary"
                  >
                    {firm.name}
                  </Link>
                  <p className="mt-0.5 text-[13px] leading-[19px] text-body-mid">
                    {copy.onLeaderboard.replace("{rank}", String(firm.rank))}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:justify-end">
                {summary && summary.count > 0 ? (
                  <span className="flex items-center gap-2">
                    <Stars value={summary.average} size={15} />
                    <span className="text-[15px] font-semibold text-ink">
                      {summary.average.toFixed(1)}
                    </span>
                    <span className="text-[13px] text-body-mid">({summary.count})</span>
                  </span>
                ) : (
                  <span className="text-[14px] text-body-mid">{copy.noReviewsYet}</span>
                )}
                <Link
                  href={`/firm/${firm.slug}/reviews`}
                  className="whitespace-nowrap text-[14px] font-semibold text-body-mid hover:text-primary"
                >
                  {summary && summary.count > 0 ? copy.readLink : copy.reviewLink}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16" aria-labelledby="by-asset">
        <h2 id="by-asset" className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
          {copy.byAssetHeading}
        </h2>
        <p className="mt-3 text-[16px] leading-[24px] text-body">{copy.byAssetIntro}</p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[15px] leading-[22px]">
          <Link href={`${prefix}/forex-prop-firms`} className="font-semibold text-ink hover:text-primary">
            {copy.byAssetForex}
          </Link>
          <Link href={`${prefix}/futures-prop-firms`} className="font-semibold text-ink hover:text-primary">
            {copy.byAssetFutures}
          </Link>
          <Link href={`${prefix}/crypto-prop-firms`} className="font-semibold text-ink hover:text-primary">
            {copy.byAssetCrypto}
          </Link>
          <Link href={`${prefix}/prop-firms`} className="font-semibold text-ink hover:text-primary">
            {copy.byAssetCountry}
          </Link>
        </div>
      </section>

      <section className="mt-16 border-t border-ink/10 pt-12" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
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
    </div>
  );
}
