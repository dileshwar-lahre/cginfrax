'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, FileSignature, Landmark, Gavel, 
  UserX, Scale, Mail, AlertTriangle, CheckCircle2 
} from 'lucide-react';

// Animation for smooth entry
const fadeInUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function TermsPage() {
  return (
    <main className="bg-white min-h-screen font-sans pb-24">
      
      {/* --- CLEAN & SIMPLE HEADER --- */}
      <section className="pt-24 pb-12 px-6 border-b border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            
            {/* Simple Blue Badge */}
            <div className="inline-block bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
              Legal Agreement
            </div>
            
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
              Terms & Conditions
            </h1>
            <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Please read our rules carefully. Transparency is our core value.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- CONTENT CONTAINER --- */}
      <div className="max-w-3xl mx-auto px-6 mt-10">
        
        {/* 🔥 CRITICAL WARNING BOX (High Alert) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-red-50 border border-red-100 rounded-2xl p-6 md:p-8 mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="bg-white p-3 rounded-full w-fit h-fit shadow-sm shrink-0">
               <AlertTriangle size={28} className="text-red-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-700 mb-3">
                FRAUD ALERT / चेतावनी
              </h3>
              <div className="space-y-3 text-gray-800 text-sm md:text-base font-medium leading-relaxed">
                <p>
                  <strong>English:</strong> Do <u>NOT</u> pay cash to any broker or agent without an official receipt from <strong>CGINFRAX</strong>. We are not responsible for off-record transactions.
                </p>
                <div className="h-px bg-red-200 w-full"></div>
                <p className="text-red-800">
                  <strong>हिंदी:</strong> कृपया किसी भी एजेंट या ब्रोकर को बिना पक्की रसीद (Official Receipt) के नकद पैसे न दें। यदि आप बिना कंपनी की जानकारी के पैसे देते हैं, तो <strong>CGINFRAX</strong> की कोई जिम्मेदारी नहीं होगी।
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- TERMS SECTIONS (Clean Layout) --- */}
        <div className="space-y-12">

          {/* 1. Our Role */}
          <TermSection 
            title="1. Our Role: The Bridge"
          >
            <p className="mb-3">
              We are <strong>Consultants</strong>, not traditional brokers. Our role is to connect you (The Buyer) directly with the Seller, Builder, or Land Owner through <strong>CGINFRAX</strong> platform.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-500 marker:text-blue-500">
              <li>We charge a <strong>Fixed Service Fee</strong> for our services.</li>
              <li>We do not take hidden commissions.</li>
              <li>Final property rates are decided between You and the Owner directly.</li>
            </ul>
          </TermSection>

          {/* 2. Payment Policy */}
          <TermSection 
            title="2. Payment & Fees Policy"
          >
            <p className="mb-4">
              All payments (Registration Fee / Service Charge) must be made digitally to the official <strong>CGINFRAX</strong> company account.
            </p>
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-green-600" /> Who do you pay?
              </h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>👉 <strong>Service Charge:</strong> Pays to CGINFRAX Office Account.</li>
                <li>👉 <strong>Property Cost:</strong> Pays directly to Builder/Land Owner.</li>
              </ul>
            </div>
          </TermSection>

          {/* 3. Construction Services */}
          <TermSection 
            title="3. Construction Contracts"
          >
            <p className="mb-2">
              For construction projects, quotes provided on the <strong>CGINFRAX</strong> website are <strong>estimates</strong>. The final cost may vary based on:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-500 mb-3 marker:text-blue-500">
              <li>Changes in material market rates (Cement, Steel, etc.).</li>
              <li>Customizations requested by the client.</li>
            </ul>
            <p className="text-sm font-semibold text-slate-700">
              A separate legal agreement will be signed for every construction project.
            </p>
          </TermSection>

          {/* 4. Limitation of Liability */}
          <TermSection 
            title="4. Limitation of Liability"
          >
            <p>
              While we verify properties to the best of our ability, <strong>CGINFRAX</strong> is a facilitator. We are not liable for:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-500 mt-2 marker:text-red-500">
              <li>Legal disputes regarding land title arising in the future.</li>
              <li>Delay in possession caused directly by the Builder.</li>
              <li>Personal financial dealings done outside our knowledge.</li>
            </ul>
          </TermSection>

          {/* 5. Jurisdiction */}
          <TermSection 
            title="5. Jurisdiction"
          >
            <p>
              Any dispute arising out of the use of our services shall be subject to the exclusive jurisdiction of the courts in <strong>Bilaspur / Raipur (Chhattisgarh)</strong> only.
            </p>
          </TermSection>

        </div>

        {/* --- SIMPLE FOOTER --- */}
        <div className="mt-20 py-10 border-t border-gray-100 text-center">
          <p className="text-gray-500 mb-4">Still have questions?</p>
          <a 
            href="mailto:support@cginfrax.com"
            className="text-blue-600 font-bold hover:underline flex items-center justify-center gap-2"
          >
            <Mail size={18} /> support@cginfrax.com
          </a>
        </div>

      </div>
    </main>
  );
}

// --- Clean Text Section Component ---
function TermSection({ title, children }) {
  return (
    <section className="border-b border-gray-100 pb-10 last:border-0 last:pb-0">
      <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
        {title}
      </h2>
      <div className="text-gray-600 leading-7 text-sm md:text-base">
        {children}
      </div>
    </section>
  );
}