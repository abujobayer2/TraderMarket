import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { Bid } from "@/lib/models/Bid";
import { Payment } from "@/lib/models/Payment";
import { PropFirm } from "@/lib/models/PropFirm";
import { getOxapayPaymentStatus, isPaidStatus, isPayingStatus, isFailedStatus } from "@/lib/oxapay";
import { getActiveLeaderboard } from "@/lib/ranking";
import { revalidateLeaderboard } from "@/lib/cache";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  await connectDB();
  const bid = await Bid.findById(id);
  if (!bid) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if ((bid.status === "pending" || bid.status === "paying") && bid.trackId) {
    try {
      const remote = await getOxapayPaymentStatus(bid.trackId);
      const remoteStatus = String(remote?.status ?? "");
      if (isPaidStatus(remoteStatus)) {
        bid.status = "paid";
        await bid.save();
        await Payment.findOneAndUpdate({ bid: bid._id }, { status: "paid", rawCallback: remote });
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
      } else if (isPayingStatus(remoteStatus) && bid.status === "pending") {
        bid.status = "paying";
        await bid.save();
        await Payment.findOneAndUpdate({ bid: bid._id }, { status: "paying", rawCallback: remote });
      } else if (isFailedStatus(remoteStatus)) {
        bid.status = remoteStatus.toLowerCase() === "expired" ? "expired" : "failed";
        await bid.save();
        await Payment.findOneAndUpdate({ bid: bid._id }, { status: bid.status, rawCallback: remote });
      }
    } catch {
      // remote check best-effort; webhook remains source of truth
    }
  }

  const firm = await PropFirm.findById(bid.propFirm).lean();
  let rank: number | null = null;
  if (firm?.status === "active") {
    const leaderboard = await getActiveLeaderboard();
    const found = leaderboard.find((e) => e.id === String(firm._id));
    rank = found?.rank ?? null;
  }

  return NextResponse.json({
    bidStatus: bid.status,
    amount: bid.amount,
    payment:
      bid.status === "pending" || bid.status === "paying"
        ? {
            payAddress: bid.payAddress,
            payAmount: bid.payAmount,
            payCurrency: bid.payCurrency,
            network: bid.network,
            qrCode: bid.qrCode,
            expiresAt: bid.expiresAt,
          }
        : null,
    firm: firm ? { name: firm.name, slug: firm.slug, status: firm.status } : null,
    rank,
  });
}
