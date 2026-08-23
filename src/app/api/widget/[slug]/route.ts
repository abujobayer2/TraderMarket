import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { PropFirm } from "@/lib/models/PropFirm";
import { getActiveLeaderboard } from "@/lib/ranking";

const SLUG_PATTERN = /^[a-z0-9-]{1,80}$/;

const CORS_HEADERS = {
  // The widget is meant to be embedded on any firm's own domain, so this
  // endpoint is intentionally public — same model as a Trustpilot badge.
  // Only public leaderboard fields are ever returned (see the shape below).
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

function jsonWithCors(body: unknown, init?: ResponseInit) {
  return NextResponse.json(body, {
    ...init,
    headers: { ...CORS_HEADERS, ...(init?.headers ?? {}) },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!SLUG_PATTERN.test(slug)) {
    return jsonWithCors({ error: "Invalid firm identifier" }, { status: 400 });
  }

  await connectDB();
  const firm = await PropFirm.findOne({ slug, status: "active" }).lean();
  if (!firm) {
    return jsonWithCors({ error: "Firm not found" }, { status: 404 });
  }

  const leaderboard = await getActiveLeaderboard();
  const entry = leaderboard.find((e) => e.slug === slug);

  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://tradermarket.online";

  return jsonWithCors(
    {
      name: firm.name,
      logo: firm.logoUrl || null,
      rank: entry?.rank ?? null,
      bid: firm.currentBidAmount,
      verified: Boolean(firm.verified),
      // Real review/rating aggregation isn't implemented yet — return null
      // rather than a fabricated number; the widget hides these fields
      // when null instead of showing a fake rating.
      rating: null,
      reviews: null,
      profileUrl: `${base}/firm/${firm.slug}`,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    }
  );
}
