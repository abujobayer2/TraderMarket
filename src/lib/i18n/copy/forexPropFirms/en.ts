import type { ForexPropFirmsCopy } from "@/components/content/ForexPropFirmsContent";

export const en: ForexPropFirmsCopy = {
  kicker: "Trader guide · Forex",
  h1: "Forex prop firms, and how funded forex trading actually works",
  intro:
    "Forex is the largest slice of the prop firm market, and its rules have their own shape: static drawdown, generous leverage, 24/5 sessions, and news-trading policies that decide more evaluations than the profit target does. Here is what separates forex funded programs from futures and crypto — and how to vet one before you pay.",
  howItWorksHeading: "How a forex funded evaluation works",
  howItWorksBody:
    "You pay a one-time fee for an evaluation account, trade a demo funded with the firm's notional capital, and try to reach a profit target — commonly 8–10% in phase one and 4–5% in phase two — without breaching a daily loss limit or a maximum drawdown. Pass, and you move to a funded account where a 70–90% profit split applies and payouts are requestable on a fixed cycle, usually every 1–4 weeks. One-step, two-step, and instant-funding variants all exist; the trade-off is fee, target size, and how strict the drawdown is.",
  drawdownHeading: "Static drawdown: the forex-specific rule to understand",
  drawdownBody:
    "Forex firms almost universally use a static maximum drawdown measured from your starting balance, alongside a daily loss limit. Unlike the trailing drawdown at most futures firms, the loss line does not ratchet up as you bank profit — once you are a few percent in front, a normal losing day is far less likely to end the account. The details that still catch traders out: whether the daily limit is measured on closed balance or floating equity, what server time it resets at, and whether the max drawdown is absolute or also trails until you reach a set profit.",
  sessionsHeading: "Leverage, sessions, and news trading",
  sessionsItems: [
    "Leverage is typically 1:30–1:100, sometimes 1:50 as a paid add-on. It changes your margin, not your drawdown headroom.",
    "The market runs 24/5. Positions can usually be held overnight and over the weekend, unlike most futures programs — check swap/financing charges.",
    "News-trading policy is the highest-variance rule: fully allowed, blocked around high-impact releases, or evaluation-only. If you trade NFP or CPI, confirm it in writing.",
    "Weekend holding is allowed at most forex firms but may carry a gap-risk clause. Crypto exposure, if offered, may trade through the weekend.",
  ],
  dueDiligenceHeading: "Due diligence before you fund a forex account",
  dueDiligenceItems: [
    "Payout proof: verifiable records, not just testimonials the firm controls.",
    "Track record: years actually funding traders, not months running ads.",
    "Payout terms: inactivity clauses, consistency rules, minimum trading days, KYC steps that can delay a withdrawal.",
    "Platform and automation policy: MT4/MT5/cTrader/Match-Trader, and whether EAs or copy trading are allowed.",
    "Independent reviews: what traders say outside the firm's own marketing and Trustpilot page.",
  ],
  dueDiligencePrefix: "Read the",
  dueDiligenceLinkText: "funded trading programs guide",
  dueDiligenceSuffix: 'for the full "does this firm pay after pass" checklist.',
  firmsHeading: "Prop firms listed on TraderMarket",
  firmsIntro:
    "Most multi-asset firms below offer forex pairs. Open a firm's review page to see what traders say about its forex conditions specifically, then verify payout history yourself.",
  allReviewsLinkText: "See all prop firm reviews →",
  faqHeading: "Forex prop firms — FAQ",
  faqs: [
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
  ],
  relatedHeading: "Related guides",
  relatedFutures: "Futures prop firms",
  relatedCrypto: "Crypto prop firms",
  relatedBest: "Best prop trading firms",
  relatedReviews: "Prop firm reviews",
  relatedCountry: "Prop firms by country",
};
