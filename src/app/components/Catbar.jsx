"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  { href: "/", img: "/images/homeicon.png", label: "House" },
  { href: "/room", img: "/images/roomicon2.png", label: "Room" },
  { href: "/land", img: "/images/landlo.jpg", label: "Land" },
  { href: "/construction", img: "/images/construction1.png", label: "Construction" },
];

const Catbar = () => {
  const pathname = usePathname();

  return (
    <div className="w-full bg-white/80 backdrop-blur-md sticky top-[64px] z-40 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-center items-center gap-4 sm:gap-12 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = pathname === cat.href;
            
            return (
              <Link
                key={cat.href}
                href={cat.href}
                className="flex flex-col items-center min-w-[70px] group transition-all duration-300"
              >
                {/* Icon Container with subtle background for visibility */}
                <div className={`p-2 rounded-xl transition-all duration-300 ${
                  isActive 
                  ? "bg-blue-50 scale-110 shadow-sm" 
                  : "bg-transparent group-hover:bg-gray-50"
                }`}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center relative">
                    <Image
                      src={cat.img}
                      alt={cat.label}
                      fill
                      sizes="(max-width: 768px) 40px, 48px"
                      className={`object-contain transition-transform duration-300 ${
                        isActive ? "grayscale-0" : "grayscale-[0.3] group-hover:grayscale-0"
                      }`}
                      priority
                    />
                  </div>
                </div>

                {/* Label with Animated Underline */}
                <div className="relative mt-1 flex flex-col items-center">
                  <span className={`text-[12px] sm:text-sm font-semibold transition-colors duration-200 ${
                    isActive ? "text-blue-600" : "text-gray-500 group-hover:text-black"
                  }`}>
                    {cat.label}
                  </span>
                  
                  {/* Active Indicator Bar */}
                  {isActive && (
                    <div className="h-[3px] w-6 bg-blue-600 rounded-full mt-1" />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Catbar;