/* ==== PSA (perawatan saluran akar) — gambar Fase 3b-3 (DRAF, menunggu ACC user) ====
 * Potongan gigi: geraham & premolar = toothR (2 akar, kiri/kanan), gigi depan = toothA (potongan labial, 1 saluran).
 * Molar 3 saluran: rahang bawah MB·ML·D (ML di belakang MB), rahang atas MB·DB·P (P di belakang, di tengah).
 * Premolar 2 saluran: Bukal·Palatal/Lingual. Anterior 1 saluran.
 * Keadaan saluran: 'vital' (pulpa hidup, merah) · 'nek' (pulpa mati, cokelat) · 'open' (sudah diekstirpasi, gelap)
 *   · 'glide' (K-file #10–15 sampai panjang kerja) · 'shape' + lv 1..5 (SX,S1,S2,F1,F2: makin lebar & meruncing)
 *   · 'dress' (Ca(OH)2 putih) · 'gp' (gutta-percha + sealer). Gambar dasar 170×166 (sama dengan toothR/toothA). */
const PSA_FRONT = [11, 12, 13, 21, 22, 23, 31, 32, 33, 41, 42, 43];
/** Jenis gigi: 'A' anterior · 'P' premolar · 'M' molar. */
const psaType = t => PSA_FRONT.includes(t) ? 'A' : [4, 5].includes(t % 10) ? 'P' : 'M';
/** Daftar saluran per gigi: [nama pendek, nama panjang, sisi akar (-1 kiri · 1 kanan · 0 tengah), di belakang (hantu)]. */
function psaCanals(t) {
  const up = [1, 2].includes(Math.floor(t / 10)), ty = psaType(t);
  if (ty === 'A') return [['Saluran', 'Saluran tunggal', 0, false]];
  if (ty === 'P') return up ? [['B', 'Bukal', -1, false], ['P', 'Palatal', 1, false]] : [['B', 'Bukal', -1, false], ['L', 'Lingual', 1, false]];
  return up ? [['MB', 'Mesiobukal', -1, false], ['DB', 'Distobukal', 1, false], ['P', 'Palatal', 0, true]]
    : [['MB', 'Mesiobukal', -1, false], ['ML', 'Mesiolingual', -1, true], ['D', 'Distal', 1, false]];
}
/** Garis tengah saluran pada gambar dasar: x(j) untuk sisi sg; j0 = mulut saluran, j1 = apeks (garis panjang kerja). */
const PSA_J = { A: [40, 151], R: [80, 150] };
function psaCX(ty, sg, j, ghost) {
  if (ty === 'A') { if (j <= 76) return 85; const t = (j - 76) / 78; return 85 + 2 * t * t; }
  const t = Math.max(0, (j - 94) / 58); if (sg === 0) return 85 + t * t * 3;
  return 85 + sg * (13 + t * 5) + t * t * 4 + (ghost ? 3 : 0);
}
/** Setengah lebar saluran setelah dibentuk sampai file lv (0 = asli). t: 0 mulut → 1 apeks. SX hanya melebarkan sepertiga korona. */
function psaHW(lv, t) {
  const orig = 2.2 * (1 - t) + .7; if (!lv) return orig;
  const tip = [0, .7, .7, .8, .9, 1.1][lv], cor = [0, 3.4, 2.4, 2.9, 3.1, 3.4][lv];
  if (lv === 1) return t < .35 ? Math.max(orig, cor - t * 4) : orig;
  return Math.max(orig, tip + (cor - tip) * (1 - t));
}
const PSA_COL = { vital: ['#ee98a4', '#c94e66'], nek: ['#8a5a3a', '#5a3420'], open: ['#2e1812', '#22100c'], glide: ['#2e1812', '#1a0a08'], shape: ['#2a140e', '#160806'],
  dress: ['#f6f6f0', '#d8d8cc'], gp: ['#f07a40', '#c84a2a'], temp: ['#e8c58a', '#cfa860'], gic: ['#efe9d8', '#dcd4c0'], komp: ['#f4eedc', '#e6dcc2'], base: ['#f2dc84', '#e8c860'] };
const _psaImg = {};
/** Gambar gigi PSA. o: { t (nomor gigi), acc (akses terbuka), ch: 'vital'|'nek'|'open'|'dress'|'gp' (kamar pulpa),
 *  cs: [{st, lv}] per saluran, top: null|'temp'|'gic'|'komp' (tambalan di akses), base (basis di atas GP), caries }. s = skala (1 | 2). */
function psaTooth(o, s) {
  s = s || 1; const key = s + '|' + JSON.stringify(o); if (_psaImg[key]) return _psaImg[key];
  const ty = psaType(o.t), cn = psaCanals(o.t), A = ty === 'A';
  const base = A ? toothA({}, s) : toothR(o.acc ? { access: true } : { caries: o.caries || 'deep' }, s);
  const [c, x] = cv(base.width, base.height); x.drawImage(base, 0, 0); if (!o.acc && !A) { _psaImg[key] = c; return c; }
  const img = x.getImageData(0, 0, c.width, c.height), D = img.data, W = c.width;
  const put = (I, J, col) => { if (I < 0 || J < 0 || I >= W || J >= c.height) return; const k = (J * W + I) * 4; D[k] = col[0]; D[k + 1] = col[1]; D[k + 2] = col[2]; D[k + 3] = 255; };
  const tone = (st, f) => mixA(rgb(PSA_COL[st][0]), rgb(PSA_COL[st][1]), f);
  const [J0, J1] = PSA_J[A ? 'A' : 'R'], AS = A ? antShape({}) : null;
  /* 1. kamar pulpa: anterior = pulpa mahkota (antShape), geraham = selisih toothR akses vs akses+saluran */
  const pulpR = A ? null : (() => { const a = idataPsa(toothR({ access: true }, s)), b = idataPsa(toothR({ access: true, canals: true }, s)); return k => Math.abs(a[k * 4] - b[k * 4]) + Math.abs(a[k * 4 + 1] - b[k * 4 + 1]) > 30; })();
  for (let J = 0; J < c.height; J++) for (let I = 0; I < W; I++) {
    const i = (I + .5) / s - .5, j = (J + .5) / s - .5, k = J * W + I;
    const inCh = A ? AS.pulpCh(i, j) : pulpR(k) && j <= 84;
    if (inCh && o.ch) put(I, J, tone(o.ch, Math.min(1, Math.max(0, (j - 40) / 50)) * .6 + hash(I, J) * .2));
    if (A && o.acc && j >= 18 && j <= 46 && Math.abs(i - 85) < 5.5 - (46 - j) * .08) put(I, J, o.top ? tone(o.top, hash(I, J) * .3) : tone('open', (j - 18) / 28)); /* akses lingual terlihat tembus */
  }
  /* 2. saluran: diwarnai dari mulut saluran sampai apeks, lebar sesuai bentuk */
  cn.map((c, ci) => [c, ci]).sort((a, b) => (b[0][3] ? 1 : 0) - (a[0][3] ? 1 : 0)).forEach(([[, , sg, ghost], ci]) => { /* saluran bayangan (di belakang) digambar dulu */
    const cs = (o.cs || [])[ci] || { st: o.ch === 'nek' ? 'nek' : 'vital' }, lv = cs.st === 'shape' || cs.st === 'dress' || cs.st === 'gp' ? (cs.lv || 5) : 0, alpha = ghost ? .55 : 1;
    const end = cs.st === 'gp' ? J1 - .5 : J1 - 1;
    for (let j = J0; j <= end; j += .5 / s) {
      const t = (j - J0) / (J1 - J0), cx = psaCX(ty, sg, j, ghost), hw = (A && j < 76 ? 0 : psaHW(lv, t)) * (cs.st === 'glide' ? 1.15 : 1);
      if (A && j < 76) continue; /* kamar pulpa anterior sudah diwarnai di langkah 1 */
      if (!A && j < 84 && sg !== 0) continue;
      for (let i = cx - hw; i <= cx + hw; i += .5 / s) {
        const I = Math.round((i + .5) * s - .5), J = Math.round((j + .5) * s - .5); if (I < 0 || J < 0 || I >= W || J >= c.height) continue;
        const e = Math.abs(i - cx) / Math.max(.6, hw), f = Math.min(1, e * .7 + hash(I, J) * .15), col = tone(cs.st === 'glide' ? 'open' : cs.st, f);
        const k = (J * W + I) * 4; D[k] = Math.round(D[k] * (1 - alpha) + col[0] * alpha); D[k + 1] = Math.round(D[k + 1] * (1 - alpha) + col[1] * alpha); D[k + 2] = Math.round(D[k + 2] * (1 - alpha) + col[2] * alpha);
      }
    }
  });
  /* 3. basis + tambalan di kavitas akses (geraham) */
  if (!A && (o.top || o.base)) for (let J = 0; J < c.height; J++) for (let I = 0; I < W; I++) {
    const i = (I + .5) / s - .5, j = (J + .5) / s - .5, k = J * W + I; if (!(pulpR(k) && j <= 84) && !(j < 50 && Math.abs(i - 84) < 11)) continue;
    if (o.base && j > 56) put(I, J, tone('base', hash(I, J) * .4));
    else if (o.top && j <= (o.base ? 56 : 84)) put(I, J, tone(o.top, hash(I, J) * .3 + (j < 14 ? 0 : 0)));
  }
  x.putImageData(img, 0, 0); return _psaImg[key] = c;
}
function idataPsa(c) { return c.getContext('2d').getImageData(0, 0, c.width, c.height).data; }

/** Peta orifis (tampak oklusal dari atas, mesial kiri, bukal atas). Titik [x, y] di kanvas 120×96. */
function psaOrifPts(t) {
  const up = [1, 2].includes(Math.floor(t / 10)), ty = psaType(t);
  if (ty === 'A') return [[60, 50]];
  if (ty === 'P') return [[60, 34], [60, 62]];
  return up ? [[42, 34], [80, 32], [60, 66]] : [[40, 34], [40, 62], [82, 48]];
}
const _orif = {};
/** Gambar peta orifis: mahkota tampak atas + kavitas akses + titik orifis (found = indeks yang sudah ditemukan, cur = saluran aktif). */
function psaOrifImg(t, found, cur) {
  const key = t + '|' + (found || []).join(',') + '|' + cur; if (_orif[key]) return _orif[key];
  const ty = psaType(t), up = [1, 2].includes(Math.floor(t / 10)), W = 120, H = 96, [c, x] = cv(W, H), pts = psaOrifPts(t);
  const cr = ty === 'A' ? [34, 40] : ty === 'P' ? [36, 42] : [50, 42]; /* setengah lebar/tinggi mahkota */
  const inCrown = (i, j) => ty === 'A' ? Math.abs(i - 60) < cr[0] * (1 - (j - 6) / 100) && j > 6 && j < 90 : ((i - 60) / cr[0]) ** 4 + ((j - 48) / cr[1]) ** 4 < 1;
  const accShape = (i, j) => { if (ty === 'A') { const v = (j - 26) / 48; return v > 0 && v < 1 && Math.abs(i - 60) < 6 + 12 * (1 - v) * (1 - v) * 0 + 14 * Math.sin(v * Math.PI) * .9; }
    if (ty === 'P') return ((i - 60) / 12) ** 2 + ((j - 48) / 24) ** 2 < 1;
    const P = pts; const d = (a, b) => { /* jarak ke segitiga orifis, dilebarkan 9 px */ let best = 1e9; for (let q = 0; q < 3; q++) { const [ax, ay] = P[q], [bx, by] = P[(q + 1) % 3], vx = bx - ax, vy = by - ay, l = ((a - ax) * vx + (b - ay) * vy) / (vx * vx + vy * vy), u = Math.max(0, Math.min(1, l)), dx = a - (ax + u * vx), dy = b - (ay + u * vy); best = Math.min(best, Math.hypot(dx, dy)); } return best; };
    const inTri = (a, b) => { const s = (p0, p1, p2) => (p0[0] - p2[0]) * (p1[1] - p2[1]) - (p1[0] - p2[0]) * (p0[1] - p2[1]); const pp = [a, b], d1 = s(pp, P[0], P[1]), d2 = s(pp, P[1], P[2]), d3 = s(pp, P[2], P[0]); return !((d1 < 0 || d2 < 0 || d3 < 0) && (d1 > 0 || d2 > 0 || d3 > 0)); };
    return inTri(i, j) || d(i, j) < 9; };
  const img = x.createImageData(W, H), D = img.data, put = (i, j, col) => { const k = (j * W + i) * 4; D[k] = col[0]; D[k + 1] = col[1]; D[k + 2] = col[2]; D[k + 3] = 255; };
  for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
    if (!inCrown(i, j)) continue; let col;
    if (accShape(i, j)) { const near = pts.map(p => Math.hypot(i - p[0], j - p[1])).reduce((a, b) => Math.min(a, b), 99); col = mixA(rgb('#5a3424'), rgb('#3a2018'), Math.min(1, near / 20) * .6 + hash(i, j) * .2);
      if (!accShape(i - 1, j) || !accShape(i + 1, j) || !accShape(i, j - 1) || !accShape(i, j + 1)) col = rgb('#c8a070'); }
    else { col = mixA(rgb('#f8f2e2'), rgb('#d8ccb0'), Math.min(1, Math.hypot(i - 60, j - 48) / 60) + hash(i >> 1, j >> 1) * .12);
      if (!inCrown(i - 1, j) || !inCrown(i + 1, j) || !inCrown(i, j - 1) || !inCrown(i, j + 1)) col = rgb('#a8987a'); }
    put(i, j, col);
  }
  x.putImageData(img, 0, 0);
  (found || []).forEach(n => { const [px, py] = pts[n]; for (let a = -3; a <= 3; a++) for (let b = -3; b <= 3; b++) if (a * a + b * b <= 9) P(x, px + a, py + b, a * a + b * b <= 2 ? '#0e0604' : '#1e0c08'); if (n === cur) { for (let k = 0; k < 24; k++) { const an = k / 24 * Math.PI * 2; P(x, Math.round(px + Math.cos(an) * 6), Math.round(py + Math.sin(an) * 6), '#ffd86a'); } } });
  /* arah: M = mesial, D = distal, B = bukal, L/P = lingual/palatal */
  S(x, 'M', 3, 44, '#7a6a52', 9); S(x, 'D', W - 9, 44, '#7a6a52', 9); S(x, 'B', 57, 0, '#7a6a52', 9); S(x, up ? 'P' : 'L', 57, H - 9, '#7a6a52', 9);
  return _orif[key] = c;
}

/** Gambar file di dalam saluran pada konteks x (koordinat gambar dasar × s, digeser ox/oy piksel).
 *  kind: 'k10' | 'k15' | 'k20' (K-file tangan) | 'sx' | 's1' | 's2' | 'f1' | 'f2' (ProTaper, endomotor) | 'gp' (cone) | 'spr' (spreader).
 *  depth 0..1 = ujung file dari mulut saluran ke apeks (1 = panjang kerja). */
const PSA_RING = { k10: '#8a4ab8', k15: '#f6f6f6', k20: '#f0d040', k25: '#e0303a', k30: '#3a6ae0', k35: '#3aa04a', k40: '#2a2a2a', eact: '#5ab4f0', sx: '#c8a050', s1: '#8a4ab8', s2: '#f6f6f6', f1: '#f0d040', f2: '#e0303a', gp: '#e0303a', spr: '#9aa4b0' };
function psaFile(x, ox, oy, s, t, ci, depth, kind) {
  const ty = psaType(t), cn = psaCanals(t)[ci], sg = cn[2], ghost = cn[3], [J0, J1] = PSA_J[ty === 'A' ? 'A' : 'R'];
  const jTip = J0 + (J1 - J0) * Math.max(0, depth), top = 4, rot = /^[sf]/.test(kind) && kind !== 'spr';
  const px = (i, j, w, col) => { x.fillStyle = col; x.fillRect(Math.round(ox + i * s), Math.round(oy + j * s), Math.max(1, Math.round(w * s)), Math.max(1, Math.round(.5 * s + .5))); };
  const cxAt = j => j < (ty === 'A' ? 76 : 84) ? (ty === 'A' ? 85 : 84 + (psaCX(ty, sg, 84, ghost) - 84) * Math.max(0, (j - 20) / 64)) : psaCX(ty, sg, j, ghost);
  if (kind === 'gp') { for (let j = 22; j <= jTip; j += .5) { const t2 = Math.max(0, (j - J0) / (J1 - J0)), w = .9 + (1 - t2) * 1.4; px(cxAt(j) - w / 2, j, w, j > jTip - 1 ? '#c84a2a' : '#f07a40'); } return; }
  if (kind === 'eact') { /* EndoActivator: ujung polimer biru, tanpa ulir */ for (let j = 14; j <= jTip; j += .5) { const t2 = Math.max(0, (j - J0) / (J1 - J0)); px(cxAt(j) - .5, j, .9 + (1 - t2) * .4, j < 22 ? '#e8eef4' : '#5ab4f0'); }
    x.fillStyle = '#e8eef4'; x.fillRect(Math.round(ox + (cxAt(14) - 4) * s), Math.round(oy + 2 * s), Math.round(8 * s), Math.round(12 * s)); x.fillStyle = '#3a8ad0'; x.fillRect(Math.round(ox + (cxAt(14) - 4) * s), Math.round(oy + 8 * s), Math.round(8 * s), Math.round(2 * s)); return; }
  for (let j = 14; j <= jTip; j += .5) {
    const t2 = Math.max(0, (j - J0) / (J1 - J0)), w = kind === 'spr' ? .8 + (1 - t2) * .9 : rot ? .7 + (1 - t2) * 1.3 : .7 + (1 - t2) * .5, cx = cxAt(j);
    const flute = rot ? ((j * 1.3) % 2 < 1) : ((j * 2) % 2 < 1);
    px(cx - w / 2, j, w, flute ? '#d4dbe4' : '#7a8492');
  }
  /* stopper karet di referensi tonjol */
  const sx = cxAt(14); px(sx - 3, 13, 6, '#e6383e'); px(sx - 3, 12.5, 6, '#ff9a9a');
  if (rot) { /* kepala kontra-angle endomotor + cincin warna ProTaper */
    x.fillStyle = '#4a525e'; x.fillRect(Math.round(ox + (sx - 6) * s), Math.round(oy + (top - 2) * s), Math.round(12 * s), Math.round(9 * s));
    x.fillStyle = '#a8b2c0'; x.fillRect(Math.round(ox + (sx - 5) * s), Math.round(oy + (top - 1) * s), Math.round(10 * s), Math.round(2 * s));
    x.fillStyle = PSA_RING[kind]; x.fillRect(Math.round(ox + (sx - 3) * s), Math.round(oy + (top + 7) * s), Math.round(6 * s), Math.round(2 * s));
    x.fillStyle = '#7a8492'; x.fillRect(Math.round(ox + (sx + 6) * s), Math.round(oy + (top - 1) * s), Math.round(40 * s), Math.round(5 * s));
    x.fillStyle = '#d4dbe4'; x.fillRect(Math.round(ox + (sx + 6) * s), Math.round(oy + (top - 1) * s), Math.round(40 * s), Math.round(1 * s));
  } else { /* gagang file tangan berwarna ISO */
    x.fillStyle = PSA_RING[kind] || '#f6f6f6'; x.fillRect(Math.round(ox + (sx - 3) * s), Math.round(oy + top * s), Math.round(6 * s), Math.round(8 * s));
    x.fillStyle = 'rgba(0,0,0,.25)'; x.fillRect(Math.round(ox + (sx + 2) * s), Math.round(oy + top * s), Math.round(1 * s), Math.round(8 * s));
  }
}

/* ---- Ikon alat baru (16×16, gaya TLD mini.js) ---- */
const PSA_BOT = (liq, lvl, cap) => x => glass(x, 4, 4, 8, 10, liq, lvl, cap);
Object.assign(TLD, {
  xrf: x => { R(x, 2, 2, 12, 12, '#1a2a3a'); R(x, 2, 2, 12, 1, '#4a6a8a'); R(x, 6, 4, 4, 5, '#c8dcea'); R(x, 6, 9, 1, 4, '#9ab8d0'); R(x, 9, 9, 1, 4, '#9ab8d0'); R(x, 7, 5, 2, 7, '#3a5a7a'); P(x, 12, 3, '#e8f0f8'); },
  eact: x => { R(x, 0, 6, 9, 5, '#e8eef4'); R(x, 0, 6, 9, 1, '#ffffff'); R(x, 0, 10, 9, 1, '#a8b4c0'); R(x, 3, 7, 3, 3, '#3a8ad0'); R(x, 9, 7, 2, 3, '#c8d0d8'); for (let i = 0; i < 4; i++) P(x, 11 + i, 8 + (i > 1 ? 1 : 0), '#5ab4f0'); },
  edta: PSA_BOT('#e2d4f6', .7, '#7a3aa8'), nacl: PSA_BOT('#bfe4ff', .75, '#2a6aa8'), sealer: PSA_BOT('#f4e0b0', .5, '#8a5a2a'),
  emot: x => { R(x, 0, 6, 11, 5, '#7a8492'); R(x, 0, 6, 11, 1, '#d4dbe4'); R(x, 0, 10, 11, 1, '#4a525e'); R(x, 11, 5, 4, 7, '#4a525e'); R(x, 12, 6, 2, 2, '#a8b2c0'); for (let j = 0; j < 4; j++) P(x, 13, 12 + j, j % 2 ? MTL[3] : MTL[1]); R(x, 2, 7, 2, 3, '#5ab4f0'); },
  spr: x => { R(x, 1, 6, 5, 4, '#9aa4b0'); R(x, 1, 6, 5, 1, '#d4dbe4'); for (let i = 0; i < 9; i++) { P(x, 6 + i, 8 - (i > 6 ? 1 : 0), MTL[3]); P(x, 6 + i, 9 - (i > 6 ? 1 : 0), MTL[0]); } },
});
['sx', 's1', 's2', 'f1', 'f2', 'k10', 'k15', 'k20', 'k25', 'k30', 'k35'].forEach(k => { TLD[k] = x => { const c = PSA_RING[k]; R(x, 1, 5, 5, 6, c); R(x, 1, 5, 5, 1, '#ffffff'); R(x, 5, 5, 1, 6, 'rgba(0,0,0,.3)');
  const rot = k[0] !== 'k'; if (rot) { R(x, 0, 7, 1, 2, '#4a525e'); } for (let i = 0; i < 9; i++) { P(x, 6 + i, 8, i % 2 ? MTL[3] : MTL[1]); P(x, 6 + i, 9, rot && i < 5 ? MTL[1] : MTL[0]); } }; });
