export type PayCurrencyOption = {
  id: string;
  label: string;
  payCurrency: string;
  network: string;
  networkLabel: string;
};

export type CurrencyMeta = {
  symbol: string;
  name: string;
  color: string;
  networks: { network: string; networkLabel: string }[];
};

// Curated to combinations OxaPay's docs confirm explicitly — an unlisted
// pay_currency/network pair can be rejected by their API at invoice time.
// The set of *currencies* actually offered is filtered at request time
// against OxaPay's live /payment/accepted-currencies response — see
// /api/oxapay/currencies.
export const CURRENCY_META: CurrencyMeta[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    color: "#F7931A",
    networks: [{ network: "BTC", networkLabel: "Bitcoin" }],
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    color: "#627EEA",
    networks: [{ network: "ERC20", networkLabel: "Ethereum (ERC20)" }],
  },
  {
    symbol: "USDT",
    name: "Tether",
    color: "#26A17B",
    networks: [
      { network: "TRC20", networkLabel: "Tron (TRC20)" },
      { network: "BEP20", networkLabel: "BNB Smart Chain (BEP20)" },
    ],
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    color: "#2775CA",
    networks: [
      { network: "ERC20", networkLabel: "Ethereum (ERC20)" },
      { network: "BEP20", networkLabel: "BNB Smart Chain (BEP20)" },
    ],
  },
  {
    symbol: "BNB",
    name: "BNB",
    color: "#F3BA2F",
    networks: [{ network: "BEP20", networkLabel: "BNB Smart Chain" }],
  },
  {
    symbol: "DOGE",
    name: "Dogecoin",
    color: "#C2A633",
    networks: [{ network: "DOGE", networkLabel: "Dogecoin" }],
  },
  {
    symbol: "TRX",
    name: "Tron",
    color: "#EF0027",
    networks: [{ network: "TRC20", networkLabel: "Tron" }],
  },
];

export function optionId(symbol: string, network: string) {
  return `${symbol.toLowerCase()}-${network.toLowerCase()}`;
}

function buildOptions(symbols?: string[]): PayCurrencyOption[] {
  const allowed = symbols ? new Set(symbols.map((s) => s.toUpperCase())) : null;
  const options: PayCurrencyOption[] = [];
  for (const meta of CURRENCY_META) {
    if (allowed && !allowed.has(meta.symbol)) continue;
    for (const { network, networkLabel } of meta.networks) {
      options.push({
        id: optionId(meta.symbol, network),
        label: `${meta.symbol} (${network})`,
        payCurrency: meta.symbol,
        network,
        networkLabel,
      });
    }
  }
  return options;
}

// Full static superset — used server-side to validate a submitted option id
// even if the live accepted-currencies list is momentarily unavailable.
export const PAY_CURRENCY_OPTIONS: PayCurrencyOption[] = buildOptions();

// Options limited to what OxaPay is currently accepting, for client display.
export function buildAvailablePayCurrencyOptions(acceptedSymbols: string[]): PayCurrencyOption[] {
  return buildOptions(acceptedSymbols);
}

export function findPayCurrencyOption(id: string): PayCurrencyOption | undefined {
  return PAY_CURRENCY_OPTIONS.find((o) => o.id === id);
}
