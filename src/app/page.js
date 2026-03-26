import Navbar from './components/Navbar';
import { HeroSection } from './components/HeroSection'; 
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';

// --- 1. KNOWLEDGE PANEL & FAQ SCHEMA ---
const knowledgePanelSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "CG INFRAX",
  "url": "https://cginfrax.com",
  "logo": "https://cginfrax.com/logo.png",
  "description": "Chhattisgarh's leading real estate & construction portal. Direct rooms, house sales, and construction services.",
  "founders": [
    { "@type": "Person", "name": "DILESHWAR LAHRE", "jobTitle": "Founder & Managing Director" },
    { "@type": "Person", "name": "ADITYA LAHRE", "jobTitle": "Founder & Technical Director" },
    { "@type": "Person", "name": "AMIT LAHRE", "jobTitle": "Founder & Sales Director" }
  ],
  "sameAs": [
    "https://www.facebook.com/share/1axfg8mYaB/",
    "https://www.instagram.com/cginfrax?igsh=dXpnc2h2dDQ5eDh6",
    "https://www.linkedin.com/company/cginfrax/"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why should I use CG INFRAX to find or list properties?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CG INFRAX is the only platform in Chhattisgarh that offers 100% Free Unlimited Property Postings. We connect owners directly with tenants and buyers, eliminating middlemen and extra commission costs."
      }
    },
    {
      "@type": "Question",
      "name": "What type of listings are available on CG INFRAX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can find a wide range of listings including Rooms for Rent, PGs, Houses for Sale, and Residential Plots across all 33 districts of Chhattisgarh."
      }
    },
    {
      "@type": "Question",
      "name": "Who are the people behind CG INFRAX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CG INFRAX was founded by Dileshwar Lahre, Aditya Lahre, and Amit Lahre with a mission to make the Chhattisgarh real estate market transparent and middleman-free."
      }
    },
    {
      "@type": "Question",
      "name": "Does CG INFRAX provide construction services?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we provide end-to-end professional construction services, including architectural building, interior design, and exterior renovation with premium quality."
      }
    }
  ]
};

export default function Home() {
  return (
    <main>
      {/* --- SEO SCHEMAS (Google reads this) --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(knowledgePanelSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      {/* 1. Hero & Search */}
      <section id="home">
        <HeroSection />
      </section>

      {/* 2. About Company */}
      <section id="about">
        <AboutSection />
      </section>

      {/* 3. Services */}
      <section id="services">
        <ServicesSection />
      </section>

      {/* 4. Projects Section (Future Additions yahan aayenge) */}
      <section id="projects">
        {/* Yahan aap apna Projects component daal sakte hain */}
      </section>

    </main>
  );
}