import Link from "next/link"
import { compileMDX } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code"
import type { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionaries"
import { CodeBlock } from "@/components/mdx/code-block"
import { Download } from "@/components/mdx/download"
import { Callout } from "@/components/mdx/callout"
import { MdxImage } from "@/components/mdx/mdx-image"

const prettyCode: PrettyCodeOptions = {
  theme: { light: "github-light", dark: "github-dark-dimmed" },
  keepBackground: false,
  defaultLang: "plaintext",
}

function components(locale: Locale) {
  const t = getDictionary(locale)
  return {
    pre: (props: React.ComponentProps<"pre">) => (
      <CodeBlock copyLabel={t.code.copy} copiedLabel={t.code.copied} {...props} />
    ),
    a: ({ href = "", ...props }: React.ComponentProps<"a">) =>
      href.startsWith("/") || href.startsWith("#") ? (
        <Link href={href} {...props} />
      ) : (
        <a href={href} target="_blank" rel="noopener" {...props} />
      ),
    img: MdxImage,
    Download: (props: Omit<React.ComponentProps<typeof Download>, "label">) => (
      <Download label={t.download.label} {...props} />
    ),
    Callout,
  }
}

/** Kompiluje MDX na serwerze (przy buildzie) — podświetlanie składni bez JS po stronie klienta */
export async function renderMDX(source: string, locale: Locale) {
  const { content } = await compileMDX({
    source,
    components: components(locale),
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
          [rehypePrettyCode, prettyCode],
        ],
      },
    },
  })
  return content
}
