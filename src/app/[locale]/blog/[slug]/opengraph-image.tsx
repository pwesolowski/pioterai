import { type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { getPost } from "@/lib/content"
import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const size = ogSize
export const contentType = ogContentType
export const alt = "Blog post"

export default async function Image({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params
  const post = getPost(slug, locale)?.entry
  return renderOgImage({ title: post?.frontmatter.title ?? "pioter.ai", eyebrow: getDictionary(locale).blog.title })
}
