import { Outfit } from "next/font/google";
import "./globals.css";
import Topbar from "./components/Topbar";
import PhoneSearchBar from "./components/Phonesearchbar";
import Footer from "./components/Footer";
import AuthProvider from "./components/AuthProvider";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: "CG INFRAX - Buy, Rent, Sell Properties in Chhattisgarh | Rooms, Houses, Plots, PG",
  description: "Find your perfect property in Chhattisgarh. Buy, rent, or sell houses, rooms, plots, and PG in Raipur, Bilaspur, Durg, and all CG districts. Direct connections, zero hassle.",
  keywords: "properties in Chhattisgarh, buy house Raipur, rent room Bilaspur, plots Durg, PG Raipur, real estate CG, property for sale, property for rent",
  openGraph: {
    title: "CG INFRAX - Chhattisgarh's Premier Real Estate Platform",
    description: "Buy, Rent, or Sell Properties in Chhattisgarh. Direct connections, zero hassle.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "CG INFRAX - Properties in Chhattisgarh",
    description: "Find your perfect property in Chhattisgarh",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased`}>
        <AuthProvider>
          <Topbar />
          <PhoneSearchBar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
