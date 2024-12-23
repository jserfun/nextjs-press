import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const signInPage = '/login';

const handlers = [validateCookieMiddleware];

export async function middleware(req: NextRequest) {
  for (const handler of handlers) {
    try {
      const result = await handler(req);

      if (result) {
        return result;
      }
    } catch (err) {
      console.error('[middleware] [error]: %o', err);
    }
  }

  return NextResponse.next();
}

async function validateCookieMiddleware(req: NextRequest) {
  const { pathname, search, origin, basePath } = req.nextUrl;
  console.log(
    'req.nextUrl - pathname: %s, search: %s',
    req.nextUrl.pathname,
    req.nextUrl.search
  );

  return;

  const cookieKey: any = 'accessToken';

  if (req.cookies.has(cookieKey)) {
    return NextResponse.next();
  }

  const signInUrl = new URL(
    `${basePath}${signInPage}?redirect=${pathname}`,
    origin
  );

  const redirectResponse = NextResponse.redirect(signInUrl);
  redirectResponse.headers.set('x-middleware-cache', 'no-cache'); // ! FIX: Disable caching
  return redirectResponse;
}

export const config = {
  matcher: ['/dashboard/:path*', '/user/:path*'],
};
