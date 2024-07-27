import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuthToken } from "./app/services/get-token";

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  const authToken = await getAuthToken();

  if (currentPath === "/" || currentPath.startsWith("/appointments") && !authToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (currentPath === "/login" && authToken) {
    return NextResponse.redirect(new URL("/appointments", request.url));
  }

  return NextResponse.next();
}