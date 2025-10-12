// src/components/Navbar.js
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import ModernSearchBar from "./ModernSearchBar";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navbar main container */}
        <div className="flex items-center justify-between h-20 relative">
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/cginfrax_logo.png"
              alt="CGINFRAX Logo"
              width={160}
              height={90}
              priority
              className="object-contain"
            />
          </Link>

          {/* Search Bar (centered properly) */}
          <div className="hidden md:flex absolute inset-0 items-center justify-center">
            <div className="w-[55%]">
              <ModernSearchBar />
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4 relative z-10">
            <Link
              href="/signup"
              className="hidden md:inline-block px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 shadow-sm"
            >
              Sign Up
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-800 focus:outline-none hover:text-blue-600 transition-all"
            >
              {menuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide Menu */}
      {menuOpen && (
        <div className="bg-white fixed top-20 left-0 w-full h-[calc(100vh-5rem)] overflow-y-auto shadow-lg border-t">
          <div className="px-6 py-6 space-y-6 flex flex-col text-lg">
            {[
              { name: "Home", href: "/" },
              { name: "About", href: "/about" },
              { name: "Services", href: "/services" },
              { name: "Contact", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 transition"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Dropdown Section */}
            <div>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-between w-full text-gray-700 hover:text-blue-600 transition"
              >
                Others{" "}
                <FiChevronDown
                  className={`ml-1 transform transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {dropdownOpen && (
                <div className="mt-2 pl-4 space-y-2">
                  <Link
                    href="/terms"
                    className="block text-gray-700 hover:text-blue-600"
                    onClick={() => setMenuOpen(false)}
                  >
                    Terms & Conditions
                  </Link>
                  <Link
                    href="/privacy"
                    className="block text-gray-700 hover:text-blue-600"
                    onClick={() => setMenuOpen(false)}
                  >
                    Privacy Policy
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Sign Up Button */}
            <Link
              href="/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center shadow-sm"
              onClick={() => setMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
