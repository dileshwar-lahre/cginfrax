'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Handshake, XCircle, CheckCircle2, Building2, Users, Banknote, ArrowRightLeft, ShieldCheck } from 'lucide-react';

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function BusinessModelPage() {
  return (
    <main className="bg-white min-h-screen font-sans selection:bg-blue-100 selection:text-blue-800">
      
      {/* --- HERO SECTION: THE BRIDGE --- */}
      <section className="relative w-full py-24 bg-slate-900 text-center px-6 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 left-0 w-full h-full">
           <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-[80px]"></div>
           <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-[80px]"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-blue-500/10 border border-blue-500/50 text-blue-400 text-sm font-bold tracking-wide mb-6">
              <ShieldCheck size={16} /> REVOLUTION IN REAL ESTATE
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Direct Deal. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Fixed Fee.</span> <br />
              No Hidden Commission.
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Hum brokers nahi hain jo aapki property value ka % maange. 
              Hum <span className="text-white font-bold">Consultants</span> hain jo aapko Chhattisgarh ki Top Companies se 
              <span className="text-blue-400 font-bold mx-1">Direct Connect</span> karte hain, wo bhi ek chote se Fixed Service Charge par.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- THE CONCEPT VISUAL (The Bridge) --- */}
      <section className="py-16 bg-slate-50 relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-8 relative"
          >
            {/* YOU (Customer) */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-gray-100 w-full md:w-1/3 text-center relative z-10">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-600">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Aap (Client)</h3>
              <p className="text-sm text-gray-500 mt-2">Sapno ka ghar/land chahiye, par fraud se darr lagta hai.</p>
            </div>

            {/* THE BRIDGE (Your Company) */}
            <div className="flex flex-col items-center justify-center relative z-20">
               <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-xl shadow-blue-500/30 flex items-center gap-3">
                 <ArrowRightLeft size={24} />
                 <span className="font-bold">CG Infra (The Bridge)</span>
               </div>
               <div className="text-xs font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full mt-3">
                 Only Fixed Fee
               </div>
            </div>

            {/* THEM (Top Companies) */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-gray-100 w-full md:w-1/3 text-center relative z-10">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600">
                <Building2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Top Companies</h3>
              <p className="text-sm text-gray-500 mt-2">Verified Builders & Land Owners jinke saath humara Tie-up hai.</p>
            </div>

            {/* Connection Lines (Desktop only) */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-gray-200 via-blue-200 to-gray-200 -z-0 hidden md:block border-t-2 border-dashed border-gray-300"></div>

          </motion.div>
        </div>
      </section>

      {/* --- COMPARISON: WHY WE ARE BETTER --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Savings Calculation</h2>
          <p className="text-gray-500 text-lg">Dekhiye aap humare saath kitna paisa bacha rahe hain.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* THE OLD WAY (Bad) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-red-50 p-8 md:p-10 rounded-3xl border border-red-100 opacity-90 hover:opacity-100 transition-all"
          >
            <div className="flex items-center gap-3 mb-6 text-red-600">
              <XCircle size={28} />
              <h3 className="text-2xl font-bold">Local Brokers</h3>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-gray-700">
                <span className="font-bold text-red-500">Commission:</span> 
                2% of Deal Value.
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <span className="font-bold text-red-500">Hidden Costs:</span> 
                Rate badha kar batate hain taaki apna cut nikaal sakein.
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <span className="font-bold text-red-500">Transparency:</span> 
                Zero. Aapko kabhi asli owner se milne nahi denge.
              </li>
            </ul>

            <div className="bg-white p-4 rounded-xl border border-red-200 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Example: ₹50 Lakh Deal</p>
              <p className="text-3xl font-bold text-red-600 mt-1">₹1,00,000 Loss</p>
              <p className="text-xs text-red-400">(Broker Commission)</p>
            </div>
          </motion.div>

          {/* OUR WAY (Good) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border-2 border-blue-500 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">RECOMMENDED</div>
            
            <div className="flex items-center gap-3 mb-6 text-blue-600">
              <CheckCircle2 size={28} />
              <h3 className="text-2xl font-bold">CG Infra Model</h3>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-gray-700">
                <span className="font-bold text-blue-600">Fee:</span> 
                Fixed One-time Service Charge (e.g., ₹5k - ₹10k).
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <span className="font-bold text-blue-600">Direct Meeting:</span> 
                Aap seedha Builder/Owner se milenge.
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <span className="font-bold text-blue-600">Negotiation:</span> 
                Hum aapki taraf se best rate karwayenge.
              </li>
            </ul>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Example: ₹50 Lakh Deal</p>
              <p className="text-3xl font-bold text-green-600 mt-1">Only ₹10,000 Fee</p>
              <p className="text-xs text-green-600 font-bold">You Save: ₹90,000! 🎉</p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* --- HOW IT WORKS (Process) --- */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Simple 3-Step Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { title: "1. Consultation", desc: "Humare office aayein, fixed registration fee dein, aur apni requirement batayein." },
              { title: "2. Selection", desc: "Hum aapko hamare trusted partners (Companies) ke best options dikhayenge." },
              { title: "3. Direct Deal", desc: "Pasand aane par aap direct Company ko payment karenge. Hum sirf paperwork sambhalenge." }
            ].map((step, i) => (
              <div key={i} className="p-6 rounded-2xl bg-gray-800 border border-gray-700 hover:bg-gray-750 transition-colors">
                 <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl shadow-lg shadow-blue-500/50">
                   {i + 1}
                 </div>
                 <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                 <p className="text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TRUST BADGE --- */}
      <section className="py-16 text-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block bg-green-50 border border-green-200 p-8 rounded-3xl max-w-3xl"
        >
          <div className="flex justify-center mb-4 text-green-600">
            <Banknote size={40} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Paisa Kise Dena Hai?</h3>
          <p className="text-gray-600">
            <strong>Service Charge:</strong> Humare Office/Company Account mein.<br />
            <strong>Property/Construction Cost:</strong> Seedha Builder/Construction Company ke account mein.
          </p>
          <p className="mt-4 text-red-500 font-bold text-sm">
            Warning: Kisi bhi beech ke aadmi (Broker) ko cash na dein.
          </p>
        </motion.div>
      </section>

    </main>
  );
}