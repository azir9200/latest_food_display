"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";


export const getRestaurant = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/restaurant/all`,
      {
        method: "GET",
        next: {
          tags: ["restaurant"], 
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
export const getSingleRestaurant = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/restaurant/single/${id}`,
      {
        method: "GET",
        next: {
          tags: ["restaurant"],
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
export const getSingleRestaurantForAuthor = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/restaurant/single`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${
            (await cookies()).get("accessToken")!.value
          }`,
          "Content-Type": "application/json",
        },
        next: {
          tags: ["restaurant"],
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
export const updateRestaurant = async (
  id: string,
  payload: any
): Promise<any> => {
  const token = (await cookies()).get("accessToken")!.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/restaurant/update/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    revalidateTag("restaurant", "max");
    return res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong while updating");
  }
};
export const deletedRestaurant = async (id: string): Promise<any> => {
  const token = (await cookies()).get("accessToken")!.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/restaurant/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    revalidateTag("restaurant", "max");
    return res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};
// create restaurant
export const createRestaurant = async (
  restaurantData: Record<string, any>
): Promise<any> => {
  const token = (await cookies()).get("accessToken")!.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/restaurant/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restaurantData),
      }
    );
    const result = await res.json();
    revalidateTag("restaurant", "max");
    return result;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "Something went wrong");
  }
};

