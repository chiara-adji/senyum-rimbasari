# Buku NPC · 09 · Event Romance E1–E5 (Fase 3a-4)

> Status: **Draf 3a-4, 2026-11-15** (usulan & draf UI ACC user 2026-11-15). Kanon: *Provisional*.
> Isi diadaptasi dari bagian "Arc Romance" di [02a-romance-pria.md](02a-romance-pria.md) dan [02b-romance-wanita.md](02b-romance-wanita.md) (judul, tempat, tiga respons, dan arah reaksinya tidak diubah). Yang baru: kalimat ajakan dan pecahan halaman maks 120 karakter.
> Dibaca otomatis oleh `tools/gen-npc-data.cjs` → `NPC_EVENTS` di `src/npc-data.js`. Jangan ubah format judul/baris tanpa mengubah parsernya.

## Cara kerja (untuk kode)
- `### E1 Judul @tempat jam17 [syarat] | teks tempat di kartu judul`.
  - `@tempat` = kunci tempat game (sama dengan `NPC_PLACE`/pintu di `src/npc3a.js`; `niaga.janji` ditambah di `src/hubungan3a.js`). NPC berjalan ke sana dan menunggu 2 jam mulai `jamNN`.
  - Syarat: `hujan` (Musim Hujan), `stres>60`, `hari:14` (hari ajakan: digit 0 Senin … 6 Minggu).
- `- ajak: "…"` = kalimat ajakan saat ♥ (pilihan Boleh / Lain kali).
- `*(…)*` = narasi, `"…"` = ucapan kandidat, `Nama: "…"` = pembicara lain.
- `- tanya: …` = pertanyaan di panel pilihan.
- `- +15 / +5 / -10 pilihan → reaksi`. Pilihan berupa ucapan `"…"` atau tindakan `*(…)*`. Urutan diacak di game.
- E5 +15/+5 = Pacaran; E5 -10 = belum pacaran (GDD §9, E5 gagal).

---

## Adji
### E1 Struk Berantakan @klinik jam17 | Klinik · sore, setelah tutup
- ajak: "Dok, nanti sore aku mampir ke klinik, ya? Jam lima. Aku bawa kopi dua. Satu buat kamu. Yang satu juga buat kamu, sih."
- *(Adji datang bawa dua gelas kopi. Matanya langsung nyangkut di kardus struk di pojok.)*
- *(Dia tahan sekitar tiga detik.)*
- "Dok. Boleh aku rapikan? Ini bikin aku nggak bisa tidur. Serius."
- tanya: Adji pengin ngerapiin struk klinik. Kamu jawab apa?
- +15 "Ajarin aku aja, biar aku bisa sendiri." → *(Dia girang sampai kopinya hampir tumpah.)* "Serius? Oke. Pelajaran satu: struk itu bukan sampah."
- +5 "Wah, makasih. Tolong ya." → *(Dia merapikan sambil bersenandung. Senang, tapi kelihatan sedikit kecewa.)*
- -10 "Nggak usah, aku bisa sendiri." → "Oh. Iya, iya. Maaf, kebiasaan." *(Dia pulang. Kopinya masih penuh.)*

### E2 Polo Hitam Ketujuh @kedai jam12 | Kedai Kopi Seduh · siang
- ajak: "Dok, besok… eh, nanti siang makan bareng, yuk? Jam dua belas di Kedai. Aku yang traktir. Udah aku anggarkan."
- *(Lima menit sebelum janji, kopi Nadia tumpah ke polo hitam Adji. Polo ketujuh. Satu-satunya yang masih bersih.)*
- *(Kamu menemukan dia lagi ngelap baju pakai tisu, panik.)*
- "Jangan lihat! Eh, udah lihat. Ya udah. Ini noda kopi, bukan noda moral, ya."
- tanya: Polonya kena kopi tepat sebelum makan siang. Kamu bilang apa?
- +15 "Pakai polo kotor juga nggak apa-apa. Aku ke sini mau ketemu kamu, bukan bajumu." → *(Dia diam. Kupingnya merah.)* "…Oke. Itu kalimat bagus. Aku curi, ya."
- +5 *(Ketawa, lalu bantu ngelap.)* → "Aduh, malu-maluin." *(Makan siangnya tetap jalan, dan seru.)*
- -10 "Kok bisa sih? Ceroboh banget." → "Iya, emang." *(Sepanjang makan siang dia nutupin noda itu pakai tangan.)*

### E3 Lembur Akhir Bulan @adji jam20 | Kantor Akuntan · malam, akhir bulan
- ajak: "Dok, nanti malam aku lembur. Akhir bulan. Kalau kamu lewat jam delapan, mampir, ya? Aku butuh saksi aku masih hidup."
- *(Lampu kantor masih nyala. Adji dikelilingi map, rambutnya acak-acakan. Dia lagi ngobrol sama kalkulator.)*
- *(Pas istirahat makan, kamu iseng nanya kenapa dia belum pernah pacaran. Gosip Bu Ratna.)*
- "Hahaha. Oke. Waktu SMA aku bacain puisi lucu buat Rini, di depan sekelas. Dia bilang, 'Kamu kan temen, Dji.'"
- "Satu kelas inget sampai sekarang. Hahaha. Lucu, kan?" *(Tawanya agak kaku.)*
- tanya: Adji cerita soal Rini sambil ketawa. Kamu jawab apa?
- +15 "Aku nggak bakal ketawa kalau kamu serius." → *(Dia berhenti ketawa.)* "…Itu yang pengin aku denger dari dulu, kayaknya."
- +5 "Ya ampun, itu kan udah lama." → "Iya, ya. Udah lama banget." *(Dia lega, lalu ganti topik.)*
- -10 *(Ikut ketawa keras.)* "Puisi? Di depan kelas? Ya pantes!" → *(Dia tetap ketawa, tapi lebih cepat balik ke mapnya.)*

### E4 "Kamu Udah Makan?" @klinik jam12 stres>60 | Klinik · siang
- ajak: "Dok, siang ini aku ke klinik, ya. Jam dua belas. Nggak usah nanya kenapa. Pokoknya siapin meja kosong."
- *(Adji datang bawa rantang. Resep katering ibunya.)*
- *(Ada telur dadar yang dia coba bentuk kayak gigi. Gagal total. Bentuknya kayak awan.)*
- "Udah berhari-hari mukamu makin capek. Aku nggak buta, lho. Jadi aku tanya sekali aja. Kamu udah makan?"
- tanya: Adji nanya kamu udah makan. Kamu jawab apa?
- +15 "Belum. Dan jujur, aku capek banget." → *(Dia duduk, buka rantang, dan biarin kamu ngomong sampai selesai.)* "Makasih udah nggak bohong."
- +5 "Udah kok, tadi." → "Bohong. Itu telur gigi, aku bikinnya dua jam. Makan." *(Dia tetap nyodorin sendok.)*
- -10 "Aku sibuk, nanti aja." → *(Dia naruh rantang di meja.)* "Oke. Dipanasin dulu, ya." *(Dia pergi tanpa melawak.)*

### E5 Neraca Hati @lereng.bukit jam20 | Bukit Bintang · malam
- ajak: "Dok. Nanti malam jam delapan, Bukit Bintang. Aku mau ngomong sesuatu. Udah aku latih. Seminggu. Jangan ketawa dulu."
- *(Adji udah latihan ngomong di depan cermin seminggu. Adiknya merekam dan nyebarin videonya ke grup keluarga.)*
- *(Sampai di atas bukit, dia lupa semuanya. Akhirnya dia ngeluarin kertas. Bentuknya neraca.)*
- *(Kolom Aset: hal-hal yang dia suka dari kamu. Kolom Kewajiban cuma satu baris: "Bilang sekarang.")*
- "Saldo akhirnya… aku suka kamu. Ini nggak bercanda. Sumpah. Aku udah ngecek dua kali."
- tanya: Adji nyodorin neraca hatinya. Kamu jawab apa?
- +15 *(Ambil pulpennya, lalu tulis neraca balasan.)* → *(Dia membacanya dua kali.)* "Seimbang. Ya ampun. Seimbang."
- +5 "Kamu serius, kan? …Iya. Aku mau." → *(Dia menghela napas panjang, lalu ketawa sampai keluar air mata.)*
- -10 "Kamu bercanda lagi, ya?" → *(Dia melipat kertasnya pelan.)* "Nggak. Tapi nggak apa-apa."

## Arya
### E1 Cek Struktur Ruko @klinik jam7 | Klinik · pagi, sebelum buka
- ajak: "Besok pagi. Jam tujuh. Klinik. Ada retak di dinding samping. Aku cek."
- *(Arya datang bawa senter. Tanpa basa-basi dia ngetuk-ngetuk dinding.)*
- "Ada retak di sini. Rambut. Lebar 0,3 mili. Boleh aku cek?"
- *(Lima belas menit dia memeriksa. Nggak ngomong sepatah kata pun.)*
- tanya: Arya selesai memeriksa dinding. Kamu bilang apa?
- +15 "Ceritain dong apa yang kamu lihat. Aku pengin ngerti." → *(Dia menggambar penampang dinding di balik kalender klinik, lalu menjelaskannya pelan-pelan.)*
- +5 "Makasih, ya. Aman, kan?" → "Aman." *(Lalu dia pamit.)*
- -10 "Siapa yang nyuruh kamu masuk?" → "Maaf." *(Dia meninggalkan catatan teknis di meja, lalu pergi.)*

### E2 Jembatan Kali @lereng.bukit jam17 | Bukit Bintang · sore
- ajak: "Jam lima sore. Bukit Bintang. Ada yang mau aku tunjukin. Dari atas kelihatan jelas."
- *(Dari atas bukit Arya menunjuk jembatan Kampung Kali di bawah.)*
- "Itu jembatan pertama yang aku rancang. Tiga bentang. Fondasinya dua belas meter."
- *(Lama dia diam. Lalu dia cerita soal banjir waktu umurnya sembilan. Rumahnya hanyut.)*
- tanya: Arya baru cerita soal banjir waktu kecil. Kamu bilang apa?
- +15 "Berarti semua yang kamu bangun itu janji buat kamu yang umur sembilan, ya." → *(Dia menatapmu lama.)* "…Iya. Belum pernah ada yang ngomong gitu."
- +5 "Jembatannya bagus." → "Makasih." *(Dia senang, tapi nggak cerita lebih jauh.)*
- -10 "Banjirnya udah lama banget, kan?" → *(Dia menutup buku sketsanya.)*

### E3 Lereng Saat Hujan @lereng.proyek jam19 hujan | Lereng Bukit · malam, hujan deras
- ajak: "Malam ini aku di lereng. Pasang patok. Bibit Tanam Pohon bisa kebawa air. Kalau mau lihat, jam tujuh."
- *(Hujan deras. Arya sendirian memasang patok bambu dan jaring di lereng.)*
- *(Telapak tangannya robek kena kawat. Dia tetap nggak mau pulang.)*
- "Dua puluh patok lagi. Kalau berhenti sekarang, bibitnya turun ke bawah."
- tanya: Tangan Arya berdarah, tapi dia nggak mau berhenti. Kamu ngapain?
- +15 *(Bersihin dan balut lukanya di tempat, lalu ikut ngangkat karung.)* → "Kamu kan dokter gigi." Kamu: "Dan kamu insinyur yang lupa kalau punya tangan."
- +5 *(Bawain kopi dan payung.)* → "Makasih." *(Dia lanjut kerja.)*
- -10 "Ngapain sih sendirian? Bodoh." → "Kalau aku pulang, bibitnya ikut turun ke bawah."

### E4 Tawaran Proyek Metrapura @teknik jam19 | Kantor Konsultan · malam
- ajak: "Nanti malam. Jam tujuh. Kantor. Ada surat. Aku pengin kamu baca."
- *(Bekas kantor Arya nawarin jabatan kepala proyek di Metrapura. Gajinya lima kali lipat.)*
- *(Di suratnya tertulis dia "sudah dimaafkan". Arya nyodorin surat itu tanpa ngomong apa-apa.)*
- tanya: Arya nunggu pendapatmu soal surat itu. Kamu bilang apa?
- +15 "Aku dukung apa pun pilihanmu. Tapi kamu nggak salah apa-apa, jadi nggak ada yang perlu dimaafin." → *(Dia merobek surat itu jadi dua.)* "Aku nunggu orang ngomong gitu lima tahun."
- +5 "Jangan pergi dong." → *(Dia senyum kecil.)* "Nggak pergi, kok." *(Tapi masih kelihatan ragu.)*
- -10 "Ambil aja, gajinya gede." → "Iya. Mungkin." *(Seminggu kemudian dia menolaknya sendiri, tanpa cerita ke kamu.)*

### E5 Rumah yang Dia Gambar @lereng.bukit jam20 | Bukit Bintang · malam
- ajak: "Jam delapan malam. Bukit Bintang. Bawa jaket. Anginnya dua belas knot."
- *(Arya membuka halaman terakhir buku sketsanya. Rumah dengan kebun herba dan jendela menghadap bukit.)*
- "Aku nggak sadar ini buat siapa. Sampai Sekar nanya minggu lalu, 'Ini rumahnya Dokter, ya?'"
- tanya: Arya nunjukin rumah yang dia gambar. Kamu jawab apa?
- +15 "Jendelanya harus dua. Satu buat kamu, satu buat aku." → *(Dia ketawa keras. Pertama kalinya di depanmu.)*
- +5 "Ini buat aku? …Iya. Iya, aku mau." → *(Dia membetulkan kacamata tiga kali berturut-turut.)*
- -10 "Ini rumah siapa, sih?" → *(Dia menutup buku itu pelan-pelan.)*

## Ipda Raka
### E1 Tilang Sepeda @niaga.janji jam20 | Jalan Niaga · malam
- ajak: "Dok, malam ini jam delapan lewat Jalan Niaga, ya. Ada razia. Razia khusus. Pesertanya satu orang. Hehe."
- *(Kamu nuntun sepeda ontel tua Om Darto. Raka nyetop kamu sambil niup peluit.)*
- "Selamat malam. Sepedanya nggak ada lampu, ya? Hmm. Ini harus ditilang."
- *(Dia nyerahin surat tilang. Pelanggarannya: "senyum kemanisan tanpa izin".)*
- tanya: Raka nilang kamu karena senyum kemanisan. Kamu ngapain?
- +15 *(Tulis "surat banding" di baliknya: "Terdakwa siap dihukum traktir gorengan.")* → *(Dia terbahak.)* "Banding diterima! Sidang di angkringan, jam tujuh."
- +5 *(Ketawa, lalu simpan suratnya.)* → "Disimpan, ya. Itu barang bukti."
- -10 "Nggak lucu. Aku capek." → "Siap. Maaf, Dok." *(Dia memberi hormat dengan kaku.)*

### E2 Patroli Malam @alun.plaza jam21 | Alun-alun ke Jalan Niaga · jam sembilan malam
- ajak: "Dok, ikut patroli, yuk? Jam sembilan, kumpul di Alun-alun. Seragam nggak wajib. Senter wajib. Nanti aku pinjemin."
- *(Kalian ngecek gembok toko, nyapa Pak Slamet, dan betulin lampu jalan yang kedip-kedip.)*
- "Kota ini tenang banget, ya. Kadang aku bingung harus diapain rasa tenang ini. Di Metrapura nggak pernah ada."
- tanya: Raka bingung sama kota yang terlalu tenang. Kamu jawab apa?
- +15 "Kamu bukan polisi lembek. Kamu polisi yang mau dengerin." → "Siapa yang bilang aku lembek?" Kamu: "Mukamu." *(Dia ketawa sampai harus berhenti jalan.)*
- +5 "Tenang kan enak." → "Iya, ya." *(Dia senyum. Masih ada yang belum dia ceritakan.)*
- -10 "Ya kalau bosen, pindah aja." → "Ha. Kamu kok kedengeran kayak bapakku."

### E3 Menyelidiki Pak Joni @polisi jam12 | Pos Polisi · siang
- ajak: "Dok, siang ini mampir Pos, ya? Jam dua belas. Ada laporan warga. Aku butuh keterangan ahli. Ahlinya kamu."
- *(Ada laporan soal tambal gigi tanpa alat steril. Pelakunya Pak Joni, tukang gigi keliling.)*
- "Secara medis bahaya, aku ngerti. Tapi dia juga orang kecil yang lagi cari makan. Gimana, Dok?"
- tanya: Raka minta pendapatmu soal Pak Joni. Kamu jawab apa?
- +15 "Praktiknya kita hentikan, tapi kita bantu dia cari kerja lain." → "Nah. Pagar yang nggak bikin orang jatuh."
- +5 "Tangkap aja, dia bahaya." → "Bisa. Tapi aku pernah salah pakai cara itu." *(Dia tetap menjalankannya.)*
- -10 "Itu urusanmu, bukan urusanku." → "…Siap." *(Dia menyelesaikannya sendirian. Jadi lebih lama.)*

### E4 Luka Saat Tugas @klinik jam16 | Klinik · sore
- ajak: "Dok, nanti sore aku mampir, ya. Jam empat. Nggak ada apa-apa. Cuma… mau mampir. Itu aja. Beneran."
- *(Raka datang sambil megangin bibir. Robek. Gigi seri atasnya patah sedikit. Dia jatuh waktu ngejar pencuri motor.)*
- "Jangan ke Puskesmas, Dok. Masa polisi ompong diperiksa bidan. Malu sama bayi-bayi."
- *(Kamu merapikan giginya. Di sela sakit dia masih sempat melawak.)*
- tanya: Raka masih ngelawak padahal kesakitan. Kamu bilang apa?
- +15 "Sekarang kamu nggak usah bikin aku ketawa. Kamu boleh kesakitan." → *(Dia diam.)* "…Dulu aku pernah dirawat di rumah sakit. Bapak nggak pernah dateng."
- +5 "Untung cuma gigi." → "Untung dokternya kamu." *(Lalu dia balik bercanda.)*
- -10 "Ngapain ngejar sendirian? Ceroboh." → "Iya, iya. Laporan diterima." *(Dia menutup diri.)*

### E5 Lencana Kedua @lereng.bukit jam20 | Bukit Bintang · malam
- ajak: "Dok. Malam ini jam delapan, Bukit Bintang. Ini perintah. Eh, bukan. Permohonan. Permohonan resmi."
- *(Raka ngeluarin dua lencana. Miliknya yang sekarang, dan lencana pertamanya dari akademi.)*
- *(Yang kedua dia sematkan di jas putihmu.)*
- "Ini udah jagain aku sepuluh tahun. Sekarang gantian. Aku yang jagain kamu."
- tanya: Raka nyematin lencananya di jasmu. Kamu jawab apa?
- +15 *(Kasih hormat.)* "Siap, Komandan. Laporan: aku juga sayang kamu." → *(Dia ketawa sambil nutup mata pakai tangan.)*
- +5 "Ini beneran? …Iya." → "Lencananya jangan dijual di Warung, ya."
- -10 "Ini bercanda lagi, kan?" → *(Dia mengambil lencananya kembali pelan-pelan.)*

## dr. Galih
### E1 Pasien Rujukan Bersama @klinik jam12 | Klinik · siang
- ajak: "Dokter, siang ini saya antar pasien rujukan ke klinik, jam dua belas. Pak Hasan, hipertensi. Saya ikut, kalau boleh."
- *(Galih mengantar sendiri Pak Hasan. Surat rujukannya rapi sekali. Tulisannya bisa dibaca. Langka untuk dokter.)*
- "Sebelum tindakan, boleh kita ukur tensinya bersama? Saya biasa cek dua kali. Maaf kalau merepotkan."
- tanya: Galih minta ngecek tensi bareng. Kamu jawab apa?
- +15 "Surat rujukanmu paling rapi yang pernah aku baca. Cek dua kali bareng, yuk?" → *(Dia tersenyum tipis.)* "Akhirnya ada yang tidak menganggap itu aneh."
- +5 "Makasih rujukannya." → *(Dia tetap ramah dan profesional. Obrolannya singkat.)*
- -10 "Nggak usah repot cek tensi, aku bisa sendiri." → "Tentu. Maaf." *(Dia pamit dengan kaku.)*

### E2 Jaga Malam @puskes jam21 hari:14 | Puskesmas · jaga malam
- ajak: "Malam ini saya jaga di Puskesmas. Kalau Dokter belum mengantuk jam sembilan, mampir. Tehnya ada dua gelas."
- *(Puskesmas sepi. Cuma ada Galih dan tehnya yang sudah dingin. Dia menuangkan segelas lagi untukmu.)*
- "Boleh saya tanya? Kenapa dulu Dokter memilih jadi dokter gigi?"
- tanya: Galih nanya alasanmu jadi dokter. Kamu jawab apa?
- +15 *(Jujur soal capek dan burnout waktu kerja di Metrapura.)* → *(Dia mendengarkan, lalu bercerita sedikit.)* "Sepertinya kita kabur dari kota yang sama."
- +5 *(Ngobrol soal pasien dan kerjaan saja.)* → *(Obrolannya enak, tapi nggak pernah dalam.)*
- -10 "Kamu kok kelihatan sedih terus, sih?" → "Oh. Begitu, ya." *(Dia menunduk ke gelasnya.)*

### E3 Pasien yang Tak Tertolong @puskes jam8 hujan | Puskesmas · pagi setelah hujan
- ajak: "Besok pagi, kalau Dokter sempat, jam delapan ke Puskesmas. Tidak ada apa-apa. Saya cuma… ingin ada teman."
- *(Semalam seorang kakek dari Dusun Atas meninggal karena gagal jantung di perjalanan ke Puskesmas.)*
- *(Kamu menemukan Galih di tangga belakang. Duduk, diam, masih pakai jas.)*
- tanya: Galih duduk diam di tangga. Kamu ngapain?
- +15 *(Duduk di sebelahnya. Nggak ngasih nasihat. Nunggu sampai dia mau ngomong.)* → "Di Metrapura saya pernah salah dosis. Karena lelah. Saya belum pernah cerita ke siapa pun."
- +5 "Itu bukan salahmu." → "Saya tahu." *(Dia berterima kasih, tapi masih menyimpan sesuatu.)*
- -10 "Namanya juga dokter, pasti pernah gagal." → "…Iya." *(Kalimatnya benar, tapi datang terlalu cepat. Dia berdiri dan masuk.)*

### E4 Beda Pendapat Antibiotik @klinik jam13 | Klinik · siang
- ajak: "Siang ini saya ke klinik, jam satu. Soal Mas Rudi, absesnya. Saya ingin kita sepakat dulu sebelum resep keluar."
- *(Galih ingin menahan antibiotik supaya tidak memicu resistensi. Kamu lihat bengkaknya harus segera ditangani.)*
- "Dokter, antibiotik bukan permen. Kalau setiap bengkak kita beri, lima tahun lagi obatnya tidak mempan."
- tanya: Diskusinya mulai panas. Kamu bilang apa?
- +15 "Drainase dulu, antibiotik sesuai indikasi, terus kita pantau tiga hari. Kita dua-duanya bener." → *(Dia tertawa kecil.)* "Biasanya debat seperti ini saya kalah sama diri sendiri."
- +5 "Ya udah, terserah kamu." → "Saya tidak senang menang begini. Saya ingin Dokter debat."
- -10 "Aku dokter giginya. Ini pasienku." → "Betul." *(Dia pergi, lebih dingin dari biasanya.)*

### E5 Catatan di Kertas Resep @lereng.bukit jam20 | Bukit Bintang · malam
- ajak: "Dokter, malam ini jam delapan, saya tunggu di Bukit Bintang. Ada yang ingin saya serahkan. Bukan rujukan."
- *(Galih menyerahkan selembar kertas resep.)*
- *(Isinya: "R/ Kamu. Dosis: setiap hari. Seumur hidup. Efek samping: senyum.")*
- *(Di baliknya ada puisi tentang dokter gigi yang datang ke kota sepi.)*
- tanya: Galih nunggu jawabanmu soal resep itu. Kamu ngapain?
- +15 *(Tulis balasan di kertas resepmu sendiri: "Resep diterima. Kontrol rutin.")* → *(Dia akhirnya tertawa lepas.)*
- +5 "Ini kamu yang nulis?" "…Iya." "Aku mau." → *(Dia menutup wajah pakai tangan. Lega.)*
- -10 "Tulisanmu rapi banget, nggak kayak dokter." → *(Dia melipat kertas itu pelan-pelan.)*

## Sekar
### E1 Buku Telat @klinik jam16 | Klinik · sore
- ajak: "Dokter… nanti jam empat saya mampir ke klinik, boleh? Ada… urusan kecil. Kecil sekali. Soal buku."
- *(Buku yang kamu pinjam udah telat tiga hari.)*
- *(Sekar datang sendiri, tapi terlalu malu buat bilang. Lima belas menit dia pura-pura baca poster sikat gigi.)*
- "Eh… itu… bukunya… kalau sudah selesai… nggak buru-buru, kok. Beneran."
- tanya: Sekar dateng nagih buku yang telat. Kamu ngapain?
- +15 *(Balikin bukunya dan bilang bab mana yang paling kamu suka.)* → *(Matanya berbinar.)* "Bab itu juga favorit saya. Saya kira cuma saya."
- +5 "Maaf ya, telat. Dendanya berapa?" → "Nggak ada denda, kok." *(Dia tersenyum kecil, lalu pulang.)*
- -10 "Buku apa, ya? Aku lupa." → "Oh. Nggak apa-apa." *(Dia pulang. Bukunya tetap ketinggalan di klinik.)*

### E2 Bunga Favorit @lereng.bunga jam7 | Kebun Bunga · pagi
- ajak: "Besok pagi jam tujuh… telangnya mekar. Kalau Dokter mau lihat… di kebun. Kalau nggak sibuk."
- *(Sekar lagi nyiram bunga. Dia nunjukin bunga telang dan cara nyeduhnya sampai airnya biru.)*
- "Kalau dikasih jeruk nipis, airnya jadi ungu. Kayak sulap. Anak-anak SD suka sekali."
- *(Waktu kamu tanya bunga favoritnya, dia ragu.)*
- tanya: Sekar ragu nyebut bunga favoritnya. Kamu bilang apa?
- +15 "Kalau aku tebak: telang. Kamu ceritanya paling panjang waktu ngomongin itu." → *(Dia tertawa kecil dan nutup mulut.)* "Ketahuan, ya."
- +5 "Bunganya cantik semua." → "Makasih." *(Dia ngasih kamu satu tangkai.)*
- -10 "Aku nggak terlalu ngerti bunga, sih." → "Oh, iya. Nggak apa-apa." *(Dia lanjut nyiram tanpa bicara.)*

### E3 Bibit untuk Lereng @lereng.bunga jam7 hujan | Kebun Bunga · pagi, Musim Hujan
- ajak: "Besok pagi… jam tujuh… bibit buat Tanam Pohon Bersama siap. Kalau Dokter mau lihat. Ratusan, lho."
- *(Angin dan hujan semalam merobohkan rak bibit Sekar.)*
- *(Dia berlutut di tanah basah, mindahin bibit ke polybag satu per satu. Orang lewat mau bantu, dia tolak.)*
- tanya: Sekar berlutut di tanah basah sendirian. Kamu ngapain?
- +15 *(Ikut berlutut tanpa nanya, lalu pindahin bibit ke polybag baru.)* → "Bibit ini dari Tante Lies. Makasih udah nggak bilang 'nanti tanam lagi aja'."
- +5 *(Bawain payung dan teh hangat.)* → "Makasih, Dokter." *(Dia tetap kerja sendirian.)*
- -10 "Ya udah, nanti tanam lagi aja." → "Iya." *(Dia menunduk lebih dalam ke bibitnya.)*

### E4 Naskah Ditolak @perpus jam16 | Perpustakaan · sore
- ajak: "Dokter… sore ini jam empat… bisa ke Perpustakaan? Ada surat. Saya… belum berani buka sendiri."
- *(Mas Ilham baru ngantar surat dari penerbit Metrapura. Naskah novel Sekar ditolak.)*
- "Saya… yang nulis cerpen di koran pakai nama Telang. Itu saya. Nggak ada yang tahu. Sekarang Dokter tahu."
- tanya: Sekar ngaku dia "Telang", dan naskahnya ditolak. Kamu bilang apa?
- +15 "Boleh aku baca naskahnya? Bukan karena kasihan. Aku pengin tahu ceritanya." → *(Dia ngasih naskahnya. Tangannya gemetar. Seminggu kemudian dia kirim ke penerbit lain.)*
- +5 "Penerbitnya aja yang nggak ngerti." → "Makasih." *(Tapi naskahnya dia simpan lagi di laci.)*
- -10 "Mungkin coba nulis yang lebih rame?" → *(Dia mengangguk pelan.)* "Iya. Terlalu sepi, ya."

### E5 Bunga di Buku @lereng.bukit jam20 | Bukit Bintang · malam
- ajak: "Dokter… malam ini jam delapan… Bukit Bintang. Saya mau minjemin buku. Bacanya harus di sana. Nanti tahu kenapa."
- "Bacanya di sini aja. Sekarang. Saya… lihat bintang dulu."
- *(Di halaman tengah ada bunga telang kering yang dipres, dan secarik kertas bertulisan tangannya.)*
- *("Ini cerita yang belum pernah aku tulis. Tentang aku yang suka sama kamu.")*
- tanya: Kamu nemu surat Sekar di dalam buku. Kamu ngapain?
- +15 *(Tulis jawaban di balik kertas itu, lalu selipkan lagi di halaman yang sama.)* → *(Dia membacanya, menutup buku, lalu memeluknya erat.)*
- +5 "Ini… buat aku? Aku juga suka kamu." → *(Mukanya merah sampai telinga.)*
- -10 "Ini bukunya bagus, tapi bunganya jatuh." → *(Dia memungut bunga itu pelan-pelan.)*

## Nadia
### E1 Racikan Baru @kedai jam16 | Kedai Kopi Seduh · sore
- ajak: "Dok! Dok! Sore ini jam empat ke kedai, ya! Aku punya racikan baru. Kamu kelinci percobaan pertama. Kehormatan, lho!"
- *(Nadia nyodorin kopi serai. Dia ngelihatin kamu nyeruput. Nggak kedip.)*
- "Gimana? Gimana? Jujur. Eh, jangan jujur-jujur amat. Eh, jujur aja deh. Gimana?"
- tanya: Nadia nunggu pendapatmu soal kopi serai. Kamu bilang apa?
- +15 "Serainya enak, tapi kopinya kalah. Kurangi serainya sedikit." → *(Dia langsung nyatet.)* "Akhirnya ada yang jujur! Mas Adji bilang semuanya enak."
- +5 "Enak!" → "Beneran? Beneran enak?" *(Dia senang, tapi tetap ragu.)*
- -10 "Aku lebih suka kopi biasa." → "Oh. Oke, kopi biasa." *(Senyumnya mengecil.)*

### E2 Kopi Spesial @kedai jam21 | Kedai Kopi Seduh · malam, sebelum tutup
- ajak: "Dok, nanti jam sembilan mampir pas kedai sepi, ya. Ada yang mau aku seduhin. Nggak dijual. Jangan bilang siapa-siapa."
- *(Kedai sepi. Nadia menyeduh biji terbaik dari Pak Bowo. Satu-satunya kantong yang nggak dia jual.)*
- "Ini buat orang yang aku anggap spesial. Jangan geer! Mas Adji juga pernah, kok." *(Adji belum pernah.)*
- tanya: Nadia nyeduhin kopi spesialnya. Kamu ngapain?
- +15 *(Tanya soal bijinya: dari petak mana, kapan dipetik.)* → *(Matanya nyala. Dia cerita soal pagi-pagi di kebun Pak Bowo, lalu sadar udah bocorin rahasia.)*
- +5 "Wah, makasih. Enak banget." → *(Dia senyum lebar, lalu ngelap meja.)*
- -10 *(Tambahin gula dua sendok sebelum nyicip.)* → "…Oke." *(Dia nyatet sesuatu di bukunya. Bukan pujian.)*

### E3 Kedai Sepi @kedai jam16 hujan | Kedai Kopi Seduh · sore, Musim Hujan
- ajak: "Dok… sore ini jam empat mampir, ya? Kedai sepi. Nggak apa-apa. Aku cuma pengin ada yang dateng aja."
- *(Hujan tiga hari. Kedai kosong.)*
- *(Kamu nemuin Nadia duduk di lantai belakang meja bar, sama buku kas dan kalkulator. Matanya merah.)*
- "Eh, Dok! Hehe. Aku lagi… ngitung. Ngitung doang. Kok mukamu gitu? Aku nggak apa-apa. Serius."
- tanya: Nadia duduk di lantai, matanya merah. Kamu ngapain?
- +15 *(Duduk di lantai sebelahnya.)* "Nggak usah semangat dulu. Aku temenin aja." → *(Dia bersandar ke bahumu, lalu cerita soal pinjaman dan orang tuanya.)*
- +5 "Ayo kita pikirin promo." → *(Dia langsung bangkit dan semangat lagi. Lukanya belum kesentuh.)*
- -10 "Mungkin emang kota ini terlalu kecil buat kedai kayak gini." → *(Dia diam.)* "Itu juga kata Mama."

### E4 Pemasok @lereng.kopi jam12 | Kebun Kopi · siang
- ajak: "Dok, siang ini jam dua belas ke Kebun Kopi, ya? Aku butuh saksi. Atau pelerai. Pokoknya butuh kamu."
- *(Seorang tengkulak nawarin biji murah ke Nadia. Separuh harga Pak Bowo, kualitasnya di bawah.)*
- *(Pak Bowo tahu dan marah besar. Nadia kejepit di tengah.)*
- "Kedaiku harus hemat, Dok. Tapi Pak Bowo… yang ngajarin aku nyangrai. Aku harus gimana?"
- tanya: Nadia kejepit antara hemat dan Pak Bowo. Kamu bilang apa?
- +15 "Ngomong jujur sama Pak Bowo. Bilang kamu butuh waktu bayar, bukan biji yang lebih murah." → Pak Bowo: "Wis, bayar kalau kedaimu rame." *(Nadia memeluknya. Pak Bowo kaku kayak tiang.)*
- +5 "Ambil yang murah dulu, sementara." → *(Dia coba seminggu, lalu balik ke Pak Bowo sambil malu.)*
- -10 "Itu urusan bisnis, jangan bawa perasaan." → "Iya, Dok. Bisnis." *(Dia jadi dingin ke kamu beberapa hari.)*

### E5 Kopi Tanpa Nama @lereng.bukit jam20 | Bukit Bintang · malam
- ajak: "Dok, malam ini jam delapan, Bukit Bintang. Aku bawa termos. Jangan telat, nanti kopinya dingin. Dan aku juga."
- *(Nadia bawa termos dan dua cangkir. Racikan baru, dibuat khusus buat kamu selama sebulan.)*
- "Belum ada namanya. Aku mau kamu yang kasih nama. Soalnya ini… rasanya kayak aku kalau di dekat kamu."
- tanya: Nadia minta kamu ngasih nama racikannya. Kamu jawab apa?
- +15 *(Kasih nama sesuai tempat kalian pertama kali ngobrol lama.)* → *(Dia nulis nama itu di termos pakai spidol, lalu ketawa sambil nangis.)*
- +5 "Namanya 'Nadia'. Soalnya enak." → "Gombal banget. Tapi oke, aku terima."
- -10 "Kopi Senyum aja, biar sama kayak klinik." → *(Dia tersenyum tipis.)* "Bagus juga."

## Laras
### E1 Foto Candid @klinik jam12 | Klinik · siang
- ajak: "Dok! Siang ini jam dua belas aku ke klinik, ya! Ada yang mau aku tunjukin. Jangan marah duluan. Janji, ya?"
- *(Laras datang bawa cetakan foto. Kamu, lewat jendela klinik, lagi nenangin pasien anak.)*
- "Maaf! Aku motret diam-diam. Tapi lihat deh. Muka Dokter waktu sabar itu bagus banget. Sumpah."
- tanya: Laras motret kamu diam-diam. Kamu bilang apa?
- +15 "Ini bagus. Boleh aku pajang di ruang tunggu?" → *(Dia melongo, lalu lompat kecil.)* "Fotoku dipajang di klinik? Serius?"
- +5 "Wah, makasih. Lain kali bilang dulu, ya." → "Siap! Mungkin." *(Dia nyengir.)*
- -10 "Kok motret orang diam-diam, sih?" → "Maaf… iya, harusnya izin dulu." *(Dia menyobek cetakannya di depanmu.)*

### E2 Pameran Gagal @studio jam16 | Studio Foto Lensa · sore
- ajak: "Dok, sore ini jam empat main ke studio, yuk? Lagi berantakan sih. Banget. Tapi nggak apa-apa, kan? Hahaha."
- *(Pameran pertama Laras di galeri kecil Tanjung Arum batal seminggu sebelum buka. Galerinya tutup.)*
- *(Bingkai foto numpuk di studio. Laras bercanda soal itu. Terlalu banyak.)*
- "Hahaha, ya udah lah ya. Bingkainya bisa buat jemuran. Atau talenan. Talenan mahal, lho!"
- tanya: Laras bercanda terus soal pameran yang batal. Kamu bilang apa?
- +15 "Ayo kita lihat satu-satu. Aku jadi pengunjung pertamanya." → *(Dia diam, lalu menyusun bingkai di lantai. Pameran untuk satu orang.)*
- +5 "Nanti pasti ada kesempatan lain." → "Iya, pasti!" *(Senyumnya nggak sampai ke mata.)*
- -10 "Ya udah, galerinya juga kecil, kan?" → "Iya. Kecil." *(Dia mulai membungkus bingkainya lagi.)*

### E3 Pameran Foto Warga @alun.plaza jam16 | Alun-alun · sore
- ajak: "Dok! Sore ini jam empat ke Alun-alun! Aku bikin pameran sendiri! Pakai tali jemuran! Jangan ketawa!"
- *(Potret warga Rimbasari dijepit di tali jemuran keliling Alun-alun. Bu Ratna nangis lihat fotonya sendiri.)*
- *(Ada satu tali yang kosong.)*
- "Itu buat foto yang belum ada. Nanti. Kapan-kapan. Hehe."
- tanya: Ada satu tali kosong di pameran Laras. Kamu ngapain?
- +15 *(Ambil kameranya, potret Laras di depan pamerannya, lalu jepit fotonya di tali kosong.)* → *(Dia nutup muka, lalu ketawa.)* "Curang. Itu fotoku yang pertama setelah sepuluh tahun."
- +5 *(Puji pamerannya di depan warga.)* → *(Dia tersipu dan sibuk berterima kasih ke semua orang.)*
- -10 "Kok fotomu sendiri nggak ada?" → "Nggak mau." Kamu: "Ya udah." *(Tali kosong itu tetap kosong.)*

### E4 Tawaran Metrapura @studio jam20 | Studio Foto Lensa · malam
- ajak: "Dok… malam ini jam delapan ke studio, ya? Aku dapet email. Gede. Aku bingung. Bingung banget."
- *(Majalah besar di Metrapura nawarin Laras jadi fotografer tetap, gara-gara foto Pameran Warga viral.)*
- "Bapak bilang berangkat aja. Katanya kapan lagi. Tapi… aku nggak tahu, Dok."
- tanya: Laras bingung soal tawaran Metrapura. Kamu bilang apa?
- +15 "Kenapa nggak dua-duanya? Kirim foto Rimbasari ke mereka, tapi kamu tetap di sini." → *(Besoknya dia ngusulin rubrik bulanan "Kota Kecil", dikirim dari Rimbasari.)*
- +5 "Jangan pergi, ya." → "Siapa yang mau pergi?" *(Dia ketawa, tapi masih ragu.)*
- -10 "Ambil aja, di sini kan nggak ada apa-apa." → "Ada, kok." *(Dia diam lama, lalu memutuskan sendiri.)*

### E5 Foto Berdua @lereng.bukit jam20 | Bukit Bintang · malam
- ajak: "Dok, malam ini jam delapan, Bukit Bintang. Bawa muka terbaikmu. Eh, muka biasa juga udah bagus. Pokoknya dateng."
- *(Laras masang tripod dan nyetel timer sepuluh detik.)*
- "Aku belum pernah foto berdua sama siapa pun. Mau yang pertama?"
- *(Lampu timer kedip. Di detik ketiga dia ngomong cepat banget: "Akusukasamakamu." Klik.)*
- tanya: Laras ngomong cepat banget sebelum kamera bunyi. Kamu ngapain?
- +15 "Ulang. Aku belum jawab di fotonya." *(Setel timer lagi.)* → *(Foto kedua: dua-duanya ketawa. Laras nggak nutup mulut.)*
- +5 "Aku juga." → *(Fotonya buram karena Laras lompat.)*
- -10 "Hah? Tadi ngomong apa?" → "Bukan apa-apa! Fotonya bagus, kok."

## Wulan
### E1 Persalinan Malam @puskes jam21 | Puskesmas · malam
- ajak: "Dok, malam ini saya jaga. Ada ibu dari Kampung Kali, kayaknya lahiran malam ini. Kalau lewat jam sembilan, mampir."
- *(Galih lagi jaga di desa lain. Wulan sendirian bantu persalinan darurat.)*
- "Dok! Syukur. Tolong pegang lampu ini. Tinggi sedikit. Ya, gitu. Jangan goyang, ya."
- *(Kamu pegang lampu, siapin air, nenangin suami si ibu. Bayinya lahir selamat.)*
- tanya: Bayinya lahir selamat. Kamu ngapain?
- +15 *(Ikuti semua instruksinya, lalu bikinin dia teh.)* → "Dokter gigi pegang lampu paling stabil yang pernah saya lihat." *(Dia nulis namamu di samping nama bayi itu.)*
- +5 *(Bantu, lalu langsung pamit karena capek.)* → "Makasih banyak, Dok." *(Dia kembali ke ibu dan bayinya.)*
- -10 "Aku dokter gigi, bukan bidan." → "Betul. Maaf, Dok." *(Dia manggil suami si ibu buat pegang lampu.)*

### E2 Imunisasi @sd jam8 | SD Negeri · pagi
- ajak: "Dok, besok pagi jam delapan imunisasi di SD. Saya butuh bala bantuan. Dokter gigi pasti punya jurus, kan?"
- *(Separuh kelas nangis. Dimas sembunyi di bawah meja.)*
- "Dok, tolong. Saya suntik, Dokter yang… pokoknya bikin mereka lupa ada jarum."
- tanya: Separuh kelas nangis. Kamu ngapain?
- +15 *(Ajak anak-anak ngitung gigi teman sebelahnya selama Wulan nyuntik.)* → *(Kelas ketawa. Wulan selesai dua kali lebih cepat.)* "Jurusnya saya curi, ya."
- +5 *(Pegang tangan anak satu per satu.)* → *(Berhasil, tapi lama. Wulan tetap berterima kasih.)*
- -10 "Wah, aku juga nggak bisa ngurus anak nangis." → *(Dia ngurus sendiri dan memaklumi. Senyumnya kecil.)*

### E3 Jaga 24 Jam @puskes jam12 | Puskesmas · siang
- ajak: "Dok, kalau siang ini lewat Puskesmas, jam dua belas… bawain apa aja yang bisa dimakan. Nanti saya ganti. Kayaknya."
- *(Wulan udah jaga 24 jam. Dua persalinan, satu demam berdarah. Belum tidur.)*
- *(Kamu datang bawa makanan. Dia ketiduran sambil berdiri di depan lemari obat.)*
- tanya: Wulan ketiduran sambil berdiri. Kamu ngapain?
- +15 "Tidur. Aku jagain pintunya. Kalau ada yang darurat, aku bangunin." → *(Dia mau nolak, lalu tidur sebelum kalimatnya selesai. Bangun-bangun ada selimut dan makanan hangat.)*
- +5 *(Taruh makanan dan suruh dia makan.)* → *(Dia makan cepat sambil kerja. Tetap nggak tidur.)*
- -10 "Kamu terlalu memaksakan diri, tahu nggak?" → "Tahu." *(Dia kembali ke lemari obat.)*

### E4 Beda Pendapat Rujukan @klinik jam11 | Klinik · siang
- ajak: "Dok, nanti jam sebelas saya antar Bu Yati ke klinik. Hamil trimester satu, giginya sakit. Kita perlu ngomong dulu."
- *(Kamu mau periksa dan tangani. Wulan mau semuanya ditunda sampai trimester kedua.)*
- "Trimester satu itu rawan, Dok. Saya nggak mau ambil risiko apa pun. Apa pun."
- *(Diskusinya memanas. Bu Yati di tengah, bingung.)*
- tanya: Kamu dan Wulan beda pendapat di depan Bu Yati. Kamu bilang apa?
- +15 "Rontgen kita lewati. Hari ini cuma tindakan darurat yang aman. Sisanya trimester dua, kamu yang pantau." → "Itu yang saya mau dari tadi. Cuma saya nggak tahu cara ngomongnya."
- +5 "Oke, kita tunda semua." → *(Bu Yati pulang masih sakit. Wulan setuju, tapi kelihatan nggak tenang.)*
- -10 "Ini wilayahku, Bu Bidan." → "Dan dia pasien saya juga, Dok." *(Dia keluar lebih cepat dari biasanya.)*

### E5 Jalan Pulang @lereng.bukit jam20 | Bukit Bintang · malam
- ajak: "Dok, malam ini habis jaga… antar saya pulang, ya? Lewat Bukit Bintang. Jam delapan. Iya, muternya jauh. Sengaja."
- *(Rumah dinas Wulan cuma lima puluh langkah di belakang Puskesmas. Kalian malah muter lewat Bukit Bintang.)*
- *(Di atas, dia ngeluarin bukunya dan nunjukin halaman terakhir. Masih kosong.)*
- "Selama ini saya nyatet semua bayi yang saya bantu lahir. Halaman ini buat saya sendiri."
- "Mungkin sekarang. Kalau kamu mau."
- tanya: Wulan nunjukin halaman terakhir bukunya. Kamu jawab apa?
- +15 "Mulai sekarang, kamu yang dijagain. Gantian." → *(Dia ketawa kecil, lalu bersandar dan langsung tertidur di bahumu. Lima menit kemudian bangun, malu sekali.)*
- +5 "Aku mau." → "Bagus. Sekarang antar saya pulang beneran. Saya ngantuk."
- -10 "Kamu capek, kita ngomongin besok aja." → *(Dia menutup bukunya pelan.)* "Iya. Besok."
