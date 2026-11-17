# Buku NPC · 07c · Dialog Harian Staf, Pasien, Luar Kota

> Status: **ACC 2026-11-11** · revisi gaya lisan **ACC 2026-11-15** (lihat "Panduan gaya" di [00-daftar-isi.md](00-daftar-isi.md)).
> Aturan pemilihan baris sama dengan [07a-dialog-warga.md](07a-dialog-warga.md#cara-kerja-untuk-kode-fase-3a). Jumlah barisnya lebih sedikit dari warga, karena NPC ini lebih jarang ditemui di luar klinik.

## Kondisi tambahan
- `staf` = sudah direkrut · `!staf` = belum direkrut.
- `@Klinik buka` = jam klinik buka · `@Klinik tutup` = 30 menit setelah tutup.
- `ruang tunggu` = pasien sedang mengantre · `jenguk` = dijenguk malam di Losmen Singgah atau Puskesmas (rawat inap) · `kontrol` = datang untuk kontrol ulang.
- `Bab4`, `Epilog` = bab cerita GDD §14 · `setelah #32 baik` / `setelah #32 hanya larang` = cara challenge #32 diselesaikan (lihat [04-luar-kota.md](04-luar-kota.md#pak-joni--joni)).
- `gaji-telat` = gaji hari ini tidak terbayar (baris sambil pamit libur; versi pendeknya sudah ada di [05-staf.md](05-staf.md)).
- Untuk dialog saat Pelatihan, lihat 05-staf. Dialog di bawah ini untuk obrolan biasa.

---

## Staf

### Putri
| Kondisi | Dialog |
|---|---|
| !staf @Warung | "Lagi bantuin Tante Ratna, Dok. Kalau klinik butuh resepsionis, kabarin, ya! Nama orang sekampung saya hafal, lho." |
| staf @Klinik buka | "Siap, Dok! Antrean hari ini lima. Pak Yusuf udah duduk dari jam tujuh. Katanya biar dapet kursi deket kipas." |
| staf @Klinik buka | "Bu Lastri bawa klepon lagi. Udah saya bagi rata di meja belakang. Saya ambil dua. Upah ngebagi, hehe." |
| staf T40 | "Dok, Tante Ratna nanya kenapa klinik tutup jam empat. Saya bilang dokter juga manusia. Langsung diem. Berhasil!" |
| staf T60 @Klinik tutup | "Kuliah online saya minggu ini soal manajemen antrean. Dosennya pasti belum pernah lihat antrean Kamis di sini." |
| staf stres>60 | "Dok, sisa antrean saya geser ke besok, ya. Saya bilang ke pasien Dokter lagi rapat. Rapat sama kasur." |
| staf cuaca:hujan | "Hujan, ruang tunggu bau payung basah. Jendelanya saya buka dikit, ya, Dok. Jangan protes." |

### Yoga
| Kondisi | Dialog |
|---|---|
| !staf @Kantor Akuntan | "Sekarang bantu-bantu Mas Adji. Spreadsheet-nya berantakan, tapi orangnya lucu. Jadi seimbang, lah." |
| staf @Klinik buka | "Sudah saya catat. Tiga kontrol, dua pasien baru, satu rujukan Puskesmas. Kursi tunggu cukup. Aman." |
| staf @Klinik buka | "Tagihan Pak Gunawan sudah saya cetak dua lembar. Satu buat dia, satu lagi buat dia tempel di bukunya." |
| staf T40 | "Jadwal kontrol saya taruh di hari Rabu, Dok. Antreannya jadi rata. Grafiknya cakep. Mau lihat? Lihat, dong." |
| staf T60 | "Kemarin ada pasien marah. Biasanya saya hitung sampai sepuluh dalam hati. Kali ini saya dengerin. Ternyata dia lapar." |
| staf stres>60 | "Jam sebelas sampai satu saya kosongkan. Di sistem saya tulis 'sterilisasi'. Sterilisasi Dokter, maksudnya." |

### Rina
| Kondisi | Dialog |
|---|---|
| !staf @Puskesmas | "Sementara saya bantu di Puskesmas. Bu Wulan galak, tapi galaknya bener. Kayak saya." |
| staf @Klinik buka | "Suction, bur, kapas, lampu. Siap. Dokter tinggal duduk. Nggak usah buru-buru, pasiennya nggak bakal kabur." |
| staf @Klinik buka | "Fajar, sarung tangan itu dibuka dari pergelangan, bukan dari jari. Ulang. Maaf, Dok, saya ngajar sebentar." |
| staf T40 | "Di Metrapura saya kerja sampai jam sepuluh malam. Di sini jam empat udah pulang. Badan saya masih bingung." |
| staf T60 @Klinik tutup | "Dok, sekarang kalau capek Dokter bilang. Dulu nggak pernah. Itu kemajuan. Saya catat, ya." |
| staf stres>60 | "Cukup. Pasien berikutnya saya tunda sejam. Dokter makan. Saya nggak nanya, saya ngasih tahu." |

### Fajar
| Kondisi | Dialog |
|---|---|
| !staf | "Bapak nyuruh saya ngelamar ke klinik. Saya mau, Dok. Tapi kalau nggak diterima nggak apa-apa. Beneran nggak apa-apa." |
| staf @Klinik buka | "Alat sudah steril. Sudah saya cek. Saya cek lagi. Oke. Sudah. …Saya cek sekali lagi, ya, Dok." |
| staf @Klinik buka | "Pasien anak tadi nangis, Dok. Saya taruh lidah buaya di baki. Bener, kan? Bener. Oke. Bener, kan?" |
| staf T40 | "Bapak kemarin minum obatnya sendiri, nggak disuruh. Saya sampai kaget. Dokter ngomong apa sama Bapak?" |
| staf T60 | "Kata dr. Galih, ngecek tiga kali itu bukan penyakit. Asal jangan empat. Saya lagi latihan tiga kali." |
| staf stres>60 | "Dok, Dokter kelihatan… capek. Eh, maaf. Mau saya bikinin teh? Airnya udah saya cek. Air biasa, kok." |

### Dewi
| Kondisi | Dialog |
|---|---|
| !staf @Puskesmas | "Saya bantu Bu Wulan dulu. Kalau klinik butuh perawat, saya siap. Sterilisasi saya rapi, Dok." |
| staf @Klinik buka | "Autoklaf sudah jalan, dua puluh menit. Saya tunggu di sini. Saya nggak tenang ninggal autoklaf sendirian." |
| staf @Klinik buka | "Pasien tadi bilang dulu ditambal di pasar. Saya… ya. Sudah saya catat di rekam medis, Dok." |
| staf T40 | "Bapak saya keliling. Di pasar. …Dokter mungkin pernah dengar. Saya belum mau bahas sekarang, boleh?" |
| staf T60 | "Kemarin saya lihat Bapak di alun-alun. Saya hampir nyapa. Belum jadi. Mungkin minggu depan." |
| staf stres>60 | "Duduk dulu, Dok. Nampannya biar saya yang rapikan. Dokter tarik napas aja dulu." |

### Pak Udin
| Kondisi | Dialog |
|---|---|
| !staf @Kos Melati | "Monggo, Dok. Kos saya sepi, kamar masih ada. Kalau Dokter punya staf dari jauh, suruh ke sini, nggih." |
| staf @Klinik buka | "Lantainya masih basah. Lewat pinggir, Dok. Jejak sepatu Dokter saya sudah hafal, gampang dipel." |
| staf @Klinik tutup | *(Pak Udin bersenandung keroncong sambil menyapu.)* "Lagu kesukaan Bu Melati. Jangan bilang saya fals, nggih." |
| staf T40 | "Dulu di SD saya ngejar anak yang nyoret tembok. Sekarang saya ngejar debu. Debu lebih nurut, Dok." |
| staf T60 @Kos Melati malam | "Mbak Rina, Bu Hana, Mas Bima, Mas Yoga. Kos saya ramai lagi. Bu Melati pasti senang, nggih." |
| staf stres>60 | "Dok, saya sudah tua. Saya hafal muka orang yang kebanyakan kerja. Monggo pulang. Lantainya biar saya." |

### Bu Siti
| Kondisi | Dialog |
|---|---|
| !staf @Angkringan | "Lagi bantuin Mas Slamet cuci piring, Dok. Kalau klinik butuh tukang bersih-bersih, saya yang paling cepet!" |
| staf @Klinik buka | "Beres, Dok! Kaca udah kinclong. Tadi Pak Yusuf sampai ngaca sambil benerin peci. Hehe, jadi ganteng dia." |
| staf @Klinik buka | "Siapa yang naruh gelas kopi di atas autoklaf?! Mas Bima, ya? Pasti Mas Bima. Hayo ngaku!" |
| staf T40 | "Kartu pasien ketinggalan lagi di kursi. Udah saya kasih Putri. Orang sini hobinya lupa barang. Untung ada saya." |
| staf T60 | "Anak sulung saya mau masuk SMA, Dok. Saya nabung dari gaji sini. Makasih, ya, Dok. Beneran." |
| staf stres>60 | "Dokter pulang! Kliniknya saya kunci. Jangan balik lagi. Ini perintah petugas kebersihan. Beres!" |

### drg. Hana
| Kondisi | Dialog |
|---|---|
| !staf @Perpustakaan | "Saya baca-baca dulu sambil nunggu. Di pulau dulu perpustakaannya cuma satu rak. Ini sih surga." |
| staf @Klinik buka | "Kursi dua siap! Scaling tiga, tambal dua. Saya seneng, lho. Karang lepas itu rasanya kayak ngelap kaca berembun." |
| staf @Klinik buka | "Pasien tadi nanya saya asli mana. Saya bilang Tanjung Arum. Katanya 'Pantes, logatnya kayak ikan.' Maksudnya apa, coba?" |
| staf T40 | "Mbah Darmi cerita soal banjir dulu. Saya cerita soal kapal yang nggak dateng. Terus kami diem lama. Diemnya enak." |
| staf T60 | "Saya pasang peta pulau di dinding ruang periksa dua. Kalau pasien takut, saya ceritain pulaunya. Ampuh, lho." |
| staf stres>60 | "Pasien Dokter yang ringan saya ambil, ya. Saya suka scaling, kok. Dokter istirahat. Nggak usah sungkan." |

### drg. Bima
| Kondisi | Dialog |
|---|---|
| !staf @Kedai Kopi | "Kopi di sini lumayan. Untuk ukuran kota kecil. …Oke, enak. Jangan bilang Nadia saya bilang enak." |
| staf T0 @Klinik buka | "Pasien hari ini dua belas? Di Metrapura saya dua puluh. Tapi oke. Kita lihat siapa yang lebih rapi." |
| staf T40 @Klinik buka | "Pasien tadi cerita soal cucunya lima belas menit. Dulu pasti saya potong. Sekarang saya dengerin. Aneh, ya." |
| staf T40 | "Coach Doni ngalahin saya voli lima belas kosong. Ego saya hancur lebur. Terus saya ketawa. Udah lama nggak gitu." |
| staf T60 @Klinik tutup | "Minggu ini saya nggak ngitung jumlah pasien. Tadinya iseng doang. Ternyata lega juga." |
| staf stres>60 | "Kamu dulu juga kayak gini di klinik Surya. Terus tumbang. Saya lihat sendiri. Kali ini saya yang ambil alih." |

---

## Pasien spesial
Pasien tamu ditemui di ruang tunggu, saat dijenguk malam, di pasar Kamis, atau di tempat yang disebut di [06-jadwal.md](06-jadwal.md).

### Pak Hasan
| Kondisi | Dialog |
|---|---|
| ruang tunggu | "Masih lama, Dok? Sapi saya nunggu di pasar. Sapi nggak bisa disuruh antre. Saya juga nggak bisa! Cepet, ya." |
| jenguk @Losmen | "Kasurnya keras. Kayak kasur saya. Enak. Besok jam delapan, ya. Jangan telat. Eh, saya yang nggak boleh telat." |
| T40 @Alun-alun pagi | "Tensi saya seratus empat puluh, Dok! Turun! Istri saya sampai bikin syukuran kecil. Nasi kuning, lho!" |
| kontrol | "Obatnya saya minum. Tiap hari. Fajar yang ngingetin. Anak itu kayak alarm, Dok. Nggak bisa dimatiin." |

### Bu Yati
| Kondisi | Dialog |
|---|---|
| ruang tunggu | "Bu Bidan bilang boleh ke sini, Dok. Beneran nggak apa-apa ke bayinya, kan? Maaf, saya nanya lagi." |
| jenguk @Losmen | "Mas Joko jemput besok pagi. Saya nggak bisa tidur. Bukan karena gigi. Deg-degan aja, Dok." |
| T40 | "Kemarin bayinya nendang pertama kali. Saya nangis. Mas Joko juga. Mertua belum tahu. Sebentar lagi, ya." |
| kontrol | "Gigi saya udah nggak ngilu. Saya bisa makan lagi. Bayinya juga ikut makan, katanya. Lewat saya." |

### Mbak Dina
| Kondisi | Dialog |
|---|---|
| ruang tunggu | "Boleh aku rekam ruang tunggunya? Buat konten. Vibes klinik kampungnya literally cute banget." |
| T40 | "Video senyum asliku udah ditonton sepuluh ribu orang. Komennya baik semua. Satu julid. Udah aku hapus." |
| T40 @Toko Roti | "Lagi bantu Tari motret roti. Tari kaku banget di depan kamera. Kayak roti tawar. Literally." |
| kontrol | "Karangnya nggak balik lagi. Sekarang aku sikat gigi pakai timer. Dua menit. Ternyata aesthetic juga." |

### Pak Yusuf
| Kondisi | Dialog |
|---|---|
| ruang tunggu | "Alhamdulillah, dapat kursi dekat kipas. Silakan yang lain duluan, Nak. Saya bisa menunggu." |
| jenguk @Losmen | "Fikri titip kertas obat. Ini. Tulisannya rapi, ya? Dia mau jadi apoteker, Nak. Seperti Tika." |
| T40 @Alun-alun pagi | "Nenek Sumi sudah mau ke klinik? Alhamdulillah. Saya bujuk dia tiga bulan. Saya juga sabar, Nak." |
| kontrol | "Darahnya cepat berhenti, Nak. Alhamdulillah. Saya ceritakan ke jamaah. Mereka mau datang semua." |

### Kiki
| Kondisi | Dialog |
|---|---|
| ruang tunggu | "…" *(Kiki menatap kursi dental tanpa berkedip.)* |
| T20 @SD | "Dimas bilang Dokter nggak nyuntik. Bener?" |
| T40 | "Gigiku di kotak. Kenang-kenangan hiu. Mau lihat? Jangan dipegang." |
| kontrol | "Gigi baruku tumbuh lurus. Nggak dobel lagi. Aku masih hiu. Hiu yang rapi." |

### Mas Rudi
| Kondisi | Dialog |
|---|---|
| ruang tunggu | "Santai, Dok. Cuma bengkak dikit. …Eh, ini antreannya masih berapa? Kok lama, ya. Aduh." |
| jenguk @Puskesmas | "Bu Bidan galak. Saya disuruh tidur terus. Pak Arya nelepon nanyain saya. Ternyata bos saya baik, Dok." |
| T40 | "Anak saya udah bisa senyum, Dok. Giginya belum ada. Nanti kalau udah tumbuh, ke sini. Bukan ke pasar." |
| kontrol | "Pipi saya udah kempes. Kata istri saya ganteng lagi. 'Lagi' itu artinya dulu pernah, kan, Dok?" |

### Bu Lastri
| Kondisi | Dialog |
|---|---|
| ruang tunggu | "Ini klepon buat Mbak resepsionis. Eh, buat Dokter juga. Ambil, ambil. Yang ijo lebih enak, lho." |
| T40 @Alun-alun pagi | "Kamis, Dok! Kue saya laris. Yang rendah gula juga laku. Saya nggak nyangka. Kak Tari juga nggak." |
| T40 | "Gula darah saya sekarang 'lumayan' beneran, Dok. Bukan lumayan yang dulu. dr. Galih sampai senyum." |
| kontrol | "Gusi saya nggak berdarah lagi. Saya bisa makan nagasari sendiri. Satu. Satu aja, Dok. Sumpah." |

### Pak Marno
| Kondisi | Dialog |
|---|---|
| ruang tunggu | "Saya bawa warga saya tiga orang lagi, Dok. Program desa. Saya? Oh, saya cuma mengantar. Cuma mengantar." |
| T40 | "Pilkades tinggal enam bulan. Laras sudah motret saya. Senyum saya sekarang layak baliho. Berkat Dokter." |
| T40 @Balai Kota | "Habis rapat sama Pak Harjo. Argumennya selalu menang. Tapi warga saya lebih banyak. Jadi ya… seri." |
| kontrol | "Jarumnya kecil, kan, Dok? Kecil. Oke. Saya kepala desa. Saya berani. Kecil, kan?" |

### Tika
| Kondisi | Dialog |
|---|---|
| ruang tunggu | "Saya izin ke Kak Nadia sebentar. Jam empat harus balik ke kedai. Masih keburu, kan, Dok?" |
| T20 @Kedai Kopi | "Pesan apa, Dok? Kopi susu? Hari ini saya yang bikin. Kak Nadia lagi ke kebun. Rahasia, katanya." |
| T40 @Perpustakaan | "Lagi belajar kimia. Susah. Mbak Sekar kasih saya meja dekat jendela. Katanya biar otaknya kena angin." |
| kontrol | "Gigi saya masih ada, Dok. Saya bisa senyum di foto ujian. Bapak bangga. Saya juga." |

### Pak Gunawan
| Kondisi | Dialog |
|---|---|
| ruang tunggu | "Saya catat jam saya datang. Delapan lewat dua. Nanti saya catat juga jam saya dipanggil. Biar adil." |
| T40 | "Halaman Dokter di buku saya sudah saya sobek. Halaman dokter lain masih ada. Dokter yang pertama." |
| T40 @Alun-alun pagi | "Mas Arya beli semen di toko saya. Saya kasih diskon. Dia nggak minta. Saya sendiri juga kaget." |
| kontrol | "Tambalan ini masih bagus. Tiap pagi saya cek pakai lidah. Nggak goyang. Sudah saya catat." |

### Nenek Sumi
| Kondisi | Dialog |
|---|---|
| ruang tunggu | "Ojo, Nak, ojo cepet-cepet. Nenek duduk dulu. Nenek lihat kursinya dulu. Kursinya galak, ndak?" |
| jenguk @Puskesmas | "Darmi tadi ke sini. Bawa jamu. Pahit. Katanya buat Nenek. Padahal buat dia sendiri, biar dia tenang." |
| T40 @Alun-alun pagi | "Mata Nenek masih terang, Nak! Masih bisa lihat cicit. Cabut gigi ndak bikin buta. Wis Nenek ceritain semua orang." |
| kontrol | "Pardi nikah bulan depan. Nenek bisa makan sate. Sedikit. Yang empuk. Pakai gigi yang tersisa." |

### Andre
| Kondisi | Dialog |
|---|---|
| ruang tunggu | "Siap, Coach! Eh, Dok! Maaf, maaf. Tadi habis latihan. Masih keringetan." |
| T20 @Lapangan Voli | "Dok! Lihat smash saya! …Tadi merem. Yang tadi nggak dihitung. Ulang!" |
| T40 @Lapangan Voli | "Sekarang pakai pelindung mulut. Coach maksa semua pakai. Rasanya kayak ngemut sandal. Tapi aman." |
| kontrol | "Gigi depan saya udah nggak nyetrum. Saya bisa minum es lagi. Jangan bilang Coach saya minum es, ya." |

---

## Tokoh luar kota

### Koh Hendra
| Kondisi | Dialog |
|---|---|
| T0! @Bahari Medika | "Selamat datang di Bahari Medika! Cari apa, Dok? Alat apa saja ada. Kalau nggak ada, saya pesankan. Haiya, duduk dulu!" |
| T20 @Bahari Medika | "Ultrasonik ini garansi setahun. Kalau rusak, bawa ke sini. Kalau nggak rusak, bawa kopi Rimbasari ke sini. Harga teman!" |
| T40 @Bahari Medika | "Lina! Ini Dokter yang di Rimbasari, ponakannya Om Darto! Bikinin teh. Yang enak, bukan yang buat sales." |
| T60 | "Om Darto dulu duduk di kursi itu tiap bulan. Kursinya belum saya ganti. Silakan duduk, Dok." |
| cuaca:hujan | "Hujan di pelabuhan, kapal nggak bongkar. Barang telat dua hari. Haiya. Saya kasih diskon telat. Sedikit. Rugi, rugi." |

### Bu Melinda
| Kondisi | Dialog |
|---|---|
| T0! @Metra Dental | "Selamat siang. Metra Dental Supply. Sebelum bahas alat, berapa staf Anda, dan jam berapa mereka pulang?" |
| T20 @Metra Dental | "Panoramik ini bukan mainan, Dok. Pastikan perawat Anda dilatih dulu. Modulnya bisa saya kirim." |
| T40 | "Saya dengar Anda kirim staf ikut pelatihan. Good. Itu jarang di kota kecil. Di kota besar juga jarang." |
| T60 @Metra Dental | "Kopi dari Rimbasari? Hm. Saya taruh di pantry staf. Orang-orang saya juga berhak minum yang enak." |
| stres>60 | "Anda mirip perawat saya dulu waktu jaga tiga shift. Duduk. Saya ambilkan air." |

### drg. Surya
| Kondisi | Dialog |
|---|---|
| Bab4 @Losmen malam | "Losmennya bersih. Mengejutkan. Kota ini… tenang sekali, ya. Saya justru tidak bisa tidur kalau terlalu tenang." |
| Bab4 @Alun-alun | "Tidak ada papan peringkat. Tidak ada target. Lalu bagaimana kita tahu kamu sedang berhasil, {nama}?" |
| Bab4 @Bukit Bintang | "Saya lupa kapan terakhir lihat bintang. Di Metrapura langitnya oranye. Saya kira itu normal." |
| Epilog | "Suratmu sudah saya terima. Saya baca dua kali. Saya juga ambil cuti seminggu. Yang pertama dalam dua puluh tahun." |

### Pak Joni
| Kondisi | Dialog |
|---|---|
| T0! @Alun-alun pasar | "Murah, Bu, murah! Tambal tiga puluh ribu! Gigi palsu bisa nyicil! Lho, Dokter? Oh. Lewat aja, Dok, lewat." |
| T20 @Alun-alun pasar | "Dokter mau apa? Saya cuma jualan. Orang butuh, saya ada. Dokter ke mana sepuluh tahun lalu?" |
| setelah #32 baik | "Saya sudah nggak nambal, Dok. Cuma gigi palsu. Kertasnya resmi. Dewi yang urus. Anak saya." |
| setelah #32 baik @Klinik | "Ini gigi palsu Pak Wiryo yang baru. Pas, katanya. Nggak sariawan lagi. Saya… seneng dengernya." |
| setelah #32 hanya larang | "…Saya pindah ke pasar lain, Dok. Nggak usah khawatir. Sekarang saya cuma bikin gigi palsu. Sendirian." |
