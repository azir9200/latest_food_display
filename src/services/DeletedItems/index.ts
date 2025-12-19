"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

//  get all posts
export const getAllDeletedUsers = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/softDelete/all-deleted-user`,

      {
        method: "GET",
        next: {
          tags: ["deleted-user"],
        },
      }
    );

    const data = await res.json();
    console.log("Soft deleted user", data.data);
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
export const getAllDeletedPost = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/softDelete/all-deleted-post`,

      {
        method: "GET",
        next: {
          tags: ["deleted-post"],
        },
      }
    );

    const data = await res.json();

    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getAllDeletedCategory = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/softDelete/all-deleted-category`,

      {
        method: "GET",
        next: {
          tags: ["deleted-category"],
        },
      }
    );

    const data = await res.json();

    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
