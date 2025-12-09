"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const deletedComment = async (id: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/comment/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  revalidateTag("comments", "max");

  return data;
};

export const updateComment = async (id: string, commentText: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/comment/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ commentText }),
  });

  const data = await res.json();

  revalidateTag("comments", "max");

  return data;
};
