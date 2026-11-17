// Build draf Fase 3b-1 (Jurnal & challenge): salinan draf game design/v3/jurnal-game.html.
// Game utama (index.html, src/) TIDAK disentuh. Kait disisipkan lewat penggantian teks di salinan saja.
const fs = require('fs'), path = require('path'); const D = __dirname, ROOT = path.join(D, '..', '..');
const gOrder = ['base1', 'font', 'base2', 'char', 'cast', 'base3', 'furni', 'furni2', 'build', 'rooms', 'world', 'mini', 'tanjung', 'makan', 'kebun', 'npc', 'nikah'];
const glib = gOrder.map(n => '/* ---- v3/' + n + '.js ---- */\n' + fs.readFileSync(path.join(D, 'src', n + '.js'), 'utf8')).join('\n');
const npcSrc = ['npc-data.js', 'npc3a.js', 'trust3a.js', 'nongkrong3a.js', 'hubungan3a.js', 'nikah3a.js'].map(f => fs.readFileSync(path.join(ROOT, 'src', f), 'utf8')).join('\n')
  + '\n' + fs.readFileSync(path.join(D, 'src', 'jurnal-ui-draf.js'), 'utf8');
let game = fs.readFileSync(path.join(ROOT, 'src', 'game.js'), 'utf8').replace('/*@include npc*/', () => npcSrc);
const rep = (a, b) => { if (!game.includes(a)) throw new Error('kait tidak ketemu: ' + a); game = game.replace(a, b); };
rep("k: 'book', g: 'gift' }", "k: 'book', g: 'gift', j: 'jurnal' }");
rep("drawNikahChip(); // [3a-5] chip hari pernikahan", "drawNikahChip(); drawJurnalChips(); /* [3b-1 draf] */");
rep("if (hit('book')) { openBook(); return; }", "if (hit('jurnal')) { openJurnal(); return; } if (hit('book')) { openBook(); return; }");
rep("npc: { act: npcAct,", "jd: { open: openJurnal, card: chCard, skip: chSkipCard, state: () => JD }, npc: { act: npcAct,");
new Function(glib); new Function(game);
const html = '<!DOCTYPE html><html lang="id"><head><meta charset="utf-8"><title>Senyum Rimbasari · DRAF 3b-1</title><style>html,body{margin:0;height:100%;background:#120c0a;overflow:hidden}body{display:flex;align-items:center;justify-content:center}canvas{image-rendering:pixelated}</style></head><body><canvas id="game" width="480" height="270"></canvas>\n<script>\n' + glib + '\n</script><script>window.BGM={};</script><script>\n' + game + '\n</script></body></html>';
fs.writeFileSync(path.join(D, 'jurnal-game.html'), html); console.log('built jurnal-game.html', (html.length / 1024 | 0) + ' KB');
