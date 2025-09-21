// app/page.tsx  (Next.js 13+ with App Router)
import Image from "next/image";

export default function Home() {
  const cities = [
    "Raipur",
    "Bhilai",
    "Bilaspur",
    "Durg",
    "Korba",
    "Raigarh",
    "Jagdalpur",
    "Ambikapur",
    "Kawardha",
    "Chirmiri"
  ];

  const homeTypes = ["Apartment", "Villa", "Independent House", "Studio", "Penthouse"];
  const priceRanges = ["₹5L - ₹20L", "₹20L - ₹50L", "₹50L - ₹1Cr", "₹1Cr - ₹2Cr", "₹2Cr+"];
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center px-6 md:px-16 py-10 md:py-16">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left space-y-6 mt-8 md:mt-0">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 leading-tight">
            Find Your <br /> Perfect Home
          </h1>
          <p className="text-blue-500 font-medium">
            YOUR PROPERTY, OUR PRIORITY
          </p>

          {/* Search Bar */}
          <div className="bg-blue-600 text-white rounded-xl flex flex-col md:flex-row items-center p-4 space-y-4 md:space-y-0 md:space-x-4 shadow-lg">
            <select className="bg-blue-600 border border-white/30 px-4 py-2 rounded-md focus:outline-none">
              <option>Location</option>
              {cities.map((city) => (
                <option key={city}>{city}</option>
              ))}
            </select>
            <select className="bg-blue-600 border border-white/30 px-4 py-2 rounded-md focus:outline-none">
              <option>Home Type</option>
              {homeTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
            <select className="bg-blue-600 border border-white/30 px-4 py-2 rounded-md focus:outline-none">
              <option>Price Range</option>
              {priceRanges.map((range) => (
                <option key={range}>{range}</option>
              ))}
            </select>
            <button className="bg-white text-blue-600 font-bold px-6 py-2 rounded-md hover:bg-gray-100 transition">
              Search
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1 flex justify-center md:justify-end">
          <Image
            src="/images/helo.png" // apni image "public/hero.jpg" me daal dena
            alt="Property"
            width={900}
            height={600}
            className="rounded-lg shadow-xl object-cover w-full max-w-md md:max-w-lg"
          />
        </div>
      </section>
    </div>
  );
}
