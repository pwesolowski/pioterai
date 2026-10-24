import { Check, Database, FileSearch, Mail, Sparkles } from "lucide-react"

const delay = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties

/** Agent wykonuje zadanie krok po kroku (animacja CSS, odtwarzana przez DemoReplay) */
export function AgentSteps() {
  const steps = [
    { icon: FileSearch, width: "70%" },
    { icon: Database, width: "55%" },
    { icon: Sparkles, width: "80%" },
    { icon: Mail, width: "45%" },
  ]
  return (
    <div className="w-full max-w-sm rounded-2xl bg-background p-5 shadow-sm" aria-hidden>
      <div className="flex items-center gap-2 text-sm font-semibold">
        <span className="relative flex size-2.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:hidden" />
          <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
        </span>
        Agent
      </div>
      <ol className="relative mt-5 space-y-4 before:absolute before:bottom-3 before:left-[1.05rem] before:top-3 before:w-px before:bg-border">
        {steps.map(({ icon: Icon, width }, i) => (
          <li key={i} className="demo-in relative flex items-center gap-3" style={delay(0.3 + i * 0.6)}>
            <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full bg-card">
              <Icon className="size-4 text-muted-foreground" />
            </span>
            <span className="h-2 rounded bg-muted" style={{ width }} />
            <span
              className="demo-pop ml-auto flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
              style={delay(0.7 + i * 0.6)}
            >
              <Check className="size-3" strokeWidth={3} />
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
