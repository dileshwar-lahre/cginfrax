import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import { Otp } from "@/models/Otp";

export const POST = async (request) => {
  try {
    const body = await request.json();
    const email = body.email.toLowerCase().trim();
    const otp = body.otp.trim();

    await connectToDB();

    // 1. Check karo ki kya ye Email + OTP match kar raha hai?
    const validRecord = await Otp.findOne({ email, otp });

    if (!validRecord) {
      // Agar record nahi mila, matlab OTP galat hai ya expire ho gaya (auto-delete se)
      return new NextResponse("Invalid or Expired OTP", { status: 400 });
    }

    // 2. 🔥 MAIN STEP: OTP Sahi hai! Ab isse delete kar do (Cleanup)
    // Taaki user back karke dobara same OTP use na kar sake.
    await Otp.deleteMany({ email });

    // 3. Success return karo (Frontend is signal ko dekh ke Next Page pe jayega)
    return new NextResponse("Verified", { status: 200 });

  } catch (err) {
    console.error("Verify Error:", err);
    return new NextResponse("Server Error", { status: 500 });
  }
};