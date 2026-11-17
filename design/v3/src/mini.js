/* ================= MINIGAME TINDAKAN v2 (draf visual, mengikuti design/gdd/minigame/00–10) =================
   Semua digambar prosedural. Cahaya datang dari kiri-atas di semua elemen.
   Tata letak 480×270:
   header (4,4,472,30) · area kerja (4,38,330,162) · instruksi (4,204,330,28)
   kolom kanan x338: pasien (y38,h70) · Bar Sakit (y112,h40) · baki alat (y156,h76) · strip herba (4,236,472,30)
   Hirarki teks: judul 2× · label langkah/bagian 1× tebal · isi & instruksi 1× biasa. Semua teks diberi jarak huruf +1. */

/* ---------- warna ---------- */
const MGC={ink:'#3a1e0c',ink2:'#7a4a26',lite:'#fff3da',lite2:'#b9d6cc',gold:'#ffd86a',warn:'#ffb0b8',red:'#c8323e',ok:'#6ad46a'};
const MG_IN={TEPAT:'#6ad46a',GOSOK:'#f0a048',TAHAN:'#5ab4f0',URUT:'#bc8af0',RITME:'#ff86b8',PILIH:'#ffd86a'};
const MG_KEY={TEPAT:'Spasi / klik',GOSOK:'drag mouse',TAHAN:'tahan klik',URUT:'klik berurutan',RITME:'A / D',PILIH:'klik kartu'};
function rgb(h){return hex(h);}
function mixA(a,b,t){return [a[0]+(b[0]-a[0])*t|0,a[1]+(b[1]-a[1])*t|0,a[2]+(b[2]-a[2])*t|0];}
function mixH(a,b,t){const c=mixA(rgb(a),rgb(b),Math.max(0,Math.min(1,t)));return 'rgb('+c[0]+','+c[1]+','+c[2]+')';}
function shadeA(c,k){return k>=0?mixA(c,[255,255,255],k):mixA(c,[0,0,0],-k);}

/* ---------- teks dengan jarak huruf ---------- */
function SW(str,size=9,bold=false,sp=1){const sc=size>=12?2:1;let w=0;for(const ch of str){const g=GL[ch]||GL['?'];w+=(g.w+1+(bold?1:0))*sc+sp;}return Math.max(0,w-sc-sp);}
function S(x,str,X,Y,col,size=9,bold=false,sp=1,sh=null){X=Math.round(X);Y=Math.round(Y);const sc=size>=12?2:1;let cx=X;
  for(const ch of str){const g=GL[ch]||GL['?'];if(ch!==' '){if(sh)x.drawImage(textImg(ch,sh,size,bold),cx+sc,Y+sc);x.drawImage(textImg(ch,col,size,bold),cx,Y);}cx+=(g.w+1+(bold?1:0))*sc+sp;}return cx-X;}
const H1=(x,s,X,Y,col)=>S(x,s,X,Y,col||MGC.ink,12,false,1,'#e8b878');
const H2=(x,s,X,Y,col,sh)=>S(x,s,X,Y,col||MGC.ink,9,true,1,sh||null);
const TX=(x,s,X,Y,col,sh)=>S(x,s,X,Y,col||MGC.ink,9,false,1,sh||null);
const TXR=(x,s,R2,Y,col,bold,sh)=>S(x,s,R2-SW(s,9,bold),Y,col,9,bold,1,sh||null);
const TXC=(x,s,cx,Y,col,bold,sh)=>S(x,s,cx-(SW(s,9,bold)>>1),Y,col,9,bold,1,sh||null);
const DK='#0b1716';

/* ---------- panel bevel + bayangan ---------- */
function mgShadow(x,X,Y,W,H){x.fillStyle='rgba(0,0,0,.22)';x.fillRect(X+2,Y+H,W,3);x.fillRect(X+W,Y+2,3,H+1);x.fillStyle='rgba(0,0,0,.28)';x.fillRect(X+1,Y+H,W,1);x.fillRect(X+W,Y+1,1,H);}
const BOX={
  paper:{ol:'#3a1c0c',fr:'#a8622c',frL:'#e4a866',frD:'#6a3a18',in:['#fff3d6','#f6e0b0','#eccb92'],inL:'#fffaea',inD:'#cfa064'},
  dark:{ol:'#081312',fr:'#2c5550',frL:'#4f8a80',frD:'#16302d',in:['#20403c','#1b3734','#172f2c'],inL:'#2f5a54',inD:'#0f2220'},
  well:{ol:'#081312',fr:'#24433f',frL:'#16302d',frD:'#3e6e66',in:['#122826','#16302d','#1a3633'],inL:'#0c1d1b',inD:'#2a4c47'},
  gold:{ol:'#4a2a08',fr:'#c88a24',frL:'#ffe08a',frD:'#7a4a10',in:['#fff8dc','#ffefb8','#ffe49a'],inL:'#ffffff',inD:'#e0b85a'},
};
function mgBox(x,X,Y,W,H,kind,shadow=true){const b=BOX[kind||'paper'];if(shadow)mgShadow(x,X,Y,W,H);
  R(x,X+1,Y,W-2,H,b.ol);R(x,X,Y+1,W,H-2,b.ol);
  R(x,X+1,Y+1,W-2,H-2,b.fr);R(x,X+1,Y+1,W-2,1,b.frL);R(x,X+1,Y+1,1,H-2,b.frL);R(x,X+1,Y+H-2,W-2,1,b.frD);R(x,X+W-2,Y+1,1,H-2,b.frD);
  const ih=H-6;for(let j=0;j<ih;j++){const t=j/Math.max(1,ih-1);R(x,X+3,Y+3+j,W-6,1,t<.5?mixH(b.in[0],b.in[1],t*2):mixH(b.in[1],b.in[2],(t-.5)*2));}
  R(x,X+3,Y+3,W-6,1,b.inD);R(x,X+3,Y+3,1,H-6,b.inD);R(x,X+3,Y+H-4,W-6,1,b.inL);R(x,X+W-4,Y+3,1,H-6,b.inL);}
function mgSlot(x,X,Y,W,H,face,active){R(x,X,Y,W,H,active?'#b07a1a':'#a87a48');R(x,X,Y,W,1,active?'#8a5a10':'#8a5a2a');R(x,X,Y,1,H,active?'#8a5a10':'#8a5a2a');
  R(x,X+1,Y+1,W-2,H-2,face||(active?'#fff1b8':'#f2d9a8'));R(x,X+1,Y+1,W-2,1,active?'#e8c45a':'#d8b47c');R(x,X+1,Y+H-1,W-1,1,'#fff6e0');R(x,X+W-1,Y+1,1,H-1,'#fff6e0');}

/* ---------- latar ---------- */
function mgBg(x){const g=x.createRadialGradient(170,120,20,240,135,320);g.addColorStop(0,'#24504a');g.addColorStop(.55,'#1b3a37');g.addColorStop(1,'#10221f');x.fillStyle=g;x.fillRect(0,0,480,270);
  x.fillStyle='rgba(255,240,210,.035)';for(let j=0;j<270;j+=6)for(let i=(j/6%2)*6;i<480;i+=12){x.fillRect(i,j,2,1);x.fillRect(i+1,j+1,1,1);}}
/* ---------- header: judul 2×, nama langkah tebal, pil langkah bernomor ---------- */
function mgHeader(x,title,stepName,steps,cur){mgBox(x,4,4,472,30,'paper');H1(x,title,12,12);
  let px=468;const pills=[];for(let i=steps.length-1;i>=0;i--){const w=Math.max(14,SW(steps[i],9,true)+8);px-=w;pills.unshift([px,w,i]);px-=3;}
  pills.forEach(([X,w,i])=>{const done=i<cur,on=i===cur;const Y=11;R(x,X,Y,w,16,on?'#7a4a10':done?'#2e6a34':'#7a5030');R(x,X+1,Y+1,w-2,14,on?'#ffd86a':done?'#6ad46a':'#e8c898');R(x,X+1,Y+1,w-2,1,on?'#fff2b8':done?'#b8f0a8':'#fff0d0');R(x,X+1,Y+14,w-2,1,on?'#c8902a':done?'#3a8a3a':'#c8a070');
    TXC(x,steps[i],X+w/2,Y+4,on?'#5a2a04':done?'#14401a':'#7a5030',true);});
  if(stepName){const sw=SW(stepName,9,true);H2(x,stepName,px-sw-8,15,MGC.ink2);}}
/* ---------- area kerja (cekung) ---------- */
function mgWork(x,glow){mgBox(x,4,38,330,162,'well',false);if(glow){const g=x.createRadialGradient(glow[0],glow[1],4,glow[0],glow[1],glow[2]||110);g.addColorStop(0,'rgba(120,200,180,.22)');g.addColorStop(1,'rgba(120,200,180,0)');x.fillStyle=g;x.fillRect(7,41,324,156);}}
function mgCorner(x,s){const w=SW(s,9,true)+12;mgBox(x,330-w-4,42,w,17,'dark',false);H2(x,s,330-w+2,47,MGC.gold,DK);}
function mgClip(x,f){x.save();x.beginPath();x.rect(7,41,324,156);x.clip();f();x.restore();}
function mgChip(x,code,X,Y){const c=MG_IN[code];const w=SW(code,9,true)+10;R(x,X,Y,w,13,'#081312');R(x,X+1,Y+1,w-2,11,mixH(c,'#000000',.55));R(x,X+1,Y+1,w-2,1,c);H2(x,code,X+5,Y+3,c);return w;}
function mgInstr(x,code,line1,warn){mgBox(x,4,204,330,28,'dark');const w=mgChip(x,code,9,207);TX(x,MG_KEY[code],15+w,210,MGC.lite2,DK);
  if(warn)TXR(x,warn,327,210,MGC.warn,true,DK);TX(x,line1,10,221,MGC.lite,DK);}
/* ---------- potret ---------- */
function mgFace(x,id,X,Y,expr,sz){sz=sz||34;mgSlot(x,X,Y,sz,sz,'#f6dcb0');const a=chr(id,{expr:expr||'neutral'});x.save();x.beginPath();x.rect(X+1,Y+1,sz-2,sz-2);x.clip();
  const k=(sz-2)/18;x.drawImage(a,3,0,18,19,X+1,Y+1,18*k,19*k);x.restore();}
/* ---------- kartu pasien ---------- */
let MG_T=null;
function mgPatient(x,id,name,flags,dx,tooth,tier,expr){mgBox(x,338,38,138,70,'paper');mgFace(x,id,344,44,expr,32);H2(x,name,382,45);MG_T=tier;
  flags.forEach((f,i)=>{const Y=56+i*11;R(x,382,Y,9,9,mixH(f[1],'#000000',.3));R(x,382,Y,8,8,f[1]);R(x,382,Y,8,1,'rgba(255,255,255,.5)');S(x,'!',385,Y+1,'#ffffff',9,true,0);S(x,f[0],394,Y+1,f[1],9,true,1);});
  TX(x,dx,344,82,MGC.ink);TX(x,tooth,344,93,MGC.ink2);}
/* ---------- bar mengilap ---------- */
function gbar(x,X,Y,W,H,f,col,trk){R(x,X,Y,W,H,'#2a1408');R(x,X+1,Y+1,W-2,H-2,trk||'#5a3018');R(x,X+1,Y+1,W-2,1,'rgba(0,0,0,.35)');
  const fw=Math.round((W-2)*Math.max(0,Math.min(1,f)));if(fw>0){const ih=H-2;for(let j=0;j<ih;j++){const t=j/Math.max(1,ih-1);R(x,X+1,Y+1+j,fw,1,t<.45?mixH(col,'#ffffff',.3-t*.5):mixH(col,'#000000',(t-.45)*.5));}
    R(x,X+1,Y+2,fw,1,'rgba(255,255,255,.5)');R(x,X+fw,Y+1,1,H-2,mixH(col,'#000000',.35));}}
function mgPain(x,v,note){mgBox(x,338,112,138,40,'paper');H2(x,'Sakit',346,117);const vs=String(Math.round(v));S(x,vs,468-SW(vs,9,true),117,v>=70?MGC.red:MGC.ink,9,true,1);
  const col=v>=70?'#e6383e':v>=40?'#f07a3a':'#f0a848';gbar(x,346,128,122,9,v/100,col);const mx=346+Math.round(122*.7);R(x,mx,127,1,11,'#7a1010');Tm(x,'70',mx-3,121,'#9a2020');
  if(note)TX(x,note,346,140,MGC.ink2);}
/* ---------- baki alat ---------- */
const _icCache={};function tool(k){if(_icCache[k])return _icCache[k];const[c,x]=cv(16,16);TLD[k](x);return _icCache[k]=softOutline(c,.5);}
function drawTool(x,k,X,Y){const im=tool(k);dropShadow(x,im,X,Y,1,2,.38);x.drawImage(im,X,Y);}
function mgTray(x,items,title){mgBox(x,338,156,138,76,'paper');H2(x,title||'Baki alat',346,162);
  if(MG_T){const w=SW(MG_T,9,true)+SW('ALAT')+14;const X=470-w;R(x,X,160,w,12,'#5a2e10');R(x,X+1,161,w-2,10,'#ffe7a8');R(x,X+1,161,w-2,1,'#fff8d8');TX(x,'ALAT',X+4,162,MGC.ink2);H2(x,MG_T,X+w-SW(MG_T,9,true)-4,162,MGC.red);}
  items.forEach(([lbl,k,st],i)=>{const X=344+(i%2)*66,Y=174+Math.floor(i/2)*19;const a=st===1;mgSlot(x,X,Y,20,18,st===3?'#e6d4ae':null,a);drawTool(x,k,X+2,Y+1);
    if(st===2)line(x,X+3,Y+15,X+17,Y+3,2,'#d8303a');if(st===3){R(x,X+13,Y+10,7,7,'#2e7a34');S(x,'✓',X+13,Y+10,'#ffffff',9,true,0);}
    S(x,lbl,X+23,Y+5,a?MGC.red:st===2?'#9a5a5a':MGC.ink,9,a,0);});}
/* ---------- strip herba ---------- */
const HERB={mint:['Mint','#5cc88a'],sirih:['Sirih','#3a9a44'],lidah:['Lidah Buaya','#7ac85a'],kunyit:['Kunyit','#e8a020'],cengkeh:['Cengkeh','#9a5430'],serai:['Serai Jahe','#c8b84a']};
const HERBI={};function herbImg(k){if(HERBI[k])return HERBI[k];const[c,x]=cv(16,16);const col=rgb(HERB[k][1]);const L='rgb('+shadeA(col,.35)+')',D='rgb('+shadeA(col,-.35)+')',M=HERB[k][1];
  if(k==='kunyit'){R(x,2,6,11,6,M);R(x,4,4,4,3,M);R(x,2,6,11,1,L);R(x,2,11,11,1,D);R(x,5,8,6,1,'#ffd25a');P(x,12,7,D);}
  else if(k==='cengkeh'){R(x,7,4,2,10,M);R(x,7,4,1,10,L);disc(x,8,4,2,D);P(x,7,3,L);R(x,6,13,4,2,'#5a2a12');}
  else if(k==='lidah'){for(let i=0;i<11;i++){R(x,3+(i*.35|0),13-i,3,1,i<6?M:L);R(x,9+(i*.45|0),13-i,2,1,D);}R(x,4,13,8,2,'#3a6a2a');}
  else if(k==='serai'){for(let i=0;i<12;i++){P(x,5+(i>>2),13-i,M);P(x,8,13-i,L);P(x,10-(i>>2),13-i,D);}R(x,4,13,8,2,'#8a6a3a');}
  else{ellipse(x,8,8,5,6,M);ellipse(x,7,7,3,4,L);for(let i=0;i<8;i++)P(x,8,4+i,D);P(x,6,6,D);P(x,10,7,D);R(x,8,13,1,2,'#3a5a2a');}
  return HERBI[k]=softOutline(c,.5);}
function mgStrip(x,herbs,on,hint){mgBox(x,4,236,472,30,'paper');H2(x,'Herba',11,247);let hx=56;
  const full=herbs.reduce((t,k)=>t+34+SW(HERB[k][0],9,on.includes(k)),56)<466;
  herbs.forEach(k=>{const a=on.includes(k);if(!full&&!a){mgSlot(x,hx,240,20,20,null,false);const im=herbImg(k);dropShadow(x,im,hx+2,242,1,2,.35);x.drawImage(im,hx+2,242);hx+=26;return;}mgSlot(x,hx,240,20,20,null,a);const im=herbImg(k);dropShadow(x,im,hx+2,242,1,2,.35);x.drawImage(im,hx+2,242);const lw=S(x,HERB[k][0],hx+24,247,a?'#1e6a2a':MGC.ink2,9,a,1);hx+=34+lw;});
  if(hint&&hx<468-SW(hint)-6)TXR(x,hint,468,247,MGC.ink2);}
/* ---------- label penunjuk ---------- */
function tag(x,t,X,Y,col,lx,ly){const w=SW(t)+10;const sx=X+(lx>X?w:0);line(x,sx,Y+8,lx,ly+1,1,'rgba(0,0,0,.45)');line(x,sx,Y+7,lx,ly,1,col);disc(x,lx,ly,1,col);
  mgBox(x,X,Y,w,15,'dark',true);R(x,X+3,Y+3,w-6,1,col);TX(x,t,X+5,Y+5,MGC.lite,DK);}
/* ---------- widget input ---------- */
function track(x,X,Y,W,H){R(x,X,Y,W,H,'#081312');R(x,X+1,Y+1,W-2,H-2,'#2a3f3c');R(x,X+1,Y+1,W-2,2,'#16282a');R(x,X+1,Y+H-2,W-2,1,'#3e5a56');}
function wTepat(x,X,Y,W,z0,zw,m,label){if(label)H2(x,label,X,Y-12,MGC.lite,DK);track(x,X,Y,W,14);const zx=X+1+Math.round((W-2)*z0),zW=Math.round((W-2)*zw);
  for(let j=0;j<12;j++)R(x,zx,Y+1+j,zW,1,mixH('#7ae07a','#2a8a3a',j/11));R(x,zx,Y+2,zW,1,'#c8ffc0');R(x,zx,Y+1,1,12,'#1a5a24');R(x,zx+zW-1,Y+1,1,12,'#1a5a24');
  const mx=X+1+Math.round((W-2)*m);R(x,mx-2,Y-3,5,20,'#3a2a08');R(x,mx-1,Y-2,3,18,'#fff4c8');R(x,mx-1,Y-2,1,18,'#ffffff');disc(x,mx,Y-4,2,'#ffd86a');}
function wTahan(x,X,Y,W,f,za,zb,label,lim){if(label)H2(x,label,X,Y-12,MGC.lite,DK);track(x,X,Y,W,13);const zx=X+1+Math.round((W-2)*za);R(x,zx,Y+1,Math.round((W-2)*(zb-za)),11,'#1e5070');
  gbar(x,X+1,Y+3,Math.round((W-2)*f)+2,7,1,'#5ab4f0','#2a3f3c');const lx=X+1+Math.round((W-2)*(lim||zb));R(x,lx-1,Y-3,3,19,'#5a3a04');R(x,lx,Y-2,1,17,'#ffd86a');}
function wRitme(x,X,Y,W,notes,hit,label){if(label)H2(x,label,X,Y-12,MGC.lite,DK);track(x,X,Y,W,24);R(x,X+2,Y+12,W-4,1,'#3e5a56');
  R(x,X+hit-1,Y-3,4,30,'#5a3a04');R(x,X+hit,Y-2,2,28,'#ffd86a');
  notes.forEach(([px,k,st])=>{const nx=X+px,ny=Y+(k==='A'?3:13);const col=st==='r'?'#e6383e':st==='ok'?'#6ad46a':'#ff86b8';
    x.fillStyle='rgba(0,0,0,.4)';x.fillRect(nx+1,ny+1,12,9);R(x,nx-1,ny-1,13,10,'#081312');for(let j=0;j<8;j++)R(x,nx,ny+j,11,1,j<3?mixH(col,'#ffffff',.3-j*.1):mixH(col,'#000000',.1*(j-2)));S(x,k,nx+3,ny+1,'#ffffff',9,true,0,'rgba(0,0,0,.5)');});
  H2(x,'A',X-9,Y+4,MG_IN.RITME,DK);H2(x,'D',X-9,Y+14,MG_IN.RITME,DK);}
function wUrut(x,X,Y,items,gap){gap=gap||44;items.forEach(([lbl,k,st],i)=>{const sx=X+i*gap;mgBox(x,sx,Y,26,24,st===1?'gold':'paper');drawTool(x,k,sx+5,Y+4);
  if(st===3){R(x,sx+17,Y+15,8,8,'#2e7a34');S(x,'✓',sx+18,Y+15,'#ffffff',9,true,0);}
  disc(x,sx+2,Y+1,5,'#081312');disc(x,sx+2,Y+1,4,st===1?'#ffd86a':'#e8d0a0');S(x,String(i+1),sx,Y-2,'#3a1e0c',9,true,0);
  if(lbl)TXC(x,lbl,sx+13,Y+28,st===1?MGC.gold:MGC.lite,st===1,DK);if(i<items.length-1)H2(x,'>',sx+gap-12+2,Y+8,MGC.lite2,DK);});}
function wCard(x,X,Y,W,H,title,lines,sel,draw,dim){mgBox(x,X,Y,W,H,sel?'gold':'paper');if(draw)draw(x,X+4,Y+4);
  const ty=draw?Y+H-25:Y+7;H2(x,title,X+6,ty,sel?'#8a1a10':MGC.ink);(lines||[]).forEach((t,i)=>TX(x,t,X+6,ty+11+i*10,MGC.ink2));
  if(sel){const cy2=draw?Y+4:Y+H-14;R(x,X+W-14,cy2,10,10,'#1e5a24');R(x,X+W-13,cy2+1,8,8,'#3a9a44');S(x,'✓',X+W-13,cy2+1,'#ffffff',9,true,0);}
  if(dim){x.fillStyle='rgba(20,40,38,.35)';x.fillRect(X+3,Y+3,W-6,H-6);}}
function wProg(x,X,Y,W,f,label,col){const lw=label?H2(x,label,X,Y,MGC.lite,DK):0;gbar(x,X+lw+(label?8:0),Y-1,W-lw-(label?8:0),9,f,col||'#f0a048','#2a3f3c');}

/* ================= IKON ALAT (16×16, logam berkilau, kaca memantul) ================= */
const MTL=['#4a525e','#7a8492','#a8b2c0','#d4dbe4','#ffffff'];
function metalH(x,X,Y,W,H){for(let j=0;j<H;j++){const t=j/Math.max(1,H-1);R(x,X,Y+j,W,1,t<.25?MTL[3]:t<.5?MTL[2]:t<.8?MTL[1]:MTL[0]);}if(H>1)R(x,X,Y,W,1,MTL[4]);}
function metalLine(x,x0,y0,x1,y1){line(x,x0,y0+1,x1,y1+1,1,MTL[0]);line(x,x0,y0,x1,y1,1,MTL[2]);line(x,x0,y0-1,x1,y1-1,1,MTL[3]);}
function glass(x,X,Y,W,H,liq,lvl,cap){const L=rgb(liq);const top=Y+Math.round(H*(1-lvl));
  for(let j=Y;j<Y+H;j++)for(let i=X;i<X+W;i++){const u=(i-X)/Math.max(1,W-1);let c=j>=top?shadeA(L,.15-u*.45):(u>.6?[196,210,218]:[226,236,240]);P(x,i,j,'rgb('+c+')');}
  R(x,X,top,W,1,'rgb('+shadeA(L,.45)+')');R(x,X+1,Y+1,1,H-3,'rgba(255,255,255,.9)');P(x,X+W-2,Y+2,'#ffffff');R(x,X,Y+H-1,W,1,'rgb('+shadeA(L,-.35)+')');
  if(cap){R(x,X-1,Y-3,W+2,3,cap);R(x,X-1,Y-3,W+2,1,mixH(cap,'#ffffff',.45));R(x,X+W,Y-3,1,3,mixH(cap,'#000000',.35));}}
const TLD={
  syr:x=>{metalH(x,2,7,9,4);R(x,3,8,6,2,'#bfe6ff');R(x,3,8,6,1,'#ffffff');R(x,11,8,3,2,MTL[2]);R(x,14,9,2,1,MTL[3]);R(x,0,6,2,6,'#2a6ab4');R(x,0,6,2,1,'#6aa8f0');},
  cot:x=>{disc(x,8,9,5,'#dfe6ee');disc(x,7,8,4,'#f4f8fc');disc(x,6,7,2,'#ffffff');P(x,10,11,'#c4ccd6');P(x,11,9,'#c4ccd6');},
  bur:x=>{for(let i=0;i<11;i++){R(x,2+i,12-i,3,3,MTL[1]);P(x,2+i,12-i,MTL[3]);P(x,4+i,14-i,MTL[0]);}R(x,12,1,3,3,MTL[2]);P(x,12,1,MTL[4]);R(x,1,13,3,3,'#5a3a2a');P(x,1,13,'#8a6a5a');},
  frc:x=>{metalLine(x,2,3,12,7);metalLine(x,2,13,12,9);R(x,11,7,4,3,MTL[1]);P(x,11,7,MTL[4]);R(x,0,2,4,3,'#c84a4a');R(x,0,12,4,3,'#c84a4a');R(x,0,2,4,1,'#ff9a9a');R(x,0,12,4,1,'#ff9a9a');},
  elv:x=>{for(let j=0;j<6;j++)R(x,1,6+j,7,1,mixH('#f0d050','#a87a10',j/5));R(x,1,6,7,1,'#fff4b0');metalH(x,8,8,6,2);P(x,14,8,MTL[4]);P(x,15,9,MTL[2]);},
  scl:x=>{metalH(x,1,8,10,3);for(let i=0;i<4;i++){P(x,11+i,8-i,MTL[2]);P(x,11+i,9-i,MTL[0]);}P(x,15,4,MTL[4]);R(x,3,9,6,1,'#8a6ad8');},
  ult:x=>{for(let j=0;j<5;j++)R(x,1,7+j,10,1,mixH('#f4f6fa','#9aa6b6',j/4));R(x,1,7,10,1,'#ffffff');R(x,11,8,3,3,MTL[1]);P(x,14,8,'#8ad0ff');P(x,15,6,'#bfe8ff');P(x,14,5,'#8ad0ff');R(x,0,8,1,3,'#3a8ae8');R(x,4,9,4,1,'#3a8ae8');},
  lgt:x=>{for(let j=0;j<7;j++)R(x,1,6+j,10,1,mixH('#6a7280','#2a3038',j/6));R(x,1,6,10,1,'#9aa2b0');R(x,11,5,3,9,'#2a3a98');R(x,11,5,1,9,'#5a6ad8');R(x,14,7,2,5,'#9ab8ff');P(x,15,8,'#ffffff');R(x,3,8,2,1,'#6ad46a');},
  fil:x=>{R(x,1,6,5,5,'#f2f2f2');R(x,1,6,5,1,'#ffffff');R(x,5,6,1,5,'#b8b8b8');for(let i=0;i<9;i++){P(x,6+i,8,i%2?MTL[3]:MTL[1]);P(x,6+i,9,MTL[0]);}},
  gp:x=>{for(let i=0;i<11;i++){P(x,2+i,12-(i*.8|0),'#f07a40');P(x,2+i,13-(i*.8|0),'#a83a1a');}R(x,1,12,3,3,'#c84a2a');},
  pp:x=>{for(let i=0;i<12;i++){P(x,2+i,12-(i*.8|0),'#fffaf0');P(x,2+i,13-(i*.8|0),'#c8bfa0');}},
  tamp:x=>{R(x,2,5,12,8,'#e4eaf0');R(x,2,5,12,7,'#f8fbff');R(x,2,5,12,1,'#ffffff');for(let i=0;i<5;i++)R(x,3+i*2,7,1,4,'#dfe6ee');R(x,2,12,12,1,'#b8c4d0');},
  per:x=>{for(let j=0;j<4;j++)R(x,1,7+j,8,1,mixH('#6ab88a','#2a6a44',j/3));R(x,1,7,8,1,'#a8f0c0');metalH(x,9,8,5,2);R(x,14,7,1,4,MTL[3]);},
  scal:x=>{for(let j=0;j<4;j++)R(x,1,7+j,8,1,mixH('#7a8a9a','#3a4a5a',j/3));R(x,1,7,8,1,'#aabacc');R(x,9,7,3,4,MTL[2]);for(let i=0;i<4;i++)P(x,12+i,8+(i>>1),i<2?MTL[4]:MTL[3]);},
  ndl:x=>{metalLine(x,2,4,9,10);metalLine(x,2,12,9,6);disc(x,3,4,2,MTL[2]);disc(x,3,12,2,MTL[2]);P(x,2,3,MTL[4]);line(x,10,8,15,4,1,'#3a6ae8');P(x,15,3,'#8ab0ff');},
  irr:x=>{for(let j=0;j<5;j++)R(x,1,6+j,9,1,mixH('#f6f8fc','#a8b4c4',j/4));R(x,2,7,6,2,'#9ad6ff');R(x,2,7,6,1,'#e0f6ff');R(x,10,8,4,1,MTL[2]);P(x,14,7,'#8ad0ff');P(x,15,5,'#bfe8ff');R(x,0,5,1,7,'#5a6a7a');},
  art:x=>{R(x,2,3,12,10,'#2a54c8');R(x,2,3,12,1,'#7a9af8');R(x,2,3,1,10,'#5a7ae8');R(x,13,3,1,10,'#1a3488');R(x,2,12,12,1,'#1a3488');R(x,5,6,6,4,'#1a3a9a');P(x,6,7,'#4a6ad8');},
  mir:x=>{for(let i=0;i<9;i++){P(x,2+i,14-i,MTL[1]);P(x,3+i,14-i,MTL[3]);}disc(x,11,4,4,MTL[0]);disc(x,11,4,3,'#bfe8ff');disc(x,10,3,1,'#ffffff');},
  model:x=>{x.drawImage(frontToothImg(10,13,{}),3,1);},
  foto:x=>{R(x,1,2,14,12,'#0e2238');R(x,2,3,12,10,'#1a3a5a');for(let i=0;i<3;i++)R(x,4+i*3,5,2,6,'#cfeaff');R(x,4,5,8,1,'#ffffff');R(x,2,3,12,1,'#3a6a9a');},
  brosur:x=>{R(x,3,1,10,14,'#e8e4da');R(x,3,1,9,13,'#ffffff');R(x,4,3,7,2,'#3aa89a');for(let i=0;i<3;i++)R(x,4,7+i*2,6,1,'#9aa6b0');},
  pill:x=>{R(x,4,1,8,3,'#3a3a46');R(x,4,1,8,1,'#7a7a8a');glass(x,3,4,10,10,'#f2f4f6',1);R(x,7,6,2,6,'#d23a3a');R(x,5,8,6,2,'#d23a3a');},
  caps:x=>{R(x,2,6,6,5,'#f6e27a');R(x,8,6,6,5,'#c84a2a');R(x,2,6,12,1,'#ffffff');R(x,2,10,12,1,'#8a2a14');R(x,3,7,3,1,'#fff8c0');},
  card:x=>{R(x,3,2,10,12,'#fbfbf6');R(x,3,2,10,1,'#ffffff');R(x,12,2,1,12,'#c8c8c0');for(let i=0;i<4;i++)R(x,5,5+i*2,6,1,'#8a96a2');},
  bag:x=>{R(x,3,5,10,9,'#d8a868');R(x,3,5,10,1,'#f8d8a0');R(x,12,5,1,9,'#9a6a30');R(x,5,2,1,4,'#7a4a20');R(x,10,2,1,4,'#7a4a20');R(x,5,2,6,1,'#7a4a20');R(x,6,8,4,3,'#ffffff');R(x,7,8,2,3,'#d23a3a');R(x,6,9,4,1,'#d23a3a');},
  dry:x=>{metalH(x,2,7,10,3);R(x,12,8,3,1,MTL[3]);P(x,15,7,'#ffffff');P(x,15,9,'#ffffff');R(x,0,6,2,5,'#4a5a6a');},
  dam:x=>{R(x,2,3,12,10,'#3a9a5a');R(x,2,3,12,1,'#8ae0a0');R(x,13,3,1,10,'#1e5a34');R(x,6,6,4,4,'#1e5a34');R(x,6,6,4,1,'#0e3a20');},
  apex:x=>{R(x,2,3,12,10,'#2a3440');R(x,2,3,12,1,'#5a6a7a');R(x,4,5,8,4,'#0a1a10');R(x,4,5,3,4,'#6ad46a');R(x,5,11,2,1,'#e6383e');R(x,9,11,2,1,'#ffd86a');},
  resin:x=>{R(x,6,1,4,14,'#efe6cc');R(x,6,1,1,14,'#ffffff');R(x,9,1,1,14,'#b8ae94');R(x,5,13,6,2,'#4a5a6a');R(x,5,1,6,2,'#3a8a9a');R(x,5,1,6,1,'#7ad0e0');},
};
const BT=(liq,lvl,cap)=>x=>glass(x,4,4,8,10,liq,lvl,cap);
Object.assign(TLD,{cond:BT('#bc8af0',.6,'#4a3a6a'),etch:BT('#4a8ae8',.7,'#2a3a6a'),bond:BT('#f0c840',.5,'#5a4a2a'),liner:BT('#f2dc84',.65,'#6a5a2a'),gic:BT('#f2efe4',.8,'#5a5a64'),
  varn:BT('#e8964a',.55,'#5a3a2a'),naocl:BT('#d8f0a0',.7,'#3a6a3a'),caoh:BT('#f6f6f0',.6,'#3a4a6a'),zoe:BT('#e8c58a',.6,'#6a4a2a'),topi:BT('#ff9ab0',.6,'#8a2a4a')});

/* ================= GIGI POTONGAN MELINTANG (anatomis) =================
   o: roots 2|1 · spread · caries 'deep'|'shallow' · cav 'deep'|'shallow' · fill 0..1 · liner · access · canals · apex · sepLine · crown:false · flap · nerve · pulpLine */
const _tx={};
function toothX(o){o=o||{};const key=JSON.stringify(o);if(_tx[key])return _tx[key];
  const W=170,H=o.nerve?178:166,cx=85;const[c,x]=cv(W,H);const img=x.createImageData(W,H),A=img.data;
  const put=(i,j,cc)=>{const k=(j*W+i)*4;A[k]=cc[0];A[k+1]=cc[1];A[k+2]=cc[2];A[k+3]=255;};
  const two=(o.roots||2)===2,sp=o.spread?18:5,stump=o.crown===false;
  const top=d=>{const a=Math.abs(d);return a<=18?12+(18-a)*.3+5*Math.exp(-d*d/7):12+(a-18)*(a-18)/9;};
  const hw=j=>j<32?40-(32-j)*(32-j)/42:Math.max(27,40-13*Math.pow((j-32)/40,1.35));
  const inCrown=(i,j)=>!stump&&j>=top(i-cx)&&j<=74&&Math.abs(i-cx)<=hw(j);
  const trunk=(i,j)=>j>72&&j<=100&&Math.abs(i-cx)<=27-(j-72)*.1&&!(stump&&j<100+3*hash(i>>1,3));
  const rc=(s,t)=>cx+s*(two?(13+t*sp):0)+t*t*4,rw=t=>{const base=two?11-7.5*t:15-11*t;return t<.88?base:base*Math.sqrt(Math.max(0,1-((t-.88)/.12)**2));};
  const inRoot=(i,j)=>{if(j<94||j>152)return false;const t=(j-94)/58;return Math.abs(i-rc(-1,t))<=rw(t)||(two&&Math.abs(i-rc(1,t))<=rw(t));};
  const inT=(i,j)=>inCrown(i,j)||trunk(i,j)||(inRoot(i,j)&&!(stump&&j<102));
  const et=j=>j<36?6.5:Math.max(0,6.5*(74-j)/38);
  const crownOrBelow=(i,j)=>j>74?Math.abs(i-cx)<=hw(74):inCrown(i,j);
  const isEnamel=(i,j)=>{if(!inCrown(i,j)||j>=74)return false;const e=et(j);if(e<.8)return false;return !crownOrBelow(i-e,j)||!crownOrBelow(i+e,j)||!crownOrBelow(i,j-e)||!crownOrBelow(i-e*.7,j-e*.7)||!crownOrBelow(i+e*.7,j-e*.7);};
  const pulpCh=(i,j)=>{const d=i-cx,a=Math.abs(d);if(stump)return false;if(((a-15)/4.5)**2+((j-41)/9)**2<1)return true;
    if(j>=43&&j<=92){const pw=16-Math.max(0,j-74)*.3;return a<pw&&j<92-(a/16)**2*8;}return false;};
  const canal=(i,j)=>{if(j<84||j>150)return false;const t=Math.max(0,(j-94)/58);const cw=2.2*(1-t)+.7;return Math.abs(i-rc(-1,t))<=cw||(two&&Math.abs(i-rc(1,t))<=cw);};
  const isPulp=(i,j)=>pulpCh(i,j)||canal(i,j);
  const access=(i,j)=>o.access&&j<48&&Math.abs(i-cx+1)<(j<30?10:11);
  const cd=o.caries==='deep',cr=(i,j)=>{if(!o.caries)return 0;const d=i-cx+2,n=hash(i>>1,j>>1)*.35;const tp=top(i-cx);
    if(j<tp)return 0;if(j<22){const w=2+(j-tp)*.45;return Math.abs(d)<w+n*2?1:0;}const ex=d/(cd?17:11),ey=(j-(cd?26:23))/(cd?15:8);const q=ex*ex+ey*ey;return q<.55-n*.3?2:q<1-n*.4?1:q<1.35?.5:0;};
  const cavFloor=o.cav==='deep'?40:32;const inCav=(i,j)=>{if(!o.cav)return false;const d=i-cx+2;return j>=top(i-cx)-1&&j<=cavFloor-((d/13)**4)*3&&Math.abs(d)<=13+(j-14)*.06;};
  const fillTop=cavFloor-(o.fill||0)*(cavFloor-12);
  const gumTop=i=>{const e=Math.max(0,Math.abs(i-cx)-30);return 63+14*(1-Math.exp(-e/14))-1.6*Math.exp(-(((e-2)/2.5)**2));};
  const boneTop=i=>{const e=Math.max(0,Math.abs(i-cx)-27);return 84+5*(1-Math.exp(-e/18));};
  const tissue=(i,j)=>j<104||((i-cx)/84)**2+((j-104)/(H-102))**2<1.02;
  const near=(i,j,r,f)=>{for(let a=-r;a<=r;a++)for(let b=-r;b<=r;b++)if(f(i+a,j+b))return true;return false;};
  const flapGap=i=>o.flap&&Math.abs(i-cx)<44;
  const marrow=(i,j)=>{let best=9;const gx=Math.floor(i/6),gy=Math.floor(j/6);for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++){if(hash(gx+a+11,gy+b+5)<.35)continue;const px=(gx+a)*6+hash(gx+a,gy+b)*6,py=(gy+b)*6+hash(gy+b+7,gx+a+3)*6;const dd=Math.hypot(i-px,j-py);if(dd<best)best=dd;}return best;};
  const C_=rgb;
  const EN=C_('#f6f1e4'),ENs=C_('#d6ccb6'),ENhi=C_('#ffffff'),DE=C_('#efd7a0'),DEs=C_('#d4b47a'),TUB=C_('#d9bc84'),PU=C_('#ee98a4'),PUd=C_('#c94e66'),PUh=C_('#f8c4cc'),CEM=C_('#cfae74');
  for(let j=0;j<H;j++)for(let i=0;i<W;i++){const d=i-cx;let col=null;
    if(inT(i,j)){
      if(isEnamel(i,j)){col=mixA(EN,ENs,Math.max(0,d/38)*.85);if(j<top(d)+1.5)col=mixA(col,[226,236,240],.6);
        if(((d+25)/4)**2+((j-34)/16)**2<1&&hash(i,j)<.8)col=ENhi;else if(((d+22)/7)**2+((j-30)/20)**2<1)col=mixA(col,ENhi,.45);
        if(!near(i,j,1,(a,b)=>isEnamel(a,b)||!inT(a,b)))col=mixA(col,DEs,.35);}
      else{col=mixA(DE,DEs,Math.max(0,(d+6)/40));
        const r=Math.hypot(d,j-60),ang=Math.atan2(j-60,d);const tb=j<94?((ang*14+Math.sin(r*.16)*.6)%1+1)%1:(((j*.33)+(d*.06))%1+1)%1;
        if(tb<.16&&hash(i,j)<.85)col=mixA(col,TUB,.8);if(inRoot(i,j)&&!near(i,j,1,(a,b)=>inT(a,b)&&!(stump&&b<102)))col=CEM;}
      if(isPulp(i,j)){const pc=pulpCh(i,j);col=mixA(PU,PUd,pc?Math.min(1,Math.max(0,(j-50)/60)):.45);
        const cl=pc?Math.abs(d+Math.sin(j*.12)*2.5):Math.abs(i-rc(i<cx?-1:1,Math.max(0,(j-94)/58)));if(cl<.7)col=mixA(col,PUd,.6);if(pc&&j<50&&d<-4)col=mixA(col,PUh,.5);
        if(o.canals){col=pc?C_('#2e1812'):C_('#22100c');if(pc&&!near(i,j,1,(a,b)=>pulpCh(a,b)))col=C_('#5a2a1e');}}
      const k=cr(i,j);if(k){col=k===2?(hash(i,j)<.5?C_('#2a160c'):C_('#3c2212')):k===1?(hash(i,j)<.35?C_('#9a6a3a'):C_('#5e3418')):mixA(col,C_('#c89a5a'),.45);}
      if(inCav(i,j)){col=o.fill&&j>=fillTop?(hash(i,j)<.18?C_('#dcd4c0'):C_('#efe9d8')):mixA(C_('#2a1812'),C_('#4a2e22'),Math.max(0,(j-14)/30));
        if(o.fill&&j>=fillTop&&j<fillTop+1.5)col=C_('#ffffff');if(o.liner&&j>cavFloor-4&&!o.fill)col=hash(i,j)<.25?C_('#e8c860'):C_('#f4de88');}
      else if(o.cav&&inCav(i-1,j)&&!o.fill)col=mixA(col,C_('#7a5a3a'),.4);
      if(access(i,j))col=pulpCh(i,j)||o.canals?C_('#2e1812'):mixA(C_('#2a1812'),C_('#4a2e22'),j/48);
    }else if(tissue(i,j)){
      const gt=gumTop(i),bt=boneTop(i);
      if(j>=bt){const m=marrow(i,j);col=m<1.5?C_('#dcc294'):m<2.2?C_('#ccac7a'):(hash(i,j)<.12?C_('#e2cea6'):C_('#eedfbe'));if(j<bt+2.2)col=C_('#f6ead0');
        if(near(i,j,1,(a,b)=>inRoot(a,b)||trunk(a,b)))col=C_('#b47a5e');
        if(flapGap(i)&&j<bt+1)col=C_('#f8ecd2');}
      else if(j>=gt&&!flapGap(i)){const v=j-gt;col=mixA(C_('#ee93a0'),C_('#cf6276'),Math.min(1,v/16));if(v<1.2)col=C_('#fbc0c8');else if(v<2.4)col=C_('#f6a8b4');
        if(near(i,j,3,(a,b)=>inT(a,b)))col=mixA(col,C_('#a8405a'),.45);if(hash(i,j)<.06)col=mixA(col,[255,255,255],.25);}
    }
    if(col)put(i,j,col);}
  x.putImageData(img,0,0);
  if(o.apex){for(let i=8;i<W-8;i+=4)R(x,i,151,2,1,'#ffd86a');}
  if(o.sepLine){for(let j=70;j<102;j+=3)R(x,cx-1,j,2,2,'#7af07a');}
  if(o.nerve){for(let i=4;i<W-4;i++){const y=Math.round(166+Math.sin(i/24)*2);R(x,i,y-2,1,5,'#8a6a2a');R(x,i,y-1,1,3,'#f0c040');if((i>>2)%2)P(x,i,y,'#fff0a0');}}
  if(o.pulpLine){for(let j=30;j<90;j++)for(let i=cx-24;i<=cx+24;i++){if(isPulp(i,j)||!inT(i,j))continue;if(near(i,j,3,isPulp)&&!near(i,j,2,isPulp)&&(i+j)%3)P(x,i,j,'#ff4a5a');}}
  return _tx[key]=softOutline(c,.45);}

/* ================= GIGI POTONGAN v2 — proporsi realistis (revisi user 2026-11-12) =================
   Sama dengan toothX (ukuran 170×166, bentuk luar mahkota/akar/gusi/tulang tetap) tapi: email tebal di oklusal (±10 px, menipis ke CEJ),
   dentin tebal, kamar pulpa kecil & rendah (tanduk pulpa ±44, atap ±53 = setengah tinggi mahkota), pembuluh & saraf di pulpa.
   s = 2 → digambar asli 2× (HD, untuk zoom), geometri sama. Opsi o sama dengan toothX. */
const _tr={},_trDT=[];
function toothR(o,s){o=o||{};s=s||1;const key=s+'|'+JSON.stringify(o);if(_tr[key])return _tr[key];
  const W0=170,H0=o.nerve?178:166,W=W0*s,H=H0*s,cx=85;const[c,x]=cv(W,H);const img=x.createImageData(W,H),A=img.data;
  const put=(i,j,cc)=>{const k=(j*W+i)*4;A[k]=cc[0];A[k+1]=cc[1];A[k+2]=cc[2];A[k+3]=255;};
  const two=(o.roots||2)===2,sp=o.spread?18:5,stump=o.crown===false;
  const top=d=>{const a=Math.abs(d);return a<=18?12+(18-a)*.3+5*Math.exp(-d*d/7):12+(a-18)*(a-18)/9;};
  const hw=j=>j<32?40-(32-j)*(32-j)/42:Math.max(27,40-13*Math.pow((j-32)/40,1.35));
  const inCrown=(i,j)=>!stump&&j>=top(i-cx)&&j<=74&&Math.abs(i-cx)<=hw(j);
  const trunk=(i,j)=>j>72&&j<=100&&Math.abs(i-cx)<=27-(j-72)*.1&&!(stump&&j<100+3*hash(i>>1,3));
  const rc=(sg,t)=>cx+sg*(two?(13+t*sp):0)+t*t*4,rw=t=>{const base=two?11-7.5*t:15-11*t;return t<.88?base:base*Math.sqrt(Math.max(0,1-((t-.88)/.12)**2));};
  const inRoot=(i,j)=>{if(j<94||j>152)return false;const t=(j-94)/58;return Math.abs(i-rc(-1,t))<=rw(t)||(two&&Math.abs(i-rc(1,t))<=rw(t));};
  const inT=(i,j)=>inCrown(i,j)||trunk(i,j)||(inRoot(i,j)&&!(stump&&j<102));
  // email: ±10,5 di oklusal, menipis ke 0 di CEJ (j 74)
  const et=j=>j<36?10.5:Math.max(0,10.5*(74-j)/38);
  const crownOrBelow=(i,j)=>j>74?Math.abs(i-cx)<=hw(74):inCrown(i,j);
  // jarak ke permukaan mahkota (chamfer 2 lintasan di kisi dasar, dibaca bilinear) → batas email-dentin halus mengikuti lengkung mahkota
  const DT=_trDT[stump?1:0]||(_trDT[stump?1:0]=(()=>{const w=W0+2,h=H0+2,D=new Float32Array(w*h);for(let j=0;j<h;j++)for(let i=0;i<w;i++)D[j*w+i]=crownOrBelow(i-1,j-1)?1e4:0;
    const f=(i,j,a,b,c)=>{const q=(j+b)*w+i+a;if(i+a>=0&&i+a<w&&j+b>=0&&j+b<h&&D[q]+c<D[j*w+i])D[j*w+i]=D[q]+c;};
    for(let j=0;j<h;j++)for(let i=0;i<w;i++){f(i,j,-1,0,1);f(i,j,0,-1,1);f(i,j,-1,-1,1.414);f(i,j,1,-1,1.414);}
    for(let j=h-1;j>=0;j--)for(let i=w-1;i>=0;i--){f(i,j,1,0,1);f(i,j,0,1,1);f(i,j,1,1,1.414);f(i,j,-1,1,1.414);}
    return (i,j)=>{const x0=Math.floor(i)+1,y0=Math.floor(j)+1,fx=i+1-x0,fy=j+1-y0,g=(a,b)=>D[Math.min(h-1,Math.max(0,b))*w+Math.min(w-1,Math.max(0,a))];
      return g(x0,y0)*(1-fx)*(1-fy)+g(x0+1,y0)*fx*(1-fy)+g(x0,y0+1)*(1-fx)*fy+g(x0+1,y0+1)*fx*fy;};})());
  const isEnamel=(i,j)=>{if(!inCrown(i,j)||j>=74)return false;const e=et(j);return e>=.8&&DT(i,j)<e;};
  // kamar pulpa: 2 tanduk (puncak ±44) + badan (atap ±53, dasar ±90), lebar ±15
  // atap kamar berbentuk M (dua tanduk ke arah tonjol), dinding membulat, dasar di bawah leher gigi
  const roofY=a=>54-9.5*Math.exp(-(((a-11.5)/4.6)**2))+(a>14?((a-14)/2.2)**2:0);
  const pulpCh=(i,j)=>{const a=Math.abs(i-cx);if(stump||j>92)return false;const pw=a<16&&j>=roofY(a);if(!pw)return false;if(a>=15.5)return false;return !(j>67+(a/9.5)**2*9);}; // dasar = kubah dentin furkasi, pulpa turun lewat sisi ke saluran
  const canal=(i,j)=>{if(j<84||j>150)return false;const t=Math.max(0,(j-94)/58);const cw=2.2*(1-t)+.7;return Math.abs(i-rc(-1,t))<=cw||(two&&Math.abs(i-rc(1,t))<=cw);};
  const isPulp=(i,j)=>pulpCh(i,j)||canal(i,j);
  // akses endo: corong dari oklusal sampai membuang atap & tanduk pulpa
  // akses endo: corong dari fisura, melebar sampai menutup tanduk pulpa, berhenti tepat di atap kamar (kamar terbuka, pulpa kelihatan)
  const access=(i,j)=>{if(!o.access)return false;const d=Math.abs(i-cx+.5),w=Math.min(15.4,7.5+Math.max(0,j-14)*.24);return d<w&&j<roofY(d)+.6&&j>=top(i-cx)-1;};
  const cd=o.caries==='deep',cr=(i,j)=>{if(!o.caries)return 0;const d=i-cx+2,n=hash((i*s)>>1,(j*s)>>1)*.35;const tp=top(i-cx);
    if(j<tp)return 0;
    if(o.caries==='prox'){const L=cx-hw(36),ex=(i-L-6)/12,ey=(j-38)/11;const q=ex*ex+ey*ey;return q<.45-n*.3?2:q<.85-n*.4?1:q<1.2?.5:0;} /* [2e-rev] karies proksimal: di titik kontak sisi mesial, bukan fisura oklusal */
    const fis=Math.abs(d)<2+(j-tp)*.45+n*2&&j<24?1:0;
    const ex=d/(cd?17:11),ey=(j-(cd?31:25))/(cd?14:9);const q=ex*ex+ey*ey,el=q<.55-n*.3?2:q<1-n*.4?1:q<1.35?.5:0;return Math.max(fis,el);};
  const cavFloor=o.cav==='prox'?50:o.cav==='deep'?44:34;const inCav=(i,j)=>{if(!o.cav)return false;const d=i-cx+2;
    if(o.cav==='prox'){if(j<top(i-cx)-1)return false;const L=cx-hw(Math.min(j,50));return i>=L-2&&i<=L+19&&j<=50-Math.pow(Math.max(0,i-L)/19,4)*4;} /* [2e-rev] prep klas II: kotak proksimal terbuka ke sisi gigi */
    return j>=top(i-cx)-1&&Math.abs(d)<=12.5&&j<=cavFloor-Math.pow(Math.abs(d)/12.5,2.2)*9;}; // kavitas berbentuk U
  const fillTop=cavFloor-(o.fill||0)*(cavFloor-12);
  const gumTop=i=>{const e=Math.max(0,Math.abs(i-cx)-30);return 63+14*(1-Math.exp(-e/14))-1.6*Math.exp(-(((e-2)/2.5)**2));};
  const boneTop=i=>{const e=Math.max(0,Math.abs(i-cx)-27);return 84+5*(1-Math.exp(-e/18));};
  const tissue=(i,j)=>j<104||((i-cx)/84)**2+((j-104)/(H0-102))**2<1.02;
  const st=1/s,near=(i,j,r,f)=>{for(let a=-r;a<=r+1e-6;a+=st)for(let b=-r;b<=r+1e-6;b+=st)if(f(i+a,j+b))return true;return false;};
  const flapGap=i=>o.flap&&Math.abs(i-cx)<44;
  const marrow=(i,j)=>{let best=9;const gx=Math.floor(i/6),gy=Math.floor(j/6);for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++){if(hash(gx+a+11,gy+b+5)<.35)continue;const px=(gx+a)*6+hash(gx+a,gy+b)*6,py=(gy+b)*6+hash(gy+b+7,gx+a+3)*6;const dd=Math.hypot(i-px,j-py);if(dd<best)best=dd;}return best;};
  const C_=rgb;
  const EN=C_('#f8f4ea'),ENs=C_('#d8d0be'),ENhi=C_('#ffffff'),ENb=C_('#e4e8ee'),DE=C_('#efd2a0'),DEs=C_('#d2ac78'),TUB=C_('#dcb886'),DEJ=C_('#c89e6a'),
    PU=C_('#e2566a'),PUd=C_('#b02a44'),PUh=C_('#f48a98'),VEIN=C_('#4a3aa8'),NRV=C_('#f2c040'),PDL=C_('#c88a8a'),CEM=C_('#cfae74');
  for(let J=0;J<H;J++)for(let I=0;I<W;I++){const i=(I+.5)/s-.5,j=(J+.5)/s-.5,d=i-cx;let col=null;const hp=hash(I,J);
    if(inT(i,j)){
      if(isEnamel(i,j)){
        // email: putih kebiruan, prisma radial halus, kilap di sisi kiri
        col=mixA(EN,ENs,Math.max(0,d/38)*.8);if(j<top(d)+1.2)col=mixA(col,ENb,.6);
        const r=Math.hypot(d,j-60),ang=Math.atan2(j-60,d);if((((ang*40)%1)+1)%1<.12&&hp<.7)col=mixA(col,ENs,.35);
        if(((d+25)/4)**2+((j-30)/14)**2<1&&hp<.8)col=ENhi;else if(((d+22)/7)**2+((j-28)/18)**2<1)col=mixA(col,ENhi,.45);
        if(!near(i,j,1,(a,b)=>isEnamel(a,b)||!inT(a,b)))col=mixA(col,DEJ,.45);}
      else{col=mixA(DE,DEs,Math.max(0,(d+6)/40));
        const r=Math.hypot(d,j-66),ang=Math.atan2(j-66,d);const tb=j<94?((ang*16+Math.sin(r*.16)*.6)%1+1)%1:(((j*.33)+(d*.06))%1+1)%1;
        if(tb<.14&&hp<.85)col=mixA(col,TUB,.7);
        if(near(i,j,1.2,isPulp)&&!isPulp(i,j))col=mixA(col,C_('#c69070'),.55); // predentin / dinding pulpa
        if(inRoot(i,j)&&!near(i,j,1,(a,b)=>inT(a,b)&&!(stump&&b<102)))col=CEM;}
      if(isPulp(i,j)){const pc=pulpCh(i,j);col=mixA(PU,PUd,pc?Math.min(1,Math.max(0,(j-48)/50)):.5);
        if(pc&&j<62)col=mixA(col,PUh,.35*(1-(j-44)/18));
        // pembuluh darah (biru/merah tua) & saraf (kuning) mengikuti saluran
        const lane=sg=>pc?cx+sg*Math.min(12.8,3.5+Math.max(0,j-46)*.42)+Math.sin(j*.25+sg)*1.2:rc(sg,Math.max(0,(j-94)/58));
        [-1,1].forEach(sg=>{if(!two&&sg>0&&!pc)return;const l=lane(sg),dv=i-l;if(Math.abs(dv-.9)<.45)col=VEIN;else if(Math.abs(dv+.6)<.4)col=NRV;else if(Math.abs(dv)<.35)col=PUd;});
        if(pc&&j>46&&j<70&&hash((I>>1)+3,(J>>1)+9)<.05)col=mixA(col,PUd,.7);
        if(o.canals){col=pc?C_('#2e1812'):C_('#22100c');if(pc&&!near(i,j,1,(a,b)=>pulpCh(a,b)))col=C_('#5a2a1e');}}
      const k=cr(i,j);if(k){col=k===2?(hp<.5?C_('#2a160c'):C_('#3c2212')):k===1?(hp<.35?C_('#9a6a3a'):C_('#5e3418')):mixA(col,C_('#c89a5a'),.45);}
      if(inCav(i,j)){col=o.fill&&j>=fillTop?(hp<.18?C_('#dcd4c0'):C_('#efe9d8')):mixA(C_('#2a1812'),C_('#4a2e22'),Math.max(0,(j-14)/32));
        if(o.fill&&j>=fillTop&&j<fillTop+1.5)col=C_('#ffffff');if(o.liner&&j>cavFloor-4&&!o.fill)col=hp<.25?C_('#e8c860'):C_('#f4de88');}
      else if(o.cav&&inCav(i-1,j)&&!o.fill)col=mixA(col,C_('#7a5a3a'),.4);
      if(access(i,j))col=mixA(C_('#2a1812'),C_('#4a2e22'),Math.min(1,j/56));
    }else if(tissue(i,j)){
      const gt=gumTop(i),bt=boneTop(i);
      if(j>=bt){const m=marrow(i,j);col=m<1.5?C_('#dcc294'):m<2.2?C_('#ccac7a'):(hp<.12?C_('#e2cea6'):C_('#eedfbe'));if(j<bt+2.2)col=C_('#f6ead0');
        if(near(i,j,1,(a,b)=>inRoot(a,b)||trunk(a,b)))col=PDL;
        if(flapGap(i)&&j<bt+1)col=C_('#f8ecd2');}
      else if(j>=gt&&!flapGap(i)){const v=j-gt;col=mixA(C_('#ee93a0'),C_('#cf6276'),Math.min(1,v/16));if(v<1.2)col=C_('#fbc0c8');else if(v<2.4)col=C_('#f6a8b4');
        if(near(i,j,3,(a,b)=>inT(a,b)))col=mixA(col,C_('#a8405a'),.45);if(hp<.06)col=mixA(col,[255,255,255],.25);}
    }
    if(col)put(I,J,col);}
  x.putImageData(img,0,0);
  if(o.apex){for(let i=8;i<W0-8;i+=4)R(x,i*s,151*s,2*s,s,'#ffd86a');}
  if(o.sepLine){for(let j=70;j<102;j+=3)R(x,(cx-1)*s,j*s,2*s,2*s,'#7af07a');}
  return _tr[key]=softOutline(c,.45);}

/* ================= RONTGEN PERIAPIKAL (draf 2e) =================
   toothXR(o,s): foto rontgen periapikal gigi v2 (geometri sama dengan toothR), dibuat dari kepadatan jaringan, bukan filter warna.
   Terang = radiopak (email > dentin > tulang), gelap = radiolusen (pulpa, karies, ligamen, lesi).
   o.caries: 'shallow' (dentin) · 'deep' (dekat pulpa, masih ada dentin) · 'pulp' (sampai pulpa) · 'prox' (sela gigi, tersembunyi)
   o.lesion: 'pdl' (pelebaran ruang ligamen di ujung akar) · 'abses' (radiolusen periapikal, batas difus)
   o.bone: 0–1 tulang alveolar turun (periodontitis) · o.crown:false sisa akar · o.roots:1 akar tunggal
   o.bud: benih gigi tetap di bawah gigi susu (akar gigi susu teresorpsi) */
const _xr={};
function toothXR(o,s){o=o||{};s=s||1;const key=s+'|'+JSON.stringify(o);if(_xr[key])return _xr[key];
  const W0=170,H0=196,W=W0*s,H=H0*s,cx=85;const[c,x]=cv(W,H);const img=x.createImageData(W,H),A=img.data;
  // [2e-rev 2026-11-13] o.type: 'I' insisif · 'C' kaninus · 'P' premolar · 'M' molar (bawaan). o.upper: gigi atas (film dibalik, mahkota di bawah; molar atas 3 akar).
  const T=o.type||'M',single=T!=='M',wk=single&&o.upper?(T==='I'?1.45:T==='C'?1.12:1.06):1,GS={I:{cej:80,rEnd:176,neck:12},C:{cej:84,rEnd:186,neck:14},P:{cej:76,rEnd:168,neck:14}}[T]||{cej:74,rEnd:152,neck:27};
  const two=!single&&(o.roots||2)===2,three=two&&!!o.upper,sp=5,stump=o.crown===false,bud=!!o.bud,nk=single?1:o.narrow||1,gi=i=>cx+(i-cx)/nk,cej=GS.cej;
  // profil mahkota: molar = tonjol ganda; insisif = tepi insisal datar; kaninus = ujung runcing (lereng mesial/distal); premolar = satu tonjol bukal
  const topM=d=>{const a=Math.abs(d);return a<=18?12+(18-a)*.3+5*Math.exp(-d*d/7):12+(a-18)*(a-18)/9;};
  const top=T==='I'?d=>12+Math.max(0,Math.abs(d)-16*wk)**2*.45:T==='C'?d=>8+Math.sqrt(d*d+16)*.62:T==='P'?d=>11+Math.sqrt(d*d+9)*.36+Math.max(0,Math.abs(d)-19)**2/5:topM;
  // lebar setengah gigi menurut tinggi j (mahkota → leher → akar)
  const hwM=j=>j<32?40-(32-j)*(32-j)/42:Math.max(27,40-13*Math.pow((j-32)/40,1.35));
  const hw0=T==='I'?j=>j<28?21:Math.max(12,21-9*Math.pow((j-28)/(cej-28),1.25)):T==='C'?j=>j<42?23:Math.max(14,23-9*Math.pow((j-42)/(cej-42),1.4)):T==='P'?j=>j<34?25-((34-j)/22)**2*3:Math.max(14,25-11*Math.pow((j-34)/(cej-34),1.3)):hwM,hw=j=>hw0(j)*wk; // gigi atas lebih lebar (insisif sentral atas ±1,5× insisif bawah)
  const rEnd=bud?112:GS.rEnd;
  const rwS=j=>{const t=(j-cej)/(rEnd-cej),b=GS.neck*wk*(1-.78*Math.pow(t,1.3));return t<.9?b:b*Math.sqrt(Math.max(0,1-((t-.9)/.1)**2));}; // akar tunggal mengerucut, ujung membulat
  const inCrown=(i,j)=>!stump&&j>=top(i-cx)&&j<=cej&&Math.abs(i-cx)<=hw(j);
  const trunk=(i,j)=>!single&&j>72&&j<=100&&Math.abs(i-cx)<=27-(j-72)*.1&&!(stump&&j<86+7*hash(Math.floor(i/3),3)+3*hash(Math.floor(i/2),9));
  const rc=(sg,t)=>cx+sg*(two?(13+t*(three?9:sp)):0)+t*t*(three?1:4),rw=t=>{const base=two?11-7.5*t:15-11*t;return t<.88?base:base*Math.sqrt(Math.max(0,1-((t-.88)/.12)**2));};
  const inRoot=(i,j)=>{if(bud&&j>rEnd-3+hash(i,7)*3)return false;
    if(single){if(j<=cej||j>rEnd)return false;if(stump&&j<cej+5+7*hash(Math.floor(i/3),3)+3*hash(Math.floor(i/2),9))return false;return Math.abs(i-cx)<=rwS(j);}
    if(j<94||j>rEnd)return false;const t=(j-94)/58;if(Math.abs(i-rc(-1,t))<=rw(t)||(two&&Math.abs(i-rc(1,t))<=rw(t)))return true;
    return three&&j<rEnd+4&&Math.abs(i-cx-1)<=rw(Math.min(1,(j-94)/62))*1.15;}; // molar atas: akar palatal di tengah, bertumpuk dengan akar bukal
  const inT=(i,j)=>inCrown(i,j)||trunk(i,j)||inRoot(i,j);
  const eMax=single?(T==='I'?7.5:8.5):10.5,eTop=single?30:36,et=j=>j<eTop?eMax:Math.max(0,eMax*(cej-j)/(cej-eTop));
  const isEnamel=(i,j)=>{if(!inCrown(i,j)||j>=cej)return false;const e=et(j),d=i-cx;return j<top(d)+e||Math.abs(d)>hw(j)-e*.85;};
  // kamar pulpa: molar = kotak lebar 2 tanduk; insisif/kaninus = satu tanduk runcing ke arah insisal; premolar = 2 tanduk sempit
  const pTop={I:36,C:32,P:38}[T];
  const roofY=single?(T==='P'?a=>pTop+a*a*.9:a=>pTop+a*a*1.6/wk):a=>54-9.5*Math.exp(-(((a-11.5)/4.6)**2))+(a>14?((a-14)/2.2)**2:0);
  const pulpCh=single?(i,j)=>{const a=Math.abs(i-cx);if(stump||j>cej+8)return false;const pw=T==='P'?Math.min(6.5,1.5+(j-pTop)*.3):Math.min((T==='C'?6:5)*wk,1+(j-pTop)*.16*wk);return j>=roofY(a)&&a<pw;}
    :(i,j)=>{const a=Math.abs(i-cx);if(stump||j>92)return false;if(!(a<16&&j>=roofY(a))||a>=15.5)return false;return !(j>67+(a/9.5)**2*9);};
  const canal=(i,j)=>{if(single){if(j<=cej+4||j>rEnd-2)return false;const t=(j-cej)/(rEnd-cej),cw=(T==='I'?3.6:4)*wk*(1-t)+.7;return Math.abs(i-cx)<=cw;}
    if(j<84||j>rEnd-2)return false;const t=Math.max(0,(j-94)/58);const cw=2.2*(1-t)+.7;return Math.abs(i-rc(-1,t))<=cw||(two&&Math.abs(i-rc(1,t))<=cw)||(three&&j<rEnd+2&&Math.abs(i-cx-1)<=cw);};
  const isPulp=(i,j)=>pulpCh(i,j)||canal(i,j);
  const st=1/s,near=(i,j,r,f)=>{for(let a=-r;a<=r+1e-6;a+=st)for(let b=-r;b<=r+1e-6;b+=st)if(f(i+a,j+b))return true;return false;};
  const nz=(i,j,k)=>hash(Math.floor(i/k)+31,Math.floor(j/k)+17);
  // karies: 0..1 (1 = lusen penuh), tepi difus
  const car=(i,j)=>{if(!o.caries||!inCrown(i,j))return 0;const d=i-cx+2,n=nz(i,j,2)*.3,tp=top(i-cx);
    if(o.caries==='prox'){const side=cx-hw(j);const ex=(i-side)/12,ey=(j-40)/12;const q=ex*ex+ey*ey-n;return q<.5?1:q<1?(1-q)*2:0;}
    const deep=o.caries==='deep',pulp=o.caries==='pulp',off=top(0)-topM(0),cyc=(pulp?36:deep?31:25)+off,ry=pulp?20:deep?14:9,rx=(pulp?16:deep?16:11)*(single?.7:1); // gigi tunggal: lesi lebih sempit, diukur dari puncak tonjol
    const ex=d/rx,ey=(j-cyc)/ry;let q=ex*ex+ey*ey-n;
    if(pulp&&Math.abs(d+4)<5+n*4&&j>tp&&j<roofY(Math.abs(i-cx))+2)q=Math.min(q,.3); // jalur lusen menembus atap pulpa
    if(j<tp+3&&Math.abs(d)<3+n*3)q=Math.min(q,.4);
    return q<.55?1:q<1?(1-q)/.45:0;};
  // ujung akar (titik pusat lesi)
  const ax=sg=>single?cx:cx+(rc(sg,(rEnd-94)/58)-cx)*nk,apices=two?[[ax(-1),rEnd],[ax(1),rEnd]]:[[ax(-1),rEnd]];
  const apexD=(i,j)=>Math.min(...apices.map(([a,b])=>Math.hypot(i-a,j-b)));
  const absC=two?[(apices[0][0]+apices[1][0])/2,rEnd-8]:[apices[0][0],rEnd-3];
  const lesion=(i,j)=>{if(o.lesion==='pdl'){const dd=apexD(i,j);return dd<4.2?1:dd<5.5?(5.5-dd)/1.3:0;}
    if(o.lesion==='abses'){const ang=Math.atan2(j-absC[1],i-absC[0]),r=26+3*Math.sin(ang*3+1.3)+2*Math.sin(ang*5+.4)+4*(nz(i,j,3)-.5);const dd=Math.hypot((i-absC[0])/1.15,j-absC[1]);
      return dd<r*.45?1:dd<r*1.25?Math.pow(1-(dd-r*.45)/(r*.8),1.4):0;} // pusat lusen, memudar perlahan ke tulang (batas difus, tanpa garis sklerotik)
    return 0;};
  const nW=GS.neck*nk,boneTop0=i=>{const e=Math.max(0,Math.abs(i-cx)-nW);return cej+10+5*(1-Math.exp(-e/18));}; // puncak tulang ±1,5 mm di bawah leher gigi (CEJ)
  const loss=(o.bone||0)*44,boneTop=i=>boneTop0(i)+loss*(1-Math.min(1,Math.max(0,Math.abs(i-cx)-30)/70)*.35)+(o.bone?3*(nz(i,0,4)-.5):0);
  const rec=loss*(o.bone>.5?.85:.35),gumTop=i=>{const e=Math.max(0,Math.abs(i-cx)-nW-3);return cej-11+14*(1-Math.exp(-e/14))+rec+(o.bone?2*(nz(i,1,5)-.5):0);}; // resesi gusi mengikuti tulang
  const marrow=(i,j)=>{let best=9;const gx=Math.floor(i/6),gy=Math.floor(j/6);for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++){if(hash(gx+a+11,gy+b+5)<.35)continue;const px=(gx+a)*6+hash(gx+a,gy+b)*6,py=(gy+b)*6+hash(gy+b+7,gx+a+3)*6;const dd=Math.hypot(i-px,j-py);if(dd<best)best=dd;}return best;};
  // benih gigi tetap: mahkota kecil berbentuk topi di dalam kripta lusen
  const bx=cx+10,by=78,inBud=(i,j)=>{if(!bud)return 0;const d=i-bx,a=Math.abs(d);
    if(j<by+30){if(a>12.5)return 0;const t=by+(a/12.5)**2*11;if(j<t)return 0;if(j<t+3.4||a>12.5-3.2*(1-(j-by)/40))return 2;return a<4.2&&j>by+10?3:1;} // mahkota: email + dentin + pulpa
    if(j>by+64)return 0;const tt=(j-by-30)/34,w=11.5-2*tt,pw=3.5+5.5*tt*tt;if(a>w)return 0;return a<pw?3:1;}; // akar belum jadi, saluran melebar ke apeks terbuka
  const crypt=(i,j)=>bud&&j>by+46&&((i-bx)/14)**2+((j-by-62)/9)**2<1; // papila/folikel di bawah apeks terbuka
  for(let J=0;J<H;J++)for(let I=0;I<W;I++){const i=(I+.5)/s-.5,j=(J+.5)/s-.5;let v;const hp=hash(I,J),g=gi(i);
    if(inT(g,j)){
      v=isEnamel(g,j)?246:182-Math.max(0,j-96)*.18;
      if(!isEnamel(g,j)&&near(g,j,1.2,(a,b)=>!inT(a,b)))v=Math.min(v+8,236); // tepi dentin sedikit lebih padat
      if(isPulp(g,j))v=pulpCh(g,j)?84:96;
      const k=car(g,j);if(k)v=v+(64-v)*k*.92;
      if(stump&&j<96&&!near(g,j,2.5,(a,b)=>!inT(a,b+3)))v=v+(80-v)*.5; // tepi atas sisa akar rapuh/berlubang
    }else{
      const bt=boneTop(i);
      if(j>=bt){
        const m=marrow(i,j);v=m<1.6?104:m<2.3?122:140;if(j<bt+2)v=158; // puncak tulang kortikal tipis
        if(near(g,j,1,(a,b)=>inRoot(a,b)||trunk(a,b)))v=78;else if(near(g,j,2,(a,b)=>inRoot(a,b)||trunk(a,b)))v=176; // ruang ligamen gelap + lamina dura terang
        const L=lesion(i,j);if(L)v=v+(70-v)*L*(.9+.1*hp);
        if(crypt(i,j))v=74;
      }else if(j>=gumTop(i))v=52; // jaringan lunak
      else v=30; // udara
    }
    const b=inBud(i,j);if(b){const bv=b===2?236:b===1?184:96;v=inT(g,j)&&b!==3?Math.min(252,Math.max(v,bv)+34):b===3?Math.min(v,bv+20):bv;} // tumpang tindih dengan akar gigi susu = lebih opak
    v=Math.max(0,Math.min(255,v+(hp-.5)*10));
    const k=(J*W+I)*4;A[k]=v*.86|0;A[k+1]=v*.95|0;A[k+2]=Math.min(255,v*1.02+6)|0;A[k+3]=255;}
  x.putImageData(img,0,0);
  if(o.upper){const[c2,x2]=cv(W,H);x2.translate(0,H);x2.scale(1,-1);x2.drawImage(c,0,0);return _xr[key]=c2;} // gigi atas: mahkota di bawah, akar ke atas
  return _xr[key]=c;}
/** Bingkai film periapikal: sudut membulat, titik timbul (penanda orientasi), sedikit vinyet. Ukuran keluaran w×h, mengambil potongan gambar src (sx,sy,sw,sh). */
function xrFilm(im,w,h,crop){const[c,x]=cv(w,h);const[sx,sy,sw,sh]=crop||[0,0,im.width,im.height];
  x.save();const q=Math.round(Math.min(w,h)*.08);x.beginPath();x.moveTo(q,0);x.arcTo(w,0,w,h,q);x.arcTo(w,h,0,h,q);x.arcTo(0,h,0,0,q);x.arcTo(0,0,w,0,q);x.closePath();x.clip();x.imageSmoothingEnabled=false;x.drawImage(im,sx,sy,sw,sh,0,0,w,h);
  const g=x.createRadialGradient(w/2,h/2,Math.min(w,h)*.3,w/2,h/2,Math.max(w,h)*.7);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(4,10,16,.55)');x.fillStyle=g;x.fillRect(0,0,w,h);
  const r=Math.max(2,Math.round(w*.025));x.fillStyle='rgba(230,240,248,.7)';x.beginPath();x.arc(w-r*3,r*3,r,0,7);x.fill();x.restore();return c;}
/* ================= GIGI TAMPAK DEPAN ================= */
const _ft={};
function frontToothImg(w,h,o){o=o||{};const key=w+'|'+h+'|'+JSON.stringify(o);if(_ft[key])return _ft[key];const[c,x]=cv(w,h);
  const base=rgb(o.baby?'#fbf8f2':'#f4eee0'),side=rgb(o.baby?'#ddd8cc':'#d2c8b2'),cerv=rgb('#ead9b4'),inc=rgb('#d8e2e6'),hi=[255,255,255];
  for(let j=0;j<h;j++){const v=o.lower?1-j/(h-1):j/(h-1);
    const taper=1-.16*(1-v)*(1-v);const rad=v>.86?Math.round((v-.86)/.14*3):0;const half=(w/2)*taper;
    for(let i=0;i<w;i++){const u=(i-(w/2-.5))/half;if(Math.abs(u)>1)continue;if(rad&&Math.abs(u)>1-rad*.18)continue;
      if(o.chip&&v>1-o.chip[1]/h&&u>1-o.chip[0]/w*2+(1-v)*1.2)continue;
      let col=mixA(base,side,Math.pow(Math.abs(u),2.4)*.9);if(u>0)col=mixA(col,side,u*.35);
      col=mixA(col,cerv,Math.max(0,.3-v)*1.6);if(v>.8)col=mixA(col,inc,(v-.8)*3);
      if(u>-.62&&u<-.34&&v>.15&&v<.8)col=mixA(col,hi,.55);if(u>-.56&&u<-.46&&v>.25&&v<.6)col=hi;
      x.fillStyle='rgb('+col+')';x.fillRect(i,j,1,1);}}
  return _ft[key]=softOutline(c,.45);}
function frontTooth(x,X,Y,w,h,o){const im=frontToothImg(w,h,o);dropShadow(x,im,X,Y,1,2,.3);x.drawImage(im,X,Y);}
function gumBand(x,X,Y,W,H,teeth,upper){const img=x.getImageData(X,Y,W,H),A=img.data;
  const marg=i=>{let m=upper?H:0;teeth.forEach(([tc,tw])=>{const u=(X+i-tc)/(tw/2);if(Math.abs(u)<1){const dep=Math.sqrt(1-u*u)*Math.min(14,H*.5);m=upper?Math.min(m,H-dep):Math.max(m,dep);}});return m;};
  const rr=Math.min(H*.8,16);for(let i=0;i<W;i++){const m=marg(i);const ex=Math.min(i,W-1-i);for(let j=0;j<H;j++){const inG=upper?j<m:j>=m;if(!inG)continue;const dist=upper?m-j:j-m;
    const a=upper?j:H-1-j;if(ex<rr&&a>H-rr&&((rr-ex)**2+(a-(H-rr))**2)>rr*rr)continue;
    let col=mixA(rgb('#f19aa8'),rgb('#c85a70'),Math.min(1,dist/18));if(dist<1.2)col=rgb('#fcc4cc');else if(dist<2.5)col=rgb('#f6aab6');
    if(hash(i+X,j+Y)<.05)col=mixA(col,[255,255,255],.25);const k=(j*W+i)*4;A[k]=col[0];A[k+1]=col[1];A[k+2]=col[2];A[k+3]=255;}
    for(let s=1;s<=3;s++){const j=upper?Math.floor(m)+s-1:Math.floor(m)-s;if(j<0||j>=H)continue;const k=(j*W+i)*4;const f=.22/s;A[k]=A[k]*(1-f)|0;A[k+1]=A[k+1]*(1-f)|0;A[k+2]=A[k+2]*(1-f)|0;}}
  x.putImageData(img,X,Y);}
function lip(x,cx,Y,rx,th,upper){for(let i=-rx;i<=rx;i++){const u=i/rx;const y0=Y-(upper?1:-1)*Math.pow(Math.abs(u),2.2)*-8;const t=Math.max(2,th*(1-u*u*.55));
  for(let k=0;k<t;k++){const v=k/t;R(x,cx+i,Math.round(upper?y0-k:y0+k),1,1,mixH('#d86a78','#8a2e3e',upper?v:1-v));}R(x,cx+i,Math.round(upper?y0-t*.7:y0+t*.3),1,1,'rgba(255,220,220,.55)');}}
function occlusalImg(cav,fill){const key='o'+cav+fill;if(_ft[key])return _ft[key];const W=112,H=98,cx=56,cy=49;const[c,x]=cv(W,H);
  const cusps=[[-21,-17],[19,-17],[-21,16],[19,16]];const h=(i,j)=>{let s=0;cusps.forEach(([a,b])=>{s+=Math.exp(-(((i-cx-a)/13)**2+((j-cy-b)/12)**2));});return s;};
  for(let j=0;j<H;j++)for(let i=0;i<W;i++){const dx=(i-cx)/52,dy=(j-cy)/45;const d=Math.abs(dx)**2.5+Math.abs(dy)**2.5;if(d>1)continue;
    const hv=h(i,j),gx=h(i+1,j)-h(i-1,j),gy=h(i,j+1)-h(i,j-1);const L=-(gx+gy)*3.2;
    let col=mixA(rgb('#efe8d6'),rgb('#ffffff'),Math.max(0,L));if(L<0)col=mixA(col,rgb('#c8bca0'),Math.min(1,-L));
    if(hv<.42&&d<.75)col=mixA(col,rgb('#a89a78'),Math.min(1,(.42-hv)*3.2));
    if(d>.86)col=mixA(col,rgb('#cfc4a8'),(d-.86)*5);
    if(cav){const q=((i-cx+3)/18)**2+((j-cy+1)/14)**2+hash(i>>2,j>>2)*.12;if(q<1){col=fill?mixA(rgb('#ece2c2'),rgb('#d6c8a0'),hash(i,j)*.7+(q>.8?.4:0)):mixA(rgb('#1e120c'),rgb('#4a2c1a'),q);
      if(!fill&&q>.82)col=rgb('#8a5a32');if(fill&&q<.25&&(i+j)%5===0)col=rgb('#fffaf0');}}
    x.fillStyle='rgb('+col+')';x.fillRect(i,j,1,1);}
  return _ft[key]=softOutline(c,.45);}
function xr(im){const[c,x]=cv(im.width,im.height);x.fillStyle='#0e2238';x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0);const d=x.getImageData(0,0,c.width,c.height);
  for(let k=0;k<d.data.length;k+=4){let v=(d.data[k]*.3+d.data[k+1]*.5+d.data[k+2]*.2);v=Math.max(0,Math.min(255,(v-120)*1.6+60));d.data[k]=v*.62;d.data[k+1]=v*.82;d.data[k+2]=Math.min(255,v*1.05+20);}x.putImageData(d,0,0);return c;}

/* ================= 0. Komponen bersama ================= */
function mgSheet(){const[c,x]=cv(480,270);mgBg(x);mgHeader(x,'Komponen Bersama','6 input · sakit · bius · hasil',[],0);
  const box=(X,Y,W,H,code,t)=>{mgBox(x,X,Y,W,H,'dark');if(code)mgChip(x,code,X+6,Y+6);else H2(x,t,X+7,Y+8,MGC.gold,DK);};
  box(4,38,154,58,'TEPAT');TX(x,'tekan saat di hijau',10,58,MGC.lite2,DK);wTepat(x,12,74,136,.5,.22,.6);
  box(162,38,156,58,'GOSOK');TX(x,'drag di area kerja',168,58,MGC.lite2,DK);
  {mgSlot(x,169,66,60,26,'#f2eee2');const im=occlusalImg(true,0);x.save();x.beginPath();x.rect(170,67,58,24);x.clip();x.drawImage(im,28,30,56,36,170,61,56,36);x.restore();wProg(x,236,78,76,.55,'');}
  box(322,38,154,58,'TAHAN');TX(x,'lepas di zona biru',328,58,MGC.lite2,DK);wTahan(x,330,75,138,.48,.42,.58,null,.62);
  box(4,100,154,62,'URUT');wUrut(x,16,124,[['','cot',3],['','cond',1],['','irr',0]],44);
  box(162,100,156,62,'RITME');wRitme(x,180,126,130,[[14,'A','ok'],[36,'D','ok'],[60,'A','p'],[84,'D','r'],[108,'A','p']],60);
  box(322,100,154,62,'PILIH');wCard(x,328,122,46,32,'Awam',null,true);wCard(x,377,122,46,32,'Medis');wCard(x,426,122,46,32,'Kias');
  box(4,166,236,66,null,'Bar Sakit');
  [[20,'neutral','Tenang'],[72,'sad','>=70 meremas'],[100,'angry','100 berhenti']].forEach(([v,e,t],i)=>{const Y=184+i*16;gbar(x,12,Y+1,110,9,v/100,v>=70?'#e6383e':'#f0a848','#2a3f3c');R(x,12+77,Y,1,11,'#ffd86a');S(x,t,130,Y+2,v>=70?MGC.warn:MGC.lite,9,v===100,1,DK);});
  box(244,166,232,66,null,'Bius & hasil');
  [['Tanpa','0%'],['Topik.','30%'],['Infil.','70%'],['Blok','85%']].forEach(([n,p],i)=>{const X=250+i*56;wCard(x,X,182,52,28,n,[p],i===2);});
  [['SUKSES','#6ad46a'],['CUKUP','#ffd86a'],['GAGAL','#e6383e']].forEach(([t,col],i)=>{const X=250+i*74;R(x,X,212,70,15,'#081312');R(x,X+1,213,68,13,mixH(col,'#000000',.6));R(x,X+1,213,68,1,col);TXC(x,t,X+35,216,col,true,DK);});
  mgStrip(x,['mint','sirih','lidah','kunyit','cengkeh','serai'],['cengkeh']);return c;}
/* ================= 1. Konsultasi ================= */
function mgKonsul(){const[c,x]=cv(480,270);mgBg(x);mgHeader(x,'Konsultasi','Cara bicara',['1','2','3','4'],1);mgWork(x);
  for(let j=0;j<156;j++){R(x,7,41+j,324,1,mixH('#6a4428','#3e2616',j/156));if(j%13===0)R(x,7,41+j,324,1,'rgba(0,0,0,.18)');if(j%13===1)R(x,7,41+j,324,1,'rgba(255,220,170,.08)');}
  H2(x,'1 Temuan',12,46,MGC.lite,DK);S(x,'✓',70,46,MGC.ok,9,true,0);H2(x,'2 Cara bicara',116,46,MGC.gold,DK);
  wCard(x,12,58,96,70,'Lubang',['dekat saraf'],true,(x,X,Y)=>{const t=toothX({caries:'deep'});x.drawImage(t,25,6,120,62,X+14,Y+4,60,31);});
  wCard(x,116,58,68,70,'Medis',['+ rontgen'],true,(x,X,Y)=>{mgSlot(x,X+8,Y+2,44,32,'#0e2238');const g=xr(toothX({caries:'deep'}));x.drawImage(g,30,0,110,170,X+19,Y+3,22,30);});
  wCard(x,188,58,68,70,'Awam',['biasa'],false,(x,X,Y)=>{mgBox(x,X+12,Y+4,36,22,'paper',true);TX(x,'"..."',X+19,Y+11,MGC.ink2);});
  wCard(x,260,58,68,70,'Ibarat',['cerita'],false,(x,X,Y)=>{mgBox(x,X+14,Y+4,32,24,'paper',true);H2(x,'?',X+27,Y+12,MGC.ink2);});
  H2(x,'3 Rencana',12,136,MGC.lite2,DK);
  wCard(x,12,148,104,34,'Tambal',['+ pelapik'],false,null,true);wCard(x,120,148,104,34,'Cabut',['lebih murah'],false,null,true);wCard(x,228,148,100,34,'Whitening',['?'],false,null,true);
  mgInstr(x,'PILIH','Pilih cara bicara yang cocok dengan sifat pasien.','Curiga = medis');
  mgPatient(x,'gunawan','Pak Gunawan',[['Curiga','#7a4ab8']],'Dx: Pulpitis rev.','Gigi 36 · rontgen ada','T2');mgPain(x,5,'Tanpa tindakan');
  mgTray(x,[['Foto','foto',1],['Model','model',0],['Kaca','mir',0],['Brosur','brosur',0]],'Bukti');mgStrip(x,['mint','sirih'],['mint'],'Mint: bayaran +10%');return c;}
/* ================= 2. Resep ================= */
function medBox(x,X,Y,k){const[c,xx]=cv(46,32);
  if(k==='bot'){glass(xx,16,6,14,24,'#9ad6ff',.75,'#2a4a6a');R(xx,17,14,12,8,'#ffffff');R(xx,17,16,12,2,'#3a7fc4');}
  else{const col={pill:'#3a8ad8',box2:'#e86a3a',caps:'#c84a2a',box3:'#4a9a5a',box4:'#7a5ab8'}[k];
    for(let j=0;j<20;j++)R(xx,4,8+j,34,1,mixH('#ffffff','#d8dce2',j/19));R(xx,38,8,4,20,'#b8bec8');R(xx,38,8,1,20,'#d0d6de');R(xx,4,8,34,6,col);R(xx,4,8,34,1,mixH(col,'#ffffff',.5));R(xx,38,8,4,6,mixH(col,'#000000',.3));
    for(let q=0;q<3;q++){disc(xx,12+q*9,21,3,'#c8ccd4');disc(xx,12+q*9,20,2,k==='caps'?'#f6e27a':'#ffffff');P(xx,11+q*9,19,'#ffffff');}}
  const im=softOutline(c,.45);dropShadow(x,im,X,Y,2,2,.3);x.drawImage(im,X,Y);}
function mgResep(){const[c,x]=cv(480,270);mgBg(x);mgHeader(x,'Resep','Pereda sakit',['1','2','3','4'],0);mgWork(x);
  mgBox(x,10,44,198,150,'paper',true);for(let s=0;s<2;s++){const y=96+s*52;R(x,14,y,190,5,'#8a5428');R(x,14,y,190,1,'#d8a060');R(x,14,y+4,190,1,'#4a2410');x.fillStyle='rgba(0,0,0,.15)';x.fillRect(14,y+5,190,3);}
  H2(x,'Rak obat',16,50);
  [['PARASETAMOL','pill',1],['IBUPROFEN','box2',0],['AMOKSISILIN','caps',0],['METRONIDAZOL','box3',0],['KLINDAMISIN','box4',0],['KLORHEKSIDIN','bot',0]].forEach(([n,k,sel],i)=>{const X=16+(i%3)*62,Y=62+Math.floor(i/3)*52;
    if(sel){x.fillStyle='rgba(255,216,106,.55)';x.fillRect(X-2,Y-2,60,46);R(x,X-2,Y-2,60,1,'#ffd86a');R(x,X-2,Y+43,60,1,'#c8902a');}
    medBox(x,X+6,Y+2,k);Tm(x,n,X+28-(TWm(n)>>1),Y+37,'#4a230e');});
  mgShadow(x,214,44,112,150);R(x,214,44,112,150,'#c9c2a6');R(x,215,45,110,148,'#fffdf6');for(let j=0;j<9;j++)R(x,219,74+j*13,102,1,'#dfe8f2');R(x,215,45,110,1,'#ffffff');R(x,324,45,1,148,'#e0d8c0');
  H2(x,'drg. [Nama]',220,51,'#2a4a7a');Tm(x,'PRAKTIK GIGI RIMBASARI',220,63,'#6a7a8a');
  H2(x,'R/',220,78,'#2a2a36');TX(x,'Parasetamol',236,78,'#2a2a36');TX(x,'S bila perlu',236,91,'#8a96a2');
  H2(x,'R/',220,108,'#c8ccd4');TX(x,'antibiotik?',236,108,'#c8ccd4');
  TX(x,'Pro: Bu Yati',220,166,'#2a2a36');H2(x,'Hamil 10 mgg',220,178,MGC.red);
  mgInstr(x,'PILIH','Klik obat di rak, lalu Lanjut.','Cek riwayat pasien');
  mgPatient(x,'yati','Bu Yati',[['Hamil T1','#c8407a']],'Dx: Pulpitis rev.','Gigi 46 · tunda tambal','T1');mgPain(x,35,'Ngilu 3 hari');
  mgTray(x,[['Pereda','pill',1],['Antibio','caps',0],['Aturan','card',0],['Pulang','bag',0]],'Langkah');mgStrip(x,['mint'],[],'Energi 2 · 5 menit game');return c;}
/* ================= 3. Tambalan sementara ================= */
function mgSementara(){const[c,x]=cv(480,270);mgBg(x);mgHeader(x,'Tambalan Sementara','Isi & padatkan',['1','2','3','4'],2);mgWork(x,[98,118,110]);
  const o=occlusalImg(true,0),o2=occlusalImg(true,1);dropShadow(x,o,14,46,4,5,.35);x.drawImage(o,0,0,112,98,14,46,168,147);
  x.save();x.beginPath();x.rect(14,46,168,84);x.clip();x.drawImage(o2,0,0,112,98,14,46,168,147);x.restore();
  for(let i=0;i<16;i++){const X=148+i*1.4,Y=54+i;R(x,X,Y,3,3,i<3?MTL[1]:MTL[3]);P(x,X,Y,MTL[4]);P(x,X+2,Y+2,MTL[0]);}
  mgCorner(x,'Tanpa bayar sendiri');
  H2(x,'Bahan',196,66,MGC.lite,DK);wCard(x,196,78,54,40,'ZOE',['eugenol'],true);wCard(x,254,78,72,40,'Non-eug.',['komposit'],false,null,true);
  TX(x,'Berikutnya PSA: ZOE',196,124,MGC.lite2,DK);
  wTepat(x,196,152,128,.4,.34,.55,'Padatkan 1/2');wTepat(x,196,181,128,.32,.34,.02,'Padatkan 2/2');
  mgInstr(x,'TEPAT','Tekan Spasi saat penanda di zona hijau.','Meleset 2x = berongga');
  mgPatient(x,'yati','Bu Yati',[['Hamil T1','#c8407a']],'Darurat: tunda ke T2','Gigi 46 · tanpa bius','T1','sad');mgPain(x,18,'+2 per meleset');
  mgTray(x,[['Kapas','cot',3],['ZOE','zoe',1],['Stopper','scl',0],['Kertas','art',0]]);mgStrip(x,['mint','cengkeh'],[],'Tanpa kesalahan berat');return c;}
/* ================= 4. Tambal GIC ================= */
function mgGIC(){const[c,x]=cv(480,270);mgBg(x);mgHeader(x,'Tambal GIC','Siapkan kavitas',['1','2','3','4','5'],2);mgWork(x,[95,110,120]);
  mgClip(x,()=>{x.drawImage(toothX({cav:'deep',liner:true}),12,36);});
  tag(x,'Kavitas bersih',196,48,MGC.lite,104,58);tag(x,'Pelapik',196,70,'#f4de88',104,74);tag(x,'Pulpa',196,92,'#ee98a4',112,100);
  H2(x,'Urutan bahan',196,116,MGC.gold,DK);
  wUrut(x,200,130,[['Kapas','cot',3],['Kondis.','cond',3],['Bilas','irr',3]],42);
  wTahan(x,196,182,130,.47,.36,.56,'Keringkan',.56);Tm(x,'BASAH',198,197,'#5ab4f0');Tm(x,'LEMBAP',244,197,'#bfe8ff');Tm(x,'KERING',296,197,'#ff9aa4');
  mgInstr(x,'TAHAN','Tahan klik untuk meniup udara, lepas di zona lembap.','Terlalu kering = ngilu');
  mgPatient(x,'tari','Kak Tari',[],'Dx: Karies dalam','Gigi 26 · low-speed','T1');mgPain(x,22,'Bius infiltrasi');
  mgTray(x,[['Kapas','cot',3],['Kondis.','cond',3],['Etsa','etch',0],['Pelapik','liner',0],['GIC','gic',0],['Varnish','varn',0]]);
  mgStrip(x,['mint','cengkeh','kunyit'],['cengkeh'],'Energi 12 · ~25 detik');return c;}
/* ================= 5. Tambal komposit ================= */
function mgKomposit(){const[c,x]=cv(480,270);mgBg(x);mgHeader(x,'Tambal Komposit','Isi berlapis',['1','2','3','4','5'],3);mgWork(x);
  mgClip(x,()=>{const g=x.createRadialGradient(130,120,10,130,120,150);g.addColorStop(0,'#5a1e26');g.addColorStop(1,'#1e0a0e');x.fillStyle=g;x.fillRect(7,41,324,156);
    ellipse(x,130,190,118,34,'#a84452');ellipse(x,130,194,100,26,'#c25a68');ellipse(x,116,188,40,6,'#d87a86');
    const T6=[[22,26,52],[50,30,58],[82,38,66,1],[122,38,66],[162,30,58],[194,26,52]];
    T6.forEach(([X,w,h,ch])=>frontTooth(x,X,62,w,h,ch?{chip:[22,24]}:{}));
    const X0=82,Y0=62,w=38,h=66;for(let j=0;j<24;j++){const y=Y0+h-24+j;for(let i=0;i<w;i++){const u=(i-(w/2-.5))/(w/2);const v=(y-Y0)/(h-1);
      if(!(u>1-22/w*2+(1-v)*1.2)||Math.abs(u)>.98)continue;if(j>=12)P(x,X0+i,y,hash(i,j)<.15?'#e8dcbc':j<14?'#fffaf0':'#f2e8d0');}}
    for(let i=X0+12;i<X0+w-2;i+=3){R(x,i,Y0+h-12,2,1,'#ffd86a');R(x,i,Y0+h-24,2,1,'#7af07a');}Tm(x,'2 MM',X0+w+3,Y0+h-14,'#ffd86a');
    gumBand(x,7,41,240,38,T6.map(([X,w])=>[X+w/2,w]),true);lip(x,128,46,140,9,true);});
  mgCorner(x,'Warna A2');
  mgBox(x,250,64,78,92,'dark');H2(x,'Lapisan',256,70,MGC.lite,DK);[['1','#6ad46a','✓'],['2','#ffd86a','<'],['3','#7a9a94','']].forEach(([n,col,m],i)=>{TX(x,'Lapis '+n,258,84+i*11,col,DK);TX(x,m,312,84+i*11,col,DK);});
  H2(x,'Warna',256,121,MGC.lite,DK);[['A1','#f6f0e0'],['A2','#efe0c0'],['A3','#e4cfa0']].forEach(([n,col],i)=>{const X=257+i*23;R(x,X,132,18,13,i===1?'#ffd86a':'#081312');for(let j=0;j<11;j++)R(x,X+1,133+j,16,1,mixH(col,'#a89878',j/30));R(x,X+2,134,2,6,'#ffffff');Tm(x,n,X+5,148,i===1?'#ffd86a':'#bfd8d0');});
  wTahan(x,14,184,140,.55,.5,.62,'Isi lapis 2',.62);wTepat(x,176,184,148,.42,.3,.22,'Sinar LED');
  mgInstr(x,'TAHAN','Isi satu lapis sampai garis 2 mm, lalu sinar LED.','> 2 mm = tidak keras');
  mgPatient(x,'andre','Andre',[],'Dx: Fraktur insisal','Gigi 11 · high-speed','T2');mgPain(x,8,'Bius infiltrasi');
  mgTray(x,[['Isolasi','dam',3],['Etsa','etch',3],['Bonding','bond',3],['Resin','resin',1],['LED','lgt',0],['Kertas','art',0]]);
  mgStrip(x,['mint','cengkeh'],[],'Ludah = bocor · Energi 15');return c;}
/* ================= 6. PSA ================= */
function mgPSA(){const[c,x]=cv(480,270);mgBg(x);mgHeader(x,'PSA Kunjungan 1','Panjang kerja',['1','2','3','4','5'],2);mgWork(x,[95,120,120]);
  const OX=10,OY=36,cx=OX+85;
  mgClip(x,()=>{x.drawImage(toothX({access:true,canals:true,apex:true}),OX,OY);
    for(let j=0;j<150;j++){const Y=OY+14+j;if(Y>OY+150)break;const t=Math.max(0,(Y-OY-94)/58);const X=Math.round(cx-13-t*5+t*t*4);R(x,X-1,Y,3,1,j%3===0?MTL[1]:MTL[3]);P(x,X-1,Y,MTL[4]);P(x,X+1,Y,MTL[0]);}
    for(let j=0;j<10;j++)R(x,cx-22,OY-2+j,18,1,mixH('#ffe070','#c8901a',j/9));R(x,cx-22,OY-2,18,1,'#fff8c0');R(x,cx-17,OY+28,10,3,'#e6383e');R(x,cx-17,OY+28,10,1,'#ff9a9a');});
  tag(x,'Stopper',196,48,'#ff9a9a',cx-8,OY+29);tag(x,'Garis apeks',196,174,'#ffd86a',150,OY+151);
  mgBox(x,250,46,78,80,'dark');const g=xr(toothX({access:true,canals:true}));x.drawImage(g,10,0,150,166,256,52,66,64);for(let i=256;i<322;i+=3)R(x,i,52+Math.round(151*64/166),2,1,'#ffd86a');
  TXC(x,'Rontgen',289,117,MGC.lite2,false,DK);
  H2(x,'Apex locator',196,134,MGC.lite2,DK);TX(x,'T3 · terkunci',196,146,'#7a9a94',DK);
  wTahan(x,196,164,130,.82,.78,.9,null,.9);
  mgInstr(x,'TAHAN','Masukkan file pelan, lepas tepat di garis apeks.','Lewat = sakit +20');
  mgPatient(x,'tika','Tika',[],'Dx: Pulpitis irev.','Gigi 36 · saluran 2/3','T2');mgPain(x,26,'Blok · molar bawah');
  mgTray(x,[['File 15','fil',1],['NaOCl','naocl',0],['Paper','pp',0],['CaOH2','caoh',0],['ZOE','zoe',0],['Apex','apex',2]]);
  mgStrip(x,['mint','cengkeh','kunyit'],[],'K2: 3-7 hari lagi · bayar 50/50');return c;}
/* ================= 7. Scaling ================= */
function mgScaling(){const[c,x]=cv(480,270);mgBg(x);mgHeader(x,'Scaling','Karang atas gusi',['1','2','3','4'],0);mgWork(x);
  [['Atas kanan',.3,1],['Atas kiri',1,0],['Bawah kanan',0,0],['Bawah kiri',0,0]].forEach(([n,f,act],k)=>{const X=10+(k%2)*161,Y=43+Math.floor(k/2)*78,up=k<2;mgBox(x,X,Y,157,74,act?'gold':'dark',true);
    x.save();x.beginPath();x.rect(X+3,Y+3,151,55);x.clip();const g=x.createLinearGradient(0,Y,0,Y+60);g.addColorStop(0,'#3a1218');g.addColorStop(1,'#1e080c');x.fillStyle=g;x.fillRect(X+3,Y+3,151,55);
    const tx=[];for(let i=0;i<5;i++){const w=26,tX=X+8+i*29;tx.push([tX+w/2,w]);frontTooth(x,tX,up?Y+10:Y+6,w,46,{lower:!up});}
    if(f<1)tx.forEach(([tc],i)=>{const left=tc-12;for(let a=0;a<24;a++)for(let b=0;b<7;b++){if(hash(left+a,b+k*9)<.72-(act&&i<2?.62:0)-b*.06){const yy=up?Y+25+b:Y+38-b;P(x,left+a,yy,hash(a,b)<.4?'#e6c45a':hash(a,b)<.75?'#c8a040':'#9a7a2a');}}});
    gumBand(x,X+3,up?Y+3:Y+34,151,24,tx,up);if(act){disc(x,X+40,Y+30,1,'#d8202a');P(x,X+41,Y+32,'#d8202a');}x.restore();
    if(act)TX(x,n,X+7,Y+61,'#5a2a04');else TX(x,n,X+7,Y+61,MGC.lite,DK);gbar(x,X+88,Y+60,62,9,f,f>=1?'#6ad46a':'#f0a048',act?'#c8a070':'#2a3f3c');if(f>=1)S(x,'✓',X+78,Y+60,MGC.ok,9,true,0);});
  for(let i=0;i<18;i++){const X=60+i,Y=84-i*.9;R(x,X,Y,2,2,MTL[2]);P(x,X,Y,MTL[4]);}R(x,78,66,14,3,MTL[1]);R(x,78,66,14,1,MTL[4]);
  mgInstr(x,'GOSOK','Gosok karang kuning sampai bar penuh di tiap panel.','Kena gusi = berdarah');
  mgPatient(x,'yusuf','Pak Yusuf',[['Jantung','#b02030'],['Pengencer','#c8501a']],'Dx: Gingivitis','Kalkulus 4 sisi','T2');mgPain(x,14,'Tanpa bius');
  mgTray(x,[['Manual','scl',1],['Ultra','ult',2],['Kuret','scl',0],['Polish','dry',0]]);mgStrip(x,['mint','sirih'],['sirih'],'Jantung: ultrasonik dicoret');return c;}
/* ================= 8. Cabut gigi susu ================= */
function mgSusu(){const[c,x]=cv(480,270);mgBg(x);mgHeader(x,'Cabut Gigi Susu','Goyang & cabut',['1','2','3','4'],2);mgWork(x);
  mgClip(x,()=>{const g=x.createRadialGradient(150,90,10,150,90,190);g.addColorStop(0,'#62222c');g.addColorStop(1,'#1a080c');x.fillStyle=g;x.fillRect(7,41,324,156);
    ellipse(x,150,108,150,40,'#a84452');ellipse(x,150,104,132,30,'#c25a68');ellipse(x,136,98,56,8,'#d87a86');   // lidah
    const perm=[[92,22],[116,22],[176,22],[200,22]];perm.forEach(([X,w])=>{const im=frontToothImg(w,44,{lower:true});x.globalAlpha=1;dropShadow(x,im,X,90,1,2,.35);x.drawImage(im,X,90);x.fillStyle='rgba(60,10,20,.18)';});
    const baby=[[44,22,0],[70,22,0],[98,20,0],[124,20,1],[150,20,0],[176,20,0],[204,22,0],[230,22,0],[258,22,0]];
    baby.forEach(([X,w,t])=>{const im=frontToothImg(w,38,{lower:true,baby:true});if(t){x.save();x.translate(X+10,152);x.rotate(-.22);dropShadow(x,im,-10,-38,1,2,.3);x.drawImage(im,-10,-38);x.restore();}else frontTooth(x,X,114,w,38,{lower:true,baby:true});});
    gumBand(x,7,140,324,42,baby.map(([X,w])=>[X+w/2,w]),false);for(let j=0;j<18;j++)R(x,7,180+j,324,1,mixH('#c85a6a','#7a2a38',j/17));R(x,7,180,324,1,'#f0a0ac');R(x,7,181,324,1,'#e07a88');
    for(let s=0;s<2;s++){const ox=s*9;for(let t=0;t<60;t++){const X=226+ox-t*1.45,Y=44+t*1.05;R(x,X,Y,3,3,t<40?MTL[1+s]:MTL[2]);P(x,X,Y,MTL[4]);}}R(x,224,40,16,6,'#c84a4a');R(x,224,40,16,2,'#ff9a9a');});
  tag(x,'Gigi tetap',236,58,MGC.lite,210,94);tag(x,'Gigi susu goyang',180,124,MGC.gold,144,128);
  wRitme(x,40,178,286,[[12,'A','ok'],[46,'D','ok'],[80,'A','ok'],[114,'D','p'],[160,'A','p'],[206,'D','p']],114,null);
  mgInstr(x,'RITME','Tekan A/D bergantian mengikuti ketukan yang longgar.','Merah = terlalu keras');
  mgPatient(x,'kiki','Kiki, 9 th',[['Anak x1.3','#c8407a']],'Dx: Persistensi','Gigi 71 · topikal','T1','surprised');mgPain(x,40,'Lidah Buaya -30%');
  mgTray(x,[['Kapas','cot',3],['Topikal','topi',3],['Tang','frc',1],['Tampon','tamp',0]]);mgStrip(x,['mint','lidah','cengkeh'],['lidah'],'Penuh: anak menggigit');return c;}
/* ================= 9. Cabut penyulit ================= */
function mgPenyulit(){const[c,x]=cv(480,270);mgBg(x);mgHeader(x,'Cabut Penyulit','Separasi akar',['1','2','A','B','C','4','5'],3);mgWork(x,[95,120,120]);
  const OX=10,OY=36;
  mgClip(x,()=>{x.drawImage(toothX({roots:2,spread:true,sepLine:true,caries:'deep'}),OX,OY);
    for(let a=0;a<70;a++){const t=a/70*Math.PI;const X=OX+85+Math.cos(t)*46,Y=OY+94-Math.sin(t)*6;if(a%2)R(x,X,Y,2,1,'#7af07a');}
    for(let t=0;t<46;t++){const X=OX+86+t*.95,Y=OY+70-t*1.15;R(x,X,Y,4,4,t<5?MTL[1]:MTL[2]);P(x,X,Y,MTL[4]);P(x,X+3,Y+3,MTL[0]);}disc(x,OX+86,OY+72,2,'#ffffff');
    for(let k=0;k<14;k++)P(x,OX+82+hash(k,5)*10,OY+66+hash(k,6)*8,'#f6ead0');});
  mgCorner(x,'Kasus x1.3');
  tag(x,'Garis belah',196,66,'#7af07a',OX+86,OY+86);tag(x,'Jejak periotome',196,88,'#7af07a',OX+128,OY+90);tag(x,'Akar menyebar',196,110,MGC.lite,OX+126,OY+136);
  wProg(x,196,140,130,.6,'Belah','#6ad46a');
  wRitme(x,206,178,120,[[8,'A','ok'],[30,'D','r'],[52,'A','p'],[74,'D','p']],30,'Langkah C: per akar');
  mgInstr(x,'GOSOK','Bor tepat di garis hijau sampai akar terbelah dua.','Keluar = kena tulang');
  mgPatient(x,'hasan','Pak Hasan',[['Hipertensi','#b02030']],'Tensi 150/95 · boleh','Maks 2 karpul','T2');mgPain(x,30,'Blok · karpul 2/2');
  mgTray(x,[['Periot.','per',3],['Bor HS','bur',1],['Elev.','elv',0],['Tang','frc',0],['Tampon','tamp',0],['Karpul','syr',2]]);
  mgStrip(x,['mint','sirih','cengkeh'],['cengkeh'],'Akar patah 3x: rujuk / bedah');return c;}
/* ================= 10. Bedah minor ================= */
function mgBedah(){const[c,x]=cv(480,270);mgBg(x);mgHeader(x,'Bedah Minor','Buang tulang',['1','2','3','4','5'],2);mgWork(x,[95,140,120]);
  const OX=10,OY=18;
  mgClip(x,()=>{x.drawImage(toothX({roots:2,crown:false,flap:true,nerve:true}),OX,OY);
    // flap: jaringan gusi yang dibuka dan dilipat ke kiri (permukaan luar di atas, sisi dalam merah tua)
    const bx=OX+41,by=OY+64;polyPx(x,[[bx+1,by],[bx+1,by+22],[bx-30,by-4],[bx-36,by-16]],'#9a3448');
    polyPx(x,[[bx+1,by],[bx+1,by+10],[bx-32,by-8],[bx-36,by-16]],'#e07a8c');line(x,bx,by,bx-36,by-16,1,'#ffd0d8');line(x,bx,by+1,bx-35,by-15,1,'#f6a8b4');
    line(x,bx,by+22,bx-30,by-4,1,'#6a1e30');for(let k=0;k<10;k++)P(x,bx-6-hash(k,9)*24,by-2+hash(k,8)*10,'#c85a70');
    for(let j=0;j<16;j++){const hw2=26-j*1.2;for(let i=-hw2;i<hw2;i++){const e=Math.abs(i)>hw2-2||j>13;P(x,OX+85+i,OY+86+j,e?'#f6e2b8':hash(i|0,j)<.25?'#9a7448':'#b88c5c');}}
    for(let t=0;t<52;t++){const X=OX+92+t*.9,Y=OY+96-t*1.3;R(x,X,Y,4,4,t<6?MTL[1]:MTL[2]);P(x,X,Y,MTL[4]);P(x,X+3,Y+3,MTL[0]);}
    for(let k=0;k<40;k++){const X=OX+78+hash(k,1)*28,Y=OY+82+hash(k,2)*16;P(x,X,Y,hash(k,3)<.5?'#9ad6ff':'#e0f6ff');}});
  mgCorner(x,'Tahap 4 · T3');
  tag(x,'Flap gusi',196,64,'#f6aab6',OX+20,OY+54);tag(x,'Sisa akar',196,108,'#efd7a0',OX+98,OY+128);tag(x,'Zona saraf',196,168,'#ffd86a',OX+150,OY+166);
  wProg(x,196,136,130,.45,'Tulang','#f0a048');
  mgBox(x,196,146,130,18,'dark',false);H2(x,'Shift',201,151,'#5ab4f0',DK);TX(x,'semprot air',236,151,MGC.lite,DK);
  mgInstr(x,'GOSOK','Gosok tulang di atas akar sambil menahan Shift.','Kuning = mati rasa');
  mgPatient(x,'marno','Pak Marno',[['Takut jarum','#7a4ab8']],'Dx: Sisa akar','Gigi 37 · rawat inap','T3','sad');mgPain(x,24,'Blok · Perawat -20%');
  mgTray(x,[['Skalpel','scal',3],['Elev.','elv',3],['Bor','bur',1],['Irigasi','irr',1],['Pinset','frc',0],['Jahit','ndl',0]]);
  mgStrip(x,['mint','sirih','cengkeh','kunyit'],['cengkeh'],'Lalu menginap di Puskesmas');return c;}
const MG_SCREENS={sheet:mgSheet,konsul:mgKonsul,resep:mgResep,sementara:mgSementara,gic:mgGIC,komposit:mgKomposit,psa:mgPSA,scaling:mgScaling,susu:mgSusu,penyulit:mgPenyulit,bedah:mgBedah};
