import { NextResponse } from "next/server";
import Property from "@/models/Property"; 
import { connectToDB } from "@/lib/db";   

export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const district = searchParams.get("district");
    const currentId = searchParams.get("currentId"); // MongoDB _id
    const currentSlug = searchParams.get("slug");   // Property Slug

    // 1. Pehle koshish karo same district ki properties nikalne ki
    // Current property ko exclude karo (ID ya Slug se)
    let query = {
      $and: [
        { district: { $regex: new RegExp(district, "i") } }, // Case insensitive search
        { _id: { $ne: currentId } },
        { slug: { $ne: currentSlug } }
      ]
    };

    let properties = await Property.find(query)
      .limit(6)
      .sort({ createdAt: -1 })
      .lean();

    // 2. 🔥 FALLBACK: Agar same district mein kuch nahi mila (Khali array)
    // Toh poore Chhattisgarh (ya saari cities) se random properties uthao
    if (properties.length === 0) {
      properties = await Property.find({
        _id: { $ne: currentId },
        slug: { $ne: currentSlug }
      })
      .limit(6)
      .sort({ views: -1 }) // Zyada dekhi jane wali properties dikhao
      .lean();
    }

    return NextResponse.json(properties);
  } catch (error) {
    console.error("SIMILAR API ERROR:", error);
    return NextResponse.json([]); 
  }
}