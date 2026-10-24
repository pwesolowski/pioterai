import type { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { defaultLocale, localizePath, locales, ogLocale, type Locale } from "@/i18n/config"

type PageMetadataInput = {
  locale: Locale
  /** Tytuł strony; trafia do szablonu z layoutu (chyba że absoluteTitle) */
  title?: string
  absoluteTitle?: string
  description: string
  /** Wewnętrzna ścieżka, np. "/blog/hello-world" */
  path: string
  /** Języki, w których strona naprawdę istnieje (hreflang) */
  availableLocales?: readonly Locale[]
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
  noindex?: boolean
  /** Nadpisanie adresu kanonicznego (np. wersja w innym języku) */
  canonicalLocale?: Locale
}

export function pageMetadata(input: PageMetadataInput): Metadata {
  const {
    locale,
    title,
    absoluteTitle,
    description,
    path,
    availableLocales = locales,
    type = "website",
    noindex,
    canonicalLocale = locale,
  } = input

  const languages: Record<string, string> = {}
  for (const l of availableLocales) languages[l] = localizePath(l, path)
  const xDefault = availableLocales.includes(defaultLocale) ? defaultLocale : availableLocales[0]
  if (xDefault) languages["x-default"] = localizePath(xDefault, path)

  const url = localizePath(canonicalLocale, path)
  const ogTitle = absoluteTitle ?? (title ? `${title} · ${siteConfig.author}` : siteConfig.identity.tagline[locale])

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: url, languages },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      url,
      title: ogTitle,
      description,
      siteName: siteConfig.name,
      locale: ogLocale[locale],
      alternateLocale: availableLocales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      ...(type === "article"
        ? {
            publishedTime: input.publishedTime,
            modifiedTime: input.modifiedTime,
            authors: [siteConfig.url],
            tags: input.tags,
          }
        : {}),
    },
    twitter: { card: "summary_large_image", title: ogTitle, description },
  }
}
