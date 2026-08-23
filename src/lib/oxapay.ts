import crypto from "crypto";

const OXAPAY_API_BASE = "https://api.oxapay.com/v1";

function getApiKey() {
  const key = process.env.OXAPAY_MERCHANT_API_KEY;
  if (!key) throw new Error("Missing payment provider API key");
  return key;
}

export type CreateWhiteLabelInput = {
  amount: number;
  orderId: string;
  description: string;
  callbackUrl: string;
  payCurrency: string;
  network: string;
  email?: string;
};

export type CreateWhiteLabelResult = {
  trackId: string;
  payAddress: string;
  payAmount: number;
  payCurrency: string;
  network: string;
  qrCode: string;
  expiredAt: number;
};

export async function createOxapayWhiteLabel(
  input: CreateWhiteLabelInput
): Promise<CreateWhiteLabelResult> {
  const res = await fetch(`${OXAPAY_API_BASE}/payment/white-label`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      merchant_api_key: getApiKey(),
    },
    body: JSON.stringify({
      amount: input.amount,
      currency: "USD",
      pay_currency: input.payCurrency,
      network: input.network,
      lifetime: 60,
      fee_paid_by_payer: 1,
      under_paid_coverage: 2.5,
      order_id: input.orderId,
      description: input.description,
      callback_url: input.callbackUrl,
      email: input.email,
    }),
  });

  const json = await res.json();

  // OxaPay always returns an `error` object (empty `{}` on success), so a
  // truthy check on it alone false-positives. `status !== 200` is the real
  // failure signal.
  if (!res.ok || json?.status !== 200) {
    throw new Error(json?.message || "Failed to create payment");
  }

  const data = json.data ?? {};
  return {
    trackId: String(data.track_id),
    payAddress: String(data.address),
    payAmount: Number(data.pay_amount),
    payCurrency: String(data.pay_currency ?? input.payCurrency),
    network: String(data.network ?? input.network),
    qrCode: String(data.qr_code ?? ""),
    expiredAt: Number(data.expired_at ?? 0),
  };
}

export async function getOxapayPaymentStatus(trackId: string) {
  const res = await fetch(`${OXAPAY_API_BASE}/payment/${trackId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      merchant_api_key: getApiKey(),
    },
    cache: "no-store",
  });

  const json = await res.json();
  if (!res.ok || json?.status !== 200) {
    throw new Error(json?.message || "Failed to fetch payment status");
  }
  return json.data;
}

let acceptedCurrenciesCache: { list: string[]; fetchedAt: number } | null = null;
const ACCEPTED_CURRENCIES_TTL_MS = 5 * 60 * 1000;

export async function getOxapayAcceptedCurrencies(): Promise<string[]> {
  const now = Date.now();
  if (acceptedCurrenciesCache && now - acceptedCurrenciesCache.fetchedAt < ACCEPTED_CURRENCIES_TTL_MS) {
    return acceptedCurrenciesCache.list;
  }

  const res = await fetch(`${OXAPAY_API_BASE}/payment/accepted-currencies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      merchant_api_key: getApiKey(),
    },
    cache: "no-store",
  });

  const json = await res.json();
  if (!res.ok || json?.status !== 200) {
    throw new Error(json?.message || "Failed to fetch accepted currencies");
  }

  const list: string[] = Array.isArray(json?.data?.list) ? json.data.list : [];
  acceptedCurrenciesCache = { list, fetchedAt: now };
  return list;
}

export function verifyOxapayHmac(rawBody: string, hmacHeader: string | null): boolean {
  if (!hmacHeader) return false;
  const computed = crypto.createHmac("sha512", getApiKey()).update(rawBody).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(hmacHeader));
  } catch {
    return false;
  }
}

// OxaPay's payment lifecycle: "Paying" fires once the payer has broadcast a
// transaction but it's still awaiting network confirmations; "Paid" fires
// once it's confirmed and credited. Only "Paid" should unlock the listing.
export function isPaidStatus(status: string | undefined | null): boolean {
  return (status ?? "").toLowerCase() === "paid";
}

export function isPayingStatus(status: string | undefined | null): boolean {
  const normalized = (status ?? "").toLowerCase();
  return normalized === "paying" || normalized === "confirming";
}

export function isFailedStatus(status: string | undefined | null): boolean {
  const normalized = (status ?? "").toLowerCase();
  return normalized === "expired" || normalized === "failed";
}
