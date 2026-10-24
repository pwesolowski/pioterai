/** Systemy firmy → serwer MCP → model; po liniach płyną „pakiety danych” */
export function McpHub() {
  const systems = ["ERP", "CRM", "SQL"]
  const ys = [20, 50, 80]
  return (
    <div className="relative aspect-[16/9] w-full max-w-md" aria-hidden>
      <svg viewBox="0 0 160 90" className="absolute inset-0 size-full" fill="none">
        {ys.map((y) => (
          <g key={y}>
            <path d={`M38 ${y} C 60 ${y}, 62 45, 76 45`} stroke="var(--border)" strokeWidth="0.8" />
            <path
              d={`M38 ${y} C 60 ${y}, 62 45, 76 45`}
              stroke="var(--primary)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeDasharray="4 26"
              className="orbit-flow"
            />
          </g>
        ))}
        <path d="M100 45 H 122" stroke="var(--border)" strokeWidth="0.8" />
        <path d="M100 45 H 122" stroke="var(--primary)" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="4 26" className="orbit-flow" />
      </svg>
      {systems.map((name, i) => (
        <span
          key={name}
          className="absolute left-0 flex h-[18%] w-[22%] -translate-y-1/2 items-center justify-center rounded-xl bg-background text-xs font-semibold text-muted-foreground shadow-sm sm:text-sm"
          style={{ top: `${ys[i]}%` }}
        >
          {name}
        </span>
      ))}
      <span className="absolute left-[47.5%] top-1/2 flex h-[24%] w-[15%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-background text-xs font-bold shadow-sm ring-1 ring-primary/50 sm:text-sm">
        MCP
      </span>
      <span className="node-glow absolute right-0 top-1/2 flex aspect-square w-[22%] -translate-y-1/2 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground shadow-lg sm:text-sm">
        Claude
      </span>
    </div>
  )
}
