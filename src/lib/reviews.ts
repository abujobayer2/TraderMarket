import { cache } from "react";
import { connectDB } from "@/lib/db";
import { Review } from "@/lib/models/Review";

export type FirmReview = {
  id: string;
  rating: number;
  title: string;
  body: string;
  authorName: string;
  traderType: string;
  createdAt: string;
  /** Always "user" — every review is a genuine first-hand submission. */
  source: "user";
};

export type ReviewSummary = {
  count: number;
  average: number;
  /** Count of reviews per star value, keyed 1..5. */
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
};

const EMPTY_SUMMARY: ReviewSummary = {
  count: 0,
  average: 0,
  distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
};

/** Reviews shown per page on /firm/[slug]/reviews. */
export const REVIEWS_PER_PAGE = 30;

// `cache()` dedupes within a single request: the reviews page calls this from
// both generateMetadata and the component, and without this that is two
// identical round trips to Mongo. `page` is 1-based; the { firmSlug, status,
// createdAt } index serves the sort so only `perPage` docs are ever read.
export const getFirmReviews = cache(async function getFirmReviews(
  slug: string,
  page = 1,
  perPage = REVIEWS_PER_PAGE
): Promise<FirmReview[]> {
  await connectDB();
  const reviews = await Review.find({ firmSlug: slug, status: "published" })
    .sort({ createdAt: -1 })
    .skip(Math.max(0, page - 1) * perPage)
    .limit(perPage)
    .lean();

  return reviews.map((review) => ({
    id: String(review._id),
    rating: review.rating,
    title: review.title || "",
    body: review.body,
    authorName: review.authorName,
    traderType: review.traderType || "Other",
    createdAt: (review.createdAt instanceof Date
      ? review.createdAt
      : new Date(review.createdAt as string)
    ).toISOString(),
    source: "user",
  }));
});

export function summarise(reviews: Pick<FirmReview, "rating">[]): ReviewSummary {
  if (reviews.length === 0) return EMPTY_SUMMARY;

  const distribution: ReviewSummary["distribution"] = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let total = 0;
  for (const { rating } of reviews) {
    const clamped = Math.min(5, Math.max(1, Math.round(rating))) as 1 | 2 | 3 | 4 | 5;
    distribution[clamped] += 1;
    total += rating;
  }

  return {
    count: reviews.length,
    average: Math.round((total / reviews.length) * 10) / 10,
    distribution,
  };
}

// One grouped aggregation instead of streaming every rating doc into JS just
// to count them. Returns at most 5 rows (one per star value) and is served
// entirely from the { firmSlug, status, rating } index — no document fetch.
// `cache()` dedupes the generateMetadata + component calls in one request.
export const getReviewSummary = cache(async function getReviewSummary(
  slug: string
): Promise<ReviewSummary> {
  await connectDB();
  const rows = await Review.aggregate<{ _id: number; n: number }>([
    { $match: { firmSlug: slug, status: "published" } },
    { $group: { _id: "$rating", n: { $sum: 1 } } },
  ]);

  if (rows.length === 0) return EMPTY_SUMMARY;

  const distribution: ReviewSummary["distribution"] = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let count = 0;
  let total = 0;
  for (const { _id, n } of rows) {
    const star = Math.min(5, Math.max(1, Math.round(_id))) as 1 | 2 | 3 | 4 | 5;
    distribution[star] += n;
    count += n;
    total += _id * n;
  }

  return {
    count,
    average: Math.round((total / count) * 10) / 10,
    distribution,
  };
});

export type FirmRatingBrief = { count: number; average: number };

/**
 * One aggregation for every firm's count + average, for internal linking on
 * list pages (homepage leaderboard, rankings page) without an N+1. Covered by
 * the { status, firmSlug, rating } index. `cache()` collapses the repeat call
 * when more than one component on a page needs it.
 */
export const getReviewSummaries = cache(async function getReviewSummaries(): Promise<
  Map<string, FirmRatingBrief>
> {
  await connectDB();
  const rows = await Review.aggregate<{ _id: string; count: number; avg: number }>([
    { $match: { status: "published" } },
    { $group: { _id: "$firmSlug", count: { $sum: 1 }, avg: { $avg: "$rating" } } },
  ]);

  const map = new Map<string, FirmRatingBrief>();
  for (const row of rows) {
    map.set(row._id, {
      count: row.count,
      average: Math.round(row.avg * 10) / 10,
    });
  }
  return map;
});
