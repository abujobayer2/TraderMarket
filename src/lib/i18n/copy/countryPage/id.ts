import type { CountryPageCopy } from "@/components/content/CountryPageContent";

export const id: CountryPageCopy = {
  backLinkText: "← Prop firm berdasarkan negara",
  kickerTemplate: "Panduan Trader · {country}",
  h1Template: "Prop trading firm untuk trader di {country}",
  metaDescriptionTemplate:
    "Panduan trader untuk challenge prop firm dari {country}: bagaimana {regulator} memperlakukan trading forex/CFD ritel, waktu sesi, pertimbangan funding dan payout, plus papan peringkat langsung TraderMarket.",
  defaultRegulatorLabel: "regulator setempat",
  introTemplate:
    "Prop firm sendiri bersifat global — TraderMarket tidak melacak perusahaan mana yang membatasi negara mana. Yang benar-benar berbeda tergantung dari mana Anda trading adalah latar belakang regulasi, kapan jam trading tersibuk jatuh di jam lokal Anda, dan bagaimana Anda memindahkan uang untuk mendanai sebuah evaluasi atau menerima payout. Berikut yang penting bagi trader yang berbasis di {country}.",
  currencyLabel: "Mata uang:",
  timezoneLabel: "Zona waktu:",
  regulatorLabel: "Regulator:",
  regulationHeading: "Regulasi: apa yang sebenarnya berlaku untuk sebuah challenge prop firm",
  sessionHeadingTemplate: "Waktu sesi dari {country}",
  paymentHeading: "Mendanai evaluasi dan menerima payout",
  assetClassHeading: "Kelas aset mana yang cocok",
  assetClassFuturesTemplate:
    "Mengingat gambaran regulasi di atas, sebagian besar trader berbasis {country} pada akhirnya melirik {link} dibanding challenge multi-aset gaya CFD.",
  assetClassMultiTemplate:
    "Trader di {country} umumnya memiliki akses ke seluruh jenis prop firm. Lihat {forex}, {futures}, dan {crypto} untuk memahami perbedaan aturan tiap kelas aset sebelum memilih satu.",
  assetClassForexLabel: "prop firm forex",
  assetClassFuturesLabel: "prop firm futures",
  assetClassCryptoLabel: "prop firm kripto",
  assetClassMultiLabel: "setiap prop firm yang diulas di TraderMarket",
  firmsHeading: "Prop firm yang terdaftar di TraderMarket",
  firmsIntro:
    "Papan peringkat langsung yang sama dilihat oleh trader di mana pun — verifikasi kelayakan negara dan syarat payout langsung di situs masing-masing perusahaan.",
  allReviewsLinkText: "Lihat semua ulasan prop firm →",
  faqHeading: "FAQ",
  sharedFaqs: [
    {
      q: "Apakah prop firm membatasi negara mana yang bisa mendaftar?",
      a: "Sebagian ya, biasanya karena alasan regulasi dan bukan karena alasan trading — contoh paling jelas adalah AS, di mana sebagian besar perusahaan multi-aset gaya CFD mengecualikan penduduk AS dan perusahaan khusus futures mengisi celah tersebut. TraderMarket tidak melacak kelayakan negara per perusahaan, jadi selalu pastikan langsung di situs perusahaan itu sendiri sebelum membayar biaya evaluasi.",
    },
    {
      q: "Apakah regulasi negara saya berlaku untuk sebuah challenge prop firm?",
      a: "Biasanya tidak secara langsung. Evaluasi prop firm umumnya adalah simulasi bermodal demo yang berjalan di platform milik perusahaan itu sendiri, bukan akun live di broker yang diregulasi secara lokal — sehingga batas leverage ritel dan aturan lisensi broker yang melindungi Anda saat trading dengan broker teregulasi umumnya tidak berlaku untuk challenge itu sendiri. Itulah sebabnya riset independen (bukti payout, ulasan, registrasi perusahaan) lebih penting di sini dibanding untuk akun brokerage yang teregulasi.",
    },
    {
      q: "Apakah saya akan dikenakan pajak atas payout prop firm?",
      a: "Hampir di semua negara, ya — profit trading umumnya adalah penghasilan kena pajak atau capital gain, tidak peduli di negara mana perusahaan itu berbasis. Bagaimana ini diklasifikasikan (penghasilan usaha, capital gain, atau lainnya) sangat bervariasi menurut negara dan bahkan menurut cara Anda trading, jadi catatan pajak di halaman ini adalah titik awal, bukan pengganti akuntan lokal.",
    },
    {
      q: "Mengapa zona waktu penting dalam memilih prop firm?",
      a: "Aturan evaluasi seperti batas kerugian harian direset pada waktu server yang tetap, dan jendela trading tersibuk serta paling volatil adalah overlap London/New York. Di mana overlap tersebut jatuh pada jam lokal Anda — pagi yang normal, atau tengah malam — memengaruhi jam berapa Anda bisa realistis trading akun tersebut tanpa mengganggu jadwal tidur Anda.",
    },
  ],
  alsoInTemplate: "Juga di {region}",
  allCountriesLinkText: "Semua negara →",
  regionLabels: {
    "North America": "Amerika Utara",
    "UK & Europe": "Inggris & Eropa",
    "Asia-Pacific": "Asia-Pasifik",
    "Middle East & Africa": "Timur Tengah & Afrika",
  },
};
