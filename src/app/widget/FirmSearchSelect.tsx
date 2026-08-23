"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import type { LeaderboardEntry } from "@/lib/ranking";

type Props = {
  firms: LeaderboardEntry[];
  value: string;
  onChange: (slug: string) => void;
};

export function FirmSearchSelect({ firms, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = firms.find((f) => f.slug === value) || null;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return firms;
    return firms.filter((f) => f.name.toLowerCase().includes(q));
  }, [firms, query]);

  function handleSelect(slug: string) {
    onChange(slug);
    setOpen(false);
    setQuery("");
  }

  function openDropdown() {
    setOpen(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={openDropdown}
        className="flex w-full items-center gap-3 rounded-sm border border-ink bg-canvas px-4 py-3 text-left outline-none focus:border-primary"
      >
        {selected ? (
          <>
            {selected.logoUrl ? (
              <Image src={selected.logoUrl} alt="" width={24} height={24} className="h-6 w-6 shrink-0 rounded-sm object-cover" />
            ) : (
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-canvas-soft text-[11px] font-semibold text-ink">
                {selected.name.slice(0, 1).toUpperCase()}
              </div>
            )}
            <span className="flex-1 truncate text-[16px] leading-[24px] text-ink">
              <span className="font-semibold text-primary">#{selected.rank}</span> {selected.name}
            </span>
          </>
        ) : (
          <span className="flex-1 text-[16px] leading-[24px] text-body-mid">
            {firms.length === 0 ? "No active listings yet" : "Select your firm"}
          </span>
        )}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 text-body-mid">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-md border border-ink/15 bg-canvas shadow-lg">
          <div className="border-b border-ink/10 p-2">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your firm…"
              className="w-full rounded-sm border border-ink/15 bg-canvas-soft px-3 py-2 text-[15px] text-ink outline-none focus:border-primary"
            />
          </div>
          <ul className="max-h-64 overflow-y-auto">
            {results.length === 0 && (
              <li className="px-4 py-3 text-[14px] text-body-mid">No firms match &quot;{query}&quot;.</li>
            )}
            {results.map((f) => (
              <li key={f.slug}>
                <button
                  type="button"
                  onClick={() => handleSelect(f.slug)}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    f.slug === value ? "bg-primary/10" : "hover:bg-canvas-soft"
                  }`}
                >
                  {f.logoUrl ? (
                    <Image src={f.logoUrl} alt="" width={28} height={28} className="h-7 w-7 shrink-0 rounded-sm object-cover" />
                  ) : (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-canvas-soft text-[12px] font-semibold text-ink">
                      {f.name.slice(0, 1).toUpperCase()}
                    </div>
                  )}
                  <span className="flex-1 truncate text-[15px] text-ink">{f.name}</span>
                  <span className="shrink-0 text-[13px] font-semibold text-primary">#{f.rank}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
