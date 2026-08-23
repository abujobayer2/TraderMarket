"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { LeaderboardEntry } from "@/lib/ranking";
import { FirmSearchSelect } from "./FirmSearchSelect";

type LeaderboardResponse = {
  leaderboard: LeaderboardEntry[];
};

type Style = "standard" | "small" | "horizontal" | "badge";
type Theme = "light" | "dark";

const STYLE_OPTIONS: { id: Style; label: string }[] = [
  { id: "standard", label: "Card" },
  { id: "small", label: "Compact" },
  { id: "horizontal", label: "Banner" },
  { id: "badge", label: "Partner Badge" },
];

export function WidgetGenerator() {
  const searchParams = useSearchParams();
  const presetSlug = searchParams.get("firm") || "";

  const [firms, setFirms] = useState<LeaderboardEntry[]>([]);
  const [slug, setSlug] = useState("");
  const [style, setStyle] = useState<Style>("standard");
  const [theme, setTheme] = useState<Theme>("light");
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

  const origin = typeof window !== "undefined" ? window.location.origin : "https://tradermarket.online";

  const embedCode = useMemo(() => {
    if (!slug) return "";
    return `<script\n  src="${origin}/widget.js"\n  data-firm="${slug}"\n  data-theme="${theme}"\n  data-style="${style}">\n</script>`;
  }, [slug, style, theme, origin]);

  useEffect(() => {
    const container = previewRef.current;
    if (!container || !slug) return;
    container.innerHTML = "";
    const script = document.createElement("script");
    script.src = `${origin}/widget.js`;
    script.setAttribute("data-firm", slug);
    script.setAttribute("data-theme", theme);
    script.setAttribute("data-style", style);
    container.appendChild(script);
  }, [slug, style, theme, origin]);

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
            Not listed yet? <a href="/list" className="font-semibold text-ink hover:text-primary">List your firm</a> first.
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[16px] font-semibold leading-[24px] text-ink">Style</span>
          <div className="grid grid-cols-2 gap-2">
            {STYLE_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setStyle(option.id)}
                className={`rounded-sm border px-4 py-3 text-[15px] font-semibold transition-colors ${
                  style === option.id
                    ? "border-primary bg-primary text-on-primary"
                    : "border-ink/20 bg-canvas text-body hover:bg-canvas-soft"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

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
        <div className="flex min-h-[180px] items-center justify-center rounded-md border border-ink/10 bg-canvas-soft p-8">
          <div ref={previewRef} />
        </div>

        <div className="rounded-md bg-ink p-4">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium uppercase tracking-[0.5px] text-canvas-soft/70">
              Embed code
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
          <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-all text-[13px] leading-[20px] text-canvas">
            {embedCode || "Select a firm to generate your embed code."}
          </pre>
        </div>
      </div>
    </div>
  );
}
