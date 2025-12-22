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
