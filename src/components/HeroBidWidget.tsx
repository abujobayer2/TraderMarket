"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export type HeroBidWidgetCopy = {
  claimFirstFor: string;
  newSpotsStartAt: string; // "{amount}"
  outbidBelowTop: string;
  boardEmpty: string;
  websitePlaceholder: string;
  startingCheckout: string;
  outbidButton: string; // "{amount}"
  alreadyListed: string;
};

const EN_COPY: HeroBidWidgetCopy = {
  claimFirstFor: "Claim #1 for",
  newSpotsStartAt: "New spots start at ${amount}.",
  outbidBelowTop: "Paying less than the #1 price still puts you on the board at whatever rank that bid can take.",
  boardEmpty: "The board is empty — be the first firm listed.",
  websitePlaceholder: "Your prop firm website",
  startingCheckout: "Starting checkout…",
  outbidButton: "Outbid — ${amount}",
  alreadyListed: "Already on the board? Enter the same website to raise your bid.",
};

type Props = {
  minimumBid: number;
  newSpotMinimum: number;
  hasFirms: boolean;
  copy?: HeroBidWidgetCopy;
};

export function HeroBidWidget({ minimumBid, newSpotMinimum, hasFirms, copy = EN_COPY }: Props) {
  const router = useRouter();
  const minimum = minimumBid;
  const [amount, setAmount] = useState(minimum);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function step(delta: number) {
    setAmount((a) => Math.max(minimum, a + delta));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const params = new URLSearchParams({
      position: "1",
      amount: String(Math.max(minimum, amount)),
    });
    if (websiteUrl.trim()) params.set("websiteUrl", websiteUrl.trim());
    router.push(`/list?${params.toString()}`);
  }

  return (
    <div className="flex flex-col items-center">
      <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[32px] font-medium leading-[1.1] text-ink sm:text-[44px]">
        <span>{copy.claimFirstFor}</span>
        <span className="inline-flex items-center gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Decrease bid"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-canvas-soft text-[16px] font-semibold text-ink hover:bg-mute/30"
          >
            −
          </button>
          <span className="min-w-[1.5ch] text-primary">${amount}</span>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Increase bid"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-canvas-soft text-[16px] font-semibold text-ink hover:bg-mute/30"
          >
            +
          </button>
        </span>
      </p>

      <p className="mt-3 max-w-lg text-center text-[16px] leading-[24px] text-body">
        {hasFirms ? (
          <>
            <span className="font-semibold text-primary">
              {copy.newSpotsStartAt.replace("{amount}", String(newSpotMinimum))}
            </span>{" "}
            {copy.outbidBelowTop}
          </>
        ) : (
          <>{copy.boardEmpty}</>
        )}
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex w-full max-w-[560px] flex-col gap-2 sm:flex-row"
      >
        <input
          type="url"
          required
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
          placeholder={copy.websitePlaceholder}
          className="min-w-0 flex-1 rounded-sm border border-ink bg-canvas px-4 py-3 text-[16px] leading-[24px] text-ink outline-none focus:border-primary"
        />
        <button
          type="submit"
          disabled={submitting}
          className="shrink-0 whitespace-nowrap rounded-sm bg-primary px-6 py-3 text-[16px] font-semibold leading-[24px] text-on-primary transition-colors hover:bg-primary-hover disabled:opacity-60"
        >
          {submitting ? copy.startingCheckout : copy.outbidButton.replace("{amount}", String(amount))}
        </button>
      </form>
      <p className="mt-3 text-center text-[13px] leading-[19px] text-mute">{copy.alreadyListed}</p>
    </div>
  );
}
