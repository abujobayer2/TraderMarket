import Link from "next/link";
import { LeaderboardTable } from "@/components/LeaderboardTable";
import { HeroBidWidget, type HeroBidWidgetCopy } from "@/components/HeroBidWidget";
import { renderTemplate } from "@/lib/i18n/renderTemplate";
import type { LeaderboardEntry, PublicStats } from "@/lib/ranking";
import type { FirmRatingBrief } from "@/lib/reviews";

export interface HomeCopy {
  // "{count}" is replaced with the live active-firm count.
  liveBadgeFirmsTemplate: string;
  liveBadgeBids: string;
  liveBadgeSeeBoard: string;
  h1: string;
  // "{leaderboard}", "{reviews}", "{forex}", "{futures}", "{crypto}" become
  // inline links — place them wherever this language's word order puts them.
  introTemplate: string;
  introLeaderboardLink: string;
  introReviewsLink: string;
  introForexLink: string;
  introFuturesLink: string;
  introCryptoLink: string;
  liveRankingsKicker: string;
  leaderboardHeading: string;
  howItWorksKicker: string;
  howItWorksHeading: string;
  steps: { n: string; title: string; body: string }[];
  onePayment: string;
  ctaHeading: string;
  ctaBody: string;
  ctaButton: string;
  heroBidWidget: HeroBidWidgetCopy;
}

export function HomeContent({
  copy,
  prefix,
  leaderboard,
  stats,
  reviewSummaries,
  minimumForFirst,
  newSpotMinimum,
}: {
  copy: HomeCopy;
  prefix: string;
  leaderboard: LeaderboardEntry[];
  stats: PublicStats;
  reviewSummaries: Map<string, FirmRatingBrief>;
  minimumForFirst: number;
  newSpotMinimum: number;
}) {
  return (
    <main className="flex-1">
      <section className="bg-canvas px-6 pb-10 pt-10 sm:pt-14">
        <div className="mx-auto flex max-w-[720px] flex-col items-center text-center">
          <div className="flex items-center gap-2 rounded-pill bg-canvas-soft px-4 py-2 text-[14px] leading-[21px] text-body">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="font-semibold text-ink">
              {copy.liveBadgeFirmsTemplate.replace("{count}", String(stats.activeFirms))}
            </span>
            <span className="text-mute">·</span>
            <span>
              ${stats.totalRevenue.toLocaleString()} {copy.liveBadgeBids}
            </span>
            <span className="text-mute">·</span>
            <Link href={`${prefix}/#leaderboard`} className="font-semibold text-ink hover:text-primary">
              {copy.liveBadgeSeeBoard}
            </Link>
          </div>

          <h1 className="mt-4 text-[22px] font-semibold leading-[28px] tracking-[-0.4px] text-ink sm:text-[30px] sm:leading-[36px]">
            {copy.h1}
          </h1>

          <p className="mt-3 text-[15px] leading-[23px] text-body sm:text-[16px]">
            {renderTemplate(copy.introTemplate, {
              leaderboard: (
                <Link href={`${prefix}/#leaderboard`} className="font-semibold text-ink hover:text-primary">
                  {copy.introLeaderboardLink}
                </Link>
              ),
              reviews: (
                <Link href={`${prefix}/prop-firm-reviews`} className="font-semibold text-ink hover:text-primary">
                  {copy.introReviewsLink}
                </Link>
              ),
              forex: (
                <Link href={`${prefix}/forex-prop-firms`} className="font-semibold text-ink hover:text-primary">
                  {copy.introForexLink}
                </Link>
              ),
              futures: (
                <Link href={`${prefix}/futures-prop-firms`} className="font-semibold text-ink hover:text-primary">
                  {copy.introFuturesLink}
                </Link>
              ),
              crypto: (
                <Link href={`${prefix}/crypto-prop-firms`} className="font-semibold text-ink hover:text-primary">
                  {copy.introCryptoLink}
                </Link>
              ),
            })}
          </p>

          <div className="mt-8 w-full">
            <HeroBidWidget
              minimumBid={minimumForFirst}
              newSpotMinimum={newSpotMinimum}
              hasFirms={leaderboard.length > 0}
              copy={copy.heroBidWidget}
            />
          </div>
        </div>
      </section>

      <section id="leaderboard" className="bg-canvas-soft px-6 pb-16 pt-8 sm:pb-24">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-[14px] font-medium uppercase leading-[14px] tracking-[1px] text-primary">
            {copy.liveRankingsKicker}
          </p>
          <h2 className="mt-2 text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink sm:text-[32px] sm:leading-[36px]">
            {copy.leaderboardHeading}
          </h2>
          <div className="mt-6">
            <LeaderboardTable entries={leaderboard} summaries={reviewSummaries} />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-canvas px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-[14px] font-medium uppercase leading-[14px] tracking-[1px] text-primary">
            {copy.howItWorksKicker}
          </p>
          <h2 className="mt-3 text-[32px] font-medium leading-[36px] tracking-[1px] text-ink sm:text-[48px] sm:leading-[48px] sm:tracking-normal">
            {copy.howItWorksHeading}
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {copy.steps.map((step) => (
              <div key={step.n} className="rounded-md bg-canvas-soft p-6">
                <span className="text-[14px] font-medium uppercase leading-[14px] tracking-[1px] text-body-mid">
                  {step.n}
                </span>
                <h3 className="mt-3 text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-[16px] leading-[24px] text-body">{step.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-[18px] font-semibold leading-[27px] text-ink">{copy.onePayment}</p>
        </div>
      </section>

      <section className="bg-ink px-6 py-16 sm:py-24">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-[32px] font-medium leading-[36px] tracking-[1px] text-canvas sm:text-[48px] sm:leading-[48px] sm:tracking-normal">
              {copy.ctaHeading}
            </h2>
            <p className="mt-3 max-w-xl text-[18px] leading-[27px] text-canvas-soft/80">{copy.ctaBody}</p>
          </div>
          <Link
            href="/list"
            className="whitespace-nowrap rounded-md bg-primary px-6 py-3 text-[18px] font-semibold leading-[27px] text-on-primary hover:bg-primary-hover"
          >
            {copy.ctaButton}
          </Link>
        </div>
      </section>
    </main>
  );
}
