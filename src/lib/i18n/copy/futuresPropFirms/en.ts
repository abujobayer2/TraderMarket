import type { FuturesPropFirmsCopy } from "@/components/content/FuturesPropFirmsContent";

export const en: FuturesPropFirmsCopy = {
  kicker: "Trader guide · Futures",
  h1: "Futures prop firms, and the rules that actually decide your account",
  intro:
    "Futures funded programs look simple next to forex — standardized targets, familiar contracts — but the drawdown and payout mechanics are stricter. Trailing drawdown, flat-by-close rules, data fees, and consistency requirements are where evaluations and payouts are won or lost. Here is how the futures segment differs, and how to vet a firm.",
  howItWorksHeading: "How a futures funded evaluation works",
  howItWorksBody:
    "You buy an evaluation account sized in buying power (50K, 100K, 150K are common), trade CME-group futures, and reach a profit target while staying above a trailing maximum drawdown and under a daily loss limit. Many firms run a single-phase evaluation with no minimum profit-per-day requirement to pass, but attach a consistency rule to payouts. Once funded, you keep 90–100% of the first slice of profit at some firms, then a 90/10 split, with payouts on a set schedule.",
  drawdownHeading: "Trailing drawdown: the rule that ends most accounts",
  drawdownBody:
    "The maximum loss threshold trails your account's peak. At most firms it follows intraday unrealized equity, so a trade that goes +$800 and you close at +$300 still dragged the drawdown line up by $800. It stops trailing once your balance clears the initial balance plus a fixed buffer, after which it is effectively static. Contrast this with forex, where a static drawdown from the starting balance never moves. If you scale in and out of runners, model the trailing math against your worst intraday excursions before you buy.",
  flatByCloseHeading: "Flat-by-close, data fees, and platforms",
  flatByCloseItems: [
    "Most firms require every position closed before the session close and before daily maintenance. No-overnight is the default; overnight holds are often a reward for reaching a payout milestone.",
    "Live CME data carries a non-professional exchange fee most firms pass through on funded accounts. Add monthly platform or reset fees to your true cost.",
    "Order routing is Rithmic or Tradovate, shown through NinjaTrader, Tradovate web, TradingView, or Quantower. Fills route through a regulated FCM.",
    "Rules are more standardized than forex because the regulated chain leaves firms less room to improvise — but consistency and scaling rules still vary a lot.",
  ],
  dueDiligenceHeading: "Due diligence before you fund a futures account",
  dueDiligenceItems: [
    "Payout proof and payout frequency: verifiable records, and how often you can actually withdraw.",
    "Trailing drawdown type: intraday vs. end-of-day, and where it locks.",
    "Consistency rule: the exact percentage, and whether it gates payouts, the evaluation, or both.",
    "All-in cost: evaluation fee + monthly data + platform/reset fees + activation fee on the funded account.",
    "Independent reviews from futures traders specifically — forex feedback does not transfer.",
  ],
  dueDiligencePrefix: "The",
  dueDiligenceLinkText: "funded trading programs guide",
  dueDiligenceSuffix: 'covers the general "pay after pass" checks that apply to every firm.',
  firmsHeading: "Prop firms listed on TraderMarket",
  firmsIntro:
    "Open a firm's review page to see whether traders discuss its futures rules — trailing drawdown behaviour, overnight policy, data fees — then verify payout history yourself.",
  allReviewsLinkText: "See all prop firm reviews →",
  faqHeading: "Futures prop firms — FAQ",
  faqs: [
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
  ],
  relatedHeading: "Related guides",
  relatedForex: "Forex prop firms",
  relatedCrypto: "Crypto prop firms",
  relatedBest: "Best prop trading firms",
  relatedReviews: "Prop firm reviews",
  relatedCountry: "Prop firms by country",
};
