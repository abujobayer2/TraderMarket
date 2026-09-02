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

const TITLE = "Futures Prop Firms — How Funded Futures Trading Programs Work";
const DESCRIPTION =
  "A trader's guide to futures prop firms: trailing drawdown, daily loss limits, no-overnight rules, CME data fees, Rithmic/Tradovate/NinjaTrader platforms, payout consistency rules, and how to vet a firm before you buy.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "futures prop firms",
    "best futures prop firms",
    "funded futures account",
    "futures funded trading program",
    "futures prop firm trailing drawdown",
    "Tradovate prop firm",
    "Rithmic prop firm",
  ],
  alternates: { canonical: "/futures-prop-firms" },
  openGraph: { type: "article", title: TITLE, description: DESCRIPTION, url: "/futures-prop-firms" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

const faqs = [
  {
    q: "What is a futures prop firm?",
    a: "A futures proprietary trading firm gives a trader an evaluation account to trade CME, CBOT, NYMEX, or COMEX futures — ES, NQ, GC, CL, and micros. Pass the evaluation by reaching a profit target without hitting the trailing drawdown or daily loss limit, then trade a funded account and request payouts under the firm's payout rules.",
  },
  {
    q: "How does trailing drawdown work at a futures prop firm?",
    a: "The maximum loss line follows your account's peak — often the peak of unrealized (intraday) equity, sometimes end-of-day balance. As your account rises, the drawdown trails up behind it, then locks once you pass the starting balance plus a set buffer. This is stricter than the static drawdown at most forex firms: an open position that spikes in profit and comes back can move you closer to breach even if you close green.",
  },
  {
    q: "Can I hold futures positions overnight?",
    a: "Usually no on the evaluation and early funded stage. Most futures firms require all positions flat before the session close (and before major maintenance windows), with some allowing overnight holds only after you reach a payout milestone or upgrade to a 'pro'/live account. Holding through the close on a no-overnight account is typically an instant rule violation.",
  },
  {
    q: "Do I have to pay for market data with a futures prop firm?",
    a: "Often yes. Live CME data for a non-professional trader carries an exchange fee (roughly $10–$15 per exchange bundle per month) that most firms pass through on funded accounts. Evaluation accounts sometimes include delayed or firm-sponsored data. Budget for data and any monthly platform/reset fees, not just the evaluation price.",
  },
  {
    q: "What platforms do futures prop firms use?",
    a: "Rithmic and Tradovate are the two main order-routing backends, surfaced through NinjaTrader, Tradovate's own web platform, TradingView, Quantower, or R|Trader. Your fills and P&L route through a regulated futures commission merchant, which is one reason futures firm rules tend to be more standardized than forex.",
  },
  {
    q: "What is a consistency rule and why does it matter for payouts?",
    a: "A consistency rule caps how much of your total profit any single day can represent — commonly 20–40%. It is designed to stop a trader passing on one lucky day. It usually applies to payout eligibility rather than the evaluation itself, so you can pass and still be blocked from withdrawing until your profit is spread across more days. Read the exact percentage and whether it is measured on the evaluation, the funded account, or both.",
  },
];

export default async function FuturesPropFirmsPage() {
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
    mainEntityOfPage: `${BASE}/futures-prop-firms`,
    publisher: { "@id": `${BASE}/#organization` },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Leaderboard", item: BASE },
      { "@type": "ListItem", position: 2, name: "Futures Prop Firms", item: `${BASE}/futures-prop-firms` },
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
            Trader guide · Futures
          </p>
          <h1 className="mt-3 text-[32px] font-medium leading-[36px] tracking-[1px] text-ink sm:text-[46px] sm:leading-[48px] sm:tracking-normal">
            Futures prop firms, and the rules that actually decide your account
          </h1>
          <p className="mt-4 text-[18px] leading-[27px] text-body">
            Futures funded programs look simple next to forex — standardized targets, familiar
            contracts — but the drawdown and payout mechanics are stricter. Trailing drawdown,
            flat-by-close rules, data fees, and consistency requirements are where evaluations
            and payouts are won or lost. Here is how the futures segment differs, and how to
            vet a firm.
          </p>

          <section className="mt-14">
            <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
              How a futures funded evaluation works
            </h2>
            <p className="mt-3 text-[16px] leading-[24px] text-body">
              You buy an evaluation account sized in buying power (50K, 100K, 150K are common),
              trade CME-group futures, and reach a profit target while staying above a trailing
              maximum drawdown and under a daily loss limit. Many firms run a single-phase
              evaluation with no minimum profit-per-day requirement to pass, but attach a
              consistency rule to payouts. Once funded, you keep 90–100% of the first slice of
              profit at some firms, then a 90/10 split, with payouts on a set schedule.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
              Trailing drawdown: the rule that ends most accounts
            </h2>
            <p className="mt-3 text-[16px] leading-[24px] text-body">
              The maximum loss threshold <strong>trails your account&apos;s peak</strong>. At
              most firms it follows intraday unrealized equity, so a trade that goes +$800 and
              you close at +$300 still dragged the drawdown line up by $800. It stops trailing
              once your balance clears the initial balance plus a fixed buffer, after which it
              is effectively static. Contrast this with forex, where a static drawdown from the
              starting balance never moves. If you scale in and out of runners, model the
              trailing math against your worst intraday excursions before you buy.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
              Flat-by-close, data fees, and platforms
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {[
                "Most firms require every position closed before the session close and before daily maintenance. No-overnight is the default; overnight holds are often a reward for reaching a payout milestone.",
                "Live CME data carries a non-professional exchange fee most firms pass through on funded accounts. Add monthly platform or reset fees to your true cost.",
                "Order routing is Rithmic or Tradovate, shown through NinjaTrader, Tradovate web, TradingView, or Quantower. Fills route through a regulated FCM.",
                "Rules are more standardized than forex because the regulated chain leaves firms less room to improvise — but consistency and scaling rules still vary a lot.",
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
              Due diligence before you fund a futures account
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {[
                "Payout proof and payout frequency: verifiable records, and how often you can actually withdraw.",
                "Trailing drawdown type: intraday vs. end-of-day, and where it locks.",
                "Consistency rule: the exact percentage, and whether it gates payouts, the evaluation, or both.",
                "All-in cost: evaluation fee + monthly data + platform/reset fees + activation fee on the funded account.",
                "Independent reviews from futures traders specifically — forex feedback does not transfer.",
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
              covers the general &quot;pay after pass&quot; checks that apply to every firm.
            </p>
          </section>

          {firms.length > 0 && (
            <section className="mt-12">
              <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
                Prop firms listed on TraderMarket
              </h2>
              <p className="mt-3 text-[16px] leading-[24px] text-body">
                Open a firm&apos;s review page to see whether traders discuss its futures rules
                — trailing drawdown behaviour, overnight policy, data fees — then verify payout
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
              Futures prop firms — FAQ
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
