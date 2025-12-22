export enum Role {
  // Level 1: Platform/SaaS Admin (Anda & Tim)
  SUPER_ADMIN = 'SUPER_ADMIN', // Mengelola semua toko, langganan, dan sistem.

  // Level 2: Tenant/Toko (Klien Anda)
  STORE_OWNER = 'STORE_OWNER', // Pemilik toko, bisa edit menu, liat laporan keuangan, kelola staf.
  STORE_MANAGER = 'STORE_MANAGER', // (Opsional) Bisa kelola menu & staf, tapi tidak bisa hapus toko.
  STORE_STAFF = 'STORE_STAFF', // Kasir/Pelayan, hanya bisa input pesanan & cek menu.

  // Level 3: Customer (Pelanggan Toko)
  CUSTOMER = 'CUSTOMER', // Orang yang memesan makanan.
}
