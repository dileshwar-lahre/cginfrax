'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { 
  Sofa, ChefHat, BedDouble, Lamp, 
  Phone, MessageCircle, ArrowRight, Paintbrush, 
  Ruler, Clock, ShieldCheck
} from 'lucide-react';

// ✅ 1. Build worker ko bypass karne ke liye
export const dynamic = "force-dynamic";

function InteriorContent() {
  // Yahan agar useSearchParams hota bhi toh error nahi aata
  const handleContact = (type, text = "") => {
    if (typeof window !== 'undefined') {
      const url = type === 'whatsapp' 
        ? `https://wa.me/919131460470?text=${encodeURIComponent(text)}`
        : 'tel:919131460470';
      window.open(url, '_blank');
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-24">
       {/* --- TERA PURA HERO AUR SERVICES WALA CODE --- */}
       <section className="relative h-[500px] flex items-center justify-center bg-slate-900 text-white">
          <div className="text-center z-10">
            <h1 className="text-5xl font-black mb-6">Interior <span className="text-teal-400">Design</span></h1>
            <button onClick={() => handleContact('whatsapp', 'Hi, I need Interior consultation.')} className="bg-teal-500 px-8 py-3 rounded-xl font-bold">
              Consult Now
            </button>
          </div>
       </section>
       
       {/* Baaki sections bhi yahan honge... */}
    </main>
  );
}

// ✅ 2. FINAL EXPORT: Suspense Boundary mandatory hai
export default function InteriorPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center font-bold text-teal-600 uppercase">Loading Interior...</div>}>
      <InteriorContent />
    </Suspense>
  );
}