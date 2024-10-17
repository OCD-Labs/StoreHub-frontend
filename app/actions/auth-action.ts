"use server";
import { cookies } from "next/headers";

import { BASE_URL } from "@constants";

export const signinAction = async (data: IUserCredential) => {
  try {
    const user: UserResponse = await fetch(
      `${BASE_URL}/auth/login`,

      {
        method: "POST",
        body: JSON.stringify({
          email: data?.email,
          password: data?.password,
        }),
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    ).then((res) => res.json());
    console.log(user);

    if (!user?.error) {
      const token = user.data.result.access_token;
      const User = user.data.result.user;
      const oneDay = 24 * 60 * 60 * 1000;
      cookies().set("token", token, {
        expires: Date.now() + oneDay,
      });

      // Any object returned will be saved in `user` property of the JWT

      return {
        user: User,
        access_token: token,
      };
    } else {
      // If you return null then an error will be displayed advising the user to check their details.
      return null;

      // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
    }
  } catch (error) {
    error = error;
    console.log(error);
  }
};

export const signupAction = async (data: UserInfo) => {
  try {
    const body = JSON.stringify(data);
    console.log(body);

    const user = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      body: body,
    }).then((res) => res.json());
    console.log(user);
    return user;
  } catch (error) {
    console.log(error);

    return null;
  }
};
export const getSession = async () => {
  const token = cookies().get("token")?.value;
  if (!token) return null;
  return token;
};

/**
 * improvements could be made by using this https://github.com/IdoPesok/zsa package to improvevalidation of input and output from data to client and vice versa
 * https://github.com/IdoPesok/zsa
 */
