# Buku NPC · 06 · Jadwal Mingguan

> Status: **ACC 2026-11-11** (termasuk tempat tinggal, Kos Melati, Losmen Singgah, rawat inap Puskesmas; sudah digambar di v3 dan dicatat di GDD §6/§11).
> Jadwal ini merinci ringkasan jadwal di kartu-kartu yang sudah ACC (01–05) dan tidak bertentangan dengannya. Formatnya disiapkan supaya mudah diubah jadi data kode di Fase 3a.

## Cara membaca
- Setiap NPC punya tabel **Jam × (Sen–Jum | Sab | Min)**. Baris **Khusus** mencatat hari yang berbeda dari pola itu. Contoh: untuk tahu Sekar ada di mana hari Selasa jam 09:00, lihat kolom Sen–Jum, lalu cek baris Khusus.
- Jam memakai jam game (GDD §2, hari 06:00–24:00). Di luar jam yang tertulis, NPC tidur di tempat tinggalnya dan tidak bisa ditemui.
- **"pulang ✕"** berarti NPC pulang ke rumah yang tidak punya interior (lewat jalan atau gerbang zona terdekat), jadi tidak bisa ditemui.
- Perpindahan lokasi memakai waktu jalan 15–30 menit game. Selama itu NPC terlihat berjalan di peta.

## Tempat tinggal (ACC 2026-11-11)
| NPC | Tinggal di | Interior? |
|---|---|---|
| Pak Harjo, Pak Bowo, Bu Sinta | Rumah Lurah / Bowo / Guru (sudah ada) | ya |
| Bu Endang, Dimas | Rumah Keluarga Endang | ya |
| Kakek Wiryo | Rumah Wiryo | ya |
| Bu Ratna | Rumah di belakang warung | tidak (warung bisa dimasuki) |
| Mbah Darmi | Pondok Jamu | ya |
| Kak Tari | Rumah di belakang Toko Roti | tidak |
| Pak Slamet, Mas Ilham, Coach Doni | Kampung Asri (rumah tanpa bangunan di peta) | pulang ✕ |
| Adji, Arya, Nadia | Lantai atas kantor/kedai masing-masing (model ruko) | lantai bawah saja |
| Ipda Raka | Mes di belakang Pos Polisi | tidak |
| dr. Galih, Wulan | Rumah dinas di belakang Puskesmas | tidak |
| Sekar | Rumah Bu Lies, menyatu dengan Perpustakaan | perpustakaan saja |
| Laras | Rumah di belakang Studio Foto Lensa (bersama Pak Harto) | studio saja |
| **Rina, Yoga, drg. Hana, drg. Bima, Pak Udin** | **Kos Melati** (bangunan baru, Kampung Asri) | ya (1 interior baru) |
| Putri, Bu Siti | Kampung Asri | pulang ✕ |
| Fajar / Dewi | Desa Wetan / Kampung Kali (luar peta) | pulang ✕ |
| Pasien spesial | Desa asal (luar peta). Malam sebelum kunjungan lanjutan menginap di **Losmen Singgah**. Setelah bedah minor atau abses, semalam di **Puskesmas** | Losmen: ya (1 interior baru) |
| Bu Sri (istri Pak Bowo) | Rumah Bowo, bekerja di Losmen Singgah 07–19 | — |

**Kos Melati** (keputusan pemilik proyek 2026-11-11: satu bangunan baru): rumah besar Pak Udin yang kamarnya disewakan sejak istrinya, Bu Melati, meninggal. Namanya diambil dari nama istrinya. Pak Udin tinggal di kamar depan. *Draf v3 eksterior + interior ACC 2026-11-11, tercatat di GDD §11.*

**Losmen Singgah** (keputusan pemilik proyek 2026-11-11: bangunan baru di Jalan Niaga, di samping Terminal Bus): penginapan sederhana enam kamar (hanya kamar 2 dan 5 yang bisa dimasuki, area pribadi pasien, syarat trust ≥ 40), dikelola **Bu Sri**, istri Pak Bowo. Bu Sri bekerja di sana 07–19 dan pulang ke Rumah Bowo malam hari.
- *Siapa yang menginap*: pasien desa yang punya kunjungan lanjutan keesokan harinya (PSA K2, kontrol, tindakan setelah resep), pasien yang datang sore, dan tamu luar kota (drg. Surya di Bab 4).
- *Mekanik* (fitur di luar MVP, dicatat di GDD §6):
  - Pasien yang menginap selalu jadi **antrian pertama jam 08:00** pada hari kunjungannya. Antrian pagi lebih cepat terisi.
  - Malam hari (18–22) pemain bisa **menjenguk** pasien di Losmen. Itu dihitung ngobrol (trust +3/hari, GDD §9).
  - Tidak ada sistem pasien telat atau bolos.
- *Draf v3 (eksterior, lobi, kamar 2, kamar 5) ACC 2026-11-11, tercatat di GDD §11.* Mekanik dicatat di GDD §6.

**Rawat inap Puskesmas** (keputusan pemilik proyek 2026-11-11): pasien setelah **bedah minor** atau **abses** menginap semalam di Puskesmas lewat kerja sama dengan Puskesmas. Wulan atau Galih yang merawat. Pemain bisa menjenguk 18–22 (trust +3, dihitung ngobrol), dan ada dialog khusus bersama Galih atau Wulan. Tidak ada angka baru. Pakai interior Puskesmas yang sudah ada (interior diperbesar ke 320×200 dengan 2 ranjang rawat inap, ACC 2026-11-11).

## Aturan pengecualian (urutan prioritas)
1. **Event** (GDD §13): selama jam event, NPC yang disebut di kartunya pindah ke lokasi event. Contoh: Pameran Gigi Sehat K15 di SD 08–12 (Sinta, Dimas, Tari, Wulan). Panen Kopi K35 di Kebun Kopi 06–18 (Bowo, Nadia, Harjo).
2. **Karaoke Malam Minggu** (Sabtu 19–23, Angkringan): Slamet (pembawa acara), Tari, Doni, Adji, Raka, Laras, Bima, Putri, plus Endang (30% kemungkinan).
3. **Pasangan pemain** (setelah menikah): tidur di rumah pemain. Pagi 06–07:30 di rumah pemain, malam mulai 21:00 di rumah pemain, dan jam kerja tetap seperti biasa.
4. **Hujan** (musim Hujan, hari hujan): tempat terbuka pindah ke tempat beratap.
   - Lapangan Voli → Kedai Kopi · Bukit Bintang → Perpustakaan (sebelum 19:00) atau tempat tinggal
   - Meja catur Alun-alun → Rumah Wiryo · Kebun Bunga → Perpustakaan · Laras keliling → Studio Foto
   - Kebun Kopi, Ilham keliling, dan patroli Raka **tetap jalan** (pakai jas hujan; dialognya berbeda).
5. **Pasar Kamis** (Kamis 07–11, tenda pasar Alun-alun): Mbah Darmi, Bu Lastri, pasien spesial yang dijadwalkan, dan Pak Joni (minggu pertama tiap bulan, 07–12).
6. **Klinik**: staf yang direkrut ada di Klinik selama jam buka yang diatur pemain (default Sen–Sab 08–16, GDD §2), dan pulang 30 menit setelah klinik tutup. Staf yang belum direkrut mengikuti baris "Belum direkrut".

---

## Warga

### Pak Harjo
| Jam | Sen–Jum | Sab | Min |
|---|---|---|---|
| 06–08 | Rumah Lurah | Rumah Lurah | Kebun Kopi |
| 08–14 | Balai Kota | Rumah Lurah | Kebun Kopi (sampai 11), lalu Rumah Lurah |
| 14–15 | Rumah Lurah | Rumah Lurah | Rumah Lurah |
| 15–17 | keliling Alun-alun | keliling Alun-alun | Rumah Lurah |
| 17–19 | Rumah Lurah | Rumah Lurah | Rumah Lurah |
| 19–21 | Rumah Lurah (telepon istri jam 20) | Angkringan | Rumah Lurah |

### Bu Ratna
| Jam | Sen–Jum | Sab | Min |
|---|---|---|---|
| 06–15 | Warung | Warung | Warung |
| 15–17 | Warung | Warung | Toko Roti |
| 17–21 | Warung | Warung | Warung |

### Mbah Darmi
| Jam | Sen–Jum | Sab | Min |
|---|---|---|---|
| 05–12 | Pondok Jamu | Pondok Jamu | Pondok Jamu |
| 12–15 | Pondok Jamu (tidur siang, pintu tertutup) | sama | sama |
| 15–19 | Pondok Jamu | Pondok Jamu | Pondok Jamu |
- Khusus: **Kamis 07–11** Alun-alun (pasar).

### Dimas
| Jam | Sen–Jum | Sab | Min |
|---|---|---|---|
| 06–07 | Rumah Endang | Rumah Endang | Rumah Endang |
| 07–12 | SD | SD | Alun-alun (07–10), lalu Rumah Endang |
| 12–16 | Rumah Endang | Rumah Endang | Rumah Endang |
| 16–17:30 | Lapangan Voli | Lapangan Voli | Rumah Endang |
| 17:30–21 | Rumah Endang | Rumah Endang | Rumah Endang |

### Bu Endang
| Jam | Sen–Jum | Sab | Min |
|---|---|---|---|
| 06–07 | Warung | Warung | Warung |
| 07–22 | Rumah Endang (menjahit) | sama | sama |
- Khusus: Sabtu 19–21, 30% kemungkinan ikut Karaoke di Angkringan.

### Pak Bowo
| Jam | Sen–Jum | Sab | Min |
|---|---|---|---|
| 06–15 | Kebun Kopi | Kebun Kopi | Kebun Kopi (bersama Harjo) |
| 15–19 | Rumah Bowo | Rumah Bowo | Rumah Bowo |
| 19–21 | Angkringan | Angkringan | Angkringan |

### Bu Sinta
| Jam | Sen–Jum | Sab | Min |
|---|---|---|---|
| 06–07 | Rumah Guru | Rumah Guru | Rumah Guru |
| 07–13 | SD | SD | Rumah Guru |
| 13–15 | Rumah Guru | Rumah Guru | Rumah Guru |
| 15–16 | Perpustakaan | Perpustakaan | Rumah Guru |
| 16–17 | Perpustakaan | Perpustakaan | Kedai Kopi |
| 17–18 | Rumah Guru | Rumah Guru | Kedai Kopi |
| 18–22 | Rumah Guru | Rumah Guru | Rumah Guru |
- Khusus: Minggu 12–14 Rumah Guru makan bersama drg. Hana (kalau Hana sudah tinggal di kota).

### Pak Slamet
| Jam | Sen–Jum | Sab | Min |
|---|---|---|---|
| 07–10 | Alun-alun (belanja di tenda pasar) | sama | sama |
| 10–17 | pulang ✕ (tidur siang) | sama | sama |
| 18–24 | Angkringan | Angkringan (Karaoke 19–23) | Angkringan |

### Kak Tari
| Jam | Sen–Jum | Sab | Min |
|---|---|---|---|
| 05–17 | Toko Roti | Toko Roti | Toko Roti |
| 17–18 | Warung | Warung | Warung |
| 18–22 | rumah belakang toko ✕ | Angkringan 19–21 (Karaoke), lainnya ✕ | rumah ✕ |

### Mas Ilham
| Jam | Sen–Jum | Sab | Min |
|---|---|---|---|
| 08–10 | Kantor Pos | Kantor Pos | pulang ✕ |
| 10–15 | keliling (posisi acak di jalan 4 zona) | keliling (sampai 12) | pulang ✕ |
| 16–18 | Lapangan Voli | Lapangan Voli | Lapangan Voli |
| 18–21 | pulang ✕ | pulang ✕ | pulang ✕ |
- Khusus: **Kamis 19–21** Angkringan.

### Kakek Wiryo
| Jam | Sen–Jum | Sab | Min |
|---|---|---|---|
| 07–11 | Alun-alun (meja catur) | Alun-alun (meja catur) | Perpustakaan (09–11) |
| 11–15 | Rumah Wiryo | Rumah Wiryo | Rumah Wiryo |
| 15–17 | Alun-alun (meja catur) | Alun-alun (meja catur) | Rumah Wiryo |
| 17–21 | Rumah Wiryo | Rumah Wiryo | Rumah Wiryo |
- Khusus: **Selasa & Jumat 19–20** Angkringan.

### Coach Doni
| Jam | Sen–Jum | Sab | Min |
|---|---|---|---|
| 06–08 | Lapangan Voli (lari pagi) | Lapangan Voli | Lapangan Voli |
| 08–12 | SD | SD | pulang ✕ |
| 12–15 | pulang ✕ | pulang ✕ | pulang ✕ |
| 16–18 | Lapangan Voli | Lapangan Voli | Lapangan Voli |
| 19–21 | Angkringan | Angkringan (Karaoke) | Angkringan |

---

## Romance

### Adji
| Jam | Sen–Jum | Sab | Min |
|---|---|---|---|
| 06–07:30 | lantai atas kantor ✕ | ✕ | Alun-alun (06–09, "lari", lalu beli bubur) |
| 07:30–08 | Toko Roti (roti kismis) | Toko Roti | — |
| 08–17 | Kantor Akuntan | Kantor Akuntan | Kantor Akuntan tutup ✕ |
| 17–19 | Kedai Kopi | Kedai Kopi | Kedai Kopi (16–18) |
| 19–22 | ✕ | Angkringan (Karaoke) | ✕ |
- Khusus: **Jumat 19–22** Angkringan (gaple dengan Raka).

### Arya
| Jam | Sen–Jum | Sab | Min |
|---|---|---|---|
| 08–12 | Kantor Konsultan | Kantor Konsultan | Kampung Kali (luar peta) ✕ |
| 13–17 | lokasi proyek (lihat Khusus) | lokasi proyek | ✕ |
| 18–19 | Perpustakaan | Perpustakaan | ✕ |
- Khusus proyek 13–17: **Sen & Kam** Alun-alun · **Sel & Jum** Kampung Asri (tanggul) · **Rab & Sab** Lereng Bukit.
- Khusus: **Rabu 20–22** Bukit Bintang.

### Ipda Raka
| Jam | Sen–Jum | Sab | Min |
|---|---|---|---|
| 07–15 | Pos Polisi | Pos Polisi | Pos Polisi (piket, 07–12) |
| 16–18 | Lapangan Voli | Lapangan Voli | Lapangan Voli |
| 18–20 | Angkringan | Angkringan | Angkringan |
| 20–23 | patroli (Alun-alun ↔ Jalan Niaga) | Angkringan (Karaoke) sampai 22, lalu patroli | patroli |
- Khusus: **Jumat 19–22** gaple dengan Adji di Angkringan, patroli mulai 22.

### dr. Galih
| Jam | Sen–Jum | Sab | Min |
|---|---|---|---|
| 07–14 | Puskesmas | Puskesmas | rumah dinas ✕ |
| 15–17 | Perpustakaan | Perpustakaan | Bukit Bintang (15–18) |
| 17–18 | Kedai Kopi (teh) | Kedai Kopi | — |
| 18–20 | rumah dinas ✕ | ✕ | ✕ |
- Khusus: **Selasa & Jumat 20–24** jaga malam di Puskesmas.

### Sekar
| Jam | Sen–Jum | Sab | Min |
|---|---|---|---|
| 06–09 | Kebun Bunga | Kebun Bunga | Kebun Bunga |
| 09–19 | Perpustakaan | Perpustakaan | Perpustakaan (09–15) |
| 16–18 | — | — | Kedai Kopi |
- Khusus: **Senin** perpustakaan tutup, jadi **09–12 Pondok Jamu** (belajar dengan Mbah Darmi), lalu 12–19 Perpustakaan (pintu tertutup, tapi bisa diketuk).

### Nadia
| Jam | Sen–Jum | Sab | Min |
|---|---|---|---|
| 05–07 | Kebun Kopi (rahasia) | Kebun Kopi | Kebun Kopi |
| 08–22 | Kedai Kopi | Kedai Kopi | Kedai Kopi |
- Khusus: **Senin** kedai tutup, jadi Nadia **tidak ada di kota** (Tanjung Arum atau tidur seharian). Kebun Kopi pagi tetap.

### Laras
| Jam | Sen–Jum | Sab | Min |
|---|---|---|---|
| 09–15 | Studio Foto Lensa | Studio Foto Lensa | Studio Foto (09–12) |
| 15–18 | keliling memotret (acak: Bukit Bintang 50%, Alun-alun 30%, lainnya 20%) | sama | sama |
| 18–21 | rumah belakang studio ✕ | Angkringan 19–21 (Karaoke, memotret) | ✕ |

### Wulan
| Jam | Sen–Jum | Sab | Min |
|---|---|---|---|
| 07–15 | Puskesmas | Puskesmas | rumah dinas ✕ |
| 15–20 | rumah dinas ✕ | ✕ | ✕ |
- Khusus: **Rabu & Sabtu 07–11** Posyandu keliling di Kampung Asri (lalu Puskesmas 11–15).
- Khusus: **Senin & Kamis 20–24** jaga malam di Puskesmas.
- Khusus: **Minggu pertama tiap bulan** pulang ke Dusun Atas (tidak ada di kota hari itu).

---

## Staf
Kalau sudah direkrut, staf ada di **Klinik** selama jam buka (aturan 6). Tabel di bawah hanya untuk jam di luar klinik, ditambah baris "Belum direkrut".

| Staf | Muncul di kota sejak | Sore & malam (setelah klinik) | Minggu | Belum direkrut (jam kerja) |
|---|---|---|---|---|
| Putri | awal game | Warung 17–19 · Sab Karaoke | Kedai Kopi 15–18 | Warung (bantu Bu Ratna) 08–16 |
| Yoga | awal game | Lapangan Voli 16:30–18 · Sab Perpustakaan 16:30–18 | Lapangan Voli 16–18 | Kantor Akuntan (bantu Adji) 08–16 |
| Rina | klinik tahap 2 | Kedai Kopi 17–19 | Bukit Bintang 15–18 | Puskesmas (relawan) 08–14, lalu Kos Melati |
| Fajar | klinik tahap 2 | pulang ✕ (Desa Wetan) · Sab Lapangan Voli 16–18 | ✕ | Kamis pasar, menemani Pak Hasan 07–11 |
| Dewi | klinik tahap 2 | pulang ✕ (Kampung Kali) | Perpustakaan 10–14 | Puskesmas (membantu Wulan) 07–15 |
| Pak Udin | awal game | Alun-alun (meja catur, menonton) 16:30–17:30 · Angkringan 19–20 | Kos Melati | Kos Melati (menyapu halaman) 07–11, Alun-alun 15–17 |
| Bu Siti | awal game | Angkringan (membantu) 18–21 | Warung 09–11 | Angkringan siang (persiapan) 14–18 |
| drg. Hana | klinik tahap 3 | Perpustakaan 16:30–18 | Rumah Guru 12–14 | Perpustakaan 09–15 |
| drg. Bima | klinik tahap 3 | Lapangan Voli 16:30–18 · Kedai Kopi 18–20 · Sab Karaoke | Lapangan Voli 16–18 | Kedai Kopi 10–15 |

---

## Pasien spesial & luar kota
| NPC | Di kota |
|---|---|
| Pasien spesial (12) | Datang ke klinik sesuai pemicu di [03-pasien.md](03-pasien.md). Di luar itu, Kamis 07–11 di tenda pasar Alun-alun: Bu Lastri setiap Kamis, Pak Hasan Kamis minggu ke-2 dan ke-4, Pak Yusuf dan Nenek Sumi Kamis minggu ke-3. Andre: Lapangan Voli 16–18 setiap hari kecuali Minggu. Tika: Kedai Kopi 15–20, Sel–Sab (kerja paruh waktu). Kiki: SD 07–12, Sen–Sab. |
| Koh Hendra | Bahari Medika, Tanjung Arum, 08–17 Sen–Sab |
| Bu Melinda | Metra Dental Supply, Metrapura, 09–17 Sen–Sab |
| drg. Surya | Hanya Bab 4 dan Epilog. Di Bab 4 dia datang siang dan menginap semalam di Losmen Singgah (bisa ditemui 18–22), lalu pulang besok paginya |
| Pak Joni | Kamis minggu pertama tiap bulan, 07–12, lapak di bawah pohon dekat Angkringan. Setelah resolusi #32 yang baik, sesekali ke Klinik (Kamis 12–13) |
