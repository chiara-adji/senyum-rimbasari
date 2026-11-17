/* ================= FURNITUR V3 ================= */
const WDK={d:'#3a2418',m:'#5a3a24',l:'#7a5232',h:'#98683e'};      // kayu gelap
const WDL={d:'#8a6238',m:'#b8885a',l:'#d8ac78',h:'#f0cc98'};      // kayu terang / rotan
const MT={d:'#5a6070',m:'#8a93a3',l:'#c9d0da',h:'#eef2f6'};       // logam
const rnd=(seed)=>rng(seed);
/** Meja: w lebar, h tinggi daun meja di layar, col palet kayu, cloth = warna taplak */
function table(w,col=WD,cloth=null,legH=10){return spr(w,10+legH,x=>{R(x,0,2,w,7,cloth||col.l);R(x,0,2,w,2,cloth?shade(cloth,.3):col.h);R(x,0,9,w,2,cloth?shade(cloth,-.25):col.m);
  if(cloth){for(let i=1;i<w;i+=4)P(x,i,10,shade(cloth,-.35));}R(x,1,11,2,legH-1,col.m);R(x,w-3,11,2,legH-1,col.m);R(x,2,11,1,legH-1,col.d);});}
function stool(col=WD){return spr(12,14,x=>{ellipse(x,6,3,5,2,col.l);R(x,1,3,10,2,col.m);R(x,2,5,2,9,col.m);R(x,8,5,2,9,col.m);R(x,3,9,6,1,col.d);});}
function shelfUnit(w,h,kind,seed=1){return spr(w,h,x=>{const rr=rnd(seed+w);const col=kind==='meds'||kind==='parcels'&&false?MT:WD;
  R(x,0,0,w,h,col.m);R(x,0,0,w,2,col.h);R(x,2,3,w-4,h-5,col.d);const rows=Math.floor((h-6)/13);
  for(let r=0;r<rows;r++){const y=3+r*13;R(x,2,y+11,w-4,2,col.l);let i=3;
    while(i<w-5){const pick=rr();let iw=3;
      if(kind==='books'){iw=2+(rr()*2|0);const bh=7+(rr()*4|0);R(x,i,y+11-bh,iw,bh,['#2f5d9e','#3f8f4a','#a83a26','#e3aa3c','#6a3a8a','#d8d0c0','#2a8a8a'][(rr()*7)|0]);P(x,i,y+11-bh,'#ffffff40');}
      else if(kind==='goods'){iw=4;const c2=['#e8473f','#f2c84a','#3f8f4a','#4f86c9','#f08a2a','#f7f2e4'][(rr()*6)|0];if(pick<.5){R(x,i,y+5,4,6,c2);R(x,i,y+5,4,1,shade(c2,.4));R(x,i+1,y+7,2,2,'#ffffff');}else{R(x,i,y+3,3,8,c2);R(x,i,y+3,3,1,'#c9d0da');iw=3;}}
      else if(kind==='jars'){iw=5;R(x,i,y+4,5,7,'#c8e0d8');R(x,i,y+3,5,1,'#8a6a3a');R(x,i+1,y+6,3,4,['#a8562e','#e3aa3c','#3f8f4a','#6a3a1a','#c8414b'][(rr()*5)|0]);P(x,i,y+5,'#ffffff');}
      else if(kind==='bottles'){iw=3;const c2=['#3f8f4a','#a8562e','#e8d8a8','#6a3a1a'][(rr()*4)|0];R(x,i,y+4,3,7,c2);R(x,i+1,y+2,1,2,c2);P(x,i,y+5,'#ffffff80');}
      else if(kind==='bread'){iw=7;ellipse(x,i+3,y+8,3,2,'#c97a2e');ellipse(x,i+3,y+7,2,1,'#e8a04a');}
      else if(kind==='parcels'){iw=6+(rr()*3|0);const ph=4+(rr()*5|0);R(x,i,y+11-ph,iw-1,ph,'#c8935a');R(x,i,y+11-ph,iw-1,1,'#e0b07a');R(x,i+((iw-1)/2|0),y+11-ph,1,ph,'#e8d6a8');}
      else if(kind==='fabric'){iw=4;R(x,i,y+2,4,9,['#c8414b','#4f86c9','#e3aa3c','#3f8f4a','#ec98ad','#7d4f2a'][(rr()*6)|0]);R(x,i+3,y+2,1,9,'#00000030');}
      else if(kind==='meds'){iw=4;const c2=['#ffffff','#f2c84a','#7fc8e8','#ec98ad'][(rr()*4)|0];R(x,i,y+6,4,5,c2);R(x,i,y+6,4,1,'#c8414b');}
      else if(kind==='coffee'){iw=6;R(x,i,y+4,5,7,'#a8784a');R(x,i,y+4,5,2,'#6a4428');P(x,i+2,y+7,'#f2ead8');}
      else if(kind==='tools'){iw=5;R(x,i+2,y+3,1,8,'#8a93a3');R(x,i,y+3,5,2,['#c8414b','#e3aa3c','#4f86c9'][(rr()*3)|0]);}
      else if(kind==='files'){iw=3;R(x,i,y+2,3,9,['#4f86c9','#c8414b','#3f8f4a','#e3aa3c','#7a8a9a'][(rr()*5)|0]);R(x,i,y+8,3,1,'#ffffff');}
      else if(kind==='plates'){iw=7;disc(x,i+3,y+6,3,'#f4f6f8');disc(x,i+3,y+6,1,'#7fa8c8');}
      if(rr()<.08)iw+=2;i+=iw+1;}}});}
function counter(w,front='#c8a070',topC='#e8d6b0',h=26){return spr(w,h,x=>{R(x,0,0,w,6,topC);R(x,0,0,w,1,shade(topC,.4));R(x,0,6,w,h-6,front);R(x,0,6,w,1,shade(front,-.35));
  for(let i=4;i<w-4;i+=12)R(x,i,9,8,h-12,shade(front,.12));R(x,0,h-2,w,2,shade(front,-.3));});}
function register(){return spr(14,12,x=>{R(x,1,4,12,8,'#5a5f6a');R(x,1,4,12,1,'#8a93a3');R(x,3,0,8,5,'#3a3f4a');R(x,4,1,6,3,'#7fe8a8');R(x,3,7,8,3,'#c9d0da');});}
function fridge(drink=true){return spr(24,46,x=>{R(x,0,0,24,46,drink?'#c8414b':'#e6ebf0');R(x,0,0,24,6,drink?'#e86a5a':'#ffffff');R(x,2,7,20,34,'#b8e0f0');R(x,2,7,20,4,'#e0f6ff');
  for(let r=0;r<3;r++){R(x,2,16+r*9,20,1,'#8a93a3');for(let i=3;i<21;i+=3)R(x,i,10+r*9,2,6,['#3f8f4a','#e3aa3c','#f2f2f2','#c8414b','#4f86c9'][(i+r)%5]);}
  R(x,20,20,2,6,'#8a93a3');if(drink){R(x,6,2,12,2,'#ffffff');}});}
function sack(col='#e8dcc0',lab='#c8414b'){return spr(14,16,x=>{R(x,1,3,12,13,col);ellipse(x,7,3,5,2,shade(col,-.1));R(x,4,0,6,3,shade(col,-.2));R(x,3,7,8,4,lab);R(x,12,4,1,12,shade(col,-.2));});}
function espresso(){return spr(26,20,x=>{R(x,0,2,26,18,'#c9d0da');R(x,0,2,26,2,'#eef2f6');R(x,2,6,22,6,'#2e3440');disc(x,7,9,2,'#e86a5a');disc(x,13,9,2,'#7fe8a8');R(x,4,13,4,4,'#5a6070');R(x,16,13,4,4,'#5a6070');R(x,5,17,2,3,'#f2ead8');R(x,17,17,2,3,'#f2ead8');R(x,8,0,10,2,'#8a93a3');});}
function menuBoard(X,Y,W,lines){return x=>{R(x,X-1,Y-1,W+2,30,'#2a1610');R(x,X,Y,W,28,'#2a3a32');R(x,X,Y,W,2,'#3a4a42');(lines||['KOPI SUSU 18','TUBRUK 10','TEH 8']).forEach((t,i)=>T(x,t,X+3,Y+3+i*8,'#f2ead8',9));}}
function displayCase(w){return spr(w,30,x=>{R(x,0,10,w,20,'#e8d6b0');R(x,0,10,w,1,'#ffffff');R(x,0,28,w,2,'#a8784a');R(x,2,0,w-4,12,'#cfeaf4');R(x,2,0,w-4,1,'#ffffff');R(x,2,5,w-4,1,'#a8c8d8');
  for(let i=5;i<w-6;i+=8){ellipse(x,i+2,9,3,2,'#c97a2e');ellipse(x,i+2,8,2,1,'#e8a04a');ellipse(x,i+3,3,2,1,i%16?'#f2a0b8':'#7a4a2a');}for(let i=4;i<w-4;i+=10)R(x,i,14,6,12,'#d8c498');});}
function oven(){return spr(34,40,x=>{R(x,0,4,34,36,'#8a93a3');R(x,0,4,34,2,'#c9d0da');R(x,3,10,28,12,'#2e2e34');R(x,5,12,24,8,'#ff9a3a');R(x,6,13,10,3,'#ffd23a');R(x,3,25,28,12,'#2e2e34');R(x,5,27,24,8,'#a84a2a');R(x,6,2,4,4,'#5a6070');R(x,24,2,4,4,'#5a6070');R(x,3,23,28,1,'#c9d0da');});}
function poBoxes(X,Y,cols,rows){return x=>{R(x,X-1,Y-1,cols*8+2,rows*8+2,'#2a1610');for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){R(x,X+c*8,Y+r*8,7,7,'#c8935a');R(x,X+c*8+1,Y+r*8+1,5,5,'#a8763e');P(x,X+c*8+5,Y+r*8+3,'#ffd23a');}}}
function scaleBox(){return spr(18,20,x=>{R(x,1,8,16,12,'#c9d0da');R(x,1,8,16,1,'#ffffff');R(x,0,6,18,3,'#8a93a3');R(x,5,12,8,4,'#2e3440');R(x,6,13,6,2,'#7fe8a8');R(x,3,0,12,6,'#c8935a');R(x,3,0,12,1,'#e0b07a');});}
function sewingMachine(){return spr(40,32,x=>{R(x,0,10,40,6,WD.l);R(x,0,10,40,1,WD.h);R(x,0,16,40,4,WD.m);R(x,2,20,3,12,'#2e2e34');R(x,35,20,3,12,'#2e2e34');R(x,4,28,32,2,'#2e2e34');
  R(x,6,2,20,4,'#2e2e34');R(x,22,2,6,9,'#2e2e34');R(x,6,6,4,5,'#2e2e34');R(x,7,3,12,1,'#e8c547');disc(x,27,5,3,'#5a5a64');R(x,30,6,8,4,'#c8414b');R(x,32,7,4,2,'#ffffff');});}
function mannequin(col='#c8414b'){return spr(16,40,x=>{ellipse(x,8,4,3,3,'#e8d6b0');R(x,4,7,8,16,col);R(x,3,8,10,4,col);R(x,10,7,2,16,shade(col,-.25));for(let j=10;j<22;j+=3)P(x,6,j,'#f2ead8');R(x,7,23,2,13,'#5a3a24');R(x,3,36,10,2,'#5a3a24');});}
function fabricRolls(){return spr(30,30,x=>{const cs=['#c8414b','#4f86c9','#e3aa3c','#3f8f4a','#ec98ad','#7d4f2a'];cs.forEach((c,i)=>{const X=(i%3)*10,Y=(i/3|0)*14;R(x,X,Y+2,9,12,c);R(x,X,Y+2,9,2,shade(c,.3));disc(x,X+4,Y+2,2,shade(c,-.3));});});}
function chessTable(){return spr(30,24,x=>{R(x,1,4,28,10,WD.l);R(x,1,4,28,1,WD.h);R(x,1,14,28,2,WD.m);R(x,13,16,4,8,WD.m);R(x,8,22,14,2,WD.d);
  for(let j=0;j<4;j++)for(let i=0;i<8;i++)R(x,7+i*2,5+j*2,2,2,(i+j)%2?'#2a1a1f':'#f2ead8');P(x,8,4,'#ffffff');P(x,10,4,'#ffffff');P(x,19,3,'#2a1a1f');P(x,21,4,'#2a1a1f');P(x,19,2,'#2a1a1f');});}
function radio(){return spr(20,14,x=>{R(x,0,2,20,12,'#8a5a30');R(x,0,2,20,1,'#b8864e');R(x,2,4,9,8,'#d8c498');for(let j=5;j<12;j+=2)R(x,2,j,9,1,'#a8945e');disc(x,15,7,2,'#2a1a1f');disc(x,15,11,1,'#2a1a1f');R(x,14,0,1,2,'#5a5a64');});}
function rockingChair(){return spr(22,32,x=>{R(x,4,0,14,14,WDL.m);for(let i=5;i<18;i+=2)R(x,i,1,1,12,WDL.d);R(x,4,0,14,1,WDL.h);R(x,3,14,16,4,WDL.l);R(x,3,14,16,1,WDL.h);R(x,2,9,2,10,WDL.m);R(x,18,9,2,10,WDL.m);R(x,4,18,2,9,WDL.m);R(x,16,18,2,9,WDL.m);
  for(let i=0;i<22;i++){const y=28+Math.round(Math.pow((i-11)/11,2)*3);R(x,i,y-1,1,2,WDL.d);}});}
function photoFrames(X,Y,n=3){return x=>{for(let k=0;k<n;k++){const w=k%2?12:14,h=k%2?16:12,xx=X+k*18,yy=Y+(k%2)*2;R(x,xx-1,yy-1,w+2,h+2,'#2a1610');R(x,xx,yy,w,h,'#c8963a');R(x,xx+2,yy+2,w-4,h-4,['#d8c8a8','#a8b8c8','#c8a8a8'][k%3]);disc(x,xx+w/2,yy+h/2-1,2,'#7a5a4a');R(x,xx+w/2-3,yy+h/2+1,6,3,'#7a5a4a');}}}
function cabinetGlass(w=34){return spr(w,46,x=>{R(x,0,0,w,46,WDK.m);R(x,0,0,w,2,WDK.h);R(x,2,3,w-4,24,'#a8d0e0');R(x,2,3,w-4,3,'#d8f0f8');R(x,w/2|0,3,1,24,WDK.m);
  for(let r=0;r<2;r++){R(x,2,14+r*12,w-4,1,WDK.l);for(let i=4;i<w-6;i+=7){disc(x,i+2,10+r*12,2,'#f4f6f8');P(x,i+2,10+r*12,'#7fa8c8');}}R(x,2,29,w-4,15,WDK.l);R(x,(w/2|0)-2,35,4,1,'#ffd23a');});}
function hangHerbs(X,Y,W){return x=>{R(x,X,Y,W,2,WD.d);for(let i=X+3;i<X+W-3;i+=7){R(x,i,Y+2,1,3,'#8a7a5a');const c=['#5a8a3a','#8a7a3a','#6a9a4a','#a8682a'][(i/7|0)%4];R(x,i-2,Y+5,5,8,c);P(x,i-2,Y+12,c);P(x,i+2,Y+13,c);R(x,i-1,Y+5,1,6,shade(c,.3));}}}
function lumpang(){return spr(22,18,x=>{ellipse(x,11,6,10,4,'#8e8884');ellipse(x,11,6,7,2,'#5e5a58');R(x,1,6,20,10,'#8e8884');R(x,1,15,20,2,'#5e5a58');R(x,14,0,3,8,WD.l);R(x,14,0,3,1,WD.h);});}
function gendong(){return spr(18,20,x=>{R(x,1,6,16,14,'#c8a46a');for(let j=7;j<20;j+=2)R(x,1,j,16,1,'#a8844a');ellipse(x,9,6,8,2,'#d8b47a');for(let i=3;i<16;i+=3){R(x,i,0,2,6,['#3f8f4a','#e3aa3c','#a8562e'][i%3]);}});}
function blackboard(X,Y,W,H,lines){return x=>{R(x,X-2,Y-2,W+4,H+4,WD.d);R(x,X-1,Y-1,W+2,H+2,WD.l);R(x,X,Y,W,H,'#2a4a3a');R(x,X,Y,W,2,'#3a5a4a');(lines||[]).forEach((t,i)=>T(x,t,X+4,Y+4+i*10,'#f2f2ea',9));R(x,X,Y+H+1,W,2,WD.m);R(x,X+W-14,Y+H,6,1,'#ffffff');}}
function schoolDesk(){return spr(26,24,x=>{R(x,0,4,26,8,WDL.l);R(x,0,4,26,1,WDL.h);R(x,0,12,26,2,WDL.m);R(x,1,14,2,10,MT.m);R(x,23,14,2,10,MT.m);R(x,4,6,7,4,'#f7f2e4');R(x,14,6,7,4,'#f7f2e4');P(x,8,7,'#4f86c9');P(x,17,8,'#c8414b');});}
function scheduleBoard(X,Y,rows){return x=>{R(x,X-1,Y-1,112,8+rows.length*9,'#2a1610');R(x,X,Y,110,6+rows.length*9,'#1f2a3a');T(x,'JADWAL BUS',X+4,Y+1,'#f2c84a',9);rows.forEach((r,i)=>T(x,r,X+4,Y+10+i*9,'#e8f0f8',9));}}
function motorbike(col='#c8414b'){return spr(46,30,x=>{disc(x,9,22,7,'#2a2a2e');disc(x,9,22,4,'#5a5a64');disc(x,9,22,1,'#c9d0da');disc(x,37,22,7,'#2a2a2e');disc(x,37,22,4,'#5a5a64');disc(x,37,22,1,'#c9d0da');
  R(x,12,14,22,6,col);R(x,12,14,22,2,shade(col,.3));R(x,16,9,14,5,'#2a2a2e');R(x,16,9,14,1,'#5a5a64');R(x,30,4,3,12,'#8a93a3');R(x,28,3,8,2,'#2a2a2e');R(x,34,8,5,4,'#f2f2ea');R(x,6,16,8,3,'#8a93a3');R(x,20,20,8,3,'#5a5a64');});}
function tireStack(){return spr(20,26,x=>{for(let k=0;k<4;k++){ellipse(x,10,22-k*6,9,3,'#2a2a2e');ellipse(x,10,21-k*6,5,1,'#5a5a64');R(x,1,19-k*6,18,3,'#2a2a2e');}});}
function toolWall(X,Y,W){return x=>{R(x,X,Y,W,26,'#c8a46a');for(let j=Y+3;j<Y+24;j+=4)for(let i=X+3;i<X+W-2;i+=4)P(x,i,j,'#8a6a3a');
  const tools=[[4,'#8a93a3',2,16],[10,'#c8414b',3,12],[16,'#8a93a3',1,18],[22,'#e3aa3c',4,10],[30,'#8a93a3',2,14],[36,'#4f86c9',3,12],[44,'#8a93a3',1,16]];tools.forEach(([o,c,w,h])=>{if(o<W-4){R(x,X+o,Y+4,w,h,c);R(x,X+o-1,Y+4,w+2,3,c);}});}}
function oilCans(){return spr(22,16,x=>{[[0,'#e3aa3c'],[7,'#3f8f4a'],[14,'#c8414b']].forEach(([o,c])=>{R(x,o,3,7,13,c);R(x,o,3,7,2,shade(c,.3));R(x,o+2,0,3,3,'#5a5a64');R(x,o+1,8,5,3,'#f2f2ea');});});}
function workbench(w=60){return spr(w,30,x=>{R(x,0,6,w,7,WDL.l);R(x,0,6,w,1,WDL.h);R(x,0,13,w,3,WDL.m);R(x,2,16,3,14,WDL.m);R(x,w-5,16,3,14,WDL.m);R(x,2,24,w-4,2,WDL.d);
  R(x,6,2,16,4,WDL.h);R(x,26,1,3,5,'#8a93a3');R(x,24,0,7,2,'#5a5a64');for(let i=36;i<w-6;i+=3)P(x,i,5,'#e8d6a8');R(x,40,3,12,3,'#c8414b');P(x,52,4,'#8a93a3');});}
function planks(){return spr(12,46,x=>{for(let k=0;k<3;k++){R(x,k*4,k*2,4,46-k*2,[WDL.l,WDL.m,WDL.h][k]);R(x,k*4+3,k*2,1,46-k*2,WDL.d);}});}
function sawhorse(){return spr(30,18,x=>{R(x,0,2,30,4,WDL.m);R(x,0,2,30,1,WDL.h);line(x,4,6,1,17,2,WDL.d);line(x,8,6,11,17,2,WDL.d);line(x,22,6,19,17,2,WDL.d);line(x,26,6,29,17,2,WDL.d);});}
function officeDesk(w=50,pc=true,col=WDL){return spr(w,34,x=>{R(x,0,12,w,6,col.l);R(x,0,12,w,1,col.h);R(x,0,18,w,14,col.m);R(x,0,18,w,1,col.d);R(x,w-16,20,14,5,col.l);R(x,w-16,26,14,5,col.l);P(x,w-9,22,'#ffd23a');P(x,w-9,28,'#ffd23a');
  if(pc){R(x,8,0,18,12,'#2e3440');R(x,9,1,16,9,'#5ad0e8');R(x,10,2,6,1,'#e0fbff');R(x,10,4,10,1,'#3a9ab0');R(x,16,12,2,1,'#2e3440');R(x,6,13,20,2,'#d8d8dc');}
  R(x,30,9,10,4,'#f7f2e4');R(x,30,9,10,1,'#ffffff');disc(x,44,11,2,'#f2ead8');P(x,44,10,'#5a3214');});}
function whiteboard(X,Y,W,H){return x=>{R(x,X-1,Y-1,W+2,H+2,'#8a93a3');R(x,X,Y,W,H,'#f7f9fb');const pts=[3,9,6,12,10,8,15];for(let i=0;i<pts.length-1;i++)line(x,X+6+i*((W-14)/6),Y+H-4-pts[i],X+6+(i+1)*((W-14)/6),Y+H-4-pts[i+1],1,'#3f8f4a');
  R(x,X+W-18,Y+4,12,6,'#e86a5a');R(x,X+W-18,Y+4,6,6,'#4f86c9');R(x,X+4,Y+4,14,1,'#2a3a6a');R(x,X+4,Y+7,10,1,'#9aa3b0');}}
function waterDisp(){return spr(14,34,x=>{R(x,2,12,10,22,'#e6ebf0');R(x,2,12,10,1,'#ffffff');R(x,3,0,8,13,'#8ac8f0');R(x,3,0,8,2,'#c8e8ff');R(x,4,18,2,2,'#c8414b');R(x,8,18,2,2,'#4f86c9');R(x,3,24,8,1,'#9aa3b0');});}
function hospitalBed(){return spr(30,46,x=>{R(x,0,0,30,6,MT.l);R(x,0,0,30,1,MT.h);R(x,1,6,28,36,'#f7f9fb');R(x,3,8,24,8,'#ffffff');R(x,3,14,24,2,'#d8dde4');R(x,1,20,28,22,'#7fb8d8');R(x,1,20,28,2,'#a8d4ec');R(x,0,42,30,2,MT.m);R(x,2,44,2,2,MT.d);R(x,26,44,2,2,MT.d);});}
function curtainScreen(w=30){return spr(w,46,x=>{R(x,0,0,w,2,MT.m);for(let i=0;i<w;i+=4){R(x,i,2,4,40,i%8?'#a8d8c8':'#c8eadc');R(x,i+3,2,1,40,'#88b8a8');}R(x,1,42,2,4,MT.m);R(x,w-3,42,2,4,MT.m);});}
function babyScale(){return spr(26,22,x=>{R(x,4,10,18,12,'#e6ebf0');R(x,4,10,18,1,'#ffffff');ellipse(x,13,7,11,4,'#f2a0b8');ellipse(x,13,6,9,2,'#f8c8d8');R(x,8,13,10,5,'#2e3440');R(x,9,14,8,3,'#7fe8a8');});}
function backdrop(w=70){return spr(w,64,x=>{R(x,2,0,3,64,MT.d);R(x,w-5,0,3,64,MT.d);R(x,0,0,w,4,MT.m);for(let j=4;j<56;j++)R(x,5,j,w-10,1,shade('#8ab8d8',-(j/56)*.25));for(let j=56;j<64;j++)R(x,5,j,w-10,1,shade('#8ab8d8',-.3+(j-56)*.02));
  R(x,5,4,w-10,1,'#c8e0f0');});}
function tripodCam(){return spr(20,46,x=>{R(x,4,0,12,9,'#2a2a32');R(x,4,0,12,1,'#5a5a64');disc(x,10,5,3,'#5a5a64');disc(x,10,5,2,'#7fb8d8');P(x,9,4,'#ffffff');R(x,13,-1,3,2,'#2a2a32');R(x,9,9,2,10,MT.m);line(x,10,19,2,45,2,MT.d);line(x,10,19,18,45,2,MT.d);line(x,10,19,10,45,2,MT.m);});}
function softbox(){return spr(22,50,x=>{R(x,2,0,18,16,'#2a2a32');R(x,4,2,14,12,'#fff8e0');R(x,4,2,14,3,'#ffffff');R(x,10,16,2,30,MT.m);line(x,11,44,3,49,2,MT.d);line(x,11,44,19,49,2,MT.d);});}
function globe(){return spr(16,24,x=>{disc(x,8,8,7,'#4a8ad8');R(x,4,4,4,3,'#5ab04a');R(x,9,8,4,4,'#5ab04a');R(x,5,11,3,2,'#5ab04a');P(x,5,3,'#ffffff');R(x,7,15,2,5,WD.m);R(x,3,20,10,3,WD.l);R(x,3,20,10,1,WD.h);});}
function mattress(){return spr(30,40,x=>{R(x,0,4,30,36,'#e8dcc0');R(x,0,4,30,2,'#f8f0dc');R(x,3,6,24,8,'#ffffff');R(x,3,12,24,2,'#d8d0c0');R(x,0,18,30,22,'#8a9aa8');for(let j=20;j<40;j+=4)R(x,0,j,30,1,'#7a8a98');R(x,0,38,30,2,'#c8bca0');});}
function standFan(){return spr(18,38,x=>{disc(x,9,8,8,'#c9d0da');disc(x,9,8,6,'#e6ebf0');for(let a=0;a<3;a++){const ang=a*2.09;line(x,9,8,9+Math.cos(ang)*5,8+Math.sin(ang)*5,2,'#7fb8d8');}disc(x,9,8,1,'#5a6070');R(x,8,16,2,18,'#5a6070');ellipse(x,9,35,6,2,'#5a6070');});}
function bucket(){return spr(12,12,x=>{R(x,1,3,10,9,'#4f86c9');R(x,1,3,10,2,'#7fb0e6');R(x,0,2,12,1,'#2f5d9e');line(x,1,2,6,0,1,'#8a93a3');line(x,6,0,11,2,1,'#8a93a3');});}
function tvCab(){return spr(40,36,x=>{R(x,0,20,40,16,WD.m);R(x,0,20,40,2,WD.h);R(x,3,24,15,9,WD.l);R(x,22,24,15,9,WD.l);R(x,6,0,28,18,'#1f1c24');R(x,8,2,24,13,'#3a6a9a');R(x,9,3,8,4,'#7ab0e0');R(x,8,12,24,3,'#5a9a4a');R(x,18,18,4,2,'#1f1c24');});}
function rattanChair(){return spr(22,26,x=>{ellipse(x,11,8,10,8,WDL.m);ellipse(x,11,8,8,6,WDL.l);for(let j=2;j<15;j+=2)for(let i=3;i<20;i+=2)if(((i+j)/2)%2===0)P(x,i,j,WDL.d);R(x,3,14,16,5,'#e8d6b0');R(x,3,14,16,1,'#fff2d4');R(x,4,19,2,7,WDL.d);R(x,16,19,2,7,WDL.d);});}
function pendantLamp(X,Y,len=10){return x=>{R(x,X,Y,1,len,'#2a2a2e');R(x,X-4,Y+len,9,4,'#2a2a2e');R(x,X-3,Y+len+4,7,1,'#ffe8a0');x.fillStyle='rgba(255,236,170,.10)';x.beginPath();x.moveTo(X-3,Y+len+5);x.lineTo(X+4,Y+len+5);x.lineTo(X+18,Y+len+60);x.lineTo(X-18,Y+len+60);x.fill();}}
function bigPlant(seed=1){return spr(26,46,x=>{const rr=rnd(seed);R(x,7,34,12,12,'#e8dcc8');R(x,6,33,14,2,'#f8f0e0');R(x,17,35,2,11,'#c8bca8');
  for(let k=0;k<9;k++){const a=-Math.PI*0.95+k*(Math.PI*0.9/8),L=12+rr()*10;const ex=13+Math.cos(a)*L,ey=33+Math.sin(a)*L*1.5;line(x,13,33,ex,ey,1,'#2f6a30');ellipse(x,ex|0,ey|0,3,2,k%2?'#3f8f4a':'#5cb05a');}});}
function kitchenIsland(w=56){return spr(w,30,x=>{R(x,0,4,w,7,'#f2ece0');R(x,0,4,w,1,'#ffffff');R(x,0,11,w,17,WD.l);R(x,0,11,w,1,WD.d);for(let i=3;i<w-3;i+=4)R(x,i,13,1,14,WD.m);R(x,8,0,6,4,'#c8414b');R(x,20,1,10,3,'#f2ead8');R(x,36,0,4,4,'#3f8f4a');R(x,2,28,w-4,2,WD.d);});}
function stairs(w=34,h=64){return spr(w,h,x=>{const n=8;for(let k=0;k<n;k++){const y=k*(h/n)|0;R(x,0,y,w,(h/n|0)+1,WD.l);R(x,0,y,w,2,WD.h);R(x,0,y+(h/n|0)-1,w,1,WD.d);}R(x,0,0,3,h,WD.d);R(x,w-3,0,3,h,WD.d);R(x,w-2,0,1,h,WD.m);});}
function partition(X,Y,H,col='#e8dccc'){return x=>{R(x,X,Y,6,H,col);R(x,X,Y,6,2,shade(col,.4));R(x,X+5,Y,1,H,shade(col,-.3));R(x,X,Y+H,6,2,shade(col,-.4));}}
function xrayPano(){return spr(34,58,x=>{R(x,14,8,6,46,MT.l);R(x,14,8,1,46,MT.h);R(x,8,54,18,4,MT.m);R(x,2,4,30,8,'#eef2f6');R(x,2,4,30,1,'#ffffff');R(x,0,10,6,16,'#eef2f6');R(x,28,10,6,16,'#eef2f6');R(x,1,14,4,6,'#3a4a5a');R(x,14,22,6,4,'#c9d0da');R(x,24,0,8,5,'#3fae9c');disc(x,6,3,3,'#e3aa3c');P(x,6,3,'#2a1a1f');});}
function surgeryCart(){return spr(24,30,x=>{R(x,1,6,22,3,MT.l);R(x,1,6,22,1,MT.h);R(x,2,9,2,19,MT.m);R(x,20,9,2,19,MT.m);R(x,2,18,20,2,MT.m);disc(x,4,28,2,MT.d);disc(x,20,28,2,MT.d);
  R(x,3,2,18,4,'#5ab0c8');[4,7,10,13,16].forEach(i=>R(x,i,1,1,5,'#eef2f6'));R(x,4,14,8,4,'#f7f9fb');});}
function monitorArm(){return spr(18,30,x=>{R(x,8,8,2,22,MT.m);R(x,0,0,18,10,'#2e3440');R(x,1,1,16,8,'#5ad0e8');R(x,2,3,6,1,'#e0fbff');R(x,2,5,12,1,'#3a9ab0');R(x,5,28,8,2,MT.d);});}
function mopBucket(){return spr(16,30,x=>{R(x,2,18,12,10,'#f2c84a');R(x,2,18,12,2,'#ffe27a');R(x,7,0,2,22,'#a8784a');R(x,4,22,8,4,'#d8d0c0');disc(x,4,29,1,'#2a2a2e');disc(x,12,29,1,'#2a2a2e');});}
/** Kursi dental 4 level. 1 bekas, 2 rapi, 3 mint + monitor, 4 premium + lampu LED + arm */
function dentalUnitV(lv){return spr(64,58,x=>{
  const m=lv<=1?['#8a6838','#bf975a','#dcbc84']:lv===2?['#3a7fa8','#5aa0c8','#9ad0e8']:lv===3?['#4f9a84','#86cbb2','#c2ecdc']:['#2e3440','#4a5468','#7a869c'];
  const me=lv<=1?['#5e5850','#857d72','#a8a094']:['#6f7886','#b0b8c4','#e4e9ef'];
  R(x,46,8,3,40,me[1]);R(x,46,8,1,40,me[2]);R(x,16,6,33,3,me[1]);R(x,16,6,33,1,me[2]);
  ellipse(x,15,11,7,4,me[2]);ellipse(x,15,12,5,2,lv>1?'#fff2a8':'#d8c68a');if(lv===4){ellipse(x,15,12,5,2,'#e0f6ff');P(x,13,12,'#ffffff');}
  ellipse(x,30,53,14,3,me[0]);ellipse(x,30,52,12,2,me[1]);R(x,26,40,8,12,me[1]);R(x,32,40,2,12,me[0]);
  line(x,13,23,27,36,9,m[0]);line(x,12,22,26,35,6,m[1]);line(x,11,21,23,32,2,m[2]);
  ellipse(x,10,20,5,4,m[0]);ellipse(x,9,19,4,3,m[1]);R(x,7,17,3,1,m[2]);
  R(x,24,33,17,8,m[0]);R(x,24,33,17,5,m[1]);R(x,24,33,17,1,m[2]);
  line(x,41,37,53,46,7,m[0]);line(x,41,36,53,45,4,m[1]);R(x,50,46,8,4,m[0]);R(x,50,46,8,1,m[1]);
  R(x,22,29,11,2,me[1]);R(x,22,29,11,1,me[2]);
  if(lv>=2){R(x,54,16,2,22,me[1]);R(x,49,13,13,4,me[1]);R(x,49,13,13,1,me[2]);[51,54,57].forEach(i=>R(x,i,11,1,2,'#e6ebf0'));P(x,60,11,'#ffd23a');
    R(x,2,32,2,12,me[1]);ellipse(x,4,31,4,2,'#eef2f6');ellipse(x,4,31,2,1,'#7fc8e8');}
  if(lv>=3){R(x,52,0,11,8,'#2e3440');R(x,53,1,9,6,'#5ad0e8');P(x,54,2,'#e0fbff');R(x,57,8,1,5,me[0]);}
  if(lv===4){R(x,40,4,8,2,'#3fae9c');R(x,2,46,6,10,me[1]);R(x,2,46,6,1,me[2]);R(x,3,48,4,3,'#3fae9c');[[20,30],[35,30]].forEach(q=>P(x,q[0],q[1],'#3fae9c'));}
  if(lv===0){P(x,30,35,'#6a4a2a');P(x,31,36,'#6a4a2a');P(x,14,25,'#6a4a2a');R(x,35,34,3,1,'#7a5a32');P(x,47,22,'#7a4a2a');P(x,47,28,'#7a4a2a');}});}
/* dinding & lantai tambahan */
Object.assign(WALL,{
  brick:(i,j,H)=>{if(j<3)return '#5a2a1e';const row=(j/5)|0,off=(row%2)*5;if(j%5===4||(i+off)%10===0)return '#c8b8a0';return hash(((i+off)/10)|0,row)<.3?'#b0503e':'#a0463a';},
  mint:(i,j,H)=>{if(j<3)return j===2?'#7ab8a4':'#e8f8f0';if(j>H-16){if(j===H-16)return '#ffffff';return (i%10===0)?'#5a9a84':'#7ab8a4';}return '#d8f0e6';},
  sky:(i,j,H)=>{if(j<3)return '#4a7aa8';if(j>H-18){if(j===H-18)return '#2a4a6a';return (i%10===0)?'#3a5a7a':'#4a6a8a';}return hash(i>>2,j>>2)<.1?'#d0e4f4':'#dcecf8';},
  concrete:(i,j,H)=>{if(j<3)return '#5a5a5e';const h=hash(i>>1,j>>1);if(j===H-20)return '#e8b83a';if(j===H-19)return '#2a2a2e';return h<.1?'#8a8a8a':h>.92?'#b0b0b0':'#9e9e9e';},
  peach:(i,j,H)=>{if(j<3)return j===2?'#c8786a':'#fbe0d4';if(j>H-14){if(j===H-14)return '#ffffff';return (i%8===0)?'#e8a090':'#f6b8a8';}return ((i>>3)%2)?'#fbe4da':'#f8dcd0';},
  darkwood:(i,j,H)=>{if(j<3)return '#1a0e0a';const pi=i%9;let c=((i/9)|0)%2?'#3a2418':'#42291c';if(pi===0)c='#22150e';if(j>H-14)c=(i%12===0)?'#1a0e0a':'#2a1a12';return c;},
  bamboo:(i,j,H)=>{if(j<3)return '#6a5a2a';const pi=i%6;let c=pi<1?'#8a7a3a':pi<4?'#c8b46a':'#b0a058';if(j%16===8)c='#8a7a3a';return c;},
  cream:(i,j,H)=>{if(j<3)return j===2?'#b8a07a':'#f8ecd4';if(j>H-16){if(j===H-16)return '#8a5a30';return (i%12===0)?'#7a4a28':'#a8703e';}return hash(i>>1,j>>1)<.08?'#f0e2c8':'#f6ead2';},
  green:(i,j,H)=>{if(j<3)return '#2a5a3a';if(j>H-16){if(j===H-16)return '#ffffff';return (i%10===0)?'#3a7a4a':'#4a8a5a';}return '#e8f2e8';},
});
Object.assign(FLOOR,{
  checker:(i,j)=>{const g=((i>>3)+(j>>3))%2;let c=g?'#2e2a30':'#e8e2d6';if(i%8===0||j%8===0)c=g?'#24202a':'#d4ccbe';return c;},
  tilePink:(i,j)=>{const gi=i%12,gj=j%12;if(gi===0||gj===0)return '#d8a8a8';return ((i/12|0)+(j/12|0))%2?'#f8dcdc':'#fbeaea';},
  concrete:(i,j)=>{const h=hash(i>>1,j>>1);if(h<.03)return '#6a6a6e';if(hash(i>>4,j>>4)<.15&&h<.2)return '#727276';return h<.5?'#7e7e82':'#848488';},
  carpet:(i,j)=>{const h=hash(i,j);return h<.3?'#4a5a7a':h<.6?'#52628a':'#4e5e82';},
  tileGray:(i,j)=>{const gi=i%16,gj=j%16;if(gi===0||gj===0)return '#9a9a9e';if(gi===1||gj===1)return '#d8d8dc';return '#c4c4c8';},
  terracotta:(i,j)=>{const gi=i%14,gj=j%14;if(gi===0||gj===0)return '#8a4a2a';return hash(i/14|0,j/14|0)<.3?'#c86a40':'#d0744a';},
  dirt:(i,j)=>{const h=hash(i,j);return h<.1?'#6a4a2a':h<.5?'#8a6440':'#94704a';},
  bamboo:(i,j)=>{const row=(j/6)|0,by=j%6;let c=row%2?'#c8a868':'#d0b070';if(by===0)c='#a88a50';if(((i+row*13)%40)===0)c='#8a7040';return c;},
});

function draftTable(){return spr(44,40,x=>{line(x,2,14,42,6,8,WDL.l);R(x,4,6,36,10,'#2f5d9e');for(let i=8;i<38;i+=6)R(x,i,8,1,6,'#8ab4e8');R(x,10,10,14,1,'#c8e0ff');R(x,6,18,3,22,MT.m);R(x,35,14,3,26,MT.m);R(x,4,36,36,2,MT.d);});}
function maket(){return spr(30,22,x=>{R(x,0,14,30,8,'#5c9a30');R(x,0,14,30,1,'#86c23a');R(x,6,6,16,10,'#f2ece0');R(x,18,6,4,10,'#d8d0c0');for(let j=0;j<6;j++)R(x,4+j,6-j,20-j*2,1,'#c8414b');R(x,12,10,4,6,WD.m);R(x,8,9,3,3,B.gl1);});}
