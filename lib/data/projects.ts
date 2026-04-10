import type { Project } from '@/lib/schema'

export const projects: Project[] = [
  {
    slug: 'portfolio-website',
    title: 'Personal Portfolio',
    description:
      'A modern, animation-rich personal portfolio built with Next.js 15, React 19, Tailwind CSS, and Framer Motion.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/cakahlul/esasjana-portfolio',
    year: 2026,
    featured: true,
  },
  {
    slug: 'project-alpha',
    title: 'Project Alpha',
    description:
      'A full-stack application demonstrating modern web development patterns with real-time features.',
    tags: ['Node.js', 'React', 'PostgreSQL', 'WebSocket'],
    year: 2025,
    featured: true,
  },
  {
    slug: 'cli-toolkit',
    title: 'CLI Toolkit',
    description:
      'A collection of developer productivity tools for the command line, built with Go.',
    tags: ['Go', 'CLI', 'DevTools'],
    year: 2025,
    featured: false,
  },
  {
    slug: 'data-viz-dashboard',
    title: 'Data Visualization Dashboard',
    description:
      'Interactive data visualization dashboard with real-time charting and filtering capabilities.',
    tags: ['React', 'D3.js', 'TypeScript', 'REST API'],
    year: 2024,
    featured: true,
  },
]

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug)
}
