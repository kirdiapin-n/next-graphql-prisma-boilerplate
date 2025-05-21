import { NextApiRequest, NextApiResponse } from "next";
import { getManagementApiToken } from "@/lib/auth0TokenManager";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const token = await getManagementApiToken();

    const { email, password, name } = req.body;

    const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email,
        password,
        name,
        connection: "Username-Password-Authentication",
        email_verified: false,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data.message || "Failed to create user";
      console.error("Auth0 error:", errorMsg);
      return res.status(500).json({ error: errorMsg });
    }

    return res.status(201).json({ message: "User created", data });
  } catch (error) {
    console.error("Error creating user:", error);
    if (error instanceof Error) return res.status(500).json({ error: error.message });
  }
}
