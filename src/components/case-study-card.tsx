import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { localizePath, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import type { CaseStudy } from "@/lib/content"
import { cn } from "@/lib/utils"
import { CaseVisual } from "@/components/visuals"

/** Kafel case study: tytuł, efekt w jednym zdaniu, ilustracja */
export function CaseStudyCard({ study, locale, index = 0 }: { study: CaseStudy; locale: Locale; index?: number }) {
  const t = getDictionary(locale)
  const fm = study.frontmatter

  return (
    <article
      data-reveal
      style={{ "--reveal-delay": `${index * 120}ms` } as React.CSSProperties}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[2rem] bg-card p-8 text-center transition-transform duration-500 hover:scale-[1.015] md:p-10",
        fm.featured && "md:col-span-2"
      )}
    >
      {fm.tags?.length ? <p className="text-sm text-muted-foreground">{fm.tags.join(" · ")}</p> : null}
      <h3 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl" lang={study.locale !== locale ? study.locale : undefined}>
        <Link href={localizePath(locale, `/case-studies/${study.slug}`)} className="after:absolute after:inset-0 after:content-['']">
          {fm.title}
        </Link>
      </h3>
      <p className="mx-auto mt-3 line-clamp-2 max-w-md text-lg text-muted-foreground">{fm.result}</p>
      <span className="mt-4 inline-flex items-center justify-center gap-0.5 text-lg text-primary">
        {t.caseStudies.readMore} <ChevronRight className="size-5" aria-hidden />
      </span>
      <div className="mt-10 flex flex-1 items-end justify-center">
        <CaseVisual name={fm.visual} />
      </div>
    </article>
  )
}
