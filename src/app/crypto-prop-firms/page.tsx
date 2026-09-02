import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Stars } from "@/components/Stars";
import { getActiveLeaderboard } from "@/lib/ranking";
import { getReviewSummaries } from "@/lib/reviews";
import { jsonLdScript } from "@/lib/jsonLd";

export const revalidate = 60;

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://tradermarket.online";

const TITLE = "Crypto Prop Firms — How Funded Crypto Trading Programs Work";
const DESCRIPTION =
  "A trader's guide to crypto prop firms: 24/7 markets, perpetual vs. spot evaluations, drawdown and leverage rules, why payout track records are shorter, the regulatory gap, and how to vet a crypto-native funded program.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "crypto prop firms",
    "best crypto prop firms",
    "funded crypto account",
    "crypto funded trading program",
    "crypto prop firm evaluation",
    "bitcoin prop firm",
    "crypto perpetuals prop firm",
  ],
  alternates: { canonical: "/crypto-prop-firms" },
  openGraph: { type: "article", title: TITLE, description: DESCRIPTION, url: "/crypto-prop-firms" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

const faqs = [
  {
    q: "What is a crypto prop firm?",
    a: "A crypto proprietary trading firm gives a trader an evaluation account to trade digital assets — usually BTC and ETH perpetual futures, sometimes altcoin perps or spot. You pass a profit target under drawdown limits, then trade a funded account for a profit split. The model mirrors forex and futures prop firms; the market it runs on does not.",
  },
  {
    q: "How is crypto prop trading different from forex or futures prop trading?",
    a: "Crypto markets trade 24/7, including weekends, so there is no flat-by-close rule and gap risk is continuous rather than concentrated at the open. Volatility is higher, so drawdown limits are hit faster. The barrier to entry is lower because there is no exchange market-data fee like CME futures. And the environment is less regulated than either forex or futures, so trader recourse when something goes wrong is weaker.",
  },
  {
    q: "Do crypto prop firms use trailing or static drawdown?",
    a: "Both exist. Crypto-native firms often use a static or end-of-day trailing drawdown similar to forex, but because 24/7 volatility can produce large intraday swings, the practical risk of an intraday-trailing model is higher here than in slower markets. Confirm whether the drawdown is measured on equity or balance and how liquidation on the underlying venue interacts with the firm's own breach rules.",
  },
  {
    q: "Are crypto prop firm payouts reliable?",
    a: "Treat this as the open question. The crypto prop segment is newer, so most firms have a shorter payout track record than decade-old forex firms. Some are excellent; the segment as a whole has less history to judge. Weigh verifiable payout proof, how long the firm has operated, and independent reviews more heavily than the headline profit split.",
  },
  {
    q: "What leverage do crypto prop firms offer?",
    a: "Commonly 1:2 to 1:10 on the funded account, lower than forex, because the underlying assets are far more volatile. Some firms offer higher leverage on majors only. Leverage affects margin and liquidation on the venue, not the firm's drawdown ceiling.",
  },
  {
    q: "How do I vet a crypto prop firm before buying an evaluation?",
    a: "Check payout proof and firm age first, since the segment is young. Read the drawdown and liquidation rules together. Confirm which venue and instruments you are actually trading (perps vs. spot, which exchange's price feed). Read independent reviews from crypto traders specifically, and remember a firm's leaderboard rank reflects paid visibility, not payout reliability.",
  },
];

export default async function CryptoPropFirmsPage() {
  const [leaderboard, summaries] = await Promise.all([
    getActiveLeaderboard(),
    getReviewSummaries(),
  ]);
  const firms = leaderboard.slice(0, 12);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITLE,
    description: DESCRIPTION,
    mainEntityOfPage: `${BASE}/crypto-prop-firms`,
    publisher: { "@id": `${BASE}/#organization` },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Leaderboard", item: BASE },
      { "@type": "ListItem", position: 2, name: "Crypto Prop Firms", item: `${BASE}/crypto-prop-firms` },
    ],
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }} />
      <Nav />
      <main className="flex-1 bg-canvas px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[820px]">
          <p className="text-[14px] font-medium uppercase leading-[14px] tracking-[1px] text-primary">
            Trader guide · Crypto
          </p>
          <h1 className="mt-3 text-[32px] font-medium leading-[36px] tracking-[1px] text-ink sm:text-[46px] sm:leading-[48px] sm:tracking-normal">
            Crypto prop firms, and what a 24/7 market changes
          </h1>
          <p className="mt-4 text-[18px] leading-[27px] text-body">
            Crypto funded programs use the same evaluation-then-payout structure as forex and
            futures firms, but the market underneath is always open, more volatile, and less
            regulated. That changes the drawdown math, removes the flat-by-close rule, and puts
            more weight on a firm&apos;s payout track record — which in this segment is usually
            shorter. Here is how to read a crypto prop firm.
          </p>

          <section className="mt-14">
            <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
              How a crypto funded evaluation works
            </h2>
            <p className="mt-3 text-[16px] leading-[24px] text-body">
              You pay a one-time fee, trade a demo account tracking a real crypto venue&apos;s
              prices — typically BTC and ETH perpetual futures — and reach a profit target
              without breaching the drawdown. Pass, move to a funded account, keep a 70–90%
              split, and request payouts on a cycle. One-step and instant-funding models are
              common because the segment competes on speed of access.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
              What the 24/7 market changes
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {[
                "No flat-by-close rule: positions can run through nights and weekends, so gap risk is continuous instead of concentrated at a session open.",
                "Higher volatility: drawdown limits are reached faster, and an intraday-trailing drawdown is riskier here than in forex or futures.",
                "Lower entry cost: no CME-style market-data fee, so evaluation prices and total cost of ownership tend to be lower.",
                "Weaker regulation: the venue and the firm sit outside the regulated FCM chain futures traders rely on, so recourse in a dispute is limited.",
                "Lower leverage: commonly 1:2–1:10 on majors, reflecting the volatility of the underlying.",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-[16px] leading-[24px] text-body">
                  <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
              Payout track record matters more here
            </h2>
            <p className="mt-3 text-[16px] leading-[24px] text-body">
              The crypto prop segment is young. A decade-old forex firm has thousands of public
              payouts to judge; many crypto-native firms have been funding traders for months,
              not years. That does not make them bad — several are well run — but it means you
              have less history to lean on. Weight verifiable payout proof, firm age, and
              independent crypto-trader reviews above the advertised profit split, and be
              cautious with any firm whose marketing is louder than its payout evidence.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
              Due diligence before you fund a crypto account
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {[
                "Payout proof and firm age — the two signals that carry the most weight in a new segment.",
                "Drawdown + liquidation rules read together: what happens if the underlying venue liquidates before the firm's breach line.",
                "Instruments and venue: perpetuals or spot, and whose price feed the evaluation tracks.",
                "Payout terms: consistency rules, minimum days, KYC, and withdrawal method.",
                "Independent reviews from crypto traders — forex or futures feedback does not transfer.",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-[16px] leading-[24px] text-body">
                  <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[16px] leading-[24px] text-body">
              The{" "}
              <Link href="/funded-trading-programs" className="font-semibold text-ink hover:text-primary">
                funded trading programs guide
              </Link>{" "}
              covers the general &quot;does this firm pay after pass&quot; checklist.
            </p>
          </section>

          {firms.length > 0 && (
            <section className="mt-12">
              <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
                Prop firms listed on TraderMarket
              </h2>
              <p className="mt-3 text-[16px] leading-[24px] text-body">
                Many multi-asset firms below offer crypto pairs alongside forex. Open a
                firm&apos;s review page to see whether traders mention its crypto conditions,
                then verify payout history yourself.
              </p>
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
                            ({s.count} review{s.count === 1 ? "" : "s"})
                          </Link>
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
              <Link
                href="/prop-firm-reviews"
                className="mt-4 inline-block text-[14px] font-semibold text-body-mid hover:text-primary"
              >
                See all prop firm reviews →
              </Link>
            </section>
          )}

          <section className="mt-16 border-t border-ink/10 pt-12">
            <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
              Crypto prop firms — FAQ
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

          <nav aria-label="Related" className="mt-14 border-t border-ink/10 pt-6">
            <p className="text-[13px] font-medium uppercase leading-[13px] tracking-[1px] text-body-mid">
              Related guides
            </p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[15px] leading-[22px]">
              <Link href="/forex-prop-firms" className="text-ink hover:text-primary">
                Forex prop firms
              </Link>
              <Link href="/futures-prop-firms" className="text-ink hover:text-primary">
                Futures prop firms
              </Link>
              <Link href="/best-prop-trading-firms" className="text-ink hover:text-primary">
                Best prop trading firms
              </Link>
              <Link href="/prop-firm-reviews" className="text-ink hover:text-primary">
                Prop firm reviews
              </Link>
            </div>
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}
