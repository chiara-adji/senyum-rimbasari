# Senyum Rimbasari — Game Design Document (v1, disetujui)

> Life-sim + manajemen klinik gigi, pixel art 2D top-down, 1 file `index.html` (HTML5 Canvas + JS, tanpa aset eksternal).
> Bahasa dalam game: Indonesia. Platform: desktop (keyboard + mouse).

## 1. Premis & Pilar
Dokter gigi (nama & gender dipilih pemain) burnout di kota besar **Metrapura**, pindah ke kota kecil fiktif **Rimbasari**, mewarisi ruko tua dan membangun klinik dari nol.

Pilar:
1. **Terasa seperti dokter.** Pemeriksaan → diagnosis → tindakan bertahap, bukan sekadar menu.
2. **Kepercayaan dibangun pelan.** Trust per warga, reputasi klinik.
3. **Santai tanpa game over.** Main selambat apa pun, kegagalan hanya menunda.
4. **Pulih dari burnout.** Sistem Stres, nongkrong, dan relasi.

Tanpa ortodonti/behel/whitening. Tanpa mancing.

## 2. Waktu & Kalender
- 1 detik nyata = 2 menit game (1 jam game = 30 dtk, hari 06:00–24:00 ≈ 9 menit di 1x).
- Speed: 0.5x / 1x / 2x / 4x + Pause (P). Waktu berhenti saat dialog, menu, dan tindakan.
- Blok waktu: Pagi 06–11 · Siang 11–15 · Sore 15–18 · Malam 18–24. Lewat 24:00 = pingsan (uang −10%, energi besok 50%).
- Minggu 7 hari (Senin–Minggu). Klinik libur Minggu (bisa diatur). Sabtu malam = Karaoke Malam Minggu.
- **2 musim: Kemarau (60 hari) + Hujan (60 hari) = 1 tahun 120 hari.** Kalender berulang (Tahun 1, 2, ...).
- Klinik buka default 08:00–16:00 (bisa diatur).

| Musim | Palet | Cuaca | Efek |
|---|---|---|---|
| Kemarau | Hijau-kuning hangat, tanah oranye | Cerah, debu | Panen kopi: tarif wajar ×1.1, banyak karies (es & manis), tanaman herba harus disiram |
| Hujan | Hijau pekat, langit kelabu | Hujan, genangan | Pasien sedikit lebih jarang, banyak sakit gigi akut, herba tersiram otomatis |

## 3. Stat Pemain
- **Energi** 100: tindakan 10–20, ngobrol 2, berjalan 0. Tidur memulihkan sesuai tahap rumah.
- **Stres** 0–100: +5 per pasien, +10 tindakan gagal, + lembur. >50: zona minigame −10%. >80 **Burnout**: energi maks −30 + kilas balik. Turun lewat nongkrong, tidur (−10), hari libur, herba Serai Jahe.
- **Uang** (Rupiah). Modal awal Rp 15jt. Uang tidak bisa minus. Kalau habis, warung memberi utang kecil.

### 3.1 Masak & Makan (Fase 2h, ACC 2026-11-13)
Belanja bahan di **Warung Bu Ratna** (buka 06–21), simpan di Tas/Kulkas, masak di dapur rumah/kos untuk energi. Angka di `CFG.FOOD`.
- **Bahan (harga per satuan):** Telur 3rb · Buah 8rb · Sayur 5rb · Susu 8rb · Ikan 18rb · Daging 30rb · Ayam 20rb · Minyak 15rb/botol · Roti 6rb · Mayo 12rb/botol. Minyak & Mayo: 1 botol = 5 takaran, makan 1 isi tas per botol.
- **Warung = satu panel:** 10 bahan + bibit herba warung (Lidah Buaya, Mint, Sirih; hanya musimnya, lihat §7) dalam satu kisi. ◀▶ pilih, ↑↓ jumlah (maks 10), E beli. Bahan masuk Tas, bibit ke kantong bibit.
- **Tas** (tombol **I**, juga menu Esc): isi maks 12. Bekal maks 3. **Kulkas** (rumah 2–4, kos bersama): isi maks 40, Simpan/Ambil 1 atau Semua.
- **Resep** (bahan diambil dari tas + kulkas, kulkas dulu):

| Masakan | Bahan | Waktu | Energi |
|---|---|---|---|
| Salad Sayur | sayur + mayo | 10 mnt | +10 |
| Salad Buah | buah + mayo | 10 mnt | +12 |
| Telur Ceplok | telur + minyak | 10 mnt | +12 |
| Ayam Goreng | ayam + minyak | 30 mnt | +25 |
| Ikan Goreng | ikan + minyak | 25 mnt | +22 |
| Burger | roti + daging + minyak | 20 mnt | +30 |

- **Dapur:** Masak & Makan (langsung) atau Jadi Bekal (dimakan dari Tas di mana saja, kecuali saat menangani pasien). Tombol Seduh Serai muncul kalau punya serai (§7).
- **Batas harian:** makan 3×/hari (masak & makan + bekal), susu 2×/hari (+5 energi, diminum dari Tas). Energi tidak melebihi maks. Reset saat hari baru.
- **Dapur yang boleh dipakai:** tempat tinggal saat ini. Dapur & kulkas Kos Melati hanya selama masih ngekos.

## 4. Klinik
| Tahap | Nama | Syarat | Isi |
|---|---|---|---|
| 0 | Ruko Tua | awal | Quest bersih-bersih |
| 1 | Praktik drg. [Nama] | Rp 10jt | 1 kursi, solo, antrian 3, alat Tier 1 |
| 2 | Klinik Gigi [Nama] | Rp 60jt + ★2 | Ruang Tunggu (antrian 5), Ruang Rontgen (periapikal), rekrut Resepsionis & Perawat |
| 3 | Klinik Gigi Lengkap | Rp 180jt + ★3 + ≥1 alat Tier 2 | Ruang Periksa 2 + Dokter Rekan, Ruang Sterilisasi + Petugas Kebersihan, PSA terbuka |
| 4 | Pusat Kesehatan Gigi Rimbasari | Rp 450jt + ★5 + Rontgen Panoramik | Ruang Endodonti & Bedah Minor. **Syarat credit roll** |

**Level visual klinik (ACC 2026-11-11):** tahap 0 = Ruko Tua (kotor, papan DIJUAL) · tahap 1 = **Lv 1** (eksterior seadanya, plang nama kecil, interior sederhana) · tahap 2 = **Lv 2** (lampu dinding, kanopi, interior mulai estetik) · tahap 3 = **Lv 3** (neon sign, alat upgrade, 2 kursi, sterilisasi) · tahap 4 = **Lv 4** (bangunan 2 lantai, neon besar, set bedah, interior paling estetik; lantai 1 lobi + Periksa 1–2, lantai 2 Endo & Bedah + Sterilisasi + ruang staf).

Manajemen:
- **Stok bahan**: satu angka, paket Rp 750rb (10 unit) di **Bahari Medika, Tanjung Arum**, atau dipesan lewat Kantor Pos Rimbasari (lihat §11.1; ACC 2026-11-13, dulu di Warung Bu Ratna). Stok 0 = hanya konsultasi.
- **Kebersihan** 0–100: turun per pasien. <40 → reputasi turun.
- **Reputasi** ★1–5: dari hasil tindakan, pasien pergi, harga, dan event. Menentukan jumlah pasien tamu.
  - **[rev 2026-11-15, opsi C, ACC user]** Poin reputasi 0–600, mulai 0 (★1). Ambang ★2/★3/★4/★5 = **50 / 160 / 330 / 560**. Tindakan selesai +1, diagnosis tepat +1 lagi. Hukuman tetap: pasien pulang −3, kembali mengeluh −3, gagal −3, klinik kotor −2/hari, antrian penuh −1. Simpanan lama (skala 0–100) dikonversi otomatis dengan jumlah ★ yang sama.
  - Rata-rata pasien tamu per hari kerja di ★1–★5: **2 / 3 / 4 / 5 / 6** (dulu 5/7/9/11/13) × musim × tarif. Tujuannya pasien sedikit, sehingga ada waktu menjelajah dan ngobrol dengan warga.
  - Perkiraan untuk pemain cakap: ★2 di hari praktik ke-18, ★3 ke-41, ★4 ke-69, ★5 ke-98. Di hari praktik 1/7/30: ★1·2, ★1·2, ★2·3 pasien. Dulu ★5 sudah tercapai di hari ke-5.
- **Pajak**: 10% pendapatan kotor setiap 30 hari, dibayar otomatis di Balai Kota (5% kalau menikah dengan Adji). **[rev]** Dipotong pagi hari ke-31, 61, 91, dst. Dasar pajak = semua bayaran pasien (tindakan, konsultasi, rontgen). Uang kurang = tunggakan, dilunasi otomatis pagi berikutnya saat uang cukup (tanpa denda).
- **Listrik & air [rev, ACC 2026-11-15]**: dipotong otomatis tiap Senin pagi: tahap 1 Rp 300rb · tahap 2 Rp 750rb · tahap 3 Rp 1,5jt · tahap 4 Rp 3jt per minggu. Uang kurang = tunggakan, dilunasi otomatis pagi berikutnya atau di meja praktik. Tunggakan lebih dari 7 hari → listrik diputus, klinik tidak bisa buka sampai lunas.
- **Alat rusak [rev, ACC 2026-11-15]**: peluang 5% per hari praktik (sekitar sebulan sekali), tidak terjadi di 7 hari pertama setelah praktik buka, maksimal satu alat rusak sekaligus. Rusak tiba-tiba saat klinik buka, di jam acak antara 08:00 dan 15:00. Perbaikan lewat meja praktik: Teknisi (beres besok pagi) atau Servis kilat (2× biaya, beres 2 jam).

  | Alat | Akibat | Biaya teknisi |
  |---|---|---|
  | Kompresor | Tambal GIC, scaling, devitalisasi, mumifikasi, akses terkunci | Rp 1,2jt |
  | Suction | Cabut & cabut gigi susu terkunci | Rp 600rb |
  | Lampu unit | Tiap tindakan +10 menit | Rp 400rb |
  | Autoklaf | Hanya konsultasi, resep, rujuk | Rp 900rb |
  | Mesin rontgen (tahap ≥2) | Rontgen terkunci | Rp 2,5jt |

  Ringkasan biaya, tunggakan, tanggal pajak berikutnya, dan alat rusak tampil di menu Manajemen.

### 4.1 Sistem Tarif (diatur pemain)
- Setiap tindakan punya **Harga Wajar** = basis × pengali tier alat (T1 ×1.0 · T2 ×1.6 · T3 ×2.5) × pengali musim.
- Pemain mengatur **tarif sendiri** per tindakan (menu Manajemen → Tarif, langkah Rp 50rb).
- Rasio `r = tarif / harga wajar`. Karena harga wajar naik bersama tier alat, "mahal" di T1 berbeda dengan "mahal" di T2/T3.

| r | Label | Jumlah pasien | Efek lain |
|---|---|---|---|
| < 0.7 | Murah sekali | ×1.8 | Stres per pasien +50%, bisa rugi (bahan = 30% harga wajar) |
| 0.7–0.9 | Murah | ×1.3 | Stres per pasien +20%, trust +1 ekstra |
| 0.9–1.1 | Wajar | ×1.0 | — |
| 1.1–1.4 | Mahal | ×0.7 | Peluang pasien menolak rencana perawatan naik |
| > 1.4 | Kemahalan | ×0.35 | Banyak penolakan, gosip negatif (trust −1 ke jaringan Bu Ratna) |

- Setiap ★ di atas 3 menggeser batas toleransi +0.05.
- Kesulitan kasus menambah biaya otomatis ×1.0 / ×1.3 / ×1.7.

Basis harga wajar (T1): Konsultasi 150rb · Rontgen periapikal 200rb · Rontgen panoramik 450rb · Resep 100rb · Scaling 600rb · Tambal GIC 400rb · Tambal komposit 650rb · Cabut gigi susu 250rb · Cabut gigi tetap 600rb · Cabut sisa akar/bedah minor 1,5jt · PSA (mulai T2) 2,5jt anterior / 3,5jt premolar / 5jt molar.

## 5. Staf
| Peran | Terbuka | Efek | Gaji/hari |
|---|---|---|---|
| Resepsionis | Tahap 2 | Antrian +2, kesabaran +30%, tagihan otomatis | ±120rb |
| Perawat Gigi | Tahap 2 | Zona sukses +15%, sakit −20% | ±160rb |
| Petugas Kebersihan | Tahap 3 | Kebersihan terjaga | ±100rb |
| Dokter Gigi Rekan | Tahap 3 | Otomatis menangani konsultasi, scaling, dan tambal di kursi 2 | Bagi hasil 40–50% |

- Kandidat: Resepsionis (Putri, Yoga) · Perawat (Rina, Fajar, Dewi) · Kebersihan (Pak Udin, Bu Siti) · Dokter Rekan (drg. Hana, drg. Bima).
- Upgrade lewat menu **Pelatihan**: **Skill Lv1–5** dan **Energi Lv1–3** (Rp 1,5–6jt per level, staf libur 1 hari).
- Energi staf berkurang per pasien. Kalau habis, kerjanya melambat. Kalau gaji tidak terbayar, staf libur hari itu.

## 6. Alur Pasien & Tindakan Gigi
Alur: Datang → Rekam Medis → ① Anamnesis → ② Pemeriksaan → ③ Rontgen → ④ Diagnosis → ⑤ Rencana & Persetujuan → ⑥ Tindakan → ⑦ Resep & Instruksi → Jadwal kontrol.

**① Anamnesis** (pilih 3 dari 7 pertanyaan, 5 menit game per pertanyaan): keluhan utama, sejak kapan, kapan sakit, bengkak, gusi berdarah, **riwayat penyakit** (hipertensi, diabetes, jantung, hamil), **obat & alergi** (pengencer darah). Melewatkan riwayat medis → risiko komplikasi.

**② Pemeriksaan** (klik alat → klik gigi pada odontogram): kaca + sonde, tes dingin (chlorethyl), perkusi, palpasi, probe periodontal, tes goyang, tensimeter.

**③ Rontgen** (tahap 2+): memperlihatkan karies proksimal, kedalaman ke pulpa, lesi periapikal, sisa akar. Kontraindikasi: hamil trimester 1.

**④ Diagnosis → tindakan**:
| Diagnosis | Tanda | Tindakan |
|---|---|---|
| Gingivitis / kalkulus | Karang, gusi berdarah, poket ≤3 mm | Scaling |
| Periodontitis ringan–sedang | Poket 4–5 mm, goyang derajat 1 | Scaling + kontrol |
| Karies dentin | Sonde nyangkut, ngilu cepat hilang | Tambal |
| Pulpitis reversibel | Ngilu <10 dtk, karies dalam | Tambal + pelapik |
| Pulpitis ireversibel | Sakit spontan/malam, ngilu menetap | PSA (atau cabut) |
| Nekrosis pulpa | Tidak respons dingin, warna gigi berubah | PSA |
| Abses periapikal | Bengkak, perkusi sakit, radiolusen | Resep dulu → PSA/cabut |
| Sisa akar / tidak bisa dipertahankan | Mahkota hancur | Cabut |
| Periodontitis berat | Goyang derajat 3 | Cabut |
| Gigi susu persistensi | Gigi susu goyang, gigi tetap sudah tumbuh | Cabut gigi susu (topikal) |

Diagnosis benar → bonus. Salah → pasien kembali mengeluh (pemicu konflik klaim).

**⑤ Persetujuan**: pasien menerima atau menolak berdasarkan trust, kemampuan bayar, dan rasio tarif. Bisa ditawarkan alternatif.

**⑥ Tindakan** (3–5 langkah × 3–6 dtk, ada **Bar Sakit**):
- **Scaling**: drag karang → karang di bawah gusi (kasus T2–3) → polishing → edukasi (pilihan dialog).
- **Tambal**: bius (opsional) → bor area karies, hindari zona pulpa merah (kalau kena → perforasi → PSA) → isolasi/etsa/bonding (urutan) → isi + timing light-cure → cek gigitan.
- **Cabut**: antiseptik → pilih teknik bius (topikal/infiltrasi/blok) → suntik pelan → luksasi elevator → goyang berirama (terlalu kuat = akar patah) → tampon + instruksi.
- **PSA** (2 kunjungan, tahap 3+). K1: bius, akses, ekstirpasi, ukur panjang kerja (rontgen / apex locator), irigasi, dressing, tambal sementara. K2 (3–7 hari): file berurutan sampai panjang kerja, irigasi, obturasi (timing), tambal permanen. Jumlah saluran: anterior 1 / premolar 2 / molar 3–4.

**Detail minigame per tindakan** (ACC 2026-11-11, visual di `design/v3/minigame.html`): `design/gdd/minigame/`. Isinya aturan umum (`00`), konsultasi, resep, tambalan sementara, tambal GIC, tambal komposit, PSA, scaling, cabut gigi susu, cabut gigi tetap & penyulit, dan bedah minor (`01`–`10`). Angka baru di folder itu masih berstatus usulan Tuning Knobs.

**Tier alat** (tier lebih tinggi = minigame lebih mudah + harga wajar lebih tinggi):
| | T1 (Bahari Medika / pesan via Kantor Pos) | T2 (Bahari Medika, rak terbuka ≥8 challenge) | T3 (Metrapura) |
|---|---|---|---|
| Periksa | Kaca, sonde, chlorethyl, probe, tensimeter | Rontgen periapikal (dari upgrade tahap 2) | Rontgen panoramik (120jt) |
| Scaling | Manual | Ultrasonik | Air polishing |
| Tambal | Bor low-speed + GIC | High-speed + komposit + LED | Loupe |
| Cabut | Tang, elevator, infiltrasi | Periotome + bius blok | Set bedah minor |
| PSA | — | File tangan | Rotary + apex locator |

Harga alat: T1 2–5jt · T2 8–15jt · T3 20–40jt. Kesulitan kasus naik bersama tahap klinik.

**Rekam Medis**: odontogram, diagnosis, tindakan, dan jadwal kontrol per pasien.

**Penginapan pasien** (ACC 2026-11-11, fitur di luar MVP, detail di [06-jadwal.md](../narrative/npc/06-jadwal.md)):
- **Losmen Singgah** (Jalan Niaga, samping Terminal, dikelola Bu Sri 07–19): pasien spesial dari desa luar peta menginap di sini malam sebelum kunjungan lanjutan. Pasien yang menginap selalu jadi **antrian pertama jam 08:00** pada hari kunjungannya. Tidak ada sistem telat.
- **Jenguk** 18–22: pemain bisa mengunjungi pasien di Losmen. Dihitung ngobrol (trust +3/hari, §9). Kamar 2 dan 5 hanya bisa dimasuki kalau trust pasien ≥40 (§11).
- **Rawat inap Puskesmas**: pasien setelah **bedah minor** atau **abses** menginap semalam di Puskesmas (kerja sama, dirawat Wulan atau dr. Galih). Bisa dijenguk 18–22 dengan aturan trust yang sama, plus dialog khusus Galih/Wulan. Tidak ada angka baru.

## 7. Kebun Herba (rumah)
Petak 4 pot (Kos Melati, ambang jendela kamar 5) → 8 (Kontrakan) → 12 (Rumah Subsidi) → 16 (Rumah Estetik). Bibit dasar dari Warung, bibit lanjutan dari Pondok Jamu (trust Mbah Darmi ≥40). Kemarau wajib disiram, Hujan otomatis. Dipakai dari baki sebelum tindakan.

| Herba | Hari | Efek |
|---|---|---|
| Daun Mint | 3 | Kepuasan +, bayaran +10% |
| Sirih | 4 | Trust +3 setelah scaling/cabut |
| Lidah Buaya | 5 | Sakit pasien anak −30% |
| Kunyit* | 6 | Darurat: zona +15% |
| Cengkeh* | 8 | Sakit semua pasien −30% |
| Serai Jahe* | 5 | Untuk diri sendiri: Stres −15 |

**Aturan kebun (Fase 2g, ACC user 2026-11-13):**
- **Musim tanam sesuai realita**: Kemarau = Lidah Buaya, Serai Jahe · Hujan = Mint, Sirih, Kunyit, Cengkeh. Bibit musim lain tidak bisa ditanam atau dibeli. Saat musim berganti, herba musim lama yang sudah siap otomatis dipanen, yang belum siap mati.
- **Siram**: Kemarau, tombol "Siram semua" sekali sehari (energi −2, 10 menit). Hujan tersiram otomatis. 3 hari berturut-turut tidak disiram → tanaman mati (layu sejak hari pertama tidak disiram). Mati → "Cabut yang mati".
- **Panen** 2 herba per pot, maks 20 per jenis di tas; bibit maks 20 per jenis, beli maks 10 sekali.
- **Toko**: Warung = Lidah Buaya, Mint, Sirih (lewat panel warung). Pondok Jamu = Serai Jahe, Kunyit, Cengkeh, **langsung buka**; harga ×1,5 selama trust Mbah Darmi <40.
- Bibit awal: 2 Lidah Buaya titipan Pak Udin.
- **Lokasi**: Kos = 4 pot di ambang jendela kamar 5 · Kontrakan = rak pot 2 tingkat + gembor · Rumah Subsidi/Estetik = bedeng 4×3 / 4×4 di halaman seberang jalan depan rumah (x58, y228). E di depannya = panel Kebun.
- **Baki minigame**: maks 1 herba per tindakan, dipilih sebelum langkah 1 selesai, terpakai setelah langkah 1. Lidah Buaya hanya pasien anak; Kunyit hanya kasus darurat (abses, pulpitis ireversibel, pasca cabut, perforasi, akar patah); Sirih hanya scaling/cabut/cabut gigi susu. Sirih: pasien warga Trust +3 (Fase 3a-2); pasien biasa tidak punya Trust, jadi tetap reputasi +1. Latihan Minigame: semua herba tersedia, tidak berkurang.
- Serai Jahe diseduh di dapur rumah ("Seduh Serai"), maks 1× sehari, 10 menit.
- Angka di `CFG.GARDEN` (tag `[2g]`). Aset `design/v3/src/kebun.js`, draf `design/v3/kebun.html`.

## 8. Rumah
| Tahap | Biaya | Efek |
|---|---|---|
| Lv 1 Kos Melati (kamar 5) | Rp 50rb / hari | Energi pulih 100%, 4 pot herba |
| Lv 2 Kontrakan | Rp 2jt / 30 hari (dibayar di muka; syarat klinik tahap ≥1) | Energi pulih 110% dari maks (kelebihan berlaku hari itu saja), kebun 8 petak |
| Lv 3 Rumah Subsidi | 50jt | Energi maks +20%, kebun 12 petak, undang makan malam, **syarat lamaran** |
| Lv 4 Rumah Estetik | 150jt | Energi maks +30%, kebun 16 petak, stres −10 setiap bangun tidur |

Interior membesar tiap level: Kos Melati kamar 5 240×168 (interior Kamar Sewa lama) · Kontrakan 288×184 · Rumah Subsidi 352×208 (kasur queen) · Rumah Estetik 416×232 (kasur king) — kasur double disiapkan untuk pasangan setelah menikah.

*Harga dari draf v3, efek dari pemilik proyek (disetujui 2026-11-11). Bonus energi maks tidak bertumpuk antar level; yang berlaku hanya level rumah saat ini.*

**Kos Melati & Kontrakan (ACC user 2026-11-13, menggantikan Kamar Sewa gratis):**
- **Lv 1 = ngekos di Kos Melati, kamar 5** (pintu teal bergambar hati di ruang bersama; interior = Kamar Sewa lama). Permainan baru dimulai di sini. Surat Pak Harjo menyebut kamar ini sudah dipesankan ke Pak Udin.
- **Sewa kos Rp 50rb/hari** dipotong otomatis setiap pagi (setelah tidur maupun pingsan) dan dicatat di kartu pagi. Uang kurang → sisa jadi **utang ke Pak Udin**, dipotong otomatis pagi berikutnya. Pemain tidak pernah diusir dari kos.
- **Rumah ujung kiri Kampung Asri** sejak awal berbentuk rumah Lv 2 dengan papan **"DIKONTRAK · 2 JT SEBULAN"**. Pintunya terkunci; E membuka panel kontrak (kunci dititipkan pemilik ke Pak Harjo).
- **Kontrakan Rp 2jt / 30 hari game** (1 musim = 2 bulan). Syarat: klinik tahap ≥1 (ruko sudah direnovasi). Dibayar di muka saat kontrak, utang kos ikut dilunasi. Diperpanjang otomatis setiap pagi jatuh tempo; peringatan di kartu pagi 3 hari sebelumnya. Saldo kurang saat jatuh tempo → kembali ke Kos Melati kamar 5. Surat kontrak di meja kerja Kontrakan: lihat jatuh tempo, **Hentikan/Lanjutkan Kontrak** (berhenti berlaku saat masa sewa habis, tanpa pengembalian uang).
- Efek Kos Melati sama dengan Kamar Sewa lama (pulih 100%, stres −10 standar). Lv 3 (50jt) dan Lv 4 (150jt) tetap, dibangun di lahan yang sama (implementasi di Fase 2f Rumah).
- Simpanan lama (Kamar Sewa) otomatis pindah ke Kos Melati kamar 5, dengan pemberitahuan saat Lanjutkan.

**Rumah Subsidi & Rumah Estetik (Fase 2g, ACC user 2026-11-13):**
- **Lv 3 Rp 50jt** dibangun tukang Pak Harjo di lahan rumah ujung kiri; syarat klinik tahap ≥1. Bisa langsung dari kos (panel pintu rumah ujung kiri: Kontrak / Bangun rumah) atau dari kontrakan (surat kontrak di meja kerja: Bangun rumah). Rumah jadi **besok pagi**.
- Membangun saat masih mengontrak: **sisa sewa hangus**, dengan peringatan jumlah hari dan rupiah sebelum konfirmasi. Utang kos ikut dilunasi.
- **Lv 4 renovasi +Rp 150jt** dari meja kerja Rumah Subsidi, selesai besok pagi. Rumah sendiri tanpa sewa, tidak bisa turun level.
- **Syarat lamaran = Rumah Lv ≥3** (Fase 3a-5, `CFG.NIKAH.LAMAR_HOME`). Setelah menikah, pasangan tinggal di rumah ini (pagi 06:00–07:30, malam mulai 21:00) dan kasur dipakai berdua. Menikah dengan Arya: upgrade rumah −50% dan selesai jam 18:00 hari itu juga (§9).
- Angka di `CFG.KOS` dan `CFG.KONTRAK` (tag `[kos]`). Aset: `wDoor5` (rooms.js), `EXT.rumahK` + `papanKontrak` (build.js); draf `design/v3/kos-kontrak.html`.

## 9. Trust Warga & Hubungan Romance
- **Trust** 0–100 per NPC: Asing 0 · Kenal 20 · Akrab 40 · Percaya 60 · Sahabat 80. Ngobrol +3/hari, tindakan Sempurna/Baik +8/+5, Gagal −6, event +5, permintaan +10. Tidak berkurang seiring waktu. Trust ≥20 → mau jadi pasien.
- **Di game (Fase 3a-2, ACC user 2026-11-15):**
  - Trust dari tiap sumber (ngobrol, rawat, Sirih, adegan) masuk **sekali per hari**.
  - **Adegan Trust** ([08-adegan-trust.md](../narrative/npc/08-adegan-trust.md)): tiap tingkat Kenal/Akrab/Percaya/Sahabat punya satu adegan sekali tonton. Penanda **!** di atas kepala NPC kalau adegan siap; ngobrol memutarnya. Tingkat terendah dulu, maks satu per NPC per hari. Adegan bertanda *Adegan Trust* di kartu memberi **+5** dan bisa bersyarat tempat/waktu (mis. Bu Endang jam 21 di rumah). Tingkat lain = sapaan singkat tanpa bonus. Imbalan yang mekaniknya di 3b (papan catur, seragam, #32, Syukuran) masih dialog.
  - **Sikap** yang aktif tiap ngobrol: Bu Ratna (Kenal) membagi gosip siapa yang sakit gigi / di mana seseorang hari ini; Pak Slamet (Akrab, Stres >60) menolak kopi ketiga.
  - **Pasien warga**: tiap hari kerja peluang **25%** satu warga (sudah kenal, Trust ≥20; Mbah Darmi ≥80, Dimas ≥40; bukan staf) datang ke klinik dengan sprite aslinya, jam 09–14. Kasus dari "Kondisi gigi" kartu NPC (Pak Slamet membawa riwayat jantung). Persetujuan **+5% per tingkat** (Kenal +5% … Sahabat +20%). Hasil: Sempurna +8, Sukses +5, Gagal −6. Pasien spesial & arc teman → 3b.
  - Harga bibit Pondok Jamu ×1,5 sampai Trust Mbah Darmi 40, harga teman Koh Hendra 5%/10% di Trust 40/60 kini memakai Trust asli.
  - Warga yang sedang jadi pasien berjalan ke klinik dan tidak tampil di jadwal biasanya sampai pulang dari klinik.
  - Kotak hasil tindakan pasien warga menampilkan baris Trust (mis. "Trust Pak Harjo +8 · Sirih: Trust +3."), sama dengan toast dan catatan rekam medis (ACC user 2026-11-15).
  - Angka di `CFG.NPC` (tag `[3a]`, `src/trust3a.js`).
- **Hubungan** (0–100, terpisah, hanya kandidat romance): ngobrol +2, hadiah, kencan, event. 5 event pribadi di 20/35/50/70/85, respons ±(+15/+5/−10). Tidak datang kencan −10. 3 respons buruk berturut-turut → status **Renggang** 7 hari.
- Event 5 = Pacaran. **Lamaran** = Hubungan 95 + Rumah Subsidi (Lv 3) atau lebih + cincin (Tanjung Arum, 12jt) → menikah seminggu kemudian. **Menikah tidak wajib**, tapi memberi bonus pasif.
- **E5 gagal** (ACC 2026-11-11): respons buruk di E5 tetap −10 dan belum jadi pacaran. E5 muncul lagi setelah Hubungan kembali ≥85. Berlaku untuk semua 8 kandidat. Lamaran tetap hanya bisa setelah pacaran. Adegan lamaran (kandidat menelepon keluarganya) dan pernikahan (keluarga datang) ada di buku NPC §10.
- **Di game (Fase 3a-4, ACC user 2026-11-15):**
  - **Hadiah**: G di dekat NPC yang ada di Buku Kenalan → panel Beri Hadiah (isi Tas: bahan, bekal, herba, barang hadiah). Sekali sehari per orang. Suka Trust +5 / Hubungan +6, biasa +2 / +2, tidak suka −3 / −4. Selera yang pernah dicoba terungkap di Buku Kenalan (baris Suka / Tdk suka, sisanya "?"). Reaksi tiap NPC: [10-hadiah.md](../narrative/npc/10-hadiah.md).
  - **Barang hadiah** (masuk Tas): Roti Manis 10rb (Toko Roti), Kopi Susu 25rb (Kedai), Kopi Tubruk / Wedang Jahe / Gorengan 5rb (Angkringan), Teh Melati 5rb & Es Teh 4rb (Warung), Bunga 10rb & Buku Bekas 15rb (Perpustakaan & Kebun Bunga), Kartu Pos 5rb / Biji Kopi 40rb / Kain 30rb (etalase Ci Lina, Bahari Medika, Tanjung Arum). Tombol **Beli Bungkus** di panel nongkrong; mengikuti jam buka penjualnya.
  - **Hubungan** hanya untuk kandidat lawan jenis. Ngobrol +2 sekali sehari. Hubungan tertahan di ambang event berikutnya yang belum ditonton (20/35/50/70/85), lalu 100 setelah E5. Bar ♥ dengan tanda ambang ada di Buku Kenalan dan panel hadiah.
  - **Event lewat ajakan** ([09-event-romance.md](../narrative/npc/09-event-romance.md)): ♥ di kepala saat ambang & syarat kartu terpenuhi (mis. Adji E4 Stres >60, E3 Musim Hujan, Galih E2 Selasa/Jumat). Ngobrol → ajakan ("Boleh, aku datang" / "Lain kali, ya"). Janji tampil sebagai chip di HUD. Kandidat berjalan ke tempat event dan menunggu 2 jam; E di sana → kartu judul, narasi, panel 3 pilihan (urutan acak), reaksi, toast. Waktu +30 menit. Satu janji aktif, satu event per kandidat per hari.
  - Tidak datang: E1–E4 tanpa hukuman (♥ muncul lagi), E5 −10. E5 berhasil = **Pacaran** (satu pacar; E5 kandidat lain terkunci, E1–E4 tetap jalan). E5 gagal = −10, muncul lagi di 85.
  - **Renggang**: 3 respons buruk berturut-turut → 7 hari tanpa ♥, Hubungan tidak naik, kalimat "renggang" 07b aktif. Kalimat 07b bersyarat H20/H50/H70, pacaran, renggang, nikah kini aktif.
  - Angka di `CFG.REL` (tag `[3a]`, `src/hubungan3a.js`). Kencan, lamaran, toko cincin, menikah → 3a-5 di bawah.
- **Di game (Fase 3a-5, ACC user 2026-11-16):** teks di [11-kencan-nikah.md](../narrative/npc/11-kencan-nikah.md), angka di `CFG.NIKAH` (tag `[3a]`, `src/nikah3a.js`).
  - **Kencan** (hanya dengan pacar): ngobrol → menu **Ngobrol / Ajak kencan / Ada yang mau aku omongin / Nggak jadi**. Pilih tempat → janji hari ini (kalau jamnya belum lewat) atau besok, chip di HUD, pacar berjalan ke sana dan menunggu 2 jam (pakai sistem janji 3a-4). Pacar juga mengajak sendiri (♥ di kepala) setelah **3 hari** tanpa kencan.
    | Tempat | Jam | Biaya berdua |
    |---|---|---|
    | Bukit Bintang | 19:00 | gratis |
    | Kedai Kopi Seduh | 16:00 | Rp 60rb |
    | Angkringan Alun-alun | 19:30 | Rp 20rb |
    | Kebun Bunga | 10:00 | gratis |
  - Adegan kencan: kartu judul, narasi khas kandidat per tempat, satu pertanyaan 2 pilihan (reaksi saja, tanpa angka). Hasil: **♥ +4, Stres −10, waktu +1 jam**, sekali sehari. Tidak datang **−10**.
  - **Lamaran**: syarat pacaran + ♥ ≥ **95** + Rumah **Lv ≥3** + **cincin** di Tas → penanda di kepala, "Ada yang mau aku omongin" → janji di tempat & jam khas kandidat (mis. Adji 13:00 di kantornya, Arya 20:00 Bukit Bintang, Nadia 21:00 di kedai). Adegan → selalu diterima → **telepon keluarga** → status **Tunangan**, cincin terpakai, nikah **7 hari kemudian 09:00 di Balai Kota**. Tidak datang ke janji lamaran −10.
  - **Hari H**: kartu pagi "Hari ini kamu menikah". Balai Kota berganti dekorasi pernikahan; maks **14 tamu** (yang disebut di kartu pernikahan dulu, lalu Trust tertinggi) dan **keluarga** pasangan (datang dari terminal / tepi peta) berjalan masuk mulai 08:00. Pemain & pasangan memakai baju pengantin (beskap + blangkon / kebaya putih, hijab tetap). Ngobrol dengan pasangan → upacara → momen → **Syukuran** → status **Menikah**, jam 14:00, Stres −30, panel **Bonus Menikah**. Tidak datang sampai 17:00 → diundur besok, ♥ −10. Klinik tidak bisa dibuka pada hari H.
  - **Setelah menikah**: pasangan pindah ke rumah pemain (pagi di rumah, berangkat kerja, pulang malam), kalimat "nikah" 07b aktif, kencan tetap bisa. Tidak ada cerai. Status di Buku Kenalan: "Tunangan · H-n" / "Menikah".
  - **Bonus pasif menikah** (menggantikan baris tabel §10 bila berbeda; usulan ACC 2026-11-16):
    | Pasangan | Bonus |
    |---|---|
    | Adji | Pajak 10% → 5% · Stres −10 tiap pagi · laporan keuangan mingguan tiap Senin pagi |
    | Arya | Upgrade rumah & klinik **−50%**, selesai jam 18:00 hari itu · perbaikan alat gratis · listrik & air −30% |
    | Raka | Trust warga ×1,25 dari semua sumber · Reputasi & Trust tidak turun saat Gagal/komplikasi · kasus Pak Joni lebih cepat (3b) |
    | Galih | Komplikasi pasien riwayat medis ×0,5 |
    | Sekar | Kesabaran pasien ×1,2 |
    | Nadia | Energi +20 tiap bangun (boleh lewat batas) |
    | Laras | Reputasi dari tindakan ×1,25 |
    | Wulan | Rasa sakit pasien anak ×0,75 · +1 pasien rujukan Puskesmas per hari (≥10:00) |

## 10. NPC
> **Buku NPC** (backstory, kepribadian, rahasia, hubungan, sikap per Trust, kaitan game; ACC 2026-11-11): [design/narrative/npc/00-daftar-isi.md](../narrative/npc/00-daftar-isi.md). Isinya kartu [warga](../narrative/npc/01-warga.md), [romance pria](../narrative/npc/02a-romance-pria.md) & [wanita](../narrative/npc/02b-romance-wanita.md) (E1–E5 lengkap, lamaran & pernikahan, arc teman), [pasien](../narrative/npc/03-pasien.md), [luar kota](../narrative/npc/04-luar-kota.md), [staf](../narrative/npc/05-staf.md), [jadwal mingguan & tempat tinggal](../narrative/npc/06-jadwal.md), dan dialog harian ([warga](../narrative/npc/07a-dialog-warga.md) · [romance](../narrative/npc/07b-dialog-romance.md) · [lainnya](../narrative/npc/07c-dialog-lainnya.md)). Kolom "Inti karakter" di bawah adalah ringkasannya.

> **Di game (Fase 3a-1, 2026-11-13):** NPC selalu terlihat berjalan dari pintu/gerbang ke tempatnya dan kembali (tidak muncul/hilang di tempat), termasuk staf klinik pukul 07:30/16:30. Mereka berangkat lebih awal supaya tiba saat jadwal mulai. Ngobrol = E di dekat NPC (atau lintas meja/etalase sambil menghadapnya): dialog berpotret dengan tingkat Trust, kalimat harian tidak diulang dalam 7 hari, Trust +3 sekali sehari. **Buku Kenalan** (tombol K atau menu Esc) mencatat orang yang sudah dikenal: tab Warga / Romance / Lainnya, Trust & tingkat, posisi sekarang, sudah ngobrol hari ini, selera hadiah (terungkap setelah memberi hadiah, 3a-4). Hujan memindahkan kegiatan luar ruang ke tempat beratap (06-jadwal).

> **Di game (Fase 3a-4, ACC user 2026-11-15):** G di dekat NPC = Beri Hadiah (sekali sehari, selera terungkap di Buku Kenalan). Kandidat lawan jenis punya bar ♥ Hubungan, penanda ♥ untuk ajakan event E1–E5, chip janji di HUD, dan berjalan ke tempat event lalu menunggu 2 jam. Teks: [09-event-romance.md](../narrative/npc/09-event-romance.md), [10-hadiah.md](../narrative/npc/10-hadiah.md). Aturan lengkap di §9.

> **Di game (Fase 3a-5, ACC user 2026-11-16):** kencan, lamaran, pernikahan, pasangan tinggal di rumah pemain, bonus pasif (tabel §9 menggantikan kolom "Bonus menikah" di bawah bila berbeda: Arya kini −50% + selesai hari itu, Raka kini Trust ×1,25 + perisai Gagal). Tokoh baru: **Mbak Yuni** (penjaga Toserba Tanjung Arum) dan keluarga tiap kandidat (CAST `kel_<id>_<i>`, grup Keluarga, hanya muncul di hari pernikahan). **Ci Lina** kini tampil di Toko Emas Tanjung Arum (Senin–Sabtu 09–16).

### Warga (12)
| Nama | Profesi | Lokasi | Inti karakter |
|---|---|---|---|
| Pak Harjo | Lurah, bijak | Balai Kota | Takut kota ditinggal anak mudanya. Diam-diam membayar pajak ruko supaya tidak dilelang. |
| Bu Ratna | Pemilik warung, suka gosip | Warung Bu Ratna | Pusat kabar kota yang hampir buta huruf. |
| Mbah Darmi | Peracik jamu, skeptis | Pondok Jamu | Suaminya meninggal karena abses gigi. Sinisnya adalah rasa bersalah lama. |
| Dimas | Anak SD 9 th, takut dokter | SD / Rumah Keluarga Endang | Trauma dicabut paksa Pak Joni. Ingin jadi insinyur robot. |
| Bu Endang | Ibu Dimas, penjahit | Rumah Keluarga Endang | Terlalu bangga untuk dikasihani. Gerahamnya retak karena stres. |
| Pak Bowo | Petani kopi, keras kepala | Kebun Kopi | Adik Pak Harjo. Menyimpan foto putrinya yang kabur ke Metrapura. |
| Bu Sinta | Guru SD | SD | Guru perantau yang menyimpan surat mutasi. Akhirnya memilih tinggal. |
| Pak Slamet | Pemilik angkringan | Angkringan Alun-alun | Mantan sopir bus yang berhenti karena jantung. Minum pengencer darah. |
| Kak Tari | Toko roti | Toko Roti Manis | Pulang untuk merawat ayahnya. Menjual manis, padahal giginya berlubang. |
| Mas Ilham | Kurir pos | Kantor Pos | Menyimpan surat Om Darto untuk pemain. Belum pernah melihat laut. |
| Kakek Wiryo | Pensiunan guru, catur | Alun-alun / Rumah Wiryo | Sahabat catur almarhum Om Darto. Ingatannya mulai memudar. |
| Coach Doni | Pelatih voli | Lapangan Voli | Kariernya berhenti karena lutut. Merasa bersalah soal gigi Andre. |

### Romance (8) — tersedia sesuai gender pemain (pemain wanita → pria, pemain pria → wanita)
| Nama | Profesi & sifat | Bonus menikah | Inti karakter |
|---|---|---|---|
| **Adji** ♂ | Akuntan. Lucu, penyayang, perhatian. Polo hitam, kulit kuning langsat, rambut hitam pendek | Pajak 10%→5%, laporan mingguan, Stres −10 tiap pagi | Konyol dan belum pernah pacaran sejak ditolak waktu SMA. Yakin pada pemain sejak hari pertama. |
| Arya ♂ | Insinyur sipil (Konsultan Teknik), pendiam. Helm proyek, kacamata | Upgrade klinik/rumah −25%, lebih cepat | Rumahnya hanyut waktu kecil. Diam-diam menggambar rumah untuk pemain. |
| Ipda Raka ♂ | Polisi kota (Pos Polisi), humoris | Kasus Pak Joni selesai lebih cepat; trust tidak turun saat klaim pasien | Pindah dari Metrapura setelah satu kasus mengganggunya. Berdamai dengan ayahnya. |
| dr. Galih ♂ | Dokter umum Puskesmas, melankolis | Risiko komplikasi pasien riwayat medis −50% | Mundur dari spesialis setelah salah dosis karena lelah. Menulis puisi di kertas resep. |

*Profesi romance pria setara dokter gigi. Bonus menikah Arya, Raka, Galih disetujui pemilik proyek (2026-11-11).*
| Nama | Profesi & sifat | Bonus menikah | Inti karakter |
|---|---|---|---|
| Sekar ♀ | Perpustakaan & kebun bunga, lembut | Kesabaran pasien +20% | Pemalu yang diam-diam menulis cerpen dengan nama samaran "Telang". |
| Nadia ♀ | Kedai kopi, energik | Energi awal hari +20 | Barista kota yang nekat buka kedai. Tiap pagi belajar diam-diam dari Pak Bowo. |
| Laras ♀ | Fotografer, ceria | Reputasi +25% lebih cepat | Memotret seisi kota tapi tidak pernah ada di foto. Menyimpan foto terakhir Om Darto. |
| Wulan ♀ | Bidan puskesmas, lembut tapi tegas | Sakit anak −25%, +1 rujukan/hari | Mencatat setiap bayi yang dia bantu lahirkan, sampai lupa merawat diri. |

Kandidat yang tidak tersedia tetap jadi warga dengan arc pertemanan.

**Event Adji**: (1) Struk Berantakan, (2) Polo Hitam Ketujuh, (3) Lembur Akhir Bulan, (4) "Kamu Udah Makan?" (muncul saat Stres >60), (5) Neraca Hati (Bukit Bintang).
**Kandidat lain** E1–E5:
- Arya: cek struktur ruko / jembatan kali / lereng saat hujan / tawaran proyek Metrapura / rumah yang dia gambar
- Ipda Raka: tilang sepeda / patroli malam / menyelidiki Pak Joni / luka saat tugas / lencana kedua
- dr. Galih: pasien rujukan bersama / jaga malam / pasien yang tak tertolong / beda pendapat antibiotik / catatan di kertas resep
- Sekar: buku telat / bunga favorit / bibit untuk lereng / naskah ditolak / bunga di buku
- Nadia: racikan baru / kopi spesial / kedai sepi / pemasok / kopi tanpa nama
- Laras: foto candid / pameran gagal / Pameran Foto Warga / tawaran Metrapura / foto berdua
- Wulan: persalinan malam / imunisasi / jaga 24 jam / beda pendapat rujukan / jalan pulang

### Lainnya
Detail: [pasien spesial](../narrative/npc/03-pasien.md) · [tokoh luar kota](../narrative/npc/04-luar-kota.md) · [kandidat staf](../narrative/npc/05-staf.md).
- **Pasien tamu** (Desa Wetan, Kampung Kali, Dusun Atas). 12 spesial: Pak Hasan (hipertensi), Bu Yati (hamil T1), Mbak Dina (estetik), Pak Yusuf (pengencer darah), Kiki (gigi susu), Mas Rudi (abses), Bu Lastri (diabetes), Pak Marno (kades, rujukan), Tika (dilema biaya), Pak Gunawan (klaim), Nenek Sumi (takut), Andre (trauma gigi depan). Ditambah pasien acak (15% punya riwayat medis).
- **Luar kota**: Koh Hendra (Bahari Medika, Tanjung Arum), Bu Melinda (Metra Dental Supply, Metrapura), drg. Surya (mantan atasan), Pak Joni (tukang gigi keliling: gigi palsu & tambal murah tanpa alat steril).

## 11. Bangunan (semua bisa dimasuki, interior 1 layar)
Interior klinik ikut membesar tiap tahap agar furnitur tambahan tidak sesak: tahap 0–1 272×176 · tahap 2 320×200 · tahap 3 368×216 · tahap 4 416×232 per lantai (semua muat 1 layar 480×270, tanpa scroll).

Klinik (5 tahap) · Rumah Dokter + Kebun Herba · Balai Kota · Warung Bu Ratna · Kedai Kopi Seduh · Perpustakaan & Kebun Bunga · Studio Foto Lensa · Kantor Konsultan Teknik Arya · Pos Polisi · Kantor Akuntan Adji · Puskesmas · SD Negeri Rimbasari · Pondok Jamu · Toko Roti Manis · Kantor Pos · Terminal Bus · Rumah Keluarga Endang · Rumah Kakek Wiryo · Rumah Lurah / Bowo / Guru · Kos Melati · Losmen Singgah.
- Warung Bu Ratna: papan dinding "WARUNG BU RATNA"; konter = satu panel belanja bahan makanan + bibit herba (§3.1).

**Tempat tinggal baru (ACC 2026-11-11):**
- **Kos Melati** (Kampung Asri, ujung kanan setelah kolam): rumah besar Pak Udin, kamarnya disewakan sejak istrinya, Bu Melati, meninggal. Penghuni: Rina, Yoga, drg. Hana, drg. Bima (kamar 1–4); Pak Udin di kamar depan (sayap kiri); **kamar 5 = pemain** selama rumah Lv 1 (ACC 2026-11-13, lihat §8). Interior 320×200: ruang bersama (5 pintu kamar, meja makan, TV, rak sepatu, dispenser, papan piket, foto Bu Melati, pot melati).
- **Losmen Singgah** (Jalan Niaga, tepat di samping Terminal Bus): ruko 2 lantai, **6 kamar**, dikelola Bu Sri 07–19. Interior: lobi & lorong 320×200 (meja resepsionis, bel, buku tamu, papan 6 kunci, pintu kamar 1–6). Hanya **kamar 2** (Kamar A, 240×168, 1 ranjang) dan **kamar 5** (Kamar B, 288×184, 2 ranjang untuk pasien dengan pendamping) yang bisa dimasuki; keduanya area pribadi pasien, **masuk hanya jika trust ≥ 40**. Kamar lain terkunci (gembok). Mekanik menginap tetap fitur di luar MVP (lihat 06-jadwal.md).
- **Puskesmas**: interior membesar ke 320×200; sudut kanan bersekat jadi area **rawat inap** (2 ranjang berpagar, tiang infus, nakas, 2 kursi penunggu) untuk pasien bedah minor/abses yang menginap semalam.
Area terbuka: Alun-alun + Angkringan · Kebun Kopi · Lapangan Voli · Bukit Bintang.

**Zona kota (ACC 2026-11-11):** kota dibagi 4 zona. Tiap zona 768×432, kecuali **Kampung Asri 960×432** (dilebarkan untuk Kos Melati, ACC 2026-11-11) (±1,6 layar, bisa digulir, kamera mengikuti pemain; disetujui 2026-11-11). Pindah zona lewat gerbang di tepi peta, dengan layar transisi berisi nama zona dan tips. Waktu game berhenti selama transisi. Isi tiap zona tidak padat: bangunan diberi jarak, lalu jalanan kosong diisi dekorasi (rumput, bunga, batu, lampu, tong, peti, kotak pos, papan arah).
| Zona | Isi |
|---|---|
| 1 · Alun-alun (pusat) | Klinik, Balai Kota, Warung Bu Ratna, Kedai Kopi Seduh, Toko Roti Manis, Kantor Pos, Angkringan |
| 2 · Kampung Asri (barat) | Rumah Dokter + Kebun Herba, Rumah Keluarga Endang, Rumah Kakek Wiryo, Rumah Lurah / Bowo / Guru, Pondok Jamu, SD Negeri, Kos Melati |
| 3 · Jalan Niaga (timur) | Terminal Bus, Losmen Singgah, Pos Polisi, Kantor Konsultan Teknik Arya, Kantor Akuntan Adji, Puskesmas (Wulan & dr. Galih), Studio Foto Lensa |
| 4 · Lereng Bukit (utara) | Perpustakaan & Kebun Bunga, Kebun Kopi, Lapangan Voli, Bukit Bintang |

Objek interaktif di interior: kursi dental (periksa pasien), meja snack & kopi (ngopi/ngemil), meja kerja (rekam medis).
Kota lain (terminal + 1 toko): **Tanjung Arum** (Bahari Medika, bisa dikunjungi sejak hari 1; rak alat T2 terbuka ≥8 challenge), **Metrapura** (Metra Dental Supply, ≥18 challenge). Tiket 100rb / 250rb. Detail di §11.1.

### 11.1 Toko Alat Kesehatan & Perjalanan ke Tanjung Arum (ACC 2026-11-13)
Ide pemilik proyek: bahan klinik tidak dijual di warung, melainkan di toko alat kesehatan di kota lain, dan perjalanan ke sana bisa dilakukan sejak awal tanpa menunggu alat tahap 2. Angka bertanda [2f] masuk `CFG`.

**Bahari Medika (Tanjung Arum, Koh Hendra)**
- Menjual **paket bahan** (Rp 750rb = 10 unit, sama dengan harga lama) dan **alat T1** sejak hari 1 (tahap 0). Sekali beli maksimal **10 paket** [2f] (dulu 5), supaya satu perjalanan sepadan.
- **Rak alat T2** ada di toko yang sama, tetapi terkunci sampai ≥8 challenge (syarat lama untuk Tanjung Arum, sekarang hanya mengunci rak). Rak terlihat dengan label terkunci.
- **Harga teman** dari Koh Hendra: diskon bahan dan alat **5% di trust 40, 10% di trust 60** [2f]. Aktif setelah sistem trust (Fase 3a). Sebelum itu harga selalu penuh.
- Buka **08–17 setiap hari, termasuk Minggu** (ACC 2026-11-13), supaya pemain bisa belanja saat klinik libur. Di hari kerja, pemain memilih antara pergi pagi lalu buka klinik siang, atau menutup klinik setengah hari.

**Perjalanan (Terminal Bus, Jalan Niaga)**
- Tiket Tanjung Arum **Rp 100rb pulang-pergi** [2f], dibeli di loket Terminal. Perjalanan sekali jalan **2 jam** [2f] (layar transisi, waktu berjalan, tanpa biaya energi).
- Bus **berangkat dari Rimbasari 07:00 dan 13:00**, **pulang dari Tanjung Arum 11:00 dan 17:00** [2f]. Contoh: berangkat 07:00 → tiba 09:00 → belanja → pulang 11:00 → tiba 13:00 (½ hari). Bus 13:00 → tiba 15:00 → pulang 17:00 → tiba 19:00.
- Bisa pergi **sejak hari 1**. Metrapura tetap terkunci sampai ≥18 challenge (pola perjalanan sama, tiket Rp 250rb; jadwal dan lama perjalanan ditentukan di Fase 3b).
- **Klinik ditinggal**: kalau pemain naik bus saat klinik BUKA, klinik otomatis tutup dan pasien di antrian pulang dengan aturan "pasien pergi" yang sudah ada. Resepsionis (tahap 2) tidak bisa membuka klinik tanpa dokter.
- **Ketinggalan bus**: jam 16:30 muncul pengingat. Jam 17:00 pemain yang masih di Tanjung Arum otomatis dibawa ke halte dan naik bus terakhir. Tidak ada penginapan di Tanjung Arum.

**Pesan antar lewat Kantor Pos Rimbasari (cadangan)**
- Bahan dan alat T1 bisa dipesan dari katalog Bahari Medika (diantar Ilham, sesuai Buku NPC). Ongkir **Rp 150rb per pesanan**, maksimal **3 paket** per pesanan, satu pesanan aktif [2f]. Bayar di muka.
- Pesanan sebelum 16:00 tiba **2 hari kemudian jam 08:00** [2f] dan langsung masuk stok klinik (diumumkan di kartu pagi).
- Challenge #6 "Pesan alat via Kantor Pos" tetap memakai jalur ini.

**Warung Bu Ratna**: berhenti menjual bahan klinik. Tetap menjual bibit herba dasar (§7) dan jajanan, memberi utang kecil saat uang habis (§3), dan tetap jadi pusat gosip.

**Zona Tanjung Arum** (aset baru, draf di `design/v3` dan harus di-ACC dulu): peta 1 layar 480×270, tanpa gulir. Isi: halte terminal kecil (tempat tiba dan naik bus pulang), jalan pelabuhan, Bahari Medika (`EXT.bahari` yang sudah ada), dan dekorasi pantai/pelabuhan. Interior Bahari Medika (`rooms.bahari`) diubah: papan "ALAT & BAHAN", rak bahan dan konter beli bahan, rak alat T2 bertanda terkunci. Draf: `design/v3/tanjung.html` (sumber `design/v3/src/tanjung.js`), bukti `production/qa/evidence/fase2f-draf-*`.

**Toko Emas & Toserba (Fase 3a-5, ACC user 2026-11-16)**
- Zona Tanjung Arum **dilebarkan** (kamera menggulir ke kanan) untuk dua bangunan baru di sebelah kanan Bahari Medika. Draf: `design/v3/src/nikah.js`.
- **Toko Emas Ci Lina**: buka **09–16, tutup Minggu**. Menjual **Cincin Lamaran Rp 12jt** (baru bisa dibeli setelah pacaran, maks 1, tidak dijual lagi setelah melamar; tidak bisa dijadikan hadiah biasa), Kalung Emas Rp 1,5jt, Gelang Emas Rp 800rb (hadiah).
- **Toserba Mbak Yuni**: buka **08–17 setiap hari**. 32 barang hadiah dalam 6 tab (Pria, Wanita, Kosmetik, Olahraga, Aksesori, Lain), Rp 25rb–300rb. Barang ini menjadi selera baru beberapa NPC (mis. Adji suka polo/pulpen/coklat, Dimas robot, Kakek Wiryo catur kayu, Mbah Darmi benci parfum & lipstik). Tidak dijual di Warung.
- Ngobrol dengan penjaga toko saat buka → "Lihat barang" / "Nanti aja"; E di konter juga membuka panel.

## 12. Nongkrong
| Tempat | Jam | Efek |
|---|---|---|
| Kedai Kopi Seduh (30rb) | 15–22 | Stres −15, buff Fokus besok (zona +10%) |
| Angkringan (25rb) | 18–24 | Energi +15, trust +2 ke NPC yang hadir |
| Lapangan Voli | 16–18 | Stres −20, energi −10 |
| Bukit Bintang | 20–24 | Stres −25, tempat kencan |
| Perpustakaan | 09–19 | Stres −10 |
| Karaoke Malam Minggu | Sab 19–23 | Stres −30, trust + ke semua yang hadir |
| Toko Roti (20rb) | 07–17 | Energi +10 |

> **Di game (Fase 3a-3, ACC user 2026-11-15):** E di titik nongkrong (meja Kedai Seduh, gerobak Angkringan sambil menghadapnya, Lapangan Voli, bangku Bukit Bintang, meja baca Perpustakaan, etalase Toko Roti) membuka panel kecil HD: biaya, lama, jam buka, efek, tombol Nongkrong/Batal. Karaoke Malam Minggu = tombol tambahan di panel Angkringan hari Sabtu. Nongkrong 1 jam (Karaoke 2 jam), harus selesai sebelum tempat tutup, tiap tempat sekali sehari. Tombol mati menulis alasannya (Buka 15-22, Sudah hari ini, Uang kurang, Energi kurang, Hanya Sabtu 19-23). Setelah dipilih: layar memudar, jam maju, efek tampil sebagai toast. Gratis: Voli, Bukit Bintang, Perpustakaan, Karaoke. Stres tidak turun di bawah 0, energi tidak lewat maksimum. Voli butuh energi minimal 10. **Fokus** (Kedai) berlaku seharian besok: zona target minigame ×1,10, chip "Fokus" di HUD di bawah kotak stres. **Yang hadir** = NPC yang sudah dikenal dan sudah tiba di tempat (bukan masih di jalan); Trust nongkrong masuk sekali per hari per NPC (sumber `nongkrong`, jadi Karaoke setelah Angkringan di malam yang sama tidak menambah Trust lagi). Jenis nongkrong dicatat di `S.hang.kinds` untuk challenge #10 (menunggu Jurnal). Bukit Bintang sebagai tempat kencan menyusul di 3a-5. Angka di `CFG.HANG` (src/nongkrong3a.js). Kata kerja mengikuti kegiatan (permintaan user 2026-11-15): Nongkrong di Kedai, Angkringan, Toko Roti; Bermain Voli; Melihat Bintang; Membaca di Perpustakaan; Karaoke (dipakai di teks E dan tombol panel).

## 13. Event Musiman (berulang tiap tahun, versi pendek setelah tahun 1)
| Musim | Hari | Event |
|---|---|---|
| Kemarau | trigger | Pembukaan Klinik (sekali) |
| Kemarau | 15 | Pameran Gigi Sehat (tebak-tebakan anak) |
| Kemarau | 35 | Panen Kopi (darurat Pak Bowo) |
| Kemarau | 55 | Pesta Rakyat (tebak-tebakan warga) |
| Hujan | 10 | Tanam Pohon Bersama: awal musim hujan, warga menanam bibit di Lereng Bukit supaya tanah lereng kuat (revisi 2026-11-11, menggantikan Gotong Royong Banjir, menunggu acc) |
| Hujan | 25 | Bakti Sosial |
| Hujan | 45 | Malam Lampion (konflik klaim, momen romance) |
| Hujan | 60 | Syukuran Akhir Tahun |

Tidak ada minigame aksi selain tindakan gigi. Tebak-tebakan di event berupa pilihan jawaban.

## 14. Narasi (bab mengikuti tahap klinik)
Bab 1 Orang Asing (0→1) · Bab 2 Mulai Dikenal (1→2) · Bab 3 Diuji (2→3: Pak Joni, klaim) · Bab 4 Bagian dari Kota (3→4: tawaran drg. Surya) · Epilog + credit roll. Setiap musim dibuka dengan narasi singkat sesuai bab.

## 15. Side Challenge (39)
Jurnal (J). Challenge muncul tiap ±3–4 hari dan menumpuk kalau belum selesai. ⏰ = deadline. Yang terlewat muncul lagi tahun berikutnya.
**Credit roll = klinik tahap 4 + 39/39 challenge.** Free play setelahnya.

Kemarau: 1 Bersihkan Ruko · 2 Kenalan 8 warga ⏰7h · 3 Buka Praktik · 4 Rawat 5 warga · 5 Panen herba pertama · 6 Pesan alat via Kantor Pos ⏰5h · 7 Pameran: menang tebak-tebakan ⏰ · 8 Rawat Dimas tanpa menangis · 9 Stok ≥30 selama 7 hari · 10 Tiga jenis nongkrong ⏰10h · 11 Tiga kontrol ulang · 12 Ngobrol Mbah Darmi 7 hari berturut · 13 ★2 · 14 Darurat Pak Bowo ⏰malam · 15 Klinik tahap 2 · 16 Rekrut staf pertama · 17 Lima karies tersembunyi via rontgen · 18 Tiga Malam Minggu · 19 Stres <80 selama 14 hari · 20 Pesta Rakyat: menang tebak-tebakan ⏰ · 21 Pendapatan Kemarau ≥5jt ⏰K60.

Hujan: 22 Lima rujukan puskesmas ⏰20h · 23 Herba ke 10 pasien · 24 Tanam Pohon: pos periksa gigi di Lereng, 5 warga ⏰2h · 25 Staf Skill Lv3 · 26 Pajak 3× tepat waktu · 27 Harga teman dari Koh Hendra (trust 40; dulu "Ke Tanjung Arum", diganti karena kota bisa dikunjungi sejak hari 1) · 28 Bakti Sosial 8 pasien ⏰ · 29 Satu Keluarga Sehat (Bu Endang & Dimas dalam 1 minggu) · 30 Tim lengkap · 31 Klaim: periksa ulang ⏰3h · 32 Pak Joni: edukasi 5 warga + lapor Lurah ⏰10h · 33 Malam Lampion bersama seseorang ⏰ · 34 Semua warga Akrab · 35 Klinik tahap 3 · 36 Pidato Syukuran ⏰.

Fitur: 37 PSA pertama · 38 Diagnosis tepat 20× berturut · 39 Lima pasien riwayat medis khusus ditangani benar.

**Aturan Jurnal (Fase 3b-1, ACC user 2026-11-17; menggantikan "muncul tiap ±3–4 hari dan menumpuk")**
- Setiap challenge punya **pemicu**. Challenge baru muncul hanya setelah pemicunya terjadi.
- **Slot 1 (urutan musim)**: satu challenge aktif. Yang berikutnya = challenge belum selesai dengan nomor terkecil di musim itu yang pemicunya sudah terjadi; yang pemicunya belum terjadi ditunggu, tidak dilompati.
- **Slot 2 (event/cerita)**: challenge yang dipicu event atau bab (#7, 14, 20, 24, 28, 31, 32, 33, 36). Jadi maksimal **2 challenge aktif bersamaan**.
- **Ganti musim**: challenge slot 1 yang belum selesai dan sisa challenge musim itu **dilewati**; Jurnal pindah ke challenge pertama musim berikutnya (Hujan dari #22; Kemarau tahun berikutnya dari nomor Kemarau terkecil yang belum selesai). Yang dilewati muncul lagi tahun berikutnya di urutannya. ⏰ dihitung sejak challenge muncul.
- **Pencapaian** (dulu "tonggak"; #3, 13, 15, 16, 25, 30, 34, 35, 37, 38, 39): tidak memakai slot, tercatat otomatis begitu tercapai.
- **Imbalan** berbeda tiap challenge:

| # | Pemicu | Imbalan |
|---|---|---|
| 1 | Surat Pak Harjo dibaca | Rp 500rb dari Pak Harjo, Trust Harjo +5 |
| 2 | #1 selesai | Roti Manis ×3, Trust Ratna +5 |
| 3 | (tonggak) renovasi selesai | Reputasi +10 |
| 4 | Pasien warga pertama | Trust +3 ke 5 warga itu |
| 5 | Bibit pertama ditanam | 3 bibit Cengkeh dari Mbah Darmi |
| 6 | Stok klinik ≤5 | Ongkir gratis pesanan berikutnya |
| 7 | Hari Kemarau 15 (event) | Reputasi +15, Trust Guru & Endang +5 |
| 8 | Dimas datang sebagai pasien | Gambar dari Dimas (dekor klinik), Trust Endang +8 |
| 9 | Stok pertama kali habis | 1 paket bahan gratis |
| 10 | Stres pertama kali >50 | Kopi Susu ×3 |
| 11 | Jadwal kontrol pertama dibuat | Rp 300rb, reputasi +10 |
| 12 | Trust Darmi ≥20 | Resep jamu: herba memulihkan energi +10 |
| 13 | (tonggak) | Rp 1jt dari Pak Harjo |
| 14 | Hari Panen Kopi (event) | Biji Kopi ×5, Trust Bowo +10 |
| 15 | (tonggak) | Reputasi +20 |
| 16 | (tonggak) | Pelatihan pertama gratis |
| 17 | Rontgen pertama | Rp 500rb, reputasi +15 |
| 18 | Sabtu pertama setelah #2 | Trust +3 ke semua yang pernah ikut karaoke |
| 19 | Stres pertama kali >80 | Tidur menurunkan Stres 5 lebih banyak (permanen) |
| 20 | Hari Kemarau 55 (event) | Reputasi +15, hadiah undian |
| 21 | Hari Kemarau 40 | Pajak berikutnya −50% (saran Adji) |
| 22 | Rujukan pertama ke Galih | Trust Galih & Wulan +8 |
| 23 | Sirih pertama kali dipakai | +1 petak kebun |
| 24 | Hari Hujan 10 (event) | Bibit pohon buah di kebun, Trust peserta +5 |
| 25 | (tonggak) | Pelatihan berikutnya −50% |
| 26 | Pajak pertama dipotong | Rp 1jt pengembalian pajak |
| 27 | Trust Hendra ≥20 | Diskon tambahan 5% rak T2 |
| 28 | Hari Hujan 25 (event) | Reputasi +20, Trust Lurah +10 |
| 29 | Trust Endang ≥40 | Seragam klinik dari Bu Endang |
| 30 | (tonggak) | Foto tim di dinding, energi semua staf +1 Lv |
| 31 | Bab 3, Pak Gunawan (cerita) | Reputasi pulih, Trust Gunawan +10 |
| 32 | Bab 3 (cerita) | Joni jadi rujukan gigi palsu, Trust +5 ke 5 warga |
| 33 | Hari Hujan 45 (event) | ♥ +10 atau Trust +10 |
| 34 | (tonggak) | Plakat warga kehormatan, reputasi +30 |
| 35 | (tonggak) | Reputasi +20 |
| 36 | Hari Hujan 60 (event) | Reputasi +20, Trust +5 ke semua yang hadir |
| 37 | (tonggak) | Surat Bu Melinda: diskon alat T3 10% |
| 38 | (tonggak) | Reputasi +30 |
| 39 | (tonggak) | Tensimeter digital dari Galih: Trust Galih +10, Reputasi +10 (anamnesis sudah 1 menit, jadi potongan waktu diganti) |

- Gerbang tetap: 8 challenge → rak T2, 18 → Metrapura. Bonus menikah Raka: #32 cukup edukasi 3 warga, lapor Lurah otomatis.

**Tampilan Jurnal (di game, `src/jurnal3b.js`)**
- Tombol J, menu Esc, atau klik chip. Tiga tab: **Aktif** (slot urutan + event/cerita + "Berikutnya"), **Pencapaian**, **Riwayat** (selesai/dilewati dengan tanggal "H14 Kemarau", terbaru di atas). Nomor challenge dan nama musim tidak ditampilkan; hitungan "Selesai n/39" ada di kaki panel.
- Chip HUD kanan (di bawah chip Fokus/janji/nikah) menampilkan challenge aktif; klik chip = diperkecil jadi tombol "J n" (status disimpan), klik lagi = dibuka.
- Kartu muncul saat challenge baru, selesai, pencapaian, dan saat challenge dilewati karena ganti musim.
- Angkringan: di petak depan gerobak, E selalu membuka panel nongkrong/karaoke walau banyak NPC berkerumun; ngobrol dengan NPC dari luar petak itu.

## 16. Teknis
- Satu file `index.html` di root proyek. Canvas resolusi rendah di-scale integer. Pixel art digambar via kode. SFX WebAudio.
- Struktur: CONFIG → DATA → ENGINE → SYSTEMS → SCENES → UI → BOOT. Satu objek state `S` untuk save (localStorage, autosave saat tidur).
- Resolusi asli 480×270 (di-scale integer). Karakter 24×32 chibi, tile 16×16.
- Arah visual: lihat `design/v3/index.html` (karakter, bangunan, peta, UI, minigame; ACC 2026-11-11). Sumber gambar di `design/v3/src/`, dibangun dengan `node design/v3/build.cjs`. v1 & v2 disimpan sebagai pembanding.
- Semua teks memakai font piksel 5×7 buatan sendiri (tajam, tanpa anti-alias). Ukuran 2× untuk judul.
- **Dialog** (ACC 2026-11-11): sistem campuran. Dialog penting (event, rahasia, E1–E5, adegan Trust, lamaran) ditulis tangan dan tidak pernah diganti AI. Obrolan harian diambil dari kumpulan dialog tulis tangan ([07a](../narrative/npc/07a-dialog-warga.md) · [07b](../narrative/npc/07b-dialog-romance.md) · [07c](../narrative/npc/07c-dialog-lainnya.md)) berdasarkan kondisi (event > renggang > nikah > pacaran > Hubungan > stres > cuaca > musim > tempat > Trust); baris yang sudah dipakai 7 hari terakhir tidak diulang.
- **Dialog AI opsional** (di luar MVP): kalau pemain memasukkan API key AI miliknya sendiri, obrolan harian boleh dibuat AI dengan kartu NPC sebagai pegangan karakter. Tanpa key, game tetap memakai kumpulan dialog tulis tangan.

## 17. Fase
1. Skeleton: kustomisasi karakter, gerak, peta, klinik kosong, waktu/musim, speed, HUD, save.
2. Core loop: pasien, antrian, alur periksa, 4 tindakan T1, tarif, stok, klinik 1–2, rontgen, staf, rumah, kebun. **2f** toko alkes Bahari Medika, perjalanan bus ke Tanjung Arum, dan pesan antar Kantor Pos (§11.1).
3a. NPC, trust, romance, nongkrong.
3b. Event, challenge, Metrapura, cerita, tahap 3–4, PSA.
4. Polish: art, SFX, balancing, credit roll.
