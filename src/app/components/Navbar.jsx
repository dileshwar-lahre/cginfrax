"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiSearch, FiArrowRight, FiChevronDown, FiChevronRight } from "react-icons/fi";

// 👇 Dono Popups Import
import SignupPopup from "./SignupPopup";
import LoginPopup from "./LoginPopup";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // 👇 State Logic
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // 👇 Switching Logic
  const openLogin = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
    setMenuOpen(false);
  };

  const openSignup = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
    setMenuOpen(false);
  };

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [menuOpen]);

  // --- SCROLL LOGIC ---
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ['home', 'about', 'services', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 150; 

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home", id: "home" },
    { name: "About", href: "#about", id: "about" },
    { name: "Services", href: "#services", id: "services" },
    { name: "Projects", href: "#projects", id: "projects" },
  ];

  return (
    <>
      {/* --- DESKTOP NAVBAR --- */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed inset-x-0 z-50 flex justify-center transition-all duration-300 ${
          scrolled ? "top-0 md:top-4" : "top-0 md:top-6"
        }`}
      >
        <div
          className={`
            relative flex items-center justify-between transition-all duration-500 ease-in-out
            bg-white/95 backdrop-blur-xl border-b md:border border-white/20 shadow-sm md:shadow-lg shadow-black/5
            ${scrolled 
              ? "w-full md:w-[95%] md:rounded-2xl py-3 px-4 md:px-6" 
              : "w-full md:max-w-7xl md:rounded-full py-3 md:py-4 px-4 md:px-8 bg-white/90"
            }
          `}
        >
         {/* 1. LOGO */}
          <Link href="#home" className="flex items-center gap-2 group z-10">
            {/* 👇 UPDATED: Mobile Size Significantly Increased (w-56 h-16) */}
            <div className="relative w-56 h-16 md:w-72 md:h-20 overflow-hidden">
              <Image 
                src="/images/cginfrax_logo.png" 
                alt="CGINFRAX Logo" 
                fill 
                className="object-contain object-left" 
                priority 
              />
            </div>
          </Link>

          {/* 2. CENTER LINKS (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 bg-gray-100/50 p-1.5 rounded-full border border-gray-200/40">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setActiveSection(item.id)}
                  className="relative px-5 py-2 text-sm font-bold transition-colors"
                >
                  {isActive && (
                    <motion.span
                      layoutId="activePill"
                      className="absolute inset-0 bg-white rounded-full shadow-sm border border-gray-100"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? "text-orange-600" : "text-gray-600 hover:text-gray-900"}`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
            
            {/* Dropdown */}
            <div className="relative group px-3 cursor-pointer">
              <span className="flex items-center gap-1 text-sm font-medium text-gray-500 group-hover:text-gray-900 transition-colors">
                More <FiChevronDown className="group-hover:rotate-180 transition-transform duration-300" />
              </span>
              <div className="absolute top-full right-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100">
                <div className="w-48 bg-white rounded-xl shadow-2xl p-2 border border-gray-100 ring-1 ring-black/5 overflow-hidden">
                   {['Terms', 'Privacy', 'Careers'].map((link) => (
                     <a key={link} href="#" className="block px-4 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors">
                       {link}
                     </a>
                   ))}
                </div>
              </div>
            </div>
          </nav>

          {/* 3. RIGHT ACTIONS */}
          <div className="flex items-center gap-3 md:gap-4 z-10">
            {/* Search (Desktop) */}
            <div className={`hidden md:flex items-center transition-all duration-300 ${searchOpen ? 'w-64 bg-gray-50' : 'w-10 bg-transparent'} rounded-full border ${searchOpen ? 'border-gray-200 pl-4 pr-2' : 'border-transparent justify-center'}`}>
               {searchOpen && (
                 <input 
                   autoFocus
                   type="text" 
                   placeholder="Search..." 
                   onBlur={() => setSearchOpen(false)}
                   className="bg-transparent border-none outline-none text-sm w-full text-gray-700"
                 />
               )}
               <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-600 hover:text-orange-600 transition-colors rounded-full hover:bg-gray-100"
              >
                 <FiSearch size={18} />
               </button>
            </div>

            {/* 👇 BUTTON: SIGN UP (Desktop) */}
            <button
              onClick={openSignup}
              className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30 active:scale-95 transition-all duration-300"
            >
              Sign Up <FiArrowRight />
            </button>

            {/* Mobile Menu Toggle (Improved) */}
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden p-2 text-gray-800 bg-gray-100 hover:bg-orange-50 hover:text-orange-600 border border-transparent hover:border-orange-200 rounded-xl active:scale-90 transition-all"
            >
               <FiMenu size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* --- NEW PREMIUM MOBILE MENU (Side Drawer) --- */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* 1. Dark Background Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
            />
            
            {/* 2. Sliding Drawer Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-[60] shadow-2xl flex flex-col lg:hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <span className="text-lg font-bold text-gray-900">Menu</span>
                <button 
                  onClick={() => setMenuOpen(false)}
                  className="p-2 text-gray-500 hover:text-red-500 bg-gray-50 hover:bg-red-50 rounded-full transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6">
                
                {/* Search Bar inside Menu */}
                <div className="relative">
                   <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                   <input 
                     type="text" 
                     placeholder="Search here..." 
                     className="w-full bg-gray-100 border-none rounded-xl py-3.5 pl-11 pr-4 text-gray-700 focus:ring-2 focus:ring-orange-500/20 outline-none"
                   />
                </div>

                {/* Clean Navigation Links */}
                <nav className="flex flex-col gap-2">
                  {navLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => {
                        setActiveSection(item.id);
                        setMenuOpen(false);
                      }}
                      className={`flex items-center justify-between p-3.5 rounded-xl transition-all ${
                        activeSection === item.id 
                        ? "bg-orange-50 text-orange-600 font-bold" 
                        : "text-gray-700 font-medium hover:bg-gray-50 hover:text-orange-600"
                      }`}
                    >
                      {item.name}
                      <FiChevronRight size={18} className={activeSection === item.id ? "opacity-100" : "opacity-30"}/>
                    </Link>
                  ))}
                </nav>

                {/* Bottom Actions */}
                <div className="mt-auto pt-6 border-t border-gray-100 space-y-4">
                  {/* Internal Login Link (Hidden from Navbar but available here) */}
                  <button onClick={openLogin} className="w-full text-center text-gray-600 font-semibold hover:text-orange-600 py-2">
                    Already have an account? <span className="underline decoration-orange-500/50">Log In</span>
                  </button>
                  
                  {/* Big Sign Up Button */}
                  <button
                    onClick={openSignup}
                    className="w-full py-4 bg-orange-600 text-white text-lg font-bold rounded-xl shadow-lg shadow-orange-500/20 active:scale-95 transition-transform flex items-center justify-center gap-2"
                  >
                    Sign Up <FiArrowRight />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Popups */}
      <SignupPopup 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)} 
        onSwitchToLogin={openLogin}
      />
      
      <LoginPopup 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onSwitchToSignup={openSignup}
      />
    </>
  );
}