"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LogOut, User, Mail, UploadCloud, MapPin, Trash2, IndianRupee, Pencil, X, Eye, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [myProperties, setMyProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch only My Properties
  useEffect(() => {
    const fetchMyProperties = async () => {
      if (status === "loading") return;
      
      // Strict check: No email = No fetch
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }

      try {
        // API call with email filter
        const res = await fetch(`/api/properties?email=${session.user.email}`);
        const data = await res.json();
        
        // Handle API response format { properties: [], pagination: {} }
        if (data.properties && Array.isArray(data.properties)) {
          setMyProperties(data.properties);
        } else if (Array.isArray(data)) {
          setMyProperties(data);
        } else {
          setMyProperties([]);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
        setMyProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProperties();
  }, [session, status]);

  const handleDelete = async (id) => {
    if (!confirm("Confirm Delete? Ye property hamesha ke liye delete ho jayegi.")) return;

    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMyProperties((prev) => prev.filter((prop) => prop._id !== id));
      } else {
        const errData = await res.json();
        alert(errData.error || "Delete failed");
      }
    } catch (error) {
      alert("Network error");
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:py-12 relative">
      
      {/* Back Button */}
      <button 
        onClick={() => router.back()} 
        className="fixed top-6 right-6 z-50 p-2 bg-white rounded-full shadow-lg text-gray-500 hover:text-red-500 hover:bg-red-50 hover:scale-110 transition-all duration-300"
      >
        <X size={28} strokeWidth={2.5} />
      </button>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto mt-8"
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 mb-10">
          
          <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          </div>

          <div className="px-8 pb-10 relative">
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-20 mb-8 gap-6">
              
              <div className="relative group">
                <div className="w-36 h-36 md:w-44 md:h-44 rounded-full border-[6px] border-white shadow-xl overflow-hidden bg-white flex items-center justify-center relative">
                  {session?.user?.image ? (
                    <Image src={session.user.image} alt="Profile" fill className="object-cover" />
                  ) : (
                    <User size={60} className="text-gray-300" />
                  )}
                </div>
              </div>

              <div className="text-center md:text-left flex-1 mb-2">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">{session?.user?.name || "Guest User"}</h1>
                <p className="text-gray-500 font-medium flex items-center justify-center md:justify-start gap-2 mt-1 text-lg">
                    <Mail size={18} className="text-blue-500"/> {session?.user?.email || "No Email"}
                </p>
              </div>

              <div className="flex gap-3">
                <button onClick={() => router.push('/upload')} className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/30 mb-2">
                    <UploadCloud size={20} /> Upload
                </button>
                <button onClick={() => signOut({ callbackUrl: "/" })} className="flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-4 py-3 rounded-xl font-bold transition-all shadow-sm mb-2">
                    <LogOut size={20} />
                </button>
              </div>
            </div>

            <hr className="border-gray-100 mb-8" />

            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                        My Dashboard 
                        <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                           {myProperties?.length || 0} Posts
                        </span>
                    </h2>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                         {[1,2,3].map(i => <div key={i} className="h-64 bg-gray-200 rounded-2xl"></div>)}
                    </div>
                ) : (myProperties.length === 0) ? (
                    <div className="text-center py-16 bg-blue-50/50 rounded-[2rem] border-2 border-dashed border-blue-200">
                        <UploadCloud size={60} className="mx-auto text-blue-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Posts Yet</h3>
                        <p className="text-gray-500 mb-6">Start your journey by uploading your first property.</p>
                        <button onClick={() => router.push('/upload')} className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all">
                            Create New Post
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myProperties.map((prop) => (
                            <div key={prop._id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col">
                                {/* Image & Overlay */}
                                <div className="h-48 relative overflow-hidden">
                                    {prop.images && prop.images.length > 0 ? (
                                         <Image 
                                            src={prop.images[0]} 
                                            alt={prop.title} 
                                            fill 
                                            className="object-cover group-hover:scale-105 transition-transform duration-500" 
                                         />
                                    ) : (
                                        <div className="flex items-center justify-center h-full bg-gray-100 text-gray-400">
                                            <UploadCloud size={30} />
                                        </div>
                                    )}
                                    <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-bold">
                                        {prop.cat}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg text-gray-900 truncate flex-1 pr-2" title={prop.title}>{prop.title}</h3>
                                        <span className="text-blue-600 font-black whitespace-nowrap">₹ {prop.price?.toLocaleString('en-IN')}</span>
                                    </div>
                                    
                                    <p className="text-gray-500 text-sm flex items-center gap-1 mb-4">
                                        <MapPin size={14} className="text-gray-400" /> {prop.district}
                                    </p>

                                    {/* Stats Row */}
                                    <div className="flex items-center gap-4 text-xs text-gray-500 font-semibold bg-gray-50 p-3 rounded-xl mb-4">
                                        <span className="flex items-center gap-1"><Eye size={14} className="text-blue-400"/> {prop.views || 0} Views</span>
                                        <span className="flex items-center gap-1"><Heart size={14} className="text-red-400"/> {prop.likes?.length || 0} Likes</span>
                                    </div>
                                    
                                    {/* Actions */}
                                    <div className="mt-auto grid grid-cols-2 gap-3">
                                        <button 
                                            onClick={() => router.push(`/properties/edit/${prop._id}`)} 
                                            className="flex items-center justify-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white py-2.5 rounded-xl font-bold transition-all text-sm"
                                        >
                                            <Pencil size={16} /> Edit
                                        </button>

                                        <button 
                                            onClick={() => handleDelete(prop._id)}
                                            className="flex items-center justify-center gap-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white py-2.5 rounded-xl font-bold transition-all text-sm"
                                        >
                                            <Trash2 size={16} /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
