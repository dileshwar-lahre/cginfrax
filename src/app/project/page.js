"use client";

import { useState, useEffect } from "react";
// 👇 1. useRouter import kiya navigation ke liye
import { useRouter } from "next/navigation"; 
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Maximize2, ArrowRight } from 'lucide-react'; 

export default function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 👇 2. Router initialize kiya
  const router = useRouter(); 

  // Data fetch logic
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("/api/properties");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <div className="text-center py-20">Loading Properties...</div>;

  return (
    <div className="py-24 bg-white"> 
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
            Featured Properties
          </h2>
        </div>

        {/* --- DYNAMIC PROJECTS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
            >
              {/* IMAGE AREA */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={project.imageUrl || "/images/placeholder.jpg"}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute top-4 left-4 ${project.status === 'For Sell' ? 'bg-blue-600' : 'bg-emerald-600'} text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg`}>
                  {project.status}
                </div>
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md text-gray-900 font-bold px-4 py-2 rounded-xl shadow-lg border border-white/20">
                  {project.price}
                </div>
              </div>

              {/* DETAILS AREA */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center text-gray-500 text-sm mb-5">
                  <MapPin size={16} className="mr-1 text-blue-500" />
                  {project.location}
                </div>
                
                {/* Icons */}
                <div className="flex items-center justify-between py-4 border-y border-gray-100 mb-6">
                  {project.beds > 0 && (
                    <div className="flex items-center gap-2"><Bed size={18} className="text-gray-400" /><span className="text-sm font-semibold text-gray-700">{project.beds} Beds</span></div>
                  )}
                  {project.baths > 0 && (
                    <div className="flex items-center gap-2"><Bath size={18} className="text-gray-400" /><span className="text-sm font-semibold text-gray-700">{project.baths} Baths</span></div>
                  )}
                  <div className="flex items-center gap-2"><Maximize2 size={18} className="text-gray-400" /><span className="text-sm font-semibold text-gray-700">{project.area}</span></div>
                </div>

                {/* ✅ Button par link lagaya */}
                <button 
                  onClick={() => router.push(`/project/${project._id}`)} // 👈 Ye line navigation karegi
                  className="w-full py-3.5 rounded-xl border-2 border-gray-100 hover:border-blue-600 hover:bg-blue-600 hover:text-white text-gray-700 font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                >
                  View Property <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}