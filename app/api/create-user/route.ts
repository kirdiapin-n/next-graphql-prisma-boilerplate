import { getManagementApiToken } from "@/lib/auth0TokenManager";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name } = body;

    const token = await getManagementApiToken();

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
      return NextResponse.json({ error: errorMsg }, { status: 500 });
    }

    return NextResponse.json({ message: "User created", data }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
