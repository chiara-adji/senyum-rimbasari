// Build Senyum Rimbasari -> index.html (satu file, tanpa aset/CDN eksternal).
// Isi: kode gambar v3 yang sudah di-ACC (design/v3/src/*.js, disalin apa adanya) + kode game (src/game.js).
// Jalankan: node tools/build-game.cjs
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const V3 = path.join(ROOT, 'design', 'v3', 'src');
const order = ['base1', 'font', 'base2', 'char', 'cast', 'base3', 'furni', 'furni2', 'build', 'rooms', 'world', 'mini', 'anterior' /* [3b-2] */, 'tanjung', 'makan', 'kebun', 'npc', 'nikah']; // [3a-5] nikah = Emas Lina, Toserba, Tanjung Arum lebar, Balai Kota pernikahan
const lib = order.map(n => '/* ---- v3/' + n + '.js ---- */\n' + fs.readFileSync(path.join(V3, n + '.js'), 'utf8')).join('\n');
// [3a] dialog harian Buku NPC → src/npc-data.js, lalu data + mesin NPC disisipkan ke dalam IIFE game di penanda include npc
require('./gen-npc-data.cjs');
const npcSrc = ['npc-data.js', 'npc3a.js', 'trust3a.js', 'nongkrong3a.js', 'hubungan3a.js', 'nikah3a.js' /* [3a-5] */, 'jurnal3b.js' /* [3b-1] */, 'alat3b.js' /* [3b-2] */, 'pasien3b.js' /* [3b-2] */, 'bleach3b.js' /* [3b-2] */].map(f => '/* ---- src/' + f + ' ---- */\n' + fs.readFileSync(path.join(ROOT, 'src', f), 'utf8')).join('\n');
let game = fs.readFileSync(path.join(ROOT, 'src', 'game.js'), 'utf8');
if (!game.includes('/*@include npc*/')) throw new Error('penanda /*@include npc*/ tidak ada di src/game.js');
game = game.replace('/*@include npc*/', () => npcSrc);
// BGM dari user (assets/audio/bgm/*.mp3) ditanam sebagai base64 supaya game tetap satu file (design/gdd/audio.md §3.4).
const BGM_DIR = path.join(ROOT, 'assets', 'audio', 'bgm');
const bgm = {}; if (fs.existsSync(BGM_DIR)) fs.readdirSync(BGM_DIR).filter(f => f.endsWith('.mp3')).forEach(f => { bgm[f.replace(/.mp3$/, '')] = fs.readFileSync(path.join(BGM_DIR, f)).toString('base64'); });
new Function(lib); new Function(game); // cek sintaks
const html = `<!DOCTYPE html>
<html lang="id"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Senyum Rimbasari</title>
<style>
html,body{margin:0;height:100%;background:#120c0a;overflow:hidden}
body{display:flex;align-items:center;justify-content:center}
canvas{image-rendering:pixelated;image-rendering:crisp-edges;display:block;cursor:default}
</style></head><body>
<canvas id="game" width="480" height="270"></canvas>
<script>
/* ================= DATA GAMBAR (draf visual v3, ACC 2026-11-11) ================= */
${lib}
</script>
<script>
window.BGM = ${JSON.stringify(bgm)};
</script>
<script>
${game}
</script>
</body></html>
`;
fs.writeFileSync(path.join(ROOT, 'index.html'), html);
console.log('index.html', (html.length / 1024).toFixed(0) + ' KB', '· BGM:', Object.keys(bgm).join(', ') || '-');
