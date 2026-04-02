import { NextResponse } from "next/server";
import Property from "@/models/Property"; 
import { connectToDB } from "@/lib/db";   

// ✅ SABSE ZARURI: Next.js ko batao ki ye API hamesha dynamic rahegi
// Isse "DYNAMIC_SERVER_USAGE" wala error jadd se khatam ho jayega.
export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();

    // URL params nikalne ka sahi tarika Next.js APIs mein
    const { searchParams } = new URL(req.url);
    const district = searchParams.get("district") || "";
    const currentId = searchParams.get("currentId") || ""; 
    const currentSlug = searchParams.get("slug") || "";

    // 1. Same district ki properties (Current ko exclude karke)
    let query = {
      $and: [
        { district: { $regex: new RegExp(district, "i") } }, 
        { _id: { $ne: currentId } },
        { slug: { $ne: currentSlug } }
      ]
    };

    let properties = await Property.find(query)
      .limit(6)
      .sort({ createdAt: -1 })
      .lean();

    // 2. 🔥 FALLBACK: Agar district match nahi hua toh top views wali dikhao
    if (!properties || properties.length === 0) {
      properties = await Property.find({
        _id: { $ne: currentId },
        slug: { $ne: currentSlug }
      })
      .limit(6)
      .sort({ views: -1 }) 
      .lean();
    }

    // Response hamesha array bhejo taaki frontend crash na ho
    return NextResponse.json(properties || []);

  } catch (error) {
    // Build worker ko error message mat dikhao, bas log karo
    console.error("SIMILAR API ERROR:", error.message);
    return NextResponse.json([]); 
  }
}
