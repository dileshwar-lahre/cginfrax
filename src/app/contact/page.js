'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Building, ArrowRight } from 'lucide-react';

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate submission
    setTimeout(() => setFormStatus('success'), 2000);
  };

  return (
    <main className="bg-gray-50 min-h-screen font-sans selection:bg-orange-200 selection:text-orange-800">

      {/* --- HERO SECTION --- */}
      <section className="relative w-full py-20 bg-gray-900 text-center px-6 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
            <div className="absolute right-0 top-0 w-96 h-96 bg-orange-500 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute left-0 bottom-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto mt-10">
          <motion.h1 
            initial="hidden" animate="visible" variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Let's Build Your <span className="text-orange-500">Dream</span>
          </motion.h1>
          <motion.p 
            initial="hidden" animate="visible" variants={fadeInUp}
            className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Chahe naya ghar banana ho ya plot khareedna. Hum ek call ki doori par hain.
            Raipur • Bhilai • Bilaspur
          </motion.p>
        </div>
      </section>

      {/* --- MAIN CONTENT: FORM & INFO --- */}
      <section className="px-6 py-16 max-w-7xl mx-auto -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

          {/* LEFT: Contact Information Card */}
          <motion.div 
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
             className="flex flex-col gap-8"
          >
            {/* Info Box */}
            <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
               
               <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                 Contact Info <span className="h-px flex-1 bg-gray-700"></span>
               </h3>

               <div className="space-y-8">
                 <ContactItem 
                    icon={Phone} 
                    title="Call Us Directly" 
                    value="+91 98765-43210" 
                    subValue="+91 70000-12345"
                    action="tel:+919876543210"
                 />
                 <ContactItem 
                    icon={Mail} 
                    title="Email Support" 
                    value="hello@cginfra.com" 
                    subValue="sales@cginfra.com"
                    action="mailto:hello@cginfra.com"
                 />
                 <ContactItem 
                    icon={MapPin} 
                    title="Head Office" 
                    value="2nd Floor, Bottle House," 
                    subValue="Shankar Nagar, Raipur (C.G.)"
                 />
                 <ContactItem 
                    icon={Clock} 
                    title="Office Hours" 
                    value="Mon - Sat: 10:00 AM - 7:00 PM" 
                    subValue="Sunday Closed"
                 />
               </div>

               {/* WhatsApp Button */}
               <div className="mt-10 pt-8 border-t border-gray-800">
                  <a href="https://wa.me/919876543210" target="_blank" className="flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-green-500/30">
                    <MessageCircle size={24} /> Chat on WhatsApp
                  </a>
               </div>
            </div>
          </motion.div>

          {/* RIGHT: Modern Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Send a Message</h2>
              <p className="text-gray-500 mt-2">Hum 24 ghante ke andar reply karte hain.</p>
            </div>

            {formStatus === 'success' ? (
              <div className="h-64 flex flex-col items-center justify-center text-center bg-green-50 rounded-2xl border border-green-100 p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                  <Send size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Message Sent!</h3>
                <p className="text-gray-600 mt-2">Thank you. Hamari team aapse jaldi contact karegi.</p>
                <button onClick={() => setFormStatus('idle')} className="mt-6 text-sm font-semibold text-green-700 underline">Send another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Your Name</label>
                    <input type="text" placeholder="Rahul Sharma" required className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                    <input type="tel" placeholder="+91 99999 99999" required className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Interested In?</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Construction', 'Buy Plot', 'Interior', 'Rent/PG'].map((type) => (
                      <label key={type} className="cursor-pointer">
                        <input type="radio" name="service" className="peer sr-only" />
                        <span className="block text-center text-sm py-2 px-1 rounded-lg border border-gray-200 bg-white text-gray-600 peer-checked:bg-orange-600 peer-checked:text-white peer-checked:border-orange-600 transition-all hover:bg-gray-50">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Message</label>
                  <textarea rows={4} placeholder="Mujhe 1200 sqft plot par ghar banana hai..." className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all resize-none"></textarea>
                </div>

                <button disabled={formStatus === 'submitting'} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'} <ArrowRight size={20} />
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </section>

      {/* --- MAP SECTION --- */}
      <section className="w-full h-[400px] bg-gray-200 relative grayscale hover:grayscale-0 transition-all duration-700">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118983.65581977717!2d81.5649938833908!3d21.26197287714243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28dda23be28229%3A0x163ee1204498e21e!2sRaipur%2C%20Chhattisgarh!5e0!3m2!1sen!2sin!4v1714900000000!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        ></iframe>
        
        {/* Overlay Card on Map */}
        <div className="absolute bottom-6 left-6 md:left-20 bg-white p-4 rounded-xl shadow-2xl max-w-xs hidden md:block">
           <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                <Building size={20} />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Visit our Office</p>
                <p className="text-xs text-gray-500">bilaspur Chhattisgarh</p>
              </div>
           </div>
        </div>
      </section>

    </main>
  );
}

// Helper Component for Info Items
function ContactItem({ icon: Icon, title, value, subValue, action }) {
  const Content = () => (
    <div className="flex items-start gap-4 group cursor-pointer">
      <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 border border-gray-700">
        <Icon size={24} />
      </div>
      <div>
        <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">{title}</p>
        <h4 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">{value}</h4>
        {subValue && <p className="text-gray-400 text-sm mt-1">{subValue}</p>}
      </div>
    </div>
  );

  return action ? <a href={action}>{Content()}</a> : Content();
}