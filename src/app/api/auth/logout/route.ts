import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // In a real application with JWT, you would clear the token on the client side
  // For this simple implementation, we just acknowledge the logout request
  // The frontend will handle clearing sessionStorage

  return NextResponse.json({
    message: 'Logged out successfully',
    redirectTo: '/login'
  });
}
