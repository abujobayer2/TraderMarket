import type { FuturesPropFirmsCopy } from "@/components/content/FuturesPropFirmsContent";

export const fr: FuturesPropFirmsCopy = {
  kicker: "Guide du trader · Futures",
  h1: "Les prop firms futures, et les règles qui décident vraiment du sort de votre compte",
  intro:
    "Les programmes financés futures paraissent simples à côté du forex — objectifs standardisés, contrats familiers — mais les mécanismes de drawdown et de paiement sont plus stricts. Drawdown glissant, règle de clôture à plat, frais de données, et exigences de régularité sont les points sur lesquels se jouent les évaluations et les retraits. Voici en quoi le segment futures diffère, et comment évaluer une société.",
  howItWorksHeading: "Comment fonctionne une évaluation futures financée",
  howItWorksBody:
    "Vous achetez un compte d'évaluation dimensionné en pouvoir d'achat (50 000, 100 000, 150 000 $ sont courants), tradez des futures du groupe CME, et atteignez un objectif de profit tout en restant au-dessus d'un drawdown maximal glissant et sous une limite de perte journalière. De nombreuses sociétés proposent une évaluation à phase unique sans exigence de profit minimal par jour pour réussir, mais assortissent les retraits d'une règle de régularité. Une fois financé, vous conservez 90 à 100 % de la première tranche de profit chez certaines sociétés, puis un partage 90/10 s'applique, avec des retraits selon un calendrier fixe.",
  drawdownHeading: "Le drawdown glissant : la règle qui met fin à la plupart des comptes",
  drawdownBody:
    "Le seuil de perte maximale suit le pic de votre compte. Chez la plupart des sociétés, il suit l'équité intrajournalière non réalisée, si bien qu'une position qui atteint +800 $ et que vous clôturez à +300 $ a tout de même fait remonter la ligne de drawdown de 800 $. Il cesse de suivre une fois que votre solde dépasse le solde initial plus une marge fixe, après quoi il devient en pratique statique. À comparer avec le forex, où un drawdown statique calculé depuis le solde de départ ne bouge jamais. Si vous entrez et sortez progressivement de positions gagnantes, modélisez le calcul du drawdown glissant par rapport à vos pires excursions intrajournalières avant d'acheter.",
  flatByCloseHeading: "Clôture à plat, frais de données et plateformes",
  flatByCloseItems: [
    "La plupart des sociétés exigent que toute position soit clôturée avant la clôture de séance et avant la maintenance quotidienne. L'absence de détention de nuit est la règle par défaut ; les détentions de nuit sont souvent une récompense pour avoir atteint un palier de retrait.",
    "Les données CME en direct entraînent des frais d'accès non professionnels que la plupart des sociétés répercutent sur les comptes financés. Ajoutez les frais mensuels de plateforme ou de réinitialisation à votre coût réel.",
    "Le routage des ordres passe par Rithmic ou Tradovate, visible via NinjaTrader, Tradovate web, TradingView ou Quantower. Les exécutions transitent par un FCM (courtier en futures) réglementé.",
    "Les règles sont plus standardisées qu'en forex car la chaîne réglementée laisse moins de latitude aux sociétés pour improviser — mais les règles de régularité et de scaling varient encore beaucoup.",
  ],
  dueDiligenceHeading: "Vérifications à faire avant de financer un compte futures",
  dueDiligenceItems: [
    "Preuve de paiement et fréquence des retraits : des registres vérifiables, et la fréquence réelle à laquelle vous pouvez retirer.",
    "Type de drawdown glissant : intrajournalier ou en fin de journée, et où il se verrouille.",
    "Règle de régularité : le pourcentage exact, et si elle conditionne les retraits, l'évaluation, ou les deux.",
    "Coût total : frais d'évaluation + données mensuelles + frais de plateforme/réinitialisation + frais d'activation du compte financé.",
    "Avis indépendants provenant spécifiquement de traders futures — les retours en forex ne sont pas transposables.",
  ],
  dueDiligencePrefix: "Le",
  dueDiligenceLinkText: "guide des programmes de trading financés",
  dueDiligenceSuffix: 'couvre les vérifications générales « paiement après réussite » qui s\'appliquent à toutes les sociétés.',
  firmsHeading: "Prop firms inscrites sur TraderMarket",
  firmsIntro:
    "Ouvrez la page d'avis d'une société pour voir si les traders évoquent ses règles futures — comportement du drawdown glissant, politique de détention de nuit, frais de données —, puis vérifiez vous-même son historique de paiement.",
  allReviewsLinkText: "Voir tous les avis sur les prop firms →",
  faqHeading: "Prop firms futures — FAQ",
  faqs: [
    {
      q: "Qu'est-ce qu'une prop firm futures ?",
      a: "Une société de trading pour compte propre spécialisée en futures fournit à un trader un compte d'évaluation pour trader des futures CME, CBOT, NYMEX ou COMEX — ES, NQ, GC, CL, et les contrats micro. Réussissez l'évaluation en atteignant un objectif de profit sans toucher le drawdown glissant ni la limite de perte journalière, puis tradez un compte financé et demandez des retraits selon les règles de paiement de la société.",
    },
    {
      q: "Comment fonctionne le drawdown glissant chez une prop firm futures ?",
      a: "La ligne de perte maximale suit le pic de votre compte — souvent le pic de l'équité non réalisée (intrajournalière), parfois le solde en fin de journée. À mesure que votre compte progresse, le drawdown le suit à la hausse, puis se verrouille une fois que vous dépassez le solde de départ plus une marge fixe. C'est plus strict que le drawdown statique de la plupart des sociétés forex : une position ouverte qui grimpe en profit puis revient peut vous rapprocher de la limite même si vous la clôturez dans le vert.",
    },
    {
      q: "Peut-on conserver des positions futures pendant la nuit ?",
      a: "Généralement non pendant l'évaluation et le début de la phase financée. La plupart des sociétés futures exigent que toutes les positions soient clôturées avant la fin de séance (et avant les grandes fenêtres de maintenance), certaines n'autorisant la détention de nuit qu'après avoir atteint un palier de retrait ou être passé à un compte « pro »/live. Conserver une position au moment de la clôture sur un compte sans détention de nuit constitue généralement une infraction immédiate.",
    },
    {
      q: "Faut-il payer pour les données de marché chez une prop firm futures ?",
      a: "Souvent oui. Les données CME en direct pour un trader non professionnel entraînent des frais d'accès (environ 10 à 15 $ par bouquet de bourse et par mois) que la plupart des sociétés répercutent sur les comptes financés. Les comptes d'évaluation incluent parfois des données différées ou prises en charge par la société. Prévoyez un budget pour les données et les éventuels frais mensuels de plateforme/réinitialisation, pas seulement le prix de l'évaluation.",
    },
    {
      q: "Quelles plateformes utilisent les prop firms futures ?",
      a: "Rithmic et Tradovate sont les deux principaux back-ends de routage d'ordres, accessibles via NinjaTrader, la plateforme web propre à Tradovate, TradingView, Quantower ou R|Trader. Vos exécutions et votre P&L transitent par un courtier en futures réglementé, ce qui explique en partie pourquoi les règles des sociétés futures tendent à être plus standardisées qu'en forex.",
    },
    {
      q: "Qu'est-ce qu'une règle de régularité et pourquoi compte-t-elle pour les retraits ?",
      a: "Une règle de régularité plafonne la part de votre profit total qu'une seule journée peut représenter — couramment 20 à 40 %. Elle vise à empêcher un trader de réussir grâce à une seule journée chanceuse. Elle s'applique généralement à l'éligibilité aux retraits plutôt qu'à l'évaluation elle-même, si bien que vous pouvez réussir l'évaluation tout en étant empêché de retirer tant que votre profit n'est pas réparti sur davantage de journées. Vérifiez le pourcentage exact et s'il est mesuré sur l'évaluation, le compte financé, ou les deux.",
    },
  ],
  relatedHeading: "Guides connexes",
  relatedForex: "Prop firms forex",
  relatedCrypto: "Prop firms crypto",
  relatedBest: "Meilleures prop trading firms",
  relatedReviews: "Avis sur les prop firms",
  relatedCountry: "Prop firms par pays",
};
