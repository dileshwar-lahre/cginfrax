"use client";
import { useEffect, useState, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Heart, MapPin, Eye, MessageCircle, ShoppingBag, ArrowUpRight } from "lucide-react";

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

  // Helper function to organize properties by city
  const organizeByCity = (props) => {
    const bilaspur = [];
    const raipur = [];
    const others = [];
    
    props.forEach(prop => {
      const city = prop.district?.toLowerCase() || "";
      if (city.includes("bilaspur")) {
        bilaspur.push(prop);
      } else if (city.includes("raipur")) {
        raipur.push(prop);
      } else {
        others.push(prop);
      }
    });
    
    return {
      bilaspur: bilaspur.slice(0, 10), // Top 10
      raipur: raipur.slice(0, 10), // Top 10
      others: others
    };
  };

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        // Build query params with all filters
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        if (district) params.set("district", district);
        const minPrice = searchParams.get("minPrice");
        const maxPrice = searchParams.get("maxPrice");
        const kitchen = searchParams.get("kitchen");
        const plotType = searchParams.get("plotType");
        if (category && category !== "All") params.set("category", category);
        if (minPrice) params.set("minPrice", minPrice);
        if (maxPrice) params.set("maxPrice", maxPrice);
        if (kitchen) params.set("kitchen", kitchen);
        if (plotType) params.set("plotType", plotType);
        
        const res = await fetch(`/api/properties?${params.toString()}`);
        if (!res.ok) throw new Error("API Response failed");
        const data = await res.json();
        const allProps = data.properties || data;
        setProperties(allProps);
        
        // Organize by city if category is selected
        if (category && category !== "All") {
          setCityWiseData(organizeByCity(allProps));
        } else {
          setCityWiseData({ bilaspur: [], raipur: [], others: allProps });
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
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
        setProperties(properties.map(p => 
          p._id === propertyId ? { ...p, likes: data.likes } : p
        ));
      }
    } catch (err) { console.log(err); }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  // Render property card component
  const PropertyCard = ({ item }) => {
    const isLiked = item.likes?.includes(session?.user?.email);
    
    return (
      <div 
        onClick={() => router.push(`/properties/${item._id}`)} 
        className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 border border-gray-100 relative cursor-pointer"
      >
        {/* IMAGE SECTION */}
        <div className="relative h-64 w-full overflow-hidden">
          <img 
            src={item.images[0] || "/no-image.png"} 
            alt={item.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
          />
          <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-2xl shadow-sm">
            <p className="text-[10px] font-black text-gray-800 uppercase tracking-widest">{item.cat || 'Market'}</p>
          </div>
          <button 
            onClick={(e) => handleLike(e, item._id)}
            className="absolute top-5 right-5 p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg active:scale-90 transition-transform"
          >
            <Heart size={18} className={isLiked ? "fill-red-500 text-red-500" : "text-gray-300"} />
          </button>
        </div>

        {/* CONTENT SECTION */}
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-4">
             <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-[900] text-gray-900 truncate tracking-tight group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h2>
                <p className="text-gray-400 font-bold text-[11px] flex items-center gap-1 mt-1 uppercase tracking-wider">
                  <MapPin size={12} className="text-red-500" /> {item.district}
                </p>
             </div>
             <div className="bg-gray-50 p-2 rounded-xl text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <ArrowUpRight size={20} />
             </div>
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-gray-50">
            <div>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Asking Price</p>
              <p className="text-blue-600 font-[1000] text-xl md:text-2xl tracking-tighter">
                ₹{item.price.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                 <span className="flex items-center gap-1 text-[10px] font-black text-gray-400"><Eye size={12}/> {item.views || 0}</span>
                 <span className="flex items-center gap-1 text-[10px] font-black text-gray-400"><Heart size={11}/> {item.likes?.length || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render city-wise blocks
  const renderCityWiseBlocks = () => {
    if (!category || category === "All") {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {properties.map((item) => (
            <PropertyCard key={item._id} item={item} />
          ))}
        </div>
      );
    }

    const categoryName = category === "Room" ? "Rooms" : category === "PG" ? "PG" : category === "House" ? "Houses" : "Plots";

    return (
      <div className="space-y-12">
        {/* Bilaspur Block */}
        {cityWiseData.bilaspur.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 px-2">
              {categoryName} in Bilaspur
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {cityWiseData.bilaspur.map((item) => (
                <PropertyCard key={item._id} item={item} />
              ))}
            </div>
          </div>
        )}

        {/* Raipur Block */}
        {cityWiseData.raipur.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 px-2">
              {categoryName} in Raipur
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {cityWiseData.raipur.map((item) => (
                <PropertyCard key={item._id} item={item} />
              ))}
            </div>
          </div>
        )}

        {/* Other Cities Block */}
        {cityWiseData.others.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 px-2">
              Other Cities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {cityWiseData.others.map((item) => (
                <PropertyCard key={item._id} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-10 py-16 bg-[#FAFAFA]">
        <div className="mb-10 px-2 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
             <p className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] mb-2">Chhattisgarh Real Estate</p>
             <h1 className="text-3xl md:text-5xl font-[1000] text-gray-900 tracking-tighter uppercase leading-none">
               {search || district ? `${district || search}` : category !== "All" ? `${category}s` : "PREMIUM PROPERTIES"}
             </h1>
          </div>
        <div className="text-gray-400 font-bold text-xs uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
          {properties.length} {properties.length === 1 ? 'Listing' : 'Listings'} Found
        </div>
      </div>
      
      {renderCityWiseBlocks()}
      
      {properties.length === 0 && (
        <div className="text-center py-40 border-2 border-dashed border-gray-100 rounded-[3rem]">
          <p className="text-gray-300 font-black text-2xl uppercase tracking-tighter">No Properties Match Your Search</p>
          <button onClick={() => router.push('/properties')} className="mt-4 text-blue-600 font-bold underline italic">Clear All Filters</button>
        </div>
      )}
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center font-black text-gray-200">LOADING...</div>}>
      <PropertiesContent />
    </Suspense>
  );
}
