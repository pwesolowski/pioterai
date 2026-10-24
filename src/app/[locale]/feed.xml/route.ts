import { siteConfig } from "@/config/site"
import { localizePath, locales, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { getPosts } from "@/lib/content"

// /feed.xml (PL) i /en/feed.xml — generowane przy buildzie
export const dynamic = "force-static"

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale
  const t = getDictionary(locale)
  const posts = getPosts(locale)
  const feedUrl = `${siteConfig.url}${localizePath(locale, "/feed.xml")}`

  const items = posts
    .map((post) => {
      const url = `${siteConfig.url}${localizePath(locale, `/blog/${post.slug}`)}`
      const categories = (post.frontmatter.tags ?? []).map((tag) => `<category>${escape(tag)}</category>`).join("")
      return `<item>
  <title>${escape(post.frontmatter.title)}</title>
  <link>${url}</link>
  <guid isPermaLink="true">${url}</guid>
  <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
  <description>${escape(post.frontmatter.excerpt)}</description>
  <dc:language>${post.locale}</dc:language>
  ${categories}
</item>`
    })
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
<channel>
  <title>${escape(`${siteConfig.name} — ${t.blog.title}`)}</title>
  <link>${siteConfig.url}${localizePath(locale, "/blog")}</link>
  <description>${escape(t.blog.description)}</description>
  <language>${locale}</language>
  <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
  ${posts[0] ? `<lastBuildDate>${new Date(posts[0].frontmatter.date).toUTCString()}</lastBuildDate>` : ""}
${items}
</channel>
</rss>`

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } })
}
