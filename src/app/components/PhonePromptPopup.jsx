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
    
    // ✅ VALIDATION: Phone format (10 digits, starting with 6-9)
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = phone.trim().replace(/\D/g, "");
    
    if (!cleanPhone || cleanPhone.length !== 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }
    
    if (!phoneRegex.test(cleanPhone)) {
      setError("Phone number must start with 6, 7, 8, or 9");
      return;
    }

    setLoading(true);
    
    try {
      const res = await fetch("/api/auth/update-phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, phone: cleanPhone }),
      });

      const data = await res.json();

      if (data.success) {
        onClose();
        window.location.reload(); // Refresh to update session
      } else {
        setError(data.message || "Failed to update phone number");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[70] px-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-100 hover:bg-red-50 p-2 rounded-full transition-all"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone size={32} className="text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Phone Number Required
          </h2>
          <p className="text-sm text-gray-500">
            Please enter your phone number to continue. This helps buyers contact you directly.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 text-sm py-2 px-3 rounded-lg mb-4 text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                setPhone(value);
              }}
              placeholder="Enter 10-digit phone number"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              required
            />
            <p className="text-xs text-gray-400 mt-1">Example: 9876543210</p>
          </div>

          <button
            type="submit"
            disabled={loading || phone.length !== 10}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Save Phone Number"}
          </button>
        </form>
      </div>
    </div>
  );
}



