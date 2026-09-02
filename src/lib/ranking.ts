import { cache } from "react";
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

// Deliberately not `unstable_cache` (persistent, cross-request): in this
// Next.js version it returned stale results when the same key was hit from a
// Route Handler vs. a Server Component, which broke /api/leaderboard. React's
// `cache()` is different — request-scoped memoisation only — so it just
// collapses the repeat calls within one render (this page, the firm page, and
// the homepage all call it) without any cross-request staleness. Page-level
// `revalidate` + revalidatePath still handle the actual caching.
export const getActiveLeaderboard = cache(async function getActiveLeaderboard(): Promise<
  LeaderboardEntry[]
> {
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
});

// Just the leaderboard rank of one firm, without loading every firm doc.
// Two counts against the { status, currentBidAmount } index: firms bidding
// more, plus firms tied on the bid but listed earlier (updatedAt asc is the
// leaderboard's tie-break).
export const getFirmRank = cache(async function getFirmRank(
  slug: string
): Promise<number | undefined> {
  await connectDB();
  const firm = await PropFirm.findOne({ slug, status: "active" })
    .select("currentBidAmount updatedAt")
    .lean();
  if (!firm) return undefined;

  const [higher, tiedAhead] = await Promise.all([
    PropFirm.countDocuments({
      status: "active",
      currentBidAmount: { $gt: firm.currentBidAmount },
    }),
    PropFirm.countDocuments({
      status: "active",
      currentBidAmount: firm.currentBidAmount,
      updatedAt: { $lt: firm.updatedAt },
    }),
  ]);

  return higher + tiedAhead + 1;
});

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
