import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Bid } from "@/lib/models/Bid";
import { Payment } from "@/lib/models/Payment";
import { PropFirm } from "@/lib/models/PropFirm";
import { verifyOxapayHmac, isPaidStatus, isPayingStatus, isFailedStatus } from "@/lib/oxapay";
import { revalidateLeaderboard } from "@/lib/cache";

// OxaPay requires a 200 response with body "OK" to consider a callback
// delivered — anything else is retried up to 5 times (1m, 3m, 30m, 3h apart).
function ok() {
  return new NextResponse("OK", { status: 200 });
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const hmacHeader = req.headers.get("hmac") || req.headers.get("HMAC");

  if (!verifyOxapayHmac(rawBody, hmacHeader)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const trackId = String(payload.track_id ?? payload.trackId ?? "");
  const orderId = String(payload.order_id ?? payload.orderId ?? "");
  const status = String(payload.status ?? "");

  if (!trackId && !orderId) {
    return NextResponse.json({ error: "Missing track/order id" }, { status: 400 });
  }

  await connectDB();

  const bid = trackId
    ? await Bid.findOne({ trackId })
    : await Bid.findById(orderId).catch(() => null);

  if (!bid) {
    return NextResponse.json({ error: "Bid not found" }, { status: 404 });
  }

  if (bid.status === "paid") {
    return ok();
  }

  if (isPaidStatus(status)) {
    bid.status = "paid";
    await bid.save();

    await Payment.findOneAndUpdate(
      { bid: bid._id },
      { status: "paid", rawCallback: payload },
      { new: true }
    );

    const firm = await PropFirm.findById(bid.propFirm);
    if (firm) {
      if (bid.amount >= firm.currentBidAmount) {
        firm.currentBidAmount = bid.amount;
        firm.currentBidId = bid._id;
      }
      firm.status = "active";
      await firm.save();
      revalidateLeaderboard(firm.slug);
    }
  } else if (isPayingStatus(status)) {
    // Payer broadcast a transaction; still awaiting network confirmations.
    // Don't activate the listing yet — wait for the final "Paid" callback.
    if (bid.status === "pending") {
      bid.status = "paying";
      await bid.save();
      await Payment.findOneAndUpdate(
        { bid: bid._id },
        { status: "paying", rawCallback: payload },
        { new: true }
      );
    }
  } else if (isFailedStatus(status)) {
    bid.status = status.toLowerCase() === "expired" ? "expired" : "failed";
    await bid.save();
    await Payment.findOneAndUpdate(
      { bid: bid._id },
      { status: bid.status, rawCallback: payload },
      { new: true }
    );
  }

  return ok();
}
