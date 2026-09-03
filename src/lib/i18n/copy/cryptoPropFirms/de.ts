import type { CryptoPropFirmsCopy } from "@/components/content/CryptoPropFirmsContent";

export const de: CryptoPropFirmsCopy = {
  kicker: "Trader-Ratgeber · Krypto",
  h1: "Krypto-Prop-Firmen und was ein 24/7-Markt verändert",
  intro:
    "Krypto-Funded-Programme nutzen dieselbe Struktur aus Evaluierung und anschließender Auszahlung wie Forex- und Futures-Firmen, doch der zugrunde liegende Markt ist immer geöffnet, volatiler und weniger reguliert. Das verändert die Drawdown-Mathematik, macht die Flat-by-Close-Regel überflüssig und verleiht der Auszahlungshistorie einer Firma mehr Gewicht — die in diesem Segment meist kürzer ausfällt. So liest man eine Krypto-Prop-Firma richtig.",
  howItWorksHeading: "Wie eine Krypto-Funded-Evaluierung funktioniert",
  howItWorksBody:
    "Sie zahlen eine einmalige Gebühr, handeln auf einem Demokonto, das die Preise einer echten Krypto-Börse abbildet — meist BTC- und ETH-Perpetual-Futures — und erreichen ein Gewinnziel, ohne den Drawdown zu verletzen. Nach Bestehen wechseln Sie auf ein Funded Account, behalten eine Aufteilung von 70–90 % und beantragen Auszahlungen in einem Zyklus. Ein-Phasen- und Instant-Funding-Modelle sind verbreitet, weil das Segment über die Geschwindigkeit des Zugangs konkurriert.",
  changesHeading: "Was der 24/7-Markt verändert",
  changesItems: [
    "Keine Flat-by-Close-Regel: Positionen können über Nächte und Wochenenden laufen, sodass Gap-Risiko durchgehend besteht statt sich auf einen Sessionstart zu konzentrieren.",
    "Höhere Volatilität: Drawdown-Grenzen werden schneller erreicht, und ein untertägiger Trailing-Drawdown ist hier riskanter als bei Forex oder Futures.",
    "Niedrigere Einstiegskosten: keine CME-artige Marktdatengebühr, daher tendieren Evaluierungspreise und Gesamtkosten niedriger.",
    "Schwächere Regulierung: Die Börse und die Firma stehen außerhalb der regulierten FCM-Kette, auf die sich Futures-Trader verlassen können, daher sind die Möglichkeiten im Streitfall begrenzt.",
    "Niedrigerer Hebel: bei Hauptwerten üblicherweise 1:2–1:10, entsprechend der Volatilität des Basiswerts.",
  ],
  trackRecordHeading: "Die Auszahlungshistorie zählt hier stärker",
  trackRecordBody:
    "Das Krypto-Prop-Segment ist jung. Eine jahrzehntealte Forex-Firma hat Tausende öffentliche Auszahlungen, anhand derer man urteilen kann; viele krypto-native Firmen finanzieren Trader erst seit Monaten, nicht Jahren. Das macht sie nicht automatisch schlecht — mehrere sind gut geführt —, bedeutet aber, dass weniger Historie vorliegt, auf die man sich stützen kann. Gewichten Sie überprüfbare Auszahlungsnachweise, das Alter der Firma und unabhängige Bewertungen von Krypto-Tradern stärker als die beworbene Gewinnbeteiligung, und seien Sie vorsichtig bei jeder Firma, deren Marketing lauter ist als ihre Auszahlungsbelege.",
  dueDiligenceHeading: "Sorgfaltspflicht, bevor Sie ein Krypto-Konto finanzieren",
  dueDiligenceItems: [
    "Auszahlungsnachweise und Firmenalter — die beiden Signale mit dem größten Gewicht in einem jungen Segment.",
    "Drawdown- und Liquidationsregeln zusammen lesen: was passiert, wenn die zugrunde liegende Börse vor der Verletzungsgrenze der Firma liquidiert.",
    "Instrumente und Handelsplatz: Perpetuals oder Spot, und wessen Preis-Feed die Evaluierung abbildet.",
    "Auszahlungsbedingungen: Konsistenzregeln, Mindesttage, KYC und Auszahlungsmethode.",
    "Unabhängige Bewertungen von Krypto-Tradern — Forex- oder Futures-Feedback lässt sich nicht übertragen.",
  ],
  dueDiligencePrefix: "Der",
  dueDiligenceLinkText: "Ratgeber zu Funded-Trading-Programmen",
  dueDiligenceSuffix: 'deckt die allgemeine Checkliste zur Frage „zahlt diese Firma nach Bestehen aus" ab.',
  firmsHeading: "Auf TraderMarket gelistete Prop-Firmen",
  firmsIntro:
    "Viele Multi-Asset-Firmen unten bieten neben Forex auch Krypto-Paare an. Öffnen Sie die Bewertungsseite einer Firma, um zu sehen, ob Trader ihre Krypto-Konditionen erwähnen, und prüfen Sie die Auszahlungshistorie selbst.",
  allReviewsLinkText: "Alle Prop-Firmen-Bewertungen ansehen →",
  faqHeading: "Krypto-Prop-Firmen — Häufige Fragen",
  faqs: [
    {
      q: "Was ist eine Krypto-Prop-Firma?",
      a: "Eine Krypto-Prop-Trading-Firma gibt einem Trader ein Evaluierungskonto, um digitale Assets zu handeln — meist BTC- und ETH-Perpetual-Futures, manchmal Altcoin-Perpetuals oder Spot. Wer ein Gewinnziel innerhalb der Drawdown-Grenzen erreicht, besteht und handelt anschließend ein Funded Account gegen eine Gewinnbeteiligung. Das Modell gleicht Forex- und Futures-Prop-Firmen; der Markt, auf dem es läuft, tut das nicht.",
    },
    {
      q: "Wie unterscheidet sich Krypto-Prop-Trading von Forex- oder Futures-Prop-Trading?",
      a: "Krypto-Märkte handeln 24/7, auch am Wochenende, daher gibt es keine Flat-by-Close-Regel, und das Gap-Risiko ist durchgehend präsent statt am Sessionstart konzentriert. Die Volatilität ist höher, daher werden Drawdown-Grenzen schneller erreicht. Die Einstiegshürde ist niedriger, weil es keine Börsen-Datengebühr wie bei CME-Futures gibt. Und das Umfeld ist weniger reguliert als Forex oder Futures, sodass die Möglichkeiten für Trader bei Problemen schwächer sind.",
    },
    {
      q: "Verwenden Krypto-Prop-Firmen Trailing- oder statischen Drawdown?",
      a: "Beides kommt vor. Krypto-native Firmen nutzen oft einen statischen oder auf Handelsende basierenden Trailing-Drawdown ähnlich wie Forex, doch weil die 24/7-Volatilität große untertägige Ausschläge erzeugen kann, ist das praktische Risiko eines untertägigen Trailing-Modells hier höher als in ruhigeren Märkten. Prüfen Sie, ob der Drawdown auf Equity- oder Guthabenbasis gemessen wird und wie eine Liquidation an der zugrunde liegenden Börse mit den eigenen Verletzungsregeln der Firma zusammenhängt.",
    },
    {
      q: "Sind Auszahlungen von Krypto-Prop-Firmen zuverlässig?",
      a: "Behandeln Sie das als offene Frage. Das Krypto-Prop-Segment ist neuer, daher haben die meisten Firmen eine kürzere Auszahlungshistorie als jahrzehntealte Forex-Firmen. Manche sind hervorragend; dem Segment als Ganzem fehlt schlicht die Historie, um zu urteilen. Gewichten Sie überprüfbare Auszahlungsnachweise, wie lange die Firma schon besteht, und unabhängige Bewertungen stärker als die beworbene Gewinnbeteiligung.",
    },
    {
      q: "Welchen Hebel bieten Krypto-Prop-Firmen?",
      a: "Üblicherweise 1:2 bis 1:10 auf dem Funded Account, niedriger als bei Forex, weil die zugrunde liegenden Assets weit volatiler sind. Manche Firmen bieten nur bei Hauptwerten einen höheren Hebel. Der Hebel wirkt sich auf Margin und Liquidation an der Börse aus, nicht auf die Drawdown-Obergrenze der Firma.",
    },
    {
      q: "Wie prüfe ich eine Krypto-Prop-Firma, bevor ich eine Evaluierung kaufe?",
      a: "Prüfen Sie zuerst Auszahlungsnachweise und Firmenalter, da das Segment jung ist. Lesen Sie Drawdown- und Liquidationsregeln zusammen. Klären Sie, welche Börse und welche Instrumente Sie tatsächlich handeln (Perpetuals vs. Spot, welcher Preis-Feed welcher Börse). Lesen Sie unabhängige Bewertungen speziell von Krypto-Tradern, und denken Sie daran, dass der Rang einer Firma auf einer Bestenliste bezahlte Sichtbarkeit widerspiegelt, keine Auszahlungszuverlässigkeit.",
    },
  ],
  relatedHeading: "Weitere Ratgeber",
  relatedForex: "Forex-Prop-Firmen",
  relatedFutures: "Futures-Prop-Firmen",
  relatedBest: "Beste Prop-Trading-Firmen",
  relatedReviews: "Prop-Firmen-Bewertungen",
  relatedCountry: "Prop-Firmen nach Land",
};
