# Buku NPC · 07a · Dialog Harian Warga (12)

> Status: **ACC 2026-11-11** · revisi gaya lisan **ACC 2026-11-15** (partikel lisan, candaan lokal, sesuai kepribadian; lihat "Panduan gaya" di [00-daftar-isi.md](00-daftar-isi.md)).
> Ini kumpulan dialog obrolan harian (GDD §9: ngobrol +3 trust/hari). Dialog event, rahasia, dan Adegan Trust ada di kartu masing-masing ([01-warga.md](01-warga.md)) dan **tidak** diulang di sini.

## Cara kerja (untuk kode Fase 3a)
- Setiap baris punya **kondisi**. Saat pemain mengajak ngobrol, game mengumpulkan semua baris yang kondisinya cocok, membuang yang sudah dipakai dalam 7 hari terakhir, lalu memilih acak satu baris dari kondisi yang **paling spesifik**.
- Urutan spesifik, dari yang paling diutamakan: `event` > `stres` > `cuaca` > `musim` > `@tempat` > `T` (Trust).
- Kode kondisi:
  - `T0` Asing · `T20` Kenal · `T40` Akrab · `T60` Percaya · `T80` Sahabat. Baris berlaku untuk tingkat itu **dan yang lebih tinggi**, kecuali ditandai `!` (hanya tingkat itu).
  - `@Tempat` hanya kalau NPC sedang di lokasi itu (lihat [06-jadwal.md](06-jadwal.md)).
  - `kemarau` / `hujan` = musim. `cuaca:hujan` = hari itu hujan. `malam` = 18–24. `pagi` = 06–11.
  - `stres>60` = Stres pemain di atas 60. `event:K35` = hari event itu.
- Variabel: `{nama}` nama pemain, `{hari}` nama hari, `{klinik}` nama klinik sesuai tahap.
- Kalau AI opsional aktif (lihat 00-daftar-isi), baris di sini dipakai sebagai contoh gaya bicara untuk AI.

---

## Pak Harjo
| Kondisi | Dialog |
|---|---|
| T0! @Balai Kota | "Monggo, Dok, pinarak. Mau urus surat, bayar pajak, atau cuma ngadem? Kipas di sini paling kencang se-kelurahan." |
| T0! | "Pripun, Dok, sudah kerasan? Sinyal di sini memang suka hilang. Tapi kalau kabar, cepat kok. Lewat Bu Ratna, nggih." |
| T20 @Balai Kota | "Laporan warga minggu ini: dua sumur kering, satu kambing hilang. Kambingnya sudah pulang sendiri, alhamdulillah." |
| T20 | "Kata Bu Ratna klinik Dokter ramai. Itu kata Bu Ratna lho, nggih. Jadi ya… dibagi dua dulu, biar akurat." |
| T20 @Alun-alun | "Sore-sore saya keliling, Dok. Lampu jalan yang mati saya catat. Biar Mas Raka ndak lembur ngurusin lampu." |
| T40 | "Gigi saya yang goyang sudah enakan, Dok. Kemarin saya berani makan kerupuk lagi. Kerupuk udang. Satu saja, nggih." |
| T40 @Rumah Lurah malam | "Sebentar lagi jam delapan, Dok, jadwal saya telepon istri. Kalau telat, gantian dia yang nelepon. Lebih lama." |
| T40 | "Kakek Wiryo kemarin ngalahin saya catur lagi. Ya wajar, Dok, beliau guru saya. Murid kok menang, nanti kualat." |
| T60 | "Dua tahun lagi saya pensiun, Dok. Nanti pagi-pagi saya mau tanda tangan apa, ya? Tanda tangan sarapan, mungkin." |
| T80 | "Dok, nanti kalau saya sudah bukan lurah, saya tetap boleh mampir ke klinik, nggih? Bukan buat periksa. Buat ngobrol." |
| kemarau | "Kemarau begini kebun Bowo pasti kehausan. Dia ndak bakal minta, gengsinya tinggi. Nanti air tandon saya kirim diam-diam." |
| hujan | "Musim hujan itu musim rapat tanggul, Dok. Saya sudah hafal, kalau Mas Arya mulai garuk kepala, berarti airnya naik." |
| cuaca:hujan | "Hujan-hujan begini enaknya kopi tubruk. Dokter mau? Di Balai Kota ada termos. Jarang yang tahu, nggih. Rahasia dinas." |
| stres>60 | "Dok, maaf, muka Dokter kok kelihatan capek. Ngurus kota itu juga begitu. Dikerjakan sendiri semua, ya ambruk." |
| event:H60 | "Malam ini Syukuran. Pidato saya tiga halaman. Kalau saya kepanjangan, Dokter batuk saja, nggih. Yang keras." |

## Bu Ratna
| Kondisi | Dialog |
|---|---|
| T0! @Warung | "Eh, ini dokter gigi yang baru itu, kan? Iya, kan? Duh, Ibu udah denger dari kemarin lusa, lho! Mau beli apa, Dok?" |
| T0! | "Dokter aslinya mana, sih? Metrapura? Pantesan putih, wong kerjanya di dalem ruangan terus. Eh, bercanda lho, Dok!" |
| T20 @Warung | "Dok, Dok, sini! Katanya sih pipinya Pak Hasan Wetan bengkak segede bakpao. Katanya lho, ya. Ibu cuma nerusin." |
| T20 @Warung | "Kulakan ke Tanjung Arum lagi? Salamin Koh Hendra, ya. Kalau di jalan bokek, ngutang sini juga boleh. Asal inget, lho." |
| T20 | "Kak Tari tadi bikin roti pandan. Bilang aja disuruh Ibu, biasanya dikasih bonus. Biasanya, lho. Kalau Tari lagi baik." |
| T40 @Warung | "Kemarin ada yang bilang klinik mahal. Langsung Ibu semprot: 'Mahal apa? Kamu aja yang pelit!' Diem dia. Hehe." |
| T40 | "Bagus belum pulang dua minggu, Dok. Ujian, katanya. Ibu bilang, ujian ya ujian, makan jangan sampai lupa. Anak sekarang!" |
| T40 @Warung malam | "Pak Tono belum pulang, truknya masih nyangkut di Tanjung Arum. Warung sepi. Sini, Dok, duduk. Temenin Ibu ngobrol." |
| T60 | "Dok… Ibu mau nanya. Perpustakaannya Mbak Sekar itu boleh didatengin orang tua, nggak? Cuma nanya. Cuma nanya, lho." |
| T80 | "Dok, kemarin Ibu bisa baca tulisan di kaleng susu. Sendiri! 'Susu kental manis.' Aduh, jangan ketawa. Ibu bangga, nih." |
| kemarau | "Kemarau gini es teh laris manis. Gigi orang rusak, warung untung, Dokter juga untung. Kita kerja sama, ya, Dok. Hehe." |
| hujan | "Musim hujan, atap warung bocor dua titik. Udah Ibu taruh ember. Mas Arya katanya mau lihat. Katanya. Orangnya diem aja." |
| cuaca:hujan @Warung | "Aduh, basah kuyup gitu! Sini, sini, neduh. Ibu bikinin teh anget. Gratis. Kali ini aja, jangan bilang-bilang, lho." |
| stres>60 | "Dok, mukanya pucet gitu. Udah makan belum? Nih, gorengan. Sekali-sekali dokter gigi juga boleh makan gorengan, kok." |
| event:H45 | "Lampionnya dari warung Ibu semua, lho! Eh, Dok, udah denger soal Pak Gunawan? Belum? Aduh, sini, sini…" |

## Mbah Darmi
| Kondisi | Dialog |
|---|---|
| T0! @Pondok Jamu | "Hm." |
| T0! | "Dokter kota. Arep opo? Kunyit di pojok. Bayar di meja. Wis." |
| T20 @Pondok Jamu | "Ini apa, Cah? …Temulawak. Bener. Hm. Besok Mbah tanya yang luwih angel." |
| T20 | "Sirih itu buat gusi. Dokter juga pakai, to? Ya wis. Berarti kita satu perguruan." |
| T20 @Alun-alun pagi | "Pasar Kamis. Beras kencur. Tuku siji. Mukamu kurang kencur, Cah." |
| T40 @Pondok Jamu | "Bibit cengkeh wis ada. Ojo ditanam cedhak kunyit. Ndak akur. Kayak Mbah sama Ratna." |
| T40 | "Wulan kemarin ngukur tensi Mbah. Katanya tinggi. Halah. Wong Mbah lagi nesu sama Bowo." |
| T40 | "Sekar itu anak baik. Takon terus. Mbah seneng. Asal ndak takon yang wis Mbah jawab." |
| T60 | "Dulu wong sakit gigi nyarinya Mbah. Sekarang Dokter. Ndak apa-apa. Sing penting waras." |
| T80 | "Cah, nek Mbah wis ndak ada, buku catatan Mbah buat Sekar. Kowe sing mastikan. Ojo lali." |
| kemarau | "Kemarau. Herbamu disiram esuk, sebelum srengenge galak. Nek gosong, Mbah ndak tanggung." |
| hujan | "Musim hujan, sendi Mbah linu kabeh. Dokter punya obat sendi? Ndak? Ya wis. Jahe wae." |
| cuaca:hujan | "Udan. Lungguh. Ombe iki. Ndak usah takon isine." |
| stres>60 | "Walah, Cah, raimu kok kusut kayak jarik durung disetrika. Iki, wedang serai. Diombe, terus turu. Ojo ngeyel." |
| event:H10 | "Ndak. Mbah ndak istirahat. Saben taun Mbah nandur siji buat Mbah Karto. …Ya wis. Teh sak gelas." |

## Dimas
| Kondisi | Dialog |
|---|---|
| T0! | "…" *(Dimas lari ke belakang Bu Endang.)* |
| T0! @SD | "Bu Sinta! Bu Sinta! Itu dokter! Mau nyuntik siapa? Bukan aku, kan? Aku udah mandi!" |
| T20 | "Dok, di klinik ada robot nggak? Nggak ada? Kok nggak ada, sih? Beli dong, Dok. Satu aja. Yang kecil juga boleh." |
| T20 @Lapangan Voli | "Coach Doni tadi smash kenceng banget! Bolanya nyangkut di pohon! Dokter lihat nggak? Nggak? Yaaah." |
| T20 @Rumah Endang | "Ssst, Ibu lagi jahit. Aku lagi gambar. Ini robot. Namanya… Robot Dok. Hehe. Mirip, kan? Mirip, dong." |
| T40 | "Dok, tebak-tebakan! Gigi apa yang nggak bisa dicabut? …Gigi mundur! Hehe. Dari Pak Slamet. Lucu, kan? Kan?" |
| T40 @SD | "Tadi IPA, aku bilang ke Bu Sinta gigi hiu tumbuh terus. Bu Sinta bilang aku pinter. Pinter, Dok! Hehe." |
| T40 | "Mas Arya ngajarin gambar pakai penggaris. Robotku jadi lurus! Lihat, lihat! …Kakinya miring dikit, sih." |
| T60 | "Kemarin aku sikat gigi dua kali, Dok. Pagi sama malem. Ibu sampai kaget. Aku juga kaget, sih." |
| T80 | "Dok, nanti kalau aku gede jadi dokter gigi, kliniknya sebelahan sama Dokter, ya? Biar istirahatnya bisa main bareng." |
| kemarau | "Panas bangeeet! Boleh beli es nggak? Satuuu aja. Nanti sikat gigi! Janji! Janji robot!" |
| hujan | "Hujan terus, nggak bisa nonton voli. Aku gambar robot payung. Mau lihat? Mau, dong. Ayo, mau aja." |
| cuaca:hujan @Rumah Endang | "Ibu bilang jangan main air. Tapi airnya yang dateng ke sini. Bukan salahku, kan? Kan?" |
| stres>60 | "Dokter kok mukanya kayak Ibu kalau habis jahit sampai malem? Mau aku gambarin robot penghibur? Gratis, deh." |
| event:K15 | "Pameran Gigi Sehat! Aku mau ikut tebak-tebakan! …Kalau salah jawab, nggak disuntik, kan? Beneran?" |

## Bu Endang
| Kondisi | Dialog |
|---|---|
| T0! @Rumah Endang | "Oh, Dokter. Monggo, masuk. Maaf lho berantakan, kain di mana-mana. Ada perlu apa, Dok?" |
| T0! | "Maaf lho, Dok, Dimas tadi lari. Bukan karena Dokter, kok. Dulu ada… ya, kejadian. Nanti juga dia mau." |
| T20 @Rumah Endang | "Ini kebaya pesanan Bu Lurah, payetnya tiga ratus. Ibu pasang satu-satu. Mata Ibu sampai juling, Dok. Hehe." |
| T20 @Warung pagi | "Pagi, Dok. Ibu beli gula sama benang. Iya, benang, di warung. Bu Ratna itu jual apa aja. Kabar juga ada, gratis malah." |
| T20 | "Dimas cerita terus soal klinik. 'Dokternya nggak nyuntik, Bu, cuma lihat.' Matur nuwun, nggih, Dok. Beneran." |
| T40 @Rumah Endang | "Dok, lingkar pinggang Dokter berapa? Eh, nggak, nggak apa-apa. Penjahit, kebiasaan. Maaf lho." |
| T40 | "Mas Wahyu video call kemarin. Sebentar, sinyalnya putus-putus, mukanya kotak-kotak. Tapi Dimas senang. Ibu juga." |
| T40 | "Bayarnya bulan depan nggak apa-apa, nggih? Atau Ibu jahitkan taplak buat klinik? Dokter suka warna apa?" |
| T60 | "Kadang Ibu jahit sampai jam satu, Dok. Bukan karena kejar setoran. Kalau berhenti, pikiran Ibu ke mana-mana." |
| T80 | "Dok, matur nuwun sudah jadi tetangga Ibu. Bukan dokter, lho. Tetangga. Buat Ibu, itu beda." |
| kemarau | "Pesta Rakyat udah deket. Kostum numpuk. Mata Ibu, tangan Ibu, dua-duanya lembur. Jarumnya untung nggak protes." |
| hujan | "Hujan begini kain susah kering, Ibu jemur di dalam. Rumah jadi kayak toko kain, Dok. Maaf lho kalau nyangkut di kepala." |
| cuaca:hujan | "Lho, payung Dokter mana? Nih, bawa yang ini. Punya Mas Wahyu. Bolong dikit di pinggir, tapi masih bisa, kok." |
| stres>60 | "Dok, duduk dulu. Ibu bikinin teh. Kita ini sama-sama orang yang nggak bisa diem, ya. Lima menit aja, nggih." |
| event:K55 | "Kostum Pesta Rakyat tinggal dua! Dimas jadi robot. Iya, robot lagi. Dia maksa. Kardusnya minta Bu Ratna." |

## Pak Bowo
| Kondisi | Dialog |
|---|---|
| T0! @Kebun Kopi | "Ngapain ke sini? Ini kebun, bukan klinik. Nggak ada yang sakit gigi di sini. Kopinya juga nggak." |
| T0! | "Halah. Gigi saya sehat. Bapak saya umur delapan puluh, giginya masih lengkap. Nggak usah ditawarin." |
| T20 @Kebun Kopi | "Itu yang merah dipetik. Yang ijo jangan. Dokter kota tahunya kopi itu asalnya dari gelas, to. Ya, to?" |
| T20 @Angkringan | "Kopinya Slamet itu dari kebun saya. Makanya enak. Gulanya aja kebanyakan. Slamet itu ngeyel." |
| T20 | "Mas Adji nyuruh nyimpen struk. Struk apa? Wong saya jualan pakai tangan, bukan pakai kertas. Halah." |
| T40 @Kebun Kopi | "Nih. Kopi. Nggak usah bilang makasih. Nggak usah bilang Nadia juga, nanti dia minta. Wis, sana." |
| T40 | "Mbah Darmi kemarin njewer saya lagi. Umur lima puluh delapan, Dok, masih dijewer. Gara-gara saya bilang jamunya pahit." |
| T40 | "Kakak saya, Pak Lurah, mau periksa gigi ke Dokter? …Hm. Terserah dia. Saya sih nggak. Belum. Nggak." |
| T60 | "Dulu Ningsih kecil suka ikut metik. Bijinya malah dimakan. Pahit, katanya. Tapi ketawa terus anaknya." |
| T80 | "Dok. Kalau orang mau minta maaf, mulainya dari mana? Bukan buat saya. Buat… temen. Temen saya. Wis, jawab aja." |
| kemarau | "Bentar lagi panen. Kalau saya nggak kelihatan di angkringan, berarti saya di kebun. Nggak usah dicari." |
| hujan | "Hujan bagus buat kopi, jelek buat lutut. Dua-duanya punya saya. Halah, untung kopinya nggak bisa ngeluh." |
| cuaca:hujan @Kebun Kopi | "Wis lah, neduh di gubuk. Ada kursi kecil itu, jangan diduduki. Itu… punya orang. Pokoknya jangan." |
| stres>60 | "Dokter kerja kayak saya waktu muda. Nanti tua lututnya bunyi kayak engsel pintu. Pulang sana. Tidur." |
| event:K35 | "Panen! Semua tangan dipakai! Dokter? …Halah, ya wis. Petik yang merah. Jangan dimakan." |

## Bu Sinta
| Kondisi | Dialog |
|---|---|
| T0! @SD | "Selamat pagi, Dok. Saya Sinta, wali kelas tiga. Nah, ada waktu lima menit? Saya mau bahas UKS. Poinnya cuma tiga." |
| T0! | "Dokter baru, ya? Saya juga dulu 'guru baru'. Delapan tahun lalu. Sekarang dipanggilnya 'Bu Sinta yang galak'." |
| T20 @SD | "Hari ini tiga anak izin sakit gigi. Tiga, Dok. Dari dua puluh dua. Kalau ulangan, itu nilainya merah." |
| T20 @Perpustakaan | "Saya pinjam buku cerita buat kelas. Pilihan Mbak Sekar bagus-bagus. Dokter suka baca? Nah, nanti saya kasih daftar." |
| T20 | "Nah, ini daftar anak yang belum pernah ke dokter gigi. Panjang. Jangan kaget, ya. Halaman duanya lebih panjang." |
| T40 @SD | "Tadi saya tanya 'siapa yang sikat gigi pagi ini', Dimas angkat tangan! Dimas, Dok! Saya hampir nangis di depan kelas." |
| T40 | "Coach Doni minta jam olahraga ditambah. Saya bilang boleh, asal matematikanya juga. Langsung kabur dia. Larinya cepat." |
| T40 @Kedai Kopi | "Hari Minggu saya di sini, koreksi PR. Nadia sudah hafal pesanan saya: teh, tanpa gula. Iya, Dok, lagi diet. Lagi." |
| T60 | "Ibu saya telepon lagi semalam. Batuknya belum sembuh. Saya bilang bulan depan saya pulang. Sama kayak bulan lalu." |
| T80 | "Dok, terima kasih sudah mau dengar soal surat itu. Saya belum cerita ke siapa pun. Bahkan ke Pak Wiryo." |
| kemarau | "Kemarau, anak-anak jajan es tiap istirahat. Mau saya larang, tapi saya juga beli. Satu. Jangan bilang murid saya, ya." |
| hujan | "Musim hujan, separuh kelas datang basah. Sepatunya dijemur di jendela. Kelas saya bau kaus kaki, Dok. Nah, begitulah." |
| cuaca:hujan @SD | "Hujan begini anak-anak susah fokus. Nah, saya ganti jadi jam cerita. Judulnya 'Kuman Gigi Kena Banjir'." |
| stres>60 | "Dok, saya guru. Saya hafal muka murid yang begadang. Dokter punya muka itu. Nah, pulang tepat waktu, ya? Ini PR." |
| event:K15 | "Pameran Gigi Sehat! Saya sudah siapkan dua puluh pertanyaan. Nah, Dokter jadi juri, ya. Jangan galak-galak." |

## Pak Slamet
| Kondisi | Dialog |
|---|---|
| T0! @Angkringan | "Monggo, monggo, Dok! Duduk. Wedang jahe? Kopi? Gorengan baru mentas dari wajan, masih kemebul." |
| T0! | "Lho, ini to dokter gigi yang baru? Monggo mampir angkringan. Bukanya sampai yang jaga ngantuk. Yang jaga saya." |
| T20 @Angkringan | "Pesanan Dokter: wedang jahe, tahu isi dua. Bener, to? Dulu saya hafal trayek. Sekarang hafal pesanan." |
| T20 | "Di angkringan nggak ada yang buru-buru, Dok. Jam dinding saya mati sejak buka. Sengaja. Biar pelanggan betah." |
| T20 @Alun-alun pagi | "Belanja dulu, Dok. Cabai naik lagi. Nanti Mbak Yuni ngomel. Yang diomelin saya, cabainya diem aja." |
| T40 @Angkringan malam | "Tidurnya cukup, Dok? Jangan jawab 'cukup' kalau matanya merah kayak lampu rem. Saya mantan sopir, lho. Hafal." |
| T40 | "Pak Bowo ngajak debat soal gula lagi. Katanya kopi jangan manis. Lha pelanggan saya sukanya manis. Seri, Dok." |
| T40 @Angkringan | "Coach Doni, Mas Raka, Mas Ilham. Penumpang tetap angkringan ini. Orangnya itu-itu aja, ceritanya ganti terus." |
| T60 | "Dok, kalau nanti saya jadi pasien, saya minum obat pengencer darah, lho. Dicatat, ya. Biar nggak salah belok." |
| T80 | "Dok, saya dulu sopir bus malam. Remnya cuma dipakai kalau ada polisi. Jangan kerja kayak gitu, ya. Ngeri, lho." |
| kemarau | "Kemarau, malamnya enak, langit bersih. Habis dari sini mampir Bukit Bintang. Bintangnya gratis, nggak pakai karcis." |
| hujan | "Hujan, angkringan sepi. Tapi yang datang pasti penumpang setia. Dokter salah satunya. Nih, jahenya saya tambahin." |
| cuaca:hujan @Angkringan | "Terpalnya bocor di pojok, Dok. Duduk sini aja. Pojok itu kursi VIP buat ember." |
| stres>60 | "Kopi ketiga? Wah, nggak, Dok. Saya turunin di halte wedang jahe aja. Penumpang ngantuk dilarang ngebut." |
| event:Karaoke | "Malam Minggu! Siapa berani nyanyi duluan? Dokter? Ayo, ayo! Fals nggak apa-apa, yang penting pede!" |

## Kak Tari
| Kondisi | Dialog |
|---|---|
| T0! @Toko Roti | "Pagi! Mau roti apa? Kismis, pandan, cokelat, keju. Eh, dokter gigi boleh makan roti manis, nggak? Hehe." |
| T0! | "Oh, ini dokter gigi baru itu! Aduh, saya jadi malu jualan roti manis. Eh, nggak, nggak, bercanda. Mampir, ya!" |
| T20 @Toko Roti | "Mas Adji udah ambil roti kismisnya. Jam setengah delapan pas. Jam dinding saya aja kalah tepat, hehe." |
| T20 @Toko Roti | "Ada roti baru! Roti jahe. Eh tapi… ada gulanya. Dikit. Dikiiit banget. Hampir nggak ada. Hehe." |
| T20 @Warung | "Lagi ngobrol sama Bu Ratna. Rahasia. Eh, bukan rahasia! Cuma… resep. Iya, resep. Eh, beneran resep!" |
| T40 @Toko Roti | "Ayah tadi nyicip adonan saya. Katanya kurang garam. Ayah selalu bilang kurang garam. Tapi senyum, sih." |
| T40 | "Nadia bilang kedainya lebih laris. Masa, sih? Ngopi tanpa roti itu kayak… eh, apa ya. Pokoknya nggak lengkap!" |
| T40 | "Saya baca cerpen 'Telang' lagi di majalah. Bagus banget, Dok! Sepi, tapi anget. Kok bisa, ya, orang nulis kayak gitu?" |
| T60 | "Dok, kalau saya bikin kue tanpa gula, Dokter mau jadi tukang cicip? Saya serius. Eh, setengah serius. Serius, deh." |
| T80 | "Roti Senyum. Gimana namanya? Kalau jelek bilang, kalau bagus bilang juga. Pokoknya bilang, ya. Eh, jangan jelek." |
| kemarau | "Kemarau, mentega cepet leleh. Dapur kayak oven raksasa. Saya juga ikut ngembang. Eh, maksudnya kepanasan!" |
| hujan | "Musim hujan, roti anget laris. Orang neduh di sini sambil beli. Hujan itu rezeki tukang roti, hehe." |
| cuaca:hujan @Toko Roti | "Neduh dulu, Dok! Nih, roti sisa kemarin, masih enak kok. Gratis. Eh, jangan bilang Ayah, ya." |
| stres>60 | "Dok, makan dulu. Ini roti tanpa gula, beneran. Saya bikin buat Ayah. Satu buat Dokter. Ayah nggak usah tahu." |
| event:K15 | "Saya buka lapak kue di Pameran Gigi Sehat. Iya, saya tahu, ironis. Tapi tiap kue ada kartunya: 'Sikat gigi, ya!'" |

## Mas Ilham
| Kondisi | Dialog |
|---|---|
| T0! @Kantor Pos | "Selamat pagi, Dok! Kirim surat, ambil paket, atau cuma nanya? Nanya gratis, lho. Ongkirnya nol." |
| T0! | "Siap! Dokter yang di ruko Om Darto, kan? Jalan Alun-alun nomor tujuh. Saya hafal. Kode posnya juga." |
| T20 @Kantor Pos | "Katalog Bahari Medika udah datang, Dok. Tebelnya kayak bantal. Ada stiker 'harga teman' dari Koh Hendra." |
| T20 | "Hari ini nganter ke Dusun Atas. Nanjak terus, motor saya batuk-batuk. Kayaknya perlu ke klinik juga, Dok. Klinik motor." |
| T20 @Lapangan Voli | "Coach Doni bilang smash saya kurang tinggi. Padahal saya udah lompat sampai lupa alamat sendiri, Dok." |
| T40 | "Ada kartu pos dari Laras, dari Tanjung Arum. Gambarnya laut. Dok, laut itu beneran biru, ya? Nggak diedit?" |
| T40 @Kantor Pos | "Alat Dokter sampai besok pagi. Saya taruh paling atas di motor. Biar nggak kegencet karung berasnya Bu Ratna." |
| T40 | "Adik saya mau masuk SMP. Seragamnya dijahit Bu Endang. Ibu saya nangis lihatnya. Saya? Nggak. Kelilipan aja." |
| T60 | "Dok… kapan-kapan mampir Kantor Pos, ya. Ada yang mau saya kasih. Bukan paket. Ya, semacam paket. Nanti aja." |
| T80 | "Kalau ke Tanjung Arum lagi, saya boleh ikut? Bekal bawa sendiri. Saya cuma pengin lihat laut. Sekali aja." |
| kemarau | "Kemarau, jalan desa debunya tebel. Pulang-pulang saya kayak donat ditaburin gula halus. Kak Tari pasti seneng." |
| hujan | "Hujan, Dok! Tapi surat harus sampai. Jas hujan saya bolong tiga. Suratnya aman, yang basah saya. Siap!" |
| cuaca:hujan | "Siap, basah! Lho, Dokter juga? Wah, kita senasib. Bedanya, saya digaji buat basah. Hehe." |
| stres>60 | "Dok, ada surat buat Dokter. Pengirimnya: badan Dokter sendiri. Isinya cuma satu kata: 'Tidur.' Hehe, saya karang." |
| event:H10 | "Dua ratus polybag bibit, Dok! Motor saya jadi kebun berjalan. Mau saya anter sekalian ke Lereng?" |

## Kakek Wiryo
| Kondisi | Dialog |
|---|---|
| T0! @Alun-alun | "Oh. Duduk, Nak. Kamu keponakannya Darto, to? Dari jauh kelihatan. Jalannya sama, agak miring ke kiri." |
| T0! | "Selamat datang, Nak. Kota ini kecil. Separuhnya murid saya. Separuhnya lagi orang tua murid saya. Hehe." |
| T20 @Alun-alun | "Main? Ndak usah bisa. Duduk saja, saya gerakkan dua-duanya. Darto dulu juga begitu. Kalah terus, tapi senang." |
| T20 | "Kemarin Ilham bawakan teh. Anak itu dulu paling ribut di kelas, Nak. Sekarang paling rajin. Lucu, to?" |
| T20 @Rumah Wiryo | "Ini foto Asih, tahun tujuh lima. Yang motret bapaknya Laras. Cantik, to? Saya dulu nekat, Nak. Untung diterima." |
| T40 @Alun-alun | "Sariawan saya sudah sembuh. Gigi palsunya saya rendam dulu di gelas. Makan bubur. Enak, ndak usah ngunyah." |
| T40 | "Harjo kemarin kalah lagi. Jangan bilang saya cerita, ya. Dia itu sensitif. Dari SD. Dulu nangis gara-gara PR." |
| T40 | "Tadi saya mau bilang apa, ya… Sebentar. …Oh. Sudah makan, Nak? Iya. Itu. Itu yang mau saya tanya." |
| T60 | "Namamu saya tulis di buku saku ini, Nak. Di halaman yang paling sering saya buka. Biar ndak lupa." |
| T80 | "Kalau nanti saya mulai lupa banyak hal, kamu ingatkan saya soal Darto, ya. Dia itu lucu. Jangan sampai hilang." |
| kemarau | "Kemarau, bidak caturnya panas kena matahari. Kalau mau pegang kuda, pakai sapu tangan. Kudanya galak." |
| hujan | "Hujan. Ndak ke alun-alun. Main di rumah saja, Nak. Papan cadangan ada di lemari. Papannya Darto." |
| cuaca:hujan @Rumah Wiryo | "Duduk, Nak. Dengar hujan di genteng. Asih dulu suka bunyi ini. Katanya kayak tepuk tangan pelan." |
| stres>60 | "Nak, dulu murid saya yang belajar sampai subuh nilainya ndak lebih bagus. Cuma matanya yang lebih merah. Tidur sana." |
| event:H45 | "Lampion saya dua. Satu buat Asih, satu buat Darto. Kamu mau pegang yang buat Darto? Dia pasti senang." |

## Coach Doni
| Kondisi | Dialog |
|---|---|
| T0! @Lapangan Voli | "Hei, Dokter baru! Ayo main! Kalah traktir es teh! Nggak bisa? Nggak apa-apa! Belajar sambil kalah! Gas!" |
| T0! | "Dok! Push-up sehari berapa kali? Nol?! Waduh, waduh. Tenang, nanti kita perbaiki. Gas!" |
| T20 @Lapangan Voli | "Lututnya ditekuk, Dok! Bukan gitu! Itu kayak jongkok nunggu angkot! Yang semangat, dong!" |
| T20 @SD | "Lagi ngajar olahraga. Bu Sinta bilang jam saya kepanjangan. Saya bilang otak juga butuh lari. Saya malah dikasih PR." |
| T20 | "Dimas sekarang asisten pungut bola. Gajinya es teh. Rajinnya ngalahin pemain saya. Pemain saya harusnya malu!" |
| T40 @Lapangan Voli | "Smash Andre makin bagus. Tapi kalau bola ke muka, dia masih merem. …Nanti saya urus. Pasti saya urus." |
| T40 @Angkringan | "Mas Raka nyanyi dangdut kemarin. Fals parah! Tapi semangatnya juara satu. Mirip saya kalau servis. Hahaha!" |
| T40 | "Tadi pagi lari lima kilo, Dok! Lutut bunyi kretek-kretek kayak kerupuk kena angin. Tapi tetep gas, dong!" |
| T60 | "Kadang habis anak-anak pulang saya duduk di sini, lihatin net. Mikir, coba dulu lutut ini nggak rusak. Ah, udahlah." |
| T80 | "Dok, ini peluit cadangan saya. Buat Dokter. Kalau pasiennya bandel, tiup. Hahaha! Nggak, nggak. Buat kenang-kenangan." |
| kemarau | "Kemarau, lapangan keras, bolanya mantul tinggi. Enak buat smash, nggak enak buat lutut. Ah, gas aja!" |
| hujan | "Hujan, latihan pindah ke dalam. Lari di tempat, push-up. Anak-anak benci. Saya seneng. Hahaha!" |
| cuaca:hujan | "Lapangan basah, hari ini nggak ada latihan bola. Dulu saya paksa. …Sekarang nggak lagi. Nggak lagi." |
| stres>60 | "Dok, ikut lari sore! Sepuluh menit aja! Keringat itu buang stres. Kata saya, lho, bukan kata dokter. Hahaha!" |
| event:K55 | "Turnamen Pesta Rakyat! Kita lawan Desa Wetan! Dokter jadi dokter tim, ya? Bawa plester yang banyak! Gas!" |
