"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { Home, Map, Users, BedDouble, CheckCircle, Camera, IndianRupee, X, ArrowLeft } from 'lucide-react';
import imageCompression from "browser-image-compression";
import Navbar from "@/app/components/Navbar";

export default function EditPropertyPage() {
  const { data: session } = useSession();
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const cgDistricts = ["Raipur", "Bilaspur", "Durg", "Bhilai", "Korba", "Raigarh", "Rajnandgaon", "Jagdalpur", "Ambikapur", "Dhamtari", "Mahasamund", "Janjgir", "Kawardha", "Kanker", "Kondagaon", "Sukma", "Dantewada", "Bijapur", "Narayanpur", "Bastar", "Gariaband", "Balod", "Bemetara", "Mungeli", "Sakti", "Baloda Bazar", "Surajpur", "Balrampur", "Jashpur", "Manendragarh", "Khairagarh", "Mohla-Manpur", "Sarangarh"];

  const CATEGORIES = [
    { id: 'House', label: 'House/Flat', icon: Home, color: 'bg-blue-50', iconColor: 'text-blue-600' },
    { id: 'Plot', label: 'Plot/Land', icon: Map, color: 'bg-emerald-50', iconColor: 'text-emerald-600' },
    { id: 'PG', label: 'PG/Hostel', icon: Users, color: 'bg-violet-50', iconColor: 'text-violet-600' },
    { id: 'Room', label: 'Rent Room', icon: BedDouble, color: 'bg-orange-50', iconColor: 'text-orange-500' },
  ];

  const [selectedCategory, setSelectedCategory] = useState('Room');
  const [images, setImages] = useState([]); // For new uploads
  const [previews, setPreviews] = useState([]); // Combined previews (old + new)
  const [existingImages, setExistingImages] = useState([]); // From Database

  const [formData, setFormData] = useState({
    title: "", price: "", address: "", district: "Raipur", desc: "", 
    beds: "", baths: "", area: "", gender: "Both", sharing: "Single"
  });

  // 1. Purana Data Load Karo
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/properties/${id}`);
        const data = await res.json();
        
        setFormData({
          title: data.title,
          price: data.price,
          address: data.address,
          district: data.district,
          desc: data.desc,
          beds: data.details?.beds || "",
          baths: data.details?.baths || "",
          area: data.details?.area || "",
          gender: data.details?.gender || "Both",
          sharing: data.details?.sharing || "Single"
        });
        setSelectedCategory(data.cat);
        setExistingImages(data.images || []);
        setPreviews(data.images || []);
        setFetching(false);
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };
    if (id) fetchProperty();
  }, [id]);

  // 2. Image Compression (Same as Upload)
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (previews.length + files.length > 5) return alert("Bhai, max 5 photos!");

    const options = { maxSizeMB: 0.2, maxWidthOrHeight: 1280, useWebWorker: true, fileType: 'image/webp' };

    for (let file of files) {
      try {
        const compressed = await imageCompression(file, options);
        setImages(prev => [...prev, compressed]);
        setPreviews(prev => [...prev, URL.createObjectURL(compressed)]);
      } catch (err) { console.error(err); }
    }
  };

  const removeImage = (index) => {
    setPreviews(prev => prev.filter((_, i) => i !== index));
    // Agar index existing images mein hai toh wahan se hatao, warna new images se
    if (index < existingImages.length) {
      setExistingImages(existingImages.filter((_, i) => i !== index));
    } else {
      setImages(images.filter((_, i) => i !== (index - existingImages.length)));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (previews.length === 0) return alert("Kam se kam ek photo toh rakho!");
    setLoading(true);

    try {
      // 3. Nayi Photos Upload Karo (Agar select ki hain toh)
      const newImageUrls = [];
      for (let img of images) {
        const res = await fetch("/api/upload", { 
          method: "POST", 
          body: JSON.stringify({ fileName: img.name, fileType: 'image/webp' }) 
        });
        const { uploadUrl, imageUrl } = await res.json();
        await fetch(uploadUrl, { method: "PUT", body: img, headers: { "Content-Type": 'image/webp' } });
        newImageUrls.push(imageUrl);
      }

      const finalPayload = { 
        ...formData, 
        cat: selectedCategory,
        images: [...existingImages, ...newImageUrls], 
        details: {
          beds: Number(formData.beds) || 0,
          baths: Number(formData.baths) || 0,
          area: Number(formData.area) || 0,
          gender: formData.gender,
          sharing: formData.sharing,
          kitchen: formData.kitchen || "Not Available",
          plotType: formData.plotType || "Residential"
        }
      };

      // 4. PUT Request Bhejo
      const res = await fetch(`/api/properties/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalPayload),
      });

      if (res.ok) {
        alert("Property Updated Successfully! ✅");
        router.push("/profile");
      }
    } catch (err) { alert("Error: " + err.message); }
    finally { setLoading(false); }
  };

  if (!session) return <div className="p-20 text-center font-black">Pehle Login Karle Bhai!</div>;
  if (fetching) return <div className="h-screen flex items-center justify-center font-black animate-pulse">Fetching Data...</div>;

  return (
    <div className="min-h-screen bg-[#F4F7FE] pb-20 font-sans text-gray-900">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-28">
        
        {/* Back Header */}
        <div className="flex items-center gap-4 mb-8">
            <button onClick={() => router.back()} className="p-3 bg-white rounded-2xl shadow-sm hover:bg-gray-50"><ArrowLeft size={20}/></button>
            <h1 className="text-2xl font-black uppercase tracking-tight italic">Update Your Post<span className="text-blue-600">.</span></h1>
        </div>

        {/* Category Picker (Pre-selected) */}
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
            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Title</label>
                <input type="text" value={formData.title} className="w-full bg-gray-50 p-5 rounded-2xl font-bold border-none shadow-inner outline-none" onChange={(e) => setFormData({...formData, title: e.target.value})} required />
            </div>
            <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Price (₹)</label>
                <div className="relative">
                    <IndianRupee className="absolute left-4 top-5 text-gray-400" size={20} />
                    <input type="number" value={formData.price} className="w-full pl-12 p-5 bg-gray-50 rounded-2xl font-black border-none shadow-inner outline-none text-blue-600" onChange={(e) => setFormData({...formData, price: e.target.value})} required />
                </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <select value={formData.district} className="w-full bg-gray-50 p-5 rounded-2xl font-bold border-none outline-none" onChange={(e) => setFormData({...formData, district: e.target.value})}>
              {cgDistricts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <input type="number" value={formData.area} placeholder="Area (Sqft)" className="w-full bg-gray-50 p-5 rounded-2xl font-bold border-none outline-none" onChange={(e) => setFormData({...formData, area: e.target.value})} required />
          </div>

          {/* Dynamic Fields */}
          <div className="p-8 rounded-[2.5rem] bg-blue-50/50 border border-blue-100 grid grid-cols-1 md:grid-cols-2 gap-6">
             {selectedCategory !== 'Plot' && (
               <>
                 <input type="number" value={formData.beds} placeholder="BHK" className="p-4 bg-white rounded-xl font-bold shadow-sm border-none outline-none" onChange={(e) => setFormData({...formData, beds: e.target.value})} />
                 <input type="number" value={formData.baths} placeholder="Baths" className="p-4 bg-white rounded-xl font-bold shadow-sm border-none outline-none" onChange={(e) => setFormData({...formData, baths: e.target.value})} />
               </>
             )}
             {(selectedCategory === 'PG' || selectedCategory === 'Room') && (
               <>
                 <select value={formData.gender} className="p-4 bg-white rounded-xl font-bold shadow-sm border-none outline-none" onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                   <option value="Both">Boys & Girls</option><option value="Boys">Only Boys</option><option value="Girls">Only Girls</option>
                 </select>
                 <input type="text" value={formData.sharing} placeholder="Sharing Type" className="p-4 bg-white rounded-xl font-bold shadow-sm border-none outline-none" onChange={(e) => setFormData({...formData, sharing: e.target.value})} />
               </>
             )}
          </div>

          <div className="space-y-6">
            <input type="text" value={formData.address} placeholder="Local Address" className="w-full bg-gray-50 p-5 rounded-2xl font-bold border-none shadow-inner outline-none" onChange={(e) => setFormData({...formData, address: e.target.value})} required />
            <textarea rows="4" value={formData.desc} placeholder="Description..." className="w-full bg-gray-50 p-6 rounded-[2rem] font-bold border-none shadow-inner outline-none" onChange={(e) => setFormData({...formData, desc: e.target.value})}></textarea>
          </div>

          {/* Images UI (Combined Existing + New) */}
          <div className="grid grid-cols-5 gap-4">
            {previews.map((p, i) => (
              <div key={i} className="relative h-20 rounded-2xl overflow-hidden shadow-md group">
                <img src={p} className="w-full h-full object-cover" />
                <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all shadow-lg">
                    <X size={10}/>
                </button>
              </div>
            ))}
            {previews.length < 5 && (
              <label className="h-20 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-blue-50">
                <Camera size={24} className="text-gray-400"/><input type="file" multiple className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            )}
          </div>

          <button disabled={loading} className="w-full py-6 bg-blue-600 text-white font-[1000] rounded-[2.5rem] text-xl shadow-2xl hover:bg-black transition-all active:scale-95 disabled:bg-gray-400 uppercase tracking-widest">
            {loading ? "SAVING CHANGES..." : "Update Property Now ✅"}
          </button>
        </form>
      </div>
    </div>
  );
}