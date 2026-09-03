import type { CountryPageCopy } from "@/components/content/CountryPageContent";

export const es: CountryPageCopy = {
  backLinkText: "← Prop firms por país",
  kickerTemplate: "Guía del trader · {country}",
  h1Template: "Firmas de trading propietario para traders en {country}",
  metaDescriptionTemplate:
    "Una guía para traders sobre los desafíos de prop firms desde {country}: cómo trata {regulator} el trading minorista de forex/CFD, el horario de sesión, consideraciones de financiación y pago, además de la clasificación en vivo de TraderMarket.",
  defaultRegulatorLabel: "los reguladores locales",
  introTemplate:
    "Las prop firms en sí mismas son globales — TraderMarket no registra qué firmas restringen qué países. Lo que genuinamente varía según desde dónde operas es el contexto regulatorio, cuándo caen las horas de trading más activas en tu horario, y cómo mueves el dinero para financiar una evaluación o recibir un pago. Esto es lo que importa para un trader radicado en {country}.",
  currencyLabel: "Moneda:",
  timezoneLabel: "Zona horaria:",
  regulatorLabel: "Regulador:",
  regulationHeading: "Regulación: lo que realmente aplica a un desafío de prop firm",
  sessionHeadingTemplate: "Horario de sesión desde {country}",
  paymentHeading: "Financiar evaluaciones y recibir pagos",
  assetClassHeading: "Qué clase de activo encaja mejor",
  assetClassFuturesTemplate:
    "Dado el panorama regulatorio anterior, la mayoría de los traders radicados en {country} terminan mirando hacia {link} en lugar de desafíos multiactivo tipo CFD.",
  assetClassMultiTemplate:
    "Los traders en {country} generalmente tienen acceso a toda la gama de tipos de prop firm. Consulta las prop firms de {forex}, {futures} y {crypto} para ver cómo difieren las reglas de cada clase de activo antes de elegir una.",
  assetClassForexLabel: "forex",
  assetClassFuturesLabel: "futuros",
  assetClassCryptoLabel: "cripto",
  assetClassMultiLabel: "todas las prop firms reseñadas en TraderMarket",
  firmsHeading: "Prop firms listadas en TraderMarket",
  firmsIntro:
    "La misma clasificación en vivo que ven los traders de todo el mundo — verifica la elegibilidad por país y las condiciones de pago directamente en el sitio de cada firma.",
  allReviewsLinkText: "Ver todas las reseñas de prop firms →",
  faqHeading: "Preguntas frecuentes",
  sharedFaqs: [
    {
      q: "¿Las prop firms restringen qué países pueden registrarse?",
      a: "Algunas sí, normalmente por motivos regulatorios más que relacionados con el trading en sí — el ejemplo más claro es Estados Unidos, donde la mayoría de las firmas multiactivo tipo CFD excluyen a los residentes estadounidenses, y las firmas exclusivas de futuros cubren ese hueco en su lugar. TraderMarket no registra la elegibilidad por país de cada firma, así que confírmalo siempre directamente en el sitio de la firma antes de pagar una tarifa de evaluación.",
    },
    {
      q: "¿La regulación de mi país aplica a un desafío de prop firm?",
      a: "Normalmente no de forma directa. Una evaluación de prop firm suele ser una simulación financiada con demo que se ejecuta en la propia plataforma de la firma, no una cuenta en vivo en un bróker regulado localmente — así que los límites de apalancamiento minorista y las normas de licencia de bróker que te protegen al operar con un bróker regulado generalmente no aplican al desafío en sí. Por eso mismo la investigación independiente (prueba de pagos, reseñas, registro de la empresa) importa más aquí que en una cuenta de correduría regulada.",
    },
    {
      q: "¿Deberé pagar impuestos por los pagos de una prop firm?",
      a: "En casi todos los países, sí — el beneficio de trading es generalmente ingreso imponible o ganancia de capital, sin importar en qué país esté radicada la firma. Cómo se clasifica (ingreso empresarial, ganancia de capital u otra categoría) varía mucho según el país e incluso según cómo operes, así que las notas fiscales de esta página son un punto de partida, no un sustituto de un contador local.",
    },
    {
      q: "¿Por qué importa la zona horaria al elegir una prop firm?",
      a: "Reglas de evaluación como los límites de pérdida diaria se reinician a una hora fija del servidor, y la ventana de trading más activa y volátil es el solapamiento entre Londres y Nueva York. Dónde cae ese solapamiento en tu horario local — una mañana normal, o la mitad de la noche — afecta a las horas en las que puedes operar realmente la cuenta sin alterar tu horario de sueño.",
    },
  ],
  alsoInTemplate: "También en {region}",
  allCountriesLinkText: "Todos los países →",
  regionLabels: {
    "North America": "Norteamérica",
    "UK & Europe": "Reino Unido y Europa",
    "Asia-Pacific": "Asia-Pacífico",
    "Middle East & Africa": "Oriente Medio y África",
  },
};
