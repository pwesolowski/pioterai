import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { isLocale, localizePath, locales, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { getPostsByTag, getTags } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"
import { tagIntros } from "@/config/tags"
import { PostCard } from "@/components/blog/post-card"

type Props = { params: Promise<{ locale: string; tag: string }> }

// tagi z opisem w tagIntros mają stronę nawet bez wpisów (landing pod frazę)
export function generateStaticParams() {
  return locales.flatMap((locale) => {
    const slugs = new Set([...getTags(locale).map((t) => t.slug), ...Object.keys(tagIntros)])
    return [...slugs].map((tag) => ({ locale, tag }))
  })
}

function tagName(locale: Locale, slug: string) {
  return getTags(locale).find((t) => t.slug === slug)?.tag ?? tagIntros[slug]?.[locale].title
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, tag } = (await params) as { locale: Locale; tag: string }
  const name = tagName(locale, tag)
  if (!name) return {}
  const t = getDictionary(locale)
  const intro = tagIntros[tag]?.[locale]
  return pageMetadata({
    locale,
    title: intro?.title ?? t.blog.tagHeading(name),
    description: intro?.description ?? t.blog.tagDescription(name),
    path: `/blog/tags/${tag}`,
  })
}

export default async function TagPage({ params }: Props) {
  const { locale, tag } = await params
  if (!isLocale(locale)) notFound()
  const name = tagName(locale, tag)
  if (!name) notFound()
  const t = getDictionary(locale)
  const posts = getPostsByTag(locale, tag)
  const intro = tagIntros[tag]?.[locale]

  return (
    <div className="container py-12 md:py-20">
      <Link href={localizePath(locale, "/blog")} className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="size-4" aria-hidden /> {t.blog.backToBlog}
      </Link>
      <header className="mt-4 max-w-3xl space-y-4">
        <p className="font-mono text-sm text-primary">#{tag}</p>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{intro?.title ?? name}</h1>
        {intro ? (
          intro.body.map((paragraph) => (
            <p key={paragraph} className="text-lg text-muted-foreground">
              {paragraph}
            </p>
          ))
        ) : (
          <p className="text-lg text-muted-foreground">{t.blog.tagDescription(name)}</p>
        )}
      </header>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} locale={locale} />
        ))}
        {posts.length === 0 && <p className="text-muted-foreground">{t.blog.noPosts}</p>}
      </div>
    </div>
  )
}
