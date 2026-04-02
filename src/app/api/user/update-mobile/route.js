import { connectToDB } from "@/lib/db";
import { User } from "@/models/User"; // ✅ YE HAI FIX: Brackets lagao kyunki wahan 'export const' hai
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { mobile, email } = await req.json();
    
    if (!mobile || !email) {
      return NextResponse.json({ error: "Data missing!" }, { status: 400 });
    }

    await connectToDB();
    
    const updatedUser = await User.findOneAndUpdate(
      { email: email }, 
      { mobile: mobile },
      { new: true }
    );
    
    if (!updatedUser) {
      return NextResponse.json({ error: "User nahi mila!" }, { status: 404 });
    }

    // ✅ Response format ko Popup ke logic se match karo
    return NextResponse.json({ success: true, message: "Updated!" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
