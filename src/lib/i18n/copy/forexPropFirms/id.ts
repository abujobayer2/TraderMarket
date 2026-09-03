import type { ForexPropFirmsCopy } from "@/components/content/ForexPropFirmsContent";

export const id: ForexPropFirmsCopy = {
  kicker: "Panduan Trader · Forex",
  h1: "Prop firm forex, dan cara kerja sebenarnya funded trading forex",
  intro:
    "Forex adalah segmen terbesar di pasar prop firm, dan aturannya punya bentuk tersendiri: drawdown statis, leverage yang longgar, sesi 24/5, dan kebijakan trading saat berita yang lebih menentukan hasil evaluasi dibanding target profit itu sendiri. Berikut yang membedakan program funded forex dari futures dan kripto — serta cara memverifikasi sebuah perusahaan sebelum Anda membayar.",
  howItWorksHeading: "Cara kerja evaluasi funded forex",
  howItWorksBody:
    "Anda membayar biaya satu kali untuk akun evaluasi, melakukan trading pada akun demo yang didanai modal nosional perusahaan, dan berusaha mencapai target profit — umumnya 8–10% di fase satu dan 4–5% di fase dua — tanpa melanggar batas kerugian harian atau drawdown maksimum. Jika lulus, Anda pindah ke akun funded dengan pembagian profit 70–90% dan payout yang bisa diajukan dalam siklus tetap, biasanya setiap 1–4 minggu. Varian one-step, two-step, dan instant funding semuanya tersedia; trade-off-nya ada pada biaya, ukuran target, dan seberapa ketat drawdown-nya.",
  drawdownHeading: "Drawdown statis: aturan khas forex yang perlu dipahami",
  drawdownBody:
    "Perusahaan forex hampir selalu menggunakan drawdown maksimum statis yang diukur dari saldo awal Anda, bersama dengan batas kerugian harian. Berbeda dengan trailing drawdown yang berlaku di sebagian besar perusahaan futures, garis kerugian ini tidak ikut naik seiring Anda mengumpulkan profit — begitu Anda unggul beberapa persen, satu hari rugi yang wajar jauh lebih kecil kemungkinannya untuk mengakhiri akun. Detail yang masih sering menjebak trader: apakah batas harian diukur dari saldo yang sudah closed atau ekuitas yang mengambang, jam berapa (waktu server) batas itu direset, dan apakah drawdown maksimum bersifat absolut atau tetap trailing sampai Anda mencapai profit tertentu.",
  sessionsHeading: "Leverage, sesi, dan trading saat berita",
  sessionsItems: [
    "Leverage biasanya 1:30–1:100, terkadang 1:50 sebagai add-on berbayar. Ini memengaruhi margin Anda, bukan ruang gerak drawdown Anda.",
    "Pasar berjalan 24/5. Posisi umumnya bisa ditahan semalaman dan sepanjang akhir pekan, berbeda dengan sebagian besar program futures — periksa biaya swap/pembiayaan.",
    "Kebijakan trading saat berita adalah aturan dengan variasi tertinggi: sepenuhnya diizinkan, diblokir di sekitar rilis berdampak tinggi, atau hanya dibatasi saat evaluasi. Jika Anda trading NFP atau CPI, pastikan konfirmasinya tertulis.",
    "Menahan posisi di akhir pekan diizinkan di sebagian besar perusahaan forex, tetapi bisa disertai klausul risiko gap. Eksposur kripto, jika ditawarkan, mungkin tetap trading sepanjang akhir pekan.",
  ],
  dueDiligenceHeading: "Due diligence sebelum mendanai akun forex",
  dueDiligenceItems: [
    "Bukti payout: catatan yang bisa diverifikasi, bukan sekadar testimoni yang dikontrol perusahaan.",
    "Rekam jejak: sudah bertahun-tahun benar-benar mendanai trader, bukan baru berbulan-bulan menjalankan iklan.",
    "Ketentuan payout: klausul tidak aktif, aturan konsistensi, minimum hari trading, tahapan KYC yang bisa menunda penarikan dana.",
    "Kebijakan platform dan otomasi: MT4/MT5/cTrader/Match-Trader, dan apakah EA atau copy trading diizinkan.",
    "Ulasan independen: apa kata trader di luar materi marketing perusahaan sendiri dan halaman Trustpilot-nya.",
  ],
  dueDiligencePrefix: "Baca",
  dueDiligenceLinkText: "panduan program trading funded",
  dueDiligenceSuffix: 'untuk daftar periksa lengkap "apakah perusahaan ini membayar setelah lulus".',
  firmsHeading: "Prop firm yang terdaftar di TraderMarket",
  firmsIntro:
    "Sebagian besar perusahaan multi-aset di bawah ini menawarkan pasangan forex. Buka halaman ulasan sebuah perusahaan untuk melihat apa kata trader secara spesifik tentang kondisi forex-nya, lalu verifikasi sendiri riwayat payout-nya.",
  allReviewsLinkText: "Lihat semua ulasan prop firm →",
  faqHeading: "Prop firm forex — FAQ",
  faqs: [
    {
      q: "Apa itu prop firm forex?",
      a: "Prop firm forex memberikan trader akses ke modal perusahaan untuk melakukan trading pasangan mata uang, sebagai imbalan atas sebagian dari profit. Trader membayar biaya evaluasi satu kali, membuktikan bisa mencapai target profit sambil mematuhi batas drawdown — biasanya melalui satu atau dua fase — lalu melakukan trading di akun funded dengan pembagian profit 70–90%.",
    },
    {
      q: "Model drawdown apa yang digunakan prop firm forex?",
      a: "Sebagian besar perusahaan forex menggunakan drawdown maksimum statis (tetap) yang diukur dari saldo awal, ditambah batas kerugian harian yang terpisah. Ini lebih longgar dibanding drawdown trailing/intraday yang umum di perusahaan futures, karena garis kerugiannya tidak ikut naik seiring ekuitas Anda saat Anda menghasilkan profit. Selalu periksa apakah batas harian dihitung dari saldo atau ekuitas, dan apakah direset pada waktu server yang tetap.",
    },
    {
      q: "Berapa besar leverage yang ditawarkan prop firm forex?",
      a: "Akun funded forex biasanya menawarkan leverage 1:30 hingga 1:100, dengan beberapa perusahaan menyediakan hingga 1:50 sebagai add-on. Leverage yang lebih tinggi tidak mengubah aturan drawdown, sehingga dampaknya terutama pada margin, bukan pada seberapa besar Anda bisa rugi sebelum melanggar batas.",
    },
    {
      q: "Bisakah saya trading saat berita rilis di prop firm forex?",
      a: "Tergantung perusahaannya. Beberapa perusahaan sepenuhnya mengizinkan trading saat berita di akun funded, sebagian memblokir pembukaan atau penutupan posisi dalam beberapa menit sekitar rilis berdampak tinggi, dan sebagian lain hanya membatasinya selama masa evaluasi. Jika Anda trading NFP, CPI, atau event bank sentral, perlakukan kebijakan berita ini sebagai aturan penentu lulus-tidaknya dan pastikan konfirmasinya tertulis sebelum Anda membeli.",
    },
    {
      q: "Platform apa yang digunakan prop firm forex?",
      a: "MetaTrader 4, MetaTrader 5, cTrader, dan Match-Trader adalah yang paling umum. Pilihan platform memengaruhi gaya eksekusi, jenis order yang tersedia, dan apakah Anda bisa menjalankan expert advisor — periksa kebijakan otomasi dan copy trading perusahaan jika ini penting bagi Anda.",
    },
    {
      q: "Bagaimana saya tahu prop firm forex benar-benar membayar?",
      a: "Carilah bukti payout yang bisa diverifikasi, bukan sekadar testimoni yang dikontrol perusahaan, periksa sudah berapa lama perusahaan itu mendanai trader, baca ketentuan payout untuk klausul tidak aktif, konsistensi, atau KYC yang bisa menunda penarikan dana, dan baca ulasan trader independen. Peringkat sebuah perusahaan di papan peringkat mana pun, termasuk TraderMarket, mencerminkan apa yang dibayarkannya untuk visibilitas — bukan jaminan payout.",
    },
  ],
  relatedHeading: "Panduan terkait",
  relatedFutures: "Prop firm futures",
  relatedCrypto: "Prop firm kripto",
  relatedBest: "Prop trading firm terbaik",
  relatedReviews: "Ulasan prop firm",
  relatedCountry: "Prop firm berdasarkan negara",
};
