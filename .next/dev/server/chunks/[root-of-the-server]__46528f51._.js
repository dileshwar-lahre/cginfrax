module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/cginfrax/src/lib/db.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "connectToDB",
    ()=>connectToDB
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$cginfrax$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/cginfrax/node_modules/mongoose)");
;
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
}
let cached = /*TURBOPACK member replacement*/ __turbopack_context__.g.mongoose;
if (!cached) {
    cached = /*TURBOPACK member replacement*/ __turbopack_context__.g.mongoose = {
        conn: null,
        promise: null
    };
}
const connectToDB = async ()=>{
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        const opts = {
            dbName: "cginfrax_db",
            bufferCommands: false
        };
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$cginfrax$2f$node_modules$2f$mongoose$29$__["default"].connect(MONGODB_URI, opts).then((mongoose)=>{
            console.log("✅ MongoDB Connected");
            return mongoose;
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
    return cached.conn;
};
}),
"[project]/cginfrax/src/models/Property.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$cginfrax$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/cginfrax/node_modules/mongoose)");
;
const PropertySchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$cginfrax$2f$node_modules$2f$mongoose$29$__["default"].Schema({
    title: {
        type: String,
        maxLength: 60,
        required: true
    },
    desc: {
        type: String,
        maxLength: 300
    },
    price: {
        type: Number,
        required: true
    },
    // Category vs Type (e.g., Cat: Room, Type: Studio Flat)
    cat: {
        type: String,
        enum: [
            "Room",
            "Plot",
            "PG",
            "House"
        ],
        required: true
    },
    type: {
        type: String
    },
    // Location
    address: {
        type: String,
        maxLength: 150,
        required: true
    },
    district: {
        type: String,
        maxLength: 50,
        required: true
    },
    images: [
        String
    ],
    // Stats for popularity
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: [
            String
        ],
        default: []
    },
    // Flexible details (Sqft included)
    details: {
        beds: Number,
        baths: Number,
        area: Number,
        areaUnit: {
            type: String,
            default: "Sqft"
        },
        gender: String,
        sharing: String,
        kitchen: {
            type: String,
            enum: [
                "Available",
                "Not Available"
            ],
            default: "Not Available"
        },
        plotType: {
            type: String,
            enum: [
                "Residential",
                "Commercial"
            ],
            default: "Residential"
        } // For Plot
    },
    userEmail: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
// ✅ PERFORMANCE: Database Indexes for 100000+ posts
// These indexes will make queries super fast even with large datasets
PropertySchema.index({
    district: 1,
    cat: 1
}); // Compound index for district + category filters
PropertySchema.index({
    price: 1
}); // Index for price range queries
PropertySchema.index({
    createdAt: -1
}); // Index for sorting by date
PropertySchema.index({
    userEmail: 1
}); // Index for user profile queries
PropertySchema.index({
    title: "text",
    address: "text",
    desc: "text",
    district: "text"
}); // Text search index
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$cginfrax$2f$node_modules$2f$mongoose$29$__["default"].models.Property || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$cginfrax$2f$node_modules$2f$mongoose$29$__["default"].model("Property", PropertySchema);
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/cginfrax/src/app/api/properties/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cginfrax/src/lib/db.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$models$2f$Property$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cginfrax/src/models/Property.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cginfrax/node_modules/next/server.js [app-route] (ecmascript)");
;
;
;
async function POST(req) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectToDB"])();
        const data = await req.json();
        // ✅ VALIDATION: Required fields
        if (!data.title || !data.price || !data.address || !data.district || !data.cat || !data.userEmail) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Missing required fields"
            }, {
                status: 400
            });
        }
        // ✅ VALIDATION: Email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.userEmail)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid email format"
            }, {
                status: 400
            });
        }
        // ✅ VALIDATION: Price must be positive
        if (Number(data.price) <= 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Price must be greater than 0"
            }, {
                status: 400
            });
        }
        // ✅ VALIDATION: Title length
        if (data.title.length > 60) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Title must be 60 characters or less"
            }, {
                status: 400
            });
        }
        // ✅ VALIDATION: Images limit
        if (data.images && data.images.length > 5) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Maximum 5 images allowed"
            }, {
                status: 400
            });
        }
        // ✅ VALIDATION: Kitchen value (if provided)
        if (data.details?.kitchen && ![
            "Available",
            "Not Available"
        ].includes(data.details.kitchen)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid kitchen value"
            }, {
                status: 400
            });
        }
        // ✅ VALIDATION: Plot type (if provided)
        if (data.details?.plotType && ![
            "Residential",
            "Commercial"
        ].includes(data.details.plotType)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid plot type"
            }, {
                status: 400
            });
        }
        // ✅ SECURITY: Sanitize inputs to prevent injection
        const sanitizeString = (str)=>{
            if (typeof str !== 'string') return str;
            return str.trim().replace(/[<>]/g, ''); // Remove potential XSS characters
        };
        // Sanitize all string inputs
        if (data.title) data.title = sanitizeString(data.title);
        if (data.desc) data.desc = sanitizeString(data.desc);
        if (data.address) data.address = sanitizeString(data.address);
        if (data.district) data.district = sanitizeString(data.district);
        const newProperty = await __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$models$2f$Property$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].create({
            title: data.title,
            desc: data.desc,
            price: Number(data.price),
            address: data.address,
            district: data.district,
            cat: data.cat,
            images: data.images,
            userEmail: data.userEmail,
            details: data.details
        });
        // ✅ SEND EMAIL NOTIFICATIONS (10 per day max)
        try {
            const { notifyUsersAboutNewProperty } = await __turbopack_context__.A("[project]/cginfrax/src/lib/emailNotifications.js [app-route] (ecmascript, async loader)");
            await notifyUsersAboutNewProperty(newProperty);
        } catch (emailError) {
            console.error("Email notification error (non-blocking):", emailError);
        // Don't fail the property creation if email fails
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(newProperty, {
            status: 201
        });
    } catch (error) {
        console.error("Dhamaka Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message
        }, {
            status: 500
        });
    }
}
async function GET(req) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectToDB"])();
        const { searchParams } = new URL(req.url);
        const district = searchParams.get("district");
        const search = searchParams.get("search");
        const category = searchParams.get("category");
        const minPrice = searchParams.get("minPrice");
        const maxPrice = searchParams.get("maxPrice");
        const email = searchParams.get("email");
        const kitchen = searchParams.get("kitchen");
        const plotType = searchParams.get("plotType");
        // ✅ PAGINATION: Default 20 items per page (100000 posts handle karne ke liye)
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 20;
        const skip = (page - 1) * limit;
        let filter = {};
        // A. Profile Page Logic: Agar email aaya hai, toh sirf usi user ki property dikhao
        if (email) {
            filter.userEmail = email;
        } else {
            // District Filter
            if (district && district !== "All") {
                filter.district = district;
            }
            // Category Filter
            if (category && category !== "All") {
                filter.cat = category;
            }
            // Price Range Filter (Optimized for large datasets)
            if (minPrice || maxPrice) {
                filter.price = {};
                if (minPrice) {
                    filter.price.$gte = Number(minPrice);
                }
                if (maxPrice) {
                    filter.price.$lte = Number(maxPrice);
                }
            }
            // Kitchen Filter (for Room, PG, House)
            if (kitchen && (category === "Room" || category === "PG" || category === "House")) {
                filter["details.kitchen"] = kitchen;
            }
            // Plot Type Filter (for Plot)
            if (plotType && category === "Plot") {
                filter["details.plotType"] = plotType;
            }
            // Search Filter (Text search - Optimized with indexes)
            if (search) {
                filter.$or = [
                    {
                        title: {
                            $regex: search,
                            $options: "i"
                        }
                    },
                    {
                        address: {
                            $regex: search,
                            $options: "i"
                        }
                    },
                    {
                        desc: {
                            $regex: search,
                            $options: "i"
                        }
                    },
                    {
                        district: {
                            $regex: search,
                            $options: "i"
                        }
                    }
                ];
            }
        }
        // ✅ OPTIMIZED QUERY: Only fetch required fields + pagination
        // Using lean() for better performance with large datasets
        const [allProperties, totalCount] = await Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$models$2f$Property$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find(filter).select("title desc price cat address district images views likes userEmail details createdAt").sort({
                createdAt: -1
            }).skip(skip).limit(limit).lean(),
            __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$models$2f$Property$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].countDocuments(filter) // Total count for pagination
        ]);
        return __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            properties: allProperties,
            pagination: {
                page,
                limit,
                total: totalCount,
                totalPages: Math.ceil(totalCount / limit),
                hasNext: page * limit < totalCount,
                hasPrev: page > 1
            }
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Fetch Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Data fetch fail ho gaya bhai!"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__46528f51._.js.map