// src/app/api/properties/similar/route.js
import { NextResponse } from "next/server";
import Property from "@/models/Property"; // Tera model path
import { connectToDB } from "@/lib/db";   // Tera DB connection path

export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const district = searchParams.get("district");
    const currentId = searchParams.get("currentId");

    if (!district) {
      return NextResponse.json([]); // District nahi hai toh khali bhej do
    }

    // 🔥 Sirf District match karo, beds ko priority banao par mandatory nahi
    const properties = await Property.find({
      district: district,
      _id: { $ne: currentId }
    }).lean();

    return NextResponse.json(properties);
  } catch (error) {
    console.error("SERVER ERROR:", error);
    // Crash hone ke bajaye khali array bhejo taaki frontend na phate
    return NextResponse.json([]); 
  }
}