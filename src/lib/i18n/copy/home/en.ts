import type { HomeCopy } from "@/components/content/HomeContent";

export const en: HomeCopy = {
  liveBadgeFirmsTemplate: "{count} firms listed",
  liveBadgeBids: "in bids",
  liveBadgeSeeBoard: "see board →",
  h1: "The prop firm leaderboard — compare, review, and rank proprietary trading firms",
  introTemplate:
    "TraderMarket ranks prop firms by a public, one-time bid — no affiliate payouts, no editorial scoring. Browse the {leaderboard}, read {reviews}, or compare funded programs for {forex}, {futures}, and {crypto}.",
  introLeaderboardLink: "live leaderboard",
  introReviewsLink: "trader reviews",
  introForexLink: "forex",
  introFuturesLink: "futures",
  introCryptoLink: "crypto",
  liveRankingsKicker: "Live rankings",
  leaderboardHeading: "🏆 Prop firm leaderboard",
  howItWorksKicker: "How it works",
  howItWorksHeading: "Three steps to your rank",
  steps: [
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
  ],
  onePayment: "One payment. No subscription.",
  ctaHeading: "Ready to claim your rank?",
  ctaBody: "Pick a position, name your bid, and pay once. Your rank stays until someone outbids you.",
  ctaButton: "List your prop firm",
  heroBidWidget: {
    claimFirstFor: "Claim #1 for",
    newSpotsStartAt: "New spots start at ${amount}.",
    outbidBelowTop:
      "Paying less than the #1 price still puts you on the board at whatever rank that bid can take.",
    boardEmpty: "The board is empty — be the first firm listed.",
    websitePlaceholder: "Your prop firm website",
    startingCheckout: "Starting checkout…",
    outbidButton: "Outbid — ${amount}",
    alreadyListed: "Already on the board? Enter the same website to raise your bid.",
  },
};
