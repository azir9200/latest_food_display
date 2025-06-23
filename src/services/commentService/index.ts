/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getComments = async () => {
  try {
    const res = await fetch(
      `https://latest-food-backend.vercel.app/api/v1/comment/getall`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${
            (await cookies()).get("accessToken")!.value
          }`,
          "Content-Type": "application/json",
        },
        next: {
          tags: ["post"], // Optional Next.js cache control
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
export const deletedComment = async (id: string): Promise<any> => {
  const token = (await cookies()).get("accessToken")!.value;

  try {
    const res = await fetch(
      `https://latest-food-backend.vercel.app/api/v1/comment/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const result = await res.json();
    revalidateTag("post");
    return result;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};
export const updateComment = async (
  id: string,
  commentText: string
): Promise<any> => {
  const token = (await cookies()).get("accessToken")!.value;

  try {
    const res = await fetch(
      `https://latest-food-backend.vercel.app/api/v1/comment/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentText }),
      }
    );
    const result = await res.json();
    revalidateTag("post");
    return result;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};
