"use strict";
/* ================= UTIL ================= */
function cv(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d',{willReadFrequently:true});x.imageSmoothingEnabled=false;return [c,x];}
function R(x,X,Y,W,H,col){if(W<=0||H<=0)return;x.fillStyle=col;x.fillRect(X|0,Y|0,W|0,H|0);}
function P(x,X,Y,col){x.fillStyle=col;x.fillRect(X|0,Y|0,1,1);}
function hex(h){h=h.replace('#','');return[parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)];}
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function hash(a,b){let h=(a*374761393+b*668265263)|0;h=(h^(h>>>13))*1274126177|0;return((h^(h>>>16))>>>0)/4294967296;}
function outline(c,col){const x=c.getContext('2d');const w=c.width,h=c.height;const d=x.getImageData(0,0,w,h),a=d.data,s=new Uint8ClampedArray(a);const[r,g,b]=hex(col);
  for(let j=0;j<h;j++)for(let i=0;i<w;i++){const k=(j*w+i)*4;if(s[k+3])continue;
    if((i>0&&s[k-1])||(i<w-1&&s[k+7])||(j>0&&s[k-w*4+3])||(j<h-1&&s[k+w*4+3])){a[k]=r;a[k+1]=g;a[k+2]=b;a[k+3]=255;}}
  x.putImageData(d,0,0);return c;}
/** Outline lembut: tiap piksel tepi diberi warna gelap dari warna tetangganya (kayu → cokelat tua, atap oranye → oranye gelap). k = faktor gelap. */
function softOutline(c,k=.42){const x=c.getContext('2d');const w=c.width,h=c.height;const d=x.getImageData(0,0,w,h),a=d.data,s=new Uint8ClampedArray(a);
  for(let j=0;j<h;j++)for(let i=0;i<w;i++){const q=(j*w+i)*4;if(s[q+3])continue;let n=-1;
    if(j<h-1&&s[q+w*4+3]>200)n=q+w*4;else if(i>0&&s[q-1]>200)n=q-4;else if(i<w-1&&s[q+7]>200)n=q+4;else if(j>0&&s[q-w*4+3]>200)n=q-w*4;
    if(n<0)continue;a[q]=s[n]*k*.95|0;a[q+1]=s[n+1]*k*.82|0;a[q+2]=s[n+2]*k*.8|0;a[q+3]=255;}
  x.putImageData(d,0,0);return c;}
/** Kotak sudut membulat (r = 1 atau 2 piksel). */
function RR(x,X,Y,W,H,col,r=1){if(W<=0||H<=0)return;x.fillStyle=col;X|=0;Y|=0;W|=0;H|=0;
  if(r>=2&&W>4&&H>4){x.fillRect(X+2,Y,W-4,1);x.fillRect(X+1,Y+1,W-2,1);x.fillRect(X,Y+2,W,H-4);x.fillRect(X+1,Y+H-2,W-2,1);x.fillRect(X+2,Y+H-1,W-4,1);}
  else{x.fillRect(X+1,Y,W-2,1);x.fillRect(X,Y+1,W,H-2);x.fillRect(X+1,Y+H-1,W-2,1);}}
/** Kilau kaca: 2 garis diagonal putih transparan di sudut kiri-atas kaca. */
function glassShine(x,X,Y,W,H){x.fillStyle='rgba(255,255,255,.55)';const L=Math.min(W,H);for(let t=0;t<L*.55;t++){x.fillRect(X+2+t|0,Y+L*.55-t|0,1,1);x.fillRect(X+3+t|0,Y+L*.55-t|0,1,1);}
  x.fillStyle='rgba(255,255,255,.3)';for(let t=0;t<L*.3;t++)x.fillRect(X+7+t|0,Y+L*.55-t|0,1,1);}
/** Siluet hitam (untuk drop shadow), di-cache per gambar. */
const _sil=new WeakMap();function silhouette(img){let s=_sil.get(img);if(s)return s;const[c,x]=cv(img.width,img.height);x.drawImage(img,0,0);x.globalCompositeOperation='source-in';x.fillStyle='#000';x.fillRect(0,0,c.width,c.height);_sil.set(img,c);return c;}
/** Drop shadow konsisten ke kanan-bawah. */
function dropShadow(x,img,X,Y,dx=4,dy=3,a=.2){x.globalAlpha=a;x.drawImage(silhouette(img),X+dx,Y+dy);x.globalAlpha=1;}
function disc(x,cx,cy,r,col){x.fillStyle=col;for(let j=-r;j<=r;j++){const w=Math.floor(Math.sqrt(r*r-j*j)+.35);x.fillRect(Math.round(cx-w),Math.round(cy+j),w*2+1,1);}}
function ellipse(x,cx,cy,rx,ry,col){x.fillStyle=col;for(let j=-ry;j<=ry;j++){const w=Math.floor(rx*Math.sqrt(1-(j*j)/(ry*ry))+.3);x.fillRect(Math.round(cx-w),Math.round(cy+j),w*2+1,1);}}
function fromRows(rows,map){const h=rows.length,w=rows[0].length;const[c,x]=cv(w,h);rows.forEach((r,j)=>[...r].forEach((ch,i)=>{if(map[ch])P(x,i,j,map[ch]);}));return c;}
function show(id,c,scale){const el=document.getElementById(id);el.width=c.width;el.height=c.height;el.getContext('2d').drawImage(c,0,0);if(scale){el.style.width=(c.width*scale)+'px';}}

/* alat inspeksi (debug): tampilkan kanvas diperbesar di atas halaman */
window.view=function(id,sx=0,sy=0,sw,sh,scale){const src=typeof id==='string'?document.getElementById(id):id;sw=sw||src.width;sh=sh||src.height;let o=document.getElementById('ovl');if(!o){o=document.createElement('canvas');o.id='ovl';o.style.cssText='position:fixed;left:0;top:0;z-index:99;background:#120c0a;image-rendering:pixelated';document.body.appendChild(o);}const W=innerWidth,H=innerHeight;scale=scale||Math.max(1,Math.floor(Math.min(W/sw,H/sh)));o.width=sw*scale;o.height=sh*scale;o.style.width=o.width+'px';o.style.height=o.height+'px';const x=o.getContext('2d');x.imageSmoothingEnabled=false;x.drawImage(src,sx,sy,sw,sh,0,0,sw*scale,sh*scale);o.style.display='block';return [W,H,scale];};
window.hide=()=>{const o=document.getElementById('ovl');if(o)o.style.display='none';};
