import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import localFont from "next/font/local"
import "../globals.css"
import { siteConfig } from "@/config/site"
import { isLocale, localizePath, locales } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ThemeProvider } from "@/components/layout/theme-provider"
import { RevealObserver } from "@/components/layout/reveal-observer"
import { JsonLd } from "@/components/json-ld"
import { personSchema, websiteSchema } from "@/lib/schema"

// Inter (osie wght 400–800 i opsz 14–32) przycięty do łaciny + polskich znaków: 1 plik ~44 KB.
// Jak odtworzyć subset: README → „Font”.
const inter = localFont({
  src: "../../assets/fonts/Inter-latin-pl.woff2",
  weight: "400 800",
  variable: "--font-inter",
  display: "swap",
})

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f1115" },
    { media: "(prefers-color-scheme: light)", color: "#fbfbfd" },
  ],
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const tagline = siteConfig.identity.tagline[locale]

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.author} · ${tagline}`,
      template: `%s · ${siteConfig.author}, ${siteConfig.identity.role}`,
    },
    description: getDictionary(locale).home.metaDescription,
    authors: [{ name: siteConfig.author, url: siteConfig.url }],
    creator: siteConfig.author,
    alternates: {
      types: { "application/rss+xml": localizePath(locale, "/feed.xml") },
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = getDictionary(locale)

  return (
    <html
      lang={locale}
      data-accent={siteConfig.accent}
      className={inter.variable}
      suppressHydrationWarning
    >
      <head>
        {/* włącza animacje [data-reveal] tylko gdy działa JS */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-dvh flex-col font-sans">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          >
            {t.skipToContent}
          </a>
          <Header
            locale={locale}
            labels={{
              blog: t.nav.blog,
              caseStudies: t.nav.caseStudies,
              about: t.nav.about,
              openMenu: t.nav.openMenu,
              closeMenu: t.nav.closeMenu,
              switchLanguage: t.nav.switchLanguage,
              toggleTheme: t.nav.toggleTheme,
            }}
          />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer locale={locale} />
          <RevealObserver />
        </ThemeProvider>
        <JsonLd data={personSchema(locale)} />
        <JsonLd data={websiteSchema(locale)} />
      </body>
    </html>
  )
}
