import { connectToDB } from "@/lib/db";
import Property from "@/models/Property";
import { NextResponse } from "next/server";

// 🔥 MASTER SLUG GENERATOR: Address + City Logic (No Duplicates)
const generateSmartSlug = (data) => {
  const category = data.cat?.toLowerCase() || 'property';
  const district = data.district?.toLowerCase() || 'chhattisgarh';
  const bhk = data.details?.beds || 0;
  const area = data.details?.area || 0;
  
  // 📍 1. Address cleaning
  let cleanAddress = data.address?.toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  // 📍 2. City cleaning 
  const cleanDistrict = district.replace(/[^a-z0-9]+/g, '-');

  // 📍 3. Double City Fix: Agar address mein pehle se city ka naam hai, toh usey hata do
  // Taaki "bilaspur-in-bilaspur" na bane
  if (cleanAddress.includes(cleanDistrict)) {
    cleanAddress = cleanAddress.replace(cleanDistrict, '').replace(/-+/g, '-').replace(/(^-|-$)+/g, '');
  }

  // Unique suffix
  const uniqueId = Math.random().toString(36).substring(2, 6);

  // --- Slug Construction ---
  
  // A. Logic for PLOT
  if (category === 'plot' || category === 'land') {
    const pType = data.details?.plotType?.toLowerCase() || 'residential';
    const locPart = cleanAddress ? `${cleanAddress}-in-` : '';
    return `${area}-sqft-${pType}-plot-${locPart}${cleanDistrict}-${uniqueId}`;
  }

  // B. Logic for HOUSE / ROOM / PG
  const typeLabel = category === 'pg' ? `pg-for-${data.details?.gender?.toLowerCase() || 'all'}` : category;
  const locPart = cleanAddress ? `${cleanAddress}-in-` : '';
  
  // Result: 3-bhk-house-at-sindhi-colony-in-bil-xyz
  return `${bhk}-bhk-${typeLabel}-at-${locPart}${cleanDistrict}-${uniqueId}`;
};

// --- 1. POST: Property Create ---
export async function POST(req) {
  try {
    await connectToDB();
    const data = await req.json();
    
    if (!data.title || !data.price || !data.address || !data.district || !data.cat || !data.userEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ✅ Naya Smart Slug generate ho raha hai
    const slug = generateSmartSlug(data);

    const sanitizeString = (str) => typeof str === 'string' ? str.trim().replace(/[<>]/g, '') : str;
    
    const newProperty = await Property.create({
      title: sanitizeString(data.title),
      slug: slug, 
      desc: sanitizeString(data.desc),
      price: Number(data.price),
      address: sanitizeString(data.address),
      district: sanitizeString(data.district),
      cat: data.cat,
      images: data.images,
      userEmail: data.userEmail,
      details: data.details
    });

    try {
      const { notifyUsersAboutNewProperty } = await import("@/lib/emailNotifications");
      await notifyUsersAboutNewProperty(newProperty);
    } catch (e) { console.error("Email Error:", e); }

    return NextResponse.json(newProperty, { status: 201 });
  } catch (error) {
    console.error("Dhamaka Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// --- 2. GET: Search & Filters ---
export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const district = searchParams.get("district");
    const search = searchParams.get("search");
    
    // 🔥 FIX: cat aur category dono handle honge ab
    const category = searchParams.get("cat") || searchParams.get("category");
    
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const email = searchParams.get("email");
    
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 20;
    const skip = (page - 1) * limit;

    let filter = {};

    if (email) {
      filter.userEmail = email; 
    } else {
      if (district && district !== "All") filter.district = district;
      if (category && category !== "All") filter.cat = category;
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
      }
      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: "i" } },
          { address: { $regex: search, $options: "i" } },
          { slug: { $regex: search, $options: "i" } } 
        ];
      }
    }

    const [allProperties, totalCount] = await Promise.all([
      Property.find(filter)
        // ✅ Slug list mein bhej rahe hain
        .select("title slug desc price cat address district images views likes userEmail details createdAt")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Property.countDocuments(filter)
    ]);
    
    return NextResponse.json({
      properties: allProperties,
      pagination: { total: totalCount }
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Data fetch fail ho gaya!" }, { status: 500 });
  }
}
