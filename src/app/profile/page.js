"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";
// 👇 X icon import kiya modern close ke liye
import { LogOut, User, Mail, Heart, Shield, X } from "lucide-react"; 
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:py-12 relative">
      
      {/* ✨ Modern Close Button (Top Right) */}
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
        className="max-w-4xl mx-auto mt-8"
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          
          {/* Header / Cover Area */}
          <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden">
             {/* Abstract Background Shapes */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
             <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -ml-10 -mb-10"></div>
          </div>

          <div className="px-8 pb-10 relative">
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-20 mb-8 gap-6">
              
              {/* Profile Image with Ring */}
              <div className="relative group">
                <div className="w-36 h-36 md:w-44 md:h-44 rounded-full border-[6px] border-white shadow-xl overflow-hidden bg-white flex items-center justify-center">
                  {session?.user?.image ? (
                    <Image 
                      src={session.user.image} 
                      alt="Profile" 
                      fill 
                      className="object-cover"
                    />
                  ) : (
                    <User size={60} className="text-gray-300" />
                  )}
                </div>
                {/* Online Status Dot */}
                <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
              </div>

              {/* User Info */}
              <div className="text-center md:text-left flex-1 mb-2">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">{session?.user?.name}</h1>
                <p className="text-gray-500 font-medium flex items-center justify-center md:justify-start gap-2 mt-1 text-lg">
                   <Mail size={18} className="text-blue-500"/> {session?.user?.email}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-3 mt-4">
                  <span className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm border border-blue-100">Member</span>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-6 py-3 rounded-xl font-bold transition-all shadow-sm hover:shadow-lg mb-2"
              >
                <LogOut size={20} /> Logout
              </button>
            </div>

            <hr className="border-gray-100 mb-8" />

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Personal Details Card */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-blue-200 transition-colors">
                 <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <User className="text-blue-600" /> Personal Details
                 </h2>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                       <span className="text-sm text-gray-500 font-medium">Full Name</span>
                       <span className="font-semibold text-gray-900">{session?.user?.name}</span>
                    </div>
                    <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                       <span className="text-sm text-gray-500 font-medium">Email</span>
                       <span className="font-semibold text-gray-900 truncate max-w-[200px]">{session?.user?.email}</span>
                    </div>
                 </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                 <button className="w-full bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all flex items-center gap-5 group text-left">
                    <div className="p-4 bg-red-50 text-red-500 rounded-2xl group-hover:bg-red-500 group-hover:text-white transition-colors">
                       <Heart size={24} />
                    </div>
                    <div>
                       <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">Saved Properties</h3>
                       <p className="text-sm text-gray-500">View your favorite listings</p>
                    </div>
                 </button>

                 <button className="w-full bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all flex items-center gap-5 group text-left">
                    <div className="p-4 bg-purple-50 text-purple-500 rounded-2xl group-hover:bg-purple-500 group-hover:text-white transition-colors">
                       <Shield size={24} />
                    </div>
                    <div>
                       <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">Account Security</h3>
                       <p className="text-sm text-gray-500">Update password & settings</p>
                    </div>
                 </button>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}