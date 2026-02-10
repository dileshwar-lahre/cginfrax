import { Outfit } from "next/font/google";
import "./globals.css";
import Topbar from "./components/Topbar";
import PhoneSearchBar from "./components/Phonesearchbar";
import Footer from "./components/Footer";
import AuthProvider from "./components/AuthProvider";
import { Suspense } from "react"; // ✅ Suspense import kiya

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL('https://www.cginfrax.com'), // ✅ WWW added for consistency
  title: {
    default: "CG INFRAX - Buy, Rent, Sell Properties in Chhattisgarh | Rooms, Houses, Plots, PG",
    template: "%s | CG INFRAX"
  },
  description: "Find your perfect property in Chhattisgarh. Buy, rent, or sell houses, rooms, plots, and PG in Raipur, Bilaspur, Durg, and all CG districts. Direct connections, zero hassle.",
  keywords: ["properties in Chhattisgarh", "buy house Raipur", "rent room Bilaspur", "plots Durg", "PG Raipur", "real estate CG", "property for sale", "property for rent", "Chhattisgarh real estate", "Raipur properties", "Bilaspur properties"],
  authors: [{ name: "CG INFRAX" }],
  creator: "CG INFRAX",
  publisher: "CG INFRAX",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.cginfrax.com",
    siteName: "CG INFRAX",
    title: "CG INFRAX - Chhattisgarh's Premier Real Estate Platform",
    description: "Buy, Rent, or Sell Properties in Chhattisgarh. Direct connections, zero hassle.",
    images: [
      {
        url: "/images/cginfrax_logo.png",
        width: 1200,
        height: 630,
        alt: "CG INFRAX - Chhattisgarh Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CG INFRAX - Properties in Chhattisgarh",
    description: "Find your perfect property in Chhattisgarh",
    images: ["/images/cginfrax_logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://www.cginfrax.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased`}>
        {/* ✅ AuthProvider ke bahar Suspense lagane se build error nahi aayega */}
        <Suspense fallback={null}>
          <AuthProvider>
            <Topbar />
            <PhoneSearchBar />
            <main>{children}</main>
            <Footer />
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}