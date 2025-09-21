"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  { href: "/", img: "/images/homeicon.png", label: "House " },
  { href: "/room", img: "/images/roomicon.png", label: "Room " },
  { href: "/land", img: "/images/land.png", label: "Land " },
  { href: "/construction", img: "/images/construction.png", label: "Construction" },
];

const Catbar = () => {
  const pathname = usePathname();

  return (
    <div className="flex justify-center items-center py-6">
      {/* Wrap container with only outer shadow */}
      <div className="flex bg-white shadow-lg rounded-2xl px-8 py-5 space-x-10">
        {categories.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="flex flex-col items-center group"
          >
            {/* Icon */}
            <div className="transition-transform duration-200 group-hover:scale-110">
              <Image
                src={cat.img}
                alt={cat.label}
                width={60}
                height={60}
                priority
              />
            </div>

            {/* Label */}
            <span
              className={`mt-2 text-sm font-medium ${
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
