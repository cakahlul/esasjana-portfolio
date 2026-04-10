import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getPostSlugs } from '@/lib/blog'
import { renderMDX } from '@/lib/mdx'
import { buildMetadata } from '@/lib/seo'
import { formatDate } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.updated,
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const content = await renderMDX(post.content)

  return (
    <main className="container mx-auto max-w-3xl px-4 py-24">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to blog
      </Link>

      <article>
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
          <p className="text-lg text-muted-foreground">{post.description}</p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <hr className="my-8" />

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {content}
        </div>
      </article>
    </main>
  )
}
