import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/login/session_manager";

const protectedRoutes = ["/"];
const publicRoutes = ["/login"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = cookies();
  const cookie_value = cookie.get("session")?.value;
  const session = await decrypt(cookie_value);

  console.log("decrypted sesison : ", session);

  if (isProtectedRoute && !session?.userID) {
    console.log("session not found redirecting user");
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && session?.userID) {
    console.log("session not found redirecting user");
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}