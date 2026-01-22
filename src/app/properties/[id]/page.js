"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  MapPin, Bed, Bath, Move, Phone, ArrowLeft, Share2, 
  Heart, Eye, Pencil, Trash2, MessageCircle 
} from "lucide-react"; // MessageCircle add kiya WhatsApp ke liye

export default function PropertyDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [property, setProperty] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`/api/properties/${id}`)
        .then((res) => res.json())
        .then((data) => setProperty(data));
    }
  }, [id]);

  // --- DELETE FUNCTION ---
  const handleDelete = async () => {
    if (!confirm("Bhai, sach mein delete karna hai?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Property Delete Ho Gayi! ✅");
        router.push("/properties");
      } else {
        const data = await res.json();
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const handleLike = async () => {
    if (!session) return alert("Pehle Login karo bhai!");
    try {
      const res = await fetch(`/api/properties/${id}/like`, { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setProperty({ ...property, likes: data.likes });
      }
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({ title: property.title, url: window.location.href });
    } catch (err) {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    }
  };

  // 🔥 WHATSAPP FUNCTION
  const handleWhatsApp = () => {
    const phone = property.phoneNumber || '9131460470'; // Owner ka number
    const message = `Hi, I saw your property "${property.title}" on the app. Is it still available?`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (!property) return <div className="h-screen flex items-center justify-center font-black text-xl">LOADING...</div>;

  const isLiked = property.likes?.includes(session?.user?.email);
  const isOwner = session?.user?.email === property.userEmail;

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-36 relative"> {/* pb-36 kiya taaki bottom buttons content na chupaye */}
      
      {/* Top Navigation */}
      <div className="flex justify-between items-center p-6 sticky top-0 z-40 bg-[#FDFDFD]/80 backdrop-blur-md">
        <button onClick={() => router.back()} className="p-3 bg-white shadow-lg shadow-gray-200/50 rounded-full border border-gray-100 hover:scale-105 transition-transform">
          <ArrowLeft size={22} className="text-gray-900" />
        </button>
        
        <div className="flex gap-3">
          {isOwner && (
            <>
              <button 
                onClick={() => router.push(`/properties/edit/${id}`)}
                className="p-3 bg-blue-50 text-blue-600 shadow-md rounded-full border border-blue-100"
              >
                <Pencil size={22} />
              </button>
              <button 
                onClick={handleDelete}
                disabled={deleting}
                className="p-3 bg-red-50 text-red-600 shadow-md rounded-full border border-red-100"
              >
                <Trash2 size={22} />
              </button>
            </>
          )}

          <button onClick={handleShare} className="p-3 bg-white shadow-lg shadow-gray-200/50 rounded-full border border-gray-100 active:scale-95 transition-transform">
            <Share2 size={22} className="text-blue-600" />
          </button>
          <button onClick={handleLike} className="p-3 bg-white shadow-lg shadow-gray-200/50 rounded-full border border-gray-100 active:scale-95 transition-transform">
            <Heart size={22} className={isLiked ? "fill-red-500 text-red-500" : "text-gray-400"} />
          </button>
        </div>
      </div>

      {/* 🖼️ IMAGES SLIDER */}
      <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 px-6 no-scrollbar pb-4">
        {property.images?.map((img, index) => (
          <div key={index} className="flex-shrink-0 w-[85vw] md:w-[800px] aspect-[4/3] md:aspect-video snap-center">
            <img src={img} className="w-full h-full object-cover rounded-[2.5rem] shadow-2xl shadow-gray-200 border-4 border-white" alt="property" />
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-8 mt-6 space-y-8">
        
        {/* 🔥 STATS & PRICE ROW */}
        <div className="flex flex-wrap justify-between items-end gap-4">
           {/* Views & Likes - Stylish Badge */}
          <div className="flex gap-3">
            <div className="flex items-center gap-2 bg-gray-900 px-4 py-2 rounded-2xl text-white font-bold text-xs shadow-lg shadow-gray-200">
              <Eye size={14} className="text-gray-400" /> {property.views || 0} Views
            </div>
            <div className="flex items-center gap-2 bg-rose-50 px-4 py-2 rounded-2xl text-rose-600 font-bold text-xs border border-rose-100 shadow-sm">
              <Heart size={14} fill="currentColor" /> {property.likes?.length || 0} Likes
            </div>
          </div>

          {/* Price Tag */}
          <div className="bg-blue-600 px-6 py-3 rounded-3xl text-white shadow-xl shadow-blue-200/50">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-[-2px]">Asking Price</p>
            <p className="text-2xl font-[1000]">₹{property.price?.toLocaleString('en-IN')}</p>
          </div>
        </div>

        {/* Title & Address */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">{property.title}</h1>
          <p className="flex items-center gap-2 text-gray-500 font-bold text-base md:text-lg">
            <MapPin size={20} className="text-red-500 shrink-0"/> {property.address}, {property.district}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          <div className="bg-gray-50 p-4 md:p-6 rounded-[2rem] border border-gray-100 flex flex-col items-center hover:bg-white hover:shadow-lg transition-all">
            <Bed className="text-gray-900 mb-2 w-6 h-6" />
            <span className="font-black text-gray-700 text-sm md:text-base">{property.details?.beds || 0} BHK</span>
          </div>
          <div className="bg-gray-50 p-4 md:p-6 rounded-[2rem] border border-gray-100 flex flex-col items-center hover:bg-white hover:shadow-lg transition-all">
            <Bath className="text-gray-900 mb-2 w-6 h-6" />
            <span className="font-black text-gray-700 text-sm md:text-base">{property.details?.baths || 0} Baths</span>
          </div>
          <div className="bg-gray-50 p-4 md:p-6 rounded-[2rem] border border-gray-100 flex flex-col items-center hover:bg-white hover:shadow-lg transition-all">
            <Move className="text-gray-900 mb-2 w-6 h-6" />
            <span className="font-black text-gray-700 text-sm md:text-base">{property.details?.area || 0} Sqft</span>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Description</h3>
          <p className="text-gray-600 font-medium text-lg leading-relaxed bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
            {property.desc}
          </p>
        </div>
      </div>

      {/* 🔥 STICKY BOTTOM ACTION BAR (WhatsApp & Call) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 p-4 pb-8 z-50">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4">
          
          {/* WhatsApp Button */}
          <button 
            onClick={handleWhatsApp}
            className="flex flex-col md:flex-row items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-[2rem] shadow-lg shadow-green-100 hover:bg-green-500 active:scale-95 transition-all"
          >
            <MessageCircle size={24} fill="white" className="text-white" />
            <span className="font-black text-lg">WhatsApp</span>
          </button>

          {/* Call Button */}
          <button 
            onClick={() => window.location.href = `tel:${property.phoneNumber || '9131460470'}`}
            className="flex flex-col md:flex-row items-center justify-center gap-2 bg-gray-900 text-white py-4 rounded-[2rem] shadow-lg shadow-gray-200 hover:bg-black active:scale-95 transition-all"
          >
            <Phone size={24} fill="white" className="text-white" />
            <span className="font-black text-lg">Call Owner</span>
          </button>

        </div>
      </div>

      <style jsx>{` .no-scrollbar::-webkit-scrollbar { display: none; } `}</style>
    </div>
  );
}