"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  { href: "/", img: "/images/homeicon.png", label: "House" },
  { href: "/room", img: "/images/roomicon.png", label: "Room" },
  { href: "/land", img: "/images/landlo.png", label: "Land" },
  { href: "/construction", img: "/images/constructionlogo.png", label: "Construction" },
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
            {/* Icon */}
            <div className="transition-transform duration-200 group-hover:scale-110 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16">
              <Image
                src={cat.img}
                alt={cat.label}
                width={64} // uniform size for all icons
                height={64}
                className="object-contain"
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
