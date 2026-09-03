import type { CountryPageCopy } from "@/components/content/CountryPageContent";

export const en: CountryPageCopy = {
  backLinkText: "← Prop firms by country",
  kickerTemplate: "Trader guide · {country}",
  h1Template: "Prop trading firms for traders in {country}",
  metaDescriptionTemplate:
    "A trader's guide to prop firm challenges from {country}: how {regulator} treat retail forex/CFD trading, session timing, funding and payout considerations, plus the live TraderMarket leaderboard.",
  defaultRegulatorLabel: "local regulators",
  introTemplate:
    "Prop firms themselves are global — TraderMarket doesn't track which firms restrict which countries. What genuinely differs by where you're trading from is the regulatory backdrop, when the busiest trading hours land on your clock, and how you move money to fund an evaluation or receive a payout. Here's what matters for a trader based in {country}.",
  currencyLabel: "Currency:",
  timezoneLabel: "Timezone:",
  regulatorLabel: "Regulator:",
  regulationHeading: "Regulation: what actually applies to a prop firm challenge",
  sessionHeadingTemplate: "Session timing from {country}",
  paymentHeading: "Funding evaluations and receiving payouts",
  assetClassHeading: "Which asset class fits",
  assetClassFuturesTemplate:
    "Given the regulatory picture above, most {country}-based traders end up looking at {link} rather than CFD-style multi-asset challenges.",
  assetClassMultiTemplate:
    "Traders in {country} generally have access to the full range of prop firm types. See {forex}, {futures}, and {crypto} prop firms for how each asset class's rules differ before picking one.",
  assetClassForexLabel: "forex prop firms",
  assetClassFuturesLabel: "futures prop firms",
  assetClassCryptoLabel: "crypto",
  assetClassMultiLabel: "every prop firm reviewed on TraderMarket",
  firmsHeading: "Prop firms listed on TraderMarket",
  firmsIntro:
    "The same live leaderboard traders everywhere see — verify country eligibility and payout terms directly on each firm's own site.",
  allReviewsLinkText: "See all prop firm reviews →",
  faqHeading: "FAQ",
  sharedFaqs: [
    {
      q: "Do prop firms restrict which countries can sign up?",
      a: "Some do, usually for regulatory reasons rather than trading-related ones — the clearest example is the US, where most CFD-style multi-asset firms exclude US residents and futures-only firms fill that gap instead. TraderMarket doesn't track per-firm country eligibility, so always confirm directly on the firm's own site before paying an evaluation fee.",
    },
    {
      q: "Does my country's regulation apply to a prop firm challenge?",
      a: "Usually not directly. A prop firm evaluation is typically a demo-funded simulation run on the firm's own platform, not a live account at a locally regulated broker — so retail-leverage caps and broker licensing rules that protect you when trading with a regulated broker generally don't apply to the challenge itself. That's exactly why independent research (payout proof, reviews, company registration) matters more here than for a regulated brokerage account.",
    },
    {
      q: "Will I owe tax on prop firm payouts?",
      a: "In almost every country, yes — trading profit is generally taxable income or a capital gain, regardless of which country the firm is based in. How it's classified (business income, capital gains, or something else) varies a lot by country and even by how you trade, so this page's tax notes are a starting point, not a substitute for a local accountant.",
    },
    {
      q: "Why does timezone matter for choosing a prop firm?",
      a: "Evaluation rules like daily loss limits reset on a fixed server time, and the busiest, most volatile trading window is the London/New York overlap. Where that overlap falls in your local clock — a normal morning, or the middle of the night — affects which hours you can realistically trade the account without disrupting your sleep schedule.",
    },
  ],
  alsoInTemplate: "Also in {region}",
  allCountriesLinkText: "All countries →",
  regionLabels: {
    "North America": "North America",
    "UK & Europe": "UK & Europe",
    "Asia-Pacific": "Asia-Pacific",
    "Middle East & Africa": "Middle East & Africa",
  },
};
