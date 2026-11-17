# 01 — Konsultasi

> Status: **ACC 2026-11-11** (angka bertanda [usulan] dipakai sebagai nilai awal, disetel saat playtest) · **Baru** (di GDD §6 konsultasi hanya disebut sebagai harga dan alur, belum berupa minigame).
> Aturan umum: `00-aturan-umum.md`. Harga wajar 150rb T1 (GDD §4.1), tidak berubah.

## 1. Ringkasan
Konsultasi adalah saat dokter menjelaskan apa yang dia temukan dan menawarkan rencana. Dimainkan dengan input PILIH, tanpa Bar Sakit dan tanpa timing. Konsultasi muncul di dua tempat:
1. Di dalam alur, tepat sebelum ⑤ Persetujuan. Hasilnya menggeser peluang pasien setuju.
2. Sebagai tindakan sendiri, kalau pasien hanya diperiksa (stok bahan habis, pasien menolak tindakan, kontrol, atau rujukan). Ditagih sebagai Konsultasi.

## 2. Rasa yang dituju
Pasien pulang dengan paham. Senjata pemain di sini bukan tangan, tapi cara menjelaskan: tahu kapan memakai rontgen sebagai bukti, kapan cukup memakai perumpamaan, dan kapan menawarkan jalan yang lebih murah.

## 3. Aturan

| Langkah | Yang dilakukan pemain | Dihitung benar kalau |
|---|---|---|
| 1. Tunjukkan temuan | Pilih 1 dari 3 kartu temuan, misalnya "lubang sampai dekat saraf" atau "karang di bawah gusi" | Kartu cocok dengan hasil pemeriksaan ② dan rontgen ③ |
| 2. Pilih cara bicara | Medis / awam / perumpamaan | Cocok dengan sifat pasien: anak → perumpamaan, sepuh → awam, pasien curiga → medis + tunjukkan rontgen |
| 3. Tawarkan rencana | Rencana utama + 1 alternatif | Rencana sesuai tabel diagnosis GDD §6 ④, dan ada alternatif terjangkau kalau pasien kurang mampu (misalnya PSA atau cabut) |
| 4. Edukasi (opsional) | Pilih 1 tips dari 3 | Tips relevan dengan diagnosis, misalnya diabetes → hubungan gula darah dan gusi |

- Sifat pasien terlihat dari ikon kecil di kartu pasien dan dari dialog anamnesis. Untuk pasien spesial, sifatnya diambil dari `design/narrative/npc/03-pasien.md`.
- **Kartu jebakan**: sesekali muncul kartu "whitening" atau "pasang behel" sebagai rencana. Memilihnya selalu dihitung salah, karena layanan itu tidak ada (GDD §1).
- **Hasil**: 3–4 benar = **Sukses**, 2 benar = **Cukup**, 0–1 benar = **Gagal**. Langkah 4 yang dilewati dihitung tidak benar dan tidak salah, sehingga konsultasi tanpa edukasi paling tinggi mendapat 3 dari 3 dan tetap Sukses.

| Hasil | Efek |
|---|---|
| Sukses | Peluang setuju di ⑤ +20% **[usulan]**, trust +1 **[usulan]** |
| Cukup | Tanpa efek |
| Gagal | Pasien bingung, peluang menolak di ⑤ +20% **[usulan]**. Tidak dihitung tindakan gagal, jadi tanpa stres +10 dan tanpa trust −6 |

- **Tier alat**: tidak mengubah cara main. Rontgen periapikal (T2) dan panoramik (T3) menambahkan kartu bukti "lihat foto rontgennya", yang otomatis benar di langkah 1 untuk pasien yang curiga.
- **Staf & herba**: Daun Mint memberi bayaran +10% (GDD §7). Dokter Gigi Rekan menangani konsultasi otomatis di kursi 2 (GDD §5).
- **Energi**: 5 **[usulan]**. **Durasi**: 10 menit game **[usulan]**, berjalan saat konsultasi selesai (waktu berhenti selama memilih).

## 4. Rumus
```
peluang_setuju_akhir = peluang_setuju_GDD × (1 + E_konsul)
E_konsul = +0.20 (Sukses) · 0 (Cukup) · −0.20 (Gagal)
```
`peluang_setuju_GDD` dihitung dari trust, kemampuan bayar, dan rasio tarif (GDD §6 ⑤, §4.1), tidak diubah di sini. Contoh: peluang dasar 60%, Sukses → 72%.

## 5. Kasus khusus
- **Pasien anak dengan orang tua**: cara bicara dinilai untuk anak (perumpamaan), sedangkan rencana dan biaya dinilai untuk orang tua.
- **Hanya konsultasi karena stok habis**: langkah 3 tetap dimainkan. Pasien dijadwal kembali, dan rencananya tercatat di Rekam Medis.
- **Rujukan** (misalnya pasien jantung ke dr. Galih): rencana "rujuk dulu" dihitung benar kalau riwayat medisnya memang membutuhkan rujukan.

## 6. Ketergantungan
GDD §1, §4.1, §5, §6 ①–⑤, §7. `03-pasien.md` (sifat pasien). `02-resep.md` (konsultasi sering diikuti resep).

## 7. Tuning Knobs (usulan)
| Knob | Usulan | Rentang aman | Memengaruhi |
|---|---|---|---|
| `E_konsul` | ±0.20 | 0.10–0.35 | Nilai konsultasi yang baik |
| Trust Sukses | +1 | 0–3 | Hubungan jangka panjang |
| Energi | 5 | 2–10 | Biaya pasien periksa saja |
| Durasi | 10 menit game | 5–15 | Kepadatan antrian |

## 8. Kriteria lulus
- [ ] Kartu "whitening" selalu dihitung salah.
- [ ] Peluang dasar 60% + Sukses → tampil 72% di layar Persetujuan.
- [ ] Gagal konsultasi tidak menambah stres +10.
- [ ] Dengan stok 0, hanya Konsultasi dan Resep yang aktif.

## Sumber
Konsultasi tidak memakai prosedur klinis khusus. Aturan riwayat medis dan rujukan ada di `00-aturan-umum.md`.
