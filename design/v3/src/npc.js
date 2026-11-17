/* ================= [3a] NPC: penanda kepala, potret, tingkat trust (draf 2026-11-13, menunggu ACC) =================
   Penanda digambar di dunia (piksel 1×) di atas kepala NPC, bergoyang naik-turun pelan.
   Potret = potongan kepala+bahu sprite CAST 24×22, digambar ×1 (ubin Buku Kenalan) atau ×2 (dialog, detail). */

/** Tingkat Trust (GDD §9): [ambang, nama, warna]. */
const NPC_TIER=[[0,'Asing','#8a7a6a'],[20,'Kenal','#3a7ac0'],[40,'Akrab','#2e9a58'],[60,'Percaya','#c8861a'],[80,'Sahabat','#c0407a']];
const tierOf=t=>NPC_TIER.filter(r=>t>=r[0]).pop();

const MARKP={k:'#3a2414',w:'#ffffff',W:'#e2d6c2',d:'#5a4a3a',g:'#f6cc3a',G:'#c88a10',p:'#f58cb0',P:'#c8467a'};
const MARKsrc={
 /* belum diajak ngobrol hari ini */
 talk:['..kkkkkkk..','.kwwwwwwwk.','kwwwwwwwwWk','kwdwwdwwdWk','kwwwwwwwwWk','.kWWWWWWWk.','..kkkWkkk..','....kWk....','.....k.....'],
 /* adegan Trust / event siap */
 scene:['..kkkkkkk..','.kgggkgggk.','kggggkggggk','kggggkggggk','kggggggggGk','.kGggkggGk.','..kkkGkkk..','....kGk....','.....k.....'],
 /* event romance siap */
 love:['..kkkkkkk..','.kppppppPk.','kppwwpwwppk','kppwwwwwppk','kpppwwwpppk','.kPppwppPk.','..kkkPkkk..','....kPk....','.....k.....'],
};
const MARK={};for(const k in MARKsrc){const rows=MARKsrc[k];const[c,x]=cv(rows[0].length,rows.length);rows.forEach((r,j)=>[...r].forEach((q,i)=>{if(q!=='.')P(x,i,j,MARKP[q]);}));MARK[k]=c;}

/** Potret kepala + bahu (24×22) dari sprite CAST, opsional ekspresi. */
const bustCache={};
function npcBust(id,expr){const k=id+'|'+(expr||'');if(bustCache[k])return bustCache[k];
  const s=chr(id,{dir:'down',...(expr?{expr}:{})}),[c,x]=cv(24,22);x.drawImage(s,0,-1);return bustCache[k]=c;}
/** Siluet untuk NPC yang belum dikenal. */
function npcShadow(id){const k='?'+id;if(bustCache[k])return bustCache[k];const b=npcBust(id),[c,x]=cv(24,22);x.drawImage(b,0,0);
  x.globalCompositeOperation='source-in';x.fillStyle='#5a4636';x.fillRect(0,0,24,22);return bustCache[k]=c;}

/** Ikon hati HD (7×6) untuk Hubungan. 'o' = kilau. */
const IC_HEART=['.##.##.','#o#####','#######','.#####.','..###..','...#...'];
