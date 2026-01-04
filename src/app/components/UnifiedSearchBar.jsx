"use client";
import React, { useState, useEffect, useRef } from "react";
import { MapPin, Search, Filter, X, ChevronDown, IndianRupee } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const cgDistricts = ["All", "Raipur", "Bilaspur", "Durg", "Bhilai", "Korba", "Raigarh", "Rajnandgaon", "Jagdalpur", "Ambikapur", "Dhamtari", "Mahasamund", "Janjgir", "Kawardha", "Kanker", "Kondagaon", "Sukma", "Dantewada", "Bijapur", "Narayanpur", "Bastar", "Gariaband", "Balod", "Bemetara", "Mungeli", "Sakti", "Baloda Bazar", "Surajpur", "Balrampur", "Jashpur", "Manendragarh", "Khairagarh", "Mohla-Manpur", "Sarangarh"];

const categories = ["All", "Room", "Plot", "PG", "House"];

export default function UnifiedSearchBar({ variant = "default" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showDistrict, setShowDistrict] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const filterRef = useRef(null);

  // Filters state
  const [filters, setFilters] = useState({
    district: searchParams.get("district") || "All",
    category: searchParams.get("category") || "All",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    kitchen: searchParams.get("kitchen") || "",
    plotType: searchParams.get("plotType") || "",
  });

  // Initialize query from URL
  useEffect(() => {
    const searchQuery = searchParams.get("search") || "";
    setQuery(searchQuery);
  }, [searchParams]);

  // Close filters on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowDistrict(false);
        setShowCategory(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (query.trim()) {
      params.set("search", query.trim());
    }
    
    if (filters.district && filters.district !== "All") {
      params.set("district", filters.district);
    }
    
    if (filters.category && filters.category !== "All") {
      params.set("category", filters.category);
    }
    
    if (filters.minPrice) {
      params.set("minPrice", filters.minPrice);
    }
    
    if (filters.maxPrice) {
      params.set("maxPrice", filters.maxPrice);
    }
    
    if (filters.kitchen) {
      params.set("kitchen", filters.kitchen);
    }
    
    if (filters.plotType) {
      params.set("plotType", filters.plotType);
    }

    router.push(`/listing?${params.toString()}`);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setFilters({
      district: "All",
      category: "All",
      minPrice: "",
      maxPrice: "",
      kitchen: "",
      plotType: "",
    });
    setQuery("");
    router.push("/listing");
  };

  const hasActiveFilters = filters.district !== "All" || filters.category !== "All" || filters.minPrice || filters.maxPrice || filters.kitchen || filters.plotType || query.trim();

  // Variant styles
  const isMobile = variant === "mobile";
  const isDesktop = variant === "desktop";
  const isFloating = variant === "floating";

  return (
    <div className={`relative ${isMobile ? "w-full" : isDesktop ? "w-full max-w-2xl" : "w-full"}`} ref={filterRef}>
      {/* Main Search Bar */}
      <div className={`
        ${isFloating 
          ? "bg-black/30 backdrop-blur-md border border-white/20" 
          : "bg-white border border-gray-200 shadow-lg"
        }
        rounded-full flex items-center px-4 py-2.5 md:py-3 transition-all
        ${isMobile ? "w-full" : ""}
      `}>
        {/* District Filter Button */}
        <button
          onClick={() => {
            setShowDistrict(!showDistrict);
            setShowCategory(false);
          }}
          className={`
            mr-2 p-2 rounded-full transition active:scale-90
            ${isFloating 
              ? "text-white hover:bg-white/20" 
              : "text-red-500 hover:bg-gray-50"
            }
          `}
        >
          <MapPin size={20} />
        </button>

        {/* Search Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search properties, locations..."
          className={`
            flex-1 bg-transparent outline-none text-sm md:text-base font-medium
            ${isFloating 
              ? "text-white placeholder-white/70" 
              : "text-gray-700 placeholder-gray-400"
            }
          `}
        />

        {/* Filter Toggle (Desktop) */}
        {!isMobile && (
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`
              mr-2 px-3 py-1.5 rounded-full text-xs font-bold transition
              ${hasActiveFilters
                ? isFloating
                  ? "bg-white/30 text-white"
                  : "bg-blue-100 text-blue-600"
                : isFloating
                  ? "text-white/80 hover:bg-white/20"
                  : "text-gray-600 hover:bg-gray-50"
              }
            `}
          >
            <Filter size={16} className="inline mr-1" />
            Filters
          </button>
        )}

        {/* Search/Filter Button */}
        <button
          onClick={handleSearch}
          className={`
            px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-black uppercase tracking-wider
            transition-all active:scale-95 shadow-md
            ${isFloating
              ? "bg-yellow-400 text-black hover:bg-yellow-300"
              : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100"
            }
          `}
        >
          Filter
        </button>
      </div>

      {/* District Dropdown */}
      <AnimatePresence>
        {showDistrict && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 max-h-60 overflow-y-auto"
          >
            {cgDistricts.map((district) => (
              <button
                key={district}
                onClick={() => {
                  setFilters({ ...filters, district });
                  setShowDistrict(false);
                }}
                className={`
                  block w-full text-left px-6 py-3 text-gray-700 font-bold border-b border-gray-50 last:border-0
                  transition hover:bg-blue-50
                  ${filters.district === district ? "bg-blue-50 text-blue-600" : ""}
                `}
              >
                {district}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Advanced Filters Panel (Desktop) */}
      <AnimatePresence>
        {showFilters && !isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-50"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-black text-gray-900">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilters({ ...filters, category: cat })}
                      className={`
                        px-4 py-2 rounded-xl text-sm font-bold transition
                        ${filters.category === cat
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }
                      `}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Kitchen Filter (for Room, PG, House) */}
              {(filters.category === "Room" || filters.category === "PG" || filters.category === "House") && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Kitchen</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFilters({ ...filters, kitchen: filters.kitchen === "Available" ? "" : "Available" })}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
                        filters.kitchen === "Available"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Available
                    </button>
                    <button
                      onClick={() => setFilters({ ...filters, kitchen: filters.kitchen === "Not Available" ? "" : "Not Available" })}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
                        filters.kitchen === "Not Available"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Not Available
                    </button>
                  </div>
                </div>
              )}

              {/* Plot Type Filter (for Plot) */}
              {filters.category === "Plot" && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Plot Type</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFilters({ ...filters, plotType: filters.plotType === "Residential" ? "" : "Residential" })}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
                        filters.plotType === "Residential"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Residential
                    </button>
                    <button
                      onClick={() => setFilters({ ...filters, plotType: filters.plotType === "Commercial" ? "" : "Commercial" })}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
                        filters.plotType === "Commercial"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Commercial
                    </button>
                  </div>
                </div>
              )}

              {/* Price Range */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Price Range</label>
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <IndianRupee className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <span className="text-gray-400 font-bold">-</span>
                  <div className="flex-1 relative">
                    <IndianRupee className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={clearFilters}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-gray-700 font-bold hover:bg-gray-50 transition"
                >
                  Clear All
                </button>
                <button
                  onClick={handleSearch}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Filters (Simplified) */}
      {isMobile && (
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50"
            >
              <div className="space-y-3">
                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                  <div className="flex gap-2 overflow-x-auto">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setFilters({ ...filters, category: cat })}
                        className={`
                          px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition
                          ${filters.category === cat
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700"
                          }
                        `}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range (Mobile) */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Price</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}



