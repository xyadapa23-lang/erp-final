"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const nav = [
  { href:"/dashboard", label:"Dashboard", icon:"⌂" },
  { href:"/pos", label:"Kasir / POS", icon:"▣" },
  { href:"/products", label:"Produk & Stok", icon:"□" },
  { href:"/purchases", label:"Pembelian", icon:"↓" },
  { href:"/suppliers", label:"Supplier", icon:"♙" },
  { href:"/reports", label:"Laporan", icon:"▥" },
];

export default function AppShell({title,subtitle,children}:{title:string;subtitle?:string;children:ReactNode}) {
  const pathname = usePathname();
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">PB</div>
          <div><strong>Pecah Belah</strong><span>ERP System</span></div>
        </div>
        <div className="workspace"><span className="dot"/> Terhubung ke Supabase</div>
        <nav className="nav">
          {nav.map(item=><Link key={item.href} href={item.href} className={pathname===item.href?"active":""}>
            <span className="nav-icon">{item.icon}</span><span>{item.label}</span>
          </Link>)}
        </nav>
        <div className="sidebar-footer">
          <div className="mini-avatar">O</div>
          <div><strong>Operator</strong><span>ERP Toko</span></div>
        </div>
      </aside>
      <main className="main">
        <header className="topbar">
          <div><h1>{title}</h1>{subtitle&&<p>{subtitle}</p>}</div>
          <form action="/api/signout" method="post"><button className="icon-btn" title="Keluar">↪</button></form>
        </header>
        {children}
      </main>
      <nav className="mobile-nav">
        {nav.slice(0,4).map(item=><Link key={item.href} href={item.href} className={pathname===item.href?"active":""}><span>{item.icon}</span>{item.label.split(" ")[0]}</Link>)}
      </nav>
    </div>
  );
}
