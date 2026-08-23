"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  minimumBid: number;
  newSpotMinimum: number;
  hasFirms: boolean;
};

export function HeroBidWidget({ minimumBid, newSpotMinimum, hasFirms }: Props) {
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
        <span>Claim #1 for</span>
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
            <span className="font-semibold text-primary">New spots start at ${newSpotMinimum}.</span>{" "}
            Paying less than the #1 price still puts you on the board at whatever rank
            that bid can take.
          </>
        ) : (
          <>The board is empty — be the first firm listed.</>
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
          placeholder="Your prop firm website"
          className="min-w-0 flex-1 rounded-sm border border-ink bg-canvas px-4 py-3 text-[16px] leading-[24px] text-ink outline-none focus:border-primary"
        />
        <button
          type="submit"
          disabled={submitting}
          className="shrink-0 whitespace-nowrap rounded-sm bg-primary px-6 py-3 text-[16px] font-semibold leading-[24px] text-on-primary transition-colors hover:bg-primary-hover disabled:opacity-60"
        >
          {submitting ? "Starting checkout…" : `Outbid — $${amount}`}
        </button>
      </form>
      <p className="mt-3 text-center text-[13px] leading-[19px] text-mute">
        Already on the board? Enter the same website to raise your bid.
      </p>
    </div>
  );
}
