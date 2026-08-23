import { NextResponse } from "next/server";
import { getOxapayAcceptedCurrencies } from "@/lib/oxapay";
import { buildAvailablePayCurrencyOptions, CURRENCY_META, PAY_CURRENCY_OPTIONS } from "@/lib/payCurrencies";

export const dynamic = "force-dynamic";

// Matches getOxapayAcceptedCurrencies' 5-minute in-memory TTL — an edge/CDN
// cache here means most requests never reach this route handler at all.
const CACHE_HEADERS = { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" };

export async function GET() {
  try {
    const accepted = await getOxapayAcceptedCurrencies();
    const options = buildAvailablePayCurrencyOptions(accepted);
    // Fall back to the full static list if OxaPay's live list doesn't
    // overlap with anything we know how to route a payment for.
    const list = options.length > 0 ? options : PAY_CURRENCY_OPTIONS;
    return NextResponse.json(
      {
        options: list.map((o) => ({
          ...o,
          name: CURRENCY_META.find((m) => m.symbol === o.payCurrency)?.name ?? o.payCurrency,
          color: CURRENCY_META.find((m) => m.symbol === o.payCurrency)?.color ?? "#605d52",
        })),
      },
      { headers: CACHE_HEADERS }
    );
  } catch {
    return NextResponse.json({
      options: PAY_CURRENCY_OPTIONS.map((o) => ({
        ...o,
        name: CURRENCY_META.find((m) => m.symbol === o.payCurrency)?.name ?? o.payCurrency,
        color: CURRENCY_META.find((m) => m.symbol === o.payCurrency)?.color ?? "#605d52",
      })),
    });
  }
}
