# 04 — Tambal GIC

> Status: **ACC 2026-11-11** (angka bertanda [usulan] dipakai sebagai nilai awal, disetel saat playtest) · **Sudah ada di GDD** §6 (Tambal; T1 = bor low-speed + GIC). Langkah ③ disesuaikan untuk GIC berdasarkan riset.
> Harga wajar 400rb T1 (GDD §4.1), tidak berubah. Aturan umum: `00-aturan-umum.md`.

## 1. Ringkasan
Tambalan pertama yang bisa dikerjakan pemain sejak tahap 1. Ada 5 langkah. Bagian paling menegangkan adalah membor karies tanpa menyentuh zona pulpa. Untuk diagnosis karies dentin dan pulpitis reversibel (GDD §6 ④).

## 2. Rasa yang dituju
Kerja teliti dengan alat seadanya. Bor low-speed bergetar dan membuat pasien meringis, jadi pemain belajar bekerja pendek-pendek dan sabar.

## 3. Aturan
| Langkah | Input | Zona dasar **[usulan]** | S_dasar sakit **[usulan]** | Kesalahan |
|---|---|---|---|---|
| 1. Bius (opsional) | PILIH bius → TAHAN suntik | 30% (TAHAN) | Suntik 6, terlalu cepat +10 | Karies dangkal boleh tanpa bius. Karies dalam tanpa bius → sakit bor berlipat. |
| 2. Bor karies | GOSOK area cokelat sampai bersih | 30% | 10 per detik getar, +15 kalau menyentuh tepi pulpa | **Masuk zona pulpa merah → perforasi (berat)**. Sisa karies >10% → pasien kembali mengeluh (kecil). |
| 3. Siapkan kavitas | URUT: kapas isolasi → kondisioner poliakrilat → bilas → keringkan ringan (TAHAN, lepas di zona "lembap") | 35% (keringkan) | — | Memakai etsa fosfat, melewatkan kondisioner, atau mengeringkan berlebihan → tambalan lepas saat kontrol (kecil). Karies dalam: **pelapik** wajib masuk urutan sebelum isi; kalau terlewat, ngilu menetap (kecil). |
| 4. Isi + lapisi | TEPAT saat adonan masih mengkilap (penanda berubah dari mengkilap ke kusam) → klik varnish | 30% | — | Adonan sudah kusam → tambalan rapuh (kecil). Tanpa varnish → permukaan kapur (kecil). |
| 5. Cek gigitan | Klik titik biru tinggi di kertas artikulasi (1–3 titik) | — | — | Titik terlewat → pasien mengeluh mengganjal (kecil). |

- **Perforasi** (kesalahan berat): hasil Gagal. Diagnosis berubah menjadi "pulpa terbuka → PSA" (GDD §6). Kalau PSA belum terbuka, lihat Kasus khusus.
- **Efek tier**:
  - T1: bor low-speed. Kecepatan GOSOK normal, getaran menambah sakit.
  - T2 (high-speed): GOSOK 1.5× lebih cepat, getaran sakit −50% **[usulan]**. GIC tetap bisa dipilih di T2/T3. Harga wajarnya ikut pengali tier GDD.
  - T3 (loupe): tepi zona pulpa digambar dengan garis putus-putus yang jelas, ditambah pengali zona umum.
- **Staf & herba**: aturan umum (Perawat, Cengkeh, Lidah Buaya untuk anak, Kunyit kalau darurat).
- **Energi**: 12 **[usulan]**. **Durasi**: ±25 detik nyata.

## 4. Rumus
Mengikuti `00-aturan-umum.md` §4. Contoh: bor (Z 30%) di T1, tanpa staf, stres 30, kasus mudah → zona 30%. Sakit getar dengan infiltrasi: 10 × 0.3 = 3 per detik.

## 5. Kasus khusus
- **Perforasi saat PSA belum terbuka** (tahap 1–2): pasang tambalan sementara (`03`) + resep. Hasil Gagal. Pasien memilih cabut sekarang atau kembali setelah PSA terbuka (tercatat di Rekam Medis).
- **Pasien anak** (gigi susu berlubang): boleh GIC. Lidah Buaya berlaku.
- **Klaim ngilu** (#31 Pak Gunawan): kalau tambalan Cukup karena pelapik terlewat, pemeriksaan ulang menemukan gigi yang sama. Kalau tambalannya Sukses, ngilu berasal dari gigi sebelahnya (narasi yang sudah ada).
- **Stres > 50**: zona −10% (GDD §3).

## 6. Ketergantungan
GDD §3, §4.1, §5, §6, §7. `03-tambalan-sementara.md`, `05-tambal-komposit.md` (urutan yang sama), `06-psa.md` (perforasi), `02-resep.md` (kartu instruksi), `03-pasien.md` (Pak Gunawan).

## 7. Tuning Knobs (usulan)
| Knob | Usulan | Rentang aman | Memengaruhi |
|---|---|---|---|
| Zona bor | 30% | 20–40% | Risiko perforasi |
| Sakit getar low-speed | 10/dtk | 6–15 | Pentingnya bius & T2 |
| Ambang sisa karies | 10% | 5–20% | Ketelitian |
| Bonus high-speed | 1.5× cepat, −50% getar | 1.2–2× / −30–70% | Nilai upgrade T2 |
| Energi | 12 | 10–15 | — |

## 8. Kriteria lulus
- [ ] Kursor masuk zona pulpa → hasil Gagal, diagnosis berubah ke PSA.
- [ ] Karies dalam tanpa pelapik → hasil Cukup, kontrol berikutnya ada keluhan ngilu.
- [ ] Etsa fosfat di urutan GIC dihitung kesalahan kecil.
- [ ] Di T2, sakit getar per detik setengah dari T1 (kondisi lain sama).

## Sumber
- Dental Update, panduan GIC konvensional: https://dental-update.co.uk/content/restorative-dentistry/conventional-glass-ionomer-cements-a-guide-for-practitioners
- Dental Update, teknik GIC di gigi posterior: https://dental-update.co.uk/content/technique-tips/technique-tips-glass-ionomers-in-posterior-teeth-a-technique-guide
- AACD, 20 tips glass ionomer (kondisioner 10–20 dtk, jangan terlalu kering, lapisi pelindung, hindari etsa rutin): https://aacd.com/proxy/files/Students%20and%20Faculty/20%20tips%20Glass%20Ionomers.pdf
