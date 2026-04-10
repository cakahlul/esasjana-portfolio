import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/data/projects'
import { buildMetadata } from '@/lib/seo'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}

  return buildMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${slug}`,
  })
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <main className="container mx-auto max-w-3xl px-4 py-24">
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </Link>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{project.year}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
        <p className="text-lg text-muted-foreground">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-3 pt-4">
          {project.href && (
            <Button size="sm" asChild>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            </Button>
          )}
          {project.github && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                Source Code
              </a>
            </Button>
          )}
        </div>
      </div>
    </main>
  )
}
