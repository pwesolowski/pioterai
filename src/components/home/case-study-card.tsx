import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { localizePath, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import type { CaseStudy } from "@/lib/content"
import { cn } from "@/lib/utils"

/** Karta bento: problem → rozwiązanie → efekt */
export function CaseStudyCard({ study, locale }: { study: CaseStudy; locale: Locale }) {
  const t = getDictionary(locale)
  const fm = study.frontmatter
  const steps = [
    { label: t.caseStudies.problem, text: fm.problem },
    { label: t.caseStudies.solution, text: fm.solution },
    { label: t.caseStudies.result, text: fm.result, highlight: true },
  ]

  return (
    <article
      data-reveal
      className={cn(
        "group relative flex flex-col gap-6 rounded-2xl border bg-card p-6 transition-colors hover:border-primary/60 sm:p-8",
        fm.featured && "md:col-span-2"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-2xl font-bold tracking-tight" lang={study.locale !== locale ? study.locale : undefined}>
          <Link href={localizePath(locale, `/case-studies/${study.slug}`)} className="after:absolute after:inset-0 after:content-['']">
            {fm.title}
          </Link>
        </h3>
        <ArrowUpRight className="size-6 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden />
      </div>

      <dl className={cn("grid gap-5", fm.featured && "md:grid-cols-3")}>
        {steps.map((step) => (
          <div key={step.label} className={cn("space-y-1.5", step.highlight && "rounded-xl bg-primary/10 p-4 -m-1 md:m-0")}>
            <dt className={cn("font-mono text-xs uppercase tracking-wider", step.highlight ? "text-primary" : "text-muted-foreground")}>
              {step.label}
            </dt>
            <dd className="leading-relaxed">{step.text}</dd>
          </div>
        ))}
      </dl>

      {fm.tags?.length ? (
        <ul className="mt-auto flex flex-wrap gap-2">
          {fm.tags.map((tag) => (
            <li key={tag} className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  )
}
