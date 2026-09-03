import type { CountryPageCopy } from "@/components/content/CountryPageContent";

export const it: CountryPageCopy = {
  backLinkText: "← Prop firm per paese",
  kickerTemplate: "Guida per trader · {country}",
  h1Template: "Società di proprietary trading per i trader in {country}",
  metaDescriptionTemplate:
    "Una guida per trader alle challenge delle prop firm da {country}: come {regulator} tratta il trading forex/CFD retail, gli orari delle sessioni, le considerazioni su finanziamento e payout, oltre alla leaderboard live di TraderMarket.",
  defaultRegulatorLabel: "le autorità di regolamentazione locali",
  introTemplate:
    "Le prop firm in sé sono globali — TraderMarket non traccia quali società limitano quali paesi. Ciò che cambia realmente in base a dove fai trading è il contesto normativo, quando le ore di trading più intense cadono sul tuo orologio, e come muovi il denaro per finanziare una valutazione o ricevere un payout. Ecco cosa conta per un trader con sede in {country}.",
  currencyLabel: "Valuta:",
  timezoneLabel: "Fuso orario:",
  regulatorLabel: "Autorità di regolamentazione:",
  regulationHeading: "Regolamentazione: cosa si applica davvero a una challenge di una prop firm",
  sessionHeadingTemplate: "Orari delle sessioni da {country}",
  paymentHeading: "Finanziare le valutazioni e ricevere i payout",
  assetClassHeading: "Quale classe di asset è più adatta",
  assetClassFuturesTemplate:
    "Considerato il quadro normativo sopra descritto, la maggior parte dei trader con sede in {country} finisce per rivolgersi a {link} piuttosto che a challenge multi-asset in stile CFD.",
  assetClassMultiTemplate:
    "I trader in {country} hanno generalmente accesso a tutta la gamma di tipologie di prop firm. Consulta {forex}, {futures} e {crypto} per capire come differiscono le regole di ciascuna classe di asset prima di sceglierne una.",
  assetClassForexLabel: "prop firm forex",
  assetClassFuturesLabel: "prop firm futures",
  assetClassCryptoLabel: "crypto",
  assetClassMultiLabel: "ogni prop firm recensita su TraderMarket",
  firmsHeading: "Prop firm elencate su TraderMarket",
  firmsIntro:
    "La stessa leaderboard live che vedono i trader di tutto il mondo — verifica l'idoneità per paese e i termini di payout direttamente sul sito di ciascuna società.",
  allReviewsLinkText: "Vedi tutte le recensioni delle prop firm →",
  faqHeading: "Domande frequenti",
  sharedFaqs: [
    {
      q: "Le prop firm limitano quali paesi possono iscriversi?",
      a: "Alcune sì, di solito per motivi normativi più che legati al trading — l'esempio più chiaro sono gli Stati Uniti, dove la maggior parte delle società multi-asset in stile CFD esclude i residenti statunitensi, e le società solo futures colmano quel vuoto. TraderMarket non traccia l'idoneità per paese di ciascuna società, quindi verifica sempre direttamente sul sito della società stessa prima di pagare una tariffa di valutazione.",
    },
    {
      q: "La regolamentazione del mio paese si applica a una challenge di una prop firm?",
      a: "Di solito non direttamente. Una valutazione di una prop firm è tipicamente una simulazione finanziata con capitale demo eseguita sulla piattaforma della società stessa, non un conto live presso un broker regolamentato localmente — quindi i tetti di leva retail e le regole di licenza dei broker che ti proteggono quando fai trading con un broker regolamentato in genere non si applicano alla challenge in sé. Proprio per questo la ricerca indipendente (prova dei payout, recensioni, registrazione della società) conta qui più che per un conto presso un broker regolamentato.",
    },
    {
      q: "Dovrò pagare le tasse sui payout delle prop firm?",
      a: "In quasi tutti i paesi, sì — il profitto di trading è generalmente reddito imponibile o plusvalenza, indipendentemente dal paese in cui ha sede la società. Il modo in cui viene classificato (reddito d'impresa, plusvalenza o altro) varia molto da paese a paese e persino in base a come fai trading, quindi le note fiscali di questa pagina sono un punto di partenza, non un sostituto di un commercialista locale.",
    },
    {
      q: "Perché il fuso orario è importante nella scelta di una prop firm?",
      a: "Regole di valutazione come i limiti di perdita giornaliera si resettano a un orario server fisso, e la finestra di trading più intensa e volatile è la sovrapposizione tra Londra e New York. Il momento in cui questa sovrapposizione cade sul tuo orologio locale — una normale mattina, oppure nel cuore della notte — influisce su quali ore puoi realisticamente negoziare il conto senza sconvolgere il tuo ritmo di sonno.",
    },
  ],
  alsoInTemplate: "Anche in {region}",
  allCountriesLinkText: "Tutti i paesi →",
  regionLabels: {
    "North America": "Nord America",
    "UK & Europe": "Regno Unito ed Europa",
    "Asia-Pacific": "Asia-Pacifico",
    "Middle East & Africa": "Medio Oriente e Africa",
  },
};
