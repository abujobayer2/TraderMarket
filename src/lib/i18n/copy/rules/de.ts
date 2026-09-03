import type { RulesCopy } from "@/components/content/RulesContent";

export const de: RulesCopy = {
  kicker: "Regeln",
  h1: "So funktioniert TraderMarket",
  intro:
    "TraderMarket ist eine öffentliche Bestenliste. Wer über den anderen stehen will, bezahlt dafür. Der Rang ist das Gebot — sonst nichts.",
  sections: [
    {
      title: "Wie das Ranking funktioniert",
      items: [
        "Der Rang ist das Gebot — sonst nichts. Es gibt keine Anzeigen, kein Sponsoring und keine redaktionelle Platzierung. Wer am meisten für eine Position bezahlt, hält sie.",
        "Neue Einträge starten bei mindestens 10 US-Dollar, in ganzen Dollarbeträgen, in 1-Dollar-Schritten. Bereits platzierte Gebote behalten ihren Betrag, bis sie erhöht oder überboten werden.",
        "Platz 1 zu übernehmen kostet mindestens 1 Dollar mehr als das aktuell höchste Gebot. Wer weniger zahlt, kommt trotzdem auf die Liste, und zwar an der Stelle, die dieses Gebot erreicht.",
        "Bei gleich hohen Geboten bleibt die Reihenfolge erhalten, in der sie abgegeben wurden — das ältere Gebot behält den höheren Rang.",
        "Wer dieselbe Website erneut einträgt, kann diesen Eintrag auf einen beliebigen Rang anheben. Das neue Gebot muss mindestens 1 Dollar über dem aktuellen liegen, und es wird nur die Differenz fällig.",
      ],
    },
    {
      title: "Was gelistet werden kann",
      items: [
        "Eine proprietäre Trading-Firma, die Tradern Funded Accounts oder Evaluierungs-Challenges anbietet.",
        "Ein Eintrag pro Firma. Doppelte Einträge für dieselbe Website werden zusammengeführt oder entfernt.",
        "Die Website muss live sein und die angebotenen Funding-Programme beschreiben.",
      ],
    },
    {
      title: "Was nicht erlaubt ist",
      items: [
        "Firmen ohne echtes, operativ tätiges Trading-Geschäft dahinter.",
        "Linkverkürzer oder Tracking-/Affiliate-Parameter in der URL — sie werden automatisch aus den Listing-Links entfernt.",
        "Irreführende Namen, Logos oder Beschreibungen, die eine andere Firma imitieren.",
      ],
    },
    {
      title: "Zahlungen",
      items: [
        "Jedes Gebot ist eine einmalige Zahlung, abgewickelt per Kryptowährung — es gibt keine Abonnements oder wiederkehrenden Gebühren.",
        "Erst eine abgeschlossene Zahlung sichert den Rang. Wird die Zahlung nicht bestätigt, erfolgt kein Eintrag und keine Rangänderung.",
        "Wird man später überboten, wird nichts erstattet oder erneut belastet. Die ursprüngliche Zahlung bleibt bestehen, es ändert sich nur der Rang.",
      ],
    },
    {
      title: "Moderation",
      items: [
        "TraderMarket kann Einträge entfernen, die betrügerisch, inaktiv, doppelt vorhanden sind oder gegen diese Regeln verstoßen.",
        "Wird ein Eintrag entfernt, rücken alle darunterliegenden Firmen automatisch auf.",
        "Der Rang spiegelt das Gebot wider, nicht eine Empfehlung. TraderMarket bürgt nicht für die Vertrauenswürdigkeit einer gelisteten Firma.",
      ],
    },
  ],
};
