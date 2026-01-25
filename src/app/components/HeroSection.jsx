'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
// Animation Library
import { motion, AnimatePresence } from 'framer-motion'; 

// Icons (MessageCircle add kiya hai WhatsApp ke liye)
import { 
  MapPin, Home, TrendingUp, SlidersHorizontal, 
  ArrowRight, BedDouble, Bath, Square, PlayCircle, Star, Users, CheckCircle,
  Map as MapIcon, Phone, ChevronRight, Search, MessageCircle
} from 'lucide-react';

// --- 🔥 BANNERS DATA ---
const MOBILE_BANNERS = [
  { 
    id: '1', 
    title: 'Home Construction', 
    subtitle: 'Build your dream home with experts.', 
    btnText: 'Start Building', 
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop', 
    btnColor: 'bg-orange-600',
    route: '/construction' 
  },
  { 
    id: '2', 
    title: 'Premium Interiors', 
    subtitle: 'Luxury designs for Living & Kitchen.', 
    btnText: 'Explore Designs', 
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop', 
    btnColor: 'bg-teal-600',
    route: '/interior' 
  },
  { 
    id: '3', 
    title: 'Exterior & Garden', 
    subtitle: 'Elevation, Paint & Landscaping.', 
    btnText: 'Get Quote', 
    image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=2080&auto=format&fit=crop', 
    btnColor: 'bg-green-600',
    route: '/exterior' 
  }
];

export function HeroSection() {
  return (
    <>
      <div className="block md:hidden bg-white min-h-screen pb-24">
        <MobileView />
      </div>
      <div className="hidden md:block">
        <DesktopView />
      </div>
    </>
  );
}

// ============================================================================
// 👇 PART 1: MOBILE VIEW COMPONENT
// ============================================================================
function MobileView() {
  const router = useRouter();
  const scrollRef = useRef(null); // Ref for swipe
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // --- 🔥 Slider Logic (30 Sec Auto + Swipe) ---
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const nextIndex = (currentBannerIndex + 1) % MOBILE_BANNERS.length;
        const width = scrollRef.current.offsetWidth;
        scrollRef.current.scrollTo({ left: nextIndex * width, behavior: 'smooth' });
        setCurrentBannerIndex(nextIndex);
      }
    }, 30000); // 30 Seconds

    return () => clearInterval(interval);
  }, [currentBannerIndex]);

  // Manual Scroll Detect
  const handleScroll = () => {
    if (scrollRef.current) {
        const index = Math.round(scrollRef.current.scrollLeft / scrollRef.current.offsetWidth);
        setCurrentBannerIndex(index);
    }
  };

  return (
    <div className="px-5 pt-4 font-sans text-slate-900">
      
      {/* --- CATEGORIES --- */}
      <div className="flex justify-between items-center mb-8 px-1 mt-4">
        <CategoryItem 
            icon={<Home size={26}/>} 
            label="House" 
            color="bg-blue-50" 
            iconColor="text-blue-600" 
            onClick={() => router.push('/house')} 
        />
        <CategoryItem 
            icon={<BedDouble size={26}/>} 
            label="Room" 
            color="bg-orange-50" 
            iconColor="text-orange-600" 
            onClick={() => router.push('/rooms')} 
        />
        <CategoryItem 
            icon={<Users size={26}/>} 
            label="PG" 
            color="bg-purple-50" 
            iconColor="text-purple-600" 
            onClick={() => router.push('/pg')} 
        />
        <CategoryItem 
            icon={<MapIcon size={26}/>} 
            label="Plot" 
            color="bg-green-50" 
            iconColor="text-green-600" 
            onClick={() => router.push('/plots')} 
        />
      </div>

      {/* --- 🔥 SLIDER BANNER (Swipeable, No Arrows, 30s) --- */}
      <div className="relative w-full mb-8">
        <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar rounded-3xl shadow-lg shadow-gray-200"
        >
           {MOBILE_BANNERS.map((banner) => (
             <div 
               key={banner.id}
               onClick={() => router.push(banner.route)}
               className="min-w-full relative h-[180px] snap-center cursor-pointer"
             >
                <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 p-6 flex flex-col justify-center items-start">
                    <h3 className="text-white text-2xl font-black tracking-tight leading-tight mb-1 shadow-sm">
                        {banner.title}
                    </h3>
                    <p className="text-gray-200 text-xs font-medium mb-4 max-w-[200px] leading-relaxed">
                        {banner.subtitle}
                    </p>
                    <span className={`${banner.btnColor} text-white text-[11px] font-bold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-1 active:scale-95 transition-transform`}>
                      {banner.btnText} <ArrowRight size={12} />
                    </span>
                </div>
             </div>
           ))}
        </div>
        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {MOBILE_BANNERS.map((_, idx) => (
            <div key={idx} className={`h-1.5 rounded-full transition-all duration-500 ${currentBannerIndex === idx ? 'w-6 bg-slate-800' : 'w-2 bg-gray-300'}`} />
          ))}
        </div>
      </div>
   
      {/* --- FEATURED PROPERTIES --- */}
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-lg font-bold text-[#1A1E25]">Featured Properties</h2>
        <span onClick={() => router.push('/house')} className="text-blue-600 text-sm font-bold cursor-pointer">See All</span>
      </div>
      
      <div className="flex overflow-x-auto gap-4 pb-6 -mx-5 px-5 no-scrollbar scroll-smooth">
         <MobilePropertyCard 
           image="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3" 
           price="₹ 85 Lakh" title="3 BHK Luxury Villa" address="Sec 45, Raipur" tag="HOUSE" 
           onClick={() => router.push('/house')}
         />
         <MobilePropertyCard 
           image="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3" 
           price="₹ 45 Lakh" title="2000 Sq.ft Plot" address="Naya Raipur" tag="PLOT" 
           onClick={() => router.push('/plots')}
         />
         <MobilePropertyCard 
           image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3" 
           price="₹ 15k /mo" title="4 BHK Penthouse" address="Civil Lines" tag="RENT" 
           onClick={() => router.push('/rooms')}
         />
      </div>
      
      {/* 🔥 ADDPOPUP REMOVED HERE 🔥 */}

      {/* --- HOURLY STAY (Heading + WhatsApp Cards) --- */}
      <div onClick={() => router.push('/pg')} className="cursor-pointer">
        <div className="flex justify-between items-center mb-4 mt-2">
            <h2 className="text-lg font-bold text-[#1A1E25]">Hourly Stay (6 Hr)</h2>
            <ChevronRight size={20} className="text-gray-400" />
        </div>
      </div>
      
      <div className="space-y-4 mb-10">
        <MobileHourlyStayCard 
           image="https://images.unsplash.com/photo-1522771753035-485053bed83d?ixlib=rb-4.0.3" 
           name="Stanza Living House" price="₹ 799/6 Hrs" type="Non-AC" location="bilaspur" 
        />
        <MobileHourlyStayCard 
           image="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3" 
           name="Zolo Comfort PG" price="₹ 1200/6 Hrs" type="AC Mid-Range" location="Shankar Nagar" 
        />
        <MobileHourlyStayCard 
           image="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop" 
           name="Zolo Premium" price="₹ 2000/6 Hrs" type="Deluxe" location="Shankar Nagar" 
        />
      </div>

    </div>
  );
}

// --- Mobile Helpers ---
function CategoryItem({ icon, label, color, iconColor, onClick }) {
  return (
    <div onClick={onClick} className="flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform">
      <div className={`w-[72px] h-[72px] rounded-3xl flex items-center justify-center shadow-sm border border-gray-100 ${color} ${iconColor}`}>
        {icon}
      </div>
      <span className="text-[13px] font-bold text-gray-800 tracking-wide">{label}</span>
    </div>
  )
}

function MobilePropertyCard({ image, price, title, address, tag, onClick }) {
  return (
    <div onClick={onClick} className="min-w-[75%] bg-white rounded-[1.5rem] border border-gray-100 shadow-sm overflow-hidden pb-3 cursor-pointer">
      <div className="relative h-[160px]">
        <img src={image} className="w-full h-full object-cover" alt={title} />
        <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{tag}</span>
      </div>
      <div className="px-4 pt-3">
        <h4 className="text-xl font-[900] text-blue-700">{price}</h4>
        <p className="text-sm text-gray-800 font-bold truncate mt-0.5">{title}</p>
        <div className="flex items-center gap-1 mt-1 text-gray-500 font-medium">
           <MapPin size={12} className="text-red-500" />
           <span className="text-xs truncate">{address}</span>
        </div>
      </div>
    </div>
  )
}

// --- 🔥 MODIFIED CARD FOR HOURLY STAY (WHATSAPP ONLY) ---
function MobileHourlyStayCard({ image, name, price, type, location }) {
  // WhatsApp Logic -> 9131460470
  const handleWhatsApp = () => {
      const message = `Hello, I want to book ${name} (${type}) for ${price}. Location: ${location}`;
      window.open(`https://wa.me/919131460470?text=${encodeURIComponent(message)}`);
  };

  return (
    <div className="flex gap-4 bg-white p-3 rounded-3xl border border-gray-100 shadow-sm cursor-pointer items-center">
      <img src={image} className="w-20 h-20 rounded-2xl object-cover" alt={name} />
      <div className="flex-1 flex flex-col justify-center">
        <h4 className="font-bold text-[#1A1E25] text-base">{name}</h4>
        <p className="text-xs text-gray-500 font-medium mb-1">{type}</p>
        <p className="text-xs text-gray-400 font-medium mb-1 flex items-center gap-1"><MapPin size={12}/> {location}</p>
        <p className="text-purple-600 font-black text-sm">{price}</p>
      </div>
      {/* WhatsApp Icon Only */}
      <button 
        onClick={handleWhatsApp} 
        className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center self-center shadow-sm active:scale-95 transition-transform border border-[#25D366]/20"
      >
        <MessageCircle size={20} className="text-[#25D366] fill-current" />
      </button>
    </div>
  )
}


// ============================================================================
// 👇 PART 2: DESKTOP VIEW COMPONENT
// ============================================================================
function DesktopView() {
  const router = useRouter(); 
  const tabs = ['house', 'Rent', 'Plots', 'PG'];
  const [activeTab, setActiveTab] = useState('house');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab); 
    if (tab === 'PG') router.push('/pg');
    else if (tab === 'Plots') router.push('/plots');
    else if (tab === 'Rent') router.push('/rooms'); 
    else if (tab === 'house') router.push('/house');
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) projectsSection.scrollIntoView({ behavior: 'smooth' });
  };

  const renderFilters = () => {
    if (activeTab === 'PG') {
      return (
        <>
          <div className="col-span-2 md:col-span-1">
             <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">Occupancy</label>
             <div className="flex gap-2">
              <FilterChip label="Single" icon={<Users size={14}/>} />
              <FilterChip label="Double" icon={<Users size={14}/>} />
              <FilterChip label="Triple+" icon={<Users size={14}/>} />
             </div>
          </div>
          <div className="col-span-2 md:col-span-1">
             <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">Tenant Type</label>
             <div className="flex gap-2">
              <FilterChip label="Boys" />
              <FilterChip label="Girls" />
              <FilterChip label="Family" />
             </div>
          </div>
          <div className="col-span-2 md:col-span-2">
             <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">Facilities</label>
             <div className="flex flex-wrap gap-2">
              <FilterChip label="AC" />
              <FilterChip label="WiFi" />
              <FilterChip label="Food Included" />
             </div>
          </div>
        </>
      );
    } else if (activeTab === 'Plots') {
       return (
        <>
          <div className="col-span-4">
             <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">Plot Area (sq.ft)</label>
             <div className="flex flex-wrap gap-2">
              <FilterChip label="Under 1000" />
              <FilterChip label="1000 - 2000" />
              <FilterChip label="2000 - 5000" />
              <FilterChip label="5000+" />
             </div>
          </div>
        </>
       );
    } else {
      return (
        <>
           <div className="col-span-4 md:col-span-2">
             <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">BHK Type</label>
             <div className="flex flex-wrap gap-2">
               {['1 BHK', '2 BHK', '3 BHK', '4+ BHK'].map((item) => (
                 <FilterChip key={item} label={item} />
               ))}
             </div>
           </div>
           <div className="col-span-4 md:col-span-2">
             <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">Possession Status</label>
             <div className="flex flex-wrap gap-2">
              <FilterChip label="Ready to Move" icon={<CheckCircle size={14}/>} />
              <FilterChip label="Under Construction" />
             </div>
           </div>
        </>
      );
    }
  };

  return (
    <section id="home" className="bg-white min-h-screen font-sans text-slate-900 selection:bg-black selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <div className="relative w-full min-h-[85vh] bg-slate-900 rounded-b-[2.5rem] md:rounded-b-[5rem] overflow-hidden shadow-2xl z-0 -mt-24 pt-32 pb-32 flex items-center">
        
        {/* Background Image */}
        <div className="absolute inset-0 opacity-90">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
            alt="Hero Luxury Villa" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/40"></div>

        <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-4">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight drop-shadow-lg">
              Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">Perfect Space</span> <br />
              In Chhattisgarh.
            </h1>
            <p className="text-gray-200 text-lg max-w-xl mx-auto font-medium opacity-90">
              Buy, Rent, or find a PG. Direct connections, zero hassle.
            </p>
          </motion.div>
        </div>
      </div>

      {/* --- FLOATING SEARCH BAR --- */}
      <div className="relative z-30 -mt-20 md:-mt-28 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* 1. SLIDING TABS (NAVIGATION) */}
          <div className="flex justify-center mb-4 overflow-x-auto py-2 no-scrollbar md:overflow-visible">
            <div className="bg-slate-900 p-1.5 rounded-full inline-flex border border-white/20 relative shadow-xl">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`relative px-5 md:px-6 py-2 rounded-full text-sm font-bold z-10 transition-colors duration-300 whitespace-nowrap ${activeTab === tab ? 'text-slate-900' : 'text-white hover:text-white/80'}`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white rounded-full -z-10 shadow-sm"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* 2. THE SEARCH BOX */}
          <div className="bg-white p-3 md:p-4 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-100 relative">
            <div className="flex flex-col md:grid md:grid-cols-[1.2fr_1fr_1fr_auto] gap-3">
              
              {/* Location Input */}
              <div className="bg-gray-50 hover:bg-gray-100 transition-colors rounded-2xl px-5 py-3 cursor-pointer group flex items-center gap-3 border border-transparent hover:border-gray-200">
                <MapPin size={20} className="text-blue-500 shrink-0" /> 
                <div className="flex-1 min-w-0">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">Location</label>
                    <select className="w-full bg-transparent font-bold text-slate-800 text-base outline-none -ml-1 appearance-none truncate">
                      <option>Raipur, All Areas</option>
                      <option>Bhilai & Durg</option>
                      <option>Naya Raipur</option>
                    </select>
                </div>
              </div>

              {/* Dynamic Input */}
              <div className="bg-gray-50 hover:bg-gray-100 transition-colors rounded-2xl px-5 py-3 cursor-pointer group flex items-center gap-3 border border-transparent hover:border-gray-200">
                {activeTab === 'PG' ? <Users size={20} className="text-blue-500 shrink-0" /> : <Home size={20} className="text-blue-500 shrink-0" />}
                <div className="flex-1 min-w-0">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">
                      {activeTab === 'PG' ? 'Occupancy' : activeTab === 'Plots' ? 'Plot Type' : 'Property Type'}
                    </label>
                    <div className="font-bold text-slate-800 text-base truncate">
                      {activeTab === 'PG' ? 'Double Sharing' : activeTab === 'Plots' ? 'Residential Plot' : 'Apartment'}
                    </div>
                </div>
              </div>

              {/* Budget Input */}
              <div className="bg-gray-50 hover:bg-gray-100 transition-colors rounded-2xl px-5 py-3 cursor-pointer group flex items-center gap-3 border border-transparent hover:border-gray-200">
                <TrendingUp size={20} className="text-blue-500 shrink-0" /> 
                <div className="flex-1 min-w-0">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">Budget</label>
                    <div className="font-bold text-slate-800 text-base truncate">Any Budget</div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 h-[60px] md:h-auto">
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className={`aspect-square h-full flex items-center justify-center rounded-2xl border transition-all ${isFilterOpen ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-black text-gray-600 bg-white'}`}
                >
                  <SlidersHorizontal size={22} />
                </button>
                <button className="flex-1 md:w-32 h-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 transition-transform active:scale-95">
                  <Search size={26} />
                </button>
              </div>
            </div>

            {/* EXPANDABLE FILTERS */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 px-2 pb-2 border-t border-gray-100 mt-4 grid grid-cols-4 gap-6">
                      {renderFilters()}
                  </div>
                  <div className="flex justify-end pb-2 pr-2">
                    <button className="text-xs font-bold text-blue-600 hover:underline" onClick={()=>setIsFilterOpen(false)}>Close Filters</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* --- TRUSTED TEXT --- */}
      <div className="pt-16 pb-12 px-6 text-center">
          <p className="text-gray-500 font-medium flex items-center justify-center gap-2">
            <CheckCircle size={16} className="text-blue-500" /> Trusted by 10,000+ people in Chhattisgarh.
          </p>
      </div>

      {/* --- CARDS SECTION (Editor's Choice) --- */}
      <div className="py-12 px-4 md:px-8 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10">
          <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">Editor's Choice</h2>
              <p className="text-gray-500 font-medium">Handpicked premium properties for you.</p>
          </div>
          
          <button 
            onClick={scrollToProjects}
            className="hidden md:flex items-center gap-2 text-sm font-bold border-b-2 border-black pb-1 hover:text-blue-600 hover:border-blue-600 transition-colors"
          >
            View All Properties <ArrowRight size={16} />
          </button>
        </div>

        <motion.div 
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Cards */}
          <ModernCard 
              id="demo-1"
              image="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=2070&auto=format&fit=crop"
              title="The Glass House"
              location="Civil Lines, Raipur"
              price="₹2.8 Cr"
              rating="4.9"
              tag="Luxury"
          />
          <ModernCard 
              id="demo-2"
              image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
              title="Eco-Green Villa"
              location="Naya Raipur, Sec 24"
              price="₹85 Lakhs"
              rating="4.7"
              tag="Eco Friendly"
          />
          <ModernCard 
              id="demo-3"
              image="https://images.unsplash.com/photo-1593006526979-5f8814c229f9?q=80&w=2070&auto=format&fit=crop"
              title="Student PG (Boys)"
              location="Kota, Raipur"
              price="₹6,000 /mo"
              rating="4.5"
              tag="PG Budget"
              isPG={true}
          />
        </motion.div>
      </div>
    </section>
  );
}

// --- DESKTOP HELPERS ---

function FilterChip({ label, icon }) {
  return (
    <button className="flex items-center gap-1.5 py-2 px-3 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-600 hover:bg-black hover:text-white hover:border-black transition-all focus:bg-black focus:text-white focus:border-black">
      {icon} {label}
    </button>
  )
}

function ModernCard({ id, image, title, location, price, rating, tag, isPG }) {
  const router = useRouter(); 

  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="group relative w-full h-[450px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
      <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
      <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider">
        {tag}
      </div>
      <div className="absolute top-6 right-6 flex items-center gap-1 bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
        <Star size={12} className="text-yellow-500 fill-yellow-500" /> {rating}
      </div>
      <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <div className="text-white">
          <p className="text-3xl font-black mb-1">{price}</p>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="flex items-center gap-2 text-white/70 text-sm font-medium mb-6">
            <MapPin size={16} /> {location}
          </p>

          <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
            {!isPG ? (
              <div className="flex items-center gap-6 border-t border-white/20 pt-4">
                  <div className="flex items-center gap-2"><BedDouble size={20} className="text-blue-300" /> <span className="text-sm font-bold">3 Beds</span></div>
                  <div className="flex items-center gap-2"><Bath size={20} className="text-blue-300" /> <span className="text-sm font-bold">2 Baths</span></div>
                  <div className="flex items-center gap-2"><Square size={20} className="text-blue-300" /> <span className="text-sm font-bold">1400 sqft</span></div>
              </div>
            ) : (
              <div className="flex items-center gap-6 border-t border-white/20 pt-4">
                  <div className="flex items-center gap-2"><Users size={20} className="text-blue-300" /> <span className="text-sm font-bold">Double Sharing</span></div>
                  <div className="flex items-center gap-2"><CheckCircle size={20} className="text-blue-300" /> <span className="text-sm font-bold">WiFi & Food</span></div>
              </div>
            )}
            
            <button 
              onClick={() => router.push(`/project/${id}`)}
              className="mt-6 w-full bg-white text-slate-900 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
            >
              View Details <PlayCircle size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
    
  );
}