# Buku NPC · 10 · Reaksi Hadiah (Fase 3a-4)

> Status: **Draf 3a-4, 2026-11-15** (usulan ACC user 2026-11-15). Kanon: *Provisional*.
> Selera (suka / tidak suka) diambil dari baris *Hadiah* di kartu 01, 02a, 02b, 04, 05, lalu dipetakan ke barang game di `NPC_TASTE` (`src/hubungan3a.js`).
> Barang yang tidak ada di daftar suka atau tidak suka = **biasa**. Suara mengikuti tabel "Ciri bicara" tiap kartu.
> Dibaca otomatis oleh `tools/gen-npc-data.cjs` → `NPC_GIFT_LINES` di `src/npc-data.js`. Format: `## id`, lalu `- suka|biasa|benci: "…"` (boleh lebih dari satu, game memilih acak). Maks 120 karakter.

## harjo
- suka: "Wah, Dokter ini kok tahu kesukaan saya. Matur nuwun, nggih. Nanti malam saya nikmati sambil telepon Ibu."
- biasa: "Lho, repot-repot. Matur nuwun, nggih, Dok."
- benci: "Aduh, matur nuwun. Tapi gigi saya yang goyang ini nanti protes, Dok. Saya simpan dulu, nggih."

## ratna
- suka: "Dok, Dok! Ini buat aku? Aduh, lho, kok pas banget! Nanti aku cerita ke semua orang, eh, ke Pak Lurah dulu."
- biasa: "Eh, makasih lho, Dok. Ditaruh sini aja, ya, sebelah toples kerupuk."
- benci: "Buku? Aduh, Dok. Aku ini sibuk, mana sempat baca. Maksudnya apa nih? Hmm. Ya udah, makasih."

## darmi
- suka: "Hm. Iki apik. Matur nuwun, Nduk."
- biasa: "Hm. Ya."
- benci: "Ora usah. Mbah ora butuh iki. Simpen dhewe."

## dimas
- suka: "Beneran buat aku? Beneran? Asyik! Eh, tapi abis ini nggak boleh disuruh sikat gigi dua kali, ya."
- biasa: "Oh. Makasih. Besok bisa diganti roti cokelat nggak?"
- benci: "Nggak mau ah. Ini kayak bekal dari Ibu. Dokter kok jahat."

## endang
- suka: "Aduh, Dok, maaf lho, saya jadi nggak enak. Matur nuwun, nggih. Besok saya bawakan sayur, ya."
- biasa: "Maaf lho, Dok, ngrepoti. Matur nuwun."
- benci: "Aduh, nggak usah, Dok. Ini mahal. Maaf lho, saya nggak bisa terima yang begini."

## bowo
- suka: "Halah. Ya wis, ditaruh situ. …Ini enak. Jangan bilang Harjo aku bilang enak."
- biasa: "Hm. Wis lah, makasih."
- benci: "Halah. Ini minuman orang kota. Kasih ke Nadia aja sana."

## sinta
- suka: "Nah, ini baru hadiah yang mendidik, ya, Dok? Makasih. Nanti saya tunjukkan ke anak-anak juga."
- biasa: "Makasih, ya, Dok. Saya terima dengan senang hati."
- benci: "Aduh, Dok. Saya lagi diet, satu, dua, tiga minggu ini. Ini cobaan namanya."

## slamet
- suka: "Lho, monggo, monggo, ini pas banget buat nemenin narik pagi. Matur nuwun, Dok."
- biasa: "Lho, makasih, Dok. Saya simpan di dasbor, ya."
- benci: "Waduh, Dok. Ini nggak cocok sama mesin saya. Mesin perut, maksudnya. Tapi makasih."

## tari
- suka: "Eh, ini buat aku? Hehe. Eh tapi beneran? Aduh, makasih, Dok! Aku jadi semangat ngadon."
- biasa: "Hehe, makasih, Dok. Eh tapi lain kali mampir ke toko, ya."
- benci: "Hehe. Eh. Ini… makasih, Dok. Eh tapi aku kurang cocok, sih."

## ilham
- suka: "Siap! Paket diterima, alamat tujuan bener: hati saya. Makasih, Dok!"
- biasa: "Siap, diterima. Nggak perlu tanda tangan, kan? Hehe."
- benci: "Waduh. Ini paket salah alamat kayaknya, Dok. Tapi makasih, deh."

## wiryo
- suka: "Wah, Nak. Ini kesukaan saya dari zaman… zaman apa, ya. Pokoknya dari dulu. Terima kasih, Nak."
- biasa: "Terima kasih, Nak. Dulu murid saya juga suka bawa begini. Siapa, ya, namanya."
- benci: "Aduh, Nak. Gigi saya sudah pensiun duluan. Yang keras-keras begini saya cuma bisa lihat."

## doni
- suka: "Gas! Ini baru asupan atlet. Makasih, Dok! Besok pagi lari bareng, ya!"
- biasa: "Oke, Dok. Makasih. Habis ini push-up sepuluh, ya."
- benci: "Waduh, Dok. Lagi jaga badan. Ini musuh nomor satu. Tapi makasih, ya."

## sri
- suka: "Wah, Dok, makasih banyak. Pas sekali buat diminum habis jaga."
- biasa: "Makasih, Dok. Saya terima, ya."
- benci: "Aduh, Dok, makasih. Tapi saya kurang cocok sama yang ini."

## adji
- suka: "Kamu tahu dari mana aku suka ini? Eh, jangan dijawab. Aku makan sekarang, ya. Sekarang banget."
- biasa: "Wah, buat aku? Makasih, lho. Aku catat di buku besar: pemasukan, satu kebaikan."
- benci: "Ini berapa? Kok kamu boros? Aduh, makasih, tapi lain kali jangan, ya. Aku jadi kepikiran."

## arya
- suka: "…Ini. Pas. Makasih."
- biasa: "Makasih."
- benci: "Nanti layu. Kasihan. Tapi makasih udah mikirin aku."

## raka
- suka: "Barang bukti diterima! Makasih, Dok. Kasus ditutup, pelaku saya maafkan."
- biasa: "Siap, diterima. Saya catat di laporan harian, ya."
- benci: "Waduh, Dok. Ini kayak laporan belum ditandatangani. Nanti dikira mau apel juga. Tapi makasih."

## galih
- suka: "Terima kasih, Dokter. Saya tidak menyangka. Ini akan saya pakai baik-baik."
- biasa: "Terima kasih, Dokter. Saya terima."
- benci: "Maaf, Dokter. Tidur saya sudah susah, dan perut saya juga. Tapi saya hargai, sungguh."

## sekar
- suka: "Ini… untuk saya? Makasih, Dokter. Saya… senang sekali. Beneran."
- biasa: "Makasih, Dokter. Saya simpan, ya."
- benci: "Oh… minyaknya nanti kena kertas. Maaf. Tapi makasih, Dokter."

## nadia
- suka: "Dok! Ini kesukaanku! Kamu mata-matain aku, ya? Nggak apa-apa, lanjutkan. Makasih!"
- biasa: "Wah, makasih, Dok! Ditaruh di bar dulu, ya, biar dilihat pelanggan."
- benci: "Dok. Kita perlu bicara. Tapi makasih, sih."

## laras
- suka: "Dok, ini lucu banget! Tunggu, jangan dipindah. Aku foto dulu. Oke, sekarang makasih!"
- biasa: "Makasih, Dok! Aku foto, ya. Buat arsip. Arsip apa, nggak tahu."
- benci: "Hahaha, makasih, Dok. Bungkusnya rapi banget, sayang dibuka. Nanti fotonya jelek."

## wulan
- suka: "Wah, Dok. Ini pas sekali buat habis jaga. Makasih, saya terima."
- biasa: "Makasih, Dok. Kalau ini buat pasien, bilang, ya. Biar saya kasih ke yang perlu."
- benci: "Aduh, Dok. Jantung saya nanti ikut lembur. Makasih, tapi saya kasih ke Galih aja, ya."

## putri
- suka: "Siap, Dok! Eh, ini buat saya? Aduh, makasih! Besok saya datang lima menit lebih pagi."
- biasa: "Makasih, Dok! Disimpan di laci meja depan, ya."
- benci: "Hehe, makasih, Dok. Tapi saya nggak kuat yang pahit-pahit."

## yoga
- suka: "Terima kasih, Dok. Sudah saya catat. Hadiah nomor satu bulan ini."
- biasa: "Terima kasih, Dok. Sudah saya catat."
- benci: "Terima kasih, Dok. Saya catat juga, untuk referensi berikutnya."

## rina
- suka: "Wah, tahu aja, Dok. Makasih. Jangan bilang anak-anak junior, nanti mereka minta."
- biasa: "Makasih, Dok. Saya taruh di ruang staf."
- benci: "Makasih, Dok. Tapi yang ini saya oper ke yang lain, ya."

## fajar
- suka: "Untuk saya, Dok? Untuk saya? Makasih, Dok. Makasih banyak."
- biasa: "Makasih, Dok. Makasih."
- benci: "Oh. Makasih, Dok. Tapi ini… ini terlalu kental buat saya. Terlalu kental."

## dewi
- suka: "Makasih, Dok. Saya suka sekali. Nanti saya baca di rumah."
- biasa: "Makasih, Dok."
- benci: "Makasih, Dok. Saya simpan dulu, ya."

## udin
- suka: "Monggo, Dok, eh, matur nuwun, maksudnya. Ini enak sekali buat sore-sore."
- biasa: "Matur nuwun, Dok. Monggo, saya lanjut nyapu, nggih."
- benci: "Waduh, Dok. Gigi saya sudah nggak kuat yang begini. Matur nuwun, tapi."

## siti
- suka: "Beres! Eh, ini buat saya? Makasih, Dok. Nanti malam diminum di Angkringan."
- biasa: "Makasih, Dok. Beres, saya simpan."
- benci: "Bunga? Nanti rontok, Dok. Saya yang nyapu. Tapi makasih, ya."

## hana
- suka: "Dok! Di pulau dulu barang begini langka banget, lho. Makasih banyak!"
- biasa: "Makasih, Dok! Lumayan buat teman baca."
- benci: "Hehe, makasih, Dok. Tapi saya trauma sama yang ini. Panjang ceritanya."

## bima
- suka: "Nah, ini level Metrapura. Makasih, Dok. Selera kamu boleh juga."
- biasa: "Oke, makasih. Di Metrapura sih ini biasa, ya."
- benci: "Hmm. Makasih, Dok. Lain kali yang lebih spesial, dong."

## hendra
- suka: "Haiya, ini kopi Rimbasari, ya? Mantap! Harga teman, ya, ini gratis, kan? Hahaha. Makasih!"
- biasa: "Haiya, makasih, Dok. Nanti saya kasih diskon dua persen."
- benci: "Haiya, ini dari Metra Dental, ya? Tersinggung saya. Hahaha. Becanda. Makasih."
