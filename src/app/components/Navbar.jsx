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
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navbar flex */}
        <div className="flex items-center justify-between h-16 relative">
          
          {/* Logo (Left) */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/cginfrax_logo.png"
              alt="CGINFRAX Logo"
              width={140}
              height={70}
              priority
            />
          </Link>

          {/* Search Bar (Center - perfectly centered) */}
          <div className="hidden md:flex absolute inset-0 items-center  justify-center">
            <div className="w-[50%]">
              <ModernSearchBar/>
            </div>
          </div>

          {/* Right Side: Sign Up + Menu Icon */}
          <div className="flex items-center space-x-4 relative z-10">
            <div className="hidden md:flex">
              <Link
                href="/signup"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Slide Menu */}
      {menuOpen && (
        <div className="bg-white fixed top-16 left-0 w-full h-[calc(100vh-4rem)] overflow-y-auto shadow-lg">
          <div className="px-6 py-6 space-y-6 flex flex-col text-lg">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-600 transition"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-gray-700 hover:text-blue-600 transition"
              onClick={() => setMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-blue-600 transition"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>

            {/* Dropdown */}
            <div>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-between w-full text-gray-700 hover:text-blue-600 transition"
              >
                Others{" "}
                <FiChevronDown
                  className={`ml-1 transform ${
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

            {/* Sign Up (Mobile) */}
            <Link
              href="/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center"
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
