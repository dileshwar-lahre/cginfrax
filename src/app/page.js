import Navbar from './components/Navbar';
import {HeroSection} from './components/HeroSection'; // 👈 Ye wala abhi banaya
import {AboutSection} from './components/AboutSection';
import {ServicesSection} from './components/ServicesSection';

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* 1. Hero & Search */}
      <HeroSection />

      {/* 2. About Company */}
      <AboutSection />

      {/* 3. Services */}
      <ServicesSection />

      {/* Contact Section baad me add kar lena */}
    </main>
  );
}