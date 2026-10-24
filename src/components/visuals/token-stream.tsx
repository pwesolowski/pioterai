import { Sparkles } from "lucide-react"

const delay = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties

// szerokości „tokenów” w odpowiedzi modelu (rem)
const tokens = [3, 4.5, 2, 5, 3.5, 2.5, 4, 3, 5.5, 2, 3.5, 4.5, 2.5, 3]

/** Prompt → model generuje odpowiedź token po tokenie */
export function TokenStream() {
  return (
    <div className="w-full max-w-sm space-y-3" aria-hidden>
      <div className="ml-auto w-3/4 rounded-2xl rounded-br-md bg-primary/80 p-3">
        <div className="h-2 w-4/5 rounded bg-primary-foreground/40" />
        <div className="mt-2 h-2 w-1/2 rounded bg-primary-foreground/40" />
      </div>
      <div className="rounded-2xl rounded-bl-md bg-background p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <Sparkles className="size-3.5 text-primary" /> LLM
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {tokens.map((w, i) => (
            <span key={i} className="demo-in h-2.5 rounded bg-muted" style={{ width: `${w}rem`, ...delay(0.4 + i * 0.12) }} />
          ))}
          <span className="h-3.5 w-0.5 animate-pulse bg-primary" />
        </div>
      </div>
    </div>
  )
}
