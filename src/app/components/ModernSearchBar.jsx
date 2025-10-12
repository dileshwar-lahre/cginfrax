"use client";

import { useState } from "react";
import { MapPin, Home, Building2, Landmark, Wrench } from "lucide-react";

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

const categories = [
  { name: "Home", icon: <Home className="w-4 h-4 mr-1" /> },
  { name: "Room", icon: <Building2 className="w-4 h-4 mr-1" /> },
  { name: "Land", icon: <Landmark className="w-4 h-4 mr-1" /> },
  { name: "Construction", icon: <Wrench className="w-4 h-4 mr-1" /> },
];

export default function ModernSearchBar() {
  const [showCities, setShowCities] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Select City");
  const [selectedCategory, setSelectedCategory] = useState("Category");

  return (
    <div className="flex justify-center">
      <div className="flex items-center bg-white rounded-full px-4 py-2 w-full max-w-2xl space-x-3 
                      shadow-xl ring-1 ring-blue-400/20 hover:ring-blue-400/40 transition-all duration-300">
        {/* Location */}
        <div className="relative">
          <button
            onClick={() => setShowCities(!showCities)}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <MapPin className="w-5 h-5 mr-1 text-gray-500" />
            <span>{selectedCity}</span>
          </button>

          {showCities && (
            <div className="absolute top-12 left-0 w-40 bg-white border rounded-lg shadow-lg z-10">
              {cities.map((city) => (
                <div
                  key={city}
                  className="px-4 py-2 hover:bg-blue-400 text-black cursor-pointer"
                  onClick={() => {
                    setSelectedCity(city);
                    setShowCities(false);
                  }}
                >
                  {city}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search here..."
          className="flex-1 outline-none px-2 text-gray-700"
        />

        {/* Category */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="outline-none border border-gray-200 rounded-full px-3 py-1 text-gray-600 hover:border-gray-400"
          >
            <option disabled>Category</option>
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
          Search
        </button>
      </div>
    </div>
  );
}
