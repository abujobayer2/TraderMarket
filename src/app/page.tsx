import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { LeaderboardTable } from "@/components/LeaderboardTable";
import { HeroBidWidget } from "@/components/HeroBidWidget";
import { getActiveLeaderboard, getPublicStats, minimumBidForPosition } from "@/lib/ranking";
import { getReviewSummaries } from "@/lib/reviews";
import { jsonLdScript } from "@/lib/jsonLd";

export const revalidate = 15;

const DESCRIPTION =
  "TraderMarket is the public prop firm leaderboard. Want a position? Outbid the firm currently holding it — one payment, no subscription. Live rankings updated in real time.";

export const metadata: Metadata = {
  title: "TraderMarket — The Prop Firm Leaderboard",
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: "TraderMarket — The Prop Firm Leaderboard",
    description: DESCRIPTION,
    url: "/",
  },
  twitter: {
    title: "TraderMarket — The Prop Firm Leaderboard",
    description: DESCRIPTION,
  },
};

const steps = [
  {
    n: "01",
    title: "List",
    body: "Submit your prop firm — name, website, logo, and a short description.",
  },
  {
    n: "02",
    title: "Choose your position",
    body: "Pick any rank on the leaderboard. Every position has its own current price.",
  },
  {
    n: "03",
    title: "Outbid & rank",
    body: "Pay more than the firm currently holding that spot. One payment. No subscription.",
  },
];

export default async function HomePage() {
  const [leaderboard, stats, reviewSummaries] = await Promise.all([
    getActiveLeaderboard(),
    getPublicStats(),
    getReviewSummaries(),
  ]);
  const minimumForFirst = minimumBidForPosition(leaderboard, 1);
  const newSpotMinimum = minimumBidForPosition(leaderboard, leaderboard.length + 1);

  const leaderboardJsonLd =
    leaderboard.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "TraderMarket Prop Firm Leaderboard",
          description: DESCRIPTION,
          itemListOrder: "https://schema.org/ItemListOrderDescending",
          numberOfItems: leaderboard.length,
          itemListElement: leaderboard.map((entry) => ({
            "@type": "ListItem",
            position: entry.rank,
            url: `https://tradermarket.online/firm/${entry.slug}`,
            name: entry.name,
          })),
        }
      : null;

  return (
    <>
      {leaderboardJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(leaderboardJsonLd) }}
        />
      )}
      <Nav />
      <main className="flex-1">
        <section className="bg-canvas px-6 pb-10 pt-10 sm:pt-14">
          <div className="mx-auto flex max-w-[720px] flex-col items-center text-center">
            <div className="flex items-center gap-2 rounded-pill bg-canvas-soft px-4 py-2 text-[14px] leading-[21px] text-body">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="font-semibold text-ink">{stats.activeFirms} firms listed</span>
              <span className="text-mute">·</span>
              <span>${stats.totalRevenue.toLocaleString()} in bids</span>
              <span className="text-mute">·</span>
              <Link href="#leaderboard" className="font-semibold text-ink hover:text-primary">
                see board →
              </Link>
            </div>

            <h1 className="mt-4 text-[22px] font-semibold leading-[28px] tracking-[-0.4px] text-ink sm:text-[30px] sm:leading-[36px]">
              The prop firm leaderboard — compare, review, and rank proprietary trading firms
            </h1>

            <p className="mt-3 text-[15px] leading-[23px] text-body sm:text-[16px]">
              TraderMarket ranks prop firms by a public, one-time bid — no affiliate payouts, no
              editorial scoring. Browse the{" "}
              <Link href="#leaderboard" className="font-semibold text-ink hover:text-primary">
                live leaderboard
              </Link>
              , read{" "}
              <Link href="/prop-firm-reviews" className="font-semibold text-ink hover:text-primary">
                trader reviews
              </Link>
              , or compare funded programs for{" "}
              <Link href="/forex-prop-firms" className="font-semibold text-ink hover:text-primary">
                forex
              </Link>
              ,{" "}
              <Link href="/futures-prop-firms" className="font-semibold text-ink hover:text-primary">
                futures
              </Link>
              , and{" "}
              <Link href="/crypto-prop-firms" className="font-semibold text-ink hover:text-primary">
                crypto
              </Link>
              .
            </p>

            <div className="mt-8 w-full">
              <HeroBidWidget
                minimumBid={minimumForFirst}
                newSpotMinimum={newSpotMinimum}
                hasFirms={leaderboard.length > 0}
              />
            </div>
          </div>
        </section>

        <section id="leaderboard" className="bg-canvas-soft px-6 pb-16 pt-8 sm:pb-24">
          <div className="mx-auto max-w-[1280px]">
            <p className="text-[14px] font-medium uppercase leading-[14px] tracking-[1px] text-primary">
              Live rankings
            </p>
            <h2 className="mt-2 text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink sm:text-[32px] sm:leading-[36px]">
              🏆 Prop firm leaderboard
            </h2>
            <div className="mt-6">
              <LeaderboardTable entries={leaderboard} summaries={reviewSummaries} />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="bg-canvas px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-[1280px]">
            <p className="text-[14px] font-medium uppercase leading-[14px] tracking-[1px] text-primary">
              How it works
            </p>
            <h2 className="mt-3 text-[32px] font-medium leading-[36px] tracking-[1px] text-ink sm:text-[48px] sm:leading-[48px] sm:tracking-normal">
              Three steps to your rank
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {steps.map((step) => (
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
            <p className="mt-8 text-[18px] font-semibold leading-[27px] text-ink">
              One payment. No subscription.
            </p>
          </div>
        </section>

        <section className="bg-ink px-6 py-16 sm:py-24">
          <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-[32px] font-medium leading-[36px] tracking-[1px] text-canvas sm:text-[48px] sm:leading-[48px] sm:tracking-normal">
                Ready to claim your rank?
              </h2>
              <p className="mt-3 max-w-xl text-[18px] leading-[27px] text-canvas-soft/80">
                Pick a position, name your bid, and pay once. Your rank stays until
                someone outbids you.
              </p>
            </div>
            <Link
              href="/list"
              className="whitespace-nowrap rounded-md bg-primary px-6 py-3 text-[18px] font-semibold leading-[27px] text-on-primary hover:bg-primary-hover"
            >
              List your prop firm
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
