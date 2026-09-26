import "./globals.css";
import { ReactNode } from "react";
export const metadata={title:"ERP Toko Pecah Belah",description:"ERP toko berbasis Supabase"};
export default function RootLayout({children}:{children:ReactNode}){return <html lang="id"><body>{children}</body></html>;}