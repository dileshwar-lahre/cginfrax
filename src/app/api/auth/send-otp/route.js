import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import { Otp } from "@/models/Otp";
import { User } from "@/models/User";
import nodemailer from "nodemailer";

export const POST = async (request) => {
  console.log("👉 1. API Route Hit hua!"); // Check 1

  try {
    const { email } = await request.json();
    console.log("👉 2. Email aaya frontend se:", email); // Check 2

    // Check Creds (Passwords print mat karna pura, bas check karo ki load hua ya nahi)
    console.log("👉 3. Email User loaded:", process.env.EMAIL_USER ? "YES" : "NO");
    console.log("👉 4. Email Pass loaded:", process.env.EMAIL_PASS ? "YES" : "NO");

    await connectToDB();
    console.log("👉 5. Database Connected");

    // Check User Existence
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ User already exists");
      return new NextResponse("User already exists", { status: 400 });
    }

    // OTP Logic
    const otpValue = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.deleteMany({ email });
    await Otp.create({ email, otp: otpValue });
    console.log("👉 6. OTP Database me save ho gaya:", otpValue);

    // Nodemailer Setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Spaces hatane ki zarurat nahi hoti usually
      },
    });

    // Send Mail
    console.log("👉 7. Email bhejne ki koshish...");
    const info = await transporter.sendMail({
      from: `"CXG Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otpValue}`,
    });

    console.log("✅ 8. Email Sent Info:", info.messageId);
    return new NextResponse("OTP Sent Successfully", { status: 200 });

  } catch (err) {
    console.error("❌ ERROR AAYA BHAI:", err); // Asli error yahan dikhega
    return new NextResponse(`Error: ${err.message}`, { status: 500 });
  }
};