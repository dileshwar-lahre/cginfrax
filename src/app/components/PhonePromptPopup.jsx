"use client";

import { useState } from "react";
import { X, Phone, Loader2 } from "lucide-react";

export default function PhonePromptPopup({ isOpen, onClose, userEmail }) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // ✅ VALIDATION: 10 digits starting with 6-9
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = phone.trim().replace(/\D/g, "");
    
    if (cleanPhone.length !== 10 || !phoneRegex.test(cleanPhone)) {
      setError("Please enter a valid 10-digit Indian phone number");
      return;
    }

    setLoading(true);
    
    try {
      // 🚀 PATH FIXED: Tumhare folder structure ke hisaab se
      const res = await fetch("/api/user/update-mobile", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // 🚀 KEYS FIXED: API 'mobile' mang rahi hai, 'phone' nahi
        body: JSON.stringify({ 
          email: userEmail, 
          mobile: cleanPhone 
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Success logic
        onClose();
        alert("Mobile number updated successfully! ✅");
        if (typeof window !== 'undefined') {
          window.location.reload(); // Session refresh karne ke liye
        }
      } else {
        // API se aane wala specific error dikhao
        setError(data.error || data.message || "Failed to update number");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Server connection failed. Please check your internet.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[9999] px-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md p-8 relative border border-gray-100">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-2 rounded-full transition-all"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm">
            <Phone size={32} className="text-blue-600" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">
            Phone Number Required
          </h2>
          <p className="text-sm text-gray-500 font-medium px-4">
            Buyers need a verified number to reach you. This is essential for CG INFRAX growth.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-xs font-bold py-3 px-4 rounded-xl mb-6 text-center border border-red-100 animate-bounce">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label className="block text-gray-700 text-xs font-black uppercase tracking-widest mb-2 ml-1">
              Mobile Number
            </label>
            <div className="relative">
               <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400 border-r pr-3">+91</span>
               <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="9XXXXXXXXX"
                className="w-full border-2 border-gray-100 bg-gray-50 rounded-2xl pl-16 pr-4 py-4 text-gray-900 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all tracking-widest"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || phone.length !== 10}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-500/30 transition-all active:scale-95 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none flex justify-center items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : "Verify & Continue"}
          </button>
        </form>
        
        <p className="text-center text-[10px] text-gray-400 mt-8 font-bold tracking-widest uppercase">
           Protected by CG INFRAX Security
        </p>
      </div>
    </div>
  );
}