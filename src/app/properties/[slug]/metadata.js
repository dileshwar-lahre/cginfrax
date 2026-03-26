import { connectToDB } from "@/lib/db";
import Property from "@/models/Property";

// ✅ Dynamic metadata for property pages
export async function generateMetadata({ params }) {
  try {
    await connectToDB();
    const property = await Property.findById(params.id).lean();
    
    if (!property) {
      return {
        title: "Property Not Found - CG INFRAX",
        description: "The property you are looking for does not exist.",
      };
    }

    const title = `${property.title} - ₹${property.price?.toLocaleString('en-IN')} | CG INFRAX`;
    const description = `${property.title} in ${property.district}, Chhattisgarh. ${property.desc || 'View details and contact owner directly.'}`;

    return {
      title,
      description,
      keywords: [
        property.cat,
        property.district,
        "Chhattisgarh real estate",
        "property for sale",
        "property for rent",
        property.address,
      ],
      openGraph: {
        title,
        description,
        type: "website",
        url: `https://cginfrax.com/properties/${params.id}`,
        images: property.images && property.images.length > 0 ? [
          {
            url: property.images[0],
            width: 1200,
            height: 630,
            alt: property.title,
          },
        ] : [],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: property.images && property.images.length > 0 ? [property.images[0]] : [],
      },
      alternates: {
        canonical: `https://cginfrax.com/properties/${params.id}`,
      },
    };
  } catch (error) {
    console.error("Metadata generation error:", error);
    return {
      title: "Property Details - CG INFRAX",
      description: "View detailed property information. Buy, rent, or sell properties in Chhattisgarh.",
    };
  }
}



