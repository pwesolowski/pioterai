import { siteConfig } from "@/config/site"
import { type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const size = ogSize
export const contentType = ogContentType
export const alt = siteConfig.identity.tagline.pl

export default async function Image({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  return renderOgImage({ title: getDictionary(locale).home.headline, eyebrow: siteConfig.identity.role })
}
