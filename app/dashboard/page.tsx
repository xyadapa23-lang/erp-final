import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AppShell from "@/components/app-shell";

const money=(n:number)=>new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n);

export default async function Dashboard(){
 const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();if(!user)redirect("/login");
 const [{count:products},{count:customers},{count:suppliers},{data:productRows},{data:recentSales}]=await Promise.all([
  supabase.from("products").select("id",{count:"exact",head:true}).eq("is_active",true),
  supabase.from("customers").select("id",{count:"exact",head:true}).eq("is_active",true),
  supabase.from("suppliers").select("id",{count:"exact",head:true}).eq("is_active",true),
  supabase.from("products").select("id,sku,name,selling_price,minimum_stock,inventory(quantity)").eq("is_active",true).order("name").limit(100),
  supabase.from("sales").select("invoice_no,sale_date,grand_total,status").eq("status","posted").order("sale_date",{ascending:false}).limit(6)
 ]);
 const rows=(productRows??[]).map((p:any)=>({...p,stock:(p.inventory??[]).reduce((s:number,i:any)=>s+Number(i.quantity||0),0)}));
 const low=rows.filter((p:any)=>p.stock<=Number(p.minimum_stock)).sort((a:any,b:any)=>a.stock-b.stock).slice(0,5);
 const stockValue=rows.reduce((s:number,p:any)=>s+p.stock*Number(p.selling_price),0);
 return <AppShell title="Dashboard" subtitle="Ringkasan operasional toko hari ini">
  <section className="hero"><div><span className="eyebrow">OVERVIEW</span><h2>Operasional toko dalam satu layar.</h2><p>Pantau produk, stok, dan transaksi tanpa berpindah-pindah menu.</p></div><Link href="/pos" className="btn btn-primary">+ Transaksi Baru</Link></section>
  <div className="kpi-grid">
   <div className="kpi"><div className="kpi-icon blue">P</div><div><span>Total Produk</span><strong>{products??0}</strong><small>produk aktif</small></div></div>
   <div className="kpi"><div className="kpi-icon green">C</div><div><span>Pelanggan</span><strong>{customers??0}</strong><small>customer aktif</small></div></div>
   <div className="kpi"><div className="kpi-icon orange">S</div><div><span>Supplier</span><strong>{suppliers??0}</strong><small>supplier aktif</small></div></div>
   <div className="kpi"><div className="kpi-icon purple">Rp</div><div><span>Nilai Jual Stok</span><strong>{money(stockValue)}</strong><small>berdasarkan harga jual</small></div></div>
  </div>
  <div className="content-grid">
   <section className="panel"><div className="section-head"><div><h3>Stok Perlu Perhatian</h3><p>Produk di bawah batas minimum</p></div><Link href="/products">Lihat semua →</Link></div>
    <div className="table-wrap"><table className="table"><thead><tr><th>Produk</th><th>SKU</th><th>Stok</th><th>Minimum</th></tr></thead><tbody>
     {low.map((p:any)=><tr key={p.id}><td><strong>{p.name}</strong></td><td className="muted">{p.sku}</td><td><span className="badge danger">{p.stock} pcs</span></td><td>{p.minimum_stock}</td></tr>)}
     {!low.length&&<tr><td colSpan={4}><div className="empty">✓ Semua stok masih aman</div></td></tr>}
    </tbody></table></div>
   </section>
   <section className="panel"><div className="section-head"><div><h3>Penjualan Terbaru</h3><p>Transaksi yang sudah diposting</p></div><Link href="/pos">Buka POS →</Link></div>
    <div className="activity-list">{(recentSales??[]).map((s:any)=><div className="activity" key={s.invoice_no}><div className="activity-dot">✓</div><div><strong>{s.invoice_no}</strong><span>{new Date(s.sale_date).toLocaleString("id-ID")}</span></div><b>{money(Number(s.grand_total))}</b></div>)}{!recentSales?.length&&<div className="empty">Belum ada penjualan.</div>}</div>
   </section>
  </div>
 </AppShell>;
}