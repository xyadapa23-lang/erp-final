"use client";
import Link from "next/link";
export default function AppNav(){return <aside className="sidebar"><div className="brand">Pecah Belah ERP</div><nav className="nav">
<Link href="/dashboard">Dashboard</Link><Link href="/pos">Kasir / POS</Link><Link href="/cashier">Shift Kasir</Link><Link href="/products">Produk & Stok</Link><Link href="/purchases">Pembelian</Link><Link href="/suppliers">Supplier</Link><Link href="/payments">Hutang / Piutang</Link><Link href="/expenses">Pengeluaran Kas</Link><Link href="/returns">Retur</Link><Link href="/stock-opname">Stock Opname</Link><Link href="/reports">Laporan</Link><Link href="/users">User & Role</Link>
</nav></aside>}
