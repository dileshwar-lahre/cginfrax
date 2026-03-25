"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  MapPin, Bed, Bath, Move, Phone, ArrowLeft, Share2, 
  Heart, Eye, Pencil, Trash2, MessageCircle, ChevronRight
} from "lucide-react"; 

export default function PropertyDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [property, setProperty] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [similarProperties, setSimilarProperties] = useState([]);

  useEffect(() => {
    if (id) {
      fetch(`/api/properties/${id}`)
        .then((res) => res.json())
        .then((data) => setProperty(data))
        .catch(err => console.error("Main fetch error:", err));
    }
  }, [id]);

  useEffect(() => {
    const fetchSimilar = async () => {
      if (!property || !property.district) return;
      try {
        const res = await fetch(
          `/api/properties/similar?district=${encodeURIComponent(property.district)}&beds=${property.details?.beds || 0}&currentId=${id}`
        );
        const data = await res.json();
        setSimilarProperties(Array.isArray(data) ? data : []);
      } catch (err) { setSimilarProperties([]); }
    };
    fetchSimilar();
  }, [property, id]);

  const handleDelete = async () => {
    if (!confirm("Bhai, delete karna hai?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });
      if (res.ok) { router.push("/properties"); }
    } catch (err) { console.error(err); } finally { setDeleting(false); }
  };

  const handleLike = async () => {
    if (!session) return alert("Pehle Login karo!");
    try {
      const res = await fetch(`/api/properties/${id}/like`, { method: "POST" });
      const data = await res.json();
      if (res.ok) setProperty({ ...property, likes: data.likes });
    } catch (err) { console.error("Like error:", err); }
  };

  const handleShare = async () => {
    try {
      await navigator.share({ title: property.title, url: window.location.href });
    } catch (err) { alert("Link copied!"); }
  };

  const handleWhatsApp = () => {
    const phone = property.phoneNumber || '9131460470'; 
    const message = `Hi, I'm interested in "${property.title}".\nLink: ${window.location.href}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!property) return <div className="h-screen flex items-center justify-center font-black text-blue-600 animate-pulse">LOADING...</div>;

  const isLiked = property.likes?.includes(session?.user?.email);
  const isOwner = session?.user?.email === property.userEmail;

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-10">
      
      {/* Navigation */}
      <div className="flex justify-between items-center p-5 sticky top-0 z-50 bg-white/80 backdrop-blur-md">
        <button onClick={() => router.back()} className="p-3 bg-white shadow-sm rounded-2xl border border-gray-100"><ArrowLeft size={20}/></button>
        <div className="flex gap-2">
          {isOwner && (
            <>
              <button onClick={() => router.push(`/properties/edit/${id}`)} className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Pencil size={20}/></button>
              <button onClick={handleDelete} className="p-3 bg-red-50 text-red-600 rounded-2xl"><Trash2 size={20}/></button>
            </>
          )}
          <button onClick={handleShare} className="p-3 bg-white border border-gray-100 rounded-2xl"><Share2 size={20}/></button>
          <button onClick={handleLike} className="p-3 bg-white border border-gray-100 rounded-2xl">
            <Heart size={20} className={isLiked ? "fill-red-500 text-red-500" : "text-gray-400"} />
          </button>
        </div>
      </div>

      {/* Images */}
      <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 px-5">
        {property.images?.map((img, i) => (
          <div key={i} className="flex-shrink-0 w-[85vw] md:w-[700px] aspect-[4/3] snap-center">
            <img src={img} className="w-full h-full object-cover rounded-[2.5rem] shadow-lg border-2 border-white" alt="prop"/>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-8 space-y-8">
        
        {/* Title & Stats */}
        <div className="space-y-2">
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
            <span className="flex items-center gap-1"><Eye size={12}/> {property.views || 0} VIEWS</span>
            <span className="flex items-center gap-1"><Heart size={12}/> {property.likes?.length || 0} LIKES</span>
          </div>
          <h1 className="text-4xl font-[1000] text-gray-900 tracking-tighter leading-tight">{property.title}</h1>
          <p className="flex items-center gap-1 text-gray-500 font-bold"><MapPin size={18} className="text-red-500"/> {property.address}, {property.district}</p>
        </div>

        {/* PRICE & ACTION BUTTONS (Moved Here) */}
        <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 space-y-5">
          <div className="flex items-baseline gap-1">
            <span className="text-blue-600 text-xl font-black italic">₹</span>
            <span className="text-4xl font-[1000] text-gray-900 tracking-tighter">
              {property.price?.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={handleWhatsApp} className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-3xl font-black uppercase text-xs tracking-widest shadow-lg shadow-green-100 active:scale-95 transition-all">
              <MessageCircle size={18} fill="white"/> WhatsApp
            </button>
            <button onClick={() => window.location.href = `tel:${property.phoneNumber || '9131460470'}`} className="flex items-center justify-center gap-2 bg-gray-900 text-white py-4 rounded-3xl font-black uppercase text-xs tracking-widest shadow-lg shadow-gray-200 active:scale-95 transition-all">
              <Phone size={18} fill="white"/> Call Now
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: <Bed/>, val: property.details?.beds, label: 'BHK' },
            { icon: <Bath/>, val: property.details?.baths, label: 'Baths' },
            { icon: <Move/>, val: property.details?.area, label: 'Sqft' }
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 p-5 rounded-[2rem] flex flex-col items-center">
              <div className="text-gray-900 mb-1">{item.icon}</div>
              <span className="font-black text-gray-900 text-lg tracking-tighter">{item.val || 0} {item.label}</span>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Description</h3>
          <p className="text-gray-600 font-semibold text-lg leading-relaxed bg-white border border-gray-100 p-6 rounded-[2rem]">{property.desc}</p>
        </div>

        {/* 🔥 SIMILAR PROPERTIES SECTION */}
        {similarProperties.length > 0 && (
          <div className="pt-10 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-[1000] text-gray-900 tracking-tighter uppercase">Similar Properties</h3>
              <button onClick={() => router.push('/properties')} className="px-5 py-2 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-full text-[10px] font-black uppercase tracking-widest transition-all">
                All
              </button>
            </div>

            <div className="flex overflow-x-auto gap-5 no-scrollbar pb-8 -mx-2 px-2">
              {similarProperties.map((item) => (
                <div 
                  key={item._id}
                  onClick={() => {
                    router.push(`/properties/${item._id}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group flex-shrink-0 w-64 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-500"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img src={item.images?.[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="sm"/>
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl shadow-md">
                      <p className="text-blue-600 font-black text-xs">₹{item.price?.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <h4 className="font-bold text-gray-900 truncate text-sm tracking-tight">{item.title}</h4>
                    <div className="flex items-center gap-1 text-gray-400 text-[9px] font-black uppercase tracking-widest">
                      <MapPin size={10} className="text-red-400" /> {item.district}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{` .no-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar::-webkit-scrollbar { display: none; } `}</style>
    </div>
  );
}