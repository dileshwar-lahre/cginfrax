'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, Phone, Mail, 
  AlertTriangle, ArrowRight, HelpCircle 
} from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans flex items-center justify-center p-6 md:p-12">
      
      {/* --- BACKGROUND GLOW --- */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-green-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        
        {/* --- HEADER --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left mb-12 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-green-400 mb-6">
            <HelpCircle size={16} /> Help & Support
          </div>
          <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
            We are here to <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">help you out.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl md:max-w-lg">
            Koi bhi sawal ho ya property se judi jaankari chahiye, hum bas ek click door hain.
          </p>
        </motion.div>

        {/* --- MAIN GRID CONTENT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          
          {/* LEFT: CONTACT LIST */}
          <div className="space-y-5">
            <ContactItem 
              icon={<MessageCircle size={28} />}
              title="Chat on WhatsApp"
              subtitle="Sabse tez jawab (Recommended)"
              action={() => window.open('https://wa.me/919131460470', '_blank')}
              color="bg-[#25D366]"
              hoverColor="hover:bg-[#20bd5a]"
              textColor="text-white"
              glow="shadow-[0_0_30px_rgba(37,211,102,0.3)]"
            />

            <ContactItem 
              icon={<Phone size={28} />}
              title="Call Directly"
              subtitle="+91 91314 60470"
              action={() => window.open('tel:919131460470')}
              color="bg-white/5 border border-white/10"
              hoverColor="hover:bg-white/10"
              textColor="text-white"
            />

            <ContactItem 
              icon={<Mail size={28} />}
              title="Email Support"
              subtitle="support@cginfrax.com"
              action={() => window.open('mailto:support@cginfrax.com')}
              color="bg-white/5 border border-white/10"
              hoverColor="hover:bg-white/10"
              textColor="text-white"
            />
          </div>

          {/* RIGHT: REPORT PROBLEM (Highlighted Card) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 rounded-[2.5rem] p-8 md:p-12 text-center md:text-left relative overflow-hidden backdrop-blur-sm"
          >
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-[50px] -mr-10 -mt-10 pointer-events-none"></div>

            <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0 text-red-400">
                <AlertTriangle size={32} />
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-3">Koi Problem Aa Rahi Hai?</h3>
            <p className="text-gray-400 mb-10 leading-relaxed text-lg">
              Agar App me koi dikkat hai ya kuch samajh nahi aa raha, to please hume batayein. Hum turant solve karenge.
            </p>
            
            <button 
                onClick={() => window.open('https://wa.me/919131460470?text=Hi, mujhe app me ek problem aa rahi hai...', '_blank')}
                className="w-full bg-red-600 text-white font-bold py-4 rounded-2xl hover:bg-red-700 transition-all flex items-center justify-center gap-3 active:scale-95 text-lg shadow-xl shadow-red-900/20"
            >
                Report Issue <ArrowRight size={20} />
            </button>
          </motion.div>

        </div>

      </div>
    </main>
  );
}

// --- Contact Item Component ---
function ContactItem({ icon, title, subtitle, action, color, hoverColor, textColor, glow = "" }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={action}
      className={`${color} ${hoverColor} ${textColor} ${glow} p-6 md:p-8 rounded-[2rem] cursor-pointer flex items-center justify-between transition-all duration-300 backdrop-blur-md`}
    >
      <div className="flex items-center gap-6">
        <div className="p-4 bg-black/20 rounded-2xl backdrop-blur-sm">
            {icon}
        </div>
        <div>
            <h3 className="font-bold text-xl md:text-2xl mb-1">{title}</h3>
            <p className="opacity-80 text-sm md:text-base font-medium">{subtitle}</p>
        </div>
      </div>
      <div className="opacity-60 bg-white/10 p-3 rounded-full">
        <ArrowRight size={24} />
      </div>
    </motion.div>
  );
}