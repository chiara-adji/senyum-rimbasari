// Build draf Fase 3a-5 (kencan/lamaran/menikah): halaman design/v3/nikah.html dari nikah.src.html + lib v3 + src/nikah.js.
// Terpisah dari build.cjs supaya halaman lain dan game tidak ikut berubah sebelum draf di-ACC.
const fs=require('fs'),path=require('path');const D=__dirname;
const order=['base1','font','base2','char','cast','base3','furni','furni2','build','rooms','world','mini','tanjung','makan','npc','nikah'];
const lib=order.map(n=>fs.readFileSync(path.join(D,'src',n+'.js'),'utf8')).join('\n');
new Function(lib); // cek sintaks
const css=fs.readFileSync(path.join(D,'style.css'),'utf8');
let h=fs.readFileSync(path.join(D,'nikah.src.html'),'utf8');
h=h.replace('<link rel="stylesheet" href="style.css">','<style>\n'+css+'</style>').replace('<script src="lib.js"></script>',()=>'<script>\n'+lib+'\n</script>');
fs.writeFileSync(path.join(D,'nikah.html'),h);
console.log('built nikah.html',(h.length/1024|0)+' KB');
// Salinan draf game (tampilan panel 3a-5) → design/v3/nikah-game.html. Game utama (index.html) tidak disentuh.
{
  const ROOT=path.join(D,'..','..');
  const gOrder=['base1','font','base2','char','cast','base3','furni','furni2','build','rooms','world','mini','tanjung','makan','kebun','npc','nikah'];
  const glib=gOrder.map(n=>'/* ---- v3/'+n+'.js ---- */\n'+fs.readFileSync(path.join(D,'src',n+'.js'),'utf8')).join('\n');
  const npcSrc=['npc-data.js','npc3a.js','trust3a.js','nongkrong3a.js','hubungan3a.js'].map(f=>fs.readFileSync(path.join(ROOT,'src',f),'utf8')).join('\n')+'\n'+fs.readFileSync(path.join(D,'src','nikah-ui-draf.js'),'utf8');
  let game=fs.readFileSync(path.join(ROOT,'src','game.js'),'utf8').replace('/*@include npc*/',()=>npcSrc);
  new Function(glib);new Function(game);
  const html='<!DOCTYPE html><html lang="id"><head><meta charset="utf-8"><title>Senyum Rimbasari · DRAF 3a-5</title><style>html,body{margin:0;height:100%;background:#120c0a;overflow:hidden}body{display:flex;align-items:center;justify-content:center}canvas{image-rendering:pixelated}</style></head><body><canvas id="game" width="480" height="270"></canvas>\n<script>\n'+glib+'\n</script><script>window.BGM={};</script><script>\n'+game+'\n</script></body></html>';
  fs.writeFileSync(path.join(D,'nikah-game.html'),html);console.log('built nikah-game.html',(html.length/1024|0)+' KB');
}
