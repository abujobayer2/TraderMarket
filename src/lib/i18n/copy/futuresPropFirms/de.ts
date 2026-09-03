import type { FuturesPropFirmsCopy } from "@/components/content/FuturesPropFirmsContent";

export const de: FuturesPropFirmsCopy = {
  kicker: "Trader-Ratgeber · Futures",
  h1: "Futures-Prop-Firmen und die Regeln, die wirklich über Ihr Konto entscheiden",
  intro:
    "Futures-Funded-Programme wirken neben Forex simpel — standardisierte Ziele, vertraute Kontrakte —, doch die Mechanik von Drawdown und Auszahlung ist strenger. Trailing-Drawdown, Flat-by-Close-Regeln, Datengebühren und Konsistenzanforderungen entscheiden hier über Evaluierung und Auszahlung. Hier erfahren Sie, wie sich das Futures-Segment unterscheidet und wie Sie eine Firma prüfen.",
  howItWorksHeading: "Wie eine Futures-Funded-Evaluierung funktioniert",
  howItWorksBody:
    "Sie kaufen ein Evaluierungskonto mit einer Kaufkraftgröße (50.000, 100.000, 150.000 sind üblich), handeln CME-Group-Futures und erreichen ein Gewinnziel, während Sie über einem Trailing-Maximal-Drawdown und unter einem täglichen Verlustlimit bleiben. Viele Firmen führen eine einphasige Evaluierung ohne Mindestgewinn pro Tag durch, knüpfen an Auszahlungen aber eine Konsistenzregel. Nach der Finanzierung behalten Sie bei manchen Firmen 90–100 % des ersten Gewinnabschnitts, danach gilt eine 90/10-Aufteilung, mit Auszahlungen nach einem festen Zeitplan.",
  drawdownHeading: "Trailing-Drawdown: die Regel, die die meisten Konten beendet",
  drawdownBody:
    "Die maximale Verlustschwelle folgt dem Höchststand Ihres Kontos. Bei den meisten Firmen orientiert sie sich an der untertägigen unrealisierten Equity, sodass ein Trade, der auf +800 $ steigt und bei +300 $ geschlossen wird, die Drawdown-Linie trotzdem um 800 $ nach oben gezogen hat. Sie hört auf mitzulaufen, sobald das Guthaben das Startguthaben plus einen festen Puffer übersteigt, danach ist sie faktisch statisch. Das steht im Gegensatz zu Forex, wo ein statischer Drawdown ab dem Startguthaben sich nie bewegt. Wer Positionen gestaffelt auf- und abbaut, sollte die Trailing-Mathematik vor dem Kauf gegen die eigenen schlechtesten untertägigen Ausschläge durchrechnen.",
  flatByCloseHeading: "Flat-by-Close, Datengebühren und Plattformen",
  flatByCloseItems: [
    "Die meisten Firmen verlangen, dass jede Position vor Handelsschluss und vor der täglichen Wartung geschlossen wird. Kein Übernachthalten ist der Standard; Übernachtpositionen sind oft eine Belohnung dafür, einen Auszahlungs-Meilenstein erreicht zu haben.",
    "Live-CME-Daten sind mit einer Nicht-Profi-Börsengebühr verbunden, die die meisten Firmen bei Funded Accounts weitergeben. Rechnen Sie monatliche Plattform- oder Reset-Gebühren zu Ihren tatsächlichen Kosten hinzu.",
    "Das Order-Routing läuft über Rithmic oder Tradovate, dargestellt über NinjaTrader, Tradovate Web, TradingView oder Quantower. Ausführungen laufen über einen regulierten Futures-Broker (FCM).",
    "Die Regeln sind standardisierter als bei Forex, weil die regulierte Kette den Firmen weniger Spielraum zur Improvisation lässt — aber Konsistenz- und Scaling-Regeln unterscheiden sich weiterhin stark.",
  ],
  dueDiligenceHeading: "Sorgfaltspflicht, bevor Sie ein Futures-Konto finanzieren",
  dueDiligenceItems: [
    "Auszahlungsnachweise und Auszahlungshäufigkeit: überprüfbare Belege und wie oft tatsächlich ausgezahlt werden kann.",
    "Art des Trailing-Drawdowns: untertägig oder Handelsende, und wo er einrastet.",
    "Konsistenzregel: der genaue Prozentsatz und ob er Auszahlungen, die Evaluierung oder beides betrifft.",
    "Gesamtkosten: Evaluierungsgebühr + monatliche Datengebühr + Plattform-/Reset-Gebühren + Aktivierungsgebühr für das Funded Account.",
    "Unabhängige Bewertungen speziell von Futures-Tradern — Forex-Feedback lässt sich nicht übertragen.",
  ],
  dueDiligencePrefix: "Der",
  dueDiligenceLinkText: "Ratgeber zu Funded-Trading-Programmen",
  dueDiligenceSuffix: 'deckt die allgemeinen „zahlt nach Bestehen aus"-Prüfungen ab, die für jede Firma gelten.',
  firmsHeading: "Auf TraderMarket gelistete Prop-Firmen",
  firmsIntro:
    "Öffnen Sie die Bewertungsseite einer Firma, um zu sehen, ob Trader über ihre Futures-Regeln sprechen — Verhalten des Trailing-Drawdowns, Übernachtrichtlinie, Datengebühren —, und prüfen Sie die Auszahlungshistorie selbst.",
  allReviewsLinkText: "Alle Prop-Firmen-Bewertungen ansehen →",
  faqHeading: "Futures-Prop-Firmen — Häufige Fragen",
  faqs: [
    {
      q: "Was ist eine Futures-Prop-Firma?",
      a: "Eine Futures-Prop-Trading-Firma gibt einem Trader ein Evaluierungskonto, um CME-, CBOT-, NYMEX- oder COMEX-Futures zu handeln — ES, NQ, GC, CL und Micros. Wer die Evaluierung besteht, indem er ein Gewinnziel erreicht, ohne den Trailing-Drawdown oder das tägliche Verlustlimit zu verletzen, handelt anschließend ein Funded Account und beantragt Auszahlungen nach den Auszahlungsregeln der Firma.",
    },
    {
      q: "Wie funktioniert der Trailing-Drawdown bei einer Futures-Prop-Firma?",
      a: "Die maximale Verlustlinie folgt dem Höchststand Ihres Kontos — oft dem Höchststand der unrealisierten (untertägigen) Equity, manchmal dem Guthaben zum Handelsende. Steigt das Konto, zieht der Drawdown dahinter mit und rastet ein, sobald das Startguthaben plus ein festgelegter Puffer überschritten ist. Das ist strenger als der statische Drawdown der meisten Forex-Firmen: Eine offene Position, die kurz stark im Plus liegt und wieder zurückfällt, kann Sie näher an eine Regelverletzung bringen, selbst wenn Sie im Plus schließen.",
    },
    {
      q: "Kann ich Futures-Positionen über Nacht halten?",
      a: "In der Evaluierung und der frühen Funded-Phase meist nicht. Die meisten Futures-Firmen verlangen, dass alle Positionen vor Handelsschluss (und vor größeren Wartungsfenstern) glattgestellt werden, manche erlauben Übernachtpositionen erst, nachdem ein Auszahlungs-Meilenstein erreicht oder ein Upgrade auf ein „Pro“-/Live-Konto erfolgt ist. Das Halten über den Handelsschluss hinaus bei einem Konto ohne Übernachthalten ist in der Regel ein sofortiger Regelverstoß.",
    },
    {
      q: "Muss ich bei einer Futures-Prop-Firma für Marktdaten bezahlen?",
      a: "Häufig ja. Live-CME-Daten für Nicht-Profi-Trader sind mit einer Börsengebühr verbunden (etwa 10–15 $ pro Börsenpaket und Monat), die die meisten Firmen bei Funded Accounts weitergeben. Evaluierungskonten enthalten manchmal verzögerte oder von der Firma gesponserte Daten. Kalkulieren Sie Daten und etwaige monatliche Plattform-/Reset-Gebühren ein, nicht nur den Evaluierungspreis.",
    },
    {
      q: "Welche Plattformen nutzen Futures-Prop-Firmen?",
      a: "Rithmic und Tradovate sind die beiden wichtigsten Order-Routing-Backends, dargestellt über NinjaTrader, Tradovates eigene Webplattform, TradingView, Quantower oder R|Trader. Ausführungen und P&L laufen über einen regulierten Futures Commission Merchant, was einer der Gründe ist, warum die Regeln von Futures-Firmen tendenziell standardisierter sind als bei Forex.",
    },
    {
      q: "Was ist eine Konsistenzregel und warum ist sie für Auszahlungen wichtig?",
      a: "Eine Konsistenzregel begrenzt, wie viel Ihres Gesamtgewinns ein einzelner Tag ausmachen darf — üblich sind 20–40 %. Sie soll verhindern, dass ein Trader durch einen einzigen glücklichen Tag besteht. Meist gilt sie für die Auszahlungsberechtigung und nicht für die Evaluierung selbst, sodass man bestehen und trotzdem von Auszahlungen blockiert sein kann, bis sich der Gewinn auf mehr Tage verteilt. Prüfen Sie den genauen Prozentsatz und ob er für die Evaluierung, das Funded Account oder beides gemessen wird.",
    },
  ],
  relatedHeading: "Weitere Ratgeber",
  relatedForex: "Forex-Prop-Firmen",
  relatedCrypto: "Krypto-Prop-Firmen",
  relatedBest: "Beste Prop-Trading-Firmen",
  relatedReviews: "Prop-Firmen-Bewertungen",
  relatedCountry: "Prop-Firmen nach Land",
};
