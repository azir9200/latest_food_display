import RestaurantManagement from "@/components/page/restaurants/RestaurantManagement";
import {
  getSingleRestaurant,
  getSingleRestaurantForAuthor,
} from "@/services/restaurantService";

const ManageRestaurant = async () => {
  const res = await getSingleRestaurantForAuthor();
  // const res = await getSingleRestaurant();
  console.log("manage res", res);
  return (
    <div>
      <RestaurantManagement restaurant={res?.data[0]} />
      <p>
        {" "}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
        veritatis libero in nihil porro delectus dignissimos labore placeat
        architecto vitae. Libero dolorem, exercitationem similique sequi
        repellendus earum nemo voluptates autem.
      </p>
    </div>
  );
};

export default ManageRestaurant;
