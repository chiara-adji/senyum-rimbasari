/* =====================================================================
   SENYUM RIMBASARI — Fase 1 (Skeleton)
   Struktur: CONFIG → DATA → ENGINE → SYSTEMS → SCENES → UI → BOOT
   Gambar memakai kode visual v3 (design/v3/src, ACC 2026-11-11) yang
   di-inline oleh tools/build-game.cjs. Satu objek state `S` untuk save.
   ===================================================================== */
(() => {
'use strict';
/** Teks berjarak huruf dari mini.js (nama `S` dipakai untuk state). */
const ST = window.S;

/* ============================== CONFIG ============================== */
/** Semua angka gameplay Fase 1 (GDD §2, §3, §8, §16). */
const CFG = {
  W: 480, H: 270,
  MIN_PER_SEC: 2,            // 1 detik nyata = 2 menit game
  DAY_START: 6 * 60,         // 06:00
  DAY_END: 24 * 60,          // lewat 24:00 = pingsan
  SEASON_DAYS: 60, SEASONS_PER_YEAR: 2,
  SPEEDS: [0.5, 1, 2, 4], SPEED_DEFAULT: 1,
  START_MONEY: 15000000, ENERGY_MAX: 100, START_REP: 1,
  FAINT_MONEY: 0.9, FAINT_ENERGY: 0.5,
  SLEEP_STRESS: -10,
  WALK_SPEED: 74,            // piksel/detik
  ANIM_FPS: 8,
  NAME_MAX: 12,
  ZONE_TRANS_MIN: 1.2, ZONE_TRANS_AUTO: 3.2, FADE: 0.32,
  SAVE_KEY: 'senyum-rimbasari-save-v1', SAVE_VER: 1,
  HT_CACHE_MAX: 600,         // [rev] batas gambar teks HD tersimpan (teknis, bukan angka gameplay)
  /** Efek rumah per level (GDD §8). recover = pulih × energi maks. */
  HOME: {
    1: { recover: 1.0, maxBonus: 0, stress: 0 },
    2: { recover: 1.1, maxBonus: 0, stress: 0 },
    3: { recover: 1.0, maxBonus: 0.2, stress: 0 },
    4: { recover: 1.0, maxBonus: 0.3, stress: -10 },
  },
  /** [kos] Lv 1 = ngekos di Kos Melati, kamar 5 (ACC user 2026-11-13). Sewa dipotong tiap pagi; uang kurang = utang ke Pak Udin (tidak diusir). */
  KOS: { RENT_DAY: 50000 },
  /** [2f] Toko alkes & perjalanan ke Tanjung Arum (GDD §11.1, ACC user 2026-11-13). Jam dalam desimal. */
  TRIP: { TICKET: 100000, LEG_H: 2, OUT: [7, 13], BACK: [11, 17], WARN_H: 16.5, ANIM: 3.2,
    METRA_TICKET: 250000, METRA_CHALLENGES: 18, T2_CHALLENGES: 8 },
  BAHARI: { OPEN_H: 8, CLOSE_H: 17, FRIEND_DISC: [[60, 0.10], [40, 0.05]] }, // buka setiap hari termasuk Minggu; harga teman aktif setelah sistem trust (3a)
  POST: { FEE: 150000, MAX_PACKS: 3, DAYS: 2, CUTOFF_H: 16 },               // pesan antar Kantor Pos, tiba pagi DAYS hari kemudian (+1 kalau lewat CUTOFF)
  /** [2h] Masak & makan (ACC user 2026-11-13, GDD §3.1). Bahan dibeli di Warung Bu Ratna, disimpan di Tas/Kulkas, dimasak di dapur kos/rumah.
   *  Botol (minyak, mayo) disimpan sebagai takaran: 1 botol = BOTTLE takaran = 1 isi tas/kulkas. Tidak ada basi. */
  FOOD: { BAG_MAX: 12, FRIDGE_MAX: 40, BEKAL_MAX: 3, MEALS_DAY: 3, MILK_DAY: 2, MILK_ENERGY: 5, BOTTLE: 5, BUY_MAX: 10, OPEN_H: 6, CLOSE_H: 21,
    ITEMS: { telur: ['Telur', 3000, 'butir'], buah: ['Buah', 8000, 'buah'], sayur: ['Sayur', 5000, 'ikat'], susu: ['Susu', 8000, 'kotak'], ikan: ['Ikan', 18000, 'ekor'],
      daging: ['Daging', 30000, 'potong'], ayam: ['Ayam', 20000, 'potong'], minyak: ['Minyak', 15000, 'botol'], roti: ['Roti', 6000, 'roti bundar'], mayo: ['Mayo', 12000, 'botol'] },
    BOTTLES: ['minyak', 'mayo'],
    /** [nama, bahan {kunci: jumlah}, menit, energi] */
    RECIPES: { saladSayur: ['Salad Sayur', { sayur: 1, mayo: 1 }, 10, 10], saladBuah: ['Salad Buah', { buah: 1, mayo: 1 }, 10, 12], telurCeplok: ['Telur Ceplok', { telur: 1, minyak: 1 }, 10, 12],
      ayamGoreng: ['Ayam Goreng', { ayam: 1, minyak: 1 }, 30, 25], ikanGoreng: ['Ikan Goreng', { ikan: 1, minyak: 1 }, 25, 22], burger: ['Burger', { roti: 1, daging: 1, minyak: 1 }, 20, 30] } },
  /** [kos] Lv 2 = Kontrakan rumah ujung kiri Kampung Asri: bayar di muka, diperpanjang otomatis tiap DAYS hari, peringatan WARN hari sebelumnya,
   *  saldo kurang saat jatuh tempo = kembali ke Kos Melati. Syarat klinik tahap ≥ MIN_STAGE (ACC user 2026-11-13). */
  KONTRAK: { RENT: 2000000, DAYS: 30, WARN: 3, MIN_STAGE: 1 },
  /** Klinik dasar (GDD §3, §4; minigame/00–09 untuk energi; angka bertanda [2b] = keputusan user 2026-11-11). */
  CLINIC: {
    CLEAN_ENERGY: 5, CLEAN_MIN: 20,             // [2b] per titik kotor Ruko Tua
    RENOV_COST: 10000000,                        // GDD §4 tahap 1
    OPEN_H: 8, CLOSE_H: 16, CLOSED_WD: 6,        // GDD §2: 08–16, libur Minggu (indeks hari 6)
    QUEUE: { 1: 3, 2: 5, 3: 5, 4: 5 },           // GDD §4: tahap 1 antrian 3, tahap 2 antrian 5
    DAY_PATIENTS: [2, 3, 4, 5, 6], // [rev] opsi C (ACC user 2026-11-15; dulu 5/7/9/11/13): pasien sedikit, sisa hari untuk menjelajah & ngobrol
    SEASON_MUL: { kemarau: 1.0, hujan: 0.9 }, // [2c-rev] rata-rata pasien per hari kerja di ★1–★5 (keputusan user 2026-11-12)
    GAP_SPREAD: [0.5, 1.5], FIRST_ARRIVE: [10, 30], // [2c-rev2] jeda antar-pasien = rata-rata × 0,5–1,5 (dulu eksponensial: bisa kosong berjam-jam); pasien pertama 10–30 menit setelah buka
    OLD_PATIENT_P: 0.2,                          // [2c-rev] peluang pasien baru ternyata pasien lama dengan keluhan baru
    PATIENCE_MIN: 90,                            // [2b]
    PACK_PRICE: 750000, PACK_UNITS: 10, PACK_MAX_BUY: 10, // GDD §4 paket Rp 750rb; [2b] 10 unit; [2f] maks 10 paket sekali beli di Bahari Medika (dulu 5 di warung)
    DIRTY_PER_PATIENT: 3, WIPE_GAIN: 40, WIPE_ENERGY: 5, WIPE_MIN: 30, DIRTY_LIMIT: 40, // [2b]
    REP_START: 0, REP_DONE: 1, REP_LEFT: -3, REP_TURNED: -1, REP_DIRTY_DAY: -2, // [2b] hukuman; [rev] REP_START 0 & REP_DONE 1 (dulu 10 & 2)
    REP_STARS: [50, 160, 330, 560], REP_MAX: 600, // [rev] opsi C (ACC 2026-11-15): poin minimum ★2/★3/★4/★5, poin 0–600 (dulu 0–100, tiap 20 poin = 1★)
    REP_OLD_PER_STAR: 20, REP_OLD_START: 10,     // [rev] hanya untuk mengonversi simpanan lama (skala 0–100)
    STRESS_PER_PATIENT: 5,                       // GDD §3
    SEASON_PRICE: { kemarau: 1.1, hujan: 1.0 },  // GDD §2: Kemarau tarif wajar ×1.1
    TIER_MUL: 1.0,                               // GDD §4.1 alat T1
    WALK: 42, LOW_ENERGY: 20, KID_P: 0.25, OLD_P: 0.15,
    /** Bobot kasus tamu per musim (GDD §2: Kemarau banyak karies, Hujan banyak sakit akut). */
    CASE_W: { kemarau: { konsul: 22, gic: 35, scaling: 25, cabut: 12, resep: 6 }, hujan: { konsul: 26, gic: 25, scaling: 20, cabut: 17, resep: 12 }, kid: { konsul: 20, gic: 30, cabutSusu: 50 } },
    /** Alur periksa (2c; GDD §4.1, §6). Angka bertanda [2c] = usulan yang disetujui user 2026-11-12. */
    EXAM: {
      ASK_MIN: 1,                                // [2c-rev3] 1 menit game per pertanyaan (keputusan user 2026-11-12; dulu 5); semua pertanyaan boleh ditanya (keputusan user 2026-11-12, mengganti GDD §6 'pilih 3')
      CHECK_MIN: 2,                              // [2c] menit game per pemeriksaan satu alat
      CONSENT_BASE: 0.7, AFFORD: 0.1, CONSENT_MIN: 0.05, CONSENT_MAX: 0.97, // [2c] peluang setuju = 70% × pengali tarif ± kemampuan bayar
      TARIFF_STEP: 50000, TARIFF_MAX_R: 3,       // GDD §4.1 langkah Rp 50rb; [2c] batas atas 3× harga wajar
      /** GDD §4.1: batas r (atas), label, pengali jumlah pasien, pengali stres, [2c] pengali peluang setuju. */
      R_BANDS: [
        { max: 0.7, label: 'Murah sekali', pat: 1.8, stress: 1.5, yes: 1.2, col: '#2a7a3a' },
        { max: 0.9, label: 'Murah', pat: 1.3, stress: 1.2, yes: 1.1, col: '#3a8a3a' },
        { max: 1.1, label: 'Wajar', pat: 1.0, stress: 1.0, yes: 1.0, col: '#6a4a26' },
        { max: 1.4, label: 'Mahal', pat: 0.7, stress: 1.0, yes: 0.75, col: '#b06a10' },
        { max: Infinity, label: 'Kemahalan', pat: 0.35, stress: 1.0, yes: 0.4, col: '#b8322a' }],
      STAR_TOL: 0.05,                            // GDD §4.1: tiap ★ di atas 3 menggeser batas +0.05
      REP_DX_OK: 1,                              // [2c] bonus diagnosis tepat (GDD §6 "bonus")
      RETURN_DAYS: [3, 5], REP_WRONG: -3, STRESS_WRONG: 10, // [2c] diagnosis salah → kembali mengeluh 3–5 hari kemudian
      CONTROL_DAYS: 3,                           // [2c] abses: resep dulu, kontrol 3 hari lagi (GDD §6 "Resep dulu → cabut")
      MED_P: 0.3, ALLERGY_P: 0.1,                // [2c] peluang pasien dewasa punya riwayat penyakit / alergi obat
      COMPLIC_P: 0.5, REP_COMPLIC: -2, STRESS_COMPLIC: 10, COMPLIC_MIN: 20, // [2c] risiko kalau riwayat medis terlewat
      REP_REFER: 1,                              // [2c-rev] rujukan yang memang perlu (PSA / riwayat medis berisiko)
      REFER_MED_DAYS: 5,                         // [2c-rev] dirujuk ke dr. Galih → kembali setelah tekanan darah / obat terkontrol
      VISITS_MAX: 400, PEOPLE_MAX: 150,          // [2c-rev] batas rekam medis (kunjungan / pasien)
    },
    /** [2e] Klinik tahap 2 (GDD §4, §5, §6 ③). Angka bertanda [2e] = usulan yang di-ACC user 2026-11-12. */
    UPGRADE: { 2: { cost: 60000000, stars: 2 } },  // GDD §4: Rp 60jt + ★2; [2e] tukang 1 hari seperti renovasi
    XRAY: { MIN: 5, ENERGY: 2,                   // [2e] satu foto = 5 menit game, energi 2, tanpa stok
      PROX_P: 0.3,                               // [2e] 30% kasus karies (tahap ≥2) = karies proksimal, hanya terlihat di rontgen
      PREG_T1_P: 1 / 3,                          // [2e] sepertiga pasien hamil = trimester 1 (rontgen tidak boleh; GDD §6 ③)
      REP_PREG: -3 },                            // [2e] pengganti trust −6 (minigame/00 §3.5) selama trust belum ada (3a)
    ADMIN_MIN: 5,                                // [2e] tahap ≥2 tanpa Resepsionis: +5 menit administrasi (catat & tagih) per pasien
  },
  /** [2e] Staf (GDD §5; buku NPC 05-staf.md). */
  STAFF: {
    WAGE: { resep: 120000, perawat: 160000 },    // GDD §5 gaji/hari, dipotong tiap pagi Senin–Sabtu
    ENERGY_MAX: 100, ENERGY_USE: [10, 7, 5],     // [2e] energi staf per pasien (Resepsionis) / per tindakan (Perawat), Energi Lv1–3
    TIRED: 0.5,                                  // [2e] energi habis → efek tinggal separuh ("melambat", GDD §5)
    SKILL_STEP: 0.25, SKILL_MAX: 5, ENERGY_LV_MAX: 3, // [2e] tiap Skill Lv di atas 1 = +25% efek dasar (Lv5 = 2×)
    SKILL_COST: [0, 0, 1500000, 3000000, 4500000, 6000000], ENERGY_COST: [0, 0, 3000000, 6000000], // GDD §5 Rp 1,5–6jt per level ([2e] rincian)
    QUEUE: 2, PATIENCE: 0.3,                     // GDD §5 Resepsionis: antrian +2, kesabaran +30%
    ZONE: 0.15, PAIN: 0.2,                       // GDD §5 Perawat: zona +15%, sakit −20% (minigame/00 §4)
  },
  /** [rev] Biaya operasional klinik (ACC user 2026-11-15, GDD §4 Manajemen). */
  OPS: {
    UTIL_WEEK: { 1: 300000, 2: 750000, 3: 1500000, 4: 3000000 }, // listrik & air per minggu per tahap klinik, dipotong Senin pagi
    UTIL_CUT_DAYS: 7,                            // tunggakan lebih dari 7 hari → listrik diputus, klinik tidak bisa buka sampai lunas
    BREAK_P: 0.05, BREAK_GRACE: 7,               // alat rusak: 5% per hari praktik (±1×/bulan), tidak di 7 hari pertama setelah praktik buka; maks 1 alat
    RUSH_MUL: 2, RUSH_MIN: 120,                  // servis kilat: 2× biaya, beres 2 jam game; teknisi biasa: beres besok pagi
    /** Alat: [nama, biaya teknisi, tindakan terkunci ('*' = semua kecuali konsultasi/resep/rujuk), menit tambahan per tindakan, tahap minimal]. */
    BREAK: {
      kompresor: ['Kompresor', 1200000, ['gic', 'scaling', 'devital', 'mumi', 'openRes'], 0, 1],
      suction: ['Suction', 600000, ['cabut', 'cabutSusu'], 0, 1],
      lampu: ['Lampu unit', 400000, [], 10, 1],
      autoklaf: ['Autoklaf', 900000, '*', 0, 1],
      rontgen: ['Mesin rontgen', 2500000, ['rontgen'], 0, 2] },
    TAX_RATE: 0.10, TAX_RATE_ADJI: 0.05, TAX_DAYS: 30, // GDD §4: pajak 10% pendapatan kotor tiap 30 hari, otomatis di Balai Kota (5% kalau menikah dengan Adji, menyusul di 3a-5)
  },
  /** [2d] Minigame tindakan T1 (design/gdd/minigame/00–09). Angka [usulan] GDD dipakai apa adanya; yang baru bertanda [2d] (keputusan user 2026-11-12). */
  MG: {
    T_TIER: 1.0, ZONE_MIN: 0.08, ZONE_MAX: 0.6,        // minigame/00 §4
    STRESS_ZONE: 0.9, LOW_ENERGY_ZONE: 0.9,             // stres > 50 → zona −10% (GDD §3); energi kurang dari kebutuhan → zona −10% (minigame/00 §5)
    BIUS: { tanpa: 0, topikal: 0.3, infiltrasi: 0.7, blok: 0.85 }, // B_bius (minigame/00 §4)
    INFIL_LOWER_BACK: 0.35,                             // [2d] infiltrasi di geraham/premolar bawah (blok baru ada di T2) = separuh efek
    ABSES_BIUS: 0.5,                                    // minigame/09 §5: bius pada abses ×0.5
    KID_PAIN: 1.3, PAIN_WARN: 70,                       // minigame/08 & 00 §3.2
    PAIN_START: { abses: 30, pulpIrev: 20 },            // [2d] nilai awal Bar Sakit
    CUKUP_RETURN_P: 0.15,                               // minigame/00 §7 peluang keluhan setelah hasil Cukup
    REP_FAIL: -3, STRESS_FAIL: 10, FAIL_RETURN: [3, 5], // [2d] Gagal: trust −6 belum ada (3a) → reputasi −3; stres +10 (GDD §3); pasien kembali 3–5 hari
    KONSUL_E: 0.2, KONSUL_MIN: 5,                       // minigame/01 §4 ±20% peluang setuju; [2d] konsultasi sebelum persetujuan = 5 menit game
    CURIGA_P: 0.25,                                     // [2d] peluang pasien dewasa bersifat curiga
    TEPAT_SPEED: 0.9, TAHAN_RATE: 0.42,                 // [2d] kecepatan penanda TEPAT (bolak-balik/dtk) & isi TAHAN (/dtk)
    RITME_LOOSE: 1.3, RED_STREAK: 3,                    // minigame/09 §5 periodontitis berat ×1.3; ketukan merah berturut → akar patah
    DRILL_GOOD: 0.8,                                    // [2d-rev5] skor bor/akses/kerok: ≥80% terbuang = Bersih (tanpa kesalahan); bersih total tidak dituntut karena pasti kena pulpa (user 2026-11-12)
    DRILL_MIN: 0.6,                                     // [2d-rev5] 60–79% = Kurang bersih (kesalahan kecil); <60% tombol Selesai belum aktif
    DRILL_PAIN: 2.5,                                    // [2d-rev5] sakit bor/akses/kerok per jaringan terbuang (total = S_dasar × 2,5), bukan per detik: menggosok pelan & teliti tidak dihukum
    EDGE_FREE: 2,                                       // [2d-rev5] 2 px di sekeliling area gosok bebas (menyenggol tepi tidak dihitung)
    PULP_MARGIN: 2,
    SCORE_EDGE: 2,                                      // [2d-gic2] skor bersih: 2 px tepi area target tidak dinilai (sisa tipis di tepi tidak terlihat; playtest user 2026-11-12)
    SCORE_PULP: 4,                                      // [2d-gic2] karies ≤4 px dari pulpa tidak dinilai: membuang karies selektif & menyisakan dentin terdampak di atas pulpa memang dianjurkan pada karies dalam                                     // [2d-rev5] 2 px tepi pulpa = ngilu saja (bukan perforasi), supaya area gosok tidak terlalu mepet
    DRILL_ZOOM: 2,                                      // [2d-rev4] gigi diperbesar 2× saat bor/kerok supaya sisi yang belum bersih kelihatan
    HARD_GRACE: 1,                                      // [2d-rev4] menyentuh pulpa/dinding pertama kali = peringatan; perforasi pada sentuhan berikutnya
    SCALING_PERIO_ENERGY: 3,
    ULTRA_MUL: 2,                                       // [2e-rev] minigame/07: scaler ultrasonik (T2) melepas karang 2× lebih cepat (1 klik = 2 gumpalan)                            // minigame/07: energi 12, atau 15 dengan karang bawah gusi
  },
  /** [uji] Playtest langsung Klinik Gigi tahap 2 (tersembunyi: index.html?uji=klinik2 atau Shift+K di judul). Tidak pernah menyimpan. */
  UJI: { STAGE: 2, MONEY: 30000000, REP: 100, STOCK: 60, TIME_H: 7.5, DAY: 1 }, // [rev] REP 100 = ★2 di skala baru (dulu 30)
  CLINIC_ROOM: ['klinik0', 'klinik1', 'klinik2', 'klinik3', 'klinik4a'],
  CLINIC_EXT: ['klinik0', 'klinik1', 'klinik2', 'klinik3', 'klinik4'],
  /** Audio (design/gdd/audio.md §7). */
  AUDIO: { BGM_VOL: 0.6, SFX_VOL: 0.8, AMB_VOL: 0.4, CROSSFADE: 1.5, NIGHT_FADE: 10, INDOOR_LOWPASS: 900, INDOOR_VOL: 0.6, NIGHT_FADE_START: 20, NIGHT_BGM_START: 18 /* [3b] lagu malam mulai jam 18 */, MAX_VOICES: 8, PAUSE_BGM_VOL: 0.7, SFX_LOWPASS: 6000 },
};

/* =============================== DATA =============================== */
const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
const SEASONS = [{ key: 'kemarau', name: 'Musim Kemarau' }, { key: 'hujan', name: 'Musim Hujan' }];
/** Blok waktu (GDD §2). */
const BLOCKS = [[6, 11, 'Pagi'], [11, 15, 'Siang'], [15, 18, 'Sore'], [18, 24, 'Malam']];
const GENDERS = { P: 'Pria', W: 'Wanita' };
/** Kandidat romance otomatis lawan jenis pemain (GDD §6: pemain wanita → pria, pemain pria → wanita). */
const romanceGender = g => g === 'P' ? 'W' : 'P';
/** Pilihan penampilan pemain. Semua memakai parameter char3 yang sudah ada di v3 (tanpa gambar baru). */
const LOOK_OPTS = {
  hair: [['short', 'Pendek'], ['side', 'Belah Samping'], ['spiky', 'Jabrik'], ['messy', 'Acak-acakan'], ['slick', 'Klimis'], ['curly', 'Keriting'],
    ['buzz', 'Cepak'], ['emo', 'Poni Panjang'], ['bob', 'Bob'], ['long', 'Panjang'], ['wavy', 'Ikal Panjang'], ['pony', 'Kuncir Kuda'],
    ['braid', 'Kepang Dua'], ['bun', 'Cepol'], ['hijab', 'Hijab']],
  hairCol: [['blk', 'Hitam'], ['brn', 'Cokelat Tua'], ['tea', 'Cokelat'], ['lbrn', 'Cokelat Muda'], ['red', 'Merah Bata'], ['gray', 'Abu-abu']],
  hijabCol: [['#3f6a5a', 'Hijau Tua'], ['#2f5d9e', 'Biru'], ['#c86a8a', 'Merah Muda'], ['#cbb894', 'Krem'], ['#2a2a32', 'Hitam'], ['#6a4a8a', 'Ungu'], ['#a8483e', 'Merah Bata']],
  skin: [['L', 'Terang'], ['Y', 'Kuning Langsat'], ['M', 'Sawo Matang'], ['D', 'Gelap']],
  eye: [['brn', 'Cokelat'], ['blk', 'Hitam'], ['hz', 'Hazel'], ['gry', 'Abu-abu']],
  face: [[{}, 'Polos'], [{ lashes: 1 }, 'Bulu Mata Lentik'], [{ glasses: 1 }, 'Kacamata'], [{ glasses: 1, lashes: 1 }, 'Kacamata + Bulu Mata'],
    [{ freckles: 1 }, 'Bintik di Pipi'], [{ thickBrow: 1 }, 'Alis Tebal'], [{ stubble: 1 }, 'Brewok Tipis'], [{ mustache: true }, 'Kumis'], [{ beard: true }, 'Jenggot']],
  outfit: [['coat', 'Jas Dokter'], ['scrubs', 'Baju Scrub'], ['shirt', 'Kemeja'], ['polo', 'Polo'], ['batik', 'Batik'], ['blouse', 'Blus'], ['cardigan', 'Kardigan'], ['tee', 'Kaos']],
  outfitCol: [['#4f86c9', 'Biru'], ['#c8414b', 'Merah'], ['#3fae9c', 'Toska'], ['#e3aa3c', 'Kuning'], ['#6a9a6a', 'Hijau'], ['#8a5aa8', 'Ungu'], ['#e8e0cc', 'Krem'], ['#25242c', 'Hitam']],
};
/** Baris kustomisasi: kunci di S.look, label, dan daftar pilihan (warna rambut ikut jenis rambut). */
const LOOK_ROWS = [['hair', 'Rambut'], ['hairCol', 'Warna'], ['skin', 'Kulit'], ['eye', 'Mata'], ['face', 'Wajah'], ['outfit', 'Baju'], ['outfitCol', 'Warna Baju']];
const lookList = (L, k) => k === 'hairCol' && LOOK_OPTS.hair[L.hair][0] === 'hijab' ? LOOK_OPTS.hijabCol : LOOK_OPTS[k];
/** Tiga penampilan awal = preset pM / pF / pH di cast.js. */
const PRESET_LOOKS = {
  pM: { hair: 0, hairCol: 1, skin: 0, eye: 0, face: 0, outfit: 0, outfitCol: 0 },
  pF: { hair: 9, hairCol: 0, skin: 0, eye: 0, face: 1, outfit: 0, outfitCol: 1 },
  pH: { hair: 14, hairCol: 0, skin: 2, eye: 0, face: 1, outfit: 0, outfitCol: 2 },
};
/** Ubah pilihan penampilan menjadi opsi char3. */
function lookSpec(L) {
  const o = k => { const l = lookList(L, k); return l[((L[k] % l.length) + l.length) % l.length][0]; };
  const hair = o('hair'), col = o('outfitCol'), outfit = o('outfit'), skin = SK[o('skin')];
  const s = { skin: skin[0], skinS: skin[1], hair, eye: EYEC[o('eye')], legs: '#2f3d63', ...o('face') };
  if (hair === 'hijab') { const h = o('hairCol'); Object.assign(s, { hc: h, hl: shade(h, .25), hd: shade(h, -.35), brow: '#2a1a1f' }); }
  else { const h = HC[o('hairCol')]; Object.assign(s, { hc: h[0], hl: h[1], hd: h[2] }); }
  if (outfit === 'coat') Object.assign(s, { style: 'coat', inner: col, steth: 1, badge: 1 });
  else if (outfit === 'scrubs') Object.assign(s, { style: 'scrubs', top: col, legs: shade(col, -.15) });
  else if (outfit === 'cardigan') Object.assign(s, { style: 'cardigan', top: col, inner: '#f4ecd8' });
  else if (outfit === 'batik') Object.assign(s, { style: 'batik', top: col, batikH: shade(col, .5) });
  else Object.assign(s, { style: outfit, top: col });
  return s;
}
const lookLabel = (L, k) => { const l = lookList(L, k); return l[((L[k] % l.length) + l.length) % l.length][1]; };

/** Surat sambutan di kamar kos (Kos Melati kamar 5) saat permainan baru (suara Pak Harjo: sopan, pelan, "nggih"). */
const LETTER = {
  from: 'Harjo, Lurah Rimbasari',
  pages: [
    ['Selamat datang di Rimbasari, Dok {name}.',
      'Maaf saya tidak bisa menjemput sendiri. Pagi ini ada rapat di Balai Kota, nggih.',
      'Kunci ruko almarhum Om Darto saya selipkan di amplop ini. Jangan sampai hilang, cuma ada satu.',
      'Kamar ini sudah saya pesankan ke Pak Udin, yang punya Kos Melati. Sewanya lima puluh ribu sehari, nggih.'],
    ['Rukonya di Alun-alun, paling ujung kiri, sebelah Warung Bu Ratna. Lama kosong, jadi mungkin agak berdebu.',
      'Kalau perlu apa-apa, saya ada di Balai Kota hari Senin sampai Jumat, jam delapan sampai jam dua.',
      'Orang sini memang agak malu-malu di awal. Tapi kalau sudah kenal, susah lepasnya. Pelan-pelan saja, Dok.'],
  ],
};
/** Event musiman (GDD §13). Belum dimainkan di Fase 1, hanya tampil di kalender. */
const EVENTS = {
  kemarau: [[15, 'Pameran Gigi Sehat', 'Tebak-tebakan anak di Alun-alun.'], [35, 'Panen Kopi', 'Pak Bowo butuh bantuan di Kebun Kopi.'],
    [55, 'Pesta Rakyat', 'Tebak-tebakan warga di Alun-alun.']],
  hujan: [[10, 'Tanam Pohon Bersama', 'Awal musim hujan, warga menanam bibit di Lereng Bukit supaya tanah lereng kuat.', 'tree'], [25, 'Bakti Sosial', 'Periksa gigi gratis untuk warga.'],
    [45, 'Malam Lampion', 'Lampion dilepas di Alun-alun malam hari.'], [60, 'Syukuran Akhir Tahun', 'Syukuran bersama di Balai Kota.']],
};

/** Tindakan T1 sementara (2b): harga wajar dasar GDD §4.1, energi dari minigame/01–09, durasi menit game.
 *  Mulai 2c/2d diganti alur periksa + minigame; bahan = unit stok. */
const CASES = {
  konsul: { name: 'Konsultasi', base: 150000, energy: 5, min: 10, stock: 0, says: ['Gigi saya kadang ngilu, Dok. Mau diperiksa saja dulu.', 'Cuma mau cek rutin, Dok. Sudah lama nggak ke dokter gigi.'] },
  gic: { name: 'Tambal GIC', base: 400000, energy: 12, min: 30, stock: 1, says: ['Ada lubang di geraham, Dok. Ngilu kalau minum es.', 'Gigi saya bolong, sering nyelip makanan.'] },
  scaling: { name: 'Scaling', base: 600000, energy: 12, min: 30, stock: 1, says: ['Gusi saya sering berdarah waktu sikat gigi.', 'Karang giginya sudah tebal, Dok. Malu kalau senyum.'] },
  cabut: { name: 'Cabut Gigi Tetap', short: 'Cabut', base: 600000, energy: 14, min: 30, stock: 1, says: ['Gigi saya sudah hancur, Dok. Sakit terus kalau malam.', 'Geraham saya goyang sekali, sudah nggak bisa dipakai makan.'] },
  cabutSusu: { name: 'Cabut Gigi Susu', short: 'Cabut susu', base: 250000, energy: 10, min: 20, stock: 1, says: ['Gigi susunya goyang, Dok, tapi gigi barunya sudah tumbuh di belakang.', 'Giginya dobel, Dok. Yang lama belum mau copot.'] },
  /** Resep (minigame/02): energi 2, 5 menit, 1 unit stok; tetap boleh saat stok habis (minigame/00 §5). */
  resep: { name: 'Resep Obat', short: 'Resep', base: 100000, energy: 2, min: 5, stock: 1, always: true, says: ['Gusi saya bengkak, Dok.'] },
  /** [2c-rev] Perawatan pulpa T1 (sebelum PSA ada): kunjungan 1 open akses + devitalisasi + tambalan sementara, kunjungan 2 mumifikasi + GIC. */
  devital: { name: 'Open akses + devitalisasi', short: 'Devitalisasi', base: 300000, energy: 10, min: 25, stock: 1 },
  mumi: { name: 'Mumifikasi + tambal GIC', short: 'Mumifikasi + GIC', base: 500000, energy: 12, min: 30, stock: 1 },
  /** [2c-rev] Abses: buka akses untuk drainase + resep. */
  openRes: { name: 'Open akses + resep', short: 'Akses + resep', base: 350000, energy: 8, min: 20, stock: 1 },
  /** [2c-rev] Rujuk: pasien membayar tarif konsultasi, tanpa bahan. */
  rujuk: { name: 'Rujuk', base: 150000, energy: 3, min: 10, stock: 0 },
  /** [2e] Rontgen periapikal (GDD §4.1 basis 200rb, §6 ③): dipotret di langkah Periksa, ditagih bersama tindakan. */
  rontgen: { name: 'Rontgen periapikal', short: 'Rontgen', base: 200000, energy: 2, min: 5, stock: 0, stage: 2 },
};
/** Urutan tindakan di menu Tarif. */
const TARIFF_KEYS_ALL = ['konsul', 'rontgen', 'resep', 'scaling', 'gic', 'cabutSusu', 'cabut', 'devital', 'mumi', 'openRes'];
/** [2e] Tindakan yang tersedia di tahap klinik sekarang (rontgen mulai tahap 2). */
const tariffKeys = () => TARIFF_KEYS_ALL.filter(k => !CASES[k].stage || (S && S.clinicStage >= CASES[k].stage));

// ---- Alur periksa (2c): odontogram, diagnosis T1, anamnesis ----
/** Odontogram FDI: baris atas & bawah dilihat dari depan (kanan pasien di kiri layar). */
const TEETH = {
  adult: [[18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28], [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38]],
  kid: [[55, 54, 53, 52, 51, 61, 62, 63, 64, 65], [85, 84, 83, 82, 81, 71, 72, 73, 74, 75]],
};
const T_BACK = [14, 15, 16, 17, 24, 25, 26, 27, 34, 35, 36, 37, 44, 45, 46, 47], T_FRONT_LO = [31, 32, 33, 41, 42, 43];
const T_KID_BACK = [54, 55, 64, 65, 74, 75, 84, 85], T_KID_FRONT = [71, 72, 81, 82];
/** Nama gigi untuk pasien: jenis + sisi (sisi pasien). */
function toothName(n) {
  const q = Math.floor(n / 10), i = n % 10, prim = q >= 5, side = ['kanan atas', 'kiri atas', 'kiri bawah', 'kanan bawah'][(prim ? q - 4 : q) - 1];
  return (i <= 2 ? 'gigi depan' : i === 3 ? 'gigi taring' : prim ? 'geraham' : i <= 5 ? 'geraham kecil' : 'geraham besar') + ' ' + side;
}
/** Alat periksa T1 (GDD §6 ②). icon = kunci TLD di mini.js; sfx = ID audio.md §4.4. tooth=false → dipakai ke pasien. */
const EXAM_TOOLS = [
  { id: 'kaca', name: 'Kaca + sonde', short: 'Kaca', icon: 'mir', sfx: 'mirror_tink', normal: 'Tidak ada lubang' },
  { id: 'dingin', name: 'Tes dingin', short: 'Dingin', icon: 'cot', sfx: 'cold_spray', normal: 'Ngilu sebentar, normal' },
  { id: 'perkusi', name: 'Perkusi', short: 'Perkusi', icon: 'mir', sfx: 'perc_tap', normal: 'Tidak sakit' },
  { id: 'palpasi', name: 'Palpasi', short: 'Palpasi', sfx: 'ui_click', normal: 'Tidak bengkak' },
  { id: 'probe', name: 'Probe periodontal', short: 'Probe', icon: 'scl', sfx: 'probe_click', normal: 'Poket 1-2 mm' },
  { id: 'goyang', name: 'Tes goyang', short: 'Goyang', icon: 'frc', sfx: 'mirror_tink', normal: 'Tidak goyang' },
  { id: 'tensi', name: 'Tensimeter', short: 'Tensi', sfx: 'bp_pump', tooth: false },
  { id: 'rontgen', name: 'Rontgen periapikal', short: 'Rontgen', sfx: 'xray', stage: 2, normal: 'Tidak tampak kelainan' }, // [2e] GDD §6 ③
];
/** [2e] Alat periksa yang tersedia di tahap klinik sekarang. */
const examTools = () => EXAM_TOOLS.filter(t => !t.stage || S.clinicStage >= t.stage);
/** Pertanyaan anamnesis (GDD §6 ①). */
const ASK = [
  { id: 'keluhan', q: 'Apa keluhan utamanya?' }, { id: 'sejak', q: 'Sejak kapan?' }, { id: 'kapan', q: 'Kapan terasa sakit?' },
  { id: 'bengkak', q: 'Ada bengkak?' }, { id: 'gusi', q: 'Gusi sering berdarah?' }, { id: 'riwayat', q: 'Riwayat penyakit?' }, { id: 'obat', q: 'Obat yang diminum & alergi?' },
];
/** Diagnosis T1 (GDD §6 ④). tx = tindakan di CASES (PSA belum ada di T1 → cabut; abses → resep dulu).
 *  region: temuan ada di sekelompok gigi, gigi mana pun benar. f: temuan per alat pada gigi bermasalah. a: jawaban anamnesis ({loc} = nama gigi). */
const DX = {
  sehat: { name: 'Gigi sehat', tx: 'konsul', region: true, kid: true, adult: true,
    says: ['Cuma mau cek rutin, Dok. Sudah lama nggak ke dokter gigi.', 'Nggak ada yang sakit sih, Dok. Pengin tahu saja gigi saya aman atau nggak.'],
    ks: ['Kata Ibu aku harus periksa gigi, Dok.', 'Aku nggak sakit kok, Dok. Cuma disuruh Bapak.'],
    a: { keluhan: 'Nggak ada yang sakit, Dok. Cek saja.', sejak: 'Terakhir periksa gigi sudah lama sekali.', kapan: 'Nggak pernah sakit.', bengkak: 'Nggak ada.', gusi: 'Kadang sedikit, kalau sikat giginya terlalu keras.' },
    f: { kaca: 'Plak tipis, tidak ada lubang' } },
  ging: { name: 'Gingivitis / kalkulus', tx: 'scaling', region: T_FRONT_LO, adult: true,
    says: ['Gusi saya sering berdarah waktu sikat gigi.', 'Karang giginya sudah tebal, Dok. Malu kalau senyum.'],
    a: { keluhan: 'Gusi depan bawah, Dok. Sering berdarah, giginya juga kuning.', sejak: 'Sudah beberapa bulan.', kapan: 'Nggak sakit, cuma berdarah kalau sikat gigi.', bengkak: 'Gusinya agak bengkak merah.', gusi: 'Iya, hampir tiap sikat gigi.' },
    f: { kaca: 'Karang gigi tebal, gusi merah', probe: 'Poket 2-3 mm, gusi berdarah' } },
  perio: { name: 'Periodontitis ringan-sedang', tx: 'scaling', region: T_FRONT_LO, adult: true,
    says: ['Gigi depan bawah saya rasanya agak goyang, Dok.', 'Gusi saya turun, gigi jadi kelihatan panjang.'],
    a: { keluhan: 'Gigi depan bawah, Dok. Gusinya turun dan agak goyang.', sejak: 'Setahun ini makin terasa.', kapan: 'Nggak terlalu sakit. Kadang ngilu kalau sikat gigi.', bengkak: 'Kadang gusinya bengkak, lalu kempis sendiri.', gusi: 'Iya, sering berdarah.' },
    f: { kaca: 'Karang gigi, gusi turun', probe: 'Poket 4-5 mm, berdarah', goyang: 'Goyang derajat 1' } },
  karies: { name: 'Karies dentin', tx: 'gic', teeth: T_BACK, kidTeeth: T_KID_BACK, kid: true, adult: true,
    says: ['Ada lubang di geraham, Dok. Ngilu kalau minum es.', 'Gigi saya bolong, sering nyelip makanan.'],
    ks: ['Gigiku bolong, Dok. Kalau makan permen ngilu.', 'Gigiku ada yang hitam, Dok.'],
    a: { keluhan: 'Yang ngilu {loc}, Dok.', sejak: 'Baru sebulan ini terasa.', kapan: 'Kalau minum dingin atau makan manis. Sebentar saja lalu hilang.', bengkak: 'Nggak ada bengkak.', gusi: 'Nggak.' },
    f: { kaca: 'Lubang sedang, sonde nyangkut', dingin: 'Ngilu, cepat hilang' } },
  // [2e] Karies proksimal (sela gigi): kaca & sonde tidak menemukan lubang, hanya rontgen (GDD §6 ③, challenge #17). Muncul mulai tahap 2.
  kariesP: { name: 'Karies proksimal', tx: 'gic', teeth: T_BACK, kidTeeth: T_KID_BACK, kid: true, adult: true, minStage: 2,
    says: ['Gigi belakang saya sering nyelip makanan, Dok. Kadang ngilu.', 'Kalau minum dingin ada yang ngilu, tapi saya cari lubangnya nggak ketemu.'],
    ks: ['Gigiku sering nyelip makanan, Dok. Kadang ngilu.', 'Kalau makan es krim ada yang ngilu, Dok.'],
    a: { keluhan: '{loc}, Dok. Sering nyelip makanan.', sejak: 'Sebulan ini.', kapan: 'Kalau minum dingin atau makan manis. Sebentar saja.', bengkak: 'Nggak.', gusi: 'Kadang berdarah di sela gigi itu.' },
    f: { dingin: 'Ngilu, cepat hilang' } },
  pulpRev: { name: 'Pulpitis reversibel', tx: 'gic', teeth: T_BACK, kidTeeth: T_KID_BACK, kid: true, adult: true,
    says: ['Geraham saya ngilu sekali kalau kena dingin, Dok.', 'Lubangnya makin besar, Dok. Ngilunya juga makin lama.'],
    ks: ['Gigiku ngilu banget kalau minum es, Dok.', 'Gigiku yang belakang sakit kalau makan es krim.'],
    a: { keluhan: 'Yang ngilu {loc}, Dok.', sejak: 'Dua minggu ini makin sering.', kapan: 'Kalau kena dingin. Ngilunya beberapa detik, lalu hilang.', bengkak: 'Nggak bengkak.', gusi: 'Nggak.' },
    f: { kaca: 'Lubang dalam, sonde nyangkut', dingin: 'Ngilu kurang dari 10 detik, lalu hilang' } },
  pulpIrev: { name: 'Pulpitis ireversibel', tx: 'cabut', teeth: T_BACK, adult: true,
    says: ['Gigi saya sakit terus kalau malam, Dok. Nggak bisa tidur.', 'Sakitnya cenut-cenut sampai ke telinga, Dok.'],
    a: { keluhan: 'Yang sakit {loc}, Dok. Cenut-cenut.', sejak: 'Tiga hari ini, Dok.', kapan: 'Sakit sendiri, apalagi malam. Minum obat cuma reda sebentar.', bengkak: 'Nggak bengkak.', gusi: 'Nggak.' },
    f: { kaca: 'Lubang dalam sampai dekat saraf', dingin: 'Ngilu hebat, lama tidak hilang', perkusi: 'Sedikit sakit' } },
  nekrosis: { name: 'Nekrosis pulpa', tx: 'cabut', teeth: T_BACK, adult: true,
    says: ['Gigi saya warnanya jadi gelap, Dok.', 'Dulu sakit sekali, sekarang malah nggak terasa apa-apa.'],
    a: { keluhan: '{loc}, Dok. Warnanya berubah gelap.', sejak: 'Dulu sakit berminggu-minggu, sekarang sudah nggak.', kapan: 'Sekarang nggak sakit, cuma kadang bau.', bengkak: 'Nggak ada.', gusi: 'Nggak.' },
    f: { kaca: 'Lubang besar, warna gigi gelap', dingin: 'Tidak ada respons' } },
  abses: { name: 'Abses periapikal', tx: 'resep', teeth: T_BACK, adult: true,
    says: ['Pipi saya bengkak, Dok. Gusinya sakit sekali.', 'Gusi saya bengkak, Dok. Sakit kalau dipakai menggigit.'],
    a: { keluhan: 'Yang sakit {loc}, Dok. Gusinya bengkak.', sejak: 'Bengkaknya dari kemarin.', kapan: 'Sakit terus, apalagi kalau dipakai menggigit.', bengkak: 'Iya, Dok. Gusinya bengkak dan terasa hangat.', gusi: 'Kadang keluar nanah.' },
    f: { kaca: 'Lubang besar, warna gigi gelap', dingin: 'Tidak ada respons', perkusi: 'Sakit sekali', palpasi: 'Bengkak di gusi, hangat' } },
  sisaAkar: { name: 'Sisa akar', tx: 'cabut', teeth: T_BACK, adult: true,
    says: ['Gigi saya sudah hancur, Dok. Tinggal akarnya.', 'Gigi saya patah, sisanya bikin makanan nyelip.'],
    a: { keluhan: '{loc}, Dok. Tinggal akarnya.', sejak: 'Patahnya sudah setahun.', kapan: 'Kadang ngilu kalau kena makanan.', bengkak: 'Nggak bengkak.', gusi: 'Kadang berdarah di situ.' },
    f: { kaca: 'Mahkota hancur, tinggal akar', dingin: 'Tidak ada respons' } },
  perioB: { name: 'Periodontitis berat', tx: 'cabut', teeth: [31, 32, 41, 42, 16, 26, 36, 46], adult: true,
    says: ['Geraham saya goyang sekali, sudah nggak bisa dipakai makan.', 'Gigi saya goyang-goyang, Dok. Takut copot sendiri.'],
    a: { keluhan: '{loc}, Dok. Goyang sekali.', sejak: 'Makin goyang setahun ini.', kapan: 'Sakit kalau dipakai mengunyah.', bengkak: 'Gusinya kadang bengkak.', gusi: 'Iya, sering.' },
    f: { kaca: 'Karang tebal, gusi turun jauh', probe: 'Poket lebih dari 6 mm', goyang: 'Goyang derajat 3' } },
  persist: { name: 'Gigi susu persistensi', tx: 'cabutSusu', kidTeeth: T_KID_FRONT, kid: true,
    ks: ['Gigi susuku goyang, Dok, tapi gigi barunya sudah tumbuh di belakang.', 'Gigiku dobel, Dok. Yang lama belum mau copot.'],
    a: { keluhan: '{loc}, Dok. Ada gigi baru di belakangnya.', sejak: 'Gigi barunya keluar dua minggu lalu.', kapan: 'Nggak sakit, cuma aneh rasanya.', bengkak: 'Nggak.', gusi: 'Nggak.' },
    f: { kaca: 'Gigi susu masih ada, gigi tetap tumbuh di belakangnya', goyang: 'Gigi susu goyang' } },
  // [2c-rev] Tahap kunjungan kontrol (hanya muncul untuk pasien kontrol).
  pulpDevital: { name: 'Pasca devitalisasi', tx: 'mumi', teeth: T_BACK, adult: true, ctlOnly: true,
    ctlSay: 'Saya datang kontrol, Dok. Sudah nggak cenut-cenut lagi sejak ditambal sementara.',
    a: { keluhan: '{loc}, Dok. Kontrol yang kemarin.', sejak: 'Ditambal sementara beberapa hari lalu.', kapan: 'Sudah nggak sakit.', bengkak: 'Nggak ada.', gusi: 'Nggak.' },
    f: { kaca: 'Tambalan sementara utuh', dingin: 'Tidak ada respons (saraf sudah mati)' } },
  pascaObat: { name: 'Kontrol pasca obat', tx: 'cabut', teeth: T_BACK, adult: true, ctlOnly: true,
    ctlSay: 'Saya datang kontrol, Dok. Obatnya sudah habis, sakitnya agak reda tapi masih terasa.',
    a: { keluhan: '{loc}, Dok. Masih terasa, tapi nggak separah kemarin.', sejak: 'Minum obat tiga hari.', kapan: 'Kalau obatnya habis, cenut-cenut lagi.', bengkak: 'Nggak bengkak.', gusi: 'Nggak.' },
    f: { kaca: 'Lubang dalam sampai dekat saraf', dingin: 'Ngilu lama, sedikit lebih ringan', perkusi: 'Sedikit sakit' } },
  // [2d] Hasil minigame yang gagal: perforasi (tambalan sementara), akar patah, keluhan setelah cabut.
  perforasi: { name: 'Perforasi pulpa', tx: 'cabut', teeth: T_BACK, adult: true, ctlOnly: true,
    ctlSay: 'Saya datang kontrol, Dok. Gigi yang ditambal sementara kemarin kadang masih cenut-cenut.',
    a: { keluhan: '{loc}, Dok. Yang kemarin ditambal sementara.', sejak: 'Sejak dirawat kemarin.', kapan: 'Kadang cenut-cenut sendiri.', bengkak: 'Nggak bengkak.', gusi: 'Nggak.' },
    f: { kaca: 'Tambalan sementara, dasar kavitas pernah tembus', dingin: 'Ngilu lama', perkusi: 'Sedikit sakit' } },
  akarPatah: { name: 'Sisa akar patah', tx: 'rujuk', teeth: T_BACK.concat(T_FRONT_LO), adult: true, ctlOnly: true,
    ctlSay: 'Saya kontrol, Dok. Bekas cabutnya masih ngilu. Katanya ada akar yang tertinggal.',
    a: { keluhan: '{loc}, Dok. Bekas cabut kemarin.', sejak: 'Sejak dicabut.', kapan: 'Ngilu kalau kena makanan.', bengkak: 'Sedikit.', gusi: 'Kadang berdarah.' },
    f: { kaca: 'Ujung akar tertinggal di soket', perkusi: 'Sedikit sakit' } },
  pascaCabut: { name: 'Keluhan pasca cabut', tx: 'resep', teeth: T_BACK.concat(T_FRONT_LO), kidTeeth: T_KID_FRONT.concat(T_KID_BACK), adult: true, kid: true, ctlOnly: true,
    ctlSay: 'Dok, bekas cabutan kemarin masih nyeri.',
    a: { keluhan: '{loc}, Dok. Bekas cabutnya.', sejak: 'Sejak dicabut kemarin.', kapan: 'Nyut-nyutan, apalagi malam.', bengkak: 'Sedikit.', gusi: 'Kadang masih berdarah.' },
    f: { kaca: 'Soket bekas cabut, bekuan darah kurang', palpasi: 'Sedikit bengkak' } },
};
/** [2e] Rontgen periapikal per diagnosis (draf design/v3/rontgen.html, ACC user 2026-11-12): opsi toothXR + temuan di log.
 *  Gigi lain (atau diagnosis tanpa entri) = film normal. Revisi user: nekrosis = lusen sampai pulpa + ligamen apikal melebar; abses = radiolusen apikal difus;
 *  periodontitis berat = tulang & gusi turun; persistensi = benih gigi tetap menembus puncak tulang. */
const DX_XR = {
  perio: [{ bone: .25 }, 'Tulang turun sedikit, gusi ikut turun'], karies: [{ caries: 'shallow' }, 'Lusen di dentin, jauh dari pulpa'],
  kariesP: [{ caries: 'prox' }, 'Lusen di sela gigi (karies proksimal)'], pulpRev: [{ caries: 'deep' }, 'Lusen dalam, masih ada dentin di atas pulpa'],
  pulpIrev: [{ caries: 'pulp' }, 'Lusen mencapai pulpa'], nekrosis: [{ caries: 'pulp', lesion: 'pdl' }, 'Lusen sampai pulpa, ruang ligamen apikal melebar'],
  abses: [{ caries: 'pulp', lesion: 'abses' }, 'Lusen sampai pulpa, radiolusen periapikal batas difus'], sisaAkar: [{ crown: false }, 'Mahkota hilang, tinggal akar'],
  perioB: [{ bone: .75 }, 'Tulang dan gusi turun jauh'], persist: [{ bud: true }, 'Benih gigi tetap menembus puncak tulang'],
  pulpDevital: [{ caries: 'pulp' }, 'Tambalan sementara di atas kamar pulpa, ujung akar normal'], pascaObat: [{ caries: 'pulp' }, 'Lusen mencapai pulpa, ujung akar normal'],
  perforasi: [{ caries: 'pulp' }, 'Dasar kavitas tembus ke pulpa'], akarPatah: [{ crown: false }, 'Ujung akar tertinggal di soket'],
  pascaCabut: [null, 'Soket kosong, tidak ada sisa akar'],
};
/** [2e] Film rontgen satu gigi: opsi gambar (gigi depan & gigi susu persistensi = akar tunggal, lebih ramping) + teks temuan. */
function xrayOf(p, tooth) {
  const d = DX[p.dx], hitT = p.dx !== 'sehat' && (Array.isArray(d.region) ? d.region.includes(tooth) : tooth === p.tooth), e = hitT && DX_XR[p.dx];
  const n = tooth % 10, q = Math.floor(tooth / 10), base = { type: n <= 2 ? 'I' : n === 3 ? 'C' : n <= 5 && tooth < 50 ? 'P' : 'M' }; // [2e-rev] bentuk per jenis gigi; gigi susu 4–5 = molar susu
  if ([1, 2, 5, 6].includes(q)) base.upper = true;
  if (!e) return { o: base, text: 'Tidak tampak kelainan', bad: false };
  return { o: e[0] ? { ...base, ...e[0] } : null, text: e[1], bad: true };
}
/** [2c-rev] Pilihan tindakan per diagnosis (g: 'ideal' / 'ok'). next = diagnosis kunjungan kontrol berikutnya. rujuk = dirujuk memang tepat.
 *  Pulpitis ireversibel (keputusan user 2026-11-12): devitalisasi → kontrol mumifikasi + GIC / rujuk PSA · resep → kontrol cabut · rujuk. */
const DX_OPTS = {
  sehat: [{ tx: 'konsul', g: 'ideal' }], ging: [{ tx: 'scaling', g: 'ideal' }], perio: [{ tx: 'scaling', g: 'ideal' }],
  karies: [{ tx: 'gic', g: 'ideal' }], kariesP: [{ tx: 'gic', g: 'ideal' }], pulpRev: [{ tx: 'gic', g: 'ideal' }],
  pulpIrev: [{ tx: 'devital', g: 'ideal', next: 'pulpDevital' }, { tx: 'resep', g: 'ok', next: 'pascaObat' }, { tx: 'rujuk', g: 'ideal', to: 'psa' }],
  nekrosis: [{ tx: 'cabut', g: 'ideal' }, { tx: 'rujuk', g: 'ideal', to: 'psa' }],
  abses: [{ tx: 'openRes', g: 'ideal', next: 'nekrosis' }, { tx: 'resep', g: 'ideal', next: 'nekrosis' }, { tx: 'rujuk', g: 'ideal', to: 'psa' }],
  sisaAkar: [{ tx: 'cabut', g: 'ideal' }], perioB: [{ tx: 'cabut', g: 'ideal' }], persist: [{ tx: 'cabutSusu', g: 'ideal' }],
  pulpDevital: [{ tx: 'mumi', g: 'ideal' }, { tx: 'rujuk', g: 'ideal', to: 'psa' }],
  pascaObat: [{ tx: 'cabut', g: 'ideal' }, { tx: 'rujuk', g: 'ok', to: 'psa' }],
  perforasi: [{ tx: 'cabut', g: 'ideal' }, { tx: 'rujuk', g: 'ideal', to: 'psa' }], akarPatah: [{ tx: 'rujuk', g: 'ideal', to: 'bedah' }], pascaCabut: [{ tx: 'resep', g: 'ideal' }],
};
Object.keys(DX_OPTS).forEach(k => { DX[k].opts = DX_OPTS[k]; });
/** [2d] Tindakan invasif yang ditunda kalau tensi terukur tinggi. */
const INVASIVE = ['cabut', 'devital', 'mumi', 'openRes'];
/** Pilihan di panel Rencana Perawatan: tindakan diagnosis + Rujuk (selalu ada). */
const planOpts = dxKey => { const o = DX[dxKey].opts.map(x => x.tx); return o.includes('rujuk') ? o : o.concat('rujuk'); };
/** Riwayat medis (GDD §6 ①) dan risikonya kalau terlewat. tx = tindakan berisiko, know = cara mengetahuinya. */
const MED = {
  hipertensi: { name: 'Hipertensi', say: 'Saya darah tinggi, Dok. Minum obat tiap pagi.', obat: 'Obat darah tinggi saja. Alergi nggak ada.', tx: ['cabut'], refer: true, know: ['riwayat', 'tensi'], risk: 'Tekanan darah naik saat dicabut' },
  diabetes: { name: 'Diabetes', say: 'Ada gula, Dok. Diabetes.', obat: 'Obat gula. Alergi nggak ada.', tx: ['cabut'], know: ['riwayat'], risk: 'Luka cabut lambat sembuh' },
  jantung: { name: 'Sakit jantung', say: 'Jantung saya pernah dipasang ring, Dok.', obat: 'Saya minum obat pengencer darah dari dokter jantung.', tx: ['cabut', 'scaling'], refer: true, know: ['riwayat', 'obat'], risk: 'Perdarahan lama karena pengencer darah' },
  hamil: { name: 'Hamil', say: 'Saya sedang hamil, Dok. Jalan tiga bulan.', obat: 'Vitamin hamil saja.', tx: ['resep', 'openRes'], know: ['riwayat'], risk: 'Obat kurang aman untuk ibu hamil' },
  pacu: { name: 'Alat pacu jantung', say: 'Di dada saya ada alat pacu jantung, Dok. Dipasang dua tahun lalu di Metrapura.', obat: 'Obat dari dokter jantung. Katanya bukan pengencer darah.', tx: ['scaling'], know: ['riwayat'], minStage: 2, risk: 'Alat pacu jantung terganggu getaran scaler ultrasonik' }, // [2e-rev] GDD minigame/07: ultrasonik dilarang, scaling manual
  alergi: { name: 'Alergi amoksisilin', obat: 'Saya alergi amoksisilin, Dok. Dulu gatal-gatal.', tx: ['resep', 'openRes'], know: ['obat'], risk: 'Reaksi alergi obat' },
};
const GUEST_NAMES = { P: ['Pak Budi', 'Mas Joko', 'Pak Rahmat', 'Mas Dimas', 'Pak Slamet', 'Mas Andi', 'Pak Sugeng', 'Mas Bayu', 'Pak Hendra', 'Mas Teguh'],
  W: ['Bu Wati', 'Mbak Ayu', 'Bu Ningsih', 'Mbak Sari', 'Bu Yanti', 'Mbak Lina', 'Bu Endah', 'Mbak Fitri', 'Bu Rukmini', 'Mbak Novi'],
  kidP: ['Dik Raka', 'Dik Bima', 'Dik Fikri', 'Dik Rafi'], kidW: ['Dik Salsa', 'Dik Nayla', 'Dik Putri', 'Dik Aisyah'] };
/** Titik kotor Ruko Tua: indeks dekorasi/item klinik0 di rooms.js yang dihilangkan setelah dibersihkan, kotak tempat berdiri, posisi tanda kilau. */
const CLEAN_SPOTS = [
  { id: 'webL', label: 'Sarang laba-laba', wall: [2], r: [6, 52, 44, 26], mark: [12, 12] },
  { id: 'webR', label: 'Sarang laba-laba', wall: [3], r: [222, 52, 44, 26], mark: [260, 12] },
  { id: 'dust', label: 'Lantai berdebu', floor: [1], r: [100, 120, 70, 34], mark: [134, 128] },
  { id: 'wood', label: 'Serpihan kayu', floor: [2], r: [64, 76, 34, 30], mark: [74, 94] },
  { id: 'boxL', label: 'Kardus lama', items: [4, 5], r: [10, 120, 58, 50], mark: [34, 136] },
  { id: 'boxR', label: 'Kardus lama', items: [6], r: [204, 118, 56, 22], mark: [230, 128] },
];
/** Titik interaksi & jalur pasien per interior klinik (koordinat ruangan). */
const CLINIC_POS = {
  klinik0: { desk: [176, 146, 70, 22] },
  klinik1: { desk: [168, 88, 76, 50], unit: [46, 108, 84, 26], sink: [28, 58, 44, 22], door: [136, 172], seats: [[212, 166], [228, 166], [176, 168]],
    chair: [88, 98], hall: [140, 132] },
  // [2e] Klinik Gigi (interior v3 klinik2 320×200): ruang tunggu = bangku 3 + 2 berdiri, +2 berdiri kalau ada Resepsionis (GDD §4–5).
  // recep/nurse = tempat berdiri staf (kaki); recepTalk/nurseTalk = kotak bicara dengan staf.
  klinik2: { desk: [80, 128, 80, 66], unit: [24, 108, 84, 26], sink: [14, 58, 44, 22], door: [160, 196],
    seats: [[208, 184], [224, 184], [240, 184], [266, 184], [284, 180], [226, 156], [244, 158]], chair: [66, 98], hall: [160, 150],
    recep: [240, 79], recepTalk: [206, 96, 68, 24], nurse: [108, 106], nurseTalk: [108, 96, 34, 34] },
};

/** Gerbang tiap zona: arah, titik tengah, zona tujuan, titik tiba (kaki pemain), hadap. */
const ZINFO = {
  alun: { top: 34, solids: [], exits: [
    { dir: 'L', x: 0, y: 211, to: 'kampung', ax: 940, ay: 214, face: 'L' },
    { dir: 'R', x: 768, y: 211, to: 'niaga', ax: 18, ay: 214, face: 'R' },
    { dir: 'U', x: 520, y: 0, to: 'lereng', ax: 384, ay: 410, face: 'U' }] },
  kampung: { top: 34, solids: [[646, 108, 27, 44], [707, 108, 30, 44]], exits: [
    { dir: 'R', x: 960, y: 211, to: 'alun', ax: 18, ay: 214, face: 'R' }] },
  niaga: { top: 34, solids: [], exits: [
    { dir: 'L', x: 0, y: 212, to: 'alun', ax: 750, ay: 214, face: 'L' }] },
  lereng: { top: 22, solids: [], exits: [
    { dir: 'D', x: 384, y: 432, to: 'alun', ax: 520, ay: 46, face: 'D' }] },
  // [2f] Tanjung Arum (1 layar 480×270): tanpa gerbang, keluar-masuk hanya lewat bus di halte. Laut padat kecuali dermaga (x TA_PIER, lebar 26).
  tanjung: { top: 96, solids: [[0, TA_SEA - 6, TA_PIER - 1, 60], [TA_PIER + 27, TA_SEA - 6, (ZONE_TANJUNG.w || 480) - TA_PIER - 27, 60]], exits: [] }, // [3a-5] zona 768: laut kanan ikut lebar
};
/** [2f] Zona Tanjung Arum dari draf v3 (tanjung.js, ACC user 2026-11-13). */
ZONES.tanjung = ZONE_TANJUNG;
/** [2f] Halte Tanjung Arum: tempat tiba dan naik bus pulang (di depan halte, kiri jalan). */
const TA_HALTE = { r: [4, 148, 74, 34], arrive: [40, 172] };
/** Tips di layar transisi zona. */
const TIPS = [
  'Tekan 1, 2, 3, atau 4 untuk mengubah kecepatan waktu.',
  'Tekan P untuk jeda. Waktu juga berhenti saat menu dan dialog.',
  'Lewat pukul 24:00 kamu bisa pingsan. Pulang dan tidur sebelum tengah malam.',
  'Tidur di kasur menyimpan permainan secara otomatis.',
  'Setiap musim berlangsung 60 hari: Musim Kemarau lalu Musim Hujan.',
  'Berdiri di depan pintu lalu tekan E untuk masuk ke bangunan.',
  'Ruko warisan Om Darto ada di Alun-alun, sebelah kiri Warung Bu Ratna.',
  'Kamarmu di Kos Melati, ujung kanan Kampung Asri: kamar 5, pintu bergambar hati. Sewanya Rp 50.000 per hari.',
  'Rumah di ujung kiri Kampung Asri bisa dikontrak Rp 2 juta per 30 hari setelah ruko direnovasi.',
  'Klinik libur setiap hari Minggu. Pakai harinya untuk istirahat.',
  'Jalan kaki tidak menghabiskan energi. Jelajahi kotanya pelan-pelan.',
  'Hari 10 Musim Hujan ada Tanam Pohon Bersama di Lereng Bukit. Pak Harjo yang membagikan bibitnya.',
  'Kalender dinding di rumah dan papan pengumuman kota bisa dibuka untuk melihat tanggal dan event.',
  'Paket bahan klinik dijual di Bahari Medika, Tanjung Arum: Rp 750.000 untuk 10 tindakan. Naik bus dari Terminal di Jalan Niaga.',
  'Bus ke Tanjung Arum berangkat 07:00 dan 13:00, pulang 11:00 dan 17:00. Bahari Medika juga buka hari Minggu.',
  'Stok bahan menipis tapi tidak sempat ke kota? Pesan antar lewat Kantor Pos, tiba dua hari kemudian.',
  'Klinik yang kotor membuat reputasi turun. Bersihkan di wastafel klinik.',
  'Pasien yang menunggu terlalu lama akan pulang. Perhatikan bar di atas kepala mereka.',
  'Tanyakan riwayat penyakit dan obat sebelum mencabut gigi. Darah tinggi dan pengencer darah membuat cabut gigi berisiko.',
  'Tarif bisa diatur di meja praktik atau menu Manajemen. Tarif murah mendatangkan lebih banyak pasien, tapi lebih melelahkan.',
  'Diagnosis yang salah membuat pasien kembali mengeluh beberapa hari kemudian. Periksa giginya dengan teliti.',
];
/** Posisi kasur per interior rumah (cocok dengan item di rooms.js). */
/** Geser pintu dari tengah bangunan (Kamar Sewa lama: pintu kamar 3; rumahK/rumah2 memakai lebar rumah `cw`). */
const DOOR_DX = { rumah1: 12, rumahK: 14, rumah2: 14, warung: 30, kos: 21 }; // [2h] kos: pintu Kos Melati ada di kanan tengah (sayap kiri = kamar Pak Udin), revisi user 2026-11-13
/** Kalender dinding tambahan (elemen wCalendar v3) untuk rumah yang belum punya; posisi = dinding kosong. */
const CAL_EXTRA = { rumah3: [204, 12], rumah4: [361, 14] };
const BEDS = { kosK: [16, 60], rumah1: [16, 60], rumah2: [14, 46], rumah3: [22, 44], rumah4: [22, 42] };
const BNAME = Object.assign({}, ZLABELS, {
  klinik0: 'Ruko Tua', klinik1: 'Praktik drg.', klinik2: 'Klinik Gigi', klinik3: 'Klinik Gigi', klinik4: 'Klinik Gigi',
  bahari: 'Bahari Medika', // [2f]
  rumah1: 'Kamar Sewa', rumahK: 'Rumah Dikontrakkan', rumah2: 'Kontrakan', rumah3: 'Rumah Subsidi', rumah4: 'Rumah Estetik',
});

/* ============================== ENGINE ============================== */
/** Kanvas tampilan 2× (960×540) untuk UI HD; dunia & HUD digambar di `lo` (480×270) lalu diperbesar. */
const HI = 2;
const cvs = document.getElementById('game'); cvs.width = CFG.W * HI; cvs.height = CFG.H * HI;
const ctx = cvs.getContext('2d'), hc = ctx;
const [lo, lctx] = cv(CFG.W, CFG.H);
ctx.imageSmoothingEnabled = false;
let scale = 1;
/** [2c-rev4] Layar memenuhi jendela (dulu skala bulat → sisa tepi besar, layar terasa kecil). */
function fitCanvas() {
  scale = Math.max(1, Math.min(innerWidth / CFG.W, innerHeight / CFG.H));
  cvs.style.width = CFG.W * scale + 'px'; cvs.style.height = CFG.H * scale + 'px';
}
addEventListener('resize', fitCanvas); fitCanvas();

/** Input keyboard + mouse. `pressed` hanya berlaku satu frame. */
const input = { down: new Set(), pressed: new Set(), typed: [], mouse: { x: -1, y: -1 }, click: null, rclick: null, mdown: false, rdown: false };
const KEYMAP = { arrowup: 'up', w: 'up', arrowdown: 'down', s: 'down', arrowleft: 'left', a: 'left', arrowright: 'right', d: 'right',
  e: 'act', enter: 'ok', ' ': 'act', escape: 'esc', p: 'pause', '1': 'sp1', '2': 'sp2', '3': 'sp3', '4': 'sp4', backspace: 'back', tab: 'tab', r: 'rand', c: 'cal', m: 'mute', i: 'bag', k: 'book', g: 'gift', j: 'jurnal' }; /* [3b-1] j = Jurnal */ // [3a-4] g = beri hadiah
addEventListener('keydown', ev => {
  const k = ev.key.toLowerCase(), m = KEYMAP[k];
  if (game.textInput) {
    if (k === 'backspace') { input.typed.push('\b'); ev.preventDefault(); return; }
    if (ev.key.length === 1 && GL[ev.key] && !ev.ctrlKey && !ev.metaKey) { input.typed.push(ev.key); ev.preventDefault(); return; }
    if (m && ['up', 'down', 'ok', 'esc', 'tab'].includes(m)) { /* tetap navigasi */ } else if (m) return;
  }
  if (m) { if (!input.down.has(m)) input.pressed.add(m); input.down.add(m); ev.preventDefault(); }
});
addEventListener('keyup', ev => { const m = KEYMAP[ev.key.toLowerCase()]; if (m) input.down.delete(m); });
addEventListener('blur', () => input.down.clear());
function toGame(ev) { const r = cvs.getBoundingClientRect(); return { x: (ev.clientX - r.left) / r.width * CFG.W | 0, y: (ev.clientY - r.top) / r.height * CFG.H | 0 }; }
cvs.addEventListener('mousemove', ev => { input.mouse = toGame(ev); });
cvs.addEventListener('mousedown', ev => { const m = toGame(ev); input.mouse = m; if (ev.button === 2) { input.rclick = m; input.rdown = true; } else { input.click = m; input.mdown = true; } ev.preventDefault(); });
// [2d] tahan klik (GOSOK/TAHAN) & klik kanan (RITME D)
addEventListener('mouseup', ev => { if (ev.button === 2) input.rdown = false; else input.mdown = false; });
cvs.addEventListener('contextmenu', ev => ev.preventDefault());
const held = k => input.down.has(k), hit = k => input.pressed.has(k);
const okHit = () => hit('ok') || hit('act');

const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
const overlap = (a, b) => a[0] < b[0] + b[2] && a[0] + a[2] > b[0] && a[1] < b[1] + b[3] && a[1] + a[3] > b[1];
const inRect = (px, py, r) => px >= r[0] && px < r[0] + r[2] && py >= r[1] && py < r[1] + r[3];

/** Kotak klik UI yang dikumpulkan saat menggambar; dibaca frame berikutnya. */
let hits = [], hitsPrev = [];
function clickable(X, Y, W, H, fn, id) { hits.push({ r: [X, Y, W, H], fn, id }); }
function hoverId() { const m = input.mouse; const h = topHit(m); return h ? h.id : null; }
/** Kotak klik paling atas (yang terakhir didaftarkan) di titik p. */
function topHit(p, re) { for (let i = hitsPrev.length - 1; i >= 0; i--) { const h = hitsPrev[i]; if (inRect(p.x, p.y, h.r) && (!re || re.test(h.id))) return h; } return null; }
function handleClick() {
  if (!input.click) return false; const c = input.click;
  const h = topHit(c); if (h) { h.fn(); return true; } return false;
}

/* ============================== SYSTEMS ============================= */
/** State tunggal yang disimpan. */
let S = null;
/** State non-save (scene, cache, efek). */
const game = { scene: 'title', overlay: null, fade: null, trans: null, world: null, zoneCache: {}, roomCache: {},
  textInput: false, t: 0, anim: 0, rain: [], create: null, titleBg: null, notice: null };

/** State baru dari hasil kustomisasi karakter. */
function newState(name, gender, look) {
  return { ver: CFG.SAVE_VER, name, gender, look: { ...look }, day: 1, time: CFG.DAY_START, speed: CFG.SPEED_DEFAULT, paused: false,
    money: CFG.START_MONEY, energy: CFG.ENERGY_MAX, stress: 0, repPts: CFG.CLINIC.REP_START, repV2: true, clinicStage: 0, homeLv: 1, nextEnergyMul: 1, clinic: newClinic(), staff: { resep: null, perawat: null },
    where: { type: 'room', room: 'kosK', door: null }, px: 0, py: 0, dir: 'D', introDone: false, kosDebt: 0, lease: null, food: newFood(),
    garden: newGarden(), seeds: { ...CFG.GARDEN.START_SEEDS }, herbs: {}, homeBuild: null }; // [2g]
}
/** [2h] Tas & kulkas: jumlah per bahan (botol = takaran), bekal per masakan, hitungan makan/susu hari ini. */
const newFood = () => ({ bag: {}, fridge: {}, bekal: {}, meals: 0, milk: 0 });

// ---- Waktu & kalender (GDD §2) ----
const seasonIdx = () => Math.floor(((S.day - 1) % (CFG.SEASON_DAYS * CFG.SEASONS_PER_YEAR)) / CFG.SEASON_DAYS);
const season = () => SEASONS[seasonIdx()];
const dayOfSeason = () => ((S.day - 1) % CFG.SEASON_DAYS) + 1;
const year = () => Math.floor((S.day - 1) / (CFG.SEASON_DAYS * CFG.SEASONS_PER_YEAR)) + 1;
const dayName = () => DAYS[(S.day - 1) % 7];
const pad2 = n => String(n).padStart(2, '0');
/** Jam tampil dalam langkah 10 menit. */
function clockStr(t = S.time) { const m = Math.floor(t / 10) * 10; return pad2(Math.floor(m / 60) % 25) + ':' + pad2(m % 60); }
function blockName(t = S.time) { const h = t / 60; const b = BLOCKS.find(b => h >= b[0] && h < b[1]); return b ? b[2] : 'Malam'; }
const energyMax = () => Math.round(CFG.ENERGY_MAX * (1 + CFG.HOME[S.homeLv].maxBonus));
/** Waktu berjalan hanya saat bermain bebas (tidak di menu, dialog, transisi, atau jeda). */
const timeRunning = () => game.scene === 'play' && !game.overlay && !game.fade && !S.paused;
function tickTime(dt) {
  if (!timeRunning()) return;
  S.time += dt * CFG.MIN_PER_SEC * CFG.SPEEDS[S.speed]; clinicTick(); tripTick();
  if (S.time >= CFG.DAY_END) { S.time = CFG.DAY_END; faint(); }
}
/** Ganti hari: jam 06:00, cek pergantian musim. */
function newDay() {
  const before = seasonIdx(), prevDay = S.day, prevKey = season().key; // [2g]
  S.day += 1; S.time = CFG.DAY_START; clinicNewDay();
  if (S.food) { S.food.meals = 0; S.food.milk = 0; } // [2h]
  if (S.garden) gardenNewDay(prevDay, prevKey, seasonIdx() !== before); // [2g]
  jrNewDay(); /* [3b-1] ganti musim, batas waktu, hitungan harian */
  return seasonIdx() !== before;
}
function rupiah(n) { return 'Rp ' + Math.floor(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }

// ---- Klinik dasar (Fase 2b; GDD §3, §4) ----
/** Data klinik di save: quest bersih-bersih, renovasi, buka/tutup, stok, kebersihan, pasien. */
function newClinic() { return { cleaned: [], introSeen: false, renovDay: null, open: false, stock: 0, clean: 100, patients: [], nextArr: null, nextId: 1, served: 0,
  tariff: {}, records: [], returns: [], people: {}, nextPid: 1 }; }
/** Kode rekam medis pasien (unik, jadi pasien bernama sama tidak tertukar). */
const rmCode = pid => 'RM-' + String(pid).padStart(4, '0');
/** Daftarkan pasien baru ke rekam medis; kembalikan pid. Data asli (riwayat penyakit) disimpan di sini agar tetap sama di kunjungan berikutnya. */
function registerPerson(p) {
  const C = S.clinic, pid = C.nextPid++;
  C.people[pid] = { pid, name: p.name, g: p.g, body: p.body, L: p.L, med: p.med, drug: p.drug, preg1: !!p.preg1, afford: p.afford, first: S.day, last: S.day };
  const ids = Object.keys(C.people).map(Number);
  if (ids.length > CFG.CLINIC.EXAM.PEOPLE_MAX) { // pasien terlama dibuang (beserta kunjungannya)
    const old = ids.filter(i => !C.patients.some(q => q.pid === i) && !C.returns.some(r => r.pid === i)).sort((a, b) => C.people[a].last - C.people[b].last)[0];
    if (old != null) { delete C.people[old]; C.records = C.records.filter(r => r.pid !== old); }
  }
  return pid;
}
/** Jumlah ★ dari poin reputasi: ★1 + satu ★ untuk tiap ambang REP_STARS yang sudah dilewati ([rev] kurva makin panjang). */
const stars = () => 1 + CFG.CLINIC.REP_STARS.filter(v => S.repPts >= v).length;
/** [rev] Poin skala lama (0–100, 20 poin per ★) → skala baru: ★ sama, posisi di dalam ★ sebanding. */
function repFromOld(old) {
  const K = CFG.CLINIC, th = [0, ...K.REP_STARS, K.REP_MAX], s = clamp(1 + Math.floor(old / K.REP_OLD_PER_STAR), 1, 5), f = clamp((old - (s - 1) * K.REP_OLD_PER_STAR) / K.REP_OLD_PER_STAR, 0, 1);
  return Math.round(th[s - 1] + f * (th[s] - th[s - 1]));
}
/** Nama klinik sesuai tahap (GDD §4: Praktik drg. [Nama] · Klinik Gigi [Nama]). */
function clinicName() { return S.clinicStage === 0 ? 'Ruko Tua' : (S.clinicStage === 1 ? 'Praktik drg. ' : 'Klinik Gigi ') + S.name; }
const wdIdx = () => (S.day - 1) % 7;
/** Jam praktik: hari kerja 08:00–16:00 (GDD §2). */
const inPracticeHours = () => wdIdx() !== CFG.CLINIC.CLOSED_WD && S.time >= CFG.CLINIC.OPEN_H * 60 && S.time < CFG.CLINIC.CLOSE_H * 60;
/** Harga wajar = basis × tier alat × musim (GDD §4.1). Tarif pemain menyusul di 2c. */
const fairPrice = k => Math.round(CASES[k].base * CFG.CLINIC.TIER_MUL * CFG.CLINIC.SEASON_PRICE[season().key] / 50000) * 50000;
/** Tarif pemain (menu Manajemen → Tarif); belum diatur = harga wajar. */
const tariff = k => S.clinic.tariff[k] != null ? S.clinic.tariff[k] : fairPrice(k);
/** Pita rasio r = tarif / harga wajar (GDD §4.1). Tiap ★ di atas 3 menggeser batas +0.05 (pasien lebih toleran). */
function band(k) { const E = CFG.CLINIC.EXAM, r = Math.round((tariff(k) / fairPrice(k) - E.STAR_TOL * Math.max(0, stars() - 3)) * 1000) / 1000;
  return E.R_BANDS.find((b, i) => i === 0 ? r < b.max : i === 1 ? r < b.max : r <= b.max) || E.R_BANDS[4]; }
/** Pengali jumlah pasien dari tarif = rata-rata pengali semua tindakan. */
const tariffMul = () => { const ks = tariffKeys(); return ks.reduce((a, k) => a + band(k).pat, 0) / ks.length; };
const queueing = () => S.clinic.patients.filter(p => p.st === 'in' || p.st === 'wait');
/** [2e] Kapasitas antrian: tahap klinik (GDD §4) + 2 kalau Resepsionis bekerja (GDD §5). */
const queueMax = () => CFG.CLINIC.QUEUE[S.clinicStage] + (staffOn('resep') ? CFG.STAFF.QUEUE : 0);
/** [2e] Menit sabar pasien: dasar × (1 + 30% × efek Resepsionis). */
const patienceMin = () => Math.round(CFG.CLINIC.PATIENCE_MIN * (1 + CFG.STAFF.PATIENCE * staffEff('resep')) * nikahPatienceMul()); // [3a-5] Sekar +20%
const clinicPos = () => CLINIC_POS[CFG.CLINIC_ROOM[S.clinicStage]] || CLINIC_POS.klinik1;
/** Ubah reputasi; bunyi & kabar kalau jumlah ★ berubah. */
function addRep(d) {
  const b = stars(); S.repPts = clamp(S.repPts + d, 0, CFG.CLINIC.REP_MAX); const a = stars();
  if (a !== b) { sfx(a > b ? 'rep_up' : 'rep_down'); toast('Reputasi ' + (a > b ? 'naik' : 'turun') + ' jadi ' + a + '★', a > b ? 'good' : 'bad'); }
}
/** Ubah energi (tidak di bawah 0); peringatan sekali saat turun di bawah batas. */
function addEnergy(d) {
  const b = S.energy; S.energy = Math.max(0, S.energy + d);
  if (b >= CFG.CLINIC.LOW_ENERGY && S.energy < CFG.CLINIC.LOW_ENERGY) { sfx('low_energy'); toast('Energimu tinggal sedikit. Istirahat dulu.', 'bad'); }
}
const addStress = d => { S.stress = clamp(S.stress + d, 0, 100); };
// ---- [2e] Staf klinik (GDD §5; buku NPC design/narrative/npc/05-staf.md) ----
/** Peran staf tahap 2 dan kandidatnya (Petugas Kebersihan & Dokter Rekan menyusul di tahap 3). */
const STAFF_ROLES = { resep: { name: 'Resepsionis', cands: ['putri', 'yoga'], fx: 'Antrian +2 · sabar +30% · tagihan otomatis' },
  perawat: { name: 'Perawat Gigi', cands: ['rina', 'fajar', 'dewi'], fx: 'Zona tindakan +15% · sakit -20%' } };
/** Kartu kandidat: ciri, satu kalimat (suara dari buku NPC), dialog Pelatihan & gaji telat (05-staf.md, ACC 2026-11-11). */
const STAFF_INFO = {
  putri: { ciri: 'Ceria dan cepat. Hafal nama pasien setelah sekali bertemu.', say: 'Selamat pagi! Duduk dulu, ya, sebentar lagi giliran Bapak.',
    latih: 'Libur sehari? Asyik! Eh, maksudnya, siap belajar, Dok.', telat: 'Nggak apa-apa, Dok, saya libur dulu hari ini. Tapi besok jangan lupa, ya.' },
  yoga: { ciri: 'Tenang dan sistematis. Antrean di tangannya tidak pernah kacau.', say: 'Sudah saya catat. Pasien berikutnya kontrol jam sepuluh lewat lima belas.',
    latih: 'Boleh saya bawa catatan? Saya belajar lebih cepat kalau ditulis.', telat: 'Saya paham, Dok. Sudah saya catat juga, sih.' },
  rina: { ciri: 'Berpengalaman dan lugas. Enam tahun jadi perawat di Metrapura.', say: 'Suction kanan, bur di nampan dua, lampu sudah. Monggo, Dok.',
    latih: 'Akhirnya. Di klinik lama, pelatihan itu mitos.', telat: 'Saya libur hari ini, Dok. Dan Dokter juga sebaiknya libur.' },
  fajar: { ciri: 'Lulusan baru yang sangat teliti, karena terlalu takut salah.', say: 'Saya cek ulang, ya, Dok. Eh, sudah saya cek. Saya cek sekali lagi.',
    latih: 'Saya boleh bawa buku catatan? Dua? Buat cadangan.', telat: 'Nggak apa-apa, Dok. Bapak saya bisa... eh, jangan bilang Bapak, ya.' },
  dewi: { ciri: 'Lulusan baru dengan beasiswa. Sangat ketat soal sterilisasi.', say: 'Sterilisasi itu biar orang pulang dalam keadaan sehat, Dok.',
    latih: 'Terima kasih, Dok. Saya nggak akan menyia-nyiakan ini.', telat: 'Saya paham. Saya juga dari keluarga yang sering telat.' },
};
const staffOf = role => (S.staff || {})[role] || null;
const staffName = id => castBy(id).name;
/** Staf bekerja hari ini (tahap ≥2, sudah mulai, tidak libur gaji/pelatihan, bukan hari Minggu). Latihan Minigame tanpa staf. */
const staffOn = role => { const st = staffOf(role); return !!st && !S.practice && S.clinicStage >= 2 && !st.off && wdIdx() !== CFG.CLINIC.CLOSED_WD; };
const staffTired = role => staffOn(role) && staffOf(role).energy <= 0;
/** Efek staf: 0 kalau tidak bekerja; 1 + 25% per Skill Lv di atas 1; separuh kalau energinya habis (GDD §5 "melambat"). */
function staffEff(role) { if (!staffOn(role)) return 0; const T = CFG.STAFF, st = staffOf(role); return (1 + T.SKILL_STEP * (st.skill - 1)) * (st.energy <= 0 ? T.TIRED : 1); }
/** Energi staf berkurang per pasien (Resepsionis) / per tindakan (Perawat), sesuai Energi Lv. */
function staffUse(role) {
  if (!staffOn(role)) return; const st = staffOf(role), b = st.energy;
  st.energy = Math.max(0, st.energy - CFG.STAFF.ENERGY_USE[st.en - 1]);
  if (b > 0 && st.energy <= 0) toast(staffName(st.id) + ' kelelahan · kerjanya melambat', 'bad');
}
/** [2e] Menit administrasi per pasien: tahap ≥2 tanpa Resepsionis 5 menit, Resepsionis lelah separuh, Resepsionis bekerja 0 (tagihan otomatis). */
const adminMin = () => S.clinicStage < 2 ? 0 : !staffOn('resep') ? CFG.CLINIC.ADMIN_MIN : staffTired('resep') ? Math.round(CFG.CLINIC.ADMIN_MIN * CFG.STAFF.TIRED) : 0;
/** Hari kerja berikutnya (lewati Minggu). */
function nextWorkDay() { let d = S.day + 1; while ((d - 1) % 7 === CFG.CLINIC.CLOSED_WD) d++; return d; }
/** Pagi hari: energi staf pulih, pelatihan berjalan (staf libur, level naik), gaji dipotong; uang kurang → staf libur (GDD §5). */
function staffNewDay(news) {
  if (S.clinicStage < 2 || !S.staff) return;
  const T = CFG.STAFF, sunday = wdIdx() === CFG.CLINIC.CLOSED_WD; let paid = 0;
  Object.keys(STAFF_ROLES).forEach(role => {
    const st = staffOf(role); if (!st) return; st.energy = T.ENERGY_MAX; st.off = false;
    if (sunday) { st.off = 'minggu'; return; }
    if (st.train && st.train.day <= S.day) {
      const k = st.train.kind; if (k === 'skill') st.skill++; else st.en++; st.train = null; st.off = 'latih';
      news.push(staffName(st.id) + ' ikut pelatihan hari ini. ' + (k === 'skill' ? 'Skill' : 'Energi') + ' naik ke Lv' + (k === 'skill' ? st.skill : st.en) + '.'); return;
    }
    const w = T.WAGE[role]; if (S.money >= w) { S.money -= w; paid += w; }
    else { st.off = 'gaji'; news.push('Gaji ' + staffName(st.id) + ' tidak terbayar, dia libur hari ini. "' + STAFF_INFO[st.id].telat + '"'); }
  });
  if (paid) news.push('Gaji staf hari ini ' + rupiah(paid) + '.');
}
/** Staf ada di klinik (jam 07:30–16:30 hari kerja, tidak libur). */
const staffHere = role => staffOn(role) && S.time >= CFG.CLINIC.OPEN_H * 60 - 30 && S.time < CFG.CLINIC.CLOSE_H * 60 + 30;
const stfCache = {};
/** Sprite staf dari CAST v3: Resepsionis menghadap depan, Perawat menghadap kursi dental (kiri). */
function staffImg(role) { const id = staffOf(role).id, k = role + id; if (stfCache[k]) return stfCache[k];
  let img = chr(id, { dir: role === 'resep' ? 'down' : 'side' }); if (role === 'perawat' && SIDE_FLIP === 'L') img = flipImg(img); return stfCache[k] = img; }
/** Bicara dengan staf di klinik: satu kalimat sesuai suaranya + status hari ini. */
function talkStaff(role) {
  const st = staffOf(role), T = CFG.STAFF, I = STAFF_INFO[st.id], tired = st.energy <= 0;
  const line = tired ? (role === 'resep' ? 'Maaf, Dok, saya agak lambat sekarang. Capek juga, ya, ternyata.' : 'Dok, tangan saya sudah gemetar. Pelan-pelan, ya.') : I.say;
  dialog(['"' + line + '"', STAFF_ROLES[role].name + ' · Skill Lv' + st.skill + ' · Energi Lv' + st.en + ' · tenaga hari ini ' + Math.round(st.energy) + '/' + T.ENERGY_MAX + (st.train ? ' · pelatihan ' + dayLabel(st.train.day) : '') + '.'], { speaker: staffName(st.id) });
}
function hireStaff(role, id) { S.staff[role] = { id, skill: 1, en: 1, energy: CFG.STAFF.ENERGY_MAX, off: 'baru', train: null }; sfx('rep_up'); toast(staffName(id) + ' bergabung · mulai besok pagi', 'good'); }
function fireStaff(role) { const st = staffOf(role); if (!st) return; S.staff[role] = null; sfx('door_close'); toast(staffName(st.id) + ' berhenti bekerja.'); }
/** Pelatihan Skill / Energi (GDD §5): bayar sekarang, staf libur di hari kerja berikutnya, level naik hari itu. */
function trainStaff(role, kind) {
  const T = CFG.STAFF, st = staffOf(role), lv = (kind === 'skill' ? st.skill : st.en) + 1, cost = Math.round((kind === 'skill' ? T.SKILL_COST : T.ENERGY_COST)[lv] * jrTrainMul()); /* [3b-1] #16/#25 */
  S.money -= cost; jrUseTrain(); st.train = { kind, day: nextWorkDay() }; sfx('paper_flip');
  dialog(['"' + STAFF_INFO[st.id].latih + '"', staffName(st.id) + ' ikut pelatihan ' + dayLabel(st.train.day) + '. Hari itu dia libur.'], { speaker: staffName(st.id) });
}
/** Waktu berjalan karena kegiatan (bersih-bersih, tindakan). Lewat 24:00 tetap pingsan. */
function spendTime(min) { S.time = Math.min(CFG.DAY_END, S.time + min); clinicTick(); if (S.time >= CFG.DAY_END) faint(); }
/** Jeda acak sampai pasien berikutnya (menit game): pasien per hari di ★ sekarang ÷ jam praktik × musim × tarif. */
const meanGap = () => { const K = CFG.CLINIC; return 60 / (K.DAY_PATIENTS[stars() - 1] / (K.CLOSE_H - K.OPEN_H) * K.SEASON_MUL[season().key] * tariffMul()); };
function nextGap() { const [a, b] = CFG.CLINIC.GAP_SPREAD; return Math.max(5, meanGap() * (a + Math.random() * (b - a))); }
/** Logika klinik per langkah waktu: tutup 16:00, pasien datang, pasien kehabisan sabar. */
function clinicTick() {
  nikahTick(); // [3a-5] hari H, Arya 18:00, rujukan Wulan, laporan Adji
  if (!S || S.clinicStage < 1) return;
  const C = S.clinic, K = CFG.CLINIC;
  if (C.open && S.time >= K.CLOSE_H * 60) {
    C.open = false; const q = queueing(); q.forEach(p => leavePatient(p, null));
    toast('Pukul 16:00 · klinik tutup' + (q.length ? '. ' + q.length + ' pasien pulang, datang lagi lain hari.' : '.'));
  }
  if (!C.open || !inPracticeHours()) C.nextArr = null;
  else {
    const due = C.returns.find(r => r.kind !== 'gossip' && r.day <= S.day); // pasien kontrol / kembali mengeluh datang duluan
    if (due && queueing().length < queueMax()) { C.returns = C.returns.filter(r => r !== due); spawnPatient(S.time, due); }
    // jadwal basi (mis. dari simpanan lama / tarif berubah) → jadwalkan ulang
    if (C.nextArr != null && C.nextArr > S.time + meanGap() * K.GAP_SPREAD[1] + 1) C.nextArr = null;
    if (C.nextArr == null) C.nextArr = Math.max(S.time, K.OPEN_H * 60) + K.FIRST_ARRIVE[0] + Math.random() * (K.FIRST_ARRIVE[1] - K.FIRST_ARRIVE[0]); while (S.time >= C.nextArr) { spawnPatient(C.nextArr); C.nextArr += nextGap(); } }
  C.patients.filter(p => (p.st === 'in' || p.st === 'wait') && S.time >= p.until).forEach(p => leavePatient(p, 'late'));
  if (!inClinic()) C.patients.slice().forEach(settlePatient);
  opsTick(); // [rev] alat rusak tiba-tiba / servis kilat selesai
}
/** Penampilan pasien tamu: parameter char3 diacak (tanpa gambar baru). */
function guestLook(g, body) {
  const pick = a => a[Math.floor(Math.random() * a.length)], n = k => Math.floor(Math.random() * LOOK_OPTS[k].length);
  const L = { hair: g === 'P' ? pick([0, 1, 2, 3, 4, 5, 6, 7]) : pick([5, 8, 9, 10, 11, 12, 13, 14]), hairCol: n('hairCol'), skin: n('skin'), eye: n('eye'),
    face: body === 'kid' ? pick([0, 0, 4]) : g === 'P' ? pick([0, 0, 2, 4, 5, 6, 7, 8]) : pick([0, 1, 1, 2, 3, 4]), outfit: g === 'P' ? pick([2, 3, 4, 7]) : pick([2, 3, 4, 5, 6, 7]), outfitCol: n('outfitCol') };
  if (L.hair === 14) L.hairCol = Math.floor(Math.random() * LOOK_OPTS.hijabCol.length); else if (body === 'old') L.hairCol = 5; else L.hairCol = Math.floor(Math.random() * 5);
  return L;
}
function pickW(w) { let r = Math.random() * Object.values(w).reduce((a, b) => a + b, 0); for (const k in w) { r -= w[k]; if (r < 0) return k; } return Object.keys(w)[0]; }
const pickA = a => a[Math.floor(Math.random() * a.length)];
/** Kasus pasien tamu: tindakan dari bobot musim (CASE_W), lalu diagnosis T1 yang tindakannya cocok, gigi, dan riwayat medis. */
function rollCase(body, g) {
  const K = CFG.CLINIC, E = K.EXAM, kid = body === 'kid', kase = pickW(K.CASE_W[kid ? 'kid' : season().key]);
  let dx = pickA(Object.keys(DX).filter(k => DX[k].tx === kase && !DX[k].ctlOnly && !DX[k].minStage && (kid ? DX[k].kid : DX[k].adult))) || 'sehat';
  if (kase === 'gic' && S.clinicStage >= DX.kariesP.minStage && Math.random() < K.XRAY.PROX_P) dx = 'kariesP'; // [2e] karies tersembunyi
  const d = DX[dx];
  const tooth = d.region ? (Array.isArray(d.region) ? pickA(d.region) : null) : pickA(kid ? d.kidTeeth : d.teeth);
  let med = null, drug = null;
  if (!kid && Math.random() < E.MED_P) med = pickA(['hipertensi', 'diabetes', 'jantung'].concat(S.clinicStage >= MED.pacu.minStage ? ['pacu'] : [], g === 'W' && body === 'adult' ? ['hamil'] : []));
  if (!kid && med !== 'jantung' && Math.random() < E.ALLERGY_P) drug = 'alergi';
  return { kase: d.tx, dx, tooth, med, drug, preg1: med === 'hamil' && Math.random() < K.XRAY.PREG_T1_P, afford: (Math.random() * 2 - 1) * E.AFFORD };
}
/** Pasien datang pada menit t. tpl = pasien kontrol / kembali mengeluh (identitas & kasus tetap). Antrian penuh → batal datang. */
function spawnPatient(t, tpl) {
  const C = S.clinic, K = CFG.CLINIC, q = queueing();
  if (q.length >= queueMax()) { addRep(K.REP_TURNED); if (inClinic()) sfx('patient_sad'); toast('Antrian penuh · seorang pasien batal datang.', 'bad'); return; }
  let base;
  if (tpl) base = { pid: tpl.pid, name: tpl.name, g: tpl.g, body: tpl.body, L: tpl.L, npc: tpl.npc, kase: DX[tpl.dx].tx, dx: tpl.dx, tooth: tpl.tooth, med: tpl.med, drug: tpl.drug, preg1: !!tpl.preg1, afford: tpl.afford, medOk: tpl.medOk, back: tpl.kind,
    sayText: tpl.kind === 'wrong' ? 'Dok, gigi yang kemarin ditangani masih sakit. Malah makin terasa.' : tpl.say || DX[tpl.dx].ctlSay || 'Saya datang kontrol, Dok. Bengkaknya sudah kempis, tapi giginya masih terasa.' };
  else {
    // pasien lama datang lagi dengan keluhan baru (identitas & riwayat penyakit tetap)
    const busy = id => C.patients.some(p => p.pid === id) || C.returns.some(r => r.pid === id);
    const olds = Object.values(C.people || {}).filter(o => o.L && !o.npc && !busy(o.pid) && o.last < S.day);
    base = wargaVisit(t); // [3a-2] pasien warga (maks 1/hari kerja)
    const old = !base && olds.length && Math.random() < K.OLD_PATIENT_P ? pickA(olds) : null;
    if (base) { /* warga */ } else if (old) {
      let rc = rollCase(old.body, old.g); for (let k = 0; k < 8 && rc.tooth && (old.gone || {})[rc.tooth] != null; k++) rc = rollCase(old.body, old.g); // [2e-rev]
      base = { pid: old.pid, name: old.name, g: old.g, body: old.body, L: old.L, ...rc, med: old.med, drug: old.drug, preg1: !!old.preg1, afford: old.afford, back: 'lama' };
    } else {
      const r = Math.random(), body = r < K.KID_P ? 'kid' : r < K.KID_P + K.OLD_P ? 'old' : 'adult', g = Math.random() < 0.5 ? 'P' : 'W';
      const used = C.patients.map(p => p.name), pool = GUEST_NAMES[body === 'kid' ? 'kid' + g : g].filter(nm => !used.includes(nm));
      base = { name: pool[Math.floor(Math.random() * pool.length)] || 'Pasien', g, body, L: guestLook(g, body), ...rollCase(body, g) };
      base.pid = registerPerson(base);
    }
    const d = DX[base.dx], lines = base.body === 'kid' && d.ks ? d.ks : d.says; base.sayText = pickA(lines);
  }
  const seats = clinicPos().seats, seat = seats.findIndex((s, i) => !q.some(p => p.seat === i)), pos = clinicPos();
  const p = Object.assign(base, { id: C.nextId++, st: 'in', arr: t, until: t + patienceMin(), pat: patienceMin(), seat, x: pos.door[0], y: pos.door[1] + 8, dir: 'U', path: [[pos.door[0], pos.door[1] - 6], seats[seat]] });
  C.patients.push(p); staffUse('resep'); // [2e] Resepsionis melayani pendaftaran
  if (tpl && tpl.kind === 'wrong') { addRep(K.EXAM.REP_WRONG); addStress(K.EXAM.STRESS_WRONG); toast(p.name + ' kembali: giginya masih sakit.', 'bad'); }
  else if (tpl) toast(p.name + (tpl.kind === 'refer' ? ' kembali dari rujukan.' : tpl.kind === 'ctl' ? ' datang kontrol.' : ' kembali dengan keluhan.'), 'info');
  if (C.people && C.people[p.pid]) C.people[p.pid].last = S.day;
  if (inClinic()) sfx('patient_in'); else settlePatient(p);
}
/** Pasien pergi: 'done' (selesai), 'late' (kehabisan sabar, reputasi turun), null (klinik tutup). */
function leavePatient(p, why) {
  const pos = clinicPos(); p.st = 'out'; p.mood = why === 'done' ? 'happy' : why === 'late' ? 'sad' : null;
  p.path = [[pos.hall[0], Math.max(p.y, pos.hall[1])], [pos.door[0], pos.door[1] - 6], [pos.door[0], pos.door[1] + 14]];
  if (why === 'late') { addRep(CFG.CLINIC.REP_LEFT); toast(p.name + ' pulang, terlalu lama menunggu.', 'bad'); if (inClinic()) sfx('patient_sad'); }
  if (!inClinic()) settlePatient(p);
}
/** Selesaikan jalan pasien seketika (saat pemain tidak di klinik). */
function settlePatient(p) { if (!p.path || !p.path.length) return; const e = p.path[p.path.length - 1]; p.x = e[0]; p.y = e[1]; p.path = []; patientArrive(p); }
function patientArrive(p) {
  if (p.st === 'in') { p.st = 'wait'; p.dir = 'D'; }
  else if (p.st === 'out') S.clinic.patients = S.clinic.patients.filter(q => q !== p);
}
/** Gerak pasien di dalam klinik (hanya saat waktu berjalan). */
function updatePatients(dt) {
  if (!inClinic() || !timeRunning()) return;
  const sp = CFG.CLINIC.WALK * Math.max(1, CFG.SPEEDS[S.speed]) * dt;
  S.clinic.patients.slice().forEach(p => {
    if (!p.path || !p.path.length) { p.walk = false; return; }
    const [tx, ty] = p.path[0], dx = tx - p.x, dy = ty - p.y, d = Math.hypot(dx, dy);
    if (d > 0.01) p.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'R' : 'L') : (dy > 0 ? 'D' : 'U');
    p.walk = true; p.anim = (p.anim || 0) + dt;
    if (d <= sp) { p.x = tx; p.y = ty; p.path.shift(); if (!p.path.length) { p.walk = false; patientArrive(p); } } else { p.x += dx / d * sp; p.y += dy / d * sp; }
  });
}
const ptCache = {};
/** Sprite pasien (char3 + tubuh anak/dewasa/tua + ekspresi). */
function patientImg(p) {
  const step = p.walk ? [1, 0, 2, 0][Math.floor((p.anim || 0) * CFG.ANIM_FPS) % 4] : 0, expr = p.mood || (p.st === 'chair' ? 'sad' : 'neutral');
  const k = (p.npc || JSON.stringify(p.L)) + p.body + p.dir + step + expr; if (ptCache[k]) return ptCache[k];
  const d = p.dir === 'D' ? 'down' : p.dir === 'U' ? 'up' : 'side';
  let img = char3({ ...(p.npc ? castBy(p.npc).s : { ...lookSpec(p.L), body: p.body }), dir: d, step, expr }); if (p.dir === SIDE_FLIP) img = flipImg(img); // [3a-2] pasien warga = sprite CAST
  return ptCache[k] = img;
}
/** Pergantian hari untuk klinik: renovasi selesai, hukuman klinik kotor, antrian dikosongkan. Kabar ditampilkan di kartu pagi. */
function clinicNewDay() {
  const C = S.clinic, K = CFG.CLINIC, news = [];
  if (C.renovDay != null && S.day >= C.renovDay) {
    S.clinicStage = C.renovTo || 1; C.renovDay = null; C.renovTo = null; C.clean = 100;
    news.push(S.clinicStage === 1 ? 'Renovasi selesai! ' + clinicName() + ' siap dibuka hari ini.' : 'Upgrade selesai! ' + clinicName() + ' punya ruang tunggu dan rontgen periapikal. Staf bisa direkrut di meja praktik.');
  }
  staffNewDay(news); // [2e]
  postNewDay(news); // [2f] pesanan Kantor Pos
  opsNewDay(news); // [rev] listrik & air, alat rusak, pajak
  if (S.clinicStage >= 1 && C.clean < K.DIRTY_LIMIT) { addRep(K.REP_DIRTY_DAY); news.push('Klinik kotor (' + C.clean + '%), reputasi turun.'); }
  C.returns.filter(r => r.kind === 'gossip' && r.day <= S.day).forEach(r => { addRep(K.EXAM.REP_WRONG); news.push('Kabar di warung: ' + r.name + ' bilang giginya dicabut, padahal katanya masih bisa ditambal.'); });
  C.returns = C.returns.filter(r => !(r.kind === 'gossip' && r.day <= S.day));
  const ctl = C.returns.filter(r => (r.kind === 'ctl' || r.kind === 'refer') && r.day === S.day); if (ctl.length) news.push('Jadwal kontrol hari ini: ' + ctl.map(r => r.name + ' (' + rmCode(r.pid) + ')').join(', ') + '.');
  C.open = false; C.patients = []; C.nextArr = null;
  game.dayNews = news.join(' ');
}

// ---- [rev] Biaya operasional: listrik & air mingguan, alat rusak acak, pajak 30 hari (ACC user 2026-11-15) ----
/** Pendapatan klinik masuk: uang + dasar pajak (pendapatan kotor sejak pajak terakhir). */
function earn(n) { if (!n) return; S.money += n; S.clinic.taxBase = (S.clinic.taxBase || 0) + n; nikahEarn(n); jrEv('earn', n); /* [3b-1] #21 */ } // [3a-5] laporan Adji
/** Bayar otomatis kalau uang cukup; kalau tidak, kembalikan false (jadi tunggakan). */
const autoPay = n => { if (S.money < n) return false; S.money -= n; return true; };
/** Alat yang sedang rusak (data CFG.OPS.BREAK) atau null. */
const brokenItem = () => { const b = S.clinic.broken; return b ? CFG.OPS.BREAK[b.k] : null; };
/** Nama alat rusak yang mengunci tindakan tx, atau null. */
function brokenBlocks(tx) {
  const it = brokenItem(); if (!it) return null;
  return (it[2] === '*' ? !['konsul', 'resep', 'rujuk'].includes(tx) : it[2].includes(tx)) ? it[0] : null;
}
/** Menit tambahan per tindakan karena alat rusak (Lampu unit). */
const brokenExtraMin = () => { const it = brokenItem(); return it ? it[3] : 0; };
/** Pagi hari: tunggakan dilunasi kalau uang cukup, listrik & air (Senin), listrik diputus, alat selesai diperbaiki, jadwal kerusakan, pajak. */
function opsNewDay(news) {
  const C = S.clinic, O = CFG.OPS; if (S.clinicStage < 1) return;
  if (C.opsSince == null) C.opsSince = S.day;
  if (C.utilDebt > 0 && autoPay(C.utilDebt)) { news.push('Tunggakan listrik & air ' + rupiah(C.utilDebt) + ' lunas.' + (C.cut ? ' Listrik klinik menyala lagi.' : '')); C.utilDebt = 0; C.utilSince = null; C.cut = false; }
  if (wdIdx() === 0) { const w = Math.round(O.UTIL_WEEK[S.clinicStage] * nikahUtilMul()); // [3a-5] Arya -30%
    if (autoPay(w)) news.push('Listrik & air klinik minggu ini ' + rupiah(w) + '.');
    else { C.utilDebt = (C.utilDebt || 0) + w; if (C.utilSince == null) C.utilSince = S.day; news.push('Uang kurang: listrik & air ' + rupiah(w) + ' jadi tunggakan. Lunasi dalam ' + O.UTIL_CUT_DAYS + ' hari supaya listrik tidak diputus.'); } }
  if (C.utilDebt > 0 && !C.cut && S.day - C.utilSince > O.UTIL_CUT_DAYS) { C.cut = true; news.push('Listrik klinik diputus karena tunggakan ' + rupiah(C.utilDebt) + '. Klinik tidak bisa buka sampai lunas (bayar di meja praktik).'); }
  if (C.broken && C.broken.fix && C.broken.fix.day <= S.day) { news.push('Teknisi sudah memperbaiki ' + brokenItem()[0].toLowerCase() + '.'); C.broken = null; }
  C.brkAt = null;
  if (!C.broken && wdIdx() !== CFG.CLINIC.CLOSED_WD && S.day - C.opsSince >= O.BREAK_GRACE && Math.random() < O.BREAK_P)
    C.brkAt = (CFG.CLINIC.OPEN_H + Math.random() * (CFG.CLINIC.CLOSE_H - CFG.CLINIC.OPEN_H - 1)) * 60;
  if (S.day > 1 && (S.day - 1) % O.TAX_DAYS === 0) { const t = Math.round((C.taxBase || 0) * taxRate() * jrTaxMul() / 1000) * 1000; C.taxBase = 0; /* [3b-1] #21 pajak setengah */ // [3a-5] Adji 5%
    if (t > 0) { jrEv('pajak', S.money >= t); /* [3b-1] #26 */ if (autoPay(t)) news.push('Pajak ' + O.TAX_DAYS + ' hari (' + Math.round(taxRate() * 100) + '% pendapatan kotor) ' + rupiah(t) + ' dibayar otomatis di Balai Kota.'); else { C.taxDebt = (C.taxDebt || 0) + t; news.push('Pajak ' + rupiah(t) + ' belum terbayar, uang kurang. Dibayar otomatis begitu uangmu cukup.'); } } }
  else if (C.taxDebt > 0 && autoPay(C.taxDebt)) { news.push('Tunggakan pajak ' + rupiah(C.taxDebt) + ' lunas.'); C.taxDebt = 0; }
}
/** Tiap langkah waktu: alat rusak tiba-tiba saat klinik buka; servis kilat selesai. */
function opsTick() {
  const C = S.clinic, O = CFG.OPS;
  if (C.broken && C.broken.fix && C.broken.fix.t != null && C.broken.fix.day === S.day && S.time >= C.broken.fix.t) { toast(brokenItem()[0] + ' sudah diperbaiki teknisi.', 'good'); C.broken = null; }
  if (C.brkAt == null || !C.open || S.time < C.brkAt) return;
  C.brkAt = null; const ks = Object.keys(O.BREAK).filter(k => S.clinicStage >= O.BREAK[k][4]), k = pickA(ks), it = O.BREAK[k];
  C.broken = { k, fix: null }; sfx('patient_sad');
  toast(it[0] + ' rusak! ' + (it[3] ? 'Tiap tindakan +' + it[3] + ' menit' : it[2] === '*' ? 'Hanya konsultasi & resep' : 'Sebagian tindakan terkunci') + '. Panggil teknisi di meja praktik.', 'bad');
}
/** Meja praktik: panggil teknisi (besok pagi) atau servis kilat (2×, 2 jam). */
function openRepair() {
  const C = S.clinic, O = CFG.OPS, it = brokenItem(); if (!it) return;
  if (C.broken.fix) return dialog([it[0] + ' sedang diperbaiki. ' + (C.broken.fix.t != null ? 'Teknisi selesai pukul ' + clockStr(C.broken.fix.t) + '.' : 'Teknisi datang besok pagi.')]);
  const lock = it[3] ? 'Selama rusak, tiap tindakan butuh ' + it[3] + ' menit lebih lama.' : it[2] === '*' ? 'Selama rusak, alat tidak bisa disterilkan: hanya konsultasi, resep, dan rujuk.' : 'Selama rusak, tindakan ini belum bisa dikerjakan: ' + it[2].map(t => CASES[t].short || CASES[t].name).join(', ') + '.';
  const fix = (cost, f) => () => { if (S.money < cost) { sfx('ui_deny'); toast('Uangmu belum cukup.', 'bad'); return; } S.money -= cost; C.broken.fix = f; sfx('coin_out'); toast('Teknisi dipanggil · -' + rupiah(cost), 'good'); };
  dialog([it[0] + ' rusak. ' + lock], { choices: [
    ...nikahRepair(fix), // [3a-5] Arya gratis
    { label: 'Teknisi · ' + rupiah(it[1]) + ' (besok pagi)', fn: fix(it[1], { day: S.day + 1 }) },
    { label: 'Servis kilat · ' + rupiah(it[1] * O.RUSH_MUL) + ' (' + O.RUSH_MIN / 60 + ' jam)', fn: fix(it[1] * O.RUSH_MUL, { day: S.day, t: S.time + O.RUSH_MIN }) },
    { label: 'Nanti', fn: () => {} }] });
}
/** Meja praktik: lunasi tunggakan listrik & air sekarang (listrik langsung menyala). */
function payUtilDebt() {
  const C = S.clinic; if (S.money < C.utilDebt) { sfx('ui_deny'); toast('Uangmu belum cukup.', 'bad'); return; }
  S.money -= C.utilDebt; toast('Tunggakan listrik & air lunas · -' + rupiah(C.utilDebt), 'good'); sfx('coin_out'); C.utilDebt = 0; C.utilSince = null; C.cut = false;
}

// ---- Kabar singkat (toast HD di bawah HUD) ----
function toast(text, kind = 'info') { game.toasts = (game.toasts || []).filter(t => game.t - t.t0 < 3.2).slice(-2); game.toasts.push({ text, kind, t0: game.t }); }

// ---- Save / load (localStorage) ----
function saveGame() {
  if (S && (S.practice || S.uji)) return false; // Latihan Minigame & mode uji tidak pernah menimpa simpanan
  try { localStorage.setItem(CFG.SAVE_KEY, JSON.stringify(S)); return true; } catch (e) { return false; }
}
/** Simpanan 2c awal: catatan tanpa kode pasien → kelompokkan per nama + tubuh, beri kode RM. */
function migrateRecords(C) {
  const key = o => o.name + '|' + o.body, byKey = {};
  Object.values(C.people).forEach(o => { byKey[key(o)] = o.pid; });
  const give = o => { if (o.pid != null) return; const k = key(o); if (byKey[k] == null) { const pid = C.nextPid++; byKey[k] = pid; C.people[pid] = { pid, name: o.name, g: o.g || 'P', body: o.body, L: o.L || null, med: o.med && typeof o.med === 'string' ? o.med : null, drug: o.drug || null, afford: o.afford || 0, first: o.d || S0day(), last: o.d || S0day() }; } o.pid = byKey[k]; };
  C.records.slice().reverse().forEach(give); C.records.forEach(r => { const o = C.people[r.pid]; if (r.d < o.first) o.first = r.d; }); C.returns.forEach(give); C.patients.forEach(give);
  C.records.forEach(r => { const o = C.people[r.pid]; if (r.d > o.last) o.last = r.d; o.known = (o.known || []).concat((Array.isArray(r.med) ? r.med : []).filter(m => !(o.known || []).includes(m))); if (!o.L) { const q = C.patients.find(x => x.pid === r.pid) || C.returns.find(x => x.pid === r.pid); if (q) o.L = q.L; } });
}
const S0day = () => (S ? S.day : 1);
function readSave() {
  try { const s = JSON.parse(localStorage.getItem(CFG.SAVE_KEY)); if (!s || s.ver !== CFG.SAVE_VER) return null;
    if (!s.look) s.look = { ...(PRESET_LOOKS[s.preset] || PRESET_LOOKS.pM) }; // simpanan lama (sebelum kustomisasi lengkap)
    if (s.repPts == null) s.repPts = ((s.rep || 1) - 1) * CFG.CLINIC.REP_OLD_PER_STAR + CFG.CLINIC.REP_OLD_START; // simpanan Fase 1: ★ → poin skala lama
    if (!s.repV2) { s.repPts = repFromOld(s.repPts); s.repV2 = true; } // [rev] skala reputasi 0–100 → 0–600
    s.clinic = Object.assign(newClinic(), s.clinic || {});
    s.staff = Object.assign({ resep: null, perawat: null }, s.staff || {}); // [2e]
    s.clinic.patients = s.clinic.patients.filter(p => p.dx); // pasien simpanan 2b belum punya diagnosis
    migrateRecords(s.clinic);
    if (!s.garden) { s.garden = newGarden(); s.garden.pots = new Array(CFG.GARDEN.POTS[s.homeLv] || 4).fill(null); s.seeds = { ...CFG.GARDEN.START_SEEDS }; s.herbs = {}; s.homeBuild = null; s.gardenNew = true; } // [2g] simpanan sebelum kebun
    s.food = Object.assign(newFood(), s.food || {}); // [2h] simpanan sebelum masak & makan
    if (s.kosDebt == null) { // [kos] simpanan sebelum Kos Melati: Kamar Sewa lama → Kos Melati kamar 5
      s.kosDebt = 0; s.lease = null;
      if (s.homeLv === 1) { s.kosMoved = true; if (s.where && s.where.type === 'room' && s.where.room === 'rumah1') s.where = { type: 'room', room: 'kosK', door: null }; }
    }
    return s; } catch (e) { return null; }
}

// ---- Sprite pemain (24×32, arah + langkah) ----
const sprCache = {};
function flipImg(img) { const [c, x] = cv(img.width, img.height); x.translate(img.width, 0); x.scale(-1, 1); x.drawImage(img, 0, 0); return c; }
/** Frame pemain: dir D/U/L/R, step 0/1/2. Sprite 'side' v3 menghadap kanan; kiri = dicerminkan. */
function playerSprite(look, dir, step) {
  const k = JSON.stringify(look) + dir + step + (S ? nikahWearKey() : ''); if (sprCache[k]) return sprCache[k];
  const d = dir === 'D' ? 'down' : dir === 'U' ? 'up' : 'side';
  let img = char3({ ...nikahWear(lookSpec(look)), dir: d, step }); // [3a-5] baju pengantin di hari H
  if (dir === SIDE_FLIP) img = flipImg(img);
  return sprCache[k] = img;
}
const SIDE_FLIP = 'L'; // char3 'side' menghadap kanan (lihat headSide di char.js)

// ---- Audio (design/gdd/audio.md, ACC 2026-11-11) ----
// BGM = MP3 dari user yang ditanam ke index.html saat build (window.BGM, base64).
// SFX & suara lingkungan dibuat dengan WebAudio: lembut, bulat, frekuensi tinggi dipotong.
const AUDIO_KEY = 'senyum-rimbasari-audio-v1';
const au = { ctx: null, buffers: {}, loading: {}, used: [], cur: null, voices: [], loops: {}, set: { bgm: 1, sfx: 1, amb: 1, mute: false },
  next: {}, lastHover: null, lastMoney: null, lastHour: null, ks: {} };
try { Object.assign(au.set, JSON.parse(localStorage.getItem(AUDIO_KEY)) || {}); } catch (e) { /* pengaturan default */ }
function audioSave() { try { localStorage.setItem(AUDIO_KEY, JSON.stringify(au.set)); } catch (e) { /* abaikan */ } }
/** AudioContext dibuat saat interaksi pertama (aturan browser: audio harus dimulai oleh pemain). */
function audioUnlock() {
  if (au.ctx) { if (au.ctx.state === 'suspended' && !document.hidden) au.ctx.resume(); return; }
  const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
  const c = au.ctx = new AC(), A = CFG.AUDIO;
  au.master = c.createGain(); au.master.connect(c.destination);
  au.bgmBus = c.createGain(); au.bgmLP = c.createBiquadFilter(); au.bgmLP.type = 'lowpass'; au.bgmLP.frequency.value = 20000;
  au.bgmBus.connect(au.bgmLP); au.bgmLP.connect(au.master);
  au.sfxBus = c.createGain(); au.sfxLP = c.createBiquadFilter(); au.sfxLP.type = 'lowpass'; au.sfxLP.frequency.value = A.SFX_LOWPASS;
  au.sfxBus.connect(au.sfxLP); au.sfxLP.connect(au.master);
  au.ambBus = c.createGain(); au.ambLP = c.createBiquadFilter(); au.ambLP.type = 'lowpass'; au.ambLP.frequency.value = 20000;
  au.ambBus.connect(au.ambLP); au.ambLP.connect(au.master);
  const n = c.sampleRate * 2, nb = au.noise = c.createBuffer(1, n, c.sampleRate), d = nb.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
  au.bgmBus.gain.value = 0; au.ambBus.gain.value = 0;
}
addEventListener('keydown', audioUnlock); addEventListener('mousedown', audioUnlock);
document.addEventListener('visibilitychange', () => { if (!au.ctx) return; if (document.hidden) au.ctx.suspend(); else au.ctx.resume(); });

// ---- Pemutar BGM ----
/** Ambil buffer BGM; kalau belum ada, mulai mendekode (sekali) dan kembalikan null. */
function bgmBuffer(name) {
  if (au.buffers[name]) return au.buffers[name];
  if (!au.loading[name] && window.BGM && BGM[name]) {
    au.loading[name] = true;
    fetch('data:audio/mpeg;base64,' + BGM[name]).then(r => r.arrayBuffer()).then(b => au.ctx.decodeAudioData(b))
      .then(buf => { au.buffers[name] = buf; au.loading[name] = false; })
      .catch(() => { au.loading[name] = false; });
  }
  return null;
}
/** Ganti lagu dengan crossfade. name null = memudar ke hening. */
function bgmPlay(name, fade = CFG.AUDIO.CROSSFADE) {
  const c = au.ctx, now = c.currentTime;
  if (au.cur) { const o = au.cur; o.g.gain.cancelScheduledValues(now); o.g.gain.setValueAtTime(o.g.gain.value, now); o.g.gain.linearRampToValueAtTime(0, now + fade); o.src.stop(now + fade + 0.05); au.cur = null; }
  if (!name) return true;
  const buf = au.buffers[name]; if (!buf) return false;
  const src = c.createBufferSource(), g = c.createGain(); src.buffer = buf; src.loop = true;
  g.gain.setValueAtTime(0, now); g.gain.linearRampToValueAtTime(1, now + fade); src.connect(g); g.connect(au.bgmBus); src.start(now);
  au.cur = { name, src, g };
  // simpan paling banyak 3 lagu terdekode supaya memori tidak membengkak
  au.used = [name, ...au.used.filter(n => n !== name)]; au.used.slice(3).forEach(n => { delete au.buffers[n]; }); au.used = au.used.slice(0, 3);
  return true;
}
const inClinic = () => S && S.where.type === 'room' && /^klinik/.test(S.where.room);
/** Lagu yang seharusnya diputar sekarang (prioritas GDD audio §3.2: event > romance > klinik > musim > hening malam). */
function bgmWanted() {
  if (game.scene === 'title' || game.scene === 'create') return 'main-theme';
  if (!S) return null;
  if (game.overlay && game.overlay.kind === 'letter') return 'main-theme';
  if (game.scene === 'trans') return au.cur ? au.cur.name : null;
  if (game.eventBgm) return 'event';          // diisi sistem event (Fase 3b)
  if (game.romanceBgm) return 'romance';      // diisi event romance (Fase 3a)
  if (inClinic() && S.clinicStage >= 1) return 'klinik';
  if (S.time >= CFG.AUDIO.NIGHT_BGM_START * 60 || S.time < 6 * 60) return 'malam'; /* [3b] BGM malam 18-24 (user) menggantikan hening malam */
  return 'musim-' + season().key;
}

// ---- Sintesis SFX ----
function sfxVoice(stopAt, nodes) {
  au.voices.push({ stopAt, nodes }); const now = au.ctx.currentTime;
  au.voices = au.voices.filter(v => v.stopAt > now);
  while (au.voices.length > CFG.AUDIO.MAX_VOICES) { const v = au.voices.shift(); v.nodes.forEach(n => { try { n.stop(); } catch (e) { /* sudah berhenti */ } }); }
}
/** Nada dengan amplop: o = { type, f, f1 (glide), t (mulai, detik dari sekarang), d (durasi), v (volume), a (attack), vib, out, pan }. */
function tone(o) {
  const c = au.ctx, t0 = c.currentTime + (o.t || 0), d = o.d || 0.1, osc = c.createOscillator(), g = c.createGain();
  osc.type = o.type || 'sine'; osc.frequency.setValueAtTime(o.f, t0); if (o.f1) osc.frequency.exponentialRampToValueAtTime(o.f1, t0 + d);
  if (o.vib) { const l = c.createOscillator(), lg = c.createGain(); l.frequency.value = o.vib[0]; lg.gain.value = o.vib[1]; l.connect(lg); lg.connect(osc.frequency); l.start(t0); l.stop(t0 + d + 0.05); }
  const a = o.a || 0.005; g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(o.v || 0.1, t0 + a); g.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
  let node = g; if (o.pan != null && c.createStereoPanner) { const p = c.createStereoPanner(); p.pan.value = o.pan; g.connect(p); node = p; }
  osc.connect(g); node.connect(o.out || au.sfxBus); osc.start(t0); osc.stop(t0 + d + 0.02); sfxVoice(t0 + d, [osc]);
}
/** Semburan noise berfilter: o = { t, d, v, ft (jenis filter), f, f1, q, a, out }. */
function noise(o) {
  const c = au.ctx, t0 = c.currentTime + (o.t || 0), d = o.d || 0.05, src = c.createBufferSource(), fl = c.createBiquadFilter(), g = c.createGain();
  src.buffer = au.noise; src.playbackRate.value = o.rate || 1; fl.type = o.ft || 'bandpass'; fl.frequency.setValueAtTime(o.f || 1000, t0); if (o.f1) fl.frequency.exponentialRampToValueAtTime(o.f1, t0 + d); fl.Q.value = o.q || 1;
  const a = o.a || 0.004; g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(o.v || 0.1, t0 + a); g.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
  src.connect(fl); fl.connect(g); g.connect(o.out || au.sfxBus); src.start(t0, Math.random()); src.stop(t0 + d + 0.02); sfxVoice(t0 + d, [src]);
}
/** Nada marimba: sinus dasar + parsial 4× yang cepat hilang. */
const marimba = (f, t = 0, v = 0.12, out) => { tone({ f, t, d: 0.45, v, out }); tone({ f: f * 4, t, d: 0.06, v: v * 0.35, out }); };
/** Lonceng: parsial tak harmonis yang meluruh pelan. */
const bell = (f, t = 0, v = 0.08, d = 0.9, out) => { [1, 2.76, 5.4].forEach((k, i) => tone({ f: f * k, t, d: d / (1 + i * 0.8), v: v / (1 + i * 1.5), out })); };
/** Petikan gitar (Karplus-Strong), di-cache per nada. */
function pluck(f, t = 0, v = 0.25, out) {
  const c = au.ctx, key = Math.round(f);
  if (!au.ks[key]) { const n = Math.floor(c.sampleRate * 1.6), b = c.createBuffer(1, n, c.sampleRate), d = b.getChannelData(0), p = Math.round(c.sampleRate / f);
    for (let i = 0; i < p; i++) d[i] = Math.random() * 2 - 1; for (let i = p; i < n; i++) d[i] = 0.996 * 0.5 * (d[i - p] + d[i - p + 1]); au.ks[key] = b; }
  const src = c.createBufferSource(), g = c.createGain(), t0 = c.currentTime + t; src.buffer = au.ks[key]; g.gain.value = v; src.connect(g); g.connect(out || au.sfxBus); src.start(t0); sfxVoice(t0 + 1.6, [src]);
}
/** Tiupan seperti suling: sinus + vibrato + desah napas. */
const flute = (f, t, d, v = 0.07) => { tone({ f, t, d, v, a: 0.06, vib: [5.5, f * 0.012] }); noise({ t, d: d * 0.6, v: v * 0.25, f: f * 2, q: 2, a: 0.05 }); };
/** Nada piano lembut: sinus + segitiga oktaf. */
const piano = (f, t, v = 0.09) => { tone({ f, t, d: 1.4, v }); tone({ f: f * 2, t, d: 0.7, v: v * 0.3, type: 'triangle' }); };

/** Kamus SFX (ID sesuai design/gdd/audio.md §4). */
const SFX = {
  ui_hover: () => tone({ f: 1400, f1: 1250, d: 0.035, v: 0.03, type: 'triangle' }),
  ui_click: () => { noise({ d: 0.025, v: 0.16, f: 2600, q: 6 }); tone({ f: 880, d: 0.05, v: 0.06, type: 'triangle' }); tone({ f: 1175, t: 0.035, d: 0.05, v: 0.05, type: 'triangle' }); },
  ui_tick: (dir = 1) => marimba(dir > 0 ? 784 : 659, 0, 0.07),
  ui_open: () => { noise({ d: 0.14, v: 0.05, ft: 'highpass', f: 1800, f1: 3500, a: 0.03 }); marimba(523, 0, 0.08); marimba(784, 0.07, 0.08); },
  ui_close: () => { noise({ d: 0.1, v: 0.035, ft: 'highpass', f: 3000, f1: 1500, a: 0.02 }); marimba(659, 0, 0.06); marimba(440, 0.06, 0.06); },
  ui_deny: () => { tone({ f: 392, f1: 349, d: 0.09, v: 0.08, type: 'triangle' }); tone({ f: 330, f1: 294, t: 0.1, d: 0.12, v: 0.08, type: 'triangle' }); },
  ui_type: () => noise({ d: 0.018, v: 0.1, f: 2600 + Math.random() * 800, q: 5 }),
  paper_flip: () => noise({ d: 0.2, v: 0.07, f: 1500, f1: 4000, q: 0.8, a: 0.04 }),
  coin_in: (n = 1) => { for (let i = 0; i < n; i++) { tone({ f: 1975, t: i * 0.08, d: 0.25, v: 0.06 }); tone({ f: 2637, t: i * 0.08 + 0.03, d: 0.3, v: 0.05 }); } },
  coin_out: () => { tone({ f: 1318, f1: 1100, d: 0.18, v: 0.05 }); noise({ t: 0.12, d: 0.08, v: 0.08, ft: 'lowpass', f: 700 }); },
  save_ok: () => bell(1568, 0, 0.05, 0.8),
  morning: () => { SFX.rooster(); [392, 494, 587].forEach((f, i) => pluck(f, 1.0 + i * 0.16, 0.22)); pluck(784, 1.5, 0.18); },
  season_kemarau: () => [523, 659, 784, 880, 1047].forEach((f, i) => flute(f, i * 0.18, i === 4 ? 0.9 : 0.22)),
  season_hujan: () => [440, 523, 659, 784, 880].forEach((f, i) => piano(f, i * 0.28, 0.07)),
  clock_late: () => { bell(523, 0, 0.07, 1.4); bell(523, 0.9, 0.07, 1.4); },
  sleep: () => [1568, 1318, 1047].forEach((f, i) => { tone({ f, t: i * 0.32, d: 0.8, v: 0.05 }); tone({ f: f * 3, t: i * 0.32, d: 0.2, v: 0.015 }); }),
  faint: () => { tone({ f: 620, f1: 140, d: 0.9, v: 0.07, type: 'triangle', vib: [9, 25] }); noise({ t: 0.85, d: 0.25, v: 0.15, ft: 'lowpass', f: 300 }); },
  pause_on: () => { noise({ d: 0.02, v: 0.1, f: 2200, q: 4 }); tone({ f: 660, f1: 440, d: 0.12, v: 0.05, type: 'triangle' }); },
  pause_off: () => { noise({ d: 0.02, v: 0.1, f: 2200, q: 4 }); tone({ f: 440, f1: 660, d: 0.12, v: 0.05, type: 'triangle' }); },
  step_g: () => noise({ d: 0.07, v: 0.035, f: 2200 + Math.random() * 900, q: 0.8, a: 0.01 }),
  step_d: () => noise({ d: 0.06, v: 0.05, ft: 'lowpass', f: 900 + Math.random() * 300, a: 0.006 }),
  step_c: () => { noise({ d: 0.035, v: 0.045, f: 1700 + Math.random() * 400, q: 3 }); tone({ f: 300 + Math.random() * 60, d: 0.03, v: 0.02 }); },
  step_wood: () => { tone({ f: 180 + Math.random() * 30, f1: 110, d: 0.07, v: 0.08 }); noise({ d: 0.04, v: 0.03, ft: 'lowpass', f: 700 }); },
  step_tile: () => { noise({ d: 0.03, v: 0.04, f: 3200 + Math.random() * 500, q: 4 }); tone({ f: 900, d: 0.025, v: 0.012 }); },
  step_soft: () => noise({ d: 0.07, v: 0.025, ft: 'lowpass', f: 500 }),
  door_open: () => { tone({ f: 300, f1: 430, d: 0.28, v: 0.025, type: 'sawtooth', vib: [22, 18] }); noise({ d: 0.02, v: 0.1, f: 1800, q: 4 }); },
  door_close: () => { tone({ f: 120, f1: 80, d: 0.14, v: 0.12 }); noise({ d: 0.07, v: 0.06, ft: 'lowpass', f: 600 }); },
  door_bell: () => { bell(2093, 0, 0.04, 0.7); bell(2637, 0.09, 0.035, 0.7); bell(2093, 0.18, 0.025, 0.6); },
  zone_go: () => noise({ d: 0.7, v: 0.07, ft: 'lowpass', f: 300, f1: 1400, a: 0.3, q: 0.7 }),
  bed: () => noise({ d: 0.45, v: 0.07, ft: 'lowpass', f: 900, f1: 400, a: 0.08 }),
  // Fase 2b: reputasi, energi, pasien, kursi dental, kumur (audio.md §4.1–4.5) + sweep (bersih-bersih, ID baru)
  rep_up: () => { [1047, 1319, 1568].forEach((f, i) => marimba(f, i * 0.09, 0.08)); bell(2093, 0.27, 0.035, 0.7); },
  rep_down: () => { marimba(523, 0, 0.07); tone({ f: 392, f1: 330, t: 0.12, d: 0.35, v: 0.06, type: 'triangle' }); },
  low_energy: () => { tone({ f: 85, f1: 60, d: 0.16, v: 0.2 }); tone({ f: 75, f1: 55, t: 0.22, d: 0.2, v: 0.14 }); },
  patient_in: () => { SFX.door_bell(); [0.35, 0.6, 0.85].forEach(t => tone({ f: 170 + Math.random() * 30, f1: 110, t, d: 0.07, v: 0.05 })); },
  patient_happy: (t = 0) => { tone({ f: 330, f1: 440, t, d: 0.18, v: 0.05, type: 'triangle', vib: [6, 6] }); tone({ f: 440, f1: 587, t: t + 0.2, d: 0.25, v: 0.05, type: 'triangle', vib: [6, 8] }); },
  patient_sad: () => { noise({ d: 0.5, v: 0.03, ft: 'lowpass', f: 900, f1: 400, a: 0.1 }); tone({ f: 330, f1: 247, d: 0.55, v: 0.045, type: 'triangle', a: 0.05 }); },
  chair_up: (t = 0) => { tone({ f: 90, f1: 170, t, d: 0.6, v: 0.035, type: 'sawtooth', a: 0.08 }); noise({ t, d: 0.6, v: 0.025, ft: 'lowpass', f: 400, a: 0.1 }); },
  chair_down: (t = 0) => { tone({ f: 170, f1: 90, t, d: 0.6, v: 0.035, type: 'sawtooth', a: 0.08 }); noise({ t, d: 0.6, v: 0.025, ft: 'lowpass', f: 400, a: 0.1 }); },
  rinse: () => { for (let i = 0; i < 4; i++) noise({ t: i * 0.11, d: 0.09, v: 0.06, f: 500 + i * 60, q: 4 }); noise({ t: 0.55, d: 0.07, v: 0.07, f: 2400, q: 2 }); noise({ t: 0.7, d: 0.6, v: 0.04, f: 1800, q: 0.7, a: 0.08 }); },
  // Fase 2c: alat periksa (audio.md §4.4)
  mirror_tink: () => { tone({ f: 2800, d: 0.09, v: 0.03 }); tone({ f: 4200, t: 0.03, d: 0.07, v: 0.015 }); },
  cold_spray: () => { noise({ d: 0.22, v: 0.06, ft: 'highpass', f: 3000, a: 0.01 }); [3136, 3951, 3520].forEach((f, i) => tone({ f, t: 0.18 + i * 0.05, d: 0.08, v: 0.015 })); },
  perc_tap: () => { tone({ f: 260, f1: 180, d: 0.06, v: 0.08 }); tone({ f: 260, f1: 180, t: 0.14, d: 0.06, v: 0.06 }); },
  probe_click: () => { for (let i = 0; i < 3; i++) noise({ t: i * 0.06, d: 0.012, v: 0.08, f: 3800, q: 6 }); },
  xray: () => { tone({ f: 110, d: 0.7, v: 0.05, type: 'sawtooth', a: 0.05 }); tone({ f: 220, d: 0.7, v: 0.025, type: 'triangle', a: 0.05 }); tone({ f: 1760, t: 0.75, d: 0.25, v: 0.05 }); noise({ t: 0.95, d: 0.25, v: 0.05, f: 1800, f1: 900, q: 1.2, a: 0.03 }); }, // [2e] audio.md §4.4
  bp_pump: () => { [0, 0.22, 0.44].forEach(t => noise({ t, d: 0.12, v: 0.05, ft: 'lowpass', f: 700, a: 0.03 })); noise({ t: 0.7, d: 0.5, v: 0.04, ft: 'highpass', f: 2500, a: 0.02 }); },
  // Fase 2d: alat tindakan & umpan balik minigame (audio.md §4.4). Tanpa bunyi ngilu: bor & alat tajam versi kartun bernada rendah.
  lamp_on: () => { noise({ d: 0.02, v: 0.12, f: 2400, q: 5 }); tone({ f: 120, d: 0.5, v: 0.018, type: 'triangle', a: 0.1 }); },
  suction: () => noise({ d: 0.45, v: 0.05, f: 900, f1: 1400, q: 1.5, a: 0.06 }),
  air_water: () => noise({ d: 0.28, v: 0.035, ft: 'highpass', f: 2500, a: 0.05 }),
  drill_low: () => { tone({ f: 150 + Math.random() * 10, d: 0.14, v: 0.025, type: 'sawtooth', a: 0.01 }); noise({ d: 0.14, v: 0.02, ft: 'lowpass', f: 700 }); },
  drill_oops: () => { tone({ f: 220, f1: 110, d: 0.25, v: 0.12, type: 'triangle' }); noise({ t: 0.2, d: 0.35, v: 0.04, ft: 'lowpass', f: 600, f1: 300, a: 0.05 }); },
  scale_ultra: () => noise({ d: 0.12, v: 0.03, f: 5200 + Math.random() * 600, q: 6 }), // [2e-rev] dengung tinggi + percikan air
  scale_scrape: () => noise({ d: 0.05, v: 0.045, f: 1700 + Math.random() * 500, q: 3 }),
  polish: () => { tone({ f: 260, d: 0.14, v: 0.018, type: 'triangle', vib: [30, 20] }); noise({ d: 0.14, v: 0.018, ft: 'lowpass', f: 1200 }); },
  inject: () => { noise({ d: 0.5, v: 0.03, ft: 'highpass', f: 2000, a: 0.1 }); tone({ f: 180, f1: 160, t: 0.3, d: 0.35, v: 0.035, type: 'triangle', a: 0.05 }); },
  etch_brush: () => noise({ d: 0.18, v: 0.04, f: 3000, f1: 2000, q: 1, a: 0.03 }),
  fill_press: () => { tone({ f: 330, f1: 220, d: 0.09, v: 0.07 }); noise({ d: 0.04, v: 0.03, ft: 'lowpass', f: 800 }); },
  bite_tap: () => { tone({ f: 900, d: 0.03, v: 0.05, type: 'triangle' }); tone({ f: 900, t: 0.09, d: 0.03, v: 0.05, type: 'triangle' }); },
  elevator: () => tone({ f: 200, f1: 250, d: 0.22, v: 0.025, type: 'sawtooth', vib: [25, 15] }),
  wiggle: (hard) => { if (hard) { noise({ d: 0.07, v: 0.1, f: 700, q: 1.5 }); bell(330, 0.04, 0.04, 0.5); } else noise({ d: 0.06, v: 0.06, f: 1000, q: 2 }); },
  tooth_pop: () => { tone({ f: 500, f1: 1200, d: 0.08, v: 0.08 }); tone({ f: 2093, t: 0.08, d: 0.2, v: 0.03 }); tone({ f: 2637, t: 0.14, d: 0.25, v: 0.025 }); },
  gauze: () => noise({ d: 0.25, v: 0.04, ft: 'lowpass', f: 1400, a: 0.05 }),
  mg_hit: (n = 1) => marimba(523 * Math.pow(2, Math.min(n, 8) / 12 * 2), 0, 0.08),
  mg_miss: () => { tone({ f: 180, f1: 140, d: 0.08, v: 0.08 }); noise({ d: 0.04, v: 0.04, ft: 'lowpass', f: 500 }); },
  pain_up: () => tone({ f: 330, f1: 250, d: 0.14, v: 0.04, type: 'triangle', vib: [12, 10] }),
  result_perfect: () => { [523, 659, 784, 1047].forEach((f, i) => marimba(f, i * 0.1, 0.09)); bell(2093, 0.42, 0.04, 0.9); },
  result_good: () => [523, 659, 784].forEach((f, i) => marimba(f, i * 0.1, 0.09)),
  result_ok: () => { marimba(523, 0, 0.08); marimba(587, 0.13, 0.08); },
  result_fail: () => { tone({ f: 392, f1: 370, d: 0.25, v: 0.06, type: 'triangle' }); tone({ f: 330, f1: 311, t: 0.22, d: 0.4, v: 0.06, type: 'triangle' }); },
  sweep: () => { for (let i = 0; i < 3; i++) noise({ t: i * 0.17, d: 0.15, v: 0.06, ft: 'highpass', f: 2200, f1: 4200, a: 0.03 }); },
  rooster: () => { const k = (f, f1, t, d) => tone({ f, f1, t, d, v: 0.03, type: 'sawtooth', vib: [30, f * 0.04], a: 0.03 }); k(520, 640, 0, 0.12); k(640, 560, 0.14, 0.12); k(700, 760, 0.3, 0.14); k(760, 520, 0.46, 0.55); },
};
/** Mainkan SFX (diam kalau audio belum aktif). */
function sfx(id, ...a) { if (!au.ctx || au.set.mute || !SFX[id]) return; try { SFX[id](...a); } catch (e) { /* jangan sampai suara menghentikan game */ } }
/** Jenis langkah sesuai pijakan: tanah zona (terrainAt v3) atau lantai interior. */
function stepSound() {
  const w = game.world; if (!w) return 'step_g';
  if (w.type === 'room') { const f = (ROOMS3[w.key] || {}).floor || ''; return /plank|parquet/.test(f) ? 'step_wood' : /carpet/.test(f) ? 'step_soft' : 'step_tile'; }
  const t = terrainAt(Math.round(S.px), Math.round(S.py), w.def || []);
  return t === 'd' || t === 's' ? 'step_d' : t === 'c' || t === 'p' ? 'step_c' : 'step_g';
}

// ---- Suara lingkungan (loop noise + kejadian acak) ----
/** Loop noise berfilter yang volumenya diatur tiap frame. */
function ambLoop(id, ft, f, q, rate = 1) {
  if (au.loops[id]) return au.loops[id];
  const c = au.ctx, src = c.createBufferSource(), fl = c.createBiquadFilter(), g = c.createGain();
  src.buffer = au.noise; src.loop = true; src.playbackRate.value = rate; fl.type = ft; fl.frequency.value = f; fl.Q.value = q; g.gain.value = 0;
  src.connect(fl); fl.connect(g); g.connect(au.ambBus); src.start(); return au.loops[id] = { src, fl, g };
}
const setLoop = (id, v, k = 0.4) => { const l = au.loops[id]; if (l) l.g.gain.setTargetAtTime(v, au.ctx.currentTime, k); };
/** Kejadian acak: jalankan fn bila waktunya tiba, lalu jadwalkan ulang antara a–b detik. */
function every(id, a, b, fn) { const now = au.ctx.currentTime; if (au.next[id] == null) au.next[id] = now + a * Math.random(); if (now >= au.next[id]) { fn(); au.next[id] = now + a + Math.random() * (b - a); } }
const AO = () => au.ambBus;
function ambience() {
  const play = game.scene === 'play' && S && game.world, w = game.world, h = S ? S.time / 60 : 0, hujan = S && season().key === 'hujan';
  ambLoop('rain', 'lowpass', 2400, 0.4); ambLoop('rainHi', 'bandpass', 4200, 0.7, 0.8); ambLoop('cicada', 'bandpass', 4300, 6); ambLoop('fountain', 'bandpass', 1300, 0.8); ambLoop('market', 'bandpass', 550, 1.4, 0.5);
  setLoop('rain', play && hujan ? 0.32 : 0, 1); setLoop('rainHi', play && hujan ? 0.06 : 0, 1);
  const cic = play && !hujan && h >= 11 && h < 15 && w.type === 'zone' ? 0.012 * (0.6 + 0.4 * Math.sin(au.ctx.currentTime * 0.8)) : 0; setLoop('cicada', cic, 0.6);
  const near = (x, y, r) => w && w.type === 'zone' ? clamp(1 - Math.hypot(S.px - x, S.py - y) / r, 0, 1) : 0;
  setLoop('fountain', play && w.id === 'alun' ? 0.09 * near(418, 300, 160) : 0, 0.3);
  setLoop('market', play && (w.id === 'alun' || w.id === 'niaga') ? 0.05 * Math.max(near(w.id === 'alun' ? 330 : 470, w.id === 'alun' ? 350 : 310, 170), w.id === 'alun' ? near(545, 330, 140) : 0) : 0, 0.5);
  if (!play) return;
  const out = w.type === 'zone';
  if (!hujan && h >= 6 && h < 11) every('birds', 2, 6, () => { const b = 2200 + Math.random() * 1400, n = 2 + (Math.random() * 3 | 0), pan = Math.random() * 1.6 - 0.8;
    for (let i = 0; i < n; i++) tone({ f: b, f1: b * (1.3 + Math.random() * 0.3), t: i * 0.11, d: 0.07, v: out ? 0.02 : 0.008, out: AO(), pan }); });
  if (!hujan && h >= 18) every('crickets', 0.7, 1.4, () => { const pan = Math.random() * 1.4 - 0.7; for (let i = 0; i < 3; i++) tone({ f: 3900, t: i * 0.05, d: 0.035, v: out ? 0.01 : 0.004, out: AO(), pan }); });
  if (hujan && h >= 18) every('frogs', 1.2, 3.5, () => { const f = 120 + Math.random() * 60, pan = Math.random() * 1.4 - 0.7; for (let i = 0; i < 2; i++) tone({ f, f1: f * 0.8, t: i * 0.16, d: 0.12, v: out ? 0.045 : 0.02, type: 'sawtooth', out: AO(), pan }); });
  if (hujan) every('thunder', 60, 120, () => noise({ d: 3.5, v: 0.12, ft: 'lowpass', f: 160, f1: 60, a: 0.6, out: AO() }));
  if (!hujan && h >= 11 && h < 17) every('wind', 12, 25, () => noise({ d: 2.5, v: 0.05, ft: 'bandpass', f: 400, f1: 900, q: 0.7, a: 1, out: AO() }));
  if (out && w.id === 'niaga') every('motor', 40, 80, () => { const c = au.ctx; if (!c.createStereoPanner) return; const t0 = c.currentTime, o = c.createOscillator(), g = c.createGain(), p = c.createStereoPanner(), fl = c.createBiquadFilter();
    o.type = 'sawtooth'; o.frequency.setValueAtTime(95, t0); o.frequency.linearRampToValueAtTime(75, t0 + 3); fl.type = 'lowpass'; fl.frequency.value = 500; p.pan.setValueAtTime(-1, t0); p.pan.linearRampToValueAtTime(1, t0 + 3);
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.03, t0 + 1.4); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 3); o.connect(fl); fl.connect(g); g.connect(p); p.connect(AO()); o.start(t0); o.stop(t0 + 3.05); });
  const hr = Math.floor(h);
  if (au.lastHour !== null && hr !== au.lastHour) { if (hr === 22) sfx('clock_late'); }
  au.lastHour = hr;
}

// ---- Pengatur audio per langkah ----
function updateAudio() {
  if (!au.ctx) return;
  const A = CFG.AUDIO, now = au.ctx.currentTime, set = au.set;
  au.master.gain.setTargetAtTime(set.mute ? 0 : 1, now, 0.05);
  au.sfxBus.gain.setTargetAtTime(set.sfx * A.SFX_VOL, now, 0.05);
  // BGM: pilih lagu, crossfade (memudar lebih lama saat masuk malam)
  const want = bgmWanted(), cur = au.cur ? au.cur.name : null;
  if (want !== cur) { if (!want) bgmPlay(null, S && S.time >= A.NIGHT_FADE_START * 60 ? A.NIGHT_FADE : A.CROSSFADE); else if (bgmBuffer(want)) bgmPlay(want); }
  const indoor = game.scene === 'play' && S && S.where.type === 'room' && !(inClinic() && cur === 'klinik');
  const held = game.scene === 'play' && S && (S.paused || (game.overlay && game.overlay.kind !== 'letter'));
  au.bgmLP.frequency.setTargetAtTime(indoor ? A.INDOOR_LOWPASS : 20000, now, 0.25);
  au.bgmBus.gain.setTargetAtTime(set.bgm * A.BGM_VOL * (indoor ? A.INDOOR_VOL : 1) * (held ? A.PAUSE_BGM_VOL : 1), now, 0.25);
  // suara lingkungan: teredam di dalam ruangan, berhenti saat jeda/menu/dialog
  const ambOn = game.scene === 'play' && S && !held && !game.fade;
  au.ambLP.frequency.setTargetAtTime(indoor || (S && S.where.type === 'room') ? 700 : 20000, now, 0.3);
  au.ambBus.gain.setTargetAtTime(ambOn ? set.amb * A.AMB_VOL * (S.where.type === 'room' ? 0.55 : 1) : 0, now, 0.3);
  ambience();
  // uang berubah → koin
  if (S && game.scene === 'play') { if (au.lastMoney != null && S.money !== au.lastMoney) sfx(S.money > au.lastMoney ? 'coin_in' : 'coin_out', clamp(Math.ceil(Math.abs(S.money - au.lastMoney) / 1e6), 1, 3)); au.lastMoney = S.money; } else au.lastMoney = null;
}
/** Suara UI generik: sorot, klik, panah di menu/layar UI. Dipanggil di awal step sebelum input diproses. */
function uiSounds() {
  const m = input.mouse, h = topHit(m), id = h ? h.id : null;
  if (id && id !== au.lastHover && !/^cal\d/.test(id)) sfx('ui_hover'); au.lastHover = id;
  const ui = game.scene === 'title' || game.scene === 'create' || (game.scene === 'play' && game.overlay && !game.overlay.closing);
  if (input.click && topHit(input.click)) sfx('ui_click');
  else if (ui && okHit()) sfx('ui_click');
  if (ui && !game.textInput && (hit('up') || hit('down') || hit('left') || hit('right') || hit('tab'))) sfx('ui_tick', hit('up') || hit('left') ? -1 : 1);
  if (ui && game.textInput && (input.typed.length || hit('up') || hit('down'))) sfx(input.typed.length ? 'ui_type' : 'ui_tick');
}

// ---- Pengaturan audio (menu Esc) ----
function openSettings() {
  const rows = [['bgm', 'Musik'], ['sfx', 'Efek suara'], ['amb', 'Suara lingkungan'], ['mute', 'Bisu (M)']];
  const adj = (k, d) => { if (k === 'mute') au.set.mute = !au.set.mute; else au.set[k] = clamp(Math.round((au.set[k] + d) * 10) / 10, 0, 1); audioSave(); if (k === 'sfx') sfx('ui_tick', d); };
  openOverlay({ kind: 'settings', sel: 0, t: 0,
    update() {
      this.t++; const k = rows[this.sel][0];
      if (hit('up')) this.sel = (this.sel + rows.length - 1) % rows.length; if (hit('down')) this.sel = (this.sel + 1) % rows.length;
      if (hit('left')) adj(k, -0.1); if (hit('right')) adj(k, 0.1); if (okHit() && k === 'mute') adj(k, 0);
      if (hit('esc') && this.t > 1) return closeOverlay(openMenu);
      if (input.click) { const h = topHit(input.click, /^st/); if (h) h.fn(); }
    },
    drawHD() {
      hDim(this, .45);
      dropIn(this, 130, 54, 220, 158, () => {
        hBox(130, 54, 220, 158, 'paper', { ornate: true });
        HT('Pengaturan', 240, 64, MGC.ink, { k: 4, sh: '#e8b878', align: 'c' }); hDivider(144, 90, 192);
        rows.forEach(([k, label], i) => {
          const Y = 100 + i * 24, s = i === this.sel;
          if (s) { hBox(140, Y - 3, 200, 21, 'gold', { thin: true, shadow: false }); hGlow(140, Y - 3, 200, 21); }
          clickable(140, Y - 3, 200, 21, () => { this.sel = i; }, 'str' + i);
          HT(label, 148, Y + 4, MGC.ink, { bold: s });
          if (k === 'mute') { hBtn(282, Y - 1, 50, 17, au.set.mute ? 'Ya' : 'Tidak', { kind: au.set.mute ? 'gold' : 'paper', bold: true, shadow: false }); clickable(282, Y - 1, 50, 17, () => { this.sel = i; adj('mute', 0); }, 'stm'); }
          else {
            const v = au.set[k], X = 240, W = 66; hBar(X, Y + 1, W, 11, v, '#e8a020');
            HT(Math.round(v * 100) + '%', 336, Y + 4, MGC.ink2, { align: 'r' });
            clickable(X, Y - 2, W, 18, () => { this.sel = i; const m = input.click || input.mouse; au.set[k] = clamp(Math.round((m.x - X) / W * 10) / 10, 0, 1); audioSave(); }, 'stb' + i);
          }
        });
        HT('↑↓ pilih · ◀ ▶ atur · Esc kembali', 240, 198, MGC.ink2, { align: 'c' });
      });
    } });
}

// ---- Bangunan & interior sesuai tahap ----
function extKey(k0) {
  if (/^klinik/.test(k0)) return CFG.CLINIC_EXT[S ? S.clinicStage : 0];
  if (/^rumah/.test(k0)) return !S || S.homeLv === 1 ? 'rumahK' : 'rumah' + S.homeLv; // [kos] Lv 1 = rumah Lv 2 + papan DIKONTRAK
  return k0;
}
function roomOf(k) {
  if (/^klinik/.test(k)) return CFG.CLINIC_ROOM[S.clinicStage];
  if (/^rumah/.test(k)) return 'rumah' + Math.max(2, S.homeLv); // [kos] Lv 1: pintu terkunci, E = panel kontrak
  if (k === 'losmen') return 'losmenL';
  if (k === 'bahari') return 'bahari2'; // [2f] interior Alat & Bahan
  return ROOMS3[k] ? k : null;
}
function roomTitle(k) {
  if (/^klinik/.test(k)) return S.clinicStage === 0 ? 'Ruko Tua' : (ROOMS3[k].name.split('·')[1] || 'Klinik').trim();
  return (ROOMS3[k] ? ROOMS3[k].name : k).replace(/\s*\(.*\)\s*/, '').trim();
}
/** Pintu rumah pemain di Kampung Asri (untuk keluar setelah bangun). */
function homeDoor() {
  const b = ZONES.kampung.blds.find(b => /^rumah/.test(b[0])); const img = EXT[extKey(b[0])];
  return { zone: 'kampung', x: b[1] + ((img.cw || img.width) >> 1) + (DOOR_DX[extKey(b[0])] || 0), y: b[2] + 10 };
}
/** [kos] Kamar pemain di rumah Lv 1 = Kos Melati kamar 5 (interior Kamar Sewa lama). */
ROOMS3.kosK = { ...ROOMS3.rumah1, name: 'Kos Melati · Kamar 5' };
/** [kos] Pintu kamar 5 di dinding ruang bersama Kos Melati (wDoor5 di rooms.js, x 242, lebar 22). */
const KOS5_X = 253;
const homeRoom = () => S.homeLv === 1 ? 'kosK' : 'rumah' + S.homeLv;
/** Posisi berdiri di depan pintu kamar 5 (ruang bersama Kos Melati). */
function kos5Door() { return { inRoom: 'kos', x: KOS5_X, y: getRoom('kos').floorTop + 12 }; }
/** Pintu luar zona untuk sebuah ruangan (dicari di semua zona). */
function zoneDoorOf(room) { for (const z in ZONES) { const x = getZone(z).doors.find(x => x.room === room); if (x) return { zone: z, x: x.x, y: x.y }; } return null; }

// ---- Tabrakan ----
/** Rentang kolom tak-transparan pada satu baris gambar. */
function alphaSpan(img, row) {
  const d = img.getContext('2d').getImageData(0, clamp(row, 0, img.height - 1), img.width, 1).data; let a = -1, b = -1;
  for (let i = 0; i < img.width; i++) if (d[i * 4 + 3] > 100) { if (a < 0) a = i; b = i; }
  return a < 0 ? [0, img.width - 1] : [a, b];
}
/** Kotak alas benda (bagian yang menyentuh tanah). */
function footprint(e) {
  const w = e.img.width, h = e.img.height;
  if (e.kind === 'bld') { const [a, b] = alphaSpan(e.img, h - 4); const top = Math.round(h * 0.42); return [e.X + a + 2, e.Y + top, b - a - 3, h - top - 4]; }
  if (e.kind === 'tree') return [e.X + (w >> 1) - 4, e.Y + h - 8, 8, 6];
  if (e.kind === 'sign') return [e.X + (w >> 1) - 3, e.Y + h - 6, 6, 5]; // papan petunjuk: hanya tiangnya
  if (w <= 12 && h >= 20) return [e.X + 1, e.Y, w - 2, h]; // tiang/pagar tegak: penuh supaya ruas pagar tidak berlubang
  const dep = w >= 40 ? Math.round(h * 0.55) : Math.min(14, Math.round(h * 0.35)) + 2;
  return [e.X + Math.round(w * 0.1), e.Y + h - dep, Math.round(w * 0.8), dep - 1];
}
const FEET = [-5, -3, 10, 5];
const feetBox = (x, y) => [x + FEET[0], y + FEET[1], FEET[2], FEET[3]];
/** Indeks semua kotak tabrakan yang disentuh kaki di (x, y). */
function hitSet(w, x, y) { const f = feetBox(x, y), out = []; w.solids.forEach((r, i) => { if (overlap(f, r)) out.push(i); }); return out; }
function blocked(w, x, y) { const f = feetBox(x, y); return w.solids.some(r => overlap(f, r)); }
/** Gerak per sumbu supaya pemain bisa meluncur di sepanjang dinding. */
function moveWithCollision(w, dx, dy) {
  // terjebak di dalam benda: boleh bergerak asal tidak masuk ke benda lain
  const stuck = hitSet(w, S.px, S.py), ok = (x, y) => { const n = hitSet(w, x, y); return n.every(i => stuck.includes(i)); };
  if (dx && ok(S.px + dx, S.py)) S.px += dx;
  if (dy && ok(S.px, S.py + dy)) S.py += dy;
  S.px = clamp(S.px, 6, w.w - 6); S.py = clamp(S.py, 8, w.h - 2);
}

// ---- Zona kota (adaptasi drawZone v3: tanah dipanggang, objek tinggi diurutkan per frame) ----
function zoneKey(id) { return id + '|' + season().key + '|' + S.clinicStage + '|' + S.homeLv; }
function getZone(id) { const k = zoneKey(id); return game.zoneCache[k] || (game.zoneCache[k] = buildZone(id, PAL[season().key])); }
function buildZone(id, pal) {
  const cfg = ZONES[id], info = ZINFO[id], Wz = cfg.w || 768, Hz = cfg.h || ZH; // [2f] zona 1 layar (Tanjung Arum) punya tinggi sendiri
  const def = [...cfg.def], blds = [];
  cfg.blds.forEach(([k0, X, Yb, roadY]) => {
    const k = extKey(k0), img = EXT[k], Y = Yb - img.height, dx = X + ((img.cw || img.width) / 2 | 0) - 7;
    if (roadY != null) def.push(['d', dx, Yb - 6, 14, roadY - Yb + 8, 3]);
    blds.push({ k, k0, img, X, Y, Yb, cx: dx + 7 + (DOOR_DX[k] || 0) });
  });
  const [bg, x] = cv(Wz, Hz);
  paintTerrain(x, Wz, Hz, pal, def, cfg.seed || 1);
  (cfg.ground || []).forEach(f => f(x, pal));
  (cfg.exits || []).forEach(([a, b, d]) => { if (d === 'D') { x.fillStyle = 'rgba(255,246,210,.55)'; for (let k = 0; k < 3; k++) for (let t = 0; t < 4; t++) { x.fillRect(a - t, b - k * 6 - t, 1, 1); x.fillRect(a + t, b - k * 6 - t, 1, 1); } } else exitArrows(x, a, b, d); });
  const ents = [], bigRocks = []; const add = (img, X, Y, zb, sh, kind) => ents.push({ img, X, Y, z: Y + img.height + (zb || 0), sh, kind });
  blds.forEach(b => add(b.img, b.X, b.Y, 0, 2, 'bld'));
  (cfg.trees || []).forEach(([X, Y, r, s, f]) => add(tree(pal, r, s, f), X, Y, 0, 3, 'tree'));
  (cfg.props || []).forEach(([f, X, Y, zb]) => add(typeof f === 'function' ? f(pal) : f, X, Y, zb, 1, typeof f === 'function' && /signpost/.test(String(f)) ? 'sign' : typeof f === 'function' && /noticeBoard/.test(String(f)) ? 'board' : 'prop'));
  gardenZoneEnts(id).forEach(([img, X, Y, kind]) => add(img, X, Y, 0, 1, kind)); // [2g] bedeng halaman
  const blk = [...blds.map(p => [p.X, p.Y, p.img.width, p.img.height]), ...(cfg.block || [])];
  scatter(x, pal, cfg.seed * 7 || 3, cfg.fill || Math.round(110 * Wz / 768), [0, 30, Wz, Hz - 30], def, blk)
    .forEach(([X, Y, r]) => { if (r > .95) bigRocks.push(ents.length); add(r < .5 ? tuft(pal, r < .08) : r < .82 ? flowerPatch(pal, r < .62 ? pal.fl : r < .72 ? '#ffd23a' : '#c88aff') : rock(pal, r > .95), X, Y, 0, r >= .82 ? 1 : 0, 'deco'); });
  // bayangan (jatuh ke kanan-bawah), sama seperti drawZone
  ents.forEach(e => { if (!e.sh) return; if (e.sh === 2) dropShadow(x, e.img, e.X, e.Y, 6, 3, .22); else if (e.sh === 3) { ellipse(x, e.X + (e.img.width / 2 | 0) + 3, e.Y + e.img.height - 2, (e.img.width / 2 | 0) - 2, 4, 'rgba(20,30,10,.22)'); dropShadow(x, e.img, e.X, e.Y, 5, 4, .12); } else dropShadow(x, e.img, e.X, e.Y, 3, 2, .2); });
  // benda rendah dipanggang ke tanah; benda tinggi tetap entitas
  const flat = e => e.kind === 'deco' || (e.kind !== 'bld' && e.kind !== 'tree' && e.z < e.Y + e.img.height); // hanya jembatan dkk. (zb<0) yang bisa diinjak
  ents.filter(flat).sort((a, b) => a.z - b.z).forEach(e => x.drawImage(e.img, e.X, e.Y));
  const dyn = ents.filter(e => !flat(e));
  const solids = dyn.map(footprint);
  bigRocks.map(i => ents[i]).forEach(e => solids.push([e.X + 2, e.Y + 3, e.img.width - 4, e.img.height - 4])); // batu besar
  // tepi atas (barisan pohon) kecuali bukaan gerbang atas
  const up = info.exits.find(e => e.dir === 'U');
  if (up) { solids.push([0, 0, up.x - 14, info.top], [up.x + 14, 0, Wz, info.top]); } else solids.push([0, 0, Wz, info.top]);
  const dn = info.exits.find(e => e.dir === 'D');
  if (dn) { solids.push([0, Hz - 4, dn.x - 14, 4], [dn.x + 14, Hz - 4, Wz, 4]); }
  info.solids.forEach(r => solids.push(r));
  const doors = blds.filter(b => roomOf(b.k)).map(b => ({ k: b.k, room: roomOf(b.k), name: BNAME[b.k] || b.k, r: [b.cx - 10, b.Yb - 9, 20, 18], x: b.cx, y: b.Yb + 10 }));
  const boards = dyn.filter(e => e.kind === 'board').map(e => ({ r: [e.X, e.Y + e.img.height - 3, e.img.width, 14], x: e.X + (e.img.width >> 1), y: e.Y }));
  return { type: 'zone', id, name: cfg.name, w: Wz, h: Hz, bg, def, ents: dyn, solids, doors, boards, exits: info.exits };
}

// ---- Interior (adaptasi room3 v3: furnitur diurutkan bersama pemain) ----
/** Kunci cache interior: Ruko Tua berubah tiap titik kotor dibersihkan. */
const roomKey = k => k === 'klinik0' && S ? k + '|' + S.clinic.cleaned.join(',') : nikahRoomKey(k) !== k ? k + '|nikah' : k; // [3a-5] Balai Kota hari H
function getRoom(k) { const id = roomKey(k); return game.roomCache[id] || (game.roomCache[id] = buildRoom(k)); }
function buildRoom(key) {
  const r = ROOMS3[nikahRoomKey(key)], e = ROOM_EXTRA[nikahRoomKey(key)] || {}; // [3a-5]
  // Ruko Tua: dekorasi kotor yang sudah dibersihkan tidak digambar (kode v3 apa adanya, hanya disaring)
  const gone = key === 'klinik0' && S ? CLEAN_SPOTS.filter(c => S.clinic.cleaned.includes(c.id)) : [], skip = t => new Set(gone.flatMap(c => c[t] || []));
  const sW = skip('wall'), sF = skip('floor'), sI = skip('items'), keep = set => (f, i) => !set.has(i);
  const o = { ...r, wallDeco: [...(r.wallDeco || []).filter(keep(sW)), ...(e.wallDeco || []), ...(CAL_EXTRA[key] ? [wCalendar(...CAL_EXTRA[key])] : [])], floorDeco: [...(r.floorDeco || []).filter(keep(sF)), ...(e.floorDeco || [])],
    items: [...r.items().filter(keep(sI)), ...(e.items || []), ...gardenItems(key)], over: [...(r.over || []), ...(e.over || [])] };
  const RWr = o.w || 272, RFHr = o.h || 176, RHr = RFHr + 8, NX = (RWr >> 1) - 18;
  const [bg, x] = cv(RWr, RHr);
  const D = '#2a1610', O = '#b85e26', L = '#e8954c';
  R(x, 1, 0, RWr - 2, RFHr, D); R(x, 0, 1, RWr, RFHr - 2, D); R(x, NX, RFHr - 4, RNW, 12, D); R(x, 1, 1, RWr - 2, RFHr - 2, O); R(x, NX + 1, RFHr - 4, RNW - 2, 11, O);
  R(x, 2, 2, RWr - 4, RFHr - 4, L); R(x, NX + 2, RFHr - 4, RNW - 4, 10, L); R(x, 3, 3, RWr - 6, RFHr - 6, D); R(x, NX + 3, RFHr - 4, RNW - 6, 9, D);
  paint(x, 4, 4, RWr - 8, RWH, (i, j) => WALL[o.wall](i, j, RWH)); paint(x, 4, 4 + RWH, RWr - 8, RFHr - 8 - RWH, FLOOR[o.floor]); paint(x, NX + 4, RFHr - 4, RNW - 8, 7, (i, j) => FLOOR[o.floor](i + NX, j + RFHr - 8 - RWH));
  R(x, 4, 4 + RWH - 2, RWr - 8, 2, '#3a2418'); R(x, 4, 4 + RWH - 2, RWr - 8, 1, '#5a3a24'); x.fillStyle = 'rgba(30,15,5,.22)'; x.fillRect(4, 4 + RWH, RWr - 8, 3);
  R(x, NX + 7, RFHr - 2, RNW - 14, 4, '#9a4a2e'); R(x, NX + 8, RFHr - 1, RNW - 16, 2, '#c86a3a');
  { const [l, lx] = cv(RWr, RHr); (o.wallDeco || []).forEach(f => f(lx)); dropShadow(x, l, 0, 0, 1, 2, .28); x.drawImage(l, 0, 0); }
  (o.floorDeco || []).forEach(f => f(x));
  for (let k = 0; k < 10; k++) { x.fillStyle = 'rgba(30,14,6,' + (.2 - k * .02).toFixed(3) + ')'; x.fillRect(4 + k, 4, 1, RFHr - 8); x.fillRect(RWr - 5 - k, 4, 1, RFHr - 8); }
  for (let k = 0; k < 6; k++) { x.fillStyle = 'rgba(30,14,6,' + (.1 - k * .016).toFixed(3) + ')'; x.fillRect(4, 4 + RWH + k * 2, RWr - 8, 2); }
  const ents = o.items.map(([img, X, Y, zb, tag]) => ({ img, X, Y, z: tag === 'sill' ? 0 : Y + img.height + (zb || 0), fl: tag !== 'sill' && !(zb >= 20), tag })); // [2g] tag kebun
  ents.forEach(e => { if (!e.fl) return; dropShadow(x, e.img, e.X, e.Y, 3, 2, .26); x.fillStyle = 'rgba(20,10,5,.22)'; x.fillRect(e.X + 2, e.Y + e.img.height - 2, e.img.width - 3, 3); });
  // lapisan atas: cahaya lampu, vinyet
  const [ov, ox] = cv(RWr, RHr);
  (o.over || []).forEach(f => f(ox));
  if (o.vignette !== false) { const g = ox.createRadialGradient(RWr / 2, RFHr / 2 + 10, 40, RWr / 2, RFHr / 2, RWr * .62); g.addColorStop(0, 'rgba(20,8,2,0)'); g.addColorStop(1, 'rgba(20,8,2,.28)'); ox.fillStyle = g; ox.fillRect(4, 4, RWr - 8, RFHr - 8); }
  if (o.dim) { ox.fillStyle = o.dim; ox.fillRect(3, 3, RWr - 6, RFHr - 6); }
  // tabrakan: alas furnitur + dinding; pintu di tengah bawah
  const solids = ents.filter(e => e.fl).map(e => { const h = e.img.height, dep = Math.max(6, Math.round(h * 0.5)); return [e.X + 1, e.Y + h - dep, e.img.width - 2, dep - 1]; });
  const floorTop = 4 + RWH + 4;
  solids.push([0, 0, RWr, floorTop], [0, 0, 6, RHr], [RWr - 6, 0, 6, RHr], [0, RFHr - 6, NX + 6, 20], [NX + RNW - 6, RFHr - 6, RWr, 20]);
  const bp = BEDS[key]; const bed = bp ? ents.find(e => e.X === bp[0] && e.Y === bp[1]) : null;
  return { type: 'room', key, name: roomTitle(key), w: RWr, h: RHr, fh: RFHr, nx: NX, bg, over: ov, ents, solids, floorTop,
    cals: findWallCalendars(o.wallDeco || []).map(([X, Y]) => ({ r: [X - 12, floorTop - 2, 40, 28], x: X + 7 })),
    bed: bed ? { r: [bed.X - 6, bed.Y + 4, bed.img.width + 18, bed.img.height + 6], wake: [bed.X + bed.img.width + 10, bed.Y + bed.img.height - 2] } : null,
    ox: (CFG.W - RWr) >> 1, oy: Math.min(CFG.H - RHr - 2, Math.max(14, (CFG.H - RHr) >> 1) + 6) };
}

/** Cari posisi kalender dinding (wCalendar di rooms.js) dengan merekam panggilan gambar dekorasi dinding. */
function findWallCalendars(decos) {
  const out = [];
  decos.forEach(f => {
    const rec = [], fake = { _f: null, set fillStyle(v) { this._f = v; }, get fillStyle() { return this._f; }, fillRect(x, y, w, h) { rec.push([x, y, w, h, this._f]); } };
    try { f(fake); } catch (e) { return; }
    for (let i = 0; i + 1 < rec.length; i++) { const a = rec[i], b = rec[i + 1]; if (a[2] === 16 && a[3] === 20 && a[4] === '#2a1610' && b[2] === 14 && b[3] === 18 && b[4] === '#ffffff') out.push([b[0], b[1]]); }
  });
  return out;
}

// ---- Perpindahan tempat ----
/** Masuk zona lewat gerbang: layar transisi (nama zona + tips), waktu berhenti. */
function gotoZone(id, x, y, face) {
  game.trans = { name: ZONES[id].name, no: ZONES[id].no, tip: TIPS[Math.floor(Math.random() * TIPS.length)], t: 0, ready: false,
    done: () => { S.where = { type: 'zone', zone: id }; S.px = x; S.py = y; S.dir = face; game.world = getZone(id); } };
  game.scene = 'trans'; sfx('zone_go');
}
function fadeTo(mid, after) { game.fade = { t: 0, mid, after, midDone: false }; }
/** Bangunan umum berpintu bel (toko & klinik). */
const BELL_DOORS = /^(klinik|warung|kedai|roti|pos|jamu|studio)/;
function enterRoom(door) {
  sfx(BELL_DOORS.test(door.k) ? 'door_bell' : 'door_open');
  fadeTo(() => {
    const zone = S.where.zone; const w = getRoom(door.room);
    S.where = { type: 'room', room: door.room, door: { zone, x: door.x, y: door.y } };
    S.px = w.nx + 18; S.py = w.fh - 10; S.dir = 'U'; game.world = w;
  });
}
/** Pintu luar yang benar untuk ruangan ini. Pintu tersimpan dipakai kalau memang milik ruangan ini; kalau tidak (simpanan lama/uji), cari di semua zona. */
function roomDoor(w) {
  const ok = d => d && ZONES[d.zone] && getZone(d.zone).doors.some(x => x.room === w.room && Math.abs(x.x - d.x) < 2 && Math.abs(x.y - d.y) < 2);
  if (w.room === 'kosK') return w.door && w.door.inRoom ? w.door : kos5Door(); // [kos] keluar kamar 5 = ruang bersama
  if (ok(w.door) || /^rumah/.test(w.room)) return w.door;
  for (const z in ZONES) { const x = getZone(z).doors.find(x => x.room === w.room); if (x) return { zone: z, x: x.x, y: x.y }; }
  return w.door;
}
function exitRoom() {
  sfx('door_close');
  fadeTo(() => {
    const d = roomDoor(S.where);
    if (d.inRoom) { const w = getRoom(d.inRoom); S.where = { type: 'room', room: d.inRoom, door: zoneDoorOf(d.inRoom) }; S.px = d.x; S.py = d.y; S.dir = 'D'; game.world = w; return; }
    S.where = { type: 'zone', zone: d.zone };
    S.px = d.x; S.py = d.y; S.dir = 'D'; game.world = getZone(d.zone);
  });
}
/** Taruh pemain di kamar rumah, di samping kasur (bangun tidur / setelah pingsan). */
function placeAtHome() {
  const key = homeRoom(); const w = getRoom(key);
  S.where = { type: 'room', room: key, door: S.homeLv === 1 ? kos5Door() : homeDoor() };
  if (w.bed) { S.px = w.bed.wake[0]; S.py = w.bed.wake[1]; } else { S.px = w.nx + 18; S.py = w.fh - 30; }
  S.dir = 'D'; game.world = w;
}
/** Muat dunia sesuai S.where (setelah load). */
function loadWorld() { game.world = S.where.type === 'zone' ? getZone(S.where.zone) : getRoom(S.where.room); }

// ---- Tidur & pingsan ----
function sleep() {
  sfx('bed'); sfx('sleep');
  fadeTo(() => {
    const hf = CFG.HOME[S.homeLv]; const seasonChanged = newDay();
    S.energy = Math.round(energyMax() * hf.recover * S.nextEnergyMul); S.nextEnergyMul = 1; payRent();
    S.stress = clamp(S.stress + CFG.SLEEP_STRESS + hf.stress + jrSleepStress(), 0, 100); /* [3b-1] #19 */
    placeAtHome(); const ok = saveGame();
    morningCard(S.uji ? 'Mode uji: tidak disimpan.' : ok ? 'Permainan tersimpan otomatis.' : 'Gagal menyimpan (penyimpanan browser penuh atau diblokir).', seasonChanged);
  });
}
function faint() {
  if (game.overlay && game.overlay.kind === 'faint') return;
  dialog(['Pandanganmu berkunang-kunang... Sudah lewat tengah malam dan badanmu tidak kuat lagi.', 'Kamu pingsan di jalan.'], {
    kind: 'faint', onDone: () => (sfx('faint'), fadeTo(() => {
      const lost = Math.round(S.money * (1 - CFG.FAINT_MONEY)); const seasonChanged = newDay();
      S.money -= lost; payRent(); S.energy = Math.round(energyMax() * CFG.FAINT_ENERGY);
      placeAtHome();
      morningCard('Warga mengantarmu pulang. Biaya berobat ' + rupiah(lost) + '. Energi hari ini tinggal separuh.', seasonChanged);
    })) });
}
// ---- [2g] Kebun herba & rumah Lv 3–4 (GDD §7, §8; ACC user 2026-11-13) ----
/** [2g] Angka kebun & rumah. Herba per musim mengikuti musim tanamnya di dunia nyata (keputusan user). */
CFG.GARDEN = {
  POTS: { 1: 4, 2: 8, 3: 12, 4: 16 }, // [2g] GDD §7
  HERBS: { // days = hari tumbuh (GDD §7); price = harga bibit; shop warung = dasar, jamu = lanjutan (Mbah Darmi)
    lidah: { name: 'Lidah Buaya', days: 5, season: 'kemarau', price: 30000, shop: 'warung', eff: 'Sakit pasien anak -30%' },
    serai: { name: 'Serai Jahe', days: 5, season: 'kemarau', price: 40000, shop: 'jamu', eff: 'Diseduh di dapur: stres -15' },
    mint: { name: 'Mint', days: 3, season: 'hujan', price: 20000, shop: 'warung', eff: 'Bayaran +10%' },
    sirih: { name: 'Sirih', days: 4, season: 'hujan', price: 25000, shop: 'warung', eff: 'Scaling & cabut: reputasi +1' },
    kunyit: { name: 'Kunyit', days: 6, season: 'hujan', price: 40000, shop: 'jamu', eff: 'Kasus darurat: zona +15%' },
    cengkeh: { name: 'Cengkeh', days: 8, season: 'hujan', price: 60000, shop: 'jamu', eff: 'Sakit semua pasien -30%' } },
  YIELD: 2, HERB_MAX: 20, SEED_MAX: 20, BUY_MAX: 10, // [2g] panen 2 herba/pot; tas maks 20 per jenis; beli maks 10 per jenis sekali beli
  DRY_DIE: 3, // [2g] keputusan user: mati setelah 3 hari tidak disiram (Kemarau)
  WATER_E: 2, WATER_MIN: 10, // [2g] siram semua: energi -2, 10 menit
  DARMI_MUL: 1.5, DARMI_TRUST: 40, // [2g] keputusan user: harga ×1,5 sampai trust Mbah Darmi ≥40 (trust aktif di 3a)
  START_SEEDS: { lidah: 2 }, // [2g] bibit awal dari Pak Udin (permainan dimulai di Musim Kemarau)
  MG: { PAIN: 0.7, ZONE: 1.15, PAY: 0.1, REP: 1 }, // [2g] Cengkeh/Lidah Buaya sakit ×0,7 · Kunyit zona ×1,15 · Mint bayaran +10% · Sirih reputasi +1 (pengganti trust +3 sampai 3a)
  ACUTE: ['abses', 'pulpIrev', 'pascaCabut', 'perforasi', 'akarPatah'], // [2g] "darurat" untuk Kunyit
  SIRIH_TX: ['scaling', 'cabut', 'cabutSusu'],
  SERAI_STRESS: -15, SERAI_MIN: 10, // [2g] maks sekali sehari
  HOUSE: { 3: { price: 50000000, minStage: 1 }, 4: { price: 150000000 } }, // [2g] GDD §8; Lv 4 = renovasi tambahan 150jt; jadi besok pagi
};
const HERB_KEYS = Object.keys(CFG.GARDEN.HERBS), MG_HERBS = HERB_KEYS.filter(k => k !== 'serai');
const herbName = k => CFG.GARDEN.HERBS[k].name;
const seasonName = key => SEASONS.find(s => s.key === key).name;
/** Data kebun di save. Pot: null atau { k, age, dry, dead }. wet = hari terakhir disiram. */
function newGarden() { return { pots: new Array(CFG.GARDEN.POTS[1]).fill(null), wet: 0 }; }
const potCount = () => CFG.GARDEN.POTS[S.homeLv] + jrPotBonus(); /* [3b-1] #23 +1 pot */
const plantReady = p => p && !p.dead && p.age >= CFG.GARDEN.HERBS[p.k].days;
/** Tahap gambar: 0 kosong · 1 bibit · 2 tumbuh · 3 siap · 4 layu · 5 mati (herbPlant di kebun.js). */
const plantStage = p => !p ? 0 : p.dead ? 5 : plantReady(p) ? 3 : p.dry ? 4 : p.age === 0 ? 1 : 2;
const wateredToday = () => season().key === 'hujan' || S.garden.wet === S.day;
function addHerb(k, n) { const G = CFG.GARDEN, h = S.herbs, have = h[k] || 0, put = Math.min(n, G.HERB_MAX - have); h[k] = have + put; return n - put; }
/** Ubah jumlah pot sesuai level rumah. Pot berlebih (turun ke Kos): yang siap dipanen otomatis, sisanya kembali jadi bibit. */
function gardenResize() {
  const G = S.garden, n = potCount();
  while (G.pots.length < n) G.pots.push(null);
  const extra = G.pots.splice(n); let back = 0, got = 0;
  extra.forEach(p => { if (!p || p.dead) return; if (plantReady(p)) { addHerb(p.k, CFG.GARDEN.YIELD); got++; } else { S.seeds[p.k] = Math.min(CFG.GARDEN.SEED_MAX, (S.seeds[p.k] || 0) + 1); back++; } });
  if (got || back) game.dayNews = [game.dayNews, 'Pot kebun berkurang: ' + (got ? got + ' tanaman dipanen' : '') + (got && back ? ', ' : '') + (back ? back + ' tanaman kembali jadi bibit' : '') + '.'].filter(Boolean).join(' ');
  gardenRefresh();
}
/** Pagi: tanaman tumbuh kalau kemarin tersiram (Hujan = otomatis), mati setelah 3 hari kering; ganti musim = herba musim lain mati (yang siap dipanen otomatis). */
function gardenNewDay(prevDay, prevKey, seasonChanged) {
  const G = CFG.GARDEN, gd = S.garden, wet = prevKey === 'hujan' || gd.wet === prevDay; let died = 0, ready = 0, auto = 0, gone = 0;
  gd.pots.forEach(p => {
    if (!p || p.dead || plantReady(p)) return;
    if (wet) { p.age++; p.dry = 0; if (plantReady(p)) ready++; } else if (++p.dry >= G.DRY_DIE) { p.dead = true; died++; }
  });
  if (seasonChanged) gd.pots.forEach((p, i) => {
    if (!p || p.dead || G.HERBS[p.k].season === season().key) return;
    if (plantReady(p)) { addHerb(p.k, G.YIELD); gd.pots[i] = null; auto++; } else { p.dead = true; gone++; }
  });
  const news = [];
  if (ready) news.push('Kebun: ' + ready + ' tanaman siap dipanen.');
  if (died) news.push('Kebun: ' + died + ' tanaman mati karena 3 hari tidak disiram.');
  if (auto) news.push('Ganti musim: ' + auto + ' tanaman musim lalu dipanen otomatis.');
  if (gone) news.push('Ganti musim: ' + gone + ' tanaman musim lalu mati sebelum sempat dipanen.');
  if (!wet && !seasonChanged && gd.pots.some(p => p && !p.dead && !plantReady(p))) news.push('Kebun belum disiram kemarin.');
  if (news.length) game.dayNews = [game.dayNews, ...news].filter(Boolean).join(' ');
  gardenRefresh();
}
// -- gambar kebun di dunia (diperbarui tanpa membangun ulang ruangan) --
const plantsOf = () => S.garden.pots.map(p => p ? [p.k, plantStage(p)] : null);
function gardenImg(tag) {
  const pl = plantsOf(), wet = wateredToday();
  if (tag === 'sill') return sillPots(pl.slice(0, 4), wet);
  if (tag === 'rak') return rakPot(pl.slice(0, 8), wet);
  return bedeng(4, S.homeLv >= 4 ? 4 : 3, pl, wet);
}
/** Barang kebun per ruangan rumah: [img, X, Y, zb, tag]. */
function gardenItems(key) {
  if (!S || !S.garden || key !== homeRoom()) return [];
  if (key === 'kosK') return [[gardenImg('sill'), 78, 18, 0, 'sill']];
  if (key === 'rumah2') return [[gardenImg('rak'), 74, 26, 0, 'rak'], [gembor(), 120, 56]];
  return [];
}
/** Bedeng halaman Rumah Subsidi/Estetik (Kampung Asri, seberang jalan depan rumah). */
const BEDENG_XY = [58, 228];
function gardenZoneEnts(id) {
  if (id !== 'kampung' || !S || !S.garden || S.homeLv < 3) return [];
  const b = gardenImg('bedeng'); return [[b, BEDENG_XY[0], BEDENG_XY[1], 'garden'], [gembor(), BEDENG_XY[0] + b.width + 2, BEDENG_XY[1] + b.height - 12, 'prop']];
}
function gardenRefresh() {
  if (!S || !S.garden) return;
  [...Object.values(game.roomCache), ...Object.values(game.zoneCache)].forEach(w => (w.ents || []).forEach(e => { if (e.tag === 'sill' || e.tag === 'rak' || e.kind === 'garden') e.img = gardenImg(e.kind === 'garden' ? 'bedeng' : e.tag); }));
}
/** Area berdiri untuk aksi kebun/dapur/meja: dari posisi barang di ruangan. */
function entSpot(w, X, Y, pad = 0) { const e = w.ents.find(e => e.X === X && e.Y === Y); return e ? [e.X - pad, e.Y + e.img.height - 8, e.img.width + pad * 2, 20] : null; }
const KITCHENS = { kos: [268, 36], rumah2: [136, 34], rumah3: [160, 34], rumah4: [110, 34] };
const HOUSE_DESK = { rumah3: [16, 146], rumah4: [340, 166] };
const SHOP_COUNTER = { jamu: [120, 70] }; // [2h] bibit warung digabung ke panel openWarung (revisi user 2026-11-13)
/** Aksi [2g] di ruangan (dipanggil currentAction). */
function gardenRoomAction(w) {
  const at = r => r && inRect(S.px, S.py, r);
  if (w.key === homeRoom() && w.key === 'kosK' && inRect(S.px, S.py, [70, w.floorTop - 2, 52, 22])) return { label: 'Kebun · Ambang Jendela', fn: openGarden };
  if (w.key === homeRoom() && w.key === 'rumah2' && at(entSpot(w, 74, 26, 2))) return { label: 'Kebun · Rak Pot', fn: openGarden };
  const kc = KITCHENS[w.key];
  // [2h] Seduh Serai Jahe pindah jadi tombol di panel Dapur (openDapur), supaya dapur tetap bisa dipakai memasak.
  const hd = HOUSE_DESK[w.key]; if (hd && w.key === homeRoom() && at(entSpot(w, hd[0], hd[1], 4))) return S.homeLv === 3 ? { label: 'Meja kerja · Renovasi rumah', fn: () => openBuild(4) } : null;
  for (const k in SHOP_COUNTER) if (w.key === k && at(entSpot(w, ...SHOP_COUNTER[k], 0))) return { label: k === 'warung' ? 'Warung · Bibit Herba' : 'Pondok Jamu · Bibit', fn: () => openSeedShop(k) };
  return null;
}
/** Aksi [2g] di zona: bedeng halaman. */
function gardenZoneAction(w) {
  const e = w.id === 'kampung' && w.ents.find(e => e.kind === 'garden'); if (!e) return null;
  return inRect(S.px, S.py, [e.X - 8, e.Y - 4, e.img.width + 16, e.img.height + 14]) ? { label: 'Kebun · Bedeng Halaman', fn: openGarden } : null;
}
// -- panel Kebun --
function gardenAct(sel, seedK) {
  const G = CFG.GARDEN, gd = S.garden, p = gd.pots[sel], sk = season().key;
  if (gd.pots.some(plantReady)) return { label: gd.pots.filter(plantReady).length > 1 ? 'Panen semua' : 'Panen', fn: () => {
    let n = 0, lost = 0; gd.pots.forEach((q, i) => { if (plantReady(q)) { lost += addHerb(q.k, G.YIELD); gd.pots[i] = null; n++; } });
    sfx('ui_click'); jrEv('harvest'); /* [3b-1] #5 */ toast('Panen ' + n + ' pot · +' + (n * G.YIELD - lost) + ' herba' + (lost ? ' (tas penuh, ' + lost + ' dibagikan ke tetangga)' : ''), 'good'); gardenRefresh(); } };
  if (!p) { const ok = seedK && (S.seeds[seedK] || 0) > 0 && G.HERBS[seedK].season === sk;
    return { label: 'Tanam', off: !ok, offMsg: 'Tidak ada bibit ' + seasonName(sk) + ' di tas. Beli di Warung atau Pondok Jamu.', fn: () => {
      S.seeds[seedK]--; gd.pots[sel] = { k: seedK, age: 0, dry: 0, dead: false }; jrEv('plant'); /* [3b-1] #5 */ sfx('ui_click'); toast(herbName(seedK) + ' ditanam', 'good'); gardenRefresh(); } }; }
  if (p.dead) return { label: 'Cabut yang mati', fn: () => { gd.pots.forEach((q, i) => { if (q && q.dead) gd.pots[i] = null; }); sfx('sweep'); gardenRefresh(); } };
  return { label: 'Tunggu', off: true, offMsg: herbName(p.k) + ' belum siap dipanen (' + p.age + '/' + G.HERBS[p.k].days + ' hari).', fn: () => {} };
}
function openGarden() {
  const G = CFG.GARDEN, gd = S.garden, title = S.homeLv === 1 ? 'Kebun · Ambang Jendela' : S.homeLv === 2 ? 'Kebun · Rak Pot' : 'Kebun · Bedeng Halaman';
  const seedList = () => HERB_KEYS.filter(k => (S.seeds[k] || 0) > 0).sort((a, b) => (G.HERBS[b].season === season().key) - (G.HERBS[a].season === season().key));
  const firstSeed = () => seedList().find(k => G.HERBS[k].season === season().key) || null;
  const ov = { kind: 'panel', sel: Math.max(0, gd.pots.findIndex(p => !p || plantReady(p) || p.dead)), btn: 1, seed: firstSeed(), t: 0,
    buttons() {
      const left = gd.pots.filter(p => p && !p.dead && !plantReady(p)).length, hujan = season().key === 'hujan';
      return [hujan ? { label: 'Disiram hujan', off: true, offMsg: 'Musim Hujan: kebun tersiram otomatis.' }
        : gd.wet === S.day ? { label: 'Sudah disiram', off: true, offMsg: 'Kebun sudah disiram hari ini.' }
        : { label: 'Siram semua', off: !left, offMsg: 'Belum ada tanaman yang perlu disiram.', keep: true, fn: () => { gd.wet = S.day; addEnergy(-G.WATER_E); spendTime(G.WATER_MIN); sfx('rinse'); toast('Kebun disiram · energi -' + G.WATER_E, 'good'); gardenRefresh(); } },
        { ...gardenAct(this.sel, this.seed), keep: true }, { label: 'Tutup', fn: () => {} }];
    },
    update() {
      this.t++; const n = gd.pots.length, C = Math.min(n, 8), bs = this.buttons();
      if (hit('esc') && this.t > 1) { closeOverlay(); return; }
      if (hit('left')) this.sel = (this.sel + n - 1) % n; if (hit('right')) this.sel = (this.sel + 1) % n;
      if (hit('up') && n > C) this.sel = (this.sel + n - C) % n; if (hit('down') && n > C) this.sel = (this.sel + C) % n;
      if (hit('tab')) { const ls = seedList(); if (ls.length) this.seed = ls[(ls.indexOf(this.seed) + 1) % ls.length]; }
      if (input.click) { const h = topHit(input.click, /^kb/); if (h) { h.fn(); return; } }
      if (okHit() && this.t > 2) this.press(bs[1]);
    },
    press(b) { if (!b) return; if (b.off) { sfx('ui_deny'); if (b.offMsg) toast(b.offMsg, 'bad'); return; } if (b.keep) { b.fn(); if (!gd.pots[this.sel] && !(S.seeds[this.seed] > 0)) this.seed = firstSeed(); } else closeOverlay(b.fn); },
    drawHD() { drawGarden(this, title, seedList()); } };
  openOverlay(ov);
}
function drawGarden(o, title, seeds) {
  const G = CFG.GARDEN, gd = S.garden, pots = gd.pots, n = pots.length, C = Math.min(n, 8), rows = Math.ceil(n / C), SW = 34, SH = 46, gw = Math.max(C, 4) * SW, RW = 172;
  const W = gw + RW + 38, ch = Math.max(rows * SH + 16, 160), H = 58 + ch + 36, X = 240 - W / 2, Y = Math.max(2, Math.round((270 - H) / 2)), M = MGC, hv = hoverId(), sk = season().key;
  hDim(o, .4);
  dropIn(o, X, Y, W, H, () => {
    hBox(X, Y, W, H, 'paper', { ornate: true }); HT(title, X + W / 2, Y + 9, M.ink, { k: 4, sh: '#e8b878', align: 'c' }); hDivider(X + 14, Y + 34, W - 28);
    const left = CFG.SEASON_DAYS - dayOfSeason() + 1;
    HT(season().name + ' hari ' + dayOfSeason() + ' · ganti musim ' + left + ' hari lagi', X + 14, Y + 42, M.ink2);
    pots.forEach((p, i) => {
      const sx = X + 14 + (i % C) * SW, sy = Y + 56 + ((i / C) | 0) * SH, st = plantStage(p), on = i === o.sel;
      hInset(sx, sy, SW - 3, SH - 4, on ? '#f6e2b4' : st >= 4 ? '#e6c4a0' : hv === 'kbp' + i ? '#f2dcb0' : '#ead2a0'); if (on) hGlow(sx, sy, SW - 3, SH - 4);
      const im = herbPot(p ? p.k : 'mint', st, wateredToday() && st && st < 5); hc.imageSmoothingEnabled = false;
      hc.drawImage(im, Math.round((sx + 4) * HI), Math.round((sy + 3) * HI), im.width * HI * 2, im.height * HI * 2);
      if (st === 3) HT('★', sx + SW - 11, sy + 2, '#d89a10', { bold: true }); else if (st === 4) HT('!', sx + SW - 9, sy + 2, M.red, { bold: true }); else if (st === 5) HT('×', sx + SW - 10, sy + 2, M.red, { bold: true });
      clickable(sx, sy, SW - 3, SH - 4, () => { if (o.sel === i) o.press(o.buttons()[1]); else o.sel = i; }, 'kbp' + i);
    });
    const hujan = sk === 'hujan', wet = wateredToday();
    HT(hujan ? 'Musim Hujan: tersiram otomatis' : wet ? 'Sudah disiram hari ini' : 'Belum disiram hari ini', X + 14, Y + 56 + rows * SH + 2, wet ? '#2f7a3a' : M.red, { bold: true });
    // info pot terpilih + tas
    const tx = X + 24 + gw, tw = RW; hInset(tx, Y + 52, tw, ch, '#f2dcb0'); let y = Y + 57;
    const p = pots[o.sel], info = [];
    if (!p) info.push(['Pot kosong', M.ink, true], [o.seed ? 'Tanam: ' + herbName(o.seed) : 'Tidak ada bibit ' + seasonName(sk), o.seed ? M.ink : M.red], ['Ganti bibit: klik atau Tab', M.ink2]);
    else { const h = G.HERBS[p.k]; info.push([h.name, M.ink, true]);
      if (p.dead) info.push(['Mati. Cabut supaya potnya', M.red], ['bisa ditanami lagi.', M.red]);
      else if (plantReady(p)) info.push(['Siap dipanen (' + G.YIELD + ' herba)', '#2f7a3a']);
      else { info.push(['Tumbuh ' + p.age + '/' + h.days + ' hari']);
        if (p.dry) info.push(['Kering ' + p.dry + ' hari. Mati kalau', M.red], [G.DRY_DIE + ' hari tidak disiram.', M.red]);
        else if (h.days - p.age > left) info.push(['Tidak sempat siap sebelum', M.red], ['musim berganti.', M.red]);
        else info.push([h.eff, M.ink2]); } }
    info.forEach(([t, col, b]) => { HT(fitText(t, tw - 12, b), tx + 6, y, col || M.ink, { bold: b }); y += 11; }); y = Math.max(y, Y + 101) + 3; hDivider(tx + 6, y, tw - 12); y += 6;
    HT('Bibit di tas', tx + 6, y, M.ink2); y += 10;
    if (!seeds.length) { HT('Belum ada', tx + 6, y + 2, M.ink2); y += 15; }
    seeds.slice(0, 4).forEach(k => {
      const ok = G.HERBS[k].season === sk, on = ok && k === o.seed && !p;
      if (on) hR(tx + 3, y - 4, tw - 6, 15, 'rgba(232,176,64,.35)');
      hImg(seedImg(k), tx + 6, y - 3); HT(herbName(k) + ' ×' + S.seeds[k], tx + 25, y + 2, ok ? M.ink : '#9a7a5a', { bold: on });
      if (!ok) HT(seasonName(G.HERBS[k].season).replace('Musim ', ''), tx + tw - 6, y + 2, '#9a7a5a', { align: 'r' });
      if (ok) clickable(tx + 3, y - 4, tw - 6, 15, () => { o.seed = k; }, 'kbs' + k); y += 15; });
    y += 1; HT('Herba siap pakai', tx + 6, y, M.ink2); y += 10;
    const hs = HERB_KEYS.filter(k => S.herbs[k] > 0); if (!hs.length) HT('Belum ada', tx + 6, y + 2, M.ink2);
    hs.forEach((k, i) => { const hx = tx + 6 + (i % 3) * 54, hy = y + ((i / 3) | 0) * 17; hImg(herbImg(k), hx, hy - 3); HT('×' + S.herbs[k], hx + 19, hy + 2, M.ink, { bold: true }); });
    const bs = o.buttons(), by = Y + H - 29, bw = (W - 28 - 12) / 3;
    bs.forEach((b, i) => { const bx = X + 14 + i * (bw + 6), h = hv === 'kbb' + i;
      hBtn(bx, by, bw, 21, b.label, { on: !b.off && (i === 1 || h), kind: b.off ? 'dark' : i === 1 || h ? null : 'paper', bold: true });
      if (b.off) { hc.fillStyle = 'rgba(70,50,30,.45)'; hc.fillRect(Math.round(bx * HI), Math.round(by * HI), Math.round(bw * HI), 21 * HI); }
      clickable(bx, by, bw, 21, () => o.press(b), 'kbb' + i); });
  });
}
// -- [2g] Herba di baki minigame (maks 1 per tindakan, dipilih sebelum langkah 1 selesai) --
function herbLock(job, k) {
  const G = CFG.GARDEN;
  if (k === 'lidah' && !job.kid) return 'Lidah Buaya hanya untuk pasien anak.';
  if (k === 'sirih' && !G.SIRIH_TX.includes(job.tx)) return 'Sirih hanya untuk scaling dan cabut.';
  if (k === 'kunyit' && !G.ACUTE.includes(job.p.dx)) return 'Kunyit hanya untuk kasus darurat (sakit akut).';
  return null;
}
const herbPainMul = job => job.herb === 'cengkeh' || (job.herb === 'lidah' && job.kid) ? CFG.GARDEN.MG.PAIN : 1;
function herbConsume(job) { if (!job.herb || job.herbUsed) return; if (!S.practice) S.herbs[job.herb] = Math.max(0, (S.herbs[job.herb] || 0) - 1); job.herbUsed = true; }
const herbMint = (job, pay) => job.herbUsed && job.herb === 'mint' ? Math.round(pay * CFG.GARDEN.MG.PAY / 1000) * 1000 : 0;
function herbStripHD(job) {
  if (job.mode === 'explain') { HT('Tidak dipakai saat menjelaskan', 52, 247, MGC.ink2); return; }
  const ks = MG_HERBS.filter(k => S.practice || (S.herbs && S.herbs[k] > 0) || job.herb === k);
  if (!ks.length) { HT('Belum ada herba', 52, 247, MGC.ink2); return; }
  const open = job.phase === 'play' && job.i === 0 && !job.herbUsed;
  ks.slice(0, 6).forEach((k, i) => {
    const X = 52 + i * 23, on = job.herb === k, lock = herbLock(job, k);
    hInset(X, 241, 20, 20, on ? '#f6e2b4' : '#ead2a0'); if (on) hGlow(X, 241, 20, 20);
    hImg(herbImg(k), X + 2, 243); if (lock || (!open && !on)) { hc.fillStyle = 'rgba(70,50,30,.45)'; hc.fillRect(X * HI, 241 * HI, 20 * HI, 20 * HI); }
    if (!S.practice) HT('' + (S.herbs[k] || 0), X + 19, 253, MGC.ink, { align: 'r', bold: true });
    clickable(X, 241, 20, 20, () => {
      if (lock) { sfx('ui_deny'); toast(lock, 'bad'); return; }
      if (!open) { sfx('ui_deny'); toast('Herba dipilih sebelum langkah 1 selesai.', 'bad'); return; }
      job.herb = on ? null : k; sfx('ui_click'); }, 'mgh' + k);
  });
}
ROOMS3.kosK.over = (ROOMS3.rumah1.over || []).slice(1); // [2g] pot lama 5×3 px diganti sillPots
// -- Serai Jahe: diseduh di dapur rumah, untuk diri sendiri --
function brewSerai() {
  const G = CFG.GARDEN;
  if (S.seraiDay === S.day) { dialog(['Kamu sudah minum wedang serai jahe hari ini. Satu gelas sehari sudah cukup.']); return; }
  S.herbs.serai--; S.seraiDay = S.day; spendTime(G.SERAI_MIN); addStress(G.SERAI_STRESS); sfx('rinse');
  const jamu = jrF('jamu'); if (jamu) S.energy = Math.min(energyMax(), S.energy + CFG.JURNAL.SERAI_ENERGY); /* [3b-1] #12 resep jamu Mbah Darmi */
  dialog(['Kamu menyeduh serai dan jahe. Wanginya memenuhi dapur, hangatnya turun pelan ke dada.', 'Stres ' + G.SERAI_STRESS + (jamu ? ' · Energi +' + CFG.JURNAL.SERAI_ENERGY + ' (resep Mbah Darmi)' : '') + '.']);
}
// -- Bibit di Warung (dasar) & Pondok Jamu (lanjutan) --
const seedPrice = (k, shop) => { const G = CFG.GARDEN, b = G.HERBS[k].price; return shop === 'jamu' && trustOf('darmi') < G.DARMI_TRUST ? Math.round(b * G.DARMI_MUL / 1000) * 1000 : b; };
function openSeedShop(shop) {
  const G = CFG.GARDEN, keys = HERB_KEYS.filter(k => G.HERBS[k].shop === shop), sk = season().key, q = {}; keys.forEach(k => q[k] = 0);
  const title = shop === 'warung' ? 'Bibit Herba · Warung' : 'Bibit · Pondok Jamu', friend = shop !== 'jamu' || trustOf('darmi') >= G.DARMI_TRUST;
  const sub = shop === 'warung' ? '"Bibit musim ini saja, Dok. Yang lain nanti kalau musimnya sudah ganti."'
    : friend ? 'Mbah Darmi: "Pilih yang mana, Nak? Ini bibit dari kebun Mbah sendiri."' : 'Mbah Darmi: "Belum kenal, Nak. Harga orang lewat dulu, ya."';
  const can = k => G.HERBS[k].season === sk, total = () => keys.reduce((a, k) => a + q[k] * seedPrice(k, shop), 0);
  const room = k => Math.min(G.BUY_MAX, G.SEED_MAX - (S.seeds[k] || 0));
  const ov = { kind: 'panel', sel: Math.max(0, keys.findIndex(can)), t: 0,
    add(k, d) { if (!can(k)) { sfx('ui_deny'); toast('Bibit ' + herbName(k) + ' dijual saat ' + seasonName(G.HERBS[k].season) + '.', 'bad'); return; } const v = clamp(q[k] + d, 0, room(k)); if (v === q[k] && d > 0) { sfx('ui_deny'); toast('Bibit ' + herbName(k) + ' di tas maks ' + G.SEED_MAX + '.', 'bad'); } q[k] = v; },
    buy() { const t = total(); if (!t) { sfx('ui_deny'); toast('Pilih jumlah bibit dulu (◀ ▶).', 'bad'); return; } if (S.money < t) { sfx('ui_deny'); toast('Uangmu belum cukup.', 'bad'); return; }
      S.money -= t; keys.forEach(k => { S.seeds[k] = (S.seeds[k] || 0) + q[k]; q[k] = 0; }); sfx('coin_out'); toast('Bibit dibeli · -' + rupiah(t), 'good'); closeOverlay(); },
    update() { this.t++;
      if (hit('esc') && this.t > 1) { closeOverlay(); return; }
      if (hit('up')) this.sel = (this.sel + keys.length - 1) % keys.length; if (hit('down')) this.sel = (this.sel + 1) % keys.length;
      if (hit('left')) this.add(keys[this.sel], -1); if (hit('right')) this.add(keys[this.sel], 1);
      if (input.click) { const h = topHit(input.click, /^sb/); if (h) { h.fn(); return; } }
      if (okHit() && this.t > 2) this.buy(); },
    drawHD() {
      const W = 460, H = 70 + keys.length * 24 + 64, X = 240 - W / 2, Y = Math.round((270 - H) / 2), M = MGC, hv = hoverId();
      hDim(this, .4);
      dropIn(this, X, Y, W, H, () => {
        hBox(X, Y, W, H, 'paper', { ornate: true }); HT(title, 240, Y + 9, M.ink, { k: 4, sh: '#e8b878', align: 'c' }); hDivider(X + 14, Y + 34, W - 28); HT(fitText(sub, W - 28), X + 14, Y + 42, M.ink2);
        keys.forEach((k, i) => { const y = Y + 56 + i * 24, s = i === this.sel, h = G.HERBS[k], ok = can(k);
          hInset(X + 14, y, W - 28, 21, s ? '#f6e2b4' : '#ead2a0'); if (s) hGlow(X + 14, y, W - 28, 21); clickable(X + 14, y, W - 120, 21, () => { this.sel = i; }, 'sbr' + i);
          hImg(seedImg(k), X + 18, y + 2); HT(h.name + (S.seeds[k] ? '  (tas ' + S.seeds[k] + ')' : ''), X + 38, y + 3, ok ? M.ink : '#9a7a5a', { bold: true });
          HT(fitText(seasonName(h.season).replace('Musim ', '') + ' · ' + h.days + ' hari · ' + h.eff, W - 200), X + 38, y + 12, M.ink2);
          if (!ok) HT(seasonName(h.season), X + W - 20, y + 7, M.red, { align: 'r' });
          else { HT(rupiah(seedPrice(k, shop)), X + W - 96, y + 7, M.ink, { align: 'r', bold: true });
            hBtn(X + W - 88, y + 3, 15, 15, '◀', { kind: hv === 'sbm' + i ? null : 'paper', on: hv === 'sbm' + i }); clickable(X + W - 88, y + 3, 15, 15, () => { this.sel = i; this.add(k, -1); }, 'sbm' + i);
            HT('' + q[k], X + W - 62, y + 7, M.ink, { align: 'c', bold: true });
            hBtn(X + W - 52, y + 3, 15, 15, '▶', { kind: hv === 'sbp' + i ? null : 'paper', on: hv === 'sbp' + i }); clickable(X + W - 52, y + 3, 15, 15, () => { this.sel = i; this.add(k, 1); }, 'sbp' + i); } });
        const fy = Y + 56 + keys.length * 24 + 4;
        if (!friend) HT('Harga kalau sudah akrab (trust ' + G.DARMI_TRUST + '): ' + keys.map(k => rupiah(G.HERBS[k].price).replace('Rp ', '')).join(' / ') + '.', X + 14, fy, M.ink2);
        HT('Total ' + rupiah(total()) + ' · Uangmu ' + rupiah(S.money), X + 14, fy + 12, S.money < total() ? M.red : M.ink, { bold: true });
        const by = Y + H - 29, bw = (W - 28 - 6) / 2;
        hBtn(X + 14, by, bw, 21, 'Beli', { on: hv !== 'sbx', kind: hv === 'sbx' ? 'paper' : null, bold: true }); clickable(X + 14, by, bw, 21, () => this.buy(), 'sbb');
        hBtn(X + 20 + bw, by, bw, 21, 'Tutup', { kind: hv === 'sbx' ? null : 'paper', on: hv === 'sbx', bold: true }); clickable(X + 20 + bw, by, bw, 21, () => closeOverlay(), 'sbx');
      });
    } };
  openOverlay(ov);
}
// -- Rumah Lv 3 (bangun di lahan rumah ujung kiri) & Lv 4 (renovasi) --
/** Sisa sewa kontrakan yang hangus kalau rumah dibangun sekarang. */
function leaseLeft() { if (!S.lease) return { days: 0, money: 0 }; const K = CFG.KONTRAK, d = Math.max(0, S.lease.due - S.day); return { days: d, money: Math.round(d * K.RENT / K.DAYS / 1000) * 1000 }; }
function openBuild(to) {
  const H = CFG.GARDEN.HOUSE[to], debt = S.homeLv === 1 ? S.kosDebt || 0 : 0, cost = H.price * nikahCostMul() + debt /* [3a-5] Arya -50% */, okS = to !== 3 || S.clinicStage >= H.minStage, okM = S.money >= cost, ll = leaseLeft();
  if (S.homeBuild) { dialog(['Tukang masih bekerja. Besok pagi rumahnya selesai.']); return; }
  const rows = to === 3
    ? [['Tukang Pak Harjo membangun Rumah Subsidi di lahan rumah ujung kiri. Rumah jadi besok pagi.', MGC.ink, true],
      ['· Energi maks +20%, kebun 12 petak di halaman depan', MGC.ink2], ['· Rumah sendiri: tanpa sewa, tidak bisa turun lagi', MGC.ink2]]
    : [['Rumah Subsidi direnovasi jadi Rumah Estetik: parket, rotan, dapur dengan meja island. Selesai besok pagi.', MGC.ink, true],
      ['· Energi maks +30%, stres -10 setiap bangun tidur, kebun 16 petak', MGC.ink2]];
  if (to === 3 && !okS) rows.push(['Syarat: ruko sudah direnovasi jadi tempat praktik', MGC.red, true]);
  if (ll.days) rows.push(['Peringatan: sisa sewa kontrakan ' + ll.days + ' hari (' + rupiah(ll.money) + ') hangus, tidak dikembalikan.', MGC.red, true]);
  if (debt) rows.push(['Utang kos ke Pak Udin ikut dilunasi: ' + rupiah(debt), MGC.ink2]);
  if (aryaFast()) rows.push(['Arya ikut mengawasi: biaya -50%, selesai jam 18:00 hari ini.', '#c0407a', true]); // [3a-5]
  if (S.homeLv === 2 && to === 3) rows.push(['Tanaman di rak pot ikut pindah ke bedeng halaman.', MGC.ink2]);
  rows.push(['Biaya ' + rupiah(cost) + ' · Uangmu ' + rupiah(S.money), okM ? MGC.ink : MGC.red, true]);
  openPanel({ title: to === 3 ? 'Bangun Rumah Subsidi' : 'Renovasi Rumah Estetik', w: 330, rows: () => rows,
    buttons: () => [{ label: to === 3 ? 'Bangun' : 'Renovasi', off: !okS || !okM, offMsg: !okS ? 'Ruko belum direnovasi.' : 'Uangmu belum cukup.', fn: () => {
      S.money -= cost; S.kosDebt = 0; S.homeBuild = { to, day: S.day + 1 }; if (S.lease) S.lease.stop = true; sfx('door_bell');
      dialog(to === 3 ? ['Pak Harjo menjabat tanganmu. "Tukangnya sudah saya kabari, Dok. Besok pagi Insya Allah sudah bisa ditempati, nggih."']
        : ['Tukang datang membawa papan parket dan kursi rotan. "Besok pagi beres, Dok. Malam ini tidur seperti biasa saja."']); } },
      { label: 'Batal', fn: () => {} }] });
}
/** Pagi: rumah yang dibangun/direnovasi selesai (sebelum tagihan sewa). */
function houseNewDay() {
  const B = S.homeBuild; if (!B || S.day < B.day) return;
  S.homeBuild = null; S.homeLv = B.to; S.lease = null; S.kosDebt = 0; gardenResize();
  game.dayNews = [game.dayNews, B.to === 3 ? 'Rumah Subsidi selesai dibangun. Mulai pagi ini kamu tinggal di rumah sendiri.' : 'Renovasi selesai. Rumahmu sekarang Rumah Estetik.'].filter(Boolean).join(' ');
}
// ---- [kos] Tempat tinggal: Kos Melati (Lv 1) & Kontrakan (Lv 2), ACC user 2026-11-13 ----
/** Tagihan pagi (dipanggil setelah newDay, saat tidur maupun pingsan). Kabarnya masuk kartu pagi. */
function payRent() {
  houseNewDay(); // [2g] rumah yang dibangun semalam selesai dulu
  nikahMorning(); // [3a-5] hari H, pernikahan tertunda, bonus pagi
  const news = [];
  if (S.homeLv === 1) {
    const due = CFG.KOS.RENT_DAY + (S.kosDebt || 0), pay = Math.min(Math.max(0, Math.floor(S.money)), due);
    S.money -= pay; S.kosDebt = due - pay;
    news.push(S.kosDebt ? 'Uangmu kurang untuk sewa kos. Utang ke Pak Udin ' + rupiah(S.kosDebt) + ', dibayar besok pagi.' : 'Sewa kos ' + rupiah(pay) + ' dibayar ke Pak Udin.');
  } else if (S.homeLv === 2 && S.lease) {
    const K = CFG.KONTRAK, left = S.lease.due - S.day;
    if (left <= 0) {
      if (!S.lease.stop && S.money >= K.RENT) { S.money -= K.RENT; S.lease.due += K.DAYS; news.push('Sewa kontrakan ' + rupiah(K.RENT) + ' dibayar untuk ' + K.DAYS + ' hari ke depan.'); }
      else { news.push((S.lease.stop ? 'Masa kontrak habis.' : 'Uangmu kurang untuk sewa kontrakan.') + ' Kamu kembali ngekos di Kos Melati, kamar 5.'); S.homeLv = 1; S.lease = null; S.kosDebt = 0; gardenResize(); }
    } else if (left <= K.WARN && !S.lease.stop) news.push('Sewa kontrakan ' + rupiah(K.RENT) + ' jatuh tempo ' + left + ' hari lagi.');
  }
  if (news.length) game.dayNews = [game.dayNews, ...news].filter(Boolean).join(' ');
}
/** Masuk kamar 5 dari ruang bersama Kos Melati. */
function enterKos5() {
  sfx('door_open');
  fadeTo(() => { const w = getRoom('kosK'); S.where = { type: 'room', room: 'kosK', door: kos5Door() }; S.px = w.nx + 18; S.py = w.fh - 10; S.dir = 'U'; game.world = w; });
}
/** Panel kontrak di pintu rumah ujung kiri (saat masih ngekos). Bayar di muka + lunasi utang kos. */
function openKontrak() {
  const K = CFG.KONTRAK, debt = S.kosDebt || 0, cost = K.RENT + debt, okS = S.clinicStage >= K.MIN_STAGE, okM = S.money >= cost;
  openPanel({ title: 'Rumah Ujung Kiri', w: 340,
    rows: () => [['Rumah petak di ujung kiri Kampung Asri. Kuncinya dititipkan pemiliknya ke Pak Harjo.', MGC.ink, true],
      ['· Kontrak ' + rupiah(K.RENT) + ' per ' + K.DAYS + ' hari di muka, diperpanjang otomatis. Energi pulih 110%, kebun 8 pot.', MGC.ink2],
      ['· Bangun Rumah Subsidi ' + rupiah(CFG.GARDEN.HOUSE[3].price) + ', jadi besok pagi. Energi maks +20%, kebun 12 petak.', MGC.ink2], // [2g]
      ...(okS ? [] : [['Syarat: ruko sudah direnovasi jadi tempat praktik', MGC.red, true]]),
      ...(debt ? [['Utang kos ke Pak Udin ikut dilunasi: ' + rupiah(debt), MGC.ink2]] : []),
      ['Kontrak ' + rupiah(cost) + ' · Uangmu ' + rupiah(S.money), okM ? MGC.ink : MGC.red, true]],
    buttons: () => [{ label: 'Kontrak', off: !okS || !okM, offMsg: !okS ? 'Ruko belum direnovasi.' : 'Uangmu belum cukup.', fn: () => {
      S.money -= cost; S.kosDebt = 0; S.homeLv = 2; S.lease = { due: S.day + K.DAYS, stop: false }; gardenResize(); sfx('door_bell'); // [2g] 8 pot
      game.world = getZone(S.where.zone);
      dialog(['Pak Harjo menyerahkan kuncinya. "Rumahnya kecil, Dok, tapi atapnya baru diganti tahun lalu. Insya Allah tidak bocor, nggih."',
        'Pak Udin membantu mengangkut barang-barangmu dari Kos Melati. Mulai malam ini kamu tidur di rumah sendiri.']); } },
      { label: 'Bangun rumah', fn: () => openBuild(3) }, // [2g]
      { label: 'Nanti', fn: () => {} }] });
}
/** Area di depan meja kerja Kontrakan (workDesk(2) di rumah2): surat kontrak. */
const LEASE_DESK = [204, 156, 64, 20];
/** Surat kontrak di Kontrakan: lihat jatuh tempo, hentikan/lanjutkan perpanjangan. */
function openLease() {
  const K = CFG.KONTRAK, L = S.lease;
  openPanel({ title: 'Kontrak Rumah', w: 300,
    rows: () => [['Sewa ' + rupiah(K.RENT) + ' per ' + K.DAYS + ' hari', MGC.ink, true],
      ['Masa sewa habis ' + Math.max(0, L.due - S.day) + ' hari lagi (' + SEASONS[Math.floor(((L.due - 1) % (CFG.SEASON_DAYS * CFG.SEASONS_PER_YEAR)) / CFG.SEASON_DAYS)].name + ' hari ' + (((L.due - 1) % CFG.SEASON_DAYS) + 1) + ').', MGC.ink2],
      [L.stop ? 'Kontrak dihentikan. Saat masa sewa habis, kamu kembali ke Kos Melati.' : 'Diperpanjang otomatis kalau uangmu cukup.', L.stop ? MGC.red : MGC.ink2]],
    buttons: () => [L.stop ? { label: 'Lanjutkan Kontrak', fn: () => { L.stop = false; toast('Kontrak diperpanjang otomatis lagi', 'good'); } }
      : { label: 'Hentikan Kontrak', fn: () => { L.stop = true; toast('Kontrak berhenti saat masa sewa habis'); } },
      { label: 'Bangun rumah', fn: () => openBuild(3) }, // [2g]
      { label: 'Tutup', fn: () => {} }] });
}
/** Kartu pagi: hari baru, info musim, status simpan. */
function morningCard(note, seasonChanged) {
  game.trans = { name: dayName() + ', Hari ' + dayOfSeason(), sub: season().name + (seasonChanged ? ' tiba!' : '') + ' · Tahun ' + year(),
    tip: (game.dayNews ? game.dayNews + ' ' : '') + note, t: 0, ready: true, morning: true, done: () => {} }; game.dayNews = '';
  game.scene = 'trans'; sfx(seasonChanged ? 'season_' + season().key : 'morning');
}

// ---- Interaksi ----
function currentAction() {
  const w = game.world;
  if (w.type === 'zone' && (S.dir === 'U' || hangFirst(w)) /* [3b-1] angkringan ramai: nongkrong menang */) { const nk = hangAction(w); if (nk) return nk; } // [3a-3] menghadap gerobak/bangku: nongkrong dulu, baru ngobrol
  if (w.type === 'zone') { const na = npcAction(); if (na) return na; } // [3a] ngobrol
  if (w.type === 'zone') { const d = w.doors.find(d => inRect(S.px, S.py, d.r));
    if (d && d.k === 'rumahK') return { label: 'Rumah Dikontrakkan · Lihat', x: d.x, y: d.r[1] - 26, fn: openKontrak, door: d }; // [kos]
    if (!d && w.id === 'tanjung' && inRect(S.px, S.py, TA_HALTE.r)) return { label: 'Halte · Naik bus pulang', fn: openHalte }; // [2f]
    if (!d) { const nk = hangAction(w); if (nk) return nk; } // [3a-3] nongkrong
    if (!d) { const ga = gardenZoneAction(w); if (ga) return ga; } // [2g]
    if (d) return { label: 'Masuk · ' + (/^klinik/.test(d.k) ? clinicName() : d.name), x: d.x, y: d.r[1] - 26, fn: () => enterRoom(d), door: d }; }
  else {
    if (/^klinik/.test(w.key)) { const a = clinicAction(w); if (a) return a; }
    { const na = npcAction(); if (na) return na; } // [3a] ngobrol (staf klinik juga)
    { const ga = gardenRoomAction(w); if (ga) return ga; } // [2g]
    { const nk = hangAction(w); if (nk) return nk; } // [3a-3] nongkrong
    { const gs = giftShopAction(w); if (gs) return gs; } // [3a-4] etalase oleh-oleh Ci Lina
    { const ns = nikahShopAction(w); if (ns) return ns; } // [3a-5] Emas Lina & Toserba Samudra
    if (w.key === 'kos' && inRect(S.px, S.py, [KOS5_X - 13, w.floorTop - 2, 26, 22])) return S.homeLv === 1 ? { label: 'Masuk · Kamar 5', fn: enterKos5 } // [kos]
      : { label: 'Kamar 5', fn: () => dialog(['Pintunya terkunci. Kamar ini sudah kamu kembalikan ke Pak Udin.']) };
    if (w.key === 'rumah2' && S.lease && inRect(S.px, S.py, LEASE_DESK)) return { label: 'Surat Kontrak Rumah', fn: openLease }; // [kos]
    if (w.key === 'terminal' && inRect(S.px, S.py, TRIP_SPOTS.terminal)) return { label: 'Loket Bus', fn: openLoket }; // [2f]
    if (w.key === 'bahari2' && inRect(S.px, S.py, TRIP_SPOTS.bahari2)) return { label: 'Bahari Medika · Belanja', fn: openBahari };
    if (w.key === 'pos' && inRect(S.px, S.py, TRIP_SPOTS.pos)) return { label: 'Kantor Pos · Pesan Antar', fn: openPost };
    const fa = foodAction(w); if (fa) return fa; // [2h]
    const nearCal = w.cals.some(k => inRect(S.px, S.py, k.r)), nearBed = w.bed && inRect(S.px, S.py, w.bed.r) && w.key === homeRoom();
    if (nearCal && (!nearBed || S.py < w.floorTop + 10)) return { label: 'Lihat Kalender', fn: openCalendar }; // rapat ke dinding = kalender
    if (nearBed) return { label: 'Tidur', fn: askSleep };
  }
  if (w.type === 'zone' && w.boards.some(b => inRect(S.px, S.py, b.r))) return { label: 'Papan Pengumuman · Kalender', fn: openCalendar };
  return null;
}
/** Aksi di dalam klinik: tahap 0 = bersih-bersih & renovasi; tahap 1+ = buka/tutup, periksa pasien, bersihkan. */
function clinicAction(w) {
  const C = S.clinic, at = r => r && inRect(S.px, S.py, r);
  if (S.clinicStage === 0) {
    const pos = CLINIC_POS.klinik0, left = CLEAN_SPOTS.filter(c => !C.cleaned.includes(c.id));
    if (at(pos.desk)) {
      if (C.renovDay != null) return { label: 'Renovasi · selesai besok pagi', fn: () => dialog(['Tukang sudah mulai bekerja. Besok pagi ruko ini sudah jadi tempat praktik.']) };
      if (left.length) return { label: 'Meja kerja tua', fn: () => dialog(['Meja kerja Om Darto masih kokoh. Tapi ruangannya terlalu kotor untuk menyusun rencana. Bersihkan dulu (' + C.cleaned.length + '/' + CLEAN_SPOTS.length + ').']) };
      return { label: 'Rencana Renovasi', fn: openRenov };
    }
    const sp = left.find(c => at(c.r)); if (sp) return { label: 'Bersihkan · ' + sp.label, fn: () => cleanSpot(sp) };
    return null;
  }
  const pos = clinicPos(), chair = C.patients.find(p => p.st === 'chair'), next = queueing().filter(p => p.st === 'wait').sort((a, b) => a.arr - b.arr)[0];
  if (at(pos.unit)) {
    if (chair) return { label: 'Periksa · ' + chair.name, fn: () => openExam(chair) };
    if (next) return { label: 'Panggil · ' + next.name, fn: () => callPatient(next) };
    return { label: 'Kursi dental', fn: () => dialog([C.open ? 'Belum ada pasien di ruang tunggu.' : 'Klinik masih tutup. Buka dulu di meja praktik.']) };
  }
  if (at(pos.desk)) return { label: 'Meja praktik · ' + (C.open ? 'buka' : 'tutup'), fn: openDesk };
  if (at(pos.sink) && C.clean < 100) return { label: 'Bersihkan Klinik · ' + Math.round(C.clean) + '%', fn: wipeClinic };
  return null;
}
/** Bersihkan satu titik kotor Ruko Tua: energi & waktu terpakai, dekorasinya hilang. */
function cleanSpot(sp) {
  const C = S.clinic, K = CFG.CLINIC; sfx('sweep');
  C.cleaned.push(sp.id); addEnergy(-K.CLEAN_ENERGY); game.world = getRoom('klinik0'); spendTime(K.CLEAN_MIN);
  if (game.overlay) return; // pingsan
  if (C.cleaned.length < CLEAN_SPOTS.length) toast(sp.label + ' beres (' + C.cleaned.length + '/' + CLEAN_SPOTS.length + ')', 'good');
  else { sfx('rep_up'); dialog(['Akhirnya bersih! Ruko ini terasa jauh lebih lega.', 'Meja kerja Om Darto masih kokoh. Di sana kamu bisa menyusun rencana renovasi.']); }
}
/** Panel renovasi Ruko Tua → Praktik drg. (GDD §4 tahap 1, Rp 10jt). Selesai besok pagi. */
function openRenov() {
  const K = CFG.CLINIC, cost = K.RENOV_COST;
  openPanel({ title: 'Renovasi Ruko', w: 300,
    rows: () => [['Ruko Tua diubah menjadi Praktik drg. ' + S.name + '.', MGC.ink, true],
      ['· Kursi dental bekas diperbaiki, wastafel & meja praktik', MGC.ink2], ['· Alat Tier 1: kaca mulut, sonde, chlorethyl, probe, tensimeter', MGC.ink2],
      ['· 2 kursi tunggu (antrian 3 pasien)', MGC.ink2], ['· Tukang bekerja hari ini, selesai besok pagi', MGC.ink2],
      ['Biaya ' + rupiah(cost) + ' · Uangmu ' + rupiah(S.money), S.money >= cost ? MGC.ink : MGC.red, true]],
    buttons: () => [{ label: 'Renovasi', off: S.money < cost, offMsg: 'Uangmu belum cukup.', fn: () => {
      S.money -= cost; S.clinic.renovDay = S.day + 1; sfx('door_bell');
      dialog(['Tukang langsung mulai bekerja. Besok pagi ruko ini sudah jadi tempat praktikmu.', 'Sambil menunggu, siapkan stok bahan. Paket bahan klinik dijual di Bahari Medika, Tanjung Arum. Bus berangkat dari Terminal di Jalan Niaga jam 07:00 dan 13:00.']); } },
      { label: 'Nanti', fn: () => {} }] });
}
/** [2e] Upgrade Praktik drg. → Klinik Gigi (GDD §4 tahap 2: Rp 60jt + ★2). Tukang 1 hari, selesai besok pagi; klinik tetap bisa buka hari ini. */
function openUpgrade() {
  const C = S.clinic, to = S.clinicStage + 1, U = CFG.CLINIC.UPGRADE[to] && { ...CFG.CLINIC.UPGRADE[to], cost: CFG.CLINIC.UPGRADE[to].cost * nikahCostMul() }; // [3a-5] Arya -50%
  if (C.renovDay != null) return dialog(['Tukang sedang bekerja. Besok pagi ' + 'Klinik Gigi ' + S.name + ' sudah jadi.']);
  const okS = stars() >= U.stars, okM = S.money >= U.cost;
  openPanel({ title: 'Upgrade Klinik', w: 320,
    rows: () => [['Praktik drg. ' + S.name + ' menjadi Klinik Gigi ' + S.name + '.', MGC.ink, true],
      ['· Ruangan lebih luas: dinding mint, ubin krem, ruang tunggu (antrian 5)', MGC.ink2], ['· Rontgen periapikal: lihat karies tersembunyi, kedalaman lubang, ujung akar', MGC.ink2],
      ['· Bisa merekrut Resepsionis dan Perawat Gigi', MGC.ink2], ['· Tukang bekerja hari ini, selesai besok pagi', MGC.ink2],
      ...(aryaFast() ? [['Arya ikut mengawasi: biaya -50%, selesai jam 18:00 hari ini.', '#c0407a', true]] : []), // [3a-5]
      ['Syarat reputasi ' + U.stars + '★ · sekarang ' + stars() + '★', okS ? MGC.ink : MGC.red, true],
      ['Biaya ' + rupiah(U.cost) + ' · Uangmu ' + rupiah(S.money), okM ? MGC.ink : MGC.red, true]],
    buttons: () => [{ label: 'Upgrade', off: !okS || !okM, offMsg: !okS ? 'Reputasi belum ' + U.stars + '★.' : 'Uangmu belum cukup.', fn: () => {
      S.money -= U.cost; C.renovDay = S.day + 1; C.renovTo = to; sfx('door_bell');
      dialog(['Tukang langsung mulai bekerja. Besok pagi kliniknya sudah lebih luas, lengkap dengan ruang tunggu dan rontgen.', 'Setelah itu kamu bisa merekrut Resepsionis dan Perawat di meja praktik.']); } },
      { label: 'Nanti', fn: () => {} }] });
}
/** Buka/tutup klinik di meja praktik. Pasien datang hanya saat buka, di jam praktik. */
function toggleOpen() {
  const C = S.clinic, K = CFG.CLINIC;
  if (C.open) return dialog(['Tutup klinik sekarang?' + (queueing().length ? ' Pasien yang menunggu akan pulang.' : '')], { choices: [
    { label: 'Tutup klinik', fn: () => { C.open = false; queueing().forEach(p => leavePatient(p, null)); sfx('door_close'); toast('Klinik TUTUP'); } }, { label: 'Batal', fn: () => {} }] });
  if (nikahClosed()) return dialog([nikahClosed()]); // [3a-5]
  if (wdIdx() === K.CLOSED_WD) return dialog(['Hari Minggu klinik libur. Istirahat dulu, Dok.']);
  if (S.time >= K.CLOSE_H * 60) return dialog(['Jam praktik hari ini sudah selesai (08:00-16:00). Buka lagi besok pagi.']);
  if (C.cut) return dialog(['Listrik klinik diputus. Lunasi tunggakan listrik & air ' + rupiah(C.utilDebt) + ' dulu di meja praktik.']); // [rev]
  C.open = true; sfx('door_bell'); clinicTick();
  toast(S.time < K.OPEN_H * 60 ? 'Klinik BUKA · pasien datang mulai pukul 08:00' : 'Klinik BUKA', 'good');
  if (C.stock <= 0) dialog(['Stok bahan masih kosong. Pasien hanya bisa konsultasi.', 'Paket bahan klinik dijual di Bahari Medika, Tanjung Arum (bus dari Terminal, Jalan Niaga), Rp 750.000 untuk 10 tindakan. Bisa juga pesan antar lewat Kantor Pos.']);
}
/** Panggil pasien terdepan ke kursi dental lalu buka panel tindakan. */
function callPatient(p) { const pos = clinicPos(); p.st = 'chair'; p.x = pos.chair[0]; p.y = pos.chair[1]; p.dir = 'D'; p.path = []; sfx('chair_up'); openExam(p); }
// ---- Alur periksa (Fase 2c; GDD §6): anamnesis → pemeriksaan → diagnosis → persetujuan → tindakan ----
/** Meja praktik: buka/tutup klinik dan menu Manajemen. */
function openDesk() {
  const C = S.clinic;
  const ch = [{ label: C.open ? 'Tutup klinik' : 'Buka klinik', fn: toggleOpen }, { label: 'Tarif tindakan', fn: openTariff }, { label: 'Rekam medis', fn: () => openRecords() }];
  if (S.clinicStage >= 2) ch.push({ label: 'Staf', fn: openStaff }); // [2e]
  if (C.broken) ch.push({ label: 'Perbaiki ' + brokenItem()[0].toLowerCase(), fn: openRepair }); // [rev]
  if (C.utilDebt > 0) ch.push({ label: 'Bayar listrik & air · ' + rupiah(C.utilDebt), fn: payUtilDebt }); // [rev]
  if (CFG.CLINIC.UPGRADE[S.clinicStage + 1]) ch.push({ label: C.renovDay != null ? 'Upgrade · selesai besok' : 'Upgrade klinik', fn: openUpgrade });
  ch.push({ label: 'Batal', fn: () => {} });
  dialog(['Meja praktik. ' + (C.open ? 'Klinik sedang buka.' : 'Klinik sedang tutup.')], { choices: ch });
}
/** Menu Manajemen (dari menu Esc): ringkasan klinik + Tarif + Rekam Medis. */
function openManage() {
  if (S.clinicStage < 1) return dialog(['Klinik belum buka. Selesaikan dulu bersih-bersih dan renovasi Ruko Tua.']);
  const C = S.clinic;
  openPanel({ title: 'Manajemen', w: 300,
    rows: () => [[clinicName() + ' · ' + stars() + '★', MGC.ink, true], ['Stok bahan ' + C.stock + ' unit · Kebersihan ' + Math.round(C.clean) + '%', MGC.ink2],
      ['Pasien ditangani ' + C.served + ' · Jumlah pasien dari tarif ×' + tariffMul().toFixed(2), MGC.ink2],
      ['Listrik & air ' + rupiah(CFG.OPS.UTIL_WEEK[S.clinicStage] || 0) + '/minggu (Senin)' + (C.utilDebt > 0 ? ' · tunggakan ' + rupiah(C.utilDebt) : ''), C.utilDebt > 0 ? MGC.red : MGC.ink2, C.utilDebt > 0], // [rev]
      ['Pajak ' + Math.round(taxRate() * 100) + '% ' + dayLabel(S.day + CFG.OPS.TAX_DAYS - (S.day - 1) % CFG.OPS.TAX_DAYS) + ' · pendapatan sejauh ini ' + rupiah(C.taxBase || 0) + (C.taxDebt > 0 ? ' · tunggakan ' + rupiah(C.taxDebt) : ''), C.taxDebt > 0 ? MGC.red : MGC.ink2], // [rev]
      ...(C.broken ? [[brokenItem()[0] + ' rusak' + (C.broken.fix ? ' · sedang diperbaiki' : ' · panggil teknisi di meja praktik'), MGC.red, true]] : []), // [rev]
      ['Jadwal kontrol: ' + (C.returns.filter(r => r.kind === 'ctl' || r.kind === 'refer').map(r => r.name + ' (' + dayLabel(r.day) + ')').join(', ') || 'tidak ada'), MGC.ink2]],
    buttons: () => [{ label: 'Tarif', fn: openTariff }, { label: 'Rekam Medis', fn: () => openRecords() }].concat(S.clinicStage >= 2 ? [{ label: 'Staf', fn: openStaff }] : [], [{ label: 'Tutup', fn: () => {} }]) });
}
/** Label tanggal pendek dari nomor hari absolut. */
function dayLabel(d) { const sd = (d - 1) % (CFG.SEASON_DAYS * 2); return 'Hari ' + (sd % CFG.SEASON_DAYS + 1) + ' ' + (sd < CFG.SEASON_DAYS ? 'Kemarau' : 'Hujan'); }
/** Data periksa yang tersimpan di pasien (tetap ada kalau pasien disuruh menunggu dulu). */
const examOf = p => p.exam || (p.exam = { step: 0, asked: [], chk: {}, bp: null, log: [], qsel: 0, row: 0, col: p.body === 'kid' ? 2 : 5, tool: 0, dsel: 0 });
/** Gigi yang ditandai kursor odontogram. */
const examTooth = p => { const E = examOf(p); return TEETH[p.body === 'kid' ? 'kid' : 'adult'][Math.max(0, E.row)][E.col]; };
/** Jawaban anamnesis pasien. */
function answer(p, id) {
  const d = DX[p.dx], kid = p.body === 'kid';
  if (id === 'riwayat') return kid ? 'Kata Ibu aku sehat, Dok.' : p.med === 'hamil' && !p.preg1 ? 'Saya sedang hamil, Dok. Jalan enam bulan.' : p.med ? MED[p.med].say : 'Sehat-sehat saja, Dok.'; // [2e] trimester 1 = "tiga bulan"
  if (id === 'obat') return kid ? 'Nggak minum obat apa-apa.' : p.drug ? MED[p.drug].obat : p.med ? MED[p.med].obat : 'Nggak minum obat apa-apa. Alergi juga nggak ada.';
  const t = d.a[id], s = t.replace('{loc}', p.tooth ? toothName(p.tooth) : 'gigi saya');
  return t[0] === '{' ? s[0].toUpperCase() + s.slice(1) : s;
}
/** Tanya satu pertanyaan anamnesis (ASK_MIN menit game; semua pertanyaan boleh ditanya). */
function examAsk(p, i) {
  const E = examOf(p), q = ASK[i], X = CFG.CLINIC.EXAM;
  if (E.asked.includes(q.id)) return;
  E.asked.push(q.id); sfx('ui_click'); spendTime(X.ASK_MIN);
}
/** Hasil satu alat pada satu gigi: temuan diagnosis kalau gigi itu bermasalah, selain itu normal. */
function finding(p, toolId, tooth) {
  const d = DX[p.dx], t = EXAM_TOOLS.find(x => x.id === toolId);
  if (p.dx === 'sehat') return { text: toolId === 'kaca' ? d.f.kaca : t.normal, bad: false };
  const hitT = Array.isArray(d.region) ? d.region.includes(tooth) : tooth === p.tooth, f = hitT && d.f[toolId];
  return f ? { text: f, bad: true } : { text: t.normal, bad: false };
}
/** Pakai alat terpilih ke gigi (atau tensimeter ke pasien). 2 menit game per pemeriksaan. */
function examCheck(p, tooth) {
  const E = examOf(p), t = examTools()[E.tool];
  if (t.tooth === false) {
    if (E.bp) return; sfx(t.sfx); E.bp = p.med === 'hipertensi' ? (p.medOk ? '140/90 mmHg (terkontrol)' : '165/100 mmHg (tinggi)') : p.body === 'old' ? '135/85 mmHg' : '120/80 mmHg';
    E.log.push({ t: 'Tensi', text: E.bp, bad: p.med === 'hipertensi' && !p.medOk }); spendTime(CFG.CLINIC.EXAM.CHECK_MIN); return;
  }
  if (toothGone(p, tooth)) { const key = tooth + ':gone'; sfx('ui_tick'); if (!E.chk[key]) { E.chk[key] = { bad: false, gone: true }; E.log.push({ t: tooth + ' · ' + t.short, text: 'Sudah dicabut pada ' + dayLabel(goneOf(p)[tooth]) + ', tinggal ompong' }); } return; } // [2e-rev]
  if (t.id === 'rontgen') return examXray(p, tooth);
  const key = tooth + ':' + t.id; if (E.chk[key]) return;
  sfx(t.sfx); const r = finding(p, t.id, tooth); E.chk[key] = r; E.log.push({ t: tooth + ' · ' + t.short, text: r.text, bad: r.bad }); spendTime(CFG.CLINIC.EXAM.CHECK_MIN);
}
/** [2e] Rontgen periapikal satu gigi (GDD §6 ③): 5 menit, energi 2, biaya ditagih bersama pembayaran pasien.
 *  Hamil trimester 1: kalau sudah diketahui, rontgen ditolak sistem; kalau belum ditanya, pasien menolak, pulang, reputasi −3 (minigame/00 §3.5). */
function examXray(p, tooth) {
  const E = examOf(p), C = S.clinic, X = CFG.CLINIC.XRAY, key = tooth + ':rontgen';
  if (E.chk[key]) { E.xr = tooth; E.xrShow = true; sfx('ui_tick', 1); return; } // foto yang sama dibuka lagi
  if (brokenBlocks('rontgen')) { sfx('ui_deny'); toast('Mesin rontgen rusak. Periksa tanpa foto dulu.', 'bad'); return; } // [rev]
  if (p.med === 'hamil' && p.preg1) {
    if (knownMed(p).includes('hamil')) { sfx('ui_deny'); toast('Hamil trimester 1: rontgen tidak boleh. Periksa tanpa foto.', 'bad'); return; }
    sfx('patient_sad'); addRep(X.REP_PREG); const o = C.people[p.pid]; if (o) o.known = (o.known || []).concat(o.known && o.known.includes('hamil') ? [] : ['hamil']);
    E.asked.includes('riwayat') || E.asked.push('riwayat');
    addRecord(p, null, null, 'konsul', 0, 'Menolak rontgen: hamil tiga bulan (riwayat belum ditanya).');
    closeOverlay(() => { leavePatient(p, null); sfx('chair_down', 0.3);
      dialog(['"Rontgen? Saya sedang hamil tiga bulan, Dok. Kok nggak ditanya dulu..."', p.name + ' menolak dan pulang. Tanyakan riwayat penyakit sebelum memotret rontgen.'], { speaker: p.name }); });
    return;
  }
  sfx('xray'); const r = xrayOf(p, tooth);
  E.chk[key] = { text: r.text, bad: r.bad }; E.log.push({ t: tooth + ' · Rontgen', text: r.text, bad: r.bad }); E.xr = tooth; E.xrShow = true;
  p.xrFee = (p.xrFee || 0) + tariff('rontgen'); addEnergy(-X.ENERGY);
  if (p.dx === 'kariesP' && r.bad) C.hiddenFound = (C.hiddenFound || 0) + 1; // challenge #17 (3b)
  jrEv('xray'); /* [3b-1] #17 pemicu */
  spendTime(X.MIN);
}
/** [2e] Tagihan rontgen + menit administrasi saat pasien membayar. Kembalikan { fee, admin }. */
function takeXray(p) { const fee = p.xrFee || 0; p.xrFee = 0; if (fee) earn(fee); return { fee, admin: adminMin() }; }
const feeText = x => (x.fee ? ' + rontgen ' + rupiah(x.fee) : '') + (x.admin ? ' · administrasi ' + x.admin + ' mnt' : '');
const xrFilmCache = {};
/** Film rontgen HD (toothXR + xrFilm dari mini.js v3) berukuran w×h satuan layar. */
function xrFilmHD(o, w, h) { const k = JSON.stringify(o) + w + 'x' + h; return xrFilmCache[k] || (xrFilmCache[k] = xrFilm(toothXR(o, 2), Math.round(w * HI), Math.round(h * HI))); }
/** [2e-rev] Gigi yang sudah dicabut di klinik ini (rekam medis): { gigi: hari }. Pasien kontrol pasca cabut tetap bisa diperiksa di soketnya. */
const goneOf = p => ((S.clinic.people || {})[p.pid] || {}).gone || {};
const toothGone = (p, n) => goneOf(p)[n] != null && !(p.back && p.back !== 'lama' && n === p.tooth);
/** Riwayat medis yang diketahui dokter (dari anamnesis, tensimeter, atau rekam medis kunjungan sebelumnya). */
function knownMed(p) {
  const E = examOf(p), out = [], o = S.clinic.people && S.clinic.people[p.pid], rec = (o && o.known) || [];
  [p.med, p.drug].filter(Boolean).forEach(m => { if (rec.includes(m) || MED[m].know.some(k => k === 'tensi' ? !!E.bp : E.asked.includes(k))) out.push(m); });
  return out;
}
/** Peluang pasien menyetujui rencana: 70% × pengali tarif + kemampuan bayar + Trust pasien warga (+5%/tingkat, [3a-2]) (GDD §6 ⑤, §4.1). Konsultasi & rujuk selalu setuju. */
function consentChance(p, tx) {
  const X = CFG.CLINIC.EXAM; if (tx === 'konsul' || tx === 'rujuk') return 1;
  return clamp(X.CONSENT_BASE * band(tx).yes + p.afford + trustConsent(p), X.CONSENT_MIN, X.CONSENT_MAX);
}
const chanceWord = c => c >= 0.7 ? 'Pasien tampak yakin.' : c >= 0.45 ? 'Pasien masih menimbang.' : 'Pasien keberatan dengan biayanya.';
/** Identitas pasien yang dibawa ke kunjungan berikutnya (kontrol / kembali / rujukan). */
const ident = p => ({ pid: p.pid, name: p.name, g: p.g, body: p.body, L: p.L, npc: p.npc, med: p.med, drug: p.drug, preg1: !!p.preg1, afford: p.afford, medOk: p.medOk });
/** Riwayat medis berisiko yang sudah diketahui dan sebaiknya dikontrol dulu ke dr. Galih (darah tinggi, pengencer darah). */
const medReferKnown = p => !p.medOk && !!p.med && MED[p.med].refer && knownMed(p).includes(p.med);
/** Tujuan rujukan yang ditampilkan di Rencana Perawatan. */
function referTarget(p, dxKey) {
  const o = DX[dxKey].opts.find(x => x.tx === 'rujuk');
  return medReferKnown(p) && DX[dxKey].tx !== 'konsul' ? 'dr. Galih (Puskesmas)' : o && o.to === 'psa' ? 'RS Metrapura untuk PSA' : o && o.to === 'bedah' ? 'RS Metrapura untuk bedah minor' : 'RS Metrapura';
}
/** Rencana kunjungan kontrol setelah tindakan bertahap. */
const NEXT_TEXT = { pulpDevital: 'mumifikasi + tambal GIC, atau rujuk PSA', pascaObat: 'cabut gigi (atau rujuk PSA)', nekrosis: 'cabut gigi atau rujuk PSA setelah bengkaknya kempis' };
function optNext(dxKey, tx) { const o = DX[dxKey].opts.find(x => x.tx === tx); return o && o.next ? 'Kontrol ' + CFG.CLINIC.EXAM.CONTROL_DAYS + ' hari lagi: ' + NEXT_TEXT[o.next] : ''; }
/** Rencana perawatan: pilihan tindakan dari diagnosis (+ Rujuk) → jelaskan & tawarkan. */
function proposePlan(p, dxKey) {
  const d = DX[dxKey], C = S.clinic, tooth = d.region ? null : examTooth(p), opts = planOpts(dxKey);
  const ov = { kind: 'panel', t: 0, sel: 0 };
  const short = tx => { const cs = CASES[tx]; return cs.stock > 0 && !cs.always && C.stock < cs.stock; };
  // [2d] tensi tinggi terukur (≥160/100) → tindakan invasif ditunda (minigame/00 §3.5), tinggal resep / rujuk
  const locked = tx => p.med === 'hipertensi' && !p.medOk && !!examOf(p).bp && INVASIVE.includes(tx);
  const can = tx => { if (brokenBlocks(tx)) { sfx('ui_deny'); toast(brokenBlocks(tx) + ' rusak. Panggil teknisi di meja praktik, atau pilih tindakan lain.', 'bad'); return false; } // [rev]
    if (short(tx)) { sfx('ui_deny'); toast('Stok bahan habis. Beli di Bahari Medika atau pesan lewat Kantor Pos.', 'bad'); return false; } if (locked(tx)) { sfx('ui_deny'); toast('Tensi tinggi: tindakan ini ditunda. Pilih resep atau rujuk.', 'bad'); return false; } return true; };
  const go = () => { const tx = opts[ov.sel]; if (can(tx)) closeOverlay(() => offer(p, dxKey, tooth, tx)); };
  /** [2d] Jelaskan dulu = minigame konsultasi pendek sebelum pasien memutuskan (minigame/01 §1 ①). */
  const explain = () => { const tx = opts[ov.sel]; if (!can(tx)) return; closeOverlay(() => tx === 'rujuk' || tx === 'konsul' ? offer(p, dxKey, tooth, tx) : startProc(p, dxKey, tooth, tx, 'explain')); };
  const back = () => closeOverlay(() => openExam(p));
  ov.update = function () {
    this.t++;
    if (hit('esc') && this.t > 1) return back();
    if (hit('up')) { this.sel = (this.sel + opts.length - 1) % opts.length; sfx('ui_tick', 1); } if (hit('down')) { this.sel = (this.sel + 1) % opts.length; sfx('ui_tick', 1); }
    if (input.click) { const h = topHit(input.click, /^pl/); if (h) { h.fn(); return; } }
    if (okHit() && this.t > 2) explain();
  };
  const W = 440, H = 70 + opts.length * 40 + 30, X0 = 240 - W / 2, Y0 = Math.max(6, Math.round((270 - H) / 2));
  ov.drawHD = function () { hDim(this, .45); dropIn(this, X0, Y0, W, H, () => this.body()); };
  ov.body = function () {
    const hv = hoverId();
    hBox(X0, Y0, W, H, 'paper', { ornate: true });
    HT('Rencana Perawatan', 240, Y0 + 9, MGC.ink, { k: 4, sh: '#e8b878', align: 'c' }); hDivider(X0 + 14, Y0 + 34, W - 28);
    HT(p.name + ' · ' + rmCode(p.pid) + ' · ' + d.name + (tooth ? ' · gigi ' + tooth : ''), X0 + 14, Y0 + 41, MGC.ink, { bold: true });
    opts.forEach((tx, i) => {
      const y = Y0 + 54 + i * 40, s = i === this.sel, cs = CASES[tx], rj = tx === 'rujuk', b = band(rj ? 'konsul' : tx), sh = short(tx), ch = consentChance(p, tx);
      hBox(X0 + 12, y, W - 24, 37, s ? 'gold' : 'paper', { thin: true, shadow: false }); if (s || hv === 'plo' + i) hGlow(X0 + 12, y, W - 24, 37);
      HT((s ? '▶ ' : '') + (rj ? 'Rujuk ke ' + referTarget(p, dxKey) : cs.name), X0 + 18, y + 4, MGC.ink, { bold: true });
      HT(rj ? rupiah(tariff('konsul')) + ' (konsultasi)' : rupiah(tariff(tx)) + ' · ' + b.label, X0 + W - 18, y + 4, rj ? MGC.ink2 : b.col, { align: 'r', bold: !rj });
      if (brokenBlocks(tx)) HT(brokenBlocks(tx) + ' rusak: belum bisa dikerjakan', X0 + 18, y + 15, MGC.red, { bold: true }); else // [rev]
      HT(rj ? 'Tanpa bahan · ' + cs.min + ' menit' : locked(tx) ? 'Ditunda: tensi ' + examOf(p).bp.split(' ')[0] + ' masih tinggi' : 'Energi -' + cs.energy + ' · ' + cs.min + ' menit · ' + (cs.stock ? 'bahan 1 (stok ' + C.stock + ')' : 'tanpa bahan'), X0 + 18, y + 15, sh || locked(tx) ? MGC.red : MGC.ink2, { bold: sh || locked(tx) });
      HT(rj || tx === 'konsul' ? 'Pasien setuju.' : chanceWord(ch), X0 + W - 18, y + 15, MGC.ink2, { align: 'r' });
      const nx = optNext(dxKey, tx); if (nx) HT(nx, X0 + 18, y + 25, '#2a4a7a');
      clickable(X0 + 12, y, W - 24, 37, () => { if (this.sel === i) go(); else { this.sel = i; sfx('ui_tick', 1); } }, 'plo' + i);
    });
    const by = Y0 + H - 29, bws = [150, 132, (W - 28 - 12) - 282]; let bx = X0 + 14;
    [['Jelaskan dulu', explain], ['Tawarkan langsung', go], ['Kembali', back]].forEach(([lb, fn], i) => {
      hBtn(bx, by, bws[i], 21, lb, { kind: hv === 'plb' + i ? 'gold' : i === 0 ? null : 'paper', on: i === 0, bold: true }); clickable(bx, by, bws[i], 21, fn, 'plb' + i); bx += bws[i] + 6;
    });
  };
  openOverlay(ov);
}
/** Pasien memutuskan. Setuju → minigame tindakan (2d); menolak → bayar konsultasi lalu pulang. Rujuk selalu diterima.
 *  E = efek konsultasi sebelum persetujuan (minigame/01 §4: peluang × (1 + E)). */
function offer(p, dxKey, tooth, tx, E = 0) {
  if (tx === 'rujuk') return refer(p, dxKey, tooth);
  const X = CFG.CLINIC.EXAM;
  if (tx === 'konsul' || Math.random() < clamp(consentChance(p, tx) * (1 + E), X.CONSENT_MIN, X.CONSENT_MAX)) return startProc(p, dxKey, tooth, tx);
  const line = band(tx).yes < 1 ? 'Waduh, mahal juga ya, Dok. Saya pikir-pikir dulu.' : 'Saya tanya keluarga dulu ya, Dok.';
  const pay = tariff('konsul'), xf = takeXray(p); earn(pay); sfx('patient_sad'); sfx('coin_in');
  addRecord(p, dxKey, tooth, 'konsul', pay + xf.fee, 'Menolak rencana ' + CASES[tx].name + '.' + (xf.fee ? ' Bayar rontgen.' : ''));
  leavePatient(p, null); sfx('chair_down', 0.3); if (xf.admin) spendTime(xf.admin); if (game.overlay) return;
  dialog([line, p.name + ' membayar konsultasi ' + rupiah(pay) + feeText(xf) + ' lalu pulang.'], { speaker: p.name });
}
/** Konsultasi saja: minigame konsultasi (minigame/01), bayar tarif konsultasi. Dihitung tindakan benar kalau giginya memang sehat. */
function consultOnly(p) { startProc(p, p.dx === 'sehat' ? 'sehat' : null, null, 'konsul', p.dx === 'sehat' ? 'proc' : 'konsulOnly'); }
/** Rujuk: pasien membayar konsultasi. Tepat (rep +1) kalau kasusnya butuh PSA, atau riwayat medis berisiko sudah diketahui;
 *  rujukan ke dr. Galih → pasien kembali setelah terkontrol. Rujukan yang tidak perlu: tanpa reputasi. */
function refer(p, dxKey, tooth) {
  const C = S.clinic, X = CFG.CLINIC.EXAM, truth = DX[p.dx], okTooth = !!truth.region || tooth === p.tooth, pay = tariff('konsul'), cs = CASES.rujuk;
  const med = medReferKnown(p) && truth.tx !== 'konsul', psa = !med && okTooth && truth.opts.some(o => o.tx === 'rujuk');
  earn(pay); addEnergy(-cs.energy); sfx('paper_flip'); sfx('coin_in'); const xf = takeXray(p);
  let back = null, note;
  if (med) {
    back = S.day + X.REFER_MED_DAYS; note = 'Dirujuk ke dr. Galih: ' + MED[p.med].name.toLowerCase() + ' perlu dikontrol dulu.';
    C.returns.push({ kind: 'refer', day: back, ...ident(p), medOk: true, dx: p.dx, tooth: p.tooth, say: 'Saya sudah ke dr. Galih, Dok. Katanya sekarang aman untuk dirawat giginya.' });
  } else note = 'Dirujuk ke ' + referTarget(p, dxKey) + '.';
  if (med || psa) addRep(X.REP_REFER);
  if (med) jrEv('rujukGalih'); /* [3b-1] #22 */
  addRecord(p, dxKey, tooth, 'rujuk', pay + xf.fee, note, back);
  spendTime(cs.min + xf.admin); leavePatient(p, med || psa ? 'done' : null); sfx('chair_down', 0.3);
  if (game.overlay) return;
  toast('+' + rupiah(pay + xf.fee) + ' · Rujuk' + (med || psa ? ' · rujukan tepat' : '') + feeText({ admin: xf.admin }), 'good');
  if (med) dialog([p.name + ' dirujuk ke dr. Galih di Puskesmas. Setelah ' + MED[p.med].name.toLowerCase() + ' terkontrol, dia kembali ' + dayLabel(back) + '.']);
}
/** Pasien kembali ke kursi tunggu; hasil periksa tetap tersimpan. */
function sendBack(p) { const pos = clinicPos(); p.st = 'wait'; p.x = pos.seats[p.seat][0]; p.y = pos.seats[p.seat][1]; p.until = Math.max(p.until, S.time + 30); sfx('chair_down'); }
/** Catat kunjungan ke rekam medis pasien (GDD §6: odontogram, diagnosis, tindakan, jadwal kontrol). */
function addRecord(p, dxKey, tooth, tx, pay, note, ctl) {
  const C = S.clinic, E = examOf(p), known = knownMed(p);
  C.records.unshift({ pid: p.pid, d: S.day, t: S.time, name: p.name, body: p.body, say: p.sayText, dx: dxKey, tooth, tx, pay, ctl: ctl || null, note: note || '',
    med: known, bp: E.bp, marks: Object.keys(E.chk).filter(k => E.chk[k].bad).map(k => +k.split(':')[0]).filter((v, i, a) => a.indexOf(v) === i), back: p.back || null });
  if (C.records.length > CFG.CLINIC.EXAM.VISITS_MAX) C.records.length = CFG.CLINIC.EXAM.VISITS_MAX;
  const o = C.people[p.pid]; if (o) { o.last = S.day; o.known = (o.known || []).concat(known.filter(m => !(o.known || []).includes(m))); }
}
/** Bersihkan klinik di wastafel (kebersihan +40). */
function wipeClinic() {
  const C = S.clinic, K = CFG.CLINIC; sfx('sweep'); addEnergy(-K.WIPE_ENERGY); C.clean = Math.min(100, C.clean + K.WIPE_GAIN); spendTime(K.WIPE_MIN);
  if (!game.overlay) toast('Klinik dibersihkan · ' + Math.round(C.clean) + '%', 'good');
}
// ---- [2f] Toko alkes Bahari Medika, bus ke Tanjung Arum, pesan antar Kantor Pos (GDD §11.1, ACC user 2026-11-13) ----
/** Area interaksi: loket Terminal, konter Bahari Medika (interior bahari2), loket Kantor Pos. */
const TRIP_SPOTS = { terminal: [168, 90, 80, 20], bahari2: [38, 132, 86, 18], pos: [62, 96, 108, 20] };
/** Jumlah challenge selesai (sistem challenge dibuat di Fase 3b; sampai itu 0). */
const challengesDone = () => S.jr ? S.jr.done.length : 0; /* [3b-1] */
/** Trust NPC (sistem trust Fase 3a; sampai itu 0). */
const trustOf = id => ((S.trust || {})[id]) || 0;
/** Diskon harga teman Koh Hendra sesuai trust. */
function friendDisc() { const t = trustOf('hendra'); const r = CFG.BAHARI.FRIEND_DISC.find(([min]) => t >= min); return r ? r[1] : 0; }
const packPrice = () => Math.round(CFG.CLINIC.PACK_PRICE * (1 - friendDisc()));
/** Pemain sedang di Tanjung Arum (zona atau di dalam Bahari Medika). */
const inTanjung = () => !!S && ((S.where.type === 'zone' && S.where.zone === 'tanjung') || (S.where.type === 'room' && ['bahari2', 'tokoEmas', 'toserba'].includes(S.where.room))); // [3a-5] toko baru
/** Jam bus berikutnya dari daftar (jam desimal), atau null kalau bus hari ini habis. */
const nextBus = list => list.find(h => S.time <= h * 60) ?? null;
const hhmm = h => pad2(Math.floor(h)) + ':' + pad2(Math.round((h % 1) * 60));
/** Tutup klinik saat dokter pergi naik bus: pasien di antrian pulang (aturan tutup yang sudah ada). */
function closeClinicForTrip() {
  const C = S.clinic; if (!C.open) return;
  C.open = false; C.nextArr = null; const q = queueing(); q.forEach(p => leavePatient(p, null));
  toast('Klinik ditutup' + (q.length ? '. ' + q.length + ' pasien pulang, datang lagi lain hari.' : '.'));
}
/** Naik bus: waktu maju ke jam berangkat + lama perjalanan, layar perjalanan (waktu berjalan), tiba di halte/terminal. */
function boardBus(to, depH) {
  const T = CFG.TRIP; closeClinicForTrip();
  if (to === 'tanjung') S.money -= T.TICKET; // tiket pulang-pergi dibayar di loket Rimbasari
  game.overlay = null; S.tripWarn = null;
  game.trans = { bus: { from: to === 'tanjung' ? 'Rimbasari' : 'Tanjung Arum', to: to === 'tanjung' ? 'Tanjung Arum' : 'Rimbasari', h0: depH }, t: 0, ready: false,
    done: () => {
      S.time = (depH + T.LEG_H) * 60; clinicTick();
      if (to === 'tanjung') { S.where = { type: 'zone', zone: 'tanjung' }; S.px = TA_HALTE.arrive[0]; S.py = TA_HALTE.arrive[1]; S.dir = 'D'; game.world = getZone('tanjung'); }
      else { const d = zoneDoorOf('terminal'); S.where = { type: 'zone', zone: d.zone }; S.px = d.x; S.py = d.y + 4; S.dir = 'D'; game.world = getZone(d.zone); }
    } };
  game.scene = 'trans'; sfx('zone_go');
}
/** Pengingat 16:30 dan bus terakhir 17:00 dari Tanjung Arum (pemain otomatis naik). */
function tripTick() {
  if (!inTanjung()) return;
  const T = CFG.TRIP, last = T.BACK[T.BACK.length - 1];
  if (S.time >= T.WARN_H * 60 && S.tripWarn !== S.day) { S.tripWarn = S.day; toast(clockStr() + ' · Bus terakhir ke Rimbasari berangkat ' + hhmm(last) + ' dari halte.'); }
  if (S.time >= last * 60 && game.scene === 'play' && !game.overlay && !game.fade)
    dialog(['Sopir bus membunyikan klakson panjang. "Rimbasari, terakhir! Ayo, Dok, naik!"', 'Kamu bergegas ke halte dan naik bus terakhir.'], { onDone: () => boardBus('rimbasari', last) });
}
/** Loket Terminal Rimbasari: tiket Tanjung Arum (Metrapura terkunci sampai Fase 3b). */
function openLoket() {
  const T = CFG.TRIP, dep = nextBus(T.OUT), cost = T.TICKET, okM = S.money >= cost;
  openPanel({ title: 'Loket Bus', w: 330,
    rows: () => [['Tanjung Arum · ' + rupiah(cost) + ' pulang-pergi', MGC.ink, true],
      ['Pergi ' + T.OUT.map(hhmm).join(' / ') + ' · pulang ' + T.BACK.map(hhmm).join(' / ') + ' · ' + T.LEG_H + ' jam', MGC.ink2],
      dep != null ? ['Bus berikutnya ' + hhmm(dep) + ', tiba ' + hhmm(dep + T.LEG_H) + '. Bus pulang terakhir ' + hhmm(T.BACK[T.BACK.length - 1]) + '.', MGC.ink]
        : ['Bus ke Tanjung Arum hari ini sudah habis. Datang lagi besok pagi.', MGC.red],
      ...(S.clinic.open ? [['Klinik BUKA: kalau berangkat, klinik tutup & antrian pulang.', MGC.red]] : []),
      ['Metrapura · ' + rupiah(T.METRA_TICKET) + ' · butuh ' + T.METRA_CHALLENGES + ' challenge', MGC.ink2],
      ['Uangmu ' + rupiah(S.money), okM ? MGC.ink2 : MGC.red]],
    buttons: () => [{ label: dep != null ? 'Naik bus ' + hhmm(dep) : 'Tidak ada bus', off: dep == null || !okM, offMsg: dep == null ? 'Bus hari ini sudah habis.' : 'Uangmu belum cukup untuk tiket.', fn: () => boardBus('tanjung', dep) },
      { label: 'Metrapura', off: challengesDone() < T.METRA_CHALLENGES, offMsg: 'Butuh ' + T.METRA_CHALLENGES + ' challenge.', fn: () => {} },
      { label: 'Batal', fn: () => {} }] });
}
/** Halte Tanjung Arum: naik bus pulang (tiket sudah dibayar pulang-pergi). */
function openHalte() {
  const T = CFG.TRIP, dep = nextBus(T.BACK);
  if (dep == null) { boardBus('rimbasari', T.BACK[T.BACK.length - 1]); return; }
  dialog(['Bus ke Rimbasari berikutnya berangkat ' + hhmm(dep) + ', tiba ' + hhmm(dep + T.LEG_H) + '.'], {
    choices: [{ label: 'Naik bus ' + hhmm(dep), fn: () => boardBus('rimbasari', dep) }, { label: 'Nanti saja', fn: () => {} }] });
}
/** Toko Bahari Medika: tab Bahan (paket bahan klinik) dan tab Alat (T1 lengkap, T2 terkunci sampai 8 challenge). */
function openBahari() {
  const K = CFG.CLINIC, B = CFG.BAHARI, T = CFG.TRIP; let q = 1, tab = 'bahan';
  if (S.time < B.OPEN_H * 60 || S.time >= B.CLOSE_H * 60) { dialog(['Bahari Medika buka ' + hhmm(B.OPEN_H) + '-' + hhmm(B.CLOSE_H) + '.']); return; }
  const disc = friendDisc();
  openPanel({ title: 'Bahari Medika', w: 330, sel: 3,
    rows: () => tab === 'bahan' ? [['Paket Bahan Klinik · ' + rupiah(packPrice()) + ' per paket', MGC.ink, true],
      ['Isi ' + K.PACK_UNITS + ' unit: tambal, scaling, cabut, dan obat. Satu tindakan memakai 1 unit, konsultasi tidak.', MGC.ink2],
      ['Stok di klinik: ' + S.clinic.stock + ' unit · beli maks ' + K.PACK_MAX_BUY + ' paket sekali datang', MGC.ink2],
      ['Beli ' + q + ' paket = ' + rupiah(q * packPrice()) + ' (+' + q * K.PACK_UNITS + ' unit)', MGC.ink, true],
      [disc ? 'Harga teman Koh Hendra: diskon ' + Math.round(disc * 100) + '%' : 'Harga teman Koh Hendra: belum (trust ' + B.FRIEND_DISC[B.FRIEND_DISC.length - 1][0] + ' = diskon ' + Math.round(B.FRIEND_DISC[B.FRIEND_DISC.length - 1][1] * 100) + '%)', MGC.ink2],
      ['Uangmu ' + rupiah(S.money), S.money >= q * packPrice() ? MGC.ink2 : MGC.red]]
      : [['Alat Tier 1: sudah lengkap di klinikmu.', '#2e6a34', true],
        ['Alat Tier 2 · ' + (challengesDone() >= T.T2_CHALLENGES ? 'segera hadir' : 'terkunci (butuh ' + T.T2_CHALLENGES + ' challenge)'), MGC.red, true],
        ['Scaler ultrasonik · Bor high-speed + komposit + LED · Periotome + bius blok · File tangan PSA', MGC.ink2],
        ['Koh Hendra: "Haiya, yang ini nanti dulu. Klinikmu kerja dulu yang rapi, nanti saya kasih harga teman."', MGC.ink]],
    buttons: () => tab === 'bahan' ? [{ label: 'Alat', keep: true, fn: () => { tab = 'alat'; if (game.overlay) game.overlay.sel = 0; } },
      { label: '◀', keep: true, fn: () => { q = Math.max(1, q - 1); } }, { label: '▶', keep: true, fn: () => { q = Math.min(K.PACK_MAX_BUY, q + 1); } },
      { label: 'Beli', off: S.money < q * packPrice(), offMsg: 'Uangmu belum cukup.', fn: () => { S.money -= q * packPrice(); S.clinic.stock += q * K.PACK_UNITS; sfx('coin'); toast('+' + q * K.PACK_UNITS + ' unit bahan · stok ' + S.clinic.stock, 'good'); } },
      { label: 'Tutup', fn: () => {} }]
      : [{ label: 'Bahan', keep: true, fn: () => { tab = 'bahan'; if (game.overlay) game.overlay.sel = 3; } }, { label: 'Tutup', fn: () => {} }] });
}
/** Hari tiba pesanan Kantor Pos (pagi DAYS hari lagi, +1 kalau lewat jam CUTOFF). */
/** Label hari dengan nama musim lengkap ("Hari 4 Musim Kemarau"). */
const dayLabelM = d => dayLabel(d).replace(/(Kemarau|Hujan)$/, 'Musim $1');
const postArriveDay = () => S.day + CFG.POST.DAYS + (S.time >= CFG.POST.CUTOFF_H * 60 ? 1 : 0);
/** Kantor Pos: pesan antar paket bahan dari katalog Bahari Medika (ongkir, maks 3 paket, satu pesanan aktif). */
function openPost() {
  const K = CFG.CLINIC, P = CFG.POST, o = S.postOrder; let q = 1;
  if (o) { dialog(['Ilham memeriksa buku pesanan. "Paket ' + o.packs + ' dus dari Bahari Medika, Dok. Sampai ' + dayLabelM(o.day) + ' pagi, langsung saya antar ke klinik."']); return; }
  const fee = jrPostFee(P.FEE), total = () => q * packPrice() + fee; /* [3b-1] #6 ongkir gratis */
  openPanel({ title: 'Kantor Pos · Pesan Antar', w: 330, sel: 2,
    rows: () => [['Katalog Bahari Medika (Tanjung Arum) · diantar Ilham', MGC.ink2],
      ['Pesan ' + q + ' paket = ' + rupiah(q * packPrice()) + ' + ongkir ' + (fee ? rupiah(fee) : 'gratis'), MGC.ink, true],
      ['Total ' + rupiah(total()) + ' · tiba ' + dayLabelM(postArriveDay()) + ' pagi, langsung masuk stok klinik', MGC.ink],
      ['Maks ' + P.MAX_PACKS + ' paket per pesanan · satu pesanan sekaligus · pesan sebelum ' + hhmm(P.CUTOFF_H) + ' supaya tiba ' + P.DAYS + ' hari lagi', MGC.ink2],
      ['Uangmu ' + rupiah(S.money), S.money >= total() ? MGC.ink2 : MGC.red]],
    buttons: () => [{ label: '◀', keep: true, fn: () => { q = Math.max(1, q - 1); } }, { label: '▶', keep: true, fn: () => { q = Math.min(P.MAX_PACKS, q + 1); } },
      { label: 'Pesan', off: S.money < total(), offMsg: 'Uangmu belum cukup.', fn: () => { S.money -= total(); jrUsePostFee(); jrEv('post'); /* [3b-1] */ S.postOrder = { packs: q, day: postArriveDay() }; sfx('coin'); toast('Pesanan ' + q + ' paket dikirim · tiba ' + dayLabelM(S.postOrder.day), 'good'); } },
      { label: 'Tutup', fn: () => {} }] });
}
/** Pagi hari: pesanan Kantor Pos yang sudah waktunya masuk stok klinik (kabar di kartu pagi). */
function postNewDay(news) {
  const o = S.postOrder; if (!o || S.day < o.day) return;
  S.clinic.stock += o.packs * CFG.CLINIC.PACK_UNITS; S.postOrder = null;
  news.push('Ilham mengantar ' + o.packs + ' paket bahan dari Bahari Medika. Stok klinik +' + o.packs * CFG.CLINIC.PACK_UNITS + ' unit.');
}
// ---- [2h] Masak & makan (ACC user 2026-11-13, GDD §3.1; ikon, kulkas, letak kulkas: design/v3/src/makan.js) ----
const FD = CFG.FOOD;
/** Kulkas rumah ditambahkan ke ruangan lewat ROOM_EXTRA (gambar ruangan v3 tidak diubah). */
for (const k in FRIDGE_SPOT) { const e = ROOM_EXTRA[k] = ROOM_EXTRA[k] || {}; e.items = [...(e.items || []), [homeFridge(), FRIDGE_SPOT[k][0], FRIDGE_SPOT[k][1]]]; }
/** Sudut kiri atas gambar dapur (kitchen di rooms.js) dan konter warung; area aksi = di depan gambar itu. */
const KITCHEN_SPOT = { kos: [268, 36], rumah2: [136, 34], rumah3: [160, 34], rumah4: [110, 34] };
const WARUNG_COUNTER = [140, 74];
/** Kalimat Bu Ratna saat membuka warung (suara: cepat, "eh", "lho", "aduh", "Dok, Dok!"). Bergilir per hari. */
const RATNA_SHOP = ['Dok, Dok! Telurnya baru datang tadi subuh, lho.', 'Eh, Dok, ayamnya segar. Baru dipotong tadi pagi.',
  'Lho, Dok masak sendiri? Wah, rajin, ya.', 'Aduh, Dok kelihatan capek. Makan yang bener, ya.', 'Bibit musim ini saja, Dok. Yang lain nanti, ya.'];
/** Area di depan sebuah gambar furnitur di ruangan (dicari dari posisi gambarnya). */
function entFront(w, pos) { const e = pos && w.ents.find(e => e.X === pos[0] && e.Y === pos[1]); return e ? [e.X - 2, e.Y + e.img.height - 4, e.img.width + 4, 22] : null; }
const isBottle = k => FD.BOTTLES.includes(k);
/** Isi tas/kulkas: bahan biasa per buah, botol per botol (takaran dibulatkan ke atas). */
const foodSlots = o => Object.entries(o).reduce((a, [k, v]) => a + (isBottle(k) ? Math.ceil(v / FD.BOTTLE) : v), 0);
const foodHave = k => (S.food.bag[k] || 0) + (S.food.fridge[k] || 0);
const bekalCount = () => Object.values(S.food.bekal).reduce((a, b) => a + b, 0);
const foodLabel = (o, k) => isBottle(k) ? (o[k] || 0) + ' tkr' : '×' + (o[k] || 0);
const foodName = k => (FD.ITEMS[k] || FD.RECIPES[k])[0];
/** Ruangan dapur/kulkas milik pemain sekarang (Kos Melati = ruang bersama kos). */
const ownKitchen = key => key === (S.homeLv === 1 ? 'kos' : 'rumah' + S.homeLv);
/** Tambah energi dari makanan: tidak melebihi energi maks (tapi tidak memotong kelebihan dari Kontrakan). Mengembalikan energi yang benar-benar naik. */
function eatEnergy(e) { const b = S.energy; S.energy = Math.max(S.energy, Math.min(energyMax(), S.energy + e)); return S.energy - b; }
const ICF_HD2c = {};
/** Ikon makanan HD: 16 satuan (32 piksel tampilan), big = 32 satuan. */
function hFood(k, X, Y, big) { const img = big ? (ICF_HD2c[k] || (ICF_HD2c[k] = epxImg(ICF_HD[k]))) : ICF_HD[k]; hc.imageSmoothingEnabled = false; hc.drawImage(img, Math.round(X * HI), Math.round(Y * HI)); }
function hSel(X, Y, W, H) { hR(X, Y, W, 1, '#e8a020'); hR(X, Y + H - 1, W, 1, '#e8a020'); hR(X, Y, 1, H, '#e8a020'); hR(X + W - 1, Y, 1, H, '#e8a020'); }
/** Kotak bahan kecil: ikon di atas, label di bawah (tidak saling menutupi). */
function hFoodTile(k, X, Y, W, H, label, sel, id) {
  hInset(X, Y, W, H, sel ? '#ffe7a0' : null); if (sel) hSel(X, Y, W, H);
  hFood(k, X + W / 2 - 8, Y + 3); HT(label, X + W / 2, Y + H - 11, MGC.ink, { align: 'c', bold: true }); if (id) clickable(X, Y, W, H, () => {}, id);
}
/** Panel makanan HD: judul, isi (o.draw), tombol rata kanan. o.nav(ov) untuk tombol arah; E/Enter menekan tombol terpilih (ov.bsel). */
function foodPanel(o) {
  const W = o.w, H = o.h, X = 240 - W / 2, Y = o.y != null ? o.y : Math.round((270 - H) / 2);
  return openOverlay({ kind: 'panel', t: 0, sel: 0, bsel: o.bsel || 0, side: 'tas',
    update() {
      this.t++; const bs = o.buttons(this);
      if ((hit('esc') || (o.bagKey && hit('bag'))) && this.t > 1) { closeOverlay(); return; }
      if (o.nav) o.nav(this); this.bsel = Math.min(this.bsel, bs.length - 1);
      if (input.click) {
        const h = topHit(input.click, /^f[bct]/);
        if (h && h.id[1] === 'b') { this.bsel = +h.id.slice(2); this.press(); return; }
        if (h && h.id[1] === 'c') { if (o.cell) o.cell(this, h.id.slice(2)); return; }
        if (h && h.id[1] === 't') { if (o.tab) o.tab(this, h.id.slice(2)); return; }
      }
      if (okHit() && this.t > 2) this.press();
    },
    press() {
      const b = o.buttons(this)[this.bsel]; if (!b) return;
      if (b.off) { sfx('ui_deny'); if (b.offMsg) toast(b.offMsg, 'bad'); return; }
      if (b.keep) b.fn(this); else closeOverlay(() => b.fn(this));
    },
    drawHD() {
      hDim(this, .45);
      dropIn(this, X, Y, W, H, () => {
        hBox(X, Y, W, H, 'paper', { ornate: true });
        HT(o.title, 240, Y + 9, MGC.ink, { k: 4, sh: '#e8b878', align: 'c' }); hDivider(X + 14, Y + 34, W - 28);
        o.draw(this, X, Y, W, H);
        const bs = o.buttons(this), gap = 6, hv = hoverId(), by = Y + H - 27; let bx = X + W - 14 - bs.reduce((a, b) => a + b.w + gap, 0) + gap;
        bs.forEach((b, i) => {
          if (hv === 'fb' + i) this.bsel = i; const s = i === this.bsel;
          hBtn(bx, by, b.w, 18, b.label, { on: s && !b.off });
          if (b.off) { hc.fillStyle = 'rgba(70,50,30,.45)'; hc.fillRect(Math.round(bx * HI), Math.round(by * HI), Math.round(b.w * HI), 18 * HI); if (s) hGlow(bx, by, b.w, 18); }
          clickable(bx, by, b.w, 18, () => {}, 'fb' + i); bx += b.w + gap;
        });
      });
    } });
}
/** Warung Bu Ratna: bahan makanan + bibit herba [2g] dalam satu panel (revisi user 2026-11-13). ◀▶ pilih, ↑↓ jumlah, E beli.
 *  Bahan masuk Tas (maks BAG_MAX isi); bibit masuk kantong bibit kebun (S.seeds, maks GARDEN.SEED_MAX per jenis, hanya musimnya). */
function openWarung() {
  if (S.time < FD.OPEN_H * 60 || S.time >= FD.CLOSE_H * 60) { dialog(['Warungnya sudah tutup. Di pintu tergantung papan kardus: "TUTUP. BUKA JAM 6". Tulisannya tulisan anak-anak.']); return; }
  const G = CFG.GARDEN, items = [...Object.keys(FD.ITEMS).filter(k => !GIFT_SHOP_OF[k] || GIFT_SHOP_OF[k] === 'warung' /* [3a-4] */).map(k => ({ k, seed: false })), ...HERB_KEYS.filter(k => G.HERBS[k].shop === 'warung').map(k => ({ k, seed: true }))];
  const line = RATNA_SHOP[S.day % RATNA_SHOP.length], SEED_HD = {}; let q = 1;
  const cur = ov => items[ov.sel], price = it => it.seed ? seedPrice(it.k, 'warung') : FD.ITEMS[it.k][1];
  const nm = it => it.seed ? herbName(it.k) : FD.ITEMS[it.k][0], inSeason = it => !it.seed || G.HERBS[it.k].season === season().key;
  const have = it => it.seed ? S.seeds[it.k] || 0 : S.food.bag[it.k] || 0;
  const addSlots = it => it.seed ? 0 : isBottle(it.k) ? Math.ceil((have(it) + q * FD.BOTTLE) / FD.BOTTLE) - Math.ceil(have(it) / FD.BOTTLE) : q;
  const why = it => !inSeason(it) ? 'Bibit ' + nm(it) + ' dijual saat ' + seasonName(G.HERBS[it.k].season) + '.' : S.money < q * price(it) ? 'Uangmu belum cukup.'
    : it.seed ? (have(it) + q > G.SEED_MAX ? 'Bibit ' + nm(it) + ' maks ' + G.SEED_MAX + '.' : '') : (foodSlots(S.food.bag) + addSlots(it) > FD.BAG_MAX ? 'Tasmu penuh (' + FD.BAG_MAX + '). Simpan dulu di kulkas.' : '');
  foodPanel({ title: 'Warung Bu Ratna', w: 372, h: 258, y: 6, bsel: 2,
    nav(ov) { if (hit('left')) { ov.sel = (ov.sel + items.length - 1) % items.length; sfx('ui_tick', -1); } if (hit('right')) { ov.sel = (ov.sel + 1) % items.length; sfx('ui_tick', 1); }
      if (hit('up')) q = Math.min(FD.BUY_MAX, q + 1); if (hit('down')) q = Math.max(1, q - 1); },
    cell(ov, i) { ov.sel = +i; sfx('ui_tick', 1); },
    draw(ov, X, Y, W, H) {
      HT(['Bu Ratna: "' + line + '"', '"' + line + '"'].find(t => hW(t) <= W - 28) || fitText('"' + line + '"', W - 28), X + 14, Y + 40, MGC.ink2);
      const cw = 66, ch = 44;
      items.forEach((it, i) => { const cx = X + 14 + (i % 5) * (cw + 2.5), cy = Y + 52 + Math.floor(i / 5) * (ch + 3), s = i === ov.sel, ok = inSeason(it), n = nm(it);
        hInset(cx, cy, cw, ch, s ? '#ffe7a0' : ok ? null : '#e2cfae'); if (s) hSel(cx, cy, cw, ch);
        if (it.seed) { const img = SEED_HD[it.k] || (SEED_HD[it.k] = epxImg(seedImg(it.k))); hc.imageSmoothingEnabled = false; hc.drawImage(img, Math.round((cx + cw / 2 - 8) * HI), Math.round((cy + 2) * HI)); }
        else hFood(it.k, cx + cw / 2 - 8, cy + 2);
        HT(n, cx + cw / 2, cy + 21, ok ? MGC.ink : MGC.ink2, { align: 'c', bold: hW(n, true) <= cw - 4 });
        HT(ok ? rupiah(price(it)) : seasonName(G.HERBS[it.k].season), cx + cw / 2, cy + 32, ok ? MGC.ink2 : MGC.red, { align: 'c' });
        const hv = have(it); if (hv) { const t = '' + hv, tw = hW(t, false) + 5; hR(cx + cw - 3 - tw, cy + 3, tw, 10, '#3a1e0c'); HT(t, cx + cw - 3 - tw / 2, cy + 4.5, '#fff3da', { align: 'c' }); }
        clickable(cx, cy, cw, ch, () => {}, 'fc' + i); });
      const it = cur(ov), ty = Y + 197, n = nm(it), pr = price(it); hDivider(X + 14, ty - 4, W - 28);
      let opts;
      if (it.seed) { const h = G.HERBS[it.k]; opts = ['Bibit ' + n + ' · ' + rupiah(pr) + ' · tumbuh ' + h.days + ' hari · ' + h.eff + ' · punya ' + have(it), 'Bibit ' + n + ' · ' + rupiah(pr) + ' · ' + h.eff + ' · punya ' + have(it), 'Bibit ' + n + ' · punya ' + have(it)]; }
      else { const k = it.k, unit = FD.ITEMS[k][2], tas = foodLabel(S.food.bag, k).replace('×', ''), kul = foodLabel(S.food.fridge, k).replace('×', ''), bot = isBottle(k) ? ' (' + FD.BOTTLE + ' takaran)' : '';
        opts = [n + ' · ' + rupiah(pr) + ' per ' + unit + bot + ' · tas ' + tas + ' · kulkas ' + kul, n + ' · ' + rupiah(pr) + ' per ' + unit + ' · tas ' + tas + ' · kulkas ' + kul, n + ' · tas ' + tas + ' · kulkas ' + kul]; }
      HT(opts.find(t => hW(t, true) <= W - 28) || n, X + 14, ty, MGC.ink, { bold: true });
      HT(it.seed ? 'Bibit masuk kantong bibit, ditanam di pot atau bedeng kebun.' : 'Bahan masuk tas (isi ' + foodSlots(S.food.bag) + '/' + FD.BAG_MAX + '). Masak di dapur kos atau rumah.', X + 14, ty + 12, MGC.ink2);
      HT('Beli ' + q + ' = ' + rupiah(q * pr), X + 14, Y + H - 24, MGC.ink, { bold: true }); HT('Uangmu ' + rupiah(S.money), X + 14, Y + H - 14, S.money >= q * pr ? MGC.ink2 : MGC.red);
    },
    buttons: ov => [{ label: '◀', w: 24, keep: true, fn: () => { q = Math.max(1, q - 1); } }, { label: '▶', w: 24, keep: true, fn: () => { q = Math.min(FD.BUY_MAX, q + 1); } },
      { label: 'Beli', w: 64, keep: true, off: !!why(cur(ov)), offMsg: why(cur(ov)),
        fn: () => { const it = cur(ov); S.money -= q * price(it); sfx('coin_out');
          if (it.seed) { S.seeds[it.k] = have(it) + q; toast('+' + q + ' bibit ' + nm(it), 'good'); }
          else { S.food.bag[it.k] = have(it) + q * (isBottle(it.k) ? FD.BOTTLE : 1); toast('+' + q + ' ' + nm(it) + ' masuk tas', 'good'); } } },
      { label: 'Tutup', w: 64, fn: () => {} }] });
}
/** Tas (tombol I / menu Esc): bahan & bekal. Susu diminum langsung, bekal dimakan langsung. */
function openTas() {
  const list = () => [...Object.keys(FD.ITEMS).filter(k => S.food.bag[k]).map(k => ({ k, bek: false })), ...Object.keys(FD.RECIPES).filter(k => S.food.bekal[k]).map(k => ({ k, bek: true }))];
  const cur = ov => list()[Math.min(ov.sel, list().length - 1)];
  foodPanel({ title: 'Tas', w: 380, h: 192, bagKey: true,
    nav(ov) { const n = list().length || 1; if (hit('left')) ov.sel = (ov.sel + n - 1) % n; if (hit('right')) ov.sel = (ov.sel + 1) % n; },
    cell(ov, i) { ov.sel = +i; },
    draw(ov, X, Y, W, H) {
      const L = list(), F = S.food, c = cur(ov), cw = 32, ch = 36, g = 3.5;
      HT('Bahan makanan · isi ' + foodSlots(F.bag) + '/' + FD.BAG_MAX, X + 14, Y + 40, MGC.ink, { bold: true });
      HT('Makan hari ini ' + F.meals + '/' + FD.MEALS_DAY + ' · susu ' + F.milk + '/' + FD.MILK_DAY, X + W - 14, Y + 40, MGC.ink2, { align: 'r' });
      const bahan = L.filter(e => !e.bek), bek = L.filter(e => e.bek);
      if (!bahan.length) HT('Belum ada bahan. Belanja di Warung Bu Ratna.', X + 14, Y + 64, MGC.ink2);
      bahan.forEach((e, i) => hFoodTile(e.k, X + 14 + i * (cw + g), Y + 52, cw, ch, foodLabel(F.bag, e.k), c === e, 'fc' + i));
      const by = Y + 95; HT('Bekal · ' + bekalCount() + '/' + FD.BEKAL_MAX, X + 14, by, MGC.ink, { bold: true });
      bek.forEach((e, i) => hFoodTile(e.k, X + 14 + i * (cw + g), by + 12, cw, ch, '×' + F.bekal[e.k], c === e, 'fc' + (bahan.length + i)));
      if (!bek.length) { HT('Belum ada bekal. Di dapur, pilih "Jadi Bekal".', X + 14, by + 18, MGC.ink2); HT('Bisa dimakan di mana saja, kecuali saat menangani pasien.', X + 14, by + 29, MGC.ink2); }
      else { const tx = X + 14 + bek.length * (cw + g) + 8; HT('Bekal bisa dimakan di mana saja,', tx, by + 18, MGC.ink2); HT('kecuali saat menangani pasien.', tx, by + 29, MGC.ink2); }
      hDivider(X + 14, Y + H - 48, W - 28);
      const info = !c ? 'Tasmu kosong.' : c.bek ? foodName(c.k) + ' ×' + F.bekal[c.k] + ' · makan: energi +' + FD.RECIPES[c.k][3]
        : c.k === 'susu' ? 'Susu ×' + F.bag.susu + ' · minum langsung: energi +' + FD.MILK_ENERGY
        : c.k === 'cincin' ? 'Cincin Lamaran ' + foodLabel(F.bag, c.k) + ' · untuk melamar pacarmu' // [3a-5]
        : isGiftItem(c.k) ? foodName(c.k) + ' ' + foodLabel(F.bag, c.k) + ' · bisa dijadikan hadiah (G di dekat orang)' // [3a-4]
        : foodName(c.k) + ' ' + foodLabel(F.bag, c.k) + (isBottle(c.k) ? ' (1 botol = ' + FD.BOTTLE + ' takaran)' : '') + ' · dimasak di dapur';
      HT(info, X + 14, Y + H - 43, MGC.ink, { bold: true });
      HT('Tombol I: buka/tutup Tas', X + 14, Y + H - 22, MGC.ink2);
    },
    buttons(ov) {
      const c = cur(ov), F = S.food;
      const act = !c || (!c.bek && c.k !== 'susu') ? { label: 'Makan', w: 64, off: true, offMsg: c ? 'Bahan ini dimasak dulu di dapur.' : 'Tasmu kosong.' }
        : c.k === 'susu' && !c.bek ? { label: 'Minum', w: 64, off: F.milk >= FD.MILK_DAY, offMsg: 'Sudah ' + FD.MILK_DAY + ' kotak susu hari ini.', keep: true,
          fn: () => { F.bag.susu--; if (!F.bag.susu) delete F.bag.susu; F.milk++; const g = eatEnergy(FD.MILK_ENERGY); sfx('gulp'); toast('Susu diminum · energi +' + g, 'good'); } }
        : { label: 'Makan', w: 64, off: F.meals >= FD.MEALS_DAY, offMsg: 'Kamu sudah kenyang. Makan lagi besok.', keep: true,
          fn: () => { F.bekal[c.k]--; if (!F.bekal[c.k]) delete F.bekal[c.k]; F.meals++; const g = eatEnergy(FD.RECIPES[c.k][3]); sfx('eat'); toast(foodName(c.k) + ' dimakan · energi +' + g, 'good'); } };
      return [act, { label: 'Tutup', w: 64, fn: () => {} }];
    } });
}
/** Kulkas: kiri Tas, kanan Kulkas. ◀▶ pilih, Tab pindah sisi, E simpan/ambil 1. Botol dipindah per botol. */
function openKulkas(shared) {
  const F = S.food, cols = 5, cw = 32, ch = 36, g = 3.5, bw = cols * (cw + g) - g;
  const src = ov => ov.side === 'tas' ? F.bag : F.fridge, dst = ov => ov.side === 'tas' ? F.fridge : F.bag, dmax = ov => ov.side === 'tas' ? FD.FRIDGE_MAX : FD.BAG_MAX;
  const list = o => Object.keys(FD.ITEMS).filter(k => o[k]);
  const cur = ov => { const L = list(src(ov)); return L[Math.min(ov.sel, L.length - 1)]; };
  /** Pindahkan satu buah (atau satu botol) bahan k; false kalau tujuan penuh. */
  const move1 = (ov, k) => { const s = src(ov), d = dst(ov), n = isBottle(k) ? (s[k] % FD.BOTTLE || FD.BOTTLE) : 1;
    const after = { ...d, [k]: (d[k] || 0) + n }; if (foodSlots(after) > dmax(ov)) return false;
    d[k] = after[k]; s[k] -= n; if (!s[k]) delete s[k]; return true; };
  sfx('fridge');
  foodPanel({ title: shared ? 'Kulkas Bersama' : 'Kulkas', w: 392, h: 214,
    nav(ov) { const n = list(src(ov)).length || 1;
      if (hit('left')) ov.sel = (ov.sel + n - 1) % n; if (hit('right')) ov.sel = (ov.sel + 1) % n;
      if (hit('tab')) { ov.side = ov.side === 'tas' ? 'kulkas' : 'tas'; ov.sel = 0; sfx('ui_tick', 1); } },
    cell(ov, id) { const [s, i] = id.split('_'); ov.side = s; ov.sel = +i; },
    draw(ov, X, Y, W, H) {
      const box = (o, bx, title, cap, side) => { HT(title + ' · isi ' + foodSlots(o) + '/' + cap, bx, Y + 40, MGC.ink, { bold: true });
        const L = list(o); if (!L.length) HT('Kosong', bx, Y + 60, MGC.ink2);
        L.forEach((k, i) => hFoodTile(k, bx + (i % cols) * (cw + g), Y + 52 + Math.floor(i / cols) * (ch + 3), cw, ch, foodLabel(o, k), ov.side === side && k === cur(ov), 'fc' + side + '_' + i)); };
      box(F.bag, X + 14, 'Tas', FD.BAG_MAX, 'tas'); box(F.fridge, X + W - 14 - bw, 'Kulkas', FD.FRIDGE_MAX, 'kulkas');
      hR(240, Y + 42, 0.5, 82, 'rgba(122,74,38,.45)');
      hDivider(X + 14, Y + H - 62, W - 28);
      const k = cur(ov);
      HT(k ? foodName(k) + ' ' + foodLabel(src(ov), k).replace('×', '×') + ' di ' + (ov.side === 'tas' ? 'tas' : 'kulkas') + '.' : (ov.side === 'tas' ? 'Tasmu kosong.' : 'Kulkasnya kosong.'), X + 14, Y + H - 56, MGC.ink, { bold: true });
      HT('Dapur memakai bahan dari tas dan kulkas. Tab: pindah sisi.', X + 14, Y + H - 44, MGC.ink2);
    },
    buttons(ov) { const tas = ov.side === 'tas', k = cur(ov);
      return [{ label: tas ? 'Simpan 1' : 'Ambil 1', w: 70, keep: true, off: !k, offMsg: tas ? 'Tasmu kosong.' : 'Kulkasnya kosong.',
          fn: () => { if (move1(ov, k)) sfx('ui_tick', 1); else { sfx('ui_deny'); toast(tas ? 'Kulkas penuh.' : 'Tasmu penuh.', 'bad'); } } },
        { label: tas ? 'Simpan Semua' : 'Ambil Semua', w: 96, keep: true, off: !k, offMsg: tas ? 'Tasmu kosong.' : 'Kulkasnya kosong.',
          fn: () => { let n = 0, full = false; list(src(ov)).forEach(k2 => { while (src(ov)[k2]) { if (!move1(ov, k2)) { full = true; break; } n++; } }); ov.sel = 0;
            sfx(n ? 'ui_tick' : 'ui_deny', 1); if (full) toast((tas ? 'Kulkas' : 'Tasmu') + ' penuh, sebagian tidak muat.', 'bad'); } },
        { label: 'Tutup', w: 60, fn: () => {} }]; } });
}
/** Dapur: ↑↓ pilih masakan, ◀▶ pilih tombol, E tekan. Bahan diambil dari kulkas dulu, lalu tas. */
function openDapur(shared) {
  const keys = Object.keys(FD.RECIPES), F = S.food;
  const ok = k => Object.entries(FD.RECIPES[k][1]).every(([q, c]) => foodHave(q) >= c);
  const use = k => Object.entries(FD.RECIPES[k][1]).forEach(([q, c]) => { for (let i = 0; i < c; i++) { const o = F.fridge[q] ? F.fridge : F.bag; o[q]--; if (!o[q]) delete o[q]; } });
  const cook = (k, eat) => { const [n, , min, en] = FD.RECIPES[k]; use(k); sfx('sizzle'); const e0 = S.energy; spendTime(min); if (game.overlay) return; // pingsan lewat 24:00
    let g = 0; if (eat) { F.meals++; g = eatEnergy(en); sfx('eat'); } else F.bekal[k] = (F.bekal[k] || 0) + 1;
    openCooked(k, eat, e0, g, min); };
  foodPanel({ title: shared ? 'Dapur Bersama' : 'Dapur', w: 380, h: 240, y: 16,
    nav(ov) { if (hit('up')) ov.sel = (ov.sel + keys.length - 1) % keys.length; if (hit('down')) ov.sel = (ov.sel + 1) % keys.length;
      const nb = (S.herbs && S.herbs.serai > 0) ? 4 : 3; if (hit('left')) ov.bsel = (ov.bsel + nb - 1) % nb; if (hit('right')) ov.bsel = (ov.bsel + 1) % nb; },
    cell(ov, i) { ov.sel = +i; },
    draw(ov, X, Y, W) {
      HT('Energi ' + Math.round(S.energy) + '/' + energyMax() + ' · makan ' + F.meals + '/' + FD.MEALS_DAY + ' · bekal ' + bekalCount() + '/' + FD.BEKAL_MAX, X + 14, Y + 40, MGC.ink2);
      HT('Angka = tas + kulkas', X + W - 14, Y + 40, MGC.ink2, { align: 'r' });
      keys.forEach((k, i) => { const [n, need, min, en] = FD.RECIPES[k], ry = Y + 52 + i * 25, rx = X + 14, rw = W - 28, can = ok(k), s = i === ov.sel;
        hInset(rx, ry, rw, 23, s ? '#ffe7a0' : (can ? null : '#e2cfae')); if (s) hSel(rx, ry, rw, 23);
        hFood(k, rx + 4, ry + 3.5); HT(n, rx + 25, ry + 3, can ? MGC.ink : MGC.ink2, { bold: true }); HT(min + ' menit', rx + 25, ry + 13, MGC.ink2);
        let ix = rx + 136; Object.entries(need).forEach(([q, c]) => { hFood(q, ix, ry + 3.5); const have = foodHave(q); HT('' + have, ix + 18, ry + 8, have >= c ? MGC.ink : MGC.red, { bold: true }); ix += 40; });
        HT('Energi +' + en, rx + rw - 6, ry + 8, can ? '#2e6a34' : MGC.ink2, { align: 'r', bold: true }); clickable(rx, ry, rw, 23, () => {}, 'fc' + i); });
    },
    buttons(ov) { const k = keys[ov.sel], can = ok(k), miss = can ? '' : 'Bahannya kurang. Beli di Warung Bu Ratna.';
      return [{ label: 'Masak & Makan', w: 100, off: !can || F.meals >= FD.MEALS_DAY, offMsg: miss || 'Kamu sudah kenyang. Makan lagi besok.', fn: () => cook(k, true) },
        { label: 'Jadi Bekal', w: 76, off: !can || bekalCount() >= FD.BEKAL_MAX, offMsg: miss || 'Bekalmu sudah ' + FD.BEKAL_MAX + '. Makan dulu salah satunya.', fn: () => cook(k, false) },
        ...(S.herbs && S.herbs.serai > 0 ? [{ label: 'Seduh Serai', w: 84, fn: brewSerai }] : []), // [2g] wedang serai jahe
        { label: 'Tutup', w: 56, fn: () => {} }]; } });
}
/** Kartu "Matang!" setelah memasak. */
function openCooked(k, eat, e0, g, min) {
  foodPanel({ title: 'Matang!', w: 236, h: 118,
    draw(ov, X, Y) { hFood(k, X + 16, Y + 42, true); HT(foodName(k), X + 58, Y + 44, MGC.ink, { bold: true });
      HT(eat ? 'Energi +' + g + ' · ' + Math.round(e0) + ' ▶ ' + Math.round(S.energy) : 'Disimpan di tas sebagai bekal', X + 58, Y + 56, '#2e6a34', { bold: true });
      HT('Waktu berjalan ' + min + ' menit', X + 58, Y + 68, MGC.ink2); },
    buttons: () => [{ label: 'OK', w: 60, fn: () => {} }] });
}
/** Aksi makanan di ruangan: konter warung, dapur, kulkas. */
function foodAction(w) {
  const at = r => r && inRect(S.px, S.py, r);
  const wc = w.key === 'warung' && entFront(w, WARUNG_COUNTER); if (wc && at([wc[0] - 8, wc[1] - 4, wc[2] + 16, wc[3] + 10])) return { label: 'Warung Bu Ratna · Belanja', fn: openWarung };
  const kos = w.key === 'kos', mine = ownKitchen(w.key), notMine = () => dialog(['Kamu sudah tidak ngekos di sini. Dapur dan kulkas ini milik anak-anak kos.']);
  if (at(entFront(w, FRIDGE_SPOT[w.key]))) return { label: kos ? 'Kulkas Bersama' : 'Kulkas', fn: mine ? () => openKulkas(kos) : notMine };
  if (at(entFront(w, KITCHEN_SPOT[w.key]))) return { label: (kos ? 'Dapur Bersama' : 'Dapur') + ' · Masak', fn: mine ? () => openDapur(kos) : notMine };
  return null;
}
SFX.sizzle = () => { noise({ d: 0.9, v: 0.05, ft: 'highpass', f: 3000, a: 0.05 }); noise({ t: 0.35, d: 0.7, v: 0.04, ft: 'highpass', f: 4200, a: 0.05 }); };
SFX.eat = () => [0, 0.17, 0.34].forEach(t => noise({ t, d: 0.07, v: 0.08, ft: 'lowpass', f: 900 }));
SFX.gulp = () => { tone({ f: 320, f1: 180, d: 0.12, v: 0.07, type: 'sine' }); tone({ t: 0.22, f: 300, f1: 170, d: 0.12, v: 0.07, type: 'sine' }); };
SFX.fridge = () => { noise({ d: 0.25, v: 0.05, ft: 'lowpass', f: 600 }); tone({ t: 0.05, f: 110, d: 0.4, v: 0.025, type: 'sine' }); };

function askSleep() {
  const late = S.time >= 18 * 60;
  dialog([late ? 'Sudah malam. Tidur sampai besok pagi?' : 'Masih ' + clockStr() + '. Mau tidur sampai besok pagi?'], {
    choices: [{ label: 'Tidur (simpan otomatis)', fn: sleep }, { label: 'Nanti saja', fn: () => {} }] });
}

/* =============================== SCENES ============================== */
// ---- Judul ----
function titleBackdrop() {
  if (game.titleBg) return game.titleBg;
  const [c, x] = cv(CFG.W, CFG.H); const z = drawZone(ZONES.alun, PAL.kemarau); x.drawImage(z, 150, 150, 480, 270, 0, 0, 480, 270);
  return game.titleBg = c;
}
/** [uji] Mulai langsung di Klinik Gigi tahap 2: ruko sudah bersih, ★2, modal cukup untuk staf. Tidak ada surat/intro, tidak pernah disimpan. */
function startUji() {
  const U = CFG.UJI; S = newState('Uji', 'W', PRESET_LOOKS.pF); S.uji = true; S.introDone = true;
  const C = S.clinic; C.introSeen = true; C.cleaned = CLEAN_SPOTS.map(c => c.id); C.stock = U.STOCK;
  S.clinicStage = U.STAGE; S.money = U.MONEY; S.repPts = U.REP; S.day = U.DAY; S.time = U.TIME_H * 60;
  const key = CFG.CLINIC_ROOM[U.STAGE], w = getRoom(key); S.where = { type: 'room', room: key, door: null }; S.where.door = roomDoor(S.where);
  S.px = w.nx + 18; S.py = w.fh - 12; S.dir = 'U'; game.world = w; game.overlay = null;
  game.trans = { name: 'Mode Uji · ' + clinicName(), sub: 'Klinik tahap 2 · ' + rupiah(S.money), tip: 'Langsung di klinik: buka praktik di meja, rekrut staf, coba rontgen. Mode ini tidak pernah disimpan, simpanan aslimu aman.', t: 0, ready: true, morning: true, done: () => {} };
  game.scene = 'trans'; sfx('morning');
}
addEventListener('keydown', ev => { if (ev.shiftKey && ev.key.toLowerCase() === 'k' && game.scene === 'title' && !game.overlay) startUji(); }); // [uji] tersembunyi
function updateTitle() {
  const save = readSave(); const opts = [{ id: 'new', label: 'Main Baru', fn: startCreate }];
  if (save) opts.push({ id: 'cont', label: 'Lanjutkan', fn: () => { S = save; loadWorld(); npcWarm(); game.scene = 'play'; fadeIn(); // [rev] npcWarm: hitung NPC saat muat
    if (S.kosMoved) { delete S.kosMoved; dialog(['Kamar Sewa lama sudah tidak ada. Sekarang kamu ngekos di Kos Melati, ujung kanan Kampung Asri: kamar 5, pintu bergambar hati.', 'Sewanya ' + rupiah(CFG.KOS.RENT_DAY) + ' per hari, dipotong tiap pagi. Rumah di ujung kiri Kampung Asri bisa dikontrak setelah ruko direnovasi.']); }
    else if (S.gardenNew) { delete S.gardenNew; dialog(['Ada yang baru: kebun herba. Pot di rumahmu bisa ditanami bibit dari Warung Bu Ratna dan Pondok Jamu.', 'Pak Udin menitipkan dua bibit Lidah Buaya untukmu. "Musim kemarau begini disiram tiap hari, nggih, Dok."']); } } }); // [2g]
  opts.push({ id: 'lat', label: 'Latihan Minigame', fn: startPractice });
  game.titleOpts = opts; game.titleSel = clamp(game.titleSel || 0, 0, opts.length - 1);
  if (hit('up')) game.titleSel = (game.titleSel + opts.length - 1) % opts.length;
  if (hit('down')) game.titleSel = (game.titleSel + 1) % opts.length;
  if (handleClick()) return;
  if (okHit()) opts[game.titleSel].fn();
}
/** Lapisan dasar judul: latar Alun-alun diredupkan. Panel & teks di drawTitleHD. */
function drawTitle(c) { c.drawImage(titleBackdrop(), 0, 0); c.fillStyle = 'rgba(16,10,6,.45)'; c.fillRect(0, 0, 480, 270); }

// ---- Kustomisasi karakter ----
function startCreate() { game.create = { name: '', gender: 'W', look: { ...PRESET_LOOKS.pF }, focus: 0, t0: game.t }; game.scene = 'create'; }
/** Baris layar kustomisasi: nama, gender, 7 baris penampilan, mulai. */
const CREATE_ROWS = ['name', 'gender', ...LOOK_ROWS.map(r => r[0]), 'start'];
function lookStep(L, k, d) { const n = lookList(L, k).length; L[k] = (((L[k] + d) % n) + n) % n; if (k === 'hair') L.hairCol = L.hairCol % lookList(L, 'hairCol').length; }
function randomLook(L) { LOOK_ROWS.forEach(([k]) => { if (k !== 'hairCol') L[k] = Math.floor(Math.random() * LOOK_OPTS[k].length); }); L.hairCol = Math.floor(Math.random() * lookList(L, 'hairCol').length); }
function finishCreate() {
  const cr = game.create; let name = cr.name.trim() || 'Rani'; name = name[0].toUpperCase() + name.slice(1);
  S = newState(name, cr.gender, cr.look); placeAtHome(); game.textInput = false; game.scene = 'play'; fadeIn();
  S.introDone = true;
  showLetter(() => dialog(['Pagi pertama di Rimbasari. Udaranya jauh lebih segar daripada Metrapura.',
    'Di ambang jendela ada empat pot kosong. Pak Udin menitipkan dua bibit Lidah Buaya: "Biar kamarnya ada hijaunya, Dok. Kemarau begini disiram tiap hari, nggih."', // [2g]
    'Kontrol: WASD/panah jalan · E masuk/aksi · 1-4 kecepatan · P jeda · C kalender · I tas · Esc menu.'], { speaker: 'drg. ' + name }));
}
function updateCreate() {
  const cr = game.create; const row = CREATE_ROWS[cr.focus];
  game.textInput = row === 'name';
  if (game.textInput) {
    input.typed.forEach(ch => { if (ch === '\b') cr.name = cr.name.slice(0, -1); else if (cr.name.length < CFG.NAME_MAX && !(ch === ' ' && !cr.name)) cr.name += ch; });
  }
  input.typed.length = 0;
  if (hit('up')) cr.focus = (cr.focus + CREATE_ROWS.length - 1) % CREATE_ROWS.length;
  if (hit('down') || hit('tab')) cr.focus = (cr.focus + 1) % CREATE_ROWS.length;
  if (row === 'gender' && (hit('left') || hit('right'))) cr.gender = cr.gender === 'P' ? 'W' : 'P';
  if (cr.look[row] != null) { if (hit('left')) lookStep(cr.look, row, -1); if (hit('right')) lookStep(cr.look, row, 1); }
  if (!game.textInput && hit('rand')) randomLook(cr.look);
  if (hit('esc')) { game.textInput = false; game.scene = 'title'; return; }
  if (handleClick()) return;
  if (hit('ok') || (!game.textInput && hit('act'))) { if (row === 'start') finishCreate(); else cr.focus++; }
}
/** Lapisan dasar (480×270): latar hijau v3. Semua panel & teks digambar HD di drawCreateHD. */
function drawCreate(c) { mgBg(c); }
/** Contoh warna bila baris itu baris warna. */
function lookSwatch(L, k) {
  const v = lookList(L, k)[L[k] % lookList(L, k).length][0];
  if (k === 'skin') return SK[v][0];
  if (k === 'hairCol') return LOOK_OPTS.hair[L.hair][0] === 'hijab' ? v : HC[v][0];
  if (k === 'outfitCol' || k === 'eye') return k === 'eye' ? EYEC[v] : v;
  return null;
}
/** Potongan sprite untuk ikon baris: kepala untuk rambut/wajah, badan untuk baju. */
const ROW_CROP = { hair: [4, 0, 16, 16], hairCol: [4, 0, 16, 16], skin: [6, 6, 12, 12], eye: [5, 6, 14, 10], face: [4, 4, 16, 14], outfit: [3, 16, 18, 14], outfitCol: [3, 16, 18, 14] };
function drawCreateHD() {
  const cr = game.create, hv = hoverId(), L = cr.look;
  // judul
  hBox(4, 4, 472, 30, 'paper', { ornate: true });
  HT('Buat Doktermu', 14, 11, MGC.ink, { k: 4, sh: '#e8b878' });
  HT('↑↓ baris · ◀ ▶ ganti · R acak · Esc kembali', 465, 15, MGC.ink2, { align: 'r' });
  // kartu pratinjau
  hBox(6, 40, 136, 194, 'paper', { ornate: true });
  hInset(14, 48, 120, 112, '#8ab868');
  hc.save(); hc.beginPath(); hc.rect(15 * HI, 49 * HI, 118 * HI, 110 * HI); hc.clip();
  const sb = getRoom('studio'); hc.drawImage(sb.bg, (sb.w - 118) >> 1, 8, 118, 110, 15 * HI, 49 * HI, 118 * HI, 110 * HI); // latar Studio Foto, tanpa NPC
  const vg = hc.createRadialGradient(74 * HI, 110 * HI, 10 * HI, 74 * HI, 104 * HI, 80 * HI); vg.addColorStop(0, 'rgba(255,240,200,.18)'); vg.addColorStop(1, 'rgba(30,15,5,.35)'); hc.fillStyle = vg; hc.fillRect(15 * HI, 49 * HI, 118 * HI, 110 * HI);
  for (let j = -5; j <= 5; j++) for (let i = -26; i <= 26; i++) if (i * i / 676 + j * j / 25 <= 1) { hc.fillStyle = 'rgba(20,10,5,.28)'; hc.fillRect((74 * HI) + i, (152 * HI) + j, 1, 1); }
  const step = [1, 0, 2, 0][Math.floor(game.t * 4) % 4], dir = ['D', 'L', 'U', 'R'][Math.floor(game.t / 2) % 4];
  hc.drawImage(playerSprite(L, dir, step), 0, 0, 24, 32, 38 * HI, 57 * HI, 72 * HI, 96 * HI);
  hc.restore();
  hBox(14, 164, 120, 18, 'gold', { thin: true });
  HT('drg. ' + (cr.name || '...'), 74, 169, MGC.ink, { align: 'c', bold: true });
  HT(GENDERS[cr.gender] + ' · ' + lookLabel(L, 'outfit'), 74, 187, MGC.ink2, { align: 'c' });
  ['D', 'L', 'U', 'R'].forEach((d, i) => { const X = 19 + i * 28; hInset(X, 197, 26, 32, '#f6dcb0'); hc.drawImage(playerSprite(L, d, 0), 0, 0, 24, 32, (X + 1) * HI, 197 * HI, 24 * HI, 32 * HI); });
  // kartu pilihan
  hBox(146, 40, 328, 170, 'paper', { ornate: true });
  const bar = (i, Y, H) => { const f = cr.focus === i, h = hv === 'row' + i;
    if (f) { hBox(152, Y, 316, H, 'gold', { thin: true, shadow: false }); hGlow(152, Y, 316, H); } else if (h) hR(153, Y + .5, 314, H - 1, 'rgba(255,236,190,.55)');
    clickable(152, Y, 316, H, () => { cr.focus = i; }, 'row' + i); return f; };
  // nama
  let f = bar(0, 47, 19); HT('Nama', 160, 53, MGC.ink, { bold: true });
  hInset(236, 49, 156, 15, null, true);
  HT((cr.name || (f ? '' : 'ketik nama...')) + (f && Math.floor(game.t * 2) % 2 ? '_' : ''), 241, 53, cr.name ? MGC.lite : MGC.lite2);
  HT(f ? 'Backspace' : 'maks. ' + CFG.NAME_MAX, 462, 53, MGC.ink2, { align: 'r' });
  // gender
  f = bar(1, 68, 19); HT('Gender', 160, 74, MGC.ink, { bold: true }); HT('karaktermu', 206, 74, MGC.ink2);
  ['P', 'W'].forEach((g, i) => { const X = 334 + i * 66, on = cr.gender === g; hBtn(X, 70, 62, 15, GENDERS[g], { on, hover: hv === 'g' + g }); clickable(X, 70, 62, 15, () => { cr.focus = 1; cr.gender = g; }, 'g' + g); });
  hDivider(156, 92, 308); hBox(270, 86, 80, 13, 'dark', { thin: true, shadow: false }); HT('Penampilan', 310, 89, MGC.gold, { align: 'c', bold: true, sh: DK });
  // penampilan
  LOOK_ROWS.forEach(([k, label], i) => {
    const ri = i + 2, Y = 102 + i * 15; f = bar(ri, Y, 15);
    const cp = ROW_CROP[k]; hInset(157, Y + 1.5, 13, 12, '#f6dcb0');
    hc.save(); hc.beginPath(); hc.rect(157.5 * HI, (Y + 2) * HI, 12 * HI, 11 * HI); hc.clip();
    const sc = 11 / Math.max(cp[2], cp[3]) * HI; hc.drawImage(playerSprite(L, 'D', 0), cp[0], cp[1], cp[2], cp[3], 157.5 * HI + (12 * HI - cp[2] * sc) / 2, (Y + 2) * HI + (11 * HI - cp[3] * sc) / 2, cp[2] * sc, cp[3] * sc);
    hc.restore();
    HT(label, 176, Y + 4, MGC.ink, { bold: true });
    const n = lookList(L, k).length; HT((L[k] % n + 1) + '/' + n, 290, Y + 4, MGC.ink2, { align: 'r' });
    hBtn(298, Y + 1, 15, 13, '◀', { kind: hv === 'l' + k ? 'gold' : 'paper', shadow: false }); clickable(296, Y, 19, 15, () => { cr.focus = ri; lookStep(L, k, -1); }, 'l' + k);
    hBtn(450, Y + 1, 15, 13, '▶', { kind: hv === 'r' + k ? 'gold' : 'paper', shadow: false }); clickable(448, Y, 19, 15, () => { cr.focus = ri; lookStep(L, k, 1); }, 'r' + k);
    const sw = lookSwatch(L, k); let cx = 382;
    if (sw) { hInset(320, Y + 3, 10, 9, sw); cx = 388; }
    HT(lookLabel(L, k), cx, Y + 4, MGC.ink, { align: 'c', bold: f });
  });
  // tombol
  hBtn(146, 214, 98, 20, 'Acak (R)', { kind: hv === 'rand' ? 'gold' : 'paper', bold: true }); clickable(146, 214, 98, 20, () => randomLook(L), 'rand');
  f = cr.focus === CREATE_ROWS.length - 1;
  hBtn(312, 214, 162, 20, (f ? '▶ ' : '') + 'Mulai di Rimbasari', { on: f, hover: hv === 'start', kind: f || hv === 'start' ? 'gold' : 'paper', bold: true });
  if (f) hGlow(312, 214, 162, 20); clickable(312, 214, 162, 20, finishCreate, 'start');
  hBox(4, 238, 472, 28, 'dark', { thin: true });
  HT('Kamu dokter gigi yang lelah dengan kota besar. Ruko tua warisan Om Darto', 12, 243, MGC.lite2, { sh: DK });
  HT('menunggu di Rimbasari. Saatnya memulai dari nol, pelan-pelan saja.', 12, 254, MGC.lite2, { sh: DK });
}

// ---- Bermain ----
function updatePlay(dt) {
  if (game.overlay) { if (!tickOverlayClose()) game.overlay.update(); return; }
  if (game.fade) return;
  jrTick(); if (game.overlay) return; /* [3b-1] pemicu, kemajuan & kartu challenge */
  updateNpcs(dt); // [3a]
  if (hit('esc')) { openMenu(); return; }
  if (hit('book')) { openBook(); return; } // [3a] Buku Kenalan
  if (hit('jurnal')) { openJurnal(); return; } /* [3b-1] Jurnal */
  if (hit('pause')) { S.paused = !S.paused; sfx(S.paused ? 'pause_on' : 'pause_off'); }
  if (hit('cal')) { openCalendar(); return; }
  if (hit('bag')) { openTas(); return; } // [2h]
  ['sp1', 'sp2', 'sp3', 'sp4'].forEach((k, i) => { if (hit(k)) { S.speed = i; S.paused = false; } });
  if (handleClick()) return;
  if (S.paused) return;
  tickTime(dt); if (game.overlay || game.fade) return;
  updatePatients(dt);
  if (inClinic() && S.clinicStage === 0 && !S.clinic.introSeen) { S.clinic.introSeen = true; dialog(['Debunya tebal sekali. Ada sarang laba-laba di sudut, kardus lama, dan serpihan kayu di lantai.', 'Sebelum bisa dipakai praktik, ruko ini harus dibersihkan dulu. Datangi bagian yang berkilau, lalu tekan E.']); return; }
  const w = game.world;
  let dx = (held('right') ? 1 : 0) - (held('left') ? 1 : 0), dy = (held('down') ? 1 : 0) - (held('up') ? 1 : 0);
  const moving = dx || dy;
  if (moving) {
    if (dx && dy) { dx *= Math.SQRT1_2; dy *= Math.SQRT1_2; }
    S.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'R' : 'L') : (dy > 0 ? 'D' : 'U');
    const sp = CFG.WALK_SPEED * dt; moveWithCollision(w, dx * sp, dy * sp); game.anim += dt;
    const fr = Math.floor(game.anim * CFG.ANIM_FPS) % 4; if (fr !== game.stepFr && (fr === 0 || fr === 2)) sfx(stepSound()); game.stepFr = fr;
  } else { game.anim = 0; game.stepFr = -1; }
  game.moving = moving;
  const act = currentAction(); game.action = act;
  if (act && (hit('act') || hit('ok'))) { act.fn(); return; }
  if (act && act.gift && hit('gift')) { act.gift(); return; } // [3a-4] beri hadiah
  // masuk pintu dengan berjalan ke atas
  if (act && act.door && held('up') && !dx) { game.pushUp = (game.pushUp || 0) + dt; if (game.pushUp > 0.18) { game.pushUp = 0; act.fn(); return; } } else game.pushUp = 0;
  if (w.type === 'zone') {
    for (const e of w.exits) {
      const gate = e.dir === 'L' ? S.px <= 7 && Math.abs(S.py - e.y) < 16 : e.dir === 'R' ? S.px >= w.w - 7 && Math.abs(S.py - e.y) < 16
        : e.dir === 'U' ? S.py <= 10 && Math.abs(S.px - e.x) < 14 : S.py >= w.h - 3 && Math.abs(S.px - e.x) < 14;
      if (gate) { gotoZone(e.to, e.ax, e.ay, e.face); return; }
    }
  } else if (S.py > w.fh - 4) exitRoom();
}
/** Area layar yang bebas HUD untuk interior: di bawah kotak HUD atas (y 62); ruangan lebar (melewati x 412) juga di atas tombol kecepatan (y 243). */
const ROOM_VIEW = { TOP: 62, BOTTOM: 268, BOTTOM_WIDE: 243, WIDE_X: 412 };
/** Posisi interior di layar (dihitung tiap frame). Ruangan yang muat diletakkan di tengah area bebas HUD; yang lebih tinggi digulir vertikal mengikuti pemain. */
function placeRoomView(w) {
  const V = ROOM_VIEW, RH = w.h, bot = w.vb = w.ox + w.w > V.WIDE_X ? V.BOTTOM_WIDE : V.BOTTOM, avail = bot - V.TOP;
  w.oy = RH <= avail ? V.TOP + ((avail - RH) >> 1) : clamp(Math.round(V.TOP + avail / 2 - (S.py - 16)), bot - RH, V.TOP);
}
function camera(w) { return { x: clamp(Math.round(S.px - 240), 0, w.w - 480), y: clamp(Math.round(S.py - 16 - 135), 0, w.h - 270) }; }
function playerImg() { const step = game.moving ? [1, 0, 2, 0][Math.floor(game.anim * CFG.ANIM_FPS) % 4] : 0; return playerSprite(S.look, S.dir, step); }
function drawWorld(c) {
  const w = game.world; if (!w) return;
  if (w.type === 'zone') {
    const cam = camera(w); c.drawImage(w.bg, cam.x, cam.y, 480, 270, 0, 0, 480, 270);
    const list = w.ents.filter(e => e.X < cam.x + 480 && e.X + e.img.width > cam.x && e.Y < cam.y + 270 && e.Y + e.img.height > cam.y);
    list.push({ ch: 1, z: S.py + 1 }, ...npcDrawList()); list.sort((a, b) => a.z - b.z);
    list.forEach(e => { if (e.ch) drawChar(c, playerImg(), Math.round(S.px) - 12 - cam.x, Math.round(S.py) - 30 - cam.y); else if (e.npc) drawChar(c, actorImg(e.npc), Math.round(e.npc.x) - 12 - cam.x, Math.round(e.npc.y) - 30 - cam.y); else c.drawImage(e.img, e.X - cam.x, e.Y - cam.y); });
    drawNpcMarks(c, -cam.x, -cam.y); // [3a]
    seasonOverlay(c, 0, 0, 480, 270); timeOverlay(c, 0, 0, 480, 270, 1);
    if (game.debug) debugDraw(c, w, cam.x, cam.y);
    if (game.action && !game.overlay) promptBox2(c, Math.round(S.px) - cam.x, Math.round(S.py) - 62 - cam.y, game.action.label);
  } else {
    c.fillStyle = '#1a0f0c'; c.fillRect(0, 0, 480, 270);
    placeRoomView(w); const ox = w.ox, oy = w.oy;
    c.save(); c.beginPath(); c.rect(0, ROOM_VIEW.TOP, 480, w.vb - ROOM_VIEW.TOP); c.clip(); // bagian ruangan yang digulir keluar tidak tampil di balik HUD
    c.drawImage(w.bg, ox, oy);
    const list = w.ents.slice(); list.push({ ch: 1, z: S.py + 1 });
    if (inClinic()) S.clinic.patients.forEach(p => list.push({ pt: p, z: p.y + (p.st === 'wait' ? 10 : p.st === 'chair' ? 28 : 1) })); // duduk = di depan kursi
    list.push(...npcDrawList()); // [3a] warga & staf (staf klinik berjalan dari pintu, menggantikan gambar tetap 2e)
    list.sort((a, b) => a.z - b.z);
    list.forEach(e => { if (e.ch) drawChar(c, playerImg(), ox + Math.round(S.px) - 12, oy + Math.round(S.py) - 30); else if (e.pt) drawChar(c, patientImg(e.pt), ox + Math.round(e.pt.x) - 12, oy + Math.round(e.pt.y) - 30); else if (e.npc) drawChar(c, actorImg(e.npc), ox + Math.round(e.npc.x) - 12, oy + Math.round(e.npc.y) - 30); else c.drawImage(e.img, ox + e.X, oy + e.Y); });
    if (w.key === 'klinik0' && S.clinicStage === 0) CLEAN_SPOTS.filter(s => !S.clinic.cleaned.includes(s.id)).forEach((s, i) => { // kilau penanda titik kotor
      const ph = (game.t * 2.2 + i * 0.7) % 2, a = ph < 1 ? Math.sin(ph * Math.PI) : 0; if (a <= 0.05) return;
      const X = ox + s.mark[0], Y = oy + s.mark[1]; c.fillStyle = 'rgba(255,246,200,' + a.toFixed(2) + ')';
      c.fillRect(X, Y - 3, 1, 7); c.fillRect(X - 3, Y, 7, 1); c.fillStyle = 'rgba(255,255,255,' + a.toFixed(2) + ')'; c.fillRect(X, Y, 1, 1); });
    c.drawImage(w.over, ox, oy);
    drawNpcMarks(c, ox, oy); // [3a]
    timeOverlay(c, ox + 3, oy + 3, w.w - 6, w.fh - 6, 0.45);
    if (game.debug) debugDraw(c, w, -ox, -oy);
    c.restore();
    if (game.action && !game.overlay) promptBox2(c, ox + Math.round(S.px), oy + Math.round(S.py) - 62, game.action.label);
  }
}
function debugDraw(c, w, cx, cy) {
  c.strokeStyle = 'rgba(255,0,0,.8)'; w.solids.forEach(r => c.strokeRect(r[0] - cx + .5, r[1] - cy + .5, r[2], r[3]));
  c.strokeStyle = 'rgba(0,255,0,.9)'; (w.doors || []).forEach(d => c.strokeRect(d.r[0] - cx + .5, d.r[1] - cy + .5, d.r[2], d.r[3]));
  const f = feetBox(S.px, S.py); c.strokeStyle = '#ff0'; c.strokeRect(f[0] - cx + .5, f[1] - cy + .5, f[2], f[3]);
}
/** Warna musim (multiply, seperti seasonFx v3) + hujan beranimasi di musim Hujan. */
function seasonOverlay(c, X, Y, W, H) {
  const hujan = season().key === 'hujan';
  c.globalCompositeOperation = 'multiply'; c.fillStyle = hujan ? '#a9b8cc' : '#fff1d8'; c.fillRect(X, Y, W, H); c.globalCompositeOperation = 'source-over';
  if (hujan) {
    if (!game.rain.length) { const rr = rng(77); for (let k = 0; k < 140; k++) game.rain.push([rr() * W, rr() * H, 0.8 + rr() * 0.5]); }
    c.fillStyle = 'rgba(205,225,255,.55)';
    game.rain.forEach(d => { for (let t = 0; t < 5; t++) c.fillRect((X + d[0] - t * .6) | 0, (Y + d[1] + t) | 0, 1, 1); });
  }
}
function updateRain(dt) { if (!S || S.paused || season().key !== 'hujan') return; game.rain.forEach(d => { d[1] += dt * 240 * d[2]; d[0] -= dt * 70 * d[2]; if (d[1] > 270) { d[1] -= 275; d[0] = Math.random() * 500; } if (d[0] < -5) d[0] += 485; }); }
/** Cahaya menurut jam: fajar kebiruan, sore jingga, malam biru gelap. */
function timeOverlay(c, X, Y, W, H, k) {
  const h = S.time / 60; let col = null, a = 0;
  if (h < 7) { col = '40,50,110'; a = .28 * (7 - h); }
  else if (h >= 16 && h < 18) { col = '255,130,50'; a = .16 * (h - 16) / 2; }
  else if (h >= 18 && h < 20) { col = '30,30,90'; a = .16 + .26 * (h - 18) / 2; }
  else if (h >= 20) { col = '20,22,70'; a = .44; }
  if (!col) return; c.fillStyle = 'rgba(' + col + ',' + (a * k).toFixed(3) + ')'; c.fillRect(X, Y, W, H);
}

// ---- Transisi zona & kartu pagi ----
function updateTrans(dt) {
  const tr = game.trans; tr.t += dt;
  if (!tr.ready && tr.t > 0.05) { tr.done(); tr.ready = true; } // bangun peta saat layar transisi tampil
  if (!tr.warm && tr.t > 0.1) { tr.warm = true; npcWarm(); } // [rev] jadwal NPC + zona/ruangan dihitung di balik kartu, bukan di frame pertama main
  const minT = tr.morning ? 0.8 : tr.bus ? CFG.TRIP.ANIM : CFG.ZONE_TRANS_MIN, autoT = tr.bus ? CFG.TRIP.ANIM + 1 : CFG.ZONE_TRANS_AUTO; // [2f] bus: animasi jalan dulu
  if ((tr.t > minT && (okHit() || input.click)) || (!tr.morning && tr.t > autoT)) {
    if (tr.morning) tr.done(); game.trans = null; game.scene = 'play'; fadeIn();
  }
}
/** Lapisan dasar transisi: latar hijau v3. Kartu & teks di drawTransHD. */
function drawTrans(c) { const b = game.trans && game.trans.bus; if (b) { const p = clamp(game.trans.t / CFG.TRIP.ANIM, 0, 1); busScene(c, p, b.to); bar(c, 128, 174, 224, 8, p, '#5ccf4a'); } else mgBg(c); }
function fadeIn() { game.fade = { t: CFG.FADE / 2, midDone: true }; }
function updateFade(dt) {
  const f = game.fade; if (!f) return; f.t += dt;
  if (!f.midDone && f.t >= CFG.FADE / 2) { f.midDone = true; if (f.mid) f.mid(); if (game.scene !== 'play') { game.fade = null; return; } }
  if (f.t >= CFG.FADE) { game.fade = null; if (f.after) f.after(); }
}
function drawFade(c) { const f = game.fade; if (!f) return; const a = 1 - Math.abs(f.t / (CFG.FADE / 2) - 1); c.fillStyle = 'rgba(10,6,4,' + clamp(a, 0, 1).toFixed(3) + ')'; c.fillRect(0, 0, 480, 270); }

/* ================================ UI ================================ */
/** Bungkus teks ke beberapa baris sesuai lebar piksel (font 5×7 berjarak). */
function wrap(text, maxW, bold) {
  const out = []; let line = '';
  text.split(' ').reduce((acc, wd) => { if (acc.length && acc[acc.length - 1] === 'Rp') acc[acc.length - 1] += ' ' + wd; else acc.push(wd); return acc; }, []).forEach(wd => { const t = line ? line + ' ' + wd : wd; if (SW(t, 9, bold) > maxW && line) { out.push(line); line = wd; } else line = t; });
  if (line) out.push(line); return out;
}
/** Kotak ajakan aksi di atas kepala pemain (gaya promptBox v3 dengan panel bevel). */
/** Prompt aksi di atas kepala pemain: posisinya dicatat saat menggambar dunia, digambar HD di drawPromptHD. */
function promptBox2(c, X, Y, text) { game.prompt = { X, Y, text }; }
function drawPromptHD() {
  const p = game.prompt; if (!p) return; game.prompt = null;
  const tw = hW(p.text, true) + 32, x0 = clamp(p.X - tw / 2, 2, 478 - tw), y0 = Math.max(60, p.Y) + Math.round(Math.sin(game.t * 4) * 1.5 * HI) / HI;
  hBox(x0, y0, tw, 19, 'paper', { thin: true });
  hInset(x0 + 5, y0 + 3.5, 14, 12, '#fff6e0'); HT('E', x0 + 12, y0 + 6, MGC.red, { align: 'c', bold: true });
  HT(p.text, x0 + 24, y0 + 6, MGC.ink, { bold: true });
  hR(x0 + tw / 2 - 2, y0 + 19, 4, 1, BOX.paper.ol); hR(x0 + tw / 2 - 1, y0 + 20, 2, 1, BOX.paper.ol);
}
const IC_STAR9 = ['....#....', '...###...', '...###...', '#########', '.#######.', '..#####..', '..##.##..', '.##...##.', '.#.....#.'];
/** Bar HD (energi/stres): alur cekung + isi bergradasi + kilau atas. */
function hBar(X, Y, W, H, f, col) {
  hInset(X, Y, W, H, '#3a1e0c', false);
  const x = Math.round(X * HI) + 2, y = Math.round(Y * HI) + 2, w = Math.round(W * HI) - 4, h = Math.round(H * HI) - 4, fw = Math.round(w * clamp(f, 0, 1));
  hc.fillStyle = '#2a1408'; hc.fillRect(x, y, w, h);
  if (fw > 0) { hc.fillStyle = col; hc.fillRect(x, y, fw, h); hc.fillStyle = 'rgba(255,255,255,.35)'; hc.fillRect(x, y, fw, 2); hc.fillStyle = 'rgba(0,0,0,.25)'; hc.fillRect(x, y + h - 2, fw, 2);
    hc.fillStyle = 'rgba(255,255,255,.12)'; for (let i = x + 6; i < x + fw; i += 8) hc.fillRect(i, y + 2, 2, h - 4); }
}
/** Gambar ikon piksel v3 (lo) di lapisan HD dengan ukuran sama. */
const hImg = (img, X, Y) => hc.drawImage(img, Math.round(X * HI), Math.round(Y * HI), img.width * HI, img.height * HI);
/** HUD HD: musim/hari/jam, uang, energi, stres, reputasi, lokasi, kecepatan, jeda. Kotak klik didaftarkan di drawHUD. */
function drawHUDHD() {
  const sea = season(), hv = hoverId();
  hBox(4, 4, 184, 36, 'paper', { ornate: true }); hImg(sea.key === 'hujan' ? ICR : ICS, 10, 13);
  HT(sea.name + ' · Hari ' + dayOfSeason(), 31, 11, MGC.ink, { bold: true });
  HT(dayName() + ' · ' + clockStr() + ' · ' + blockName(), 31, 24, MGC.ink2);
  if (hv === 'hudcal') hGlow(4, 4, 184, 36);
  hInset(172, 9, 11, 11, '#ffffff'); hR(172.5, 9.5, 10, 3, '#c8414b'); for (let j = 0; j < 2; j++) for (let i = 0; i < 3; i++) hR(174 + i * 3, 14 + j * 2.5, 1.5, 1.5, '#9aa2ae');
  const px = 480 - 132; hBox(px, 4, 128, 50, 'paper', { ornate: true });
  hImg(IC.coin, px + 6, 8); HT(rupiah(S.money), px + 24, 12, MGC.ink, { bold: true });
  hImg(IC.energy, px + 5, 23); hBar(px + 22, 26, 40, 9, S.energy / energyMax(), '#5ccf4a');
  hImg(IC.stress, px + 64, 23); hBar(px + 81, 26, 40, 9, S.stress / 100, '#ef5a4a');
  const st = stars(); for (let i = 0; i < 5; i++) hIcon(IC_STAR, px + 7 + i * 8.5, 38.5, i < st ? '#f6c12c' : '#c8a878', i < st ? '#7a4a10' : '#9a7a54');
  HT('Reputasi', px + 120, 40, MGC.ink2, { align: 'r' });
  drawFokusChip(); // [3a-3] chip Fokus
  drawJanjiChip(); // [3a-4] chip janji event romance
  drawNikahChip(); // [3a-5] chip hari pernikahan
  drawJurnalChips(); /* [3b-1] chip challenge aktif */
  const loc = !game.world ? '' : game.world.type === 'room' && /^klinik/.test(game.world.key) ? clinicName() : game.world.name;
  if (loc) { const tw = hW(loc, true) + 18; hBox(4, 43, tw, 17, 'dark', { thin: true }); HT(loc, 13, 48, MGC.gold, { bold: true, sh: DK }); }
  const lbl = S.paused ? 'JEDA' : '▶ ' + String(CFG.SPEEDS[S.speed]).replace('.', ',') + '×', bw = 60;
  if (!dialogOpen()) hBtn(480 - bw - 4, 270 - 25, bw, 21, lbl, { kind: S.paused || hv === 'speed' ? 'gold' : 'paper', bold: true });
  if (hv === 'speed') hGlow(480 - bw - 4, 270 - 25, bw, 21);
  if (S.paused && !game.overlay) { hBox(166, 116, 148, 38, 'dark', { ornate: true }); HT('JEDA', 240, 123, MGC.gold, { align: 'c', k: 4, sh: DK }); HT('Tekan P untuk lanjut', 240, 141, MGC.lite2, { align: 'c', sh: DK }); }
}
/** [3a] Kotak dialog terbuka → tombol kecepatan disembunyikan (posisinya di bawah kotak dialog). */
const dialogOpen = () => !!(game.overlay && game.overlay.kind === 'dialog');
/** Kotak klik HUD (lapisan dasar). Gambarnya di drawHUDHD. */
function drawHUD(c) {
  clickable(4, 4, 184, 36, openCalendar, 'hudcal');
  if (!dialogOpen()) clickable(480 - 64, 270 - 25, 60, 21, () => { if (S.paused) S.paused = false; else S.speed = (S.speed + 1) % CFG.SPEEDS.length; }, 'speed');
}

// ---- Layar judul HD ----
function drawTitleHD() {
  const save = readSave(), hv = hoverId(), a = easeBack(clamp((game.t - (game.sceneT0 || 0)) / 0.45, 0, 1));
  hc.save(); hc.translate(0, Math.round((a - 1) * 24 * HI));
  hBox(62, 30, 356, 80, 'gold', { ornate: true });
  HT('Senyum Rimbasari', 240, 44, '#5a2a0c', { k: 8, align: 'c', sh: '#e8b878' });
  hDivider(120, 84, 240, 'rgba(122,74,38,.5)');
  HT('Klinik gigi kecil di kota yang ramah', 240, 92, MGC.ink2, { align: 'c' });
  hc.restore();
  (game.titleOpts || []).forEach((o, i) => {
    if (hv === o.id) game.titleSel = i;
    const Y = 128 + i * 30, sel = i === game.titleSel, b = clamp((game.t - (game.sceneT0 || 0) - 0.2 - i * 0.08) / 0.2, 0, 1);
    hc.save(); hc.globalAlpha = b; hc.translate(0, Math.round((1 - easeOut(b)) * 10 * HI));
    hBtn(166, Y, 148, 24, (sel ? '▶ ' : '') + o.label, { on: sel, hover: hv === o.id, bold: true }); hc.restore();
    clickable(166, Y, 148, 24, o.fn, o.id);
  });
  if (save) { const s = 'Simpanan: ' + (save.name ? 'drg. ' + save.name : '') + ' · ' + SEASONS[Math.floor(((save.day - 1) % (CFG.SEASON_DAYS * 2)) / CFG.SEASON_DAYS)].name + ', Hari ' + (((save.day - 1) % CFG.SEASON_DAYS) + 1); const w = hW(s) + 24; const sy = 134 + (game.titleOpts || []).length * 30; hBox(240 - w / 2, sy, w, 19, 'dark', { thin: true }); HT(s, 240, sy + 6, MGC.lite2, { align: 'c', sh: DK }); }
  HT('↑↓ pilih · Enter / E konfirmasi · bisa juga pakai mouse', 240, 250, MGC.lite, { align: 'c', sh: DK });
}

// ---- Layar transisi zona & kartu pagi HD ----
function drawTransHD() {
  const tr = game.trans, a = easeBack(clamp(tr.t / 0.35, 0, 1));
  if (tr.bus) { // [2f] layar perjalanan bus: adegan di drawTrans, teks di sini
    const T = CFG.TRIP, b = tr.bus, p = clamp(tr.t / T.ANIM, 0, 1), hh = b.h0 + T.LEG_H * p;
    HT('Naik bus ke', 240, 66, MGC.ink2, { align: 'c', bold: true }); HT(b.to, 240, 78, MGC.ink, { k: 4, align: 'c', sh: '#e8b878' });
    HT(b.from + '  >  ' + b.to, 240, 160, MGC.ink2, { align: 'c', bold: true });
    HT('Jam ' + clockStr(hh * 60) + ' · perjalanan ' + T.LEG_H + ' jam', 240, 186, MGC.ink, { align: 'c' });
    hBox(56, 212, 368, 22, 'dark', { thin: true }); HT(b.to === 'Tanjung Arum' ? 'Bahari Medika buka ' + hhmm(CFG.BAHARI.OPEN_H) + '-' + hhmm(CFG.BAHARI.CLOSE_H) + ', termasuk Minggu. Waktu berjalan selama perjalanan.' : 'Bus tiba di Terminal, Jalan Niaga. Waktu berjalan selama perjalanan.', 240, 219, MGC.lite, { align: 'c', sh: DK });
    if (tr.t > T.ANIM && Math.floor(game.t * 2) % 2) HT('Tekan E / Enter untuk lanjut', 240, 244, MGC.lite2, { align: 'c', sh: DK });
    return;
  }
  hc.save(); hc.globalAlpha = clamp(tr.t / 0.15, 0, 1); hc.translate(0, Math.round((a - 1) * 20 * HI));
  if (tr.morning) {
    hBox(80, 62, 320, 124, 'gold', { ornate: true });
    HT(tr.name, 240, 76, MGC.ink, { k: 4, align: 'c', sh: '#e8b878' });
    HT(tr.sub, 240, 102, MGC.ink2, { align: 'c', bold: true }); hDivider(120, 116, 240, 'rgba(122,74,38,.5)');
    hWrap(tr.tip, 280).forEach((l, i) => HT(l, 240, 128 + i * 12, MGC.ink, { align: 'c' }));
  } else {
    hBox(110, 56, 260, 78, 'gold', { ornate: true });
    HT('Zona ' + tr.no, 240, 68, MGC.ink2, { align: 'c', bold: true });
    HT(tr.name, 240, 84, MGC.ink, { k: 4, align: 'c', sh: '#e8b878' }); hDivider(150, 112, 180, 'rgba(122,74,38,.5)');
    hBox(56, 146, 368, 50, 'dark', { ornate: true }); HT('Tips', 70, 155, MGC.gold, { bold: true, sh: DK });
    hWrap(tr.tip, 340).forEach((l, i) => HT(l, 70, 169 + i * 11, MGC.lite, { sh: DK }));
  }
  hc.restore();
  const tm = tr.morning ? 0.8 : CFG.ZONE_TRANS_MIN;
  if (tr.t > tm) { if (Math.floor(game.t * 2) % 2) HT('Tekan E / Enter untuk lanjut', 240, 222, MGC.lite2, { align: 'c', sh: DK }); }
  else { const dots = '.'.repeat(1 + Math.floor(game.t * 4) % 3); HT('Memuat' + dots, 240, 222, MGC.lite2, { align: 'c', sh: DK }); }
}

// ---- Lapisan UI HD ----
// Dunia & HUD digambar di kanvas 480×270 lalu diperbesar 2×. Menu, kalender, surat, dialog, dan layar
// kustomisasi digambar langsung di kanvas tampilan 960×540: piksel teks & panel jadi setengah ukuran (lebih halus).
// Semua fungsi h* menerima koordinat 480×270 (boleh pecahan .5 = 1 piksel tampilan).
/** Perbesar bitmap 0/1 dua kali dengan EPX/Scale2x: diagonal jadi halus, tepi tetap tajam (bukan blur). */
function epx2(bm) {
  const h = bm.length, w = bm[0].length, g = (x, y) => (x < 0 || y < 0 || x >= w || y >= h) ? 0 : bm[y][x];
  const o = Array.from({ length: h * 2 }, () => new Array(w * 2).fill(0));
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const P = g(x, y), A = g(x, y - 1), B = g(x + 1, y), C = g(x - 1, y), D = g(x, y + 1);
    o[2 * y][2 * x] = C === A && C !== D && A !== B ? A : P; o[2 * y][2 * x + 1] = A === B && A !== C && B !== D ? B : P;
    o[2 * y + 1][2 * x] = D === C && D !== B && C !== A ? C : P; o[2 * y + 1][2 * x + 1] = B === D && B !== A && D !== C ? D : P;
  }
  return o;
}
const HGL = {}, H_SP = { 2: 3, 4: 5, 8: 9 };
function hGlyph(ch, k) {
  const key = ch + '|' + k; if (HGL[key]) return HGL[key];
  const g = GL[ch] || GL['?']; let bm = g.rows.map(r => { const a = [...r].map(q => q === '#' ? 1 : 0); while (a.length < g.w) a.push(0); return a; });
  for (let s = 1; s < k; s *= 2) bm = epx2(bm);
  return HGL[key] = bm;
}
/** Lebar teks HD (piksel tampilan). k=2 teks biasa (tinggi sama dengan teks lama), k=4 judul. */
function hSW(str, k = 2, bold = false) { let w = 0; for (const ch of str) { const g = GL[ch] || GL['?']; w += g.w * k + H_SP[k] + (bold ? 1 : 0); } return Math.max(0, w - H_SP[k]); }
let htCache = {}, htN = 0;
function hTextImg(str, col, k, bold) {
  const key = str + '|' + col + '|' + k + '|' + bold; if (htCache[key]) return htCache[key];
  if (++htN > CFG.HT_CACHE_MAX) { htCache = {}; htN = 1; } // [rev] jam/uang/toast terus membuat teks baru: kosongkan cache supaya memori tidak terus naik
  const [c, x] = cv(Math.max(1, hSW(str, k, bold) + 2), 9 * k + 2); x.fillStyle = col; let X = 0;
  for (const ch of str) {
    const g = GL[ch] || GL['?']; hGlyph(ch, k).forEach((row, j) => row.forEach((v, i) => { if (v) x.fillRect(X + i, j, bold ? 2 : 1, 1); }));
    X += g.w * k + H_SP[k] + (bold ? 1 : 0);
  }
  return htCache[key] = c;
}
/** Teks HD. o: k (2|4), bold, align 'l'|'c'|'r', sh (warna bayangan). Mengembalikan lebar dalam koordinat 480. */
function HT(str, X, Y, col, o = {}) {
  const k = o.k || 2, w = hSW(str, k, o.bold); let x = Math.round(X * HI); const y = Math.round(Y * HI);
  if (o.align === 'c') x -= w >> 1; else if (o.align === 'r') x -= w;
  if (o.sh) hc.drawImage(hTextImg(str, o.sh, k, o.bold), x + k / 2, y + k / 2);
  hc.drawImage(hTextImg(str, col, k, o.bold), x, y); return w / HI;
}
const hW = (str, bold, k = 2) => hSW(str, k, bold) / HI;
/** Bungkus teks HD sesuai lebar (koordinat 480). */
function hWrap(text, maxW, bold) {
  const out = []; let line = '';
  text.split(' ').reduce((acc, wd) => { if (acc.length && acc[acc.length - 1] === 'Rp') acc[acc.length - 1] += ' ' + wd; else acc.push(wd); return acc; }, [])
    .forEach(wd => { const t = line ? line + ' ' + wd : wd; if (hW(t, bold) > maxW && line) { out.push(line); line = wd; } else line = t; });
  if (line) out.push(line); return out;
}
function hR(X, Y, W, H, col) { hc.fillStyle = col; hc.fillRect(Math.round(X * HI), Math.round(Y * HI), Math.round(W * HI), Math.round(H * HI)); }
let grainPat = null;
/** Panel bevel HD (palet BOX dari mini.js). o: thin (bingkai tipis), ornate (paku emas di sudut), shadow. */
function hBox(X, Y, W, H, kind = 'paper', o = {}) {
  const b = BOX[kind], c = hc, x = Math.round(X * HI), y = Math.round(Y * HI), w = Math.round(W * HI), h = Math.round(H * HI);
  if (o.shadow !== false) { c.fillStyle = 'rgba(0,0,0,.13)'; c.fillRect(x + 4, y + 8, w, h - 2); c.fillStyle = 'rgba(0,0,0,.24)'; c.fillRect(x + 2, y + 3, w, h); }
  c.fillStyle = b.ol; c.fillRect(x + 2, y, w - 4, h); c.fillRect(x, y + 2, w, h - 4); c.fillRect(x + 1, y + 1, w - 2, h - 2);
  c.fillStyle = b.fr; c.fillRect(x + 2, y + 2, w - 4, h - 4);
  c.fillStyle = b.frL; c.fillRect(x + 3, y + 2, w - 6, 1); c.fillRect(x + 2, y + 3, 1, h - 6);
  c.fillStyle = b.frD; c.fillRect(x + 3, y + h - 3, w - 6, 1); c.fillRect(x + w - 3, y + 3, 1, h - 6);
  const f = o.thin ? 3 : 6, ix = x + f, iy = y + f, iw = w - 2 * f, ih = h - 2 * f;
  if (iw <= 0 || ih <= 0) return;
  if (!o.thin) { c.fillStyle = b.frL; c.fillRect(ix - 2, iy - 2, iw + 4, 1); c.fillStyle = b.frD; c.fillRect(ix - 2, iy + ih + 1, iw + 4, 1); }
  c.fillStyle = b.ol; c.fillRect(ix - 1, iy - 1, iw + 2, ih + 2);
  const g = c.createLinearGradient(0, iy, 0, iy + ih); g.addColorStop(0, b.in[0]); g.addColorStop(.5, b.in[1]); g.addColorStop(1, b.in[2]); c.fillStyle = g; c.fillRect(ix, iy, iw, ih);
  c.fillStyle = b.inD; c.fillRect(ix, iy, iw, 1); c.fillRect(ix, iy, 1, ih); c.fillStyle = b.inL; c.fillRect(ix, iy + ih - 1, iw, 1); c.fillRect(ix + iw - 1, iy, 1, ih);
  if ((kind === 'paper' || kind === 'gold') && iw > 20) {
    if (!grainPat) { const [gc, gx] = cv(12, 8); gx.fillStyle = 'rgba(150,90,30,.09)'; gx.fillRect(2, 1, 1, 1); gx.fillRect(8, 5, 1, 1); gx.fillStyle = 'rgba(255,255,255,.18)'; gx.fillRect(5, 3, 1, 1); grainPat = c.createPattern(gc, 'repeat'); }
    c.fillStyle = grainPat; c.fillRect(ix + 2, iy + 2, iw - 4, ih - 4);
  }
  if (o.ornate) [[x + 3, y + 3], [x + w - 7, y + 3], [x + 3, y + h - 7], [x + w - 7, y + h - 7]].forEach(([a, d]) => {
    c.fillStyle = '#4a2a08'; c.fillRect(a, d, 4, 4); c.fillStyle = '#e8b040'; c.fillRect(a, d, 3, 3); c.fillStyle = '#fff2b0'; c.fillRect(a, d, 1, 1); });
}
/** Ceruk/slot cekung (latar pratinjau, kolom isian, contoh warna). */
function hInset(X, Y, W, H, face, dark) {
  const c = hc, x = Math.round(X * HI), y = Math.round(Y * HI), w = Math.round(W * HI), h = Math.round(H * HI);
  c.fillStyle = dark ? '#081312' : '#6a3e1c'; c.fillRect(x, y, w, h);
  c.fillStyle = face || (dark ? '#16302d' : '#f2d9a8'); c.fillRect(x + 1, y + 1, w - 2, h - 2);
  c.fillStyle = dark ? 'rgba(0,0,0,.45)' : 'rgba(120,70,20,.35)'; c.fillRect(x + 1, y + 1, w - 2, 2); c.fillRect(x + 1, y + 1, 2, h - 2);
  c.fillStyle = dark ? 'rgba(120,200,180,.18)' : 'rgba(255,250,235,.7)'; c.fillRect(x + 1, y + h - 2, w - 2, 1); c.fillRect(x + w - 2, y + 1, 1, h - 2);
}
/** Garis pemisah dengan permata kecil di tengah. */
function hDivider(X, Y, W, col = 'rgba(122,74,38,.45)') {
  const c = hc, x = Math.round(X * HI), y = Math.round(Y * HI), w = Math.round(W * HI), m = x + (w >> 1);
  c.fillStyle = col; c.fillRect(x, y, w, 1); c.fillStyle = 'rgba(255,250,235,.6)'; c.fillRect(x, y + 1, w, 1);
  c.fillStyle = '#7a4a26'; c.fillRect(m - 2, y - 2, 5, 5); c.fillStyle = '#e8b040'; c.fillRect(m - 1, y - 1, 3, 3); c.fillStyle = '#fff2b0'; c.fillRect(m - 1, y - 1, 1, 1);
}
/** Kilau berdenyut di sekeliling elemen terpilih. */
function hGlow(X, Y, W, H) {
  const a = (.35 + .25 * Math.sin(game.t * 6)).toFixed(3), c = hc, x = Math.round(X * HI), y = Math.round(Y * HI), w = Math.round(W * HI), h = Math.round(H * HI);
  c.fillStyle = 'rgba(255,226,130,' + a + ')'; c.fillRect(x + 1, y - 2, w - 2, 1); c.fillRect(x + 1, y + h + 1, w - 2, 1); c.fillRect(x - 2, y + 1, 1, h - 2); c.fillRect(x + w + 1, y + 1, 1, h - 2);
}
/** Tombol HD. o: on (terpilih), hover, bold, kind. */
function hBtn(X, Y, W, H, label, o = {}) {
  hBox(X, Y, W, H, o.kind || (o.on ? 'gold' : o.hover ? 'paper' : 'dark'), { thin: true, shadow: o.shadow });
  if (o.on) hGlow(X, Y, W, H);
  const dark = !(o.kind === 'paper' || o.on || o.hover) && o.kind !== 'gold';
  HT(label, X + W / 2, Y + (H - 7) / 2, dark ? MGC.lite : MGC.ink, { align: 'c', bold: o.bold || o.on, sh: dark ? DK : null });
}
/** Ikon kecil dari pola string (piksel tampilan). */
function hIcon(rows, X, Y, col, ol, k = 2) {
  const x0 = Math.round(X * HI), y0 = Math.round(Y * HI);
  if (ol) { hc.fillStyle = ol; rows.forEach((r, j) => [...r].forEach((q, i) => { if (q !== '.') { hc.fillRect(x0 + i * k - 1, y0 + j * k, k + 2, k); hc.fillRect(x0 + i * k, y0 + j * k - 1, k, k + 2); } })); }
  rows.forEach((r, j) => [...r].forEach((q, i) => { if (q === '#' || q === 'o') { hc.fillStyle = q === 'o' ? '#ffffff' : col; hc.fillRect(x0 + i * k, y0 + j * k, k, k); } }));
}
const IC_STAR = ['...#...', '..###..', '#######', '.#####.', '..###..', '.##.##.', '.#...#.'];
const IC_SPROUT = ['.##.##.', '#o#.#o#', '.##.##.', '...#...', '...#...', '.#####.', '..###..'];
const IC_NOTE = ['..##', '..#.', '..#.', '###.', '##..'];

// ---- Animasi buka/tutup panel (efek dropdown) ----
const OPEN_T = 0.24, CLOSE_T = 0.14;
const easeOut = t => 1 - Math.pow(1 - t, 3);
const easeBack = t => { const k = 1.7; return 1 + (k + 1) * Math.pow(t - 1, 3) + k * Math.pow(t - 1, 2); };
function ovProg(o) { return o.closing ? 1 - clamp((game.t - o.closing.t) / CLOSE_T, 0, 1) : clamp((game.t - (o.t0 == null ? game.t : o.t0)) / OPEN_T, 0, 1); }
const OV_SOUND = { panel: 'ui_open', menu: 'ui_open', calendar: 'ui_open', settings: 'ui_open', letter: 'paper_flip' };
function openOverlay(o) { o.t0 = game.t; game.overlay = o; if (OV_SOUND[o.kind]) sfx(OV_SOUND[o.kind]); return o; }
/** Tutup overlay dengan animasi, lalu jalankan after(). */
function closeOverlay(after) { const o = game.overlay; if (!o || o.closing) return; o.closing = { t: game.t, after }; if (OV_SOUND[o.kind]) sfx('ui_close'); }
/** Dipanggil tiap langkah: lepaskan overlay yang sudah selesai menutup. */
function tickOverlayClose() {
  const o = game.overlay; if (!o || !o.closing || game.t - o.closing.t < CLOSE_T) return !!(o && o.closing);
  game.overlay = null; if (o.closing.after) o.closing.after(); return true;
}
function hDim(o, a) { hc.fillStyle = 'rgba(10,6,4,' + (a * ovProg(o)).toFixed(3) + ')'; hc.fillRect(0, 0, CFG.W * HI, CFG.H * HI); }
/** Panel turun dari atas: tinggi terbuka bertahap + sedikit memantul. */
function dropIn(o, X, Y, W, H, draw) {
  const p = ovProg(o), e = o.closing ? easeOut(p) : easeBack(p), open = easeOut(p);
  hc.save(); hc.globalAlpha = Math.min(1, p * 1.8);
  hc.beginPath(); hc.rect((X - 6) * HI, (Y - 30) * HI, (W + 14) * HI, (H * open + 44) * HI); hc.clip();
  hc.translate(0, Math.round((e - 1) * 18 * HI)); draw(); hc.restore();
}
/** Muncul bertahap per item (dipakai daftar menu). */
const stagger = (o, i) => clamp((game.t - o.t0 - 0.08 - i * 0.035) / 0.14, 0, 1);

// ---- Dialog ----
/** Tampilkan dialog bertahap. opts: speaker, npc (id CAST → potret + nama + tingkat Trust [3a]), choices[{label,fn}], onDone, kind.
 *  Halaman berupa teks, atau { act } = keterangan aksi (abu-abu, mis. "(Dimas lari ke belakang Bu Endang.)"). Waktu berhenti selama dialog. */
function dialog(pages, opts = {}) {
  const npc = opts.npc, TW = npc ? 378 : 436, lines = [];
  pages.forEach(p => { const act = typeof p === 'object', w = hWrap(act ? p.act : p, TW).map(t => ({ t, act })); for (let i = 0; i < w.length; i += 3) lines.push(w.slice(i, i + 3)); });
  if (npc && !opts.speaker) opts.speaker = npcName(npc);
  openOverlay({ kind: opts.kind || 'dialog', pages: lines, i: 0, sel: 0, opts, t: 0,
    update() {
      this.t += 1; const last = this.i >= this.pages.length - 1, ch = last && opts.choices;
      if (ch) {
        if (hit('up')) this.sel = (this.sel + ch.length - 1) % ch.length; if (hit('down')) this.sel = (this.sel + 1) % ch.length;
        if (input.click) { const h = topHit(input.click, /^ch/); if (h) { this.sel = +h.id.slice(2); return this.pick(); } }
        if (okHit() && this.t > 2) return this.pick();
        if (hit('esc')) { this.sel = ch.length - 1; return this.pick(); }
      } else if ((okHit() || input.click) && this.t > 2) { if (last) closeOverlay(opts.onDone); else this.i++; }
    },
    pick() { closeOverlay(opts.choices[this.sel].fn); },
    drawHD() {
      const p = ovProg(this), e = easeOut(p), last = this.i >= this.pages.length - 1;
      hc.save(); hc.globalAlpha = p; hc.translate(0, Math.round((1 - e) * 20 * HI));
      hBox(8, 198, 464, 66, 'paper', { ornate: true });
      const tx = npc ? 80 : 20;
      if (npc) { hInset(18, 207, 52, 48, '#ead2a4'); hBust(npc, 20, 210, 2); } // [3a] potret
      if (opts.speaker) {
        const t = npc ? trustOf(npc) : 0, cwid = npc ? hW(tierName(t), true) + 14 : 0, w = hW(opts.speaker, true) + 20 + cwid;
        hBox(16, 187, w, 17, 'gold', { thin: true }); HT(opts.speaker, 26, 192, MGC.ink, { bold: true });
        if (npc) tierChip(t, 26 + hW(opts.speaker, true) + 6, 190);
      }
      this.pages[this.i].forEach((l, k) => HT(l.t, tx, 213 + k * 14, l.act ? '#8a6a4a' : MGC.ink));
      if (!(last && opts.choices) && Math.floor(game.t * 2) % 2) HT('▶', 461, 251, MGC.ink2);
      hc.restore();
      if (last && opts.choices) { // kotak pilihan di atas tab nama, tidak bertumpuk
        const cw = Math.max(...opts.choices.map(c => hW(c.label, true))) + 36, chh = opts.choices.length * 18 + 12, X = 472 - cw, Y = (opts.speaker ? 183 : 192) - chh;
        dropIn(this, X, Y, cw, chh, () => {
          hBox(X, Y, cw, chh, 'paper', { ornate: true }); const hv = hoverId();
          opts.choices.forEach((ch, i) => {
            if (hv === 'ch' + i) this.sel = i; const yy = Y + 6 + i * 18, s = i === this.sel;
            if (s) { hBox(X + 5, yy - 1, cw - 10, 17, 'gold', { thin: true, shadow: false }); }
            HT((s ? '▶ ' : '') + ch.label, X + 12, yy + 4, s ? MGC.red : MGC.ink, { bold: s }); clickable(X + 5, yy - 1, cw - 10, 17, () => {}, 'ch' + i);
          });
        });
      }
    } });
}

// ---- Panel keputusan (renovasi, tindakan, toko) ----
/** Panel HD turun dari atas: judul, baris teks, deret tombol. o: { title, w, sel, rows(): [[teks, warna, tebal]], buttons(): [{ label, fn, off, offMsg, keep }] }.
 *  ◀ ▶ pilih tombol, E/Enter tekan, Esc = tombol terakhir. Tombol `keep` tidak menutup panel. */
function openPanel(o) {
  const W = o.w || 300, X = 240 - W / 2;
  openOverlay({ kind: 'panel', sel: o.sel || 0, t: 0,
    update() {
      this.t++; const bs = o.buttons();
      if (hit('esc') && this.t > 1) { closeOverlay(bs[bs.length - 1].fn); return; }
      if (hit('left')) this.sel = (this.sel + bs.length - 1) % bs.length; if (hit('right')) this.sel = (this.sel + 1) % bs.length;
      if (input.click) { const h = topHit(input.click, /^pn\d/); if (h) { this.sel = +h.id.slice(2); this.press(); return; } }
      if (okHit() && this.t > 2) this.press();
    },
    press() {
      const b = o.buttons()[this.sel]; if (!b) return;
      if (b.off) { sfx('ui_deny'); if (b.offMsg) toast(b.offMsg, 'bad'); return; }
      if (b.keep) b.fn(); else closeOverlay(b.fn);
    },
    drawHD() {
      const rows = o.rows().map(r => ({ r, l: hWrap(r[0], W - 28, r[2]) })), bs = o.buttons();
      const H = 44 + rows.reduce((a, x) => a + x.l.length * 12 + 4, 0) + 34, Y = Math.max(60, Math.round((270 - H) / 2));
      hDim(this, .4);
      dropIn(this, X, Y, W, H, () => {
        hBox(X, Y, W, H, 'paper', { ornate: true });
        HT(o.title, 240, Y + 9, MGC.ink, { k: 4, sh: '#e8b878', align: 'c' }); hDivider(X + 14, Y + 34, W - 28);
        let y = Y + 42; rows.forEach(({ r, l }) => { l.forEach(t => { HT(t, X + 14, y, r[1] || MGC.ink, { bold: r[2] }); y += 12; }); y += 4; });
        const hv = hoverId(), gap = 6, bw = (W - 28 - gap * (bs.length - 1)) / bs.length, by = Y + H - 29;
        bs.forEach((b, i) => {
          if (hv === 'pn' + i) this.sel = i; const s = i === this.sel, bx = X + 14 + i * (bw + gap);
          hBtn(bx, by, bw, 21, b.label, { on: s && !b.off, kind: b.off ? 'dark' : s ? null : 'paper', bold: true });
          if (b.off) { hc.fillStyle = 'rgba(70,50,30,.45)'; hc.fillRect(Math.round(bx * HI), Math.round(by * HI), Math.round(bw * HI), 21 * HI); if (s) hGlow(bx, by, bw, 21); }
          clickable(bx, by, bw, 21, () => {}, 'pn' + i);
        });
      });
    } });
}

/** Kabar singkat di tengah bawah (muncul & memudar). */
function drawToastsHD() {
  // [3a] kabar ditahan selama kotak dialog terbuka supaya tidak menimpa dialog; tampil setelah dialog ditutup
  if (game.overlay && game.overlay.kind === 'dialog' && !game.overlay.closing) { (game.toasts || []).forEach(t => { t.t0 = Math.max(t.t0, game.t); }); return; }
  const list = (game.toasts || []).filter(t => game.t - t.t0 < 3.2); game.toasts = list;
  list.forEach((t, i) => {
    const age = game.t - t.t0, a = clamp(Math.min(age / 0.15, (3.2 - age) / 0.5), 0, 1), w = hW(t.text, true) + 24, X = 240 - w / 2, Y = 222 - (list.length - 1 - i) * 21 + (1 - easeOut(clamp(age / 0.2, 0, 1))) * 8;
    hc.save(); hc.globalAlpha = a; hBox(X, Y, w, 18, 'dark', { thin: true });
    HT(t.text, 240, Y + 5.5, t.kind === 'good' ? '#a8f08a' : t.kind === 'bad' ? '#ffb0a0' : MGC.gold, { align: 'c', bold: true, sh: DK }); hc.restore();
  });
}
/** Info klinik HD (di bawah kotak lokasi) + bar sabar di atas pasien yang menunggu. */
function drawClinicHD() {
  const w = game.world; if (!w || w.type !== 'room' || !inClinic() || game.scene !== 'play') return;
  const C = S.clinic, K = CFG.CLINIC;
  if (S.clinicStage === 0) {
    const t = C.renovDay != null ? 'Renovasi · selesai besok pagi' : C.cleaned.length < CLEAN_SPOTS.length ? 'Bersih-bersih ruko · ' + C.cleaned.length + '/' + CLEAN_SPOTS.length : 'Ruko bersih · susun renovasi di meja';
    const tw = hW(t, true) + 18; hBox(4, 62, tw, 17, 'dark', { thin: true }); HT(t, 13, 67, MGC.lite, { bold: true, sh: DK });
  } else {
    // [2c-rev4] kotak ramping & tegak (user: strip lebar menghalangi layar): status + jam, lalu antrian / stok / kebersihan per baris
    const q = queueing().length, dirty = C.clean < K.DIRTY_LIMIT, st = C.open ? 'BUKA' : 'TUTUP', hrs = wdIdx() === K.CLOSED_WD ? 'libur' : pad2(K.OPEN_H) + '-' + pad2(K.CLOSE_H);
    const rows = [['Antrian ' + q + '/' + queueMax(), MGC.lite], ['Stok ' + C.stock, C.stock ? MGC.lite : '#ffb0a0'], ['Bersih ' + Math.round(C.clean) + '%', dirty ? '#ffb0a0' : MGC.lite]];
    const bw = Math.max(hW(st, true) + 5 + hW(hrs), ...rows.map(r => hW(r[0]))) + 14;
    hBox(4, 62, bw, 8 + (rows.length + 1) * 10.5, 'dark', { thin: true });
    const ow = HT(st, 10, 66, C.open ? '#a8f08a' : '#ffb0a0', { bold: true, sh: DK }); HT(hrs, 10 + ow + 5, 66, MGC.lite2, { sh: DK });
    rows.forEach(([t, c], i) => HT(t, 10, 66 + (i + 1) * 10.5, c, { sh: DK }));
  }
  C.patients.filter(p => p.st === 'wait').forEach(p => {
    const f = clamp((p.until - S.time) / (p.pat || K.PATIENCE_MIN), 0, 1), X = w.ox + p.x - 9, Y = w.oy + p.y - (p.body === 'kid' ? 32 : 37);
    hR(X - .5, Y - .5, 19, 4, '#2a1408'); hR(X, Y, 18 * f, 3, f > .5 ? '#5ccf4a' : f > .25 ? '#e8b020' : '#ef5a4a');
  });
}

// ---- Layar periksa (2c): anamnesis · pemeriksaan (odontogram) · diagnosis ----
const IC_HAND = ['.#.#.#.', '.#.#.#.', '##.#.#.', '#######', '#######', '.#####.', '..###..'];
const IC_GAUGE = ['..###..', '.#ooo#.', '#oo#oo#', '#oo#oo#', '#o##oo#', '.#ooo#.', '..###..'];
const STEP_NAMES = ['1 Anamnesis', '2 Periksa', '3 Diagnosis'];
/** Daftar diagnosis yang ditawarkan di langkah 3 (anak: gigi susu). */
const dxList = p => Object.keys(DX).filter(k => (p.body === 'kid' ? DX[k].kid : DX[k].adult) && (!DX[k].minStage || S.clinicStage >= DX[k].minStage) && (!DX[k].ctlOnly || ['ctl', 'gagal', 'cukup'].includes(p.back)));
/** Ikon alat: gambar alat v3 (mini.js) atau ikon pola untuk palpasi/tensi. */
function toolIcon(t, X, Y) {
  if (t.icon) { hc.drawImage(tool(t.icon), Math.round(X * HI), Math.round(Y * HI), 16 * HI, 16 * HI); return; }
  if (t.id === 'rontgen') { hc.imageSmoothingEnabled = false; hc.drawImage(IC.xray, Math.round(X * HI), Math.round(Y * HI), 16 * HI, 16 * HI); return; } // [2e] ikon v3 base2
  hIcon(t.id === 'tensi' ? IC_GAUGE : IC_HAND, X + 4.5, Y + 4.5, t.id === 'tensi' ? '#3a4a5a' : '#e8b088', t.id === 'tensi' ? '#1a2430' : '#7a4a2a');
}
/** Satu gigi pada odontogram (atas: mahkota di bawah, akar di atas). */
function drawToothCell(X, Y, w, h, upper, o) {
  const cw = w - 4, crH = Math.round(h * 0.55), rtH = h - crH, cx = X + 2;
  const cy = upper ? Y + rtH : Y, ry = upper ? Y : Y + crH;
  if (o.gone) { const c = 'rgba(122,74,38,.55)'; for (let i = 0; i < cw; i += 2) { hR(cx + i, cy, 1, .5, c); hR(cx + i, cy + crH - .5, 1, .5, c); } for (let j = 0; j < crH; j += 2) { hR(cx, cy + j, .5, 1, c); hR(cx + cw - .5, cy + j, .5, 1, c); } return; } // [2e-rev] sudah dicabut: hanya garis putus-putus
  hR(cx + cw * 0.25 - .5, ry - (upper ? .5 : 0), cw * 0.5 + 1, rtH + .5, '#8a6a42'); hR(cx + cw * 0.25, ry + (upper ? 0 : 0), cw * 0.5, rtH - .5, '#e2c896'); // akar
  hR(cx + .5, cy - .5, cw - 1, crH + 1, '#6a4a2a'); hR(cx - .5, cy + .5, cw + 1, crH - 1, '#6a4a2a'); // mahkota bersudut tumpul
  hR(cx + .5, cy, cw - 1, crH, o.fill || '#fbf5e6'); hR(cx, cy + .5, cw, crH - 1, o.fill || '#fbf5e6');
  hR(cx + 1, upper ? cy + crH - 2 : cy + 1, cw - 2, 1, 'rgba(160,120,70,.35)'); hR(cx + 1, cy + .5, cw - 2, .5, '#ffffff');
  if (o.bad) { hR(cx + cw / 2 - 2, cy + crH / 2 - 2, 4, 4, '#c8322a'); hR(cx + cw / 2 - 1, cy + crH / 2 - 1, 1, 1, '#ff9a8a'); }
  else if (o.ok) hR(cx + cw / 2 - 1.5, cy + crH / 2 - 1.5, 3, 3, '#4aa84a');
}
/** Odontogram: dua baris gigi FDI dengan nomor. marks(n) → { bad, ok, sel }. Mengembalikan kotak tiap gigi untuk klik. */
function drawOdonto(X, Y, W, kid, marks, small) {
  const rows = TEETH[kid ? 'kid' : 'adult'], n = rows[0].length, gap = small ? 2 : 4, cw = Math.floor((W - gap) / n), x0 = X + (W - cw * n - gap) / 2, th = small ? 12 : 24, out = [];
  const uy = Y + (small ? 0 : 9), ly = uy + th + (small ? 3 : 5);
  rows.forEach((row, ri) => row.forEach((t, ci) => {
    const x = x0 + ci * cw + (ci >= n / 2 ? gap : 0), y = ri === 0 ? uy : ly, m = marks(t) || {};
    if (m.sel) { hR(x - .5, y - 1.5, cw + 1, th + 3, MGC.red); hR(x + .5, y - .5, cw - 1, th + 1, '#ffe8a8'); }
    drawToothCell(x, y, cw, th, ri === 0, m);
    if (!small) HT(String(t), x + cw / 2, ri === 0 ? y - 9 : y + th + 3, m.sel ? MGC.red : MGC.ink2, { align: 'c', bold: m.sel });
    out.push({ t, ri, ci, r: [x, y - (small ? 0 : 9), cw, th + (small ? 0 : 9)] });
  }));
  const mx = x0 + cw * n / 2 + gap / 2; hR(mx - .25, uy - 2, .5, ly + th - uy + 4, 'rgba(122,74,38,.5)');
  hR(x0, (uy + th + ly) / 2 - .25, cw * n + gap, .5, 'rgba(122,74,38,.5)');
  return out;
}
/** Catatan pemeriksaan terbaru (teks panjang dibungkus), muat maks rows baris. */
function logLines(log, AX, Y, AW, rows, lh) {
  const out = [];
  for (let i = log.length - 1; i >= 0 && out.length < rows; i--) { const l = log[i], w = hWrap(l.text, AW - 92); for (let k = w.length - 1; k >= 0; k--) out.unshift({ l, k, s: w[k] }); }
  out.slice(-rows).forEach((o, i) => { if (o.k === 0) HT(o.l.t, AX + 6, Y + i * lh, o.l.bad ? MGC.gold : MGC.lite2, { bold: o.l.bad }); HT(o.s, AX + 86, Y + i * lh, o.l.bad ? '#ffd8a0' : MGC.lite2); });
}
/** Buka layar periksa untuk pasien di kursi dental. Waktu berhenti; tiap pertanyaan/pemeriksaan memajukan jam. */
const BACK_LABEL = { ctl: 'Kontrol', wrong: 'Keluhan ulang', lama: 'Pasien lama', refer: 'Dari rujukan', gagal: 'Keluhan ulang', cukup: 'Keluhan ringan' };
/** Buka layar periksa untuk pasien di kursi dental (lanjutan). */
function openExam(p) {
  const E = examOf(p), kid = p.body === 'kid', rows = TEETH[kid ? 'kid' : 'adult'], list = dxList(p);
  E.dsel = Math.min(E.dsel, list.length - 1);
  const ov = { kind: 'panel', t: 0, bsel: -1 };
  const go = s => { E.step = (s + 3) % 3; sfx('ui_tick', 1); };
  const bottom = () => [{ id: 'kons', label: 'Konsultasi saja', fn: () => closeOverlay(() => consultOnly(p)) }, { id: 'nanti', label: 'Nanti', fn: () => closeOverlay(() => sendBack(p)) },
    E.step < 2 ? { id: 'next', label: 'Lanjut ▶', fn: () => go(E.step + 1) } : { id: 'plan', label: 'Ajukan rencana', fn: () => closeOverlay(() => proposePlan(p, list[E.dsel])) }];
  ov.update = function () {
    this.t++;
    if (E.xrShow) { if (okHit() || hit('esc') || input.click) { E.xrShow = false; input.click = null; sfx('ui_tick', -1); } return; } // [2e] film rontgen terbuka
    if (hit('esc') && this.t > 1) { closeOverlay(() => sendBack(p)); return; }
    if (hit('tab')) return go(E.step + 1);
    if (input.click) { const h = topHit(input.click, /^ex/); if (h) { h.fn(); return; } }
    if (this.t < 3) return;
    if (E.step === 0) {
      if (hit('up')) E.qsel = (E.qsel + ASK.length - 1) % ASK.length; if (hit('down')) E.qsel = (E.qsel + 1) % ASK.length;
      if (okHit()) { if (E.asked.length >= ASK.length) go(1); else examAsk(p, E.qsel); }
    } else if (E.step === 1) {
      const n = rows[0].length;
      if (hit('up')) E.row = Math.max(-1, E.row - 1); // baris bawah → atas → deret alat
      if (hit('down')) E.row = Math.min(1, E.row + 1);
      if (hit('left')) { if (E.row < 0) E.tool = (E.tool + examTools().length - 1) % examTools().length; else E.col = (E.col + n - 1) % n; }
      if (hit('right')) { if (E.row < 0) E.tool = (E.tool + 1) % examTools().length; else E.col = (E.col + 1) % n; }
      if (okHit()) { if (E.row < 0) { if (examTools()[E.tool].tooth === false) examCheck(p); else E.row = 0; } else examCheck(p, examTooth(p)); }
    } else {
      if (hit('up')) E.dsel = (E.dsel + list.length - 1) % list.length; if (hit('down')) E.dsel = (E.dsel + 1) % list.length;
      if (hit('left')) E.col = (E.col + rows[0].length - 1) % rows[0].length; if (hit('right')) E.col = (E.col + 1) % rows[0].length;
      if (okHit()) closeOverlay(() => proposePlan(p, list[E.dsel]));
    }
  };
  ov.drawHD = function () { hDim(this, .5); dropIn(this, 8, 6, 464, 258, () => this.body()); };
  ov.body = function () {
    const hv = hoverId(), X = CFG.CLINIC.EXAM;
    if (E.row < 0 && E.step !== 1) E.row = 0;
    hBox(8, 6, 464, 258, 'paper', { ornate: true });
    HT('Periksa', 20, 14, MGC.ink, { k: 4, sh: '#e8b878' });
    STEP_NAMES.forEach((s, i) => { const bx = 236 + i * 76; hBtn(bx, 12, 72, 19, s, { on: E.step === i, kind: E.step === i ? null : hv === 'exs' + i ? 'gold' : 'paper', bold: E.step === i }); clickable(bx, 12, 72, 19, () => go(i), 'exs' + i); });
    hDivider(18, 36, 444);
    // kartu pasien
    hBox(16, 42, 124, 182, 'dark', { thin: true });
    hInset(21, 47, 38, 50, '#e8d8b8'); hc.save(); hc.beginPath(); hc.rect(22 * HI, 48 * HI, 36 * HI, 48 * HI); hc.clip();
    hc.drawImage(patientImg(Object.assign({}, p, { dir: 'D', walk: false, mood: null, st: 'chair' })), 22 * HI, 48 * HI, 36 * HI, 48 * HI); hc.restore();
    HT(p.name, 64, 49, MGC.gold, { bold: true, sh: DK });
    HT(rmCode(p.pid), 64, 61, MGC.lite, { sh: DK });
    HT({ kid: 'Anak', old: 'Lansia', adult: 'Dewasa' }[p.body], 64, 73, MGC.lite2, { sh: DK });
    HT(BACK_LABEL[p.back] || 'Datang ' + clockStr(p.arr), 64, 85, p.back ? '#ffd8a0' : MGC.lite2, { sh: DK, bold: !!p.back }); HT('Jam ' + clockStr(), 104, 21, MGC.ink2, { bold: true });
    let y = 102; hWrap('"' + p.sayText + '"', 112).slice(0, 4).forEach(l => { HT(l, 22, y, MGC.lite, { sh: DK }); y += 11; });
    y += 3; hR(22, y, 112, .5, 'rgba(120,200,180,.35)'); y += 5; HT('Catatan', 22, y, MGC.gold, { bold: true, sh: DK }); y += 12;
    const notes = [];
    if (E.asked.includes('riwayat')) notes.push([p.med ? MED[p.med].name : 'Tidak ada penyakit', p.med ? '#ffb0a0' : MGC.lite2]);
    if (E.asked.includes('obat')) notes.push([p.drug ? MED[p.drug].name : p.med === 'jantung' ? 'Pengencer darah' : 'Tanpa alergi', p.drug || p.med === 'jantung' ? '#ffb0a0' : MGC.lite2]);
    if (E.bp) notes.push(['Tensi ' + E.bp, p.med === 'hipertensi' && !p.medOk ? '#ffb0a0' : MGC.lite2]);
    const rec = ((S.clinic.people[p.pid] || {}).known || []).filter(m => m === p.med || m === p.drug); if (rec.length) notes.push(['Tercatat: ' + rec.map(m => MED[m].name).join(', '), '#ffb0a0']);
    const bad = E.log.filter(l => l.bad).length; notes.push([bad + ' temuan tidak normal', bad ? '#ffd8a0' : MGC.lite2]);
    if (p.xrFee) notes.push(['Rontgen ' + rupiah(p.xrFee) + ' (ditagih)', MGC.lite2]); // [2e]
    if (!E.asked.includes('riwayat') && !E.asked.includes('obat')) notes.push(['Riwayat medis belum ditanya', '#ffd8a0']);
    const nv = S.clinic.records.filter(r => r.pid === p.pid).length, lim = nv ? 196 : 216;
    notes.forEach(([t, c]) => hWrap(t, 112).forEach(l => { if (y < lim) HT(l, 22, y, c, { sh: DK }); y += 11; }));
    if (nv) { hBtn(22, 205, 112, 15, 'Lihat riwayat (' + nv + ')', { kind: hv === 'exr' ? 'gold' : 'paper' }); clickable(22, 205, 112, 15, () => closeOverlay(() => openRecords(p.pid, () => openExam(p))), 'exr'); }
    // isi langkah
    const AX = 148, AW = 316;
    if (E.step === 0) {
      HT(X.ASK_MIN + ' menit tiap pertanyaan', AX, 44, MGC.ink2);
      HT('Ditanya ' + E.asked.length + '/' + ASK.length, AX + AW, 44, MGC.ink, { align: 'r', bold: true });
      // daftar pertanyaan bisa digeser (semua pertanyaan boleh ditanya → jawaban tidak muat sekaligus)
      const TOP = 55, VH = 168, rowsH = ASK.map(q => { const ln = E.asked.includes(q.id) ? hWrap(answer(p, q.id), AW - 30) : []; return { ln, h: 13 + ln.length * 9 }; });
      const tops = []; let acc = 0; rowsH.forEach(r => { tops.push(acc); acc += r.h + 2; }); const total = acc - 2, maxOff = Math.max(0, total - VH);
      if (E.qfollow !== E.qsel + ':' + E.asked.length) { E.qfollow = E.qsel + ':' + E.asked.length; const t = tops[E.qsel], h = rowsH[E.qsel].h; E.qoff = clamp(E.qoff || 0, t + h - VH, t); }
      E.qoff = clamp(E.qoff || 0, 0, maxOff);
      hc.save(); hc.beginPath(); hc.rect(AX * HI, TOP * HI, AW * HI, VH * HI); hc.clip();
      ASK.forEach((q, i) => {
        const asked = E.asked.includes(q.id), { ln, h } = rowsH[i], qy = TOP + tops[i] - E.qoff, s = i === E.qsel, W2 = maxOff ? AW - 12 : AW;
        if (qy + h < TOP || qy > TOP + VH) return;
        hBox(AX, qy, W2, h, asked ? 'gold' : 'paper', { thin: true, shadow: false }); if (s || hv === 'exq' + i) hGlow(AX, qy, W2, h);
        HT((s ? '▶ ' : '') + q.q, AX + 7, qy + 3, MGC.ink, { bold: asked || s });
        ln.forEach((l, k) => HT(l, AX + 14, qy + 12 + k * 9, '#2a4a7a'));
        const cy = Math.max(qy, TOP), ch = Math.min(qy + h, TOP + VH) - cy; if (ch > 2) clickable(AX, cy, W2, ch, () => { E.qsel = i; examAsk(p, i); }, 'exq' + i);
      });
      hc.restore();
      if (maxOff) [['↑', -1, TOP], ['↓', 1, TOP + VH - 14]].forEach(([lb, d, by], i) => {
        const off = d < 0 ? E.qoff <= 0 : E.qoff >= maxOff; hBtn(AX + AW - 10, by, 10, 14, lb, { kind: off ? 'dark' : hv === 'exu' + i ? 'gold' : 'paper' });
        clickable(AX + AW - 10, by, 10, 14, () => { E.qoff = clamp(E.qoff + d * 40, 0, maxOff); }, 'exu' + i);
      });
    } else if (E.step === 1) {
      // [2e] alat Rontgen jadi tombol tersendiri di kanan (deret 7 alat T1 tetap lebar seperti 2c)
      const tools = examTools(), t = tools[E.tool], row = tools.filter(x => x.id !== 'rontgen'), tw = (AW - (row.length - 1) * 3) / row.length, xi = tools.findIndex(x => x.id === 'rontgen');
      row.forEach((tl, i) => {
        const bx = AX + i * (tw + 3), s = i === E.tool, foc = s && E.row < 0;
        hBox(bx, 42, tw, 32, s ? 'gold' : hv === 'ext' + i ? 'paper' : 'paper', { thin: true, shadow: false }); if (foc) hGlow(bx, 42, tw, 32);
        toolIcon(tl, bx + tw / 2 - 8, 44); HT(tl.short, bx + tw / 2, 63, s ? MGC.red : MGC.ink, { align: 'c', bold: s });
        clickable(bx, 42, tw, 32, () => { E.tool = i; E.row = Math.max(0, E.row); if (tl.tooth === false) examCheck(p); }, 'ext' + i);
      });
      const cur = examTooth(p), cells = drawOdonto(AX, 80, AW, kid, n => {
        const any = Object.keys(E.chk).filter(k => +k.split(':')[0] === n && !E.chk[k].gone);
        return { gone: toothGone(p, n), sel: n === cur && E.row >= 0, bad: any.some(k => E.chk[k].bad), ok: any.length && !any.some(k => E.chk[k].bad) };
      });
      cells.forEach(c => clickable(...c.r, () => { E.row = c.ri; E.col = c.ci; examCheck(p, c.t); }, 'exo' + c.t));
      const lt = (t.tooth === false ? t.name + ' · ke pasien' : t.name + ' · gigi ' + cur) + ' · ' + (t.id === 'rontgen' ? CFG.CLINIC.XRAY.MIN : X.CHECK_MIN) + ' menit', rw = xi >= 0 ? 72 : 0;
      HT(lt, AX, 158, MGC.ink, { bold: true }); if (t.tooth !== false && hW(lt, true) + hW(toothName(cur)) + 10 <= AW - rw) HT(toothName(cur), AX + AW - rw, 158, MGC.ink2, { align: 'r' });
      if (xi >= 0) { const xs = E.tool === xi, bx = AX + AW - 66; hBox(bx, 153, 66, 15, xs ? 'gold' : 'paper', { thin: true, shadow: false }); if (xs && E.row < 0) hGlow(bx, 153, 66, 15);
        hc.imageSmoothingEnabled = false; hc.drawImage(IC.xray, (bx + 3) * HI, 154.5 * HI, 12 * HI, 12 * HI); HT('Rontgen', bx + 18, 157, xs ? MGC.red : MGC.ink, { bold: xs });
        clickable(bx, 153, 66, 15, () => { if (E.tool === xi && E.xr != null) E.xrShow = true; E.tool = xi; E.row = Math.max(0, E.row); sfx('ui_tick', 1); }, 'exxr'); }
      hInset(AX, 170, AW, 54, null, true);
      if (!E.log.length) HT('Pilih alat, lalu klik gigi. Hasil pemeriksaan muncul di sini.', AX + 6, 176, MGC.lite2);
      logLines(E.log, AX, 175, AW, 4, 12);
    } else {
      const cur = examTooth(p), d = DX[list[E.dsel]];
      HT(d.region ? 'Diagnosis untuk sekelompok gigi (gigi tidak perlu dipilih)' : 'Gigi ' + cur + ' · ' + toothName(cur), AX, 44, MGC.ink, { bold: true });
      if (!d.region) HT('◀ ▶ ganti gigi', AX + AW, 44, MGC.ink2, { align: 'r' });
      const cols = 2, bw = (AW - 4) / cols;
      list.forEach((k, i) => {
        const bx = AX + (i % cols) * (bw + 4), by = 56 + Math.floor(i / cols) * 19, s = i === E.dsel;
        hBtn(bx, by, bw, 17, DX[k].name, { on: s, kind: s ? null : hv === 'exd' + i ? 'gold' : 'paper' });
        clickable(bx, by, bw, 17, () => { if (E.dsel === i) closeOverlay(() => proposePlan(p, list[i])); else { E.dsel = i; sfx('ui_tick', 1); } }, 'exd' + i);
      });
      const ry = 56 + Math.ceil(list.length / cols) * 19 + 4;
      hDivider(AX, ry, AW);
      HT('Pilihan tindakan: ' + planOpts(list[E.dsel]).map(t => txShort(t)).join(' / '), AX, ry + 7, MGC.ink, { bold: true });
      hInset(AX, ry + 20, AW, 224 - ry - 20, null, true);
      const found = E.log.filter(l => l.bad);
      if (!found.length) HT('Belum ada temuan tidak normal.', AX + 6, ry + 25, MGC.lite2);
      logLines(found, AX, ry + 25, AW, Math.floor((224 - ry - 24) / 11), 11);
    }
    // tombol bawah
    const bs = bottom(), bw2 = [104, 56, 108]; let bx = 464 - bw2.reduce((a, b) => a + b + 4, -4);
    bs.forEach((b, i) => { hBtn(bx, 228, bw2[i], 19, b.label, { kind: hv === 'exb' + i ? 'gold' : i === 2 ? null : 'paper', on: i === 2, bold: i === 2 }); clickable(bx, 228, bw2[i], 19, b.fn, 'exb' + i); bx += bw2[i] + 4; });
    hWrap(['↑ ↓ pilih · E tanya', '↑ alat · ◀ ▶ gigi · E periksa', '↑ ↓ pilih · E ajukan'][E.step] + ' · Tab langkah', 158).forEach((l, i) => HT(l, 18, 227 + i * 9.5, MGC.ink2));
    if (E.xrShow && E.xr != null) { // [2e] film rontgen (toothXR v3, HD 2×)
      const r = xrayOf(p, E.xr), PW = 176, PH = 244, PX = 240 - PW / 2 + 70, PY = 10;
      hc.fillStyle = 'rgba(10,6,4,.45)'; hc.fillRect(8 * HI, 6 * HI, 464 * HI, 258 * HI);
      hBox(PX, PY, PW, PH, 'dark', { ornate: true });
      HT('Rontgen periapikal', PX + 10, PY + 8, MGC.gold, { bold: true, sh: DK }); HT('Gigi ' + E.xr, PX + PW - 10, PY + 8, MGC.lite, { align: 'r', sh: DK });
      if (r.o) hc.drawImage(xrFilmHD(r.o, 150, 173), (PX + 13) * HI, (PY + 21) * HI); else { hInset(PX + 13, PY + 21, 150, 173, '#0e2238'); HT('Soket kosong', PX + PW / 2, PY + 104, MGC.lite2, { align: 'c' }); }
      hWrap(r.text, PW - 20, r.bad).slice(0, 3).forEach((l, i) => HT(l, PX + 10, PY + 198 + i * 10, r.bad ? '#ffd8a0' : MGC.lite2, { bold: r.bad, sh: DK }));
      HT('Klik / E tutup', PX + PW - 10, PY + PH - 13, MGC.lite2, { align: 'r', sh: DK });
    }
  };
  openOverlay(ov);
}

// ---- [2e] Layar Staf (meja praktik / Manajemen; GDD §5): rekrut, pelatihan, berhentikan ----
const STAFF_OFF = { gaji: 'Libur · gaji tidak terbayar', latih: 'Libur · ikut pelatihan', baru: 'Mulai besok pagi', minggu: 'Libur hari Minggu' };
function openStaff() {
  if (S.clinicStage < 2) return dialog(['Staf baru bisa direkrut setelah klinik di-upgrade ke Klinik Gigi.']);
  const T = CFG.STAFF, ov = { kind: 'panel', t: 0 };
  ov.update = function () {
    this.t++;
    if (hit('esc') && this.t > 1) return closeOverlay();
    if (input.click) { const h = topHit(input.click, /^sf/); if (h) h.fn(); }
  };
  const portrait = (id, X, Y, w, h) => { hInset(X, Y, w, h, '#e8d8b8'); hc.save(); hc.beginPath(); hc.rect((X + 1) * HI, (Y + 1) * HI, (w - 2) * HI, (h - 2) * HI); hc.clip();
    const s = Math.min((w - 2) / 24, (h - 2) / 32); hc.drawImage(chr(id, { dir: 'down' }), (X + w / 2 - 12 * s) * HI, (Y + 1) * HI, 24 * s * HI, 32 * s * HI); hc.restore(); };
  const pips = (X, Y, n, max, col) => { for (let i = 0; i < max; i++) { hR(X + i * 9, Y, 7, 7, '#6a4a2a'); hR(X + i * 9 + .5, Y + .5, 6, 6, i < n ? col : '#f2e2c0'); } };
  ov.drawHD = function () { hDim(this, .45); dropIn(this, 16, 6, 448, 258, () => this.body()); };
  ov.body = function () {
    const hv = hoverId(), X0 = 16, Y0 = 6, W = 448, H = 258;
    hBox(X0, Y0, W, H, 'paper', { ornate: true });
    HT('Staf Klinik', 240, Y0 + 9, MGC.ink, { k: 4, sh: '#e8b878', align: 'c' }); hDivider(X0 + 14, Y0 + 34, W - 28);
    const btn = (X, Y, w, label, id, fn, o = {}) => { hBtn(X, Y, w, 16, label, { kind: o.off ? 'dark' : hv === id ? 'gold' : o.main ? null : 'paper', on: o.main && !o.off, bold: !!o.main });
      if (o.off) { hc.fillStyle = 'rgba(70,50,30,.45)'; hc.fillRect(X * HI, Y * HI, w * HI, 16 * HI); }
      clickable(X, Y, w, 16, () => { if (o.off) { sfx('ui_deny'); if (o.msg) toast(o.msg, 'bad'); } else fn(); }, id); };
    Object.keys(STAFF_ROLES).forEach((role, ci) => {
      const R0 = STAFF_ROLES[role], cx = X0 + 12 + ci * 216, cw = 208, st = staffOf(role);
      hBox(cx, Y0 + 40, cw, 186, 'paper', { thin: true, shadow: false });
      HT(R0.name, cx + 7, Y0 + 45, MGC.ink, { bold: true }); HT(rupiah(T.WAGE[role]) + '/hari', cx + cw - 7, Y0 + 45, MGC.ink2, { align: 'r' });
      hWrap(R0.fx, cw - 14).slice(0, 2).forEach((l, k) => HT(l, cx + 7, Y0 + 55 + k * 9, '#2a4a7a'));
      if (st) {
        const I = STAFF_INFO[st.id], y = Y0 + 76; portrait(st.id, cx + 7, y, 42, 54);
        HT(staffName(st.id), cx + 56, y + 1, MGC.ink, { bold: true });
        const on = staffOn(role), off = STAFF_OFF[st.off] || (wdIdx() === CFG.CLINIC.CLOSED_WD ? STAFF_OFF.minggu : '');
        HT(on ? (st.energy <= 0 ? 'Bekerja · kelelahan' : 'Bekerja hari ini') : off, cx + 56, y + 12, on ? (st.energy <= 0 ? MGC.red : '#2e7a34') : '#a8700a', { bold: true });
        HT('Skill', cx + 56, y + 25, MGC.ink2); pips(cx + 102, y + 25, st.skill, T.SKILL_MAX, '#e3aa3c');
        HT('Energi', cx + 56, y + 36, MGC.ink2); pips(cx + 102, y + 36, st.en, T.ENERGY_LV_MAX, '#5ccf4a');
        HT('Tenaga', cx + 56, y + 47, MGC.ink2); hBar(cx + 102, y + 47, 94, 7, st.energy / T.ENERGY_MAX, st.energy > 30 ? '#5ccf4a' : '#ef5a4a');
        const eff = 1 + T.SKILL_STEP * (st.skill - 1);
        const ef = eff * (st.energy <= 0 ? T.TIRED : 1);
        HT(role === 'resep' ? 'Efek: sabar +' + Math.round(T.PATIENCE * ef * 100) + '%, antrian +' + T.QUEUE : 'Efek: zona +' + Math.round(T.ZONE * ef * 100) + '%, sakit -' + Math.round(T.PAIN * ef * 100) + '%', cx + 7, y + 60, MGC.ink, { bold: true });
        HT('Tenaga -' + T.ENERGY_USE[st.en - 1] + ' per ' + (role === 'resep' ? 'pasien' : 'tindakan') + (st.energy <= 0 ? ' · lelah' : ''), cx + 7, y + 71, st.energy <= 0 ? MGC.red : MGC.ink2);
        HT(fitText('"' + I.say + '"', cw - 14), cx + 7, y + 83, '#6a4a26');
        const by = Y0 + 186; if (!st.train) HT('Pelatihan (staf libur 1 hari):', cx + 7, by - 11, MGC.ink2); else HT('Pelatihan ' + (st.train.kind === 'skill' ? 'Skill' : 'Energi') + ' · ' + dayLabel(st.train.day), cx + 7, by - 11, '#a8700a', { bold: true });
        [['skill', 'Skill', st.skill, T.SKILL_MAX, T.SKILL_COST], ['energi', 'Energi', st.en, T.ENERGY_LV_MAX, T.ENERGY_COST]].forEach(([k, lb, lv, mx, cost], i) => {
          const c = Math.round((cost[lv + 1] || 0) * jrTrainMul()), max = lv >= mx, /* [3b-1] */ busy = !!st.train, poor = !max && S.money < c, bx = cx + 7 + i * 100;
          btn(bx, by, 96, max ? lb + ' Lv maks' : lb + ' Lv' + (lv + 1) + ' · ' + (c ? (c / 1e6).toLocaleString('id-ID') + 'jt' : 'gratis'), 'sft' + role + k, () => trainStaff(role, k === 'skill' ? 'skill' : 'en'),
            { off: max || busy || poor, msg: max ? '' : busy ? 'Sudah ada pelatihan terjadwal.' : 'Uangmu belum cukup.' });
        });
        btn(cx + 7, by + 19, 196, 'Berhentikan', 'sff' + role, () => closeOverlay(() => dialog(['Berhentikan ' + staffName(st.id) + '?'], { choices: [
          { label: 'Ya, berhentikan', fn: () => { fireStaff(role); openStaff(); } }, { label: 'Batal', fn: openStaff }] })));
      } else {
        HT('Kandidat', cx + 7, Y0 + 74, MGC.ink2, { bold: true });
        R0.cands.forEach((id, k) => {
          const y = Y0 + 85 + k * 46, I = STAFF_INFO[id]; portrait(id, cx + 7, y, 32, 42);
          HT(staffName(id), cx + 45, y + 3, MGC.ink, { bold: true });
          hWrap(I.ciri, cw - 52).slice(0, 3).forEach((l, j) => HT(l, cx + 45, y + 18 + j * 9, MGC.ink2));
          btn(cx + cw - 52, y, 45, 'Rekrut', 'sfh' + id, () => { hireStaff(role, id); }, { main: true });
        });
      }
    });
    const tot = Object.keys(STAFF_ROLES).reduce((a, r) => a + (staffOf(r) ? T.WAGE[r] : 0), 0);
    HT('Gaji dipotong tiap pagi Senin-Sabtu · total ' + rupiah(tot) + '/hari', X0 + 14, Y0 + 230, MGC.ink2); HT('Uang kurang = staf libur hari itu.', X0 + 14, Y0 + 240, MGC.ink2);
    hBtn(X0 + W - 88, Y0 + 229, 74, 19, 'Tutup', { kind: hv === 'sfx' ? 'gold' : null, on: true, bold: true }); clickable(X0 + W - 88, Y0 + 229, 74, 19, () => closeOverlay(), 'sfx');
  };
  openOverlay(ov);
}

// ---- Tarif (Manajemen; GDD §4.1) ----
function openTariff() {
  if (S.clinicStage < 1) return dialog(['Klinik belum buka.']);
  const C = S.clinic, X = CFG.CLINIC.EXAM, ov = { kind: 'panel', t: 0, sel: 0 };
  const adj = (k, d) => { const f = fairPrice(k), v = clamp(tariff(k) + d * X.TARIFF_STEP, X.TARIFF_STEP, Math.round(f * X.TARIFF_MAX_R / X.TARIFF_STEP) * X.TARIFF_STEP); if (v !== tariff(k)) { C.tariff[k] = v; sfx('ui_tick', d); } };
  const reset = () => { C.tariff = {}; sfx('ui_click'); };
  ov.update = function () {
    this.t++;
    if (hit('esc') && this.t > 1) return closeOverlay();
    const n = tariffKeys().length;
    if (hit('up')) this.sel = (this.sel + n + 1) % (n + 2); if (hit('down')) this.sel = (this.sel + 1) % (n + 2);
    if (this.sel < n) { if (hit('left')) adj(tariffKeys()[this.sel], -1); if (hit('right')) adj(tariffKeys()[this.sel], 1); }
    if (hit('rand') && this.sel < n) { delete C.tariff[tariffKeys()[this.sel]]; sfx('ui_click'); }
    if (input.click) { const h = topHit(input.click, /^tf/); if (h) { h.fn(); return; } }
    if (okHit() && this.t > 2) { if (this.sel === n) reset(); else if (this.sel === n + 1) closeOverlay(); }
  };
  ov.drawHD = function () { hDim(this, .45); dropIn(this, 36, 6, 408, 258, () => this.body()); };
  ov.body = function () {
    const X0 = 36, Y0 = 6, hv = hoverId(), n = tariffKeys().length, rs = n > 9 ? 14.8 : 16; // [2e] 10 baris (rontgen) dirapatkan
    hBox(X0, Y0, 408, 258, 'paper', { ornate: true });
    HT('Tarif Tindakan', 240, Y0 + 9, MGC.ink, { k: 4, sh: '#e8b878', align: 'c' }); hDivider(X0 + 14, Y0 + 34, 380);
    HT('Tindakan', X0 + 16, Y0 + 42, MGC.ink2, { bold: true }); HT('Harga wajar', X0 + 184, Y0 + 42, MGC.ink2, { bold: true, align: 'r' });
    HT('Tarifmu', X0 + 258, Y0 + 42, MGC.ink2, { bold: true, align: 'c' }); HT('Label', X0 + 336, Y0 + 42, MGC.ink2, { bold: true });
    tariffKeys().forEach((k, i) => {
      const y = Y0 + 52 + i * rs, s = this.sel === i, b = band(k), set = C.tariff[k] != null;
      if (hv && hv.startsWith('tfr' + i)) this.sel = i;
      hBox(X0 + 10, y, 388, rs - 1, s ? 'gold' : 'paper', { thin: true, shadow: false }); if (s) hGlow(X0 + 10, y, 388, rs - 1);
      HT(CASES[k].name.length >= 18 ? CASES[k].short : CASES[k].name, X0 + 16, y + 4, MGC.ink, { bold: s }); HT(rupiah(fairPrice(k)), X0 + 184, y + 4, MGC.ink2, { align: 'r' });
      hBtn(X0 + 200, y + 1, 13, 13, '◀', { kind: hv === 'tfl' + i ? 'gold' : 'dark' }); clickable(X0 + 200, y, 15, 15, () => { this.sel = i; adj(k, -1); }, 'tfl' + i);
      HT(rupiah(tariff(k)), X0 + 258, y + 4, set ? MGC.red : MGC.ink, { align: 'c', bold: true });
      hBtn(X0 + 303, y + 1, 13, 13, '▶', { kind: hv === 'tfn' + i ? 'gold' : 'dark' }); clickable(X0 + 301, y, 15, 15, () => { this.sel = i; adj(k, 1); }, 'tfn' + i);
      HT(b.label, X0 + 336, y + 4, b.col, { bold: true });
      clickable(X0 + 10, y, 186, 15, () => { this.sel = i; }, 'tfr' + i);
    });
    const fy = Y0 + 52 + n * rs + 3, m = tariffMul();
    HT('Jumlah pasien ×' + m.toFixed(2) + (stars() > 3 ? ' · ★' + stars() + ' lebih toleran' : ''), X0 + 16, fy, MGC.ink, { bold: true });
    hWrap('Murah: pasien lebih banyak, stres naik. Mahal: lebih sering ditolak.', 230).forEach((l, i) => HT(l, X0 + 162, fy + i * 10, MGC.ink2));
    [['Samakan ke harga wajar', n, 156], ['Selesai', n + 1, 90]].forEach(([lb, id, w], i) => {
      const bx = i ? X0 + 408 - 14 - w : X0 + 14, by = Y0 + 258 - 27, s = this.sel === id;
      if (hv === 'tfb' + i) this.sel = id;
      hBtn(bx, by, w, 21, lb, { on: s, kind: s ? null : 'paper', bold: true }); clickable(bx, by, w, 21, () => { this.sel = id; if (id === n) reset(); else closeOverlay(); }, 'tfb' + i);
    });
    HT('↑ ↓ pilih · ◀ ▶ ubah Rp 50rb · R kembali wajar · Esc tutup', 240, Math.min(fy + 22, Y0 + 258 - 37), '#8a6a4a', { align: 'c' });
  };
  openOverlay(ov);
}

// ---- Rekam medis per pasien (Manajemen; GDD §6; revisi 2c: kode RM, riwayat kunjungan) ----
/** Tanggal pendek: H8 K = Hari 8 Kemarau. */
const dShort = d => dayLabel(d).replace('Hari ', 'H').replace(' Kemarau', ' K').replace(' Hujan', ' H');
/** Singkatan tindakan untuk daftar. */
const txShort = (tx, note) => tx === 'rujuk' ? (note && note.includes('Galih') ? 'Rujuk dr. Galih' : 'Rujuk') : CASES[tx].short || CASES[tx].name;
/** Buka rekam medis. focus = pid pasien yang langsung dibuka (dari layar Periksa); after = dipanggil saat ditutup. */
function openRecords(focus, after) {
  const C = S.clinic, VIS = 13;
  const list = () => Object.values(C.people).filter(o => C.records.some(r => r.pid === o.pid)).sort((a, b) => b.last - a.last || b.pid - a.pid);
  const L0 = list(), fi = L0.findIndex(o => o.pid === focus);
  const ov = { kind: 'panel', t: 0, sel: Math.max(0, fi), top: 0, vtop: 0 };
  const close = () => closeOverlay(after);
  ov.update = function () {
    this.t++; const n = list().length;
    if (hit('esc') && this.t > 1) return close();
    if (n) { if (hit('up')) { this.sel = Math.max(0, this.sel - 1); this.vtop = 0; } if (hit('down')) { this.sel = Math.min(n - 1, this.sel + 1); this.vtop = 0; } }
    if (hit('left')) this.vtop = Math.max(0, this.vtop - 1); if (hit('right')) this.vtop++;
    this.top = clamp(this.top, Math.max(0, this.sel - VIS + 1), this.sel);
    if (input.click) { const h = topHit(input.click, /^rm/); if (h) { h.fn(); return; } }
    if (okHit() && this.t > 2 && !n) close();
  };
  ov.drawHD = function () { hDim(this, .5); dropIn(this, 10, 6, 460, 258, () => this.body()); };
  ov.body = function () {
    const hv = hoverId(), ppl = list();
    hBox(10, 6, 460, 258, 'paper', { ornate: true });
    HT('Rekam Medis', 22, 15, MGC.ink, { k: 4, sh: '#e8b878' });
    HT(ppl.length + ' pasien · ' + C.records.length + ' kunjungan', 458, 21, MGC.ink2, { align: 'r' });
    hDivider(20, 37, 440);
    if (!ppl.length) { HT('Belum ada pasien yang ditangani.', 240, 120, MGC.ink2, { align: 'c' }); HT('Esc tutup', 240, 245, MGC.ink2, { align: 'c' }); return; }
    // daftar pasien: kode · nama · kunjungan terakhir
    hInset(18, 43, 168, VIS * 15 + 6, '#f0d8a8');
    ppl.slice(this.top, this.top + VIS).forEach((o, k) => {
      const i = this.top + k, y = 46 + k * 15, s = i === this.sel;
      if (s) hBox(20, y - 1, 164, 14, 'gold', { thin: true, shadow: false }); else if (hv === 'rm' + i) hR(20, y - 1, 164, 14, 'rgba(255,240,200,.6)');
      HT(rmCode(o.pid), 24, y + 3, MGC.ink2); HT(o.name, 72, y + 3, MGC.ink, { bold: s });
      HT(dShort(o.last), 180, y + 3, MGC.ink2, { align: 'r' });
      clickable(20, y - 1, 164, 14, () => { if (this.sel !== i) { this.sel = i; this.vtop = 0; sfx('ui_tick', 1); } }, 'rm' + i);
    });
    if (ppl.length > VIS) HT((this.top + 1) + '-' + Math.min(ppl.length, this.top + VIS) + ' dari ' + ppl.length, 102, 46 + VIS * 15 + 6, MGC.ink2, { align: 'c' });
    // kartu pasien
    const o = ppl[Math.min(this.sel, ppl.length - 1)], vis = C.records.filter(r => r.pid === o.pid), PX = 192, PW = 270;
    hBox(PX, 42, PW, 202, 'dark', { thin: true });
    HT(o.name, PX + 8, 49, MGC.gold, { bold: true, sh: DK }); HT(rmCode(o.pid), PX + PW - 8, 49, MGC.gold, { align: 'r', bold: true, sh: DK });
    const known = o.known || [], ctl = C.returns.find(r => r.pid === o.pid && (r.kind === 'ctl' || r.kind === 'refer'));
    HT({ kid: 'Anak', old: 'Lansia', adult: 'Dewasa' }[o.body] + ' · pertama ' + dayLabel(o.first) + ' · ' + vis.length + ' kunjungan', PX + 8, 61, MGC.lite2, { sh: DK });
    HT('Riwayat medis: ' + (known.length ? known.map(m => MED[m].name).join(', ') : 'tidak ada yang tercatat'), PX + 8, 72, known.length ? '#ffb0a0' : MGC.lite2, { sh: DK });
    HT('Kontrol berikutnya: ' + (ctl ? dayLabel(ctl.day) : '-'), PX + 8, 83, ctl ? '#a8f08a' : MGC.lite2, { sh: DK, bold: !!ctl });
    // odontogram gabungan: gigi yang pernah ditindak merah, temuan lain oranye
    const done = vis.filter(r => r.tooth && r.tx !== 'konsul').map(r => r.tooth), marks = [].concat(...vis.map(r => r.marks || []));
    hInset(PX + 6, 94, PW - 12, 33, '#f0e2c4');
    drawOdonto(PX + 10, 97, PW - 20, o.body === 'kid', n => ({ gone: !!o.gone && o.gone[n] != null, bad: done.includes(n), fill: done.includes(n) ? '#ffd0c0' : marks.includes(n) ? '#ffe2a8' : null }), true);
    // riwayat kunjungan (terbaru di atas), ◀ ▶ geser
    let y = 132; hR(PX + 6, y - 2, PW - 12, .5, 'rgba(120,200,180,.35)');
    this.vtop = Math.min(this.vtop, Math.max(0, vis.length - 1));
    vis.slice(this.vtop).forEach(r => {
      if (y > 214) return;
      HT(dShort(r.d) + ' ' + clockStr(r.t), PX + 8, y, MGC.gold, { sh: DK, bold: true });
      HT(txShort(r.tx, r.note) + ' · ' + rupiah(r.pay), PX + PW - 8, y, MGC.lite, { align: 'r', sh: DK });
      y += 10;
      const lines = [(r.back ? '[' + (BACK_LABEL[r.back] || 'Kembali') + '] ' : '') + 'Diagnosis: ' + (r.dx ? DX[r.dx].name : '-') + (r.tooth ? ' · gigi ' + r.tooth : '') + (r.bp ? ' · tensi ' + r.bp : '')];
      if (r.say) lines.push('Keluhan: ' + r.say);
      if (r.ctl) lines.push((r.tx === 'rujuk' ? 'Kembali ' : 'Kontrol ') + dayLabel(r.ctl) + '.');
      if (r.note) lines.push(r.note);
      lines.forEach((t, j) => hWrap(t, PW - 22).forEach(l => { if (y <= 222) HT(l, PX + 14, y, j === lines.length - 1 && r.note && t === r.note ? '#ffd8a0' : MGC.lite2, { sh: DK }); y += 9.5; }));
      y += 3;
    });
    if (vis.length > 1) HT('Kunjungan ' + (this.vtop + 1) + '-' + vis.length + ' dari ' + vis.length, PX + PW - 8, 233, MGC.lite2, { align: 'r', sh: DK });
    HT('↑ ↓ pilih pasien · Esc tutup', 22, 248, MGC.ink2);
    if (vis.length > 1) { [['◀', -1], ['▶', 1]].forEach(([lb, d], i) => { const bx = PX + 6 + i * 18; hBtn(bx, 231, 15, 10, lb, { kind: hv === 'rmv' + i ? 'gold' : 'paper' }); clickable(bx, 231, 15, 11, () => { this.vtop = clamp(this.vtop + d, 0, vis.length - 1); }, 'rmv' + i); }); }
  };
  openOverlay(ov);
}

// ---- Surat pembuka ----
/** Tampilkan surat sambutan (kertas), lalu panggil after(). Waktu berhenti selama surat terbuka. */
function showLetter(after) {
  const pages = LETTER.pages.map(p => p.map(t => t.replace('{name}', S.name)));
  openOverlay({ kind: 'letter', i: 0, t: 0,
    update() { this.t++; if ((okHit() || input.click) && this.t > 2) { if (this.i < pages.length - 1) { this.i++; sfx('paper_flip'); } else closeOverlay(after); } },
    drawHD() {
      hDim(this, .6);
      dropIn(this, 92, 14, 296, 234, () => {
        hBox(92, 14, 296, 234, 'paper', { ornate: true });
        // segel lilin merah di atas surat
        const sx = 240 * HI, sy = 15 * HI; for (let j = -20; j <= 20; j++) for (let i = -20; i <= 20; i++) { const d = i * i + j * j, wob = 2 * Math.sin(Math.atan2(j, i) * 7); if (d <= (18 + wob) ** 2) { hc.fillStyle = d > (15 + wob) ** 2 ? '#7a1a1e' : d > 144 ? '#a8282e' : (i + j < -8 ? '#e0606a' : '#c03a42'); hc.fillRect(sx + i, sy + j, 1, 1); } }
        hc.fillStyle = 'rgba(0,0,0,.25)'; hc.fillRect(sx - 8, sy + 19, 18, 2);
        HT('R', 240, 11.5, '#ffe0d8', { align: 'c', bold: true, sh: '#6a1418' });
        HT('Surat untukmu', 106, 30, MGC.ink, { k: 4, sh: '#e8b878' }); HT((this.i + 1) + '/' + pages.length, 376, 34, MGC.ink2, { align: 'r' });
        hDivider(106, 48, 268);
        let y = 58; pages[this.i].forEach(par => { hWrap(par, 266).forEach(l => { HT(l, 107, y, MGC.ink); y += 12; }); y += 6; });
        if (this.i === pages.length - 1) { HT('Salam hangat,', 374, 206, MGC.ink2, { align: 'r' }); HT(LETTER.from, 374, 218, MGC.ink, { align: 'r', bold: true }); }
        if (Math.floor(game.t * 2) % 2) HT(this.i < pages.length - 1 ? 'E / klik: halaman berikutnya' : 'E / klik: tutup surat', 240, 234, MGC.ink2, { align: 'c' });
      });
    } });
}

// ---- Kalender (klik kotak tanggal di HUD, tombol C, kalender dinding, atau papan pengumuman kota) ----
/** Ikon event di kalender: bibit untuk Tanam Pohon, bintang untuk lainnya. */
function evIcon(e, X, Y) { if (e[3] === 'tree') hIcon(IC_SPROUT, X, Y, '#4aa83a', '#1e4a14'); else hIcon(IC_STAR, X, Y, '#e8a020', '#5a2a10'); }
const DAY_SHORT = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
const NOTE_COL = { info: MGC.lite2, main: MGC.lite, now: MGC.gold, warn: '#ffd8a0' };
/** Catatan satu hari kalender: event musiman, peringatan banjir tahunan, libur Minggu, karaoke Sabtu (GDD §2, §13). */
function dayNotes(seaKey, d, wd, today) {
  const n = [];
  if (today) n.push(['Hari ini', 'now']);
  if (year() === 1 && seaKey === 'kemarau' && d === 1) n.push(['Hari pertamamu di Rimbasari.', 'main']);
  EVENTS[seaKey].filter(e => e[0] === d).forEach(e => { n.push(['★ ' + e[1], 'main']); n.push([e[2], 'info']); });
  EVENTS[seaKey].filter(e => e[0] === d + 1).forEach(e => n.push(['Besok: ' + e[1] + '.', 'warn']));
  nikahCalNote(seaKey, d, n); // [3a-5]
  if (wd === 6) n.push(['Klinik libur hari Minggu.', 'info']);
  if (wd === 5) n.push(['Malam: Karaoke Malam Minggu.', 'info']);
  if (n.length === 0 || (n.length === 1 && today)) n.push(['Tidak ada acara.', 'info']);
  return n;
}
function openCalendar() {
  if (game.overlay) return;
  const cal = { kind: 'calendar', sea: seasonIdx(), sel: dayOfSeason(), t: 0 };
  cal.update = function () {
    this.t++;
    if ((hit('esc') || hit('cal')) && this.t > 1) return closeOverlay();
    if (hit('left')) this.sel = clamp(this.sel - 1, 1, CFG.SEASON_DAYS); if (hit('right')) this.sel = clamp(this.sel + 1, 1, CFG.SEASON_DAYS);
    if (hit('up')) this.sel = clamp(this.sel - 7, 1, CFG.SEASON_DAYS); if (hit('down')) this.sel = clamp(this.sel + 7, 1, CFG.SEASON_DAYS);
    if (hit('tab')) this.sea = (this.sea + 1) % SEASONS.length;
    if (input.click) { const h = topHit(input.click, /^cal/); if (h) h.fn(); }
  };
  cal.drawHD = function () {
    hDim(this, .5);
    dropIn(this, 16, 6, 448, 258, () => this.body());
  };
  cal.body = function () {
    const sea = SEASONS[this.sea], yStart = (year() - 1) * CFG.SEASON_DAYS * SEASONS.length, first = yStart + this.sea * CFG.SEASON_DAYS + 1;
    const off = (first - 1) % 7, todayAbs = S.day, hv = hoverId();
    hBox(16, 6, 448, 258, 'paper', { ornate: true });
    HT('Kalender', 28, 15, MGC.ink, { k: 4, sh: '#e8b878' });
    // pilih musim
    hBox(156, 12, 206, 21, 'dark', { thin: true });
    HT(sea.name + ' · Tahun ' + year(), 259, 19, MGC.gold, { align: 'c', bold: true, sh: DK });
    hBtn(158, 14, 17, 17, '◀', { hover: hv === 'calp', kind: hv === 'calp' ? 'gold' : 'paper' }); clickable(158, 14, 17, 17, () => { this.sea = (this.sea + 1) % 2; }, 'calp');
    hBtn(343, 14, 17, 17, '▶', { hover: hv === 'caln', kind: hv === 'caln' ? 'gold' : 'paper' }); clickable(343, 14, 17, 17, () => { this.sea = (this.sea + 1) % 2; }, 'caln');
    hBtn(438, 12, 20, 20, 'X', { kind: hv === 'calx' ? 'gold' : 'paper', bold: true }); clickable(438, 12, 20, 20, () => closeOverlay(), 'calx');
    hDivider(26, 37, 428);
    // kisi tanggal
    const X0 = 28, Y0 = 44, cw = 27, rh = 19;
    hInset(X0 - 3, Y0 - 3, cw * 7 + 5, 12 + rh * 10 + 4, '#f0d8a8');
    DAY_SHORT.forEach((d, i) => HT(d, X0 + i * cw + cw / 2, Y0, i === 6 ? MGC.red : MGC.ink2, { align: 'c', bold: true }));
    for (let d = 1; d <= CFG.SEASON_DAYS; d++) {
      const k = off + d - 1, col = k % 7, row = Math.floor(k / 7), X = X0 + col * cw, Y = Y0 + 11 + row * rh;
      const abs = first + d - 1, today = abs === todayAbs, past = abs < todayAbs, ev = EVENTS[sea.key].find(e => e[0] === d), sel = this.sel === d, hov = hv === 'cal' + d;
      const face = today ? '#ffd86a' : past ? '#e6d2ae' : hov ? '#fffbe8' : '#fff4dc';
      hR(X + .5, Y, cw - 1, rh - 1, '#8a5a30'); hR(X + 1, Y + .5, cw - 2, rh - 2, face);
      hR(X + 1, Y + .5, cw - 2, .5, today ? '#fff2b0' : '#ffffff'); hR(X + 1, Y + rh - 2, cw - 2, .5, today ? '#c8902a' : '#d8bc8c');
      if (sel) { hR(X, Y - .5, cw, 1, MGC.red); hR(X, Y + rh - 1.5, cw, 1, MGC.red); hR(X, Y - .5, 1, rh, MGC.red); hR(X + cw - 1, Y - .5, 1, rh, MGC.red); }
      HT(String(d), X + 3, Y + 3, col === 6 ? MGC.red : past ? '#a07a52' : MGC.ink, { bold: today || sel });
      if (ev) evIcon(ev, X + cw - 10, Y + rh - 11);
      if (col === 5) hIcon(IC_NOTE, X + 3, Y + rh - 7, '#7a4aa8');
      clickable(X, Y, cw, rh, () => { this.sel = d; }, 'cal' + d);
    }
    // detail hari terpilih
    const PX = 228, wd = (first + this.sel - 2) % 7;
    hBox(PX, 42, 226, 94, 'dark', { thin: true });
    HT(DAYS[wd] + ', Hari ' + this.sel, PX + 10, 50, MGC.gold, { bold: true, sh: DK });
    hR(PX + 10, 61, 206, .5, 'rgba(120,200,180,.35)');
    let y = 66; dayNotes(sea.key, this.sel, wd, first + this.sel - 1 === todayAbs).forEach(([t, kind]) => hWrap(t, 204).forEach(l => { if (y < 128) HT(l, PX + 10, y, NOTE_COL[kind], { sh: DK }); y += 11; }));
    // daftar event musim ini
    hBox(PX, 140, 226, 106, 'paper', { thin: true });
    HT('Event ' + sea.name, PX + 10, 147, MGC.ink, { bold: true }); hDivider(PX + 10, 158, 206);
    EVENTS[sea.key].forEach((e, i) => {
      const yy = 165 + i * 15, done = first + e[0] - 1 < todayAbs;
      evIcon(e, PX + 9, yy - 1);
      HT('Hari ' + e[0], PX + 20, yy, MGC.ink2); HT(e[1], PX + 64, yy, done ? MGC.ink2 : MGC.ink, { bold: !done });
      clickable(PX + 6, yy - 3, 214, 14, () => { this.sel = e[0]; }, 'cale' + i);
    });
    let ny = 165 + EVENTS[sea.key].length * 15 + 2;
    if (sea.key === 'kemarau') { HT('Pembukaan Klinik: setelah ruko siap.', PX + 10, ny, MGC.ink2); ny += 12; }
    hIcon(IC_NOTE, PX + 10, ny - 1, '#7a4aa8'); HT('Sabtu malam: karaoke', PX + 20, ny, MGC.ink2);
    HT('◀ ▶ ↑ ↓ pilih hari · Tab ganti musim · C / Esc tutup', 28, 251, MGC.ink2);
  };
  openOverlay(cal);
}

// ---- Menu (Esc) ----
function openMenu() {
  const items = [
    { label: 'Lanjut bermain', fn: () => closeOverlay() },
    { label: 'Simpan sekarang', fn: () => { const ok = saveGame(); closeOverlay(() => dialog([ok ? 'Permainan tersimpan.' : 'Gagal menyimpan. Penyimpanan browser mungkin diblokir.'])); } },
    { label: 'Tas', fn: () => closeOverlay(openTas) }, // [2h]
    { label: 'Buku Kenalan', fn: () => closeOverlay(() => openBook()) }, // [3a]
    { label: 'Jurnal', fn: () => closeOverlay(() => openJurnal()) }, /* [3b-1] */
    { label: 'Kalender', fn: () => closeOverlay(openCalendar) },
    { label: 'Manajemen', fn: () => closeOverlay(openManage) },
    { label: 'Pengaturan', fn: () => closeOverlay(openSettings) },
    { label: 'Kontrol', fn: () => closeOverlay(() => dialog(['WASD / panah: jalan · E / Enter: masuk & aksi · Esc: menu', '1: 0,5× · 2: 1× · 3: 2× · 4: 4× · P: jeda · M: bisu · I: tas · K: buku kenalan · J: jurnal · C: kalender (atau klik kotak tanggal, kalender dinding, papan pengumuman). Tidur di kasur rumah menyimpan permainan otomatis.'])) },
    { label: 'Ke layar judul', fn: () => closeOverlay(() => { game.scene = 'title'; game.world = null; }) },
  ];
  openOverlay({ kind: 'menu', sel: 0, t: 0,
    update() {
      this.t++; if (hit('up')) this.sel = (this.sel + items.length - 1) % items.length; if (hit('down')) this.sel = (this.sel + 1) % items.length;
      if (hit('esc') && this.t > 1) { closeOverlay(); return; }
      if (input.click) { const h = hitsPrev.find(h => inRect(input.click.x, input.click.y, h.r) && /^m\d/.test(h.id)); if (h) { items[+h.id.slice(1)].fn(); return; } }
      if (okHit()) items[this.sel].fn();
    },
    drawHD() {
      hDim(this, .45);
      dropIn(this, 146, 6, 188, 260, () => { /* [3b-1] 10 item: panel lebih tinggi, jarak 20 */
        hBox(146, 6, 188, 260, 'paper', { ornate: true });
        HT('Menu', 240, 15, MGC.ink, { k: 4, sh: '#e8b878', align: 'c' });
        HT('drg. ' + S.name + ' · Tahun ' + year(), 240, 37, MGC.ink2, { align: 'c' });
        hDivider(160, 49, 160);
        const hv = hoverId();
        items.forEach((it, i) => {
          if (hv === 'm' + i) this.sel = i; const a = stagger(this, i), Y = 56 + i * 20, s = i === this.sel; /* [3b-1] 10 item: jarak 20 */
          hc.save(); hc.globalAlpha *= a; hc.translate(Math.round((1 - easeOut(a)) * -12 * HI), 0);
          hBtn(160, Y, 160, 18, (s ? '▶ ' : '') + it.label, { on: s }); hc.restore();
          clickable(160, Y, 160, 18, () => {}, 'm' + i);
        });
      });
    } });
}

/* ============================ MINIGAME (2d) ============================ */
// Minigame tindakan T1: design/gdd/minigame/00 (aturan umum), 01–04, 07–09; tata letak & gambar dari design/v3/minigame.html (mini.js).
// Overlay HD, waktu game berhenti. offer() setuju → startProc() → langkah-langkah (6 jenis input) → layar hasil (finishProc) → afterProc().
// Devitalisasi, mumifikasi, dan open akses (revisi 2c) disusun dari langkah tindakan lain (keputusan user 2026-11-12).
const MG_KEYS = { TEPAT: 'Spasi / klik', GOSOK: 'tahan klik + geser', TAHAN: 'tahan klik / Spasi', URUT: 'klik bahan di baki', RITME: 'A / D atau klik kiri / kanan', PILIH: 'klik kartu' };
const GRADE = {
  sempurna: { name: 'Sempurna', col: '#2e7a34', sfx: 'result_perfect' }, sukses: { name: 'Sukses', col: '#2e7a34', sfx: 'result_good' },
  cukup: { name: 'Cukup', col: '#a8700a', sfx: 'result_ok' }, gagal: { name: 'Gagal', col: '#c8322a', sfx: 'result_fail' } };
const MG_TITLE = { konsul: 'Konsultasi', resep: 'Resep', gic: 'Tambal GIC', scaling: 'Scaling', cabut: 'Cabut Gigi', cabutSusu: 'Cabut Gigi Susu', devital: 'Devitalisasi', mumi: 'Mumifikasi', openRes: 'Open Akses' };
/** [2d] Sifat pasien untuk langkah "cara bicara" konsultasi (minigame/01): anak & lansia → awam, curiga → medis, santai → campuran. */
const TRAITS = { anak: { name: 'Anak', talk: 'awam', col: '#c8407a' }, lansia: { name: 'Lansia', talk: 'awam', col: '#8a5a2a' }, curiga: { name: 'Curiga', talk: 'medis', col: '#7a4ab8' }, biasa: { name: 'Santai', talk: 'campuran', col: '#2e7a5a' } };
const TALK = [
  { id: 'awam', t: 'Awam', d: 'Pakai kata sehari-hari, tanpa istilah kedokteran.', icon: 'model' },
  { id: 'medis', t: 'Medis', d: 'Pakai istilah kedokteran dan tunjukkan hasil pemeriksaan.', icon: 'card' },
  { id: 'campuran', t: 'Campuran', d: 'Sebut istilahnya, lalu terangkan dengan kata sehari-hari.', icon: 'brosur' }];
function traitOf(p) { if (!p.trait) p.trait = p.body === 'kid' ? 'anak' : p.body === 'old' ? 'lansia' : hash(p.pid || 1, 77) < CFG.MG.CURIGA_P ? 'curiga' : 'biasa'; return p.trait; }
/** Kartu instruksi pulang (minigame/02 tabel instruksi per tindakan). */
const INSTR = {
  cabut: ['Gigit tampon 30 menit', 'Jangan kumur keras & jangan merokok 24 jam'],
  // [2d-rev3] anak: tanpa pesan rokok (revisi user 2026-11-12); bibir/pipi kebas mudah tergigit tanpa terasa
  cabutAnak: ['Gigit tampon 30 menit, jangan dimainkan lidah atau jari', 'Jangan gigit-gigit bibir & pipi selama masih kebas'],
  gic: ['Jangan makan dulu 1 jam', 'Hindari menggigit keras di gigi itu hari ini'],
  sementara: ['Jangan mengunyah di sisi itu', 'Wajib kembali sesuai jadwal kontrol'],
  abses: ['Kompres hangat di dalam mulut, bukan dingin di pipi', 'Kembali kalau bengkak menjalar ke mata atau leher'],
  obat: ['Minum pereda sakit bila perlu, maksimal 3× sehari', 'Kembali kontrol 3 hari lagi'],
};
const INSTR_BAD = ['Boleh langsung makan apa saja', 'Kumur air garam keras-keras tiap jam', 'Kompres es di pipi semalaman', 'Tidak perlu kembali kontrol', 'Sikat gigi itu sekeras mungkin'];
const EDU = { sehat: 'Periksa gigi rutin tiap 6 bulan', gusi: 'Sikat gigi 2× sehari dan pakai benang gigi', karies: 'Kurangi ngemil manis, sikat gigi sebelum tidur',
  pulp: 'Jangan menunda perawatan, saraf gigi bisa mati', abses: 'Bengkak jangan dipencet, segera kembali kalau menjalar', akar: 'Sisa akar perlu dicabut supaya tidak jadi sarang kuman',
  persist: 'Gigi tetap akan bergeser sendiri ke tempatnya', diabetes: 'Gula darah tinggi membuat gusi mudah meradang' };
const EDU_BAD = ['Sikat gigi sekeras mungkin supaya bersih', 'Pakai tusuk gigi logam tiap habis makan', 'Whitening membuat gigi lebih kuat'];
const DX_EDU = { sehat: 'sehat', ging: 'gusi', perio: 'gusi', perioB: 'gusi', karies: 'karies', kariesP: 'karies', pulpRev: 'pulp', pulpIrev: 'pulp', pulpDevital: 'pulp', pascaObat: 'pulp', perforasi: 'pulp',
  nekrosis: 'abses', abses: 'abses', sisaAkar: 'akar', akarPatah: 'akar', pascaCabut: 'akar', persist: 'persist' };
const eduKey = p => p.med === 'diabetes' && DX_EDU[p.dx] === 'gusi' ? 'diabetes' : DX_EDU[p.dx] || 'sehat';
const BIUS_INFO = { tanpa: ['Tanpa bius', 'Efek 0%', null], topikal: ['Topikal', 'Gel oles · 30%', 'topi'], infiltrasi: ['Infiltrasi', 'Suntik · 70%', 'syr'], blok: ['Blok', 'Suntik saraf · 85%', 'syr'] };
const MEDS = [['para', 'Parasetamol', 'pill'], ['ibu', 'Ibuprofen', 'box2'], ['amox', 'Amoksisilin', 'caps'], ['metro', 'Metronidazol', 'box3'], ['klin', 'Klindamisin', 'box4'], ['klor', 'Klorheksidin', 'bot']];
/** Baki alat per tindakan: [id, label, ikon TLD mini.js, terkunci]. */
const TRAY = {
  konsul: [['foto', 'Foto', 'foto', 'T2'], ['model', 'Model', 'model'], ['mir', 'Kaca', 'mir'], ['brosur', 'Brosur', 'brosur']],
  resep: [['pill', 'Pereda', 'pill'], ['caps', 'Antibio', 'caps'], ['card', 'Aturan', 'card'], ['bag', 'Pulang', 'bag']],
  gic: [['syr', 'Karpul', 'syr'], ['bur', 'Bor', 'bur'], ['cond', 'Kondis', 'cond'], ['dry', 'Udara', 'dry'], ['gic', 'GIC', 'gic'], ['art', 'Kertas', 'art']],
  scaling: [['scl', 'Scaler', 'scl'], ['ult', 'Ultra', 'ult', 'T2'], ['topi', 'Topikal', 'topi'], ['dry', 'Polish', 'dry'], ['brosur', 'Brosur', 'brosur']],
  cabut: [['cot', 'Kapas', 'cot'], ['syr', 'Karpul', 'syr'], ['elv', 'Elev.', 'elv'], ['frc', 'Tang', 'frc'], ['tamp', 'Tampon', 'tamp'], ['pill', 'Obat', 'pill']],
  cabutSusu: [['cot', 'Kapas', 'cot'], ['topi', 'Topikal', 'topi'], ['syr', 'Karpul', 'syr'], ['frc', 'Tang', 'frc'], ['tamp', 'Tampon', 'tamp'], ['pill', 'Obat', 'pill']],
  devital: [['syr', 'Karpul', 'syr'], ['bur', 'Bor', 'bur'], ['caoh', 'Pasta', 'caoh'], ['zoe', 'ZOE', 'zoe'], ['scl', 'Stoper', 'scl'], ['art', 'Kertas', 'art']],
  mumi: [['bur', 'Bor', 'bur'], ['scl', 'Sendok', 'scl'], ['caoh', 'Pasta', 'caoh'], ['cond', 'Kondis', 'cond'], ['gic', 'GIC', 'gic'], ['art', 'Kertas', 'art']],
  openRes: [['syr', 'Karpul', 'syr'], ['bur', 'Bor', 'bur'], ['irr', 'Irigasi', 'irr'], ['zoe', 'ZOE', 'zoe'], ['pill', 'Pereda', 'pill'], ['caps', 'Antibio', 'caps']],
};
const ITEM_NAME = { cot: 'kapas', cond: 'kondisioner', irr: 'bilas', etch: 'etsa', liner: 'pelapik', gic: 'GIC', varn: 'varnish', caoh: 'pasta', tamp: 'tampon', mir: 'cek soket', dry: 'udara' };

// ---- Utilitas gambar & masker ----
const idata = c => c.getContext('2d').getImageData(0, 0, c.width, c.height);
function cloneCv(c) { const [d, x] = cv(c.width, c.height); x.drawImage(c, 0, 0); return d; }
function pxDiff(A, B, k) { const o = k * 4; return Math.abs(A[o] - B[o]) + Math.abs(A[o + 1] - B[o + 1]) + Math.abs(A[o + 2] - B[o + 2]) + Math.abs(A[o + 3] - B[o + 3]) > 30; }
/** Ganti warna piksel bermasker. fn(i, j, [r,g,b]) → [r,g,b] atau null. */
function recolor(c, mask, fn) {
  const x = c.getContext('2d'), d = x.getImageData(0, 0, c.width, c.height), D = d.data;
  for (let k = 0; k < mask.length; k++) if (mask[k]) { const o = k * 4, col = fn(k % c.width, (k / c.width) | 0, [D[o], D[o + 1], D[o + 2]]); if (col) { D[o] = col[0]; D[o + 1] = col[1]; D[o + 2] = col[2]; D[o + 3] = 255; } }
  x.putImageData(d, 0, 0); return c;
}
function dilate(m, w, h, r) {
  const o = new Uint8Array(m.length);
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { if (!m[j * w + i]) continue; for (let b = -r; b <= r; b++) for (let a = -r; a <= r; a++) { const x = i + a, y = j + b; if (x >= 0 && y >= 0 && x < w && y < h && a * a + b * b <= r * r) o[y * w + x] = 1; } }
  return o;
}
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function fitText(s, maxW, bold) { if (hW(s, bold) <= maxW) return s; while (s.length > 1 && hW(s + '…', bold) > maxW) s = s.slice(0, -1); return s + '…'; }
const drawLo = (img, X, Y, k = 1) => hc.drawImage(img, Math.round(X * HI), Math.round(Y * HI), Math.round(img.width * k * HI), Math.round(img.height * k * HI));
// Bentuk gigi potongan: rumus sama dengan toothX() di mini.js (dipakai untuk masker GOSOK & memisahkan gigi saat dicabut).
const TXC = 85;
const txTop = d => { const a = Math.abs(d); return a <= 18 ? 12 + (18 - a) * .3 + 5 * Math.exp(-d * d / 7) : 12 + (a - 18) * (a - 18) / 9; };
const txHw = j => j < 32 ? 40 - (32 - j) * (32 - j) / 42 : Math.max(27, 40 - 13 * Math.pow((j - 32) / 40, 1.35));
const txGumTop = i => { const e = Math.max(0, Math.abs(i - TXC) - 30); return 63 + 14 * (1 - Math.exp(-e / 14)) - 1.6 * Math.exp(-(((e - 2) / 2.5) ** 2)); };
function txInside(o) {
  const two = (o.roots || 2) === 2, sp = o.spread ? 18 : 5, stump = o.crown === false;
  const rc = (s, t) => TXC + s * (two ? (13 + t * sp) : 0) + t * t * 4, rw = t => { const b = two ? 11 - 7.5 * t : 15 - 11 * t; return t < .88 ? b : b * Math.sqrt(Math.max(0, 1 - ((t - .88) / .12) ** 2)); };
  const inRoot = (i, j) => { if (j < 94 || j > 152) return false; const t = (j - 94) / 58; return Math.abs(i - rc(-1, t)) <= rw(t) || (two && Math.abs(i - rc(1, t)) <= rw(t)); };
  const crown = (i, j) => !stump && j >= txTop(i - TXC) && j <= 74 && Math.abs(i - TXC) <= txHw(j);
  const trunk = (i, j) => j > 72 && j <= 100 && Math.abs(i - TXC) <= 27 - (j - 72) * .1 && !(stump && j < 100 + 3 * hash(i >> 1, 3));
  return (i, j) => crown(i, j) || trunk(i, j) || (inRoot(i, j) && !(stump && j < 102));
}
const MGI = {};
// [2d-gigi2] Gigi potongan v2 (toothR di design/v3/src/mini.js, ACC user 2026-11-12): bentuk luar sama dengan toothX, tapi email & dentin tebal,
// kamar pulpa kecil & rendah (tanduk ±44, atap ±54, kubah dasar ±67). s = 2 → digambar asli 2× untuk zoom (HD tajam).
const toothX = (o, s) => toothR(o, s);
/** Koordinat piksel gambar skala s → koordinat gambar dasar (170×166). */
const bc = (p, s) => (p + .5) / s - .5;
/** Masker pulpa (kamar + saluran) dari selisih gigi biasa dan gigi {canals}. */
function pulpMask(s = 1) {
  const key = 'pulp' + s; if (MGI[key]) return MGI[key]; const a = toothX({}, s), P0 = idata(a).data, P1 = idata(toothX({ canals: true }, s)).data, n = a.width * a.height, m = new Uint8Array(n);
  for (let k = 0; k < n; k++) if (pxDiff(P0, P1, k)) m[k] = 1; return MGI[key] = m;
}
const CAV = (i, j) => mixA(hex('#2a1812'), hex('#4a2e22'), clamp((j - 14) / 30, 0, 1));
/** Bor karies (GIC): target = karies; 2 = pulpa (perforasi); 1 = tepi pulpa 3 px (ngilu). */
function setBor(deep, s = 1, prox = false) {
  const key = 'bor' + deep + s + (prox ? 'P' : ''); if (MGI[key]) return MGI[key];
  const base = toothX({ caries: prox ? 'prox' : deep ? 'deep' : 'shallow' }, s), w = base.width, h = base.height, A = idata(base).data, P0 = idata(toothX({}, s)).data, pulp = pulpMask(s), inT = txInside({});
  const n = w * h, target = new Uint8Array(n), bad = new Uint8Array(n), band = dilate(pulp, w, h, 3 * s);
  for (let k = 0; k < n; k++) { const i = k % w, j = (k / w) | 0; if (pulp[k]) bad[k] = 2; else if (band[k] && inT(bc(i, s), bc(j, s))) bad[k] = 1; if (!pulp[k] && pxDiff(A, P0, k)) target[k] = 1; }
  // [2d-gic2] karies diberi rona cokelat lebih terang supaya sisa karies kontras dengan rongga yang sudah dibor (playtest user 2026-11-12)
  const before = recolor(cloneCv(base), target, (i, j, c) => mixA(c, [150, 92, 44], .42));
  return MGI[key] = { before, after: recolor(cloneCv(base), target, (i, j) => CAV(i, j / s)), target, bad, ox: 12, oy: 36, k: 1, make2: s === 1 ? () => setBor(deep, 2, prox) : null };
}
/** Open akses (devitalisasi / drainase abses): target = corong akses sampai atap kamar pulpa; dinding jauh & dasar kamar = perforasi. */
function setAkses(s) {
  s = s === 2 ? 2 : 1; // dipanggil juga sebagai set: setAkses (argumen = job)
  const key = 'akses' + s; if (MGI[key]) return MGI[key];
  const base = toothX({ caries: 'deep' }, s), acc = toothX({ caries: 'deep', access: true }, s), w = base.width, h = base.height, A = idata(base).data, B = idata(acc).data, pulp = pulpMask(s), inT = txInside({});
  const n = w * h, target = new Uint8Array(n), bad = new Uint8Array(n);
  for (let k = 0; k < n; k++) {
    const i = k % w, j = (k / w) | 0, bi = bc(i, s), bj = bc(j, s); if (pxDiff(A, B, k)) { target[k] = 1; continue; }
    if (!inT(bi, bj) || pulp[k] || bj > 100) continue;
    bad[k] = Math.abs(bi - TXC) >= 24 || bj > 66 ? 2 : 1; // [2d-gigi2] dinding luar mahkota & kubah dasar kamar
  }
  // [2d-rev2] area yang harus dibor diberi arsir kuning supaya jelas (permintaan user 2026-11-12)
  const before = recolor(cloneCv(base), target, (i, j, c) => ((i + j) >> (s - 1)) % 4 < 2 ? mixA(c, [255, 216, 106], .6) : mixA(c, [255, 236, 160], .35));
  return MGI[key] = { before, after: acc, target, bad, ox: 12, oy: 36, k: 1, make2: s === 1 ? () => setAkses(2) : null };
}
/** Mumifikasi ①: buka tambalan sementara di jalur akses. */
function setBuka(s) {
  s = s === 2 ? 2 : 1; // dipanggil juga sebagai set: setBuka (argumen = job)
  const key = 'buka' + s; if (MGI[key]) return MGI[key];
  const after = toothX({ access: true }, s), P0 = idata(toothX({}, s)).data, A = idata(after).data, n = after.width * after.height, target = new Uint8Array(n);
  for (let k = 0; k < n; k++) if (pxDiff(A, P0, k)) target[k] = 1;
  const before = recolor(cloneCv(after), target, (i, j) => hash(i, j) < .18 ? hex('#cfa860') : hash(i + 7, j) < .1 ? hex('#f6e0a8') : hex('#e8c58a'));
  return MGI[key] = { before, after, target, bad: null, ox: 12, oy: 36, k: 1, make2: s === 1 ? () => setBuka(2) : null };
}
/** Mumifikasi ②: kerok pulpa mahkota di kamar pulpa; masuk saluran = terlalu dalam; dinding luar & kubah dasar = perforasi. */
function setPulpa(s) {
  s = s === 2 ? 2 : 1; // dipanggil juga sebagai set: setPulpa (argumen = job)
  const key = 'pulpa' + s; if (MGI[key]) return MGI[key];
  const before = cloneCv(toothX({ access: true }, s)), after = toothX({ access: true, canals: true }, s), w = before.width, A = idata(before).data, B = idata(after).data, n = w * before.height, inT = txInside({});
  const target = new Uint8Array(n), bad = new Uint8Array(n);
  for (let k = 0; k < n; k++) { const i = k % w, j = (k / w) | 0, bi = bc(i, s), bj = bc(j, s);
    if (pxDiff(A, B, k)) { if (bj < 68) target[k] = 1; else bad[k] = 1; } // [2d-gigi2] hanya pulpa mahkota sampai mulut saluran; sisi yang turun ke saluran = ngilu
    else if (inT(bi, bj) && bj <= 100 && (Math.abs(bi - TXC) >= 25 || (bj > 68 && Math.abs(bi - TXC) < 10))) bad[k] = 2; }
  // pulpa sudah mati setelah devitalisasi: warna kusam kecokelatan
  recolor(before, target.map((v, k) => v || bad[k] === 1 ? 1 : 0), (i, j, c) => mixA(c, [150, 108, 88], .6));
  return MGI[key] = { before, after, target, bad, ox: 12, oy: 36, k: 1, make2: s === 1 ? () => setPulpa(2) : null };
}
/** Gambar mumifikasi bertahap: 0 kamar kosong · 1 + pasta · 2 + pelapik · 3 + GIC di jalur akses. */
function mumiImg(stage) {
  const key = 'mumi' + stage; if (MGI[key]) return MGI[key];
  const c = cloneCv(toothX({ access: true, canals: true })), w = c.width, P0 = idata(toothX({})).data, A = idata(toothX({ access: true })).data, pulp = pulpMask(), n = w * c.height;
  const ch = new Uint8Array(n), ac = new Uint8Array(n);
  for (let k = 0; k < n; k++) { const j = (k / w) | 0; if (pulp[k] && j >= 40 && j < 72) ch[k] = 1; if (pxDiff(A, P0, k)) ac[k] = 1; }
  if (stage >= 1) recolor(c, ch, (i, j) => hash(i, j) < .2 ? hex('#e2e2d6') : hex('#f6f6f0'));
  if (stage >= 2) recolor(c, ch.map((v, k) => v && ((k / w) | 0) < 60 ? 1 : 0), (i, j) => hash(i, j) < .25 ? hex('#e8c860') : hex('#f4de88'));
  if (stage >= 3) recolor(c, ac, (i, j) => hash(i, j) < .18 ? hex('#dcd4c0') : hex('#efe9d8'));
  return MGI[key] = c;
}
/** Kapas di kavitas (tambalan sementara): ludah mengilap di lubang tampak atas (occlusalImg ×1.5). */
function setKapas() {
  if (MGI.kapas) return MGI.kapas;
  const after = occlusalImg(true, 0), A = idata(after).data, P0 = idata(occlusalImg(false, 0)).data, n = after.width * after.height, target = new Uint8Array(n);
  for (let k = 0; k < n; k++) if (pxDiff(A, P0, k)) target[k] = 1;
  const before = recolor(cloneCv(after), target, (i, j, c) => hash(i, j) < .1 ? [255, 255, 255] : mixA(c, [190, 228, 255], .5));
  return MGI.kapas = { before, after, target, bad: null, ox: 14, oy: 46, k: 1.5 };
}
/** Antiseptik di gusi sekitar gigi (potongan melintang). */
function setAntiseptik(o) {
  const key = 'anti' + JSON.stringify(o); if (MGI[key]) return MGI[key];
  const before = toothX(o), w = before.width, D = idata(before).data, n = w * before.height, target = new Uint8Array(n);
  for (let k = 0; k < n; k++) { const i = k % w, j = (k / w) | 0, r = D[k * 4], g = D[k * 4 + 1], a = Math.abs(i - TXC); if (D[k * 4 + 3] && j >= 56 && j <= 90 && a >= 26 && a <= 54 && r > 180 && r - g > 40) target[k] = 1; }
  return MGI[key] = { before, after: recolor(cloneCv(before), target, (i, j, c) => mixA(c, [196, 118, 50], .55)), target, bad: null, ox: 12, oy: 36, k: 1 };
}
/** Gigi dipisah dari soket supaya bisa digoyang & dicabut (fg = gigi, bg = soket + gusi + tulang). */
function cabutScene(o) {
  const key = 'cab' + JSON.stringify(o); if (MGI[key]) return MGI[key];
  const img = toothX(o), w = img.width, h = img.height, inT = txInside(o), m = new Uint8Array(w * h);
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) if (inT(i, j)) m[j * w + i] = 1;
  const md = dilate(m, w, h, 1), D = idata(img).data, [fg, fx] = cv(w, h), F = fx.createImageData(w, h), [tip, tx] = cv(w, h), T = tx.createImageData(w, h), bg = cloneCv(img), bx = bg.getContext('2d'), B = bx.getImageData(0, 0, w, h);
  for (let k = 0; k < w * h; k++) {
    if (!md[k] || !D[k * 4 + 3]) continue; const i = k % w, j = (k / w) | 0, o4 = k * 4, dst = j >= 132 ? T : F;
    for (let q = 0; q < 4; q++) dst.data[o4 + q] = D[o4 + q];
    if (j < txGumTop(i) - 1) B.data[o4 + 3] = 0; else { const c = mixA(mixA(hex('#b8505e'), hex('#3e0c14'), clamp((j - 62) / 70, 0, 1)), hex('#7a2030'), hash(i, j) * .35); B.data[o4] = c[0]; B.data[o4 + 1] = c[1]; B.data[o4 + 2] = c[2]; }
  }
  fx.putImageData(F, 0, 0); tx.putImageData(T, 0, 0); bx.putImageData(B, 0, 0);
  const [whole, wx] = cv(w, h); wx.drawImage(fg, 0, 0); wx.drawImage(tip, 0, 0);
  return MGI[key] = { fg: whole, top: fg, tip, bg };
}
/** Rongga mulut anak (tampak depan, seperti mgSusu di mini.js): lapisan belakang, lapisan gusi, gigi susu target terpisah. */
const BABY = [[84, 44, 22], [83, 70, 22], [82, 98, 20], [81, 124, 20], [71, 150, 20], [72, 176, 20], [73, 204, 22], [74, 230, 22], [75, 258, 22]];
function susuScene(t) {
  const key = 'susu' + t; if (MGI[key]) return MGI[key];
  const ti = Math.max(0, BABY.findIndex(b => b[0] === t)), TX = BABY[ti][1], TW = BABY[ti][2];
  const [l1, x1] = cv(480, 270);
  x1.save(); x1.beginPath(); x1.rect(7, 41, 324, 156); x1.clip();
  const g = x1.createRadialGradient(150, 90, 10, 150, 90, 190); g.addColorStop(0, '#62222c'); g.addColorStop(1, '#1a080c'); x1.fillStyle = g; x1.fillRect(7, 41, 324, 156);
  ellipse(x1, 150, 108, 150, 40, '#a84452'); ellipse(x1, 150, 104, 132, 30, '#c25a68'); ellipse(x1, 136, 98, 56, 8, '#d87a86');
  const perm = frontToothImg(TW + 2, 44, { lower: true }); dropShadow(x1, perm, TX - 1, 94, 1, 2, .35); x1.drawImage(perm, TX - 1, 94);
  BABY.forEach(([, X, w], i) => { if (i !== ti) frontTooth(x1, X, 114, w, 38, { lower: true, baby: true }); });
  x1.restore();
  const [l2, x2] = cv(480, 270); gumBand(x2, 7, 140, 324, 42, BABY.map(([, X, w]) => [X + w / 2, w]), false);
  for (let j = 0; j < 18; j++) R(x2, 7, 180 + j, 324, 1, mixH('#c85a6a', '#7a2a38', j / 17)); R(x2, 7, 180, 324, 1, '#f0a0ac'); R(x2, 7, 181, 324, 1, '#e07a88');
  const crop = c => { const [o, x] = cv(324, 156); x.drawImage(c, 7, 41, 324, 156, 0, 0, 324, 156); return o; };
  const gum = crop(l2), D = idata(gum).data, target = new Uint8Array(324 * 156), cx = TX + TW / 2 - 7;
  for (let j = 96; j < 128; j++) for (let i = 0; i < 324; i++) { const k = j * 324 + i, e = ((i - cx) / (TW * 1.05)) ** 2 + ((j - 106) / 15) ** 2; if (D[k * 4 + 3] > 0 && e < 1 + hash(i, j) * .25) target[k] = 1; }
  const after = recolor(cloneCv(gum), target, (i, j, c) => mixA(c, [196, 118, 50], .55));
  return MGI[key] = { l1: crop(l1), gum, after, target, tooth: frontToothImg(TW, 38, { lower: true, baby: true }), tx: TX - 7, tw: TW };
}
/** Empat panel scaling (seperti mgScaling di mini.js) dalam satu kanvas 318×152. kind: supra · sub · polish. */
function setScaling(kind) {
  const key = 'sc' + kind; if (MGI[key]) return MGI[key];
  const W = 318, H = 152, [base, bx] = cv(W, H), zones = new Uint8Array(W * H), panels = [];
  for (let k = 0; k < 4; k++) {
    const u = k < 2, [pc, px] = cv(151, 55), g = px.createLinearGradient(0, 0, 0, 55); g.addColorStop(0, '#3a1218'); g.addColorStop(1, '#1e080c'); px.fillStyle = g; px.fillRect(0, 0, 151, 55);
    const tx = []; for (let i = 0; i < 5; i++) { const tX = 5 + i * 29; tx.push([tX + 13, 26]); frontTooth(px, tX, u ? 7 : 3, 26, 46, { lower: !u }); }
    gumBand(px, 0, u ? 0 : 31, 151, 24, tx, u);
    const ox = 3 + (k % 2) * 161, oy = 3 + Math.floor(k / 2) * 78; bx.drawImage(pc, ox, oy); panels.push({ ox, oy, u, tx });
    for (let j = 0; j < 55; j++) for (let i = 0; i < 151; i++) zones[(oy + j) * W + ox + i] = k + 1;
  }
  const D = idata(base).data, n = W * H, gum = new Uint8Array(n), tooth = new Uint8Array(n);
  for (let q = 0; q < n; q++) { if (!zones[q]) continue; const r = D[q * 4], g = D[q * 4 + 1], b = D[q * 4 + 2]; if (r > 170 && r - g > 45) gum[q] = 1; else if (r > 185 && g > 170 && b > 135) tooth[q] = 1; }
  const target = new Uint8Array(n), bad = new Uint8Array(n), paint = [];
  // [2d-rev] hanya 4 gigi atas + 4 gigi bawah yang dikerjakan (2 gigi dekat garis tengah per panel), supaya scaling tidak terlalu lama (permintaan user 2026-11-12)
  const workTooth = (k, ti) => k % 2 === 0 ? ti >= 3 : ti <= 1, workCol = panels.map(P => { const a = new Uint8Array(W); P.tx.forEach(([tc], ti) => { if (workTooth(panels.indexOf(P), ti)) for (let x = P.ox + tc - 13; x <= P.ox + tc + 13; x++) a[x] = 1; }); return a; });
  const work = q => zones[q] && workCol[zones[q] - 1][q % W];
  // [2d-rev2] karang = gumpalan per gigi (2 gumpal), sekali klik lepas (permintaan user 2026-11-12)
  const chunk = new Int16Array(n), chunks = [];
  panels.forEach((P, k) => P.tx.forEach(([tc], ti) => { if (!workTooth(k, ti) || kind === 'polish') return;
    const dir = P.u ? 1 : -1, mAt = X => { let m = -1; for (let j = 0; j < 55; j++) { const q = (P.oy + j) * W + X; if (gum[q]) { if (P.u) m = P.oy + j; else if (m < 0) m = P.oy + j; } } return m; };
    if (kind === 'sub') for (let a = -9; a <= 9; a++) { const X = P.ox + tc + a, m = mAt(X); if (m < 0) continue; for (let d = 5; d <= 10; d++) { const q = (m - dir * d) * W + X; if (!gum[q]) continue; if (d === 5) { if (X % 2) paint.push([q, '#ffffff', 1]); } else bad[q] = 1; } }
    [-1, 1].forEach(h => {
      const c = { id: chunks.length + 1, x0: 1e9, y0: 1e9, x1: -1, y1: -1 }, cx = P.ox + tc + h * 6, sub = kind === 'sub';
      for (let X = cx - 6; X <= cx + 6; X++) {
        const m = mAt(X); if (m < 0) continue; const u = (X - cx) / 7, th = Math.round((sub ? 4 : 6.5) * Math.sqrt(Math.max(0, 1 - u * u)) + hash(X, k) * 1.2);
        for (let d = 1; d <= th; d++) {
          const Y = sub ? m - dir * d : m + dir * d, q = Y * W + X; if (sub ? !gum[q] : !tooth[q]) continue;
          target[q] = 1; chunk[q] = c.id; const edge = d === th || X === cx - 6 || X === cx + 6, hv = hash(X * 3, Y);
          paint.push([q, sub ? (edge ? '#3e3018' : hv < .5 ? '#5a4a26' : '#7a6430') : edge ? '#8a6a24' : hv < .3 ? '#f4dc80' : d === 1 ? '#c8a040' : '#e0bc50']);
          c.x0 = Math.min(c.x0, X); c.x1 = Math.max(c.x1, X); c.y0 = Math.min(c.y0, Y); c.y1 = Math.max(c.y1, Y);
        }
      }
      if (c.x1 >= 0) chunks.push(c);
    });
  }));
  if (kind === 'supra') for (let q = 0; q < n; q++) if (gum[q]) bad[q] = 1;
  if (kind === 'polish') for (let q = 0; q < n; q++) if (tooth[q] && work(q)) target[q] = 1;
  const before = cloneCv(base), after = cloneCv(base), Bd = idata(before), Ad = idata(after);
  paint.forEach(([q, col, both]) => { const c = hex(col); [Bd].concat(both ? [Ad] : []).forEach(d => { d.data[q * 4] = c[0]; d.data[q * 4 + 1] = c[1]; d.data[q * 4 + 2] = c[2]; d.data[q * 4 + 3] = 255; }); });
  if (kind === 'polish') for (let q = 0; q < n; q++) if (target[q]) { const c = mixA([Bd.data[q * 4], Bd.data[q * 4 + 1], Bd.data[q * 4 + 2]], [205, 182, 112], .32); Bd.data[q * 4] = c[0]; Bd.data[q * 4 + 1] = c[1]; Bd.data[q * 4 + 2] = c[2]; }
  before.getContext('2d').putImageData(Bd, 0, 0); after.getContext('2d').putImageData(Ad, 0, 0);
  return MGI[key] = { before, after, target, bad, ox: 10, oy: 43, k: 1, zones, chunk, chunks };
}
/** Gambar obat untuk rak (medBox mini.js). */
const medImgC = {}; function medImg(k) { if (!medImgC[k]) { const [c, x] = cv(50, 36); medBox(x, 0, 0, k); medImgC[k] = c; } return medImgC[k]; }
const faceC = {};
/** Wajah pasien (potongan kepala sprite char3) untuk kartu pasien. */
function faceImg(p, expr) {
  const key = (p.npc || JSON.stringify(p.L)) + p.body + expr; if (faceC[key]) return faceC[key];
  const im = char3({ ...(p.npc ? castBy(p.npc).s : { ...lookSpec(p.L), body: p.body }), dir: 'down', step: 0, expr }), d = idata(im).data; let top = 0;
  for (; top < im.height - 20; top++) { let any = false; for (let i = 0; i < im.width; i++) if (d[(top * im.width + i) * 4 + 3]) { any = true; break; } if (any) break; }
  const [c, x] = cv(20, 20); x.drawImage(im, 2, Math.max(0, top - 1), 20, 20, 0, 0, 20, 20); return faceC[key] = c;
}

// ---- Widget HD (gaya widget mini.js, digambar langsung di 960×540) ----
function hTrack(X, Y, W, H) { hR(X, Y, W, H, '#081312'); hR(X + .5, Y + .5, W - 1, H - 1, '#2a3f3c'); hR(X + .5, Y + .5, W - 1, 1.5, '#16282a'); hR(X + .5, Y + H - 1, W - 1, .5, '#3e5a56'); }
function hGrad(X, Y, W, H, c0, c1) { const g = hc.createLinearGradient(0, Y * HI, 0, (Y + H) * HI); g.addColorStop(0, c0); g.addColorStop(1, c1); hc.fillStyle = g; hc.fillRect(Math.round(X * HI), Math.round(Y * HI), Math.round(W * HI), Math.round(H * HI)); }
function hMeterTepat(X, Y, W, z0, zw, m, label, flash) {
  if (label) HT(fitText(label, W, true), X, Y - 11, MGC.lite, { bold: true, sh: DK });
  hTrack(X, Y, W, 14); const zx = X + 1 + (W - 2) * z0, zW = (W - 2) * zw;
  hGrad(zx, Y + 1, zW, 12, '#9af09a', '#2a8a3a'); hR(zx, Y + 1.5, zW, .5, '#d8ffd0'); hR(zx, Y + 1, .5, 12, '#1a5a24'); hR(zx + zW - .5, Y + 1, .5, 12, '#1a5a24');
  const mx = X + 1 + (W - 2) * m, mc = flash == null ? '#fff4c8' : flash ? '#b8ffb0' : '#ff9a9a';
  hR(mx - 2, Y - 3, 4, 20, '#3a2a08'); hR(mx - 1.5, Y - 2.5, 3, 19, mc); hR(mx - 1.5, Y - 2.5, 1, 19, '#ffffff'); hR(mx - 2.5, Y - 6, 5, 3, '#7a4a10'); hR(mx - 2, Y - 5.5, 4, 2, '#ffd86a');
}
function hMeterTahan(X, Y, W, f, za, zb, label, labels, lim) {
  if (label) HT(fitText(label, W, true), X, Y - 11, MGC.lite, { bold: true, sh: DK });
  hTrack(X, Y, W, 13); const ix = X + 1, iw = W - 2;
  hR(ix + iw * za, Y + 1, iw * (zb - za), 11, '#1e5070'); hR(ix + iw * za, Y + 1, iw * (zb - za), .5, '#5ab4f0');
  if (f > 0) { hGrad(ix, Y + 3, iw * Math.min(1, f), 7, '#9ad6ff', '#2a74b4'); hR(ix, Y + 3.5, iw * Math.min(1, f), .5, '#e0f6ff'); }
  if (lim) { const lx = ix + iw * zb; hR(lx - 1, Y - 3, 2.5, 19, '#5a3a04'); hR(lx - .5, Y - 2, 1, 17, '#ffd86a'); }
  if (labels) labels.forEach((t, i) => HT(t, [X, ix + iw * (za + zb) / 2, X + W][i], Y + 16, ['#5ab4f0', '#bfe8ff', '#ff9aa4'][i], { align: ['l', 'c', 'r'][i], sh: DK }));
}
function hProg(X, Y, W, f, label, col) { let lw = 0; if (label) lw = HT(label, X, Y, MGC.lite, { bold: true, sh: DK }) + 6; hBar(X + lw, Y - 1, W - lw, 9, f, col || '#f0a048'); }
function hLine(x0, y0, x1, y1, col) { const n = Math.max(1, Math.ceil(Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) * HI)); for (let s = 0; s <= n; s++) hR(x0 + (x1 - x0) * s / n, y0 + (y1 - y0) * s / n, .5, .5, col); }
/** Label penunjuk (tag mini.js) versi HD. */
function hTag(t, X, Y, col, lx, ly) {
  const w = hW(t) + 10, sx = X + (lx > X ? w : 0); hLine(sx, Y + 8, lx, ly + .5, 'rgba(0,0,0,.45)'); hLine(sx, Y + 7.5, lx, ly, col); hR(lx - 1, ly - 1, 2, 2, col);
  hBox(X, Y, w, 15, 'dark', { thin: true }); hR(X + 2, Y + 2, w - 4, .5, col); HT(t, X + 5, Y + 4.5, MGC.lite, { sh: DK });
}
/** Kartu PILIH HD. o: sel, hover, icon, dim, mark ('ok'|'bad'), lockLabel. */
function hCard(X, Y, W, H, title, desc, o = {}) {
  hBox(X, Y, W, H, o.sel ? 'gold' : 'paper', { thin: true }); if (o.hover && !o.dim && !o.sel) hGlow(X, Y, W, H);
  const tl = hWrap(title, W - 12, true), dl = desc ? hWrap(desc, W - 12) : [], ih = (o.icon ? 19 : 0) + tl.length * 10 + (dl.length ? dl.length * 9 + 2 : 0);
  let y = Y + Math.max(5, Math.round((H - ih) / 2));
  if (o.icon) { hc.drawImage(tool(o.icon), Math.round((X + W / 2 - 8) * HI), Math.round(y * HI), 32, 32); y += 19; }
  tl.forEach(l => { HT(l, X + W / 2, y, o.sel ? '#8a1a10' : MGC.ink, { bold: true, align: 'c' }); y += 10; }); if (dl.length) y += 2;
  dl.forEach(l => { if (y + 7 <= Y + H - 3) HT(l, X + W / 2, y, MGC.ink2, { align: 'c' }); y += 9; });
  if (o.dim) { hc.fillStyle = 'rgba(40,28,16,.42)'; hc.fillRect(Math.round((X + 2) * HI), Math.round((Y + 2) * HI), Math.round((W - 4) * HI), Math.round((H - 4) * HI)); }
  if (o.lockLabel) { const lw = hW(o.lockLabel, true) + 8; hR(X + W - lw - 4, Y + 4, lw, 11, '#7a1010'); HT(o.lockLabel, X + W - 8, Y + 6, '#ffffff', { bold: true, align: 'r' }); }
  if (o.mark) { const ok = o.mark === 'ok', bx = X + W - 14, by = Y + 4; hR(bx, by, 11, 11, ok ? '#1e5a24' : '#7a1010'); hR(bx + .5, by + .5, 10, 10, ok ? '#3a9a44' : '#d23a3a'); HT(ok ? '✓' : '×', bx + 5.5, by + 2, '#ffffff', { bold: true, align: 'c' }); }
}
function workGlow(cx, cy, r) { const g = hc.createRadialGradient(cx * HI, cy * HI, 8, cx * HI, cy * HI, r * HI); g.addColorStop(0, 'rgba(120,200,180,.22)'); g.addColorStop(1, 'rgba(120,200,180,0)'); hc.fillStyle = g; hc.fillRect(7 * HI, 41 * HI, 324 * HI, 156 * HI); }
let MG_BG = null;
const mgBgImg = () => { if (!MG_BG) { const [c, x] = cv(480, 270); mgBg(x); MG_BG = c; } return MG_BG; };

// ---- Gambar area kerja per tindakan ----
function artCross(job, o) { workGlow(95, 115, 120); drawLo(toothX(o), 12, 36); }
function artOcc(job, f) {
  workGlow(98, 118, 110); const o = occlusalImg(true, 0), o2 = occlusalImg(true, 1); drawLo(o, 14, 46, 1.5);
  if (f > 0) { hc.save(); hc.beginPath(); hc.rect(14 * HI, 46 * HI, 168 * HI, 147 * f * HI); hc.clip(); drawLo(o2, 14, 46, 1.5); hc.restore(); }
}
function artTable() { for (let j = 0; j < 156; j++) hR(7, 41 + j, 324, 1, mixH('#6a4428', '#3e2616', j / 156)); for (let j = 0; j < 156; j += 13) { hR(7, 41 + j, 324, .5, 'rgba(0,0,0,.18)'); hR(7, 41.5 + j, 324, .5, 'rgba(255,220,170,.08)'); } }
function artCabut(job) {
  const sc = cabutScene(job.cabutO), rs = job.rit; workGlow(95, 120, 120); drawLo(sc.bg, 12, 36);
  let ang = 0, lift = job.lux ? 1 : 0, alpha = 1;
  if (rs) { const f = rs.hits / rs.n, d = Math.max(0, 1 - (rs.t - (rs.hitT || 0)) * 3); ang = (rs.sway % 2 ? 1 : -1) * .045 * d * (1 + f); lift += f * 5; }
  if (job.out) { const t = game.t - job.out; lift += 5 + t * 150; alpha = Math.max(0, 1 - t * 3); }
  if (job.broken) drawLo(sc.tip, 12, 36);
  if (alpha > 0) { hc.save(); hc.globalAlpha *= alpha; hc.translate((12 + TXC) * HI, (36 + 74 - lift) * HI); hc.rotate(ang); hc.drawImage(job.broken ? sc.top : sc.fg, -TXC * HI, -74 * HI, sc.fg.width * HI, sc.fg.height * HI); hc.restore(); }
  if (job.out && game.t - job.out > .3) { hR(12 + TXC - 9, 36 + 71, 18, 3, '#8a1a24'); hR(12 + TXC - 6, 36 + 70, 12, 1.5, '#c8323e'); }
  if (job.gauze) drawLo(tool('tamp'), 12 + TXC - 16, 36 + 50, 2);
}
function artSusu(job, gum) {
  const sc = susuScene(job.t), rs = job.rit; drawLo(sc.l1, 7, 41);
  let ang = 0, lift = 0, alpha = 1;
  if (rs) { const f = rs.hits / rs.n, d = Math.max(0, 1 - (rs.t - (rs.hitT || 0)) * 3); ang = (rs.sway % 2 ? 1 : -1) * .07 * d * (1 + f) - .12 * f; lift = f * 4; }
  if (job.out) { const t = game.t - job.out; lift += 4 + t * 140; alpha = Math.max(0, 1 - t * 3); }
  if (alpha > 0) { const px = 7 + sc.tx + sc.tw / 2, py = 41 + 73 + 38; hc.save(); hc.globalAlpha *= alpha; hc.translate(px * HI, (py - lift) * HI); hc.rotate(ang); hc.drawImage(sc.tooth, -sc.tw / 2 * HI, -38 * HI, sc.tw * HI, 38 * HI); hc.restore(); }
  if (gum !== false) drawLo(job.gumImg || sc.gum, 7, 41);
  if (job.out && game.t - job.out > .3) { const cx = 7 + sc.tx + sc.tw / 2; hR(cx - 6, 41 + 100, 12, 3, '#8a1a24'); hR(cx - 4, 41 + 100, 8, 1.5, '#c8323e'); }
  if (job.gauze) drawLo(tool('tamp'), 7 + sc.tx + sc.tw / 2 - 16, 41 + 88, 2);
}
const PANEL_NAME = ['Atas kanan', 'Atas kiri', 'Bawah kanan', 'Bawah kiri'];
function artScaling(job, st, img) {
  const g = st && st.g, m = input.mouse;
  for (let k = 0; k < 4; k++) {
    const X = 10 + (k % 2) * 161, Y = 43 + Math.floor(k / 2) * 78, act = !!g && inRect(m.x, m.y, [X, Y, 157, 74]);
    hBox(X, Y, 157, 74, act ? 'gold' : 'dark', { thin: true, shadow: false });
    const f = g && g.zt[k + 1] ? 1 - g.zl[k + 1] / g.zt[k + 1] : 1;
    HT(PANEL_NAME[k], X + 6, Y + 61.5, act ? '#5a2a04' : MGC.lite, { sh: act ? null : DK, bold: act }); hBar(X + 86, Y + 60, 66, 9, f, f >= 1 ? '#6ad46a' : '#f0a048');
  }
  if (img) drawLo(img, 10, 43);
}
function drawRak(job, st, s) {
  hBox(10, 44, 198, 150, 'paper', { thin: true }); HT('Rak obat', 16, 49, MGC.ink, { bold: true }); hv = hoverId();
  MEDS.forEach(([id, nm, k], i) => {
    const SX = 14 + (i % 2) * 96, SY = 60 + Math.floor(i / 2) * 44, can = s.can(id), sel = st.sel.includes(id);
    if (sel) { hR(SX, SY - 1, 92, 41, 'rgba(255,216,106,.55)'); hR(SX, SY - 1, 92, .5, '#ffd86a'); hR(SX, SY + 39.5, 92, .5, '#c8902a'); } else if (can && hv === 'mgk' + i) hR(SX, SY - 1, 92, 41, 'rgba(255,255,255,.25)');
    drawLo(medImg(k), SX + 21, SY); HT(nm, SX + 46, SY + 31, can ? '#4a230e' : '#a08060', { align: 'c', bold: sel });
    if (!can) { hc.fillStyle = 'rgba(120,90,60,.28)'; hc.fillRect(Math.round(SX * HI), Math.round((SY - 1) * HI), 92 * HI, 41 * HI); }
    if (st.mark != null && sel) { const ok = st.good; hR(SX + 80, SY, 11, 11, ok ? '#1e5a24' : '#7a1010'); hR(SX + 80.5, SY + .5, 10, 10, ok ? '#3a9a44' : '#d23a3a'); HT(ok ? '✓' : '×', SX + 85.5, SY + 2, '#ffffff', { bold: true, align: 'c' }); }
    hR(14, SY + 40, 188, 2.5, '#8a5428'); hR(14, SY + 40, 188, .5, '#d8a060'); hR(14, SY + 42.5, 188, 1, 'rgba(0,0,0,.18)');
    clickable(SX, SY - 1, 92, 41, () => s.pick(job, st, id), 'mgk' + i);
  });
  // kertas resep
  hR(214, 44, 112, 150, '#c9c2a6'); hR(214.5, 44.5, 111, 149, '#fffdf6'); for (let j = 0; j < 9; j++) hR(219, 82 + j * 12, 102, .5, '#dfe8f2');
  HT(fitText('drg. ' + S.name, 100, true), 220, 50, '#2a4a7a', { bold: true }); HT('Praktik Rimbasari', 220, 61, '#6a7a8a');
  const lines = []; const rx = job.rx || {};
  if (rx.pereda !== undefined) lines.push(rx.pereda ? MEDS.find(m => m[0] === rx.pereda)[1] : '(tanpa pereda)');
  if (rx.anti) lines.push(...(rx.anti.length ? rx.anti.map(a => MEDS.find(m => m[0] === a)[1]) : ['(tanpa antibiotik)']));
  if (st.mark == null && s.kind === 'anti') st.sel.forEach(a => lines.push(MEDS.find(m => m[0] === a)[1] + '?'));
  lines.slice(0, 6).forEach((l, i) => { HT('R/', 220, 76 + i * 12, '#2a2a36', { bold: true }); HT(fitText(l, 82), 236, 76 + i * 12, l[0] === '(' ? '#8a96a2' : '#2a2a36'); });
  HT(fitText('Pro: ' + job.p.name, 100), 220, 166, '#2a2a36'); const km = knownMed(job.p);
  if (km.length) HT(fitText(km.map(m => MED[m].name).join(', '), 100, true), 220, 178, MGC.red, { bold: true });
}
let hv = null;

// ---- Mesin langkah ----
const fin = st => { if (st.doneAt == null) st.doneAt = st.t; };
const inWork = m => !!m && inRect(m.x, m.y, [7, 41, 324, 156]);
const mgPress = () => hit('act') || hit('ok') || inWork(input.click);
const mgZone = (job, z) => clamp(z * job.zoneMul * (job.herb === 'kunyit' ? CFG.GARDEN.MG.ZONE : 1), CFG.MG.ZONE_MIN, CFG.MG.ZONE_MAX); // [2g] Kunyit
const info = o => ({ name: o.name, instr: o.instr, warn: o.warn, tool: o.tool, key: o.key, cursor: o.cursor });
function mgErr(job, sev, text) { if (job.errors.some(e => e.text === text)) return; job.errors.push({ sev, text }); }
/** Bar Sakit naik (GDD minigame/00 §4): S_dasar × (1 − B_bius) × anak 1.3. Penuh → tindakan berhenti. */
function mgHurt(job, base) {
  if (!base || job.phase !== 'play') return;
  const v = base * (1 - job.B) * (job.kid ? CFG.MG.KID_PAIN * nikahKidPain() : 1) /* [3a-5] Wulan */ * (1 - CFG.STAFF.PAIN * (job.nurse || 0)) * herbPainMul(job), p0 = job.pain; // [2g] Cengkeh / Lidah Buaya // [2e] Perawat: sakit −20% × efek
  job.pain = Math.min(100, job.pain + v); job.painMax = Math.max(job.painMax, job.pain);
  if (Math.floor(job.pain / 12) > Math.floor(p0 / 12) && game.t - (job.painSfx || 0) > .5) { job.painSfx = game.t; sfx('pain_up'); }
  if (job.pain >= 100) mgAbort(job, 'sakit');
}
function biusFactor(job, kind) {
  const M = CFG.MG; let b = M.BIUS[kind] || 0;
  if (kind === 'topikal' && !(job.dx === 'persist' || job.tx === 'scaling')) b = 0; // topikal hanya untuk gigi susu goyang & karang bawah gusi
  if (kind === 'infiltrasi' && job.lower && job.back && !job.prim) b = M.INFIL_LOWER_BACK;
  if (job.dx === 'abses') b *= M.ABSES_BIUS;
  return b;
}
function leafOf(s, st) {
  if (s.subs) return leafOf(s.subs[Math.min(st.k, s.subs.length - 1)], st.sub);
  if (s.leaf) { const L = s.leaf(st); if (L) return leafOf(L, st.sub); }
  return { s, st };
}
function runStep(job, s, st, dt) {
  st.t += dt;
  if (st.doneAt == null) {
    if (s.subs) {
      const sub = s.subs[st.k];
      if (runStep(job, sub, st.sub, dt)) { if (sub.tool && !job.used.includes(sub.tool)) job.used.push(sub.tool); st.k++; if (st.k >= s.subs.length) st.doneAt = st.t; else { st.sub = { t: 0 }; if (s.subs[st.k].enter) s.subs[st.k].enter(job, st.sub); } }
    } else if (s.update) s.update(job, st, dt);
  }
  return st.doneAt != null && st.t - st.doneAt >= (s.hold != null ? s.hold : .4);
}
function mgEnterStep(job) { const s = job.steps[job.i]; job.st = { t: 0 }; if (s.enter) s.enter(job, job.st); }
function mgNext(job) {
  const s = job.steps[job.i]; if (s.tool && !job.used.includes(s.tool)) job.used.push(s.tool);
  if (job.i === 0) herbConsume(job); // [2g] herba terpakai saat langkah 1 selesai
  if (job.i + 1 >= job.steps.length) return mgResult(job);
  job.i++; mgEnterStep(job);
}
/** Ganti sisa langkah (perforasi → tambalan sementara, akar patah → tampon). */
function mgDetour(job, steps) { job.payFrac = job.i / job.steps.length; job.steps = job.steps.slice(0, job.i + 1).concat(steps); }
function mgAbort(job, why) { if (job.phase !== 'play') return; job.abort = why; job.payFrac = job.i / job.steps.length; mgResult(job); }
/** Rangkaian sub-langkah dalam satu pil langkah. */
function stSeq(name, subs) { subs = subs.filter(Boolean); return { name, subs, hold: 0, enter(job, st) { st.k = 0; st.sub = { t: 0 }; if (subs[0].enter) subs[0].enter(job, st.sub); } }; }

/** PILIH: kartu. o.cards(job) → [{ t, d, icon, ok, sev, err, lock, lockLabel }]; o.n jumlah pilihan; o.judge(job, picks) opsional. */
function stPick(o) {
  const s = { code: 'PILIH', ...info(o),
    enter(job, st) { st.cards = o.cards(job); st.sel = []; st.mark = false; if (o.enter) o.enter(job, st); },
    update(job, st) { if (st.mark && st.t - st.markT > .55) fin(st); },
    pick(job, st, i) {
      const c = st.cards[i]; if (st.mark || !c || st.doneAt != null) return; if (c.lock) { sfx('ui_deny'); toast(c.lock, 'bad'); return; }
      const n = o.n || 1;
      if (st.sel.includes(i)) { st.sel = st.sel.filter(x => x !== i); sfx('ui_tick', -1); return; }
      st.sel.push(i); sfx('ui_click'); if (st.sel.length < n) return;
      st.mark = true; st.markT = st.t; const picks = st.sel.map(k => st.cards[k]);
      if (o.judge) o.judge(job, picks, st); else picks.forEach(c2 => { if (c2.ok === false && c2.err) { mgErr(job, c2.sev || 'minor', c2.err); job.misses++; } });
      if (!o.quiet) sfx(picks.every(c2 => c2.ok !== false) ? 'mg_hit' : 'mg_miss', 4);
      if (o.after) o.after(job, picks, st);
    },
    auto(job, st, good) {
      const n = o.n || 1, best = st.cards.map((c, i) => [c, i]).filter(([c]) => !c.lock && (good ? c.ok !== false : c.ok === false));
      best.slice(0, n).forEach(([, i]) => s.pick(job, st, i));
      while (!st.mark) { const i = st.cards.findIndex((c, k) => !c.lock && !st.sel.includes(k)); if (i < 0) break; s.pick(job, st, i); }
    },
    buttons: o.skip ? (job, st) => [{ label: 'Lewati', fn: () => { if (st.mark || st.doneAt != null) return; if (o.skip !== true) { mgErr(job, 'minor', o.skip); job.misses++; } st.skipped = true; fin(st); } }] : null,
    draw(job, st) {
      if (o.art) o.art(job, st);
      const cards = st.cards, n = cards.length, cols = o.cols || Math.min(n, 3), rows = Math.ceil(n / cols), X0 = o.x || 13, W = o.w || 312, gap = 6, cw = (W - gap * (cols - 1)) / cols;
      let y = o.y || 47; const title = o.title ? o.title(job, st) : null;
      if (title) { hWrap(title, W).forEach(l => { HT(l, X0, y, MGC.gold, { bold: true, sh: DK }); y += 11; }); y += 3; }
      const ch = Math.min(o.h || 999, (194 - y - gap * (rows - 1)) / rows), hov = hoverId();
      cards.forEach((c, i) => {
        const X = X0 + (i % cols) * (cw + gap), Y = y + Math.floor(i / cols) * (ch + gap), sel = st.sel.includes(i);
        hCard(X, Y, cw, ch, c.t, c.d, { sel, icon: c.icon, hover: hov === 'mgc' + i, dim: !!c.lock || (st.mark && !sel), lockLabel: c.lockLabel, mark: st.mark && sel && !o.quiet ? (c.ok === false ? 'bad' : 'ok') : null });
        clickable(X, Y, cw, ch, () => s.pick(job, st, i), 'mgc' + i);
      });
    } };
  return s;
}
/** TEPAT: penanda bolak-balik, tekan saat di zona hijau. */
function stTepat(o) {
  const s = { code: 'TEPAT', ...info(o),
    enter(job, st) { st.k = 0; st.miss = 0; st.m = 0; st.dir = 1; st.zw = mgZone(job, o.z); st.z0 = .12 + Math.random() * (.76 - st.zw); },
    update(job, st, dt) {
      st.m += st.dir * (o.speed || CFG.MG.TEPAT_SPEED) * dt; if (st.m > 1) { st.m = 2 - st.m; st.dir = -1; } else if (st.m < 0) { st.m = -st.m; st.dir = 1; }
      if (mgPress()) s.press(job, st, st.m >= st.z0 && st.m <= st.z0 + st.zw);
    },
    press(job, st, ok) {
      if (st.doneAt != null) return; st.flash = { ok, t: st.t };
      if (ok) { st.k++; sfx('mg_hit', st.k); if (o.sfx) sfx(o.sfx); } else { st.miss++; job.misses++; sfx('mg_miss'); mgHurt(job, o.pain || 0); if (!o.untilHit) st.k++; }
      if (st.k >= o.n) { if (o.end) o.end(job, st.miss, st); fin(st); } else st.z0 = .12 + Math.random() * (.76 - st.zw);
    },
    auto(job, st, good) { let g = good; while (st.doneAt == null) { s.press(job, st, g); if (o.untilHit) g = true; } },
    draw(job, st) {
      if (o.art) o.art(job, st); const [X, Y, W] = o.at || [196, 176, 128];
      hMeterTepat(X, Y, W, st.z0, st.zw, st.m, (o.label || '') + (o.n > 1 ? ' ' + Math.min(st.k + 1, o.n) + '/' + o.n : ''), st.flash && st.t - st.flash.t < .3 ? st.flash.ok : null);
    } };
  return s;
}
/** TAHAN: tahan klik/Spasi, isi naik; lepas di zona biru. o.auto: tahan sampai penuh. */
function stTahan(o) {
  const s = { code: 'TAHAN', ...info(o),
    enter(job, st) { st.f = 0; st.hold = false; st.armed = false; st.za = o.auto ? 1 : o.za; st.zb = o.auto ? 1 : Math.min(.97, o.za + mgZone(job, o.z)); st.rate = (o.rate || CFG.MG.TAHAN_RATE) * (o.rateMul ? o.rateMul(job) : 1); },
    update(job, st, dt) {
      if (mgPress()) st.armed = true;
      const down = st.armed && (input.mdown || held('act') || held('ok'));
      if (down) {
        if (!st.hold && o.sfxStart) sfx(o.sfxStart); st.hold = true; st.f += st.rate * dt;
        if (o.sfxLoop && st.t - (st.ls || 0) > .25) { st.ls = st.t; sfx(o.sfxLoop); }
        if (o.auto && st.f >= 1) { st.f = 1; s.done(job, st, true); } else if (!o.auto && st.f > st.zb) s.done(job, st, false);
      } else if (st.hold) { st.hold = false; st.armed = false; if (st.f >= st.za) s.done(job, st, true); else { st.early = st.t; st.f = 0; sfx('ui_deny'); } }
    },
    done(job, st, ok) { if (st.doneAt != null) return; st.ok = ok; if (ok) sfx('mg_hit', 3); else { sfx('mg_miss'); job.misses++; if (o.over) o.over(job, st); } if (o.end) o.end(job, ok, st); fin(st); },
    auto(job, st, good) { st.f = good ? (st.za + st.zb) / 2 : Math.min(1, st.zb + .02); s.done(job, st, good || !!o.auto); },
    draw(job, st) {
      if (o.art) o.art(job, st); const [X, Y, W] = o.at || [196, 176, 128];
      hMeterTahan(X, Y, W, st.f, st.za, st.zb, o.label, o.labels, !o.auto);
      if (st.early && st.t - st.early < 1.4) HT(o.earlyText || 'Terlalu cepat dilepas. Ulangi.', X, Y - 24, '#ffd8a0', { sh: DK, bold: true });
    } };
  return s;
}
/** URUT: klik bahan di baki sesuai urutan. o.items [[id, label, ikon]], o.seq(job), o.bad {id: kesalahan}, o.extra (diterima tanpa efek). */
function stUrut(o) {
  const s = { code: 'URUT', ...info(o), urut: true,
    enter(job, st) { st.seq = o.seq(job); st.idx = 0; st.got = []; st.flash = null; },
    items: (job, st) => o.items.map(([id, lb, ic]) => ({ id, lb, ic: ic || id, done: st.got.includes(id) && !st.seq.slice(st.idx).includes(id), bad: st.flash && st.flash.id === id && st.t - st.flash.t < .5 })),
    pick(job, st, id) {
      if (st.doneAt != null) return; const exp = st.seq[st.idx];
      if (id === exp) { st.got.push(id); st.idx++; sfx((o.sfx && o.sfx[id]) || 'mg_hit', st.idx + 2); if (o.on) o.on(job, id, st); }
      else {
        const pos = st.seq.indexOf(id, st.idx);
        if (pos > st.idx) { const miss = st.seq.slice(st.idx, pos); mgErr(job, 'minor', o.skipText ? o.skipText(miss) : 'Langkah terlewat: ' + miss.map(m => ITEM_NAME[m] || m).join(', ')); job.misses++; miss.forEach(() => st.got.push('x')); st.got.push(id); st.idx = pos + 1; sfx('mg_miss'); if (o.on) o.on(job, id, st); }
        else if (o.bad && o.bad[id]) { mgErr(job, 'minor', o.bad[id]); job.misses++; st.flash = { id, t: st.t }; sfx('mg_miss'); }
        else if (o.extra && o.extra.includes(id) && !st.got.includes(id)) { st.got.push(id); sfx('ui_tick'); if (o.on) o.on(job, id, st); }
        else { st.flash = { id, t: st.t }; sfx('ui_deny'); }
      }
      if (st.idx >= st.seq.length) fin(st);
    },
    auto(job, st, good) { if (good) st.seq.slice(st.idx).forEach(id => s.pick(job, st, id)); else { const b = o.bad && Object.keys(o.bad)[0]; if (b) s.pick(job, st, b); st.seq.slice(st.idx).forEach(id => s.pick(job, st, id)); } },
    buttons: o.skip ? (job, st) => [{ label: 'Lewati', fn: () => { if (st.doneAt != null) return; mgErr(job, 'minor', o.skip); job.misses++; fin(st); } }] : null,
    draw(job, st) {
      if (o.art) o.art(job, st); const [X, Y] = o.at || [200, 150], gap = 40;
      HT(o.label || 'Urutan kerja', X - 4, Y - 14, MGC.gold, { bold: true, sh: DK });
      st.seq.forEach((id, i) => {
        const sx = X + i * gap, g = st.got[i], cur = i === st.idx;
        hBox(sx, Y, 26, 24, g && g !== 'x' ? 'gold' : cur ? 'paper' : 'dark', { thin: true }); if (cur && st.doneAt == null) hGlow(sx, Y, 26, 24);
        if (g && g !== 'x') hc.drawImage(tool(g), Math.round((sx + 5) * HI), Math.round((Y + 4) * HI), 32, 32);
        else if (g === 'x') HT('×', sx + 13, Y + 8, MGC.red, { bold: true, align: 'c' }); else HT('?', sx + 13, Y + 8, cur ? MGC.ink2 : '#7a9a94', { bold: true, align: 'c' });
        hR(sx - 2, Y - 3, 8, 8, '#081312'); hR(sx - 1.5, Y - 2.5, 7, 7, cur ? '#ffd86a' : '#e8d0a0'); HT(String(i + 1), sx + 2, Y - 1.5, '#3a1e0c', { bold: true, align: 'c' });
        if (i < st.seq.length - 1) HT('▶', sx + 30, Y + 8, MGC.lite2, { sh: DK });
      });
    } };
  return s;
}
/** RITME: tekan A/D (klik kiri/kanan) saat ketukan melewati garis kuning. 3 ketukan merah berturut-turut → o.onBreak. */
function stRitme(o) {
  const s = { code: 'RITME', ...info(o),
    enter(job, st) {
      st.time = 0; st.hits = 0; st.red = 0; st.missRun = 0; st.notes = []; st.sp = (o.space || .8) * (o.spaceMul ? o.spaceMul(job) : 1);
      st.win = Math.max(.07, mgZone(job, o.z) * st.sp * .5); st.n = typeof o.n === 'function' ? o.n(job) : o.n; st.sway = 0; job.rit = st;
      for (let i = 0; i < st.n; i++) st.notes.push({ t: 1.4 + i * st.sp, k: i % 2 ? 'D' : 'A', s: 'p' }); st.last = 1.4 + (st.n - 1) * st.sp;
    },
    update(job, st, dt) {
      st.time += dt;
      if (hit('left') || inWork(input.click)) s.tap(job, st, 'A'); if (hit('right') || inWork(input.rclick)) s.tap(job, st, 'D');
      st.notes.forEach(n => { if (n.s === 'p' && st.time > n.t + st.win && st.doneAt == null) {
        n.s = 'miss'; job.misses++; st.missRun++; sfx('mg_miss'); st.last = Math.max(st.last, st.time + .5) + st.sp; st.notes.push({ t: st.last, k: n.k, s: 'p' });
        if (st.missRun >= 3) { st.missRun = 0; mgErr(job, 'minor', 'Ketukan terlewat 3 kali'); } } });
    },
    tap(job, st, k) {
      if (st.doneAt != null || job.phase !== 'play') return;
      const n = st.notes.find(q => q.s === 'p' && q.k === k && Math.abs(q.t - st.time) <= st.win);
      if (n) { n.s = 'ok'; st.hits++; st.red = 0; st.missRun = 0; st.sway++; st.hitT = st.t; sfx('wiggle'); sfx('mg_hit', st.hits); if (st.hits >= st.n) { if (o.done) o.done(job, st); fin(st); } }
      else { st.red++; job.misses++; st.redT = st.t; sfx('wiggle', true); mgHurt(job, o.pain || 0); if (st.red >= CFG.MG.RED_STREAK) { st.red = 0; if (o.onBreak) o.onBreak(job, st); } }
    },
    auto(job, st, good) {
      if (good) { while (st.doneAt == null) { const n = st.notes.find(q => q.s === 'p'); st.time = n.t; s.tap(job, st, n.k); } }
      else for (let i = 0; i < CFG.MG.RED_STREAK && st.doneAt == null && job.phase === 'play'; i++) s.tap(job, st, 'X');
    },
    draw(job, st) {
      if (o.art) o.art(job, st); const [X, Y, W] = o.lane || [44, 176, 280], hx = X + 30, pps = 60;
      hTrack(X, Y, W, 24); hR(X + 1, Y + 11.5, W - 2, .5, '#3e5a56');
      hc.fillStyle = 'rgba(255,216,106,.16)'; hc.fillRect(Math.round((hx - st.win * pps) * HI), Math.round((Y + 1) * HI), Math.round(st.win * pps * 2 * HI), 22 * HI);
      hc.save(); hc.beginPath(); hc.rect((X + 1) * HI, Y * HI, (W - 2) * HI, 24 * HI); hc.clip();
      st.notes.forEach(n => {
        const nx = hx + (n.t - st.time) * pps - 6; if (nx < X - 14 || nx > X + W) return; const ny = Y + (n.k === 'A' ? 2.5 : 13), col = n.s === 'ok' ? '#6ad46a' : n.s === 'miss' ? '#7a8a88' : '#ff86b8';
        hR(nx + 1, ny + 1, 12, 9, 'rgba(0,0,0,.4)'); hR(nx - .5, ny - .5, 13, 10, '#081312'); hGrad(nx, ny, 12, 9, mixH(col, '#ffffff', .3), mixH(col, '#000000', .25)); HT(n.k, nx + 6, ny + 1.5, '#ffffff', { bold: true, align: 'c' });
      });
      hc.restore();
      hR(hx - 1, Y - 3, 2.5, 30, '#5a3a04'); hR(hx - .5, Y - 2, 1, 28, '#ffd86a');
      HT('A', X - 8, Y + 3, MG_IN.RITME, { bold: true, sh: DK }); HT('D', X - 8, Y + 13.5, MG_IN.RITME, { bold: true, sh: DK });
      HT(st.hits + '/' + st.n, X + W, Y - 11, MGC.lite, { bold: true, sh: DK, align: 'r' }); if (o.label) HT(o.label, X, Y - 11, MGC.lite, { bold: true, sh: DK });
      if (st.redT && st.t - st.redT < .3) { hc.fillStyle = 'rgba(230,56,62,.35)'; hc.fillRect(Math.round(X * HI), Math.round(Y * HI), Math.round(W * HI), 24 * HI); }
    } };
  return s;
}
/** GOSOK: tahan klik & geser; piksel target dikikis menjadi gambar sesudah. bad: 1 = tepi (sakit), 2 = bahaya (kesalahan berat). */
function gosokInit(st, set, r, speed) {
  const w = set.before.width, h = set.before.height, c = cloneCv(set.before), x = c.getContext('2d');
  const g = st.g = { c, x, w, h, ox: set.ox, oy: set.oy, k: set.k || 1, cur: x.getImageData(0, 0, w, h), aft: idata(set.after), target: set.target, bad: set.bad, zones: set.zones, hp: new Float32Array(w * h).fill(1), total: 0, left: 0, r, speed, zt: [0, 0, 0, 0, 0], zl: [0, 0, 0, 0, 0] };
  for (let k = 0; k < w * h; k++) if (set.target[k]) { g.total++; if (g.zones) g.zt[g.zones[k]]++; }
  g.left = g.total; g.zl = g.zt.slice();
}
function gosokStep(st, dt) {
  const g = st.g, m = input.mouse, down = input.mdown && inWork(m);
  if (!down) { g.prevBad = 0; return { removed: 0, bad: 0 }; }
  const cx = Math.floor((m.x - g.ox) / g.k), cy = Math.floor((m.y - g.oy) / g.k), r = g.r; let rem = 0;
  for (let j = Math.max(0, cy - r); j <= Math.min(g.h - 1, cy + r); j++) for (let i = Math.max(0, cx - r); i <= Math.min(g.w - 1, cx + r); i++) {
    if ((i - cx) ** 2 + (j - cy) ** 2 > r * r) continue; const k = j * g.w + i; if (!g.target[k] || g.hp[k] <= 0) continue;
    g.hp[k] -= dt * g.speed; if (g.hp[k] <= 0) { const o = k * 4; for (let q = 0; q < 4; q++) g.cur.data[o + q] = g.aft.data[o + q]; g.left--; if (g.core && g.core[k]) g.coreLeft--; if (g.zones) g.zl[g.zones[k]]--; rem++; }
  }
  if (rem) g.x.putImageData(g.cur, 0, 0);
  const b = cx >= 0 && cy >= 0 && cx < g.w && cy < g.h && g.bad ? g.bad[cy * g.w + cx] : 0, ent = b && b !== g.prevBad ? b : 0; g.prevBad = b;
  return { removed: rem, bad: ent, touching: rem > 0 || g.hp[(cy * g.w + cx)] < 1 };
}
const gosokProg = st => { const g = st.g; if (g.core) return g.coreTotal ? 1 - g.coreLeft / g.coreTotal : 1; return g.total ? 1 - g.left / g.total : 1; };
/** [2d-gic2] Inti target untuk skor bersih: tanpa tepi tipis (SCORE_EDGE) dan tanpa sisa dekat pulpa (SCORE_PULP). */
function gosokCore(g) {
  const M = CFG.MG, sc = g.zf || 1, n = g.target.length, notT = new Uint8Array(n), pul = new Uint8Array(n);
  for (let k = 0; k < n; k++) { if (!g.target[k]) notT[k] = 1; if (g.bad && g.bad[k] === 2) pul[k] = 1; }
  const e1 = dilate(notT, g.w, g.h, M.SCORE_EDGE * sc), e2 = dilate(pul, g.w, g.h, (M.SCORE_PULP + M.PULP_MARGIN) * sc);
  g.core = new Uint8Array(n); g.coreTotal = 0; for (let k = 0; k < n; k++) if (g.target[k] && !e1[k] && !e2[k]) { g.core[k] = 1; g.coreTotal++; }
  g.coreLeft = g.coreTotal;
}
function gosokClear(st) { const g = st.g; for (let k = 0; k < g.target.length; k++) if (g.target[k] && g.hp[k] > 0) { g.hp[k] = 0; const q = k * 4; for (let c = 0; c < 4; c++) g.cur.data[q + c] = g.aft.data[q + c]; g.left--; if (g.core && g.core[k]) g.coreLeft--; if (g.zones) g.zl[g.zones[k]]--; } g.x.putImageData(g.cur, 0, 0); }
/** [2d-rev5] Catat skor bersih langkah bor/akses/kerok untuk layar hasil. */
function gosokScore(o, job, st) { if (o.score && !st.scored) { st.scored = true; (job.score = job.score || []).push([o.name, gosokProg(st)]); } }
function stGosok(o) {
  const s = { code: 'GOSOK', ...info(o),
    enter(job, st) {
      const set = o.zoom ? zoomSet(o.set(job)) : o.set(job); gosokInit(st, set, (o.r || 4) * (o.zoom || 1), o.speed || 7); st.softN = 0; st.hardN = 0; st.marks = [];
      if (o.zoom) { // [2d-rev5] gambar sudah 2× (Scale2x): 1 piksel = 1 satuan layar, dipusatkan di sisi kiri area kerja
        const g = st.g; g.zf = o.zoom; let x0 = g.w, x1 = 0, y0 = g.h, y1 = 0; for (let k = 0; k < g.target.length; k++) if (g.target[k]) { const i = k % g.w, j = (k / g.w) | 0; if (i < x0) x0 = i; if (i > x1) x1 = i; if (j < y0) y0 = j; if (j > y1) y1 = j; }
        g.ox = 100 - (x0 + x1) / 2; g.oy = 41 + 78 - (y0 + y1) / 2;
      }
      if (o.score) gosokCore(st.g);
    },
    update(job, st, dt) {
      const r = gosokStep(st, dt);
      if (r.removed) { mgHurt(job, (o.pain ? o.pain(job) : 0) * (o.score ? CFG.MG.DRILL_PAIN * r.removed / st.g.total : dt)); if (o.sfx && st.t - (st.ls || 0) > .13) { st.ls = st.t; sfx(o.sfx); } }
      if (job.phase !== 'play') return;
      if (r.bad === 1 && o.soft) { st.softN++; mgHurt(job, o.soft.pain || 0); sfx(o.soft.sfx || 'mg_miss'); if (o.soft.mark) st.marks.push([input.mouse.x, input.mouse.y]); if (o.soft.limit != null && st.softN === o.soft.limit + 1) { mgErr(job, 'minor', o.soft.err); job.misses++; } }
      if (r.bad === 2 && o.hard) { st.hardN++; if (st.hardN > CFG.MG.HARD_GRACE) { o.hard(job, st); return; } mgHurt(job, 6); sfx('drill_oops'); job.misses++; st.marks.push([input.mouse.x, input.mouse.y]); toast(o.hardWarn || 'Hampir tembus pulpa! Sekali lagi = perforasi.', 'bad'); }
      if (gosokProg(st) >= (o.auto || .97)) { gosokScore(o, job, st); if (o.done) o.done(job, st); fin(st); }
    },
    buttons: (job, st) => (o.skip ? [{ label: 'Lewati', fn: () => { if (st.doneAt != null) return; mgErr(job, 'minor', o.skip); job.misses++; fin(st); } }] : []).concat([{ label: 'Selesai', off: gosokProg(st) < (o.minDone || .5), offMsg: o.offMsg || 'Kerjakan dulu sampai lebih dari separuh.',
      fn: () => { if (st.doneAt != null) return; if (1 - gosokProg(st) > (o.leftMax || .1)) { mgErr(job, 'minor', o.leftErr); job.misses++; } gosokScore(o, job, st); if (o.done) o.done(job, st); fin(st); } }]),
    auto(job, st, good) { if (good) { gosokClear(st); if (o.done) o.done(job, st); fin(st); } else if (o.hard) o.hard(job, st); else if (o.soft) { mgErr(job, 'minor', o.soft.err || o.leftErr); job.misses++; gosokClear(st); fin(st); } else { mgErr(job, 'minor', o.leftErr); fin(st); } },
    draw(job, st) {
      if (o.art) o.art(job, st); const g = st.g; if (o.zoom) { hc.save(); hc.beginPath(); hc.rect(7 * HI, 41 * HI, 324 * HI, 156 * HI); hc.clip(); }
      hc.drawImage(g.c, Math.round(g.ox * HI), Math.round(g.oy * HI), Math.round(g.w * g.k * HI), Math.round(g.h * g.k * HI)); if (o.zoom) { hc.restore(); hTag('Diperbesar ' + o.zoom + '×', 12, 46, '#9ad8c8'); }
      if (o.over) o.over(job, st); st.marks.forEach(([x, y]) => { hR(x - 1, y - 1, 2, 2, '#d8202a'); hR(x - .5, y + 1, 1, 1.5, '#a8101a'); });
      if (o.prog) { const [X, Y, W, lb] = o.prog, f = gosokProg(st), M = CFG.MG;
        if (!o.score) hProg(X, Y, W, f, lb, o.progCol); } // [2d-rev5] langkah berskor (bor/akses/kerok) tanpa bilah & angka: ambang 80% hanya aturan game, bukan patokan klinis (user 2026-11-12)
    } };
  return s;
}
/** [2d-rev4] Titik gambar gigi (piksel gambar asli i,j) → koordinat layar, mengikuti zoom langkah GOSOK. */
const zp = (st, i, j) => st && st.g ? [st.g.ox + i * (st.g.zf || 1) * st.g.k, st.g.oy + j * (st.g.zf || 1) * st.g.k] : [12 + i, 36 + j];
/** [2d-rev5] Opsi bersama bor/akses/kerok: zoom 2× tajam, skor bersih (≥80% Bersih · 60–79% Kurang bersih · <60% belum bisa selesai). */
const DRILL = () => ({ zoom: CFG.MG.DRILL_ZOOM, auto: .97, leftMax: 1 - CFG.MG.DRILL_GOOD + .001, minDone: CFG.MG.DRILL_MIN, score: true, offMsg: 'Masih banyak yang tersisa.' });
/** [2d-rev5] Scale2x: gambar piksel 2× dengan tepi dihaluskan (tetap tajam, kerapatan piksel sama dengan UI HD lain). */
function scale2x(c) {
  const w = c.width, h = c.height, S = new Uint32Array(idata(c).data.buffer), [d, x] = cv(w * 2, h * 2), out = x.createImageData(w * 2, h * 2), O = new Uint32Array(out.data.buffer), W2 = w * 2;
  const at = (i, j) => S[clamp(j, 0, h - 1) * w + clamp(i, 0, w - 1)];
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const P = at(i, j), A = at(i, j - 1), B = at(i + 1, j), C = at(i - 1, j), D = at(i, j + 1), o = (j * 2) * W2 + i * 2;
    O[o] = C === A && C !== D && A !== B ? A : P; O[o + 1] = A === B && A !== C && B !== D ? B : P;
    O[o + W2] = D === C && D !== B && C !== A ? C : P; O[o + W2 + 1] = B === D && B !== A && D !== C ? D : P;
  }
  x.putImageData(out, 0, 0); return d;
}
const up2 = (m, w, h) => { if (!m) return null; const o = new (m.constructor)(m.length * 4); for (let j = 0; j < h * 2; j++) for (let i = 0; i < w * 2; i++) o[j * w * 2 + i] = m[(j >> 1) * w + (i >> 1)]; return o; };
/** [2d-gigi2] Set GOSOK versi zoom: gigi v2 digambar asli 2× (make2), atau Scale2x bila tidak ada. Tepi area kerja (EDGE_FREE) bebas, tepi pulpa (PULP_MARGIN) jadi ngilu. Disimpan di set._z. */
function zoomSet(set) {
  if (set._z) return set._z; const M = CFG.MG;
  if (set.make2) { const z = set.make2(), w = z.before.width, h = z.before.height; return set._z = { before: z.before, after: z.after, target: z.target, bad: softBad(z.bad, z.target, w, h, 2), zones: null, ox: z.ox, oy: z.oy, k: 1 }; }
  const w = set.before.width, h = set.before.height, bad = softBad(set.bad, set.target, w, h, 1);
  return set._z = { before: scale2x(set.before), after: scale2x(set.after), target: up2(set.target, w, h), bad: up2(bad, w, h), zones: up2(set.zones, w, h), ox: set.ox, oy: set.oy, k: 1 };
}
/** Ruang salah masker: tepi area gosok bebas, tepi pulpa jadi ngilu (bukan perforasi). sc = skala gambar. */
function softBad(bad, target, w, h, sc) {
  if (!bad) return null; bad = bad.slice(); const out = new Uint8Array(bad.length); for (let k = 0; k < bad.length; k++) if (bad[k] !== 2) out[k] = 1;
  const free = dilate(target, w, h, CFG.MG.EDGE_FREE * sc); for (let k = 0; k < bad.length; k++) if (bad[k] === 1 && free[k]) bad[k] = 0; // tepi area kerja boleh tersenggol (pulpa tidak)
  const near = dilate(out, w, h, CFG.MG.PULP_MARGIN * sc); for (let k = 0; k < bad.length; k++) if (bad[k] === 2 && near[k]) bad[k] = 1;
  return bad;
}
/** [2d-rev2] Karang gigi: klik gumpalan karang → lepas sekali klik. Klik gusi = berdarah (sakit). */
function stKarang(o) {
  const s = { ...info(o), code: 'PILIH', key: 'klik gumpalan karang',
    enter(job, st) { const set = setScaling(o.kind); gosokInit(st, set, 1, 1); st.ch = set.chunks.map(c => ({ ...c, done: false })); st.chunk = set.chunk; st.softN = 0; st.marks = []; },
    take(job, st, c) {
      const g = st.g; c.done = true; for (let q = 0; q < st.chunk.length; q++) if (st.chunk[q] === c.id && g.hp[q] > 0) { g.hp[q] = 0; for (let z = 0; z < 4; z++) g.cur.data[q * 4 + z] = g.aft.data[q * 4 + z]; g.left--; if (g.zones) g.zl[g.zones[q]]--; }
      g.x.putImageData(g.cur, 0, 0); st.pop = { x: (c.x0 + c.x1) / 2 + g.ox, y: (c.y0 + c.y1) / 2 + g.oy, t: st.t };
    },
    near: (st, x, y) => st.ch.find(q => !q.done && x >= q.x0 - 3 && x <= q.x1 + 3 && y >= q.y0 - 3 && y <= q.y1 + 3),
    update(job, st) {
      const c = input.click; if (inWork(c)) {
        const g = st.g, x = c.x - g.ox, y = c.y - g.oy, h = s.near(st, x, y);
        if (h) { s.take(job, st, h); if (job.ult) { for (let k = 1; k < CFG.MG.ULTRA_MUL; k++) { const n2 = st.ch.filter(q => !q.done).sort((a, b) => Math.hypot(a.x0 - h.x0, a.y0 - h.y0) - Math.hypot(b.x0 - h.x0, b.y0 - h.y0))[0]; if (n2) s.take(job, st, n2); } } sfx(job.ult ? 'scale_ultra' : 'scale_scrape'); sfx('mg_hit', st.ch.filter(q => q.done).length); if (o.pain) mgHurt(job, o.pain); }
        else if (g.bad && x >= 0 && y >= 0 && x < g.w && y < g.h && g.bad[y * g.w + x]) { st.softN++; st.marks.push([c.x, c.y]); mgHurt(job, o.soft.pain); sfx('mg_miss'); job.misses++; if (st.softN === o.soft.limit + 1) mgErr(job, 'minor', o.soft.err); }
        else sfx('ui_tick');
      }
      if (st.ch.every(q => q.done)) fin(st);
    },
    buttons: (job, st) => [{ label: 'Selesai', off: st.ch.filter(q => q.done).length < st.ch.length / 2, offMsg: 'Lepaskan dulu lebih dari separuh karang.', fn: () => { if (st.doneAt != null) return; mgErr(job, 'minor', o.leftErr); job.misses++; fin(st); } }],
    auto(job, st, good) { if (!good) { st.softN = o.soft.limit + 1; mgErr(job, 'minor', o.soft.err); } st.ch.forEach(c => { if (!c.done) s.take(job, st, c); }); fin(st); },
    draw(job, st) {
      artScaling(job, st); const g = st.g; hc.drawImage(g.c, Math.round(g.ox * HI), Math.round(g.oy * HI), g.w * HI, g.h * HI);
      const m = input.mouse, hh = job.phase === 'play' && s.near(st, m.x - g.ox, m.y - g.oy);
      if (hh) { const X = hh.x0 + g.ox - 1.5, Y = hh.y0 + g.oy - 1.5, W2 = hh.x1 - hh.x0 + 4, H2 = hh.y1 - hh.y0 + 4; hR(X, Y, W2, .5, '#ffffff'); hR(X, Y + H2 - .5, W2, .5, '#ffffff'); hR(X, Y, .5, H2, '#ffffff'); hR(X + W2 - .5, Y, .5, H2, '#ffffff'); }
      st.marks.forEach(([mx, my]) => { hR(mx - 1, my - 1, 2, 2, '#d8202a'); hR(mx - .5, my + 1, 1, 1.5, '#a8101a'); });
      if (st.pop && st.t - st.pop.t < .35) { const f = (st.t - st.pop.t) / .35; for (let i = 0; i < 6; i++) { const an = i * 1.05; hR(st.pop.x + Math.cos(an) * 8 * f, st.pop.y + Math.sin(an) * 6 * f - 6 * f, 1.5, 1.5, '#e0bc50'); } }
    } };
  return s;
}
/** Cek gigitan: klik titik biru (kertas artikulasi) di tambalan, tampak atas. */
function stBite(o) {
  const s = { ...info(o), code: 'PILIH', key: 'klik titik biru',
    enter(job, st) {
      const set = setKapas(), w = set.after.width, pts = []; for (let k = 0; k < set.target.length; k++) if (set.target[k]) pts.push(k);
      const n = o.n(job); st.dots = [];
      for (let tries = 0; st.dots.length < n && tries < 200; tries++) { const k = pickA(pts), x = 14 + (k % w) * 1.5, y = 46 + ((k / w) | 0) * 1.5; if (st.dots.every(d => Math.hypot(d.x - x, d.y - y) > 16)) st.dots.push({ x, y, f: false, r: hash(k, 3) }); }
    },
    update(job, st) {
      if (inWork(input.click)) { const c = input.click, d = st.dots.find(q => !q.f && Math.hypot(q.x - c.x, q.y - c.y) <= 7); if (d) { d.f = true; sfx('bite_tap'); sfx('mg_hit', st.dots.filter(q => q.f).length + 2); } else sfx('bite_tap'); }
      if (st.dots.every(q => q.f)) fin(st);
    },
    buttons: (job, st) => [{ label: 'Selesai', fn: () => { if (st.doneAt != null) return; if (st.dots.some(q => !q.f)) { mgErr(job, 'minor', o.err); job.misses++; } fin(st); } }],
    auto(job, st, good) { if (good) st.dots.forEach(q => { q.f = true; }); else { mgErr(job, 'minor', o.err); job.misses++; } fin(st); },
    draw(job, st) {
      artOcc(job, 1);
      st.dots.forEach(d => { if (d.f) { hR(d.x - 4, d.y - .5, 8, 1, '#6ad46a'); hR(d.x - .5, d.y - 4, 1, 8, '#6ad46a'); } else { const pulse = 1 + .5 * Math.sin(game.t * 5 + d.r * 6); hR(d.x - 4, d.y - 3, 8, 6, 'rgba(42,84,200,.25)'); hR(d.x - 3, d.y - 2.5, 6, 5, '#1a3488'); hR(d.x - 2.5, d.y - 3, 5, 6, '#1a3488'); hR(d.x - 2.5, d.y - 2, 5, 4, '#2a54c8'); hR(d.x - 2, d.y - 2.5, 4, 5, '#2a54c8'); hR(d.x - 1.5, d.y - 1.5, 1.5 * pulse, 1, '#9ab8ff'); } });
      const tl = hWrap('Titik biru = bagian tambalan yang terlalu tinggi. Klik untuk mengikisnya.', 118), bh = 34 + tl.length * 10;
      hBox(196, 56, 130, bh, 'dark', { thin: true }); HT('Kertas artikulasi', 202, 62, MGC.gold, { bold: true, sh: DK });
      tl.forEach((l, i) => HT(l, 202, 75 + i * 10, MGC.lite2, { sh: DK }));
      HT('Ditemukan ' + st.dots.filter(d => d.f).length + '/' + st.dots.length, 202, 56 + bh - 13, MGC.lite, { bold: true, sh: DK });
    } };
  return s;
}
/** Bius: pilih jenis → topikal (TEPAT oles + tunggu 3 dtk) / infiltrasi (TAHAN suntik). Blok terkunci di T1. */
function stBius(o = {}) {
  const opts = o.opts || ['tanpa', 'topikal', 'infiltrasi', 'blok'];
  const P = stPick({ quiet: true, cols: 2, tool: 'syr', title: () => o.title || 'Pilih bius untuk gigi ini', instr: 'Pilih bius yang cocok untuk gigi & pasien ini.', warn: o.warn,
    cards: () => opts.map(k => ({ k, t: BIUS_INFO[k][0], d: BIUS_INFO[k][1], icon: BIUS_INFO[k][2], lock: k === 'blok' ? 'Bius blok butuh alat T2 (klinik tahap 2).' : null, lockLabel: k === 'blok' ? 'T2' : null })) });
  const OL = stTepat({ n: 1, z: .3, untilHit: true, tool: 'topi', label: 'Oles gel topikal', instr: 'Tekan saat penanda di hijau untuk mengoles gel.', art: o.art });
  const IN = stTahan({ za: .42, z: .3, tool: 'syr', label: 'Suntik pelan', instr: 'Tahan untuk menyuntik pelan, lepas di zona biru.', warn: 'Lewat garis = terlalu cepat', art: o.art, sfxStart: 'inject',
    over: job => { mgHurt(job, 10); mgErr(job, 'minor', 'Suntik bius terlalu cepat'); } });
  const self = { name: 'Bius', tool: 'syr', code: 'TEPAT', instr: 'Tunggu gel topikal bekerja.',
    enter(job, st) { st.ph = 'pick'; st.sub = { t: 0 }; P.enter(job, st.sub); },
    leaf: st => st.ph === 'pick' ? P : st.ph === 'oles' ? OL : st.ph === 'suntik' ? IN : null,
    update(job, st, dt) {
      if (st.ph === 'wait') { st.w += dt; if (st.w >= 3) { job.B = biusFactor(job, 'topikal'); fin(st); } return; }
      const L = self.leaf(st); if (!runStep(job, L, st.sub, dt)) return;
      if (st.ph === 'pick') {
        const k = job.bius = st.sub.cards[st.sub.sel[0]].k;
        if (k === 'tanpa') { job.B = 0; fin(st); } else if (k === 'topikal') { st.ph = 'oles'; st.sub = { t: 0 }; OL.enter(job, st.sub); job.used.push('topi'); } else { st.ph = 'suntik'; st.sub = { t: 0 }; IN.enter(job, st.sub); }
      } else if (st.ph === 'oles') { st.ph = 'wait'; st.w = 0; }
      else if (st.ph === 'suntik') { mgHurt(job, job.kid ? 8 : 6); job.B = biusFactor(job, job.bius); fin(st); }
    },
    auto(job, st, good) {
      if (st.ph === 'pick') { const want = good ? (job.dx === 'persist' || job.tx === 'scaling' ? 'topikal' : 'infiltrasi') : 'tanpa'; P.pick(job, st.sub, Math.max(0, st.sub.cards.findIndex(c => c.k === want))); }
      else if (st.ph === 'wait') st.w = 3; else self.leaf(st).auto(job, st.sub, good);
    },
    draw(job, st) { if (o.art) o.art(job, st); hProg(196, 178, 128, st.w / 3, 'Gel bekerja', '#ff9ab0'); } };
  return self;
}

// ---- Langkah bersama ----
function resepCtx(job) {
  const p = job.p;
  return { hamil: p.med === 'hamil', alergi: p.drug === 'alergi', abses: p.dx === 'abses', drained: job.tx === 'openRes',
    painNeed: ['abses', 'pulpIrev', 'pascaObat', 'pascaCabut', 'nekrosis'].includes(p.dx) || ['cabut', 'cabutSusu', 'openRes'].includes(job.tx) };
}
function judgePereda(job, id) {
  const c = resepCtx(job);
  if (id === 'ibu' && c.hamil) mgErr(job, 'major', 'Ibuprofen untuk pasien hamil');
  if (!id && c.painNeed) { mgErr(job, 'minor', 'Pereda sakit wajib diberikan setelah tindakan ini'); job.misses++; }
}
/** Antibiotik hanya untuk abses yang belum didrainase (minigame/02). Open akses: nanah sudah keluar, antibiotik tidak dinilai (keputusan user 2026-11-12). */
function judgeAnti(job, set) {
  const c = resepCtx(job), amox = set.includes('amox'), metro = set.includes('metro'), klin = set.includes('klin');
  if (amox && c.alergi) return mgErr(job, 'major', 'Amoksisilin untuk pasien alergi amoksisilin');
  if (c.drained) return;
  if (c.abses) { if (!amox && !metro && !klin) mgErr(job, 'major', 'Abses belum didrainase tanpa antibiotik'); else if (metro && !amox && !klin) { mgErr(job, 'minor', 'Metronidazol saja kurang tepat untuk abses'); job.misses++; } return; }
  if (amox || metro || klin) { mgErr(job, 'minor', 'Antibiotik tidak perlu (resep berlebihan)'); job.misses++; }
}
function stRak(kind) {
  const s = { code: 'PILIH', key: 'klik obat di rak', kind, name: kind === 'pereda' ? 'Pereda sakit' : 'Antibiotik', tool: kind === 'pereda' ? 'pill' : 'caps', warn: 'Ingat riwayat pasien',
    instr: kind === 'pereda' ? 'Klik pereda sakit di rak, atau Tidak perlu.' : 'Klik antibiotik (maks 2), lalu Tulis di resep.',
    enter(job, st) { st.sel = []; st.mark = null; job.rx = job.rx || {}; },
    update(job, st) { if (st.mark != null && st.t - st.mark > .6) fin(st); },
    can: id => kind === 'pereda' ? ['para', 'ibu'].includes(id) : ['amox', 'metro', 'klin', 'klor'].includes(id),
    pick(job, st, id) {
      if (st.mark != null || !s.can(id)) { sfx('ui_deny'); return; }
      if (kind === 'pereda') { st.sel = [id]; s.commit(job, st); return; }
      if (st.sel.includes(id)) st.sel = st.sel.filter(x => x !== id); else if (st.sel.length < 2) st.sel.push(id); else { sfx('ui_deny'); return; } sfx('ui_click');
    },
    commit(job, st) {
      const n0 = job.errors.length;
      if (kind === 'pereda') { judgePereda(job, st.sel[0] || null); job.rx.pereda = st.sel[0] || null; } else { judgeAnti(job, st.sel); job.rx.anti = st.sel.slice(); }
      st.mark = st.t; st.good = job.errors.length === n0; sfx(st.good ? 'mg_hit' : 'mg_miss', 4); sfx('paper_flip');
    },
    buttons: (job, st) => [{ label: 'Tidak perlu', fn: () => { if (st.mark == null) { st.sel = []; s.commit(job, st); } } }].concat(kind === 'anti' ? [{ label: 'Tulis di resep', off: !st.sel.length, offMsg: 'Pilih antibiotik dulu, atau Tidak perlu.', fn: () => { if (st.mark == null) s.commit(job, st); } }] : []),
    auto(job, st, good) {
      const c = resepCtx(job);
      if (kind === 'pereda') st.sel = good ? (c.painNeed || c.hamil ? ['para'] : []) : (c.hamil ? ['ibu'] : c.painNeed ? [] : ['para']);
      else st.sel = good ? (c.abses && !c.drained ? [c.alergi ? 'klin' : 'amox'] : []) : (c.alergi ? ['amox'] : c.abses && !c.drained ? [] : ['amox']);
      s.commit(job, st);
    },
    draw(job, st) { drawRak(job, st, s); } };
  return s;
}
function stAturan() {
  return stPick({ name: 'Aturan pakai', tool: 'card', cols: 3, title: () => 'Kartu aturan pakai obat', instr: 'Pilih aturan pakai yang cocok dengan resep.',
    enter(job, st) { const rx = job.rx || {}; if (!rx.pereda && !(rx.anti || []).some(a => a !== 'klor')) { st.skipped = true; fin(st); } },
    cards: job => {
      const rx = job.rx || {}, anti = (rx.anti || []).some(a => a !== 'klor'), A = 'Antibiotik 3× sehari, 5 hari, kontrol hari ke-3', P = 'Pereda sakit bila perlu, maks 3× sehari', W = 'Semua obat 1× sehari sebelum tidur, 10 hari';
      const want = anti ? A : P; return shuffle([A, P, W].map(t => ({ t, ok: t === want, err: 'Aturan pakai obat kurang tepat' })));
    }, art: job => artTable() });
}
function instrKey(job) {
  const t = job.tx; if (t === 'cabutSusu') return 'cabutAnak'; if (t === 'cabut') return 'cabut'; if (t === 'gic' || t === 'mumi') return 'gic'; if (t === 'devital') return 'sementara';
  return job.p.dx === 'abses' || t === 'openRes' ? 'abses' : 'obat';
}
function stInstr(key) {
  return stPick({ name: 'Instruksi pulang', tool: 'bag', n: 2, cols: 2, title: () => 'Pilih 2 instruksi pulang untuk pasien', instr: 'Pilih 2 kartu yang cocok dengan tindakan hari ini.', art: () => artTable(),
    cards: job => { const k = job.instrKey || key || instrKey(job); job.instrUsed = k; return shuffle(INSTR[k].map(t => ({ t, ok: true, icon: 'bag' })).concat(shuffle(INSTR_BAD.slice()).slice(0, 2).map(t => ({ t, ok: false, icon: 'bag' })))); },
    judge(job, picks) { if (picks.some(c => c.ok === false)) { mgErr(job, 'minor', 'Instruksi pulang kurang tepat'); job.misses++; } job.dry = job.instrUsed === 'cabut' && !picks.some(c => c.t === INSTR.cabut[1]); } });
}
function stPereda() {
  return stPick({ name: 'Pereda sakit', tool: 'pill', cols: 3, title: () => 'Pereda sakit untuk dibawa pulang', instr: 'Pilih pereda sakit. Ingat riwayat pasien.', art: () => artTable(),
    cards: job => [{ id: 'para', t: 'Parasetamol', d: '500 mg', icon: 'pill' }, { id: 'ibu', t: 'Ibuprofen', d: '400 mg', icon: 'pill' }, { id: null, t: 'Tidak perlu', d: 'Tanpa obat' }],
    judge(job, picks) { const n0 = job.errors.length; judgePereda(job, picks[0].id); picks[0].ok = job.errors.length === n0; } });
}
const stPulang = (k = 'cabut') => stSeq('Resep & pulang', [stPereda(), stInstr(k)]);
const konsulJudge = label => (job, picks) => { job.kTot++; const ok = picks[0].ok !== false; if (ok) job.kOk++; job.kLog.push([label, ok]); };
function stTemuan() {
  return stPick({ name: 'Temuan', tool: 'mir', cols: 3, title: () => 'Temuan mana yang kamu tunjukkan ke pasien?', instr: 'Pilih temuan yang cocok dengan hasil periksa.', art: () => artTable(), quiet: true,
    cards: job => { const truth = DX[job.p.dx].f.kaca || EXAM_TOOLS[0].normal, others = shuffle([...new Set(Object.keys(DX).map(k => DX[k].f.kaca).filter(t => t && t !== truth))]).slice(0, 2);
      // [2e] minigame/01: foto rontgen jadi kartu bukti "Lihat foto rontgennya" (selalu benar; paling meyakinkan untuk pasien curiga)
      const xr = job.p.exam && Object.keys(job.p.exam.chk).some(k => k.endsWith(':rontgen') && job.p.exam.chk[k].bad);
      return shuffle([xr ? { t: 'Lihat foto rontgennya', d: 'Bukti di film', ok: true, icon: 'foto' } : { t: truth, ok: true, icon: 'mir' }].concat(others.map(t => ({ t, ok: false, icon: 'mir' })))); },
    judge: konsulJudge('Temuan') });
}
function stCara() {
  return stPick({ name: 'Cara bicara', tool: 'model', cols: 3, title: () => 'Jelaskan dengan bahasa:', instr: 'Pilih bahasa yang cocok dengan sifat pasien.', art: () => artTable(), quiet: true,
    cards: job => { const want = TRAITS[traitOf(job.p)].talk; return TALK.map(c => ({ t: c.t, d: c.d, icon: c.icon, ok: c.id === want })); },
    judge: konsulJudge('Cara bicara') });
}
function planLabel(dx) { if (dx === 'sehat') return 'Tidak perlu tindakan, kontrol 6 bulan lagi'; const o = DX[dx].opts.find(x => x.g === 'ideal' && x.tx !== 'rujuk') || DX[dx].opts[0]; return o.tx === 'rujuk' ? 'Rujuk ke dokter gigi spesialis' : CASES[o.tx].name; }
function stRencana() {
  return stPick({ name: 'Rencana', tool: 'brosur', cols: 3, title: () => 'Rencana yang kamu tawarkan', instr: 'Pilih rencana perawatan yang sesuai diagnosis.', art: () => artTable(), quiet: true,
    cards: job => { const good = planLabel(job.p.dx), other = shuffle(Object.keys(DX).filter(k => !DX[k].ctlOnly).map(planLabel).filter(t => t !== good))[0];
      return shuffle([{ t: good, ok: true }, { t: other, ok: false }, { t: Math.random() < .5 ? 'Whitening gigi' : 'Pasang behel', ok: false }]); },
    judge: konsulJudge('Rencana') });
}
function stEdu(konsul) {
  return stPick({ name: 'Edukasi', tool: 'brosur', cols: 3, title: () => 'Satu pesan untuk pasien', instr: konsul ? 'Pilih 1 tips (boleh dilewati).' : 'Pilih 1 tips yang cocok untuk pasien ini.', art: () => artTable(), quiet: konsul, skip: konsul ? true : null,
    cards: job => shuffle([{ t: EDU[eduKey(job.p)], ok: true, err: 'Edukasi kurang tepat', icon: 'brosur' }].concat(shuffle(EDU_BAD.slice()).slice(0, 2).map(t => ({ t, ok: false, err: 'Edukasi kurang tepat', icon: 'brosur' })))),
    judge: konsul ? konsulJudge('Edukasi') : null });
}
// Tambalan sementara (minigame/03) sebagai rangkaian langkah
const stSemBersih = () => stGosok({ name: 'Bersihkan', tool: 'cot', cursor: 'cot', r: 6, speed: 9, set: setKapas, auto: .95, leftMax: .15, leftErr: 'Ludah tersisa di kavitas', instr: 'Gosok kapas di dalam lubang sampai kering.', prog: [196, 186, 128, 'Kering'], art: () => workGlow(98, 118, 110) });
const stSemBahan = () => stPick({ name: 'Bahan sementara', tool: 'zoe', cols: 1, x: 196, w: 130, title: () => 'Bahan sementara', instr: 'Pilih bahan tambalan sementara.', art: job => artOcc(job, 0),
  cards: () => [{ t: 'ZOE', d: 'Mengandung eugenol', ok: true }, { t: 'Tanpa eugenol', d: 'Sementara biasa', ok: false, err: 'Bahan tanpa eugenol kurang menenangkan pulpa' }] });
const stSemIsi = () => stTepat({ name: 'Isi & padatkan', tool: 'scl', n: 2, z: .35, pain: 2, label: 'Padatkan', sfx: 'fill_press', instr: 'Tekan Spasi saat penanda di zona hijau.', warn: 'Meleset 2× = berongga',
  end: (job, miss) => { if (miss >= 2) mgErr(job, 'minor', 'Tambalan sementara berongga'); }, art: (job, st) => artOcc(job, st.k / 2) });
const stGigit = (n) => stBite({ name: 'Cek gigitan', tool: 'art', n: n || (() => 1 + (Math.random() < .5 ? 1 : 0)), err: 'Titik tinggi terlewat (gigitan mengganjal)', instr: 'Klik semua titik biru di tambalan.' });
/** Perforasi (GDD minigame/04 & 03): tindakan Gagal, lubang ditutup tambalan sementara, pasien kontrol 3 hari lagi. */
function mgPerforasi(job, st, kind) {
  sfx('drill_oops'); mgHurt(job, 15); if (job.phase !== 'play') return;
  mgErr(job, 'major', kind === 'gic' ? 'Perforasi: bor masuk ke pulpa' : 'Perforasi dinding atau dasar kamar pulpa');
  job.failReturn = kind === 'gic' ? 'pulpIrev' : 'perforasi'; job.failSay = 'Saya datang kontrol, Dok. Gigi yang ditambal sementara kemarin kadang masih cenut-cenut.'; job.instrKey = 'sementara';
  if (kind !== 'openRes') mgDetour(job, [stSemBersih(), stSemBahan(), stSemIsi(), stGigit(), stInstr('sementara')]);
  toast(kind === 'openRes' ? 'Perforasi! Lanjutkan dengan hati-hati.' : 'Perforasi! Tutup dulu dengan tambalan sementara.', 'bad'); fin(st);
}
function stTampon(susu) {
  if (susu) return stUrut({ name: 'Tampon + cek', tool: 'tamp', items: [['tamp', 'Tampon', 'tamp'], ['mir', 'Kaca', 'mir'], ['frc', 'Tang', 'frc'], ['cot', 'Kapas', 'cot']], seq: () => ['tamp', 'mir'],
    skip: 'Tampon terlewat (perdarahan ringan)', label: 'Tampon, lalu cek soket', on: (job, id) => { if (id === 'tamp') { job.gauze = true; sfx('gauze'); } }, instr: 'Pasang tampon, lalu cek soket dengan kaca.', art: job => artSusu(job), at: [200, 70] });
  return stSeq('Tampon', [
    stUrut({ tool: 'tamp', items: [['tamp', 'Tampon', 'tamp'], ['cot', 'Kapas', 'cot'], ['frc', 'Tang', 'frc'], ['elv', 'Elev.', 'elv']], seq: () => ['tamp'], label: 'Ambil dari baki', on: job => { job.gauze = true; sfx('gauze'); }, instr: 'Ambil tampon dari baki untuk menutup soket.', art: job => artCabut(job), at: [220, 70] }),
    stTahan({ auto: true, label: 'Gigit tampon', tool: 'tamp', rate: .42, instr: 'Tahan sampai bar penuh supaya perdarahan berhenti.', earlyText: 'Terlalu cepat. Tekan lagi.', art: job => artCabut(job),
      rateMul: job => job.p.med === 'jantung' && knownMed(job.p).includes('jantung') ? .5 : 1,
      end: job => { if (job.p.med === 'jantung' && !knownMed(job.p).includes('jantung')) mgErr(job, 'major', 'Perdarahan setelah pulang: pengencer darah tidak diketahui'); } })]);
}

// ---- Rangkaian langkah per tindakan ----
/** [2e] Baki konsultasi: foto rontgen terbuka mulai tahap 2 (rontgen periapikal). */
/** [2e-rev] Baki scaling: ultrasonik terbuka di klinik tahap 2, dicoret kalau pasien diketahui memakai alat pacu jantung. */
const scalingTray = job => TRAY.scaling.map(t => t[0] !== 'ult' ? t : S.clinicStage >= 2 && !(job.p.med === 'pacu' && knownMed(job.p).includes('pacu')) ? t.slice(0, 3) : t.slice(0, 3).concat(['T2']));
const konsulTray = () => TRAY.konsul.map(t => t[0] === 'foto' && S.clinicStage >= 2 ? t.slice(0, 3) : t);
const MG_BUILD = {
  explain: job => { const p = job.p, truth = DX[p.dx], ok = (!!truth.region || job.tooth === p.tooth) && truth.opts.some(o => o.tx === job.tx); job.kTot = 1; job.kOk = ok ? 1 : 0; job.kLog = [['Rencana', ok]]; job.tray = konsulTray(); return [stTemuan(), stCara(), stEdu(true)]; },
  konsul: job => { job.tray = konsulTray(); return [stTemuan(), stCara(), stRencana(), stEdu(true)]; },
  resep: job => { job.tray = TRAY.resep; job.rx = {}; return [stRak('pereda'), stRak('anti'), stAturan(), stInstr()]; },
  gic: job => {
    job.tray = TRAY.gic; const deep = job.deep, prox = job.p.dx === 'kariesP', cav = prox ? 'prox' : deep ? 'deep' : 'shallow', A = (o) => job2 => artCross(job2, o); // [2e-rev] karies proksimal = prep klas II di sisi gigi
    const items = [['cot', 'Kapas', 'cot'], ['etch', 'Etsa', 'etch'], ['cond', 'Kondis', 'cond'], ['irr', 'Bilas', 'irr'], ['liner', 'Pelapik', 'liner'], ['gic', 'GIC', 'gic']];
    return [
      stBius({ art: A({ caries: cav }), warn: deep ? 'Karies dalam' : 'Karies dangkal boleh tanpa bius' }),
      stGosok({ ...DRILL(), name: 'Bor karies', tool: 'bur', cursor: 'bur', r: 3, speed: 6, set: () => setBor(deep, 1, prox), pain: j => 10 * (deep && j.B < .3 ? 2 : 1), sfx: 'drill_low', soft: { pain: 6 }, hard: (j, st) => mgPerforasi(j, st, 'gic'),
        leftErr: 'Sisa karies tertinggal', prog: [196, 186, 128, 'Karies'], instr: 'Tahan klik & gosok karies cokelat sampai bersih.', warn: 'Jangan sentuh pulpa',
        art: () => workGlow(95, 110, 120), over: (j, st) => { hTag('Karies', 214, 50, '#f0a048', ...zp(st, prox ? 52 : 92, prox ? 38 : 30)); hTag('Pulpa', 214, 72, '#ee98a4', ...zp(st, 100, 62)); } }),
      stSeq('Siapkan kavitas', [
        stUrut({ tool: 'cond', items, seq: () => ['cot', 'cond', 'irr'], bad: { etch: 'Etsa fosfat dipakai pada GIC' }, extra: [], label: 'Siapkan kavitas', instr: 'Klik bahan di baki sesuai urutan kerja.', art: A({ cav }) }),
        stTahan({ tool: 'dry', label: 'Keringkan', za: .3, z: .35, at: [196, 166, 130], labels: ['BASAH', 'LEMBAP', 'KERING'], sfxLoop: 'air_water', instr: 'Tahan untuk meniup udara, lepas di zona lembap.', warn: 'Terlalu kering = ngilu', art: A({ cav }),
          over: j => mgErr(j, 'minor', 'Kavitas terlalu kering') }),
        stUrut({ tool: 'gic', items, seq: () => deep ? ['liner', 'gic'] : ['gic'], extra: ['liner'], bad: { etch: 'Etsa fosfat dipakai pada GIC' }, label: 'Bahan ke kavitas', skipText: () => 'Pelapik terlewat pada karies dalam',
          on: (j, id) => { if (id === 'liner') j.liner = true; else sfx('fill_press'); }, instr: 'Klik bahan yang dimasukkan ke kavitas, berurutan.', art: j => artCross(j, { cav, liner: !!j.liner }) })]),
      stSeq('Isi + lapisi', [
        stTepat({ tool: 'gic', n: 1, z: .3, label: 'Selagi mengkilap', sfx: 'fill_press', instr: 'Tekan saat penanda di zona hijau (masih mengkilap).', warn: 'Kusam = rapuh',
          end: (j, miss) => { if (miss) mgErr(j, 'minor', 'GIC dipadatkan saat sudah kusam'); }, art: (j, st) => artCross(j, { cav, liner: !!j.liner, fill: st.doneAt != null ? 1 : .35 }) }),
        stUrut({ tool: 'varn', items: [['varn', 'Varnish', 'varn'], ['etch', 'Etsa', 'etch'], ['irr', 'Bilas', 'irr'], ['cot', 'Kapas', 'cot']], seq: () => ['varn'], skip: 'Tambalan tanpa varnish', label: 'Lapisi permukaan',
          bad: { irr: 'Tambalan GIC dibilas sebelum mengeras' }, on: () => sfx('etch_brush'), instr: 'Lapisi tambalan supaya tidak berkapur.', art: j => artCross(j, { cav, liner: !!j.liner, fill: 1 }) })]),
      stGigit(() => deep ? 2 + (Math.random() < .5 ? 1 : 0) : 1 + (Math.random() < .5 ? 1 : 0)),
      stInstr()];
  },
  scaling: job => {
    job.tray = scalingTray(job); job.ult = false; const perio = job.p.dx === 'perio'; if (perio) job.extraEnergy = CFG.MG.SCALING_PERIO_ENERGY;
    const arts = st => (j, s2) => artScaling(j, s2);
    return [
      S.clinicStage >= 2 && stPick({ name: 'Pilih scaler', tool: 'scl', cols: 2, quiet: true, h: 60, title: () => 'Scaler apa yang dipakai?', instr: 'Pilih scaler tangan atau ultrasonik.', warn: 'Cek riwayat pasien',
        cards: job2 => { const pk = job2.p.med === 'pacu' && knownMed(job2.p).includes('pacu');
          return [{ k: 'manual', t: 'Scaler tangan', d: 'Manual · 1 klik = 1 gumpalan', icon: 'scl' },
            { k: 'ult', t: 'Ultrasonik', d: 'T2 · 1 klik = 2 gumpalan', icon: 'ult', lock: pk ? 'Pasien memakai alat pacu jantung: pakai scaler tangan.' : null, lockLabel: pk ? 'Pacu' : null }]; },
        judge: (job2, picks) => { job2.ult = picks[0].k === 'ult'; job2.tray = scalingTray(job2); if (job2.ult && job2.p.med === 'pacu') mgErr(job2, 'major', 'Komplikasi: ' + MED.pacu.risk.toLowerCase()); } }), // [2e-rev]

      stKarang({ name: 'Karang atas gusi', tool: 'scl', kind: 'supra', soft: { pain: 4, limit: 5, err: 'Gusi tersentuh lebih dari 5 kali' }, leftErr: 'Karang gigi tersisa',
        instr: 'Klik tiap gumpalan karang kuning untuk melepasnya.', warn: 'Kena gusi = berdarah' }),
      perio && stSeq('Karang bawah gusi', [
        stBius({ opts: ['tanpa', 'topikal'], title: 'Bius untuk karang di bawah gusi?', art: j => artScaling(j, null, setScaling('sub').before) }),
        stKarang({ tool: 'scl', kind: 'sub', pain: 2, soft: { pain: 12, limit: 3, err: 'Kuret melewati dasar poket' }, leftErr: 'Karang bawah gusi tersisa',
          instr: 'Klik gumpalan karang gelap di bawah garis gusi.', warn: 'Lewat garis putih = sakit' })]),
      stGosok({ name: 'Polishing', tool: 'dry', cursor: 'dry', r: 7, speed: 14, set: () => setScaling('polish'), pain: () => 1, sfx: 'polish', auto: .95, leftMax: .2, leftErr: 'Polishing belum merata', instr: 'Gosok cepat 8 gigi yang kusam sampai mengilap.', art: arts() }),
      stEdu(false)].filter(Boolean);
  },
  cabut: job => {
    job.tray = TRAY.cabut; job.cabutO = { crown: job.p.dx !== 'sisaAkar' }; if (['nekrosis', 'pulpIrev', 'abses', 'pascaObat', 'perforasi'].includes(job.p.dx)) job.cabutO.caries = 'deep'; const A = j => artCabut(j);
    return [
      stGosok({ name: 'Antiseptik', tool: 'cot', cursor: 'cot', r: 5, speed: 10, set: j => setAntiseptik(j.cabutO), auto: .92, leftMax: .4, leftErr: 'Antiseptik kurang merata', skip: 'Antiseptik terlewat', instr: 'Oleskan antiseptik di gusi sekitar gigi.', art: () => workGlow(95, 120, 120) }),
      stBius({ art: A }),
      stTahan({ name: 'Luksasi', tool: 'elv', za: .38, z: .3, label: 'Dorong elevator', sfxLoop: 'elevator', instr: 'Tahan untuk mendorong elevator pelan, lepas di zona biru.', warn: 'Lewat = terlalu dalam', art: A,
        over: j => { mgHurt(j, 8); mgErr(j, 'minor', 'Elevator masuk terlalu dalam'); }, end: j => { mgHurt(j, 5); j.lux = true; } }),
      stRitme({ name: 'Goyang & cabut', tool: 'frc', n: () => 6 + Math.floor(Math.random() * 5), space: .8, spaceMul: j => j.p.dx === 'perioB' ? CFG.MG.RITME_LOOSE : 1, z: .3, pain: 8, lane: [212, 150, 112], label: 'Tang',
        instr: 'Tekan A / D bergantian saat ketukan lewat garis kuning.', warn: 'Merah 3× = akar patah', art: A,
        done: j => { j.out = game.t; sfx('tooth_pop'); },
        onBreak: (j, st) => { mgErr(j, 'major', 'Akar patah saat digoyang'); j.broken = true; j.out = game.t; j.failReturn = 'akarPatah'; j.failSay = DX.akarPatah.ctlSay; sfx('drill_oops'); mgDetour(j, [stTampon(), stPulang()]); toast('Akar patah! Pasang tampon dulu.', 'bad'); fin(st); } }),
      stTampon(), stPulang()];
  },
  cabutSusu: job => {
    job.tray = TRAY.cabutSusu; const A = j => artSusu(j);
    return [
      stGosok({ name: 'Antiseptik', tool: 'cot', cursor: 'cot', r: 5, speed: 10, set: j => { const sc = susuScene(j.t); return { before: sc.gum, after: sc.after, target: sc.target, bad: null, ox: 7, oy: 41, k: 1 }; }, auto: .92, leftMax: .4,
        leftErr: 'Antiseptik kurang merata', skip: 'Antiseptik terlewat', instr: 'Oleskan antiseptik di gusi sekitar gigi goyang.', art: j => artSusu(j, false), done: (j, st) => { j.gumImg = st.g.c; } }),
      stBius({ art: A }),
      stRitme({ name: 'Goyang & cabut', tool: 'frc', n: () => 4 + Math.floor(Math.random() * 3), space: .95, z: .35, pain: 6, lane: [44, 172, 280], instr: 'Tekan A / D bergantian, ketukannya longgar.', warn: 'Merah = terlalu keras', art: A,
        done: j => { j.out = game.t; sfx('tooth_pop'); }, onBreak: j => { mgErr(j, 'minor', 'Akar gigi susu patah sebagian'); } }),
      stTampon(true), stPulang('cabutAnak')];
  },
  devital: job => {
    job.tray = TRAY.devital;
    return [
      stBius({ art: j => artCross(j, { caries: 'deep' }), warn: 'Pulpa masih hidup' }),
      stGosok({ ...DRILL(), name: 'Open akses', tool: 'bur', cursor: 'bur', r: 3, speed: 8, set: setAkses, pain: j => 8 * (j.B < .3 ? 2 : 1), sfx: 'drill_low', soft: { pain: 2, limit: 8, err: 'Dinding akses terlalu lebar' },
        hard: (j, st) => mgPerforasi(j, st, 'devital'), leftErr: 'Atap pulpa belum terbuka penuh', prog: [196, 186, 128, 'Akses'], instr: 'Tahan klik & gosok arsir kuning sampai terbuka.', warn: 'Keluar jauh = perforasi',
        art: () => workGlow(95, 110, 120), over: aksesGuide }),
      stUrut({ name: 'Pasta devitalisasi', tool: 'caoh', items: [['cot', 'Kapas', 'cot'], ['etch', 'Etsa', 'etch'], ['caoh', 'Pasta', 'caoh'], ['gic', 'GIC', 'gic']], seq: () => ['cot', 'caoh', 'cot'], label: 'Taruh pasta',
        bad: { etch: 'Etsa dipakai di kamar pulpa', gic: 'GIC permanen dipasang sebelum pulpa mati' }, on: (j, id, st) => { if (id === 'caoh') j.paste = true; }, instr: 'Klik bahan di baki sesuai urutan kerja.',
        art: j => { artCross(j, { caries: 'deep', access: true }); if (j.paste) pasteBlob(); } }),
      stSemBahan(), stSemIsi(), stGigit(), stInstr('sementara')];
  },
  mumi: job => {
    job.tray = TRAY.mumi; const items = [['cot', 'Kapas', 'cot'], ['etch', 'Etsa', 'etch'], ['caoh', 'Pasta', 'caoh'], ['liner', 'Pelapik', 'liner'], ['cond', 'Kondis', 'cond'], ['irr', 'Bilas', 'irr']];
    const M = st => j => drawLo(mumiImg(j.mumi || 0), 12, 36);
    return [
      stGosok({ ...DRILL(), name: 'Buka tambalan', tool: 'bur', cursor: 'bur', r: 4, speed: 8, set: setBuka, pain: () => 2, sfx: 'drill_low', leftErr: 'Sisa tambalan sementara tertinggal', prog: [196, 186, 128, 'Tambalan'], instr: 'Tahan klik & gosok tambalan sementara.', art: () => workGlow(95, 110, 120) }),
      stGosok({ ...DRILL(), name: 'Buang pulpa', tool: 'scl', cursor: 'scl', r: 3, speed: 6, set: setPulpa, sfx: 'scale_scrape', soft: { pain: 0, limit: 3, err: 'Ekskavasi terlalu dalam ke saluran akar' }, hard: (j, st) => mgPerforasi(j, st, 'mumi'),
        leftErr: 'Sisa pulpa mahkota tertinggal', prog: [196, 186, 128, 'Pulpa'], instr: 'Tahan klik & kerok pulpa mati di kamar pulpa.', warn: 'Jangan masuk saluran', art: () => workGlow(95, 110, 120),
        over: (j, st) => hTag('Kamar pulpa', 214, 60, '#ee98a4', ...zp(st, 88, 56)) }),
      stUrut({ name: 'Pasta mumifikasi', tool: 'caoh', items, seq: () => ['cot', 'caoh', 'liner'], bad: { etch: 'Etsa dipakai di kamar pulpa' }, label: 'Pasta & pelapik', instr: 'Klik bahan di baki sesuai urutan kerja.',
        on: (j, id) => { if (id === 'caoh') j.mumi = 1; if (id === 'liner') j.mumi = 2; }, art: j => { workGlow(95, 110, 120); M()(j); } }),
      stSeq('Siapkan kavitas', [
        stUrut({ tool: 'cond', items, seq: () => ['cond', 'irr'], bad: { etch: 'Etsa fosfat dipakai pada GIC' }, label: 'Siapkan kavitas', instr: 'Klik bahan di baki sesuai urutan kerja.', art: j => { workGlow(95, 110, 120); M()(j); } }),
        stTahan({ tool: 'dry', label: 'Keringkan', za: .3, z: .35, at: [196, 166, 130], labels: ['BASAH', 'LEMBAP', 'KERING'], sfxLoop: 'air_water', instr: 'Tahan untuk meniup udara, lepas di zona lembap.', warn: 'Terlalu kering = ngilu',
          over: j => mgErr(j, 'minor', 'Kavitas terlalu kering'), art: j => { workGlow(95, 110, 120); M()(j); } })]),
      stSeq('Isi + lapisi', [
        stTepat({ tool: 'gic', n: 1, z: .3, label: 'Selagi mengkilap', sfx: 'fill_press', instr: 'Tekan saat penanda di zona hijau (masih mengkilap).', warn: 'Kusam = rapuh',
          end: (j, miss) => { if (miss) mgErr(j, 'minor', 'GIC dipadatkan saat sudah kusam'); j.mumi = 3; }, art: j => { workGlow(95, 110, 120); M()(j); } }),
        stUrut({ tool: 'varn', items: [['varn', 'Varnish', 'varn'], ['etch', 'Etsa', 'etch'], ['irr', 'Bilas', 'irr'], ['cot', 'Kapas', 'cot']], seq: () => ['varn'], skip: 'Tambalan tanpa varnish', label: 'Lapisi permukaan',
          bad: { irr: 'Tambalan GIC dibilas sebelum mengeras' }, on: () => sfx('etch_brush'), instr: 'Lapisi tambalan supaya tidak berkapur.', art: j => { workGlow(95, 110, 120); M()(j); } })]),
      stGigit(), stInstr('gic')];
  },
  openRes: job => {
    job.tray = TRAY.openRes; job.rx = {};
    return [
      stBius({ art: j => artCross(j, { caries: 'deep' }), warn: 'Abses: bius kurang mempan' }),
      stGosok({ ...DRILL(), name: 'Akses drainase', tool: 'bur', cursor: 'bur', r: 3, speed: 8, set: setAkses, pain: () => 8, sfx: 'drill_low', soft: { pain: 2, limit: 8, err: 'Dinding akses terlalu lebar' }, hard: (j, st) => mgPerforasi(j, st, 'openRes'),
        leftErr: 'Akses belum terbuka penuh', prog: [196, 186, 128, 'Akses'], instr: 'Tahan klik & gosok arsir kuning sampai terbuka.', warn: 'Keluar jauh = perforasi', done: j => { j.pus = game.t; sfx('suction'); },
        art: () => workGlow(95, 110, 120), over: aksesGuide }),
      stTahan({ name: 'Irigasi', tool: 'irr', za: .45, z: .3, rate: .34, label: 'Semprot pelan', sfxLoop: 'air_water', instr: 'Tahan untuk mengirigasi pelan, lepas di zona biru.', warn: 'Terlalu lama = sakit',
        over: j => { mgHurt(j, 10); mgErr(j, 'minor', 'Irigasi terlalu lama, sakit melonjak'); }, art: j => { artCross(j, { caries: 'deep', access: true }); pusDrops(j); } }),
      // [2d-rev2] akses tidak dibiarkan terbuka dengan kapas: medikamen di kamar pulpa + tambalan sementara (praktik user 2026-11-12: kapas bisa lepas, kepatuhan pasien tidak bisa diandalkan)
      stUrut({ name: 'Medikamen', tool: 'caoh', items: [['cot', 'Kapas', 'cot'], ['etch', 'Etsa', 'etch'], ['caoh', 'CaOH2', 'caoh'], ['gic', 'GIC', 'gic']], seq: () => ['cot', 'caoh', 'cot'], label: 'Medikamen',
        bad: { etch: 'Etsa dipakai di kamar pulpa', gic: 'GIC permanen dipasang sebelum infeksi reda' }, on: (j, id) => { if (id === 'caoh') j.paste = true; }, instr: 'Keringkan, taruh medikamen, tutup kapas kecil.',
        art: j => { artCross(j, { caries: 'deep', access: true }); if (j.paste) pasteBlob(); } }),
      stSeq('Tambalan sementara', [stSemBahan(), stSemIsi()]),
      stSeq('Resep', [stRak('pereda'), stRak('anti'), stAturan(), stInstr('abses')])];
  },
};
/** Garis bantu jalur akses (kuning putus-putus) + label. */
function aksesGuide(job, st) {
  hTag('Area bor', 214, 50, '#ffd86a', ...zp(st, TXC + 9, 22)); hTag('Kamar pulpa', 214, 72, '#ee98a4', ...zp(st, 100, 60));
  const tl = hWrap('Gosok arsir kuning: atap pulpa terbuka, kamar pulpa kelihatan. Jangan kejar sampai dasar.', 118); hBox(196, 94, 130, 12 + tl.length * 10, 'dark', { thin: true }); tl.forEach((l, i) => HT(l, 202, 100 + i * 10, MGC.lite2, { sh: DK }));
}
function pasteBlob() { const cx = 12 + TXC - 1, cy = 36 + 46; for (let j = -3; j <= 3; j++) { const w = Math.round(Math.sqrt(9 - j * j) * 2.2); hR(cx - w, cy + j, w * 2, 1, j < -1 ? '#ffffff' : '#ecece0'); } }
function pusDrops(job) { if (!job.pus) return; const t = game.t - job.pus; for (let i = 0; i < 7; i++) { const y = 84 - ((t * 16 + i * 6) % 40), x = 12 + TXC - 2 + Math.sin(i * 2.1 + t * 2) * 5; hR(x - .5, y - .5, 3, 3, 'rgba(90,70,10,.6)'); hR(x, y, 2, 2, i % 2 ? '#e8d870' : '#f4e8a0'); } }

// ---- Overlay minigame ----
function mgJob(p, dxKey, tooth, tx, mode) {
  const M = CFG.MG, t = tooth || p.tooth || 0;
  const job = { p, dxKey, tooth, tx, mode: mode || 'proc', kid: p.body === 'kid', t, dx: p.dx, errors: [], misses: 0, B: 0, bius: 'tanpa', i: 0, used: [], kOk: 0, kTot: 0, kLog: [], extraEnergy: 0,
    pain: M.PAIN_START[p.dx] || 0, deep: p.dx === 'pulpRev', back: t % 10 >= 4, lower: [3, 4, 7, 8].includes(Math.floor(t / 10)), prim: t >= 50, phase: 'play' };
  job.painMax = job.pain; job.zoneMul = (S.stress > 50 ? M.STRESS_ZONE : 1) * (S.energy < (CASES[tx].energy || 0) ? M.LOW_ENERGY_ZONE : 1) * M.T_TIER;
  job.nurse = staffEff('perawat'); job.nurseId = job.nurse ? staffOf('perawat').id : null; job.zoneMul *= 1 + CFG.STAFF.ZONE * job.nurse; // [2e] Perawat: zona +15% × efek (minigame/00 §4)
  job.zoneMul *= fokusMul(); // [3a-3] buff Fokus dari Kedai Kopi Seduh: zona +10% seharian
  job.title = job.mode === 'explain' ? 'Jelaskan Rencana' : MG_TITLE[tx];
  job.steps = (job.mode === 'explain' ? MG_BUILD.explain : MG_BUILD[tx])(job);
  return job;
}
/** Mulai tindakan (setelah pasien setuju). Bahan dipakai di awal: tidak kembali kalau tindakan berhenti (minigame/00 §5). */
function startProc(p, dxKey, tooth, tx, mode) {
  const cs = CASES[tx], C = S.clinic, job = mgJob(p, dxKey, tooth, tx, mode);
  if (job.mode === 'proc' && cs.stock && C.stock >= cs.stock) C.stock -= cs.stock;
  mgEnterStep(job);
  const ov = { kind: 'mg', t: 0, job,
    update() {
      const dt = game.dt || 1 / 60; this.t++;
      if (input.click) { const re = job.phase === 'result' ? /^mgr/ : job.paused ? /^mgp/ : /^mg[^pr]/, h = topHit(input.click, re); if (h) { input.click = null; h.fn(); return; } }
      if (job.phase === 'result') { if ((okHit() || hit('esc')) && game.t - job.rt > .7) mgClose(job); return; }
      if (job.paused) { if (hit('esc')) { job.paused = false; sfx('pause_off'); } return; }
      if (hit('esc') && this.t > 2) { job.paused = true; sfx('pause_on'); return; }
      if (runStep(job, job.steps[job.i], job.st, dt) && job.phase === 'play') mgNext(job);
    },
    drawHD() { drawMinigame(job, this); } };
  openOverlay(ov); sfx('lamp_on'); sfx('chair_up', .1);
  return job;
}
function mgGrade(job) {
  if (job.tx === 'konsul' || job.mode === 'explain') { const k = job.kOk, n = job.kTot; return k >= n && n >= 4 ? 'sempurna' : k >= 3 ? 'sukses' : k === 2 ? 'cukup' : 'gagal'; }
  if (job.abort || job.errors.some(e => e.sev === 'major')) return 'gagal';
  const mi = job.errors.length; if (!mi && job.painMax < CFG.MG.PAIN_WARN) return job.misses ? 'sukses' : 'sempurna'; return 'cukup';
}
function mgResult(job) {
  if (job.phase === 'result') return; job.phase = 'result'; job.rt = game.t; job.paused = false;
  if (job.mode === 'explain') { job.grade = mgGrade(job); const M = CFG.MG, X = CFG.CLINIC.EXAM; job.E = job.grade === 'gagal' ? -M.KONSUL_E : job.grade === 'cukup' ? 0 : M.KONSUL_E;
    job.c0 = consentChance(job.p, job.tx); job.c1 = clamp(job.c0 * (1 + job.E), X.CONSENT_MIN, X.CONSENT_MAX); }
  else job.R = finishProc(job);
  sfx(GRADE[job.grade].sfx);
}
function mgClose(job) { if (job.closing) return; job.closing = true; if (S.practice) { game.practice.last = { t: job.title, g: GRADE[job.grade] ? GRADE[job.grade].name : '-', k: job.grade }; closeOverlay(openPractice); return; }
  closeOverlay(() => job.mode === 'explain' ? explainDone(job) : afterProc(job)); }
/** Konsultasi sebelum persetujuan selesai → peluang setuju ±20% (minigame/01 §4), lalu pasien memutuskan. */
function explainDone(job) { spendTime(CFG.MG.KONSUL_MIN); if (game.overlay) return; offer(job.p, job.dxKey, job.tooth, job.tx, job.E); }
/** Hasil tindakan → bayar, energi, stres, reputasi, kontrol, rekam medis (pengganti perform() 2c). Waktu & kepergian pasien di afterProc. */
function finishProc(job) {
  const { p, dxKey, tooth, tx } = job, cs = CASES[tx], C = S.clinic, K = CFG.CLINIC, X = K.EXAM, M = CFG.MG, truth = DX[p.dx];
  const R = { pay: 0, energy: 0, rep: 0, stress: 0, min: cs.min, ctl: null, leave: 'done' }, rep0 = S.repPts, st0 = S.stress;
  if (job.mode === 'konsulOnly') {
    job.grade = mgGrade(job); R.pay = tariff('konsul') + herbMint(job, tariff('konsul')); R.mint = herbMint(job, tariff('konsul')); earn(R.pay); R.energy = cs.energy; addEnergy(-cs.energy); R.leave = null; // [2g] Mint · [rev] komentar dulu menelan energi & leave
    const xf = takeXray(p); R.pay += xf.fee; R.xfee = xf.fee; R.min += xf.admin; R.admin = xf.admin; staffUse('perawat');
    addRecord(p, null, null, 'konsul', R.pay, 'Konsultasi saja, belum ada tindakan. Konsultasi ' + GRADE[job.grade].name.toLowerCase() + '.'); return R;
  }
  const okTooth = !!truth.region || tooth === p.tooth, exact = dxKey === p.dx && okTooth, opt = okTooth ? truth.opts.find(o => o.tx === tx) : null, notes = [];
  // riwayat medis terlewat yang tidak dinilai langsung oleh langkah minigame (minigame/00 §3.5): darah tinggi & diabetes saat cabut
  const known = knownMed(p);
  if (!job.abort) ['hipertensi', 'diabetes'].filter(m => p.med === m && !p.medOk && MED[m].tx.includes(tx) && !known.includes(m)).forEach(m => {
    if (Math.random() < X.COMPLIC_P * nikahComplicMul()) { // [3a-5] Galih 25%
      job.complic = m; job.errors.push({ sev: 'major', text: 'Komplikasi: ' + MED[m].risk.toLowerCase() }); } else notes.push('Risiko tidak diketahui: ' + MED[m].name.toLowerCase() + '.'); });
  job.grade = mgGrade(job); const g = job.grade, fail = g === 'gagal' && tx !== 'konsul', part = job.payFrac != null ? job.payFrac : 1;
  R.pay = Math.round(tariff(tx) * part / 1000) * 1000; R.mint = herbMint(job, R.pay); R.pay += R.mint; earn(R.pay); // [2g] Mint
  const xf = takeXray(p); R.pay += xf.fee; R.xfee = xf.fee; R.admin = xf.admin; staffUse('perawat'); // [2e] rontgen ditagih bersama; Perawat memakai tenaga
  R.energy = Math.round((cs.energy + job.extraEnergy) * (job.abort ? Math.max(.3, part) : 1)); addEnergy(-R.energy);
  addStress(K.STRESS_PER_PATIENT * band(tx).stress); C.clean = Math.max(0, C.clean - K.DIRTY_PER_PATIENT); C.served++;
  if (!fail) { if (opt && exact && opt.g === 'ideal' && g !== 'cukup') addRep(nikahRep(K.REP_DONE + X.REP_DX_OK)); else if (opt) addRep(nikahRep(K.REP_DONE)); } // [3a-5] Laras ×1,25
  const sirih = !fail && job.herbUsed && job.herb === 'sirih' && (g === 'sukses' || g === 'sempurna');
  if (sirih && !p.npc) { addRep(CFG.GARDEN.MG.REP); notes.push('Kompres daun sirih.'); } // [2g] Sirih pasien biasa: reputasi +1
  { const tn = careTrust(p, g, sirih); if (tn) { notes.push(tn); R.trust = tn; } } // [3a-2] pasien warga: Trust dari hasil tindakan + Sirih trust +3
  const back = (dx, kind, days, say) => { const day = S.day + days; C.returns.push({ kind, day, ...ident(p), dx, tooth: p.tooth, say }); return day; };
  const rnd = a => a[0] + Math.floor(Math.random() * (a[1] - a[0] + 1)), cabutTx = tx === 'cabut' || tx === 'cabutSusu';
  if (cabutTx && job.out != null && tooth && C.people[p.pid]) { const o = C.people[p.pid]; o.gone = o.gone || {}; o.gone[tooth] = S.day; } // [2e-rev] gigi yang tercabut hilang di kunjungan berikutnya
  if (!opt) { // tindakan tidak cocok: kembali mengeluh; gigi yang masih bisa dirawat tapi dicabut → gosip
    const kind = cabutTx && tooth === p.tooth ? 'gossip' : 'wrong'; back(p.dx, kind, rnd(X.RETURN_DAYS)); }
  if (fail) {
    if (!nikahShield()) addRep(M.REP_FAIL); addStress(M.STRESS_FAIL); R.leave = null; // [3a-5] Raka: reputasi tidak turun
    if (opt) { const d = job.failReturn || (cabutTx && !job.abort ? 'pascaCabut' : p.dx); R.ctl = back(d, job.failReturn ? 'ctl' : 'gagal', job.failReturn ? X.CONTROL_DAYS : rnd(M.FAIL_RETURN), job.failSay || DX[d].ctlSay || 'Dok, gigi yang kemarin masih bermasalah. Bisa dilihat lagi?'); R.ctlDx = d; }
  } else if (opt && opt.next) { R.ctl = back(opt.next, 'ctl', X.CONTROL_DAYS); R.ctlDx = opt.next; }
  else if (opt && tx === 'cabut' && job.dry) { R.ctl = back('pascaCabut', 'cukup', 3, 'Dok, bekas cabutan kemarin nyeri sekali sejak semalam.'); R.ctlDx = 'pascaCabut'; }
  else if (opt && g === 'cukup' && tx !== 'konsul' && Math.random() < M.CUKUP_RETURN_P) { const d = cabutTx ? 'pascaCabut' : p.dx; R.ctl = back(d, 'cukup', rnd(X.RETURN_DAYS), 'Dok, gigi yang kemarin ditangani masih agak mengganjal. Bisa dicek lagi?'); R.ctlDx = d; }
  const errs = job.errors.map(e => e.text);
  notes.unshift('Hasil ' + GRADE[g].name.toLowerCase() + (job.abort === 'sakit' ? ' (dihentikan: pasien kesakitan)' : job.abort ? ' (dihentikan)' : '') + (errs.length ? ': ' + errs.join('; ') + '.' : '.'));
  addRecord(p, dxKey, tooth, tx, R.pay, notes.join(' '), R.ctl);
  R.min = Math.round(cs.min * (job.abort ? Math.max(.3, part) : 1)) + (job.complic ? X.COMPLIC_MIN : 0) + R.admin + brokenExtraMin(); // [rev] lampu unit rusak
  R.rep = S.repPts - rep0; R.stress = Math.round(S.stress - st0); R.fail = fail; R.exact = !!(opt && exact);
  jrProc(job, R); /* [3b-1] kontrol, diagnosis, riwayat medis, herba, warga */
  return R;
}
function afterProc(job) {
  const R = job.R, p = job.p; spendTime(R.min); leavePatient(p, R.leave); sfx('chair_down', 0.3); if (R.pay) sfx('coin_in'); sfx(R.fail ? 'patient_sad' : 'patient_happy', .5);
  if (game.overlay) return; // pingsan
  toast('+' + rupiah(R.pay) + ' · ' + CASES[job.tx].name + (R.xfee ? ' + rontgen' : '') + ' · ' + GRADE[job.grade].name, R.fail ? 'bad' : 'good');
  if (job.complic) dialog([MED[job.complic].risk + '. ' + p.name + ' perlu ditangani lebih lama. Lain kali tanyakan riwayat penyakit dan obatnya dulu.']);
}
/** Tindakan seketika tanpa minigame (pengait uji SR.perform): hasil Sempurna. */
function perform(p, dxKey, tooth, tx) {
  tx = tx || DX[dxKey].opts[0].tx; const cs = CASES[tx], C = S.clinic, job = mgJob(p, dxKey, tooth, tx, 'proc');
  if (cs.stock && C.stock >= cs.stock) C.stock -= cs.stock; job.phase = 'result'; job.R = finishProc(job); afterProc(job); return job;
}

// ---- Latihan Minigame (alat playtest; dibuka dari layar judul) ----
// Status permainan sementara (S.practice): tidak pernah disimpan, waktu/energi/stres disetel ulang tiap kali main, selesai → kembali ke daftar.
const PRACTICE = [
  { t: 'Konsultasi', s: 'Gigi sehat', tx: 'konsul', dx: 'sehat' },
  { t: 'Jelaskan rencana', s: 'Sebelum tambal', tx: 'gic', dx: 'karies', mode: 'explain' },
  { t: 'Resep', s: 'Abses', tx: 'resep', dx: 'abses' },
  { t: 'Tambal GIC', s: 'Karies dentin', tx: 'gic', dx: 'karies' },
  { t: 'Tambal GIC', s: 'Pulpitis reversibel', tx: 'gic', dx: 'pulpRev' },
  { t: 'Scaling', s: 'Gingivitis', tx: 'scaling', dx: 'ging' },
  { t: 'Scaling', s: 'Periodontitis', tx: 'scaling', dx: 'perio' },
  { t: 'Cabut gigi', s: 'Nekrosis pulpa', tx: 'cabut', dx: 'nekrosis' },
  { t: 'Cabut gigi susu', s: 'Persistensi', tx: 'cabutSusu', dx: 'persist' },
  { t: 'Devitalisasi', s: 'Pulpitis ireversibel', tx: 'devital', dx: 'pulpIrev' },
  { t: 'Mumifikasi', s: 'Pasca devitalisasi', tx: 'mumi', dx: 'pulpDevital' },
  { t: 'Open akses', s: 'Abses', tx: 'openRes', dx: 'abses' }];
const PR_BODY = { adult: 'Dewasa', old: 'Lansia', kid: 'Anak' };
const PR_RIW = [['none', 'Tidak ada'], ['known', 'Ada, sudah ditanya'], ['unknown', 'Ada, belum ditanya']];
function practiceBodies(sc) { const d = DX[sc.dx]; return d.adult && d.kid ? ['adult', 'old', 'kid'] : d.kid ? ['kid'] : ['adult', 'old']; }
function startPractice() {
  S = newState('Latih', 'W', PRESET_LOOKS.pF); S.practice = true; S.introDone = true; S.clinic.introSeen = true; S.clinic.stock = 999;
  const w = getRoom('klinik0'); S.where = { type: 'room', room: 'klinik0', door: null }; S.where.door = roomDoor(S.where); S.px = w.nx + 18; S.py = w.fh - 12; game.world = w;
  game.scene = 'play'; game.practice = game.practice || { sel: 0, body: 0, riw: 0, last: null }; fadeIn(); openPractice();
}
/** Pasien latihan: kasus dari daftar, tubuh & riwayat sesuai pilihan. */
function practicePatient(sc, body, riw) {
  const d = DX[sc.dx], kid = body === 'kid'; let g = Math.random() < .5 ? 'P' : 'W', med = null, drug = null;
  if (!kid && riw !== 'none') {
    const c = ['hipertensi', 'diabetes', 'jantung', 'hamil', 'alergi'].filter(m => MED[m].tx.includes(sc.tx) && (m !== 'hamil' || body === 'adult'));
    const m = c.length ? pickA(c) : pickA(['hipertensi', 'diabetes', 'jantung']); if (m === 'hamil') g = 'W'; if (m === 'alergi') drug = m; else med = m;
  }
  const pool = GUEST_NAMES[kid ? 'kid' + g : g], tooth = d.region ? (Array.isArray(d.region) ? pickA(d.region) : null) : pickA(kid ? d.kidTeeth : d.teeth);
  const p = { name: pickA(pool), g, body, L: guestLook(g, body), kase: d.tx, dx: sc.dx, tooth, med, drug, afford: 0, medOk: true, id: S.clinic.nextId++, st: 'chair', sayText: (kid && d.ks ? pickA(d.ks) : d.says ? pickA(d.says) : null) || d.ctlSay || '' };
  p.pid = registerPerson(p); if (riw === 'known' && (med || drug)) examOf(p).asked = ['riwayat', 'obat'];
  return p;
}
function practiceGo(i) {
  const pr = game.practice, sc = PRACTICE[i], bodies = practiceBodies(sc), body = bodies[pr.body % bodies.length];
  S.time = 9 * 60; S.energy = energyMax(); S.stress = 0;
  const p = practicePatient(sc, body, PR_RIW[pr.riw][0]);
  closeOverlay(() => startProc(p, sc.dx, p.tooth, sc.tx, sc.mode || 'proc'));
}
function openPractice() {
  const pr = game.practice, N = PRACTICE.length;
  const toBody = d => { const n = 3; pr.body = (pr.body + d + n) % n; }, toRiw = d => { pr.riw = (pr.riw + d + PR_RIW.length) % PR_RIW.length; };
  const quit = () => closeOverlay(() => { S = null; game.scene = 'title'; game.world = null; game.sceneT0 = game.t; });
  openOverlay({ kind: 'menu', t: 0,
    update() {
      this.t++;
      if (hit('esc') && this.t > 1) { quit(); return; }
      if (hit('left')) pr.sel = (pr.sel + N - 1) % N; if (hit('right')) pr.sel = (pr.sel + 1) % N;
      if (hit('up')) pr.sel = (pr.sel + N - 3) % N; if (hit('down')) pr.sel = (pr.sel + 3) % N;
      if (hit('tab')) toBody(1); if (hit('rand')) toRiw(1);
      if (input.click) { const h = topHit(input.click, /^lt/); if (h) { input.click = null; h.fn(); return; } }
      if (okHit()) practiceGo(pr.sel);
    },
    drawHD() {
      hDim(this, .55); const hv = hoverId();
      dropIn(this, 34, 14, 412, 244, () => {
        hBox(34, 14, 412, 244, 'paper', { ornate: true });
        HT('Latihan Minigame', 240, 24, MGC.ink, { k: 4, sh: '#e8b878', align: 'c' });
        HT('Main tindakan langsung, tanpa jalan ke klinik. Tidak menyimpan apa pun.', 240, 46, MGC.ink2, { align: 'c' });
        hDivider(50, 58, 380);
        PRACTICE.forEach((sc, i) => {
          const c = i % 3, r = Math.floor(i / 3), X = 50 + c * 128, Y = 64 + r * 30, id = 'lt' + i;
          if (hv === id) pr.sel = i; const on = pr.sel === i, a = stagger(this, i);
          hc.save(); hc.globalAlpha *= a;
          hBtn(X, Y, 124, 26, '', { on, hover: hv === id });
          const lt = on || hv === id; HT(fitText(sc.t, 112, true), X + 62, Y + 4, lt ? MGC.ink : MGC.lite2, { align: 'c', bold: true, sh: lt ? null : DK });
          HT(fitText(sc.s, 112), X + 62, Y + 15, lt ? MGC.ink2 : MGC.lite, { align: 'c', sh: lt ? null : DK });
          hc.restore(); clickable(X, Y, 124, 26, () => practiceGo(i), id);
        });
        const sc = PRACTICE[pr.sel], bodies = practiceBodies(sc), body = bodies[pr.body % bodies.length], kid = body === 'kid';
        const row = (Y, label, val, key, fnL, fnR, id, dis) => {
          HT(label, 50, Y + 6, MGC.ink2, { bold: true });
          hBtn(150, Y, 20, 20, '◀', { hover: hv === id + 'L' }); clickable(150, Y, 20, 20, fnL, id + 'L');
          hBox(174, Y, 150, 20, 'dark', { thin: true }); HT(val, 249, Y + 6, dis ? MGC.lite : MGC.lite2, { align: 'c', sh: DK });
          hBtn(328, Y, 20, 20, '▶', { hover: hv === id + 'R' }); clickable(328, Y, 20, 20, fnR, id + 'R');
          HT(key, 358, Y + 6, MGC.ink2);
        };
        row(190, 'Pasien', PR_BODY[body] + (bodies.length === 1 ? ' (khusus)' : ''), 'Tab', () => toBody(-1), () => toBody(1), 'ltb');
        row(214, 'Riwayat penyakit', kid ? 'Tidak ada (anak)' : PR_RIW[pr.riw][1], 'R', () => toRiw(-1), () => toRiw(1), 'ltr', kid);
        const last = pr.last ? 'Terakhir: ' + pr.last.t + ' · ' + pr.last.g : 'Klik kartu atau Enter untuk mulai';
        HT(last, 240, 240, pr.last ? (GRADE[pr.last.k] || {}).col || MGC.ink2 : MGC.ink2, { align: 'c', bold: !!pr.last });
      });
      HT('Panah pilih · Enter mulai · Esc di tindakan = jeda · Esc di sini = ke judul', 240, 262, MGC.lite, { align: 'c', sh: DK });
    } });
}

// ---- Gambar overlay ----
function drawMinigame(job, ov) {
  hv = hoverId(); hc.save(); hc.globalAlpha = ovProg(ov);
  hc.drawImage(mgBgImg(), 0, 0, CFG.W * HI, CFG.H * HI);
  const L = leafOf(job.steps[Math.min(job.i, job.steps.length - 1)], job.st);
  mgHeaderHD(job);
  hBox(4, 38, 330, 162, 'well', { shadow: false });
  hc.save(); hc.beginPath(); hc.rect(7 * HI, 41 * HI, 324 * HI, 156 * HI); hc.clip(); L.s.draw(job, L.st); mgCursor(job, L); hc.restore();
  mgInstrHD(job, L); mgPatientHD(job); mgPainHD(job); mgTrayHD(job, L); mgStripHD(job, L);
  if (job.phase === 'result') mgResultHD(job); else if (job.paused) mgPauseHD(job);
  hc.restore();
}
function mgHeaderHD(job) {
  hBox(4, 4, 472, 30, 'paper'); const tw = HT(job.title, 12, 10, MGC.ink, { k: 4, sh: '#e8b878' });
  const n = job.steps.length, res = job.phase === 'result'; let px = 468; const pills = [];
  for (let i = n - 1; i >= 0; i--) { const w = Math.max(14, hW(String(i + 1), true) + 8); px -= w; pills.unshift([px, w, i]); px -= 3; }
  pills.forEach(([X, w, i]) => {
    const done = i < job.i || res, on = i === job.i && !res;
    hR(X, 11, w, 16, on ? '#7a4a10' : done ? '#2e6a34' : '#7a5030'); hR(X + .5, 11.5, w - 1, 15, on ? '#ffd86a' : done ? '#6ad46a' : '#e8c898');
    hR(X + .5, 11.5, w - 1, 1, on ? '#fff2b8' : done ? '#b8f0a8' : '#fff0d0'); hR(X + .5, 25.5, w - 1, 1, on ? '#c8902a' : done ? '#3a8a3a' : '#c8a070');
    HT(String(i + 1), X + w / 2, 15.5, on ? '#5a2a04' : done ? '#14401a' : '#7a5030', { bold: true, align: 'c' });
  });
  const nm = res ? 'Hasil' : job.steps[job.i].name || '', room = px - 8 - (12 + tw + 12);
  if (room > 30) HT(fitText(nm, room, true), px - 8, 15.5, MGC.ink2, { bold: true, align: 'r' });
}
function mgInstrHD(job, L) {
  hBox(4, 204, 330, 28, 'dark'); const s = L.s, code = s.code || 'PILIH', col = MG_IN[code], cw = hW(code, true) + 10;
  hR(9, 207, cw, 13, '#081312'); hR(9.5, 207.5, cw - 1, 12, mixH(col, '#000000', .55)); hR(9.5, 207.5, cw - 1, 1, col); HT(code, 14, 210, col, { bold: true });
  const key = s.key || MG_KEYS[code], kw = HT(key, 15 + cw, 210, MGC.lite2, { sh: DK });
  if (s.warn && 15 + cw + kw + 10 + hW(s.warn, true) <= 327) HT(s.warn, 327, 210, MGC.warn, { bold: true, align: 'r', sh: DK });
  const t = job.phase === 'result' ? 'Tindakan selesai.' : job.paused ? 'Dijeda.' : (s.instr || ''); HT(fitText(t, 316), 10, 221, MGC.lite, { sh: DK });
}
function mgPatientHD(job) {
  const p = job.p, expr = job.phase === 'result' ? (job.grade === 'gagal' ? 'sad' : 'happy') : job.pain >= 70 ? 'angry' : job.pain >= 35 ? 'sad' : 'neutral';
  hBox(338, 38, 138, 70, 'paper'); hInset(344, 44, 32, 32, '#f6dcb0'); hc.drawImage(faceImg(p, expr), 345 * HI, 45 * HI, 60, 60);
  HT(fitText(p.name, 88, true), 382, 45, MGC.ink, { bold: true });
  const flags = [[TRAITS[traitOf(p)].name, TRAITS[traitOf(p)].col]], km = knownMed(p); if (km.length) flags.push([MED_SHORT[km[0]] + (km.length > 1 ? ' +' + (km.length - 1) : ''), '#b02030']);
  flags.forEach(([t, c], i) => { const Y = 56 + i * 11; hR(382, Y, 8, 8, mixH(c, '#000000', .3)); hR(382, Y, 7.5, 7.5, c); hR(382, Y, 7.5, .5, 'rgba(255,255,255,.5)'); HT('!', 384.5, Y + 1, '#ffffff', { bold: true }); HT(fitText(t, 76, true), 394, Y + .5, c, { bold: true }); });
  const dk = job.dxKey || p.dx; HT(fitText('Dx: ' + DX[dk].name, 126), 344, 82, MGC.ink);
  HT(fitText((job.tooth ? 'Gigi ' + job.tooth : DX[dk].region ? 'Semua gigi' : 'Gigi ' + (p.tooth || '-')) + (job.nurseId ? ' · Perawat ' + staffName(job.nurseId) : ' · alat T' + (S.clinicStage >= 2 ? 2 : 1)), 126), 344, 94, job.nurseId ? '#2e7a34' : MGC.ink2, { bold: !!job.nurseId });
}
function mgPainHD(job) {
  hBox(338, 112, 138, 40, 'paper'); HT('Sakit', 346, 117, MGC.ink, { bold: true }); const v = Math.round(job.pain);
  HT(String(v), 468, 117, v >= 70 ? MGC.red : MGC.ink, { bold: true, align: 'r' });
  hBar(346, 127, 122, 9, v / 100, v >= 70 ? '#e6383e' : v >= 40 ? '#f07a3a' : '#f0a848'); const mx = 346 + 122 * .7; hR(mx - .5, 126, 1, 11, '#7a1010'); hR(mx - 1.5, 125, 3, 1, '#7a1010');
  const b = job.bius === 'tanpa' ? 'Tanpa bius' : BIUS_INFO[job.bius][0] + (job.B ? ' ' + Math.round(job.B * 100) + '%' : ''); HT(fitText(b + (job.kid ? ' · anak ×1.3' : ''), 122), 346, 140, MGC.ink2);
}
function mgTrayHD(job, L) {
  hBox(338, 156, 138, 76, 'paper'); HT('Baki alat', 346, 161, MGC.ink, { bold: true });
  const tier = 'T' + (S.clinicStage >= 2 ? 2 : 1), bw = hW('ALAT') + hW(tier, true) + 14, bx = 470 - bw; hR(bx, 159.5, bw, 12, '#5a2e10'); hR(bx + .5, 160, bw - 1, 11, '#ffe7a8'); HT('ALAT', bx + 4, 162, MGC.ink2); HT(tier, bx + bw - 4, 162, MGC.red, { bold: true, align: 'r' });
  const s = L.s, urut = s.urut && job.phase === 'play' && !job.paused;
  const items = s.urut ? s.items(job, L.st) : (job.tray || []).map(([id, lb, ic, lock]) => ({ id, lb, ic, lock, on: s.tool === id, done: job.used.includes(id) }));
  items.slice(0, 6).forEach((it, i) => {
    const X = 344 + (i % 2) * 66, Y = 174 + Math.floor(i / 2) * 19, hov = urut && hv === 'mgt' + i;
    if (it.on || hov) { hR(X - 1, Y - 1, 22, 20, '#b07a1a'); }
    hInset(X, Y, 20, 18, it.bad ? '#ffb0a8' : it.on || hov ? '#fff1b8' : '#f2d9a8'); hc.drawImage(tool(it.ic), Math.round((X + 2) * HI), Math.round((Y + 1) * HI), 32, 32);
    if (it.lock) { hLine(X + 3, Y + 15, X + 17, Y + 3, '#d8303a'); hLine(X + 3.5, Y + 15, X + 17.5, Y + 3, '#d8303a'); }
    if (it.done) { hR(X + 13, Y + 10, 7, 7, '#2e7a34'); HT('✓', X + 16.5, Y + 10.5, '#ffffff', { bold: true, align: 'c' }); }
    HT(fitText(it.lb, 41, it.on), X + 23, Y + 5, it.on || hov ? MGC.red : it.lock ? '#9a5a5a' : MGC.ink, { bold: it.on || hov });
    if (urut) clickable(X - 1, Y - 1, 64, 20, () => s.pick(job, L.st, it.id), 'mgt' + i);
  });
}
function mgStripHD(job, L) {
  hBox(4, 236, 472, 30, 'paper'); HT('Herba', 11, 247, MGC.ink, { bold: true });
  herbStripHD(job); // [2g]
  const bs = job.phase === 'play' && !job.paused && L.s.buttons ? L.s.buttons(job, L.st) || [] : [];
  let bx = 470; const ws = bs.map(b => hW(b.label, true) + 22);
  if (!bs.length || 236 + hW('Esc = jeda') + 8 <= 470 - ws.reduce((a, w) => a + w + 5, 0)) HT('Esc = jeda', bs.length ? 236 : 470, 247, MGC.ink2, { align: bs.length ? 'l' : 'r' });
  for (let i = bs.length - 1; i >= 0; i--) {
    const b = bs[i], w = ws[i]; bx -= w; const hov = hv === 'mgb' + i;
    hBtn(bx, 240, w, 21, b.label, { kind: b.off ? 'dark' : hov ? 'gold' : i === bs.length - 1 ? null : 'paper', on: !b.off && i === bs.length - 1 && !hov, bold: true });
    if (b.off) { hc.fillStyle = 'rgba(70,50,30,.45)'; hc.fillRect(Math.round(bx * HI), 240 * HI, Math.round(w * HI), 21 * HI); }
    clickable(bx, 240, w, 21, () => { if (b.off) { sfx('ui_deny'); if (b.offMsg) toast(b.offMsg, 'bad'); } else { sfx('ui_click'); b.fn(); } }, 'mgb' + i); bx -= 5;
  }
}
const CUR_OFF = { bur: [-14, -1], scl: [-15, -4], cot: [-8, -8], dry: [-15, -8] };
function mgCursor(job, L) {
  if (L.s.code !== 'GOSOK' || job.phase !== 'play' || job.paused || !L.st.g) return; const m = input.mouse; if (!inWork(m)) return;
  const g = L.st.g; hc.strokeStyle = input.mdown ? 'rgba(255,216,106,.95)' : 'rgba(255,255,255,.6)'; hc.lineWidth = 1; hc.beginPath(); hc.arc(m.x * HI + 1, m.y * HI + 1, (g.r + .5) * g.k * HI, 0, Math.PI * 2); hc.stroke();
  const k = L.s.cursor || 'bur', o = CUR_OFF[k] || [-8, -8]; drawLo(tool(k), m.x + o[0], m.y + o[1]);
}
function mgPauseHD(job) {
  hc.fillStyle = 'rgba(10,6,4,.5)'; hc.fillRect(0, 0, CFG.W * HI, CFG.H * HI);
  const W = 280, H = 92, X = 100, Y = 80; hBox(X, Y, W, H, 'paper', { ornate: true }); HT('Jeda', 240, Y + 9, MGC.ink, { k: 4, sh: '#e8b878', align: 'c' }); hDivider(X + 14, Y + 34, W - 28);
  HT('Hentikan = hasil Gagal, dibayar sebagian.', 240, Y + 42, MGC.ink2, { align: 'c' });
  [['Lanjut', () => { job.paused = false; sfx('pause_off'); }], ['Hentikan tindakan', () => mgAbort(job, 'henti')]].forEach(([lb, fn], i) => {
    const bw = (W - 28 - 8) / 2, bx = X + 14 + i * (bw + 8); hBtn(bx, Y + 60, bw, 21, lb, { kind: hv === 'mgp' + i ? 'gold' : i ? 'paper' : null, on: i === 0, bold: true }); clickable(bx, Y + 60, bw, 21, fn, 'mgp' + i); });
}
const MED_SHORT = { hipertensi: 'Hipertensi', diabetes: 'Diabetes', jantung: 'Jantung', pacu: 'Pacu jantung', hamil: 'Hamil', alergi: 'Alergi' };
const sgn = n => (n >= 0 ? '+' : '-') + Math.abs(Math.round(n));
const pct = c => Math.round(c * 100) + '%';
function mgResultRows(job) {
  const rows = [], W = 284, add = (t, c, b) => hWrap(t, W, b).forEach(l => rows.push([l, c, b])), p = job.p;
  add((job.mode === 'explain' ? 'Konsultasi sebelum ' + CASES[job.tx].name : CASES[job.tx].name) + ' · ' + p.name, MGC.ink2);
  if (job.abort) add(job.abort === 'sakit' ? 'Dihentikan: pasien terlalu kesakitan.' : 'Dihentikan olehmu.', MGC.red, true);
  if (job.tx === 'konsul' || job.mode === 'explain') job.kLog.forEach(([lb, ok]) => add((ok ? '✓ ' : '× ') + lb + (ok ? ' tepat' : ' kurang tepat'), ok ? '#2e6a34' : MGC.red));
  else if (job.errors.length) job.errors.slice(0, 5).forEach(e => add('× ' + e.text + (e.sev === 'major' ? ' (berat)' : ''), MGC.red, e.sev === 'major'));
  else if (!job.abort) add('✓ Semua langkah rapi' + (job.painMax >= CFG.MG.PAIN_WARN ? ', tapi pasien sempat sangat kesakitan' : '') + '.', '#2e6a34');
  (job.score || []).forEach(([nm, f]) => { const M = CFG.MG, t = f >= M.DRILL_GOOD ? 'Bersih' : f >= M.DRILL_MIN ? 'Kurang bersih' : 'Belum cukup'; add((f >= M.DRILL_GOOD ? '✓ ' : '× ') + nm + ': ' + t.toLowerCase(), f >= M.DRILL_GOOD ? '#2e6a34' : '#a8700a'); });
  if (job.mode === 'explain') { add('Peluang pasien setuju: ' + pct(job.c0) + ' jadi ' + pct(job.c1), MGC.ink, true); return rows; }
  const R = job.R; rows.push(['', null]);
  add('Bayaran ' + rupiah(R.pay) + (job.payFrac != null && job.payFrac < 1 ? ' (sebagian)' : '') + ' · Reputasi ' + sgn(R.rep), MGC.ink, true);
  add('Energi -' + R.energy + ' · Stres ' + sgn(R.stress) + ' · Waktu ' + R.min + ' menit', MGC.ink);
  if (R.trust) add(R.trust, '#8a4a1a', true); // [3a-2] baris Trust pasien warga (ACC user 2026-11-15, design/v3/draf-3a2-hasil-trust.png)
  if (R.ctl) add('Kembali ' + dayLabel(R.ctl) + (R.ctlDx ? ': ' + DX[R.ctlDx].name.toLowerCase() : '') + '.', '#2a4a7a', true);
  return rows;
}
function mgResultHD(job) {
  hc.fillStyle = 'rgba(10,6,4,.45)'; hc.fillRect(0, 0, CFG.W * HI, CFG.H * HI);
  const rows = mgResultRows(job), W = 312, H = 44 + rows.length * 11 + 34, X = 240 - W / 2, Y = Math.max(14, Math.round((270 - H) / 2)), e = easeBack(clamp((game.t - job.rt) / .3, 0, 1));
  hc.save(); hc.translate(0, Math.round((e - 1) * 18 * HI));
  hBox(X, Y, W, H, 'paper', { ornate: true }); const g = GRADE[job.grade];
  HT(g.name, 240, Y + 9, g.col, { k: 4, sh: '#e8b878', align: 'c' }); hDivider(X + 14, Y + 34, W - 28);
  let y = Y + 41; rows.forEach(([t, c, b]) => { if (t) HT(t, X + 14, y, c || MGC.ink, { bold: b }); y += 11; });
  const lb = job.mode === 'explain' ? 'Tawarkan rencana' : 'Selesai', bw = hW(lb, true) + 44, bx = 240 - bw / 2;
  hBtn(bx, Y + H - 27, bw, 20, lb, { on: true, bold: true }); clickable(bx, Y + H - 27, bw, 20, () => mgClose(job), 'mgr0');
  hc.restore();
}

/*@include npc*/ // [3a] tools/build-game.cjs menyisipkan src/npc-data.js + src/npc3a.js di sini

/* =============================== BOOT =============================== */
if (/[?&#]uji=klinik2(?!\w)/.test(location.search + location.hash)) setTimeout(startUji, 0); // [uji] index.html?uji=klinik2


let last = performance.now();
function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000); last = now;
  step(dt); render();
  requestAnimationFrame(frame);
}
/** Satu langkah logika game. */
function step(dt) {
  game.t += dt; game.dt = dt;
  if (game.scene !== game.lastScene) { game.lastScene = game.scene; game.sceneT0 = game.t; }
  hitsPrev = hits; hits = [];
  uiSounds();
  if (hit('mute') && !game.textInput) { au.set.mute = !au.set.mute; audioSave(); }
  if (game.scene === 'title') updateTitle();
  else if (game.scene === 'create') updateCreate();
  else if (game.scene === 'trans') updateTrans(dt);
  else if (game.scene === 'play') { updatePlay(dt); updateRain(dt); }
  updateFade(dt);
  updateAudio();
  input.pressed.clear(); input.click = null; input.rclick = null; input.typed.length = 0;
}
function render() {
  const c = lctx; c.imageSmoothingEnabled = false;
  if (game.scene === 'title') drawTitle(c);
  else if (game.scene === 'create') drawCreate(c);
  else if (game.scene === 'trans') drawTrans(c);
  else if (game.scene === 'play') { drawWorld(c); drawHUD(c); }
  // tampilkan dunia 2×, lalu UI HD di atasnya, lalu layar gelap transisi
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.imageSmoothingEnabled = false; ctx.drawImage(lo, 0, 0, CFG.W * HI, CFG.H * HI);
  if (game.scene === 'title') drawTitleHD();
  else if (game.scene === 'create') drawCreateHD();
  else if (game.scene === 'trans') drawTransHD();
  else if (game.scene === 'play') { const mgOv = game.overlay && game.overlay.kind === 'mg'; drawPromptHD(); drawHUDHD(); drawClinicHD(); if (!mgOv) drawToastsHD(); if (game.overlay && game.overlay.drawHD) game.overlay.drawHD(); if (mgOv) drawToastsHD(); }
  ctx.setTransform(HI, 0, 0, HI, 0, 0); drawFade(ctx); ctx.setTransform(1, 0, 0, 1, 0, 0);
}

/** Pengait uji & bukti QA (dipakai saat menguji di browser; tidak mengubah aturan main). */
window.SR = {
  get S() { return S; }, game, CFG,
  rel: { gift: openGift, give: giveGift, shop: openGiftShop, card: eventCard, choice: eventChoice, dialog, st: relSt, add: addRel, ready: relReady, janji: relJanji, play: (id, n) => playEvent(id, { n }), finish: (id, n, v) => finishEvent(id, evOf(id, n), v), talkRel: relTalk, lineOk: relLineOk, taste: tasteOf, list: giftList, toast: relToast }, // [3a-4] pengait uji
  nikah: NIKAH_SR, // [3a-5] pengait uji
  hang: { open: openHang, run: doHang, hadir: hangHadir, block: hangBlock, fokusMul: () => fokusMul(), kinds: () => hangKinds() }, // [3a-3] pengait uji
  jr: JR_TEST, /* [3b-1] */ npc: { act: npcAct, now: npcNow, place: npcPlaceAt, route: npcRoute, sync: npcSync, talk: talkNpc, book: openBook, pick: pickLine, trust: addTrust, where: npcWhereText, segs: npcSegs, hireStaff, roster: NPC_ROSTER,
    scene: pendingScene, play: playScene, sikap: sikapPages, wargaDay, wargaVisit, wargaCands, consentT: trustConsent, care: careTrust, once: trustOnce, win: wargaWin, mark: npcMark, seedPrice, friendDisc }, // [3a] pengait uji (+ [3a-2])
  openGarden, openSeedShop, openBuild, gardenNewDay, gardenResize, gardenRefresh, plantStage, houseNewDay, newDay, payRent, currentAction: () => currentAction(), // [2g] pengait uji
  stars: () => stars(), repFromOld, opsNewDay, opsTick, openRepair, brokenBlocks, openDesk, meanGap: () => meanGap(), // [rev] pengait uji
  setTime(h) { S.time = h * 60; }, setDay(d) { S.day = d; },
  warp(zone, x, y) { S.where = { type: 'zone', zone }; S.px = x; S.py = y; game.world = getZone(zone); game.scene = 'play'; game.overlay = null; },
  room(k) { const w = getRoom(k); S.where = { type: 'room', room: k, door: null }; S.where.door = roomDoor(S.where); S.px = w.nx + 18; S.py = w.fh - 12; game.world = w; game.scene = 'play'; },
  key(k, down) { if (down === false) input.down.delete(k); else { input.pressed.add(k); if (down) input.down.add(k); } },
  /** Simpan screenshot kanvas (diperbesar 2×) ke production/qa/evidence lewat tools/dev-server.cjs. */
  async shot(name, k = 2) { const [c, x] = cv(480 * k, 270 * k); x.imageSmoothingEnabled = false; x.drawImage(cvs, 0, 0, 480 * k, 270 * k);
    const blob = await new Promise(r => c.toBlob(r, 'image/png')); const res = await fetch('/__evidence?name=' + encodeURIComponent(name), { method: 'POST', body: blob }); return res.text(); },
  debug(on) { game.debug = on; },
  /** Klinik (uji 2b): datangkan pasien, majukan waktu, bersihkan semua titik. */
  spawn(n = 1) { for (let i = 0; i < n; i++) spawnPatient(S.time); }, spend: m => spendTime(m), cleanAll() { S.clinic.cleaned = CLEAN_SPOTS.map(c => c.id); if (game.world && game.world.key === 'klinik0') game.world = getRoom('klinik0'); },
  sleep() { sleep(); }, CLEAN_SPOTS, CLINIC_POS,
  /** Alur periksa (uji 2c). */
  /** Minigame (uji 2d): job aktif, selesaikan langkah sekarang (good=true benar / false salah), mulai tindakan langsung. */
  mg: () => game.overlay && game.overlay.job, startProc, mgJob, MG_BUILD, setScaling, setBor, traitOf,
  mgAuto(good = true) { const j = game.overlay && game.overlay.job; if (!j || j.phase !== 'play') return null; let s = j.steps[j.i], st = j.st; if (s.subs) { st = st.sub; s = s.subs[j.st.k]; } s.auto(j, st, good); return { step: j.i, name: j.steps[j.i].name, errors: j.errors.length }; },
  DX, MED, TEETH, band, tariff, tariffMul, consentChance, perform, openExam, openTariff, openRecords, openManage, proposePlan, offer, refer, planOpts, rmCode, nextGap, examAsk, examCheck, finding, examOf, knownMed,
  chair() { return S.clinic.patients.find(p => p.st === 'chair'); },
  /** Klinik tahap 2 (uji 2e). */
  openStaff, openUpgrade, hireStaff, fireStaff, trainStaff, staffOn, staffEff, staffNewDay, queueMax, patienceMin, adminMin, xrayOf, examXray, examTools, callPatient, clinicNewDay, openDesk,
  sprite: (look, dir, step) => playerSprite(look, dir, step), LOOK_OPTS, au, sfx, bgmWanted,
  /** Gambar satu zona utuh + kotak tabrakan/pintu (alat bantu uji). */
  async zoneDebug(id, name) { const w = getZone(id); const [c, x] = cv(w.w, w.h); x.drawImage(w.bg, 0, 0); w.ents.slice().sort((a, b) => a.z - b.z).forEach(e => x.drawImage(e.img, e.X, e.Y)); debugDraw(x, w, 0, 0);
    (w.doors || []).forEach(d => T(x, d.k, d.r[0], d.r[1] + 20, '#ffffff', 9)); const blob = await new Promise(r => c.toBlob(r, 'image/png')); return (await fetch('/__evidence?name=' + name, { method: 'POST', body: blob })).text(); },
  /** Simulasi sinkron: tahan tombol keys selama sec detik (60 langkah/detik), lalu gambar. */
  sim(sec, keys = [], tap = []) { tap.forEach(k => input.pressed.add(k)); keys.forEach(k => input.down.add(k)); for (let i = 0; i < Math.round(sec * 60); i++) { step(1 / 60); tap.length = 0; } keys.forEach(k => input.down.delete(k)); render(); return { scene: game.scene, where: S && S.where, x: S && S.px, y: S && S.py, time: S && S.time }; },
  newGame(name = 'Nadia', gender = 'W', preset = 'pH') { game.create = { name, gender, look: { ...PRESET_LOOKS[preset] }, focus: 9 }; finishCreate(); game.overlay = null; },
};
requestAnimationFrame(frame);
})();
