"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Users, User } from "lucide-react";

// 🔥 Inhi cities ka data check karega
const CITIES = [
  "Bilaspur",
  "Raipur",
  "Durg",
  "Bhilai",
  "Korba",
  "Raigarh",
  "Jagdalpur",
  "Ambikapur",
  "Rajnandgaon",
  "Dhamtari"
];

export default function PGPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 pb-32 pt-10">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex flex-col gap-12 md:gap-0">
          
          {/* Har city ke liye PG check karega */}
          {CITIES.map((city, index) => (
            <CitySection key={index} city={city} router={router} />
          ))}

        </div>
      </div>
    </div>
  );
}

// 🧩 CITY SECTION (Smart Component for PG)
const CitySection = ({ city, router }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔥 SIRF PG WALA DATA (cat=PG)
        const res = await fetch(`/api/properties?district=${city}&cat=PG&limit=10`);
        const data = await res.json();
        
        const list = data.properties || data;
        if (Array.isArray(list)) {
          setProperties(list);
        }
      } catch (err) {
        console.error(`Error fetching ${city}:`, err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [city]);

  // 🔥 Agar us City me PG nahi hai, to Section mat dikhao
  if (!loading && properties.length === 0) return null;

  return (
    // Desktop par mt-20 ka gap
    <div className="flex flex-col gap-5 md:mt-20">
      
      {/* City Name */}
      <div className="px-1">
        <h2 className="text-3xl font-[900] text-gray-800 tracking-tighter border-l-8 border-purple-600 pl-4 uppercase">
          {city} <span className="text-sm text-gray-400 font-normal normal-case tracking-normal ml-2">(PG & Hostels)</span>
        </h2>
      </div>

      {/* List Layout: Mobile Slide | Desktop Grid */}
      <div className="flex md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar">
        
        {loading ? (
          // Skeleton Loader
          [1, 2, 3, 4].map((i) => (
            <div key={i} className="min-w-[270px] md:min-w-0 h-80 bg-gray-200 rounded-[2rem] animate-pulse"></div>
          ))
        ) : (
          properties.map((item) => (
            <div 
              key={item._id}
              onClick={() => router.push(`/properties/${item._id}`)}
              className="
                group min-w-[270px] md:min-w-0 w-[80vw] md:w-auto 
                bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100
                hover:shadow-2xl transition-all duration-300 cursor-pointer 
                snap-center flex flex-col h-full
              "
            >
              {/* Image */}
              <div className="h-48 md:h-56 relative overflow-hidden">
                <img 
                  src={item.images?.[0] || "/placeholder.jpg"} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-2 flex-1">
                
                {/* Price */}
                <div className="text-2xl font-[1000] text-purple-700 tracking-tight">
                  ₹ {item.price?.toLocaleString('en-IN')} <span className="text-xs font-bold text-gray-400">/ Month</span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-gray-800 truncate text-lg">
                    {item.title}
                </h3>
                
                {/* Location */}
                <div className="flex items-center gap-1.5 text-gray-500 text-sm font-semibold">
                  <MapPin size={14} className="text-red-500 shrink-0" />
                  <span className="truncate">{item.address}, {city}</span>
                </div>

                {/* 🔥 PG SPECS (Gender & Sharing) */}
                <div className="flex gap-2 mt-auto pt-4 border-t border-gray-50">
                   
                   {/* Gender Badge */}
                   {item.details?.gender && (
                       <span className={`text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 ${
                           item.details.gender === 'Girls' ? 'bg-pink-50 text-pink-600' : 
                           item.details.gender === 'Boys' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                       }`}>
                         <User size={12} /> {item.details.gender}
                       </span>
                   )}

                   {/* Sharing Badge */}
                   {item.details?.sharing && (
                       <span className="text-xs font-bold bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg flex items-center gap-1">
                         <Users size={12} /> {item.details.sharing}
                       </span>
                   )}
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};