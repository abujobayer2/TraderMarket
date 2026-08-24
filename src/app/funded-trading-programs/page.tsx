import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getActiveLeaderboard } from "@/lib/ranking";
import { jsonLdScript } from "@/lib/jsonLd";

export const revalidate = 60;

const TITLE = "Funded Trading Programs Explained: How Prop Firm Payouts Work";
const DESCRIPTION =
  "What a funded trading program actually is, how prop firm evaluations lead to a funded account, and how to tell whether a firm really pays traders after they pass.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "funded trading programs",
    "prop firm pay after pass",
    "prop firm payout",
    "funded trading account",
    "prop firm evaluation",
    "does prop firm pay after passing challenge",
    "best funded trading programs",
  ],
  alternates: { canonical: "/funded-trading-programs" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/funded-trading-programs" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

const faqs = [
  {
    q: "What does 'pay after pass' mean for a prop firm?",
    a: "It refers to whether a firm actually sends real payouts once a trader clears the evaluation and starts trading a funded account — as opposed to firms that pass traders on paper but stall, dispute, or refuse payout requests. It's the single question most traders care about most, and it's separate from how good a firm's evaluation rules look on the sales page.",
  },
  {
    q: "How do funded trading programs work, step by step?",
    a: "Most programs follow the same shape: pay a one-time evaluation fee, trade a demo account under profit targets and drawdown limits (often one or two phases), then move to a funded (simulated or live-capital) account once you pass. From there, profits are split between trader and firm, and traders request payouts on a set cycle — commonly every 1 to 4 weeks depending on the firm.",
  },
  {
    q: "Why do some funded programs fail to pay after a trader passes?",
    a: "It usually comes down to business model risk. A firm that sells far more evaluations than it can actually fund, or that relies on failed-challenge fees rather than real trading profit, can run into cash flow problems when too many traders pass and request payouts at once. That's why payout history and firm longevity matter more than the headline profit split.",
  },
  {
    q: "How can I check if a prop firm reliably pays out?",
    a: "Look for verifiable payout proof (not just testimonials), check how long the firm has been operating and funding traders, read its payout terms for hidden conditions (inactivity rules, consistency rules, KYC delays), and see whether independent traders — not just the firm's own marketing — confirm timely payouts. A firm's rank or listing price on any leaderboard, including this one, is not a substitute for that check.",
  },
  {
    q: "What's the difference between an evaluation account and a funded account?",
    a: "An evaluation (or 'challenge') account is a demo account used to prove you can hit profit targets while respecting drawdown limits — no real payouts happen here. A funded account is what you're given after passing; profits from a funded account are what actually gets paid out, split between you and the firm.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
  mainEntityOfPage: "https://tradermarket.online/funded-trading-programs",
  publisher: { "@id": "https://tradermarket.online/#organization" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Leaderboard", item: "https://tradermarket.online" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Funded Trading Programs",
      item: "https://tradermarket.online/funded-trading-programs",
    },
  ],
};

export default async function FundedTradingProgramsPage() {
  const leaderboard = await getActiveLeaderboard();
  const topFirms = leaderboard.slice(0, 5);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(articleJsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }}
      />
      <Nav />
      <main className="flex-1 bg-canvas px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[820px]">
          <p className="text-[14px] font-medium uppercase leading-[14px] tracking-[1px] text-primary">
            Trader guide
          </p>
          <h1 className="mt-3 text-[32px] font-medium leading-[36px] tracking-[1px] text-ink sm:text-[48px] sm:leading-[48px] sm:tracking-normal">
            Funded trading programs, and what &quot;pay after pass&quot; really means
          </h1>
          <p className="mt-4 text-[18px] leading-[27px] text-body">
            Every prop firm promises funded accounts and fast payouts. The question that
            actually matters is simpler: does this firm pay real money after a trader
            passes? Here&apos;s how funded programs work, and how to check.
          </p>

          <section className="mt-14">
            <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
              What is a funded trading program?
            </h2>
            <p className="mt-3 text-[16px] leading-[24px] text-body">
              A funded trading program (also called a prop firm challenge or evaluation) lets
              a trader manage the firm&apos;s capital instead of their own, in exchange for a
              share of the profits. Traders pay a one-time evaluation fee, trade a demo account
              against profit targets and drawdown rules — usually across one or two phases — and
              move to a funded account once they pass. From that point, real payouts are supposed
              to start flowing.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
              &quot;Pay after pass&quot;: the question behind the question
            </h2>
            <p className="mt-3 text-[16px] leading-[24px] text-body">
              Searching for firms that &quot;pay after pass&quot; usually means one thing:
              traders have been burned before by firms that make passing easy but paying out
              hard — slow-walking withdrawal requests, adding surprise consistency rules, or
              disputing profitable trades after the fact. A funded program is only as good as
              its worst payout story, no matter how generous the evaluation terms look on the
              landing page.
            </p>
            <p className="mt-3 text-[16px] leading-[24px] text-body">
              Profit splits and payout cycles typically get published up front (commonly a
              70–90% trader split, with payouts requestable every 1–4 weeks), but the terms and
              conditions attached to those payouts — inactivity clauses, KYC delays, minimum
              trading day requirements — are where firms diverge most. Read those before you
              pay for an evaluation, not after you pass one.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
              A due-diligence checklist before you fund your account
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {[
                "Payout proof: does the firm show verifiable payout records, or only testimonials it controls?",
                "Track record: how long has the firm actually been funding traders, not just running ads?",
                "Payout terms: are there inactivity rules, consistency rules, or KYC steps that can delay or block a withdrawal?",
                "Independent reviews: what do traders say outside the firm's own marketing and Trustpilot page?",
                "Business model: is the firm funded by real trading profit-share, or mostly by evaluation fees from traders who never pass?",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-[16px] leading-[24px] text-body">
                  <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[16px] leading-[24px] text-body">
              A firm&apos;s position on any leaderboard — including{" "}
              <Link href="/best-prop-trading-firms" className="font-semibold text-ink hover:text-primary">
                this one
              </Link>{" "}
              — reflects what it paid for visibility, not a payout guarantee. Treat rank as a
              starting point for research, not the research itself.
            </p>
          </section>

          {topFirms.length > 0 && (
            <section className="mt-12">
              <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
                Currently listed funded trading programs
              </h2>
              <p className="mt-3 text-[16px] leading-[24px] text-body">
                Firms currently ranked on the TraderMarket leaderboard. Do your own payout
                verification for each before applying.
              </p>
              <ul className="mt-4 flex flex-col gap-2">
                {topFirms.map((firm) => (
                  <li key={firm.id}>
                    <Link
                      href={`/firm/${firm.slug}`}
                      className="text-[16px] font-semibold leading-[24px] text-ink hover:text-primary"
                    >
                      #{firm.rank} {firm.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/best-prop-trading-firms"
                className="mt-4 inline-block text-[14px] font-semibold text-body-mid hover:text-primary"
              >
                See the full ranking →
              </Link>
            </section>
          )}

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
              Run a funded trading program? List it and let traders find you.
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
