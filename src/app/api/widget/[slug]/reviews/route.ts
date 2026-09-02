import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { PropFirm } from "@/lib/models/PropFirm";
import { getFirmReviews, summarise } from "@/lib/reviews";

const SLUG_PATTERN = /^[a-z0-9-]{1,80}$/;

// How many individual reviews the carousel / grid / list variants can show.
const MAX_REVIEWS = 15;

const CORS_HEADERS = {
  // Same model as the ranking badge and a Trustpilot widget: this is meant to
  // be embedded on any firm's own domain, so the endpoint is intentionally
  // public. Only already-public review fields are returned (see the shape).
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
  const firm = await PropFirm.findOne({ slug, status: "active" }).select("name slug logoUrl").lean();
  if (!firm) {
    return jsonWithCors({ error: "Firm not found" }, { status: 404 });
  }

  const reviews = await getFirmReviews(slug);
  const summary = summarise(reviews);

  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://tradermarket.online";
  const profileUrl = `${base}/firm/${firm.slug}/reviews`;

  return jsonWithCors(
    {
      name: firm.name,
      logo: firm.logoUrl || null,
      slug: firm.slug,
      average: summary.average,
      count: summary.count,
      distribution: summary.distribution,
      profileUrl,
      writeUrl: `${profileUrl}#write-review`,
      reviews: reviews.slice(0, MAX_REVIEWS).map((r) => ({
        id: r.id,
        rating: r.rating,
        title: r.title,
        body: r.body,
        author: r.authorName,
        traderType: r.traderType,
        date: r.createdAt.slice(0, 10),
      })),
    },
    {
      headers: {
        // CDN serves this for 5 min and revalidates in the background;
        // revalidateReviews() still busts the pages instantly on a new review.
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=900",
      },
    }
  );
}
