"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Catbar from "./Catbar";
import PhoneSearchBar from "./Phonesearchbar";

const Topbar = () => {
  const [showSearch, setShowSearch] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowSearch(false); // scroll ke baad hide
      } else {
        setShowSearch(true); // upar aate hi show
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col w-full">
      
      {/* Navbar */}
      <div className="sticky top-0 w-full z-[1000] bg-white shadow-md">
        <Navbar onSearchClick={() => setShowSearch(true)} />
      </div>

      {/* Phone Search */}
      {showSearch && (
        <div className="md:hidden w-full border-b border-gray-100">
          <PhoneSearchBar />
        </div>
      )}

      {/* Catbar */}
      <div className="w-full">
        <Catbar />
      </div>
    </div>
  );
};

export default Topbar;