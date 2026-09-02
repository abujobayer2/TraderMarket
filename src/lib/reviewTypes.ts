// Standalone (no mongoose import) so client components can use it without
// pulling the DB driver into the browser bundle.
export const TRADER_TYPES = [
  "Challenge phase",
  "Funded trader",
  "Payout received",
  "Prospective customer",
  "Other",
] as const;

export type TraderType = (typeof TRADER_TYPES)[number];
