import type { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { isLocale, localizePath, type Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { getCaseStudies, getPosts } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"
import { Hero } from "@/components/home/hero"
import { ProofBar } from "@/components/home/proof-bar"
import { CaseStudyCard } from "@/components/home/case-study-card"
import { LatestVideo } from "@/components/home/latest-video"
import { NewsletterSection } from "@/components/home/newsletter-section"
import { PostCard } from "@/components/blog/post-card"
import { SectionHeading } from "@/components/section-heading"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale }
  return pageMetadata({
    locale,
    absoluteTitle: `${siteConfig.author} · ${siteConfig.identity.tagline[locale]}`,
    description: getDictionary(locale).home.metaDescription,
    path: "/",
  })
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) return null
  const t = getDictionary(locale)
  const caseStudies = getCaseStudies(locale)
  const posts = getPosts(locale).slice(0, 3)

  return (
    <>
      <Hero locale={locale} />
      <ProofBar locale={locale} />

      <section aria-labelledby="case-studies" className="container scroll-mt-24 py-14 md:py-20">
        <SectionHeading id="case-studies" title={t.caseStudies.heading} intro={t.caseStudies.intro} />
        <div className="grid gap-5 md:grid-cols-3">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} locale={locale} />
          ))}
        </div>
      </section>

      <LatestVideo locale={locale} />

      {posts.length > 0 && (
        <section aria-labelledby="latest-posts" className="container py-14 md:py-20" data-reveal>
          <SectionHeading
            id="latest-posts"
            title={t.latestPosts.heading}
            link={{ href: localizePath(locale, "/blog"), label: t.latestPosts.all }}
          />
          <div className="grid gap-5 md:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} locale={locale} headingLevel="h3" />
            ))}
          </div>
        </section>
      )}

      <NewsletterSection locale={locale} />
    </>
  )
}
