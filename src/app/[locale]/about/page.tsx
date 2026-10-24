import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Calendar, ExternalLink } from "lucide-react"
import { siteConfig } from "@/config/site"
import { isLocale, localizePath, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { getPage } from "@/lib/content"
import { renderMDX } from "@/lib/mdx"
import { pageMetadata } from "@/lib/seo"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale }
  const t = getDictionary(locale)
  return pageMetadata({
    locale,
    title: t.about.metaTitle,
    description: t.about.metaDescription,
    path: "/about",
    type: "website",
  })
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = getDictionary(locale)
  const page = getPage("about", locale)
  const content = page ? await renderMDX(page.entry.content, page.entry.locale) : null

  return (
    <div className="container py-12 md:py-20">
      <header className="grid items-center gap-8 md:grid-cols-[1fr_auto] md:gap-16">
        <div className="max-w-3xl space-y-5">
          <p className="font-mono text-sm uppercase tracking-wider text-primary">{t.about.eyebrow}</p>
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-6xl">{t.about.heading}</h1>
          <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">{t.about.lead}</p>
        </div>
        <Image
          src={siteConfig.identity.photo}
          alt={siteConfig.author}
          width={200}
          height={200}
          priority
          className="size-32 rounded-full border-2 border-primary/50 object-cover md:size-48"
        />
      </header>

      <section aria-labelledby="process" className="mt-16 md:mt-24">
        <h2 id="process" className="text-3xl font-bold tracking-tight md:text-4xl">
          {t.about.processHeading}
        </h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.about.process.map((step, i) => (
            <li key={step.title} data-reveal className="relative rounded-2xl border bg-card p-6">
              <span className="font-mono text-sm text-primary">0{i + 1}</span>
              <h3 className="mt-2 text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {content && (
        <div className="prose prose-lg mt-16 max-w-3xl prose-headings:scroll-mt-24 prose-headings:tracking-tight md:mt-24">
          {content}
        </div>
      )}

      <nav aria-label={t.about.eyebrow} className="mt-12 flex max-w-3xl flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-6">
        <Link href={`${localizePath(locale, "/")}#case-studies`} className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary hover:underline">
          {t.about.seeCaseStudies} <ArrowRight className="size-4" aria-hidden />
        </Link>
        <Link href={localizePath(locale, "/blog/tags/ai-product-engineering")} className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary hover:underline">
          {t.about.seeSeries} <ArrowRight className="size-4" aria-hidden />
        </Link>
        <a href={siteConfig.links.personalSite} target="_blank" rel="noopener me" className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary hover:underline">
          {t.about.personalSite} <ExternalLink className="size-4" aria-hidden />
        </a>
      </nav>

      <section className="mt-16 flex max-w-3xl flex-col gap-4 rounded-2xl border bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <h2 className="text-xl font-bold">{t.about.ctaHeading}</h2>
          <p className="text-muted-foreground">{t.about.ctaText}</p>
        </div>
        <a
          href={siteConfig.links.calendly}
          target="_blank"
          rel="noopener"
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Calendar className="size-4" aria-hidden /> {t.about.ctaButton}
        </a>
      </section>
    </div>
  )
}
