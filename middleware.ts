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
          // Write refreshed session cookies back to the response
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const pathname = request.nextUrl.pathname;

  // getUser() validates the JWT with the Supabase server on every call —
  // unlike getSession() which only reads the local cookie and can be spoofed.
  // One call covers both the refresh and the auth check.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ── Protected routes: redirect unauthenticated users to login ─────────────
  const protectedRoutes = ["/client-portal", "/dashboard"];
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!user) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("next", pathname); // preserve intended destination
      return NextResponse.redirect(loginUrl);
    }
  }

  // ── Auth pages: redirect already-authenticated users to portal ────────────
  if (pathname === "/auth/login" || pathname === "/auth/signup") {
    if (user) {
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
