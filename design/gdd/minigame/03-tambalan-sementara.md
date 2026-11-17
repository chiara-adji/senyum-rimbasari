# 03 — Tambalan Sementara

> Status: **ACC 2026-11-11** (angka bertanda [usulan] dipakai sebagai nilai awal, disetel saat playtest) · Sudah disebut di GDD §6 sebagai langkah PSA K1. Detail minigamenya **baru**.
> **Bukan tindakan berbayar sendiri** (keputusan user 2026-11-11). Kalau dipakai tanpa tindakan lain, biayanya ditagih sebagai Konsultasi (150rb, GDD §4.1).
> Aturan umum: `00-aturan-umum.md`.

## 1. Ringkasan
Sub-minigame pendek (4 langkah) untuk menutup gigi berlubang sementara waktu. Dipakai di:
1. **Akhir PSA K1**, sebagai penutup sebelum K2 (`06-psa.md`).
2. **Darurat**: pulpitis yang perlu ditenangkan dulu, pasien datang sore, stok waktu habis, atau perforasi saat PSA belum terbuka (`04`/`05`).
3. **Pasien hamil trimester 1** yang tindakannya ditunda ke trimester 2 (kasus Bu Yati di `03-pasien.md`).

## 2. Rasa yang dituju
Pertolongan pertama yang rapi. Hari ini pasien belum sembuh, tapi pulang tanpa ngilu dan percaya bahwa dokternya punya rencana.

## 3. Aturan
| Langkah | Input | Zona dasar **[usulan]** | Kesalahan |
|---|---|---|---|
| 1. Bersihkan & keringkan | GOSOK kapas di dalam lubang | 40% | Ludah tersisa → tambalan mudah lepas (kecil) |
| 2. Pilih bahan | PILIH: ZOE (eugenol) / bahan tanpa eugenol | — | Rencana berikutnya komposit tapi memilih ZOE → komposit nanti paling tinggi Cukup (kecil) |
| 3. Isi & padatkan | TEPAT ×2 | 35% | Meleset 2× → tambalan berongga, pasien kembali ngilu (kecil) |
| 4. Cek gigitan | Klik 1–2 titik biru tinggi di kertas artikulasi | — | Terlewat → pasien mengeluh tambalan mengganjal (kecil) |

- **Memilih bahan**: ZOE menenangkan pulpa yang meradang, jadi cocok untuk pulpitis dan PSA K1. Bahan tanpa eugenol dipilih kalau tindakan berikutnya tambal komposit, karena eugenol melemahkan ikatan bonding.
- **Bar Sakit**: S_dasar 2 per kesalahan **[usulan]**. Tidak perlu bius.
- **Tidak ada kesalahan berat**. Hasil terburuknya Cukup. Kalau dipakai di dalam PSA K1, hasil langkah ini ikut dihitung ke hasil PSA.
- **Tier alat**: semua alat sudah tersedia di T1. Tier tidak berpengaruh.
- **Staf & herba**: aturan umum.
- **Energi**: kalau menjadi bagian PSA, sudah termasuk energi PSA. Kalau berdiri sendiri: 10 **[usulan]**.
- **Bahan**: memakai stok seperti tindakan ringan **[usulan]**. Kalau stok 0, tambalan sementara tidak tersedia.

## 4. Rumus
Lebar zona dan Bar Sakit mengikuti `00-aturan-umum.md` §4. Tidak ada rumus khusus.

## 5. Kasus khusus
- **Tambalan sementara tidak diganti dalam 14 hari game** **[usulan]**: pasien kembali dengan keluhan tambalan lepas. Ditangani sebagai konsultasi biasa.
- **Pasien hamil trimester 1**: tambalan sementara + resep parasetamol = penanganan yang benar. Tambalan permanen dijadwalkan di trimester 2.
- **Perforasi saat PSA belum terbuka** (tahap 1–2): tambalan sementara + resep. Tindakan asalnya tetap Gagal. Pasien boleh memilih cabut sekarang atau menunggu PSA.

## 6. Ketergantungan
GDD §6. `04-tambal-gic.md`, `05-tambal-komposit.md` (perforasi, pilihan bahan), `06-psa.md` (K1), `02-resep.md`, `03-pasien.md` (Bu Yati).

## 7. Tuning Knobs (usulan)
| Knob | Usulan | Rentang aman | Memengaruhi |
|---|---|---|---|
| Zona langkah 1 / 3 | 40% / 35% | 25–50% | Kemudahan |
| Batas waktu sebelum lepas | 14 hari game | 7–30 | Dorongan menyelesaikan rencana |
| Energi berdiri sendiri | 10 | 5–12 | — |

## 8. Kriteria lulus
- [ ] Ditagih sebagai Konsultasi kalau tanpa tindakan lain.
- [ ] Memilih ZOE lalu komposit di kunjungan berikutnya → hasil komposit maksimal Cukup.
- [ ] Tidak ada hasil Gagal dari langkah ini sendiri.

## Sumber
- Efek eugenol pada bonding komposit (PubMed 10102752): https://pubmed.ncbi.nlm.nih.gov/10102752/
- *Where There Is No Dentist*, bab 10 (tambalan sementara darurat): https://rachel.core2learn.org/modules/en-asst_medical/WhereThereIsNoDentist/Chapter10.pdf
