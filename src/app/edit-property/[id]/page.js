"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
// ✅ Path Fixed (2 level up)
import Navbar from "../../components/Navbar"; 
import { ArrowLeft, IndianRupee, MapPin, CheckCircle, Save, BedDouble, Bath, Maximize, Image as ImageIcon } from "lucide-react";

export default function EditPropertyPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "", price: "", location: "", area: "", beds: "", baths: "", status: "", imageUrl: "", 
  });

  // 1. Purana Data Fetch karo
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/properties?id=${id}`);
        const data = await res.json();
        setFormData(data); 
      } catch (error) {
        console.error("Error fetching property");
      }
    };
    if (id) fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStatusChange = (value) => {
    setFormData({ ...formData, status: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/properties?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Property Updated Successfully!");
        router.push("/profile"); 
      } else {
        alert("Failed to update.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!session) return <div className="p-10 text-center text-gray-800">Please login</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />
      
      <div className="max-w-3xl mx-auto mt-24 px-4">
        <div className="flex items-center gap-4 mb-8">
            <button onClick={() => router.back()} className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 border border-gray-200">
                <ArrowLeft size={24} className="text-gray-700" />
            </button>
            <div>
                <h1 className="text-3xl font-black text-gray-900">Edit Property</h1>
                <p className="text-gray-500">Update the details of your property.</p>
            </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="h-2 w-full bg-orange-500"></div> 
          
          <form onSubmit={handleUpdate} className="p-8 space-y-8">
            
            {/* Title */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Property Title</label>
                {/* ✅ Text Color Fixed: text-gray-900 */}
                <input 
                  type="text" name="title" value={formData.title} onChange={handleChange} 
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none font-bold text-gray-900 focus:ring-2 focus:ring-orange-500" 
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Price</label>
                    <div className="relative">
                        <IndianRupee size={18} className="absolute left-4 top-4 text-gray-400" />
                        {/* ✅ Text Color Fixed */}
                        <input 
                          type="text" name="price" value={formData.price} onChange={handleChange} 
                          className="w-full pl-11 p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none font-bold text-gray-900 focus:ring-2 focus:ring-orange-500" 
                        />
                    </div>
                </div>
                <div className="relative">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                    <div className="relative">
                        <MapPin size={18} className="absolute left-4 top-4 text-gray-400" />
                        {/* ✅ Text Color Fixed */}
                        <input 
                          type="text" name="location" value={formData.location} onChange={handleChange} 
                          className="w-full pl-11 p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none font-bold text-gray-900 focus:ring-2 focus:ring-orange-500" 
                        />
                    </div>
                </div>
            </div>

            <hr className="border-gray-100" />

            {/* Details */}
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Beds</label>
                    <div className="relative">
                      <BedDouble size={18} className="absolute left-3 top-3.5 text-gray-400" />
                      {/* ✅ Text Color Fixed */}
                      <input type="number" name="beds" value={formData.beds} onChange={handleChange} className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none font-bold text-gray-900 focus:ring-2 focus:ring-orange-500" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Baths</label>
                    <div className="relative">
                      <Bath size={18} className="absolute left-3 top-3.5 text-gray-400" />
                      {/* ✅ Text Color Fixed */}
                      <input type="number" name="baths" value={formData.baths} onChange={handleChange} className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none font-bold text-gray-900 focus:ring-2 focus:ring-orange-500" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Area</label>
                    <div className="relative">
                      <Maximize size={18} className="absolute left-3 top-3.5 text-gray-400" />
                      {/* ✅ Text Color Fixed */}
                      <input type="text" name="area" value={formData.area} onChange={handleChange} className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none font-bold text-gray-900 focus:ring-2 focus:ring-orange-500" />
                    </div>
                </div>
            </div>

            {/* Status */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Status</label>
                <div className="flex gap-3">
                    {['For Sell', 'For Buy', 'For Rent'].map((status) => (
                        <button key={status} type="button" onClick={() => handleStatusChange(status)}
                            className={`flex-1 py-3 px-4 rounded-xl font-bold border-2 transition-all flex items-center justify-center gap-2 ${
                                formData.status === status ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-gray-100 bg-white text-gray-500 hover:border-gray-300'
                            }`}
                        >
                            {formData.status === status && <CheckCircle size={16} />} {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Image */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
                <div className="relative">
                    <ImageIcon size={18} className="absolute left-4 top-4 text-gray-400" />
                    {/* ✅ Text Color Fixed */}
                    <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full pl-11 p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-blue-600 font-medium underline focus:ring-2 focus:ring-orange-500" />
                </div>
            </div>

            {/* Update Button */}
            <button disabled={loading} type="submit" className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 transform active:scale-95">
                {loading ? "Updating..." : <><Save size={24} /> Update Property</>}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}