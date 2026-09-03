import type { FuturesPropFirmsCopy } from "@/components/content/FuturesPropFirmsContent";

export const it: FuturesPropFirmsCopy = {
  kicker: "Guida per trader · Futures",
  h1: "Le prop firm futures, e le regole che decidono davvero il tuo conto",
  intro:
    "I programmi finanziati futures sembrano semplici rispetto al forex — obiettivi standardizzati, contratti familiari — ma i meccanismi di drawdown e payout sono più severi. Drawdown trailing, regole flat-by-close, commissioni sui dati e requisiti di consistenza sono ciò che decide valutazioni e payout. Ecco come si differenzia il segmento futures, e come valutare una società.",
  howItWorksHeading: "Come funziona una valutazione futures finanziata",
  howItWorksBody:
    "Acquisti un conto di valutazione dimensionato in potere d'acquisto (50K, 100K, 150K sono comuni), fai trading su futures del gruppo CME e raggiungi un obiettivo di profitto restando sopra un drawdown massimo trailing e sotto un limite di perdita giornaliera. Molte società gestiscono una valutazione a fase singola senza un requisito minimo di profitto giornaliero per superarla, ma applicano una regola di consistenza ai payout. Una volta finanziato, in alcune società mantieni il 90–100% della prima fetta di profitto, poi una ripartizione 90/10, con payout secondo un calendario fisso.",
  drawdownHeading: "Drawdown trailing: la regola che pone fine alla maggior parte dei conti",
  drawdownBody:
    "La soglia di perdita massima segue il picco del tuo conto. Nella maggior parte delle società segue l'equity intraday non realizzato, quindi un'operazione che sale a +800 $ e che chiudi a +300 $ ha comunque trascinato verso l'alto la linea di drawdown di 800 $. Smette di seguire l'andamento una volta che il saldo supera il saldo iniziale più un buffer fisso, dopodiché diventa di fatto statico. Confrontalo con il forex, dove un drawdown statico dal saldo iniziale non si muove mai. Se scali dentro e fuori dalle posizioni vincenti, calcola la matematica del trailing rispetto alle tue peggiori escursioni intraday prima di acquistare.",
  flatByCloseHeading: "Flat-by-close, commissioni sui dati e piattaforme",
  flatByCloseItems: [
    "La maggior parte delle società richiede che ogni posizione venga chiusa prima della chiusura della sessione e prima della manutenzione giornaliera. Nessun overnight è l'impostazione predefinita; le posizioni overnight sono spesso una ricompensa per aver raggiunto un traguardo di payout.",
    "I dati CME in tempo reale comportano una commissione da scambio non professionale che la maggior parte delle società trasferisce sui conti finanziati. Aggiungi le commissioni mensili di piattaforma o di reset al tuo costo reale.",
    "L'instradamento degli ordini avviene tramite Rithmic o Tradovate, mostrato attraverso NinjaTrader, Tradovate web, TradingView o Quantower. Gli eseguiti passano attraverso un FCM regolamentato.",
    "Le regole sono più standardizzate rispetto al forex perché la filiera regolamentata lascia alle società meno margine di improvvisazione — ma le regole di consistenza e scalabilità variano comunque molto.",
  ],
  dueDiligenceHeading: "Due diligence prima di finanziare un conto futures",
  dueDiligenceItems: [
    "Prova dei payout e frequenza dei payout: registri verificabili, e quanto spesso puoi effettivamente prelevare.",
    "Tipo di drawdown trailing: intraday rispetto a fine giornata, e dove si blocca.",
    "Regola di consistenza: la percentuale esatta, e se condiziona i payout, la valutazione o entrambi.",
    "Costo totale: tariffa di valutazione + dati mensili + commissioni di piattaforma/reset + commissione di attivazione sul conto finanziato.",
    "Recensioni indipendenti specificamente da trader futures — il feedback sul forex non è trasferibile.",
  ],
  dueDiligencePrefix: "La",
  dueDiligenceLinkText: "guida ai programmi di trading finanziato",
  dueDiligenceSuffix: 'copre i controlli generali su "pagamento dopo il superamento" applicabili a ogni società.',
  firmsHeading: "Prop firm elencate su TraderMarket",
  firmsIntro:
    "Apri la pagina di recensione di una società per vedere se i trader discutono delle sue regole futures — comportamento del drawdown trailing, politica overnight, commissioni sui dati — poi verifica tu stesso lo storico dei payout.",
  allReviewsLinkText: "Vedi tutte le recensioni delle prop firm →",
  faqHeading: "Prop firm futures — Domande frequenti",
  faqs: [
    {
      q: "Cos'è una prop firm futures?",
      a: "Una società di proprietary trading futures fornisce a un trader un conto di valutazione per negoziare futures CME, CBOT, NYMEX o COMEX — ES, NQ, GC, CL e i relativi micro contratti. Si supera la valutazione raggiungendo un obiettivo di profitto senza colpire il drawdown trailing o il limite di perdita giornaliera, poi si negozia un conto finanziato e si richiedono i payout secondo le regole di payout della società.",
    },
    {
      q: "Come funziona il drawdown trailing presso una prop firm futures?",
      a: "La linea di perdita massima segue il picco del tuo conto — spesso il picco dell'equity non realizzato (intraday), a volte il saldo di fine giornata. Man mano che il tuo conto sale, il drawdown segue l'andamento dietro di esso, per poi bloccarsi una volta superato il saldo iniziale più un buffer prestabilito. Questo è più rigido del drawdown statico della maggior parte delle società forex: una posizione aperta che sale rapidamente in profitto e poi ritraccia può avvicinarti alla violazione anche se chiudi in positivo.",
    },
    {
      q: "Posso mantenere posizioni futures overnight?",
      a: "Di solito no durante la valutazione e nella fase iniziale di finanziamento. La maggior parte delle società futures richiede che tutte le posizioni siano chiuse prima della chiusura della sessione (e prima delle principali finestre di manutenzione), e alcune consentono posizioni overnight solo dopo aver raggiunto un traguardo di payout o essere passati a un conto 'pro'/live. Mantenere una posizione oltre la chiusura su un conto senza overnight è tipicamente una violazione immediata delle regole.",
    },
    {
      q: "Devo pagare per i dati di mercato con una prop firm futures?",
      a: "Spesso sì. I dati CME in tempo reale per un trader non professionale comportano una commissione da scambio (circa 10–15 $ per pacchetto di scambio al mese) che la maggior parte delle società trasferisce sui conti finanziati. I conti di valutazione a volte includono dati ritardati o forniti dalla società. Metti a budget i dati e le eventuali commissioni mensili di piattaforma/reset, non solo il prezzo della valutazione.",
    },
    {
      q: "Quali piattaforme usano le prop firm futures?",
      a: "Rithmic e Tradovate sono i due principali backend di instradamento degli ordini, resi disponibili tramite NinjaTrader, la piattaforma web di Tradovate, TradingView, Quantower o R|Trader. I tuoi eseguiti e il tuo P&L passano attraverso un futures commission merchant regolamentato, uno dei motivi per cui le regole delle società futures tendono a essere più standardizzate rispetto al forex.",
    },
    {
      q: "Cos'è una regola di consistenza e perché è importante per i payout?",
      a: "Una regola di consistenza limita quanta parte del tuo profitto totale può rappresentare una singola giornata — comunemente il 20–40%. È pensata per impedire che un trader superi la valutazione grazie a un solo giorno fortunato. Di solito si applica all'idoneità al payout piuttosto che alla valutazione stessa, quindi puoi superarla e comunque essere bloccato nel prelievo finché il tuo profitto non sarà distribuito su più giornate. Leggi la percentuale esatta e se viene misurata sulla valutazione, sul conto finanziato, o su entrambi.",
    },
  ],
  relatedHeading: "Guide correlate",
  relatedForex: "Prop firm forex",
  relatedCrypto: "Prop firm crypto",
  relatedBest: "Le migliori prop trading firm",
  relatedReviews: "Recensioni delle prop firm",
  relatedCountry: "Prop firm per paese",
};
