import nodemailer from "nodemailer";
import { connectToDB } from "./db";
import { User } from "@/models/User";
import EmailNotification from "@/models/EmailNotification";

// ✅ EMAIL CONFIGURATION
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Get today's date in YYYY-MM-DD format
const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};

// ✅ Check how many emails sent today for this property
const getEmailsSentToday = async (propertyId) => {
  await connectToDB();
  const today = getTodayDate();
  const count = await EmailNotification.countDocuments({
    propertyId,
    date: today,
  });
  return count;
};

// ✅ Send email notification to users about new property
export async function notifyUsersAboutNewProperty(property) {
  try {
    await connectToDB();
    
    const today = getTodayDate();
    const emailsSentToday = await getEmailsSentToday(property._id);
    
    // ✅ MAX 10 EMAILS PER DAY
    if (emailsSentToday >= 10) {
      console.log(`⚠️ Daily email limit reached (10) for property ${property._id}`);
      return { success: false, message: "Daily email limit reached" };
    }

    // ✅ Get random 10 users (excluding the property owner)
    const users = await User.find({
      email: { $ne: property.userEmail },
      mobile: { $not: /^G-/ }, // Exclude users without real phone numbers
    })
    .limit(10)
    .lean();

    if (users.length === 0) {
      console.log("No users found to notify");
      return { success: false, message: "No users to notify" };
    }

    // ✅ Calculate how many more emails we can send
    const remainingSlots = 10 - emailsSentToday;
    const usersToNotify = users.slice(0, remainingSlots);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://cginfrax.com";
    const propertyUrl = `${baseUrl}/properties/${property._id}`;
    const categoryName = property.cat === "Room" ? "Room" : property.cat === "PG" ? "PG" : property.cat === "House" ? "House" : "Plot";

    // ✅ Send emails
    const emailPromises = usersToNotify.map(async (user) => {
      try {
        const emailHtml = `
          <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #1a1a1a; margin-bottom: 20px;">🏠 New ${categoryName} Available in ${property.district}!</h2>
              
              <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
                <h3 style="color: #333; margin-top: 0;">${property.title}</h3>
                <p style="color: #666; margin: 10px 0;"><strong>Price:</strong> ₹${property.price?.toLocaleString('en-IN')}</p>
                <p style="color: #666; margin: 10px 0;"><strong>Location:</strong> ${property.address}, ${property.district}</p>
                ${property.desc ? `<p style="color: #666; margin: 10px 0;">${property.desc}</p>` : ''}
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${propertyUrl}" style="background-color: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
                  View Property Details
                </a>
              </div>

              <p style="color: #999; font-size: 12px; margin-top: 30px; text-align: center;">
                CG INFRAX - Chhattisgarh's Premier Real Estate Platform<br>
                <a href="${baseUrl}" style="color: #3b82f6;">Visit Website</a>
              </p>
            </div>
          </div>
        `;

        await transporter.sendMail({
          from: `"CG INFRAX" <${process.env.EMAIL_USER}>`,
          to: user.email,
          subject: `🏠 New ${categoryName} in ${property.district} - ₹${property.price?.toLocaleString('en-IN')}`,
          html: emailHtml,
        });

        // ✅ Save notification record
        await EmailNotification.create({
          propertyId: property._id,
          recipientEmail: user.email,
          date: today,
        });

        console.log(`✅ Email sent to ${user.email} for property ${property._id}`);
        return { success: true, email: user.email };
      } catch (error) {
        console.error(`❌ Failed to send email to ${user.email}:`, error);
        return { success: false, email: user.email, error: error.message };
      }
    });

    const results = await Promise.all(emailPromises);
    const successCount = results.filter(r => r.success).length;

    return {
      success: true,
      message: `Sent ${successCount} email(s) successfully`,
      totalSent: successCount,
      totalToday: emailsSentToday + successCount,
    };
  } catch (error) {
    console.error("Email notification error:", error);
    return { success: false, message: error.message };
  }
}



