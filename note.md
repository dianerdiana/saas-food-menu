1. Urutan Penulisan vs Urutan Eksekusi
   Meskipun kamu menempatkan @Post() di atas @UseGuards() atau sebaliknya, NestJS tetap akan menjalankan siklus hidup request (Request Lifecycle) dengan urutan yang sudah baku:

Middleware

Guards (Dieksekusi di sini)

Interceptors (Pre-controller)

Pipes (Validasi DTO)

Controller Method (Logika @Post kamu)

Interceptors (Post-controller)

Exception Filters

Jadi, secara teknis, Guard akan selalu berjalan sebelum body method controller dieksekusi, tidak peduli apakah kamu menuliskan @UseGuards di atas atau di bawah @Post.

Berdasarkan diskusi kita dan mempertimbangkan bahwa MVP kamu sudah stabil (Astro, React, NestJS), berikut adalah daftar ide pengembangan yang saya bagi menjadi tiga fase: **Fitur Teknis**, **Strategi Data**, dan **User Experience (UX)**.

---

### 1. Pengembangan Fitur Teknis (Backend & Dashboard)

Karena kamu sudah punya sistem PBAC dan manajemen produk, fitur-fitur ini akan menjadi pelengkap yang sangat kuat:

- **Flag "Verified Price":** Tambahkan kolom boolean di tabel `products` atau `stores` untuk menandakan bahwa harga tersebut sudah dikonfirmasi langsung ke tempatnya atau oleh pemilik toko.
- **Timestamp "Last Updated":** Menampilkan tanggal terakhir menu diperbarui di halaman Astro agar pengguna merasa yakin harganya masih akurat.
- **Sistem Claim Manual (WhatsApp Integration):** Karena kamu belum butuh sistem klaim otomatis yang rumit, cukup buat tombol "Klaim Toko Ini" yang mengarahkan ke WhatsApp dengan pesan otomatis berisi `store_id`.
- **Simple Analytics untuk Owner:** Di dashboard React, tunjukkan data sederhana kepada pemilik resto: berapa kali halaman menu mereka dilihat dan produk mana yang paling sering diklik.
- **Filter Berdasarkan Fasilitas (Store Metadata):** Tambahkan atribut pada toko seperti `has_wifi`, `is_halal`, `outdoor_seating`, atau `price_range` ($ - $$$).

### 2. Strategi Konten & Data (Fokus Majalengka)

Sebagai "kurator" awal, data yang berkualitas adalah magnet bagi pengguna:

- **Koleksi Terkurasi (Curated Collections):** Jangan hanya daftar abjad. Buat kategori seperti:
- _"Top 5 Seblak di Majalengka"_
- _"Cafe WFC-friendly di Jatiwangi"_
- _"Resto Keluarga dengan View Gunung Ciremai"_

- **Fitur "Surprise Me" (Randomizer):** Sebuah tombol di Astro yang akan memilihkan satu menu secara acak dari database untuk user yang bingung mau makan apa.
- **User Contribution (UGC):** Tombol "Upload Foto Menu Terbaru" di sisi Astro. User bisa kirim foto, lalu tim kamu (Data Entry) melakukan update di dashboard.
- **Perbandingan Harga (Price Transparency):** Jika memungkinkan, tampilkan perbandingan harga: _“Harga di sini: Rp15.000 (Aplikasi: Rp20.000)”_. Ini akan sangat viral karena membantu orang berhemat.

### 3. Optimasi SEO & Aksesibilitas (Astro Side)

Manfaatkan kecepatan Astro untuk mendominasi Google di area Majalengka:

- **Local SEO Schema (JSON-LD):** Gunakan skema `Restaurant` dari schema.org. Ini akan membantu Google menampilkan info resto kamu langsung di halaman hasil pencarian.
- **Sitemap Otomatis:** Pastikan setiap ada `store` baru, sitemap kamu terupdate agar Google cepat mengindeks toko tersebut.
- **Pencarian Cepat (Client-side Search):** Gunakan library ringan di Astro (seperti Pagefind atau Fuse.js) agar orang bisa mencari nama makanan ("Ayam Bakar") secara instan tanpa _reload_ halaman.

### 4. Strategi GTM (Go-To-Market) untuk Lokal

- **QR Code Stiker:** Cetak stiker QR Code kecil untuk resto yang sudah kamu input, lalu tawarkan ke pemiliknya: _"Ini menu digital gratis untuk resto kakak, pelanggan tinggal scan."_
- **Social Media Snippet:** Buat fitur di dashboard untuk meng-generate gambar otomatis (semacam Instagram Story) yang berisi "Menu Terpopuler di [Nama Resto]" untuk dibagikan ke IG.

---

### Langkah Mana yang Paling Menarik?

Melihat kamu sedang fokus di Majalengka, saran saya adalah mulai dari **"Koleksi Terkurasi"** dan **"Timestamp Update"**. Dua hal ini paling cepat meningkatkan kepercayaan pengguna lokal.

Apakah kamu ingin saya bantu membuatkan **struktur Database (Schema)** untuk fitur "Verified Price" atau "Store Metadata" di NestJS kamu?
