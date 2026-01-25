'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sofa, ChefHat, BedDouble, Lamp, 
  Phone, MessageCircle, ArrowRight, Paintbrush, 
  Ruler, Clock, ShieldCheck
} from 'lucide-react';

// --- SERVICES DATA (High Quality Images) ---
const INTERIOR_SERVICES = [
  {
    id: 1,
    title: 'Living & Dining',
    desc: 'Luxury TV Units, False Ceiling, aur premium Wall Paneling.',
    icon: <Sofa size={32} />,
    color: 'teal',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Modular Kitchen',
    desc: 'Waterproof Ply, Acrylic Finish, aur Branded Fittings (Hettich/Ebco).',
    icon: <ChefHat size={32} />,
    color: 'orange',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Bedroom & Wardrobes',
    desc: 'Sliding Wardrobes, Hydraulic Beds, aur cozy Lighting setup.',
    icon: <BedDouble size={32} />,
    color: 'purple',
    image: 'https://images.unsplash.com/photo-1616594039964-40891a909d99?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'Commercial/Office',
    desc: 'Workstations, Reception Area, aur Modern Cabin Designs.',
    icon: <Lamp size={32} />,
    color: 'blue',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop'
  }
];

// --- PROCESS DATA ---
const PROCESS = [
  { title: "Consultation", icon: <MessageCircle />, desc: "Hum aapki requirement samjhenge." },
  { title: "2D/3D Design", icon: <Paintbrush />, desc: "Aapko pehle hi dikhayenge ghar kaisa dikhega." },
  { title: "Production", icon: <Ruler />, desc: "Factory finish material ki cutting aur pasting." },
  { title: "Installation", icon: <Clock />, desc: "45 Days ke andar site handover." },
];

export default function InteriorPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-24">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop" 
            alt="Luxury Interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-start mt-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-400/50 text-teal-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
              <Paintbrush size={14} /> Premium Interiors
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Design That <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300">Feels Like Home.</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
              Transform your space with <strong>CGINFRAX</strong>. From Modular Kitchens to Luxury Bedrooms, we deliver perfection in 45 Days.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => window.open('https://wa.me/919131460470?text=Hi, I want Interior Design consultation.', '_blank')}
                className="bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-all shadow-xl shadow-green-900/20"
              >
                <MessageCircle size={22} /> Get Free Estimate
              </button>
              <button 
                onClick={() => window.open('tel:919131460470')}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white hover:text-slate-900 transition-all"
              >
                <Phone size={22} /> Call Designer
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SERVICES SHOWCASE --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">What We Do</h2>
          <p className="text-gray-500 text-lg">Complete Home Interior Solutions under one roof.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {INTERIOR_SERVICES.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300"
            >
              {/* Image Top */}
              <div className="h-48 overflow-hidden relative">
                <img src={service.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all"></div>
              </div>
              
              {/* Content */}
              <div className="p-8">
                <div className={`w-14 h-14 bg-${service.color}-50 text-${service.color}-600 rounded-2xl flex items-center justify-center mb-4 -mt-16 relative z-10 shadow-md border-4 border-white`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{service.desc}</p>
                
                <button 
                  onClick={() => window.open(`https://wa.me/919131460470?text=Interested in ${service.title}`)}
                  className="text-teal-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  View Designs <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- OUR PROCESS (Dark Theme) --- */}
      <section className="bg-slate-900 text-white py-24 px-6 rounded-t-[4rem]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-teal-400 font-bold tracking-widest text-sm uppercase mb-2 block">How It Works</span>
              <h2 className="text-3xl md:text-5xl font-black leading-tight">
                From Concept <br/> to Completion.
              </h2>
            </div>
            <p className="text-slate-400 max-w-sm text-lg">
              Humara kaam karne ka tarika simple aur transparent hai. No hidden surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {PROCESS.map((step, i) => (
              <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="text-teal-400 mb-4 text-3xl">{step.icon}</div>
                <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                <p className="text-slate-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Trust Badge */}
          <div className="mt-16 p-8 bg-gradient-to-r from-teal-900 to-slate-800 rounded-3xl border border-teal-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <ShieldCheck size={48} className="text-teal-400" />
              <div>
                <h4 className="text-xl font-bold text-white">10 Year Warranty</h4>
                <p className="text-teal-200/80 text-sm">On all woodwork & hardware fittings.</p>
              </div>
            </div>
            <button 
               onClick={() => window.open('https://wa.me/919131460470?text=I want to book a site visit.')}
               className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-teal-50 transition-colors w-full md:w-auto"
            >
              Book Site Visit
            </button>
          </div>
        </div>
      </section>

      {/* --- FIXED FLOATING ACTION BAR (Mobile Only) --- */}
      <div className="fixed bottom-6 left-6 right-6 md:hidden z-50 flex gap-3">
        <button 
          onClick={() => window.open('tel:919131460470')}
          className="flex-1 bg-white text-slate-900 py-3.5 rounded-full font-bold shadow-2xl border border-gray-200 flex items-center justify-center gap-2"
        >
          <Phone size={18} /> Call Now
        </button>
        <button 
          onClick={() => window.open('https://wa.me/919131460470', '_blank')}
          className="flex-1 bg-[#25D366] text-white py-3.5 rounded-full font-bold shadow-2xl flex items-center justify-center gap-2"
        >
          <MessageCircle size={18} /> WhatsApp
        </button>
      </div>

    </main>
  );
}