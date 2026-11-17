# Rangkuman Desain · Senyum Rimbasari

> Dibuat 2026-11-11 untuk ACC sebelum Fase 1 (kode).
> Isinya ringkasan dari dokumen sumber. Kalau ada yang berbeda, dokumen sumber yang benar:
> - GDD: [design/gdd/senyum-rimbasari.md](gdd/senyum-rimbasari.md)
> - Minigame: [design/gdd/minigame/](gdd/minigame/00-aturan-umum.md)
> - Buku NPC: [design/narrative/npc/00-daftar-isi.md](narrative/npc/00-daftar-isi.md)
> - Visual: [design/v3/index.html](v3/index.html)

---

## 1. Status ACC

| Bagian | Status |
|---|---|
| GDD inti (§1–§17) | ACC |
| Efek rumah, bonus menikah, aturan E5 gagal, Losmen, rawat inap Puskesmas, dialog campuran + AI opsional | ACC 2026-11-11 |
| Buku NPC (01–07: kartu, jadwal, dialog harian) | ACC 2026-11-11 |
| Visual v3 (karakter, eksterior, interior 3/4, peta 4 zona, ukuran ruangan per level) | ACC ("so far visual sudah ok") |
| Visual minigame v2 (`design/v3/minigame.html`, 11 layar) | ACC 2026-11-11 |
| Minigame tindakan (11 file `design/gdd/minigame/`) + 5 keputusan sementara | ACC 2026-11-11 (angka usulan = nilai awal) |
| Rangkuman ini | ACC 2026-11-11 |

---

## 2. Gamenya

**Life-sim + manajemen klinik gigi**, pixel art 2D top-down, satu file `index.html` (Canvas + JS, tanpa aset luar). Bahasa Indonesia, desktop (keyboard + mouse).

**Premis.** Seorang dokter gigi (nama dan gender dipilih pemain) burnout di klinik besar Metrapura milik drg. Surya. Dia pindah ke **Rimbasari**, kota kopi kecil di lereng bukit yang 20 tahun tidak punya tenaga gigi. Dia mewarisi ruko tua dari Om Darto dan membangun klinik dari nol.

**Empat pilar**
1. Terasa seperti dokter: anamnesis → periksa → rontgen → diagnosis → persetujuan → tindakan → resep.
2. Kepercayaan dibangun pelan: Trust per warga dan reputasi klinik.
3. Santai, tanpa game over. Kegagalan hanya menunda.
4. Pulih dari burnout lewat Stres, nongkrong, dan relasi.

Di luar cakupan: ortodonti, behel, whitening, memancing.

---

## 3. Sistem inti

**Waktu.** 1 detik nyata = 2 menit game. Hari 06:00–24:00 (sekitar 9 menit di 1x). Speed 0.5x–4x + Pause. Lewat jam 24 = pingsan (uang −10%, energi besok 50%). Setahun 120 hari: **Kemarau 60 + Hujan 60**. Klinik buka 08–16, libur Minggu.

**Stat pemain.** Energi 100 · Stres 0–100 (>50 zona minigame −10%, >80 Burnout) · Uang (modal Rp 15jt, tidak bisa minus, warung memberi utang kecil).

**Klinik, 5 tahap**

| Tahap | Syarat | Yang terbuka |
|---|---|---|
| 0 Ruko Tua | awal | quest bersih-bersih |
| 1 Praktik | Rp 10jt | 1 kursi, antrian 3, alat T1 |
| 2 Klinik Gigi | 60jt + ★2 | ruang tunggu, rontgen periapikal, resepsionis & perawat |
| 3 Klinik Lengkap | 180jt + ★3 + alat T2 | kursi 2 + dokter rekan, sterilisasi, PSA |
| 4 Pusat Kesehatan Gigi | 450jt + ★5 + panoramik | 2 lantai, Endo & Bedah Minor, syarat credit roll |

**Manajemen.** Stok bahan (paket 750rb di Bahari Medika, Tanjung Arum, naik bus sejak hari 1, atau pesan antar lewat Kantor Pos; GDD §11.1), kebersihan, reputasi ★1–5, pajak 10% per 30 hari. Tarif diatur pemain. Rasio terhadap harga wajar menentukan jumlah pasien (×0.35 sampai ×1.8) dan efek lain. Tier alat T1/T2/T3 mengalikan harga wajar ×1.0/×1.6/×2.5 dan membuat minigame lebih mudah.

**Staf** (tahap 2–3): resepsionis, perawat, petugas kebersihan, dokter rekan. Ada pelatihan Skill Lv1–5 dan Energi Lv1–3.

**Rumah, 4 level**

| Level | Biaya | Efek | Interior |
|---|---|---|---|
| Kamar Sewa | gratis | energi pulih 100%, 4 pot | 240×168 |
| Kontrakan | 2jt/30 hari | pulih 110%, 8 petak | 288×184 |
| Rumah Subsidi | 50jt | energi maks +20%, 12 petak, makan malam, syarat lamaran | 352×208, kasur queen |
| Rumah Estetik | 150jt | energi maks +30%, 16 petak, stres −10 tiap bangun | 416×232, kasur king |

**Kebun herba**: Mint, Sirih, Lidah Buaya, Kunyit, Cengkeh, Serai Jahe. Dipakai dari baki sebelum tindakan. Musim kemarau wajib disiram.

**Trust warga** 0–100 (Asing · Kenal 20 · Akrab 40 · Percaya 60 · Sahabat 80). Trust ≥20 berarti mau jadi pasien. **Hubungan romance** terpisah dengan 5 event (20/35/50/70/85). E5 = pacaran. Lamaran butuh Hubungan 95 + Rumah Subsidi + cincin 12jt. Menikah tidak wajib.

**Nongkrong**: Kedai Kopi, Angkringan, Voli, Bukit Bintang, Perpustakaan, Karaoke Malam Minggu, Toko Roti. Masing-masing menurunkan stres atau menambah energi.

**Event musiman (8)**: Pembukaan Klinik, Pameran Gigi Sehat K15, Panen Kopi K35, Pesta Rakyat K55, Tanam Pohon Bersama H10, Bakti Sosial H25, Malam Lampion H45, Syukuran H60.

**Narasi, 4 bab** mengikuti tahap klinik: Orang Asing → Mulai Dikenal → Diuji (Pak Joni, klaim) → Bagian dari Kota (tawaran drg. Surya) → Epilog.

**Akhir game.** Credit roll = klinik tahap 4 + 39/39 side challenge. Setelah itu free play.

---

## 4. Tindakan gigi & minigame (ACC 2026-11-11)

Semua tindakan berupa 3–5 langkah, 3–6 detik per langkah. Waktu game berhenti selama tindakan. Pemain menghadapi zona gagal, **Bar Sakit**, dan risiko riwayat medis yang terlewat waktu anamnesis.

| # | Tindakan | Inti minigame | Terbuka |
|---|---|---|---|
| 01 | Konsultasi | pilih penjelasan & rencana, menggeser peluang pasien setuju | tahap 1 |
| 02 | Resep | susun resep dari rak obat, dosis berupa kartu aturan pakai | tahap 1 |
| 03 | Tambalan sementara | 4 langkah pendek, untuk PSA K1, darurat, atau pasien hamil T1 | tahap 1 |
| 04 | Tambal GIC | bor karies tanpa kena zona pulpa | tahap 1 (T1) |
| 05 | Tambal komposit | lebih banyak langkah, sensitif ludah | alat T2 |
| 06 | PSA | 2 kunjungan, langkah diulang per saluran (1/2/3–4) | tahap 3 |
| 07 | Scaling | 4 panel rahang, paling santai | tahap 1 |
| 08 | Cabut gigi susu | menjaga anak tetap tenang, Lidah Buaya membantu | tahap 1 |
| 09 | Cabut tetap & penyulit | goyang berirama; penyulit = langkah tambahan (T2) | tahap 1 / 2 |
| 10 | Bedah minor | flap, buang tulang, jahit; pasien menginap di Puskesmas | tahap 4 |

**Input**: 6 jenis input dipakai di semua tindakan, yaitu TEPAT, GOSOK, TAHAN, URUT, RITME, dan PILIH. Hasil tindakan ada tiga: Sukses, Cukup, atau Gagal.

**Detail per file:**
- Konsultasi punya kartu jebakan (whitening/behel).
- Tambalan sementara memilih ZOE atau non-eugenol.
- Komposit untuk gigi depan memakai pilihan warna gigi.
- PSA bisa mengalami file patah.
- Scaling ultrasonik dilarang untuk pasien pacemaker.
- Cabut gigi susu: Bar Sakit anak ×1.3.
- Cabut penyulit memakai separasi akar, dengan risiko sinus dan dry socket.
- Bedah minor punya zona saraf.

Nama pasien sudah dicocokkan dengan buku NPC. Ranjang rawat inap Puskesmas sudah digambar.

**Keputusan sementara dari sesi minigame yang perlu kamu review:**
1. Perforasi sebelum PSA terbuka → tambalan sementara + resep, hasilnya Gagal, lalu dicabut atau menunggu PSA terbuka.
2. Bayaran PSA dibagi 50% di kunjungan 1 dan 50% di kunjungan 2.
3. Sisa akar yang terjangkau tanpa flap dimainkan sebagai cabut penyulit, tapi ditagih harga GDD 1,5jt.
4. Bedah minor pada pasien hamil ditunda sampai setelah melahirkan.
5. Semua angka baru bertanda [usulan] di Tuning Knobs, misalnya:
   - pengali tier untuk zona ×1.0 / 1.2 / 1.4
   - kekuatan bius 0 / 0.3 / 0.7 / 0.85
   - energi per tindakan

---

## 5. Dunia

**Rimbasari** hidup dari kopi dan jalannya menurun ke Desa Wetan, Kampung Kali, dan Dusun Atas. Anak mudanya banyak merantau ke **Metrapura** (kota besar, setengah hari naik bus). **Tanjung Arum** adalah kota pelabuhan terdekat. Selama lebih dari 20 tahun warga menahan sakit gigi, minum jamu Mbah Darmi, pergi ke Tanjung Arum, atau mendatangi Pak Joni.

**Peta: 4 zona**, masing-masing 768×432 dan bisa digulir. Kampung Asri 960×432.

| Zona | Isi |
|---|---|
| Alun-alun (pusat) | Klinik, Balai Kota, Warung Bu Ratna, Kedai Kopi Seduh, Toko Roti Manis, Kantor Pos, Angkringan, air mancur |
| Kampung Asri (barat) | Rumah Dokter + kebun, Rumah Endang, Rumah Wiryo, Rumah Lurah / Bowo / Guru, Pondok Jamu, SD, Kos Melati |
| Jalan Niaga (timur) | Terminal, Losmen Singgah, Pos Polisi, Konsultan Teknik Arya, Kantor Akuntan Adji, Puskesmas, Studio Foto Lensa |
| Lereng Bukit (utara) | Perpustakaan & Kebun Bunga, Kebun Kopi, Lapangan Voli, Bukit Bintang |

**Gaya visual (v3).** Resolusi 480×270 di-scale integer. Karakter chibi 24×32, tile 16. Eksterior memakai atap genteng besar bertingkat dengan gable depan, dinding batu/papan, kayu timber, sudut lembut, plang kecil dengan ikon. Interior digambar 3/4 top-down dengan cahaya matahari, lampu, dan bayangan. Ruangan membesar tiap upgrade. Font piksel buatan sendiri.

---

## 6. Benang cerita utama: Om Darto

Om Darto (almarhum Sudarto) adalah om jauh pemain. Selama 30 tahun dia membuka Toko Kelontong Sumber Rejeki di ruko itu. Dia tidak menikah dan tidak punya anak, tapi setiap tahun mengirim kartu ulang tahun ke pemain. Dia meninggal setahun sebelum game dimulai, dengan gigi palsu buatan Pak Joni yang selalu bikin sariawan dan kebiasaan "nanti saja ke dokter gigi".

Jejaknya tersebar di kota:
- Kakek Wiryo masih menata papan catur untuknya setiap pagi.
- Bu Ratna dulu diberi barang dagangan pertama secara utang olehnya.
- Pak Harjo diam-diam membayar pajak ruko supaya tidak dilelang.
- Laras menyimpan foto terakhirnya. Om Darto sendiri yang minta difoto, "buat keponakan saya".
- Mas Ilham menyimpan suratnya yang tidak sampai.

*Jawaban sebenarnya*: dulu orang tua pemain menolong Om Darto waktu tokonya hampir bangkrut. Dari kartu balasan pemain kecil ("aku mau jadi dokter gigi!") dia tahu cita-cita pemain. Di suratnya dia menulis: "Ruko ini cuma bisa jualan gula. Mungkin di tanganmu, ruko ini bisa ganti jualan senyum."

---

## 7. Karakter

Setiap kartu di buku NPC berisi latar, cara bicara, motivasi, ketakutan, rahasia (dengan jawaban sebenarnya), hubungan, sikap per tingkat Trust, dan kaitan ke game. Di bawah ini versi singkatnya.

### 7.1 Warga (12)

| Nama | Siapa | Luka / rahasia | Jawaban sebenarnya |
|---|---|---|---|
| **Pak Harjo** (63) | Lurah sabar, dua tahun lagi pensiun. Istrinya mengasuh cucu di Metrapura | Takut kota habis ditinggal anak mudanya. Diam-diam membayar pajak ruko | Dia tidak tahu pemain dokter gigi. Waktu tahu, dia menangis lega di depan foto pernikahannya |
| **Bu Ratna** (48) | Pemilik warung, pusat kabar kota | Hampir tidak bisa membaca. Buku utangnya pakai gambar | Surat anaknya dia minta dibacakan Tari. Diam-diam ingin belajar membaca bersama Sekar |
| **Mbah Darmi** (79) | Peracik jamu, dulu dukun bayi | Suaminya meninggal karena abses gigi waktu jalan putus banjir | Di halaman terakhir buku jamunya: "Gigi bengkak: jamu ora cukup. Harus ke dokter." |
| **Dimas** (9) | Anak penggemar robot, murid Bu Sinta | Trauma dicabut paksa Pak Joni. Menyembunyikan sakit gigi | Dia diam karena pernah mendengar ibunya menangis soal uang sewa |
| **Bu Endang** (36) | Penjahit, suaminya kerja di Malaysia | Terlalu bangga untuk dikasihani. Menyalahkan diri soal Dimas. Gerahamnya retak | Kiriman telat karena tangan suaminya cedera. Dia pulang di Syukuran Tahun 2 |
| **Pak Bowo** (58) | Petani kopi, adik Harjo, keras kepala | Foto putrinya, Ningsih, yang kabur 10 tahun lalu setelah dilarang kuliah | Ningsih jadi perawat di Metrapura dan menunggu ayahnya bicara duluan |
| **Bu Sinta** (34) | Guru SD perantau, "cuma dua tahun" jadi delapan | Surat mutasi di laci, ibunya sakit di Tanjung Arum | Dia memilih tinggal dan menjemput ibunya. Pemain orang pertama yang tahu |
| **Pak Slamet** (52) | Mantan sopir bus malam, pemilik angkringan | Serangan jantung ringan, minum pengencer darah | Latihan sebelum kasus Pak Yusuf: lupa tanya obat bisa bikin perdarahan |
| **Kak Tari** (27) | Pastry chef hotel yang pulang merawat ayahnya | Giginya sendiri berlubang. Ada email tawaran kerja kota | Dia tidak akan pergi. Bisa mengembangkan "Roti Senyum" rendah gula |
| **Mas Ilham** (24) | Kurir pos, tulang punggung keluarga | Belum pernah melihat laut. Menyimpan surat Om Darto | Isi surat: lihat bagian 6 |
| **Kakek Wiryo** (77) | Pensiunan guru, mengajar hampir seisi kota | Mulai pelupa. Gigi palsu Joni yang longgar | Halaman pertama buku sakunya: "Kalau keponakan Darto datang, ajak main catur. Dia pasti sendirian." |
| **Coach Doni** (38) | Mantan atlet voli provinsi, lututnya cedera | Merasa bersalah soal gigi depan Andre | Andre tidak menyalahkannya. Doni lalu mewajibkan pelindung mulut |

### 7.2 Romance (8)

Pemain wanita bisa mendekati kandidat pria, pemain pria bisa mendekati kandidat wanita. Kandidat yang tidak tersedia tetap punya arc pertemanan.

| Nama | Siapa | Luka / rahasia | Bonus menikah |
|---|---|---|---|
| **Adji** ♂ (29) | Akuntan dari Tanjung Arum. Lucu, konyol, selalu tanya "udah makan?". Tujuh polo hitam yang sama | Ditolak waktu SMA lewat puisi lucu. Sejak itu kalau suka orang, dia malah melawak. Ibunya menelepon tiap Minggu: "Sudah ngomong belum?" | Pajak 5%, laporan mingguan, stres −10 tiap pagi |
| **Arya** ♂ (31) | Insinyur sipil pendiam, lebih lancar menggambar | Rumahnya hanyut banjir waktu kecil. Keluar dari kontraktor karena menolak uji beton palsu | Upgrade klinik/rumah −25% dan lebih cepat |
| **Ipda Raka** ♂ (29) | Polisi humoris, anak keluarga polisi Metrapura | Menangkap ayah yang mencuri obat untuk anaknya. Diam-diam membayar biaya rumah sakit anak itu dari tabungan sekolah perwiranya, dan masih menyimpan surat terima kasihnya | Kasus Joni lebih cepat; trust tidak turun saat klaim |
| **dr. Galih** ♂ (32) | Dokter Puskesmas, pendiam, selalu cek dua kali | Salah dosis setelah jaga 36 jam, lalu mundur dari spesialis. Menulis puisi di balik kertas resep | Risiko komplikasi pasien riwayat medis −50% |
| **Sekar** ♀ (27) | Penjaga perpustakaan & kebun bunga, pemalu | Menulis cerpen dengan nama samaran "Telang" sejak dibilang tulisannya "terlalu sepi" | Kesabaran pasien +20% |
| **Nadia** ♀ (26) | Barista juara dua Metrapura yang menjual motornya untuk buka kedai | Orang tuanya anggap kedai itu "fase". Tiap pagi belajar dari Pak Bowo | Energi awal hari +20 |
| **Laras** ♀ (25) | Fotografer ceria, studio warisan ayah yang katarak | Tidak pernah mau difoto. Menyimpan foto terakhir Om Darto | Reputasi naik 25% lebih cepat |
| **Wulan** ♀ (30) | Bidan Puskesmas dari Dusun Atas | Mencatat setiap bayi yang dia bantu lahirkan, sampai lupa merawat diri | Sakit anak −25%, +1 rujukan/hari |

Masing-masing punya E1–E5, adegan lamaran (kandidat menelepon keluarganya), dan pernikahan (keluarga datang). Detailnya ada di 02a dan 02b.

### 7.3 Pasien spesial (12)

| Nama | Kasus | Pelajaran / arc |
|---|---|---|
| Pak Hasan | Hipertensi | Ukur tensi dulu. Istrinya minta dr. Galih yang memarahinya |
| Bu Yati | Hamil trimester 1 | Tunda rontgen & tindakan. Anaknya lahir sebagai bayi ke-128 Wulan |
| Mbak Dina | Kreator kecantikan, minta "putih kayak artis" | Video "senyum asli" jadi yang paling banyak ditonton |
| Pak Yusuf | Pengencer darah, lupa nama obat | Tanya obat. Pusingnya ternyata dari tensi |
| Kiki | Gigi susu persistensi, "Kiki Hiu" | Pernah menggigit Pak Joni. Giginya minta disimpan |
| Mas Rudi | Abses setelah tambalan Joni | Arya diam-diam membayar upahnya hari itu |
| Bu Lastri | Diabetes | Bisa membuat kue rendah gula bersama Tari |
| Pak Marno | Kades Desa Wetan, takut jarum | Sumber rujukan. Hormat pada Harjo yang dulu menahannya waktu pingsan |
| Tika | Siswi SMA, pilih PSA atau tabungan kuliah | Lulus apa pun pilihannya |
| Pak Gunawan | Klaim tambalan ngilu | Hasilnya tergantung diagnosis awal pemain |
| Nenek Sumi | 84 tahun, kakak Mbah Darmi | Takut "cabut bikin buta". Darmi mengantarnya kalau Trust 80 |
| Andre | Gigi depan patah karena voli | Takut bola. Doni melatihnya lagi |

### 7.4 Tokoh luar kota (4)

- **Koh Hendra** (Bahari Medika, Tanjung Arum): ramah, pandai menawar. Ayahnya dulu pemasok Om Darto dan berjanji Rimbasari tidak akan kekurangan alat.
- **Bu Melinda** (Metra Dental Supply, Metrapura): mantan perawat yang dulu juga bekerja di bawah drg. Surya. Di Bab 4 dia menelepon pemain: "Baca kontraknya pelan-pelan."
- **drg. Surya**: mantan atasan pemain dan sumber burnout-nya. Karismatik, tapi dia sendiri bruxism berat dan gerahamnya retak.
- **Pak Joni**: tukang gigi keliling yang melukai separuh kota. Kalau pemain memilih "hentikan tapi bantu", dia berhenti menambal dan mencabut, lalu hanya membuat gigi palsu secara resmi.

### 7.5 Kandidat staf (9)

| Nama | Peran | Inti |
|---|---|---|
| Putri | Resepsionis | Melapor ke Bu Ratna tiap sore, tapi hanya yang baik-baik |
| Yoga | Resepsionis | Mantan call center, gugup kalau pasien marah |
| Rina | Perawat | Rekan lama pemain. Dialah yang menelepon ambulans waktu pemain tumbang |
| Fajar | Perawat | Lulusan baru, pernah dipermalukan dosen |
| Dewi | Perawat | Anak Pak Joni. Bisa mengajari ayahnya sterilisasi |
| Pak Udin | Kebersihan | Pemilik Kos Melati, punggungnya sering sakit |
| Bu Siti | Kebersihan | Menyimpan kartu pasien yang tertinggal |
| drg. Hana | Dokter rekan | Sepupu Bu Sinta, trauma "menunggu kapal" di pulau |
| drg. Bima | Dokter rekan | Rival lama pemain yang jadi nomor satu lalu merasa hampa |

**Tempat tinggal**: staf tinggal di Kos Melati (milik Pak Udin). Losmen Singgah dikelola Bu Sri, istri Pak Bowo.

### 7.6 Dialog

Dialog penting (event, rahasia, E1–E5, adegan Trust, lamaran) ditulis tangan. Obrolan harian diambil dari kumpulan dialog tulis tangan berdasarkan kondisi, dan baris yang dipakai 7 hari terakhir tidak diulang. Setiap NPC punya ciri bicara sendiri. Batas 120 karakter per baris. Dialog AI dengan API key pemain adalah opsi di luar MVP.

---

## 8. Rencana Fase 1 (setelah ACC)

Sesuai GDD §17, **Fase 1 = Skeleton** di `index.html` root:
1. Kustomisasi karakter (nama, gender, preset).
2. Gerak pemain + kamera mengikuti di 4 zona, gerbang dan layar transisi.
3. Peta kota memakai gambar v3 (eksterior, terrain, dekorasi). Bisa masuk bangunan, interior klinik masih kosong.
4. Waktu, kalender, musim, speed 0.5x–4x + Pause, pingsan jam 24.
5. HUD: jam, hari/musim, energi, stres, uang.
6. Save/load (localStorage, autosave saat tidur).

Belum termasuk: pasien, minigame, NPC, romance, event.

---

## Yang perlu kamu putuskan

1. **ACC rangkuman ini?** Kalau ada yang salah atau mau diubah, sebutkan bagian mana.
2. **Minigame (11 file)**: ACC sekarang, atau nanti saja sebelum Fase 2? Fase 1 tidak memakai minigame, jadi keduanya aman.
3. **Mulai Fase 1** dengan cakupan di bagian 8?
