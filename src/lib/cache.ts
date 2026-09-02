import { revalidatePath } from "next/cache";

export function revalidateLeaderboard(slug?: string) {
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  if (slug) revalidatePath(`/firm/${slug}`);
}

export function revalidateReviews(slug: string) {
  revalidatePath(`/firm/${slug}/reviews`);
  // Deeper review pages (/reviews/page/2, /3, …) — one call covers them all.
  revalidatePath("/firm/[slug]/reviews/page/[page]", "page");
  // The firm profile shows the aggregate rating, so refresh it too.
  revalidatePath(`/firm/${slug}`);
  // The reviews hub and the homepage leaderboard show the aggregate too.
  revalidatePath("/prop-firm-reviews");
}
