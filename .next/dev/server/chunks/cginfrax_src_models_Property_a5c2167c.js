module.exports = [
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
];

//# sourceMappingURL=cginfrax_src_models_Property_a5c2167c.js.map