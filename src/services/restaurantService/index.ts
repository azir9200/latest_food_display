"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

//  get all posts
export const getAllRestaurant = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/restaurant/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["restaurant"],
      },
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// create post
export const createPost = async (
  postData: Record<string, any>
): Promise<any> => {
  const token = (await cookies()).get("accessToken")!.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const result = await res.json();
    revalidateTag("post");
    return result;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const createRating = async (data: Record<string, any>): Promise<any> => {
  const token = (await cookies()).get("accessToken")!.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/rating/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    revalidateTag("post");
    return res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const deletedPost = async (id: string): Promise<any> => {
  const token = (await cookies()).get("accessToken")!.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/post/deleted/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    revalidateTag("post");
    return res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const updatePost = async (id: string, payload: any): Promise<any> => {
  const token = (await cookies()).get("accessToken")!.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/post/update/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    revalidateTag("post");
    return res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong while updating");
  }
};
