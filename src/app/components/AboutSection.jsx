'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Target, Heart, TrendingUp, ArrowRight, Quote, 
  ShieldCheck, AlertTriangle, CheckCircle2, Sparkles 
} from 'lucide-react';

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.2, delayChildren: 0.1 } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 50, damping: 20 } 
  }
};

export function AboutSection() {
  return (
    <section id="about" className="bg-white font-sans selection:bg-orange-500 selection:text-white overflow-hidden">
      
      {/* --- 1. HERO SECTION: DARK & BOLD --- */}
      <div className="relative w-full py-24 md:py-40 bg-gray-950 text-center px-6 isolate">
        
        {/* Abstract Background (CSS Pattern) */}
        <div className="absolute inset-0 -z-10 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(#ff7700_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>
        {/* Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-orange-500/10 blur-[100px] rounded-full -z-10"></div>

        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={containerVariants}
          className="max-w-4xl mx-auto relative"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-orange-400 text-sm font-semibold tracking-wide uppercase">
              <Sparkles size={14} className="animate-pulse" />
              Since 2015 • Trusted by Chhattisgarh
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tight leading-[1.1]">
            Hum Property Nahi, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-red-500">
              Bharosa
            </span> Bechate Hain.
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-gray-400 text-lg md:text-2xl max-w-2xl mx-auto font-light leading-relaxed">
            Brokers aur hidden charges ka khel khatam. <br className="hidden md:block" />
            <span className="text-white font-medium">CG Infra</span> lata hai aapko seedha builder ke paas.
          </motion.p>
        </motion.div>
      </div>

      {/* --- 2. THE CONFLICT (Problem vs Solution) --- */}
      <div className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Kyun Zaroorat Padi <span className="underline decoration-orange-500 underline-offset-4 decoration-4">CG Infra</span> Ki?
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
          {/* Problem Card (Negative Space) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="group relative p-8 md:p-12 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:border-gray-200 transition-all"
          >
            <div className="absolute top-8 right-8 text-gray-200 group-hover:text-red-100 transition-colors">
              <AlertTriangle size={80} strokeWidth={1} />
            </div>
            <div className="w-14 h-14 bg-white shadow-sm rounded-2xl flex items-center justify-center text-red-500 mb-6 border border-red-100">
               <span className="text-2xl font-bold">❌</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Purana Tareeka</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Pehle plot lene ke liye <strong>4-5 brokers</strong> beech mein aate the. Har koi apna commission jodta tha, aur aam aadmi ko property mehngi milti thi. Na transparency thi, na koi guarantee.
            </p>
          </motion.div>

          {/* Solution Card (Positive Space) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="group relative p-8 md:p-12 bg-orange-600 rounded-[2.5rem] text-white shadow-2xl shadow-orange-200 overflow-hidden"
          >
            {/* Decoration */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white mb-6 border border-white/30">
               <CheckCircle2 size={28} />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">CG Infra Ka Tareeka</h3>
            <p className="text-orange-50 text-lg leading-relaxed font-medium">
              Humne banaya ek <strong>Direct Setu (Bridge)</strong>. Koi middleman nahi. Seedha deal company ke sath. Transaprent rates aur hidden charges zero. Hum sirf zameen nahi, sukoon dete hain.
            </p>
          </motion.div>
        </div>
      </div>

      {/* --- 3. NUMBERS THAT SPEAK --- */}
      <div className="bg-gray-900 py-20 text-white relative">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 text-center">
              <StatBox number="1,200+" label="Families Settled" delay={0} />
              <StatBox number="₹5 Cr+" label="Brokerage Saved" delay={0.1} />
              <StatBox number="50+" label="Verified Projects" delay={0.2} />
              <StatBox number="8 Yrs" label="Market Trust" delay={0.3} />
            </div>
        </div>
      </div>

      {/* --- 4. CORE VALUES --- */}
      <div className="py-24 px-6 max-w-7xl mx-auto bg-white">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <ValueCard 
            icon={Target} 
            title="100% Transparency" 
            desc="Jo rate company ki sheet par hai, wahi aapka hai. Ek rupaye ka bhi hidden charge nahi." 
          />
          <ValueCard 
            icon={Heart} 
            title="Customer Obsession" 
            desc="Deal close karne se zyada zaroori hai aapki santushti (satisfaction) aur vishwas." 
          />
          <ValueCard 
            icon={TrendingUp} 
            title="Growth Mindset" 
            desc="Hum sirf wahi projects suggest karte hain jahan hum khud invest karna chahenge." 
          />
        </motion.div>
      </div>

      {/* --- 5. FOUNDERS (Minimal & Stylized) --- */}
      <div className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">The Visionaries</h2>
            <p className="text-gray-500 mt-2">Dimaag Business ka, Dil Hindustani.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FounderCard 
              initials="RV"
              name="Rahul Verma"
              role="Founder & CEO"
              quote="Mera maqsad Chhattisgarh ke Real Estate ko India ka sabse transparent market banana hai."
            />
            <FounderCard 
              initials="AS"
              name="Amit Singh"
              role="Head of Operations"
              quote="Speed aur Quality hamari pehchan hai. Hum waade se pehle project deliver karte hain."
            />
          </div>
        </div>
      </div>

      {/* --- 6. CTA SECTION --- */}
      <div className="py-24 px-6 bg-white">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto bg-gradient-to-br from-gray-950 to-gray-800 rounded-[3rem] p-10 md:p-24 text-center relative overflow-hidden shadow-2xl"
        >
          {/* Abstract Orange Gradient Blob */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/20 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2"></div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Fraud se bachein,<br /> <span className="text-orange-400">Sahi chunein.</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Agar aap bhi brokers se tang aa chuke hain, toh ek baar hamare office aayein. Fark aap khud mehsoos karenge.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-lg shadow-orange-500/30 inline-flex items-center gap-3"
            >
              Book a Free Consultation <ArrowRight size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>

    </section>
  );
}

// --- SUB COMPONENTS (Kept clean within the same file for ease) ---

function StatBox({ number, label, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay, duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <h3 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-2">
        {number}
      </h3>
      <p className="text-orange-500 font-semibold text-sm tracking-widest uppercase">{label}</p>
    </motion.div>
  );
}

function ValueCard({ icon: Icon, title, desc }) {
  return (
    <motion.div 
      variants={itemVariants}
      className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all duration-300 group"
    >
      <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-500 leading-relaxed text-lg">{desc}</p>
    </motion.div>
  );
}

function FounderCard({ initials, name, role, quote }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-gray-100 relative overflow-hidden group"
    >
      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-orange-400 to-orange-600"></div>
      
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-white border-2 border-white shadow-md flex items-center justify-center text-gray-400 font-bold text-2xl group-hover:text-orange-600 group-hover:border-orange-100 transition-colors">
          {initials}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
          <p className="text-orange-600 font-medium text-sm uppercase tracking-wider mb-4">{role}</p>
          <div className="relative">
            <Quote size={20} className="text-gray-300 absolute -top-2 -left-2 transform -scale-x-100" />
            <p className="text-gray-600 italic text-lg leading-relaxed pl-6 relative z-10">
              {quote}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}