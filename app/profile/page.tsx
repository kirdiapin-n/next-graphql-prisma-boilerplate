import { getUserFromServer } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Profile | MyApp",
  description: "Profile info page",
};

export default async function Profile() {
  const user = await getUserFromServer();

  if (!user) {
    return redirect("/");
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
