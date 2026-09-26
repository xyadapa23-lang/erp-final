"use client";
import Link from "next/link";import{usePathname}from"next/navigation";import{ReactNode,useEffect,useMemo,useState}from"react";import{createClient}from"@/lib/supabase/client";

type Role="owner"|"admin"|"cashier"|"warehouse"|"accounting";
type NavItem={href:string;label:string;icon:string;roles:Role[]};

const ALL_ROLES:Role[]=["owner","admin","cashier","warehouse","accounting"];
const nav:NavItem[]=[
 {href:"/dashboard",label:"Dashboard",icon:"D",roles:ALL_ROLES},
 {href:"/pos",label:"Kasir / POS",icon:"K",roles:["owner","admin","cashier"]},
 {href:"/products",label:"Produk & Stok",icon:"P",roles:["owner","admin","warehouse"]},
 {href:"/purchases",label:"Pembelian",icon:"B",roles:["owner","admin","warehouse","accounting"]},
 {href:"/suppliers",label:"Supplier",icon:"S",roles:["owner","admin","warehouse","accounting"]},
 {href:"/customers",label:"Customer",icon:"C",roles:["owner","admin","cashier","accounting"]},
 {href:"/stock-transfers",label:"Transfer Gudang",icon:"T",roles:["owner","admin","warehouse"]},
 {href:"/stock-opname",label:"Stock Opname",icon:"O",roles:["owner","admin","warehouse"]},
 {href:"/returns",label:"Retur",icon:"R",roles:["owner","admin","cashier","warehouse","accounting"]},
 {href:"/returns?view=history",label:"Riwayat Transaksi",icon:"H",roles:["owner","admin","cashier","warehouse","accounting"]},
 {href:"/payments",label:"Pembayaran",icon:"$ ",roles:["owner","admin","accounting"]},
 {href:"/expenses",label:"Pengeluaran",icon:"E",roles:["owner","admin","accounting"]},
 {href:"/reports",label:"Laporan",icon:"L",roles:["owner","admin","accounting"]},
 {href:"/export",label:"Export Data",icon:"X",roles:["owner","admin","accounting"]},
 {href:"/users",label:"Pengguna & Role",icon:"U",roles:["owner","admin"]}
];

function NavIcon({value}:{value:string}){return <span className="nav-icon" aria-hidden="true">{value}</span>}

export default function AppShell({title,subtitle,children}:{title:string;subtitle?:string;children:ReactNode}){
 const pathname=usePathname();const supabase=useMemo(()=>createClient(),[]);const[role,setRole]=useState<Role|null>(null);
 useEffect(()=>{let alive=true;(async()=>{const{data,error}=await supabase.rpc("current_user_role");if(alive&&!error&&data)setRole(String(data) as Role)})();return()=>{alive=false}},[supabase]);
 const visibleNav=nav.filter(item=>!role||item.roles.includes(role));
 const isActive=(href:string)=>pathname===href.split("?")[0];
 const roleLabel={owner:"Owner",admin:"Admin",cashier:"Kasir",warehouse:"Gudang",accounting:"Accounting"}[role??"owner"];
 return <div className="app-shell">
  <aside className="sidebar">
   <div className="brand"><div className="brand-mark">PB</div><div><strong>Pecah Belah</strong><span>ERP System</span></div></div>
   <div className="workspace"><span className="dot"/> Sistem terhubung</div>
   <nav className="nav" aria-label="Navigasi utama">{visibleNav.map(item=><Link key={item.href} href={item.href} className={isActive(item.href)?"active":""}><NavIcon value={item.icon}/><span>{item.label}</span></Link>)}</nav>
   <div className="sidebar-footer"><div className="mini-avatar">{roleLabel.charAt(0)}</div><div><strong>{roleLabel}</strong><span>Akses sesuai role</span></div></div>
  </aside>
  <main className="main">
   <header className="topbar"><div><h1>{title}</h1>{subtitle&&<p>{subtitle}</p>}</div><form action="/api/signout" method="post"><button className="btn btn-light" title="Keluar" type="submit">Keluar</button></form></header>
   {children}
  </main>
  <nav className="mobile-nav" aria-label="Navigasi mobile">
   {visibleNav.slice(0,4).map(item=><Link key={item.href} href={item.href} className={isActive(item.href)?"active":""}><span>{item.icon}</span><span>{item.label.split(" ")[0]}</span></Link>)}
  </nav>
 </div>
}