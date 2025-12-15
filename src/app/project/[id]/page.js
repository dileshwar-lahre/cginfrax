"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "../../components/Navbar"; // ✅ Path corrected
import { MapPin, BedDouble, Bath, Maximize, ArrowLeft, Share2, Heart, Phone, Mail, User, CheckCircle } from "lucide-react";

export default function PropertyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params; // URL se ID nikala

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Data Fetching
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/properties?id=${id}`);
        const data = await res.json();
        setProperty(data);
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) fetchProperty();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!property) return <div className="text-center p-10">Property not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />

      {/* --- HERO IMAGE SECTION --- */}
      <div className="relative w-full h-[60vh] md:h-[70vh] bg-gray-900 mt-16 md:mt-0">
        <Image 
            src={property.imageUrl} 
            alt={property.title} 
            fill 
            className="object-cover opacity-90"
            priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>

        {/* Top Buttons */}
        <div className="absolute top-24 left-4 md:left-8 z-10">
            <button onClick={() => router.back()} className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white hover:text-black transition-all">
                <ArrowLeft size={24} />
            </button>
        </div>
        <div className="absolute top-24 right-4 md:right-8 z-10 flex gap-3">
            <button className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white hover:text-red-500 transition-all">
                <Heart size={24} />
            </button>
            <button className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white hover:text-blue-600 transition-all">
                <Share2 size={24} />
            </button>
        </div>

        {/* Bottom Info on Image */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
            <div className="max-w-7xl mx-auto">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block ${property.status === 'For Sell' ? 'bg-blue-600' : 'bg-green-600'}`}>
                    {property.status}
                </span>
                <h1 className="text-3xl md:text-5xl font-black mb-2 leading-tight">{property.title}</h1>
                <p className="flex items-center gap-2 text-lg md:text-xl text-gray-200 font-medium">
                    <MapPin size={20} className="text-blue-400" /> {property.location}
                </p>
            </div>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN (Details) */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* 1. Key Features Card */}
                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100 flex justify-between items-center">
                    <div className="text-center">
                        <div className="bg-blue-50 text-blue-600 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mx-auto mb-2">
                            <BedDouble size={28} />
                        </div>
                        <p className="font-bold text-gray-900 text-lg">{property.beds} Beds</p>
                    </div>
                    <div className="w-px h-12 bg-gray-200"></div>
                    <div className="text-center">
                        <div className="bg-blue-50 text-blue-600 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mx-auto mb-2">
                            <Bath size={28} />
                        </div>
                        <p className="font-bold text-gray-900 text-lg">{property.baths} Baths</p>
                    </div>
                    <div className="w-px h-12 bg-gray-200"></div>
                    <div className="text-center">
                        <div className="bg-blue-50 text-blue-600 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mx-auto mb-2">
                            <Maximize size={28} />
                        </div>
                        <p className="font-bold text-gray-900 text-lg">{property.area}</p>
                    </div>
                </div>

                {/* 2. Description */}
                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
                    <p className="text-gray-600 leading-relaxed">
                        This is a premium property located in the heart of {property.location}. 
                        Perfect for families looking for a peaceful yet connected lifestyle. 
                        Features modern architecture, spacious rooms, and high-quality fittings.
                        (Note: Yeh description auto-generated hai kyunki upload form me description field nahi tha.)
                    </p>
                    
                    <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Amenities</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {['24/7 Water Supply', 'Electricity Backup', 'Parking Space', 'Garden'].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-gray-600 font-medium">
                                <CheckCircle size={18} className="text-green-500" /> {item}
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* RIGHT COLUMN (Contact Agent) */}
            <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 sticky top-24">
                    <p className="text-gray-500 font-bold uppercase text-xs tracking-wider mb-1">Total Price</p>
                    <h2 className="text-4xl font-black text-blue-600 mb-6">{property.price}</h2>

                    <hr className="border-gray-100 mb-6" />

                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                             <User size={28} className="text-gray-400" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Listed by</p>
                            <p className="font-bold text-gray-900 text-sm break-all">{property.userEmail}</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/30">
                            <Phone size={20} /> Call Owner
                        </button>
                        <button className="w-full py-4 bg-white border-2 border-gray-100 hover:border-black text-gray-800 font-bold rounded-xl flex items-center justify-center gap-2 transition-all">
                            <Mail size={20} /> Email Enquiry
                        </button>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}