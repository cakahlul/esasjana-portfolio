import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import { buildMetadata } from '@/lib/seo'
import { formatDate } from '@/lib/utils'

export const metadata = buildMetadata({
  title: 'Blog',
  description: 'Thoughts on software engineering, web development, and technology.',
  path: '/blog',
})

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="container mx-auto max-w-3xl px-4 py-24">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <p className="text-muted-foreground">
          Thoughts on software engineering and technology.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="mt-10 text-muted-foreground">No posts yet. Stay tuned!</p>
      ) : (
        <div className="mt-10 space-y-1">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group -mx-3 flex flex-col rounded-lg px-3 py-4 transition-colors hover:bg-accent sm:flex-row sm:items-baseline sm:justify-between"
            >
              <div className="space-y-1">
                <h2 className="font-medium group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {post.description}
                </p>
              </div>
              <div className="mt-1 flex shrink-0 items-center gap-2 text-xs text-muted-foreground sm:mt-0 sm:ml-4">
                <span>{formatDate(post.date)}</span>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
