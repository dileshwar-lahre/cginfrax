import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db"; 
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

// 👇 DHYAN DE: Yahan 'export default' NAHI ayega.
// Seedha 'export async function POST' likhna hai.
export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    // ✅ VALIDATION: Required fields
    if (!email || !password) {
      return NextResponse.json({ 
        success: false, 
        message: "Email and password are required" 
      }, { status: 400 });
    }
    
    // ✅ VALIDATION: Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanEmail = email.toLowerCase().trim();
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json({ 
        success: false, 
        message: "Invalid email format" 
      }, { status: 400 });
    }

    await connectToDB();

    // 1. User dhundo
    const user = await User.findOne({ email: cleanEmail });
    
    // Agar user nahi mila
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        message: "User not found" 
      }, { status: 404 });
    }

    // 2. Password Check karo
    const isMatch = await bcrypt.compare(password, user.password);
    
    // Agar password galat hai
    if (!isMatch) {
      return NextResponse.json({ 
        success: false, 
        message: "Wrong Password" 
      }, { status: 401 });
    }

    // 3. Sab sahi hai -> Success bhejo
    return NextResponse.json({ 
      success: true, 
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email 
      } 
    }, { status: 200 });

  } catch (error) {
    console.error("Mobile Login Error:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Server Error" 
    }, { status: 500 });
  }
}