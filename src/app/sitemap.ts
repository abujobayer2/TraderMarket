import type { MetadataRoute } from "next";
import { connectDB } from "@/lib/db";
import { PropFirm } from "@/lib/models/PropFirm";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://tradermarket.online";

  await connectDB();
  const firms = await PropFirm.find({ status: "active" }).select("slug updatedAt").lean();

  return [
    { url: base, changeFrequency: "hourly", priority: 1 },
    { url: `${base}/best-prop-trading-firms`, changeFrequency: "hourly", priority: 0.9 },
    { url: `${base}/funded-trading-programs`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/list`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/rules`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/widget`, changeFrequency: "monthly", priority: 0.5 },
    ...firms.map((firm) => ({
      url: `${base}/firm/${firm.slug}`,
      lastModified: firm.updatedAt,
      changeFrequency: "daily" as const,
      priority: 0.6,
    })),
  ];
}
