'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Clock, MapPin } from 'lucide-react';

const Addpopup = () => {
  return (
    <div className="block md:hidden px-4 py-3">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="relative h-[220px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl"
      >
        {/* Background Image - Luxury Room Look */}
        <img 
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop" 
          alt="Luxury Room" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

        {/* Content Layer */}
        <div className="relative h-full flex flex-col justify-between p-6">
          
          {/* Top Info */}
          <div className="flex justify-between items-start">
            <span className="bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
              Limited Offer
            </span>
            <div className="flex items-center gap-1 text-white/80 text-[10px] font-bold">
              <MapPin size={12} className="text-blue-400" /> CG Services
            </div>
          </div>

          {/* Main Pricing & Title */}
          <div className="mb-4">
            <h2 className="text-white text-3xl font-black tracking-tighter leading-tight">
              Hourly Stay
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-blue-400 font-black text-2xl">₹999</span>
              <span className="text-white/60 text-xs font-medium">/ 2 Hours Stay</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <a 
              href="tel:9131460470" 
              className="flex-1 flex items-center justify-center gap-2 bg-white text-slate-900 py-3.5 rounded-2xl font-black text-sm active:scale-95 transition-all shadow-lg"
            >
              <Phone size={18} fill="currentColor" /> Call Now
            </a>
            <a 
              href="https://wa.me/9131460470" 
              className="w-14 flex items-center justify-center bg-[#25D366] text-white py-3.5 rounded-2xl active:scale-95 transition-all shadow-lg shadow-green-500/20"
            >
              <MessageCircle size={22} fill="currentColor" />
            </a>
          </div>
        </div>
      </motion.div>
      
      {/* Bottom Minimal Info */}
      <p className="text-center text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-[0.3em]">
        Raipur • Bhilai • Bilaspur
      </p>
    </div>
  );
};

export default Addpopup;