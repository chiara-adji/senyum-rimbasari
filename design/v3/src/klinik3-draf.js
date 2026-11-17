/* ==== [3b-3] Klinik tahap 3 + PSA + Dokter Rekan & Petugas Kebersihan (DRAF, menunggu ACC user) ====
 * Usulan ACC user 2026-11-17 ("yang lain acc") + revisi alur PSA user: open akses → K-file eksplorasi orifis & glide path
 * → panjang kerja apex locator → ProTaper SX, S1, S2, F1, F2 (irigasi NaOCl tiap ganti file) → K2: irigasi akhir dengan
 * bilas salin di antara EDTA dan NaOCl → obturasi gutta-percha → basis + GIC/komposit. Molar 3 saluran, premolar 2, anterior 1.
 * Alat PSA (set T2 di Bahari): K-file, endomotor + ProTaper, apex locator, obturasi. T3 = loupe & alat bedah (3b-4/3b-5).
 * Gambar: design/v3/src/psa.js. Draf dimainkan di design/v3/klinik3-game.html (node design/v3/build-klinik3.cjs). */
CFG.K3 = { /* [3b] */
  COST: 180000000, STARS: 3, T2_MIN: 1, RENOV_DAYS: 2,                 // GDD §4 tahap 3: Rp 180jt + ★3 + ≥1 alat T2; tukang 2 hari (klinik tutup)
  PSA: { BASE: { A: 1750000, P: 2500000, M: 3500000 },                // harga wajar akhir per jenis gigi (Musim Hujan), Kemarau ×1,1
    K1_SHARE: 0.5, K2_DAYS: [3, 7], STALE: 14,                       // bayar 50/50, K2 3–7 hari, dressing basi > 14 hari
    EN1: { A: 0, P: 3, M: 5 },                                        // tambahan energi K1 di atas 15 (anterior/premolar/molar)
    ANT_P: 0.25,                                                      // bagian kasus pulpa jadi gigi depan setelah set PSA terpasang
    RITME_N: 4, WL_ZA: .8, WL_Z: .12, OVER_S: 1,                      // glide path ketukan; panjang kerja zona; > 1 dtk lewat garis = file patah
    SX: [.24, .36], ORIF_MISS: 4 },                                   // SX hanya sepertiga korona; salah klik dasar kamar > 4 = goresan dasar
  BERSIH: { DIRTY_MUL: 0.25, HI: 90, CONSENT_HI: 0.08, CONSENT_LO: -0.08 }, // Petugas Kebersihan: kotor per pasien ×0,25; klinik ≥90% bersih = pasien lebih percaya (setuju +8%), kotor = -8%
  STERIL: { MIN: 30, ENERGY: 3, FREE: ['konsul', 'resep', 'rujuk', 'rontgen'] }, // revisi user: sterilisasi wajib sejak tahap 1; 30 menit di autoklaf; tindakan tanpa alat tidak mengotori
  ENDO: { WLX_Z: 0.08, WLX_MIN: 5, WLX_EN: 2, HAND_N: 8, BASIC_EN: 3, LEN: { A: [22, 24], P: [20, 22], M: [19, 21] } }, // Set Basic: panjang kerja dari ronsen (zona sempit, +5 mnt foto), K-file #20-#35 (8 ketukan), energi +3; panjang gigi (mm)
  REKAN: { TX: ['konsul', 'scaling', 'gic', 'komposit'], SHARE: { hana: 0.4, bima: 0.5 }, MIN: { hana: 75, bima: 50 },
    OK: 0.7, OK_STEP: 0.05, FAIL: 0.05, FAIL_STEP: 0.01, HANA_SCALING: 0.15 },
};
CFG.CLINIC.UPGRADE[3] = { cost: CFG.K3.COST, stars: CFG.K3.STARS, t2: CFG.K3.T2_MIN };
CFG.STAFF.WAGE.bersih = 100000; CFG.STAFF.WAGE.rekan = 0;
/* Set alat PSA di rak T2 (revisi user 2): Basic = alat tangan + obturasi, panjang kerja dari ronsen; Advanced (butuh Basic) = endomotor, EndoActivator, apex locator */
{ const it = t2Item('file'); it[1] = 'Set Endo Basic'; it[3] = 9000000; it[4] = 'K-file, GP, spreader, sealer. Buka PSA.'; }
T2_ITEMS.push(['endo', 'Set Endo Advanced', 'emot', 15000000, 'Endomotor, EndoActivator, apex locator.', 'file']);
/* ---- Interior klinik tahap 1: autoklaf (sprite v3 yang sama dengan tahap 2-3) di samping lemari arsip ---- */
{ const f = ROOMS3.klinik1.items; ROOMS3.klinik1.items = () => f().concat([[autoclave(), 190, 28]]); }
CLINIC_POS.klinik1.autoklaf = [186, 58, 48, 20]; CLINIC_POS.klinik1.sterilPt = [210, 82];
CLINIC_POS.klinik2.autoklaf = [104, 58, 48, 20]; CLINIC_POS.klinik2.sterilPt = [128, 84];

/* ---- Interior Klinik Lv3 (rooms.js klinik3 368×216): kursi 1 pemain, kursi 2 Dokter Rekan, Steril = Petugas Kebersihan ---- */
CLINIC_POS.klinik3 = { desk: [6, 140, 84, 60], unit: [0, 108, 84, 26], sink: [222, 58, 44, 22], door: [184, 212],
  seats: [[296, 192], [312, 192], [328, 192], [276, 196], [350, 196], [306, 150], [330, 150]], chair: [42, 98], hall: [184, 150],
  recep: [168, 150], recepTalk: [140, 160, 64, 24], nurse: [84, 106], nurseTalk: [84, 96, 34, 34],
  chair2: [132, 98], unit2: [90, 108, 84, 26], rekan: [172, 106], steril: [[250, 74], [246, 116], [226, 136], [120, 136]],
  autoklaf: [186, 58, 36, 20], sterilPt: [210, 84] };

/* ---- Staf tahap 3 ---- */
Object.assign(STAFF_ROLES, {
  bersih: { name: 'Petugas Kebersihan', stage: 3, cands: ['udin', 'siti'], fx: 'Selalu bersih · pasien lebih percaya' },
  rekan: { name: 'Dokter Gigi Rekan', stage: 3, cands: ['hana', 'bima'], fx: 'Kursi 2: konsultasi, scaling, tambal otomatis' } });
Object.assign(STAFF_INFO, {
  udin: { ciri: 'Pensiunan penjaga SD. Pelan, tapi lantai yang dia pel bisa buat ngaca.', say: 'Monggo, Dok. Lantainya masih basah, lewat pinggir saja.',
    latih: 'Wah, saya disekolahkan lagi. Umur segini.', telat: 'Ndak apa-apa, Dok. Saya libur, tidur siang saja.' },
  siti: { ciri: 'Bersih-bersih seperti sedang lomba. Debu musuh pribadinya.', say: 'Beres! Ruang tunggu, kursi, kaca. Debu? Nggak ada debu di sini, Dok.',
    latih: 'Pelatihan apa? Ngepel juga ada ilmunya? Oke, saya ikut.', telat: 'Libur, ya, Dok. Tapi lantai jangan dikotorin!' },
  hana: { ciri: 'Dua tahun bertugas di pulau terpencil. Paling senang scaling.', say: 'Di pulau dulu saya cabut gigi pakai senter, Dok. Di sini ada listrik. Mewah!',
    latih: 'Kursus baru? Saya ikut! Ada sertifikatnya, kan? Saya koleksi.', telat: 'Nggak apa-apa, Dok. Saya ke perpus saja hari ini.', bagi: '40% oke. Asal saya boleh pasang peta pulau di ruang periksa dua.' },
  bima: { ciri: 'Mantan nomor dua di Surya Dental. Cepat dan percaya diri.', say: 'Pasien hari ini berapa? Di Metrapura saya pegang dua puluh. Tapi oke.',
    latih: 'Pelatihan? Saya sudah... ya sudah. Apa salahnya.', telat: 'Oke. Saya main voli saja.', bagi: 'Persentase oke. Papan peringkat ada? ...Bagus. Jangan ada.' } });
/** Tempat berdiri staf di klinik (npc3a spotOf): Resepsionis di meja, Perawat & Rekan di samping kursinya, Petugas Kebersihan bergiliran. */
function k3StaffSpot(role, pos) {
  if (role === 'resep') return { pt: pos.recep, dir: 'down' };
  if (role === 'rekan' && pos.rekan) return { pt: pos.rekan, dir: 'L' };
  if (role === 'bersih' && pos.steril) { const sp = pos.steril[Math.floor(S.time / 45) % pos.steril.length]; return { pt: sp, dir: 'down' }; }
  if (role === 'perawat' && S.clinic.sterilBy && pos.sterilPt) return { pt: pos.sterilPt, dir: 'up' }; /* perawat mensterilkan alat setelah tutup */
  return { pt: pos.nurse, dir: 'L' };
}
const k3DirtyMul = () => { const e = staffEff('bersih'); return e ? CFG.K3.BERSIH.DIRTY_MUL / e : 1; };
/** Kebersihan klinik memengaruhi kepercayaan pasien saat menawarkan tindakan (consentChance). */
const k3CleanConsent = () => { const B = CFG.K3.BERSIH, c = S.clinic.clean; return S.clinicStage < 1 ? 0 : c >= B.HI ? B.CONSENT_HI : c < CFG.CLINIC.DIRTY_LIMIT ? B.CONSENT_LO : 0; };
/** Pagi: Petugas Kebersihan membuat klinik bersih penuh; alat kemarin yang belum steril mengunci tindakan. */
function k3NewDay(news) {
  const C = S.clinic; C.sterilBy = null;
  if (staffOn('bersih') && C.clean < 100) { C.clean = 100; news.push(staffName(staffOf('bersih').id) + ' sudah membersihkan klinik sebelum buka.'); }
  if (S.clinicStage >= 1 && C.dirty > 0) { C.unsteril = true; news.push('Alat bekas ' + C.dirty + ' pasien kemarin belum disterilkan. Sebelum steril, hanya bisa konsultasi, resep, dan rujuk.'); }
}

/* ---- Sterilisasi alat (wajib sejak tahap 1). Tanpa Perawat: dokter sendiri di autoklaf setelah praktik. Dengan Perawat: otomatis saat klinik tutup. ---- */
const sterilFree = tx => CFG.K3.STERIL.FREE.includes(tx);
/** Tindakan terkunci karena alat belum steril dari hari sebelumnya. */
const sterilBlocks = tx => S.clinicStage >= 1 && !!S.clinic.unsteril && !sterilFree(tx);
/** Satu set alat terpakai (dipanggil tiap tindakan selesai, termasuk oleh Dokter Rekan). */
function sterilUse(tx) { if (S.clinicStage >= 1 && !sterilFree(tx)) S.clinic.dirty = (S.clinic.dirty || 0) + 1; }
function sterilDone(who) { const C = S.clinic, n = C.dirty; C.dirty = 0; C.unsteril = false; C.sterilBy = null; sfx('air_water'); toast((who ? who + ' mensterilkan' : 'Alat disterilkan') + ' · ' + n + ' set alat siap dipakai', 'good'); }
/** Dokter mensterilkan sendiri di autoklaf. */
function sterilize() {
  const C = S.clinic, T = CFG.K3.STERIL;
  if (brokenItem() && brokenItem()[0] === 'Autoklaf') return dialog(['Autoklaf rusak. Panggil teknisi di meja praktik dulu.']);
  if (C.sterilBy) return dialog([staffName(staffOf('perawat').id) + ' sedang mensterilkan alat.']);
  if (!(C.dirty > 0)) return dialog(['Semua alat sudah steril. Siap dipakai.']);
  if (C.patients.some(p => p.st === 'chair')) return dialog(['Selesaikan dulu pasien di kursi.']);
  addEnergy(-T.ENERGY); spendTime(T.MIN); sterilDone(null);
}
/** Kait currentAction: berdiri di depan autoklaf. */
function sterilAct(at) {
  const pos = clinicPos(), C = S.clinic; if (!pos.autoklaf || !at(pos.autoklaf)) return null;
  return { label: C.dirty > 0 ? 'Sterilkan alat · ' + C.dirty + ' set' : 'Autoklaf · alat steril', fn: sterilize };
}
/** Klinik tutup: Perawat yang bertugas mensterilkan alat (berjalan ke autoklaf, 30 menit game). */
function sterilClose() {
  const C = S.clinic; if (!(C.dirty > 0) || C.sterilBy || !staffHere('perawat') || (brokenItem() && brokenItem()[0] === 'Autoklaf')) return;
  C.sterilBy = { until: S.time + CFG.K3.STERIL.MIN }; staffUse('perawat');
  toast(staffName(staffOf('perawat').id) + ' mulai mensterilkan alat (' + C.dirty + ' set)');
}
/** Tiap langkah waktu: sterilisasi oleh Perawat selesai. */
function sterilTick() { const C = S.clinic; if (C.sterilBy && S.time >= C.sterilBy.until) sterilDone(staffName(staffOf('perawat').id)); }
/** Kait exitRoom: keluar klinik yang sudah tutup sementara alat masih kotor → peringatan. true = keluar ditahan. */
function sterilGuard() {
  const C = S.clinic, k = S.where && S.where.room;
  if (!k || !/^klinik[1-4]/.test(k) || S.clinicStage < 1 || C.open || !(C.dirty > 0) || C.sterilBy || C.sterilOkDay === S.day) return false;
  dialog(['Alat bekas ' + C.dirty + ' pasien belum disterilkan.', 'Kalau ditinggal, besok tidak bisa tindakan sampai alat steril.'], { choices: [
    { label: 'Sterilkan dulu', fn: () => { sterilize(); } },
    { label: 'Tetap pergi', fn: () => { C.sterilOkDay = S.day; exitRoom(); } }] });
  return true;
}

/* ---- Upgrade ke tahap 3 ---- */
const t2Bought = () => ['hs', 'perio', 'file', 'endo'].filter(id => t2St().own[id]).length;
function openUpgrade3() {
  const C = S.clinic, U = CFG.CLINIC.UPGRADE[3], cost = U.cost * nikahCostMul();
  if (C.renovDay != null) return dialog(['Tukang sedang bekerja. ' + dayLabel(C.renovDay) + ' pagi Klinik Gigi Lengkap sudah jadi.']);
  const okS = stars() >= U.stars, okM = S.money >= cost, okT = t2Bought() >= U.t2;
  openPanel({ title: 'Upgrade Klinik · Tahap 3', w: 340,
    rows: () => [['Klinik Gigi ' + S.name + ' menjadi Klinik Gigi Lengkap.', MGC.ink, true],
      ['· Ruang Periksa 2: kursi kedua untuk Dokter Gigi Rekan', MGC.ink2], ['· Rekrut Petugas Kebersihan: klinik selalu bersih', MGC.ink2],
      ['· PSA terbuka (beli Set Endo Basic di rak T2 Bahari Medika)', MGC.ink2],
      ['· Renovasi ' + CFG.K3.RENOV_DAYS + ' hari, klinik tutup · listrik ' + rupiah(CFG.OPS.UTIL_WEEK[3]) + '/minggu', MGC.ink2],
      ...(aryaFast() ? [['Arya ikut mengawasi: biaya -50%.', '#c0407a', true]] : []),
      ['Syarat ' + U.stars + '★ (kamu ' + stars() + '★) · alat T2 ' + U.t2 + ' (kamu ' + t2Bought() + ')', okS && okT ? MGC.ink : MGC.red, true],
      ['Biaya ' + rupiah(cost) + ' · Uangmu ' + rupiah(S.money), okM ? MGC.ink : MGC.red, true]],
    buttons: () => [{ label: 'Upgrade', off: !okS || !okM || !okT, offMsg: !okS ? 'Reputasi belum ' + U.stars + '★.' : !okT ? 'Beli dulu minimal 1 alat T2 di Bahari Medika.' : 'Uangmu belum cukup.', fn: () => {
      S.money -= cost; C.renovDay = S.day + CFG.K3.RENOV_DAYS; C.renovTo = 3; C.open = false; queueing().forEach(p => leavePatient(p, null)); sfx('door_bell');
      dialog(['Tukang langsung mulai bekerja. Klinik tutup dua hari. ' + dayLabel(C.renovDay) + ' pagi ruang periksa kedua sudah jadi.', 'Setelah itu rekrut Dokter Gigi Rekan dan Petugas Kebersihan di meja praktik.']); } },
      { label: 'Nanti', fn: () => {} }] });
}
const k3UpNews = () => 'Renovasi selesai! ' + clinicName() + ' sekarang punya ruang periksa kedua dan ruang sterilisasi baru. Rekrut Dokter Rekan & Petugas Kebersihan di meja praktik.';
const k3Renov = () => S.clinic.renovDay != null && S.clinic.renovTo === 3;

/* ---- Panel Staf 2×2 (4 peran) ---- */
function openStaffG() {
  if (S.clinicStage < 2) return dialog(['Staf baru bisa direkrut setelah klinik di-upgrade ke Klinik Gigi.']);
  const T = CFG.STAFF, ov = { kind: 'panel', t: 0 };
  ov.update = function () { this.t++; if (hit('esc') && this.t > 1) return closeOverlay(); if (input.click) { const h = topHit(input.click, /^sf/); if (h) h.fn(); } };
  const portrait = (id, X, Y, w, h) => { hInset(X, Y, w, h, '#e8d8b8'); hc.save(); hc.beginPath(); hc.rect((X + 1) * HI, (Y + 1) * HI, (w - 2) * HI, (h - 2) * HI); hc.clip();
    const s = Math.min((w - 2) / 24, (h - 2) / 32); hc.drawImage(chr(id, { dir: 'down' }), (X + w / 2 - 12 * s) * HI, (Y + 1) * HI, 24 * s * HI, 32 * s * HI); hc.restore(); };
  const pips = (X, Y, n, max, col) => { for (let i = 0; i < max; i++) { hR(X + i * 7, Y, 5.5, 5.5, '#6a4a2a'); hR(X + i * 7 + .5, Y + .5, 4.5, 4.5, i < n ? col : '#f2e2c0'); } };
  ov.drawHD = function () { hDim(this, .45); dropIn(this, 8, 4, 464, 262, () => this.body()); };
  ov.body = function () {
    const hv = hoverId(), X0 = 8, Y0 = 4, W = 464, H = 262;
    hBox(X0, Y0, W, H, 'paper', { ornate: true });
    HT('Staf Klinik', 240, Y0 + 7, MGC.ink, { k: 4, sh: '#e8b878', align: 'c' }); hDivider(X0 + 14, Y0 + 29, W - 28);
    const btn = (X, Y, w, label, id, fn, o = {}) => { hBtn(X, Y, w, 14, label, { kind: o.off ? 'dark' : hv === id ? 'gold' : o.main ? null : 'paper', on: o.main && !o.off, bold: !!o.main });
      if (o.off) { hc.fillStyle = 'rgba(70,50,30,.45)'; hc.fillRect(X * HI, Y * HI, w * HI, 14 * HI); }
      clickable(X, Y, w, 14, () => { if (o.off) { sfx('ui_deny'); if (o.msg) toast(o.msg, 'bad'); } else fn(); }, id); };
    ['resep', 'perawat', 'bersih', 'rekan'].forEach((role, ci) => {
      const R0 = STAFF_ROLES[role], cw = 220, ch = 104, cx = X0 + 8 + (ci % 2) * (cw + 8), cy = Y0 + 34 + Math.floor(ci / 2) * (ch + 4), st = staffOf(role), lock = S.clinicStage < (R0.stage || 2);
      hBox(cx, cy, cw, ch, 'paper', { thin: true, shadow: false });
      HT(R0.name, cx + 6, cy + 4, MGC.ink, { bold: true });
      HT(role === 'rekan' ? 'Bagi hasil' : rupiah(T.WAGE[role]) + '/hari', cx + cw - 6, cy + 4, MGC.ink2, { align: 'r' });
      HT(fitText(R0.fx, cw - 12), cx + 6, cy + 14, '#2a4a7a');
      if (lock) { hc.fillStyle = 'rgba(70,50,30,.30)'; hc.fillRect(Math.round((cx + 1) * HI), Math.round((cy + 24) * HI), Math.round((cw - 2) * HI), Math.round((ch - 25) * HI));
        HT('Terbuka di Klinik tahap ' + R0.stage, cx + cw / 2, cy + 56, MGC.lite, { bold: true, align: 'c', sh: DK }); return; }
      if (st) {
        const I = STAFF_INFO[st.id], y = cy + 25; portrait(st.id, cx + 6, y, 30, 40);
        const on = staffOn(role), off = STAFF_OFF[st.off] || (wdIdx() === CFG.CLINIC.CLOSED_WD ? STAFF_OFF.minggu : '');
        HT(staffName(st.id), cx + 42, y, MGC.ink, { bold: true });
        HT(on ? (st.energy <= 0 ? 'Bekerja · kelelahan' : 'Bekerja hari ini') : off, cx + cw - 6, y, on ? (st.energy <= 0 ? MGC.red : '#2e7a34') : '#a8700a', { bold: true, align: 'r' });
        HT('Skill', cx + 42, y + 11, MGC.ink2); pips(cx + 74, y + 12, st.skill, T.SKILL_MAX, '#e3aa3c');
        HT('Energi', cx + 116, y + 11, MGC.ink2); pips(cx + 152, y + 12, st.en, T.ENERGY_LV_MAX, '#5ccf4a');
        HT('Tenaga', cx + 42, y + 21, MGC.ink2); hBar(cx + 80, y + 21, cw - 86, 6, st.energy / T.ENERGY_MAX, st.energy > 30 ? '#5ccf4a' : '#ef5a4a');
        const ef = (1 + T.SKILL_STEP * (st.skill - 1)) * (st.energy <= 0 ? T.TIRED : 1);
        const fx = role === 'resep' ? 'Sabar +' + Math.round(T.PATIENCE * ef * 100) + '%, antrian +' + T.QUEUE : role === 'perawat' ? 'Zona +' + Math.round(T.ZONE * ef * 100) + '%, sakit -' + Math.round(T.PAIN * ef * 100) + '%'
          : role === 'bersih' ? 'Kotor per pasien -' + Math.round((1 - CFG.K3.BERSIH.DIRTY_MUL / ef) * 100) + '%' : 'Bagi hasil ' + Math.round(CFG.K3.REKAN.SHARE[st.id] * 100) + '% · ' + rekanMin(st) + ' mnt';
        HT(fitText(fx, cw - 48), cx + 42, y + 31, MGC.ink, { bold: true });
        if (role === 'rekan') { const au = S.clinic.rekanAuto !== false; btn(cx + 6, cy + 70, cw - 12, 'Ambil pasien otomatis: ' + (au ? 'Ya' : 'Tidak'), 'sfa', () => { S.clinic.rekanAuto = !au; sfx('ui_click'); }); }
        else HT(fitText('"' + I.say + '"', cw - 12), cx + 6, cy + 72, '#6a4a26');
        const by = cy + ch - 18;
        [['skill', 'Skill', st.skill, T.SKILL_MAX, T.SKILL_COST], ['energi', 'Energi', st.en, T.ENERGY_LV_MAX, T.ENERGY_COST]].forEach(([k, lb, lv, mx, cost], i) => {
          const c = Math.round((cost[lv + 1] || 0) * jrTrainMul()), max = lv >= mx, busy = !!st.train, poor = !max && S.money < c, bx = cx + 6 + i * 75;
          btn(bx, by, 72, max ? lb + ' maks' : lb + ' ' + (c ? (c / 1e6).toLocaleString('id-ID') + 'jt' : 'gratis'), 'sft' + role + k, () => trainStaff(role, k === 'skill' ? 'skill' : 'en'),
            { off: max || busy || poor, msg: max ? '' : busy ? 'Sudah ada pelatihan terjadwal.' : 'Uangmu belum cukup.' });
        });
        btn(cx + 156, by, 58, 'Berhenti', 'sff' + role, () => closeOverlay(() => dialog(['Berhentikan ' + staffName(st.id) + '?'], { choices: [
          { label: 'Ya, berhentikan', fn: () => { fireStaff(role); openStaff(); } }, { label: 'Batal', fn: openStaff }] })));
      } else {
        R0.cands.forEach((id, k) => {
          const n = R0.cands.length, rh = n > 2 ? 25 : 37, y = cy + 25 + k * (rh + 1), I = STAFF_INFO[id]; portrait(id, cx + 6, y, rh > 30 ? 26 : 19, rh > 30 ? 35 : 25);
          const tx = cx + (rh > 30 ? 37 : 30); HT(staffName(id), tx, y + 1, MGC.ink, { bold: true });
          (rh > 30 ? hWrap(I.ciri, cw - (tx - cx) - 52).slice(0, role === 'rekan' ? 2 : 3) : [fitText(I.ciri, cw - (tx - cx) - 52)]).forEach((l, j) => HT(l, tx, y + 10 + j * 8.5, MGC.ink2));
          if (role === 'rekan') HT('Bagi hasil ' + Math.round(CFG.K3.REKAN.SHARE[id] * 100) + '% · ' + CFG.K3.REKAN.MIN[id] + ' mnt', tx, y + 28, '#2a4a7a');
          btn(cx + cw - 48, y + 2, 42, 'Rekrut', 'sfh' + id, () => { hireStaff(role, id); if (STAFF_INFO[id].bagi) dialog(['"' + STAFF_INFO[id].bagi + '"'], { speaker: staffName(id) }); }, { main: true });
        });
      }
    });
    const tot = Object.keys(STAFF_ROLES).reduce((a, r) => a + (staffOf(r) ? T.WAGE[r] : 0), 0);
    HT('Gaji dipotong tiap pagi Senin-Sabtu · total ' + rupiah(tot) + '/hari', X0 + 12, Y0 + H - 14, MGC.ink2);
    hBtn(X0 + W - 70, Y0 + H - 18, 60, 15, 'Tutup', { kind: hv === 'sfx' ? 'gold' : null, on: true, bold: true }); clickable(X0 + W - 70, Y0 + H - 18, 60, 15, () => closeOverlay(), 'sfx');
  };
  openOverlay(ov);
}

/* ---- Dokter Gigi Rekan: kursi 2 ---- */
const rekanMin = st => Math.round(CFG.K3.REKAN.MIN[st.id] / (staffOf('rekan') && st === staffOf('rekan') && st.energy <= 0 ? CFG.STAFF.TIRED : 1));
/** Tindakan yang dikerjakan Rekan untuk diagnosis ini (ideal & termasuk wewenangnya), atau null. */
function rekanTx(p) {
  if (p.back && p.back !== 'lama') return null; const d = DX[p.dx]; if (!d) return null;
  const o = d.opts.find(x => x.g === 'ideal' && CFG.K3.REKAN.TX.includes(x.tx) && txAvail(x.tx) && !brokenBlocks(x.tx) && !sterilBlocks(x.tx));
  return p.dx === 'sehat' ? 'konsul' : o ? o.tx : null;
}
/** Tiap langkah waktu klinik: Rekan selesai → hasil; kursi 2 kosong → ambil pasien yang cocok. */
function rekanTick() {
  const C = S.clinic, R = C.rekan || (C.rekan = {}); const p = R.pid != null && C.patients.find(q => q.id === R.pid);
  if (R.pid != null && (!p || S.time >= R.until || !C.open)) { if (p) rekanFinish(p, R); R.pid = null; }
  if (R.pid != null || !C.open || C.rekanAuto === false || !staffHere('rekan') || !S.clinicStage || S.clinicStage < 3) return;
  const pos = clinicPos(); if (!pos.chair2) return;
  const q = queueing().filter(x => x.st === 'wait' && rekanTx(x)).sort((a, b) => a.arr - b.arr)[0]; if (!q) return;
  const st = staffOf('rekan'); q.st = 'rekan'; q.rtx = rekanTx(q); q.path = [[pos.hall[0], Math.max(q.y, pos.hall[1])], [pos.chair2[0], pos.hall[1]], pos.chair2]; R.pid = q.id; R.until = S.time + rekanMin(st); R.t0 = S.time;
  if (!inClinic()) settlePatient(q);
}
function rekanFinish(p, R) {
  const C = S.clinic, K = CFG.CLINIC, RK = CFG.K3.REKAN, st = staffOf('rekan'), tx = p.rtx || 'konsul', cs = CASES[tx];
  const ef = staffEff('rekan') || 1, okP = Math.min(.95, RK.OK + RK.OK_STEP * (st.skill - 1) + (st.id === 'hana' && tx === 'scaling' ? RK.HANA_SCALING : 0)), failP = Math.max(0, RK.FAIL - RK.FAIL_STEP * (st.skill - 1));
  const r = Math.random(), g = r < failP ? 'gagal' : r < failP + okP ? 'sukses' : 'cukup', noStock = cs.stock && C.stock < cs.stock;
  const realTx = noStock ? 'konsul' : tx, gross = tariff(realTx), own = Math.round(gross * (1 - RK.SHARE[st.id]) / 1000) * 1000;
  if (cs.stock && !noStock) C.stock -= cs.stock; earn(own); sterilUse(realTx); staffUse('rekan'); C.clean = Math.max(0, C.clean - K.DIRTY_PER_PATIENT * k3DirtyMul()); staffUse('bersih'); C.served++;
  if (g === 'gagal') { addRep(CFG.MG.REP_FAIL); C.returns.push({ kind: 'gagal', day: S.day + 3, ...ident(p), dx: p.dx, tooth: p.tooth, say: 'Dok, gigi yang kemarin ditangani dokter satunya masih bermasalah.' }); }
  else if (g === 'sukses') addRep(K.REP_DONE);
  addRecord(p, p.dx, p.tooth, realTx, gross, 'Ditangani ' + staffName(st.id) + ' di kursi 2. Hasil ' + GRADE[g].name.toLowerCase() + '. Bagian klinik ' + rupiah(own) + '.');
  p.st = 'chair'; leavePatient(p, g === 'gagal' ? null : 'done'); p.rtx = null;
  toast(staffName(st.id) + ': ' + p.name + ' · ' + CASES[realTx].name + ' · ' + GRADE[g].name + ' · +' + rupiah(own), g === 'gagal' ? 'bad' : 'good');
}
/** Baris tambahan di kotak status klinik (HUD): kursi 2. */
function k3HudRows() {
  const C0 = S.clinic, ster = C0.sterilBy ? [['Steril ' + Math.max(0, Math.round(C0.sterilBy.until - S.time)) + 'm', '#a8d8f0']] : C0.dirty > 0 ? [['Alat kotor ' + C0.dirty, C0.unsteril ? '#ffb0a0' : '#ffd8a0']] : [];
  if (S.clinicStage < 3 || !staffOf('rekan')) return ster;
  const C = S.clinic, R = C.rekan || {}, p = R.pid != null && C.patients.find(q => q.id === R.pid), nm = staffName(staffOf('rekan').id).replace('drg. ', '');
  if (!staffHere('rekan')) return ster.concat([['Kursi 2 · ' + nm + ' libur', MGC.lite2]]);
  return ster.concat([['Kursi 2 · ' + nm, '#a8d8f0'], [p ? fitText(p.name, 70) + ' ' + Math.max(0, Math.round(R.until - S.time)) + 'm' : C.rekanAuto === false ? 'Manual' : 'Kosong', p ? MGC.lite : MGC.lite2]]);
}

/* ---- PSA: tarif, kasus, diagnosis kunjungan 2 ---- */
const K3T = CFG.ALAT_T2.KOMP_TIER;
CASES.psa = { name: 'PSA (saluran akar)', short: 'PSA', base: CFG.K3.PSA.BASE.A / K3T, tier: K3T, energy: 15, min: 60, stock: 2, t2: 'file', stage: 3,
  says: ['Gigi saya sakit sekali, Dok. Mau dirawat saja, jangan dicabut.'] };
CASES.psa2 = { name: 'PSA kunjungan 2', short: 'PSA K2', base: CFG.K3.PSA.BASE.A / K3T, tier: K3T, energy: 15, min: 45, stock: 1, t2: 'file', stage: 3, says: [] };
TARIFF_KEYS_ALL.push('psa');
/** Bayaran tindakan: PSA = tarif PSA (gigi depan) × rasio jenis gigi × 50% per kunjungan. */
function txPay(job) {
  if (job.tx !== 'psa' && job.tx !== 'psa2') return tariff(job.tx);
  const B = CFG.K3.PSA.BASE, ty = psaType(job.tooth || job.p.tooth);
  return tariff('psa') * B[ty] / B.A * (job.tx === 'psa' ? CFG.K3.PSA.K1_SHARE : 1 - CFG.K3.PSA.K1_SHARE);
}
const psaOn = () => S.clinicStage >= 3 && t2Own('file');
STAFF_ROLES.perawat.fx = 'Zona +15% · sakit -20% · steril alat';
['pulpIrev', 'nekrosis', 'pulpDevital', 'pascaObat'].forEach(k => DX[k].opts.unshift({ tx: 'psa', g: 'ideal', next: 'psaK2', nextDays: CFG.K3.PSA.K2_DAYS }));
const K3_ANT = { pulpIrevA: 'pulpIrev', nekrosisA: 'nekrosis' };
Object.entries(K3_ANT).forEach(([k, b]) => { DX[k] = { ...DX[b], teeth: PSA_FRONT, t2: 'file', opts: [{ tx: 'psa', g: 'ideal', next: 'psaK2', nextDays: CFG.K3.PSA.K2_DAYS }, { tx: 'cabut', g: 'ok' }, { tx: 'rujuk', g: 'ideal', to: 'psa' }] }; });
DX.psaK2 = { name: 'Lanjutan PSA', tx: 'psa2', teeth: T_BACK.concat(PSA_FRONT), adult: true, ctlOnly: true, t2: 'file',
  ctlSay: 'Saya datang lagi, Dok. Lanjutan perawatan saluran akar yang kemarin.',
  a: { keluhan: '{loc}, Dok. Yang dirawat saluran akarnya.', sejak: 'Kunjungan pertama beberapa hari lalu.', kapan: 'Sudah nggak sakit.', bengkak: 'Nggak ada.', gusi: 'Nggak.' },
  f: { kaca: 'Tambalan sementara utuh', perkusi: 'Tidak sakit', dingin: 'Tidak ada respons (saluran sudah dibersihkan)' },
  opts: [{ tx: 'psa2', g: 'ideal' }] };
Object.assign(DX_XR, { psaK2: [{ access: true, canals: true }, 'Saluran sudah dibersihkan, ujung akar normal'], pulpIrevA: DX_XR.pulpIrev, nekrosisA: DX_XR.nekrosis });
Object.assign(NEXT_TEXT, { psaK2: 'PSA kunjungan 2 (pengisian saluran)' });
Object.assign(MG_TITLE, { psa: 'PSA Kunjungan 1', psa2: 'PSA Kunjungan 2' });
Object.assign(DX_EDU, { psaK2: 'pulp', pulpIrevA: 'pulp', nekrosisA: 'pulp' });
Object.assign(ITEM_NAME, { naocl: 'NaOCl', nacl: 'salin', edta: 'EDTA', pp: 'paper point', sealer: 'sealer', gp: 'gutta-percha', resin: 'komposit', bond: 'bonding' });
INSTR.psa = ['Jangan mengunyah di sisi itu sampai kunjungan berikutnya', 'Wajib kembali 3-7 hari lagi untuk pengisian saluran'];
INSTR.psa2 = ['Gigi yang dirawat saluran akar lebih rapuh, hindari menggigit keras', 'Kontrol 6 bulan lagi untuk foto ujung akar'];
TRAY.psaB = [['syr', 'Karpul', 'syr'], ['bur', 'Bor', 'bur'], ['k15', 'K-file', 'k15'], ['xrf', 'Ronsen', 'xrf'], ['k35', 'K #35', 'k35'], ['naocl', 'NaOCl', 'naocl']];
TRAY.psa = [['syr', 'Karpul', 'syr'], ['bur', 'Bor', 'bur'], ['k15', 'K-file', 'k15'], ['apex', 'Apex', 'apex'], ['emot', 'ProTaper', 'emot'], ['naocl', 'NaOCl', 'naocl']];
TRAY.psa2B = [['bur', 'Bor', 'bur'], ['naocl', 'NaOCl', 'naocl'], ['edta', 'EDTA', 'edta'], ['nacl', 'Salin', 'nacl'], ['gp', 'GP', 'gp'], ['gic', 'GIC', 'gic']];
TRAY.psa2 = [['bur', 'Bor', 'bur'], ['naocl', 'NaOCl', 'naocl'], ['edta', 'EDTA', 'edta'], ['nacl', 'Salin', 'nacl'], ['gp', 'GP', 'gp'], ['eact', 'Aktiv', 'eact']];
/** rollCase: sebagian kasus pulpa jadi gigi depan setelah Set PSA terpasang. */
function psaCase(kase, dx, kid) { return !kid && psaOn() && K3_ANT[dx + 'A'] && Math.random() < CFG.K3.PSA.ANT_P ? dx + 'A' : dx; }

/* ---- PSA: minigame ---- */
/** Keadaan gigi PSA di job (dipakai semua langkah). */
function psaState(job) {
  if (job.ps) return job.ps; const t = job.tooth || job.p.tooth, cn = psaCanals(t), nek = ['nekrosis', 'nekrosisA', 'pulpDevital', 'pascaObat'].includes(job.p.dx);
  const L = CFG.K3.ENDO.LEN[psaType(t)], len = Math.round((L[0] + Math.random() * (L[1] - L[0])) * 2) / 2;
  return job.ps = { t, ty: psaType(t), adv: t2Own('endo'), len, cn, ch: nek ? 'nek' : 'vital', acc: false, cs: cn.map(() => ({ st: nek ? 'nek' : 'vital', lv: 0 })), top: null, base: false, found: [], cur: 0 };
}
const psaO = ps => ({ t: ps.t, acc: ps.acc, ch: ps.ch, cs: ps.cs.map(c => ({ st: c.st, lv: c.lv })), top: ps.top, base: ps.base });
/** Gambar kerja PSA: gigi + file (bila ada) + peta orifis kecil + label saluran. */
function psaArt(job, file) {
  const ps = psaState(job); workGlow(95, 115, 120); drawLo(psaTooth(psaO(ps)), 12, 36);
  if (file) psaFile(hc, 12 * HI, 36 * HI, HI, ps.t, ps.cur, file.d, file.k);
  if (ps.acc && ps.ty !== 'A' || ps.found.length) { hBox(268, 44, 60, 50, 'dark', { thin: true }); hc.drawImage(psaOrifImg(ps.t, ps.found.length ? ps.found : ps.cn.map((_, i) => i), ps.cur), 270 * HI, 46 * HI, 56 * HI, 46 * HI); }
  const c = ps.cn[ps.cur]; if (file && c) { HT(ps.cn.length > 1 ? 'Saluran ' + (ps.cur + 1) + '/' + ps.cn.length : 'Saluran tunggal', 196, 48, MGC.gold, { bold: true, sh: DK }); if (ps.cn.length > 1) HT(c[0], 196, 60, MGC.lite, { k: 4, sh: DK }); if (ps.cn.length > 1) HT(c[1], 196, 82, MGC.lite2, { sh: DK }); }
}
/** Garis apeks & label panjang kerja. */
function psaApexLine() { for (let i = 20; i < 182; i += 3) hR(i, 36 + 151, 2, .5, '#ffd86a'); HT('Apeks', 150, 36 + 153, '#ffd86a', { sh: DK }); }
/** Apex locator: bar dan angka. d = kedalaman ujung file (1 = apeks). */
function apexLocator(X, Y, d, st) {
  hBox(X, Y, 70, 44, 'dark', { thin: true }); hR(X + 4, Y + 4, 62, 26, '#0a1a10');
  const v = Math.max(0, 1 - d), lab = d >= 1.02 ? 'LEWAT' : d >= .96 ? 'APEX' : v.toFixed(1).replace('.', ',');
  for (let i = 0; i < 10; i++) { const on = d >= .55 + i * .05, col = i >= 9 ? '#e6383e' : i >= 7 ? '#ffd86a' : '#6ad46a'; hR(X + 6 + i * 6, Y + 18, 4.5, 8, on ? col : '#1e3a24'); }
  HT(lab, X + 35, Y + 6, d >= 1.02 ? '#ff6a6a' : d >= .96 ? '#ffd86a' : '#a8f08a', { bold: true, align: 'c' });
  HT('Apex locator', X + 35, Y + 33, MGC.lite2, { align: 'c', sh: DK });
  if (st && st.hold && d > .5) { const gap = Math.max(.06, .4 * (1 - d)); if (st.t - (st.bip || 0) > gap) { st.bip = st.t; sfx('ui_tick'); } }
}
/** Langkah generik: gosok selisih dua keadaan gigi (buka tambalan sementara, akses gigi depan). bad(i, j): 0/1/2. */
function psaDiffSet(job, oA, oB, bad, hatch) {
  const key = 'psaDiff' + JSON.stringify([oA, oB, !!bad]); if (MGI[key]) return MGI[key];
  const mk = s => { const a = psaTooth(oA, s), b = psaTooth(oB, s), A = idata(a).data, B = idata(b).data, n = a.width * a.height, target = new Uint8Array(n), bd = new Uint8Array(n);
    for (let k = 0; k < n; k++) { const i = bc(k % a.width, s), j = bc((k / a.width) | 0, s); if (pxDiff(A, B, k)) target[k] = 1; else if (bad) bd[k] = bad(i, j); }
    const before = hatch ? recolor(cloneCv(a), target, (i, j, c) => ((i + j) >> (s - 1)) % 4 < 2 ? mixA(c, [255, 216, 106], .6) : mixA(c, [255, 236, 160], .35)) : cloneCv(a);
    return { before, after: b, target, bad: bad ? bd : null, ox: 12, oy: 36, k: 1 }; };
  const s1 = mk(1); s1.make2 = () => mk(2); return MGI[key] = s1;
}
/** K-file eksplorasi orifis: klik tiap mulut saluran di dasar kamar pulpa (tampak oklusal). */
function stOrifis() {
  const s = { code: 'PILIH', name: 'Cari orifis', tool: 'k10', key: 'klik mulut saluran', instr: 'Klik titik gelap di dasar kamar pulpa: mulut tiap saluran akar.', warn: 'Klik dasar = goresan',
    enter(job, st) { const ps = psaState(job); ps.ch = 'open'; st.miss = 0; st.marks = []; ps.found = []; },
    geo: () => ({ X: 30, Y: 48, k: 1.25 }),
    update(job, st) {
      const ps = psaState(job), c = input.click; if (!inWork(c) || st.doneAt != null) return; const G = s.geo(), pts = psaOrifPts(ps.t);
      const i = pts.findIndex((p, n) => !ps.found.includes(n) && Math.hypot(G.X + p[0] * G.k - c.x, G.Y + p[1] * G.k - c.y) < 7);
      if (i >= 0) { ps.found.push(i); ps.cur = i; sfx('mg_hit', ps.found.length + 1); if (ps.found.length >= pts.length) { ps.found.sort(); ps.cur = 0; fin(st); } }
      else { st.miss++; job.misses++; st.marks.push([c.x, c.y]); sfx('mg_miss'); mgHurt(job, 2); if (st.miss === CFG.K3.PSA.ORIF_MISS + 1) mgErr(job, 'minor', 'Dasar kamar pulpa tergores mencari orifis'); }
    },
    auto(job, st, good) { const ps = psaState(job); ps.found = ps.cn.map((_, i) => i); ps.cur = 0; if (!good) mgErr(job, 'minor', 'Dasar kamar pulpa tergores mencari orifis'); fin(st); },
    draw(job, st) {
      const ps = psaState(job), G = s.geo(); workGlow(95, 110, 120); hc.drawImage(psaOrifImg(ps.t, ps.found, -1), G.X * HI, G.Y * HI, 120 * G.k * HI, 96 * G.k * HI);
      st.marks.forEach(([mx, my]) => hR(mx - 1, my - 1, 2, 2, '#ffd86a'));
      HT('Tampak atas (oklusal)', 196, 48, MGC.gold, { bold: true, sh: DK }); HT('Orifis ' + ps.found.length + '/' + ps.cn.length, 196, 60, MGC.lite, { sh: DK });
      ps.cn.forEach((c, i) => HT((ps.found.includes(i) ? '✓ ' : '· ') + c[1], 200, 74 + i * 11, ps.found.includes(i) ? '#a8f08a' : MGC.lite2, { sh: DK }));
      const m = input.mouse; if (inWork(m)) psaFile(hc, (m.x - 84 * .5) * HI, (m.y - 14 * .5 - 2) * HI, HI * .5, ps.t, 0, -1, 'k10');
    } };
  return s;
}
/** Glide path K-file #10 → #15 (gerak watch-winding = RITME). */
function stGlide(ci) {
  return stRitme({ name: 'Glide path', tool: 'k15', n: CFG.K3.PSA.RITME_N, space: .75, z: .35, pain: 2, label: 'K-file #10, #15', lane: [196, 168, 130], instr: 'Putar kecil kiri-kanan (A/D) ikuti ketukan sampai file longgar.', warn: 'Dipaksa = ledge',
    onBreak: job => { mgErr(job, 'minor', 'Ledge: K-file dipaksa masuk'); mgHurt(job, 6); },
    done: job => { psaState(job).cs[ci].st = 'glide'; },
    art: (job, st) => { const ps = psaState(job); ps.cur = ci; psaArt(job, { k: st && st.hits >= st.n / 2 ? 'k15' : 'k10', d: st ? Math.min(.95, .25 + .7 * (st.hits || 0) / (st.n || 1)) : .25 }); } });
}
/** Panjang kerja dengan apex locator: tahan, lepas saat layar APEX. Lewat = sakit, hasil maks Cukup. */
function stWL(ci) {
  const P = CFG.K3.PSA, D = f => f * 1.15;
  return stTahan({ name: 'Panjang kerja', tool: 'apex', za: P.WL_ZA, z: P.WL_Z, rate: .32, at: [196, 162, 128], label: 'Masukkan K-file #15', labels: ['', '', 'APEX'], instr: 'Tahan untuk memasukkan file pelan, lepas saat apex locator menunjuk APEX.', warn: 'Lewat = sakit',
    over: job => { mgHurt(job, 20); mgErr(job, 'minor', 'Panjang kerja lewat apeks'); }, end: (job, ok) => { psaState(job).cs[ci].wl = ok; },
    art: (job, st) => { const ps = psaState(job); ps.cur = ci; psaArt(job, { k: 'k15', d: D(st ? st.f : 0) }); psaApexLine(); apexLocator(196, 98, D(st ? st.f : 0), st); } });
}
/** Set Basic: panjang kerja dari ronsen. Panjang gigi diukur di foto awal, WL = panjang - 1 mm; tahan file sampai angka = WL, lalu foto konfirmasi. Zona lebih sempit dari apex locator. */
function stWLX(ci) {
  const P = CFG.K3.PSA, E = CFG.K3.ENDO, D = f => f * 1.15;
  return stTahan({ name: 'Panjang kerja', tool: 'xrf', za: P.WL_ZA, z: E.WLX_Z, rate: .3, at: [196, 162, 128], label: 'Masukkan K-file #15', labels: ['', '', 'WL'],
    instr: 'Lihat ronsen: WL = panjang gigi - 1 mm. Tahan, lepas saat angka file sama dengan WL.', warn: 'Lewat = sakit',
    over: job => { mgHurt(job, 20); mgErr(job, 'minor', 'Panjang kerja lewat apeks'); },
    end: (job, ok, st) => { const ps = psaState(job); ps.cs[ci].wl = ok; ps.film = { ci, d: D(st.f) }; job.extraEnergy = (job.extraEnergy || 0) + E.WLX_EN; sfx('xray'); },
    art: (job, st) => { const ps = psaState(job); ps.cur = ci; psaArt(job, { k: 'k15', d: D(st ? st.f : 0) }); psaApexLine(); psaRonsen(job, D(st ? st.f : 0)); } });
}
/** Kotak ronsen (Set Basic): foto awal tanpa file, setelah file dilepas = foto konfirmasi dengan file; angka panjang gigi, WL, dan file. */
function psaRonsen(job, d) {
  const ps = psaState(job), X = 196, Y = 96, film = ps.film && ps.film.ci === ps.cur ? ps.film : null;
  hBox(X, Y, 56, 50, 'dark', { thin: true }); hc.drawImage(psaXray(ps, film), Math.round((X + 3) * HI), Math.round((Y + 3) * HI), 50 * HI, 44 * HI);
  const wl = ps.len - 1, mm = Math.max(0, d * wl);
  HT('Gigi ' + ps.len.toLocaleString('id-ID') + ' mm', X + 60, Y + 4, MGC.lite2, { sh: DK }); HT('WL ' + wl.toLocaleString('id-ID') + ' mm', X + 60, Y + 16, MGC.gold, { bold: true, sh: DK });
  HT('File ' + mm.toFixed(1).replace('.', ','), X + 60, Y + 28, Math.abs(mm - wl) <= .5 ? '#a8f08a' : mm > wl + .5 ? '#ff8a8a' : MGC.lite, { bold: true, sh: DK });
  if (film) HT(Math.abs(film.d - 1) <= .06 ? 'Foto: pas' : film.d > 1 ? 'Foto: lewat' : 'Foto: kurang', X + 60, Y + 40, Math.abs(film.d - 1) <= .06 ? '#a8f08a' : '#ffb0a0', { sh: DK });
}
const _psaX = {};
/** Gambar ronsen gigi PSA (dengan file bila film diberikan), skala HD untuk kotak 50×44. */
function psaXray(ps, film) {
  const key = JSON.stringify([psaO(ps), film && [film.ci, Math.round(film.d * 50)]]); if (_psaX[key]) return _psaX[key];
  const base = psaTooth(psaO(ps), 2), [c, x] = cv(base.width, base.height); x.drawImage(base, 0, 0); if (film) psaFile(x, 0, 0, 2, ps.t, film.ci, film.d, 'k15');
  const g = xr(c); return _psaX[key] = xrFilm(g, Math.round(50 * HI), Math.round(44 * HI), [10, 0, g.width - 20, g.height]);
}
/** Set Basic: preparasi file tangan K-file #20 → #35 (2 ketukan per nomor), bilas NaOCl tiap ganti. */
function stHand(ci) {
  const E = CFG.K3.ENDO;
  return stRitme({ name: 'Preparasi K-file', tool: 'k35', n: E.HAND_N, space: .7, z: .35, pain: 2, label: 'K-file #20-#35', lane: [196, 168, 130],
    instr: 'Putar-tarik file (A/D) sampai longgar, lalu nomor berikutnya. Bilas NaOCl tiap ganti file.', warn: 'Dipaksa = ledge',
    onBreak: job => { mgErr(job, 'minor', 'Ledge: file tangan dipaksa'); mgHurt(job, 6); },
    done: job => { const c = psaState(job).cs[ci]; c.st = 'shape'; c.lv = 5; },
    art: (job, st) => { const ps = psaState(job), h = st ? st.hits || 0 : 0, k = Math.min(3, Math.floor(h / 2)), c = ps.cs[ci]; ps.cur = ci;
      if (h) { c.st = 'shape'; c.lv = Math.max(c.lv || 0, Math.min(5, k + 1)); } psaArt(job, { k: 'k' + (20 + 5 * k), d: .98 }); psaApexLine();
      HT('K-file #' + (20 + 5 * k), 196, 100, MGC.gold, { bold: true, sh: DK }); if (h && h % 2 === 0 && st.t - (st.hitT || 0) < .8) HT('Bilas NaOCl', 196, 112, '#a8e8ff', { sh: DK }); } });
}
/** Set Advanced (K2): EndoActivator menggetarkan irigan sebelum pengeringan. */
function stAktivasi() {
  return stTahan({ name: 'Aktivasi irigan', tool: 'eact', za: .55, z: .3, rate: .3, at: [196, 162, 128], label: 'EndoActivator', labels: ['', '', 'CUKUP'],
    instr: 'Tahan untuk menggetarkan irigan di saluran, lepas di zona. Kotoran di cabang saluran ikut terangkat.', warn: 'Kelamaan = meluap',
    over: j => mgErr(j, 'minor', 'Irigan meluap karena aktivasi terlalu lama'), art: (j, st) => { const ps = psaState(j); psaArt(j, { k: 'eact', d: .75 }); } });
}
/** ProTaper SX → S1 → S2 → F1 → F2 dengan endomotor; NaOCl tiap ganti file. Lompat urutan / tahan lewat garis > 1 dtk = file patah. */
const PT = [['sx', 'SX'], ['s1', 'S1'], ['s2', 'S2'], ['f1', 'F1'], ['f2', 'F2']];
function stProTaper(ci) {
  const P = CFG.K3.PSA, D = f => f * 1.15;
  const s = { code: 'TAHAN', name: 'ProTaper', tool: 'emot', key: 'klik file, tahan klik', warn: 'Lompat urutan = patah',
    instr: 'Klik file berikutnya, tahan untuk memasukkan dengan endomotor, lepas di zona. Bilas NaOCl tiap ganti file.',
    enter(job, st) { st.k = 0; st.irr = true; st.run = false; st.f = 0; st.hold = false; st.over = 0; st.flash = null; },
    zone: st => st.k === 0 ? [P.SX[0] / 1.15, P.SX[1] / 1.15] : [P.WL_ZA, P.WL_ZA + P.WL_Z * 1.2],
    pick(job, st, k) {
      if (st.doneAt != null) return;
      if (k === 'naocl') { st.irr = true; sfx('air_water'); st.flash = { id: 'naocl', t: st.t, ok: true }; return; }
      if (st.run) return; const i = PT.findIndex(p => p[0] === k);
      if (i < st.k) { sfx('ui_deny'); return; }
      if (i > st.k) { s.snap(job, st, 'File patah: urutan ProTaper dilompati (' + PT[st.k][1] + ' terlewat)'); return; }
      if (!st.irr) { mgErr(job, 'minor', 'Lupa irigasi NaOCl saat ganti file'); job.misses++; }
      st.run = true; st.f = 0; st.armed = false; st.over = 0; sfx('ui_click');
    },
    snap(job, st, text) { sfx('drill_oops'); mgHurt(job, 12); mgErr(job, 'major', text); job.failSay = 'Dok, gigi yang dirawat saluran akarnya kemarin masih sakit. Katanya ada file yang patah.'; toast('File patah di dalam saluran!', 'bad'); fin(st); mgAbort(job, 'file'); },
    update(job, st, dt) {
      if (input.click) { const h = topHit(input.click, /^mgpt/); if (h) { input.click = null; h.fn(); return; } }
      if (!st.run) return; const [za, zb] = s.zone(st);
      if (mgPress()) st.armed = true;
      const down = st.armed && (input.mdown || held('act') || held('ok'));
      if (down) { st.hold = true; st.f += .36 * dt; if (st.t - (st.ls || 0) > .22) { st.ls = st.t; sfx('drill_low'); }
        if (st.f > zb) { st.over += dt; if (st.over > P.OVER_S) return s.snap(job, st, 'File patah: endomotor ditahan lewat panjang kerja'); } }
      else if (st.hold) { st.hold = false; st.armed = false;
        if (st.f >= za) { const ps = psaState(job), c = ps.cs[ci]; if (st.f > zb) { mgErr(job, 'minor', 'File ProTaper lewat apeks'); mgHurt(job, 10); }
          c.st = 'shape'; c.lv = st.k + 1; st.k++; st.run = false; st.irr = false; sfx('mg_hit', st.k + 1); if (st.k >= PT.length) fin(st); }
        else { st.early = st.t; st.f = 0; } }
    },
    auto(job, st, good) { if (!good) return s.snap(job, st, 'File patah: urutan ProTaper dilompati'); const c = psaState(job).cs[ci]; c.st = 'shape'; c.lv = 5; fin(st); },
    draw(job, st) {
      const ps = psaState(job); ps.cur = ci; const cur = PT[Math.min(st.k, 4)][0];
      psaArt(job, st.run ? { k: cur, d: D(st.f) } : null); psaApexLine();
      const hv = hoverId(); if (!(st.over > 0) && !(st.early && st.t - st.early < 1.2)) HT('Urutan ProTaper', 196, 94, MGC.gold, { bold: true, sh: DK });
      PT.concat([['naocl', 'NaOCl']]).forEach(([k, lb], i) => {
        const X = 196 + (i % 3) * 44 - (i === 5 ? 2 : 0), Y = 106 + Math.floor(i / 3) * 24, BW = i === 5 ? 46 : 40, done = i < 5 && i < st.k, nx = i === st.k && !st.run;
        hBox(X, Y, BW, 20, done || (k === 'naocl' && st.irr && st.k > 0) ? 'gold' : nx || hv === 'mgpt' + k ? 'paper' : 'dark', { thin: true }); if (nx) hGlow(X, Y, BW, 20);
        hc.drawImage(tool(k), Math.round((X + 2) * HI), Math.round((Y + 2) * HI), 32, 32); HT(lb, X + (i === 5 ? 19 : 21), Y + 6, done || nx || (k === 'naocl' && st.irr && st.k > 0) || hv === 'mgpt' + k ? MGC.ink : MGC.lite2, { bold: true });
        clickable(X, Y, BW, 20, () => s.pick(job, st, k), 'mgpt' + k);
      });
      const [za, zb] = s.zone(st); hMeterTahan(196, 166, 128, st.f, za, zb, st.run ? 'Endomotor ' + PT[st.k][1] : 'Pilih file', null, true);
      if (st.over > 0) HT('Lepas! File bisa patah', 196, 94, '#ff6a6a', { bold: true, sh: DK });
      else if (st.early && st.t - st.early < 1.2) HT('Belum sampai. Ulangi.', 196, 94, '#ffd8a0', { bold: true, sh: DK });
    } };
  return s;
}
/** URUT dengan baki kotak 3 per baris (muat di panel kanan kerja). */
function psaUrut(o) {
  const s = stUrut(o);
  s.draw = (job, st) => {
    if (o.art) o.art(job, st); const X = 196, Y = o.y || 110;
    HT(o.label || 'Urutan', X, Y - 12, MGC.gold, { bold: true, sh: DK });
    st.seq.forEach((id, i) => {
      const sx = X + (i % 3) * 44, sy = Y + Math.floor(i / 3) * 30, g = st.got[i], cur = i === st.idx;
      hBox(sx, sy, 26, 24, g && g !== 'x' ? 'gold' : cur ? 'paper' : 'dark', { thin: true }); if (cur && st.doneAt == null) hGlow(sx, sy, 26, 24);
      if (g && g !== 'x') hc.drawImage(tool(g), Math.round((sx + 5) * HI), Math.round((sy + 4) * HI), 32, 32);
      else HT(g === 'x' ? '×' : '?', sx + 13, sy + 8, g === 'x' ? MGC.red : cur ? MGC.ink2 : '#7a9a94', { bold: true, align: 'c' });
      hR(sx - 2, sy - 3, 8, 8, '#081312'); hR(sx - 1.5, sy - 2.5, 7, 7, cur ? '#ffd86a' : '#e8d0a0'); HT(String(i + 1), sx + 2, sy - 1.5, '#3a1e0c', { bold: true, align: 'c' });
    });
  };
  return s;
}
/** K1: bius → akses → orifis → (glide path → panjang kerja → ProTaper) per saluran → irigasi & dressing → tambalan sementara → instruksi. */
MG_BUILD.psa = job => {
  const ps = psaState(job); job.tray = ps.adv ? TRAY.psa : TRAY.psaB; job.instrKey = 'psa'; job.extraEnergy = CFG.K3.PSA.EN1[ps.ty] + (ps.adv ? 0 : CFG.K3.ENDO.BASIC_EN);
  const A = ps.ty === 'A', akses = A
    ? stGosok({ ...DRILL(), name: 'Open akses', tool: 'bur', cursor: 'bur', r: 3, speed: 8, set: j => psaDiffSet(j, { t: ps.t, ch: ps.ch }, { t: ps.t, acc: true, ch: ps.ch }, (i, j2) => { const sh = antShape({}); return !sh.inT(i, j2) ? 0 : (Math.abs(i - 85) > 13 || j2 > 74) ? 2 : 1; }, true),
      pain: j => 8 * (j.B < .3 && ps.ch === 'vital' ? 2 : 1), sfx: 'drill_low', soft: { pain: 2, limit: 8, err: 'Akses terlalu lebar' }, hard: (j, st) => psaPerf(j, st),
      leftErr: 'Atap pulpa belum terbuka', prog: [196, 186, 128, 'Akses'], instr: 'Tahan klik & gosok arsir kuning (akses dari sisi lidah).', warn: 'Keluar jauh = perforasi', done: () => { ps.acc = true; }, art: () => workGlow(95, 110, 120) })
    : stGosok({ ...DRILL(), name: 'Open akses', tool: 'bur', cursor: 'bur', r: 3, speed: 8, set: setAkses, pain: j => 8 * (j.B < .3 && ps.ch === 'vital' ? 2 : 1), sfx: 'drill_low', soft: { pain: 2, limit: 8, err: 'Dinding akses terlalu lebar' },
      hard: (j, st) => psaPerf(j, st), leftErr: 'Atap pulpa belum terbuka penuh', prog: [196, 186, 128, 'Akses'], instr: 'Tahan klik & gosok arsir kuning sampai atap pulpa terbuka.', warn: 'Keluar jauh = perforasi',
      done: () => { ps.acc = true; }, art: () => workGlow(95, 110, 120), over: aksesGuide });
  return [
    stBius({ art: j => psaArt(j), warn: ps.ch === 'vital' ? 'Pulpa masih hidup' : 'Pulpa sudah mati' }),
    akses, stOrifis(),
    ...ps.cn.map((c, ci) => stSeq(A ? 'Saluran akar' : 'Saluran ' + c[0], ps.adv ? [stGlide(ci), stWL(ci), stProTaper(ci)] : [stGlide(ci), stWLX(ci), stHand(ci)])),
    psaUrut({ name: 'Dressing', tool: 'caoh', label: 'Irigasi & dressing', items: [['naocl', 'NaOCl', 'naocl'], ['pp', 'Paper', 'pp'], ['caoh', 'CaOH2', 'caoh'], ['cot', 'Kapas', 'cot'], ['edta', 'EDTA', 'edta'], ['gic', 'GIC', 'gic']],
      seq: () => ['naocl', 'pp', 'caoh', 'cot'], bad: { gic: 'GIC permanen dipasang sebelum saluran diisi' }, instr: 'Bilas NaOCl, keringkan paper point, isi Ca(OH)2, tutup kapas kecil.',
      on: (j, id) => { if (id === 'caoh') ps.cs.forEach(c => { c.st = 'dress'; }); if (id === 'caoh') ps.ch = 'dress'; }, art: j => psaArt(j) }),
    stSeq('Tambalan sementara', [stSemBahan(), stSemIsi()]), stInstr('psa')];
};
/** K2: buka tambalan sementara → irigasi akhir (bilas salin di antara EDTA & NaOCl) → sealer → obturasi per saluran → potong GP → basis + tambal permanen → gigitan → instruksi. */
MG_BUILD.psa2 = job => {
  const ps = psaState(job); job.tray = ps.adv ? TRAY.psa2 : TRAY.psa2B; job.instrKey = 'psa2';
  ps.acc = true; ps.ch = 'dress'; ps.cs.forEach(c => { c.st = 'dress'; c.lv = 5; }); ps.top = 'temp'; ps.found = ps.cn.map((_, i) => i);
  const k1 = ((S.clinic.people || {})[job.p.pid] || {}).psaDay, stale = k1 != null && S.day - k1 > CFG.K3.PSA.STALE;
  const o0 = psaO(ps), o1 = { ...o0, top: null };
  return [
    stGosok({ ...DRILL(), name: 'Buka tambalan', tool: 'bur', cursor: 'bur', r: 4, speed: 8, set: j => psaDiffSet(j, o0, o1, null, false), pain: () => 2, sfx: 'drill_low', leftErr: 'Sisa tambalan sementara tertinggal',
      prog: [196, 186, 128, 'Tambalan'], instr: 'Tahan klik & gosok tambalan sementara.', done: () => { ps.top = null; }, art: () => workGlow(95, 110, 120) }),
    stale ? psaUrut({ name: 'Bersihkan ulang', tool: 'naocl', label: 'Dressing basi (> 14 hari)', items: [['naocl', 'NaOCl', 'naocl'], ['pp', 'Paper', 'pp'], ['caoh', 'CaOH2', 'caoh']], seq: () => ['naocl', 'pp'],
      instr: 'Dressing sudah basi. Bilas ulang dulu sebelum irigasi akhir.', art: j => psaArt(j) }) : null,
    psaUrut({ name: 'Irigasi akhir', tool: 'edta', label: 'Irigasi akhir', items: [['naocl', 'NaOCl', 'naocl'], ['nacl', 'Salin', 'nacl'], ['edta', 'EDTA', 'edta'], ['pp', 'Paper', 'pp'], ['caoh', 'CaOH2', 'caoh'], ['gp', 'GP', 'gp']],
      seq: () => ['naocl', 'nacl', 'edta', 'nacl', 'naocl', 'pp'], y: 104,
      skipText: miss => miss.includes('nacl') ? 'EDTA bertemu NaOCl tanpa bilas salin: NaOCl jadi tidak aktif' : 'Langkah irigasi terlewat: ' + miss.map(m => ITEM_NAME[m] || m).join(', '),
      bad: { gp: 'Gutta-percha masuk sebelum saluran kering', caoh: 'Ca(OH)2 tidak dipakai lagi di kunjungan 2' }, instr: 'Klik bahan sesuai urutan irigasi akhir.',
      on: (j, id) => { if (id === 'naocl' && ps.ch === 'dress') { ps.ch = 'open'; ps.cs.forEach(c => { c.st = 'shape'; }); } }, art: j => psaArt(j) }),
    ps.adv ? stAktivasi() : null,
    psaUrut({ name: 'Sealer', tool: 'sealer', label: 'Sealer', items: [['sealer', 'Sealer', 'sealer'], ['gp', 'GP', 'gp'], ['naocl', 'NaOCl', 'naocl']], seq: () => ['sealer'], bad: { naocl: 'Saluran dibasahi lagi setelah dikeringkan' },
      instr: 'Oles sealer ke dinding saluran sebelum gutta-percha.', art: j => psaArt(j) }),
    ...ps.cn.map((c, ci) => stSeq(ps.cn.length > 1 ? 'Obturasi ' + c[0] : 'Obturasi', [
      stTahan({ tool: 'gp', za: CFG.K3.PSA.WL_ZA, z: CFG.K3.PSA.WL_Z, rate: .34, at: [196, 162, 128], label: 'Master cone ' + (ps.adv ? 'F2' : '#35'), labels: ['', '', 'PAS'], instr: 'Tahan untuk memasukkan gutta-percha, lepas tepat di panjang kerja.', warn: 'Lewat = overfilling',
        over: j => mgErr(j, 'minor', 'Gutta-percha lewat apeks (overfilling)'), art: (j, st) => { ps.cur = ci; psaArt(j, { k: 'gp', d: (st ? st.f : 0) * 1.15 }); psaApexLine(); } }),
      stTepat({ tool: 'spr', n: 2, z: .3, label: 'Kondensasi lateral', sfx: 'fill_press', instr: 'Tekan saat penanda di hijau: spreader menekan GP, cone tambahan masuk.', warn: 'Meleset = ada rongga',
        end: (j, miss) => { if (miss) mgErr(j, 'minor', 'Kondensasi kurang padat, ada rongga di saluran'); ps.cs[ci].st = 'gp'; }, art: j => { ps.cur = ci; psaArt(j, { k: 'spr', d: .8 }); } })])),
    stTepat({ name: 'Potong GP', tool: 'gp', n: 1, z: .3, label: 'Potong di mulut saluran', instr: 'Tekan saat penanda di hijau untuk memotong GP dengan alat panas.', end: (j, miss) => { if (miss) mgErr(j, 'minor', 'GP terpotong terlalu dalam'); ps.ch = 'open'; }, art: j => psaArt(j) }),
    stPick({ name: 'Bahan tambal', tool: 'gic', cols: 1, x: 196, w: 130, title: () => 'Tambal permanen', instr: 'Pilih bahan tambal permanen di atas basis.', art: j => psaArt(j),
      cards: () => [{ k: 'gic', t: 'GIC', d: 'Basis + GIC', icon: 'gic' }, { k: 'komp', t: 'Komposit', d: 'Basis + komposit', icon: 'resin', lock: t2Own('hs') ? null : 'Komposit butuh bor high-speed + LED.', lockLabel: t2Own('hs') ? null : 'T2' }],
      after: (j, picks) => { j.permMat = picks[0].k; } }),
    psaUrut({ name: 'Basis & tambal', tool: 'liner', label: 'Basis lalu tambal', items: [['liner', 'Basis', 'liner'], ['cond', 'Kondis', 'cond'], ['etch', 'Etsa', 'etch'], ['bond', 'Bond', 'bond'], ['gic', 'GIC', 'gic'], ['resin', 'Resin', 'resin']],
      seq: j => j.permMat === 'komp' ? ['liner', 'etch', 'bond', 'resin'] : ['liner', 'cond', 'gic'], bad: { etch: 'Etsa fosfat dipakai pada GIC' },
      on: (j, id) => { if (id === 'liner') ps.base = true; if (id === 'gic') ps.top = 'gic'; if (id === 'resin') ps.top = 'komp'; }, instr: 'Pasang basis di atas GP, lalu tambal permanen.', art: j => psaArt(j) }),
    stGigit(), stInstr('psa2')].filter(Boolean);
};
/** Perforasi saat akses PSA: hasil Gagal, gigi tidak bisa dipertahankan → kembali untuk cabut. */
function psaPerf(job, st) {
  sfx('drill_oops'); mgHurt(job, 15); if (job.phase !== 'play') return; mgErr(job, 'major', 'Perforasi saat open akses');
  job.failReturn = 'perforasi'; job.failSay = 'Saya datang kontrol, Dok. Gigi yang dibor kemarin masih cenut-cenut.'; job.instrKey = 'sementara';
  mgDetour(job, [stSemBahan(), stSemIsi(), stInstr('sementara')]); toast('Perforasi! Tutup dulu dengan tambalan sementara.', 'bad'); fin(st);
}
/** Setelah K1 selesai: catat hari K1 di data pasien (untuk dressing basi di K2). Dipanggil dari jrProc via k3Proc. */
function k3Proc(job, R) { sterilUse(job.tx); if (job.tx === 'psa' && !R.fail && S.clinic.people && S.clinic.people[job.p.pid]) S.clinic.people[job.p.pid].psaDay = S.day; }

/* ---- Pengait uji draf ---- */
function startUji3() {
  startUji(); S.clinicStage = 3; S.money = 250000000; S.repPts = CFG.CLINIC.REP_STARS[1] + 10; t2St().own.hs = 1; t2St().own.perio = 1; t2St().own.file = 1;
  const key = CFG.CLINIC_ROOM[3], w = getRoom(key); S.where = { type: 'room', room: key, door: null }; S.where.door = roomDoor(S.where); S.px = w.nx + 18; S.py = w.fh - 12; game.world = w;
  game.trans.sub = 'Klinik tahap 3 · ' + rupiah(S.money);
}
const K3_TEST = { steril: { use: sterilUse, act: sterilize, close: sterilClose, tick: sterilTick, guard: sterilGuard, blocks: sterilBlocks, newDay: k3NewDay },
  room(n) { S.clinicStage = n; const key = CFG.CLINIC_ROOM[n]; game.roomCache = {}; const w = getRoom(key); S.where = { type: 'room', room: key, door: null }; S.where.door = roomDoor(S.where); S.px = w.nx + 18; S.py = w.fh - 12; game.world = w; },
  up3: openUpgrade3, staff: openStaffG, rekanTick, rekanFinish, uji3: startUji3, psaState, txPay, pos: () => CLINIC_POS.klinik3,
  hire: (role, id) => { S.staff[role] = { id, skill: 1, en: 1, energy: CFG.STAFF.ENERGY_MAX, off: false, train: null }; } };
if (/[?&#]uji=klinik3(?!\w)/.test(location.search + location.hash)) setTimeout(startUji3, 0);
