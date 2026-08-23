import type { MetadataRoute } from "next";

// AI crawlers are allowed explicitly (rather than just not being blocked by
// the wildcard rule) so it's a deliberate, visible choice — these are the
// user-agents behind AI Overviews, ChatGPT browsing, Perplexity, and Copilot.
const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "Google-Extended",
  "PerplexityBot",
  "ClaudeBot",
  "anthropic-ai",
  "Claude-Web",
  "CCBot",
  "Bingbot",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://tradermarket.online";
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/success"] },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/", "/success"],
      })),
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
