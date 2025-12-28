import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Property from "@/models/Property";

// 1. GET 
export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const id = searchParams.get('id');

    let properties;

    if (id) {
      properties = await Property.findById(id);
      if (!properties) {
        // Agar ID galat hai to 404 bhejo
        return NextResponse.json({ success: false, message: "Property not found" }, { status: 404 });
      }
    } else if (email) {
      properties = await Property.find({ userEmail: email }).sort({ createdAt: -1 });
    } else {
      properties = await Property.find().sort({ createdAt: -1 });
    }

    // App ke liye data ko 'success' aur 'data' key me wrap kiya
    return NextResponse.json({ success: true, data: properties });

  } catch (error) {
    console.log(error); // Server console me error dekhne ke liye
    return NextResponse.json({ success: false, message: "Error fetching data" }, { status: 500 });
  }
}

// 2. POST 
export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();
    
    const newProperty = await Property.create(body);

    // App ko naya data wapas bhejo taki screen refresh ho sake
    return NextResponse.json({ 
      success: true, 
      message: "Property Created Successfully", 
      data: newProperty 
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ success: false, message: "Error Creating Property" }, { status: 500 });
  }
}

// 3. PUT
export async function PUT(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const body = await req.json();

    if (!id) return NextResponse.json({ success: false, message: "ID Required" }, { status: 400 });

    // { new: true } ka matlab hai ki update hone ke baad wala naya data return karo
    const updatedProperty = await Property.findByIdAndUpdate(id, body, { new: true });

    return NextResponse.json({ 
      success: true, 
      message: "Updated Successfully",
      data: updatedProperty 
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ success: false, message: "Error Updating" }, { status: 500 });
  }
}

// 4. DELETE
export async function DELETE(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    await Property.findByIdAndDelete(id);
    
    return NextResponse.json({ success: true, message: "Property Deleted Successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error Deleting" }, { status: 500 });
  }
}