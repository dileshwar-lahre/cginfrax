import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Property from "@/models/Property";

// 1. GET (Ab ye ID se bhi dhoondhega)
export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const id = searchParams.get('id'); // 👈 New: ID check

    let properties;

    if (id) {
      // Agar ID hai to sirf wahi property bhejo (Edit page ke liye)
      properties = await Property.findById(id);
    } else if (email) {
      properties = await Property.find({ userEmail: email }).sort({ createdAt: -1 });
    } else {
      properties = await Property.find().sort({ createdAt: -1 });
    }

    return NextResponse.json(properties);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
  }
}

// 2. POST (Same rahega)
export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const newProperty = await Property.create(body);
    return NextResponse.json({ message: "Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

// 3. PUT (Update karne ke liye) 🆕
export async function PUT(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const body = await req.json();

    if (!id) return NextResponse.json({ message: "ID Required" }, { status: 400 });

    // Purana data hatakar naya data update karo
    await Property.findByIdAndUpdate(id, body);

    return NextResponse.json({ message: "Updated Successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error Updating" }, { status: 500 });
  }
}

// 4. DELETE (Same rahega)
export async function DELETE(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    await Property.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error Deleting" }, { status: 500 });
  }
}