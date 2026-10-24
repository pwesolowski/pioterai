import { siteConfig } from "@/config/site"
import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"

export function ProofBar({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  return (
    <section aria-label={t.home.proofLabel} className="border-y bg-card/50">
      <div className="container flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-6">
        <p className="shrink-0 font-mono text-xs uppercase tracking-wider text-muted-foreground">{t.home.proofLabel}</p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-base font-semibold sm:text-lg">
          {siteConfig.proofBar[locale].map((item) => (
            <li key={item} className="flex items-center gap-2.5">
              <span aria-hidden className="size-1.5 rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
