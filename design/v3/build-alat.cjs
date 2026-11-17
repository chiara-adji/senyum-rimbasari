// Build draf Fase 3b-2 (Rak alat T2): salinan draf game design/v3/alat-game.html.
// Game utama (index.html, src/) TIDAK disentuh. Kait disisipkan lewat penggantian teks di salinan saja.
const fs = require('fs'), path = require('path'); const D = __dirname, ROOT = path.join(D, '..', '..');
const gOrder = ['base1', 'font', 'base2', 'char', 'cast', 'base3', 'furni', 'furni2', 'build', 'rooms', 'world', 'mini', 'tanjung', 'makan', 'kebun', 'npc', 'nikah'];
const glib = gOrder.map(n => '/* ---- v3/' + n + '.js ---- */\n' + fs.readFileSync(path.join(D, 'src', n + '.js'), 'utf8')).join('\n');
const npcSrc = ['npc-data.js', 'npc3a.js', 'trust3a.js', 'nongkrong3a.js', 'hubungan3a.js', 'nikah3a.js', 'jurnal3b.js'].map(f => fs.readFileSync(path.join(ROOT, 'src', f), 'utf8')).join('\n')
  + '\n' + fs.readFileSync(path.join(D, 'src', 'alat-t2-draf.js'), 'utf8');
let game = fs.readFileSync(path.join(ROOT, 'src', 'game.js'), 'utf8').replace('/*@include npc*/', () => npcSrc);
const rep = (a, b) => { if (!game.includes(a)) throw new Error('kait tidak ketemu: ' + a); game = game.replace(a, b); };
rep("{ label: 'Alat', keep: true, fn: () => { tab = 'alat'; if (game.overlay) game.overlay.sel = 0; } }", "{ label: 'Alat', fn: () => openRakT2() }");
rep("jr: JR_TEST,", "at2: { open: openRakT2, st: AT2 }, jr: JR_TEST,");
new Function(glib); new Function(game);
const html = '<!DOCTYPE html><html lang="id"><head><meta charset="utf-8"><title>Senyum Rimbasari · DRAF 3b-2</title><style>html,body{margin:0;height:100%;background:#120c0a;overflow:hidden}body{display:flex;align-items:center;justify-content:center}canvas{image-rendering:pixelated}</style></head><body><canvas id="game" width="480" height="270"></canvas>\n<script>\n' + glib + '\n</script><script>window.BGM={};</script><script>\n' + game + '\n</script></body></html>';
fs.writeFileSync(path.join(D, 'alat-game.html'), html); console.log('built alat-game.html', (html.length / 1024 | 0) + ' KB');
