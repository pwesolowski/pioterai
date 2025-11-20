import { getPostBySlug, getPostSlugs } from "@/lib/mdx"
import { MDXRemote } from "next-mdx-remote/rsc"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export async function generateStaticParams() {
    const posts = getPostSlugs()
    return posts.map((post) => ({
        slug: post.replace(/\.mdx$/, ""),
    }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = getPostBySlug(slug)
    return {
        title: `${post.metadata.title} - Pioter.ai`,
        description: post.metadata.excerpt,
    }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = getPostBySlug(slug)

    return (
        <article className="container max-w-3xl py-12 md:py-24 lg:py-32">
            <Link href="/blog">
                <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-primary">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                </Button>
            </Link>
            <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                    {post.metadata.title}
                </h1>
                <p className="text-xl text-muted-foreground">
                    {new Date(post.metadata.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
            </div>
            <hr className="my-8" />
            <div className="prose prose-zinc dark:prose-invert max-w-none">
                <MDXRemote source={post.content} />
            </div>
        </article>
    )
}
