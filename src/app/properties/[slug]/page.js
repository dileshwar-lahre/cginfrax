import { connectToDB } from "@/lib/db";
import Property from "@/models/Property";
import PropertyClient from "./PropertyClient"; // Client component load ho raha hai

export async function generateMetadata({ params }) {
  const { slug } = await params;
  await connectToDB();
  const property = await Property.findOne({ slug });
  if (!property) return { title: "Property Not Found" };

  return {
    title: `${property.title} | ₹${property.price?.toLocaleString('en-IN')}`,
    description: property.desc?.substring(0, 150),
    openGraph: {
      images: [{ url: property.images?.[0] || "" }],
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <PropertyClient slug={slug} />;
}