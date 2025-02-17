/* eslint-disable no-var */
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken, createToken } from "@/lib/jwt";

interface TokenPayload {
  email: string;
  role: string;
}

declare global {
  var ADMIN_PASSWORD: string | undefined;
}

if (!globalThis.ADMIN_PASSWORD) {
  globalThis.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;
}

export async function POST(request: Request) {
  const { currentPassword, newPassword } = await request.json();
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value;

  if (!authToken) {
    return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
  }

  const payload = await verifyToken(authToken) as TokenPayload;
  if (!payload || typeof payload.email !== 'string' || typeof payload.role !== 'string') {
    return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
  }

  if (currentPassword !== globalThis.ADMIN_PASSWORD) {
    return NextResponse.json({ success: false, message: "Incorrect current password" }, { status: 401 });
  }

  globalThis.ADMIN_PASSWORD = newPassword;

  const newToken = await createToken({ email: payload.email, role: payload.role });

  const response = NextResponse.json({ success: true, message: "Password changed successfully" }, { status: 200 });
  response.cookies.set("authToken", newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // 🔥 Fix for mobile login
    maxAge: 86400,
    path: "/",
  });

  return response;
}
