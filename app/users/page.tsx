"use client";
import {useEffect,useMemo,useState} from "react";
import {createClient} from "@/lib/supabase/client";

type Role={id:string;code:string;name:string};
type Profile={id:string;full_name:string|null;phone:string|null;role_id:string|null;is_active:boolean};
const labels:Record<string,string>={owner:"Owner",admin:"Admin",cashier:"Kasir",warehouse:"Gudang",accounting:"Accounting"};

export default function Users(){
 const supabase=useMemo(()=>createClient(),[]);
 const [profiles,setProfiles]=useState<Profile[]>([]),[roles,setRoles]=useState<Role[]>([]),[currentRole,setCurrentRole]=useState(""),[loading,setLoading]=useState(true),[saving,setSaving]=useState(""),[msg,setMsg]=useState("");
 async function load(){
  setLoading(true);
  const [{data:me},{data:p,error:pe},{data:r,error:re}]=await Promise.all([
   supabase.rpc("current_user_role"),
   supabase.from("profiles").select("id,full_name,phone,role_id,is_active").order("full_name"),
   supabase.from("roles").select("id,code,name").order("name")
  ]);
  if(me)setCurrentRole(String(me));
  if(pe)setMsg("Gagal memuat pengguna: "+pe.message); else setProfiles((p??[]) as Profile[]);
  if(re)setMsg("Gagal memuat role: "+re.message); else setRoles((r??[]) as Role[]);
  setLoading(false);
 }
 useEffect(()=>{load()},[]);
 async function updateUser(id:string,changes:Partial<Profile>){
  setSaving(id);setMsg("");
  const {error}=await supabase.from("profiles").update(changes).eq("id",id);
  setMsg(error?"Gagal menyimpan: "+error.message:"Perubahan pengguna berhasil disimpan.");
  setSaving("");if(!error)await load();
 }
 const roleMap=Object.fromEntries(roles.map(r=>[r.id,r]));
 const allowed=currentRole==="owner"||currentRole==="admin";
 const counts=roles.map(r=>({...r,count:profiles.filter(p=>p.role_id===r.id).length}));
 if(!loading&&!allowed)return <div className="app-shell"><main className="main"><div className="topbar"><div><h1>Akses Ditolak</h1><p>Halaman ini hanya untuk Owner dan Admin.</p></div></div></main></div>;
 return <div className="app-shell"><main className="main">
  <div className="topbar"><div><h1>Pengguna & Role</h1><p>Kelola role dan status akses pengguna ERP.</p></div><button className="btn btn-light" onClick={load}>Refresh</button></div>
  {msg&&<p className={msg.startsWith("Gagal")?"danger":"success"}>{msg}</p>}
  <div className="cards">{counts.map(r=><div className="card" key={r.id}><span className="muted">{labels[r.code]??r.name}</span><strong>{r.count}</strong><small>pengguna</small></div>)}</div>
  <div className="card"><div className="section-head"><div><h2>Daftar Pengguna</h2><p className="muted">Perubahan role berlaku untuk hak akses aplikasi dan database.</p></div></div>
   {loading?<p>Memuat pengguna...</p>:<div className="table-wrap"><table className="table"><thead><tr><th>Nama</th><th>Telepon</th><th>Role</th><th>Status</th><th>Aksi</th></tr></thead><tbody>
    {profiles.map(p=>{const role=p.role_id?roleMap[p.role_id]:undefined;return <tr key={p.id}><td><strong>{p.full_name||"Tanpa nama"}</strong></td><td>{p.phone||"-"}</td>
     <td><select className="input" value={p.role_id||""} disabled={saving===p.id} onChange={e=>updateUser(p.id,{role_id:e.target.value||null})}><option value="">Belum ada role</option>{roles.map(r=><option key={r.id} value={r.id}>{labels[r.code]??r.name}</option>)}</select></td>
     <td><span className={p.is_active?"success":"danger"}>{p.is_active?"Aktif":"Nonaktif"}</span></td>
     <td><button className="btn btn-light" disabled={saving===p.id} onClick={()=>updateUser(p.id,{is_active:!p.is_active})}>{saving===p.id?"Menyimpan...":p.is_active?"Nonaktifkan":"Aktifkan"}</button></td>
    </tr>})}
   </tbody></table></div>}
  </div>
  <div className="card"><h2>Hak Akses Role</h2><div className="table-wrap"><table className="table"><thead><tr><th>Role</th><th>Akses</th></tr></thead><tbody>
   <tr><td><strong>Owner</strong></td><td>Semua modul ERP + Pengguna & Role.</td></tr>
   <tr><td><strong>Admin</strong></td><td>Operasional ERP dan Pengguna & Role sesuai policy.</td></tr>
   <tr><td><strong>Kasir</strong></td><td>Dashboard, POS, Customer, Retur, Riwayat Transaksi.</td></tr>
   <tr><td><strong>Gudang</strong></td><td>Produk & Stok, Pembelian, Supplier, Transfer, Stock Opname, Retur.</td></tr>
   <tr><td><strong>Accounting</strong></td><td>Pembelian, Supplier, Customer, Pembayaran, Pengeluaran, Laporan, Export, Riwayat.</td></tr>
  </tbody></table></div></div>
 </main></div>;
}