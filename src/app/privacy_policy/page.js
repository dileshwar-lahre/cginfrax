'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, ShieldCheck, Database, Server, FileWarning, Mail, CheckCircle } from 'lucide-react';

// Animation
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-slate-50 min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-700">
      
      {/* --- HERO SECTION --- */}
      <section className="bg-white border-b border-gray-200 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial="hidden" animate="visible" variants={fadeInUp}
          >
            <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600">
              <Lock size={32} />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Aapka data hamare paas 100% safe hai. Hum aapki information kisi bhi <span className="text-red-500 font-semibold">Third-Party Broker</span> ko nahi bechte.
            </p>
            <p className="text-xs text-gray-400 mt-4 uppercase tracking-wider">Last Updated: Nov 2024</p>
          </motion.div>
        </div>
      </section>

      {/* --- CONTENT GRID --- */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Collection */}
          <PolicyCard 
            icon={Database}
            title="1. What We Collect"
            content="Hum aapse sirf basic jaankaari lete hain: Aapka Naam, Phone Number, aur Property Requirement. Yeh sirf isliye taaki hum aapko sahi Company/Builder se connect kar sakein."
          />

          {/* Card 2: Usage (Crucial Point) */}
          <PolicyCard 
            icon={Eye}
            title="2. How We Use Your Data"
            content="Aapka data sirf 2 jagah use hota hai: (1) Aapki Site Visit arrange karne ke liye, aur (2) Legal Paperwork banate waqt. Hum spam calls ya marketing messages nahi bhejte."
          />

          {/* Card 3: Sharing Policy (The Broker Point) */}
          <PolicyCard 
            icon={FileWarning}
            title="3. No Data Selling (Strict)"
            content="Humara business model 'Fixed Fee' hai, 'Data Selling' nahi. Hum aapka number kisi bhi Real Estate Agent, Loan Agent, ya Marketing Agency ko nahi bechte."
            highlight={true} // Special Highlight
          />

          {/* Card 4: Security */}
          <PolicyCard 
            icon={Server}
            title="4. Data Security"
            content="Aapki details hamare secure servers par encrypted form mein store hoti hain. Sirf authorized staff hi ise access kar sakta hai."
          />

          {/* Card 5: Cookies */}
          <PolicyCard 
            icon={ShieldCheck}
            title="5. Cookies & Tracking"
            content="Humari website user experience behtar banane ke liye basic cookies use karti hai. Hum aapki location tab tak track nahi karte jab tak aap khud permission na dein."
          />

          {/* Card 6: Your Rights */}
          <PolicyCard 
            icon={CheckCircle}
            title="6. Your Rights"
            content="Aap kabhi bhi hamein email karke apna data delete karne ki request kar sakte hain. Hum 24 hours ke andar aapka record mita denge."
          />

        </div>
      </section>

      {/* --- CONTACT FOR PRIVACY --- */}
      <section className="py-16 text-center px-6">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Privacy se juda koi sawaal?</h3>
          <p className="text-gray-500 mb-6">Agar aapko lagta hai ki aapka data misuse hua hai, toh turant report karein.</p>
          <a href="mailto:privacy@cginfra.com" className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:underline">
            <Mail size={20} /> privacy@cginfra.com
          </a>
        </div>
      </section>

    </main>
  );
}

// Helper Component for Clean Cards
function PolicyCard({ icon: Icon, title, content, highlight = false }) {
  return (
    <motion.div 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true }} 
      variants={fadeInUp}
      className={`p-8 rounded-2xl border transition-all hover:shadow-lg ${
        highlight 
          ? 'bg-red-50 border-red-100' 
          : 'bg-white border-gray-100'
      }`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
        highlight ? 'bg-red-100 text-red-600' : 'bg-indigo-50 text-indigo-600'
      }`}>
        <Icon size={24} />
      </div>
      <h3 className={`text-xl font-bold mb-3 ${highlight ? 'text-red-700' : 'text-gray-900'}`}>
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed text-sm md:text-base">
        {content}
      </p>
    </motion.div>
  );
}