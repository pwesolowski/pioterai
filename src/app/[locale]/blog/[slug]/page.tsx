import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Languages } from "lucide-react"
import { siteConfig } from "@/config/site"
import { isLocale, localizePath, locales, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { getPost, getSlugs, getToc, readingTime } from "@/lib/content"
import { renderMDX } from "@/lib/mdx"
import { pageMetadata } from "@/lib/seo"
import { articleSchema } from "@/lib/schema"
import { formatDate } from "@/lib/utils"
import { JsonLd } from "@/components/json-ld"
import { TagList } from "@/components/blog/tag-list"
import { Toc } from "@/components/blog/toc"
import { SeriesNav } from "@/components/blog/series-nav"

type Props = { params: Promise<{ locale: string; slug: string }> }

// każdy wpis generujemy w obu językach — brakująca wersja pokazuje oryginał z informacją
export function generateStaticParams() {
  return locales.flatMap((locale) => getSlugs("posts").map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = (await params) as { locale: Locale; slug: string }
  const result = getPost(slug, locale)
  if (!result) return {}
  const { entry, isFallback } = result
  const fm = entry.frontmatter

  return pageMetadata({
    locale,
    title: fm.title,
    description: fm.excerpt,
    path: `/blog/${slug}`,
    availableLocales: entry.availableLocales,
    type: "article",
    publishedTime: fm.date,
    modifiedTime: fm.updated,
    tags: fm.tags,
    // wersja „zastępcza” nie jest indeksowana, kanoniczny jest oryginał
    noindex: isFallback || fm.draft,
    canonicalLocale: entry.locale,
  })
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const result = getPost(slug, locale)
  if (!result) notFound()

  const { entry: post, isFallback } = result
  const fm = post.frontmatter
  const t = getDictionary(locale)
  const content = await renderMDX(post.content, post.locale)
  const toc = getToc(post.content)
  const url = `${siteConfig.url}${localizePath(post.locale, `/blog/${slug}`)}`

  return (
    <div className="container py-10 md:py-16">
      <Link
        href={localizePath(locale, "/blog")}
        className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" aria-hidden /> {t.blog.backToBlog}
      </Link>

      {isFallback && (
        <div role="note" className="mt-4 flex gap-3 rounded-xl border border-primary/40 bg-primary/5 p-4">
          <Languages className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
          <p>
            <strong>{t.blog.onlyIn(t.inLanguage[post.locale])}</strong> {t.blog.fallbackHint}
          </p>
        </div>
      )}

      <div className="mt-6 grid gap-12 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <article lang={post.locale} className="min-w-0 max-w-3xl">
          <header className="space-y-5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <time dateTime={fm.date}>{formatDate(fm.date, locale)}</time>
              <span aria-hidden>·</span>
              <span>{t.blog.readingTime(readingTime(post.content))}</span>
              {fm.updated && (
                <>
                  <span aria-hidden>·</span>
                  <span>
                    {t.blog.updated} <time dateTime={fm.updated}>{formatDate(fm.updated, locale)}</time>
                  </span>
                </>
              )}
            </div>
            <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              {fm.title}
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">{fm.excerpt}</p>
            <TagList tags={fm.tags} locale={locale} />
          </header>

          <SeriesNav post={post} locale={locale} />

          <div className="mt-8 lg:hidden">
            <Toc items={toc} title={t.blog.toc} variant="mobile" />
          </div>

          <div className="prose prose-lg mt-8 max-w-none prose-headings:scroll-mt-24 prose-headings:tracking-tight">
            {content}
          </div>
        </article>

        <aside className="hidden lg:block">
          <Toc items={toc} title={t.blog.toc} variant="desktop" />
        </aside>
      </div>

      <JsonLd
        data={articleSchema({
          title: fm.title,
          description: fm.excerpt,
          url,
          image: `${url}/opengraph-image`,
          datePublished: fm.date,
          dateModified: fm.updated,
          locale: post.locale,
          tags: fm.tags,
        })}
      />
    </div>
  )
}
