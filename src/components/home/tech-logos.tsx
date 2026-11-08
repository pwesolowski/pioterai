import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { techLogos, type TechLogo } from "./tech-logos-data"

const AI = new Set(["Claude", "OpenAI", "Gemini", "MCP", "Hugging Face", "Ollama", "LangChain"])

/** Dwa przesuwające się paski z logotypami technologii (AI i kod) */
export function TechLogos({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  const ai = techLogos.filter((l) => AI.has(l.name))
  const dev = techLogos.filter((l) => !AI.has(l.name))

  return (
    <section aria-labelledby="stack" className="py-16 md:py-24" data-reveal>
      <h2 id="stack" className="container mb-8 text-center text-sm font-medium text-muted-foreground">
        {t.home.stackLabel}
      </h2>
      <ul className="sr-only">
        {techLogos.map((l) => (
          <li key={l.name}>{l.name}</li>
        ))}
      </ul>
      <div aria-hidden className="marquee space-y-3">
        <Row logos={ai} repeat={2} />
        <Row logos={dev} reverse />
      </div>
    </section>
  )
}

/** repeat > 1 wydłuża krótki pasek, żeby na szerokim ekranie nie było przerwy */
function Row({ logos, reverse, repeat = 1 }: { logos: TechLogo[]; reverse?: boolean; repeat?: number }) {
  const items = Array.from({ length: repeat }, () => logos).flat()
  return (
    <div className="marquee-row">
      <div className="marquee-track" data-reverse={reverse || undefined}>
        {[0, 1].map((copy) => (
          <div key={copy} className="marquee-group" data-copy={copy || undefined}>
            {items.map((l, i) => (
              <span
                key={`${l.name}-${i}`}
                data-extra={i >= logos.length || undefined}
                className="tech-chip inline-flex shrink-0 items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-medium"
                style={{ "--brand": l.color ?? "var(--foreground)" } as React.CSSProperties}
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="var(--brand)" fillRule="evenodd">
                  <path d={l.d} />
                </svg>
                {l.name}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
