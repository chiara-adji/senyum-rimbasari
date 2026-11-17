/* ================= INTERIOR V3 (272×184, 1 layar) ================= */
function wCalendar(X,Y){return x=>{R(x,X-1,Y-1,16,20,'#2a1610');R(x,X,Y,14,18,'#ffffff');R(x,X,Y,14,4,'#c8414b');for(let j=0;j<4;j++)for(let i=0;i<4;i++)R(x,X+2+i*3,Y+6+j*3,2,2,(i+j*4)===9?'#c8414b':'#c9ced6');}}
function wXrayArm(X,Y){return x=>{R(x,X,Y,6,10,MT.l);R(x,X,Y,6,1,MT.h);R(x,X+6,Y+3,14,2,MT.m);R(x,X+20,Y+1,8,8,'#eef2f6');R(x,X+26,Y+3,6,4,MT.l);disc(x,X+24,Y+5,1,'#e3aa3c');}}
function wPlate(X,Y,text,bg='#fbf4e2',fg='#4a230e'){return x=>{const w=TW(text,9,true)+8;R(x,X-1,Y-1,w+2,13,'#2a1610');R(x,X,Y,w,11,bg);R(x,X,Y,w,1,shade(bg,.4));T(x,text,X+4,Y+2,fg,9,null,true);}}
function wFlagPair(X,Y){return x=>{[0,14].forEach(o=>{R(x,X+o,Y,1,30,'#c9ced6');R(x,X+o+1,Y+1,10,4,'#d8282f');R(x,X+o+1,Y+5,10,4,'#f7f7f2');});}}
function wHangSnacks(X,Y,W){return x=>{R(x,X,Y,W,1,'#5a5a64');for(let i=X+2;i<X+W-3;i+=5){const c=['#e8473f','#f2c84a','#3f8f4a','#4f86c9','#f08a2a'][(i/5|0)%5];R(x,i,Y+1,4,9,c);R(x,i,Y+1,4,1,'#c9d0da');R(x,i+1,Y+4,2,2,'#ffffff');}}}
function wCaping(X,Y){return x=>{R(x,X+6,Y,4,1,'#e0bf72');R(x,X+3,Y+1,10,1,'#e0bf72');R(x,X,Y+2,16,2,'#e0bf72');R(x,X,Y+3,16,1,'#b8913e');}}
function wSlats(X,Y,W,H){return x=>{for(let i=X;i<X+W;i+=3){R(x,i,Y,2,H,WD.l);R(x,i,Y,1,H,WD.h);}}}
function sawdust(seed,X,Y,W,H){return x=>{const rr=rng(seed);for(let k=0;k<70;k++)P(x,X+rr()*W,Y+rr()*H,rr()<.5?'#e8d6a8':'#d8c090');}}
function oilStain(X,Y){return x=>{ellipse(x,X,Y,8,3,'#4a4a50');ellipse(x,X-2,Y,4,1,'#3a3a40');}}
/** Gambar ruangan. items: [img,X,Y,zBonus?]; chars: [img,X,Y] */
function room3(o){const RW=o.w||272,RFH=o.h||176,RH=RFH+8,RNX=(RW>>1)-18;const[c,x]=cv(RW,RH);
  const D='#2a1610',O='#b85e26',L='#e8954c';
  R(x,1,0,RW-2,RFH,D);R(x,0,1,RW,RFH-2,D);R(x,RNX,RFH-4,RNW,12,D);R(x,1,1,RW-2,RFH-2,O);R(x,RNX+1,RFH-4,RNW-2,11,O);
  R(x,2,2,RW-4,RFH-4,L);R(x,RNX+2,RFH-4,RNW-4,10,L);R(x,3,3,RW-6,RFH-6,D);R(x,RNX+3,RFH-4,RNW-6,9,D);
  paint(x,4,4,RW-8,RWH,(i,j)=>WALL[o.wall](i,j,RWH));paint(x,4,4+RWH,RW-8,RFH-8-RWH,FLOOR[o.floor]);paint(x,RNX+4,RFH-4,RNW-8,7,(i,j)=>FLOOR[o.floor](i+RNX,j+RFH-8-RWH));
  R(x,4,4+RWH-2,RW-8,2,'#3a2418');R(x,4,4+RWH-2,RW-8,1,'#5a3a24');x.fillStyle='rgba(30,15,5,.22)';x.fillRect(4,4+RWH,RW-8,3);
  R(x,RNX+7,RFH-2,RNW-14,4,'#9a4a2e');R(x,RNX+8,RFH-1,RNW-16,2,'#c86a3a');
  // hiasan dinding di layer sendiri → bayangan jatuh 1–2 px di bawahnya
  {const[l,lx]=cv(RW,RH);(o.wallDeco||[]).forEach(f=>f(lx));dropShadow(x,l,0,0,1,2,.28);x.drawImage(l,0,0);}
  (o.floorDeco||[]).forEach(f=>f(x));
  // sudut ruangan: bayangan vertikal di pertemuan dinding + pojok lantai lebih gelap
  for(let k=0;k<10;k++){x.fillStyle='rgba(30,14,6,'+(.2-k*.02).toFixed(3)+')';x.fillRect(4+k,4,1,RFH-8);x.fillRect(RW-5-k,4,1,RFH-8);}
  for(let k=0;k<6;k++){x.fillStyle='rgba(30,14,6,'+(.1-k*.016).toFixed(3)+')';x.fillRect(4,4+RWH+k*2,RW-8,2);}
  const ent=(o.items||[]).map(([img,X,Y,zb])=>({img,X,Y,z:Y+img.height+(zb||0),fl:!(zb>=20)}));(o.chars||[]).forEach(([img,X,Y])=>ent.push({img,X,Y,z:Y+31,ch:1}));
  // drop shadow furnitur (hitam 25–30%) tepat di bawah, sedikit ke kanan-bawah
  ent.forEach(e=>{if(e.ch||!e.fl)return;dropShadow(x,e.img,e.X,e.Y,3,2,.26);x.fillStyle='rgba(20,10,5,.22)';x.fillRect(e.X+2,e.Y+e.img.height-2,e.img.width-3,3);});
  ent.sort((a,b)=>a.z-b.z).forEach(e=>{if(e.ch)drawChar(x,e.img,e.X,e.Y);else x.drawImage(e.img,e.X,e.Y);});
  (o.over||[]).forEach(f=>f(x));
  // vinyet: pojok ruangan lebih gelap
  if(o.vignette!==false){const g=x.createRadialGradient(RW/2,RFH/2+10,40,RW/2,RFH/2,RW*.62);g.addColorStop(0,'rgba(20,8,2,0)');g.addColorStop(1,'rgba(20,8,2,.28)');x.fillStyle=g;x.fillRect(4,4,RW-8,RFH-8);}
  if(o.dim){x.fillStyle=o.dim;x.fillRect(3,3,RW-6,RFH-6);}
  return c;}
/** Cahaya jendela: berkas kuning pucat miring jatuh ke lantai. */
function sunBeam(X,W){return x=>{for(let j=0;j<70;j++){x.fillStyle='rgba(255,240,190,'+(.2-j*.0026).toFixed(3)+')';x.fillRect(X+(j*.45|0),4+RWH+j,W,1);}x.fillStyle='rgba(255,246,210,.12)';x.fillRect(X-2,4,W+4,RWH);}}
/** Cahaya lampu gantung yang menyebar ke bawah (kerucut lembut). */
function lampGlow(X,Y,len,r=40){return x=>{R(x,X,Y,1,len,'#2a2a2e');RR(x,X-5,Y+len,11,5,'#3a3a44',1);R(x,X-4,Y+len+5,9,1,'#fff2a8');P(x,X-2,Y+len+1,'#6a6a74');
  for(let k=0;k<8;k++){const t=k/8;x.fillStyle='rgba(255,226,140,'+(.07-t*.006).toFixed(3)+')';x.beginPath();x.ellipse(X,Y+len+6+r*.55,r*(.35+t*.65),r*(.18+t*.32),0,0,Math.PI*2);x.fill();}
  x.fillStyle='rgba(255,236,170,.08)';x.beginPath();x.moveTo(X-4,Y+len+6);x.lineTo(X+5,Y+len+6);x.lineTo(X+r*.8,Y+len+6+r);x.lineTo(X-r*.8,Y+len+6+r);x.fill();}}
/* ===== properti kecil (sampel interior) ===== */
function mug(c='#f2ead8'){return spr(7,7,x=>{R(x,0,2,5,5,c);R(x,0,2,5,1,'#5a3214');R(x,5,3,2,1,c);R(x,6,4,1,2,c);R(x,5,5,2,1,c);});}
function vase(col='#4f86c9',fl='#ff7a5a'){return spr(10,16,x=>{ellipse(x,5,12,3,3,col);R(x,4,7,3,3,col);R(x,3,7,1,6,shade(col,.3));line(x,5,7,2,2,1,'#3f8f4a');line(x,5,7,8,1,1,'#3f8f4a');line(x,5,7,5,0,1,'#3f8f4a');P(x,2,1,fl);P(x,8,0,fl);P(x,5,0,'#ffd23a');P(x,1,2,fl);});}
function magazines(){return spr(16,8,x=>{RR(x,0,5,15,3,'#c8414b',1);RR(x,1,3,14,3,'#4f86c9',1);RR(x,0,1,15,3,'#f2c84a',1);R(x,3,2,6,1,'#ffffff');});}
function breadBasket(){return spr(16,10,x=>{RR(x,0,4,16,6,'#b8864e',2);for(let i=2;i<15;i+=3)R(x,i,5,1,4,'#8a5a30');ellipse(x,5,4,3,2,'#c97a2e');ellipse(x,10,3,3,2,'#e8a04a');P(x,9,2,'#f6d08a');ellipse(x,13,4,2,1,'#c97a2e');});}
function cakeStand(){return spr(14,14,x=>{R(x,6,8,2,5,'#c9d0da');RR(x,2,12,10,2,'#c9d0da',1);RR(x,1,7,12,2,'#f4f4f4',1);RR(x,3,1,8,6,'#f6c8d8',2);R(x,3,1,8,1,'#ffffff');P(x,7,0,'#c8282f');});}
function readingLamp(){return spr(12,14,x=>{R(x,5,6,2,6,'#3a3a40');RR(x,2,12,8,2,'#3a3a40',1);RR(x,1,0,10,6,'#3f8f4a',2);R(x,2,5,8,1,'#fff2a8');});}
function cushion(c){return spr(12,8,x=>{RR(x,0,0,12,8,c,2);R(x,1,1,10,1,shade(c,.3));P(x,6,4,shade(c,-.3));});}
const cw={d:'#3e2a1e',m:'#5e4232',l:'#7a5a44',h:'#8e6c54'};
/* ===== properti tempat tinggal baru: Kos Melati, Losmen Singgah, rawat inap Puskesmas ===== */
/** Pintu kamar di dinding belakang: kusen gelap, 2 panel, gagang, plat nomor (font mini). locked=true → gembok kecil (tidak bisa dimasuki). */
function wDoorNum(X,Y,W,label,col='#5a3a24',locked=false){return x=>{const H=38;R(x,X-2,Y-2,W+4,H+2,'#2a1610');R(x,X-1,Y-1,W+2,H+1,'#7a5234');R(x,X,Y,W,H,col);R(x,X,Y,1,H,shade(col,.25));R(x,X+W-1,Y,1,H,shade(col,-.3));
  R(x,X+3,Y+12,W-6,10,shade(col,-.15));R(x,X+3,Y+25,W-6,10,shade(col,-.15));R(x,X+3,Y+12,W-6,1,shade(col,.2));R(x,X+3,Y+25,W-6,1,shade(col,.2));
  R(x,X+W-5,Y+22,2,2,'#e3aa3c');P(x,X+W-5,Y+22,'#fff2a8');
  const tw=TWm(label)+4,px=X+(W>>1)-(tw>>1);RR(x,px,Y+3,tw,7,'#fbf4e2',1);R(x,px,Y+9,tw,1,'#b8a888');Tm(x,label,px+2,Y+4,'#4a230e');
  if(locked){RR(x,X+W-7,Y+25,5,5,'#8a93a3',1);R(x,X+W-6,Y+23,3,2,'#5a6070');P(x,X+W-5,Y+27,'#2a2a2e');}}}
/** Foto Bu Melati berbingkai dengan setangkai melati di bawahnya. */
/** Pintu kamar 5 Kos Melati = kamar pemain di rumah Lv 1 (teal + hati, warna pintu Kamar Sewa lama). ACC 2026-11-13. */
function wDoor5(X,Y){return x=>{wDoorNum(X,Y,22,'5','#3a8a8a')(x);
  ['.RR.RR.','RRRRRRR','RRRRRRR','.RRRRR.','..RRR..','...R...'].forEach((r,j)=>{for(let i=0;i<r.length;i++)if(r[i]==='R')P(x,X+7+i,Y-8+j,i<2&&j<2?'#ffb0b0':'#e6383e');});}}
function wMelatiPhoto(X,Y){return x=>{R(x,X-1,Y-1,20,24,'#2a1610');R(x,X,Y,18,22,'#c8963a');R(x,X+2,Y+2,14,18,'#e8dcc4');disc(x,X+9,Y+8,3,'#6a4a3a');R(x,X+5,Y+12,8,8,'#7a5a8a');R(x,X+6,Y+12,6,1,'#9a7aaa');R(x,X+3,Y+2,12,3,'#3a2a24');
  for(let k=0;k<5;k++){P(x,X+3+k*3,Y+24,'#ffffff');P(x,X+4+k*3,Y+25,'#f4f4ec');P(x,X+3+k*3,Y+25,'#5c9a40');}}}
/** Papan gabus piket: kertas jadwal & catatan disemat paku warna. */
function wCorkBoard(X,Y){return x=>{R(x,X-1,Y-1,34,26,'#5a3a24');R(x,X,Y,32,24,'#c8945a');const rr=rng(5);for(let k=0;k<30;k++)P(x,X+1+rr()*30,Y+1+rr()*22,'#a8743e');
  RR(x,X+2,Y+2,14,12,'#ffffff',1);for(let j=0;j<4;j++)R(x,X+4,Y+4+j*2,10,1,j?'#9a907a':'#c8414b');RR(x,X+18,Y+3,11,9,'#fff2a8',1);R(x,X+20,Y+6,7,1,'#9a907a');RR(x,X+6,Y+15,12,7,'#a8d8f4',1);RR(x,X+21,Y+14,8,8,'#ffd0e0',1);
  [[8,2,'#c8414b'],[23,3,'#3f8f4a'],[11,15,'#2f5d9e'],[24,14,'#e8c547']].forEach(([a,b,c])=>R(x,X+a,Y+b,2,2,c));T(x,'PIKET',X+2,Y-9,'#4a230e',8);}}
/** Papan kunci losmen: 6 kait bernomor; kunci 2 dan 5 sedang dipakai (kosong). */
function wKeyBoard(X,Y){return x=>{R(x,X-1,Y-1,46,20,'#2a1610');R(x,X,Y,44,18,WD.l);R(x,X,Y,44,1,WD.h);for(let k=0;k<6;k++){const a=X+3+k*7;R(x,a+1,Y+3,2,1,'#c9d0da');Tm(x,String(k+1),a+1,Y+12,'#4a230e');
  if(k!==1&&k!==4){R(x,a+1,Y+4,2,4,'#e3aa3c');RR(x,a,Y+7,4,3,'#c8414b',1);}}}}
/** Gantungan handuk & baju di dinding. */
function wTowelHook(X,Y){return x=>{R(x,X,Y,24,2,WD.m);R(x,X,Y,24,1,WD.h);[[2,'#f2f2ea'],[10,'#4f86c9'],[17,'#e3aa3c']].forEach(([a,c])=>{R(x,X+a+2,Y+2,1,2,'#5a5a64');RR(x,X+a,Y+4,6,14,c,1);R(x,X+a+1,Y+5,1,12,shade(c,.25));R(x,X+a,Y+15,6,1,shade(c,-.2));});}}
function shoeRack(){const c=wp(WD);return spr(30,24,x=>{box34(x,0,4,30,3,18,c.l,c.m);R(x,2,13,26,1,c.d);
  [['#c8414b',3,2],['#2f5d9e',10,2],['#3a3a40',18,2],['#e8c547',24,3],['#f2f2ea',4,15],['#7a4a28',13,15],['#3f8f4a',21,15]].forEach(([col,a,b])=>{RR(x,a,b,5,4,col,1);R(x,a+1,b,3,1,shade(col,.3));});});}
function riceCooker(){return spr(14,12,x=>{RR(x,1,3,12,9,'#f2f2ea',3);R(x,2,4,10,1,'#ffffff');ellipse(x,7,3,5,2,'#e86a8a');R(x,6,0,2,2,'#5a5a64');R(x,4,8,2,1,'#e84a4a');});}
function thermos(){return spr(8,12,x=>{RR(x,1,2,6,10,'#c8414b',2);R(x,2,3,1,8,'#e86a5a');RR(x,2,0,4,3,'#f2f2ea',1);R(x,1,6,6,1,'#e8c547');});}
function deskBell(){return spr(8,6,x=>{ellipse(x,4,3,3,2,'#e3aa3c');P(x,3,2,'#fff2a8');R(x,0,5,8,1,'#5a5a64');R(x,4,0,1,1,'#c89a20');});}
function guestBook(){return spr(16,9,x=>{RR(x,0,1,16,8,'#2f5d9e',1);R(x,1,1,6,7,'#fbf4e2');R(x,9,1,6,7,'#fbf4e2');R(x,8,1,1,8,'#1f3d6e');for(let j=3;j<8;j+=2){R(x,2,j,4,1,'#9a907a');R(x,10,j,4,1,'#9a907a');}R(x,12,0,1,4,'#c8414b');});}
/** Pot melati di dalam ruangan (sedikit lebih besar). */
function jasmineIn(){return spr(18,22,x=>{RR(x,3,12,12,10,'#b55a2e',1);RR(x,2,11,14,2,'#d07a44',1);R(x,12,13,2,8,'#8a4020');disc(x,9,7,7,'#3f7a3a');disc(x,8,6,5,'#5c9a40');disc(x,7,4,2,'#86c23a');
  [[3,4],[8,1],[13,4],[5,9],[12,9],[10,5],[6,6]].forEach(([a,b])=>{P(x,a,b,'#ffffff');P(x,a+1,b,'#f4f4ec');P(x,a,b+1,'#f4f4ec');P(x,a+1,b+1,'#ffd23a');});});}
/** Lemari pakaian 2 pintu (3/4). */
function wardrobe(){const c=wp(WD);return spr(34,54,x=>{box34(x,0,0,34,4,48,c.l,c.m);R(x,16,6,1,44,c.d);RR(x,3,8,11,38,c.l,1);RR(x,19,8,11,38,c.l,1);R(x,3,8,11,1,c.h);R(x,19,8,11,1,c.h);R(x,13,26,2,4,'#e3aa3c');R(x,19,26,2,4,'#e3aa3c');R(x,1,52,4,2,c.o);R(x,29,52,4,2,c.o);});}
/** Sajadah tergelar di lantai. */
function prayerMat(X,Y){return x=>{R(x,X,Y,24,34,'#2f6a5a');R(x,X+2,Y+2,20,30,'#3f8a74');R(x,X+4,Y+4,16,26,'#c8414b');polyPx(x,[[X+6,Y+12],[X+12,Y+5],[X+18,Y+12],[X+18,Y+28],[X+6,Y+28]],'#e3aa3c');polyPx(x,[[X+8,Y+13],[X+12,Y+8],[X+16,Y+13],[X+16,Y+26],[X+8,Y+26]],'#8a2a2a');for(let i=X+1;i<X+24;i+=3){P(x,i,Y-1,'#e8dcc0');P(x,i,Y+34,'#e8dcc0');}}}
/** Ranjang rawat inap: seperti ranjang periksa tapi dengan pagar samping, selimut motif & bantal tambahan. v=1 → pasien sedang beristirahat (selimut menggembung). */
function inpatientBed(v=0){return spr(32,50,x=>{x.drawImage(hospitalBed(),1,0);
  R(x,0,16,2,22,MT.d);R(x,30,16,2,22,MT.d);for(let j=17;j<38;j+=4){R(x,0,j,2,1,MT.h);R(x,30,j,2,1,MT.h);}
  R(x,3,22,26,1,'#f7f9fb');for(let j=26;j<40;j+=6)for(let i=5;i<27;i+=6)P(x,i+(j%4),j,'#ffffff');
  if(v){ellipse(x,16,30,10,7,'#86c4b4');ellipse(x,15,28,8,5,'#a8dccc');disc(x,16,11,4,'#5a3a24');disc(x,16,12,3,'#d8a07a');}
  RR(x,8,46,16,4,'#5a6070',1);R(x,10,47,12,1,'#ffffff');});}
/** Tiang infus: roda, tiang logam, kantong cairan + selang. */
function ivStand(){return spr(12,50,x=>{R(x,5,6,2,40,MT.m);R(x,5,6,1,40,MT.h);R(x,1,4,10,1,MT.d);RR(x,2,6,7,10,'#d8eef8',2);R(x,3,7,5,6,'#a8d8f0');R(x,3,7,1,8,'#ffffff');R(x,5,16,1,14,'#c8e0ea');
  R(x,1,46,10,1,MT.d);disc(x,1,48,1,'#2a2a2e');disc(x,10,48,1,'#2a2a2e');disc(x,6,48,1,'#2a2a2e');});}
const RUG={earth:['#5a3a24','#8a5a3a','#b07a4e'],red:['#8a2a2a','#b84a3a','#d87a5a'],blue:['#2f4a6a','#4d6a8e','#8aa4c0'],green:['#3f6a4a','#6a9a5a','#a8c87a'],mint:['#5a9a84','#86cbb2','#c2ecdc'],gray:['#5a5a64','#7a7a86','#a8a8b4']};
const ROOMS3={
 /* ===== KLINIK ===== */
 klinik0:{name:'Klinik Tahap 0 · Ruko Tua',desc:'Awal game, sebelum quest bersih-bersih. Lantai papan lapuk, jendela pecah, sarang laba-laba, kursi dental rusak.',wall:'plankOld',floor:'plankOld',
  wallDeco:[wWindow(30,14,24,22,'old'),wDoorDark(128,12,28,38),wCobweb(4,4),wCobweb(267,4,1),wCrack(210,20),wCrack(90,26),wShelf(176,14,30)],floorDeco:[sunBeam(34,26),debris(5,20,60,230,100),debris(6,30,90,200,70)],
  items:()=>[[sinkPed(),78,28],[dentalUnitV(0),104,64],[chairW(cw),24,98],[trayBottles(),186,74],[crate(),20,140],[crate(),34,148],[crate(),222,132],[workDesk(1),186,114]]},
 klinik1:{name:'Klinik Lv 1 · Praktik drg. (tahap 1)',desc:'Sudah bersih, sederhana. 1 kursi bekas yang diperbaiki, alat Tier 1, 2 kursi tunggu.',wall:'cream',floor:'plankWarm',
  wallDeco:[wWindow(22,12,24,22,'clean'),wCert(64,18),wPoster(92,14),wClock(150,22),wCalendar(172,14),wShelf(200,14,30)],floorDeco:[sunBeam(26,26),rug(170,104,70,36,['#6a4a3a','#9a6a4a','#c8946a'])],
  items:()=>[[sinkPed(),40,30],[dentalUnitV(1),56,60],[trayBottles(),122,72],[fileCab(),236,26],[workDesk(1),180,96],[chairW(cw),206,148],[chairW(cw),222,148],[snackTable(1),20,134],[potPlant(1),246,58]]},
 klinik2:{name:'Klinik Lv 2 · Klinik Gigi (tahap 2)',desc:'Mulai estetik: dinding mint, ubin krem, tanaman. Ruang tunggu + rontgen periapikal, resepsionis & perawat.',wall:'mint',floor:'tileCream',
  wallDeco:[wWindow(14,12,24,22,'blind'),wXray(48,12),wXrayArm(96,14),wPainting(170,12,30,20),wClock(214,20),wPlate(178,38,'TUNGGU')],
  floorDeco:[sunBeam(18,26),partition(150,52,62,'#e8f6f0'),rug(176,128,80,34,['#5a9a84','#86cbb2','#c2ecdc'])],
  items:()=>[[sinkPed(),26,30],[dentalUnitV(2),34,58],[autoclave(),104,30],[workDesk(2),82,112],[counter(56,'#7ab8a4','#f2f8f4'),186,66],[register(),214,62,30],[bench2(40),176,140],[snackTable(2),214,104],[potPlant(0,1),160,124],[potPlant(2),246,26],[potPlant(1),6,132]]},
 klinik3:{name:'Klinik Lv 3 · Klinik Lengkap (tahap 3)',desc:'Alat di-upgrade: 2 kursi (Dokter Rekan), ruang sterilisasi, resepsionis, akuarium.',wall:'clinicWhite',floor:'tileWhite',
  wallDeco:[wXray(20,10),wPlate(8,38,'PERIKSA 1'),wPlate(82,38,'PERIKSA 2'),wWindow(160,12,22,22,'blind'),wPoster(190,14),wCert(214,16),wPlate(152,38,'STERIL')],
  floorDeco:[partition(74,52,52,'#eef6f4'),partition(146,52,52,'#eef6f4'),sunBeam(164,22),rug(176,118,88,48,['#7a8a5a','#a8b878','#c8d498'])],
  items:()=>[[dentalUnitV(3),8,56],[dentalUnitV(3),80,56],[autoclave(),156,30],[sinkPed(),200,32],[shelfUnit(26,40,'meds',3),236,14],[reception(),120,118],[aquarium(),238,108],[sofa(50,['#b8865a','#dcae7a','#f0cc9a']),186,140],[snackTable(3),196,108],[workDesk(3),18,118],[potPlant(0,1),6,140],[potPlant(2),160,138]]},
 klinik4a:{name:'Klinik Lv 4 · Lantai 1 (tahap 4)',desc:'Paling estetik: parket, aksen kayu, lampu gantung. Lobi, resepsionis, Ruang Periksa 1 & 2, tangga ke lantai 2.',wall:'clinicWhite',floor:'parquet',
  wallDeco:[wSlats(4,4,40,46),wSlats(228,4,40,46),wPlate(10,38,'PERIKSA 1'),wPlate(160,38,'PERIKSA 2'),wPainting(94,10,44,24)],
  floorDeco:[partition(76,52,46,'#d8c8b0'),partition(148,52,46,'#d8c8b0'),rug(16,124,120,44,['#4a3a2a','#8a6a4a','#d8b88a'])],
  items:()=>[[dentalUnitV(4),8,56],[dentalUnitV(4),156,56],[reception(),84,72],[stairs(30,70),236,38],[sofa(56,['#5a6a5a','#7a8a7a','#a8b8a8']),22,134],[snackTable(3),82,130],[rattanChair(),140,132],[bigPlant(3),214,118],[bigPlant(7),4,92],[monitorArm(),136,40]],
  over:[lampGlow(60,4,6),lampGlow(130,4,6),lampGlow(200,4,6)]},
 klinik4b:{name:'Klinik Lv 4 · Lantai 2 (tahap 4)',desc:'Ruang Endodonti & Bedah Minor (kursi premium, set bedah, rontgen panoramik), Ruang Sterilisasi, ruang staf.',wall:'clinicWhite',floor:'tileWhite',
  wallDeco:[wPlate(10,38,'ENDO & BEDAH'),wPlate(150,6,'STERIL'),wPlate(212,38,'STAF'),wXray(110,10),wWindow(226,12,24,22,'blind')],
  floorDeco:[partition(146,52,58,'#eef6f4'),partition(200,52,58,'#eef6f4'),rug(206,120,58,44,['#4a3a2a','#8a6a4a','#d8b88a'])],
  items:()=>[[dentalUnitV(4),30,56],[surgeryCart(),98,74],[xrayPano(),110,40],[monitorArm(),8,44],[autoclave(),152,32],[sinkPed(),178,30],[shelfUnit(40,44,'meds',9),152,90],[snackTable(3),210,104],[workDesk(3),206,136],[stairs(26,34),8,136],[bigPlant(2),114,124],[mopBucket(),180,142]]},
 /* ===== RUMAH ===== */
 rumah1:{name:'Rumah Lv 1 · Kamar Sewa (gratis)',desc:'Satu kamar kos: kasur lantai, kipas, meja lipat, meja kerja kecil. 4 pot herba di ambang jendela.',wall:'cream',floor:'tileCream',
  wallDeco:[wWindow(92,12,28,22,'curtain'),wCalendar(140,14),wShelf(180,14,26),wCrack(240,24)],floorDeco:[sunBeam(96,28),rug(80,110,60,30,['#5a6a8a','#7a8aaa','#a8b4c8'])],
  over:[x=>{for(let k=0;k<4;k++){R(x,92+k*7,34,5,3,'#b55a2e');P(x,93+k*7,33,'#5c9a30');P(x,95+k*7,32,'#86c23a');}}],
  items:()=>[[mattress(),16,60],[standFan(),54,46],[workDesk(1),196,56],[snackTable(1),92,122],[bucket(),236,150],[crate(),20,146],[potPlant(1),246,26]]},
 rumah2:{name:'Rumah Lv 2 · Kontrakan (Rp 2 jt / 30 hari)',desc:'Rumah petak sewaan: kasur, dapur kecil, TV tabung, meja makan lipat.',wall:'plaster',floor:'terracotta',
  wallDeco:[wWindow(66,12,22,22,'clean'),wCalendar(96,16),wPainting(226,14,26,18)],floorDeco:[sunBeam(70,24),rug(110,104,60,34,['#8a3a3a','#c8604a','#e8a060'])],
  items:()=>[[bed(1),14,46],[nightstand(false),52,48],[kitchen(48),118,34],[tvCab(),208,30],[snackTable(2),112,110],[workDesk(2),198,116],[potPlant(0),10,136]]},
 rumah3:{name:'Rumah Lv 3 · Rumah Subsidi (Rp 50 jt)',desc:'Rumah sendiri: kamar, dapur, ruang makan, sofa. Kebun herba di halaman.',wall:'sky',floor:'tileCream',
  wallDeco:[wWindow(66,12,22,22,'clean'),wClock(104,22),wPainting(196,14,26,18),wWindow(232,12,22,22,'clean')],floorDeco:[sunBeam(70,24),rug(100,104,74,40,['#3f6a4a','#6a9a5a','#a8c87a'])],
  items:()=>[[bed(2),14,46],[nightstand(),52,48],[kitchen(72),118,34],[bookshelf(28),230,28],[table(44,WD,'#f2ead8'),112,104],[chairW(),100,98],[chairW(),158,98],[sofa(50),190,70],[snackTable(2),196,114],[workDesk(2),14,118],[potPlant(0),236,140],[potPlant(2),166,30]]},
 rumah4:{name:'Rumah Lv 4 · Rumah Estetik (Rp 150 jt)',desc:'Renovasi: parket, aksen kayu, rotan, tanaman besar, lampu gantung, dapur dengan meja island.',wall:'wallpaper',floor:'parquet',
  wallDeco:[wWindow(28,12,24,24,'curtain'),wSlats(150,4,40,46),wWindow(206,12,28,24,'curtain')],floorDeco:[sunBeam(32,26),rug(16,112,100,52,['#5a2a3a','#8a3a4a','#c87a5a'])],
  items:()=>[[bed(3),22,44],[nightstand(),60,46],[lampStand(),2,76],[kitchen(62),88,34],[kitchenIsland(56),92,92],[stool(),96,120],[stool(),130,120],[rattanChair(),24,112],[snackTable(3),48,124],[rattanChair(),104,140],[sofa(56),196,64],[workDesk(3),206,116],[bigPlant(4),168,108],[bigPlant(8),244,132],[bookshelf(24),150,22]],
  over:[lampGlow(108,4,10),lampGlow(128,4,10)]},
 /* ===== ALUN-ALUN ===== */
 balai:{name:'Balai Kota',desc:'Meja Pak Harjo, loket pajak, papan pengumuman, kursi tamu.',wall:'cream',floor:'tileGray',
  wallDeco:[wFlagPair(96,8),wPainting(124,10,36,24),wFlagPair(166,8),x=>x.drawImage(noticeBoard(),20,14),wPlate(184,14,'LOKET PAJAK')],floorDeco:[rug(96,90,84,60,['#8a2a2a','#b84a3a','#d87a5a'])],
  items:()=>[[officeDesk(60,false,WDK),106,60],[chairW(),110,110],[chairW(),146,110],[counter(56,'#a8703e','#e8d6b0'),196,74],[register(),220,70,30],[fileCab(),244,26],[bench2(40),16,138],[bigPlant(1),4,40]],chars:[['harjo',122,40],['pM',150,120]]},
 warung:{name:'Warung Bu Ratna',desc:'Rak sembako, kulkas minuman, karung beras, jajanan gantung. Jual bahan makanan dan bibit herba dasar.',wall:'plankWarm',floor:'concrete',
  wallDeco:[wHangSnacks(130,8,60),wPlate(132,26,'WARUNG BU RATNA')],
  items:()=>[[shelfUnit(56,44,'goods',1),14,8],[shelfUnit(50,44,'goods',2),74,8],[counter(90,'#8a5a30','#e8d6b0'),140,74],[register(),150,70,30],[shelfUnit(24,20,'jars',4),196,58,30],[fridge(),240,26],[table(30,WD),96,110],[stool(),84,124],[stool(),128,124],[sack(),18,132],[sack('#e8dcc0','#3f8f4a'),32,138],[sack(),20,146],[crate(),232,144]],chars:[['ratna',176,48]]},
 kedai:{name:'Kedai Kopi Seduh',desc:'Bar kopi, mesin espresso, papan menu, meja bundar. Nongkrong 15–22.',wall:'brick',floor:'checker',
  wallDeco:[menuBoard(14,10,90,['KOPI SUSU 18rb','TUBRUK 10rb','KOPI SEDUH 30rb']),wShelf(116,12,40),wShelf(196,26,40),wPainting(220,8,30,16)],
  items:()=>[[counter(100,'#5a3a24','#c8a070'),140,72],[espresso(),156,58,40],[table(28,WDK),24,104],[stool(WDK),12,118],[stool(WDK),48,118],[table(28,WDK),68,134],[stool(WDK),56,148],[stool(WDK),94,148],[bigPlant(6),244,120],[bigPlant(9),4,56]],
  over:[lampGlow(38,4,40),lampGlow(82,4,70),lampGlow(180,4,12)],chars:[['nadia',200,46]]},
 roti:{name:'Toko Roti Manis',desc:'Etalase roti, oven, rak roti. Energi +10 (07–17).',wall:'peach',floor:'tilePink',
  wallDeco:[wPlate(110,12,'ROTI HANGAT!','#ffffff','#a8406a')],
  items:()=>[[shelfUnit(56,44,'bread',7),14,8],[oven(),226,14],[displayCase(90),84,84],[counter(50,'#e88aa8','#ffffff'),172,70],[register(),180,66,30],[table(28,WD,'#ffffff'),30,128],[stool(),18,142],[stool(),56,142],[potPlant(0),246,132]],chars:[['tari',186,44]]},
 pos:{name:'Kantor Pos',desc:'Loket, timbangan paket, kotak surat, rak paket. Pesan alat Tier 1 di sini.',wall:'cream',floor:'tileGray',
  wallDeco:[poBoxes(188,10,9,3),wPlate(20,12,'PESAN ALAT · KIRIM PAKET')],
  items:()=>[[counter(110,'#e8762a','#f6e8d0'),60,72],[scaleBox(),70,62,30],[register(),140,66,30],[shelfUnit(44,44,'parcels',8),10,30],[shelfUnit(44,44,'parcels',9),222,52],[bench2(40),24,140],[mailbox(),120,130]],chars:[['ilham',96,46]]},
 /* ===== KAMPUNG ASRI ===== */
 endang:{name:'Rumah Keluarga Endang',desc:'Ruang jahit Bu Endang: mesin jahit, manekin, kain. Mainan Dimas di lantai.',wall:'wallpaper',floor:'plankWarm',
  wallDeco:[wWindow(110,12,24,22,'curtain'),photoFrames(150,12,3),wClock(220,22)],floorDeco:[rug(100,110,90,44,['#3f6a4a','#6a9a5a','#a8c87a'])],
  items:()=>[[sewingMachine(),20,66],[mannequin(),66,40],[fabricRolls(),20,20],[shelfUnit(40,44,'fabric',3),226,8],[sofa(56),190,74],[snackTable(2),110,112],[chairW(),18,128]],
  over:[x=>{disc(x,180,150,4,'#e8473f');disc(x,179,149,2,'#ffffff');R(x,200,150,10,6,'#4f86c9');R(x,201,148,8,2,'#f2c84a');}],chars:[['endang',40,92],['dimas',156,128]]},
 wiryo:{name:'Rumah Kakek Wiryo',desc:'Meja catur, kursi goyang, radio tua, rak buku, foto lama.',wall:'plankWarm',floor:'parquet',
  wallDeco:[photoFrames(20,12,3),wWindow(96,12,22,22,'curtain'),wClock(140,22)],floorDeco:[rug(90,100,90,50,['#5a2a3a','#8a3a4a','#c87a5a'])],
  items:()=>[[bookshelf(30),196,20],[bookshelf(30),230,20],[cabinetGlass(34),10,12],[chessTable(),120,104],[chairW(cw),104,100],[chairW(cw),156,100],[rockingChair(),30,100],[table(26,WDK),60,120],[radio(),62,114,20],[potPlant(1),246,132]],chars:[['wiryo',150,112]]},
 lurah:{name:'Rumah Pak Harjo (Lurah)',desc:'Ruang tamu resmi: sofa set, lemari kaca berisi piring, foto keluarga.',wall:'cream',floor:'tileCream',
  wallDeco:[photoFrames(20,12,3),wFlagPair(96,8),wWindow(196,12,24,22,'curtain')],floorDeco:[rug(40,96,120,60,['#8a2a2a','#b84a3a','#d87a5a'])],
  items:()=>[[cabinetGlass(40),130,12],[tvCab(),70,26],[sofa(64,['#8a3a2a','#b85a40','#d88a68']),50,96],[table(44,WDK,'#f2ead8'),62,124],[sofa(22,['#8a3a2a','#b85a40','#d88a68']),28,124],[sofa(22,['#8a3a2a','#b85a40','#d88a68']),118,124],[bigPlant(1),230,120],[potPlant(0),236,40]]},
 bowo:{name:'Rumah Pak Bowo',desc:'Rumah petani kopi: karung biji kopi, tungku kayu, caping di dinding.',wall:'bamboo',floor:'plankOld',
  wallDeco:[wCaping(100,14),wWindow(140,12,22,22,'old'),wShelf(190,14,32)],floorDeco:[debris(12,60,100,140,50)],
  items:()=>[[woodStove(),20,8],[sack('#a8784a','#3f8f4a'),196,70],[sack('#a8784a','#3f8f4a'),212,76],[sack('#a8784a','#3f8f4a'),228,70],[shelfUnit(40,44,'coffee',4),226,8],[table(40,cw),90,104],[stool(cw),80,120],[stool(cw),128,120],[barrel(),60,64],[crate(),24,140]]},
 guru:{name:'Rumah Bu Sinta (Guru)',desc:'Rak buku, meja periksa PR, papan tulis kecil, globe.',wall:'peach',floor:'plankWarm',
  wallDeco:[blackboard(100,10,60,30,['PR: 1-10']),wWindow(186,12,22,22,'curtain')],floorDeco:[rug(96,110,80,40,['#5a4a8a','#8a7aba','#b8acd8'])],
  items:()=>[[bookshelf(30),12,20],[bookshelf(30),46,20],[officeDesk(50,false),104,62],[chairW(),118,96],[globe(),220,70],[sofa(50),210,120],[snackTable(2),120,128],[potPlant(0),246,26]],chars:[['sinta',160,58]]},
 jamu:{name:'Pondok Jamu',desc:'Toples rempah, herba digantung, lumpang, botol jamu. Bibit herba lanjutan (trust ≥40).',wall:'bamboo',floor:'plankWarm',
  wallDeco:[hangHerbs(100,8,70)],
  items:()=>[[shelfUnit(52,44,'jars',6),14,8],[shelfUnit(40,44,'bottles',7),226,8],[counter(84,'#8a6a44','#d8c498'),120,70],[shelfUnit(24,20,'bottles',2),130,56,40],[lumpang(),40,120],[gendong(),80,130],[table(40,WD),180,120],[potPlant(1),246,138]],chars:[['darmi',156,46]]},
 sd:{name:'SD Negeri Rimbasari',desc:'Kelas: papan tulis, meja guru, 6 meja murid.',wall:'sky',floor:'plankWarm',
  wallDeco:[blackboard(80,8,112,36,['Gosok gigi','2x sehari!']),wClock(216,22),wPoster(232,14),wPoster(20,14)],
  items:()=>[[officeDesk(48,false),26,62],[schoolDesk(),76,100],[schoolDesk(),124,100],[schoolDesk(),172,100],[schoolDesk(),76,132],[schoolDesk(),172,132],[schoolDesk(),124,132],[globe(),240,64],[bookshelf(24),236,96]],chars:[['sinta',46,44],['dimas',128,104],['kiki',180,136]]},
 /* ===== JALAN NIAGA ===== */
 terminal:{name:'Terminal Bus · Ruang Tunggu',desc:'Loket tiket, papan jadwal, bangku tunggu. Tiket Tanjung Arum 100rb, Metrapura 250rb.',wall:'cream',floor:'tileGray',
  wallDeco:[scheduleBoard(20,8,['Tanjung Arum  100rb','Metrapura     250rb','07:00 · 13:00']),wPlate(178,12,'LOKET'),wClock(240,22)],
  items:()=>[[counter(74,'#2f5d9e','#e8eaee'),170,66],[register(),200,62,30],[bench2(48),24,100],[bench2(48),24,134],[bench2(48),94,134],[waterDisp(),130,40],[bigPlant(2),246,120]]},
 polisi:{name:'Pos Polisi Rimbasari',desc:'Meja jaga, lemari arsip, radio, papan pengumuman. Ipda Raka bertugas di sini.',wall:'sky',floor:'tileGray',
  wallDeco:[wFlagPair(110,8),x=>x.drawImage(noticeBoard(),20,14),wPlate(140,14,'SIAGA 24 JAM'),wClock(240,22)],
  items:()=>[[officeDesk(56,true,WDK),100,62],[chairW(),116,100],[fileCab(),220,26],[fileCab(),240,26],[radio(),70,56,20],[table(26,WDK),66,66],[bench2(48),24,138],[waterDisp(),196,40],[bigPlant(2),246,128]],chars:[['raka',150,52]]},
 teknik:{name:'Kantor Konsultan Teknik Arya',desc:'Meja gambar dengan cetak biru, gulungan denah, maket rumah, helm proyek.',wall:'cream',floor:'plankWarm',
  wallDeco:[whiteboard(20,10,60,30),wWindow(120,12,22,22,'clean'),wPlate(166,30,'DENAH & RAB')],
  items:()=>[[draftTable(),96,58],[officeDesk(50),180,62],[shelfUnit(40,44,'files',6),226,90],[shelfUnit(40,44,'files',8),12,60],[maket(),40,124],[chairW(),196,98]],chars:[['arya',140,96]]},
 adji:{name:'Kantor Akuntan Adji',desc:'Meja kerja dengan komputer, lemari arsip, papan grafik, dispenser.',wall:'sky',floor:'carpet',
  wallDeco:[whiteboard(90,10,60,30),wWindow(176,12,24,22,'blind'),wPlate(20,14,'PAJAK · LAPORAN')],
  items:()=>[[officeDesk(50),24,62],[officeDesk(50),150,62],[chairW(),40,98],[chairW(),166,98],[fileCab(),220,26],[fileCab(),240,26],[shelfUnit(40,44,'files',3),206,104],[waterDisp(),110,40],[snackTable(2),40,128],[bigPlant(3),246,128]],chars:[['adji',96,96]]},
 puskes:{name:'Puskesmas',desc:'Ranjang periksa bertirai, timbangan bayi, rak obat. Sudut kanan: 2 ranjang rawat inap (pasien bedah minor/abses menginap semalam), tiang infus, nakas, kursi penunggu. Wulan & dr. Galih bertugas.',wall:'green',floor:'tileWhite',w:320,h:200,
  wallDeco:[wWindow(30,12,22,22,'blind'),wClock(64,22),wPoster(78,14),wPlate(100,14,'KIA · BIDAN'),wPlate(238,28,'RAWAT INAP')],
  floorDeco:[sunBeam(34,22),partition(226,52,92,'#e8f2ec')],
  items:()=>[[hospitalBed(),14,50],[hospitalBed(),54,50],[curtainScreen(30),88,50],[officeDesk(50,false),126,62],[babyScale(),186,70,40],[table(34,MT),180,82],[shelfUnit(32,44,'meds',5),188,8],
    [inpatientBed(),238,54],[ivStand(),268,40],[inpatientBed(1),280,54],[nightstand(false),302,106],[chairW(),248,114],[chairW(),290,128],[thermos(),306,102,24],
    [bench2(48),20,160],[bench2(48),90,160],[potPlant(1),6,176],[potPlant(0),196,170]],
  chars:[['wulan',142,44],['galih',110,124]],over:[lampGlow(84,4,10,44),lampGlow(272,4,10,40)]},
 /* ===== TEMPAT TINGGAL BARU (2026-11-11, menunggu acc) ===== */
 kos:{name:'Kos Melati · Ruang Bersama',desc:'Pintu kamar Pak Udin + kamar 1–4 (Rina, Yoga, drg. Hana, drg. Bima) + kamar 5 (pemain, rumah Lv 1; ACC 2026-11-13). Meja makan bersama, TV, rak sepatu, dispenser, papan piket, foto Bu Melati, pot melati.',wall:'plaster',floor:'terracotta',w:320,h:200,
  wallDeco:[wDoorNum(10,12,22,'PAK UDIN','#3f6a4a'),wDoorNum(44,12,22,'1'),wMelatiPhoto(78,12),wDoorNum(110,12,22,'2'),wDoorNum(140,12,22,'3'),wCorkBoard(172,12),wDoorNum(212,12,22,'4'),wDoor5(242,12),wClock(282,20),wShelf(272,30,36)],
  floorDeco:[rug(146,118,90,46,RUG.green),rug(102,50,190,12,RUG.earth)],
  items:()=>[[shoeRack(),4,58],[waterDisp(),74,40],[kitchen(40),268,36],[riceCooker(),276,34,30],
    [table(70,WD,'#f2ead8'),36,108],[chairW(),26,102],[chairW(),108,104],[chairW(),50,130],[chairW(),84,130],[mug(),46,106,24],[mug('#e8c547'),90,107,24],[breadBasket(),62,104,24],
    [tvCab(),166,32],[sofa(56),160,138],[snackTable(1),166,112],[magazines(),180,108,24],[cushion('#e3aa3c'),280,150],
    [jasmineIn(),300,172],[jasmineIn(),4,170],[bucket(),150,176]],
  chars:[['udin',236,120],['rina',62,120]],over:[lampGlow(74,4,12,44),lampGlow(238,4,10,40)]},
 losmenL:{name:'Losmen Singgah · Lobi & Lorong',desc:'Meja Bu Sri (bel, buku tamu, papan 6 kunci), bangku tunggu. Lorong kamar 1–6: hanya kamar 2 dan 5 (area pribadi pasien) yang bisa dimasuki, syarat trust ≥ 40.',wall:'wallpaper',floor:'plankWarm',w:320,h:200,
  wallDeco:[wPlate(16,8,'LOBI','#6a2a1a','#ffe2a8'),wKeyBoard(14,26),wClock(78,22),wPainting(94,14,26,18),
    ...[1,2,3,4,5,6].map((n,k)=>wDoorNum(136+k*30,12,22,String(n),n===2||n===5?'#7a4a24':'#5a3a24',n!==2&&n!==5))],
  floorDeco:[sunBeam(100,0),rug(130,58,184,16,RUG.red),rug(30,140,84,36,RUG.earth)],
  items:()=>[[reception(),14,62],[deskBell(),58,62,40],[guestBook(),30,64,40],[potPlant(0,1),88,44],[waterDisp(),110,40],
    [bench2(48),150,168],[bench2(48),214,168],[snackTable(1),40,152],[magazines(),54,148,24],[mug(),76,149,24],[potPlant(2),292,168],[bigPlant(3),4,150]],
  chars:[['sri',44,36]],over:[lampGlow(60,4,10,44),lampGlow(222,4,8,40)]},
 losmenA:{name:'Losmen · Kamar 2 (Kamar A)',desc:'Kamar pasien seorang diri: ranjang single, nakas, kipas berdiri, meja kecil, tas & handuk. Pemain menjenguk 18–22 (trust ≥ 40).',wall:'cream',floor:'tileCream',w:240,h:168,
  wallDeco:[wWindow(110,12,26,22,'curtain'),wPlate(16,10,'2'),wCalendar(150,14),wTowelHook(186,10)],
  floorDeco:[sunBeam(114,26),rug(96,96,60,30,RUG.red)],
  items:()=>[[bed(1),18,46],[nightstand(),56,48],[standFan(),76,44],[table(36,WD),150,106],[chairW(),190,104],[thermos(),156,104,24],[mug(),170,105,24],[sack('#4f86c9','#2f5d9e'),206,140],[bucket(),14,140]],
  chars:[],over:[lampGlow(120,4,12,36)]},
 losmenB:{name:'Losmen · Kamar 5 (Kamar B)',desc:'Kamar pasien dengan pendamping: 2 ranjang single, nakas di tengah, lemari, meja dengan termos teh, 2 kursi, sajadah.',wall:'plaster',floor:'terracotta',w:288,h:184,
  wallDeco:[wPlate(16,10,'5'),wWindow(124,12,26,22,'curtain'),wClock(170,20),wShelf(190,12,30),wTowelHook(236,10)],
  floorDeco:[sunBeam(128,24),rug(100,110,70,34,RUG.earth),prayerMat(206,140)],
  items:()=>[[bed(1),14,46],[nightstand(false),52,48],[bed(1),70,46],[wardrobe(),240,24],[table(40,WD,'#f2ead8'),112,118],[chairW(),100,112],[chairW(),154,114],[thermos(),122,114,24],[mug(),138,116,24],[mug('#e8c547'),146,117,24],
    [sack('#a8784a','#3f8f4a'),20,140],[standFan(),186,46],[potPlant(1),262,160]],
  chars:[],over:[lampGlow(134,4,12,40)]},
 studio:{name:'Studio Foto Lensa',desc:'Latar foto, kamera tripod, lampu softbox, foto-foto warga.',wall:'darkwood',floor:'plankGray',
  wallDeco:[photoFrames(18,12,4)],
  items:()=>[[backdrop(76),120,0],[rattanChair(),146,78],[tripodCam(),110,100],[softbox(),96,56],[softbox(),212,60],[counter(50,'#3a3a40','#5a5a64'),20,80],[bigPlant(5),246,124]],chars:[['laras',60,100]]},
 /* ===== LERENG BUKIT ===== */
 perpus:{name:'Perpustakaan & Kebun Bunga',desc:'Rak buku, meja baca, meja pustakawan, vas bunga. Stres −10 (09–19).',wall:'cream',floor:'parquet',
  wallDeco:[wWindow(112,12,24,22,'curtain'),wPlate(146,14,'TENANG')],
  items:()=>[[bookshelf(30),10,8],[bookshelf(30),44,8],[bookshelf(30),196,8],[bookshelf(30),230,8],[counter(60,WD.m,'#e8d6b0'),100,72],[table(48,WD),30,112],[chairW(),20,108],[chairW(),70,108],[table(48,WD),180,112],[chairW(),170,108],[chairW(),220,108],[globe(),130,130],[potPlant(0),6,140],[potPlant(2),248,140]],chars:[['sekar',118,46]]},
 /* ===== LUAR KOTA ===== */
 bahari:{name:'Bahari Medika (Tanjung Arum)',desc:'Toko alat Tier 2: ultrasonik scaler, bor high-speed, file PSA.',wall:'mint',floor:'tileWhite',
  wallDeco:[wPlate(20,12,'ALAT TIER 2'),wPoster(200,14)],
  items:()=>[[shelfUnit(50,44,'meds',2),14,26],[shelfUnit(50,44,'tools',4),70,26],[dentalUnitV(2),180,64],[counter(80,'#2a7a8a','#e0f0f6'),40,110],[register(),60,106,30],[potPlant(0,1),246,130]],chars:[['hendra',86,84]]},
 metra:{name:'Metra Dental Supply (Metrapura)',desc:'Showroom alat Tier 3: kursi premium, rontgen panoramik, loupe.',wall:'clinicWhite',floor:'tileWhite',
  wallDeco:[wPlate(20,12,'ALAT TIER 3'),wPainting(110,10,44,24)],
  items:()=>[[dentalUnitV(4),20,60],[xrayPano(),110,40],[dentalUnitV(3),170,60],[counter(80,'#a8202a','#f2f2f6'),100,124],[register(),120,120,30],[bigPlant(1),244,124],[bigPlant(6),4,128]],chars:[['melinda',140,98]]},
};
const SAMPLE_ROOMS={
 rumah2:{name:'Rumah Lv 2 · Kontrakan (Rp 2 jt / 30 hari)',desc:'Rumah petak sewaan: kasur, dapur kecil, TV tabung, meja makan lipat. Karpet, lukisan, jam, tanaman, cahaya jendela & lampu gantung.',wall:'plaster',floor:'terracotta',
  wallDeco:[wWindow(66,12,22,22,'curtain'),wCalendar(98,16),wClock(176,20),wPainting(226,12,30,20),wShelf(122,10,28)],
  floorDeco:[sunBeam(70,22),rug(104,100,72,40,['#8a3a3a','#c8604a','#e8a060']),rug(14,96,34,20,['#3f6a4a','#6a9a5a','#a8c87a'])],
  items:()=>[[bed(1),14,46],[nightstand(false),52,48],[kitchen(48),130,34],[tvCab(),210,30],[table(40,WD,'#f2ead8'),118,110],[chairW(),108,104],[chairW(),160,107],
    [mug(),126,108,24],[vase('#c8414b'),146,102,24],[workDesk(2),198,118],[magazines(),236,152],[potPlant(0),6,136],[potPlant(2),244,28],[cushion('#e3aa3c'),30,72,30]],
  over:[lampGlow(140,4,14,44)]},
 kedai:{name:'Kedai Kopi Seduh',desc:'Bar kopi, mesin espresso, papan menu, meja bundar dengan cangkir. Lampu gantung menyinari meja. Nongkrong 15–22.',wall:'brick',floor:'checker',
  wallDeco:[menuBoard(14,10,90,['KOPI SUSU 18rb','TUBRUK 10rb','KOPI SEDUH 30rb']),wShelf(116,12,40),wShelf(196,24,40),wPainting(222,6,30,16),wClock(170,20)],
  items:()=>[[counter(100,'#5a3a24','#c8a070'),140,72],[espresso(),156,58,40],[mug(),196,68,30],[mug('#4f86c9'),206,69,30],
    [table(28,WDK),24,106],[stool(WDK),11,121],[stool(WDK),49,119],[mug(),30,104,24],[mug('#e3aa3c'),41,105,24],
    [table(28,WDK),70,136],[stool(WDK),58,149],[stool(WDK),97,151],[mug(),78,134,24],[magazines(),86,135,24],
    [table(24,WDK),200,128],[stool(WDK),190,141],[stool(WDK),222,142],[vase('#f2ead8','#ffd23a'),208,118,24],
    [bigPlant(6),244,118],[bigPlant(9),4,56],[potPlant(1),118,40]],
  floorDeco:[rug(10,98,74,62,['#5a3a24','#8a5a3a','#b07a4e'])],
  over:[lampGlow(38,4,40,36),lampGlow(84,4,70,34),lampGlow(212,4,62,34),lampGlow(180,4,12,30)],chars:[['nadia',200,46]]},
 roti:{name:'Toko Roti Manis',desc:'Etalase roti, oven, rak roti, kue di kasir, keranjang roti & remah di meja. Energi +10 (07–17).',wall:'peach',floor:'tilePink',
  wallDeco:[wPlate(102,10,'ROTI HANGAT!','#ffffff','#a8406a'),wWindow(198,12,22,22,'curtain'),wPainting(76,12,24,18)],
  floorDeco:[sunBeam(200,22),rug(110,148,52,22,['#a8406a','#e88aa8','#ffd0e0']),x=>{const rr=rng(4);for(let k=0;k<14;k++)P(x,30+rr()*36,132+rr()*24,rr()<.5?'#e8a04a':'#c97a2e');}],
  items:()=>[[shelfUnit(56,44,'bread',7),14,8],[oven(),230,12],[displayCase(90),84,84],[counter(50,'#e88aa8','#ffffff'),172,70],[register(),180,66,30],[cakeStand(),206,60,30],
    [table(30,WD,'#ffffff'),32,128],[stool(),19,141],[stool(),59,143],[breadBasket(),36,122,24],[mug(),52,124,24],
    [table(24,WD,'#ffffff'),228,140],[stool(),218,152],[vase('#e88aa8','#ffffff'),236,132,24],
    [potPlant(0),248,96],[potPlant(2),4,92],[sack('#e8dcc0','#c8a070'),70,24]],
  over:[lampGlow(128,4,30,40),lampGlow(46,4,50,30)],chars:[['tari',186,44]]},
 perpus:{name:'Perpustakaan & Kebun Bunga',desc:'Rak buku penuh, meja baca berlampu, karpet, globe, vas bunga dari kebun Sekar. Stres −10 (09–19).',wall:'cream',floor:'parquet',
  wallDeco:[wWindow(112,12,24,22,'curtain'),wPlate(146,14,'TENANG'),wClock(98,20)],
  floorDeco:[sunBeam(116,22),rug(86,100,104,58,['#2f4a6a','#4d6a8e','#8aa4c0'])],
  items:()=>[[bookshelf(30),10,8],[bookshelf(30),44,8],[bookshelf(30),196,8],[bookshelf(30),230,8],[counter(60,WD.m,'#e8d6b0'),100,72],[vase('#4f86c9','#ff8ab0'),108,64,30],[magazines(),140,68,30],
    [table(48,WD),28,114],[chairW(),18,110],[chairW(),70,112],[readingLamp(),32,104,24],[magazines(),56,108,24],
    [table(48,WD),182,114],[chairW(),171,111],[chairW(),222,109],[readingLamp(),206,104,24],[mug(),190,110,24],
    [globe(),134,124],[potPlant(0,1),4,134],[potPlant(2,1),248,134],[magazines(),246,96],[bigPlant(3),82,40]],
  over:[lampGlow(52,4,30,40),lampGlow(206,4,30,40)],chars:[['sekar',118,46]]},
};
Object.assign(ROOMS3,SAMPLE_ROOMS);
/** Tambahan gaya v3.1 untuk interior non-sampel: props kecil, cahaya jendela, lampu gantung, karpet. (wallDeco/floorDeco/items/over digabung saat render) */
const ROOM_EXTRA={
 klinik0:{items:[[bucket(),236,100],[magazines(),60,150]]},
 klinik1:{items:[[mug(),214,100,24],[magazines(),28,130,24],[potPlant(2),4,60]],over:[lampGlow(110,4,10,40)]},
 klinik2:{items:[[magazines(),222,100,24],[mug(),238,101,24]],over:[lampGlow(214,4,8,36)]},
 klinik3:{items:[[magazines(),204,104,24],[vase('#3fae9c','#ffffff'),150,110,30]],over:[lampGlow(210,4,10,40)]},
 klinik4a:{items:[[vase('#e3aa3c','#ff8ab0'),90,124,24],[magazines(),104,128,24]]},
 klinik4b:{items:[[mug(),218,134,24]],over:[lampGlow(120,4,8,40)]},
 rumah1:{wallDeco:[wPoster(40,14)],items:[[mug(),100,118,24],[magazines(),120,120,24]],over:[lampGlow(120,4,12,36)]},
 rumah3:{floorDeco:[sunBeam(236,22)],items:[[vase('#4f86c9','#ff7a5a'),128,96,24],[mug(),116,100,24],[magazines(),204,110,24]],over:[lampGlow(134,4,14,44)]},
 rumah4:{floorDeco:[sunBeam(210,26)],items:[[mug(),104,88,30],[vase('#f2ead8','#ffd23a'),58,118,24],[magazines(),236,112,24]]},
 balai:{wallDeco:[wClock(72,22)],items:[[vase('#c8414b','#ffd23a'),112,54,24],[potPlant(0),248,138]],over:[lampGlow(58,4,10,46)]},
 warung:{wallDeco:[wClock(214,16)],items:[[mug(),102,104,24],[potPlant(1),70,140]],floorDeco:[rug(84,128,64,26,RUG.earth)]},
 pos:{floorDeco:[rug(80,128,80,30,RUG.red)],items:[[potPlant(2),248,136]]},
 endang:{floorDeco:[sunBeam(114,22)],items:[[vase('#c8414b','#ffffff'),120,106,24],[potPlant(0),246,140]],over:[lampGlow(140,4,12,40)]},
 wiryo:{floorDeco:[sunBeam(100,22)],items:[[magazines(),128,146]],over:[lampGlow(140,4,10,40)]},
 lurah:{floorDeco:[sunBeam(200,24)],wallDeco:[wClock(236,20)],items:[[vase('#4f86c9','#ff7a5a'),76,116,24],[magazines(),92,120,24]],over:[lampGlow(90,4,12,44)]},
 bowo:{floorDeco:[sunBeam(144,22),rug(80,96,64,40,RUG.earth)],items:[[mug('#a8784a'),98,98,24],[mug(),112,99,24]],over:[lampGlow(110,4,12,36)]},
 guru:{floorDeco:[sunBeam(190,22)],wallDeco:[wClock(86,18)],items:[[magazines(),128,124,24],[vase('#8a7aba','#ffd23a'),146,122,24]],over:[lampGlow(140,4,10,40)]},
 jamu:{wallDeco:[wWindow(190,12,22,22,'clean')],floorDeco:[sunBeam(194,22),rug(110,120,60,30,RUG.green)],items:[[mug('#e8c547'),188,114,24],[mug('#a8562e'),200,115,24]],over:[lampGlow(156,4,10,36)]},
 sd:{items:[[potPlant(0),4,140],[magazines(),40,58,24]],over:[lampGlow(62,4,10,40)]},
 terminal:{items:[[sack('#4f86c9','#2f5d9e'),74,98],[crate(),150,150]],over:[lampGlow(150,4,10,44)]},
 polisi:{items:[[mug(),140,56,24],[potPlant(0),4,100]],floorDeco:[rug(90,118,80,30,RUG.blue)],over:[lampGlow(126,4,12,44)]},
 teknik:{floorDeco:[sunBeam(124,22),rug(30,140,70,26,RUG.earth)],items:[[mug(),214,56,24],[potPlant(2),246,30]],over:[lampGlow(110,4,10,44)]},
 adji:{floorDeco:[sunBeam(180,24)],items:[[mug(),58,56,24],[vase('#2a2e3a','#e8c547'),160,52,24],[magazines(),50,124,24]],over:[lampGlow(160,4,10,40),lampGlow(230,4,10,40)]},

 studio:{floorDeco:[rug(118,100,80,40,RUG.gray)],items:[[magazines(),30,74,30],[potPlant(0),4,140]]},
 bahari:{floorDeco:[rug(120,110,90,40,RUG.mint)],items:[[potPlant(2),4,140]],over:[lampGlow(160,4,10,44)]},
 metra:{floorDeco:[rug(90,150,100,22,RUG.red)],over:[lampGlow(170,4,10,44),lampGlow(222,4,10,44)]},
};
function renderRoom(k,extra={}){const r=ROOMS3[k],e=ROOM_EXTRA[k]||{};const chars=(r.chars||[]).map(([id,X,Y])=>[CH[id],X,Y]);
  return room3({...r,wallDeco:[...(r.wallDeco||[]),...(e.wallDeco||[])],floorDeco:[...(r.floorDeco||[]),...(e.floorDeco||[])],items:[...r.items(),...(e.items||[])],chars:[...chars,...(extra.chars||[])],over:[...(r.over||[]),...(e.over||[]),...(extra.over||[])]});}

/* ===== Ruangan membesar tiap upgrade (semua tetap muat 1 layar 480×270) =====
   Klinik 0–1: 272×176 · Lv2: 320×200 · Lv3: 368×216 · Lv4: 416×232
   Rumah  Lv1: 240×168 · Lv2: 288×184 · Lv3: 352×208 (kasur queen) · Lv4: 416×232 (kasur king) */
const RG={mint:['#5a9a84','#86cbb2','#c2ecdc'],green:['#7a8a5a','#a8b878','#c8d498'],brown:['#4a3a2a','#8a6a4a','#d8b88a'],plum:['#5a2a3a','#8a3a4a','#c87a5a'],red:['#8a3a3a','#c8604a','#e8a060'],leaf:['#3f6a4a','#6a9a5a','#a8c87a'],blue:['#5a6a8a','#7a8aaa','#a8b4c8'],navy:['#2f4a6a','#4d6a8e','#8aa4c0']};
const GROWN={
 klinik2:{w:320,h:200,wall:'mint',floor:'tileCream',
  wallDeco:[wWindow(14,12,24,22,'blind'),wXray(48,12),wXrayArm(96,14),wCert(150,16),wPainting(194,12,30,20),wClock(246,20),wPlate(214,38,'TUNGGU'),wPoster(282,14)],
  floorDeco:[sunBeam(18,24),partition(176,52,72,'#e8f6f0'),rug(196,146,100,40,RG.mint)],
  items:()=>[[sinkPed(),26,30],[dentalUnitV(2),34,60],[autoclave(),108,30],[trayBottles(),118,84],[fileCab(),152,26],[workDesk(2),92,134],[chairW(),66,156],
    [counter(60,'#7ab8a4','#f2f8f4'),210,72],[register(),238,68,30],[vase('#3fae9c','#ffffff'),218,66,30],[snackTable(2),254,114],[magazines(),262,110,24],[mug(),280,111,24],
    [bench2(48),200,172],[potPlant(0,1),186,134],[potPlant(2),292,30],[potPlant(1),6,156]],
  over:[lampGlow(64,4,8,40),lampGlow(254,4,8,36)]},
 klinik3:{w:368,h:216,wall:'clinicWhite',floor:'tileWhite',
  wallDeco:[wXray(20,10),wPlate(8,38,'PERIKSA 1'),wXray(110,10),wPlate(98,38,'PERIKSA 2'),wPlate(192,38,'STERIL'),wClock(250,22),wWindow(276,12,22,22,'blind'),wPoster(306,14),wCert(334,16)],
  floorDeco:[partition(88,52,58,'#eef6f4'),partition(178,52,58,'#eef6f4'),partition(264,52,58,'#eef6f4'),sunBeam(280,22),rug(272,150,88,52,RG.green)],
  items:()=>[[dentalUnitV(3),10,60],[dentalUnitV(3),100,60],[workDesk(3),18,146],[trayBottles(),70,130],[autoclave(),190,30],[sinkPed(),234,32],[shelfUnit(40,44,'meds',3),196,74],
    [reception(),140,150],[vase('#3fae9c','#ffffff'),176,146,30],[aquarium(),220,146],[sofa(56,['#b8865a','#dcae7a','#f0cc9a']),286,170],[snackTable(3),292,114],[magazines(),300,108,24],
    [potPlant(0,1),6,172],[potPlant(2),256,176],[bigPlant(3),336,40]],
  over:[lampGlow(50,4,8,40),lampGlow(140,4,8,40),lampGlow(316,4,10,40)]},
 klinik4a:{w:416,h:232,wall:'clinicWhite',floor:'parquet',
  wallDeco:[wSlats(4,4,40,46),wPlate(10,38,'PERIKSA 1'),wPlate(110,38,'PERIKSA 2'),wPainting(222,10,44,24),wClock(278,22),wWindow(302,12,26,24,'curtain'),wSlats(372,4,40,46)],
  floorDeco:[partition(98,52,60,'#d8c8b0'),partition(198,52,60,'#d8c8b0'),sunBeam(306,26),rug(218,150,150,62,RG.brown)],
  items:()=>[[dentalUnitV(4),8,60],[dentalUnitV(4),108,60],[monitorArm(),74,40],[monitorArm(),174,40],[reception(),226,76],[stairs(30,70),382,60],
    [sofa(64,['#5a6a5a','#7a8a7a','#a8b8a8']),236,184],[snackTable(3),300,138],[vase('#e3aa3c','#ff8ab0'),310,132,24],[magazines(),326,136,24],[rattanChair(),226,140],[rattanChair(),354,150],
    [bigPlant(3),196,176],[bigPlant(7),4,176],[potPlant(2),160,180],[lampStand(),360,104]],
  over:[lampGlow(60,4,6,40),lampGlow(156,4,6,40),lampGlow(270,4,10,46),lampGlow(338,4,10,46)]},
 klinik4b:{w:416,h:232,wall:'clinicWhite',floor:'tileWhite',
  wallDeco:[wPlate(10,38,'ENDO & BEDAH'),wXray(130,10),wPlate(200,6,'STERIL'),wPlate(300,38,'STAF'),wPoster(330,14),wWindow(362,12,24,22,'blind')],
  floorDeco:[partition(186,52,64,'#eef6f4'),partition(290,52,64,'#eef6f4'),sunBeam(366,22),rug(300,150,100,56,RG.brown)],
  items:()=>[[dentalUnitV(4),40,60],[surgeryCart(),110,78],[xrayPano(),136,40],[monitorArm(),14,46],[autoclave(),200,30],[sinkPed(),248,32],[shelfUnit(40,44,'meds',9),200,96],[mopBucket(),252,176],
    [sofa(56),330,70],[snackTable(3),306,112],[mug(),322,108,24],[workDesk(3),330,160],[stairs(26,34),8,186],[bigPlant(2),140,170],[potPlant(1),266,180]],
  over:[lampGlow(80,4,8,44),lampGlow(272,4,8,36),lampGlow(346,4,10,40)]},
 rumah1:{w:240,h:168,wall:'cream',floor:'tileCream',
  wallDeco:[wPoster(36,14),wWindow(80,12,28,22,'curtain'),wCalendar(124,14),wShelf(160,14,26),wCrack(214,24)],
  floorDeco:[sunBeam(84,28),rug(78,104,56,28,RG.blue)],
  over:[x=>{for(let k=0;k<4;k++){R(x,80+k*7,34,5,3,'#b55a2e');P(x,81+k*7,33,'#5c9a30');P(x,83+k*7,32,'#86c23a');}},lampGlow(110,4,12,36)],
  items:()=>[[mattress(),16,60],[standFan(),52,46],[workDesk(1),172,56],[snackTable(1),80,112],[magazines(),118,120,24],[bucket(),212,140],[crate(),18,136],[potPlant(1),214,24]]},
 rumah2:{w:288,h:184,wall:'plaster',floor:'terracotta',
  wallDeco:[wWindow(66,12,22,22,'curtain'),wCalendar(98,16),wShelf(122,10,28),wClock(186,20),wPainting(242,12,30,20)],
  floorDeco:[sunBeam(70,22),rug(110,106,78,44,RG.red),rug(14,100,34,20,RG.leaf)],
  items:()=>[[bed(1),14,46],[nightstand(false),52,48],[kitchen(48),136,34],[tvCab(),226,30],[table(40,WD,'#f2ead8'),126,118],[chairW(),116,112],[chairW(),168,115],
    [mug(),134,116,24],[vase('#c8414b'),154,110,24],[workDesk(2),214,124],[magazines(),256,164],[potPlant(0),6,150],[potPlant(2),264,28],[cushion('#e3aa3c'),30,72,30]],
  over:[lampGlow(148,4,14,44)]},
 rumah3:{w:352,h:208,wall:'sky',floor:'tileCream',
  wallDeco:[wWindow(100,12,22,22,'clean'),wClock(132,22),wShelf(150,10,30),wPainting(236,14,26,18),wWindow(306,12,22,22,'clean')],
  floorDeco:[sunBeam(104,22),sunBeam(310,22),rug(136,116,96,48,RG.leaf),rug(16,108,60,22,RG.navy)],
  items:()=>[[nightstand(),4,48],[bedDouble(2),22,44],[nightstand(),76,48],[kitchen(72),160,34],[bookshelf(28),270,28],
    [table(44,WD,'#f2ead8'),160,124],[chairW(),148,118],[chairW(),206,121],[vase('#4f86c9','#ff7a5a'),176,116,24],[mug(),166,120,24],
    [sofa(56),262,96],[snackTable(2),268,146],[magazines(),276,140,24],[workDesk(2),16,146],[lampStand(),98,92],[potPlant(0),322,176],[potPlant(2),236,32]],
  over:[lampGlow(182,4,14,44),lampGlow(292,4,10,40)]},
 rumah4:{w:416,h:232,wall:'wallpaper',floor:'parquet',
  wallDeco:[wWindow(28,12,24,24,'curtain'),wSlats(170,4,40,46),wWindow(252,12,28,24,'curtain'),wClock(300,22),wPainting(324,12,36,22)],
  floorDeco:[sunBeam(32,26),sunBeam(256,28),rug(16,128,124,62,RG.plum),rug(250,132,130,56,RG.brown)],
  items:()=>[[nightstand(),4,46],[bedDouble(3),22,42],[nightstand(),84,46],[lampStand(),102,82],[kitchen(62),110,34],[kitchenIsland(56),112,94],[stool(),118,124],[stool(),150,124],[mug(),124,92,30],
    [rattanChair(),26,134],[snackTable(3),54,146],[vase('#f2ead8','#ffd23a'),66,140,24],[rattanChair(),118,166],
    [bookshelf(24),214,26],[tvCab(),372,40],[sofa(64),280,76],[snackTable(3),292,126],[magazines(),302,120,24],[workDesk(3),340,166],[bigPlant(4),190,156],[bigPlant(8),384,176],[potPlant(2),240,34]],
  over:[lampGlow(130,4,10,40),lampGlow(150,4,10,40),lampGlow(312,4,12,46)]},
};
for(const k in GROWN){Object.assign(ROOMS3[k],GROWN[k]);delete ROOM_EXTRA[k];}
