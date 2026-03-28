"use client";

export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Heart, MapPin, Eye, MessageCircle, ShoppingBag, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ListingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("/api/properties", {
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache' }
        });
        const data = await res.json();
        // Handle pagination or direct array
        const finalData = Array.isArray(data) ? data : (data.properties || []);
        setProperties(finalData);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const handleLike = async (e, propertyId) => {
    e.stopPropagation();
    if (!session) return alert("Pehle Login karo bhai!");

    try {
      const res = await fetch(`/api/properties/${propertyId}/like`, { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setProperties(prev => prev.map(p => 
          p._id === propertyId ? { ...p, likes: data.likes } : p
        ));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const openWhatsApp = (e, title) => {
    e.stopPropagation();
    const url = `https://wa.me/9131460470?text=Hello CG INFRAX, I am interested in: ${title}`;
    window.open(url, "_blank");
  };

  const handleBuy = async (e, propertyId, propertyTitle) => {
    e.stopPropagation();
    let buyerPhone = session?.user?.mobile || session?.user?.phone;
    
    if (!buyerPhone) {
      const phoneInput = prompt(`📱 ${propertyTitle}\n\nAapka phone number enter karein (10 digits):`);
      if (!phoneInput) return;
      const phoneRegex = /^[6-9]\d{9}$/;
      const cleanPhone = phoneInput.trim().replace(/\D/g, "");
      if (!phoneRegex.test(cleanPhone)) {
        alert("❌ Invalid phone number!");
        return;
      }
      buyerPhone = cleanPhone;
    }

    try {
      const res = await fetch("/api/transactions/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId, buyerPhone }),
      });
      const data = await res.json();
      if (data.success) {
        alert("✅ Success! Inquiry saved. Seller notified.");
      } else {
        alert("❌ Error: " + (data.message || "Kuch galat ho gaya"));
      }
    } catch (error) {
      alert("❌ Server error.");
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-10 py-16 md:py-24 bg-[#FCFCFC]">
      <div className="mb-10 md:mb-16 px-4">
        <h1 className="text-4xl md:text-7xl font-[1000] text-gray-900 tracking-tighter italic uppercase leading-none">
          THE <span className="text-blue-600">COLLECTION</span>
        </h1>
        <p className="text-gray-400 font-bold mt-4 tracking-[0.4em] uppercase text-[10px] md:text-xs">Exclusively Curated • CG INFRAX</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
        {properties.map((item) => {
          if (!item || !item._id) return null; // Build safety check
          const isLiked = item.likes?.includes(session?.user?.email);

          return (
            <div 
              key={item._id} 
              onClick={() => router.push(`/properties/${item.slug || item._id}`)}
              className="group relative flex flex-col cursor-pointer"
            >
              {/* IMAGE SECTION */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] bg-gray-100 shadow-2xl transition-all duration-700 group-hover:shadow-blue-100 group-hover:-translate-y-3">
                <img
                  src={item.images?.[0] || "/no-image.png"} 
                  alt={item.title || "property"}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />

                {/* Glass Price Tag */}
                <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-xl px-5 py-3 rounded-3xl border border-white/30 shadow-2xl">
                   <p className="text-white font-[1000] text-xl md:text-2xl tracking-tighter italic drop-shadow-md">
                     ₹{(item.price || 0).toLocaleString('en-IN')}
                   </p>
                </div>

                {/* Like Button */}
                <button 
                  onClick={(e) => handleLike(e, item._id)}
                  className={`absolute top-6 right-6 z-10 p-3.5 rounded-full backdrop-blur-xl border border-white/30 transition-all duration-300 shadow-xl ${isLiked ? 'bg-red-500 border-red-400' : 'bg-white/10 hover:bg-white hover:text-red-500'}`}
                >
                  <Heart size={20} className={isLiked ? "fill-white text-white" : "text-white group-hover:text-red-500 transition-colors"} />
                </button>

                {/* Category Badge */}
                <div className="absolute bottom-6 left-6">
                   <span className="bg-blue-600 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                     {item.cat || "Verified"}
                   </span>
                </div>
              </div>

              {/* CONTENT SECTION */}
              <div className="mt-6 md:mt-8 px-2 space-y-3 md:space-y-4">
                <div className="flex justify-between items-end">
                  <div className="max-w-[80%]">
                    <h2 className="text-xl md:text-2xl font-[1000] text-gray-900 tracking-tighter uppercase italic truncate leading-none">
                      {item.title}
                    </h2>
                    <p className="flex items-center gap-1 text-gray-400 font-bold text-[10px] md:text-xs mt-2 uppercase tracking-tight">
                      <MapPin size={14} className="text-red-500" /> {item.district || "Chhattisgarh"}
                    </p>
                  </div>
                  <div className="bg-gray-900 p-3 rounded-2xl text-white group-hover:bg-blue-600 transition-colors hidden md:block">
                    <ArrowUpRight size={20} />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                       <Eye size={14} className="text-gray-400" />
                       <span className="text-[10px] font-black text-gray-600">{item.views || 0}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => openWhatsApp(e, item.title)}
                      className="p-3 bg-[#25D366] text-white rounded-2xl hover:scale-110 transition-transform shadow-lg shadow-green-50"
                    >
                      <MessageCircle size={18} fill="currentColor" />
                    </button>
                    <button 
                      onClick={(e) => handleBuy(e, item._id, item.title)}
                      className="px-5 md:px-7 py-3 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg active:scale-95"
                    >
                      BUY
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {properties.length === 0 && (
        <div className="text-center py-40">
          <p className="text-gray-300 font-black text-3xl italic tracking-tighter uppercase opacity-50 underline decoration-blue-500 decoration-4">No Listings Available</p>
        </div>
      )}
    </div>
  );
}