/* [3a-3] Nongkrong (GDD §12). Tekan E di titik nongkrong → panel kecil HD (biaya, lama, efek, tombol Nongkrong/Batal).
   Setelah dipilih: layar memudar singkat, jam maju, efek tampil sebagai toast. Tiap tempat sekali per hari.
   Disisipkan oleh tools/build-game.cjs setelah src/trust3a.js (di dalam IIFE game). Angka di CFG.HANG (tag [3a]). */
CFG.HANG = { // [3a]
  FOKUS_ZONE: 1.10,     // GDD §12: buff Fokus = zona target minigame +10%, berlaku seharian besok
  VOLI_MIN_ENERGY: 10,  // keputusan 3a-3: voli tidak bisa dimulai kalau energi kurang dari 10
  // kunci: name, place (kunci NPC_PLACE/ruangan untuk "yang hadir"), cost (rupiah), open/close (jam), dur (menit), sat (hanya Sabtu),
  // verb (tombol), prompt (teks E), stress/energy (perubahan), trust (ke NPC yang hadir), fokus (buff besok), say (baris rasa di panel)
  PLACES: {
    kedai: { verb: 'Nongkrong', prompt: 'Nongkrong · Kedai Kopi Seduh', name: 'Kedai Kopi Seduh', place: 'kedai', cost: 30000, open: 15, close: 22, dur: 60, stress: -15, fokus: true,
      say: 'Ngopi santai sambil lihat orang lewat.' },
    angkringan: { verb: 'Nongkrong', prompt: 'Nongkrong · Angkringan', name: 'Angkringan', place: 'alun.angkringan', cost: 25000, open: 18, close: 24, dur: 60, energy: 15, trust: 2,
      say: 'Nasi kucing, wedang jahe, ngobrol ngalor-ngidul.' },
    voli: { verb: 'Bermain Voli', prompt: 'Bermain Voli · Lapangan Voli', name: 'Lapangan Voli', place: 'lereng.voli', cost: 0, open: 16, close: 18, dur: 60, stress: -20, energy: -10,
      say: 'Ikut main voli sore bareng anak-anak.' },
    bukit: { verb: 'Melihat Bintang', prompt: 'Melihat Bintang · Bukit Bintang', name: 'Bukit Bintang', place: 'lereng.bukit', cost: 0, open: 20, close: 24, dur: 60, stress: -25,
      say: 'Duduk di bangku, lihat bintang sama lampu kota.' },
    perpus: { verb: 'Membaca', prompt: 'Membaca · Perpustakaan', name: 'Perpustakaan', place: 'perpus', cost: 0, open: 9, close: 19, dur: 60, stress: -10,
      say: 'Baca buku di pojok yang tenang.' },
    karaoke: { verb: 'Karaoke', prompt: 'Karaoke Malam Minggu', name: 'Karaoke Malam Minggu', place: 'alun.angkringan', cost: 0, open: 19, close: 23, dur: 120, sat: true, stress: -30, trust: 3,
      say: 'Pak Slamet pegang mik. Fals juga nggak apa-apa.' },
    roti: { verb: 'Nongkrong', prompt: 'Nongkrong · Toko Roti Manis', name: 'Toko Roti Manis', place: 'roti', cost: 20000, open: 7, close: 17, dur: 60, energy: 10,
      say: 'Roti hangat, dimakan di meja dekat jendela.' },
  },
};

// ---- Titik nongkrong (tekan E) ----
/** Zona: kotak di dunia [x, y, w, h]. Ruangan: posisi entitas meja/etalase (depan benda, lihat entFront). */
const HANG_ZONE = {
  alun: [{ k: 'angkringan', r: [694, 386, 50, 22] }],
  lereng: [{ k: 'voli', r: [128, 292, 132, 88] },
    { k: 'bukit', r: [372, 64, 36, 16] }, { k: 'bukit', r: [532, 64, 36, 16] }, { k: 'bukit', r: [382, 98, 36, 16] }, { k: 'bukit', r: [522, 98, 36, 16] }],
};
const HANG_ROOM = { kedai: { k: 'kedai', ents: [[24, 106], [70, 136], [200, 128]] }, perpus: { k: 'perpus', ents: [[28, 114], [182, 114]] }, roti: { k: 'roti', ents: [[84, 84]] } };

// ---- State tersimpan ----
/** S.hang: day[k] = hari terakhir nongkrong di tempat k; kinds[k] = berapa kali (untuk challenge #10 "Tiga jenis nongkrong"). S.fokusDay = hari buff Fokus aktif. */
function hangSt() { if (!S.hang) S.hang = { day: {}, kinds: {} }; return S.hang; }
const fokusOn = () => S.fokusDay === S.day;
/** Pengali zona target minigame dari buff Fokus (dipakai di startProc). */
const fokusMul = () => fokusOn() ? CFG.HANG.FOKUS_ZONE : 1;

/** NPC yang sudah dikenal dan sudah TIBA di tempat (bukan masih di jalan). */
function hangHadir(place) {
  const out = [];
  for (const id of NPC_ROSTER) { if (!npcMet(id)) continue; try { const n = npcNow(id); if (n.cur === place && S.time - n.t0 >= travelOf(id, n)) out.push(id); } catch (e) { /* NPC rusak: lewati */ } }
  return out;
}
/** Alasan tombol mati, atau null kalau bisa nongkrong sekarang. */
function hangBlock(k) {
  const P = CFG.HANG.PLACES[k], h = S.time / 60;
  if (P.sat && wdIdx() !== 5) return 'Hanya Sabtu ' + P.open + '-' + P.close;
  if (hangSt().day[k] === S.day) return 'Sudah hari ini';
  if (h < P.open || S.time + P.dur > P.close * 60) return 'Buka ' + P.open + '-' + P.close;
  if (P.cost && S.money < P.cost) return 'Uang kurang';
  if (k === 'voli' && S.energy < CFG.HANG.VOLI_MIN_ENERGY) return 'Energi kurang';
  return null;
}
/** Teks efek satu tempat, mis. "Stres -15 · Energi +15 · besok Fokus". */
function hangFx(P, short) {
  const a = [];
  if (P.stress) a.push('Stres ' + (P.stress > 0 ? '+' : '-') + Math.abs(P.stress));
  if (P.energy) a.push('Energi ' + (P.energy > 0 ? '+' : '-') + Math.abs(P.energy));
  if (P.trust) a.push('Trust +' + P.trust + (short ? '' : ' ke yang hadir'));
  if (P.fokus) a.push(short ? 'Fokus besok' : 'besok Fokus (zona target +10%)');
  return a.join(' · ');
}
const hangCostTxt = P => (P.cost ? rupiah(P.cost) : 'Gratis') + ' · ' + (P.dur / 60) + ' jam';

/** Aksi E untuk currentAction (zona & ruangan). */
function hangAction(w) {
  let k = null;
  if (w.type === 'zone') { const s = (HANG_ZONE[w.id] || []).find(s => inRect(S.px, S.py, s.r)); if (s) k = s.k; }
  else { const R = HANG_ROOM[w.key]; if (R && R.ents.some(p => { const f = entFront(w, p); return f && inRect(S.px, S.py, f); })) k = R.k; }
  if (!k) return null;
  return { label: CFG.HANG.PLACES[k].prompt, fn: () => openHang(k) };
}

/** [3b-1] Di petak depan gerobak Angkringan, E selalu membuka panel nongkrong (NPC yang berkerumun di sana tidak merebut tombol E). */
function hangFirst(w) { return w.type === 'zone' && (HANG_ZONE[w.id] || []).some(s => s.k === 'angkringan' && inRect(S.px, S.py, s.r)); }

/** Panel nongkrong. Angkringan pada Sabtu malam juga menawarkan Karaoke Malam Minggu. */
function openHang(k) {
  const P = CFG.HANG.PLACES[k], kar = k === 'angkringan' && wdIdx() === 5 ? CFG.HANG.PLACES.karaoke : null;
  const hadir = P.trust ? hangHadir(P.place) : null;
  const rows = () => {
    const r = [[P.say, MGC.ink, true], [hangCostTxt(P) + ' · buka ' + P.open + '-' + P.close + ' · sekali sehari', MGC.ink2], ['Efek: ' + hangFx(P), MGC.ink]];
    if (hadir) r.push([hadir.length ? 'Yang hadir: ' + hadir.slice(0, 3).map(npcName).join(', ') + (hadir.length > 3 ? ' +' + (hadir.length - 3) + ' lagi' : '')
      : 'Belum ada kenalan di sini.', MGC.ink2]);
    if (kar) r.push([kar.name, MGC.ink, true], [hangCostTxt(kar) + ' · buka ' + kar.open + '-' + kar.close + ' · sekali sehari', MGC.ink2], ['Efek: ' + hangFx(kar), MGC.ink]);
    return r;
  };
  const btn = (kk, label) => { const why = hangBlock(kk); return { label: why || label, off: !!why, offMsg: why, fn: () => doHang(kk) }; };
  openPanel({ title: P.name, w: 320, rows,
    buttons: () => [btn(k, P.verb)].concat(kar ? [btn('karaoke', kar.verb)] : [], GIFT_SHOPS[k] ? [{ label: 'Beli Bungkus', fn: () => openGiftShop(k) }] : [] /* [3a-4] */, [{ label: 'Batal', fn: () => {} }]) });
}

/** Jalankan nongkrong: layar memudar, jam maju, efek masuk, toast. */
function doHang(k) {
  const P = CFG.HANG.PLACES[k]; if (hangBlock(k)) return;
  const St = hangSt(); St.day[k] = S.day; St.kinds[k] = (St.kinds[k] || 0) + 1; S.money -= P.cost || 0;
  sfx(P.cost ? 'coin' : 'ui_tick');
  fadeTo(() => {
    const hadir = P.trust ? hangHadir(P.place) : [];
    jrEv('hang', k); if (k === 'karaoke') jrEv('karaoke', hadir); /* [3b-1] #10/#18 */
    spendTime(P.dur); if (game.overlay) return;
    if (P.stress) addStress(P.stress);
    if (P.energy) { if (P.energy > 0) S.energy = Math.min(energyMax(), S.energy + P.energy); else addEnergy(P.energy); }
    if (P.fokus) S.fokusDay = S.day + 1;
    const fx = hangFx(P, true); if (fx) toast(P.name + ' · ' + fx.replace(/ · Trust \+\d+/, ''), 'good');
    if (P.trust) {
      const got = hadir.filter(id => trustOnce(id, 'nongkrong', P.trust) > 0);
      if (got.length) toast('Trust +' + P.trust + ' · ' + got.slice(0, 3).map(npcName).join(', ') + (got.length > 3 ? ' +' + (got.length - 3) : ''), 'good');
    }
  });
}
/** Jenis nongkrong yang pernah dilakukan (challenge #10 "Tiga jenis nongkrong", menunggu Jurnal). */
const hangKinds = () => Object.keys(hangSt().kinds).length;

/** Chip "Fokus" di HUD, di bawah kotak uang/energi/stres (lapisan HD). */
function drawFokusChip() {
  if (!fokusOn()) return;
  const w = 46, X = 480 - 4 - w, Y = 57;
  hBox(X, Y, w, 15, 'gold', { thin: true }); HT('Fokus', X + w / 2, Y + 4, MGC.ink, { align: 'c', bold: true });
}
