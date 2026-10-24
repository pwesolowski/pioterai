export const locales = ["pl", "en"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "pl"

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export const ogLocale: Record<Locale, string> = { pl: "pl_PL", en: "en_US" }

/**
 * Ścieżki, które mają inny adres publiczny w danym języku.
 * Klucz to wewnętrzna ścieżka (folder w app/[locale]).
 */
const localizedPathnames: Record<string, Record<Locale, string>> = {
  "/about": { pl: "/o-mnie", en: "/about" },
}

/** Wewnętrzna ścieżka → publiczny URL (PL bez prefiksu, EN z /en) */
export function localizePath(locale: Locale, internalPath: string): string {
  const path = localizedPathnames[internalPath]?.[locale] ?? internalPath
  if (locale === defaultLocale) return path
  return path === "/" ? `/${locale}` : `/${locale}${path}`
}

/** Publiczna ścieżka (bez prefiksu języka) → wewnętrzna ścieżka */
export function toInternalPath(locale: Locale, publicPath: string): string {
  for (const [internal, byLocale] of Object.entries(localizedPathnames)) {
    if (byLocale[locale] === publicPath) return internal
  }
  return publicPath
}

/** Rozbija URL z przeglądarki na język i ścieżkę bez prefiksu */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  for (const locale of locales) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return { locale, path: pathname.slice(locale.length + 1) || "/" }
    }
  }
  return { locale: defaultLocale, path: pathname }
}

/** Ścieżki publiczne PL, które trzeba przekierować na zlokalizowane (np. /about → /o-mnie) */
export function localizedRedirect(publicPath: string): string | null {
  const target = localizedPathnames[publicPath]?.[defaultLocale]
  return target && target !== publicPath ? target : null
}
