/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/login/route.ts
import { NextResponse } from "next/server";
import { createToken } from "@/lib/jwt";

// Set admin email from env variable
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;

// Declare ADMIN_PASSWORD on globalThis
declare global {
  // eslint-disable-next-line no-var
  var ADMIN_PASSWORD: string | undefined;
}

// Use globalThis to store the current admin password.
// (This is for demonstration only. In production, persist the value in a database.)
if (!globalThis.ADMIN_PASSWORD) {
  (globalThis as any).ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;
}

export async function POST(request: Request) {
  const { email, password } = await request.json();
  console.log("Login attempt:", { email, password: "********" });

  // Compare with the current password stored in globalThis
  if (email === ADMIN_EMAIL && password === (globalThis as any).ADMIN_PASSWORD) {
    console.log("Login successful");
    const token = await createToken({ email, role: "admin" });

    const response = NextResponse.json({ success: true }, { status: 200 });
    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400, // 1 day
      path: "/",
    });
    return response;
  }

  console.log("Login failed");
  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  );
}
