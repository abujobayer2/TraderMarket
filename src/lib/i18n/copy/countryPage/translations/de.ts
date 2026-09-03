import type { CountryTranslation } from "@/components/content/CountryPageContent";

export const de: Record<string, CountryTranslation> = {
  germany: {
    localizedName: "Deutschland",
    sessionNote:
      "Deutschlands Geschäftstag beginnt, während die Londoner Session an Fahrt aufnimmt, was eine vollständige Überlappung mit der europäischen Session ergibt und am Nachmittag, bevor der Arbeitstag endet, eine saubere Überlappung mit New York.",
    regulatoryNote:
      "Die BaFin setzt die EU-weiten ESMA-Produktinterventionsregeln durch — der Hebel für private CFDs ist bei Hauptwährungspaaren auf rund 1:30 begrenzt, bei Nebenwerten und Indizes niedriger — und zwar bei BaFin-regulierten Brokern. Wie andernorts in der EU ist eine Prop-Firmen-Challenge ein mit Demokapital finanziertes Produkt und kein Live-Margin-Konto, weshalb sie nicht unmittelbar davon erfasst wird. Deutsche Trader sollten mit einem Steuerberater klären, ob Auszahlungserlöse steuerlich als gewerbliche Einkünfte gelten.",
    paymentNote:
      "SEPA-Überweisung ist innerhalb der EU der sauberste Weg, um Konten zu finanzieren und Auszahlungen zu erhalten, auch wenn die meisten Firmen weiterhin in USD abrechnen und auszahlen — kalkulieren Sie also die Umtauschspanne ein.",
  },
};
