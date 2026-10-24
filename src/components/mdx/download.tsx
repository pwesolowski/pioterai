import fs from "fs"
import path from "path"
import { FileDown } from "lucide-react"

type Props = {
  /** Ścieżka do pliku w public/, np. "/downloads/moj-wpis/SKILL.md" */
  file: string
  /** Nazwa wyświetlana; domyślnie nazwa pliku */
  title?: string
  description?: string
  label: string
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

/** Karta pliku do pobrania we wpisie, np. <Download file="/downloads/x/SKILL.md" /> */
export function Download({ file, title, description, label }: Props) {
  const name = title ?? path.basename(file)
  const fullPath = path.join(process.cwd(), "public", file)
  if (!fs.existsSync(fullPath)) {
    throw new Error(`<Download>: brak pliku public${file}`)
  }
  const size = formatSize(fs.statSync(fullPath).size)

  return (
    <a
      href={file}
      download
      className="not-prose my-6 flex items-center gap-4 rounded-xl border bg-card p-4 transition-colors hover:border-primary"
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
        <FileDown className="size-6" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-mono font-semibold">{name}</span>
        {description && <span className="block text-sm text-muted-foreground">{description}</span>}
      </span>
      <span className="shrink-0 text-right text-sm">
        <span className="block font-semibold text-primary">{label}</span>
        <span className="block text-muted-foreground">{size}</span>
      </span>
    </a>
  )
}
