"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { LeaderboardEntry } from "@/lib/ranking";
import { CurrencyIcon } from "@/components/CurrencyIcon";

type LeaderboardResponse = {
  leaderboard: LeaderboardEntry[];
  nextOpenMinimum: number;
};

type PayCurrencyOption = {
  id: string;
  label: string;
  payCurrency: string;
  network: string;
  networkLabel: string;
  name: string;
  color: string;
};

function minimumFor(leaderboard: LeaderboardEntry[], nextOpenMinimum: number, position: number) {
  const entry = leaderboard[position - 1];
  if (entry) return entry.bidAmount + 1;
  return nextOpenMinimum;
}

const MEDALS: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

function displayHost(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function faviconFor(url: string) {
  const hostname = displayHost(url);
  if (!hostname) return "";
  return `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;
}

export function ListWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const presetPosition = Number(searchParams.get("position") || 0);
  const presetAmount = Number(searchParams.get("amount") || 0);
  const presetWebsiteUrl = searchParams.get("websiteUrl") || "";

  const [data, setData] = useState<LeaderboardResponse | null>(null);
  const [loadingBoard, setLoadingBoard] = useState(true);

  const [name, setName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState(presetWebsiteUrl);
  const [description, setDescription] = useState("");

  const [position, setPosition] = useState<number>(1);
  const [amount, setAmount] = useState<number>(10);
  const [amountTouched, setAmountTouched] = useState(false);
  const [payOptions, setPayOptions] = useState<PayCurrencyOption[]>([]);
  const [loadingCurrencies, setLoadingCurrencies] = useState(true);
  const [payCurrencyId, setPayCurrencyId] = useState("");
  const [currencyMenuOpen, setCurrencyMenuOpen] = useState(false);
  const [currencyQuery, setCurrencyQuery] = useState("");
  const currencyMenuRef = useRef<HTMLDivElement>(null);
  const [positionMenuOpen, setPositionMenuOpen] = useState(false);
  const [positionQuery, setPositionQuery] = useState("");
  const positionMenuRef = useRef<HTMLDivElement>(null);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((r) => r.json())
      .then((json: LeaderboardResponse) => {
        setData(json);
        const openPosition = json.leaderboard.length + 1;
        const initialPosition = presetPosition > 0 ? presetPosition : openPosition;
        setPosition(initialPosition);
        const min = minimumFor(json.leaderboard, json.nextOpenMinimum, initialPosition);
        if (presetAmount >= min) {
          setAmount(presetAmount);
          setAmountTouched(true);
        } else {
          setAmount(min);
        }
      })
      .finally(() => setLoadingBoard(false));

    fetch("/api/oxapay/currencies")
      .then((r) => r.json())
      .then((json: { options: PayCurrencyOption[] }) => {
        setPayOptions(json.options);
        setPayCurrencyId((current) => current || json.options[0]?.id || "");
      })
      .finally(() => setLoadingCurrencies(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (currencyMenuRef.current && !currencyMenuRef.current.contains(e.target as Node)) {
        setCurrencyMenuOpen(false);
      }
      if (positionMenuRef.current && !positionMenuRef.current.contains(e.target as Node)) {
        setPositionMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedCurrency = useMemo(
    () => payOptions.find((o) => o.id === payCurrencyId),
    [payOptions, payCurrencyId]
  );

  const filteredCurrencyOptions = useMemo(() => {
    const q = currencyQuery.trim().toLowerCase();
    if (!q) return payOptions;
    return payOptions.filter(
      (o) =>
        o.payCurrency.toLowerCase().includes(q) ||
        o.name.toLowerCase().includes(q) ||
        o.networkLabel.toLowerCase().includes(q) ||
        o.network.toLowerCase().includes(q)
    );
  }, [payOptions, currencyQuery]);

  const positions = useMemo(() => {
    if (!data) return [];
    const openPosition = data.leaderboard.length + 1;
    const rows = data.leaderboard.map((e) => ({
      position: e.rank,
      label: e.name,
      currentBid: e.bidAmount,
      minimum: e.bidAmount + 1,
      logoUrl: e.logoUrl,
      websiteUrl: e.websiteUrl,
    }));
    rows.push({
      position: openPosition,
      label: "Open position",
      currentBid: 0,
      minimum: data.nextOpenMinimum,
      logoUrl: "",
      websiteUrl: "",
    });
    return rows;
  }, [data]);

  function handlePositionSelect(p: number) {
    setPosition(p);
    if (!data) return;
    const min = minimumFor(data.leaderboard, data.nextOpenMinimum, p);
    if (!amountTouched || amount < min) setAmount(min);
  }

  const selectedPositionRow = useMemo(
    () => positions.find((row) => row.position === position),
    [positions, position]
  );

  const filteredPositions = useMemo(() => {
    const q = positionQuery.trim().toLowerCase();
    if (!q) return positions;
    return positions.filter(
      (row) => row.label.toLowerCase().includes(q) || String(row.position).includes(q)
    );
  }, [positions, positionQuery]);

  const previewLogoUrl = useMemo(() => faviconFor(websiteUrl), [websiteUrl]);
  const previewHost = useMemo(() => displayHost(websiteUrl), [websiteUrl]);
  const showPreview = name.trim().length > 0 || websiteUrl.trim().length > 0;

  const requiredMinimum = data ? minimumFor(data.leaderboard, data.nextOpenMinimum, position) : 10;
  const canSubmit =
    name.trim().length > 1 &&
    websiteUrl.trim().length > 3 &&
    amount >= requiredMinimum &&
    payCurrencyId.length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          websiteUrl,
          description,
          position,
          amount,
          payCurrencyId,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      router.push(`/success?bidId=${json.bidId}`);
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-10">
      <fieldset className="flex flex-col gap-4 rounded-md bg-canvas p-6">
        <legend className="px-1 text-[20px] font-semibold leading-[25px] tracking-[-0.5px] text-ink">
          Your prop firm
        </legend>

        <label className="flex flex-col gap-2">
          <span className="text-[16px] font-semibold leading-[24px] text-ink">Firm name</span>
          <input
            required
            maxLength={120}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Prop Firm Name"
            className="rounded-sm border border-ink bg-canvas px-4 py-3 text-[18px] leading-[27px] text-ink outline-none focus:border-primary"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[16px] font-semibold leading-[24px] text-ink">Website URL</span>
          <input
            required
            type="url"
            maxLength={300}
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="https://yourpropfirm.com"
            className="rounded-sm border border-ink bg-canvas px-4 py-3 text-[18px] leading-[27px] text-ink outline-none focus:border-primary"
          />
          <span className="text-[13px] leading-[19px] text-body-mid">
            Your logo is pulled automatically from this domain — no upload needed.
          </span>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[16px] font-semibold leading-[24px] text-ink">Description</span>
          <textarea
            maxLength={1000}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell traders about your prop firm."
            rows={4}
            className="rounded-sm border border-ink bg-canvas px-4 py-3 text-[18px] leading-[27px] text-ink outline-none focus:border-primary"
          />
          <span className="text-[14px] leading-[21px] text-mute">{description.length}/1000</span>
        </label>

        {showPreview && (
          <div className="flex items-center gap-4 rounded-md bg-canvas-soft p-4">
            {previewLogoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewLogoUrl}
                alt=""
                className="h-12 w-12 shrink-0 rounded-md bg-canvas object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-canvas text-[18px] font-semibold text-ink">
                {(name || "?").slice(0, 1).toUpperCase()}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase leading-[14px] tracking-[1px] text-body-mid">
                Listing preview
              </p>
              <p className="truncate text-[16px] font-semibold leading-[22px] text-ink">
                {name || "Your Prop Firm"}
              </p>
              <p className="truncate text-[13px] leading-[18px] text-body-mid">
                {previewHost || "yourpropfirm.com"}
              </p>
            </div>
          </div>
        )}
      </fieldset>

      <fieldset className="flex flex-col gap-4 rounded-md bg-canvas p-6">
        <legend className="px-1 text-[20px] font-semibold leading-[25px] tracking-[-0.5px] text-ink">
          Select your position
        </legend>

        {loadingBoard ? (
          <div className="h-[52px] animate-pulse rounded-md bg-canvas-soft" />
        ) : (
          <div className="relative" ref={positionMenuRef}>
            <button
              type="button"
              onClick={() => {
                setPositionMenuOpen((open) => !open);
                setPositionQuery("");
              }}
              aria-haspopup="listbox"
              aria-expanded={positionMenuOpen}
              className={`flex w-full items-center justify-between gap-3 rounded-sm border px-4 py-3 text-left transition-colors ${
                positionMenuOpen
                  ? "border-primary bg-canvas"
                  : "border-ink/20 bg-canvas hover:bg-canvas-soft"
              }`}
            >
              {selectedPositionRow ? (
                <span className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-canvas-soft text-[18px]">
                    {MEDALS[selectedPositionRow.position] ??
                      (selectedPositionRow.logoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={selectedPositionRow.logoUrl}
                          alt=""
                          className="h-9 w-9 rounded-md object-cover"
                        />
                      ) : (
                        <span className="text-[13px] font-semibold text-body-mid">
                          #{selectedPositionRow.position}
                        </span>
                      ))}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[16px] font-semibold leading-[22px] text-ink">
                      #{selectedPositionRow.position} — {selectedPositionRow.label}
                    </span>
                    <span className="text-[12px] leading-[16px] text-body-mid">
                      {selectedPositionRow.currentBid > 0
                        ? `current $${selectedPositionRow.currentBid} · min $${selectedPositionRow.minimum}`
                        : `min $${selectedPositionRow.minimum}`}
                    </span>
                  </span>
                </span>
              ) : (
                <span className="text-[16px] text-body-mid">Select a position</span>
              )}
              <span
                className={`text-[12px] text-body-mid transition-transform ${
                  positionMenuOpen ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {positionMenuOpen && (
              <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-md border border-ink/10 bg-canvas shadow-lg">
                <div className="border-b border-ink/10 p-2">
                  <input
                    autoFocus
                    value={positionQuery}
                    onChange={(e) => setPositionQuery(e.target.value)}
                    placeholder="Search a firm or position number…"
                    className="w-full rounded-sm border border-ink/20 bg-canvas px-3 py-2 text-[15px] leading-[22px] text-ink outline-none focus:border-primary"
                  />
                </div>
                <div role="listbox" className="max-h-64 overflow-y-auto p-1">
                  {filteredPositions.length === 0 ? (
                    <p className="px-3 py-4 text-center text-[14px] text-body-mid">
                      No position matches &ldquo;{positionQuery}&rdquo;.
                    </p>
                  ) : (
                    filteredPositions.map((row) => {
                      const selected = position === row.position;
                      return (
                        <button
                          type="button"
                          key={row.position}
                          role="option"
                          aria-selected={selected}
                          onClick={() => {
                            handlePositionSelect(row.position);
                            setPositionMenuOpen(false);
                          }}
                          className={`flex w-full items-center justify-between gap-3 rounded-sm px-3 py-2 text-left transition-colors ${
                            selected ? "bg-primary/10" : "hover:bg-canvas-soft"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-canvas-soft text-[16px]">
                              {MEDALS[row.position] ??
                                (row.logoUrl ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img src={row.logoUrl} alt="" className="h-8 w-8 rounded-md object-cover" />
                                ) : (
                                  <span className="text-[12px] font-semibold text-body-mid">
                                    #{row.position}
                                  </span>
                                ))}
                            </span>
                            <span className="flex flex-col">
                              <span className="text-[15px] font-semibold leading-[20px] text-ink">
                                #{row.position} — {row.label}
                              </span>
                              {row.currentBid > 0 && (
                                <span className="text-[12px] leading-[16px] text-body-mid">
                                  current ${row.currentBid}
                                </span>
                              )}
                            </span>
                          </span>
                          <span className="flex items-center gap-2">
                            <span className="text-[14px] font-semibold leading-[20px] text-primary">
                              min ${row.minimum}
                            </span>
                            {selected && <span className="text-[14px] text-primary">✓</span>}
                          </span>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <label className="mt-2 flex flex-col gap-2">
          <span className="text-[16px] font-semibold leading-[24px] text-ink">Your bid ($)</span>
          <input
            required
            type="number"
            min={requiredMinimum}
            step={1}
            value={amount}
            onChange={(e) => {
              setAmountTouched(true);
              setAmount(Number(e.target.value));
            }}
            className="rounded-sm border border-ink bg-canvas px-4 py-3 text-[18px] leading-[27px] text-ink outline-none focus:border-primary"
          />
          <span className="text-[14px] leading-[21px] text-body-mid">
            Minimum for position #{position} is ${requiredMinimum}. Bidding higher only
            improves your final rank.
          </span>
        </label>
      </fieldset>

      <fieldset className="flex flex-col gap-4 rounded-md bg-canvas p-6">
        <legend className="px-1 text-[20px] font-semibold leading-[25px] tracking-[-0.5px] text-ink">
          Pay with crypto
        </legend>
        {loadingCurrencies ? (
          <div className="h-[52px] animate-pulse rounded-md bg-canvas-soft" />
        ) : (
          <div className="relative" ref={currencyMenuRef}>
            <button
              type="button"
              onClick={() => {
                setCurrencyMenuOpen((open) => !open);
                setCurrencyQuery("");
              }}
              aria-haspopup="listbox"
              aria-expanded={currencyMenuOpen}
              className={`flex w-full items-center justify-between gap-3 rounded-sm border px-4 py-3 text-left transition-colors ${
                currencyMenuOpen
                  ? "border-primary bg-canvas"
                  : "border-ink/20 bg-canvas hover:bg-canvas-soft"
              }`}
            >
              {selectedCurrency ? (
                <span className="flex items-center gap-3">
                  <CurrencyIcon symbol={selectedCurrency.payCurrency} color={selectedCurrency.color} />
                  <span className="flex flex-col">
                    <span className="text-[16px] font-semibold leading-[22px] text-ink">
                      {selectedCurrency.payCurrency}
                      <span className="ml-1 font-normal text-body-mid">— {selectedCurrency.name}</span>
                    </span>
                    <span className="text-[12px] leading-[16px] text-body-mid">
                      {selectedCurrency.networkLabel}
                    </span>
                  </span>
                </span>
              ) : (
                <span className="text-[16px] text-body-mid">Select a currency</span>
              )}
              <span
                className={`text-[12px] text-body-mid transition-transform ${
                  currencyMenuOpen ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {currencyMenuOpen && (
              <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-md border border-ink/10 bg-canvas shadow-lg">
                <div className="border-b border-ink/10 p-2">
                  <input
                    autoFocus
                    value={currencyQuery}
                    onChange={(e) => setCurrencyQuery(e.target.value)}
                    placeholder="Search BTC, USDT, TRC20…"
                    className="w-full rounded-sm border border-ink/20 bg-canvas px-3 py-2 text-[15px] leading-[22px] text-ink outline-none focus:border-primary"
                  />
                </div>
                <div role="listbox" className="max-h-64 overflow-y-auto p-1">
                  {filteredCurrencyOptions.length === 0 ? (
                    <p className="px-3 py-4 text-center text-[14px] text-body-mid">
                      No currency matches &ldquo;{currencyQuery}&rdquo;.
                    </p>
                  ) : (
                    filteredCurrencyOptions.map((option) => {
                      const selected = payCurrencyId === option.id;
                      return (
                        <button
                          type="button"
                          key={option.id}
                          role="option"
                          aria-selected={selected}
                          onClick={() => {
                            setPayCurrencyId(option.id);
                            setCurrencyMenuOpen(false);
                          }}
                          className={`flex w-full items-center justify-between gap-3 rounded-sm px-3 py-2 text-left transition-colors ${
                            selected ? "bg-primary/10" : "hover:bg-canvas-soft"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <CurrencyIcon symbol={option.payCurrency} color={option.color} size={24} />
                            <span className="flex flex-col">
                              <span className="text-[15px] font-semibold leading-[20px] text-ink">
                                {option.payCurrency}
                                <span className="ml-1 font-normal text-body-mid">— {option.name}</span>
                              </span>
                              <span className="text-[12px] leading-[16px] text-body-mid">
                                {option.networkLabel}
                              </span>
                            </span>
                          </span>
                          {selected && <span className="text-[14px] text-primary">✓</span>}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        <p className="text-[14px] leading-[21px] text-body-mid">
          You&apos;ll get a deposit address on the next page. Your listing goes live once the
          network confirms the payment.
        </p>
      </fieldset>

      <div className="rounded-md bg-ink p-6 text-canvas">
        <p className="text-[14px] uppercase leading-[14px] tracking-[1px] text-canvas-soft/70">
          Total
        </p>
        <p className="mt-2 text-[48px] font-medium leading-[48px] text-canvas">${amount || 0}</p>
        <p className="mt-2 text-[14px] leading-[21px] text-canvas-soft/70">
          One-time payment via crypto. No subscription.
        </p>
      </div>

      {error && (
        <p className="rounded-md bg-primary/10 px-4 py-3 text-[16px] leading-[24px] text-primary">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit || submitting}
        className="rounded-md bg-primary px-6 py-3 text-[18px] font-semibold leading-[27px] text-on-primary transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? "Creating payment…" : `Pay $${amount || 0} & claim #${position}`}
      </button>
    </form>
  );
}
