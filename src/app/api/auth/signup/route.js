import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import { User } from "@/models/User";
import { Otp } from "@/models/Otp";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  try {
    const { username, email, mobile, password } = await request.json();
    
    // ✅ VALIDATION: Required fields check
    if (!username || !email || !mobile || !password) {
      return new NextResponse("All fields are required", { status: 400 });
    }
    
    // ✅ VALIDATION: Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanEmail = email.toLowerCase().trim();
    if (!emailRegex.test(cleanEmail)) {
      return new NextResponse("Invalid email format", { status: 400 });
    }
    
    // ✅ VALIDATION: Mobile number format (10 digits, Indian format)
    const mobileRegex = /^[6-9]\d{9}$/;
    const cleanMobile = mobile.trim();
    if (!mobileRegex.test(cleanMobile)) {
      return new NextResponse("Invalid mobile number. Must be 10 digits starting with 6-9", { status: 400 });
    }
    
    // ✅ VALIDATION: Password strength
    if (password.length < 6) {
      return new NextResponse("Password must be at least 6 characters long", { status: 400 });
    }
    
    // ✅ VALIDATION: Username length
    if (username.trim().length < 2) {
      return new NextResponse("Username must be at least 2 characters long", { status: 400 });
    }
    
    await connectToDB();

    // Double check duplication
    const existingUser = await User.findOne({ $or: [{ email: cleanEmail }, { mobile: cleanMobile }] });
    if (existingUser) {
      return new NextResponse("Email or Mobile already registered", { status: 400 });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const newUser = new User({
      username: username.trim(),
      email: cleanEmail,
      mobile: cleanMobile,
      password: hashedPassword,
    });

    await newUser.save();

    // Signup hone ke baad OTP delete kar do cleanup ke liye
    await Otp.deleteMany({ email });

    return new NextResponse("User created successfully", { status: 201 });

  } catch (err) {
    console.error("Signup Error:", err);
    return new NextResponse("Error creating user", { status: 500 });
  }
};