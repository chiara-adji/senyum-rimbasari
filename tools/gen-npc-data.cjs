// [3a] Ubah dialog harian Buku NPC (design/narrative/npc/07a/07b/07c) menjadi data game: src/npc-data.js.
// Jalankan: node tools/gen-npc-data.cjs   (otomatis dipanggil oleh tools/build-game.cjs)
// Setiap baris tabel "| Kondisi | Dialog |" jadi { c: kondisi, s: kalimat, a: aksi } per NPC (id = CAST).
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..'), DIR = path.join(ROOT, 'design', 'narrative', 'npc');
const NAME2ID = { 'Pak Harjo': 'harjo', 'Bu Ratna': 'ratna', 'Mbah Darmi': 'darmi', 'Dimas': 'dimas', 'Bu Endang': 'endang', 'Pak Bowo': 'bowo', 'Bu Sinta': 'sinta',
  'Pak Slamet': 'slamet', 'Kak Tari': 'tari', 'Mas Ilham': 'ilham', 'Kakek Wiryo': 'wiryo', 'Coach Doni': 'doni', 'Adji': 'adji', 'Arya': 'arya', 'Ipda Raka': 'raka',
  'dr. Galih': 'galih', 'Sekar': 'sekar', 'Nadia': 'nadia', 'Laras': 'laras', 'Wulan': 'wulan', 'Putri': 'putri', 'Yoga': 'yoga', 'Rina': 'rina', 'Fajar': 'fajar',
  'Dewi': 'dewi', 'Pak Udin': 'udin', 'Bu Siti': 'siti', 'drg. Hana': 'hana', 'drg. Bima': 'bima', 'Pak Hasan': 'hasan', 'Bu Yati': 'yati', 'Mbak Dina': 'dina',
  'Pak Yusuf': 'yusuf', 'Kiki': 'kiki', 'Mas Rudi': 'rudi', 'Bu Lastri': 'lastri', 'Pak Marno': 'marno', 'Tika': 'tika', 'Pak Gunawan': 'gunawan', 'Nenek Sumi': 'sumi',
  'Andre': 'andre', 'Koh Hendra': 'hendra', 'Bu Melinda': 'melinda', 'drg. Surya': 'surya', 'Pak Joni': 'joni', 'Ci Lina': 'lina', 'Mbak Yuni': 'yuni' /* [3a-5] */ };
// Nama tempat di kondisi "@Tempat" (dicocokkan dari yang terpanjang) → kunci tempat game (lihat NPC_PLACE di src/npc3a.js).
const PLACES = { 'Kantor Akuntan': 'adji', 'Kantor Konsultan': 'teknik', 'Kantor Pos': 'pos', 'Pos Polisi': 'polisi', 'Balai Kota': 'balai', 'Rumah Lurah': 'lurah',
  'Rumah Endang': 'endang', 'Rumah Wiryo': 'wiryo', 'Rumah Guru': 'guru', 'Rumah Bowo': 'bowo', 'Pondok Jamu': 'jamu', 'Kedai Kopi': 'kedai', 'Toko Roti': 'roti',
  'Kebun Kopi': 'kopi', 'Kebun Bunga': 'bunga', 'Lapangan Voli': 'voli', 'Bukit Bintang': 'bukit', 'Studio Foto': 'studio', 'Perpustakaan': 'perpus', 'Puskesmas': 'puskes',
  'Alun-alun': 'alun', 'Angkringan': 'angkringan', 'Warung': 'warung', 'Klinik': 'klinik', 'Kos Melati': 'kos', 'Losmen': 'losmen', 'Bahari Medika': 'bahari',
  'Metra Dental': 'metra', 'Terminal': 'terminal', 'SD': 'sd', 'Rumah': 'rumahku', 'Kampung Asri': 'kampung', 'Posyandu': 'posyandu', 'lokasi': 'proyek', 'Lereng': 'lereng', 'Tanjung Arum': 'tanjung' };
const placeKeys = Object.keys(PLACES).sort((a, b) => b.length - a.length);
const unknown = {};
function parseCond(raw) {
  const c = {}; let s = raw.trim();
  // @Tempat (bisa beberapa kata)
  s = s.replace(/@([^@]+?)(?=$|\s(?:pagi|siang|sore|malam|buka|tutup|patroli|keliling|jaga|proyek|pasar)\b|\s[A-Z]\d|$)/g, (m, name) => {
    let n = name.trim(); const k = placeKeys.find(p => n === p || n.startsWith(p + ' '));
    if (!k) { unknown['@' + n] = 1; c.x = 1; return ' '; }
    c.at = PLACES[k]; const rest = n.slice(k.length).trim(); return ' ' + rest + ' '; });
  s.split(/\s+/).filter(Boolean).forEach(t => {
    let m;
    if ((m = t.match(/^T(\d+)(!?)$/))) { c.t = +m[1]; if (m[2]) c.only = 1; }
    else if ((m = t.match(/^H(\d+)$/))) c.h = +m[1];
    else if ((m = t.match(/^stres>(\d+)$/))) c.stres = +m[1];
    else if (t === 'kemarau' || t === 'hujan') c.musim = t;
    else if (t === 'cuaca:hujan') c.rain = 1;
    else if ((m = t.match(/^event:(\S+)$/))) c.event = m[1];
    else if (['pagi', 'siang', 'sore', 'malam'].includes(t)) c.blok = t;
    else if (['pacaran', 'nikah', 'renggang', 'buka', 'tutup', 'patroli', 'keliling', 'jaga', 'proyek', 'pasar', 'jenguk', 'kontrol', 'Bab4', 'Epilog'].includes(t)) c[t] = 1;
    else if (t === 'staf') c.staf = 1; else if (t === '!staf') c.staf = 0;
    else { unknown[t] = 1; c.x = 1; } // kondisi yang belum dikenali game → baris tidak dipakai
  });
  if (/ruang tunggu/.test(raw)) { c.tunggu = 1; delete c.x; }
  if (/setelah #32|gaji-telat/.test(raw)) c.x = 1;
  return c;
}
const out = {}; let n = 0;
for (const f of ['07a-dialog-warga.md', '07b-dialog-romance.md', '07c-dialog-lainnya.md']) {
  let id = null;
  for (const line of fs.readFileSync(path.join(DIR, f), 'utf8').split(/\r?\n/)) {
    const h = line.match(/^#{2,3}\s+(.+?)\s*$/); if (h) { id = NAME2ID[h[1]] || null; continue; }
    if (!id || !line.startsWith('|') || /^\|\s*(Kondisi|---)/.test(line)) continue;
    const cells = line.split('|').slice(1, -1).map(x => x.trim()); if (cells.length < 2) continue;
    // ruang tunggu ditulis "ruang tunggu" (2 kata): pisahkan dulu
    const c = parseCond(cells[0].replace('ruang tunggu', 'ruang_tunggu').replace('ruang_tunggu', '') + (cells[0].includes('ruang tunggu') ? ' ' : ''));
    if (cells[0].includes('ruang tunggu')) c.tunggu = 1;
    let txt = cells.slice(1).join(' | '), a = '';
    txt = txt.replace(/\*\(([^)]*)\)\*/g, (m, x) => { a += (a ? ' ' : '') + '(' + x.trim() + ')'; return ''; }).trim();
    const s = txt.replace(/^"|"$/g, '').replace(/^“|”$/g, '').trim();
    (out[id] = out[id] || []).push(Object.assign({ c }, s ? { s } : {}, a ? { a } : {})); n++;
  }
}
// [3a-2] Adegan Trust (08-adegan-trust.md): "### T40 adegan @Tempat sore jam21 stres>60" → { t, ev, c, p: [{ s | act, who }] }; "### sikap T20 …" → halaman tambahan tiap ngobrol.
const scenes = {}, sikap = {}; let nS = 0;
{
  let id = null, cur = null;
  const headCond = raw => { const c = {}; let s = ' ' + raw + ' ';
    s = s.replace(/@([^@]+?)(?=\s(?:pagi|siang|sore|malam|jam\d+|stres>\d+)\b|\s*$)/g, (m, name) => { const n = name.trim(), k = placeKeys.find(p => n === p);
      if (!k) { unknown['08 @' + n] = 1; c.x = 1; } else c.at = PLACES[k]; return ' '; });
    s.split(/\s+/).filter(Boolean).forEach(t => { let m;
      if ((m = t.match(/^T(\d+)$/))) c.t = +m[1]; else if (t === 'adegan') c.ev = 1; else if (t === 'sikap') c.sikap = 1;
      else if (['pagi', 'siang', 'sore', 'malam'].includes(t)) c.blok = t; else if ((m = t.match(/^jam(\d+)$/))) c.jam = +m[1];
      else if ((m = t.match(/^stres>(\d+)$/))) c.stres = +m[1]; else { unknown['08 ' + t] = 1; c.x = 1; } });
    return c; };
  for (const line of fs.readFileSync(path.join(DIR, '08-adegan-trust.md'), 'utf8').split(/\r?\n/)) {
    let h = line.match(/^##\s+(.+?)\s*$/); if (h) { id = NAME2ID[h[1]] || null; cur = null; continue; }
    h = line.match(/^###\s+(.+?)\s*$/); if (h) { if (!id) continue; const c = headCond(h[1]), t = c.t; delete c.t;
      if (c.sikap) { delete c.sikap; cur = { t, c, l: [] }; (sikap[id] = sikap[id] || []).push(cur); }
      else { const ev = c.ev; delete c.ev; cur = Object.assign({ t, c, p: [] }, ev ? { ev: 1 } : {}); (scenes[id] = scenes[id] || []).push(cur); nS++; }
      continue; }
    if (!cur || !/^- /.test(line)) continue;
    let s = line.slice(2).trim(), who = null; const w = s.match(/^([^"*:]{2,30}):\s*(?=")/); if (w) { who = NAME2ID[w[1].trim()]; if (!who) unknown['08 pembicara ' + w[1]] = 1; s = s.slice(w[0].length); }
    // satu baris bisa campur narasi *(…)* dan ucapan "…": dipecah berurutan jadi beberapa halaman
    const parts = s.match(/\*\([^)]*\)\*|"[^"]*"/g) || [];
    parts.forEach(x => { const pg = x[0] === '*' ? { act: '(' + x.slice(2, -2).trim() + ')' } : Object.assign({ s: x.slice(1, -1).trim() }, who ? { who } : {});
      if (cur.l) cur.l.push(pg.s || pg.act); else cur.p.push(pg);
      const len = (pg.s || pg.act).length; if (len > 120) console.warn('08: baris >120 karakter (' + id + '):', (pg.s || pg.act).slice(0, 40) + '…'); });
  }
}
// [3a-4] Event romance (09-event-romance.md) → NPC_EVENTS[id] = [{ n, title, at, jam, c, place, ajak, p, ask, o: [{ v, label, r }] }].
// Halaman: { s, who } ucapan ("Kamu:" → who 'me'), { act } narasi. Reaksi hadiah (10-hadiah.md) → NPC_GIFT_LINES[id] = { suka, biasa, benci }.
const events = {}, giftLines = {}; let nE = 0;
{
  const pages = (s, tag) => { const out = [], re = /(?:([A-Za-z][^"*:()]{1,28}):\s*)?("[^"]*"|\*\([^)]*\)\*)/g; let m;
    while ((m = re.exec(s))) { const who = m[1] ? (m[1].trim() === 'Kamu' ? 'me' : NAME2ID[m[1].trim()]) : null; if (m[1] && !who) unknown[tag + ' pembicara ' + m[1]] = 1;
      const x = m[2], pg = x[0] === '*' ? { act: '(' + x.slice(2, -2).trim() + ')' } : Object.assign({ s: x.slice(1, -1).trim() }, who ? { who } : {});
      if ((pg.s || pg.act).length > 120) console.warn(tag + ': baris >120 karakter:', (pg.s || pg.act).slice(0, 40) + '…'); out.push(pg); }
    return out; };
  let id = null, cur = null;
  for (const line of fs.readFileSync(path.join(DIR, '09-event-romance.md'), 'utf8').split(/\r?\n/)) {
    let h = line.match(/^##\s+(.+?)\s*$/); if (h) { id = NAME2ID[h[1]] || null; cur = null; continue; }
    h = line.match(/^###\s+E(\d)\s+(.+?)\s+@(\S+)\s+jam(\d+)((?:\s+[^|\s]+)*)\s*\|\s*(.+)$/);
    if (h) { if (!id) continue; const c = {}; h[5].trim().split(/\s+/).filter(Boolean).forEach(t => { let m;
        if (t === 'hujan') c.hujan = 1; else if ((m = t.match(/^stres>(\d+)$/))) c.stres = +m[1]; else if ((m = t.match(/^hari:(\d+)$/))) c.hari = m[1].split('').map(Number); else unknown['09 ' + t] = 1; });
      cur = { n: +h[1], title: h[2].trim(), at: h[3], jam: +h[4], c, place: h[6].trim(), ajak: '', p: [], ask: '', o: [] }; (events[id] = events[id] || []).push(cur); nE++; continue; }
    if (!cur || !/^- /.test(line)) continue;
    const s = line.slice(2).trim(); let m;
    if ((m = s.match(/^ajak:\s*"(.+)"$/))) cur.ajak = m[1];
    else if ((m = s.match(/^tanya:\s*(.+)$/))) cur.ask = m[1];
    else if ((m = s.match(/^([+-]\d+)\s+(.+?)\s+→\s+(.+)$/))) cur.o.push({ v: +m[1], label: m[2].replace(/\*\(/g, '(').replace(/\)\*/g, ')'), r: pages(m[3], '09 ' + id) });
    else cur.p.push(...pages(s, '09 ' + id));
  }
  Object.values(events).forEach(L => L.forEach(e => { if (e.o.length !== 3 || !e.ask || !e.ajak) console.warn('09: event tidak lengkap', e.title); }));
  let gid = null;
  for (const line of fs.readFileSync(path.join(DIR, '10-hadiah.md'), 'utf8').split(/\r?\n/)) {
    const h = line.match(/^##\s+(\w+)\s*$/); if (h) { gid = h[1]; continue; }
    const m = gid && line.match(/^- (suka|biasa|benci):\s*"(.+)"\s*$/); if (!m) continue;
    if (m[2].length > 120) console.warn('10: baris >120 karakter (' + gid + ')'); ((giftLines[gid] = giftLines[gid] || {})[m[1]] = giftLines[gid][m[1]] || []).push(m[2]);
  }
}
// [3a-5] Kencan, lamaran, pernikahan (11-kencan-nikah.md) → NPC_NIKAH[id] = { ajak:[s], kencan:{tempat:{p,ask,o:[{label,r}]}}, lamaran:{at,jam,place,jawab,p}, telp:{who,from,p}, nikah:{from,p}, momen:p }; NPC_NIKAH.laporan = [s].
// Pembicara bukan NPC (keluarga) → { s, nm: 'Ibu Adji' } tanpa potret.
const nikah = {};
{
  const pages = (s, tag) => { const out = [], re = /(?:([A-Za-z][^"*:()]{1,28}):\s*)?("[^"]*"|\*\([^)]*\)\*)/g; let m;
    while ((m = re.exec(s))) { const nm = m[1] && m[1].trim(), who = nm ? (nm === 'Kamu' ? 'me' : NAME2ID[nm]) : null;
      const x = m[2], pg = x[0] === '*' ? { act: '(' + x.slice(2, -2).trim() + ')' } : Object.assign({ s: x.slice(1, -1).trim() }, who ? { who } : nm ? { nm } : {});
      if ((pg.s || pg.act).length > 120) console.warn(tag + ': baris >120 karakter:', (pg.s || pg.act).slice(0, 40) + '…'); out.push(pg); }
    return out; };
  let id = null, cur = null, sec = null;
  for (const line of fs.readFileSync(path.join(DIR, '11-kencan-nikah.md'), 'utf8').split(/\r?\n/)) {
    let h = line.match(/^##\s+(.+?)\s*$/); if (h) { id = ['laporan', 'syukuran', 'toko'].includes(h[1]) ? h[1] : (NAME2ID[h[1]] || null); sec = cur = null;
      if (id === 'laporan') nikah.laporan = []; else if (id === 'syukuran') nikah.syukuran = []; else if (id === 'toko') nikah.toko = {}; else if (id) nikah[id] = { ajak: [], kencan: {} }; continue; }
    h = line.match(/^###\s+(.+?)\s*$/); if (h && id && !['laporan', 'syukuran', 'toko'].includes(id)) { const t = h[1], N = nikah[id]; let m;
      if (t === 'ajak') { sec = 'ajak'; cur = null; }
      else if ((m = t.match(/^kencan\s+@(\S+)$/))) { sec = 'kencan'; cur = N.kencan[m[1]] = { p: [], ask: '', o: [] }; }
      else if ((m = t.match(/^lamaran\s+@(\S+)\s+jam(\d+)\s*\|\s*(.+)$/))) { sec = 'lamaran'; cur = N.lamaran = { at: m[1], jam: +m[2], place: m[3].trim(), jawab: '', p: [] }; }
      else if ((m = t.match(/^telepon\s+(.+?)\s*\|\s*(.+)$/))) { sec = 'telp'; cur = N.telp = { who: m[1], from: m[2].trim(), p: [] }; }
      else if ((m = t.match(/^nikah\s*\|\s*(.+)$/))) { sec = 'nikah'; cur = N.nikah = { from: m[1].trim(), p: [] }; }
      else if (t === 'momen') { sec = 'momen'; cur = { p: [] }; N.momen = cur.p; }
      else { unknown['11 ' + t] = 1; sec = cur = null; }
      continue; }
    if (!id || !/^- /.test(line)) continue;
    const s = line.slice(2).trim(); let m;
    if (id === 'laporan') { const q = s.match(/^"(.+)"$/); if (q) nikah.laporan.push(q[1]); continue; }
    if (id === 'syukuran') { nikah.syukuran.push(...pages(s, '11 syukuran')); continue; }
    if (id === 'toko') { pages(s, '11 toko').forEach(pg => { if (pg.who) (nikah.toko[pg.who] = nikah.toko[pg.who] || []).push(pg.s); }); continue; }
    if (sec === 'ajak') { const q = s.match(/^"(.+)"$/); if (q) { if (q[1].length > 120) console.warn('11 ajak >120 (' + id + ')'); nikah[id].ajak.push(q[1]); } continue; }
    if (!cur) continue;
    if (sec === 'kencan' && (m = s.match(/^tanya:\s*(.+)$/))) cur.ask = m[1];
    else if (sec === 'kencan' && (m = s.match(/^([AB])\s+(.+?)\s+→\s+(.+)$/))) cur.o.push({ label: m[2].replace(/^"|"$/g, '').replace(/\*\(/g, '(').replace(/\)\*/g, ')'), r: pages(m[3], '11 ' + id) });
    else if (sec === 'lamaran' && (m = s.match(/^jawab:\s*"(.+)"$/))) cur.jawab = m[1];
    else cur.p.push(...pages(s, '11 ' + id));
  }
  Object.keys(nikah).forEach(k => { if (['laporan', 'syukuran', 'toko'].includes(k)) return; const N = nikah[k];
    if (!N.ajak.length || Object.keys(N.kencan).length !== 4 || !N.lamaran || !N.lamaran.jawab || !N.telp || !N.nikah || !N.momen) console.warn('11: data tidak lengkap', k);
    Object.entries(N.kencan).forEach(([pl, e]) => { if (e.o.length !== 2 || !e.ask) console.warn('11: kencan tidak lengkap', k, pl); }); });
}
const js = '/* [3a] DIBUAT OTOMATIS oleh tools/gen-npc-data.cjs dari design/narrative/npc/07a/07b/07c (+ 08 adegan Trust, 09 event romance, 10 hadiah). Jangan diedit langsung. */\n' +
  'const NPC_LINES = ' + JSON.stringify(out, null, 0).replace(/\],"/g, '],\n"') + ';\n' +
  'const NPC_SCENES = ' + JSON.stringify(scenes, null, 0).replace(/\],"/g, '],\n"') + ';\n' +
  'const NPC_SIKAP = ' + JSON.stringify(sikap, null, 0) + ';\n' +
  'const NPC_EVENTS = ' + JSON.stringify(events, null, 0).replace(/\},\{"n"/g, '},\n{"n"') + ';\n' + // [3a-4]
  'const NPC_GIFT_LINES = ' + JSON.stringify(giftLines, null, 0).replace(/\},"/g, '},\n"') + ';\n' +
  'const NPC_NIKAH = ' + JSON.stringify(nikah, null, 0).replace(/\]\},"/g, ']},\n"') + ';\n'; // [3a-5]
fs.writeFileSync(path.join(ROOT, 'src', 'npc-data.js'), js);
console.log('npc-data.js', n, 'baris,', Object.keys(out).length, 'NPC', Object.keys(unknown).length ? '· kondisi belum dikenal: ' + Object.keys(unknown).join(', ') : '');
