import type { NavCopy } from "@/components/Nav";
import type { FooterCopy } from "@/components/Footer";

export interface ChromeCopy {
  nav: NavCopy;
  footer: FooterCopy;
}

export const en: ChromeCopy = {
  nav: {
    leaderboard: "Leaderboard",
    reviews: "Reviews",
    howItWorks: "How it works",
    guide: "Guide",
    rules: "Rules",
    listYourFirm: "List your firm",
  },
  footer: {
    tagline: "The public leaderboard where prop firms compete for visibility.",
    leaderboard: "Leaderboard",
    rankings: "Rankings",
    reviews: "Reviews",
    guide: "Funded Programs Guide",
    forex: "Forex",
    futures: "Futures",
    crypto: "Crypto",
    byCountry: "By Country",
    listYourFirm: "List your firm",
    rules: "Rules",
    widget: "Widget",
  },
};
