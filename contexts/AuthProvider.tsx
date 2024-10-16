"use client";
import { createContext } from "react";
import { getCookie } from "@lib/cookie";
import { signinAction } from "../app/actions/auth-action";

const UserContext = createContext({ user: "", session: "" });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const session: string = getCookie("token") || "";

  const userSessionData = {
    user: "",
    session: session,
  };

  return (
    <UserContext.Provider value={userSessionData}>
      {children}
    </UserContext.Provider>
  );
};
