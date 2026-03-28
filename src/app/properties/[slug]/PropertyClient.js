"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  MapPin, Bed, Bath, Move, Phone, ArrowLeft, Share2, 
  Heart, Eye, Pencil, Trash2, MessageCircle, X
} from "lucide-react"; 

// 🔥 Lightbox Imports
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export default function PropertyClient({ slug }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [property, setProperty] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [similarProperties, setSimilarProperties] = useState([]);
  
  // 🔥 Full Screen Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // 1. Fetch Property
  useEffect(() => {
    if (slug) {
      fetch(`/api/properties/${slug}`)
        .then((res) => res.json())
        .then((data) => setProperty(data))
        .catch(err => console.error("Fetch error:", err));
    }
  }, [slug]);

  // 2. Similar Properties
  useEffect(() => {
    const fetchSimilar = async () => {
      if (!property || !property.district) return;
      try {
        const res = await fetch(
          `/api/properties/similar?district=${encodeURIComponent(property.district)}&currentId=${property._id}&slug=${slug}`
        );
        const data = await res.json();
        setSimilarProperties(Array.isArray(data) ? data : []);
      } catch (err) { setSimilarProperties([]); }
    };
    fetchSimilar();
  }, [property, slug]);

  const openFullScreen = (index) => {
    setCurrentImgIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!confirm("Bhai, delete kar dein?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/properties/${slug}`, { method: "DELETE" });
      if (res.ok) router.push("/properties");
    } catch (err) { console.error(err); } finally { setDeleting(false); }
  };

  const handleLike = async () => {
    if (!session) return alert("Pehle Login karo!");
    try {
      const res = await fetch(`/api/properties/${property._id}/like`, { method: "POST" });
      const data = await res.json();
      if (res.ok) setProperty({ ...property, likes: data.likes });
    } catch (err) { console.error(err); }
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.share({ title: property.title, url });
    } catch (err) { 
      navigator.clipboard.writeText(url);
      alert("Link copy ho gaya!"); 
    }
  };

  const handleWhatsApp = () => {
    const message = `🏠 *${property.title}*\n💰 Price: ₹${property.price?.toLocaleString('en-IN')}\n📍 Loc: ${property.district}\n\nLink: ${window.location.href}`;
    window.open(`https://wa.me/${property.phoneNumber || '9131460470'}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!property) return <div className="h-screen flex items-center justify-center font-black text-blue-600 animate-pulse text-2xl tracking-tighter uppercase">CGINFRAX LOADING...</div>;

  const isLiked = property.likes?.includes(session?.user?.email);
  const isOwner = session?.user?.email === property.userEmail;

  // Slides format for Lightbox
  const slides = property.images?.map(src => ({ src }));

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-10">
      {/* Navbar */}
      <div className="flex justify-between items-center p-5 sticky top-0 z-50 bg-white/80 backdrop-blur-md">
        <button onClick={() => router.back()} className="p-3 bg-white shadow-sm rounded-2xl border border-gray-100"><ArrowLeft size={20}/></button>
        <div className="flex gap-2">
          {isOwner && (
            <>
              <button onClick={() => router.push(`/properties/edit/${property._id}`)} className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Pencil size={20}/></button>
              <button onClick={handleDelete} className="p-3 bg-red-50 text-red-600 rounded-2xl" disabled={deleting}><Trash2 size={20}/></button>
            </>
          )}
          <button onClick={handleShare} className="p-3 bg-white border border-gray-100 rounded-2xl"><Share2 size={20}/></button>
          <button onClick={handleLike} className="p-3 bg-white border border-gray-100 rounded-2xl">
            <Heart size={20} className={isLiked ? "fill-red-500 text-red-500" : "text-gray-400"} />
          </button>
        </div>
      </div>

      {/* Main Image Slider */}
      <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 px-5">
        {property.images?.map((img, i) => (
          <div key={i} className="flex-shrink-0 w-[85vw] md:w-[700px] aspect-[4/3] snap-center">
            <img 
              src={img} 
              onClick={() => openFullScreen(i)}
              className="w-full h-full object-cover rounded-[2.5rem] shadow-lg border-2 border-white cursor-pointer active:scale-95 transition-all" 
              alt="prop"
            />
          </div>
        ))}
      </div>

      {/* Property Details... (Price, Title, etc.) */}
      <div className="max-w-4xl mx-auto px-6 mt-8 space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">
            <span><Eye size={12} className="inline"/> {property.views || 0} VIEWS</span>
            <span><Heart size={12} className="inline"/> {property.likes?.length || 0} LIKES</span>
          </div>
          <h1 className="text-4xl font-[1000] text-gray-900 tracking-tighter leading-tight">{property.title}</h1>
          <p className="flex items-center gap-1 text-gray-500 font-bold"><MapPin size={18} className="text-red-500"/> {property.address}, {property.district}</p>
        </div>

        {/* Price & Action Buttons */}
        <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-5">
          <div className="text-4xl font-[1000] text-gray-900 tracking-tighter">₹{property.price?.toLocaleString('en-IN')}</div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={handleWhatsApp} className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-3xl font-black uppercase text-xs active:scale-95 transition-all shadow-lg shadow-green-100">
              <MessageCircle size={18} fill="white"/> WhatsApp
            </button>
            <button onClick={() => window.location.href = `tel:${property.phoneNumber || '9131460470'}`} className="flex items-center justify-center gap-2 bg-gray-900 text-white py-4 rounded-3xl font-black uppercase text-xs active:scale-95 transition-all shadow-lg shadow-gray-200">
              <Phone size={18} fill="white"/> Call Now
            </button>
          </div>
        </div>

        {/* Similar properties Section... */}
        {similarProperties.length > 0 && (
          <div className="pt-10 space-y-6">
            <h3 className="text-2xl font-[1000] tracking-tighter uppercase">Recommended in {property.district}</h3>
            <div className="flex overflow-x-auto gap-5 no-scrollbar pb-8">
              {similarProperties.map((item) => (
                <div key={item._id} onClick={() => { router.push(`/properties/${item.slug}`); window.scrollTo(0,0); }} className="flex-shrink-0 w-64 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-500">
                  <img src={item.images?.[0]} className="h-40 w-full object-cover" alt="similar"/>
                  <div className="p-5 space-y-2">
                    <h4 className="font-bold text-gray-900 truncate text-sm">{item.title}</h4>
                    <p className="text-blue-600 font-black text-xs">₹{item.price?.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 🔥 PREMIUM LIGHTBOX MODAL */}
      <Lightbox
        open={isModalOpen}
        close={() => setIsModalOpen(false)}
        index={currentImgIndex}
        slides={slides}
        plugins={[Zoom, Thumbnails]}
        animation={{ fade: 300, swipe: 500 }}
      />

      <style jsx>{` .hide-scrollbar::-webkit-scrollbar, .no-scrollbar::-webkit-scrollbar { display: none; } `}</style>
    </div>
  );
}