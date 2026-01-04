"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LogOut, User, Mail, UploadCloud, MapPin, Trash2, IndianRupee, Pencil, X } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [myProperties, setMyProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyProperties = async () => {
      if (status === "loading") return;
      
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/properties?email=${session.user.email}`);
        const data = await res.json();
        
        if (Array.isArray(data)) {
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
    if (!confirm("Are you sure you want to delete this property?")) return;

    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMyProperties((prev) => prev.filter((prop) => prop._id !== id));
        alert("Property delete ho gayi! ✅");
      } else {
        const errData = await res.json();
        alert(errData.error || "Delete nahi ho paya");
      }
    } catch (error) {
      alert("Network error: Failed to delete");
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
                <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                    My Listed Properties <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{myProperties?.length || 0}</span>
                </h2>

                {loading ? (
                    <p className="text-gray-500">Loading your properties...</p>
                ) : (myProperties.length === 0) ? (
                    <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                        <p className="text-gray-500">You haven't listed any properties yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myProperties.map((prop) => (
                            <div key={prop._id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden group">
                                <div className="h-48 bg-gray-200 relative">
                                    {prop.images && prop.images.length > 0 ? (
                                         <Image src={prop.images[0]} alt={prop.title} fill className="object-cover" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400">
                                            <UploadCloud size={30} />
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-lg text-gray-900 truncate">{prop.title}</h3>
                                    <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                                        <MapPin size={12} /> {prop.district}
                                    </p>
                                    <p className="text-blue-600 font-bold flex items-center gap-1 mt-2">
                                        <IndianRupee size={14} /> {prop.price?.toLocaleString('en-IN')}
                                    </p>
                                    
                                    <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-50">
                                        <button 
                                            onClick={() => router.push(`/properties/edit/${prop._id}`)} 
                                            className="text-blue-500 hover:bg-blue-50 p-2 rounded-full transition-colors"
                                            title="Edit Property"
                                        >
                                            <Pencil size={18} />
                                        </button>

                                        <button 
                                            onClick={() => handleDelete(prop._id)}
                                            className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                                            title="Delete Property"
                                        >
                                            <Trash2 size={18} />
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
