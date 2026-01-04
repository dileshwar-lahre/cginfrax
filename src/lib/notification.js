import nodemailer from "nodemailer";
import { User } from "@/models/User";
import { connectToDB } from "./db";

// ✅ EMAIL CONFIGURATION
const transporter = nodemailer.createTransport({
  service: "gmail", // Ya aapka SMTP service
  auth: {
    user: process.env.EMAIL_USER || "your-email@gmail.com",
    pass: process.env.EMAIL_PASS || "your-app-password",
  },
});

// ✅ SELLER KO NOTIFICATION BHEJNA
export async function notifySeller(propertyId, buyerPhone) {
  try {
    await connectToDB();
    
    // Property fetch karo (seller ka email mil jayega)
    const Property = (await import("@/models/Property")).default;
    const property = await Property.findById(propertyId);
    
    if (!property) {
      console.error("Property nahi mili:", propertyId);
      return { success: false, message: "Property not found" };
    }

    // Seller ka user data fetch karo
    const seller = await User.findOne({ email: property.userEmail });
    
    if (!seller) {
      console.error("Seller nahi mila:", property.userEmail);
      return { success: false, message: "Seller not found" };
    }

    const sellerPhone = seller.mobile;
    const sellerEmail = seller.email;

    // ✅ EMAIL NOTIFICATION
    try {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px;">
            <h2 style="color: #333;">🏠 Property Inquiry Aayi Hai!</h2>
            <p style="color: #666; line-height: 1.6;">
              Aapki property <strong>"${property.title}"</strong> ke liye nayi inquiry aayi hai.
            </p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 5px 0;"><strong>Property:</strong> ${property.title}</p>
              <p style="margin: 5px 0;"><strong>Price:</strong> ₹${property.price?.toLocaleString('en-IN')}</p>
              <p style="margin: 5px 0;"><strong>Location:</strong> ${property.address}, ${property.district}</p>
              <p style="margin: 5px 0;"><strong>Buyer Phone:</strong> ${buyerPhone}</p>
            </div>
            <p style="color: #666;">
              Kripya buyer se contact karein: <strong>${buyerPhone}</strong>
            </p>
            <p style="color: #999; font-size: 12px; margin-top: 30px;">
              CG INFRAX - Chhattisgarh's Premier Real Estate Platform
            </p>
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: process.env.EMAIL_USER || "your-email@gmail.com",
        to: sellerEmail,
        subject: `🏠 Nayi Inquiry: ${property.title}`,
        html: emailHtml,
      });

      console.log("✅ Email sent to seller:", sellerEmail);
    } catch (emailError) {
      console.error("Email send error:", emailError);
      // Email fail ho to bhi continue karo
    }

    // ✅ SMS NOTIFICATION (Optional - SMS service integrate kar sakte hain)
    // Example: Twilio, MSG91, etc.
    // For now, we'll just log it
    console.log(`📱 SMS Notification (to be implemented): Seller: ${sellerPhone}, Buyer: ${buyerPhone}`);

    return {
      success: true,
      sellerPhone,
      sellerEmail,
      message: "Notification sent successfully",
    };
  } catch (error) {
    console.error("Notification Error:", error);
    return { success: false, message: error.message };
  }
}

