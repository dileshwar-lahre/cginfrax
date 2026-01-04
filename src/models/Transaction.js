import mongoose from "mongoose";

// ✅ OPTIMIZED: Sirf zaruri data store karte hain
// Baaki data (property details, seller info) fetch karke dikhayenge
const transactionSchema = new mongoose.Schema(
  {
    propertyId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Property", 
      required: true,
      index: true // Fast queries ke liye
    },
    buyerPhone: { 
      type: String, 
      required: true,
      index: true // Fast queries ke liye
    },
    createdAt: { 
      type: Date, 
      default: Date.now,
      index: true // Sorting ke liye
    }
  },
  { timestamps: false } // createdAt manually manage kar rahe hain
);

// Compound index for admin dashboard queries
transactionSchema.index({ createdAt: -1 });

export default mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);

