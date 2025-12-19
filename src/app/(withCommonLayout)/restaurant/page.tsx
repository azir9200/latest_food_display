// import RestaurantPage from "@/components/page/restaurant/RestaurantPage";
import Restaurants from "@/components/page/restaurants/Restaurants";
import { getRestaurant } from "@/services/restaurantService";

const RestaurantPage = async () => {
  const res = await getRestaurant();
  return (
    <div>
      <Restaurants  restaurants={res?.data} />
    </div>
  );
};

export default RestaurantPage;
