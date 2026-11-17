// ---- [3b-1] Jurnal & challenge (GDD §15 "Aturan Jurnal", ACC user 2026-11-17; draf UI design/v3/jurnal-game.html ACC 2026-11-17) ----
// Slot 1 = satu challenge urutan musim, slot 2 = challenge event/cerita (maks 2 aktif). Tonggak = Pencapaian, tercatat otomatis tanpa slot.
// Ganti musim: challenge musim lama yang belum selesai dilewati, muncul lagi tahun berikutnya. Setiap challenge punya pemicu & imbalan sendiri.
CFG.JURNAL = { // [3b]
  STOCK_SAFE: 30, STOCK_LOW: 5, STRESS_TRIG: [50, 80], STRESS_SAFE: 80, // #6/#9/#10/#19
  K21_DAY: 40, // #21 muncul hari Kemarau 40
  T2_DISC: 0.05, T3_DISC: 0.10, // #27 rak T2, #37 alat T3 (dipakai di 3b-2 / 3b-4)
  SLEEP_STRESS_EXTRA: -5, // #19
  SERAI_ENERGY: 10, // #12 resep jamu: wedang serai jahe juga energi +10
};
/** 39 challenge: [nama, musim K/H/F, jenis s=urutan e=event t=tonggak, tujuan, target, batas hari (0 = tanpa), pemicu, imbalan]. */
const CHL = [
  ['Bersihkan Ruko', 'K', 's', 'Bersihkan semua titik kotor di Ruko Tua.', 6, 0, 'Surat Pak Harjo dibaca', 'Rp 500rb dari Pak Harjo · Trust Pak Harjo +5'],
  ['Kenalan 8 warga', 'K', 's', 'Ngobrol dengan 8 warga Rimbasari.', 8, 7, 'Ruko selesai dibersihkan', 'Roti Manis x3 · Trust Bu Ratna +5'],
  ['Buka Praktik', 'K', 't', 'Renovasi ruko dan buka praktik pertama.', 1, 0, 'Renovasi selesai', 'Reputasi +10'],
  ['Rawat 5 warga', 'K', 's', 'Tangani 5 warga yang datang sebagai pasien.', 5, 0, 'Pasien warga pertama datang', 'Trust +3 ke kelima warga'],
  ['Panen herba pertama', 'K', 's', 'Panen satu tanaman herba di kebun rumah.', 1, 0, 'Bibit pertama ditanam', '3 bibit Cengkeh dari Mbah Darmi'],
  ['Pesan lewat Kantor Pos', 'K', 's', 'Pesan bahan atau alat lewat Kantor Pos.', 1, 5, 'Stok klinik tinggal 5', 'Ongkir gratis pesanan berikutnya'],
  ['Pameran: menang tebak-tebakan', 'K', 'e', 'Menangkan tebak-tebakan anak di Pameran Gigi Sehat.', 1, 1, 'Hari Kemarau 15', 'Reputasi +15 · Trust Bu Sinta & Bu Endang +5'],
  ['Rawat Dimas tanpa menangis', 'K', 's', 'Selesaikan tindakan Dimas tanpa dia kesakitan.', 1, 0, 'Dimas datang sebagai pasien', 'Gambar dari Dimas · Trust Bu Endang +8'],
  ['Stok aman 7 hari', 'K', 's', 'Jaga stok bahan klinik minimal 30 selama 7 hari.', 7, 0, 'Stok pertama kali habis', '1 paket bahan gratis'],
  ['Tiga jenis nongkrong', 'K', 's', 'Coba 3 jenis tempat nongkrong yang berbeda.', 3, 10, 'Stres pertama kali di atas 50', 'Kopi Susu x3'],
  ['Tiga kontrol ulang', 'K', 's', 'Tangani 3 pasien yang datang kontrol ulang.', 3, 0, 'Jadwal kontrol pertama dibuat', 'Rp 300rb · Reputasi +10'],
  ['Ngobrol Mbah Darmi 7 hari', 'K', 's', 'Ngobrol dengan Mbah Darmi 7 hari berturut-turut.', 7, 0, 'Trust Mbah Darmi 20', 'Resep jamu: wedang serai jahe juga energi +10'],
  ['Reputasi ★2', 'K', 't', 'Capai reputasi bintang 2.', 1, 0, '-', 'Rp 1jt dari Pak Harjo'],
  ['Darurat Pak Bowo', 'K', 'e', 'Tolong Pak Bowo di Kebun Kopi sebelum malam.', 1, 1, 'Hari Panen Kopi (Kemarau 35)', 'Biji Kopi x5 · Trust Pak Bowo +10'],
  ['Klinik tahap 2', 'K', 't', 'Upgrade klinik menjadi Klinik Gigi.', 1, 0, '-', 'Reputasi +20'],
  ['Rekrut staf pertama', 'K', 't', 'Rekrut satu staf klinik.', 1, 0, '-', 'Pelatihan pertama gratis'],
  ['Lima karies tersembunyi', 'K', 's', 'Temukan 5 karies sela gigi lewat rontgen.', 5, 0, 'Rontgen pertama', 'Rp 500rb · Reputasi +15'],
  ['Tiga Malam Minggu', 'K', 's', 'Ikut Karaoke Malam Minggu 3 kali.', 3, 0, 'Sabtu pertama setelah #2', 'Trust +3 ke semua yang pernah ikut karaoke'],
  ['Stres terjaga 14 hari', 'K', 's', 'Jaga Stres di bawah 80 selama 14 hari.', 14, 0, 'Stres pertama kali di atas 80', 'Tidur menurunkan Stres 5 lebih banyak'],
  ['Pesta Rakyat: menang', 'K', 'e', 'Menangkan tebak-tebakan warga di Pesta Rakyat.', 1, 1, 'Hari Kemarau 55', 'Reputasi +15 · hadiah undian'],
  ['Pendapatan Kemarau 5jt', 'K', 's', 'Kumpulkan pendapatan klinik 5jt di Musim Kemarau.', 5000000, 21, 'Hari Kemarau 40', 'Pajak berikutnya setengah (saran Adji)'],
  ['Lima rujukan Puskesmas', 'H', 's', 'Rujuk 5 pasien ke dr. Galih di Puskesmas.', 5, 20, 'Rujukan pertama ke dr. Galih', 'Trust dr. Galih & Wulan +8'],
  ['Herba ke 10 pasien', 'H', 's', 'Berikan herba ke 10 pasien.', 10, 0, 'Sirih pertama kali dipakai', '+1 pot kebun'],
  ['Tanam Pohon: pos periksa', 'H', 'e', 'Periksa gigi 5 warga di pos Lereng Bukit.', 5, 2, 'Hari Hujan 10', 'Bibit pohon buah · Trust peserta +5'],
  ['Staf Skill Lv3', 'H', 't', 'Latih satu staf sampai Skill Lv3.', 1, 0, '-', 'Pelatihan berikutnya setengah harga'],
  ['Pajak 3x tepat waktu', 'H', 's', 'Bayar pajak 3 kali tanpa tunggakan.', 3, 0, 'Pajak pertama dipotong', 'Rp 1jt pengembalian pajak'],
  ['Harga teman Koh Hendra', 'H', 's', 'Capai Trust 40 dengan Koh Hendra.', 40, 0, 'Trust Koh Hendra 20', 'Diskon tambahan 5% rak T2'],
  ['Bakti Sosial 8 pasien', 'H', 'e', 'Periksa 8 pasien di Bakti Sosial.', 8, 1, 'Hari Hujan 25', 'Reputasi +20 · Trust Pak Harjo +10'],
  ['Satu Keluarga Sehat', 'H', 's', 'Rawat Bu Endang dan Dimas dalam satu minggu.', 2, 7, 'Trust Bu Endang 40', 'Seragam klinik dari Bu Endang'],
  ['Tim lengkap', 'H', 't', 'Punya semua jenis staf sekaligus (tahap 3).', 1, 0, '-', 'Foto tim di dinding · energi semua staf +1 Lv'],
  ['Klaim: periksa ulang', 'H', 'e', 'Periksa ulang gigi Pak Gunawan dengan rontgen.', 1, 3, 'Bab 3: klaim Pak Gunawan', 'Reputasi pulih · Trust Pak Gunawan +10'],
  ['Pak Joni', 'H', 'e', 'Edukasi 5 warga, lalu lapor Pak Lurah.', 5, 10, 'Bab 3: lapak Pak Joni', 'Joni jadi rujukan gigi palsu · Trust +5 ke 5 warga'],
  ['Malam Lampion bersama', 'H', 'e', 'Lepas lampion bersama seseorang.', 1, 1, 'Hari Hujan 45', 'Hubungan +10 atau Trust +10'],
  ['Semua warga Akrab', 'H', 't', 'Capai Trust 40 dengan semua 12 warga.', 12, 0, '-', 'Plakat warga kehormatan · Reputasi +30'],
  ['Klinik tahap 3', 'H', 't', 'Upgrade menjadi Klinik Gigi Lengkap.', 1, 0, '-', 'Reputasi +20'],
  ['Pidato Syukuran', 'H', 'e', 'Berpidato di Syukuran Akhir Tahun.', 1, 1, 'Hari Hujan 60', 'Reputasi +20 · Trust +5 ke semua yang hadir'],
  ['PSA pertama', 'F', 't', 'Selesaikan PSA pertama (K1 dan K2).', 1, 0, '-', 'Surat Bu Melinda: diskon alat T3 10%'],
  ['Diagnosis tepat 20x', 'F', 't', 'Diagnosis tepat 20 kali berturut-turut.', 20, 0, '-', 'Reputasi +30'],
  ['Lima pasien riwayat medis', 'F', 't', 'Tangani benar 5 pasien dengan riwayat medis.', 5, 0, '-', 'Tensimeter digital: Trust dr. Galih +10 · Reputasi +10'],
];
/** Nama pendek untuk chip HUD dan kartu. */
const CH_SHORT = { 6: 'Pesan via Pos', 7: 'Pameran', 8: 'Rawat Dimas', 12: 'Ngobrol Darmi', 17: 'Karies tersembunyi', 19: 'Stres terjaga', 20: 'Pesta Rakyat', 21: 'Pendapatan 5jt', 22: 'Rujukan Puskesmas', 24: 'Pos periksa', 26: 'Pajak tepat waktu', 27: 'Harga teman', 28: 'Bakti Sosial', 29: 'Keluarga Sehat', 31: 'Klaim', 33: 'Malam Lampion', 36: 'Pidato Syukuran' };
const CH_TYPE = { s: ['Urutan', '#3a6a9a'], e: ['Event', '#a0285a'], t: ['Pencapaian', '#7a5a10'] };
const CH_ST = { done: ['Selesai', '#2e7a34'], aktif: ['Aktif', '#a8700a'], skip: ['Terlewat', '#8a3a2a'], tunggu: ['Menunggu pemicu', '#8a6a4a'], belum: ['Berjalan', '#8a6a4a'] };
const WARGA12 = ['harjo', 'ratna', 'darmi', 'dimas', 'endang', 'bowo', 'sri', 'sinta', 'slamet', 'tari', 'ilham', 'wiryo'];
const chFmt = (n, v) => CHL[n - 1][4] >= 1e6 ? rupiah(v || 0) : String(v || 0);
const chName = n => CH_SHORT[n] || CHL[n - 1][0];
const chSea = n => CHL[n - 1][1] === 'K' ? 'kemarau' : CHL[n - 1][1] === 'H' ? 'hujan' : null;
const seaAbs = () => Math.floor((S.day - 1) / CFG.SEASON_DAYS);
/** State Jurnal di save. st[n] = { s, p, day0, set, base }. trig[n] = pemicu pernah terjadi. f = imbalan berupa efek. c = penghitung lintas challenge. */
function jrSt() {
  if (!S.jr) { S.jr = { st: {}, trig: {}, done: [], q: [], f: {}, c: { earnSea: 0 }, sea: seaAbs(), dayRun: S.day };
    for (let n = 1; n <= 39; n++) S.jr.st[n] = { s: CHL[n - 1][2] === 't' ? 'belum' : 'tunggu', p: 0 }; }
  S.challenges = S.jr.done; return S.jr;
}
const jrDone = n => jrSt().st[n].s === 'done';
const jrActive = () => { const J = jrSt(); return Object.keys(J.st).map(Number).filter(n => J.st[n].s === 'aktif').sort((a, b) => (CHL[a - 1][2] === 'e') - (CHL[b - 1][2] === 'e')); };
const jrLeft = n => { const s = jrSt().st[n], dl = CHL[n - 1][5]; return dl && s.day0 != null ? s.day0 + dl - S.day : null; };
/** Pemicu yang dicek dari keadaan (dipanggil tiap menit game). Pemicu dari kejadian lewat jrEv. */
const JR_TRIG = {
  1: () => true, 2: () => jrDone(1),
  6: () => S.clinicStage >= 1 && S.clinic.stock <= CFG.JURNAL.STOCK_LOW, 9: () => S.clinicStage >= 1 && S.clinic.stock <= 0,
  10: () => S.stress > CFG.JURNAL.STRESS_TRIG[0], 12: () => trustOf('darmi') >= 20, 18: () => jrDone(2) && wdIdx() === 5,
  19: () => S.stress > CFG.JURNAL.STRESS_TRIG[1], 21: () => season().key === 'kemarau' && dayOfSeason() >= CFG.JURNAL.K21_DAY,
  27: () => trustOf('hendra') >= 20, 29: () => trustOf('endang') >= 40,
};
/** Kemajuan yang dibaca dari keadaan. Lainnya dihitung lewat jrEv selama challenge aktif. */
const JR_PROG = {
  1: () => S.clinicStage >= 1 ? CLEAN_SPOTS.length : S.clinic.cleaned.length, 2: () => WARGA12.filter(npcMet).length,
  21: () => jrSt().c.earnSea, 27: () => trustOf('hendra'),
  3: () => +(S.clinicStage >= 1), 13: () => +(stars() >= 2), 15: () => +(S.clinicStage >= 2), 16: () => +Object.values(S.staff || {}).some(Boolean),
  25: () => +Object.values(S.staff || {}).some(st => st && st.skill >= 3), 30: () => +(S.clinicStage >= 3 && Object.keys(STAFF_ROLES).every(r => staffOf(r))),
  34: () => WARGA12.filter(id => trustOf(id) >= 40).length, 35: () => +(S.clinicStage >= 3), 37: () => +!!jrSt().c.psa,
};
CHL[0][4] = CLEAN_SPOTS.length;
/** Imbalan tiap challenge (GDD §15). Efek jangka panjang dicatat di S.jr.f dan dibaca oleh sistem terkait. */
function jrBag(k, n) { const F = S.food; if (foodSlots(F.bag) < FD.BAG_MAX || F.bag[k]) F.bag[k] = (F.bag[k] || 0) + n; else F.fridge[k] = (F.fridge[k] || 0) + n; }
const JR_REWARD = {
  1: () => { S.money += 500000; addTrust('harjo', 5); }, 2: () => { jrBag('rotiManis', 3); addTrust('ratna', 5); }, 3: () => addRep(10),
  4: () => (jrSt().c.w4 || []).forEach(id => addTrust(id, 3)), 5: () => { S.seeds.cengkeh = Math.min(CFG.GARDEN.SEED_MAX, (S.seeds.cengkeh || 0) + 3); },
  6: () => { jrSt().f.freeShip = true; }, 7: () => { addRep(15); addTrust('sinta', 5); addTrust('endang', 5); }, 8: () => { jrSt().f.dimasArt = true; addTrust('endang', 8); },
  9: () => { S.clinic.stock += CFG.CLINIC.PACK_UNITS; }, 10: () => jrBag('kopiSusu', 3), 11: () => { S.money += 300000; addRep(10); }, 12: () => { jrSt().f.jamu = true; },
  13: () => { S.money += 1000000; }, 14: () => { jrBag('bijiKopi', 5); addTrust('bowo', 10); }, 15: () => addRep(20), 16: () => { jrSt().f.trainFree = true; },
  17: () => { S.money += 500000; addRep(15); }, 18: () => (jrSt().c.karaoke || []).forEach(id => addTrust(id, 3)), 19: () => { jrSt().f.sleepCalm = true; },
  20: () => addRep(15), 21: () => { jrSt().f.taxHalf = true; }, 22: () => { addTrust('galih', 8); addTrust('wulan', 8); },
  23: () => { jrSt().f.pot = true; if (S.garden) gardenResize(); }, 24: () => {}, 25: () => { jrSt().f.trainHalf = true; }, 26: () => { S.money += 1000000; },
  27: () => { jrSt().f.t2disc = true; }, 28: () => { addRep(20); addTrust('harjo', 10); }, 29: () => { jrSt().f.seragam = true; },
  30: () => { jrSt().f.fotoTim = true; Object.values(S.staff || {}).forEach(st => { if (st) st.en = Math.min(CFG.STAFF.ENERGY_LV_MAX, st.en + 1); }); },
  31: () => addTrust('gunawan', 10), 32: () => {}, 33: () => {}, 34: () => { jrSt().f.plakat = true; addRep(30); }, 35: () => addRep(20), 36: () => addRep(20),
  37: () => { jrSt().f.t3disc = true; }, 38: () => addRep(30), 39: () => { addTrust('galih', 10); addRep(10); },
};
/** Efek imbalan yang dibaca sistem lain. */
const jrF = k => !!(S && S.jr && S.jr.f[k]);
const jrPotBonus = () => jrF('pot') ? 1 : 0;
const jrSleepStress = () => jrF('sleepCalm') ? CFG.JURNAL.SLEEP_STRESS_EXTRA : 0;
/** Ongkir Kantor Pos: gratis sekali setelah #6. */
const jrPostFee = fee => jrF('freeShip') ? 0 : fee;
function jrUsePostFee() { if (jrF('freeShip')) S.jr.f.freeShip = false; }
/** Pajak: setengah sekali setelah #21. */
function jrTaxMul() { if (!jrF('taxHalf')) return 1; S.jr.f.taxHalf = false; return 0.5; }
/** Biaya pelatihan staf: gratis sekali (#16), setengah sekali (#25). */
const jrTrainMul = () => jrF('trainFree') ? 0 : jrF('trainHalf') ? 0.5 : 1;
function jrUseTrain() { if (jrF('trainFree')) S.jr.f.trainFree = false; else if (jrF('trainHalf')) S.jr.f.trainHalf = false; }

/** Selesaikan challenge n: imbalan, kartu. */
function jrComplete(n) {
  const J = jrSt(), s = J.st[n]; if (s.s === 'done') return;
  s.s = 'done'; s.p = CHL[n - 1][4]; s.at = S.day; J.done.push(n); (J.hist = J.hist || []).push({ n, k: 'done', day: S.day });
  try { JR_REWARD[n](); } catch (e) { console.error('[3b-1] imbalan #' + n, e); }
  J.q.push({ k: 'done', n }); sfx('rep_up');
}
/** Aktifkan challenge n (slot). */
function jrStart(n) { const J = jrSt(), s = J.st[n]; s.s = 'aktif'; s.p = 0; s.day0 = S.day; s.set = []; s.base = n === 17 ? S.clinic.hiddenFound || 0 : 0; J.q.push({ k: 'new', n }); sfx('paper_flip'); }
/** Pemicu dari kejadian / cerita (dipakai juga oleh event 3b-6 dan bab 3b-7). */
function jrTrigger(n) { const J = jrSt(); J.trig[n] = true; }
/** Kejadian permainan → pemicu & kemajuan. data opsional. */
function jrEv(kind, data) {
  try {
    if (!S || S.practice) return; const J = jrSt(), A = n => J.st[n].s === 'aktif', inc = (n, d = 1) => { if (A(n)) J.st[n].p += d; };
    switch (kind) {
      case 'wargaCome': J.trig[4] = true; if (data === 'dimas') J.trig[8] = true; break;
      case 'warga': if (A(4)) { J.c.w4 = J.c.w4 || []; J.c.w4.push(data.id); inc(4); }
        if (data.id === 'dimas' && data.ok && A(8)) J.st[8].p = 1;
        if (A(29) && ['endang', 'dimas'].includes(data.id) && !J.st[29].set.includes(data.id)) { J.st[29].set.push(data.id); J.st[29].p = J.st[29].set.length; } break;
      case 'plant': J.trig[5] = true; break;
      case 'harvest': inc(5); break;
      case 'post': inc(6); break;
      case 'ctlSet': J.trig[11] = true; break;
      case 'ctlDone': inc(11); break;
      case 'xray': J.trig[17] = true; break;
      case 'hang': if (A(10)) { const s = J.st[10]; if (!s.set.includes(data)) s.set.push(data); s.p = s.set.length; } break;
      case 'karaoke': J.c.karaoke = [...new Set([...(J.c.karaoke || []), ...(data || [])])]; inc(18); break;
      case 'talk': if (data === 'darmi' && A(12)) { const s = J.st[12]; if (s.last !== S.day) { s.p = s.last === S.day - 1 ? s.p + 1 : 1; s.last = S.day; } } break;
      case 'rujukGalih': J.trig[22] = true; inc(22); break;
      case 'herba': inc(23); if (data === 'sirih') J.trig[23] = true; break;
      case 'pajak': J.trig[26] = true; if (A(26)) J.st[26].p = data ? J.st[26].p + 1 : 0; break;
      case 'earn': if (season().key === 'kemarau') J.c.earnSea += data; break;
      case 'dx': { const s = J.st[38]; if (s.s !== 'done') s.p = data ? s.p + 1 : 0; break; }
      case 'med': { const s = J.st[39]; if (s.s !== 'done') s.p += 1; break; }
      case 'psa': J.c.psa = true; break;
    }
  } catch (e) { console.error('[3b-1] jrEv', kind, e); }
}
/** Hasil tindakan (dipanggil di akhir finishProc): kontrol ulang, diagnosis, riwayat medis, herba, pasien warga. */
function jrProc(job, R) {
  const p = job.p, ok = !R.fail;
  if (['ctl', 'gagal', 'cukup'].includes(p.back)) jrEv('ctlDone');
  if (R.ctl) jrEv('ctlSet');
  jrEv('dx', R.exact);
  if (ok && p.med && knownMed(p).includes(p.med) && !job.complic) jrEv('med');
  if (job.herbUsed) jrEv('herba', job.herb);
  if (p.npc) jrEv('warga', { id: p.npc, ok: ok && !job.abort && job.painMax < CFG.MG.PAIN_WARN });
}
/** Pagi hari: ganti musim (lewati challenge musim lama), batas waktu habis, hitungan harian (#9, #19). */
function jrNewDay() {
  try {
    if (S.practice) return; const J = jrSt(), news = [];
    [9, 19].forEach(n => { const s = J.st[n]; if (s.s !== 'aktif') return; const ok = n === 9 ? S.clinic.stock >= CFG.JURNAL.STOCK_SAFE : S.stress < CFG.JURNAL.STRESS_SAFE; s.p = ok ? s.p + 1 : 0; });
    if (seaAbs() !== J.sea) { // ganti musim
      const oldKey = SEASONS[J.sea % SEASONS.length].key, skipped = [];
      for (let n = 1; n <= 39; n++) { const s = J.st[n]; if (chSea(n) === oldKey && s.s !== 'done' && CHL[n - 1][2] !== 't') { if (s.s === 'aktif' || J.trig[n]) { skipped.push(n); (J.hist = J.hist || []).push({ n, k: 'skip', day: S.day - 1 }); } s.s = 'skip'; } }
      for (let n = 1; n <= 39; n++) if (chSea(n) === season().key && J.st[n].s === 'skip') J.st[n] = { s: 'tunggu', p: 0 };
      J.sea = seaAbs(); if (season().key === 'kemarau') J.c.earnSea = 0;
      if (skipped.length) J.q.push({ k: 'skip', list: skipped, sea: oldKey });
    }
    jrActive().forEach(n => { const l = jrLeft(n); if (l != null && l <= 0) { J.st[n].s = 'skip'; (J.hist = J.hist || []).push({ n, k: 'skip', day: S.day - 1 }); news.push('Challenge ' + chName(n) + ' terlewat (batas waktu habis). Muncul lagi tahun depan.'); } });
    if (news.length) game.dayNews = [game.dayNews, ...news].filter(Boolean).join(' ');
  } catch (e) { console.error('[3b-1] jrNewDay', e); }
}
/** Tiap langkah main: pemicu dari keadaan, kemajuan, selesai, slot kosong diisi, kartu antre ditampilkan. */
function jrTick() {
  try {
    if (!S || S.practice || game.scene !== 'play') return; const J = jrSt(), stamp = S.day * 2000 + S.time;
    if (J.stamp !== stamp) { J.stamp = stamp;
      for (const n in JR_TRIG) if (!J.trig[n] && JR_TRIG[n]()) J.trig[n] = true;
      for (let n = 1; n <= 39; n++) { const s = J.st[n], c = CHL[n - 1];
        if (c[2] === 't' && s.s !== 'done') { s.p = Math.max(s.p, JR_PROG[n] ? JR_PROG[n]() : s.p); }
        else if (s.s === 'aktif' && JR_PROG[n]) s.p = JR_PROG[n]();
        if (n === 17 && s.s === 'aktif') s.p = (S.clinic.hiddenFound || 0) - s.base;
        if ((s.s === 'aktif' || (c[2] === 't' && s.s !== 'done')) && s.p >= c[4]) jrComplete(n); }
      const act = jrActive();
      if (!act.some(n => CHL[n - 1][2] === 's')) { const nx = jrNextSlot(); if (nx) jrStart(nx); }
      if (!act.some(n => CHL[n - 1][2] === 'e')) { const ne = Object.keys(J.trig).map(Number).filter(n => CHL[n - 1][2] === 'e' && J.st[n].s === 'tunggu' && chSea(n) === season().key).sort((a, b) => a - b)[0]; if (ne) jrStart(ne); }
    }
    if (J.q.length && !game.overlay && !game.fade) { const c = J.q.shift(); if (c.k === 'skip') chSkipCard(c.list, c.sea); else chCard(c.n, c.k === 'done'); }
  } catch (e) { if (!jrTick.err) { jrTick.err = true; console.error('[3b-1] jrTick', e); } }
}
/** Challenge urutan berikutnya: nomor terkecil musim ini yang belum selesai dan pemicunya sudah terjadi. */
const jrNextSlot = () => { const J = jrSt(); for (let n = 1; n <= 39; n++) if (CHL[n - 1][2] === 's' && chSea(n) === season().key && J.st[n].s === 'tunggu' && J.trig[n]) return n; return null; };

// ---- UI: chip HUD, panel Jurnal (Aktif · Pencapaian · Riwayat), kartu. Nomor challenge tidak ditampilkan (permintaan user 2026-11-17). ----
/** Ikon jenis challenge di kotak kecil: ! aktif, ✓ selesai, bintang pencapaian. */
function jrBadge(n, X, Y, w, h) {
  const c = CHL[n - 1], s = jrSt().st[n]; hInset(X, Y, w, h, s.s === 'done' ? '#cfe8b8' : s.s === 'skip' ? '#e8c0b0' : '#ead2a4');
  if (c[2] === 't') hIcon(IC_STAR, X + w / 2 - 7, Y + h / 2 - 7, s.s === 'done' ? '#f6c12c' : '#c8a878', s.s === 'done' ? '#7a4a10' : '#9a7a54');
  else HT(s.s === 'done' ? '✓' : s.s === 'skip' ? 'x' : '!', X + w / 2, Y + h / 2 - 4, s.s === 'done' ? '#2e7a34' : s.s === 'skip' ? '#8a3a2a' : CH_TYPE[c[2]][1], { bold: true, align: 'c' });
}
/** Chip pelacak challenge aktif di HUD kanan. Klik = perkecil jadi satu tombol "J"; klik tombol itu = tampilkan lagi. */
function drawJurnalChips() {
  if (!S || S.practice || !S.jr) return;
  const J = S.jr, act = jrActive(), y0 = 57 + (fokusOn() ? 17 : 0) + (S.rel && relJanji() ? 17 : 0) + (S.rel && S.rel.tunangan ? 17 : 0);
  if (!act.length) return;
  const toggle = () => { J.mini = !J.mini; sfx('ui_tick'); };
  if (J.mini) { const t = 'J ' + act.length, w = hW(t, true) + 14, X = 480 - 4 - w;
    hBox(X, y0, w, 15, 'paper', { thin: true }); HT(t, X + 7, y0 + 4, '#3a6a9a', { bold: true }); if (hoverId() === 'jrchip') hGlow(X, y0, w, 15); clickable(X, y0, w, 15, toggle, 'jrchip'); return; }
  act.forEach((n, i) => { const c = CHL[n - 1], s = J.st[n], ev = c[2] === 'e', l = jrLeft(n);
    const prog = c[4] > 1 ? ' · ' + chFmt(n, s.p) + '/' + chFmt(n, c[4]) : '', dl = l != null ? ' · ' + (l <= 1 ? 'hari ini' : l + ' hari') : '';
    const t = chName(n) + prog + dl, w = hW(t, true) + 26, X = 480 - 4 - w, Y = y0 + i * 17;
    hBox(X, Y, w, 15, 'paper', { thin: true }); hR(X + 5, Y + 3, 9, 9, ev ? '#a0285a' : '#3a6a9a'); HT('J', X + 7.5, Y + 4, '#ffffff', { bold: true }); HT(t, X + 18, Y + 4, ev ? '#a0285a' : MGC.ink, { bold: true });
    if (hoverId() === 'jrchip' + i) hGlow(X, Y, w, 15); clickable(X, Y, w, 15, toggle, 'jrchip' + i); });
}
/** Tanggal pendek untuk baris Riwayat, mis. "H14 Kemarau". */
const jrDayShort = d => 'H' + ((d - 1) % CFG.SEASON_DAYS + 1) + ' ' + SEASONS[Math.floor((d - 1) / CFG.SEASON_DAYS) % SEASONS.length].name.replace('Musim ', '');
/** Riwayat: challenge selesai & terlewat, terbaru dulu. */
const jrHist = () => (jrSt().hist || []).slice().reverse();
/** Panel Jurnal (J / menu Esc): Aktif (2 slot) · Pencapaian (daftar) · Riwayat (daftar), kartu detail di kanan. */
function openJurnal(tab0, sel0) {
  const J = jrSt(), ach = () => CHL.map((c, i) => i + 1).filter(n => CHL[n - 1][2] === 't');
  const tabs = [['Aktif', () => jrActive()], ['Pencapaian', ach], ['Riwayat', () => jrHist().map((h, i) => i)]];
  let tab = tab0 || 0; const ov = { kind: 'panel', t: 0, sel: sel0 != null ? sel0 : tabs[tab][1]()[0] };
  const pick = k => { tab = (k + tabs.length) % tabs.length; ov.sel = tabs[tab][1]()[0]; sfx('ui_tick'); };
  /** Nomor challenge dari pilihan (Riwayat memilih baris, bukan nomor). */
  const selN = () => tab === 2 ? (jrHist()[ov.sel] || {}).n : ov.sel;
  ov.update = function () { this.t++; if ((hit('esc') || hit('jurnal')) && this.t > 1) return closeOverlay(); if (hit('tab')) pick(tab + 1);
    const ids = tabs[tab][1](), i = ids.indexOf(this.sel); if (ids.length) { if (hit('left') || hit('up')) this.sel = ids[(i + ids.length - 1) % ids.length]; if (hit('right') || hit('down')) this.sel = ids[(i + 1) % ids.length]; }
    if (input.click) { const h = topHit(input.click, /^jr/); if (h) h.fn(); } };
  ov.drawHD = function () { hDim(this, .45); dropIn(this, 16, 6, 448, 258, () => this.body()); };
  /** Baris daftar (Pencapaian / Riwayat). */
  const listRow = (X, y, on, n, right, rcol, id, fn) => { hInset(X, y, 194, 14, on ? '#f6e2a8' : '#ead2a4'); if (on) hGlow(X, y, 194, 14);
    HT(fitText(CHL[n - 1][0], 116, true), X + 5, y + 3, MGC.ink, { bold: true }); HT(right, X + 189, y + 3, rcol, { bold: true, align: 'r' }); clickable(X, y, 194, 14, fn, id); };
  ov.body = function () {
    const X0 = 16, Y0 = 6, W = 448, H = 258, hv = hoverId(), ids = tabs[tab][1]();
    hBox(X0, Y0, W, H, 'paper', { ornate: true }); HT('Jurnal', 240, Y0 + 9, MGC.ink, { k: 4, sh: '#e8b878', align: 'c' }); hDivider(X0 + 14, Y0 + 34, W - 28);
    let tbx = X0 + 14; tabs.forEach(([n], k) => { const on = k === tab, tw = hW(n, true) + 14; hBtn(tbx, Y0 + 40, tw, 16, n, { kind: on ? 'gold' : hv === 'jrt' + k ? 'paper' : 'dark', bold: on }); const bx = tbx; clickable(bx, Y0 + 40, tw, 16, () => pick(k), 'jrt' + k); tbx += tw + 3; });
    if (tab === 0) {
      [['Urutan musim', 's'], ['Event & cerita', 'e']].forEach(([lab, ty], k) => { const y = Y0 + 62 + k * 62, n = ids.find(m => CHL[m - 1][2] === ty);
        HT(lab, X0 + 14, y, MGC.ink2, { bold: true }); const by = y + 10;
        if (!n) { hInset(X0 + 14, by, 194, 40, '#e6cfa0'); HT(ty === 'e' ? 'Belum ada event' : 'Menunggu pemicu', X0 + 111, by + 16, '#8a6a4a', { align: 'c' }); return; }
        const c = CHL[n - 1], s = J.st[n], on = ov.sel === n, l = jrLeft(n); hInset(X0 + 14, by, 194, 40, on ? '#f6e2a8' : '#ead2a4'); if (on) hGlow(X0 + 14, by, 194, 40);
        HT(fitText(c[0], 180, true), X0 + 20, by + 5, MGC.ink, { bold: true });
        if (c[4] > 1) hBar(X0 + 20, by + 18, 120, 7, s.p / c[4], '#5ccf4a'); HT(c[4] > 1 ? chFmt(n, s.p) + '/' + chFmt(n, c[4]) : 'Belum selesai', c[4] > 1 ? X0 + 146 : X0 + 20, by + 18, MGC.ink2);
        HT(l != null ? 'Batas: ' + (l <= 1 ? 'hari ini' : l + ' hari lagi') : 'Tanpa batas waktu', X0 + 20, by + 28, l != null && l <= 1 ? MGC.red : MGC.ink2, { bold: l != null && l <= 1 });
        clickable(X0 + 14, by, 194, 40, () => { ov.sel = n; }, 'jrs' + k); });
      const nx = jrNextSlot(); if (nx && !ids.includes(nx)) { HT('Berikutnya: ' + chName(nx), X0 + 14, Y0 + 180, MGC.ink2); HT('(muncul setelah challenge urutan selesai)', X0 + 14, Y0 + 190, '#8a6a4a'); }
    } else if (tab === 1) {
      ids.forEach((n, i) => { const s = J.st[n], d = s.s === 'done', c = CHL[n - 1];
        listRow(X0 + 14, Y0 + 62 + i * 13, ov.sel === n, n, d ? '✓' : c[4] > 1 ? chFmt(n, Math.min(s.p, c[4])) + '/' + chFmt(n, c[4]) : '-', d ? '#2e7a34' : '#8a6a4a', 'jrc' + n, () => { ov.sel = n; }); });
    } else {
      const H8 = jrHist(), per = 11, top = Math.max(0, Math.min((ov.sel || 0) - per + 1, H8.length - per));
      if (!H8.length) HT('Belum ada challenge yang selesai.', X0 + 14, Y0 + 66, '#8a6a4a');
      H8.slice(top, top + per).forEach((h, k) => { const i = top + k;
        listRow(X0 + 14, Y0 + 62 + k * 13, ov.sel === i, h.n, (h.k === 'done' ? '✓ ' : 'x ') + jrDayShort(h.day), h.k === 'done' ? '#2e7a34' : '#8a3a2a', 'jrh' + i, () => { ov.sel = i; }); });
      if (H8.length > per) HT((top + 1) + '-' + Math.min(H8.length, top + per) + ' dari ' + H8.length, X0 + 208, Y0 + 207, MGC.ink2, { align: 'r' });
    }
    HT('Selesai ' + J.done.length + '/39', X0 + 14, Y0 + 210, MGC.ink, { bold: true }); HT('Rak T2 buka di 8 · Metrapura di 18', X0 + 14, Y0 + 222, MGC.ink2);
    HT('Tab: ganti halaman · J/Esc: tutup', X0 + 14, Y0 + 236, MGC.ink2);
    const n = selN(), cx = X0 + 222, cy = Y0 + 40, cw = 212; hBox(cx, cy, cw, 184, 'paper', { thin: true, shadow: false });
    hBtn(X0 + W - 88, Y0 + 229, 74, 19, 'Tutup', { kind: hv === 'jrx' ? 'gold' : null, on: true, bold: true }); clickable(X0 + W - 88, Y0 + 229, 74, 19, () => closeOverlay(), 'jrx');
    if (!n) { hWrap(tab === 2 ? 'Challenge yang selesai atau terlewat tercatat di sini.' : 'Belum ada challenge aktif. Challenge muncul setelah pemicunya terjadi.', cw - 14).forEach((l, k) => HT(l, cx + 7, cy + 10 + k * 10, '#6a4a26')); return; }
    const c = CHL[n - 1], s = J.st[n], l = jrLeft(n), hrow = tab === 2 ? jrHist()[ov.sel] : null;
    jrBadge(n, cx + 7, cy + 7, 26, 26); HT(fitText(c[0], cw - 48, true), cx + 40, cy + 8, MGC.ink, { bold: true });
    const chip = (t, col, x) => { const w = hW(t, true) + 10; hR(x, cy + 21, w, 11, col); HT(t, x + 5, cy + 23, '#ffffff', { bold: true }); return w; };
    const stK = hrow ? hrow.k : s.s; const w1 = chip(CH_TYPE[c[2]][0], CH_TYPE[c[2]][1], cx + 40); chip(CH_ST[stK][0], CH_ST[stK][1], cx + 44 + w1);
    let y = cy + 40; hDivider(cx + 7, y, cw - 14); y += 7;
    hWrap(c[3], cw - 14).forEach(t => { HT(t, cx + 7, y, '#6a4a26'); y += 10; }); y += 4;
    if (c[4] > 1 && !hrow) { HT('Kemajuan', cx + 7, y, MGC.ink2); HT(chFmt(n, Math.min(s.p, c[4])) + ' / ' + chFmt(n, c[4]), cx + cw - 7, y, MGC.ink, { bold: true, align: 'r' }); y += 11;
      hBar(cx + 7, y, cw - 14, 7, s.p / c[4], s.s === 'done' ? '#5ccf4a' : '#e8a020'); y += 12; }
    const row = (k, v, col, bold) => { HT(k, cx + 7, y, MGC.ink2); hWrap(v, cw - 66, bold).forEach(t => { HT(t, cx + 60, y, col || MGC.ink, { bold }); y += 10; }); y += 2; };
    if (hrow) row(hrow.k === 'done' ? 'Selesai' : 'Terlewat', dayLabelM(hrow.day) + ' · Tahun ' + (Math.floor((hrow.day - 1) / (CFG.SEASON_DAYS * CFG.SEASONS_PER_YEAR)) + 1), hrow.k === 'done' ? '#2e7a34' : '#8a3a2a', true);
    else if (c[2] !== 't') row('Batas', l != null ? (l <= 1 ? 'hari ini' : l + ' hari lagi') : c[5] ? c[5] + ' hari sejak muncul' : 'tanpa batas', l != null && l <= 1 ? MGC.red : null, l != null);
    row('Imbalan', c[7], hrow && hrow.k === 'skip' ? '#8a6a4a' : '#2e7a34', true);
    if (c[2] !== 't' && (hrow ? hrow.k === 'skip' : s.s !== 'done')) { y += 2; hWrap(hrow ? 'Muncul lagi di ' + seasonName(chSea(n)) + ' tahun depan.' : 'Lewat ' + seasonName(chSea(n)) + ' hari 60 = terlewat, muncul lagi tahun depan.', cw - 14).forEach(t => { HT(t, cx + 7, y, '#8a6a4a'); y += 10; }); }
  };
  openOverlay(ov);
}
/** Kartu "Challenge baru" / "Challenge selesai!" / "Pencapaian!". */
function chCard(n, done, after) {
  const c = CHL[n - 1];
  openOverlay({ kind: 'card', t: 0,
    update() { this.t++; if (hit('jurnal') && this.t > 20) return closeOverlay(() => openJurnal(c[2] === 't' && done ? 1 : 0, c[2] === 't' || !done ? n : null)); if ((okHit() || input.click || hit('esc')) && this.t > 20) closeOverlay(after); },
    drawHD() { const p = ovProg(this); hc.save(); hc.globalAlpha = p; hR(0, 0, 480, 270, 'rgba(14,10,6,.9)');
      hBox(100, 50, 280, done ? 130 : 134, 'paper', { ornate: true });
      HT(done ? (c[2] === 't' ? 'Pencapaian!' : 'Challenge selesai!') : 'Challenge baru', 240, 62, done ? '#2e7a34' : CH_TYPE[c[2]][1], { bold: true, align: 'c' });
      HT(chName(n), 240, 80, MGC.ink, { k: 4, align: 'c', sh: '#e8b878' });
      hDivider(124, 112, 232); let y = 120;
      if (done) { HT('Imbalan', 240, y, MGC.ink2, { align: 'c' }); y += 12; c[7].split(' · ').forEach(t => { HT(t, 240, y, '#2e7a34', { bold: true, align: 'c' }); y += 11; });
        y += 4; HT('Selesai ' + S.jr.done.length + '/39', 240, y, MGC.ink2, { align: 'c' }); }
      else { hWrap(c[3], 220).forEach(t => { HT(t, 240, y, '#6a4a26', { align: 'c' }); y += 10; }); y += 3;
        HT(c[5] ? 'Batas ' + c[5] + ' hari' : 'Tanpa batas waktu', 240, y, c[5] ? MGC.red : MGC.ink2, { bold: true, align: 'c' }); y += 11;
        HT('Imbalan: ' + fitText(c[7], 200), 240, y, '#2e7a34', { align: 'c' }); }
      if (this.t > 20 && Math.floor(game.t * 2) % 2) HT('E / klik: lanjut · J: buka Jurnal', 240, done ? 166 : 170, '#c4a88c', { align: 'c' }); hc.restore(); } });
}
/** Kartu ganti musim: challenge yang terlewat. */
function chSkipCard(list, oldKey, after) {
  const next = jrNextSlot() || Object.keys(S.jr.st).map(Number).find(n => CHL[n - 1][2] === 's' && chSea(n) === season().key && S.jr.st[n].s !== 'done');
  openOverlay({ kind: 'card', t: 0,
    update() { this.t++; if ((okHit() || input.click || hit('esc')) && this.t > 20) closeOverlay(after); },
    drawHD() { const p = ovProg(this); hc.save(); hc.globalAlpha = p; hR(0, 0, 480, 270, 'rgba(14,10,6,.9)');
      const show = list.slice(0, 5), h = 120 + show.length * 11;
      hBox(100, 50, 280, h, 'paper', { ornate: true }); HT(seasonName(oldKey) + ' berakhir', 240, 62, '#8a3a2a', { bold: true, align: 'c' });
      HT('Challenge terlewat', 240, 78, MGC.ink, { k: 4, align: 'c', sh: '#e8b878' }); hDivider(124, 108, 232); let y = 116;
      show.forEach(n => { HT(CHL[n - 1][0], 240, y, '#8a3a2a', { bold: true, align: 'c' }); y += 11; });
      if (list.length > show.length) { HT('dan ' + (list.length - show.length) + ' lainnya', 240, y, '#8a3a2a', { align: 'c' }); y += 11; }
      y += 4; hWrap('Muncul lagi di ' + seasonName(oldKey) + ' tahun depan.' + (next ? ' Berikutnya: ' + chName(next) + '.' : ''), 220).forEach(t => { HT(t, 240, y, '#6a4a26', { align: 'c' }); y += 10; });
      if (this.t > 20 && Math.floor(game.t * 2) % 2) HT('E / klik: lanjut', 240, 50 + h - 14, '#c4a88c', { align: 'c' }); hc.restore(); } });
}
/** Pengait uji SR.jr. */
const JR_TEST = { st: jrSt, ev: jrEv, trig: jrTrigger, complete: jrComplete, start: jrStart, open: openJurnal, newDay: jrNewDay, tick: () => { if (S.jr) S.jr.stamp = null; jrTick(); } };
