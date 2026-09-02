"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { LeaderboardEntry } from "@/lib/ranking";
import { FirmSearchSelect } from "../FirmSearchSelect";

type LeaderboardResponse = { leaderboard: LeaderboardEntry[] };

type Variant =
  | "micro-star"
  | "micro-count"
  | "mini"
  | "card"
  | "quote"
  | "list"
  | "grid"
  | "carousel"
  | "collector";
type Theme = "light" | "dark";
type Platform = "html" | "react" | "next" | "vue" | "php" | "iframe";

const VARIANT_OPTIONS: { id: Variant; label: string; hint: string }[] = [
  { id: "mini", label: "Mini", hint: "Logo, stars, score — the classic" },
  { id: "micro-star", label: "Micro Star", hint: "Rating word + stars + logo, one line" },
  { id: "micro-count", label: "Micro Combo", hint: "Word + stars + review count, one line" },
  { id: "carousel", label: "Carousel", hint: "Score header + auto-rotating reviews" },
  { id: "card", label: "Card", hint: "Summary + firm logo + button" },
  { id: "quote", label: "Quote", hint: "One featured review" },
  { id: "list", label: "List", hint: "Summary + stacked reviews" },
  { id: "grid", label: "Grid", hint: "Summary + review grid" },
  { id: "collector", label: "Review Collector", hint: "Call-to-action to rate you" },
];

const COUNT_VARIANTS: Variant[] = ["list", "grid", "carousel"];

const PLATFORMS: { id: Platform; label: string }[] = [
  { id: "html", label: "HTML" },
  { id: "react", label: "React" },
  { id: "next", label: "Next.js" },
  { id: "vue", label: "Vue" },
  { id: "php", label: "PHP · WordPress" },
  { id: "iframe", label: "iframe" },
];

function buildSnippet(
  platform: Platform,
  origin: string,
  slug: string,
  variant: Variant,
  theme: Theme,
  count: number
): string {
  const loader = `${origin}/reviews-widget.js`;
  const withCount = COUNT_VARIANTS.includes(variant);
  const dataAttrs = [
    `data-firm="${slug}"`,
    `data-variant="${variant}"`,
    `data-theme="${theme}"`,
    withCount ? `data-reviews="${count}"` : "",
  ].filter(Boolean);

  switch (platform) {
    case "html":
      return [
        `<!-- 1 · Place this where the widget should appear -->`,
        `<div class="tradermarket-reviews"`,
        `     ${dataAttrs.join("\n     ")}></div>`,
        ``,
        `<!-- 2 · Add this once, just before </body> -->`,
        `<script async src="${loader}"></script>`,
      ].join("\n");

    case "react":
      return [
        `// TraderMarketReviews.jsx — no dependencies, works in any React app`,
        `import { useEffect, useRef } from "react";`,
        ``,
        `const LOADER = "${loader}";`,
        ``,
        `export function TraderMarketReviews({`,
        `  firm, variant = "mini", theme = "light", reviews,`,
        `}) {`,
        `  const ref = useRef(null);`,
        `  useEffect(() => {`,
        `    const node = ref.current;`,
        `    if (node?.shadowRoot) {`,
        `      node.shadowRoot.innerHTML = "";`,
        `      node.removeAttribute("data-tm-rendered");`,
        `    }`,
        `    if (!document.querySelector(\`script[src="\${LOADER}"]\`)) {`,
        `      const s = document.createElement("script");`,
        `      s.src = LOADER; s.async = true;`,
        `      document.body.appendChild(s);`,
        `    }`,
        `    const t = setTimeout(() => window.TraderMarketReviews?.render(), 0);`,
        `    return () => clearTimeout(t);`,
        `  }, [firm, variant, theme, reviews]);`,
        ``,
        `  return (`,
        `    <div`,
        `      ref={ref}`,
        `      className="tradermarket-reviews"`,
        `      data-firm={firm}`,
        `      data-variant={variant}`,
        `      data-theme={theme}`,
        `      {...(reviews ? { "data-reviews": reviews } : {})}`,
        `    />`,
        `  );`,
        `}`,
        ``,
        `// Usage:`,
        `// <TraderMarketReviews firm="${slug}" variant="${variant}" theme="${theme}"${
          withCount ? ` reviews={${count}}` : ""
        } />`,
      ].join("\n");

    case "next":
      return [
        `// 1 · app/layout.tsx — load the loader once, inside <body>`,
        `import Script from "next/script";`,
        ``,
        `<Script src="${loader}" strategy="afterInteractive" />`,
        ``,
        `// 2 · Anywhere (Server or Client Component) — just markup:`,
        `<div`,
        `  className="tradermarket-reviews"`,
        `  ${dataAttrs.map((a) => a.replace(/^data-/, "data-")).join("\n  ")}`,
        `/>`,
        ``,
        `// The loader re-scans on client-side navigation automatically.`,
        `// If a route swaps the widget in place, call`,
        `// window.TraderMarketReviews?.render() from a useEffect.`,
      ].join("\n");

    case "vue":
      return [
        `<!-- TraderMarketReviews.vue -->`,
        `<template>`,
        `  <div`,
        `    class="tradermarket-reviews"`,
        `    :data-firm="firm"`,
        `    :data-variant="variant"`,
        `    :data-theme="theme"`,
        withCount ? `    :data-reviews="reviews"` : `    :data-reviews="reviews || undefined"`,
        `  />`,
        `</template>`,
        ``,
        `<script setup>`,
        `import { onMounted, watch } from "vue";`,
        ``,
        `const props = defineProps({`,
        `  firm: String,`,
        `  variant: { type: String, default: "mini" },`,
        `  theme: { type: String, default: "light" },`,
        `  reviews: [Number, String],`,
        `});`,
        ``,
        `const LOADER = "${loader}";`,
        `function ensure() {`,
        `  if (!document.querySelector(\`script[src="\${LOADER}"]\`)) {`,
        `    const s = document.createElement("script");`,
        `    s.src = LOADER; s.async = true;`,
        `    document.body.appendChild(s);`,
        `  } else {`,
        `    window.TraderMarketReviews?.render();`,
        `  }`,
        `}`,
        `onMounted(ensure);`,
        `watch(() => [props.firm, props.variant, props.theme, props.reviews], ensure);`,
        `</script>`,
      ].join("\n");

    case "php":
      return [
        `<!-- Template, WordPress "Custom HTML" block, or a shortcode -->`,
        `<div class="tradermarket-reviews"`,
        `     data-firm="<?= htmlspecialchars('${slug}') ?>"`,
        `     data-variant="${variant}"`,
        `     data-theme="${theme}"${withCount ? `\n     data-reviews="${count}"` : ""}></div>`,
        ``,
        `<script async src="${loader}"></script>`,
        ``,
        ``,
        `<?php`,
        `// WordPress: load the script site-wide from your theme's functions.php`,
        `add_action('wp_enqueue_scripts', function () {`,
        `  wp_enqueue_script(`,
        `    'tradermarket-reviews',`,
        `    '${loader}',`,
        `    [], null, true`,
        `  );`,
        `});`,
      ].join("\n");

    case "iframe": {
      const q = new URLSearchParams({ variant, theme });
      if (withCount) q.set("reviews", String(count));
      return [
        `<iframe`,
        `  src="${origin}/embed/reviews/${slug}?${q.toString()}"`,
        `  title="TraderMarket reviews"`,
        `  loading="lazy"`,
        `  style="width:100%;max-width:460px;height:180px;border:0;overflow:hidden"></iframe>`,
        ``,
        `<!-- Optional: let the iframe auto-fit its content height -->`,
        `<script>`,
        `window.addEventListener("message", function (e) {`,
        `  if (!e.data || e.data.type !== "tm-reviews-resize") return;`,
        `  document.querySelectorAll('iframe[src*="/embed/reviews/"]').forEach(function (f) {`,
        `    f.style.height = e.data.height + "px";`,
        `  });`,
        `});`,
        `</script>`,
      ].join("\n");
    }
  }
}

export function ReviewsWidgetGenerator() {
  const searchParams = useSearchParams();
  const presetSlug = searchParams.get("firm") || "";

  const [firms, setFirms] = useState<LeaderboardEntry[]>([]);
  const [slug, setSlug] = useState("");
  const [variant, setVariant] = useState<Variant>("mini");
  const [theme, setTheme] = useState<Theme>("light");
  const [count, setCount] = useState(3);
  const [platform, setPlatform] = useState<Platform>("html");
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((r) => r.json())
      .then((json: LeaderboardResponse) => {
        setFirms(json.leaderboard);
        const match = json.leaderboard.find((f) => f.slug === presetSlug);
        if (match) setSlug(match.slug);
        else if (json.leaderboard.length > 0) setSlug(json.leaderboard[0].slug);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const origin =
    typeof window !== "undefined" ? window.location.origin : "https://tradermarket.online";

  const showCount = COUNT_VARIANTS.includes(variant);

  const embedCode = useMemo(
    () => (slug ? buildSnippet(platform, origin, slug, variant, theme, count) : ""),
    [platform, origin, slug, variant, theme, count]
  );

  // Live preview always uses the universal method, regardless of the platform
  // tab, so the rendered result is identical to what the visitor will see.
  useEffect(() => {
    const container = previewRef.current;
    if (!container || !slug) return;
    container.innerHTML = "";
    const node = document.createElement("div");
    node.className = "tradermarket-reviews";
    node.setAttribute("data-firm", slug);
    node.setAttribute("data-theme", theme);
    node.setAttribute("data-variant", variant);
    if (COUNT_VARIANTS.includes(variant)) node.setAttribute("data-reviews", String(count));
    container.appendChild(node);

    const src = `${origin}/reviews-widget.js`;
    const w = window as unknown as { TraderMarketReviews?: { render: () => void } };
    if (!document.querySelector(`script[src="${src}"]`)) {
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      document.body.appendChild(s);
    } else if (w.TraderMarketReviews) {
      w.TraderMarketReviews.render();
    }
  }, [slug, variant, theme, count, origin]);

  function handleCopy() {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="flex flex-col gap-6 rounded-md bg-canvas-soft p-6">
        <div className="flex flex-col gap-2">
          <span className="text-[16px] font-semibold leading-[24px] text-ink">Your firm</span>
          <FirmSearchSelect firms={firms} value={slug} onChange={setSlug} />
          <span className="text-[13px] leading-[19px] text-body-mid">
            Not listed yet?{" "}
            <a href="/list" className="font-semibold text-ink hover:text-primary">
              List your firm
            </a>{" "}
            first.
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[16px] font-semibold leading-[24px] text-ink">Widget</span>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {VARIANT_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setVariant(option.id)}
                className={`flex flex-col items-start rounded-sm border px-4 py-2.5 text-left transition-colors ${
                  variant === option.id
                    ? "border-primary bg-primary text-on-primary"
                    : "border-ink/20 bg-canvas text-body hover:bg-canvas-soft"
                }`}
              >
                <span className="text-[14px] font-semibold leading-[20px]">{option.label}</span>
                <span
                  className={`text-[12px] leading-[17px] ${
                    variant === option.id ? "text-on-primary/80" : "text-body-mid"
                  }`}
                >
                  {option.hint}
                </span>
              </button>
            ))}
          </div>
        </div>

        {showCount && (
          <div className="flex flex-col gap-2">
            <span className="text-[16px] font-semibold leading-[24px] text-ink">
              Reviews shown: <span className="text-primary">{count}</span>
            </span>
            <input
              type="range"
              min={1}
              max={variant === "grid" ? 12 : 6}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="accent-primary"
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <span className="text-[16px] font-semibold leading-[24px] text-ink">Theme</span>
          <div className="grid grid-cols-2 gap-2">
            {(["light", "dark"] as Theme[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTheme(t)}
                className={`rounded-sm border px-4 py-3 text-[15px] font-semibold capitalize transition-colors ${
                  theme === t
                    ? "border-primary bg-primary text-on-primary"
                    : "border-ink/20 bg-canvas text-body hover:bg-canvas-soft"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div
          className={`flex min-h-[220px] items-center justify-center rounded-md border border-ink/10 p-8 ${
            theme === "dark" ? "bg-ink" : "bg-canvas-soft"
          }`}
        >
          <div ref={previewRef} />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {PLATFORMS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPlatform(p.id)}
              className={`rounded-sm border px-3 py-1.5 text-[13px] font-semibold transition-colors ${
                platform === p.id
                  ? "border-primary bg-primary text-on-primary"
                  : "border-ink/20 bg-canvas text-body hover:bg-canvas-soft"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="rounded-md bg-ink p-4">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium uppercase tracking-[0.5px] text-canvas-soft/70">
              {PLATFORMS.find((p) => p.id === platform)?.label} embed
            </span>
            <button
              type="button"
              onClick={handleCopy}
              disabled={!embedCode}
              className="rounded-sm bg-primary px-3 py-1.5 text-[13px] font-semibold text-on-primary hover:bg-primary-hover disabled:opacity-50"
            >
              {copied ? "Copied" : "Copy code"}
            </button>
          </div>
          <pre className="mt-3 max-h-[360px] overflow-auto whitespace-pre text-[12.5px] leading-[19px] text-canvas">
            {embedCode || "Select a firm to generate your embed code."}
          </pre>
        </div>

        <p className="text-[13px] leading-[19px] text-body-mid">
          ~5&nbsp;KB, loads async, pulls no external fonts or CSS, and renders inside an isolated
          Shadow DOM with reserved space — no layout shift, no style clashes. The rating is fetched
          live on each page load and cached at the edge.
        </p>
      </div>
    </div>
  );
}
