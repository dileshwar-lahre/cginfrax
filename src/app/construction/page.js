'use client';

import React, { Suspense } from 'react'; // ✅ Suspense import kiya
import { motion } from 'framer-motion';
import { 
  Hammer, Ruler, PaintBucket, HardHat, 
  Phone, MessageCircle, CheckCircle2, ArrowRight, 
  BrickWall
} from 'lucide-react';

// --- DATA ---
const SERVICES = [
  {
    id: 1,
    title: 'Turnkey Construction',
    desc: 'Neenv (Foundation) se lekar Chaabi (Key) tak. Complete house construction with material.',
    icon: <BrickWall size={32} />,
    color: 'blue'
  },
  {
    id: 2,
    title: 'Architecture & 3D Maps',
    desc: 'Modern 2D/3D Naksha (Map), Elevation aur Structural Design expert architects se.',
    icon: <Ruler size={32} />,
    color: 'orange'
  },
  {
    id: 3,
    title: 'Interior Design',
    desc: 'Premium False Ceiling, Modular Kitchen, aur Furniture work finishing ke saath.',
    icon: <PaintBucket size={32} />,
    color: 'purple'
  },
  {
    id: 4,
    title: 'Renovation & Repairs',
    desc: 'Purane ghar ko naya banayein. Tiles, Paint, aur Plumbing ka sara kaam.',
    icon: <Hammer size={32} />,
    color: 'green'
  }
];

const FEATURES = [
  "100% Transparency in Material Quality",
  "On-Time Delivery Guarantee",
  "Daily Work Updates on WhatsApp",
  "Experienced Civil Engineers",
  "No Hidden Costs",
  "Legal Agreement before Work Starts"
];

// ✅ Pure logic ko ek alag component mein daal diya
function ConstructionContent() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-24">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2072&auto=format&fit=crop" 
            alt="Construction Site" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/50 text-orange-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-sm">
              <HardHat size={14} /> CGINFRAX Construction
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Hum Banayenge Aapka <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Sapno Ka Ghar.</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Best Quality Material. Fixed Rates. Expert Engineers.
              Chattisgarh ka sabse bharosemand construction partner.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.open('https://wa.me/919131460470?text=Hi, I want construction quote.', '_blank')}
                className="bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-all shadow-lg shadow-green-900/20"
              >
                <MessageCircle size={20} /> Get Free Quote
              </button>
              <button 
                onClick={() => window.open('tel:919131460470')}
                className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-all"
              >
                <Phone size={20} /> Call Expert
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Our Services</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Chahye naya ghar banana ho ya purane ko naya look dena ho, hum sab karte hain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-[2rem] shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform duration-300"
            >
              <div className={`w-16 h-16 bg-${service.color}-50 text-${service.color}-600 rounded-2xl flex items-center justify-center mb-6`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{service.desc}</p>
              
              <button 
                onClick={() => window.open(`https://wa.me/919131460470?text=I am interested in ${service.title}`)}
                className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
              >
                Enquire Now <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- WHY CHOOSE US (Trust Section) --- */}
      <section className="bg-slate-900 text-white py-20 px-6 rounded-t-[3rem]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          
          <div className="w-full md:w-1/2">
            <span className="text-orange-400 font-bold tracking-widest text-sm uppercase mb-2 block">Why CGINFRAX?</span>
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
              Quality Work.<br/> No Compromise.
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Hum jante hain ghar banana aasaan nahi hai. Isliye hum puri process ko transparent aur tension-free rakhte hain.
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              {FEATURES.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                  <CheckCircle2 className="text-green-400 shrink-0" size={20} />
                  <span className="font-medium text-slate-200">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 p-1 rounded-[2.5rem] shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop" 
                alt="Engineer Working" 
                className="rounded-[2.4rem] w-full object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-slate-900 p-6 rounded-3xl shadow-xl hidden md:block">
                <p className="text-4xl font-black text-blue-600">50+</p>
                <p className="text-sm font-bold text-gray-500">Projects Completed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MOBILE ACTION BAR --- */}
      <div className="fixed bottom-6 left-6 right-6 md:hidden z-50 flex gap-3">
        <button 
          onClick={() => window.open('tel:919131460470')}
          className="flex-1 bg-white text-slate-900 py-3.5 rounded-full font-bold shadow-lg border border-gray-200 flex items-center justify-center gap-2"
        >
          <Phone size={18} /> Call Now
        </button>
        <button 
          onClick={() => window.open('https://wa.me/919131460470', '_blank')}
          className="flex-1 bg-[#25D366] text-white py-3.5 rounded-full font-bold shadow-lg flex items-center justify-center gap-2"
        >
          <MessageCircle size={18} /> WhatsApp
        </button>
      </div>
    </main>
  );
}

// ✅ Main Export ko Suspense mein lapet diya (This fixes the build error)
export default function ConstructionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ConstructionContent />
    </Suspense>
  );
}