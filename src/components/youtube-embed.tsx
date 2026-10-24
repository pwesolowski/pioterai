"use client"

import { useState } from "react"
import { Play } from "lucide-react"

/**
 * Lekki embed YouTube: na starcie tylko miniatura (~30 KB),
 * iframe youtube-nocookie ładuje się dopiero po kliknięciu.
 */
export function YouTubeEmbed({ id, title, playLabel }: { id: string; title: string; playLabel: string }) {
  const [active, setActive] = useState(false)

  return (
    <div className="relative aspect-video overflow-hidden rounded-[2rem] bg-card">
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="group absolute inset-0 size-full"
          aria-label={`${playLabel}: ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            width={480}
            height={360}
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/10">
            <span className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110 sm:size-20">
              <Play className="ml-1 size-7 fill-current sm:size-8" aria-hidden />
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
