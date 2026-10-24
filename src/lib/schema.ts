import { sameAs, siteConfig } from "@/config/site"
import type { Locale } from "@/i18n/config"

export const personId = `${siteConfig.url}/#person`

export function personSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: siteConfig.author,
    jobTitle: siteConfig.identity.role,
    description: siteConfig.identity.tagline[locale],
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.identity.photo}`,
    email: `mailto:${siteConfig.links.email}`,
    knowsAbout: siteConfig.identity.knowsAbout,
    sameAs,
  }
}

export function websiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.identity.tagline[locale],
    inLanguage: ["pl-PL", "en-US"],
    author: { "@id": personId },
  }
}

type ArticleInput = {
  title: string
  description: string
  url: string
  image: string
  datePublished: string
  dateModified?: string
  locale: Locale
  tags?: string[]
}

export function articleSchema(input: ArticleInput) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    url: input.url,
    mainEntityOfPage: input.url,
    image: input.image,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    inLanguage: input.locale === "pl" ? "pl-PL" : "en-US",
    keywords: input.tags?.join(", "),
    author: { "@id": personId, "@type": "Person", name: siteConfig.author, url: siteConfig.url },
    publisher: { "@id": personId },
  }
}
