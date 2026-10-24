import { siteConfig } from "@/config/site"
import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"

export function ProofBar({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  return (
    <section aria-label={t.home.proofLabel} className="container py-12 md:py-16">
      <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-base font-medium text-muted-foreground md:gap-x-16 md:text-lg">
        {siteConfig.proofBar[locale].map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}
