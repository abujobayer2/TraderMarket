import type { FuturesPropFirmsCopy } from "@/components/content/FuturesPropFirmsContent";

export const id: FuturesPropFirmsCopy = {
  kicker: "Panduan Trader · Futures",
  h1: "Prop firm futures, dan aturan yang sebenarnya menentukan akun Anda",
  intro:
    "Program funded futures terlihat sederhana dibanding forex — target yang terstandarisasi, kontrak yang familiar — tetapi mekanisme drawdown dan payout-nya lebih ketat. Trailing drawdown, aturan flat-by-close, biaya data, dan syarat konsistensi adalah faktor penentu lulus-tidaknya evaluasi dan payout. Berikut perbedaan segmen futures, dan cara memverifikasi sebuah perusahaan.",
  howItWorksHeading: "Cara kerja evaluasi funded futures",
  howItWorksBody:
    "Anda membeli akun evaluasi dengan ukuran berdasarkan daya beli (50K, 100K, 150K umum digunakan), melakukan trading futures kelompok CME, dan mencapai target profit sambil tetap di atas trailing drawdown maksimum dan di bawah batas kerugian harian. Banyak perusahaan menjalankan evaluasi satu fase tanpa syarat minimum profit per hari untuk lulus, tetapi menerapkan aturan konsistensi pada payout. Setelah funded, di beberapa perusahaan Anda menyimpan 90–100% dari bagian profit pertama, lalu pembagian 90/10 berlaku, dengan payout sesuai jadwal tetap.",
  drawdownHeading: "Trailing drawdown: aturan yang mengakhiri sebagian besar akun",
  drawdownBody:
    "Ambang kerugian maksimum mengikuti puncak akun Anda (trailing). Di sebagian besar perusahaan, ini mengikuti ekuitas mengambang intraday, jadi posisi yang sempat +$800 lalu Anda tutup di +$300 tetap menarik garis drawdown naik sebesar $800. Trailing berhenti begitu saldo Anda melewati saldo awal ditambah buffer tetap, setelah itu garis tersebut menjadi praktis statis. Bandingkan ini dengan forex, di mana drawdown statis dari saldo awal tidak pernah bergerak. Jika Anda scale in dan scale out pada posisi runner, hitung matematika trailing terhadap fluktuasi intraday terburuk Anda sebelum membeli.",
  flatByCloseHeading: "Flat-by-close, biaya data, dan platform",
  flatByCloseItems: [
    "Sebagian besar perusahaan mewajibkan setiap posisi ditutup sebelum sesi berakhir dan sebelum maintenance harian. Tanpa posisi semalaman (no-overnight) adalah default; penahanan posisi semalaman sering menjadi reward setelah mencapai milestone payout.",
    "Data live CME membawa biaya bursa non-profesional yang diteruskan sebagian besar perusahaan ke akun funded. Tambahkan biaya platform atau reset bulanan ke biaya sebenarnya Anda.",
    "Order routing menggunakan Rithmic atau Tradovate, ditampilkan melalui NinjaTrader, Tradovate web, TradingView, atau Quantower. Eksekusi order diproses melalui FCM yang teregulasi.",
    "Aturan lebih terstandarisasi dibanding forex karena rantai teregulasi ini memberi lebih sedikit ruang bagi perusahaan untuk berimprovisasi — tetapi aturan konsistensi dan scaling tetap bervariasi cukup besar.",
  ],
  dueDiligenceHeading: "Due diligence sebelum mendanai akun futures",
  dueDiligenceItems: [
    "Bukti payout dan frekuensi payout: catatan yang bisa diverifikasi, dan seberapa sering Anda benar-benar bisa menarik dana.",
    "Jenis trailing drawdown: intraday vs. akhir hari, dan di titik mana garis itu terkunci.",
    "Aturan konsistensi: persentase pastinya, dan apakah ini berlaku untuk payout, evaluasi, atau keduanya.",
    "Biaya total: biaya evaluasi + data bulanan + biaya platform/reset + biaya aktivasi akun funded.",
    "Ulasan independen khusus dari trader futures — feedback dari trader forex tidak selalu berlaku di sini.",
  ],
  dueDiligencePrefix: "Lihat",
  dueDiligenceLinkText: "panduan program trading funded",
  dueDiligenceSuffix:
    'untuk pemeriksaan umum "bayar setelah lulus" yang berlaku di semua perusahaan.',
  firmsHeading: "Prop firm yang terdaftar di TraderMarket",
  firmsIntro:
    "Buka halaman ulasan sebuah perusahaan untuk melihat apakah trader membahas aturan futures-nya — perilaku trailing drawdown, kebijakan overnight, biaya data — lalu verifikasi sendiri riwayat payout-nya.",
  allReviewsLinkText: "Lihat semua ulasan prop firm →",
  faqHeading: "Prop firm futures — FAQ",
  faqs: [
    {
      q: "Apa itu prop firm futures?",
      a: "Prop firm futures memberikan trader akun evaluasi untuk trading futures CME, CBOT, NYMEX, atau COMEX — ES, NQ, GC, CL, dan kontrak mikro. Lulus evaluasi dengan mencapai target profit tanpa menyentuh trailing drawdown atau batas kerugian harian, lalu trading di akun funded dan mengajukan payout sesuai aturan payout perusahaan.",
    },
    {
      q: "Bagaimana cara kerja trailing drawdown di prop firm futures?",
      a: "Garis kerugian maksimum mengikuti puncak akun Anda — sering kali puncak ekuitas mengambang (intraday), terkadang saldo akhir hari. Seiring akun Anda naik, drawdown ikut trailing di belakangnya, lalu terkunci setelah Anda melewati saldo awal ditambah buffer tertentu. Ini lebih ketat dibanding drawdown statis di sebagian besar perusahaan forex: posisi terbuka yang sempat melonjak profit lalu kembali turun bisa membuat Anda lebih dekat ke pelanggaran meski Anda menutupnya dalam kondisi untung.",
    },
    {
      q: "Bisakah saya menahan posisi futures semalaman?",
      a: "Biasanya tidak, pada tahap evaluasi dan awal funded. Sebagian besar perusahaan futures mewajibkan semua posisi flat sebelum sesi berakhir (dan sebelum jendela maintenance utama), dengan beberapa mengizinkan penahanan semalaman hanya setelah Anda mencapai milestone payout atau upgrade ke akun 'pro'/live. Menahan posisi melewati penutupan pada akun no-overnight biasanya adalah pelanggaran aturan instan.",
    },
    {
      q: "Apakah saya harus membayar untuk data pasar di prop firm futures?",
      a: "Sering kali ya. Data live CME untuk trader non-profesional membawa biaya bursa (kira-kira $10–$15 per bundel bursa per bulan) yang diteruskan sebagian besar perusahaan ke akun funded. Akun evaluasi terkadang menyertakan data yang delay atau disponsori perusahaan. Anggarkan biaya data dan biaya platform/reset bulanan, bukan hanya harga evaluasi.",
    },
    {
      q: "Platform apa yang digunakan prop firm futures?",
      a: "Rithmic dan Tradovate adalah dua backend order routing utama, ditampilkan melalui NinjaTrader, platform web milik Tradovate sendiri, TradingView, Quantower, atau R|Trader. Eksekusi order dan P&L Anda diproses melalui futures commission merchant yang teregulasi, salah satu alasan aturan prop firm futures cenderung lebih terstandarisasi dibanding forex.",
    },
    {
      q: "Apa itu aturan konsistensi dan mengapa penting untuk payout?",
      a: "Aturan konsistensi membatasi seberapa besar porsi total profit Anda yang boleh berasal dari satu hari saja — umumnya 20–40%. Aturan ini dirancang untuk mencegah trader lulus hanya karena satu hari beruntung. Biasanya berlaku pada kelayakan payout, bukan evaluasi itu sendiri, sehingga Anda bisa lulus tetapi tetap terblokir menarik dana sampai profit Anda tersebar di lebih banyak hari. Baca persentase pastinya dan apakah ini diukur pada evaluasi, akun funded, atau keduanya.",
    },
  ],
  relatedHeading: "Panduan terkait",
  relatedForex: "Prop firm forex",
  relatedCrypto: "Prop firm kripto",
  relatedBest: "Prop trading firm terbaik",
  relatedReviews: "Ulasan prop firm",
  relatedCountry: "Prop firm berdasarkan negara",
};
