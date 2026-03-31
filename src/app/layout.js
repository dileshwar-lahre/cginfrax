import { Outfit } from "next/font/google";
// Baaki imports...

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* ✅ Yahan outfit define hona chahiye tabhi body mein chalega */}
      <body className={`${outfit.variable} font-sans antialiased bg-[#FCFCFC]`}>
         {/* Tera baaki code... */}
      </body>
    </html>
  );
}