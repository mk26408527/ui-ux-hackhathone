import { NextResponse } from "next/server";
import { createToken } from "@/lib/jwt";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = await createToken({ email, role: "admin" });

    const response = NextResponse.json({ success: true }, { status: 200 });

    // ✅ Fix: Ensure the cookie is properly set
    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // 🔥 Fix for mobile login
      maxAge: 86400, // 1 day
      path: "/",
    });

    return response;
  }

  return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
}
