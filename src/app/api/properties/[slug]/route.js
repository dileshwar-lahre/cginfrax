import { connectToDB } from "@/lib/db";
import Property from "@/models/Property";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import mongoose from "mongoose";

// 🔥 MASTER SLUG GENERATOR (Copy of your main logic)
const generateSmartSlug = (data) => {
  const category = data.cat?.toLowerCase() || 'property';
  const district = data.district?.toLowerCase() || 'chhattisgarh';
  const bhk = data.details?.beds || 0;
  
  let cleanAddress = data.address?.toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const cleanDistrict = district.replace(/[^a-z0-9]+/g, '-');

  // Duplicate City Fix
  if (cleanAddress.includes(cleanDistrict)) {
    cleanAddress = cleanAddress.replace(cleanDistrict, '').replace(/-+/g, '-').replace(/(^-|-$)+/g, '');
  }

  const uniqueId = Math.random().toString(36).substring(2, 6);
  const typeLabel = category === 'pg' ? `pg-for-${data.details?.gender?.toLowerCase() || 'all'}` : category;
  const locPart = cleanAddress ? `${cleanAddress}-in-` : '';
  
  return `${bhk}-bhk-${typeLabel}-at-${locPart}${cleanDistrict}-${uniqueId}`;
};

// --- 1. GET: Property fetch ---
export async function GET(req, { params }) {
  try {
    await connectToDB();
    const { slug } = await params; 

    // Pehle slug se dhoondo
    let property = await Property.findOneAndUpdate(
      { slug: slug }, 
      { $inc: { views: 1 } }, 
      { new: true }
    );

    // Agar slug se nahi mila, toh ID se dhoondo
    if (!property && mongoose.Types.ObjectId.isValid(slug)) {
      property = await Property.findByIdAndUpdate(
        slug, 
        { $inc: { views: 1 } }, 
        { new: true }
      );
    }
    
    if (!property) {
      return NextResponse.json({ error: "Property nahi mili bhai!" }, { status: 404 });
    }
    return NextResponse.json(property, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch property" }, { status: 500 });
  }
}

// --- 2. PUT: Property Update (With Slug Update) ---
export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Login karo!" }, { status: 401 });

    await connectToDB();
    const { slug } = await params;
    const body = await req.json();

    // Pehle check karo property exist karti hai
    let existingProperty = await Property.findOne({ slug: slug });
    if (!existingProperty && mongoose.Types.ObjectId.isValid(slug)) {
      existingProperty = await Property.findById(slug);
    }

    if (!existingProperty) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    // Security Check
    if (existingProperty.userEmail !== session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // 🔥 SMART UPDATE: Agar Address, City ya BHK badla hai, toh naya SLUG banao
    if (body.address || body.district || (body.details && body.details.beds)) {
      // Purane data aur naye data ko merge karke slug banao
      const slugData = {
        ...existingProperty._doc,
        ...body,
        details: { ...existingProperty.details, ...body.details }
      };
      body.slug = generateSmartSlug(slugData);
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      existingProperty._id, 
      { $set: body }, 
      { new: true }
    );

    return NextResponse.json(updatedProperty, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Update failed!" }, { status: 500 });
  }
}

// --- 3. DELETE: Property Delete ---
export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Login karo!" }, { status: 401 });

    await connectToDB();
    const { slug } = await params;

    let property = await Property.findOne({ slug: slug });
    if (!property && mongoose.Types.ObjectId.isValid(slug)) {
      property = await Property.findById(slug);
    }

    if (!property || property.userEmail !== session.user.email) {
      return NextResponse.json({ error: "Unauthorized or not found" }, { status: 403 });
    }

    await Property.findByIdAndDelete(property._id);
    return NextResponse.json({ message: "Property deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed!" }, { status: 500 });
  }
}