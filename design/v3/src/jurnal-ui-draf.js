/* [3b-1 DRAF UI] Hanya untuk salinan draf game design/v3/jurnal-game.html (build-jurnal.cjs). Tampilan saja, pemicu & imbalan belum jalan.
   Setelah draf di-ACC, isinya pindah ke src/jurnal3b.js dengan logika lengkap. Data = GDD §15 "Aturan Jurnal" (ACC 2026-11-17). */
/** 39 challenge: [nama, musim K/H/F, jenis s=urutan e=event t=tonggak, tujuan, target, batas hari (0 = tanpa), pemicu, imbalan]. */
const CHL = [
  ['Bersihkan Ruko', 'K', 's', 'Bersihkan semua titik kotor di Ruko Tua.', 6, 0, 'Surat Pak Harjo dibaca', 'Rp 500rb dari Pak Harjo · Trust Harjo +5'],
  ['Kenalan 8 warga', 'K', 's', 'Ngobrol dengan 8 warga Rimbasari.', 8, 7, 'Ruko selesai dibersihkan', 'Roti Manis x3 · Trust Bu Ratna +5'],
  ['Buka Praktik', 'K', 't', 'Renovasi ruko dan buka praktik pertama.', 1, 0, 'Renovasi selesai', 'Reputasi +10'],
  ['Rawat 5 warga', 'K', 's', 'Tangani 5 warga yang datang sebagai pasien.', 5, 0, 'Pasien warga pertama datang', 'Trust +3 ke kelima warga'],
  ['Panen herba pertama', 'K', 's', 'Panen satu tanaman herba di kebun rumah.', 1, 0, 'Bibit pertama ditanam', '3 bibit langka dari Mbah Darmi'],
  ['Pesan lewat Kantor Pos', 'K', 's', 'Pesan bahan atau alat lewat Kantor Pos.', 1, 5, 'Stok klinik tinggal 5', 'Ongkir gratis pesanan berikutnya'],
  ['Pameran: menang tebak-tebakan', 'K', 'e', 'Menangkan tebak-tebakan anak di Pameran Gigi Sehat.', 1, 1, 'Hari Kemarau 15', 'Reputasi +15 · Trust Bu Guru & Bu Endang +5'],
  ['Rawat Dimas tanpa menangis', 'K', 's', 'Selesaikan tindakan Dimas tanpa rasa sakit penuh.', 1, 0, 'Dimas datang sebagai pasien', 'Gambar dari Dimas (dekor klinik) · Trust Bu Endang +8'],
  ['Stok aman 7 hari', 'K', 's', 'Jaga stok bahan klinik minimal 30 selama 7 hari.', 7, 0, 'Stok pertama kali habis', '1 paket bahan gratis'],
  ['Tiga jenis nongkrong', 'K', 's', 'Coba 3 jenis tempat nongkrong yang berbeda.', 3, 10, 'Stres pertama kali di atas 50', 'Kopi Susu x3'],
  ['Tiga kontrol ulang', 'K', 's', 'Tangani 3 pasien yang datang kontrol ulang.', 3, 0, 'Jadwal kontrol pertama dibuat', 'Rp 300rb · Reputasi +10'],
  ['Ngobrol Mbah Darmi 7 hari', 'K', 's', 'Ngobrol dengan Mbah Darmi 7 hari berturut-turut.', 7, 0, 'Trust Mbah Darmi 20', 'Resep jamu: herba memulihkan energi +10'],
  ['Reputasi ★2', 'K', 't', 'Capai reputasi bintang 2.', 1, 0, '-', 'Rp 1jt dari Pak Harjo'],
  ['Darurat Pak Bowo', 'K', 'e', 'Tolong Pak Bowo di Kebun Kopi sebelum malam.', 1, 1, 'Hari Panen Kopi (Kemarau 35)', 'Biji Kopi x5 · Trust Pak Bowo +10'],
  ['Klinik tahap 2', 'K', 't', 'Upgrade klinik menjadi Klinik Gigi.', 1, 0, '-', 'Reputasi +20'],
  ['Rekrut staf pertama', 'K', 't', 'Rekrut satu staf klinik.', 1, 0, '-', 'Pelatihan pertama gratis'],
  ['Lima karies tersembunyi', 'K', 's', 'Temukan 5 karies sela gigi lewat rontgen.', 5, 0, 'Rontgen pertama', 'Rp 500rb · Reputasi +15'],
  ['Tiga Malam Minggu', 'K', 's', 'Ikut Karaoke Malam Minggu 3 kali.', 3, 0, 'Sabtu pertama setelah #2', 'Trust +3 ke semua yang pernah ikut karaoke'],
  ['Stres terjaga 14 hari', 'K', 's', 'Jaga Stres di bawah 80 selama 14 hari.', 14, 0, 'Stres pertama kali di atas 80', 'Tidur menurunkan Stres 5 lebih banyak'],
  ['Pesta Rakyat: menang', 'K', 'e', 'Menangkan tebak-tebakan warga di Pesta Rakyat.', 1, 1, 'Hari Kemarau 55', 'Reputasi +15 · hadiah undian'],
  ['Pendapatan Kemarau 5jt', 'K', 's', 'Kumpulkan pendapatan klinik 5jt di musim ini.', 5000000, 20, 'Hari Kemarau 40', 'Pajak berikutnya setengah (saran Adji)'],
  ['Lima rujukan Puskesmas', 'H', 's', 'Rujuk 5 pasien ke dr. Galih di Puskesmas.', 5, 20, 'Rujukan pertama ke Galih', 'Trust dr. Galih & Wulan +8'],
  ['Herba ke 10 pasien', 'H', 's', 'Berikan herba ke 10 pasien.', 10, 0, 'Sirih pertama kali dipakai', '+1 petak kebun'],
  ['Tanam Pohon: pos periksa', 'H', 'e', 'Periksa gigi 5 warga di pos Lereng Bukit.', 5, 2, 'Hari Hujan 10', 'Bibit pohon buah · Trust peserta +5'],
  ['Staf Skill Lv3', 'H', 't', 'Latih satu staf sampai Skill Lv3.', 1, 0, '-', 'Pelatihan berikutnya setengah harga'],
  ['Pajak 3x tepat waktu', 'H', 's', 'Bayar pajak 3 kali tanpa tunggakan.', 3, 0, 'Pajak pertama dipotong', 'Rp 1jt pengembalian pajak'],
  ['Harga teman Koh Hendra', 'H', 's', 'Capai Trust 40 dengan Koh Hendra.', 40, 0, 'Trust Koh Hendra 20', 'Diskon tambahan 5% rak T2'],
  ['Bakti Sosial 8 pasien', 'H', 'e', 'Periksa 8 pasien di Bakti Sosial.', 8, 1, 'Hari Hujan 25', 'Reputasi +20 · Trust Pak Lurah +10'],
  ['Satu Keluarga Sehat', 'H', 's', 'Rawat Bu Endang dan Dimas dalam satu minggu.', 2, 7, 'Trust Bu Endang 40', 'Seragam klinik dari Bu Endang'],
  ['Tim lengkap', 'H', 't', 'Punya semua jenis staf sekaligus.', 1, 0, '-', 'Foto tim di dinding · energi semua staf +1 Lv'],
  ['Klaim: periksa ulang', 'H', 'e', 'Periksa ulang gigi Pak Gunawan dengan rontgen.', 1, 3, 'Bab 3: klaim Pak Gunawan', 'Reputasi pulih · Trust Pak Gunawan +10'],
  ['Pak Joni', 'H', 'e', 'Edukasi 5 warga, lalu lapor Pak Lurah.', 5, 10, 'Bab 3: lapak Pak Joni', 'Joni jadi rujukan gigi palsu · Trust +5 ke 5 warga'],
  ['Malam Lampion bersama', 'H', 'e', 'Lepas lampion bersama seseorang.', 1, 1, 'Hari Hujan 45', 'Hubungan +10 atau Trust +10'],
  ['Semua warga Akrab', 'H', 't', 'Capai Trust 40 dengan semua 12 warga.', 12, 0, '-', 'Plakat warga kehormatan · Reputasi +30'],
  ['Klinik tahap 3', 'H', 't', 'Upgrade menjadi Klinik Gigi Lengkap.', 1, 0, '-', 'Reputasi +20'],
  ['Pidato Syukuran', 'H', 'e', 'Berpidato di Syukuran Akhir Tahun.', 1, 1, 'Hari Hujan 60', 'Reputasi +20 · Trust +5 ke semua yang hadir'],
  ['PSA pertama', 'F', 't', 'Selesaikan PSA pertama (K1 dan K2).', 1, 0, '-', 'Surat Bu Melinda: diskon alat T3 10%'],
  ['Diagnosis tepat 20x', 'F', 't', 'Diagnosis tepat 20 kali berturut-turut.', 20, 0, '-', 'Reputasi +30'],
  ['Lima pasien riwayat medis', 'F', 't', 'Tangani benar 5 pasien dengan riwayat medis.', 5, 0, '-', 'Tensimeter digital: anamnesis riwayat 5 menit lebih cepat'],
];
/** Nama pendek untuk chip HUD. */
const CH_SHORT = { 6: 'Pesan via Pos', 7: 'Pameran', 8: 'Rawat Dimas', 12: 'Ngobrol Darmi', 17: 'Karies tersembunyi', 19: 'Stres terjaga', 20: 'Pesta Rakyat', 21: 'Pendapatan 5jt', 22: 'Rujukan Puskesmas', 24: 'Pos periksa', 26: 'Pajak tepat waktu', 27: 'Harga teman', 28: 'Bakti Sosial', 29: 'Keluarga Sehat', 31: 'Klaim', 33: 'Malam Lampion', 36: 'Pidato Syukuran' };
const CH_TYPE = { s: ['Urutan', '#3a6a9a'], e: ['Event', '#a0285a'], t: ['Tonggak', '#7a5a10'] };
const CH_ST = { done: ['Selesai', '#2e7a34'], aktif: ['Aktif', '#a8700a'], skip: ['Terlewat', '#8a3a2a'], tunggu: ['Menunggu pemicu', '#8a6a4a'], belum: ['Belum', '#8a6a4a'] };
const chFmt = (n, v) => CHL[n - 1][4] >= 1e6 ? rupiah(v) : String(v);
/** Status contoh untuk draf (Kemarau hari 14, tahun 1). */
function chDrafState() {
  const st = {}; for (let i = 1; i <= 39; i++) st[i] = { s: CHL[i - 1][2] === 't' ? 'belum' : 'tunggu', p: 0 };
  [1, 2, 3, 4, 5].forEach(n => st[n] = { s: 'done', p: CHL[n - 1][4] }); st[13] = { s: 'done', p: 1 };
  st[6] = { s: 'aktif', p: 0, left: 3 }; st[7] = { s: 'aktif', p: 0, left: 1 }; st[38] = { s: 'belum', p: 11 }; st[39] = { s: 'belum', p: 2 }; st[34] = { s: 'belum', p: 4 };
  st[8].trig = false; st[9] = { s: 'tunggu', trig: true }; st[10] = { s: 'tunggu', trig: true };
  return { st, done: 6 };
}
let JD = chDrafState();
const chActive = () => Object.keys(JD.st).map(Number).filter(n => JD.st[n].s === 'aktif').sort((a, b) => CHL[a - 1][2] === 'e' ? 1 : -1);
/** Chip pelacak challenge aktif di HUD kanan, di bawah chip Fokus / janji / nikah, maks 2. */
function drawJurnalChips() {
  const y0 = 57 + (fokusOn() ? 17 : 0) + (S.rel && relJanji() ? 17 : 0) + (S.rel && S.rel.tunangan ? 17 : 0);
  chActive().forEach((n, i) => { const c = CHL[n - 1], s = JD.st[n], ev = c[2] === 'e';
    const prog = c[4] > 1 ? ' · ' + chFmt(n, s.p) + '/' + chFmt(n, c[4]) : '', dl = c[5] ? ' · ' + (s.left === 1 ? 'hari ini' : s.left + ' hari') : '';
    const t = '#' + n + ' ' + (CH_SHORT[n] || c[0]) + prog + dl, w = hW(t, true) + 26, X = 480 - 4 - w, Y = y0 + i * 17;
    hBox(X, Y, w, 15, 'paper', { thin: true }); hR(X + 5, Y + 3, 9, 9, ev ? '#a0285a' : '#3a6a9a'); HT('J', X + 7.5, Y + 4, '#ffffff', { bold: true }); HT(t, X + 18, Y + 4, ev ? '#a0285a' : MGC.ink, { bold: true }); });
}
/** Panel Jurnal (J / menu Esc): tab Aktif · Kemarau · Hujan · Tonggak, kisi nomor + kartu detail. */
function openJurnal(tab0, sel0) {
  const tabs = [['Aktif', () => chActive()], ['Kemarau', () => range(1, 21)], ['Hujan', () => range(22, 36)], ['Tonggak', () => CHL.map((c, i) => i + 1).filter(n => CHL[n - 1][2] === 't')]];
  function range(a, b) { const r = []; for (let i = a; i <= b; i++) r.push(i); return r; }
  let tab = tab0 || 0; const ov = { kind: 'panel', t: 0, sel: sel0 || tabs[tab][1]()[0] || 1 };
  const pick = k => { tab = (k + tabs.length) % tabs.length; ov.sel = tabs[tab][1]()[0] || ov.sel; sfx('ui_tick'); };
  ov.update = function () { this.t++; if ((hit('esc') || hit('jurnal')) && this.t > 1) return closeOverlay(); if (hit('tab')) pick(tab + 1);
    const ids = tabs[tab][1](), i = ids.indexOf(this.sel); if (ids.length) { if (hit('left')) this.sel = ids[(i + ids.length - 1) % ids.length]; if (hit('right')) this.sel = ids[(i + 1) % ids.length]; }
    if (input.click) { const h = topHit(input.click, /^jr/); if (h) h.fn(); } };
  ov.drawHD = function () { hDim(this, .45); dropIn(this, 16, 6, 448, 258, () => this.body()); };
  ov.body = function () {
    const X0 = 16, Y0 = 6, W = 448, H = 258, hv = hoverId(), ids = tabs[tab][1]();
    hBox(X0, Y0, W, H, 'paper', { ornate: true }); HT('Jurnal', 240, Y0 + 9, MGC.ink, { k: 4, sh: '#e8b878', align: 'c' }); hDivider(X0 + 14, Y0 + 34, W - 28);
    let tbx = X0 + 14; tabs.forEach(([n], k) => { const on = k === tab, tw = hW(n, true) + 10; hBtn(tbx, Y0 + 40, tw, 16, n, { kind: on ? 'gold' : hv === 'jrt' + k ? 'paper' : 'dark', bold: on }); const bx = tbx; clickable(bx, Y0 + 40, tw, 16, () => pick(k), 'jrt' + k); tbx += tw + 3; });
    if (tab === 0) { // daftar slot
      [['Slot 1 · Urutan musim', 's'], ['Slot 2 · Event & cerita', 'e']].forEach(([lab, ty], k) => { const y = Y0 + 62 + k * 62, n = ids.find(m => (CHL[m - 1][2] === 'e') === (ty === 'e'));
        HT(lab, X0 + 14, y, MGC.ink2, { bold: true }); const by = y + 10;
        if (!n) { hInset(X0 + 14, by, 190, 40, '#e6cfa0'); HT('Kosong', X0 + 109, by + 16, '#8a6a4a', { align: 'c' }); return; }
        const c = CHL[n - 1], s = JD.st[n], on = ov.sel === n; hInset(X0 + 14, by, 190, 40, on ? '#f6e2a8' : '#ead2a4'); if (on) hGlow(X0 + 14, by, 190, 40);
        HT('#' + n, X0 + 20, by + 5, CH_TYPE[c[2]][1], { bold: true }); HT(fitText(c[0], 150, true), X0 + 44, by + 5, MGC.ink, { bold: true });
        if (c[4] > 1) hBar(X0 + 20, by + 18, 120, 7, s.p / c[4], '#5ccf4a'); HT(c[4] > 1 ? chFmt(n, s.p) + '/' + chFmt(n, c[4]) : 'Belum selesai', c[4] > 1 ? X0 + 146 : X0 + 20, by + 18, MGC.ink2);
        HT(c[5] ? 'Batas: ' + (s.left === 1 ? 'hari ini' : s.left + ' hari lagi') : 'Tanpa batas waktu', X0 + 20, by + 28, c[5] && s.left <= 1 ? MGC.red : MGC.ink2, { bold: c[5] && s.left <= 1 });
        clickable(X0 + 14, by, 190, 40, () => { ov.sel = n; }, 'jrs' + k); });
      const nx = Object.keys(JD.st).map(Number).filter(n => JD.st[n].s === 'tunggu' && JD.st[n].trig && CHL[n - 1][2] === 's').sort((a, b) => a - b)[0];
      if (nx) { HT('Berikutnya: #' + nx + ' ' + CHL[nx - 1][0], X0 + 14, Y0 + 180, MGC.ink2); HT('(muncul setelah slot 1 selesai)', X0 + 14, Y0 + 190, '#8a6a4a'); }
    } else { // kisi nomor
      ids.forEach((n, i) => { const tx = X0 + 14 + (i % 7) * 29, ty = Y0 + 62 + Math.floor(i / 7) * 32, s = JD.st[n], on = ov.sel === n, c = CHL[n - 1];
        const face = s.s === 'done' ? '#cfe8b8' : s.s === 'aktif' ? '#ffe7a0' : s.s === 'skip' ? '#e8c0b0' : '#d8bf94';
        hInset(tx, ty, 27, 29, face); HT(String(n), tx + 13.5, ty + 5, s.s === 'tunggu' || s.s === 'belum' ? '#8a6a4a' : MGC.ink, { bold: true, align: 'c' });
        hR(tx + 3, ty + 17, 21, 3, CH_TYPE[c[2]][1]);
        HT(s.s === 'done' ? '✓' : s.s === 'aktif' ? '!' : s.s === 'skip' ? 'x' : '', tx + 13.5, ty + 20, CH_ST[s.s][1], { bold: true, align: 'c' });
        if (on) hGlow(tx, ty, 27, 29); clickable(tx, ty, 27, 29, () => { ov.sel = n; }, 'jrc' + n); });
      [['#3a6a9a', 'Urutan'], ['#a0285a', 'Event'], ['#7a5a10', 'Tonggak']].forEach(([col, t], k) => { const lx = X0 + 14 + k * 62; hR(lx, Y0 + 186, 8, 3, col); HT(t, lx + 11, Y0 + 184, MGC.ink2); });
    }
    HT('Selesai ' + JD.done + '/39', X0 + 14, Y0 + 210, MGC.ink, { bold: true }); HT('Rak T2 buka di 8 · Metrapura di 18', X0 + 14, Y0 + 222, MGC.ink2);
    HT('Tab: ganti halaman · J/Esc: tutup', X0 + 14, Y0 + 236, MGC.ink2);
    // kartu detail
    const n = ov.sel, c = CHL[n - 1], s = JD.st[n], cx = X0 + 222, cy = Y0 + 40, cw = 212;
    hBox(cx, cy, cw, 184, 'paper', { thin: true, shadow: false });
    if (!c) return; const hidden = s.s === 'tunggu' && !s.trig;
    hInset(cx + 7, cy + 7, 30, 26, '#ead2a4'); HT('#' + n, cx + 22, cy + 15, CH_TYPE[c[2]][1], { bold: true, align: 'c' });
    HT(hidden ? '???' : fitText(c[0], cw - 52, true), cx + 44, cy + 8, MGC.ink, { bold: true });
    const chip = (t, col, x) => { const w = hW(t, true) + 10; hR(x, cy + 21, w, 11, col); HT(t, x + 5, cy + 23, '#ffffff', { bold: true }); return w; };
    const w1 = chip(CH_TYPE[c[2]][0], CH_TYPE[c[2]][1], cx + 44); chip(CH_ST[s.s][0], CH_ST[s.s][1], cx + 48 + w1);
    let y = cy + 40; hDivider(cx + 7, y, cw - 14); y += 7;
    if (hidden) { hWrap('Challenge ini belum terbuka.', cw - 14).forEach(l => { HT(l, cx + 7, y, '#6a4a26'); y += 10; }); y += 4;
      HT('Petunjuk', cx + 7, y, MGC.ink2); y += 11; hWrap(c[6], cw - 14, true).forEach(l => { HT(l, cx + 7, y, MGC.ink, { bold: true }); y += 10; }); return; }
    hWrap(c[3], cw - 14).forEach(l => { HT(l, cx + 7, y, '#6a4a26'); y += 10; }); y += 4;
    if (c[4] > 1) { HT('Kemajuan', cx + 7, y, MGC.ink2); HT(chFmt(n, s.p || 0) + ' / ' + chFmt(n, c[4]), cx + cw - 7, y, MGC.ink, { bold: true, align: 'r' }); y += 11;
      hBar(cx + 7, y, cw - 14, 7, (s.p || 0) / c[4], s.s === 'done' ? '#5ccf4a' : '#e8a020'); y += 12; }
    const row = (k, v, col, bold) => { HT(k, cx + 7, y, MGC.ink2); hWrap(v, cw - 66, bold).forEach(l => { HT(l, cx + 60, y, col || MGC.ink, { bold }); y += 10; }); y += 2; };
    row('Batas', c[5] ? (s.s === 'aktif' ? (s.left === 1 ? 'hari ini' : s.left + ' hari lagi') : c[5] + ' hari sejak muncul') : 'tanpa batas', s.s === 'aktif' && s.left <= 1 ? MGC.red : null, s.s === 'aktif');
    if (c[2] !== 't') row('Pemicu', c[6]);
    row('Imbalan', c[7], '#2e7a34', true);
    if (c[2] !== 't' && s.s !== 'done') { y += 2; hWrap(c[1] === 'K' ? 'Lewat Kemarau 60 = terlewat, muncul lagi tahun depan.' : 'Lewat Hujan 60 = terlewat, muncul lagi tahun depan.', cw - 14).forEach(l => { HT(l, cx + 7, y, '#8a6a4a'); y += 10; }); }
    hBtn(X0 + W - 88, Y0 + 229, 74, 19, 'Tutup', { kind: hv === 'jrx' ? 'gold' : null, on: true, bold: true }); clickable(X0 + W - 88, Y0 + 229, 74, 19, () => closeOverlay(), 'jrx');
  };
  openOverlay(ov);
}
/** Kartu "Challenge baru" / "Challenge selesai" (gaya kartu romance 3a-4, warna Jurnal). */
function chCard(n, done, after) {
  const c = CHL[n - 1];
  openOverlay({ kind: 'card', t: 0,
    update() { this.t++; if ((okHit() || input.click || hit('esc')) && this.t > 20) closeOverlay(after); },
    drawHD() { const p = ovProg(this); hc.save(); hc.globalAlpha = p; hR(0, 0, 480, 270, 'rgba(14,10,6,.9)');
      hBox(100, 50, 280, done ? 136 : 140, 'paper', { ornate: true });
      HT(done ? 'Challenge selesai!' : 'Challenge baru', 240, 70, done ? '#2e7a34' : CH_TYPE[c[2]][1], { bold: true, align: 'c' });
      HT('#' + n, 240, 82, CH_TYPE[c[2]][1], { bold: true, align: 'c' }); HT(CH_SHORT[n] || c[0], 240, 93, MGC.ink, { k: 4, align: 'c', sh: '#e8b878' });
      hDivider(124, 124, 232); let y = 132;
      if (done) { HT('Imbalan', 240, y, MGC.ink2, { align: 'c' }); y += 12; c[7].split(' · ').forEach(t => { HT(t, 240, y, '#2e7a34', { bold: true, align: 'c' }); y += 11; });
        y += 4; HT('Selesai ' + (JD.done + 1) + '/39', 240, y, MGC.ink2, { align: 'c' }); }
      else { hWrap(c[3], 220).forEach(l => { HT(l, 240, y, '#6a4a26', { align: 'c' }); y += 10; }); y += 3;
        HT(c[5] ? 'Batas ' + c[5] + ' hari' : 'Tanpa batas waktu', 240, y, c[5] ? MGC.red : MGC.ink2, { bold: true, align: 'c' }); y += 11;
        HT('Imbalan: ' + fitText(c[7], 200), 240, y, '#2e7a34', { align: 'c' }); }
      if (this.t > 20 && Math.floor(game.t * 2) % 2) HT('E / klik: lanjut · J: buka Jurnal', 240, done ? 172 : 176, '#c4a88c', { align: 'c' }); hc.restore(); } });
}
/** Kartu ganti musim: challenge yang terlewat. */
function chSkipCard(list, after) {
  openOverlay({ kind: 'card', t: 0,
    update() { this.t++; if ((okHit() || input.click || hit('esc')) && this.t > 20) closeOverlay(after); },
    drawHD() { const p = ovProg(this); hc.save(); hc.globalAlpha = p; hR(0, 0, 480, 270, 'rgba(14,10,6,.9)');
      hBox(110, 54, 260, 160, 'paper', { ornate: true }); HT('Musim Kemarau berakhir', 240, 66, '#8a3a2a', { bold: true, align: 'c' });
      HT('Challenge terlewat', 240, 80, MGC.ink, { k: 4, align: 'c', sh: '#e8b878' }); hDivider(124, 108, 232); let y = 116;
      list.forEach(n => { HT('#' + n + ' ' + CHL[n - 1][0], 240, y, '#8a3a2a', { bold: true, align: 'c' }); y += 11; });
      y += 4; hWrap('Muncul lagi di Musim Kemarau tahun depan. Jurnal lanjut ke #22 Lima rujukan Puskesmas.', 220).forEach(l => { HT(l, 240, y, '#6a4a26', { align: 'c' }); y += 10; });
      if (this.t > 20 && Math.floor(game.t * 2) % 2) HT('E / klik: lanjut', 240, 200, '#c4a88c', { align: 'c' }); hc.restore(); } });
}
