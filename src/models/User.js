import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Google login walo ka password nahi hoga
    img: { type: String },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = mongoose.models?.User || mongoose.model("User", userSchema);