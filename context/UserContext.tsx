"use client";

import { IUser } from "@/graphql/types";
import { createContext, useContext, useState, ReactNode } from "react";

const UserContext = createContext<{ user: IUser | null | undefined }>({ user: null });

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ user, children }: { user: IUser | null | undefined; children: ReactNode }) => {
  const [currentUser] = useState(user);
  return <UserContext.Provider value={{ user: currentUser }}>{children}</UserContext.Provider>;
};
