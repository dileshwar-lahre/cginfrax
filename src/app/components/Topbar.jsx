"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
// import Catbar from "./Catbar";
import PhoneSearchBar from "./Phonesearchbar";
import { motion, AnimatePresence } from "framer-motion";

const Topbar = () => {
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > 300) {
          setShowSearch(true);
        } else {
          setShowSearch(false);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <header className="w-full">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Navbar />

        {/* PhoneSearchBar only on scroll */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full md:hidden" // 👈 sirf mobile pe
            >
              <PhoneSearchBar />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Catbar with padding below fixed header */}
      <div className="pt-20 bg-gray-50 border-t border-gray-200 shadow-sm">
        {/* <Catbar /> */}
      </div>
    </header>
  );
};

export default Topbar;
