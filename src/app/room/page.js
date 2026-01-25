'use client';

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Star, 
  ArrowRight, 
  MapPin, 
  Users,
  Home,
  LayoutGrid,
  List,
  Wind
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// --- 🔥 DATA CONSTANTS ---
const ROOM_IMAGES = [
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&w=800&q=80',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&w=800&q=80',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&w=800&q=80',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&w=800&q=80',
];

const BANNERS = [
  { id: '1', title: 'Rooms in CG 🏠', subtitle: 'Verified rooms in Raipur & Bhilai.', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&w=800&q=80' },
  { id: '2', title: 'Zero Maintenance', subtitle: 'Ready to move in flats.', image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&w=800&q=80' },
  { id: '3', title: 'Flatmates Wanted', subtitle: 'Share a home in Bilaspur.', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&w=800&q=80' }
];

const CITIES = ['Kota (Raipur)', 'Bilaspur', 'Bhilai', 'Durg'];
const FILTERS = ['All Rooms', '🏠 1BHK', '🏙️ 2BHK', '🛌 Single Room', '🤝 Shared'];

const getRoomProperties = (cityName) => {
  return Array.from({ length: 6 }).map((_, index) => {
    let type = index % 2 === 0 ? 'SINGLE ROOM' : 'FLAT SHARE';
    let color = index % 2 === 0 ? 'bg-emerald-600' : 'bg-orange-500'; 
    
    return {
      id: `${cityName}-room-${index}`,
      title: index % 2 === 0 ? `Premium 1RK Studio` : `Spacious 2BHK Apartment`,
      price: `₹${6500 + index * 800}`,
      address: `Main Road, ${cityName}`,
      features: `Semi-Furnished • Kitchen`,
      occupancy: index % 2 === 0 ? `1 Person` : `2-3 People`,
      type: type,
      badgeColor: color,
      rating: '4.7',
      image: ROOM_IMAGES[index % ROOM_IMAGES.length]
    };
  });
};

export default function RoomPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1 === BANNERS.length ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 pb-20 selection:bg-emerald-400 selection:text-white">
      
      {/* --- 🔥 1. HERO SLIDER --- */}
      <div className="relative w-full h-[400px] md:h-[550px] overflow-hidden group">
        <div 
          className="flex transition-transform duration-1000 ease-out h-full w-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {BANNERS.map((item) => (
            <div key={item.id} className="min-w-full h-full relative">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover brightness-75 md:brightness-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-24">
                <div className="max-w-6xl mx-auto w-full">
                  <span className="text-emerald-400 text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-3 block">
                    — VERIFIED RENTALS
                  </span>
                  <h1 className="text-white text-5xl md:text-8xl font-black drop-shadow-2xl leading-tight">
                    {item.title}
                  </h1>
                  <p className="text-gray-200 text-lg md:text-2xl font-light mt-4 max-w-xl">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {BANNERS.map((_, index) => (
            <button 
              key={index} 
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-500 ${
                currentIndex === index ? 'w-12 bg-emerald-500' : 'w-2 bg-white/40 hover:bg-white/60'
              }`} 
            />
          ))}
        </div>

        {/* Back Button */}
        <div className="absolute top-8 left-8 z-20">
            <button 
              onClick={handleBack}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/30 transition-all text-white shadow-2xl"
            >
                <ArrowLeft size={24} />
            </button>
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-10">
          
        {/* --- 🏷️ FILTERS (Sticky) --- */}
        <div className="sticky top-0 z-30 bg-[#F8FAFC]/80 backdrop-blur-md py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex overflow-x-auto no-scrollbar whitespace-nowrap gap-3">
                {FILTERS.map((filter, index) => (
                    <button 
                      key={index} 
                      className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all duration-300 border ${
                        index === 0 
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xl shadow-emerald-100' 
                        : 'bg-white text-gray-500 border-gray-200 hover:border-emerald-400'
                      }`}
                    >
                      {filter}
                    </button>
                ))}
            </div>
            <div className="hidden md:flex items-center gap-2 bg-white p-1 rounded-2xl border border-gray-200">
               <button className="p-2 bg-gray-100 rounded-xl"><LayoutGrid size={20}/></button>
               <button className="p-2 text-gray-400"><List size={20}/></button>
            </div>
        </div>

        {/* --- 🏙️ CITIES SECTIONS --- */}
        {CITIES.map((city, index) => (
          <div key={index} className="mt-12 md:mt-20">
            {/* Section Header */}
            <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-6">
              <div>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                  Rooms in {city}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                    <Home size={18} className="text-emerald-600" />
                    <p className="text-slate-500 text-sm md:text-lg uppercase tracking-widest font-medium">Verified apartments & flatshares</p>
                </div>
              </div>
              <button className="hidden md:flex items-center gap-3 font-bold text-emerald-600 hover:gap-5 transition-all">
                VIEW ALL <ArrowRight size={20} />
              </button>
            </div>

            {/* Responsive Grid/Scroll */}
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 overflow-x-auto md:overflow-visible no-scrollbar gap-6 md:gap-10 pb-10">
              {getRoomProperties(city).map((item) => (
                <div 
                  key={item.id} 
                  className="group relative min-w-[310px] w-[85vw] md:w-full bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
                >
                  {/* Image Container */}
                  <div className="relative h-[240px] md:h-[280px] overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute top-5 left-5 right-5 flex justify-between items-start">
                        <span className={`${item.badgeColor} text-white text-[11px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-lg`}>
                          {item.type}
                        </span>
                        <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-slate-900 shadow-md">
                          <Star size={14} className="text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-bold">{item.rating}</span>
                        </div>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-6 md:p-8">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight group-hover:text-emerald-600 transition-colors">
                          {item.title}
                        </h4>
                        <div className="text-right">
                           <p className="text-2xl font-black text-emerald-700">{item.price}</p>
                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">per month</p>
                        </div>
                      </div>

                      {/* Info Pills */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="flex items-center gap-2 bg-emerald-50 p-3 rounded-2xl">
                            <Wind size={16} className="text-emerald-600" />
                            <span className="text-[11px] font-bold text-emerald-800 uppercase">AC Available</span>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-2xl">
                            <Users size={16} className="text-slate-500" />
                            <span className="text-[11px] font-bold text-slate-700 uppercase">{item.occupancy}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                          <div className="flex items-center gap-2 text-slate-400">
                              <MapPin size={16} />
                              <span className="text-xs md:text-sm font-medium truncate max-w-[180px]">{item.address}</span>
                          </div>
                          <button className="bg-slate-900 text-white p-3 rounded-xl hover:bg-emerald-600 transition-all active:scale-95 shadow-lg">
                            <ArrowRight size={20} />
                          </button>
                      </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>

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