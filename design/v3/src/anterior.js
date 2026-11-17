/* ==== Gigi anterior potongan labial (Fase 3b-2, permintaan user 2026-11-17: "anterior jangan potongan sagital, potongan labial saja") ====
 * Seri dengan toothR (geraham): kanvas 170×166, cx 85, gaya warna sama. Dilihat dari bibir: mesial kiri, distal kanan, insisal di atas.
 * o: caries 'shallow'|'deep' (karies proksimal mesial, kelas III) · cav 'deep'|'frac'|'stain' (hasil preparasi) · fill 0..1 · liner
 *    frac (sudut insisal mesial patah, kelas IV) · stain (mahkota kekuningan). s = skala gambar (2 = HD zoom). */
const _ta = {};
/** Bentuk gigi anterior (dipakai gambar & masker minigame). Semua koordinat dalam satuan gambar dasar. */
function antShape(o) {
  o = o || {}; const cx = 85, E = 12, CEJ = 76, AP = 154;
  /* setengah lebar mahkota: lebar di insisal (sudut membulat), paling lebar dekat sepertiga insisal, menyempit ke CEJ */
  const hwC = j => { const u = (j - E) / (CEJ - E); let w = 25 + 2.5 * Math.sin(Math.min(1, u * 2.4) * Math.PI / 2) - 13.5 * Math.pow(Math.max(0, u - .3) / .7, 1.6); if (j < E + 5) w -= 5 - Math.sqrt(Math.max(0, 25 - (j - E - 5) ** 2)); return w; };
  const xL = j => cx - hwC(j), xR = j => cx + hwC(j);
  const w0 = hwC(CEJ), rc = t => cx + 2 * t * t, hw = t => { const b = w0 * Math.pow(1 - t, .85) + .6; return t < .86 ? b : b * Math.sqrt(Math.max(0, 1 - ((t - .86) / .14) ** 2)); };
  const missing = (i, j) => !!o.frac && i + j < cx + 8;
  const crownFull = (i, j) => j >= E && j <= CEJ && Math.abs(i - cx) <= hwC(j);
  const inRoot = (i, j) => { if (j <= CEJ || j > AP) return false; const t = (j - CEJ) / (AP - CEJ); return Math.abs(i - rc(t)) <= hw(t); };
  const inCrown = (i, j) => crownFull(i, j) && !missing(i, j);
  const inT = (i, j) => inCrown(i, j) || inRoot(i, j);
  const et = j => j < E + 14 ? 6 : Math.max(0, 6 * (CEJ - j) / (CEJ - E - 14));
  const isEnamel = (i, j) => inCrown(i, j) && et(j) >= .7 && (hwC(j) - Math.abs(i - cx) < et(j) || j - E < et(j) || (o.frac && i + j - (cx + 8) < 3));
  /* pulpa: tiga tanduk kecil di bawah insisal, ruang melebar lalu menyempit jadi satu saluran ke apeks */
  const pw = j => { if (j < 31) return 0; if (j <= CEJ) return Math.min(1, Math.sqrt((j - 31) / 3)) * (9.5 - 6.5 * Math.max(0, (j - 46) / (CEJ - 46))); const t = (j - CEJ) / (AP - 4 - CEJ); return t >= 1 ? 0 : 3 * Math.pow(1 - t, 1.1) + .5; };
  const pcx = j => j <= CEJ ? cx : rc((j - CEJ) / (AP - CEJ));
  const top = i => 38 - 4 * Math.max(0, Math.cos((i - cx) / 6.5 * Math.PI)) * Math.max(0, 1 - Math.abs(i - cx) / 10);
  const isPulp = (i, j) => j >= top(i) && j < AP - 4 && Math.abs(i - pcx(j)) < pw(j);
  const pulpCh = (i, j) => isPulp(i, j) && j <= CEJ, canal = (i, j) => isPulp(i, j) && j > CEJ;
  const deep = o.caries === 'deep' || o.cav === 'deep', ly = 44, lx = () => xL(ly) + (deep ? 3 : 2), rx = deep ? 10 : 7, ry = deep ? 11 : 8;
  const cr = (i, j, n) => { if (!o.caries) return 0; const ex = (i - lx()) / rx, ey = (j - ly) / ry, q = ex * ex + ey * ey; return q < .45 - n * .3 ? 2 : q < .9 - n * .4 ? 1 : q < 1.25 ? .5 : 0; };
  const inCav = (i, j) => { if (!o.cav) return false;
    if (o.cav === 'stain') return crownFull(i, j) && j <= CEJ - 3;
    if (o.cav === 'frac') return crownFull(i, j) && i + j < cx + 11;
    const ex = (i - lx()) / (rx + .5), ey = (j - ly) / (ry + .5); return crownFull(i, j) && ex * ex + ey * ey < 1; };
  const cavFill = (i, j) => { const f = o.fill || 0; if (!f) return false;
    if (o.cav === 'stain') return j >= CEJ - 3 - f * (CEJ - 3 - E); if (o.cav === 'frac') return i + j >= cx + 11 - f * 30;
    const R = lx() + rx, L = lx() - rx; return i >= R - f * (R - L); };
  const gumTop = i => { const e = Math.max(0, Math.abs(i - cx) - 16); return 66 + 12 * (1 - Math.exp(-e / 12)); };
  const boneTop = i => { const e = Math.max(0, Math.abs(i - cx) - 16); return 84 + 4 * (1 - Math.exp(-e / 16)); };
  return { cx, E, CEJ, AP, hwC, xL, xR, rc, hw, pcx, pw, inT, inCrown, crownFull, inRoot, isEnamel, isPulp, pulpCh, canal, cr, inCav, cavFill, missing, gumTop, boneTop, et };
}
/** Gambar gigi anterior potongan labial (cache per opsi & skala). */
function toothA(o, s) {
  o = o || {}; s = s || 1; const key = s + '|' + JSON.stringify(o); if (_ta[key]) return _ta[key];
  const W0 = 170, H0 = 166, W = W0 * s, H = H0 * s, A = antShape(o), cx = A.cx; const [c, x] = cv(W, H); const img = x.createImageData(W, H), D = img.data;
  const put = (I, J, cc) => { const k = (J * W + I) * 4; D[k] = cc[0]; D[k + 1] = cc[1]; D[k + 2] = cc[2]; D[k + 3] = 255; };
  const st = 1 / s, near = (i, j, r, f) => { for (let a = -r; a <= r + 1e-6; a += st) for (let b = -r; b <= r + 1e-6; b += st) if (f(i + a, j + b)) return true; return false; };
  const tissue = (i, j) => j < 104 || ((i - cx) / 84) ** 2 + ((j - 104) / (H0 - 102)) ** 2 < 1.02;
  const marrow = (i, j) => { let best = 9; const gx = Math.floor(i / 6), gy = Math.floor(j / 6); for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) { if (hash(gx + a + 11, gy + b + 5) < .35) continue; const px = (gx + a) * 6 + hash(gx + a, gy + b) * 6, py = (gy + b) * 6 + hash(gy + b + 7, gx + a + 3) * 6; const dd = Math.hypot(i - px, j - py); if (dd < best) best = dd; } return best; };
  const C_ = rgb, EN = C_('#f8f4ea'), ENs = C_('#d8d0be'), ENhi = C_('#ffffff'), ENb = C_('#e4e8ee'), DE = C_('#efd2a0'), DEs = C_('#d2ac78'), TUB = C_('#dcb886'), DEJ = C_('#c89e6a'),
    PU = C_('#e2566a'), PUd = C_('#b02a44'), PUh = C_('#f48a98'), CEM = C_('#cfae74'), COMP = C_('#f4eedc'), COMPs = C_('#e6dcc2'), STN = C_('#c8963c'), VEIN = C_('#4a58c0'), NRV = C_('#f0c848');
  for (let J = 0; J < H; J++) for (let I = 0; I < W; I++) {
    const i = (I + .5) / s - .5, j = (J + .5) / s - .5, d = i - cx, hp = hash(I, J); let col = null;
    const cavHere = A.inCav(i, j), filled = cavHere && A.cavFill(i, j);
    if (A.inT(i, j) || filled) {
      if (A.isEnamel(i, j)) {
        col = mixA(EN, ENs, Math.min(1, Math.max(0, d / 30)) * .7); if (j < A.E + 4) col = mixA(col, ENb, .6);
        if (((d + 15) / 2.5) ** 2 + ((j - 32) / 12) ** 2 < 1 && hp < .8) col = ENhi;
        if (!near(i, j, 1, (a, b) => A.isEnamel(a, b) || !A.inT(a, b))) col = mixA(col, DEJ, .45);
      } else {
        col = mixA(DE, DEs, Math.min(1, Math.abs(d) / 26) * .6 + Math.max(0, (j - 90) / 200));
        const r = Math.hypot(d, j - 64), ang = Math.atan2(j - 64, d), tb = j < 82 ? ((ang * 10 + Math.sin(r * .16) * .6) % 1 + 1) % 1 : (((j * .33) + (d * .06)) % 1 + 1) % 1;
        if (tb < .14 && hp < .85) col = mixA(col, TUB, .7);
        if (near(i, j, 1.2, A.isPulp) && !A.isPulp(i, j)) col = mixA(col, C_('#c69070'), .55);
        if (A.inRoot(i, j) && j > A.CEJ + 2 && !near(i, j, 1, (a, b) => A.inT(a, b))) col = CEM;
      }
      if (A.isPulp(i, j)) { const ch = A.pulpCh(i, j); col = mixA(PU, PUd, ch ? Math.min(1, Math.max(0, (j - 36) / 60)) : .5); if (ch && j < 46) col = mixA(col, PUh, .4);
        if (j > 52) { const q = (i - A.pcx(j)) / Math.max(.8, A.pw(j)); if (Math.abs(q + .4) < .16) col = VEIN; else if (Math.abs(q - .35) < .14) col = NRV; } }
      if (o.stain && A.inCrown(i, j) && !A.isPulp(i, j) && !(filled && o.cav === 'stain')) col = mixA(col, STN, (A.isEnamel(i, j) ? .5 : .32) + hash(I >> 2, J >> 2) * .08);
      const n = hash(I >> 1, J >> 1) * .35, k = A.cr(i, j, n);
      if (k && A.inT(i, j) && !A.isPulp(i, j)) col = k === 2 ? (hp < .5 ? C_('#2a160c') : C_('#3c2212')) : k === 1 ? (hp < .35 ? C_('#9a6a3a') : C_('#5e3418')) : mixA(col, C_('#c89a5a'), .45);
      if (cavHere && !filled && o.cav !== 'stain') col = o.liner && o.cav === 'deep' && i > A.xL(44) + 9 ? (hp < .25 ? C_('#e8c860') : C_('#f4de88')) : mixA(C_('#2a1812'), C_('#4a2e22'), Math.max(0, (j - 14) / 40));
      if (filled) { col = o.cav === 'stain' ? (A.isPulp(i, j) ? col : mixA(col, hp < .18 ? COMPs : COMP, A.isEnamel(i, j) ? .7 : .25)) : hp < .18 ? COMPs : COMP; if (o.cav !== 'stain' && !near(i, j, .9, (a, b) => A.inCav(a, b) && A.cavFill(a, b) || !A.inT(a, b) && !A.inCav(a, b))) col = C_('#ffffff'); }
    } else if (tissue(i, j)) {
      const gt = A.gumTop(i), bt = A.boneTop(i);
      if (j >= bt) { const m = marrow(i, j); col = m < 1.5 ? C_('#dcc294') : m < 2.2 ? C_('#ccac7a') : (hp < .12 ? C_('#e2cea6') : C_('#eedfbe')); if (j < bt + 2.2) col = C_('#f6ead0'); if (near(i, j, 1, A.inRoot)) col = C_('#b47a5e'); }
      else if (j >= gt) { const v = j - gt; col = mixA(C_('#ee93a0'), C_('#cf6276'), Math.min(1, v / 16)); if (v < 1.2) col = C_('#fbc0c8'); else if (v < 2.4) col = C_('#f6a8b4'); if (near(i, j, 3, A.inT)) col = mixA(col, C_('#a8405a'), .45); }
    }
    if (col) put(I, J, col);
  }
  x.putImageData(img, 0, 0); return _ta[key] = c;
}

/* ==== Tampak labial (luar) gigi anterior untuk tambal Komposit/GIC/Veneer (permintaan user 2026-11-17: "bener2 posisi labial ... agar bisa terlihat sisi yang akan ditambalnya").
 * Potongan labial toothA di atas disimpan untuk PSA (saluran akar terlihat). Mesial kiri, distal kanan, insisal di atas.
 * o: caries 'shallow'|'deep' (karies proksimal mesial, kelas III) · cav 'deep'|'frac'|'stain' · fill 0..1 · liner · frac (sudut mesio-insisal patah) · stain (mahkota kekuningan). */
const _tl = {};
/** Bentuk tampak labial (dipakai gambar & masker minigame). */
function labShape(o) {
  o = o || {}; const cx = 85, E = 14, AP = 158;
  const hw = j => 24 + 2 * Math.sin(Math.min(1, Math.max(0, j - E) / 14) * Math.PI / 2) - 9 * Math.pow(Math.max(0, (j - 30) / 46), 1.4);
  const xL = j => cx - hw(j), xR = j => cx + hw(j) - 1;
  const cejY = i => 70 + 7 * Math.max(0, 1 - ((i - cx) / 19) ** 2);
  const corner = (i, j, x0, r, side) => { const yc = E + r; if (j >= yc) return true; const xc = side < 0 ? x0 + r : x0 - r; if ((side < 0 && i >= xc) || (side > 0 && i <= xc)) return true; return Math.hypot(i - xc, j - yc) <= r; };
  const crownFull = (i, j) => j >= E && j <= cejY(i) && i >= xL(j) && i <= xR(j) && corner(i, j, xL(E + 3), 3, -1) && corner(i, j, xR(E + 7), 7, 1);
  const missing = (i, j) => !!o.frac && i + j < cx + 8;
  const inCrown = (i, j) => crownFull(i, j) && !missing(i, j);
  const rc = t => cx + 1 + 4 * t * t, rw = t => { const b = 16.5 * Math.pow(1 - t, .75) + .6; return t < .88 ? b : b * Math.sqrt(Math.max(0, 1 - ((t - .88) / .12) ** 2)); };
  const inRoot = (i, j) => { if (j < 64 || j > AP) return false; const t = (j - 64) / (AP - 64); return Math.abs(i - rc(t)) <= rw(t) && !crownFull(i, j); };
  const inT = (i, j) => inCrown(i, j) || inRoot(i, j);
  const deep = o.caries === 'deep' || o.cav === 'deep', ly = 44, lx = () => xL(ly) + 4, rx = deep ? 9 : 6, ry = deep ? 11 : 8;
  const cq = (i, j, g) => ((i - lx()) / (rx + g)) ** 2 + ((j - ly) / (ry + g)) ** 2;
  const inCav = (i, j) => { if (!o.cav) return false;
    if (o.cav === 'stain') return crownFull(i, j) && j <= cejY(i) - 1;
    if (o.cav === 'frac') return crownFull(i, j) && i + j < cx + 11;
    return crownFull(i, j) && cq(i, j, 1) < 1; };
  const cavFill = (i, j) => { const f = o.fill || 0; if (!f) return false;
    if (o.cav === 'stain') return j >= cejY(i) - 1 - f * (cejY(i) - 1 - E); if (o.cav === 'frac') return i + j >= cx + 11 - f * 22;
    const R = lx() + rx + 1, L = lx() - rx - 1; return i >= R - f * (R - L); };
  const gumTop = i => { const e = Math.max(0, Math.abs(i - cx) - 18); return cejY(Math.min(Math.max(i, cx - 18), cx + 18)) - 3 + 10 * (1 - Math.exp(-e / 10)); };
  const boneTop = i => gumTop(i) + 13;
  return { cx, E, AP, hw, xL, xR, cejY, crownFull, inCrown, inRoot, inT, missing, rc, rw, cq, lx, ly, rx, ry, inCav, cavFill, gumTop, boneTop };
}
/** Gambar tampak labial gigi anterior (cache per opsi & skala). */
function toothL(o, s) {
  o = o || {}; s = s || 1; const key = s + '|' + JSON.stringify(o); if (_tl[key]) return _tl[key];
  const W0 = 170, H0 = 166, W = W0 * s, H = H0 * s, A = labShape(o), cx = A.cx; const [c, x] = cv(W, H); const img = x.createImageData(W, H), D = img.data;
  const put = (I, J, cc) => { const k = (J * W + I) * 4; D[k] = cc[0]; D[k + 1] = cc[1]; D[k + 2] = cc[2]; D[k + 3] = 255; };
  const st = 1 / s, near = (i, j, r, f) => { for (let a = -r; a <= r + 1e-6; a += st) for (let b = -r; b <= r + 1e-6; b += st) if (f(i + a, j + b)) return true; return false; };
  const tissue = (i, j) => j < 104 || ((i - cx) / 84) ** 2 + ((j - 104) / (H0 - 102)) ** 2 < 1.02;
  const marrow = (i, j) => { let best = 9; const gx = Math.floor(i / 6), gy = Math.floor(j / 6); for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) { if (hash(gx + a + 11, gy + b + 5) < .35) continue; const px = (gx + a) * 6 + hash(gx + a, gy + b) * 6, py = (gy + b) * 6 + hash(gy + b + 7, gx + a + 3) * 6; const dd = Math.hypot(i - px, j - py); if (dd < best) best = dd; } return best; };
  const C_ = rgb, EN = C_('#f7f3ea'), ENs = C_('#d6cdbb'), ENhi = C_('#ffffff'), ENb = C_('#dfe6ee'), CERV = C_('#efe0c0'), LINE = C_('#a8987e'),
    RT = C_('#e6c49a'), RTs = C_('#c49a68'), RThi = C_('#f4dcb8'), RTl = C_('#9a7650'), DEN = C_('#e9cf9c'), COMP = C_('#f3ede0'), COMPs = C_('#e7dfcc'), STN = C_('#d2a24c');
  for (let J = 0; J < H; J++) for (let I = 0; I < W; I++) {
    const i = (I + .5) / s - .5, j = (J + .5) / s - .5, d = i - cx, hp = hash(I, J); let col = null;
    const cavHere = A.inCav(i, j), filled = cavHere && A.cavFill(i, j), gt = A.gumTop(i), bt = A.boneTop(i);
    if (tissue(i, j) && j >= gt) {
      if (j >= bt) { const m = marrow(i, j); col = m < 1.5 ? C_('#dcc294') : m < 2.2 ? C_('#ccac7a') : (hp < .12 ? C_('#e2cea6') : C_('#eedfbe')); if (j < bt + 2.2) col = C_('#f6ead0'); }
      else { const v = j - gt; col = mixA(C_('#ee93a0'), C_('#cf6276'), Math.min(1, v / 14)); if (v < 1.2) col = C_('#fbc0c8'); else if (v < 2.4) col = C_('#f6a8b4'); }
    }
    const gum = !!col && j < bt;
    if (!gum && A.inRoot(i, j) && j >= bt - 2) {
      const t = (j - 64) / (A.AP - 64), q = (i - A.rc(t)) / Math.max(1, A.rw(t));
      col = mixA(RT, RTs, Math.min(1, Math.abs(q) ** 2 * .9)); if (Math.abs(q + .35) < .12) col = mixA(col, RThi, .7);
      if (!near(i, j, 1, A.inRoot)) col = RTl; else if (!near(i, j, 1.6, A.inRoot)) col = mixA(col, C_('#b47a5e'), .6);
    } else if (!gum && (A.inCrown(i, j) || filled)) {
      const e = Math.min(i - A.xL(j), A.xR(j) - i, j - A.E + 4);
      col = EN; if (e < 8) col = mixA(col, ENs, .45 * (1 - e / 8));
      for (const h of [-9, 8]) col = mixA(col, ENs, .14 * Math.exp(-(((d - h) / 2.2) ** 2)) * Math.min(1, (j - A.E) / 10));
      if (d > -15 && d < -6 && j > 22 && j < 58) col = mixA(col, ENhi, .55 * Math.sin((d + 15) / 9 * Math.PI));
      if (j < A.E + 5) col = mixA(col, ENb, .45 * (1 - (j - A.E) / 5));
      if (j > 52) col = mixA(col, CERV, Math.min(.5, (j - 52) / 40));
      if (o.stain && !(filled && o.cav === 'stain')) col = mixA(col, STN, .38 + Math.min(.2, Math.max(0, (j - 30) / 150)) + hash(I >> 2, J >> 2) * .08);
      if (o.caries) { const q = A.cq(i, j, hash(I >> 1, J >> 1) * 1.2); if (q < .35) col = hp < .5 ? C_('#3a2214') : C_('#4a2c18'); else if (q < .75) col = hp < .4 ? C_('#8a5a30') : C_('#6e4422'); else if (q < 1.3) col = mixA(col, C_('#ffffff'), .55); }
      if (o.frac && !filled) { const fl = i + j - (A.cx + 8); if (fl < 3 && fl >= 0) col = fl < 1 ? EN : hp < .2 ? C_('#dcb886') : DEN; }
      if (cavHere && !filled) {
        if (o.cav === 'deep' || o.cav === 'lab') { const q = A.cq(i, j, 1); col = q > .62 ? mixA(DEN, C_('#c49a68'), (1 - q) * 1.4) : o.liner ? (hp < .25 ? C_('#e8c860') : C_('#f4de88')) : mixA(C_('#b88a58'), C_('#8a6440'), hp * .5); if (q > .86) col = C_('#7a5a3a'); }
        else if (o.cav === 'frac') col = mixA(col, C_('#e2d6be'), .5);
        else if (o.cav === 'stain') col = mixA(col, C_('#e6d8b8'), .3 + hp * .1); /* permukaan dipreparasi tipis: kusam */
      }
      if (filled) { if (o.cav === 'stain') col = mixA(col, hp < .18 ? COMPs : COMP, .35); else { col = mixA(col, hp < .18 ? COMPs : COMP, .85); if ((o.fill || 0) >= 1 && d > -15 && d < -6 && j > 22 && j < 58) col = mixA(col, ENhi, .4); } }
      if (!near(i, j, 1, (a, b) => A.inCrown(a, b) || A.inCav(a, b) && A.cavFill(a, b))) col = LINE;
    }
    if (col) put(I, J, col);
  }
  x.putImageData(img, 0, 0); return _tl[key] = c;
}
