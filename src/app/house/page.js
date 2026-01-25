"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";

// 🔥 TOP 10 CITIES (Database se inka data aayega)
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

export default function HousePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-6"> {/* Header hataya, direct padding */}
      
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 space-y-12"> 
        {/* space-y-12 se har city ke beech me gap aayega (Desktop mt-10 style) */}
        
        {CITIES.map((city, index) => (
          <CitySection key={index} city={city} router={router} />
        ))}
      </div>

    </div>
  );
}

// 🧩 CITY SECTION COMPONENT
const CitySection = ({ city, router }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔥 API Call: City + House Category + Limit 10
        const res = await fetch(`/api/properties?district=${city}&cat=House&limit=10`);
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

  // Agar data nahi hai to section mat dikhao
  if (!loading && properties.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      
      {/* City Title (Minimal) */}
      <div className="px-1">
        <h2 className="text-2xl font-black text-gray-800 tracking-tight border-l-4 border-blue-600 pl-3">
          {city}
        </h2>
      </div>

      {/* 🔥 LIST LAYOUT: Mobile = Slider | Desktop = Grid (4 col) */}
      <div className="flex md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar">
        
        {loading ? (
          // Skeleton Loader
          [1, 2, 3, 4].map((i) => (
            <div key={i} className="min-w-[260px] md:min-w-0 h-72 bg-gray-200 rounded-2xl animate-pulse"></div>
          ))
        ) : (
          properties.map((item) => (
            <div 
              key={item._id}
              onClick={() => router.push(`/properties/${item._id}`)}
              className="
                group min-w-[260px] md:min-w-0 w-[75vw] md:w-auto 
                bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100
                hover:shadow-xl transition-all duration-300 cursor-pointer 
                snap-center flex flex-col
              "
            >
              {/* Image */}
              <div className="h-44 relative overflow-hidden">
                <img 
                  src={item.images?.[0] || "/placeholder.jpg"} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Category Badge */}
                <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                  {item.cat}
                </div>
              </div>

              {/* Content - Price ab yahan hai (Clear Dikhega) */}
              <div className="p-4 flex flex-col gap-1">
                
                {/* 🔥 PRICE (Bada aur Bold) */}
                <div className="text-xl font-[900] text-blue-700">
                  ₹ {item.price?.toLocaleString('en-IN')}
                </div>

                {/* Title */}
                <h3 className="font-bold text-gray-900 truncate text-base leading-tight">
                    {item.title}
                </h3>
                
                {/* Address */}
                <div className="flex items-center gap-1 text-gray-500 text-xs font-medium mt-1">
                  <MapPin size={12} className="text-red-500 shrink-0" />
                  <span className="truncate">{item.address || "Location unavailable"}, {city}</span>
                </div>

                {/* Specs Row */}
                <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                   {item.details?.beds > 0 && (
                       <span className="text-[10px] font-bold bg-gray-50 text-gray-600 px-2 py-1 rounded border border-gray-200">
                         {item.details.beds} BHK
                       </span>
                   )}
                   <span className="text-[10px] font-bold bg-gray-50 text-gray-600 px-2 py-1 rounded border border-gray-200">
                     {item.details?.area || 0} Sqft
                   </span>
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};