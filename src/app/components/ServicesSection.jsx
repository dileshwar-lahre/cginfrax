'use client';

import React from 'react';
import { motion } from 'framer-motion';
// 👇 Link component added
import Link from 'next/link';
// 👇 Added 'Wallet' icon for the 3rd point
import { Home, Hammer, Map, BedDouble, CheckCircle, Phone, ArrowRight, Star, ShieldCheck, MessageCircle, Wallet } from 'lucide-react';

// --- Animations ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
};

export function ServicesSection() {

  // --- Services Data ---
  const services = [
    { 
      icon: Hammer, 
      title: "Ghar Banwana Hai?", 
      subtitle: "Construction",
      desc: "Neev se lekar chhat tak, majbooti ki poori guarantee. Hum waisa hi banayenge jaisa aapne socha hai.", 
      color: "bg-orange-500",
      imgUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1931&auto=format&fit=crop",
      link: "/construction"
    },
    { 
      icon: Map, 
      title: "Zameen Kharidni Hai?", 
      subtitle: "Land & Plots",
      desc: "Bilaspur aur Raipur ki prime locations par clear-title plots. Paperwork ki zimmedari humari.", 
      color: "bg-green-600",
      imgUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2032&auto=format&fit=crop",
      link: "/plots"
    },
    { 
      icon: Home, 
      title: "Interior Sajana Hai?", 
      subtitle: "Interior Design",
      desc: "Luxury designs jo aapke budget mein fit hon. Chaar diwari ko ghar banate hain humare designs.", 
      color: "bg-blue-600",
      imgUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
      link: "/interior_design"
    },
    { 
      icon: BedDouble, 
      title: "Room Rent Pe Chahiye?", 
      subtitle: "PG & Rentals",
      desc: "Students aur professionals ke liye safe, fully furnished rooms. Ghar se door, ghar jaisa sukoon.", 
      color: "bg-purple-600",
      imgUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071&auto=format&fit=crop",
      link: "/room"
    },
  ];

  return (
    <section id="services" className="bg-slate-50 min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* --- HERO SECTION --- */}
      <div className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-[#0F172A]">
        
        <motion.div 
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 opacity-40"
        >
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
            alt="Construction"
            className="w-full h-full object-cover grayscale"
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/70 to-blue-900/20"></div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-blue-500/10 border border-blue-400/20 backdrop-blur-md text-blue-300 text-sm font-semibold mb-6">
              <Star size={14} className="text-amber-400 fill-amber-400" />
              Chhattisgarh's Most Reliable Choice
            </div>
            
            <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight mb-6">
              Sapne Aapke, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Mehnat Humari.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Property khareedna ya ghar banana koi transaction nahi, ek emotion hai. <br className="hidden md:block"/>
              <strong className="text-white">CGINFRAX</strong> par hum aapki har zaroorat ko apna samajh kar pura karte hain.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="https://wa.me/919131460470" target="_blank" className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-green-600/30 flex items-center gap-2">
                <MessageCircle size={20} /> Chat on WhatsApp
              </a>
              <Link href="/properties">
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white rounded-full font-semibold transition-all">
                  See Our Projects
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- STATS STRIP --- */}
      <div className="relative z-20 -mt-12 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-10 flex flex-wrap justify-between gap-8 text-center border border-slate-100"
        >
          {[
            { label: 'Families Settled', value: '500+' },
            { label: 'Projects Completed', value: '120+' },
            { label: 'Years Experience', value: '10+' },
            { label: 'Local Cities', value: '8+' },
          ].map((stat, i) => (
            <div key={i} className="flex-1 min-w-[150px]">
              <h3 className="text-3xl md:text-4xl font-black text-slate-900">{stat.value}</h3>
              <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* --- SERVICES --- */}
      <div className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Hum Aapke Liye Kya Kar Sakte Hain?</h2>
            <p className="text-slate-600 text-lg max-w-2xl">
              Chahiye plot ho ya bana-banaya ghar, hum har step par aapke saath hain.
            </p>
          </div>

          <motion.div 
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {services.map((service, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                className="group bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 overflow-hidden relative"
              >
                <div className="h-52 w-full overflow-hidden relative">
                   <img 
                     src={service.imgUrl} 
                     alt={service.title} 
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>

                <div className="p-8 pt-10 relative">
                    <div className={`w-14 h-14 rounded-2xl ${service.color} shadow-lg absolute -top-7 left-8 flex items-center justify-center text-white border-4 border-white z-10`}>
                       <service.icon size={26} />
                    </div>

                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 block">{service.subtitle}</span>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">{service.desc}</p>
                    
                    <Link href={service.link} className="inline-flex items-center text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors">
                      Details Dekhein <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* --- WHY CHOOSE US (UPDATED WITH 3 POINTS) --- */}
      <div className="py-24 bg-[#172554] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="inline-block bg-blue-500/20 text-blue-300 px-4 py-1 rounded-full text-xs font-bold mb-6 border border-blue-400/20 uppercase tracking-widest">
               Sachai aur Imandaari
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Aakhir Log <span className="text-blue-400">CGINFRAX</span> Par <br /> Bharosa Kyun Karte Hain?
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              Kyunki hum jaante hain ki ghar banana aasaan nahi hota. Hum aapki pareshaniyon ko samajhte hain aur unhe door karte hain.
            </p>

            <div className="space-y-8">
              {/* Point 1 */}
              <div className="flex gap-5 group">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 group-hover:bg-blue-500 transition-all">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">100% Verified Properties</h4>
                  <p className="text-slate-400 text-sm">Har property ke papers legal experts check karte hain. Fraud ka koi chance nahi.</p>
                </div>
              </div>

              {/* Point 2 (Changed) */}
              <div className="flex gap-5 group">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 group-hover:bg-blue-500 transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">Free Consultation On Call</h4>
                  <p className="text-slate-400 text-sm">Kahin jane ki zaroorat nahi. Phone uthaiye aur expert se free mein salah lijiye.</p>
                </div>
              </div>

              {/* Point 3 (Added) */}
              <div className="flex gap-5 group">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 group-hover:bg-blue-500 transition-all">
                  <Wallet size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">No Hidden Charges</h4>
                  <p className="text-slate-400 text-sm">Jo daam bataya jayega, wahi final hoga. Humare yahan transparency sabse pehle hai.</p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Visuals */}
          <div className="relative">
              <div className="absolute -inset-4 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
              <motion.div initial={{ scale: 0.9 }} whileInView={{ scale: 1 }} viewport={{ once: true }} className="relative grid grid-cols-2 gap-4">
                 <img src="https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?w=600&auto=format&fit=crop" className="rounded-3xl object-cover h-64 w-full shadow-2xl translate-y-8" alt="House" />
                 <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop" className="rounded-3xl object-cover h-64 w-full shadow-2xl" alt="Interior" />
              </motion.div>
          </div>
        </div>
      </div>

      {/* --- CITIES --- */}
      <div className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center px-6">
          <p className="text-slate-400 font-bold mb-8 uppercase tracking-[0.3em] text-[10px]">Service Locations</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Raipur", "Bhilai", "Durg", "Bilaspur", "Korba", "Raigarh", "Jagdalpur"].map((city, idx) => (
              <span key={idx} className="px-6 py-2 rounded-full border border-slate-200 text-slate-600 font-semibold text-sm hover:border-blue-500 hover:text-blue-600 transition-all cursor-default">
                {city}
              </span>
            ))}
             <span className="px-6 py-2 rounded-full bg-blue-50 text-blue-700 font-bold text-sm border border-blue-100">
               + All Chhattisgarh Districts
             </span>
          </div>
        </div>
      </div>

      {/* --- CTA SECTION --- */}
      <div className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-orange-600 to-red-600 rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Sapna aapka, <br/>Zimmedari humari.</h2>
            <p className="text-orange-100 text-lg mb-12 max-w-2xl mx-auto opacity-90 leading-relaxed">
              Intezaar mat karein. Aaj hi call karein aur free site visit book karein. Fark aap khud mehsoos karenge.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <a href="tel:+919131460470" className="bg-white text-orange-700 px-10 py-5 rounded-full font-black shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2">
                <Phone size={22} /> +91 91314-60470
              </a>
              <a href="https://wa.me/919131460470" target="_blank" className="bg-orange-800 border border-orange-400 text-white px-10 py-5 rounded-full font-black hover:bg-orange-950 transition-all flex items-center justify-center gap-2">
                <MessageCircle size={22} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}