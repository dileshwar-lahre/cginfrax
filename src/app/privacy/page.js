'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, ShieldCheck, Database, Server, FileWarning, Mail, CheckCircle, Smartphone } from 'lucide-react';

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.2 } }
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-slate-50 min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-800">
      
      {/* --- HERO SECTION --- */}
      <section className="bg-white pt-24 pb-12 px-6 border-b border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial="hidden" animate="visible" variants={fadeInUp}
          >
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600 border border-indigo-100">
              <Lock size={40} />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Privacy Policy & Data Safety
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Aapka trust hamari sabse badi poonji hai. Hum waada karte hain ki aapka personal data kisi bhi <span className="text-red-500 font-bold bg-red-50 px-2 py-1 rounded">Broker ya Agent</span> ko nahi becha jayega.
            </p>
            <p className="text-xs text-gray-400 mt-6 uppercase tracking-widest font-semibold">Last Updated: Nov 2025</p>
          </motion.div>
        </div>
      </section>

      {/* --- CORE POLICIES GRID --- */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <motion.div 
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          
          {/* 1. Data Collection */}
          <PolicyCard 
            icon={Database}
            title="1. Hum Kya Collect Karte Hain?"
            content="Hum aapse sirf zaroori jaankaari lete hain: Aapka Naam, Mobile Number, aur Property ki zaroorat (Requirement). Ye sirf isliye taaki hum aapko sahi plot/ghar dikha sakein."
            color="indigo"
          />

          {/* 2. Usage */}
          <PolicyCard 
            icon={Smartphone}
            title="2. Data Kaise Use Hota Hai?"
            content="Aapka number sirf hamari internal team use karti hai—Site Visit schedule karne ke liye ya aapko naye projects ki update dene ke liye. Hum spam calls nahi karte."
            color="blue"
          />

          {/* 3. NO SELLING (Most Important) */}
          <PolicyCard 
            icon={FileWarning}
            title="3. Strict No-Selling Policy"
            content="Yeh hamara sabse bada usool hai. Humara business model 'Service Charge' par chalta hai, 'Data Bechne' par nahi. Aapka number market mein kisi broker ke paas nahi jayega."
            color="red"
            highlight={true}
          />

          {/* 4. Security */}
          <PolicyCard 
            icon={Server}
            title="4. Data Security"
            content="Aapki details hamare secure servers par encrypted (code bhasha) form mein store hoti hain. Hamare staff ke alawa koi bahar ka aadmi isse access nahi kar sakta."
            color="green"
          />

          {/* 5. Cookies */}
          <PolicyCard 
            icon={Eye}
            title="5. Transparency"
            content="Hum website par basic cookies use karte hain taaki site fast chale. Hum aapki location ya camera bina aapki permission ke access nahi karte."
            color="orange"
          />

          {/* 6. User Rights */}
          <PolicyCard 
            icon={CheckCircle}
            title="6. Aapke Adhikaar (Rights)"
            content="Aap jab chahein hamein call karke apna data delete karne ki request kar sakte hain. Hum 24 ghante ke andar aapka record apne system se hata denge."
            color="teal"
          />

        </motion.div>
      </section>

      {/* --- TRUST BADGE / FOOTER CTA --- */}
      <section className="py-16 px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          
          <ShieldCheck size={48} className="mx-auto text-green-500 mb-6" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Koi sawal ya shikaayat?</h3>
          <p className="text-gray-600 mb-8 text-lg">
            Agar aapko lagta hai ki aapke data ka galat istemal hua hai, toh humein turant batayein. Hum sakht karyawahi (action) karenge.
          </p>
          
          <a 
            href="mailto:privacy@cginfra.com" 
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all"
          >
            <Mail size={20} /> privacy@cginfra.com
          </a>
        </motion.div>
      </section>

    </main>
  );
}

// Helper Component for Cards
function PolicyCard({ icon: Icon, title, content, color, highlight = false }) {
  // Dynamic styling based on highlight prop
  const cardStyle = highlight 
    ? "bg-red-50 border-red-200 shadow-md" 
    : "bg-white border-gray-100 hover:shadow-lg";

  const iconBg = highlight ? "bg-red-100 text-red-600" : `bg-${color}-50 text-${color}-600`;
  const titleColor = highlight ? "text-red-700" : "text-gray-900";

  return (
    <motion.div 
      variants={fadeInUp}
      className={`p-8 rounded-2xl border transition-all duration-300 ${cardStyle}`}
    >
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${iconBg}`}>
        <Icon size={28} />
      </div>
      <h3 className={`text-xl font-bold mb-3 ${titleColor}`}>
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {content}
      </p>
    </motion.div>
  );
}