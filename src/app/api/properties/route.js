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
    
    // ✅ VALIDATION: Kitchen value (if provided)
    if (data.details?.kitchen && !["Available", "Not Available"].includes(data.details.kitchen)) {
      return NextResponse.json({ error: "Invalid kitchen value" }, { status: 400 });
    }
    
    // ✅ VALIDATION: Plot type (if provided)
    if (data.details?.plotType && !["Residential", "Commercial"].includes(data.details.plotType)) {
      return NextResponse.json({ error: "Invalid plot type" }, { status: 400 });
    }
    
    // ✅ SECURITY: Sanitize inputs to prevent injection
    const sanitizeString = (str) => {
      if (typeof str !== 'string') return str;
      return str.trim().replace(/[<>]/g, ''); // Remove potential XSS characters
    };
    
    // Sanitize all string inputs
    if (data.title) data.title = sanitizeString(data.title);
    if (data.desc) data.desc = sanitizeString(data.desc);
    if (data.address) data.address = sanitizeString(data.address);
    if (data.district) data.district = sanitizeString(data.district);

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

    // ✅ SEND EMAIL NOTIFICATIONS (10 per day max)
    try {
      const { notifyUsersAboutNewProperty } = await import("@/lib/emailNotifications");
      await notifyUsersAboutNewProperty(newProperty);
    } catch (emailError) {
      console.error("Email notification error (non-blocking):", emailError);
      // Don't fail the property creation if email fails
    }

    return NextResponse.json(newProperty, { status: 201 });
  } catch (error) {
    console.error("Dhamaka Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// --- 2. GET: Search, District & Email Filter with Pagination & Optimization ---
export async function GET(req) {
  try {
    await connectToDB();
    
    const { searchParams } = new URL(req.url);
    const district = searchParams.get("district");
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const email = searchParams.get("email");
    const kitchen = searchParams.get("kitchen");
    const plotType = searchParams.get("plotType");
    
    // ✅ PAGINATION: Default 20 items per page (100000 posts handle karne ke liye)
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 20;
    const skip = (page - 1) * limit;

    let filter = {};

    // A. Profile Page Logic: Agar email aaya hai, toh sirf usi user ki property dikhao
    if (email) {
      filter.userEmail = email; 
    } 
    // B. Search/Home Page Logic: Agar email nahi hai, toh baki filters lagao
    else {
      // District Filter
      if (district && district !== "All") {
        filter.district = district;
      }

      // Category Filter
      if (category && category !== "All") {
        filter.cat = category;
      }

      // Price Range Filter (Optimized for large datasets)
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) {
          filter.price.$gte = Number(minPrice);
        }
        if (maxPrice) {
          filter.price.$lte = Number(maxPrice);
        }
      }

      // Kitchen Filter (for Room, PG, House)
      if (kitchen && (category === "Room" || category === "PG" || category === "House")) {
        filter["details.kitchen"] = kitchen;
      }

      // Plot Type Filter (for Plot)
      if (plotType && category === "Plot") {
        filter["details.plotType"] = plotType;
      }

      // Search Filter (Text search - Optimized with indexes)
      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: "i" } },
          { address: { $regex: search, $options: "i" } },
          { desc: { $regex: search, $options: "i" } },
          { district: { $regex: search, $options: "i" } }
        ];
      }
    }

    // ✅ OPTIMIZED QUERY: Only fetch required fields + pagination
    // Using lean() for better performance with large datasets
    const [allProperties, totalCount] = await Promise.all([
      Property.find(filter)
        .select("title desc price cat address district images views likes userEmail details createdAt")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(), // Lean for faster queries
      Property.countDocuments(filter) // Total count for pagination
    ]);
    
    return NextResponse.json({
      properties: allProperties,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
        hasNext: page * limit < totalCount,
        hasPrev: page > 1
      }
    }, { status: 200 });
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json({ error: "Data fetch fail ho gaya bhai!" }, { status: 500 });
  }
}