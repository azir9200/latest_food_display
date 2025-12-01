/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllusers = async () => {
  try {
    const res = await fetch(
      "http://localhost:5000/api/user/all-retreive",

      // `https://latest-food-backend.vercel.app/user/all-retreive`,

      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${
            (await cookies()).get("accessToken")!.value
          }`,
          "Content-Type": "application/json",
        },
        next: {
          tags: ["loginUser"],
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
export const deletedUser = async (id: string): Promise<any> => {
  const token = (await cookies()).get("accessToken")!.value;

  try {
    const res = await fetch(
      `https://latest-food-backend.vercel.app/api/v1/user/deleted/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const result = await res.json();
    revalidateTag("loginUser");
    return result;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};
export const roleUpate = async (id: string, role: string): Promise<any> => {
  const token = (await cookies()).get("accessToken")!.value;

  try {
    const res = await fetch(
      `https://latest-food-backend.vercel.app/api/v1/user/role/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      }
    );
    const result = await res.json();
    revalidateTag("loginUser");
    return result;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};
