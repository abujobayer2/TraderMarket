import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Stars } from "@/components/Stars";
import { connectDB } from "@/lib/db";
import { PropFirm } from "@/lib/models/PropFirm";
import { getActiveLeaderboard } from "@/lib/ranking";
import { getFirmReviews, getReviewSummary, type ReviewSummary } from "@/lib/reviews";
import { jsonLdScript } from "@/lib/jsonLd";
import { ReviewForm } from "./ReviewForm";

export const revalidate = 60;

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://tradermarket.online";

async function getFirm(slug: string) {
  await connectDB();
  return PropFirm.findOne({ slug, status: "active" }).lean();
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

/** Single source of truth for the visible FAQ block and the FAQPage schema. */
function buildFaqs(name: string, summary: ReviewSummary, rank?: number) {
  const avg = summary.average.toFixed(1);
  const has = summary.count > 0;
  const rankClause = rank ? `, currently ranked #${rank}` : "";

  return [
    {
      q: `Is ${name} legit?`,
      a: has
        ? `${name} is an active proprietary trading firm listed on the TraderMarket leaderboard${rankClause}. Trader reviews on this page average ${avg} out of 5 across ${summary.count} submissions. A rating is not a guarantee — verify ${name}'s payout proof, terms, and track record before buying a challenge.`
        : `${name} is an active proprietary trading firm listed on the TraderMarket leaderboard${rankClause}. No trader reviews have been submitted yet. Verify ${name}'s payout proof, terms, and track record before buying a challenge.`,
    },
    {
      q: `How is ${name}'s rating calculated?`,
      a: `Each review is a 1–5 star rating left by a site visitor who traded with ${name}. The headline score is the mean of all ${
        has ? `${summary.count} ` : ""
      }published reviews and updates automatically as new ones are submitted.`,
    },
    {
      q: `Can I leave a review for ${name}?`,
      a: `Yes. Use the form on this page to submit a first-hand rating of the ${name} evaluation, payouts, rules, or support. Reviews are public, permanent, and publish immediately.`,
    },
    {
      q: `Does a higher rating mean ${name} is a safer choice?`,
      a: `No. Review scores reflect individual trader experience, not independent due diligence, and TraderMarket leaderboard position is paid rather than earned. Use reviews as one signal alongside payout history and the firm's own terms.`,
    },
    {
      q: `How often are ${name} reviews updated?`,
      a: `Continuously. The page re-checks for new reviews about once a minute, so the rating and the list stay current.`,
    },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const firm = await getFirm(slug);
  if (!firm) return { title: "Firm Not Found" };

  const summary = await getReviewSummary(slug);
  const avg = summary.average.toFixed(1);

  const title =
    summary.count > 0
      ? `${firm.name} Reviews — ${avg}/5 from ${summary.count} Trader${
          summary.count === 1 ? "" : "s"
        }`
      : `${firm.name} Reviews — Ratings & Trader Feedback`;

  const description =
    summary.count > 0
      ? `${firm.name} is rated ${avg}/5 from ${summary.count} trader reviews. Read first-hand feedback on the ${firm.name} challenge, payouts, drawdown rules, and support.`
      : `Read and write trader reviews of ${firm.name} — first-hand feedback on the challenge, payouts, drawdown rules, and support.`;

  return {
    title,
    description,
    keywords: [
      `${firm.name} reviews`,
      `${firm.name} review`,
      `is ${firm.name} legit`,
      `${firm.name} payout`,
      `${firm.name} challenge`,
      `${firm.name} prop firm`,
    ],
    alternates: { canonical: `/firm/${slug}/reviews` },
    openGraph: {
      type: "website",
      title: `${title} — TraderMarket`,
      description,
      url: `/firm/${slug}/reviews`,
    },
    twitter: { title: `${title} — TraderMarket`, description },
  };
}

export default async function FirmReviewsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const firm = await getFirm(slug);
  if (!firm) notFound();

  const [reviews, summary, leaderboard] = await Promise.all([
    getFirmReviews(slug),
    getReviewSummary(slug),
    getActiveLeaderboard(),
  ]);
  const rank = leaderboard.find((e) => e.slug === slug)?.rank;
  const avg = summary.average.toFixed(1);
  const shownCount = reviews.length;
  const truncated = shownCount < summary.count;

  const maxBar = Math.max(1, ...Object.values(summary.distribution));
  const faqs = buildFaqs(firm.name, summary, rank);

  const reviewsUrl = `${BASE}/firm/${slug}/reviews`;
  const orgId = `${BASE}/firm/${slug}#organization`;

  const graphJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: firm.name,
        url: firm.websiteUrl,
        ...(firm.logoUrl ? { logo: firm.logoUrl } : {}),
      },
      ...(summary.count > 0
        ? [
            {
              "@type": "Product",
              "@id": `${reviewsUrl}#product`,
              name: `${firm.name} funded trading challenge`,
              brand: { "@id": orgId },
              ...(firm.description ? { description: firm.description } : {}),
              ...(firm.logoUrl ? { image: firm.logoUrl } : {}),
              url: reviewsUrl,
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: summary.average,
                reviewCount: summary.count,
                bestRating: 5,
                worstRating: 1,
              },
              review: reviews.slice(0, 20).map((r) => ({
                "@type": "Review",
                "@id": `${reviewsUrl}#review-${r.id}`,
                url: `${reviewsUrl}#review-${r.id}`,
                author: { "@type": "Person", name: r.authorName },
                datePublished: r.createdAt.slice(0, 10),
                itemReviewed: { "@id": orgId },
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: r.rating,
                  bestRating: 5,
                  worstRating: 1,
                },
                ...(r.title ? { name: r.title } : {}),
                reviewBody: r.body,
              })),
            },
          ]
        : []),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Leaderboard", item: BASE },
          { "@type": "ListItem", position: 2, name: firm.name, item: `${BASE}/firm/${slug}` },
          { "@type": "ListItem", position: 3, name: "Reviews", item: reviewsUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${reviewsUrl}#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(graphJsonLd) }}
      />
      <Nav />
      <main className="flex-1 bg-canvas-soft px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-[960px]">
          <nav aria-label="Breadcrumb">
            <Link
              href={`/firm/${slug}`}
              className="text-[14px] leading-[21px] text-body-mid hover:text-ink"
            >
              ← Back to {firm.name}
            </Link>
          </nav>

          {/* Header */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {firm.logoUrl ? (
              <Image
                src={firm.logoUrl}
                alt={`${firm.name} logo`}
                width={56}
                height={56}
                priority
                className="h-14 w-14 rounded-md object-cover"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-md bg-canvas text-[22px] font-semibold text-ink">
                {firm.name.slice(0, 1).toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-[13px] font-medium uppercase leading-[13px] tracking-[1px] text-primary">
                {rank ? `#${rank} on the leaderboard` : "Listed firm"}
              </p>
              <h1 className="mt-1 text-[28px] font-semibold leading-[32px] tracking-[-0.5px] text-ink sm:text-[34px] sm:leading-[38px]">
                {firm.name} reviews
              </h1>
              {summary.count > 0 && (
                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <Stars value={summary.average} size={16} />
                  <span className="text-[15px] font-semibold leading-[22px] text-ink">
                    {avg} out of 5
                  </span>
                  <span className="text-[15px] leading-[22px] text-body-mid">
                    · {summary.count} review{summary.count === 1 ? "" : "s"}
                  </span>
                </div>
              )}
            </div>
          </div>

          <p className="mt-4 max-w-[680px] text-[15px] leading-[23px] text-body">
            {summary.count > 0
              ? `Read ${summary.count} trader-submitted review${
                  summary.count === 1 ? "" : "s"
                } of ${firm.name}, averaging ${avg} out of 5 — covering the ${firm.name} evaluation challenge, payout speed, drawdown and consistency rules, trading platforms, and support.`
              : `No trader reviews of ${firm.name} yet. Share your first-hand experience with the ${firm.name} evaluation challenge, payouts, rules, and support below.`}
          </p>

          {/* Summary + list */}
          <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
            {/* Summary card */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-md bg-canvas p-6">
                <h2 className="sr-only">{firm.name} rating breakdown</h2>
                {summary.count > 0 ? (
                  <>
                    <div className="flex items-end gap-3">
                      <span className="text-[48px] font-semibold leading-[48px] tracking-[-1px] text-ink">
                        {avg}
                      </span>
                      <span className="pb-1 text-[15px] leading-[22px] text-body-mid">out of 5</span>
                    </div>
                    <div className="mt-2">
                      <Stars value={summary.average} size={20} />
                    </div>
                    <p className="mt-2 text-[14px] leading-[21px] text-body">
                      Based on {summary.count} trader review{summary.count === 1 ? "" : "s"}
                    </p>

                    <div className="mt-5 flex flex-col gap-2">
                      {([5, 4, 3, 2, 1] as const).map((star) => {
                        const n = summary.distribution[star];
                        return (
                          <div key={star} className="flex items-center gap-2">
                            <span className="w-10 shrink-0 text-[13px] leading-[19px] text-body-mid">
                              {star} star
                            </span>
                            <span className="h-2 flex-1 overflow-hidden rounded-pill bg-canvas-soft">
                              <span
                                className="block h-full rounded-pill bg-primary"
                                style={{ width: `${(n / maxBar) * 100}%` }}
                              />
                            </span>
                            <span className="w-6 shrink-0 text-right text-[13px] leading-[19px] text-body-mid">
                              {n}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-[18px] font-semibold leading-[25px] text-ink">
                      No reviews yet
                    </p>
                    <p className="mt-2 text-[14px] leading-[21px] text-body">
                      Be the first trader to review {firm.name}. Your feedback helps others
                      choose.
                    </p>
                  </>
                )}

                <a
                  href="#write-review"
                  className="mt-5 block rounded-md bg-primary px-4 py-3 text-center text-[15px] font-semibold leading-[22px] text-on-primary transition-colors hover:bg-primary-hover"
                >
                  Write a review
                </a>
                <p className="mt-3 text-[12px] leading-[18px] text-body-mid">
                  A rating here reflects trader experience — not TraderMarket&apos;s
                  leaderboard rank, which is paid.
                </p>
              </div>
            </aside>

            {/* Reviews list */}
            <section aria-labelledby="reviews-heading">
              <h2
                id="reviews-heading"
                className="scroll-mt-24 text-[20px] font-semibold leading-[26px] tracking-[-0.3px] text-ink"
              >
                {summary.count > 0
                  ? `${summary.count} trader review${summary.count === 1 ? "" : "s"} of ${firm.name}`
                  : `Trader reviews of ${firm.name}`}
              </h2>
              {truncated && (
                <p className="mt-1 text-[13px] leading-[19px] text-body-mid">
                  Showing the {shownCount} most recent.
                </p>
              )}

              {reviews.length === 0 ? (
                <div className="mt-4 rounded-md bg-canvas p-8 text-center">
                  <p className="text-[18px] font-semibold leading-[25px] text-ink">
                    This firm has no reviews yet
                  </p>
                  <p className="mx-auto mt-2 max-w-[420px] text-[15px] leading-[23px] text-body">
                    Traded with {firm.name}? Share how the challenge, rules, support, and
                    payouts actually went.
                  </p>
                  <a
                    href="#write-review"
                    className="mt-5 inline-block rounded-md border border-ink px-5 py-2.5 text-[15px] font-semibold leading-[22px] text-ink hover:bg-canvas-soft"
                  >
                    Write the first review
                  </a>
                </div>
              ) : (
                <ul className="mt-4 flex flex-col gap-4">
                  {reviews.map((review) => (
                    <li
                      key={review.id}
                      id={`review-${review.id}`}
                      className="scroll-mt-24 rounded-md bg-canvas p-6 target:ring-2 target:ring-primary"
                    >
                      <article>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <span
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-canvas-soft text-[14px] font-semibold text-ink"
                              aria-hidden="true"
                            >
                              {initials(review.authorName)}
                            </span>
                            <div>
                              <p className="text-[15px] font-semibold leading-[21px] text-ink">
                                {review.authorName}
                              </p>
                              <p className="text-[13px] leading-[19px] text-body-mid">
                                {review.traderType} ·{" "}
                                <a
                                  href={`#review-${review.id}`}
                                  className="hover:text-primary"
                                  aria-label={`Permalink to this ${firm.name} review`}
                                >
                                  <time dateTime={review.createdAt.slice(0, 10)}>
                                    {formatDate(review.createdAt)}
                                  </time>
                                </a>
                              </p>
                            </div>
                          </div>
                          <Stars value={review.rating} size={16} className="mt-1" />
                        </div>

                        {review.title && (
                          <h3 className="mt-4 text-[16px] font-semibold leading-[24px] text-ink">
                            {review.title}
                          </h3>
                        )}
                        <p className="mt-2 whitespace-pre-line text-[15px] leading-[24px] text-body">
                          {review.body}
                        </p>
                      </article>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>

          {/* FAQ */}
          <section aria-labelledby="faq-heading" className="mt-12">
            <h2
              id="faq-heading"
              className="text-[22px] font-semibold leading-[28px] tracking-[-0.4px] text-ink"
            >
              {firm.name} reviews — FAQ
            </h2>
            <div className="mt-6 flex flex-col gap-6">
              {faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="text-[16px] font-semibold leading-[24px] text-ink">{f.q}</h3>
                  <p className="mt-1 text-[15px] leading-[23px] text-body">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Write a review */}
          <section
            id="write-review"
            aria-labelledby="write-review-heading"
            className="mt-12 scroll-mt-24 rounded-md bg-canvas p-6 sm:p-8"
          >
            <h2
              id="write-review-heading"
              className="text-[22px] font-semibold leading-[28px] tracking-[-0.4px] text-ink"
            >
              Write a review for {firm.name}
            </h2>
            <p className="mt-2 text-[15px] leading-[23px] text-body">
              First-hand experience only. Your review publishes immediately and stays public.
            </p>
            <div className="mt-6">
              <ReviewForm firmName={firm.name} slug={slug} />
            </div>
          </section>

          {/* Related internal links */}
          <nav aria-label="Related" className="mt-12 border-t border-ink/10 pt-6">
            <p className="text-[13px] font-medium uppercase leading-[13px] tracking-[1px] text-body-mid">
              More on TraderMarket
            </p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[15px] leading-[22px]">
              <Link href={`/firm/${slug}`} className="text-ink hover:text-primary">
                {firm.name} profile
              </Link>
              <Link href="/best-prop-trading-firms" className="text-ink hover:text-primary">
                Best prop trading firms
              </Link>
              <Link href="/funded-trading-programs" className="text-ink hover:text-primary">
                Funded trading programs guide
              </Link>
              <Link href="/#leaderboard" className="text-ink hover:text-primary">
                Full leaderboard
              </Link>
              <Link
                href={`/widget/reviews?firm=${slug}`}
                className="text-ink hover:text-primary"
              >
                Embed these reviews on your site
              </Link>
            </div>
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}
