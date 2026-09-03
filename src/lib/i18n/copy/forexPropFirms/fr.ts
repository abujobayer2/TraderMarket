import type { ForexPropFirmsCopy } from "@/components/content/ForexPropFirmsContent";

export const fr: ForexPropFirmsCopy = {
  kicker: "Guide du trader · Forex",
  h1: "Les prop firms forex, et le fonctionnement réel du trading forex financé",
  intro:
    "Le forex représente la plus grande part du marché des prop firms, et ses règles ont une forme qui leur est propre : drawdown statique, effet de levier généreux, sessions 24 h/5, et des politiques de trading autour des annonces économiques qui décident du sort de plus d'évaluations que l'objectif de profit lui-même. Voici ce qui distingue les programmes financés forex des futures et de la crypto — et comment évaluer une société avant de payer.",
  howItWorksHeading: "Comment fonctionne une évaluation forex financée",
  howItWorksBody:
    "Vous payez des frais uniques pour un compte d'évaluation, tradez un compte démo alimenté par le capital notionnel de la société, et tentez d'atteindre un objectif de profit — généralement 8 à 10 % en phase un et 4 à 5 % en phase deux — sans dépasser une limite de perte journalière ni un drawdown maximal. En cas de réussite, vous passez à un compte financé où s'applique un partage des profits de 70 à 90 %, avec des retraits que l'on peut demander selon un cycle fixe, généralement toutes les 1 à 4 semaines. Il existe des variantes à une étape, deux étapes et financement instantané ; le compromis porte sur les frais, la taille de l'objectif et la rigueur du drawdown.",
  drawdownHeading: "Le drawdown statique : la règle spécifique au forex à comprendre",
  drawdownBody:
    "Les sociétés forex utilisent presque universellement un drawdown maximal statique mesuré à partir de votre solde de départ, associé à une limite de perte journalière. Contrairement au drawdown glissant en vigueur chez la plupart des sociétés de futures, la ligne de perte ne remonte pas à mesure que vous engrangez du profit — une fois que vous avez quelques pourcents d'avance, une journée de pertes normale a beaucoup moins de chances de mettre fin au compte. Les détails qui piègent encore les traders : si la limite journalière est mesurée sur le solde clôturé ou sur l'équité flottante, à quelle heure serveur elle se réinitialise, et si le drawdown maximal est absolu ou continue lui aussi de suivre jusqu'à ce qu'un certain seuil de profit soit atteint.",
  sessionsHeading: "Effet de levier, sessions et trading des annonces économiques",
  sessionsItems: [
    "L'effet de levier est généralement de 1:30 à 1:100, parfois 1:50 en option payante. Cela modifie votre marge, pas votre marge de manœuvre sur le drawdown.",
    "Le marché fonctionne 24 h/5. Les positions peuvent généralement être conservées la nuit et le week-end, contrairement à la plupart des programmes futures — vérifiez les frais de swap/financement.",
    "La politique sur le trading des annonces économiques est la règle la plus variable : totalement autorisée, bloquée autour des publications à fort impact, ou réservée à la phase d'évaluation. Si vous tradez le NFP ou le CPI, confirmez-le par écrit.",
    "La détention de positions le week-end est autorisée chez la plupart des sociétés forex, mais peut être assortie d'une clause de risque de gap. L'exposition crypto, lorsqu'elle est proposée, peut se trader pendant le week-end.",
  ],
  dueDiligenceHeading: "Vérifications à faire avant de financer un compte forex",
  dueDiligenceItems: [
    "Preuve de paiement : des registres vérifiables, pas seulement des témoignages contrôlés par la société.",
    "Antériorité : des années à réellement financer des traders, pas des mois à faire de la publicité.",
    "Conditions de retrait : clauses d'inactivité, règles de régularité, nombre minimal de jours de trading, étapes KYC susceptibles de retarder un retrait.",
    "Plateforme et politique d'automatisation : MT4/MT5/cTrader/Match-Trader, et si les EA ou le copy trading sont autorisés.",
    "Avis indépendants : ce que disent les traders en dehors du marketing propre à la société et de sa page Trustpilot.",
  ],
  dueDiligencePrefix: "Consultez le",
  dueDiligenceLinkText: "guide des programmes de trading financés",
  dueDiligenceSuffix: 'pour la check-list complète « est-ce que cette société paie après la réussite ».',
  firmsHeading: "Prop firms inscrites sur TraderMarket",
  firmsIntro:
    "La plupart des sociétés multi-actifs ci-dessous proposent des paires forex. Ouvrez la page d'avis d'une société pour voir ce que les traders disent spécifiquement de ses conditions forex, puis vérifiez vous-même son historique de paiement.",
  allReviewsLinkText: "Voir tous les avis sur les prop firms →",
  faqHeading: "Prop firms forex — FAQ",
  faqs: [
    {
      q: "Qu'est-ce qu'une prop firm forex ?",
      a: "Une société de trading pour compte propre spécialisée en forex donne à un trader accès au capital de la société pour trader des paires de devises, en échange d'une part des profits. Le trader paie des frais d'évaluation uniques, prouve qu'il peut atteindre un objectif de profit tout en respectant les limites de drawdown — généralement sur une ou deux phases —, puis trade un compte financé avec un partage des profits de 70 à 90 %.",
    },
    {
      q: "Quel modèle de drawdown utilisent les prop firms forex ?",
      a: "La plupart des sociétés forex utilisent un drawdown maximal statique (fixe) mesuré à partir du solde de départ, ainsi qu'une limite de perte journalière distincte. C'est plus indulgent que le drawdown glissant/intrajournalier courant chez les sociétés de futures, car la ligne de perte ne suit pas votre équité à la hausse à mesure que vous réalisez des profits. Vérifiez toujours si la limite journalière est calculée sur le solde ou sur l'équité, et si elle se réinitialise à une heure serveur fixe.",
    },
    {
      q: "Quel effet de levier proposent les prop firms forex ?",
      a: "Les comptes financés forex proposent généralement un effet de levier de 1:30 à 1:100, certaines sociétés allant jusqu'à 1:50 en option. Un effet de levier plus élevé ne modifie pas les règles de drawdown ; il affecte donc principalement la marge, pas le montant que vous pouvez perdre avant d'enfreindre les règles.",
    },
    {
      q: "Peut-on trader les annonces économiques dans une prop firm forex ?",
      a: "Cela varie. Certaines sociétés autorisent totalement le trading des annonces sur le compte financé, d'autres bloquent l'ouverture ou la clôture de positions dans les minutes qui entourent les publications à fort impact, et d'autres ne le restreignent que pendant l'évaluation. Si vous tradez le NFP, le CPI ou les annonces des banques centrales, traitez la politique sur les annonces comme une règle décisive et confirmez-la par écrit avant d'acheter.",
    },
    {
      q: "Quelles plateformes utilisent les prop firms forex ?",
      a: "MetaTrader 4, MetaTrader 5, cTrader et Match-Trader sont les plus courantes. Le choix de la plateforme influe sur le style d'exécution, les types d'ordres disponibles, et la possibilité de faire fonctionner des experts advisors — vérifiez la politique d'automatisation et de copy trading de la société si cela compte pour vous.",
    },
    {
      q: "Comment savoir si une prop firm forex paie réellement ?",
      a: "Recherchez des preuves de paiement vérifiables plutôt que des témoignages contrôlés par la société, vérifiez depuis combien de temps la société finance des traders, lisez les conditions de retrait à la recherche de clauses d'inactivité, de régularité ou de KYC susceptibles de retarder un retrait, et lisez des avis de traders indépendants. Le rang d'une société sur n'importe quel classement, y compris TraderMarket, reflète ce qu'elle a payé pour sa visibilité — pas une garantie de paiement.",
    },
  ],
  relatedHeading: "Guides connexes",
  relatedFutures: "Prop firms futures",
  relatedCrypto: "Prop firms crypto",
  relatedBest: "Meilleures prop trading firms",
  relatedReviews: "Avis sur les prop firms",
  relatedCountry: "Prop firms par pays",
};
