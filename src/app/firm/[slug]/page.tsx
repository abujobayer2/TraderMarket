import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Stars } from "@/components/Stars";
import { cache } from "react";
import { connectDB } from "@/lib/db";
import { PropFirm } from "@/lib/models/PropFirm";
import { getFirmRank } from "@/lib/ranking";
import { getReviewSummary } from "@/lib/reviews";
import { jsonLdScript } from "@/lib/jsonLd";

export const revalidate = 30;

// cache(): generateMetadata and the component share one query per request.
const getFirm = cache(async function getFirm(slug: string) {
  await connectDB();
  return PropFirm.findOne({ slug, status: "active" }).lean();
});

export async function generateStaticParams() {
  await connectDB();
  const firms = await PropFirm.find({ status: "active" }).select("slug").lean();
  return firms.map((f) => ({ slug: f.slug as string }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const firm = await getFirm(slug);
  if (!firm) return { title: "Firm Not Found" };

  const title = `${firm.name} — Prop Firm Profile`;
  const description =
    firm.description || `${firm.name} on the TraderMarket prop firm leaderboard.`;

  return {
    title,
    description,
    alternates: { canonical: `/firm/${slug}` },
    openGraph: { title: `${title} — TraderMarket`, description, url: `/firm/${slug}` },
    twitter: { title: `${title} — TraderMarket`, description },
  };
}

export default async function FirmPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const firm = await getFirm(slug);
  if (!firm) notFound();

  const [rank, reviewSummary] = await Promise.all([
    getFirmRank(slug),
    getReviewSummary(slug),
  ]);

  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://tradermarket.online";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: firm.name,
    url: firm.websiteUrl,
    description: firm.description || undefined,
    logo: firm.logoUrl || undefined,
    ...(reviewSummary.count > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: reviewSummary.average,
            reviewCount: reviewSummary.count,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
    ...(rank
      ? { additionalProperty: { "@type": "PropertyValue", name: "leaderboardRank", value: rank } }
      : {}),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Leaderboard", item: base },
      { "@type": "ListItem", position: 2, name: firm.name, item: `${base}/firm/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }} />
      <Nav />
      <main className="flex-1 bg-canvas-soft px-6 py-16">
        <div className="mx-auto max-w-[720px]">
          <Link href="/#leaderboard" className="text-[14px] leading-[21px] text-body-mid hover:text-ink">
            ← Back to leaderboard
          </Link>

          <div className="mt-6 rounded-md bg-canvas p-8">
            <div className="flex items-center gap-4">
              {firm.logoUrl ? (
                <Image
                  src={firm.logoUrl}
                  alt={`${firm.name} logo`}
                  width={64}
                  height={64}
                  priority
                  className="h-16 w-16 rounded-md object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-md bg-canvas-soft text-[24px] font-semibold text-ink">
                  {firm.name.slice(0, 1).toUpperCase()}
                </div>
              )}
              <div>
                <p className="text-[14px] font-medium uppercase leading-[14px] tracking-[1px] text-primary">
                  {rank ? `#${rank} on the leaderboard` : "Listed"}
                </p>
                <h1 className="text-[32px] font-medium leading-[36px] text-ink">{firm.name}</h1>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
              {reviewSummary.count > 0 ? (
                <>
                  <Stars value={reviewSummary.average} size={18} />
                  <span className="text-[15px] font-semibold leading-[22px] text-ink">
                    {reviewSummary.average.toFixed(1)}
                  </span>
                  <Link
                    href={`/firm/${slug}/reviews`}
                    className="text-[15px] leading-[22px] text-body-mid hover:text-primary"
                  >
                    {reviewSummary.count} review{reviewSummary.count === 1 ? "" : "s"} →
                  </Link>
                </>
              ) : (
                <Link
                  href={`/firm/${slug}/reviews`}
                  className="text-[15px] leading-[22px] text-body-mid hover:text-primary"
                >
                  No reviews yet — write the first →
                </Link>
              )}
            </div>

            {firm.description && (
              <p className="mt-6 text-[18px] leading-[27px] text-body">{firm.description}</p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className="rounded-pill bg-canvas-soft px-3 py-1 text-[16px] leading-[24px] text-ink">
                Current bid: ${firm.currentBidAmount}
              </span>
              <a
                href={firm.websiteUrl}
                target="_blank"
                rel="noopener noreferrer nofollow ugc"
                className="rounded-md bg-primary px-6 py-3 text-[18px] font-semibold leading-[27px] text-on-primary hover:bg-primary-hover"
              >
                Visit website
              </a>
              {rank && (
                <Link
                  href={`/list?position=${rank}`}
                  className="rounded-md border border-ink px-6 py-3 text-[18px] font-semibold leading-[27px] text-ink hover:bg-canvas-soft"
                >
                  Outbid #{rank} — ${firm.currentBidAmount + 1}
                </Link>
              )}
              <Link
                href={`/firm/${slug}/reviews`}
                className="rounded-md border border-ink px-6 py-3 text-[18px] font-semibold leading-[27px] text-ink hover:bg-canvas-soft"
              >
                {reviewSummary.count > 0 ? "Read reviews" : "Write a review"}
              </Link>
            </div>

            <Link
              href={`/widget?firm=${firm.slug}`}
              className="mt-4 inline-block text-[14px] font-semibold text-body-mid hover:text-primary"
            >
              Get a ranking widget for your site →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
