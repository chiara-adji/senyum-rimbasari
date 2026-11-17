# 08 — Cabut Gigi Susu (Anak)

> Status: **ACC 2026-11-11** (angka bertanda [usulan] dipakai sebagai nilai awal, disetel saat playtest) · **Sudah ada di GDD** §6 (gigi susu persistensi → cabut gigi susu dengan bius topikal; urutan cabut umum).
> Harga wajar 250rb T1 (GDD §4.1), tidak berubah. Aturan umum: `00-aturan-umum.md`.

## 1. Ringkasan
Versi cabut yang paling pendek, untuk pasien anak. Fokusnya bukan kekuatan, melainkan menjaga anak tetap tenang: Bar Sakit pasien anak naik lebih cepat, tetapi Lidah Buaya bisa menurunkannya. Langkahnya mengikuti urutan cabut di GDD §6, dengan elevator yang dilewati untuk gigi yang sudah goyang.

## 2. Rasa yang dituju
Dokter yang sabar dengan anak kecil. Kalau berhasil, anak pulang membawa giginya di kotak kecil ("kenang-kenangan hiu", Kiki).

## 3. Aturan
| Langkah | Input | Zona dasar **[usulan]** | S_dasar sakit **[usulan]** | Kesalahan |
|---|---|---|---|---|
| 1. Antiseptik | Klik kapas → oles area gusi (GOSOK singkat) | 45% | — | Terlewat → kecil, risiko infeksi |
| 2. Bius | PILIH: **topikal** (gigi goyang/persistensi) · infiltrasi (gigi susu belum goyang) · blok (molar susu bawah). Topikal = TEPAT oles + tunggu 3 detik. Suntik = TAHAN. | 30% | Suntik 8 (anak) | Bius tidak cocok dengan gigi → B_bius 0 |
| 3. Goyang & cabut | RITME dengan tang anak, 4–6 ketukan. Ketukannya longgar. | 35% | 6 per ketukan merah | Ketukan merah berulang → akar gigi susu patah (kecil, lihat Kasus khusus) |
| 4. Tampon + cek | Klik tampon, lalu klik "cek soket" | — | — | Tampon terlewat → perdarahan ringan (kecil) |

- Instruksi pulang diberikan lewat kartu di `02-resep.md` (gigit tampon 30 menit, jangan kumur keras 24 jam).
- **Pasien anak**: S_dasar sakit dikali 1.3 **[usulan]**. Lidah Buaya −30% (GDD §7). Perawat −20%.
- **Bar Sakit penuh**: anak menangis atau menggigit (Kiki), tindakan berhenti, dan diulang lain hari (sudah diatur di narasi).
- **Tier alat**: T1 sudah cukup (tang + infiltrasi). Blok terbuka di T2 dan hanya diperlukan untuk molar susu bawah yang belum goyang.
- **Energi**: 10 **[usulan]**. **Durasi**: ±15 detik nyata.

## 4. Rumus
```
sakit_anak = S_dasar × 1.3 × (1 − B_bius) × pengurang_umum
```
Contoh: ketukan merah (6), topikal, Lidah Buaya, Perawat → 6 × 1.3 × 0.7 × 0.7 × 0.8 = **3.1**.

## 5. Kasus khusus
- **Akar gigi susu patah sebagian**: kesalahan kecil, bukan berat. Sisa akar kecil gigi susu dibiarkan diserap tubuh, dan kontrol dijadwalkan. Penjelasannya muncul di kartu edukasi.
- **Gigi tetap di bawahnya**: game tidak mensimulasikan benih gigi tetap. Ketukan merah 3× berturut-turut di molar susu dihitung kesalahan berat **[usulan]** (benih gigi tetap terganggu).
- **Gigi susu yang belum waktunya lepas dan tidak bermasalah**: diagnosis salah. Tidak ada tindakan, cukup konsultasi.
- **Anak dengan orang tua yang menolak**: ditangani di Persetujuan (GDD §6 ⑤).

## 6. Ketergantungan
GDD §4.1, §5, §6, §7. `02-resep.md` (instruksi pulang), `01-konsultasi.md` (cara bicara dengan anak), `03-pasien.md` (Kiki).

## 7. Tuning Knobs (usulan)
| Knob | Usulan | Rentang aman | Memengaruhi |
|---|---|---|---|
| Pengali sakit anak | 1.3 | 1.0–1.6 | Nilai Lidah Buaya & Perawat |
| Ketukan RITME | 4–6 | 3–8 | Durasi |
| Ketukan merah berturut → berat | 3 | 2–5 | Risiko |
| Energi | 10 | 8–12 | — |

## 8. Kriteria lulus
- [ ] Gigi susu goyang + topikal → B_bius 0.3 berlaku.
- [ ] Molar susu bawah tidak goyang + topikal → B_bius 0.
- [ ] Bar Sakit penuh pada Kiki → animasi menggigit, tindakan berhenti.
- [ ] Akar gigi susu patah sebagian → hasil Cukup, bukan Gagal.

## Sumber
- AAPD, penggunaan anestesi lokal pada pasien anak (topikal untuk gigi susu goyang): https://www.aapd.org/research/oral-health-policies--recommendations/use-of-local-anesthesia-for-pediatric-dental-patients/
- SDCEP, anestesi lokal pada anak (infiltrasi untuk sebagian besar gigi susu, blok untuk molar susu bawah): https://www.childcaries.sdcep.org.uk/guidance/dental-techniques/local-anaesthesia/
