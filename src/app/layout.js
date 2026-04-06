import { Outfit } from "next/font/google";
import "./globals.css"; 
import { Suspense } from "react";
import AuthProvider from "./components/AuthProvider"; 
import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

// ✅ 1. Professional SEO Metadata (Jo Google Search mein dikhega)
export const metadata = {
  metadataBase: new URL('https://www.cginfrax.com'),
  title: {
    default: "Buy, Sell, Rent Properties & Construction | Cginfrax Chhattisgarh",
    template: "%s | Cginfrax"
  },
  description: "Chhattisgarh's leading marketplace for House Sale, Plots, Room Rent, and PG. Expert Home Construction, Interior, and Exterior design services by Lahre Brothers.",
  keywords: ["Real Estate Chhattisgarh", "House for sale Bilaspur", "Plots in Raipur", "Home Construction Chhattisgarh", "Interior Design", "Cginfrax", "Lahre Brothers"],
};

export default function RootLayout({ children }) {
  
  // ✅ 2. Combined Knowledge Panel & FAQ Schema (Google Search ke liye)
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        "@id": "https://www.cginfrax.com/#organization",
        "name": "Cginfrax",
        "url": "https://www.cginfrax.com",
        "image": "https://www.cginfrax.com/logo.png",
        "description": "Chhattisgarh's premier Real Estate Marketplace and Construction Service provider.",
        "founder": [
          { "@type": "Person", "name": "Dileshwar Lahre", "jobTitle": "Founder & CEO" },
          { "@type": "Person", "name": "Amit Lahre", "jobTitle": "Founder & Sales Director" },
          { "@type": "Person", "name": "Aditya Lahre", "jobTitle": "Founder & Technical Director" }
        ],
        "parentOrganization": {
          "@type": "Organization",
          "name": "Lahre Brothers",
          "url": "https://www.stonenox.com"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Bilaspur",
          "addressRegion": "Chhattisgarh",
          "addressCountry": "IN"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What services does Cginfrax offer in Chhattisgarh?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Cginfrax is a complete marketplace for House Sales, Plots, Room Rent, PG, Home Construction, and Interior/Exterior designing services."
            }
          },
          {
            "@type": "Question",
            "name": "Does Cginfrax provide home construction and elevation designs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we provide A-to-Z Home Construction, Material supply, and professional 3D Front Elevation, Interior, and Exterior design services."
            }
          },
          {
            "@type": "Question",
            "name": "Who are the founders of Cginfrax and Lahre Brothers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The platform is founded by Dileshwar Lahre (CEO), Amit Lahre, and Aditya Lahre under the Lahre Brothers group."
            }
          }
        ]
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        {/* ✅ Injection of Google Knowledge Panel & FAQ Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${outfit.variable} font-sans antialiased bg-[#FCFCFC]`}>
        <AuthProvider>
          <Suspense fallback={null}>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}