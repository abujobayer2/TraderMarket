import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Rules",
  description:
    "How ranking, bidding, and listings work on TraderMarket — the public prop firm leaderboard.",
  alternates: { canonical: "/rules" },
};

const sections = [
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
];

export default function RulesPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-canvas px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[720px]">
          <p className="text-[14px] font-medium uppercase leading-[14px] tracking-[1px] text-primary">
            Rules
          </p>
          <h1 className="mt-3 text-[32px] font-medium leading-[36px] tracking-[1px] text-ink sm:text-[48px] sm:leading-[48px] sm:tracking-normal">
            How TraderMarket works
          </h1>
          <p className="mt-4 text-[18px] leading-[27px] text-body">
            TraderMarket is a public leaderboard. You pay to stand above everyone else.
            Rank is the bid — nothing else.
          </p>

          <div className="mt-12 flex flex-col gap-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
                  {section.title}
                </h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3 text-[16px] leading-[24px] text-body">
                      <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
