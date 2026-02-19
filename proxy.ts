import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function proxy(req: NextRequest) {
  const session = await auth();
  const { pathname } = req.nextUrl;

  /** 1. 로그인 안 한 상태에서 홈 접근 → /login */
  if (!session && pathname === "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  /** 2. 로그인한 상태에서 /login 접근 → / */
  if (session && pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login"],
};
