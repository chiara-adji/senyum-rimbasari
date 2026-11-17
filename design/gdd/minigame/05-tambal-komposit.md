# 05 — Tambal Komposit

> Status: **ACC 2026-11-11** (angka bertanda [usulan] dipakai sebagai nilai awal, disetel saat playtest) · **Sudah ada di GDD** §6 (Tambal; T2 = high-speed + komposit + LED). Urutan langkah sama persis dengan GDD.
> **Revisi harga user 2026-11-17:** harga wajar akhir Tambal Komposit (gigi belakang) **500rb**, **Komposit Veneer** (estetik gigi depan: karies depan, fraktur, kekuningan) **800rb**, sudah termasuk pengali T2; Kemarau ×1,1. Veneer memakai langkah yang sama dengan pilihan warna selalu ada (GDD §6 "Alat T2 di game"). Aturan umum: `00-aturan-umum.md`.

## 1. Ringkasan
Tambalan sewarna gigi. Langkahnya lebih banyak daripada GIC dan lebih sensitif pada kebersihan kerja: ludah sedikit saja bisa membuat tambalan bocor. Terbuka setelah pemain punya alat T2 (high-speed + LED).

## 2. Rasa yang dituju
Pekerjaan presisi yang hasilnya terlihat. Untuk gigi depan, pemain bisa melihat pasien tersenyum di cermin.

## 3. Aturan
| Langkah | Input | Zona dasar **[usulan]** | S_dasar sakit **[usulan]** | Kesalahan |
|---|---|---|---|---|
| 1. Bius | PILIH → TAHAN | 30% | Suntik 6, terlalu cepat +10 | Sama seperti GIC |
| 2. Bor (high-speed) | GOSOK | 28% | 5/dtk, +15 di tepi pulpa | **Zona pulpa → perforasi (berat)**. Sisa karies → kecil. |
| 3. Isolasi → etsa → bilas → keringkan → bonding → sinar | URUT, lalu TAHAN untuk keringkan (lepas di zona "lembap"), lalu TEPAT untuk sinar bonding | 35% / 30% | — | Tanpa isolasi → bonding tercemar ludah, tambalan bocor & ngilu (kecil, pemicu klaim). Terlalu kering → ngilu (kecil). Urutan salah → tambalan lepas di kontrol (kecil). |
| 4. Isi berlapis | Tahan untuk mengisi, lepas di garis 2 mm, lalu TEPAT untuk sinar LED. Diulang 2–3 lapis (jumlahnya mengikuti kedalaman kavitas). | 30% (garis 2 mm), 30% (sinar) | — | Lapisan > 2 mm → bagian dasar tidak mengeras → ngilu (kecil). Sinar meleset → lapisan lunak (kecil). |
| 5. Bentuk + cek gigitan | GOSOK halus untuk merapikan, lalu klik titik biru tinggi | 35% | — | Mengikis terlalu dalam → tambalan tipis (kecil). Titik terlewat → mengganjal (kecil). |

- **Gigi depan**: setelah langkah 1 ada tambahan PILIH warna (3 pilihan, A1/A2/A3 sebagai "terang/sedang/agak kuning"). Warna yang cocok → trust +1 **[usulan]**. Salah warna tidak dihitung kesalahan, tapi pasien berkomentar.
- **Eugenol**: kalau sebelumnya gigi ini diberi tambalan sementara ZOE (`03`), hasil maksimal Cukup.
- **Pelapik**: pada pulpitis reversibel, pelapik masuk urutan langkah 3 sebelum etsa (sama seperti GIC).
- **Efek tier**:
  - T2 (minimum): high-speed + LED.
  - T3 (loupe): garis zona pulpa dan garis 2 mm lebih jelas, ditambah pengali zona umum.
- **Staf & herba**: aturan umum.
- **Energi**: 15 **[usulan]**. **Durasi**: ±35 detik nyata.

## 4. Rumus
Mengikuti `00-aturan-umum.md` §4.
```
jumlah_lapis = 2 (kavitas sedang) · 3 (kavitas dalam)
```

## 5. Kasus khusus
- **Perforasi saat PSA belum terbuka**: sama seperti GIC (`04`, Kasus khusus).
- **Kasus Andre** (gigi depan): tambal komposit anterior + kontrol vitalitas. Kalau pulpa terbuka di kontrol berikutnya, lanjut PSA (`03-pasien.md`).
- **Kasus Mbak Dina** (minta whitening): ditolak di Konsultasi. Scaling + komposit anterior adalah rencana yang benar.
- **Pasien hamil trimester 1**: tunda. Pakai tambalan sementara (`03`).
- **Stok LED rusak/belum dibeli**: komposit tidak tersedia. Hanya GIC.

## 6. Ketergantungan
GDD §4.1, §5, §6, §7. `03-tambalan-sementara.md` (eugenol), `04-tambal-gic.md` (urutan & perforasi), `06-psa.md`, `01-konsultasi.md`, `03-pasien.md` (Andre, Pak Gunawan, Mbak Dina).

## 7. Tuning Knobs (usulan)
| Knob | Usulan | Rentang aman | Memengaruhi |
|---|---|---|---|
| Zona bor high-speed | 28% | 20–35% | Bor cepat tapi tetap berisiko |
| Garis lapis | 2 mm | — (angka klinis) | Realisme |
| Jumlah lapis | 2–3 | 1–4 | Durasi |
| Trust warna cocok | +1 | 0–2 | Nilai detail estetik |
| Energi | 15 | 12–18 | — |

## 8. Kriteria lulus
- [x] Tidak bisa dipilih tanpa alat T2 (high-speed + LED). (Fase 3b-2)
- [ ] Melewatkan isolasi → hasil Cukup (sudah), kontrol berikutnya ada keluhan ngilu (belum).
- [x] Lapisan dilepas di atas garis 2 mm → dihitung kesalahan kecil.
- [x] Gigi depan menampilkan pilihan warna. Gigi belakang tidak.

## Sumber
- Dental Economics, prosedur penempatan & finishing komposit: https://dentaleconomics.com/science-tech/restorative-dentistry/article/55331641/best-procedures-for-placing-and-finishing-dental-composites
- Operative Dentistry 31(4), penempatan inkremental: https://operative-dentistry.kglmeridian.com/view/journals/odnt/31/4/article-p512.xml
- Efek eugenol pada bonding (PubMed 10102752): https://pubmed.ncbi.nlm.nih.gov/10102752/
