/* ================= TANJUNG ARUM (Fase 2f, DRAF — menunggu ACC user) =================
   Zona kota pelabuhan 1 layar (480×270, tanpa gulir): halte bus, Bahari Medika, toko ikan, trotoar pelabuhan,
   pantai, dermaga kayu, perahu nelayan. Interior Bahari Medika versi "Alat & Bahan" (bahari2) ditambahkan sebagai
   kunci baru, interior lama (bahari) tidak diubah. GDD §11.1. */

/** Halte bus: atap seng biru, tiang, panel peta rute, bangku, plang HALTE. */
function busShelter(){const W=72,H=56;const[c,x]=cv(W,H);
  // panel belakang + peta rute
  RR(x,8,14,56,26,'#d8e4ea',1);R(x,9,15,54,1,'#ffffff');R(x,8,38,56,2,'#9aaab4');
  RR(x,12,18,22,15,'#fbf4e2',1);line(x,15,29,22,22,1,'#c8414b');line(x,22,22,30,26,1,'#c8414b');disc(x,15,29,1,'#2a5a44');disc(x,30,26,1,'#2f5d9e');
  Tm(x,'RUTE',38,19,'#2a5a44');R(x,38,27,20,1,'#9aaab4');R(x,38,30,16,1,'#9aaab4');
  // tiang
  RR(x,6,12,3,40,'#5a6470',1);RR(x,63,12,3,40,'#5a6470',1);R(x,6,12,1,40,'#8a96a2');R(x,63,12,1,40,'#8a96a2');
  // bangku
  RR(x,14,41,44,4,B.wood2,1);R(x,14,41,44,1,B.wood3);R(x,16,45,2,6,'#5a6470');R(x,54,45,2,6,'#5a6470');
  // atap seng bergelombang
  RR(x,0,6,72,8,'#2f5d9e',1);for(let i=2;i<70;i+=4)R(x,i,7,2,6,'#4d84c8');R(x,0,6,72,1,'#7fb0e6');R(x,0,13,72,1,'#1f3a66');
  x.fillStyle='rgba(20,30,60,.25)';x.fillRect(4,14,64,3);
  plank(x,36,0,'HALTE',{bg:'#2a5a44',fg:'#ffffff',icon:'bus'});
  return softOutline(c);}

/** Bus antarkota tampak samping (menghadap kanan): krem bergaris hijau, papan tujuan. dest = teks papan. */
function busSide(dest='RIMBASARI'){const W=Math.max(96,TWm(dest)+20),H=40;const[c,x]=cv(W,H);
  RR(x,2,4,92,28,'#f2ead2',3);R(x,4,4,88,1,'#ffffff');R(x,2,22,92,4,'#2a5a44');R(x,2,26,92,1,'#5a9a70');R(x,2,30,92,2,'#c8bfa4');
  for(let k=0;k<6;k++){RR(x,8+k*12,8,10,11,'#3a6a8a',1);R(x,9+k*12,9,8,2,'#a8dcf4');R(x,9+k*12,11,2,7,'#5a90b8');}
  RR(x,82,7,10,15,'#3a6a8a',1);R(x,83,8,8,3,'#a8dcf4');// kaca depan
  RR(x,74,8,6,22,'#c8bfa4',1);R(x,76,10,2,18,'#3a6a8a');// pintu
  const dw=TWm(dest)+4;RR(x,10,0,dw,6,'#1f2a3a',1);Tm(x,dest,12,0,'#f2c84a');
  R(x,90,24,4,3,'#ffe27a');R(x,2,24,3,3,'#e84a3a');
  [20,70].forEach(a=>{disc(x,a,33,6,'#2a2a2e');disc(x,a,33,3,'#8a8a94');disc(x,a,33,1,'#d8dce4');});
  return softOutline(c);}

/** Perahu nelayan (jukung) tampak atas-samping, lambung bergaris warna. */
function fishBoat(col='#2f5d9e',col2='#e3aa3c'){return spr(62,24,x=>{
  polyPx(x,[[0,8],[6,6],[56,6],[62,8],[54,18],[8,18]],'#f4f1e6');polyPx(x,[[2,11],[60,11],[56,15],[6,15]],col);R(x,8,13,46,1,col2);
  R(x,8,7,46,3,'#8a5a30');R(x,9,7,44,1,'#b8864e');for(let i=12;i<52;i+=8)R(x,i,7,1,3,'#5a3a20');
  R(x,30,0,2,8,WD.m);R(x,30,0,1,8,WD.h);polyPx(x,[[32,1],[40,4],[32,6]],'#c8414b');
  disc(x,6,9,1,'#2a2a2e');R(x,44,19,10,2,'#5a3a20');});}
/** Kelapa: batang melengkung + pelepah + buah. */
function coconutTree(pal,seed=1,lean=1){const W=48,H=62;const[c,x]=cv(W,H);const rr=rng(seed);
  for(let j=0;j<44;j++){const a=24+lean*Math.round(Math.sin(j/44*1.6)*6)-lean*6;R(x,a-2,18+j,5,1,j%5===0?'#7a5a34':'#a8844e');P(x,a-2,18+j,'#c8a46a');}
  const fr=[[-1,-.2],[1,-.2],[-1,.5],[1,.5],[-.3,-1],[.4,-1],[0,.9]];fr.forEach(([dx,dy],k)=>{for(let t=0;t<20;t++){const px=24+dx*t*1.1,py=16+dy*t*.8+Math.max(0,t-8)*.35;R(x,px|0,py|0,2,2,t%3?pal.g1:pal.g0);if(t>4&&t%3===0){P(x,(px|0),(py|0)+2,pal.g0);P(x,(px|0)+1,(py|0)-1,pal.g2);}}});
  disc(x,22,19,2,'#6a4a20');disc(x,26,20,2,'#7a5a24');disc(x,24,22,2,'#5a3a18');return softOutline(c);}
function fishCrate(){return spr(18,14,x=>{RR(x,0,3,18,11,'#2f6ab0',1);R(x,1,3,16,1,'#5a90d8');for(let i=3;i<16;i+=4)R(x,i,6,2,6,'#1f4a80');
  for(let k=0;k<4;k++){ellipse(x,4+k*3,3,3,1,k%2?'#c9d0da':'#a8b4c0');P(x,2+k*3,3,'#2a2a2e');}});}
function netRack(){return spr(30,28,x=>{R(x,2,4,2,24,WD.m);R(x,26,4,2,24,WD.m);R(x,1,3,28,2,WD.l);
  for(let j=6;j<22;j+=3)for(let i=4;i<26;i+=3){P(x,i,j,'#5a8a7a');P(x,i+1,j+1,'#7aaa98');}for(let i=4;i<26;i+=6)disc(x,i,22,1,'#e86a1a');});}
function bollard(){return spr(8,10,x=>{RR(x,1,2,6,8,'#3a3a44',2);R(x,2,3,1,6,'#6a6a74');ellipse(x,4,2,3,1,'#5a5a64');R(x,0,5,8,1,'#c8a46a');});}
function lifeRing(){return spr(14,22,x=>{R(x,6,8,2,14,WD.m);disc(x,7,7,6,'#e8473f');disc(x,7,7,3,'#00000000');x.clearRect(5,5,5,5);for(let a=0;a<4;a++){const t=a*Math.PI/2+.4;R(x,7+Math.cos(t)*5|0,7+Math.sin(t)*5|0,2,2,'#ffffff');}});}
function gull(f=0){return spr(11,6,x=>{if(f){R(x,1,1,3,1,'#ffffff');R(x,7,1,3,1,'#ffffff');}else{P(x,1,3,'#ffffff');R(x,2,2,2,1,'#ffffff');R(x,7,2,2,1,'#ffffff');P(x,9,3,'#ffffff');}R(x,4,2,3,2,'#f2f2ea');P(x,5,4,'#e3aa3c');},'#6a7a88');}
/** Laut + garis pantai + dermaga kayu (digambar di tanah zona). */
function harborSea(Y0,pierX){return (x,pal)=>{const W=x.canvas.width,H=x.canvas.height;const hj=pal===PAL.hujan;
  for(let j=Y0;j<H;j++){const t=(j-Y0)/(H-Y0);x.fillStyle=t<.15?pal.w1:t<.55?mixH(pal.w1,pal.w0,(t-.15)/.4):pal.w0;x.fillRect(0,j,W,1);}
  const rr=rng(77);for(let k=0;k<70;k++){const a=rr()*W|0,b=Y0+8+rr()*(H-Y0-8)|0;R(x,a,b,4+(rr()*6|0),1,pal.w2);}
  // buih di tepi pantai (bergelombang) + pasir basah
  for(let i=0;i<W;i++){const o=Math.round(Math.sin(i/9)*1.5+Math.sin(i/23)*1);R(x,i,Y0-2+o,1,2,hj?'#8a7a5e':'#c8aa74');P(x,i,Y0+o,'#ffffff');if(i%3)P(x,i,Y0+1+o,'#d8f2ff');}
  // dermaga
  const pw=26,pt=Y0-10;for(let j=pt;j<H;j++){R(x,pierX,j,pw,1,j%5===0?'#5a3a20':(j%10<5?B.wood2:B.wood3));}
  R(x,pierX-1,pt,1,H-pt,'#4a2a18');R(x,pierX+pw,pt,1,H-pt,'#4a2a18');
  for(let j=pt+8;j<H;j+=16){[pierX-2,pierX+pw-1].forEach(a=>{RR(x,a,j,4,5,'#4a2a18',1);R(x,a+1,j,2,1,'#7a4a28');});}
  x.fillStyle='rgba(10,30,60,.25)';x.fillRect(pierX+pw+1,Y0+2,3,H-Y0);};}
/** Kotak bahan klinik bertumpuk (karton, label palang hijau). */
function bahanStack(){return spr(30,30,x=>{[[0,16,16,14],[14,16,16,14],[6,3,18,14]].forEach(([a,b,w,h],k)=>{box34(x,a,b,w,4,h-4,'#e8c890','#c8945a');R(x,a+4,b+7,7,5,'#fbf4e2');R(x,a+7,b+8,1,3,'#3f8f4a');R(x,a+6,b+9,3,1,'#3f8f4a');if(k===2){R(x,a+12,b+6,4,1,'#c8414b');}});});}
/** Rantai + gembok di depan rak terkunci (dipakai sebagai over). */
function lockChain(X,Y,W,H){return x=>{for(let t=0;t<=1;t+=.04){[[X,Y,X+W,Y+H],[X+W,Y,X,Y+H]].forEach(([a,b,c2,d])=>{const px=a+(c2-a)*t,py=b+(d-b)*t+Math.sin(t*Math.PI)*4;RR(x,px|0,py|0,3,2,'#8a8a94',1);P(x,px|0,py|0,'#c9d0da');});}
  const cx=X+W/2-5|0,cy=Y+H/2-2|0;RR(x,cx+2,cy-5,6,7,'#5a5a64',2);x.clearRect(cx+4,cy-3,2,4);RR(x,cx,cy,10,9,'#e3aa3c',1);R(x,cx+1,cy+1,8,1,'#fff2a8');R(x,cx+4,cy+3,2,3,'#5a3a10');
  };}

/* ---------- bangunan pengisi (tidak bisa dimasuki) ---------- */
EXT.halteTA=busShelter();
EXT.tokoIkan=ruko({w:74,kind:'toko',wall:'#f4e2c0',door:'wood',frame:'#8a4a28',awning:['#ffffff','#c8414b'],sign:{text:'IKAN SEGAR',bg:'#c8414b',fg:'#ffffff'},roof:[B.broof0,B.broof1,B.broof2,B.broof3],pipe:'L'});

/* ---------- zona (480×270; drawZone menggambar kanvas 432, halaman memotong 270 teratas) ---------- */
const TA_SEA=222,TA_PIER=372;
const ZONE_TANJUNG={name:'Tanjung Arum',no:'TA',seed:21,w:480,h:270,
  def:[['c',0,150,480,24,0],['p',0,174,480,36,4],['s',0,206,480,20,0]],
  blds:[['halteTA',6,150,null],['bahari',150,150,152],['tokoIkan',318,150,152]],
  ground:[harborSea(TA_SEA,TA_PIER)],
  trees:[[-12,-22,14,61],[96,-26,13,62],[284,-24,12,63],[440,-22,14,64],[118,40,11,65]],
  props:[[()=>busSide('RIMBASARI'),74,138],[p=>coconutTree(p,1,1),92,150],[p=>coconutTree(p,2,-1),448,148],[p=>coconutTree(p,3,1),-14,150],
    [()=>lamp(),142,176],[()=>lamp(),300,176],[()=>lamp(),456,176],[()=>bench(),206,188],[()=>bench(),250,188],
    [()=>fishCrate(),412,184],[()=>fishCrate(),424,190],[()=>barrel(),400,188],[netRack,334,180],[lifeRing,356,186],
    ...[60,100,160,200,240,280,330,440].map(a=>[bollard,a,212]),
    [()=>fishBoat('#2f5d9e','#e3aa3c'),300,236],[()=>fishBoat('#c8414b','#ffffff'),404,250],[()=>fishBoat('#3f8f4a','#f2c84a'),208,246],
    [()=>aBoardSpr(),180,174]],
  block:[[0,0,480,60],[0,TA_SEA-4,480,60]],exits:[[42,176,'D']],
  npcs:[]};
function aBoardSpr(){return spr(18,22,x=>aBoard(x,1,0,['#ffffff','#f2c84a','#ffffff'],'#2a7a8a'));}
/** Gambar zona Tanjung Arum ukuran 480×270. */
function drawTanjung(pal,opt={}){const full=drawZone(ZONE_TANJUNG,pal,opt);const[c,x]=cv(480,270);x.drawImage(full,0,0);
  [[60,236,0],[150,228,1],[268,252,0],[440,232,1]].forEach(([a,b,f])=>x.drawImage(gull(f),a,b));
  if(opt.label){const n='HALTE · naik bus pulang';const w=TW(n,8)+8;RR(x,8,198,w,11,'rgba(30,15,8,.78)',2);T(x,n,12,200,'#fff2d4',8);
    const m='BAHARI MEDIKA (bisa dimasuki)';const w2=TW(m,8)+8;RR(x,150,8,w2,11,'rgba(30,15,8,.78)',2);T(x,m,154,10,'#fff2d4',8);}
  return c;}

/* ---------- interior Bahari Medika versi Alat & Bahan ---------- */
ROOMS3.bahari2={name:'Bahari Medika · Alat & Bahan',desc:'Rak bahan klinik + konter beli bahan (kiri), alat T1 di etalase, rak alat T2 terkunci (kanan), etalase perhiasan Ci Lina.',wall:'mint',floor:'tileWhite',
  wallDeco:[wPlate(14,10,'BAHAN'),wPlate(96,10,'ALAT & BAHAN','#2a7a8a','#ffffff'),wPlate(208,10,'ALAT T2','#d8dde4','#3a3f4a'),wClock(72,22)],
  items:()=>[[shelfUnit(50,44,'meds',2),12,24],[bahanStack(),66,44],[displayCase(44),100,56],[shelfUnit(50,44,'tools',4),206,24],
    [counter(84,'#2a7a8a','#e0f0f6'),36,110],[register(),52,106,30],[bahanStack(),14,74],[displayCase(36),214,118],[potPlant(0,1),246,136],[potPlant(2),4,140]],
  chars:[['hendra',78,84]]};
ROOM_EXTRA.bahari2={floorDeco:[rug(110,140,80,24,RUG.mint)],over:[lockChain(208,30,46,34),lampGlow(192,4,10,44)]};

/* ---------- layar transisi perjalanan bus ---------- */
/** Adegan perjalanan bus tanpa teks (jalan, bukit, laut, bus bergerak). p 0..1. Teks di busTransition (draf) atau lapisan HD (game). */
function busScene(x,p,to){R(x,0,0,480,270,'#1a0f0c');panel(x,96,58,288,150);
  R(x,112,112,256,46,'#cfe8f0');for(let i=0;i<256;i++){const h=8+Math.round(Math.sin(i/30)*5+Math.sin(i/11)*2);R(x,112+i,140-h,1,h,'#7aaa5a');}
  if(/tanjung/i.test(to))R(x,112+150,136,106,6,'#4aa0df');
  R(x,112,140,256,12,'#8e8884');for(let i=-14;i<256;i+=14){const d=112+i+((p*60)|0)%14,l=Math.max(112,d),r=Math.min(368,d+7);if(r>l)R(x,l,145,r-l,1,'#f2ead2');}
  const bs=busSide(to.toUpperCase());x.drawImage(bs,(112+p*(256-bs.width))|0,110);}
/** Layar perjalanan bus lengkap (draf v3). p 0..1 progres; dari/ke nama kota; jam awal (desimal). */
function busTransition(x,p,from,to,h0,legH=2){busScene(x,p,to);
  TC(x,'Naik bus ke',240,70,'#6a3416',9);TC(x,to.toUpperCase(),240,82,'#3a1a08',12,'#fff2d4');
  TC(x,from+'  >  '+to,240,160,'#6a3416',9,null,true);
  const hh=h0+legH*p,H=Math.floor(hh),M=Math.floor((hh-H)*60/10)*10;bar(x,128,174,224,8,p,'#5ccf4a');
  TC(x,'Jam '+String(H).padStart(2,'0')+':'+String(M).padStart(2,'0')+' · perjalanan '+legH+' jam',240,186,'#3a1a08',9);
  TC(x,'Tips: Bahari Medika buka 08-17, termasuk Minggu.',240,216,'#f2d8a8',9);TC(x,'Waktu berjalan selama perjalanan',240,230,'#b89070',9);}
