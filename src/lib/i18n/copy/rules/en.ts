import type { RulesCopy } from "@/components/content/RulesContent";

export const en: RulesCopy = {
  kicker: "Rules",
  h1: "How TraderMarket works",
  intro:
    "TraderMarket is a public leaderboard. You pay to stand above everyone else. Rank is the bid — nothing else.",
  sections: [
    {
      title: "How ranking works",
      items: [
        "Rank is the bid — nothing else. There are no ads, no sponsorships, and no editorial placement. Whoever pays the most for a position holds it.",
        "New listings start at a $10 minimum, in whole US dollars, $1 at a time. Bids already on the board keep their amount until they're raised or outranked.",
        "Taking #1 costs at least $1 more than the current top bid. Paying less still puts you on the board at whatever rank that bid can take.",
        "Equal bids keep the order they were placed in — the older bid keeps the higher rank.",
        "Enter the same website again to raise that listing to any rank. The new bid must be at least $1 above your current bid, and you only pay the difference.",
      ],
    },
    {
      title: "What you can list",
      items: [
        "A proprietary trading firm offering funded accounts or evaluation challenges to traders.",
        "One listing per firm. Duplicate listings for the same website will be merged or removed.",
        "Your website must be live and describe the funding programs you offer.",
      ],
    },
    {
      title: "What's not allowed",
      items: [
        "Firms without a real, operating trading business behind them.",
        "Link shorteners or tracking/affiliate query parameters — they're stripped from listing links automatically.",
        "Misleading names, logos, or descriptions impersonating another firm.",
      ],
    },
    {
      title: "Payments",
      items: [
        "Every bid is a one-time payment processed via cryptocurrency — there are no subscriptions or recurring charges.",
        "A completed payment is what claims the rank. If payment isn't confirmed, no listing or rank change occurs.",
        "Being outbid later doesn't refund or re-charge anything. Your original payment stands; only your rank changes.",
      ],
    },
    {
      title: "Moderation",
      items: [
        "TraderMarket can remove listings that are fraudulent, dead, duplicated, or in violation of these rules.",
        "When a listing is removed, every firm below it moves up automatically.",
        "Rank reflects the bid, not an endorsement. TraderMarket does not vouch for the trustworthiness of any listed firm.",
      ],
    },
  ],
};
