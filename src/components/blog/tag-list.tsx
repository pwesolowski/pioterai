import Link from "next/link"
import { localizePath, type Locale } from "@/i18n/config"
import { tagSlug } from "@/lib/content"

export function TagList({ tags, locale }: { tags?: string[]; locale: Locale }) {
  if (!tags?.length) return null
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag}>
          <Link
            href={localizePath(locale, `/blog/tags/${tagSlug(tag)}`)}
            className="relative z-10 inline-flex min-h-8 items-center rounded-full border px-3 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  )
}
