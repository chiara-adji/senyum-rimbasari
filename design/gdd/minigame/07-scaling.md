# 07 — Scaling

> Status: **ACC 2026-11-11** (angka bertanda [usulan] dipakai sebagai nilai awal, disetel saat playtest) · **Sudah ada di GDD** §6 (drag karang → karang di bawah gusi → polishing → edukasi; T1 manual, T2 ultrasonik, T3 air polishing).
> Harga wajar 600rb T1 (GDD §4.1), tidak berubah. Aturan umum: `00-aturan-umum.md`.

## 1. Ringkasan
Membersihkan karang gigi. Dimainkan per sisi rahang (atas dan bawah, kiri dan kanan, ditampilkan sebagai 4 panel). Supaya tidak terlalu lama, yang dikerjakan hanya 4 gigi atas dan 4 gigi bawah, 2 gigi dekat garis tengah di tiap panel (revisi user 2026-11-12). Ini tindakan paling santai di game dan cocok untuk pemula. Untuk diagnosis gingivitis/kalkulus dan periodontitis ringan–sedang (GDD §6 ④).

## 2. Rasa yang dituju
Puas melihat gigi berubah dari kuning ke bersih, seperti "membersihkan kaca yang berembun" (kata Rina di narasi staf).

## 3. Aturan
| Langkah | Input | Zona dasar **[usulan]** | S_dasar sakit **[usulan]** | Kesalahan |
|---|---|---|---|---|
| 1. Karang di atas gusi | Klik gumpalan karang kuning; satu klik = satu gumpal lepas (revisi user 2026-11-12, dulu GOSOK) | — | 4 tiap menyentuh gusi | Menyentuh gusi → berdarah + sakit. Lebih dari 5 kali → kecil. |
| 2. Karang di bawah gusi | Klik gumpalan karang gelap di bawah garis gusi (revisi user 2026-11-12, dulu GOSOK). Kedalaman poket ditampilkan sebagai garis tipis. **Hanya muncul pada kasus periodontitis** (poket 4–5 mm). | 25% | 6, terlalu dalam +12 | Melewati dasar poket → sakit tinggi. Karang tersisa > 15% → kontrol tidak membaik (kecil). |
| 3. Polishing | GOSOK cepat di seluruh permukaan | 45% | 1 | — |
| 4. Edukasi | PILIH 1 dari 3 tips | — | — | Tips tidak cocok → kecil |

- **Bius**: tidak dipakai untuk langkah 1. Untuk langkah 2, topikal boleh dipakai (PILIH di awal langkah).
- **Efek tier**:
  - T1 manual (scaler tangan + kuret): kecepatan GOSOK normal.
  - T2 ultrasonik: karang lepas 2× lebih cepat **[usulan]**, dan ada semprotan air (visual).
  - T3 air polishing: langkah 3 otomatis selesai dan noda kopi/teh hilang. Pasien yang mengeluh noda kopi mendapat trust +1 **[usulan]**.
- **Pasien jantung / pacemaker**: tombol ultrasonik dicoret, jadi pemain harus memakai manual. Kalau ultrasonik tetap dipakai (riwayat tidak ditanyakan) → **kesalahan berat** (komplikasi).
- **Diabetes** (Bu Lastri): tips edukasi yang benar adalah "gula darah memengaruhi gusi". Jadwal kontrol wajib dibuat.
- **Pengencer darah**: gusi lebih mudah berdarah (visual saja). Scaling tetap aman dan tidak ada langkah tambahan.
- **Herba**: Sirih → trust +3 setelah scaling (GDD §7). Daun Mint → bayaran +10%.
- **Staf**: Perawat dan Dokter Rekan (otomatis di kursi 2) mengikuti aturan umum.
- **Energi**: 12, atau 15 kalau ada langkah 2 **[usulan]**. **Durasi**: ±25–35 detik nyata.

## 4. Rumus
```
progres_karang += kecepatan_gosok × (T2 ultrasonik ? 2 : 1) per detik
```
Zona dan sakit mengikuti `00-aturan-umum.md` §4.

## 5. Kasus khusus
- **Periodontitis ringan–sedang**: scaling + kontrol (GDD §6). Kontrol dijadwalkan otomatis **[usulan 14 hari]**.
- **Periodontitis berat** (goyang derajat 3): scaling bukan pilihan yang benar. Diagnosisnya cabut (GDD §6).
- **Pasien influencer** (Mbak Dina): scaling + komposit anterior, tanpa whitening (`03-pasien.md`).
- **Noda tanpa karang**: hanya langkah 3–4 yang dimainkan, ditagih sebagai scaling biasa.

## 6. Ketergantungan
GDD §4.1, §5, §6, §7. `00-aturan-umum.md` §3.5 (jantung, diabetes). `01-konsultasi.md` (edukasi). `03-pasien.md`. `05-staf.md` (Rina).

## 7. Tuning Knobs (usulan)
| Knob | Usulan | Rentang aman | Memengaruhi |
|---|---|---|---|
| Kecepatan ultrasonik | 2× | 1.5–3× | Nilai upgrade T2 |
| Batas sentuh gusi | 5 kali | 3–8 | Ketelitian |
| Ambang karang tersisa | 15% | 10–25% | Hasil kontrol |
| Jadwal kontrol periodontitis | 14 hari | 7–30 | Kunjungan ulang |
| Energi | 12 / 15 | 10–15 | — |

## 8. Kriteria lulus
- [ ] Langkah 2 hanya muncul pada diagnosis periodontitis.
- [ ] Pasien pacemaker → tombol ultrasonik dicoret, kecuali riwayatnya tidak ditanyakan.
- [ ] Di T2, waktu membersihkan panel yang sama setengah dari T1.
- [ ] Dengan Sirih di baki, trust pasien +3 setelah scaling.

## Sumber
- Dimensions of Dental Hygiene, instrumentasi ultrasonik dan pertimbangannya (termasuk pacemaker): https://dimensionsofdentalhygiene.com/article/power-instrumentation-considerations/
- Dimensions of Dental Hygiene, efektivitas alat tangan vs ultrasonik: https://dimensionsofdentalhygiene.com/?p=8232
