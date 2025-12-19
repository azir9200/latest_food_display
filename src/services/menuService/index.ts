"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createMenu = async (
  id: string,
  data: Record<string, any>
): Promise<any> => {
  const token = (await cookies()).get("accessToken")!.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/restaurant/menu/${id}/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    revalidateTag("restaurant", "max");
    return res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const deletedMenu = async (id: string): Promise<any> => {
  const token = (await cookies()).get("accessToken")!.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/restaurant/menu/${id}/delete`,
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

export const updateMenu = async (id: string, payload: any): Promise<any> => {
  const token = (await cookies()).get("accessToken")!.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/restaurant/menu/${id}/update`,
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
