import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { PropFirm } from "@/lib/models/PropFirm";
import { Bid } from "@/lib/models/Bid";
import { Payment } from "@/lib/models/Payment";
import { slugify } from "@/lib/slug";
import { getActiveLeaderboard, minimumBidForPosition } from "@/lib/ranking";
import { createOxapayWhiteLabel } from "@/lib/oxapay";
import { findPayCurrencyOption } from "@/lib/payCurrencies";
import { faviconUrlFor } from "@/lib/logo";

export const dynamic = "force-dynamic";

const checkoutSchema = z.object({
  name: z.string().trim().min(2).max(120),
  websiteUrl: z.string().trim().url().max(300),
  description: z.string().trim().max(1000).optional().default(""),
  position: z.number().int().min(1),
  amount: z.number().min(1),
  payCurrencyId: z.string().min(1),
  email: z.string().trim().email().optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission", details: parsed.error.flatten() }, { status: 400 });
  }
  const { name, websiteUrl, description, position, amount, payCurrencyId, email } = parsed.data;

  const currencyOption = findPayCurrencyOption(payCurrencyId);
  if (!currencyOption) {
    return NextResponse.json({ error: "Unsupported payment currency" }, { status: 400 });
  }

  await connectDB();

  const leaderboard = await getActiveLeaderboard();
  const requiredMinimum = minimumBidForPosition(leaderboard, position);
  if (amount < requiredMinimum) {
    return NextResponse.json(
      { error: `That position now requires at least $${requiredMinimum}.`, requiredMinimum },
      { status: 409 }
    );
  }

  const baseSlug = slugify(name) || "prop-firm";
  let slug = baseSlug;
  let suffix = 1;
  while (await PropFirm.exists({ slug })) {
    suffix += 1;
    slug = `${baseSlug}-${suffix}`;
  }

  const firm = await PropFirm.create({
    name,
    slug,
    websiteUrl,
    logoUrl: faviconUrlFor(websiteUrl),
    description,
    status: "pending",
  });

  const bid = await Bid.create({
    propFirm: firm._id,
    amount,
    status: "pending",
  });

  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://tradermarket.online";

  try {
    const payment = await createOxapayWhiteLabel({
      amount,
      orderId: String(bid._id),
      description: `Leaderboard bid — ${name}`,
      callbackUrl: `${base}/api/oxapay/webhook`,
      payCurrency: currencyOption.payCurrency,
      network: currencyOption.network,
      email,
    });

    bid.trackId = payment.trackId;
    bid.payCurrency = payment.payCurrency;
    bid.network = payment.network;
    bid.payAddress = payment.payAddress;
    bid.payAmount = payment.payAmount;
    bid.qrCode = payment.qrCode;
    bid.expiresAt = payment.expiredAt ? new Date(payment.expiredAt * 1000) : null;
    await bid.save();

    await Payment.create({
      propFirm: firm._id,
      bid: bid._id,
      amount,
      trackId: payment.trackId,
      status: "pending",
    });

    return NextResponse.json({ bidId: String(bid._id) });
  } catch (err) {
    await Bid.deleteOne({ _id: bid._id });
    await PropFirm.deleteOne({ _id: firm._id });
    // Log the real cause server-side, but never relay a third-party
    // provider's raw error text to the client — it can carry internal
    // details (account/config state) that aren't ours to disclose.
    console.error("[checkout] payment creation failed:", err);
    return NextResponse.json({ error: "Failed to start payment. Please try again." }, { status: 502 });
  }
}
