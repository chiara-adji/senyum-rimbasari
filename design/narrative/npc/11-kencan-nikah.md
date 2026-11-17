# Buku NPC · 11 · Kencan, Lamaran, Pernikahan (Fase 3a-5)

> Status: **Draf 3a-5, 2026-11-16** (usulan ACC user "ACC semua", draf UI ACC "ACC, kerjakan"). Kanon: *Provisional*.
> Lamaran, telepon keluarga, pernikahan, dan momen khas diadaptasi dari bagian "Lamaran & Pernikahan" di [02a-romance-pria.md](02a-romance-pria.md) dan [02b-romance-wanita.md](02b-romance-wanita.md) (tempat, keluarga, dan isi adegan tidak diubah). Yang baru: kencan, kalimat ajakan, dan pecahan halaman maks 120 karakter.
> Dibaca otomatis oleh `tools/gen-npc-data.cjs` → `NPC_NIKAH` di `src/npc-data.js`. Jangan ubah format judul/baris tanpa mengubah parsernya.

## Cara kerja (untuk kode)
- `### ajak` = kalimat pacar waktu dia yang ngajak kencan (♥ di kepala, 3 hari tanpa kencan). Satu baris `"…"` per kalimat, dipilih acak.
- `### kencan @tempat` = adegan kencan di tempat itu (`lereng.bukit`, `kedai`, `alun.angkringan`, `lereng.bunga`). Jam & biaya ada di `CFG.NIKAH` (`src/nikah3a.js`).
  - Baris biasa = halaman adegan. `- tanya: …` = pertanyaan. `- A …` dan `- B …` = dua jawaban `pilihan → reaksi`. Dua-duanya baik (♥ +4 sama), beda reaksi saja.
- `### lamaran @tempat jamNN | teks kartu` = adegan lamaran. `- jawab: "…"` = jawaban pacar saat kamu bilang "Ada yang mau aku omongin" (lalu janji dibuat).
- `### telepon Siapa | asal` = kandidat menelepon keluarganya (kartu telepon, lalu halaman).
- `### nikah | asal keluarga` = upacara di Balai Kota. `### momen` = momen khas setelah upacara.
- `*(…)*` = narasi, `"…"` = ucapan kandidat, `Kamu: "…"` = pemain, `Nama: "…"` = pembicara lain. Nama NPC yang ada di Buku Kenalan tampil dengan potret; nama keluarga (mis. `Ibu Adji`) tampil tanpa potret.
- `## laporan` = baris penutup laporan mingguan Adji (bonus menikah), dipilih acak.
- `## syukuran` = narasi syukuran di Alun-alun setelah upacara (semua kandidat).
- `## toko` = kalimat penjaga toko baru di Tanjung Arum: Ci Lina (Emas Lina, istri Koh Hendra) dan Mbak Yuni (Toserba Samudra, tokoh baru 3a-5).

---

## Adji
### ajak
- "Dok, kalender kamu kosong nggak? Aku udah ngosongin punyaku. Dari tadi pagi. Ayo jalan."
- "Aku hitung-hitung, kita udah tiga hari nggak kencan. Itu defisit. Harus ditutup malam ini."

### kencan @lereng.bukit
- *(Kota kelihatan kecil dari atas. Adji bawa termos dan dua gelas plastik.)*
- "Aku udah cek ramalan cuaca tiga kali. Cerah. Satu-satunya hitungan yang nggak pernah aku ragukan."
- tanya: Adji nunjuk ke langit. "Itu rasi apa, ya?"
- A "Nggak tahu. Kita kasih nama sendiri aja." → "Oke. Namanya Neraca. Soalnya seimbang, kayak kita." *(Dia ketawa sendiri.)* "Garing, ya."
- B "Kayaknya itu Layang-layang." → "Wah, kamu tahu? Aku cuma tahu bintang yang paling terang." *(Dia lirik kamu.)* "Yang ini."

### kencan @kedai
- *(Adji pesan dua kopi susu, lalu ngitung struknya di kepala sebelum Nadia selesai ngetik.)*
- "Total empat puluh delapan ribu. Nadia, aku tahu kamu mau bilang lima puluh. Aku pantau."
- tanya: Adji nyodorin kue terakhir ke kamu. Kamu gimana?
- A "Bagi dua aja." → *(Dia motong kuenya pakai sendok, rapi banget, kayak ngitung pakai penggaris.)* "Lima puluh lima puluh. Adil."
- B *(Ambil kuenya.)* → "Bagus. Kamu makan, aku seneng. Itu prinsip akuntansi yang aku pakai sekarang."

### kencan @alun.angkringan
- *(Pak Slamet nuang wedang jahe. Adji udah habis tiga tusuk sate usus sebelum kamu duduk.)*
- "Jangan bilang Ibu aku makan gorengan malam-malam. Dia punya mata-mata. Namanya Nisa."
- tanya: Pak Slamet nanya kalian udah lama jadian belum.
- A "Belum lama, Pak. Tapi rasanya udah lama." → *(Adji keselek wedang.)* "Kamu nggak boleh ngomong kayak gitu tanpa peringatan."
- B "Rahasia, Pak." → "Nah. Rahasia klien." *(Adji ngedipin mata ke Pak Slamet. Pak Slamet geleng-geleng.)*

### kencan @lereng.bunga
- *(Pagi masih dingin. Adji pakai polo hitam, kali ini rapi tanpa noda.)*
- "Sekar bilang bunga ini namanya telang. Aku nggak ngerti bunga. Tapi warnanya mirip pulpen favoritku."
- tanya: Adji metik bunga, lalu bingung mau diapain.
- A "Selipin di telingaku." → *(Tangannya gemeter dikit.)* "Udah. Jangan gerak. Aku lagi nyimpen gambar ini di kepala."
- B "Jangan dipetik, nanti Sekar marah." → "Aduh. Iya. Barang bukti aku sembunyiin." *(Bunganya masuk saku polo.)*

### lamaran @adji jam13 | Kantor Akuntan Adji · siang
- jawab: "Waduh, mukamu serius. Oke. Jam satu di kantor, ya. Aku siapin kursi yang nggak goyang."
- *(Kamu menyodorkan cincin di meja Adji. Kalkulatornya jatuh ke lantai.)*
- *(Adji diam lama. Belum pernah dia diam selama ini.)*
- "Boleh aku telepon Ibu sekarang? Sekarang banget?"

### telepon Ibu | Tanjung Arum · pakai speaker
- Ibu Adji: "Haaah?! Le! Beneran, Le?!"
- *(Di belakang, Nita dan Nisa ikut menjerit.)*
- "Bu, ini beneran. Bukan lagi proses."
- Ibu Adji: "Mana orangnya? Kasih teleponnya! Nak, kamu udah makan?"

### nikah | Keluarga Adji naik bus pagi dari Tanjung Arum
- *(Ayah, Ibu, Nita, dan Nisa turun dari bus pagi. Ibu Adji bawa rantang katering buat satu kota.)*
- Ibu Adji: "Rantangnya jangan dibuka dulu. Nanti, habis ijab. Nggak boleh ada yang nyomot."
- *(Nisa muter video latihan E5 di depan tamu. Adji nutupin muka pakai dua tangan.)*
- Bu Ratna: "Dari awal saya udah bilang, mereka cocok. Saya yang jodohin, ya. Catat itu."

### momen
- *(Waktu sambutan, Adji coba melawak. Gagal. Dia ketawa sendiri, terus diam sebentar.)*
- "Makasih udah mau sama aku. Aku bakal mastiin kamu makan tiap hari."
- *(Ibunya nangis paling keras.)*

## Arya
### ajak
- "Sore nanti kosong? …Aku mau ngajak kamu. Ke mana aja."
- "Aku udah gambar rutenya. Tinggal kamu mau atau nggak."

### kencan @lereng.bukit
- *(Arya buka buku sketsa. Lampu kota di bawah dia gambar jadi titik-titik kecil.)*
- "Dari sini, kota kelihatan kayak denah. Rumahmu yang itu."
- tanya: Arya nunjuk satu titik di sketsanya.
- A "Gambarin rumah kita sekalian." → *(Dia diam, lalu mulai menggambar. Pelan. Dua jendela.)*
- B "Kok kamu hafal rumahku?" → "…Aku yang cek strukturnya. Dulu." *(Kupingnya merah.)*

### kencan @kedai
- *(Arya pesan kopi hitam. Kamu yang ngobrol, dia yang dengerin sambil ngangguk.)*
- "Lanjut. Aku suka dengerin kamu cerita."
- tanya: Arya kebanyakan diam. Kamu gimana?
- A "Giliran kamu cerita." → "…Oke." *(Dia cerita soal jembatan pertama yang dia bangun. Lima belas menit. Rekor.)*
- B *(Ikut diam, minum kopi bareng.)* → *(Dia senyum. Diam yang nyaman.)* "Ini enak."

### kencan @alun.angkringan
- *(Raka lewat patroli, lihat kalian, terus pura-pura nggak lihat. Gagal.)*
- Ipda Raka: "Selamat malam, warga. Lanjutkan. Saya nggak lihat apa-apa."
- tanya: Raka pergi cengengesan. Arya kelihatan malu. Gimana?
- A "Biarin aja, dia iri." → "…Iya, kayaknya." *(Arya akhirnya ketawa.)*
- B *(Pegang tangan Arya di depan Raka.)* → *(Arya kaku sedetik, terus balas genggam.)* "Besok aku pasti diledekin."

### kencan @lereng.bunga
- *(Arya jongkok ngecek tanah lereng. Kebiasaan.)*
- "Tanahnya bagus. Kalau hujan nggak longsor. Bunganya juga… bagus."
- tanya: Arya kayak mau ngomong sesuatu. Kamu gimana?
- A "Ngomong aja, aku dengerin." → "Aku seneng jalan sama kamu. Itu aja." *(Dia lega udah bilang.)*
- B *(Petik satu bunga, kasih ke dia.)* → *(Dia selipin bunganya di buku sketsa.)* "Aku simpen."

### lamaran @lereng.bukit jam20 | Bukit Bintang · malam
- jawab: "…Oke. Bukit Bintang, jam delapan. Aku datang duluan."
- *(Kamu kasih cincin di Bukit Bintang. Arya nggak langsung jawab.)*
- *(Dia buka buku sketsa, gambar cincin kecil di jendela rumah yang dia rancang.)*
- "Iya."
- "Aku ke Kampung Kali malam ini. Ibu harus dengar langsung. Bukan lewat telepon."

### telepon Ibu | Kampung Kali · naik motor malam itu juga
- *(Arya tetap telepon dulu, cuma buat bilang dia mau datang.)*
- Ibu Arya: "Malam-malam begini? Ada apa, Le? Kamu sakit?"
- "Nggak, Bu. Aku mau nikah."
- Ibu Arya: "…Ya Allah. Cepet ke sini. Ibu masak dulu."

### nikah | Ibu Arya datang dari Kampung Kali bersama tetangga satu RT
- *(Ibu Arya datang bareng tetangga satu RT. Bawa nasi tumpeng.)*
- Bu Ratna: "Lho, Mbak Sum! Ya ampun, ini anakmu? Kok nggak bilang-bilang!"
- *(Ternyata mereka teman lama. Sepanjang acara dua-duanya nggak berhenti ngobrol.)*
- Ipda Raka: "Saudara Arya, Anda berhak diam. Dan memang dari dulu Anda diam terus."
- *(Dimas datang bawa gambar robot pakai helm proyek.)*

### momen
- *(Sambutan Arya cuma satu kalimat.)*
- "Terima kasih. Aku jagain dia."
- *(Semua tamu tepuk tangan. Itu pidato terpanjangnya di depan umum.)*

## Ipda Raka
### ajak
- "Lapor! Hari ini ada operasi khusus. Sasaran: kamu. Tujuan: kencan. Siap?"
- "Saya bebas tugas malam ini. Kalau kamu nggak ada acara, saya kawal ke mana aja."

### kencan @lereng.bukit
- *(Raka bawa senter, padahal bulan terang banget.)*
- "Standar prosedur. Siapa tahu ada kriminal bintang jatuh."
- tanya: Raka nyorotin senter ke langit. Kamu bilang apa?
- A "Matiin dulu, bintangnya kalah terang." → *(Dia matiin senter.)* "Siap. Wah. Iya. Beda." *(Lama dia diam.)*
- B "Kamu takut gelap, ya?" → "Tuduhan serius. Saya minta pengacara." *(Senternya tetap nyala.)*

### kencan @kedai
- *(Raka duduk menghadap pintu. Kebiasaan polisi.)*
- "Maaf, saya harus lihat siapa yang masuk. Bukan nggak mau lihat kamu. Lihat kamu juga, kok. Gantian."
- tanya: Raka sibuk lirik pintu. Kamu gimana?
- A "Tukar kursi, biar aku yang jaga pintu." → "Wah. Itu kalimat paling romantis yang pernah saya dengar." *(Dia beneran pindah.)*
- B "Santai aja, Pak Polisi." → "Siap, santai." *(Lima detik kemudian dia lirik pintu lagi.)*

### kencan @alun.angkringan
- *(Pak Slamet udah hafal pesanan Raka. Gorengan sepuluh, wedang satu.)*
- "Jangan kasih tahu Ayah saya makan begini. Beliau masih ngira saya diet."
- tanya: Raka nawarin gorengan terakhir. Kamu gimana?
- A *(Ambil, belah dua, kasih setengah ke dia.)* → "Berbagi barang bukti. Kamu sekarang terlibat." *(Dia ketawa.)*
- B "Kamu aja yang makan." → "Siap. Tapi ini tercatat sebagai kebaikanmu." *(Dia makan pelan-pelan.)*

### kencan @lereng.bunga
- *(Pagi-pagi Raka udah rapi, seragamnya disetrika licin.)*
- "Habis ini saya apel. Tapi saya pengin lihat kamu dulu. Laporan pagi."
- tanya: Raka berdiri tegak di depan kamu. Kamu gimana?
- A *(Benerin kerah seragamnya.)* → *(Dia nahan napas.)* "Terima kasih. Hari ini saya nggak bakal bisa fokus."
- B "Laporan diterima, Ipda." → "Siap!" *(Dia hormat, terus nyengir sampai ke Pos.)*

### lamaran @polisi jam12 | Pos Polisi · siang
- jawab: "Siap. Saya tunggu di Pos jam dua belas. Ini bukan tilang, kan?"
- *(Kamu kasih cincin di Pos Polisi. Raka berdiri, hormat, terus duduk lagi. Lututnya lemas.)*
- "Diterima. Eh, maksudnya saya yang terima. Iya."
- "Saya… telepon Ibu dulu, ya."

### telepon Ibu | Metrapura
- Ibu Raka: "Raka? Ada apa siang-siang? …Hah? Sebentar. Ayah! Ayah, ini Raka."
- *(Hening sebentar.)*
- Kombes Darmawan: "Bawa dia ke rumah."
- *(Raka butuh lima menit sebelum bisa ngomong lagi.)*

### nikah | Keluarga Raka datang dari Metrapura, berseragam dinas
- *(Ayah, ibu, dan dua kakak Raka turun dari bus, semuanya berseragam dinas.)*
- *(Rekan-rekan dari Pos Polisi berbaris di depan Balai Kota.)*
- Coach Doni: "Aku di kanan. Aku yang lebih tinggi."
- Arya: "…Aku yang datang duluan."
- *(Doni dan Arya rebutan jadi pendamping di sebelah kanan.)*

### momen
- Kombes Darmawan: "Polisi kota kecil. Ternyata cocok buat kamu."
- *(Beliau jabat tangan Raka lama sekali.)*
- *(Pertama kalinya Raka nggak punya lelucon buat jawab.)*

## dr. Galih
### ajak
- "Kalau kamu ada waktu, saya ingin ngajak kamu keluar. Kalau tidak, juga nggak apa-apa. Tapi semoga ada."
- "Saya baru tidur enam jam. Rekor. Saya ingin merayakannya sama kamu."

### kencan @lereng.bukit
- *(Galih bawa termos teh melati dan selembar kertas resep yang dilipat.)*
- "Saya nulis sesuatu. Tapi saya belum berani baca."
- tanya: Galih megang kertas resep itu erat-erat.
- A "Simpan dulu. Bacain kalau udah siap." → *(Dia lega.)* "Terima kasih. Kamu selalu tahu kapan saya butuh waktu."
- B "Sini, aku yang baca." → *(Dia nyerahin pelan-pelan. Isinya satu baris tentang kamu.)* "…Jangan ketawa."

### kencan @kedai
- *(Galih pesan teh, bukan kopi. Nadia udah nyiapin sebelum dia ngomong.)*
- "Saya ke sini tiap sore. Tapi baru kali ini nggak sendirian."
- tanya: Galih kelihatan capek habis jaga. Kamu gimana?
- A "Habis ini kamu tidur. Itu resep dari dokter gigi." → *(Dia ketawa kecil.)* "Resep diterima. Saya patuh."
- B *(Pesan kue buat dia.)* → "Wulan pasti senang lihat saya makan." *(Dia habisin kuenya.)*

### kencan @alun.angkringan
- *(Galih jarang ke Angkringan. Dia duduk kaku, lihat gorengan kayak lihat hasil lab.)*
- "Kolesterolnya… ah, sudahlah. Malam ini saya libur jadi dokter."
- tanya: Galih ragu ambil gorengan. Kamu bilang apa?
- A "Satu aja. Aku saksinya." → *(Dia ambil satu.)* "Kalau saya kena kolesterol, kamu ikut tanggung jawab."
- B "Wedang jahe aja, biar anget." → "Itu pilihan yang lebih sehat. Kamu ngerti saya." *(Dia senyum.)*

### kencan @lereng.bunga
- *(Pagi, sebelum Puskesmas buka. Galih jalan pelan di antara bedeng bunga.)*
- "Waktu kuliah saya nggak pernah lihat pagi kayak gini. Selalu dari jendela rumah sakit."
- tanya: Galih berhenti di depan bedeng melati.
- A "Mulai sekarang, lihat dari sini aja." → "…Iya. Dari sini. Sama kamu."
- B "Ambil satu, taruh di meja Puskesmas." → *(Dia petik satu dengan hati-hati.)* "Wulan pasti nanya dari siapa."

### lamaran @puskes jam21 | Puskesmas · jaga malam
- jawab: "Saya jaga malam nanti. Datang saja ke Puskesmas, jam sembilan. Saya… penasaran."
- *(Kamu kasih cincin di Puskesmas, waktu Galih jaga malam.)*
- "Kamu yakin?"
- Kamu: "Yakin."
- "Saya cek dua kali, ya. Yakin?"
- *(Dia ketawa, lalu mengangguk.)*

### telepon Ibu | Metrapura · pagi-pagi
- *(Pagi-pagi Galih menelepon ibunya di Metrapura.)*
- Ibu Galih: "Dia yang di puisi-puisimu itu, Nak?"
- "…Iya, Bu."
- Ibu Galih: "Ibu udah tahu dari lama. Ibu tunggu kalian."

### nikah | Ibu Galih datang dari Metrapura membawa keyboard kecil
- *(Ibu Galih datang dari Metrapura, bawa keyboard kecil. Dia main satu lagu waktu pengantin masuk.)*
- Wulan: "Dok Galih, makan dulu. Ini perintah. Bukan saran."
- *(Mbah Darmi bawa jamu buat pengantin.)*
- Mbah Darmi: "Diminum. Biar kuat. Jangan nanya isinya."

### momen
- *(Galih bacain satu puisi yang dia tulis di kertas resep. Suaranya gemeter di baris kedua.)*
- *(Ibunya pelan-pelan ikut main nada di keyboard.)*

## Sekar
### ajak
- "Saya… boleh ngajak kamu jalan? Kalau kamu sibuk, saya bisa nunggu."
- "Saya udah nulis rencana kencan. Tiga halaman. Tapi yang penting cuma satu baris: sama kamu."

### kencan @lereng.bukit
- *(Sekar bawa selimut dan buku puisi. Dia bacanya pelan, takut ganggu bintang.)*
- "Waktu kecil, Tante Lies bilang bintang itu huruf. Kalau dirangkai, jadi cerita."
- tanya: Sekar nanya kamu mau dengar cerita apa.
- A "Cerita yang kamu tulis sendiri." → *(Dia diam, lalu mulai cerita soal Telang. Pelan-pelan.)*
- B "Cerita tentang kita." → *(Mukanya merah.)* "…Itu belum selesai ditulis."

### kencan @kedai
- *(Nadia ngedipin mata ke Sekar dari balik meja. Sekar pura-pura nggak lihat.)*
- "Nadia dari tadi ngeledek saya. Maaf, ya."
- tanya: Sekar pegang cangkirnya erat-erat.
- A "Aku seneng kok diledekin bareng kamu." → *(Dia akhirnya senyum lebar.)* "Saya juga."
- B *(Lambaikan tangan ke Nadia.)* → *(Nadia teriak "Cieee!" dari meja bar.)* "Ya ampun." *(Sekar nutupin muka.)*

### kencan @alun.angkringan
- *(Pertama kali Sekar ke Angkringan malam-malam. Dia duduk rapi banget, kayak di perpustakaan.)*
- "Ramai, ya. Saya biasanya jam segini udah di rumah."
- tanya: Sekar kelihatan canggung. Kamu gimana?
- A "Kalau nggak nyaman, kita jalan aja." → "Nggak apa-apa. Sama kamu, saya nyaman." *(Dia pesan wedang jahe.)*
- B *(Ajak dia ngobrol sama Pak Slamet.)* → *(Pak Slamet cerita soal bus. Sekar ketawa sampai lupa malu.)*

### kencan @lereng.bunga
- *(Kebun Sekar pagi-pagi. Embun masih nempel di daun.)*
- "Ini bedeng telang. Saya tanam waktu pertama pindah ke sini."
- tanya: Sekar nyodorin sekop kecil. Kamu gimana?
- A *(Ikut nanam satu bibit.)* → "Nanti kalau berbunga, itu punya kita berdua."
- B "Aku lihat aja, takut salah." → "Nggak bisa salah. Tanah selalu maafin." *(Dia pegang tanganmu, ngajarin pelan.)*

### lamaran @perpus jam16 | Perpustakaan · sore
- jawab: "Iya. Saya di perpustakaan sampai sore. Datang jam empat, ya. Saya… penasaran."
- *(Kamu nyelipin cincin di halaman buku yang lagi dia baca.)*
- *(Sekar balik halaman, berhenti, lalu natap kamu lama sekali.)*
- "Saya… boleh nangis dulu?"

### telepon Ibu | Metrapura, lalu Tante Lies di Tanjung Arum
- *(Sekar nelepon ibunya, terus Tante Lies.)*
- Ibu Sekar: "Yang dokter gigi itu?"
- Tante Lies: "Yang dokter gigi itu, kan? Tante udah tahu. Tante cuma nunggu kamu bilang."

### nikah | Orang tua dari Metrapura, Tante Lies dari Tanjung Arum
- *(Orang tua Sekar datang dari Metrapura. Tante Lies dari Tanjung Arum, bawa bibit telang.)*
- Tante Lies: "Dulu kamu kecil banget, nangis kalau bunganya layu. Sekarang lihat."
- Bu Ratna: "Saya… saya bacain ucapan, ya. Pelan-pelan. Jangan diketawain."
- *(Bu Ratna baca kartu ucapan, terbata-bata. Seisi Balai Kota diam dengerin.)*

### momen
- *(Sekar nggak sanggup bikin pidato. Dia cuma baca satu kalimat dari buku catatannya.)*
- "Cerita saya yang paling bagus, ternyata bukan yang saya tulis."

## Nadia
### ajak
- "Hari ini aku tutup kedai lebih cepet! Bercanda. Tapi abis tutup, kita jalan, ya!"
- "Aku butuh juri buat racikan baru. Jurinya harus kamu. Sekalian kencan. Dua kerjaan, satu jalan."

### kencan @lereng.bukit
- *(Nadia bawa termos kopi racikan sendiri. Belum dikasih nama.)*
- "Coba. Jangan bilang enak kalau nggak enak. Aku butuh jujur."
- tanya: Kopinya agak pahit. Kamu bilang apa?
- A "Pahit, tapi aku suka." → "Kayak aku, ya? Hahaha!" *(Dia nyenggol bahumu.)*
- B "Tambah gula dikit." → *(Dia langsung nyatat di tangan pakai pulpen.)* "Noted! Kamu emang juri terbaik."

### kencan @kedai
- *(Kedai udah tutup. Nadia nyalain satu lampu doang, terus masak indomie di belakang.)*
- "Ini menu rahasia. Cuma buat pelanggan paling spesial. Yaitu kamu. Doang."
- tanya: Nadia nunggu reaksi kamu nyobain. Kamu gimana?
- A "Lebih enak dari kopi kamu." → "Heh! Itu penghinaan!" *(Dia ketawa sampai nyender ke meja.)*
- B *(Habisin tanpa ngomong.)* → "Nah, itu jawaban paling jujur." *(Dia nambahin telur.)*

### kencan @alun.angkringan
- *(Nadia ngobrol sama Pak Slamet soal biji kopi. Semangat banget.)*
- "Pak Slamet tuh harusnya jadi barista. Lidahnya peka banget!"
- tanya: Nadia lupa kamu masih di situ. Kamu gimana?
- A *(Dengerin aja sambil senyum.)* → *(Dia nyadar.)* "Aduh, maaf! Aku kebablasan." *(Dia pegang tanganmu.)* "Makasih udah sabar."
- B "Ehem. Pacarnya di sini." → "Iya, iya! Pacarku yang paling ganteng!" *(Pak Slamet geleng-geleng.)*

### kencan @lereng.bunga
- *(Habis dari Kebun Kopi Pak Bowo, Nadia mampir ke Kebun Bunga. Tangannya masih bau kopi.)*
- "Pak Bowo marahin aku lagi. Tapi katanya biji kopiku udah lumayan. Lumayan, lho!"
- tanya: Nadia girang banget. Kamu bilang apa?
- A "Aku bangga sama kamu." → *(Dia diam sebentar, matanya berkaca-kaca.)* "Jarang ada yang bilang gitu."
- B "Lumayan itu pujian tertinggi Pak Bowo." → "Iya kan?! Aku tahu!" *(Dia lompat kecil.)*

### lamaran @kedai jam21 | Kedai Kopi Seduh · malam, sebelum tutup
- jawab: "Hmm? Oke! Mampir ke kedai jam sembilan, sebelum tutup. Ada apa sih? Penasaran!"
- *(Kamu taruh cincin di dasar cangkir kopi yang udah kosong.)*
- *(Nadia bersihin cangkirnya, nemu cincin itu, terus teriak.)*
- Adji: "Ada apa?! Ada maling?!"
- *(Adji lari dari kantor sebelah.)*

### telepon Mama | Metrapura
- *(Nadia nelepon mamanya. Tangannya gemeter.)*
- "Ma. Aku nggak pulang ke Metrapura. Aku nikah di sini."
- Mama Nadia: "…Kamu yakin? Sama siapa?"
- "Sama orang yang suka kopiku, Ma. Bahkan yang pahit."

### nikah | Orang tua dan kakak datang dari Metrapura
- *(Orang tua dan kakak Nadia datang dari Metrapura. Mamanya cemberut dari awal.)*
- *(Lalu mamanya nyobain kopi buatan Nadia buat para tamu. Dia diam.)*
- *(Pak Bowo datang pakai batik yang udah sempit, bawa sekarung biji terbaik.)*
- Pak Bowo: "Duduk di mana keluarganya? Sini. Saya juga keluarga."

### momen
- Mama Nadia: "Kopimu… enak, Nak."
- *(Nadia nangis di balik meja bar. Kopinya tetap dia tuang sampai cangkir terakhir.)*

## Laras
### ajak
- "Aku punya rol film sisa satu. Mau aku habisin buat kamu. Jalan, yuk!"
- "Bapak bilang aku harus keluar rumah. Katanya aku kebanyakan ngomongin kamu. Jadi, ayo!"

### kencan @lereng.bukit
- *(Laras pasang tripod. Dia mau motret bintang, tapi lensanya terus ngarah ke kamu.)*
- "Bintangnya nggak mau senyum. Kamu aja, deh."
- tanya: Laras siap motret. Kamu gimana?
- A "Kali ini kamu yang difoto." → *(Dia kaget. Kamu pencet tombolnya.)* "Ih! Aku belum siap!" *(Fotonya bagus banget.)*
- B *(Senyum ke kamera.)* → *(Klik.)* "Ini masuk album. Album yang nggak boleh dilihat siapa-siapa."

### kencan @kedai
- *(Laras motret cangkir kopi, lalu tangan kamu, lalu muka kamu yang lagi bingung.)*
- "Maaf, kebiasaan. Kalau ada yang bagus, harus disimpan."
- tanya: Laras nyodorin kamera ke kamu. Kamu gimana?
- A *(Foto dia lagi ketawa.)* → "Aku jarang di foto. Makasih." *(Dia lihat hasilnya lama.)*
- B "Foto kita berdua aja." → *(Dia pasang timer.)* "Satu, dua…" *(Kalian dua-duanya ketawa pas klik.)*

### kencan @alun.angkringan
- *(Laras motret Pak Slamet lagi nuang wedang. Lampu minyaknya bikin fotonya hangat.)*
- "Foto ini nanti aku kasih ke Pak Slamet. Dia belum punya foto di angkringannya sendiri."
- tanya: Laras semangat motret warga. Kamu bilang apa?
- A "Kamu bikin kota ini keinget sama dirinya sendiri." → *(Dia diam.)* "…Itu kalimat paling bagus yang pernah aku dengar."
- B "Habis ini makan dulu, ya." → "Iya, iya. Satu foto lagi!" *(Lima foto lagi.)*

### kencan @lereng.bunga
- *(Pagi. Laras bawa kamera tua milik bapaknya.)*
- "Ini kamera Bapak. Hari ini aku mau motret pakai cara dia. Pelan."
- tanya: Laras nyuruh kamu berdiri di antara bunga.
- A *(Berdiri diam, senyum.)* → *(Dia nunggu cahaya pas, lama, lalu klik.)* "Bapak pasti suka."
- B "Kamu juga masuk frame." → *(Dia pasang timer, lari ke sampingmu.)* "Aku masuk foto! Lagi!"

### lamaran @studio jam12 | Studio Foto Lensa · siang
- jawab: "Sesi foto? Boleh! Datang ke studio jam dua belas. Gratis buat kamu, hehe."
- *(Kamu pesan sesi foto. Begitu Laras ngintip lewat jendela bidik, kamu udah berlutut bawa cincin.)*
- *(Jarinya kaku di tombol. Kameranya terus motret. Dua puluh foto beruntun.)*
- "Pak! Pak! Aku dilamar!"

### telepon Bapak | Rumah di Rimbasari · Laras lari ke dalam
- *(Laras nggak nelepon. Dia lari ke dalam, bangunin bapaknya.)*
- Pak Harto: "Hah? Siapa yang dilamar?"
- "Aku, Pak! Aku!"
- Pak Harto: "…Akhirnya ada yang motret kamu, Nak."

### nikah | Pak Harto datang dengan tongkat, dibantu Mas Ilham
- *(Pak Harto datang pakai tongkat, dibantu Mas Ilham.)*
- Mas Ilham: "Tahan, Kak! Eh, Laras! Eh, Bu! Senyum!"
- *(Hari itu Ilham pegang kamera Laras. Pameran Foto Warga dipasang lagi di sekeliling Alun-alun.)*

### momen
- *(Laras bawa foto pernikahan pertamanya ke dekat wajah bapaknya.)*
- Pak Harto: "Kamu senyum, ya? Kelihatan dari sini."

## Wulan
### ajak
- "Saya libur jaga malam ini. Kalau kamu mau, kita jalan. Tapi pulangnya jangan kemalaman."
- "Dok, kamu kelihatan capek. Itu diagnosis. Resepnya: jalan sama saya."

### kencan @lereng.bukit
- *(Wulan bawa jaket, satu buat dia, satu buat kamu. Dia udah ngecek suhu.)*
- "Di atas dingin. Pakai ini. Jangan bantah bidan."
- tanya: Wulan nyodorin jaket. Kamu gimana?
- A *(Pakai, terus duduk deket dia.)* → "Nah. Gitu." *(Dia nyender ke bahumu. Pertama kalinya.)*
- B "Kamu aja yang pakai dua." → "Ngeyel." *(Dia makein jaketnya sendiri ke kamu.)*

### kencan @kedai
- *(Wulan pesan teh hangat. Dia baru selesai jaga, matanya merah.)*
- "Maaf saya kucel. Tadi ada persalinan. Lancar. Bayinya perempuan."
- tanya: Wulan kelihatan capek, tapi senang.
- A "Ceritain bayinya." → *(Dia cerita sampai tehnya dingin. Matanya berbinar.)*
- B "Kamu juga harus istirahat." → "Iya, Dok. Kamu mirip saya kalau ngomel." *(Dia senyum.)*

### kencan @alun.angkringan
- *(Wulan ngecek tensi Pak Slamet dulu sebelum duduk. Refleks.)*
- "Pak, garamnya dikurangi. Saya serius."
- tanya: Wulan masih kerja padahal lagi kencan.
- A "Malam ini kamu libur, Bu Bidan." → *(Dia ketawa kecil.)* "Iya. Maaf. Susah berhenti."
- B *(Bantu dia nyatat tensi Pak Slamet.)* → "Kamu ngerti saya." *(Dia nulis angka di buku kecilnya, lalu nutup.)* "Udah. Sekarang kencan."

### kencan @lereng.bunga
- *(Pagi, sebelum posyandu. Wulan jalan pelan, nggak buru-buru buat sekali ini.)*
- "Di Dusun Atas, pagi kayak gini Ibu udah di kebun sayur. Saya kangen."
- tanya: Wulan cerita soal Dusun Atas. Kamu bilang apa?
- A "Nanti kita ke sana bareng." → *(Dia diam, lalu ngangguk.)* "Ibu pasti masak banyak banget."
- B "Kamu kangen pulang?" → "Kadang. Tapi di sini juga rumah sekarang." *(Dia lirik kamu.)*

### lamaran @puskes jam16 | Depan Puskesmas · selesai jaga
- jawab: "Jam empat jaga saya selesai. Tunggu di depan Puskesmas, ya. Antar saya pulang."
- *(Kamu nunggu di depan Puskesmas, lalu antar Wulan pulang lewat jalan yang benar.)*
- *(Di depan pintu rumah dinas, kamu kasih cincin.)*
- *(Wulan lihat cincinnya, lalu jam tangannya, lalu kamu.)*
- "Saya belum tidur dua puluh jam. Kalau besok saya lupa jawab, ingetin, ya. Jawabannya iya."

### telepon Ibu | Dusun Atas · pagi-paginya
- *(Pagi-paginya Wulan nelepon ibunya di Dusun Atas sambil nangis.)*
- Ibu Wulan: "Nduk? Kenapa nangis? Ada yang sakit?"
- "Nggak, Bu. Saya mau nikah."
- Ibu Wulan: "…Gusti. Bapak! Bapak, anakmu mau nikah!"

### nikah | Keluarga turun dari Dusun Atas membawa sayur
- *(Keluarga Wulan turun dari Dusun Atas, bawa sayur hasil kebun buat satu kota.)*
- *(Ibu-ibu dari desa sekitar datang gendong anak-anak yang dulu Wulan bantu lahirkan.)*
- dr. Galih: "Hadirin, mohon tenang. Hari ini, Bu Bidan yang disuruh makan."
- Wulan: "Dok Galih. Jangan macam-macam."

### momen
- *(Wulan buka buku catatan bayinya. Ada halaman baru di belakang, masih kosong.)*
- "Halaman ini buat kamu. Tiap minggu, tulis satu hal. Jangan sampai bolong."

## laporan
- "Jangan lupa makan siang. Aku cek."
- "Catatan: pengeluaran kopi naik. Itu salahku. Aku traktir kamu terus."
- "Saldo aman. Kamu juga harus aman. Tidur sebelum jam sebelas."
- "Minggu ini bagus. Kamu hebat. Ini bukan angka, ini pendapat pribadi."

## syukuran
- *(Habis ijab, semua pindah ke Alun-alun. Pak Slamet buka angkringan gratis sampai sore.)*
- *(Pak Harjo potong tumpeng. Bu Ratna sibuk ngatur antrian piring, padahal nggak ada yang nyuruh.)*
- *(Dimas lari keliling bawa balon. Kakek Wiryo nyalamin kamu dua kali, lupa udah salaman.)*

## toko
- Ci Lina: "Mau lihat-lihat, Dok? Kalung ini baru datang dari Metrapura. Cocok buat yang spesial."
- Ci Lina: "Koh Hendra kalau jual alat masih bisa ditawar. Kalau emas, harga pas. Kuncinya saya yang pegang."
- Ci Lina: "Cincin lamaran? Wah, siapa orangnya, Dok? Saya janji nggak cerita ke Bu Ratna. Mungkin."
- Mbak Yuni: "Selamat datang di Samudra! Cari apa, Kak? Baju, parfum, raket, ada semua. Yang nggak ada cuma diskon."
- Mbak Yuni: "Parfum yang itu laris, Kak. Kemarin bapak-bapak beli tiga botol. Katanya buat istri. Saya nggak nanya istri yang mana."
- Mbak Yuni: "Bingung cari hadiah? Tanya saya aja. Saya hafal selera orang sini dari belanjaannya."
