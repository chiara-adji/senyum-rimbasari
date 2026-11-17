/* ==== DRAF Fase 3b-2: minigame Bleaching (hanya untuk halaman draf design/v3/bleaching.html) ====
 * Tata letak = scaling: 4 panel gigi depan (atas kiri/kanan, bawah kiri/kanan), 2 gigi kerja per panel = 8 gigi.
 * Keadaan: kuning · pelindung gusi · gel diolesi · selesai (putih). */
/** Panel 4-kuadran seperti setScaling di game. Kembalikan {c, tooth, gum, work, W, H}. */
function blPanels() {
  const W = 318, H = 152, [c, x] = cv(W, H), zones = new Uint8Array(W * H), panels = [];
  for (let k = 0; k < 4; k++) {
    const u = k < 2, [pc, px] = cv(151, 55), g = px.createLinearGradient(0, 0, 0, 55); g.addColorStop(0, '#3a1218'); g.addColorStop(1, '#1e080c'); px.fillStyle = g; px.fillRect(0, 0, 151, 55);
    const tx = []; for (let i = 0; i < 5; i++) { const tX = 5 + i * 29; tx.push([tX + 13, 26]); frontTooth(px, tX, u ? 7 : 3, 26, 46, { lower: !u }); }
    gumBand(px, 0, u ? 0 : 31, 151, 24, tx, u);
    const ox = 3 + (k % 2) * 161, oy = 3 + Math.floor(k / 2) * 78; x.drawImage(pc, ox, oy); panels.push({ ox, oy, u, tx });
    for (let j = 0; j < 55; j++) for (let i = 0; i < 151; i++) zones[(oy + j) * W + ox + i] = k + 1;
  }
  const D = x.getImageData(0, 0, W, H).data, n = W * H, gum = new Uint8Array(n), tooth = new Uint8Array(n), work = new Int8Array(n).fill(-1);
  for (let q = 0; q < n; q++) { if (!zones[q]) continue; const r = D[q * 4], g = D[q * 4 + 1], b = D[q * 4 + 2]; if (r > 170 && r - g > 45) gum[q] = 1; else if (r > 185 && g > 170 && b > 135) tooth[q] = 1; }
  const workTooth = (k, ti) => k % 2 === 0 ? ti >= 3 : ti <= 1;
  panels.forEach((P, k) => P.tx.forEach(([tc], ti) => { if (!workTooth(k, ti)) return; for (let j = 0; j < 55; j++) for (let X = P.ox + tc - 13; X <= P.ox + tc + 13; X++) { const q = (P.oy + j) * W + X; if (tooth[q]) work[q] = k * 5 + ti; } }));
  return { c, x, tooth, gum, work, W, H, panels };
}
/** Gambar satu keadaan bleaching. st: 'kuning' | 'pelindung' | 'gel' | 'selesai'; half = gel baru di sebagian gigi. */
function blState(st, half) {
  const P = blPanels(), { c, x, tooth, gum, work, W, H } = P, img = x.getImageData(0, 0, W, H), D = img.data;
  const set = (q, col) => { D[q * 4] = col[0]; D[q * 4 + 1] = col[1]; D[q * 4 + 2] = col[2]; };
  const get = q => [D[q * 4], D[q * 4 + 1], D[q * 4 + 2]];
  const ids = [...new Set(work)].filter(v => v >= 0).sort((a, b) => a - b), gelOn = id => !half || ids.indexOf(id) < 5;
  for (let q = 0; q < W * H; q++) if (tooth[q]) {
    const yellow = work[q] >= 0 ? .42 : .3;
    if (st === 'selesai' && work[q] >= 0) set(q, mixA(get(q), [255, 253, 246], .25));
    else set(q, mixA(get(q), [212, 168, 86], yellow));
    if (st === 'gel' && work[q] >= 0 && gelOn(work[q])) { const i = q % W, j = (q / W) | 0; set(q, mixA(get(q), [96, 206, 176], .5)); if (hash(i, j) < .04) set(q, [214, 255, 240]); }
  }
  if (st !== 'kuning') for (let q = 0; q < W * H; q++) if (gum[q]) {
    const i = q % W, j = (q / W) | 0; let nearW = false;
    for (let b = -3; b <= 3 && !nearW; b++) for (let a = -1; a <= 1; a++) { const r = (j + b) * W + i + a; if (work[r] >= 0) { nearW = true; break; } }
    if (nearW) set(q, hash(i, j) < .15 ? [150, 210, 255] : [62, 132, 210]);
  }
  x.putImageData(img, 0, 0); return c;
}
