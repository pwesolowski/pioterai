import Link from "next/link"
import { getAllPosts } from "@/lib/mdx"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export const metadata = {
    title: "Blog - Pioter.ai",
    description: "Articles about software engineering and AI.",
}

export default function BlogPage() {
    const posts = getAllPosts()

    return (
        <div className="container py-12 md:py-24 lg:py-32">
            <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
                <div className="flex-1 space-y-4">
                    <h1 className="inline-block font-bold text-4xl tracking-tight lg:text-5xl">
                        Blog
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Thoughts on software engineering, AI, and the future of tech.
                    </p>
                </div>
            </div>
            <hr className="my-8" />
            <div className="grid gap-10 sm:grid-cols-2">
                {posts.map((post) => (
                    <article
                        key={post.slug}
                        className="group relative flex flex-col space-y-2"
                    >
                        {/* Placeholder for post image if we add one later */}
                        {/* <Image ... /> */}
                        <div className="flex flex-col space-y-2">
                            <h2 className="text-2xl font-bold group-hover:underline">
                                <Link href={`/blog/${post.slug}`}>{post.metadata.title}</Link>
                            </h2>
                            <p className="text-muted-foreground">
                                {post.metadata.excerpt}
                            </p>
                        </div>
                        <div className="flex items-center justify-between pt-4">
                            <p className="text-sm text-muted-foreground">
                                {new Date(post.metadata.date).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                            <Link href={`/blog/${post.slug}`} className="text-sm font-medium flex items-center text-primary">
                                Read more <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    )
}
