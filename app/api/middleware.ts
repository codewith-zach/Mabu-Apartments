import { NextResponse } from 'next/server'
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
})

export function middleware(request: Request) {
  const response = limiter(request, NextResponse.next(), () => {})
  return response
}

export const config = {
  matcher: '/api/:path*',
}

