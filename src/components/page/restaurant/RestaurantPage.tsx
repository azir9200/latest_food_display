
import Image from "next/image";
import { getAllRestaurant } from "@/services/restaurantService";

export default async function RestaurantPage() {
  const response = await getAllRestaurant();
  const restaurants = response?.data?.slice(0, 6) || [];


  return (
    <section className="py-10">
      {/* <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Popular Restaurants</h2>
        <Link
          href="/restaurants"
          className="text-blue-600 hover:underline font-medium"
        >
          Show All →
        </Link>
      </div> */}

      {/* Grid — 2 per row (mobile), 3 per row on medium screens */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {restaurants.map((item: any) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-sm border p-3 hover:shadow-md transition"
          >
            <div className="relative w-full h-32 rounded-md overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
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
