import { siteConfig } from "@/config/site"
import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

export const size = ogSize
export const contentType = ogContentType
export const alt = siteConfig.identity.tagline.pl

export default async function Image() {
  return renderOgImage({ title: siteConfig.author, eyebrow: siteConfig.identity.role })
}
