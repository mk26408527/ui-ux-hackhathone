// app/api/check-auth/route.ts
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function GET(request: Request) {
  const authToken = request.headers
    .get("Cookie")
    ?.split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];

  if (!authToken) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }

  try {
    const isValidToken = verifyToken(authToken);
    if (await isValidToken) {
      return NextResponse.json({ isAuthenticated: true }, { status: 200 });
    } else {
      throw new Error("Invalid token");
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }
}
