"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Catbar from "./Catbar";
import PhoneSearchBar from "./Phonesearchbar";
import { motion, AnimatePresence } from "framer-motion";

const Topbar = () => {
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 200px scroll hote hi search bar dikhao
      setShowSearch(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* 1. FIXED HEADER: Ye upar chipka rahega */}
      <header className="fixed top-0 left-0 w-full z-[100] bg-white shadow-sm border-b border-gray-100">
        
        {/* Navbar hamesha dikhega */}
        <Navbar />

        {/* Search Bar: Jab user scroll karega tabhi niche se niklega */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="w-full md:hidden bg-white border-t border-gray-100 px-4 py-2"
            >
              <PhoneSearchBar />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Catbar: Ye hamesha Navbar ke niche rahega bina overlap ke */}
        <div className="w-full bg-white">
          <Catbar />
        </div>
      </header>

      {/* 2. SPACER: Ye sabse important hai! */}
      {/* Ye niche wale content ko header ke niche dhakel deta hai */}
      {/* Agar header ki height zyada hai toh h-40 ya h-48 kar dena */}
      <div className="h-40 sm:h-44 md:h-48 w-full block"></div>
    </>
  );
};

export default Topbar;