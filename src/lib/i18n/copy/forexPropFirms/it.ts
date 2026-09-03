import type { ForexPropFirmsCopy } from "@/components/content/ForexPropFirmsContent";

export const it: ForexPropFirmsCopy = {
  kicker: "Guida per trader · Forex",
  h1: "Le prop firm forex, e come funziona davvero il trading forex finanziato",
  intro:
    "Il forex è la fetta più grande del mercato delle prop firm, e le sue regole hanno una forma tutta loro: drawdown statico, leva generosa, sessioni 24/5 e politiche sul trading di news che decidono più valutazioni di quanto non faccia l'obiettivo di profitto. Ecco cosa distingue i programmi finanziati forex da futures e crypto — e come valutarne uno prima di pagare.",
  howItWorksHeading: "Come funziona una valutazione forex finanziata",
  howItWorksBody:
    "Paghi una tariffa una tantum per un conto di valutazione, fai trading su un conto demo finanziato con il capitale nozionale della società e provi a raggiungere un obiettivo di profitto — comunemente l'8–10% nella fase uno e il 4–5% nella fase due — senza violare un limite di perdita giornaliera o un drawdown massimo. Se superi la prova, passi a un conto finanziato dove si applica una ripartizione degli utili del 70–90% e i payout sono richiedibili con un ciclo fisso, di solito ogni 1–4 settimane. Esistono varianti a uno step, a due step e a finanziamento istantaneo; il compromesso riguarda la tariffa, la dimensione dell'obiettivo e quanto è rigido il drawdown.",
  drawdownHeading: "Drawdown statico: la regola specifica del forex da capire",
  drawdownBody:
    "Le società forex utilizzano quasi universalmente un drawdown massimo statico misurato a partire dal saldo iniziale, insieme a un limite di perdita giornaliera. A differenza del drawdown trailing tipico della maggior parte delle società futures, la soglia di perdita non si alza man mano che accumuli profitto — una volta che sei avanti di qualche punto percentuale, una normale giornata in perdita ha molte meno probabilità di far terminare il conto. I dettagli che continuano a trarre in inganno i trader: se il limite giornaliero è misurato sul saldo chiuso o sull'equity fluttuante, a che ora del server si resetta, e se il drawdown massimo è assoluto oppure segue anch'esso l'andamento fino a raggiungere un profitto prestabilito.",
  sessionsHeading: "Leva, sessioni e trading sulle news",
  sessionsItems: [
    "La leva è tipicamente 1:30–1:100, a volte 1:50 come opzione aggiuntiva a pagamento. Cambia il tuo margine, non il margine di manovra sul drawdown.",
    "Il mercato è attivo 24/5. Le posizioni possono di solito essere mantenute overnight e nel weekend, a differenza della maggior parte dei programmi futures — verifica le commissioni di swap/finanziamento.",
    "La politica sul trading di news è la regola con la maggiore variabilità: pienamente consentita, bloccata in prossimità dei rilasci ad alto impatto, oppure limitata alla sola valutazione. Se fai trading su NFP o CPI, confermalo per iscritto.",
    "Il mantenimento delle posizioni nel weekend è consentito dalla maggior parte delle società forex, ma può comportare una clausola sul rischio di gap. L'esposizione crypto, se offerta, può essere negoziata anche durante il weekend.",
  ],
  dueDiligenceHeading: "Due diligence prima di finanziare un conto forex",
  dueDiligenceItems: [
    "Prova dei payout: registri verificabili, non solo testimonianze controllate dalla società.",
    "Track record: anni di finanziamento effettivo dei trader, non mesi di pubblicità.",
    "Termini di payout: clausole di inattività, regole di consistenza, giorni minimi di trading, passaggi KYC che possono ritardare un prelievo.",
    "Piattaforma e politica sull'automazione: MT4/MT5/cTrader/Match-Trader, e se sono consentiti EA o copy trading.",
    "Recensioni indipendenti: cosa dicono i trader al di fuori del marketing della società stessa e della sua pagina Trustpilot.",
  ],
  dueDiligencePrefix: "Leggi la",
  dueDiligenceLinkText: "guida ai programmi di trading finanziato",
  dueDiligenceSuffix: 'per la checklist completa su "questa società paga dopo il superamento".',
  firmsHeading: "Prop firm elencate su TraderMarket",
  firmsIntro:
    "La maggior parte delle società multi-asset qui sotto offre coppie forex. Apri la pagina di recensione di una società per vedere cosa dicono i trader specificamente sulle sue condizioni forex, poi verifica tu stesso lo storico dei payout.",
  allReviewsLinkText: "Vedi tutte le recensioni delle prop firm →",
  faqHeading: "Prop firm forex — Domande frequenti",
  faqs: [
    {
      q: "Cos'è una prop firm forex?",
      a: "Una società di proprietary trading forex dà a un trader accesso al capitale della società per negoziare coppie di valute, in cambio di una quota dei profitti. Il trader paga una tariffa di valutazione una tantum, dimostra di poter raggiungere un obiettivo di profitto rispettando i limiti di drawdown — di solito in una o due fasi — e poi negozia un conto finanziato con una ripartizione degli utili del 70–90%.",
    },
    {
      q: "Quale modello di drawdown usano le prop firm forex?",
      a: "La maggior parte delle società forex utilizza un drawdown massimo statico (fisso) misurato dal saldo iniziale, più un limite di perdita giornaliera separato. Questo è più indulgente del drawdown trailing/intraday comune presso le società futures, perché la soglia di perdita non segue il tuo equity verso l'alto man mano che accumuli profitto. Leggi sempre se il limite giornaliero viene calcolato sul saldo o sull'equity, e se si resetta a un orario server fisso.",
    },
    {
      q: "Quanta leva offrono le prop firm forex?",
      a: "I conti finanziati forex offrono tipicamente una leva da 1:30 a 1:100, con alcune società che arrivano a 1:50 come opzione aggiuntiva. Una leva più alta non modifica le regole di drawdown, quindi influisce principalmente sul margine, non su quanto puoi perdere prima di violare le regole.",
    },
    {
      q: "Posso fare trading sulle news presso una prop firm forex?",
      a: "Varia. Alcune società consentono pienamente il trading sulle news sul conto finanziato, altre bloccano l'apertura o la chiusura di posizioni nei minuti che precedono o seguono i rilasci ad alto impatto, e altre ancora lo limitano solo durante la valutazione. Se fai trading su NFP, CPI o eventi delle banche centrali, considera la politica sulle news come una regola determinante e confermala per iscritto prima di acquistare.",
    },
    {
      q: "Quali piattaforme usano le prop firm forex?",
      a: "MetaTrader 4, MetaTrader 5, cTrader e Match-Trader sono le più comuni. La scelta della piattaforma influisce sullo stile di esecuzione, sui tipi di ordine disponibili e sulla possibilità di utilizzare expert advisor — verifica la politica della società su automazione e copy trading se per te è importante.",
    },
    {
      q: "Come faccio a sapere se una prop firm forex paga davvero?",
      a: "Cerca prove di payout verificabili anziché testimonianze controllate dalla società, controlla da quanto tempo la società finanzia trader, leggi i termini di payout per individuare condizioni di inattività, consistenza o KYC che possono ritardare un prelievo, e leggi recensioni indipendenti dei trader. Il rank di una società in qualsiasi classifica, inclusa TraderMarket, riflette quanto ha pagato per la visibilità — non è una garanzia di payout.",
    },
  ],
  relatedHeading: "Guide correlate",
  relatedFutures: "Prop firm futures",
  relatedCrypto: "Prop firm crypto",
  relatedBest: "Le migliori prop trading firm",
  relatedReviews: "Recensioni delle prop firm",
  relatedCountry: "Prop firm per paese",
};
