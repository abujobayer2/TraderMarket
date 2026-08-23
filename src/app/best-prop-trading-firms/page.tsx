import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getActiveLeaderboard, getPublicStats } from "@/lib/ranking";
import { jsonLdScript } from "@/lib/jsonLd";

export const revalidate = 15;

const TITLE = "Best Prop Trading Firms — Live Rankings";
const DESCRIPTION =
  "The best prop trading firms, ranked by real money firms have paid to hold their spot — not by editorial opinion or affiliate commission. Live data, updated continuously.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/best-prop-trading-firms" },
  openGraph: { title: `${TITLE} — TraderMarket`, description: DESCRIPTION, url: "/best-prop-trading-firms" },
  twitter: { title: `${TITLE} — TraderMarket`, description: DESCRIPTION },
};

const faqs = [
  {
    q: "How are these prop trading firms ranked?",
    a: "By bid amount. Each firm pays to hold a position, and any firm can take a higher rank by paying more than whoever currently holds it. There's no editorial scoring, no affiliate commission tiers, and no manual curation of the order.",
  },
  {
    q: "Does a higher bid mean a firm is more trustworthy?",
    a: "No. Bid amount reflects how much a firm is willing to pay for visibility, not a trust or quality signal. Do your own due diligence — check trader reviews, payout history, and terms — before choosing a firm.",
  },
  {
    q: "How is this different from other 'best prop firm' lists?",
    a: "Most ranked lists online are ordered by undisclosed affiliate payouts, meaning the firm paying the list owner the most per referral often appears first, with no way to verify it. Here, the price of every rank is public, the full bid history is permanent, and any firm can outbid the one above it at any time.",
  },
  {
    q: "How often does this page update?",
    a: "The ranking data refreshes at most every 15 seconds and reflects the live TraderMarket leaderboard — not a static snapshot re-published periodically.",
  },
];

const itemListJsonLd = (leaderboard: Awaited<ReturnType<typeof getActiveLeaderboard>>) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: TITLE,
  description: DESCRIPTION,
  itemListOrder: "https://schema.org/ItemListOrderDescending",
  numberOfItems: leaderboard.length,
  itemListElement: leaderboard.map((entry) => ({
    "@type": "ListItem",
    position: entry.rank,
    url: `https://tradermarket.online/firm/${entry.slug}`,
    name: entry.name,
  })),
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default async function BestPropTradingFirmsPage() {
  const [leaderboard, stats] = await Promise.all([getActiveLeaderboard(), getPublicStats()]);
  const updatedAt = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {leaderboard.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(itemListJsonLd(leaderboard)) }}
        />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }} />
      <Nav />
      <main className="flex-1 bg-canvas px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[820px]">
          <p className="text-[14px] font-medium uppercase leading-[14px] tracking-[1px] text-primary">
            Updated {updatedAt}
          </p>
          <h1 className="mt-3 text-[32px] font-medium leading-[36px] tracking-[1px] text-ink sm:text-[48px] sm:leading-[48px] sm:tracking-normal">
            Best prop trading firms, ranked by real money
          </h1>
          <p className="mt-4 text-[18px] leading-[27px] text-body">
            Most &quot;best prop firm&quot; lists are ordered by undisclosed affiliate payouts.
            This one is ordered by a number anyone can verify: what each firm has actually
            paid, in public, to hold its spot.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ["Firms tracked", stats.activeFirms],
              ["Paid rank changes", stats.paidBids],
              ["Total market bids", `$${stats.totalRevenue.toLocaleString()}`],
              ["Top current bid", leaderboard[0] ? `$${leaderboard[0].bidAmount.toLocaleString()}` : "—"],
            ].map(([label, value]) => (
              <div key={label as string} className="rounded-md bg-canvas-soft p-4">
                <p className="text-[13px] leading-[19px] text-body-mid">{label}</p>
                <p className="mt-1 text-[24px] font-semibold leading-[30px] text-ink">{value}</p>
              </div>
            ))}
          </div>

          <section className="mt-16">
            <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
              How this ranking works
            </h2>
            <p className="mt-3 text-[16px] leading-[24px] text-body">
              Every position on this list has a price. A firm claims a rank by paying more
              than whoever currently holds it — a one-time payment, not a subscription or an
              ad placement. There's no manual curation of the order and no way to pay for a
              rank without it becoming public, permanent bid history.
            </p>
            <p className="mt-3 text-[16px] leading-[24px] text-body">
              That means bid amount reflects how much a firm values visibility here — not an
              endorsement of quality, reliability, or trustworthiness. Treat this list as one
              input, and pair it with independent trader reviews and payout track records
              before you choose a firm.
            </p>
          </section>

          <section id="rankings" className="mt-16">
            <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
              Current rankings
            </h2>
            {leaderboard.length === 0 ? (
              <p className="mt-4 text-[16px] leading-[24px] text-body">
                No firms are ranked yet. <Link href="/list" className="font-semibold text-ink hover:text-primary">Be the first to list one.</Link>
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
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={firm.logoUrl} alt={`${firm.name} logo`} className="h-10 w-10 rounded-md object-cover" />
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
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[13px] leading-[19px] text-body-mid">Paid to rank</p>
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
            <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">FAQ</h2>
            <div className="mt-6 flex flex-col gap-6">
              {faqs.map((item) => (
                <div key={item.q}>
                  <p className="text-[16px] font-semibold leading-[24px] text-ink">{item.q}</p>
                  <p className="mt-1 text-[16px] leading-[24px] text-body">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16 rounded-md bg-ink p-8 text-center">
            <p className="text-[20px] font-medium leading-[27px] text-canvas">
              Run a prop firm? Your rank here is one payment away.
            </p>
            <Link
              href="/list"
              className="mt-5 inline-block rounded-md bg-primary px-6 py-3 text-[18px] font-semibold leading-[27px] text-on-primary hover:bg-primary-hover"
            >
              List your firm
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
