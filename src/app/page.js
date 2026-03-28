import Navbar from './components/Navbar';
import { HeroSection } from './components/HeroSection'; 
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';

const knowledgePanelSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "CG INFRAX",
  "url": "https://cginfrax.com",
  "logo": "https://cginfrax.com/cginfrax_logo.png",
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
      {/* FIXED: Added 'key' prop to scripts and moved to the very top */}
      <script
        key="knowledge-panel-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(knowledgePanelSchema) }}
      />
      <script
        key="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      <section id="home">
        <HeroSection />
      </section>

      <section id="about">
        <AboutSection />
      </section>

      <section id="services">
        <ServicesSection />
      </section>

      <section id="projects">a
        {/* Projects content here */}
      </section>
    </main>
  );
}