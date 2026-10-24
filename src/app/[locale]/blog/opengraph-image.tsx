import { type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const size = ogSize
export const contentType = ogContentType
export const alt = "Blog"

export default async function Image({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = getDictionary(locale)
  return renderOgImage({ title: t.blog.intro, eyebrow: t.blog.title })
}
