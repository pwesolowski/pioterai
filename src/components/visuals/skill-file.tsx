import { ArrowRight, FileText } from "lucide-react"

const delay = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties

/** Plik SKILL.md „wczytywany” przez model */
export function SkillFile() {
  const lines = [
    { text: "---", accent: true },
    { text: "name: faktury-ksef" },
    { text: "description: …" },
    { text: "---", accent: true },
  ]
  return (
    <div className="flex w-full max-w-md items-center justify-center gap-4" aria-hidden>
      <div className="w-60 rounded-2xl bg-background p-5 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <FileText className="size-4 text-primary" /> SKILL.md
        </div>
        <div className="mt-4 space-y-1 font-mono text-xs text-muted-foreground">
          {lines.map((line, i) => (
            <div key={i} className={`demo-in ${line.accent ? "text-primary" : ""}`} style={delay(0.2 + i * 0.25)}>
              {line.text}
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-2">
          {["90%", "75%", "82%", "60%"].map((w, i) => (
            <div key={i} className="demo-in h-2 rounded bg-muted" style={{ width: w, ...delay(1.3 + i * 0.2) }} />
          ))}
        </div>
      </div>
      <ArrowRight className="demo-in size-5 shrink-0 text-muted-foreground" style={delay(2.2)} />
      <div className="demo-pop flex size-20 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-lg" style={delay(2.5)}>
        Claude
      </div>
    </div>
  )
}
