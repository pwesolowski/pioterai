import { Youtube } from "lucide-react"
import { siteConfig } from "@/config/site"
import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { SectionHeading } from "@/components/section-heading"
import { YouTubeEmbed } from "@/components/youtube-embed"

export function LatestVideo({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  const { latestVideoId, latestVideoTitle } = siteConfig.youtube

  return (
    <section aria-labelledby="video" className="container py-20 md:py-32" data-reveal>
      <SectionHeading id="video" title={t.video.heading} link={{ href: siteConfig.links.youtube, label: t.video.channel }} />
      <div className="mx-auto max-w-5xl">
        {latestVideoId ? (
          <YouTubeEmbed id={latestVideoId} title={latestVideoTitle[locale]} playLabel={t.video.play} />
        ) : (
          <a
            href={siteConfig.links.youtube}
            target="_blank"
            rel="noopener"
            className="group flex aspect-video flex-col md:aspect-[21/9] items-center justify-center gap-4 rounded-[2rem] bg-card text-center"
          >
            <span className="flex size-20 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-500 group-hover:scale-110">
              <Youtube className="size-9" aria-hidden />
            </span>
            <span className="text-lg text-muted-foreground">{t.video.noVideo}</span>
          </a>
        )}
      </div>
    </section>
  )
}
