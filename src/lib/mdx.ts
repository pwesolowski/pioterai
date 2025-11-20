import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export type Post = {
    slug: string
    metadata: {
        title: string
        date: string
        excerpt?: string
        [key: string]: any
    }
    content: string
}

export function getPostSlugs() {
    return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string): Post {
    const realSlug = slug.replace(/\.mdx$/, '')
    const fullPath = path.join(postsDirectory, `${realSlug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
        slug: realSlug,
        metadata: {
            title: data.title,
            date: data.date,
            excerpt: data.excerpt,
            ...data,
        },
        content,
    }
}

export function getAllPosts(): Post[] {
    const slugs = getPostSlugs()
    const posts = slugs
        .map((slug) => getPostBySlug(slug))
        // sort posts by date in descending order
        .sort((post1, post2) => (post1.metadata.date > post2.metadata.date ? -1 : 1))
    return posts
}
