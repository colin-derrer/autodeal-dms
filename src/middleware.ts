import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

//reference: https://www.youtube.com/watch?v=pmAnWOofqJE
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = cookies().get("token")?.value;
  const verifiedToken = token ? await verifyToken(token) : null;
  console.log(verifiedToken);
  if (!verifiedToken && !authRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  return NextResponse.next();
}

const authRoutes = ["/login", "/signup", "/auth"];

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
