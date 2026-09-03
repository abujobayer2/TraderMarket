import Link from "next/link";
import Image from "next/image";
import type { LeaderboardEntry } from "@/lib/ranking";
import type { FirmRatingBrief } from "@/lib/reviews";

export interface BestPropTradingFirmsCopy {
  // "{date}" is replaced with the formatted last-updated date.
  updatedOnTemplate: string;
  h1: string;
  intro: string;
  statFirmsTracked: string;
  statPaidRankChanges: string;
  statTotalMarketBids: string;
  statTopCurrentBid: string;
  howHeading: string;
  howBody1: string;
  howBody2: string;
  rankingsHeading: string;
  emptyStateText: string;
  emptyStateLinkText: string;
  paidToRank: string;
  // "{name}" only.
  reviewLinkNoReviewsTemplate: string;
  // "{name}", "{average}", "{count}".
  reviewLinkWithReviewsTemplate: string;
  faqHeading: string;
  faqs: { q: string; a: string; readGuideLinkText?: string }[];
  ctaText: string;
  ctaButton: string;
}

export function BestPropTradingFirmsContent({
  copy,
  prefix,
  leaderboard,
  stats,
  reviewSummaries,
  updatedAt,
}: {
  copy: BestPropTradingFirmsCopy;
  prefix: string;
  leaderboard: LeaderboardEntry[];
  stats: { activeFirms: number; paidBids: number; totalRevenue: number };
  reviewSummaries: Map<string, FirmRatingBrief>;
  updatedAt: string;
}) {
  return (
    <div className="mx-auto max-w-[820px]">
      <p className="text-[14px] font-medium uppercase leading-[14px] tracking-[1px] text-primary">
        {copy.updatedOnTemplate.replace("{date}", updatedAt)}
      </p>
      <h1 className="mt-3 text-[32px] font-medium leading-[36px] tracking-[1px] text-ink sm:text-[48px] sm:leading-[48px] sm:tracking-normal">
        {copy.h1}
      </h1>
      <p className="mt-4 text-[18px] leading-[27px] text-body">{copy.intro}</p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          [copy.statFirmsTracked, stats.activeFirms],
          [copy.statPaidRankChanges, stats.paidBids],
          [copy.statTotalMarketBids, `$${stats.totalRevenue.toLocaleString()}`],
          [
            copy.statTopCurrentBid,
            leaderboard[0] ? `$${leaderboard[0].bidAmount.toLocaleString()}` : "—",
          ],
        ].map(([label, value]) => (
          <div key={label as string} className="rounded-md bg-canvas-soft p-4">
            <p className="text-[13px] leading-[19px] text-body-mid">{label}</p>
            <p className="mt-1 text-[24px] font-semibold leading-[30px] text-ink">{value}</p>
          </div>
        ))}
      </div>

      <section className="mt-16">
        <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
          {copy.howHeading}
        </h2>
        <p className="mt-3 text-[16px] leading-[24px] text-body">{copy.howBody1}</p>
        <p className="mt-3 text-[16px] leading-[24px] text-body">{copy.howBody2}</p>
      </section>

      <section id="rankings" className="mt-16">
        <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
          {copy.rankingsHeading}
        </h2>
        {leaderboard.length === 0 ? (
          <p className="mt-4 text-[16px] leading-[24px] text-body">
            {copy.emptyStateText}{" "}
            <Link href="/list" className="font-semibold text-ink hover:text-primary">
              {copy.emptyStateLinkText}
            </Link>
          </p>
        ) : (
          <ol className="mt-6 flex flex-col gap-4">
            {leaderboard.map((firm) => (
              <li key={firm.id} className="rounded-md bg-canvas-soft p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="text-[20px] font-semibold leading-[25px] text-primary">
                      #{firm.rank}
                    </span>
                    {firm.logoUrl ? (
                      <Image
                        src={firm.logoUrl}
                        alt={`${firm.name} logo`}
                        width={40}
                        height={40}
                        loading={firm.rank <= 3 ? "eager" : "lazy"}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                    ) : null}
                    <div>
                      <Link
                        href={`/firm/${firm.slug}`}
                        className="text-[18px] font-semibold leading-[23px] text-ink hover:text-primary"
                      >
                        {firm.name}
                      </Link>
                      {firm.description && (
                        <p className="mt-1 max-w-[520px] text-[15px] leading-[22px] text-body">
                          {firm.description}
                        </p>
                      )}
                      {(() => {
                        const s = reviewSummaries.get(firm.slug);
                        return (
                          <Link
                            href={`/firm/${firm.slug}/reviews`}
                            className="mt-2 inline-block text-[14px] leading-[20px] text-body-mid hover:text-primary"
                          >
                            {s && s.count > 0
                              ? copy.reviewLinkWithReviewsTemplate
                                  .replace("{name}", firm.name)
                                  .replace("{average}", s.average.toFixed(1))
                                  .replace("{count}", String(s.count))
                              : copy.reviewLinkNoReviewsTemplate.replace("{name}", firm.name)}
                          </Link>
                        );
                      })()}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[13px] leading-[19px] text-body-mid">{copy.paidToRank}</p>
                    <p className="text-[20px] font-semibold leading-[25px] text-ink">
                      ${firm.bidAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>

      <section className="mt-16 border-t border-ink/10 pt-12">
        <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
          {copy.faqHeading}
        </h2>
        <div className="mt-6 flex flex-col gap-6">
          {copy.faqs.map((item) => (
            <div key={item.q}>
              <p className="text-[16px] font-semibold leading-[24px] text-ink">{item.q}</p>
              <p className="mt-1 text-[16px] leading-[24px] text-body">
                {item.a}
                {item.readGuideLinkText && (
                  <>
                    {" "}
                    <Link
                      href={`${prefix}/funded-trading-programs`}
                      className="font-semibold text-ink hover:text-primary"
                    >
                      {item.readGuideLinkText}
                    </Link>
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-md bg-ink p-8 text-center">
        <p className="text-[20px] font-medium leading-[27px] text-canvas">{copy.ctaText}</p>
        <Link
          href="/list"
          className="mt-5 inline-block rounded-md bg-primary px-6 py-3 text-[18px] font-semibold leading-[27px] text-on-primary hover:bg-primary-hover"
        >
          {copy.ctaButton}
        </Link>
      </section>
    </div>
  );
}
