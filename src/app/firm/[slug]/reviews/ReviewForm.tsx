"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TRADER_TYPES } from "@/lib/reviewTypes";

const STAR_PATH =
  "M12 2.5l2.955 5.99 6.61.96-4.783 4.663 1.129 6.583L12 17.548l-5.911 3.108 1.129-6.583L2.435 9.45l6.61-.96L12 2.5z";

const RATING_LABELS: Record<number, string> = {
  1: "Poor",
  2: "Below average",
  3: "Average",
  4: "Good",
  5: "Excellent",
};

export function ReviewForm({ firmName, slug }: { firmName: string; slug: string }) {
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [authorName, setAuthorName] = useState("");
  const [traderType, setTraderType] = useState<(typeof TRADER_TYPES)[number]>("Funded trader");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [company, setCompany] = useState(""); // honeypot

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const shown = hoverRating || rating;
  const canSubmit =
    rating >= 1 && authorName.trim().length >= 2 && body.trim().length >= 20 && !submitting;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`/api/firm/${slug}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, title, body, authorName, traderType, company }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      setDone(true);
      setSubmitting(false);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-md border border-primary/30 bg-primary/5 p-6">
        <p className="text-[18px] font-semibold leading-[27px] text-ink">Thanks for your review</p>
        <p className="mt-2 text-[15px] leading-[23px] text-body">
          Your review of {firmName} is now live on this page. Refresh if you don&apos;t see it yet.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className="text-[14px] font-semibold leading-[21px] text-ink">Your rating</span>
        <div className="flex items-center gap-3">
          <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                aria-label={`${n} star${n > 1 ? "s" : ""}`}
                aria-pressed={rating === n}
                onClick={() => setRating(n)}
                onMouseEnter={() => setHoverRating(n)}
                className="rounded-sm p-0.5 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <svg
                  width={30}
                  height={30}
                  viewBox="0 0 24 24"
                  fill={n <= shown ? "var(--color-primary)" : "var(--color-mute)"}
                >
                  <path d={STAR_PATH} />
                </svg>
              </button>
            ))}
          </div>
          <span className="text-[14px] leading-[21px] text-body-mid">
            {shown ? RATING_LABELS[shown] : "Tap to rate"}
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-[14px] font-semibold leading-[21px] text-ink">Display name</span>
          <input
            required
            maxLength={80}
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="e.g. Daniel R."
            className="rounded-sm border border-ink/20 bg-canvas px-4 py-3 text-[16px] leading-[24px] text-ink outline-none focus:border-primary"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[14px] font-semibold leading-[21px] text-ink">
            Your experience
          </span>
          <select
            value={traderType}
            onChange={(e) => setTraderType(e.target.value as (typeof TRADER_TYPES)[number])}
            className="rounded-sm border border-ink/20 bg-canvas px-4 py-3 text-[16px] leading-[24px] text-ink outline-none focus:border-primary"
          >
            {TRADER_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-[14px] font-semibold leading-[21px] text-ink">
          Headline <span className="font-normal text-body-mid">(optional)</span>
        </span>
        <input
          maxLength={120}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Sum up your experience in one line"
          className="rounded-sm border border-ink/20 bg-canvas px-4 py-3 text-[16px] leading-[24px] text-ink outline-none focus:border-primary"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-[14px] font-semibold leading-[21px] text-ink">Your review</span>
        <textarea
          required
          rows={5}
          maxLength={2000}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={`What was your experience with ${firmName}? Cover the challenge, payouts, rules, and support.`}
          className="rounded-sm border border-ink/20 bg-canvas px-4 py-3 text-[16px] leading-[24px] text-ink outline-none focus:border-primary"
        />
        <span className="text-[13px] leading-[19px] text-mute">
          {body.trim().length < 20
            ? `At least ${20 - body.trim().length} more characters`
            : `${body.length}/2000`}
        </span>
      </label>

      {/* Honeypot: hidden from users, catches bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      {error && (
        <p className="rounded-md bg-primary/10 px-4 py-3 text-[15px] leading-[23px] text-primary">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="self-start rounded-md bg-primary px-6 py-3 text-[16px] font-semibold leading-[24px] text-on-primary transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? "Publishing…" : "Publish review"}
      </button>

      <p className="text-[13px] leading-[19px] text-body-mid">
        Reviews are public and permanent. Share first-hand experience only — no referral links.
      </p>
    </form>
  );
}
