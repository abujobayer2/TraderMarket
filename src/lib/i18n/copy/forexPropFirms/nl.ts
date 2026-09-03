import type { ForexPropFirmsCopy } from "@/components/content/ForexPropFirmsContent";

export const nl: ForexPropFirmsCopy = {
  kicker: "Traderhandleiding · Forex",
  h1: "Forex propfirma's, en hoe funded forextrading echt werkt",
  intro:
    "Forex is het grootste segment van de propfirma-markt, en de regels hebben hun eigen vorm: statische drawdown, ruime hefboom, sessies van 24/5, en newstrading-beleid dat meer evaluaties bepaalt dan het winstdoel zelf. Dit is wat funded forexprogramma's onderscheidt van futures en crypto — en hoe je er een beoordeelt voordat je betaalt.",
  howItWorksHeading: "Hoe een funded forex-evaluatie werkt",
  howItWorksBody:
    "Je betaalt eenmalig voor een evaluatieaccount, handelt op een demo gefinancierd met het nominale kapitaal van de firma, en probeert een winstdoel te bereiken — doorgaans 8–10% in fase één en 4–5% in fase twee — zonder een dagelijkse verlieslimiet of een maximale drawdown te overschrijden. Slaag je, dan ga je naar een funded account waar een winstverdeling van 70–90% geldt en uitbetalingen op een vaste cyclus kunnen worden aangevraagd, meestal elke 1–4 weken. Er bestaan varianten met één stap, twee stappen en instant funding; de afweging zit in de kosten, de doelgrootte en hoe streng de drawdown is.",
  drawdownHeading: "Statische drawdown: de forex-specifieke regel die je moet begrijpen",
  drawdownBody:
    "Forexfirma's gebruiken vrijwel universeel een statische maximale drawdown gemeten vanaf je startsaldo, naast een dagelijkse verlieslimiet. In tegenstelling tot de trailing drawdown bij de meeste futuresfirma's schuift de verlieslijn niet mee omhoog naarmate je winst boekt — zodra je een paar procent voorstaat, is de kans veel kleiner dat een normale verliesdag het account beëindigt. De details waar traders nog steeds over struikelen: of de dagelijkse limiet wordt gemeten op gesloten saldo of vlottend eigen vermogen, op welk servertijdstip deze wordt gereset, en of de maximale drawdown absoluut is of ook meeschuift totdat je een vastgestelde winst bereikt.",
  sessionsHeading: "Hefboom, sessies en newstrading",
  sessionsItems: [
    "De hefboom is doorgaans 1:30–1:100, soms 1:50 als betaalde toevoeging. Dit verandert je marge, niet je drawdown-marge.",
    "De markt draait 24/5. Posities kunnen meestal 's nachts en in het weekend worden aangehouden, in tegenstelling tot de meeste futuresprogramma's — controleer swap-/financieringskosten.",
    "Newstrading-beleid is de regel met de grootste variatie: volledig toegestaan, geblokkeerd rond high-impact publicaties, of alleen tijdens de evaluatie. Handel je op NFP of CPI, bevestig dit dan schriftelijk.",
    "Posities aanhouden in het weekend is bij de meeste forexfirma's toegestaan, maar kan een gap-risicoclausule met zich meebrengen. Crypto-blootstelling, indien aangeboden, kan het hele weekend door verhandeld worden.",
  ],
  dueDiligenceHeading: "Due diligence voordat je een forexaccount financiert",
  dueDiligenceItems: [
    "Uitbetalingsbewijs: verifieerbare gegevens, geen testimonials die de firma zelf beheert.",
    "Trackrecord: jaren waarin daadwerkelijk traders worden gefinancierd, niet maanden aan advertenties.",
    "Uitbetalingsvoorwaarden: inactiviteitsclausules, consistentieregels, minimum handelsdagen, KYC-stappen die een uitbetaling kunnen vertragen.",
    "Platform- en automatiseringsbeleid: MT4/MT5/cTrader/Match-Trader, en of EA's of copy trading zijn toegestaan.",
    "Onafhankelijke reviews: wat traders zeggen buiten de eigen marketing en Trustpilot-pagina van de firma om.",
  ],
  dueDiligencePrefix: "Lees de",
  dueDiligenceLinkText: "gids voor funded tradingprogramma's",
  dueDiligenceSuffix: "voor de volledige checklist over of deze firma na het slagen echt uitbetaalt.",
  firmsHeading: "Propfirma's vermeld op TraderMarket",
  firmsIntro:
    "De meeste multi-asset firma's hieronder bieden forexparen aan. Open de reviewpagina van een firma om te zien wat traders specifiek zeggen over de forexvoorwaarden, en verifieer de uitbetalingsgeschiedenis vervolgens zelf.",
  allReviewsLinkText: "Bekijk alle propfirma-reviews →",
  faqHeading: "Forex propfirma's — Veelgestelde vragen",
  faqs: [
    {
      q: "Wat is een forex propfirma?",
      a: "Een forex proprietary trading firma geeft een trader toegang tot het kapitaal van de firma om valutaparen te verhandelen, in ruil voor een deel van de winst. De trader betaalt eenmalig een evaluatiekosten, bewijst een winstdoel te kunnen halen met inachtneming van drawdownlimieten — meestal over een of twee fasen — en handelt vervolgens op een funded account met een winstverdeling van 70–90%.",
    },
    {
      q: "Welk drawdownmodel gebruiken forex propfirma's?",
      a: "De meeste forexfirma's gebruiken een statische (vaste) maximale drawdown gemeten vanaf het startsaldo, plus een aparte dagelijkse verlieslimiet. Dit is coulanter dan de trailing/intraday drawdown die gebruikelijk is bij futuresfirma's, omdat de verlieslijn niet met je eigen vermogen meestijgt naarmate je winst maakt. Lees altijd of de dagelijkse limiet wordt berekend op saldo of eigen vermogen, en of deze op een vast servertijdstip wordt gereset.",
    },
    {
      q: "Hoeveel hefboom bieden forex propfirma's?",
      a: "Funded forexaccounts bieden doorgaans een hefboom van 1:30 tot 1:100, waarbij sommige firma's tot 1:50 gaan als toevoeging. Een hogere hefboom verandert de drawdownregels niet, dus het beïnvloedt vooral de marge, niet hoeveel je kunt verliezen voordat je de limiet overschrijdt.",
    },
    {
      q: "Kan ik het nieuws handelen bij een forex propfirma?",
      a: "Dat verschilt. Sommige firma's staan newstrading op het funded account volledig toe, andere blokkeren het openen of sluiten van posities binnen enkele minuten rond high-impact publicaties, en weer andere beperken dit alleen tijdens de evaluatie. Handel je op NFP, CPI of centralebankgebeurtenissen, behandel het newsbeleid dan als een cruciale regel en bevestig dit schriftelijk voordat je koopt.",
    },
    {
      q: "Welke platforms gebruiken forex propfirma's?",
      a: "MetaTrader 4, MetaTrader 5, cTrader en Match-Trader zijn het meest gebruikelijk. De platformkeuze beïnvloedt de uitvoeringsstijl, beschikbare ordertypes, en of je expert advisors kunt draaien — controleer het automatiserings- en copy-tradingbeleid van de firma als dat voor jou belangrijk is.",
    },
    {
      q: "Hoe weet ik of een forex propfirma echt uitbetaalt?",
      a: "Zoek naar verifieerbaar uitbetalingsbewijs in plaats van testimonials die de firma zelf beheert, controleer hoe lang de firma al traders financiert, lees de uitbetalingsvoorwaarden op inactiviteit, consistentie of KYC-voorwaarden die een uitbetaling kunnen vertragen, en lees onafhankelijke traderreviews. De rang van een firma op elke ranglijst, inclusief TraderMarket, weerspiegelt wat er is betaald voor zichtbaarheid — geen garantie op uitbetaling.",
    },
  ],
  relatedHeading: "Gerelateerde gidsen",
  relatedFutures: "Futures propfirma's",
  relatedCrypto: "Crypto propfirma's",
  relatedBest: "Beste proptradingfirma's",
  relatedReviews: "Propfirma-reviews",
  relatedCountry: "Propfirma's per land",
};
