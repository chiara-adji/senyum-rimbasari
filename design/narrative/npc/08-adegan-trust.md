# Buku NPC · 08 · Adegan Trust (Fase 3a-2)

> Status: **Draf 3a-2, 2026-11-15** (cakupan ACC user 2026-11-15: "ACC semua rekomendasi"). Kanon: *Provisional*.
> Sumber: "Sikap ke dokter" di [01-warga.md](01-warga.md), [04-luar-kota.md](04-luar-kota.md), [05-staf.md](05-staf.md). Gaya bicara mengikuti tabel "Ciri bicara" di kartu masing-masing.
> Dibaca otomatis oleh `tools/gen-npc-data.cjs` → `NPC_SCENES` di `src/npc-data.js`. Jangan ubah format judul tanpa mengubah parsernya.

## Cara kerja (untuk kode)
- Setiap `### T20` / `T40` / `T60` / `T80` = satu adegan sekali tonton. Begitu Trust NPC mencapai angka itu (dan syaratnya cocok), penanda **!** muncul di atas kepalanya. Ngobrol berikutnya memutar adegan ini, bukan kalimat harian.
- `adegan` = *Adegan Trust* di kartu: memberi **Trust +5** (GDD §9 "event +5"). Tanpa `adegan` = sapaan naik tingkat, tidak memberi bonus (ngobrol +3 tetap berlaku).
- Syarat tambahan di judul: `@Tempat` (NPC sedang di tempat itu, nama sama dengan 07a), `pagi/siang/sore/malam`, `jam21` (jam 21 atau lebih), `stres>60`.
- Paling banyak satu adegan per NPC per hari. Adegan tingkat lebih rendah diputar dulu.
- `### sikap T20` dst. = halaman tambahan yang ikut muncul setelah kalimat harian, **setiap** ngobrol selama syaratnya cocok (bukan sekali tonton).
- Baris: `*(…)*` = narasi (warna cokelat). `"…"` = ucapan NPC pemilik bagian. `Nama: "…"` = ganti pembicara (potret ikut berganti).
- Variabel: `{nama}` nama pemain. Khusus sikap Bu Ratna: `{sakit}` warga yang giginya sedang sakit (calon pasien warga), `{orang}` + `{tempat}` posisi seorang kenalan hari ini. Halaman dengan variabel yang tidak bisa diisi dilewati.
- Imbalan yang mekaniknya baru ada di 3b (papan catur Wiryo, seragam Endang, #32, Syukuran, Pesta Rakyat) baru berupa dialog.

---

## Pak Harjo
### T20
- *(Klinik baru saja sepi. Pak Harjo berdiri di depan pintu, membetulkan pecinya.)*
- "Maaf, Dok, saya nggak mau ganggu. Cuma mau tanya-tanya sedikit, nggih."
- "Gigi bawah saya ini kok goyang, ya. Kalau sudah tua memang begitu, atau masih bisa diapa-apakan?"
- *(Kamu menjelaskan soal karang gigi dan gusi. Dia mengangguk pelan, seperti sedang mencatat dalam hati.)*
- "Kalau begitu, kapan-kapan saya daftar. Pagi-pagi saja, biar nggak ketahuan Bu Ratna."
### T40 adegan @Balai Kota
- *(Di meja Pak Harjo ada selembar kuitansi. Kamu sempat membaca tulisannya: Pajak Bumi, Ruko Sumber Rejeki.)*
- *(Dia buru-buru melipatnya dan memasukkannya ke laci.)*
- "Itu... anggap saja Dokter nggak lihat, nggih."
- "Setahun ruko itu kosong. Kalau pajaknya nunggak, ya dilelang. Saya nggak tega."
- "Saya cuma mikir, siapa tahu ahli warisnya datang. Eh, yang datang malah dokter gigi. Gusti Allah itu lucu, Dok."
### T60
- "Dok, saya mau minta tolong. Ini agak berat."
- "Warga masih banyak yang ke lapak Pak Joni. Saya nggak bisa melarang. Saya lurah, bukan polisi."
- "Tapi kalau yang bicara Dokter, di depan warga, mungkin mereka mau dengar. Nanti saya kumpulkan di Balai, nggih?"
### T80 adegan @Alun-alun sore
- *(Selesai keliling, Pak Harjo mengajakmu naik ke Bukit Bintang. Lampu-lampu kota mulai menyala satu per satu.)*
- "Dua tahun lagi saya pensiun, Dok. Dulu saya bingung, siapa yang mau meneruskan."
- "Dulu saya kira yang perlu diwariskan itu jabatan. Ternyata orang yang mau tinggal."
- "Terima kasih sudah tinggal, nggih. Itu saja. Ayo turun, nanti istri saya telepon."

## Bu Ratna
### T20
- "Dok, Dok! Sini dulu. Mulai sekarang Ibu kasih kabar yang penting-penting aja, ya."
- "Siapa yang lagi sakit gigi, siapa lagi di mana. Biar Dokter nggak nyari-nyari."
- "Gratis, lho. Eh, nggak gratis ding. Belanja dikit."
### sikap T20
- "Eh, Dok, jangan bilang siapa-siapa. {sakit} tadi pegang-pegang pipi terus. Kayaknya giginya lagi nyut-nyutan."
- "Oh iya, Dok. {orang} hari ini lagi di {tempat}. Kalau Dokter nyari."
### T40
- "Dok, kemarin ada yang ngomong klinik Dokter mahal. Ibu langsung jawab!"
- "Ibu bilang, mahal mana sama gigi copot? Orangnya diem. Hehe. Pokoknya kalau ada yang ngomong jelek, lapor Ibu."
### T60 adegan @Warung
- *(Bu Ratna duduk di balik etalase, memegang sebuah surat. Kertasnya terbalik.)*
- *(Dia melihatmu memperhatikan, lalu pelan-pelan meletakkan suratnya.)*
- "Aduh. Ketahuan, ya."
- "Ibu nggak bisa baca, Dok. Dari dulu. Kelas tiga udah berhenti sekolah, jagain adik-adik."
- "Surat Bagus selalu Ibu suruh Tari yang baca. Bilangnya kacamata ketinggalan. Padahal Ibu nggak punya kacamata."
- "Jangan bilang siapa-siapa, ya. Yang ini beneran, Dok."
### T80
- "Dok, Bagus kirim surat lagi. Mau... bacain buat Ibu?"
- *(Kamu membacakannya pelan-pelan. Bagus minta dikirimi sambal. Bu Ratna tertawa sambil mengusap mata.)*
- "Eh, Dok. Kata Mbak Sekar, di perpustakaan ada buku buat belajar baca. Kalau Ibu ke sana, Dokter mau nemenin?"

## Mbah Darmi
### T20
- "Hm. Kowe meneh."
- *(Mbah Darmi menyodorkan selembar daun hijau mengilap.)*
- "Iki opo?"
- *(Kamu menjawab: daun sirih, buat kumur dan gusi berdarah.)*
- "Hm." *(Dia mendengus. Kedengarannya puas.)* "Besok tak tanya yang lain."
### T40
- "Wis. Mulai sekarang harga bibit sama kayak orang sini."
- "Ojo seneng dulu. Kalau bibitku mati di tanganmu, harganya naik lagi."
### T60 adegan @Pondok Jamu sore
- *(Sore itu langit mendung. Mbah Darmi berhenti menumbuk, lalu menyuruhmu duduk.)*
- "Bojoku, Mbah Karto. Empat puluh tahun lalu giginya bengkak sampai pipi."
- "Semua jamu wis tak coba. Jalan ke Tanjung Arum putus, banjir. Tiga hari. Terus..."
- *(Dia membuka buku catatan lusuh dan menunjukkan halaman terakhir. Tulisannya gemetar.)*
- *("Gigi bengkak: jamu ora cukup. Harus ke dokter.")*
- "Aku nulis iki sehari setelah dia dikubur. Makanya aku sinis karo dokter kota, Le. Bukan sama kowe. Sama diriku."
### T80
- "Gigiku sing iki wis lama tinggal akar. Ora sakit, tapi ngganjel."
- "Besok-besok aku mampir klinikmu. Ojo bilang Ratna."
- "Coba dulu ada kowe, Le."

## Dimas
### T20
- "Dok, aku mau duduk di kursi yang bisa naik turun itu. Tapi cuma duduk, ya!"
- "Nggak pakai buka mulut. Nggak pakai lampu. Beneran cuma duduk. Janji?"
### T40
- "Dok, kaca kecil itu namanya apa? Kaca mulut? Nggak keren."
- "Aku kasih nama Robo-Kaca. Yang buat nyedot air itu Robo-Sedot. Kalau pakai Robo-Kaca aja, aku mau diperiksa."
### T60 adegan @Rumah Endang
- *(Dimas menarikmu ke pojok, jauh dari mesin jahit ibunya.)*
- "Dok... gigi belakangku sakit tiap malam. Udah lama."
- *(Dia mengeluarkan segenggam bungkus permen dari saku.)*
- "Ini dari laci kaus kaki. Aku nggak bilang Ibu soalnya Ibu pernah nangis gara-gara uang sewa."
- "Jangan bilang Ibu, ya. Eh. Bilang aja, deh. Tapi pelan-pelan bilangnya."
### T80
- "Dok, Dok! Aku gambar Dokter! Ini Dokter Robot Gigi. Tangannya bisa jadi bor, tapi bornya nggak sakit."
- "Nanti aku tempel di klinik, ya. Terus aku nggak jadi insinyur robot. Aku mau jadi dokter gigi aja. Yang robot."

## Bu Endang
### T20
- "Maaf lho, Dok, ganggu. Dimas itu... kalau Dokter nggak keberatan, Ibu ajak lihat-lihat ke klinik."
- "Lihat-lihat saja, nggih. Nggak diapa-apakan. Biar dia tahu dokter gigi itu nggak semuanya kayak dulu."
### T40
- "Dok, jas Dokter itu sudah tipis di siku. Ibu jahitkan seragam klinik, nggih?"
- "Bayarnya nanti dipotong ongkos periksa Dimas."
- "Nggak usah sungkan. Ini barter, bukan minta-minta."
### T60 adegan @Rumah Endang jam21
- *(Sudah jam sepuluh malam. Mesin jahit Bu Endang masih berbunyi. Tangan kirinya memegangi pipi.)*
- "Eh, Dok. Maaf, Ibu kira siapa. Nggak apa-apa, cuma ngilu dikit."
- *(Kamu duduk dan menunggu. Lama dia diam, lalu menghela napas.)*
- "Geraham Ibu kayaknya retak, Dok. Kalau tidur Ibu suka gemeletuk. Tidurnya juga cuma empat jam."
- "Ibu diam soalnya uangnya buat Dimas. Maaf lho, malah curhat."
### T80
- "Dok, kiriman Mas Wahyu telat terus itu ternyata tangannya cedera. Dia malu bilang."
- "Ibu sempat marah. Sekarang Ibu cuma pengin dia pulang."
- "Makasih sudah bantu Ibu sama Dimas. Ini bukan sedekah lho, Dok. Ini namanya tetangga."

## Pak Bowo
### T20
- "Halah. Iya, iya. Dokter lumayan."
- "Lumayan. Bukan bagus. Wis lah, saya mau ke kebun."
### T40
- *(Kamu bertanya soal sekarung kecil kopi di depan pintu klinik tadi pagi. Di karungnya tertulis spidol: KEBUN BOWO.)*
- "Halah. Karung apa? Nggak tahu. Kopi nyasar, mungkin."
- *(Dia langsung sibuk membetulkan capingnya.)* "Kalau nyasar ya diminum. Jangan dikasih susu."
### T60 adegan @Kebun Kopi
- *(Angin lereng menerbangkan caping Pak Bowo. Selembar foto jatuh dari lipatannya: anak perempuan berseragam SD.)*
- *(Dia memungutnya pelan-pelan dan lama tidak bicara.)*
- "Ningsih. Anak saya. Sepuluh tahun nggak telepon."
- "Dulu saya larang dia kuliah. Saya bilang perempuan buat apa sekolah tinggi. Dia pergi malam-malam."
- "Saya salah, Dok. Tapi saya nggak tahu cara bilangnya."
### T80
- "Dok, ikut saya ke Kantor Pos, ya. Saya mau kirim surat ke Ningsih."
- "Tulisan saya jelek. Dokter yang nulis, saya yang tanda tangan. Halah, jangan senyum-senyum."

## Bu Sinta
### T20
- "Nah, Dok, saya mau mengundang secara resmi. Nanti ada Pameran Gigi Sehat di sekolah."
- "Satu, Dokter datang. Dua, bawa gigi-gigian. Tiga, jangan pakai jas putih dulu. Ya, Dok?"
### T40
- "Dok, saya sudah bilang ke anak-anak kelas tiga. Nanti saya bawa mereka periksa ramai-ramai."
- "Kalau ramai-ramai, yang penakut jadi berani. Kecuali Dimas. Dimas tetap sembunyi di belakang Kiki."
### T60 adegan @Perpustakaan
- *(Bu Sinta menutup bukunya, lalu mengeluarkan amplop cokelat dari tas.)*
- "Ini surat mutasi ke Tanjung Arum, Dok. Sudah tiga bulan di laci."
- "Ibu saya di sana sendirian. Makin sering sakit. Tapi murid-murid di sini..."
- "Kalau Dokter, pergi atau tinggal?"
- *(Kamu tidak langsung menjawab. Dia tersenyum kecil.)* "Nggak apa-apa, Dok. Saya juga belum tahu."
### T80
- "Dok, Dokter orang pertama yang saya kasih tahu. Saya tinggal."
- "Ibu saya jemput ke sini. Biar tinggal sama saya."
- "Saya kira betah itu soal kotanya. Ternyata soal orang-orangnya, ya."

## Pak Slamet
### T20
- "Wedang jahe, gorengan dua, kan? Saya sudah hafal, Dok."
- "Tidurnya cukup, Dok? Muka Dokter itu kayak bus jam tiga pagi. Jalan, tapi lampunya redup."
### T40
- "Dok, saya mau ngomong jujur, ya. Monggo didengar, nggak usah dijawab."
- "Kerja itu kayak nyetir malam. Kalau ngantuk, minggir. Jangan nunggu nabrak."
### sikap T40 stres>60
- "Kopi lagi? Nggak, Dok. Ini sudah gelas ketiga. Saya ganti wedang jahe aja, ya. Yang ini gratis."
### T60 adegan @Angkringan
- *(Angkringan sepi. Pak Slamet duduk di sebelahmu dan menuang teh untuk dirinya sendiri.)*
- "Tujuh tahun lalu, Dok. Bus saya bawa dari Metrapura, jam dua pagi. Dada saya kayak dihimpit."
- "Bus hampir masuk jurang. Untung kenek saya narik rem tangan."
- "Sejak itu saya minum obat pengencer darah tiap hari. Cuma Yuni yang tahu. Sekarang Dokter."
- "Kalau suatu hari saya cabut gigi, Dokter jangan lupa, ya. Saya sendiri kadang lupa bilang."
### T80 adegan @Angkringan
- *(Belum jam sembilan, Pak Slamet sudah menurunkan terpal angkringan.)* "Tutup dulu. Ayo, Dok, ikut."
- *(Kalian duduk di Bukit Bintang. Lampu kota kelihatan kecil sekali dari atas.)*
- "Saya dulu kayak Dokter. Gas terus. Ujung-ujungnya badan yang ngerem sendiri."
- "Capek itu boleh, Dok. Asal jangan nunggu badan yang ngerem."

## Kak Tari
### T20
- "Eh, Dok. Dokter nggak marah kan saya jualan gula? Hehe."
- "Eh tapi serius, lho. Saya kepikiran. Masa dokter gigi beli roti di sini tiap hari. Kayak polisi beli di toko maling."
### T40
- "Dok... sebenarnya gigi saya sering ngilu. Kalau minum es, langsung nyut."
- "Jangan ketawa, ya. Tukang roti giginya bolong. Nanti kalau toko sepi, saya mampir klinik, deh."
### T60 adegan @Toko Roti
- *(Kak Tari mengajakmu ke belakang toko dan membuka lemari. Ada seragam koki putih, masih rapi tergantung.)*
- "Lima tahun saya di dapur hotel Metrapura. Bikin croissant tiga ratus biji tiap pagi."
- "Terus Ayah stroke. Saya pulang. Seragamnya saya bawa, nggak tahu buat apa."
- "Hotelnya masih kirim email, lho. Saya masih bales. Eh tapi saya nggak akan pergi, kok."
- "Itu cuma biar saya ngerasa masih punya pilihan. Aneh, ya?"
### T80
- "Dok, Dok! Saya mau bikin Roti Senyum. Gulanya sedikit, tapi tetap enak. Dokter yang jadi tukang cicip."
- "Nanti di Syukuran saya luncurin. Foto Dokter saya pasang di etalase. Nggak boleh nolak. Hehe."

## Mas Ilham
### T20
- "Dok, lihat! Kartu pos dari Tanjung Arum. Ada lautnya."
- "Saya koleksi dari kota-kota yang belum pernah saya datengin. Udah empat puluh tiga."
- "Semua pintu di sini saya hafal. Laut aja yang belum pernah saya ketok."
### T40
- "Siap, Dok! Bocoran dikit: minggu ini kiriman dari Tanjung Arum lancar. Alat aman."
- "Oh iya... ada surat lama juga. Nanti aja, ya. Belum waktunya."
### T60 adegan @Kantor Pos
- *(Mas Ilham menarik laci paling bawah dan mengeluarkan amplop kekuningan. Cap posnya sudah lama.)*
- "Dok, ini surat buat Dokter. Dari Om Darto. Dulu balik ke sini, alamatnya nggak dikenal."
- "Saya simpan terus. Maaf baru sekarang. Saya bingung kapan waktu yang pas."
- *(Kamu membukanya. Tulisannya miring, pakai tinta biru.)*
- *("Dulu orang tuamu yang menolong toko Om waktu hampir bangkrut. Om baca kartumu: kamu mau jadi dokter gigi.")*
- *("Ruko ini cuma bisa jualan gula. Mungkin di tanganmu, ruko ini bisa ganti jualan senyum.")*
- "Surat itu mirip gigi, Dok. Makin lama ditunda, makin nyut-nyutan. Akhirnya sampai juga."
### T80
- "Dok, kalau Dokter ke Tanjung Arum lagi, saya boleh ikut sekali? Pas libur."
- "Saya pengin lihat laut. Sekali aja. Habis itu saya bisa pamer ke adik-adik."

## Kakek Wiryo
### T20
- "Duduk, Nak. Kursi itu sudah setahun kosong."
- "Nggak usah main. Temani saja. Orang tua itu kalau mainnya nggak ditonton, rasanya kayak ngajar kelas kosong."
### T40
- "Aduh, Nak. Sariawan lagi. Gigi palsu ini longgar, bikinan Joni."
- *(Kamu memberi resep salep dan cara merawatnya, lalu menyarankan dia berhenti dulu memakai gigi palsu itu.)*
- "Jadi selama ini salah gigi palsunya, bukan salah umur saya. Hehe. Nanti saya ke klinikmu."
### T60 adegan @Alun-alun
- "Skak, Darto. Kamu dari tadi diam saja. Biasanya kamu..."
- *(Kakek Wiryo berhenti. Tangannya masih memegang kuda catur.)*
- "Maaf, Nak. Saya panggil kamu Darto, ya?"
- *(Dia mengeluarkan buku saku dan membuka halaman pertama.)*
- *("Kalau keponakan Darto datang, ajak main catur. Dia pasti sendirian.")*
- "Saya mulai lupa banyak hal. Makanya saya catat. Tapi yang ini nggak pernah lupa."
### T80
- "Nak, papan ini punya Darto. Tiga puluh tahun kami main di sini."
- "Bawa pulang, pajang di klinikmu atau di rumah. Biar dia ikut lihat kamu kerja."

## Coach Doni
### T20
- "Dok! Tiap sore jam empat di lapangan. Ikut, ya? Yang kalah traktir es teh. Gas!"
### T40
- "Dok, saya titip Andre. Kemarin giginya kena bola lagi. Tolong anak saya. Eh, murid saya."
- "Pokoknya kalau dia ke klinik, Dokter yang pegang. Saya percaya."
### T60 adegan @Lapangan Voli
- *(Semua sudah pulang. Coach Doni duduk di bangku, memijat lututnya, lama tidak bicara.)*
- "Umur dua puluh empat ligamen saya putus, Dok. Sebulan sebelum seleksi nasional."
- "Saya sempat di Metrapura. Malam-malam saya duduk di terminal, nggak tahu mau pulang atau ke mana."
- "Terus saya pulang. Ngelatih anak-anak. Andre giginya patah gara-gara saya maksa latihan pas lapangan basah."
- "Belum berani ngomong ke orang tuanya. Dokter jangan bilang dulu, ya. Saya sendiri yang ngomong."
### T80
- "Dok, Pesta Rakyat nanti ada turnamen. Jadi dokter tim saya, ya?"
- *(Dia mengulurkan sebuah peluit merah.)* "Peluit cadangan. Kalau ada anak yang ngeyel, tiup aja. Ayo!"

## Koh Hendra
### T20
- "Dok, saya kasih tahu, ya. Barang yang bener-bener perlu itu ini, ini, sama ini. Sisanya cuma gaya."
- "Saya jualan, tapi nggak mau Dokter rugi. Om Darto dulu juga saya kasih tahu begitu. Haiya, dia nggak pernah dengar."
### T40
- "Mulai sekarang harga teman, Dok. Lima persen. Rugi, rugi. Tapi teman."
### T60 adegan @Bahari Medika
- *(Koh Hendra mengajakmu ke belakang toko. Dia membuka buku kas tua bersampul kain.)*
- "Ini buku kas papa saya. Lihat tulisan ini. Ini tangan Om Darto. Tiap bulan dia belanja, tiap bulan dia nyatat sendiri."
- "Papa saya dulu janji sama Om Darto. Rimbasari jangan sampai kurang alat."
- "Puskesmas di kota Dokter itu, alatnya saya yang titip. Atas nama papa. dr. Galih nggak tahu."
- "Sekarang ada Dokter. Harga teman jadi sepuluh persen. Itu bukan diskon, Dok. Itu janji."

## Rina
### T60 adegan
- "Dok, ada yang mau saya ceritain. Dari dulu."
- "Waktu Dokter pingsan di ruang sterilisasi Surya, yang telepon ambulans itu saya."
- "Saya nggak pernah bilang. Nggak penting siapa yang telepon."
- "Saya cuma mau lihat Dokter sehat. Itu aja. Makanya saya di sini."

## drg. Hana
### T60 adegan
- *(drg. Hana mengajakmu ke Pondok Jamu. Mbah Darmi sedang menumbuk kunyit.)*
- "Di pulau dulu, Dok, saya pernah punya pasien abses. Kapalnya nggak datang empat hari."
- "Pasiennya selamat. Tapi tiap dengar suara kapal, saya masih deg-degan."
- Mbah Darmi: "Hm. Aku ngerti. Aku karo banjir."
- Mbah Darmi: "Menunggu itu sing paling abot, Nduk. Saiki kowe ora perlu nunggu kapal. Ana dokter cedhak."
- *(drg. Hana tertawa kecil sambil menyeka mata. Sore itu mereka bertukar resep sampai gelap.)*

## drg. Bima
### T60 adegan @Lapangan Voli
- *(drg. Bima baru kalah tiga set dari Coach Doni. Dia duduk di pinggir lapangan, napasnya masih ngos-ngosan.)*
- "Kamu tahu nggak, setelah kamu pergi, saya jadi nomor satu di papan Surya."
- "Hari pertama jadi nomor satu, saya nangis di parkiran. Nggak tahu kenapa."
- "Saya kira saya mau ngalahin kamu. Ternyata saya mau berhenti, tapi nggak tahu caranya."
- "Udah. Jangan dibahas lagi. Besok saya mau balas Coach Doni."
