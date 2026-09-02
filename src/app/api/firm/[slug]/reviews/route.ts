import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { PropFirm } from "@/lib/models/PropFirm";
import { Review, TRADER_TYPES } from "@/lib/models/Review";
import { getFirmReviews } from "@/lib/reviews";
import { revalidateReviews } from "@/lib/cache";

export const dynamic = "force-dynamic";

const reviewSchema = z.object({
  rating: z.coerce.number().int().min(1).max(5),
  title: z.string().trim().max(120).optional().default(""),
  body: z.string().trim().min(20).max(2000),
  authorName: z.string().trim().min(2).max(80),
  traderType: z.enum(TRADER_TYPES).optional().default("Other"),
  // Honeypot — real users never see or fill this field.
  company: z.string().optional().default(""),
});

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const reviews = await getFirmReviews(slug);
  return NextResponse.json({ reviews });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const body = await req.json().catch(() => null);
  const parsed = reviewSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check your review and try again.", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { rating, title, body: reviewBody, authorName, traderType, company } = parsed.data;

  // Silently accept bot submissions so they don't retry, but never store them.
  if (company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  await connectDB();
  const firm = await PropFirm.findOne({ slug, status: "active" }).select("_id name slug").lean();
  if (!firm) {
    return NextResponse.json({ error: "Firm not found." }, { status: 404 });
  }

  // Reject an exact-duplicate body from the same name within the last hour —
  // catches double-submits and the most naive spam without needing auth.
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const duplicate = await Review.exists({
    firmSlug: slug,
    authorName,
    body: reviewBody,
    createdAt: { $gte: oneHourAgo },
  });
  if (duplicate) {
    return NextResponse.json({ error: "This review was already submitted." }, { status: 409 });
  }

  const review = await Review.create({
    propFirm: firm._id,
    firmSlug: firm.slug,
    rating,
    title,
    body: reviewBody,
    authorName,
    traderType,
    status: "published",
    source: "user",
  });

  revalidateReviews(slug);

  return NextResponse.json({
    ok: true,
    review: {
      id: String(review._id),
      rating: review.rating,
      title: review.title || "",
      body: review.body,
      authorName: review.authorName,
      traderType: review.traderType,
      createdAt: review.createdAt.toISOString(),
    },
  });
}
