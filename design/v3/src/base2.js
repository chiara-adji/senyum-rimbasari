/* ================= PALET ================= */
const PAL={
  kemarau:{name:'Kemarau',ol:'#2a1a1f',g0:'#3b6a26',g1:'#5c9a30',g2:'#86c23a',g3:'#c6e468',d0:'#9a5a26',d1:'#d08a3c',d2:'#ebb460',s0:'#6e6862',s1:'#a59d94',s2:'#d4cdc2',w0:'#2a68aa',w1:'#4aa0df',w2:'#a3ddf6',sky:'#fff0c4',fl:'#ff7a5a'},
  hujan:{name:'Hujan',ol:'#1a1a22',g0:'#1d4a33',g1:'#2c6c42',g2:'#45944f',g3:'#76bd68',d0:'#4a3226',d1:'#6f4c33',d2:'#94704b',s0:'#454c57',s1:'#6c7581',s2:'#97a1ab',w0:'#22476b',w1:'#3a6d97',w2:'#7ba8c6',sky:'#b7c4ce',fl:'#e86a9a'}
};
const C={ol:'#2a1a1f',eye:'#2a1a1f',white:'#f7f8fa',whiteS:'#c5cdd9',
  skinL:'#f6d2a8',skinLs:'#e2a97b',skinM:'#cf915f',skinMs:'#a86b40',skinD:'#a5673d',skinDs:'#7a462a',
  blk:'#241b20',blkH:'#4e3e47',brn:'#4a2c1e',brnH:'#7d5034',gray:'#bdb4ac',grayH:'#e9e3dc',
  polo:'#25242c',poloH:'#4b4a57',jean:'#3b5a8c',jeanS:'#29416a',navy:'#2f3d63',navyS:'#1f2843',
  teal:'#3fae9c',tealS:'#2b8073',pink:'#ec98ad',pinkS:'#c66d85',red:'#c8414b',redS:'#8f2a34',
  blue:'#4f86c9',blueS:'#365f95',batik:'#7d4f2a',batikH:'#e0aa5e',mustard:'#e3aa3c',mustardS:'#ad7a20',
  cream:'#f5e8c8',creamS:'#d9c69c',khaki:'#b99e6c',khakiS:'#8d7550',shoe:'#3b2a24',shoeH:'#62493e',
  blush:'#f59a8c',mouth:'#a5504a',mauve:'#b0607e',mauveS:'#83415d',steth:'#58606e',kebaya:'#a0523a',kebayaS:'#7a3a28'};
const B={roof0:'#6e2418',roof1:'#a83a26',roof2:'#d1583a',roof3:'#ec8158',broof0:'#1f3a66',broof1:'#2f5d9e',broof2:'#4d84c8',broof3:'#7fb0e6',
  oroof0:'#7a3612',oroof1:'#b85a1e',oroof2:'#e07e30',oroof3:'#f6a65a',
  wood0:'#4a2a18',wood1:'#7a4a28',wood2:'#a8703e',wood3:'#d09a5c',wood4:'#ecc085',
  pl0:'#b39c80',pl1:'#e6d6bc',pl2:'#fbf2e2',gl0:'#24507c',gl1:'#4a90c8',gl2:'#a8dcf4',st0:'#5e5a58',st1:'#8e8884',st2:'#bdb6ae',green:'#3f8f4a',greenH:'#6cc06a'};

/* ================= IKON ================= */
function icon(build){const[c,x]=cv(16,16);build(x);return outline(c,C.ol);}
const IC={
  mirror:icon(x=>{for(let i=0;i<9;i++){P(x,2+i,13-i,'#8a93a3');P(x,3+i,13-i,'#c9d0da');}disc(x,11,4,3,'#9aa3b3');disc(x,11,4,2,'#cfeaf8');P(x,10,3,'#fff');}),
  xray:icon(x=>{R(x,1,1,14,14,'#1d3f6e');R(x,2,2,12,12,'#0f2440');const t=fromRows(['.WW.WW.','WWWWWWW','WWWWWWW','.WWWWW.','.WW.WW.','.W...W.'],{W:'#bfe8ff'});x.drawImage(t,4,5);P(x,3,3,'#5a8cc8');R(x,10,12,3,1,'#5a8cc8');}),
  pill:icon(x=>{R(x,4,2,8,3,'#3a3a46');R(x,5,2,6,1,'#5c5c6a');R(x,3,5,10,10,'#f2f4f6');R(x,11,5,2,10,'#c9ced6');R(x,7,7,2,6,'#d23a3a');R(x,5,9,6,2,'#d23a3a');}),
  sirih:icon(x=>{ellipse(x,6,6,4,5,'#2f8a3a');ellipse(x,10,8,4,5,'#45a84a');ellipse(x,10,8,2,3,'#6cc864');for(let i=0;i<6;i++)P(x,10,5+i,'#2a6a30');R(x,7,12,2,3,'#7a5a2a');}),
  coffee:icon(x=>{ellipse(x,8,13,7,2,'#d8c8b0');R(x,3,6,9,7,'#f2ead8');R(x,10,6,2,7,'#cfc2a6');R(x,4,6,7,2,'#3a2214');R(x,12,8,2,1,'#f2ead8');R(x,13,8,1,3,'#f2ead8');R(x,12,10,2,1,'#f2ead8');P(x,5,2,'#e8e8f0');P(x,6,3,'#e8e8f0');P(x,8,1,'#e8e8f0');P(x,8,3,'#e8e8f0');}),
  bread:icon(x=>{ellipse(x,8,9,7,5,'#c97a2e');ellipse(x,8,8,6,4,'#e8a04a');[[4,7],[7,6],[10,7]].forEach(p=>{P(x,p[0],p[1],'#f6d08a');P(x,p[0]+1,p[1]+1,'#f6d08a');});}),
  heart:icon(x=>x.drawImage(fromRows(['.RR...RR.','RhRR.RRRR','RhRRRRRRR','RRRRRRRRD','.RRRRRRD.','..RRRRD..','...RRD...','....D....'],{R:'#e6383e',h:'#ffb0b0',D:'#a8202a'}),3,4)),
  energy:icon(x=>x.drawImage(fromRows(['....YYY','...YYY.','..YYY..','.YYYYYY','...YYO.','..YYO..','..YO...','.YO....','.O.....'],{Y:'#ffd23a',O:'#e89a1a'}),4,3)),
  coin:icon(x=>{disc(x,8,8,6,'#c98a12');disc(x,8,8,5,'#f2b72a');disc(x,7,7,3,'#ffd75a');P(x,5,5,'#fff6c8');R(x,7,6,2,5,'#c98a12');}),
  star:icon(x=>x.drawImage(fromRows(['.....Y.....','....YYY....','...YYhYY...','YYYYYhYYYYY','.YYYYYYYYY.','..YYYYYYY..','..YYY.YYY..','.YYY...YYY.','.YY.....YY.'],{Y:'#f6c12c',h:'#fff2a8'}),2,3)),
  tooth:icon(x=>x.drawImage(fromRows(['.WWW..WWW.','WhWWWWWWWW','WhWWWWWWWS','WWWWWWWWWS','.WWWWWWWS.','.WWWWWWWS.','.WWS..WWS.','.WW...WWS.','..W....W..'],{W:'#fbfbf6',S:'#c9cfd4',h:'#ffffff'}),3,3)),
  stress:icon(x=>x.drawImage(fromRows(['...B...','...B...','..BBB..','..BhB..','.BBhBB.','.BBBBB.','BBBBBBB','.BBBBB.','..BBB..'],{B:'#4aa8ec',h:'#d0f0ff'}),4,3)),
  box:icon(x=>{R(x,2,5,12,9,'#c8935a');R(x,2,5,12,2,'#e0b07a');R(x,11,7,3,7,'#a8763e');R(x,7,5,2,9,'#e8d6a8');R(x,3,9,3,2,'#f4f4f4');P(x,4,9,'#d23a3a');}),
};

/* ================= BANGUNAN (v3.2 — mengikuti model referensi user) =================
   Genteng besar bertingkat (ber-highlight & ber-celah), atap pelana menghadap depan dengan bubungan dan genteng chevron,
   dormer, dinding batu bata / batu kali / papan vertikal, rangka balok kayu, pintu & jendela melengkung, teras batu,
   sayap samping (emperan barang / kamar). Skala: karakter 24×32 → pintu 18×30. */
const DOOR_H=30,DOOR_W=18;
/** Palet genteng: [celah, bayangan, gelap, terang, highlight] */
const RP={terra:['#4a1a0c','#7a2e14','#b0441c','#d05e28','#ee8a4a'],wood:['#5a3010','#8a5420','#b87a38','#d89a50','#f0c47e'],
  blue:['#14223e','#1f3a66','#2f5d9e','#4d84c8','#86b6ea'],green:['#12301a','#1f4a2a','#2f6e3a','#4a9a50','#80c474'],
  slate:['#1a1e2a','#2a2e3a','#3a4050','#4c5468','#6e7890'],plum:['#3a1428','#5a2a40','#8a3a5a','#b85a7a','#e08aa8'],
  brown:['#22140c','#3a2a1e','#5a3a24','#7a5232','#a07448'],olive:['#2e2612','#4a3a20','#6a5a30','#8a7a40','#b0a060'],
  teal:['#10302c','#1f4a44','#2b6a62','#3a8a80','#62b0a4'],navy:['#121a30','#1f2843','#2f3d63','#41528a','#6478b0'],
  red:['#3a0e12','#5a1a20','#8a2a30','#a8323a','#d0585a'],ochre:['#4a2a08','#7a4a10','#a86a1a','#d08a28','#f0b04a']};
function toPal(r){return r.length===5?r:[shade(r[0],-.4),r[0],r[1],r[2],r[3]];}
const TT=6,TWD=9;
/** Warna satu piksel genteng. course = deret, r = baris dalam deret (0..TT-1), s = posisi sepanjang deret. */
function tileCol(pal,course,r,s,seed=0){const o=(course%2)*(TWD>>1)+((hash(course,seed)*3)|0);const seg=Math.floor((s+o)/TWD),sx=(((s+o)%TWD)+TWD)%TWD;
  if(r===TT-1)return pal[0];if(r===TT-2)return sx===0?pal[0]:pal[1];if(sx===0)return pal[0];if(sx===TWD-1)return pal[1];if(r===0)return pal[4];
  const h=hash(seg+seed*7,course);return h<.25?pal[2]:h>.85?shade(pal[3],.1):pal[3];}
/** Variasi realistis: genteng kusam/berlumut sesekali, gradasi gelap ke arah lis, sisi kanan sedikit gelap (cahaya dari kiri). */
function roofShade(c,i,j,H,right,seed){let f=-(j/H)*.1+(right?-.08:.04);const h=hash((i/TWD|0)+seed*13,(j/TT|0)+seed);if(h>.992)return shade(c,-.25+f);if(h>.93)f-=.08;return shade(c,f);}
/** Atap perisai tampak depan: trapesium dengan bidang samping lebih gelap, garis jurai, sudut atas membulat, lis bawah tebal membulat. */
function roofHip(x,X,Y,W,H,pal,seed=1){const sl=.22;paint(x,X,Y,W,H,(i,j)=>{let ins=Math.round((H-1-j)*sl);if(j<6)ins+=Math.round((6-j)*(6-j)/6);
    if(j>=H-4){const r=j-(H-4),e=r===3?2:r===2?1:0;if(i<e||i>=W-e)return null;return r===0?pal[4]:r===3?pal[0]:r===1?pal[2]:pal[1];}
    if(i<ins||i>=W-ins)return null;
    if(j<3){if(j===0)return pal[0];return (i+2)%6===0?pal[0]:j===1?shade(pal[4],-.05):pal[2];}
    const sp=Math.round((H-4-j)*.45)+3;const side=i<ins+sp?-1:i>=W-ins-sp?1:0;
    if(side&&(i===ins+sp-1||i===W-ins-sp))return pal[4];// garis jurai
    const jj=j-3;let c=tileCol(pal,(jj/TT)|0,jj%TT,side? (side<0? i*1.6|0 : (W-i)*1.6|0):i,seed+(side+1)*5);
    c=roofShade(c,i,j,H,side>0,seed);if(side)c=shade(c,side<0?-.06:-.16);return c;});}
/** Atap pelana menghadap depan: puncak tumpul membulat, ujung lis membulat, genteng chevron bergradasi; dinding segitiga dengan papan lis kayu, bayangan plafon, balok melintang. */
function roofGable(x,cx,Y,half,H,pal,o={}){const k=H/half,tk=o.tk||12,seed=o.seed||1;const X=cx-half-2,W=half*2+5;const trim=o.trim||TB[3],trimD=shade(trim,-.35),trimL=shade(trim,.3);
  paint(x,X,Y,W,H,(li,j)=>{const i=X+li;const u=Math.abs(i+.5-cx-.5);
    let hw=(j+3)/k+1.5;if(j<4)hw=Math.min(hw,1.5+Math.sqrt(j+1)*2.2);if(j>=H-3)hw-=(j-(H-3)+1)*.9;if(u>hw)return null;
    const d=j+3-u*k;
    if(d<tk){if(u<=2&&j<H-2){if(j<3)return u<1?pal[4]:pal[3];return j%5===4?pal[0]:(u<.8?pal[4]:u<1.6?pal[3]:pal[1]);}
      if(d>=tk-1)return pal[0];
      return roofShade(tileCol(pal,((d/TT)|0)+(i<cx?0:5),Math.floor(d)%TT,Math.round(u*1.25),seed),i,j,H,i>cx,seed);}
    // papan lis kayu (bargeboard) mengikuti tepi dalam, puncak membulat
    if(d<tk+3)return d<tk+1?trimL:d<tk+2?trim:trimD;
    if(!o.wall)return null;let c=o.wall(i,Y+j);
    // bayangan plafon (soffit) bergradasi di bawah lis
    if(d<tk+9)c=shade(c,-.32+(d-tk-3)*.05);return c;});
  return{k,tk};}
/** Material dinding. Semua menerima koordinat global (i,j), seed, warna dasar. */
const WM={
  stone:(i,j,s,b)=>{const row=(j/4)|0,off=((hash(row,s)*7)|0);const lx=(i+off)%7,ly=j%4,bi=Math.floor((i+off)/7);if(ly===3||lx===6)return '#34343c';
    const h=hash(bi+s,row);let c=h<.3?'#5c5c66':h<.7?'#6c6c78':'#7c7c88';if(ly===0)c=shade(c,.16);else if(lx===5)c=shade(c,-.12);return c;},
  field:(i,j,s)=>{const row=(j/6)|0,off=(row%2)*5+((hash(row,s)*4)|0);const lx=(i+off)%10,ly=j%6,cx=Math.floor((i+off)/10);const dx=(lx-4.5)/4.9,dy=(ly-2.5)/3;
    if(dx*dx+dy*dy>1)return '#5e7470';const h=hash(cx,row+s);let c=h<.33?'#93aba6':h<.66?'#a6bcb6':'#b6cac2';if(dx+dy<-.85)c='#cfded8';else if(dx+dy>.75)c='#7e9690';return c;},
  plank:(i,j,s,b)=>{b=b||'#ead9b8';const p=i%6;if(p===0)return shade(b,-.4);let c=b;if(p===1)c=shade(b,.14);else if(p===5)c=shade(b,-.1);
    const h=hash(i>>1,(j>>2)+s);if(h<.06)c=shade(b,-.24);else if(h<.11)c=shade(b,-.12);if(hash(i,j+s)<.025)c=shade(b,-.3);return c;},
  brick:(i,j,s,b)=>{b=b||'#a8503a';const row=(j/4)|0,lx=(i+(row%2)*4)%8,ly=j%4;if(ly===3||lx===7)return '#d8c8b0';const h=hash(Math.floor((i+(row%2)*4)/8)+s,row);let c=h<.3?shade(b,-.12):h>.8?shade(b,.1):b;if(ly===0)c=shade(c,.12);return c;},
  plaster:(i,j,s,b)=>{b=b||B.pl1;const h=hash(i>>1,(j>>1)+s);return h<.06?shade(b,-.06):h>.9?shade(b,.14):b;},
  siding:(i,j,s,b)=>{b=b||B.wood2;const r=j%5;if(r===4)return shade(b,-.3);if(r===0)return shade(b,.2);return hash(i>>2,(j/5|0)+s)<.08?shade(b,-.12):b;},
};
function wallFill(x,X,Y,W,H,o){const kind=o.mat||(o.wall==='plaster'?'plaster':'siding');const s=o.seed||3,b=o.plC||o.wallC;paint(x,X,Y,W,H,(i,j)=>WM[kind](X+i,Y+j,s,b));
  x.fillStyle='rgba(255,255,255,.12)';x.fillRect(X,Y,2,H);x.fillStyle='rgba(20,8,0,.18)';x.fillRect(X+W-3,Y,3,H);}
/** Bayangan atap jatuh di dinding. */
function eaveShadow(x,X,Y,W,n=5){for(let k=0;k<n;k++){x.fillStyle='rgba(30,12,4,'+(.4-k*.07).toFixed(2)+')';x.fillRect(X,Y+k,W,1);}}
/** Balok kayu (tiang / palang) bertekstur. */
const TB=['#3e2210','#6a3a1c','#8a5028','#aa6a38','#c88a50'];
function beamV(x,X,Y,w,h){R(x,X,Y,w,h,TB[2]);R(x,X,Y,1,h,TB[3]);R(x,X+w-1,Y,1,h,TB[1]);for(let j=Y+3;j<Y+h-2;j+=7)P(x,X+1+(j%3),j,TB[1]);R(x,X,Y+h-1,w,1,TB[1]);}
function beamH(x,X,Y,w,h){R(x,X,Y,w,h,TB[2]);R(x,X,Y,w,1,TB[4]);R(x,X,Y+h-1,w,1,TB[1]);for(let i=X+4;i<X+w-3;i+=9)R(x,i,Y+2+(i%2),3,1,TB[1]);R(x,X,Y,1,h,TB[1]);R(x,X+w-1,Y,1,h,TB[1]);}
/** List profil membulat di bawah lis atap + konsol kecil (fasad di atas pintu tidak datar/kaku). */
function frieze(x,X,Y,W,col='#f2ead8'){const d=shade(col,-.3),l=shade(col,.25);RR(x,X-2,Y,W+4,5,d,2);RR(x,X-1,Y,W+2,4,col,2);R(x,X,Y,W,1,l);R(x,X+1,Y+3,W-2,1,shade(col,-.12));
  for(let i=X+5;i<X+W-6;i+=14){RR(x,i,Y+4,4,4,col,1);R(x,i,Y+4,1,3,l);R(x,i+3,Y+5,1,3,d);x.fillStyle='rgba(30,12,4,.25)';x.fillRect(i+1,Y+8,4,1);}
  x.fillStyle='rgba(30,12,4,.22)';x.fillRect(X,Y+5,W,1);}
/** Papan sudut dinding membulat. */
function cornerBoards(x,X,Y,W,H,col='#f2ead8'){[X,X+W-3].forEach(cx=>{RR(x,cx,Y,3,H,col,1);R(x,cx,Y,1,H,shade(col,.25));R(x,cx+2,Y,1,H,shade(col,-.25));});}
function downpipe(x,X,Y0,Y1){R(x,X,Y0,3,Y1-Y0,'#8a939e');R(x,X,Y0,1,Y1-Y0,'#c4ccd4');R(x,X+2,Y0,1,Y1-Y0,'#5e6670');
  for(let y=Y0+6;y<Y1-4;y+=12){R(x,X-1,y,5,2,'#5e6670');}R(x,X-2,Y1-3,6,3,'#8a939e');R(x,X-2,Y1-3,6,1,'#c4ccd4');}
function vine(x,X,Y0,Y1,seed=1,flower=null){const rr=rng(seed);let px=X;for(let y=Y1;y>Y0;y--){px+=Math.round(Math.sin((y+seed)/5)*.7);P(x,px,y,'#4e7a2a');
  if(y%3===0){const s=(y%6?-1:1);R(x,px+s,y-1,2,2,'#5c9a30');P(x,px+s*2,y-1,'#86c23a');if(flower&&rr()<.25)P(x,px+s*2,y-2,flower);}}}
/** Isi baris bentuk melengkung (atas setengah lingkaran). */
function archFill(x,X,Y,w,h,col){const r=w/2;for(let j=0;j<h;j++){let ins=0;if(j<r){const dy=r-j-.5;ins=Math.ceil(r-Math.sqrt(Math.max(0,r*r-dy*dy)));}R(x,X+ins,Y+j,w-ins*2,1,col);}}
/** Jendela: kusen kayu tebal, kaca biru bergradasi + kilau diagonal, ambang. o.arch = atas melengkung. */
function winSoft(x,X,Y,w,h,o={}){const fr=o.frame||TB[2],frD=shade(fr,-.4),frL=shade(fr,.3);
  if(o.shutter){[X-7,X+w+3].forEach(sx=>{RR(x,sx,Y-1,4,h+2,o.shutter,1);R(x,sx,Y-1,1,h+2,shade(o.shutter,.25));for(let k=1;k<h;k+=3)R(x,sx+1,Y+k,2,1,shade(o.shutter,-.35));});}
  const lit=o.lit;const gc=j=>lit?(j<h*.4?'#fff2c8':'#f6dc96'):(j<h*.3?'#9ad8f4':j<h*.65?'#4a9ad6':'#2f6aa8');
  if(o.arch){archFill(x,X-3,Y-3,w+6,h+5,frD);archFill(x,X-2,Y-2,w+4,h+3,fr);for(let j=0;j<h;j++){const r=w/2;let ins=0;if(j<r){const dy=r-j-.5;ins=Math.ceil(r-Math.sqrt(Math.max(0,r*r-dy*dy)));}R(x,X+ins,Y+j,w-ins*2,1,gc(j));}
    R(x,X+(w/2|0),Y,1,h,fr);R(x,X,Y+(w/2|0)+1,w,1,fr);for(let t=1;t<w/2-1;t++){P(x,X+(w/2|0)-t,Y+(w/2|0)+1-t,fr);P(x,X+(w/2|0)+t,Y+(w/2|0)+1-t,fr);}}
  else{RR(x,X-3,Y-3,w+6,h+6,frD,2);RR(x,X-2,Y-2,w+4,h+4,fr,1);R(x,X-2,Y-2,w+4,1,frL);for(let j=0;j<h;j++)R(x,X,Y+j,w,1,gc(j));R(x,X+(w/2|0),Y,1,h,fr);R(x,X,Y+(h/2|0),w,1,fr);}
  if(o.curtain){R(x,X,Y+2,3,h-2,o.curtain);R(x,X+w-3,Y+2,3,h-2,o.curtain);}
  if(!lit)glassShine(x,X,Y,w,h);else{x.fillStyle='rgba(255,255,255,.4)';for(let t=0;t<5;t++)x.fillRect(X+2+t,Y+6-t,1,1);}
  if(o.bars)for(let i=X+2;i<X+w;i+=3)R(x,i,Y,1,h,'#2a2a2e');
  RR(x,X-4,Y+h+1,w+8,3,frL,1);R(x,X-4,Y+h+3,w+8,1,frD);x.fillStyle='rgba(30,12,4,.25)';x.fillRect(X-3,Y+h+4,w+6,1);
  if(o.flowers){RR(x,X-2,Y+h+4,w+4,4,TB[3],1);R(x,X-2,Y+h+4,w+4,1,TB[4]);for(let k=0;k<w+2;k+=2){P(x,X-1+k,Y+h+3,k%4?B.green:'#86c23a');if(k%4===0)P(x,X-1+k,Y+h+2,['#e8473f','#ffd23a','#ff8ab0'][(k/4|0)%3]);}}}
/** Pintu seukuran karakter. kind: wood | arch | glass | shutter. lintel = balok di atas pintu. */
function doorSoft(x,X,Y,w,h,o={}){const fr=o.frame||TB[1];
  if(o.kind==='arch'){archFill(x,X-3,Y-3,w+6,h+3,shade(fr,-.3));archFill(x,X-2,Y-2,w+4,h+2,fr);const c=o.col||'#a8582a';archFill(x,X,Y,w,h,c);
    for(let i=X+3;i<X+w-1;i+=4)R(x,i,Y+4,1,h-4,shade(c,-.28));R(x,X+1,Y+(h*.42|0),w-2,1,shade(c,-.3));
    archFill(x,X+3,Y+2,w-6,10,'#3a7ac0');R(x,X+(w/2|0),Y+2,1,10,c);for(let t=0;t<5;t++)P(x,X+4+t,Y+9-t,'rgba(255,255,255,.7)');
    R(x,X+3,Y+h-11,4,2,shade(c,-.35));R(x,X+2,Y+(h*.6|0),2,2,'#e8c547');}
  else{RR(x,X-3,Y-3,w+6,h+3,shade(fr,-.3),2);RR(x,X-2,Y-2,w+4,h+2,fr,1);
  if(o.kind==='glass'){R(x,X,Y,w,h,B.gl1);R(x,X,Y,w,h*.3|0,B.gl2);R(x,X,Y+h-5,w,5,shade(B.gl1,-.25));R(x,X+(w/2|0),Y,1,h,fr);glassShine(x,X,Y,w/2|0,h);glassShine(x,X+(w/2|0)+1,Y,w/2|0,h);
    R(x,X+(w/2|0)-3,Y+h*.5|0,2,6,'#d8dee6');R(x,X+(w/2|0)+2,Y+h*.5|0,2,6,'#d8dee6');if(o.lit){x.fillStyle='rgba(255,236,170,.3)';x.fillRect(X,Y+(h*.3|0),w,h-(h*.3|0));}}
  else if(o.kind==='shutter'){for(let j=0;j<h;j+=2){R(x,X,Y+j,w,1,'#a2a2a8');R(x,X,Y+j+1,w,1,'#7c7c84');}R(x,X,Y+h-3,w,3,'#5a5a60');R(x,X+(w/2|0)-2,Y+h-6,4,2,'#3a3a40');
    if(o.rust){const rr=rng(9);for(let k=0;k<26;k++)P(x,X+rr()*w,Y+rr()*h,rr()<.5?'#8a5a3a':'#6a4a2a');}}
  else{const c=o.col||'#9a5a2c';R(x,X,Y,w,h,c);for(let i=X+3;i<X+w;i+=4)R(x,i,Y,1,h,shade(c,-.25));R(x,X,Y,w,1,shade(c,.3));R(x,X+1,Y+4,w-2,1,shade(c,-.3));R(x,X+1,Y+h-6,w-2,1,shade(c,-.3));
    if(o.window){R(x,X+3,Y+6,w-6,7,'#3a7ac0');R(x,X+3,Y+6,w-6,2,'#9ad8f4');for(let t=0;t<4;t++)P(x,X+4+t,Y+11-t,'#ffffff');}
    R(x,X+w-4,Y+(h*.55|0),2,2,'#e8c547');}}
  if(o.lintel)beamH(x,X-6,Y-7,w+12,5);
  RR(x,X-5,Y+h,w+10,3,B.st2,1);R(x,X-5,Y+h+2,w+10,1,B.st1);if(o.mat)R(x,X+1,Y+h,w-2,2,'#b83a32');}
/** Papan nama kecil (font 5×7) — teks selalu di dalam papan. */
function plank(x,cx,Y,text,o={}){const bg=o.bg||'#c8945a',fg=o.fg||'#3a1a08';const ic=typeof o.icon==='string'?IC9[o.icon]:null;const tw=TWm(text);const iw=ic?ic.width+3:0;const w=tw+iw+9,h=11;const X=Math.round(cx-w/2);
  if(o.hang){R(x,X+3,Y-o.hang,1,o.hang,'#4a4a50');R(x,X+w-4,Y-o.hang,1,o.hang,'#4a4a50');}
  x.fillStyle='rgba(30,12,4,.3)';x.fillRect(X+2,Y+h,w-2,2);
  RR(x,X,Y,w,h,shade(bg,-.5),2);RR(x,X+1,Y+1,w-2,h-2,bg,1);R(x,X+2,Y+1,w-4,1,shade(bg,.3));
  if(o.wood)for(let i=X+3;i<X+w-3;i+=7)P(x,i,Y+9,shade(bg,-.15));
  if(ic){const [r,g,bb]=hex(bg),lum=r*.3+g*.59+bb*.11;RR(x,X+2,Y+1,ic.width+2,9,lum>170?'#5a6a7a':shade(bg,.45),1);x.drawImage(ic,X+3,Y+1+((9-ic.height)>>1));}Tm(x,text,X+4+iw,Y+3,fg);return[X,w];}
/** Fondasi batu. */
function plinth(x,X,Y,W){RR(x,X-1,Y,W+2,6,'#8e8a84',1);R(x,X,Y,W,1,'#bdb6ae');for(let i=X+3;i<X+W;i+=8)R(x,i,Y+1,1,4,'#5e5a58');R(x,X,Y+3,W,1,'#7e7a74');}
/** Teras lantai batu dengan retakan. */
function patio(x,X,Y,W,h=6,seed=1){RR(x,X,Y,W,h,'#a8a49c',2);R(x,X+2,Y,W-4,1,'#d4d0c8');R(x,X+1,Y+h-1,W-2,1,'#7e7a74');const rr=rng(seed);
  for(let i=X+10;i<X+W-6;i+=14+(rr()*6|0))R(x,i,Y+1,1,h-2,'#8a867e');for(let k=0;k<3;k++){let a=X+6+rr()*(W-14),b=Y+1;for(let t=0;t<4;t++){P(x,a,b,'#7a766e');a+=rr()<.5?1:-1;b+=t%2;}}
  for(let k=0;k<W/10;k++)P(x,X+2+rr()*(W-4),Y+1+rr()*(h-2),'#bcb8b0');}
/** Cerobong bata. */
function chimney(x,X,Y,h){R(x,X,Y,10,h,'#8a3a2a');for(let j=0;j<h;j++)for(let i=0;i<10;i++){const row=j>>2;if(j%4===3||((i+(row%2)*3)%6===5))P(x,X+i,Y+j,'#5a2418');else if(j%4===0)P(x,X+i,Y+j,'#a85a44');}
  RR(x,X-2,Y-3,14,4,'#3a3a44',1);R(x,X-1,Y-3,12,1,'#5e5e6a');R(x,X+7,Y,3,h,'rgba(0,0,0,.2)');}
function awningSoft(x,X,Y,W,cols,h=7){for(let i=0;i<W;i++){const col=Math.floor(i/6)%2?cols[0]:cols[1];R(x,X+i,Y,1,h,col);const m=i%6;if(m>0&&m<5)P(x,X+i,Y+h,col);if(m>1&&m<4)P(x,X+i,Y+h+1,col);}
  R(x,X,Y,W,1,'rgba(255,255,255,.35)');R(x,X,Y+h-1,W,1,'rgba(0,0,0,.12)');x.fillStyle='rgba(30,12,4,.22)';x.fillRect(X+1,Y+h+2,W-2,2);}
/**
 * Bangunan gaya referensi.
 *  w, wallH (≥56), mat 'stone'|'field'|'plank'|'brick'|'plaster'|'siding', plC (warna dasar), rp (palet genteng),
 *  roofType 'gable' (pelana menghadap depan) | 'hip' (perisai, opsi dormer:true), roofH, gableWall (material segitiga), timber:true,
 *  windows: [x | {x,arch,shutter,y}], winW/winH, door {kind,w,off,col,lintel}, wing {side,w,kind:'porch'|'room',goods:[fn]},
 *  chimney 'L'|'R', round/clock (hiasan segitiga), sign, pipe, vine, awning, patio (default true), post[(x,g)=>…]
 */
/** Skala global v3.2: bangunan sedikit lebih besar, atap jauh lebih besar (permintaan user). */
const BLD_W=1.12,BLD_H=6,ROOF_K=1.7;
function scaleBld(o){const k=BLD_W,sx=v=>Math.round(v*k);const n={...o,w:sx(o.w),wallH:(o.wallH||56)+BLD_H};
  if(o.windows)n.windows=o.windows.map(p=>typeof p==='number'?sx(p):{...p,x:sx(p.x)});if(o.door)n.door={...o.door,off:o.door.off?sx(o.door.off):0};
  if(o.timberPosts)n.timberPosts=o.timberPosts.map(sx);if(o.wing)n.wing={...o.wing,w:sx(o.wing.w)};if(o.roofH)n.roofH=Math.round(o.roofH*ROOF_K);n._s=1;return n;}
function building(o){if(!o._s)o=scaleBld(o);const OH=o.oh||((o.roofType||'gable')==='gable'?20:14),ww=o.w,wallH=Math.max(o.wallH||62,o.sign?(o.awning?70:66):62);const pal=toPal(o.rp||o.roof||RP.terra);
  const wing=o.wing,wingW=wing?wing.w:0,type=o.roofType||'gable';
  const half=Math.round(ww/2)+OH,roofH=type==='gable'?(o.roofH||Math.round(half*1.08)):(o.roofH||50),extra=type==='hip'&&o.dormer?22:0,chT=o.chimney?10:0;
  const top=Math.max(extra,chT>0&&type==='hip'?8:0);
  const W=ww+OH*2+wingW+4,bx=wing&&wing.side==='L'?wingW:0,X0=bx+OH+2,cx=X0+(ww>>1);
  const wy=top+roofH-3,fy=wy+wallH-6,H=fy+12;const[c,x]=cv(W,H);
  // dinding utama
  wallFill(x,X0,wy,ww,fy-wy,o);plinth(x,X0,fy,ww);
  // sayap samping (di belakang atap utama)
  if(wing){const sx=wing.side==='L'?2:X0+ww,sw=wingW+OH-2,wy2=wy+14,rp2=toPal(wing.rp||pal);
    if(wing.kind==='room'){wallFill(x,wing.side==='L'?sx:sx,wy2,sw,fy-wy2,{mat:wing.mat||o.mat,plC:wing.plC||o.plC,wallC:o.wallC,seed:7});winSoft(x,sx+(sw>>1)-6,wy2+14,12,14,{shutter:wing.shutter});}
    else{R(x,sx,wy2,sw,fy-wy2,'#4a2e1c');R(x,sx,wy2,sw,3,'#2a180e');beamH(x,sx,wy2+20,sw,3);(wing.goods||[]).forEach(f=>f(x,sx,wy2,sw,fy));
      beamV(x,wing.side==='L'?sx:sx+sw-4,wy2,4,fy-wy2);}
    roofHip(x,wing.side==='L'?0:X0+ww-2,wy2-12,sw+4,16,rp2,3);eaveShadow(x,sx,wy2+4,sw,3);}
  // rangka kayu
  if(o.timber){beamV(x,X0,wy,5,fy-wy);beamV(x,X0+ww-5,wy,5,fy-wy);(o.timberPosts||[]).forEach(p=>beamV(x,X0+p,wy,5,fy-wy));}
  // jendela
  const winW=o.winW||14,winH=o.winH||18;
  (o.windows||[]).forEach(p=>{const q=typeof p==='number'?{x:p}:p;winSoft(x,X0+q.x,wy+(q.y||o.winY||14),q.w||winW,q.h||winH,{frame:o.frame,shutter:q.shutter||o.shutter,flowers:o.flowers,lit:o.lit,curtain:o.curtain,arch:q.arch||o.archWin});});
  // pintu
  const d=o.door||{};const dw=d.w||DOOR_W,dh=DOOR_H,dx=cx-(dw>>1)+(d.off||0),dy=fy-dh;
  if(o.awning)awningSoft(x,X0-2,wy+6,ww+4,o.awning);
  doorSoft(x,dx,dy,dw,dh,{kind:d.kind||'wood',col:d.col,window:d.window!==false,frame:o.frame,lit:o.lit,lintel:d.lintel,mat:d.mat!==false});
  if(o.timber)beamH(x,X0-4,wy+1,ww+8,6);else{cornerBoards(x,X0,wy,ww,fy-wy,o.trimC);frieze(x,X0,wy+3,ww,o.trimC);}
  // atap
  if(o.chimney){const chx=o.chimney==='L'?X0+6:X0+ww-16;chimney(x,chx,type==='hip'?top-8+4:top+roofH*.25|0,type==='hip'?20:roofH*.5|0);}
  if(type==='gable'){const gw=o.gableWall||o.mat;
    roofGable(x,cx,top,half+2,roofH,pal,{tk:o.tk||26,seed:o.seed||1,wall:(i,j)=>WM[gw](i,j,(o.seed||3)+1,o.gablePlC||o.plC||o.wallC)});
    const vy=top+roofH*.6|0;
    if(o.gableTimber){beamH(x,cx-(roofH*.55|0),vy+6,(roofH*.55|0)*2,4);beamV(x,cx-2,top+15,4,roofH-15);}
    if(o.clock){disc(x,cx,vy-2,6,TB[1]);disc(x,cx,vy-2,5,'#f7f2e4');R(x,cx,vy-6,1,4,'#3a2a1f');R(x,cx,vy-2,3,1,'#3a2a1f');P(x,cx-2,vy-4,'#ffffff');}
    else if(o.round){disc(x,cx,vy,8,TB[1]);disc(x,cx,vy,7,TB[3]);disc(x,cx,vy,6,'#4a9ad6');disc(x,cx-1,vy-1,3,'#7ab8e8');R(x,cx-6,vy,13,1,TB[3]);R(x,cx,vy-6,1,13,TB[3]);P(x,cx-3,vy-3,'#ffffff');P(x,cx-2,vy-4,'#ffffff');RR(x,cx-9,vy+8,19,2,TB[3],1);}
    else if(o.gableWin)winSoft(x,cx-6,vy-4,12,10,{frame:o.frame});
    eaveShadow(x,X0,wy+3,ww,5);}
  else{roofHip(x,X0-OH,top,ww+OH*2,roofH,pal,o.seed||1);eaveShadow(x,X0,wy+3,ww,5);
    if(o.dormer){const dh2=roofH+12,dhalf=Math.min(38,ww*.3|0);roofGable(x,cx,top-extra+2,dhalf,dh2-4,pal,{tk:15,seed:(o.seed||1)+3,wall:(i,j)=>WM[o.dormerMat||'stone'](i,j,5)});
      winSoft(x,cx-6,top-extra+dh2-17,12,9,{frame:o.frame});}}
  if(o.pipe){const px=o.pipe==='L'?X0+1:X0+ww-4;downpipe(x,px,wy+3,fy+5);}
  if(o.vine){const vx=o.vine==='L'?X0+4:X0+ww-7;vine(x,vx,wy+10,fy,o.seed||5,o.vineFlower);}
  if(o.patio!==false)patio(x,X0-6,fy+5,ww+12,6,o.seed||1);
  (o.post||[]).forEach(f=>f(x,{X0,ww,wy,fy,dx,dy,dw,dh,W,H,top,cx}));
  if(o.sign){const s=o.sign;plank(x,dx+dw/2,o.awning?wy+17:dy-(d.lintel?20:15),s.text||'',{bg:s.bg,fg:s.fg,icon:s.icon,bold:s.bold,wood:!s.bg,hang:s.hang});}
  softOutline(c);return c;}
const toothSign=IC.tooth;
/* ================= PROPERTI ALAM ================= */
function tree(pal,rad,seed,fruit){const W=rad*2+8,H=rad*2+20;const[c,x]=cv(W,H);const cx=W/2|0,cy=rad+3;const rr=rng(seed);
  R(x,cx-3,H-18,6,16,'#6b4426');R(x,cx+1,H-18,2,16,'#4e301a');R(x,cx-1,H-18,1,16,'#86583a');RR(x,cx-6,H-4,12,3,'#6b4426',1);P(x,cx-1,H-12,'#4e301a');
  const dk=shade(pal.g0,-.3);
  disc(x,cx,cy+1,rad,dk);disc(x,cx,cy-1,rad-1,pal.g0);disc(x,cx-1,cy-3,rad-3,pal.g1);
  for(let k=0;k<9;k++)disc(x,cx-rad*.55+rr()*rad*1.1,cy-rad*.7+rr()*rad*.85,Math.max(2,rad*.26+rr()*2)|0,pal.g2);
  for(let k=0;k<6;k++)disc(x,cx-rad*.6+rr()*rad*.7,cy-rad*.7+rr()*rad*.5,Math.max(1,rad*.13+rr()*1.5)|0,pal.g3);
  for(let k=0;k<rad*3;k++){const a=rr()*6.28,d=rr()*rad*.9;P(x,cx+Math.cos(a)*d,cy+Math.sin(a)*d,pal.g0);}
  // bayangan bagian bawah kanopi
  {const id=x.getImageData(0,0,W,H).data;for(let j=Math.round(cy+rad*.62);j<=cy+rad+1;j++)for(let i=0;i<W;i++){if(id[(j*W+i)*4+3]&&(i+j)%2===0&&Math.abs(i-cx)>2)P(x,i,j,dk);}}
  if(fruit)for(let k=0;k<6;k++){const a=rr()*6.28,d=rr()*rad*.7;R(x,cx+Math.cos(a)*d,cy+Math.sin(a)*d,2,2,fruit);}
  return softOutline(c);}
function palm(pal,seed){const[c,x]=cv(36,48);const rr=rng(seed);
  for(let i=0;i<30;i++){const X=17+Math.round(Math.sin(i/12)*3),Y=46-i;R(x,X,Y,4,1,i%4===0?'#7a5530':'#a07a48');P(x,X+3,Y,'#6b4a2a');}
  const top=[18,15];for(let k=0;k<7;k++){const a=-Math.PI+k*(Math.PI/6)+(rr()-.5)*.3;for(let t=0;t<15;t++){const X=top[0]+Math.cos(a)*t,Y=top[1]+Math.sin(a)*t*.6+t*t*.04;R(x,X,Y,2,2,t<4?pal.g1:pal.g2);if(t>3&&t%2===0){P(x,X+Math.cos(a+1.6)*2,Y+2,pal.g1);P(x,X+Math.cos(a-1.6)*2,Y+2,pal.g3);}}}
  R(x,16,14,3,3,'#8a5a2a');return softOutline(c);}
function bush(pal,seed,flowers){const[c,x]=cv(20,14);const rr=rng(seed);disc(x,6,8,5,pal.g0);disc(x,13,8,5,pal.g0);disc(x,9,6,5,pal.g1);disc(x,7,5,2,pal.g2);disc(x,12,6,2,pal.g2);P(x,8,3,pal.g3);
  if(flowers)for(let k=0;k<5;k++)R(x,3+rr()*13,3+rr()*8,1,1,k%2?flowers:'#fff4c8');return softOutline(c);}
function banyan(pal){const[c,x]=cv(84,74);const rr=rng(11);R(x,36,40,12,32,'#5a3a22');R(x,44,40,4,32,'#3e2614');R(x,30,68,24,4,'#5a3a22');
  disc(x,42,28,26,pal.g0);disc(x,26,30,16,pal.g0);disc(x,58,30,16,pal.g0);disc(x,40,24,22,pal.g1);
  for(let k=0;k<16;k++)disc(x,16+rr()*52,10+rr()*30,(3+rr()*4)|0,pal.g2);for(let k=0;k<9;k++)disc(x,16+rr()*40,8+rr()*20,(1+rr()*2)|0,pal.g3);
  for(let k=0;k<9;k++){const X=18+k*6+(rr()*3|0);const L=12+(rr()*18|0);for(let j=0;j<L;j++)P(x,X,44+j,'#6a4a2a');}
  return softOutline(c);}
function lamp(){const[c,x]=cv(10,32);R(x,4,9,2,20,'#3a3a44');R(x,4,9,1,20,'#5e5e6a');RR(x,2,28,6,3,'#3a3a44',1);R(x,3,12,4,1,'#5e5e6a');
  RR(x,1,2,8,8,'#3a3a44',1);R(x,2,3,6,6,'#ffe27a');R(x,2,3,2,2,'#fff6c8');RR(x,0,1,10,2,'#2a2a32',1);RR(x,3,0,4,2,'#2a2a32',1);return softOutline(c);}
function bench(){const[c,x]=cv(28,16);RR(x,1,0,26,4,B.wood2,1);R(x,2,0,24,1,B.wood3);R(x,1,3,26,1,B.wood1);RR(x,0,7,28,4,B.wood2,1);R(x,1,7,26,1,B.wood3);R(x,0,10,28,1,B.wood1);
  R(x,3,4,2,3,'#3a3a44');R(x,23,4,2,3,'#3a3a44');RR(x,2,10,3,6,'#3a3a44',1);RR(x,23,10,3,6,'#3a3a44',1);return softOutline(c);}
function fence(len,col=B.wood2){const[c,x]=cv(len,14);const cl=shade(col,.25),cd=shade(col,-.25);RR(x,0,4,len,2,col,1);R(x,0,4,len,1,cl);RR(x,0,9,len,2,cd,1);
  for(let i=1;i<len-2;i+=7){RR(x,i,1,4,13,cl,1);R(x,i+3,2,1,11,cd);P(x,i,1,col);P(x,i+3,1,col);}return softOutline(c);}
function flagPole(){const[c,x]=cv(16,46);R(x,1,2,2,44,'#c9ced6');R(x,0,0,4,2,'#ffd23a');R(x,3,3,12,4,'#d8282f');R(x,3,7,12,4,'#f7f7f2');P(x,14,10,'#d9dade');return softOutline(c);}
function cart(){const[c,x]=cv(40,32);R(x,2,2,36,4,'#d8692e');for(let i=2;i<38;i+=6)R(x,i,2,3,4,'#f2a24a');R(x,4,6,2,12,B.wood1);R(x,34,6,2,12,B.wood1);R(x,2,16,36,8,B.wood2);R(x,2,16,36,2,B.wood3);R(x,8,12,6,4,'#c9ced6');R(x,24,12,4,4,'#7a3a1e');R(x,30,12,4,4,'#e8c547');disc(x,10,27,4,B.wood0);disc(x,10,27,2,B.wood3);disc(x,30,27,4,B.wood0);disc(x,30,27,2,B.wood3);return softOutline(c);}
function herbPlant(pal,stage){const[c,x]=cv(12,12);if(stage===0){P(x,5,8,pal.g2);P(x,6,7,pal.g3);}else if(stage===1){R(x,5,5,2,5,pal.g1);P(x,3,6,pal.g2);P(x,4,5,pal.g2);P(x,8,5,pal.g2);P(x,7,4,pal.g3);}else{ellipse(x,6,6,4,4,pal.g1);ellipse(x,5,5,2,2,pal.g2);P(x,4,3,pal.g3);P(x,8,4,'#7ad06a');}return softOutline(c);}
/* ================= TERRAIN ================= */
/** Jenis terrain: g rumput · d jalan tanah · c cobblestone · p paving blok · s pasir · f tanah kebun. Rect: [t,x,y,w,h,radius?] (sudut membulat). */
const TRAD={d:7,c:5,p:8,s:3,f:2};
function inRR(X,Y,r){const rad=r[5]!=null?r[5]:(TRAD[r[0]]||0),x0=r[1],y0=r[2],x1=r[1]+r[3],y1=r[2]+r[4];if(X<x0||X>=x1||Y<y0||Y>=y1)return false;if(!rad)return true;
  const cx=X<x0+rad?x0+rad:X>=x1-rad?x1-rad-1:null,cy=Y<y0+rad?y0+rad:Y>=y1-rad?y1-rad-1:null;if(cx==null||cy==null)return true;const dx=X-cx,dy=Y-cy;return dx*dx+dy*dy<=rad*rad+rad*.6;}
function terrainAt(X,Y,def){for(let i=def.length-1;i>=0;i--){const r=def[i];if(r[0]==='e'){if(((X-r[1])/r[3])**2+((Y-r[2])/r[4])**2<=1)return r[5]||'p';continue;}if(inRR(X,Y,r))return r[0];}return 'g';}
/** Noise halus (bilinear) untuk tepi organik. */
function vnoise(i,j,s,sc){const a=i/sc,b=j/sc,ia=Math.floor(a),ib=Math.floor(b),fa=a-ia,fb=b-ib;const u=fa*fa*(3-2*fa),v=fb*fb*(3-2*fb);
  const h00=hash(ia+s,ib),h10=hash(ia+1+s,ib),h01=hash(ia+s,ib+1),h11=hash(ia+1+s,ib+1);return (h00*(1-u)+h10*u)*(1-v)+(h01*(1-u)+h11*u)*v;}
function paintTerrain(x,W,H,pal,def,seed){const img=x.createImageData(W,H),a=img.data;const tm=new Array(W*H);
  for(let j=0;j<H;j++)for(let i=0;i<W;i++){const wx=Math.round((vnoise(i,j,seed,7)-.5)*4),wy=Math.round((vnoise(i,j,seed+50,7)-.5)*4);tm[j*W+i]=terrainAt(i+wx,j+wy,def);}
  const col={};['g0','g1','g2','g3','d0','d1','d2','s0','s1','s2','ol'].forEach(k=>col[k]=hex(pal[k]));const hujan=pal===PAL.hujan;
  const mix=(p,q,t)=>[p[0]+(q[0]-p[0])*t|0,p[1]+(q[1]-p[1])*t|0,p[2]+(q[2]-p[2])*t|0];
  const gDark=mix(col.g0,col.g1,.5),gLite=mix(col.g1,col.g2,.55),soil=hex('#5a3a24'),soilD=hex('#3e2716');
  const sand=[hex(hujan?'#b8a07a':'#ecd29a'),hex(hujan?'#a08860':'#dcb878'),hex(hujan?'#ccb894':'#f6e2b4')];
  const pav=[hex(hujan?'#8a6a5e':'#c8907a'),hex(hujan?'#7a5c50':'#b47c66'),hex(hujan?'#9a7a6e':'#d8a48c'),hex(hujan?'#5a443c':'#8a5e4e')];
  const flw=[hex('#ffffff'),hex('#ffe06a'),hex('#ffb0c8')];
  for(let j=0;j<H;j++)for(let i=0;i<W;i++){const t=tm[j*W+i];const h1=hash(i+seed,j*7),h2=hash(i*3,j+seed);let c;
    if(t==='g'){// rumput: patch besar terang/gelap + helai + bunga & kerikil kecil
      const n=vnoise(i,j,seed+9,22),n2=vnoise(i,j,seed+3,6);c=n<.3?gDark:n>.72?gLite:col.g1;if(n2>.72&&c!==gDark)c=col.g2;
      if(h1<.04)c=col.g2;else if(h1<.065)c=col.g0;
      const lx=i&7,ly=j&7,ti=hash(i>>3,(j>>3)+seed);if(ti<.3){if(lx===3&&ly>=3&&ly<=5)c=col.g0;else if(lx===3&&ly===2)c=col.g3;else if((lx===2||lx===4)&&ly===4)c=col.g0;}
      const sp=hash(i*7+seed,j*13);if(sp<.0035)c=flw[(sp*1000|0)%3];else if(sp<.006)c=col.s2;else if(sp<.0075)c=col.s1;}
    else if(t==='d'){const n=vnoise(i,j,seed+21,5);c=n<.3?mix(col.d1,col.d0,.35):n>.75?mix(col.d1,col.d2,.5):col.d1;if(h1<.08)c=col.d2;else if(h1<.14)c=col.d0;if(hash(i*5,j*3+seed)<.012)c=col.s1;}
    else if(t==='c'){// cobblestone membulat
      const row=Math.floor(j/6),off=(row%2)*4+((hash(row,seed)*3)|0);const lx=(i+off)%8,ly=j%6,cx=Math.floor((i+off)/8);const dx=(lx-3.5)/3.7,dy=(ly-2.5)/2.7;
      if(dx*dx+dy*dy>1)c=col.s0;else{const h=hash(cx,row+seed);c=h<.3?col.s1:h<.75?mix(col.s1,col.s2,.45):col.s2;if(dx+dy<-.85)c=mix(c,[255,255,255],.25);else if(dx+dy>.7)c=mix(c,col.s0,.45);}}
    else if(t==='p'){// paving blok bata (susunan bata)
      const row=Math.floor(j/4),lx=(i+(row%2)*5)%10,ly=j%4;if(ly===3||lx===9)c=pav[3];else{const h=hash(Math.floor((i+(row%2)*5)/10)+seed,row);c=h<.35?pav[1]:h>.8?pav[2]:pav[0];if(ly===0)c=mix(c,[255,255,255],.15);}}
    else if(t==='s'){c=h1<.12?sand[1]:h1>.9?sand[2]:sand[0];if(vnoise(i,j,seed,9)>.7&&h2<.4)c=sand[1];}
    else if(t==='f'){c=(j%6<4)?soil:soilD;if(h1<.1)c=soilD;}
    // transisi tepi: helai rumput menjorok ke jalan, remah tanah ke rumput
    if(t!=='g'){const n=[tm[j*W+Math.max(0,i-1)],tm[j*W+Math.min(W-1,i+1)],tm[Math.max(0,j-1)*W+i],tm[Math.min(H-1,j+1)*W+i]];
      if(n.includes('g')){if(t==='d'||t==='s'||t==='f')c=h2<.45?col.g0:h2<.75?col.g1:col.d0;else c=h2<.5?col.s0:col.g0;}
      else if(t==='d'||t==='s'){const n2=[tm[j*W+Math.max(0,i-2)],tm[j*W+Math.min(W-1,i+2)],tm[Math.max(0,j-2)*W+i],tm[Math.min(H-1,j+2)*W+i]];if(n2.includes('g')&&h2<.3)c=col.g1;}}
    else{const n=[tm[j*W+Math.max(0,i-1)],tm[j*W+Math.min(W-1,i+1)],tm[Math.max(0,j-1)*W+i],tm[Math.min(H-1,j+1)*W+i]];
      if(n.some(q=>q!=='g')){c=h2<.35?gDark:c;}else{const n2=[tm[j*W+Math.max(0,i-2)],tm[Math.min(H-1,j+2)*W+i]];if(n2.includes('d')&&h2<.18)c=col.d2;}}
    const k=(j*W+i)*4;a[k]=c[0];a[k+1]=c[1];a[k+2]=c[2];a[k+3]=255;}
  x.putImageData(img,0,0);}
/* ================= UI ================= */
function panel(x,X,Y,W,H,kind){const dark='#4a2410',fr='#9a4e1c',fr2='#d4803a';
  R(x,X+1,Y,W-2,H,dark);R(x,X,Y+1,W,H-2,dark);R(x,X+1,Y+1,W-2,H-2,fr);R(x,X+2,Y+2,W-4,H-4,fr2);
  const inner=kind==='paper'?['#fbe6b8','#f6d9a2','#f0cb8c']:['#f6b86a','#f0aa58','#e89c4a'];const ih=H-6;
  for(let j=0;j<ih;j++){const t=j/ih;R(x,X+3,Y+3+j,W-6,1,t<.3?inner[0]:t<.7?inner[1]:inner[2]);}
  R(x,X+3,Y+3,W-6,1,'#ffe0a8');R(x,X+3,Y+H-4,W-6,1,'#c87a34');}
function bar(x,X,Y,W,H,f,col,bg='#5a2a14'){R(x,X,Y,W,H,'#3a1a0c');R(x,X+1,Y+1,W-2,H-2,bg);R(x,X+1,Y+1,Math.round((W-2)*f),H-2,col);R(x,X+1,Y+1,Math.round((W-2)*f),1,'#ffffff55');}
function stars(x,X,Y,n){for(let i=0;i<5;i++){const s=fromRows(['..Y..','.YYY.','YYYYY','.YYY.','.Y.Y.'],{Y:i<n?'#f6c12c':'#8a5a3a'});x.drawImage(s,X+i*7,Y);}}

/* ================= HELPER V2 ================= */
const hxc={};function HX(c){return hxc[c]||(hxc[c]=hex(c));}
function paint(x,X,Y,W,H,fn){const img=x.getImageData(X,Y,W,H),a=img.data;for(let j=0;j<H;j++)for(let i=0;i<W;i++){const c=fn(i,j);if(!c)continue;const k=(j*W+i)*4,h=HX(c);a[k]=h[0];a[k+1]=h[1];a[k+2]=h[2];a[k+3]=255;}x.putImageData(img,X,Y);}
function line(x,x0,y0,x1,y1,w,col){const n=Math.ceil(Math.max(Math.abs(x1-x0),Math.abs(y1-y0)))*2+1;for(let i=0;i<=n;i++){const t=i/n;R(x,Math.round(x0+(x1-x0)*t-w/2),Math.round(y0+(y1-y0)*t-w/2),w,w,col);}}
function spr(w,h,f,ol){const[c,x]=cv(w,h);f(x);return ol?outline(c,ol):softOutline(c);}
function glow(img,col='#ffe14a'){const[c,x]=cv(img.width+2,img.height+2);x.drawImage(img,1,1);return outline(c,col);}
const WD={d:'#4a2a18',m:'#7a4a28',l:'#a8703e',h:'#d09a5c',hh:'#ecc085'};
const HAIRD={brn:'#2e1a12',blk:'#0e090c',gray:'#8e857e'};
/* ================= IKON PAPAN NAMA 9×9 ================= */
const IC9P={k:'#3a2414',w:'#ffffff',r:'#d23a3a',g:'#3f8f4a',b:'#3a6ab0',y:'#f2c84a',o:'#e8762a',c:'#b8682a',n:'#7a4a24',s:'#9aa3b0',l:'#9ad8f4',p:'#e88aa8',f:'#f6d08a'};
const IC9src={
  tooth:['.www.www.','wwwwwwwww','wwwwwwwws','.wwwwwws.','.wwwwwws.','.www.wws.','.ww...ws.','.w.....s.'],
  cup:['..w.w....','.w.w.....','.........','wwwwwww..','wnnnnnwww','wwwwwww.w','wwwwwwwww','.wwwww...','sssssss..'],
  bread:['.........','..ccccc..','.cffcffc.','cffcffcfc','cfffffffc','ccccccccc'],
  basket:['...nnn...','..n...n..','.n.....n.','nnnnnnnnn','nyrgyrgyn','.nnnnnnn.','.n.n.n.n.','..nnnnn..'],
  mail:['wwwwwwwww','wowwwwwow','wwowwwoww','wwwowowww','wwwwowwww','wwwwwwwww'],
  leaf:['.......g.','.....ggg.','...ggggg.','..gggwgg.','.gggwggg.','.ggwggg..','.gwgg....','.n.......','n........'],
  thread:['.nnnnnnn.','..rrrrr..','..rwrrr..','..rrwrr..','..rrrwr..','..rrrrr..','.nnnnnnn.'],
  book:['.bbb.bbb.','bwwwbwwwb','bwssbwssb','bwwwbwwwb','bwssbwssb','bwwwbwwwb','.bbbbbbb.'],
  badge:['....y....','...yyy...','yyyyyyyyy','.yyyyyyy.','..yyyyy..','.yyy.yyy.','.yy...yy.'],
  helmet:['...yyy...','..yywyy..','.yyywyyy.','.yyyyyyy.','yyyyyyyyy','nnnnnnnnn'],
  chart:['.......r.','.....g.r.','...g.g.r.','.g.g.g.r.','.g.g.g.r.','kkkkkkkkk'],
  cross:['...rrr...','...rrr...','rrrrrrrrr','rrrrrrrrr','rrrrrrrrr','...rrr...','...rrr...'],
  camera:['..kkk....','kkkkkkkkk','kkwwwkkyk','kwllwkkkk','kwllwkkkk','kkwwwkkkk','kkkkkkkkk'],
  bus:['.bbbbbbb.','blllllllb','blllllllb','bbbbbbbbb','bybbbbbyb','bbbbbbbbb','.k.....k.'],
  flag:['krrrrrr..','krrrrrr..','kwwwwww..','kwwwwww..','k........','k........','k........'],
  house:['....r....','...rrr...','..rrrrr..','.rrrrrrr.','..wwwww..','..wnwlw..','..wnwww..'],
};
const IC9={};for(const k in IC9src)IC9[k]=fromRows(IC9src[k],IC9P);
