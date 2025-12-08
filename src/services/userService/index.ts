"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllusers = async () => {
  try {
    const res = await fetch(
      // "http://localhost:5000/api/v1/user/all-retreive",

      `${process.env.NEXT_PUBLIC_BASE_API}/user/all-retreive`,

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
    revalidateTag("loginUser", "max");
    return result;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};
export const roleUpdate = async (id: string, role: string): Promise<any> => {
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
    revalidateTag("loginUser", "max");
    return result;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};
