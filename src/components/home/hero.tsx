import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { siteConfig } from "@/config/site"
import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { AgentDemo } from "./agent-demo"
import { DemoReplay } from "./demo-replay"

export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  const lead = t.home.headline.replace(t.home.headlineEnd, "").trim()

  return (
    <section className="relative overflow-hidden">
      <div className="container pb-12 pt-14 text-center md:pb-16 md:pt-24">
        <h1 className="inline-flex items-center gap-2.5 rounded-full border border-border/60 bg-card/60 py-1 pl-1 pr-4 text-sm font-medium">
          <Image
            src={siteConfig.identity.photo}
            alt={siteConfig.author}
            width={200}
            height={200}
            priority
            className="size-8 rounded-full object-cover"
          />
          {siteConfig.author} · {siteConfig.identity.role}
        </h1>

        <p className="mx-auto mt-8 max-w-5xl text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-7xl lg:text-[5.5rem]">
          {lead} <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-foreground via-primary to-primary bg-clip-text text-transparent">
            {t.home.headlineEnd}
          </span>
        </p>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">{t.home.subtitle}</p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
          <a
            href="#case-studies"
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-7 font-medium text-primary-foreground transition-transform hover:scale-[1.03] sm:w-auto"
          >
            {t.home.ctaCaseStudies}
          </a>
          <a href="#newsletter" className="inline-flex min-h-11 items-center gap-0.5 text-lg text-primary hover:underline">
            {t.home.ctaNewsletter} <ChevronRight className="size-5" aria-hidden />
          </a>
        </div>
      </div>

      <div className="container pb-8">
        <DemoReplay>
          <AgentDemo locale={locale} />
        </DemoReplay>
      </div>
    </section>
  )
}
