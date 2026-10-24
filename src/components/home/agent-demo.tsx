import { Check, FileImage } from "lucide-react"
import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"

const delay = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties

/** Animowana ilustracja: zdjęcie WZ → agent wyciąga pozycje → rejestr */
export function AgentDemo({ locale }: { locale: Locale }) {
  const d = getDictionary(locale).home.demo
  const rowStart = 1.3
  const stepTimes = [0.9, 2.1, 2.8, 3.3]

  return (
    <div className="relative mx-auto max-w-4xl" aria-hidden>
      <div className="absolute inset-x-8 -bottom-6 top-12 rounded-full bg-primary/25 blur-3xl" />
      <div className="relative overflow-hidden rounded-[1.75rem] border border-border/60 bg-card text-left shadow-2xl">
        <div className="flex items-center gap-2 border-b border-border/60 px-5 py-3">
          <span className="size-3 rounded-full bg-muted" />
          <span className="size-3 rounded-full bg-muted" />
          <span className="size-3 rounded-full bg-muted" />
          <span className="ml-3 font-mono text-xs text-muted-foreground">agent · {d.file}</span>
          <span className="ml-auto rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary">{d.badge}</span>
        </div>

        <div className="grid gap-4 p-4 sm:grid-cols-[0.8fr_1.2fr] sm:p-6">
          {/* „zdjęcie” dokumentu ze skanowaniem */}
          <div className="relative overflow-hidden rounded-2xl bg-background p-5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <FileImage className="size-4" /> {d.file}
            </div>
            <div className="mt-5 space-y-2.5">
              <div className="h-3 w-2/5 rounded bg-foreground/20" />
              <div className="h-2 w-3/4 rounded bg-muted" />
              <div className="h-2 w-2/3 rounded bg-muted" />
              <div className="mt-5 grid grid-cols-[1fr_auto] gap-x-6 gap-y-2.5">
                {[0.7, 0.55, 0.45].map((w, i) => (
                  <div key={i} className="contents">
                    <div className="h-2 rounded bg-muted" style={{ width: `${w * 100}%` }} />
                    <div className="h-2 w-8 rounded bg-muted" />
                  </div>
                ))}
              </div>
              <div className="ml-auto mt-6 h-8 w-20 rotate-[-6deg] rounded-md border-2 border-dashed border-muted-foreground/30" />
            </div>
            <div className="demo-scan pointer-events-none absolute inset-x-0 h-16 -translate-y-1/2 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
          </div>

          {/* rejestr wypełniany przez agenta */}
          <div className="rounded-2xl bg-background p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">{d.register}</span>
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
              </span>
            </div>
            <ul className="mt-4 divide-y divide-border/60">
              {d.rows.map(([name, qty], i) => (
                <li key={name} className="demo-in flex items-center gap-3 py-3 text-sm" style={delay(rowStart + i * 0.3)}>
                  <span className="flex-1 truncate">{name}</span>
                  <span className="font-mono text-muted-foreground">{qty}</span>
                  <span className="demo-pop flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground" style={delay(2.4 + i * 0.15)}>
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ol className="flex items-center justify-between gap-2 border-t border-border/60 px-5 py-4 sm:px-8">
          {d.steps.map((step, i) => (
            <li key={step} className="flex items-center gap-2 text-xs font-medium text-muted-foreground sm:text-sm">
              <span className="demo-pop flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground" style={delay(stepTimes[i])}>
                <Check className="size-3" strokeWidth={3} />
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
