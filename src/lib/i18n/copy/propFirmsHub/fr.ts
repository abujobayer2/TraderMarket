import type { PropFirmsHubCopy } from "@/components/content/PropFirmsHubContent";

export const fr: PropFirmsHubCopy = {
  kicker: "Guides du trader",
  h1: "Prop firms par pays",
  intro:
    "Les sociétés de trading pour compte propre elles-mêmes sont mondiales. Ce qui change réellement selon l'endroit d'où vous tradez, c'est la réglementation, le moment où tombent les heures de marché les plus actives sur votre horloge, et la manière dont vous faites transiter votre argent pour financer une évaluation ou recevoir un retrait. Choisissez votre pays ci-dessous.",
  regionLabels: {
    "North America": "Amérique du Nord",
    "UK & Europe": "Royaume-Uni et Europe",
    "Asia-Pacific": "Asie-Pacifique",
    "Middle East & Africa": "Moyen-Orient et Afrique",
  },
  faqHeading: "FAQ",
  faqs: [
    {
      q: "TraderMarket suit-il quelles sociétés acceptent quels pays ?",
      a: "Non. Les prop firms ne publient pas de données structurées sur l'éligibilité par pays, et TraderMarket ne fait pas de suppositions. Chaque guide de pays couvre ce qui diffère réellement selon la localisation — réglementation, horaires de session, logistique de financement et de retrait — et vous renvoie toujours vers le site propre de la société pour confirmer l'éligibilité avant de payer.",
    },
    {
      q: "Pourquoi n'y a-t-il pas encore de page pour mon pays ?",
      a: "Cette liste couvre d'abord les pays où le volume de recherche pour le trading pour compte propre destiné aux particuliers est le plus important. C'est une liste statique, fondée sur des données, donc ajouter un pays est simple — si le vôtre manque, c'est simplement que le contenu sous-jacent (réglementation, fuseau horaire, notes de paiement) n'a pas encore été rédigé.",
    },
  ],
  relatedHeading: "Guides connexes",
  relatedForex: "Prop firms forex",
  relatedFutures: "Prop firms futures",
  relatedCrypto: "Prop firms crypto",
  relatedReviews: "Avis sur les prop firms",
};
