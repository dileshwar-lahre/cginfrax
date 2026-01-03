import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import { User } from "@/models/User";
import { Otp } from "@/models/Otp";
import bcrypt from "bcryptjs";

// 👇 Yahan bhi 'export async function POST' hi aana chahiye
export async function POST(request) {
  try {
    const { email, otp, newPassword } = await request.json();
    const cleanEmail = email.toLowerCase().trim();
    const cleanOtp = otp.trim();

    await connectToDB();

    // 1. Verify OTP
    const otpRecord = await Otp.findOne({ email: cleanEmail, otp: cleanOtp });
    if (!otpRecord) {
      return new NextResponse("Invalid or Expired OTP", { status: 400 });
    }

    // 2. Update Password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await User.findOneAndUpdate(
      { email: cleanEmail },
      { password: hashedPassword }
    );

    // 3. Cleanup OTP
    await Otp.deleteMany({ email: cleanEmail });

    return new NextResponse("Password Updated Successfully", { status: 200 });

  } catch (err) {
    console.error("Update Password Error:", err);
    return new NextResponse("Error updating password", { status: 500 });
  }
}