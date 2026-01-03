"use client";
import React, { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { useRouter } from "next/navigation";

const PhoneSearchBar = () => {
  const [query, setQuery] = useState("");
  const [showCities, setShowCities] = useState(false);
  const router = useRouter();

  const cities = ["All", "Raipur", "Bilaspur", "Durg", "Bhilai", "Korba", "Rajnandgaon", "Raigarh"];

  const handleSearch = () => {
    // Agar query khali hai toh saara data dikhao, warna filter karo
    if (query.trim() === "") {
      router.push("/properties"); 
    } else {
      router.push(`/properties?search=${query}`);
    }
    setShowCities(false);
  };

  const selectCity = (city) => {
    setQuery(city);
    setShowCities(false);
    if (city === "All") {
      router.push(`/properties`);
    } else {
      router.push(`/properties?district=${city}`);
    }
  };

  return (
    <div className="w-full bg-white px-4 py-4 md:hidden sticky top-0 z-50">
      <div className="relative flex items-center w-full max-w-md mx-auto bg-white rounded-full px-4 py-2 shadow-lg shadow-gray-200 border border-gray-100">
        
        {/* City Selector */}
        <button
          onClick={() => setShowCities(!showCities)}
          className="mr-2 p-2 rounded-full hover:bg-gray-50 transition active:scale-90"
        >
          <MapPin className="text-red-500" size={20} />
        </button>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search Raipur, Plot, Room..."
          className="flex-1 bg-transparent outline-none text-gray-700 text-sm font-medium"
        />

        <button 
          onClick={handleSearch}
          className="ml-2 px-5 py-2 rounded-full bg-blue-600 text-white text-xs font-black uppercase tracking-wider hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-100"
        >
          Find
        </button>
      </div>

      {/* Cities Dropdown */}
      {showCities && (
        <div className="absolute left-4 right-4 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 max-h-60 overflow-y-auto animate-slideDown">
          {cities.map((city, i) => (
            <button
              key={i}
              onClick={() => selectCity(city)}
              className="block w-full text-left px-6 py-4 text-gray-700 font-bold border-b border-gray-50 last:border-0 hover:bg-blue-50 transition"
            >
              {city}
            </button>
          ))}
        </div>
      )}

      {/* CSS in JS */}
      <style jsx>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.2s ease-out; }
      `}</style>
    </div>
  );
};

export default PhoneSearchBar;