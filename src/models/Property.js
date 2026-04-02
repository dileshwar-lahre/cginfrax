import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
  title: { type: String, maxLength: 60, required: true },
  
  // 🔥 SEO & URL System
  slug: { 
    type: String, 
    unique: true, 
    lowercase: true, 
    // required: true, // 🚨 Abhi ke liye ise comment kar raha hoon jab tak purani posts update na ho jayein
    index: true 
  },
  
  desc: { type: String, maxLength: 300 },
  price: { type: Number, required: true },
  
  cat: { type: String, enum: ["Room", "Plot", "PG", "House"], required: true },
  type: { type: String }, 

  address: { type: String, maxLength: 150, required: true },
  district: { type: String, maxLength: 50, required: true },
  
  images: [String], 
  
  views: { type: Number, default: 0 },
  likes: {
    type: [String], 
    default: [],    
  },
  
  details: {
    beds: Number,
    baths: Number,
    area: Number, 
    areaUnit: { type: String, default: "Sqft" },
    gender: String, 
    sharing: String, 
    kitchen: { type: String, enum: ["Available", "Not Available"], default: "Not Available" }, 
    plotType: { type: String, enum: ["Residential", "Commercial"], default: "Residential" } 
  },
  
  userEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// ✅ PERFORMANCE: Duplicate slug index yahan se hata diya hai maine
PropertySchema.index({ district: 1, cat: 1 }); 
PropertySchema.index({ price: 1 }); 
PropertySchema.index({ createdAt: -1 }); 
PropertySchema.index({ userEmail: 1 }); 
PropertySchema.index({ title: "text", address: "text", desc: "text", district: "text" }); 

export default mongoose.models.Property || mongoose.model("Property", PropertySchema);
