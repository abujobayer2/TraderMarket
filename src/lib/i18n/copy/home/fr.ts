import type { HomeCopy } from "@/components/content/HomeContent";

export const fr: HomeCopy = {
  liveBadgeFirmsTemplate: "{count} sociétés inscrites",
  liveBadgeBids: "en enchères",
  liveBadgeSeeBoard: "voir le tableau →",
  h1: "Le classement des prop firms — comparez, évaluez et classez les sociétés de trading pour compte propre",
  introTemplate:
    "TraderMarket classe les prop firms selon une enchère publique et unique — aucune commission d'affiliation, aucune notation éditoriale. Parcourez le {leaderboard}, lisez les {reviews}, ou comparez les programmes financés en {forex}, {futures} et {crypto}.",
  introLeaderboardLink: "classement en direct",
  introReviewsLink: "avis des traders",
  introForexLink: "forex",
  introFuturesLink: "futures",
  introCryptoLink: "crypto",
  liveRankingsKicker: "Classement en direct",
  leaderboardHeading: "🏆 Classement des prop firms",
  howItWorksKicker: "Comment ça marche",
  howItWorksHeading: "Trois étapes pour obtenir votre rang",
  steps: [
    {
      n: "01",
      title: "Inscrivez-vous",
      body: "Soumettez votre prop firm — nom, site web, logo et une courte description.",
    },
    {
      n: "02",
      title: "Choisissez votre position",
      body: "Choisissez n'importe quel rang sur le classement. Chaque position a son propre prix actuel.",
    },
    {
      n: "03",
      title: "Surenchérissez et grimpez",
      body: "Payez plus que la société qui détient actuellement cette place. Un seul paiement. Sans abonnement.",
    },
  ],
  onePayment: "Un seul paiement. Sans abonnement.",
  ctaHeading: "Prêt à revendiquer votre rang ?",
  ctaBody: "Choisissez une position, fixez votre enchère, et payez une seule fois. Votre rang reste acquis jusqu'à ce que quelqu'un vous surenchérisse.",
  ctaButton: "Inscrire votre prop firm",
  heroBidWidget: {
    claimFirstFor: "Obtenez la 1ère place pour",
    newSpotsStartAt: "Les nouvelles places démarrent à ${amount}.",
    outbidBelowTop:
      "Payer moins que le prix de la 1ère place vous place tout de même sur le tableau, au rang que cette enchère peut atteindre.",
    boardEmpty: "Le tableau est vide — soyez la première société inscrite.",
    websitePlaceholder: "Le site web de votre prop firm",
    startingCheckout: "Démarrage du paiement…",
    outbidButton: "Surenchérir — ${amount}",
    alreadyListed: "Déjà sur le tableau ? Entrez le même site web pour relever votre enchère.",
  },
};
