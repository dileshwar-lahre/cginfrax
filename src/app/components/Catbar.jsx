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
    <div className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-2 py-1">
        {/* Mobile Friendly Scrollable Row */}
        <div className="flex justify-center items-center gap-4 sm:gap-12 overflow-x-auto no-scrollbar py-2">
          {categories.map((cat) => {
            const isActive = pathname === cat.href;
            
            return (
              <Link
                key={cat.href}
                href={cat.href}
                className="flex flex-col items-center min-w-[70px] group transition-all duration-300"
              >
                {/* Icon Box */}
                <div className={`p-2 rounded-2xl transition-all duration-300 ${
                  isActive 
                  ? "bg-blue-50 scale-105 shadow-sm" 
                  : "bg-transparent active:bg-gray-100"
                }`}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center relative">
                    <Image
                      src={cat.img}
                      alt={cat.label}
                      fill
                      sizes="48px"
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>

                {/* Label */}
                <div className="mt-1 flex flex-col items-center">
                  <span className={`text-[11px] sm:text-[13px] font-bold ${
                    isActive ? "text-blue-600" : "text-gray-500"
                  }`}>
                    {cat.label}
                  </span>
                  
                  {isActive && (
                    <div className="h-[3px] w-5 bg-blue-600 rounded-full mt-0.5" />
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