/* ================= KARAKTER V3 (24×32) =================
   Kepala 16×13 (±45% tinggi badan). Mata 3×4: kelopak, pupil, iris, kilau.
   Opsi: body adult|big|old|kid · dir down|up|side · expr neutral|happy|sad|angry|wink|surprised|shy|smirk|squint */
function shade(h,f){const[r,g,b]=hex(h);const k=v=>Math.max(0,Math.min(255,Math.round(f<0?v*(1+f):v+(255-v)*f)));return '#'+[k(r),k(g),k(b)].map(v=>v.toString(16).padStart(2,'0')).join('');}
const EYEC={brn:'#6a3a22',blk:'#2e2228',hz:'#8a6a2a',gry:'#4e6274'};
const SK={L:['#f8d6b0','#e0a87e'],Y:['#f2cfa0','#d9a472'],M:['#d8995f','#b0703e'],D:['#a8693e','#7e4826']};
function char3(s){
  const[c,x]=cv(24,32);const r=(X,Y,W,H,col)=>R(x,X,Y,W,H,col),p=(X,Y,col)=>P(x,X,Y,col);
  const dir=s.dir||'down',body=s.body||'adult',e=s.expr||'neutral',step=s.step||0;
  const big=body==='big',kid=body==='kid',old=body==='old';
  const oy=kid?4:old?1:0,hy=3+oy,T0=kid?21:old?18:17,TB=26;
  const sk=s.skin,ss=s.skinS,OL=C.ol,H=s.hair||'short';
  const hc=s.hc,hl=s.hl||shade(hc,.28),hd=s.hd||shade(hc,-.4);
  const st=s.style||'tee',top=st==='coat'?C.white:(s.top||'#7a8a9a'),topS=st==='coat'?C.whiteS:(s.topS||shade(top,-.22)),topH=s.topH||shade(top,.3);
  const sleeveC=['vest'].includes(st)?(s.inner||'#f2ead8'):top,sleeveS=shade(sleeveC,-.22);
  const lower=s.lower||(kid?'shorts':'pants'),legs=s.legs||'#3b5a8c',legsS=s.legsS||shade(legs,-.25);
  const bx0=big?5:6,bx1=big?18:17,bw=bx1-bx0+1,ax0=big?3:4,ax1=big?19:18;
  const l1=step===1?-1:0,l2=step===2?-1:0,a1=step===1?1:step===2?-1:0;
  const side=dir==='side',back=dir==='up';
  const longH=['long','wavy'].includes(H);
  /* ---------- rambut belakang ---------- */
  if(!side){
    if(longH){r(3,hy+1,18,17,hc);r(18,hy+1,3,17,hd);if(H==='wavy'){for(let j=hy+4;j<hy+18;j+=3){p(2,j,hc);p(21,j+1,hd);}}r(4,hy+18,16,1,hd);}
    if(H==='pony'){r(18,hy-2,4,4,hc);r(19,hy+2,3,10,hc);r(20,hy+3,2,9,hd);p(20,hy+12,hc);r(18,hy-1,2,2,s.tie||C.red);}
    if(H==='bun'){ellipse(x,12,hy-3,4,2,hc);r(10,hy-4,3,1,hl);r(14,hy-3,2,1,hd);}
    if(H==='bob'&&back){r(2,hy,20,11,hc);}
  } else {
    if(longH||H==='braid'){r(3,hy+1,7,18,hc);r(3,hy+1,2,18,hd);}
    if(H==='pony'){r(1,hy,4,3,hc);r(1,hy+3,3,9,hc);r(1,hy+4,1,8,hd);r(4,hy,1,2,s.tie||C.red);}
    if(H==='bun'){ellipse(x,7,hy-1,3,2,hc);}
  }
  /* ---------- kaki & sepatu ---------- */
  const shoe=s.shoe||C.shoe,shoeH=shade(shoe,.3);
  if(side){const f=step===1?2:step===2?-2:0;
    if(lower==='long'){r(8,TB,9,4,legs);r(15,TB,2,4,legsS);}
    else{const lc=(lower==='shorts'||lower==='skirt')?sk:legs,lcs=(lower==='shorts'||lower==='skirt')?ss:legsS;r(10-f,TB+1,3,3,lcs);r(11+f,TB+1,3,3,lc);
      if(lower==='shorts')r(9,TB+1,6,1,legs);if(lower==='skirt'){r(8,TB,9,3,legs);}}
    r(9-f,30,5,2,shade(shoe,-.2));r(10+f,30,6,2,shoe);r(11+f,30,2,1,shoeH);}
  else{
    if(lower==='long'){r(6,TB,12,4,legs);r(16,TB,2,4,legsS);for(let i=7;i<17;i+=3)p(i,TB+3,legsS);}
    else{const bare=lower==='shorts'||lower==='skirt';const lc=bare?sk:legs,lcs=bare?ss:legsS;
      r(7,TB+1+l1,4,3,lc);r(13,TB+1+l2,4,3,lc);r(10,TB+1+l1,1,3,lcs);r(16,TB+1+l2,1,3,lcs);
      if(lower==='shorts'){r(7,TB+1,10,1,legs);r(7,TB+1,4,1,legs);r(16,TB+1,1,1,legsS);}
      if(lower==='skirt'){r(6,TB,12,3,legs);r(16,TB,2,3,legsS);r(6,TB+2,12,1,legsS);}
      if(s.socks){r(7,29+l1,4,1,s.socks);r(13,29+l2,4,1,s.socks);}}
    r(6,30+l1,5,2,shoe);r(13,30+l2,5,2,shoe);r(7,30+l1,2,1,shoeH);r(14,30+l2,2,1,shoeH);}
  /* ---------- lengan ---------- */
  const sl=s.sleeve||(['polo','scrubs','tee','uniform','jersey','overallS','daster'].includes(st)?'short':'long');
  if(side){const sw=step===1?1:step===2?-1:0;r(11+sw,T0+1,3,TB-T0-1,sleeveS);if(sl==='short')r(11+sw,T0+4,3,TB-T0-4,ss);r(11+sw,TB,3,2,ss);}
  else{
    const hL=TB+a1,hR=TB-a1;
    if(sl==='short'){r(ax0,T0+1,2,3,sleeveC);r(ax1,T0+1,2,3,sleeveS);r(ax0,T0+4,2,hL-T0-4,sk);r(ax1,T0+4,2,hR-T0-4,ss);}
    else{r(ax0,T0+1,2,hL-T0-1,sleeveC);r(ax1,T0+1,2,hR-T0-1,sleeveS);r(ax0,hL-1,2,1,shade(sleeveC,-.12));r(ax1,hR-1,2,1,shade(sleeveS,-.12));}
    r(ax0,hL,2,2,sk);r(ax1,hR,2,2,ss);
    if(st==='tracksuit'){for(let j=T0+1;j<hL-1;j++)p(ax0,j,'#f7f7f2');for(let j=T0+1;j<hR-1;j++)p(ax1+1,j,'#d8d8d0');}
    if(s.watch)p(ax1,hR-1,'#e8c547');}
  /* ---------- badan ---------- */
  const tx0=side?8:bx0,tw=side?8:bw;
  r(tx0,T0,tw,TB-T0+1,top);r(tx0+tw-2,T0,2,TB-T0+1,topS);r(tx0,TB,tw,1,topS);p(tx0,T0,topS);p(tx0+tw-1,T0,topS);
  if(!side&&!back)outfit();
  if(back){if(st==='coat'){for(let j=T0+3;j<=TB;j++)p(12,j,C.whiteS);}if(st==='jersey'){r(9,T0+2,1,4,'#ffffff');r(11,T0+2,3,4,'#ffffff');r(12,T0+3,1,2,top);}if(st==='apron')r(8,T0+4,8,1,s.apron||C.cream);}
  if(st==='coat'&&!side){r(bx0,TB,bw,3,C.white);r(bx1-1,TB,2,3,C.whiteS);r(bx0,TB+2,bw,1,C.whiteS);if(!back)r(11,TB,2,3,C.whiteS);}
  if(st==='coat'&&side){r(8,TB,8,3,C.white);r(8,TB+2,8,1,C.whiteS);}
  function outfit(){const cx=11;
    if(st==='coat'){const inn=s.inner||C.blue;r(10,T0,4,2,inn);r(11,T0+2,2,1,inn);[[9,T0],[9,T0+1],[10,T0+2],[14,T0],[14,T0+1],[13,T0+2]].forEach(q=>p(q[0],q[1],C.whiteS));
      for(let j=T0+3;j<=TB;j++)p(12,j,C.whiteS);r(7,T0+6,3,1,C.whiteS);r(14,T0+6,3,1,C.whiteS);
      if(s.tie){p(11,T0,s.tie);p(12,T0,s.tie);r(11,T0+1,2,2,s.tie);}
      if(s.steth){[[8,T0],[8,T0+1],[8,T0+2],[8,T0+3],[9,T0+4]].forEach(q=>p(q[0],q[1],C.steth));r(10,T0+4,2,1,'#c9d0da');p(10,T0+5,'#9aa3b0');}
      if(s.badge){r(14,T0+3,2,2,'#4f86c9');p(14,T0+3,'#ffffff');}}
    if(st==='polo'){r(9,T0,6,1,topH);p(9,T0+1,topH);p(14,T0+1,topH);r(11,T0+1,2,3,topH);p(11,T0+2,'#8a8a96');p(12,T0+3,'#8a8a96');r(bx0,TB,bw,1,s.belt||'#17131a');p(12,TB,'#c9a46a');}
    if(st==='shirt'||st==='pos'||st==='driver'||st==='plaid'||st==='police'){
      if(st==='plaid'){for(let j=T0;j<TB;j++)for(let i=bx0;i<=bx1-2;i++){if(i%3===0)p(i,j,topS);if(j%3===0)p(i,j,(i%3===0)?shade(topS,-.2):topH);}}
      p(9,T0,topH);p(10,T0+1,topH);p(14,T0,topH);p(13,T0+1,topH);p(11,T0,sk);p(12,T0,sk);for(let j=T0+2;j<TB;j++)p(12,j,topS);for(let j=T0+3;j<TB;j+=2)p(12,j,topH);
      r(7,T0+3,3,2,topS);r(7,T0+3,3,1,topH);
      if(st==='pos'){r(14,T0+3,3,2,'#ffffff');p(15,T0+3,C.red);}
      if(st==='police'){r(bx0,T0,3,1,'#3a2a1a');r(bx1-2,T0,3,1,'#3a2a1a');r(14,T0+3,3,3,'#e8c547');p(15,T0+4,'#c8414b');r(7,T0+5,3,1,'#2f3d63');}
      if(st==='driver'){r(bx0,T0,3,1,'#2a3a5a');r(bx1-2,T0,3,1,'#2a3a5a');p(15,T0+3,'#e8c547');}
      if(s.tucked!==false)r(bx0,TB,bw,1,s.belt||'#3a2a24');}
    if(st==='tee'||st==='jersey'||st==='uniform'||st==='blouse'){
      r(10,T0,4,1,sk);r(9,T0,1,1,topS);r(14,T0,1,1,topS);r(10,T0+1,4,1,topS);
      if(s.print)r(9,T0+3,5,3,s.print),r(10,T0+4,3,1,shade(s.print,.45));
      if(st==='jersey'){r(bx0,T0+2,bw,1,s.stripe||'#ffffff');r(10,T0+4,1,3,s.stripe||'#ffffff');r(12,T0+4,2,3,s.stripe||'#ffffff');p(12,T0+5,top);}
      if(st==='uniform'){p(10,T0,C.whiteS);p(13,T0,C.whiteS);r(14,T0+3,2,2,'#e8c547');p(11,T0+1,C.whiteS);if(s.tie){r(11,T0+1,2,4,s.tie);}}
      if(st==='blouse'){for(let j=T0+2;j<TB;j+=3)for(let i=bx0+1;i<bx1-1;i+=4){p(i+(j%2),j,s.flower||'#ffd23a');}}}
    if(st==='scrubs'){r(10,T0,4,1,sk);r(11,T0+1,2,1,sk);p(9,T0,topH);p(14,T0,topH);r(7,T0+4,3,2,topS);p(8,T0+3,'#ffffff');r(14,T0+4,2,1,topH);}
    if(st==='apron'){const a=s.apron||C.cream,as=shade(a,-.18);r(10,T0,4,1,sk);r(8,T0+2,8,TB-T0-1,a);r(15,T0+2,1,TB-T0-1,as);p(8,T0,a);p(8,T0+1,a);p(15,T0,a);p(15,T0+1,a);r(10,T0+5,4,2,as);r(10,T0+5,4,1,shade(a,.3));
      if(s.apronLogo)r(10,T0+3,4,1,s.apronLogo);r(bx0,T0+4,2,1,a);r(bx1-1,T0+4,2,1,as);
      r(8,TB+1,8,1,a);}
    if(st==='batik'){const bh=s.batikH||C.batikH;for(let j=T0+1;j<TB;j++)for(let i=bx0;i<bx1;i++){const m=(i*3+j*2)%7;if(m===0)p(i,j,bh);else if(m===3&&((i+j)%2))p(i,j,shade(top,-.3));}
      r(9,T0,6,1,shade(top,-.4));for(let j=T0+1;j<TB;j+=2)p(12,j,shade(bh,.4));}
    if(st==='kebaya'){r(11,T0,2,TB-T0,s.inner||C.cream);for(let j=T0+1;j<TB;j+=2){p(10,j,shade(top,.35));p(13,j,shade(top,.35));}p(11,T0+3,'#e8c547');p(12,T0+3,'#e8c547');r(bx0,TB,bw,1,shade(top,-.3));}
    if(st==='koko'){r(10,T0,4,1,topH);for(let j=T0+1;j<T0+6;j++){p(11,j,s.emb||'#c9a46a');p(12,j,(j%2)?s.emb||'#c9a46a':topS);}r(9,T0,1,2,s.emb||'#c9a46a');r(14,T0,1,2,s.emb||'#c9a46a');r(7,T0+3,2,2,topS);}
    if(st==='jacket'||st==='cardigan'||st==='blazer'||st==='suit'){const inn=s.inner||'#f2ead8';
      if(st==='suit'||st==='blazer'){r(10,T0,4,TB-T0-2,inn);p(9,T0,topH);p(9,T0+1,topH);p(10,T0+2,topH);p(14,T0,topH);p(14,T0+1,topH);p(13,T0+2,topH);
        if(s.tie){r(11,T0,2,1,shade(s.tie,-.2));r(11,T0+1,2,5,s.tie);p(11,T0+6,s.tie);}r(10,T0+5,4,TB-T0-5,top);for(let j=T0+5;j<TB;j++)p(12,j,topS);p(11,T0+6,'#c9a46a');}
      else{r(10,T0,4,TB-T0,inn);r(10,T0,4,1,sk);p(9,T0+1,topS);p(14,T0+1,topS);for(let j=T0+1;j<TB;j++){p(10,j,topH);p(13,j,topS);}if(s.print)r(11,T0+3,2,2,s.print);
        if(st==='cardigan')for(let j=T0+3;j<TB;j+=2)p(9,j,'#f7f2e4');}}
    if(st==='vest'){const inn=s.inner||'#f2ead8';r(10,T0,4,TB-T0,inn);r(10,T0,4,1,sk);r(7,T0+3,3,2,topS);r(14,T0+3,3,2,topS);r(7,T0+6,3,2,topS);r(14,T0+6,3,2,topS);}
    if(st==='overall'){r(10,T0,4,1,sk);p(9,T0,topH);p(14,T0,topH);for(let j=T0+1;j<=TB;j++)p(12,j,topS);r(14,T0+3,3,2,topH);p(15,T0+3,'#e8c547');r(7,T0+5,2,1,'#2a2a2a');p(16,T0+7,'#2a2a2a');r(bx0,TB-1,bw,1,topS);}
    if(st==='tracksuit'){r(10,T0,4,1,sk);for(let j=T0+1;j<=TB;j++)p(12,j,'#f7f7f2');r(bx0,T0+1,bw,1,shade(top,-.15));}
    if(st==='daster'||st==='dress'){r(10,T0,4,1,sk);p(9,T0,topS);p(14,T0,topS);if(st==='daster'){for(let j=T0+2;j<=TB;j+=3)for(let i=bx0;i<bx1-1;i+=3)p(i+((j/3|0)%2),j,s.flower||'#ffffff');}
      if(st==='dress'&&s.sash){r(bx0,T0+6,bw,1,s.sash);}}
    if(s.tape){for(let j=T0;j<T0+7;j++){p(9,j,'#f2d23a');p(14,j,'#f2d23a');}p(9,T0+2,'#2a2a2a');p(14,T0+4,'#2a2a2a');}
    if(s.whistle){p(10,T0+1,'#d8d8d0');p(11,T0+2,'#d8d8d0');p(12,T0+2,'#d8d8d0');r(11,T0+3,2,2,'#c9d0da');p(11,T0+3,'#ffffff');}
    if(s.lanyard){p(10,T0+1,s.lanyard);p(10,T0+2,s.lanyard);p(13,T0+1,s.lanyard);p(13,T0+2,s.lanyard);p(11,T0+3,s.lanyard);p(12,T0+3,s.lanyard);r(10,T0+4,4,3,'#ffffff');r(10,T0+4,4,1,s.lanyard);}
    if(s.camera){for(let k=0;k<6;k++)p(9+k,T0+k,'#2a2a32');r(13,T0+5,5,4,'#2a2a32');r(14,T0+6,2,2,'#7fb8d8');p(14,T0+6,'#ffffff');p(17,T0+5,'#c9c9c9');}
    if(s.bag){for(let k=0;k<7;k++)p(8+k,T0+k,s.bag);r(15,TB-4,4,4,s.bag);r(15,TB-4,4,1,shade(s.bag,.3));}
    if(s.toolbelt){r(bx0,TB-1,bw,2,'#5a3a22');r(7,TB-1,2,3,'#7a5030');r(15,TB-1,2,3,'#7a5030');p(8,TB-2,'#c9d0da');p(16,TB-3,'#e8c547');}
    if(s.grease){p(8,T0+6,'#2a2a2a');p(15,T0+2,'#3a3a3a');p(9,T0+7,'#3a3a3a');}
  }
  /* ---------- leher ---------- */
  if(H!=='hijab')r(side?11:10,hy+12,4,T0-hy-12+1,ss);
  /* ---------- kepala ---------- */
  if(side)headSide();else if(back)headBack();else headFront();
  function headFront(){
    if(H==='hijab'){hijabFront();face();return;}
    r(6,hy,12,1,sk);r(5,hy+1,14,1,sk);r(4,hy+2,16,9,sk);r(5,hy+11,14,1,sk);r(7,hy+12,10,1,sk);
    r(19,hy+2,1,9,ss);r(18,hy+11,1,1,ss);r(13,hy+12,4,1,ss);r(4,hy+10,1,1,ss);
    if(s.swollen){r(2,hy+7,2,4,sk);r(3,hy+6,1,6,sk);p(3,hy+8,'#f07a7a');p(4,hy+9,'#f07a7a');p(5,hy+8,'#f07a7a');}
    r(3,hy+5,1,3,sk);p(3,hy+6,ss);r(20,hy+5,1,3,ss);p(20,hy+6,shade(ss,-.15));
    if(s.earring){p(3,hy+8,'#ffd23a');p(20,hy+8,'#ffd23a');}
    face();hairFront();brows();if(s.glasses)glasses();hat();}
  function face(){const ey=hy+5,ec=s.eye||EYEC.brn,eL=shade(ec,.45),W='#ffffff';
    const blush=s.blush||'#f39a8e';
    const eyeO=(X,m)=>{// m=1 cermin
      const q=(i,j,col)=>p(m?X+2-i:X+i,ey+j,col);
      q(0,0,OL);q(1,0,OL);q(2,0,OL);q(0,1,OL);q(1,1,W);q(2,1,ec);q(0,2,OL);q(1,2,ec);q(2,2,ec);q(1,3,eL);q(2,3,eL);
      if(s.lashes){q(-1,0,OL);q(-1,-1,OL);}};
    const eyeHappy=X=>{p(X,ey+2,OL);p(X+1,ey+1,OL);p(X+2,ey+2,OL);};
    const eyeClosed=X=>{r(X,ey+2,3,1,OL);};
    const eyeSquint=(X,m)=>{const q=(i,j,col)=>p(m?X+2-i:X+i,ey+j,col);q(0,1,OL);q(1,1,OL);q(2,1,OL);q(1,2,ec);q(2,2,OL);q(0,2,OL);};
    const eyeWide=(X,m)=>{eyeO(X,m);const q=(i,j,col)=>p(m?X+2-i:X+i,ey+j,col);q(0,3,W);q(0,2,OL);};
    const L=6,Rr=15;
    if(e==='happy'||e==='shy'&&s.shyClosed){eyeHappy(L);eyeHappy(Rr);}
    else if(e==='wink'){eyeO(L,0);eyeHappy(Rr);}
    else if(e==='squint'||s.squint||old&&e==='neutral'&&s.oldEyes){eyeSquint(L,0);eyeSquint(Rr,1);}
    else if(e==='surprised'){eyeWide(L,0);eyeWide(Rr,1);}
    else if(e==='sleep'){eyeClosed(L);eyeClosed(Rr);}
    else{eyeO(L,0);eyeO(Rr,1);}
    // pipi
    const bc=e==='shy'?'#f07a7a':blush;r(5,hy+9,2,1,bc);r(17,hy+9,2,1,bc);if(e==='shy'){p(5,hy+10,bc);p(18,hy+10,bc);}
    if(s.freckles){p(6,hy+9,'#c07a5a');p(8,hy+10,'#c07a5a');p(16,hy+10,'#c07a5a');p(17,hy+9,'#c07a5a');}
    // hidung
    p(12,hy+9,ss);if(s.bigNose){p(11,hy+9,ss);p(12,hy+8,ss);}
    // keriput
    if(old||s.wrinkles){p(5,hy+6,ss);p(18,hy+6,ss);p(9,hy+10,ss);p(14,hy+10,ss);}
    // mulut
    const M='#8a3434',my=s.mustache||s.beard?hy+11:hy+10;
    if(e==='happy'||e==='wink'){if(s.mustache||s.beard){r(10,my,4,1,M);}else{r(10,my,4,1,M);r(11,my,2,1,s.gap?'#5a1a1a':'#ffffff');p(12,my,'#ffffff');r(11,my+1,2,1,M);}}
    else if(e==='sad'){r(11,my,2,1,M);p(10,my+1,M);p(13,my+1,M);if(!s.noTear){p(19,hy+7,'#bfe6ff');r(19,hy+8,1,2,'#5ab0f0');}}
    else if(e==='angry'){r(10,my,4,1,M);p(10,my+1,shade(ss,-.1));}
    else if(e==='surprised'){r(11,my,2,2,M);}
    else if(e==='shy'){r(11,my+1,2,1,M);}
    else if(e==='smirk'){p(13,my,M);r(10,my+1,3,1,M);}
    else{p(10,my,M);r(11,my+1,2,1,M);p(13,my,M);}
    if(s.mustache){r(9,hy+10,6,1,s.mustache===true?hc:s.mustache);p(9,hy+11,s.mustache===true?hc:s.mustache);p(14,hy+11,s.mustache===true?hc:s.mustache);}
    if(s.beard){const b=s.beard===true?hc:s.beard;r(6,hy+11,12,1,b);r(8,hy+12,8,1,b);r(4,hy+8,1,3,b);r(19,hy+8,1,3,b);r(5,hy+10,1,2,b);r(18,hy+10,1,2,b);r(10,hy+11,4,1,sk);r(11,hy+11,2,1,'#8a3434');}
    if(s.stubble){[[7,hy+11],[9,hy+12],[11,hy+12],[13,hy+12],[15,hy+11],[16,hy+12],[8,hy+11]].forEach(q=>p(q[0],q[1],shade(ss,-.12)));}
  }
  function brows(){if(s.glasses==='thick')return;const by=hy+4,b=s.brow||hd,L=6,Rr=15;
    if(e==='angry'){p(L,by-1,b);p(L+1,by,b);p(L+2,by,b);p(Rr+2,by-1,b);p(Rr+1,by,b);p(Rr,by,b);}
    else if(e==='sad'||e==='surprised'&&false){p(L,by,b);p(L+1,by,b);p(L+2,by-1,b);p(Rr,by-1,b);p(Rr+1,by,b);p(Rr+2,by,b);}
    else if(e==='surprised'){r(L,by-1,3,1,b);r(Rr,by-1,3,1,b);}
    else{r(L,by,3,1,b);r(Rr,by,3,1,b);if(s.thickBrow){p(L,by+0,b);r(L,by-1,2,1,b);r(Rr+1,by-1,2,1,b);}}}
  function glasses(){const g=s.gcol||'#3a3040',by=hy+4;
    r(5,by,5,1,g);r(14,by,5,1,g);r(5,by+5,5,1,g);r(14,by+5,5,1,g);r(5,by+1,1,4,g);r(9,by+1,1,4,g);r(14,by+1,1,4,g);r(18,by+1,1,4,g);r(10,by+1,4,1,g);
    p(4,by+1,g);p(19,by+1,g);if(s.shades){r(6,by+1,3,4,'#2a2a3a');r(15,by+1,3,4,'#2a2a3a');p(6,by+1,'#8a8aa0');p(15,by+1,'#8a8aa0');}}
  function cap(){r(6,hy-2,12,1,hc);r(4,hy-1,16,1,hc);r(3,hy,18,3,hc);r(7,hy-1,5,1,hl);r(5,hy,3,1,hl);r(19,hy,2,3,hd);p(18,hy-1,hd);}
  function hairFront(){const t=hy+3;
    switch(H){
    case 'short':cap();r(3,t,4,1,hc);r(8,t,4,1,hc);r(13,t,3,1,hc);r(17,t,4,1,hc);r(3,t+1,2,1,hc);r(19,t+1,2,1,hc);p(3,t+2,hc);p(20,t+2,hc);p(10,hy+1,hd);p(14,hy+2,hd);p(15,hy+1,hd);r(19,t,2,2,hd);break;
    case 'side':cap();r(3,t,11,1,hc);r(3,t+1,3,1,hc);p(3,t+2,hc);r(18,t,3,1,hc);p(20,t+1,hc);r(14,hy-1,1,1,hd);r(14,hy,2,1,hd);r(15,hy+1,2,1,hd);r(16,hy+2,2,1,hd);p(7,hy+1,hl);p(8,hy+2,hl);p(10,hy+2,hl);r(19,t,2,2,hd);break;
    case 'spiky':cap();[[5,hy-3],[9,hy-3],[13,hy-3],[16,hy-3],[3,hy-1],[20,hy-1],[8,hy-2],[17,hy-2]].forEach(q=>p(q[0],q[1],hc));p(9,hy-3,hl);
      r(3,t,3,1,hc);r(7,t,3,1,hc);r(11,t,3,1,hc);r(15,t,3,1,hc);r(19,t,2,1,hc);p(4,t+1,hc);p(8,t+1,hc);p(12,t+1,hc);p(16,t+1,hc);p(20,t+1,hc);p(3,t+2,hc);r(19,t,2,1,hd);break;
    case 'kid':cap();[[6,hy-3],[11,hy-3],[12,hy-3],[16,hy-3]].forEach(q=>p(q[0],q[1],hc));r(3,t,5,1,hc);r(9,t,3,1,hc);r(13,t,2,1,hc);r(16,t,5,1,hc);p(3,t+1,hc);p(20,t+1,hc);break;
    case 'curly':cap();[[7,hy-3],[8,hy-3],[12,hy-3],[13,hy-3],[16,hy-3],[2,hy],[21,hy],[2,hy+1],[21,hy+1],[2,hy+2],[21,hy+2]].forEach(q=>p(q[0],q[1],hc));
      r(3,t,5,1,hc);r(10,t,4,1,hc);r(16,t,5,1,hc);r(2,t,1,4,hc);r(21,t,1,4,hd);r(3,t+1,2,2,hc);r(19,t+1,2,2,hc);
      for(let j=hy-2;j<t+3;j++)for(let i=2;i<22;i++){const k=(i+j*2)%5;if(k===0)p2(i,j,hl);else if(k===3)p2(i,j,hd);}break;
    case 'messy':cap();p(12,hy-3,hc);p(13,hy-3,hc);p(7,hy-3,hc);r(3,t,7,1,hc);r(11,t,5,1,hc);r(17,t,4,1,hc);p(3,t+1,hc);p(4,t+1,hc);p(8,t+1,hc);p(14,t+1,hc);r(19,t+1,2,1,hc);p(20,t+2,hc);p(3,t+2,hc);p(9,hy+1,hd);p(13,hy+2,hd);p(16,hy+1,hd);break;
    case 'slick':cap();r(4,t,1,2,hc);r(19,t,2,2,hc);for(let i=6;i<18;i+=3){p(i,hy+1,hl);p(i+1,hy+2,hd);}r(3,t-1,18,1,hc);break;
    case 'emo':cap();r(3,t,11,1,hc);r(3,t+1,7,1,hc);r(3,t+2,5,1,hc);r(3,t+3,2,1,hc);r(17,t,4,1,hc);p(20,t+1,hc);p(6,hy+2,hl);p(8,hy+1,hl);p(11,hy+2,hd);break;
    case 'long':case 'wavy':cap();r(11,hy-1,2,3,hd);r(3,t,7,1,hc);r(14,t,7,1,hc);r(3,t+1,3,1,hc);r(18,t+1,3,1,hc);
      r(3,t,2,13,hc);r(19,t,2,13,hd);if(H==='wavy'){p(5,t+5,hc);p(5,t+9,hc);p(18,t+7,hd);p(18,t+11,hd);r(3,t,8,1,hc);r(3,t+1,4,1,hc);}p(3,t+12,hl);p(4,t+3,hl);break;
    case 'bob':cap();r(2,hy,2,11,hc);r(20,hy,2,11,hd);r(3,t,18,1,hc);r(3,t+1,3,1,hc);r(18,t+1,3,1,hc);r(2,hy+10,4,1,hc);r(18,hy+10,4,1,hd);r(4,hy+4,1,6,hc);r(19,hy+4,1,6,hd);p(7,hy+1,hl);p(13,hy+1,hl);break;
    case 'pony':cap();r(3,t,6,1,hc);r(10,t,3,1,hc);r(15,t,6,1,hc);r(3,t+1,2,4,hc);r(19,t+1,2,4,hd);p(3,t+5,hc);break;
    case 'braid':cap();r(3,t,18,1,hc);r(3,t+1,4,1,hc);r(17,t+1,4,1,hc);
      for(let j=t;j<t+14;j++){const a=((j-t)>>1)%2;r(2,j,3,1,a?hc:hd);r(19,j,3,1,a?hd:hc);}r(2,t+14,3,1,s.tie||C.red);r(19,t+14,3,1,s.tie||C.red);break;
    case 'bun':r(5,hy-1,14,1,hc);r(4,hy,16,2,hc);r(3,hy+2,18,1,hc);r(3,t,2,3,hc);r(19,t,2,3,hd);r(11,hy-1,2,2,hd);p(6,hy,hl);p(8,hy+1,hl);p(15,hy,hl);break;
    case 'buzz':r(6,hy-2,12,1,hc);r(4,hy-1,16,3,hc);r(3,hy+1,2,4,hc);r(19,hy+1,2,4,hd);for(let i=5;i<19;i+=2){p(i,hy-1,hl);p(i+1,hy+1,hd);}break;
    case 'bald':r(6,hy-2,12,1,sk);r(4,hy-1,16,3,sk);r(19,hy-1,1,3,ss);p(8,hy-1,'#ffffff');p(9,hy-1,shade(sk,.4));r(3,hy+2,3,4,hc);r(18,hy+2,3,4,hc);p(3,hy+1,hc);p(20,hy+1,hc);if(s.combover){for(let i=6;i<17;i+=2)p(i,hy,hc);}break;
    case 'peci':r(3,hy+1,2,5,hc);r(19,hy+1,2,5,hc);r(5,hy-3,14,1,'#2a2630');r(4,hy-2,16,4,'#1f1c24');r(5,hy-2,6,1,'#3a3540');r(4,hy+1,16,1,'#2e2a35');p(18,hy-2,'#151218');break;
    case 'hijab':break;
    }}
  function p2(i,j,col){const d=x.getImageData(i,j,1,1).data;if(d[3]&&!(d[0]===HX(sk)[0]&&d[1]===HX(sk)[1]))p(i,j,col);}
  function hijabFront(){const hi=s.hijabIn||shade(hc,-.15);
    r(6,hy-2,12,1,hc);r(4,hy-1,16,1,hc);r(3,hy,18,1,hc);r(2,hy+1,20,13,hc);r(19,hy,3,14,hd);r(5,hy-1,5,1,hl);r(3,hy,3,2,hl);
    r(6,hy+1,12,1,hi);
    r(7,hy+2,10,1,sk);r(6,hy+3,12,1,sk);r(5,hy+4,14,7,sk);r(6,hy+11,12,1,sk);r(8,hy+12,8,1,sk);r(18,hy+4,1,7,ss);r(13,hy+12,3,1,ss);
    r(5,hy+13,14,1,hc);r(4,hy+14,16,T0-hy-12,hc);r(bx0-1,T0,bw+2,4,hc);r(bx0+1,T0+4,bw-2,1,hc);r(9,T0+5,6,1,hc);r(bx1-1,T0,3,4,hd);r(17,hy+14,3,T0-hy-14,hd);
    p(12,hy+13,s.pin||'#f2d23a');for(let j=T0;j<T0+4;j+=2)p(9,j,hl);}
  function hat(){const t=s.hat;if(!t)return;
    if(t==='caping'){const a='#e0bf72',b='#b8913e',d='#8a6a2a';r(10,hy-4,4,1,a);r(8,hy-3,8,1,a);r(6,hy-2,12,1,a);r(3,hy-1,18,1,a);r(0,hy,24,2,a);r(0,hy+1,24,1,b);r(1,hy+2,22,1,d);
      for(let i=1;i<23;i+=3)p(i,hy,b);for(let i=5;i<19;i+=3)p(i,hy-2,b);p(11,hy-4,'#f6dc9a');}
    if(t==='cap'){const a=s.hatC||C.red,b=shade(a,-.3);r(5,hy-3,14,1,a);r(4,hy-2,16,4,a);r(5,hy-2,4,1,shade(a,.3));r(3,hy+2,18,1,b);r(4,hy+2,16,1,shade(a,-.15));r(11,hy-1,2,2,s.hatLogo||'#ffffff');}
    if(t==='beret'){const a=s.hatC||'#c8414b';r(6,hy-3,12,1,a);r(4,hy-2,16,2,a);r(3,hy,8,1,a);r(17,hy-3,3,1,a);p(12,hy-4,shade(a,-.3));r(5,hy-2,4,1,shade(a,.3));}
    if(t==='udeng'){const a=s.hatC||C.batik;r(3,hy+1,18,2,a);for(let i=3;i<21;i+=2)p(i,hy+1,C.batikH);r(20,hy,3,3,a);p(22,hy+3,a);p(21,hy+3,shade(a,-.3));}
    if(t==='bandana'){const a=s.hatC||C.red;r(3,hy,18,2,a);r(3,hy,18,1,shade(a,.3));r(20,hy+1,2,3,a);p(22,hy+3,shade(a,-.3));for(let i=5;i<19;i+=4)p(i,hy+1,'#ffffff');}
    if(t==='flower'){p(17,hy,'#f6a0c0');p(16,hy+1,'#f6a0c0');p(18,hy+1,'#f6a0c0');p(17,hy+2,'#f6a0c0');p(17,hy+1,'#ffd23a');}
    if(t==='chef'){r(5,hy-4,14,5,'#f7f7f2');r(4,hy-3,16,2,'#f7f7f2');r(6,hy-4,4,1,'#ffffff');r(16,hy-4,3,5,'#d8d8d0');r(4,hy+1,16,1,'#d8d8d0');}
    if(t==='helmet'){const a='#f2c84a';r(5,hy-4,14,1,a);r(4,hy-3,16,4,a);r(3,hy+1,18,1,shade(a,-.3));r(6,hy-3,4,1,'#fff2a8');r(11,hy-4,2,5,shade(a,-.15));}
    if(t==='police'){const a='#3a2e20';r(5,hy-3,14,1,a);r(4,hy-2,16,3,a);r(3,hy+1,18,2,'#1a1410');r(4,hy+1,16,1,'#2a2018');r(11,hy-2,2,2,'#e8c547');}
    if(t==='sunglassHead'){r(6,hy+1,4,1,'#2a2a3a');r(14,hy+1,4,1,'#2a2a3a');r(10,hy+1,4,1,'#c9a46a');}}
  function headBack(){
    r(6,hy,12,1,sk);r(5,hy+1,14,1,sk);r(4,hy+2,16,9,sk);r(5,hy+11,14,1,sk);r(7,hy+12,10,1,sk);r(3,hy+5,1,3,sk);r(20,hy+5,1,3,ss);
    if(H==='hijab'){r(6,hy-2,12,1,hc);r(4,hy-1,16,1,hc);r(3,hy,18,1,hc);r(2,hy+1,20,13,hc);r(3,hy+14,18,T0-hy-13,hc);r(bx0-1,T0,bw+2,4,hc);r(bx0+1,T0+4,bw-2,1,hc);r(9,T0+5,6,1,hc);
      r(18,hy,3,14,hd);r(bx1-1,T0,3,4,hd);r(5,hy-1,4,1,hl);r(4,hy,2,3,hl);for(let j=hy+3;j<T0+4;j+=3){p(8,j,hd);p(15,j+1,hd);}p(12,hy+2,hd);p(11,hy+3,hd);p(13,hy+3,hd);return;}
    if(H==='bald'){r(6,hy-2,12,1,sk);r(4,hy-1,16,3,sk);p(8,hy-1,'#ffffff');r(3,hy+2,18,5,hc);r(4,hy+7,16,1,hc);r(18,hy+2,3,5,hd);if(s.hat)hat();return;}
    if(H==='peci'){r(3,hy+1,18,7,hc);r(5,hy+8,14,1,hc);r(18,hy+1,3,7,hd);r(5,hy-3,14,1,'#2a2630');r(4,hy-2,16,4,'#1f1c24');r(4,hy+1,16,1,'#2e2a35');return;}
    const len=longH?hy+18:H==='bob'?hy+11:H==='braid'?hy+10:H==='bun'?hy+8:hy+9;
    r(6,hy-2,12,1,hc);r(4,hy-1,16,1,hc);r(3,hy,18,len-hy,hc);r(18,hy,3,len-hy,hd);r(3,hy,1,len-hy,shade(hc,.12));
    // ujung bawah membulat
    if(longH){r(4,len,16,1,hc);for(let i=4;i<20;i+=2)p(i,len+1,i<17?hc:hd);r(18,len,2,1,hd);}
    else if(H==='bob'){r(2,hy+1,1,len-hy-1,hc);r(21,hy+1,1,len-hy-1,hd);r(2,len,20,1,hd);}
    else{r(4,len,16,1,hc);r(6,len+1,12,1,hd);p(3,len-1,shade(hc,-.15));p(20,len-1,hd);}
    // helai rambut
    for(let j=hy;j<Math.min(len,hy+7);j++){p(7,j,hl);p(11,j+1,hl);p(15,j,hd);}r(6,hy-1,5,1,hl);r(5,hy,3,1,hl);p(12,hy-2,hd);p(12,hy-1,hd);
    if(H==='braid'){for(let j=len;j<len+8;j++){const a=((j-len)>>1)%2;r(10,j,4,1,a?hc:hd);}r(10,len+8,4,1,s.tie||C.red);}
    if(H==='pony'){r(10,hy+7,4,9,hc);r(12,hy+7,2,9,hd);r(11,hy+16,2,1,hd);r(10,hy+6,4,1,s.tie||C.red);}
    if(H==='bun'){ellipse(x,12,hy,4,3,hc);ellipse(x,11,hy-1,2,1,hl);r(10,hy+3,4,1,s.tie||hd);}
    if(H==='spiky'||H==='kid')[[5,hy-3],[9,hy-3],[13,hy-3],[16,hy-3],[2,hy+2],[21,hy+3]].forEach(q=>p(q[0],q[1],hc));
    if(H==='messy')[[7,hy-3],[12,hy-3],[2,hy+4],[21,hy+2]].forEach(q=>p(q[0],q[1],hc));
    if(H==='curly'){for(let j=hy-1;j<len;j++)for(let i=3;i<21;i++){const k=(i+j*2)%5;if(k===0)p(i,j,hl);else if(k===3)p(i,j,hd);}[[2,hy+1],[21,hy+2],[2,hy+5],[21,hy+6],[8,hy-3],[13,hy-3]].forEach(q=>p(q[0],q[1],hc));}
    if(H==='buzz'){r(3,hy+5,18,len-hy-5,sk);r(3,hy+5,18,1,hd);}
    if(s.hat)hat();}
  function headSide(){
    // kepala menghadap kanan: belakang kepala di kiri
    const fr=[[8,15],[6,17],[5,18],[5,18],[5,18],[5,18],[5,18],[5,18],[5,18],[5,18],[6,18],[7,17],[9,15]];
    fr.forEach(([a,b],j)=>r(a,hy+j,b-a+1,1,sk));r(9,hy+12,6,1,ss);r(5,hy+9,2,2,ss);
    r(19,hy+7,1,2,sk);p(19,hy+8,ss);p(18,hy+9,ss);// hidung
    const ey=hy+5,ec=s.eye||EYEC.brn;
    if(H==='hijab'){
      // kain menutup kepala, wajah terbuka di depan
      r(7,hy-2,9,1,hc);r(5,hy-1,13,1,hc);r(4,hy,15,2,hc);r(3,hy+2,10,12,hc);r(4,hy+14,12,T0-hy-13,hc);r(7,T0,10,4,hc);r(9,T0+4,6,1,hc);
      r(13,hy+2,5,1,hc);p(13,hy+3,hc);p(13,hy+10,hc);r(12,hy+11,6,3,hc);r(3,hy+1,2,13,hd);r(6,hy-1,5,1,hl);
      r(13,hy+2,5,1,s.hijabIn||shade(hc,-.15));for(let j=hy+3;j<T0+3;j+=3)p(7,j,hd);
    } else if(H==='bald'){r(5,hy+2,5,5,hc);p(9,hy-0,'#ffffff');r(10,hy+5,2,3,ss);}
    else if(H==='peci'){r(5,hy+1,5,6,hc);r(6,hy-3,10,1,'#2a2630');r(5,hy-2,12,4,'#1f1c24');r(5,hy+1,12,1,'#2e2a35');r(10,hy+5,2,3,ss);}
    else{
      const back=longH?hy+18:H==='bob'?hy+11:H==='braid'||H==='pony'?hy+9:H==='buzz'?hy+5:hy+9;
      r(8,hy-2,8,1,hc);r(6,hy-1,12,1,hc);r(4,hy,15,3,hc);r(4,hy+3,7,back-hy-3,hc);r(4,hy+3,1,back-hy-3,hd);
      if(!longH&&H!=='bob'){r(5,back,5,1,hc);p(4,back-1,hd);}
      else{r(4,back,8,1,hd);}
      r(11,hy+3,1,2,hc);// cambang
      const fringe={short:[15,18,1],side:[14,18,2],spiky:[14,18,2],kid:[14,18,1],messy:[13,18,2],pony:[14,18,1],bob:[13,18,2],braid:[14,18,1],long:[14,18,1],wavy:[13,18,2],emo:[12,18,3],curly:[14,18,2],slick:[17,18,0],bun:[16,18,0],buzz:[17,18,0]}[H]||[15,18,1];
      for(let k=0;k<fringe[2];k++)r(fringe[0]+k,hy+3+k,fringe[1]-fringe[0]+1-k,1,hc);
      r(8,hy-1,5,1,hl);r(6,hy,3,1,hl);r(16,hy,2,2,hd);
      if(H==='spiky'||H==='kid'){p(8,hy-3,hc);p(12,hy-3,hc);p(5,hy-2,hc);p(3,hy+1,hc);}
      if(H==='curly')for(let j=hy-1;j<back;j++)for(let i=4;i<18;i++){if((i+j*2)%5===0)p2(i,j,hl);}
      if(H==='pony'){r(1,hy+1,3,3,hc);r(1,hy+4,3,9,hc);r(1,hy+5,1,8,hd);r(3,hy+1,2,2,s.tie||C.red);}
      if(H==='braid'){for(let j=back;j<back+8;j++){const a=((j-back)>>1)%2;r(6,j,3,1,a?hc:hd);}r(6,back+8,3,1,s.tie||C.red);}
      if(H==='bun'){ellipse(x,5,hy,3,3,hc);p(4,hy-1,hl);}
      r(10,hy+5,2,3,ss);p(10,hy+6,shade(ss,-.18));// telinga
    }
    // mata, alis, mulut
    if(e==='happy'||e==='wink'){p(15,ey+2,OL);p(16,ey+1,OL);p(17,ey+2,OL);}
    else{r(15,ey,3,1,OL);p(15,ey+1,OL);p(16,ey+1,'#ffffff');p(17,ey+1,ec);p(15,ey+2,OL);r(16,ey+2,2,1,ec);r(16,ey+3,2,1,shade(ec,.45));if(s.lashes){p(18,ey,OL);p(18,ey-1,OL);}}
    if(H!=='hijab'||true)r(15,hy+4,3,1,s.brow||hd);
    r(15,hy+9,2,1,s.blush||'#f39a8e');
    if(e==='happy'||e==='wink'){r(16,hy+10,2,1,'#8a3434');p(17,hy+10,'#ffffff');}else p(17,hy+10,'#8a3434');
    if(s.mustache)r(16,hy+9,3,1,s.mustache===true?hc:s.mustache);
    if(s.beard){const b=s.beard===true?hc:s.beard;r(9,hy+9,3,3,b);r(12,hy+11,6,1,b);r(13,hy+10,2,1,b);}
    if(old||s.wrinkles){p(14,hy+6,ss);p(15,hy+11,ss);}
    if(s.glasses){const g=s.gcol||'#3a3040';r(14,hy+4,5,1,g);r(14,hy+9,5,1,g);r(14,hy+5,1,4,g);r(18,hy+5,1,4,g);r(10,hy+5,4,1,g);}
    if(s.hat==='caping'){const a='#e0bf72',b='#b8913e';r(9,hy-4,5,1,a);r(6,hy-3,11,1,a);r(4,hy-2,15,1,a);r(1,hy-1,21,1,a);r(0,hy,24,1,b);r(1,hy+1,22,1,'#8a6a2a');}
    if(s.hat==='cap'){const a=s.hatC||C.red;r(6,hy-3,10,1,a);r(5,hy-2,12,4,a);r(6,hy-2,4,1,shade(a,.3));r(15,hy+1,8,1,shade(a,-.3));r(16,hy+2,6,1,shade(a,-.15));}
    if(s.hat==='udeng'||s.hat==='bandana'){const a=s.hatC||(s.hat==='udeng'?C.batik:C.red);r(4,hy+1,14,2,a);r(2,hy+1,2,3,a);}
    if(s.hat==='beret'){const a=s.hatC||'#c8414b';r(6,hy-3,10,3,a);r(4,hy-1,4,1,a);}
    if(s.hat==='chef'){r(6,hy-4,10,5,'#f7f2f2');r(5,hy+1,12,1,'#d8d8d0');}
    if(s.hat==='helmet'){r(6,hy-4,10,1,'#f2c84a');r(5,hy-3,12,4,'#f2c84a');r(5,hy+1,15,1,'#b8902a');}
    if(s.hat==='police'){r(6,hy-3,10,1,'#3a2e20');r(5,hy-2,12,3,'#3a2e20');r(14,hy+1,8,1,'#1a1410');}
    if(s.hat==='flower'){p(6,hy+1,'#f6a0c0');p(5,hy+2,'#f6a0c0');p(7,hy+2,'#f6a0c0');p(6,hy+2,'#ffd23a');}}
  return outline(c,OL);
}
/** Cerminkan sprite (untuk hadap kiri). */
function flipX(img){const[c,x]=cv(img.width,img.height);x.translate(img.width,0);x.scale(-1,1);x.drawImage(img,0,0);return c;}
function drawChar(x,img,X,Y){ellipse(x,X+12,Y+30,7,2,'rgba(20,10,5,.25)');x.drawImage(img,X,Y);}
const mk=o=>char3(o);
