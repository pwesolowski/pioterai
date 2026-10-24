import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Languages } from "lucide-react"
import { siteConfig } from "@/config/site"
import { isLocale, localizePath, locales, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { getCaseStudy, getSlugs } from "@/lib/content"
import { renderMDX } from "@/lib/mdx"
import { pageMetadata } from "@/lib/seo"

type Props = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return locales.flatMap((locale) => getSlugs("case-studies").map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = (await params) as { locale: Locale; slug: string }
  const result = getCaseStudy(slug, locale)
  if (!result) return {}
  const { entry, isFallback } = result
  return pageMetadata({
    locale,
    title: entry.frontmatter.title,
    description: `${entry.frontmatter.problem} ${entry.frontmatter.solution}`.slice(0, 160),
    path: `/case-studies/${slug}`,
    availableLocales: entry.availableLocales,
    noindex: isFallback,
    canonicalLocale: entry.locale,
  })
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const result = getCaseStudy(slug, locale)
  if (!result) notFound()

  const { entry: study, isFallback } = result
  const fm = study.frontmatter
  const t = getDictionary(locale)
  const content = await renderMDX(study.content, study.locale)
  const steps = [
    { label: t.caseStudies.problem, text: fm.problem },
    { label: t.caseStudies.solution, text: fm.solution },
    { label: t.caseStudies.result, text: fm.result },
  ]

  return (
    <div className="container py-10 md:py-16">
      <Link
        href={localizePath(locale, "/case-studies")}
        className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" aria-hidden /> {t.caseStudies.back}
      </Link>

      {isFallback && (
        <div role="note" className="mt-4 flex gap-3 rounded-xl border border-primary/40 bg-primary/5 p-4">
          <Languages className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
          <p>
            <strong>{t.blog.onlyIn(t.inLanguage[study.locale])}</strong> {t.blog.fallbackHint}
          </p>
        </div>
      )}

      <article lang={study.locale} className="mt-6">
        <header className="max-w-3xl space-y-4">
          <p className="font-mono text-sm uppercase tracking-wider text-primary">{t.caseStudies.heading}</p>
          <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">{fm.title}</h1>
          <p className="text-lg text-muted-foreground md:text-xl">{fm.summary}</p>
        </header>

        <dl className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.label} className={i === 2 ? "rounded-2xl bg-primary/10 p-6" : "rounded-2xl border bg-card p-6"}>
              <dt className="font-mono text-xs uppercase tracking-wider text-primary">{step.label}</dt>
              <dd className="mt-2 leading-relaxed">{step.text}</dd>
            </div>
          ))}
        </dl>

        <div className="prose prose-lg mt-12 max-w-3xl prose-headings:scroll-mt-24 prose-headings:tracking-tight">{content}</div>
      </article>

      <div className="mt-16 flex max-w-3xl flex-col gap-4 rounded-2xl border bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <p className="text-xl font-bold">{t.about.ctaHeading}</p>
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
      </div>
    </div>
  )
}
