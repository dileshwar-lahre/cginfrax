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
  // models/Property.js
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
    sharing: String // For PG
  },
  
  userEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Property || mongoose.model("Property", PropertySchema);