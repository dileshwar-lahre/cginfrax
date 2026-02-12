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
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/querystring [external] (querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

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
"[project]/cginfrax/src/lib/auth.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authOptions",
    ()=>authOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2d$auth$2f$providers$2f$google$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cginfrax/node_modules/next-auth/providers/google.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cginfrax/node_modules/next-auth/providers/credentials.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cginfrax/src/lib/db.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$models$2f$User$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cginfrax/src/models/User.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cginfrax/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
;
;
;
;
;
const authOptions = {
    trustHost: true,
    providers: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2d$auth$2f$providers$2f$google$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])({
            id: "credentials",
            name: "Credentials",
            async authorize (credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectToDB"])();
                const user = await __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$models$2f$User$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["User"].findOne({
                    email: credentials.email.toLowerCase().trim()
                });
                if (!user || !user.password) return null;
                const isPasswordCorrect = await __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compare(credentials.password, user.password);
                if (!isPasswordCorrect) return null;
                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.username
                };
            }
        })
    ],
    callbacks: {
        // ✅ REDIRECT CALLBACK: WWW aur Non-WWW ka lafada khatam
        async redirect ({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
        async signIn ({ user, account }) {
            if (account.provider === "google") {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectToDB"])();
                try {
                    const existingUser = await __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$models$2f$User$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["User"].findOne({
                        email: user.email
                    });
                    if (!existingUser) {
                        // ✅ UNIQUE MOBILE: Timestamp use kar rahe hain taaki clash na ho
                        const tempMobile = "G-" + Date.now();
                        const dummyPassword = await __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(process.env.NEXTAUTH_SECRET, 10);
                        await __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$models$2f$User$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["User"].create({
                            username: user.name || user.email.split('@')[0],
                            email: user.email,
                            mobile: tempMobile,
                            password: dummyPassword,
                            image: user.image
                        });
                    }
                    return true;
                } catch (err) {
                    console.error("SignIn Error:", err);
                    return false;
                }
            }
            return true;
        },
        async jwt ({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            // Frontend se session update karne ke liye (Mobile number update ke baad)
            if (trigger === "update" && session) {
                return {
                    ...token,
                    ...session.user
                };
            }
            return token;
        },
        async session ({ session, token }) {
            if (token?.email) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectToDB"])();
                const sessionUser = await __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$models$2f$User$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["User"].findOne({
                    email: token.email
                }).lean();
                if (sessionUser) {
                    session.user.id = sessionUser._id.toString();
                    session.user.mobile = sessionUser.mobile;
                    session.user.username = sessionUser.username;
                    session.user.email = sessionUser.email;
                    session.user.image = sessionUser.image;
                }
            }
            return session;
        }
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    secret: process.env.NEXTAUTH_SECRET,
    cookies: {
        sessionToken: {
            name: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: ("TURBOPACK compile-time value", "development") === "production"
            }
        }
    },
    pages: {
        signIn: "/login",
        error: "/login"
    }
};
}),
"[project]/cginfrax/src/app/api/properties/[id]/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cginfrax/src/lib/db.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$models$2f$Property$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cginfrax/src/models/Property.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cginfrax/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cginfrax/node_modules/next-auth/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cginfrax/src/lib/auth.js [app-route] (ecmascript)");
;
;
;
;
;
async function GET(req, { params }) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectToDB"])();
        const { id } = await params;
        const property = await __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$models$2f$Property$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findByIdAndUpdate(id, {
            $inc: {
                views: 1
            }
        }, {
            new: true
        });
        if (!property) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Property not found"
            }, {
                status: 404
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(property, {
            status: 200
        });
    } catch (error) {
        console.error("Get Property Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to fetch property"
        }, {
            status: 500
        });
    }
}
async function PUT(req, { params }) {
    try {
        const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getServerSession"])(__TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authOptions"]);
        if (!session) return __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Login karo!"
        }, {
            status: 401
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectToDB"])();
        const { id } = await params;
        const body = await req.json();
        const existingProperty = await __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$models$2f$Property$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findById(id);
        if (!existingProperty) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Property not found"
            }, {
                status: 404
            });
        }
        // 🔥 SECURITY CHECK: Kya ye usi ki property hai?
        if (existingProperty.userEmail !== session.user.email) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "You can only edit your own properties"
            }, {
                status: 403
            });
        }
        // ✅ VALIDATION: Price must be positive if provided
        if (body.price !== undefined && Number(body.price) <= 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Price must be greater than 0"
            }, {
                status: 400
            });
        }
        // ✅ VALIDATION: Title length if provided
        if (body.title && body.title.length > 60) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Title must be 60 characters or less"
            }, {
                status: 400
            });
        }
        const updatedProperty = await __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$models$2f$Property$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findByIdAndUpdate(id, {
            $set: body
        }, {
            new: true
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(updatedProperty, {
            status: 200
        });
    } catch (error) {
        console.error("Update Property Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to update property"
        }, {
            status: 500
        });
    }
}
async function DELETE(req, { params }) {
    try {
        const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getServerSession"])(__TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authOptions"]);
        if (!session) return __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Login karo!"
        }, {
            status: 401
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectToDB"])();
        const { id } = await params;
        const property = await __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$models$2f$Property$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findById(id);
        if (!property) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Property not found"
            }, {
                status: 404
            });
        }
        // 🔥 SECURITY CHECK: Sirf post karne wala hi uda sakta hai
        if (property.userEmail !== session.user.email) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "You can only delete your own properties"
            }, {
                status: 403
            });
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$src$2f$models$2f$Property$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findByIdAndDelete(id);
        return __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "Property deleted successfully"
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Delete Property Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$cginfrax$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to delete property"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7b4080d6._.js.map