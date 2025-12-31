'use client';

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Key, // Rent key icon
  ArrowRight, 
  CheckCircle, 
  BedDouble, 
  MapPin, 
  Search,
  Users
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// --- 🔥 DATA CONSTANTS ---
const ROOM_IMAGES = [
  'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&w=800&q=80', // Bedroom
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&w=800&q=80', // Living Area
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&w=800&q=80', // Minimal Room
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&w=800&q=80', // Cozy Apartment
];

const BANNERS = [
  { id: '1', title: 'Zero Brokerage 🤝', subtitle: 'Direct owner contact.', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&w=800&q=80' },
  { id: '2', title: 'Move-in Ready 🧳', subtitle: 'Fully furnished rooms.', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&w=800&q=80' },
  { id: '3', title: 'Budget Friendly 💰', subtitle: 'Rooms under ₹5000.', image: 'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?ixlib=rb-4.0.3&w=800&q=80' }
];

const CITIES = ['Bilaspur', 'Raipur', 'Bhilai', 'Durg', 'Korba'];
const FILTERS = ['All', '🏠 1 RK', '🛏️ 1 BHK', '🛋️ Furnished', '👨‍👩‍👧 Family'];

const getRoomProperties = (cityName) => {
  return Array.from({ length: 8 }).map((_, index) => {
    // Logic for Badges
    const isFurnished = index % 2 === 0;
    const type = index % 3 === 0 ? 'BACHELORS' : (index % 3 === 1 ? 'FAMILY' : 'ANYONE');
    // Blue, Pink, Green colors for Tailwind
    const badgeColor = index % 3 === 0 ? 'bg-blue-500' : (index % 3 === 1 ? 'bg-pink-500' : 'bg-emerald-500'); 
    
    return {
      id: `${cityName}-room-${index}`,
      title: isFurnished ? `Furnished Studio ${index+1}` : `Spacious 1 BHK ${index+1}`,
      price: `₹${3500 + index * 500}/mo`,
      deposit: `Dep: ₹${(3500 + index * 500) * 2}`,
      address: `Civil Lines, ${cityName}`,
      furnishing: isFurnished ? 'Fully Furnished' : 'Semi Furnished',
      type: type,
      badgeColor: badgeColor,
      rating: '4.2',
      image: ROOM_IMAGES[index % ROOM_IMAGES.length]
    };
  });
};

export default function RentPage() {
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
    <div className="min-h-screen bg-white font-sans text-slate-900 pb-20 selection:bg-blue-400 selection:text-white">
      
      {/* --- 🔥 1. HERO SLIDER --- */}
      <div className="relative w-full h-[400px] md:h-[550px] overflow-hidden group">
        
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
                className="w-full h-full object-cover brightness-[0.85]"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-16 pb-20 md:pb-24">
                <div className="max-w-7xl mx-auto w-full">
                  <span className="text-yellow-400 text-xs md:text-sm font-black tracking-widest uppercase mb-2 block animate-fade-in">
                    Rental Flats & Rooms
                  </span>
                  <h1 className="text-white text-4xl md:text-7xl font-extrabold drop-shadow-2xl leading-tight max-w-3xl">
                    {item.title}
                  </h1>
                  <p className="text-gray-200 text-lg md:text-2xl font-medium mt-3 max-w-2xl text-shadow-sm">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-6 md:left-16 flex gap-2 z-10">
          {BANNERS.map((_, index) => (
            <div 
              key={index} 
              className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'w-6 md:w-8 bg-yellow-400' : 'w-1.5 md:w-2 bg-white/50'
              }`} 
            />
          ))}
        </div>

        {/* --- 🔍 FLOATING GLASS SEARCH --- */}
        <div className="absolute top-6 left-0 right-0 px-4 z-20 flex justify-center">
            <div className="max-w-7xl w-full flex items-center justify-between gap-4">
                {/* Back Button */}
                <button 
                  onClick={() => router.back()} 
                  className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-black/40 transition-all duration-300 text-white hover:scale-105 active:scale-95"
                >
                    <ArrowLeft size={22} />
                </button>

                {/* Search Bar */}
                <div className="flex-1 max-w-3xl h-12 md:h-14 rounded-full bg-black/30 backdrop-blur-xl border border-white/20 flex items-center px-5 gap-3 hover:bg-black/40 transition-all duration-300 group-search">
                    <Key size={20} className="text-white/80 shrink-0" />
                    <input 
                      type="text" 
                      placeholder="Search locality, rent budget..." 
                      className="w-full bg-transparent outline-none text-white placeholder-white/70 text-sm md:text-base font-medium"
                    />
                </div>
                
                 {/* Desktop List Button */}
                 <div className="hidden md:block">
                   <button className="px-6 py-3 rounded-full bg-yellow-400 text-black font-bold text-sm hover:bg-yellow-300 transition-colors shadow-lg">
                      Free Listing
                   </button>
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-0 md:px-8">
          
        {/* --- 🏷️ FILTERS --- */}
        <div className="mt-8 pl-5 md:pl-0 flex overflow-x-auto md:flex-wrap no-scrollbar pb-2 md:gap-3">
            {FILTERS.map((filter, index) => (
                <button 
                  key={index} 
                  className={`px-6 py-2.5 md:py-3 rounded-full mr-3 md:mr-0 text-sm md:text-base font-bold transition-all duration-300 border ${
                    index === 0 
                    ? 'bg-slate-900 border-slate-900 text-yellow-400 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5' 
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300'
                  }`}
                >
                  {filter}
                </button>
            ))}
        </div>

        {/* --- 🏙️ CITIES SECTIONS --- */}
        {CITIES.map((city, index) => (
          <div key={index} className="mt-12 md:mt-16 border-b border-gray-100 last:border-0 pb-12">
            
            {/* Section Header */}
            <div className="flex justify-between items-end px-5 md:px-0 mb-6 md:mb-8">
              <div>
                <h2 className="text-2xl md:text-4xl font-light text-slate-800">
                  Rent in <span className="font-black text-black">{city}</span>
                </h2>
                <p className="text-slate-500 text-xs md:text-sm font-medium mt-1">Verified owners & agents</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 hover:bg-black hover:text-white transition-all group">
                <span className="text-sm font-bold hidden md:block">View All</span>
                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-gray-800 group-hover:text-white transition-colors">
                    <ArrowRight size={16} />
                </div>
              </button>
            </div>

            {/* 🔥 RESPONSIVE GRID LAYOUT 🔥 */}
            <div className="
                flex overflow-x-auto no-scrollbar gap-5 px-5 md:px-0 pb-5
                md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8 md:overflow-visible
            ">
              {getRoomProperties(city).map((item) => (
                <div 
                  key={item.id} 
                  className="
                    group relative 
                    min-w-[280px] w-[80vw] md:w-full 
                    h-[360px] md:h-[380px] 
                    rounded-[1.5rem] overflow-hidden 
                    shadow-lg hover:shadow-2xl 
                    transition-all duration-300 ease-out 
                    md:hover:-translate-y-2 cursor-pointer bg-white
                  "
                >
                  {/* Background Image */}
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />

                  {/* Top Row Overlay */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                      {/* Tenant Tag */}
                      <div className={`${item.badgeColor} px-3 py-1.5 rounded-lg text-white shadow-md`}>
                        <span className="text-[10px] md:text-xs font-black tracking-wide uppercase">{item.type}</span>
                      </div>
                      
                      {/* Verified Tag */}
                      <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white shadow-sm border border-white/10">
                        <CheckCircle size={14} className="text-white" />
                        <span className="text-[10px] md:text-xs font-bold tracking-wide">No Brokerage</span>
                      </div>
                  </div>

                  {/* Bottom Info Overlay */}
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900 via-slate-900/95 to-transparent p-5 pt-16 text-white">
                      
                      {/* Price & Deposit Row */}
                      <div className="flex justify-between items-end mb-1">
                          <h3 className="text-yellow-400 text-2xl md:text-3xl font-extrabold">
                            {item.price}
                          </h3>
                          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                             {item.deposit}
                          </span>
                      </div>

                      <h4 className="text-lg md:text-xl font-bold leading-tight mb-1 truncate">
                        {item.title}
                      </h4>

                      {/* Furnished Status */}
                      <div className="flex items-center gap-1.5 mb-3">
                          <BedDouble size={16} className="text-green-400" />
                          <span className="text-green-400 text-xs font-bold">{item.furnishing}</span>
                      </div>

                      {/* Divider */}
                      <div className="h-[1px] w-full bg-white/15 mb-3" />

                      {/* Address */}
                      <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1 text-slate-300 text-xs truncate max-w-[80%]">
                              <MapPin size={12} />
                              <span className="truncate">{item.address}</span>
                          </div>
                      </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>

      {/* Global Style */}
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