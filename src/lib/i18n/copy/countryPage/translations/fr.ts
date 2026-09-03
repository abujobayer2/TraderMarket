import type { CountryTranslation } from "@/components/content/CountryPageContent";

export const fr: Record<string, CountryTranslation> = {
  france: {
    localizedName: "France",
    sessionNote:
      "La France partage le même fuseau horaire et le même chevauchement de session que l'Allemagne : une matinée européenne complète, suivie d'un net chevauchement d'après-midi avec l'ouverture de New York.",
    regulatoryNote:
      "L'AMF applique les mêmes plafonds de levier alignés sur l'ESMA que le reste de l'UE et a historiquement adopté une position agressive vis-à-vis de la publicité pour les CFD auprès des clients particuliers. Cette surveillance vise les courtiers réglementés plutôt que les produits d'évaluation des prop firms en particulier, mais elle reflète la prudence avec laquelle les régulateurs français traitent l'effet de levier pour les particuliers de manière générale.",
    paymentNote:
      "Le virement SEPA fonctionne pour le financement et les retraits au sein de l'UE ; la plupart des sociétés règlent malgré tout en USD, il faut donc tenir compte des frais de conversion. Les gains de trading sont généralement imposables selon le régime français du prélèvement forfaitaire unique (PFU, ou « flat tax ») sur les revenus financiers, bien que la classification puisse varier — vérifiez auprès d'un comptable français.",
  },
};
