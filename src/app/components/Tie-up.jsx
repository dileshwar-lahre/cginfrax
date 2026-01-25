'use client';

import React from 'react';
import { motion } from 'framer-motion';

const PARTNERS = [
  { id: 1, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Tata_logo.svg/512px-Tata_logo.svg.png' },
  { id: 2, logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/UltraTech_Cement_Logo.svg/512px-UltraTech_Cement_Logo.svg.png' },
  { id: 3, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/JSW_Group_logo.svg/512px-JSW_Group_logo.svg.png' },
  { id: 4, logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/ACC_Limited_logo.png' },
  { id: 5, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/512px-HDFC_Bank_Logo.svg.png' },
  { id: 6, logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Ambuja_Cements_Logo.svg/512px-Ambuja_Cements_Logo.svg.png' },
];

export default function Tieup() {
  return (
    <section className="py-16 bg-white border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- Center Aligned Professional Heading --- */}
        <div className="flex items-center justify-center gap-6 mb-12">
          <div className="hidden md:block h-[1px] flex-1 bg-gradient-to-r from-transparent to-gray-200"></div>
          <h2 className="text-sm md:text-base font-bold text-gray-400 uppercase tracking-[0.3em] whitespace-nowrap">
            Our Strategic <span className="text-orange-600">Partners</span>
          </h2>
          <div className="hidden md:block h-[1px] flex-1 bg-gradient-to-l from-transparent to-gray-200"></div>
        </div>

        {/* --- Infinite Logo Ribbon --- */}
        <div className="relative flex items-center">
          {/* Side Fades for smooth entry/exit */}
          <div className="absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none" />

          <div className="flex overflow-hidden w-full">
            <motion.div 
              className="flex flex-none items-center gap-16 md:gap-28"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ 
                ease: "linear", 
                duration: 25, 
                repeat: Infinity 
              }}
            >
              {[...PARTNERS, ...PARTNERS].map((partner, index) => (
                <div key={index} className="flex-none transition-all duration-500 hover:scale-110">
                  <img 
                    src={partner.logo} 
                    alt="Partner"
                    className="h-10 md:h-14 w-auto object-contain grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-300 pointer-events-none"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- Tiny Bottom Tagline --- */}
      <p className="text-center text-[10px] text-gray-300 mt-10 font-medium uppercase tracking-widest">
        Trusted Industry Leaders
      </p>
    </section>
  );
}