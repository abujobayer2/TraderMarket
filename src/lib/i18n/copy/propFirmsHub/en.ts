import type { PropFirmsHubCopy } from "@/components/content/PropFirmsHubContent";

export const en: PropFirmsHubCopy = {
  kicker: "Trader guides",
  h1: "Prop firms by country",
  intro:
    "Prop trading firms themselves are global. What actually changes by where you're trading from is regulation, when the busiest market hours land on your clock, and how you move money to fund an evaluation or take a payout. Pick your country below.",
  regionLabels: {
    "North America": "North America",
    "UK & Europe": "UK & Europe",
    "Asia-Pacific": "Asia-Pacific",
    "Middle East & Africa": "Middle East & Africa",
  },
  faqHeading: "FAQ",
  faqs: [
    {
      q: "Does TraderMarket track which firms accept which countries?",
      a: "No. Prop firms don't publish structured country-eligibility data, and TraderMarket won't guess. Each country guide covers what genuinely differs by location — regulation, session timing, funding and payout logistics — and always points you back to the firm's own site to confirm eligibility before you pay.",
    },
    {
      q: "Why isn't there a page for my country yet?",
      a: "This list covers the countries with the largest retail prop-trading search volume first. It's a static, data-driven list, so adding a country is straightforward — if yours is missing, the underlying content (regulation, timezone, payment notes) just hasn't been written yet.",
    },
  ],
  relatedHeading: "Related guides",
  relatedForex: "Forex prop firms",
  relatedFutures: "Futures prop firms",
  relatedCrypto: "Crypto prop firms",
  relatedReviews: "Prop firm reviews",
};
