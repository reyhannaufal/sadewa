import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  const authToken = req.cookies['next-auth.session-token'];
  if (!authToken) {
    return NextResponse.redirect(new URL('/', req.url));
  }
}
