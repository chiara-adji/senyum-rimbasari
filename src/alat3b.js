/* ==== Fase 3b-2: Alat Tier 2 (rak Bahari Medika) + Tambal Komposit — ACC user 2026-11-17 ====
 * Klinik tahap 2 sudah termasuk scaler ultrasonik + bius blok (gratis). Rak T2 (terbuka ≥8 challenge) menjual
 * bor high-speed + LED + komposit, periotome, dan file tangan PSA (dipakai mulai tahap 3, Fase 3b-3).
 * Alat dikirim Ilham, terpasang besok pagi. Minigame komposit: design/gdd/minigame/05-tambal-komposit.md. */
CFG.ALAT_T2 = { /* [3b] */
  ANT_P: 0.3,          // peluang kasus tambal jadi karies gigi depan (butuh komposit) setelah bor high-speed terpasang
  PERIO_ZONE: 0.15,    // periotome: zona sukses cabut +15%
  KOMP_TIER: 1.6,      // harga wajar komposit = basis × pengali T2 (GDD §4.1, minigame/05)
  SHADE_TRUST: 1,      // warna resin cocok (gigi depan): trust NPC +1
};
/** Isi rak: [id, nama, ikon TLD, harga, efek, syarat]. syarat: 'bawaan' = gratis dari klinik tahap 2, 'tahap3' = dipakai di klinik tahap 3. */
const T2_ITEMS = [
  ['ult', 'Scaler Ultrasonik + Bius Blok', 'ult', 0, 'Bawaan klinik tahap 2, gratis.', 'bawaan'],
  ['hs', 'Bor High-speed + LED + Komposit', 'lgt', 15000000, 'Buka Tambal Komposit sewarna gigi.', null],
  ['perio', 'Periotome', 'per', 8000000, 'Cabut lebih mudah: zona sukses +15%.', null],
  ['file', 'File Tangan PSA', 'fil', 9000000, 'Perawatan saluran akar (PSA).', 'tahap3'],
];
const t2Item = id => T2_ITEMS.find(it => it[0] === id);
/** State alat T2: own = {id: hari terpasang}, ship = {id: hari tiba}. */
function t2St() { if (!S.t2) S.t2 = { own: {}, ship: {} }; return S.t2; }
/** Alat T2 sudah terpasang di klinik? ult/blok = bawaan tahap 2. */
function t2Own(id) { if (id === 'ult' || id === 'blok') return S.clinicStage >= 2; return !!t2St().own[id]; }
const t2Disc = () => friendDisc() + (jrF('t2disc') ? CFG.JURNAL.T2_DISC : 0);
const t2Price = it => Math.round(it[3] * (1 - t2Disc()) / 1000) * 1000;
const t2Locked = () => challengesDone() < CFG.TRIP.T2_CHALLENGES;
/** Pagi: alat yang dikirim kemarin terpasang (kabar di kartu pagi). Dipanggil dari newDay. */
function t2NewDay(news) {
  const T = t2St();
  for (const id in T.ship) if (S.day >= T.ship[id]) { T.own[id] = S.day; delete T.ship[id]; news.push('Ilham mengantar ' + t2Item(id)[1] + ' dari Bahari Medika. Sudah terpasang di klinik.'); }
}
/** Status kartu rak: ok (terpasang) · kirim · tahap2 · tahap3 · null (bisa dibeli). */
function t2Status(it) {
  const T = t2St();
  if (it[5] === 'bawaan') return S.clinicStage >= 2 ? 'ok' : 'tahap2';
  if (T.own[it[0]]) return 'ok'; if (T.ship[it[0]]) return 'kirim';
  if (it[5] === 'tahap3' && S.clinicStage < 3) return 'tahap3';
  return null;
}

/** Panel rak alat T2 di Bahari Medika (tombol Alat). Klik tombol kartu = beli, dengan konfirmasi Koh Hendra. */
function openRakT2() {
  const W = 384, H = 252, X = 240 - W / 2, Y = 9, n = T2_ITEMS.length;
  openOverlay({ kind: 'rakT2', sel: 1, t: 0,
    update() {
      this.t++;
      if (hit('esc') && this.t > 1) { closeOverlay(); return; }
      if (hit('up')) this.sel = (this.sel + n - 1) % n; if (hit('down')) this.sel = (this.sel + 1) % n;
      if (input.click) { const h = topHit(input.click, /^at\d|^atb|^atx/); if (h) { if (h.id === 'atb') { closeOverlay(() => openBahari()); return; } if (h.id === 'atx') { closeOverlay(); return; } this.sel = +h.id.slice(2); this.buy(); return; } }
      if (okHit() && this.t > 2) this.buy();
    },
    buy() {
      const it = T2_ITEMS[this.sel], st = t2Status(it), p = t2Price(it);
      const why = t2Locked() ? 'Rak T2 terbuka setelah ' + CFG.TRIP.T2_CHALLENGES + ' challenge.' : st === 'ok' ? 'Sudah terpasang di klinik.' : st === 'kirim' ? 'Sedang dikirim, terpasang besok pagi.'
        : st === 'tahap2' ? 'Ikut gratis saat klinik naik ke tahap 2.' : st === 'tahap3' ? 'Butuh klinik tahap 3.' : S.money < p ? 'Uangmu belum cukup.' : null;
      if (why) { sfx('ui_deny'); toast(why, 'bad'); return; }
      closeOverlay(() => dialog(['Beli ' + it[1] + ' seharga ' + rupiah(p) + '?'], { speaker: 'Koh Hendra', choices: [
        { label: 'Beli', fn: () => { S.money -= p; t2St().ship[it[0]] = S.day + 1; if (jrF('t2disc')) S.jr.f.t2disc = false; sfx('coin');
          dialog(['Haiya, pilihan bagus, Dok. Sore ini saya titip Ilham. Besok pagi sudah terpasang di klinik.'], { speaker: 'Koh Hendra' }); } },
        { label: 'Nanti saja', fn: () => openRakT2() }] }));
    },
    drawHD() {
      hDim(this, .45);
      dropIn(this, X, Y, W, H, () => {
        const lock = t2Locked();
        hBox(X, Y, W, H, 'paper', { ornate: true });
        HT('Bahari Medika', 240, Y + 8, MGC.ink, { k: 4, sh: '#e8b878', align: 'c' });
        HT('Rak Alat Tier 2', 240, Y + 30, MGC.ink2, { align: 'c', bold: true });
        hDivider(X + 14, Y + 42, W - 28);
        const hv = hoverId();
        T2_ITEMS.forEach((it, i) => {
          const cy = Y + 49 + i * 41, cx = X + 12, cw = W - 24, st = t2Status(it), s = i === this.sel && !lock;
          if (hv === 'at' + i && !lock) this.sel = i;
          hInset(cx, cy, cw, 37, st === 'ok' ? '#e4efd0' : '#f6e4b8');
          if (s) hGlow(cx, cy, cw, 37);
          hInset(cx + 5, cy + 5, 27, 27, null, true); toolIcon({ icon: it[2] }, cx + 10.5, cy + 10.5);
          HT(it[1], cx + 38, cy + 5, MGC.ink, { bold: true });
          HT(fitText(it[4], 244), cx + 38, cy + 16, MGC.ink2);
          const p = t2Price(it);
          if (st === 'ok' || st === 'kirim') HT('Milikmu', cx + 38, cy + 27, '#2e6a34', { bold: true });
          else if (it[5] === 'bawaan') HT('Gratis', cx + 38, cy + 27, '#2e6a34', { bold: true });
          else if (p < it[3]) { const w0 = HT(rupiah(it[3]), cx + 38, cy + 27, '#9a7a5a'); hR(cx + 38, cy + 30.5, w0, 1, '#9a7a5a'); HT(rupiah(p), cx + 44 + w0, cy + 27, '#2e6a34', { bold: true }); }
          else HT(rupiah(p), cx + 38, cy + 27, MGC.ink, { bold: true });
          const lb = { ok: 'Terpasang', kirim: 'Dikirim', tahap2: 'Tahap 2', tahap3: 'Tahap 3' }[st] || 'Beli', off = !!st || lock;
          const bx = cx + cw - 70, by = cy + 8;
          hBtn(bx, by, 64, 21, lb, { on: s && !off, kind: off ? 'dark' : s ? null : 'paper', bold: true });
          if (off) { hc.fillStyle = 'rgba(70,50,30,.35)'; hc.fillRect(Math.round(bx * HI), Math.round(by * HI), 64 * HI, 21 * HI); }
          clickable(bx, by, 64, 21, () => {}, 'at' + i);
        });
        if (lock) {
          hc.fillStyle = 'rgba(60,36,16,.55)'; hc.fillRect(Math.round((X + 10) * HI), Math.round((Y + 47) * HI), Math.round((W - 20) * HI), 166 * HI);
          hBox(X + 62, Y + 98, W - 124, 60, 'dark', { thin: true });
          HT('Rak terkunci', 240, Y + 106, MGC.lite, { k: 4, align: 'c', sh: DK });
          HT('Selesaikan ' + CFG.TRIP.T2_CHALLENGES + ' challenge · sekarang ' + challengesDone() + '/' + CFG.TRIP.T2_CHALLENGES, 240, Y + 128, '#ffd86a', { align: 'c', sh: DK });
          HT('Koh Hendra: "Kerja yang rapi dulu, Dok."', 240, Y + 141, MGC.lite2, { align: 'c', sh: DK });
        }
        const fy = Y + H - 33, d = t2Disc();
        HT(d ? 'Diskon ' + Math.round(d * 100) + '%' + (friendDisc() ? ' · harga teman Koh Hendra' : '') + (jrF('t2disc') ? ' · Jurnal' : '') : 'Belum ada diskon', X + 14, fy + 1, d ? '#2e6a34' : MGC.ink2);
        HT('Uangmu ' + rupiah(S.money), X + 14, fy + 12, MGC.ink2);
        const b1 = X + W - 150, s2 = hv === 'atb', s3 = hv === 'atx';
        hBtn(b1, fy, 66, 21, 'Bahan', { kind: s2 ? null : 'paper', on: s2, bold: true }); clickable(b1, fy, 66, 21, () => {}, 'atb');
        hBtn(b1 + 72, fy, 66, 21, 'Tutup', { kind: s3 ? null : 'paper', on: s3, bold: true }); clickable(b1 + 72, fy, 66, 21, () => {}, 'atx');
      });
    } });
}

/* ---- Tambal Komposit (gigi belakang) & Komposit Veneer (gigi depan, estetik) ----
 * Harga wajar akhir (Musim Hujan): Komposit 500rb, Veneer 800rb (user 2026-11-17). Pengali T2 ×1,6 tetap di rumus,
 * jadi basis = harga akhir / 1,6. Kemarau ×1,1 seperti tindakan lain. */
const T_FRONT = [11, 12, 13, 21, 22, 23, 31, 32, 33, 41, 42, 43], T_FRONT_UP = [11, 12, 21, 22];
CASES.komposit = { name: 'Tambal Komposit', short: 'Komposit', base: 500000 / CFG.ALAT_T2.KOMP_TIER, energy: 15, min: 35, stock: 1, t2: 'hs', tier: CFG.ALAT_T2.KOMP_TIER,
  says: ['Ada lubang di geraham, Dok. Mau ditambal yang warnanya sama gigi.', 'Gigi belakang saya bolong, Dok.'] };
CASES.veneer = { name: 'Komposit Veneer', short: 'Veneer', base: 800000 / CFG.ALAT_T2.KOMP_TIER, energy: 15, min: 40, stock: 1, t2: 'hs', tier: CFG.ALAT_T2.KOMP_TIER,
  says: ['Gigi depan saya patah, Dok, habis jatuh.', 'Gigi depan saya kekuningan, Dok. Malu kalau senyum.'] };
TARIFF_KEYS_ALL.splice(TARIFF_KEYS_ALL.indexOf('gic') + 1, 0, 'komposit', 'veneer');
/** Kasus gigi depan (estetik) → Komposit Veneer. Muncul setelah bor high-speed terpasang. */
DX.kariesA = { name: 'Karies gigi depan', tx: 'veneer', teeth: T_FRONT, adult: true, t2: 'hs',
  says: ['Gigi depan saya ada yang hitam, Dok. Malu kalau senyum.', 'Gigi depan saya bolong kecil, Dok. Kalau minum dingin ngilu.'],
  a: { keluhan: 'Yang hitam {loc}, Dok.', sejak: 'Sudah beberapa bulan, makin kelihatan.', kapan: 'Kadang ngilu kalau minum dingin. Sebentar saja.', bengkak: 'Nggak ada bengkak.', gusi: 'Nggak.' },
  f: { kaca: 'Lubang kecil di gigi depan, sonde nyangkut', dingin: 'Ngilu, cepat hilang' },
  opts: [{ tx: 'veneer', g: 'ideal' }, { tx: 'gic', g: 'ok' }] };
DX.fraktur = { name: 'Fraktur gigi depan', tx: 'veneer', teeth: T_FRONT_UP, adult: true, t2: 'hs',
  says: ['Gigi depan saya patah, Dok. Kemarin jatuh dari motor.', 'Ujung gigi depan saya gompal, Dok, kena gelas.'],
  a: { keluhan: 'Yang patah {loc}, Dok.', sejak: 'Dua hari lalu, habis jatuh.', kapan: 'Agak ngilu kalau kena angin. Nggak sakit terus.', bengkak: 'Bibirnya sempat bengkak, sekarang sudah kempis.', gusi: 'Nggak.' },
  f: { kaca: 'Ujung gigi patah, belum sampai saraf', dingin: 'Sedikit ngilu, cepat hilang', perkusi: 'Tidak sakit' },
  opts: [{ tx: 'veneer', g: 'ideal' }, { tx: 'gic', g: 'ok' }] };
DX.diskolor = { name: 'Gigi depan kekuningan', tx: 'veneer', teeth: T_FRONT_UP, adult: true, t2: 'hs',
  says: ['Gigi depan saya kekuningan, Dok. Malu kalau senyum.', 'Ada bercak di gigi depan saya, Dok. Bisa ditutup?'],
  a: { keluhan: 'Warnanya {loc}, Dok. Kuning, ada bercaknya.', sejak: 'Dari dulu, tapi makin kelihatan.', kapan: 'Nggak sakit, cuma malu.', bengkak: 'Nggak.', gusi: 'Nggak.' },
  f: { kaca: 'Bercak kekuningan di permukaan depan, tidak berlubang' },
  opts: [{ tx: 'veneer', g: 'ideal' }] };
['karies', 'kariesP', 'pulpRev'].forEach(k => DX[k].opts.push({ tx: 'komposit', g: 'ideal' }));
/** Hanya tindakan yang alatnya ada yang muncul di Rencana Perawatan & Tarif. */
const txAvail = tx => (!CASES[tx] || !CASES[tx].t2 || t2Own(CASES[tx].t2)) && (tx !== 'bleaching' || blKit() > 0); /* bleaching butuh kit */
const dxAvail = k => !DX[k].t2 || t2Own(DX[k].t2);
/** rollCase: sebagian kasus tambal dewasa jadi kasus gigi depan (veneer) setelah bor high-speed terpasang. */
function t2Case(kase, dx, kid) { return kase === 'gic' && !kid && t2Own('hs') && Math.random() < CFG.ALAT_T2.ANT_P ? pickA(Math.random() < CFG.BLEACH.KUNING_P ? ['kuning'] : ['kariesA', 'fraktur', 'diskolor']) : dx; }
/** Pengubah minigame dari alat T2 (dipanggil di mgJob). */
function t2JobMods(job) { if ((job.tx === 'cabut' || job.tx === 'cabutSusu') && t2Own('perio')) job.zoneMul *= 1 + CFG.ALAT_T2.PERIO_ZONE; }

Object.assign(MG_TITLE, { komposit: 'Tambal Komposit', veneer: 'Komposit Veneer' });
Object.assign(DX_EDU, { kariesA: 'karies', fraktur: 'sehat', diskolor: 'sehat' });
TRAY.komposit = TRAY.veneer = [['dam', 'Isolasi', 'dam'], ['etch', 'Etsa', 'etch'], ['bond', 'Bonding', 'bond'], ['resin', 'Resin', 'resin'], ['lgt', 'LED', 'lgt'], ['art', 'Kertas', 'art']];
Object.assign(ITEM_NAME, { dam: 'isolasi', bond: 'bonding', resin: 'resin', lgt: 'sinar LED' });
INSTR.komposit = ['Boleh langsung makan, tambalan sudah keras', 'Kurangi kopi & teh 2 hari supaya warnanya awet'];
INSTR.veneer = ['Jangan gigit benda keras pakai gigi depan', 'Kurangi kopi, teh & rokok supaya warnanya awet'];
/** Warna resin (VITA A1–A3): [kode, nama, warna gambar]. */
const SHADES = [['A1', 'Terang', '#f8f4ea'], ['A2', 'Sedang', '#eedcb4'], ['A3', 'Agak kuning', '#dcc08a']];
/** Warna gigi asli pasien: muda cenderung A1, dewasa A2, lansia A3 (acak sedikit, tetap per pasien). */
function patientShade(p) { const h = hash(p.pid || 1, 91); if (p.body === 'old') return h < .8 ? 2 : 1; return h < .2 ? 0 : h < .8 ? 1 : 2; }
/** Gambar contoh warna berbentuk mahkota gigi depan. */
function shadeTooth(X, Y, w, h, col) {
  for (let j = 0; j < h; j++) { const v = j / h, inset = v < .15 ? (1 - v / .15) * w * .18 : v > .8 ? (v - .8) / .2 * w * .12 : 0;
    hR(X + inset, Y + j, w - inset * 2, 1, mixH(col, '#a89878', v * .35)); }
  hR(X + w * .22, Y + h * .18, 2, h * .45, 'rgba(255,255,255,.75)'); hR(X, Y + h - 1, w, 1, 'rgba(90,60,30,.5)');
}
/** Langkah pilih warna: contoh warna di bawah tiap kartu, gigi sebelah pasien di bawahnya. Nama warna gigi pasien tidak ditulis. */
const stShade = () => stPick({ name: 'Pilih warna', tool: 'resin', cols: 3, quiet: true, h: 46, title: () => 'Cocokkan warna resin dengan gigi sebelahnya.', instr: 'Cocokkan gigi pasien dengan contoh warna.',
  cards: () => SHADES.map(([k, d], i) => ({ k: i, t: 'Warna ' + k, d, icon: 'resin' })),
  art: j => { const X0 = 13, cw = (312 - 12) / 3;
    SHADES.forEach((s, i) => shadeTooth(X0 + i * (cw + 6) + cw / 2 - 9, 114, 18, 24, s[2]));
    hR(13, 146, 312, 1, 'rgba(255,220,150,.25)'); HT('Gigi sebelah pasien', 169, 151, MGC.lite2, { align: 'c', sh: DK });
    shadeTooth(158, 163, 22, 29, SHADES[j.shade][2]); },
  judge: (j, picks) => { j.shadeOk = picks[0].k === j.shade; if (j.shadeOk && j.p.npc) addTrust(j.p.npc, CFG.ALAT_T2.SHADE_TRUST);
    toast(j.shadeOk ? 'Warnanya pas dengan gigi sebelah.' : 'Pasien: "Kok warnanya agak beda ya, Dok?"', j.shadeOk ? 'good' : 'bad'); } });
/** Komposit & veneer: bius → (warna) → bor → isolasi/etsa/bilas → keringkan → bonding → sinar → isi berlapis → gigitan → instruksi. */
function buildKomposit(job, veneer) {
  job.tray = TRAY.komposit; job.instrKey = veneer ? 'veneer' : 'komposit';
  const deep = job.deep, prox = job.p.dx === 'kariesP', front = veneer || T_FRONT.includes(job.t), cav = prox ? 'prox' : deep ? 'deep' : 'shallow', layers = deep ? 3 : 2;
  job.shade = patientShade(job.p); job.layer = 0;
  const A = o => j => artCross(j, o), fillArt = j => artCross(j, { cav, liner: !!j.liner, fill: Math.min(1, .2 + .8 * j.layer / layers) });
  const items = [['dam', 'Isolasi', 'dam'], ['liner', 'Pelapik', 'liner'], ['etch', 'Etsa', 'etch'], ['irr', 'Bilas', 'irr'], ['bond', 'Bonding', 'bond'], ['cot', 'Kapas', 'cot']];
  const layerSteps = [];
  for (let i = 1; i <= layers; i++) layerSteps.push(
    stTahan({ tool: 'resin', label: 'Isi lapis ' + i, za: .5, z: .3, at: [196, 166, 130], labels: ['TIPIS', '2 MM', 'TEBAL'], sfxLoop: 'fill_press', instr: 'Tahan untuk mengisi resin, lepas di garis 2 mm.', warn: '> 2 mm = tidak keras', art: fillArt,
      over: j => mgErr(j, 'minor', 'Lapisan resin lebih dari 2 mm') }),
    stTepat({ tool: 'lgt', n: 1, z: .3, label: 'Sinar LED', instr: 'Tekan saat penanda di zona hijau untuk menyinari.', warn: 'Meleset = lapisan lunak',
      end: (j, miss) => { j.layer++; if (miss) mgErr(j, 'minor', 'Sinar LED meleset, lapisan lunak'); }, art: fillArt }));
  const dxk = job.p.dx, prepName = dxk === 'fraktur' ? 'Rapikan patahan' : dxk === 'diskolor' ? 'Preparasi tipis' : 'Bor high-speed';
  return [
    stBius({ art: A({ caries: cav }), warn: deep ? 'Karies dalam' : veneer ? 'Preparasi tipis boleh tanpa bius' : 'Karies dangkal boleh tanpa bius' }),
    front && stShade(),
    stGosok({ ...DRILL(), name: prepName, tool: 'bur', cursor: 'bur', r: 3, speed: 9, set: () => labJob(job) ? setBorL(job) : setBor(deep, 1, prox), pain: j => 10 * (deep && j.B < .3 ? 2 : 1), sfx: 'drill_low', soft: { pain: 5 }, hard: (j, st) => mgPerforasi(j, st, 'gic'),
      leftErr: veneer ? 'Permukaan belum rata' : 'Sisa karies tertinggal', prog: [196, 186, 128, veneer ? 'Preparasi' : 'Karies'], instr: 'Tahan klik & gosok sampai bersih. Bor high-speed lebih cepat.', warn: labJob(job) ? 'Jaga email yang sehat' : 'Jangan sentuh pulpa',
      art: () => workGlow(95, 110, 120), over: (j, st) => { if (labJob(j)) { labTags(j, st); return; } hTag(veneer ? 'Email' : 'Karies', 214, 50, '#f0a048', ...zp(st, prox ? 52 : 92, prox ? 38 : 30)); hTag('Pulpa', 214, 72, '#ee98a4', ...zp(st, 100, 62)); } }),
    stSeq('Isolasi + bonding', [
      stUrut({ tool: 'dam', items, seq: () => deep ? ['dam', 'liner', 'etch', 'irr'] : ['dam', 'etch', 'irr'], extra: ['liner'], label: 'Isolasi & etsa', instr: 'Pasang isolasi, lalu etsa dan bilas.',
        skipText: m => m.includes('dam') ? 'Tanpa isolasi: bonding tercemar ludah' : 'Langkah terlewat: ' + m.map(x => ITEM_NAME[x] || x).join(', '),
        on: (j, id) => { if (id === 'liner') j.liner = true; if (id === 'etch') sfx('etch_brush'); }, art: j => artCross(j, { cav, liner: !!j.liner }) }),
      stTahan({ tool: 'dry', label: 'Keringkan', za: .3, z: .35, at: [196, 166, 130], labels: ['BASAH', 'LEMBAP', 'KERING'], sfxLoop: 'air_water', instr: 'Tahan untuk meniup udara, lepas di zona lembap.', warn: 'Terlalu kering = ngilu', art: A({ cav }),
        over: j => mgErr(j, 'minor', 'Kavitas terlalu kering') }),
      stUrut({ tool: 'bond', items, seq: () => ['bond'], bad: { irr: 'Bonding dibilas sebelum disinar' }, label: 'Oles bonding', instr: 'Oles bonding ke seluruh permukaan.', on: () => sfx('etch_brush'), art: j => artCross(j, { cav, liner: !!j.liner }) }),
      stTepat({ tool: 'lgt', n: 1, z: .3, label: 'Sinar bonding', instr: 'Tekan saat penanda di zona hijau untuk menyinari bonding.', warn: 'Meleset = bonding lunak',
        end: (j, miss) => { if (miss) mgErr(j, 'minor', 'Bonding tidak tersinar sempurna'); }, art: j => artCross(j, { cav, liner: !!j.liner }) })]),
    stSeq(veneer ? 'Bentuk berlapis' : 'Isi berlapis', layerSteps),
    stGigit(() => 1 + (Math.random() < .5 ? 1 : 0)),
    stInstr(job.instrKey)].filter(Boolean); /* gigi belakang: tanpa langkah pilih warna */
}
MG_BUILD.komposit = job => buildKomposit(job, false);
MG_BUILD.veneer = job => buildKomposit(job, true);

/* ==== [3b-2] Gigi depan tampak labial di minigame tambal (ACC user 2026-11-17). Gambar: toothL/labShape di design/v3/src/anterior.js. ==== */
/** Tambal GIC/Komposit/Veneer pada gigi depan memakai gambar tampak labial (perawatan lain tetap potongan). */
const labJob = job => !!job && ['gic', 'komposit', 'veneer'].includes(job.tx) && T_FRONT.includes(job.t);
/** Opsi gambar potongan geraham → opsi tampak labial sesuai diagnosis gigi depan. */
function labOpt(job, o) {
  o = o || {}; const dx = job.p.dx, r = {};
  if (dx === 'fraktur') { r.frac = 1; if (o.cav) r.cav = 'frac'; }
  else if (dx === 'diskolor') { r.stain = 1; if (o.cav) r.cav = 'stain'; }
  else { if (o.caries) r.caries = o.caries === 'shallow' ? 'shallow' : 'deep'; if (o.cav) r.cav = o.cav === 'shallow' ? 'lab' : 'deep'; }
  if (o.liner) r.liner = 1; if (o.fill) r.fill = o.fill; return r;
}
/** Set GOSOK preparasi gigi depan: target = karies/patahan/permukaan berubah warna; email sehat di luar target = ngilu (tanpa perforasi). */
function setBorL(job, s = 1) {
  const dx = job.p.dx, deep = !!job.deep, key = 'borL' + dx + deep + s; if (MGI[key]) return MGI[key];
  const pre = labOpt(job, { caries: deep ? 'deep' : 'shallow' }), post = labOpt(job, { cav: deep ? 'deep' : 'shallow' });
  const base = toothL(pre, s), aft = toothL(post, s), w = base.width, h = base.height, B = idata(base).data, F = idata(aft).data, H0 = idata(toothL({}, s)).data, L = labShape(pre);
  const n = w * h, target = new Uint8Array(n), bad = new Uint8Array(n);
  for (let k = 0; k < n; k++) { const i = bc(k % w, s), j = bc((k / w) | 0, s); if (!L.inCrown(i, j)) continue;
    if (pxDiff(B, F, k) || (!pre.frac && !pre.stain && pxDiff(B, H0, k))) target[k] = 1; else bad[k] = 1; }
  const before = recolor(cloneCv(base), target, (i, j, c) => pre.caries ? mixA(c, [150, 92, 44], .25) : null);
  return MGI[key] = { before, after: aft, target, bad, ox: 12, oy: 36, k: 1, make2: s === 1 ? () => setBorL(job, 2) : null };
}
/** Label area kerja gigi depan (pengganti label Karies/Pulpa potongan geraham). */
function labTags(job, st) {
  const dx = job.p.dx, L = labShape({});
  if (dx === 'fraktur') hTag('Patahan', 214, 50, '#f0a048', ...zp(st, 72, 24));
  else if (dx === 'diskolor') hTag('Email kuning', 214, 50, '#f0a048', ...zp(st, 85, 44));
  else hTag('Karies', 214, 50, '#f0a048', ...zp(st, L.lx(), L.ly));
}
