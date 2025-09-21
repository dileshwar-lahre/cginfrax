import { cities } from "@/data/cities";

export default function CityPage({ params }) {
  const cityData = cities.find((c) => c.slug === params.city);

  if (!cityData) {
    return <h1 className="text-center text-red-500">City not found</h1>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{cityData.name}</h1>

      <h2 className="mt-4 text-xl font-semibold">Available Services:</h2>
      <ul className="list-disc pl-6 mt-2">
        {cityData.services.map((s, i) => (
          <li key={i}>
            <strong>{s.name}</strong> – {s.desc}
          </li>
        ))}
      </ul>
    </div>
  );
}