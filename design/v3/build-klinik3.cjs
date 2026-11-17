// Build draf Fase 3b-3 (Klinik tahap 3 + PSA + Dokter Rekan & Petugas Kebersihan): salinan draf game design/v3/klinik3-game.html.
// Game utama (index.html, src/) TIDAK disentuh. Kait [3b-3] disisipkan lewat penggantian teks di salinan saja.
// Uji: design/v3/klinik3-game.html?uji=klinik3
const fs = require('fs'), path = require('path'); const D = __dirname, ROOT = path.join(D, '..', '..');
const gOrder = ['base1', 'font', 'base2', 'char', 'cast', 'base3', 'furni', 'furni2', 'build', 'rooms', 'world', 'mini', 'anterior', 'psa', 'tanjung', 'makan', 'kebun', 'npc', 'nikah'];
const glib = gOrder.map(n => '/* ---- v3/' + n + '.js ---- */\n' + fs.readFileSync(path.join(D, 'src', n + '.js'), 'utf8')).join('\n');
const src = f => fs.readFileSync(path.join(ROOT, 'src', f), 'utf8');
let npc = ['npc-data.js', 'npc3a.js', 'trust3a.js', 'nongkrong3a.js', 'hubungan3a.js', 'nikah3a.js', 'jurnal3b.js', 'alat3b.js', 'pasien3b.js', 'bleach3b.js'].map(src).join('\n')
  + '\n' + fs.readFileSync(path.join(D, 'src', 'klinik3-draf.js'), 'utf8');
let game = src('game.js');
const rep = (a, b, where) => { const s = where === 'npc' ? npc : game; if (!s.includes(a)) throw new Error('kait tidak ketemu: ' + a); if (where === 'npc') npc = s.replace(a, b); else game = s.replace(a, b); };
// game.js
rep("function openUpgrade() {", "function openUpgrade() { if (S.clinicStage + 1 === 3) return openUpgrade3(); /* [3b-3] */");
rep("news.push(S.clinicStage === 1 ? 'Renovasi selesai! '", "news.push(S.clinicStage === 3 ? k3UpNews() : S.clinicStage === 1 ? 'Renovasi selesai! '");
rep("S.clinicStage >= 2 && !st.off", "S.clinicStage >= (STAFF_ROLES[role].stage || 2) && !st.off");
rep("staffNewDay(news); // [2e]", "staffNewDay(news); k3NewDay(news); /* [3b-3] */");
rep("C.clean = Math.max(0, C.clean - K.DIRTY_PER_PATIENT); C.served++;", "C.clean = Math.max(0, C.clean - K.DIRTY_PER_PATIENT * k3DirtyMul()); staffUse('bersih'); /* [3b-3] */ C.served++;");
rep("R.pay = Math.round(tariff(tx) * part / 1000) * 1000;", "R.pay = Math.round(txPay(job) * part / 1000) * 1000; /* [3b-3] PSA 50/50 */");
rep("R.ctl = back(opt.next, 'ctl', X.CONTROL_DAYS);", "R.ctl = back(opt.next, 'ctl', opt.nextDays ? rnd(opt.nextDays) : X.CONTROL_DAYS); /* [3b-3] */");
rep("jrProc(job, R); /* [3b-1]", "k3Proc(job, R); /* [3b-3] */ jrProc(job, R); /* [3b-1]");
rep("dx = t2Case(kase, dx, kid);", "dx = t2Case(kase, dx, kid); dx = psaCase(kase, dx, kid); /* [3b-3] */");
rep("  opsTick(); // [rev]", "  rekanTick(); /* [3b-3] */ opsTick(); // [rev]");
rep("dirty ? '#ffb0a0' : MGC.lite]];", "dirty ? '#ffb0a0' : MGC.lite]].concat(k3HudRows()); /* [3b-3] */");
rep("function openStaff() {", "function openStaff() { return openStaffG(); /* [3b-3] */");
// (k3BreakPick dihapus: revisi user, Petugas Kebersihan hanya bersih-bersih)
rep("function toggleOpen() {\n  const C = S.clinic, K = CFG.CLINIC;", "function toggleOpen() {\n  const C = S.clinic, K = CFG.CLINIC; if (k3Renov()) return dialog(['Klinik sedang direnovasi. ' + dayLabel(C.renovDay) + ' pagi baru bisa buka lagi.']); /* [3b-3] */");
rep("return o && o.next ? 'Kontrol ' + CFG.CLINIC.EXAM.CONTROL_DAYS + ' hari lagi: '", "return o && o.next ? 'Kontrol ' + (o.nextDays ? o.nextDays.join('-') : CFG.CLINIC.EXAM.CONTROL_DAYS) + ' hari lagi: '");
rep("jr: JR_TEST, /* [3b-1] */", "jr: JR_TEST, /* [3b-1] */ k3: K3_TEST, /* [3b-3] */");
// revisi user 2: sterilisasi wajib sejak tahap 1, kebersihan = kepercayaan pasien
rep("  if (at(pos.desk)) return { label: 'Meja praktik · '", "  { const ak = sterilAct(at); if (ak) return ak; } /* [3b-3] */\n  if (at(pos.desk)) return { label: 'Meja praktik · '");
rep("function exitRoom() {\n", "function exitRoom() {\n  if (sterilGuard()) return; /* [3b-3] */\n");
rep("    C.open = false; const q = queueing(); q.forEach(p => leavePatient(p, null));", "    C.open = false; const q = queueing(); q.forEach(p => leavePatient(p, null)); sterilClose(); /* [3b-3] */");
rep("{ label: 'Tutup klinik', fn: () => { C.open = false; queueing().forEach(p => leavePatient(p, null));", "{ label: 'Tutup klinik', fn: () => { C.open = false; queueing().forEach(p => leavePatient(p, null)); sterilClose(); /* [3b-3] */");
rep("  rekanTick(); /* [3b-3] */", "  rekanTick(); sterilTick(); /* [3b-3] */");
rep("const can = tx => { if (brokenBlocks(tx)) {", "const can = tx => { if (sterilBlocks(tx)) { sfx('ui_deny'); toast('Alat belum steril. Sterilkan dulu di autoklaf.', 'bad'); return false; } /* [3b-3] */ if (brokenBlocks(tx)) {");
rep("      if (brokenBlocks(tx)) HT(brokenBlocks(tx) + ' rusak: belum bisa dikerjakan'", "      if (sterilBlocks(tx)) HT('Alat belum steril: sterilkan dulu', X0 + 18, y + 15, MGC.red, { bold: true }); else /* [3b-3] */ if (brokenBlocks(tx)) HT(brokenBlocks(tx) + ' rusak: belum bisa dikerjakan'");
rep("+ p.afford + trustConsent(p),", "+ p.afford + trustConsent(p) + k3CleanConsent(), /* [3b-3] */");
// alat3b.js: rak muat 5 alat, alat lanjutan butuh set dasarnya
rep("  if (it[5] === 'tahap3' && S.clinicStage < 3) return 'tahap3';\n  return null;", "  if (it[5] === 'tahap3' && S.clinicStage < 3) return 'tahap3';\n  if (it[5] && t2Item(it[5]) && !T.own[it[5]]) return 'perlu'; /* [3b-3] */\n  return null;", 'npc');
rep("st === 'tahap3' ? 'Butuh klinik tahap 3.' : S.money", "st === 'tahap3' ? 'Butuh klinik tahap 3.' : st === 'perlu' ? 'Beli dulu ' + t2Item(it[5])[1] + '.' /* [3b-3] */ : S.money", 'npc');
rep("const W = 384, H = 252, X = 240 - W / 2, Y = 9, n = T2_ITEMS.length;", "const n = T2_ITEMS.length, W = 384, H = n > 4 ? 262 : 252, X = 240 - W / 2, Y = n > 4 ? 4 : 9, RH = n > 4 ? 36 : 41, CH = RH - 4, TY = n > 4 ? [3, 13, 23, 6] : [5, 16, 27, 8]; /* [3b-3] */", 'npc');
rep("const cy = Y + 49 + i * 41,", "const cy = Y + 49 + i * RH,", 'npc');
rep("hInset(cx, cy, cw, 37, st === 'ok'", "hInset(cx, cy, cw, CH, st === 'ok'", 'npc');
rep("if (s) hGlow(cx, cy, cw, 37);", "if (s) hGlow(cx, cy, cw, CH);", 'npc');
rep("hInset(cx + 5, cy + 5, 27, 27, null, true); toolIcon({ icon: it[2] }, cx + 10.5, cy + 10.5);", "hInset(cx + 5, cy + (CH - 27) / 2, 27, 27, null, true); toolIcon({ icon: it[2] }, cx + 10.5, cy + (CH - 27) / 2 + 5.5);", 'npc');
rep("HT(it[1], cx + 38, cy + 5, MGC.ink, { bold: true });", "HT(it[1], cx + 38, cy + TY[0], MGC.ink, { bold: true });", 'npc');
rep("HT(fitText(it[4], 244), cx + 38, cy + 16, MGC.ink2);", "HT(fitText(it[4], 244), cx + 38, cy + TY[1], MGC.ink2);", 'npc');
npc = npc.split('cy + 27').join('cy + TY[2]').split('cy + 30.5').join('cy + TY[2] + 3.5');
rep("tahap2: 'Tahap 2', tahap3: 'Tahap 3' }[st]", "tahap2: 'Tahap 2', tahap3: 'Tahap 3', perlu: 'Terkunci' }[st]", 'npc');
rep("const bx = cx + cw - 70, by = cy + 8;", "const bx = cx + cw - 70, by = cy + TY[3];", 'npc');
rep("166 * HI);", "(n * RH + 2) * HI);", 'npc');
// npc3a.js
rep("for (const r of ['resep', 'perawat'])", "for (const r of Object.keys(STAFF_ROLES)) /* [3b-3] */", 'npc');
rep("if (p === 'klinik') { const role = staffRoleOf(id), pos = clinicPos(), q = pos[role === 'resep' ? 'recep' : 'nurse']; return { wid: 'r:' + w.key, pt: [q[0], q[1]], dir: role === 'resep' ? 'down' : 'L', fixed: true }; }",
  "if (p === 'klinik') { const q = k3StaffSpot(staffRoleOf(id), clinicPos()); return { wid: 'r:' + w.key, pt: [q.pt[0], q.pt[1]], dir: q.dir, fixed: true }; } /* [3b-3] */", 'npc');
game = game.replace('/*@include npc*/', () => npc);
new Function(glib); new Function(game);
const html = '<!DOCTYPE html><html lang="id"><head><meta charset="utf-8"><title>Senyum Rimbasari · DRAF 3b-3</title><style>html,body{margin:0;height:100%;background:#120c0a;overflow:hidden}body{display:flex;align-items:center;justify-content:center}canvas{image-rendering:pixelated}</style></head><body><canvas id="game" width="480" height="270"></canvas>\n<script>\n' + glib + '\n</script><script>window.BGM={};</script><script>\n' + game + '\n</script></body></html>';
fs.writeFileSync(path.join(D, 'klinik3-game.html'), html); console.log('built klinik3-game.html', (html.length / 1024 | 0) + ' KB');
