import Link from "next/link";
import { Stars } from "@/components/Stars";
import type { FirmReview } from "@/lib/reviews";

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

/** Path for a given reviews page: page 1 is the canonical /reviews URL. */
export function reviewsPagePath(slug: string, page: number) {
  return page <= 1 ? `/firm/${slug}/reviews` : `/firm/${slug}/reviews/page/${page}`;
}

/**
 * The list of review cards. Each `<li>` carries `id="review-<id>"` so a
 * single review can be linked to and deep-linked from search results.
 */
export function ReviewList({
  reviews,
  firmName,
}: {
  reviews: FirmReview[];
  firmName: string;
}) {
  return (
    <ul className="mt-4 flex flex-col gap-4">
      {reviews.map((review) => (
        <li
          key={review.id}
          id={`review-${review.id}`}
          className="scroll-mt-24 rounded-md bg-canvas p-6 target:ring-2 target:ring-primary"
        >
          <article>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-canvas-soft text-[14px] font-semibold text-ink"
                  aria-hidden="true"
                >
                  {initials(review.authorName)}
                </span>
                <div>
                  <p className="text-[15px] font-semibold leading-[21px] text-ink">
                    {review.authorName}
                  </p>
                  <p className="text-[13px] leading-[19px] text-body-mid">
                    {review.traderType} ·{" "}
                    <a
                      href={`#review-${review.id}`}
                      className="hover:text-primary"
                      aria-label={`Permalink to this ${firmName} review`}
                    >
                      <time dateTime={review.createdAt.slice(0, 10)}>
                        {formatDate(review.createdAt)}
                      </time>
                    </a>
                  </p>
                </div>
              </div>
              <Stars value={review.rating} size={16} className="mt-1" />
            </div>

            {review.title && (
              <h3 className="mt-4 text-[16px] font-semibold leading-[24px] text-ink">
                {review.title}
              </h3>
            )}
            <p className="mt-2 whitespace-pre-line text-[15px] leading-[24px] text-body">
              {review.body}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}

function pageWindow(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out: (number | "…")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) out.push("…");
  for (let p = start; p <= end; p++) out.push(p);
  if (end < total - 1) out.push("…");
  out.push(total);
  return out;
}

/** Numbered pagination. Rendered only when there is more than one page. */
export function ReviewPagination({
  slug,
  current,
  totalPages,
}: {
  slug: string;
  current: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const linkCls =
    "inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-ink/15 px-3 text-[14px] font-medium text-ink hover:border-ink/40";
  const activeCls =
    "inline-flex h-9 min-w-9 items-center justify-center rounded-md bg-ink px-3 text-[14px] font-semibold text-canvas";
  const mutedCls =
    "inline-flex h-9 min-w-9 items-center justify-center px-2 text-[14px] text-body-mid";

  return (
    <nav
      aria-label={`${slug} reviews pagination`}
      className="mt-8 flex flex-wrap items-center gap-2"
    >
      {current > 1 ? (
        <Link
          href={reviewsPagePath(slug, current - 1)}
          rel="prev"
          className={linkCls}
          aria-label="Previous page of reviews"
        >
          ← Prev
        </Link>
      ) : (
        <span className={`${linkCls} cursor-not-allowed opacity-40`} aria-hidden="true">
          ← Prev
        </span>
      )}

      {pageWindow(current, totalPages).map((p, i) =>
        p === "…" ? (
          <span key={`gap-${i}`} className={mutedCls}>
            …
          </span>
        ) : p === current ? (
          <span key={p} aria-current="page" className={activeCls}>
            {p}
          </span>
        ) : (
          <Link key={p} href={reviewsPagePath(slug, p)} className={linkCls}>
            {p}
          </Link>
        )
      )}

      {current < totalPages ? (
        <Link
          href={reviewsPagePath(slug, current + 1)}
          rel="next"
          className={linkCls}
          aria-label="Next page of reviews"
        >
          Next →
        </Link>
      ) : (
        <span className={`${linkCls} cursor-not-allowed opacity-40`} aria-hidden="true">
          Next →
        </span>
      )}
    </nav>
  );
}
