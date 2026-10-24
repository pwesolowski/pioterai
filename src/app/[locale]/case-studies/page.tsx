import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { isLocale, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { getCaseStudies } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"
import { CaseStudyCard } from "@/components/case-study-card"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale }
  const t = getDictionary(locale)
  return pageMetadata({
    locale,
    title: t.caseStudies.heading,
    description: t.caseStudies.metaDescription,
    path: "/case-studies",
  })
}

export default async function CaseStudiesPage({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = getDictionary(locale)
  const caseStudies = getCaseStudies(locale)

  return (
    <div className="container py-16 md:py-24">
      <header className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
        <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.03em] md:text-7xl">{t.caseStudies.heading}</h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl">{t.caseStudies.intro}</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {caseStudies.map((study, i) => (
          <CaseStudyCard key={study.slug} study={study} locale={locale} index={i} headingLevel="h2" />
        ))}
      </div>
    </div>
  )
}
