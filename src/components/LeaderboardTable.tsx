import Link from "next/link";
import type { LeaderboardEntry } from "@/lib/ranking";

const MEDALS: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

function displayHost(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function LeaderboardTable({ entries }: { entries: LeaderboardEntry[] }) {
  if (entries.length === 0) {
    return (
      <div className="rounded-md bg-canvas-soft px-6 py-12 text-center">
        <p className="text-[20px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
          The leaderboard is empty
        </p>
        <p className="mt-2 text-[16px] leading-[24px] text-body">
          Be the first prop firm to claim #1 — starting bid is just $10.
        </p>
        <Link
          href="/list"
          className="mt-6 inline-block rounded-md bg-primary px-6 py-3 text-[18px] font-semibold leading-[27px] text-on-primary hover:bg-primary-hover"
        >
          Claim #1
        </Link>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {entries.map((entry) => (
        <li
          key={entry.id}
          className="flex flex-col gap-4 rounded-md border border-ink/10 bg-canvas-soft p-6 sm:flex-row sm:items-center sm:justify-between sm:border-0"
        >
          <div className="flex items-center gap-4">
            <span className="w-12 shrink-0 text-center text-[24px] font-semibold leading-[30px] tracking-[-0.6px] text-ink">
              {MEDALS[entry.rank] ?? `#${entry.rank}`}
            </span>
            {entry.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={entry.logoUrl}
                alt={`${entry.name} logo`}
                className="h-12 w-12 shrink-0 rounded-md object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-canvas text-[18px] font-semibold text-ink">
                {entry.name.slice(0, 1).toUpperCase()}
              </div>
            )}
            <div>
              <Link
                href={`/firm/${entry.slug}`}
                className="text-[20px] font-semibold leading-[25px] tracking-[-0.5px] text-ink hover:text-primary"
              >
                {entry.name}
              </Link>
              <p className="text-[14px] leading-[21px] text-body-mid">{displayHost(entry.websiteUrl)}</p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-6 sm:justify-end">
            <div className="text-right">
              <p className="text-[14px] leading-[21px] text-body-mid">Current bid</p>
              <p className="text-[20px] font-semibold leading-[25px] text-ink">${entry.bidAmount}</p>
            </div>
            <Link
              href={`/list?position=${entry.rank}`}
              className="whitespace-nowrap rounded-md bg-primary px-6 py-3 text-[14.4px] font-bold leading-[14.4px] tracking-[0.144px] text-on-primary hover:bg-primary-hover"
            >
              Take #{entry.rank} — ${entry.bidAmount + 1}
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
