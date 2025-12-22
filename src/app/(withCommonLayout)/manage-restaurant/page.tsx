export const dynamic = "force-dynamic";
import RestaurantManagement from "@/components/page/restaurants/RestaurantManagement";
import { getSingleRestaurantForAuthor } from "@/services/restaurantService";

const ManageRestaurant = async () => {
  const res = await getSingleRestaurantForAuthor();

  return (
    <div>
      <RestaurantManagement restaurant={res?.data?.[0]} />
    </div>
  );
};

export default ManageRestaurant;
