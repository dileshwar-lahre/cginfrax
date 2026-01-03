import { connectToDB } from "@/lib/db";
import Property from "@/models/Property";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Hamari nayi lib wali file

export async function POST(req, { params }) {
  try {
    await connectToDB();
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Login required" }, { status: 401 });
    }

    const userEmail = session.user.email;
    const property = await Property.findById(id);

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    // Likes array initialize karo agar na ho
    if (!property.likes) property.likes = [];

    // Like/Unlike logic
    if (property.likes.includes(userEmail)) {
      property.likes = property.likes.filter((email) => email !== userEmail);
    } else {
      property.likes.push(userEmail);
    }

    await property.save();
    return NextResponse.json({ likes: property.likes }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}