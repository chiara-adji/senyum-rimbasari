/* ==== [3b-2] Bleaching (usulan & ACC user 2026-11-17) ====
 * Kasus "Gigi kuning menyeluruh" → Bleaching (ideal) / Veneer (cukup). Butuh LED dari paket Bor High-speed (hs) + Kit Bleaching dari Bahari Medika.
 * Minigame: tata letak scaling (4 panel, 8 gigi depan): pelindung gusi → oles gel → sinar LED → sedot gel → instruksi.
 * Draf ACC: design/v3/bleaching.html (bukti fase3b2-draf-09). */
CFG.BLEACH = { BASE: 1000000 /* [3b] harga wajar akhir Musim Hujan */, KIT_PRICE: 400000 /* [3b] */, KIT_USES: 4 /* [3b] pasien per kit */, KUNING_P: 0.25 /* [3b] bagian kasus gigi depan */,
  LED_N: 2 /* [3b] */, GUM_LIMIT: 3 /* [3b] gel kena gusi boleh 3× */ };
const blKit = () => (t2St().kit || 0);
CASES.bleaching = { name: 'Bleaching', short: 'Bleaching', base: CFG.BLEACH.BASE / CFG.ALAT_T2.KOMP_TIER, energy: 14, min: 45, stock: 0, t2: 'hs', tier: CFG.ALAT_T2.KOMP_TIER,
  says: ['Gigi saya kuning semua, Dok. Bisa diputihkan?', 'Mau putihin gigi, Dok. Mau foto prewedding.'] };
TARIFF_KEYS_ALL.splice(TARIFF_KEYS_ALL.indexOf('veneer') + 1, 0, 'bleaching');
DX.kuning = { name: 'Gigi kuning menyeluruh', tx: 'bleaching', region: T_FRONT_UP, adult: true, t2: 'hs',
  says: ['Gigi saya kuning semua, Dok. Kebanyakan ngopi kayaknya.', 'Gigi saya kok kusam ya, Dok. Pengin lebih putih.'],
  a: { keluhan: 'Semua gigi depan kuning, Dok. Nggak ada yang bolong.', sejak: 'Lama, pelan-pelan makin kuning.', kapan: 'Nggak sakit, cuma kurang pede.', bengkak: 'Nggak.', gusi: 'Nggak.' },
  f: { kaca: 'Seluruh gigi depan kekuningan merata, tidak berlubang', dingin: 'Normal' },
  opts: [{ tx: 'bleaching', g: 'ideal' }, { tx: 'veneer', g: 'ok' }] };
Object.assign(MG_TITLE, { bleaching: 'Bleaching' });
Object.assign(DX_EDU, { kuning: 'sehat' });
TRAY.bleaching = [['bar', 'Barier', 'dam'], ['gel', 'Gel', 'etch'], ['lgt', 'LED', 'lgt'], ['suc', 'Sedot', 'irr']];
Object.assign(ITEM_NAME, { bar: 'pelindung gusi', gel: 'gel bleaching', suc: 'sedot' });
INSTR.bleaching = ['Hindari kopi, teh & rokok 48 jam', 'Ngilu 1-2 hari itu wajar, akan hilang sendiri'];

/** Tombol Kit Bleaching di Bahari Medika (muncul setelah LED/high-speed terpasang). */
function bleachKitBtns() {
  if (!t2Own('hs')) return [];
  const B = CFG.BLEACH, p = Math.round(B.KIT_PRICE * (1 - t2Disc()) / 1000) * 1000;
  return [{ label: 'Kit', fn: () => dialog(['Kit Bleaching isi ' + B.KIT_USES + ' pasien, ' + rupiah(p) + '. Stok di klinik ' + blKit() + ' pasien.'], { speaker: 'Koh Hendra', choices: [
    { label: 'Beli', fn: () => { if (S.money < p) { sfx('ui_deny'); toast('Uangmu belum cukup.', 'bad'); return; } S.money -= p; t2St().kit = blKit() + B.KIT_USES; sfx('coin'); toast('+' + B.KIT_USES + ' bleaching · stok kit ' + blKit(), 'good'); } },
    { label: 'Nanti saja', fn: () => {} }] }) }];
}

/** Panel 4 kuadran gigi depan (seperti setScaling) + peta gigi kerja. */
function blBase() {
  if (MGI.blBase) return MGI.blBase;
  const W = 318, H = 152, [c, x] = cv(W, H), zones = new Uint8Array(W * H), panels = [];
  for (let k = 0; k < 4; k++) {
    const u = k < 2, [pc, px] = cv(151, 55), g = px.createLinearGradient(0, 0, 0, 55); g.addColorStop(0, '#3a1218'); g.addColorStop(1, '#1e080c'); px.fillStyle = g; px.fillRect(0, 0, 151, 55);
    const tx = []; for (let i = 0; i < 5; i++) { const tX = 5 + i * 29; tx.push([tX + 13, 26]); frontTooth(px, tX, u ? 7 : 3, 26, 46, { lower: !u }); }
    gumBand(px, 0, u ? 0 : 31, 151, 24, tx, u);
    const ox = 3 + (k % 2) * 161, oy = 3 + Math.floor(k / 2) * 78; x.drawImage(pc, ox, oy); panels.push({ ox, oy, u, tx });
    for (let j = 0; j < 55; j++) for (let i = 0; i < 151; i++) zones[(oy + j) * W + ox + i] = k + 1;
  }
  const D = idata(c).data, n = W * H, gum = new Uint8Array(n), tooth = new Uint8Array(n), work = new Int16Array(n).fill(-1), bar = new Int16Array(n).fill(-1);
  for (let q = 0; q < n; q++) { if (!zones[q]) continue; const r = D[q * 4], g = D[q * 4 + 1], b = D[q * 4 + 2]; if (r > 170 && r - g > 45) gum[q] = 1; else if (r > 185 && g > 170 && b > 135) tooth[q] = 1; }
  const workTooth = (k, ti) => k % 2 === 0 ? ti >= 3 : ti <= 1;
  let id = 0; panels.forEach((P, k) => P.tx.forEach(([tc], ti) => { if (!workTooth(k, ti)) return; for (let j = 0; j < 55; j++) for (let X = P.ox + tc - 13; X <= P.ox + tc + 13; X++) { const q = (P.oy + j) * W + X; if (tooth[q]) work[q] = id; } id++; }));
  for (let q = 0; q < n; q++) if (gum[q]) { const i = q % W, j = (q / W) | 0; for (let b = -3; b <= 3 && bar[q] < 0; b++) for (let a = -1; a <= 1; a++) { const r = (j + b) * W + i + a; if (r >= 0 && r < n && work[r] >= 0) { bar[q] = work[r]; break; } } }
  return MGI.blBase = { c, W, H, gum, tooth, work, bar, zones, nTooth: id };
}
/** Gambar keadaan: yel (kuning) · bar (+pelindung) · gel (+gel) · white (putih + pelindung). */
function blImg(st) {
  const key = 'blImg' + st; if (MGI[key]) return MGI[key];
  const B = blBase(), c = cloneCv(B.c), x = c.getContext('2d'), d = x.getImageData(0, 0, B.W, B.H), D = d.data;
  const get = q => [D[q * 4], D[q * 4 + 1], D[q * 4 + 2]], set = (q, v) => { D[q * 4] = v[0]; D[q * 4 + 1] = v[1]; D[q * 4 + 2] = v[2]; };
  for (let q = 0; q < B.W * B.H; q++) {
    if (B.tooth[q]) { const w = B.work[q] >= 0;
      if (st === 'white' && w) set(q, mixA(get(q), [255, 253, 246], .25)); else set(q, mixA(get(q), [212, 168, 86], w ? .42 : .3));
      if (st === 'gel' && w) { set(q, mixA(get(q), [96, 206, 176], .5)); if (hash(q % B.W, (q / B.W) | 0) < .04) set(q, [214, 255, 240]); } }
    if (st !== 'yel' && B.bar[q] >= 0) set(q, hash(q % B.W, (q / B.W) | 0) < .15 ? [150, 210, 255] : [62, 132, 210]);
  }
  x.putImageData(d, 0, 0); return MGI[key] = c;
}
/** Set klik per gigi untuk langkah kind: bar (garis gusi) · gel (oles) · suc (sedot). Format sama dengan setScaling (chunks). */
function setBleach(kind) {
  const key = 'blSet' + kind; if (MGI[key]) return MGI[key];
  const B = blBase(), n = B.W * B.H, map = kind === 'bar' ? B.bar : B.work, target = new Uint8Array(n), chunk = new Int16Array(n), bad = kind === 'gel' ? new Uint8Array(n) : null, chunks = [];
  for (let i = 0; i < B.nTooth; i++) chunks.push({ id: i + 1, x0: 1e9, y0: 1e9, x1: -1, y1: -1 });
  for (let q = 0; q < n; q++) { const t = map[q]; if (t >= 0) { target[q] = 1; chunk[q] = t + 1; const c = chunks[t], X = q % B.W, Y = (q / B.W) | 0; c.x0 = Math.min(c.x0, X); c.x1 = Math.max(c.x1, X); c.y0 = Math.min(c.y0, Y); c.y1 = Math.max(c.y1, Y); }
    else if (bad && B.gum[q] && B.bar[q] < 0) bad[q] = 1; }
  const pair = { bar: ['yel', 'bar'], gel: ['bar', 'gel'], suc: ['gel', 'white'] }[kind];
  return MGI[key] = { before: blImg(pair[0]), after: blImg(pair[1]), target, bad, ox: 10, oy: 43, k: 1, zones: B.zones, chunk, chunks };
}
/** Langkah klik per gigi (pola stKarang): klik gigi/garis gusi untuk memasang. Gusi tanpa pelindung kena gel = sakit. */
function stBleach(o) {
  const s = { ...info(o), code: 'PILIH', key: o.key,
    enter(job, st) { const set = setBleach(o.kind); gosokInit(st, set, 1, 1); st.ch = set.chunks.map(c => ({ ...c, done: false })); st.chunk = set.chunk; st.softN = 0; st.marks = []; },
    take(job, st, c) {
      const g = st.g; c.done = true; for (let q = 0; q < st.chunk.length; q++) if (st.chunk[q] === c.id && g.hp[q] > 0) { g.hp[q] = 0; for (let z = 0; z < 4; z++) g.cur.data[q * 4 + z] = g.aft.data[q * 4 + z]; g.left--; if (g.zones) g.zl[g.zones[q]]--; }
      g.x.putImageData(g.cur, 0, 0); st.pop = { x: (c.x0 + c.x1) / 2 + g.ox, y: (c.y0 + c.y1) / 2 + g.oy, t: st.t };
      if (o.kind === 'bar') (job.blBar = job.blBar || {})[c.id] = 1;
      if (o.kind === 'gel' && !(job.blBar || {})[c.id] && !job.blBurn) { job.blBurn = true; mgHurt(job, 8); mgErr(job, 'minor', 'Gel mengenai gusi tanpa pelindung'); }
    },
    near: (st, x, y) => st.ch.find(q => !q.done && x >= q.x0 - 3 && x <= q.x1 + 3 && y >= q.y0 - 3 && y <= q.y1 + 3),
    update(job, st) {
      const c = input.click; if (inWork(c)) {
        const g = st.g, x = c.x - g.ox, y = c.y - g.oy, h = s.near(st, x, y);
        if (h) { s.take(job, st, h); sfx(o.sfx || 'etch_brush'); sfx('mg_hit', st.ch.filter(q => q.done).length); }
        else if (g.bad && x >= 0 && y >= 0 && x < g.w && y < g.h && g.bad[y * g.w + x]) { st.softN++; st.marks.push([c.x, c.y]); mgHurt(job, 4); sfx('mg_miss'); job.misses++; if (st.softN === CFG.BLEACH.GUM_LIMIT + 1) mgErr(job, 'minor', 'Gel bleaching kena gusi'); }
        else sfx('ui_tick');
      }
      if (st.ch.every(q => q.done)) { if (o.done) o.done(job, st); fin(st); }
    },
    buttons: (job, st) => [{ label: 'Selesai', off: st.ch.filter(q => q.done).length < st.ch.length / 2, offMsg: 'Kerjakan dulu lebih dari separuh gigi.', fn: () => { if (st.doneAt != null) return; mgErr(job, 'minor', o.leftErr); job.misses++; if (o.done) o.done(job, st); fin(st); } }],
    auto(job, st, good) { st.ch.forEach(c => { if (!c.done) s.take(job, st, c); }); if (!good) mgErr(job, 'minor', o.leftErr); if (o.done) o.done(job, st); fin(st); },
    draw(job, st) {
      artScaling(job, st); const g = st.g; hc.drawImage(g.c, Math.round(g.ox * HI), Math.round(g.oy * HI), g.w * HI, g.h * HI);
      const m = input.mouse, hh = job.phase === 'play' && s.near(st, m.x - g.ox, m.y - g.oy);
      if (hh) { const X = hh.x0 + g.ox - 1.5, Y = hh.y0 + g.oy - 1.5, W2 = hh.x1 - hh.x0 + 4, H2 = hh.y1 - hh.y0 + 4; hR(X, Y, W2, .5, '#ffffff'); hR(X, Y + H2 - .5, W2, .5, '#ffffff'); hR(X, Y, .5, H2, '#ffffff'); hR(X + W2 - .5, Y, .5, H2, '#ffffff'); }
      st.marks.forEach(([mx, my]) => { hR(mx - 1, my - 1, 2, 2, '#d8202a'); hR(mx - .5, my + 1, 1, 1.5, '#a8101a'); });
      if (st.pop && st.t - st.pop.t < .35) { const f = (st.t - st.pop.t) / .35; for (let i = 0; i < 6; i++) { const an = i * 1.05; hR(st.pop.x + Math.cos(an) * 8 * f, st.pop.y + Math.sin(an) * 6 * f - 6 * f, 1.5, 1.5, o.pop || '#9ad6ff'); } }
    } };
  return s;
}
/** Bleaching: pelindung gusi → oles gel → sinar LED → sedot gel → instruksi. Satu kit dipakai di awal tindakan. */
MG_BUILD.bleaching = job => {
  job.tray = TRAY.bleaching; job.instrKey = 'bleaching';
  if (job.mode === 'proc' && blKit() > 0) t2St().kit = blKit() - 1;
  const shadeFrom = 'A3', art = img => j => artScaling(j, null, blImg(img));
  return [
    stBleach({ name: 'Pelindung gusi', tool: 'dam', kind: 'bar', key: 'klik garis gusi tiap gigi', sfx: 'fill_press', pop: '#9ad6ff', leftErr: 'Pelindung gusi belum lengkap',
      instr: 'Klik garis gusi tiap gigi untuk memasang pelindung biru.', warn: 'Tanpa pelindung = gusi terbakar' }),
    stBleach({ name: 'Oles gel', tool: 'etch', kind: 'gel', key: 'klik tiap gigi', sfx: 'etch_brush', pop: '#a8f0d8', leftErr: 'Gel belum rata di semua gigi',
      instr: 'Klik tiap gigi kuning untuk mengoles gel bleaching.', warn: 'Kena gusi = sakit' }),
    stTepat({ name: 'Sinar LED', tool: 'lgt', n: CFG.BLEACH.LED_N, z: .3, label: 'Sinar LED', instr: 'Tekan saat penanda di zona hijau untuk mengaktifkan gel.', warn: 'Meleset = gel kurang aktif',
      end: (j, miss) => { if (miss) mgErr(j, 'minor', 'Gel kurang aktif, hasil kurang putih'); }, art: art('gel') }),
    stBleach({ name: 'Sedot gel', tool: 'irr', kind: 'suc', key: 'klik tiap gigi', sfx: 'air_water', pop: '#ffffff', leftErr: 'Sisa gel tertinggal di gigi',
      instr: 'Klik tiap gigi untuk menyedot gel.', warn: 'Gel tersisa = ngilu',
      done: j => toast('Warna gigi ' + shadeFrom + ' jadi ' + (j.errors.length ? 'A2' : 'A1'), 'good') }),
    stInstr('bleaching')];
};
