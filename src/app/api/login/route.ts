import { NextResponse } from "next/server";
import { createToken } from "@/lib/jwt";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;

declare global {
  // eslint-disable-next-line no-var
  var ADMIN_PASSWORD: string | undefined;
}

if (!globalThis.ADMIN_PASSWORD) {
  globalThis.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;
}

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (email === ADMIN_EMAIL && password === globalThis.ADMIN_PASSWORD) {
    const token = await createToken({ email, role: "admin" });

    const response = NextResponse.json({ success: true }, { status: 200 });

    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // 🔥 Fix for mobile
      maxAge: 86400, // 1 day
      path: "/",
    });

    return response;
  }

  return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
}
