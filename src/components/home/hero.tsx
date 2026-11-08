import { Mail } from "lucide-react"
import { siteConfig } from "@/config/site"
import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { OrbitPortrait } from "./orbit-portrait"

/** Wizytówka: imię, rola, jedno zdanie, zdjęcie z orbitami */
export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)

  return (
    <section className="relative overflow-hidden">
      <div className="container grid items-center gap-12 pb-16 pt-12 md:grid-cols-[1.15fr_1fr] md:gap-8 md:pb-24 md:pt-20">
        <div className="text-center md:text-left">
          <h1 className="text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-7xl lg:text-[5.25rem]">
            {siteConfig.author}
          </h1>
          <p className="mt-4 bg-gradient-to-r from-foreground via-primary to-primary bg-clip-text text-2xl font-semibold text-transparent sm:text-3xl">
            {siteConfig.identity.role}
          </p>
          <p className="mx-auto mt-5 max-w-md text-balance text-lg text-muted-foreground sm:text-xl md:mx-0">{t.home.subtitle}</p>

          <div className="mt-9 flex justify-center md:justify-start">
            <a
              href={`mailto:${siteConfig.links.email}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              <Mail className="size-5" aria-hidden />
              {siteConfig.links.email}
            </a>
          </div>
        </div>

        <OrbitPortrait inner={t.home.orbit.inner} outer={t.home.orbit.outer} />
      </div>
    </section>
  )
}
