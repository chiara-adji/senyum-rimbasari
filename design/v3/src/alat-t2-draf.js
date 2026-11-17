/* ==== DRAF Fase 3b-2: Rak Alat Tier 2 di Bahari Medika (hanya untuk salinan draf design/v3/alat-game.html) ==== */
/** Usulan isi rak T2: [id, nama, ikon TLD, harga, efek, syarat]. */
const AT2_DRAF = [
  ['ultra', 'Scaler Ultrasonik', 'ult', 8000000, 'Scaling 2x lebih cepat (1 klik = 2 karang).', null],
  ['hs', 'Bor High-speed + LED + Komposit', 'lgt', 15000000, 'Buka Tambal Komposit sewarna gigi.', null],
  ['perio', 'Periotome + Set Bius Blok', 'per', 10000000, 'Cabut lebih mudah + bius blok geraham.', null],
  ['file', 'File Tangan PSA', 'fil', 9000000, 'Perawatan saluran akar (PSA).', 'Butuh klinik tahap 3'],
];
/** Status draf: done = jumlah challenge, own = {id: 'ok' | 'kirim'}, disc = diskon total. */
const AT2 = { done: 9, own: { ultra: 'ok' }, disc: 0.10, discTxt: 'Harga teman Koh Hendra 5% + Jurnal 5%' };
const at2Price = it => Math.round(it[3] * (1 - AT2.disc) / 1000) * 1000;

/** Panel rak alat T2 (tab Alat). Klik tombol di kartu = beli (konfirmasi dulu). */
function openRakT2() {
  const W = 384, H = 252, X = 240 - W / 2, Y = 9, locked = () => AT2.done < CFG.TRIP.T2_CHALLENGES;
  openOverlay({ kind: 'rakT2', sel: 0, t: 0,
    update() {
      this.t++;
      if (hit('esc') && this.t > 1) { closeOverlay(); return; }
      if (hit('up')) this.sel = (this.sel + 3) % 4; if (hit('down')) this.sel = (this.sel + 1) % 4;
      if (input.click) { const h = topHit(input.click, /^at\d|^atb|^atx/); if (h) { if (h.id === 'atb') { closeOverlay(() => openBahari()); return; } if (h.id === 'atx') { closeOverlay(); return; } this.sel = +h.id.slice(2); this.buy(); return; } }
      if (okHit() && this.t > 2) this.buy();
    },
    buy() {
      const it = AT2_DRAF[this.sel], st = AT2.own[it[0]];
      if (locked()) { sfx('ui_deny'); toast('Rak T2 terbuka setelah ' + CFG.TRIP.T2_CHALLENGES + ' challenge.', 'bad'); return; }
      if (st) { sfx('ui_deny'); toast(st === 'ok' ? 'Sudah terpasang di klinik.' : 'Sedang dikirim, terpasang besok pagi.', 'bad'); return; }
      if (it[5]) { sfx('ui_deny'); toast(it[5] + '.', 'bad'); return; }
      const p = at2Price(it);
      if (S.money < p) { sfx('ui_deny'); toast('Uangmu belum cukup.', 'bad'); return; }
      closeOverlay(() => dialog(['Beli ' + it[1] + ' seharga ' + rupiah(p) + '?'], { speaker: 'Koh Hendra', choices: [
        { label: 'Beli', fn: () => { S.money -= p; AT2.own[it[0]] = 'kirim'; sfx('coin'); dialog(['Haiya, pilihan bagus, Dok. Sore ini saya kirim lewat Ilham. Besok pagi sudah terpasang di klinik.'], { speaker: 'Koh Hendra' }); } },
        { label: 'Nanti saja', fn: () => openRakT2() }] }));
    },
    drawHD() {
      hDim(this, .45);
      dropIn(this, X, Y, W, H, () => {
        hBox(X, Y, W, H, 'paper', { ornate: true });
        HT('Bahari Medika', 240, Y + 8, MGC.ink, { k: 4, sh: '#e8b878', align: 'c' });
        HT('Rak Alat Tier 2', 240, Y + 30, MGC.ink2, { align: 'c', bold: true });
        hDivider(X + 14, Y + 42, W - 28);
        const hv = hoverId();
        AT2_DRAF.forEach((it, i) => {
          const cy = Y + 49 + i * 41, cx = X + 12, cw = W - 24, st = AT2.own[it[0]], s = i === this.sel && !locked();
          if (hv === 'at' + i && !locked()) this.sel = i;
          hInset(cx, cy, cw, 37, st === 'ok' ? '#e4efd0' : '#f6e4b8');
          if (s) hGlow(cx, cy, cw, 37);
          hInset(cx + 5, cy + 5, 27, 27, null, true); toolIcon({ icon: it[2] }, cx + 10.5, cy + 10.5);
          HT(it[1], cx + 38, cy + 5, MGC.ink, { bold: true });
          HT(fitText(it[4], 244), cx + 38, cy + 16, MGC.ink2);
          const p = at2Price(it);
          if (AT2.disc && !st) { const w0 = HT(rupiah(it[3]), cx + 38, cy + 27, '#9a7a5a'); hR(cx + 38, cy + 30.5, w0, 1, '#9a7a5a'); HT(rupiah(p), cx + 44 + w0, cy + 27, '#2e6a34', { bold: true }); }
          else HT(st ? 'Milikmu' : rupiah(p), cx + 38, cy + 27, st ? '#2e6a34' : MGC.ink, { bold: true });
          const lb = st === 'ok' ? 'Terpasang' : st === 'kirim' ? 'Dikirim' : it[5] ? 'Tahap 3' : 'Beli', off = !!st || !!it[5] || locked();
          const bx = cx + cw - 70, by = cy + 8;
          hBtn(bx, by, 64, 21, lb, { on: s && !off, kind: off ? 'dark' : s ? null : 'paper', bold: true });
          if (off) { hc.fillStyle = 'rgba(70,50,30,.35)'; hc.fillRect(Math.round(bx * HI), Math.round(by * HI), 64 * HI, 21 * HI); }
          clickable(bx, by, 64, 21, () => {}, 'at' + i);
        });
        if (locked()) {
          hc.fillStyle = 'rgba(60,36,16,.55)'; hc.fillRect(Math.round((X + 10) * HI), Math.round((Y + 47) * HI), Math.round((W - 20) * HI), 166 * HI);
          hBox(X + 62, Y + 98, W - 124, 60, 'dark', { thin: true });
          HT('Rak terkunci', 240, Y + 106, MGC.lite, { k: 4, align: 'c', sh: DK });
          HT('Selesaikan ' + CFG.TRIP.T2_CHALLENGES + ' challenge · sekarang ' + AT2.done + '/' + CFG.TRIP.T2_CHALLENGES, 240, Y + 128, '#ffd86a', { align: 'c', sh: DK });
          HT('Koh Hendra: "Kerja yang rapi dulu, Dok."', 240, Y + 141, MGC.lite2, { align: 'c', sh: DK });
        }
        const fy = Y + H - 33;
        HT(AT2.disc ? AT2.discTxt : 'Belum ada diskon', X + 14, fy + 1, '#2e6a34');
        HT('Uangmu ' + rupiah(S.money), X + 14, fy + 12, MGC.ink2);
        const b1 = X + W - 150, s2 = hv === 'atb', s3 = hv === 'atx';
        hBtn(b1, fy, 66, 21, 'Bahan', { kind: s2 ? null : 'paper', on: s2, bold: true }); clickable(b1, fy, 66, 21, () => {}, 'atb');
        hBtn(b1 + 72, fy, 66, 21, 'Tutup', { kind: s3 ? null : 'paper', on: s3, bold: true }); clickable(b1 + 72, fy, 66, 21, () => {}, 'atx');
      });
    } });
}
