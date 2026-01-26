import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import { User } from "@/models/User";
import { OAuth2Client } from "google-auth-library";

// ✅ TERA SPECIFIC CLIENT ID
const GOOGLE_CLIENT_ID = "885862804064-sfkobq7jrutct6op9ef02lt6oba7g6uk.apps.googleusercontent.com";

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export async function POST(request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ success: false, message: "Token is required" }, { status: 400 });
    }

    // 1. Google se token verify karo
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return NextResponse.json({ success: false, message: "Invalid token payload" }, { status: 400 });
    }

    const { email, name, picture } = payload;

    await connectToDB();

    // 2. Check karo user DB me hai ya nahi
    let user = await User.findOne({ email });

    if (!user) {
      // 3. Naya User banao (Google wala)
      const tempMobile = "G-" + Math.floor(1000000000 + Math.random() * 9000000000).toString();
      user = await User.create({
        username: name || "User",
        email: email,
        image: picture || "",
        password: "", // Google walo ka password nahi hota
        mobile: tempMobile,
        provider: "google"
      });
    }

    // 4. Success Response
    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        image: user.image
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Google Login Error:", error);
    return NextResponse.json({ 
      success: false, 
      message: error.message || "Google Auth Failed" 
    }, { status: 500 });
  }
}