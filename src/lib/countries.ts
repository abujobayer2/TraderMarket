// Country profiles for the /prop-firms/[country] guides. Prop firms are
// global — the PropFirm model has no per-country eligibility data, so these
// pages never claim "firm X accepts traders from Y." Differentiation instead
// comes from real, hedged facts: how each country regulates retail forex/CFD
// trading, session-overlap timing, and funding/payout considerations. Keep
// every regulatoryNote hedged ("generally", "verify current rules") — this is
// informational content, not legal/tax advice.

export type CountryRegion = "North America" | "UK & Europe" | "Asia-Pacific" | "Middle East & Africa";

export type CountryProfile = {
  slug: string;
  name: string;
  region: CountryRegion;
  currency: string;
  utcOffset: string;
  regulator: string | null;
  sessionNote: string;
  regulatoryNote: string;
  paymentNote: string;
  recommendedAssetClass: "forex" | "futures" | "multi";
  faq?: { q: string; a: string };
};

export const COUNTRIES: CountryProfile[] = [
  {
    slug: "united-states",
    name: "United States",
    region: "North America",
    currency: "USD",
    utcOffset: "UTC-5 to UTC-8",
    regulator: "CFTC / NFA",
    sessionNote:
      "The US trading day sits inside the New York session by definition, and the London/New York overlap — the most liquid window of the day — falls in a normal US working morning, roughly 8am-noon Eastern.",
    regulatoryNote:
      "The CFTC and NFA tightly regulate retail forex, capping leverage on major pairs around 1:50 and requiring FIFO order handling with no hedging at NFA-member brokers. That regulatory weight is exactly why the US-facing prop firm market looks different from the rest of the world: most multi-asset firms offering funded CFD/forex challenges exclude US residents outright, because a leveraged CFD product is legally awkward for US persons. CME-cleared futures don't have that problem, which is why futures-only firms (Topstep-style evaluations trading ES, NQ, CL, and similar contracts) dominate the US market.",
    paymentNote:
      "Card funding is standard for evaluation fees; payouts typically arrive via ACH or bank wire. Futures trading gains can qualify for Section 1256 60/40 tax treatment in the US — a meaningfully different (often better) rate than ordinary income, so it's worth a conversation with a US tax preparer who has handled trader accounts before.",
    recommendedAssetClass: "futures",
    faq: {
      q: "Why do so many prop firms exclude US traders?",
      a: "Most multi-asset prop firms run funded accounts as CFD-style products, which sit in a legally awkward spot for US persons under CFTC/NFA rules — so many firms simply geo-block the US rather than navigate it. CME-cleared futures don't have this issue, which is why the US market is dominated by futures-only firms instead.",
    },
  },
  {
    slug: "canada",
    name: "Canada",
    region: "North America",
    currency: "CAD",
    utcOffset: "UTC-3:30 to UTC-8",
    regulator: "CIRO",
    sessionNote:
      "Canada spans six time zones, but Eastern Canada — home to most traders — overlaps the full London/New York window in the local morning and early afternoon, the same as US Eastern.",
    regulatoryNote:
      "CIRO (the merged investment and mutual fund regulator) and provincial securities commissions oversee retail CFD/forex distribution, generally capping leverage lower than the offshore-broker norm. Prop firm evaluations are structured as demo-funded challenges rather than live regulated brokerage accounts, so they sit outside that specific framework — and unlike the US, most global forex and futures prop firms accept Canadian residents without restriction.",
    paymentNote:
      "Card funding is standard; USD-denominated payouts typically arrive by wire or Wise, so factor in the CAD/USD conversion spread. Trading profits are taxable as either business or investment income in Canada depending on how CRA classifies your activity.",
    recommendedAssetClass: "multi",
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    region: "UK & Europe",
    currency: "GBP",
    utcOffset: "UTC+0 (UTC+1 in summer)",
    regulator: "FCA",
    sessionNote:
      "The UK sits at the center of the London session — the largest, most liquid FX session of the day — and gets the London/New York overlap in the local afternoon without any timezone disadvantage at all.",
    regulatoryNote:
      "The FCA caps retail CFD/forex leverage under its product-intervention rules (broadly mirroring the old ESMA limits — around 1:30 on major pairs, lower on minors and crypto) and requires negative-balance protection at FCA-regulated brokers. Because a prop firm challenge is typically a simulated/demo-funded product rather than a live leveraged brokerage account, it sits outside this specific cap — but the broker or liquidity provider behind a firm's live execution still matters, so check that separately from the firm's own marketing.",
    paymentNote:
      "Card and open-banking payments are standard for evaluation fees. Most firms still settle payouts in USD even for UK traders, so check the conversion method. HMRC's treatment of trading gains (income vs capital gains) depends on frequency and intent — worth confirming your own classification.",
    recommendedAssetClass: "multi",
  },
  {
    slug: "germany",
    name: "Germany",
    region: "UK & Europe",
    currency: "EUR",
    utcOffset: "UTC+1 (CET)",
    regulator: "BaFin",
    sessionNote:
      "Germany's business day opens as the London session ramps up, giving a full overlap with the European session and, in the afternoon, a clean overlap into New York before the workday ends.",
    regulatoryNote:
      "BaFin enforces the EU-wide ESMA product-intervention rules — retail CFD leverage capped around 1:30 on major pairs, lower on minors and indices — at BaFin-regulated brokers. As elsewhere in the EU, a prop firm challenge is a demo-funded product rather than a live margin account, so it isn't directly covered. German traders should confirm with a Steuerberater whether payout income counts as gewerbliche Einkünfte (business income) for tax purposes.",
    paymentNote:
      "SEPA transfer is the cleanest way to fund and receive payouts within the EU, though most firms still price and pay out in USD, so budget for the conversion spread.",
    recommendedAssetClass: "multi",
  },
  {
    slug: "france",
    name: "France",
    region: "UK & Europe",
    currency: "EUR",
    utcOffset: "UTC+1 (CET)",
    regulator: "AMF",
    sessionNote:
      "France shares Germany's timezone and session overlap: a full European morning, then a clean afternoon overlap with the New York open.",
    regulatoryNote:
      "The AMF applies the same ESMA-aligned leverage caps as the rest of the EU and has historically taken an aggressive stance on CFD advertising to retail clients. That scrutiny targets regulated brokers rather than prop firm evaluation products specifically, but it reflects how conservatively French regulators treat retail leverage generally.",
    paymentNote:
      "SEPA transfer works for funding and payouts inside the EU; most firms still settle in USD, so factor in conversion costs. Trading gains are generally taxable under France's flat-tax (PFU) regime on financial income, though classification can vary — check with a French accountant.",
    recommendedAssetClass: "multi",
  },
  {
    slug: "italy",
    name: "Italy",
    region: "UK & Europe",
    currency: "EUR",
    utcOffset: "UTC+1 (CET)",
    regulator: "CONSOB",
    sessionNote: "Italy shares the same CET session overlap as the rest of continental Europe — a full European morning and a clean afternoon overlap into New York.",
    regulatoryNote:
      "CONSOB enforces the EU's ESMA leverage caps and has separately restricted marketing of some higher-risk instruments, including certain crypto derivatives, to Italian retail clients. That restriction targets regulated brokers rather than prop firm challenges, but it's a useful signal of how conservatively Italian regulators treat retail leverage overall.",
    paymentNote:
      "SEPA transfer and card funding are standard. Italy taxes financial gains under a flat substitute tax; how a prop firm payout is classified is worth confirming with a commercialista rather than assuming.",
    recommendedAssetClass: "multi",
  },
  {
    slug: "spain",
    name: "Spain",
    region: "UK & Europe",
    currency: "EUR",
    utcOffset: "UTC+1 (CET)",
    regulator: "CNMV",
    sessionNote: "Spain's session overlap matches the rest of continental Europe — full European morning, clean afternoon overlap with New York.",
    regulatoryNote:
      "The CNMV follows the same EU-wide ESMA leverage framework and requires prominent risk warnings on CFD advertising. As with the rest of the EU, a prop firm evaluation isn't a regulated brokerage account, so the cap doesn't directly apply — but it shapes how conservatively Spanish-facing brokers can market leverage, which is worth knowing when comparing a prop firm's own live-execution broker.",
    paymentNote:
      "SEPA transfer and card funding are standard. Spain's Agencia Tributaria taxes trading gains as savings income (ahorro) at progressive rates — confirm classification with a gestor.",
    recommendedAssetClass: "multi",
  },
  {
    slug: "netherlands",
    name: "Netherlands",
    region: "UK & Europe",
    currency: "EUR",
    utcOffset: "UTC+1 (CET)",
    regulator: "AFM",
    sessionNote: "Same CET overlap as the rest of continental Europe: a full European session and a clean afternoon overlap into New York.",
    regulatoryNote:
      "The AFM enforces the ESMA leverage caps and has been notably active on CFD risk-warning enforcement among regulated brokers. Dutch traders funding evaluations abroad should keep clear records — the Belastingdienst can treat trading gains under box 1 or box 3 depending on how the activity is classified, which materially changes the tax outcome.",
    paymentNote: "SEPA transfer is the standard, low-cost way to move money for evaluation fees and payouts within the EU.",
    recommendedAssetClass: "multi",
  },
  {
    slug: "poland",
    name: "Poland",
    region: "UK & Europe",
    currency: "PLN",
    utcOffset: "UTC+1 (CET)",
    regulator: "KNF",
    sessionNote: "Poland shares the CET session overlap with the rest of continental Europe.",
    regulatoryNote:
      "The KNF applies the EU's ESMA leverage caps to Poland-regulated brokers and has run public warnings about unregulated forex and crypto schemes targeting Polish retail traders specifically. That's a reminder to verify any firm's basic legitimacy — payout history, company registration — independent of the general regulatory picture here.",
    paymentNote:
      "Card funding is standard; most firms settle in USD or EUR rather than PLN, so compare conversion fees across payout methods (bank wire, Wise, crypto) before choosing one.",
    recommendedAssetClass: "multi",
  },
  {
    slug: "ireland",
    name: "Ireland",
    region: "UK & Europe",
    currency: "EUR",
    utcOffset: "UTC+0 (UTC+1 in summer)",
    regulator: "Central Bank of Ireland",
    sessionNote:
      "Ireland shares the UK's timezone, sitting inside the London session for the entire trading morning with a clean overlap into the New York afternoon.",
    regulatoryNote:
      "The Central Bank of Ireland applies the same ESMA-derived leverage caps as the rest of the EU/EEA to regulated CFD brokers. Irish tax treatment of trading gains (CGT vs. income tax) has historically been a genuinely ambiguous area depending on how speculative the activity is judged to be — worth a session with an Irish accountant rather than assuming either treatment applies.",
    paymentNote: "SEPA transfer and standard card funding both work well for evaluation fees and payouts.",
    recommendedAssetClass: "multi",
  },
  {
    slug: "japan",
    name: "Japan",
    region: "Asia-Pacific",
    currency: "JPY",
    utcOffset: "UTC+9",
    regulator: "FSA (JFSA)",
    sessionNote:
      "Japan opens the Asian session, but the highest-volatility London/New York overlap lands late at night JST — roughly 9pm to 1am — a real scheduling consideration when picking evaluation hours.",
    regulatoryNote:
      "Japan's FSA imposes one of the strictest retail FX leverage caps in the world (around 1:25) on JFSA-registered brokers, well below the offshore norm, and has floated tightening it further. A prop firm challenge runs on the firm's own demo-funded platform rather than through a JFSA-registered broker relationship, so it generally sits outside this specific cap — but it explains why Japan's domestic retail FX brokers look so different from offshore platforms.",
    paymentNote:
      "Card funding works internationally; JPY payouts typically convert via bank wire or Wise. Japan taxes FX-related gains under specific rules (often zeiritsu bunri kazei, separate self-assessment taxation) that differ materially from ordinary income tax — confirm classification with a Japanese tax accountant since the rate depends on it.",
    recommendedAssetClass: "multi",
  },
  {
    slug: "australia",
    name: "Australia",
    region: "Asia-Pacific",
    currency: "AUD",
    utcOffset: "UTC+10 (AEST)",
    regulator: "ASIC",
    sessionNote:
      "Sydney is itself one of the four major FX trading centers, so Australian traders get a genuine local session before the Tokyo and later European sessions add volatility later in the day.",
    regulatoryNote:
      "ASIC caps retail CFD leverage (around 1:30 on major pairs, lower on minors, indices, and crypto) and has repeatedly issued public warnings about unlicensed 'prop trading' and copy-trading schemes. Evaluation products aren't ASIC-licensed financial products themselves, so the standard advice applies: check a firm's ABN/company registration and independent payout history rather than relying on regulatory context alone.",
    paymentNote:
      "Card funding is standard; AUD converts to USD for most payouts via wire or Wise. The ATO treats trading gains as either income or a capital gain depending on whether you're classified as carrying on a business of trading.",
    recommendedAssetClass: "multi",
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    region: "Asia-Pacific",
    currency: "NZD",
    utcOffset: "UTC+12",
    regulator: "FMA",
    sessionNote:
      "New Zealand is the first major market to open each trading day — Wellington opens before Sydney — giving early sight of the week's opening gaps before most of the world is awake.",
    regulatoryNote:
      "The FMA regulates NZ-based derivatives issuers under broad leverage and disclosure principles, generally less prescriptive than ASIC's specific caps next door. A prop firm challenge is a separate product from a licensed derivatives-issuer relationship, so it's still worth verifying any firm's standing independently rather than assuming regulatory oversight extends to it.",
    paymentNote:
      "Standard card funding works for evaluation fees; NZD payouts convert via wire or Wise. IRD generally taxes trading gains as income if the activity meets its intention-to-trade test.",
    recommendedAssetClass: "multi",
  },
  {
    slug: "india",
    name: "India",
    region: "Asia-Pacific",
    currency: "INR",
    utcOffset: "UTC+5:30",
    regulator: "RBI / SEBI",
    sessionNote:
      "India's trading day starts well before London opens and runs into the early European session, so IST hours mostly cover the Asian session and European open — the London/New York overlap lands late at night, around midnight IST.",
    regulatoryNote:
      "This is the most important thing for Indian traders to check before funding an evaluation. RBI's FEMA framework and Liberalised Remittance Scheme (LRS) govern how residents can send money abroad, and retail margin/leveraged forex trading outside RBI-recognized exchanges sits in a widely-discussed gray area — paying an offshore prop firm's fee, or receiving a payout, can fall under LRS reporting and scrutiny. Treat this as a starting point, not legal or tax advice: check current RBI/FEMA guidance, or talk to a chartered accountant familiar with LRS, before moving money for this purpose.",
    paymentNote:
      "International cards and, increasingly, crypto on/off-ramps are common ways Indian traders fund evaluations given LRS considerations on wire transfers. Keep records of every remittance for both RBI compliance and income-tax reporting — profits are taxable in India regardless of where the firm is based.",
    recommendedAssetClass: "multi",
    faq: {
      q: "Is prop firm trading legal in India?",
      a: "There's no blanket ban on the activity itself, but RBI's FEMA rules and the Liberalised Remittance Scheme create real friction around sending money abroad to fund an evaluation or receive a payout — this is a genuinely unsettled area, not a simple yes or no. Check current RBI/FEMA guidance or speak with a chartered accountant familiar with LRS before funding an account.",
    },
  },
  {
    slug: "pakistan",
    name: "Pakistan",
    region: "Asia-Pacific",
    currency: "PKR",
    utcOffset: "UTC+5",
    regulator: "SECP / State Bank of Pakistan",
    sessionNote:
      "Pakistan's hours line up closely with India's — solid coverage of the Asian and early European session, with the London/New York overlap landing late at night local time.",
    regulatoryNote:
      "The State Bank of Pakistan tightly controls outward remittances, and the SECP has issued public warnings about unregulated forex/CFD platforms marketed to Pakistani retail traders. Moving money abroad to fund a prop firm evaluation, or receiving a payout, needs to go through SBP-compliant banking channels with declared income to avoid running into foreign-exchange regulations — verify current SBP rules before transferring funds internationally for this purpose.",
    paymentNote:
      "International-card funding is often unreliable for Pakistan-issued cards on offshore platforms; many traders rely on remittance services or crypto rails instead, both of which carry their own regulatory ambiguity locally — keep documentation regardless of method.",
    recommendedAssetClass: "multi",
  },
  {
    slug: "philippines",
    name: "Philippines",
    region: "Asia-Pacific",
    currency: "PHP",
    utcOffset: "UTC+8",
    regulator: "SEC Philippines / BSP",
    sessionNote:
      "The Philippines shares Singapore and Perth's timezone, covering the full Asian session with the European open arriving in the local evening.",
    regulatoryNote:
      "The Philippine SEC has issued advisories against a number of forex and 'prop trading' schemes operating without local registration, and the BSP monitors outward remittances under its foreign-exchange rules. Given how much of the marketing aimed at this market has historically included outright scams, verifiable payout proof from other Filipino traders specifically is worth more here than general reassurance.",
    paymentNote:
      "GCash and card funding are common ways to fund evaluations; USD payouts typically arrive via wire or crypto, both carrying their own conversion and BSP-related considerations.",
    recommendedAssetClass: "multi",
  },
  {
    slug: "indonesia",
    name: "Indonesia",
    region: "Asia-Pacific",
    currency: "IDR",
    utcOffset: "UTC+7",
    regulator: "Bappebti / OJK",
    sessionNote: "Jakarta shares Bangkok and Hanoi's timezone, covering the Asian session fully with the European open arriving in the early evening.",
    regulatoryNote:
      "Bappebti licenses domestic forex/CFD brokers and periodically blacklists unlicensed platforms marketed to Indonesian traders; Bank Indonesia also monitors outward transfers. None of this directly governs offshore prop-firm evaluation products, but Bappebti's public blacklist is a genuinely useful independent check before sending money to any trading-adjacent platform.",
    paymentNote:
      "Card and e-wallet funding are common; keep transfer records given BI's reporting thresholds on larger outward remittances, and note that trading profits are taxable under Indonesian income tax rules.",
    recommendedAssetClass: "multi",
  },
  {
    slug: "malaysia",
    name: "Malaysia",
    region: "Asia-Pacific",
    currency: "MYR",
    utcOffset: "UTC+8",
    regulator: "Bank Negara Malaysia / Securities Commission",
    sessionNote: "Malaysia shares Singapore's timezone — a full Asian session with the London open landing in the early evening local time.",
    regulatoryNote:
      "Bank Negara Malaysia restricts unlicensed retail forex margin trading through domestic channels and has published warnings about unlicensed operators; the Securities Commission separately oversees capital-markets products. Prop firm evaluations aren't licensed financial products under either body, so verify a firm's payout history independently and keep clean records of any funds sent abroad.",
    paymentNote:
      "Card funding is standard; BNM's rules on larger outward remittances may require supporting documentation — check current thresholds before wiring evaluation fees or payouts.",
    recommendedAssetClass: "multi",
  },
  {
    slug: "vietnam",
    name: "Vietnam",
    region: "Asia-Pacific",
    currency: "VND",
    utcOffset: "UTC+7",
    regulator: "State Bank of Vietnam",
    sessionNote: "Vietnam shares Jakarta and Bangkok's timezone, with full Asian-session coverage and the European open in the early evening.",
    regulatoryNote:
      "Vietnam has some of the strictest capital controls in the region — the State Bank of Vietnam restricts resident forex trading outside authorized banking channels, and unlicensed forex/CFD platforms are periodically targeted by regulators despite being widely used in practice. This is a genuinely higher-friction market than most on this list: moving money to and from an offshore prop firm carries real regulatory exposure, and this is worth independent legal advice rather than general guidance.",
    paymentNote:
      "Card funding and crypto rails are the practical options many Vietnamese traders use, both of which sit outside official banking-channel forex rules — understand the risk before relying on either.",
    recommendedAssetClass: "multi",
  },
  {
    slug: "singapore",
    name: "Singapore",
    region: "Asia-Pacific",
    currency: "SGD",
    utcOffset: "UTC+8",
    regulator: "MAS",
    sessionNote: "Singapore is a major Asian financial center in its own right, with a full local session and a clean evening overlap into the European open.",
    regulatoryNote:
      "MAS regulates retail CFD/forex leverage tightly at MAS-licensed platforms, with an accreditation framework that allows higher leverage for accredited or high-net-worth investors — one of the more sophisticated regulatory regimes in the region. Prop firm evaluations sit outside MAS licensing since they aren't a regulated brokerage relationship, but Singapore's high bar for licensed brokers is a useful reference point for how seriously to vet any offshore platform.",
    paymentNote:
      "Card and bank-transfer funding are both straightforward. IRAS generally doesn't tax individual capital gains unless trading is deemed a trade or business — a favorable backdrop compared to most countries here, though worth confirming your own classification.",
    recommendedAssetClass: "multi",
  },
  {
    slug: "thailand",
    name: "Thailand",
    region: "Asia-Pacific",
    currency: "THB",
    utcOffset: "UTC+7",
    regulator: "SEC Thailand / Bank of Thailand",
    sessionNote: "Bangkok shares Jakarta's timezone — full Asian-session coverage with the European open arriving in the early evening.",
    regulatoryNote:
      "Most retail forex/CFD trading in Thailand happens through platforms that fall outside SEC Thailand's regulated products, and the Bank of Thailand's foreign-exchange rules apply to money moved abroad for this purpose. 'Widely done' and 'clearly regulated' are two different statements here — proceed with real caution and keep documentation of any funds sent for evaluations.",
    paymentNote: "Card funding and crypto are common practical routes; larger outward transfers may draw Bank of Thailand reporting requirements.",
    recommendedAssetClass: "multi",
  },
  {
    slug: "united-arab-emirates",
    name: "United Arab Emirates",
    region: "Middle East & Africa",
    currency: "AED",
    utcOffset: "UTC+4",
    regulator: "SCA / DFSA / FSRA",
    sessionNote:
      "The UAE's business day starts well before London opens and runs through the London morning, giving a natural overlap with the European session before the workday ends.",
    regulatoryNote:
      "The UAE has multiple overlapping regulators depending on the free zone — DFSA in the DIFC, FSRA in ADGM, plus the onshore SCA — a maturing but fragmented landscape for retail derivatives. Several prop firms are themselves incorporated in UAE free zones, which can mean genuinely local support, but 'based in Dubai' says nothing about payout reliability on its own — check independent trader reviews regardless of where a firm is registered.",
    paymentNote:
      "The UAE levies no personal income tax, a genuine advantage for take-home trading profit versus most countries on this list — though a firm may still withhold or report under its own home jurisdiction's rules, so don't assume a payout arrives with zero paperwork.",
    recommendedAssetClass: "multi",
  },
  {
    slug: "saudi-arabia",
    name: "Saudi Arabia",
    region: "Middle East & Africa",
    currency: "SAR",
    utcOffset: "UTC+3",
    regulator: "Capital Market Authority (CMA)",
    sessionNote:
      "Saudi Arabia's working week traditionally runs Sunday-Thursday, so its local weekend falls mid-way through the global forex week — worth planning around when a firm measures its evaluation window in trading days rather than calendar days.",
    regulatoryNote:
      "The CMA regulates licensed capital-markets activity and has warned against unlicensed forex platforms; retail leveraged forex trading through unlicensed offshore brokers sits in a gray area relative to CMA licensing. Treat any firm's terms and payout history with real scrutiny, independent of the general regional picture here.",
    paymentNote:
      "Card funding is standard. Saudi Arabia levies no personal income tax on individuals, though that doesn't remove a firm's own reporting obligations in its home jurisdiction.",
    recommendedAssetClass: "multi",
  },
  {
    slug: "nigeria",
    name: "Nigeria",
    region: "Middle East & Africa",
    currency: "NGN",
    utcOffset: "UTC+1",
    regulator: "SEC Nigeria / CBN",
    sessionNote:
      "Nigeria's timezone overlaps most of the London session and the start of New York in the local afternoon and evening — one of the more convenient overlaps on this list for a working trader.",
    regulatoryNote:
      "Nigeria has one of the largest retail forex trading communities in Africa, and both the SEC and CBN have issued repeated warnings about unlicensed forex and 'prop trading' schemes given how heavily this market has been targeted by fraud. CBN's foreign-exchange rules also affect how easily traders can convert naira for evaluation fees. Independent, verifiable payout proof matters even more here than the general advice on this page, given the scam history specifically targeting Nigerian traders.",
    paymentNote:
      "International-card funding through Nigerian banks can be inconsistent; many traders use domestic P2P or crypto on-ramps to convert naira to USD, which carries its own counterparty risk — verify any intermediary independently.",
    recommendedAssetClass: "multi",
    faq: {
      q: "Why do prop-firm scams target Nigerian traders so often?",
      a: "Nigeria has one of Africa's largest retail forex communities, which has made it a frequent target for fraudulent forex and 'prop trading' schemes — the SEC and CBN have both issued repeated public warnings. That doesn't mean legitimate firms won't work with Nigerian traders, but it means independent, verifiable payout proof matters more here than taking a firm's own marketing at face value.",
    },
  },
  {
    slug: "south-africa",
    name: "South Africa",
    region: "Middle East & Africa",
    currency: "ZAR",
    utcOffset: "UTC+2",
    regulator: "FSCA",
    sessionNote: "South Africa's timezone overlaps the entire London session, giving one of the cleanest overlaps with European market hours anywhere on this list.",
    regulatoryNote:
      "The FSCA regulates licensed South African forex/CFD brokers under its Over-the-Counter Derivative Provider (ODP) license. Offshore prop firm evaluations generally fall outside FSCA licensing since they aren't a South African brokerage relationship, but the FSCA's public warning list of unlicensed entities is a genuinely useful independent check before sending money to any platform.",
    paymentNote:
      "SARB's foreign-exchange rules impose an annual single discretionary allowance on how much South African residents can send abroad without extra clearance — relevant when funding evaluation fees or expecting payouts, so check current SARB limits.",
    recommendedAssetClass: "multi",
  },
  {
    slug: "egypt",
    name: "Egypt",
    region: "Middle East & Africa",
    currency: "EGP",
    utcOffset: "UTC+2",
    regulator: "Financial Regulatory Authority (FRA)",
    sessionNote: "Egypt overlaps most of the London session in the local afternoon, with the New York overlap landing in the early evening.",
    regulatoryNote:
      "Egypt's FRA licenses domestic forex/CFD brokers and has tightened oversight of unlicensed platforms in recent years. The Central Bank of Egypt's currency controls — including periods of EGP volatility and restrictions on foreign-currency transactions — can also affect how easily funds move for evaluation fees or payouts, so check current CBE rules before relying on a specific transfer method.",
    paymentNote:
      "Given EGP volatility, many Egyptian traders prefer to fund and receive payouts directly in USD (card or crypto) rather than converting through EGP at an unfavorable bank rate — though crypto rails carry their own regulatory ambiguity in Egypt.",
    recommendedAssetClass: "multi",
  },
];

export function getCountry(slug: string): CountryProfile | undefined {
  return COUNTRIES.find((c) => c.slug === slug);
}

export function relatedCountries(country: CountryProfile, count = 3): CountryProfile[] {
  return COUNTRIES.filter((c) => c.region === country.region && c.slug !== country.slug).slice(0, count);
}
