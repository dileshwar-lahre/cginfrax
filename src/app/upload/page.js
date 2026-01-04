"use client";
import React, { useState } from 'react';
import { useSession } from "next-auth/react";
import { Home, Map, Users, BedDouble, Lock, X, CheckCircle, Camera, ChevronRight, IndianRupee, MapPin, AlignLeft } from 'lucide-react';
import imageCompression from "browser-image-compression";
import Navbar from "../components/Navbar";

export default function PostPropertyPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  
  const cgDistricts = ["Raipur", "Bilaspur", "Durg", "Bhilai", "Korba", "Raigarh", "Rajnandgaon", "Jagdalpur", "Ambikapur", "Dhamtari", "Mahasamund", "Janjgir", "Kawardha", "Kanker", "Kondagaon", "Sukma", "Dantewada", "Bijapur", "Narayanpur", "Bastar", "Gariaband", "Balod", "Bemetara", "Mungeli", "Sakti", "Baloda Bazar", "Surajpur", "Balrampur", "Jashpur", "Manendragarh", "Khairagarh", "Mohla-Manpur", "Sarangarh"];

  const [selectedCategory, setSelectedCategory] = useState('Room');
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const [formData, setFormData] = useState({
    title: "", price: "", address: "", district: "Raipur", desc: "", 
    beds: "", baths: "", area: "", gender: "Both", sharing: "Single"
  });

  const CATEGORIES = [
    { id: 'House', label: 'House/Flat', icon: Home, color: 'bg-blue-50', iconColor: 'text-blue-600' },
    { id: 'Plot', label: 'Plot/Land', icon: Map, color: 'bg-emerald-50', iconColor: 'text-emerald-600' },
    { id: 'PG', label: 'PG/Hostel', icon: Users, color: 'bg-violet-50', iconColor: 'text-violet-600' },
    { id: 'Room', label: 'Rent Room', icon: BedDouble, color: 'bg-orange-50', iconColor: 'text-orange-500' },
  ];

  // ✨ IMAGE COMPRESSION ADDED AS REQUESTED
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) return alert("Bhai, max 5 photos!");

    const options = { 
      maxSizeMB: 0.2,          // 200KB Max
      maxWidthOrHeight: 1280,  // Good Resolution
      useWebWorker: true,
      fileType: 'image/webp',  // WebP Format (Ultra Light)
      initialQuality: 0.7 
    };

    for (let file of files) {
      try {
        const compressed = await imageCompression(file, options);
        console.log(`Original: ${file.size / 1024}KB, New: ${compressed.size / 1024}KB`);
        
        setImages(prev => [...prev, compressed]);
        setPreviews(prev => [...prev, URL.createObjectURL(compressed)]);
      } catch (err) { 
        console.error("Compression Error:", err); 
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ✅ VALIDATION: Images required
    if (images.length === 0) {
      alert("Please upload at least one photo!");
      return;
    }
    
    // ✅ VALIDATION: Required fields
    if (!formData.title || !formData.price || !formData.address || !formData.district) {
      alert("Please fill all required fields!");
      return;
    }
    
    // ✅ VALIDATION: Price must be positive
    if (Number(formData.price) <= 0) {
      alert("Price must be greater than 0!");
      return;
    }
    
    // ✅ VALIDATION: Title length
    if (formData.title.length > 60) {
      alert("Title must be 60 characters or less!");
      return;
    }
    
    setLoading(true);

    try {
      const imageUrls = [];
      for (let img of images) {
        // AWS presigned URL request
        const res = await fetch("/api/upload", { 
          method: "POST", 
          body: JSON.stringify({ fileName: img.name, fileType: 'image/webp' }) 
        });
        const { uploadUrl, imageUrl } = await res.json();
        
        // Direct upload to S3
        await fetch(uploadUrl, { method: "PUT", body: img, headers: { "Content-Type": 'image/webp' } });
        imageUrls.push(imageUrl);
      }

      const finalPayload = { 
        ...formData, 
        cat: selectedCategory,
        images: imageUrls, 
        userEmail: session?.user?.email || "anonymous@cginfrax.com",
        details: {
          beds: Number(formData.beds) || 0,
          baths: Number(formData.baths) || 0,
          area: Number(formData.area) || 0,
          gender: formData.gender,
          sharing: formData.sharing
        }
      };

      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalPayload),
      });

      if (res.ok) {
        alert("Property Live! 🚀");
        window.location.href = "/properties";
      }
    } catch (err) { alert("Error: " + err.message); }
    finally { setLoading(false); }
  };

  if (!session) return <div className="p-20 text-center font-black text-gray-900">Pehle Login Karle Bhai!</div>;

  return (
    <div className="min-h-screen bg-[#F4F7FE] pb-20 font-sans text-gray-900">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-28">
        {/* Category Picker */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {CATEGORIES.map((cat) => (
            <button key={cat.id} type="button" onClick={() => setSelectedCategory(cat.id)}
              className={`relative p-6 rounded-[2.5rem] border-4 transition-all duration-300 flex flex-col items-center gap-3 ${selectedCategory === cat.id ? 'bg-white border-blue-600 shadow-2xl scale-105' : 'bg-white border-transparent shadow-sm'}`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${cat.color} ${cat.iconColor}`}><cat.icon size={28} /></div>
              <span className="font-black text-[10px] uppercase tracking-tighter text-gray-700">{cat.label}</span>
              {selectedCategory === cat.id && <CheckCircle className="absolute top-4 right-4 text-blue-600" size={20} fill="white" />}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="bg-white rounded-[3.5rem] shadow-2xl p-8 md:p-12 space-y-10 border border-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <input type="text" placeholder="Title" className="w-full bg-gray-50 p-5 rounded-2xl font-bold outline-none border-none shadow-inner" onChange={(e) => setFormData({...formData, title: e.target.value})} required />
            <div className="relative">
              <IndianRupee className="absolute left-4 top-5 text-gray-400" size={20} />
              <input type="number" placeholder="Price" className="w-full pl-12 p-5 bg-gray-50 rounded-2xl font-bold outline-none border-none shadow-inner" onChange={(e) => setFormData({...formData, price: e.target.value})} required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <select className="w-full bg-gray-50 p-5 rounded-2xl font-bold border-none outline-none" onChange={(e) => setFormData({...formData, district: e.target.value})}>
              {cgDistricts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <input type="number" placeholder="Area (Sqft)" className="w-full bg-gray-50 p-5 rounded-2xl font-bold border-none outline-none" onChange={(e) => setFormData({...formData, area: e.target.value})} required />
          </div>

          {/* Dynamic Fields */}
          <div className="p-8 rounded-[2.5rem] bg-blue-50/50 border border-blue-100 grid grid-cols-1 md:grid-cols-2 gap-6">
             {selectedCategory !== 'Plot' && (
               <>
                 <input type="number" placeholder="BHK" className="p-4 bg-white rounded-xl font-bold shadow-sm border-none outline-none" onChange={(e) => setFormData({...formData, beds: e.target.value})} />
                 <input type="number" placeholder="Baths" className="p-4 bg-white rounded-xl font-bold shadow-sm border-none outline-none" onChange={(e) => setFormData({...formData, baths: e.target.value})} />
               </>
             )}
             {(selectedCategory === 'PG' || selectedCategory === 'Room') && (
               <>
                 <select className="p-4 bg-white rounded-xl font-bold shadow-sm border-none outline-none" onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                   <option value="Both">Boys & Girls</option><option value="Boys">Only Boys</option><option value="Girls">Only Girls</option>
                 </select>
                 <input type="text" placeholder="Sharing Type" className="p-4 bg-white rounded-xl font-bold shadow-sm border-none outline-none" onChange={(e) => setFormData({...formData, sharing: e.target.value})} />
               </>
             )}
          </div>

          <div className="space-y-6">
            <input type="text" placeholder="Local Address (Gali, Landmark)" className="w-full bg-gray-50 p-5 rounded-2xl font-bold border-none shadow-inner outline-none" onChange={(e) => setFormData({...formData, address: e.target.value})} required />
            <textarea rows="4" placeholder="Description..." className="w-full bg-gray-50 p-6 rounded-[2rem] font-bold border-none shadow-inner outline-none" onChange={(e) => setFormData({...formData, desc: e.target.value})}></textarea>
          </div>

          {/* Image Upload UI */}
          <div className="grid grid-cols-5 gap-4">
            {previews.map((p, i) => (
              <div key={i} className="relative h-20 rounded-2xl overflow-hidden shadow-md">
                <img src={p} className="w-full h-full object-cover" />
                <button type="button" onClick={() => { setPreviews(previews.filter((_, idx) => idx !== i)); setImages(images.filter((_, idx) => idx !== i)); }} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"><X size={10}/></button>
              </div>
            ))}
            {images.length < 5 && (
              <label className="h-20 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-blue-50 transition-all">
                <Camera size={24} className="text-gray-400"/><input type="file" multiple className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            )}
          </div>

          <button disabled={loading} className="w-full py-6 bg-gray-900 text-white font-black rounded-[2.5rem] text-xl shadow-2xl hover:bg-blue-600 transition-all active:scale-95 disabled:bg-gray-400">
            {loading ? "SAVING..." : "Publish Property Now 🚀"}
          </button>
        </form>
      </div>
    </div>
  );
}