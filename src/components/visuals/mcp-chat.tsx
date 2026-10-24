import { Database, Plug } from "lucide-react"

/** Czat z danymi aplikacji przez serwer MCP */
export function McpChat() {
  const bars = [40, 65, 50, 85, 70]
  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4" aria-hidden>
      <div className="flex flex-col items-center gap-1.5 text-muted-foreground">
        <div className="flex size-12 items-center justify-center rounded-xl bg-background shadow-sm">
          <Database className="size-5" />
        </div>
      </div>
      <div className="flex items-center gap-1 rounded-full bg-background px-2.5 py-1 text-[0.65rem] font-semibold shadow-sm">
        <Plug className="size-3 text-primary" /> MCP
      </div>
      <div className="w-36 space-y-2">
        <div className="ml-auto h-6 w-24 rounded-2xl rounded-br-md bg-primary/80 transition-transform duration-500 group-hover:-translate-x-1" />
        <div className="rounded-2xl rounded-bl-md bg-background p-2.5 shadow-sm">
          <div className="flex h-12 items-end gap-1">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 origin-bottom rounded-sm bg-primary/70 transition-transform duration-500 group-hover:scale-y-110"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
