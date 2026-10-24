import type { TocItem } from "@/lib/content"
import { cn } from "@/lib/utils"

/** Spis treści: rozwijany na mobile, przyklejony z boku na desktopie */
export function Toc({ items, title, variant }: { items: TocItem[]; title: string; variant: "mobile" | "desktop" }) {
  if (items.length < 2) return null

  const list = (
    <ol className="space-y-2 text-sm">
      {items.map((item) => (
        <li key={item.id} className={cn(item.depth === 3 && "pl-4")}>
          <a href={`#${item.id}`} className="block text-muted-foreground transition-colors hover:text-foreground">
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  )

  if (variant === "mobile") {
    return (
      <details className="rounded-xl border bg-card p-4 lg:hidden">
        <summary className="cursor-pointer font-semibold">{title}</summary>
        <nav aria-label={title} className="mt-4">
          {list}
        </nav>
      </details>
    )
  }

  return (
    <nav aria-label={title} className="sticky top-24 hidden lg:block">
      <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
      {list}
    </nav>
  )
}
