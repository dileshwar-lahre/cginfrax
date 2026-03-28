import { Outfit } from "next/font/google";
import "./globals.css";
import Topbar from "./components/Topbar";
import PhoneSearchBar from "./components/Phonesearchbar";
import Footer from "./components/Footer";
import AuthProvider from "./components/AuthProvider";
import { Suspense } from "react";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL('https://www.cginfrax.com'),
  title: "CG INFRAX - Properties in Chhattisgarh",
  description: "Buy, Rent, Sell Properties in Raipur, Bilaspur, Durg.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased`}>
        <AuthProvider>
          {/* ✅ Ye Suspense Navbar aur Searchbar ke errors ko rok lega */}
          <Suspense fallback={null}>
            <Topbar />
            <PhoneSearchBar />
          </Suspense>
          
          <main>
            {/* ✅ Ye children ke errors ko rok lega */}
            <Suspense fallback={null}>
              {children}
            </Suspense>
          </main>

          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}