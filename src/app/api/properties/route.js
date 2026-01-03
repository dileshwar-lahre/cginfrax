import { connectToDB } from "@/lib/db";
import Property from "@/models/Property";
import { NextResponse } from "next/server";

// --- 1. POST: Property Create Karne Ke Liye (Tera Purana Code) ---
export async function POST(req) {
  try {
    await connectToDB();
    const data = await req.json();

    const newProperty = await Property.create({
      title: data.title,
      desc: data.desc,
      price: Number(data.price),
      address: data.address,
      district: data.district,
      cat: data.cat,
      images: data.images,
      userEmail: data.userEmail,
      details: data.details
    });

    return NextResponse.json(newProperty, { status: 201 });
  } catch (error) {
    console.error("Dhamaka Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// --- 2. GET: Search & Filter Ke Saath Data Fetch Karne Ke Liye ---
export async function GET(req) {
  try {
    await connectToDB();
    
    // URL se query parameters nikalna
    const { searchParams } = new URL(req.url);
    const district = searchParams.get("district");
    const search = searchParams.get("search");

    let filter = {};

    // A. District Filter: Agar "All" nahi hai toh district wise filter karo
    if (district && district !== "All") {
      filter.district = district;
    }

    // B. Smart Search: Title, Address ya Description mein dhundo (Regex Use Kiya)
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } },
        { desc: { $regex: search, $options: "i" } },
        { cat: { $regex: search, $options: "i" } } // Category bhi search ho sakegi
      ];
    }

    // Data fetch karo (Naya wala pehle)
    const allProperties = await Property.find(filter).sort({ createdAt: -1 });
    
    return NextResponse.json(allProperties, { status: 200 });
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json({ error: "Data fetch fail ho gaya bhai!" }, { status: 500 });
  }
}