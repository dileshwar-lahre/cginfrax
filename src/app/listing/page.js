"use client";
import { useEffect, useState, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Heart, MapPin, Eye, ArrowRight } from "lucide-react";

function PropertiesContent() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cityWiseData, setCityWiseData] = useState({ bilaspur: [], raipur: [], others: [] });

  const search = searchParams.get("search") || "";
  const district = searchParams.get("district") || "";
  const category = searchParams.get("category") || "All";

  // Data Organizer
  const organizeByCity = (props) => {
    const bilaspur = [];
    const raipur = [];
    const others = [];
    props.forEach(prop => {
      const city = prop.district?.toLowerCase() || "";
      if (city.includes("bilaspur")) bilaspur.push(prop);
      else if (city.includes("raipur")) raipur.push(prop);
      else others.push(prop);
    });
    return { bilaspur: bilaspur.slice(0, 10), raipur: raipur.slice(0, 10), others: others };
  };

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        if (district) params.set("district", district);
        if (category && category !== "All") params.set("category", category);
        
        const res = await fetch(`/api/properties?${params.toString()}`);
        if (!res.ok) throw new Error("API Response failed");
        const data = await res.json();
        const allProps = data.properties || data;
        setProperties(allProps);
        
        if (category && category !== "All") setCityWiseData(organizeByCity(allProps));
        else setCityWiseData({ bilaspur: [], raipur: [], others: allProps });
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchProperties();
  }, [search, district, category, searchParams]);

  const handleLike = async (e, propertyId) => {
    e.stopPropagation();
    if (!session) return alert("Pehle Login karo bhai!");
    try {
      const res = await fetch(`/api/properties/${propertyId}/like`, { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setProperties(properties.map(p => p._id === propertyId ? { ...p, likes: data.likes } : p));
      }
    } catch (err) { console.log(err); }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#FAFAFA]">
      <div className="w-16 h-16 border-[6px] border-black border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  // 🔥 CLEAN & VISUAL CARD (No Bed/Bath)
  const PropertyCard = ({ item }) => {
    const isLiked = item.likes?.includes(session?.user?.email);
    
    return (
      <div 
        onClick={() => router.push(`/properties/${item._id}`)} 
        className="group relative bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200 hover:-translate-y-2"
      >
        {/* IMAGE SECTION */}
        <div className="relative h-72 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-80"></div>
          
          <img 
            src={item.images[0] || "/no-image.png"} 
            alt={item.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
          />
          
          {/* Top Floating Badges */}
          <div className="absolute top-5 left-5 z-20">
            <span className="bg-white/30 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
              {item.cat || 'Featured'}
            </span>
          </div>

          <button 
            onClick={(e) => handleLike(e, item._id)}
            className="absolute top-5 right-5 z-20 p-3 bg-white/20 backdrop-blur-md border border-white/20 rounded-full hover:bg-white transition-all active:scale-90"
          >
            <Heart size={20} className={isLiked ? "fill-red-500 text-red-500" : "text-white"} />
          </button>

          {/* Price - Bottom Left on Image */}
          <div className="absolute bottom-6 left-6 z-20">
             <p className="text-gray-300 text-[10px] font-bold uppercase tracking-widest mb-1">Asking Price</p>
             <p className="text-white text-3xl font-[1000] tracking-tight drop-shadow-lg">
               ₹{item.price.toLocaleString('en-IN')}
             </p>
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div className="p-7">
          {/* Title */}
          <h2 className="text-2xl font-[900] text-gray-900 leading-none mb-3 truncate group-hover:text-blue-600 transition-colors">
            {item.title}
          </h2>

          {/* Location */}
          <div className="flex items-start gap-2 mb-6">
            <MapPin size={18} className="text-red-500 shrink-0 mt-0.5" /> 
            <div>
              <p className="text-gray-700 font-bold text-sm leading-tight">{item.address}</p>
              <p className="text-gray-400 font-semibold text-xs uppercase tracking-wide">{item.district}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-50 w-full mb-5"></div>

          {/* 🔥 NEW FOOTER: Views, Likes & Arrow */}
          <div className="flex justify-between items-center">
            
            {/* Likes & Views - Stylish Pills */}
            <div className="flex gap-3">
               <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                  <Eye size={14} className="text-gray-400" />
                  <span className="text-xs font-black text-gray-600 uppercase tracking-wide">{item.views || 0} Views</span>
               </div>
               <div className="flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-full border border-pink-100">
                  <Heart size={14} className="text-pink-500" fill="currentColor" />
                  <span className="text-xs font-black text-pink-600 uppercase tracking-wide">{item.likes?.length || 0} Likes</span>
               </div>
            </div>

            {/* Action Button */}
            <button className="bg-black text-white p-4 rounded-full shadow-lg group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
               <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const SectionHeader = ({ title }) => (
    <div className="flex items-end gap-4 mb-8 px-2">
       <h2 className="text-3xl md:text-4xl font-[900] text-gray-900 tracking-tighter uppercase">{title}</h2>
       <div className="h-[2px] flex-1 bg-gray-100 mb-2 rounded-full"></div>
    </div>
  );

  const renderContent = () => {
    if (!category || category === "All") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map(p => <PropertyCard key={p._id} item={p} />)}
        </div>
      );
    }
    const catName = category === "Room" ? "Rooms" : category === "PG" ? "PGs" : category === "House" ? "Houses" : "Plots";
    
    return (
      <div className="space-y-16">
        {cityWiseData.bilaspur.length > 0 && (
          <div><SectionHeader title={`${catName} in Bilaspur`} /><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{cityWiseData.bilaspur.map(p => <PropertyCard key={p._id} item={p} />)}</div></div>
        )}
        {cityWiseData.raipur.length > 0 && (
          <div><SectionHeader title={`${catName} in Raipur`} /><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{cityWiseData.raipur.map(p => <PropertyCard key={p._id} item={p} />)}</div></div>
        )}
        {cityWiseData.others.length > 0 && (
          <div><SectionHeader title="Other Locations" /><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{cityWiseData.others.map(p => <PropertyCard key={p._id} item={p} />)}</div></div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <div className="pt-16 pb-10 bg-white border-b border-gray-50 px-6 shadow-sm">
         <div className="max-w-7xl mx-auto">
            <span className="text-blue-600 font-black text-xs tracking-[0.3em] uppercase mb-2 block">Premium Listings</span>
            <h1 className="text-5xl md:text-7xl font-[1000] text-gray-900 tracking-tighter uppercase leading-none">
               {search || (category !== "All" ? category : "Find Your Home")}
            </h1>
         </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 md:p-12">
        {renderContent()}
        {properties.length === 0 && (
           <div className="text-center py-32 opacity-40"><p className="text-3xl font-black text-gray-300">NO PROPERTIES FOUND</p></div>
        )}
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PropertiesContent />
    </Suspense>
  );
}