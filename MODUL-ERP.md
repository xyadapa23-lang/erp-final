# ERP Toko Pecah Belah — Final

## Operasional
Login/Auth, Dashboard, Produk, Supplier, Pelanggan, POS, Barcode keyboard, Pembelian, Stock Opname, Retur, Hutang/Piutang, Pembayaran, Pengeluaran Kas.

## Keuangan kasir
- Shift kasir: buka/tutup.
- Saldo awal dan kas fisik akhir.
- Perhitungan kas ekspektasi.
- Riwayat shift.

## Laporan
- Penjualan harian.
- Laporan produk.
- Laba/rugi sederhana berbasis penjualan, pembelian, retur dan pengeluaran.
- Cetak laporan browser.

## Administrasi
- User & Role: owner, admin, manager, cashier, warehouse.
- Export CSV untuk arsip.

## Cetak
- Struk thermal browser.
- Laporan dapat dicetak.

## Keamanan
- RLS pada tabel exposed.
- Service-role tidak digunakan di browser.
- Fungsi transaksi sensitif dibatasi ke authenticated.
- Security Advisor perlu dijalankan kembali sebelum production deployment.

## Catatan
Laporan laba/rugi di versi ini adalah laporan operasional sederhana, bukan akuntansi double-entry penuh. Untuk pembukuan resmi, tahap berikutnya adalah chart of accounts, jurnal umum, neraca, dan laporan laba rugi akuntansi.
