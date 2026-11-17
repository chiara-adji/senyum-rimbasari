/* [3a-4] Hubungan, hadiah, event romance E1–E5 (GDD §9, §10; ACC usulan user 2026-11-15 "ACC semua").
   Hadiah: G di dekat NPC → panel Beri Hadiah (isi Tas: bahan, bekal, herba, barang hadiah), sekali sehari per NPC.
   Barang hadiah dibeli lewat tombol "Beli Bungkus" di panel nongkrong/Perpustakaan, di Warung, dan etalase Ci Lina (Bahari Medika).
   Hubungan (0–100) hanya untuk kandidat lawan jenis (romanceIds). Event E1–E5 lewat ajakan: ♥ di kepala → NPC mengajak ketemu
   di tempat & jam event → NPC berjalan ke sana dan menunggu → E memutar event (kartu judul, dialog, panel 3 pilihan acak).
   Disisipkan oleh tools/build-game.cjs setelah src/nongkrong3a.js (di dalam IIFE game). Angka di CFG.REL (tag [3a]). */
CFG.REL = { // [3a]
  TALK: 2,                                   // GDD §9: ngobrol +2 Hubungan (sekali sehari)
  GIFT: { suka: [5, 6], biasa: [2, 2], benci: [-3, -4] }, // usulan 3a-4: [Trust, Hubungan] per reaksi hadiah
  EV: [20, 35, 50, 70, 85],                  // GDD §9: ambang E1–E5
  RESP: [15, 5, -10],                        // GDD §9: respons terbaik/biasa/buruk
  RENGGANG_N: 3, RENGGANG_DAYS: 7,           // GDD §9: 3 respons buruk berturut-turut → Renggang 7 hari
  NOSHOW_E5: -10,                            // GDD §9 (aturan kencan): janji E5 tidak didatangi
  WAIT_MIN: 120,                             // usulan 3a-4: NPC menunggu 2 jam di tempat janji
  EV_MIN: 30,                                // usulan 3a-4: event memakan 30 menit
};

// ---- Barang hadiah (masuk Tas lewat FD.ITEMS supaya ikut hitungan isi Tas) ----
/** [nama, harga, satuan] + tempat beli. Warung = panel Warung; lainnya = panel Beli Bungkus. */
const GIFT_ITEMS = {
  rotiManis: ['Roti Manis', 10000, 'bungkus'], kopiSusu: ['Kopi Susu', 25000, 'gelas'], kopiTubruk: ['Kopi Tubruk', 5000, 'gelas'],
  wedang: ['Wedang Jahe', 5000, 'gelas'], gorengan: ['Gorengan', 5000, 'bungkus'], tehMelati: ['Teh Melati', 5000, 'kotak'], esTeh: ['Es Teh', 4000, 'gelas'],
  bunga: ['Bunga', 10000, 'ikat'], buku: ['Buku Bekas', 15000, 'buku'], kartuPos: ['Kartu Pos', 5000, 'lembar'], bijiKopi: ['Biji Kopi', 40000, 'kantong'], kain: ['Kain', 30000, 'lembar'],
};
Object.assign(FD.ITEMS, GIFT_ITEMS);
/** Tempat beli: kunci → { name, open, close, items }. Jam buka mengikuti penjualnya (06-jadwal). */
const GIFT_SHOPS = {
  roti: { name: 'Toko Roti Manis', open: 7, close: 17, items: ['rotiManis'] },
  kedai: { name: 'Kedai Kopi Seduh', open: 8, close: 22, items: ['kopiSusu'] },
  angkringan: { name: 'Angkringan', open: 18, close: 24, items: ['kopiTubruk', 'wedang', 'gorengan'] },
  perpus: { name: 'Perpustakaan & Kebun Bunga', open: 9, close: 19, items: ['bunga', 'buku'] },
  lina: { name: 'Etalase Ci Lina', open: 8, close: 17, items: ['kartuPos', 'bijiKopi', 'kain'] },
  warung: { name: 'Warung Bu Ratna', items: ['tehMelati', 'esTeh'] },
};
const GIFT_SHOP_OF = {}; for (const s in GIFT_SHOPS) GIFT_SHOPS[s].items.forEach(k => { GIFT_SHOP_OF[k] = s; });
const isGiftItem = k => k in GIFT_ITEMS;

/* Ikon 16×16 (gaya ICF makan.js: garis luar coklat tua, cahaya kiri atas). Didaftarkan ke ICF/ICF_HD supaya hFood bisa memakainya. */
const ICG_SRC = {
  rotiManis: [
    '................',
    '................',
    '................',
    '.....kkkkkk.....',
    '...kkCCCCCCkk...',
    '..kCCwfCCCCCCk..',
    '..kCwCCCfCCfCk..',
    '.kCCCCfCCCCCCck.',
    '.kCfCCCCCfCCCck.',
    '.kcCCCCCCCCCcck.',
    '.kccCCCCCCCcccK.',
    '..kcccccccccck..',
    '...kkkkkkkkkk...',
    '................',
    '................',
    '................'],
  kopiSusu: [
    '.........kk.....',
    '........kbk.....',
    '........kbk.....',
    '...kkkkkkbkkk...',
    '..kWWWWWWbWWWk..',
    '..kSSSSSSSSSSk..',
    '...kTTTTTTTTk...',
    '...kTwTTTTTtk...',
    '...kTwTTTTTtk...',
    '...kTTTTTTTtk...',
    '....knnnnnnk....',
    '....kTTTTTtk....',
    '....kTTTTTtk....',
    '....kTTTTttk....',
    '....kkkkkkkk....',
    '................'],
  kopiTubruk: [
    '................',
    '.....w...w......',
    '......w...w.....',
    '.....w...w......',
    '...kkkkkkkkk....',
    '...kLnnnnnnLk...',
    '...kLnNnnnnLkkk.',
    '...kLLnnnnLLk.k.',
    '...kLLLLLLLLkkk.',
    '....kLLLLLLk....',
    '....kLLLLLLk....',
    '..kkkkkkkkkkkk..',
    '..kSSSSSSSSSSk..',
    '...kkkkkkkkkk...',
    '................',
    '................'],
  wedang: [
    '................',
    '......w..w......',
    '.....w..w.......',
    '......w..w......',
    '...kkkkkkkkk....',
    '...kcYYYYYYck...',
    '...kcYOYYYYckkk.',
    '...kccYYYYccck.k',
    '...kcccccccck..k',
    '...kcCcccccckkk.',
    '...kcCcccccck...',
    '...kccccccccck..',
    '....kkkkkkkkk...',
    '................',
    '................',
    '................'],
  gorengan: [
    '................',
    '................',
    '....kkk..kkk....',
    '...kyaak.kaayk..',
    '..kyaAAakkaAAak.',
    '..kaAAAAkkAAAAk.',
    '.kkkAAAkyakAAkk.',
    '.kWkkkkyaaakkWk.',
    '.kWWWkaAAAAkWWk.',
    '..kWWkkAAAkkWk..',
    '..kWWWWkkkWWWk..',
    '...kWWWWWWWWk...',
    '....kSWWWWSk....',
    '.....kkkkkk.....',
    '................',
    '................'],
  tehMelati: [
    '................',
    '................',
    '...kkkkkkkkkk...',
    '..kggggggggggk..',
    '..kGGGGGGGGGgk..',
    '..kgggwwwggggk..',
    '..kggwwywwgggk..',
    '..kgggwwwgGggk..',
    '..kgggggGGgggk..',
    '..kggggggGgggk..',
    '..kWWWWWWWWWWk..',
    '..kgggggggggghk.',
    '..khhhhhhhhhhk..',
    '...kkkkkkkkkk...',
    '................',
    '................'],
  esTeh: [
    '.........kk.....',
    '........krk.....',
    '........krk.....',
    '...kkkkkkrkkk...',
    '...kLLLLLrLLk...',
    '...kLwwLLrLLk...',
    '...kOwlwOOOLk...',
    '...kOOlwlOOOk...',
    '...kOOOOwOOOk...',
    '....kOYOOOOk....',
    '....kOOOOOYk....',
    '....kOOOOYYk....',
    '....kYOOYYYk....',
    '....kkkkkkkk....',
    '................',
    '................'],
  bunga: [
    '................',
    '...kk...kk......',
    '..kppk.kmmk.kk..',
    '..kpwpkkmPmkppk.',
    '...kppkymmkpwpk.',
    '....kkGkkkkkppk.',
    '...kpkGgk.kGkk..',
    '..kpwpkGkkGgk...',
    '...kpkgGGGgk....',
    '....kWWgGgWk....',
    '...kWWWWgWWWk...',
    '...kWEWWWWEWk...',
    '....kWEWWEWk....',
    '.....kWWWWk.....',
    '......kkkk......',
    '................'],
  buku: [
    '................',
    '................',
    '...kkkkkkkkkk...',
    '..kNnnnnnnnnnk..',
    '..kNnNNNNNNnnk..',
    '..kNnnnnnnnnnk..',
    '..kNnnyyyynnnk..',
    '..kNnnnnnnnnnk..',
    '..kNnnnnnnnnnk..',
    '..kNnnnnnnnnnk..',
    '..kNnnnnnnnnnk..',
    '..kNWWWWWWWWWk..',
    '..kNEEEEEEEEEk..',
    '...kkkkkkkkkk...',
    '................',
    '................'],
  kartuPos: [
    '................',
    '................',
    '................',
    '.kkkkkkkkkkkkkk.',
    '.kWWWWWWWWkrrrk.',
    '.kWllllllWkrwrk.',
    '.kWllwlllWkrrrk.',
    '.kWlllllllWkkkk.',
    '.kWbbbbbbbWWWWk.',
    '.kWbbBbbbbWSSWk.',
    '.kWaaaaaaaWWWWk.',
    '.kWWWWWWWWWSSWk.',
    '.kkkkkkkkkkkkkk.',
    '................',
    '................',
    '................'],
  bijiKopi: [
    '................',
    '.....kkkkkk.....',
    '....kEEkkEEk....',
    '.....kEEEEk.....',
    '....kEkkkkEk....',
    '...kEEEEEEEEk...',
    '..kEEnnEEnnEEk..',
    '..kEnnNnnNnnEk..',
    '..kEnNnnnnNnEk..',
    '..kEEnnEEnnEEk..',
    '..kEEEEnnEEEEk..',
    '..kEEEnNnnEEEk..',
    '..kEEEEnnEEEEk..',
    '...kEEEEEEEEk...',
    '....kkkkkkkk....',
    '................'],
  kain: [
    '................',
    '................',
    '................',
    '..kkkkkkkkkkkk..',
    '.kbbybbbybbbybk.',
    '.kbyybbyybbyybk.',
    '.kBbbbbbbbbbbBk.',
    '.kkkkkkkkkkkkkk.',
    '.kmmammmammmamk.',
    '.kmaammaammaamk.',
    '.kMmmmmmmmmmmMk.',
    '.kkkkkkkkkkkkkk.',
    '..kyyyyyyyyyyk..',
    '...kkkkkkkkkk...',
    '................',
    '................'],
};
for (const k in ICG_SRC) { ICF[k] = fromRows(ICG_SRC[k].map(r => r.padEnd(16, '.').slice(0, 16)), ICFP); ICF_HD[k] = epxImg(ICF[k]); }

// ---- Selera hadiah (baris *Hadiah* di kartu NPC 01/02a/02b/04/05) ----
/** suka / benci = kunci barang (FD.ITEMS, resep, herba). Barang lain = biasa. */
const NPC_TASTE = {
  harjo: { suka: ['kopiTubruk', 'rotiManis'], benci: ['gorengan'] }, ratna: { suka: ['rotiManis', 'bunga'], benci: ['buku'] },
  darmi: { suka: ['sirih', 'cengkeh'], benci: ['kopiSusu'] }, dimas: { suka: ['rotiManis', 'buku'], benci: ['sayur'] },
  endang: { suka: ['tehMelati', 'rotiManis', 'kain'], benci: ['bijiKopi'] }, bowo: { suka: ['kopiTubruk', 'gorengan'], benci: ['kopiSusu', 'rotiManis'] },
  sinta: { suka: ['buku', 'bunga'], benci: ['gorengan'] }, slamet: { suka: ['serai', 'kopiTubruk'], benci: [] },
  tari: { suka: ['mint', 'kopiSusu'], benci: [] }, ilham: { suka: ['kartuPos', 'rotiManis', 'roti'], benci: [] },
  wiryo: { suka: ['tehMelati', 'rotiManis', 'buku'], benci: [] }, doni: { suka: ['esTeh', 'buah', 'serai'], benci: ['rotiManis'] },
  sri: { suka: ['tehMelati', 'rotiManis'], benci: [] },
  adji: { suka: ['rotiManis', 'kopiSusu', 'mint'], benci: ['bijiKopi', 'kain'] }, arya: { suka: ['kopiTubruk', 'buku', 'roti'], benci: ['bunga', 'rotiManis'] },
  raka: { suka: ['gorengan', 'wedang', 'rotiManis'], benci: ['tehMelati', 'bunga'] }, galih: { suka: ['tehMelati', 'buku', 'bunga'], benci: ['kopiSusu', 'kopiTubruk', 'gorengan'] },
  sekar: { suka: ['tehMelati', 'bunga', 'buku'], benci: ['gorengan'] }, nadia: { suka: ['bijiKopi', 'rotiManis', 'mint'], benci: [] },
  laras: { suka: ['rotiManis', 'bunga', 'kartuPos'], benci: [] }, wulan: { suka: ['wedang', 'rotiManis', 'serai'], benci: ['kopiTubruk'] },
  putri: { suka: ['rotiManis', 'buku'], benci: ['kopiTubruk'] }, yoga: { suka: ['kopiSusu', 'buku'], benci: [] }, rina: { suka: ['tehMelati', 'serai'], benci: [] },
  fajar: { suka: ['rotiManis', 'roti', 'buku'], benci: ['kopiTubruk'] }, dewi: { suka: ['buku', 'tehMelati'], benci: [] }, udin: { suka: ['tehMelati', 'buah'], benci: [] },
  siti: { suka: ['wedang'], benci: ['bunga'] }, hana: { suka: ['buku', 'mint'], benci: [] }, bima: { suka: ['kopiSusu'], benci: [] },
  hendra: { suka: ['kopiTubruk', 'rotiManis'], benci: [] },
};

// ---- State tersimpan ----
/** S.rel: h[id] Hubungan · ev[id] jumlah event selesai (0–5) · bad[id] respons buruk berturut-turut · reng[id] hari akhir Renggang ·
 *  pacar (id atau null) · gift[id] hari terakhir diberi hadiah · seen[id] {kunci barang: 'suka'|'biasa'|'benci'} · janji {id, n, day, at, place} · hd[id] hari ngobrol +2. */
function relSt() { if (!S.rel) S.rel = { h: {}, ev: {}, bad: {}, reng: {}, pacar: null, gift: {}, seen: {}, janji: null, hd: {}, later: {}, evDay: {} }; return S.rel; }
const isRomance = id => romanceIds().includes(id);
const relOf = id => relSt().h[id] || 0;
const relEv = id => relSt().ev[id] || 0;
const isRenggang = id => (relSt().reng[id] || 0) >= S.day;
const isPacar = id => relSt().pacar === id;
/** Status singkat untuk Buku Kenalan. */
function relStatus(id) {
  { const ns = nikahStatus(id); if (ns) return ns; } // [3a-5] Tunangan / Menikah
  if (isPacar(id)) return ['Pacaran', '#c0407a'];
  if (isRenggang(id)) return ['Renggang · ' + (relSt().reng[id] - S.day + 1) + ' hari lagi', '#a8700a'];
  return ['Teman', MGC.ink];
}
/** Reaksi selera satu NPC ke satu barang. */
function tasteOf(id, k) { const T = NPC_TASTE[id]; if (!T) return 'biasa'; return T.suka.includes(k) ? 'suka' : T.benci.includes(k) ? 'benci' : 'biasa'; }
const giftedToday = id => relSt().gift[id] === S.day;
const canGift = id => !!NPC_TASTE[id] && npcMet(id);

// ---- Isi Tas yang bisa dikasih ----
/** Daftar barang di Tas: [{k, kind:'bahan'|'bekal'|'herba', n}]. Botol (minyak, mayo) tidak dihitung hadiah. */
function giftList() {
  const F = S.food, out = [];
  Object.keys(FD.ITEMS).forEach(k => { if (F.bag[k] && !isBottle(k) && !nikahNoGift(k) /* [3a-5] */) out.push({ k, kind: 'bahan', n: F.bag[k] }); });
  Object.keys(FD.RECIPES).forEach(k => { if (F.bekal[k]) out.push({ k, kind: 'bekal', n: F.bekal[k] }); });
  HERB_KEYS.forEach(k => { if (S.herbs && S.herbs[k] > 0) out.push({ k, kind: 'herba', n: S.herbs[k] }); });
  return out;
}
const giftName = e => e.kind === 'herba' ? herbName(e.k) : foodName(e.k);
function giftTile(e, X, Y, W, H, sel, id) {
  hInset(X, Y, W, H, sel ? '#ffe7a0' : null); if (sel) hSel(X, Y, W, H);
  if (e.kind === 'herba') hImg(herbImg(e.k), X + W / 2 - 8, Y + 3); else hFood(e.k, X + W / 2 - 8, Y + 3);
  HT('×' + e.n, X + W / 2, Y + H - 11, MGC.ink, { align: 'c', bold: true }); if (id) clickable(X, Y, W, H, () => {}, id);
}
/** Hati kecil (♥ di font piksel) + bar Hubungan dengan garis ambang E1–E5. */
function relBar(id, X, Y, W) {
  const h = relOf(id), R = CFG.REL;
  HT('♥', X, Y, '#c8467a', { bold: true }); HT('' + h, X + 9, Y, MGC.ink, { bold: true });
  const bx = X + 28, bw = W - 28; hBar(bx, Y + 1, bw, 6, h / 100, '#e0609a');
  R.EV.forEach((v, i) => { const x = bx + bw * v / 100; hR(x, Y, 1, 8, 'rgba(60,30,10,.55)'); if (i < relEv(id)) hR(x - 1, Y + 8, 3, 2, '#c8467a'); });
}

// ---- Panel Beri Hadiah (G di dekat NPC) ----
function openGift(id) {
  const list = () => giftList(), cur = ov => list()[Math.min(ov.sel, list().length - 1)];
  const romance = isRomance(id), cols = 9, cw = 32, ch = 36, g = 3.5;
  const rows = Math.max(1, Math.ceil(list().length / cols));
  foodPanel({ title: 'Beri Hadiah', w: 360, h: (romance ? 180 : 178) + (rows - 1) * (ch + 3),
    nav(ov) { const n = list().length || 1; if (hit('left')) ov.sel = (ov.sel + n - 1) % n; if (hit('right')) ov.sel = (ov.sel + 1) % n;
      if (hit('up')) ov.sel = Math.max(0, ov.sel - cols); if (hit('down')) ov.sel = Math.min(n - 1, ov.sel + cols); },
    cell(ov, i) { ov.sel = +i; },
    draw(ov, X, Y, W, H) {
      const L = list(), c = cur(ov), px = X + 14, py = Y + 42;
      hInset(px, py, 40, 38, '#ead2a4'); hBust(id, px + 2, py + 4, 1.5, 'happy');
      HT(npcName(id), px + 48, py + 2, MGC.ink, { bold: true }); const cw2 = tierChip(trustOf(id), px + 48, py + 13); HT('Trust ' + trustOf(id), px + 48 + cw2 + 6, py + 15, MGC.ink, { bold: true });
      if (romance) relBar(id, px + 48, py + 28, 150);
      HT(giftedToday(id) ? 'Sudah kamu kasih hadiah hari ini.' : 'Sekali sehari per orang.', X + W - 14, py + 2, giftedToday(id) ? '#a8700a' : MGC.ink2, { align: 'r' });
      const gy = py + (romance ? 46 : 44);
      if (!L.length) { HT('Tasmu kosong. Beli bungkusan di Toko Roti, Kedai,', px, gy + 6, MGC.ink2); HT('Angkringan, Warung, atau bawa herba dari kebun.', px, gy + 17, MGC.ink2); }
      L.forEach((e, i) => giftTile(e, px + (i % cols) * (cw + g), gy + Math.floor(i / cols) * (ch + 3), cw, ch, !!c && c.k === e.k && c.kind === e.kind, 'fc' + i));
      hDivider(X + 14, Y + H - 48, W - 28);
      if (c) { const seen = (relSt().seen[id] || {})[c.k], t = seen ? { suka: 'suka ini', biasa: 'biasa saja', benci: 'tidak suka ini' }[seen] : null;
        HT(giftName(c) + ' ×' + c.n, X + 14, Y + H - 43, MGC.ink, { bold: true });
        HT(t ? npcName(id) + ' ' + t : 'Selera ' + npcName(id) + ' soal ini belum ketahuan.', X + W - 14, Y + H - 43, seen === 'suka' ? '#2e7a34' : seen === 'benci' ? MGC.red : MGC.ink2, { align: 'r', bold: !!t }); }
    },
    buttons(ov) { const c = cur(ov);
      return [{ label: 'Kasih', w: 64, off: !c || giftedToday(id), offMsg: !c ? 'Tasmu kosong.' : 'Sudah dikasih hadiah hari ini.', fn: () => giveGift(id, c) },
        { label: 'Batal', w: 64, fn: () => {} }]; } });
}
/** Kasih satu barang: barang keluar dari Tas, reaksi NPC (10-hadiah.md), Trust & Hubungan (CFG.REL.GIFT), selera terungkap di Buku Kenalan. */
function giveGift(id, e) {
  const R = relSt(), F = S.food, r = tasteOf(id, e.k), [tg, hg] = CFG.REL.GIFT[r];
  if (e.kind === 'herba') S.herbs[e.k]--;
  else { const B = e.kind === 'bekal' ? F.bekal : F.bag; B[e.k]--; if (!B[e.k]) delete B[e.k]; }
  R.gift[id] = S.day; (R.seen[id] = R.seen[id] || {})[e.k] = r; npcSt().met[id] = true;
  const L = (NPC_GIFT_LINES[id] || {})[r] || [{ suka: 'Wah, makasih banyak, Dok!', biasa: 'Oh, makasih, Dok.', benci: 'Eh… makasih, Dok.' }[r]];
  const sg = d => (d > 0 ? '+' : '') + d;
  dialog([fillVars(pickA(L))], { npc: id, onDone: () => {
    const d = addTrust(id, tg), h = isRomance(id) ? addRel(id, hg) : null;
    toast(npcName(id) + ' ' + { suka: 'suka', biasa: 'biasa saja', benci: 'kurang suka' }[r] + ' · Trust ' + sg(d) + (h != null ? ' · ♥ ' + sg(h) : ''), r === 'benci' ? 'bad' : 'good');
    sfx(r === 'benci' ? 'ui_tick' : 'rep_up'); } });
}
// ---- Panel Beli Bungkus ----
function giftShopBlock(s) { const G = GIFT_SHOPS[s], h = S.time / 60; return G.open != null && (h < G.open || h >= G.close) ? 'Buka ' + G.open + '-' + G.close : null; }
function openGiftShop(s) {
  const G = GIFT_SHOPS[s], items = G.items, cur = ov => items[ov.sel];
  foodPanel({ title: 'Beli Bungkus', w: 300, h: 168,
    nav(ov) { const n = items.length; if (hit('left')) ov.sel = (ov.sel + n - 1) % n; if (hit('right')) ov.sel = (ov.sel + 1) % n; },
    cell(ov, i) { ov.sel = +i; },
    draw(ov, X, Y, W, H) {
      const k = cur(ov); HT(G.name + ' · untuk dibawa atau dijadikan hadiah', X + 14, Y + 40, MGC.ink2);
      const tw = 80, tg = 6, t0 = X + (W - items.length * tw - (items.length - 1) * tg) / 2;
      items.forEach((it, i) => { const tx = t0 + i * (tw + tg), ty = Y + 54, on = it === k;
        hInset(tx, ty, tw, 44, on ? '#ffe7a0' : null); if (on) hSel(tx, ty, tw, 44); hFood(it, tx + tw / 2 - 8, ty + 3);
        HT(FD.ITEMS[it][0], tx + tw / 2, ty + 22, MGC.ink, { align: 'c', bold: true }); HT(rupiah(FD.ITEMS[it][1]), tx + tw / 2, ty + 32, MGC.ink2, { align: 'c' }); clickable(tx, ty, tw, 44, () => {}, 'fc' + i); });
      hDivider(X + 14, Y + H - 48, W - 28);
      HT('Di Tas: ' + (S.food.bag[k] || 0) + ' · isi Tas ' + foodSlots(S.food.bag) + '/' + FD.BAG_MAX, X + 14, Y + H - 43, MGC.ink, { bold: true });
      HT('Uangmu ' + rupiah(S.money), X + W - 14, Y + H - 43, S.money >= FD.ITEMS[k][1] ? MGC.ink2 : MGC.red, { align: 'r' });
    },
    buttons(ov) { const k = cur(ov), why = giftShopBlock(s) || (S.money < FD.ITEMS[k][1] ? 'Uang kurang' : foodSlots(S.food.bag) + 1 > FD.BAG_MAX ? 'Tas penuh' : null);
      return [{ label: 'Beli 1', w: 64, keep: true, off: !!why, offMsg: why, fn: () => { S.money -= FD.ITEMS[k][1]; S.food.bag[k] = (S.food.bag[k] || 0) + 1; sfx('coin'); toast('+1 ' + FD.ITEMS[k][0] + ' masuk Tas', 'good'); } },
        { label: 'Tutup', w: 64, fn: () => {} }]; } });
}
/** Etalase Ci Lina di Bahari Medika (E di depan etalase kanan bawah). */
const LINA_CASE = [214, 118];
function giftShopAction(w) {
  if (w.key !== 'bahari2') return null; const f = entFront(w, LINA_CASE); if (!f || !inRect(S.px, S.py, f)) return null;
  return { label: 'Etalase Ci Lina · Oleh-oleh', fn: () => openGiftShop('lina') };
}

// ---- Penanda ♥ & janji event ----
Object.assign(NPC_PLACE, { 'niaga.janji': { name: 'Jalan Niaga', zone: 'niaga', pt: [380, 214], r: 6, at: 'niaga.janji' } }); // Raka E1
const evOf = (id, n) => (NPC_EVENTS[id] || []).find(e => e.n === n);
/** Batas Hubungan: tertahan di ambang event berikutnya yang belum ditonton (100 setelah E5). */
const relCap = id => relEv(id) < 5 ? CFG.REL.EV[relEv(id)] : 100;
/** Tambah Hubungan (hanya kandidat). Naik tidak jalan saat Renggang dan tertahan di relCap. Mengembalikan perubahan nyata. */
function addRel(id, n) {
  if (!isRomance(id) || (n > 0 && isRenggang(id))) return 0;
  const R = relSt(), b = relOf(id); R.h[id] = clamp(b + n, 0, n > 0 ? Math.max(b, relCap(id)) : 100); return R.h[id] - b;
}
/** Ngobrol: +2 Hubungan sekali sehari. */
function relTalk(id) { const R = relSt(); if (!isRomance(id) || R.hd[id] === S.day) return 0; R.hd[id] = S.day; return addRel(id, CFG.REL.TALK); }
/** Kondisi baris 07b: H20/H50/H70 (Hubungan), pacaran, renggang. Baris nikah tetap mati sampai 3a-5. */
function relLineOk(id, c) {
  if (c.h != null && !(isRomance(id) && relOf(id) >= c.h)) return false;
  if (c.pacaran && !isPacar(id)) return false;
  if (c.renggang && !isRenggang(id)) return false;
  if (!nikahLineOk(id, c)) return false; // [3a-5] baris nikah
  return true;
}
const dayWd = d => (d - 1) % 7;
/** Hari janji: hari ini kalau masih ≥1 jam sebelum jam event, kalau tidak hari berikutnya yang cocok syarat hari. */
function janjiDay(e) {
  const ok = d => !e.c.hari || e.c.hari.includes(dayWd(d));
  if (S.time <= e.jam * 60 - 60 && ok(S.day)) return S.day;
  for (let d = S.day + 1; d <= S.day + 7; d++) if (ok(d)) return d;
  return null;
}
/** Event berikut siap diajak (♥): kandidat, sudah kenal, tidak Renggang, Hubungan sampai ambang, syarat kartu, satu event per hari. */
function relReady(id) {
  if (!isRomance(id) || !npcMet(id) || isRenggang(id) || (NPC_FROM_STAGE[id] && S.clinicStage < NPC_FROM_STAGE[id])) return false;
  const R = relSt(), n = relEv(id) + 1, e = evOf(id, n); if (!e || R.janji || relOf(id) < CFG.REL.EV[n - 1]) return false;
  if (n === 5 && R.pacar) return false; // satu pacar saja
  if (R.evDay && R.evDay[id] === S.day) return false; if (R.later && R.later[id] === S.day) return false;
  if (e.c.stres != null && !(S.stress > e.c.stres)) return false;
  if (e.c.hujan && season().key !== 'hujan') return false;
  return true;
}
/** Janji aktif. Kalau waktunya lewat tanpa didatangi: E1–E4 hilang tanpa hukuman, E5 Hubungan -10. */
function relJanji() {
  const R = relSt(), J = R.janji; if (!J) return null;
  if (S.day > J.day || (S.day === J.day && S.time >= J.at + CFG.REL.WAIT_MIN)) {
    R.janji = null;
    if (J.n === 5 || nikahNoShow(J)) { const d = addRel(J.id, J.kind ? CFG.NIKAH.NOSHOW : CFG.REL.NOSHOW_E5); // [3a-5] kencan/lamaran
      toast(npcName(J.id) + ' menunggu di ' + J.placeName + ', kamu nggak datang · ♥ ' + d, 'bad'); }
    else toast('Janji dengan ' + npcName(J.id) + ' lewat. Nanti diajak lagi.');
    return null;
  }
  return J;
}
/** [npcPlaceAt] tempat janji selama jendela tunggu (NPC berjalan ke sana dan menunggu 2 jam). */
function janjiPlace(id, t) { const J = S.rel && S.rel.janji; return J && J.id === id && J.day === S.day && t >= J.at && t < J.at + CFG.REL.WAIT_MIN ? J.place : null; }
const janjiKey = id => { const J = S.rel && S.rel.janji; return J && J.id === id ? J.day + '@' + J.at : ''; };
const janjiNow = id => { const J = relJanji(); return J && J.id === id && J.day === S.day && S.time >= J.at ? J : null; };
/** ♥ di kepala: event siap diajak, atau NPC sedang menunggu di tempat janji. */
function relMark(id) { try { return janjiNow(id) || relReady(id) ? 'love' : null; } catch (err) { return null; } }

/** [talkNpc] Dipanggil sebelum ngobrol biasa. true = sudah ditangani (event diputar atau ajakan ditawarkan). */
function relTalkFirst(id) {
  if (nikahTalk(id)) return true; // [3a-5] kencan, lamaran, hari H, keluarga, penjaga toko
  const J = janjiNow(id);
  if (J) { if (npcAtKey(id) !== (placeInfo(J.place) || {}).at) return false; if (J.kind) nikahPlay(id, J); else playEvent(id, J); return true; } // [3a-5] J.kind = kencan/lamaran
  if (!relReady(id)) return false;
  const R = relSt(), e = evOf(id, relEv(id) + 1), d = janjiDay(e); if (d == null) return false;
  const day = d === S.day ? 'hari ini' : d === S.day + 1 ? 'besok' : dayLabelM(d);
  dialog([fillVars(e.ajak)], { npc: id, choices: [
    { label: 'Boleh, aku datang', fn: () => { const pn = (placeInfo(e.at) || {}).name || e.place;
      R.janji = { id, n: e.n, day: d, at: e.jam * 60, place: e.at, placeName: pn.replace(/ · .*$/, '') };
      toast('Janji: ' + npcName(id) + ' · ' + day + ' ' + hhmm(e.jam) + ' · ' + R.janji.placeName, 'good'); } },
    { label: 'Lain kali, ya', fn: () => { (R.later = R.later || {})[id] = S.day; } }] });
  return true;
}
/** Urutan halaman event → potongan dialog per pembicara (kandidat, NPC lain, atau pemain 'me'). */
function evSegs(id, P) {
  const segs = []; P.forEach(pg => { const who = pg.who || id, last = segs[segs.length - 1], page = pg.act ? { act: fillVars(pg.act) } : fillVars(pg.s);
    if (last && last.who === who) last.pages.push(page); else segs.push({ who, pages: [page] }); });
  return segs;
}
function runSegs(segs, done) {
  const run = i => { if (i >= segs.length) return done(); const s = segs[i];
    dialog(s.pages, Object.assign(s.who === 'me' ? { speaker: S.name } : { npc: s.who }, { onDone: () => run(i + 1) })); };
  run(0);
}
/** Putar satu event: kartu judul → narasi & dialog → 3 pilihan acak → reaksi → Hubungan, Renggang, Pacaran, waktu +30 menit. */
function playEvent(id, J) {
  const R = relSt(), e = evOf(id, J.n); R.janji = null; (R.evDay = R.evDay || {})[id] = S.day; npcSt().met[id] = true;
  const order = shuffle([0, 1, 2]);
  eventCard(id, e.n, e.title, e.place, () => runSegs(evSegs(id, e.p), () =>
    eventChoice(id, e.ask, order.map(i => e.o[i].label), k => { const o = e.o[order[k]]; runSegs(evSegs(id, o.r), () => finishEvent(id, e, o.v)); })));
}
function finishEvent(id, e, v) {
  const R = relSt(), tier = v > CFG.REL.RESP[1] ? 0 : v > 0 ? 1 : 2, bad = tier === 2;
  R.bad[id] = bad ? (R.bad[id] || 0) + 1 : 0;
  if (!(e.n === 5 && bad)) R.ev[id] = e.n; // E5 gagal: belum pacaran, muncul lagi di ambang 85
  const d = addRel(id, CFG.REL.RESP[tier]); spendTime(CFG.REL.EV_MIN); relToast(id, d);
  if (e.n === 5 && !bad) { R.pacar = id; toast('Kamu dan ' + npcName(id) + ' resmi pacaran ♥', 'good'); sfx('rep_up'); }
  if (R.bad[id] >= CFG.REL.RENGGANG_N) { R.bad[id] = 0; R.reng[id] = S.day + CFG.REL.RENGGANG_DAYS - 1; toast(npcName(id) + ' lagi renggang denganmu · ' + CFG.REL.RENGGANG_DAYS + ' hari', 'bad'); }
}

/** Chip janji di HUD (di bawah chip Fokus bila ada). Hari lain ditulis "Besok"/tanggal. Sekalian mengecek janji yang lewat. */
function drawJanjiChip() {
  if (!S.rel) return; const J = relJanji(); if (!J) return;
  const day = J.day === S.day ? '' : J.day === S.day + 1 ? 'Besok ' : dayLabel(J.day) + ' ';
  const t = '♥ ' + npcName(J.id) + ' · ' + day + hhmm(J.at / 60) + ' · ' + J.placeName, w = hW(t, true) + 14, X = 480 - 4 - w, Y = fokusOn() ? 74 : 57;
  hBox(X, Y, w, 15, 'paper', { thin: true }); HT(t, X + 7, Y + 4, '#a0285a', { bold: true });
}
// ---- Kartu judul & panel pilihan event ----
/** Kartu judul event: layar gelap, nama NPC + nomor event, judul besar, tempat. Klik/E untuk lanjut. */
function eventCard(id, n, title, place, after) {
  openOverlay({ kind: 'card', t: 0,
    update() { this.t++; if ((okHit() || input.click || hit('esc')) && this.t > 20) closeOverlay(after); },
    drawHD() {
      const p = ovProg(this); hc.save(); hc.globalAlpha = p; hR(0, 0, 480, 270, 'rgba(14,8,10,.94)');
      HT('♥  ' + npcName(id) + ' · Event ' + n + ' dari 5', 240, 96, '#f0a0c0', { align: 'c', bold: true });
      HT(title, 240, 112, '#fff2d4', { k: 4, align: 'c', sh: '#5a1a30' });
      HT(place, 240, 146, '#e8c8a8', { align: 'c' });
      [0, 1, 2, 3, 4].forEach(i => hR(214 + i * 11, 162, 7, 7, i < n ? '#e0609a' : 'rgba(240,160,192,.25)'));
      if (this.t > 20 && Math.floor(game.t * 2) % 2) HT('E / klik: lanjut', 240, 190, '#c4a88c', { align: 'c' });
      hc.restore(); } });
}
/** Panel pilihan event: pertanyaan + 3 jawaban (dibungkus, maks 3 baris). ↑↓ pilih, E/klik jawab. Tidak bisa Esc. */
function eventChoice(id, ask, opts, pick) {
  openOverlay({ kind: 'panel', t: 0, sel: 0,
    update() { this.t++; const n = opts.length;
      if (hit('up')) this.sel = (this.sel + n - 1) % n; if (hit('down')) this.sel = (this.sel + 1) % n;
      if (input.click) { const h = topHit(input.click, /^evc/); if (h) { this.sel = +h.id.slice(3); return closeOverlay(() => pick(this.sel)); } }
      if (okHit() && this.t > 2) closeOverlay(() => pick(this.sel)); },
    drawHD() {
      const W = 396, X = 240 - W / 2, TW = W - 40, ls = opts.map(o => hWrap(o, TW).slice(0, 3)), hs = ls.map(l => l.length * 11 + 9);
      const H = 52 + hs.reduce((a, b) => a + b + 4, 0) + 8, Y = Math.round((270 - H) / 2) - 6; hDim(this, .45);
      dropIn(this, X, Y, W, H, () => {
        hBox(X, Y, W, H, 'paper', { ornate: true }); hInset(X + 12, Y + 9, 30, 28, '#ead2a4'); hBust(id, X + 13, Y + 12, 1.1, 'happy');
        HT(npcName(id), X + 50, Y + 11, MGC.ink, { bold: true }); HT(fitText(ask, W - 64), X + 50, Y + 23, MGC.ink2);
        hDivider(X + 14, Y + 42, W - 28); const hv = hoverId(); let y = Y + 50;
        ls.forEach((l, i) => { if (hv === 'evc' + i) this.sel = i; const s = i === this.sel, h = hs[i];
          hBox(X + 12, y, W - 24, h, s ? 'gold' : 'paper', { thin: true, shadow: false }); if (s) hGlow(X + 12, y, W - 24, h);
          HT(s ? '▶' : '·', X + 20, y + 5, s ? MGC.red : MGC.ink2, { bold: true });
          l.forEach((t, j) => HT(t, X + 30, y + 5 + j * 11, s ? MGC.ink : '#5a3a1a', { bold: s })); clickable(X + 12, y, W - 24, h, () => {}, 'evc' + i); y += h + 4; });
      }); } });
}
/** Hasil satu jawaban event: toast Hubungan (warna sesuai). */
function relToast(id, d) { toast('♥ Hubungan ' + npcName(id) + ' ' + (d > 0 ? '+' : '') + d, d < 0 ? 'bad' : 'good'); }
/** Baris Suka / Tdk suka di Buku Kenalan: yang sudah ketahuan ditulis, sisanya "?". [suka, benci, masihAdaRahasia]. */
function tasteRows(id) {
  const T = NPC_TASTE[id], seen = relSt().seen[id] || {}; if (!T) return ['-', '-', false];
  const nm = k => HERB_KEYS.includes(k) ? herbName(k) : foodName(k), f = L => L.map(k => seen[k] ? nm(k) : '?');
  const su = f(T.suka), be = f(T.benci);
  return [su.join(', ') || '-', be.join(', ') || '-', su.includes('?') || be.includes('?')];
}
