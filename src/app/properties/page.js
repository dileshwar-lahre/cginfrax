"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Heart, MapPin, Eye, MessageCircle, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ListingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("/api/properties");
        const data = await res.json();
        // Handle new pagination response format
        setProperties(data.properties || data);
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
        setProperties(properties.map(p => 
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

  // ✅ BUY BUTTON HANDLER - Transaction create karta hai
  const handleBuy = async (e, propertyId, propertyTitle) => {
    e.stopPropagation();
    
    // ✅ Buyer ka phone number chahiye
    let buyerPhone = session?.user?.mobile || session?.user?.phone;
    
    // Agar session me phone nahi hai, toh prompt karo
    if (!buyerPhone) {
      const phoneInput = prompt(
        `📱 ${propertyTitle}\n\nAapka phone number enter karein (10 digits):`
      );
      
      if (!phoneInput) return; // User ne cancel kiya
      
      // Phone validation
      const phoneRegex = /^[6-9]\d{9}$/;
      const cleanPhone = phoneInput.trim().replace(/\D/g, ""); // Sirf digits
      
      if (!phoneRegex.test(cleanPhone)) {
        alert("❌ Invalid phone number! 10 digits hona chahiye (6-9 se start).");
        return;
      }
      
      buyerPhone = cleanPhone;
    }

    // ✅ Transaction create karo
    try {
      const res = await fetch("/api/transactions/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId,
          buyerPhone,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert(
          "✅ Success! Aapki inquiry save ho gayi hai. Seller ko notification bhej diya gaya hai. Aapka phone: " +
            buyerPhone
        );
      } else {
        alert("❌ Error: " + (data.message || "Kuch galat ho gaya"));
      }
    } catch (error) {
      console.error("Buy error:", error);
      alert("❌ Server error. Please try again.");
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-10 py-16 md:py-24 bg-[#FAFAFA]">
      <div className="mb-8 md:mb-12 px-2">
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter">PREMIUM PROPERTIES</h1>
        <p className="text-gray-400 font-bold mt-2 tracking-widest uppercase text-[10px] md:text-xs">Explore Chhattisgarh's Finest Real Estate</p>
      </div>
      
      {/* Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {properties.map((item) => {
          const isLiked = item.likes?.includes(session?.user?.email);

          return (
            <div 
              key={item._id} 
              onClick={() => router.push(`/properties/${item._id}`)}
              className="group bg-white rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-gray-100 relative"
            >
              
              {/* IMAGE SECTION */}
              <div className="relative h-60 md:h-72 w-full overflow-hidden">
                <img
                  src={item.images[0] || "/no-image.png"} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-black/60 backdrop-blur-md text-white text-[9px] md:text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em]">
                  {item.cat}
                </div>
                
                <button 
                  onClick={(e) => handleLike(e, item._id)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-2.5 md:p-3 bg-white/90 backdrop-blur-md rounded-full shadow-xl active:scale-90"
                >
                  <Heart size={18} className={isLiked ? "fill-red-500 text-red-500" : "text-gray-300"} />
                </button>
              </div>

              {/* CONTENT SECTION */}
              <div className="p-5 md:p-8 space-y-4 md:space-y-6">
                
                {/* Title & Stats (Horizontal Row) */}
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg md:text-2xl font-black text-gray-900 truncate tracking-tight">{item.title}</h2>
                    <p className="text-gray-400 font-bold text-[11px] md:text-sm flex items-center gap-1 mt-0.5">
                      <MapPin size={14} className="text-blue-500 shrink-0" /> {item.district}
                    </p>
                  </div>

                  {/* Views & Likes ek ke baad ek (Horizontal) */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
                       <Eye size={12} className="text-gray-400" />
                       <span className="text-[10px] font-black text-gray-600">{item.views || 0}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-red-50/50 px-2 py-1 rounded-full border border-red-100">
                       <Heart size={11} className="text-red-500 fill-red-500" />
                       <span className="text-[10px] font-black text-red-600">{item.likes?.length || 0}</span>
                    </div>
                  </div>
                </div>

                {/* Price & Action Row */}
                <div className="flex justify-between items-center pt-4 md:pt-6 border-t border-gray-100">
                  <div>
                    <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Price</p>
                    <p className="text-blue-600 font-black text-lg md:text-2xl tracking-tighter">₹{item.price.toLocaleString('en-IN')}</p>
                  </div>

                  <div className="flex gap-2 md:gap-3">
                    <button 
                      onClick={(e) => openWhatsApp(e, item.title)}
                      className="bg-[#25D366] text-white p-3 md:p-4 rounded-xl md:rounded-2xl hover:bg-[#128C7E] transition-all shadow-md active:scale-90"
                    >
                      <MessageCircle size={20} fill="currentColor" />
                    </button>
                    <button 
                      onClick={(e) => handleBuy(e, item._id, item.title)}
                      className="bg-gray-900 text-white px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-blue-600 transition-all active:scale-90"
                    >
                      <ShoppingBag size={16} /> Buy
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
          <p className="text-gray-300 font-black text-3xl md:text-4xl italic tracking-tighter uppercase opacity-50">No Listings Yet</p>
        </div>
      )}
    </div>
  );
}