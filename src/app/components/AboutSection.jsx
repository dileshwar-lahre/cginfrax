'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Quote, ChevronDown, Sparkles, 
  Facebook, Instagram, Linkedin // Social Icons Import kiye
} from 'lucide-react';

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.2, delayChildren: 0.1 } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 50, damping: 20 } 
  }
};

export function AboutSection() {
  
  // --- FOUNDERS DATA (Added Social Links) ---
  const founders = [
    {
      initials: "DL",
      name: "DILESHWAR LAHRE",
      role: "Founder & Managing Director",
      quote: "Mera maqsad Chhattisgarh ke Real Estate ko India ka sabse transparent market banana hai.",
      bio: "Dileshwar brings over a decade of experience in strategic planning and land acquisition. His vision is to eliminate the middleman culture entirely from Chhattisgarh's real estate market.",
      image: "/images/ranu.png",
      socials: {
        instagram: "https://www.instagram.com/cg_rapper_0?igsh=ZDlmMDdxczJudzhu",
        linkedin: "https://www.linkedin.com/in/dileshwar-lahre-530039273?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        facebook: "https://www.facebook.com/share/17m8dR7miy/"
      }
    },
    {
      initials: "AL",
      name: "ADITYA LAHRE",
      role: "Founder & Technical Director",
      quote: "Speed aur Quality hamari pehchan hai. Hum waade se pehle project deliver karte hain.",
      bio: "Aditya leads the technical operations and digital infrastructure. His sharp eye for detail ensures seamless execution and global quality standards in every project.",
      image: "/images/aditya.png",
      socials: {
        instagram: "https://www.instagram.com/aditya__lahre?igsh=cWxkMmswMzJlZzA0",
        linkedin: "https://www.linkedin.com/in/aditya-lahre-742516261?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        facebook: "https://www.facebook.com/share/1EryfHw3LF/"
      }
    },
    {
      initials: "AM",
      name: "AMIT LAHRE",
      role: "Founder & Sales Director",
      quote: "Customer ki har query ka sahi jawab aur behtareen deal hamari priority hai.",
      bio: "Amit is the people's person. He heads the sales division with a philosophy of 'Consulting over Selling', ensuring every client gets exactly what they need within their budget.",
      image: "/images/amit.png",
      socials: {
        instagram: "https://www.instagram.com/amit_lahre.28?igsh=MWpoY3JmbWR0dHlsNg==",
        linkedin: "https://www.linkedin.com/in/amit-lahre-2194202b0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        facebook: "https://www.facebook.com/share/17m8dR7miy/"
      }
    }
  ];

  return (
    <section id="about" className="bg-slate-50 font-sans selection:bg-blue-600 selection:text-white overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <div className="relative w-full py-24 md:py-32 bg-[#0F172A] text-center px-6 isolate">
        <div className="absolute inset-0 -z-10 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-500/10 blur-[120px] -z-10"></div>

        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={containerVariants}
          className="max-w-5xl mx-auto relative"
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 backdrop-blur-md text-blue-300 text-sm font-semibold tracking-wide uppercase shadow-lg shadow-blue-900/50">
              <Sparkles size={14} className="text-orange-400 fill-orange-400 animate-pulse" />
              Est. 2026 • Chhattisgarh's Trusted Choice
            </div>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tight leading-[1.1]">
            Hum Property Nahi, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-white">
              Bharosa
            </span> Bechate Hain.
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
            Brokers aur hidden charges ka khel khatam. <br className="hidden md:block" />
            <span className="text-white font-semibold">CGINFRAX</span> lata hai aapko seedha builder ke paas.
          </motion.p>
        </motion.div>
      </div>

      {/* --- FOUNDERS SECTION --- */}
      <div className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">- Lahre Brothers -</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {founders.map((founder, idx) => (
              <FounderCard 
                key={idx}
                {...founder} // Pass all founder data including socials
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

// --- UPDATED FOUNDER CARD ---
function FounderCard({ initials, name, role, quote, bio, image, socials }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      layout
      whileHover={{ y: -5 }}
      className="bg-white rounded-[2rem] shadow-md border border-slate-100 relative overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:border-blue-200"
    >
      {/* 1. ASPECT RATIO 4:5 FOR FULL IMAGE VISIBILITY 
          'aspect-[4/5]' class ensures the image is tall and not cropped tightly
      */}
      <div className="w-full aspect-[4/5] relative bg-slate-100 overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400 font-bold text-6xl">
            {initials}
          </div>
        )}
        
        {/* Gradient Overlay for style */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-40"></div>
      </div>

      {/* 2. TEXT CONTENT */}
      <div className="p-8 flex flex-col flex-grow">
        
        <div className="mb-4">
          <h3 className="text-2xl font-extrabold text-slate-900 leading-tight">{name}</h3>
          <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mt-1">{role}</p>
        </div>

        <div className="relative mb-6">
          <Quote size={20} className="text-blue-200 absolute -top-3 -left-2 transform -scale-x-100" />
          <p className="text-slate-600 italic text-base leading-relaxed pl-4 z-10 relative">
            "{quote}"
          </p>
        </div>

        <div className="flex-grow"></div>

        {/* 3. LEARN MORE & SOCIALS */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors w-full justify-between group"
          >
            <span>{isOpen ? "Close Details" : "Know More"}</span>
            <div className={`p-2 rounded-full bg-slate-100 group-hover:bg-blue-50 transition-colors ${isOpen ? 'rotate-180' : ''}`}>
               <ChevronDown size={16} />
            </div>
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-slate-500 text-sm leading-relaxed mt-4 pt-2">
                  {bio}
                </p>

                {/* --- SOCIAL MEDIA ICONS --- */}
                <div className="flex items-center gap-4 mt-6 pt-4 border-t border-dashed border-slate-200">
                  <a href={socials.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-pink-500 hover:text-white transition-all duration-300">
                    <Instagram size={18} />
                  </a>
                  <a href={socials.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                    <Linkedin size={18} />
                  </a>
                  <a href={socials.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-800 hover:text-white transition-all duration-300">
                    <Facebook size={18} />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
}