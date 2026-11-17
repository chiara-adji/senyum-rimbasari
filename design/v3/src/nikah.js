/* ================= KENCAN · LAMARAN · MENIKAH (Fase 3a-5, DRAF — menunggu ACC user) =================
   Usulan ACC user 2026-11-16 ("ACC semua"): Toko Emas "Emas Lina" + Toserba "Samudra" di Tanjung Arum (zona dilebarkan
   480 → 768, kamera bergulir), interior keduanya, 33 ikon barang hadiah baru, keluarga kandidat (char3, tanpa aset baru),
   Balai Kota versi pernikahan (pelaminan, janur, kursi tamu). Dimuat SETELAH tanjung.js (mengubah ZONE_TANJUNG). */

/* ---------- ikon kecil papan nama (9 px, palet IC9P) ---------- */
IC9.ring=fromRows(['...lw....','..kllk...','...kk....','..kyyk...','.ky..yk..','.ky..yk..','..kyyk...'],IC9P);
IC9.bag=fromRows(['...kkk...','..k...k..','.kbbbbbk.','.kbwbbbk.','.kbbbbbk.','.kbbbbbk.','.kkkkkkk.'],IC9P);

/* ---------- sprite toko & pernikahan ---------- */
/** Etalase perhiasan: kaca, alas beludru merah, cincin/kalung emas berkilau. w lebar. */
function jewelCase(w){return spr(w,30,x=>{
  box34(x,0,8,w,4,18,'#f2e6c8','#7a2a2a');R(x,2,13,w-4,1,'#a84a3a');
  RR(x,2,0,w-4,12,'#cfeaf4',1);R(x,3,1,w-6,1,'#ffffff');R(x,3,8,w-6,4,'#8a1a2a');R(x,3,8,w-6,1,'#a83040');
  for(let i=6;i<w-6;i+=8){disc(x,i,9,2,'#f2c84a');P(x,i,9,'#8a1a2a');P(x,i-1,8,'#fff4c8');}
  for(let i=9;i<w-8;i+=16){line(x,i,3,i+3,6,1,'#f2c84a');line(x,i+3,6,i+6,3,1,'#f2c84a');P(x,i+3,7,'#9ad8f4');}
  [[4,2],[w-8,4],[w>>1,2]].forEach(([a,b])=>{P(x,a,b,'#ffffff');P(x,a+1,b+1,'#ffffff');});});}
/** Rak gantung baju: tiang krom, baju/dress warna-warni di gantungan. cols = warna baju; dress = indeks yang berupa dress. */
function clothesRack(cols,dress=[]){const W=cols.length*9+8;return spr(W,40,x=>{
  R(x,2,2,W-4,2,'#c9d0da');R(x,2,2,W-4,1,'#ffffff');R(x,2,4,2,34,'#8a93a3');R(x,W-4,4,2,34,'#8a93a3');R(x,0,37,8,2,'#5a5f6a');R(x,W-8,37,8,2,'#5a5f6a');
  cols.forEach((c,i)=>{const X=5+i*9;P(x,X+3,4,'#5a5f6a');P(x,X+3,5,'#5a5f6a');const d=dress.includes(i),L=d?26:18;
    R(x,X,6,8,3,c);R(x,X+1,9,6,L-3,c);if(d){R(x,X,18,8,L-12,c);R(x,X-1,24,10,L-18,c);}R(x,X+6,9,1,L-3,shade(c,-.25));R(x,X+1,9,1,L-3,shade(c,.3));
    if(!d){R(x,X+3,6,2,2,shade(c,.45));}else{for(let j=13;j<6+L;j+=4)P(x,X+3,j,shade(c,.5));}});});}
/** Rak kosmetik: 3 susun lipstik, botol parfum, bedak. */
function cosmeticShelf(){return spr(46,44,x=>{box34(x,0,0,46,4,40,'#f6e0e8','#e8b8c8');
  for(let s=0;s<3;s++){const Y=6+s*12;R(x,2,Y+10,42,2,'#c88aa0');R(x,2,Y+10,42,1,'#ffffff');
    for(let i=0;i<7;i++){const X=4+i*6,c=['#c8414b','#e86a9a','#a8202a','#f2a0b8','#8a3a5a','#e04a3a','#d86a8a'][(i+s*3)%7];
      if(s===0){R(x,X,Y+3,3,7,'#25242c');R(x,X,Y+1,3,2,c);}
      else if(s===1){RR(x,X-1,Y+3,5,7,(i%2?'#f4a0c0':'#c8dce8'),1);R(x,X,Y+1,3,2,'#e8c890');P(x,X,Y+5,'#ffffff');}
      else{ellipse(x,X+1,Y+7,2,2,['#f2c2b0','#e8c890','#f4a0a0'][i%3]);R(x,X-1,Y+8,5,2,'#9aa3b0');}}}});}
/** Pojok olahraga: bola voli & sepak di keranjang, raket berdiri, kotak sepatu. */
function sportsCorner(){return spr(48,40,x=>{
  RR(x,2,22,26,16,'#5a6470',2);for(let i=4;i<28;i+=4)R(x,i,24,1,13,'#3a4048');R(x,2,22,26,2,'#8a96a2');
  [[8,20,'#ffffff','#2f5d9e'],[17,19,'#f2c84a','#2f5d9e'],[24,21,'#ffffff','#25242c']].forEach(([a,b,c,d])=>{disc(x,a,b,4,c);P(x,a-1,b,d);P(x,a+1,b-1,d);P(x,a,b+2,d);P(x,a-2,b-2,'#ffffff');});
  [[32,0],[38,2]].forEach(([a,b])=>{ellipse(x,a+3,b+6,3,5,'#c9d0da');ellipse(x,a+3,b+6,2,4,'#ffffff');for(let j=b+3;j<b+11;j+=2)R(x,a+1,j,5,1,'#c9d0da');R(x,a+3,b+11,1,14,'#c8414b');R(x,a+2,b+21,3,6,'#25242c');});
  [[30,30,'#e8762a'],[30,34,'#3f8f4a'],[38,32,'#4f86c9']].forEach(([a,b,c])=>{box34(x,a,b,10,2,4,shade(c,.3),c);R(x,a+3,b+3,4,1,'#ffffff');});});}
/** Cermin berdiri (bingkai kayu). */
function mirrorStand(){return spr(18,42,x=>{RR(x,1,0,16,34,'#8a5a30',3);RR(x,3,2,12,30,'#cfe8f4',2);R(x,4,3,2,28,'#ffffff');line(x,9,6,12,12,1,'#ffffff');R(x,7,34,4,4,'#6a4020');R(x,3,38,12,2,'#6a4020');});}
/** Pelaminan: latar ukir emas + kain merah, bunga melati & mawar, dua kursi pengantin. */
function pelaminan(){return spr(120,64,x=>{
  RR(x,4,6,112,44,'#e8c86a',4);RR(x,7,9,106,38,'#a8202a',3);for(let i=10;i<110;i+=6){R(x,i,9,3,38,'#b83040');}
  for(let i=6;i<114;i+=4){disc(x,i,6,2,'#f2d880');P(x,i,5,'#fff4c8');}
  [[60,2]].forEach(([a,b])=>{ellipse(x,a,b+6,14,7,'#e8c86a');ellipse(x,a,b+6,10,4,'#f2d880');P(x,a,b+3,'#fff4c8');});
  for(let i=8;i<112;i+=7){disc(x,i,48,3,(i/7|0)%2?'#ffffff':'#f4a0b8');P(x,i,48,'#f2c84a');}
  [[36,'#f2ead8'],[70,'#f2ead8']].forEach(([a,c])=>{RR(x,a,24,16,14,'#e8c86a',3);RR(x,a+2,26,12,10,'#c8414b',2);box34(x,a-1,38,18,3,10,'#e8c86a','#c8a040');R(x,a+1,48,2,8,'#a8803a');R(x,a+13,48,2,8,'#a8803a');});
  [[2,'#3f8f4a'],[106,'#3f8f4a']].forEach(([a])=>{RR(x,a,30,12,26,'#6a9a5a',3);for(let j=32;j<54;j+=4){P(x,a+3,j,'#ffffff');P(x,a+8,j+2,'#f4a0b8');P(x,a+5,j+1,'#ffffff');}});});}
/** Janur kuning melengkung (hiasan pintu/pelaminan). */
function janur(){return spr(26,56,x=>{R(x,12,14,2,42,'#8a6a2a');R(x,12,14,1,42,'#c8a04a');
  for(let t=0;t<22;t++){const a=13+Math.round(Math.sin(t/22*Math.PI)*10),b=14-Math.round(t*.6);R(x,a,b+t,1,1,'#f2d06a');}
  for(let t=0;t<16;t++){const px=12-Math.round(Math.sin(t/16*Math.PI*.9)*10),py=12+t;R(x,px,py,2,1,'#f2d06a');if(t%2)P(x,px-1,py+1,'#e8b03a');}
  for(let j=0;j<6;j++){const a=4+j*3,b=1+((j%2)*2);R(x,a,b,2,8,'#f2d06a');P(x,a,b+8,'#e8b03a');}
  for(let j=20;j<50;j+=5){R(x,9,j,8,2,'#f2d06a');P(x,8,j+1,'#e8b03a');P(x,17,j+1,'#e8b03a');}});}
/** Rangkaian bunga berdiri (ucapan selamat). col = warna bunga utama. */
function flowerStand(col='#f4a0b8'){return spr(22,40,x=>{R(x,4,22,1,18,'#5a3a24');R(x,17,22,1,18,'#5a3a24');R(x,10,26,2,14,'#5a3a24');
  disc(x,11,11,10,'#6a9a5a');for(let k=0;k<16;k++){const a=k*2.4,r=3+(k%3)*2.6;disc(x,11+Math.cos(a)*r|0,11+Math.sin(a)*r|0,2,k%3?col:'#ffffff');}
  RR(x,4,18,14,6,'#fbf4e2',1);R(x,6,20,10,1,'#c8414b');R(x,6,22,7,1,'#c8414b');});}
/** Meja tumpeng: taplak putih, tumpeng kuning, lauk. */
function tumpengTable(){return spr(40,30,x=>{box34(x,0,10,40,6,10,'#ffffff','#e8e0cc');R(x,0,26,3,4,'#5a3a24');R(x,37,26,3,4,'#5a3a24');
  ellipse(x,20,13,11,3,'#b8864e');polyPx(x,[[13,13],[20,0],[27,13]],'#f2c84a');R(x,19,1,2,3,'#3f8f4a');P(x,17,7,'#ffe27a');
  [[9,12,'#c8414b'],[30,12,'#8a5a30'],[12,15,'#3f8f4a'],[28,15,'#f2ead8']].forEach(([a,b,c])=>{disc(x,a,b,2,c);});});}

/* ---------- bangunan Tanjung Arum ---------- */
EXT.tokoEmas=ruko({w:74,kind:'toko',wall:'#f6ecd6',mat:'plank',door:'glass',frame:'#8a2a2a',awning:['#ffffff','#b8902a'],sign:{text:'EMAS LINA',bg:'#8a2a2a',fg:'#f2d06a',icon:'ring'},pipe:'L',
  roof:['#5a1a1a','#7a2a2a','#9a3a34','#b84a40']});
EXT.toserba=ruko({w:104,floors:2,kind:'toko',wall:'#e8eef6',door:'glass',frame:'#2f5d9e',awning:['#ffffff','#e3aa3c'],sign:{text:'TOSERBA SAMUDRA',bg:'#2f5d9e',fg:'#ffffff',icon:'bag'},pipe:'R',
  roof:['#1f3a66','#2f5d9e','#4d84c8','#7fb0e6']});

/* ---------- zona Tanjung Arum diperlebar 768×270 (kamera bergulir) ---------- */
Object.assign(ZONE_TANJUNG,{w:768,
  def:[['c',0,150,768,24,0],['p',0,174,768,36,4],['s',0,206,768,20,0]],
  blds:[['halteTA',6,150,null],['bahari',150,150,152],['tokoEmas',296,150,152],['toserba',412,150,152],['tokoIkan',600,150,152]],
  trees:[[-12,-22,14,61],[96,-26,13,62],[268,-24,12,63],[392,-26,13,66],[560,-22,14,64],[700,-24,12,67],[118,40,11,65]],
  props:[[()=>busSide('RIMBASARI'),74,138],[p=>coconutTree(p,1,1),92,150],[p=>coconutTree(p,2,-1),574,148],[p=>coconutTree(p,3,1),-14,150],[p=>coconutTree(p,4,-1),736,150],
    [()=>lamp(),142,176],[()=>lamp(),290,176],[()=>lamp(),404,176],[()=>lamp(),560,176],[()=>lamp(),730,176],
    [()=>bench(),206,188],[()=>bench(),250,188],[()=>bench(),470,188],[()=>bench(),514,188],
    [()=>fishCrate(),692,184],[()=>fishCrate(),704,190],[()=>barrel(),680,188],[netRack,620,180],[lifeRing,642,186],
    ...[60,100,160,200,240,280,330,440,500,560,620,700,740].map(a=>[bollard,a,212]),
    [()=>fishBoat('#2f5d9e','#e3aa3c'),300,236],[()=>fishBoat('#c8414b','#ffffff'),560,250],[()=>fishBoat('#3f8f4a','#f2c84a'),208,246],[()=>fishBoat('#e3aa3c','#2f5d9e'),660,240],
    [()=>aBoardSpr(),180,174],[()=>aBoardSpr(),392,174]],
  block:[[0,0,768,60],[0,TA_SEA-4,768,60]]});
/** Gambar zona Tanjung Arum lebar penuh (768×270) untuk halaman draf. */
function drawTanjungWide(pal,opt={}){const full=drawZone(ZONE_TANJUNG,pal,opt);const[c,x]=cv(768,270);x.drawImage(full,0,0);
  [[60,236,0],[150,228,1],[268,252,0],[440,232,1],[610,244,0],[720,230,1]].forEach(([a,b,f])=>x.drawImage(gull(f),a,b));
  if(opt.label){[['HALTE',8,198],['BAHARI MEDIKA',160,8],['EMAS LINA (baru)',300,8],['TOSERBA SAMUDRA (baru)',420,8],['TOKO IKAN',606,8]].forEach(([n,a,b])=>{const w=TW(n,8)+8;RR(x,a,b,w,11,'rgba(30,15,8,.78)',2);T(x,n,a+4,b+2,'#fff2d4',8);});}
  return c;}

/* ---------- penjaga toko & keluarga kandidat (char3, tanpa aset baru) ---------- */
const NIKAH_CAST={
  lina:{name:'Ci Lina',role:'Toko Emas Lina · istri Koh Hendra',s:{...sk('L'),hair:'bob',...hcol('blk'),style:'blouse',top:'#a8202a',flower:'#f2c84a',lower:'skirt',legs:'#2a2a38',earring:1,lashes:1,expr:'happy'}},
  yuni:{name:'Mbak Yuni',role:'Kasir Toserba Samudra',s:{...sk('M'),hair:'hijab',hc:'#2f5d9e',hl:'#4d84c8',hd:'#1f3a66',brow:'#2a1a1f',style:'polo',top:'#e3aa3c',legs:'#2f3d63',lanyard:'#2f5d9e',lashes:1,expr:'happy'}},
};
/** Keluarga yang datang ke pernikahan (kartu 02a/02b). from = asal (Terminal = bus pagi; gerbang = jalan kaki). */
const FAMILY={
  adji:{from:'Terminal (bus dari Tanjung Arum)',m:[
    ['Ayah Adji',{...sk('Y'),body:'old',hair:'short',...hcol('gray'),style:'batik',top:'#2f5d6e',batikH:'#9ad0c0',legs:'#3a3530',glasses:1}],
    ['Ibu Adji',{...sk('Y'),body:'big',hair:'hijab',hc:'#e3aa3c',hl:'#f2c86a',hd:'#a87a20',brow:'#2a1a1f',style:'kebaya',top:'#c8414b',lower:'long',legs:'#7d4f2a',lashes:1,expr:'happy'}],
    ['Nita',{...sk('Y'),hair:'pony',...hcol('blk'),style:'blouse',top:'#f2a0b8',lower:'skirt',legs:'#3a3a48',lashes:1,expr:'happy'}],
    ['Nisa',{...sk('Y'),hair:'long',...hcol('blk'),style:'cardigan',top:'#8a5aa8',inner:'#f4ecd8',legs:'#3a3a48',lashes:1,expr:'wink'}]]},
  arya:{from:'Gerbang Jalan Niaga (dari Kampung Kali)',m:[
    ['Ibu Arya',{...sk('M'),body:'old',hair:'bun',...hcol('gray'),style:'kebaya',top:'#6a8a5a',lower:'long',legs:'#5a3a24',wrinkles:1,expr:'happy'}],
    ['Pak RT',{...sk('D'),body:'old',hair:'peci',...hcol('blk'),style:'koko',top:'#f2ead8',emb:'#7a9a6a',legs:'#3a3530',mustache:1}],
    ['Bu RT',{...sk('M'),hair:'hijab',hc:'#7a4a8a',hl:'#a07ab0',hd:'#4a2a5a',brow:'#2a1a1f',style:'dress',top:'#e3aa3c',lower:'long',legs:'#e3aa3c',lashes:1}]]},
  raka:{from:'Terminal (bus dari Metrapura)',m:[
    ['Kombes Darmawan',{...sk('M'),body:'big',hair:'buzz',...hcol('gray'),style:'police',top:'#8a7448',legs:'#5a4a30',hat:'police',mustache:'#a8a09a',thickBrow:1}],
    ['Ibu Raka',{...sk('M'),hair:'bun',...hcol('blk'),style:'kebaya',top:'#2f5d9e',lower:'long',legs:'#5a3a24',earring:1,lashes:1}],
    ['Bang Bagas',{...sk('M'),hair:'short',...hcol('blk'),style:'police',top:'#8a7448',legs:'#5a4a30',hat:'police',thickBrow:1}],
    ['Kak Sari',{...sk('M'),hair:'pony',...hcol('blk'),style:'police',top:'#8a7448',legs:'#5a4a30',lashes:1}]]},
  galih:{from:'Terminal (bus dari Metrapura)',m:[
    ['Ibu Galih',{...sk('L'),body:'old',hair:'bob',...hcol('gray'),style:'cardigan',top:'#5a7aa8',inner:'#f4ecd8',lower:'long',legs:'#3a3a48',glasses:1,lashes:1,expr:'happy'}]]},
  sekar:{from:'Terminal (bus dari Metrapura & Tanjung Arum)',m:[
    ['Ayah Sekar',{...sk('L'),body:'old',hair:'side',...hcol('gray'),style:'shirt',top:'#e8e0cc',legs:'#3a3a48',glasses:1}],
    ['Ibu Sekar',{...sk('L'),hair:'wavy',...hcol('brn'),style:'blouse',top:'#6a9a6a',lower:'long',legs:'#e8dcc0',lashes:1}],
    ['Tante Lies',{...sk('L'),body:'old',hair:'bun',...hcol('gray'),style:'kebaya',top:'#c86a8a',lower:'long',legs:'#7d4f2a',glasses:1,expr:'happy'}]]},
  nadia:{from:'Terminal (bus dari Metrapura)',m:[
    ['Papa Nadia',{...sk('M'),body:'big',hair:'slick',...hcol('blk'),style:'batik',top:'#5a2a2a',batikH:'#e8b85a',legs:'#2a2a2a',mustache:1}],
    ['Mama Nadia',{...sk('M'),hair:'bob',...hcol('blk'),style:'blazer',top:'#2f3d63',inner:'#f7f2e4',lower:'skirt',legs:'#2f3d63',earring:1,lashes:1,expr:'angry'}],
    ['Mas Yudha',{...sk('M'),hair:'side',...hcol('blk'),style:'shirt',top:'#f2f2ea',legs:'#2f3d63',glasses:1}]]},
  laras:{from:'Studio Foto Lensa (jalan kaki, dibantu Mas Ilham)',m:[
    ['Pak Harto',{...sk('Y'),body:'old',hair:'bald',...hcol('white'),brow:'#dedad4',style:'batik',top:'#3a3a48',batikH:'#e3aa3c',legs:'#3a3530',glasses:1,expr:'happy'}]]},
  wulan:{from:'Gerbang Lereng Bukit (dari Dusun Atas)',m:[
    ['Bapak Wulan',{...sk('D'),body:'old',hair:'short',...hcol('gray'),style:'shirt',top:'#5a6a3a',legs:'#4a4038',hat:'caping',expr:'happy'}],
    ['Ibu Wulan',{...sk('D'),hair:'hijab',hc:'#3f6a5a',hl:'#5f8a7a',hd:'#2a4a3e',brow:'#2a1a1f',style:'kebaya',top:'#a0523a',lower:'long',legs:'#7d4f2a',wrinkles:1,lashes:1}],
    ['Dik Ningsih',{...sk('D'),hair:'braid',...hcol('blk'),style:'blouse',top:'#f2c84a',lower:'skirt',legs:'#5a3a24',lashes:1,expr:'happy'}]]},
};

/* ---------- interior: Toko Emas Lina (240×168) & Toserba Samudra (320×200) ---------- */
ROOMS3.tokoEmas={name:'Emas Lina',desc:'Etalase cincin & kalung, cermin, kursi tamu. Cincin lamaran 12jt (setelah pacaran). Ci Lina 09–16.',w:240,h:168,wall:'wallpaper',floor:'tileCream',
  wallDeco:[wPlate(84,10,'EMAS LINA','#8a2a2a','#f2d06a'),wPainting(20,12,26,18),wClock(172,22),wWindow(196,12,22,22,'curtain')],
  floorDeco:[rug(80,120,80,30,['#8a1a2a','#a83040','#c85060'])],
  items:()=>[[jewelCase(96),72,64],[jewelCase(40),14,96],[mirrorStand(),196,40],[chairW(),148,128],[chairW(),168,128],[vase('#c8414b','#f2d06a'),20,90,24],[potPlant(0,1),214,128],[potPlant(2),4,40],[register(),150,60,30]],
  over:[lampGlow(120,4,22,44),lampGlow(40,4,40,30)],chars:[]};
ROOMS3.toserba={name:'Toserba Samudra',desc:'Pakaian pria & wanita, kosmetik & parfum, olahraga, aksesori. Kasir dekat pintu. 08–17.',w:320,h:200,wall:'sky',floor:'tileWhite',
  wallDeco:[wPlate(30,10,'PRIA','#2f5d9e','#ffffff'),wPlate(118,10,'WANITA','#c86a8a','#ffffff'),wPlate(186,6,'KOSMETIK','#e86a9a','#ffffff'),wPlate(254,22,'OLAHRAGA','#3f8f4a','#ffffff')],
  floorDeco:[rug(120,110,90,44,['#2f5d9e','#4d84c8','#a8c8e8'])],
  items:()=>[[clothesRack(['#2f5d9e','#f2f2ea','#25242c','#5a2a2a','#6a9a6a','#c8414b']),14,26],[mannequin('#2f5d9e'),76,30],
    [clothesRack(['#f4a0b8','#e3aa3c','#8a5aa8','#f2ead8'],[0,2]),108,26],[mannequin('#f4a0b8'),154,30],
    [cosmeticShelf(),194,24],[sportsCorner(),262,34],[mirrorStand(),176,40],
    [clothesRack(['#c8a46a','#2f4a7a','#25242c','#8a5aa8','#3fae9c']),12,92],[shelfUnit(50,44,'parcels',3),12,140],[displayCase(44),70,104],[jewelCase(40),70,148],
    [counter(70,'#2f5d9e','#e8eef6'),210,120],[register(),226,116,30],[vase('#e3aa3c','#ffffff'),258,114,30],
    [bigPlant(4),288,150],[potPlant(1),4,150]],
  over:[lampGlow(70,4,30,40),lampGlow(160,4,30,40),lampGlow(250,4,30,40)],chars:[]};

/* ---------- Balai Kota versi hari pernikahan (320×200) ---------- */
ROOMS3.balaiNikah={name:'Balai Kota · Pernikahan',desc:'Pelaminan, janur, bunga ucapan, kursi tamu dua sisi, meja tumpeng.',w:320,h:200,wall:'cream',floor:'tileGray',
  wallDeco:[wFlagPair(20,8),wFlagPair(276,8)],
  floorDeco:[rug(136,80,48,110,['#8a1a2a','#a83040','#c85060'])],
  items:()=>{const L=[[pelaminan(),100,18],[janur(),70,22],[janur(),226,22],[flowerStand('#f4a0b8'),14,40],[flowerStand('#ffffff'),40,44],[flowerStand('#f2d06a'),262,40],[flowerStand('#f4a0b8'),288,44],[tumpengTable(),262,132]];
    for(let r=0;r<3;r++)for(let k=0;k<3;k++){L.push([chairW(),40+k*22,96+r*28]);L.push([chairW(),196+k*22,96+r*28]);}return L;},
  over:[lampGlow(80,4,30,40),lampGlow(240,4,30,40)],chars:[]};

/* ---------- ikon 16×16 barang hadiah baru (palet sendiri, dicocokkan ke ICFP) ---------- */
const ICNP={k:'#3a2414',w:'#ffffff',W:'#f2ead8',S:'#c8c0b4',s:'#9aa3b0',d:'#25242c',D:'#4b4a57',r:'#e04a3a',R:'#a8202a',p:'#f4a0a0',P:'#e86a9a',
  y:'#f2c84a',Y:'#c88a10',e:'#fff4c8',g:'#4f9f4a',G:'#8fd06a',h:'#2e6a34',b:'#3a6ab0',B:'#24407a',l:'#9ad8f4',L:'#c8dce8',
  n:'#7a4a24',N:'#a8703e',c:'#c89a64',C:'#e8c890',f:'#f6d08a',o:'#f08a2a',O:'#b85a1a',u:'#8a5aa8',t:'#3fae9c'};
/** Bentuk dasar pakaian: A warna utama, Z bayangan, X detail (kerah/kancing/sabuk), Q motif. */
const ICN_T={
  tee:['................','................','...kkkk..kkkk...','..kAAAAkkAAAAk..','.kAAAAAAAAAAAAk.','kAAAAAAAAAAAAAAk','kZAAkAAAAAAkAAZk','.kkkkAAAAAAkkkk.','....kAAAAAAk....','....kAAAAAAk....','....kAAAAAAk....','....kAAAAAAk....','....kAAAAAZk....','....kZZZZZZk....','....kkkkkkkk....','................'],
  shirt:['................','................','...kkkkkkkkkk...','..kAAAkXXkAAAk..','.kAAAAAkkAAAAAk.','kAAAAAAXAAAAAAAk','kZAAkAAAAAAkAAZk','.kkkkAAXAAAkkkk.','....kAAAAAAk....','....kAAXAAAk....','....kAAAAAAk....','....kAAXAAAk....','....kAAAAAZk....','....kZZZZZZk....','....kkkkkkkk....','................'],
  batik:['................','................','...kkkkkkkkkk...','..kAQAkXXkAQAk..','.kAAAQAkkAQAAAk.','kAQAAAAXAAAAQAAk','kZAAkAQAAAQkAAZk','.kkkkAAXAAAkkkk.','....kQAAAQAk....','....kAAXAAAk....','....kAQAAAQk....','....kAAXAAAk....','....kQAAAQZk....','....kZZZZZZk....','....kkkkkkkk....','................'],
  polo:['................','................','...kkkkkkkkkk...','..kAAAkXXkAAAk..','.kAAAAAkkAAAAAk.','kAAAAAAXAAAAAAAk','kZAAkAAXAAAkAAZk','.kkkkAAAAAAkkkk.','....kAAAAAAk....','....kAAAAAAk....','....kAAAAAAk....','....kAAAAAAk....','....kAAAAAZk....','....kZZZZZZk....','....kkkkkkkk....','................'],
  jacket:['................','...kkkk..kkkk...','..kAAAAkkAAAAk..','.kAAAAXkkXAAAAk.','.kAAAAkXXkAAAAk.','kAAkAAAkkAAAkAAk','kAAkAXAAAAXAkAAk','kAAkAAAkkAAAkAAk','kAAkAAAkkAAAkAAk','kAAkAAAkkAAAkAAk','kZZkAAAkkAAAkZZk','kkkkAAAkkAAAkkkk','...kZZZkkZZZk...','...kkkkkkkkkk...','................','................'],
  dress:['................','.....k....k.....','.....kA..Ak.....','....kAAkkAAk....','....kAAAAAAk....','....kAXXXXAk....','....kAAAAAAk....','...kAAAAAAAAk...','...kAAQAAAQAk...','..kAAAAAAAAAAk..','..kAQAAAQAAAAk..','.kAAAAAAAAAAAAk.','.kZAAAQAAAAQAZk.','.kZZZZZZZZZZZZk.','..kkkkkkkkkkkk..','................'],
  blouse:['................','................','...kkkkXXkkkk...','..kAAAAXXAAAAk..','.kAAAAAXXAAAAAk.','kAAAAAAAAAAAAAAk','kZAAkAAAAAAkAAZk','.kkkkAAAAAAkkkk.','....kAAAAAAk....','....kAAAAAAk....','....kAAAAAAk....','...kAAAAAAAAk...','...kZAAAAAAZk...','...kZZZZZZZZk...','...kkkkkkkkkk...','................'],
  skirt:['................','................','................','....kkkkkkkk....','....kXXXXXXk....','....kkkkkkkk....','....kAZAZAZk....','...kAZAZAZAZk...','...kAZAZAZAZk...','..kAZAZAZAZAZk..','..kAZAZAZAZAZk..','.kAZAZAZAZAZAZk.','.kAZAZAZAZAZAZk.','.kkkkkkkkkkkkkk.','................','................'],
  pants:['................','....kkkkkkkk....','....kXXXXXXk....','....kAAAkAAk....','....kAAAAAAk....','....kAAAAAAk....','...kAAAAkAAAAk..','...kAAAkkkAAAk..','...kAAAk.kAAAk..','...kAAAk.kAAAk..','...kAAAk.kAAAk..','...kAAAk.kAAAk..','...kAAZk.kAAZk..','...kZZZk.kZZZk..','...kkkkk.kkkkk..','................'],
};
const ICN_SRC={
  kerudung:['................','................','................','.kkkkkkkkkkkkkk.','.kAAAAAAAAAAAAk.','..kAAAAAAAAAAk..','...kAAQAAQAAk...','....kAAAAAAk....','.....kAQAAk.....','......kAAk......','.......kk.......','................','................','................','................','................'],
  syal:['................','....kkkkkkk.....','...kAAZAAZAk....','..kAZAAZAAZAk...','..kAAkkkkkAAk...','..kAZk...kAZk...','..kAAk...kAAk...','..kZAk...kAAk...','..kAAk...kZAk...','..kAAk...kAAk...','..kAZk...kAAk...','..kXXk...kAAk...','..kXkXk..kXXk...','...k.k...kXkXk..','..........k.k...','................'],
  lipstik:['................','.......kk.......','......kRRk......','......kRrk......','......krrk......','.....kYYYYk.....','.....kyYYYk.....','.....kkkkkk.....','.....kDDDDk.....','.....kdDDDk.....','.....kdDDDk.....','.....kdDDDk.....','.....kdDDDk.....','.....kddddk.....','.....kkkkkk.....','................'],
  bedak:['................','................','................','....kkkkkkkk....','...kPPPPPPPPk...','..kPwPPPPPPPPk..','..kPPPPPPPPPPk..','..kkkkkkkkkkkk..','..kSSSSSSSSSSk..','..kSCCCCCCCCSk..','..kSCfCCCCCCSk..','..kSCCCCCCCCSk..','..kSSSSSSSSSSk..','...kkkkkkkkkk...','................','................'],
  skincare:['................','....kk....kkk...','...kddk...kSk...','...kddk..kkkkk..','..kkkkkk.kWWWk..','..kLLLLk.kWWWk..','..kLwLLk.kWPWk..','..kLwLLk.kWPWk..','..kLLLLk.kWWWk..','..kLttLk.kWWWk..','..kLttLk.kWWWk..','..kLLLLk.kSSSk..','..kLLLLk.kkkkk..','..kkkkkk........','................','................'],
  parfumP:['................','.......kk.......','......kSSk......','......kSSk......','.....kkkkkk.....','......kssk......','...kkkkkkkkkk...','...kBBBBBBBBk...','...kBlBBBBBBk...','...kBlBkkkkBk...','...kBBBkWWkBk...','...kBBBkkkkBk...','...kBBBBBBBBk...','...kddddddddk...','...kkkkkkkkkk...','................'],
  parfumW:['................','.......kk.......','......kyyk......','......kYYk......','.......kk.......','......kssk......','....kkkkkkkk....','...kppppppppk...','..kpwppppppppk..','..kpwppPPpppPk..','..kppppPPppppk..','..kpppppppppPk..','...kpppppppPk...','....kkkkkkkk....','................','................'],
  bolaVoli:['................','.....kkkkkk.....','...kkwwwbbwkk...','..kwwwwbbwwwyk..','..kwwwbbwwwyyk..','.kbbwwbwwwyyyyk.','.kbbbwbwwyyywwk.','.kwbbbbwyyywwwk.','.kwwwbbyyywwwwk.','.kwwwyyyybbwwwk.','.kwwyyywwwbbbwk.','..kyywwwwwwbbk..','..kSwwwwwwwwSk..','...kkSSSSSSkk...','.....kkkkkk.....','................'],
  raket:['................','.........kkkk...','........kSSSSk..','.......kSlSlSSk.','.......kSSlSlSk.','.......kSlSlSSk.','.......kSSlSlSk.','........kSSSSk..','.......k.kkkk...','......kRk.......','.....kRk........','....kRk.........','...kddk.........','..kddk..........','..kkk...........','................'],
  sepatu:['................','................','................','................','.....kkkk.......','....koooOk......','....kowowOk.....','....kooowowkk...','...koooooooooOk.','..kooooooooooook','..kRRRRooooooook','.kwwwwwwwwwwwwwk','.kSSSSSSSSSSSSSk','..kkkkkkkkkkkkk.','................','................'],
  topi:['................','................','................','.....kkkkkk.....','....kccccccCk...','...kcCccccccck..','...kcccccccck...','...knnnnnnnnk...','..kkcccccccckk..','.kccccccccccccck','kccccccccccccccc','knnnnnnnnnnnnnnk','.kkkkkkkkkkkkkk.','................','................','................'],
  botol:['................','......kkkk......','......kddk......','.....kkkkkk.....','.....kLLLLk.....','....kLwLLLLk....','....kLwLLLLk....','....kttttttk....','....ktwttttk....','....kttttttk....','....kttttttk....','....kLLLLLLk....','....kLLLLLLk....','....khhhhhhk....','.....kkkkkk.....','................'],
  jam:['................','......kkkk......','......kNNk......','......kNNk......','.....kkkkkk.....','....kyyyyyyk....','....kywwwwYk....','....kywwkwYk....','....kywkkwYk....','....kywwwwYk....','....kyYYYYYk....','.....kkkkkk.....','......kNNk......','......kNNk......','......kkkk......','................'],
  dompet:['................','................','................','................','..kkkkkkkkkkkk..','..kNNNNNNNNNNk..','..kNwNNNNNNNNk..','..knnnnnnnkkkk..','..kNNNNNNkyyyk..','..kNNNNNNkkkkk..','..kNNNNNNNNNNk..','..kNNNNNNNNNNk..','..knnnnnnnnnnk..','..kkkkkkkkkkkk..','................','................'],
  kacamata:['................','................','................','................','................','kkkkkkkkkkkkkkkk','kkkddddkkddddkkk','..kdlddkkdlddk..','..kddddkkddddk..','...kddk..kddk...','....kk....kk....','................','................','................','................','................'],
  senter:['................','................','................','................','..kkkk..........','.kyyyykkkkkkkk..','kYlllYkDDDDDDDk.','kYlwlYkDdDDDDDk.','kYlllYkDDDDDDDk.','.kyyyykkkkkkkk..','..kkkk..........','................','................','................','................','................'],
  bukuKulit:['................','................','...kkkkkkkkkk...','...knNNNNNNNk...','...knNNNNNNNk...','...knNNyyNNNk...','...knNNNNNNNk...','...knNNNNNNNk...','...knNNNNNNNk...','...knNNNNNNNkR..','...knNNNNNNNkR..','...knNNNNNNNk...','...kWWWWWWWWk...','...kkkkkkkkkk...','................','................'],
  pulpen:['................','.............kk.','............kddk','...........kdydk','..........kdddk.','.........kdddk..','........kdydk...','.......kdddk....','......kdddk.....','.....kyyyk......','....kSSSk.......','...kSSk.........','..kSk...........','..kk............','................','................'],
  robot:['................','.......kk.......','........k.......','....kkkkkkkk....','....kSSSSSSk....','....kSlSSlSk....','....kSSkkSSk....','.....kkkkkk.....','..kkkSSSSSSkkk..','..kSkSrSSySkSk..','..kSkSSSSSSkSk..','..kkkSSSSSSkkk..','....kSSkkSSk....','....kSSkkSSk....','...kkkkkkkkkk...','................'],
  boneka:['................','...kk......kk...','..kNNk....kNNk..','..kNnkkkkkknNk..','...kNNNNNNNNk...','..kNNkNNNNkNNk..','..kNNNNCCNNNNk..','..kNNNCkkCNNNk..','...kNNNCCNNNk...','..kkkNNNNNNkkk..','.kNNkNCCCCNkNNk.','.kNNkCCCCCCkNNk.','..kkkCCCCCCkkk..','...kNNkkkkNNk...','...kkkk..kkkk...','................'],
  coklat:['................','................','...kkkkkkkkkk...','...knnknnknnk...','...kNNkNNkNNk...','...kkkkkkkkkk...','...knnknnknnk...','...kNNkNNkNNk...','..kkkkkkkkkkkk..','..kRRRRRRRRRRk..','..kRwRyyyyRRRk..','..kRRRyyyyRRRk..','..kRRRRRRRRRRk..','..kAAAAAAAAAAk..','..kkkkkkkkkkkk..','................'],
  album:['................','................','..kkkkkkkkkkkk..','..kAAAAAAAAAAk..','..kAkkkkkkkkAk..','..kAkllllllkAk..','..kAkllwlllkAk..','..kAkGGGllGkAk..','..kAkhGGGGGkAk..','..kAkkkkkkkkAk..','..kAAAAAAAAAAk..','..kAAAyyyyAAAk..','..kAAAAAAAAAAk..','..kZZZZZZZZZZk..','..kkkkkkkkkkkk..','................'],
  catur:['................','................','.....kk...kk....','....kwwk.kddk...','.....kk...kk....','....kwwk.kddk...','...kwwwwkddddk..','.kkkkkkkkkkkkkk.','.kCnCnCnCnCnCnk.','.knCnCnCnCnCnCk.','.kCnCnCnCnCnCnk.','.knCnCnCnCnCnCk.','.kNNNNNNNNNNNNk.','.kkkkkkkkkkkkkk.','................','................'],
  kalung:['................','................','..kk........kk..','..kyk......kyk..','...kyk....kyk...','....kyk..kyk....','.....kykkyk.....','......kyyk......','......kYYk......','.....kkllkk.....','.....klwlLk.....','......klLk......','.......kk.......','................','................','................'],
  gelang:['................','................','................','................','.....kkkkkk.....','...kkyyryyykk...','..kyeykkkkyyYk..','..kyyk....kyYk..','..kyyk....kyYk..','..kyyykkkkyyYk..','...kkyyYYYYkk...','.....kkkkkk.....','................','................','................','................'],
  cincin:['................','......kkkk......','.....kllwlk.....','......kllk......','.......kk.......','.....kyyyyk.....','....kyeyyyyk....','...kyek..kyYk...','...kyk....kYk...','...kyk....kYk...','...kyYk..kYYk...','....kyYYYYYk....','.....kkkkkk.....','................','................','................'],
};
/** 33 barang baru: kunci → [nama, harga, satuan, ikon (template|src), warna template, toko]. */
const NIKAH_ITEMS={
  kemejaBatik:['Kemeja Batik',150000,'potong',['batik','#7d4f2a','#5a3420','#f2ead8','#e8b85a'],'toserba'],
  polo:['Polo Shirt',120000,'potong',['polo','#25242c','#18171d','#4b4a57'],'toserba'],
  kaos:['Kaos Polos',60000,'potong',['tee','#f2f2ea','#c8c0b4'],'toserba'],
  jaketJeans:['Jaket Jeans',200000,'potong',['jacket','#4d6a9e','#2f4a7a','#c8dce8'],'toserba'],
  chino:['Celana Chino',130000,'potong',['pants','#c8a46a','#9a7a44','#5a3a24'],'toserba'],
  dress:['Dress Bunga',180000,'potong',['dress','#f4a0b8','#c86a8a','#ffffff','#ffffff'],'toserba'],
  blus:['Blus Kerja',120000,'potong',['blouse','#a8c8e8','#7a9ac0','#ffffff'],'toserba'],
  rok:['Rok Plisket',110000,'potong',['skirt','#8a5aa8','#6a3a88','#25242c'],'toserba'],
  kerudung:['Kerudung Paris',50000,'lembar',['kerudung','#3fae9c','#2e6a5a','','#ffffff'],'toserba'],
  syal:['Syal Rajut',80000,'helai',['syal','#c8414b','#8a2a2a','#f2ead8'],'toserba'],
  lipstik:['Lipstik',70000,'batang',['lipstik'],'toserba'],
  bedak:['Bedak Padat',60000,'kotak',['bedak'],'toserba'],
  skincare:['Set Skincare',150000,'set',['skincare'],'toserba'],
  parfumP:['Parfum Pria',180000,'botol',['parfumP'],'toserba'],
  parfumW:['Parfum Wanita',180000,'botol',['parfumW'],'toserba'],
  bolaVoli:['Bola Voli',150000,'buah',['bolaVoli'],'toserba'],
  raket:['Raket Badminton',120000,'buah',['raket'],'toserba'],
  sepatuLari:['Sepatu Lari',300000,'pasang',['sepatu'],'toserba'],
  topiPancing:['Topi Pancing',45000,'buah',['topi'],'toserba'],
  botolMinum:['Botol Minum',40000,'buah',['botol'],'toserba'],
  jamTangan:['Jam Tangan',250000,'buah',['jam'],'toserba'],
  dompet:['Dompet Kulit',130000,'buah',['dompet'],'toserba'],
  kacamata:['Kacamata Hitam',90000,'buah',['kacamata'],'toserba'],
  senter:['Senter',60000,'buah',['senter'],'toserba'],
  bukuKulit:['Buku Catatan Kulit',40000,'buku',['bukuKulit'],'toserba'],
  pulpen:['Pulpen Bagus',35000,'batang',['pulpen'],'toserba'],
  robot:['Mainan Robot',90000,'buah',['robot'],'toserba'],
  boneka:['Boneka',70000,'buah',['boneka'],'toserba'],
  coklat:['Coklat Batang',25000,'batang',['coklat','#c8414b','#8a2a2a'],'toserba'],
  album:['Album Foto',60000,'buku',['album','#8a3a2a','#5a2218'],'toserba'],
  caturKayu:['Set Catur Kayu',120000,'set',['catur'],'toserba'],
  kalung:['Kalung Emas',1500000,'buah',['kalung'],'emas'],
  gelang:['Gelang Emas',800000,'buah',['gelang'],'emas'],
  cincin:['Cincin Lamaran',12000000,'buah',['cincin'],'emas'],
};
/** Kelompok tab di panel Toserba. */
const TOSERBA_TABS=[['Pria',['kemejaBatik','polo','kaos','jaketJeans','chino']],['Wanita',['dress','blus','rok','kerudung','syal']],
  ['Kosmetik',['lipstik','bedak','skincare','parfumP','parfumW']],['Olahraga',['bolaVoli','raket','sepatuLari','topiPancing','botolMinum']],
  ['Aksesori',['jamTangan','dompet','kacamata','senter']],['Lain',['bukuKulit','pulpen','robot','boneka','coklat','album','caturKayu']]];
/** Buat ikon 16×16 satu barang. */
function nikahIcon(k){const ic=NIKAH_ITEMS[k][3],[t,A,Z,X,Q]=ic;const rows=ICN_T[t]||ICN_SRC[t];
  const map={...ICNP};if(A)map.A=A;if(Z)map.Z=Z;if(X)map.X=X;if(Q)map.Q=Q;if(!map.A)map.A='#8a3a2a';if(!map.Z)map.Z=shade(map.A,-.3);if(!map.X)map.X='#ffffff';if(!map.Q)map.Q=shade(map.A,.45);
  return fromRows(rows.map(r=>r.padEnd(16,'.').slice(0,16)),map);}
const ICN={};for(const k in NIKAH_ITEMS)ICN[k]=nikahIcon(k);

/** Selera baru (ditambahkan ke NPC_TASTE di game; selera lama tetap). */
const NIKAH_TASTE={
  adji:{suka:['polo','pulpen','coklat']},arya:{suka:['bukuKulit','jamTangan']},raka:{suka:['kacamata','senter','sepatuLari']},galih:{suka:['bukuKulit','syal'],benci:['coklat']},
  sekar:{suka:['dress','syal'],benci:['lipstik']},nadia:{suka:['jaketJeans','parfumW','lipstik']},laras:{suka:['album','kacamata']},wulan:{suka:['skincare','jamTangan']},
  dimas:{suka:['robot']},doni:{suka:['bolaVoli','sepatuLari']},wiryo:{suka:['caturKayu','syal']},ratna:{suka:['kerudung','lipstik']},harjo:{suka:['kemejaBatik']},
  bowo:{suka:['topiPancing']},tari:{suka:['coklat']},sinta:{suka:['pulpen']},ilham:{suka:['senter']},endang:{suka:['blus']},darmi:{benci:['parfumP','parfumW','lipstik']},
};

/* ---------- baju pengantin (dipakai pemain & pasangan saat upacara) ---------- */
/** Pengantin pria: beskap hitam + blangkon. Pengantin wanita: kebaya putih, rambut disanggul + melati (hijab tetap, warna putih). */
const WED={
  groom:s=>({...s,style:'suit',top:'#25242c',inner:'#f7f2e4',tie:'#e3aa3c',legs:'#5a3a24',hat:'udeng',glasses:s.glasses,expr:'happy'}),
  bride:s=>({...s,style:'kebaya',top:'#f7f2e4',inner:'#f7f2e4',lower:'long',legs:'#8a5a30',hair:s.hair==='hijab'?'hijab':'bun',
    ...(s.hair==='hijab'?{hc:'#f7f2e4',hl:'#ffffff',hd:'#d8d0c0'}:{}),hat:s.hair==='hijab'?undefined:'flower',earring:1,expr:'happy'}),
};
