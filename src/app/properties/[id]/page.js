"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { MapPin, Bed, Bath, Move, Phone, ArrowLeft, Share2, Heart, Eye } from "lucide-react";

export default function PropertyDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/properties/${id}`)
        .then((res) => res.json())
        .then((data) => setProperty(data));
    }
  }, [id]);

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

  if (!property) return <div className="h-screen flex items-center justify-center font-black">LOADING...</div>;

  const isLiked = property.likes?.includes(session?.user?.email);

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-32">
      {/* Top Navigation */}
      <div className="flex justify-between items-center p-6">
        <button onClick={() => router.back()} className="p-3 bg-white shadow-md rounded-full border border-gray-100">
          <ArrowLeft size={22} className="text-gray-900" />
        </button>
        <div className="flex gap-3">
          <button onClick={handleShare} className="p-3 bg-white shadow-md rounded-full border border-gray-100">
            <Share2 size={22} className="text-blue-600" />
          </button>
          <button onClick={handleLike} className="p-3 bg-white shadow-md rounded-full border border-gray-100">
            <Heart size={22} className={isLiked ? "fill-red-500 text-red-500" : "text-gray-400"} />
          </button>
        </div>
      </div>

      {/* 🖼️ IMAGES (Pehle jaisi badi) */}
      <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 px-6">
        {property.images?.map((img, index) => (
          <div key={index} className="flex-shrink-0 w-[85vw] md:w-[800px] aspect-[4/3] md:aspect-video snap-center">
            <img src={img} className="w-full h-full object-cover rounded-[2.5rem] shadow-xl border-4 border-white" alt="property" />
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-8 mt-10 space-y-8">
        {/* Stats Row */}
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-gray-600 font-black text-xs">
            <Eye size={16} /> {property.views || 0} Views
          </div>
          <div className="flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-full text-pink-600 font-black text-xs">
            <Heart size={16} fill="currentColor" /> {property.likes?.length || 0} Likes
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-black text-gray-900 leading-tight">{property.title}</h1>
          <p className="flex items-center gap-2 text-gray-500 font-bold text-lg">
            <MapPin size={20} className="text-red-500"/> {property.address}, {property.district}
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50/50 p-6 rounded-[2rem] border border-blue-100 flex flex-col items-center">
            <Bed className="text-blue-600 mb-2" />
            <span className="font-black text-gray-900">{property.details?.beds || 0} BHK</span>
          </div>
          <div className="bg-emerald-50/50 p-6 rounded-[2rem] border border-emerald-100 flex flex-col items-center">
            <Bath className="text-emerald-600 mb-2" />
            <span className="font-black text-gray-900">{property.details?.baths || 0} Baths</span>
          </div>
          <div className="bg-orange-50/50 p-6 rounded-[2rem] border border-orange-100 flex flex-col items-center">
            <Move className="text-orange-600 mb-2" />
            <span className="font-black text-gray-900">{property.details?.area || 0} Sqft</span>
          </div>
        </div>

        {/* Desc */}
        <div className="space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Description</h3>
          <p className="text-gray-800 font-bold text-lg leading-relaxed bg-white p-8 rounded-[2.5rem] border border-gray-100">
            {property.desc}
          </p>
        </div>

        {/* Sticky Call Button (No Number Visible) */}
        <div className="fixed bottom-8 left-6 right-6">
          <button 
            onClick={() => window.location.href = "tel:9131460470"}
            className="w-full py-6 bg-gray-900 text-white font-black rounded-[2.5rem] text-xl shadow-2xl flex items-center justify-center gap-4 active:scale-95 transition-all"
          >
            <Phone size={24} fill="white" /> Call Owner
          </button>
        </div>
      </div>
    </div>
  );
}