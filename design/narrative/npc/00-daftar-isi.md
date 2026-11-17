# Buku NPC Senyum Rimbasari · Daftar Isi

> Status: **ACC 2026-11-11** (semua file 01–07). Sumber mekanik: `design/gdd/senyum-rimbasari.md` §9, §10, §13–15.
> Dokumen ini **tidak mengubah** profesi, bonus menikah, atau angka mekanik di GDD. Isinya cerita, karakter, dan kaitan ke sistem yang sudah ada.

## Isi buku
| File | Isi | Status |
|---|---|---|
| [01-warga.md](01-warga.md) | 12 warga | **ACC 2026-11-11** |
| [02a-romance-pria.md](02a-romance-pria.md) | Adji, Arya, Ipda Raka, dr. Galih + arc E1–E5 + arc teman + lamaran & pernikahan | **ACC 2026-11-11** |
| [02b-romance-wanita.md](02b-romance-wanita.md) | Sekar, Nadia, Laras, Wulan + arc E1–E5 + arc teman + lamaran & pernikahan | **ACC 2026-11-11** |
| [03-pasien.md](03-pasien.md) | 12 pasien spesial | **ACC 2026-11-11** |
| [04-luar-kota.md](04-luar-kota.md) | Koh Hendra, Bu Melinda, drg. Surya, Pak Joni | **ACC 2026-11-11** |
| [05-staf.md](05-staf.md) | 9 kandidat staf (ringkas) | **ACC 2026-11-11** |
| [06-jadwal.md](06-jadwal.md) | Jadwal mingguan semua NPC + tempat tinggal + aturan pengecualian | **ACC 2026-11-11** |
| [07a-dialog-warga.md](07a-dialog-warga.md) | Dialog harian 12 warga + cara kerja kondisi | **ACC 2026-11-11** |
| [07b-dialog-romance.md](07b-dialog-romance.md) | Dialog harian 8 romance (+ Hubungan, pacaran, nikah, renggang) | **ACC 2026-11-11** |
| [07c-dialog-lainnya.md](07c-dialog-lainnya.md) | Dialog harian staf, pasien, luar kota | **ACC 2026-11-11** |

## Keputusan dialog & jadwal (pemilik proyek, 2026-11-11)
- **Dialog campuran.** Dialog penting (event, rahasia, E1–E5, adegan Trust, lamaran) ditulis tangan dan tidak pernah diganti AI. Obrolan harian memakai kumpulan dialog tulis tangan (per NPC × tempat × tingkat Trust/Hubungan, ditambah variasi musim, cuaca, dan event).
- **AI opsional.** Kalau pemain memasukkan API key AI miliknya sendiri, obrolan harian boleh dibuat oleh AI, memakai kartu NPC di buku ini sebagai pegangan karakter. Tanpa key, game memakai kumpulan dialog tulis tangan. Fitur ini di luar MVP. Sudah dicatat di GDD §16.
- **Jadwal** mingguan semua NPC ditulis di satu file, `06-jadwal.md`. Kartu NPC hanya menyimpan ringkasannya.
- **Bangunan baru** (2026-11-11): **Kos Melati** (Kampung Asri, kos staf milik Pak Udin) dan **Losmen Singgah** (Jalan Niaga, samping Terminal, dikelola Bu Sri). Pasien setelah bedah minor atau abses menginap di **Puskesmas**. Detail di [06-jadwal.md](06-jadwal.md#tempat-tinggal-acc-2026-11-11). Sudah digambar di v3 dan dicatat di GDD §6 dan §11.
- **Jumlah dialog harian**: inti dulu, sekitar 15–20 baris per NPC, lalu ditambah saat playtest. Filenya `07-dialog-harian-*.md`.

## Panduan gaya dialog (ACC pemilik proyek, 2026-11-15)
Dasarnya keluhan playtest: dialog terasa "AI banget", tidak nyambung, kurang Indonesia. Berlaku untuk semua baris baru (07a/07b/07c, adegan Trust, event).
- **Ngomong kayak orang, bukan kayak tulisan.** Pakai partikel lisan sesuai orangnya: *sih, dong, kok, deh, lho, to, je, wis, nggih, ya*. Kata lisan: *udah, nggak/ndak, gini, gitu, banget, dikit*. *Mah* tidak dipakai (khas Sunda, latar kita Jawa).
- **Candaannya receh dan lokal.** Plesetan dan tebak-tebakan ("gigi mundur"), guyonan bapak-bapak, sindiran ibu warung, gosip "katanya sih… katanya lho", celetukan Jawa. Lucunya datang dari situasi kota kecil, bukan dari metafora.
- **Dilarang:** penutup sok bijak ("Dokter juga. Tahu kapan berhenti."), metafora puitis yang dipaksakan ("lelah yang pakai jas"), kalimat rasa terjemahan ("Itu hak istimewa", "Saya menghargai keputusannya"), dan ritme seragam potongan pendek + satu kata lucu ("Sedikit." "Hampir." "Seri.") di semua NPC.
- **Satu suara per NPC, ikut kartu "Ciri bicara".** Galih, Melinda, Surya tetap baku (*saya, tidak*). Ratna, Nadia, Laras cerewet dan cepat. Darmi, Harjo, Slamet, Endang, Udin campur Jawa ringan. Arya irit kata dan suka angka. Raka pakai istilah polisi. Dimas bocah: tanya beruntun, menawar.
- **Panggilan netral gender.** Mbah Darmi memanggil pemain "Cah" (bukan "Le/Nduk") sampai ada variabel gender di kode.
- **Teknis tetap:** kolom Kondisi dan format `| Kondisi | Dialog |` tidak diubah, aksi `*(…)*`, maksimal 120 karakter per baris, fakta/rahasia dan batas Trust di kartu tidak dilanggar.

## Cara membaca kartu
Setiap NPC punya satu kartu dengan urutan tetap. Gunakan `[id]` (sama dengan `id` di `design/v3/src/cast.js`) saat merujuk NPC dari event, dialog, atau kode.

```
## Nama  [id]
Ringkas: satu kalimat inti karakter.
1. Latar belakang: asal, keluarga, masa lalu
2. Kepribadian & bicara: kebiasaan + 2–3 contoh dialog khas
3. Motivasi · Ketakutan · Rahasia
4. Hubungan: dengan NPC lain (pakai [id])
5. Sikap ke dokter: per tingkat Trust: 0 Asing · 20 Kenal · 40 Akrab · 60 Percaya · 80 Sahabat
6. Kaitan game: Event · Challenge · Jadwal · Hadiah · Kondisi gigi
```

- **Kanon**: setiap kartu mencantumkan tingkat kanon. Pilihannya *Established* (sudah di GDD), *Provisional* (draf buku ini), atau *Under Review*. Seluruh isi baru di buku ini berstatus Provisional sampai di-ACC.
- **Dialog**: maksimal 120 karakter per baris (batas kotak dialog). Nama pemain ditulis `{nama}` dan sapaan "Dok" dipakai sebagai default.
- **Gaya tulisan** (keputusan pemilik proyek 2026-11-11): semua dialog dan deskripsi ditulis supaya terdengar seperti tulisan orang, bukan AI (pakai skill humanizer). Setiap NPC punya ciri bicara sendiri, misalnya logat, kata khas, atau kalimat yang terpotong. Hindari pola "bukan X, tapi Y", kalimat penutup yang dibuat dramatis, dan tanda pisah panjang di dalam kalimat. Ciri bicara warga ada di tabel awal [01-warga.md](01-warga.md).
- **Rahasia/misteri** selalu punya *jawaban sebenarnya* yang ditulis di kartu, walaupun pemain mungkin tidak pernah mengetahuinya.
- **Event** merujuk tabel GDD §13 (mis. "Panen Kopi · K35" = Kemarau hari 35; "H45" = Hujan hari 45).
- **Challenge** merujuk nomor GDD §15 (mis. "#14").
- **Adegan Trust** (di bagian 5) adalah usulan dialog/adegan pendek yang muncul saat ambang Trust tercapai. Bonus trust-nya mengikuti GDD §9 ("event +5"), tidak ada angka baru.
- **Jadwal** memakai blok waktu GDD §2 (Pagi 06–11 · Siang 11–15 · Sore 15–18 · Malam 18–24). Klinik buka 08–16, jadi setiap NPC punya waktu yang bisa ditemui di luar jam klinik.
- **Hadiah** hanya memakai barang yang sudah ada di kota: kopi (Kedai Kopi Seduh), roti (Toko Roti Manis), wedang & gorengan (Angkringan), herba (§7), bunga (Kebun Bunga), jamu (Pondok Jamu), barang Warung, oleh-oleh Tanjung Arum / Metrapura. Besar efek hadiah belum diatur GDD; buku ini hanya menetapkan suka / tidak suka.

## Latar bersama
**Rimbasari** adalah kota kecil di lereng bukit yang hidup dari kopi. Jalannya menurun ke Desa Wetan, Kampung Kali, dan Dusun Atas. Anak mudanya banyak merantau ke **Metrapura** (kota besar, 1/2 hari dengan bus). **Tanjung Arum** adalah kota pelabuhan terdekat.

- **Tidak ada tenaga gigi selama lebih dari 20 tahun.** Puskesmas hanya punya dokter umum (dr. Galih) dan bidan (Wulan). Warga memilih menahan sakit, minum jamu Mbah Darmi, pergi ke Tanjung Arum, atau mendatangi **Pak Joni**, tukang gigi keliling yang buka lapak di pasar sebulan sekali.
- **Om Darto (almarhum Sudarto)**, om jauh pemain (sepupu dari orang tua pemain). Ia membuka **Toko Kelontong Sumber Rejeki** di ruko itu selama 30 tahun. Ia tidak menikah dan tidak punya anak. Pemain hanya bertemu dengannya beberapa kali saat kecil, tapi Om Darto selalu mengirim kartu ulang tahun. Ia meninggal kira-kira setahun sebelum game dimulai dan mewariskan ruko kepada pemain lewat surat wasiat. Ruko sempat dipasangi papan DIJUAL, tapi tidak laku.
  - Om Darto dikenal warga sebagai orang yang suka memberi utang dan sahabat catur Kakek Wiryo.
  - Ia punya gigi palsu buatan Pak Joni yang sering membuatnya sariawan. Kebiasaannya "nanti saja ke dokter gigi" menjadi gema kecil bagi pemain.
  - Benang cerita: **surat Om Darto untuk pemain** yang tak pernah terkirim, disimpan Mas Ilham (lihat `[ilham]`). Surat itu menjawab kenapa ruko diwariskan kepada pemain.
  - *Jawaban sebenarnya*: Om Darto dulu pernah ditolong orang tua pemain saat tokonya hampir bangkrut. Dari kartu-kartu balasan pemain kecil ("aku mau jadi dokter gigi!"), ia tahu cita-cita pemain. Ia sadar Rimbasari tidak punya dokter gigi, dan dirinya sendiri terlambat berobat. Di surat ia menulis: "Ruko ini cuma bisa jualan gula. Mungkin di tanganmu, ruko ini bisa ganti jualan senyum." Surat itu ditulis dua minggu sebelum ia meninggal, lalu dikembalikan kantor pos karena alamat pemain sudah berganti. (Kanon: Provisional)

## Peta relasi (ringkas)
*Diisi bertahap setelah tiap kelompok di-ACC.*

Warga:
- Keluarga: Pak Harjo ↔ Pak Bowo (kakak–adik) · Bu Endang ↔ Dimas (ibu–anak)
- Guru–murid: Kakek Wiryo pernah mengajar hampir semua warga dewasa, termasuk Harjo, Bowo, Ratna, Endang, Slamet, dan Ilham. Ia juga membimbing Bu Sinta.
- Lingkar warung: Bu Ratna ↔ Kak Tari (teman gosip) · Bu Ratna → Bu Endang (memberi utang)
- Lingkar angkringan: Pak Slamet, Coach Doni, Kakek Wiryo, Pak Bowo, Mas Ilham
- Rantai kopi: Pak Bowo → Pak Slamet (angkringan) dan → Nadia (Kedai Kopi Seduh)
- Bayang Om Darto: Kakek Wiryo (sahabat catur) · Bu Ratna (pesaing sekaligus pemberi modal awal) · Pak Harjo (diam-diam membayar pajak ruko) · Mas Ilham (menyimpan suratnya)
- Bayang Pak Joni: Dimas (trauma cabut gigi) · Kakek Wiryo (gigi palsu longgar) · Pak Bowo (pernah ditambal Joni)

Romance pria (draf):
- Adji: akuntan Balai Kota, klien Bowo, "dijodohkan" Ratna, pelanggan roti kismis Tari, teman gaple Raka
- Arya: sahabat Raka, mentor gambar Dimas, teman diam Sekar, pernah membetulkan saluran air kebun Bowo
- Ipda Raka: mitra Harjo, sahabat Arya, rival Doni, menengahi klaim Pak Gunawan, menyelidiki Pak Joni
- dr. Galih: rekan Wulan, pengagum Mbah Darmi, merujuk Pak Hasan, Bu Lastri, dan Pak Yusuf

## Indeks event → NPC
*Diisi bertahap.*

| Event (GDD §13) | NPC utama |
|---|---|
| Pembukaan Klinik (trigger) | Pak Harjo (pidato), Bu Ratna, Kakek Wiryo |
| Pameran Gigi Sehat · K15 | Bu Sinta, Dimas, Kak Tari |
| Panen Kopi · K35 | Pak Bowo |
| Pesta Rakyat · K55 | Bu Endang (kostum), Coach Doni (turnamen voli), Pak Slamet |
| Tanam Pohon Bersama · H10 | Pak Harjo, Mbah Darmi, Mas Ilham |
| Bakti Sosial · H25 | Bu Sinta, Pak Harjo |
| Malam Lampion · H45 | Kakek Wiryo, Bu Ratna |
| Syukuran Akhir Tahun · H60 | Pak Harjo (#36), Kak Tari (kue), Pak Bowo |
| Karaoke Malam Minggu (Sab) | Pak Slamet (pembawa acara), Kak Tari, Coach Doni |
