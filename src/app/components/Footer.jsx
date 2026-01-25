'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Facebook, Instagram, Twitter, Linkedin, 
  Phone, Mail, MapPin, MessageCircle, Heart, ArrowUpRight, Smartphone 
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0b1121] text-slate-400 font-sans border-t border-slate-800 relative overflow-hidden">
      
      {/* --- DECORATIVE ELEMENTS (Subtle Professional Glow) --- */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      <div className="absolute -top-[200px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10 relative z-10">
        
        {/* --- MAIN GRID LAYOUT (4 Equal Columns for Balance) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* COLUMN 1: BRANDING & SOCIALS */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-1">
                CG<span className="text-blue-500">INFRAX</span>.
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Chhattisgarh's 1st Tech-Enabled No-Brokerage Platform. 
              <br className="hidden lg:block" />Transparency. Speed. Trust.
            </p>
            
            {/* Social Icons Row */}
            <div className="flex gap-3">
              <SocialLink icon={Facebook} href="https://www.facebook.com/share/1axfg8mYaB/" />
              <SocialLink icon={Instagram} href="https://www.instagram.com/cginfrax?igsh=dXpnc2h2dDQ5eDh6" />
              <SocialLink icon={Linkedin} href="https://www.linkedin.com/company/cginfrax/" />
              <SocialLink icon={Twitter} href="#" />
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/about" label="About Us" />
              <FooterLink href="/services" label="Our Services" />
              <FooterLink href="/business-model" label="How We Work" badge="New" />
            </ul>
          </div>

          {/* COLUMN 3: SUPPORT & LEGAL */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">
              Support
            </h4>
            <ul className="space-y-3 text-sm">
              <FooterLink href="/contact" label="Contact Support" />
              <FooterLink href="/privacy-policy" label="Privacy Policy" />
              <FooterLink href="/terms" label="Terms & Conditions" />
              <FooterLink href="#" label="Report Fraud" />
            </ul>
          </div>

          {/* COLUMN 4: CONTACT INFO (High Priority) */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">
              Get in Touch
            </h4>
            <ul className="space-y-5 text-sm">
              
              {/* Address */}
              <li className="flex items-start gap-3">
                <MapPin className="text-blue-500 shrink-0 mt-0.5" size={18} />
                <span className="leading-relaxed">
                 House no255k,Ground floor,Office no1,DABRIPARA,KOTA,Kargi Road,Bilaspur(CGH),Kargi Road,Chattisgarh,India,495113
                </span>
              </li>

              {/* Phones */}
              <li className="flex items-start gap-3">
                <Phone className="text-blue-500 shrink-0 mt-0.5" size={18} />
                <div className="flex flex-col gap-1">
                  <a href="tel:+919131460470" className="hover:text-white transition-colors">+91 91314-60470</a>
                  <a href="tel:+917999066421" className="hover:text-white transition-colors">+91 79990-66421</a>
                  <a href="tel:+917999066421" className="hover:text-white transition-colors">+91 93028-28039</a>
                </div>
              </li>

              {/* Email */}
              <li className="flex items-center gap-3">
                <Mail className="text-blue-500 shrink-0" size={18} />
                <a href="mailto:support@cginfrax.com" className="hover:text-white transition-colors">
                  support@cginfrax.com
                </a>
              </li>

              {/* WhatsApp CTA */}
              <li className="pt-2">
                <a 
                  href="https://wa.me/919131460470" 
                  target="_blank" 
                  className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-white px-4 py-2.5 rounded-lg border border-green-500/20 transition-all duration-300 w-full sm:w-auto justify-center font-medium"
                >
                  <MessageCircle size={18} /> 
                  <span>Chat on WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* --- SEPARATOR --- */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>

        {/* --- BOTTOM BAR --- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} CG Infra Technologies Pvt Ltd. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 hover:text-slate-300 transition-colors">
              Made with <Heart size={12} className="text-red-500 fill-red-500 animate-pulse" /> in Chhattisgarh
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

// --- SUB COMPONENTS FOR CLEANER CODE ---

function SocialLink({ icon: Icon, href }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:-translate-y-1"
    >
      <Icon size={16} />
    </a>
  );
}

function FooterLink({ href, label, badge }) {
  return (
    <li>
      <Link href={href} className="group flex items-center gap-2 hover:text-white transition-colors w-fit">
        <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-blue-500 transition-colors"></span>
        {label}
        {badge && (
          <span className="text-[10px] font-bold bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded border border-blue-500/30">
            {badge}
          </span>
        )}
      </Link>
    </li>
  );
}