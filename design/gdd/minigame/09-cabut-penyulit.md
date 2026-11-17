# 09 — Cabut Gigi Tetap & Cabut dengan Penyulit

> Status: **ACC 2026-11-11** (angka bertanda [usulan] dipakai sebagai nilai awal, disetel saat playtest) · Cabut gigi tetap biasa **sudah ada di GDD** §6. Cabut dengan penyulit **baru**.
> Harga (keputusan user 2026-11-11, tanpa angka baru): **Cabut gigi tetap 600rb** × pengali kesulitan kasus GDD §4.1 (×1.0 biasa · ×1.3 · ×1.7 penyulit).
> Aturan umum: `00-aturan-umum.md`.

## 1. Ringkasan
Satu minigame dengan dua tingkat:
- **Cabut biasa** (GDD, T1): antiseptik → bius → suntik pelan → luksasi elevator → goyang berirama → tampon + instruksi.
- **Cabut dengan penyulit** (baru, tahap 2+, alat T2 periotome + bius blok): langkah tambahan untuk gigi yang mahkotanya rapuh, akarnya bengkok atau menyebar, atau ankilosis. Juga dipakai saat akar patah di tengah cabut biasa.

Cabut penyulit tetap **cabut tertutup**, yaitu tanpa membuka gusi dan tanpa membuang tulang. Kalau itu belum cukup, lanjut ke bedah minor (`10`).

## 2. Rasa yang dituju
Tangan yang tahu kapan berhenti menekan. Kesalahan klasik dokter muda adalah memakai tenaga, padahal yang dibutuhkan kesabaran.

## 3. Aturan

### 3.1 Cabut biasa (GDD)
| Langkah | Input | Zona dasar **[usulan]** | S_dasar sakit **[usulan]** | Kesalahan |
|---|---|---|---|---|
| 1. Antiseptik | GOSOK singkat | 45% | — | Terlewat → kecil |
| 2. Bius | PILIH: infiltrasi (rahang atas, gigi depan bawah) / blok (molar & premolar bawah, T2) → TAHAN suntik pelan | 30% | Suntik 6, terlalu cepat +10 | Bius tidak cocok → B_bius 0. Hipertensi/jantung: maksimal 2 karpul berepinefrin. |
| 3. Luksasi elevator | TAHAN + geser kursor sedikit di celah gusi–gigi | 30% | 5 | Terlalu dalam → sakit + kecil |
| 4. Goyang berirama | RITME 6–10 ketukan dengan tang | 30% | 8 per ketukan merah | **Ketukan merah 3× berturut-turut → akar patah (berat di cabut biasa → pindah ke 3.2 kalau alat ada)** |
| 5. Tampon + hemostasis | Klik tampon → TAHAN gigit (lama tekan tergantung pasien) | 35% | — | Pengencer darah: TAHAN 2× lebih lama, ditambah jahit kalau ada set bedah T3. Kalau terlewat → perdarahan (berat). |

### 3.2 Tambahan untuk penyulit (baru)
Penyulit ditentukan dari pemeriksaan dan rontgen (GDD §6 ②–③). Langkah tambahan disisipkan di antara langkah 2 dan 4:

| Langkah tambahan | Kapan muncul | Input | Zona dasar **[usulan]** | Kesalahan |
|---|---|---|---|---|
| A. Periotome | Semua penyulit | GOSOK melingkar mengikuti garis ligamen di sekeliling gigi | 25% | Keluar dari garis → gusi robek (kecil) |
| B. Separasi akar | Molar dengan akar menyebar/bengkok | GOSOK dengan bor high-speed di garis percabangan akar | 22% | Melewati garis → kena tulang, sakit + kecil |
| C. Cabut per akar | Setelah B | RITME pendek (4 ketukan) untuk tiap akar | 28% | Ketukan merah 3× → ujung akar patah (berat) |

- **Ketukan RITME lebih rapat**: pada kasus penyulit, jarak ketukan dikali 0.8 **[usulan]**, jadi pemain harus lebih tepat.
- **Akar patah di cabut biasa**:
  - Kalau periotome (T2) ada → minigame berlanjut ke langkah A dan C untuk sisa akar. Hasil maksimal Cukup. Biayanya otomatis naik ke kesulitan ×1.3.
  - Kalau periotome belum ada → tampon + resep, hasil Gagal. Pasien dijadwal ulang sebagai cabut penyulit atau bedah minor.
- **Molar atas (gigi 6–7 atas)**: ujung akar yang patah lalu didorong (ketukan merah saat langkah C) → **komunikasi ke sinus (berat)**. Pasien dirujuk ke Tanjung Arum (dialog), hasil Gagal.
- **Dry socket**: pasien perokok atau instruksi "jangan kumur keras/merokok 24 jam" terlewat → pasien kembali di hari ke-3 dengan nyeri hebat (ditangani sebagai konsultasi + resep, trust −3 **[usulan]**).
- **Efek tier**:
  - T1: tang, elevator, infiltrasi. Hanya cabut biasa.
  - T2: periotome + bius blok. Membuka cabut penyulit.
  - T3: set bedah minor. Ada jahitan di langkah 5 (zona +, waktu tampon −50%), dan membuka `10-bedah-minor.md`.
- **Herba**: Sirih → trust +3 setelah cabut. Cengkeh → sakit −30%. Kunyit kalau darurat.
- **Energi** **[usulan]**: cabut biasa 14. Penyulit 18.
- **Durasi**: biasa ±25 detik nyata, penyulit ±40 detik.

## 4. Rumus
```
harga = 600rb × pengali_tier × pengali_musim × K_kasus        (GDD §4.1)
K_kasus = 1.0 (biasa) · 1.3 (penyulit: 1 langkah tambahan) · 1.7 (penyulit: separasi akar)
jarak_ketukan_penyulit = jarak_ketukan_biasa × 0.8
```
Contoh: molar bawah dengan akar menyebar, T2, kemarau → 600rb × 1.6 × 1.1 × 1.7 = **1.795.200**. Angka ini mendekati, tetapi tidak sama dengan, harga bedah minor T1 1,5jt.

## 5. Kasus khusus
- **Sisa akar** (mahkota sudah hancur, akar terlihat): **keputusan sementara, perlu review user**. Kalau akarnya bisa dijangkau tanpa membuka gusi, dikerjakan dengan minigame ini (langkah A + C), tetapi ditagih harga GDD "Cabut sisa akar/bedah minor 1,5jt", karena GDD menggabungkan kedua tindakan itu dalam satu harga. Kalau akar di bawah tulang → `10`.
- **Abses (masih bengkak)**: resep dulu, cabut di kunjungan berikutnya (GDD §6). Cabut saat masih bengkak → bius hanya setengah efektif (B_bius × 0.5) **[usulan]** dan risiko komplikasi.
- **Hipertensi ≥ 160/100**: tunda (Pak Hasan, `03-pasien.md`).
- **Pengencer darah**: tetap jalan tanpa menghentikan obat. Tampon lebih lama, jahit kalau ada T3. Pasien jantung dengan pengencer darah (Pak Yusuf, `03-pasien.md`): konsultasi/rujuk ke dr. Galih dulu, lalu cabut hati-hati dengan tampon lebih lama.
- **Diabetes**: kontrol wajib. Kalau terlewat, luka lambat sembuh.
- **Periodontitis berat (goyang derajat 3, Pak Marno)**: cabut biasa dengan ketukan sangat longgar (jarak × 1.3) **[usulan]**.

## 6. Ketergantungan
GDD §4.1, §5, §6, §7. `00-aturan-umum.md` §3.5. `02-resep.md` (instruksi, dry socket). `06-psa.md` (alternatif cabut). `10-bedah-minor.md`. `03-pasien.md` (Pak Hasan, Pak Yusuf, Pak Marno, Bu Lastri, Nenek Sumi, Mas Rudi, Tika). `06-jadwal.md`.

## 7. Tuning Knobs (usulan)
| Knob | Usulan | Rentang aman | Memengaruhi |
|---|---|---|---|
| Ketukan merah berturut → akar patah | 3 | 2–4 | Risiko utama cabut |
| Pengali jarak ketukan penyulit | 0.8 | 0.6–0.9 | Kesulitan penyulit |
| Zona periotome / separasi | 25% / 22% | 18–35% | Kesulitan langkah baru |
| Trust dry socket | −3 | 0 sampai −6 | Pentingnya instruksi |
| Bius pada abses | ×0.5 | 0.3–0.8 | Dorongan "resep dulu" |
| Energi biasa / penyulit | 14 / 18 | 10–20 | — |

## 8. Kriteria lulus
- [ ] Tanpa periotome (T2), opsi "cabut penyulit" tidak tersedia, tetapi cabut biasa tetap tersedia.
- [ ] Akar patah di cabut biasa dengan periotome → minigame berlanjut, biaya otomatis ×1.3.
- [ ] Akar patah tanpa periotome → hasil Gagal, pasien dijadwal ulang.
- [ ] Pasien pengencer darah: langkah tampon memerlukan TAHAN 2× lebih lama.
- [ ] Perokok + instruksi terlewat → pasien kembali di hari ke-3.

## Sumber
- ADC study guide, teknik eksodonsia & komplikasi intraoperatif: https://open-exam-prep.com/study-guides/au-adc-written/oral-surgery/exodontia-techniques
- Journal of Dental Medicine (Tehran) 2023, insidensi dry socket pada pencabutan molar: https://journals.tums.ac.ir/jdm/article-1-6206-en.pdf
- Dr. Bicuspid, risiko komunikasi oroantral pada pencabutan molar atas: https://cdn.drbicuspid.com/dental-specialties/oral-maxillofacial-surgery/article/15744736/when-does-tooth-removal-cause-oroantral-communication
- SDCEP, pasien dengan antikoagulan (hemostasis lokal, tanpa menghentikan obat): https://companion.sdcep.org.uk/management-of-dental-patients-taking-anticoagulants-or-antiplatelet-drugs/treatment-recommendations/warfarin-or-another-vitamin-k-antagonist
