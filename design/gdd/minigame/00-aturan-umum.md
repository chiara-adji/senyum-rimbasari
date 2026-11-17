# Minigame Tindakan — Aturan Umum

> Status: **ACC 2026-11-11** (angka bertanda [usulan] dipakai sebagai nilai awal, disetel saat playtest). Turunan dari GDD utama `design/gdd/senyum-rimbasari.md` §6 (alur pasien & tindakan), dengan rujukan ke §3 (stres), §4.1 (tarif), §5 (staf), dan §7 (herba).
> Angka yang sudah disetujui di GDD tidak diubah. Angka baru ditandai **[usulan]** dan dikumpulkan di bagian Tuning Knobs.

## 1. Ringkasan
Semua tindakan dimainkan sebagai rangkaian 3–5 langkah. Satu langkah berlangsung 3–6 detik nyata, dan selama tindakan waktu game berhenti (GDD §2). Pemain menghadapi tiga hal sekaligus: zona gagal di tiap langkah, Bar Sakit pasien, dan riwayat medis yang mungkin terlewat di anamnesis. File ini mengatur bagian yang sama untuk semua tindakan. Detail per tindakan ada di file 01–10.

## 2. Rasa yang dituju
Tangan dokter yang tenang. Pemain harus merasa sedang bekerja di mulut orang sungguhan: pelan di saat yang perlu pelan, berani di saat yang perlu tegas, dan selalu ingat siapa pasien di kursinya. Kalau gagal, biasanya penyebabnya tergesa-gesa atau lupa bertanya, jarang karena kurang cepat. Sesuai pilar 3, kegagalan tidak pernah jadi game over, hanya menunda.

## 3. Aturan

### 3.1 Jenis input
Enam pola input dipakai berulang di semua tindakan, supaya pemain cukup belajar sekali.

| Kode | Cara main | Gagal kalau | Contoh pemakaian |
|---|---|---|---|
| **TEPAT** | Penanda bergerak bolak-balik di meter. Tekan Spasi (atau klik) saat penanda di zona hijau. | Ditekan di luar zona | Light-cure, obturasi, potong benang |
| **GOSOK** | Drag mouse di area kerja sampai progres penuh. | Kursor keluar garis batas (gusi, zona pulpa merah) | Scaling, bor karies, buang tulang |
| **TAHAN** | Tahan klik. Jarum mengisi pelan, kecepatannya mengikuti seberapa jauh kursor digeser. | Terlalu cepat (lewat garis kuning) | Suntik bius, irigasi |
| **URUT** | Klik alat/bahan di baki sesuai urutan yang benar. | Urutan salah atau ada yang terlewat | Kondisioner → bilas → GIC, urutan file PSA |
| **RITME** | Tekan A/D bergantian mengikuti ketukan di layar. | Menekan saat ketukan merah (terlalu keras) atau melewatkan 3 ketukan | Luksasi, goyang tang |
| **PILIH** | Memilih kartu, dialog, atau barang di rak. Tidak ada batas waktu. | Pilihan tidak cocok dengan diagnosis atau riwayat pasien | Konsultasi, resep, edukasi |

Semua input bisa dimainkan dengan mouse saja (Spasi = klik kiri, A/D = klik kiri/kanan), untuk aksesibilitas.

### 3.2 Bar Sakit
- Rentang 0–100, mulai dari 0 (atau dari nilai awal kasus, misalnya abses yang sudah sakit).
- Naik karena langkah tertentu (suntik, bor, luksasi) dan karena kesalahan input.
- Bius yang tepat menahan kenaikan sampai tindakan selesai. Bius dipilih di langkah awal: tanpa bius / topikal / infiltrasi / blok (GDD §6). Blok terbuka di T2.
- **Penuh (100)** → tindakan berhenti. Pasien menolak lanjut, hasilnya Gagal, dan pasien bisa dijadwal ulang. Reaksi per pasien diatur di narasi (misalnya Kiki menggigit, Pak Marno hampir pingsan).
- **≥ 70** → wajah pasien berubah, tangannya meremas kursi. Ini peringatan saja, tidak ada efek mekanik.
- Pengurang dari GDD (dikalikan bertumpuk): Perawat −20% (§5), Cengkeh −30% semua pasien (§7), Lidah Buaya −30% pasien anak (§7).

### 3.3 Zona sukses
- Setiap langkah TEPAT, GOSOK, TAHAN, dan RITME punya zona sukses. Makin lebar zonanya, makin mudah.
- Yang melebarkan zona: tier alat, Perawat +15% (§5), Kunyit +15% khusus kasus darurat (§7).
- Yang menyempitkan zona: Stres > 50 −10% (§3), kesulitan kasus.
- Rumusnya ada di bagian 4.

### 3.4 Tier alat
Tier lebih tinggi membuat minigame lebih mudah (GDD §6). Efeknya ada dua jenis:
1. **Umum**: zona lebih lebar (pengali tier, bagian 4).
2. **Khusus**: alat baru mengubah cara main. Contohnya, scaler ultrasonik membuat karang lepas lebih cepat, apex locator menghapus langkah ukur panjang kerja manual, dan loupe menampilkan garis zona pulpa lebih jelas. Detailnya ada di file masing-masing tindakan.

Tindakan hanya bisa dimainkan kalau alat minimum untuk tindakan itu sudah dimiliki.

### 3.5 Pengecekan riwayat medis
Sebelum langkah pertama, game mencocokkan riwayat pasien dengan jawaban anamnesis pemain (GDD §6 ①) dan hasil tensimeter (②).

| Riwayat | Kalau ditanyakan/diukur | Kalau terlewat |
|---|---|---|
| **Hipertensi** | Tensi ≥ 160/100 → tindakan invasif ditunda. Pasien diberi resep pereda sakit dan diminta kembali (sesuai kasus Pak Hasan). Tensi di bawah itu → tindakan boleh jalan, tetapi bius berepinefrin dibatasi maksimal 2 karpul. | Komplikasi (perdarahan, pusing), hasil Gagal |
| **Pengencer darah** | Tindakan tetap jalan. Pasien **tidak** disuruh berhenti minum obat. Langkah hemostasis wajib: tampon lebih lama, ditambah jahitan kalau set bedah T3 ada. | Perdarahan setelah tindakan, pasien kembali malam itu, hasil Gagal |
| **Diabetes** | Tindakan jalan. Jadwal kontrol wajib dibuat. | Luka lambat sembuh, pasien kembali mengeluh |
| **Hamil** | Rontgen di trimester 1 tidak boleh (GDD §6 ③). Tindakan elektif ditunda ke trimester 2. Kasus darurat tetap ditangani (tambalan sementara, resep). Obat: parasetamol, bukan ibuprofen. | Rontgen → pasien menolak dan pulang, trust −6. Ibuprofen → komplikasi, hasil Gagal |
| **Jantung / pacemaker** | Scaler ultrasonik tidak dipakai, scaling dikerjakan manual. Bius berepinefrin dibatasi seperti pada hipertensi. | Komplikasi, hasil Gagal |
| **Alergi obat (penisilin)** | Di resep, pemain memilih antibiotik pengganti. | Reaksi alergi, pasien dirujuk ke Puskesmas (dialog Galih), hasil Gagal |

Batas 160/100 dipakai karena sudah menjadi aturan kasus Pak Hasan di narasi, dan sesuai dengan batas elektif di sebagian literatur. Riset aslinya juga memakai batas 180/110 untuk kasus darurat (lihat Sumber).

### 3.6 Hasil tindakan
| Hasil | Syarat | Akibat |
|---|---|---|
| **Sukses** | Semua langkah wajib berhasil, Bar Sakit tidak pernah ≥ 70 | Bayaran penuh, bonus reputasi sesuai aturan GDD |
| **Cukup** | Ada 1–2 kesalahan kecil, tidak ada kesalahan berat, Bar Sakit tidak penuh | Bayaran penuh, tanpa bonus. Peluang keluhan saat kontrol naik **[usulan]** |
| **Gagal** | Ada kesalahan berat, Bar Sakit penuh, atau riwayat medis terlewat dan memicu komplikasi | Stres +10 (§3), trust −6, pasien kembali mengeluh. Kalau tindakan berhenti di tengah, bayaran hanya untuk langkah yang sudah selesai **[usulan]** |

**Kesalahan berat** didefinisikan per tindakan, misalnya perforasi, akar patah, atau file patah.

### 3.7 Energi
Tindakan memakan energi 10–20 (GDD §3). Angka tiap tindakan ada di file masing-masing. Konsultasi dan resep lebih ringan karena tidak memakai tangan **[usulan]**.

### 3.8 Dokter Gigi Rekan
Dokter Rekan otomatis menangani konsultasi, scaling, dan tambal di kursi 2 (GDD §5). Hasilnya tidak dimainkan. Peluang Sukses mengikuti Skill Lv rekan **[usulan]**.

## 4. Rumus

**Lebar zona** (persen dari panjang meter):
```
zona = Z_dasar × T_tier × (1 + 0.15·Perawat + 0.15·Kunyit_darurat) × (Stres>50 ? 0.9 : 1.0) ÷ K_kasus
```
- `Z_dasar`: lebar dasar per langkah, ditulis di file tindakan **[usulan]**, rentang 15–40%.
- `T_tier`: T1 1.0 · T2 1.2 · T3 1.4 **[usulan]**.
- `Perawat`, `Kunyit_darurat`: 1 kalau aktif, 0 kalau tidak (angka 0.15 dari GDD §5/§7).
- `K_kasus`: 1.0 / 1.3 / 1.7, sama dengan pengali kesulitan kasus di GDD §4.1.
- Batas akhir: zona minimal 8%, maksimal 60% **[usulan]**.

Contoh: langkah dengan Z_dasar 30%, alat T2, ada Perawat, stres 60, kasus sedang → 30 × 1.2 × 1.15 × 0.9 ÷ 1.3 = **28.7%**.

**Kenaikan Bar Sakit** per kejadian:
```
naik = S_dasar × (1 − B_bius) × (Perawat ? 0.8 : 1) × (Cengkeh ? 0.7 : 1) × (Anak & LidahBuaya ? 0.7 : 1)
```
- `S_dasar`: ditulis per langkah di file tindakan **[usulan]**.
- `B_bius`: tanpa 0 · topikal 0.3 · infiltrasi 0.7 · blok 0.85 **[usulan]**. Bius yang tidak cocok dengan gigi (misalnya topikal untuk geraham tetap) dihitung 0.

Contoh: bor dentin S_dasar 12, infiltrasi, ada Perawat → 12 × 0.3 × 0.8 = **2.9** per detik di luar zona.

## 5. Kasus khusus
- **Pasien menolak di tengah tindakan** (Bar Sakit penuh): tindakan berhenti, kursi kosong. Stok bahan yang sudah terpakai tidak kembali.
- **Stok bahan habis di tengah hari**: hanya konsultasi dan resep yang bisa dimainkan (GDD §4). Tombol tindakan lain dimatikan dengan keterangan "stok habis".
- **Energi pemain kurang dari kebutuhan tindakan**: tindakan tetap boleh dimulai, tetapi semua zona −10% **[usulan]**. Tidak ada larangan, sesuai pilar santai.
- **Dua pengurang sakit dari sumber yang sama** (misalnya dua Cengkeh): hanya satu yang berlaku.
- **Riwayat medis yang tidak dimiliki pasien**: menanyakannya tetap memakan waktu anamnesis seperti biasa, tanpa efek lain.
- **Kunyit di kasus bukan darurat**: tidak berefek dan herbanya tidak terpakai (tetap di baki).

## 6. Ketergantungan
- GDD utama §2, §3, §4, §4.1, §5, §6, §7 (aturan sumber). §6 perlu menautkan ke folder ini.
- `design/narrative/npc/03-pasien.md`: reaksi pasien spesial saat Bar Sakit penuh dan akibat langkah yang terlewat.
- `design/narrative/npc/06-jadwal.md`: rawat inap Puskesmas setelah bedah minor atau abses.
- File 01–10 di folder ini.

## 7. Tuning Knobs (nilai awal, ACC 2026-11-11)
| Knob | Usulan | Rentang aman | Memengaruhi |
|---|---|---|---|
| `T_tier` | 1.0 / 1.2 / 1.4 | 1.0–1.6 | Seberapa terasa upgrade alat |
| `B_bius` | 0 / 0.3 / 0.7 / 0.85 | 0–0.95 | Pentingnya memilih bius |
| Zona min/maks | 8% / 60% | 5–15% / 50–70% | Batas tersulit dan termudah |
| Ambang wajah sakit | 70 | 60–85 | Peringatan dini |
| Peluang keluhan kontrol (Cukup) | +15% | 5–30% | Hukuman kesalahan kecil |
| Bayaran saat berhenti di tengah | proporsional langkah | 0–100% | Hukuman Bar Sakit penuh |
| Zona saat energi kurang | −10% | 0–20% | Dorongan untuk istirahat |
| Peluang Sukses Dokter Rekan | 50% + 10% × Skill Lv | 40–100% | Nilai pelatihan rekan |

## 8. Kriteria lulus
- [ ] Keenam input bisa dimainkan dengan mouse saja.
- [ ] Dengan stres 60, lebar zona yang tampil 90% dari zona pada stres 40 (yang lain sama).
- [ ] Perawat + Cengkeh pada pasien dewasa: kenaikan Bar Sakit = 0.56 × tanpa keduanya.
- [ ] Bar Sakit mencapai 100 → tindakan berhenti, hasil Gagal, stres pemain +10.
- [ ] Pasien hamil trimester 1 + rontgen → pasien pulang, trust −6.
- [ ] Pasien pengencer darah, anamnesis obat dilewati, cabut → pasien kembali malam hari, hasil Gagal.
- [ ] Tensi 165/100 terukur → tombol tindakan invasif terkunci, tersisa resep dan jadwal ulang.

## Sumber riset
Lihat juga daftar per tindakan di file 01–10.
- SDCEP, pasien dengan warfarin: https://companion.sdcep.org.uk/management-of-dental-patients-taking-anticoagulants-or-antiplatelet-drugs/treatment-recommendations/warfarin-or-another-vitamin-k-antagonist
- BDJ 2007, warfarin dan bedah gigi: https://www.nature.com/articles/bdj.2007.915.pdf
- Yarows, JADA 2020, tekanan darah di praktik gigi: https://ihacares.com/assets/pdfs/Yarows_JADA2020.pdf
- Dentalcare CE, hipertensi: https://www.dentalcare.com/en-us/ce-courses/ce567/hypertension
- Dimensions of Dental Hygiene, pasien penyakit jantung: https://dimensionsofdentalhygiene.com/article/dental-care-for-patients-with-heart-disease/
- AGD, pasien hamil dan menyusui: https://www.agd.org/constituent/news/2020/01/20/caring-for-two-how-to-treat-pregnant-and-breastfeeding-patients
- Australian Prescriber, analgesik pada kehamilan: https://www.nps.org.au/australian-prescriber/articles/analgesics-and-pain-relief-in-pregnancy-and-breastfeeding
- Review diabetes dan pencabutan (PMC): https://pmc.ncbi.nlm.nih.gov/articles/PMC6950840
- Dimensions of Dental Hygiene, instrumen ultrasonik: https://dimensionsofdentalhygiene.com/article/power-instrumentation-considerations/
