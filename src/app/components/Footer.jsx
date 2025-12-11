'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin, Phone, Mail, MapPin, MessageCircle, Heart, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // Changed background to a modern deep Indigo/Midnight Blue
    <footer className="bg-[#0F172A] text-gray-300 font-sans relative overflow-hidden">
      
      {/* Subtle Background gradient effect for modern feel */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* --- MAIN FOOTER CONTENT --- */}
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Col 1: Brand Info (Span 4 columns on large screens) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              {/* Modern Logo Style */}
              <span className="text-4xl font-extrabold text-white tracking-tight flex items-center gap-1">
                CG<span className="text-blue-500">INFRA</span>.
              </span>
            </Link>
            <p className="text-gray-400 text-base leading-relaxed pr-4">
              Chhattisgarh's 1st <strong className="text-blue-400">Tech-Enabled</strong> No-Brokerage Real Estate Platform. Hum property khareedne ka tareeka badal rahe hain. Transparency, Speed, and Trust.
            </p>
            
            {/* Modern Social Icons */}
            <div className="flex gap-3 pt-4">
              <SocialLink icon={Facebook} href="#" />
              <SocialLink icon={Instagram} href="#" />
              <SocialLink icon={Twitter} href="#" />
              <SocialLink icon={Linkedin} href="#" />
            </div>
          </div>

          {/* Col 2: Quick Links (Span 2 columns) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-4">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/about" label="About Us" />
              <FooterLink href="/services" label="Our Services" />
              <FooterLink href="/business-model" label="How We Work" badge="New" />
            </ul>
          </div>

          {/* Col 3: Support & Legal (Span 2 columns) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-lg mb-6">Support & Legal</h4>
            <ul className="space-y-4">
              <FooterLink href="/contact" label="Help Center" />
              <FooterLink href="/privacy-policy" label="Privacy Policy" />
              <FooterLink href="/terms" label="Terms & Conditions" />
              <FooterLink href="#" label="Fraud Alert" />
            </ul>
          </div>

          {/* Col 4: APP DOWNLOAD & Contact (Span 4 columns) */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-bold text-lg mb-6">Get the App & Contact</h4>
            <p className="text-gray-400 mb-6 text-sm">
              Behtar experience ke liye hamara app download karein. Real-time updates aur verified listings.
            </p>
            
            {/* --- APP BUTTONS --- */}
            <div className="flex flex-wrap gap-4 mb-10">
              {/* App Store Button */}
              <a href="#" className="flex items-center gap-3 bg-[#1E293B] hover:bg-blue-600 text-white px-4 py-2.5 rounded-xl transition-all duration-300 border border-gray-700 hover:border-blue-500 group w-full sm:w-auto justify-center sm:justify-start">
                <svg className="w-8 h-8 fill-current group-hover:text-white transition-colors" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.79-1.31.02-2.3-1.23-3.14-2.47-1.72-2.52-2.96-6.99-1.18-10.2 1.03-1.83 2.91-3.06 5.16-3.1 1.53.03 2.9.97 3.71.97.81 0 2.33-1.17 3.99-1 2.12.15 3.77.99 4.89 2.54-4.25 2.1-3.52 8.06.8 9.79zm-3.88-15.18c.9-1.23 1.44-2.91 1.33-4.32-1.48.07-3.19.95-4.19 2.26-.89 1.16-1.41 2.85-1.31 4.3 1.61.11 3.26-.89 4.17-2.24z"/></svg>
                <div className="text-left">
                  <div className="text-[10px] uppercase font-medium tracking-wider opacity-70">Download on the</div>
                  <div className="text-lg font-bold leading-none">App Store</div>
                </div>
              </a>

              {/* Google Play Button */}
              <a href="#" className="flex items-center gap-3 bg-[#1E293B] hover:bg-blue-600 text-white px-4 py-2.5 rounded-xl transition-all duration-300 border border-gray-700 hover:border-blue-500 group w-full sm:w-auto justify-center sm:justify-start">
                <svg className="w-8 h-8 fill-current group-hover:text-white transition-colors" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L15.25,13.56L4.5,24.31C4.62,24.35 4.74,24.38 4.87,24.4C5.3,24.47 5.74,24.32 6.05,24L16.81,15.12M21.83,12.5C22.21,12.15 22.21,11.54 21.83,11.18L17.74,7.45L16.13,9.07L21.83,12.5M4.5,0.29L15.25,11.04L16.81,9.48L6.05,0.6C5.74,0.28 5.3,0.13 4.87,0.2C4.74,0.22 4.62,0.25 4.5,0.29Z" /></svg>
                <div className="text-left">
                  <div className="text-[10px] uppercase font-medium tracking-wider opacity-70">Get it on</div>
                  <div className="text-lg font-bold leading-none">Google Play</div>
                </div>
              </a>
            </div>

            {/* Contact Details (Modern List) */}
            <ul className="space-y-3 text-sm border-t border-gray-800 pt-6">
              <li className="flex items-start gap-3 group cursor-pointer">
                <MapPin className="text-blue-500 shrink-0 mt-0.5 group-hover:text-white transition-colors" size={18} />
                <span className="text-gray-400 group-hover:text-white transition-colors">Shankar Nagar, Raipur (C.G.)</span>
              </li>
              <li>
                <a href="tel:+919876543210" className="flex items-center gap-3 group">
                  <Phone className="text-blue-500 shrink-0 group-hover:text-white transition-colors" size={18} />
                  <span className="text-gray-400 group-hover:text-white transition-colors">+91 98765-43210</span>
                </a>
              </li>
              <li>
                <a href="mailto:hello@cginfra.com" className="flex items-center gap-3 group">
                  <Mail className="text-blue-500 shrink-0 group-hover:text-white transition-colors" size={18} />
                  <span className="text-gray-400 group-hover:text-white transition-colors">hello@cginfra.com</span>
                </a>
              </li>
               {/* WhatsApp Button Small */}
               <li className="pt-3">
                <a href="https://wa.me/919876543210" target="_blank" className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 font-semibold transition-colors">
                  <MessageCircle size={18} /> Chat on WhatsApp <ArrowUpRight size={16} />
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* --- BOTTOM BAR --- */}
      <div className="bg-[#0A0F1C] py-6 border-t border-gray-800/50 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {currentYear} CG Infra Technologies Pvt Ltd.</p>
          <div className="flex items-center gap-6">
             <span className="flex items-center gap-1">
              Made with <Heart size={14} className="text-red-500 fill-red-500" /> in Chhattisgarh
            </span>
            <Link href="/terms" className="hover:text-blue-400 transition-colors hidden md:block">Terms</Link>
            <Link href="/privacy-policy" className="hover:text-blue-400 transition-colors hidden md:block">Privacy</Link>
          </div>
         
        </div>
      </div>
    </footer>
  );
}

// --- Helper Components (For Cleaner Code) ---

// Social Media Icon Link
function SocialLink({ icon: Icon, href }) {
  return (
    <a href={href} className="w-10 h-10 rounded-lg bg-[#1E293B] flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300 border border-gray-800 hover:border-blue-500 hover:-translate-y-1">
      <Icon size={18} />
    </a>
  );
}

// Footer Navigation Link
function FooterLink({ href, label, badge }) {
  return (
    <li>
      <Link href={href} className="text-gray-400 hover:text-white transition-colors flex items-center justify-between group w-fit">
        <span className="flex items-center gap-2">
           <span className="w-1.5 h-1.5 rounded-full bg-blue-900 group-hover:bg-blue-400 transition-colors"></span>
          {label}
        </span>
        {badge && <span className="ml-2 text-[10px] font-bold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full uppercase">{badge}</span>}
      </Link>
    </li>
  );
}