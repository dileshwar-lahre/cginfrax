'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Home, Hammer, Map, BedDouble, CheckCircle, Phone, ArrowRight, Star, ShieldCheck } from 'lucide-react';

// --- Animations ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
};

export function ServicesSection() {
  return (
    // 👇 Yaha Maine <main> hata ke <section id="services"> laga diya hai
    <section id="services" className="bg-white min-h-screen font-sans selection:bg-orange-100 selection:text-orange-600">
      
      {/* --- HERO SECTION (Cinematic Look) --- */}
      <div className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden bg-gray-900">
        
        {/* Animated Background Image */}
        <motion.div 
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 opacity-50"
        >
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
            alt="Construction Background"
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <span className="inline-block py-1 px-3 rounded-full bg-orange-500/20 border border-orange-500/50 text-orange-400 text-sm font-semibold tracking-wider mb-6 backdrop-blur-md">
              PREMIUM REAL ESTATE SERVICES
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
              Building the Future of <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
                Chhattisgarh
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-light">
              Neev se lekar chhat tak. Hum banate hain wo ghar jahan sapne baste hain. 
              Construction • Interiors • Land • PG Rentals
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-orange-600/30 flex items-center gap-2">
                <Phone size={20} /> Get Free Consultation
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white rounded-full font-semibold transition-all">
                View Our Work
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- STATS STRIP (Modern Floating Bar) --- */}
      <div className="relative z-20 -mt-16 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center border border-gray-100"
        >
          {[
            { label: 'Happy Families', value: '1,200+' },
            { label: 'Projects Done', value: '450+' },
            { label: 'Years Serving', value: '12+' },
            { label: 'Cities Covered', value: '15+' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wide mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* --- SERVICES SECTION (Hover Cards) --- */}
      <div className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">World-Class Services</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Chhattisgarh ke har kone mein humari best-in-class services available hain.
            </p>
          </div>

          <motion.div 
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: Hammer, title: "Construction", desc: "Premium material ke saath majboot ghar.", color: "bg-orange-500" },
              { icon: Map, title: "Land & Plots", desc: "Raipur & Bhilai mein prime locations.", color: "bg-green-500" },
              { icon: Home, title: "Interiors", desc: "Luxury designs jo aapke budget mein fit hon.", color: "bg-blue-500" },
              { icon: BedDouble, title: "PG & Rooms", desc: "Safe aur fully furnished rental rooms.", color: "bg-purple-500" },
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-full h-1 ${service.color} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
                <div className={`w-14 h-14 rounded-2xl ${service.color} bg-opacity-10 flex items-center justify-center mb-6 text-white`}>
                   <service.icon className={`text-gray-900 group-hover:text-${service.color.split('-')[1]}-600 transition-colors`} size={28} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-500 leading-relaxed mb-6">{service.desc}</p>
                <a href="#" className="inline-flex items-center text-sm font-bold text-gray-900 hover:text-orange-600 transition-colors">
                  Explore Now <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* --- WHY CHOOSE US (Modern Grid) --- */}
      <div className="py-24 bg-gray-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 text-orange-400 mb-4 font-bold tracking-wider text-sm uppercase">
              <ShieldCheck size={18} /> Trusted by Thousands
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Kyun chunein hamein <br />
              <span className="text-gray-400">apne ghar ke liye?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Hum sirf structure nahi khada karte, hum bharosa banate hain. Har deal mein 100% transparency aur quality ka waada.
            </p>

            <div className="space-y-6">
              {[
                { title: "Transparency", desc: "Koi chupa hua kharcha nahi (No Hidden Cost)." },
                { title: "On-Time Delivery", desc: "Waqt ki kadar humein hai, delay nahi karte." },
                { title: "Local Expertise", desc: "Chhattisgarh ki mitti aur market ki samajh." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">{item.title}</h4>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual Image Grid */}
          <div className="relative">
             <div className="absolute -inset-4 bg-orange-500 rounded-full blur-3xl opacity-20"></div>
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="relative grid grid-cols-2 gap-4"
             >
                <img src="https://images.unsplash.com/photo-1600596542815-2a429b08e334?q=80&w=2075&auto=format&fit=crop" className="rounded-2xl object-cover h-64 w-full shadow-lg translate-y-8" alt="House" />
                <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop" className="rounded-2xl object-cover h-64 w-full shadow-lg" alt="Interior" />
                
                {/* Floating Badge */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-gray-900 p-4 rounded-xl shadow-2xl flex items-center gap-3 whitespace-nowrap z-10">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <Star fill="currentColor" size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-lg">4.9/5 Rating</p>
                    <p className="text-xs text-gray-500">From 500+ Clients</p>
                  </div>
                </div>
             </motion.div>
          </div>

        </div>
      </div>

      {/* --- CITIES MARQUEE (Styled List) --- */}
      <div className="py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto text-center px-6">
          <p className="text-gray-500 font-medium mb-8 uppercase tracking-widest text-sm">We are present in</p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-6">
            {["Raipur", "Bhilai", "Durg", "Bilaspur", "Korba", "Rajnandgaon", "Raigarh", "Jagdalpur"].map((city, idx) => (
              <span key={idx} className="px-6 py-3 rounded-full bg-white border border-gray-200 text-gray-600 font-semibold hover:border-orange-500 hover:text-orange-600 transition-all cursor-default shadow-sm hover:shadow-md">
                {city}
              </span>
            ))}
             <span className="px-6 py-3 rounded-full bg-orange-50 text-orange-700 font-semibold border border-orange-100">
               + All CG Districts
             </span>
          </div>
        </div>
      </div>

      {/* --- CTA SECTION --- */}
      <div className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-orange-600 to-red-600 rounded-[2.5rem] p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
          
          {/* Decorative Circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-black opacity-10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Sapna aapka, Zimmedari humari.</h2>
            <p className="text-orange-100 text-lg mb-10 max-w-2xl mx-auto">
              Intezaar mat karein. Aaj hi call karein aur free site visit book karein.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-700 px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2">
                <Phone size={22} /> +91 98765-43210
              </button>
              <button className="bg-orange-700 border border-orange-500 text-white px-10 py-4 rounded-full font-bold hover:bg-orange-800 transition-all">
                Check Pricing
              </button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}