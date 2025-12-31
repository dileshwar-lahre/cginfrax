import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import { User } from "@/models/User";
import { Otp } from "@/models/Otp";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  try {
    const { username, email, mobile, password } = await request.json();
    await connectToDB();

    // Double check duplication
    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      return new NextResponse("Email or Mobile already registered", { status: 400 });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const newUser = new User({
      username,
      email,
      mobile,
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