import type { CountryPageCopy } from "@/components/content/CountryPageContent";

export const pl: CountryPageCopy = {
  backLinkText: "← Firmy prop tradingowe według kraju",
  kickerTemplate: "Przewodnik tradera · {country}",
  h1Template: "Firmy prop tradingowe dla traderów w {country}",
  metaDescriptionTemplate:
    "Przewodnik tradera po wyzwaniach firm prop z {country}: jak {regulator} traktuje detaliczny trading forex/CFD, godziny sesji, kwestie finansowania i wypłat, a także aktualny ranking TraderMarket.",
  defaultRegulatorLabel: "lokalni regulatorzy",
  introTemplate:
    "Same firmy prop tradingowe działają globalnie — TraderMarket nie śledzi, które firmy ograniczają dostęp z jakich krajów. To, co naprawdę zmienia się w zależności od miejsca, z którego handlujesz, to otoczenie regulacyjne, godziny, w których na Twoim zegarze przypadają najbardziej aktywne godziny handlu, oraz sposób, w jaki przesyłasz pieniądze, aby sfinansować ocenę lub otrzymać wypłatę. Oto co ma znaczenie dla tradera z {country}.",
  currencyLabel: "Waluta:",
  timezoneLabel: "Strefa czasowa:",
  regulatorLabel: "Regulator:",
  regulationHeading: "Regulacje: co faktycznie dotyczy wyzwania firmy prop tradingowej",
  sessionHeadingTemplate: "Godziny sesji z {country}",
  paymentHeading: "Finansowanie ocen i odbiór wypłat",
  assetClassHeading: "Która klasa aktywów pasuje najlepiej",
  assetClassFuturesTemplate:
    "Biorąc pod uwagę powyższy obraz regulacyjny, większość traderów z {country} ostatecznie zwraca się ku {link} zamiast wyzwań wieloaktywowych w stylu CFD.",
  assetClassMultiTemplate:
    "Traderzy w {country} generalnie mają dostęp do pełnej gamy typów firm prop tradingowych. Zobacz firmy {forex}, {futures} i {crypto}, aby sprawdzić, czym różnią się zasady każdej klasy aktywów, zanim wybierzesz jedną z nich.",
  assetClassForexLabel: "prop tradingowe forex",
  assetClassFuturesLabel: "prop tradingowe futures",
  assetClassCryptoLabel: "krypto",
  assetClassMultiLabel: "każdą firmę prop tradingową ocenianą na TraderMarket",
  firmsHeading: "Firmy prop tradingowe wymienione na TraderMarket",
  firmsIntro:
    "Ten sam aktualny ranking, który widzą traderzy na całym świecie — kwalifikowalność kraju i warunki wypłat zweryfikuj bezpośrednio na stronie każdej firmy.",
  allReviewsLinkText: "Zobacz wszystkie opinie o firmach prop →",
  faqHeading: "Najczęstsze pytania",
  sharedFaqs: [
    {
      q: "Czy firmy prop tradingowe ograniczają, z jakich krajów można się zarejestrować?",
      a: "Niektóre tak, zwykle z powodów regulacyjnych, a nie związanych z samym tradingiem — najwyraźniejszym przykładem są Stany Zjednoczone, gdzie większość wieloaktywowych firm w stylu CFD wyklucza rezydentów USA, a lukę tę wypełniają zamiast tego firmy oferujące wyłącznie futures. TraderMarket nie śledzi kwalifikowalności krajowej dla poszczególnych firm, więc zawsze potwierdzaj to bezpośrednio na stronie danej firmy przed opłaceniem oceny.",
    },
    {
      q: "Czy regulacje mojego kraju dotyczą wyzwania firmy prop tradingowej?",
      a: "Zwykle nie bezpośrednio. Ocena firmy prop tradingowej to zwykle symulacja finansowana demo, prowadzona na własnej platformie firmy, a nie żywe konto u lokalnie regulowanego brokera — więc ograniczenia dźwigni detalicznej i zasady licencjonowania brokerów, które chronią Cię podczas handlu z regulowanym brokerem, generalnie nie mają zastosowania do samego wyzwania. Właśnie dlatego niezależne badania (dowód wypłat, opinie, rejestracja firmy) mają tutaj większe znaczenie niż w przypadku regulowanego konta maklerskiego.",
    },
    {
      q: "Czy będę musiał zapłacić podatek od wypłat z firmy prop tradingowej?",
      a: "Niemal w każdym kraju tak — zysk z tradingu jest generalnie dochodem podlegającym opodatkowaniu lub zyskiem kapitałowym, niezależnie od tego, w jakim kraju siedzibę ma dana firma. To, jak jest klasyfikowany (dochód z działalności gospodarczej, zysk kapitałowy czy coś innego), znacznie różni się w zależności od kraju, a nawet od sposobu, w jaki handlujesz, więc uwagi podatkowe na tej stronie są punktem wyjścia, a nie zastępstwem dla lokalnego księgowego.",
    },
    {
      q: "Dlaczego strefa czasowa ma znaczenie przy wyborze firmy prop tradingowej?",
      a: "Zasady ewaluacyjne, takie jak dzienne limity strat, resetują się o stałej godzinie serwerowej, a najbardziej aktywne i zmienne okno handlowe to nakładanie się sesji londyńskiej i nowojorskiej. To, kiedy to nakładanie przypada na Twoim lokalnym zegarze — zwykły poranek czy środek nocy — wpływa na to, w jakich godzinach możesz realnie handlować na koncie, nie zaburzając swojego rytmu snu.",
    },
  ],
  alsoInTemplate: "Także w regionie: {region}",
  allCountriesLinkText: "Wszystkie kraje →",
  regionLabels: {
    "North America": "Ameryka Północna",
    "UK & Europe": "Wielka Brytania i Europa",
    "Asia-Pacific": "Azja i Pacyfik",
    "Middle East & Africa": "Bliski Wschód i Afryka",
  },
};
