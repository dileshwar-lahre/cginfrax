import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // ✅ Google Login ke liye in dono ko required: false rakho
    mobile: { 
      type: String, 
      required: false, 
      unique: true, 
      sparse: true // 👈 Ye zaroori hai! Taaki empty mobile numbers aapas mein clash na karein
    },
    password: { 
      type: String, 
      required: false // 👈 Google users ka password nahi hota
    },
    image: { type: String }, // User ki profile photo ke liye
    role: { type: String, default: "user" }
  },
  { timestamps: true }
);

// ✅ Next.js models registration fix
export const User = mongoose.models.User || mongoose.model("User", userSchema);