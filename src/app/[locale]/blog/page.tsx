import type { Metadata } from "next"
import Link from "next/link"
import { Rss } from "lucide-react"
import { isLocale, localizePath, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { getPosts, getTags } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"
import { PostCard } from "@/components/blog/post-card"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale }
  const t = getDictionary(locale)
  return pageMetadata({ locale, title: t.blog.title, description: t.blog.description, path: "/blog" })
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) return null
  const t = getDictionary(locale)
  const posts = getPosts(locale)
  const tags = getTags(locale)

  return (
    <div className="container py-12 md:py-20">
      <header className="max-w-2xl space-y-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">{t.blog.title}</h1>
        <p className="text-lg text-muted-foreground md:text-xl">{t.blog.intro}</p>
        <Link href={localizePath(locale, "/feed.xml")} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
          <Rss className="size-4" aria-hidden /> {t.blog.rss}
        </Link>
      </header>

      {tags.length > 0 && (
        <nav aria-label={t.blog.allTags} className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li key={tag.slug}>
                <Link
                  href={localizePath(locale, `/blog/tags/${tag.slug}`)}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                >
                  {tag.tag} <span className="font-mono text-xs">{tag.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} locale={locale} />
        ))}
        {posts.length === 0 && <p className="text-muted-foreground">{t.blog.noPosts}</p>}
      </div>
    </div>
  )
}
