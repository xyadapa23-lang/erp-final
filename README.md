# ERP Toko Pecah Belah

Starter ERP web responsif untuk desktop dan HP, memakai Next.js + Supabase.

## Fitur
- Login Supabase Auth
- Dashboard
- Produk & stok
- Kategori/unit
- POS / penjualan tunai
- Pembelian
- Supplier & pelanggan
- Hutang/piutang dan pembayaran
- Pengeluaran kas
- Retur penjualan/pembelian
- Stock opname
- Shift kasir
- Laporan operasional dan laba/rugi sederhana
- Cetak struk
- Export CSV
- Role owner, admin, manager, cashier, warehouse

## Setup
1. Salin `.env.example` menjadi `.env.local`.
2. Isi `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
3. Jalankan `npm install`.
4. Jalankan `npm run dev`.
5. Buka `http://localhost:3000`.

Project Supabase: `ERP`.

## Catatan
Service-role key tidak diperlukan di browser dan tidak disimpan di repository. Jalankan Security Advisor sebelum production deployment.

Laporan laba/rugi pada versi ini adalah laporan operasional sederhana, bukan akuntansi double-entry penuh.