import { Info, Lightbulb, TriangleAlert } from "lucide-react"
import { cn } from "@/lib/utils"

const icons = { info: Info, tip: Lightbulb, warning: TriangleAlert }

/** Wyróżniona ramka: <Callout type="tip">…</Callout> */
export function Callout({ type = "info", children }: { type?: keyof typeof icons; children: React.ReactNode }) {
  const Icon = icons[type]
  return (
    <div
      className={cn(
        "my-6 flex gap-3 rounded-xl border p-4 [&>div>p]:my-0",
        type === "warning" ? "border-destructive/50" : "border-primary/40 bg-primary/5"
      )}
    >
      <Icon className={cn("mt-1 size-5 shrink-0", type === "warning" ? "text-destructive" : "text-primary")} aria-hidden />
      <div>{children}</div>
    </div>
  )
}
