import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/jwt"


// Define the routes that require authentication
const isProtectedRoute = createRouteMatcher(['/shop(.*)', '/cart(.*)', '/checkout(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  // If the user is not authenticated and tries to access a protected route, redirect to sign-in
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }
});

export const config = {
  matcher: [
    // Apply middleware to all routes
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};









// Define the routes that require JWT authentication
const jwtProtectedRoutes = ["/dashboard", "/settings", "/analytics", "/customers", "/products", "/orders" , "/profile"]

export async function middleware(request: Request) {
  const pathname = new URL(request.url).pathname

  if (jwtProtectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = request.headers
      .get("Cookie")
      ?.split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1]

    if (!token) {
      return NextResponse.redirect(new URL("/admin", request.url))
    }

    const payload = await verifyToken(token)
    if (!payload) {
      const response = NextResponse.redirect(new URL("/admin", request.url))
      response.cookies.delete("authToken")
      return response
    }
  }

  // If trying to access login page with a valid token, redirect to dashboard
  if (pathname === "/admin") {
    const token = request.headers
      .get("Cookie")
      ?.split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1]

    if (token) {
      const payload = await verifyToken(token)
      if (payload) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    }
  }

  return NextResponse.next()
}

export const configuration = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}

