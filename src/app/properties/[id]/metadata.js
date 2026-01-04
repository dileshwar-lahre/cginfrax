// This will be used for dynamic metadata in Next.js 13+
export async function generateMetadata({ params }) {
  // In a real app, you'd fetch the property here
  // For now, return default SEO-friendly metadata
  return {
    title: "Property Details - CG INFRAX | Chhattisgarh Real Estate",
    description: "View detailed property information. Buy, rent, or sell properties in Chhattisgarh.",
    openGraph: {
      type: "website",
    },
  };
}



