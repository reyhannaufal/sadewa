import { NextRequest, NextResponse } from 'next/server';

import { CookiesType, isDevelopment } from '@/utils/env';

export default function middleware(req: NextRequest, _: NextResponse) {
  const cookieName = isDevelopment()
    ? CookiesType.DEVELOPMENT
    : CookiesType.PRODUCTION;
  const authToken = req.cookies[cookieName];
  if (!authToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}
