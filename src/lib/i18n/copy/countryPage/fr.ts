import type { CountryPageCopy } from "@/components/content/CountryPageContent";

export const fr: CountryPageCopy = {
  backLinkText: "← Prop firms par pays",
  kickerTemplate: "Guide du trader · {country}",
  h1Template: "Sociétés de trading pour compte propre pour les traders en {country}",
  metaDescriptionTemplate:
    "Un guide du trader sur les challenges de prop firm depuis {country} : comment {regulator} traite le trading forex/CFD pour les particuliers, les horaires de session, les considérations de financement et de retrait, ainsi que le classement TraderMarket en direct.",
  defaultRegulatorLabel: "les régulateurs locaux",
  introTemplate:
    "Les prop firms elles-mêmes sont mondiales — TraderMarket ne suit pas quelles sociétés restreignent quels pays. Ce qui change réellement selon l'endroit d'où vous tradez, c'est le contexte réglementaire, le moment où tombent les heures de trading les plus actives sur votre horloge, et la manière dont vous faites transiter votre argent pour financer une évaluation ou recevoir un retrait. Voici ce qui compte pour un trader basé en {country}.",
  currencyLabel: "Devise :",
  timezoneLabel: "Fuseau horaire :",
  regulatorLabel: "Régulateur :",
  regulationHeading: "Réglementation : ce qui s'applique réellement à un challenge de prop firm",
  sessionHeadingTemplate: "Horaires de session depuis {country}",
  paymentHeading: "Financer les évaluations et recevoir les retraits",
  assetClassHeading: "Quelle classe d'actifs convient",
  assetClassFuturesTemplate:
    "Compte tenu du contexte réglementaire ci-dessus, la plupart des traders basés en {country} finissent par se tourner vers les {link} plutôt que vers des challenges multi-actifs de type CFD.",
  assetClassMultiTemplate:
    "Les traders en {country} ont généralement accès à toute la gamme de prop firms. Consultez les prop firms {forex}, {futures} et {crypto} pour voir en quoi les règles de chaque classe d'actifs diffèrent avant de faire votre choix.",
  assetClassForexLabel: "forex",
  assetClassFuturesLabel: "futures",
  assetClassCryptoLabel: "crypto",
  assetClassMultiLabel: "toutes les prop firms évaluées sur TraderMarket",
  firmsHeading: "Prop firms inscrites sur TraderMarket",
  firmsIntro:
    "Le même classement en direct que les traders du monde entier consultent — vérifiez directement sur le site de chaque société l'éligibilité par pays et les conditions de retrait.",
  allReviewsLinkText: "Voir tous les avis sur les prop firms →",
  faqHeading: "FAQ",
  sharedFaqs: [
    {
      q: "Les prop firms restreignent-elles les pays pouvant s'inscrire ?",
      a: "Certaines, oui, généralement pour des raisons réglementaires plutôt que liées au trading lui-même — l'exemple le plus clair est les États-Unis, où la plupart des sociétés multi-actifs de type CFD excluent les résidents américains, les sociétés spécialisées en futures comblant ce vide à leur place. TraderMarket ne suit pas l'éligibilité par pays propre à chaque société, alors vérifiez toujours directement sur le site de la société avant de payer des frais d'évaluation.",
    },
    {
      q: "La réglementation de mon pays s'applique-t-elle à un challenge de prop firm ?",
      a: "Généralement pas directement. Une évaluation de prop firm est en général une simulation financée en démo, exécutée sur la propre plateforme de la société, et non un compte réel chez un courtier réglementé localement — les plafonds de levier pour particuliers et les règles de licence de courtier qui vous protègent lorsque vous tradez avec un courtier réglementé ne s'appliquent donc généralement pas au challenge lui-même. C'est précisément pourquoi une recherche indépendante (preuve de paiement, avis, immatriculation de la société) compte davantage ici que pour un compte de courtage réglementé.",
    },
    {
      q: "Devrai-je payer des impôts sur les retraits d'une prop firm ?",
      a: "Dans presque tous les pays, oui — le profit de trading constitue généralement un revenu imposable ou une plus-value, quel que soit le pays où la société est basée. La manière dont il est classé (revenu professionnel, plus-value, ou autre) varie beaucoup selon le pays et même selon votre façon de trader, donc les notes fiscales de cette page sont un point de départ, pas un substitut à un comptable local.",
    },
    {
      q: "Pourquoi le fuseau horaire compte-t-il pour choisir une prop firm ?",
      a: "Des règles d'évaluation comme les limites de perte journalière se réinitialisent à une heure serveur fixe, et la fenêtre de trading la plus active et la plus volatile est le chevauchement Londres/New York. Le moment où ce chevauchement tombe sur votre horloge locale — un matin normal, ou en pleine nuit — détermine les heures pendant lesquelles vous pouvez réellement trader le compte sans perturber votre sommeil.",
    },
  ],
  alsoInTemplate: "Aussi en {region}",
  allCountriesLinkText: "Tous les pays →",
  regionLabels: {
    "North America": "Amérique du Nord",
    "UK & Europe": "Royaume-Uni et Europe",
    "Asia-Pacific": "Asie-Pacifique",
    "Middle East & Africa": "Moyen-Orient et Afrique",
  },
};
