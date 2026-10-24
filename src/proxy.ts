import { NextResponse, type NextRequest } from "next/server"
import { defaultLocale, localizedRedirect, toInternalPath } from "@/i18n/config"

/**
 * Routing językowy:
 *   /blog/x      → (rewrite) /pl/blog/x   — polski bez prefiksu
 *   /en/blog/x   → bez zmian
 *   /pl/blog/x   → (308) /blog/x          — jeden kanoniczny adres
 *   /o-mnie      → (rewrite) /pl/about    — zlokalizowane ścieżki
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // pliki statyczne (obrazki, SKILL.md itd.) — poza feed.xml, który jest per język
  if (/\.[^/]+$/.test(pathname) && !pathname.endsWith("/feed.xml")) {
    return NextResponse.next()
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return NextResponse.next()
  }

  const prefix = `/${defaultLocale}`
  if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
    // obrazki OG generowane w app/[locale] muszą być osiągalne pod /pl/...
    if (pathname.includes("opengraph-image")) return NextResponse.next()
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(prefix.length) || "/"
    return NextResponse.redirect(url, 308)
  }

  const redirectTo = localizedRedirect(pathname)
  if (redirectTo) {
    const url = request.nextUrl.clone()
    url.pathname = redirectTo
    return NextResponse.redirect(url, 308)
  }

  const url = request.nextUrl.clone()
  const internal = toInternalPath(defaultLocale, pathname)
  url.pathname = internal === "/" ? prefix : `${prefix}${internal}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ["/((?!_next|api|icon|apple-icon|favicon.ico|sitemap.xml|robots.txt).*)"],
}
