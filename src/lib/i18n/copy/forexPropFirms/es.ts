import type { ForexPropFirmsCopy } from "@/components/content/ForexPropFirmsContent";

export const es: ForexPropFirmsCopy = {
  kicker: "Guía del trader · Forex",
  h1: "Prop firms de forex y cómo funciona realmente el trading forex financiado",
  intro:
    "El forex es la porción más grande del mercado de prop firms, y sus reglas tienen una forma propia: drawdown estático, apalancamiento generoso, sesiones 24/5 y políticas sobre trading de noticias que deciden más evaluaciones que el propio objetivo de beneficio. Esto es lo que distingue a los programas financiados de forex de los de futuros y cripto, y cómo evaluar uno antes de pagar.",
  howItWorksHeading: "Cómo funciona una evaluación financiada de forex",
  howItWorksBody:
    "Pagas una tarifa única por una cuenta de evaluación, operas una cuenta demo financiada con el capital nocional de la firma e intentas alcanzar un objetivo de beneficio — habitualmente 8-10% en la fase uno y 4-5% en la fase dos — sin superar un límite de pérdida diaria ni un drawdown máximo. Si apruebas, pasas a una cuenta financiada donde se aplica un reparto de beneficios del 70-90% y los pagos se pueden solicitar en un ciclo fijo, normalmente cada 1-4 semanas. Existen variantes de un paso, dos pasos y financiación instantánea; el equilibrio está entre la tarifa, el tamaño del objetivo y la severidad del drawdown.",
  drawdownHeading: "Drawdown estático: la regla específica de forex que hay que entender",
  drawdownBody:
    "Las firmas de forex casi siempre usan un drawdown máximo estático medido desde tu saldo inicial, junto con un límite de pérdida diaria. A diferencia del drawdown trailing habitual en la mayoría de firmas de futuros, la línea de pérdida no sube a medida que acumulas beneficio — una vez que llevas unos puntos porcentuales de ventaja, un día perdedor normal tiene muchas menos probabilidades de acabar con la cuenta. Los detalles que aún sorprenden a los traders: si el límite diario se mide sobre saldo cerrado o equity flotante, a qué hora del servidor se reinicia, y si el drawdown máximo es absoluto o también sigue en trailing hasta alcanzar cierto beneficio.",
  sessionsHeading: "Apalancamiento, sesiones y trading de noticias",
  sessionsItems: [
    "El apalancamiento suele ser de 1:30-1:100, a veces 1:50 como opción de pago adicional. Esto cambia tu margen, no tu margen de maniobra frente al drawdown.",
    "El mercado funciona 24/5. Las posiciones normalmente pueden mantenerse durante la noche y el fin de semana, a diferencia de la mayoría de los programas de futuros — revisa las comisiones de swap/financiación.",
    "La política de trading de noticias es la regla con mayor variabilidad: totalmente permitida, bloqueada en torno a publicaciones de alto impacto, o restringida solo durante la evaluación. Si operas el NFP o el CPI, confírmalo por escrito.",
    "Mantener posiciones el fin de semana está permitido en la mayoría de firmas de forex, pero puede llevar una cláusula de riesgo de gap. La exposición a cripto, cuando se ofrece, puede operarse también durante el fin de semana.",
  ],
  dueDiligenceHeading: "Diligencia debida antes de financiar una cuenta de forex",
  dueDiligenceItems: [
    "Prueba de pagos: registros verificables, no solo testimonios controlados por la firma.",
    "Trayectoria: años realmente financiando traders, no meses invirtiendo en publicidad.",
    "Condiciones de pago: cláusulas de inactividad, reglas de consistencia, días mínimos de trading, pasos de KYC que pueden retrasar un retiro.",
    "Plataforma y política de automatización: MT4/MT5/cTrader/Match-Trader, y si se permiten EAs o copy trading.",
    "Reseñas independientes: lo que dicen los traders fuera del propio marketing de la firma y de su página de Trustpilot.",
  ],
  dueDiligencePrefix: "Lee la",
  dueDiligenceLinkText: "guía de programas de trading financiado",
  dueDiligenceSuffix: 'para la lista completa de verificación sobre si esta firma paga tras aprobar.',
  firmsHeading: "Prop firms listadas en TraderMarket",
  firmsIntro:
    "La mayoría de las firmas multiactivo de abajo ofrecen pares de forex. Abre la página de reseñas de una firma para ver qué dicen los traders específicamente sobre sus condiciones de forex, y verifica tú mismo el historial de pagos.",
  allReviewsLinkText: "Ver todas las reseñas de prop firms →",
  faqHeading: "Prop firms de forex — Preguntas frecuentes",
  faqs: [
    {
      q: "¿Qué es una prop firm de forex?",
      a: "Una firma de trading propietario de forex da acceso a un trader al capital de la firma para operar pares de divisas, a cambio de una parte de los beneficios. El trader paga una tarifa de evaluación única, demuestra que puede alcanzar un objetivo de beneficio respetando los límites de drawdown — normalmente en una o dos fases — y después opera una cuenta financiada con un reparto de beneficios del 70-90%.",
    },
    {
      q: "¿Qué modelo de drawdown usan las prop firms de forex?",
      a: "La mayoría de las firmas de forex usan un drawdown máximo estático (fijo) medido desde el saldo inicial, además de un límite de pérdida diaria independiente. Esto es más permisivo que el drawdown trailing/intradía común en las firmas de futuros, porque la línea de pérdida no sigue a tu equity a medida que generas beneficio. Lee siempre si el límite diario se calcula sobre saldo o sobre equity, y si se reinicia a una hora fija del servidor.",
    },
    {
      q: "¿Cuánto apalancamiento ofrecen las prop firms de forex?",
      a: "Las cuentas financiadas de forex suelen ofrecer un apalancamiento de 1:30 a 1:100, y algunas firmas llegan a 1:50 como complemento. Un apalancamiento mayor no cambia las reglas de drawdown, así que afecta principalmente al margen, no a cuánto puedes perder antes de incumplir.",
    },
    {
      q: "¿Puedo operar las noticias en una prop firm de forex?",
      a: "Varía. Algunas firmas permiten totalmente el trading de noticias en la cuenta financiada, otras bloquean la apertura o el cierre de posiciones unos minutos antes y después de publicaciones de alto impacto, y otras solo lo restringen durante la evaluación. Si operas el NFP, el CPI o eventos de bancos centrales, trata la política de noticias como una regla determinante y confírmala por escrito antes de comprar.",
    },
    {
      q: "¿Qué plataformas usan las prop firms de forex?",
      a: "MetaTrader 4, MetaTrader 5, cTrader y Match-Trader son las más comunes. La elección de plataforma afecta al estilo de ejecución, los tipos de orden disponibles y si puedes usar asesores expertos — revisa la política de automatización y copy trading de la firma si eso te importa.",
    },
    {
      q: "¿Cómo sé si una prop firm de forex realmente paga?",
      a: "Busca pruebas de pago verificables en lugar de testimonios controlados por la firma, comprueba cuánto tiempo lleva financiando traders, lee las condiciones de pago en busca de cláusulas de inactividad, consistencia o KYC que puedan retrasar un retiro, y lee reseñas independientes de traders. El rango de una firma en cualquier clasificación, incluida TraderMarket, refleja lo que pagó por visibilidad, no una garantía de pago.",
    },
  ],
  relatedHeading: "Guías relacionadas",
  relatedFutures: "Prop firms de futuros",
  relatedCrypto: "Prop firms de cripto",
  relatedBest: "Las mejores prop trading firms",
  relatedReviews: "Reseñas de prop firms",
  relatedCountry: "Prop firms por país",
};
