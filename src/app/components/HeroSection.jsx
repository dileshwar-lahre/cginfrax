'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
// Animation Library
import { motion, AnimatePresence } from 'framer-motion'; 

// Icons
import { 
  MapPin, Home, TrendingUp, SlidersHorizontal, 
  ArrowRight, BedDouble, Bath, Square, PlayCircle, Star, Users, CheckCircle,
  Map as MapIcon, Phone, ChevronRight, Search, MessageCircle
} from 'lucide-react';

// --- 🔥 BANNERS DATA ---
const MOBILE_BANNERS = [
  { id: '1', title: 'Home Construction', subtitle: 'Build your dream home with experts.', btnText: 'Start Building', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop', btnColor: 'bg-orange-600', route: '/construction' },
  { id: '2', title: 'Premium Interiors', subtitle: 'Luxury designs for Living & Kitchen.', btnText: 'Explore Designs', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop', btnColor: 'bg-teal-600', route: '/interior' },
  { id: '3', title: 'Exterior & Garden', subtitle: 'Elevation, Paint & Landscaping.', btnText: 'Get Quote', image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=2080&auto=format&fit=crop', btnColor: 'bg-green-600', route: '/exterior' }
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
// 👇 PART 1: MOBILE VIEW COMPONENT (NO CHANGE)
// ============================================================================
function MobileView() {
  const router = useRouter();
  const scrollRef = useRef(null); 
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const nextIndex = (currentBannerIndex + 1) % MOBILE_BANNERS.length;
        const width = scrollRef.current.offsetWidth;
        scrollRef.current.scrollTo({ left: nextIndex * width, behavior: 'smooth' });
        setCurrentBannerIndex(nextIndex);
      }
    }, 30000); 

    return () => clearInterval(interval);
  }, [currentBannerIndex]);

  const handleScroll = () => {
    if (scrollRef.current) {
        const index = Math.round(scrollRef.current.scrollLeft / scrollRef.current.offsetWidth);
        setCurrentBannerIndex(index);
    }
  };

  return (
    <div className="px-5 pt-4 font-sans text-slate-900">
      
      <div className="flex justify-between items-center mb-8 px-1 mt-4">
        <CategoryItem icon={<Home size={26}/>} label="House" color="bg-blue-50" iconColor="text-blue-600" onClick={() => router.push('/house')} />
        <CategoryItem icon={<BedDouble size={26}/>} label="Room" color="bg-orange-50" iconColor="text-orange-600" onClick={() => router.push('/rooms')} />
        <CategoryItem icon={<Users size={26}/>} label="PG" color="bg-purple-50" iconColor="text-purple-600" onClick={() => router.push('/pg')} />
        <CategoryItem icon={<MapIcon size={26}/>} label="Plot" color="bg-green-50" iconColor="text-green-600" onClick={() => router.push('/plots')} />
      </div>

      <div className="relative w-full mb-8">
        <div ref={scrollRef} onScroll={handleScroll} className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar rounded-3xl shadow-lg shadow-gray-200">
           {MOBILE_BANNERS.map((banner) => (
             <div key={banner.id} onClick={() => router.push(banner.route)} className="min-w-full relative h-[180px] snap-center cursor-pointer">
                <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 p-6 flex flex-col justify-center items-start">
                    <h3 className="text-white text-2xl font-black tracking-tight leading-tight mb-1 shadow-sm">{banner.title}</h3>
                    <p className="text-gray-200 text-xs font-medium mb-4 max-w-[200px] leading-relaxed">{banner.subtitle}</p>
                    <span className={`${banner.btnColor} text-white text-[11px] font-bold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-1 active:scale-95 transition-transform`}>
                      {banner.btnText} <ArrowRight size={12} />
                    </span>
                </div>
             </div>
           ))}
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {MOBILE_BANNERS.map((_, idx) => (
            <div key={idx} className={`h-1.5 rounded-full transition-all duration-500 ${currentBannerIndex === idx ? 'w-6 bg-slate-800' : 'w-2 bg-gray-300'}`} />
          ))}
        </div>
      </div>
   
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-lg font-bold text-[#1A1E25]">Featured Properties</h2>
        <span onClick={() => router.push('/house')} className="text-blue-600 text-sm font-bold cursor-pointer">See All</span>
      </div>
      
      <div className="flex overflow-x-auto gap-4 pb-6 -mx-5 px-5 no-scrollbar scroll-smooth">
         <MobilePropertyCard image="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3" price="₹ 85 Lakh" title="3 BHK Luxury Villa" address="Sec 45, Raipur" tag="HOUSE" onClick={() => router.push('/house')}/>
         <MobilePropertyCard image="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3" price="₹ 45 Lakh" title="2000 Sq.ft Plot" address="Naya Raipur" tag="PLOT" onClick={() => router.push('/plots')}/>
         <MobilePropertyCard image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3" price="₹ 15k /mo" title="4 BHK Penthouse" address="Civil Lines" tag="RENT" onClick={() => router.push('/rooms')}/>
      </div>
      
      <div onClick={() => router.push('/pg')} className="cursor-pointer">
        <div className="flex justify-between items-center mb-4 mt-2">
            <h2 className="text-lg font-bold text-[#1A1E25]">Hourly Stay (6 Hr)</h2>
            <ChevronRight size={20} className="text-gray-400" />
        </div>
      </div>
      
      <div className="space-y-4 mb-10">
        <MobileHourlyStayCard image="https://images.unsplash.com/photo-1522771753035-485053bed83d?ixlib=rb-4.0.3" name="Stanza Living House" price="₹ 799/6 Hrs" type="Non-AC" location="bilaspur" />
        <MobileHourlyStayCard image="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3" name="Zolo Comfort PG" price="₹ 1200/6 Hrs" type="AC Mid-Range" location="Shankar Nagar" />
        <MobileHourlyStayCard image="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop" name="Zolo Premium" price="₹ 2000/6 Hrs" type="Deluxe" location="Shankar Nagar" />
      </div>
    </div>
  );
}

// --- Mobile Helpers ---
function CategoryItem({ icon, label, color, iconColor, onClick }) {
  return (
    <div onClick={onClick} className="flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform group">
      <div className={`w-[72px] h-[72px] md:w-20 md:h-20 rounded-3xl flex items-center justify-center shadow-sm border border-gray-100 ${color} ${iconColor} group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <span className="text-[13px] md:text-sm font-bold text-gray-800 tracking-wide">{label}</span>
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

function MobileHourlyStayCard({ image, name, price, type, location }) {
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
// 👇 PART 2: DESKTOP VIEW (FIXED & ALIGNED WITH MOBILE)
// ============================================================================
function DesktopView() {
  const router = useRouter(); 
  
  // ✅ FIX: Renamed tabs to match Mobile (House, Room, PG, Plot)
  const tabs = ['House', 'Room', 'PG', 'Plot'];
  const [activeTab, setActiveTab] = useState('House');
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
    
    // ✅ FIX: Directly redirecting to pages on click (same as mobile)
    if (tab === 'PG') router.push('/pg');
    else if (tab === 'Plot') router.push('/plots');
    else if (tab === 'Room') router.push('/rooms'); 
    else if (tab === 'House') router.push('/house');
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) projectsSection.scrollIntoView({ behavior: 'smooth' });
  };

  const renderFilters = () => {
    // Filters logic kept for visual consistency, even though tabs redirect
    if (activeTab === 'PG') {
      return (
        <>
          <div className="col-span-1">
             <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Occupancy</label>
             <div className="flex gap-2">
              <FilterChip label="Single" icon={<Users size={14}/>} />
              <FilterChip label="Double" icon={<Users size={14}/>} />
             </div>
          </div>
          <div className="col-span-1">
             <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Tenant Type</label>
             <div className="flex gap-2">
              <FilterChip label="Boys" />
              <FilterChip label="Girls" />
             </div>
          </div>
          <div className="col-span-2">
             <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Facilities</label>
             <div className="flex flex-wrap gap-2">
              <FilterChip label="AC" />
              <FilterChip label="WiFi" />
              <FilterChip label="Food" />
             </div>
          </div>
        </>
      );
    } else {
      return (
        <>
           <div className="col-span-2">
             <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">BHK Type</label>
             <div className="flex flex-wrap gap-2">
               {['1 BHK', '2 BHK', '3 BHK', '4+ BHK'].map((item) => (
                 <FilterChip key={item} label={item} />
               ))}
             </div>
           </div>
           <div className="col-span-2">
             <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Status</label>
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
    <section id="home" className="bg-white min-h-screen font-sans text-slate-900 selection:bg-black selection:text-white pb-20">
      
      {/* --- HERO SECTION --- */}
      <div className="relative w-full h-[90vh] bg-slate-900 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-70">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
            alt="Hero Luxury Villa" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto -mt-20">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-2xl">
              Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Space</span> <br />
              In Chhattisgarh.
            </h1>
            <p className="text-blue-100 text-xl md:text-2xl max-w-2xl mx-auto font-medium opacity-90 leading-relaxed">
              Buy, Rent, or find a PG. Direct connections, zero hassle.
            </p>
          </motion.div>
        </div>
      </div>

      {/* --- FLOATING SEARCH BAR --- */}
      <div className="relative z-30 -mt-24 px-4 w-full flex justify-center flex-col items-center gap-8">
        
        {/* 1. SEARCH BOX CONTAINER */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="w-full max-w-5xl bg-white p-4 rounded-[2.5rem] shadow-2xl border border-gray-100"
        >
          {/* Navigation Tabs (Redirects on Click) */}
          <div className="flex justify-center mb-6">
            <div className="bg-slate-100 p-1.5 rounded-full inline-flex border border-slate-200">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`relative px-8 py-3 rounded-full text-sm font-bold z-10 transition-all duration-300 ${activeTab === tab ? 'text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  {activeTab === tab && (
                    <motion.div layoutId="activeTab" className="absolute inset-0 bg-white rounded-full -z-10" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                  )}
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Search Inputs Grid */}
          <div className="grid grid-cols-[1.5fr_1.5fr_1.5fr_auto] gap-4 items-center">
             
             {/* Location */}
             <div className="bg-gray-50 px-6 py-4 rounded-3xl border border-transparent hover:border-gray-200 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                   <MapPin className="text-blue-600" />
                   <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Location</label>
                      <select className="bg-transparent font-bold text-slate-900 text-lg outline-none appearance-none w-full cursor-pointer">
                        <option>Raipur, All Areas</option>
                        <option>Bhilai & Durg</option>
                      </select>
                   </div>
                </div>
             </div>

             {/* Type */}
             <div className="bg-gray-50 px-6 py-4 rounded-3xl border border-transparent hover:border-gray-200 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                   {activeTab === 'PG' ? <Users className="text-blue-600" /> : <Home className="text-blue-600" />}
                   <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Type</label>
                      <div className="font-bold text-slate-900 text-lg">{activeTab === 'PG' ? 'Double Sharing' : 'Apartment'}</div>
                   </div>
                </div>
             </div>

             {/* Budget */}
             <div className="bg-gray-50 px-6 py-4 rounded-3xl border border-transparent hover:border-gray-200 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                   <TrendingUp className="text-blue-600" />
                   <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Budget</label>
                      <div className="font-bold text-slate-900 text-lg">Any Range</div>
                   </div>
                </div>
             </div>

             {/* Actions */}
             <div className="flex gap-2 h-full">
                <button onClick={() => setIsFilterOpen(!isFilterOpen)} className={`w-16 h-full rounded-3xl border flex items-center justify-center transition-all ${isFilterOpen ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-gray-200 hover:border-slate-900'}`}>
                   <SlidersHorizontal size={24} />
                </button>
                <button className="w-24 h-full bg-blue-600 hover:bg-blue-700 text-white rounded-3xl flex items-center justify-center shadow-lg shadow-blue-500/30 transition-transform active:scale-95">
                   <Search size={28} />
                </button>
             </div>
          </div>

          {/* Filters Drawer */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="pt-8 px-4 pb-4 border-t border-gray-100 mt-6 grid grid-cols-4 gap-8">
                    {renderFilters()}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* --- CARDS SECTION --- */}
      <div className="py-20 px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
              <h2 className="text-4xl font-black text-slate-900 mb-2">Editor's Choice</h2>
              <p className="text-gray-500 font-medium text-lg">Handpicked premium properties for you.</p>
          </div>
          <button onClick={scrollToProjects} className="flex items-center gap-2 text-base font-bold border-b-2 border-slate-900 pb-1 hover:text-blue-600 hover:border-blue-600 transition-all">
            View All Properties <ArrowRight size={18} />
          </button>
        </div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ModernCard id="1" image="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=2070&auto=format&fit=crop" title="The Glass House" location="Civil Lines, Raipur" price="₹2.8 Cr" rating="4.9" tag="Luxury" />
          <ModernCard id="2" image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" title="Eco-Green Villa" location="Naya Raipur" price="₹85 Lakhs" rating="4.7" tag="Eco Friendly" />
          <ModernCard id="3" image="https://images.unsplash.com/photo-1593006526979-5f8814c229f9?q=80&w=2070&auto=format&fit=crop" title="Student PG (Boys)" location="Kota, Raipur" price="₹6,000 /mo" rating="4.5" tag="Budget PG" isPG={true} />
        </motion.div>
      </div>
    </section>
  );
}

// --- DESKTOP HELPERS ---

function FilterChip({ label, icon }) {
  return (
    <button className="flex items-center gap-2 py-2.5 px-4 rounded-xl border border-gray-200 bg-white text-sm font-bold text-gray-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all">
      {icon} {label}
    </button>
  )
}

function ModernCard({ id, image, title, location, price, rating, tag, isPG }) {
  const router = useRouter(); 
  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="group relative w-full h-[500px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500">
      <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
      
      <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider">
        {tag}
      </div>
      
      <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <div className="text-white">
          <p className="text-3xl font-black mb-1">{price}</p>
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="flex items-center gap-2 text-white/80 text-sm font-medium mb-6">
            <MapPin size={18} /> {location}
          </p>

          <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
             <button onClick={() => router.push(`/project/${id}`)} className="mt-4 w-full bg-white text-slate-900 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors shadow-lg">
               View Details <PlayCircle size={20} />
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}