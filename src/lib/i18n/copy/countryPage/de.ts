import type { CountryPageCopy } from "@/components/content/CountryPageContent";

export const de: CountryPageCopy = {
  backLinkText: "← Prop-Firmen nach Land",
  kickerTemplate: "Trader-Ratgeber · {country}",
  h1Template: "Prop-Trading-Firmen für Trader in {country}",
  metaDescriptionTemplate:
    "Ein Trader-Ratgeber zu Prop-Firmen-Challenges aus {country}: wie {regulator} den privaten Forex-/CFD-Handel behandeln, Sessionzeiten, Überlegungen zu Finanzierung und Auszahlung, sowie die Live-Bestenliste von TraderMarket.",
  defaultRegulatorLabel: "lokale Regulierungsbehörden",
  introTemplate:
    "Prop-Firmen selbst sind global tätig — TraderMarket erfasst nicht, welche Firmen welche Länder einschränken. Was sich je nach Standort wirklich unterscheidet, sind der regulatorische Hintergrund, wann die geschäftigsten Handelsstunden auf Ihrer Uhr liegen, und wie Sie Geld bewegen, um eine Evaluierung zu finanzieren oder eine Auszahlung zu erhalten. Das ist relevant für Trader mit Sitz in {country}.",
  currencyLabel: "Währung:",
  timezoneLabel: "Zeitzone:",
  regulatorLabel: "Regulierungsbehörde:",
  regulationHeading: "Regulierung: was für eine Prop-Firmen-Challenge tatsächlich gilt",
  sessionHeadingTemplate: "Sessionzeiten aus {country}",
  paymentHeading: "Evaluierungen finanzieren und Auszahlungen erhalten",
  assetClassHeading: "Welche Anlageklasse passt",
  assetClassFuturesTemplate:
    "Angesichts der oben beschriebenen Regulierungslage schauen sich die meisten Trader mit Sitz in {country} eher {link} an als CFD-artige Multi-Asset-Challenges.",
  assetClassMultiTemplate:
    "Trader in {country} haben in der Regel Zugang zur gesamten Bandbreite von Prop-Firmen-Typen. Sehen Sie sich {forex}, {futures} und {crypto} an, um zu verstehen, wie sich die Regeln der jeweiligen Anlageklasse unterscheiden, bevor Sie sich entscheiden.",
  assetClassForexLabel: "Forex-Prop-Firmen",
  assetClassFuturesLabel: "Futures-Prop-Firmen",
  assetClassCryptoLabel: "Krypto",
  assetClassMultiLabel: "jede auf TraderMarket bewertete Prop-Firma",
  firmsHeading: "Auf TraderMarket gelistete Prop-Firmen",
  firmsIntro:
    "Dieselbe Live-Bestenliste, die Trader überall auf der Welt sehen — prüfen Sie die Länderberechtigung und Auszahlungsbedingungen direkt auf der Website jeder Firma.",
  allReviewsLinkText: "Alle Prop-Firmen-Bewertungen ansehen →",
  faqHeading: "Häufige Fragen",
  sharedFaqs: [
    {
      q: "Schränken Prop-Firmen ein, welche Länder sich anmelden können?",
      a: "Manche tun das, meist aus regulatorischen und nicht aus handelsbezogenen Gründen — das klarste Beispiel sind die USA, wo die meisten CFD-artigen Multi-Asset-Firmen US-Bürger ausschließen und stattdessen reine Futures-Firmen diese Lücke füllen. TraderMarket erfasst keine länderspezifische Berechtigung pro Firma, bestätigen Sie daher immer direkt auf der Website der Firma, bevor Sie eine Evaluierungsgebühr zahlen.",
    },
    {
      q: "Gilt die Regulierung meines Landes für eine Prop-Firmen-Challenge?",
      a: "Meist nicht direkt. Eine Prop-Firmen-Evaluierung ist in der Regel eine mit Demokapital finanzierte Simulation auf der eigenen Plattform der Firma, kein Live-Konto bei einem lokal regulierten Broker — daher gelten die Hebelobergrenzen und Broker-Lizenzregeln für Privatkunden, die Sie beim Handel mit einem regulierten Broker schützen, in der Regel nicht direkt für die Challenge selbst. Genau deshalb zählt unabhängige Recherche (Auszahlungsnachweise, Bewertungen, Firmenregistrierung) hier mehr als bei einem regulierten Broker-Konto.",
    },
    {
      q: "Muss ich auf Auszahlungen von Prop-Firmen Steuern zahlen?",
      a: "In fast jedem Land ja — Trading-Gewinne gelten in der Regel als steuerpflichtiges Einkommen oder Kapitalertrag, unabhängig davon, in welchem Land die Firma ihren Sitz hat. Wie das eingestuft wird (gewerbliche Einkünfte, Kapitalerträge oder etwas anderes), unterscheidet sich stark je nach Land und sogar nach Handelsweise, daher sind die Steuerhinweise auf dieser Seite ein Ausgangspunkt und kein Ersatz für einen lokalen Steuerberater.",
    },
    {
      q: "Warum ist die Zeitzone bei der Wahl einer Prop-Firma wichtig?",
      a: "Evaluierungsregeln wie tägliche Verlustlimits werden zu einer festen Serverzeit zurückgesetzt, und das geschäftigste, volatilste Handelsfenster ist die Überlappung von London und New York. Ob diese Überlappung auf Ihrer lokalen Uhr in einen normalen Morgen oder mitten in die Nacht fällt, beeinflusst, zu welchen Stunden Sie das Konto realistisch handeln können, ohne Ihren Schlafrhythmus zu stören.",
    },
  ],
  alsoInTemplate: "Auch in {region}",
  allCountriesLinkText: "Alle Länder →",
  regionLabels: {
    "North America": "Nordamerika",
    "UK & Europe": "UK & Europa",
    "Asia-Pacific": "Asien-Pazifik",
    "Middle East & Africa": "Naher Osten & Afrika",
  },
};
