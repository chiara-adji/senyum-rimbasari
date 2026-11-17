/* ==== [3b-2] Sapaan formal pasien (permintaan user 2026-11-17) ====
 * Anak "An. Nama" · pria dewasa/lansia "Tn. Nama" · wanita belum menikah "Nn. Nama" · wanita menikah/lansia "Ny. Nama".
 * Status menikah dibaca dari sapaan lama: Bu/Mbah/Nenek = sudah menikah, Mbak/Kak = belum; pasangan pemain selalu Ny. */
const PAS_PREFIX = /^(Pak|Bu|Mas|Mbak|Dik|Kak|Mbah|Kakek|Nenek|Coach|Om|Tante|Koh|Ci|Bang|Ipda|dr\.|drg\.|An\.|Tn\.|Nn\.|Ny\.)\s+/;
/** Nama formal rekam medis untuk pasien p ({name, g, body, npc}). Idempoten: nama yang sudah formal tidak berubah. */
function formalName(p) {
  const raw = String(p.name || 'Pasien'); if (/^(An|Tn|Nn|Ny)\. /.test(raw)) return raw;
  const m = raw.match(PAS_PREFIX), pre = m ? m[1] : '', bare = m ? raw.slice(m[0].length) : raw;
  const W = p.g === 'W' || /^(Bu|Mbak|Kak|Mbah|Nenek|Tante|Ci)$/.test(pre) && p.g !== 'P' || pre === 'Nenek';
  if (p.body === 'kid') return 'An. ' + bare;
  if (!W) return 'Tn. ' + bare;
  const wed = p.body === 'old' || /^(Bu|Mbah|Nenek|Tante)$/.test(pre) || (p.npc && typeof spouse === 'function' && spouse() === p.npc);
  return (wed ? 'Ny. ' : 'Nn. ') + bare;
}
