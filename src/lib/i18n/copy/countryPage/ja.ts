import type { CountryPageCopy } from "@/components/content/CountryPageContent";

export const ja: CountryPageCopy = {
  backLinkText: "← 国別プロップファーム",
  kickerTemplate: "トレーダーガイド・{country}",
  h1Template: "{country}のトレーダー向けプロップトレーディングファーム",
  metaDescriptionTemplate:
    "{country}のトレーダー向けプロップファームチャレンジガイド:{regulator}が個人向けFX/CFD取引をどう扱うか、セッションの時間帯、資金拠出と出金の考慮事項、そしてTraderMarketのライブリーダーボードを紹介します。",
  defaultRegulatorLabel: "各国の規制当局",
  introTemplate:
    "プロップファームそのものはグローバルであり、TraderMarketはどの会社がどの国を制限しているかを追跡していません。取引する場所によって実際に変わるのは、規制の背景、最も活発な取引時間が自分の時計でいつになるか、そして評価の資金拠出や出金のためにどうお金を動かすかです。{country}を拠点とするトレーダーにとって重要な点をまとめました。",
  currencyLabel: "通貨:",
  timezoneLabel: "タイムゾーン:",
  regulatorLabel: "規制当局:",
  regulationHeading: "規制:プロップファームチャレンジに実際に適用されるもの",
  sessionHeadingTemplate: "{country}からのセッション時間帯",
  paymentHeading: "評価への資金拠出と出金の受け取り",
  assetClassHeading: "どの資産クラスが向いているか",
  assetClassFuturesTemplate:
    "上記の規制状況を踏まえると、{country}を拠点とするトレーダーの多くは、CFD型のマルチアセットチャレンジではなく{link}に注目することになります。",
  assetClassMultiTemplate:
    "{country}のトレーダーは通常、あらゆる種類のプロップファームにアクセスできます。どの資産クラスのルールがどう異なるかを確認してから選ぶために、{forex}、{futures}、{crypto}のプロップファームをご覧ください。",
  assetClassForexLabel: "FXプロップファーム",
  assetClassFuturesLabel: "先物プロップファーム",
  assetClassCryptoLabel: "暗号資産",
  assetClassMultiLabel: "TraderMarketに掲載されているすべてのプロップファーム",
  firmsHeading: "TraderMarketに掲載されているプロップファーム",
  firmsIntro: "世界中のトレーダーが見ているのと同じライブリーダーボードです — 国の対応状況と出金条件は必ず各社のサイトで確認してください。",
  allReviewsLinkText: "すべてのプロップファームレビューを見る →",
  faqHeading: "よくある質問",
  sharedFaqs: [
    {
      q: "プロップファームは登録できる国を制限していますか?",
      a: "一部の会社はそうしています。多くの場合、取引そのものというより規制上の理由によるものです — 最も分かりやすい例は米国で、ほとんどのCFD型マルチアセット会社は米国居住者を除外しており、先物専業の会社がその隙間を埋めています。TraderMarketは会社ごとの国別対応状況を追跡していないため、評価手数料を支払う前に必ず会社自身のサイトで確認してください。",
    },
    {
      q: "自国の規制はプロップファームチャレンジに適用されますか?",
      a: "通常、直接は適用されません。プロップファームの評価は、地元で規制されたブローカーでのライブ口座ではなく、通常は会社自身のプラットフォーム上で運用されるデモ資金のシミュレーションです。そのため、規制されたブローカーで取引する際にあなたを保護する個人向けレバレッジ規制やブローカーのライセンスルールは、通常チャレンジ自体には適用されません。だからこそ、規制されたブローカー口座以上に、独立した調査(出金実績、レビュー、会社登録)がここでは重要になります。",
    },
    {
      q: "プロップファームの出金には税金がかかりますか?",
      a: "ほとんどすべての国で、はい — 取引利益は、会社がどの国に拠点を置いているかにかかわらず、一般的に課税対象の所得またはキャピタルゲインとなります。それがどう分類されるか(事業所得、キャピタルゲイン、その他)は国によって、また取引方法によっても大きく異なるため、このページの税金に関する記述は出発点であり、地元の会計士の代わりにはなりません。",
    },
    {
      q: "プロップファームを選ぶ際になぜタイムゾーンが重要なのですか?",
      a: "日次損失制限のような評価ルールは固定されたサーバー時間でリセットされ、最も活発で変動の大きい取引時間帯はロンドン・ニューヨークのオーバーラップです。そのオーバーラップが自分の時計で通常の朝になるか真夜中になるかによって、睡眠スケジュールを崩さずに現実的に取引できる時間帯が変わります。",
    },
  ],
  alsoInTemplate: "{region}の他の国",
  allCountriesLinkText: "すべての国を見る →",
  regionLabels: {
    "North America": "北米",
    "UK & Europe": "英国・ヨーロッパ",
    "Asia-Pacific": "アジア太平洋",
    "Middle East & Africa": "中東・アフリカ",
  },
};
