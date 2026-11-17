# 06 — PSA (Perawatan Saluran Akar)

> Status: **ACC 2026-11-11** (angka bertanda [usulan] dipakai sebagai nilai awal, disetel saat playtest) · **Sudah ada di GDD** §6 (2 kunjungan, tahap 3+, T2 file tangan, T3 rotary + apex locator).
> Harga wajar (GDD §4.1, tidak berubah): 2,5jt anterior / 3,5jt premolar / 5jt molar. Aturan umum: `00-aturan-umum.md`.

## 1. Ringkasan
Tindakan terpanjang di game, dibagi menjadi dua kunjungan. K1 membuka dan membersihkan saluran, lalu menutupnya sementara. K2 (3–7 hari kemudian) membentuk saluran sampai panjang kerja, mengisinya, dan memasang tambalan permanen. Langkah yang bertanda **(per saluran)** diulang sesuai jumlah saluran: anterior 1 · premolar 2 · molar 3–4 (GDD §6).

## 2. Rasa yang dituju
Kerja sabar di ruang yang sangat sempit. Pemain menyelamatkan gigi yang tadinya hampir dicabut. Ini puncak keterampilan dokter di game, dan challenge #37 "PSA pertama" menandainya.

## 3. Aturan

### K1 — Pembukaan
| Langkah | Input | Zona dasar **[usulan]** | S_dasar sakit **[usulan]** | Kesalahan |
|---|---|---|---|---|
| 1. Bius | PILIH → TAHAN. Molar bawah perlu **blok**. | 30% | Suntik 6 | Bius kurang (pulpitis ireversibel, pulpa masih vital) → sakit akses ×2 |
| 2. Akses | GOSOK untuk membuka atap pulpa, ikuti bayangan ruang pulpa | 28% | 8/dtk | Keluar dari garis ke samping → **perforasi (berat)** |
| 3. Ekstirpasi + panjang kerja (per saluran) | TAHAN: file masuk pelan, lepas di garis apeks | T2: 18% · T3: 40% | 4, lewat apeks +20 | Lewat apeks → hasil maksimal Cukup. Terlalu pendek → kecil, jaringan tersisa. |
| 4. Irigasi + dressing | URUT: NaOCl (TAHAN pelan) → paper point → Ca(OH)₂ | 30% (irigasi) | Terlalu cepat +30 | Irigasi terlalu cepat → kecil + sakit melonjak. Dressing terlewat → kecil, pasien kembali ngilu sebelum K2. |
| 5. Tambalan sementara | Sub-minigame `03` (pilih ZOE atau bahan tanpa eugenol) | — | — | Mengikuti `03` |

- **Panjang kerja di T2**: garis apeks hanya terlihat di foto rontgen kecil di pojok layar, jadi zonanya sempit. Rontgen periapikal sudah ada sejak tahap 2.
- **Panjang kerja di T3** (apex locator): alat berbunyi bip makin cepat saat file mendekati apeks, dan zonanya lebar. Bisa dipakai tanpa rontgen.

### K2 — Pembentukan & pengisian
| Langkah | Input | Zona dasar **[usulan]** | S_dasar sakit **[usulan]** | Kesalahan |
|---|---|---|---|---|
| 1. Buka tambalan sementara | GOSOK singkat. Bius opsional (pulpa sudah tidak vital). | 40% | 2 | — |
| 2. Preparasi (per saluran) | **T2 file tangan**: URUT nomor file 15 → 20 → 25 → 30 (molar sampai 35). Tiap file dimainkan dengan RITME putar–tarik, dan irigasi setiap ganti file (klik). **T3 rotary**: satu sekuens TAHAN per saluran, 2× lebih cepat. | RITME 30% · TAHAN 35% | 3 | Melompati nomor file atau 3 ketukan merah berturut-turut → **file patah (berat)**. Lupa irigasi → kecil. |
| 3. Irigasi akhir | URUT: EDTA → NaOCl → keringkan dengan paper point | — | — | Urutan salah → kecil |
| 4. Obturasi (per saluran) | TEPAT: gutta-percha tepat di panjang kerja, lalu spreader lateral TEPAT ×2 | 25% | 3 | Pendek atau lewat → hasil maksimal Cukup |
| 5. Tambal permanen | Versi pendek GIC/komposit: isi (TEPAT) + cek gigitan | 35% | — | Mengikuti `04`/`05` |

- **Peluang file patah di T3**: rotary memakai TAHAN. File hanya patah kalau kursor melewati garis merah selama lebih dari 1 detik, jadi lebih sulit terjadi dibanding T2 **[usulan]**.
- **Bayaran**: 50% di K1, 50% di K2 **[usulan; keputusan sementara, perlu review user]**. Kalau pasien tidak kembali untuk K2, 50% sisanya tidak dibayar.
- **Jadwal K2**: dibuat otomatis 3–7 hari setelah K1 (GDD). Pasien dari desa menginap di Losmen Singgah malam sebelumnya dan masuk antrian pertama jam 08:00 (`06-jadwal.md`).
- **Staf & herba**: aturan umum. Dokter Rekan **tidak** menangani PSA (GDD §5 hanya menyebut konsultasi, scaling, tambal).
- **Energi** **[usulan]**: K1 15. K2 15 / 18 / 20 untuk anterior / premolar / molar.
- **Durasi**: K1 ±30–50 detik nyata, K2 ±40–70 detik (tergantung jumlah saluran).

## 4. Rumus
```
langkah_per_saluran = 1 (anterior) · 2 (premolar) · 3–4 (molar; 4 kalau kasus sulit)
bayaran_K1 = harga_tarif × 0.5 ; bayaran_K2 = harga_tarif × 0.5
```
Zona dan sakit mengikuti `00-aturan-umum.md` §4. Contoh: panjang kerja T2 (Z 18%) dengan Perawat, kasus sedang → 18 × 1.2 × 1.15 ÷ 1.3 = 19.1%.

## 5. Kasus khusus
- **K2 terlambat > 14 hari** **[usulan]**: dressing dianggap basi, dan langkah 3 K1 (irigasi + dressing) disisipkan lagi di awal K2.
- **File patah**: hasil Gagal. Pasien ditawari cabut (`09`) atau dirujuk ke Metrapura (dialog, tanpa mekanik baru).
- **Perforasi saat akses**: hasil Gagal. Gigi tidak bisa dipertahankan, jadi rencana berubah ke cabut.
- **Abses**: resep dulu (`02`), pasien menginap semalam di Puskesmas, lalu PSA di kunjungan berikutnya (GDD §6, `06-jadwal.md`).
- **Pasien hamil trimester 1, kasus darurat**: K1 boleh tanpa rontgen kalau apex locator (T3) sudah dimiliki. Tanpa T3: tambalan sementara + resep parasetamol, PSA di trimester 2.
- **Dilema biaya** (Tika, `03-pasien.md`): ditangani di Konsultasi. PSA molar atau cabut sebagai alternatif.

## 6. Ketergantungan
GDD §4, §4.1, §5, §6, §7. `02-resep.md`, `03-tambalan-sementara.md`, `04`/`05` (tambal permanen, perforasi), `09-cabut-penyulit.md` (alternatif), `03-pasien.md` (Mas Rudi, Tika, Andre), `06-jadwal.md` (Losmen, Puskesmas).

## 7. Tuning Knobs (usulan)
| Knob | Usulan | Rentang aman | Memengaruhi |
|---|---|---|---|
| Zona panjang kerja T2 / T3 | 18% / 40% | 12–25% / 30–50% | Nilai apex locator |
| Toleransi rotary sebelum patah | 1 dtk di garis merah | 0.5–2 dtk | Risiko file patah T3 |
| Pembagian bayaran K1/K2 | 50/50 | 30/70–70/30 | Arus kas |
| Batas dressing basi | 14 hari | 7–21 | Disiplin jadwal |
| Energi K2 molar | 20 | 16–20 | Batas atas GDD |

## 8. Kriteria lulus
- [ ] PSA tidak tersedia sebelum tahap 3, atau tanpa alat T2 (file tangan).
- [ ] Molar dengan 3 saluran mengulang langkah K1-3, K2-2, dan K2-4 sebanyak 3 kali.
- [ ] Melompati nomor file di T2 → file patah, hasil Gagal.
- [ ] Di T3, langkah panjang kerja bisa diselesaikan tanpa membuka rontgen.
- [ ] K2 otomatis terjadwal 3–7 hari setelah K1.

## Sumber
- Semmelweis University, protokol PSA 2022 (akses lurus, apex locator, irigasi NaOCl tiap file, EDTA, dressing Ca(OH)₂, kondensasi lateral): https://semmelweis.hu/konzervalo-fogaszat/files/2022/07/RCT-protocol-2022.pdf
- AAE, *Cleaning and Shaping*: https://www.aae.org/specialty/wp-content/uploads/sites/2/2017/07/cleaning-and-shaping-2006-final.doc
- Ultradent, protokol irigasi endodontik: https://blog.ultradent.com/clinical-guide-endodontic-irrigation-protocol?hsLang=en
- Pulpdent, dressing kalsium hidroksida: https://www.pulpdent.com/wp-content/uploads/2019/09/p262-263.pdf
