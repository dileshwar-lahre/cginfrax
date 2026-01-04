import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Transaction from "@/models/Transaction";
import { notifySeller } from "@/lib/notification";

export async function POST(request) {
  try {
    const { propertyId, buyerPhone } = await request.json();

    // ✅ VALIDATION
    if (!propertyId || !buyerPhone) {
      return NextResponse.json(
        { success: false, message: "Property ID aur Buyer Phone required hai" },
        { status: 400 }
      );
    }

    // ✅ MOBILE NUMBER VALIDATION
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(buyerPhone.trim())) {
      return NextResponse.json(
        { success: false, message: "Invalid mobile number format" },
        { status: 400 }
      );
    }

    await connectToDB();

    // ✅ TRANSACTION CREATE KARO
    const transaction = new Transaction({
      propertyId,
      buyerPhone: buyerPhone.trim(),
      createdAt: new Date(),
    });

    await transaction.save();

    // ✅ SELLER KO NOTIFICATION BHEJO (Async - don't wait)
    notifySeller(propertyId, buyerPhone.trim()).catch((err) => {
      console.error("Notification error (non-blocking):", err);
    });

    return NextResponse.json(
      {
        success: true,
        message: "Transaction saved aur seller ko notification bhej diya",
        transactionId: transaction._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Transaction Create Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error: " + error.message },
      { status: 500 }
    );
  }
}

