import Link from "next/link"
import { localizePath, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { getSeries, tagSlug, type Post } from "@/lib/content"

/** Nawigacja po serii wpisów (frontmatter: series + seriesOrder) */
export function SeriesNav({ post, locale }: { post: Post; locale: Locale }) {
  const series = post.frontmatter.series
  if (!series) return null
  const posts = getSeries(series, locale)
  if (posts.length === 0) return null

  const t = getDictionary(locale)
  const index = posts.findIndex((p) => p.slug === post.slug)
  // nazwa serii = nazwa tagu o tym samym slugu (np. „AI Product Engineering”)
  const name = post.frontmatter.tags?.find((tag) => tagSlug(tag) === series) ?? series

  return (
    <aside className="my-8 rounded-xl border bg-card p-5">
      <p className="text-sm text-muted-foreground">
        {t.blog.series}:{" "}
        <Link href={localizePath(locale, `/blog/tags/${series}`)} className="font-semibold text-foreground hover:text-primary">
          {name}
        </Link>
        {index >= 0 && <> · {t.blog.seriesPart(index + 1, posts.length)}</>}
      </p>
      <ol className="mt-3 space-y-1 text-sm">
        {posts.map((p, i) => (
          <li key={p.slug} className="flex gap-2">
            <span className="w-5 shrink-0 font-mono text-muted-foreground">{i + 1}.</span>
            {p.slug === post.slug ? (
              <span className="font-semibold text-primary" aria-current="page">{p.frontmatter.title}</span>
            ) : (
              <Link href={localizePath(locale, `/blog/${p.slug}`)} className="hover:text-primary">
                {p.frontmatter.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </aside>
  )
}
