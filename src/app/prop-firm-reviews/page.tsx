import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Stars } from "@/components/Stars";
import { getActiveLeaderboard } from "@/lib/ranking";
import { getReviewSummaries } from "@/lib/reviews";
import { jsonLdScript } from "@/lib/jsonLd";

export const revalidate = 60;

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://tradermarket.online";

const TITLE = "Prop Firm Reviews — Trader Ratings, Payout Feedback & Scores";
const DESCRIPTION =
  "Read trader-submitted reviews of proprietary trading firms. Compare star ratings, payout feedback, and challenge experiences across every prop firm listed on TraderMarket — forex, futures, and crypto.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "prop firm reviews",
    "prop trading firm reviews",
    "funded trading firm reviews",
    "prop firm ratings",
    "prop firm payout reviews",
    "is prop firm legit",
    "best rated prop firms",
  ],
  alternates: { canonical: "/prop-firm-reviews" },
  openGraph: { type: "website", title: `${TITLE} — TraderMarket`, description: DESCRIPTION, url: "/prop-firm-reviews" },
  twitter: { title: `${TITLE} — TraderMarket`, description: DESCRIPTION },
};

const faqs = [
  {
    q: "How are prop firms reviewed on TraderMarket?",
    a: "Every review is a 1–5 star rating left by a site visitor who traded with that firm. Reviews cover the evaluation challenge, payout speed, drawdown and consistency rules, trading platforms, and support. The firm's headline score is the mean of all published reviews and updates automatically as new ones come in.",
  },
  {
    q: "Are these reviews independent of the leaderboard ranking?",
    a: "Yes. A firm's leaderboard position on TraderMarket is a paid, public bid and says nothing about quality. Review scores are separate — they reflect individual trader experience only. Always pair a rating with the firm's payout proof, track record, and terms before buying a challenge.",
  },
  {
    q: "Which prop firm has the best reviews?",
    a: "The table on this page is sortable by rating. Rankings shift as new reviews are submitted, so check the live scores rather than relying on a static 'best of' list. A high average across a large number of reviews is a stronger signal than a perfect score from only a handful.",
  },
  {
    q: "Can I leave a review for a prop firm?",
    a: "Yes. Open any firm's review page from the list below and use the form at the bottom. Reviews are public, permanent, and publish immediately. Share first-hand experience only — no referral links.",
  },
  {
    q: "Do prop firm reviews help with forex, futures, and crypto traders alike?",
    a: "They do. Firms serve different asset classes with different rules — forex firms lean on static drawdown and news restrictions, futures firms use trailing drawdown and block overnight holds, crypto-native firms trade 24/7. Reviews from traders in your asset class are the most useful, so filter by what each reviewer traded.",
  },
];

export default async function PropFirmReviewsHubPage() {
  const [leaderboard, summaries] = await Promise.all([
    getActiveLeaderboard(),
    getReviewSummaries(),
  ]);

  // Firms with reviews first (by average, then volume), then the rest by rank.
  const rows = leaderboard
    .map((firm) => ({ firm, summary: summaries.get(firm.slug) }))
    .sort((a, b) => {
      const ar = a.summary?.count ? a.summary.average : -1;
      const br = b.summary?.count ? b.summary.average : -1;
      if (br !== ar) return br - ar;
      const ac = a.summary?.count ?? 0;
      const bc = b.summary?.count ?? 0;
      if (bc !== ac) return bc - ac;
      return a.firm.rank - b.firm.rank;
    });

  const reviewed = rows.filter((r) => r.summary && r.summary.count > 0);
  const totalReviews = reviewed.reduce((s, r) => s + (r.summary?.count ?? 0), 0);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: TITLE,
    description: DESCRIPTION,
    numberOfItems: rows.length,
    itemListElement: rows.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE}/firm/${r.firm.slug}/reviews`,
      name: `${r.firm.name} reviews`,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Leaderboard", item: BASE },
      { "@type": "ListItem", position: 2, name: "Prop Firm Reviews", item: `${BASE}/prop-firm-reviews` },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }} />
      <Nav />
      <main className="flex-1 bg-canvas px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[900px]">
          <nav aria-label="Breadcrumb" className="text-[14px] leading-[21px] text-body-mid">
            <Link href="/" className="hover:text-ink">
              Leaderboard
            </Link>
            <span className="mx-2 text-mute">/</span>
            <span className="text-body">Prop firm reviews</span>
          </nav>

          <h1 className="mt-4 text-[32px] font-medium leading-[36px] tracking-[1px] text-ink sm:text-[44px] sm:leading-[46px] sm:tracking-normal">
            Prop firm reviews from real traders
          </h1>
          <p className="mt-4 text-[18px] leading-[27px] text-body">
            First-hand trader reviews of every proprietary trading firm on the TraderMarket
            leaderboard — covering the evaluation challenge, payout speed, drawdown and
            consistency rules, platforms, and support. Ratings are independent of a firm&apos;s
            paid leaderboard rank.
          </p>

          {reviewed.length > 0 && (
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[
                ["Firms with reviews", reviewed.length],
                ["Total trader reviews", totalReviews.toLocaleString()],
                [
                  "Highest rated",
                  reviewed[0]?.summary
                    ? `${reviewed[0].firm.name} · ${reviewed[0].summary.average.toFixed(1)}★`
                    : "—",
                ],
              ].map(([label, value]) => (
                <div key={label as string} className="rounded-md bg-canvas-soft p-4">
                  <p className="text-[13px] leading-[19px] text-body-mid">{label}</p>
                  <p className="mt-1 text-[20px] font-semibold leading-[26px] text-ink">{value}</p>
                </div>
              ))}
            </div>
          )}

          <section className="mt-14" aria-labelledby="all-firms">
            <h2 id="all-firms" className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
              Every listed prop firm, by trader rating
            </h2>
            <ul className="mt-6 flex flex-col gap-3">
              {rows.map(({ firm, summary }) => (
                <li
                  key={firm.id}
                  className="flex flex-col gap-3 rounded-md border border-ink/10 bg-canvas-soft p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    {firm.logoUrl ? (
                      <Image
                        src={firm.logoUrl}
                        alt={`${firm.name} logo`}
                        width={40}
                        height={40}
                        loading="lazy"
                        className="h-10 w-10 shrink-0 rounded-md object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-canvas text-[16px] font-semibold text-ink">
                        {firm.name.slice(0, 1).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <Link
                        href={`/firm/${firm.slug}/reviews`}
                        className="text-[17px] font-semibold leading-[23px] text-ink hover:text-primary"
                      >
                        {firm.name} reviews
                      </Link>
                      <p className="mt-0.5 text-[13px] leading-[19px] text-body-mid">
                        #{firm.rank} on the leaderboard
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:justify-end">
                    {summary && summary.count > 0 ? (
                      <span className="flex items-center gap-2">
                        <Stars value={summary.average} size={15} />
                        <span className="text-[15px] font-semibold text-ink">
                          {summary.average.toFixed(1)}
                        </span>
                        <span className="text-[13px] text-body-mid">
                          ({summary.count} review{summary.count === 1 ? "" : "s"})
                        </span>
                      </span>
                    ) : (
                      <span className="text-[14px] text-body-mid">No reviews yet</span>
                    )}
                    <Link
                      href={`/firm/${firm.slug}/reviews`}
                      className="whitespace-nowrap text-[14px] font-semibold text-body-mid hover:text-primary"
                    >
                      {summary && summary.count > 0 ? "Read →" : "Review →"}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16" aria-labelledby="by-asset">
            <h2 id="by-asset" className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
              Reviews by what you trade
            </h2>
            <p className="mt-3 text-[16px] leading-[24px] text-body">
              Prop firm rules diverge sharply by asset class. Start with the guide for your
              market, then read the reviews for the firms it lists.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[15px] leading-[22px]">
              <Link href="/forex-prop-firms" className="font-semibold text-ink hover:text-primary">
                Forex prop firms →
              </Link>
              <Link href="/futures-prop-firms" className="font-semibold text-ink hover:text-primary">
                Futures prop firms →
              </Link>
              <Link href="/crypto-prop-firms" className="font-semibold text-ink hover:text-primary">
                Crypto prop firms →
              </Link>
            </div>
          </section>

          <section className="mt-16 border-t border-ink/10 pt-12" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
              Prop firm reviews — FAQ
            </h2>
            <div className="mt-6 flex flex-col gap-6">
              {faqs.map((item) => (
                <div key={item.q}>
                  <h3 className="text-[16px] font-semibold leading-[24px] text-ink">{item.q}</h3>
                  <p className="mt-1 text-[16px] leading-[24px] text-body">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <nav aria-label="Related" className="mt-14 border-t border-ink/10 pt-6">
            <p className="text-[13px] font-medium uppercase leading-[13px] tracking-[1px] text-body-mid">
              More on TraderMarket
            </p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[15px] leading-[22px]">
              <Link href="/best-prop-trading-firms" className="text-ink hover:text-primary">
                Best prop trading firms
              </Link>
              <Link href="/funded-trading-programs" className="text-ink hover:text-primary">
                Funded trading programs guide
              </Link>
              <Link href="/#leaderboard" className="text-ink hover:text-primary">
                Full leaderboard
              </Link>
            </div>
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}
