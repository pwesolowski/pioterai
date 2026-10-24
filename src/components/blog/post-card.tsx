import Link from "next/link"
import { localizePath, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { readingTime, type Post } from "@/lib/content"
import { formatDate } from "@/lib/utils"

/** Kafel wpisu; cała karta jest klikalna (link rozciągnięty ::after) */
export function PostCard({
  post,
  locale,
  headingLevel = "h2",
  index = 0,
}: {
  post: Post
  locale: Locale
  headingLevel?: "h2" | "h3"
  index?: number
}) {
  const t = getDictionary(locale)
  const Heading = headingLevel
  const otherLanguage = post.locale !== locale

  return (
    <article
      data-reveal
      style={{ "--reveal-delay": `${index * 100}ms` } as React.CSSProperties}
      className="group relative flex flex-col gap-3 rounded-[1.75rem] bg-card p-7 transition-transform duration-500 hover:scale-[1.02]"
    >
      <div className="flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
        <time dateTime={post.frontmatter.date}>{formatDate(post.frontmatter.date, locale)}</time>
        <span aria-hidden>·</span>
        <span>{t.blog.readingTime(readingTime(post.content))}</span>
        {otherLanguage && (
          <span className="ml-1 rounded-full bg-muted px-2 text-xs uppercase" title={t.blog.onlyIn(t.inLanguage[post.locale])}>
            {post.locale}
          </span>
        )}
        {post.frontmatter.draft && (
          <span className="ml-1 rounded-full bg-primary px-2 text-xs font-medium text-primary-foreground">{t.blog.draft}</span>
        )}
      </div>
      <Heading className="text-2xl font-semibold leading-snug" lang={otherLanguage ? post.locale : undefined}>
        <Link href={localizePath(locale, `/blog/${post.slug}`)} className="after:absolute after:inset-0 after:content-['']">
          {post.frontmatter.title}
        </Link>
      </Heading>
      <p className="line-clamp-2 text-muted-foreground" lang={otherLanguage ? post.locale : undefined}>
        {post.frontmatter.excerpt}
      </p>
    </article>
  )
}
