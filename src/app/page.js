import Navbar from './components/Navbar';
import { HeroSection } from './components/HeroSection'; 
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';

// 👇 1. Project Page ko yahan import karein (Folder path ka dhyan rakhein)

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* 1. Hero & Search */}
      {/* 👇 id="home" lagaya taki navbar ka Home button yahan laye */}
      <section id="home">
        <HeroSection />
      </section>

      {/* 2. About Company */}
      {/* 👇 id="about" lagaya */}
      <section id="about">
        <AboutSection />
      </section>

      {/* 3. Services */}
      {/* 👇 id="services" lagaya */}
      <section id="services">
        <ServicesSection />
      </section>

      {/* 4. Projects Section */}
      {/* 👇 Ye naya section add kiya aur id="projects" di */}
      

      {/* Contact Section baad me add kar lena */}
    </main>
  );
}