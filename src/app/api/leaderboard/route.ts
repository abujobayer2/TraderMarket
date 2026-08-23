import { NextResponse } from "next/server";
import { getActiveLeaderboard, minimumBidForPosition } from "@/lib/ranking";

export async function GET() {
  const leaderboard = await getActiveLeaderboard();
  const nextOpenMinimum = minimumBidForPosition(leaderboard, leaderboard.length + 1);
  return NextResponse.json(
    { leaderboard, nextOpenMinimum },
    {
      headers: {
        // Edge/CDN can serve this for 15s and revalidate in the background;
        // revalidateLeaderboard() still busts it instantly on a real bid.
        "Cache-Control": "public, s-maxage=15, stale-while-revalidate=60",
      },
    }
  );
}
