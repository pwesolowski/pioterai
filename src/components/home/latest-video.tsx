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
    <section aria-labelledby="video" className="container py-14 md:py-20" data-reveal>
      <SectionHeading
        id="video"
        title={t.video.heading}
        intro={t.video.intro}
        link={{ href: siteConfig.links.youtube, label: t.video.channel }}
      />
      {latestVideoId ? (
        <div className="mx-auto max-w-4xl">
          <YouTubeEmbed id={latestVideoId} title={latestVideoTitle[locale]} playLabel={t.video.play} />
        </div>
      ) : (
        <a
          href={siteConfig.links.youtube}
          target="_blank"
          rel="noopener"
          className="flex aspect-video max-w-4xl md:aspect-[21/9] flex-col items-center justify-center gap-4 rounded-2xl border bg-card text-center transition-colors hover:border-primary md:mx-auto"
        >
          <Youtube className="size-14 text-primary" aria-hidden />
          <span className="text-lg font-semibold">{t.video.noVideo}</span>
        </a>
      )}
    </section>
  )
}
