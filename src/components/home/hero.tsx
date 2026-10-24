import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { siteConfig } from "@/config/site"
import { localizePath, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { OrbitPortrait } from "./orbit-portrait"

export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  const lead = t.home.headline.replace(t.home.headlineEnd, "").trim()

  return (
    <section className="relative overflow-hidden">
      <div className="container grid items-center gap-12 pb-16 pt-12 md:grid-cols-[1.15fr_1fr] md:gap-8 md:pb-24 md:pt-20">
        <div className="text-center md:text-left">
          <h1 className="text-sm font-medium text-muted-foreground sm:text-base">
            {siteConfig.author} · <span className="text-foreground">{siteConfig.identity.role}</span>
          </h1>

          <p className="mt-5 text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-7xl lg:text-[5.25rem]">
            {lead} <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-foreground via-primary to-primary bg-clip-text text-transparent">
              {t.home.headlineEnd}
            </span>
          </p>

          <p className="mx-auto mt-6 max-w-xl text-balance text-lg text-muted-foreground sm:text-xl md:mx-0">{t.home.subtitle}</p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6 md:justify-start">
            <Link
              href={localizePath(locale, "/case-studies")}
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-7 font-medium text-primary-foreground transition-transform hover:scale-[1.03] sm:w-auto"
            >
              {t.home.ctaCaseStudies}
            </Link>
            <a href="#newsletter" className="inline-flex min-h-11 items-center gap-0.5 text-lg text-primary hover:underline">
              {t.home.ctaNewsletter} <ChevronRight className="size-5" aria-hidden />
            </a>
          </div>
        </div>

        <OrbitPortrait inner={t.home.orbit.inner} outer={t.home.orbit.outer} />
      </div>
    </section>
  )
}
