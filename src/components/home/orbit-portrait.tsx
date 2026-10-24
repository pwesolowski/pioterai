import Image from "next/image"
import { siteConfig } from "@/config/site"

type Ring = { labels: readonly string[]; radius: number; duration: number; reverse?: boolean; offset?: number }

/**
 * Zdjęcie w centrum, wokół orbity z technologiami (LLM, MCP, Skills…).
 * Pierścienie kręcą się w CSS, etykiety obracają się przeciwnie, więc zostają poziome;
 * po okręgach płyną „pakiety danych” (animowany stroke-dashoffset).
 * Przy prefers-reduced-motion wszystko stoi.
 */
export function OrbitPortrait({ inner, outer }: { inner: readonly string[]; outer: readonly string[] }) {
  const rings: Ring[] = [
    { labels: inner, radius: 34, duration: 50, offset: 20 },
    { labels: outer, radius: 48, duration: 80, reverse: true, offset: 45 },
  ]

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[21rem] sm:max-w-[28rem] lg:max-w-[31rem]">
      <div aria-hidden className="absolute inset-[18%] rounded-full bg-primary/25 blur-3xl" />

      <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 size-full overflow-visible">
        {rings.map((ring) => (
          <g key={ring.radius} fill="none">
            <circle cx="50" cy="50" r={ring.radius} stroke="var(--border)" strokeWidth="0.35" />
            <circle
              cx="50"
              cy="50"
              r={ring.radius}
              stroke="var(--primary)"
              strokeWidth="0.6"
              strokeLinecap="round"
              strokeDasharray="4 26"
              className="orbit-flow"
              style={ring.reverse ? { animationDirection: "reverse" } : undefined}
            />
          </g>
        ))}
      </svg>

      {rings.map((ring) => (
          <div
            key={ring.radius}
            aria-hidden
            className="orbit absolute rounded-full"
            style={
              {
                inset: `${50 - ring.radius}%`,
                "--orbit-duration": `${ring.duration}s`,
                "--orbit-direction": ring.reverse ? "reverse" : "normal",
                "--orbit-label-direction": ring.reverse ? "normal" : "reverse",
              } as React.CSSProperties
            }
          >
            {ring.labels.map((label, i) => {
              const angle = (360 / ring.labels.length) * i + (ring.offset ?? 0)
              return (
                <div key={label} className="absolute inset-0" style={{ transform: `rotate(${angle}deg)` }}>
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                    <div style={{ transform: `rotate(${-angle}deg)` }}>
                      {/* dwie warstwy: obrót (orbit-label) i pulsowanie (node-glow) mają osobne animacje */}
                      <div className="orbit-label">
                        <span
                          className="node-glow flex items-center gap-1.5 whitespace-nowrap rounded-full border border-border/70 bg-card px-2.5 py-1 text-xs font-medium shadow-sm sm:px-3 sm:text-sm"
                          style={{ "--d": `${i * 0.7}s` } as React.CSSProperties}
                        >
                          <span className="size-1.5 rounded-full bg-primary" />
                          {label}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
      ))}

      <div className="absolute inset-[26%] overflow-hidden rounded-full border-4 border-background shadow-2xl ring-1 ring-primary/40">
        <Image
          src={siteConfig.identity.photo}
          alt={siteConfig.author}
          width={200}
          height={200}
          priority
          sizes="(min-width: 1024px) 15rem, (min-width: 640px) 14rem, 10rem"
          className="size-full object-cover"
        />
      </div>
    </div>
  )
}
