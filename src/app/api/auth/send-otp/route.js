import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import { Otp } from "@/models/Otp";
import { User } from "@/models/User";
import nodemailer from "nodemailer";

export const POST = async (request) => {
  try {
    const body = await request.json();
    // Email saaf kar rahe hain
    const email = body.email.toLowerCase().trim();

    await connectToDB();

    // 1. Check karo user pehle se to nahi hai
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse("User already exists with this email", { status: 400 });
    }

    // 2. 🔥 MAIN STEP: Purana OTP delete karo (Agar koi pending hai to)
    await Otp.deleteMany({ email });

    // 3. Naya OTP Generate aur Save karo
    const otpValue = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.create({ email, otp: otpValue });

    // 4. Email Bhejo
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"CXG Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verification Code",
      html: `<b>Your OTP is: ${otpValue}</b>. Valid for 5 minutes.`,
    });

    return new NextResponse("OTP Sent Successfully", { status: 200 });

  } catch (err) {
    console.error("Send OTP Error:", err);
    return new NextResponse("Failed to send OTP", { status: 500 });
  }
};