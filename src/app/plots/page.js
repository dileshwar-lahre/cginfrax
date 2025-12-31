'use client';

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Map, 
  ArrowRight, 
  Search, 
  ShieldCheck, 
  Heart, 
  MapPin, 
  ScanLine // Used for Plot Area/Dimensions
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// --- 🔥 DATA CONSTANTS (Land Focused) ---
const LAND_IMAGES = [
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&w=800&q=80', // Green Field
  'https://images.unsplash.com/photo-1629315979708-25f02c46399c?ixlib=rb-4.0.3&w=800&q=80', // Plot Marker
  'https://images.unsplash.com/photo-1516156008625-3a9d60da923c?ixlib=rb-4.0.3&w=800&q=80', // Open Land
  'https://images.unsplash.com/photo-1524813686514-a57563d77965?ixlib=rb-4.0.3&w=800&q=80', // Aerial View
];

const BANNERS = [
  { id: '1', title: 'Prime Land Investment', subtitle: 'High ROI on plots.', image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&w=800&q=80' },
  { id: '2', title: 'Commercial Zones', subtitle: 'Build your empire here.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&w=800&q=80' },
  { id: '3', title: 'Farm House Plots', subtitle: 'Connect with nature.', image: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?ixlib=rb-4.0.3&w=800&q=80' }
];

const CITIES = ['Bilaspur', 'Raipur', 'Bhilai', 'Durg', 'Jagdalpur'];
const FILTERS = ['All', '🔥 Hot Deals', '🏡 Residential', '🏢 Commercial', '🚜 Farm'];

const getLandProperties = (cityName) => {
  return Array.from({ length: 5 }).map((_, index) => ({
    id: `${cityName}-${index}`,
    title: index % 2 === 0 ? `Green Valley Plot ${index+1}` : `City Center Corner`,
    price: `₹${15 + index * 4} Lakh`, // Land price
    address: `New Extension, ${cityName}`,
    specs: `${1000 + index*200} sqft  |  ${index%2===0 ? '30x40' : '40x60'}`, // Area & Dimensions
    rating: '4.8',
    image: LAND_IMAGES[index % LAND_IMAGES.length]
  }));
};

export default function PlotsPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto Scroll Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1 === BANNERS.length ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 pb-20 selection:bg-green-400 selection:text-black">
      
      {/* --- 🔥 1. HERO SLIDER --- */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden group">
        
        {/* Images Wrapper */}
        <div 
          className="flex transition-transform duration-700 ease-in-out h-full w-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {BANNERS.map((item) => (
            <div key={item.id} className="min-w-full h-full relative">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-12 pb-16">
                <div className="max-w-4xl mx-auto w-full">
                  <span className="text-yellow-400 text-xs md:text-sm font-black tracking-widest uppercase mb-2 block">
                    Verified Plots
                  </span>
                  <h1 className="text-white text-4xl md:text-6xl font-extrabold drop-shadow-lg leading-tight">
                    {item.title}
                  </h1>
                  <p className="text-gray-200 text-lg md:text-xl font-medium mt-2">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-6 md:left-12 flex gap-2 z-10">
          {BANNERS.map((_, index) => (
            <div 
              key={index} 
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'w-6 bg-yellow-400' : 'w-1.5 bg-white/50'
              }`} 
            />
          ))}
        </div>

        {/* --- 🔍 FLOATING GLASS SEARCH --- */}
        <div className="absolute top-6 left-0 right-0 px-5 z-20 flex justify-center">
            <div className="max-w-4xl w-full flex items-center justify-between gap-3">
                {/* Back Button */}
                <button 
                  onClick={() => router.back()} 
                  className="w-11 h-11 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-black/50 transition-colors text-white"
                >
                    <ArrowLeft size={20} />
                </button>

                {/* Search Bar */}
                <div className="flex-1 h-11 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center px-4 gap-3">
                    <Map size={20} className="text-white/80 shrink-0" />
                    <input 
                      type="text" 
                      placeholder="Search location, area..." 
                      className="w-full bg-transparent outline-none text-white placeholder-white/70 text-sm font-medium"
                    />
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-0 md:px-4">
          
        {/* --- 🏷️ FILTERS --- */}
        <div className="mt-6 pl-5 md:pl-0 overflow-x-auto no-scrollbar whitespace-nowrap pb-2">
            {FILTERS.map((filter, index) => (
                <button 
                  key={index} 
                  className={`px-6 py-2.5 rounded-full mr-3 text-sm font-bold transition-all duration-300 ${
                    index === 1 
                    ? 'bg-slate-900 text-yellow-400 shadow-lg' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filter}
                </button>
            ))}
        </div>

        {/* --- 🏙️ CITIES SECTIONS --- */}
        {CITIES.map((city, index) => (
          <div key={index} className="mt-10">
            {/* Section Header */}
            <div className="flex justify-between items-center px-5 md:px-0 mb-5">
              <div>
                <h2 className="text-2xl font-light text-slate-800">
                  Plots in <span className="font-black text-black">{city}</span>
                </h2>
                <p className="text-slate-400 text-xs font-medium mt-0.5">Approved layouts & deals</p>
              </div>
              <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-black hover:text-white transition-all">
                <ArrowRight size={20} />
              </button>
            </div>

            {/* Horizontal Cards List */}
            <div className="flex overflow-x-auto no-scrollbar gap-5 px-5 md:px-0 pb-10">
              {getLandProperties(city).map((item) => (
                <div 
                  key={item.id} 
                  className="group relative min-w-[280px] w-[80vw] md:w-[320px] h-[350px] rounded-[1.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white"
                >
                  {/* Background Image */}
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />

                  {/* Top Row Overlay */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                      {/* RERA Tag */}
                      <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-xl text-white shadow-md">
                        <ShieldCheck size={14} className="text-green-400" />
                        <span className="text-xs font-bold tracking-wide">RERA Approved</span>
                      </div>
                      
                      {/* Heart Button */}
                      <div className="w-9 h-9 rounded-full bg-red-600/90 flex items-center justify-center text-white shadow-lg">
                        <Heart size={18} fill="white" />
                      </div>
                  </div>

                  {/* Bottom Info Overlay */}
                  <div className="absolute bottom-0 left-0 w-full bg-slate-900/90 p-5 pt-6 text-white backdrop-blur-md">
                      <h3 className="text-yellow-400 text-2xl font-extrabold mb-1">
                        {item.price}
                      </h3>
                      <h4 className="text-lg font-bold leading-tight mb-1 truncate">
                        {item.title}
                      </h4>

                      {/* Address */}
                      <div className="flex items-center gap-1 text-slate-400 text-xs mb-3 truncate">
                          <MapPin size={12} />
                          <span className="truncate">{item.address}</span>
                      </div>

                      {/* Divider */}
                      <div className="h-[1px] w-full bg-white/10 mb-3" />

                      {/* Specs (Area & Dimension) */}
                      <div className="flex items-center gap-2">
                          <ScanLine size={16} className="text-yellow-400" />
                          <span className="text-slate-200 text-sm font-bold tracking-wide">
                             {item.specs}
                          </span>
                      </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>

      {/* Global Style for hiding scrollbar */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}