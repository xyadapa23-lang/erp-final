import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

const ACCESS:Record<string,string[]>={
 owner:["*"],
 admin:["/dashboard","/pos","/products","/purchases","/suppliers","/customers","/stock-transfers","/stock-opname","/returns","/transactions","/receipt","/reports","/payments","/expenses","/export","/cashier","/users"],
 cashier:["/dashboard","/pos","/customers","/returns","/transactions","/receipt","/cashier"],
 warehouse:["/dashboard","/products","/purchases","/suppliers","/stock-transfers","/stock-opname","/returns","/transactions","/receipt"],
 accounting:["/dashboard","/purchases","/suppliers","/customers","/payments","/expenses","/reports","/export","/transactions","/returns","/receipt"]
};

function allowed(role:string,path:string){
 const rules=ACCESS[role]??[];
 return rules.includes("*")||rules.some(prefix=>path===prefix||path.startsWith(prefix+"/"));
}

export async function proxy(request:NextRequest){
 const response=await updateSession(request);
 const path=request.nextUrl.pathname;

 if(path==="/login"||path.startsWith("/api/")||path.startsWith("/_next/")) return response;

 const {createServerClient}=await import("@supabase/ssr");
 const supabase=createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,{
  cookies:{
   getAll(){return request.cookies.getAll()},
   setAll(cookiesToSet){cookiesToSet.forEach(({name,value})=>request.cookies.set(name,value))}
  }
 });
 const {data:{user}}=await supabase.auth.getUser();
 if(!user){
  const redirect=NextResponse.redirect(new URL("/login",request.url));
  response.cookies.getAll().forEach(c=>redirect.cookies.set(c.name,c.value));
  return redirect;
 }

 const {data:role}=await supabase.rpc("current_user_role");
 if(!role){
  const redirect=NextResponse.redirect(new URL("/login?error=profile",request.url));
  response.cookies.getAll().forEach(c=>redirect.cookies.set(c.name,c.value));
  return redirect;
 }

 if(!allowed(String(role),path)){
  const redirect=NextResponse.redirect(new URL("/dashboard",request.url));
  response.cookies.getAll().forEach(c=>redirect.cookies.set(c.name,c.value));
  return redirect;
 }

 return response;
}

export const config={matcher:["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"]};