# Audio: BGM & SFX — Senyum Rimbasari

> **Status: DRAF, menunggu acc user** (2026-11-11). Belum ada kode audio. Dikerjakan mulai Fase 2 setelah ACC.
> Referensi rasa: Stardew Valley (hangat, akustik, tidak berisik).

## 1. Overview
Musik latar (BGM) memakai file MP3 dari user. Efek suara (SFX) dan suara lingkungan dibuat sendiri dengan WebAudio di dalam kode (GDD §16), jadi tidak ada file SFX. Semua suara mengikuti satu gaya: **lembut, bulat, hangat**. Serangan suara tidak tajam, frekuensi tinggi dipotong (≈ di atas 6 kHz), dan tidak ada bunyi yang bikin ngilu, termasuk bor gigi.

## 2. Player Fantasy
Pemain merasa betah di kota kecil: pagi ada kicau burung, malam ada jangkrik atau rintik hujan. Di klinik, alat gigi terdengar "kartun" dan ramah. Pemain merasa jadi dokter yang menenangkan, bukan yang menakutkan.

## 3. BGM

### 3.1 File dari user (disalin ke `assets/audio/bgm/`)
| Lagu | File | Dipakai di | Asal |
|---|---|---|---|
| **Main Theme** | `main-theme.mp3` (±51 dtk, loop) | Layar judul, kustomisasi, surat pembuka, credit roll | `Music/game/main song.mp3` |
| **Musim Kemarau** | `musim-kemarau.mp3` (±51 dtk) | Di luar ruangan saat Musim Kemarau, 06–18 | `Music/game/kemarau.mp3` |
| **Musim Hujan** | `musim-hujan.mp3` (±47 dtk) | Di luar ruangan saat Musim Hujan, 06–18 | `Music/game/musim hujan.mp3` |
| **Klinik** | `klinik.mp3` (±57 dtk) | Selama klinik buka & minigame tindakan | `Music/game/clinic.mp3` |
| **Malam** | `malam.mp3` | Semua musim, 18:00–24:00 (di luar klinik buka/event/romance) | `Music/game/malam.mp3` (2026-11-17) |
| **Romance** | `romance.mp3` (±51 dtk) | Event romance E1–E5, kencan, Bukit Bintang malam | `Music/game/romance.mp3` |
| **Festival / Event Kota** | **belum ada** | 8 event musiman (GDD §13) | Lihat §3.3 |

### 3.2 Aturan pemutaran
- **Prioritas:** event kota > romance > klinik/minigame > lagu malam (18–24) > lagu musim.
- **Pindah lagu:** crossfade 1,5 dtk. Lagu yang sama tidak diulang dari awal saat pindah zona.
- **Dalam ruangan:** lagu zona tetap jalan tapi **teredam** (filter low-pass + volume 60%), seperti terdengar dari luar. Ini memberi rasa "masuk rumah" tanpa ganti lagu. Rumah pemain memakai versi teredam ini juga.
- **Malam (18:00–24:00):** lagu musim berganti (crossfade) ke **lagu Malam** `malam.mp3`, suara lingkungan (jangkrik/hujan) tetap jalan. Pukul 06:00 lagu musim masuk lagi bersama jingle pagi. (Sebelumnya: hening mulai 20:00; diganti atas permintaan user 2026-11-17.)
- **Loop:** file sekitar 50 dtk. Saat Fase 2, sambungan loop dicek dulu. Kalau sambungannya terdengar, ditambah fade 0,3 dtk di ujung.
- **Pengaturan:** menu Esc → *Pengaturan*: volume Musik, Efek, Lingkungan (0–100%), tombol **M** untuk bisu. Disimpan di save.
- **Browser:** audio baru boleh berbunyi setelah klik/tombol pertama. Layar judul menunggu klik atau tombol pertama, lalu Main Theme mulai.

### 3.3 Pilihan untuk BGM Festival (perlu keputusan user)
- **A. User mengunggah file** (disarankan): akordeon, perkusi akustik, ceria seperti pesta desa. Paling cocok dengan lagu lain yang akustik.
- **B. Dibuat dengan kode (WebAudio):** bisa ceria, tapi suaranya akan lebih "chiptune" dan tidak seakustik lagu lain.

### 3.4 Cara masuk ke game (perlu keputusan user)
- **A. Ditanam ke `index.html`** saat build (base64). Tetap satu file, tapi ukurannya naik dari ±0,4 MB menjadi ±9 MB. Disarankan, karena sesuai aturan "satu file, tanpa aset luar".
- **B. File terpisah** di `assets/audio/` di samping `index.html`. File game kecil, tapi game harus dibuka bersama foldernya.

## 4. SFX (dibuat dengan WebAudio)
Kolom **Fase** = kapan dibuat. Semua deskripsi adalah target rasa suaranya.

### 4.1 UI & Menu
| ID | Suara | Deskripsi | Fase |
|---|---|---|---|
| `ui_hover` | Sorot tombol | Ketukan kayu sangat pelan, nyaris tak terdengar | 2 |
| `ui_click` | Klik/konfirmasi | "Tik" kayu kecil yang renyah, 2 nada pendek | 2 |
| `ui_tick` | Ganti pilihan ◀ ▶ | Ketukan marimba satu nada, naik-turun sesuai arah | 2 |
| `ui_open` | Buka menu/panel | Kertas tersibak + 2 nada marimba naik (ikut animasi dropdown) | 2 |
| `ui_close` | Tutup panel | Kebalikan `ui_open`: 2 nada turun, lebih pelan | 2 |
| `ui_deny` | Tidak bisa/salah | 2 nada turun yang lembut, bukan buzzer | 2 |
| `ui_type` | Ketik nama | Klik mesin ketik mini, nada sedikit acak | 2 |
| `paper_flip` | Halaman surat/kalender | Kertas dibalik | 2 |
| `coin_in` | Uang masuk | "Cring" koin + lonceng kecil. Jumlah besar = 2–3 koin beruntun | 2 |
| `coin_out` | Uang keluar/bayar | Koin jatuh pelan ke laci kayu | 2 |
| `save_ok` | Tersimpan | Lonceng kecil satu kali | 2 |
| `rep_up` / `rep_down` | Reputasi naik/turun | Kilau bintang 3 nada naik / 1 nada turun | 2 |

### 4.2 Waktu & Status
| ID | Suara | Deskripsi | Fase |
|---|---|---|---|
| `morning` | Jingle pagi | Kokok ayam jauh + 3 nada gitar petik (06:00) | 2 |
| `season_new` | Musim baru | Jingle 5 nada. Kemarau: flute cerah. Hujan: piano lembut | 2 |
| `clock_late` | Sudah 22:00 | 2 dentang jam dinding, pelan | 2 |
| `sleep` | Tidur | Kotak musik 3 nada turun, lalu sunyi | 2 |
| `faint` | Pingsan | Nada turun berputar + bunyi jatuh empuk (lucu, tidak seram) | 2 |
| `pause_on/off` | Jeda | Musik ditahan + "klik" jam berhenti / jalan | 2 |
| `low_energy` | Energi < 20 | Satu detak lembut, sekali saja | 2 |

### 4.3 Interaksi Dunia
| ID | Suara | Deskripsi | Fase |
|---|---|---|---|
| `step_grass` | Langkah di rumput | Gemerisik pendek, 2 variasi bergantian | 2 |
| `step_dirt` | Langkah di jalan tanah | "Kresek" tumpul | 2 |
| `step_stone` | Langkah di paving Alun-alun | Ketukan batu ringan | 2 |
| `step_wood` | Lantai kayu (rumah, ruko) | "Tok" tumpul hangat | 2 |
| `step_tile` | Ubin klinik/rumah | Tap bersih, sedikit bergema | 2 |
| `door_open` / `door_close` | Pintu | Derit engsel singkat + klik gagang / "tok" kayu | 2 |
| `door_bell` | Pintu klinik/toko | "Kring" bel toko kecil saat pasien atau pemain masuk | 2 |
| `zone_go` | Gerbang zona | Hembusan angin pelan | 2 |
| `bed` | Rebahan di kasur | Kain & per kasur | 2 |
| `water` | Siram herba | Guyur air pendek dari gembor | 2 |
| `plant` | Tanam bibit | Tanah ditepuk 2× | 2 |
| `harvest` | Petik herba | "Pop" lembut + daun bergemerisik | 2 |
| `board` | Papan pengumuman / kalender dinding | Kertas tertiup | 2 |

### 4.4 Alat Kedokteran Gigi (PENTING)
Prinsip: **tidak ada bunyi ngilu**. Bor dan alat tajam dibuat versi kartun dengan nada rendah-sedang, volume kecil, dan tanpa desing tinggi.
| ID | Alat | Deskripsi | Fase |
|---|---|---|---|
| `chair_up/down` | Kursi dental | Hidrolik "vwoo" naik/turun | 2 |
| `lamp_on` | Lampu dental | Klik saklar + dengung halus | 2 |
| `mirror_tink` | Kaca mulut & sonde | Denting logam kecil, lembut | 2 |
| `cold_spray` | Tes dingin (chlorethyl) | "Psst" pendek + kristal es berdenting | 2 |
| `perc_tap` | Perkusi | Ketukan tumpul "tok" | 2 |
| `probe_click` | Probe periodontal | Klik kecil tiap mm | 2 |
| `bp_pump` | Tensimeter | Pompa karet "pss-pss" + desis lepas | 2 |
| `suction` | Suction | "Srrrup" lembut, tidak melengking | 2 |
| `air_water` | Semprotan air/udara | Semprot air halus | 2 |
| `drill_low` | Bor low-speed (T1) | Dengung rendah "vrrr", naik sedikit saat ditekan | 2 |
| `drill_high` | Bor high-speed (T2) | Siulan kartun "wiii" yang dijinakkan, pelan | 2 |
| `drill_oops` | Kena zona pulpa (perforasi) | "Bonk" kartun + napas tertahan pasien | 2 |
| `scale_scrape` | Scaler manual | Gesekan kecil "krek" per tarikan | 2 |
| `scale_ultra` | Scaler ultrasonik (T2) | Dengung tinggi lembut + percikan air | 2 |
| `polish` | Polishing | Putaran lembut "wrrr" + busa | 2 |
| `inject` | Suntik bius | "Tsss" pelan + pasien bergumam "mm" (tanpa bunyi jarum) | 2 |
| `etch_brush` | Etsa/bonding | Olesan kuas kecil | 2 |
| `fill_press` | Isi tambalan GIC/komposit | "Plup" lembut | 2 |
| `light_cure` | Light-cure | Bip mulai, dengung halus, bip selesai | 2 |
| `bite_tap` | Cek gigitan | "Tuk-tuk" gigi beradu pelan | 2 |
| `elevator` | Luksasi elevator | Derit kayu lembut | 2 |
| `wiggle` | Goyang berirama (cabut) | "Krek" ritmis per ketukan. Terlalu kuat: "krak" + gong kecil kartun | 2 |
| `tooth_pop` | Gigi lepas | "Pop!" + kilau | 2 |
| `gauze` | Tampon | Kain lembut | 2 |
| `rinse` | Pasien berkumur | "Grrlk-grrlk", "ptuih" sopan ke wastafel, air mengalir | 2 |
| `xray` | Rontgen (tahap 2) | Dengung + "ting" selesai + film bergeser | 2 |
| `file_twist` | File PSA | Klik putar kecil | 3b |
| `apex_beep` | Apex locator | Bip makin rapat saat mendekati ujung akar | 3b |
| `irrigate` | Irigasi | Semprot halus | 3b |
| `obturate` | Obturasi | "Fsst" hangat | 3b |
| ~~`braces`~~ | ~~Memasang behel~~ | Tidak dibuat: GDD tidak punya tindakan ortodonti. Ditambah kalau fiturnya ditambah | — |

**Umpan balik minigame** (6 jenis input GDD minigame `00`):
| ID | Suara | Deskripsi | Fase |
|---|---|---|---|
| `mg_hit` | Input tepat | 1 nada marimba, nadanya naik per kombo | 2 |
| `mg_perfect` | Sempurna | 3 nada naik + kilau | 2 |
| `mg_miss` | Meleset | Ketukan kayu tumpul, pelan | 2 |
| `pain_up` | Bar sakit naik tajam | Pasien "hng!" pendek (vokal sintetis, bukan teriakan) | 2 |
| `result_*` | Hasil Sempurna/Baik/Cukup/Gagal | Jingle 4 tingkat. Gagal = 2 nada turun yang lembut | 2 |

### 4.5 NPC & Lingkungan
| ID | Suara | Deskripsi | Fase |
|---|---|---|---|
| `blip_*` | Suara ngobrol | "Blip" per 2 huruf, nada dasar & warna suara beda per NPC: pria lebih rendah, anak tinggi, Mbah Darmi bergetar, Pak Harjo pelan | 3a |
| `emote_heart` / `emote_q` / `emote_shock` | Emote | Kilau hati / "hm?" / "!" kecil | 3a |
| `patient_in` | Pasien datang | Bel pintu + langkah | 2 |
| `patient_happy` / `patient_sad` | Pasien puas / pergi kecewa | Gumam nada naik / helaan napas turun | 2 |
| `birds` | Burung pagi (Kemarau 06–11) | Kicau acak, jarang | 2 |
| `cicada` | Tonggeret siang (Kemarau 11–15) | Dengung naik-turun samar | 2 |
| `wind_dry` | Angin kering | Desir + daun kering bergemerisik | 2 |
| `crickets` | Jangkrik malam (Kemarau 18–24) | Krik-krik berirama pelan | 2 |
| `rain_loop` | Hujan (Musim Hujan) | Rintik merata. Di dalam ruangan teredam + tetes dari atap | 2 |
| `thunder_far` | Guntur jauh | Gemuruh rendah, jarang (±1× per 1–2 menit nyata) | 2 |
| `frogs` | Katak malam (Hujan 18–24) | Kodok bersahutan | 2 |
| `rooster` | Ayam berkokok | Sekali pukul 06:00 di Kampung Asri | 2 |
| `fountain` | Air mancur Alun-alun | Gemericik, makin keras saat dekat | 2 |
| `market` | Tenda pasar | Gumam keramaian samar saat dekat | 2 |
| `motor_pass` | Motor lewat (Jalan Niaga) | Lewat dari kiri ke kanan, jarang | 2 |
| `cafe` / `angkringan` / `karaoke` / `voli` / `library` | Tempat nongkrong | Mesin kopi & cangkir / arang & ketel / musik samar dari dalam / pantulan bola / halaman dibalik | 3a |

### 4.6 Event & Festival
| ID | Suara | Deskripsi | Fase |
|---|---|---|---|
| `ribbon_cut` | Pembukaan Klinik | Gunting "snip" + sorak & tepuk tangan | 3b |
| `applause` | Tepuk tangan warga | Tepuk tangan kecil, hangat | 3b |
| `quiz_ok` / `quiz_no` | Tebak-tebakan (Pameran, Pesta Rakyat) | Bel juara / "tet" lembut | 3b |
| `hoe` | Tanam Pohon Bersama | Tanah dicangkul + bibit ditepuk | 3b |
| `firework` | Pesta Rakyat | Kembang api kecil, letupan jauh (tidak mengagetkan) | 3b |
| `lantern` | Malam Lampion | Hembusan lembut + lonceng angin | 3b |

## 5. Edge Cases
- Browser memblokir audio sebelum ada interaksi → layar judul menunggu klik/tombol pertama.
- Tab disembunyikan → semua audio dijeda dan dilanjutkan saat kembali.
- Waktu dijeda (P), menu, atau dialog → BGM tetap jalan pelan (volume 70%). Suara lingkungan & langkah berhenti.
- Banyak SFX bersamaan (mis. langkah + koin + blip) → maksimal 8 suara sekaligus. Yang paling lama dimainkan dihentikan dulu.
- Musim berganti saat pemain di dalam rumah → lagu baru mulai teredam, lalu normal saat keluar.

## 6. Dependencies
Waktu & kalender (Fase 1), zona & interior (Fase 1), klinik & minigame (Fase 2), NPC & dialog (Fase 3a), event (Fase 3b), menu Esc / save (Pengaturan volume).

## 7. Tuning Knobs (`CFG.AUDIO`)
`BGM_VOL 0.6` · `SFX_VOL 0.8` · `AMB_VOL 0.4` · `CROSSFADE 1.5` dtk · `INDOOR_LOWPASS 900` Hz · `INDOOR_VOL 0.6` · `NIGHT_FADE_START 20:00` · `MAX_VOICES 8` · `BLIP_EVERY 2` huruf · `PAUSE_BGM_VOL 0.7`.

## 8. Acceptance Criteria
- Main Theme berbunyi di layar judul setelah interaksi pertama, dan pindah ke lagu musim saat masuk game, dengan crossfade, tanpa jeda sunyi.
- Lagu berganti sesuai musim, klinik, romance, dan event mengikuti prioritas §3.2.
- Di dalam ruangan lagu terdengar teredam, dan kembali jernih saat keluar.
- Volume Musik/Efek/Lingkungan dan bisu (M) tersimpan dan dimuat ulang dengan benar.
- Semua SFX §4 Fase 2 terdengar sesuai deskripsinya. Tidak ada bunyi alat gigi yang melengking atau bikin ngilu (diuji dengar oleh user).
- Ukuran `index.html` sesuai pilihan §3.4.
