"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
export const openAiService = async (
  postData: Record<string, any>
): Promise<any> => {
  const token = (await cookies()).get("accessToken")!.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/post/suggestion`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    );

    const result = await res.json();
    revalidateTag("post",  "page");
    return result;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};
