/* ================= EKSTERIOR V3.1 =================
   Aturan: atap miring ber-overhang + bayangan, sudut membulat, outline lembut (warna gelap dari warna dasar),
   pintu 18–34×30 (setinggi karakter), papan nama kecil di atas pintu (font 5×7), talang/papan gantung/tanaman merambat. */
/** Tempel dekorasi (lampu, tanaman, plang) di sekitar sprite bangunan. pad = margin kiri/kanan/atas. Dekorasi di-outline terpisah agar bangunan tidak dapat outline ganda. */
function deco(base,pad,fns){const W=base.width+pad*2,H=base.height+pad;const[c,x]=cv(W,H);const[l,lx]=cv(W,H);(fns||[]).forEach(f=>f(lx,pad,base));softOutline(l);x.drawImage(base,pad,pad);x.drawImage(l,0,0);return c;}
function glowRect(x,X,Y,W,H,col,r=4){for(let k=r;k>0;k--){x.fillStyle=col.replace('A',(0.05+0.035*(r-k)).toFixed(3));x.fillRect(X-k,Y-k,W+k*2,H+k*2);}}
function hexRgb(h){const[r,g,b]=hex(h);return r+','+g+','+b;}
/** Teks neon (font 1×, tebal) dengan cahaya. */
function neon(x,text,X,Y,col){const w=TWm(text);glowRect(x,X-3,Y-2,w+6,9,'rgba('+hexRgb(col)+',A)',5);Tm(x,text,X+1,Y+1,shade(col,-.55));Tm(x,text,X,Y,col);return w;}
function wallLamp(x,X,Y,on=true){RR(x,X,Y,5,7,'#3a3a44',1);R(x,X+1,Y+1,3,4,on?'#ffe27a':'#8a8a6a');P(x,X+1,Y+1,on?'#fff6c8':'#a8a888');R(x,X+2,Y+7,1,2,'#3a3a44');if(on){x.fillStyle='rgba(255,230,140,.16)';x.fillRect(X-4,Y-3,13,16);x.fillStyle='rgba(255,230,140,.1)';x.fillRect(X-6,Y+8,17,10);}}
function pot(x,X,Y,pal=PAL.kemarau,flower=null){RR(x,X,Y+6,9,7,'#b55a2e',1);RR(x,X-1,Y+5,11,2,'#d07a44',1);R(x,X+6,Y+7,2,5,'#8a4020');disc(x,X+4,Y+3,4,pal.g1);disc(x,X+3,Y+2,2,pal.g2);if(flower){P(x,X+2,Y+1,flower);P(x,X+6,Y+2,flower);P(x,X+4,Y,flower);P(x,X+1,Y+4,flower);}}
/** Papan berdiri (A-frame) kecil di depan toko. */
function aBoard(x,X,Y,lines,bg='#2a3a32'){RR(x,X,Y,16,18,WD.m,1);RR(x,X+1,Y+1,14,13,bg,1);lines.forEach((c,i)=>R(x,X+3,Y+4+i*3,8+(i%2)*2,1,c));R(x,X+1,Y+16,2,4,WD.d);R(x,X+13,Y+16,2,4,WD.d);}

/**
 * Ruko (2–3 m lebar muka) dengan atap genteng miring ber-overhang.
 * o: w, floors 1|2, kind 'tua'|'toko'|'lv1'..'lv4', wall, roof[4], door 'shutter'|'glass'|'wood', doorW, frame, winW, lit, stripe,
 *    awning[2], sign {text,bg,fg,icon,bold} (papan di atas pintu), neonSign {text,col}, pipe 'L'|'R', vine 'L'|'R', post[(x,g)=>…]
 */
function ruko(o){const fw=Math.round((o.w||92)*BLD_W),fl=o.floors||1,X0=16,RHt=Math.round((o.roofH||26)*ROOF_K),FHg=64,FHu=50;const top=(o.tp||0)+(o.dormer?22:0);
  const W=fw+X0*2,wy=top+RHt-3,H=wy+(fl-1)*FHu+FHg+6;const[c,x]=cv(W,H);
  const wall=o.wall||'#e8dcc4',rf=o.roof||[B.roof0,B.roof1,B.roof2,B.roof3];
  const gy=wy+(fl-1)*FHu,base=gy+FHg-6;
  wallFill(x,X0,wy,fw,base-wy+1,{mat:o.mat||'plaster',plC:wall,seed:fw+fl});if(o.timber){beamV(x,X0,wy,5,base-wy);beamV(x,X0+fw-5,wy,5,base-wy);}
  if(o.kind==='tua'){const rr=rng(3);for(let k=0;k<60;k++)R(x,X0+2+rr()*(fw-6),wy+4+rr()*(base-wy-8),1+(rr()*3|0),1,rr()<.5?shade(wall,-.18):'#a89878');
    for(let k=0;k<5;k++){const sx=X0+6+k*(fw/5),sy=wy+4;for(let t=0;t<10+k%3*4;t++)P(x,sx+(t%2),sy+t,'rgba(80,60,40,.35)');}}
  if(o.stripe){R(x,X0,base-8,fw,3,o.stripe);R(x,X0,base-8,fw,1,shade(o.stripe,.3));}
  // lantai atas
  for(let f=0;f<fl-1;f++){const y=wy+f*FHu;const nW=o.upWin||3,ww=o.winW||18;
    for(let k=0;k<nW;k++){const wx=X0+8+k*((fw-16-ww)/(nW-1));winSoft(x,wx|0,y+9,ww,22,{frame:o.frame,lit:o.lit,curtain:o.curtain});}
    // lis lantai
    RR(x,X0-2,y+FHu-4,fw+4,3,shade(wall,-.2),1);R(x,X0-2,y+FHu-4,fw+4,1,shade(wall,.25));eaveShadow(x,X0,y+FHu-1,fw,3);}
  // lantai dasar
  const dw=o.doorW||28,dx=X0+(fw-dw)/2|0,dh=DOOR_H,dy=base-dh;const ww=o.winW||18;
  [X0+6,X0+fw-6-ww].forEach(wx=>{if(o.kind==='tua'){R(x,wx-1,dy+1,ww+2,20,WD.d);R(x,wx,dy+2,ww,18,'#3a3028');for(let k=0;k<3;k++){RR(x,wx-2,dy+4+k*6,ww+4,3,WD.l,1);R(x,wx-2,dy+4+k*6,ww+4,1,WD.h);P(x,wx,dy+5+k*6,'#2a2a2e');P(x,wx+ww-1,dy+5+k*6,'#2a2a2e');}}
    else winSoft(x,wx,dy+2,ww,19,{frame:o.frame,lit:o.lit,curtain:o.curtain});});
  plinth(x,X0,base,fw);patio(x,X0-6,base+5,fw+12,6,fw);
  doorSoft(x,dx,dy,dw,dh,{kind:o.door||'glass',frame:o.frame,lit:o.lit,rust:o.kind==='tua',col:o.doorC,window:true});
  if(o.awning){awningSoft(x,X0-2,dy-9,fw+4,o.awning,6);}
  // atap
  if(!o.timber)cornerBoards(x,X0,wy,fw,base-wy,o.trimC);frieze(x,X0,wy+3,fw,o.trimC);const pal=toPal(o.rp||rf);roofHip(x,1,top,W-2,RHt,pal,fw);eaveShadow(x,X0,wy+3,fw,5);
  if(o.dormer){const cx=X0+(fw>>1);roofGable(x,cx,top-20,36,RHt+8,pal,{tk:15,seed:fw+3,wall:(i,j)=>WM[o.dormerMat||'plaster'](i,j,5,wall)});winSoft(x,cx-7,top+RHt-28,14,10,{frame:o.frame,lit:o.lit});}
  if(o.kind==='tua'){const rr=rng(7);for(let k=0;k<6;k++){const a=8+rr()*(W-20)|0,b=top+3+rr()*(RHt-8)|0;R(x,a,b,5,3,'#2a120a');}}
  if(o.pipe){const px=o.pipe==='L'?X0+1:X0+fw-4;downpipe(x,px,wy+1,base+5);}
  if(o.vine){const vx=o.vine==='L'?X0+3:X0+fw-6;vine(x,vx,gy+6,base,fw,o.vineFlower);}
  const g={X0,fw,top,wy,gy,dx,dy,dw,dh,W,H,base,signY:dy-(o.awning?22:15)};
  if(o.sign){const s=o.sign;plank(x,X0+fw/2,g.signY,s.text,{bg:s.bg,fg:s.fg,icon:s.icon,bold:!!s.bold,wood:!s.bg});}
  (o.post||[]).forEach(f=>f(x,g));
  softOutline(c);(o.over||[]).forEach(f=>f(x,g));return c;}
const EXT={};
/* ---------- Klinik 4 level (+ tahap 0) ---------- */
EXT.klinik0=ruko({w:92,kind:'tua',wall:'#c8b89a',door:'shutter',doorW:30,roof:['#4a2a20','#6a3a2a','#7a4a34','#8a5a40'],pipe:'R',post:[(x,g)=>{
  // papan DIJUAL dipaku miring + rumput liar + retakan
  const X=g.X0+g.fw/2-20,Y=g.signY+1;RR(x,X,Y,40,12,WD.l,1);R(x,X+1,Y+1,38,1,WD.h);for(let i=X+4;i<X+38;i+=9)P(x,i,Y+8,WD.m);P(x,X+2,Y+2,'#5a5a60');P(x,X+37,Y+2,'#5a5a60');Tm(x,'DIJUAL',X+10,Y+4,'#9a2a2a');
  for(let k=0;k<10;k++){const a=g.X0+2+k*9+(k%3),b=g.base+4;R(x,a,b-2-(k%3),1,3+(k%3),'#5c9a30');P(x,a+1,b-1,'#86c23a');}
  wCrack(g.X0+fw4(g)-10,g.wy+14)(x);}]});
function fw4(g){return g.fw*3/4|0;}
EXT.klinik1=deco(ruko({w:92,kind:'lv1',dormer:1,timber:1,wall:'#f2e6cc',door:'wood',doorW:20,doorC:'#b07a48',pipe:'R',vine:'L',vineFlower:'#ff8ab0'}),26,[(x,p,b)=>{
  // plang kecil di tiang (identitas Lv1)
  const X=0,Y=b.height-6+p-44;RR(x,X+12,Y+10,3,36,'#5a5a64',1);R(x,X+10,Y+10,1,36,'#8a8a94');RR(x,X,Y,35,13,'#f7f7f2',2);R(x,X+1,Y+1,33,1,'#ffffff');R(x,X+1,Y+11,33,1,'#c8d0da');
  T(x,'drg',X+12,Y+3,'#2a5a8a',8,null,true);R(x,X+3,Y+3,6,6,'#7fb8e8');R(x,X+4,Y+4,4,3,'#ffffff');P(x,X+4,Y+7,'#ffffff');P(x,X+7,Y+7,'#ffffff');
  pot(x,p+b.width/2+20,b.height+p-14);}]);
EXT.klinik2=deco(ruko({w:96,kind:'lv2',dormer:1,wall:'#f6eedc',door:'glass',frame:'#4f8a76',stripe:'#cfeee2',awning:['#ffffff','#5aa890'],sign:{text:'KLINIK GIGI',bg:'#ffffff',fg:'#2e6a5a',icon:'tooth'},pipe:'R',vine:'L',vineFlower:'#ffd23a'}),16,[(x,p,b)=>{
  wallLamp(x,p+30,p+b.height-50);wallLamp(x,p+b.width-36,p+b.height-50);pot(x,p+6,b.height+p-14,PAL.kemarau,'#ff7a5a');pot(x,p+b.width-14,b.height+p-14,PAL.kemarau,'#ffd23a');}]);
EXT.klinik3=deco(ruko({w:112,kind:'lv3',wall:'#ffffff',door:'glass',doorW:32,frame:'#2e3440',winW:24,lit:1,stripe:'#e2f4ee',roof:['#1f4a44','#2b6a62','#3a8a80','#5aaa9e'],pipe:'R',
  over:[(x,g)=>{const t='KLINIK GIGI',w=TWm(t)+26;const X=g.X0+(g.fw-w)/2|0,Y=g.signY-2;RR(x,X,Y,w,14,'#1f2a2e',2);R(x,X+1,Y+1,w-2,1,'#3a4a50');x.drawImage(IC.tooth,X+2,Y-2);neon(x,t,X+19,Y+4,'#7affd8');wallLamp(x,g.X0+8,g.gy+8);wallLamp(x,g.X0+g.fw-13,g.gy+8);}]}),22,[(x,p,b)=>{
  pot(x,2,b.height+p-14,PAL.kemarau,'#ff7a5a');x.drawImage(bench2(28),b.width+p-4,b.height+p-18);}]);
EXT.klinik4=deco(ruko({w:120,floors:2,kind:'lv4',wall:'#f8f6f0',door:'glass',doorW:34,frame:'#2e3440',winW:22,upWin:2,lit:1,roof:['#2a2e3a','#3a4050','#4a5264','#5a6478'],roofH:16,pipe:'R',
  sign:{text:'KLINIK GIGI',bg:'#2e3440',fg:'#ffffff',icon:'tooth'},
  post:[(x,g)=>{for(let j=g.wy+2;j<g.base;j++){R(x,g.X0+2,j,5,1,j%4?WD.l:WD.m);R(x,g.X0+g.fw-7,j,5,1,j%4?WD.l:WD.m);}
    // balkon lantai 2
    const by=g.gy-6;RR(x,g.X0-3,by,g.fw+6,3,'#2e3440',1);for(let i=g.X0;i<g.X0+g.fw;i+=4)R(x,i,by-9,1,9,'#3a4050');RR(x,g.X0-3,by-10,g.fw+6,2,'#4a5264',1);
    for(let k=0;k<5;k++){disc(x,g.X0+10+k*24,by-12,3,PAL.kemarau.g1);P(x,g.X0+10+k*24,by-14,'#ff7a5a');}}],
  over:[(x,g)=>{// papan neon besar di tengah fasad lantai 2
    const w=66,X=g.X0+(g.fw-w)/2|0,Y=g.wy+8;RR(x,X,Y,w,22,'#1a1e24',2);R(x,X+1,Y+1,w-2,1,'#3a4050');neon(x,'SENYUM',X+7,Y+4,'#ff8ad8',8,true);x.drawImage(IC.tooth,X+w-18,Y+3);
    Tm(x,'DENTAL',X+8,Y+14,'#9ad8ff');wallLamp(x,g.X0+10,g.gy+12);wallLamp(x,g.X0+g.fw-15,g.gy+12);}]}),16,[(x,p,b)=>{
  pot(x,2,b.height+p-14,PAL.kemarau,'#ff7a5a');pot(x,b.width+p+4,b.height+p-14,PAL.kemarau,'#ffd23a');x.drawImage(bigPlant(5),b.width+p-10,b.height+p-46);}]);
/* ---------- Rumah 4 level ---------- */
/** Gentong tanah liat kecil (untuk emperan). */
function jar(x,X,Y,c='#b85a32'){ellipse(x,X+5,Y+7,5,6,shade(c,-.25));ellipse(x,X+5,Y+6,5,5,c);R(x,X+2,Y,6,2,shade(c,-.3));R(x,X+2,Y+3,2,4,shade(c,.25));}
const goodsJars=(x,sx,wy,sw,fy)=>{for(let k=0;k*12<sw-8;k++)jar(x,sx+3+k*12,wy+10,k%2?'#c86a3a':'#a84a2a');x.drawImage(sack('#d8c8a0','#a8784a'),sx+2,fy-20);jar(x,sx+sw-14,fy-13);};
const goodsSacks=(x,sx,wy,sw,fy)=>{for(let k=0;k*12<sw-8;k++)x.drawImage(sack('#a8784a','#3f8f4a'),sx+2+k*12,wy+5);x.drawImage(sack('#a8784a','#3f8f4a'),sx+2,fy-20);x.drawImage(barrel(),sx+sw-14,fy-14);};
const goodsShop=(x,sx,wy,sw,fy)=>{wHangSnacks(sx+2,wy+4,sw-6)(x);for(let k=0;k*10<sw-8;k++)jar(x,sx+3+k*10,wy+11,['#e8c547','#c8414b','#3f8f4a'][k%3]);x.drawImage(crate(),sx+2,fy-15);x.drawImage(sack('#e8dcc0','#3f8f4a'),sx+sw-14,fy-20);};
const goodsCafe=(x,sx,wy,sw,fy)=>{x.drawImage(table(18,WD),sx+4,fy-18);x.drawImage(stool(),sx+1,fy-13);menuBoard(sx+3,wy+3,sw-8,['KOPI','TEH'])(x);};
EXT.rumah1=(()=>{const fw=158,X0=15,W=fw+X0*2,top=0,RHt=46,wy=top+RHt-3,base=wy+56,H=base+12;const[c,x]=cv(W,H);
  wallFill(x,X0,wy,fw,base-wy,{mat:'plank',plC:'#e6d6b4',seed:4});plinth(x,X0,base,fw);
  for(let k=0;k<4;k++){const X=X0+9+k*37;doorSoft(x,X,base-30,16,30,{col:k===2?'#3a8a8a':'#9a5a2c',window:false,mat:k===2});
    winSoft(x,X+23,base-26,9,12,{curtain:k%2?'#e8a0a0':'#a8c8e8'});RR(x,X+3,base-41,10,8,'#fbf4e2',1);T(x,String(k+1),X+6,base-41,'#4a230e',8,null,true);}
  [0,1,2,3,4].forEach(k=>beamV(x,X0+k*(fw-5)/4|0,wy,5,base-wy));beamH(x,X0-4,wy+1,fw+8,5);
  roofHip(x,1,top,W-2,RHt,RP.terra,4);eaveShadow(x,X0,wy+6,fw,4);downpipe(x,X0+fw-4,wy+6,base+5);patio(x,X0-6,base+5,fw+12,6,4);
  softOutline(c);for(let k=0;k<4;k++)pot(x,X0+86+k*9,base-6,PAL.kemarau,k%2?'#ffffff':null);x.drawImage(IC.heart,X0+83,base-58);return c;})();
EXT.rumah2=deco(building({sign:{text:'RUMAH',icon:'house'},w:72,wallH:56,rp:RP.red,mat:'plaster',plC:'#e8dcc4',gableWall:'plank',gablePlC:'#d8c8a8',windows:[{x:7,y:16}],winW:16,door:{off:12},seed:21,pipe:'L',
  post:[(x,g)=>{for(let i=g.X0+9;i<g.X0+23;i+=3)R(x,i,g.wy+16,1,18,'#2a2a2e');}]}),14,[(x,p,b)=>{
  const by=b.height+p;for(let i=0;i<b.width+6;i+=4)RR(x,p-4+i,by-3,2,9,'#4a4a50',1);RR(x,p-4,by-1,b.width+8,2,'#5a5a64',1);pot(x,p+b.width-14,by-16);}]);
/** Rumah ujung kiri saat belum dikontrak (rumah Lv 1 = Kos Melati): EXT.rumah2 + papan DIKONTRAK di kanan. cw = lebar rumah (pusat pintu). ACC 2026-11-13. */
function papanKontrak(x,X,Y){const W=TWm('2 JT SEBULAN')+6;
  R(x,X+6,Y+15,2,14,'#5a3a24');R(x,X+W-8,Y+15,2,14,'#5a3a24');R(x,X+6,Y+15,1,14,'#7a5234');R(x,X+W-8,Y+15,1,14,'#7a5234');
  R(x,X-1,Y-1,W+2,18,'#2a1610');R(x,X,Y,W,16,'#fbf4e2');R(x,X,Y,W,1,'#ffffff');R(x,X,Y+15,W,1,'#d8c8a8');
  const t1='DIKONTRAK',t2='2 JT SEBULAN';Tm(x,t1,X+(W>>1)-(TWm(t1)>>1),Y+2,'#a8202a');Tm(x,t2,X+(W>>1)-(TWm(t2)>>1),Y+9,'#4a230e');}
EXT.rumahK=(()=>{const b=EXT.rumah2,PW=TWm('2 JT SEBULAN')+10;const[c,x]=cv(b.width+PW,b.height);x.drawImage(b,0,0);const[l,lx]=cv(c.width,c.height);papanKontrak(lx,b.width+1,b.height-31);softOutline(l);x.drawImage(l,0,0);c.cw=b.width;return c;})();
EXT.rumah3=deco(building({sign:{text:'RUMAH',icon:'house'},w:78,wallH:56,rp:RP.terra,mat:'plank',plC:'#ecdcbc',round:1,windows:[{x:6,y:16,shutter:'#3f6a9a'},{x:58,y:16,shutter:'#3f6a9a'}],door:{col:'#2a9a8a',lintel:1},seed:22,pipe:'R',chimney:'R',
  wing:{side:'L',w:26,kind:'room',mat:'plank',plC:'#e0d0b0'}}),22,[(x,p,b)=>{
  const by=b.height+p;for(let i=0;i<2;i++)for(let j=0;j<3;j++){const X=p+b.width+2+i*12,Y=by-32+j*9;RR(x,X,Y,10,5,'#5a3a24',1);R(x,X+1,Y,8,1,'#7a5234');for(let k=0;k<3;k++){P(x,X+1+k*3,Y-1,'#5c9a30');P(x,X+2+k*3,Y-2,'#86c23a');}}
  for(let i=0;i<b.width+26;i+=5)RR(x,p-8+i,by+2,3,9,'#f2f2ea',1);RR(x,p-8,by+5,b.width+26,2,'#e2e2da',1);x.drawImage(potPlant(2),p+b.width-26,by-36);}]);
EXT.rumah4=deco(building({sign:{text:'RUMAH',bg:'#3a2a1e',fg:'#f2d8a8',icon:'house'},w:84,wallH:60,rp:RP.wood,mat:'field',timber:1,timberPosts:[54],gableWall:'field',gableTimber:1,door:{off:-16,lintel:1,col:'#7a4a24'},seed:23,pipe:'L',
  windows:[{x:62,y:16,w:16,h:20}],wing:{side:'R',w:44,kind:'room',mat:'field',rp:RP.wood},
  post:[(x,g)=>{winSoft(x,g.X0+g.ww+14,g.wy+30,24,16,{frame:TB[1],lit:1});wallLamp(x,g.X0+g.ww+6,g.wy+24);}]}),20,[(x,p,b)=>{
  const by=b.height+p;for(let k=0;k<6;k++){disc(x,p-8+k*30,by-5,5,PAL.kemarau.g1);disc(x,p-9+k*30,by-7,3,PAL.kemarau.g2);P(x,p-8+k*30,by-9,k%2?'#ff7a5a':'#fff4c8');}
  for(let k=0;k<4;k++)RR(x,p+20+k*7,by+1+k*2,6,3,'#bdb6ae',1);x.drawImage(bigPlant(5),p-18,by-44);}]);
/* ---------- Zona 1 · Alun-alun ---------- */
EXT.balai=deco(building({w:120,roofType:'hip',dormer:1,roofH:32,wallH:60,rp:RP.blue,mat:'brick',plC:'#b8604a',dormerMat:'plaster',windows:[{x:8,arch:1},{x:30,arch:1},{x:76,arch:1},{x:98,arch:1}],winY:18,door:{w:24,kind:'arch',col:'#8a4a24'},
  sign:{text:'BALAI KOTA',bg:'#2f5d9e',fg:'#ffffff',icon:'flag'},pipe:'R',seed:9,
  post:[(x,g)=>{[g.dx-10,g.dx+g.dw+6].forEach(px=>{RR(x,px,g.dy-8,5,g.dh+8,'#f4ecdc',1);R(x,px+4,g.dy-8,1,g.dh+8,'#c8c0b0');});
    const cy=g.top-2+8;disc(x,g.cx,cy,5,TB[1]);disc(x,g.cx,cy,4,'#f7f2e4');R(x,g.cx,cy-3,1,3,'#3a2a1f');R(x,g.cx,cy,3,1,'#3a2a1f');}]}),14,[(x,p,b)=>{x.drawImage(flagPole(),b.width+p-2,b.height+p-50);pot(x,p+26,b.height+p-18,PAL.kemarau,'#ff7a5a');pot(x,p+b.width-36,b.height+p-18,PAL.kemarau,'#ffd23a');}]);
EXT.warung=deco(building({w:70,wallH:60,rp:RP.terra,mat:'plank',plC:'#eadcbc',round:1,windows:[{x:5,y:18,shutter:'#3f8f4a'}],door:{off:10,col:'#3f8f4a',lintel:1},
  sign:{text:'WARUNG',icon:'basket'},seed:2,pipe:'R',chimney:'R',wing:{side:'L',w:34,kind:'porch',goods:[goodsShop]}}),12,[(x,p,b)=>{
  const by=b.height+p;x.drawImage(crate(),b.width+p-6,by-18);}]);
EXT.kedai=deco(building({w:70,wallH:60,rp:RP.wood,mat:'brick',plC:'#9a4a34',gableWall:'plank',gablePlC:'#c8a070',gableWin:1,windows:[{x:5,y:18,arch:1}],door:{off:10,kind:'arch',col:'#6a3a1c'},
  sign:{text:'KEDAI SEDUH',bg:'#3a2214',fg:'#f2d8a8',icon:'cup'},seed:5,vine:'R',vineFlower:'#ff7a5a',chimney:'L',wing:{side:'R',w:30,kind:'porch',goods:[goodsCafe],rp:RP.terra}}),14,[(x,p,b)=>{
  const by=b.height+p;aBoard(x,p-10,by-24,['#f2ead8','#e8c547','#f2ead8']);}]);
/* (roti, pos: ruko — di bawah) */
EXT.angkringan=(()=>{const W=140,H=104;const[c,x]=cv(W,H);// tenda angkringan beratap genteng + gerobak + tikar lesehan
  [6,W-10].forEach(px=>beamV(x,px,34,4,58));beamV(x,W/2-2|0,34,4,58);
  // tikar lesehan + meja pendek
  RR(x,8,74,60,18,'#a8423a',2);for(let i=10;i<66;i+=4)R(x,i,75,2,16,'#c8624a');R(x,9,74,58,1,'#e8826a');RR(x,22,72,30,6,TB[3],1);R(x,22,72,30,1,TB[4]);R(x,24,78,2,4,TB[1]);R(x,48,78,2,4,TB[1]);
  roofHip(x,0,0,W,40,RP.ochre,11);eaveShadow(x,4,40,W-8,4);patio(x,74,90,62,6,3);
  softOutline(c);
  x.drawImage(cart(),84,54);x.drawImage(stool(),74,78);x.drawImage(stool(),124,80);x.drawImage(mug(),30,66);x.drawImage(mug('#e8c547'),40,67);
  // lampu gantung menyala
  R(x,W/2|0,38,1,8,'#2a2a2e');RR(x,(W/2|0)-3,46,7,5,'#ffe27a',1);x.fillStyle='rgba(255,230,140,.16)';x.beginPath();x.ellipse(W/2,60,34,16,0,0,7);x.fill();
  plank(x,W/2,16,'ANGKRINGAN',{bg:'#3a2214',fg:'#ffd23a',icon:'cup'});return c;})();
/* ---------- Zona 2 · Kampung Asri ---------- */
EXT.jamu=deco(building({w:68,wallH:60,rp:RP.green,mat:'field',gableWall:'plank',gablePlC:'#c8a878',round:1,windows:[{x:48,y:18}],door:{off:-10,lintel:1,col:'#7a5a2c'},
  sign:{text:'JAMU',bg:'#2f6e3a',fg:'#f6eac8',icon:'leaf'},seed:14,vine:'R',wing:{side:'L',w:34,kind:'porch',goods:[goodsJars]},
  post:[(x,g)=>{hangHerbs(g.X0+40,g.wy+8,20)(x);}]}),12,[(x,p,b)=>{const by=b.height+p;x.drawImage(lumpang(),b.width+p-6,by-20);}]);
EXT.endang=deco(building({w:68,wallH:60,rp:RP.terra,mat:'plank',plC:'#dfe6ea',round:1,windows:[{x:5,y:18,shutter:'#3f6a9a'},{x:49,y:18,shutter:'#3f6a9a'}],flowers:1,door:{col:'#3f6a9a',lintel:1},seed:12,pipe:'R',
  sign:{text:'JAHIT',bg:'#f7f2e4',fg:'#3f6a9a',icon:'thread'}}),10,[]);
EXT.wiryo=deco(building({sign:{text:'RUMAH WIRYO',icon:'house'},w:74,wallH:56,rp:RP.brown,mat:'stone',gableWin:1,windows:[{x:5,y:14,arch:1},{x:55,y:14,arch:1}],door:{kind:'arch',col:'#8a4a24'},seed:31,vine:'L',chimney:'R'}),16,[(x,p,b)=>{const by=b.height+p;x.drawImage(rockingChair(),p-6,by-30);x.drawImage(chessTable(),b.width+p-12,by-22);}]);
EXT.lurah=deco(building({sign:{text:'RUMAH LURAH',bg:'#2f5d9e',fg:'#ffffff',icon:'flag'},w:84,roofType:'hip',dormer:1,roofH:28,wallH:58,rp:RP.blue,mat:'brick',plC:'#b05a44',windows:[{x:6,y:16,shutter:'#2f5d9e'},{x:62,y:16,shutter:'#2f5d9e'}],seed:32,pipe:'R',chimney:'L',door:{kind:'arch',col:'#7a4a24'}}),16,[(x,p,b)=>{const by=b.height+p;x.drawImage(flagPole(),p-14,by-50);pot(x,p+4,by-18,PAL.kemarau,'#ff7a5a');pot(x,p+b.width-14,by-18,PAL.kemarau,'#ffd23a');}]);
EXT.bowo=deco(building({sign:{text:'PAK BOWO',icon:'cup'},w:62,wallH:56,rp:RP.olive,mat:'siding',wallC:'#8a6a44',gableWall:'plank',gablePlC:'#a8885e',windows:[{x:44,y:16}],door:{off:-10,col:'#6a4a2a'},seed:33,wing:{side:'L',w:34,kind:'porch',goods:[goodsSacks],rp:RP.olive}}),14,[(x,p,b)=>{wCaping(p+b.width-30,p+b.height-74)(x);}]);
EXT.guru=deco(building({sign:{text:'BU SINTA',bg:'#f7f2e4',fg:'#8a3a5a',icon:'book'},w:66,wallH:56,rp:RP.plum,mat:'plank',plC:'#f2e2dc',round:1,windows:[{x:5,y:16},{x:47,y:16}],flowers:1,door:{col:'#8a3a5a',lintel:1},seed:34,vine:'L',vineFlower:'#ff8ab0',pipe:'R'}),12,[(x,p,b)=>{x.drawImage(bench(),b.width+p-14,b.height+p-20);}]);
EXT.sd=deco(building({w:172,roofType:'hip',dormer:1,roofH:30,wallH:60,rp:RP.terra,mat:'plaster',plC:'#f4eedd',dormerMat:'plank',windows:[6,28,50,108,130,152],winY:18,door:{w:24,lintel:1},seed:35,pipe:'R',timber:1,timberPosts:[70,97],
  sign:{text:'SD NEGERI RIMBASARI',bg:'#c8414b',fg:'#ffffff',icon:'book'},post:[(x,g)=>{R(x,g.X0+5,g.fy-4,g.ww-10,2,'#c8414b');R(x,g.X0+5,g.fy-2,g.ww-10,1,'#f7f7f2');}]}),18,[(x,p,b)=>{x.drawImage(flagPole(),b.width+p+2,b.height+p-50);}]);
/* ---------- Zona 3 · Jalan Niaga ---------- */
EXT.terminal=(()=>{const w=180,H=96;const[c,x]=cv(w,H);// halte terminal + bus
  for(let i=0;i<8;i++)beamV(x,10+i*22,30,4,50);
  roofHip(x,2,0,w-4,40,RP.green,6);eaveShadow(x,8,40,w-16,4);
  RR(x,12,62,62,4,TB[3],1);R(x,12,62,62,1,TB[4]);RR(x,14,66,2,12,TB[1],1);RR(x,70,66,2,12,TB[1],1);
  RR(x,90,40,84,40,'#e8e2d4',3);R(x,90,40,84,6,'#2f5d9e');for(let k=0;k<5;k++){winSoft(x,95+k*15,50,10,11,{frame:'#2f5d9e'});}R(x,90,68,84,4,'#2f5d9e');R(x,162,50,6,10,'#f2c84a');
  disc(x,106,80,6,'#2a2a2e');disc(x,106,80,3,'#8a93a3');disc(x,154,80,6,'#2a2a2e');disc(x,154,80,3,'#8a93a3');
  patio(x,4,82,w-8,7,8);softOutline(c);plank(x,90,16,'TERMINAL',{bg:'#2a5a44',fg:'#ffffff',icon:'bus'});return c;})();
EXT.roti=deco(ruko({w:88,kind:'toko',wall:'#f6dcd2',mat:'plank',dormer:1,dormerMat:'plank',timber:1,door:'glass',frame:'#a8506a',awning:['#ffffff','#f08aa8'],sign:{text:'ROTI MANIS',bg:'#ffffff',fg:'#a8406a',icon:'bread'},pipe:'R',vine:'L',vineFlower:'#ffffff',
  post:[(x,g)=>{// roti di etalase
  [g.X0+6,g.X0+g.fw-24].forEach(wx=>{for(let k=0;k<3;k++){ellipse(x,wx+3+k*6,g.dy+18,2,1,'#c97a2e');P(x,wx+2+k*6,g.dy+17,'#f6d08a');}});}]}),12,[(x,p,b)=>{aBoard(x,p-8,b.height+p-20,['#ffd0e0','#ffffff','#ffd0e0'],'#a8406a');}]);
EXT.pos=deco(ruko({w:88,kind:'toko',wall:'#b8604a',mat:'brick',dormer:1,door:'glass',frame:'#8a4a1a',stripe:'#f2c09a',awning:['#ffffff','#e8762a'],sign:{text:'KANTOR POS',bg:'#e8762a',fg:'#ffffff',icon:'mail'},pipe:'L'}),14,[(x,p,b)=>{x.drawImage(mailbox(),b.width+p-2,b.height+p-24);}]);
EXT.polisi=deco(ruko({w:94,kind:'toko',wall:'#e8eef6',timber:1,door:'glass',frame:'#2f3d63',stripe:'#c8d4e4',roof:['#1f2843','#2f3d63','#41528a','#5a6eaa'],sign:{text:'POS POLISI',bg:'#2f3d63',fg:'#ffffff',icon:'badge'},pipe:'L',
  over:[(x,g)=>{RR(x,g.X0+g.fw/2-5,g.top+2,10,5,'#2a2a2e',1);R(x,g.X0+g.fw/2-4,g.top+3,4,3,'#e84a4a');R(x,g.X0+g.fw/2,g.top+3,4,3,'#4a8aff');}]}),14,[(x,p,b)=>{x.drawImage(flagPole(),b.width+p-2,b.height+p-46);}]);
EXT.teknik=deco(ruko({w:92,kind:'toko',wall:'#e8dcc0',mat:'plank',timber:1,dormer:1,dormerMat:'plank',door:'glass',frame:'#5a4a30',roof:['#5a3a10','#8a5a20','#b87a30','#e3aa3c'],sign:{text:'KONSULTAN TEKNIK',bg:'#3a3a40',fg:'#f2c84a',icon:'helmet'},pipe:'R',vine:'L'}),12,[(x,p,b)=>{pot(x,p-6,b.height+p-14);
  // helm proyek di papan gantung
  const X=b.width+p-4,Y=b.height+p-40;R(x,X+5,Y+12,2,28,WD.m);RR(x,X,Y,12,12,'#f2c84a',2);R(x,X,Y+9,12,2,'#c89a20');}]);
EXT.adji=deco(ruko({w:88,kind:'toko',wall:'#e8eaee',door:'glass',frame:'#2a2e3a',roof:['#1a1e28','#2a2e3a','#3a4050','#4a5264'],sign:{text:'KANTOR AKUNTAN',bg:'#2a2e3a',fg:'#e8c547',icon:'chart'},pipe:'R'}),12,[(x,p,b)=>{pot(x,p-6,b.height+p-14);pot(x,b.width+p+2,b.height+p-14,PAL.kemarau,'#ffd23a');}]);
EXT.puskes=deco(building({w:128,roofType:'hip',roofH:28,wallH:60,rp:RP.green,mat:'plaster',plC:'#f4f2ec',windows:[6,26,88,108],winY:18,door:{w:26,kind:'glass'},seed:37,pipe:'R',timber:1,
  sign:{text:'PUSKESMAS',bg:'#2f6e3a',fg:'#ffffff',icon:'cross'},post:[(x,g)=>{const X=g.dx+g.dw+8,Y=g.dy+2;RR(x,X,Y,12,12,'#ffffff',2);R(x,X+5,Y+2,2,8,'#3f8f4a');R(x,X+2,Y+5,8,2,'#3f8f4a');}]}),14,[(x,p,b)=>{pot(x,p-6,b.height+p-18,PAL.kemarau,'#ff7a5a');x.drawImage(bench2(28),b.width+p-24,b.height+p-22);}]);
EXT.studio=deco(ruko({w:88,kind:'toko',wall:'#5a4a44',mat:'plank',door:'glass',frame:'#e3aa3c',lit:1,roof:['#1a1820','#2a2830','#3a3840','#4a4850'],sign:{text:'STUDIO LENSA',bg:'#1a1820',fg:'#e3aa3c',icon:'camera'},pipe:'L',
  post:[(x,g)=>{wallLamp(x,g.X0+4,g.gy+10);wallLamp(x,g.X0+g.fw-9,g.gy+10);}]}),12,[(x,p,b)=>{aBoard(x,b.width+p-2,b.height+p-20,['#e3aa3c','#ffffff','#e3aa3c'],'#1a1820');}]);
/* ---------- Zona 4 · Lereng Bukit ---------- */
EXT.perpus=deco(building({w:136,roofType:'hip',dormer:1,roofH:34,wallH:62,rp:RP.terra,mat:'stone',dormerMat:'stone',windows:[{x:8,arch:1},{x:30,arch:1},{x:92,arch:1},{x:114,arch:1}],winY:18,winH:22,door:{w:24,kind:'arch',col:'#a8582a'},seed:38,chimney:'R',vine:'L',vineFlower:'#ff8ab0',
  sign:{text:'PERPUSTAKAAN',icon:'book'}}),24,[(x,p,b)=>{const by=b.height+p;
  for(let k=0;k<8;k++){const X=p-20+k*24;if(X>p+b.width/2-26&&X<p+b.width/2+14)continue;RR(x,X,by-2,18,6,'#5a3a24',2);R(x,X+1,by-2,16,1,'#7a5234');for(let i=0;i<5;i++){P(x,X+2+i*3,by-4,['#ff7a5a','#ffd23a','#e86a9a','#c88aff','#ffffff'][(k+i)%5]);P(x,X+2+i*3,by-3,'#5c9a30');P(x,X+3+i*3,by-3,'#86c23a');}}
  x.drawImage(bench(),p-22,by-30);}]);
/* ---------- Tempat tinggal baru (2026-11-11, menunggu acc) ---------- */
IC9.flower=fromRows(['..w...w..','.wyw.wyw.','..w.g.w..','....g....','..w.g.w..','.wyw.wyw.','..wgggw..'],IC9P);
IC9.bed=fromRows(['n........','n........','nww......','nwwrrrrrn','nrrrrrrrn','nnnnnnnnn','n.......n'],IC9P);
/** Pot melati: daun rimbun + bunga putih kecil berbintik kuning. */
function jasminePot(x,X,Y){RR(x,X,Y+8,11,8,'#b55a2e',1);RR(x,X-1,Y+7,13,2,'#d07a44',1);R(x,X+8,Y+9,2,6,'#8a4020');disc(x,X+5,Y+4,5,'#3f7a3a');disc(x,X+4,Y+3,3,'#5c9a40');
  [[1,2],[5,0],[9,2],[3,5],[8,6],[6,3]].forEach(([a,b])=>{P(x,X+a,Y+b,'#ffffff');P(x,X+a+1,Y+b,'#f4f4ec');P(x,X+a,Y+b+1,'#f4f4ec');});P(x,X+5,Y,'#ffd23a');}
/** Kos Melati: rumah besar Pak Udin (pelana menghadap depan, rangka kayu), sayap kiri = kamar depan Pak Udin. Melati putih di pot & tanaman rambat. */
EXT.kos=deco(building({sign:{text:'KOS MELATI',bg:'#f7f2e4',fg:'#3f6a4a',icon:'flower'},w:88,wallH:58,rp:RP.red,mat:'plaster',plC:'#f2ead6',gableWall:'plank',gablePlC:'#d8c8a8',gableTimber:1,
  timber:1,timberPosts:[26],windows:[{x:6,y:16,shutter:'#3f6a4a'},{x:66,y:16,shutter:'#3f6a4a'}],door:{off:4,col:'#3f6a4a',lintel:1},seed:41,chimney:'R',vine:'R',vineFlower:'#ffffff',pipe:'L',
  wing:{side:'L',w:32,kind:'room',mat:'plank',plC:'#e0d0b0',shutter:'#3f6a4a'},
  post:[(x,g)=>{// rak sepatu di samping pintu
    const X=g.dx-18,Y=g.fy-12;RR(x,X,Y,14,11,WD.m,1);R(x,X+1,Y+4,12,1,WD.d);[['#c8414b',2,1],['#2f5d9e',8,1],['#3a3a40',2,6],['#e8c547',8,6]].forEach(([c,a,b])=>RR(x,X+a,Y+b,4,3,c,1));}]}),12,[(x,p,b)=>{
  const by=b.height+p;jasminePot(x,p-8,by-20);jasminePot(x,p+b.width-6,by-20);jasminePot(x,p+b.width+6,by-18);}]);
/** Losmen Singgah: ruko 2 lantai di samping Terminal. Lantai atas = kamar 4–6 (jendela bertirai, nomor), lantai bawah = lobi (kamar 1–3 di belakang lobi). */
EXT.losmen=deco(ruko({w:86,floors:2,kind:'toko',wall:'#eadcc0',mat:'plank',timber:1,door:'wood',doorW:24,doorC:'#7a4a24',frame:'#6a3a1c',winW:18,upWin:3,curtain:'#e8a0a0',
  rp:RP.ochre,awning:['#f7f2e4','#c8603a'],sign:{text:'LOSMEN SINGGAH',bg:'#6a2a1a',fg:'#ffe2a8',icon:'bed'},pipe:'R',
  post:[(x,g)=>{const nW=3,ww=18;for(let k=0;k<nW;k++){const wx=(g.X0+8+k*((g.fw-16-ww)/(nW-1)))|0;RR(x,wx+5,g.wy+33,8,7,'#fbf4e2',1);Tm(x,String(4+k),wx+8,g.wy+34,'#4a230e');}
    wallLamp(x,g.X0+6,g.gy+10);wallLamp(x,g.X0+g.fw-11,g.gy+10);}]}),8,[(x,p,b)=>{const by=b.height+p;x.drawImage(bench(),p-6,by-22);pot(x,b.width+p-4,by-16,PAL.kemarau,'#ff7a5a');}]);
/* ---------- Kota lain ---------- */
EXT.bahari=ruko({w:90,kind:'toko',dormer:1,wall:'#e0f0f6',door:'glass',frame:'#2a7a8a',awning:['#ffffff','#2a7a8a'],sign:{text:'BAHARI MEDIKA',bg:'#2a7a8a',fg:'#ffffff',icon:'tooth'},pipe:'R'});
EXT.metra=ruko({w:104,floors:2,kind:'lv3',wall:'#f2f2f6',door:'glass',doorW:32,frame:'#2a2a2e',lit:1,roof:['#5a1a20','#8a2a30','#a8202a','#c84a4a'],sign:{text:'METRA DENTAL',bg:'#a8202a',fg:'#ffffff',icon:'tooth'},pipe:'L'});
