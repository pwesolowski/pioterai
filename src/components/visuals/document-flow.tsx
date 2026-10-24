import { ArrowRight, FileImage } from "lucide-react"

/** Zdjęcie dokumentu → dane → rejestr */
export function DocumentFlow() {
  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4" aria-hidden>
      <div className="flex h-28 w-20 flex-col gap-2 rounded-xl bg-background p-3 shadow-sm transition-transform duration-500 group-hover:-rotate-3">
        <FileImage className="size-4 text-muted-foreground" />
        <div className="h-1.5 w-3/4 rounded bg-muted" />
        <div className="h-1.5 w-full rounded bg-muted" />
        <div className="h-1.5 w-2/3 rounded bg-muted" />
      </div>
      <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
      <div className="rounded-xl bg-background p-3 font-mono text-[0.65rem] leading-relaxed text-muted-foreground shadow-sm transition-transform duration-500 group-hover:-translate-y-1">
        <span className="text-primary">{"{"}</span>
        <div className="pl-2">poz: 3,</div>
        <div className="pl-2">ok: true</div>
        <span className="text-primary">{"}"}</span>
      </div>
      <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
      <div className="w-24 space-y-1.5 rounded-xl bg-background p-3 shadow-sm transition-transform duration-500 group-hover:rotate-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="h-1.5 flex-1 rounded bg-muted" />
            <div className="size-2 rounded-full bg-primary" />
          </div>
        ))}
      </div>
    </div>
  )
}
