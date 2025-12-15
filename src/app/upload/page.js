"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { ArrowLeft, Home, IndianRupee, MapPin, BedDouble, Bath, Maximize, Image as ImageIcon, CheckCircle, UploadCloud } from "lucide-react";

export default function UploadPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    area: "",
    beds: "",
    baths: "",
    status: "For Sell",
    imageUrl: "", 
  });

  // Agar login nahi hai
  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <p className="text-xl font-semibold text-gray-700">Please login to upload property.</p>
        <button onClick={() => router.push("/")} className="px-6 py-2 bg-blue-600 text-white rounded-full">Go Home</button>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStatusChange = (value) => {
    setFormData({ ...formData, status: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userEmail: session.user.email }),
      });

      if (res.ok) {
        alert("Property Uploaded Successfully!");
        router.push("/"); 
      } else {
        alert("Failed to upload.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />
      
      <div className="max-w-3xl mx-auto mt-24 px-4">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-8">
            <button onClick={() => router.back()} className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors border border-gray-200">
                <ArrowLeft size={24} className="text-gray-700" />
            </button>
            <div>
                <h1 className="text-3xl font-black text-gray-900">List Your Property</h1>
                <p className="text-gray-500">Fill in the details to upload your property.</p>
            </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Form Header Decoration */}
          <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            
            {/* 1. Basic Info Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <Home size={20} className="text-blue-600" /> Basic Information
                </h3>
                
                {/* Title */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Property Title</label>
                    <input 
                        type="text" name="title" required onChange={handleChange} 
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400"
                        placeholder="e.g. Luxurious 3BHK Villa with Garden" 
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Price */}
                    <div className="relative">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Price (in ₹)</label>
                        <div className="relative">
                            <IndianRupee size={18} className="absolute left-4 top-4 text-gray-400" />
                            <input 
                                type="text" name="price" required onChange={handleChange} 
                                className="w-full pl-11 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 font-medium placeholder:text-gray-400"
                                placeholder="50,00,000" 
                            />
                        </div>
                    </div>
                    {/* Location */}
                    <div className="relative">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                        <div className="relative">
                            <MapPin size={18} className="absolute left-4 top-4 text-gray-400" />
                            <input 
                                type="text" name="location" required onChange={handleChange} 
                                className="w-full pl-11 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 font-medium placeholder:text-gray-400"
                                placeholder="Shankar Nagar, Raipur" 
                            />
                        </div>
                    </div>
                </div>
            </div>

            <hr className="border-gray-100" />

            {/* 2. Property Details Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <Maximize size={20} className="text-blue-600" /> Property Details
                </h3>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Beds</label>
                        <div className="relative">
                            <BedDouble size={18} className="absolute left-3 top-3.5 text-gray-400" />
                            <input type="number" name="beds" onChange={handleChange} className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 font-bold" placeholder="3" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Baths</label>
                        <div className="relative">
                            <Bath size={18} className="absolute left-3 top-3.5 text-gray-400" />
                            <input type="number" name="baths" onChange={handleChange} className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 font-bold" placeholder="2" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Area</label>
                        <div className="relative">
                            <Maximize size={18} className="absolute left-3 top-3.5 text-gray-400" />
                            <input type="text" name="area" required onChange={handleChange} className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 font-bold" placeholder="1200 sqft" />
                        </div>
                    </div>
                </div>
            </div>

            <hr className="border-gray-100" />

            {/* 3. Status Selection (Modern Chips) */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">I want to...</label>
                <div className="flex gap-3">
                    {['For Sell', 'For Buy', 'For Rent'].map((status) => (
                        <button
                            key={status}
                            type="button"
                            onClick={() => handleStatusChange(status)}
                            className={`flex-1 py-3 px-4 rounded-xl font-bold border-2 transition-all flex items-center justify-center gap-2 ${
                                formData.status === status 
                                ? 'border-blue-600 bg-blue-50 text-blue-600' 
                                : 'border-gray-100 bg-white text-gray-500 hover:border-gray-300'
                            }`}
                        >
                            {formData.status === status && <CheckCircle size={16} />}
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* 4. Image URL */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Property Image URL</label>
                <div className="relative">
                    <ImageIcon size={18} className="absolute left-4 top-4 text-gray-400" />
                    <input 
                        type="text" name="imageUrl" required onChange={handleChange} 
                        className="w-full pl-11 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-blue-600 font-medium placeholder:text-gray-400 underline"
                        placeholder="Paste image link here..." 
                    />
                </div>
            </div>

            {/* Submit Button */}
            <button 
                disabled={loading} 
                type="submit" 
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/30 transition-all transform active:scale-95 flex items-center justify-center gap-2"
            >
                {loading ? (
                    <span className="animate-pulse">Uploading...</span>
                ) : (
                    <>
                        <UploadCloud size={24} /> Upload Property
                    </>
                )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}