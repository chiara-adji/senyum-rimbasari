# 10 — Bedah Minor

> Status: **ACC 2026-11-11** (angka bertanda [usulan] dipakai sebagai nilai awal, disetel saat playtest) · Harga dan syarat **sudah ada di GDD**: "Cabut sisa akar/bedah minor 1,5jt" (§4.1), Ruang Endodonti & Bedah Minor di tahap 4 (§4), set bedah minor T3 (§6). Detail minigamenya **baru**.
> Aturan umum: `00-aturan-umum.md`. Rawat inap Puskesmas: `design/narrative/npc/06-jadwal.md` (keputusan pemilik proyek 2026-11-11).

## 1. Ringkasan
Pencabutan terbuka untuk akar yang tertanam di bawah tulang, atau gigi yang gagal dicabut tertutup (`09`). Ada 5 langkah: bius, sayat & buka gusi (flap), buang tulang, keluarkan akar, lalu haluskan, irigasi, dan jahit. Setelah tindakan, pasien menginap semalam di Puskesmas.

## 2. Rasa yang dituju
Ruang operasi kecil di lantai 2 klinik. Pemain sudah jauh dari ruko tua yang dulu. Tindakannya tegang tapi terkendali, dan malamnya pemain bisa menjenguk pasien di Puskesmas.

## 3. Aturan
| Langkah | Input | Zona dasar **[usulan]** | S_dasar sakit **[usulan]** | Kesalahan |
|---|---|---|---|---|
| 1. Bius | PILIH (blok untuk rahang bawah, infiltrasi untuk rahang atas) → TAHAN | 30% | Suntik 6, terlalu cepat +10 | Bius kurang → semua langkah sakit ×2 |
| 2. Sayat + buka flap | GOSOK mengikuti garis sayatan putus-putus (lebih lebar dari area tulang yang akan dibuka), lalu TAHAN untuk mengangkat gusi | 25% | 4 | Keluar dari garis → flap robek, jahitan nanti lebih sulit (zona langkah 5 −20%, kecil) |
| 3. Buang tulang | GOSOK dengan bor bedah + irigasi (tahan Shift untuk menyemprot air) | 22% | 6/dtk | Tanpa irigasi > 2 detik → tulang panas, risiko dry socket naik (kecil). Masuk ke **zona saraf** (garis kuning di molar bawah) → **mati rasa bibir (berat)**. Membuang terlalu banyak tulang → kecil. |
| 4. Keluarkan akar | Kalau multi-akar: separasi (GOSOK). Lalu tiap akar: RITME 4 ketukan dengan elevator | 28% | 8 per ketukan merah | Molar atas: ketukan merah 3× → akar terdorong ke sinus (**berat**, rujuk Tanjung Arum). Lainnya: ujung akar tertinggal (kecil, kontrol). |
| 5. Haluskan, irigasi, jahit | GOSOK halus tepi tulang → klik irigasi → TEPAT ×3 (satu kali tiap jahitan, dari belakang ke depan) | 35% / 30% | 2 per jahitan | Tepi tajam tersisa → nyeri saat kontrol (kecil). Jahitan meleset 2× → luka terbuka, perdarahan (kecil; pada pasien pengencer darah: **berat**). |

- **Alat minimum**: set bedah minor (T3) dan Ruang Bedah (tahap 4). Bor bedah dan irigasi termasuk dalam set.
- **Rontgen**: panoramik (T3) menampilkan garis saraf dan dasar sinus lebih jelas (zona saraf +), ditambah pengali zona T3 umum.
- **Rawat inap Puskesmas**: setelah tindakan selesai, apa pun hasilnya, pasien menginap semalam di Puskesmas dan dirawat Wulan atau Galih. Pemain bisa menjenguk 18:00–22:00 (trust +3, dihitung ngobrol) dan mendapat dialog khusus (`06-jadwal.md`, tanpa angka baru).
- **Resep wajib**: pereda sakit. Antibiotik hanya kalau ada infeksi (`02-resep.md`). Kartu instruksi: gigit tampon, jangan kumur keras dan jangan merokok 24 jam, kompres dingin di pipi hari pertama.
- **Staf & herba**: aturan umum. Perawat sangat terasa di sini (zona +15%, sakit −20%). Sirih → trust +3 (GDD §7, berlaku untuk cabut).
- **Energi**: 20 **[usulan]**, batas atas GDD. **Durasi**: ±50 detik nyata.

## 4. Rumus
Mengikuti `00-aturan-umum.md` §4. Harga: 1,5jt × pengali tier × musim × K_kasus (GDD §4.1). Karena alat minimum T3: 1,5jt × 2.5 = 3,75jt sebelum musim dan kesulitan.

Contoh zona buang tulang: 22% × 1.4 (T3) × 1.15 (Perawat) ÷ 1.3 (kasus sedang) = **27.2%**.

## 5. Kasus khusus
- **Sebelum tahap 4**: bedah minor tidak tersedia. Sisa akar yang dalam ditangani dengan resep + tambalan sementara/tampon, lalu dijadwal ulang atau dirujuk (dialog). Sisa akar yang terjangkau ditangani dengan `09` (keputusan sementara di file itu).
- **Pengencer darah**: jahitan wajib (langkah 5), dan tampon ditahan 2× lebih lama. Pasien tetap minum obatnya.
- **Diabetes**: kontrol wajib di hari ke-7 **[usulan]**. Kalau terlewat, luka lambat sembuh.
- **Hipertensi ≥ 160/100**: tunda.
- **Hamil**: bedah minor elektif ditunda sampai setelah melahirkan **[keputusan sementara, perlu review user]**. Kalau darurat (infeksi), resep dulu dan rujuk.
- **Abses**: resep dulu, menginap di Puskesmas, bedah di kunjungan berikutnya (GDD §6).
- **Mati rasa bibir** (zona saraf): hasil Gagal. Pasien kembali beberapa kali untuk kontrol (dialog), trust −6. Tidak permanen di game, pulih setelah 14 hari **[usulan]**, sesuai pilar santai.
- **Pasien menginap, lalu pemain pingsan lewat 24:00**: kunjungan jenguk gagal, tanpa hukuman tambahan.
- **Nenek Sumi**: kalau sisa akarnya di bawah tulang dan klinik sudah tahap 4, ini kasus bedah minor pertama yang wajar. Mbah Darmi ikut menemani (narasi).

## 6. Ketergantungan
GDD §4 (tahap 4), §4.1, §5, §6, §7. `02-resep.md`, `09-cabut-penyulit.md` (eskalasi dari akar patah), `00-aturan-umum.md` §3.5. `03-pasien.md` (Nenek Sumi, Pak Hasan, Pak Yusuf), `06-jadwal.md` (rawat inap; interior Puskesmas 320×200 dengan 2 ranjang rawat inap sudah ada di `design/v3/src/rooms.js`).

## 7. Tuning Knobs (usulan)
| Knob | Usulan | Rentang aman | Memengaruhi |
|---|---|---|---|
| Zona buang tulang | 22% | 15–30% | Kesulitan inti |
| Lebar zona saraf | garis 4 px | 2–8 px | Risiko berat |
| Toleransi tanpa irigasi | 2 dtk | 1–4 dtk | Ritme kerja |
| Jumlah jahitan | 3 | 2–5 | Durasi |
| Pemulihan mati rasa | 14 hari | 7–30 | Beratnya kegagalan |
| Kontrol diabetes | hari ke-7 | 3–10 | Kunjungan ulang |
| Energi | 20 | 18–20 | — |

## 8. Kriteria lulus
- [ ] Tidak tersedia sebelum tahap 4 atau tanpa set bedah T3.
- [ ] Setelah selesai (apa pun hasilnya), pasien muncul di ranjang Puskesmas malam itu dan bisa dijenguk 18–22.
- [ ] Kursor masuk zona saraf di molar bawah → hasil Gagal, status "mati rasa" 14 hari.
- [ ] Menahan Shift saat langkah 3 mencegah status "tulang panas".
- [ ] Pasien pengencer darah + jahitan meleset 2× → hasil Gagal.

## Sumber
- ADC study guide, eksodonsia bedah & komplikasi intraoperatif (flap mukoperiosteal saat akar patah): https://open-exam-prep.com/study-guides/au-adc-written/oral-surgery/exodontia-techniques
- Clinical handout, *Surgical extraction* (urutan flap → buang tulang → separasi → elevasi → haluskan → jahit): https://clinicaljude.yolasite.com/resources/Surgical%20extraction.pdf
- Journal of Dental Medicine (Tehran) 2023, dry socket: https://journals.tums.ac.ir/jdm/article-1-6206-en.pdf
- Dr. Bicuspid, komunikasi oroantral: https://cdn.drbicuspid.com/dental-specialties/oral-maxillofacial-surgery/article/15744736/when-does-tooth-removal-cause-oroantral-communication
- SDCEP, antikoagulan (jahit + hemostasis lokal): https://companion.sdcep.org.uk/management-of-dental-patients-taking-anticoagulants-or-antiplatelet-drugs/treatment-recommendations/warfarin-or-another-vitamin-k-antagonist

Catatan: sebagian langkah bedah dirujuk dari materi kuliah dan handout klinis, bukan pedoman resmi. Detailnya sudah disederhanakan untuk game.
