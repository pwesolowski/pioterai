import { type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { getCaseStudy } from "@/lib/content"
import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const size = ogSize
export const contentType = ogContentType
export const alt = "Case study"

export default async function Image({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params
  const study = getCaseStudy(slug, locale)?.entry
  return renderOgImage({ title: study?.frontmatter.title ?? "pioter.ai", eyebrow: getDictionary(locale).caseStudies.heading })
}
