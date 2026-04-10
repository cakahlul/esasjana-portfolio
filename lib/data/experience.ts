import type { Experience } from '@/lib/schema'

export const experiences: Experience[] = [
  {
    company: 'Acme Corp',
    role: 'Senior Software Engineer',
    startDate: '2024-01',
    endDate: 'Present',
    description:
      'Leading frontend architecture and building design system components used across multiple product teams.',
    tags: ['React', 'TypeScript', 'Design Systems', 'Next.js'],
    href: 'https://example.com',
  },
  {
    company: 'StartupXYZ',
    role: 'Full Stack Developer',
    startDate: '2022-06',
    endDate: '2023-12',
    description:
      'Built and shipped core product features from ideation to production. Led migration from REST to GraphQL API.',
    tags: ['Node.js', 'React', 'GraphQL', 'PostgreSQL'],
  },
  {
    company: 'Digital Agency',
    role: 'Frontend Developer',
    startDate: '2020-03',
    endDate: '2022-05',
    description:
      'Developed responsive web applications for various clients. Introduced component-driven development practices.',
    tags: ['Vue.js', 'JavaScript', 'CSS', 'WordPress'],
  },
]
