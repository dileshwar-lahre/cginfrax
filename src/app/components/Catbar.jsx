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
    <div className="flex justify-center items-center py-4">
      {/* Outer shadow container */}
      <div className="flex bg-white shadow-lg rounded-2xl px-6 sm:px-8 lg:px-12 py-4 sm:py-5 space-x-6 sm:space-x-10">
        {categories.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="flex flex-col items-center group"
          >
            {/* Icon - fixed uniform size for all */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 flex items-center justify-center">
              <Image
                src={cat.img}
                alt={cat.label}
                width={64}
                height={64}
                className="object-contain w-full h-full transition-transform duration-200 group-hover:scale-110"
                priority
              />
            </div>

            {/* Label */}
            <span
              className={`mt-2 text-sm sm:text-base font-medium ${
                pathname === cat.href
                  ? "text-black underline underline-offset-4 decoration-2"
                  : "text-gray-600 group-hover:text-black"
              }`}
            >
              {cat.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Catbar;
