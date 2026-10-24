import Link from "next/link"
import { localizePath, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { readingTime, type Post } from "@/lib/content"
import { formatDate } from "@/lib/utils"
import { TagList } from "./tag-list"

/** Pozycja na liście wpisów; cała karta jest klikalna (link rozciągnięty ::after) */
export function PostCard({ post, locale, headingLevel = "h2" }: { post: Post; locale: Locale; headingLevel?: "h2" | "h3" }) {
  const t = getDictionary(locale)
  const Heading = headingLevel
  const otherLanguage = post.locale !== locale

  return (
    <article className="group relative flex flex-col gap-3 rounded-2xl border bg-card p-5 transition-colors hover:border-primary/60 sm:p-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
        <time dateTime={post.frontmatter.date}>{formatDate(post.frontmatter.date, locale)}</time>
        <span aria-hidden>·</span>
        <span>{t.blog.readingTime(readingTime(post.content))}</span>
        {otherLanguage && (
          <span
            className="rounded-md border px-1.5 font-mono text-xs uppercase"
            title={t.blog.onlyIn(t.inLanguage[post.locale])}
          >
            {post.locale}
          </span>
        )}
        {post.frontmatter.draft && (
          <span className="rounded-md bg-primary px-1.5 text-xs font-semibold text-primary-foreground">{t.blog.draft}</span>
        )}
      </div>
      <Heading className="text-xl font-bold leading-snug tracking-tight sm:text-2xl" lang={otherLanguage ? post.locale : undefined}>
        <Link href={localizePath(locale, `/blog/${post.slug}`)} className="after:absolute after:inset-0 after:content-['']">
          {post.frontmatter.title}
        </Link>
      </Heading>
      <p className="text-muted-foreground" lang={otherLanguage ? post.locale : undefined}>
        {post.frontmatter.excerpt}
      </p>
      <div className="mt-auto pt-1">
        <TagList tags={post.frontmatter.tags} locale={locale} />
      </div>
    </article>
  )
}
