import { connectToDB } from "@/lib/db";
import Property from "@/models/Property";
import { NextResponse } from "next/server";

// --- 1. POST: Property Create Karne Ke Liye ---
export async function POST(req) {
  try {
    await connectToDB();
    const data = await req.json();
    
    // ✅ VALIDATION: Required fields
    if (!data.title || !data.price || !data.address || !data.district || !data.cat || !data.userEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    // ✅ VALIDATION: Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.userEmail)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }
    
    // ✅ VALIDATION: Price must be positive
    if (Number(data.price) <= 0) {
      return NextResponse.json({ error: "Price must be greater than 0" }, { status: 400 });
    }
    
    // ✅ VALIDATION: Title length
    if (data.title.length > 60) {
      return NextResponse.json({ error: "Title must be 60 characters or less" }, { status: 400 });
    }
    
    // ✅ VALIDATION: Images limit
    if (data.images && data.images.length > 5) {
      return NextResponse.json({ error: "Maximum 5 images allowed" }, { status: 400 });
    }

    const newProperty = await Property.create({
      title: data.title,
      desc: data.desc,
      price: Number(data.price),
      address: data.address,
      district: data.district,
      cat: data.cat,
      images: data.images,
      userEmail: data.userEmail, // Pakka karna ki frontend se userEmail hi aa raha hai
      details: data.details
    });

    return NextResponse.json(newProperty, { status: 201 });
  } catch (error) {
    console.error("Dhamaka Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// --- 2. GET: Search, District & Email Filter ---
export async function GET(req) {
  try {
    await connectToDB();
    
    const { searchParams } = new URL(req.url);
    const district = searchParams.get("district");
    const search = searchParams.get("search");
    const email = searchParams.get("email"); // 🔥 Naya: Email parameter pakda

    let filter = {};

    // A. Profile Page Logic: Agar email aaya hai, toh sirf usi user ki property dikhao
    if (email) {
      filter.userEmail = email; 
    } 
    // B. Search/Home Page Logic: Agar email nahi hai, toh baki filters lagao
    else {
      if (district && district !== "All") {
        filter.district = district;
      }

      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: "i" } },
          { address: { $regex: search, $options: "i" } },
          { desc: { $regex: search, $options: "i" } },
          { cat: { $regex: search, $options: "i" } }
        ];
      }
    }

    // Data fetch karo (Latest first)
    const allProperties = await Property.find(filter).sort({ createdAt: -1 });
    
    return NextResponse.json(allProperties, { status: 200 });
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json({ error: "Data fetch fail ho gaya bhai!" }, { status: 500 });
  }
}