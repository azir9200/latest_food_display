/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

//  get all posts
export const getAllCategory = async () => {
  try {
    const res = await fetch(
      // `https://latest-food-backend.vercel.app/category/all-retrieve`,
      `${process.env.NEXT_PUBLIC_BASE_API}/category/all-retrieve`,
      {
        method: "GET",
        next: {
          tags: ["category"],
        },
      }
    );

    const data = await res.json();
  
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// create post
export const createCategory = async (name: string): Promise<any> => {
  const token = (await cookies()).get("accessToken")!.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/category/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    );
    const result = await res.json();
    revalidateTag("category");
    return result;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};
export const updateCategory = async (
  id: string,
  data: string
): Promise<any> => {
  
  const token = (await cookies()).get("accessToken")!.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/category/update/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      }
    );
    const result = await res.json();
    revalidateTag("category");
    return result;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const deletedCategory = async (id: string): Promise<any> => {
  const token = (await cookies()).get("accessToken")!.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/category/deleted/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const result = await res.json();
    revalidateTag("category");
    return result;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};
