import { connectDB } from "@/lib/db";
import { PropFirm } from "@/lib/models/PropFirm";
import { Payment } from "@/lib/models/Payment";

export type LeaderboardEntry = {
  rank: number;
  id: string;
  name: string;
  slug: string;
  websiteUrl: string;
  logoUrl: string;
  description: string;
  bidAmount: number;
};

// Not wrapped in unstable_cache: in this Next.js version it returned stale
// results when called from a Route Handler vs. a Server Component (same
// cache key, different callers, inconsistent data — broke /api/leaderboard).
// Caching instead happens at the page level (`revalidate` + revalidatePath
// in cache.ts) and via the HTTP Cache-Control header on /api/leaderboard.
export async function getActiveLeaderboard(): Promise<LeaderboardEntry[]> {
  await connectDB();
  const firms = await PropFirm.find({ status: "active" })
    .sort({ currentBidAmount: -1, updatedAt: 1 })
    .lean();

  return firms.map((firm, index) => ({
    rank: index + 1,
    id: String(firm._id),
    name: firm.name,
    slug: firm.slug,
    websiteUrl: firm.websiteUrl,
    logoUrl: firm.logoUrl || "",
    description: firm.description || "",
    bidAmount: firm.currentBidAmount,
  }));
}

export type PublicStats = {
  activeFirms: number;
  paidBids: number;
  totalRevenue: number;
};

export async function getPublicStats(): Promise<PublicStats> {
  await connectDB();
  const [activeFirms, paidPayments] = await Promise.all([
    PropFirm.countDocuments({ status: "active" }),
    Payment.find({ status: "paid" }).select("amount").lean(),
  ]);
  return {
    activeFirms,
    paidBids: paidPayments.length,
    totalRevenue: paidPayments.reduce((sum, p) => sum + (p.amount || 0), 0),
  };
}

const STARTING_MIN_BID = Number(process.env.MINIMUM_STARTING_BID || 10);

export function minimumBidForPosition(leaderboard: LeaderboardEntry[], position: number): number {
  if (position < 1) throw new Error("Invalid position");
  const entry = leaderboard[position - 1];
  if (entry) return entry.bidAmount + 1;
  const lowestActive = leaderboard[leaderboard.length - 1];
  if (position === leaderboard.length + 1) {
    return lowestActive ? lowestActive.bidAmount + 1 : STARTING_MIN_BID;
  }
  return lowestActive ? lowestActive.bidAmount + 1 : STARTING_MIN_BID;
}
