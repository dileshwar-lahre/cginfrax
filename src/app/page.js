export default function Home() {
  return (
    <>
      {/* ✅ SEO Scripts ko Head mein hona chahiye ya Next.js ke sahi format mein */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(knowledgePanelSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main>
        {/* ❌ Yahan se Navbar hata do! Kyunki Navbar layout.js mein pehle se hai */}
        {/* Agar yahan bhi Navbar hoga, toh useSession do baar chalega aur build phat jayega */}
        
        <section id="home">
          <HeroSection />
        </section>

        <section id="about">
          <AboutSection />
        </section>

        <section id="services">
          <ServicesSection />
        </section>

        <section id="projects">
          {/* Projects content here */}
        </section>
      </main>
    </>
  );
}