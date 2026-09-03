import type { FuturesPropFirmsCopy } from "@/components/content/FuturesPropFirmsContent";

export const pl: FuturesPropFirmsCopy = {
  kicker: "Przewodnik tradera · Futures",
  h1: "Firmy prop tradingowe futures i zasady, które naprawdę decydują o Twoim koncie",
  intro:
    "Finansowane programy futures wyglądają prosto na tle forex — ustandaryzowane cele, znajome kontrakty — ale mechanika drawdownu i wypłat jest bardziej surowa. Kroczący drawdown, zasady zamykania pozycji przed zamknięciem sesji, opłaty za dane oraz wymogi spójności decydują o tym, czy oceny i wypłaty zostają wygrane, czy przegrane. Oto czym różni się segment futures i jak zweryfikować firmę.",
  howItWorksHeading: "Jak działa finansowana ocena futures",
  howItWorksBody:
    "Kupujesz konto ewaluacyjne o wielkości określonej siłą nabywczą (typowe wartości to 50 000, 100 000, 150 000), handlujesz kontraktami futures z grupy CME i osiągasz cel zysku, pozostając powyżej kroczącego maksymalnego drawdownu i poniżej dziennego limitu strat. Wiele firm prowadzi jednoetapową ocenę bez minimalnego wymogu zysku dziennego, ale nakłada zasadę spójności na wypłaty. Po sfinansowaniu w niektórych firmach zatrzymujesz 90–100% pierwszej części zysku, a potem obowiązuje podział 90/10, z wypłatami według ustalonego harmonogramu.",
  drawdownHeading: "Kroczący drawdown: zasada, która kończy większość kont",
  drawdownBody:
    "Próg maksymalnej straty podąża za szczytem Twojego konta. W większości firm śledzi on niezrealizowany kapitał w ciągu dnia, więc pozycja, która urosła do +800 USD, a zamknięta zostaje przy +300 USD, i tak podniosła linię drawdownu o 800 USD. Kroczenie zatrzymuje się, gdy saldo przekroczy saldo początkowe powiększone o stały bufor, po czym staje się ono w praktyce statyczne. To kontrastuje z forex, gdzie statyczny drawdown liczony od salda początkowego nigdy się nie przesuwa. Jeśli skalujesz pozycje wchodzące i wychodzące, przed zakupem zamodeluj matematykę kroczącego drawdownu na swoich najgorszych dziennych wahnięciach.",
  flatByCloseHeading: "Zamykanie pozycji przed końcem sesji, opłaty za dane i platformy",
  flatByCloseItems: [
    "Większość firm wymaga zamknięcia każdej pozycji przed końcem sesji i przed codzienną konserwacją. Brak pozycji przez noc jest domyślny; utrzymywanie pozycji przez noc jest często nagrodą za osiągnięcie kamienia milowego wypłaty.",
    "Dane CME na żywo wiążą się z opłatą giełdową dla nieprofesjonalistów, którą większość firm przenosi na finansowane konta. Doliczaj do prawdziwego kosztu również miesięczne opłaty za platformę lub reset.",
    "Routing zleceń odbywa się przez Rithmic lub Tradovate, wyświetlany przez NinjaTrader, Tradovate web, TradingView lub Quantower. Realizacje przechodzą przez regulowanego brokera FCM.",
    "Zasady są bardziej ustandaryzowane niż w forex, ponieważ regulowany łańcuch pozostawia firmom mniej miejsca na improwizację — ale zasady spójności i skalowania nadal się mocno różnią.",
  ],
  dueDiligenceHeading: "Analiza due diligence przed sfinansowaniem konta futures",
  dueDiligenceItems: [
    "Dowód wypłat i częstotliwość wypłat: weryfikowalne zapisy oraz to, jak często faktycznie można wypłacać środki.",
    "Rodzaj kroczącego drawdownu: śródsesyjny czy na koniec dnia, i w którym momencie się blokuje.",
    "Zasada spójności: dokładny procent oraz to, czy dotyczy wypłat, oceny, czy obu.",
    "Całkowity koszt: opłata ewaluacyjna + miesięczne dane + opłaty za platformę/reset + opłata aktywacyjna na finansowanym koncie.",
    "Niezależne opinie od traderów futures konkretnie — opinie z forex się tu nie przekładają.",
  ],
  dueDiligencePrefix: "Sprawdź",
  dueDiligenceLinkText: "przewodnik po programach z finansowaniem",
  dueDiligenceSuffix: "pod kątem ogólnych kontroli „płaci po zaliczeniu”, które dotyczą każdej firmy.",
  firmsHeading: "Firmy prop tradingowe wymienione na TraderMarket",
  firmsIntro:
    "Otwórz stronę opinii danej firmy, aby sprawdzić, czy traderzy omawiają jej zasady futures — zachowanie kroczącego drawdownu, politykę utrzymywania pozycji przez noc, opłaty za dane — a historię wypłat zweryfikuj samodzielnie.",
  allReviewsLinkText: "Zobacz wszystkie opinie o firmach prop →",
  faqHeading: "Firmy prop tradingowe futures — najczęstsze pytania",
  faqs: [
    {
      q: "Czym jest firma prop tradingowa futures?",
      a: "Firma prop tradingowa futures daje traderowi konto ewaluacyjne do handlu kontraktami CME, CBOT, NYMEX lub COMEX — ES, NQ, GC, CL i mikrokontraktami. Aby zaliczyć ocenę, trzeba osiągnąć cel zysku bez naruszenia kroczącego drawdownu ani dziennego limitu strat, a następnie handlować na finansowanym koncie i zgłaszać wypłaty zgodnie z zasadami firmy.",
    },
    {
      q: "Jak działa kroczący drawdown w firmie prop tradingowej futures?",
      a: "Linia maksymalnej straty podąża za szczytem Twojego konta — często szczytem niezrealizowanego (śródsesyjnego) kapitału, czasem saldem na koniec dnia. W miarę wzrostu konta drawdown podąża za nim, a następnie blokuje się po przekroczeniu salda początkowego powiększonego o ustalony bufor. Jest to bardziej surowe niż statyczny drawdown w większości firm forex: otwarta pozycja, która gwałtownie zyskuje, a potem cofa się, może przybliżyć Cię do naruszenia limitu, nawet jeśli zamkniesz ją na plusie.",
    },
    {
      q: "Czy mogę trzymać pozycje futures przez noc?",
      a: "Zwykle nie na etapie oceny i wczesnym etapie finansowanego konta. Większość firm futures wymaga zamknięcia wszystkich pozycji przed końcem sesji (i przed głównymi oknami konserwacyjnymi), a niektóre pozwalają na utrzymywanie pozycji przez noc dopiero po osiągnięciu kamienia milowego wypłaty lub przejściu na konto „pro”/na żywo. Utrzymanie pozycji przez zamknięcie sesji na koncie bez opcji nocnej jest zwykle natychmiastowym naruszeniem zasad.",
    },
    {
      q: "Czy muszę płacić za dane rynkowe w firmie prop tradingowej futures?",
      a: "Często tak. Dane CME na żywo dla tradera nieprofesjonalnego wiążą się z opłatą giełdową (mniej więcej 10–15 USD za pakiet giełdowy miesięcznie), którą większość firm przenosi na finansowane konta. Konta ewaluacyjne czasem obejmują dane opóźnione lub finansowane przez firmę. Uwzględnij w budżecie dane oraz ewentualne miesięczne opłaty za platformę/reset, nie tylko cenę oceny.",
    },
    {
      q: "Jakich platform używają firmy prop tradingowe futures?",
      a: "Rithmic i Tradovate to dwa główne systemy routingu zleceń, dostępne poprzez NinjaTrader, własną platformę webową Tradovate, TradingView, Quantower lub R|Trader. Twoje realizacje i wynik finansowy przechodzą przez regulowanego brokera kontraktów terminowych, co jest jednym z powodów, dla których zasady firm futures bywają bardziej ustandaryzowane niż w forex.",
    },
    {
      q: "Czym jest zasada spójności i dlaczego ma znaczenie dla wypłat?",
      a: "Zasada spójności ogranicza, jaką część całkowitego zysku może stanowić pojedynczy dzień — zwykle 20–40%. Ma ona zapobiegać zaliczeniu oceny dzięki jednemu szczęśliwemu dniowi. Zwykle dotyczy uprawnienia do wypłaty, a nie samej oceny, więc możesz zaliczyć ocenę, a mimo to mieć zablokowaną wypłatę, dopóki Twój zysk nie rozłoży się na więcej dni. Sprawdź dokładny procent oraz to, czy jest mierzony na ocenie, finansowanym koncie, czy obu.",
    },
  ],
  relatedHeading: "Powiązane przewodniki",
  relatedForex: "Firmy prop tradingowe forex",
  relatedCrypto: "Firmy prop tradingowe krypto",
  relatedBest: "Najlepsze firmy prop tradingowe",
  relatedReviews: "Opinie o firmach prop",
  relatedCountry: "Firmy prop tradingowe według kraju",
};
