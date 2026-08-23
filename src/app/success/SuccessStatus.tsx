"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type PaymentDetails = {
  payAddress: string;
  payAmount: number;
  payCurrency: string;
  network: string;
  qrCode: string;
  expiresAt: string | null;
};

type BidStatusResponse = {
  bidStatus: "pending" | "paying" | "paid" | "failed" | "expired";
  amount: number;
  payment: PaymentDetails | null;
  firm: { name: string; slug: string; status: string } | null;
  rank: number | null;
};

function useCountdown(expiresAt: string | null) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (!expiresAt) return;
    const target = new Date(expiresAt).getTime();
    const tick = () => setRemaining(Math.max(0, Math.floor((target - Date.now()) / 1000)));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  if (remaining === null) return null;
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="shrink-0 rounded-sm border border-ink px-3 py-2 text-[14px] font-semibold text-ink hover:bg-canvas-soft"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export function SuccessStatus() {
  const searchParams = useSearchParams();
  const bidId = searchParams.get("bidId");
  const [status, setStatus] = useState<BidStatusResponse | null>(null);
  const countdown = useCountdown(status?.payment?.expiresAt ?? null);

  useEffect(() => {
    if (!bidId) return;
    let cancelled = false;
    let interval: ReturnType<typeof setInterval> | null = null;

    async function poll() {
      const res = await fetch(`/api/bids/${bidId}`, { cache: "no-store" });
      if (!res.ok || cancelled) return;
      const json: BidStatusResponse = await res.json();
      if (cancelled) return;
      setStatus(json);
      // Terminal states never change again — stop hitting the server
      // (each poll otherwise re-runs a full leaderboard query forever,
      // for as long as the tab stays open).
      if (json.bidStatus === "paid" || json.bidStatus === "failed" || json.bidStatus === "expired") {
        if (interval) clearInterval(interval);
      }
    }

    poll();
    interval = setInterval(poll, 4000);
    return () => {
      cancelled = true;
      if (interval) clearInterval(interval);
    };
  }, [bidId]);

  if (!bidId) {
    return <p className="text-[18px] leading-[27px] text-body">Missing payment reference.</p>;
  }

  if (!status) {
    return <p className="text-[18px] leading-[27px] text-body">Loading your payment…</p>;
  }

  if (status.bidStatus === "paid") {
    return (
      <div className="rounded-md bg-canvas p-8">
        <p className="text-[14px] font-medium uppercase leading-[14px] tracking-[1px] text-primary">
          Payment confirmed
        </p>
        <h1 className="mt-3 text-[32px] font-medium leading-[36px] text-ink">
          {status.firm?.name} is on the board
        </h1>
        <p className="mt-4 text-[18px] leading-[27px] text-body">
          {status.rank ? `You're currently ranked #${status.rank}.` : "Your rank is updating."}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/"
            className="rounded-md bg-primary px-6 py-3 text-[18px] font-semibold leading-[27px] text-on-primary hover:bg-primary-hover"
          >
            View leaderboard
          </Link>
          {status.firm?.slug && (
            <Link
              href={`/firm/${status.firm.slug}`}
              className="rounded-md border border-ink px-6 py-3 text-[18px] font-semibold leading-[27px] text-ink hover:bg-canvas-soft"
            >
              View your listing
            </Link>
          )}
        </div>
      </div>
    );
  }

  if (status.bidStatus === "failed" || status.bidStatus === "expired") {
    return (
      <div className="rounded-md bg-canvas p-8">
        <h1 className="text-[32px] font-medium leading-[36px] text-ink">
          Payment {status.bidStatus === "expired" ? "expired" : "failed"}
        </h1>
        <p className="mt-4 text-[18px] leading-[27px] text-body">
          {status.bidStatus === "expired"
            ? "The payment window closed before a transaction was received. No charge was applied."
            : "Your payment couldn't be completed. No charge was applied."}
        </p>
        <Link
          href="/list"
          className="mt-6 inline-block rounded-md bg-primary px-6 py-3 text-[18px] font-semibold leading-[27px] text-on-primary hover:bg-primary-hover"
        >
          Try again
        </Link>
      </div>
    );
  }

  const payment = status.payment;

  if (status.bidStatus === "paying") {
    return (
      <div className="rounded-md bg-canvas p-8">
        <p className="text-[14px] font-medium uppercase leading-[14px] tracking-[1px] text-primary">
          Payment detected
        </p>
        <h1 className="mt-3 text-[28px] font-medium leading-[34px] text-ink">
          Confirming on the {payment?.network || "blockchain"} network…
        </h1>
        <p className="mt-4 text-[16px] leading-[24px] text-body">
          We've seen your transaction and are waiting for the network to confirm it. This
          page updates automatically — no need to send anything else.
        </p>
      </div>
    );
  }

  // pending — show the deposit address for the payer to send funds to.
  return (
    <div className="rounded-md bg-canvas p-8 text-left">
      <p className="text-center text-[14px] font-medium uppercase leading-[14px] tracking-[1px] text-primary">
        Awaiting payment
      </p>
      <h1 className="mt-3 text-center text-[28px] font-medium leading-[34px] text-ink">
        Send ${status.amount} in {payment?.payCurrency}
      </h1>

      {payment?.qrCode && (
        <div className="mt-6 flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={payment.qrCode}
            alt="Payment QR code"
            className="h-[150px] w-[150px] rounded-md bg-canvas-soft p-2"
          />
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.5px] text-body-mid">
            Amount ({payment?.payCurrency})
          </p>
          <div className="mt-1 flex items-center gap-2">
            <code className="flex-1 truncate rounded-sm bg-canvas-soft px-3 py-2 text-[16px] text-ink">
              {payment?.payAmount}
            </code>
            {payment && <CopyButton value={String(payment.payAmount)} />}
          </div>
        </div>

        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.5px] text-body-mid">
            {payment?.network} address
          </p>
          <div className="mt-1 flex items-center gap-2">
            <code className="flex-1 truncate rounded-sm bg-canvas-soft px-3 py-2 text-[14px] text-ink">
              {payment?.payAddress}
            </code>
            {payment && <CopyButton value={payment.payAddress} />}
          </div>
        </div>
      </div>

      {countdown && (
        <p className="mt-6 text-center text-[14px] leading-[21px] text-mute">
          Address expires in <span className="font-semibold text-ink">{countdown}</span>
        </p>
      )}
      <p className="mt-2 text-center text-[13px] leading-[19px] text-mute">
        This page updates automatically once your transaction is detected.
      </p>
    </div>
  );
}
