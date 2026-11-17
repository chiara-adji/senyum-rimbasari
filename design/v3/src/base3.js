/* ================= FURNITUR ================= */
function dentalUnit(lv){return spr(62,56,x=>{
  const m=lv>1?['#4f9a84','#86cbb2','#c2ecdc']:['#8a6838','#bf975a','#dcbc84'];
  const me=lv>1?['#6f7886','#b0b8c4','#e4e9ef']:['#5e5850','#857d72','#a8a094'];
  // tiang & lampu
  R(x,46,6,3,40,me[1]);R(x,46,6,1,40,me[2]);R(x,16,4,33,3,me[1]);R(x,16,4,33,1,me[2]);
  ellipse(x,15,9,7,4,me[2]);ellipse(x,15,10,5,2,lv>1?'#fff2a8':'#d8c68a');
  // alas
  ellipse(x,30,51,14,3,me[0]);ellipse(x,30,50,12,2,me[1]);R(x,26,38,8,12,me[1]);R(x,32,38,2,12,me[0]);
  // sandaran
  line(x,13,21,27,34,9,m[0]);line(x,12,20,26,33,6,m[1]);line(x,11,19,23,30,2,m[2]);
  ellipse(x,10,18,5,4,m[0]);ellipse(x,9,17,4,3,m[1]);R(x,7,15,3,1,m[2]);
  // dudukan & kaki
  R(x,24,31,17,8,m[0]);R(x,24,31,17,5,m[1]);R(x,24,31,17,1,m[2]);
  line(x,41,35,53,44,7,m[0]);line(x,41,34,53,43,4,m[1]);R(x,50,44,8,4,m[0]);R(x,50,44,8,1,m[1]);
  R(x,22,27,11,2,me[1]);R(x,22,27,11,1,me[2]);
  if(lv>1){R(x,54,14,2,22,me[1]);R(x,49,11,13,4,me[1]);R(x,49,11,13,1,me[2]);[51,54,57].forEach(i=>R(x,i,9,1,2,'#e6ebf0'));P(x,60,9,'#ffd23a');
    R(x,2,30,2,12,me[1]);ellipse(x,4,29,4,2,'#eef2f6');ellipse(x,4,29,2,1,'#7fc8e8');
    if(lv>2){R(x,52,0,9,7,'#2e3440');R(x,53,1,7,5,'#5ad0e8');P(x,54,2,'#e0fbff');R(x,56,7,1,4,me[0]);}}
  else{P(x,30,33,'#6a4a2a');P(x,31,34,'#6a4a2a');P(x,14,23,'#6a4a2a');R(x,35,32,3,1,'#7a5a32');P(x,47,20,'#7a4a2a');P(x,47,26,'#7a4a2a');}
});}
function snackTable(lv=2){return spr(56,36,x=>{
  const t=lv>2?['#5a2e1a','#8a4a2a','#b06a3e','#c8804a']:lv>1?[WD.d,WD.m,WD.l,WD.h]:['#3e2a1e','#5e4232','#7a5a44','#8e6c54'];
  const ch=(X,flip)=>{R(x,X+(flip?8:0),6,3,22,t[1]);R(x,X+(flip?8:0),6,3,1,t[3]);R(x,X,16,11,4,t[2]);R(x,X,16,11,1,t[3]);R(x,X+1,20,2,10,t[0]);R(x,X+8,20,2,10,t[0]);};
  ch(0,0);ch(45,1);
  R(x,12,10,32,9,t[2]);R(x,12,10,32,2,t[3]);R(x,12,19,32,4,t[1]);R(x,12,22,32,1,t[0]);R(x,13,23,3,11,t[1]);R(x,40,23,3,11,t[1]);R(x,15,23,1,11,t[0]);R(x,42,23,1,11,t[0]);
  ellipse(x,21,14,6,2,'#f4f1e6');ellipse(x,21,14,4,1,'#e2dccb');[[18,13],[21,12],[24,13],[20,14]].forEach(p=>{R(x,p[0],p[1],2,2,'#c27a3a');P(x,p[0],p[1],'#e6a25a');});P(x,22,13,'#4a2a14');
  R(x,32,9,6,6,'#f2ead8');R(x,37,9,1,6,'#cfc2a6');R(x,33,9,4,1,'#5a3214');R(x,38,10,2,1,'#f2ead8');R(x,39,11,1,2,'#f2ead8');R(x,38,13,2,1,'#f2ead8');
  P(x,34,6,'#ffffff');P(x,35,5,'#ffffff');P(x,34,3,'#ffffff');P(x,36,4,'#ffffff');
});}
function workDesk(lv=2){return spr(54,52,x=>{
  const t=lv===1?['#3a281c','#56402e','#6e5644','#84694f']:lv>2?['#4a2414','#743c22','#9a5530','#b86c3e']:[WD.d,WD.m,WD.l,WD.h];
  R(x,2,14,48,9,t[2]);R(x,2,14,48,2,t[3]);R(x,2,23,48,15,t[1]);R(x,2,23,48,1,t[0]);
  R(x,33,25,15,6,t[2]);R(x,33,32,15,5,t[2]);P(x,40,27,'#ffd23a');P(x,40,34,'#ffd23a');R(x,3,23,4,17,t[1]);R(x,3,38,4,2,t[0]);R(x,46,37,4,3,t[0]);
  const bk=['#2f5d9e','#3f8f4a','#a83a26','#e3aa3c','#6a3a8a'];
  if(lv>1){bk.forEach((b,i)=>{const h=8+((i*3)%4);R(x,4+i*3,15-h+2,3,h,b);P(x,4+i*3,15-h+2,'#ffffff55');});}
  else{R(x,5,10,10,4,'#c8b89a');R(x,5,10,10,1,'#e6dcc4');}
  R(x,19,12,14,7,'#f7f1dc');R(x,26,12,1,7,'#cfc4a4');[[20,14],[20,16],[28,14],[28,16]].forEach(p=>R(x,p[0],p[1],4,1,'#9a907a'));
  disc(x,38,13,2,'#2a3a6a');P(x,37,12,'#6a8ad0');R(x,42,12,7,6,'#ffffff');R(x,42,12,7,1,'#e8e2d0');R(x,43,14,5,1,'#b0a890');R(x,43,16,4,1,'#b0a890');
  line(x,36,17,40,10,1,'#3a2a1f');
  if(lv>1){R(x,22,3,1,9,'#d0d0d0');}
  // bangku
  ellipse(x,26,43,6,2,t[3]);ellipse(x,26,44,6,2,t[2]);R(x,21,45,2,6,t[1]);R(x,29,45,2,6,t[1]);R(x,25,46,2,5,t[0]);
});}
function bed(k){return spr(36,48,x=>{
  const fr=k===3?['#4a2414','#7a3e22','#a8603a']:k===2?[WD.d,WD.m,WD.l]:['#3e2a1e','#5e4232','#7a5a44'];
  R(x,0,0,36,13,fr[1]);R(x,0,0,36,2,fr[2]);R(x,3,3,30,8,fr[0]);if(k===3){R(x,5,4,26,6,fr[1]);for(let i=8;i<30;i+=6)R(x,i,5,2,4,fr[2]);R(x,0,0,3,15,fr[0]);R(x,33,0,3,15,fr[0]);}
  R(x,1,12,34,31,'#f4efe4');
  if(k===1){R(x,6,13,24,7,'#e6dcc8');R(x,6,13,24,2,'#fbf6ea');}
  else{R(x,3,13,14,7,'#ffffff');R(x,19,13,14,7,'#ffffff');R(x,3,18,14,2,'#d8d4cc');R(x,19,18,14,2,'#d8d4cc');}
  const bl=k===1?['#cbb68e','#a8956e','#e2d4b4']:k===2?['#c8414b','#3f8f4a','#e3aa3c']:['#f0d8a0','#c8a868','#fff2cc'];
  R(x,1,21,34,21,bl[0]);
  if(k===2){for(let y=23;y<42;y++){R(x,1,y,34,1,bl[((y-23)/4|0)%3]);}for(let i=4;i<34;i+=6)R(x,i,23,1,19,'#f4efe4');}
  else{R(x,31,23,4,19,bl[1]);for(let i=5;i<30;i+=8)for(let y=27;y<40;y+=6)P(x,i+(y%12?4:0),y,bl[1]);if(k===1){R(x,8,30,6,4,'#b8a27a');}}
  R(x,1,21,34,2,'#f4efe4');R(x,1,23,34,1,'#d8d0c0');
  R(x,0,42,36,5,fr[1]);R(x,0,42,36,1,fr[2]);
});}
function woodStove(){return spr(24,52,x=>{R(x,9,0,5,28,'#2e2e34');R(x,9,0,1,28,'#56565e');R(x,8,10,7,2,'#46464e');
  R(x,2,26,20,18,'#2e2e34');R(x,1,24,22,4,'#46464e');R(x,1,24,22,1,'#6a6a74');R(x,6,31,12,9,'#1a1a1e');R(x,7,33,10,6,'#ff7a2a');R(x,9,35,6,4,'#ffd23a');P(x,11,34,'#ffffff');
  R(x,3,44,3,6,'#2e2e34');R(x,18,44,3,6,'#2e2e34');R(x,19,26,2,18,'#1e1e22');});}
function fireplace(){return spr(46,70,x=>{
  const br=(X,Y,W,H)=>{R(x,X,Y,W,H,'#6e2c22');for(let j=0;j<H;j++)for(let i=0;i<W;i++){const row=(j/4|0),bx=(i+(row%2)*4)%8;if(j%4!==3&&bx!==7)P(x,X+i,Y+j,hash(((i+(row%2)*4)/8|0)+X,row)<.3?'#b0503e':'#a0463a');}};
  br(12,0,22,30);br(0,28,46,40);R(x,0,28,46,4,WD.m);R(x,0,28,46,1,WD.h);
  R(x,8,40,30,26,'#1a0e0a');R(x,8,40,30,2,'#3a1e14');
  R(x,12,60,22,3,'#5a3a24');[[14,54,4],[20,50,5],[27,53,4]].forEach(([a,b,r])=>{ellipse(x,a+2,b+4,r,6,'#ff7a2a');ellipse(x,a+2,b+6,r-2,4,'#ffd23a');});P(x,22,52,'#ffffff');
  R(x,6,66,34,3,'#8e8884');});}
function sofa(w,col=['#a8703e','#d0985a','#e8b878']){return spr(w,26,x=>{R(x,0,0,w,10,col[1]);R(x,0,0,w,2,col[2]);R(x,0,4,6,16,col[0]);R(x,w-6,4,6,16,col[0]);R(x,0,4,6,2,col[1]);R(x,w-6,4,6,2,col[1]);
  R(x,6,10,w-12,8,col[2]);R(x,6,17,w-12,1,col[1]);for(let i=6+((w-12)/2|0);i<w-6;i+=99)R(x,i,10,1,8,col[1]);R(x,(w/2|0),10,1,8,col[1]);R(x,0,20,w,4,col[0]);R(x,2,24,2,2,WD.d);R(x,w-4,24,2,2,WD.d);});}
function bookshelf(w=30){return spr(w,48,x=>{R(x,0,0,w,48,WD.m);R(x,0,0,w,2,WD.h);R(x,2,3,w-4,43,WD.d);const rr=rng(w*7);const cols=['#2f5d9e','#3f8f4a','#a83a26','#e3aa3c','#6a3a8a','#d8d0c0','#2a8a8a'];
  [3,17,31].forEach(y=>{let i=2;while(i<w-4){const bw=2+(rr()*2|0),bh=8+(rr()*4|0);if(rr()<.12){i+=3;continue;}R(x,i,y+12-bh,Math.min(bw,w-2-i),bh,cols[(rr()*cols.length)|0]);i+=bw;}R(x,2,y+12,w-4,2,WD.l);});});}
function kitchen(w){return spr(w,42,x=>{for(let j=0;j<10;j++)for(let i=0;i<w;i++)P(x,i,j,(i%5===0||j%5===0)?'#c8bca4':'#eee6d4');
  R(x,0,10,w,6,'#d9cdb4');R(x,0,10,w,1,'#f2ead8');R(x,0,15,w,1,'#a89878');R(x,0,16,w,24,WD.l);R(x,0,16,w,1,WD.d);
  for(let i=0;i<w;i+=14){R(x,i+1,18,12,20,WD.m);R(x,i+2,19,10,18,WD.l);P(x,i+10,27,'#ffd23a');}
  R(x,6,11,14,4,'#9aa3b0');R(x,7,12,12,2,'#7fb8d8');R(x,12,5,2,6,'#c9d0da');R(x,12,5,5,1,'#c9d0da');
  const s=w-24;R(x,s,10,20,6,'#2e2e34');disc(x,s+5,12,2,'#5a5a64');disc(x,s+14,12,2,'#5a5a64');R(x,s+10,4,8,7,'#c9d0da');R(x,s+10,4,8,1,'#ffffff');R(x,s+8,6,2,1,'#c9d0da');
  if(w>60){R(x,26,6,4,5,'#e8c547');R(x,32,7,3,4,'#c8414b');}});}
function nightstand(lampOn=true){return spr(16,26,x=>{R(x,1,12,14,13,WD.m);R(x,1,12,14,2,WD.h);R(x,3,16,10,7,WD.l);P(x,8,19,'#ffd23a');if(lampOn){R(x,7,7,2,5,'#c9a46a');R(x,4,1,8,6,'#f2d27a');R(x,4,1,8,1,'#fff2a8');R(x,10,2,2,5,'#d8b050');}});}
function potPlant(v=0,big=0){const H=big?38:30;return spr(22,H,x=>{const py=H-11;R(x,6,py,10,10,'#b55a2e');R(x,5,py-1,12,2,'#d07a44');R(x,14,py+1,2,9,'#8a4020');
  const cx=11,cy=py-1;const tips=v===0?[[2,cy-14],[6,cy-20],[11,cy-24],[16,cy-20],[20,cy-14],[1,cy-6],[21,cy-6]]:v===1?[[3,cy-10],[8,cy-18],[14,cy-18],[19,cy-10],[11,cy-14]]:[[1,cy-8],[5,cy-16],[11,cy-22],[17,cy-16],[21,cy-8],[9,cy-10],[14,cy-10]];
  tips.forEach(([a,b])=>line(x,cx,cy,a,Math.max(0,b+(big?0:6)),3,'#2f7a36'));tips.forEach(([a,b])=>line(x,(cx+a)/2,(cy+Math.max(0,b+(big?0:6)))/2,a,Math.max(0,b+(big?0:6)),1,'#5cb84a'));});}
function sinkPed(){return spr(18,32,x=>{R(x,7,13,4,16,'#e6ebf0');R(x,10,13,1,16,'#b8c0cc');R(x,5,28,8,3,'#c9d0da');ellipse(x,9,10,8,4,'#f4f6f8');ellipse(x,9,10,6,2,'#a8d4e8');R(x,8,1,2,6,'#9aa3b0');R(x,8,1,5,2,'#9aa3b0');P(x,8,1,'#ffffff');});}
function fileCab(){return spr(18,34,x=>{R(x,0,0,18,34,'#9aa3b0');R(x,0,0,18,2,'#c9d0da');R(x,15,2,3,32,'#7a8494');for(let r=0;r<3;r++){R(x,2,4+r*10,12,8,'#b8c0cc');R(x,6,7+r*10,4,1,'#5a6070');}});}
function autoclave(){return spr(40,32,x=>{R(x,0,8,40,24,'#c9d0da');R(x,0,8,40,2,'#eef2f6');R(x,2,12,17,18,'#b0b8c4');R(x,21,12,17,18,'#b0b8c4');P(x,17,20,'#5a6070');P(x,23,20,'#5a6070');
  R(x,4,0,18,9,'#e6ebf0');R(x,4,0,18,1,'#ffffff');R(x,6,2,8,5,'#5a6070');disc(x,18,4,2,'#3fae9c');R(x,26,3,4,6,'#7fc8e8');R(x,31,4,3,5,'#f2c84a');});}
function reception(){return spr(64,36,x=>{R(x,0,10,64,6,'#e8d6b0');R(x,0,10,64,1,'#fff2d4');R(x,0,16,64,18,'#c8a070');R(x,0,16,64,1,'#8a6a40');for(let i=4;i<64;i+=12)R(x,i,19,8,12,'#d8b484');
  R(x,40,0,16,10,'#2e3440');R(x,41,1,14,7,'#5ad0e8');R(x,42,2,5,1,'#e0fbff');R(x,47,10,2,1,'#2e3440');R(x,38,12,14,2,'#d8d8dc');R(x,8,11,10,4,'#ffffff');R(x,20,11,4,3,'#f2c84a');disc(x,30,12,2,'#c8414b');});}
function aquarium(){return spr(30,36,x=>{R(x,0,20,30,16,WD.m);R(x,0,20,30,2,WD.h);R(x,3,24,24,10,WD.l);P(x,15,28,'#ffd23a');
  R(x,1,2,28,18,'#3a8ac8');R(x,1,2,28,4,'#7fc8f0');R(x,1,17,28,3,'#e8d6a8');R(x,0,0,30,2,'#2e3440');
  line(x,5,17,4,9,1,'#3f9a54');line(x,7,17,8,11,1,'#3f9a54');line(x,24,17,25,8,1,'#3f9a54');R(x,10,9,3,2,'#ff8a2a');P(x,13,9,'#ffd23a');R(x,18,12,3,2,'#ffd23a');P(x,17,12,'#ff8a2a');P(x,22,6,'#ffffff');P(x,21,4,'#ffffff');});}
function chairW(col=WD){return spr(12,22,x=>{R(x,1,0,10,9,col.m);R(x,1,0,10,1,col.h);R(x,3,2,6,5,col.d);R(x,4,2,1,5,col.l);R(x,7,2,1,5,col.l);R(x,0,9,12,4,col.l);R(x,0,9,12,1,col.h);R(x,1,13,2,8,col.m);R(x,9,13,2,8,col.m);});}
function crate(){return spr(16,15,x=>{R(x,0,0,16,15,'#b8864e');R(x,0,0,16,2,'#d8a86a');for(let j=3;j<15;j+=4)R(x,0,j,16,1,'#8a5a30');R(x,0,0,2,15,'#8a5a30');R(x,14,0,2,15,'#8a5a30');});}
function trayBottles(){return spr(20,24,x=>{R(x,1,8,18,4,'#6e5644');R(x,1,8,18,1,'#86694f');R(x,2,12,2,11,'#56402e');R(x,16,12,2,11,'#56402e');R(x,3,18,14,1,'#56402e');
  R(x,3,2,3,7,'#4a8a5a');R(x,4,0,1,2,'#c9c0b0');R(x,8,4,3,5,'#a8562e');R(x,13,1,4,8,'#e0d8c8');R(x,14,0,2,1,'#c8414b');P(x,3,3,'#9ad0a8');});}
function bench2(w=40){return spr(w,18,x=>{R(x,0,0,w,6,'#86cbb2');R(x,0,0,w,1,'#c2ecdc');R(x,0,6,w,5,'#c2ecdc');R(x,0,10,w,2,'#4f9a84');R(x,2,12,2,6,'#8a93a3');R(x,w-4,12,2,6,'#8a93a3');});}
function lampStand(){return spr(12,34,x=>{R(x,5,8,2,24,'#3a3a40');R(x,2,31,8,2,'#3a3a40');R(x,1,0,10,9,'#f2d27a');R(x,1,0,10,1,'#fff2a8');R(x,8,1,3,8,'#d8b050');});}
/* dekorasi dinding (langsung ke kanvas) */
function wWindow(X,Y,W,H,kind){return x=>{const fr=kind==='old'?'#5a3d2a':'#d6a46a',fd=kind==='old'?'#3a271b':'#a8703e';
  R(x,X-2,Y-2,W+4,H+4,'#2a1610');R(x,X-1,Y-1,W+2,H+2,fr);R(x,X,Y,W,H,'#8fd0ee');R(x,X,Y,W,(H*.45)|0,'#c4ecf8');R(x,X,Y+H-4,W,4,'#7ab86a');R(x,X+3,Y+H-6,6,2,'#5a9a4a');
  for(let k=0;k<5;k++)P(x,X+W-4-k,Y+2+k,'#ffffff');R(x,X+(W/2|0),Y,1,H,fr);R(x,X,Y+(H/2|0),W,1,fr);
  if(kind==='old'){R(x,X,Y,(W/2|0),(H/2|0),'#26303a');P(x,X+2,Y+2,'#8fd0ee');P(x,X+3,Y+3,'#8fd0ee');}
  R(x,X-3,Y+H+1,W+6,2,fr);R(x,X-3,Y+H+3,W+6,1,fd);
  if(kind==='curtain'){[[X-5,0],[X+W,1]].forEach(([cx])=>{R(x,cx,Y-3,5,H+6,'#a83a3a');R(x,cx,Y-3,1,H+6,'#d65a50');R(x,cx+4,Y-3,1,H+6,'#7a2424');R(x,cx,Y+H-2,5,2,'#e3aa3c');});R(x,X-6,Y-5,W+12,2,WD.d);}
  if(kind==='blind'){for(let j=0;j<(H*.35|0);j+=2)R(x,X,Y+j,W,1,'#f2ead8');}}}
function wDoorDark(X,Y,W,H){return x=>{R(x,X-2,Y-2,W+4,H+2,'#2a1610');R(x,X-1,Y-1,W+2,H+1,'#5a3d2a');R(x,X,Y,W,H,'#140c08');R(x,X,Y+H-8,W,8,'#22160e');R(x,X+2,Y+H-3,W-6,1,'#3a271b');}}
function wPainting(X,Y,W,H){return x=>{R(x,X-1,Y-1,W+2,H+2,'#2a1610');R(x,X,Y,W,H,'#c8963a');R(x,X+2,Y+2,W-4,H-4,'#9fd8f0');R(x,X+2,Y+H-8,W-4,6,'#5a9a4a');
  for(let i=0;i<W-4;i++){const hh=Math.round(4+Math.sin(i/5)*3);R(x,X+2+i,Y+H-2-hh-4,1,hh,'#3f7a3a');}disc(x,X+W-8,Y+6,2,'#ffe27a');R(x,X+1,Y+1,W-2,1,'#e8b85a');}}
function wClock(X,Y){return x=>{disc(x,X,Y,6,'#2a1610');disc(x,X,Y,5,WD.l);disc(x,X,Y,4,'#f7f2e4');R(x,X,Y-3,1,3,'#2a1a1f');R(x,X,Y,3,1,'#2a1a1f');}}
function wXray(X,Y){return x=>{R(x,X-1,Y-1,32,22,'#2a1610');R(x,X,Y,30,20,'#e6ebf0');R(x,X+2,Y+2,26,15,'#1a2a3a');
  for(let i=0;i<20;i++){const yy=Math.round(Y+6+Math.pow((i-9.5)/9.5,2)*-4+4);R(x,X+5+i,yy,1,3,i%3===0?'#2a3a4a':'#d8eef8');R(x,X+5+i,yy+5,1,3,i%3===1?'#2a3a4a':'#c8e0ec');}R(x,X+12,Y+18,6,1,'#9aa3b0');}}
function wPoster(X,Y){return x=>{R(x,X-1,Y-1,18,24,'#2a1610');R(x,X,Y,16,22,'#ffffff');R(x,X,Y,16,4,'#3fae9c');x.drawImage(IC.tooth,X,Y+4);R(x,X+3,Y+19,10,1,'#9aa3b0');}}
function wCert(X,Y){return x=>{R(x,X-1,Y-1,22,16,'#2a1610');R(x,X,Y,20,14,'#c8963a');R(x,X+2,Y+2,16,10,'#fbf4e2');R(x,X+5,Y+4,10,1,'#9a907a');R(x,X+4,Y+6,12,1,'#c8c0a8');disc(x,X+14,Y+9,2,'#c8414b');}}
function wShelf(X,Y,W){return x=>{R(x,X,Y+8,W,3,WD.l);R(x,X,Y+8,W,1,WD.h);R(x,X,Y+11,W,1,'#2a1610');R(x,X+2,Y+11,2,3,WD.d);R(x,X+W-4,Y+11,2,3,WD.d);
  R(x,X+3,Y+2,5,6,'#e8c547');R(x,X+3,Y+1,5,1,'#8a5a30');R(x,X+10,Y+3,4,5,'#7fb8d8');R(x,X+16,Y,3,8,'#4a8a5a');R(x,X+21,Y+4,6,4,'#d8d0c0');}}
function wCobweb(X,Y,flip){return x=>{const c='#c8c0b4';for(let i=0;i<9;i++){P(x,flip?X-i:X+i,Y,c);P(x,X+(flip?0:0),Y+i,c);}for(let i=0;i<7;i++)P(x,flip?X-i:X+i,Y+i,c);[[4,1],[5,2],[1,4],[2,5],[6,3],[3,6]].forEach(([a,b])=>P(x,flip?X-a:X+a,Y+b,c));}}
function wCrack(X,Y){return x=>{[[0,0],[1,1],[1,2],[2,3],[2,4],[1,5],[2,6],[3,7],[3,8]].forEach(([a,b])=>P(x,X+a,Y+b,'#2a1a12'));}}
function lightPatch(X,Y,W,H){return x=>{x.fillStyle='rgba(255,246,210,.16)';for(let j=0;j<H;j++)x.fillRect(X+j*0.5|0,Y+j,W,1);}}
function rug(X,Y,W,H,c){return x=>{R(x,X,Y,W,H,c[0]);R(x,X+2,Y+2,W-4,H-4,c[1]);R(x,X+4,Y+4,W-8,H-8,c[2]);
  for(let j=Y+6;j<Y+H-6;j+=6)for(let i=X+6+((j/6|0)%2)*3;i<X+W-6;i+=6){P(x,i,j,c[0]);P(x,i+1,j+1,c[0]);P(x,i-1,j+1,c[0]);P(x,i,j+2,c[0]);}
  for(let i=X;i<X+W;i+=2){P(x,i,Y-1,c[1]);P(x,i,Y+H,c[1]);}}}
function debris(seed,X,Y,W,H){return x=>{const rr=rng(seed);for(let k=0;k<26;k++){const a=X+rr()*W,b=Y+rr()*H;P(x,a,b,rr()<.5?'#3a2a1e':'#8a7258');if(rr()<.3)P(x,a+1,b,'#2a1e14');}
  }}

/* ================= RUANGAN ================= */
const FLOOR={
  plankOld:(i,j)=>{const row=(j/7)|0,by=j%7;const seam=((i+row*17)%44)===0;let c=row%2?'#56422f':'#5e4934';if(by===0)c='#6e5842';if(by===6||seam)c='#2f2218';const h=hash(i>>1,j);if(h<.05)c='#4a3828';else if(h>.975)c='#7a644c';return c;},
  plankGray:(i,j)=>{const row=(j/7)|0,by=j%7;const seam=((i+row*19)%40)===0;let c=row%2?'#5a5048':'#615650';if(by===0)c='#72665c';if(by===6||seam)c='#2e2824';const h=hash(i>>1,j);if(h<.05)c='#4c443e';return c;},
  plankWarm:(i,j)=>{const row=(j/8)|0,by=j%8;const seam=((i+row*23)%52)===0;let c=row%2?'#b4733c':'#bd7b42';if(by===0)c='#d0904f';if(by===7||seam)c='#7a4622';if(hash(i,j>>1)<.05)c='#a8692f';else if(by>1&&by<6&&hash(i>>3,j+row)<.04)c='#ab6c36';return c;},
  tileCream:(i,j)=>{const gi=i%16,gj=j%16;if(gi===0||gj===0)return '#cdb894';let c=hash(i>>4,j>>4)<.3?'#ece0c4':'#f2e7cf';if(gi===1||gj===1)c='#fbf4e4';if(gi===15||gj===15)c='#e2d3b4';return c;},
  tileWhite:(i,j)=>{const gi=i%16,gj=j%16;if(gi===0||gj===0)return '#d2ccc0';let c=((i>>4)+(j>>4))%2?'#f4f2ec':'#e6f0ec';if(gi===1||gj===1)c='#ffffff';return c;},
  parquet:(i,j)=>{const ci=(i/12)|0,cj=(j/12)|0;const v=(ci+cj)%2;const s=v?(i%12)%4:(j%12)%4;const idx=(v?((i%12)>>2):((j%12)>>2))+((ci*3+cj)%2);let c=['#9c5c30','#a8663a','#93552c','#b06e3e'][idx];if(s===0)c='#6a3a1c';return c;},
};
const WALL={
  plankOld:(i,j,H)=>{if(j<4)return j===3?'#2a1a12':'#4a3222';const pi=i%7;let c=((i/7)|0)%2?'#5d4130':'#674834';if(pi===0)c='#33231a';else if(pi===1)c='#78563e';if(hash(i>>1,j>>2)<.05)c='#3e2b1e';return c;},
  plankWarm:(i,j,H)=>{if(j<4)return j===3?'#4a2a16':'#7a4a28';if(j>H-16){if(j===H-16)return '#d09a5c';return (i%10===0)?'#5e3a20':'#8a5530';}const pi=i%8;let c=((i/8)|0)%2?'#9a6238':'#a2693c';if(pi===0)c='#6a3e20';else if(pi===1)c='#b47a48';return c;},
  plaster:(i,j,H)=>{if(j<3)return j===2?'#b89a72':'#e8d8b8';if(j>H-18){if(j===H-18)return '#7a4a28';if(j===H-17)return '#d09a5c';return (i%8===0)?'#7a4a28':(i%8===1?'#c08850':'#a8703e');}return hash(i>>1,j>>1)<.12?'#ecdfc2':'#f3e8d0';},
  clinicWhite:(i,j,H)=>{if(j<3)return j===2?'#c9c2b4':'#ffffff';if(j>H-14){if(j===H-14)return '#7fb8a4';return (i%12===0)?'#9fd0be':'#bfe6d6';}if(i%40===0)return '#ebe5da';return '#f8f5ee';},
  wallpaper:(i,j,H)=>{if(j<4)return j<2?'#8a5530':'#6a3e20';if(j>H-16){if(j===H-16)return '#d09a5c';return (i%10===0)?'#6a3e20':'#9a6238';}let c=(i%8<4)?'#f0e2c4':'#e8d6b0';if((i%8===6)&&(j%8===4))c='#c99a6a';return c;},
};
const RW=272,RFH=176,RH=184,RNX=118,RNW=36,RWH=48;
function drawRoom(o){const[c,x]=cv(RW,RH);
  const D='#2a1610',O='#b85e26',L='#e8954c';
  R(x,1,0,RW-2,RFH,D);R(x,0,1,RW,RFH-2,D);R(x,RNX,RFH-4,RNW,12,D);
  R(x,1,1,RW-2,RFH-2,O);R(x,RNX+1,RFH-4,RNW-2,11,O);
  R(x,2,2,RW-4,RFH-4,L);R(x,RNX+2,RFH-4,RNW-4,10,L);
  R(x,3,3,RW-6,RFH-6,D);R(x,RNX+3,RFH-4,RNW-6,9,D);
  paint(x,4,4,RW-8,RWH,(i,j)=>WALL[o.wall](i,j,RWH));
  paint(x,4,4+RWH,RW-8,RFH-8-RWH,FLOOR[o.floor]);
  paint(x,RNX+4,RFH-4,RNW-8,7,(i,j)=>FLOOR[o.floor](i+RNX,j+RFH-8-RWH));
  R(x,4,4+RWH-2,RW-8,2,'#3a2418');R(x,4,4+RWH-2,RW-8,1,'#5a3a24');
  x.fillStyle='rgba(30,15,5,.22)';x.fillRect(4,4+RWH,RW-8,3);
  R(x,RNX+7,RFH-2,RNW-14,4,'#9a4a2e');R(x,RNX+8,RFH-1,RNW-16,2,'#c86a3a');
  (o.wallDeco||[]).forEach(f=>f(x));(o.floorDeco||[]).forEach(f=>f(x));
  const ent=(o.items||[]).map(([img,X,Y])=>({img,X,Y,z:Y+img.height}));
  (o.chars||[]).forEach(([img,X,Y])=>ent.push({img,X,Y,z:Y+31,ch:1}));
  ent.sort((a,b)=>a.z-b.z).forEach(e=>{if(e.ch)drawChar(x,e.img,e.X,e.Y);else{x.fillStyle='rgba(20,10,5,.2)';x.fillRect(e.X+2,e.Y+e.img.height-2,e.img.width-4,3);x.drawImage(e.img,e.X,e.Y);}});
  (o.over||[]).forEach(f=>f(x));
  return c;}
const ROOMS={
  klinik1:{wall:'plankOld',floor:'plankOld',
    wallDeco:[wWindow(30,14,24,22,'old'),wDoorDark(128,12,28,38),wCobweb(4,4),wCobweb(267,4,1),wCrack(210,20),wCrack(90,26),wShelf(176,14,30)],
    floorDeco:[lightPatch(34,54,26,30),debris(5,20,60,230,100)],
    items:()=>[[sinkPed(),78,28],[dentalUnit(1),104,66],[chairW({d:'#3e2a1e',m:'#5e4232',l:'#7a5a44',h:'#8e6c54'}),24,98],[chairW({d:'#3e2a1e',m:'#5e4232',l:'#7a5a44',h:'#8e6c54'}),40,98],[trayBottles(),186,74],[potPlant(1),236,40],[crate(),20,140],[crate(),34,148],[workDesk(1),186,114]]},
  klinik2:{wall:'plaster',floor:'tileCream',
    wallDeco:[wWindow(22,12,26,24,'blind'),wXray(92,12),wClock(146,20),wPoster(166,14),wCert(194,16)],
    floorDeco:[lightPatch(26,54,28,30)],
    items:()=>[[sinkPed(),62,28],[dentalUnit(2),66,62],[autoclave(),190,28],[fileCab(),240,24],[workDesk(2),180,104],[potPlant(0),10,128],[potPlant(2,1),242,132],[bench2(40),20,150]]},
  klinik3:{wall:'clinicWhite',floor:'tileWhite',
    wallDeco:[wWindow(16,10,22,26,'blind'),wWindow(44,10,22,26,'blind'),wClock(124,20),wPainting(178,12,40,24),wWindow(236,10,22,26,'blind')],
    floorDeco:[lightPatch(20,54,46,30),rug(170,94,92,56,['#7a8a5a','#a8b878','#c8d498'])],
    items:()=>[[dentalUnit(3),22,58],[aquarium(),136,30],[reception(),76,102],[sofa(60,['#b8865a','#dcae7a','#f0cc9a']),186,64],[snackTable(3),188,108],[potPlant(0,1),8,132],[potPlant(2,1),246,130],[potPlant(1),110,26]]},
  rumah1:{wall:'plankOld',floor:'plankGray',
    wallDeco:[wWindow(46,12,22,22,'clean'),wShelf(150,16,30),wCrack(120,24)],
    floorDeco:[lightPatch(50,54,24,28),debris(9,140,90,100,60)],
    items:()=>[[bed(1),14,46],[crate(),54,64],[woodStove(),208,8],[snackTable(1),170,110],[crate(),18,146],[chairW({d:'#3e2a1e',m:'#5e4232',l:'#7a5a44',h:'#8e6c54'}),100,62]]},
  rumah2:{wall:'plankWarm',floor:'plankWarm',
    wallDeco:[wWindow(66,12,22,22,'clean'),wWindow(150,12,22,22,'clean'),wPainting(196,14,26,18)],
    floorDeco:[lightPatch(70,54,24,28),rug(100,102,74,40,['#8a3a3a','#c8604a','#e8a060']),rug(12,96,40,22,['#3f6a4a','#6a9a5a','#a8c87a'])],
    items:()=>[[bed(2),14,46],[nightstand(),52,48],[kitchen(72),96,34],[bookshelf(30),232,20],[snackTable(2),110,106],[workDesk(2),196,114],[potPlant(0),10,136],[potPlant(1),176,36]]},
  rumah3:{wall:'wallpaper',floor:'parquet',
    wallDeco:[wWindow(28,12,24,24,'curtain'),wWindow(166,12,20,24,'curtain'),wClock(84,20)],
    floorDeco:[lightPatch(32,54,26,30),rug(64,98,112,52,['#5a2a3a','#8a3a4a','#c87a5a'])],
    items:()=>[[bed(3),22,44],[nightstand(),60,46],[fireplace(),110,4],[kitchen(62),198,34],[sofa(56),24,118],[snackTable(3),92,110],[sofa(22,['#a8703e','#d0985a','#e8b878']),152,108],[workDesk(3),206,116],[bookshelf(26),92,30],[potPlant(0,1),2,138],[lampStand(),62,78]]},
};

/* ================= DEKORASI KOTA ================= */
function tuft(pal,v){return spr(7,6,x=>{P(x,1,3,pal.g2);R(x,1,4,1,2,pal.g1);R(x,3,1,1,5,pal.g2);P(x,3,0,pal.g3);P(x,5,2,pal.g2);R(x,5,3,1,3,pal.g1);if(v)P(x,3,0,'#fff4c8');},pal.g0);}
function flowerPatch(pal,col){return spr(14,9,x=>{const rr=rng(col.length*13+pal.g1.length);for(let k=0;k<6;k++){const a=1+(k*2)%12,b=2+((k*5)%5);R(x,a,b+1,1,6-b+1,pal.g0);R(x,a,b,2,2,k%3===2?'#fff4c8':col);P(x,a,b,'#ffffff');}P(x,6,7,pal.g2);P(x,9,6,pal.g2);},pal.g0);}
function rock(pal,big){const w=big?14:9,h=big?9:6;return spr(w,h,x=>{ellipse(x,w/2|0,h/2|0,(w/2|0)-1,(h/2|0),pal.s1);ellipse(x,(w/2|0)-1,(h/2|0)-1,(w/2|0)-3,(h/2|0)-2,pal.s2);R(x,1,h-2,w-2,1,pal.s0);});}
function mailbox(){return spr(12,24,x=>{R(x,5,12,2,12,WD.m);R(x,1,2,10,11,'#e86a1a');R(x,1,2,10,2,'#ff9a4a');R(x,9,4,2,9,'#b84a10');R(x,3,6,6,1,'#3a1a0a');R(x,3,9,6,2,'#ffe2b8');});}
function barrel(){return spr(12,14,x=>{R(x,1,1,10,12,'#9a6236');R(x,0,3,12,8,'#9a6236');R(x,1,1,10,2,'#c8864e');R(x,0,4,12,1,'#5a5a64');R(x,0,9,12,1,'#5a5a64');R(x,9,2,2,10,'#7a4a28');});}
function planter(pal){return spr(30,14,x=>{R(x,0,6,30,8,WD.l);R(x,0,6,30,1,WD.h);R(x,0,12,30,2,WD.m);for(let i=1;i<29;i+=3){disc(x,i+1,4,2,pal.g1);P(x,i+1,2,(i%2)?'#ff7a5a':'#ffd23a');}});}
function noticeBoard(){return spr(32,30,x=>{R(x,2,10,3,20,WD.m);R(x,27,10,3,20,WD.m);R(x,0,0,32,20,WD.m);R(x,0,0,32,1,WD.h);R(x,2,2,28,16,'#c8935a');
  [[4,4,'#fbf4e2'],[12,3,'#fff2a8'],[20,5,'#fbf4e2'],[6,11,'#ffd0d0'],[16,11,'#d8f0ff'],[23,12,'#fbf4e2']].forEach(([a,b,c])=>{R(x,a,b,6,6,c);P(x,a+2,b,'#c8414b');R(x,a+1,b+3,4,1,'#9a907a');});});}
function signpost(text,dir){const tw=TW(text,8,true);const w=tw+14;return spr(w,30,x=>{R(x,(w/2|0)-1,10,3,20,WD.m);R(x,(w/2|0)-1,10,1,20,WD.h);
  R(x,3,2,w-6,11,WD.l);R(x,3,2,w-6,1,WD.h);R(x,3,12,w-6,1,WD.d);if(dir==='L'){R(x,1,4,2,7,WD.l);P(x,0,7,WD.l);}if(dir==='R'){R(x,w-3,4,2,7,WD.l);P(x,w-1,7,WD.l);}
  T(x,text,7,2,'#3a1a08',8,null,true);});}
function clothesline(){return spr(64,34,x=>{R(x,1,4,2,30,WD.m);R(x,61,4,2,30,WD.m);R(x,0,3,4,2,WD.d);R(x,60,3,4,2,WD.d);for(let i=3;i<61;i++)P(x,i,5+Math.round(Math.sin((i-3)/58*Math.PI)*3),'#d8d0c0');
  const cl=[[8,'#c8414b',10,12],[22,'#f2ead8',10,14],[36,'#4f86c9',12,10],[50,'#e3aa3c',8,12]];cl.forEach(([a,c,w,h])=>{const y=6+Math.round(Math.sin((a-3)/58*Math.PI)*3);R(x,a,y,w,h,c);R(x,a,y,w,1,'#ffffff55');R(x,a+w-1,y,1,h,'#0002');});});}
function exitArrows(x,X,Y,dir){x.fillStyle='rgba(255,246,210,.55)';for(let k=0;k<3;k++){for(let t=0;t<4;t++){const a=dir==='L'?X+k*6+t:dir==='R'?X-k*6-t:X+t;const b=dir==='U'?Y+k*6+t:Y+t;if(dir==='U'){x.fillRect(X-t,Y+k*6+t,1,1);x.fillRect(X+t,Y+k*6+t,1,1);}else{x.fillRect(a,Y-t,1,1);x.fillRect(a,Y+t,1,1);}}}}

/* ================= HUD 480 ================= */
const ICS=icon(xx=>{disc(xx,8,8,4,'#ffd23a');disc(xx,7,7,2,'#fff2a8');[[8,1],[8,14],[1,8],[14,8],[3,3],[13,3],[3,13],[13,13]].forEach(p=>P(xx,p[0],p[1],'#ffb02a'));});
const ICR=icon(xx=>{disc(xx,8,7,5,'#c9d2dc');disc(xx,5,8,3,'#c9d2dc');disc(xx,11,8,3,'#aeb9c6');R(xx,4,9,9,2,'#aeb9c6');[[5,13],[8,14],[11,13]].forEach(p=>P(xx,p[0],p[1],'#4aa8ec'));});
function hud2(x,W,H,season,day,time,wIcon,zone){
  panel(x,4,4,128,32);x.drawImage(wIcon,10,10);T(x,season+' · Hari '+day,28,8,'#4a230e',9,'#ffd9a0',true);T(x,time,28,20,'#6a3416',9);
  const px=W-124;panel(x,px,4,120,44);x.drawImage(IC.coin,px+6,8);T(x,'Rp 15.250.000',px+24,10,'#4a230e',9,'#ffd9a0',true);
  x.drawImage(IC.energy,px+4,22);bar(x,px+22,26,38,6,.72,'#5ccf4a');x.drawImage(IC.stress,px+60,22);bar(x,px+76,26,38,6,.38,'#ef5a4a');stars(x,px+24,37,2);
  panel(x,W-44,H-24,40,20);T(x,'▶ 1x',W-35,H-19,'#4a230e',9,null,true);
  if(zone){const tw=TW(zone,9,true)+20;panel(x,(W-tw)/2|0,4,tw,18);T(x,zone,((W-tw)/2|0)+10,7,'#4a230e',9,'#ffd9a0',true);}}
function promptBox(x,X,Y,text){const tw=TW(text,9,true)+30;panel(x,X-(tw/2|0),Y,tw,20);R(x,X-(tw/2|0)+6,Y+5,14,11,'#4a2410');R(x,X-(tw/2|0)+7,Y+6,12,9,'#fff2d4');T(x,'E',X-(tw/2|0)+10,Y+5,'#4a230e',9,null,true);T(x,text,X-(tw/2|0)+24,Y+5,'#4a230e',9,null,true);
  R(x,X-2,Y+20,5,1,'#4a2410');R(x,X-1,Y+21,3,1,'#4a2410');P(x,X,Y+22,'#4a2410');}

/* ================= ZONA ================= */
function scatter(x,pal,seed,n,area,def,blocked){const rr=rng(seed);const out=[];let tries=0;while(out.length<n&&tries<n*30){tries++;const X=area[0]+rr()*area[2]|0,Y=area[1]+rr()*area[3]|0;if(terrainAt(X,Y,def)!=='g'||terrainAt(X+8,Y+6,def)!=='g')continue;if(blocked.some(b=>X>b[0]-8&&X<b[0]+b[2]&&Y>b[1]-6&&Y<b[1]+b[3]))continue;out.push([X,Y,rr()]);}return out;}
function seasonFx(x,W,H,hujan,seed){x.globalCompositeOperation='multiply';x.fillStyle=hujan?'#a9b8cc':'#fff1d8';x.fillRect(0,0,W,H);x.globalCompositeOperation='source-over';
  if(hujan){const rr=rng(seed);x.fillStyle='rgba(205,225,255,.55)';for(let k=0;k<230;k++){const X=rr()*W,Y=rr()*H;for(let t=0;t<5;t++)x.fillRect((X-t*.6)|0,(Y+t)|0,1,1);}}
  else{const rr=rng(seed);x.fillStyle='rgba(255,250,220,.6)';for(let k=0;k<30;k++)x.fillRect((rr()*W)|0,(rr()*H)|0,1,1);}}
/* ===== minigame (dari v1) ===== */
function toothSection(){
  const W=120,H=130,cx=60;const[c,x]=cv(W,H);
  const topY=i=>{const d=Math.abs(i-cx);return 12+(d<8?(8-d)*.7:0)+(d>20?(d-20)*.9:0)+(d>27?(d-27)*2:0);};
  const hw=j=>j<56?30:j<66?30-(j-56)*.8:22;
  const inCrown=(i,j)=>j>=topY(i)&&j<78&&Math.abs(i-cx)<=hw(j);
  const rootL=(i,j)=>{if(j<70||j>140)return false;const t=(j-70)/70;const c0=cx-12-t*3,hwid=9-t*6;return Math.abs(i-c0)<=hwid;};
  const rootR=(i,j)=>{if(j<70||j>140)return false;const t=(j-70)/70;const c0=cx+12+t*3,hwid=9-t*6;return Math.abs(i-c0)<=hwid;};
  const inTooth=(i,j)=>inCrown(i,j)||rootL(i,j)||rootR(i,j);
  const inPulp=(i,j)=>{if(j>=40&&j<74&&Math.abs(i-cx)<12-(j<44?(44-j)*1.5:0))return !(j<46&&Math.abs(i-cx)<3);
    if(j>=72&&j<132){const t=(j-70)/70;return Math.abs(i-(cx-12-t*3))<=2-t||Math.abs(i-(cx+12+t*3))<=2-t;}return false;};
  const caries=(i,j)=>{const dx=(i-(cx-5))/13,dy=(j-24)/15;const n=hash(i>>1,j>>1)*.35;return dx*dx+dy*dy<1-n+.15;};
  const cariesCore=(i,j)=>{const dx=(i-(cx-5))/8,dy=(j-21)/9;return dx*dx+dy*dy<1;};
  // gusi & tulang
  for(let j=56;j<H;j++)for(let i=0;i<W;i++){const wave=Math.sin(i/7)*1.5;if(j>58+wave+(Math.abs(i-cx)<26?6:0))P(x,i,j,j<96?'#e3798a':'#e9d4b2');if(j>=94&&j<97)P(x,i,j,'#d7b88e');}
  for(let k=0;k<160;k++){const i=(hash(k,3)*W)|0,j=(100+hash(k,7)*50)|0;P(x,i,j,'#d9c094');}
  for(let j=0;j<H;j++)for(let i=0;i<W;i++){if(!inTooth(i,j))continue;
    let col;const enamel=j<60&&!(j>=topY(i)+5&&Math.abs(i-cx)<=hw(j)-5);
    if(enamel){col=i>cx+18?'#dcd6c6':'#f7f4ec';if(i<cx-22&&j<40)col='#ffffff';}
    else{col=i>cx+8?'#e0c690':'#efd9a6';if(j>60&&!inCrown(i,j)&&(!rootL(i+2,j)&&!rootR(i+2,j)||!rootL(i-2,j)&&!rootR(i-2,j)))col='#cfae74';}
    if(inPulp(i,j))col=(i<cx-2&&j<60)?'#f08a96':'#d9566a';
    if(inCrown(i,j)&&caries(i,j)&&j<50)col=cariesCore(i,j)?'#4e2c14':'#8a5428';
    P(x,i,j,col);}
  // zona bahaya pulpa (garis putus-putus)
  for(let j=34;j<80;j++)for(let i=cx-17;i<=cx+17;i++){if(inPulp(i,j))continue;let near=false;for(let d=-3;d<=3&&!near;d++)for(let e=-3;e<=3;e++)if(inPulp(i+d,j+e)&&j<74){near=true;break;}
    if(near&&!inPulp(i,j)){let edge=false;for(const[d,e]of[[1,0],[-1,0],[0,1],[0,-1]]){let n2=false;for(let a=-3;a<=3&&!n2;a++)for(let b=-3;b<=3;b++)if(inPulp(i+d+a,j+e+b)){n2=true;break;}if(!n2)edge=true;}
      if(edge&&(i+j)%3!==0)P(x,i,j,'#ff3a4e');}}
  return outline(c,C.ol);}
function handpiece(){const[c,x]=cv(64,48);for(let t=0;t<46;t++){const X=8+t,Y=40-t*.8;R(x,X,Y-2,4,5,t<6?'#9aa3b0':'#d4dae2');P(x,X,Y-2,'#ffffff');P(x,X+3,Y+2,'#8a93a3');}R(x,4,38,8,6,'#b8c0cc');R(x,1,44,3,3,'#8a8a8a');P(x,0,46,'#ffd23a');return outline(c,C.ol);}
function toolSlot(x,X,Y,lbl,draw,active){R(x,X,Y,30,30,active?'#ffd23a':'#4a2410');R(x,X+1,Y+1,28,28,active?'#fff0b0':'#e8b070');R(x,X+2,Y+2,26,26,active?'#fff7d4':'#f4c88a');draw(x,X+7,Y+5);T(x,lbl,X+15-TW(lbl,8)/2,Y+30,'#ffe9c8',8,'#2a1408');}
