import {
  ChecklistItem,
  Homestay,
  HostStory,
  ItineraryActivity,
  VillageLandmark,
  VillagePackage,
} from '../types/village';

export function formatIdr(amount: number): string {
  return `Rp ${amount.toLocaleString('id-ID')}`;
}

export const VILLAGE_COORDINATOR = {
  name: 'Pak Hendra Wijaya',
  role: 'Koordinator Pemandu & Meja Reservasi Desa',
  whatsappNumber: '6281234567890',
  responseWindow: 'Membalas dalam 15 menit (06:00–20:00 WIB)',
  elevation: '1.350 mdpl',
  morningTemp: '18°C Berkabut',
  trailStatus: 'Cerah & Kering',
};

export const VILLAGE_PACKAGES: VillagePackage[] = [
  {
    id: 'pkg-coffee-harvest',
    title: 'Petik Kopi Arabika Lereng & Sangrai Kuali Tanah',
    category: 'agro',
    categoryLabel: 'Agro & Panen',
    seasonalTag: 'Musim Panen · Nov',
    summary:
      'Susuri terasering teduh bersama petani koperasi, petik buah kopi merah matang, lalu sangrai sendiri 250g di atas bara kayu.',
    description:
      'Berlokasi di kebun tanah vulkanik lereng timur pada ketinggian 1.380 mdpl, wisata pagi ini memadukan jalan kaki landai dengan praktik pascapanen tradisional. Tamu belajar memilih buah merah terbaik, mencicipi seduhan proses madu, serta menikmati singkong hangat di beranda Ibu Sari.',
    duration: '3,5 jam',
    distance: '1,8 km jalur landai',
    elevation: '1.380 mdpl',
    difficulty: 'Mudah · Semua Usia',
    priceIdr: 185000,
    unitLabel: 'per tamu',
    slotsLeft: 4,
    guideName: 'Ibu Sari Lestari',
    guideRole: 'Ketua Koperasi Kopi (14 thn)',
    art: 'coffee-harvest',
    highlights: [
      {
        label: 'Jalan Kebun & Petik Buah Merah',
        detail: 'Jalur kebun kopi teduh dilengkapi keranjang anyaman bambu',
        icon: 'compass',
      },
      {
        label: 'Sangrai Tradisional Kuali Tanah',
        detail: 'Bawa pulang 250g biji Arabika hasil sangrai Anda sendiri',
        icon: 'flame',
      },
      {
        label: 'Cicip Seduhan & Kudapan Desa',
        detail: '3 seduhan manual single-origin bersama singkong rebus & gula aren',
        icon: 'coffee',
      },
    ],
    included: [
      'Keranjang petik anyaman & caping bambu',
      'Kemasan 250g kopi Arabika sangrai sendiri',
      'Teh herbal, seduhan kopi & kudapan hangat desa',
      'Pemandu petani lokal berpengalaman',
    ],
  },
  {
    id: 'pkg-sunrise-ridge',
    title: 'Jalur Fajar Bukit Kabut & Hutan Pinus',
    category: 'treks',
    categoryLabel: 'Jalur Puncak',
    seasonalTag: 'Langit Pagi Cerah',
    summary:
      'Pendakian ringan berpandu lentera menuju anjungan kayu 1.480 mdpl di atas lautan awan lembah, ditemani wedang jahe hangat.',
    description:
      'Berangkat dari pendopo desa pukul 05:15 menyusuri tangga batu hutan pinus berpegangan kayu. Dari anjungan pandang, saksikan matahari terbit menyibak kabut lembah sebelum turun melewati ladang kubis dan wortel warga.',
    duration: '3 jam',
    distance: '3,4 km memutar',
    elevation: 'Puncak 1.480 mdpl',
    difficulty: 'Sedang',
    priceIdr: 160000,
    unitLabel: 'per tamu',
    slotsLeft: 6,
    guideName: 'Mas Bagus Pratama',
    guideRole: 'Pemandu Jalur Puncak Bersertifikat',
    art: 'sunrise-ridge',
    highlights: [
      {
        label: 'Anjungan Lautan Awan 1.480 mdpl',
        detail: 'Panorama terbuka lembah timur dan puncak gunung saat fajar',
        icon: 'mountain',
      },
      {
        label: 'Termos Wedang Jahe & Serai Hangat',
        detail: 'Disajikan hangat di bangku kayu anjungan pukul 06:00 WIB',
        icon: 'coffee',
      },
      {
        label: 'Jalur Pulang Hutan Pinus Bertangga',
        detail: 'Tangga batu tertata dengan bangku istirahat setiap 400 meter',
        icon: 'compass',
      },
    ],
    included: [
      'Lentera jalan isi ulang & tongkat bambu',
      'Wedang jahe serai hangat & jadah bakar',
      'Tiket masuk kawasan konservasi bukit',
    ],
  },
  {
    id: 'pkg-family-rice',
    title: 'Jalan Santai Terasering & Makan Siang Dapur Desa',
    category: 'family',
    categoryLabel: 'Ramah Keluarga',
    summary:
      'Jalur rata tepi saluran irigasi yang dirancang khusus bagi lansia dan anak-anak, ditutup santap siang kayu bakar.',
    description:
      'Rute setengah hari paling bersahabat ini mengikuti jalur batu datar di tepi saluran air jernih persawahan dan kebun toga. Berhenti sejenak di gubuk bambu, memberi makan ikan kolam bersama anak-anak, lalu bersantap siang di dapur terbuka Pak Darmo.',
    duration: '4 jam',
    distance: '1,2 km jalur datar',
    elevation: '1.320 mdpl',
    difficulty: 'Mudah · Semua Usia',
    priceIdr: 195000,
    unitLabel: 'per tamu',
    slotsLeft: 5,
    guideName: 'Mbak Ratna Dewi',
    guideRole: 'Pemandu Wisata Keluarga & Lansia',
    art: 'family-rice',
    highlights: [
      {
        label: 'Jalur Batu Datar Tanpa Tangga',
        detail: 'Lebar dan rata, nyaman untuk lansia maupun kereta dorong anak',
        icon: 'accessibility',
      },
      {
        label: 'Makan Siang Masakan Tungku Kayu',
        detail: 'Tumis pucuk labu organik, tempe mendoan hangat & ikan nila bakar',
        icon: 'utensils',
      },
      {
        label: 'Gubuk Teduh & Mata Air Segar',
        detail: 'Banyak tempat duduk teduh dan toilet bersih di sepanjang rute',
        icon: 'droplets',
      },
    ],
    included: [
      'Pemandu jalan santai terasering & kebun herbal',
      'Paket makan siang 5 menu ala keluarga desa',
      'Pakan ikan kolam untuk anak-anak',
    ],
  },
  {
    id: 'pkg-bamboo-craft',
    title: 'Anyaman Bambu Pendopo & Rendam Kaki Air Hangat',
    category: 'craft',
    categoryLabel: 'Kriya Budaya',
    seasonalTag: 'Sisa 2 Slot Hari Ini',
    summary:
      'Belajar teknik anyaman bambu tradisional bersama perajin desa di pendopo sejuk, lalu relaksasi di kolam mineral hangat.',
    description:
      'Habiskan sore yang tenang duduk di pendopo bambu mempelajari pola anyaman dua-langkah untuk membuat nampan teh mungil. Akhiri sore Anda dengan merendam kaki di kolam air hangat alami beraroma serai yang menghadap lembah barat.',
    duration: '2,5 jam',
    distance: '400 m jalan desa',
    elevation: '1.340 mdpl',
    difficulty: 'Jalan Santai',
    priceIdr: 145000,
    unitLabel: 'per tamu',
    slotsLeft: 2,
    guideName: 'Pak Slamet Riyadi',
    guideRole: 'Empu Kriya Bambu Desa',
    art: 'bamboo-craft',
    highlights: [
      {
        label: 'Nampan Teh Anyaman Tangan Sendiri',
        detail: 'Hasil karya nampan bambu boleh langsung dibawa pulang',
        icon: 'compass',
      },
      {
        label: 'Rendam Kaki Air Mineral Hangat',
        detail: 'Diseduh daun serai segar dan jahe merah pegunungan',
        icon: 'droplets',
      },
      {
        label: 'Cicip Teh Herbal Kebun',
        detail: 'Seduhan rosela, daun mint, dan kunyit asam bebas kafein',
        icon: 'coffee',
      },
    ],
    included: [
      'Bilah bambu siap anyam & peralatan kriya',
      'Nampan bambu hasil anyaman sendiri',
      'Sesi rendam kaki air hangat & handuk katun',
    ],
  },
];

export const HOMESTAYS: Homestay[] = [
  {
    id: 'stay-rumah-bambu',
    name: 'Rumah Bambu Pak Darmo',
    hostName: 'Pak Darmo & Ibu Wati',
    hostYears: 11,
    cluster: 'Klaster Terasering Bawah · 1.320 mdpl',
    summary:
      'Pondok anyaman bambu lantai dasar selangkah dari kebun herbal, dilengkapi pintu lebar dan beranda kayu yang hangat.',
    description:
      'Dibangun dari bambu petung awetan dan kayu jati daur ulang, Rumah Bambu menyambut keluarga lintas generasi tanpa anak tangga di pintu masuk, pancuran air hangat mata air, serta pemandangan langsung ke petak sawah berkabut.',
    pricePerNightIdr: 420000,
    maxGuests: 4,
    bedrooms: 2,
    roomsLeft: 2,
    elevation: '1.320 mdpl',
    stepFree: true,
    hotSpring: true,
    mountainView: true,
    familyFriendly: true,
    breakfastIncluded: true,
    art: 'bamboo-lodge',
    amenities: [
      {
        label: 'Beranda & Kamar Mandi Tanpa Tangga',
        detail: 'Akses rata dari titik turun mobil; tersedia pegangan di kamar mandi',
        icon: 'accessibility',
      },
      {
        label: 'Pancuran Air Hangat Mata Air',
        detail: 'Air hangat mengalir 24 jam untuk udara malam pegunungan 16°C',
        icon: 'droplets',
      },
      {
        label: 'Termasuk Sarapan Hasil Kebun',
        detail: 'Nasi jagung hangat, telur dadar sayuran kebun & kopi tubruk desa',
        icon: 'utensils',
      },
      {
        label: 'Beranda Pandang Terasering Pagi',
        detail: 'Kursi rotan pribadi menghadap hamparan sawah berembun',
        icon: 'mountain',
      },
    ],
    houseNotes: [
      'Check-in mulai 13:00 WIB · Check-out 11:00 WIB',
      'Jam tenang malam mulai 21:30 WIB menjaga keasrian suara alam',
      'Selimut wol tebal ekstra disiapkan khusus untuk lansia dan anak',
    ],
  },
  {
    id: 'stay-pondok-kopi',
    name: 'Pondok Kopi Ibu Sari',
    hostName: 'Ibu Sari Lestari',
    hostYears: 8,
    cluster: 'Lorong Koperasi Kopi · 1.375 mdpl',
    summary:
      'Pondok kayu dan bata hangat tepat di sebelah tempat penjemuran kopi Arabika dengan seduhan kopi pagi gratis.',
    description:
      'Bangun pagi ditemani aroma kopi sangrai segar yang semerbak di teras. Sangat cocok untuk pasangan, solo traveler, maupun pendaki yang ingin dekat dengan gerbang jalur fajar Bukit Kabut.',
    pricePerNightIdr: 360000,
    maxGuests: 2,
    bedrooms: 1,
    roomsLeft: 1,
    elevation: '1.375 mdpl',
    stepFree: false,
    hotSpring: true,
    mountainView: true,
    familyFriendly: false,
    breakfastIncluded: true,
    art: 'coffee-harvest',
    amenities: [
      {
        label: 'Kopi Koperasi Sepuasnya',
        detail: 'Pojok seduh manual berisi biji kopi panen musim terbaru',
        icon: 'coffee',
      },
      {
        label: 'Air Hangat & Tungku Tanah Sore',
        detail: 'Anglo arang dinyalakan di teras saat sore berkabut',
        icon: 'flame',
      },
      {
        label: 'Wi-Fi Fiber Desa Stabil',
        detail: 'Koneksi 25 Mbps lancar untuk bekerja atau mengirim kabar',
        icon: 'wifi',
      },
      {
        label: '3 Menit ke Gerbang Bukit Kabut',
        detail: 'Penginapan terdekat menuju jalur matahari terbit',
        icon: 'compass',
      },
    ],
    houseNotes: [
      'Check-in mulai 14:00 WIB · Check-out 11:00 WIB',
      'Terdapat 2 anak tangga batu di pintu taman depan',
      'Gratis isi ulang termos air panas sebelum jalan subuh',
    ],
  },
  {
    id: 'stay-lumbung-kabut',
    name: 'Vila Keluarga Lumbung Kabut',
    hostName: 'Mas Arif & Mbak Dina',
    hostYears: 6,
    cluster: 'Punggungan Pinus Atas · 1.410 mdpl',
    summary:
      'Rumah kayu dua lantai bergaya lumbung padi untuk keluarga besar, lengkap dengan ruang makan hangat dan balkon lembah pinus.',
    description:
      'Terinspirasi dari lumbung padi tradisional Jawa, rumah kayu cedar yang lapang ini nyaman menampung hingga 6 tamu dalam 3 ruang tidur, dilengkapi meja makan besar untuk berkumpul bersama di sore berkabut.',
    pricePerNightIdr: 680000,
    maxGuests: 6,
    bedrooms: 3,
    roomsLeft: 3,
    elevation: '1.410 mdpl',
    stepFree: false,
    hotSpring: true,
    mountainView: true,
    familyFriendly: true,
    breakfastIncluded: true,
    art: 'hero-terraces',
    amenities: [
      {
        label: 'Kapasitas Nyaman Hingga 6 Orang',
        detail: '1 kamar queen di lantai bawah + 2 ruang tidur loteng yang hangat',
        icon: 'accessibility',
      },
      {
        label: 'Balkon Panorama Lembah Pinus',
        detail: 'Pemandangan terbuka 180 derajat melihat kabut pagi lembah',
        icon: 'mountain',
      },
      {
        label: 'Sarapan Diantar ke Meja Makan',
        detail: 'Disajikan hangat oleh Mbak Dina sesuai jam pilihan Anda',
        icon: 'utensils',
      },
      {
        label: 'Kamar Mandi Hangat & Rak Sepatu',
        detail: 'Tersedia keran bilas sepatu lumpur dan pengering hangat',
        icon: 'droplets',
      },
    ],
    houseNotes: [
      'Tersedia kamar tidur lantai bawah bagi tamu yang menghindari tangga',
      'Akses antar mobil hingga 25 meter dari pagar halaman',
      'Tersedia permainan papan kayu dan buku cerita anak di rak',
    ],
  },
  {
    id: 'stay-sendang-cottage',
    name: 'Pondok Taman Sendang Air',
    hostName: 'Ibu Ningsih',
    hostYears: 9,
    cluster: 'Rimbun Mata Air Herbal · 1.335 mdpl',
    summary:
      'Pondok taman satu lantai yang tenang di tepi aliran mata air alami, favorit tamu senior dan penikmat ketenangan alam.',
    description:
      'Dikelilingi pakis gunung, tanaman kapulaga, dan gemericik air jernih, Sendang Air menghadirkan jalur batu rata satu lantai, kasur ortopedi nyaman, serta bangku teduh pribadi untuk membaca di pagi hari.',
    pricePerNightIdr: 390000,
    maxGuests: 3,
    bedrooms: 1,
    roomsLeft: 2,
    elevation: '1.335 mdpl',
    stepFree: true,
    hotSpring: true,
    mountainView: false,
    familyFriendly: true,
    breakfastIncluded: true,
    art: 'herbal-spring',
    amenities: [
      {
        label: 'Jalur Datar Bebas Tangga',
        detail: 'Lantai batu rata dari gerbang masuk hingga kamar mandi',
        icon: 'accessibility',
      },
      {
        label: 'Dekat Kolam Air Hangat Alami',
        detail: 'Hanya 2 menit berjalan datar ke kolam rendam kaki mineral',
        icon: 'droplets',
      },
      {
        label: 'Keranjang Seduhan Herbal Segar',
        detail: 'Daun mint, serai, dan jahe dipetik segar setiap pagi dari taman',
        icon: 'coffee',
      },
      {
        label: 'Suasana Tenang Tepi Aliran Air',
        detail: 'Berada agak masuk dari jalan utama desa agar tidur lebih nyenyak',
        icon: 'compass',
      },
    ],
    houseNotes: [
      'Check-in mulai 13:00 WIB · Bisa check-out lebih santai bila kamar kosong',
      'Dilengkapi bantal ortopedi dan selimut tebal tambahan',
      'Tersedia antar-jemput mobil listrik desa dari area parkir utama',
    ],
  },
];

export const ITINERARY_ACTIVITIES: ItineraryActivity[] = [
  {
    id: 'act-sunrise',
    time: '05:15 WIB',
    title: 'Fajar Bukit Kabut & Wedang Jahe',
    location: 'Anjungan Puncak Utara (1.480 mdpl)',
    duration: '2,5 jam',
    distanceKm: 3.0,
    effort: 'Sedang',
    elderFriendly: false,
    pricePerPersonIdr: 160000,
    description:
      'Jalan pagi berbekal lentera menyusuri tangga batu hutan pinus untuk menyaksikan matahari terbit di atas lautan awan.',
    guideTip: 'Gunakan jaket penahan angin; suhu subuh sekitar 15°C.',
    art: 'sunrise-ridge',
  },
  {
    id: 'act-coffee',
    time: '08:30 WIB',
    title: 'Petik Kopi Arabika & Sangrai Kuali',
    location: 'Kebun Koperasi Lereng Timur',
    duration: '2,5 jam',
    distanceKm: 1.5,
    effort: 'Landai',
    elderFriendly: true,
    pricePerPersonIdr: 185000,
    description:
      'Memetik buah kopi merah bersama petani desa dan menyangrai 250g biji kopi di atas kuali tanah liat.',
    guideTip: 'Jalur kebun teduh dengan banyak bangku kayu untuk beristirahat.',
    art: 'coffee-harvest',
  },
  {
    id: 'act-lunch',
    time: '12:00 WIB',
    title: 'Makan Siang Tungku Kayu Terasering',
    location: 'Dapur Terbuka Pak Darmo',
    duration: '1,5 jam',
    distanceKm: 0.4,
    effort: 'Landai',
    elderFriendly: true,
    pricePerPersonIdr: 95000,
    description:
      'Sajian 5 menu rumahan desa: pucuk labu organik, ikan bakar air deras, tempe mendoan, dan nasi hangat.',
    guideTip: 'Menu vegetarian dan tidak pedas disiapkan segar sesuai permintaan.',
    art: 'family-rice',
  },
  {
    id: 'act-bamboo',
    time: '14:15 WIB',
    title: 'Lokakarya Anyaman Bambu Pendopo',
    location: 'Pendopo Kriya Desa',
    duration: '1,5 jam',
    distanceKm: 0.2,
    effort: 'Landai',
    elderFriendly: true,
    pricePerPersonIdr: 110000,
    description:
      'Belajar menganyam bilah bambu bersama perajin lokal untuk membuat nampan teh yang bisa dibawa pulang.',
    guideTip: 'Duduk santai di pendopo terbuka yang sejuk; semua bahan disediakan.',
    art: 'bamboo-craft',
  },
  {
    id: 'act-spring',
    time: '16:15 WIB',
    title: 'Rendam Kaki Air Hangat & Teh Herbal',
    location: 'Kolam Alami Sendang Air',
    duration: '1,5 jam',
    distanceKm: 0.6,
    effort: 'Landai',
    elderFriendly: true,
    pricePerPersonIdr: 85000,
    description:
      'Melepas lelah dengan merendam kaki di air mineral vulkanik hangat beraroma serai dan jahe liar.',
    guideTip: 'Jalur batu rata tanpa tanjakan dari balai desa.',
    art: 'herbal-spring',
  },
];

export const VILLAGE_LANDMARKS: VillageLandmark[] = [
  {
    id: 'lm-basecamp',
    name: 'Gerbang Selamat Datang Lereng Asri',
    elevation: '1.310 mdpl',
    walkFromBase: '0 mnt (Titik Kedatangan)',
    accessibility: 'Parkir mobil berkanopi, toilet bersih & mobil listrik jemputan',
    category: 'Pos Awal',
    x: 20,
    y: 74,
    summary:
      'Halaman penyambutan utama dengan area parkir teduh, meja registrasi desa, isi ulang air minum gratis, serta angkutan buggy untuk tamu senior.',
    guideTip: 'Temui Pak Hendra setibanya di pos untuk secangkir wedang jahe selamat datang.',
  },
  {
    id: 'lm-paddy',
    name: 'Jalur Saluran Sawah & Dapur Desa',
    elevation: '1.320 mdpl',
    walkFromBase: '6 mnt jalan datar',
    accessibility: 'Jalur batu rata tanpa tangga, gubuk istirahat tiap 200 m',
    category: 'Homestay',
    x: 36,
    y: 62,
    summary:
      'Hamparan terasering sawah hijau di samping Rumah Bambu Pak Darmo dan dapur kayu bakar desa.',
    guideTip: 'Cahaya sore paling hangat menyinari petak sawah sekitar pukul 15:45 WIB.',
  },
  {
    id: 'lm-spring',
    name: 'Mata Air Hangat Sendang Air',
    elevation: '1.335 mdpl',
    walkFromBase: '10 mnt jalan landai',
    accessibility: 'Jalur batu datar dilengkapi pegangan bambu di tepi kolam',
    category: 'Mata Air',
    x: 25,
    y: 44,
    summary:
      'Kolam mata air mineral hangat alami di tengah kebun kapulaga dan bangku kayu untuk rendam kaki.',
    guideTip: 'Sesi pagi yang sepi berlangsung pukul 08:00–10:30 WIB.',
  },
  {
    id: 'lm-coffee',
    name: 'Koperasi Kopi Pegunungan',
    elevation: '1.380 mdpl',
    walkFromBase: '14 mnt tanjakan ringan',
    accessibility: 'Jalan tanah padat & batu; dapat dijangkau mobil listrik desa',
    category: 'Agrowisata',
    x: 62,
    y: 52,
    summary:
      'Para-para penjemuran biji kopi, beranda sangrai kuali tanah, dan kebun Arabika yang dikelola 38 keluarga desa.',
    guideTip: 'Singgahlah pukul 09:00–15:00 WIB untuk mencium aroma sangrai kopi hangat.',
  },
  {
    id: 'lm-pendopo',
    name: 'Pendopo Kriya Bambu & Pasar Sabtu',
    elevation: '1.345 mdpl',
    walkFromBase: '8 mnt jalan kaki',
    accessibility: 'Hanya 1 undakan rendah menuju pendopo terbuka',
    category: 'Agrowisata',
    x: 50,
    y: 72,
    summary:
      'Pendopo kayu bersama untuk pelatihan anyaman bambu, pasar tani akhir pekan, dan pertemuan warga.',
    guideTip: 'Pasar tani Sabtu pagi buka pukul 06:00–10:30 WIB dengan sayur organik segar.',
  },
  {
    id: 'lm-sunrise',
    name: 'Anjungan Fajar Bukit Kabut',
    elevation: '1.480 mdpl',
    walkFromBase: '35 mnt naik tangga batu',
    accessibility: 'Tangga batu dengan pegangan kayu; disarankan sepatu anti-selip',
    category: 'Puncak Pandang',
    x: 78,
    y: 22,
    summary:
      'Titik pandang kayu tertinggi di desa dengan panorama 180 derajat ke hamparan kabut lembah dan gunung tetangga.',
    guideTip: 'Berangkat dari gerbang desa pukul 05:15 WIB agar tiba sebelum cahaya fajar 05:45.',
  },
];

export const HOST_STORIES: HostStory[] = [
  {
    id: 'story-1',
    quote:
      'Kami mengajak ibu saya yang berusia 74 tahun dari Jakarta. Menginap di Rumah Bambu benar-benar nyaman karena tanpa tangga, air mandi selalu hangat, dan beliau senang sekali ikut menyangrai kopi bersama Ibu Sari.',
    author: 'Ibu Ratna & Keluarga (6 tamu)',
    role: 'Menginap 2 malam di Rumah Bambu',
    context: 'Liburan Keluarga · Oktober',
  },
  {
    id: 'story-2',
    quote:
      'Koordinasi lewat WhatsApp dengan Pak Hendra sangat cepat dan jelas. Ketika pagi sempat gerimis, jadwal jalur puncak langsung dialihkan dengan rapi ke lokakarya sangrai kopi koperasi.',
    author: 'Daniel Kusuma',
    role: 'Wisatawan Mandiri',
    context: 'Jalur Fajar & Agro · November',
  },
];

export const PACKING_CHECKLIST: ChecklistItem[] = [
  {
    id: 'pack-jacket',
    label: 'Jaket hangat atau penahan angin',
    note: 'Suhu pagi berkisar 15°C–18°C sebelum pukul 08:00 WIB.',
  },
  {
    id: 'pack-shoes',
    label: 'Sepatu atau sandal gunung anti-selip',
    note: 'Jalur batu terasering terkadang lembap oleh embun pagi.',
  },
  {
    id: 'pack-bottle',
    label: 'Botol minum isi ulang pribadi',
    note: 'Tersedia stasiun isi ulang air mata air matang gratis di tiap klaster.',
  },
  {
    id: 'pack-cash',
    label: 'Uang tunai secukupnya untuk Pasar Sabtu',
    note: 'Homestay menerima transfer/QRIS; lapak tani warga lebih nyaman tunai pecahan kecil.',
  },
  {
    id: 'pack-sun',
    label: 'Topi & tabir surya ringan',
    note: 'Udara pegunungan terasa sejuk meski sinar matahari cukup terik pukul 11:00–14:00.',
  },
];
