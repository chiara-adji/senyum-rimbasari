/* [3a-2] Trust: adegan Trust per tingkat (design/narrative/npc/08-adegan-trust.md → NPC_SCENES/NPC_SIKAP),
   Trust naik sekali per hari per sumber, pasien warga di klinik, Sirih → Trust. GDD §9, §10. Angka di CFG.NPC (tag [3a]).
   Disisipkan oleh tools/build-game.cjs setelah src/npc3a.js (di dalam IIFE game). */
Object.assign(CFG.NPC, { // [3a]
  SCENE_TRUST: 5,       // GDD §9: event +5 (hanya Adegan Trust bertanda "adegan", sekali tonton)
  CARE_TRUST: { sempurna: 8, sukses: 5, cukup: 0, gagal: -6 }, // GDD §9: tindakan Sempurna/Baik +8/+5, Gagal −6
  SIRIH_TRUST: 3,       // GDD §7: Sirih trust +3 setelah scaling/cabut (pasien warga; pasien biasa tetap reputasi +1)
  PAT_P: 0.25,          // keputusan user 3a-2: peluang ada pasien warga per hari kerja (maks 1)
  PAT_MIN: 20,          // GDD §9: Trust ≥20 → mau jadi pasien
  PAT_MIN_ID: { darmi: 80, dimas: 40 }, // kartu NPC: Mbah Darmi baru mau di Sahabat; Dimas baru mau diperiksa di Akrab
  PAT_AT: [9, 14],      // jam datang pasien warga (acak di rentang ini, klinik 08–16)
  PAT_CONSENT: 0.05,    // keputusan user 3a-2: persetujuan +5% per tingkat Trust (Kenal +5% … Sahabat +20%)
});
/** Kasus gigi warga dari "Kondisi gigi" di kartu NPC (01-warga.md). med = riwayat medis tetap. */
const WARGA_CASE = { harjo: ['perio'], ratna: ['karies'], darmi: ['sisaAkar'], dimas: ['persist', 'karies'], endang: ['pulpRev'], bowo: ['ging', 'karies'],
  sinta: ['ging'], slamet: ['sisaAkar'], tari: ['pulpRev', 'karies'], ilham: ['karies'], wiryo: ['sisaAkar'], doni: ['ging'] };
const WARGA_MED = { slamet: 'jantung' }; // Pak Slamet minum pengencer darah

// ---- Sumber Trust harian ----
/** Trust dari satu sumber (ngobrol, rawat, sirih, adegan) hanya sekali per hari. Kembalikan selisih yang benar-benar masuk. */
function trustOnce(id, src, n) {
  const St = npcSt(); St.src = St.src || {}; const o = St.src[id] = St.src[id] || {};
  if (o[src] === S.day || !n) return 0; o[src] = S.day; return addTrust(id, n);
}

// ---- Adegan Trust ----
/** Syarat judul adegan/sikap (tempat, blok waktu, jam, stres). */
function sceneCondOk(id, c) {
  if (c.x) return false;
  if (c.at && c.at !== npcAtKey(id)) return false;
  if (c.blok) { const [a, b] = BLOK[c.blok], h = S.time / 60; if (h < a || h >= b) return false; }
  if (c.jam != null && S.time / 60 < c.jam) return false;
  if (c.stres != null && !(S.stress > c.stres)) return false;
  return true;
}
/** Adegan yang menunggu diputar saat ngobrol (tingkat terendah dulu, maks satu per hari), atau null. */
function pendingScene(id) {
  const L = NPC_SCENES[id]; if (!L) return null;
  const St = npcSt(), seen = (St.seen = St.seen || {})[id] || [];
  if ((St.scDay || {})[id] === S.day) return null;
  const sc = L.find(s => !seen.includes(s.t) && trustOf(id) >= s.t); if (!sc) return null;
  return sceneCondOk(id, sc.c) ? sc : null;
}
/** Penanda kepala: ! = ada adegan Trust yang bisa diputar sekarang. */
function trustMark(id) { try { return pendingScene(id) ? 'scene' : null; } catch (e) { return null; } }
/** Putar adegan (halaman berpotret; ganti potret bila pembicara berganti). Kembalikan true bila adegan diputar. */
function playScene(id) {
  const sc = pendingScene(id); if (!sc) return false;
  const St = npcSt(), first = !St.met[id], gain = !talkedToday(id);
  St.met[id] = true; St.talked[id] = S.day; (St.seen[id] = St.seen[id] || []).push(sc.t); (St.scDay = St.scDay || {})[id] = S.day;
  const segs = []; sc.p.forEach(pg => { const who = pg.who || id, last = segs[segs.length - 1];
    const page = pg.act ? { act: fillVars(pg.act) } : fillVars(pg.s);
    if (last && last.who === who) last.pages.push(page); else segs.push({ who, pages: [page] }); });
  const done = () => {
    let d = 0; if (gain) d += addTrust(id, CFG.NPC.TALK_TRUST); if (sc.ev) d += trustOnce(id, 'adegan', CFG.NPC.SCENE_TRUST);
    if (d > 0) toast('Trust ' + npcName(id) + ' +' + d, 'good'); if (first) toast(npcName(id) + ' tercatat di Buku Kenalan (K)');
  };
  const run = i => { const s = segs[i]; dialog(s.pages, { npc: s.who, onDone: i + 1 < segs.length ? () => run(i + 1) : done }); };
  run(0); return true;
}
/** Halaman sikap (NPC_SIKAP) yang ikut tampil setelah kalimat harian. Halaman dengan variabel kosong dilewati. */
function sikapPages(id) {
  const out = []; (NPC_SIKAP[id] || []).forEach(k => { if (trustOf(id) < k.t || !sceneCondOk(id, k.c)) return;
    const v = sikapVars(id), ok = k.l.filter(s => !(/\{sakit\}/.test(s) && !v.sakit) && !(/\{(orang|tempat)\}/.test(s) && !v.orang)); if (!ok.length) return;
    const s = pickA(ok); out.push(fillVars(s.replace(/\{sakit\}/g, v.sakit).replace(/\{orang\}/g, v.orang).replace(/\{tempat\}/g, v.tempat))); });
  return out;
}
/** Variabel gosip Bu Ratna: warga yang giginya sakit (calon pasien warga) dan posisi seorang kenalan hari ini. */
function sikapVars(id) {
  const v = { sakit: '', orang: '', tempat: '' }, wp = wargaDay(), oth = wargaCands().filter(k => k !== id), c = wp.id && !wp.came && wp.id !== id ? wp.id : oth.length ? oth[hashN('sakit' + S.day) * oth.length | 0] : null;
  if (c) v.sakit = npcName(c);
  const met = NPC_ROSTER.filter(k => k !== id && npcMet(k) && npcNow(k).cur), o = met.length ? met[hashN(id + S.day) * met.length | 0] : null;
  if (o) { v.orang = npcName(o); v.tempat = (placeInfo(npcNow(o).cur) || {}).name || ''; if (!v.tempat) v.orang = ''; }
  return v;
}

// ---- Pasien warga (klinik) ----
const WARGA_IDS = Object.keys(WARGA_CASE);
/** Warga yang mau datang berobat hari ini: sudah kenal, Trust cukup, bukan staf, tidak sedang antre/dijadwalkan kembali. */
function wargaCands() {
  const C = S.clinic, busy = id => C.patients.some(p => p.npc === id) || C.returns.some(r => r.npc === id);
  return WARGA_IDS.filter(id => npcMet(id) && trustOf(id) >= (CFG.NPC.PAT_MIN_ID[id] || CFG.NPC.PAT_MIN) && !staffRoleOf(id) && !busy(id));
}
/** Rencana pasien warga hari ini (diundi sekali per hari, tersimpan supaya muat ulang tidak mengundi lagi). */
function wargaDay() {
  const St = npcSt(); if (St.wp && St.wp.day === S.day) return St.wp;
  const N = CFG.NPC, cands = wargaCands(), [a, b] = N.PAT_AT;
  St.wp = { day: S.day, id: cands.length && Math.random() < N.PAT_P ? pickA(cands) : null, at: Math.round((a + Math.random() * (b - a)) * 60), came: false };
  return St.wp;
}
/** Dipanggil spawnPatient: data pasien warga bila sudah waktunya datang hari ini, atau null. */
function wargaVisit(t) {
  try {
    const wp = wargaDay(); if (!wp.id || wp.came || t < wp.at || !wargaCands().includes(wp.id)) return null;
    wp.came = true; wp.cameAt = t; jrEv('wargaCome', wp.id); /* [3b-1] #4/#8 */ return wargaBase(wp.id);
  } catch (e) { console.error('[3a-2] pasien warga:', e); return null; }
}
/** Jendela "berobat" warga yang hari ini jadi pasien: [mulai, selesai, menit datang] (menit, kelipatan 30), atau null.
 *  Selama jendela ini jadwal biasanya diganti tempat 'berobat': berjalan ke pintu klinik, di dalam diwakili sosok pasien.
 *  Selesai = saat pasien sudah tidak ada di klinik (pulang/ditolak/klinik tutup), dicatat sekali di wp.left. */
function wargaWin(id) {
  const wp = S.npc && S.npc.wp; if (!wp || wp.day !== S.day || wp.id !== id || !wp.came) return null;
  const at = wp.cameAt != null ? wp.cameAt : wp.at;
  if (wp.left == null && !S.clinic.patients.some(p => p.npc === id)) wp.left = Math.max(S.time, at);
  return [Math.floor(at / 30) * 30, wp.left == null ? CFG.DAY_END : Math.ceil((wp.left + 1) / 30) * 30, at];
}
/** Identitas + kasus pasien warga. Rekam medis satu per NPC (pid disimpan di S.npc.pid). */
function wargaBase(id) {
  const C = S.clinic, St = npcSt(), cb = castBy(id), body = cb.s.body === 'kid' ? 'kid' : cb.s.body === 'old' ? 'old' : 'adult';
  const g = /^(Bu|Mbah|Kak) /.test(cb.name) ? 'W' : 'P', kid = body === 'kid', E = CFG.CLINIC.EXAM;
  St.pid = St.pid || {}; let pid = St.pid[id], o = pid != null ? C.people[pid] : null;
  const dx = pickA(WARGA_CASE[id].filter(k => DX[k] && (!DX[k].minStage || S.clinicStage >= DX[k].minStage))) || 'sehat', d = DX[dx];
  const tooth = d.region ? (Array.isArray(d.region) ? pickA(d.region) : null) : pickA(kid ? d.kidTeeth : d.teeth);
  const base = { name: cb.name, g, body, L: null, npc: id, kase: d.tx, dx, tooth, med: o ? o.med : WARGA_MED[id] || null, drug: o ? o.drug : null, preg1: false,
    afford: o ? o.afford : (Math.random() * 2 - 1) * E.AFFORD, back: o ? 'lama' : undefined };
  if (!o) { pid = registerPerson(base); St.pid[id] = pid; C.people[pid].npc = id; }
  base.pid = pid; return base;
}
/** Bonus persetujuan dari Trust (hanya pasien warga): +5% per tingkat. */
const trustConsent = p => p && p.npc ? Math.floor(Math.min(trustOf(p.npc), 80) / 20) * CFG.NPC.PAT_CONSENT : 0;
/** Hasil tindakan pada pasien warga → Trust (sekali per hari). Kembalikan catatan untuk rekam medis, atau ''. */
function careTrust(p, grade, sirih) {
  if (!p || !p.npc) return '';
  const id = p.npc, n0 = CFG.NPC.CARE_TRUST[grade] || 0, n = n0 < 0 && nikahShield() ? 0 : n0, out = []; // [3a-5] Raka: Trust tidak turun
  const d = trustOnce(id, 'rawat', n); if (d) out.push('Trust ' + npcName(id) + ' ' + (d > 0 ? '+' : '') + d);
  if (sirih) { const s = trustOnce(id, 'sirih', CFG.NPC.SIRIH_TRUST); if (s) out.push('Sirih: Trust +' + s); }
  if (out.length) toast(out.join(' · '), d < 0 ? 'bad' : 'good');
  return out.length ? out.join(' · ') + '.' : '';
}
