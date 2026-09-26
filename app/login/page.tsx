"use client";
import {FormEvent,useState} from "react";
import {createClient} from "@/lib/supabase/client";
import {useRouter} from "next/navigation";

export default function Login(){
 const supabase=createClient(),router=useRouter();
 const [email,setEmail]=useState(""),[password,setPassword]=useState(""),[error,setError]=useState(""),[loading,setLoading]=useState(false);
 async function submit(e:FormEvent){
  e.preventDefault();setLoading(true);setError("");
  const {error}=await supabase.auth.signInWithPassword({email,password});
  if(error){setError(error.message);setLoading(false);return;}
  await supabase.rpc("bootstrap_profile",{p_full_name:email.split("@")[0]});
  router.push("/dashboard");router.refresh();
 }
 return <main className="login-page"><section className="login-card">
  <div className="login-logo">PB</div><div className="eyebrow">ERP TOKO PECAH BELAH</div>
  <h1>Selamat datang kembali</h1><p>Kelola penjualan, stok, pembelian, dan laporan dalam satu tempat.</p>
  <form className="form" onSubmit={submit}>
   <label className="label">Email<input className="input" type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="nama@toko.com"/></label>
   <label className="label">Password<input className="input" type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••"/></label>
   {error&&<div className="alert error">{error}</div>}
   <button className="btn btn-primary btn-large" disabled={loading}>{loading?"Memproses…":"Masuk ke Dashboard →"}</button>
  </form><small className="login-note">Akun harus sudah dibuat melalui Supabase Auth.</small>
 </section></main>;
}