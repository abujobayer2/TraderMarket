import type { CryptoPropFirmsCopy } from "@/components/content/CryptoPropFirmsContent";

export const id: CryptoPropFirmsCopy = {
  kicker: "Panduan Trader · Kripto",
  h1: "Prop firm kripto, dan apa yang berubah karena pasar 24/7",
  intro:
    "Program funded kripto menggunakan struktur evaluasi-lalu-payout yang sama seperti perusahaan forex dan futures, tetapi pasar di baliknya selalu buka, lebih volatil, dan kurang teregulasi. Ini mengubah perhitungan drawdown, menghapus aturan flat-by-close, dan menambah bobot pada rekam jejak payout sebuah perusahaan — yang di segmen ini biasanya lebih singkat. Berikut cara membaca sebuah prop firm kripto.",
  howItWorksHeading: "Cara kerja evaluasi funded kripto",
  howItWorksBody:
    "Anda membayar biaya satu kali, melakukan trading pada akun demo yang mengikuti harga dari venue kripto sungguhan — biasanya futures perpetual BTC dan ETH — dan mencapai target profit tanpa melanggar drawdown. Jika lulus, Anda pindah ke akun funded, menyimpan pembagian 70–90%, dan mengajukan payout sesuai siklus. Model one-step dan instant funding umum ditemukan karena segmen ini bersaing dalam kecepatan akses.",
  changesHeading: "Apa yang berubah karena pasar 24/7",
  changesItems: [
    "Tidak ada aturan flat-by-close: posisi bisa berjalan sepanjang malam dan akhir pekan, sehingga risiko gap bersifat terus-menerus, bukan terkonsentrasi di pembukaan sesi.",
    "Volatilitas lebih tinggi: batas drawdown tercapai lebih cepat, dan trailing drawdown intraday lebih berisiko di sini dibanding di forex atau futures.",
    "Biaya masuk lebih rendah: tidak ada biaya data pasar gaya CME, sehingga harga evaluasi dan total biaya kepemilikan cenderung lebih rendah.",
    "Regulasi lebih lemah: venue dan perusahaan berada di luar rantai FCM teregulasi yang diandalkan trader futures, sehingga jalur penyelesaian sengketa terbatas.",
    "Leverage lebih rendah: umumnya 1:2–1:10 pada aset utama, mencerminkan volatilitas aset yang mendasarinya.",
  ],
  trackRecordHeading: "Rekam jejak payout lebih penting di sini",
  trackRecordBody:
    "Segmen prop kripto masih muda. Perusahaan forex yang sudah berdiri satu dekade memiliki ribuan payout publik untuk dinilai; banyak perusahaan native kripto baru mendanai trader selama beberapa bulan, bukan tahun. Ini tidak berarti mereka buruk — beberapa dikelola dengan baik — tetapi berarti Anda punya lebih sedikit riwayat untuk dijadikan pegangan. Beri bobot lebih pada bukti payout yang bisa diverifikasi, usia perusahaan, dan ulasan independen dari trader kripto dibanding pembagian profit yang diiklankan, dan berhati-hatilah dengan perusahaan mana pun yang marketing-nya lebih nyaring dibanding bukti payout-nya.",
  dueDiligenceHeading: "Due diligence sebelum mendanai akun kripto",
  dueDiligenceItems: [
    "Bukti payout dan usia perusahaan — dua sinyal dengan bobot terbesar di segmen yang masih baru ini.",
    "Baca aturan drawdown dan likuidasi secara bersamaan: apa yang terjadi jika venue yang mendasarinya melikuidasi posisi sebelum garis pelanggaran perusahaan tercapai.",
    "Instrumen dan venue: perpetual atau spot, dan feed harga milik siapa yang diikuti evaluasi.",
    "Ketentuan payout: aturan konsistensi, minimum hari, KYC, dan metode penarikan dana.",
    "Ulasan independen dari trader kripto — feedback dari forex atau futures tidak selalu berlaku di sini.",
  ],
  dueDiligencePrefix: "Lihat",
  dueDiligenceLinkText: "panduan program trading funded",
  dueDiligenceSuffix: 'untuk daftar periksa umum "apakah perusahaan ini membayar setelah lulus".',
  firmsHeading: "Prop firm yang terdaftar di TraderMarket",
  firmsIntro:
    "Banyak perusahaan multi-aset di bawah ini menawarkan pasangan kripto selain forex. Buka halaman ulasan sebuah perusahaan untuk melihat apakah trader menyebutkan kondisi kripto-nya, lalu verifikasi sendiri riwayat payout-nya.",
  allReviewsLinkText: "Lihat semua ulasan prop firm →",
  faqHeading: "Prop firm kripto — FAQ",
  faqs: [
    {
      q: "Apa itu prop firm kripto?",
      a: "Prop firm kripto memberikan trader akun evaluasi untuk trading aset digital — biasanya futures perpetual BTC dan ETH, kadang perpetual altcoin atau spot. Anda lulus target profit di bawah batas drawdown, lalu melakukan trading di akun funded untuk pembagian profit. Modelnya mencerminkan prop firm forex dan futures; pasar tempatnya berjalan yang berbeda.",
    },
    {
      q: "Apa bedanya trading prop kripto dengan trading prop forex atau futures?",
      a: "Pasar kripto trading 24/7, termasuk akhir pekan, sehingga tidak ada aturan flat-by-close dan risiko gap bersifat terus-menerus, bukan terkonsentrasi di pembukaan. Volatilitas lebih tinggi, sehingga batas drawdown tercapai lebih cepat. Hambatan masuknya lebih rendah karena tidak ada biaya data pasar seperti bursa futures CME. Dan lingkungannya kurang teregulasi dibanding forex maupun futures, sehingga jalur penyelesaian bagi trader saat terjadi masalah lebih lemah.",
    },
    {
      q: "Apakah prop firm kripto menggunakan drawdown trailing atau statis?",
      a: "Keduanya ada. Perusahaan native kripto sering menggunakan drawdown statis atau trailing akhir hari yang mirip forex, tetapi karena volatilitas 24/7 bisa menghasilkan pergerakan intraday yang besar, risiko praktis dari model trailing intraday lebih tinggi di sini dibanding pasar yang lebih lambat. Pastikan apakah drawdown diukur dari ekuitas atau saldo, dan bagaimana likuidasi di venue yang mendasarinya berinteraksi dengan aturan pelanggaran milik perusahaan sendiri.",
    },
    {
      q: "Apakah payout prop firm kripto bisa diandalkan?",
      a: "Perlakukan ini sebagai pertanyaan terbuka. Segmen prop kripto masih baru, sehingga sebagian besar perusahaan punya rekam jejak payout yang lebih singkat dibanding perusahaan forex berusia satu dekade. Beberapa sangat baik; segmen ini secara keseluruhan punya lebih sedikit riwayat untuk dinilai. Beri bobot lebih pada bukti payout yang bisa diverifikasi, sudah berapa lama perusahaan beroperasi, dan ulasan independen dibanding pembagian profit yang menjadi headline.",
    },
    {
      q: "Berapa leverage yang ditawarkan prop firm kripto?",
      a: "Umumnya 1:2 hingga 1:10 di akun funded, lebih rendah dibanding forex, karena aset yang mendasarinya jauh lebih volatil. Beberapa perusahaan menawarkan leverage lebih tinggi hanya untuk aset utama. Leverage memengaruhi margin dan likuidasi di venue, bukan batas atas drawdown perusahaan.",
    },
    {
      q: "Bagaimana cara memverifikasi prop firm kripto sebelum membeli evaluasi?",
      a: "Periksa bukti payout dan usia perusahaan lebih dulu, karena segmen ini masih muda. Baca aturan drawdown dan likuidasi secara bersamaan. Pastikan venue dan instrumen apa yang sebenarnya Anda tradingkan (perpetual vs. spot, feed harga bursa mana). Baca ulasan independen khusus dari trader kripto, dan ingat bahwa peringkat papan peringkat sebuah perusahaan mencerminkan visibilitas berbayar, bukan keandalan payout.",
    },
  ],
  relatedHeading: "Panduan terkait",
  relatedForex: "Prop firm forex",
  relatedFutures: "Prop firm futures",
  relatedBest: "Prop trading firm terbaik",
  relatedReviews: "Ulasan prop firm",
  relatedCountry: "Prop firm berdasarkan negara",
};
