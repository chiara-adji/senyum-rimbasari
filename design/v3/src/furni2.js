/* ================= FURNITUR V3.2 — gaya top-down 3/4 =================
   Mengikuti referensi user: terlihat permukaan atas + sisi depan + kaki, highlight kiri/atas, bayangan kanan/bawah,
   serat kayu, kain berlipat, bantal melengkung. Outline = warna gelap dari warna dasar (spr → softOutline).
   Bentuk dibuat dengan Path (beginPath/moveTo/lineTo) yang di-rasterisasi per piksel agar tetap tajam (tanpa anti-alias).
   File ini dimuat setelah furni.js; deklarasi di sini menggantikan versi lama dengan nama & ukuran yang sama. */
const _pc=cv(1,1)[1];
/** Isi poligon piksel-tajam. pts = [[x,y],...] (koordinat titik sudut piksel). */
function polyPx(x,pts,col){const p=new Path2D();p.moveTo(pts[0][0],pts[0][1]);for(let k=1;k<pts.length;k++)p.lineTo(pts[k][0],pts[k][1]);p.closePath();
  const xs=pts.map(q=>q[0]),ys=pts.map(q=>q[1]);const x0=Math.floor(Math.min(...xs)),x1=Math.ceil(Math.max(...xs)),y0=Math.floor(Math.min(...ys)),y1=Math.ceil(Math.max(...ys));
  x.fillStyle=col;for(let j=y0;j<y1;j++)for(let i=x0;i<x1;i++)if(_pc.isPointInPath(p,i+.5,j+.5))x.fillRect(i,j,1,1);}
/** Palet kayu 5 tingkat dari {d,m,l,h}. */
function wp(c){return{o:shade(c.d,-.25),d:c.d,m:c.m,l:c.l,h:c.h};}
/** Serat kayu: garis tipis lebih gelap searah papan. */
function grain(x,X,Y,W,H,col,seed=1,vertical=false){const rr=rng(seed);for(let k=0;k<(vertical?W:H)/2;k++){if(vertical){const i=X+1+(rr()*(W-2)|0),y=Y+(rr()*H*.5|0),L=2+(rr()*H*.5|0);R(x,i,y,1,L,col);}else{const j=Y+1+(rr()*(H-2)|0),i=X+(rr()*W*.6|0),L=3+(rr()*W*.4|0);R(x,i,j,L,1,col);}}}
/** Kenop bulat untuk tiang ranjang. */
function knob(x,X,Y,c){RR(x,X,Y,6,5,c.m,2);R(x,X+1,Y+1,2,1,c.h);R(x,X+4,Y+2,1,2,c.d);}

/* ---------- KASUR ---------- */
function bed(k){const fr=wp(k===3?{d:'#4a2414',m:'#7a3e22',l:'#a8603a',h:'#c88050'}:k===2?WD:{d:'#3e2a1e',m:'#5e4232',l:'#7a5a44',h:'#8e6c54'});
  const bl=k===1?['#9aa4ac','#b8c2ca','#d8e0e6']:k===2?['#b8322e','#d84a3e','#ec7a5e']:['#2f5a8a','#4a7ab0','#7aa4d0'];
  return spr(36,48,x=>{
    // kepala ranjang melengkung
    polyPx(x,[[4,15],[4,6],[9,3],[18,1],[27,3],[32,6],[32,15]],fr.m);polyPx(x,[[6,15],[6,7],[10,5],[18,3],[26,5],[30,7],[30,15]],fr.d);
    for(let i=4;i<32;i++){const y=i<9?6-((i-4)*.6|0):i<18?3-((i-9)*.2|0):i<27?1+((i-18)*.22|0):3+((i-27)*.6|0);P(x,i,y,fr.h);}
    if(k>=2)for(let i=9;i<28;i+=4)R(x,i,7,2,8,fr.m);
    // tiang + kenop
    [[0,0],[31,0]].forEach(([X,Y])=>{R(x,X+1,Y+4,4,14,fr.m);R(x,X+1,Y+4,1,14,fr.h);R(x,X+4,Y+4,1,14,fr.d);knob(x,X,Y,fr);});
    // rangka sisi
    R(x,3,15,2,27,fr.m);R(x,31,15,2,27,fr.d);
    // seprai + bantal melengkung
    R(x,5,14,26,8,'#e8eef0');R(x,5,14,26,1,'#ffffff');
    polyPx(x,[[9,10],[27,10],[28,12],[28,17],[27,19],[9,19],[8,17],[8,12]],'#c8d8dc');polyPx(x,[[9,10],[27,10],[27,17],[9,17]],'#eef6f6');
    R(x,10,11,16,1,'#ffffff');R(x,9,18,19,1,'#a8bcc0');P(x,9,10,'#c8d8dc');P(x,26,10,'#c8d8dc');R(x,17,12,2,4,'#dce8ea');
    // selimut + lipatan atas
    R(x,5,23,26,19,bl[1]);R(x,5,21,26,3,bl[2]);R(x,5,21,26,1,'#ffffff');R(x,5,24,26,1,bl[0]);
    if(k===2)for(let i=7;i<31;i+=6){R(x,i,25,3,17,bl[0]);}else for(let j=27;j<41;j+=5)for(let i=8;i<30;i+=6)P(x,i+(j%2)*3,j,bl[2]);
    R(x,28,24,3,18,bl[0]);for(let j=30;j<41;j+=5)R(x,9,j,6,1,bl[0]);
    // ujung selimut menjuntai
    polyPx(x,[[4,40],[32,40],[32,43],[4,43]],bl[0]);
    // papan kaki
    R(x,1,41,34,7,fr.m);R(x,1,41,34,1,fr.h);R(x,4,43,28,4,fr.d);R(x,4,43,28,1,fr.o);knob(x,0,39,fr);knob(x,30,39,fr);});}
function mattress(){return spr(30,40,x=>{
  polyPx(x,[[1,5],[29,5],[30,8],[30,38],[29,40],[1,40],[0,38],[0,8]],'#c8bca0');R(x,1,5,28,33,'#e8dcc0');R(x,1,5,28,1,'#f8f0dc');
  polyPx(x,[[5,7],[25,7],[26,9],[26,14],[25,16],[5,16],[4,14],[4,9]],'#d8d0c0');polyPx(x,[[5,7],[25,7],[25,14],[5,14]],'#ffffff');R(x,5,15,21,1,'#c8c0b0');
  R(x,1,19,28,19,'#7a8a98');R(x,1,18,28,3,'#9aaab8');R(x,1,18,28,1,'#c8d4de');for(let j=24;j<38;j+=5)R(x,4,j,10,1,'#6a7a88');R(x,25,21,4,17,'#6a7a88');R(x,1,37,28,2,'#b8ac90');});}

/* ---------- MEJA ---------- */
function table(w,col=WD,cloth=null,legH=10){const c=wp(col),H=10+legH;return spr(w,H,x=>{
  // kaki belakang (lebih gelap, sebagian tertutup)
  R(x,3,8,2,H-11,c.o);R(x,w-5,8,2,H-11,c.o);
  // kaki depan
  RR(x,1,10,3,H-10,c.m,1);R(x,1,10,1,H-10,c.l);RR(x,w-4,10,3,H-10,c.d,1);
  // permukaan atas (perspektif: belakang lebih sempit)
  polyPx(x,[[2,1],[w-2,1],[w,8],[0,8]],c.l);R(x,2,1,w-4,1,c.h);polyPx(x,[[w-3,1],[w-2,1],[w,8],[w-2,8]],c.m);grain(x,3,2,w-6,6,c.m,w);
  // sisi depan
  R(x,0,8,w,3,c.m);R(x,0,8,w,1,c.d);R(x,0,10,w,1,c.o);
  if(cloth){polyPx(x,[[w/2,0],[w-1,4],[w/2,13],[1,4]],cloth);polyPx(x,[[w/2,0],[w-1,4],[w/2+1,5],[w/2,1]],shade(cloth,.25));polyPx(x,[[w/2,9],[w-2,5],[w/2,13]],shade(cloth,-.18));
    for(let i=3;i<w-3;i+=4)P(x,i,4,shade(cloth,-.1));}});}
function stool(col=WD){const c=wp(col);return spr(12,14,x=>{
  polyPx(x,[[2,6],[3,6],[2,14],[1,14]],c.m);polyPx(x,[[9,6],[10,6],[11,14],[10,14]],c.d);R(x,5,6,2,7,c.o);R(x,2,10,8,1,c.d);
  ellipse(x,6,4,5,3,c.d);ellipse(x,6,3,5,2,c.l);ellipse(x,5,3,3,1,c.h);});}
/** Kursi: sandaran berjeruji, dudukan terlihat dari atas, kaki depan. */
function chairW(col=WD){const c=wp(col);return spr(12,22,x=>{
  R(x,1,0,2,13,c.m);R(x,1,0,1,13,c.h);R(x,9,0,2,13,c.d);RR(x,1,0,10,2,c.l,1);R(x,2,0,8,1,c.h);
  for(let i=4;i<9;i+=2)R(x,i,2,1,8,c.m);R(x,3,7,6,1,c.d);
  polyPx(x,[[1,10],[11,10],[12,15],[0,15]],c.l);R(x,1,10,10,1,c.h);grain(x,2,11,8,3,c.m,7);
  R(x,0,15,12,2,c.m);R(x,0,16,12,1,c.d);
  RR(x,0,16,2,6,c.m,1);RR(x,10,16,2,6,c.d,1);R(x,3,17,1,4,c.o);R(x,8,17,1,4,c.o);R(x,2,19,8,1,c.d);});}

/* ---------- MEJA SNACK & KERJA ---------- */
function snackTable(lv=2){const col=lv>2?{d:'#5a2e1a',m:'#8a4a2a',l:'#b06a3e',h:'#c8804a'}:lv>1?WD:{d:'#3e2a1e',m:'#5e4232',l:'#7a5a44',h:'#8e6c54'};
  return spr(56,36,x=>{
  const ch=chairW(col);x.drawImage(ch,0,10);x.drawImage(ch,44,12);
  x.drawImage(table(32,col,null,14),12,10);
  // piring kue + cangkir
  ellipse(x,21,14,6,2,'#d8d0c0');ellipse(x,21,13,5,1,'#f8f4ea');[[18,12],[21,11],[24,12]].forEach(p=>{R(x,p[0],p[1],2,2,'#c27a3a');P(x,p[0],p[1],'#e6a25a');});
  R(x,32,9,6,5,'#f2ead8');R(x,32,9,6,1,'#5a3214');R(x,37,10,1,4,'#cfc2a6');R(x,38,10,2,1,'#f2ead8');R(x,39,11,1,2,'#f2ead8');P(x,34,6,'#ffffff');P(x,35,5,'#ffffff');});}
function workDesk(lv=2){const col=lv===1?{d:'#3a281c',m:'#56402e',l:'#6e5644',h:'#84694f'}:lv>2?{d:'#4a2414',m:'#743c22',l:'#9a5530',h:'#b86c3e'}:WD;const c=wp(col);
  return spr(54,52,x=>{
  // kaki & badan meja
  R(x,3,22,4,18,c.m);R(x,3,22,1,18,c.l);
  polyPx(x,[[32,22],[50,22],[50,40],[32,40]],c.m);R(x,49,22,1,18,c.d);
  [[34,25],[34,32]].forEach(([X,Y])=>{RR(x,X,Y,14,6,c.l,1);R(x,X+1,Y,12,1,c.h);R(x,X+1,Y+5,12,1,c.d);R(x,X+5,Y+2,4,1,'#e8c547');});
  // permukaan atas
  polyPx(x,[[3,12],[49,12],[51,22],[1,22]],c.l);R(x,3,12,46,1,c.h);grain(x,4,13,44,8,c.m,lv*5);R(x,1,22,50,2,c.m);R(x,1,23,50,1,c.o);
  // isi meja
  const bk=['#2f5d9e','#3f8f4a','#a83a26','#e3aa3c','#6a3a8a'];
  if(lv>1)bk.forEach((b,i)=>{const h=8+((i*3)%4);R(x,5+i*3,15-h+1,3,h,b);P(x,5+i*3,15-h+1,'#ffffff');R(x,7+i*3,15-h+1,1,h,shade(b,-.3));});else{R(x,6,12,10,4,'#c8b89a');R(x,6,12,10,1,'#e6dcc4');}
  polyPx(x,[[20,13],[33,13],[34,19],[19,19]],'#f7f1dc');R(x,26,13,1,6,'#cfc4a4');[[21,15],[21,17],[28,15],[28,17]].forEach(p=>R(x,p[0],p[1],4,1,'#9a907a'));
  disc(x,39,15,2,'#2a3a6a');P(x,38,14,'#6a8ad0');R(x,42,13,7,6,'#ffffff');R(x,43,15,5,1,'#b0a890');R(x,43,17,4,1,'#b0a890');line(x,36,18,40,11,1,'#3a2a1f');
  if(lv>1){R(x,24,4,1,9,'#c9c0b0');RR(x,21,1,7,4,'#3f8f4a',1);R(x,22,4,5,1,'#fff2a8');}
  // bangku (tampak atas)
  x.drawImage(stool(col),20,38);});}
function officeDesk(w=50,pc=true,col=WDL){const c=wp(col);return spr(w,34,x=>{
  R(x,2,20,3,14,c.m);R(x,2,20,1,14,c.l);
  polyPx(x,[[w-18,20],[w-2,20],[w-2,34],[w-18,34]],c.m);R(x,w-3,20,1,14,c.d);[[22],[28]].forEach(([Y])=>{RR(x,w-16,Y,13,5,c.l,1);R(x,w-15,Y,11,1,c.h);R(x,w-11,Y+2,3,1,'#e8c547');});
  polyPx(x,[[2,11],[w-2,11],[w,19],[0,19]],c.l);R(x,2,11,w-4,1,c.h);grain(x,3,12,w-6,6,c.m,w+3);R(x,0,19,w,2,c.m);R(x,0,20,w,1,c.o);
  if(pc){RR(x,6,0,18,12,'#2e3440',1);R(x,7,1,16,9,'#5ad0e8');R(x,8,2,6,2,'#e0fbff');R(x,14,11,2,2,'#2e3440');RR(x,10,12,10,2,'#3a4050',1);R(x,26,13,12,3,'#d8dce4');R(x,26,13,12,1,'#ffffff');}
  else{R(x,8,12,14,5,'#f7f1dc');R(x,8,12,14,1,'#ffffff');R(x,10,14,9,1,'#b0a890');}
  R(x,w-14,12,5,4,'#c8414b');R(x,w-8,11,4,5,'#e8c547');});}

/* ---------- LEMARI & RAK ---------- */
function nightstand(lampOn=true){const c=wp(WD);return spr(16,26,x=>{
  polyPx(x,[[2,11],[14,11],[15,15],[1,15]],c.l);R(x,2,11,12,1,c.h);
  R(x,1,15,14,10,c.m);R(x,14,15,1,10,c.d);RR(x,3,17,10,6,c.l,1);R(x,3,17,10,1,c.h);R(x,7,19,2,1,'#e8c547');R(x,2,25,2,1,c.o);R(x,12,25,2,1,c.o);
  if(lampOn){R(x,7,6,2,6,'#c9a46a');polyPx(x,[[5,0],[11,0],[13,6],[3,6]],'#f2d27a');R(x,5,0,6,1,'#fff2a8');polyPx(x,[[10,0],[11,0],[13,6],[11,6]],'#d8b050');RR(x,5,11,6,2,'#a88a50',1);}});}
function bookshelf(w=30){const c=wp(WD);return spr(w,48,x=>{
  R(x,0,3,w,45,c.m);polyPx(x,[[1,0],[w-1,0],[w,3],[0,3]],c.l);R(x,1,0,w-2,1,c.h);
  R(x,0,3,2,45,c.l);R(x,w-2,3,2,45,c.d);R(x,2,5,w-4,41,c.o);
  const rr=rng(w*7);const cols=['#2f5d9e','#3f8f4a','#a83a26','#e3aa3c','#6a3a8a','#d8d0c0','#2a8a8a'];
  [5,19,33].forEach(y=>{R(x,2,y,w-4,2,'rgba(0,0,0,.35)');let i=2;while(i<w-4){const bw=2+(rr()*2|0),bh=8+(rr()*4|0);if(rr()<.12){i+=3;continue;}const bc=cols[(rr()*cols.length)|0];const ww=Math.min(bw,w-2-i);R(x,i,y+13-bh,ww,bh,bc);P(x,i,y+13-bh,shade(bc,.35));if(ww>1)R(x,i+ww-1,y+13-bh,1,bh,shade(bc,-.3));i+=bw;}
    R(x,2,y+13,w-4,2,c.l);R(x,2,y+13,w-4,1,c.h);});
  R(x,0,46,w,2,c.d);});}
function fileCab(){return spr(18,34,x=>{
  polyPx(x,[[1,0],[17,0],[18,3],[0,3]],'#d8dee6');R(x,1,0,16,1,'#ffffff');R(x,0,3,18,31,'#9aa3b0');R(x,0,3,1,31,'#c9d0da');R(x,16,3,2,31,'#6e7886');
  for(let r=0;r<3;r++){RR(x,2,5+r*10,13,8,'#b8c0cc',1);R(x,2,5+r*10,13,1,'#dce2ea');R(x,2,12+r*10,13,1,'#7a8494');RR(x,6,8+r*10,5,2,'#5a6070',1);R(x,6,8+r*10,5,1,'#8a93a3');}});}
function cabinetGlass(w=34){const c=wp(WDK);return spr(w,46,x=>{
  polyPx(x,[[1,0],[w-1,0],[w,3],[0,3]],c.l);R(x,1,0,w-2,1,c.h);R(x,0,3,w,43,c.m);R(x,0,3,1,43,c.l);R(x,w-2,3,2,43,c.d);
  R(x,2,5,w-4,24,'#9ac8d8');R(x,2,5,w-4,3,'#d8f0f8');R(x,w/2|0,5,1,24,c.m);R(x,2,16,w-4,1,c.l);
  for(let k=0;k<(w-6)/8;k++){disc(x,6+k*8,11,3,'#f4f4f4');disc(x,6+k*8,11,1,'#c8d8e0');R(x,4+k*8,20,5,4,'#f4f4f4');}
  glassShine(x,2,5,(w-4)/2|0,24);glassShine(x,(w/2|0)+1,5,(w-4)/2|0,24);
  RR(x,2,31,w-4,13,c.l,1);R(x,3,31,w-6,1,c.h);R(x,w/2|0,31,1,13,c.d);P(x,(w/2|0)-3,37,'#e8c547');P(x,(w/2|0)+3,37,'#e8c547');});}
/* ---------- SOFA ---------- */
function sofa(w,col=['#a8703e','#d0985a','#e8b878']){const[d,m,l]=col,o=shade(d,-.3);return spr(w,26,x=>{
  // sandaran (atas melengkung)
  RR(x,2,0,w-4,10,m,2);R(x,4,1,w-8,1,l);R(x,2,8,w-4,2,d);
  // lengan
  RR(x,0,4,6,18,d,2);R(x,1,5,1,15,m);RR(x,w-6,4,6,18,o,2);R(x,w-5,5,1,15,d);
  // bantalan dudukan (sedikit menggembung)
  const n=w>40?2:1,cw=((w-12)/n)|0;for(let k=0;k<n;k++){const X=6+k*cw;RR(x,X,9,cw-(k<n-1?1:0),9,l,2);R(x,X+1,9,cw-3,1,shade(l,.25));R(x,X+1,16,cw-3,1,m);}
  R(x,0,20,w,4,d);R(x,0,23,w,1,o);RR(x,2,24,2,2,WD.d,1);RR(x,w-4,24,2,2,WD.d,1);});}

/* ================= FURNITUR V3.2 — tahap 2 (sisa furnitur) ================= */
/** Badan kotak 3/4: permukaan atas (trapesium, belakang lebih sempit), sisi depan, sisi kanan gelap. */
function box34(x,X,Y,W,topH,frontH,top,front,o={}){const ins=o.ins==null?1:o.ins;
  polyPx(x,[[X+ins,Y],[X+W-ins,Y],[X+W,Y+topH],[X,Y+topH]],top);R(x,X+ins,Y,W-ins*2,1,shade(top,.3));polyPx(x,[[X+W-ins-1,Y],[X+W-ins,Y],[X+W,Y+topH],[X+W-1,Y+topH]],shade(top,-.15));
  R(x,X,Y+topH,W,frontH,front);R(x,X,Y+topH,W,1,shade(front,.2));R(x,X+W-2,Y+topH,2,frontH,shade(front,-.2));R(x,X,Y+topH+frontH-2,W,2,shade(front,-.3));}
function shelfItem(x,kind,rr,i,y,pick){let iw=3;
  if(kind==='books'){iw=2+(rr()*2|0);const bh=7+(rr()*4|0);const c=['#2f5d9e','#3f8f4a','#a83a26','#e3aa3c','#6a3a8a','#d8d0c0','#2a8a8a'][(rr()*7)|0];R(x,i,y+11-bh,iw,bh,c);P(x,i,y+11-bh,shade(c,.35));R(x,i+iw-1,y+11-bh,1,bh,shade(c,-.3));}
  else if(kind==='goods'){iw=4;const c2=['#e8473f','#f2c84a','#3f8f4a','#4f86c9','#f08a2a','#f7f2e4'][(rr()*6)|0];if(pick<.5){RR(x,i,y+5,4,6,c2,1);R(x,i,y+5,4,1,shade(c2,.4));R(x,i+1,y+7,2,2,'#ffffff');R(x,i+3,y+6,1,5,shade(c2,-.25));}else{RR(x,i,y+3,3,8,c2,1);R(x,i,y+3,3,1,'#c9d0da');R(x,i+2,y+4,1,7,shade(c2,-.25));iw=3;}}
  else if(kind==='jars'){iw=5;RR(x,i,y+4,5,7,'#c8e0d8',1);R(x,i,y+3,5,1,'#8a6a3a');R(x,i+1,y+6,3,4,['#a8562e','#e3aa3c','#3f8f4a','#6a3a1a','#c8414b'][(rr()*5)|0]);P(x,i,y+5,'#ffffff');}
  else if(kind==='bottles'){iw=3;const c2=['#3f8f4a','#a8562e','#e8d8a8','#6a3a1a'][(rr()*4)|0];RR(x,i,y+4,3,7,c2,1);R(x,i+1,y+2,1,2,c2);P(x,i,y+5,'#ffffff');}
  else if(kind==='bread'){iw=7;ellipse(x,i+3,y+8,3,2,'#a85a22');ellipse(x,i+3,y+7,3,2,'#c97a2e');ellipse(x,i+2,y+6,2,1,'#e8a04a');}
  else if(kind==='parcels'){iw=6+(rr()*3|0);const ph=4+(rr()*5|0);R(x,i,y+11-ph,iw-1,ph,'#c8935a');R(x,i,y+11-ph,iw-1,1,'#e0b07a');R(x,i+iw-2,y+11-ph,1,ph,'#a8763e');R(x,i+((iw-1)/2|0),y+11-ph,1,ph,'#e8d6a8');}
  else if(kind==='fabric'){iw=4;const c=['#c8414b','#4f86c9','#e3aa3c','#3f8f4a','#ec98ad','#7d4f2a'][(rr()*6)|0];RR(x,i,y+2,4,9,c,1);R(x,i,y+2,1,9,shade(c,.25));R(x,i+3,y+2,1,9,shade(c,-.3));}
  else if(kind==='meds'){iw=4;const c2=['#ffffff','#f2c84a','#7fc8e8','#ec98ad'][(rr()*4)|0];RR(x,i,y+6,4,5,c2,1);R(x,i,y+6,4,1,'#c8414b');R(x,i+3,y+7,1,4,shade(c2,-.2));}
  else if(kind==='coffee'){iw=6;RR(x,i,y+4,5,7,'#a8784a',1);R(x,i,y+4,5,2,'#6a4428');P(x,i+2,y+7,'#f2ead8');R(x,i+4,y+6,1,5,'#8a5a30');}
  else if(kind==='tools'){iw=5;R(x,i+2,y+3,1,8,'#8a93a3');RR(x,i,y+3,5,2,['#c8414b','#e3aa3c','#4f86c9'][(rr()*3)|0],1);}
  else if(kind==='files'){iw=3;const c=['#4f86c9','#c8414b','#3f8f4a','#e3aa3c','#7a8a9a'][(rr()*5)|0];R(x,i,y+2,3,9,c);R(x,i,y+8,3,1,'#ffffff');R(x,i+2,y+2,1,9,shade(c,-.3));}
  else if(kind==='plates'){iw=7;disc(x,i+3,y+6,3,'#f4f6f8');disc(x,i+3,y+6,1,'#7fa8c8');}
  return iw;}
/** Rak barang 3/4: atas rak terlihat, sisi kiri terang, kanan gelap, bayangan di tiap rak. */
function shelfUnit(w,h,kind,seed=1){return spr(w,h,x=>{const rr=rnd(seed+w);const c=wp(kind==='meds'?MT:WD);
  R(x,0,3,w,h-3,c.m);polyPx(x,[[1,0],[w-1,0],[w,3],[0,3]],c.l);R(x,1,0,w-2,1,c.h);R(x,0,3,2,h-3,c.l);R(x,w-2,3,2,h-3,c.d);R(x,2,4,w-4,h-6,c.o);
  const rows=Math.floor((h-6)/13);for(let r=0;r<rows;r++){const y=4+r*13;R(x,2,y,w-4,2,'rgba(0,0,0,.35)');let i=3;while(i<w-5){const iw=shelfItem(x,kind,rr,i,y,rr());i+=iw+1+(rr()<.08?2:0);}R(x,2,y+11,w-4,2,c.l);R(x,2,y+11,w-4,1,c.h);}
  R(x,0,h-2,w,2,c.d);});}
/** Konter/kasir: permukaan atas berperspektif + panel depan membulat + plint gelap. */
function counter(w,front='#c8a070',topC='#e8d6b0',h=26){return spr(w,h,x=>{box34(x,0,0,w,6,h-6,topC,front);
  for(let i=4;i<w-6;i+=14){const pw=Math.min(10,w-6-i);RR(x,i,9,pw,h-15,shade(front,-.1),1);R(x,i,9,pw,1,shade(front,-.3));R(x,i,h-7,pw,1,shade(front,.15));}
  R(x,0,h-3,w,3,shade(front,-.4));grain(x,2,1,w-4,4,shade(topC,-.06),w);});}
function reception(){return spr(64,36,x=>{x.drawImage(counter(64,'#c8a070','#e8d6b0',26),0,10);
  RR(x,40,0,16,11,'#2e3440',1);R(x,41,1,14,8,'#5ad0e8');R(x,42,2,5,1,'#e0fbff');R(x,47,10,2,2,'#2e3440');RR(x,44,11,8,1,'#3a4050',1);
  R(x,8,11,10,4,'#ffffff');R(x,8,11,10,1,'#e8e2d0');R(x,22,11,4,3,'#f2c84a');disc(x,31,12,2,'#c8414b');});}
function register(){return spr(14,12,x=>{box34(x,1,4,12,3,5,'#8a93a3','#5a5f6a');RR(x,3,0,8,5,'#3a3f4a',1);R(x,4,1,6,2,'#7fe08a');for(let i=3;i<11;i+=2)P(x,i,5,'#c9d0da');});}
function fridge(drink=true){const b=drink?'#c8414b':'#e6ebf0',bl=shade(b,.25),bd=shade(b,-.25);return spr(24,46,x=>{
  polyPx(x,[[1,0],[23,0],[24,3],[0,3]],bl);R(x,0,3,24,43,b);R(x,0,3,1,43,bl);R(x,21,3,3,43,bd);RR(x,0,3,24,5,bl,1);if(drink){R(x,5,4,14,3,'#ffffff');R(x,6,5,12,1,'#c8414b');}
  R(x,2,9,19,32,'#a8d8ec');for(let r=0;r<4;r++){R(x,2,15+r*8,19,1,'#d8e8f0');for(let i=3;i<20;i+=4)RR(x,i,10+r*8,3,5,['#e8473f','#f2c84a','#3f8f4a','#4f86c9','#f08a2a'][(i+r)%5],1);}
  glassShine(x,2,9,19,32);R(x,19,18,1,10,'#d8dee6');R(x,0,42,24,4,bd);});}
function displayCase(w){return spr(w,30,x=>{
  R(x,0,14,w,16,'#e8d6b0');R(x,0,14,w,1,'#ffffff');R(x,w-2,14,2,16,'#c8a878');R(x,0,27,w,3,'#a8784a');for(let i=6;i<w-6;i+=16)RR(x,i,17,10,8,'#dcc8a0',1);
  polyPx(x,[[3,0],[w-3,0],[w-1,4],[1,4]],'#e0f4fa');R(x,1,4,w-2,10,'#bfe4f0');R(x,1,4,w-2,1,'#ffffff');
  for(let i=5;i<w-6;i+=7){ellipse(x,i+2,11,3,2,'#a85a22');ellipse(x,i+2,10,3,1,'#c97a2e');P(x,i+1,9,'#f6d08a');}
  glassShine(x,1,0,w-2,14);R(x,w-2,4,1,10,'#9ac8d8');});}
function oven(){return spr(34,40,x=>{box34(x,0,0,34,4,36,'#c9d0da','#8a93a3');
  [[3,9,'#ff9a3a'],[3,24,'#a84a2a']].forEach(([X,Y,g])=>{RR(x,X,Y,28,12,'#2e2e34',1);R(x,X+2,Y+2,24,8,g);R(x,X+3,Y+3,10,2,shade(g,.4));R(x,X+2,Y+9,24,1,shade(g,-.3));glassShine(x,X+2,Y+2,24,8);});
  for(let i=6;i<30;i+=6)disc(x,i,2,1,'#5a6070');R(x,3,22,28,1,'#c9d0da');});}
/** Dapur: dinding keramik, meja dapur berperspektif, lemari berpintu membulat, wastafel & kompor. */
function kitchen(w){return spr(w,42,x=>{for(let j=0;j<9;j++)for(let i=0;i<w;i++)P(x,i,j,(i%6===0||j%5===0)?'#c8bca4':((i/6|0)+(j/5|0))%2?'#eee6d4':'#e4f0ec');
  box34(x,0,9,w,6,27,'#d9cdb4',WD.l,{ins:0});R(x,0,40,w,2,'#3e2210');
  for(let i=1;i<w-2;i+=14){const dw=Math.min(12,w-2-i);RR(x,i+1,17,dw,18,WD.m,1);R(x,i+2,18,dw-2,1,WD.h);R(x,i+dw-1,18,1,16,WD.d);R(x,i+dw-3,25,2,2,'#e8c547');}
  RR(x,6,10,14,5,'#9aa3b0',1);R(x,7,11,12,3,'#7fb8d8');R(x,8,11,4,1,'#c8e8f8');R(x,12,4,2,7,'#c9d0da');R(x,12,4,5,1,'#e6ebf0');
  const s=w-24;RR(x,s,10,20,5,'#2e2e34',1);disc(x,s+5,12,2,'#5a5a64');disc(x,s+14,12,2,'#5a5a64');RR(x,s+10,3,8,7,'#c9d0da',1);R(x,s+10,3,8,1,'#ffffff');R(x,s+16,4,2,6,'#9aa3b0');
  if(w>60){RR(x,26,5,4,5,'#e8c547',1);RR(x,32,6,3,4,'#c8414b',1);}});}
function kitchenIsland(w=56){return spr(w,30,x=>{box34(x,0,2,w,8,18,'#f2ece0',WD.l);for(let i=3;i<w-3;i+=4)R(x,i,12,1,15,WD.m);R(x,0,28,w,2,WD.d);
  RR(x,8,0,6,5,'#c8414b',1);RR(x,20,2,10,4,'#f2ead8',1);RR(x,36,0,4,5,'#3f8f4a',1);});}
function tvCab(){return spr(40,36,x=>{const c=wp(WD);box34(x,0,18,40,4,14,c.l,c.m);RR(x,3,24,15,7,c.l,1);RR(x,22,24,15,7,c.l,1);R(x,10,27,2,1,'#e8c547');R(x,28,27,2,1,'#e8c547');R(x,2,32,3,4,c.d);R(x,35,32,3,4,c.d);
  RR(x,5,0,30,19,'#2a2630',2);R(x,6,1,28,1,'#4a4652');RR(x,8,2,22,14,'#1a1820',2);R(x,9,3,20,12,'#3a6a9a');R(x,10,4,8,3,'#7ab0e0');R(x,9,11,20,4,'#5a9a4a');glassShine(x,9,3,20,12);R(x,31,4,2,2,'#c8414b');R(x,31,8,2,1,'#8a8a94');});}
function hospitalBed(){return spr(30,46,x=>{
  RR(x,0,0,30,7,MT.l,2);R(x,1,0,28,1,MT.h);R(x,2,2,26,3,MT.m);
  R(x,1,6,28,34,'#f7f9fb');R(x,28,6,1,34,'#c8d0da');
  polyPx(x,[[5,8],[25,8],[26,10],[26,14],[25,16],[5,16],[4,14],[4,10]],'#d8e2ea');polyPx(x,[[5,8],[25,8],[25,14],[5,14]],'#ffffff');R(x,5,15,21,1,'#b8c4d0');
  R(x,1,19,28,21,'#9ad0c0');R(x,1,18,28,3,'#c2e6da');R(x,1,18,28,1,'#ffffff');R(x,25,21,4,19,'#7ab8a8');for(let j=25;j<40;j+=5)R(x,5,j,9,1,'#7ab8a8');
  R(x,0,8,1,32,MT.m);R(x,29,8,1,32,MT.d);RR(x,0,40,30,4,MT.l,1);R(x,1,40,28,1,MT.h);disc(x,3,45,1,'#3a3a44');disc(x,26,45,1,'#3a3a44');});}
function schoolDesk(){const c=wp(WDL);return spr(26,24,x=>{R(x,2,12,2,12,MT.m);R(x,22,12,2,12,MT.d);R(x,4,10,2,10,MT.d);R(x,20,10,2,10,MT.d);
  polyPx(x,[[1,3],[25,3],[26,11],[0,11]],c.l);R(x,1,3,24,1,c.h);grain(x,2,4,22,6,c.m,3);R(x,0,11,26,2,c.m);R(x,0,12,26,1,c.d);
  RR(x,4,5,7,4,'#f7f2e4',1);RR(x,14,5,7,4,'#f7f2e4',1);P(x,8,6,'#4f86c9');P(x,17,7,'#c8414b');R(x,12,5,1,4,'#e8c547');});}
/** Bangku tunggu: sandaran, dudukan terlihat dari atas, kaki logam. */
function bench2(w=40){return spr(w,18,x=>{RR(x,0,0,w,5,'#4f9a84',2);R(x,1,0,w-2,1,'#86cbb2');for(let i=6;i<w-4;i+=8)R(x,i,1,1,3,'#3f8a74');
  polyPx(x,[[1,5],[w-1,5],[w,11],[0,11]],'#c2ecdc');R(x,1,5,w-2,1,'#e6faf2');R(x,0,10,w,2,'#4f9a84');R(x,w-2,6,2,6,'#3f8a74');
  RR(x,2,12,2,6,MT.m,1);RR(x,w-4,12,2,6,MT.d,1);R(x,5,12,1,4,MT.d);R(x,w-6,12,1,4,MT.d);});}
function chessTable(){const c=wp(WD);return spr(30,24,x=>{R(x,13,14,4,8,c.m);R(x,16,14,1,8,c.d);RR(x,8,21,14,3,c.d,1);
  polyPx(x,[[2,3],[28,3],[30,13],[0,13]],c.l);R(x,2,3,26,1,c.h);R(x,0,13,30,2,c.m);R(x,0,14,30,1,c.o);
  for(let j=0;j<4;j++)for(let i=0;i<6;i++){const a=j*.25,b=(j+1)*.25;polyPx(x,[[7+i*3-a,4+j*2],[10+i*3-a,4+j*2],[10+i*3-b,6+j*2],[7+i*3-b,6+j*2]],(i+j)%2?'#3a2418':'#f2e6c8');}
  R(x,9,2,1,2,'#ffffff');R(x,15,2,1,2,'#2a1a10');R(x,20,3,1,2,'#ffffff');});}
function rattanChair(){const c=wp(WDL);return spr(22,26,x=>{ellipse(x,11,8,10,8,c.d);ellipse(x,11,7,9,7,c.m);ellipse(x,10,7,7,5,c.l);for(let j=2;j<14;j+=2)for(let i=3;i<20;i+=2)if(((i+j)/2)%2===0)P(x,i,j,c.d);
  RR(x,2,13,18,6,'#e8d6b0',2);R(x,3,13,16,1,'#fff2d4');R(x,3,18,16,1,'#c8b088');R(x,4,19,2,7,c.m);R(x,16,19,2,7,c.d);R(x,7,19,1,5,c.o);R(x,14,19,1,5,c.o);});}
function crate(){return spr(16,15,x=>{polyPx(x,[[1,0],[15,0],[16,3],[0,3]],'#d8a86a');R(x,1,0,14,1,'#f0c88a');R(x,0,3,16,12,'#b8864e');for(let j=6;j<15;j+=4)R(x,0,j,16,1,'#8a5a30');R(x,0,3,2,12,'#8a5a30');R(x,14,3,2,12,'#7a4a24');line(x,2,13,13,4,1,'#9a6a38');});}
function barrel(){return spr(12,14,x=>{R(x,1,3,10,11,'#9a6236');R(x,0,5,12,7,'#9a6236');R(x,1,4,2,9,'#b8784a');R(x,9,4,2,9,'#7a4a28');R(x,0,6,12,1,'#5a5a64');R(x,0,11,12,1,'#5a5a64');ellipse(x,6,3,5,2,'#7a4a28');ellipse(x,6,3,4,1,'#c8864e');});}
function autoclave(){return spr(40,32,x=>{box34(x,0,6,40,4,22,'#eef2f6','#c9d0da');RR(x,2,12,17,16,'#b0b8c4',1);RR(x,21,12,17,16,'#b0b8c4',1);R(x,17,19,1,3,'#5a6070');R(x,23,19,1,3,'#5a6070');
  RR(x,4,0,18,8,'#e6ebf0',1);R(x,5,0,16,1,'#ffffff');R(x,6,2,8,4,'#5a6070');R(x,7,3,4,2,'#7fe0c8');disc(x,18,4,2,'#3fae9c');RR(x,26,1,4,7,'#7fc8e8',1);RR(x,31,2,3,6,'#f2c84a',1);R(x,0,30,40,2,'#8a93a3');});}
function waterDisp(){return spr(14,34,x=>{box34(x,2,12,10,2,20,'#ffffff','#e6ebf0');R(x,4,20,6,3,'#5a6070');P(x,5,21,'#e84a4a');P(x,8,21,'#4a8aff');RR(x,3,0,8,13,'#8ac8f0',2);R(x,4,1,2,10,'#c8e8f8');R(x,4,11,6,2,'#6aa8d8');});}
function sewingMachine(){return spr(40,32,x=>{x.drawImage(table(40,WD,null,16),0,6);
  RR(x,12,0,18,6,'#2e2e34',2);R(x,13,0,16,1,'#5a5a64');RR(x,26,0,4,12,'#2e2e34',1);RR(x,12,7,16,4,'#2e2e34',1);R(x,14,8,4,1,'#e8c547');R(x,27,12,1,2,'#c9d0da');RR(x,4,8,6,4,'#c8414b',1);RR(x,32,9,5,3,'#4f86c9',1);});}

/** Kasur double untuk pasangan: k=2 queen (52 px), k=3 king (60 px). Dua bantal melengkung, selimut lebar berlipat. */
function bedDouble(k=2){const W=k===3?60:52,fr=wp(k===3?{d:'#4a2414',m:'#7a3e22',l:'#a8603a',h:'#c88050'}:WD);
  const bl=k===3?['#6a3a5a','#8a4a72','#b878a0']:['#2f6a5a','#3f8a74','#7ac0a8'];
  return spr(W,52,x=>{const c=W/2|0;
    polyPx(x,[[4,15],[4,7],[c-12,2],[c,1],[c+12,2],[W-4,7],[W-4,15]],fr.m);polyPx(x,[[6,15],[6,8],[c-11,4],[c,3],[c+11,4],[W-6,8],[W-6,15]],fr.d);
    for(let i=8;i<W-8;i+=4)R(x,i,8,2,7,fr.m);R(x,6,7,W-12,1,fr.h);
    [[0,0],[W-6,0]].forEach(([X,Y])=>{R(x,X+1,Y+4,4,14,fr.m);R(x,X+1,Y+4,1,14,fr.h);R(x,X+4,Y+4,1,14,fr.d);knob(x,X,Y,fr);});
    R(x,3,15,2,31,fr.m);R(x,W-5,15,2,31,fr.d);R(x,5,14,W-10,9,'#eef2f2');R(x,5,14,W-10,1,'#ffffff');
    [[8,c-2],[c+2,W-8]].forEach(([a,b])=>{polyPx(x,[[a+1,10],[b-1,10],[b,12],[b,17],[b-1,19],[a+1,19],[a,17],[a,12]],'#c8d8dc');polyPx(x,[[a+1,10],[b-1,10],[b-1,17],[a+1,17]],'#f4f8f8');R(x,a+2,11,b-a-4,1,'#ffffff');R(x,a+1,18,b-a-1,1,'#a8bcc0');});
    R(x,5,25,W-10,21,bl[1]);R(x,5,23,W-10,3,bl[2]);R(x,5,23,W-10,1,'#ffffff');R(x,5,26,W-10,1,bl[0]);
    for(let j=30;j<45;j+=5)for(let i=9;i<W-9;i+=8)P(x,i+(j%2)*4,j,bl[2]);R(x,W-9,26,4,20,bl[0]);for(let j=31;j<45;j+=6)R(x,10,j,8,1,bl[0]);R(x,c-1,27,1,18,shade(bl[1],-.12));
    polyPx(x,[[4,44],[W-4,44],[W-4,47],[4,47]],bl[0]);
    R(x,1,45,W-2,7,fr.m);R(x,1,45,W-2,1,fr.h);R(x,4,47,W-8,4,fr.d);R(x,4,47,W-8,1,fr.o);knob(x,0,43,fr);knob(x,W-6,43,fr);});}
