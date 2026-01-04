import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import { User } from "@/models/User";

export async function POST(request) {
  try {
    const { email, phone } = await request.json();
    
    // ✅ VALIDATION: Required fields
    if (!email || !phone) {
      return NextResponse.json({ 
        success: false, 
        message: "Email and phone are required" 
      }, { status: 400 });
    }
    
    // ✅ VALIDATION: Phone format (10 digits, starting with 6-9)
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = phone.trim().replace(/\D/g, "");
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json({ 
        success: false, 
        message: "Invalid phone number. Must be 10 digits starting with 6-9." 
      }, { status: 400 });
    }
    
    // ✅ SECURITY: Sanitize email
    const cleanEmail = email.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json({ 
        success: false, 
        message: "Invalid email format" 
      }, { status: 400 });
    }

    await connectToDB();

    // Check if phone already exists (for another user)
    const existingPhone = await User.findOne({ mobile: cleanPhone });
    if (existingPhone && existingPhone.email !== cleanEmail) {
      return NextResponse.json({ 
        success: false, 
        message: "Phone number already registered with another account" 
      }, { status: 400 });
    }

    // Update user phone
    const user = await User.findOneAndUpdate(
      { email: cleanEmail },
      { mobile: cleanPhone },
      { new: true }
    );
    
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        message: "User not found" 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Phone number updated successfully",
      user: {
        id: user._id,
        email: user.email,
        mobile: user.mobile
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Update Phone Error:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Server Error" 
    }, { status: 500 });
  }
}



