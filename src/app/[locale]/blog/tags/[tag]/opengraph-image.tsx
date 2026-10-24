import { type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { getTags } from "@/lib/content"
import { tagIntros } from "@/config/tags"
import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const size = ogSize
export const contentType = ogContentType
export const alt = "Tag"

export default async function Image({ params }: { params: Promise<{ locale: Locale; tag: string }> }) {
  const { locale, tag } = await params
  const name = tagIntros[tag]?.[locale].title ?? getTags(locale).find((t) => t.slug === tag)?.tag ?? tag
  return renderOgImage({ title: name, eyebrow: `${getDictionary(locale).blog.title} · #${tag}` })
}
