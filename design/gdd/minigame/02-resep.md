# 02 — Resep

> Status: **ACC 2026-11-11** (angka bertanda [usulan] dipakai sebagai nilai awal, disetel saat playtest) · **Baru** (di GDD §6 resep ada sebagai langkah ⑦ "Resep & Instruksi" dan harga 100rb, belum berupa minigame).
> Aturan umum: `00-aturan-umum.md`. Harga wajar 100rb T1 (GDD §4.1), tidak berubah.

## 1. Ringkasan
Pemain menyusun resep dari rak obat dengan input PILIH, tanpa Bar Sakit. Resep muncul di dua tempat:
1. Sebagai langkah ⑦ setelah tindakan.
2. Sebagai tindakan sendiri, misalnya pada kasus abses ("resep dulu → PSA/cabut", GDD §6 ④), pasien hipertensi yang tindakannya ditunda, atau pasien hamil yang perawatannya ditunda.

Dosis dibuat sebagai kartu aturan pakai, bukan angka miligram.

## 2. Rasa yang dituju
Dokter yang tidak asal memberi antibiotik. Kalau pemain hafal pasiennya (hamil, alergi), resepnya aman. Kalau lupa bertanya di anamnesis, kesalahannya muncul di sini.

## 3. Aturan

**Rak T1** (tersedia dari tahap 1): parasetamol, ibuprofen, amoksisilin, metronidazol, klindamisin, obat kumur klorheksidin. Stok obat dianggap bagian dari stok bahan (GDD §4) **[usulan]**: satu resep memakai stok seperti satu tindakan ringan.

| Langkah | Yang dipilih | Aturan |
|---|---|---|
| 1. Pereda sakit | Parasetamol / ibuprofen / tidak perlu | Hamil → **parasetamol**. Pasien lain bebas memilih. Setelah cabut, bedah, atau abses, pereda sakit wajib diberikan. |
| 2. Antibiotik | Tidak / amoksisilin / amoksisilin + metronidazol / klindamisin | Hanya untuk **abses yang belum bisa didrainase hari itu** atau **bengkak menyebar/demam**. Bengkak menyebar → amoksisilin + metronidazol. Alergi penisilin → klindamisin. Kasus lain → tidak perlu. |
| 3. Aturan pakai | Pilih 1 dari 3 kartu | Antibiotik → "3×1 sehari, 5 hari, kontrol hari ke-3". Pereda sakit → "bila perlu, maksimal 3×1 sehari". |
| 4. Instruksi pulang | Pilih 2 dari 4 kartu | Harus cocok dengan tindakan hari itu (tabel di bawah). |

**Kartu instruksi yang benar per tindakan:**
| Tindakan | Instruksi benar (2 dari 4 kartu yang muncul) |
|---|---|
| Cabut / bedah minor | Gigit tampon 30 menit · Jangan kumur keras dan jangan merokok 24 jam |
| Tambal GIC | Jangan makan 1 jam · Hindari gigitan keras di gigi itu hari ini |
| Tambal komposit | Boleh langsung makan · Kembali kalau gigitan terasa mengganjal |
| Tambalan sementara / PSA K1 | Jangan mengunyah di sisi itu · Wajib kembali sesuai jadwal |
| Scaling | Gusi ngilu 1–2 hari itu wajar · Sikat gigi 2×, pakai benang gigi |
| Abses (resep dulu) | Kompres hangat di dalam mulut, bukan dingin di pipi · Kembali kalau bengkak menjalar ke mata/leher |

**Kesalahan:**
| Jenis | Contoh | Hasil |
|---|---|---|
| Berat | Ibuprofen untuk pasien hamil | Gagal, komplikasi |
| Berat | Amoksisilin untuk pasien alergi penisilin | Gagal, reaksi alergi, pasien dirujuk ke Puskesmas (dialog dr. Galih) |
| Berat | Abses menyebar tanpa antibiotik | Gagal, pasien kembali besok dengan bengkak lebih parah |
| Kecil | Antibiotik untuk karies/pulpitis biasa (resep berlebihan) | Cukup |
| Kecil | Kartu aturan pakai atau instruksi pulang salah | Cukup |

Kesalahan berat di resep juga membuat tindakan sebelumnya pada kunjungan yang sama ikut turun menjadi Gagal **[usulan]**, karena pasien pulang dengan komplikasi.

- **Kaitan narasi**: pasien abses dan pasien setelah bedah minor menginap semalam di Puskesmas (`06-jadwal.md`). PSA atau cabut untuk kasus abses dilakukan di kunjungan berikutnya.
- **Tier alat**: tidak berpengaruh.
- **Staf & herba**: Resepsionis menangani tagihan resep otomatis (GDD §5). Herba tidak berpengaruh, kecuali Daun Mint untuk bayaran (§7).
- **Energi**: 2 **[usulan]**. **Durasi**: 5 menit game **[usulan]**.

## 4. Rumus
Tidak ada rumus baru. Harga mengikuti GDD §4.1 (100rb × tier × musim).

## 5. Kasus khusus
- **Pasien hamil + abses menyebar**: amoksisilin + metronidazol tetap benar (keduanya umum dipakai pada kehamilan dengan pertimbangan dokter). Pereda sakit wajib parasetamol.
- **Alergi penisilin tidak ditanyakan**: game tetap menghitung amoksisilin sebagai kesalahan berat, karena tujuan anamnesis memang untuk mencegah hal ini.
- **Pasien tensi tinggi yang ditunda**: resep berisi pereda sakit saja. Kartu instruksinya "minum obat tensi rutin, kembali 3 hari lagi" (kasus Pak Hasan).
- **Resep tanpa tindakan untuk pasien tanpa keluhan sakit**: langkah 1 benar kalau memilih "tidak perlu".

## 6. Ketergantungan
GDD §4, §4.1, §5, §6 ①, ④, ⑦. `00-aturan-umum.md` §3.5 (riwayat medis). `03-pasien.md` (Rudi abses, Pak Hasan hipertensi, Bu Yati hamil). `06-jadwal.md` (rawat inap Puskesmas). Semua file tindakan (kartu instruksi pulang).

## 7. Tuning Knobs (usulan)
| Knob | Usulan | Rentang aman | Memengaruhi |
|---|---|---|---|
| Stok per resep | 1 tindakan ringan | 0–1 | Ekonomi bahan |
| Kesalahan berat menurunkan tindakan | ya | ya/tidak | Bobot langkah ⑦ |
| Energi | 2 | 0–5 | — |
| Durasi | 5 menit game | 3–10 | — |

## 8. Kriteria lulus
- [ ] Pasien hamil + ibuprofen → hasil Gagal.
- [ ] Pasien alergi penisilin + klindamisin → benar.
- [ ] Pulpitis reversibel + amoksisilin → hasil Cukup (resep berlebihan).
- [ ] Setelah cabut, kartu "gigit tampon 30 menit" tersedia dan dihitung benar.
- [ ] Abses → pasien menginap di Puskesmas malam itu (kalau narasi mengaktifkannya).

## Sumber
- SDCEP Dental Prescribing, abses gigi (amoksisilin lini pertama, durasi ≤5 hari, review hari ke-3): https://www.sdcepdentalprescribing.nhs.scot/guidance/bacterial-infections/dental-abscess/first-line-antibiotics/amoxicillin/
- NHS Highland, antimikroba untuk abses gigi (drainase dulu, metronidazol bila menyebar, klindamisin bila alergi): https://rightdecisions.scot.nhs.uk/tam-treatments-and-medicines-nhs-highland/adult-therapeutic-guidelines/antimicrobial-guidance/dental-antimicrobial/dental-abscess-antimicrobial
- Australian Prescriber (ADA Therapeutics Committee), analgesik pada kehamilan: https://www.nps.org.au/australian-prescriber/articles/analgesics-and-pain-relief-in-pregnancy-and-breastfeeding
- MotherSafe NSW, perawatan gigi pada kehamilan: https://www.seslhd.health.nsw.gov.au/sites/default/files/groups/Royal_Hospital_for_Women/Mothersafe/documents/DentalpandbupdateAugust2019.pdf
