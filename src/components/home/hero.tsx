import Image from "next/image"
import { ArrowRight, Mail } from "lucide-react"
import { siteConfig } from "@/config/site"
import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"

export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  // „AI Product Engineer — inżynier AI, który rozumie biznes” → „Inżynier AI, który rozumie biznes.”
  const descriptor = siteConfig.identity.tagline[locale].split(" — ")[1] ?? ""
  const lead = descriptor ? `${descriptor.charAt(0).toUpperCase()}${descriptor.slice(1)}.` : ""

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[32rem] w-[48rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="container grid items-center gap-8 pb-14 pt-10 md:grid-cols-[1fr_auto] md:gap-16 md:pb-24 md:pt-20">
        <div className="space-y-6 md:space-y-8">
          <div className="flex items-center gap-4">
            <Image
              src={siteConfig.identity.photo}
              alt={siteConfig.author}
              width={200}
              height={200}
              priority
              className="size-16 rounded-full border-2 border-primary/40 object-cover md:hidden"
            />
            <h1 className="text-base font-semibold leading-snug text-primary sm:text-lg">
              {siteConfig.author} — {siteConfig.identity.role}
            </h1>
          </div>
          <p className="text-balance text-[2.75rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            {t.home.headline}
          </p>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            <strong className="font-semibold text-foreground">{lead}</strong> {t.home.subtitle}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#case-studies"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {t.home.ctaCaseStudies} <ArrowRight className="size-4" aria-hidden />
            </a>
            <a
              href="#newsletter"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border px-6 text-base font-semibold transition-colors hover:border-primary hover:bg-muted"
            >
              <Mail className="size-4" aria-hidden /> {t.home.ctaNewsletter}
            </a>
          </div>
        </div>

        <div className="relative hidden md:block">
          <div aria-hidden className="absolute inset-0 rounded-full bg-primary/30 blur-2xl" />
          <Image
            src={siteConfig.identity.photo}
            alt={siteConfig.author}
            width={200}
            height={200}
            priority
            className="relative size-52 rounded-full border-2 border-primary/50 object-cover lg:size-56"
          />
        </div>
      </div>
    </section>
  )
}
