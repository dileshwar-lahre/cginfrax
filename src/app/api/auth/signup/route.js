import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  try {
    const { username, email, password } = await request.json();

    await connectToDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return new NextResponse("User already exists", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return new NextResponse("User created", { status: 201 });
  } catch (err) {
    return new NextResponse(err.message, { status: 500 });
  }
};