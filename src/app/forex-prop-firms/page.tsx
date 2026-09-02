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

const TITLE = "Forex Prop Firms — How Funded Forex Trading Programs Work";
const DESCRIPTION =
  "A trader's guide to forex prop firms: how funded forex evaluations work, static vs. trailing drawdown, leverage and news-trading rules, MT4/MT5/cTrader platforms, and how to check a firm actually pays out.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "forex prop firms",
    "best forex prop firms",
    "funded forex account",
    "forex funded trading program",
    "forex prop firm evaluation",
    "forex prop firm no news restriction",
    "MT5 prop firm",
  ],
  alternates: { canonical: "/forex-prop-firms" },
  openGraph: { type: "article", title: TITLE, description: DESCRIPTION, url: "/forex-prop-firms" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

const faqs = [
  {
    q: "What is a forex prop firm?",
    a: "A forex proprietary trading firm gives a trader access to firm capital to trade currency pairs, in exchange for a share of the profits. The trader pays a one-time evaluation fee, proves they can hit a profit target while respecting drawdown limits — usually across one or two phases — and then trades a funded account with a 70–90% profit split.",
  },
  {
    q: "What drawdown model do forex prop firms use?",
    a: "Most forex firms use a static (fixed) maximum drawdown measured from the starting balance, plus a separate daily loss limit. This is more forgiving than the trailing/intraday drawdown common at futures firms, because the loss line does not follow your equity up as you make profit. Always read whether the daily limit is calculated on balance or equity, and whether it resets at a fixed server time.",
  },
  {
    q: "How much leverage do forex prop firms offer?",
    a: "Forex funded accounts typically offer 1:30 to 1:100 leverage, with some firms going to 1:50 as an add-on. Higher leverage does not change the drawdown rules, so it mainly affects margin, not how much you can lose before breaching.",
  },
  {
    q: "Can I trade the news at a forex prop firm?",
    a: "It varies. Some firms fully allow news trading on the funded account, some block opening or closing positions within a few minutes of high-impact releases, and some only restrict it during the evaluation. If you trade NFP, CPI, or central-bank events, treat the news policy as a make-or-break rule and confirm it in writing before you buy.",
  },
  {
    q: "Which platforms do forex prop firms use?",
    a: "MetaTrader 4, MetaTrader 5, cTrader, and Match-Trader are the most common. Platform choice affects execution style, available order types, and whether you can run expert advisors — check the firm's automation and copy-trading policy if that matters to you.",
  },
  {
    q: "How do I know a forex prop firm actually pays?",
    a: "Look for verifiable payout proof rather than firm-controlled testimonials, check how long the firm has been funding traders, read the payout terms for inactivity, consistency, or KYC conditions that can delay a withdrawal, and read independent trader reviews. A firm's rank on any leaderboard, including TraderMarket, reflects what it paid for visibility — not a payout guarantee.",
  },
];

export default async function ForexPropFirmsPage() {
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
    mainEntityOfPage: `${BASE}/forex-prop-firms`,
    publisher: { "@id": `${BASE}/#organization` },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Leaderboard", item: BASE },
      { "@type": "ListItem", position: 2, name: "Forex Prop Firms", item: `${BASE}/forex-prop-firms` },
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
            Trader guide · Forex
          </p>
          <h1 className="mt-3 text-[32px] font-medium leading-[36px] tracking-[1px] text-ink sm:text-[46px] sm:leading-[48px] sm:tracking-normal">
            Forex prop firms, and how funded forex trading actually works
          </h1>
          <p className="mt-4 text-[18px] leading-[27px] text-body">
            Forex is the largest slice of the prop firm market, and its rules have their own
            shape: static drawdown, generous leverage, 24/5 sessions, and news-trading policies
            that decide more evaluations than the profit target does. Here is what separates
            forex funded programs from futures and crypto — and how to vet one before you pay.
          </p>

          <section className="mt-14">
            <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
              How a forex funded evaluation works
            </h2>
            <p className="mt-3 text-[16px] leading-[24px] text-body">
              You pay a one-time fee for an evaluation account, trade a demo funded with the
              firm&apos;s notional capital, and try to reach a profit target — commonly 8–10% in
              phase one and 4–5% in phase two — without breaching a daily loss limit or a
              maximum drawdown. Pass, and you move to a funded account where a 70–90% profit
              split applies and payouts are requestable on a fixed cycle, usually every 1–4
              weeks. One-step, two-step, and instant-funding variants all exist; the trade-off
              is fee, target size, and how strict the drawdown is.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
              Static drawdown: the forex-specific rule to understand
            </h2>
            <p className="mt-3 text-[16px] leading-[24px] text-body">
              Forex firms almost universally use a <strong>static maximum drawdown</strong>{" "}
              measured from your starting balance, alongside a daily loss limit. Unlike the
              trailing drawdown at most futures firms, the loss line does not ratchet up as you
              bank profit — once you are a few percent in front, a normal losing day is far less
              likely to end the account. The details that still catch traders out: whether the
              daily limit is measured on closed balance or floating equity, what server time it
              resets at, and whether the max drawdown is absolute or also trails until you reach
              a set profit.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
              Leverage, sessions, and news trading
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {[
                "Leverage is typically 1:30–1:100, sometimes 1:50 as a paid add-on. It changes your margin, not your drawdown headroom.",
                "The market runs 24/5. Positions can usually be held overnight and over the weekend, unlike most futures programs — check swap/financing charges.",
                "News-trading policy is the highest-variance rule: fully allowed, blocked around high-impact releases, or evaluation-only. If you trade NFP or CPI, confirm it in writing.",
                "Weekend holding is allowed at most forex firms but may carry a gap-risk clause. Crypto exposure, if offered, may trade through the weekend.",
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
              Due diligence before you fund a forex account
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {[
                "Payout proof: verifiable records, not just testimonials the firm controls.",
                "Track record: years actually funding traders, not months running ads.",
                "Payout terms: inactivity clauses, consistency rules, minimum trading days, KYC steps that can stall a withdrawal.",
                "Platform and automation policy: MT4/MT5/cTrader/Match-Trader, and whether EAs or copy trading are allowed.",
                "Independent reviews: what traders say outside the firm's own marketing and Trustpilot page.",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-[16px] leading-[24px] text-body">
                  <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[16px] leading-[24px] text-body">
              Read the{" "}
              <Link href="/funded-trading-programs" className="font-semibold text-ink hover:text-primary">
                funded trading programs guide
              </Link>{" "}
              for the full &quot;does this firm pay after pass&quot; checklist.
            </p>
          </section>

          {firms.length > 0 && (
            <section className="mt-12">
              <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
                Prop firms listed on TraderMarket
              </h2>
              <p className="mt-3 text-[16px] leading-[24px] text-body">
                Most multi-asset firms below offer forex pairs. Open a firm&apos;s review page to
                see what traders say about its forex conditions specifically, then verify payout
                history yourself.
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
              Forex prop firms — FAQ
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
              <Link href="/futures-prop-firms" className="text-ink hover:text-primary">
                Futures prop firms
              </Link>
              <Link href="/crypto-prop-firms" className="text-ink hover:text-primary">
                Crypto prop firms
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
