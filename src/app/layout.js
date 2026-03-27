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
  title: {
    default: "CG INFRAX - Buy, Rent, Sell Properties in Chhattisgarh",
    template: "%s | CG INFRAX"
  },
  description: "Find your perfect property in Chhattisgarh. Raipur, Bilaspur, Durg.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased bg-[#FCFCFC]`}>
        {/* AuthProvider wraps everything but children go inside Suspense */}
        <AuthProvider>
          <Topbar />
          <PhoneSearchBar />
          
          <main>
            <Suspense fallback={
              <div className="h-screen flex items-center justify-center bg-white">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            }>
              {children}
            </Suspense>
          </main>

          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}