import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session if needed
  await supabase.auth.getSession();

  // Protect specific routes
  const pathname = request.nextUrl.pathname;

  // Routes that require authentication
  const protectedRoutes = ["/client-portal", "/dashboard"];
  
  // Check if route is protected
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  // Redirect authenticated users away from auth pages
  if (pathname === "/auth/login" || pathname === "/auth/signup") {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      return NextResponse.redirect(new URL("/client-portal", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
