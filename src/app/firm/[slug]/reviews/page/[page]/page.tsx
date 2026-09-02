import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { cache } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Stars } from "@/components/Stars";
import { connectDB } from "@/lib/db";
import { PropFirm } from "@/lib/models/PropFirm";
import { getFirmRank } from "@/lib/ranking";
import { getFirmReviews, getReviewSummary, REVIEWS_PER_PAGE } from "@/lib/reviews";
import { jsonLdScript } from "@/lib/jsonLd";
import { ReviewList, ReviewPagination } from "../../ReviewList";

export const revalidate = 60;

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://tradermarket.online";

const getFirm = cache(async function getFirm(slug: string) {
  await connectDB();
  return PropFirm.findOne({ slug, status: "active" })
    .select("name slug websiteUrl logoUrl description")
    .lean();
});

/** Parse a positive integer page segment; anything else is not a real page. */
function parsePage(raw: string): number | null {
  if (!/^\d+$/.test(raw)) return null;
  const n = Number(raw);
  return n >= 2 && Number.isSafeInteger(n) ? n : null;
}

// Pre-render pages 2..N for every active firm. Page 1 lives at the parent
// /reviews route, so it is intentionally excluded here.
export async function generateStaticParams() {
  await connectDB();
  const firms = await PropFirm.find({ status: "active" }).select("slug").lean();
  const summaries = await Promise.all(
    firms.map((f) => getReviewSummary(f.slug as string))
  );
  const params: { slug: string; page: string }[] = [];
  firms.forEach((f, i) => {
    const pages = Math.ceil(summaries[i].count / REVIEWS_PER_PAGE);
    for (let p = 2; p <= pages; p++) params.push({ slug: f.slug as string, page: String(p) });
  });
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; page: string }>;
}): Promise<Metadata> {
  const { slug, page: rawPage } = await params;
  const page = parsePage(rawPage);
  const firm = await getFirm(slug);
  if (!firm || page === null) return { title: "Page Not Found" };

  const summary = await getReviewSummary(slug);
  const totalPages = Math.max(1, Math.ceil(summary.count / REVIEWS_PER_PAGE));
  const avg = summary.average.toFixed(1);

  const title = `${firm.name} Reviews — Page ${page} of ${totalPages}`;
  const description = `Page ${page} of trader reviews of ${firm.name} (rated ${avg}/5 from ${summary.count} reviews) — first-hand feedback on the challenge, payouts, drawdown rules, and support.`;
  const url = `/firm/${slug}/reviews/page/${page}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", title: `${title} — TraderMarket`, description, url },
    twitter: { title: `${title} — TraderMarket`, description },
  };
}

export default async function FirmReviewsPaginatedPage({
  params,
}: {
  params: Promise<{ slug: string; page: string }>;
}) {
  const { slug, page: rawPage } = await params;
  const page = parsePage(rawPage);
  // Non-numeric, page ≤ 1, or non-canonical ("02") → send to the canonical URL.
  if (page === null || String(page) !== rawPage) {
    redirect(page && page > 1 ? `/firm/${slug}/reviews/page/${page}` : `/firm/${slug}/reviews`);
  }

  const firm = await getFirm(slug);
  if (!firm) notFound();

  const [summary, rank] = await Promise.all([getReviewSummary(slug), getFirmRank(slug)]);
  const totalPages = Math.max(1, Math.ceil(summary.count / REVIEWS_PER_PAGE));
  if (page > totalPages) notFound();

  const reviews = await getFirmReviews(slug, page);
  const avg = summary.average.toFixed(1);
  const from = (page - 1) * REVIEWS_PER_PAGE + 1;
  const to = from + reviews.length - 1;

  const reviewsUrl = `${BASE}/firm/${slug}/reviews`;
  const pageUrl = `${reviewsUrl}/page/${page}`;
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
      {
        "@type": "Product",
        "@id": `${pageUrl}#product`,
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
        review: reviews.map((r) => ({
          "@type": "Review",
          "@id": `${pageUrl}#review-${r.id}`,
          url: `${pageUrl}#review-${r.id}`,
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
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Leaderboard", item: BASE },
          { "@type": "ListItem", position: 2, name: firm.name, item: `${BASE}/firm/${slug}` },
          { "@type": "ListItem", position: 3, name: "Reviews", item: reviewsUrl },
          { "@type": "ListItem", position: 4, name: `Page ${page}`, item: pageUrl },
        ],
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
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-x-2 text-[14px] leading-[21px] text-body-mid"
          >
            <Link href={`/firm/${slug}`} className="hover:text-ink">
              {firm.name}
            </Link>
            <span className="text-mute">/</span>
            <Link href={`/firm/${slug}/reviews`} className="hover:text-ink">
              Reviews
            </Link>
            <span className="text-mute">/</span>
            <span className="text-body">Page {page}</span>
          </nav>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            {firm.logoUrl ? (
              <Image
                src={firm.logoUrl}
                alt={`${firm.name} logo`}
                width={48}
                height={48}
                className="h-12 w-12 rounded-md object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-canvas text-[20px] font-semibold text-ink">
                {firm.name.slice(0, 1).toUpperCase()}
              </div>
            )}
            <div>
              <h1 className="text-[24px] font-semibold leading-[30px] tracking-[-0.4px] text-ink sm:text-[28px] sm:leading-[34px]">
                {firm.name} reviews — page {page}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-body-mid">
                <Stars value={summary.average} size={15} />
                <span className="font-semibold text-ink">{avg} out of 5</span>
                <span>· {summary.count} reviews</span>
                {rank ? <span>· #{rank} on the leaderboard</span> : null}
              </div>
            </div>
          </div>

          <p className="mt-4 text-[14px] leading-[21px] text-body-mid">
            Showing {from}–{to} of {summary.count} trader reviews of {firm.name}, newest first
            · page {page} of {totalPages}.
          </p>

          <section aria-label={`${firm.name} reviews, page ${page}`} className="mt-6">
            <ReviewList reviews={reviews} firmName={firm.name} />
            <ReviewPagination slug={slug} current={page} totalPages={totalPages} />
          </section>

          <nav aria-label="Related" className="mt-12 border-t border-ink/10 pt-6">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[15px] leading-[22px]">
              <Link href={`/firm/${slug}/reviews`} className="text-ink hover:text-primary">
                All {firm.name} reviews
              </Link>
              <Link href={`/firm/${slug}`} className="text-ink hover:text-primary">
                {firm.name} profile
              </Link>
              <Link href="/prop-firm-reviews" className="text-ink hover:text-primary">
                Prop firm reviews
              </Link>
              <Link href="/best-prop-trading-firms" className="text-ink hover:text-primary">
                Best prop trading firms
              </Link>
            </div>
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}
