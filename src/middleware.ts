import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin/* (except /admin/login itself).
  // Lightweight cookie check — the real auth verification happens inside
  // server actions via getAdminUser(), which calls supabase.auth.getUser().
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const hasSession = request.cookies
      .getAll()
      .some((c) => c.name.startsWith("sb-") && c.name.endsWith("-auth-token"));
    if (!hasSession) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.png|manifest.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|mp4|webm|glb)$).*)",
  ],
};
