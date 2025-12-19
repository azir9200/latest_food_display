"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
export const updateProfile = async (id: string, payload: any): Promise<any> => {
  const token = (await cookies()).get("accessToken")!.value;
  console.log("auth service", token);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/user/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    console.log("update aservice", res);
    revalidateTag("loginUser", "max");
    return res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong while updating");
  }
};
