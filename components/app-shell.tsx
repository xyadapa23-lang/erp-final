"use client";
import Link from "next/link";import{usePathname}from"next/navigation";import{ReactNode}from"react";

const nav=[
 {href:"/dashboard",label:"Dashboard",icon:"⌂"},
 {href:"/pos",label:"Kasir / POS",icon:"▣"},
 {href:"/products",label:"Produk & Stok",icon:"□"},
 {href:"/purchases",label:"Pembelian",icon:"↓"},
 {href:"/suppliers",label:"Supplier",icon:"•"},
 {href:"/customers",label:"Customer",icon:"•"},
 {href:"/stock-transfers",label:"Transfer Gudang",icon:"⇄"},
 {href:"/stock-opname",label:"Stock Opname",icon:"◇"},
 {href:"/returns",label:"Retur",icon:"↩"},
 {href:"/returns?view=history",label:"Riwayat Transaksi",icon:"▤"},
 {href:"/reports",label:"Laporan",icon:"▥"}
];

function NavIcon({value}:{value:string}){return <span className="nav-icon" aria-hidden="true">{value}</span>}

export default function AppShell({title,subtitle,children}:{title:string;subtitle?:string;children:ReactNode}){
 const pathname=usePathname();
 const isActive=(href:string)=>pathname===href.split("?")[0];
 return <div className="app-shell">
  <aside className="sidebar">
   <div className="brand"><div className="brand-mark">PB</div><div><strong>Pecah Belah</strong><span>ERP System</span></div></div>
   <div className="workspace"><span className="dot"/> Sistem terhubung</div>
   <nav className="nav" aria-label="Navigasi utama">{nav.map(item=><Link key={item.href} href={item.href} className={isActive(item.href)?"active":""}><NavIcon value={item.icon}/><span>{item.label}</span></Link>)}</nav>
   <div className="sidebar-footer"><div className="mini-avatar">O</div><div><strong>Owner</strong><span>Administrator</span></div></div>
  </aside>
  <main className="main">
   <header className="topbar"><div><h1>{title}</h1>{subtitle&&<p>{subtitle}</p>}</div><form action="/api/signout" method="post"><button className="btn btn-light" title="Keluar" type="submit">Keluar</button></form></header>
   {children}
  </main>
  <nav className="mobile-nav" aria-label="Navigasi mobile">
   {nav.slice(0,4).map(item=><Link key={item.href} href={item.href} className={isActive(item.href)?"active":""}><span>{item.icon}</span><span>{item.label.split(" ")[0]}</span></Link>)}
  </nav>
 </div>
}