import type { FuturesPropFirmsCopy } from "@/components/content/FuturesPropFirmsContent";

export const es: FuturesPropFirmsCopy = {
  kicker: "Guía del trader · Futuros",
  h1: "Prop firms de futuros y las reglas que realmente deciden tu cuenta",
  intro:
    "Los programas financiados de futuros parecen simples frente a los de forex — objetivos estandarizados, contratos conocidos — pero la mecánica de drawdown y pagos es más estricta. El drawdown trailing, las reglas de cierre plano (flat-by-close), las comisiones de datos y los requisitos de consistencia son lo que decide las evaluaciones y los pagos. Aquí te explicamos en qué se diferencia el segmento de futuros y cómo evaluar una firma.",
  howItWorksHeading: "Cómo funciona una evaluación financiada de futuros",
  howItWorksBody:
    "Compras una cuenta de evaluación dimensionada en poder de compra (50K, 100K y 150K son habituales), operas futuros del grupo CME y alcanzas un objetivo de beneficio manteniéndote por encima de un drawdown máximo trailing y por debajo de un límite de pérdida diaria. Muchas firmas usan una evaluación de una sola fase sin requisito mínimo de beneficio por día para aprobar, pero añaden una regla de consistencia a los pagos. Una vez financiado, conservas el 90-100% de la primera parte del beneficio en algunas firmas, luego un reparto 90/10, con pagos según un calendario fijo.",
  drawdownHeading: "Drawdown trailing: la regla que acaba con la mayoría de las cuentas",
  drawdownBody:
    "El umbral de pérdida máxima sigue al máximo histórico de tu cuenta. En la mayoría de firmas sigue el equity flotante no realizado intradía, así que una operación que sube a +800 USD y cierras en +300 USD igualmente arrastró la línea de drawdown 800 USD hacia arriba. Deja de moverse una vez que tu saldo supera el saldo inicial más un colchón fijo, tras lo cual es efectivamente estático. Compáralo con el forex, donde un drawdown estático desde el saldo inicial nunca se mueve. Si escalas entradas y salidas en operaciones ganadoras, calcula la matemática del trailing frente a tus peores oscilaciones intradía antes de comprar.",
  flatByCloseHeading: "Cierre plano, comisiones de datos y plataformas",
  flatByCloseItems: [
    "La mayoría de las firmas exigen cerrar todas las posiciones antes del cierre de la sesión y antes del mantenimiento diario. No mantener posiciones durante la noche es la norma por defecto; hacerlo suele ser una recompensa por alcanzar un hito de pago.",
    "Los datos en vivo de CME conllevan una comisión de bolsa para no profesionales que la mayoría de las firmas repercute en las cuentas financiadas. Suma las comisiones mensuales de plataforma o de reinicio a tu coste real.",
    "El enrutamiento de órdenes es Rithmic o Tradovate, mostrado a través de NinjaTrader, Tradovate web, TradingView o Quantower. Las ejecuciones se enrutan a través de un FCM regulado.",
    "Las reglas están más estandarizadas que en forex porque la cadena regulada deja menos margen de improvisación a las firmas — pero las reglas de consistencia y escalado aún varían mucho.",
  ],
  dueDiligenceHeading: "Diligencia debida antes de financiar una cuenta de futuros",
  dueDiligenceItems: [
    "Prueba y frecuencia de pagos: registros verificables, y con qué frecuencia puedes realmente retirar.",
    "Tipo de drawdown trailing: intradía frente a fin de día, y dónde se bloquea.",
    "Regla de consistencia: el porcentaje exacto, y si condiciona los pagos, la evaluación o ambos.",
    "Coste total: tarifa de evaluación + datos mensuales + comisiones de plataforma/reinicio + tarifa de activación en la cuenta financiada.",
    "Reseñas independientes específicamente de traders de futuros — el feedback de forex no es extrapolable.",
  ],
  dueDiligencePrefix: "La",
  dueDiligenceLinkText: "guía de programas de trading financiado",
  dueDiligenceSuffix: "cubre las comprobaciones generales sobre \"pago tras aprobar\" que aplican a cualquier firma.",
  firmsHeading: "Prop firms listadas en TraderMarket",
  firmsIntro:
    "Abre la página de reseñas de una firma para ver si los traders hablan de sus reglas de futuros — comportamiento del drawdown trailing, política de posiciones nocturnas, comisiones de datos — y verifica tú mismo el historial de pagos.",
  allReviewsLinkText: "Ver todas las reseñas de prop firms →",
  faqHeading: "Prop firms de futuros — Preguntas frecuentes",
  faqs: [
    {
      q: "¿Qué es una prop firm de futuros?",
      a: "Una firma de trading propietario de futuros ofrece a un trader una cuenta de evaluación para operar futuros de CME, CBOT, NYMEX o COMEX — ES, NQ, GC, CL y micros. Apruebas la evaluación alcanzando un objetivo de beneficio sin llegar al drawdown trailing ni al límite de pérdida diaria, y después operas una cuenta financiada y solicitas pagos según las reglas de pago de la firma.",
    },
    {
      q: "¿Cómo funciona el drawdown trailing en una prop firm de futuros?",
      a: "La línea de pérdida máxima sigue al máximo histórico de tu cuenta — a menudo el máximo del equity no realizado (intradía), a veces el saldo de fin de día. A medida que tu cuenta sube, el drawdown la sigue por detrás, y se bloquea una vez que superas el saldo inicial más un colchón fijo. Esto es más estricto que el drawdown estático de la mayoría de firmas de forex: una posición abierta que se dispara en beneficio y luego retrocede puede acercarte al incumplimiento aunque la cierres en positivo.",
    },
    {
      q: "¿Puedo mantener posiciones de futuros durante la noche?",
      a: "Normalmente no durante la evaluación ni en la etapa inicial financiada. La mayoría de firmas de futuros exigen cerrar todas las posiciones antes del cierre de la sesión (y antes de las principales ventanas de mantenimiento), y algunas solo permiten mantener posiciones nocturnas tras alcanzar un hito de pago o pasar a una cuenta \"pro\"/en vivo. Mantener una posición durante el cierre en una cuenta sin posiciones nocturnas suele ser una infracción inmediata de las reglas.",
    },
    {
      q: "¿Tengo que pagar por los datos de mercado con una prop firm de futuros?",
      a: "A menudo sí. Los datos en vivo de CME para un trader no profesional conllevan una comisión de bolsa (aproximadamente 10-15 USD por paquete de bolsa al mes) que la mayoría de las firmas repercute en las cuentas financiadas. Las cuentas de evaluación a veces incluyen datos retrasados o patrocinados por la firma. Presupuesta los datos y las comisiones mensuales de plataforma/reinicio, no solo el precio de la evaluación.",
    },
    {
      q: "¿Qué plataformas usan las prop firms de futuros?",
      a: "Rithmic y Tradovate son los dos principales sistemas de enrutamiento de órdenes, disponibles a través de NinjaTrader, la plataforma web propia de Tradovate, TradingView, Quantower o R|Trader. Tus ejecuciones y P&L se enrutan a través de un intermediario de futuros regulado, una de las razones por las que las reglas de las firmas de futuros tienden a estar más estandarizadas que las de forex.",
    },
    {
      q: "¿Qué es una regla de consistencia y por qué importa para los pagos?",
      a: "Una regla de consistencia limita cuánto puede representar un solo día del beneficio total — habitualmente 20-40%. Está diseñada para evitar que un trader apruebe gracias a un día de suerte. Suele aplicarse a la elegibilidad de pago más que a la evaluación en sí, así que puedes aprobar y aun así quedar bloqueado para retirar hasta que tu beneficio se reparta entre más días. Lee el porcentaje exacto y si se mide en la evaluación, en la cuenta financiada o en ambas.",
    },
  ],
  relatedHeading: "Guías relacionadas",
  relatedForex: "Prop firms de forex",
  relatedCrypto: "Prop firms de cripto",
  relatedBest: "Las mejores prop trading firms",
  relatedReviews: "Reseñas de prop firms",
  relatedCountry: "Prop firms por país",
};
