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

export async function getFirmReviews(slug: string): Promise<FirmReview[]> {
  await connectDB();
  const reviews = await Review.find({ firmSlug: slug, status: "published" })
    .sort({ createdAt: -1 })
    .limit(200)
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
}

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

export async function getReviewSummary(slug: string): Promise<ReviewSummary> {
  await connectDB();
  const reviews = await Review.find({ firmSlug: slug, status: "published" })
    .select("rating")
    .lean();
  return summarise(reviews.map((r) => ({ rating: r.rating })));
}

export type FirmRatingBrief = { count: number; average: number };

/**
 * One aggregation for every firm's count + average, for internal linking on
 * list pages (homepage leaderboard, rankings page) without an N+1.
 */
export async function getReviewSummaries(): Promise<Map<string, FirmRatingBrief>> {
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
}
