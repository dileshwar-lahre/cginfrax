'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Lock, EyeOff, Database, 
  Server, UserCheck, Mail, FileKey, Fingerprint 
} from 'lucide-react';

// Smooth Fade In Animation
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-gray-50 min-h-screen font-sans pb-24">
      
      {/* --- HERO HEADER (Bhara hua / Dark Theme) --- */}
      <section className="relative bg-slate-900 text-white pt-28 pb-20 px-6 rounded-b-[3rem] shadow-2xl overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
           <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-600/20 rounded-full blur-[80px]"></div>
           <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-purple-600/20 rounded-full blur-[80px]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-2xl mb-6 border border-white/10 shadow-lg">
              <Fingerprint size={32} className="text-blue-400" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
              Privacy Policy & <br/> <span className="text-blue-400">Data Safety</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Your trust is our capital. At <strong>CGINFRAX</strong>, we build homes, not databases. Your data stays safe with us.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- CONTENT CONTAINER --- */}
      <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-20">
        
        {/* 🔥 THE PLEDGE (NO DATA SELLING) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 md:p-10 mb-16 shadow-xl border border-gray-100 flex flex-col md:flex-row gap-8 items-center"
        >
          <div className="p-5 bg-red-50 rounded-2xl shrink-0">
            <EyeOff size={40} className="text-red-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">The "No-Spam" Promise</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              We are a service-based company, not a data broker. 
              <span className="text-red-600 font-bold mx-1 bg-red-50 px-1 rounded">We do not sell, trade, or rent</span> 
              your personal information to any third-party brokers, agents, or marketing agencies. Your number stays strictly with the <strong>CGINFRAX Team</strong>.
            </p>
          </div>
        </motion.div>

        {/* --- POLICY GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* 1. Collection */}
          <PolicyCard 
            icon={<Database size={24} className="text-blue-600"/>}
            title="1. What We Collect"
            color="blue"
          >
            We believe in minimalism. We only collect details necessary to serve you: Name, Mobile Number (for contact), and your Property Requirement.
          </PolicyCard>

          {/* 2. Usage */}
          <PolicyCard 
            icon={<UserCheck size={24} className="text-purple-600"/>}
            title="2. How We Use It"
            color="purple"
          >
            Used strictly for operations: Scheduling site visits, sending updates regarding your interest, and generating invoices.
          </PolicyCard>

          {/* 3. Security */}
          <PolicyCard 
            icon={<Lock size={24} className="text-green-600"/>}
            title="3. Data Security"
            color="green"
          >
            Your information is stored on secure, encrypted cloud servers. Access is restricted to authorized <strong>CGINFRAX</strong> personnel only via SSL encryption.
          </PolicyCard>

          {/* 4. Third Parties */}
          <PolicyCard 
            icon={<Server size={24} className="text-orange-600"/>}
            title="4. Third-Party Sharing"
            color="orange"
          >
            We share data <strong>only</strong> when absolutely necessary: with Payment Gateways for secure transactions or if required by Indian Law.
          </PolicyCard>

          {/* 5. User Control */}
          <PolicyCard 
            icon={<FileKey size={24} className="text-slate-600"/>}
            title="5. Your Control"
            color="slate"
          >
            You own your data. You can request a copy of the data we hold or request complete deletion of your account/data at any time.
          </PolicyCard>

        </div>

        {/* --- FOOTER --- */}
        <div className="mt-20 pt-10 border-t border-gray-200 text-center">
          <p className="text-gray-500 mb-4 font-medium">Want your data removed?</p>
          <a 
            href="mailto:support@cginfrax.com"
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-all active:scale-95"
          >
            <Mail size={18} /> support@cginfrax.com
          </a>
        </div>

      </div>
    </main>
  );
}

// --- Helper Component for Cards ---
function PolicyCard({ icon, title, children, color }) {
  return (
    <div className={`bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:border-${color}-200`}>
      <div className={`w-12 h-12 bg-${color}-50 rounded-xl flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm md:text-base">
        {children}
      </p>
    </div>
  );
}