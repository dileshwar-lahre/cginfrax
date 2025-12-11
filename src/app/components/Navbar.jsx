"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiSearch, FiArrowRight, FiChevronDown } from "react-icons/fi";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // --- SCROLL & ACTIVE SECTION LOGIC ---
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
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
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
          scrolled ? "top-4" : "top-0 md:top-6"
        }`}
      >
        <div
          className={`
            relative flex items-center justify-between transition-all duration-500 ease-in-out
            bg-white/90 backdrop-blur-xl border border-white/20 shadow-lg shadow-black/5
            ${scrolled 
              ? "w-[95%] md:w-[90%] rounded-2xl py-3 px-6" 
              : "w-full max-w-7xl md:rounded-full py-4 px-8 bg-white/80"
            }
          `}
        >
          {/* 1. LOGO (CGINFRAX IMAGE) - BADA SIZE */}
          <Link href="#home" className="flex items-center gap-2 group z-10">
            {/* 👇 CHANGES HERE: w-32 -> w-48 (Mobile), md:w-40 -> md:w-64 (Desktop) */}
            <div className="relative w-48 h-12 md:w-64 md:h-16 overflow-hidden">
              <Image 
                src="/images/cginfrax_logo.png" 
                alt="CGINFRAX Logo" 
                fill 
                className="object-contain object-left transition-transform duration-500 group-hover:scale-105" 
                priority 
              />
            </div>
          </Link>

          {/* 2. CENTER LINKS */}
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
            {/* Expandable Search */}
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

            <Link
              href="#contact"
              onClick={() => setActiveSection('contact')}
              className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30 active:scale-95 transition-all duration-300"
            >
              Contact Us <FiArrowRight />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2.5 text-gray-800 bg-gray-100/80 rounded-full hover:bg-gray-200 active:scale-90 transition-all"
            >
              {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-3xl pt-24 pb-10 px-6 flex flex-col"
          >
             <div className="flex flex-col h-full justify-between max-w-lg mx-auto w-full">
               
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.1 }}
                 className="relative"
               >
                 <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                 <input 
                   type="text" 
                   placeholder="Search..." 
                   className="w-full bg-gray-100 border-none rounded-2xl py-4 pl-12 pr-4 text-lg focus:ring-2 focus:ring-orange-500/20 outline-none"
                 />
               </motion.div>

               <nav className="flex flex-col items-center gap-6 my-8">
                 {navLinks.map((item, i) => (
                   <motion.div
                     key={item.name}
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.1 + i * 0.1 }}
                   >
                     <Link
                       href={item.href}
                       onClick={() => {
                         setActiveSection(item.id);
                         setMenuOpen(false);
                       }}
                       className={`text-4xl md:text-5xl font-bold tracking-tight transition-colors ${
                         activeSection === item.id ? "text-orange-600" : "text-gray-900 hover:text-gray-500"
                       }`}
                     >
                       {item.name}
                     </Link>
                   </motion.div>
                 ))}
               </nav>

               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5 }}
                 className="flex flex-col gap-4"
               >
                 <Link
                   href="#contact"
                   onClick={() => setMenuOpen(false)}
                   className="w-full py-4 bg-orange-600 text-white text-xl font-semibold rounded-2xl flex justify-center items-center gap-2 shadow-xl shadow-orange-500/20 active:scale-95 transition-transform"
                 >
                   Get Started Now <FiArrowRight />
                 </Link>
               </motion.div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}