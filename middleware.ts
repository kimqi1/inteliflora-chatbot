import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const response = NextResponse.next();
  // Set custom headers or perform other middleware logic here
  response.headers.set(
    "Content-Security-Policy",
    "frame-ancestors 'self' https://myherbaladvisor.com/"
  );
  return response;
}
