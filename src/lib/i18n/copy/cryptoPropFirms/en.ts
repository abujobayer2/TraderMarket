import type { CryptoPropFirmsCopy } from "@/components/content/CryptoPropFirmsContent";

export const en: CryptoPropFirmsCopy = {
  kicker: "Trader guide · Crypto",
  h1: "Crypto prop firms, and what a 24/7 market changes",
  intro:
    "Crypto funded programs use the same evaluation-then-payout structure as forex and futures firms, but the market underneath is always open, more volatile, and less regulated. That changes the drawdown math, removes the flat-by-close rule, and puts more weight on a firm's payout track record — which in this segment is usually shorter. Here is how to read a crypto prop firm.",
  howItWorksHeading: "How a crypto funded evaluation works",
  howItWorksBody:
    "You pay a one-time fee, trade a demo account tracking a real crypto venue's prices — typically BTC and ETH perpetual futures — and reach a profit target without breaching the drawdown. Pass, move to a funded account, keep a 70–90% split, and request payouts on a cycle. One-step and instant-funding models are common because the segment competes on speed of access.",
  changesHeading: "What the 24/7 market changes",
  changesItems: [
    "No flat-by-close rule: positions can run through nights and weekends, so gap risk is continuous instead of concentrated at a session open.",
    "Higher volatility: drawdown limits are reached faster, and an intraday-trailing drawdown is riskier here than in forex or futures.",
    "Lower entry cost: no CME-style market-data fee, so evaluation prices and total cost of ownership tend to be lower.",
    "Weaker regulation: the venue and the firm sit outside the regulated FCM chain futures traders rely on, so recourse in a dispute is limited.",
    "Lower leverage: commonly 1:2–1:10 on majors, reflecting the volatility of the underlying.",
  ],
  trackRecordHeading: "Payout track record matters more here",
  trackRecordBody:
    "The crypto prop segment is young. A decade-old forex firm has thousands of public payouts to judge; many crypto-native firms have been funding traders for months, not years. That does not make them bad — several are well run — but it means you have less history to lean on. Weight verifiable payout proof, firm age, and independent crypto-trader reviews above the advertised profit split, and be cautious with any firm whose marketing is louder than its payout evidence.",
  dueDiligenceHeading: "Due diligence before you fund a crypto account",
  dueDiligenceItems: [
    "Payout proof and firm age — the two signals that carry the most weight in a new segment.",
    "Drawdown + liquidation rules read together: what happens if the underlying venue liquidates before the firm's breach line.",
    "Instruments and venue: perpetuals or spot, and whose price feed the evaluation tracks.",
    "Payout terms: consistency rules, minimum days, KYC, and withdrawal method.",
    "Independent reviews from crypto traders — forex or futures feedback does not transfer.",
  ],
  dueDiligencePrefix: "The",
  dueDiligenceLinkText: "funded trading programs guide",
  dueDiligenceSuffix: 'covers the general "does this firm pay after pass" checklist.',
  firmsHeading: "Prop firms listed on TraderMarket",
  firmsIntro:
    "Many multi-asset firms below offer crypto pairs alongside forex. Open a firm's review page to see whether traders mention its crypto conditions, then verify payout history yourself.",
  allReviewsLinkText: "See all prop firm reviews →",
  faqHeading: "Crypto prop firms — FAQ",
  faqs: [
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
  ],
  relatedHeading: "Related guides",
  relatedForex: "Forex prop firms",
  relatedFutures: "Futures prop firms",
  relatedBest: "Best prop trading firms",
  relatedReviews: "Prop firm reviews",
  relatedCountry: "Prop firms by country",
};
