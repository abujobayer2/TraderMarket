import type { FuturesPropFirmsCopy } from "@/components/content/FuturesPropFirmsContent";

export const nl: FuturesPropFirmsCopy = {
  kicker: "Traderhandleiding · Futures",
  h1: "Futures propfirma's, en de regels die je account echt bepalen",
  intro:
    "Funded futuresprogramma's ogen eenvoudig vergeleken met forex — gestandaardiseerde doelen, vertrouwde contracten — maar de drawdown- en uitbetalingsmechanica is strenger. Trailing drawdown, flat-by-close-regels, datakosten en consistentievereisten zijn waar evaluaties en uitbetalingen worden gewonnen of verloren. Dit is hoe het futuressegment verschilt, en hoe je een firma beoordeelt.",
  howItWorksHeading: "Hoe een funded futures-evaluatie werkt",
  howItWorksBody:
    "Je koopt een evaluatieaccount met een omvang uitgedrukt in koopkracht (50K, 100K, 150K zijn gebruikelijk), handelt CME-groep futures, en bereikt een winstdoel terwijl je boven een trailing maximale drawdown en onder een dagelijkse verlieslimiet blijft. Veel firma's hanteren een evaluatie in één fase zonder minimale winst-per-dag-vereiste om te slagen, maar koppelen wel een consistentieregel aan uitbetalingen. Eenmaal funded, houd je bij sommige firma's 90–100% van de eerste winstschijf, gevolgd door een verdeling van 90/10, met uitbetalingen op een vast schema.",
  drawdownHeading: "Trailing drawdown: de regel die de meeste accounts beëindigt",
  drawdownBody:
    "De maximale verliesdrempel volgt de piek van je account. Bij de meeste firma's volgt deze het intraday niet-gerealiseerde eigen vermogen, dus een trade die naar +$800 gaat en die je sluit op +$300 heeft de drawdownlijn nog steeds met $800 opgetrokken. De trailing stopt zodra je saldo boven het initiële saldo plus een vaste buffer komt, waarna deze feitelijk statisch wordt. Vergelijk dit met forex, waar een statische drawdown vanaf het startsaldo nooit verschuift. Als je in- en uitschaalt op runners, simuleer dan de trailing-wiskunde tegen je slechtste intraday-uitschieters voordat je koopt.",
  flatByCloseHeading: "Flat-by-close, datakosten en platforms",
  flatByCloseItems: [
    "De meeste firma's vereisen dat elke positie wordt gesloten vóór het einde van de sessie en vóór het dagelijkse onderhoud. Geen overnight-posities is de standaard; overnight aanhouden is vaak een beloning voor het bereiken van een uitbetalingsmijlpaal.",
    "Live CME-data brengt een niet-professionele beurstoeslag met zich mee die de meeste firma's doorberekenen op funded accounts. Reken maandelijkse platform- of resetkosten mee in je werkelijke kosten.",
    "Orderrouting verloopt via Rithmic of Tradovate, weergegeven via NinjaTrader, Tradovate web, TradingView of Quantower. Fills worden gerouteerd via een gereguleerde FCM.",
    "De regels zijn meer gestandaardiseerd dan bij forex omdat de gereguleerde keten firma's minder ruimte laat om te improviseren — maar consistentie- en scalingregels verschillen nog steeds sterk.",
  ],
  dueDiligenceHeading: "Due diligence voordat je een futuresaccount financiert",
  dueDiligenceItems: [
    "Uitbetalingsbewijs en uitbetalingsfrequentie: verifieerbare gegevens, en hoe vaak je daadwerkelijk kunt opnemen.",
    "Type trailing drawdown: intraday versus einde van de dag, en waar deze vastklikt.",
    "Consistentieregel: het exacte percentage, en of het uitbetalingen, de evaluatie, of beide beperkt.",
    "Totale kosten: evaluatiekosten + maandelijkse data + platform-/resetkosten + activeringskosten op het funded account.",
    "Onafhankelijke reviews specifiek van futurestraders — forexfeedback is niet één-op-één overdraagbaar.",
  ],
  dueDiligencePrefix: "De",
  dueDiligenceLinkText: "gids voor funded tradingprogramma's",
  dueDiligenceSuffix: "behandelt de algemene 'betalen na slagen'-controles die voor elke firma gelden.",
  firmsHeading: "Propfirma's vermeld op TraderMarket",
  firmsIntro:
    "Open de reviewpagina van een firma om te zien of traders de futuresregels bespreken — gedrag van de trailing drawdown, overnight-beleid, datakosten — en verifieer de uitbetalingsgeschiedenis vervolgens zelf.",
  allReviewsLinkText: "Bekijk alle propfirma-reviews →",
  faqHeading: "Futures propfirma's — Veelgestelde vragen",
  faqs: [
    {
      q: "Wat is een futures propfirma?",
      a: "Een futures proprietary trading firma geeft een trader een evaluatieaccount om CME-, CBOT-, NYMEX- of COMEX-futures te verhandelen — ES, NQ, GC, CL en micro's. Slaag voor de evaluatie door een winstdoel te bereiken zonder de trailing drawdown of dagelijkse verlieslimiet te raken, handel vervolgens op een funded account en vraag uitbetalingen aan volgens de uitbetalingsregels van de firma.",
    },
    {
      q: "Hoe werkt trailing drawdown bij een futures propfirma?",
      a: "De maximale verlieslijn volgt de piek van je account — vaak de piek van het niet-gerealiseerde (intraday) eigen vermogen, soms het saldo aan het einde van de dag. Naarmate je account stijgt, schuift de drawdown erachteraan mee, en klikt vast zodra je het startsaldo plus een vaste buffer overschrijdt. Dit is strenger dan de statische drawdown bij de meeste forexfirma's: een open positie die tijdelijk sterk in winst piekt en terugvalt, kan je dichter bij een overtreding brengen, zelfs als je met winst sluit.",
    },
    {
      q: "Kan ik futuresposities overnight aanhouden?",
      a: "Meestal niet tijdens de evaluatie en de vroege funded fase. De meeste futuresfirma's vereisen dat alle posities vlak zijn vóór het einde van de sessie (en vóór belangrijke onderhoudsvensters), waarbij sommige overnight aanhouden alleen toestaan nadat je een uitbetalingsmijlpaal hebt bereikt of bent geüpgraded naar een 'pro'-/live-account. Aanhouden over de close op een no-overnight account is doorgaans een directe regelovertreding.",
    },
    {
      q: "Moet ik betalen voor marktdata bij een futures propfirma?",
      a: "Vaak wel. Live CME-data voor een niet-professionele trader brengt een beurstoeslag met zich mee (ongeveer $10–$15 per beursbundel per maand) die de meeste firma's doorberekenen op funded accounts. Evaluatieaccounts bevatten soms vertraagde of door de firma gesponsorde data. Begroot voor data en eventuele maandelijkse platform-/resetkosten, niet alleen de evaluatieprijs.",
    },
    {
      q: "Welke platforms gebruiken futures propfirma's?",
      a: "Rithmic en Tradovate zijn de twee belangrijkste order-routingbackends, weergegeven via NinjaTrader, het eigen webplatform van Tradovate, TradingView, Quantower of R|Trader. Je fills en P&L worden gerouteerd via een gereguleerde futures commission merchant, wat een van de redenen is waarom regels van futuresfirma's meer gestandaardiseerd zijn dan bij forex.",
    },
    {
      q: "Wat is een consistentieregel en waarom is die belangrijk voor uitbetalingen?",
      a: "Een consistentieregel beperkt hoeveel van je totale winst één enkele dag mag vertegenwoordigen — doorgaans 20–40%. Dit is ontworpen om te voorkomen dat een trader slaagt dankzij één gelukkige dag. Het geldt meestal voor de uitbetalingsgeschiktheid in plaats van de evaluatie zelf, dus je kunt slagen en toch geblokkeerd worden voor opname totdat je winst over meer dagen is gespreid. Lees het exacte percentage en of dit wordt gemeten op de evaluatie, het funded account, of beide.",
    },
  ],
  relatedHeading: "Gerelateerde gidsen",
  relatedForex: "Forex propfirma's",
  relatedCrypto: "Crypto propfirma's",
  relatedBest: "Beste proptradingfirma's",
  relatedReviews: "Propfirma-reviews",
  relatedCountry: "Propfirma's per land",
};
