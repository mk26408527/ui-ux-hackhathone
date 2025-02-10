// app/api/change-password/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken, createToken } from "@/lib/jwt";

// Use the same global variable for the admin password.
if (!globalThis.ADMIN_PASSWORD) {
  globalThis.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;
}

export async function POST(request: Request) {
  const { currentPassword, newPassword } = await request.json();
  const cookieStore = cookies();
  const authToken = (await cookieStore).get("authToken")?.value;

  if (!authToken) {
    return NextResponse.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  // Define the expected payload structure
  interface Payload {
    email: string;
    role: string;
  }

  const payload = await verifyToken(authToken) as Payload | null;
  if (!payload) {
    return NextResponse.json(
      { success: false, message: "Invalid token" },
      { status: 401 }
    );
  }

  // Check the provided current password against the stored one
  if (currentPassword !== globalThis.ADMIN_PASSWORD) {
    return NextResponse.json(
      { success: false, message: "Incorrect current password" },
      { status: 401 }
    );
  }

  // Update the password (update the global variable)
  globalThis.ADMIN_PASSWORD = newPassword;

  // Create a new JWT with the updated password info
  const newToken = await createToken({ email: payload.email, role: payload.role });

  const response = NextResponse.json(
    { success: true, message: "Password changed successfully" },
    { status: 200 }
  );
  response.cookies.set("authToken", newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 86400, // 1 day
    path: "/",
  });

  return response;
}
