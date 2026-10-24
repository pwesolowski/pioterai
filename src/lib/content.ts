import fs from "fs"
import path from "path"
import matter from "gray-matter"
import GithubSlugger, { slug as slugify } from "github-slugger"
import { locales, type Locale } from "@/i18n/config"

/**
 * Treści leżą w content/<kolekcja>/<slug>/<język>.mdx.
 * Wpis może istnieć tylko w jednym języku — wtedy druga wersja językowa
 * strony pokazuje oryginał z informacją o dostępności.
 */

const CONTENT_DIR = path.join(process.cwd(), "content")
const showDrafts = process.env.NODE_ENV !== "production"

type Collection = "posts" | "case-studies" | "pages"

export type PostFrontmatter = {
  title: string
  date: string
  excerpt: string
  updated?: string
  tags?: string[]
  /** Slug serii, np. "ai-product-engineering" */
  series?: string
  seriesOrder?: number
  draft?: boolean
}

export type CaseStudyFrontmatter = {
  title: string
  summary: string
  problem: string
  solution: string
  result: string
  tags?: string[]
  /** Kolejność na stronie głównej (rosnąco) */
  order?: number
  /** Szeroka karta w siatce bento */
  featured?: boolean
  date?: string
  draft?: boolean
}

export type Entry<T> = {
  slug: string
  /** Język, w którym treść faktycznie jest napisana */
  locale: Locale
  frontmatter: T
  content: string
  /** Wszystkie języki, w których istnieje ten wpis */
  availableLocales: Locale[]
}

function readFile<T>(collection: Collection, slug: string, locale: Locale) {
  const file = path.join(CONTENT_DIR, collection, slug, `${locale}.mdx`)
  if (!fs.existsSync(file)) return null
  const { data, content } = matter(fs.readFileSync(file, "utf8"))
  const frontmatter = normalizeFrontmatter(data) as T & { draft?: boolean }
  if (frontmatter.draft && !showDrafts) return null
  return { frontmatter, content }
}

// gray-matter zamienia daty bez cudzysłowów na obiekty Date
function normalizeFrontmatter(data: Record<string, unknown>) {
  const out: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(data)) {
    out[key] = value instanceof Date ? value.toISOString().slice(0, 10) : value
  }
  return out
}

function listSlugs(collection: Collection): string[] {
  const dir = path.join(CONTENT_DIR, collection)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
}

/**
 * Zwraca wpis w żądanym języku, a jeśli go nie ma — w innym dostępnym.
 * `isFallback` mówi, czy treść jest w innym języku niż żądany.
 */
export function getEntry<T>(collection: Collection, slug: string, locale: Locale) {
  const versions = locales
    .map((l) => ({ locale: l, file: readFile<T>(collection, slug, l) }))
    .filter((v) => v.file !== null)
  if (versions.length === 0) return null

  const chosen = versions.find((v) => v.locale === locale) ?? versions[0]
  const entry: Entry<T> = {
    slug,
    locale: chosen.locale,
    frontmatter: chosen.file!.frontmatter,
    content: chosen.file!.content,
    availableLocales: versions.map((v) => v.locale),
  }
  return { entry, isFallback: chosen.locale !== locale }
}

/** Wszystkie wpisy kolekcji, każdy w preferowanym języku (lub jedynym dostępnym) */
export function getEntries<T>(collection: Collection, locale: Locale): Entry<T>[] {
  return listSlugs(collection)
    .map((slug) => getEntry<T>(collection, slug, locale)?.entry)
    .filter((e): e is Entry<T> => Boolean(e))
}

export function getSlugs(collection: Collection): string[] {
  return listSlugs(collection).filter((slug) => locales.some((l) => readFile(collection, slug, l)))
}

/* ---------- Blog ---------- */

export type Post = Entry<PostFrontmatter>

export function getPosts(locale: Locale): Post[] {
  return getEntries<PostFrontmatter>("posts", locale).sort((a, b) =>
    a.frontmatter.date < b.frontmatter.date ? 1 : -1
  )
}

export function getPost(slug: string, locale: Locale) {
  return getEntry<PostFrontmatter>("posts", slug, locale)
}

export function tagSlug(tag: string) {
  return slugify(tag)
}

export function getTags(locale: Locale) {
  const counts = new Map<string, { tag: string; slug: string; count: number }>()
  for (const post of getPosts(locale)) {
    for (const tag of post.frontmatter.tags ?? []) {
      const s = tagSlug(tag)
      const current = counts.get(s) ?? { tag, slug: s, count: 0 }
      current.count++
      counts.set(s, current)
    }
  }
  return [...counts.values()].sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
}

export function getPostsByTag(locale: Locale, slug: string) {
  return getPosts(locale).filter((p) => p.frontmatter.tags?.some((t) => tagSlug(t) === slug))
}

/** Wpisy serii w kolejności seriesOrder */
export function getSeries(series: string, locale: Locale) {
  return getPosts(locale)
    .filter((p) => p.frontmatter.series === series)
    .sort((a, b) => (a.frontmatter.seriesOrder ?? 0) - (b.frontmatter.seriesOrder ?? 0))
}

export function readingTime(content: string) {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export type TocItem = { id: string; text: string; depth: 2 | 3 }

/**
 * Spis treści z nagłówków ## i ###. Identyfikatory liczy ten sam
 * algorytm co rehype-slug (github-slugger), w tej samej kolejności.
 */
export function getToc(content: string): TocItem[] {
  const slugger = new GithubSlugger()
  const items: TocItem[] = []
  let inCode = false

  for (const line of content.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) inCode = !inCode
    if (inCode) continue
    const match = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line)
    if (!match) continue
    const text = match[2]
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[`*_]/g, "")
      .trim()
    const id = slugger.slug(text)
    const depth = match[1].length
    if (depth === 2 || depth === 3) items.push({ id, text, depth })
  }
  return items
}

/* ---------- Case studies ---------- */

export type CaseStudy = Entry<CaseStudyFrontmatter>

export function getCaseStudies(locale: Locale): CaseStudy[] {
  return getEntries<CaseStudyFrontmatter>("case-studies", locale).sort(
    (a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99)
  )
}

export function getCaseStudy(slug: string, locale: Locale) {
  return getEntry<CaseStudyFrontmatter>("case-studies", slug, locale)
}

/* ---------- Strony (np. O mnie) ---------- */

export function getPage(name: string, locale: Locale) {
  return getEntry<{ title?: string }>("pages", name, locale)
}
