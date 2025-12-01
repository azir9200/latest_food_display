"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { getNewToken } from "../AuthService";

// Function to check if the token is expired
export const isTokenExpired = async (token: string): Promise<boolean> => {
  if (!token) return true;

  try {
    const decoded: { exp: number } = jwtDecode(token);

  
    return decoded.exp * 1000 < Date.now();
  } catch (err: any) {
    console.error(err);
    return true;
  }
};


export const getValidToken = async (): Promise<string> => {
  const cookieStore = await cookies(); 

  let token = cookieStore.get("accessToken")?.value; 
  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken(); 
    token = data?.accessToken; 
    if (token) {
      await cookieStore.set("accessToken", token, {
        httpOnly: true, 
        path: "/", 
      });
    } else {
      throw new Error("Failed to obtain a valid token from the auth service.");
    }
  }

  return token; 
};
