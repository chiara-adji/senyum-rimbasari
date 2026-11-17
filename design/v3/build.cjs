// Build draf v3: gabung src/*.js -> lib, lalu inline CSS+lib ke tiap halaman di pages/ -> v3/*.html
const fs=require('fs'),path=require('path');const D=__dirname;
const order=['base1','font','base2','char','cast','base3','furni','furni2','build','rooms','world','mini','tanjung','makan','npc'];
const lib=order.map(n=>fs.readFileSync(path.join(D,'src',n+'.js'),'utf8')).join('\n');
new Function(lib); // cek sintaks
const css=fs.readFileSync(path.join(D,'style.css'),'utf8');
for(const f of fs.readdirSync(path.join(D,'pages')).filter(f=>f.endsWith('.html'))){
  let h=fs.readFileSync(path.join(D,'pages',f),'utf8');
  h=h.replace('<link rel="stylesheet" href="style.css">','<style>\n'+css+'</style>').replace('<script src="lib.js"></script>',()=>'<script>\n'+lib+'\n</script>');
  fs.writeFileSync(path.join(D,f),h);}
console.log('built',fs.readdirSync(path.join(D,'pages')).join(', '));
