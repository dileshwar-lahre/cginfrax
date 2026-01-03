import { connectToDB } from "@/lib/db";
import Property from "@/models/Property";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectToDB();
    const { id } = await params; 

    if (!id || id === "undefined") {
      return NextResponse.json({ error: "ID missing hai!" }, { status: 400 });
    }

    // Views badhao aur data fetch karo
    const property = await Property.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!property) {
      return NextResponse.json({ error: "Property nahi mili!" }, { status: 404 });
    }

    return NextResponse.json(property, { status: 200 });
  } catch (error) {
    console.error("GET API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}