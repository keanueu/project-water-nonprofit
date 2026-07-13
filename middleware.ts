import { NextRequest, NextResponse } from 'next/server';
import { createMiddlewareClient } from '@/lib/supabase-server';

const adminRoutes = ['/admin'];
const adminApiRoutes = ['/api/admin'];

function isAdminRoute(pathname: string) {
  return adminRoutes.some((route) => pathname === route || pathname.startsWith(route + '/'));
}

function isAdminApiRoute(pathname: string) {
  return adminApiRoutes.some((route) => pathname === route || pathname.startsWith(route + '/'));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isAdminRoute(pathname) && !isAdminApiRoute(pathname)) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  const supabase = createMiddlewareClient(request, response);
  if (!supabase) {
    if (isAdminApiRoute(pathname)) {
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const { data } = await supabase.auth.getSession();
  const session = data?.session;
  const user = session?.user;

  if (!user) {
    if (isAdminApiRoute(pathname)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const email = user.email?.toLowerCase() || '';
  const role = user.user_metadata?.role || user.app_metadata?.role;
  const isAdmin = role === 'admin' || email.startsWith('admin');

  if (!isAdmin) {
    if (isAdminApiRoute(pathname)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    return NextResponse.redirect(new URL('/', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
