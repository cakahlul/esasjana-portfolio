import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/data/site'
import { getAllPosts } from '@/lib/blog'
import { getAllProjectSlugs } from '@/lib/data/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/projects', '/experience', '/blog', '/contact'].map(
    (route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    }),
  )

  const blogRoutes = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.updated || post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const projectRoutes = getAllProjectSlugs().map((slug) => ({
    url: `${siteConfig.url}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...blogRoutes, ...projectRoutes]
}
