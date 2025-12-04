import { getAllRestaurant } from "@/services/restaurantService";
import Image from "next/image";

export default async function AllRestaurantsPage() {
  const response = await getAllRestaurant();
  const restaurants = response?.data || [];

  return (
    <section className="py-10 container mx-auto">
      <h1 className="text-2xl font-semibold mb-6">All Restaurants</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {restaurants.map((item: any) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-sm border p-3 hover:shadow-md transition"
          >
            <div className="relative w-full h-36 rounded-md overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                width={500}
                height={500}
                fill
                className="object-cover"
              />
            </div>

            <h3 className="font-semibold text-sm mt-2 truncate">{item.name}</h3>

            <p className="text-xs text-gray-600 truncate">{item.address}</p>

            <p className="text-xs text-gray-500 mt-1">📍 {item.location}</p>
            <p className="text-xs text-gray-500">☎ {item.phone}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
