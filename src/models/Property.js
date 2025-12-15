import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ['For Sell', 'For Buy', 'For Rent'], default: 'For Sell' },
  beds: { type: Number, default: 0 },
  baths: { type: Number, default: 0 },
  area: { type: String, required: true },
  imageUrl: { type: String, required: true }, // Filhal URL dalenge (Image upload baad me)
  userEmail: { type: String, required: true }, // Kisne upload kiya
}, { timestamps: true });

export default mongoose.models.Property || mongoose.model("Property", PropertySchema);