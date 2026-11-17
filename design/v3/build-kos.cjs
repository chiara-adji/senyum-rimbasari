// Build satu halaman draf (pages/kos-kontrak.html) tanpa membangun ulang halaman lain.
const fs=require('fs'),path=require('path');const D=__dirname;
const order=['base1','font','base2','char','cast','base3','furni','furni2','build','rooms','world','mini'];
const lib=order.map(n=>fs.readFileSync(path.join(D,'src',n+'.js'),'utf8')).join('\n');
const css=fs.readFileSync(path.join(D,'style.css'),'utf8');
let h=fs.readFileSync(path.join(D,'pages','kos-kontrak.html'),'utf8');
h=h.replace('<link rel="stylesheet" href="style.css">','<style>\n'+css+'</style>').replace('<script src="lib.js"></script>',()=>'<script>\n'+lib+'\n</script>');
fs.writeFileSync(path.join(D,'kos-kontrak.html'),h);console.log('built kos-kontrak.html');
