/* [3a-5 DRAF UI] Hanya untuk salinan draf game design/v3/nikah-game.html (build-nikah.cjs). Tampilan saja, efek belum.
   Setelah draf di-ACC, isinya pindah ke src/nikah3a.js dengan efek lengkap. */
Object.assign(FD.ITEMS, Object.fromEntries(Object.entries(NIKAH_ITEMS).map(([k, v]) => [k, [v[0], v[1], v[2]]])));
for (const k in ICN) { ICF[k] = ICN[k]; ICF_HD[k] = epxImg(ICN[k]); }
const KENCAN_PLACES = [
  { k: 'bukit', name: 'Bukit Bintang', jam: 19, cost: 0, desc: 'Lihat bintang, kota kelihatan dari atas' },
  { k: 'kedai', name: 'Kedai Kopi Seduh', jam: 16, cost: 60000, desc: 'Ngopi berdua, Nadia yang racik' },
  { k: 'angkringan', name: 'Angkringan Alun-alun', jam: 19.5, cost: 20000, desc: 'Wedang jahe dan gorengan' },
  { k: 'bunga', name: 'Kebun Bunga', jam: 10, cost: 0, desc: 'Jalan pagi di antara bedeng bunga' }];
/** Panel Ajak Kencan: pilih tempat & jam. */
function openKencan(id) {
  foodPanel({ title: 'Ajak Kencan', w: 340, h: 236,
    nav(ov) { const n = KENCAN_PLACES.length; if (hit('up')) ov.sel = (ov.sel + n - 1) % n; if (hit('down')) ov.sel = (ov.sel + 1) % n; },
    cell(ov, i) { ov.sel = +i; },
    draw(ov, X, Y, W, H) {
      const px = X + 14, py = Y + 42; hInset(px, py, 40, 38, '#ead2a4'); hBust(id, px + 2, py + 4, 1.5, 'happy');
      HT(npcName(id) + ' · Pacaran', px + 48, py + 2, '#c0407a', { bold: true }); relBar(id, px + 48, py + 16, 150);
      HT('Sekali sehari · tidak datang ♥ -10', px + 48, py + 28, MGC.ink2);
      KENCAN_PLACES.forEach((p, i) => { const y = py + 46 + i * 22, s = i === ov.sel;
        hInset(px, y, W - 28, 20, s ? '#ffe7a0' : null); if (s) hSel(px, y, W - 28, 20);
        HT(p.name, px + 8, y + 3, MGC.ink, { bold: true }); HT(p.desc, px + 8, y + 11, MGC.ink2);
        HT(hhmm(p.jam), X + W - 84, y + 6, MGC.ink, { bold: true, align: 'r' }); HT(p.cost ? rupiah(p.cost) : 'Gratis', X + W - 22, y + 6, p.cost ? MGC.ink2 : '#2e7a34', { align: 'r' });
        clickable(px, y, W - 28, 20, () => {}, 'fc' + i); });
      hDivider(X + 14, Y + H - 48, W - 28); HT('♥ +4 · Stres -10 · 1 jam bersama', X + 14, Y + H - 43, '#c0407a', { bold: true });
    },
    buttons(ov) { return [{ label: 'Ajak', w: 64, fn: () => { const p = KENCAN_PLACES[ov.sel]; toast('Janji kencan: ' + npcName(id) + ' · hari ini ' + hhmm(p.jam) + ' · ' + p.name, 'good'); } }, { label: 'Batal', w: 64, fn: () => {} }]; } });
}
/** Kartu judul romance umum (kencan, lamaran, pernikahan). icon = kunci ikon barang besar di tengah (opsional). */
function romCard(top, title, sub, after, icon) {
  openOverlay({ kind: 'card', t: 0,
    update() { this.t++; if ((okHit() || input.click || hit('esc')) && this.t > 20) closeOverlay(after); },
    drawHD() { const p = ovProg(this); hc.save(); hc.globalAlpha = p; hR(0, 0, 480, 270, 'rgba(14,8,10,.94)');
      HT(top, 240, icon ? 70 : 96, '#f0a0c0', { align: 'c', bold: true });
      if (icon) { hc.imageSmoothingEnabled = false; hc.drawImage(ICF_HD[icon], Math.round(224 * HI), Math.round(84 * HI), 32 * HI, 32 * HI); }
      HT(title, 240, icon ? 124 : 112, '#fff2d4', { k: 4, align: 'c', sh: '#5a1a30' });
      HT(sub, 240, icon ? 158 : 146, '#e8c8a8', { align: 'c' });
      if (this.t > 20 && Math.floor(game.t * 2) % 2) HT('E / klik: lanjut', 240, 190, '#c4a88c', { align: 'c' }); hc.restore(); } });
}
/** Adegan telepon keluarga: potret kandidat memegang telepon, nama yang ditelepon, titik berdering. */
function phoneCard(id, who, from, after) {
  openOverlay({ kind: 'card', t: 0,
    update() { this.t++; if ((okHit() || input.click || hit('esc')) && this.t > 20) closeOverlay(after); },
    drawHD() { const p = ovProg(this); hc.save(); hc.globalAlpha = p; hR(0, 0, 480, 270, 'rgba(14,8,10,.9)');
      hBox(150, 64, 180, 120, 'paper', { ornate: true }); hInset(212, 78, 56, 52, '#ead2a4'); hBust(id, 214, 82, 2.2, 'happy');
      const ring = Math.floor(game.t * 3) % 2; hR(272, 84, 8, 14, '#25242c'); hR(273, 86, 6, 8, ring ? '#7fe8a8' : '#3a6a5a');
      if (ring) { HT(')', 284, 84, MGC.red, { bold: true }); HT(')', 289, 82, MGC.red, { bold: true }); }
      HT(npcName(id) + ' menelepon ' + who, 240, 138, MGC.ink, { bold: true, align: 'c' }); HT(from, 240, 150, MGC.ink2, { align: 'c' });
      HT('Tuut… tuut…' + '.'.repeat(Math.floor(game.t * 2) % 3), 240, 164, '#a0285a', { align: 'c' });
      if (this.t > 20 && Math.floor(game.t * 2) % 2) HT('E / klik: lanjut', 240, 196, '#c4a88c', { align: 'c' }); hc.restore(); } });
}
/** Toserba Samudra: tab kelompok, kisi barang, info Tas & uang. ↑↓ ganti tab, ◀▶ pilih barang. */
function openToserba() {
  const tabs = TOSERBA_TABS, list = ov => tabs[ov.tab][1], cur = ov => list(ov)[Math.min(ov.sel, list(ov).length - 1)];
  const o = foodPanel({ title: 'Toserba Samudra', w: 396, h: 184,
    nav(ov) { ov.tab = ov.tab || 0; const n = list(ov).length; if (hit('left')) ov.sel = (ov.sel + n - 1) % n; if (hit('right')) ov.sel = (ov.sel + 1) % n;
      if (hit('up')) { ov.tab = (ov.tab + tabs.length - 1) % tabs.length; ov.sel = 0; } if (hit('down')) { ov.tab = (ov.tab + 1) % tabs.length; ov.sel = 0; } },
    tab(ov, i) { ov.tab = +i; ov.sel = 0; }, cell(ov, i) { ov.sel = +i; },
    draw(ov, X, Y, W, H) { ov.tab = ov.tab || 0; const k = cur(ov);
      let tx = X + 14; tabs.forEach(([t], i) => { const w = hW(t, true) + 14, on = i === ov.tab; hBox(tx, Y + 40, w, 15, on ? 'gold' : 'paper', { thin: true, shadow: false });
        HT(t, tx + 7, Y + 44, on ? MGC.ink : MGC.ink2, { bold: on }); clickable(tx, Y + 40, w, 15, () => {}, 'ft' + i); tx += w + 4; });
      const L = list(ov), tw = 50, tg = 4, t0 = X + 14;
      L.forEach((it, i) => { const x0 = t0 + i * (tw + tg), y0 = Y + 62, on = it === k; hInset(x0, y0, tw, 52, on ? '#ffe7a0' : null); if (on) hSel(x0, y0, tw, 52);
        hFood(it, x0 + tw / 2 - 8, y0 + 4); const w = FD.ITEMS[it][0].split(' ');
        HT(w[0], x0 + tw / 2, y0 + 23, MGC.ink, { align: 'c', bold: true }); if (w[1]) HT(w.slice(1).join(' '), x0 + tw / 2, y0 + 32, MGC.ink, { align: 'c', bold: true });
        HT(rupiah(FD.ITEMS[it][1]).replace('Rp ', ''), x0 + tw / 2, y0 + 42, MGC.ink2, { align: 'c' }); clickable(x0, y0, tw, 52, () => {}, 'fc' + i); });
      HT('Buat dipakai sendiri atau dijadikan hadiah.', X + 14, Y + 119, MGC.ink2);
      hDivider(X + 14, Y + H - 48, W - 28);
      HT(FD.ITEMS[k][0] + ' · di Tas ' + (S.food.bag[k] || 0), X + 14, Y + H - 43, MGC.ink, { bold: true }); HT('Tas ' + foodSlots(S.food.bag) + '/' + FD.BAG_MAX, X + W / 2 + 10, Y + H - 43, MGC.ink2);
      HT('Uangmu ' + rupiah(S.money), X + W - 14, Y + H - 43, S.money >= FD.ITEMS[k][1] ? MGC.ink2 : MGC.red, { align: 'r' });
    },
    buttons(ov) { return [{ label: 'Beli 1', w: 64, keep: true, fn: () => { const k = cur(ov); S.money -= FD.ITEMS[k][1]; S.food.bag[k] = (S.food.bag[k] || 0) + 1; toast('+1 ' + FD.ITEMS[k][0] + ' masuk Tas', 'good'); } }, { label: 'Tutup', w: 64, fn: () => {} }]; } });
  o.tab = 0; return o;
}
/** Emas Lina: cincin lamaran (setelah pacaran, maks 1), kalung, gelang. */
function openEmas() {
  const items = ['cincin', 'kalung', 'gelang'], pacar = () => S.rel && S.rel.pacar;
  foodPanel({ title: 'Emas Lina', w: 340, h: 200,
    nav(ov) { const n = items.length; if (hit('left')) ov.sel = (ov.sel + n - 1) % n; if (hit('right')) ov.sel = (ov.sel + 1) % n; }, cell(ov, i) { ov.sel = +i; },
    draw(ov, X, Y, W, H) { const k = items[ov.sel]; HT('Perhiasan Ci Lina · istri Koh Hendra', X + 14, Y + 40, MGC.ink2);
      items.forEach((it, i) => { const tw = 96, x0 = X + 14 + i * (tw + 6), y0 = Y + 54, on = i === ov.sel, lock = it === 'cincin' && !pacar();
        hInset(x0, y0, tw, 66, on ? '#ffe7a0' : null); if (on) hSel(x0, y0, tw, 66); hFood(it, x0 + tw / 2 - 16, y0 + 4, true);
        HT(FD.ITEMS[it][0], x0 + tw / 2, y0 + 40, MGC.ink, { align: 'c', bold: true }); HT(rupiah(FD.ITEMS[it][1]), x0 + tw / 2, y0 + 51, MGC.ink2, { align: 'c' });
        if (lock) { hR(x0 + 1, y0 + 1, tw - 2, 64, 'rgba(70,50,30,.35)'); HT('Setelah pacaran', x0 + tw / 2, y0 + 28, '#fff2d4', { align: 'c', bold: true, sh: '#3a1a08' }); }
        clickable(x0, y0, tw, 66, () => {}, 'fc' + i); });
      HT(k === 'cincin' ? 'Syarat lamaran: pacaran, ♥ 95, Rumah Lv 3. Maks 1 cincin.' : 'Hadiah mahal, bisa dikasih ke siapa saja.', X + 14, Y + 128, MGC.ink2);
      hDivider(X + 14, Y + H - 48, W - 28); HT('Di Tas: ' + (S.food.bag[k] || 0), X + 14, Y + H - 43, MGC.ink, { bold: true });
      HT('Uangmu ' + rupiah(S.money), X + W - 14, Y + H - 43, S.money >= FD.ITEMS[k][1] ? MGC.ink2 : MGC.red, { align: 'r' }); },
    buttons(ov) { const k = items[ov.sel], off = k === 'cincin' && !pacar(); return [{ label: 'Beli', w: 64, keep: true, off, offMsg: 'Cincin lamaran baru dijual setelah kamu pacaran.', fn: () => { S.money -= FD.ITEMS[k][1]; S.food.bag[k] = (S.food.bag[k] || 0) + 1; toast('+1 ' + FD.ITEMS[k][0] + ' masuk Tas', 'good'); } }, { label: 'Tutup', w: 64, fn: () => {} }]; } });
}
/** Ringkasan bonus menikah per kandidat (teks panel). */
const NIKAH_BONUS_TXT = {
  adji: ['Pajak klinik 10% jadi 5%.', 'Stres -10 tiap pagi.', 'Laporan keuangan mingguan tiap Senin pagi.'],
  arya: ['Upgrade rumah & klinik -50%, selesai jam 18 hari itu juga.', 'Alat rusak diperbaiki Arya gratis.', 'Tagihan listrik & air Senin -30%.'],
  raka: ['Trust warga naik 25% lebih cepat dari semua sumber.', 'Reputasi & Trust tidak turun saat tindakan Gagal atau komplikasi.', 'Kasus Pak Joni lebih cepat (menyusul di Fase 3b).'],
  galih: ['Peluang komplikasi pasien riwayat medis 50% jadi 25%.'], sekar: ['Kesabaran pasien +20%.'], nadia: ['Energi +20 tiap bangun tidur (boleh lewat batas).'],
  laras: ['Reputasi dari tindakan ×1,25.'], wulan: ['Rasa sakit pasien anak ×0,75.', '+1 pasien per hari (rujukan dari Puskesmas).'] };
function openBonus(id) { openPanel({ title: 'Bonus Menikah · ' + npcName(id), w: 320, rows: () => [['Berlaku selama menikah, tiap hari:', MGC.ink2], ...NIKAH_BONUS_TXT[id].map(t => ['♥ ' + t, MGC.ink, true]), [npcName(id) + ' sekarang tinggal di rumahmu. Pagi di rumah, lalu berangkat kerja. Pulang malam.', MGC.ink2]], buttons: () => [{ label: 'Oke', fn: () => {} }] }); }
function openLaporan() { openPanel({ title: 'Laporan Mingguan Adji', w: 320, rows: () => [['Minggu lalu, Senin sampai Minggu', MGC.ink2],
  ['Pemasukan klinik: Rp 4.850.000 · 31 pasien', MGC.ink, true], ['Pengeluaran: bahan Rp 1.500.000 · listrik & air Rp 750.000 · makan Rp 210.000', MGC.ink],
  ['Bersih: Rp 2.390.000 (naik 12% dari minggu sebelumnya)', '#2e7a34', true], ['Pajak berikutnya hari 31: 5% dari pendapatan kotor.', MGC.ink],
  ['"Jangan lupa makan siang. Aku cek." · Adji', '#a0285a', true]], buttons: () => [{ label: 'Makasih', fn: () => {} }] }); }
/** [draf] status di Buku Kenalan. */
function relStatus(id) {
  if (S.rel && S.rel.nikah === id) return ['Menikah', '#c0407a'];
  if (S.rel && S.rel.tunangan === id) return ['Tunangan · nikah ' + dayLabel(S.rel.nikahDay), '#c0407a'];
  if (isPacar(id)) return ['Pacaran', '#c0407a'];
  if (isRenggang(id)) return ['Renggang · ' + (relSt().reng[id] - S.day + 1) + ' hari lagi', '#a8700a'];
  return ['Teman', MGC.ink];
}
window.NIKAH_DRAF = { kencan: openKencan, card: romCard, phone: phoneCard, toserba: openToserba, emas: openEmas, bonus: openBonus, laporan: openLaporan, dialog, morning: morningCard, book: openBook, relSt };
