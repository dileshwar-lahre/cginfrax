import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
  title: { type: String, maxLength: 60, required: true },
  desc: { type: String, maxLength: 300 },
  price: { type: Number, required: true },
  
  // Category vs Type (e.g., Cat: Room, Type: Studio Flat)
  cat: { type: String, enum: ["Room", "Plot", "PG", "House"], required: true },
  type: { type: String }, // Apartment, Villa, Independent, etc.
  
  // Location
  address: { type: String, maxLength: 150, required: true },
  district: { type: String, maxLength: 50, required: true },
  
  images: [String], // Max 5 S3 Links
  
  // Stats for popularity
  views: { type: Number, default: 0 },
  likes: {
    type: [String], // Array of user emails
    default: [],    // Shuruat mein khali array
  },
  // Flexible details (Sqft included)
  details: {
    beds: Number,
    baths: Number,
    area: Number, // Amount
    areaUnit: { type: String, default: "Sqft" },
    gender: String, // For PG
    sharing: String, // For PG
    kitchen: { type: String, enum: ["Available", "Not Available"], default: "Not Available" }, // For Room/PG/House
    plotType: { type: String, enum: ["Residential", "Commercial"], default: "Residential" } // For Plot
  },
  
  userEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// ✅ PERFORMANCE: Database Indexes for 100000+ posts
// These indexes will make queries super fast even with large datasets
PropertySchema.index({ district: 1, cat: 1 }); // Compound index for district + category filters
PropertySchema.index({ price: 1 }); // Index for price range queries
PropertySchema.index({ createdAt: -1 }); // Index for sorting by date
PropertySchema.index({ userEmail: 1 }); // Index for user profile queries
PropertySchema.index({ title: "text", address: "text", desc: "text", district: "text" }); // Text search index

export default mongoose.models.Property || mongoose.model("Property", PropertySchema);