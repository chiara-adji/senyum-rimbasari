/* ================= [2g] KEBUN HERBA & RUMAH LV 3–4 (draf 2026-11-13, menunggu ACC) =================
   Tanaman herba per tahap (bibit · tumbuh · siap · layu · mati), pot kecil untuk ambang jendela Kos,
   rak pot 2 tingkat untuk Kontrakan, bedeng halaman 12/16 petak untuk Rumah Subsidi/Estetik, gembor.
   Warna herba mengikuti HERB di mini.js. Cahaya dari kiri atas. */
const HERB_ST=['kosong','bibit','tumbuh','siap','layu','mati'];
const HB={mint:{l:'#9ae8b4',m:'#5cc88a',d:'#2f8a5a'},sirih:{l:'#6ac85a',m:'#3a9a44',d:'#1f6a2a'},lidah:{l:'#c8ecaa',m:'#8ac86a',d:'#4f8a3a'},
  kunyit:{l:'#8ad06a',m:'#4f9a3a',d:'#2e6a24'},cengkeh:{l:'#5aaa5a',m:'#2f7a3a',d:'#1a4a24'},serai:{l:'#d8e08a',m:'#a8b84a',d:'#6a7a2a'}};
const DRY={l:'#d8c070',m:'#b89a4a',d:'#7a6030'},DEAD={l:'#a89478',m:'#7a6a52',d:'#4a3e30'};
/** Tanaman di atas tanah. cx = tengah, by = garis tanah. st 1..5. */
function herbPlant(x,k,st,cx,by){
  if(st===0)return;
  if(st===1){// bibit: dua daun kecil
    R(x,cx,by-3,1,3,'#4f8a3a');P(x,cx-1,by-4,'#86c23a');P(x,cx-2,by-4,'#5c9a30');P(x,cx+1,by-4,'#86c23a');P(x,cx+2,by-5,'#5c9a30');return;}
  if(st===5){// mati: batang kering bengkok, daun gugur di tanah
    R(x,cx,by-5,1,5,DEAD.d);P(x,cx+1,by-6,DEAD.d);P(x,cx+2,by-6,DEAD.m);P(x,cx-1,by-3,DEAD.m);P(x,cx-2,by-1,DEAD.l);P(x,cx+2,by-1,DEAD.m);return;}
  const g=st===2?.6:1,c=st===4?DRY:HB[k],droop=st===4?1:0;
  const L=(a,b,c2,d,w,col)=>line(x,cx+a,by+b,cx+c2,by+d,w,col);
  if(k==='mint'){// rumpun rimbun: kubah daun bulat bergerigi, urat terang
    const r=st===2?3:4,cy=by-r-1+droop;R(x,cx,by-2,1,2,c.d);ellipse(x,cx,cy,r+1,r,c.d);ellipse(x,cx-1,cy-1,r,r-1,c.m);
    const lv=st===2?[[-2,-1],[1,-2],[0,1]]:[[-3,-1],[0,-3],[2,0],[-1,1],[3,-2]];lv.forEach(([a,b2])=>{R(x,cx+a,cy+b2,2,1,c.l);P(x,cx+a,cy+b2+1,c.d);});
    for(let i=-r;i<=r;i+=2)P(x,cx+i,cy-r+(Math.abs(i)>r-2?2:0),c.l);}
  else if(k==='sirih'){// daun jantung merambat di ajir
    const H=Math.round(10*g);R(x,cx+2,by-H-1,1,H+1,'#8a6a3a');R(x,cx+2,by-H-1,1,1,'#b8945a');
    const leaf=(X,Y,f)=>{R(x,X,Y,3,2,c.m);P(x,X+(f?2:0),Y-1,c.m);P(x,X+(f?0:2),Y-1,c.l);P(x,X+1,Y+2,c.d);};
    leaf(cx-2,by-3+droop,0);if(H>6){leaf(cx+2,by-6+droop,1);leaf(cx-1,by-8+droop,0);}else leaf(cx+1,by-6+droop,1);
    if(st===3){leaf(cx+3,by-10,1);}R(x,cx,by-3,1,3,c.d);}
  else if(k==='lidah'){// roset: daun tebal di pangkal, meruncing ke ujung, bintik putih
    const H=Math.round(9*g);const tips=[[-5,-H+4],[-2,-H],[2,-H],[5,-H+4]];
    tips.forEach(([a,b],i)=>{const bb=b+droop*3,col=i%2?c.l:c.m;L(0,-1,a*.5,bb*.5,2,col);L(a*.5,bb*.5,a,bb,1,col);});
    L(0,-1,0,-H+2+droop*2,2,c.d);L(0,-H+2+droop*2,0,-H-1+droop*2,1,c.m);
    if(st===3){P(x,cx-2,by-3,'#ffffff');P(x,cx+2,by-4,'#ffffff');}R(x,cx-2,by-1,5,1,c.d);}
  else if(k==='kunyit'){// daun lebar memanjang, rimpang oranye di tanah
    const H=Math.round(11*g);L(0,0,-3,-H+2+droop*3,2,c.m);L(0,0,1,-H,2,c.m);L(0,0,4,-H+3+droop*3,2,c.d);L(0,-1,0,-H+1,1,c.l);
    if(st===3){R(x,cx-3,by-1,3,1,'#e8a020');P(x,cx+2,by-1,'#f2c040');}}
  else if(k==='cengkeh'){// pohon kecil: batang cokelat, daun mengkilap, kuncup merah
    const H=Math.round(11*g);R(x,cx,by-H+3,1,H-3,'#6a4424');disc(x,cx,by-H+2+droop,st===2?2:3,c.m);P(x,cx-2,by-H+1,c.l);P(x,cx-1,by-H,c.l);disc(x,cx+1,by-H+3+droop,1,c.d);
    if(st===3){P(x,cx-2,by-H+3,'#e05a4a');P(x,cx+2,by-H,'#c8414b');P(x,cx,by-H-1,'#e05a4a');P(x,cx+3,by-H+2,'#9a5430');}}
  else if(k==='serai'){// rumpun daun tipis tinggi melengkung
    const H=Math.round(12*g);[[-3,-H+3],[-1,-H],[1,-H-1],[3,-H+2],[4,-H+5]].forEach(([a,b],i)=>L(0,0,a+(droop&&i>2?2:0),b+droop*4,1,i%2?c.l:c.m));R(x,cx-1,by-2,3,2,'#c8a46a');}}
/** Pot tanah liat kecil (7×5) + tanaman. Lebar sprite 11, tinggi 18, alas pot di bawah. */
function herbPot(k,st,wet){return spr(11,18,x=>{RR(x,2,13,7,5,'#b55a2e',1);R(x,1,12,9,2,'#d07a44');R(x,1,12,9,1,'#e8965a');R(x,7,14,1,3,'#8a4020');
  R(x,2,12,7,1,wet?'#4a2e1e':'#7a5232');herbPlant(x,k,st,5,12);});}
/** Ambang jendela Kos kamar 5: papan + 4 pot. plants = [[k,st],...] (null = pot kosong). */
function sillPots(plants,wet){return spr(36,20,x=>{R(x,0,16,36,3,'#c8a46a');R(x,0,16,36,1,'#e8c890');R(x,0,19,36,1,'#7a5232');
  plants.forEach((p,i)=>x.drawImage(herbPot(p?p[0]:'mint',p?p[1]:0,wet),i*9-1,0));});}
/** Rak pot Kontrakan: 2 tingkat × 4 pot, kayu, dirapatkan ke dinding. */
function rakPot(plants,wet){const W=44,H=40;return spr(W,H,x=>{const W0='#a0703e',WL='#c8945a',WDk='#6a4424';
  R(x,1,4,2,36,WDk);R(x,W-3,4,2,36,WDk);R(x,1,4,1,36,W0);R(x,W-3,4,1,36,W0);
  [[18,'top'],[36,'bot']].forEach(([y])=>{R(x,0,y,W,3,W0);R(x,0,y,W,1,WL);R(x,0,y+3,W,1,WDk);});
  plants.forEach((p,i)=>{const row=i<4?0:1,col=i%4;x.drawImage(herbPot(p?p[0]:'mint',p?p[1]:0,wet),2+col*10,(row?36:18)-17);});});}
/** Bedeng halaman: bingkai kayu, petak tanah cols × rows (sel 11×9). plants = [[k,st],...] baris demi baris. */
function bedeng(cols,rows,plants,wet){const CW=11,CH=9,W=cols*CW+6,H=rows*CH+16;return spr(W,H,x=>{const top=12;
  RR(x,0,top,W,rows*CH+4,'#7a5232',2);R(x,1,top,W-2,1,'#a07448');R(x,0,H-2,W,2,'#4a2e1e');
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const X=3+c*CW,Y=top+2+r*CH;R(x,X,Y,CW-1,CH-1,wet?'#4a2e1e':'#6a4630');R(x,X,Y,CW-1,1,wet?'#5a3a28':'#86603e');
    if(!wet&&(r+c)%3===0)P(x,X+3,Y+4,'#86603e');}
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const p=plants[r*cols+c];if(p)herbPlant(x,p[0],p[1],3+c*CW+5,top+2+r*CH+CH-3);}
  for(let c=0;c<=cols;c++)R(x,2+c*CW,top+1,1,rows*CH+2,'#5a3a24');});}
/** Gembor (alat siram) seng. */
function gembor(){return spr(14,11,x=>{RR(x,2,4,8,7,'#8aa4b8',2);R(x,3,4,6,1,'#c9d8e4');R(x,8,6,2,4,'#5a7488');line(x,9,6,13,2,1,'#6a8aa0');R(x,12,1,2,2,'#8aa4b8');
  R(x,3,1,6,1,'#5a7488');P(x,2,2,'#5a7488');P(x,9,2,'#5a7488');P(x,2,3,'#5a7488');P(x,9,3,'#5a7488');});}
/** Bungkus bibit 16×16 (ikon tas/panel): kantong kertas + gambar herba. */
const SEEDI={};function seedImg(k){if(SEEDI[k])return SEEDI[k];const[c,x]=cv(16,16);
  RR(x,3,2,10,13,'#e8d8b0',1);R(x,3,2,10,2,'#c8b488');R(x,4,4,8,1,'#fbf4e2');for(let i=4;i<12;i+=2)P(x,i,2,'#a8946a');
  const im=herbImg(k);x.drawImage(im,0,0,16,16,4,5,8,8);R(x,4,13,8,1,HERB[k][1]);
  return SEEDI[k]=softOutline(c,.5);}
