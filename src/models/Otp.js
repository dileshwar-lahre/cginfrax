import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { 
    type: Date, 
    default: Date.now, 
    expires: 300 // 300 Seconds = 5 Minutes me delete
  } 
});

export const Otp = mongoose.models.Otp || mongoose.model("Otp", otpSchema);