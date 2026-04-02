import { Outfit } from "next/font/google";
import "./globals.css"; 
import { Suspense } from "react";
// 👇 Apna AuthProvider import karo (path check kar lena sahi hai ya nahi)
import AuthProvider from "./components/AuthProvider"; 
import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased bg-[#FCFCFC]`}>
        {/* ✅ Sabse upar AuthProvider lagao */}
        <AuthProvider>
          <Suspense fallback={null}>
            <Navbar /> {/* 👈 Navbar ab provider ke andar hai, error nahi dega */}
            {children}
            <Footer/>
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  );
} 