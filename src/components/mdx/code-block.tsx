"use client"

import { useRef, useState } from "react"
import { Check, Copy } from "lucide-react"

type Props = React.ComponentProps<"pre"> & { copyLabel: string; copiedLabel: string }

export function CodeBlock({ copyLabel, copiedLabel, children, ...props }: Props) {
  const ref = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  async function copy() {
    const text = ref.current?.textContent ?? ""
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // brak dostępu do schowka (np. HTTP) — nic nie robimy
    }
  }

  return (
    <div className="group relative">
      <pre ref={ref} {...props}>
        {children}
      </pre>
      <button
        type="button"
        onClick={copy}
        className="absolute right-2 top-2 inline-flex size-9 items-center justify-center rounded-md border bg-background/80 text-muted-foreground opacity-100 backdrop-blur transition hover:text-foreground focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100"
        aria-label={copied ? copiedLabel : copyLabel}
        title={copied ? copiedLabel : copyLabel}
      >
        {copied ? <Check className="size-4 text-primary" aria-hidden /> : <Copy className="size-4" aria-hidden />}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? copiedLabel : ""}
      </span>
    </div>
  )
}
