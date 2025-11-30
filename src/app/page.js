"use client";

import Image from "next/image";

import { motion } from "framer-motion";

export default function Home() {
  const cities = [
    "Raipur",
    "Bhilai",
    "Bilaspur",
    "Durg",
    "Korba",
    "Raigarh",
    "Jagdalpur",
    "Ambikapur",
    "Kawardha",
    "Chirmiri",
  ];

  const homeTypes = ["Apartment", "Villa", "Independent House", "Studio", "Penthouse"];
  const priceRanges = ["₹5L - ₹20L", "₹20L - ₹50L", "₹50L - ₹1Cr", "₹1Cr - ₹2Cr", "₹2Cr+"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-blue-50 to-sky-50 relative overflow-hidden">
      {/* Animated Moving Clouds */}
      <motion.div
        className="absolute inset-0 bg-[url('/images/clouds.png')] bg-repeat opacity-30"
        animate={{ backgroundPositionX: [0, 2000] }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      />

      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] px-4 sm:px-8 md:px-16 py-10 md:py-16 flex items-center">
        {/* Full Image */}
        <Image
          src="/images/housemodel.png"
          alt="Property"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Soft Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 via-blue-800/40 to-blue-700/10" />

        {/* Content */}
        <div className="relative z-10 w-full flex flex-col md:flex-row items-center md:items-start">
          {/* Text Content */}
          <motion.div
            className="flex-1 text-center md:text-left space-y-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-xl">
              Find Your <br /> Perfect Home
            </h1>

            <motion.p
              className="text-blue-100 font-medium drop-shadow tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              YOUR PROPERTY, OUR PRIORITY
            </motion.p>

            {/* Search Bar */}
            <motion.div
              className="bg-white/20 backdrop-blur-md text-white rounded-xl flex flex-col md:flex-row items-center p-4 space-y-4 md:space-y-0 md:space-x-4 shadow-lg max-w-2xl mx-auto md:mx-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <select className="bg-transparent border border-white/40 px-4 py-2 rounded-md focus:outline-none">
                <option className="text-black">Location</option>
                {cities.map((city) => (
                  <option key={city} className="text-black">{city}</option>
                ))}
              </select>

              <select className="bg-transparent border border-white/40 px-4 py-2 rounded-md focus:outline-none">
                <option className="text-black">Home Type</option>
                {homeTypes.map((type) => (
                  <option key={type} className="text-black">{type}</option>
                ))}
              </select>

              <select className="bg-transparent border border-white/40 px-4 py-2 rounded-md focus:outline-none">
                <option className="text-black">Price Range</option>
                {priceRanges.map((range) => (
                  <option key={range} className="text-black">{range}</option>
                ))}
              </select>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 font-bold px-6 py-2 rounded-md hover:bg-gray-100 transition shadow-md"
              >
                Search
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
