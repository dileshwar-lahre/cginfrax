import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import { User } from "@/models/User";
import { Otp } from "@/models/Otp";
import nodemailer from "nodemailer";

// 👇 DHYAN DE: Yahan 'export default' NAHI ayega.
// Seedha 'export async function POST' likhna hai.
export async function POST(request) {
  try {
    const { email } = await request.json();
    const cleanEmail = email.toLowerCase().trim();

    await connectToDB();

    // 1. Check User
    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      return new NextResponse("User not found! Please Signup first.", { status: 404 });
    }

    // 2. Old OTP Delete & New Create
    await Otp.deleteMany({ email: cleanEmail });
    const otpValue = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.create({ email: cleanEmail, otp: otpValue });

    // 3. Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"CXG Security" <${process.env.EMAIL_USER}>`,
      to: cleanEmail,
      subject: "Reset Your Password",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Password Reset Request</h2>
          <p>Use this code to reset your password:</p>
          <h1 style="color: #DC2626; letter-spacing: 5px;">${otpValue}</h1>
          <p>Valid for 5 minutes.</p>
        </div>
      `,
    });

    return new NextResponse("OTP Sent", { status: 200 });

  } catch (err) {
    console.error("Send OTP Error:", err);
    return new NextResponse("Error sending OTP", { status: 500 });
  }
}