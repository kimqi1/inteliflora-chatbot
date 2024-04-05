import { NextResponse } from 'next/server';

export function middleware(req) {
  const response = NextResponse.next();
  // Set custom headers or perform other middleware logic here
  response.headers.set('Content-Security-Policy', "frame-ancestors 'self' https://inteliflora.com/");
  return response;
}