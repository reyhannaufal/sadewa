import { NextRequest, NextResponse } from 'next/server';

import { isDevelopment } from '@/utils/env';

export default function middleware(req: NextRequest) {
  const authToken =
    req.cookies[
      isDevelopment()
        ? 'next-auth.session-token'
        : '__Secure-next-auth.session-token'
    ];
  if (!authToken) {
    return NextResponse.redirect(new URL('/', req.url));
  }
}
