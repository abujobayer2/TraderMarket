import { revalidatePath } from "next/cache";

export function revalidateLeaderboard(slug?: string) {
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  if (slug) revalidatePath(`/firm/${slug}`);
}

export function revalidateReviews(slug: string) {
  revalidatePath(`/firm/${slug}/reviews`);
  // The firm profile shows the aggregate rating, so refresh it too.
  revalidatePath(`/firm/${slug}`);
}
