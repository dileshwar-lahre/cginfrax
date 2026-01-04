import { connectToDB } from "@/lib/db";
import Property from "@/models/Property";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// --- 1. GET: Property fetch aur views badhana ---
export async function GET(req, { params }) {
  try {
    await connectToDB();
    const { id } = await params;
    
    const property = await Property.findByIdAndUpdate(
      id, 
      { $inc: { views: 1 } }, 
      { new: true }
    );
    
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }
    return NextResponse.json(property, { status: 200 });
  } catch (error) {
    console.error("Get Property Error:", error);
    return NextResponse.json({ error: "Failed to fetch property" }, { status: 500 });
  }
}

// --- 2. PUT: Property Update/Edit (Sirf Owner ke liye) ---
export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Login karo!" }, { status: 401 });

    await connectToDB();
    const { id } = await params;
    const body = await req.json();

    const existingProperty = await Property.findById(id);
    if (!existingProperty) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    // 🔥 SECURITY CHECK: Kya ye usi ki property hai?
    if (existingProperty.userEmail !== session.user.email) {
      return NextResponse.json({ error: "You can only edit your own properties" }, { status: 403 });
    }
    
    // ✅ VALIDATION: Price must be positive if provided
    if (body.price !== undefined && Number(body.price) <= 0) {
      return NextResponse.json({ error: "Price must be greater than 0" }, { status: 400 });
    }
    
    // ✅ VALIDATION: Title length if provided
    if (body.title && body.title.length > 60) {
      return NextResponse.json({ error: "Title must be 60 characters or less" }, { status: 400 });
    }

    const updatedProperty = await Property.findByIdAndUpdate(id, { $set: body }, { new: true });
    return NextResponse.json(updatedProperty, { status: 200 });
  } catch (error) {
    console.error("Update Property Error:", error);
    return NextResponse.json({ error: "Failed to update property" }, { status: 500 });
  }
}

// --- 3. DELETE: Property khatam karna (Sirf Owner ke liye) ---
export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Login karo!" }, { status: 401 });

    await connectToDB();
    const { id } = await params;

    const property = await Property.findById(id);
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    // 🔥 SECURITY CHECK: Sirf post karne wala hi uda sakta hai
    if (property.userEmail !== session.user.email) {
      return NextResponse.json({ error: "You can only delete your own properties" }, { status: 403 });
    }

    await Property.findByIdAndDelete(id);
    return NextResponse.json({ message: "Property deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Delete Property Error:", error);
    return NextResponse.json({ error: "Failed to delete property" }, { status: 500 });
  }
}