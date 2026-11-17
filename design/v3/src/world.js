/* ================= ZONA KOTA V3.1 (768×432 per zona, bisa digulir, kamera mengikuti pemain) =================
   Semua objek punya drop shadow ke kanan-bawah. Label bangunan & kotak "1 layar" hanya alat bantu draf (default mati). */
const ZW=768,ZH=432;
function coffeeBush(pal,seed){return spr(16,18,x=>{const rr=rng(seed);R(x,7,13,2,5,'#6b4426');disc(x,8,9,6,shade(pal.g0,-.2));disc(x,8,8,6,pal.g0);disc(x,7,7,5,pal.g1);disc(x,6,5,2,pal.g2);for(let k=0;k<6;k++)R(x,3+rr()*10|0,4+rr()*8|0,1,1,k%3?'#c8282f':'#e84a3a');});}
/** Teleskop detail: tripod kuningan, tabung berpita, lensa pencari, penutup embun, lensa okuler. */
function telescope(){return spr(30,34,x=>{
  line(x,15,20,5,33,2,'#8a6a2a');line(x,15,20,25,33,2,'#8a6a2a');line(x,15,20,15,33,2,'#6a4e1e');R(x,13,18,5,4,'#5a5a64');R(x,13,18,5,1,'#8a8a94');
  line(x,4,22,24,6,5,'#2e3a5a');line(x,4,21,24,5,2,'#4a5a8a');line(x,5,20,23,6,1,'#7a8ac0');// tabung
  [[9,18],[17,12]].forEach(([a,b])=>{line(x,a,b-2,a+1,b+3,2,'#e3aa3c');});// pita kuningan
  line(x,22,2,27,0,6,'#1e2a40');R(x,25,0,3,3,'#9ad8f4');P(x,26,0,'#ffffff');// penutup embun & lensa
  line(x,7,14,15,9,2,'#5a5a64');R(x,15,8,2,2,'#9ad8f4');// pencari
  R(x,1,22,4,4,'#3a3a44');P(x,1,23,'#9ad8f4');R(x,4,27,6,2,'#3a3a44');});}
function fountain(){return spr(64,44,x=>{
  ellipse(x,32,30,30,12,'#7e7a74');ellipse(x,32,29,29,11,'#bdb6ae');ellipse(x,32,28,27,9,'#d4d0c8');// bibir kolam
  ellipse(x,32,29,24,7,'#2a68aa');ellipse(x,31,28,21,5,'#4aa0df');for(let k=0;k<6;k++)R(x,16+k*6,26+(k%2)*3,4,1,'#a3ddf6');
  R(x,29,12,6,16,'#bdb6ae');R(x,29,12,2,16,'#d4d0c8');R(x,33,12,2,16,'#8e8a84');ellipse(x,32,12,10,3,'#8e8a84');ellipse(x,32,11,9,2,'#d4d0c8');ellipse(x,32,11,7,1,'#4aa0df');
  R(x,31,2,2,9,'#a3ddf6');for(let k=0;k<8;k++){const a=k/8*Math.PI*2;P(x,32+Math.cos(a)*(5+k%3),5+Math.abs(Math.sin(a))*4,'#d8f2ff');}P(x,31,1,'#ffffff');
  for(let k=0;k<10;k++)P(x,8+k*5,36+(k%2),'#9a958e');});}
function marketTent(col,goods){return spr(44,40,x=>{
  R(x,3,10,2,30,TB[2]);R(x,39,10,2,30,TB[2]);R(x,3,10,1,30,TB[3]);R(x,39,10,1,30,TB[3]);
  for(let i=0;i<44;i++){const c=Math.floor(i/6)%2?col:'#f4f1e6';R(x,i,2+Math.round(Math.abs(i-22)/22*3),1,9-Math.round(Math.abs(i-22)/22*3),c);const m=i%6;if(m>0&&m<5)P(x,i,11,c);if(m>1&&m<4)P(x,i,12,c);}
  RR(x,8,0,28,3,shade(col,-.3),1);
  RR(x,1,24,42,8,TB[3],1);R(x,2,24,40,1,TB[4]);R(x,1,31,42,1,TB[1]);RR(x,4,32,3,8,TB[1],1);RR(x,37,32,3,8,TB[1],1);
  (goods||['#e8473f','#f2c84a','#3f8f4a','#f08a2a']).forEach((g,k)=>{for(let t=0;t<3;t++)disc(x,8+k*9+t*2,22-(t%2),2,g);});
  x.fillStyle='rgba(30,12,4,.22)';x.fillRect(2,13,40,3);});}
function trashBin(){return spr(12,16,x=>{RR(x,1,4,10,12,'#3f8f4a',1);R(x,2,5,1,10,'#6cc06a');for(let i=3;i<10;i+=3)R(x,i,6,1,8,'#2f6e3a');RR(x,0,2,12,3,'#2f6e3a',1);R(x,4,0,4,2,'#2f6e3a');});}
function basket(){return spr(16,12,x=>{RR(x,1,4,14,8,'#b8864e',2);for(let j=5;j<11;j+=2)R(x,2,j,12,1,'#8a5a30');for(let i=3;i<14;i+=3)R(x,i,5,1,6,'#d8a86a');for(let k=0;k<6;k++)R(x,3+k*2,2+(k%2),2,2,k%2?'#c8282f':'#e84a3a');});}
function fenceV(len,col=B.wood2){const[c,x]=cv(8,len);const cl=shade(col,.25),cd=shade(col,-.25);for(let j=2;j<len;j+=8){RR(x,1,j,5,6,cl,1);R(x,5,j,1,6,cd);}R(x,3,0,2,len,col);R(x,3,0,1,len,cl);return softOutline(c);}
function flowerBed(w,seed=1){return spr(w,10,x=>{RR(x,0,3,w,7,'#7a5232',2);R(x,1,3,w-2,1,'#a07448');R(x,1,4,w-2,4,'#5a3a24');const rr=rng(seed);for(let i=2;i<w-2;i+=2){P(x,i,3,'#5c9a30');P(x,i+1,2,'#86c23a');if(rr()<.6)P(x,i,1+(i%3===0?0:1),['#ff7a5a','#ffd23a','#e86a9a','#ffffff','#c88aff'][(rr()*5)|0]);}});}
function bigPlanter(pal){return spr(22,28,x=>{RR(x,3,16,16,12,'#bdb6ae',2);R(x,4,16,14,2,'#d4d0c8');R(x,15,18,3,9,'#8e8a84');disc(x,11,10,8,pal.g0);disc(x,10,9,7,pal.g1);disc(x,8,7,3,pal.g2);for(let k=0;k<5;k++)P(x,5+k*3,5+(k%2)*6,k%2?'#ff7a5a':'#ffd23a');});}
function volleyNet(){return spr(10,100,x=>{RR(x,3,0,4,12,'#5a5a64',1);RR(x,3,88,4,12,'#5a5a64',1);for(let j=8;j<92;j++)P(x,5,j,j%2?'#f2f2ea':'#c8c8c0');for(let j=10;j<90;j+=3){P(x,4,j,'#e8e8e0');P(x,6,j+1,'#e8e8e0');}R(x,4,8,3,2,'#ffffff');});}
function umpireChair(){return spr(14,30,x=>{R(x,2,8,2,22,TB[2]);R(x,10,8,2,22,TB[2]);for(let j=12;j<30;j+=5)R(x,2,j,10,1,TB[3]);RR(x,0,4,14,5,TB[3],1);RR(x,1,0,12,5,TB[2],1);});}
function bridge(){return spr(34,24,x=>{RR(x,0,5,34,14,TB[3],1);for(let i=0;i<34;i+=4)R(x,i,5,1,14,TB[2]);RR(x,0,2,34,3,TB[1],1);RR(x,0,19,34,3,TB[1],1);RR(x,0,0,3,5,TB[1],1);RR(x,31,0,3,5,TB[1],1);});}
function pond(x,cx,cy,rx,ry,pal){ellipse(x,cx,cy,rx+3,ry+3,pal.s0);ellipse(x,cx,cy,rx+2,ry+2,pal.s1);ellipse(x,cx,cy,rx,ry,pal.w0);ellipse(x,cx-2,cy-2,rx-4,ry-3,pal.w1);for(let k=0;k<5;k++){R(x,cx-rx/2+k*rx/4,cy-2+k%2*3,6,1,pal.w2);}
  for(let k=0;k<4;k++){ellipse(x,cx-rx*.6+k*rx*.35,cy+ry*.4-(k%2)*ry*.8,3,1,'#4a9a50');P(x,cx-rx*.6+k*rx*.35,cy+ry*.4-(k%2)*ry*.8-1,'#ffb0c8');}}
function paddy(pal){return spr(80,44,x=>{for(let j=0;j<44;j++)for(let i=0;i<80;i++){const row=j%7;P(x,i,j,row===0?pal.d0:(i+j)%3===0?pal.g2:pal.w1);}for(let i=0;i<80;i+=4)for(let j=2;j<44;j+=7){P(x,i+1,j,pal.g3);P(x,i+1,j+1,pal.g1);}});}
function parkedMotor(c){return motorbike(c);}
/** Garis lapangan voli (garis tepi lembut, bukan putus-putus). */
function courtLines(X,Y,W,H){return x=>{const c='#f6eedc';R(x,X+4,Y+4,W-8,1,c);R(x,X+4,Y+H-5,W-8,1,c);R(x,X+4,Y+4,1,H-8,c);R(x,X+W-5,Y+4,1,H-8,c);R(x,X+(W/2|0)-24,Y+4,1,H-8,c);R(x,X+(W/2|0)+24,Y+4,1,H-8,c);};}
/** Petak tanah di antara baris kopi. */
const SMALL=8;
/**
 * cfg: { def:[terrain], blds:[[extKey,X,Ybottom,roadY]], props:[[img|fn,X,Y,zb]], npcs, exits:[[x,y,dir]], seed, trees:[[X,Y,r,seed,fruit]], ground:[fn], over:[fn] }
 */
function drawZone(cfg,pal,opt={}){const ZW=cfg.w||768;const[c,x]=cv(ZW,ZH);const def=[...cfg.def];
  const placed=cfg.blds.map(([k,X,Yb,roadY])=>{const img=EXT[k];const Y=Yb-img.height;const dx=X+(img.width/2|0)-7;if(roadY!=null)def.push(['d',dx,Yb-6,14,roadY-Yb+8,3]);return{img,X,Y,k};});
  paintTerrain(x,ZW,ZH,pal,def,cfg.seed||1);
  (cfg.ground||[]).forEach(f=>f(x,pal));
  (cfg.exits||[]).forEach(([a,b,d])=>{if(d==='D'){x.fillStyle='rgba(255,246,210,.55)';for(let k=0;k<3;k++)for(let t=0;t<4;t++){x.fillRect(a-t,b-k*6-t,1,1);x.fillRect(a+t,b-k*6-t,1,1);}}else exitArrows(x,a,b,d);});
  const ent=[];const add=(img,X,Y,zb=0,sh=1)=>ent.push({img,X,Y,z:Y+img.height+zb,sh});
  placed.forEach(p=>add(p.img,p.X,p.Y,0,2));
  (cfg.trees||[]).forEach(([X,Y,r,s,f])=>add(tree(pal,r,s,f),X,Y,0,3));
  (cfg.props||[]).forEach(([f,X,Y,zb])=>add(typeof f==='function'?f(pal):f,X,Y,zb));
  const blocked=[...placed.map(p=>[p.X,p.Y,p.img.width,p.img.height]),...(cfg.block||[])];
  scatter(x,pal,cfg.seed*7||3,cfg.fill||Math.round(110*ZW/768),[0,30,ZW,ZH-30],def,blocked).forEach(([X,Y,r])=>add(r<.5?tuft(pal,r<.08):r<.82?flowerPatch(pal,r<.62?pal.fl:r<.72?'#ffd23a':'#c88aff'):rock(pal,r>.95),X,Y,0,r>=.82?1:0));
  (cfg.npcs||[]).forEach(([id,X,Y,o])=>ent.push({img:o?chr(id,o):CH[id],X,Y,z:Y+31,ch:1}));
  if(opt.player)ent.push({img:opt.player[0],X:opt.player[1],Y:opt.player[2],z:opt.player[2]+31,ch:1});
  // bayangan dulu (semua jatuh ke kanan-bawah), lalu objek urut kedalaman
  ent.forEach(e=>{if(e.ch||!e.sh)return;if(e.sh===2)dropShadow(x,e.img,e.X,e.Y,6,3,.22);else if(e.sh===3){ellipse(x,e.X+(e.img.width/2|0)+3,e.Y+e.img.height-2,(e.img.width/2|0)-2,4,'rgba(20,30,10,.22)');dropShadow(x,e.img,e.X,e.Y,5,4,.12);}else dropShadow(x,e.img,e.X,e.Y,3,2,.2);});
  ent.sort((a,b)=>a.z-b.z).forEach(e=>{if(e.ch)drawChar(x,e.img,e.X,e.Y);else x.drawImage(e.img,e.X,e.Y);});
  (cfg.over||[]).forEach(f=>f(x,pal));
  seasonFx(x,ZW,ZH,pal===PAL.hujan,cfg.seed*13||5);
  // label (alat bantu draf): tag kecil di atas atap, tidak menutupi pintu/karakter
  if(opt.labels)placed.forEach(p=>{const n=opt.labels[p.k];if(n){const w=TW(n,8)+8;const X=p.X+(p.img.width/2|0)-(w/2|0),Y=Math.max(2,p.Y-4);RR(x,X,Y,w,11,'rgba(30,15,8,.78)',2);T(x,n,X+4,Y+2,'#fff2d4',8);}});
  return c;}
const fenceRun=(X,Y,n,col)=>[...Array(n)].map((_,k)=>[()=>fence(28,col),X+k*28,Y]);
const fenceCol=(X,Y,n,col)=>[...Array(n)].map((_,k)=>[()=>fenceV(24,col),X,Y+k*24]);
const ZONES={
 alun:{name:'Alun-alun',no:1,seed:1,
  def:[['d',0,200,ZW,22,0],['d',508,0,24,206,4],['c',300,236,272,160,8],['d',0,410,ZW,22,0]],
  blds:[['klinik2',-16,202,204],['warung',150,202,204],['kedai',320,202,204],['balai',532,202,204],['roti',-6,412,414],['pos',146,412,414]],
  trees:[[-10,-26,16,1],[96,-22,13,2],[300,-26,12,6],[600,-24,15,3],[660,-20,11,4],[720,-26,15,7],[620,60,13,9,'#f2a03a'],[700,90,16,10],[700,220,12,11,'#f2a03a'],[-8,238,13,12],[230,232,10,31],[270,300,12,32],[620,404,13,13],[720,392,11,14]],
  props:[[fountain,400,280],[p=>banyan(p),650,226],[()=>EXT.angkringan,614,304],
    [()=>marketTent('#c8414b'),304,342],[()=>marketTent('#3f8f4a',['#ffd23a','#f6d08a','#e8473f']),520,318],
    [()=>bench(),356,272],[()=>bench(),470,272],[()=>bench(),356,324],[()=>bench(),470,324],
    [p=>bigPlanter(p),292,236],[p=>bigPlanter(p),550,236],[p=>bigPlanter(p),292,370],[p=>bigPlanter(p),550,370],
    [()=>lamp(),330,230],[()=>lamp(),524,230],[()=>lamp(),330,374],[()=>lamp(),524,374],[()=>trashBin(),386,256],[()=>trashBin(),504,366],
    [flagPole,446,232],[()=>noticeBoard(),600,236],[p=>flowerBed(40,3),360,252],[p=>flowerBed(40,4),470,252],
    [()=>mailbox(),282,388],[()=>barrel(),272,396],[()=>crate(),286,396],
    [()=>signpost('Lereng Bukit','U'),536,30],[()=>signpost('Kampung Asri','L'),6,226],[()=>signpost('Jalan Niaga','R'),676,226],[()=>cart(),228,234],[p=>bush(p,7,'#ff8ab0'),580,266],[p=>bush(p,8,null),110,238]],
  block:[[300,236,272,160],[0,0,ZW,40],[614,304,140,104],[650,226,84,74]],exits:[[6,211,'L'],[762,211,'R'],[519,6,'U']],
  npcs:[['harjo',520,210],['nadia',330,210],['ratna',210,212],['slamet',700,340],['wiryo',370,332],['tari',70,394],['ilham',210,394],['dimas',430,344]]},
 kampung:{name:'Kampung Asri',no:2,seed:5,w:960,
  def:[['d',0,200,960,22,0],['d',0,410,960,22,0],['d',470,220,20,192,3]],
  blds:[['rumah3',-18,202,204],['endang',170,202,204],['wiryo',304,202,204],['lurah',454,202,204],['bowo',-14,412,414],['jamu',150,412,414],['guru',318,412,414],['sd',496,412,414],['kos',756,202,204]],
  ground:[(x,p)=>{pond(x,690,130,44,24,p);}],
  trees:[[-12,-24,15,7],[120,-28,12,8],[340,-22,13,9],[480,-26,11,10],[640,-24,15,11],[700,-20,13,12],[690,360,16,13,'#f2a03a'],[300,224,12,14],[-10,240,14,15],[630,120,12,16],[720,150,10,17],[930,-24,14,50],[790,330,14,51,'#f2a03a'],[900,340,12,52],[946,250,11,53]],
  props:[[()=>bridge(),673,120,-6],[()=>clothesline(),624,164],[()=>lamp(),496,166],[()=>lamp(),496,380],[()=>signpost('Alun-alun','R'),914,226],[()=>parkedMotor('#3f6a4a'),770,226],[()=>parkedMotor('#c8414b'),818,230],[p=>flowerBed(40,7),840,388],[()=>bench(),770,392],[p=>bush(p,10,'#ffffff'),870,236],[()=>lamp(),746,166],[p=>bush(p,9,'#ffd23a'),20,238],[()=>trashBin(),452,226],[p=>flowerBed(36,6),620,226]],
  block:[[0,0,960,40],[640,100,100,60]],exits:[[954,211,'R']],
  npcs:[['endang',176,214],['darmi',190,394],['bowo',100,394],['sinta',620,214],['kiki',470,396],['wiryo',330,214],['yoga',860,214],['udin',800,214]]},
 niaga:{name:'Jalan Niaga',no:3,seed:9,
  def:[['c',0,200,ZW,24,0],['c',0,410,ZW,22,0],['d',640,222,18,190,3],['p',400,290,190,70,6]],
  blds:[['terminal',-4,202,204],['losmen',170,202,204],['polisi',308,202,204],['teknik',460,202,204],['adji',612,202,204],['puskes',-4,412,414],['studio',180,412,414]],
  trees:[[640,-22,15,16],[720,-26,13,17],[700,240,15,19],[340,232,10,20],[-10,240,12,21],[700,380,13,22],[160,20,11,47],[600,30,10,48],[330,380,9,49]],
  props:[[()=>parkedMotor('#c8414b'),206,228],[()=>parkedMotor('#3a5a8a'),254,232],[()=>marketTent('#c8414b'),410,296],[()=>marketTent('#3f8f4a'),470,302],[()=>marketTent('#e3aa3c',['#c8414b','#ffffff','#2f5d9e']),530,270],
    [()=>lamp(),168,170],[()=>lamp(),754,170],[()=>lamp(),392,378],[()=>bench(),540,366],[()=>signpost('Alun-alun','L'),6,232],[()=>barrel(),400,376],[()=>crate(),412,382],[()=>mailbox(),640,376],[p=>bush(p,3,'#ffd23a'),178,240],[p=>bush(p,6,null),570,240],[()=>noticeBoard(),640,276],[()=>trashBin(),586,346]],
  block:[[0,0,ZW,40],[400,262,206,70]],exits:[[6,212,'L']],
  npcs:[['raka',378,216],['arya',512,216],['adji',648,216],['wulan',110,396],['galih',150,398],['laras',290,396],['joni',460,356]]},
 lereng:{name:'Lereng Bukit',no:4,seed:13,
  def:[['d',372,244,24,188,4],['d',140,244,256,18,6],['d',390,244,190,18,6],['d',562,120,18,130,4],['e',470,64,124,46,'p'],['d',400,104,18,146,4],
    ['s',118,286,160,100,4],...[0,1,2,3,4,5].map(k=>['d',604,70+k*22,152,5,2])],
  blds:[['perpus',14,212,246]],
  ground:[courtLines(118,286,160,100)],
  trees:[[-12,-24,15,23],[220,-26,13,24],[300,-20,10,25],[620,-24,12,26],[700,-20,16,27],[10,300,16,28],[700,330,14,29,'#f2a03a'],[620,382,11,30],[200,10,9,40],[262,190,11,41],[300,96,10,42],[600,250,15,43],[470,330,13,44,'#f2a03a'],[520,196,9,45],[-10,120,14,46],[60,380,10,47]],
  props:[...Array.from({length:42},(_,k)=>[p=>coffeeBush(p,k),602+(k%7)*22,52+Math.floor(k/7)*22]),
    // Kebun Kopi: pagar keliling, keranjang & karung panen
    ...fenceRun(592,38,6),...fenceCol(588,44,6),...fenceRun(592,186,2),...fenceRun(680,186,3),[()=>basket(),648,190],[()=>basket(),744,30],[()=>sack('#a8784a','#3f8f4a'),576,200],[()=>sack('#a8784a','#3f8f4a'),590,206],
    // Bukit Bintang: paving, teleskop, bangku, lampu taman, tempat sampah, bunga, pagar rendah
    [telescope,456,34],[p=>flowerBed(30,1),424,72],[p=>flowerBed(30,2),486,72],[p=>flowerBed(24,3),436,24],[p=>flowerBed(24,4),496,24],
    [()=>bench(),376,52],[()=>bench(),536,52],[()=>bench(),386,86],[()=>bench(),526,86],[()=>lamp(),358,30],[()=>lamp(),578,30],[()=>lamp(),468,96],[()=>trashBin(),420,96],
    ...fenceRun(330,12,9),...fenceCol(330,18,4),...fenceCol(578,18,4),
    // Lapangan Voli: net, kursi wasit, bangku penonton, pagar rendah
    [volleyNet,193,286],[umpireChair,206,252],[()=>bench(),126,262],[()=>bench(),236,262],[()=>bench(),286,312],[()=>bench(),286,350],...fenceCol(108,282,4),
    [p=>bush(p,2,'#ff8ab0'),6,150],[p=>bush(p,4,'#ffd23a'),244,150],[p=>bush(p,6,null),310,370],
    [()=>signpost('Bukit Bintang','U'),412,120],[()=>signpost('Kebun Kopi','R'),524,150],[()=>signpost('Alun-alun','D'),400,396],[()=>trashBin(),330,236]],
  block:[[588,30,180,170],[108,250,190,140],[330,8,260,110],[0,0,ZW,26]],exits:[[383,426,'D']],
  npcs:[['sekar',150,216],['doni',200,330],['bowo',640,140],['andre',250,350]]},
};
const ZLABELS={klinik2:'Klinik',warung:'Warung',kedai:'Kedai Kopi',balai:'Balai Kota',roti:'Toko Roti',pos:'Kantor Pos',rumah3:'Rumah Dokter',endang:'Rumah Endang',wiryo:'Rumah Wiryo',lurah:'Rumah Lurah',guru:'Rumah Bu Sinta',bowo:'Rumah Pak Bowo',jamu:'Pondok Jamu',sd:'SD Negeri',
  terminal:'Terminal',losmen:'Losmen Singgah',kos:'Kos Melati',polisi:'Pos Polisi',teknik:'Konsultan Teknik',adji:'Kantor Adji',puskes:'Puskesmas',studio:'Studio Foto',perpus:'Perpustakaan'};
