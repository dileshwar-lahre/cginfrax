module.exports = [
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/dns [external] (dns, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("dns", () => require("dns"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[project]/cginfrax/src/models/User.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "User",
    ()=>User
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$cginfrax$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/cginfrax/node_modules/mongoose)");
;
const userSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$cginfrax$2f$node_modules$2f$mongoose$29$__["default"].Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    // ✅ Google Login ke liye in dono ko required: false rakho
    mobile: {
        type: String,
        required: false,
        unique: true,
        sparse: true // 👈 Ye zaroori hai! Taaki empty mobile numbers aapas mein clash na karein
    },
    password: {
        type: String,
        required: false // 👈 Google users ka password nahi hota
    },
    image: {
        type: String
    },
    role: {
        type: String,
        default: "user"
    }
}, {
    timestamps: true
});
const User = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$cginfrax$2f$node_modules$2f$mongoose$29$__["default"].models.User || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$cginfrax$2f$node_modules$2f$mongoose$29$__["default"].model("User", userSchema);
}),
"[project]/cginfrax/src/models/EmailNotification.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$cginfrax$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/cginfrax/node_modules/mongoose)");
;
const emailNotificationSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$cginfrax$2f$node_modules$2f$mongoose$29$__["default"].Schema({
    propertyId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$cginfrax$2f$node_modules$2f$mongoose$29$__["default"].Schema.Types.ObjectId,
        ref: "Property",
        required: true
    },
    recipientEmail: {
        type: String,
        required: true
    },
    sentAt: {
        type: Date,
        default: Date.now
    },
    date: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
// Index for daily email count queries
emailNotificationSchema.index({
    date: 1,
    propertyId: 1
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$cginfrax$2f$node_modules$2f$mongoose$29$__["default"].models.EmailNotification || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$cginfrax$2f$node_modules$2f$mongoose$29$__["default"].model("EmailNotification", emailNotificationSchema);
}),
"[project]/cginfrax/src/lib/emailNotifications.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "notifyUsersAboutNewProperty",
    ()=>notifyUsersAboutNewProperty
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cginfrax/node_modules/nodemailer/lib/nodemailer.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cginfrax/src/lib/db.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$models$2f$User$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cginfrax/src/models/User.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$models$2f$EmailNotification$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cginfrax/src/models/EmailNotification.js [app-route] (ecmascript)");
;
;
;
;
// ✅ EMAIL CONFIGURATION
const transporter = __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
// ✅ Get today's date in YYYY-MM-DD format
const getTodayDate = ()=>{
    return new Date().toISOString().split('T')[0];
};
// ✅ Check how many emails sent today for this property
const getEmailsSentToday = async (propertyId)=>{
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectToDB"])();
    const today = getTodayDate();
    const count = await __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$models$2f$EmailNotification$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].countDocuments({
        propertyId,
        date: today
    });
    return count;
};
async function notifyUsersAboutNewProperty(property) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectToDB"])();
        const today = getTodayDate();
        const emailsSentToday = await getEmailsSentToday(property._id);
        // ✅ MAX 10 EMAILS PER DAY
        if (emailsSentToday >= 10) {
            console.log(`⚠️ Daily email limit reached (10) for property ${property._id}`);
            return {
                success: false,
                message: "Daily email limit reached"
            };
        }
        // ✅ Get random 10 users (excluding the property owner)
        const users = await __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$models$2f$User$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["User"].find({
            email: {
                $ne: property.userEmail
            },
            mobile: {
                $not: /^G-/
            }
        }).limit(10).lean();
        if (users.length === 0) {
            console.log("No users found to notify");
            return {
                success: false,
                message: "No users to notify"
            };
        }
        // ✅ Calculate how many more emails we can send
        const remainingSlots = 10 - emailsSentToday;
        const usersToNotify = users.slice(0, remainingSlots);
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://cginfrax.com";
        const propertyUrl = `${baseUrl}/properties/${property._id}`;
        const categoryName = property.cat === "Room" ? "Room" : property.cat === "PG" ? "PG" : property.cat === "House" ? "House" : "Plot";
        // ✅ Send emails
        const emailPromises = usersToNotify.map(async (user)=>{
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
                    html: emailHtml
                });
                // ✅ Save notification record
                await __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$models$2f$EmailNotification$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].create({
                    propertyId: property._id,
                    recipientEmail: user.email,
                    date: today
                });
                console.log(`✅ Email sent to ${user.email} for property ${property._id}`);
                return {
                    success: true,
                    email: user.email
                };
            } catch (error) {
                console.error(`❌ Failed to send email to ${user.email}:`, error);
                return {
                    success: false,
                    email: user.email,
                    error: error.message
                };
            }
        });
        const results = await Promise.all(emailPromises);
        const successCount = results.filter((r)=>r.success).length;
        return {
            success: true,
            message: `Sent ${successCount} email(s) successfully`,
            totalSent: successCount,
            totalToday: emailsSentToday + successCount
        };
    } catch (error) {
        console.error("Email notification error:", error);
        return {
            success: false,
            message: error.message
        };
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5c4ae648._.js.map