/* [3a-5] Kencan, lamaran, pernikahan + Toko Emas Lina & Toserba Samudra (GDD §9, §10; ACC user 2026-11-16 "ACC semua", draf UI "ACC, kerjakan").
   Kencan: pacar → "Ajak kencan" (4 tempat, janji 3a-4: chip HUD, NPC jalan ke sana & menunggu 2 jam); pacar juga mengajak sendiri (♥) setelah 3 hari tanpa kencan.
   Lamaran: pacaran, ♥ 95, Rumah Lv 3, cincin di Tas → ♥ → "Ada yang mau aku omongin" → janji di tempat khas kandidat → adegan → telepon keluarga.
   Pernikahan 7 hari kemudian 09:00 di Balai Kota (interior balaiNikah hari itu saja): klinik libur, tamu & keluarga berjalan datang, upacara, syukuran.
   Setelah menikah: pasangan tinggal di rumahmu (pagi & malam di rumah), baris 07b "nikah" aktif, bonus pasif per pasangan (CFG.NIKAH).
   Teks: design/narrative/npc/11-kencan-nikah.md → NPC_NIKAH. Seni: design/v3/src/nikah.js. Disisipkan setelah src/hubungan3a.js (di dalam IIFE game). */
CFG.NIKAH = { // [3a]
  KENCAN: { bukit: { at: 'lereng.bukit', name: 'Bukit Bintang', jam: 19, cost: 0, desc: 'Lihat bintang, kota kelihatan dari atas' },
    kedai: { at: 'kedai', name: 'Kedai Kopi Seduh', jam: 16, cost: 60000, desc: 'Ngopi berdua, Nadia yang racik' },
    angkringan: { at: 'alun.angkringan', name: 'Angkringan Alun-alun', jam: 19.5, cost: 20000, desc: 'Wedang jahe dan gorengan' },
    bunga: { at: 'lereng.bunga', name: 'Kebun Bunga', jam: 10, cost: 0, desc: 'Jalan pagi di antara bedeng bunga' } }, // usulan 3a-5 (ACC): jam & biaya berdua
  KENCAN_REL: 4, KENCAN_STRESS: -10, KENCAN_MIN: 60,   // usulan 3a-5: ♥ +4, stres -10, 1 jam bersama, sekali sehari
  ASK_DAYS: 3,                                         // pacar mengajak sendiri setelah 3 hari tanpa kencan
  NOSHOW: -10,                                         // GDD §9: janji kencan/lamaran tidak didatangi
  LAMAR_H: 95, LAMAR_HOME: 3,                          // GDD §10: syarat lamaran (pacaran, ♥ 95, Rumah Lv 3, cincin)
  WED_DAYS: 7, WED_H: 9, WED_LATE: 17, WED_END: 14,    // GDD §10: nikah 7 hari kemudian 09:00; tidak datang sampai 17:00 → besok; syukuran selesai ±14:00
  WED_STRESS: -30, WED_GUEST_IN: 8,                    // stres -30; tamu & keluarga datang mulai 08:00 (berangkat lebih awal)
  HOME_AM: 7.5, HOME_PM: 21,                           // pasangan di rumah 06:00–07:30 dan mulai 21:00
  SHOP: { emas: { open: 9, close: 16, items: ['cincin', 'kalung', 'gelang'] }, toserba: { open: 8, close: 17 } }, // jam buka Ci Lina / Mbak Yuni
  BONUS: { adjiStress: -10, aryaCost: 0.5, aryaDone: 18, aryaUtil: 0.7, rakaTrust: 1.25, galihComplic: 0.5, sekarPatience: 1.2,
    nadiaEnergy: 20, larasRep: 1.25, wulanKidPain: 0.75, wulanRefH: 10 }, // usulan 3a-5 (ACC): bonus pasif menikah; pajak Adji = CFG.OPS.TAX_RATE_ADJI
};

// ---- Barang baru (Toserba & Emas) ----
Object.assign(FD.ITEMS, Object.fromEntries(Object.entries(NIKAH_ITEMS).map(([k, v]) => [k, [v[0], v[1], v[2]]])));
Object.assign(GIFT_ITEMS, Object.fromEntries(Object.keys(NIKAH_ITEMS).map(k => [k, FD.ITEMS[k]])));
for (const k in NIKAH_ITEMS) GIFT_SHOP_OF[k] = NIKAH_ITEMS[k][4] === 'emas' ? 'emas' : 'toserba'; // tidak dijual di Warung
for (const k in ICN) { ICF[k] = ICN[k]; ICF_HD[k] = epxImg(ICN[k]); }
for (const id in NIKAH_TASTE) { const T = NPC_TASTE[id] = NPC_TASTE[id] || { suka: [], benci: [] }, N = NIKAH_TASTE[id];
  (N.suka || []).forEach(k => T.suka.includes(k) || T.suka.push(k)); (N.benci || []).forEach(k => T.benci.includes(k) || T.benci.push(k)); }

// ---- Tokoh baru: Ci Lina, Mbak Yuni (penjaga toko) & keluarga kandidat (hanya hari pernikahan) ----
for (const id in NIKAH_CAST) { const c = NIKAH_CAST[id]; CAST.push({ id, grp: 'Luar kota', name: c.name, role: c.role, s: c.s }); CH[id] = char3(c.s); NPC_ROSTER.push(id); }
Object.assign(NPC_BLURB, { lina: 'Pemilik Toko Emas Lina di Tanjung Arum, istri Koh Hendra. Hafal ukuran jari separuh kota.',
  yuni: 'Kasir Toserba Samudra di Tanjung Arum. Tahu barang apa yang lagi laku.' });
Object.assign(NPC_SCHED, { lina: [[WS, 9, 16, 'tokoEmas']], yuni: [[ALL, 8, 17, 'toserba']] });
Object.assign(NPC_ROOMNAME, { tokoEmas: 'Toko Emas Lina', toserba: 'Toserba Samudra', rumahku: 'Rumahmu' });
Object.assign(NPC_ROOMSPOT, { tokoEmas: { lina: [164, 62, 'down'] }, toserba: { yuni: [244, 114, 'down'] } });
Object.assign(NPC_HOME, { lina: { edge: ['tanjung', 762, 192] }, yuni: { edge: ['tanjung', 762, 192] }, hendra: { edge: ['tanjung', 762, 192] } }); // zona lebar 768: pulang lewat ujung kanan
/** Asal keluarga → titik datang: bus (pintu Terminal), gerbang Jalan Niaga, Lereng Bukit, atau Studio Foto. */
const FAMILY_FROM = { adji: { door: 'terminal' }, arya: { edge: ['niaga', 764, 212] }, raka: { door: 'terminal' }, galih: { door: 'terminal' },
  sekar: { door: 'terminal' }, nadia: { door: 'terminal' }, laras: { door: 'studio' }, wulan: { edge: ['lereng', 470, 30] } };
const FAM_IDS = {};
for (const id in FAMILY) FAM_IDS[id] = FAMILY[id].m.map(([name, s], i) => { const fid = 'kel_' + id + '_' + i;
  CAST.push({ id: fid, grp: 'Keluarga', name, role: 'Keluarga ' + castBy(id).name, s }); CH[fid] = char3(s); NPC_ROSTER.push(fid); NPC_HOME[fid] = FAMILY_FROM[id]; return fid; });
const isFamily = id => /^kel_/.test(id);

// ---- State ----
/** S.rel tambahan: kd[id] hari kencan terakhir · tunangan (id) · nikahDay · nikah (id pasangan) · wedDone (hari upacara) · wk {inc, n} pemasukan minggu ini · lapDue. */
const nkSt = () => { const R = relSt(); R.kd = R.kd || {}; return R; };
const spouse = () => (S.rel && S.rel.nikah) || null;
const married = id => !!S.rel && S.rel.nikah === id;
const wedToday = () => !!S.rel && S.rel.tunangan && S.rel.nikahDay === S.day;
const wedDoneToday = () => !!S.rel && S.rel.wedDone === S.day;
const bonusOn = id => spouse() === id;
const groomOf = id => ROMANCE_M.includes(id);
const kencanToday = id => nkSt().kd[id] === S.day;
const hasRing = () => (S.food && S.food.bag.cincin) > 0;
const NK = id => NPC_NIKAH[id] || null;

// ---- Kait kecil dari file lain ----
/** [relStatus] Menikah / Tunangan di Buku Kenalan. */
function nikahStatus(id) {
  if (married(id)) return ['Menikah', '#c0407a'];
  if (S.rel && S.rel.tunangan === id) { const n = S.rel.nikahDay - S.day; return ['Tunangan · ' + (n > 0 ? 'H-' + n : 'hari ini'), '#c0407a']; }
  return null;
}
/** [relLineOk] baris 07b "nikah" hanya untuk pasangan. */
const nikahLineOk = (id, c) => !c.nikah || married(id);
/** [doorOf] kunci tempat "rumahku" = pintu rumah pemain di Kampung Asri. */
function nikahDoorKey(k) { if (k !== 'rumahku') return k; const b = ZONES.kampung.blds.find(b => /^rumah/.test(b[0])); return b ? extKey(b[0]) : k; }
/** [npcSegs] kunci cache jadwal: berubah saat tunangan/menikah/hari H. */
const nikahKey = () => S.rel ? [S.rel.tunangan, S.rel.nikahDay, S.rel.nikah, S.rel.wedDone, S.homeLv].join(',') : '';
/** Tamu pernikahan: warga yang sudah kenal + tokoh yang disebut di adegan. Maks 14 kursi (4 kursi depan untuk keluarga). */
const WED_NAMED = { adji: ['ratna'], arya: ['ratna', 'raka', 'dimas'], raka: ['doni', 'arya'], galih: ['wulan', 'darmi'], sekar: ['ratna'], nadia: ['bowo'], laras: ['ilham'], wulan: ['galih'] };
function wedGuests() {
  const id = S.rel.tunangan || S.rel.nikah, named = WED_NAMED[id] || [], cand = ['harjo', 'ratna', 'darmi', 'dimas', 'endang', 'bowo', 'sinta', 'slamet', 'tari', 'ilham', 'wiryo', 'doni', 'sri', 'udin', 'siti',
    'adji', 'arya', 'raka', 'galih', 'sekar', 'nadia', 'laras', 'wulan'].filter(g => g !== id && (named.includes(g) || npcMet(g)));
  cand.sort((a, b) => (named.includes(b) - named.includes(a)) || trustOf(b) - trustOf(a)); return cand.slice(0, 14);
}
/** Kursi Balai Kota pernikahan (kaki, hadap atas). Baris depan kiri & kanan pertama untuk keluarga. */
const BALAI_SPOT0 = NPC_ROOMSPOT.balai;
const WED_SEATS = []; for (let r = 0; r < 3; r++) for (let s = 0; s < 2; s++) for (let k = 0; k < 3; k++) WED_SEATS.push([(s ? 196 : 40) + k * 22 + 6, 96 + r * 28 + 22]);
/** Pasang posisi di Balai Kota untuk hari H (dipanggil sebelum jadwal dihitung). */
function wedSpots() {
  const id = S.rel.tunangan || S.rel.nikah, fam = FAM_IDS[id] || [], G = wedGuests(), M = {};
  M[id] = [groomOf(id) ? 150 : 174, 86, 'down'];
  const order = [...fam, ...G]; order.forEach((g, i) => { const p = WED_SEATS[i]; if (p) M[g] = [p[0], p[1], 'up']; });
  NPC_ROOMSPOT.balai = M; return { fam, G };
}
/** [npcPlaceAt] hari H (tamu, keluarga, pasangan di Balai Kota) dan pasangan di rumah pagi/malam. null = jadwal biasa. */
function nikahPlace(id, t) {
  const R = S.rel; if (!R) return null;
  const h = t / 60, N = CFG.NIKAH;
  if (!(wedToday() || wedDoneToday())) NPC_ROOMSPOT.balai = BALAI_SPOT0;
  else if (wedToday() || h < N.WED_END) {
    const sp = R.tunangan || R.nikah, W = wedSpots();
    if (id === sp && !wedDoneToday() && h >= N.WED_GUEST_IN && h < N.WED_LATE) return 'balai';
    if ((W.fam.includes(id) || W.G.includes(id)) && h >= N.WED_GUEST_IN && h < N.WED_END) return 'balai';
  }
  if (isFamily(id)) return null;
  if (married(id)) { NPC_HOME[id] = { room: 'rumahku' }; if (h < N.HOME_AM || h >= N.HOME_PM) return 'rumahku'; }
  return null;
}
/** [buildRoom] Balai Kota memakai interior pernikahan hanya di hari H (sampai syukuran). */
const nikahHall = () => !!S && !!S.rel && (wedToday() || (wedDoneToday() && S.time < CFG.NIKAH.WED_END * 60));
const nikahRoomKey = k => k === 'balai' && nikahHall() ? 'balaiNikah' : k;
/** [actorImg / playerSprite] baju pengantin di hari H. */
const wearOn = () => !!S && !!S.rel && (wedToday() || wedDoneToday());
function nikahSpec(id) { const s = castBy(id).s; if (!wearOn() || id !== (S.rel.tunangan || S.rel.nikah)) return s; return (groomOf(id) ? WED.groom : WED.bride)(s); }
const nikahWear = s => wearOn() ? (S.gender === 'W' ? WED.bride : WED.groom)(s) : s;
const nikahWearKey = () => wearOn() ? 'W' : '';
/** [giftList] cincin lamaran tidak bisa dijadikan hadiah biasa. */
const nikahNoGift = k => k === 'cincin';
/** [relJanji] janji kencan/lamaran (J.kind) yang tidak didatangi juga ♥ -10. */
const nikahNoShow = J => !!J.kind;

// ---- Bonus menikah (kait di game.js / npc3a.js / trust3a.js) ----
const taxRate = () => bonusOn('adji') ? CFG.OPS.TAX_RATE_ADJI : CFG.OPS.TAX_RATE;
const nikahCostMul = () => bonusOn('arya') ? CFG.NIKAH.BONUS.aryaCost : 1;
const nikahUtilMul = () => bonusOn('arya') ? CFG.NIKAH.BONUS.aryaUtil : 1;
const nikahTrust = n => n > 0 && bonusOn('raka') ? Math.round(n * CFG.NIKAH.BONUS.rakaTrust) : n;
const nikahShield = () => bonusOn('raka');
const nikahComplicMul = () => bonusOn('galih') ? CFG.NIKAH.BONUS.galihComplic : 1;
const nikahPatienceMul = () => bonusOn('sekar') ? CFG.NIKAH.BONUS.sekarPatience : 1;
const nikahKidPain = () => bonusOn('wulan') ? CFG.NIKAH.BONUS.wulanKidPain : 1;
/** Reputasi dari tindakan ×1,25 (Laras): sisa pecahan dikumpulkan supaya poin tetap bulat. */
function nikahRep(d) {
  if (!bonusOn('laras') || d <= 0) return d; const R = nkSt(); R.repAcc = (R.repAcc || 0) + d * (CFG.NIKAH.BONUS.larasRep - 1);
  const x = Math.floor(R.repAcc); R.repAcc -= x; return d + x;
}
/** [earn] pemasukan & jumlah pasien minggu ini (laporan Adji). */
function nikahEarn(n) { if (!S.rel || n <= 0) return; const R = S.rel; R.wk = R.wk || { inc: 0, n: 0 }; R.wk.inc += n; R.wk.n++; }
/** [openRepair] Arya memperbaiki alat gratis (besok pagi). */
const nikahRepair = fix => bonusOn('arya') ? [{ label: 'Minta tolong Arya · gratis (besok pagi)', fn: fix(0, { day: S.day + 1 }) }] : [];
/** [openUpgrade / openBuild] Arya: tukang selesai jam 18 hari itu juga. */
const aryaFast = () => bonusOn('arya');

// ---- Pagi & tiap langkah waktu ----
/** [payRent] kabar pagi: hari H, pernikahan tertunda, bonus Adji/Nadia, laporan Senin. */
function nikahMorning() {
  if (!S.rel) return; const R = nkSt(), N = CFG.NIKAH, news = [];
  if (R.tunangan && R.nikahDay < S.day) { R.nikahDay = S.day; const d = addRel(R.tunangan, N.NOSHOW); news.push('Pernikahan kemarin batal karena kamu nggak datang. Diundur ke hari ini jam 09:00 · ♥ ' + d + '.'); }
  if (wedToday()) news.push('Hari ini pernikahanmu dengan ' + npcName(R.tunangan) + ', jam 09:00 di Balai Kota. Klinik libur.');
  else if (R.tunangan && R.nikahDay === S.day + 1) news.push('Besok pernikahanmu dengan ' + npcName(R.tunangan) + ', jam 09:00 di Balai Kota.');
  const sp = spouse();
  if (sp === 'adji') { addStress(N.BONUS.adjiStress); if (wdIdx() === 0 && S.day > 1) R.lapDue = true; }
  if (sp === 'nadia') S.energy += N.BONUS.nadiaEnergy;
  if (sp) news.push(npcName(sp) + ' sudah bangun duluan.' + (sp === 'adji' ? ' Stres -10.' : sp === 'nadia' ? ' Energi +20.' : ''));
  if (news.length) game.dayNews = [game.dayNews, ...news].filter(Boolean).join(' ');
}
/** [clinicTick] hari H lewat 17:00 → diundur; Arya: renovasi selesai 18:00; Wulan: satu pasien rujukan; laporan Adji setelah kartu pagi. */
function nikahTick() {
  if (!S || !S.rel) return; const R = S.rel, N = CFG.NIKAH;
  if (wedToday() && S.time >= N.WED_LATE * 60) { R.nikahDay = S.day + 1; const d = addRel(R.tunangan, N.NOSHOW);
    toast(npcName(R.tunangan) + ' menunggu di Balai Kota sampai sore. Pernikahan diundur ke besok · ♥ ' + d, 'bad'); }
  if (aryaFast() && S.time >= N.BONUS.aryaDone * 60) {
    if (S.homeBuild && S.homeBuild.day === S.day + 1) { S.homeBuild.day = S.day; const dn = game.dayNews; houseNewDay(); game.dayNews = dn; toast('Arya dan tukangnya selesai. Rumahmu sudah jadi.', 'good'); }
    const C = S.clinic; if (C && C.renovDay === S.day + 1 && !C.open) { S.clinicStage = C.renovTo || 1; C.renovDay = null; C.renovTo = null; C.clean = 100; toast('Arya mengawasi tukang sampai beres. Upgrade klinik selesai.', 'good'); }
  }
  const C = S.clinic;
  if (bonusOn('wulan') && C && C.open && R.ref !== S.day && S.time >= N.BONUS.wulanRefH * 60 && typeof inPracticeHours === 'function' && inPracticeHours() && queueing().length < queueMax()) {
    R.ref = S.day; spawnPatient(S.time); toast('Rujukan dari Puskesmas: satu pasien datang.', 'good'); }
  if (R.lapDue && game.scene === 'play' && !game.overlay && !game.fade) { R.lapDue = false; openLaporan(); }
}
/** [toggleOpen] hari H klinik tidak bisa dibuka. */
const nikahClosed = () => wedToday() ? 'Hari ini hari pernikahanmu. Klinik libur.' : null;
/** [dayNotes] catatan kalender: hari pernikahan. */
function nikahCalNote(seaKey, d, n) {
  const R = S.rel; if (!R || !R.tunangan) return; const D = R.nikahDay, sk = Math.floor((D - 1) / CFG.SEASON_DAYS) % 2 ? 'hujan' : 'kemarau', sd = (D - 1) % CFG.SEASON_DAYS + 1;
  if (sk === seaKey && sd === d) n.push(['♥ Pernikahan · ' + npcName(R.tunangan) + ' · 09:00 Balai Kota', 'main']);
}

// ---- Penanda ♥ & ngobrol ----
const lamarReady = id => isPacar(id) && !S.rel.tunangan && !S.rel.nikah && relOf(id) >= CFG.NIKAH.LAMAR_H && S.homeLv >= CFG.NIKAH.LAMAR_HOME && hasRing();
/** Pacar ingin kencan: 3 hari tanpa kencan (sejak jadian), belum ada janji, belum ditolak hari ini. */
function wantsKencan(id) {
  const R = nkSt(); if (!isPacar(id) || R.janji || isRenggang(id) || (R.later && R.later[id] === S.day) || wedToday()) return false;
  const last = R.kd[id] != null ? R.kd[id] : (R.evDay && R.evDay[id]) || 0; return S.day - last >= CFG.NIKAH.ASK_DAYS;
}
/** [npcMark] ♥ untuk hari H (pasangan menunggu), lamaran siap, atau pacar mengajak kencan. Keluarga tanpa penanda. */
function nikahMark(id) {
  if (isFamily(id)) return 'none';
  if (!S.rel) return null;
  if (wedToday() && id === S.rel.tunangan && S.time >= CFG.NIKAH.WED_H * 60) return 'love';
  if (!S.rel.janji && (lamarReady(id) || wantsKencan(id))) return 'love';
  return null;
}
let nikahSkip = null;
/** [relTalkFirst] Dipanggil paling awal saat ngobrol. true = sudah ditangani. */
function nikahTalk(id) {
  if (nikahSkip === id) { nikahSkip = null; return false; }
  if (isFamily(id)) { npcSt().talked[id] = S.day; const fam = Object.keys(FAM_IDS).find(k => FAM_IDS[k].includes(id));
    dialog([fillVars(pickA(['Selamat, ya, Nak {nama}. Titip ' + npcName(fam) + ', nggih.', 'Ini to yang namanya {nama}? Pantes.', 'Jauh-jauh ke sini, nggak nyesel. Kotanya adem.']))], { speaker: npcName(id) }); return true; }
  if (NK('toko') && NK('toko')[id]) { const St = npcSt(), first = !St.met[id], gain = !talkedToday(id); St.met[id] = true; St.talked[id] = S.day;
    const after = () => { const d = gain ? addTrust(id, CFG.NPC.TALK_TRUST) : 0; if (d > 0) toast('Trust ' + npcName(id) + ' +' + d, 'good'); if (first) toast(npcName(id) + ' tercatat di Buku Kenalan (K)'); };
    const C = Object.values(NIKAH_COUNTER).find(c => c[4] === id), open = C && !shopShut(C[0]) && game.world.key === Object.keys(NIKAH_COUNTER).find(k => NIKAH_COUNTER[k] === C);
    dialog([fillVars(pickA(NK('toko')[id]))], { npc: id, onDone: open ? null : after, choices: open ? [{ label: 'Lihat barang', fn: () => { after(); C[3](); } }, { label: 'Nanti aja', fn: after }] : null }); return true; }
  if (!S.rel || !isPacar(id)) return false;
  const R = nkSt();
  if (wedToday() && id === R.tunangan) {
    if (S.time < CFG.NIKAH.WED_H * 60) { dialog([{ act: '(' + npcName(id) + ' sudah rapi. Penghulu belum datang. Upacara mulai jam 09:00.)' }], { npc: id }); return true; }
    playWedding(id); return true; }
  if (R.janji) return false; // janji lain sedang jalan: ngobrol biasa (janji di tempat diurus relTalkFirst)
  if (wantsKencan(id)) { const L = NK(id); dialog([fillVars(pickA(L.ajak))], { npc: id, choices: [
    { label: 'Boleh, ayo', fn: () => { const ks = shuffle(Object.keys(CFG.NIKAH.KENCAN)), today = ks.find(k => S.time <= CFG.NIKAH.KENCAN[k].jam * 60 - 60); setKencan(id, today || ks[0]); } },
    { label: 'Lain kali, ya', fn: () => { (R.later = R.later || {})[id] = S.day; } }] }); return true; }
  const ch = [{ label: 'Ngobrol', fn: () => { nikahSkip = id; talkNpc(id); } }];
  if (!kencanToday(id)) ch.push({ label: 'Ajak kencan', fn: () => openKencan(id) });
  if (lamarReady(id)) ch.push({ label: 'Ada yang mau aku omongin', fn: () => askLamaran(id) });
  if (ch.length === 1) return false;
  ch.push({ label: 'Nggak jadi', fn: () => {} });
  dialog([{ act: '(' + npcName(id) + ' nengok ke arahmu.)' }], { npc: id, choices: ch }); return true;
}

// ---- Kencan ----
/** Hari janji untuk jam (jam): hari ini kalau masih ≥1 jam lagi, kalau tidak besok. */
const dayFor = jam => S.time <= jam * 60 - 60 ? S.day : S.day + 1;
function setKencan(id, k) {
  const P = CFG.NIKAH.KENCAN[k], R = nkSt(), d = dayFor(P.jam);
  R.janji = { id, kind: 'kencan', k, day: d, at: P.jam * 60, place: P.at, placeName: P.name };
  toast('Janji kencan: ' + npcName(id) + ' · ' + (d === S.day ? 'hari ini' : 'besok') + ' ' + hhmm(P.jam) + ' · ' + P.name, 'good'); sfx('rep_up');
}
/** Panel Ajak Kencan: pilih tempat (jam & biaya berdua). Sekali sehari; tidak datang ♥ -10. */
function openKencan(id) {
  const ks = Object.keys(CFG.NIKAH.KENCAN);
  foodPanel({ title: 'Ajak Kencan', w: 340, h: 236,
    nav(ov) { const n = ks.length; if (hit('up')) ov.sel = (ov.sel + n - 1) % n; if (hit('down')) ov.sel = (ov.sel + 1) % n; },
    cell(ov, i) { ov.sel = +i; },
    draw(ov, X, Y, W, H) {
      const px = X + 14, py = Y + 42; hInset(px, py, 40, 38, '#ead2a4'); hBust(id, px + 2, py + 4, 1.5, 'happy');
      HT(npcName(id) + ' · ' + relStatus(id)[0].split(' · ')[0], px + 48, py + 2, '#c0407a', { bold: true }); relBar(id, px + 48, py + 16, 150);
      HT('Sekali sehari · tidak datang ♥ ' + CFG.NIKAH.NOSHOW, px + 48, py + 28, MGC.ink2);
      ks.forEach((k, i) => { const p = CFG.NIKAH.KENCAN[k], y = py + 46 + i * 22, s = i === ov.sel, d = dayFor(p.jam);
        hInset(px, y, W - 28, 20, s ? '#ffe7a0' : null); if (s) hSel(px, y, W - 28, 20);
        HT(p.name, px + 8, y + 3, MGC.ink, { bold: true }); HT(p.desc, px + 8, y + 11, MGC.ink2);
        HT((d === S.day ? '' : 'Besok ') + hhmm(p.jam), X + W - 84, y + 6, MGC.ink, { bold: true, align: 'r' }); HT(p.cost ? rupiah(p.cost) : 'Gratis', X + W - 22, y + 6, p.cost ? (S.money >= p.cost ? MGC.ink2 : MGC.red) : '#2e7a34', { align: 'r' });
        clickable(px, y, W - 28, 20, () => {}, 'fc' + i); });
      hDivider(X + 14, Y + H - 48, W - 28); HT('♥ +' + CFG.NIKAH.KENCAN_REL + ' · Stres ' + CFG.NIKAH.KENCAN_STRESS + ' · 1 jam bersama', X + 14, Y + H - 43, '#c0407a', { bold: true });
    },
    buttons(ov) { const p = CFG.NIKAH.KENCAN[ks[ov.sel]], poor = S.money < p.cost;
      return [{ label: 'Ajak', w: 64, off: poor, offMsg: 'Uangmu kurang untuk berdua.', fn: () => setKencan(id, ks[ov.sel]) }, { label: 'Batal', w: 64, fn: () => {} }]; } });
}
/** Potongan dialog: kandidat, NPC lain, pemain ('me'), atau keluarga (nm, tanpa potret). */
function nkSegs(id, P) {
  const segs = []; P.forEach(pg => { const who = pg.who || (pg.nm ? 'nm:' + pg.nm : id), last = segs[segs.length - 1], page = pg.act ? { act: fillVars(pg.act) } : fillVars(pg.s);
    if (last && last.who === who) last.pages.push(page); else segs.push({ who, pages: [page] }); });
  return segs;
}
function nkRun(segs, done) {
  const run = i => { if (i >= segs.length) return done(); const s = segs[i];
    dialog(s.pages, Object.assign(s.who === 'me' ? { speaker: S.name } : /^nm:/.test(s.who) ? { speaker: s.who.slice(3) } : { npc: s.who }, { onDone: () => run(i + 1) })); };
  run(0);
}
/** [relTalkFirst] janji kencan/lamaran: NPC sudah menunggu di tempat. */
function nikahPlay(id, J) { const R = nkSt(); R.janji = null; npcSt().met[id] = true; if (J.kind === 'lamaran') playLamaran(id); else playKencan(id, J.k); }
/** Adegan kencan: kartu → 2–3 baris → tanya + 2 jawaban (dua-duanya baik) → ♥ +4, stres -10, +1 jam, biaya berdua. */
function playKencan(id, k) {
  const P = CFG.NIKAH.KENCAN[k], E = (NK(id).kencan || {})[P.at], R = nkSt(), N = CFG.NIKAH;
  romCard('♥  Kencan · ' + npcName(id), P.name, hhmm(S.time / 60) + ' · berdua', () => nkRun(nkSegs(id, E.p), () =>
    eventChoice(id, E.ask, E.o.map(o => o.label), i => nkRun(nkSegs(id, E.o[i].r), () => {
      R.kd[id] = S.day; const pay = Math.min(P.cost, Math.max(0, S.money)); S.money -= pay; if (pay) sfx('coin_out');
      const d = addRel(id, N.KENCAN_REL); addStress(N.KENCAN_STRESS); spendTime(N.KENCAN_MIN);
      toast('Kencan · ♥ ' + (d >= 0 ? '+' : '') + d + ' · Stres ' + N.KENCAN_STRESS + (pay ? ' · -' + rupiah(pay) : ''), 'good'); sfx('rep_up'); }))));
}

// ---- Lamaran ----
function askLamaran(id) {
  const L = NK(id).lamaran, R = nkSt(), d = dayFor(L.jam), pn = (placeInfo(L.at) || {}).name || L.place;
  dialog([fillVars(L.jawab)], { npc: id, onDone: () => {
    R.janji = { id, kind: 'lamaran', day: d, at: L.jam * 60, place: L.at, placeName: pn.replace(/ · .*$/, '') };
    toast('Janji: ' + npcName(id) + ' · ' + (d === S.day ? 'hari ini' : 'besok') + ' ' + hhmm(L.jam) + ' · ' + R.janji.placeName + ' · bawa cincinnya', 'good'); } });
}
/** Adegan lamaran: kartu Lamaran → narasi → selalu diterima → telepon keluarga → cincin terpakai, tanggal nikah. */
function playLamaran(id) {
  const L = NK(id), R = nkSt(), N = CFG.NIKAH;
  if (!hasRing()) { dialog([{ act: '(Kamu meraba saku. Cincinnya nggak ada. Kamu cuma bisa senyum canggung.)' }], { npc: id }); return; }
  romCard('♥  ' + npcName(id), 'Lamaran', L.lamaran.place, () => nkRun(nkSegs(id, L.lamaran.p), () =>
    phoneCard(id, L.telp.who, L.telp.from, () => nkRun(nkSegs(id, L.telp.p), () => {
      S.food.bag.cincin--; if (!S.food.bag.cincin) delete S.food.bag.cincin;
      R.tunangan = id; R.nikahDay = S.day + N.WED_DAYS; R.kd[id] = S.day; spendTime(30);
      toast('Kamu dan ' + npcName(id) + ' bertunangan ♥ Nikah ' + dayLabelM(R.nikahDay) + ' 09:00, Balai Kota', 'good'); sfx('rep_up'); }))), 'cincin');
}

// ---- Pernikahan ----
function playWedding(id) {
  const L = NK(id), R = nkSt(), N = CFG.NIKAH;
  romCard('♥  ' + S.name + ' & ' + npcName(id), 'Pernikahan', 'Balai Kota · ' + L.nikah.from, () => nkRun(nkSegs(id, L.nikah.p), () =>
    nkRun(nkSegs(id, L.momen), () => romCard('♥  Syukuran', 'Alun-alun', 'Seisi kota ikut makan', () => nkRun(nkSegs(id, NK('syukuran')), () => {
      R.nikah = id; R.tunangan = null; R.wedDone = S.day; R.kd[id] = S.day;
      if (S.time < N.WED_END * 60) spendTime(N.WED_END * 60 - S.time); addStress(N.WED_STRESS);
      toast('Kamu dan ' + npcName(id) + ' resmi menikah ♥ Stres ' + N.WED_STRESS, 'good'); sfx('rep_up'); openBonus(id); })))));
}

// ---- Kartu & panel (draf UI 3a-5 yang di-ACC) ----
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
/** Alasan toko tutup (jam buka penjaga). */
const shopShut = s => { const P = CFG.NIKAH.SHOP[s], h = S.time / 60; return h < P.open || h >= P.close || (s === 'emas' && wdIdx() === 6) ? 'Buka ' + hhmm(P.open) + '-' + hhmm(P.close) + (s === 'emas' ? ', Minggu tutup' : '') : null; };
function buy1(k) { S.money -= FD.ITEMS[k][1]; S.food.bag[k] = (S.food.bag[k] || 0) + 1; sfx('coin'); toast('+1 ' + FD.ITEMS[k][0] + ' masuk Tas', 'good'); }
const buyWhy = k => S.money < FD.ITEMS[k][1] ? 'Uang kurang.' : foodSlots(S.food.bag) + 1 > FD.BAG_MAX ? 'Tas penuh.' : null;
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
    buttons(ov) { const k = cur(ov), why = buyWhy(k); return [{ label: 'Beli 1', w: 64, keep: true, off: !!why, offMsg: why, fn: () => buy1(k) }, { label: 'Tutup', w: 64, fn: () => {} }]; } });
  o.tab = 0; return o;
}
/** Emas Lina: cincin lamaran (setelah pacaran, maks 1), kalung, gelang. */
function openEmas() {
  const items = CFG.NIKAH.SHOP.emas.items, pacar = () => S.rel && S.rel.pacar, R = () => S.rel || {};
  const ringWhy = () => !pacar() ? 'Cincin lamaran baru dijual setelah kamu pacaran.' : hasRing() ? 'Kamu sudah punya cincin lamaran.' : R().tunangan || R().nikah ? 'Cincinnya sudah dipakai melamar.' : null;
  foodPanel({ title: 'Emas Lina', w: 340, h: 200,
    nav(ov) { const n = items.length; if (hit('left')) ov.sel = (ov.sel + n - 1) % n; if (hit('right')) ov.sel = (ov.sel + 1) % n; }, cell(ov, i) { ov.sel = +i; },
    draw(ov, X, Y, W, H) { const k = items[ov.sel]; HT('Perhiasan Ci Lina · istri Koh Hendra', X + 14, Y + 40, MGC.ink2);
      items.forEach((it, i) => { const tw = 96, x0 = X + 14 + i * (tw + 6), y0 = Y + 54, on = i === ov.sel, lock = it === 'cincin' && !pacar();
        hInset(x0, y0, tw, 66, on ? '#ffe7a0' : null); if (on) hSel(x0, y0, tw, 66); hFood(it, x0 + tw / 2 - 16, y0 + 4, true);
        HT(FD.ITEMS[it][0], x0 + tw / 2, y0 + 40, MGC.ink, { align: 'c', bold: true }); HT(rupiah(FD.ITEMS[it][1]), x0 + tw / 2, y0 + 51, MGC.ink2, { align: 'c' });
        if (lock) { hR(x0 + 1, y0 + 1, tw - 2, 64, 'rgba(70,50,30,.35)'); HT('Setelah pacaran', x0 + tw / 2, y0 + 28, '#fff2d4', { align: 'c', bold: true, sh: '#3a1a08' }); }
        clickable(x0, y0, tw, 66, () => {}, 'fc' + i); });
      HT(k === 'cincin' ? 'Syarat lamaran: pacaran, ♥ ' + CFG.NIKAH.LAMAR_H + ', Rumah Lv ' + CFG.NIKAH.LAMAR_HOME + '. Maks 1 cincin.' : 'Hadiah mahal, bisa dikasih ke siapa saja.', X + 14, Y + 128, MGC.ink2);
      hDivider(X + 14, Y + H - 48, W - 28); HT('Di Tas: ' + (S.food.bag[k] || 0), X + 14, Y + H - 43, MGC.ink, { bold: true });
      HT('Uangmu ' + rupiah(S.money), X + W - 14, Y + H - 43, S.money >= FD.ITEMS[k][1] ? MGC.ink2 : MGC.red, { align: 'r' }); },
    buttons(ov) { const k = items[ov.sel], why = (k === 'cincin' && ringWhy()) || buyWhy(k);
      return [{ label: 'Beli', w: 64, keep: true, off: !!why, offMsg: why, fn: () => buy1(k) }, { label: 'Tutup', w: 64, fn: () => {} }]; } });
}
/** [currentAction] E di depan etalase Emas Lina / kasir Toserba (penjaganya harus ada & jam buka). */
const NIKAH_COUNTER = { tokoEmas: ['emas', [72, 64], 'Emas Lina · Perhiasan', openEmas, 'lina'], toserba: ['toserba', [210, 120], 'Kasir Toserba · Belanja', openToserba, 'yuni'] };
function nikahShopAction(w) {
  const C = NIKAH_COUNTER[w.key]; if (!C) return null; const f = entFront(w, C[1]); if (!f || !inRect(S.px, S.py, f)) return null;
  const shut = shopShut(C[0]); if (shut || !npcAct.list[C[4]]) return { label: C[2], fn: () => dialog([shut ? 'Tutup. ' + shut + '.' : npcName(C[4]) + ' belum datang.']) };
  return { label: C[2], fn: C[3] };
}
/** Ringkasan bonus menikah per pasangan (teks panel). */
const NIKAH_BONUS_TXT = {
  adji: ['Pajak klinik 10% jadi 5%.', 'Stres -10 tiap pagi.', 'Laporan keuangan mingguan tiap Senin pagi.'],
  arya: ['Upgrade rumah & klinik -50%, selesai jam 18 hari itu juga.', 'Alat rusak diperbaiki Arya gratis.', 'Tagihan listrik & air Senin -30%.'],
  raka: ['Trust warga naik 25% lebih cepat dari semua sumber.', 'Reputasi & Trust tidak turun saat tindakan Gagal atau komplikasi.', 'Kasus Pak Joni lebih cepat (menyusul di Fase 3b).'],
  galih: ['Peluang komplikasi pasien riwayat medis 50% jadi 25%.'], sekar: ['Kesabaran pasien +20%.'], nadia: ['Energi +20 tiap bangun tidur (boleh lewat batas).'],
  laras: ['Reputasi dari tindakan ×1,25.'], wulan: ['Rasa sakit pasien anak ×0,75.', '+1 pasien per hari (rujukan dari Puskesmas).'] };
function openBonus(id) { openPanel({ title: 'Bonus Menikah · ' + npcName(id), w: 320, rows: () => [['Berlaku selama menikah, tiap hari:', MGC.ink2], ...NIKAH_BONUS_TXT[id].map(t => ['♥ ' + t, MGC.ink, true]), [npcName(id) + ' sekarang tinggal di rumahmu. Pagi di rumah, lalu berangkat kerja. Pulang malam.', MGC.ink2]], buttons: () => [{ label: 'Oke', fn: () => {} }] }); }
/** Laporan Mingguan Adji (Senin pagi): pemasukan & pasien minggu lalu, listrik & air, pajak berikutnya. */
function openLaporan() {
  const R = nkSt(), wk = R.wk || { inc: 0, n: 0 }, util = Math.round((CFG.OPS.UTIL_WEEK[S.clinicStage] || 0) * nikahUtilMul()), O = CFG.OPS, tax = S.day + O.TAX_DAYS - (S.day - 1) % O.TAX_DAYS;
  R.wk = { inc: 0, n: 0 };
  openPanel({ title: 'Laporan Mingguan Adji', w: 320, rows: () => [['Minggu lalu, Senin sampai Minggu', MGC.ink2],
    ['Pemasukan klinik: ' + rupiah(wk.inc) + ' · ' + wk.n + ' pasien', MGC.ink, true], ['Listrik & air minggu ini: ' + rupiah(util), MGC.ink],
    ['Bersih: ' + rupiah(wk.inc - util), wk.inc >= util ? '#2e7a34' : MGC.red, true], ['Pajak berikutnya ' + dayLabel(tax) + ': ' + Math.round(taxRate() * 100) + '% dari pendapatan kotor.', MGC.ink],
    ['"' + pickA(NK('laporan')) + '" · Adji', '#a0285a', true]], buttons: () => [{ label: 'Makasih', fn: () => {} }] }); }
/** Chip pernikahan di HUD (di bawah chip janji bila ada). */
function drawNikahChip() {
  const R = S.rel; if (!R || !R.tunangan) return; const D = R.nikahDay;
  const t = '♥ Nikah · ' + npcName(R.tunangan) + ' · ' + (D === S.day ? '' : D === S.day + 1 ? 'Besok ' : dayLabel(D) + ' ') + '09:00 · Balai Kota', w = hW(t, true) + 14, X = 480 - 4 - w;
  const Y = (fokusOn() ? 74 : 57) + (R.janji ? 17 : 0); hBox(X, Y, w, 15, 'paper', { thin: true }); HT(t, X + 7, Y + 4, '#a0285a', { bold: true });
}

// ---- Pengait uji (SR.nikah) ----
const NIKAH_SR = { st: nkSt, kencan: openKencan, play: (id, k) => playKencan(id, k), setKencan, ask: askLamaran, lamar: id => playLamaran(id), wed: id => playWedding(id),
  card: romCard, phone: phoneCard, toserba: openToserba, emas: openEmas, bonus: openBonus, laporan: openLaporan, talk: nikahTalk, place: nikahPlace, guests: wedGuests,
  morning: nikahMorning, tick: nikahTick, ready: lamarReady, wants: wantsKencan, spots: wedSpots,
  fx: { taxRate, costMul: nikahCostMul, utilMul: nikahUtilMul, trust: nikahTrust, shield: nikahShield, complic: nikahComplicMul, patience: nikahPatienceMul, kidPain: nikahKidPain, rep: nikahRep } };
