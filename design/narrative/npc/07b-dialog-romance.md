# Buku NPC · 07b · Dialog Harian Romance (8)

> Status: **ACC 2026-11-11** · revisi gaya lisan **ACC 2026-11-15** (lihat "Panduan gaya" di [00-daftar-isi.md](00-daftar-isi.md)).
> Aturan pemilihan baris sama dengan [07a-dialog-warga.md](07a-dialog-warga.md#cara-kerja-untuk-kode-fase-3a). Dialog E1–E5, lamaran, dan pernikahan ada di [02a](02a-romance-pria.md) dan [02b](02b-romance-wanita.md) dan tidak diulang di sini.

## Kondisi tambahan khusus romance
- `H20` / `H50` / `H70`: Hubungan ≥ angka itu. Hanya berlaku kalau kandidat **tersedia** untuk gender pemain.
- `pacaran`: setelah E5 berhasil · `nikah`: setelah menikah (baris `@Rumah` = rumah pemain) · `renggang`: status Renggang 7 hari (GDD §9).
- Urutan spesifik: `event` > `renggang` > `nikah` > `pacaran` > `H` > `stres` > `cuaca` > `musim` > `@tempat` > `T`.
- Baris `T` dipakai untuk semua pemain. Untuk pemain yang menjalani **Arc Teman**, hanya baris `T`, musim, cuaca, stres, dan event yang dipakai. Baris `H`, `pacaran`, dan `nikah` dilewati.

---

## Adji
| Kondisi | Dialog |
|---|---|
| T0! @Kantor Akuntan | "Halo! Klien baru? Bukan? Oh, dokter baru! Wah, sama-sama baru. Kopi? Aku punya tiga, bayaran klien. Ambil, ambil." |
| T20 @Toko Roti pagi | "Roti kismis. Tiap hari. Jangan dihakimi, ya. Mau satu? Aku traktir. Anggap aja investasi pertemanan. Bunganya nol." |
| T20 @Kantor Akuntan | "Pajak klinik bulan ini aman, udah aku cek dua kali. Tiga, sih. Empat kalau dihitung yang sambil makan." |
| T40 @Kedai Kopi | "Kopi susu gula aren. Nadia udah nggak nanya, lihat mukaku langsung bikin. Kayak sulap. Sulap yang ada tagihannya." |
| T40 | "Bu Ratna nyodorin foto keponakannya lagi. Ketiga kalinya bulan ini. Aku pura-pura ditelepon. Padahal HP-ku mati. Hahaha." |
| T60 @Angkringan | "Raka menang gaple lagi. Curang dia. Eh, nggak deng. Aku aja yang mikirnya kelamaan. Kebiasaan ngitung. Hahaha." |
| H20 | "Kamu udah makan? Eh, aku nanya bukan karena kebiasaan, lho. Ya, kebiasaan juga sih. Tapi yang ini beda. Dikit. Hehe." |
| H50 | "Tadi aku latihan nyapa kamu di depan kaca. Lima kali. Kacanya sampai bosen. …Eh, selamat pagi. Nah, gitu doang sih." |
| H50 @Kantor Akuntan | "Nita nanya di grup, 'Mas, lagi deket sama siapa?' Aku jawab 'Sama kalkulator.' Mereka nggak percaya. Pinter juga, ya." |
| H70 | "Kalau aku tiba-tiba diem, bukan bosen, ya. Aku lagi nyusun kalimat yang nggak bikin aku kedengeran bego. Belum ketemu." |
| pacaran | "Ibuku nanya kamu suka masakan apa. Aku bilang belum tahu, terus dimarahin. Jadi… kamu suka masakan apa? Ini darurat." |
| pacaran @Kedai Kopi | "Nadia ngelihatin kita dari balik mesin kopi. Senyumnya nyebelin banget. Aku suka, sih. Jangan bilang dia." |
| nikah @Rumah pagi | "Pagi! Laporan: sarapan siap, kopi anget, aku udah ganteng. Poin terakhir masih menunggu hasil audit. Hahaha." |
| nikah | "Ibu telepon. Bukan nyari aku, nyari kamu. Aku diturunin pangkat jadi operator telepon. Gajinya nol, lho." |
| renggang | "Oh. Hai. Aku… nggak apa-apa, kok. Kerjaan lagi numpuk. Nanti aku kabarin, ya." |
| kemarau | "Kemarau gini aku haus terus. Kopi nggak ngebantu, air putih ngebantu. Aku tahu. Aku cuma nggak mau. Hahaha." |
| cuaca:hujan | "Hujan. Struk klien basah semua. Aku jemur pakai jepitan baju. Kantorku sekarang kayak laundry kiloan." |
| stres>60 | "Duduk dulu. Aku bukan dokter, tapi aku bisa ngitung jam kerjamu. Hasilnya defisit. Defisit tidur. Parah." |
| event:K15 | "Pameran Gigi Sehat! Aku jaga meja pendaftaran. Rapi kayak neraca. Mampir, ya. Ada permen. Eh, permen bebas gula!" |

## Arya
| Kondisi | Dialog |
|---|---|
| T0! @Kantor Konsultan | "Ya?" |
| T0! | "…Sore." |
| T20 @lokasi proyek | "Fondasinya miring dua senti. Harus dibongkar. Nggak apa-apa. Mending sekarang daripada nanti." |
| T20 @Perpustakaan | *(Arya mengangkat buku sedikit, tanda sapaan, lalu lanjut membaca.)* "…Hai." |
| T40 | "Retak di klinikmu udah aku cek lagi. Stabil. Kalau dindingnya bunyi aneh, bilang. Jangan didiemin." |
| T40 @Kantor Konsultan | "Dimas tadi ke sini. Gambar robotnya sekarang pakai skala. Satu banding sepuluh. …Aku bangga. Dikit." |
| T60 @Bukit Bintang malam | "Dari sini jembatannya kelihatan. Lampunya tiga, satu mati. Besok aku ganti. Udah aku catat." |
| T60 | "Raka bilang aku kayak tembok. Aku bilang tembok itu berguna. Dia ketawa sampai batuk. Aku nggak ngerti lucunya di mana." |
| H20 | "Kamu suka jendela yang menghadap timur atau barat? …Nggak. Cuma nanya. Buat… data." |
| H50 | "Biasanya aku nggak ngobrol selama ini. Ini udah tujuh menit. Aku hitung. …Nggak apa-apa. Aku nggak keberatan." |
| H70 @Bukit Bintang malam | "Sama kamu, diem pun nggak canggung. Sama orang lain, aku harus mikir mau ngomong apa. Capek." |
| pacaran | "Aku gambar kamu kemarin. Nggak mirip. Hidungnya kayak denah. Jangan dilihat. …Ya udah, lihat. Sebentar." |
| pacaran @Kantor Konsultan | "Duduk sini. Kursinya udah aku stel. Tingginya pas buat kamu. Aku ukur pas kamu nggak lihat." |
| nikah @Rumah pagi | "Pagi. Engsel pintu belakang udah aku betulin. Udah nggak bunyi. Kopi di meja." |
| nikah | "Ibu kirim sayur dari Kampung Kali. Banyak. Katanya kamu terlalu kurus. Aku bilang ukuranmu pas." |
| renggang | "…Iya." |
| hujan | "Musim hujan, kalau tanggul siaga aku tidur di kantor. Jangan khawatir. Ada kasur lipat. Sama termos." |
| cuaca:hujan | "Air di selokan alun-alun dua belas senti. Masih aman. Jam sembilan aku cek lagi." |
| stres>60 | "Kamu tidur berapa jam? …Empat? Itu di bawah standar. Standar siapa? Standarku. Pulang." |
| event:H10 | "Lubangnya tiap tiga meter. Yang dekat tebing jangan dulu. Kalau naik, pakai sepatu. Tolong." |

## Ipda Raka
| Kondisi | Dialog |
|---|---|
| T0! @Pos Polisi | "Selamat siang! Ada yang bisa dibantu? Lapor kehilangan? Lapor rindu? Yang kedua bukan wewenang saya, ya." |
| T0! | "Oh, dokter baru! Selamat datang di Rimbasari. Kasus terberat di sini: kambing kabur sama jemuran ketuker." |
| T20 @Pos Polisi | "Laporan hari ini: Pak Kedip, lampu jalan di Jalan Niaga, masih kedip-kedip. Pelapornya Laras. Lagi." |
| T20 patroli malam | "Patroli! Gembok warung aman, angkringan aman, Dokter… aman? Aman. Siap, lanjut." |
| T40 @Lapangan Voli | "Kata Coach Doni servis saya kayak surat tilang. Nyasar ke mana-mana, tapi pasti nyampe. Itu pujian, kan?" |
| T40 @Angkringan | "Gaple sama Adji. Dia mikirnya kelamaan, saya nunggu sambil ngabisin tiga gorengan. Yang rugi dompet saya." |
| T60 | "Kakak saya naik pangkat kemarin. Ayah telepon semua orang. Kecuali saya. Ya udah, saya ucapin sendiri. Lewat WA." |
| T60 patroli malam | "Kota sepi gini enak buat mikir. Di Metrapura mikir aja nggak sempat. Di sini malah kebanyakan, Dok." |
| H20 | "Dok, saya mau lapor. Hari ini saya senyum tujuh kali. Lima kali pas ketemu Dokter. Mencurigakan. Saya selidiki." |
| H50 | "Kalau saya nggak bercanda, Dokter nggak kabur, kan? Lagi saya coba, nih. Ngomong serius. Ternyata susah, ya." |
| H70 patroli malam | "Ikut patroli lagi? Rutenya sama. Tapi kalau bareng Dokter, kok rasanya jalannya kependekan, ya." |
| pacaran | "Mulai hari ini klinik masuk daftar patroli prioritas. Alasan resmi: keamanan. Alasan asli: rahasia negara." |
| pacaran @Angkringan | "Doni nanya kenapa saya nggak nyanyi dangdut lagi. Saya bilang sekarang nyanyinya dalam hati. Dia pura-pura muntah." |
| nikah @Rumah pagi | "Siap, Komandan! Sarapan di meja, sepatu udah disemir, lencana udah dilap. Laporan selesai. Mohon petunjuk." |
| nikah | "Ayah telepon tadi. Nanyain kamu. Nanyain saya juga, dikit. Ada kemajuan, Komandan." |
| renggang | "Siap. Saya lagi banyak tugas. Nanti saya mampir. …Kalau boleh." |
| kemarau | "Kemarau, laporan paling banyak: rebutan air sumur. Saya sekarang juru damai sumur. Jabatan baru, gaji lama." |
| cuaca:hujan | "Hujan, patroli tetap jalan. Jas hujan saya oranye. Kata Laras kayak jeruk berjalan. Jeruk yang bertugas." |
| stres>60 | "Dok, saya tilang. Pelanggaran: kerja ngebut. Sanksi: duduk di angkringan sepuluh menit. Nggak ada damai." |
| event:H45 | "Malam Lampion. Saya jaga keamanan. Tapi kalau Dokter mau lepas lampion, saya bisa izin lima menit. Sepuluh juga bisa." |

## dr. Galih
| Kondisi | Dialog |
|---|---|
| T0! @Puskesmas | "Selamat siang, Dokter. Ada rujukan yang mau dibahas? Silakan duduk. Tehnya masih hangat." |
| T0! | "Selamat datang di Rimbasari. Kalau butuh data pasien, Puskesmas terbuka. Asal lewat prosedur. Maaf, saya memang begini." |
| T20 @Puskesmas | "Tensi Pak Hasan seratus enam puluh lagi. Saya sudah tegur tiga kali. Mungkin Dokter bisa jadi yang keempat." |
| T20 @Perpustakaan | "Saya sedang baca buku puisi. Tolong jangan tanya penyairnya. Kalau Dokter kenal, saya malu." |
| T40 @Kedai Kopi | "Teh. Selalu teh. Nadia sudah berhenti menawari saya kopi. Saya lega, sebenarnya. Dia gigih sekali." |
| T40 | "Mbah Darmi kemarin memberi saya jamu. Rasanya… pahit sekali. Saya habiskan. Saya takut ditanya isinya apa." |
| T60 jaga malam | "Malam ini sepi. Saya suka kalau sepi. Artinya tidak ada yang sakit. Atau semua sedang menahan. Semoga yang pertama." |
| T60 | "Dulu saya pernah dua hari tidak tidur. Saya kira itu keren. Sekarang saya tahu, itu cuma bikin tangan gemetar." |
| H20 | "Saya menulis sesuatu tadi pagi. Di balik kertas resep. …Bukan resep. Tolong lupakan saya bilang itu." |
| H50 | "{nama}. …Maaf, saya tidak biasa memanggil nama. Tapi rasanya lebih pas daripada 'Dokter'. Boleh, kan?" |
| H70 @Bukit Bintang | "Di sini saya tidak menghitung apa-apa. Detak, dosis, jam. Bintangnya juga tidak. Lega rasanya." |
| pacaran | "Saya tidur enam jam kemarin. Enam. Wulan sampai memeriksa nadi saya. Katanya saya sakit." |
| pacaran jaga malam | "Terima kasih sudah mampir. Tehnya dua. Satu untukmu. Sudah saya hitung. Dua kali." |
| nikah @Rumah pagi | "Selamat pagi. Puisi di meja itu untukmu. Jangan dibaca keras-keras, ya. Dari dapur kedengaran." |
| nikah | "Ibu menelepon. Katanya kamu harus makan sayur lebih banyak. Saya bilang, 'Bu, dia dokter.' Ibu tidak peduli." |
| renggang | "Baik. Saya mengerti. Saya tunggu. Kalau soal menunggu, saya cukup terlatih." |
| hujan | "Musim hujan, kasus demam berdarah naik. Saya di Puskesmas lebih lama. Kalau pesanmu lama saya balas, itu sebabnya." |
| cuaca:hujan | "Hujan. Saya suka bunyinya di atap Puskesmas. Jaga malam jadi tidak terlalu sepi." |
| stres>60 | "Saya kenal tanda itu. Mata, bahu, cara bernapas. Dulu saya juga begitu. Duduk sebentar. Saya ukur tensimu." |
| event:H25 | "Bakti Sosial. Kita berbagi meja. Pasien gigi ke kamu, tensi ke saya. Kalau saya salah meja, tegur saja." |

## Sekar
| Kondisi | Dialog |
|---|---|
| T0! @Perpustakaan | "Selamat… eh, selamat sore. Mau pinjam buku? Kartunya… anu… ada di meja. Maaf, maaf." |
| T0! @Kebun Bunga pagi | "Oh! Maaf, saya nggak lihat ada orang. Saya lagi… ngobrol sama bunga. Eh, bukan. Nggak. Lupakan, ya." |
| T20 @Perpustakaan | "Ada buku baru dari Tanjung Arum, kiriman Tante Lies. Satu soal gigi. Anu… saya simpankan buat Dokter." |
| T20 | "Pak Wiryo datang tiap Minggu pagi. Duduknya selalu di kursi dekat jendela. Nggak pernah saya kasih ke orang lain." |
| T40 @Kebun Bunga | "Telangnya mekar tiga. Kemarin dua. Saya hitung tiap pagi. Iya, saya tahu… agak aneh. Maaf." |
| T40 @Pondok Jamu | "Senin saya di sini. Mbah Darmi ngajarin nama daun. Saya salah terus. Mbah bilang 'Hm.' Itu artinya bagus, kok." |
| T60 | "Kak Tari bilang suka cerita 'Telang'. Saya hampir bilang… anu, nggak jadi. Belum." |
| T60 @Perpustakaan malam | "Bu Ratna mampir tadi. Lama lihat-lihat rak buku anak. Nggak pinjam apa-apa. Saya juga nggak nanya." |
| H20 | "Saya selipkan pembatas di buku yang Dokter pinjam. Kelopak telang. Jangan dibuang, ya. Eh, terserah, sih." |
| H50 | "Biasanya saya baca sendirian. Tapi sekarang kalau ketemu bagian lucu, saya jadi pengin… cerita ke kamu. Anu, gitu." |
| H70 @Kebun Bunga | "Ini bedeng baru. Masih kosong. Saya… sisakan buat bunga yang kamu suka. Kalau mau pilih. Kalau mau." |
| pacaran | "Semalam saya nulis lagi. Tokoh baru. Dokter gigi. Jangan geer, ya. Dia… cuma agak mirip. Agak." |
| pacaran @Perpustakaan | "Kursi dekat jendela punya Pak Wiryo. Kursi sebelah saya sekarang punya kamu. Peraturan perpustakaan baru." |
| nikah @Rumah pagi | "Teh telang di meja. Kalau dikasih jeruk nipis, warnanya jadi ungu. Saya tahu kamu tahu. Saya cuma suka bilang." |
| nikah | "Rak buku kita udah penuh. Saya mau minta tolong Mas Arya bikinin satu lagi. Atau dua. Boleh, ya?" |
| renggang | "Oh. Iya. Nggak apa-apa. Saya… ada di perpustakaan, kalau mau." |
| kemarau | "Kemarau, kebunnya haus. Saya bangun lebih pagi buat nyiram. Bunganya seger. Sayanya ngantuk." |
| cuaca:hujan @Perpustakaan | "Hujan, perpustakaan jadi ramai. Orang neduh, terus nggak sengaja baca. Makanya saya suka hujan. Hehe." |
| stres>60 | "Kamu… kelihatan capek. Duduk sebentar di sini, ya. Nggak usah baca. Duduk aja. Perpustakaan juga boleh buat itu." |
| event:H10 | "Bibitnya… nggak apa-apa. Raknya roboh semalam. Sebagian selamat. Sebagian. Saya nggak apa-apa, kok." |

## Nadia
| Kondisi | Dialog |
|---|---|
| T0! @Kedai Kopi | "Halo, pelanggan baru! Cobain, gratis! Kopi Pak Bowo, aku seduh pakai V60. Gimana? Gimana? Asemnya enak, kan?" |
| T20 @Kedai Kopi | "Juri resmi datang! Racikan hari ini: kopi plus kayu manis. Jujur, ya. Mas Adji bilang enak terus. Nggak dihitung." |
| T20 @Kebun Kopi pagi | "Eh! Ngapain jam segini? Aku? Aku… olahraga. Iya, olahraga metik kopi. Jangan bilang siapa-siapa, ya!" |
| T40 @Kedai Kopi | "Kemarin pelanggan cuma sembilan. Tapi sembilan itu naik dari tujuh, lho! Naik dua! Aku rayain pakai espresso." |
| T40 | "Kak Tari bilang tokonya lebih laris. Ya iyalah, roti nggak butuh teori. Kopi butuh! Ada ilmunya! Oke, kita seri." |
| T60 @Kedai Kopi malam | "Jam sepuluh, kedai sepi, aku suka duduk di lantai belakang bar. Ubinnya adem. Jangan ketawa, ya." |
| T60 | "Mama nanya lagi kapan aku 'pulang beneran'. Aku bilang aku udah pulang. Mama belum ngerti. Belum, ya. Nanti juga." |
| H20 | "Ini cangkir favoritku, nggak pernah aku pakai buat pelanggan. Hari ini aku pakai. Buat kamu. Udah, minum!" |
| H50 | "Aku capek, tahu. Tapi kalau kamu dateng, capeknya ilang separuh. Sisanya ilang kalau kamu ketawa. Gombal? Biarin." |
| H70 @Kedai Kopi | "Jangan bilang siapa-siapa, ya. Aku tuh di depan orang sok semangat terus. Sama kamu doang aku berani lemes gini." |
| pacaran | "Aku lagi ngulik racikan baru. Kali ini kamu nggak dapet duluan. Kamu yang terakhir. Soalnya yang terakhir paling enak." |
| pacaran @Kebun Kopi pagi | "Tadi Pak Bowo nanya, 'Dokter itu baik sama kamu?' Aku bilang iya. Dia cuma 'Hm.' Terus senyum. Pak Bowo senyum, lho!" |
| nikah @Rumah pagi | "Bangun, bangun! Kopi pertama hari ini, khusus buat kamu. Rasanya? Jangan jawab 'enak'. Aku mau detail!" |
| nikah | "Mama telepon, minta dikirimin kopi 'yang kemarin itu'. Mama! Minta kopi! Dari aku! Aduh, aku mau nangis." |
| renggang | "Oke! Oke. Kedai lagi rame, kok. Aku sibuk. Nggak apa-apa. Nanti aja ngobrolnya." |
| kemarau | "Kemarau, panen kopi! Seminggu ke depan aku bakal bau kopi. Lebih bau dari biasanya. Maaf duluan, ya!" |
| cuaca:hujan @Kedai Kopi | "Hujan, kedai sepi. Tapi kamu dateng. Itu namanya pelanggan setia. Atau nekat. Dua-duanya aku suka." |
| stres>60 | "Stop. Duduk. Ini bukan kopi, ini cokelat panas. Kafeinmu hari ini udah kebanyakan. Nggak ada protes. Minum." |
| event:K35 | "Panen! Aku bawa termos kopi buat semua pemetik. Pak Bowo pura-pura nggak mau. Udah habis dua gelas, tuh." |

## Laras
| Kondisi | Dialog |
|---|---|
| T0! @Studio Foto | "Selamat datang di Studio Lensa! Pas foto? Foto keluarga? Foto… eh, dokter baru! Tahan! Klik. Makasih!" |
| T0! keliling | "Jangan gerak! …Udah. Cahayanya pas banget di belakang Dokter. Nanti aku cetak, ya. Gratis, kok." |
| T20 keliling @Bukit Bintang | "Jam segini cahayanya paling cakep. Orang bilang golden hour. Aku nyebutnya jam madu. Lebih manis, kan?" |
| T20 @Studio Foto | "Bapak lagi tidur siang. Nanti kalau bangun pasti nanya 'Siapa itu?', terus kenalan tiga kali. Maklumin, ya." |
| T40 | "Pak Kedip masih kedip! Udah aku lapor Mas Raka empat kali. Katanya Pak Kedip itu 'saksi kunci'. Saksi apa coba?" |
| T40 @Alun-alun | "Lagi motret Kakek Wiryo main catur. Kalau tahu ada kamera, beliau langsung pose. Kudanya diangkat tinggi-tinggi." |
| T60 | "Mata Bapak makin buram. Kemarin pegang foto Ibu, terus bilang 'Ini ibumu, ya?' Iya, Pak. Iya." |
| T60 @Studio Foto | "Aku punya arsip foto satu kota. Kotak-kotak di belakang. Kadang aku buka satu, terus nangis. Nggak apa-apa, kok." |
| H20 | "Aku foto kamu lagi. Sengaja. Sekarang aku nggak minta maaf. Kamu fotogenik. Itu salah kamu sendiri." |
| H50 | "Cuma kamu yang ngarahin kamera ke aku dan aku nggak kabur. Gitu aja. Pengin kamu tahu." |
| H70 keliling | "Kalau kamu ikut keliling, fotoku jelek semua. Fokusnya ke kamu terus, objeknya kelewat." |
| pacaran | "Foto kita aku pajang di studio. Di pojok, kecil. Tapi pelanggan pertama langsung nanya. Hehe, ketahuan." |
| pacaran @Studio Foto | "Kata Bapak, 'Suaramu beda kalau dia dateng.' Bapak nggak bisa lihat, tapi bisa denger. Curang, ih." |
| nikah @Rumah pagi | "Pagi! Jangan gerak! …Klik. Foto bangun tidur nomor dua ratus tiga. Koleksi pribadi. Nggak dijual." |
| nikah | "Rubrik 'Kota Kecil' bulan ini fotonya kamu lagi ngobatin Dimas. Kata redaksi, itu foto terbaik tahun ini. Hehe." |
| renggang | "Oh, hai! Aku lagi… motret. Banyak. Sibuk. Nanti aja, ya." |
| kemarau | "Kemarau, langitnya bersih. Fotoku tajam semua. Aku suka kemarau, kecuali bagian keringetnya." |
| cuaca:hujan @Studio Foto | "Hujan, nggak bisa keliling. Aku cuci foto di kamar gelap. Mau lihat? Jangan buka pintunya. Serius, jangan!" |
| stres>60 | "Diem bentar. Aku foto kamu. …Nah, lihat. Mukamu capek banget. Istirahat, ya. Biar foto berikutnya senyum." |
| event:K55 | "Pameran Foto Warga! Talinya udah aku pasang keliling alun-alun. Ada foto Dokter juga. Nggak boleh protes." |

## Wulan
| Kondisi | Dialog |
|---|---|
| T0! @Puskesmas | "Selamat pagi, Dok. Saya Wulan, bidan. Kalau ada pasien anak atau ibu hamil, kita kerja sama, ya." |
| T0! | "Sudah makan? Saya tanya semua orang, kok. Jangan tersinggung. Kebiasaan kerja." |
| T20 @Puskesmas | "Antrean imunisasi hari ini tiga puluh. Tangan saya pegel. Tapi anak-anaknya lucu. Yang nangis juga lucu, sih. Dikit." |
| T20 @Posyandu | "Posyandu hari ini di Kampung Asri. Bayinya Mas Rudi naik dua ons! Saya hampir tepuk tangan. Hampir, lho." |
| T40 | "dr. Galih belum makan dari pagi. Nasinya saya taruh di mejanya. Nanti saya cek. Kalau belum dimakan, awas." |
| T40 @Puskesmas | "Tensi Mbah Darmi tinggi lagi. Katanya gara-gara Pak Bowo. Saya bingung, Dok, itu nulisnya di kartu gimana." |
| T60 jaga malam | "Ada ibu mau melahirkan, kira-kira jam tiga. Saya tidur sebentar, ya. Kalau saya merem sambil duduk, jangan diganggu." |
| T60 | "Kadang saya pulang, buka sepatu, terus ketiduran di kursi. Bangun-bangun sepatu sebelah masih kepakai." |
| H20 | "Dok, sudah makan? …Yang ini bukan pertanyaan kerja. Saya beneran pengin tahu." |
| H50 | "Biasanya saya yang nyuruh orang istirahat. Kalau kamu yang nyuruh saya, rasanya aneh. Tapi ya… saya nurut." |
| H70 | "Saya nggak pernah cerita soal capek ke siapa-siapa. Ke kamu, saya cerita. Ternyata enteng juga, ya." |
| pacaran | "Bayi ke-131 lahir semalam. Saya tulis di buku. Di sebelahnya saya tambahin: 'Dia nungguin di luar.' Kamu." |
| pacaran @Puskesmas | "Kata Galih saya senyum terus hari ini. Saya bilang saya sedang bersikap profesional. Dia nggak percaya." |
| nikah @Rumah pagi | "Sarapan sudah. Bekal sudah. Jangan lupa minum air. Itu perintah. Dari istri sekaligus bidan." |
| nikah | "Ibu dari Dusun Atas kirim sayur lagi. Katanya buat menantu. Buat kamu. Saya cuma kebagian sisanya." |
| renggang | "Iya. Saya ngerti. Saya ada di Puskesmas kalau perlu. Jaga diri, ya." |
| hujan | "Musim hujan, ibu hamil susah datang, jalannya licin. Jadi saya yang datang ke mereka. Pakai sandal jepit." |
| cuaca:hujan | "Hujan. Kalau mau ke Posyandu, saya pinjam jas hujan Mas Raka. Oranye. Saya jadi kayak jeruk." |
| stres>60 | "Duduk. Saya ukur tensi. …Seratus tiga puluh. Belum bahaya. Tapi kalau naik lagi, saya larang kamu kerja. Serius." |
| event:K15 | "Saya buka lapak imunisasi di Pameran. Anak yang berani dapat stiker gigi. Idenya Dimas, katanya." |
