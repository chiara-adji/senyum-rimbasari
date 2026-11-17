/* ================= DAFTAR KARAKTER ================= */
const HC={blk:['#231a1f','#4a3a44','#0e090c'],brn:['#5a3422','#8a5a3a','#331c12'],lbrn:['#8a5a34','#b8844e','#5a3820'],gray:['#a8a09a','#dcd6d0','#6e6660'],
  white:['#dedad4','#ffffff','#a8a29c'],red:['#8a3a2a','#b85a40','#5a2218'],tea:['#6a4028','#9a6a44','#40241a']};
const hcol=k=>({hc:HC[k][0],hl:HC[k][1],hd:HC[k][2]});
const sk=k=>({skin:SK[k][0],skinS:SK[k][1]});
const CAST=[
 // ===== Pemain (preset kustomisasi) =====
 {id:'pM',grp:'Pemain',name:'Dokter (pria)',role:'Preset kustomisasi',s:{...sk('L'),hair:'short',...hcol('brn'),style:'coat',inner:'#4f86c9',legs:'#2f3d63',steth:1,badge:1}},
 {id:'pF',grp:'Pemain',name:'Dokter (wanita)',role:'Preset kustomisasi',s:{...sk('L'),hair:'long',...hcol('blk'),style:'coat',inner:'#c8414b',legs:'#2f3d63',steth:1,badge:1,lashes:1}},
 {id:'pH',grp:'Pemain',name:'Dokter (berhijab)',role:'Preset kustomisasi',s:{...sk('M'),hair:'hijab',hc:'#3f6a5a',hl:'#5f8a7a',hd:'#2a4a3e',brow:'#2a1a1f',style:'coat',inner:'#3fae9c',legs:'#2f3d63',steth:1,badge:1,lashes:1}},
 // ===== Romance =====
 {id:'adji',grp:'Romance',name:'Adji',role:'Akuntan · lucu, perhatian',s:{...sk('Y'),hair:'side',...hcol('blk'),style:'polo',top:'#25242c',topS:'#18171d',topH:'#4b4a57',legs:'#b99e6c',watch:1,expr:'happy'}},
 {id:'arya',grp:'Romance',name:'Arya',role:'Insinyur sipil · pendiam',s:{...sk('M'),hair:'messy',...hcol('brn'),style:'shirt',top:'#e8e0cc',legs:'#4a5060',glasses:1,hat:'helmet',lanyard:'#e8762a'}},
 {id:'raka',grp:'Romance',name:'Ipda Raka',role:'Polisi kota · humoris',s:{...sk('M'),hair:'short',...hcol('blk'),style:'police',top:'#8a7448',legs:'#5a4a30',hat:'police',expr:'wink',thickBrow:1}},
 {id:'galih',grp:'Romance',name:'dr. Galih',role:'Dokter umum Puskesmas · melankolis',s:{...sk('L'),hair:'emo',...hcol('blk'),style:'coat',inner:'#5a7aa8',legs:'#2a3048',steth:1,badge:1}},
 {id:'sekar',grp:'Romance',name:'Sekar',role:'Perpustakaan & kebun bunga · lembut',s:{...sk('L'),hair:'wavy',...hcol('lbrn'),style:'cardigan',top:'#6a9a6a',inner:'#f4ecd8',lower:'long',legs:'#e8dcc0',hat:'flower',lashes:1,eye:EYEC.hz}},
 {id:'nadia',grp:'Romance',name:'Nadia',role:'Kedai kopi · energik',s:{...sk('M'),hair:'pony',...hcol('brn'),style:'apron',top:'#e3aa3c',apron:'#5a3a2a',apronLogo:'#e3aa3c',legs:'#3b5a8c',tie:'#c8414b',lashes:1,expr:'happy'}},
 {id:'laras',grp:'Romance',name:'Laras',role:'Fotografer · ceria',s:{...sk('Y'),hair:'bob',...hcol('red'),style:'vest',top:'#6a7a4a',inner:'#f2ead8',legs:'#3a3a48',camera:1,hat:'beret',hatC:'#e3aa3c',lashes:1,freckles:1,expr:'happy'}},
 {id:'wulan',grp:'Romance',name:'Wulan',role:'Bidan puskesmas · lembut tapi tegas',s:{...sk('L'),hair:'hijab',hc:'#b0607e',hl:'#d488a4',hd:'#83415d',brow:'#2a1a1f',style:'scrubs',top:'#f2f4f6',topS:'#c9d0da',legs:'#f2f4f6',lashes:1,lanyard:'#3fae9c'}},
 // ===== Warga =====
 {id:'harjo',grp:'Warga',name:'Pak Harjo',role:'Lurah · bijak',s:{...sk('M'),body:'old',hair:'peci',...hcol('gray'),brow:'#a8a09a',style:'batik',top:'#7d4f2a',legs:'#3a3530',glasses:1,mustache:'#c8c0b8'}},
 {id:'ratna',grp:'Warga',name:'Bu Ratna',role:'Pemilik warung · suka gosip',s:{...sk('M'),body:'big',hair:'curly',...hcol('blk'),style:'daster',top:'#d86a8a',flower:'#ffe0ea',lower:'long',legs:'#d86a8a',earring:1,lashes:1,expr:'smirk'}},
 {id:'darmi',grp:'Warga',name:'Mbah Darmi',role:'Peracik jamu · skeptis',s:{...sk('D'),body:'old',hair:'bun',...hcol('gray'),style:'kebaya',top:'#a0523a',lower:'long',legs:'#7d4f2a',squint:1}},
 {id:'dimas',grp:'Warga',name:'Dimas',role:'Anak SD 9 th · takut dokter',s:{...sk('M'),body:'kid',hair:'kid',...hcol('blk'),style:'uniform',top:'#f7f8fa',topS:'#c5cdd9',legs:'#c8414b',socks:'#ffffff',expr:'surprised'}},
 {id:'endang',grp:'Warga',name:'Bu Endang',role:'Penjahit · ibu Dimas',s:{...sk('M'),hair:'hijab',hc:'#d8c09a',hl:'#f0dcb8',hd:'#a8906a',brow:'#2a1a1f',style:'dress',top:'#5a7aa8',lower:'long',legs:'#5a7aa8',tape:1,lashes:1}},
 {id:'bowo',grp:'Warga',name:'Pak Bowo',role:'Petani kopi · keras kepala',s:{...sk('D'),hair:'short',...hcol('blk'),style:'shirt',top:'#5a6a3a',legs:'#4a4038',tucked:false,hat:'caping',mustache:1,expr:'angry'}},
 {id:'sri',grp:'Warga',name:'Bu Sri',role:'Pengelola Losmen Singgah · istri Pak Bowo',s:{...sk('M'),hair:'bun',hc:'#3a3236',hl:'#7a7276',hd:'#1e181b',style:'kebaya',top:'#3f7a8a',inner:'#f4ecd8',lower:'long',legs:'#7a5232',earring:1,lashes:1,wrinkles:1,expr:'happy'}},
 {id:'sinta',grp:'Warga',name:'Bu Sinta',role:'Guru SD',s:{...sk('L'),hair:'bob',...hcol('blk'),style:'blazer',top:'#b99e6c',inner:'#f7f2e4',lower:'skirt',legs:'#8d7550',glasses:1,lashes:1}},
 {id:'slamet',grp:'Warga',name:'Pak Slamet',role:'Pemilik angkringan',s:{...sk('M'),hair:'short',...hcol('blk'),style:'tee',top:'#e8e2d4',lower:'long',legs:'#3a5a7a',hat:'udeng',mustache:1,expr:'happy'}},
 {id:'tari',grp:'Warga',name:'Kak Tari',role:'Toko Roti Manis',s:{...sk('L'),hair:'braid',...hcol('tea'),style:'apron',top:'#f2a0b8',apron:'#fbf6ea',legs:'#8a5a7a',tie:'#f2a0b8',lashes:1,freckles:1,expr:'happy'}},
 {id:'ilham',grp:'Warga',name:'Mas Ilham',role:'Kurir pos',s:{...sk('M'),hair:'short',...hcol('blk'),style:'pos',top:'#e8762a',legs:'#3a3a48',hat:'cap',hatC:'#e8762a',bag:'#7a4a28'}},
 {id:'wiryo',grp:'Warga',name:'Kakek Wiryo',role:'Pensiunan guru · catur',s:{...sk('L'),body:'old',hair:'bald',...hcol('white'),brow:'#dedad4',style:'koko',top:'#f2ead8',emb:'#7a9a6a',legs:'#5a5048',glasses:1,beard:'#e8e4de'}},
 {id:'doni',grp:'Warga',name:'Coach Doni',role:'Pelatih voli',s:{...sk('D'),hair:'buzz',...hcol('blk'),style:'tracksuit',top:'#c8414b',legs:'#c8414b',whistle:1,thickBrow:1}},
 // ===== Kandidat staf =====
 {id:'putri',grp:'Staf',name:'Putri',role:'Resepsionis',s:{...sk('Y'),hair:'long',...hcol('blk'),style:'blazer',top:'#2f3d63',inner:'#f7f2e4',lower:'skirt',legs:'#2f3d63',lashes:1,expr:'happy'}},
 {id:'yoga',grp:'Staf',name:'Yoga',role:'Resepsionis',s:{...sk('M'),hair:'side',...hcol('brn'),style:'shirt',top:'#a8c8e8',legs:'#3a3a48',lanyard:'#3fae9c'}},
 {id:'rina',grp:'Staf',name:'Rina',role:'Perawat gigi',s:{...sk('L'),hair:'pony',...hcol('blk'),style:'scrubs',top:'#3fae9c',legs:'#3fae9c',tie:'#ec98ad',lashes:1}},
 {id:'fajar',grp:'Staf',name:'Fajar',role:'Perawat gigi',s:{...sk('M'),hair:'short',...hcol('blk'),style:'scrubs',top:'#3fae9c',legs:'#3fae9c',glasses:1}},
 {id:'dewi',grp:'Staf',name:'Dewi',role:'Perawat gigi',s:{...sk('Y'),hair:'hijab',hc:'#2b8073',hl:'#4fa898',hd:'#1e5a50',brow:'#2a1a1f',style:'scrubs',top:'#3fae9c',legs:'#3fae9c',lashes:1}},
 {id:'udin',grp:'Staf',name:'Pak Udin',role:'Petugas kebersihan',s:{...sk('D'),body:'old',hair:'short',...hcol('gray'),style:'shirt',top:'#7a8a7a',legs:'#4a4a48',hat:'cap',hatC:'#4a6a5a',mustache:1}},
 {id:'siti',grp:'Staf',name:'Bu Siti',role:'Petugas kebersihan',s:{...sk('M'),hair:'hijab',hc:'#8a5a3a',hl:'#b07a52',hd:'#5a3a24',brow:'#2a1a1f',style:'apron',top:'#7a8a7a',apron:'#e8e2d4',lower:'long',legs:'#5a5048',lashes:1}},
 {id:'hana',grp:'Staf',name:'drg. Hana',role:'Dokter gigi rekan',s:{...sk('L'),hair:'bob',...hcol('brn'),style:'coat',inner:'#e3aa3c',legs:'#3a3a48',glasses:1,lashes:1,badge:1}},
 {id:'bima',grp:'Staf',name:'drg. Bima',role:'Dokter gigi rekan',s:{...sk('M'),hair:'slick',...hcol('blk'),style:'coat',inner:'#3f8f4a',legs:'#3a3a48',beard:1,badge:1}},
 // ===== Pasien spesial =====
 {id:'hasan',grp:'Pasien',name:'Pak Hasan',role:'Hipertensi',s:{...sk('M'),body:'big',hair:'bald',...hcol('gray'),style:'batik',top:'#2f5d6e',batikH:'#9ad0c0',legs:'#3a3530',mustache:'#a8a09a',expr:'angry'}},
 {id:'yati',grp:'Pasien',name:'Bu Yati',role:'Hamil trimester 1',s:{...sk('L'),hair:'hijab',hc:'#e8a0b0',hl:'#f8c8d0',hd:'#c07888',brow:'#2a1a1f',style:'dress',top:'#f2d8a8',lower:'long',legs:'#f2d8a8',lashes:1,expr:'shy'}},
 {id:'dina',grp:'Pasien',name:'Mbak Dina',role:'Perawatan estetik',s:{...sk('Y'),hair:'wavy',...hcol('lbrn'),style:'blouse',top:'#f6f0f4',flower:'#f2a0c0',lower:'skirt',legs:'#2a2a38',earring:1,lashes:1,hat:'sunglassHead',expr:'smirk'}},
 {id:'yusuf',grp:'Pasien',name:'Pak Yusuf',role:'Minum pengencer darah',s:{...sk('L'),body:'old',hair:'peci',...hcol('gray'),style:'koko',top:'#d8e8f0',emb:'#4f86c9',legs:'#3a3530',beard:'#c8c0b8'}},
 {id:'kiki',grp:'Pasien',name:'Kiki',role:'Gigi susu persistensi',s:{...sk('L'),body:'kid',hair:'braid',...hcol('blk'),style:'dress',top:'#f2c84a',lower:'skirt',legs:'#f2c84a',tie:'#ec5a8a',lashes:1,expr:'sad'}},
 {id:'rudi',grp:'Pasien',name:'Mas Rudi',role:'Abses (pipi bengkak)',s:{...sk('M'),hair:'short',...hcol('blk'),style:'tee',top:'#4a6a9a',print:'#e8e2d4',legs:'#2a3048',swollen:1,expr:'sad',noTear:1}},
 {id:'lastri',grp:'Pasien',name:'Bu Lastri',role:'Diabetes · 52 th',s:{...sk('M'),hair:'bun',...hcol('blk'),style:'blouse',top:'#8a5aa8',flower:'#e8c8f0',lower:'long',legs:'#5a3a6a',glasses:1,wrinkles:1,lashes:1}},
 {id:'marno',grp:'Pasien',name:'Pak Marno',role:'Kepala desa (rujukan)',s:{...sk('D'),hair:'peci',...hcol('blk'),style:'batik',top:'#5a2a2a',batikH:'#e8b85a',legs:'#2a2a2a',mustache:1}},
 {id:'tika',grp:'Pasien',name:'Tika',role:'Dilema biaya',s:{...sk('M'),hair:'pony',...hcol('blk'),style:'tee',top:'#e8e2d4',print:'#4f86c9',legs:'#3b5a8c',tie:'#4f86c9',lashes:1,expr:'sad',noTear:1}},
 {id:'gunawan',grp:'Pasien',name:'Pak Gunawan',role:'Mengajukan klaim',s:{...sk('L'),hair:'bald',combover:1,...hcol('blk'),style:'shirt',top:'#f2f2ea',legs:'#3a3a48',expr:'angry',thickBrow:1}},
 {id:'sumi',grp:'Pasien',name:'Nenek Sumi',role:'Takut dokter gigi',s:{...sk('M'),body:'old',hair:'bun',...hcol('white'),style:'kebaya',top:'#5a7a5a',lower:'long',legs:'#6a4a2a',expr:'surprised'}},
 {id:'andre',grp:'Pasien',name:'Andre',role:'Trauma gigi depan',s:{...sk('Y'),body:'kid',hair:'spiky',...hcol('brn'),style:'jersey',top:'#2f5d9e',stripe:'#f2c84a',num:10,legs:'#2a3048',expr:'happy',gap:1}},
 // ===== Luar kota =====
 {id:'hendra',grp:'Luar kota',name:'Koh Hendra',role:'Bahari Medika (Tanjung Arum)',s:{...sk('L'),body:'big',hair:'short',...hcol('blk'),style:'polo',top:'#2a7a8a',topH:'#5ab0c0',legs:'#3a3a48',glasses:1,eye:EYEC.blk,expr:'happy'}},
 {id:'melinda',grp:'Luar kota',name:'Bu Melinda',role:'Metra Dental Supply (Metrapura)',s:{...sk('Y'),hair:'bob',...hcol('blk'),style:'blazer',top:'#a8202a',inner:'#1f1c24',lower:'skirt',legs:'#1f1c24',earring:1,lashes:1,expr:'smirk'}},
 {id:'surya',grp:'Luar kota',name:'drg. Surya',role:'Mantan atasan',s:{...sk('L'),hair:'slick',...hcol('gray'),style:'suit',top:'#2a2e3a',inner:'#f7f2e4',tie:'#8a2a3a',legs:'#2a2e3a',wrinkles:1}},
 {id:'joni',grp:'Luar kota',name:'Pak Joni',role:'Tukang gigi keliling',s:{...sk('D'),hair:'short',...hcol('blk'),style:'vest',top:'#6a5a3a',inner:'#c8b890',legs:'#4a4038',hat:'cap',hatC:'#3a3a48',mustache:1,bag:'#4a3a2a',expr:'smirk'}},
];
const CH={};CAST.forEach(k=>CH[k.id]=char3(k.s));
const castBy=id=>CAST.find(k=>k.id===id);
/** Sprite karakter dengan opsi tambahan (arah, langkah, ekspresi). */
const chr=(id,o={})=>char3({...castBy(id).s,...o});
