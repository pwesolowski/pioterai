import type { MetadataRoute } from "next"
import { siteConfig } from "@/config/site"
import { localizePath, locales, type Locale } from "@/i18n/config"
import { tagIntros } from "@/config/tags"
import { getEntry, getSlugs, getTags } from "@/lib/content"

function entry(path: string, available: readonly Locale[], lastModified?: string): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(available.map((l) => [l, `${siteConfig.url}${localizePath(l, path)}`]))
  // jeden wpis na każdą istniejącą wersję językową, z hreflang do pozostałych
  return available.map((l) => ({
    url: `${siteConfig.url}${localizePath(l, path)}`,
    lastModified: lastModified ? new Date(lastModified) : undefined,
    alternates: { languages },
  }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/blog", "/about"].flatMap((p) => entry(p, locales))

  const posts = getSlugs("posts").flatMap((slug) => {
    const post = getEntry<{ date: string; updated?: string }>("posts", slug, "pl")!.entry
    return entry(`/blog/${slug}`, post.availableLocales, post.frontmatter.updated ?? post.frontmatter.date)
  })

  const caseStudies = getSlugs("case-studies").flatMap((slug) => {
    const study = getEntry("case-studies", slug, "pl")!.entry
    return entry(`/case-studies/${slug}`, study.availableLocales)
  })

  const tagSlugs = new Set([...locales.flatMap((l) => getTags(l).map((t) => t.slug)), ...Object.keys(tagIntros)])
  const tags = [...tagSlugs].flatMap((tag) => entry(`/blog/tags/${tag}`, locales))

  return [...pages, ...posts, ...caseStudies, ...tags]
}
