"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiArrowRight, FiChevronRight, FiLogOut, FiUser } from "react-icons/fi";
import { Search, X } from 'lucide-react'; 

import SignupPopup from "./SignupPopup";
import LoginPopup from "./LoginPopup";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  
  // 1. STATE HOOKS
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // 2. HELPER FUNCTIONS
  const openLogin = () => { setIsSignupOpen(false); setIsLoginOpen(true); setMenuOpen(false); };
  const openSignup = () => { setIsLoginOpen(false); setIsSignupOpen(true); setMenuOpen(false); };

  // Links define kiye (Inka ID niche use hoga)
  const navLinks = [
    { name: "Home", href: "#home", id: "home" },
    { name: "About", href: "#about", id: "about" },
    { name: "Services", href: "#services", id: "services" },
    { name: "Projects", href: "#projects", id: "projects" },
  ];

  // 3. EFFECT HOOKS
  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [menuOpen]);

  // ✅ UPDATED: Scroll Handler with "Auto Highlight Logic"
  useEffect(() => {
    const handleScroll = () => {
      // 1. Navbar Background Logic (Transparent vs White)
      setScrolled(window.scrollY > 20);

      // 2. Auto-Highlight Menu Item Logic (Scroll Spy)
      // Thoda offset (100px) add kiya taki header ke niche aate hi highlight ho jaye
      const scrollPosition = window.scrollY + 100; 

      navLinks.forEach((link) => {
        const section = document.getElementById(link.id);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            setActiveSection(link.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks]);

  // 4. ✅ CRITICAL FIX: Profile page check
  if (pathname === "/profile") return null; 

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed inset-x-0 z-50 flex flex-col items-center transition-all duration-300 ${
          scrolled ? "top-0 md:top-4" : "top-0 md:top-6"
        }`}
      >
        <div
          className={`
            relative flex items-center justify-between transition-all duration-500 ease-in-out z-20
            bg-white/95 backdrop-blur-xl border-b md:border border-white/20 shadow-sm md:shadow-lg shadow-black/5
            ${scrolled 
              ? "w-full md:w-[95%] md:rounded-2xl py-3 px-4 md:px-6" 
              : "w-full md:max-w-7xl md:rounded-full py-3 md:py-4 px-4 md:px-8 bg-white/90"
            }
          `}
        >
          {/* 1. LOGO */}
          <Link href="#home" className="flex items-center gap-2 group z-10">
            <div className="relative w-56 h-16 md:w-72 md:h-20 overflow-hidden">
              <Image 
                src="/images/cginfrax_logo.png" 
                alt="CGINFRAX Logo" 
                fill 
                sizes="(max-width: 768px) 224px, 288px"
                className="object-contain object-left" 
                priority 
              />
            </div>
          </Link>

          {/* 2. CENTER LINKS (Desktop Only) */}
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
                   <span className={`relative z-10 ${isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`}>
                     {item.name}
                   </span>
                 </Link>
               );
             })}
          </nav>

          {/* 3. RIGHT ACTIONS */}
          <div className="flex items-center gap-2 md:gap-4 z-10">
            
            {/* DESKTOP SEARCH */}
            <div className={`hidden md:flex items-center transition-all duration-300 ${searchOpen ? 'w-64 bg-gray-50' : 'w-10 bg-transparent'} rounded-full border ${searchOpen ? 'border-gray-200 pl-4 pr-2' : 'border-transparent justify-center'}`}>
               {searchOpen && (
                 <input 
                   autoFocus type="text" placeholder="Search..." onBlur={() => setSearchOpen(false)}
                   className="bg-transparent border-none outline-none text-sm w-full text-gray-700"
                 />
               )}
               <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-full hover:bg-gray-100"
              >
                 <Search size={20} strokeWidth={2.5} />
               </button>
            </div>

            {/* MOBILE SEARCH ICON */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`md:hidden p-2 rounded-full transition-colors ${searchOpen ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
            >
               {searchOpen ? <X size={22} strokeWidth={2.5} /> : <Search size={22} strokeWidth={2.5} />}
            </button>

            {/* --- AUTH BUTTONS (Desktop) --- */}
            {session ? (
              // If Logged In: Show Profile Icon
              <Link href="/profile" className="hidden md:block relative group ml-2">
                <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white shadow-md overflow-hidden transition-transform transform group-hover:scale-110 flex items-center justify-center">
                   {session.user?.image ? (
                     <Image 
                       src={session.user.image} 
                       alt="Profile" 
                       fill 
                       sizes="40px"
                       className="object-cover"
                     />
                   ) : (
                     <FiUser className="text-white" size={20} />
                   )}
                </div>
              </Link>
            ) : (
              // ✅ SIGN UP BUTTON ONLY
              <button onClick={openSignup} className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-blue-600 transition-all duration-300">
                Sign Up <FiArrowRight />
              </button>
            )}

            {/* MOBILE MENU TOGGLE */}
            <button onClick={() => setMenuOpen(true)} className="lg:hidden p-2 text-gray-800 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 rounded-xl active:scale-90 transition-all">
               <FiMenu size={24} />
            </button>
          </div>
        </div>

        {/* --- MOBILE FLOATING SEARCH BAR --- */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="w-full bg-white md:hidden overflow-hidden border-b border-gray-100 shadow-sm z-10"
            >
              <div className="p-4 px-6">
                <div className="relative flex items-center bg-gray-100 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                  <Search className="text-gray-400 mr-3" size={20} strokeWidth={2.5} />
                  <input 
                    autoFocus type="text" placeholder="Search properties..." 
                    className="bg-transparent border-none outline-none text-gray-700 w-full font-medium"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- MOBILE MENU DRAWER --- */}
        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
              />
              <motion.div
                initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-[60] shadow-2xl flex flex-col lg:hidden"
              >
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                  <span className="text-lg font-bold text-gray-900">Menu</span>
                  <button onClick={() => setMenuOpen(false)} className="p-2 text-gray-500 hover:text-red-500 bg-gray-50 hover:bg-red-50 rounded-full transition-colors">
                    <X size={24} strokeWidth={2.5} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6">
                  <nav className="flex flex-col gap-2">
                    {navLinks.map((item) => (
                      <Link
                        key={item.name} href={item.href}
                        onClick={() => { setActiveSection(item.id); setMenuOpen(false); }}
                        className={`flex items-center justify-between p-3.5 rounded-xl transition-all ${
                          activeSection === item.id 
                          ? "bg-blue-50 text-blue-600 font-bold" 
                          : "text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600"
                        }`}
                      >
                        {item.name}
                        <FiChevronRight size={18} className={activeSection === item.id ? "opacity-100" : "opacity-30"}/>
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-auto pt-6 border-t border-gray-100 space-y-4">
                    {session ? (
                      <div className="space-y-3">
                         <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-4">
                            <div className="w-12 h-12 relative rounded-full overflow-hidden border border-gray-200 bg-blue-600 flex items-center justify-center text-white">
                               {session.user?.image ? (
                                 <Image src={session.user.image} alt="Profile" fill className="object-cover" />
                               ) : (
                                 <FiUser size={24} />
                               )}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">{session.user?.name}</p>
                              <p className="text-xs text-gray-500">{session.user?.email}</p>
                            </div>
                         </div>
                         <Link href="/profile" onClick={() => setMenuOpen(false)} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
                           <FiUser /> View Profile
                         </Link>
                         <button onClick={() => signOut()} className="w-full py-3 border border-red-200 text-red-500 font-bold rounded-xl hover:bg-red-50 flex items-center justify-center gap-2">
                           <FiLogOut /> Logout
                         </button>
                      </div>
                    ) : (
                      <>
                        <button onClick={openLogin} className="w-full text-center text-gray-600 font-semibold hover:text-blue-600 py-2">
                          Already have an account? <span className="underline decoration-blue-500/50">Log In</span>
                        </button>
                        <button onClick={openSignup} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2">
                          Sign Up <FiArrowRight />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <SignupPopup isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} onSwitchToLogin={openLogin}/>
        <LoginPopup isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onSwitchToSignup={openSignup}/>
      </motion.header>
    </>
  );
}