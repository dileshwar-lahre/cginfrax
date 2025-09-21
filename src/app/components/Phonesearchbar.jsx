"use client";
import React, { useState } from "react";
import { MapPin } from "lucide-react";

const PhoneSearchBar = () => {
  const [query, setQuery] = useState("");
  const [showCities, setShowCities] = useState(false);

  const cities = [
    "Raipur",
    "Bilaspur",
    "Durg",
    "Bhilai",
    "Korba",
    "Rajnandgaon",
    "Raigarh",
    "Jagdalpur",
    "Ambikapur",
    "Dhamtari",
  ];

  return (
    <div className="w-full bg-white px-4 py-4 md:hidden">
      {/* Search Bar */}
      <div className="relative flex items-center w-full max-w-md mx-auto bg-white rounded-full px-4 py-3 shadow-lg shadow-gray-400/50 border border-gray-200 transition transform hover:scale-[1.02]">
        
        {/* Location Icon at Start */}
        <button
          onClick={() => setShowCities(!showCities)}
          className="mr-2 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <MapPin className="text-red-500" size={22} />
        </button>

        {/* Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search here..."
          className="flex-1 bg-transparent outline-none text-gray-700 text-base"
        />

        {/* Find Button at End */}
        <button className="ml-2 px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition">
          Find
        </button>
      </div>

      {/* Cities Dropdown */}
      {showCities && (
        <div className="mt-2 w-full max-w-md mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden animate-slideDown">
          {cities.map((city, i) => (
            <button
              key={i}
              onClick={() => {
                setQuery(city);
                setShowCities(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              {city}
            </button>
          ))}
        </div>
      )}

      {/* Animation */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PhoneSearchBar;
