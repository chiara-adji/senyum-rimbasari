# 06 — PSA (Perawatan Saluran Akar)

> Status: **ACC 2026-11-11**, **direvisi & terpasang Fase 3b-3 (ACC user 2026-11-17)** di `src/klinik3b.js`, seni `design/v3/src/psa.js`. Angka di `CFG.K3.PSA` / `CFG.K3.ENDO` (nilai awal, disetel saat playtest).
> Harga wajar akhir (Musim Hujan, Kemarau ×1,1): anterior Rp 1,75jt · premolar Rp 2,5jt · molar Rp 3,5jt (sudah termasuk penurunan ±30% revisi 3b-2). Aturan umum: `00-aturan-umum.md`.

## 1. Ringkasan
Tindakan terpanjang di game, dua kunjungan. **K1** membuka akses, mencari orifis, membentuk tiap saluran sampai panjang kerja, lalu dressing Ca(OH)₂ + tambalan sementara. **K2** (3–7 hari kemudian) irigasi akhir, obturasi gutta-percha, lalu basis + tambal permanen. Langkah **(per saluran)** diulang sesuai jumlah saluran: **anterior 1 · premolar 2 · molar 3** (revisi user).

## 2. Rasa yang dituju
Kerja sabar di ruang yang sangat sempit. Pemain menyelamatkan gigi yang tadinya hampir dicabut. Ini puncak keterampilan dokter di game, dan challenge #37 "PSA pertama" menandainya.

## 3. Aturan

### Syarat & dua set alat (revisi user 2026-11-17)
- PSA terbuka di **klinik tahap 3** setelah membeli **Set Endo Basic** (rak T2 Bahari Medika, Rp 9jt): K-file, gutta-percha, spreader, sealer. Panjang kerja hanya dari **rontgen**.
- **Set Endo Advanced** (Rp 15jt, butuh Basic): endomotor ProTaper, **EndoActivator**, **apex locator**. Endomotor, apex locator, dan obturasi tetap di T2 karena alat dasar PSA. T3 hanya loupe & alat bedah.
- Diagnosis: pulpitis ireversibel / nekrosis (juga varian gigi depan, 25% kasus pulpa setelah set terpasang). Dokter Rekan tidak menangani PSA.
- Alat harus steril (GDD §4 Sterilisasi); PSA menambah 1 set alat kotor.

### K1 — Pembukaan & pembentukan
| Langkah | Input | Catatan / kesalahan |
|---|---|---|
| 1. Bius | stBius (molar bawah perlu blok) | Pulpa vital + bius kurang → sakit akses ×2 |
| 2. Open akses | GOSOK arsir atap pulpa (anterior dari sisi lidah) | Terlalu lebar = minor; keluar jauh = **perforasi (berat)** |
| 3. Eksplorasi orifis | Klik mulut saluran di dasar kamar pulpa sampai semua ketemu | Salah klik > 4 = goresan dasar kamar (minor) |
| 4a. Glide path (per saluran) | File tangan kecil, RITME 4 ketukan | — |
| 4b. Panjang kerja (per saluran) | **Advanced**: TAHAN dengan apex locator, lepas di "PAS" (zona lebar). **Basic**: foto rontgen dengan file di saluran (+5 mnt, energi +2), baca *pas / lewat / kurang*, zona sempit 8% | Lewat apeks > 1 dtk = file patah (berat); pendek = minor |
| 4c. Shaping (per saluran) | **Advanced**: ProTaper SX (sepertiga korona) → S1 → S2 → F1 → F2, irigasi NaOCl tiap ganti file. **Basic**: K-file #20 → #25 → #30 → #35, RITME 8 ketukan | Lompat urutan / lupa irigasi = galat |
| 5. Irigasi & dressing | URUT NaOCl → paper point → Ca(OH)₂ → kapas | GIC permanen sebelum obturasi = galat |
| 6. Tambalan sementara | Sub-minigame `03` | Mengikuti `03` |

### K2 — Pengisian (3–7 hari kemudian)
| Langkah | Input | Catatan / kesalahan |
|---|---|---|
| 1. Buka tambalan sementara | GOSOK singkat | Sisa tertinggal = minor |
| (Dressing basi > 14 hari) | URUT NaOCl → paper point | Disisipkan otomatis |
| 2. Irigasi akhir | URUT **NaOCl → salin → EDTA → salin → NaOCl → paper point** | Tanpa bilas salin di antara EDTA dan NaOCl = galat (EDTA menonaktifkan klorin bebas NaOCl) |
| 3. Aktivasi (hanya Advanced) | TAHAN EndoActivator | — |
| 4. Sealer | Oles sealer | Membasahi lagi setelah kering = galat |
| 5. Obturasi (per saluran) | TAHAN master cone (F2 Advanced / #35 Basic) lepas di panjang kerja, lalu kondensasi lateral TEPAT ×2 | Lewat apeks = overfilling (minor); meleset = rongga |
| 6. Potong GP | TEPAT di mulut saluran | — |
| 7. Basis + tambal permanen | Pilih GIC atau komposit (komposit butuh bor high-speed + LED), isi + cek gigitan | Mengikuti `04`/`05` |

- **Bayaran**: 50% di K1, 50% di K2. Pasien yang tidak kembali tidak membayar sisanya.
- **Jadwal K2**: otomatis 3–7 hari (`K2_DAYS`), pasien datang sendiri di hari itu.
- **Energi**: dasar 15 + K1 anterior 0 / premolar 3 / molar 5; Set Basic +3 (kerja tangan lebih lama).

## 4. Rumus
```
saluran = 1 (anterior) · 2 (premolar) · 3 (molar)
bayaran_K1 = harga_tarif × K1_SHARE (0,5) ; bayaran_K2 = harga_tarif × (1 − K1_SHARE)
energi_K1 = 15 + EN1[jenis] + (Basic ? BASIC_EN 3 : 0)
panjang_gigi (mm) = acak per 0,5 mm: A 22–24 · P 20–22 · M 19–21
```
Zona dan sakit mengikuti `00-aturan-umum.md` §4.

## 5. Kasus khusus
- **K2 terlambat > 14 hari**: dressing basi, bilas ulang disisipkan di awal K2.
- **File patah / perforasi**: hasil Gagal; gigi tidak bisa dipertahankan → tawarkan cabut (`09`) atau rujuk.
- **Abses**: resep dulu (`02`), PSA di kunjungan berikutnya.
- **Alat belum steril**: PSA tidak muncul sebagai pilihan yang bisa dikerjakan sampai alat disterilkan.
- **Dilema biaya** (Tika, `03-pasien.md`): ditangani di Konsultasi; cabut sebagai alternatif.

## 6. Ketergantungan
GDD §4 (tahap 3, sterilisasi), §4.1, §5 (perawat steril, Dokter Rekan tidak PSA), §6 (rak T2). `02-resep.md`, `03-tambalan-sementara.md`, `04`/`05`, `09-cabut-penyulit.md`, `03-pasien.md`.

## 7. Tuning Knobs
| Knob | Nilai | Rentang aman | Memengaruhi |
|---|---|---|---|
| Zona panjang kerja Advanced (`WL_Z`) / Basic (`WLX_Z`) | 12% / 8% | 8–20% / 5–12% | Nilai apex locator |
| Toleransi lewat apeks (`OVER_S`) | 1 dtk | 0,5–2 dtk | Risiko file patah |
| Pembagian bayaran K1/K2 | 50/50 | 30/70–70/30 | Arus kas |
| Batas dressing basi (`STALE`) | 14 hari | 7–21 | Disiplin jadwal |
| Energi tambahan Basic (`BASIC_EN`) | 3 | 0–5 | Nilai upgrade ke Advanced |
| Harga Set Basic / Advanced | 9jt / 15jt | 8–15jt | Kapan PSA terbuka |

## 8. Kriteria lulus
- [x] PSA tidak tersedia sebelum tahap 3 atau tanpa Set Endo Basic (uji 3b-3).
- [x] Molar mengulang langkah per saluran 3×, premolar 2×, anterior 1× (draf-11…13, fase3b3-06).
- [x] Basic: panjang kerja dari rontgen + K-file; Advanced: apex locator + ProTaper + EndoActivator (fase3b3-06…09, draf).
- [x] Irigasi akhir tanpa salin di antara EDTA dan NaOCl → galat.
- [x] K2 otomatis terjadwal 3–7 hari setelah K1 (fase3b3-06/08).

## Sumber
- Buffer salin/aquades di antara EDTA dan NaOCl: EDTA mengikat klorin bebas sehingga NaOCl kehilangan daya larut jaringan (riset sesi 3b-3, ACC user).
- Semmelweis University, protokol PSA 2022 (akses lurus, apex locator, irigasi NaOCl tiap file, EDTA, dressing Ca(OH)₂, kondensasi lateral): https://semmelweis.hu/konzervalo-fogaszat/files/2022/07/RCT-protocol-2022.pdf
- AAE, *Cleaning and Shaping*: https://www.aae.org/specialty/wp-content/uploads/sites/2/2017/07/cleaning-and-shaping-2006-final.doc
- Ultradent, protokol irigasi endodontik: https://blog.ultradent.com/clinical-guide-endodontic-irrigation-protocol?hsLang=en
- Pulpdent, dressing kalsium hidroksida: https://www.pulpdent.com/wp-content/uploads/2019/09/p262-263.pdf
