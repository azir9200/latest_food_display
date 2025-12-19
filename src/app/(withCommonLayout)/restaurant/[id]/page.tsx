import RestaurantDetails from "@/components/page/restaurants/RestaurantDetails";
import { getSingleRestaurant } from "@/services/restaurantService";

const RestaurantSinglePage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const res = await getSingleRestaurant(id);

  return (
    <div>
      <RestaurantDetails restaurant={res.data} />
    </div>
  );
};

export default RestaurantSinglePage;
