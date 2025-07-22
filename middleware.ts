import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secretKey = process.env.SESSION_SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

if (!process.env.SESSION_SECRET_KEY) {
  throw new Error("JWT secret key not found.");
}

const protectedRoutes = ["/"];
const publicRoutes = ["/login"];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const token = req.cookies.get("session")?.value;
  console.log("token: ", token);

  let session: any = null;

  if (token) {

    try {
      const verified = await jwtVerify(token, encodedKey, { algorithms: ["HS256"], });
      session = verified.payload;
      console.log("✅ Decoded session:", session);

    } catch (e) {
      console.log("❌ Invalid session token: ", e);
    }

  }

  // Redirect if trying to access protected route without login
  if (isProtectedRoute && !session?.userID) {
    console.log("🔒 Redirecting to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect if trying to access login while already logged in
  if (isPublicRoute && session?.userID) {
    console.log("🔄 Redirecting to /");
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
