/* ============================ NPC (Fase 3a) ============================
   Disisipkan ke src/game.js oleh tools/build-game.cjs (penanda include npc) supaya bisa memakai state & UI game.
   Isi: jadwal mingguan (Buku NPC 06-jadwal.md) → lokasi tiap NPC; aktor yang SELALU berjalan masuk/keluar lewat
   pintu/gerbang (tidak pernah muncul/hilang di depan pemain); ngobrol dengan dialog harian 07a/07b/07c (NPC_LINES);
   Trust (GDD §9: ngobrol +3/hari); Buku Kenalan. Angka di CFG.NPC (tag [3a]). */

CFG.NPC = { // [3a]
  TALK_TRUST: 3,        // GDD §9: ngobrol +3/hari
  TRANSIT: 64,          // piksel/detik saat pindah tempat; lama tiap langkah rute = panjang jalan ÷ kecepatan ini (jadwal & langkah kaki selalu sinkron)
  STAY_MIN: 10,         // menit game minimum singgah di satu tempat sebelum berangkat lagi
  STEP_MIN: 2,          // menit game minimum per langkah rute (mis. dari kursi ke pintu ruangan)
  WALK: 40,             // piksel/detik (pemain 74, pasien 42)
  HURRY: 2,             // batas atas kecepatan saat mengejar jadwal (2× WALK)
  TALK_R: 20,           // jarak ngobrol (piksel)
  COUNTER_R: 46,        // ngobrol lintas meja/etalase: pemain tepat di depan (bawah) NPC yang sedang diam, menghadap atas
  LINE_DAYS: 7,         // baris yang dipakai 7 hari terakhir tidak diulang (GDD §16)
  CELL: 8,              // ukuran sel jalur (A*)
  WANDER: [20, 45],     // NPC keliling pindah titik tiap 20–45 menit game
  KARAOKE_P: 0.3,       // Bu Endang ikut karaoke (06-jadwal aturan 2)
  STAFF_IN: 7.5, STAFF_OUT: 16.5, // staf klinik datang 07:30, pulang 16:30 (2e)
};

// ---- Tempat ----
/** Tempat di luar ruangan: zona, titik, sebaran (r), area keliling (wander). name = teks "Sekarang" di Buku Kenalan. */
const NPC_PLACE = {
  'alun.catur': { name: 'Alun-alun · meja catur', zone: 'alun', pt: [352, 300], r: 10, at: 'alun' },
  'alun.angkringan': { name: 'Angkringan', zone: 'alun', pt: [684, 418], r: 44, at: 'angkringan' },
  'alun.keliling': { name: 'Alun-alun', zone: 'alun', pt: [470, 300], wander: [330, 252, 230, 120], at: 'alun' },
  'alun.pasar': { name: 'Alun-alun · tenda pasar', zone: 'alun', pt: [545, 376], r: 22, at: 'alun' },
  'alun.plaza': { name: 'Alun-alun', zone: 'alun', pt: [420, 360], r: 30, at: 'alun' },
  'alun.proyek': { name: 'Alun-alun · cek saluran', zone: 'alun', pt: [600, 232], r: 6, at: 'proyek' },
  'lereng.voli': { name: 'Lapangan Voli', zone: 'lereng', pt: [198, 336], r: 42, at: 'voli' },
  'lereng.bukit': { name: 'Bukit Bintang', zone: 'lereng', pt: [468, 82], r: 44, at: 'bukit' },
  'lereng.kopi': { name: 'Kebun Kopi', zone: 'lereng', pt: [652, 208], r: 28, at: 'kopi' },
  'lereng.bunga': { name: 'Kebun Bunga', zone: 'lereng', pt: [44, 236], r: 10, at: 'bunga' },
  'lereng.proyek': { name: 'Lereng Bukit · proyek', zone: 'lereng', pt: [420, 300], r: 6, at: 'proyek' },
  'kampung.tanggul': { name: 'Kampung Asri · tanggul', zone: 'kampung', pt: [692, 172], r: 8, at: 'proyek' },
  'kampung.posyandu': { name: 'Posyandu Kampung Asri', zone: 'kampung', pt: [470, 256], r: 14, at: 'posyandu' },
  'kampung.halaman': { name: 'Kos Melati · halaman', zone: 'kampung', pt: [860, 216], r: 6, at: 'kos' },
  'niaga.patroli': { name: 'Jalan Niaga · patroli', zone: 'niaga', pt: [380, 216], wander: [30, 206, 720, 16], at: 'patroli' },
  'alun.patroli': { name: 'Alun-alun · patroli', zone: 'alun', pt: [380, 214], wander: [40, 206, 700, 16], at: 'patroli' },
};
/** Nama ruangan untuk "Sekarang" + kunci @Tempat dialog. Kunci = kunci pintu zona. */
const NPC_ROOMNAME = { warung: 'Warung Bu Ratna', kedai: 'Kedai Kopi Seduh', balai: 'Balai Kota', roti: 'Toko Roti Manis', pos: 'Kantor Pos', endang: 'Rumah Keluarga Endang',
  wiryo: 'Rumah Kakek Wiryo', lurah: 'Rumah Lurah', kos: 'Kos Melati', bowo: 'Rumah Pak Bowo', jamu: 'Pondok Jamu', guru: 'Rumah Bu Sinta', sd: 'SD Negeri Rimbasari',
  terminal: 'Terminal Bus', losmen: 'Losmen Singgah', polisi: 'Pos Polisi', teknik: 'Konsultan Teknik', adji: 'Kantor Akuntan', puskes: 'Puskesmas', studio: 'Studio Foto Lensa',
  perpus: 'Perpustakaan', bahari: 'Bahari Medika', klinik: 'Klinik' };
/** Posisi tetap di dalam ruangan (kaki) + arah hadap. Yang tidak tercantum dapat titik bebas acak (tetap per NPC). */
const NPC_ROOMSPOT = {
  warung: { ratna: [186, 66, 'down'], putri: [150, 66, 'down'] }, kedai: { nadia: [190, 66, 'down'] }, roti: { tari: [214, 64, 'down'] },
  balai: { harjo: [138, 66, 'down'] }, pos: { ilham: [104, 64, 'down'] }, jamu: { darmi: [156, 64, 'down'] }, perpus: { sekar: [130, 66, 'down'] },
  puskes: { wulan: [150, 68, 'down'], galih: [110, 112, 'down'], dewi: [64, 112, 'down'], rina: [240, 122, 'down'] },
  adji: { adji: [176, 112, 'up'], yoga: [58, 112, 'up'] }, sd: { sinta: [126, 66, 'down'], doni: [208, 100, 'down'] },
  losmen: { sri: [56, 64, 'down'] }, bahari: { hendra: [136, 70, 'down'] },
};
/** Rumah di luar peta / di belakang bangunan: NPC berjalan ke sana lalu hilang (pintu bangunan atau tepi peta). */
const NPC_HOME = {
  ratna: { door: 'warung' }, tari: { door: 'roti' }, galih: { door: 'puskes' }, wulan: { door: 'puskes' }, raka: { door: 'polisi' }, adji: { door: 'adji' },
  arya: { door: 'teknik' }, nadia: { door: 'kedai' }, sekar: { door: 'perpus' }, laras: { door: 'studio' }, sri: { door: 'bowo' }, hendra: { edge: ['tanjung', 476, 200] },
  harjo: { room: 'lurah' }, bowo: { room: 'bowo' }, sinta: { room: 'guru' }, endang: { room: 'endang' }, dimas: { room: 'endang' }, wiryo: { room: 'wiryo' }, darmi: { room: 'jamu' },
  udin: { room: 'kos' }, rina: { room: 'kos' }, yoga: { room: 'kos' }, hana: { room: 'kos' }, bima: { room: 'kos' },
  fajar: { edge: ['niaga', 764, 212] }, dewi: { edge: ['niaga', 764, 212] },
};
const NPC_EDGE_KAMPUNG = { edge: ['kampung', 3, 214] }; // Slamet, Ilham, Doni, Putri, Siti: rumah di Kampung Asri tanpa bangunan

// ---- Jadwal (06-jadwal.md). [hari, dari, sampai, tempat]; hari = digit 0 Senin … 6 Minggu; baris pertama yang cocok dipakai. ----
const WK = '01234', SAT = '5', SUN = '6', ALL = '0123456', WS = '012345';
const NPC_SCHED = {
  harjo: [[SUN, 6, 11, 'lereng.kopi'], [WK, 8, 14, 'balai'], [WS, 15, 17, 'alun.keliling'], [SAT, 19, 21, 'alun.angkringan'], [ALL, 6, 21, 'lurah']],
  ratna: [[SUN, 15, 17, 'roti'], [ALL, 6, 21, 'warung']],
  darmi: [['3', 7, 11, 'alun.pasar'], [ALL, 6, 19, 'jamu']],
  dimas: [[WS, 7, 12, 'sd'], [SUN, 7, 10, 'alun.plaza'], [WS, 16, 17.5, 'lereng.voli'], [ALL, 6, 21, 'endang']],
  endang: [[ALL, 6, 7, 'warung'], ['K', 19, 21, 'alun.angkringan'], [ALL, 7, 22, 'endang']],
  bowo: [[ALL, 6, 15, 'lereng.kopi'], [ALL, 15, 19, 'bowo'], [ALL, 19, 21, 'alun.angkringan']],
  sinta: [[WS, 7, 13, 'sd'], [WS, 15, 17, 'perpus'], [SUN, 16, 18, 'kedai'], [ALL, 6, 22, 'guru']],
  slamet: [[ALL, 7, 10, 'alun.pasar'], [ALL, 18, 24, 'alun.angkringan']],
  tari: [[ALL, 6, 17, 'roti'], [ALL, 17, 18, 'warung'], [SAT, 19, 21, 'alun.angkringan']],
  ilham: [[WS, 8, 10, 'pos'], [WK, 10, 15, 'keliling'], [SAT, 10, 12, 'keliling'], [ALL, 16, 18, 'lereng.voli'], ['3', 19, 21, 'alun.angkringan']],
  wiryo: [[WS, 7, 11, 'alun.catur'], [SUN, 9, 11, 'perpus'], [WS, 15, 17, 'alun.catur'], ['14', 19, 20, 'alun.angkringan'], [ALL, 7, 21, 'wiryo']],
  doni: [[ALL, 6, 8, 'lereng.voli'], [WS, 8, 12, 'sd'], [ALL, 16, 18, 'lereng.voli'], [ALL, 19, 21, 'alun.angkringan']],
  adji: [[SUN, 6, 9, 'alun.keliling'], [WS, 7.5, 8, 'roti'], [WS, 8, 17, 'adji'], [WS, 17, 19, 'kedai'], [SUN, 16, 18, 'kedai'], ['45', 19, 22, 'alun.angkringan']],
  arya: [[WS, 8, 12, 'teknik'], ['03', 13, 17, 'alun.proyek'], ['14', 13, 17, 'kampung.tanggul'], ['25', 13, 17, 'lereng.proyek'], [WS, 18, 19, 'perpus'], ['2', 20, 22, 'lereng.bukit']],
  raka: [[WS, 7, 15, 'polisi'], [SUN, 7, 12, 'polisi'], [ALL, 16, 18, 'lereng.voli'], ['4', 18, 22, 'alun.angkringan'], [SAT, 18, 22, 'alun.angkringan'], [ALL, 18, 20, 'alun.angkringan'], [ALL, 20, 23, 'patroli']],
  galih: [['14', 20, 24, 'puskes'], [WS, 7, 14, 'puskes'], [WS, 15, 17, 'perpus'], [WS, 17, 18, 'kedai'], [SUN, 15, 18, 'lereng.bukit']],
  sekar: [['0', 9, 12, 'jamu'], [ALL, 6, 9, 'lereng.bunga'], [SUN, 9, 15, 'perpus'], [SUN, 16, 18, 'kedai'], [WS, 9, 19, 'perpus']],
  nadia: [[ALL, 5, 7, 'lereng.kopi'], ['123456', 8, 22, 'kedai']],
  laras: [[WS, 9, 15, 'studio'], [SUN, 9, 12, 'studio'], [ALL, 15, 18, 'laras'], [SAT, 19, 21, 'alun.angkringan']],
  wulan: [['03', 20, 24, 'puskes'], ['25', 7, 11, 'kampung.posyandu'], [WS, 7, 15, 'puskes']],
  sri: [[ALL, 7, 19, 'losmen']],
  hendra: [[WS, 8, 17, 'bahari']],
  // staf belum direkrut (06-jadwal "Belum direkrut" + sore/malam/Minggu); staf yang direkrut ditimpa klinik di npcPlaceAt
  putri: [[WS, 8, 16, 'warung'], [WK, 17, 19, 'warung'], [SAT, 19, 23, 'alun.angkringan'], [SUN, 15, 18, 'kedai']],
  yoga: [[WS, 8, 16, 'adji'], [WK, 16.5, 18, 'lereng.voli'], [SAT, 16.5, 18, 'perpus'], [SUN, 16, 18, 'lereng.voli'], [ALL, 6, 22, 'kos']],
  udin: [[WS, 7, 11, 'kampung.halaman'], [WS, 15, 17.5, 'alun.catur'], [WS, 19, 20, 'alun.angkringan'], [ALL, 6, 22, 'kos']],
  siti: [[SUN, 9, 11, 'warung'], [WS, 14, 21, 'alun.angkringan']],
  rina: [[WS, 8, 14, 'puskes'], [WS, 17, 19, 'kedai'], [SUN, 15, 18, 'lereng.bukit'], [ALL, 6, 22, 'kos']],
  fajar: [['3', 7, 11, 'alun.pasar'], [SAT, 16, 18, 'lereng.voli']],
  dewi: [[WS, 7, 15, 'puskes'], [SUN, 10, 14, 'perpus']],
  hana: [[WS, 9, 15, 'perpus'], [WS, 16.5, 18, 'perpus'], [SUN, 12, 14, 'guru'], [ALL, 6, 22, 'kos']],
  bima: [[WS, 10, 15, 'kedai'], [WS, 16.5, 18, 'lereng.voli'], [WS, 18, 20, 'kedai'], [SUN, 16, 18, 'lereng.voli'], [ALL, 6, 22, 'kos']],
};
/** Sejak kapan NPC ada di kota (06-jadwal tabel staf: Rina/Fajar/Dewi klinik tahap 2, Hana/Bima tahap 3). */
const NPC_FROM_STAGE = { rina: 2, fajar: 2, dewi: 2, hana: 3, bima: 3 };
/** Hujan (06-jadwal aturan 4): tempat terbuka pindah ke tempat beratap. Kebun Kopi, patroli, keliling Ilham tetap. */
const NPC_RAIN = { 'lereng.voli': 'kedai', 'lereng.bunga': 'perpus', 'kampung.posyandu': 'puskes', 'alun.plaza': null };
/** Ringkasan untuk pemain di Buku Kenalan (tanpa rahasia; tulisan pemilik proyek di Buku NPC adalah sumbernya). */
const NPC_BLURB = {
  harjo: 'Lurah Rimbasari. Sore hari keliling Alun-alun sambil mencatat lampu jalan yang mati.',
  ratna: 'Pemilik warung. Kalau ada kabar di kota, biasanya Bu Ratna yang tahu duluan.',
  darmi: 'Peracik jamu di Pondok Jamu. Irit bicara, tapi hafal semua tanaman obat.',
  dimas: 'Anak kelas tiga SD, anak Bu Endang. Bercita-cita jadi insinyur robot.',
  endang: 'Penjahit, ibu Dimas. Mesin jahitnya bunyi dari pagi sampai malam.',
  bowo: 'Petani kopi, adik Pak Harjo. Lebih banyak di kebun daripada di rumah.',
  sinta: 'Guru SD. Sore hari biasanya membaca di Perpustakaan.',
  slamet: 'Pemilik angkringan di Alun-alun, mantan sopir bus. Pembawa acara karaoke Sabtu malam.',
  tari: 'Pemilik Toko Roti Manis. Rotinya sudah habis sebelum siang.',
  ilham: 'Kurir pos. Hafal semua alamat di Rimbasari, dan hampir semua anjingnya.',
  wiryo: 'Pensiunan guru. Pernah mengajar hampir semua orang dewasa di kota. Jago catur.',
  doni: 'Pelatih voli SD. Lari pagi di lapangan setiap hari, hujan atau tidak.',
  sri: 'Pengelola Losmen Singgah, istri Pak Bowo. Ramah ke semua tamu.',
  adji: 'Akuntan di Jalan Niaga. Lucu, dan selalu menanyakan apakah kamu sudah makan.',
  arya: 'Insinyur sipil di Konsultan Teknik. Pendiam, suka menggambar.',
  raka: 'Polisi kota. Patroli malam dari Alun-alun sampai Jalan Niaga.',
  galih: 'Dokter umum Puskesmas. Tenang, suka minum teh di Kedai sore hari.',
  sekar: 'Penjaga Perpustakaan dan kebun bunga. Lembut dan pemalu.',
  nadia: 'Barista pemilik Kedai Kopi Seduh. Energinya tidak habis-habis.',
  laras: 'Fotografer di Studio Foto Lensa. Sore hari keliling memotret kota.',
  wulan: 'Bidan Puskesmas. Lembut, tapi tegas soal kesehatan ibu dan anak.',
  putri: 'Gadis Kampung Asri yang sering membantu di warung Bu Ratna. Cekatan.',
  yoga: 'Penghuni Kos Melati. Rapi dan suka membuat jadwal.',
  rina: 'Perawat gigi dari Metrapura, tinggal di Kos Melati.',
  fajar: 'Pemuda Desa Wetan yang ingin belajar jadi perawat gigi.',
  dewi: 'Lulusan sekolah perawat dari Kampung Kali. Teliti sekali.',
  udin: 'Pemilik Kos Melati. Menyapu halaman sambil bersenandung keroncong.',
  siti: 'Membantu di Angkringan Pak Slamet. Tidak bisa diam.',
  hana: 'Dokter gigi muda, tinggal di Kos Melati.', bima: 'Dokter gigi muda, tinggal di Kos Melati. Suka voli.',
  hendra: 'Pemilik Bahari Medika di Tanjung Arum. Pedagang alat kesehatan yang ramah.',
};
/** NPC yang tampil di kota pada 3a-1 (pasien spesial & tokoh luar kota lain menyusul di 3b). */
const NPC_ROSTER = ['harjo', 'ratna', 'darmi', 'dimas', 'endang', 'bowo', 'sinta', 'slamet', 'tari', 'ilham', 'wiryo', 'doni', 'sri',
  'adji', 'arya', 'raka', 'galih', 'sekar', 'nadia', 'laras', 'wulan', 'putri', 'yoga', 'rina', 'fajar', 'dewi', 'udin', 'siti', 'hana', 'bima', 'hendra'];
const ROMANCE_M = ['adji', 'arya', 'raka', 'galih'], ROMANCE_F = ['sekar', 'nadia', 'laras', 'wulan'];
/** Kandidat romance yang tersedia untuk pemain (lawan jenis, GDD §10). */
const romanceIds = () => S.gender === 'W' ? ROMANCE_M : ROMANCE_F;
const npcName = id => castBy(id).name;

// ---- State tersimpan ----
/** Data NPC di save: met (pernah ngobrol), talked (hari terakhir ngobrol), used (baris dialog → hari dipakai). Trust di S.trust. */
function npcSt() { if (!S.trust) S.trust = {}; if (!S.npc) S.npc = { met: {}, talked: {}, used: {} }; return S.npc; }
const npcMet = id => !!npcSt().met[id];
const talkedToday = id => npcSt().talked[id] === S.day;
const tierName = t => tierOf(t)[1];

// ---- Lokasi menurut jadwal ----
const hashN = (s) => { let h = 2166136261; for (const ch of String(s)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return (h >>> 0) / 4294967296; };
const isRainy = () => season().key === 'hujan';
/** Staf yang direkrut: peran (resep/perawat) atau null. */
function staffRoleOf(id) { for (const r of Object.keys(STAFF_ROLES)) /* [3b-3] */ { const st = staffOf(r); if (st && st.id === id) return r; } return null; }
/** Tempat NPC pada menit t hari ini (kunci tempat), atau null = di rumah/luar kota. */
function npcPlaceAt(id, t) {
  if (NPC_FROM_STAGE[id] && S.clinicStage < NPC_FROM_STAGE[id] && !staffRoleOf(id)) return null;
  { const bw = wargaWin(id); if (bw && t >= bw[0] && t < bw[1]) return 'berobat'; } // [3a-2] pasien warga: ke klinik, bukan ke jadwal biasa
  { const jp = janjiPlace(id, t); if (jp) return jp; } // [3a-4] janji event romance: menunggu di tempat event
  { const np = nikahPlace(id, t); if (np) return np; } // [3a-5] hari pernikahan, pasangan di rumah
  const h = t / 60, wd = wdIdx(), role = staffRoleOf(id);
  if (role) { // staf klinik: 07:30–16:30 di klinik pada hari dia bekerja (2e)
    if (staffOn(role) && h >= CFG.NPC.STAFF_IN && h < CFG.NPC.STAFF_OUT) return 'klinik';
    if (h >= 8 && h < 16.5 && wd < 6) return NPC_HOME[id] && NPC_HOME[id].room ? NPC_HOME[id].room : null; // libur → rumah
  }
  if (id === 'nadia' && wd === 0 && h >= 7) return null; // Senin kedai tutup, Nadia ke luar kota
  if (id === 'wulan' && dayOfSeason() % 30 >= 1 && dayOfSeason() % 30 <= 7 && wd === 6) return null; // Minggu pertama tiap bulan pulang ke Dusun Atas
  for (const [days, a, b, p] of NPC_SCHED[id] || []) {
    if (h < a || h >= b) continue;
    if (days === 'K') { if (wd !== 5 || hashN('kar' + S.day) >= CFG.NPC.KARAOKE_P) continue; } else if (!days.includes(String(wd))) continue;
    if (role && (p === 'warung' || p === 'adji' || p === 'puskes') && h < 16.5) continue; // pekerjaan lama sebelum direkrut
    let q = p;
    if (q === 'keliling') q = 'kel:' + ['alun', 'kampung', 'niaga', 'lereng'][Math.floor(hashN(id + S.day + Math.floor(h)) * 4)];
    if (q === 'laras') { const r = hashN('laras' + S.day); q = r < 0.5 ? 'lereng.bukit' : r < 0.8 ? 'alun.plaza' : 'kampung.tanggul'; if (isRainy()) q = 'studio'; }
    if (q === 'patroli') q = h < 21.5 ? 'alun.patroli' : 'niaga.patroli';
    if (isRainy()) {
      if (q in NPC_RAIN) q = NPC_RAIN[q];
      else if (q === 'alun.catur') q = id === 'wiryo' ? 'wiryo' : null;
      else if (q === 'alun.keliling') q = id === 'harjo' ? 'lurah' : null;
      else if (q === 'lereng.bukit') q = h < 19 ? 'perpus' : null;
    }
    return q;
  }
  return homeKey(id); // di luar jadwal: di rumah (ruangan rumah tetap bisa didatangi; rumah tanpa interior = tidak tampil)
}
/** Keliling Ilham (zona acak per jam). */
const KEL_AREA = { alun: [30, 206, 700, 14], kampung: [30, 206, 900, 14], niaga: [30, 206, 720, 14], lereng: [136, 244, 440, 12] };
/** Info tempat: zona + titik untuk kunci tempat. */
function placeInfo(p) {
  if (!p) return null;
  if (p.startsWith('kel:')) { const z = p.slice(4), a = KEL_AREA[z]; return { name: ZONES[z].name + ' · mengantar surat', zone: z, pt: [a[0] + a[2] / 2, a[1] + a[3] / 2], wander: a, at: z }; }
  if (NPC_PLACE[p]) return NPC_PLACE[p];
  if (p === 'berobat') { const I = placeInfo('klinik'); return I ? Object.assign({}, I, { name: 'Berobat di klinik', at: 'berobat' }) : null; } // [3a-2]
  const d = doorOf(p); return d ? { name: NPC_ROOMNAME[p] || d.name, zone: d.zone, room: d.room, door: d, at: p } : null;
}
/** Pintu zona untuk kunci tempat ruangan (klinik = tahap sekarang). Dicari sekali per zona. */
const doorCache = {};
function doorOf(k) {
  k = nikahDoorKey(k); // [3a-5] 'rumahku' = rumah pemain
  const ck = k + '|' + S.clinicStage + '|' + S.homeLv; if (ck in doorCache) return doorCache[ck];
  for (const z of ['alun', 'kampung', 'niaga', 'lereng', 'tanjung']) { const d = getZone(z).doors.find(d => (k === 'klinik' ? /^klinik/.test(d.k) : d.k === k)); if (d) return doorCache[ck] = { zone: z, k: d.k, room: d.room, x: d.x, y: d.y, name: d.name }; }
  return doorCache[ck] = null;
}
/** Segmen jadwal hari ini: [{t, p}] (tiap 30 menit, digabung). Disimpan sementara per hari/musim/staf. */
const segCache = {};
function npcSegs(id) {
  const k = id + '|' + S.day + '|' + S.clinicStage + '|' + JSON.stringify(S.staff || {}) + '|' + (wargaWin(id) || '') /* [3a-2] */ + '|' + janjiKey(id) /* [3a-4] */ + '|' + nikahKey() /* [3a-5] */; if (segCache[k]) return segCache[k];
  const out = []; for (let t = CFG.DAY_START; t < CFG.DAY_END; t += 30) { const p = npcPlaceAt(id, t); if (!out.length || out[out.length - 1].p !== p) out.push({ t, p }); }
  // berangkat lebih awal supaya tiba saat jadwal mulai (pulang: tepat waktu), tapi tidak sebelum tiba di tempat sebelumnya
  let arr = CFG.DAY_START - 120;
  out.forEach((g, i) => { g.from = i ? out[i - 1].p : homeKey(g.id = id); const D = g.from === g.p ? 0 : npcRouteT(id, g.from, g.p).total || 0;
    g.dep = Math.max(g.p ? g.t - D : g.t, i ? arr + CFG.NPC.STAY_MIN : arr);
    if (g.p === 'berobat') g.dep = Math.max(g.dep, wargaWin(id)[2]); // [3a-2] berangkat ke klinik saat pasien warga muncul, bukan sebelumnya
    g.arr = arr = g.dep + D; });
  return segCache[k] = out;
}
/** [rev] Hitung jadwal semua NPC di depan (membangun zona/ruangan + kisi jalur yang dibutuhkan).
 *  Dipanggil saat layar transisi/muat, supaya tidak membekukan frame pertama permainan (±1,2 dtk saat dingin). */
function npcWarm() { try { NPC_ROSTER.forEach(id => npcSegs(id)); } catch (e) { /* ditangani lagi oleh updateNpcs */ } }
/** Status NPC sekarang: tempat tujuan, tempat asal, mulai pindah (menit). */
function npcNow(id) {
  const segs = npcSegs(id); let i = 0; while (i + 1 < segs.length && segs[i + 1].dep <= S.time) i++;
  return { cur: segs[i].p, prev: segs[i].from, t0: segs[i].dep, i };
}
const homeKey = id => NPC_HOME[id] && NPC_HOME[id].room ? NPC_HOME[id].room : null;
/** Teks "Sekarang" di Buku Kenalan. */
function npcWhereText(id) {
  const n = npcNow(id); if (S.time - n.t0 < travelOf(id, n)) return 'Sedang di jalan';
  const p = placeInfo(n.cur); if (p) return p.name;
  return id === 'hendra' ? 'Bahari Medika (tutup)' : 'Di rumah / luar kota';
}

// ---- Jalur (A* di kisi 8 px; kotak kaki sama dengan pemain) ----
function navGrid(w) {
  if (w.nav) return w.nav; const C = CFG.NPC.CELL, cols = Math.ceil(w.w / C), rows = Math.ceil(w.h / C), free = new Uint8Array(cols * rows);
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) { const x = i * C + C / 2, y = j * C + C / 2; free[j * cols + i] = x > 5 && x < w.w - 5 && y > 6 && y < w.h - 2 && !blocked(w, x, y) ? 1 : 0; }
  return w.nav = { C, cols, rows, free };
}
/** Sel bebas terdekat dari titik (untuk titik yang kebetulan di dalam benda). */
function navSnap(w, x, y) {
  const g = navGrid(w), ci = clamp(Math.floor(x / g.C), 0, g.cols - 1), cj = clamp(Math.floor(y / g.C), 0, g.rows - 1);
  if (g.free[cj * g.cols + ci] && !blocked(w, x, y)) return [x, y];
  for (let r = 1; r < 30; r++) for (let dj = -r; dj <= r; dj++) for (let di = -r; di <= r; di++) {
    if (Math.max(Math.abs(di), Math.abs(dj)) !== r) continue; const i = ci + di, j = cj + dj;
    if (i >= 0 && j >= 0 && i < g.cols && j < g.rows && g.free[j * g.cols + i]) return [i * g.C + g.C / 2, j * g.C + g.C / 2];
  }
  return [x, y];
}
// [rev] hasil sama dengan blocked() per titik, tapi hanya benda di sekitar garis yang dicek (dulu semua benda zona × tiap 3 px = puluhan ribu cek per rute)
const losFree = (w, a, b) => { const d = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.ceil(d / 3); if (n < 2) return true;
  const x0 = Math.min(a[0], b[0]), y0 = Math.min(a[1], b[1]), bb = [x0 + FEET[0], y0 + FEET[1], Math.abs(b[0] - a[0]) + FEET[2], Math.abs(b[1] - a[1]) + FEET[3]], loc = w.solids.filter(r => overlap(bb, r));
  if (!loc.length) return true;
  for (let k = 1; k < n; k++) { const t = k / n, f = feetBox(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t); if (loc.some(r => overlap(f, r))) return false; } return true; };
const NAV_DIRS = [[1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1], [1, 1, 1.42], [1, -1, 1.42], [-1, 1, 1.42], [-1, -1, 1.42]]; // [rev] dibuat sekali, bukan per sel
/** Jalur dari a ke b: daftar titik (tanpa a). Kalau tidak ketemu, garis lurus. */
function navPath(w, a, b) {
  const g = navGrid(w), C = g.C, idx = (i, j) => j * g.cols + i;
  const s = navSnap(w, a[0], a[1]), e = navSnap(w, b[0], b[1]);
  const si = Math.floor(s[0] / C), sj = Math.floor(s[1] / C), ei = Math.floor(e[0] / C), ej = Math.floor(e[1] / C);
  const N = g.cols * g.rows, gs = new Float32Array(N).fill(1e9), came = new Int32Array(N).fill(-1), closed = new Uint8Array(N), open = [];
  // [rev] antrian prioritas binary heap (dulu: cari minimum linear + splice = O(n²), lonjakan 10+ ms saat banyak NPC pindah)
  const push = (f, n) => { open.push([f, n]); let i = open.length - 1; while (i) { const p = (i - 1) >> 1; if (open[p][0] <= open[i][0]) break; const t = open[p]; open[p] = open[i]; open[i] = t; i = p; } };
  const pop = () => { const top = open[0], last = open.pop(); if (open.length) { open[0] = last; let i = 0; for (;;) { const l = 2 * i + 1, r = l + 1; let m = i; if (l < open.length && open[l][0] < open[m][0]) m = l; if (r < open.length && open[r][0] < open[m][0]) m = r; if (m === i) break; const t = open[m]; open[m] = open[i]; open[i] = t; i = m; } } return top; };
  push(0, idx(si, sj)); gs[idx(si, sj)] = 0; let found = false, it = 0;
  while (open.length && it++ < 20000) {
    const [, cur] = pop(); if (closed[cur]) continue; closed[cur] = 1;
    const ci = cur % g.cols, cj = (cur / g.cols) | 0; if (ci === ei && cj === ej) { found = true; break; }
    for (const [di, dj, c] of NAV_DIRS) {
      const ni = ci + di, nj = cj + dj; if (ni < 0 || nj < 0 || ni >= g.cols || nj >= g.rows) continue; const n = idx(ni, nj);
      if (!g.free[n] || closed[n]) continue; if (di && dj && (!g.free[idx(ci + di, cj)] || !g.free[idx(ci, cj + dj)])) continue;
      const ng = gs[cur] + c; if (ng < gs[n]) { gs[n] = ng; came[n] = cur; const hx = ni - ei, hy = nj - ej; push(ng + Math.sqrt(hx * hx + hy * hy), n); }
    }
  }
  if (!found) return [e, b].filter((p, k) => k === 0 || p !== e);
  const cells = []; for (let c = idx(ei, ej); c !== -1 && c !== idx(si, sj); c = came[c]) cells.push([(c % g.cols) * C + C / 2, ((c / g.cols) | 0) * C + C / 2]);
  cells.reverse(); const pts = [...cells, b];
  const out = []; let from = a; for (let k = 0; k < pts.length; k++) { const nx = pts[k + 1]; if (nx && losFree(w, from, nx)) continue; out.push(pts[k]); from = pts[k]; }
  return out.length ? out : [b];
}

// ---- Rute antar dunia ----
const worldId = w => w.type === 'zone' ? 'z:' + w.id : 'r:' + w.key;
function zoneChain(a, b) { if (a === b) return [a]; if (a === 'tanjung' || b === 'tanjung') return null; if (a === 'alun' || b === 'alun') return [a, b]; return [a, 'alun', b]; }
function gatePt(z, to) { const w = getZone(z), e = w.exits.find(e => e.to === to); if (!e) return null;
  return e.dir === 'L' ? [5, e.y] : e.dir === 'R' ? [w.w - 5, e.y] : e.dir === 'U' ? [e.x, 10] : [e.x, w.h - 4]; }
const roomDoorPt = rk => { const w = getRoom(rk); return [w.nx + 18, w.fh - 8]; };
/** Titik tinggal NPC di sebuah tempat (dunia + koordinat + arah). */
function spotOf(id, p) {
  const I = placeInfo(p); if (!I) return null;
  if (I.room) {
    const w = getRoom(I.room), fix = (NPC_ROOMSPOT[p] || {})[id];
    if (fix) { const s = navSnap(w, fix[0], fix[1]); return { wid: 'r:' + w.key, pt: s, dir: fix[2] }; }
    if (p === 'klinik') { const q = k3StaffSpot(staffRoleOf(id), clinicPos()); return { wid: 'r:' + w.key, pt: [q.pt[0], q.pt[1]], dir: q.dir, fixed: true }; } /* [3b-3] */
    const g = navGrid(w), r = hashN(id + p), r2 = hashN(p + id);
    const F = w.fh - w.floorTop, x = 30 + r * (w.w - 60), y = w.floorTop + F * 0.5 + r2 * Math.max(8, F * 0.5 - 36); // pengunjung: setengah depan ruangan (bukan di balik etalase)
    return { wid: 'r:' + w.key, pt: navSnap(w, x, y), dir: 'down' };
  }
  const w = getZone(I.zone), r = I.r || 0, a = hashN(id + p) * Math.PI * 2, d = hashN(p + id) * r;
  return { wid: 'z:' + I.zone, pt: navSnap(w, I.pt[0] + Math.cos(a) * d, I.pt[1] + Math.sin(a) * d * 0.6), dir: 'down', wander: I.wander };
}
/** Titik "rumah" di luar ruangan: pintu bangunan atau tepi peta. */
function homeExit(id) {
  const h = NPC_HOME[id] || NPC_EDGE_KAMPUNG;
  if (h.door) { const d = doorOf(h.door); return { zone: d.zone, pt: [d.x, d.y] }; }
  if (h.edge) return { zone: h.edge[0], pt: [h.edge[1], h.edge[2]] };
  if (h.room) { const d = doorOf(h.room); return { zone: d.zone, pt: [d.x, d.y], room: d.room }; }
  return null;
}
/** Langkah rute dari tempat a ke b: [{wid, from, to, fin}] (from/to = titik masuk/keluar di dunia itu; fin = titik akhir). */
function npcRoute(id, a, b) {
  const A = a ? placeInfo(a) : null, B = b ? placeInfo(b) : null, HA = homeExit(id), steps = [];
  const sa = a ? spotOf(id, a) : null, sb = b ? spotOf(id, b) : null;
  const zA = A ? A.zone : HA && HA.zone, zB = B ? B.zone : HA && HA.zone; if (!zA || !zB) return [];
  // keluar dari ruangan asal
  let startPt;
  if (A && A.room) { if (B && B.room === A.room) return [{ wid: sa.wid, from: sa.pt, to: sb.pt, fin: true }];
    steps.push({ wid: sa.wid, from: sa.pt, to: roomDoorPt(A.room) }); startPt = [A.door.x, A.door.y]; }
  else if (A) startPt = sa.pt; else startPt = HA.pt;
  const chain = zoneChain(zA, zB); if (!chain) return steps;
  chain.forEach((z, k) => {
    const from = k === 0 ? startPt : gatePt(z, chain[k - 1]);
    let to, fin = false;
    if (k < chain.length - 1) to = gatePt(z, chain[k + 1]);
    else if (B && B.room) to = [B.door.x, B.door.y]; else if (B) { to = sb.pt; fin = true; } else to = HA.pt;
    steps.push({ wid: 'z:' + z, from, to, fin, home: !B && k === chain.length - 1 });
  });
  if (B && B.room) steps.push({ wid: sb.wid, from: roomDoorPt(B.room), to: sb.pt, fin: true });
  return steps;
}
/** Rute + waktu: tiap langkah dapat dur (menit game) dari panjang jalan (garis lurus ×1,25), cum = menit sejak berangkat. */
const routeCache = {};
function npcRouteT(id, a, b) {
  const k = id + '|' + a + '|' + b + '|' + S.clinicStage; if (routeCache[k]) return routeCache[k];
  const R = npcRoute(id, a, b), pxMin = CFG.NPC.TRANSIT / CFG.MIN_PER_SEC; let t = 0;
  R.forEach(r => { r.t0 = t; r.dur = Math.max(CFG.NPC.STEP_MIN, Math.hypot(r.to[0] - r.from[0], r.to[1] - r.from[1]) * 1.25 / pxMin); t += r.dur; });
  R.total = t; return routeCache[k] = R;
}
/** Lama perjalanan NPC dari tempat sebelumnya ke tempat sekarang (menit game). */
const travelOf = (id, n) => n.prev === n.cur ? 0 : npcRouteT(id, n.prev, n.cur).total || 0;

// ---- Aktor di dunia aktif ----
const npcAct = { wid: null, list: {} };
const npcCount = () => Object.keys(npcAct.list).length;
/** Yang seharusnya terjadi pada NPC id di dunia wid: null, {stay}, atau {walk from→to, frac}. */
function npcWant(id, wid) {
  const n = npcNow(id), dt = S.time - n.t0;
  if ((n.cur === 'berobat' || n.prev === 'berobat') && /^r:klinik/.test(wid)) return null; // [3a-2] di dalam klinik diwakili sosok pasien
  if (n.prev === n.cur || dt >= travelOf(id, n)) { const s = n.cur ? spotOf(id, n.cur) : null; return s && s.wid === wid ? { stay: s } : null; }
  const R = npcRouteT(id, n.prev, n.cur); if (!R.length) return null;
  let k = 0; while (k < R.length - 1 && dt >= R[k].t0 + R[k].dur) k++; const st = R[k];
  // langkah yang sudah lewat di dunia ini: NPC sudah sampai titik keluarnya (kalau titik akhir, tinggal di situ)
  const mine = R.findIndex(r => r.wid === wid); if (mine < 0) return null;
  if (mine < k) { const r = R[mine]; return r.fin ? { stay: { wid, pt: r.to, dir: 'down' } } : null; }
  if (mine > k) return null;
  return { walk: st, frac: (dt - st.t0) / st.dur, due: n.t0 + st.t0 + st.dur };
}
function newActor(id, x, y) { return { id, x, y, dir: 'down', path: [], anim: 0, walk: false, leave: false, tgt: null }; }
function setTarget(a, w, pt, leave) {
  if (a.tgt && Math.abs(a.tgt[0] - pt[0]) < 1 && Math.abs(a.tgt[1] - pt[1]) < 1 && a.leave === !!leave) return;
  a.tgt = pt.slice(); a.leave = !!leave; a.path = navPath(w, [a.x, a.y], pt);
}
/** Titik keluar terdekat di dunia ini (pintu ruangan / gerbang zona) untuk NPC yang harus pergi. */
function nearestExit(w, a) {
  if (w.type === 'room') return [w.nx + 18, w.fh - 8];
  const pts = w.exits.map(e => gatePt(w.id, e.to)).filter(Boolean).concat((w.doors || []).map(d => [d.x, d.y]));
  return pts.sort((p, q) => Math.hypot(p[0] - a.x, p[1] - a.y) - Math.hypot(q[0] - a.x, q[1] - a.y))[0];
}
/** Sinkronkan aktor dengan jadwal. fresh = pemain baru masuk dunia ini (boleh langsung ditaruh di tempatnya). */
function npcSync(fresh) {
  const w = game.world, wid = worldId(w);
  if (npcAct.wid !== wid) { npcAct.wid = wid; npcAct.list = {}; fresh = true; }
  for (const id of NPC_ROSTER) {
    const want = npcWant(id, wid); let a = npcAct.list[id];
    if (a && a.leave && a.path.length && Math.hypot(a.tgt[0] - a.x, a.tgt[1] - a.y) < 48) continue; // hampir di pintu/gerbang: selesaikan masuk, jangan berbalik
    if (!want) { if (a && !a.leave) setTarget(a, w, nearestExit(w, a), true); continue; } // pergi lewat pintu/gerbang, tidak hilang di tempat
    if (want.stay) {
      const s = want.stay; if (a) a.due = 0;
      if (!a) { if (fresh) { a = npcAct.list[id] = newActor(id, s.pt[0], s.pt[1]); a.dir = s.dir; a.home = s; continue; }
        const R = npcRoute(id, npcNow(id).prev, npcNow(id).cur), st = R.find(r => r.wid === wid); const e = st ? st.from : nearestExit(w, { x: s.pt[0], y: s.pt[1] });
        a = npcAct.list[id] = newActor(id, e[0], e[1]); }
      a.home = s;
      if (s.wander) { const R = s.wander; if (!a.path.length && !inRect(a.x, a.y, [R[0] - 8, R[1] - 8, R[2] + 16, R[3] + 16]) && !a.wander) setTarget(a, w, s.pt, false); } // keliling: biarkan updateNpcs memilih titik
      else setTarget(a, w, s.pt, false);
      continue;
    }
    const st = want.walk;
    if (!a) {
      let p = st.from; if (fresh) { const path = [st.from, ...navPath(w, st.from, st.to)]; p = alongPath(path, want.frac); }
      a = npcAct.list[id] = newActor(id, p[0], p[1]);
    }
    a.home = st.fin ? { pt: st.to, dir: 'down', wid } : null; a.due = want.due;
    setTarget(a, w, st.to, !st.fin);
  }
}
function alongPath(pts, f) {
  let L = 0; for (let k = 1; k < pts.length; k++) L += Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]);
  let d = L * clamp(f, 0, 1); for (let k = 1; k < pts.length; k++) { const s = Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]); if (d <= s) { const t = s ? d / s : 0; return [pts[k - 1][0] + (pts[k][0] - pts[k - 1][0]) * t, pts[k - 1][1] + (pts[k][1] - pts[k - 1][1]) * t]; } d -= s; }
  return pts[pts.length - 1];
}
/** Langkah per frame: sinkron jadwal (4×/detik) + gerak aktor. Dipanggil dari updatePlay. */
/** Pengaman: error di sistem NPC tidak boleh membekukan game (pemain tetap bisa jalan); dicatat sekali di konsol. */
let npcErr = null;
function updateNpcs(dt) { try { updateNpcs0(dt); } catch (e) { if (!npcErr) { npcErr = e; console.error('[3a] NPC error:', e); } } }
function updateNpcs0(dt) {
  const w = game.world; if (!w) return;
  const wid = worldId(w), fresh = npcAct.wid !== wid;
  npcAct.acc = (npcAct.acc || 0) + dt; if (fresh || npcAct.acc > 0.25) { npcAct.acc = 0; npcSync(fresh); }
  if (!timeRunning()) return;
  const sp = CFG.NPC.WALK * Math.max(1, CFG.SPEEDS[S.speed]) * dt;
  for (const id in npcAct.list) {
    const a = npcAct.list[id];
    if (!a.path.length) {
      a.walk = false;
      if (a.leave && a.tgt) { delete npcAct.list[id]; continue; } // sampai di pintu/gerbang → masuk
      if (a.home) { a.dir = a.home.dir || a.dir; if (a.home.wander && S.time >= (a.next || 0)) { const W = a.home.wander, [lo, hi] = CFG.NPC.WANDER; a.next = S.time + lo + Math.random() * (hi - lo);
        a.wander = navSnap(w, W[0] + Math.random() * W[2], W[1] + Math.random() * W[3]); a.path = navPath(w, [a.x, a.y], a.wander); a.tgt = a.wander.slice(); } }
      continue;
    }
    let spd = sp;
    if (a.due > S.time) { let rem = 0, px = a.x, py = a.y; for (const p of a.path) { rem += Math.hypot(p[0] - px, p[1] - py); px = p[0]; py = p[1]; }
      const secs = (a.due - S.time) / (CFG.MIN_PER_SEC * CFG.SPEEDS[S.speed]); spd = clamp(rem / Math.max(secs, 0.1) * dt, sp, sp * CFG.NPC.HURRY); }
    const [tx, ty] = a.path[0], dx = tx - a.x, dy = ty - a.y, d = Math.hypot(dx, dy);
    if (d > 0.01) a.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'R' : 'L') : (dy > 0 ? 'down' : 'up');
    a.walk = true; a.anim += dt;
    if (d <= spd) { a.x = tx; a.y = ty; a.path.shift(); } else { a.x += dx / d * spd; a.y += dy / d * spd; }
  }
}
const actImgCache = {};
/** Sprite aktor (arah + langkah). */
function actorImg(a) {
  const step = a.walk ? [1, 0, 2, 0][Math.floor(a.anim * CFG.ANIM_FPS) % 4] : 0, d = a.dir === 'L' || a.dir === 'R' ? 'side' : a.dir;
  const k = a.id + a.dir + step + nikahWearKey(); if (actImgCache[k]) return actImgCache[k];
  let img = char3({ ...nikahSpec(a.id), dir: d, step }); /* [3a-5] baju pengantin */ if (a.dir === SIDE_FLIP) img = flipImg(img); return actImgCache[k] = img;
}
/** Entitas gambar untuk drawWorld: sprite NPC + penanda kepala. */
function npcDrawList() {
  if (!game.world || npcAct.wid !== worldId(game.world)) return []; // dunia baru belum disinkronkan
  const out = []; for (const id in npcAct.list) { const a = npcAct.list[id]; out.push({ npc: a, z: a.y + 1 }); } return out;
}
/** Penanda di atas kepala (dunia, 1×). Digambar setelah semua entitas supaya tidak tertutup. */
function drawNpcMarks(c, ox, oy) {
  if (npcAct.wid !== worldId(game.world)) return;
  for (const id in npcAct.list) {
    const a = npcAct.list[id]; if (a.leave) continue; const m = npcMark(id); if (!m) continue;
    const bob = Math.round(Math.sin(game.t * 3 + a.x * 0.1) * 1.2);
    c.drawImage(MARK[m], Math.round(ox + a.x) - 5, Math.round(oy + a.y) - 44 + bob);
  }
}
/** Penanda: … = belum ngobrol hari ini (adegan Trust ! dan event ♥ menyusul di 3a-2/3a-4). */
function npcMark(id) { const nm = nikahMark(id); if (nm) return nm === 'none' ? null : nm; /* [3a-5] */ return relMark(id) /* [3a-4] ♥ event romance */ || trustMark(id) || (talkedToday(id) ? null : 'talk'); } // [3a-2] ! = adegan Trust

// ---- Ngobrol ----
/** Aktor terdekat dalam jarak ngobrol. */
function npcNear() {
  let best = null, bd = CFG.NPC.TALK_R;
  for (const id in npcAct.list) { const a = npcAct.list[id]; if (a.leave) continue; let d = Math.hypot(a.x - S.px, (a.y - S.py) * 1.3);
    if (d >= bd && !a.walk && S.dir === 'U' && Math.abs(a.x - S.px) < 14 && S.py > a.y && S.py - a.y < CFG.NPC.COUNTER_R) d = bd - 0.01; // lintas meja
    if (d < bd) { bd = d; best = a; } }
  return best;
}
/** Aksi ngobrol untuk currentAction. */
function npcAction() { try { return npcAction0(); } catch (e) { return null; } }
function npcAction0() {
  const a = npcNear(); if (!a) return null;
  const g = canGift(a.id); // [3a-4] G = beri hadiah
  return { label: 'Ngobrol · ' + npcName(a.id) + (g ? '  ·  G Beri Hadiah' : ''), fn: () => talkNpc(a.id), gift: g ? () => openGift(a.id) : null };
}
const BLOK = { pagi: [6, 11], siang: [11, 15], sore: [15, 18], malam: [18, 24] };
const RANK = { event: 9, renggang: 8, nikah: 7, pacaran: 6, h: 5, stres: 4, rain: 3, musim: 2, at: 1 };
/** Kunci tempat dialog (@Tempat) untuk posisi NPC sekarang. */
function npcAtKey(id) { const p = placeInfo(npcNow(id).cur); return p ? p.at : null; }
/** Cocokkan kondisi baris dialog (07a: T/@tempat/musim/cuaca/blok/stres; 07c: staf/buka/tutup). Kondisi event/romance/pasien belum aktif di 3a-1. */
function lineOk(id, c) {
  if (c.x || c.event || !relLineOk(id, c) /* [3a-5] nikah lewat relLineOk */ /* [3a-4] H/pacaran/renggang */ || c.jenguk || c.kontrol || c.tunggu || c.Bab4 || c.Epilog || c.jaga || c.pasar) return false;
  const t = trustOf(id), tr = NPC_TIER.filter(r => t >= r[0]).pop()[0];
  if (c.t != null && (c.only ? tr !== c.t : t < c.t)) return false;
  if (c.at && c.at !== npcAtKey(id)) return false;
  if (c.musim && season().key !== c.musim) return false;
  if (c.rain && !isRainy()) return false;
  if (c.stres != null && !(S.stress > c.stres)) return false;
  if (c.blok) { const [a, b] = BLOK[c.blok], h = S.time / 60; if (h < a || h >= b) return false; }
  if (c.staf != null && (!!staffRoleOf(id)) !== !!c.staf) return false;
  if (c.buka && !(inClinic() && S.clinic.open)) return false;
  if (c.tutup && !(inClinic() && !S.clinic.open)) return false;
  if (c.patroli || c.keliling || c.proyek) { const at = npcAtKey(id); if (c.patroli && at !== 'patroli') return false; if (c.proyek && at !== 'proyek') return false; }
  return true;
}
const lineRank = c => Math.max(0, ...Object.keys(c).map(k => RANK[k] || 0));
/** Pilih satu baris (GDD §16): cocok kondisi → buang yang dipakai 7 hari terakhir → yang paling spesifik → acak. */
function pickLine(id) {
  const L = NPC_LINES[id] || [], used = npcSt().used[id] || {};
  const ok = L.map((l, i) => ({ l, i })).filter(o => lineOk(id, o.l.c));
  let pool = ok.filter(o => !(used[o.i] != null && S.day - used[o.i] < CFG.NPC.LINE_DAYS)); if (!pool.length) pool = ok;
  if (!pool.length) return null;
  const top = Math.max(...pool.map(o => lineRank(o.l.c))); pool = pool.filter(o => lineRank(o.l.c) === top);
  const o = pool[Math.floor(Math.random() * pool.length)]; (npcSt().used[id] = used)[o.i] = S.day; return o.l;
}
const fillVars = s => s.replace(/\{nama\}/g, S.name).replace(/\{hari\}/g, dayName()).replace(/\{klinik\}/g, clinicName());
/** Tambah Trust (0–100) + kabar naik tingkat. */
function addTrust(id, n) {
  const before = trustOf(id); npcSt(); S.trust[id] = clamp(before + nikahTrust(n) /* [3a-5] Raka ×1,25 */, 0, 100); const after = S.trust[id];
  if (tierOf(after)[0] > tierOf(before)[0]) { toast(npcName(id) + ' sekarang ' + tierName(after) + ' denganmu', 'good'); sfx('rep_up'); }
  return after - before;
}
/** Ngobrol dengan NPC: hadap pemain, satu baris dialog harian, Trust +3 sekali sehari. Staf klinik ditambah status kerja (2e). */
function talkNpc(id) {
  const a = npcAct.list[id]; if (a) { a.dir = Math.abs(S.px - a.x) > Math.abs(S.py - a.y) ? (S.px > a.x ? 'R' : 'L') : (S.py > a.y ? 'down' : 'up'); a.path = []; a.tgt = null; a.next = S.time + 10; }
  if (relTalkFirst(id)) return; // [3a-4] event romance (janji di tempat) atau ajakan ♥
  jrEv('talk', id); /* [3b-1] #12 */
  if (playScene(id)) return; // [3a-2] adegan Trust menggantikan kalimat harian
  const St = npcSt(), first = !St.met[id], gain = !talkedToday(id);
  St.met[id] = true; St.talked[id] = S.day;
  const l = pickLine(id), pages = [];
  if (l && l.a) pages.push({ act: fillVars(l.a) });
  if (l && l.s) pages.push(fillVars(l.s));
  if (!pages.length) pages.push(first ? 'Oh, dokter yang baru itu, ya? Salam kenal.' : 'Eh, Dok. Lagi jalan-jalan?');
  pages.push(...sikapPages(id)); // [3a-2] sikap per Trust (gosip Bu Ratna, nasihat Pak Slamet)
  const role = staffRoleOf(id); if (role && inClinic()) { const st = staffOf(role), T = CFG.STAFF; pages.push({ act: STAFF_ROLES[role].name + ' · Skill Lv' + st.skill + ' · Energi Lv' + st.en + ' · tenaga ' + Math.round(st.energy) + '/' + T.ENERGY_MAX + (st.train ? ' · pelatihan ' + dayLabel(st.train.day) : '') }); }
  const after = () => { let d = 0; if (gain) d = addTrust(id, CFG.NPC.TALK_TRUST); const hd = relTalk(id); /* [3a-4] Hubungan +2 */ if (d > 0 || hd > 0) toast((d > 0 ? 'Trust ' + npcName(id) + ' +' + d : npcName(id)) + (hd > 0 ? ' · ♥ +' + hd : ''), 'good'); if (first) toast(npcName(id) + ' tercatat di Buku Kenalan (K)'); };
  dialog(pages, { npc: id, onDone: after });
}

// ---- Buku Kenalan (K / menu Esc) ----
/** Daftar per tab: Warga (termasuk kandidat yang bukan lawan jenis pemain), Romance, Lainnya (staf & tokoh luar kota). */
function bookTabs() {
  const rom = romanceIds(), here = id => !(NPC_FROM_STAGE[id] && S.clinicStage < NPC_FROM_STAGE[id] && !staffRoleOf(id));
  return [['Warga', NPC_ROSTER.filter(id => castBy(id).grp === 'Warga' || (castBy(id).grp === 'Romance' && !rom.includes(id)))],
    ['Romance', rom], ['Lainnya', NPC_ROSTER.filter(id => (castBy(id).grp === 'Staf' || castBy(id).grp === 'Luar kota') && here(id))]];
}
function hBust(id, X, Y, s, expr, shadow) { hc.imageSmoothingEnabled = false; hc.drawImage(shadow ? npcShadow(id) : npcBust(id, expr), Math.round(X * HI), Math.round(Y * HI), 24 * s * HI, 22 * s * HI); }
/** Chip tingkat Trust (warna tingkat, teks putih tebal). Mengembalikan lebar. */
function tierChip(t, X, Y) { const [, n, col] = tierOf(t), w = hW(n, true) + 8; hR(X, Y, w, 11, col); hR(X, Y + 10, w, 1, 'rgba(0,0,0,.25)'); HT(n, X + 4, Y + 2, '#ffffff', { bold: true }); return w; }
function openBook(sel) {
  const tabs = bookTabs(); let tab = Math.max(0, tabs.findIndex(t => t[1].includes(sel)));
  const ov = { kind: 'panel', t: 0, sel: sel || tabs[tab][1].find(npcMet) || tabs[tab][1][0] };
  const pickTab = k => { tab = (k + tabs.length) % tabs.length; ov.sel = tabs[tab][1].find(npcMet) || tabs[tab][1][0]; sfx('ui_tick'); };
  ov.update = function () {
    this.t++; if ((hit('esc') || hit('book')) && this.t > 1) return closeOverlay();
    if (hit('tab')) pickTab(tab + 1);
    const ids = tabs[tab][1], i = ids.indexOf(this.sel);
    if (hit('left')) this.sel = ids[(i + ids.length - 1) % ids.length]; if (hit('right')) this.sel = ids[(i + 1) % ids.length];
    if (hit('up')) this.sel = ids[Math.max(0, i - 7)]; if (hit('down')) this.sel = ids[Math.min(ids.length - 1, i + 7)];
    if (input.click) { const h = topHit(input.click, /^bk/); if (h) h.fn(); }
  };
  ov.drawHD = function () { hDim(this, .45); dropIn(this, 16, 6, 448, 258, () => this.body()); };
  ov.body = function () {
    const X0 = 16, Y0 = 6, W = 448, H = 258, hv = hoverId();
    hBox(X0, Y0, W, H, 'paper', { ornate: true });
    HT('Buku Kenalan', 240, Y0 + 9, MGC.ink, { k: 4, sh: '#e8b878', align: 'c' }); hDivider(X0 + 14, Y0 + 34, W - 28);
    // tab
    tabs.forEach(([n], k) => { const bx = X0 + 14 + k * 68, on = k === tab; hBtn(bx, Y0 + 40, 64, 16, n, { kind: on ? 'gold' : hv === 'bkt' + k ? 'paper' : 'dark', bold: on }); clickable(bx, Y0 + 40, 64, 16, () => pickTab(k), 'bkt' + k); });
    const ids = tabs[tab][1];
    ids.forEach((id, i) => {
      const tx = X0 + 14 + (i % 7) * 29, ty = Y0 + 62 + Math.floor(i / 7) * 32, k = npcMet(id), on = ov.sel === id;
      hInset(tx, ty, 27, 29, on ? '#f6e2a8' : k ? '#ead2a4' : '#b89a78'); hBust(id, tx + 1.5, ty + 2, 1, null, !k);
      if (k) { hR(tx + 1, ty + 25, 25, 3, tierOf(trustOf(id))[2]); if (talkedToday(id)) HT('✓', tx + 20, ty + 1, '#2e7a34', { bold: true }); }
      else HT('?', tx + 11, ty + 9, '#f2e2c0', { bold: true });
      if (on) hGlow(tx, ty, 27, 29); clickable(tx, ty, 27, 29, () => { ov.sel = id; }, 'bk' + id);
    });
    const met = NPC_ROSTER.filter(npcMet).length;
    HT('Kenal ' + met + ' orang · ✓ sudah ngobrol hari ini', X0 + 14, Y0 + 224, MGC.ink2);
    HT('Tab: ganti halaman · K/Esc: tutup', X0 + 14, Y0 + 236, MGC.ink2);
    // kartu detail
    const id = ov.sel, c = castBy(id), cx = X0 + 222, cy = Y0 + 40, cw = 212, t = trustOf(id), known = npcMet(id);
    hBox(cx, cy, cw, 184, 'paper', { thin: true, shadow: false });
    hInset(cx + 7, cy + 7, 52, 48, '#ead2a4'); hBust(id, cx + 9, cy + 10, 2, known ? 'happy' : null, !known);
    if (!known) { HT('Belum kenal', cx + 66, cy + 9, MGC.ink, { bold: true }); hWrap('Ajak ngobrol dulu supaya namanya tercatat di sini.', cw - 74).forEach((l, k) => HT(l, cx + 66, cy + 22 + k * 10, MGC.ink2)); }
    else {
      HT(fitText(c.name, cw - 74, true), cx + 66, cy + 8, MGC.ink, { bold: true }); HT(fitText(c.role, cw - 74), cx + 66, cy + 19, MGC.ink2);
      const chw = tierChip(t, cx + 66, cy + 31); HT('Trust ' + t, cx + 66 + chw + 6, cy + 33, MGC.ink, { bold: true });
      const bx = cx + 66, by = cy + 46, bw = cw - 74; hBar(bx, by, bw, 6, t / 100, tierOf(t)[2]);
      [20, 40, 60, 80].forEach(v => hR(bx + bw * v / 100, by - 1, 1, 8, 'rgba(60,30,10,.55)'));
      const rom = isRomance(id); if (rom) relBar(id, bx, cy + 57, bw); // [3a-4] ♥ Hubungan + ambang E1–E5
      let y2 = cy + (rom ? 72 : 62); hDivider(cx + 7, y2, cw - 14); y2 += 7;
      hWrap(NPC_BLURB[id] || c.role, cw - 14).slice(0, 3).forEach(l => { HT(l, cx + 7, y2, '#6a4a26'); y2 += 10; }); y2 += 4;
      const row = (k, v, col, bold) => { HT(k, cx + 7, y2, MGC.ink2); HT(fitText(v, cw - 68, bold), cx + 60, y2, col || MGC.ink, { bold }); y2 += 11; };
      row('Sekarang', npcWhereText(id), MGC.ink, true);
      row('Hari ini', talkedToday(id) ? '✓ sudah ngobrol' : 'belum ngobrol', talkedToday(id) ? '#2e7a34' : '#a8700a', true);
      if (rom) { const [st, sc] = relStatus(id); row('Status', st, sc, true); } // [3a-4]
      const tz = tasteRows(id); row('Suka', tz[0], tz[0] === '?' ? null : '#2e7a34', tz[0] !== '?'); row('Tdk suka', tz[1], tz[1] === '?' ? null : MGC.red, tz[1] !== '?'); // [3a-4]
      if (tz[2]) HT(fitText('? terungkap lewat hadiah.', cw - 14), cx + 7, y2 + 2, '#8a6a4a');
    }
    hBtn(X0 + W - 88, Y0 + 229, 74, 19, 'Tutup', { kind: hv === 'bkx' ? 'gold' : null, on: true, bold: true }); clickable(X0 + W - 88, Y0 + 229, 74, 19, () => closeOverlay(), 'bkx');
  };
  openOverlay(ov);
}
