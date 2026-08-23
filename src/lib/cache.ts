import { revalidatePath } from "next/cache";

export function revalidateLeaderboard(slug?: string) {
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  if (slug) revalidatePath(`/firm/${slug}`);
}
