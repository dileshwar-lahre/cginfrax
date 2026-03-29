// Pehle ek naya component banao layout file ke upar hi
function ClientWrapper({ children }) {
  const [mounted, setMounted] = typeof window !== 'undefined' 
    ? [true, null] 
    : [false, null]; // Build time par false rahega

  if (!mounted) {
    return <>{children}</>; // Build ke waqt bina Auth ke render hoga
  }

  return <AuthProvider>{children}</AuthProvider>;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientWrapper>
          <Suspense fallback={null}>
            <Navbar />
          </Suspense>
          <main>{children}</main>
          <Footer />
        </ClientWrapper>
      </body>
    </html>
  );
}